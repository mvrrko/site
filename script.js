// Log templates for cycling
const logTemplates = [
    { timestamp: '', message: 'Connecting to log stream…', class: 'log-info' },
    { timestamp: '', message: 'Stream connected. Receiving data…', class: 'log-success' },
    { timestamp: '', message: 'Market scanner initialized', class: 'log-info' },
    { timestamp: '', message: 'Monitoring BTC-UP-15M markets', class: 'log-info' },
    { timestamp: '', message: 'New signal detected: BTC-UP-15M @ 0.47', class: 'log-warning' },
    { timestamp: '', message: 'Evaluating spread: 0.023 (favorable)', class: 'log-info' },
    { timestamp: '', message: 'Placing order: BUY 50 shares @ 0.47', class: 'log-warning' },
    { timestamp: '', message: 'Order filled. Position opened.', class: 'log-success' },
    { timestamp: '', message: 'Position tracking enabled', class: 'log-info' },
    { timestamp: '', message: 'Price update: 0.52 (+10.6%)', class: 'log-success' },
    { timestamp: '', message: 'Exit signal triggered', class: 'log-warning' },
    { timestamp: '', message: 'Placing order: SELL 50 shares @ 0.53', class: 'log-warning' },
    { timestamp: '', message: 'Order filled. Position closed.', class: 'log-success' },
    { timestamp: '', message: 'Trade closed. PNL: +$3.00', class: 'log-success' },
    { timestamp: '', message: 'Updating metrics...', class: 'log-info' },
    { timestamp: '', message: 'New signal detected: BTC-DOWN-15M @ 0.62', class: 'log-warning' },
    { timestamp: '', message: 'Evaluating spread: 0.018 (favorable)', class: 'log-info' },
    { timestamp: '', message: 'Placing order: BUY 75 shares @ 0.62', class: 'log-warning' },
    { timestamp: '', message: 'Order filled. Position opened.', class: 'log-success' },
    { timestamp: '', message: 'Price update: 0.58 (-6.5%)', class: 'log-warning' },
    { timestamp: '', message: 'Holding position...', class: 'log-info' },
    { timestamp: '', message: 'Price update: 0.71 (+14.5%)', class: 'log-success' },
    { timestamp: '', message: 'Exit signal triggered', class: 'log-warning' },
    { timestamp: '', message: 'Placing order: SELL 75 shares @ 0.72', class: 'log-warning' },
    { timestamp: '', message: 'Order filled. Position closed.', class: 'log-success' },
    { timestamp: '', message: 'Trade closed. PNL: +$7.50', class: 'log-success' },
    { timestamp: '', message: 'Scanning for opportunities...', class: 'log-info' },
    { timestamp: '', message: 'New signal detected: BTC-UP-15M @ 0.39', class: 'log-warning' },
    { timestamp: '', message: 'Risk assessment: MEDIUM', class: 'log-info' },
    { timestamp: '', message: 'Placing order: BUY 60 shares @ 0.39', class: 'log-warning' },
    { timestamp: '', message: 'Order filled. Position opened.', class: 'log-success' },
    { timestamp: '', message: 'Price update: 0.44 (+12.8%)', class: 'log-success' },
    { timestamp: '', message: 'Trailing stop updated', class: 'log-info' },
    { timestamp: '', message: 'Exit signal triggered', class: 'log-warning' },
    { timestamp: '', message: 'Placing order: SELL 60 shares @ 0.45', class: 'log-warning' },
    { timestamp: '', message: 'Order filled. Position closed.', class: 'log-success' },
    { timestamp: '', message: 'Trade closed. PNL: +$3.60', class: 'log-success' },
    { timestamp: '', message: 'Market volatility increased', class: 'log-warning' },
    { timestamp: '', message: 'Adjusting position sizing...', class: 'log-info' },
];

// Metric update configurations
const metricConfigs = {
    pnl: {
        base: 1247.83,
        variance: 50,
        format: (val) => val >= 0 ? `+$${val.toFixed(2)}` : `-$${Math.abs(val).toFixed(2)}`
    },
    spread: {
        base: 0.023,
        variance: 0.005,
        format: (val) => val.toFixed(3)
    },
    positions: {
        base: 3,
        variance: 2,
        format: (val) => Math.max(0, Math.floor(val)).toString()
    },
    winrate: {
        base: 73.2,
        variance: 3,
        format: (val) => `${val.toFixed(1)}%`
    }
};

// State
let logIndex = 0;
let startTime = Date.now();

// Format timestamp
function formatTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Add log line
function addLogLine() {
    const logContainer = document.getElementById('logContainer');
    const template = logTemplates[logIndex];
    
    const logLine = document.createElement('div');
    logLine.className = 'log-line';
    
    const timestamp = document.createElement('span');
    timestamp.className = 'log-timestamp';
    timestamp.textContent = `[${formatTimestamp()}] `;
    
    const message = document.createElement('span');
    message.className = `log-message ${template.class}`;
    message.textContent = template.message;
    
    logLine.appendChild(timestamp);
    logLine.appendChild(message);
    logContainer.appendChild(logLine);
    
    // Auto-scroll to bottom
    logContainer.scrollTop = logContainer.scrollHeight;
    
    // Keep only last 50 lines
    while (logContainer.children.length > 50) {
        logContainer.removeChild(logContainer.firstChild);
    }
    
    logIndex = (logIndex + 1) % logTemplates.length;
}

// Update metric with animation
function updateMetric(id, config) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const variance = (Math.random() - 0.5) * 2 * config.variance;
    const newValue = config.base + variance;
    element.textContent = config.format(newValue);
}

// Update all metrics
function updateMetrics() {
    Object.entries(metricConfigs).forEach(([id, config]) => {
        updateMetric(id, config);
    });
}

// Update uptime
function updateUptime() {
    const uptimeElement = document.getElementById('uptime');
    if (!uptimeElement) return;
    
    const elapsed = Date.now() - startTime;
    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24)) + 14; // Start at 14 days
    const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + 7;
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60)) + 32;
    
    uptimeElement.textContent = `${days}d ${hours}h ${minutes}m`;
}

// Smooth scroll for navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add initial log lines quickly
function initializeLogs() {
    const logContainer = document.getElementById('logContainer');
    
    // Add first few lines immediately
    for (let i = 0; i < 5; i++) {
        addLogLine();
    }
}

// Initialize everything
function init() {
    initializeLogs();
    initSmoothScroll();
    
    // Add new log line every 2-4 seconds
    setInterval(() => {
        addLogLine();
    }, 2000 + Math.random() * 2000);
    
    // Update metrics every 3-6 seconds
    setInterval(() => {
        updateMetrics();
    }, 3000 + Math.random() * 3000);
    
    // Update uptime every minute
    setInterval(() => {
        updateUptime();
    }, 60000);
    
    // Initial metric update
    updateMetrics();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
