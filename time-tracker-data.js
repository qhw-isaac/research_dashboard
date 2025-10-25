// ⏰ TIME TRACKER DATA

// Previous week colors (Oct 13-19, 2025):
// Computer Science: #3a9d9d (Bright teal/terminal cyan)
// Greek: #b07652 (Warm terracotta/burnt sienna)
// Pedagogy: #8ba68c (Soft sage)

// Current week colors (Oct 20-26, 2025):
// Economics: #c99a4d (Bright amber/old gold) - carried over
// Pedagogy: #8ba68c (Soft sage) - carried over  
// Animal Welfare: #5d8a5d (Vibrant forest green) - carried over
// Computer Science: #3a9d9d (Bright teal/terminal cyan) - carried over
// Mathematics: #6e87a8 (Cool slate blue) - carried over
// Greek: #b07652 (Warm terracotta/burnt sienna) - carried over

const TIME_TRACKER_CONFIG = {
    weekOf: "Oct 20-26, 2025",
    lastUpdated: "10:58 PM, October 24, 2025",
    maxHours: 35, // Maximum hours for the tallest bar (round up from 31.33)
    activities: [
        { 
            name: "Economics", 
            hours: 31.33, 
            color: "#c99a4d" // Bright amber/old gold - wealth, old money, leather-bound ledgers
        },
        { 
            name: "Leadership", 
            hours: 5.23, 
            color: "#8ba68c" // Soft sage - chalkboards, teaching halls, worn textbooks
        },
        { 
            name: "Pedagogy", 
            hours: 3.3, 
            color: "#8ba68c" // Soft sage - chalkboards, teaching halls, worn textbooks
        },
        { 
            name: "Animal Welfare", 
            hours: 1.32, 
            color: "#5d8a5d" // Vibrant forest green - nature, earth, conservation
        },
        { 
            name: "Mathematics", 
            hours: 1.18, 
            color: "#6e87a8" // Cool slate blue - logic, precision, geometric elegance
        },
        { 
            name: "Greek", 
            hours: 0.2, 
            color: "#b07652" // Warm terracotta/burnt sienna - ancient pottery, classical scrolls, aged clay
        },
        { 
            name: "French", 
            hours: 0.08, 
            color: "#b07652" // Warm terracotta/burnt sienna - ancient pottery, classical scrolls, aged clay
        }
    ]
};
