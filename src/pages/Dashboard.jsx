import { Users, Wallet, IndianRupee, ArrowLeftRight, TrendingUp, MoreVertical } from "lucide-react";

const stats = [
  { label: "Total Members", value: "1,248", sub: "+12% from last month", trend: "12.3%", className: "stat-card-blue", icon: Users },
  { label: "Active Loans", value: "342", sub: "₹ 8.2M total disbursed", trend: "67%", className: "stat-card-cyan", icon: Wallet },
  { label: "Total Savings", value: "₹ 12.4M", sub: "Average ₹ 9,935 per member", trend: "8.4%", className: "stat-card-green", icon: IndianRupee },
  { label: "Transactions", value: "7,821", sub: "Successful in last 30 days", trend: "15.2%", className: "stat-card-orange", icon: ArrowLeftRight },
];

const recentTransactions = [
  { id: "TX001", date: "2025-09-20", member: "Ravi Kumar", type: "Deposit", amount: "₹ 25,000", status: "Completed" },
  { id: "TX002", date: "2025-09-19", member: "Sita Menon", type: "Withdrawal", amount: "₹ 5,000", status: "Pending" },
  { id: "TX003", date: "2025-09-18", member: "Ajay Patel", type: "Loan Payment", amount: "₹ 12,500", status: "Completed" },
  { id: "TX004", date: "2025-09-17", member: "Meera Sharma", type: "Transfer", amount: "₹ 3,200", status: "Failed" },
  { id: "TX005", date: "2025-09-16", member: "Vikram Lal", type: "Deposit", amount: "₹ 8,500", status: "Completed" },
];

const statusClass = { Completed: "status-completed", Pending: "status-pending", Failed: "status-failed" };

const Dashboard = () => {
  return (
    <div className="page-wrapper animate-fade-in">
      <h1 className="page-title">Welcome back, Admin</h1>

      <div className="grid-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`stat-card ${s.className}`}>
              <div className="stat-header">
                <div>
                  <p className="stat-label">{s.label}</p>
                  <p className="stat-value">{s.value}</p>
                  <p className="stat-sub">{s.sub}</p>
                </div>
                <Icon style={{ width: 32, height: 32 }} className="stat-icon" />
              </div>
              <div className="stat-trend">
                <TrendingUp style={{ width: 12, height: 12 }} />
                <span>{s.trend}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Recent Transactions</h2>
          <p className="card-desc">Latest 5 transactions from your society</p>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr className="table-header-row">
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Member</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="td-primary">{tx.id}</td>
                  <td className="td-muted">{tx.date}</td>
                  <td className="td-default">{tx.member}</td>
                  <td><span className="type-badge">{tx.type}</span></td>
                  <td className="td-default" style={{ fontWeight: 500 }}>{tx.amount}</td>
                  <td><span className={`status-chip ${statusClass[tx.status]}`}>{tx.status}</span></td>
                  <td>
                    <button className="action-btn">
                      <MoreVertical style={{ width: 16, height: 16, color: 'hsl(var(--muted-foreground))' }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="view-all-link">
          <a href="/transactions">View All Transactions →</a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
