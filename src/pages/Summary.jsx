import { useMemo } from "react";
import { useSelector } from "react-redux";

const Summary = () => {
  const members = useSelector((state) => state.members.items);
  const loans = useSelector((state) => state.loans.items);
  const notices = useSelector((state) => state.notices.items);

  const summaryCards = useMemo(
    () => [
      {
        label: "Total Members",
        value: String(members.length),
        className: "stat-card-blue",
      },
      {
        label: "Active Loans",
        value: String(loans.length),
        className: "stat-card-cyan",
      },
      {
        label: "Pending Fees",
        value: `₹ ${members.filter((m) => m.fee === "Due").length * 1000}`,
        className: "stat-card-orange",
      },
      {
        label: "Active Notices",
        value: String(notices.length),
        className: "stat-card-green",
      },
    ],
    [members, loans, notices],
  );

  return (
    <div className="page-wrapper animate-fade-in">
      <h1 className="page-title">Summary & Analytics</h1>
      <div className="grid-4">
        {summaryCards.map((card) => (
          <div key={card.label} className={`stat-card ${card.className}`}>
            <p className="stat-label">{card.label}</p>
            <p className="stat-value">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: "1rem" }}>
        <div className="card-header">
          <h2 className="card-title">Operational Snapshot</h2>
          <p className="card-desc">
            High-level aggregation across members, loans, and notices.
          </p>
        </div>
        <div className="grid-2-lg" style={{ padding: "1rem" }}>
          <div className="card" style={{ padding: "1rem" }}>
            <p className="stat-label">Loan Approval Ratio</p>
            <p className="stat-value">
              {loans.length
                ? `${Math.round((loans.filter((l) => l.status === "APPROVED").length / loans.length) * 100)}%`
                : "0%"}
            </p>
          </div>
          <div className="card" style={{ padding: "1rem" }}>
            <p className="stat-label">KYC Completion</p>
            <p className="stat-value">
              {members.length
                ? `${Math.round((members.filter((m) => m.kyc === "Verified").length / members.length) * 100)}%`
                : "0%"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
