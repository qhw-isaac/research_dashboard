// ================================================
// RStudio Dashboard Interactive Features
// ================================================

// ================================================
// 📝 CONTENT CONFIGURATION - EDIT THESE SECTIONS
// ================================================

// 🐄 COW GALLERY DATA - Add/edit your cows here
const COW_DATA = [
    {
        name: "3034",
        breed: "Holstein",
        location: "UBC Dairy Education and Research Centre",
        date: "June 30, 2023",
        image: "images/3034.jpg",
        story: "3034 was the calf that pushed me toward graduate studies in animal welfare. She was born premature and nearly swept away by the manure scraper. I happened to be there to save her, but what stayed with me was the sound of cows calling for help while making sure not to trample her. That moment made me realize how little we truly understand cows, and how much we owe them the effort to try."
    },
    {
        name: "10",
        breed: "Water Buffalo",
        location: "Academy Farms",
        date: "August 24, 2024",
        image: "images/10.jpg",
        story: "Very funny girl from a farm with a great purpose!"
    },
    {
        name: "Rocky",
        breed: "Hereford",
        location: "K&M Farms",
        date: "July 19, 2025",
        image: "images/Rocky.jpg",
        story: "Rocky was a 4H steer, particularly one showed by the son of the owner of K&M Farms. He was as gentle as can be; the owner mentioned that he is very unaware of his humongous size, and often make way for people that are walking by."
    }
];

// 🔬 RESEARCH CHART DATA - Customize your chart
const CHART_CONFIG = {
    title: 'AMS Visit Intervals: Control vs PRT',
    weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    controlData: [630, 627, 600, 578],
    treatmentData: [650, 635, 610, 568],
    yAxisTitle: 'Daily Max Visit Interval (Min)',
    xAxisTitle: 'Week(s) After AMS Transition'
};

// 💬 CONSOLE MESSAGES - Edit welcome messages
const CONSOLE_MESSAGES = {
    welcome: [
        '> Hello.',
        '> Welcome to my research dashboard.',
        '> I wonder if we can train cows to udder-stand robots?',
        '> 181 cows enrolled...'
    ],
    execution: [
        '> source("cow_welfare_analysis.R")',
        'Loading required package: ggplot2',
        'Loading required package: dplyr',
        'Loading required package: lme4',
        'Loading required package: lmerTest',
        'Loading required package: MuMIn',
        '> Cows walking towards the robot... 🐄🤖',
        '> Analyzing visit intervals... ⏰',
        '> PRT training showing positive results! 🌾',
        '> Mixed effects model running... 📊',
        '> Treatment group adapting faster! ⚡',
        '> Model diagnostics complete! ✅',
        'Analysis complete! Check the Plots tab for visualization.'
    ]
};

// 📋 OBJECT DETAILS - Environment pane object descriptions
const OBJECT_DETAILS = {
    'readme': `Environment tabs are clickable as well as the top left R tabs. Feed a Cow! game is playable and has sounds!`,
    'mission': `chr "Making dairy cow lives incrementally better over time"<br><br>
This represents my core motivation and the driving force behind my research. 
Every study, every analysis, every day spent in the field is guided by this 
simple goal: improving the welfare and quality of life for dairy cattle.`,
    'field_of_study': `chr "Master of Food and Resource Economics at the University of British Columbia"`,
    'current_status': `chr "At the first Vancouver community Cursor Workshop!"`,
    'Animal Welfare': `Switching to Animal Welfare...`,
    'Economics': `Switching to Economics...`,
    'Leadership': `Switching to Leadership...`,
    'Dog Grooming': `Switching to Dog Grooming...`
};

// 🏢 WORKSPACE CONTENT - Edit content for different workspace modes
const WORKSPACE_CONTENT = {
    economics: {
        title: "Now showing Economics information",
        description: "Market signals, price elasticity, and resource allocation meet the barn. This is a playful placeholder to explore how economics intersects with animal agriculture.",
        tabs: [
            { id: "econ-overview", icon: "fas fa-chart-line", name: "Econ Overview", content: "" },
            { id: "macro-trends", icon: "fas fa-globe", name: "macro_trends.R", content: "# macro_trends.R\nsummary(cows)\nplot(week, price_index)" },
            { id: "micro-pricing", icon: "fas fa-tags", name: "micro_pricing.R", content: "# micro_pricing.R\nprice <- supply_demand_intersect()\nprint(price)" }
        ]
    },
    leadership: {
        title: "Leadership in Animal Welfare",
        description: "Leading initiatives for positive change in animal care and advocacy.",
        tabs: [
            { id: "paw", icon: "", name: "PAW", content: "Coming soon..." },
            { id: "ubc-quadball", icon: "", name: "UBC TSC Quadball", content: "Coming soon..." },
            { id: "lfs-gss", icon: "", name: "LFS GSS", content: "Coming soon..." }
        ]
    },
    dogGrooming: {
        title: "My Dog Grooming Portfolio",
        description: "Showcasing skills in canine care and styling. A passion project!",
        tabs: [
            { id: "portfolio", icon: "", name: "Portfolio", content: "Portfolio coming soon..." }
        ]
    }
};

// 📞 CONTACT INFO - Update your contact details
const CONTACT_INFO = {
    linkedin: "https://www.linkedin.com/in/isaacqi",
    email: "isaac.qi@ubc.ca"
};

// 🎮 GAME SETTINGS - Adjust game difficulty
const GAME_CONFIG = {
    timeLimit: 30,
    cowSpeed: 2000,      // milliseconds between cow appearances
    cowDuration: 2500,   // how long cows stay visible
    pointsPerCow: 10
};

// ================================================
// 🚀 INITIALIZATION
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Starting dashboard initialization...');
    try {
        setupMobileWarning();
    initializeChart();
    setupTabSwitching();
    setupObjectInteractions();
    setupConsoleSimulation();
    setupRunButton();
    setupCodeEditing();
        setupLightweightAffordances();
        setupEnvironmentTabs();
        setupEnvCategoryClicks();
    initFeedACowGame();
        initCowGallery();
        console.log('🎉 Dashboard initialization complete!');
    } catch (error) {
        console.error('❌ Error during initialization:', error);
    }
});

// ================================================
// 🎨 ENVIRONMENT TABS & WORKSPACE SWITCHING
// ================================================

let originalTopPaneHTML = null;

function setupEnvironmentTabs() {
    const tabsContainer = document.querySelector('.env-tabs');
    if (!tabsContainer) return;
    
    const panes = {
        env: document.getElementById('env-pane'),
        about: document.getElementById('about-pane'),
        conn: document.getElementById('conn-pane')
    };

    tabsContainer.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const key = tab.getAttribute('data-tab');
            
            // Activate tab
            tabsContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show pane
            Object.keys(panes).forEach(k => {
                if (panes[k]) panes[k].style.display = (k === key) ? 'block' : 'none';
            });

            if (key === 'env') {
                setupEnvCategoryClicks();
            }
        });
    });

    setupConnectionsPane(panes.conn);
}

function setupConnectionsPane(connPane) {
    if (!connPane || connPane.dataset.enhanced) return;
    
    connPane.dataset.enhanced = 'true';
    let list = connPane.querySelector('.environment-objects');
    if (!list) {
        list = document.createElement('div');
        list.className = 'environment-objects';
        connPane.appendChild(list);
    }

    // Remove placeholder content
    Array.from(list.children).forEach(child => {
        const name = child.querySelector('.object-name');
        if (name && name.textContent.toLowerCase().includes('no active connections')) {
            child.remove();
        }
    });

    // Add contact items
    const linkedinItem = createContactItem('LinkedIn', 'link', '—', 
        () => printToConsole(`LinkedIn: ${CONTACT_INFO.linkedin}`));
    const emailItem = createContactItem('Email', 'contact', '—', 
        () => printToConsole(`Email: ${CONTACT_INFO.email}`));

    list.appendChild(linkedinItem);
    list.appendChild(emailItem);
}

function createContactItem(displayName, typeText, sizeText, onClick) {
    const row = document.createElement('div');
    row.className = 'object-item';
    
    const name = document.createElement('span');
    name.className = 'object-name';
    name.textContent = displayName;
    
    const type = document.createElement('span');
    type.className = 'object-type';
    type.textContent = typeText;
    
    const size = document.createElement('span');
    size.className = 'object-size';
    size.textContent = sizeText;
    
    row.appendChild(name);
    row.appendChild(type);
    row.appendChild(size);
    row.addEventListener('click', onClick);
    
    return row;
}

function setupEnvCategoryClicks() {
    const categories = document.querySelectorAll('#env-pane .environment-objects .object-item.category');
    categories.forEach(row => {
        row.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const key = row.getAttribute('data-category');
            
            switch(key) {
                case 'animal-welfare':
                    switchLeftWorkspace('default');
                    break;
                case 'economics':
                    switchLeftWorkspace('economics');
                    break;
                case 'leadership':
                    switchLeftWorkspace('leadership');
                    break;
                case 'dog-grooming':
                    switchLeftWorkspace('dog');
                    break;
            }
        });
    });
}

function switchLeftWorkspace(mode) {
    const topPane = document.querySelector('.left-column .game-pane');
    if (!topPane) return;

    if (mode === 'default') {
        if (originalTopPaneHTML) {
            topPane.outerHTML = originalTopPaneHTML;
            initCowGallery();
            initFeedACowGame();
            setupTabSwitching();
            const galleryTab = document.querySelector('.left-column .tab[data-tab="cow-gallery"]');
            if (galleryTab) galleryTab.click();
        }
        return;
    }

    if (!originalTopPaneHTML) {
        originalTopPaneHTML = topPane.outerHTML;
    }

    const workspace = getWorkspaceHTML(mode);
    if (workspace) {
        topPane.outerHTML = workspace;
        setupTabSwitching();
        const firstTab = document.querySelector('.left-column .pane-tabs .tab.active');
        if (firstTab) firstTab.click();
    }
}

function getWorkspaceHTML(mode) {
    const workspaceMap = {
        'economics': WORKSPACE_CONTENT.economics,
        'leadership': WORKSPACE_CONTENT.leadership,
        'dog': WORKSPACE_CONTENT.dogGrooming
    };
    
    const config = workspaceMap[mode];
    if (!config) return null;

    const tabsHTML = config.tabs.map(tab => 
        `<div class="tab ${config.tabs[0].id === tab.id ? 'active' : ''}" data-tab="${tab.id}">
            ${tab.icon ? `<i class="${tab.icon}"></i>` : ''}<span>${tab.name}</span><i class="fas fa-times"></i>
        </div>`
    ).join('');

    const contentHTML = config.tabs.map(tab => {
        const display = config.tabs[0].id === tab.id ? 'flex' : 'none';
        const content = tab.content || `
            <div style="text-align:center;max-width:520px;color:#d4d4d4;">
                <h3 style="color:#ffffff;margin-bottom:10px;">${config.title}</h3>
                <p>${config.description}</p>
            </div>`;
        
        return `<div id="${tab.id}" class="code-editor" style="display:${display};align-items:center;justify-content:center;">
            ${tab.content ? `<div class="code-content">${content}</div>` : content}
        </div>`;
    }).join('');

    return `
        <div class="pane game-pane">
            <div class="pane-header">
                <div class="pane-tabs">${tabsHTML}</div>
            </div>
            <div class="pane-content">${contentHTML}</div>
        </div>`;
}

// ================================================
// 💬 CONSOLE FUNCTIONALITY
// ================================================

// Track ongoing console animations to prevent conflicts
let welcomeTimeouts = [];
let executionTimeouts = [];
let isWelcomeSequenceActive = false;
let isExecutionSequenceActive = false;

function clearConsoleAnimations() {
    // Stop all sequences
    isWelcomeSequenceActive = false;
    isExecutionSequenceActive = false;
    
    // Clear all pending welcome message timeouts
    welcomeTimeouts.forEach(timeout => clearTimeout(timeout));
    welcomeTimeouts = [];
    
    // Clear all pending execution message timeouts
    executionTimeouts.forEach(timeout => clearTimeout(timeout));
    executionTimeouts = [];
}

function printToConsole(text) {
    // Clear any ongoing animations when user interacts
    clearConsoleAnimations();
    
    const consoleOutput = document.querySelector('.console-pane .console-output');
    if (!consoleOutput) return;
    
    const line = document.createElement('div');
    line.className = 'console-line';
    
    // Make URLs clickable
    const urlMatch = text.match(/https?:\/\/\S+/i);
    if (urlMatch) {
        const before = text.slice(0, urlMatch.index);
        const after = text.slice(urlMatch.index + urlMatch[0].length);
        
        if (before) line.appendChild(document.createTextNode(before));
        
        const a = document.createElement('a');
        a.href = urlMatch[0];
        a.textContent = urlMatch[0];
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.style.color = '#4ea1ff';
        a.style.textDecoration = 'underline';
        line.appendChild(a);
        
        if (after) line.appendChild(document.createTextNode(after));
    } else {
        line.textContent = text;
    }
    
    consoleOutput.appendChild(line);
    ensureConsoleCursor();
}

function ensureConsoleCursor() {
    const consoleOutput = document.querySelector('.console-output');
    if (!consoleOutput) return;
    
    // Remove any existing cursors first
    const existingCursors = consoleOutput.querySelectorAll('.cursor');
    existingCursors.forEach(cursor => cursor.parentElement.remove());
    
    // Create single cursor at bottom
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '|';
    const cursorLine = document.createElement('div');
    cursorLine.className = 'console-line';
    cursorLine.appendChild(cursor);
    consoleOutput.appendChild(cursorLine);
    
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function scrollConsoleToBottom() {
    const consoleOutput = document.querySelector('.console-output');
    if (consoleOutput) {
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }
}

function setupConsoleSimulation() {
    const consoleOutput = document.querySelector('.console-output');
    if (!consoleOutput) return;
    
    isWelcomeSequenceActive = true;
    
    const initialTimeout = setTimeout(() => {
        if (!isWelcomeSequenceActive) return; // Check if cancelled
        
        // Remove any existing cursors
        const existingCursors = consoleOutput.querySelectorAll('.cursor');
        existingCursors.forEach(cursor => cursor.parentElement.remove());
        
        // Display welcome messages
        CONSOLE_MESSAGES.welcome.forEach((message, index) => {
            const messageTimeout = setTimeout(() => {
                if (!isWelcomeSequenceActive) return; // Check if cancelled before each message
                addConsoleCommand(message);
                if (index === CONSOLE_MESSAGES.welcome.length - 1) {
                    const cursorTimeout = setTimeout(() => {
                        if (isWelcomeSequenceActive) ensureConsoleCursor();
                    }, 1750);
                    welcomeTimeouts.push(cursorTimeout);
                }
            }, index * (index === 0 ? 2000 : 2500));
            welcomeTimeouts.push(messageTimeout);
        });
    }, 2000);
    welcomeTimeouts.push(initialTimeout);
}

function addConsoleCommand(command) {
    const consoleOutput = document.querySelector('.console-output');
    if (!consoleOutput) return;
    
    const newLine = document.createElement('div');
    newLine.className = 'console-line';
    newLine.innerHTML = command;
    consoleOutput.appendChild(newLine);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// ================================================
// 📊 CHART INITIALIZATION
// ================================================

function initializeChart() {
    const ctx = document.getElementById('cowBehaviorChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: CHART_CONFIG.weeks,
            datasets: [{
                label: 'Control',
                data: CHART_CONFIG.controlData,
                backgroundColor: 'rgba(255, 219, 119, 0.8)',
                borderColor: 'rgba(224, 170, 44, 1)',
                borderWidth: 1,
                borderRadius: 4
            }, {
                label: 'Treatment',
                data: CHART_CONFIG.treatmentData,
                backgroundColor: 'rgba(67, 106, 179, 0.8)',
                borderColor: 'rgba(62, 97, 160, 1)',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: CHART_CONFIG.title,
                    font: { size: 14, weight: 'bold' },
                    color: '#333'
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: { usePointStyle: true, font: { size: 11 } }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: CHART_CONFIG.xAxisTitle,
                        font: { size: 12, weight: 'bold' }
                    },
                    grid: { color: 'rgba(0,0,0,0.1)' }
                },
                y: {
                    title: {
                        display: true,
                        text: CHART_CONFIG.yAxisTitle,
                        font: { size: 12, weight: 'bold' }
                    },
                    min: 0,
                    max: 800,
                    grid: { color: 'rgba(0,0,0,0.1)' }
                }
            },
            interaction: { intersect: false, mode: 'index' }
        }
    });
}

// ================================================
// 🔄 TAB SWITCHING
// ================================================

function setupTabSwitching() {
    const tabs = document.querySelectorAll('.left-column .tab[data-tab]');
    const codeEditors = document.querySelectorAll('.code-editor');
    const gameContainer = document.getElementById('game-container');
    const cowGalleryContainer = document.getElementById('cow-gallery-container');
    
    // Set initial visibility
    if (cowGalleryContainer) cowGalleryContainer.style.display = 'flex';
    if (gameContainer) gameContainer.style.display = 'none';
    codeEditors.forEach(editor => editor.style.display = 'none');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            document.querySelectorAll('.left-column .tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show appropriate content
            if (tabId === 'cow-gallery') {
                showElement(cowGalleryContainer);
                hideElements([gameContainer, ...codeEditors]);
            } else if (tabId === 'feed-a-cow') {
                showElement(gameContainer);
                hideElements([cowGalleryContainer, ...codeEditors]);
            } else {
                hideElements([gameContainer, cowGalleryContainer, ...codeEditors]);
                const selectedEditor = document.getElementById(tabId);
                if (selectedEditor) showElement(selectedEditor);
            }
        });
    });
}

function showElement(element) {
    if (element) element.style.display = 'flex';
}

function hideElements(elements) {
    elements.forEach(element => {
        if (element) element.style.display = 'none';
    });
}

// ================================================
// 🔍 OBJECT INTERACTIONS
// ================================================

function setupObjectInteractions() {
    const objectItems = document.querySelectorAll('.object-item');
    
    objectItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Visual feedback
            this.style.background = '#007acc';
            setTimeout(() => this.style.background = '', 200);
            
            const objectName = this.querySelector('.object-name').textContent;
            showObjectDetails(objectName);
        });
    });
}

function showObjectDetails(objectName) {
    const consoleOutput = document.querySelector('.console-output');
    if (!consoleOutput) return;
    
    const details = OBJECT_DETAILS[objectName] || `Object '${objectName}' not found`;
    
    // Add command line
    const newLine = document.createElement('div');
    newLine.className = 'console-line';
    newLine.innerHTML = `> <span class="command">str(${objectName})</span>`;
    consoleOutput.appendChild(newLine);
    ensureConsoleCursor();
    
    // Add details after delay
        setTimeout(() => {
        const detailsLine = document.createElement('div');
        detailsLine.className = 'console-line';
        detailsLine.innerHTML = details;
        consoleOutput.appendChild(detailsLine);
        ensureConsoleCursor();
    }, 500);
}

// ================================================
// ▶️ RUN BUTTON & CODE EXECUTION
// ================================================

function setupRunButton() {
    const runButtons = document.querySelectorAll('.run-btn');
    
    runButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Visual feedback
            this.style.color = '#4caf50';
            this.style.transform = 'scale(1.1)';
        setTimeout(() => {
                this.style.color = '';
                this.style.transform = '';
            }, 200);
            
            simulateCodeExecution();
        });
    });
}

function simulateCodeExecution() {
    const consoleOutput = document.querySelector('.console-output');
    if (!consoleOutput) return;
    
    // Clear any ongoing animations first
    clearConsoleAnimations();
    isExecutionSequenceActive = true;
    
    // Remove existing cursors
    const existingCursors = consoleOutput.querySelectorAll('.cursor');
    existingCursors.forEach(cursor => cursor.parentElement.remove());
    
    // Display execution messages
    CONSOLE_MESSAGES.execution.forEach((message, index) => {
        const messageTimeout = setTimeout(() => {
            if (!isExecutionSequenceActive) return; // Check if cancelled
            addConsoleCommand(message);
            if (index === CONSOLE_MESSAGES.execution.length - 1) {
                const cursorTimeout = setTimeout(() => {
                    if (isExecutionSequenceActive) ensureConsoleCursor();
                }, 500);
                executionTimeouts.push(cursorTimeout);
            }
        }, index * 500);
        executionTimeouts.push(messageTimeout);
    });
}

// ================================================
// 🎮 FEED A COW GAME
// ================================================

function initFeedACowGame() {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) return;
    
    const gameBoard = document.getElementById('game-board');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const highScoreElement = document.getElementById('high-score');
    
    let gameState = {
        score: 0,
        timeLeft: GAME_CONFIG.timeLimit,
        gameActive: false,
        gameInterval: null,
        cowInterval: null,
        activeCows: new Set(),
        highScore: parseInt(localStorage.getItem('feedACowHighScore')) || 0
    };
    
    highScoreElement.textContent = gameState.highScore;
    
    startBtn.addEventListener('click', () => startGame());
    resetBtn.addEventListener('click', () => resetGame());
    gameBoard.addEventListener('click', (e) => handleCowClick(e));
    
    function startGame() {
        if (gameState.gameActive) return;
        
        gameState.gameActive = true;
        gameState.score = 0;
        gameState.timeLeft = GAME_CONFIG.timeLimit;
        
        startBtn.disabled = true;
        startBtn.textContent = 'Playing...';
        
        updateDisplay();
        
        // Start timer
        gameState.gameInterval = setInterval(() => {
            gameState.timeLeft--;
            updateDisplay();
            if (gameState.timeLeft <= 0) endGame();
        }, 1000);
        
        // Start spawning cows
        spawnCow();
        gameState.cowInterval = setInterval(spawnCow, GAME_CONFIG.cowSpeed);
    }
    
    function resetGame() {
        endGame();
        gameState.score = 0;
        gameState.timeLeft = GAME_CONFIG.timeLimit;
        updateDisplay();
        clearAllCows();
    }
    
    function handleCowClick(e) {
        if (!gameState.gameActive) return;
        
        const hole = e.target.closest('.cow-hole');
        if (!hole || !hole.classList.contains('active')) return;
        
        const holeIndex = parseInt(hole.dataset.hole);
        gameState.score += GAME_CONFIG.pointsPerCow;
        hole.classList.remove('active');
        hole.classList.add('fed');
        gameState.activeCows.delete(holeIndex);
        
        playFeedingSound();
        setTimeout(() => hole.classList.remove('fed'), 300);
        updateDisplay();
    }
    
    function spawnCow() {
        if (!gameState.gameActive) return;
        
        const holes = Array.from(gameBoard.children);
        const availableHoles = holes.filter(hole => !hole.classList.contains('active'));
        
        if (availableHoles.length === 0) return;
        
        const randomHole = availableHoles[Math.floor(Math.random() * availableHoles.length)];
        const holeIndex = parseInt(randomHole.dataset.hole);
        
        randomHole.classList.add('active');
        gameState.activeCows.add(holeIndex);
    
    setTimeout(() => {
            if (randomHole.classList.contains('active')) {
                randomHole.classList.remove('active');
                gameState.activeCows.delete(holeIndex);
            }
        }, GAME_CONFIG.cowDuration);
    }
    
    function clearAllCows() {
        const holes = Array.from(gameBoard.children);
        holes.forEach(hole => hole.classList.remove('active', 'fed'));
        gameState.activeCows.clear();
    }
    
    function playFeedingSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(250, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
    
    function endGame() {
        gameState.gameActive = false;
        
        if (gameState.gameInterval) {
            clearInterval(gameState.gameInterval);
            gameState.gameInterval = null;
        }
        
        if (gameState.cowInterval) {
            clearInterval(gameState.cowInterval);
            gameState.cowInterval = null;
        }
        
        startBtn.disabled = false;
        startBtn.textContent = 'Start Game';
        clearAllCows();
        
        // Check for high score
        if (gameState.score > gameState.highScore) {
            gameState.highScore = gameState.score;
            highScoreElement.textContent = gameState.highScore;
            localStorage.setItem('feedACowHighScore', gameState.highScore);
            setTimeout(() => alert(`🎉 New High Score: ${gameState.score} points! 🐄`), 500);
        }
    }
    
    function updateDisplay() {
        scoreElement.textContent = gameState.score;
        timerElement.textContent = gameState.timeLeft;
    }
}

// ================================================
// 🖼️ COW GALLERY
// ================================================

function initCowGallery() {
    let currentCowIndex = 0;
    const totalCows = COW_DATA.length;

    // Get DOM elements
    const elements = {
        cowImage: document.getElementById('cow-image'),
        cowName: document.getElementById('cow-name'),
        cowBreed: document.getElementById('cow-breed'),
        cowLocation: document.getElementById('cow-location'),
        cowDate: document.getElementById('cow-date'),
        cowStory: document.getElementById('cow-story'),
        currentCowSpan: document.getElementById('current-cow'),
        totalCowsSpan: document.getElementById('total-cows'),
        prevBtn: document.getElementById('prev-cow'),
        nextBtn: document.getElementById('next-cow'),
        galleryDots: document.getElementById('gallery-dots')
    };

    function initGallery() {
        elements.totalCowsSpan.textContent = totalCows;
        createDots();
        updateCowDisplay();
        updateNavigationButtons();
    }

    function createDots() {
        elements.galleryDots.innerHTML = '';
        for (let i = 0; i < totalCows; i++) {
            const dot = document.createElement('div');
            dot.className = `gallery-dot ${i === currentCowIndex ? 'active' : ''}`;
            dot.addEventListener('click', () => goToCow(i));
            elements.galleryDots.appendChild(dot);
        }
    }

    function updateCowDisplay() {
        const cow = COW_DATA[currentCowIndex];
        
        // Update text content
        elements.cowName.textContent = cow.name;
        elements.cowBreed.textContent = cow.breed;
        elements.cowLocation.textContent = cow.location;
        elements.cowDate.textContent = cow.date;
        elements.cowStory.textContent = cow.story;
        elements.currentCowSpan.textContent = currentCowIndex + 1;
        
        // Update image
        if (cow.image) {
            elements.cowImage.src = cow.image;
            elements.cowImage.alt = cow.name;
        }

        // Handle special "And Many More to Come!" page
        if (cow.name === "And Many More to Come!") {
            hideElements([elements.cowImage, elements.cowBreed, elements.cowLocation, elements.cowDate, elements.cowStory]);
            
            Object.assign(elements.cowName.style, {
                color: "#ffdb77",
                fontSize: "56px",
                fontWeight: "800",
                textAlign: "center",
                width: "100%",
                position: "absolute",
                top: "37%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textShadow: "0 0 20px rgba(255, 219, 119, 0.5)",
                letterSpacing: "2px",
                fontFamily: "'Poppins', sans-serif"
            });
        } else {
            // Reset to normal styling
            showElements([elements.cowImage, elements.cowBreed, elements.cowLocation, elements.cowDate, elements.cowStory]);
            
            Object.assign(elements.cowName.style, {
                color: "#ffffff",
                fontSize: "20px",
                fontWeight: "600",
                width: "auto",
                position: "static",
                top: "auto",
                left: "auto",
                transform: "none",
                textShadow: "none",
                letterSpacing: "normal",
                fontFamily: "'JetBrains Mono', monospace"
            });
        }

        // Update dots
        const dots = elements.galleryDots.querySelectorAll('.gallery-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentCowIndex);
        });
    }

    function updateNavigationButtons() {
        elements.prevBtn.disabled = currentCowIndex === 0;
        elements.nextBtn.disabled = false; // Allow cycling
    }

    function goToCow(index) {
        if (index >= 0 && index < totalCows) {
            currentCowIndex = index;
            updateCowDisplay();
            updateNavigationButtons();
        }
    }

    function prevCow() {
        if (currentCowIndex > 0) {
            currentCowIndex--;
            updateCowDisplay();
            updateNavigationButtons();
        }
    }

    function nextCow() {
        currentCowIndex = (currentCowIndex + 1) % totalCows;
        updateCowDisplay();
        updateNavigationButtons();
    }

    // Event listeners
    elements.prevBtn.addEventListener('click', prevCow);
    elements.nextBtn.addEventListener('click', nextCow);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const galleryContainer = document.getElementById('cow-gallery-container');
        if (galleryContainer && galleryContainer.style.display !== 'none') {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevCow();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextCow();
            }
        }
    });

    initGallery();
}

// ================================================
// 📱 MOBILE WARNING
// ================================================

function setupMobileWarning() {
    const mobileWarning = document.getElementById('mobile-warning');
    
    function isMobile() {
        return window.innerWidth < 768 && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    if (isMobile()) {
        mobileWarning.style.display = 'flex';
    } else {
        mobileWarning.style.display = 'none';
    }
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (!isMobile()) {
                mobileWarning.style.display = 'none';
            } else {
                mobileWarning.style.display = 'flex';
            }
        }, 150);
    });
}

// ================================================
// ⌨️ KEYBOARD SHORTCUTS & INTERACTIONS
// ================================================

function setupLightweightAffordances() {
    // Code line hover effects
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach(line => {
        line.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.05)';
        });
        line.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });
    
    // Button click effects
    const paneButtons = document.querySelectorAll('.pane-btn');
    paneButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = '', 100);
        });
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 's':
                e.preventDefault();
                showNotification('Why did you try to save?!');
                break;
            case 'r':
            case 'Enter':
                e.preventDefault();
                simulateCodeExecution();
                break;
        }
    }
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgb(230, 93, 65);
        color: white;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// ================================================
// ✏️ CODE EDITING FUNCTIONALITY
// ================================================

function setupCodeEditing() {
    const editableElements = document.querySelectorAll('.code-content.editable');
    
    editableElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const newLine = document.createElement('div');
                newLine.className = 'code-line';
                newLine.innerHTML = '<br>';
                
                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                range.deleteContents();
                range.insertNode(newLine);
                
                range.setStartAfter(newLine);
                range.setEndAfter(newLine);
                selection.removeAllRanges();
                selection.addRange(range);
            }
            
            if (e.key === 'Tab') {
                e.preventDefault();
                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                const tabNode = document.createTextNode('  ');
                range.insertNode(tabNode);
                range.setStartAfter(tabNode);
                range.setEndAfter(tabNode);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        });
        
        element.addEventListener('paste', function(e) {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData('text/plain');
            const lines = text.split('\n');
            
            lines.forEach((line, index) => {
                const lineDiv = document.createElement('div');
                lineDiv.className = 'code-line';
                lineDiv.textContent = line;
                
                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                range.insertNode(lineDiv);
                
                if (index < lines.length - 1) {
                    const br = document.createElement('br');
                    range.insertNode(br);
                }
            });
        });
        
        element.addEventListener('click', function() {
            this.focus();
        });
    });
}

// ================================================
// 🎨 STYLES & ANIMATIONS
// ================================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .command {
        color: #569cd6;
        font-weight: 500;
    }
    
    .code-line:hover {
        background: rgba(255, 255, 255, 0.05);
        transition: background 0.2s ease;
    }
`;
document.head.appendChild(style);

// ================================================
// 🎉 READY!
// ================================================

console.log('🐄 RStudio Dashboard Loaded! Try clicking on objects in the Environment pane or running code!');
console.log('🎮 New: Play "Feed a Cow" in the top-left pane!');
console.log('🖼️ New: Check out the Cow Gallery to see all the cows Isaac has met!');