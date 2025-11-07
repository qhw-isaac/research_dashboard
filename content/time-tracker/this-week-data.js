// ================================================
// ⏰ THIS WEEK TIME TRACKER DATA
// ================================================
// Color Reference:
// - Economics: #c99a4d (Bright amber/old gold)
// - Animal Welfare: #5d8a5d (Vibrant forest green)
// - Leadership: #8ba68c (Soft sage)
// - Mathematics: #6e87a8 (Cool slate blue)
// - Pedagogy: #8ba68c (Soft sage)
// - Computer Science: #3a9d9d (Bright teal/terminal cyan)
// - French: #b07652 (Warm terracotta/burnt sienna)
// ================================================

const TIME_TRACKER_CONFIG = {
    weekOf: "Nov 2 - 8, 2025",
    lastUpdated: "1:53 PM, Nov 7, 2025",
    maxHours: 28, // Maximum hours for tallest bar (round up from actual max)
    activities: [
        { 
            name: "Economics", 
            hours: 27.5, 
            color: "#c99a4d" // Bright amber/old gold - wealth, old money, leather-bound ledgers
        },
        { 
            name: "Pedagogy", 
            hours: 10.38, 
            color: "#8ba68c" // Soft sage - chalkboards, teaching halls, worn textbooks
        },
        { 
            name: "Animal Welfare", 
            hours: 1, 
            color: "#5d8a5d" // Vibrant forest green - nature, earth, conservation
        },
        { 
            name: "Mathematics", 
            hours: 0.85, 
            color: "#6e87a8" // Cool slate blue - logic, precision, geometric elegance
        },
        { 
            name: "Leadership", 
            hours: 0.5, 
            color: "#8ba68c" // Soft sage - chalkboards, teaching halls, worn textbooks
        },
        { 
            name: "Computer Science", 
            hours: 0.2, 
            color: "#3a9d9d" // Bright teal/terminal cyan
        },
        { 
            name: "French", 
            hours: 0.12, 
            color: "#b07652" // Warm terracotta/burnt sienna - ancient pottery, classical scrolls, aged clay
        }
    ]
};

