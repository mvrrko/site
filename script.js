// ============================================================================
// DATA STRUCTURES
// ============================================================================

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

// Active positions data
const activePositions = [
    { market: 'BTC-UP-15M 02/16 14:30', side: 'BUY', shares: 4175, entry: 0.36, current: 0.64 },
    { market: 'BTC-DOWN-15M 02/16 14:45', side: 'BUY', shares: 2300, entry: 0.42, current: 0.51 },
    { market: 'BTC-UP-15M 02/16 15:00', side: 'BUY', shares: 1800, entry: 0.55, current: 0.48 },
    { market: 'BTC-DOWN-15M 02/16 15:15', side: 'BUY', shares: 3200, entry: 0.38, current: 0.44 },
];

// Closed positions data
const closedPositions = [
    { market: 'BTC-UP-15M 02/16 13:00', side: 'BUY', shares: 2500, entry: 0.47, exit: 0.53, time: '14m 32s' },
    { market: 'BTC-DOWN-15M 02/16 12:45', side: 'BUY', shares: 1800, entry: 0.62, exit: 0.72, time: '18m 15s' },
    { market: 'BTC-UP-15M 02/16 12:30', side: 'BUY', shares: 3100, entry: 0.39, exit: 0.45, time: '22m 08s' },
    { market: 'BTC-DOWN-15M 02/16 12:15', side: 'BUY', shares: 2200, entry: 0.51, exit: 0.58, time: '16m 47s' },
    { market: 'BTC-UP-15M 02/16 12:00', side: 'BUY', shares: 1900, entry: 0.44, exit: 0.39, time: '14m 21s' },
];

// Recent trades for the feed
const recentTrades = [
    { time: '14:32:21', market: 'BTC-UP-15M', price: 0.53, pnl: 3.00, return: 6.4, win: true },
    { time: '14:28:15', market: 'BTC-DOWN-15M', price: 0.71, pnl: 8.40, return: 13.2, win: true },
    { time: '14:25:03', market: 'BTC-UP-15M', price: 0.39, pnl: -2.20, return: -5.1, win: false },
    { time: '14:21:47', market: 'BTC-UP-15M', price: 0.62, pnl: 5.10, return: 11.8, win: true },
    { time: '14:18:33', market: 'BTC-DOWN-15M', price: 0.48, pnl: 4.20, return: 9.3, win: true },
    { time: '14:15:12', market: 'BTC-UP-15M', price: 0.55, pnl: -1.80, return: -3.2, win: false },
    { time: '14:11:58', market: 'BTC-DOWN-15M', price: 0.67, pnl: 6.70, return: 12.1, win: true },
    { time: '14:08:29', market: 'BTC-UP-15M', price: 0.41, pnl: 2.90, return: 7.6, win: true },
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

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================

const POSITIVE_BIAS = 0.3;
const TREND_BIAS = 0.35;
const VOLATILITY_RANGE = 150;
const BASE_GAIN = 20;
const INITIAL_UPTIME_DAYS = 14;

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

let logIndex = 0;
let startTime = Date.now();
let pnlChartInstance = null;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

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

function formatNumber(num) {
    return num.toLocaleString('en-US');
}

function formatCurrency(val) {
    return `$${Math.abs(val).toFixed(2)}`;
}

// ============================================================================
// TICKER BAR UPDATES
// ============================================================================

function updateTicker() {
    const btcPrice = document.getElementById('btcPrice');
    const btcChange = document.getElementById('btcChange');
    const btcUpPrice = document.getElementById('btcUpPrice');
    const btcDownPrice = document.getElementById('btcDownPrice');
    const tickerSpread = document.getElementById('tickerSpread');
    
    if (btcPrice) {
        const variance = (Math.random() - 0.5) * 200;
        const price = 67432.18 + variance;
        btcPrice.textContent = `$${formatNumber(price.toFixed(2))}`;
        
        const changePercent = ((Math.random() - 0.3) * 3).toFixed(1);
        const isPositive = changePercent >= 0;
        btcChange.textContent = `${isPositive ? '▲' : '▼'} ${isPositive ? '+' : ''}${changePercent}%`;
        btcChange.className = `ticker-change ${isPositive ? 'positive' : 'negative'}`;
    }
    
    if (btcUpPrice) {
        const upVariance = (Math.random() - 0.5) * 0.04;
        btcUpPrice.textContent = `$${(0.52 + upVariance).toFixed(2)}`;
    }
    
    if (btcDownPrice) {
        const downVariance = (Math.random() - 0.5) * 0.04;
        btcDownPrice.textContent = `$${(0.48 + downVariance).toFixed(2)}`;
    }
    
    if (tickerSpread) {
        const spreadVariance = (Math.random() - 0.5) * 0.01;
        tickerSpread.textContent = (0.023 + spreadVariance).toFixed(3);
    }
}

// ============================================================================
// SUMMARY STATS CARDS
// ============================================================================

function updateStatsCards() {
    const positionsValue = document.getElementById('positionsValue');
    const monthlyPnl = document.getElementById('monthlyPnl');
    const allTimeTrades = document.getElementById('allTimeTrades');
    const biggestWin = document.getElementById('biggestWin');
    
    if (positionsValue) {
        const variance = (Math.random() - 0.5) * 500;
        const value = 11742.00 + variance;
        positionsValue.textContent = `$${formatNumber(value.toFixed(2))}`;
    }
    
    if (monthlyPnl) {
        const variance = (Math.random() - 0.5) * 200;
        const pnl = 4218.37 + variance;
        monthlyPnl.textContent = `+$${formatNumber(pnl.toFixed(2))}`;
    }
    
    if (allTimeTrades) {
        const variance = Math.floor((Math.random() - 0.5) * 10);
        allTimeTrades.textContent = formatNumber(1247 + variance);
    }
    
    if (biggestWin) {
        const variance = (Math.random() - 0.5) * 20;
        biggestWin.textContent = `+$${(312.50 + variance).toFixed(2)}`;
    }
}

// ============================================================================
// POSITIONS TABLES
// ============================================================================

function renderActivePositions() {
    const tbody = document.getElementById('activePositions');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    activePositions.forEach(pos => {
        // Add small random fluctuation to current price
        const priceVariance = (Math.random() - 0.5) * 0.04;
        const currentPrice = pos.current + priceVariance;
        const value = pos.shares * currentPrice;
        const entryValue = pos.shares * pos.entry;
        const pnl = value - entryValue;
        const returnPct = ((currentPrice - pos.entry) / pos.entry) * 100;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pos.market}</td>
            <td>${pos.side}</td>
            <td>${formatNumber(pos.shares)}</td>
            <td>$${pos.entry.toFixed(2)}</td>
            <td>$${currentPrice.toFixed(2)}</td>
            <td>$${formatNumber(value.toFixed(0))}</td>
            <td class="${pnl >= 0 ? 'positive' : 'negative'}">${pnl >= 0 ? '+' : ''}$${Math.abs(pnl).toFixed(0)}</td>
            <td class="${returnPct >= 0 ? 'positive' : 'negative'}">${returnPct >= 0 ? '+' : ''}${returnPct.toFixed(1)}%</td>
        `;
        tbody.appendChild(row);
    });
}

function renderClosedPositions() {
    const tbody = document.getElementById('closedPositions');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    closedPositions.forEach(pos => {
        const entryValue = pos.shares * pos.entry;
        const exitValue = pos.shares * pos.exit;
        const pnl = exitValue - entryValue;
        const returnPct = ((pos.exit - pos.entry) / pos.entry) * 100;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pos.market}</td>
            <td>${pos.side}</td>
            <td>${formatNumber(pos.shares)}</td>
            <td>$${pos.entry.toFixed(2)}</td>
            <td>$${pos.exit.toFixed(2)}</td>
            <td class="${pnl >= 0 ? 'positive' : 'negative'}">${pnl >= 0 ? '+' : ''}$${pnl.toFixed(2)}</td>
            <td class="${returnPct >= 0 ? 'positive' : 'negative'}">${returnPct >= 0 ? '+' : ''}${returnPct.toFixed(1)}%</td>
            <td>${pos.time}</td>
        `;
        tbody.appendChild(row);
    });
}

// ============================================================================
// TABS FUNCTIONALITY
// ============================================================================

function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const targetContent = document.getElementById(`${targetTab}Tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// ============================================================================
// RECENT TRADES FEED
// ============================================================================

function renderTradesFeed() {
    const container = document.getElementById('tradesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    recentTrades.forEach(trade => {
        const tradeLine = document.createElement('div');
        tradeLine.className = 'trade-line';
        
        const icon = trade.win ? '✓' : '✗';
        const iconClass = trade.win ? 'win' : 'loss';
        const pnlClass = trade.pnl >= 0 ? 'positive' : 'negative';
        
        tradeLine.innerHTML = `
            <span class="trade-time">[${trade.time}]</span>
            <span class="trade-status">CLOSED</span>
            <span class="trade-market">${trade.market} @ $${trade.price.toFixed(2)}</span>
            <span class="trade-separator">|</span>
            <span class="trade-pnl ${pnlClass}">${trade.pnl >= 0 ? '+' : ''}$${Math.abs(trade.pnl).toFixed(2)} (${trade.return >= 0 ? '+' : ''}${trade.return.toFixed(1)}%)</span>
            <span class="trade-icon ${iconClass}">${icon}</span>
        `;
        
        container.appendChild(tradeLine);
    });
}

function addNewTrade() {
    const markets = ['BTC-UP-15M', 'BTC-DOWN-15M'];
    const market = markets[Math.floor(Math.random() * markets.length)];
    const price = 0.3 + Math.random() * 0.5;
    const pnl = (Math.random() - POSITIVE_BIAS) * 15;
    const returnPct = (Math.random() - POSITIVE_BIAS) * 20;
    const win = pnl > 0;
    
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    const newTrade = { time, market, price, pnl, return: returnPct, win };
    
    recentTrades.unshift(newTrade);
    if (recentTrades.length > 15) {
        recentTrades.pop();
    }
    
    renderTradesFeed();
}

// ============================================================================
// P&L CHART
// ============================================================================

function generatePnLData() {
    const data = [];
    let currentValue = 0;
    
    for (let i = 0; i < 30; i++) {
        // Trend upward with realistic fluctuations
        const change = (Math.random() - TREND_BIAS) * VOLATILITY_RANGE + BASE_GAIN;
        currentValue += change;
        data.push(Math.max(0, currentValue));
    }
    
    return data;
}

function initPnLChart() {
    const canvas = document.getElementById('pnlChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const data = generatePnLData();
    
    // Set canvas size
    const container = canvas.parentElement;
    canvas.width = container.clientWidth - 48; // Account for padding
    canvas.height = 300;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);
    
    // Find min and max for scaling
    const maxValue = Math.max(...data);
    const minValue = 0;
    
    // Draw grid lines
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
        const y = padding + (height - 2 * padding) * (i / 5);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Y-axis labels
        const value = maxValue * (1 - i / 5);
        ctx.fillStyle = '#808080';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`$${value.toFixed(0)}`, padding - 10, y + 4);
    }
    
    // Draw the line chart
    ctx.strokeStyle = '#00ff41';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = padding + (width - 2 * padding) * (index / (data.length - 1));
        const y = height - padding - (height - 2 * padding) * ((value - minValue) / (maxValue - minValue));
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw area under the line
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 255, 65, 0.1)';
    ctx.fill();
    
    // X-axis labels (dates)
    ctx.fillStyle = '#808080';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    
    const daysToShow = [0, 7, 14, 21, 29];
    daysToShow.forEach(day => {
        const x = padding + (width - 2 * padding) * (day / (data.length - 1));
        const date = new Date();
        date.setDate(date.getDate() - (29 - day));
        const label = `${date.getMonth() + 1}/${date.getDate()}`;
        ctx.fillText(label, x, height - padding + 20);
    });
}

// ============================================================================
// EXISTING LOG FUNCTIONALITY
// ============================================================================

function addLogLine() {
    const logContainer = document.getElementById('logContainer');
    if (!logContainer) return;
    
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

function updateMetric(id, config) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const variance = (Math.random() - 0.5) * 2 * config.variance;
    const newValue = config.base + variance;
    element.textContent = config.format(newValue);
}

function updateMetrics() {
    Object.entries(metricConfigs).forEach(([id, config]) => {
        updateMetric(id, config);
    });
}

function updateUptime() {
    const uptimeElement = document.getElementById('uptime');
    if (!uptimeElement) return;
    
    const elapsed = Date.now() - startTime;
    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24)) + INITIAL_UPTIME_DAYS;
    const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + 7;
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60)) + 32;
    
    uptimeElement.textContent = `${days}d ${hours}h ${minutes}m`;
}

// ============================================================================
// SMOOTH SCROLL
// ============================================================================

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

// ============================================================================
// INITIALIZATION
// ============================================================================

function initializeLogs() {
    const logContainer = document.getElementById('logContainer');
    if (!logContainer) return;
    
    // Add first few lines immediately
    for (let i = 0; i < 5; i++) {
        addLogLine();
    }
}

function init() {
    // Initialize all components
    initializeLogs();
    initSmoothScroll();
    initTabs();
    
    // Render initial data
    renderActivePositions();
    renderClosedPositions();
    renderTradesFeed();
    initPnLChart();
    updateStatsCards();
    updateTicker();
    updateMetrics();
    
    // Set up intervals for live updates
    
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
    
    // Update ticker every 2-5 seconds
    setInterval(() => {
        updateTicker();
    }, 2000 + Math.random() * 3000);
    
    // Update stats cards every 4-7 seconds
    setInterval(() => {
        updateStatsCards();
    }, 4000 + Math.random() * 3000);
    
    // Update active positions every 3-5 seconds (to show live price changes)
    setInterval(() => {
        renderActivePositions();
    }, 3000 + Math.random() * 2000);
    
    // Add new trade to feed every 15-30 seconds
    setInterval(() => {
        addNewTrade();
    }, 15000 + Math.random() * 15000);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
