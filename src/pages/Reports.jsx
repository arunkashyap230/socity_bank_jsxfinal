import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReport } from "../store/slices/reportsSlice";

const reportTabs = [
  { key: "financial", label: "FINANCIAL REPORTS" },
  { key: "loan-outstanding", label: "LOAN OUTSTANDING REPORTS" },
  { key: "profit-loss", label: "PROFIT & LOSS REPORTS" },
  { key: "member-dividend", label: "MEMBER DIVIDEND REPORTS" },
];

const Reports = () => {
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.reports.items);
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

  const financialReports = useMemo(
    () =>
      reports.filter((item) =>
        ["Daily", "Weekly", "Monthly"].includes(item.type),
      ),
    [reports],
  );

  const onAddReport = () => {
    if (!reportForm.date || !reportForm.amount || !reportForm.description)
      return;
    dispatch(
      addReport({
        id: `R-${String(reports.length + 1).padStart(3, "0")}`,
        type: reportForm.type,
        date: reportForm.date,
        amount: `₹ ${Number(reportForm.amount).toLocaleString("en-IN")}`,
        description: reportForm.description,
        status: "Posted",
      }),
    );
    setReportForm({ type: "Daily", date: "", amount: "", description: "" });
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <h1 className="page-title">Reports</h1>

      <button className="btn btn-primary reports-download-btn" type="button">
        DOWNLOAD ALL REPORTS PDF
      </button>

      <div className="tabs-list reports-tabs-list">
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

      {activeTab === "financial" ? (
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

            <button
              className="btn btn-outline btn-sm"
              type="button"
              onClick={onAddReport}
            >
              ADD REPORT
            </button>
          </div>

          <div className="reports-actions">
            <button className="btn btn-outline btn-sm" type="button">
              DOWNLOAD PDF
            </button>
            <button
              className="btn btn-outline btn-sm"
              type="button"
              onClick={() => window.print()}
            >
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
                {financialReports.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="reports-empty-row">
                      No financial reports added yet
                    </td>
                  </tr>
                ) : (
                  financialReports.map((item) => (
                    <tr key={item.id}>
                      <td className="td-primary">{item.id}</td>
                      <td>{item.type}</td>
                      <td>{item.date}</td>
                      <td>{item.amount}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card placeholder-box">
          {reportTabs.find((tab) => tab.key === activeTab)?.label} module coming
          soon
        </div>
      )}
    </div>
  );
};

export default Reports;
