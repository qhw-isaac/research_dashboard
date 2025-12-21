// ================================================
// 💰 ECONOMICS WORKSPACE
// ================================================
// Workspace for economics research and content
// Add tabs and content as needed
// ================================================

const ECONOMICS_WORKSPACE = {
    title: "Economics Research",
    description: "",
    tabs: [
        { 
            id: "econ-overview", 
            icon: "fas fa-chart-line", 
            name: "Economics", 
            content: `
                <div style="padding: 40px; max-width: 650px; color: #d4d4d4; line-height: 1.9;">
                    <p style="margin: 0 0 8px 0; font-size: 14px;">
                        Master's student at UBC studying <strong style="color: #c99a4d;">Food and Resource Economics</strong>, concentrating on <strong style="color: #007acc;">data analytics</strong> and <strong style="color: #007acc;">economic modelling</strong>.
                    </p>
                    <p style="margin: 0 0 25px 0; font-size: 14px;">
                        MFRE Program Representative and recipient of the <em>MFRE Award: Land and Food Systems Professional Programs Award</em> 
                        for cohort leadership and advancing knowledge in climate, food, and environmental sectors.
                    </p>
                    <p style="margin: 0; font-size: 13px; color: #808691;">
                        The tabs showcase projects completed during my degree.
                    </p>
                </div>
            ` 
        },
        { 
            id: "gravity-model", 
            icon: "fas fa-globe", 
            name: "Gravity Model", 
            content: () => GRAVITY_MODEL_CONTENT
        }
    ]
};