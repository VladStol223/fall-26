Helluva Capstone Group 

Capstone Kickoff & Execution Plan 

Autonomous 20–30 L/day Atmospheric Water Harvester  •  Georgia Tech ME 4182  •  Fall 2026 

NORTH STAR  Deliver a physical system that autonomously completes adsorption/dehumidification, sealing, desorption, condensation, water collection, and reset, with measured performance and a fabrication-ready package. Goal >30-40 Liters per day 

1. Kickoff Meeting Agenda 

Time 

Topic 

Outcome 

0–10 min 

Introductions & roles 

Backgrounds, strengths, team lead, subsystem ownership, working cadence. 

10–25 min 

Technology overview 

Walk through moisture capture, sealed regeneration, vapor condensation, collection, and reset. 

25–35 min 

Fixed inputs & design freedom 

Clarify supplied exchanger geometry and WattAir data; identify open design space. 

35–55 min 

Plan of attack 

Agree on baseline 80/20 + acrylic enclosure, parallel workstreams, procurement, and build gates. 

55–65 min 

Requirements & decisions 

Assign near-term actions, define success metrics, and identify information needed before Report #1. 

2. System Overview 

Adsorption/dehumidification: doors open and ambient air is driven uniformly across the sorbent-coated heat exchangers for approximately half of the daily cycle. 

Isolation: doors or dampers close and the enclosure is verified sealed before heat is introduced. 

Desorption: heated water-glycol passes through the heat exchangers as a single-phase heat-transfer fluid, releasing captured water vapor. 

Condensation and collection: vapor reaches a surface at or slightly below ambient temperature; condensate drains to a measurable collection point. 

Reset: heating stops, the unit returns to a safe temperature, the doors reopen, and the next adsorption cycle begins. 

Fixed Constraints and Design Freedom 

Primary heat exchanger: approximately 1 m × 1 m face and 40 mm deep; coated units will be integrated after mechanical shakedown. 

Performance goal: approximately 20–30 liters of water per day under defined representative conditions. 

WattAir provides existing layouts, sizing, components, prior test knowledge, and leads coated heat-exchanger preparation and integration. 

The team owns the enclosure, doors/dampers, fan and filter integration, condenser arrangement, sealing, insulation, sensors, controls, status lighting, serviceability, and system-level validation. 

 
 

3. Baseline Build Sequence 

Step 

Gate 

Action 

1 

Integrated CAD 

Translate WattAir sizing and exchanger layouts into an 80/20 frame with removable acrylic panels. 

2 

Concept selection 

Compare doors, airflow, filtration, condenser concepts, sealing, insulation, and component access; document the selection. 

3 

BOM & fabrication release 

Create the controlled BOM; issue aluminum and acrylic files; order long-lead controls and RGB components. 

4 

Uncoated assembly 

Install uncoated exchangers; verify fit, clearances, airflow, sealing, piping, drainage, and service access. 

5 

Shakedown 

Run an uncoated cycle and correct mechanical, electrical, sensing, control, and leakage issues. 

6 

Coated integration 

Integrate coated exchangers under WattAir’s lead only after the shakedown gate is passed. 

7 

System tuning 

Tune thermal performance, condensation, collection, autonomy, logging, status lighting, and demo mode. 

8 

Cost & value analysis 

Use measured water and energy performance with the BOM to calculate LCOW and evaluate design improvements. 

4. Semester Schedule and Milestones 

Date 

Gate / deliverable 

Required WattAir project outcome 

Sept. 2 

Team organization 

Kickoff; assign subsystem leads; confirm communication cadence and near-term decisions. 

Sept. 9 

Requirements 

Freeze constraints, interfaces, measurements, safety criteria, BOM fields, and external-area heat-loss method. 

Sept. 16 

Ideation & prior art 

Compare enclosure, door, fan, filter, condenser, insulation, controls, lighting, and irrigation concepts. 

Sept. 23 

Report #1 

Present requirements, operating cycle, alternatives, risks, schedule, and initial test strategy. 

Sept. 30 

Architecture freeze 

Select baseline architecture; incorporate sponsor and faculty feedback. 

Oct. 7 

Integrated CAD & BOM v1 

Complete CAD, airflow/pressure-drop estimates, enclosure heat-loss model, controls I/O, and costed BOM. 

Oct. 14 

Risk review 

Review hot surfaces, moving doors, electronics, leaks, condensate, and safe access. 

Oct. 21 

Fabrication release 

Release enclosure drawings and cut files; place remaining component orders. 

Oct. 28 

Report #2 

Present fabrication-ready design, condenser rationale, controls, test plan, costed BOM, and preliminary TEA/LCOW model. 

Nov. 2–6 

Fabrication 

Cut 80/20; waterjet acrylic; fabricate mounts, doors, seals, ducting, and condenser supports. 

Nov. 9–13 

Uncoated assembly 

Install uncoated exchangers, fans, filters, doors, sensors, piping, drainage, and controls. 

Nov. 16–20 

Shakedown gate 

Validate airflow, pressure drop, sealing, actuation, sensing, drainage, and transitions. 

Nov. 18–23 

Cosmetic operating demo 

Demonstrate RGB states and clean panel fit; bench-test optional level-triggered drip irrigation. 

Nov. 21–25 

Coated integration 

Close shakedown actions; integrate coated exchangers with WattAir; verify thermal operation. 

Nov. 26–Dec. 1 

Autonomous validation 

Measure water, energy, heat loss, and condenser performance; tune controls; update LCOW and TDA. 

Dec. 2 

Final class presentation 

Demonstrate the integrated system and measured performance. 

Dec. 7 

Poster & video 

Submit recorded cycle, live data, CAD, validation results, and key lessons. 

Dec. 8 

Capstone Expo 

Present the system, autonomous behavior, RGB states, and controlled humidity-pulse demo. 

Dec. 11 

Final package 

Deliver CAD, controlled BOM, code, wiring, test data, LCOW/TEA model, and recommendations. 

5. Parallel Workstreams 

Workstream 

Responsibilities 

Mechanical & CAD 

80/20 frame, acrylic panels, exchanger mounts, doors, seals, condenser supports, access, piping, and drainage. 

Airflow & thermal 

Fans, filters, pressure drop, uniformity, humidity change, condenser selection, insulation, external-area heat-loss accounting. 

Controls & electronics 

Sensors, actuators, valves, fan control, interlocks, state machine, logging, RGB status, and demo mode. 

Testing & integration 

Requirements, acceptance tests, procurement, schedule, risks, optional irrigation module, and subsystem coordination. 

Data & techno-economics 

Controlled BOM, daily yield, energy/water balance, LCOW, sensitivity analysis, TDA, and optional AI/ML optimization. 

 

PARALLELIZATION RULE  Controls development begins immediately on the bench. Sensor, actuator, valve, data-logging, lighting, and state-machine work must not wait for the enclosure to be fabricated. 

6. Bill of Materials, Heat Loss, and Techno-Economic Analysis 

Every purchased, fabricated, and supplied component must appear in a controlled bill of materials, including part number, description, quantity, supplier, unit cost, extended cost, lead time, subsystem, material, mass where relevant, and make/buy status. 

Maintain BOM revisions as the CAD changes and reconcile the final BOM against the physical build. Distinguish prototype-only items from components expected in a scaled commercial unit. 

Once measured or modeled daily water production is available, calculate levelized cost of water (LCOW) using annualized capital cost, replacement and maintenance costs, energy, consumables, useful life, capacity factor, and annual liters produced. Report assumptions and sensitivity ranges rather than a single unsupported value. 

Estimate enclosure heat loss from external surface area, insulation and panel thermal resistance, thermal bridges, air leakage, internal temperature, ambient temperature, wind or convection assumptions, and cycle duration. Compare predicted losses with test data where instrumentation allows. 

Use the combined performance, controls, heat-loss, and cost model to show how design and control optimization could improve system performance and the techno-economic/design assessment (TDA). 

AI or machine learning may support weather-response modeling, surrogate models, control optimization, anomaly detection, and multi-variable sensitivity analysis when sufficient data exists. It should support, not replace, first-principles balances and experimentally validated conclusions. 

Condenser Innovation 

Generate and evaluate multiple condenser concepts rather than treating the condenser as fixed. Compare collection effectiveness, approach to ambient temperature, pressure drop, heat rejection, drainage, cleanability, corrosion resistance, size, power, cost, and integration risk. 

Document the selected condenser using an engineering decision matrix and validate its most important assumption with a calculation or representative test. 

Optional Stretch Feature: Level-Triggered Drip Irrigation 

A small drip-irrigation demonstration may connect to the bottom collection container. A level sensor should trigger a low-voltage pump or normally closed valve once a defined water level is reached, then stop at a lower reset level to avoid rapid cycling. 

Include overflow protection, manual disable, dry-run protection where applicable, electrical isolation from condensate, accessible tubing, and a visible plant or irrigation target for the final demonstration. 

ANALYSIS CHAIN  BOM + measured daily water yield + energy and heat-loss data → LCOW and sensitivity analysis → control/design optimization → stronger TDA and commercialization recommendations. 

7. RGB Operating-State Language 

RGB state 

Operating state 

Visible meaning 

Blue 

Adsorption / dehumidification 

Doors open; fans draw ambient air through the exchanger; inlet/outlet humidity and pressure drop are displayed. 

Purple 

Isolation / transition 

Doors are moving or sealing; heating is inhibited until closed-position and safety checks pass. 

Amber / orange 

Desorption / regeneration 

Doors sealed; water-glycol heating active; exchanger and vapor temperatures are displayed. 

Cyan 

Condensation / collection 

Condenser active or condensate detected; collected water and rate are highlighted. 

Green 

Cycle complete / ready 

Cycle complete, system safe, data saved, and unit ready for the next command. 

Red 

Fault / safe shutdown 

Leak, over-temperature, door-position disagreement, flow failure, or another interlock has stopped operation. 

Lighting should communicate operating state, not replace a labeled screen, indicator, or alarm. 

Use diffused, low-voltage lighting mounted away from condensate and hot surfaces, with brightness adjustable for the Expo environment. 

8. Final Demonstration: Desorption with Humidity Pulses 

Demonstration concept. Run primarily in desorption mode so the audience can observe heating, vapor release, condensation, and water collection. At controlled intervals, trigger a short humidity-pulse routine: pause heating as required by the safety logic, briefly open the selected doors, operate the fan to pull humid ambient air through the monitored path, show the immediate sensor response, close and verify the doors, then return to the sealed demonstration state. 

Step 

Action 

Audience-facing behavior 

1 

Stable desorption 

Amber lighting; doors confirmed closed; temperatures, RH, flow, and condensate trend displayed. 

2 

Pulse requested 

Controller checks temperatures, actuator health, operator enable, and permissible demo conditions. 

3 

Controlled air sample 

Heating is paused or isolated as required; door opens briefly; fan draws ambient air; lighting changes blue. 

4 

Make the change visible 

Dashboard highlights inlet/outlet RH, humidity ratio, temperature, pressure drop, and timestamped response. 

5 

Reseal and verify 

Fan stops or redirects; door closes; closed-position and leakage checks pass; lighting transitions through purple. 

6 

Resume demonstration 

System returns to the approved sealed state; amber/cyan lighting resumes and the event remains marked on the plot. 

 

IMPORTANT CONTROL BOUNDARY  This is a dedicated demonstration mode, not the normal production sequence. Door opening during active sealed desorption can release hot, moisture-rich air and reduce performance. Pulse duration and cadence must therefore be configurable and validated during testing, not fixed in advance, and the routine must abort on high temperature, unsafe pressure, condensate/electrical risk, actuator fault, or loss of operator enable. 

9. Stage Gates and Acceptance Evidence 

Gate 

Evidence required to pass 

Requirements gate 

Dimensions, operating states, interfaces, hazards, measurements, and acceptance criteria approved. 

BOM/analysis gate 

All build components are costed and traceable; LCOW inputs, heat-loss assumptions, and sensitivity ranges are defined. 

CAD release gate 

Components fit; doors clear; files are manufacturable; access, drainage, and wiring paths are defined. 

Uncoated shakedown gate 

Airflow, sealing, doors, sensors, controls, piping, drainage, and RGB states operate safely. 

Coated integration gate 

No unresolved issue is likely to damage, contaminate, overheat, or obstruct the coated exchangers. 

Autonomy gate 

The complete cycle transitions without manual intervention and faults produce a safe shutdown. 

Demonstration gate 

Desorption, condensation, RGB status, live plots, and controlled humidity pulses are repeatable and audience-ready. 

Final validation gate 

Results are repeatable; condenser performance, LCOW, TDA, and optimization claims are supported by data. 

10. First-Week Action List 

Assign mechanical/CAD, airflow/thermal, controls/electronics, and testing/integration owners. 

Create the team charter, communication channel, shared repository, decision log, risk register, and procurement tracker. 

Receive the WattAir exchanger envelope, preliminary container layout, available components, and non-confidential test information. 

Draft the system boundary and state diagram, including normal operation, manual service, fault shutdown, and demonstration mode. 

Define measurable acceptance criteria for airflow, pressure drop, sealing, door actuation, temperatures, humidity response, condensation, autonomy, and safety. 

Create the controlled BOM structure and identify the financial, lifetime, energy, maintenance, and production assumptions needed for LCOW and the TDA. 

Define the external surface-area heat-loss calculation and the measurements needed to validate it; begin a condenser concept decision matrix. 

Identify long-lead items and submit the first procurement list before detailed CAD is complete. 

 

Build quickly. Validate methodically. Demonstrate visibly. 

 

Papers that might be of interest: 

Identify long-lead items and submit the first procurement list before detailed CAD is complete 

Best hydrogel-device papers 

Min et al., “High-Yield Atmospheric Water Harvesting Device with Integrated Heating/Cooling Enabled by Thermally Tailored Hydrogel Sorbent,” ACS Energy Letters, 2023. 
It presents a complete hydrogel-based device integrating heating and cooling, rather than only reporting sorbent uptake. It should be useful for condenser design, thermal integration, energy consumption, and device-level performance. 

Yang et al., “Enhanced Continuous Atmospheric Water Harvesting with Scalable Hygroscopic Gel Driven by Natural Sunlight and Wind,” Nature Communications, 2024. 
Highly relevant to airflow, condensation limitations, scalable coating, rapid sorption/desorption, and continuous operation. The paper explicitly addresses inefficiencies at both the material and component levels. 

Liu et al., “A Metre-Scale Vertical Origami Hydrogel Panel for Atmospheric Water Harvesting in Death Valley,” Nature Water, 2025. 
Particularly useful because it moves to a meter-scale hydrogel panel and reports outdoor performance under 21–88% RH. It also discusses water quality, salt containment, durability, device configuration, and the gap between material capacity and collected water. 

Wang et al., “High-Yield and Scalable Water Harvesting of Honeycomb Hygroscopic Polymer Driven by Natural Sunlight,” Cell Reports Physical Science, 2022. 
Useful for geometry and mass-transfer design. The honeycomb architecture addresses diffusion distance, exposed area, scalability, adsorption/desorption kinetics, and projected device yield under different weather conditions. 

Li et al., “Hybrid Hydrogel with High Water Vapor Harvesting Capacity for Deployable Solar-Driven Atmospheric Water Generator,” Environmental Science & Technology, 2018. 
One of the foundational salt–hydrogel device papers. It covers a PAM-based hygroscopic hydrogel, vapor capture, thermal release, solar regeneration, and a deployable generator. This is close to WattAir’s underlying material-to-device problem. 

Zhao et al., “Super Moisture-Absorbent Gels for All-Weather Atmospheric Water Harvesting,” Advanced Materials, 2019. 
A widely cited foundational paper using a hygroscopic polymer network with thermally responsive behavior. It is valuable for understanding how hydrogel chemistry, water uptake, desorption temperature, and device operation interact across different humidity conditions. 
Paper and DOI  

 
 

Wilson, C. T., Cha, H., Zhong, Y., Li, A. C., Lin, E., & El Fil, B. (2023). “Design considerations for next-generation sorbent-based atmospheric water-harvesting devices.” Device, 1(2), 100052. 

 
 

Wilson, C. T., Díaz-Marín, C. D., Colque, J. P., Mooney, J. P., & El Fil, B. (2025). “Solar-driven atmospheric water harvesting in the Atacama Desert through physics-based optimization of a hygroscopic hydrogel device.” Device, 3(8), 100798. 

 

Particularly relevant to past materials 

Díaz-Marín et al., “Heat and Mass Transfer in Hygroscopic Hydrogels,” International Journal of Heat and Mass Transfer, 2022. 
 
 

Díaz-Marín et al., “Kinetics of Sorption in Hygroscopic Hydrogels,” Nano Letters, 2022. 
 
 

Lu et al., “Tailoring the Desorption Behavior of Hygroscopic Gels for Atmospheric Water Harvesting in Arid Climates,” Advanced Materials, 2022. 
 
 

Díaz-Marín et al., “Long-Term Stability of Moisture-Capturing Hydrogels by Preventing Metal-Mediated Degradation,” Nature Communications, 2026. 
 
 

Best review and design reference 

Zhong et al., “Bridging Materials Innovations to Sorption-Based Atmospheric Water Harvesting Devices,” Nature Reviews Materials, 2024. 
A strong reference for connecting laboratory uptake values to real devices. It covers heat and mass transfer, cycling, condenser limitations, system architecture, energy efficiency, and performance metrics. 
 
 

 