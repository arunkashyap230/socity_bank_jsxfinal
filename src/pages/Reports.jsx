import { useState } from "react";

const reportTabs = [
  { key: "financial", label: "FINANCIAL REPORTS" },
  { key: "loan-outstanding", label: "LOAN OUTSTANDING REPORTS" },
  { key: "profit-loss", label: "PROFIT & LOSS REPORTS" },
  { key: "member-dividend", label: "MEMBER DIVIDEND REPORTS" },
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState("financial");
  const [reportForm, setReportForm] = useState({
    type: "Daily",
    date: "",
    amount: "",
    description: "",
  });

  const updateField = (field, value) => {
    setReportForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <h1 className="page-title">Reports</h1>

      <div>
        <button className="btn btn-primary reports-download-btn">
          DOWNLOAD ALL REPORTS PDF
        </button>
      </div>

      <div className="tabs-list">
        {reportTabs.map((tab) => (
          <button
            key={tab.key}
            className={`tabs-trigger ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "financial" && (
        <div className="card reports-card">
          <div className="reports-form-wrap">
            <h3>Add Daily Report</h3>
            <div className="reports-form-grid">
              <div className="form-group">
                <label>Report Type</label>
                <select
                  className="input"
                  value={reportForm.type}
                  onChange={(e) => updateField("type", e.target.value)}
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  className="input"
                  value={reportForm.date}
                  onChange={(e) => updateField("date", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  className="input"
                  placeholder="Amount"
                  value={reportForm.amount}
                  onChange={(e) => updateField("amount", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  className="input"
                  placeholder="Description"
                  value={reportForm.description}
                  onChange={(e) => updateField("description", e.target.value)}
                />
              </div>
            </div>

            <button className="btn btn-outline btn-sm" disabled>
              ADD REPORT
            </button>
          </div>

          <div className="reports-actions">
            <button className="btn btn-outline btn-sm" disabled>
              DOWNLOAD PDF
            </button>
            <button className="btn btn-outline btn-sm" disabled>
              PRINT
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr className="table-header-row">
                  <th>ID</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="reports-empty-row">
                    No financial reports added yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab !== "financial" && (
        <div className="card placeholder-box">
          {reportTabs.find((t) => t.key === activeTab)?.label} module coming
          soon
        </div>
      )}
    </div>
  );
};

export default Reports;
