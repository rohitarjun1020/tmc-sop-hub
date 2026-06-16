// ══════════════════════════════════════════════════
//  SOP DATA — All step content for the 3 SOPs
// ══════════════════════════════════════════════════
const SOPS = [

  // ─────────────────────────────────────────
  // SOP 1 — P&L PROFORMA
  // ─────────────────────────────────────────
  {
    id: 0,
    title: "P&L Proforma",
    color: "#D4A843",
    steps: [
      {
        title: "Gather Source Data",
        owner: "Rohit Arjun Raj",
        duration: "~20 min",
        content: `
<div class="step-body">
  <p class="step-intro">Before touching any sheet, collect and verify all raw data inputs. The P&L is only as accurate as the data feeding into it.</p>
  <div class="process-list">
    <div class="process-item">
      <div class="pi-num">1</div>
      <div class="pi-content">
        <div class="pi-title">Operational MIS Google Sheet — 2026 Batches Tab</div>
        <div class="pi-desc">Contains all batch details: batch name, client name, start date, end date, number of learners, and fee charged. This is the primary source for Revenue and COGS data.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">2</div>
      <div class="pi-content">
        <div class="pi-title">Operational MIS Google Sheet — Teachers Tab</div>
        <div class="pi-desc">Lists each teacher's name, assigned course, total teaching hours for the course, and cost per hour. Required for COGS calculation.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">3</div>
      <div class="pi-content">
        <div class="pi-title">TMC Payroll FY 26-27 Google Sheet</div>
        <div class="pi-desc">Contains payroll details for all employees across Operations, G&A, and S&M categories. Pre-forecasted through March 2027.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">4</div>
      <div class="pi-content">
        <div class="pi-title">Cashflow Forecast File</div>
        <div class="pi-desc">Used as the reference for Professional Charges, S&M expenses, and G&A overheads in the Expenses sheet.</div>
      </div>
    </div>
  </div>
  <div class="info-box tip">
    <i class="fa-solid fa-circle-info"></i>
    <p>Verify that the Operational MIS is up to date before starting. If new batches have been added or ended, the sheet must reflect those changes first.</p>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>The P&L is only as accurate as its inputs. If the batch list is outdated or payroll figures are stale, every downstream sheet — Revenue, COGS, Manpower — will carry that error forward and produce a wrong EBITDA.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>Check the last-edited date on each source sheet. Confirm with Ms. Nikhitha / Mr. Sidhant that the batch list is current. Verify new batches added since last month's P&L are reflected in the MIS.</p>
    </div>
  </div>
</div>`
      },
      {
        title: "Revenue Buildup Sheet",
        owner: "Rohit Arjun Raj",
        duration: "~45 min",
        content: `
<div class="step-body">
  <p class="step-intro">This is always the <strong>first sheet to complete</strong>. It captures revenue earned in the current month for all active B2B and RTD courses.</p>
  <div class="process-list">
    <div class="process-item">
      <div class="pi-num">1</div>
      <div class="pi-content">
        <div class="pi-title">Filter Active Courses</div>
        <div class="pi-desc">In the Operational MIS → 2026 Batches tab, apply a filter to show only courses <em>ending after the first day of the current month</em>. This captures all ongoing and recently-started batches.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">2</div>
      <div class="pi-content">
        <div class="pi-title">Enter Batch Details</div>
        <div class="pi-desc">For each active batch, record: Batch name, Client name, Start date, End date, Number of learners, Total fee.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">3</div>
      <div class="pi-content">
        <div class="pi-title">Include RTD Pipeline Revenue</div>
        <div class="pi-desc">Add RTD revenue into this sheet as well. <strong>Important:</strong> If RTD revenue is included here, its COGS must also be added to the COGS sheet — never one without the other.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">4</div>
      <div class="pi-content">
        <div class="pi-title">Apply Revenue Proration Formula</div>
        <div class="pi-desc">Use NETWORKDAYS to calculate workdays, then prorate proportionally.</div>
      </div>
    </div>
  </div>
  <div class="formula-block">
    <div class="formula-label">Revenue Proration Formula</div>
    <div class="formula-expr">= (Month Workdays ÷ Total Course Workdays) × Total Course Fee</div>
    <div class="formula-breakdown">
      <div class="fb-row"><span class="fb-key">Month WD</span><span class="fb-val">Working days falling in the current month for this batch</span></div>
      <div class="fb-row"><span class="fb-key">Total WD</span><span class="fb-val">Full working days across the entire course duration</span></div>
      <div class="fb-row"><span class="fb-key">Course Fee</span><span class="fb-val">Total fee for the entire batch</span></div>
    </div>
  </div>
  <div class="info-box warning">
    <i class="fa-solid fa-triangle-exclamation"></i>
    <p><strong>Currency Conversion:</strong> If the batch fee is in USD, convert to INR using the prevailing exchange rate before entering into the model.</p>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>Revenue is the topline — every downstream metric (Gross Profit, EBITDA, Burn) depends on it. Proration ensures we recognise only the portion of revenue <strong>earned in this month</strong>, not the full course fee, preventing over- or under-statement.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>Cross-check total revenue against the Operational MIS batch list — every active batch must appear. Manually verify NETWORKDAYS output for at least 2 batches. Confirm foreign-currency batches are converted to INR.</p>
    </div>
  </div>
</div>`
      },
      {
        title: "COGS Buildup Sheet",
        owner: "Rohit Arjun Raj",
        duration: "~30 min",
        content: `
<div class="step-body">
  <p class="step-intro">All courses from the Revenue sheet appear here too. COGS captures the direct cost of delivering those courses — but <strong>only for consultant (non-payroll) teachers</strong>.</p>
  <div class="info-box warning">
    <i class="fa-solid fa-triangle-exclamation"></i>
    <p><strong>Critical Rule:</strong> Payroll teachers are <em>excluded</em> from COGS. Their salaries are captured in the Manpower sheet as Operational Salaries. Only external consultant teachers have COGS entries here.</p>
  </div>
  <div class="process-list">
    <div class="process-item">
      <div class="pi-num">1</div>
      <div class="pi-content">
        <div class="pi-title">Pull Teacher Details from Operational MIS</div>
        <div class="pi-desc">From the Teachers tab, get: teacher name, assigned course, total teaching hours, and cost per hour. Check if the teacher is on payroll — if yes, skip them here.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">2</div>
      <div class="pi-content">
        <div class="pi-title">Calculate Monthly Teaching Hours</div>
        <div class="pi-desc">Prorate the teaching hours to the current month using the same workday logic as revenue.</div>
      </div>
    </div>
  </div>
  <div class="formula-block">
    <div class="formula-label">Monthly COGS Formula</div>
    <div class="formula-expr">= (Teaching Hours ÷ Total Course Workdays) × Month Workdays × Cost Per Hour</div>
    <div class="formula-breakdown">
      <div class="fb-row"><span class="fb-key">Teach Hrs</span><span class="fb-val">Total teaching hours for the entire course duration</span></div>
      <div class="fb-row"><span class="fb-key">Total WD</span><span class="fb-val">Full workdays of the course</span></div>
      <div class="fb-row"><span class="fb-key">Month WD</span><span class="fb-val">Workdays in the current month for this course</span></div>
      <div class="fb-row"><span class="fb-key">Cost/Hr</span><span class="fb-val">Hourly rate charged by the consultant teacher</span></div>
    </div>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>COGS directly reduces Gross Profit. Missing a consultant or accidentally including a payroll teacher will misstate both Contribution Margin and Gross Profit, giving management a false picture of delivery profitability.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>Every consultant teacher in the Revenue sheet must have a COGS entry here. Cross-verify names in the Operational MIS Teachers tab. Confirm <strong>zero payroll teachers</strong> appear in this sheet.</p>
    </div>
  </div>
</div>`
      },
      {
        title: "Manpower Sheet",
        owner: "Rohit Arjun Raj",
        duration: "~20 min",
        content: `
<div class="step-body">
  <p class="step-intro">The Manpower sheet captures payroll costs for all TMC employees. Source: <strong>TMC Payroll FY 26-27 Google Sheet</strong> on TMC Drive.</p>
  <div class="two-col">
    <div class="cat-box cat-gold">
      <div class="cat-box-icon"><i class="fa-solid fa-chalkboard-user"></i></div>
      <h4>Operations Salaries</h4>
      <p>Payroll teachers — their cost is here, NOT in COGS</p>
    </div>
    <div class="cat-box cat-blue">
      <div class="cat-box-icon"><i class="fa-solid fa-briefcase"></i></div>
      <h4>G&amp;A Salaries</h4>
      <p>Management, admin and general &amp; administrative staff</p>
    </div>
    <div class="cat-box cat-purple">
      <div class="cat-box-icon"><i class="fa-solid fa-bullhorn"></i></div>
      <h4>S&amp;M Salaries</h4>
      <p>Sales &amp; Marketing team members</p>
    </div>
  </div>
  <div class="info-box success">
    <i class="fa-solid fa-circle-check"></i>
    <p>Salaries are pre-forecasted through <strong>March 2027</strong> in the payroll sheet, so future months can be populated quickly without re-calculating from scratch.</p>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>Payroll is typically the largest cost category in any month. Capturing it accurately by department (Ops / G&A / S&M) ensures the P&L correctly breaks down costs for management reporting and budget-vs-actual comparisons.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>Total salary cost in this sheet must match the TMC Payroll Google Sheet for the month. Cross-check the Axis bank statement to confirm the disbursement amounts and dates are consistent with what's entered here.</p>
    </div>
  </div>
</div>`
      },
      {
        title: "Expenses Sheet",
        owner: "Rohit Arjun Raj",
        duration: "~25 min",
        content: `
<div class="step-body">
  <p class="step-intro">The Expenses sheet covers all operating expenses (OPEX) that are not salaries. Most figures are taken directly from the <strong>Cashflow Forecast file</strong>.</p>
  <div class="two-col">
    <div class="cat-box cat-gold">
      <div class="cat-box-icon"><i class="fa-solid fa-file-contract"></i></div>
      <h4>Professional Charges</h4>
      <p>Legal, audit and advisory fees — from cashflow data</p>
    </div>
    <div class="cat-box cat-blue">
      <div class="cat-box-icon"><i class="fa-solid fa-bullhorn"></i></div>
      <h4>S&amp;M Charges</h4>
      <p>Software tools, travel and other sales &amp; marketing costs</p>
    </div>
    <div class="cat-box cat-green">
      <div class="cat-box-icon"><i class="fa-solid fa-building"></i></div>
      <h4>G&amp;A Overheads</h4>
      <p>Courier, telephone, printing, internet, office rent, misc</p>
    </div>
  </div>
  <div class="info-box tip">
    <i class="fa-solid fa-lightbulb"></i>
    <p>Always pull these numbers from the finalized Cashflow Forecast. Do not independently estimate these figures — both models must show identical values.</p>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>OPEX determines EBITDA. If expense figures here differ from the Cashflow model, management will see two conflicting numbers — one in the P&L and one in the cashflow. Both models must be in sync to maintain credibility.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>Every expense line must have a matching entry in the Cashflow Forecast file. Spot-check <strong>3–4 line items</strong> to verify both models show identical values for the same month.</p>
    </div>
  </div>
</div>`
      },
      {
        title: "Generate Final P&L",
        owner: "Rohit Arjun Raj",
        duration: "~20 min",
        content: `
<div class="step-body">
  <p class="step-intro">The Final P&L sheet consolidates all prior sheets into a complete Profit &amp; Loss statement. No new data entry here — it pulls from Revenue, COGS, Manpower, and Expenses.</p>
  <div class="pl-flow">
    <div class="pl-row income"><span><i class="fa-solid fa-plus" style="margin-right:8px"></i>B2B Revenue &nbsp;+&nbsp; RTD Revenue</span><span class="pl-tag g">Revenue</span></div>
    <div class="pl-row deduct"><span><i class="fa-solid fa-minus" style="margin-right:8px"></i>B2B COGS &nbsp;−&nbsp; RTD COGS</span><span class="pl-tag r">Deduct</span></div>
    <div class="pl-row result"><span><i class="fa-solid fa-equals" style="margin-right:8px"></i>Contribution Margin</span></div>
    <div class="pl-row deduct"><span><i class="fa-solid fa-minus" style="margin-right:8px"></i>Operational Salaries</span><span class="pl-tag r">Deduct</span></div>
    <div class="pl-row result"><span><i class="fa-solid fa-equals" style="margin-right:8px"></i>Gross Profit</span></div>
    <div class="pl-row deduct"><span><i class="fa-solid fa-minus" style="margin-right:8px"></i>OPEX &nbsp;(S&amp;M + G&amp;A)</span><span class="pl-tag r">Deduct</span></div>
    <div class="pl-row final"><span><i class="fa-solid fa-star" style="margin-right:8px"></i>EBITDA</span></div>
    <div class="pl-row burn"><span><i class="fa-solid fa-fire" style="margin-right:8px"></i>Total Burn = COGS + Operational Salaries + Total OPEX</span></div>
  </div>
  <div class="info-box success">
    <i class="fa-solid fa-star"></i>
    <p><strong>EBITDA</strong> is the primary management metric. <strong>Total Burn</strong> tracks total cash consumed each month and feeds into the Cashflow model.</p>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>The Final P&L is the output management and investors see. Any error from upstream sheets surfaces here. A wrong EBITDA or burn figure directly impacts decisions around hiring, spending, and fundraising.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>Manually verify: <strong>EBITDA = Revenue − COGS − Manpower − OPEX</strong>. Total Burn should match cashflow outflows. Compare with last month's P&L to ensure YTD figures are directionally consistent.</p>
    </div>
  </div>
</div>`
      },
      {
        title: "Review & Approve",
        owner: "Mr. Vinay / Mr. Karthik",
        duration: "~15 min",
        content: `
<div class="step-body">
  <p class="step-intro">Once the Final P&L sheet is complete, the model goes through a formal review and approval process before being filed.</p>
  <div class="process-list">
    <div class="process-item">
      <div class="pi-num">1</div>
      <div class="pi-content">
        <div class="pi-title">Internal Review — Mr. Vinay</div>
        <div class="pi-desc">Reviews the model for accuracy of inputs, formula consistency, and reasonableness of outputs.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">2</div>
      <div class="pi-content">
        <div class="pi-title">Final Approval — Mr. Karthik</div>
        <div class="pi-desc">Approves the finalized P&L. Any changes at this stage require re-review.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">3</div>
      <div class="pi-content">
        <div class="pi-title">Version Control & Filing</div>
        <div class="pi-desc">Save the file following the naming convention:<br><code>TMC_PnL_ProForma_2026/06_V1.0.xlsx</code></div>
      </div>
    </div>
  </div>
  <div class="two-col">
    <div class="cat-box cat-blue">
      <div class="cat-box-icon"><i class="fa-solid fa-code-branch"></i></div>
      <h4>Version</h4>
      <p>V1.0 — 8th June 2026 — Initial Release</p>
    </div>
    <div class="cat-box cat-green">
      <div class="cat-box-icon"><i class="fa-regular fa-clock"></i></div>
      <h4>Frequency</h4>
      <p>Monthly update — Finance Team responsible</p>
    </div>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>A formal sign-off protects TMC from circulating inaccurate financial data internally or externally. It also creates an audit trail — if a number is questioned later, there is a clear record of who approved what and when.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>Both Mr. Vinay and Mr. Karthik have reviewed and signed off. Version number is logged in the file. File is saved with the correct naming convention in the designated Google Drive folder.</p>
    </div>
  </div>
</div>`
      }
    ]
  },

  // ─────────────────────────────────────────
  // SOP 2 — LOOKER DASHBOARD
  // ─────────────────────────────────────────
  {
    id: 1,
    title: "Looker Studio Dashboard",
    color: "#3B82F6",
    steps: [
      {
        title: "Prepare & Upload Data Files",
        owner: "Rohit Arjun Raj",
        duration: "~20 min",
        content: `
<div class="step-body">
  <p class="step-intro">The dashboard is powered by the <strong>CF Dash Looker Google Sheet</strong>. Every update begins with refreshing this source file with the latest data.</p>
  <div class="process-list">
    <div class="process-item">
      <div class="pi-num">1</div>
      <div class="pi-content">
        <div class="pi-title">Upload Files to Claude</div>
        <div class="pi-desc">Upload the CF Forecast file, MIS file, and the TMC Dash Looker file to Claude. Ask Claude to extract all numbers and populate the correct cells in the Dash Looker Google Sheet.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">2</div>
      <div class="pi-content">
        <div class="pi-title">Convert Output if Needed</div>
        <div class="pi-desc">If Claude returns the data as an Excel file, upload to Google Drive and select "Open with Google Sheets."</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">3</div>
      <div class="pi-content">
        <div class="pi-title">Paste into Original Dash Looker File</div>
        <div class="pi-desc">Copy the updated data and paste it into the <strong>original</strong> CF Dash Looker file. Never replace the file — that breaks all dashboard connections.</div>
      </div>
    </div>
  </div>
  <div class="info-box warning">
    <i class="fa-solid fa-triangle-exclamation"></i>
    <p><strong>Never replace the source Google Sheet file.</strong> Always paste new data into the existing file. Replacing the file disconnects every chart and table on all 3 dashboard sheets.</p>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>The dashboard only reflects what is in the source Google Sheet. If the Dash Looker file has stale data, all 3 sheets will show wrong figures to management — and they will be making decisions based on outdated numbers.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>After pasting, open the Dash Looker Google Sheet and spot-check <strong>2–3 specific cells</strong> (e.g., current month closing balance, total receipts) against the original Cashflow file. They must match exactly.</p>
    </div>
  </div>
</div>`
      },
      {
        title: "Connect Sheets to Dashboard",
        owner: "Rohit Arjun Raj",
        duration: "~15 min",
        content: `
<div class="step-body">
  <p class="step-intro">If a section ever loses its connection or you need to link a new sheet, follow these steps in Looker Studio.</p>
  <div class="process-list">
    <div class="process-item">
      <div class="pi-num">1</div>
      <div class="pi-content">
        <div class="pi-title">Add a New Data Source</div>
        <div class="pi-desc">Click <strong>"Add Data"</strong> at the top → select <strong>Google Sheets</strong> → choose the Dash Looker file from the same Google Drive account as the dashboard.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">2</div>
      <div class="pi-content">
        <div class="pi-title">Select the Correct Sheet Tab</div>
        <div class="pi-desc">After selecting the file, choose which tab to connect (e.g. CF Summary, CF Inflows, MIS Summary, etc.).</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">3</div>
      <div class="pi-content">
        <div class="pi-title">Reconnect an Existing Section</div>
        <div class="pi-desc">Click the section → <strong>Setup</strong> panel (right) → data source icon → <strong>Edit Connection</strong> → <strong>Reconnect</strong>.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">4</div>
      <div class="pi-content">
        <div class="pi-title">Refresh Data After Updates</div>
        <div class="pi-desc"><strong>Method 1:</strong> Three-dot menu → Refresh Data.<br><strong>Method 2 (if Method 1 fails):</strong> Reconnect the sheet, then refresh the browser tab.</div>
      </div>
    </div>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>A disconnected section displays an error or blank panel — making the dashboard unusable for that section. Live connections also ensure the dashboard auto-reflects source data changes without needing manual rebuilds each time.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>Click each chart or table and verify the data source in the <strong>Setup panel</strong> points to the correct sheet tab. Every section must show data — zero error states or blank panels across all 3 sheets.</p>
    </div>
  </div>
</div>`
      },
      {
        title: "Sheet 1 — MIS Dashboard",
        owner: "Rohit Arjun Raj",
        duration: "~25 min",
        content: `
<div class="step-body">
  <p class="step-intro">Sheet 1 provides a complete P&L and expense picture from the MIS data. It has <strong>6 sections</strong>, all connected to the MIS tabs of the Dash Looker file.</p>
  <div class="section-grid">
    <div class="section-card">
      <div class="sc-num">§ 1</div>
      <h4>Revenue Trend</h4>
      <p>Bar chart showing monthly revenue trend. Number of bars is configurable.</p>
      <div class="sc-source">Source: MIS Summary Sheet</div>
    </div>
    <div class="section-card">
      <div class="sc-num">§ 2</div>
      <h4>Concise P&amp;L</h4>
      <p>Key metrics: Revenue, COGS, Gross Profit, S&amp;M, G&amp;A, EBITDA.</p>
      <div class="sc-source">Source: MIS Summary Sheet</div>
    </div>
    <div class="section-card">
      <div class="sc-num">§ 3</div>
      <h4>Detailed Breakup</h4>
      <p>Deeper cost breakdown for a clearer understanding of expense composition.</p>
      <div class="sc-source">Source: MIS Summary Sheet</div>
    </div>
    <div class="section-card">
      <div class="sc-num">§ 4</div>
      <h4>Expense Trend</h4>
      <p>Bar graph comparing COGS, G&amp;A, and S&amp;M side by side across months.</p>
      <div class="sc-source">Source: MIS Summary Sheet</div>
    </div>
    <div class="section-card">
      <div class="sc-num">§ 5</div>
      <h4>Ledger Level Breakup</h4>
      <p><strong>Interactive:</strong> Select any month to see all individual costs incurred.</p>
      <div class="sc-source">Source: MIS Expenses Sheet</div>
    </div>
    <div class="section-card">
      <div class="sc-num">§ 6</div>
      <h4>Salaries Breakup</h4>
      <p>Detailed salary expenses for the selected month with full employee-level detail.</p>
      <div class="sc-source">Source: MIS Salaries Sheet</div>
    </div>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>Sheet 1 is the primary P&L view for management. It must reflect the latest MIS data so leadership can track revenue trends, cost composition, and profitability at a glance — without opening the raw Excel files.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>Revenue Trend bars must match MIS Summary sheet values. The Concise P&L must match the Final P&L from the P&L Proforma model. <strong>Test the interactive month selector</strong> on Sections 5 and 6 — it must filter correctly.</p>
    </div>
  </div>
</div>`
      },
      {
        title: "Sheet 2 — CF Monthly View",
        owner: "Rohit Arjun Raj",
        duration: "~25 min",
        content: `
<div class="step-body">
  <p class="step-intro">Sheet 2 provides a detailed cash flow picture for a selected month. It has <strong>6 sections</strong> connected to the CF tabs.</p>
  <div class="section-grid">
    <div class="section-card">
      <div class="sc-num">§ 1</div>
      <h4>Summary CF of the Month</h4>
      <p>Opening balance, total receipts, total payments, and closing balance for the selected month.</p>
      <div class="sc-source">Source: CF Summary</div>
    </div>
    <div class="section-card">
      <div class="sc-num">§ 2</div>
      <h4>Inflows &amp; Outflows Detail</h4>
      <p>Detailed line-by-line breakdown of all cash inflows and outflows for the month.</p>
      <div class="sc-source">Source: CF Inflows + CF Expenses</div>
    </div>
    <div class="section-card">
      <div class="sc-num">§ 3</div>
      <h4>Expense Type Pie Chart</h4>
      <p>Visual pie showing which cost category (COGS, G&amp;A, S&amp;M) contributes the most.</p>
      <div class="sc-source">Source: CF Exp Detailed</div>
    </div>
    <div class="section-card">
      <div class="sc-num">§ 4</div>
      <h4>COGS / G&amp;A / S&amp;M Drill-down</h4>
      <p><strong>Interactive:</strong> Select a category to see all individual costs within it.</p>
      <div class="sc-source">Source: CF Exp Detailed</div>
    </div>
    <div class="section-card">
      <div class="sc-num">§ 5</div>
      <h4>Expense Breakup</h4>
      <p>Software, marketing, general and consultant expenses in one consolidated view.</p>
      <div class="sc-source">Source: CF Exp Detailed</div>
    </div>
    <div class="section-card">
      <div class="sc-num">§ 6</div>
      <h4>Salaries Breakup</h4>
      <p>Full salary breakdown for the selected month across all three categories.</p>
      <div class="sc-source">Source: CF Salaries</div>
    </div>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>Month-level cashflow detail is critical for understanding exactly where cash came from and where it went. This view helps identify unusual payments, missing inflows, or timing mismatches at a granular level.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p><strong>Opening balance</strong> must equal last month's closing balance. <strong>Closing balance</strong> must match the actual combined bank balance (Axis + HSBC) as of that month end.</p>
    </div>
  </div>
</div>`
      },
      {
        title: "Sheet 3 — CF Trends",
        owner: "Rohit Arjun Raj",
        duration: "~15 min",
        content: `
<div class="step-body">
  <p class="step-intro">Sheet 3 shows multi-month cashflow trends — the most important view for management to assess liquidity and runway. It has <strong>2 sections</strong>.</p>
  <div class="section-grid">
    <div class="section-card" style="grid-column: span 2">
      <div class="sc-num">§ 1</div>
      <h4>Receipts vs Outflows</h4>
      <p>A bar chart comparing monthly cash inflows vs outflows across the selected period. Instantly highlights months where burn exceeds income.</p>
      <div class="sc-source">Source: CF Summary Sheet</div>
    </div>
    <div class="section-card" style="grid-column: span 2">
      <div class="sc-num">§ 2</div>
      <h4>Net Burn with Runway (Combo Chart)</h4>
      <p>The <strong>bar graph</strong> shows Net Burn per month; the <strong>line graph</strong> overlaid shows forecasted Runway in months.</p>
    </div>
  </div>
  <div class="formula-block">
    <div class="formula-label">Key Metrics — Sheet 3</div>
    <div class="formula-expr">Net Burn = Outflows − Inflows</div>
    <div class="formula-expr" style="margin-top:8px">Runway = Closing Cash Balance ÷ Average Monthly Net Burn</div>
  </div>
  <div class="chart-wrap" style="margin-top:16px">
    <canvas id="trendChart" height="120"></canvas>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>Trend data is what management and investors study most. Runway is the single most critical metric — it determines fundraising urgency, hiring decisions, and how aggressively TMC can invest in growth.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>Net Burn figures must match the opening-minus-closing difference in the Cashflow file. Runway must equal <strong>Closing Balance ÷ Average Monthly Net Burn</strong>. Verify both manually for the latest month.</p>
    </div>
  </div>
</div>`
      },
      {
        title: "Refresh, Test & Share",
        owner: "Rohit Arjun Raj → Mr. Varun",
        duration: "~20 min",
        content: `
<div class="step-body">
  <p class="step-intro">Before sharing, the dashboard must be fully refreshed and stress-tested across all three sheets.</p>
  <div class="process-list">
    <div class="process-item">
      <div class="pi-num">1</div>
      <div class="pi-content">
        <div class="pi-title">Refresh the Dashboard</div>
        <div class="pi-desc">Click the three-dot menu (top right) → <strong>Refresh Data</strong>. This updates all charts and tables with the latest figures.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">2</div>
      <div class="pi-content">
        <div class="pi-title">If Data is Not Updating</div>
        <div class="pi-desc">Reconnect each affected section (Setup → Data Source → Edit Connection → Reconnect), then refresh the browser tab.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">3</div>
      <div class="pi-content">
        <div class="pi-title">Stress Test All 3 Sheets</div>
        <div class="pi-desc">Check every section. Verify numbers match the source Google Sheet. Click interactive filters to confirm they work correctly.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">4</div>
      <div class="pi-content">
        <div class="pi-title">Share with Mr. Varun</div>
        <div class="pi-desc">Send the dashboard link to Mr. Varun. Done every time the cashflow is updated or a new forecast is being shared.</div>
      </div>
    </div>
  </div>
  <div class="info-box success">
    <i class="fa-solid fa-circle-check"></i>
    <p><strong>Version:</strong> V1.0 · <strong>Effective:</strong> 8th June 2026 · <strong>Frequency:</strong> Monthly + on every cashflow update</p>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>Sharing a stale or untested dashboard risks sending incorrect figures to management, which could directly influence wrong business decisions. A proper test catches stale data, broken connections, or filter errors before they reach the client.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>All 3 sheets load without errors. Interactive filters on Sheet 1 (Ledger Breakup) and Sheet 2 (Expense drill-down) respond correctly. <strong>Confirm Mr. Varun has received the link and confirmed access.</strong></p>
    </div>
  </div>
</div>`
      }
    ]
  },

  // ─────────────────────────────────────────
  // SOP 3 — CASHFLOW FORECAST
  // ─────────────────────────────────────────
  {
    id: 2,
    title: "Cashflow Forecast",
    color: "#10B981",
    steps: [
      {
        title: "Collect Bank Statements",
        owner: "Rohit Arjun Raj",
        duration: "~30 min",
        content: `
<div class="step-body">
  <p class="step-intro">TMC operates <strong>two bank accounts</strong>. Both statements must be collected before any sheet can be updated.</p>
  <div class="bank-grid">
    <div class="bank-card axis">
      <div class="bank-card-icon"><i class="fa-solid fa-university"></i></div>
      <h4>Axis Bank — Primary Account</h4>
      <p>All revenue is credited into this account.<br><br><strong>How to get:</strong> Request the bank statement from <strong>Ms. Brinda</strong> — she provides it with the password.</p>
    </div>
    <div class="bank-card hsbc">
      <div class="bank-card-icon"><i class="fa-solid fa-university"></i></div>
      <h4>HSBC — Expense Account</h4>
      <p>Majority of all expenses are paid from here.<br><br><strong>How to get:</strong> Zoho Books → Reports → Bank Transactions → Set custom date range → Export.</p>
    </div>
  </div>
  <div class="info-box warning">
    <i class="fa-solid fa-triangle-exclamation"></i>
    <p><strong>Foreign Currency:</strong> Bills may be in USD or EUR, but bank statements always show the INR equivalent. The original foreign currency amount is visible in the transaction description.</p>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>Bank statements are the ground truth for the cashflow model. Every actual transaction must reconcile against them. Without both statements, the final check row (model vs. bank) cannot be verified and the model remains unvalidated.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>You must have: (1) Axis Bank PDF from Ms. Brinda with the password, AND (2) HSBC export from Zoho Books. Both must cover the <strong>full calendar month</strong> being updated — no gaps in dates.</p>
    </div>
  </div>
</div>`
      },
      {
        title: "Update Payroll Sheet",
        owner: "Rohit Arjun Raj",
        duration: "~25 min",
        content: `
<div class="step-body">
  <p class="step-intro">The Payroll sheet covers all TMC employees across three salary categories. Data sourced from the <strong>TMC Payroll FY 26-27 Google Sheet</strong>.</p>
  <div class="two-col">
    <div class="cat-box cat-gold">
      <div class="cat-box-icon"><i class="fa-solid fa-chalkboard-user"></i></div>
      <h4>Operations</h4>
      <p>Teaching staff salaries</p>
    </div>
    <div class="cat-box cat-blue">
      <div class="cat-box-icon"><i class="fa-solid fa-briefcase"></i></div>
      <h4>G&amp;A</h4>
      <p>Management &amp; admin staff</p>
    </div>
    <div class="cat-box cat-purple">
      <div class="cat-box-icon"><i class="fa-solid fa-bullhorn"></i></div>
      <h4>S&amp;M</h4>
      <p>Sales &amp; marketing team</p>
    </div>
  </div>
  <div class="info-box warning">
    <i class="fa-solid fa-triangle-exclamation"></i>
    <p><strong>Critical — Salary Timing Rule:</strong> Salaries are paid in the same month <em>only if the last day of the month is a working day</em>. If month-end falls on a weekend or public holiday, salaries are paid on the <strong>first working day of the following month</strong>.<br><br>
    <strong>Example:</strong> May's salary was credited in June because the last working day of May fell on a Sunday.</p>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>Payroll is the single largest outflow every month. Getting the timing wrong due to a month-end holiday can misstate the closing balance by lakhs — directly causing the check row to fail and the model to appear incorrect.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>Total payroll must match the corresponding debit(s) in the <strong>Axis bank statement</strong>. Verify which month the salary was debited — confirm the correct-month vs. next-month rule was applied based on the last working day.</p>
    </div>
  </div>
</div>`
      },
      {
        title: "Consultant & Reimbursement Sheets",
        owner: "Rohit Arjun Raj",
        duration: "~40 min",
        content: `
<div class="step-body">
  <p class="step-intro">These two sheets capture all non-payroll personnel costs and employee expense reimbursements.</p>
  <div class="process-list">
    <div class="process-item">
      <div class="pi-num">1</div>
      <div class="pi-content">
        <div class="pi-title">Consultant Sheet — G&amp;A and S&amp;M Consultants</div>
        <div class="pi-desc">Covers all external consultants and legal fees. For legal fees, review the relevant contracts for the correct amounts and payment timing.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">2</div>
      <div class="pi-content">
        <div class="pi-title">Reimbursement Sheet — Categorize Invoices</div>
        <div class="pi-desc">Reimbursement totals come from the TMC Payroll Sheet. Open each attached invoice and categorize it: food, travel, internet, courier, printing, etc.</div>
      </div>
    </div>
  </div>
  <div class="info-box warning">
    <i class="fa-solid fa-triangle-exclamation"></i>
    <p><strong>Sahil (Special Rule):</strong> Sahil is paid <strong>₹10,000/month</strong> as consultant fees. Any <em>additional</em> amount credited to him is TDS — this must be entered in the Expense Breakup sheet separately, not here.</p>
  </div>
  <div class="info-box success">
    <i class="fa-solid fa-robot"></i>
    <p><strong>Claude Tip:</strong> For large invoice volumes, give Claude folder access along with the reimbursement sheet. Claude will categorize all invoices automatically. Always <strong>recheck the total</strong> against the reimbursement sheet amount.</p>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>Consultant and reimbursement costs are frequently missed or miscategorized. Even one skipped consultant invoice or a wrongly placed reimbursement will cause the final check row to be non-zero, requiring a full trace-back through all sheets.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>Total reimbursements must match the reimbursement total in the TMC Payroll Sheet. For Sahil: ₹10,000 in Consultant sheet only — TDS goes to Expense Breakup. Claude's categorization total must be verified against the payroll sheet figure.</p>
    </div>
  </div>
</div>`
      },
      {
        title: "Update Expense Breakup Sheet",
        owner: "Rohit Arjun Raj",
        duration: "~35 min",
        content: `
<div class="step-body">
  <p class="step-intro">All operating expenses are recorded and categorized here. Most figures come from bank statements and the Reimbursements sheet.</p>
  <div class="tag-list" style="margin-bottom:16px">
    <span class="tag-pill">Software</span>
    <span class="tag-pill">Courier</span>
    <span class="tag-pill">Telephone</span>
    <span class="tag-pill">Printing</span>
    <span class="tag-pill">Internet</span>
    <span class="tag-pill">Salary Arrears</span>
    <span class="tag-pill">Travel</span>
    <span class="tag-pill">Other G&amp;A</span>
    <span class="tag-pill">Deposit Lock</span>
    <span class="tag-pill">Marketing</span>
    <span class="tag-pill">Assets</span>
  </div>
  <div class="info-box warning">
    <i class="fa-solid fa-triangle-exclamation"></i>
    <p><strong>Expense Timing Rule:</strong> Current month expenses are <em>paid in the next month</em>. For example, May's expenses were recorded in June. This must be consistently applied for the cashflow to be accurate.</p>
  </div>
  <div class="process-list">
    <div class="process-item">
      <div class="pi-num">!</div>
      <div class="pi-content">
        <div class="pi-title">Rent — Variable Amount</div>
        <div class="pi-desc">Varies each month based on headcount at the co-working office. Confirm headcount before entering the rent figure.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">!</div>
      <div class="pi-content">
        <div class="pi-title">Ad Hoc Travel</div>
        <div class="pi-desc">Refers to <strong>Mr. Varun's business visits</strong>. Irregular — confirm with him or check reimbursement records.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">!</div>
      <div class="pi-content">
        <div class="pi-title">Marketing</div>
        <div class="pi-desc">A <strong>one-time annual expense</strong> — not monthly. Do not spread it across months unless explicitly agreed.</div>
      </div>
    </div>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>This sheet drives all OPEX lines in the main Cashflow. Uncategorized or missing expenses here cause the closing balance to not reconcile with the bank. Every expense must also be in the right month per the timing rule.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>Sum of all categories must equal total expense outflows in the bank statements (excluding salary and consultant payments). Spot-check: rent amount must match the co-working invoice. Marketing must appear only in the month it was paid.</p>
    </div>
  </div>
</div>`
      },
      {
        title: "B2B Revenue & Payments",
        owner: "Rohit Arjun Raj",
        duration: "~45 min",
        content: `
<div class="step-body">
  <p class="step-intro">B2B (Language Training) is TMC's primary revenue stream. The B2B sheet has <strong>Confirmed Revenue</strong>, <strong>Pipeline Revenue</strong>, and <strong>B2B Payments</strong>. Key contacts: <strong>Ms. Nikhitha Joshi &amp; Mr. Sidhant</strong>.</p>
  <div class="formula-block">
    <div class="formula-label">B2B Revenue — 50/50 Payment Model</div>
    <div class="formula-expr">= Batch Size × Fee per Student × 50% × FX Rate</div>
    <div class="formula-breakdown">
      <div class="fb-row"><span class="fb-key">Example</span><span class="fb-val"><code>=15 × 270 × 50% × 93</code></span></div>
      <div class="fb-row"><span class="fb-key">50%</span><span class="fb-val">First payment received when course starts — remaining 50% at course end</span></div>
      <div class="fb-row"><span class="fb-key">Timing</span><span class="fb-val">Payment received in the month <em>after</em> the start/end event, not the same month</span></div>
    </div>
  </div>
  <div class="info-box info">
    <i class="fa-solid fa-seedling"></i>
    <p><strong>Pipeline Revenue:</strong> Batches expected to start in coming months. Assume a <strong>60% conversion rate</strong> — i.e., 60% of pipeline batches will confirm and start.</p>
  </div>
  <div class="formula-block">
    <div class="formula-label">B2B Payments — Consultant Teachers (Monthly)</div>
    <div class="formula-expr">= Teaching Hours × Rate per Hour × 90%</div>
    <div class="formula-breakdown">
      <div class="fb-row"><span class="fb-key">90%</span><span class="fb-val">Net of 10% TDS deducted from consultant payments</span></div>
    </div>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>B2B is TMC's largest revenue stream. Wrong proration, missing batches, or an incorrect pipeline conversion rate will materially distort the cashflow forecast and runway — the two numbers management watches most closely.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>Each B2B receipt in the Axis bank statement must have a matching inflow entry. Confirm the batch list with Ms. Nikhitha and Mr. Sidhant. Verify pipeline uses exactly <strong>60% conversion rate</strong>.</p>
    </div>
  </div>
</div>`
      },
      {
        title: "RTD Revenue & Costs",
        owner: "Rohit Arjun Raj",
        duration: "~30 min",
        content: `
<div class="step-body">
  <p class="step-intro"><strong>RTD = Recruitment, Training &amp; Deployment.</strong> TMC's second revenue stream — placing candidates (e.g. nurses) with international clients. Key contact: <strong>Ms. Priyansha</strong>.</p>
  <div class="formula-block">
    <div class="formula-label">RTD Revenue Formula</div>
    <div class="formula-expr">= No. of Candidates × Fee per Candidate × 50%</div>
    <div class="formula-breakdown">
      <div class="fb-row"><span class="fb-key">Example</span><span class="fb-val"><code>=8 × 1,00,000 × 50%</code> = ₹4,00,000 first payment</span></div>
      <div class="fb-row"><span class="fb-key">50%</span><span class="fb-val">First payment when placement process starts; 50% at completion</span></div>
    </div>
  </div>
  <div class="info-box info">
    <i class="fa-solid fa-circle-dot"></i>
    <p>Like B2B, RTD has <strong>Confirmed</strong> and <strong>Pipeline</strong> sections. Same 50-50 model: 50% upfront, 50% on placement completion.</p>
  </div>
  <div class="info-box tip">
    <i class="fa-solid fa-file-invoice-dollar"></i>
    <p><strong>RTD Costs:</strong> Consultant charges for each RTD placement (sourcing companies, channel partners). Both confirmed and pipeline costs must be entered in the RTD Payments sheet.</p>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>RTD revenue is material — one missed placement of 8 candidates at ₹1L each equals <strong>₹8L of missed inflows</strong>. This directly impacts the runway calculation and could make TMC's cash position look worse than reality.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>Verify with Ms. Priyansha that all active placements are captured. Confirmed inflows must have corresponding bank credits. <strong>Pipeline numbers must be validated with Ms. Priyansha</strong> before finalizing — do not assume from last month.</p>
    </div>
  </div>
</div>`
      },
      {
        title: "Build the Cashflow Sheet",
        owner: "Rohit Arjun Raj",
        duration: "~40 min",
        content: `
<div class="step-body">
  <p class="step-intro">The main Cashflow sheet consolidates all prior sheets into a monthly cash position statement. A <strong>scenario toggle</strong> at the top-left switches between "With Pipeline" and "Without Pipeline" views.</p>
  <div class="cf-flow">
    <div class="cf-row cf-open">
      <i class="fa-solid fa-wallet"></i>
      <div><strong>Opening Balance</strong><span>= Closing balance of the previous month</span></div>
    </div>
    <div class="cf-row cf-in">
      <i class="fa-solid fa-arrow-down"></i>
      <div><strong>+ Receipts (Inflows)</strong><span>Investments + B2B Revenue + RTD Collections + Other Income</span></div>
    </div>
    <div class="cf-row cf-out">
      <i class="fa-solid fa-arrow-up"></i>
      <div><strong>− Payments (Outflows)</strong><span>B2B Costs · RTD Costs · Payroll · Software · G&A · Telecom · Courier · Consultants · Professional/Legal</span></div>
    </div>
    <div class="cf-row cf-calc">
      <i class="fa-solid fa-equals"></i>
      <div><strong>Closing Balance = Opening + Inflows − Outflows ± Adjustments</strong></div>
    </div>
    <div class="cf-row cf-burn">
      <i class="fa-solid fa-fire"></i>
      <div><strong>Gross Burn</strong><span>= Total Outflows for the month</span></div>
    </div>
    <div class="cf-row cf-burn">
      <i class="fa-solid fa-fire-flame-curved"></i>
      <div><strong>Net Burn</strong><span>= Opening Balance − Closing Balance</span></div>
    </div>
  </div>
  <div class="info-box tip">
    <i class="fa-solid fa-circle-info"></i>
    <p><strong>"Without Pipeline" scenario</strong> gives the most conservative and realistic view. Always review this scenario first when presenting to management.</p>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>This is the final consolidated view that management and investors see. Every error from upstream sheets surfaces here as a non-zero check row. Getting this right is the culmination of all prior steps — the output directly informs fundraising and spending decisions.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p>Toggle between "With Pipeline" and "Without Pipeline" — both must make logical sense. Gross Burn and Net Burn must be consistent with prior months unless there is a known, documented reason for variance.</p>
    </div>
  </div>
</div>`
      },
      {
        title: "Reconcile & Validate",
        owner: "Rohit Arjun Raj",
        duration: "~20 min",
        content: `
<div class="step-body">
  <p class="step-intro">The final step is reconciliation — ensuring the model's closing balance matches the actual bank balances to the rupee. <strong>The check row must always equal zero.</strong></p>
  <div class="info-box warning">
    <i class="fa-solid fa-triangle-exclamation"></i>
    <p><strong>The Golden Rule:</strong><br><code>Closing Balance (Model) − Total Bank Balance (Axis + HSBC) = 0</code><br><br>If the check row is not zero, there is a discrepancy somewhere. <strong>Do not share the cashflow until this is resolved.</strong></p>
  </div>
  <div class="process-list">
    <div class="process-item">
      <div class="pi-num">1</div>
      <div class="pi-content">
        <div class="pi-title">Verify Check Row = Zero</div>
        <div class="pi-desc">The "Check" row shows: Model Closing Balance − Total Bank Balance. This must be exactly zero. If not, trace the discrepancy sheet by sheet.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">2</div>
      <div class="pi-content">
        <div class="pi-title">Review Key Metrics</div>
        <div class="pi-desc"><strong>Gross Burn</strong> = Total Outflows. <strong>Net Burn</strong> = Opening − Closing. Review both for reasonableness vs prior months.</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">3</div>
      <div class="pi-content">
        <div class="pi-title">Update the Looker Dashboard</div>
        <div class="pi-desc">Once validated, update the CF Dash Looker Google Sheet and refresh the Looker Studio dashboard (refer to SOP 02 for the full process).</div>
      </div>
    </div>
    <div class="process-item">
      <div class="pi-num">4</div>
      <div class="pi-content">
        <div class="pi-title">Version Control</div>
        <div class="pi-desc">Save with the correct naming: <code>TMC_CashFlow_2026/06_V1.0.xlsx</code>. Log the update in version history.</div>
      </div>
    </div>
  </div>
  <div class="info-box success">
    <i class="fa-solid fa-circle-check"></i>
    <p><strong>Version:</strong> V1.0 · <strong>Effective:</strong> 8th June 2026 · <strong>Forecast Horizon:</strong> March 2027 · <strong>Frequency:</strong> Monthly + every cashflow update</p>
  </div>
  <div class="why-how-row">
    <div class="why-box">
      <div class="wh-label"><i class="fa-solid fa-lightbulb"></i> Why this step?</div>
      <p>Reconciliation is the final quality gate. A non-zero check row is proof something is wrong — a missing transaction, a timing error, or a data entry mistake. Sharing an unreconciled cashflow destroys credibility with the client.</p>
    </div>
    <div class="how-box">
      <div class="wh-label"><i class="fa-solid fa-circle-check"></i> How to confirm?</div>
      <p><strong>Check row = 0.</strong> Model Closing Balance = Axis Balance + HSBC Balance. If non-zero, trace discrepancy transaction by transaction across each bank statement line vs. the model — do not stop until the source is found.</p>
    </div>
  </div>
</div>`
      }
    ]
  }
];

// ══════════════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════════════
let currentSOP   = 0;
let currentStep  = 0;
let trendChartInstance = null;

// ══════════════════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════════════════
function showDashboard() {
  document.getElementById('dashboardView').style.display = '';
  document.getElementById('workflowView').style.display  = 'none';
  document.getElementById('headerDash').style.display    = '';
  document.getElementById('headerWorkflow').style.display= 'none';
  if (trendChartInstance) { trendChartInstance.destroy(); trendChartInstance = null; }
}

function showWorkflow(sopIdx) {
  currentSOP  = sopIdx;
  currentStep = 0;
  document.getElementById('dashboardView').style.display = 'none';
  document.getElementById('workflowView').style.display  = '';
  document.getElementById('headerDash').style.display    = 'none';
  document.getElementById('headerWorkflow').style.display= '';
  document.getElementById('wf-sop-title').textContent    = SOPS[sopIdx].title;
  buildSidebar();
  renderStep();
  window.scrollTo(0, 0);
}

function gotoStep(idx) {
  currentStep = idx;
  renderStep();
  const content = document.querySelector('.wf-content');
  if (content) content.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function prevStep() { if (currentStep > 0) gotoStep(currentStep - 1); }
function nextStep() { if (currentStep < SOPS[currentSOP].steps.length - 1) gotoStep(currentStep + 1); }

// ══════════════════════════════════════════════════
//  BUILD SIDEBAR
// ══════════════════════════════════════════════════
function buildSidebar() {
  const sop  = SOPS[currentSOP];
  const list = document.getElementById('stepList');
  list.innerHTML = '';
  sop.steps.forEach((step, i) => {
    const div = document.createElement('div');
    div.className = 'wf-step-item';
    div.id = `sidebar-step-${i}`;
    div.onclick = () => gotoStep(i);
    div.innerHTML = `
      <div class="step-num-circle">${i + 1}</div>
      <div class="step-item-text">
        <div class="step-item-title">${step.title}</div>
        <div class="step-item-owner">${step.owner}</div>
      </div>`;
    list.appendChild(div);
  });
}

// ══════════════════════════════════════════════════
//  RENDER STEP
// ══════════════════════════════════════════════════
function renderStep() {
  const sop   = SOPS[currentSOP];
  const step  = sop.steps[currentStep];
  const total = sop.steps.length;

  document.getElementById('progressFill').style.width = `${((currentStep + 1) / total) * 100}%`;
  document.getElementById('stepCounter').textContent  = `Step ${currentStep + 1} of ${total}`;

  const detail = document.getElementById('stepDetail');
  detail.innerHTML = `
    <div class="step-title-block">
      <div class="step-num-label">Step ${currentStep + 1} · ${sop.title}</div>
      <div class="step-main-title">${step.title}</div>
      <div class="step-meta">
        <div class="step-meta-item"><i class="fa-solid fa-user"></i> <strong>${step.owner}</strong></div>
        <div class="step-meta-item"><i class="fa-regular fa-clock"></i> <strong>${step.duration}</strong></div>
      </div>
    </div>
    ${step.content}`;

  document.querySelectorAll('.wf-step-item').forEach((el, i) => {
    el.classList.remove('active', 'done');
    if (i === currentStep) el.classList.add('active');
    if (i <  currentStep) el.classList.add('done');
    const circle = el.querySelector('.step-num-circle');
    if (i < currentStep) circle.innerHTML = '<i class="fa-solid fa-check" style="font-size:10px"></i>';
    else circle.textContent = i + 1;
  });

  const dotsEl = document.getElementById('stepDots');
  dotsEl.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const d = document.createElement('div');
    d.className = 'step-dot' + (i === currentStep ? ' active' : (i < currentStep ? ' done' : ''));
    d.onclick = () => gotoStep(i);
    d.style.cursor = 'pointer';
    dotsEl.appendChild(d);
  }

  document.getElementById('prevBtn').disabled = currentStep === 0;
  document.getElementById('nextBtn').disabled = currentStep === total - 1;
  document.getElementById('nextBtn').innerHTML = currentStep === total - 1
    ? '<i class="fa-solid fa-check"></i> Complete'
    : 'Next Step <i class="fa-solid fa-arrow-right"></i>';

  if (trendChartInstance) { trendChartInstance.destroy(); trendChartInstance = null; }

  setTimeout(() => {
    const canvas = document.getElementById('trendChart');
    if (canvas && !trendChartInstance) {
      trendChartInstance = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
          datasets: [
            {
              type: 'bar', label: 'Net Burn (₹L)',
              data: [18, 22, 15, 19, 17, 14, 21, 16, 13, 12],
              backgroundColor: 'rgba(239,68,68,0.45)', borderColor: '#ef4444',
              borderWidth: 1.5, borderRadius: 4, yAxisID: 'yB'
            },
            {
              type: 'line', label: 'Runway (months)',
              data: [14, 12, 14, 13, 14, 15, 13, 15, 17, 18],
              borderColor: '#D4A843', backgroundColor: 'rgba(212,168,67,0.1)',
              borderWidth: 2.5, pointBackgroundColor: '#D4A843',
              pointRadius: 4, fill: true, tension: 0.4, yAxisID: 'yR'
            }
          ]
        },
        options: {
          responsive: true,
          plugins: { legend: { labels: { color: '#94a3b8', font: { size: 12 } } } },
          scales: {
            x:  { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
            yB: { position: 'left',  grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#f87171', callback: v => '₹'+v+'L' } },
            yR: { position: 'right', grid: { drawOnChartArea: false }, ticks: { color: '#D4A843', callback: v => v+'mo' } }
          }
        }
      });
    }
  }, 50);
}

// ══════════════════════════════════════════════════
//  KEYBOARD NAVIGATION
// ══════════════════════════════════════════════════
document.addEventListener('keydown', e => {
  if (document.getElementById('workflowView').style.display === 'none') return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  nextStep();
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    prevStep();
  if (e.key === 'Escape') showDashboard();
});

console.log('TMC SOP Hub — SRF Capital Studio · v1.0');
