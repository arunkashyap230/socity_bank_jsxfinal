import { useMemo, useState } from "react";
import { Search, Pencil } from "lucide-react";

const accountsData = [
  {
    accountId: "ACC-10001",
    memberId: "MSR-0001",
    memberName: "Satyam Ray",
    mobile: "+919810000001",
    accountType: "SAVINGS",
    balance: "₹12,500.50",
    interestRate: "4%",
    status: "active",
  },
  {
    accountId: "ACC-10002",
    memberId: "MSR-0002",
    memberName: "Ananya Singh",
    mobile: "+919810000002",
    accountType: "FD",
    balance: "₹50,000",
    interestRate: "6.5%",
    status: "active",
  },
  {
    accountId: "ACC-10003",
    memberId: "MSR-0003",
    memberName: "Rohit Sharma",
    mobile: "+919810000003",
    accountType: "RD",
    balance: "₹15,000",
    interestRate: "5.5%",
    status: "active",
  },
  {
    accountId: "ACC-10004",
    memberId: "MSR-0004",
    memberName: "Priya Nair",
    mobile: "+919810000004",
    accountType: "CURRENT",
    balance: "₹75,000.75",
    interestRate: "3%",
    status: "active",
  },
  {
    accountId: "ACC-10005",
    memberId: "MSR-0005",
    memberName: "Vikram Patel",
    mobile: "+919810000005",
    accountType: "SAVINGS",
    balance: "₹25,000",
    interestRate: "4%",
    status: "active",
  },
  {
    accountId: "ACC-10006",
    memberId: "MSR-0006",
    memberName: "Sneha Verma",
    mobile: "+919810000006",
    accountType: "FD",
    balance: "₹80,000",
    interestRate: "6.25%",
    status: "inactive",
  },
];

const recentTransactions = [
  {
    date: "4/5/2025",
    desc: "Business account opening",
    amount: "+₹75,000.75",
    type: "CREDIT",
  },
  {
    date: "3/10/2025",
    desc: "Recurring deposit installment",
    amount: "+₹5,000",
    type: "CREDIT",
  },
  {
    date: "2/20/2025",
    desc: "Fixed deposit",
    amount: "+₹50,000",
    type: "CREDIT",
  },
  {
    date: "1/15/2025",
    desc: "Initial deposit",
    amount: "+₹10,000",
    type: "CREDIT",
  },
];

const typeClass = {
  SAVINGS: "account-type-savings",
  FD: "account-type-fd",
  RD: "account-type-rd",
  CURRENT: "account-type-current",
};

const Accounts = () => {
  const [activeTab, setActiveTab] = useState("accounts");
  const [search, setSearch] = useState("");
  const [accountTypeFilter, setAccountTypeFilter] = useState("All");
  const [txForm, setTxForm] = useState({
    accountId: "",
    txType: "Credit",
    amount: "",
    description: "",
  });
  const [newAccountStep, setNewAccountStep] = useState(1);
  const [newAccountMember, setNewAccountMember] = useState("");

  const filteredAccounts = useMemo(
    () =>
      accountsData.filter((item) => {
        const q = search.toLowerCase();
        const matchesSearch =
          item.accountId.toLowerCase().includes(q) ||
          item.memberId.toLowerCase().includes(q) ||
          item.memberName.toLowerCase().includes(q);
        const matchesType =
          accountTypeFilter === "All" || item.accountType === accountTypeFilter;
        return matchesSearch && matchesType;
      }),
    [search, accountTypeFilter],
  );

  const updateTxField = (field, value) => {
    setTxForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <h1 className="page-title">Accounts</h1>

      <div className="tabs-list">
        {[
          { key: "accounts", label: "ACCOUNTS" },
          { key: "transactions", label: "TRANSACTIONS" },
          { key: "new-account", label: "ADD NEW ACCOUNT" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`tabs-trigger ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "accounts" && (
        <div className="card accounts-card">
          <div className="accounts-filters-row">
            <div className="search-wrapper">
              <Search />
              <input
                className="input"
                placeholder="Search Accounts"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: "2.25rem" }}
              />
            </div>

            <div className="accounts-filter-group">
              <span className="filter-label">Account Type</span>
              <select
                className="input"
                value={accountTypeFilter}
                onChange={(e) => setAccountTypeFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="SAVINGS">SAVINGS</option>
                <option value="FD">FD</option>
                <option value="RD">RD</option>
                <option value="CURRENT">CURRENT</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto accounts-table-wrap">
            <table className="data-table">
              <thead>
                <tr className="table-header-row">
                  <th>Account ID</th>
                  <th>Member ID</th>
                  <th>Member Name</th>
                  <th>Mobile</th>
                  <th>Account Type</th>
                  <th>Balance</th>
                  <th>Interest Rate</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((item) => (
                  <tr key={item.accountId}>
                    <td className="td-primary">{item.accountId}</td>
                    <td className="td-default">{item.memberId}</td>
                    <td className="td-default">{item.memberName}</td>
                    <td className="td-muted">{item.mobile}</td>
                    <td>
                      <span
                        className={`account-type-chip ${typeClass[item.accountType]}`}
                      >
                        {item.accountType}
                      </span>
                    </td>
                    <td className="td-default">{item.balance}</td>
                    <td className="td-muted">{item.interestRate}</td>
                    <td>
                      <span
                        className={`status-chip ${item.status === "active" ? "status-active" : "status-failed"}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="action-btn"
                        aria-label={`Edit ${item.accountId}`}
                      >
                        <Pencil style={{ width: 16, height: 16 }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "transactions" && (
        <div className="card transactions-card">
          <h3 className="transactions-title">Transaction Management</h3>

          <div className="transactions-layout">
            <div className="transactions-form">
              <h4>New Transaction</h4>

              <select
                className="input"
                value={txForm.accountId}
                onChange={(e) => updateTxField("accountId", e.target.value)}
              >
                <option value="">Select Account</option>
                {accountsData.map((item) => (
                  <option key={item.accountId} value={item.accountId}>
                    {item.accountId} • {item.memberName}
                  </option>
                ))}
              </select>

              <div className="tx-type-group">
                <p>Transaction Type</p>
                <div className="tx-type-options">
                  <label>
                    <input
                      type="radio"
                      name="txType"
                      checked={txForm.txType === "Credit"}
                      onChange={() => updateTxField("txType", "Credit")}
                    />
                    Credit
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="txType"
                      checked={txForm.txType === "Debit"}
                      onChange={() => updateTxField("txType", "Debit")}
                    />
                    Debit
                  </label>
                </div>
              </div>

              <input
                className="input"
                placeholder="Amount (₹)"
                value={txForm.amount}
                onChange={(e) => updateTxField("amount", e.target.value)}
              />

              <textarea
                className="textarea"
                placeholder="Description"
                value={txForm.description}
                onChange={(e) => updateTxField("description", e.target.value)}
              />

              <button className="btn btn-primary" disabled>
                PROCESS TRANSACTION
              </button>
            </div>

            <div className="transactions-list">
              <h4>Recent Transactions</h4>
              {recentTransactions.map((tx) => (
                <div key={`${tx.date}-${tx.desc}`} className="tx-list-item">
                  <div>
                    <p className="tx-date">{tx.date}</p>
                    <p className="tx-desc">{tx.desc}</p>
                  </div>
                  <div className="tx-right">
                    <p className="tx-amount">{tx.amount}</p>
                    <span className="status-chip status-active">{tx.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "new-account" && (
        <div className="card add-account-card">
          <h3 className="add-account-title">+ Create New Account</h3>

          <div className="add-account-stepper">
            {[
              { step: 1, label: "Select Member" },
              { step: 2, label: "Account Details" },
              { step: 3, label: "Confirmation" },
            ].map((item) => (
              <div key={item.step} className="add-account-step-item">
                <span
                  className={`add-account-step-badge ${newAccountStep >= item.step ? "active" : ""}`}
                >
                  {item.step}
                </span>
                <span
                  className={`add-account-step-label ${newAccountStep === item.step ? "active" : ""}`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="add-account-panel">
            <h4>Step 1: Select Member</h4>
            <select
              className="input"
              value={newAccountMember}
              onChange={(e) => setNewAccountMember(e.target.value)}
            >
              <option value="">Select Member</option>
              {accountsData.map((item) => (
                <option key={item.memberId} value={item.memberId}>
                  {item.memberName} ({item.memberId})
                </option>
              ))}
            </select>

            <div className="add-account-actions">
              <button
                className="btn btn-primary btn-sm"
                disabled={!newAccountMember}
                onClick={() => setNewAccountStep(2)}
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Accounts;
