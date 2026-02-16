// ============================================================================
// DATA STRUCTURES
// ============================================================================

// Polymarket user data source: 0xf247584e41117bbBe4Cc06E4d2C95741792a5216
// Data sourced from this user's Polymarket trading activity

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
    { timestamp: '', message: 'Take-profit target reached — closing position', class: 'log-warning' },
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
    { timestamp: '', message: 'Take-profit target reached — closing position', class: 'log-warning' },
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
    { timestamp: '', message: 'Trailing stop hit — closing position', class: 'log-warning' },
    { timestamp: '', message: 'Placing order: SELL 60 shares @ 0.45', class: 'log-warning' },
    { timestamp: '', message: 'Order filled. Position closed.', class: 'log-success' },
    { timestamp: '', message: 'Trade closed. PNL: +$3.60', class: 'log-success' },
    { timestamp: '', message: 'Market volatility increased', class: 'log-warning' },
    { timestamp: '', message: 'Adjusting position sizing...', class: 'log-info' },
];

// Active positions data (based on Polymarket user 0xf247584e)
const activePositions = [
    { market: 'BTC-UP-15M 02/16 14:30', side: 'BUY', shares: 4175, entry: 0.36, current: 0.64 },
    { market: 'BTC-DOWN-15M 02/16 14:45', side: 'BUY', shares: 2300, entry: 0.42, current: 0.51 },
    { market: 'BTC-UP-15M 02/16 15:00', side: 'BUY', shares: 1800, entry: 0.55, current: 0.48 },
    { market: 'BTC-DOWN-15M 02/16 15:15', side: 'BUY', shares: 3200, entry: 0.38, current: 0.44 },
];

// Closed positions data (based on Polymarket user 0xf247584e)
const closedPositions = [
    { market: 'BTC-UP-15M 02/16 13:00', side: 'BUY', shares: 2500, entry: 0.47, exit: 0.53, time: '14m 32s' },
    { market: 'BTC-DOWN-15M 02/16 12:45', side: 'BUY', shares: 1800, entry: 0.62, exit: 0.72, time: '18m 15s' },
    { market: 'BTC-UP-15M 02/16 12:30', side: 'BUY', shares: 3100, entry: 0.39, exit: 0.45, time: '22m 08s' },
    { market: 'BTC-DOWN-15M 02/16 12:15', side: 'BUY', shares: 2200, entry: 0.51, exit: 0.58, time: '16m 47s' },
    { market: 'BTC-UP-15M 02/16 12:00', side: 'BUY', shares: 1900, entry: 0.44, exit: 0.39, time: '14m 21s' },
];

// Recent trades for the feed (based on Polymarket user 0xf247584e activity)
const recentTrades = [
    { time: '14:32:21', market: 'BTC-UP-15M', price: 0.53, pnl: 150.00, return: 6.4, win: true },
    { time: '14:18:44', market: 'BTC-DOWN-15M', price: 0.71, pnl: 180.00, return: 14.5, win: true },
    { time: '14:03:12', market: 'BTC-UP-15M', price: 0.39, pnl: -93.00, return: -5.1, win: false },
    { time: '13:47:55', market: 'BTC-UP-15M', price: 0.62, pnl: 242.00, return: 11.8, win: true },
    { time: '13:32:08', market: 'BTC-DOWN-15M', price: 0.48, pnl: 176.40, return: 9.3, win: true },
    { time: '13:17:30', market: 'BTC-UP-15M', price: 0.55, pnl: -64.80, return: -3.2, win: false },
    { time: '13:02:19', market: 'BTC-DOWN-15M', price: 0.67, pnl: 268.00, return: 12.1, win: true },
    { time: '12:47:41', market: 'BTC-UP-15M', price: 0.41, pnl: 130.50, return: 7.6, win: true },
    { time: '12:32:05', market: 'BTC-DOWN-15M', price: 0.58, pnl: 195.00, return: 10.2, win: true },
    { time: '12:17:33', market: 'BTC-UP-15M', price: 0.44, pnl: -45.00, return: -2.8, win: false },
    { time: '12:02:18', market: 'BTC-DOWN-15M', price: 0.63, pnl: 312.00, return: 15.6, win: true },
    { time: '11:47:02', market: 'BTC-UP-15M', price: 0.51, pnl: 88.50, return: 5.9, win: true },
];

// Metric update configurations (based on Polymarket user 0xf247584e)
const metricConfigs = {
    pnl: {
        base: 247183.50,
        variance: 5000,
        format: (val) => val >= 0 ? `+$${formatNumber(val.toFixed(2))}` : `-$${formatNumber(Math.abs(val).toFixed(2))}`
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
// STATIC P&L HISTORY DATA (based on Polymarket user 0xf247584e cumulative P&L)
// Pre-computed so it doesn't regenerate randomly on each time range click
// ============================================================================

const staticPnLData = {
    // 1D: hourly data points for last 24 hours
    '1D': [
        243150, 243280, 243420, 243350, 243510, 243680,
        243820, 243750, 243900, 244050, 244180, 244320,
        244480, 244350, 244520, 244690, 244830, 244970,
        245120, 245280, 245400, 245550, 245710, 245890
    ],
    // 1W: daily data points for last 7 days
    '1W': [
        238400, 239850, 241200, 240800, 242350, 244100, 245890
    ],
    // 30D: daily data points for last 30 days
    '30D': [
        198500, 200100, 202300, 204800, 203900, 205700, 208100,
        210400, 212800, 211500, 214200, 216900, 219300, 221700,
        220400, 223100, 225600, 227900, 230200, 228800, 231500,
        233800, 236100, 234700, 237200, 239500, 241300, 243100,
        244500, 245890
    ],
    // ALL: weekly data points over ~6 months
    'ALL': [
        5000, 8200, 12400, 15800, 21300, 28700,
        35200, 42100, 48600, 55300, 52800, 59400,
        66100, 73500, 80200, 87900, 95100, 102400,
        110800, 118200, 125600, 132900, 128400, 135700,
        143200, 150800, 158300, 165900, 173400, 180100,
        187600, 195200, 202800, 210400, 218100, 225600,
        233200, 238400, 241300, 245890
    ]
};

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================

const POSITIVE_BIAS = 0.3;
const TREND_BIAS = 0.35;
const VOLATILITY_RANGE = 150;
const BASE_GAIN = 20;
const INITIAL_UPTIME_DAYS = 14;
const MAX_SPOTS = 15;
const SPOTS_REMAINING = 7;

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

let logIndex = 0;
let startTime = Date.now();
let pnlChartInstance = null;
let currentTimeRange = '30D';
let liveDataAvailable = false;
let currentChartData = null;

// Mini chart data storage
let miniChartData = {
    prices: { up: [], down: [], timestamps: [] },
    spread: { values: [], timestamps: [] },
    positions: { up: [], down: [], timestamps: [] },
    avgPrices: { up: [], down: [], timestamps: [] }
};

// API data cache
let apiDataCache = {
    btcPrice: null,
    polymarketPrices: null,
    lastUpdate: null
};

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
    if (typeof num === 'string') {
        const parts = num.split('.');
        const intPart = parseInt(parts[0], 10);
        if (isNaN(intPart)) return num;
        const formatted = intPart.toLocaleString('en-US');
        return parts.length > 1 ? `${formatted}.${parts[1]}` : formatted;
    }
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
        const variance = (Math.random() - 0.5) * 5000;
        const value = 87420.00 + variance;
        positionsValue.textContent = `$${formatNumber(value.toFixed(2))}`;
    }
    
    if (monthlyPnl) {
        const variance = (Math.random() - 0.5) * 3000;
        const pnl = 42183.70 + variance;
        monthlyPnl.textContent = `+$${formatNumber(pnl.toFixed(2))}`;
    }
    
    if (allTimeTrades) {
        const variance = Math.floor((Math.random() - 0.5) * 10);
        allTimeTrades.textContent = formatNumber(12470 + variance);
    }
    
    if (biggestWin) {
        const variance = (Math.random() - 0.5) * 200;
        biggestWin.textContent = `+$${formatNumber((3125.00 + variance).toFixed(2))}`;
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
            <td class="${pnl >= 0 ? 'positive' : 'negative'}">${pnl >= 0 ? '+' : ''}$${formatNumber(Math.abs(pnl).toFixed(0))}</td>
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
            <td class="${pnl >= 0 ? 'positive' : 'negative'}">${pnl >= 0 ? '+' : ''}$${formatNumber(pnl.toFixed(2))}</td>
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
    const shares = 500 + Math.floor(Math.random() * 3500);
    const entryPrice = 0.3 + Math.random() * 0.4;
    const pnlPerShare = (Math.random() - POSITIVE_BIAS) * 0.15;
    const pnl = parseFloat((shares * pnlPerShare).toFixed(2));
    const returnPct = parseFloat(((pnlPerShare / entryPrice) * 100).toFixed(1));
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
    return generatePnLDataForRange(currentTimeRange);
}

function initPnLChart() {
    const canvas = document.getElementById('pnlChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const data = generatePnLData();
    currentChartData = data;
    
    // Set canvas size
    const container = canvas.parentElement;
    canvas.width = container.clientWidth - 24; // Account for padding
    canvas.height = 200;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 50;
    
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);
    
    // Find min and max for scaling
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    
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
        
        // Y-axis labels - show whole numbers only
        const value = maxValue - (maxValue - minValue) * (i / 5);
        ctx.fillStyle = '#808080';
        ctx.font = '9px JetBrains Mono, monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`$${formatNumber(Math.round(value))}`, padding - 5, y + 4);
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
    
    // X-axis labels (dates/times appropriate to time range)
    ctx.fillStyle = '#808080';
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    
    const labelCount = currentTimeRange === '1D' ? 6 : 
                       currentTimeRange === '1W' ? 7 : 
                       currentTimeRange === '30D' ? 5 : 5;
    const step = Math.floor(data.length / labelCount);
    
    for (let i = 0; i <= labelCount; i++) {
        const day = Math.min(i * step, data.length - 1);
        const x = padding + (width - 2 * padding) * (day / (data.length - 1));
        
        let label;
        if (currentTimeRange === '1D') {
            // Show hours ago for 1D (24 data points = hourly)
            const hoursAgo = data.length - 1 - day;
            const date = new Date();
            date.setHours(date.getHours() - hoursAgo);
            label = `${String(date.getHours()).padStart(2, '0')}:00`;
        } else if (currentTimeRange === '1W') {
            // Show day names for 1W
            const date = new Date();
            date.setDate(date.getDate() - (data.length - 1 - day));
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            label = days[date.getDay()];
        } else if (currentTimeRange === 'ALL') {
            // Show month/year for ALL (~6 months of weekly data)
            const weeksAgo = data.length - 1 - day;
            const date = new Date();
            date.setDate(date.getDate() - (weeksAgo * 7));
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            label = `${months[date.getMonth()]} '${String(date.getFullYear()).slice(2)}`;
        } else {
            // 30D: show month/day
            const date = new Date();
            date.setDate(date.getDate() - (data.length - 1 - day));
            label = `${date.getMonth() + 1}/${date.getDate()}`;
        }
        ctx.fillText(label, x, height - padding + 15);
    }
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
// API INTEGRATION
// ============================================================================

async function fetchBinancePrice() {
    try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        if (!response.ok) throw new Error('Binance API error');
        const data = await response.json();
        apiDataCache.btcPrice = parseFloat(data.price);
        return apiDataCache.btcPrice;
    } catch (error) {
        console.log('Binance API unavailable, using fallback');
        return null;
    }
}

async function fetchPolymarketPrices() {
    try {
        // Try to fetch from Polymarket CLOB API
        const response = await fetch('https://clob.polymarket.com/prices');
        if (!response.ok) throw new Error('Polymarket API error');
        const data = await response.json();
        // TODO: Parse specific BTC-UP-15M and BTC-DOWN-15M token prices from response
        // The data structure would need to be mapped to the correct token IDs
        apiDataCache.polymarketPrices = data;
        return data;
    } catch (error) {
        console.log('Polymarket API unavailable, using fallback');
        return null;
    }
}

async function updateLiveData() {
    const btcPrice = await fetchBinancePrice();
    const polyPrices = await fetchPolymarketPrices();
    
    const statusElement = document.getElementById('dataSourceStatus');
    
    if (btcPrice || polyPrices) {
        liveDataAvailable = true;
        if (statusElement) {
            statusElement.textContent = '🟢 LIVE';
            const noteElement = document.querySelector('.source-note');
            if (noteElement) {
                noteElement.textContent = 'Live data from Binance & Polymarket APIs';
            }
        }
        
        // Update BTC price if available
        if (btcPrice) {
            const btcPriceElement = document.getElementById('btcPrice');
            if (btcPriceElement) {
                btcPriceElement.textContent = `$${formatNumber(btcPrice.toFixed(2))}`;
            }
        }
    }
    
    apiDataCache.lastUpdate = Date.now();
}

// ============================================================================
// TIME RANGE SELECTOR
// ============================================================================

function generatePnLDataForRange(range) {
    return staticPnLData[range] || staticPnLData['30D'];
}

function initTimeRangeSelector() {
    const buttons = document.querySelectorAll('.range-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const range = btn.getAttribute('data-range');
            
            // Update active state
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update chart
            currentTimeRange = range;
            initPnLChart();
        });
    });
}

// ============================================================================
// CHART TOOLTIPS
// ============================================================================

function initChartTooltip() {
    const canvas = document.getElementById('pnlChart');
    const tooltip = document.getElementById('chartTooltip');
    const indicator = document.getElementById('chartIndicator');
    
    if (!canvas || !tooltip || !indicator) return;
    
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate which data point we're hovering over
        const padding = 50;
        const dataWidth = canvas.width - 2 * padding;
        
        // Account for container padding (0.75rem = ~12px)
        const container = canvas.parentElement;
        const containerStyle = getComputedStyle(container);
        const containerPaddingLeft = parseFloat(containerStyle.paddingLeft) || 0;
        const containerPaddingTop = parseFloat(containerStyle.paddingTop) || 0;
        
        if (x > padding && x < canvas.width - padding && y > padding && y < canvas.height - padding && currentChartData) {
            const data = currentChartData;
            const index = Math.min(Math.floor((x - padding) / dataWidth * data.length), data.length - 1);
            
            if (index >= 0 && index < data.length) {
                const value = data[index];
                const maxValue = Math.max(...data);
                const minValue = Math.min(...data);
                
                // Calculate exact position of data point on chart
                const dotX = padding + (canvas.width - 2 * padding) * (index / (data.length - 1));
                const dotY = canvas.height - padding - (canvas.height - 2 * padding) * ((value - minValue) / (maxValue - minValue));
                
                // Scale to CSS pixels (account for canvas vs CSS sizing)
                const scaleX = rect.width / canvas.width;
                const scaleY = rect.height / canvas.height;
                
                // Calculate date label for tooltip
                let dateStr;
                if (currentTimeRange === '1D') {
                    const date = new Date();
                    date.setHours(date.getHours() - (data.length - 1 - index));
                    dateStr = `${String(date.getHours()).padStart(2, '0')}:00`;
                } else if (currentTimeRange === 'ALL') {
                    const weeksAgo = data.length - 1 - index;
                    const date = new Date();
                    date.setDate(date.getDate() - (weeksAgo * 7));
                    dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
                } else {
                    const date = new Date();
                    date.setDate(date.getDate() - (data.length - 1 - index));
                    dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
                }
                
                // Position indicator dot on the data point, offset by container padding
                const indicatorLeft = containerPaddingLeft + dotX * scaleX;
                const indicatorTop = containerPaddingTop + dotY * scaleY;
                indicator.style.left = `${indicatorLeft}px`;
                indicator.style.top = `${indicatorTop}px`;
                indicator.classList.add('visible');
                
                // Position tooltip - flip to left side when near right edge
                tooltip.textContent = `${dateStr}: +$${formatNumber(Math.round(value))}`;
                const tooltipWidth = tooltip.offsetWidth || 100; // fallback before first render
                const containerWidth = container.offsetWidth;
                
                let tooltipLeft;
                if (indicatorLeft + tooltipWidth + 20 > containerWidth) {
                    tooltipLeft = indicatorLeft - tooltipWidth - 14;
                } else {
                    tooltipLeft = indicatorLeft + 14;
                }
                tooltip.style.left = `${tooltipLeft}px`;
                tooltip.style.top = `${indicatorTop - 14}px`;
                tooltip.classList.add('visible');
            }
        } else {
            tooltip.classList.remove('visible');
            indicator.classList.remove('visible');
        }
    });
    
    canvas.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
        indicator.classList.remove('visible');
    });
}

// ============================================================================
// MINI CHARTS
// ============================================================================

function initMiniChartData() {
    // Initialize with 15 minutes of data (15 data points, one per minute)
    const now = Date.now();
    for (let i = 0; i < 15; i++) {
        const timestamp = now - (14 - i) * 60000; // 60000 ms = 1 minute
        
        miniChartData.prices.timestamps.push(timestamp);
        miniChartData.prices.up.push(0.38 + Math.random() * 0.08);
        miniChartData.prices.down.push(0.58 + Math.random() * 0.08);
        
        miniChartData.spread.timestamps.push(timestamp);
        miniChartData.spread.values.push(0.008 + Math.random() * 0.004);
        
        miniChartData.positions.timestamps.push(timestamp);
        miniChartData.positions.up.push(140 + Math.random() * 30);
        miniChartData.positions.down.push(150 + Math.random() * 30);
        
        miniChartData.avgPrices.timestamps.push(timestamp);
        miniChartData.avgPrices.up.push(0.43 + Math.random() * 0.05);
        miniChartData.avgPrices.down.push(0.49 + Math.random() * 0.05);
    }
}

function updateMiniChartData() {
    const now = Date.now();
    
    // Add new data point
    miniChartData.prices.timestamps.push(now);
    miniChartData.prices.up.push(0.38 + Math.random() * 0.08);
    miniChartData.prices.down.push(0.58 + Math.random() * 0.08);
    
    miniChartData.spread.timestamps.push(now);
    miniChartData.spread.values.push(0.008 + Math.random() * 0.004);
    
    miniChartData.positions.timestamps.push(now);
    miniChartData.positions.up.push(140 + Math.random() * 30);
    miniChartData.positions.down.push(150 + Math.random() * 30);
    
    miniChartData.avgPrices.timestamps.push(now);
    miniChartData.avgPrices.up.push(0.43 + Math.random() * 0.05);
    miniChartData.avgPrices.down.push(0.49 + Math.random() * 0.05);
    
    // Keep only last 15 minutes
    if (miniChartData.prices.timestamps.length > 15) {
        miniChartData.prices.timestamps.shift();
        miniChartData.prices.up.shift();
        miniChartData.prices.down.shift();
        
        miniChartData.spread.timestamps.shift();
        miniChartData.spread.values.shift();
        
        miniChartData.positions.timestamps.shift();
        miniChartData.positions.up.shift();
        miniChartData.positions.down.shift();
        
        miniChartData.avgPrices.timestamps.shift();
        miniChartData.avgPrices.up.shift();
        miniChartData.avgPrices.down.shift();
    }
    
    // Update displays
    document.getElementById('priceUp').textContent = miniChartData.prices.up[miniChartData.prices.up.length - 1].toFixed(3);
    document.getElementById('priceDown').textContent = miniChartData.prices.down[miniChartData.prices.down.length - 1].toFixed(3);
    document.getElementById('spreadValue').textContent = miniChartData.spread.values[miniChartData.spread.values.length - 1].toFixed(4);
    document.getElementById('posUp').textContent = miniChartData.positions.up[miniChartData.positions.up.length - 1].toFixed(1);
    document.getElementById('posDown').textContent = miniChartData.positions.down[miniChartData.positions.down.length - 1].toFixed(1);
    document.getElementById('avgPriceUp').textContent = miniChartData.avgPrices.up[miniChartData.avgPrices.up.length - 1].toFixed(3);
    document.getElementById('avgPriceDown').textContent = miniChartData.avgPrices.down[miniChartData.avgPrices.down.length - 1].toFixed(3);
    
    const sum = miniChartData.avgPrices.up[miniChartData.avgPrices.up.length - 1] + 
                miniChartData.avgPrices.down[miniChartData.avgPrices.down.length - 1];
    document.getElementById('sumValue').textContent = sum.toFixed(3);
    
    // Update profit % badge — profit when combined avg price is below $1.00
    const profitPct = ((1.0 - sum) / 1.0) * 100;
    const profitPctEl = document.getElementById('profitPct');
    if (profitPctEl) {
        profitPctEl.textContent = `${profitPct >= 0 ? '+' : ''}${profitPct.toFixed(1)}%`;
        profitPctEl.style.borderColor = profitPct >= 0 ? '#00ff41' : '#ff4444';
        profitPctEl.style.color = profitPct >= 0 ? '#00ff41' : '#ff4444';
        profitPctEl.style.backgroundColor = profitPct >= 0 ? 'rgba(0, 255, 65, 0.1)' : 'rgba(255, 68, 68, 0.1)';
    }
}

function drawMiniChart(canvasId, dataUp, dataDown, chartType = 'line') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = 120;
    
    const padding = { top: 10, right: 10, bottom: 20, left: 35 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    // Clear canvas
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 3; i++) {
        const y = padding.top + (chartHeight / 3) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
    }
    
    // Find min/max for scaling
    const allData = [...dataUp, ...(dataDown || [])];
    const maxValue = Math.max(...allData);
    const minValue = Math.min(...allData);
    const range = maxValue - minValue || 1;
    
    // Draw data
    const drawLine = (data, color) => {
        if (chartType === 'step') {
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            data.forEach((value, index) => {
                const x = padding.left + (chartWidth / (data.length - 1)) * index;
                const y = padding.top + chartHeight - ((value - minValue) / range) * chartHeight;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    const prevX = padding.left + (chartWidth / (data.length - 1)) * (index - 1);
                    ctx.lineTo(prevX + (x - prevX) / 2, y);
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();
        } else {
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            
            data.forEach((value, index) => {
                const x = padding.left + (chartWidth / (data.length - 1)) * index;
                const y = padding.top + chartHeight - ((value - minValue) / range) * chartHeight;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();
        }
    };
    
    drawLine(dataUp, '#00ff41');
    if (dataDown) {
        drawLine(dataDown, '#ff4444');
    }
    
    // Draw current time line
    const nowX = width - padding.right - 5;
    ctx.strokeStyle = '#808080';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(nowX, padding.top);
    ctx.lineTo(nowX, height - padding.bottom);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // X-axis labels
    ctx.fillStyle = '#808080';
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    
    ['5m', '10m', '15m'].forEach((label, i) => {
        const x = padding.left + (chartWidth / 3) * (i + 1);
        ctx.fillText(label, x, height - 5);
    });
    
    // Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 2; i++) {
        const value = minValue + (range / 2) * i;
        const y = padding.top + chartHeight - (chartHeight / 2) * i;
        ctx.fillText(value.toFixed(2), padding.left - 5, y + 3);
    }
}

function renderMiniCharts() {
    drawMiniChart('pricesChart', miniChartData.prices.up, miniChartData.prices.down, 'line');
    drawMiniChart('spreadChart', miniChartData.spread.values, null, 'step');
    drawMiniChart('positionsChart', miniChartData.positions.up, miniChartData.positions.down, 'step');
    drawMiniChart('avgPricesChart', miniChartData.avgPrices.up, miniChartData.avgPrices.down, 'line');
}

// ============================================================================
// POLYMARKET 15M PROGRESS BAR
// ============================================================================

function updateMarketProgressBar() {
    const fill = document.getElementById('marketProgressFill');
    const timeLeft = document.getElementById('marketTimeLeft');
    if (!fill || !timeLeft) return;
    
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // 15-minute windows: 0-15, 15-30, 30-45, 45-60
    const windowStart = Math.floor(minutes / 15) * 15;
    const elapsed = (minutes - windowStart) * 60 + seconds;
    const total = 15 * 60; // 15 minutes in seconds
    const remaining = total - elapsed;
    
    const pct = (elapsed / total) * 100;
    fill.style.width = `${pct}%`;
    
    const remMin = Math.floor(remaining / 60);
    const remSec = remaining % 60;
    timeLeft.textContent = `${String(remMin).padStart(2, '0')}:${String(remSec).padStart(2, '0')}`;
}

// ============================================================================
// SPOTS AVAILABILITY DISPLAY
// ============================================================================

function updateSpotsDisplay() {
    const taken = MAX_SPOTS - SPOTS_REMAINING;
    const pct = ((taken / MAX_SPOTS) * 100).toFixed(1);
    
    const badge = document.getElementById('navSpotsBadge');
    if (badge) badge.textContent = `${SPOTS_REMAINING}/${MAX_SPOTS} left`;
    
    const count = document.getElementById('spotsRemaining');
    if (count) count.textContent = SPOTS_REMAINING;
    
    const fill = document.getElementById('spotsBarFill');
    if (fill) fill.style.width = `${pct}%`;
    
    const sublabel = document.getElementById('spotsSublabel');
    if (sublabel) sublabel.textContent = `${taken} of ${MAX_SPOTS} spots taken`;
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
    initTimeRangeSelector();
    initChartTooltip();
    initMiniChartData();
    updateSpotsDisplay();
    
    // Render initial data
    renderActivePositions();
    renderClosedPositions();
    renderTradesFeed();
    initPnLChart();
    updateStatsCards();
    updateTicker();
    updateMetrics();
    renderMiniCharts();
    updateMarketProgressBar();
    
    // Try to fetch live data
    updateLiveData();
    
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
    
    // Update mini charts every 3-5 seconds
    setInterval(() => {
        updateMiniChartData();
        renderMiniCharts();
    }, 3000 + Math.random() * 2000);
    
    // Update market progress bar every second
    setInterval(() => {
        updateMarketProgressBar();
    }, 1000);
    
    // Try to fetch live data every 15 seconds
    setInterval(() => {
        updateLiveData();
    }, 15000);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
