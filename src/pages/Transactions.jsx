import { useState } from "react";

const transactions = [
  {
    date: "4/5/2025",
    desc: "Business account opening",
    amount: "+₹75000.75",
    type: "CREDIT",
  },
  {
    date: "3/10/2025",
    desc: "Recurring deposit installment",
    amount: "+₹5000",
    type: "CREDIT",
  },
  {
    date: "2/20/2025",
    desc: "Fixed deposit",
    amount: "+₹50000",
    type: "CREDIT",
  },
  {
    date: "1/15/2025",
    desc: "Initial deposit",
    amount: "+₹10000",
    type: "CREDIT",
  },
];

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("deposit");
  const [transferForm, setTransferForm] = useState({
    fromAccount: "",
    transferTo: "",
    mode: "UPI",
    amount: "",
    narration: "",
  });

  const updateTransferField = (field, value) => {
    setTransferForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <h1 className="page-title">Transaction Management</h1>

      <div className="tabs-list">
        {["deposit", "withdrawal", "transfer", "history"].map((tab) => (
          <button
            key={tab}
            className={`tabs-trigger ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "deposit"
              ? "CASH DEPOSIT"
              : tab === "withdrawal"
                ? "WITHDRAWAL"
                : tab === "transfer"
                  ? "FUND TRANSFER"
                  : "HISTORY"}
          </button>
        ))}
      </div>

      {activeTab === "deposit" && (
        <div className="grid-2-lg">
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3
              className="card-title"
              style={{ fontSize: "1.125rem", marginBottom: "1rem" }}
            >
              New Transaction
            </h3>
            <div className="form-section">
              <div className="form-group">
                <label>Select Member</label>
                <select className="input">
                  <option>Select Member</option>
                </select>
              </div>
              <div className="form-group">
                <label>Account</label>
                <input className="input" placeholder="Account -" />
              </div>
              <div className="form-group">
                <label>Amount (₹)</label>
                <input className="input" placeholder="Amount *" type="number" />
              </div>
              <div className="form-group">
                <label>Narration</label>
                <input className="input" placeholder="Narration" />
              </div>
              <div className="form-actions">
                <button className="btn btn-primary">DEPOSIT</button>
                <button className="btn btn-outline">RESET</button>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: "1.5rem" }}>
            <h3
              className="card-title"
              style={{ fontSize: "1.125rem", marginBottom: "1rem" }}
            >
              Recent Transactions
            </h3>
            <div className="gap-stack">
              {transactions.map((tx, i) => (
                <div key={i} className="tx-item">
                  <div className="tx-item-left">
                    <p>{tx.date}</p>
                    <p>{tx.desc}</p>
                  </div>
                  <div className="tx-item-right">
                    <p>{tx.amount}</p>
                    <span className="status-chip status-completed">
                      {tx.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "withdrawal" && (
        <div className="card placeholder-box">
          Withdrawal module coming soon
        </div>
      )}
      {/* {activeTab === "transfer" && <div className="card placeholder-box">Fund Transfer module coming soon</div>}
      {activeTab === "history" && <div className="card placeholder-box">Transaction History coming soon</div>} */}
      {activeTab === "transfer" && (
        <div className="card fund-transfer-card">
          <p className="fund-transfer-subtitle">
            Please select a member to perform transactions
          </p>

          <div className="fund-transfer-form">
            <div className="form-group">
              <label>From Account -</label>
              <select
                className="input"
                value={transferForm.fromAccount}
                onChange={(e) =>
                  updateTransferField("fromAccount", e.target.value)
                }
              >
                <option value="">Select From Account</option>
                <option value="SAV-10001">SAV-10001</option>
                <option value="CUR-10004">CUR-10004</option>
              </select>
            </div>

            <div className="form-group">
              <label>Transfer To *</label>
              <select
                className="input"
                value={transferForm.transferTo}
                onChange={(e) =>
                  updateTransferField("transferTo", e.target.value)
                }
              >
                <option value="">Select beneficiary account</option>
                <option value="MSR-0002">Ananya Singh (MSR-0002)</option>
                <option value="MSR-0003">Rohit Sharma (MSR-0003)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Mode</label>
              <select
                className="input"
                value={transferForm.mode}
                onChange={(e) => updateTransferField("mode", e.target.value)}
              >
                <option>UPI</option>
                <option>NEFT</option>
                <option>IMPS</option>
              </select>
            </div>

            <div className="form-group">
              <label>Amount *</label>
              <input
                className="input"
                type="number"
                placeholder="Enter transfer amount"
                value={transferForm.amount}
                onChange={(e) => updateTransferField("amount", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Narration</label>
              <input
                className="input"
                placeholder="Narration"
                value={transferForm.narration}
                onChange={(e) =>
                  updateTransferField("narration", e.target.value)
                }
              />
            </div>

            <div className="fund-transfer-actions">
              <button className="btn btn-primary">TRANSFER</button>
              <button className="btn btn-outline">RESET</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
