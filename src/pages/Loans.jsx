import { useMemo, useState } from "react";

const loanApplications = [];

const loanStatuses = ["ALL", "PENDING", "APPROVED", "REJECTED"];

const Loans = () => {
  const [activeStatus, setActiveStatus] = useState("ALL");

  const filteredLoans = useMemo(() => {
    if (activeStatus === "ALL") return loanApplications;
    return loanApplications.filter(
      (loan) => loan.status?.toUpperCase() === activeStatus,
    );
  }, [activeStatus]);

  return (
    <div className="page-wrapper animate-fade-in">
      <h1 className="page-title">Loan Approval Workflow</h1>

      <div className="card loan-workflow-card">
        <div
          className="loan-status-tabs"
          role="tablist"
          aria-label="Loan status filters"
        >
          {loanStatuses.map((status) => (
            <button
              key={status}
              className={`loan-status-tab ${activeStatus === status ? "active" : ""}`}
              onClick={() => setActiveStatus(status)}
              role="tab"
              aria-selected={activeStatus === status}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="data-table loan-workflow-table">
            <thead>
              <tr className="table-header-row">
                <th>Loan ID</th>
                <th>Member</th>
                <th>Loan</th>
                <th>Principal</th>
                <th>Interest (%)</th>
                <th>Tenure</th>
                <th>EMI</th>
                <th>Total Payable</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.length === 0 ? (
                <tr>
                  <td colSpan={10} className="loan-empty-row">
                    No loan applications found
                  </td>
                </tr>
              ) : (
                filteredLoans.map((loan) => (
                  <tr key={loan.loanId}>
                    <td className="td-primary">{loan.loanId}</td>
                    <td className="td-default">{loan.member}</td>
                    <td className="td-default">{loan.loanType}</td>
                    <td className="td-default">{loan.principal}</td>
                    <td className="td-muted">{loan.interest}</td>
                    <td className="td-muted">{loan.tenure}</td>
                    <td className="td-default">{loan.emi}</td>
                    <td className="td-default">{loan.totalPayable}</td>
                    <td>
                      <span className="status-chip status-pending">
                        {loan.status}
                      </span>
                    </td>
                    <td className="td-muted">-</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Loans;
