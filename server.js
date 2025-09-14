const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const sqlite3 = require('sqlite3').verbose();

const PORT = process.env.PORT || 3000;

// SQLite 데이터베이스 연결
const db = new sqlite3.Database('./korean_philippines.db', (err) => {
    if (err) {
        console.error('데이터베이스 연결 오류:', err.message);
    } else {
        console.log('✅ SQLite 데이터베이스 연결됨');
    }
});

// MIME 타입 매핑
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// API 엔드포인트 처리
function handleAPI(req, res, pathname) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const parsedUrl = url.parse(req.url, true);

    if (pathname === '/api/categories') {
        // 모든 카테고리 조회
        db.all('SELECT * FROM categories ORDER BY name', (err, rows) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
            } else {
                res.writeHead(200);
                res.end(JSON.stringify(rows));
            }
        });
    } else if (pathname.startsWith('/api/words/')) {
        // 특정 카테고리의 단어들 조회
        const category = pathname.split('/')[3];
        db.all(`
            SELECT w.*, c.name as category_name, c.title as category_title 
            FROM words w 
            JOIN categories c ON w.category_id = c.id 
            WHERE c.name = ? 
            ORDER BY w.id
        `, [category], (err, rows) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
            } else {
                res.writeHead(200);
                res.end(JSON.stringify(rows));
            }
        });
    } else if (pathname === '/api/words') {
        // 모든 단어 조회
        db.all(`
            SELECT w.*, c.name as category_name, c.title as category_title 
            FROM words w 
            JOIN categories c ON w.category_id = c.id 
            ORDER BY c.name, w.id
        `, (err, rows) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
            } else {
                res.writeHead(200);
                res.end(JSON.stringify(rows));
            }
        });
    } else if (pathname.startsWith('/api/search/')) {
        // 단어 검색
        const query = pathname.split('/')[3];
        db.all(`
            SELECT w.*, c.name as category_name, c.title as category_title 
            FROM words w 
            JOIN categories c ON w.category_id = c.id 
            WHERE w.korean LIKE ? OR w.english LIKE ? OR w.filipino LIKE ?
            ORDER BY c.name, w.id
        `, [`%${query}%`, `%${query}%`, `%${query}%`], (err, rows) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
            } else {
                res.writeHead(200);
                res.end(JSON.stringify(rows));
            }
        });
    } else if (pathname === '/api/grammar/lessons') {
        // 문법 레슨 목록 조회
        const level = parsedUrl.query ? new URLSearchParams(parsedUrl.query).get('level') : 'beginner';
        db.all("SELECT * FROM grammar_lessons WHERE level = ? ORDER BY order_index", [level], (err, rows) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
            } else {
                res.writeHead(200);
                res.end(JSON.stringify(rows));
            }
        });
    } else if (pathname.startsWith('/api/grammar/lesson/')) {
        // 특정 레슨 상세 정보 조회
        const lessonId = pathname.split('/')[4];
        db.get("SELECT * FROM grammar_lessons WHERE id = ?", [lessonId], (err, lesson) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
            } else if (!lesson) {
                res.writeHead(404);
                res.end(JSON.stringify({ error: 'Lesson not found' }));
            } else {
                // 관련 데이터 조회
                db.all("SELECT * FROM grammar_examples WHERE lesson_id = ? ORDER BY order_index", [lessonId], (err, examples) => {
                    if (err) {
                        res.writeHead(500);
                        res.end(JSON.stringify({ error: err.message }));
                        return;
                    }
                    
                    db.all("SELECT * FROM grammar_rules WHERE lesson_id = ? ORDER BY order_index", [lessonId], (err, rules) => {
                        if (err) {
                            res.writeHead(500);
                            res.end(JSON.stringify({ error: err.message }));
                            return;
                        }
                        
                        db.all("SELECT * FROM grammar_particles WHERE lesson_id = ? ORDER BY order_index", [lessonId], (err, particles) => {
                            if (err) {
                                res.writeHead(500);
                                res.end(JSON.stringify({ error: err.message }));
                                return;
                            }
                            
                            db.all("SELECT * FROM grammar_conjugations WHERE lesson_id = ? ORDER BY order_index", [lessonId], (err, conjugations) => {
                                if (err) {
                                    res.writeHead(500);
                                    res.end(JSON.stringify({ error: err.message }));
                                    return;
                                }
                                
                                res.writeHead(200);
                                res.end(JSON.stringify({
                                    lesson,
                                    examples,
                                    rules,
                                    particles,
                                    conjugations
                                }));
                            });
                        });
                    });
                });
            }
        });
    } else if (pathname === '/api/grammar/practice') {
        // 문법 연습 문제 조회
        const level = parsedUrl.query ? new URLSearchParams(parsedUrl.query).get('level') : 'beginner';
        db.all("SELECT * FROM grammar_practice WHERE level = ? ORDER BY order_index", [level], (err, rows) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
            } else {
                res.writeHead(200);
                res.end(JSON.stringify(rows));
            }
        });
    } else if (pathname === '/api/grammar/quiz') {
        // 문법 퀴즈 문제 조회
        const level = parsedUrl.query ? new URLSearchParams(parsedUrl.query).get('level') : 'beginner';
        db.all("SELECT * FROM grammar_quiz WHERE level = ? ORDER BY order_index", [level], (err, rows) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
            } else {
                res.writeHead(200);
                res.end(JSON.stringify(rows));
            }
        });
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'API endpoint not found' }));
    }
}

// 서버 생성
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // API 요청 처리
    if (pathname.startsWith('/api/')) {
        handleAPI(req, res, pathname);
        return;
    }
    
    // 루트 경로는 index.html로 리다이렉트
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    const filePath = path.join(__dirname, pathname);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    // 파일 읽기
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // 파일이 없으면 index.html로 리다이렉트 (SPA 지원)
                fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end('<h1>404 Not Found</h1>');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(data);
                    }
                });
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1>');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

// 서버 시작
server.listen(PORT, () => {
    console.log(`🚀 Korean Learning App is running on port ${PORT}`);
    console.log(`📱 Open http://localhost:${PORT} to view the app`);
    console.log(`📁 Serving files from: ${__dirname}`);
});

// 에러 핸들링
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
