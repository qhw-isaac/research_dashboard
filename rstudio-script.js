// RStudio Dashboard Interactive Features

// Initialize Chart.js for cow behavior visualization
document.addEventListener('DOMContentLoaded', function() {
    initializeChart();
    setupTabSwitching();
    setupObjectInteractions();
    setupConsoleSimulation();
    setupRunButton();
    setupCodeEditing();
    setupResizablePanes();
    initFeedACowGame();
});

// Chart.js visualization for AMS x PRT research data
function initializeChart() {
    const ctx = document.getElementById('cowBehaviorChart').getContext('2d');
    
    // AMS visit interval data based on Isaac's actual research
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Control',
                data: [630, 627, 600, 578], // Decreasing trend for control
                backgroundColor: 'rgba(255, 219, 119, 0.8)', // Yellow from research
                borderColor: 'rgba(224, 170, 44, 1)',
                borderWidth: 1,
                borderRadius: 4
            }, {
                label: 'Treatment',
                data: [650, 635, 610, 568], // Steeper decrease for treatment
                backgroundColor: 'rgba(67, 106, 179, 0.8)', // Blue from research
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
                    text: 'AMS Visit Intervals: Control vs PRT Treatment',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    color: '#333'
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        font: {
                            size: 11
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Week(s) After AMS Transition',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Mean Daily Max Visit Interval (Minutes)',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 800,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Tab switching functionality
function setupTabSwitching() {
    const tabs = document.querySelectorAll('.tab[data-tab]');
    const codeEditors = document.querySelectorAll('.code-editor');
    const gameContainer = document.getElementById('game-container');
    
    console.log('Found tabs:', tabs.length);
    console.log('Found code editors:', codeEditors.length);
    console.log('Found game container:', gameContainer);
    
    // Ensure game container is visible by default
    if (gameContainer) {
        gameContainer.style.display = 'flex';
    }
    
    // Ensure all code editors are hidden initially
    codeEditors.forEach(editor => {
        editor.style.display = 'none';
    });
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const tabId = this.getAttribute('data-tab');
            console.log('Tab clicked:', tabId);
            
            // Remove active class from all tabs in source pane
            const sourceTabs = document.querySelectorAll('.source-pane .tab, .game-pane .tab');
            sourceTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Handle game tab vs code editor tabs
            if (tabId === 'feed-a-cow') {
                // Show game, hide all code editors
                if (gameContainer) {
                    gameContainer.style.display = 'flex';
                }
                codeEditors.forEach(editor => {
                    editor.style.display = 'none';
                });
                console.log('Showing game');
            } else {
                // Show code editor, hide game
                if (gameContainer) {
                    gameContainer.style.display = 'none';
                }
                
                // Hide all code editors first
                codeEditors.forEach(editor => {
                    editor.style.display = 'none';
                });
                
                // Show selected code editor
                if (tabId) {
                    const selectedEditor = document.getElementById(tabId);
                    console.log('Looking for editor with ID:', tabId);
                    console.log('Found editor:', selectedEditor);
                    if (selectedEditor) {
                        selectedEditor.style.display = 'flex';
                        console.log('Showing editor:', tabId);
                    } else {
                        console.log('Editor not found:', tabId);
                        // List all available editors
                        console.log('Available editors:', Array.from(codeEditors).map(e => e.id));
                    }
                }
            }
        });
    });
}

// Object interactions in Environment pane
function setupObjectInteractions() {
    const objectItems = document.querySelectorAll('.object-item');
    
    console.log('Found object items:', objectItems.length);
    
    objectItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Object clicked:', this);
            
            // Add visual feedback
            this.style.background = '#007acc';
            setTimeout(() => {
                this.style.background = '';
            }, 200);
            
            // Simulate object inspection
            const objectName = this.querySelector('.object-name').textContent;
            console.log('Object name:', objectName);
            showObjectDetails(objectName);
        });
    });
}

// Helper function to ensure console scrolls to bottom
function scrollConsoleToBottom() {
    const consoleOutput = document.querySelector('.console-output');
    console.log('=== scrollConsoleToBottom called');
    console.log('Console output element:', consoleOutput);
    
    if (consoleOutput) {
        console.log('Current scrollTop:', consoleOutput.scrollTop);
        console.log('ScrollHeight:', consoleOutput.scrollHeight);
        console.log('ClientHeight:', consoleOutput.clientHeight);
        
        // Multiple attempts to ensure scrolling works
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
        console.log('Set scrollTop to:', consoleOutput.scrollTop);
        
        setTimeout(() => {
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
            console.log('After 10ms - scrollTop:', consoleOutput.scrollTop);
        }, 10);
        setTimeout(() => {
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
            console.log('After 50ms - scrollTop:', consoleOutput.scrollTop);
        }, 50);
    } else {
        console.error('Console output element not found for scrolling!');
    }
}

// Show object details in console
function showObjectDetails(objectName) {
    console.log('=== showObjectDetails called with:', objectName);
    
    const consoleOutput = document.querySelector('.console-output');
    console.log('Console output element:', consoleOutput);
    
    if (!consoleOutput) {
        console.error('Console output element not found!');
        return;
    }
    
    const details = getObjectDetails(objectName);
    console.log('Object details:', details);
    
    console.log('Showing details for:', objectName);
    
    // Add new console line
    const newLine = document.createElement('div');
    newLine.className = 'console-line';
    newLine.innerHTML = `> <span class="command">str(${objectName})</span>`;
    consoleOutput.appendChild(newLine);
    console.log('Added command line to console');
    
    // Scroll to bottom immediately for the command
    scrollConsoleToBottom();
    
    // Add object details
    setTimeout(() => {
        const detailsLine = document.createElement('div');
        detailsLine.className = 'console-line';
        detailsLine.innerHTML = details;
        consoleOutput.appendChild(detailsLine);
        console.log('Added details line to console');
        
        // Scroll to bottom after adding details
        scrollConsoleToBottom();
    }, 500);
}

// Get object details based on name
function getObjectDetails(objectName) {
    const details = {
        'readme': `Environment tabs are clickable as well as the top left R tabs. Feed a Cow! game is playable and has sounds!`,
        
        'mission': `chr "Making dairy cow lives incrementally better over time"<br><br>
This represents my core motivation and the driving force behind my research. 
Every study, every analysis, every day spent in the field is guided by this 
simple goal: improving the welfare and quality of life for dairy cattle.`,
        
        'field_of_study': `chr "Master of Food and Resource Economics at the University of British Columbia"`,
        
        'current_status': `chr "At the first Vancouver community Cursor Workshop!"`,
        
        'daily_means': `This is confidential data... but contact me if you want to collaborate!`,
        
        'regrouped_cows': `This one too!`
    };
    
    return details[objectName] || `Object '${objectName}' not found`;
}

// Console simulation
function setupConsoleSimulation() {
    const consoleOutput = document.querySelector('.console-output');
    
    // Remove the initial cursor when text starts
    setTimeout(() => {
        const initialCursor = consoleOutput.querySelector('.cursor');
        if (initialCursor) {
            initialCursor.remove();
        }
        
        // Add some initial commands
        addConsoleCommand('> Hello.');
        setTimeout(() => {
            addConsoleCommand('> Welcome to my research dashboard.');
            setTimeout(() => {
                addConsoleCommand('> I wonder if we can train cows to udder-stand robots?');
                setTimeout(() => {
                    addConsoleCommand('> 181 cows enrolled...');
                    setTimeout(() => {
                        addConsoleCommand('> <span class="cursor">|</span>');
                    }, 1750);
                }, 2500);
            }, 2500);
        }, 1250);
    }, 2000);
}

function addConsoleCommand(command) {
    const consoleOutput = document.querySelector('.console-output');
    const newLine = document.createElement('div');
    newLine.className = 'console-line';
    newLine.innerHTML = command;
    consoleOutput.appendChild(newLine);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// Run button functionality
function setupRunButton() {
    const runButtons = document.querySelectorAll('.run-btn');
    
    runButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Run button clicked');
            
            // Visual feedback
            this.style.color = '#4caf50';
            this.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                this.style.color = '';
                this.style.transform = '';
            }, 200);
            
            // Simulate code execution
            simulateCodeExecution();
        });
    });
}

function simulateCodeExecution() {
    const consoleOutput = document.querySelector('.console-output');
    
    // Remove any existing cursor before starting
    const existingCursor = consoleOutput.querySelector('.cursor');
    if (existingCursor) {
        existingCursor.remove();
    }
    
    // Add execution command
    addConsoleCommand('> source("cow_welfare_analysis.R")');
    
    setTimeout(() => {
        addConsoleCommand('Loading required package: ggplot2');
        setTimeout(() => {
            addConsoleCommand('Loading required package: dplyr');
            setTimeout(() => {
                addConsoleCommand('Loading required package: lme4');
                setTimeout(() => {
                    addConsoleCommand('Loading required package: lmerTest');
                    setTimeout(() => {
                        addConsoleCommand('Loading required package: MuMIn');
                        setTimeout(() => {
                            addConsoleCommand('> Cows walking towards the robot... 🐄🤖');
                            setTimeout(() => {
                                addConsoleCommand('> Analyzing visit intervals... ⏰');
                                setTimeout(() => {
                                    addConsoleCommand('> PRT training showing positive results! 🌾');
                                    setTimeout(() => {
                                        addConsoleCommand('> Mixed effects model running... 📊');
                                        setTimeout(() => {
                                            addConsoleCommand('> Treatment group adapting faster! ⚡');
                                            setTimeout(() => {
                                                addConsoleCommand('> Model diagnostics complete! ✅');
                                                setTimeout(() => {
                                                    addConsoleCommand('Analysis complete! Check the Plots tab for visualization.');
                                                    setTimeout(() => {
                                                        addConsoleCommand('> <span class="cursor">|</span>');
                                                    }, 500);
                                                }, 500);
                                            }, 500);
                                        }, 500);
                                    }, 500);
                                }, 500);
                            }, 500);
                        }, 500);
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    }, 500);
}

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to code lines
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach(line => {
        line.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.05)';
        });
        
        line.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });
    
    // Add click effects to pane buttons
    const paneButtons = document.querySelectorAll('.pane-btn');
    paneButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
});

// Add keyboard shortcuts simulation
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 's':
                e.preventDefault();
                showNotification('Why did you try to save?!');
                break;
            case 'r':
                e.preventDefault();
                simulateCodeExecution();
                break;
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
        background:rgb(230, 93, 65);
        color: white;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for animations
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

// Setup code editing functionality
function setupCodeEditing() {
    const editableElements = document.querySelectorAll('.code-content.editable');
    
    editableElements.forEach(element => {
        // Handle Enter key to create new lines
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const newLine = document.createElement('div');
                newLine.className = 'code-line';
                newLine.innerHTML = '<br>';
                
                // Insert new line
                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                range.deleteContents();
                range.insertNode(newLine);
                
                // Move cursor to new line
                range.setStartAfter(newLine);
                range.setEndAfter(newLine);
                selection.removeAllRanges();
                selection.addRange(range);
            }
            
            // Handle Tab key for indentation
            if (e.key === 'Tab') {
                e.preventDefault();
                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                const tabNode = document.createTextNode('  '); // 2 spaces for indentation
                range.insertNode(tabNode);
                range.setStartAfter(tabNode);
                range.setEndAfter(tabNode);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        });
        
        // Handle paste to preserve formatting
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
        
        // Add click handler to focus
        element.addEventListener('click', function() {
            this.focus();
        });
    });
}

// Default layout configuration
const DEFAULT_LAYOUT = {
    // Column proportions (left:right)
    leftColumnWidth: 66.67,  // 2fr out of 3fr total
    rightColumnWidth: 33.33, // 1fr out of 3fr total
    
    // Left column row proportions (source:console)
    leftTopHeight: 60,       // Source editor gets 60%
    leftBottomHeight: 40,    // Console gets 40%
    
    // Right column row proportions (environment:plots)
    rightTopHeight: 40,      // Environment gets 35%
    rightBottomHeight: 60    // Plots gets 65%
};

// Setup resizable panes
function setupResizablePanes() {
    const container = document.getElementById('panes-container');
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');
    const verticalHandle = document.getElementById('vertical-handle');
    const horizontalLeftHandle = document.getElementById('horizontal-left-handle');
    const horizontalRightHandle = document.getElementById('horizontal-right-handle');
    
    // Apply default layout
    applyDefaultLayout();
    
    // Function to apply default layout
    function applyDefaultLayout() {
        // Set column proportions
        container.style.gridTemplateColumns = `${DEFAULT_LAYOUT.leftColumnWidth}% ${DEFAULT_LAYOUT.rightColumnWidth}%`;
        
        // Set left column row proportions
        leftColumn.style.gridTemplateRows = `${DEFAULT_LAYOUT.leftTopHeight}% ${DEFAULT_LAYOUT.leftBottomHeight}%`;
        
        // Set right column row proportions
        rightColumn.style.gridTemplateRows = `${DEFAULT_LAYOUT.rightTopHeight}% ${DEFAULT_LAYOUT.rightBottomHeight}%`;
        
        // Position handles
        verticalHandle.style.left = `${DEFAULT_LAYOUT.leftColumnWidth}%`;
        horizontalLeftHandle.style.top = `${DEFAULT_LAYOUT.leftTopHeight}%`;
        horizontalRightHandle.style.top = `${DEFAULT_LAYOUT.rightTopHeight}%`;
    }
    
    let isResizing = false;
    let resizeType = null;
    let startX, startY, startLeftWidth, startRightWidth, startTopHeight, startBottomHeight;
    
    // Vertical resize (left/right)
    verticalHandle.addEventListener('mousedown', function(e) {
        isResizing = true;
        resizeType = 'vertical';
        startX = e.clientX;
        
        // Keep handles visible during resize
        verticalHandle.style.opacity = '0.3';
        horizontalLeftHandle.style.opacity = '0.3';
        horizontalRightHandle.style.opacity = '0.3';
        
        // Get current grid template columns
        const currentColumns = container.style.gridTemplateColumns || '2fr 1fr';
        const parts = currentColumns.split(' ');
        startLeftWidth = parts[0] === '2fr' ? 66.67 : parseFloat(parts[0]);
        startRightWidth = parts[1] === '1fr' ? 33.33 : parseFloat(parts[1]);
        
        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', stopResize);
        e.preventDefault();
    });
    
    // Horizontal resize for left panes (source/console)
    horizontalLeftHandle.addEventListener('mousedown', function(e) {
        isResizing = true;
        resizeType = 'horizontal-left';
        startY = e.clientY;
        
        // Keep handles visible during resize
        verticalHandle.style.opacity = '0.3';
        horizontalLeftHandle.style.opacity = '0.3';
        horizontalRightHandle.style.opacity = '0.3';
        
        // Get current left column grid template rows
        const currentRows = leftColumn.style.gridTemplateRows || '1fr 1fr';
        const parts = currentRows.split(' ');
        startTopHeight = parts[0] === '1fr' ? 50 : parseFloat(parts[0]);
        startBottomHeight = parts[1] === '1fr' ? 50 : parseFloat(parts[1]);
        
        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', stopResize);
        e.preventDefault();
    });
    
    // Horizontal resize for right panes (environment/plots)
    horizontalRightHandle.addEventListener('mousedown', function(e) {
        isResizing = true;
        resizeType = 'horizontal-right';
        startY = e.clientY;
        
        // Keep handles visible during resize
        verticalHandle.style.opacity = '0.3';
        horizontalLeftHandle.style.opacity = '0.3';
        horizontalRightHandle.style.opacity = '0.3';
        
        // Get current right column grid template rows
        const currentRows = rightColumn.style.gridTemplateRows || '1fr 1fr';
        const parts = currentRows.split(' ');
        startTopHeight = parts[0] === '1fr' ? 50 : parseFloat(parts[0]);
        startBottomHeight = parts[1] === '1fr' ? 50 : parseFloat(parts[1]);
        
        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', stopResize);
        e.preventDefault();
    });
    
    function handleResize(e) {
        if (!isResizing) return;
        
        if (resizeType === 'vertical') {
            const deltaX = e.clientX - startX;
            const containerWidth = container.offsetWidth;
            const deltaPercent = (deltaX / containerWidth) * 100;
            
            const newLeftWidth = startLeftWidth + deltaPercent;
            const newRightWidth = startRightWidth - deltaPercent;
            
            // Constrain resize to reasonable limits
            const minWidth = 20; // 20% minimum
            const maxWidth = 80; // 80% maximum
            
            if (newLeftWidth >= minWidth && newLeftWidth <= maxWidth && 
                newRightWidth >= minWidth && newRightWidth <= maxWidth) {
                container.style.gridTemplateColumns = `${newLeftWidth}% ${newRightWidth}%`;
                
                // Update vertical handle position
                verticalHandle.style.left = `${newLeftWidth}%`;
            }
        } else if (resizeType === 'horizontal-left') {
            const deltaY = e.clientY - startY;
            const leftHeight = leftColumn.offsetHeight;
            const deltaPercent = (deltaY / leftHeight) * 100;
            
            const newTopHeight = startTopHeight + deltaPercent;
            const newBottomHeight = startBottomHeight - deltaPercent;
            
            // Constrain resize to reasonable limits
            const minHeight = 20; // 20% minimum
            const maxHeight = 80; // 80% maximum
            
            if (newTopHeight >= minHeight && newTopHeight <= maxHeight && 
                newBottomHeight >= minHeight && newBottomHeight <= maxHeight) {
                leftColumn.style.gridTemplateRows = `${newTopHeight}% ${newBottomHeight}%`;
                
                // Update left horizontal handle position
                horizontalLeftHandle.style.top = `${newTopHeight}%`;
            }
        } else if (resizeType === 'horizontal-right') {
            const deltaY = e.clientY - startY;
            const rightHeight = rightColumn.offsetHeight;
            const deltaPercent = (deltaY / rightHeight) * 100;
            
            const newTopHeight = startTopHeight + deltaPercent;
            const newBottomHeight = startBottomHeight - deltaPercent;
            
            // Constrain resize to reasonable limits
            const minHeight = 20; // 20% minimum
            const maxHeight = 80; // 80% maximum
            
            if (newTopHeight >= minHeight && newTopHeight <= maxHeight && 
                newBottomHeight >= minHeight && newBottomHeight <= maxHeight) {
                rightColumn.style.gridTemplateRows = `${newTopHeight}% ${newBottomHeight}%`;
                
                // Update right horizontal handle position
                horizontalRightHandle.style.top = `${newTopHeight}%`;
            }
        }
    }
    
    function stopResize() {
        isResizing = false;
        resizeType = null;
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', stopResize);
        
        // Keep handles visible briefly after resize for better UX
        setTimeout(() => {
            if (!isResizing) {
                verticalHandle.style.opacity = '0';
                horizontalLeftHandle.style.opacity = '0';
                horizontalRightHandle.style.opacity = '0';
            }
        }, 500);
    }
    
    // Make handles more visible on hover
    container.addEventListener('mouseenter', function() {
        verticalHandle.style.opacity = '0.3';
        horizontalLeftHandle.style.opacity = '0.3';
        horizontalRightHandle.style.opacity = '0.3';
    });
    
    container.addEventListener('mouseleave', function() {
        if (!isResizing) {
            verticalHandle.style.opacity = '0';
            horizontalLeftHandle.style.opacity = '0';
            horizontalRightHandle.style.opacity = '0';
        }
    });
}

// Global function to reset layout to defaults (can be called from console)
window.resetLayout = function() {
    const container = document.getElementById('panes-container');
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');
    const verticalHandle = document.getElementById('vertical-handle');
    const horizontalLeftHandle = document.getElementById('horizontal-left-handle');
    const horizontalRightHandle = document.getElementById('horizontal-right-handle');
    
    // Apply default layout
    container.style.gridTemplateColumns = `${DEFAULT_LAYOUT.leftColumnWidth}% ${DEFAULT_LAYOUT.rightColumnWidth}%`;
    leftColumn.style.gridTemplateRows = `${DEFAULT_LAYOUT.leftTopHeight}% ${DEFAULT_LAYOUT.leftBottomHeight}%`;
    rightColumn.style.gridTemplateRows = `${DEFAULT_LAYOUT.rightTopHeight}% ${DEFAULT_LAYOUT.rightBottomHeight}%`;
    
    // Position handles
    verticalHandle.style.left = `${DEFAULT_LAYOUT.leftColumnWidth}%`;
    horizontalLeftHandle.style.top = `${DEFAULT_LAYOUT.leftTopHeight}%`;
    horizontalRightHandle.style.top = `${DEFAULT_LAYOUT.rightTopHeight}%`;
    
    console.log('🎯 Layout reset to defaults!');
};

// Feed a Cow Game
function initFeedACowGame() {
    const gameContainer = document.getElementById('game-container');
    const gameBoard = document.getElementById('game-board');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const highScoreElement = document.getElementById('high-score');
    
    let score = 0;
    let timeLeft = 30;
    let gameActive = false;
    let gameInterval = null;
    let cowInterval = null;
    let highScore = localStorage.getItem('feedACowHighScore') || 0;
    
    // Initialize high score
    highScoreElement.textContent = highScore;
    
    // Game state
    const gameState = {
        activeCows: new Set(),
        cowSpeed: 2000, // milliseconds between cow appearances (increased from 1500)
        cowDuration: 2500 // how long cows stay visible (increased from 2000)
    };
    
    // Start game
    startBtn.addEventListener('click', function() {
        if (gameActive) return;
        
        gameActive = true;
        score = 0;
        timeLeft = 30;
        
        startBtn.disabled = true;
        startBtn.textContent = 'Playing...';
        
        updateDisplay();
        
        // Start timer
        gameInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
        
        // Start spawning cows
        spawnCow();
        cowInterval = setInterval(spawnCow, gameState.cowSpeed);
    });
    
    // Reset game
    resetBtn.addEventListener('click', function() {
        endGame();
        score = 0;
        timeLeft = 30;
        updateDisplay();
        clearAllCows();
    });
    
    // Cow hole click handler
    gameBoard.addEventListener('click', function(e) {
        if (!gameActive) return;
        
        const hole = e.target.closest('.cow-hole');
        if (!hole) return;
        
        const holeIndex = parseInt(hole.dataset.hole);
        
        if (hole.classList.contains('active')) {
            // Feed a cow!
            score += 10;
            hole.classList.remove('active');
            hole.classList.add('fed');
            gameState.activeCows.delete(holeIndex);
            
            // Play feeding sound effect
            playFeedingSound();
            
            // Remove fed effect after animation
            setTimeout(() => {
                hole.classList.remove('fed');
            }, 300);
            
            updateDisplay();
        }
    });
    
    function spawnCow() {
        if (!gameActive) return;
        
        const holes = Array.from(gameBoard.children);
        const availableHoles = holes.filter(hole => !hole.classList.contains('active'));
        
        if (availableHoles.length === 0) return;
        
        const randomHole = availableHoles[Math.floor(Math.random() * availableHoles.length)];
        const holeIndex = parseInt(randomHole.dataset.hole);
        
        // Show cow
        randomHole.classList.add('active');
        gameState.activeCows.add(holeIndex);
        
        // Hide cow after duration
        setTimeout(() => {
            if (randomHole.classList.contains('active')) {
                randomHole.classList.remove('active');
                gameState.activeCows.delete(holeIndex);
            }
        }, gameState.cowDuration);
    }
    
    function clearAllCows() {
        const holes = Array.from(gameBoard.children);
        holes.forEach(hole => {
            hole.classList.remove('active', 'fed');
        });
        gameState.activeCows.clear();
    }
    
    function playFeedingSound() {
        // Create a gentle, satisfying sound effect using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create a gentle "moo" sound with a happy tone
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Gentle, happy frequency progression
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(250, audioContext.currentTime + 0.2);
        
        // Gentle volume envelope
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
    
    function endGame() {
        gameActive = false;
        
        if (gameInterval) {
            clearInterval(gameInterval);
            gameInterval = null;
        }
        
        if (cowInterval) {
            clearInterval(cowInterval);
            cowInterval = null;
        }
        
        startBtn.disabled = false;
        startBtn.textContent = 'Start Game';
        
        clearAllCows();
        
        // Update high score
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('feedACowHighScore', highScore);
            
            // Show celebration
            setTimeout(() => {
                alert(`🎉 New High Score: ${score} points! 🐄`);
            }, 500);
        }
    }
    
    function updateDisplay() {
        scoreElement.textContent = score;
        timerElement.textContent = timeLeft;
    }
}

console.log('🐄 RStudio Dashboard Loaded! Try clicking on objects in the Environment pane or running code!');
console.log('💡 Tip: Type resetLayout() in the console to reset the layout to defaults');
console.log('🎮 New: Play "Feed a Cow" in the top-left pane!');
