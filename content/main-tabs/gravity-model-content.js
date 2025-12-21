// ================================================
// GRAVITY MODEL CONTENT
// ================================================
// HTML content for Gravity Model tab
// ================================================

const GRAVITY_MODEL_CONTENT = `
<!-- ================================================
     GRAVITY MODEL - Isaac Qi
     FRE 502 - November 5th, 2025
     ================================================ -->

<div style="padding: 20px; max-width: 900px; color: #d4d4d4; line-height: 1.6;">
    <!-- Header -->
    <div style="margin-bottom: 30px; border-bottom: 2px solid #c99a4d; padding-bottom: 15px;">
        <h1 style="color: #c99a4d; margin: 0 0 5px 0; font-family: 'Poppins', sans-serif; font-size: 28px;">
            Gravity Model of Trade
        </h1>
        <p style="color: #808691; font-size: 13px; margin: 0;">
            FRE 502 | Business Services Trade Analysis | November 5th, 2025
        </p>
    </div>

    <!-- Technical Overview -->
    <div style="background: rgba(45, 45, 48, 0.6); padding: 20px; border-radius: 8px; border-left: 4px solid #007acc; margin-bottom: 25px;">
        <h2 style="color: #ffffff; margin: 0 0 12px 0; font-size: 18px; font-family: 'Poppins', sans-serif;">
            🔧 Technical Implementation
        </h2>
        <p style="margin: 0 0 10px 0; color: #d4d4d4;">
            Built a gravity model framework in <strong style="color: #007acc;">R</strong> to analyze bilateral trade flows 
            in Business Services (2005). Implementation includes OLS with robust standard errors and fixed effects estimation.
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-top: 15px;">
            <div style="background: rgba(0, 0, 0, 0.3); padding: 10px; border-radius: 6px; text-align: center;">
                <div style="color: #007acc; font-size: 24px; font-weight: 700; font-family: 'JetBrains Mono', monospace;">72</div>
                <div style="color: #808691; font-size: 11px;">Countries</div>
            </div>
            <div style="background: rgba(0, 0, 0, 0.3); padding: 10px; border-radius: 6px; text-align: center;">
                <div style="color: #007acc; font-size: 24px; font-weight: 700; font-family: 'JetBrains Mono', monospace;">688</div>
                <div style="color: #808691; font-size: 11px;">Country Pairs</div>
            </div>
            <div style="background: rgba(0, 0, 0, 0.3); padding: 10px; border-radius: 6px; text-align: center;">
                <div style="color: #ffdb77; font-size: 24px; font-weight: 700; font-family: 'JetBrains Mono', monospace;">3</div>
                <div style="color: #808691; font-size: 11px;">Model Specs</div>
            </div>
        </div>
    </div>

    <!-- Model Specification -->
    <div style="background: #2d2d30; padding: 20px; border-radius: 8px; border-left: 4px solid #c99a4d; margin-bottom: 25px;">
        <h3 style="color: #c99a4d; margin: 0 0 12px 0; font-size: 16px; font-family: 'Poppins', sans-serif;">
            📐 Model Specification
        </h3>
        <div style="background: #1e1e1e; padding: 15px; border-radius: 6px; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 12px;">
            <code style="color: #ce9178;">
                log(Trade<sub>ij</sub>) = β<sub>0</sub> + β<sub>1</sub>log(GDP<sub>i</sub>) + β<sub>2</sub>log(GDP<sub>j</sub>) + β<sub>3</sub>log(Distance<sub>ij</sub>) + β<sub>4</sub>X<sub>ij</sub> + ε<sub>ij</sub>
            </code>
        </div>
        <p style="margin: 0; color: #a0a5ab; font-size: 13px;">
            Log-log specification allows coefficients to be interpreted as elasticities. X<sub>ij</sub> includes binary indicators for contiguity, common language, and colonial ties.
        </p>
    </div>

    <!-- Modeling Approach -->
    <div style="margin-bottom: 25px;">
        <h2 style="color: #ffffff; margin: 0 0 15px 0; font-size: 20px; font-family: 'Poppins', sans-serif;">
            🔍 Modeling Approach
        </h2>
        
        <!-- Step 1: Data Preparation -->
        <div style="background: rgba(45, 45, 48, 0.4); padding: 15px; border-radius: 8px; margin-bottom: 12px; border: 1px solid rgba(150, 150, 150, 0.1);">
            <h4 style="color: #ffdb77; margin: 0 0 8px 0; font-size: 14px; font-family: 'Poppins', sans-serif;">
                1. Data Preparation & Cleaning
            </h4>
            <p style="margin: 0 0 8px 0; font-size: 13px;">
                Filtered for non-zero trades, handled missing values, and created log transformations for continuous variables. 
                Computed CombinedGDP as the product of importer and exporter GDP.
            </p>
            <div style="background: #1e1e1e; padding: 8px 12px; border-radius: 4px; border-left: 3px solid #ffdb77;">
                <code style="color: #ce9178; font-size: 11px; font-family: 'JetBrains Mono', monospace;">
                    data &lt;- data %&gt;% filter(Trade > 0) %&gt;%<br/>
                    &nbsp;&nbsp;mutate(log_trade = log(Trade), log_distance = log(Distance))
                </code>
            </div>
        </div>

        <!-- Step 2: OLS -->
        <div style="background: rgba(45, 45, 48, 0.4); padding: 15px; border-radius: 8px; margin-bottom: 12px; border: 1px solid rgba(150, 150, 150, 0.1);">
            <h4 style="color: #007acc; margin: 0 0 8px 0; font-size: 14px; font-family: 'Poppins', sans-serif;">
                2. Intuitive Model (OLS)
            </h4>
            <p style="margin: 0 0 8px 0; font-size: 13px;">
                Baseline OLS regression with robust standard errors clustered by distance. 
                Captures baseline relationships without controlling for multilateral resistance.
            </p>
            <div style="background: #1e1e1e; padding: 8px 12px; border-radius: 4px; border-left: 3px solid #007acc;">
                <code style="color: #ce9178; font-size: 11px; font-family: 'JetBrains Mono', monospace;">
                    lm(log_trade ~ log_gdp_i + log_gdp_j + log_distance + <br/>
                    &nbsp;&nbsp;&nbsp;contiguity + language + colonizer, data = data)
                </code>
            </div>
        </div>

        <!-- Step 3: Fixed Effects -->
        <div style="background: rgba(45, 45, 48, 0.4); padding: 15px; border-radius: 8px; margin-bottom: 12px; border: 1px solid rgba(150, 150, 150, 0.1);">
            <h4 style="color: #007acc; margin: 0 0 8px 0; font-size: 14px; font-family: 'Poppins', sans-serif;">
                3. Structural Model (Fixed Effects)
            </h4>
            <p style="margin: 0 0 8px 0; font-size: 13px;">
                Added importer and exporter fixed effects to control for multilateral resistance terms. 
                This addresses the theoretical foundation of structural gravity models.
            </p>
            <div style="background: #1e1e1e; padding: 8px 12px; border-radius: 4px; border-left: 3px solid #007acc;">
                <code style="color: #ce9178; font-size: 11px; font-family: 'JetBrains Mono', monospace;">
                    feols(log_trade ~ log_distance + contiguity + language + <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;colonizer | importer + exporter, data = data)
                </code>
            </div>
        </div>

        <!-- Step 4: Visualization -->
        <div style="background: rgba(45, 45, 48, 0.4); padding: 15px; border-radius: 8px; margin-bottom: 12px; border: 1px solid rgba(150, 150, 150, 0.1);">
            <h4 style="color: #ffdb77; margin: 0 0 8px 0; font-size: 14px; font-family: 'Poppins', sans-serif;">
                4. Graphical Analysis
            </h4>
            <p style="margin: 0; font-size: 13px;">
                Created scatter plots with regression lines using <code style="background: #1e1e1e; padding: 2px 6px; border-radius: 3px; color: #ce9178;">ggplot2</code> 
                to visualize relationships between trade, distance, and GDP. Color-coded by dummy variables to show interaction effects.
            </p>
        </div>
    </div>

    <!-- Model Comparison -->
    <div style="margin-bottom: 25px;">
        <h2 style="color: #ffffff; margin: 0 0 15px 0; font-size: 20px; font-family: 'Poppins', sans-serif;">
            📈 Model Comparison
        </h2>
        <div style="background: #2d2d30; padding: 15px; border-radius: 8px; overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px; font-family: 'JetBrains Mono', monospace;">
                <thead>
                    <tr style="border-bottom: 2px solid #3e3e42;">
                        <th style="text-align: left; padding: 10px; color: #c99a4d;">Model</th>
                        <th style="text-align: center; padding: 10px; color: #c99a4d;">R²</th>
                        <th style="text-align: center; padding: 10px; color: #c99a4d;">Distance β</th>
                        <th style="text-align: center; padding: 10px; color: #c99a4d;">Fixed Effects</th>
                        <th style="text-align: center; padding: 10px; color: #c99a4d;">Obs</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid #3e3e42;">
                        <td style="padding: 10px; color: #d4d4d4;">Intuitive (OLS)</td>
                        <td style="text-align: center; padding: 10px; color: #007acc;">0.561</td>
                        <td style="text-align: center; padding: 10px; color: #ffdb77;">-0.944***</td>
                        <td style="text-align: center; padding: 10px; color: #858585;">No</td>
                        <td style="text-align: center; padding: 10px; color: #858585;">1,241</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #3e3e42;">
                        <td style="padding: 10px; color: #d4d4d4;">Structural (FE)</td>
                        <td style="text-align: center; padding: 10px; color: #007acc;">0.810</td>
                        <td style="text-align: center; padding: 10px; color: #ffdb77;">-1.216***</td>
                        <td style="text-align: center; padding: 10px; color: #007acc;">Yes</td>
                        <td style="text-align: center; padding: 10px; color: #858585;">1,227</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; color: #d4d4d4;">+ OECD Dummy</td>
                        <td style="text-align: center; padding: 10px; color: #007acc;">0.789</td>
                        <td style="text-align: center; padding: 10px; color: #ffdb77;">-1.234***</td>
                        <td style="text-align: center; padding: 10px; color: #007acc;">Yes</td>
                        <td style="text-align: center; padding: 10px; color: #858585;">1,227</td>
                    </tr>
                </tbody>
            </table>
            <p style="margin: 10px 0 0 0; color: #808691; font-size: 11px; font-style: italic;">
                *** p < 0.01 | Standard errors clustered by distance | Used <code style="background: #1e1e1e; padding: 2px 6px; border-radius: 3px;">fixest::feols()</code> for FE estimation
            </p>
        </div>
        <div style="margin-top: 15px; padding: 12px; background: rgba(0, 122, 204, 0.1); border-radius: 6px; border-left: 3px solid #007acc;">
            <p style="margin: 0; font-size: 12px; color: #d4d4d4;">
                <strong style="color: #007acc;">Technical Note:</strong> FE specification improves fit by 25 percentage points (R² from 0.561 to 0.810), 
                suggesting substantial country-specific heterogeneity that biases the intuitive model.
            </p>
        </div>
    </div>

    <!-- Data Exploration -->
    <div style="margin-bottom: 25px;">
        <h2 style="color: #ffffff; margin: 0 0 15px 0; font-size: 20px; font-family: 'Poppins', sans-serif;">
            📊 Data Exploration
        </h2>
        <div style="background: #2d2d30; padding: 15px; border-radius: 8px; overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px; font-family: 'JetBrains Mono', monospace;">
                <thead>
                    <tr style="border-bottom: 2px solid #3e3e42;">
                        <th style="text-align: left; padding: 10px; color: #c99a4d;">Variable</th>
                        <th style="text-align: right; padding: 10px; color: #c99a4d;">Mean</th>
                        <th style="text-align: right; padding: 10px; color: #c99a4d;">Min</th>
                        <th style="text-align: right; padding: 10px; color: #c99a4d;">Max</th>
                        <th style="text-align: right; padding: 10px; color: #c99a4d;">SD</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid #3e3e42;">
                        <td style="padding: 10px; color: #d4d4d4;">Trade</td>
                        <td style="text-align: right; padding: 10px; color: #d4d4d4;">78.22</td>
                        <td style="text-align: right; padding: 10px; color: #858585;">0.00</td>
                        <td style="text-align: right; padding: 10px; color: #007acc;">10,740.00</td>
                        <td style="text-align: right; padding: 10px; color: #858585;">511.02</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #3e3e42;">
                        <td style="padding: 10px; color: #d4d4d4;">Distance (km)</td>
                        <td style="text-align: right; padding: 10px; color: #d4d4d4;">5,764.48</td>
                        <td style="text-align: right; padding: 10px; color: #858585;">59.62</td>
                        <td style="text-align: right; padding: 10px; color: #007acc;">19,586.18</td>
                        <td style="text-align: right; padding: 10px; color: #858585;">4,667.77</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #3e3e42;">
                        <td style="padding: 10px; color: #d4d4d4;">GDP Importer</td>
                        <td style="text-align: right; padding: 10px; color: #d4d4d4;">591,645.80</td>
                        <td style="text-align: right; padding: 10px; color: #858585;">299.62</td>
                        <td style="text-align: right; padding: 10px; color: #007acc;">10,936,700</td>
                        <td style="text-align: right; padding: 10px; color: #858585;">1,587,973</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #3e3e42;">
                        <td style="padding: 10px; color: #d4d4d4;">Contiguity</td>
                        <td style="text-align: right; padding: 10px; color: #d4d4d4;">0.04</td>
                        <td style="text-align: right; padding: 10px; color: #858585;">0.00</td>
                        <td style="text-align: right; padding: 10px; color: #007acc;">1.00</td>
                        <td style="text-align: right; padding: 10px; color: #858585;">0.20</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; color: #d4d4d4;">Common Language</td>
                        <td style="text-align: right; padding: 10px; color: #d4d4d4;">0.07</td>
                        <td style="text-align: right; padding: 10px; color: #858585;">0.00</td>
                        <td style="text-align: right; padding: 10px; color: #007acc;">1.00</td>
                        <td style="text-align: right; padding: 10px; color: #858585;">0.25</td>
                    </tr>
                </tbody>
            </table>
            <p style="margin: 10px 0 0 0; color: #808691; font-size: 11px; font-style: italic;">
                GDP in millions (USD) | Generated using <code style="background: #1e1e1e; padding: 2px 6px; border-radius: 3px;">stargazer</code> package for LaTeX tables
            </p>
        </div>
        <div style="margin-top: 15px; padding: 12px; background: rgba(255, 219, 119, 0.1); border-radius: 6px; border-left: 3px solid #ffdb77;">
            <p style="margin: 0; font-size: 12px; color: #d4d4d4;">
                <strong style="color: #ffdb77;">Data Notes:</strong> High variance in GDP (SD > mean) and trade values suggests right-skewed distributions. 
                Log transformation justified for reducing heteroskedasticity and enabling elasticity interpretation.
            </p>
        </div>
    </div>

    <!-- Technical Interpretation -->
    <div style="background: rgba(255, 219, 119, 0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #ffdb77; margin-bottom: 25px;">
        <h2 style="color: #ffdb77; margin: 0 0 12px 0; font-size: 18px; font-family: 'Poppins', sans-serif;">
            🧠 Technical Interpretation & Limitations
        </h2>
        <p style="margin: 0 0 12px 0; font-size: 13px;">
            <strong style="color: #ffffff;">Econometric Considerations:</strong> The fixed effects specification addresses 
            multilateral resistance terms but introduces new identification challenges.
        </p>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.8;">
            <li><strong style="color: #ffdb77;">Endogeneity:</strong> OECD/WTO membership not randomly assigned → self-selection bias and reverse causality concerns</li>
            <li><strong style="color: #ffdb77;">Multicollinearity:</strong> WTO dropped in FE model due to perfect collinearity with fixed effects structure</li>
            <li><strong style="color: #ffdb77;">Limited Variation:</strong> Few OECD pairs reduces statistical power despite clear graphical trends</li>
            <li><strong style="color: #ffdb77;">Omitted Variables:</strong> Missing bilateral agreements, tax treaties, and other institutional factors</li>
        </ul>
        <div style="margin-top: 12px; padding: 10px; background: rgba(0, 0, 0, 0.3); border-radius: 4px;">
            <p style="margin: 0; font-size: 12px; color: #d4d4d4;">
                <strong style="color: #007acc;">Clustering Strategy:</strong> Standard errors clustered by distance to account for 
                spatial correlation in trade patterns. Alternative: two-way clustering by exporter-importer pairs.
            </p>
        </div>
    </div>

    <!-- Footer -->
    <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #3e3e42; text-align: center;">
        <p style="color: #5a5f68; font-size: 11px; margin: 0; font-style: italic;">
            Full paper available at <code style="background: #2d2d30; padding: 2px 6px; border-radius: 3px; color: #ce9178;">https://www.github.com/qhw-isaac/gravity_model/</code>
        </p>
    </div>
</div>
`;

