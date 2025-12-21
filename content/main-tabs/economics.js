// ================================================
// 💰 ECONOMICS WORKSPACE
// ================================================
// Workspace for economics research and content
// Add tabs and content as needed
// ================================================

const ECONOMICS_WORKSPACE = {
    title: "Work in Progress...",
    description: "",
    tabs: [
        { 
            id: "econ-overview", 
            icon: "fas fa-chart-line", 
            name: "Economics", 
            content: "" 
        },
        { 
            id: "gravity-model", 
            icon: "fas fa-globe", 
            name: "Gravity Model", 
            content: () => GRAVITY_MODEL_CONTENT
        }
    ]
};