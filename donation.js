// Donation and Support System
// Integrated payment processing and supporter recognition

const DONATION_SYSTEM = {
    // Donation tiers
    tiers: [
        {
            id: 'coffee',
            name: 'Coffee Support',
            amount: 5,
            currency: 'USD',
            description: 'Buy me a coffee! ☕',
            benefits: ['Thank you message', 'Supporter badge'],
            color: '#8B4513',
            icon: 'fas fa-coffee'
        },
        {
            id: 'lunch',
            name: 'Lunch Support',
            amount: 15,
            currency: 'USD',
            description: 'Buy me lunch! 🍱',
            benefits: ['Thank you message', 'Supporter badge', 'Early access to new features'],
            color: '#FF6B35',
            icon: 'fas fa-utensils'
        },
        {
            id: 'dinner',
            name: 'Dinner Support',
            amount: 30,
            currency: 'USD',
            description: 'Buy me dinner! 🍽️',
            benefits: ['Thank you message', 'Supporter badge', 'Early access', 'Premium content'],
            color: '#FFD700',
            icon: 'fas fa-wine-glass-alt'
        },
        {
            id: 'monthly',
            name: 'Monthly Supporter',
            amount: 10,
            currency: 'USD',
            description: 'Monthly recurring support 💝',
            benefits: ['All previous benefits', 'Monthly supporter badge', 'Priority support'],
            color: '#9B59B6',
            icon: 'fas fa-heart',
            recurring: true
        },
        {
            id: 'patron',
            name: 'Patron',
            amount: 50,
            currency: 'USD',
            description: 'Become a patron! 👑',
            benefits: ['All benefits', 'Patron badge', 'Name in credits', 'Direct communication'],
            color: '#E74C3C',
            icon: 'fas fa-crown'
        }
    ],
    
    // Payment methods
    paymentMethods: [
        {
            id: 'paypal',
            name: 'PayPal',
            icon: 'fab fa-paypal',
            color: '#0070BA',
            enabled: true
        },
        {
            id: 'stripe',
            name: 'Credit Card',
            icon: 'fas fa-credit-card',
            color: '#635BFF',
            enabled: true
        },
        {
            id: 'gcash',
            name: 'GCash (Philippines)',
            icon: 'fas fa-mobile-alt',
            color: '#0070BA',
            enabled: true
        },
        {
            id: 'paymaya',
            name: 'PayMaya (Philippines)',
            icon: 'fas fa-wallet',
            color: '#00D4AA',
            enabled: true
        }
    ],
    
    // Supporter benefits
    benefits: {
        'supporter-badge': {
            name: 'Supporter Badge',
            description: 'Special badge on your profile',
            icon: 'fas fa-star',
            color: '#FFD700'
        },
        'early-access': {
            name: 'Early Access',
            description: 'Access to new features before release',
            icon: 'fas fa-rocket',
            color: '#9B59B6'
        },
        'premium-content': {
            name: 'Premium Content',
            description: 'Exclusive learning materials',
            icon: 'fas fa-gem',
            color: '#E74C3C'
        },
        'priority-support': {
            name: 'Priority Support',
            description: 'Faster response to your questions',
            icon: 'fas fa-headset',
            color: '#3498DB'
        }
    }
};

// Donation tracking
const DONATION_STATS = {
    totalDonations: 0,
    totalSupporters: 0,
    monthlyGoal: 500,
    currentMonth: 0,
    supporters: [],
    recentDonations: []
};

// Donation functions
function initializeDonationSystem() {
    loadDonationStats();
    updateDonationUI();
}

function loadDonationStats() {
    const saved = localStorage.getItem('koreanAppDonationStats');
    if (saved) {
        Object.assign(DONATION_STATS, JSON.parse(saved));
    }
}

function saveDonationStats() {
    localStorage.setItem('koreanAppDonationStats', JSON.stringify(DONATION_STATS));
}

function processDonation(tierId, paymentMethod, amount, donorInfo) {
    const tier = DONATION_SYSTEM.tiers.find(t => t.id === tierId);
    if (!tier) return false;
    
    // Simulate payment processing
    const donation = {
        id: Date.now().toString(),
        tierId,
        tierName: tier.name,
        amount: amount || tier.amount,
        currency: tier.currency,
        paymentMethod,
        donorInfo,
        timestamp: new Date().toISOString(),
        status: 'completed'
    };
    
    // Update stats
    DONATION_STATS.totalDonations += donation.amount;
    DONATION_STATS.currentMonth += donation.amount;
    DONATION_STATS.recentDonations.unshift(donation);
    
    // Add supporter if new
    if (!DONATION_STATS.supporters.find(s => s.email === donorInfo.email)) {
        DONATION_STATS.supporters.push({
            name: donorInfo.name,
            email: donorInfo.email,
            joinDate: new Date().toISOString(),
            totalDonated: donation.amount,
            tier: tierId
        });
        DONATION_STATS.totalSupporters++;
    }
    
    // Keep only last 10 donations
    if (DONATION_STATS.recentDonations.length > 10) {
        DONATION_STATS.recentDonations = DONATION_STATS.recentDonations.slice(0, 10);
    }
    
    saveDonationStats();
    updateDonationUI();
    showThankYouMessage(donation);
    
    return true;
}

function updateDonationUI() {
    // Update progress bar
    const progressBar = document.getElementById('donation-progress');
    if (progressBar) {
        const progress = (DONATION_STATS.currentMonth / DONATION_STATS.monthlyGoal) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
    
    // Update stats
    const totalElement = document.getElementById('total-donations');
    if (totalElement) {
        totalElement.textContent = `$${DONATION_STATS.totalDonations}`;
    }
    
    const supportersElement = document.getElementById('total-supporters');
    if (supportersElement) {
        supportersElement.textContent = DONATION_STATS.totalSupporters;
    }
    
    // Update recent donations
    updateRecentDonations();
}

function updateRecentDonations() {
    const container = document.getElementById('recent-donations');
    if (!container) return;
    
    container.innerHTML = DONATION_STATS.recentDonations.map(donation => `
        <div class="donation-item">
            <div class="donor-info">
                <strong>${donation.donorInfo.name}</strong>
                <span class="amount">$${donation.amount}</span>
            </div>
            <div class="donation-details">
                <span class="tier">${donation.tierName}</span>
                <span class="time">${formatTimeAgo(donation.timestamp)}</span>
            </div>
        </div>
    `).join('');
}

function showThankYouMessage(donation) {
    const message = document.createElement('div');
    message.className = 'thank-you-message';
    message.innerHTML = `
        <div class="thank-you-content">
            <h3>Thank you, ${donation.donorInfo.name}! 🙏</h3>
            <p>Your support of $${donation.amount} helps keep this app free for everyone!</p>
            <div class="benefits">
                <h4>You've unlocked:</h4>
                <ul>
                    ${getTierBenefits(donation.tierId).map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
            </div>
            <button class="close-thank-you">Close</button>
        </div>
    `;
    
    message.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    document.body.appendChild(message);
    
    message.querySelector('.close-thank-you').addEventListener('click', () => {
        document.body.removeChild(message);
    });
}

function getTierBenefits(tierId) {
    const tier = DONATION_SYSTEM.tiers.find(t => t.id === tierId);
    return tier ? tier.benefits : [];
}

function formatTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DONATION_SYSTEM, DONATION_STATS, initializeDonationSystem, processDonation };
} else {
    window.DONATION_SYSTEM = DONATION_SYSTEM;
    window.DONATION_STATS = DONATION_STATS;
    window.initializeDonationSystem = initializeDonationSystem;
    window.processDonation = processDonation;
}
