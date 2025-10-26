// ================================================
// ⏰ THIS WEEK TIME TRACKER DATA
// ================================================
// Color Reference:
// - Economics: #c99a4d (Bright amber/old gold)
// - Pedagogy: #8ba68c (Soft sage)
// - Animal Welfare: #5d8a5d (Vibrant forest green)
// - Computer Science: #3a9d9d (Bright teal/terminal cyan)
// - Mathematics: #6e87a8 (Cool slate blue)
// - Greek: #b07652 (Warm terracotta/burnt sienna)
// ================================================

const TIME_TRACKER_CONFIG = {
    weekOf: "Oct 20-26, 2025",
    lastUpdated: "11:02 PM,Oct 25, 2025",
    maxHours: 35, // Maximum hours for tallest bar (round up from actual max)
    activities: [
        { 
            name: "Economics", 
            hours: 31.33, 
            color: "#c99a4d" // Bright amber/old gold - wealth, old money, leather-bound ledgers
        },
        { 
            name: "Leadership", 
            hours: 11.07, 
            color: "#8ba68c" // Soft sage - chalkboards, teaching halls, worn textbooks
        },
        { 
            name: "Pedagogy", 
            hours: 3.3, 
            color: "#8ba68c" // Soft sage - chalkboards, teaching halls, worn textbooks
        },
        { 
            name: "Computer Science", 
            hours: 1.6, 
            color: "#3a9d9d" // Bright teal/terminal cyan - technology, code, digital innovation
        },
        { 
            name: "Animal Welfare", 
            hours: 1.32, 
            color: "#5d8a5d" // Vibrant forest green - nature, earth, conservation
        },
        { 
            name: "Mathematics", 
            hours: 1.28, 
            color: "#6e87a8" // Cool slate blue - logic, precision, geometric elegance
        },
        { 
            name: "Greek", 
            hours: 0.22, 
            color: "#b07652" // Warm terracotta/burnt sienna - ancient pottery, classical scrolls, aged clay
        },
        { 
            name: "French", 
            hours: 0.08, 
            color: "#b07652" // Warm terracotta/burnt sienna - ancient pottery, classical scrolls, aged clay
        }
    ]
};
