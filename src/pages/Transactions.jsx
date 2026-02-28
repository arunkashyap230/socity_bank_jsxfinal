import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

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

const historySeed = [
  {
    txnId: "TX-1001",
    memberId: "MSR-0001",
    accountId: "SAV-10001",
    memberName: "Satyam Ray",
    type: "Deposit",
    mode: "Cash",
    amount: "₹ 25,000",
    narration: "Monthly saving",
    createdAt: "2026-02-24",
  },
  {
    txnId: "TX-1002",
    memberId: "MSR-0002",
    accountId: "SAV-10011",
    memberName: "Ananya Singh",
    type: "Transfer",
    mode: "UPI",
    amount: "₹ 12,000",
    narration: "Fund transfer",
    createdAt: "2026-02-23",
  },
];

const Transactions = () => {
  const members = useSelector((state) => state.members.items);
  const [activeTab, setActiveTab] = useState("deposit");
  const [selectedMember, setSelectedMember] = useState("");
  const [withdrawForm, setWithdrawForm] = useState({
    amount: "",
    narration: "",
  });
  const [transferForm, setTransferForm] = useState({
    fromAccount: "",
    transferTo: "",
    mode: "UPI",
    amount: "",
    narration: "",
  });

  const historyRows = useMemo(() => {
    if (!selectedMember) return historySeed;
    return historySeed.filter((row) => row.memberId === selectedMember);
  }, [selectedMember]);

  const updateWithdrawField = (field, value) => {
    setWithdrawForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetWithdrawForm = () => {
    setWithdrawForm({ amount: "", narration: "" });
  };

  useEffect(() => {
    if (!selectedMember) {
      setWithdrawForm({ amount: "", narration: "" });
    }
  }, [selectedMember]);

  const updateTransferField = (field, value) => {
    setTransferForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <h1 className="page-title">Transaction Management</h1>

      <div className="transaction-member-filter">
        <label>Select Member</label>
        <select
          className="input"
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
        >
          <option value="">All Members</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.id} • {member.name}
            </option>
          ))}
        </select>
      </div>

      <div className="tabs-list transaction-tabs">
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
                <label>Selected Member</label>
                <input
                  className="input"
                  value={selectedMember || "All Members"}
                  readOnly
                />
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
        <div className="card withdrawal-card">
          <p className="withdrawal-subtitle">
            Please select a member to perform transactions
          </p>

          <div className="withdrawal-form">
            <div className="form-group">
              <label>Amount *</label>
              <input
                className="input"
                type="number"
                placeholder="Amount *"
                value={withdrawForm.amount}
                onChange={(e) => updateWithdrawField("amount", e.target.value)}
                disabled={!selectedMember}
              />
            </div>

            <div className="form-group">
              <label>Narration</label>
              <input
                className="input"
                placeholder="Narration"
                value={withdrawForm.narration}
                onChange={(e) =>
                  updateWithdrawField("narration", e.target.value)
                }
                disabled={!selectedMember}
              />
            </div>

            <div className="withdrawal-actions">
              <button
                className="btn btn-primary"
                disabled={!selectedMember || !withdrawForm.amount}
              >
                WITHDRAW
              </button>
              <button
                className="btn btn-outline"
                onClick={resetWithdrawForm}
                type="button"
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      )}

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

      {activeTab === "history" && (
        <div className="card transaction-history-card">
          <p className="transaction-history-subtitle">
            Please select a member to perform transactions
          </p>
          <h3 className="transaction-history-title">Transaction History</h3>
          <div className="overflow-x-auto">
            <table className="data-table transaction-history-table">
              <thead>
                <tr className="table-header-row">
                  <th>Txn ID</th>
                  <th>Member ID</th>
                  <th>Account ID</th>
                  <th>Member Name</th>
                  <th>Type</th>
                  <th>Mode</th>
                  <th>Amount</th>
                  <th>Narration</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {historyRows.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="reports-empty-row">
                      No history found
                    </td>
                  </tr>
                ) : (
                  historyRows.map((row) => (
                    <tr key={row.txnId}>
                      <td className="td-primary">{row.txnId}</td>
                      <td>{row.memberId}</td>
                      <td>{row.accountId}</td>
                      <td>{row.memberName}</td>
                      <td>{row.type}</td>
                      <td>{row.mode}</td>
                      <td>{row.amount}</td>
                      <td>{row.narration}</td>
                      <td>{row.createdAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
