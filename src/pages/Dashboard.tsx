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

const statusClass: Record<string, string> = {
  Completed: "status-completed",
  Pending: "status-pending",
  Failed: "status-failed",
};

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Welcome back, Admin</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`stat-card ${s.className}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm opacity-80">{s.label}</p>
                  <p className="text-3xl font-bold mt-1">{s.value}</p>
                  <p className="text-xs opacity-70 mt-1">{s.sub}</p>
                </div>
                <Icon className="w-8 h-8 opacity-40" />
              </div>
              <div className="flex items-center gap-1 mt-3 text-xs">
                <TrendingUp className="w-3 h-3" />
                <span>{s.trend}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Transactions */}
      <div className="bg-card rounded-xl shadow-sm border border-border">
        <div className="p-6 pb-4">
          <h2 className="text-xl font-bold text-foreground">Recent Transactions</h2>
          <p className="text-sm text-muted-foreground">Latest 5 transactions from your society</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header-row">
                <th className="text-left px-6 py-3 text-sm font-semibold">Transaction ID</th>
                <th className="text-left px-6 py-3 text-sm font-semibold">Date</th>
                <th className="text-left px-6 py-3 text-sm font-semibold">Member</th>
                <th className="text-left px-6 py-3 text-sm font-semibold">Type</th>
                <th className="text-left px-6 py-3 text-sm font-semibold">Amount</th>
                <th className="text-left px-6 py-3 text-sm font-semibold">Status</th>
                <th className="text-left px-6 py-3 text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-primary">{tx.id}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{tx.date}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{tx.member}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-md border border-border text-xs text-foreground">
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{tx.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`status-chip ${statusClass[tx.status]}`}>{tx.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 hover:bg-muted rounded">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 text-center">
          <a href="/transactions" className="text-sm text-primary font-medium hover:underline">
            View All Transactions →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
