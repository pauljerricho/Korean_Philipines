#!/usr/bin/env python3
"""
JSON 파일들을 SQLite 데이터베이스로 변환하는 스크립트
"""

import json
import sqlite3
import os
from pathlib import Path

def create_database():
    """SQLite 데이터베이스와 테이블 생성"""
    conn = sqlite3.connect('korean_philippines.db')
    cursor = conn.cursor()
    
    # categories 테이블 생성
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            description TEXT
        )
    ''')
    
    # words 테이블 생성
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS words (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category_id INTEGER,
            korean TEXT NOT NULL,
            romanization TEXT,
            filipino TEXT,
            english TEXT,
            FOREIGN KEY (category_id) REFERENCES categories (id)
        )
    ''')
    
    # 인덱스 생성
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_words_category ON words(category_id)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_words_korean ON words(korean)')
    
    conn.commit()
    return conn

def clean_duplicates(words_list):
    """중복 제거"""
    seen = set()
    unique_words = []
    
    for word in words_list:
        # korean을 기준으로 중복 체크
        key = word.get('korean', '')
        if key and key not in seen:
            seen.add(key)
            unique_words.append(word)
    
    return unique_words

def import_json_data(conn):
    """JSON 파일들을 데이터베이스로 임포트"""
    cursor = conn.cursor()
    data_dir = Path('data')
    
    # 기존 데이터 삭제
    cursor.execute('DELETE FROM words')
    cursor.execute('DELETE FROM categories')
    
    json_files = [
        'colors.json', 'emotions.json', 'family.json', 'food.json', 
        'greetings.json', 'numbers.json', 'places.json', 
        'shopping.json', 'time.json', 'weather.json'
    ]
    
    for json_file in json_files:
        file_path = data_dir / json_file
        if not file_path.exists():
            print(f"파일을 찾을 수 없습니다: {file_path}")
            continue
            
        print(f"처리 중: {json_file}")
        
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # 카테고리 추가
        category_name = data.get('category', '')
        category_title = data.get('title', '')
        category_desc = data.get('description', '')
        
        cursor.execute('''
            INSERT INTO categories (name, title, description) 
            VALUES (?, ?, ?)
        ''', (category_name, category_title, category_desc))
        
        category_id = cursor.lastrowid
        
        # 단어들 추가 (중복 제거)
        words = data.get('words', [])
        unique_words = clean_duplicates(words)
        
        # 100개로 제한
        words_to_add = unique_words[:100]
        
        for word in words_to_add:
            cursor.execute('''
                INSERT INTO words (category_id, korean, romanization, filipino, english)
                VALUES (?, ?, ?, ?, ?)
            ''', (
                category_id,
                word.get('korean', ''),
                word.get('romanization', ''),
                word.get('filipino', ''),
                word.get('english', '')
            ))
        
        print(f"  - {len(words_to_add)}개 단어 추가됨")
    
    conn.commit()

def verify_data(conn):
    """데이터 검증"""
    cursor = conn.cursor()
    
    # 카테고리별 단어 수 확인
    cursor.execute('''
        SELECT c.name, c.title, COUNT(w.id) as word_count
        FROM categories c
        LEFT JOIN words w ON c.id = w.category_id
        GROUP BY c.id, c.name, c.title
        ORDER BY c.name
    ''')
    
    print("\n=== 데이터베이스 검증 ===")
    for row in cursor.fetchall():
        print(f"{row[1]} ({row[0]}): {row[2]}개 단어")
    
    # 전체 단어 수
    cursor.execute('SELECT COUNT(*) FROM words')
    total_words = cursor.fetchone()[0]
    print(f"\n총 단어 수: {total_words}개")

def main():
    """메인 함수"""
    print("SQLite 데이터베이스 생성 중...")
    conn = create_database()
    
    print("JSON 데이터 임포트 중...")
    import_json_data(conn)
    
    print("데이터 검증 중...")
    verify_data(conn)
    
    conn.close()
    print("\n데이터베이스 생성 완료: korean_philippines.db")

if __name__ == "__main__":
    main()
