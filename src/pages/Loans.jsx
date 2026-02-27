import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLoan } from "../store/slices/loansSlice";
import { useLocation, useNavigate } from "react-router-dom";

const loanStatuses = ["ALL", "PENDING", "APPROVED", "REJECTED"];

const stepRouteMap = {
  "/loans/member": 1,
  "/loans/details": 2,
  "/loans/guarantor": 3,
  "/loans/bank": 4,
  "/loans/confirm": 5,
};

const stepLabels = [
  "Select Member",
  "Loan Details",
  "Guarantor",
  "Bank Information",
  "Confirmation",
];

const Loans = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const loanApplications = useSelector((state) => state.loans.items);
  const membersData = useSelector((state) => state.members.items);

  const isLoanForm = pathname === "/loans/apply";
  const isLoanStatus = pathname === "/loans";

  const initialStep = stepRouteMap[pathname] || 1;
  const [step, setStep] = useState(initialStep);
  const [activeStatus, setActiveStatus] = useState("ALL");

  const [form, setForm] = useState({
    memberId: "",
    loanItem: "",
    principal: "",
    interest: "",
    tenure: "",
    loanType: "Personal",
    guarantorId: "",
    bankName: "",
    accountNo: "",
  });

  const filteredLoans = useMemo(() => {
    if (activeStatus === "ALL") return loanApplications;
    return loanApplications.filter((loan) => loan.status === activeStatus);
  }, [activeStatus, loanApplications]);

  const memberOptions = useMemo(
    () =>
      membersData.map((member) => ({
        value: member.id,
        label: `${member.id} • ${member.name}`,
      })),
    [membersData],
  );

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => (prev < 5 ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const submitLoanApplication = () => {
    if (
      !form.memberId ||
      !form.loanItem ||
      !form.principal ||
      !form.interest ||
      !form.tenure
    ) {
      return;
    }

    const nextId = `LN-${String(2000 + loanApplications.length + 1)}`;
    const selectedMember = membersData.find(
      (member) => member.id === form.memberId,
    );
    const memberName = selectedMember?.name || form.memberId;

    dispatch(
      addLoan({
        id: nextId,
        member: `${form.memberId} • ${memberName}`,
        principal: form.principal,
        tenure: form.tenure,
        status: "PENDING",
      }),
    );

    setForm((prev) => ({
      ...prev,
      memberId: "",
      loanItem: "",
      principal: "",
      interest: "",
      tenure: "",
    }));

    navigate("/loans");
  };

  if (isLoanForm) {
    return (
      <div className="page-wrapper animate-fade-in loan-form-page">
        <div className="card loan-application-card">
          <h2 className="loan-form-title">Loan Application Form</h2>
          <div className="loan-application-fields">
            <select
              className="input"
              value={form.memberId}
              onChange={(e) => updateField("memberId", e.target.value)}
            >
              <option value="">Select Member</option>
              {memberOptions.map((member) => (
                <option key={member.value} value={member.value}>
                  {member.label}
                </option>
              ))}
            </select>

            <select
              className="input"
              value={form.loanItem}
              onChange={(e) => updateField("loanItem", e.target.value)}
            >
              <option value="">Loan Item</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Business Loan">Business Loan</option>
              <option value="Emergency Loan">Emergency Loan</option>
            </select>

            <input
              className="input"
              placeholder="Principal Amount *"
              type="number"
              value={form.principal}
              onChange={(e) => updateField("principal", e.target.value)}
            />
            <input
              className="input"
              placeholder="Interest (%) *"
              type="number"
              value={form.interest}
              onChange={(e) => updateField("interest", e.target.value)}
            />
            <input
              className="input"
              placeholder="Tenure (Months) *"
              type="number"
              value={form.tenure}
              onChange={(e) => updateField("tenure", e.target.value)}
            />

            <button
              className="btn btn-primary loan-application-submit"
              type="button"
              onClick={submitLoanApplication}
            >
              SUBMIT APPLICATION
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoanStatus) {
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
                  <th>Principal</th>
                  <th>Tenure</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="loan-empty-row">
                      No loan applications found
                    </td>
                  </tr>
                ) : (
                  filteredLoans.map((loan) => (
                    <tr key={loan.id}>
                      <td className="td-primary">{loan.id}</td>
                      <td>{loan.member}</td>
                      <td>₹ {loan.principal}</td>
                      <td>{loan.tenure} months</td>
                      <td>
                        <span className="status-chip status-pending">
                          {loan.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper animate-fade-in">
      <h1 className="page-title">Loan Management Workflow</h1>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <div
          className="registration-stepper"
          style={{ padding: "0.75rem 1rem" }}
        >
          {stepLabels.map((label, idx) => {
            const stepNo = idx + 1;
            const active = stepNo === step;
            const completed = stepNo < step;
            return (
              <div key={label} className="step-item">
                <span
                  className={`step-badge ${active ? "active" : ""} ${completed ? "completed" : ""}`}
                >
                  {stepNo}
                </span>
                <span className={`step-text ${active ? "active" : ""}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ padding: "1rem" }}>
          {step === 1 && (
            <div className="form-group">
              <label>Select Member</label>
              <select
                className="input"
                value={form.memberId}
                onChange={(e) => updateField("memberId", e.target.value)}
              >
                <option value="">Choose Member</option>
                {memberOptions.map((member) => (
                  <option key={member.value} value={member.value}>
                    {member.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {step === 2 && (
            <div className="registration-form-grid">
              <div className="form-group">
                <label>Loan Type</label>
                <select
                  className="input"
                  value={form.loanType}
                  onChange={(e) => updateField("loanType", e.target.value)}
                >
                  <option>Personal</option>
                  <option>Business</option>
                  <option>Emergency</option>
                </select>
              </div>
              <div className="form-group">
                <label>Principal Amount</label>
                <input
                  className="input"
                  type="number"
                  value={form.principal}
                  onChange={(e) => updateField("principal", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Tenure (months)</label>
                <input
                  className="input"
                  type="number"
                  value={form.tenure}
                  onChange={(e) => updateField("tenure", e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-group">
              <label>Select Guarantor</label>
              <select
                className="input"
                value={form.guarantorId}
                onChange={(e) => updateField("guarantorId", e.target.value)}
              >
                <option value="">Choose Guarantor</option>
                <option value="GUA-001">GUA-001 • Ritesh Kumar</option>
                <option value="GUA-002">GUA-002 • Nisha Sharma</option>
              </select>
            </div>
          )}

          {step === 4 && (
            <div className="registration-form-grid">
              <div className="form-group">
                <label>Bank Name</label>
                <input
                  className="input"
                  value={form.bankName}
                  onChange={(e) => updateField("bankName", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Account Number</label>
                <input
                  className="input"
                  value={form.accountNo}
                  onChange={(e) => updateField("accountNo", e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="card" style={{ padding: "1rem" }}>
              <p>
                <strong>Member:</strong> {form.memberId || "-"}
              </p>
              <p>
                <strong>Loan Type:</strong> {form.loanType}
              </p>
              <p>
                <strong>Principal:</strong> ₹{form.principal || "0"}
              </p>
              <p>
                <strong>Tenure:</strong> {form.tenure} months
              </p>
              <p>
                <strong>Guarantor:</strong> {form.guarantorId || "-"}
              </p>
              <p>
                <strong>Bank:</strong> {form.bankName || "-"}
              </p>
            </div>
          )}

          <div className="form-actions" style={{ marginTop: "1rem" }}>
            <button
              className="btn btn-outline"
              onClick={prevStep}
              type="button"
            >
              Previous
            </button>
            {step < 5 ? (
              <button
                className="btn btn-primary"
                onClick={nextStep}
                type="button"
              >
                Next
              </button>
            ) : (
              <button className="btn btn-primary" type="button">
                Submit Loan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loans;
