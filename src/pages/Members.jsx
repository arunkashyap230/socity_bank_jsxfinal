import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, UserPlus } from "lucide-react";
import { addMember } from "../store/slices/membersSlice";

const registrationSteps = [
  "Basic Information",
  "Address Details",
  "KYC Documents",
  "Review & Submit",
];

const kycClass = { Verified: "status-verified", Pending: "status-pending" };
const feeClass = { Paid: "status-paid", Due: "status-due" };
const statusClass = { active: "status-active", inactive: "status-failed" };

const Members = () => {
  const dispatch = useDispatch();
  const membersData = useSelector((state) => state.members.items);

  const summaryCards = useMemo(
    () => [
      {
        label: "Total Members",
        value: membersData.length,
        className: "stat-card-blue",
        icon: "👥",
      },
      {
        label: "KYC Verified",
        value: membersData.filter((m) => m.kyc === "Verified").length,
        className: "stat-card-cyan",
        icon: "✅",
      },
      {
        label: "Fee Paid",
        value: membersData.filter((m) => m.fee === "Paid").length,
        className: "stat-card-green",
        icon: "💳",
      },
      {
        label: "Active Members",
        value: membersData.filter((m) => m.status === "active").length,
        className: "stat-card-orange",
        icon: "👤",
      },
    ],
    [membersData],
  );

  const dueFeeMembers = useMemo(
    () =>
      membersData
        .filter((member) => member.fee === "Due")
        .map((member, index) => ({
          id: member.id,
          name: member.name,
          amount: 1000,
          dueDate: `12/${String(28 - index).padStart(2, "0")}/2026`,
        })),
    [membersData],
  );

  const profileMembers = useMemo(
    () =>
      membersData.map((member) => ({
        id: member.id,
        name: member.name,
        status: member.status,
        email: member.email,
        mobile: member.phone,
        address: member.city,
        aadhar: member.aadhar || "Not added",
        pan: member.pan || "Not added",
        kyc: member.kyc === "Verified" ? "KYC Verified" : "KYC Pending",
      })),
    [membersData],
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all-members");
  const [registrationStep, setRegistrationStep] = useState(1);
  const [selectedMemberId, setSelectedMemberId] = useState(
    membersData[0]?.id || "",
  );
  const [registrationForm, setRegistrationForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    aadhar: "",
    pan: "",
  });

  const filtered = membersData.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.id.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const selectedMember =
    profileMembers.find((member) => member.id === selectedMemberId) ||
    profileMembers[0];

  const updateField = (field, value) => {
    setRegistrationForm((prev) => ({ ...prev, [field]: value }));
  };

  const goNextStep = () => {
    setRegistrationStep((prev) =>
      prev < registrationSteps.length ? prev + 1 : prev,
    );
  };

  const resetRegistration = () => {
    setRegistrationStep(1);
    setRegistrationForm({
      fullName: "",
      email: "",
      mobile: "",
      dob: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
      aadhar: "",
      pan: "",
    });
  };

  const handleAddMember = () => {
    if (
      !registrationForm.fullName ||
      !registrationForm.email ||
      !registrationForm.mobile
    ) {
      return;
    }

    const nextSerial = membersData.length + 1;
    const nextId = `MSR-${String(nextSerial).padStart(4, "0")}`;
    const cityValue = [registrationForm.city, registrationForm.state]
      .filter(Boolean)
      .join(", ");

    dispatch(
      addMember({
        id: nextId,
        name: registrationForm.fullName,
        email: registrationForm.email,
        phone: registrationForm.mobile,
        city: cityValue || "N/A",
        kyc:
          registrationForm.aadhar && registrationForm.pan
            ? "Verified"
            : "Pending",
        fee: "Due",
        status: "active",
        joinDate: new Date().toLocaleDateString("en-US"),
        aadhar: registrationForm.aadhar,
        pan: registrationForm.pan,
      }),
    );

    resetRegistration();
    setActiveTab("all-members");
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Members Management</h1>
          <p className="page-subtitle">
            Manage society members, KYC verification, and membership fees
          </p>
        </div>
        <button
          className="btn btn-primary"
          style={{ gap: 8 }}
          onClick={() => setActiveTab("registration")}
        >
          <UserPlus style={{ width: 16, height: 16 }} /> Add Member
        </button>
      </div>

      <div className="grid-4">
        {summaryCards.map((c) => (
          <div
            key={c.label}
            className={`stat-card ${c.className} stat-card-flex`}
          >
            <span className="stat-emoji">{c.icon}</span>
            <div>
              <p className="stat-value">{c.value}</p>
              <p className="stat-label">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="tabs-list">
        {["all-members", "registration", "fee", "profile"].map((tab) => (
          <button
            key={tab}
            className={`tabs-trigger ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "all-members"
              ? "ALL MEMBERS"
              : tab === "registration"
                ? "MEMBER REGISTRATION"
                : tab === "fee"
                  ? "FEE COLLECTION"
                  : "PROFILE MANAGEMENT"}
          </button>
        ))}
      </div>

      {activeTab === "all-members" && (
        <div className="card members-card">
          <div className="members-toolbar">
            <div className="search-input">
              <Search style={{ width: 16, height: 16 }} />
              <input
                className="input"
                placeholder="Search by name, ID, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr className="table-header-row">
                  <th>Member ID</th>
                  <th>Member Details</th>
                  <th>Contact</th>
                  <th>KYC Status</th>
                  <th>Fee Status</th>
                  <th>Account Status</th>
                  <th>Join Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m.id}>
                    <td className="td-primary">{m.id}</td>
                    <td>
                      <div className="member-detail-row">
                        <div className="member-avatar">
                          {m.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="member-name">{m.name}</p>
                          <p className="member-email">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="td-default">{m.phone}</p>
                      <p className="member-email">{m.city}</p>
                    </td>
                    <td>
                      <span className={`status-chip ${kycClass[m.kyc]}`}>
                        {m.kyc}
                      </span>
                    </td>
                    <td>
                      <span className={`status-chip ${feeClass[m.fee]}`}>
                        {m.fee}
                      </span>
                    </td>
                    <td>
                      <span className={`status-chip ${statusClass[m.status]}`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="td-muted">{m.joinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "registration" && (
        <div className="card registration-card">
          <div className="registration-stepper">
            {registrationSteps.map((stepLabel, idx) => {
              const stepNumber = idx + 1;
              const active = registrationStep === stepNumber;
              const completed = registrationStep > stepNumber;
              return (
                <div key={stepLabel} className="step-item">
                  <span
                    className={`step-badge ${active ? "active" : ""} ${completed ? "completed" : ""}`}
                  >
                    {stepNumber}
                  </span>
                  <span className={`step-text ${active ? "active" : ""}`}>
                    {stepLabel}
                  </span>
                </div>
              );
            })}
          </div>

          {registrationStep === 1 && (
            <div className="registration-form-grid">
              <div className="form-group">
                <label htmlFor="memberFullName">Full Name *</label>
                <input
                  id="memberFullName"
                  className="input"
                  placeholder="Enter full name"
                  value={registrationForm.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="memberEmail">Email *</label>
                <input
                  id="memberEmail"
                  type="email"
                  className="input"
                  placeholder="Enter email"
                  value={registrationForm.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="memberMobile">Mobile *</label>
                <input
                  id="memberMobile"
                  className="input"
                  placeholder="Enter mobile number"
                  value={registrationForm.mobile}
                  onChange={(e) => updateField("mobile", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="memberDob">Date of Birth</label>
                <input
                  id="memberDob"
                  type="date"
                  className="input"
                  value={registrationForm.dob}
                  onChange={(e) => updateField("dob", e.target.value)}
                />
              </div>
            </div>
          )}

          {registrationStep === 2 && (
            <div className="registration-form-grid">
              <div className="form-group">
                <label htmlFor="addressLine">Address Line *</label>
                <input
                  id="addressLine"
                  className="input"
                  placeholder="House no, street"
                  value={registrationForm.addressLine}
                  onChange={(e) => updateField("addressLine", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  id="city"
                  className="input"
                  placeholder="City"
                  value={registrationForm.city}
                  onChange={(e) => updateField("city", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <input
                  id="state"
                  className="input"
                  placeholder="State"
                  value={registrationForm.state}
                  onChange={(e) => updateField("state", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  id="pincode"
                  className="input"
                  placeholder="Pincode"
                  value={registrationForm.pincode}
                  onChange={(e) => updateField("pincode", e.target.value)}
                />
              </div>
            </div>
          )}

          {registrationStep === 3 && (
            <div className="registration-form-grid">
              <div className="form-group">
                <label htmlFor="aadhar">Aadhar Number *</label>
                <input
                  id="aadhar"
                  className="input"
                  placeholder="1234-5678-9012"
                  value={registrationForm.aadhar}
                  onChange={(e) => updateField("aadhar", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pan">PAN Number *</label>
                <input
                  id="pan"
                  className="input"
                  placeholder="ABCDE1234F"
                  value={registrationForm.pan}
                  onChange={(e) => updateField("pan", e.target.value)}
                />
              </div>
            </div>
          )}

          {registrationStep === 4 && (
            <div className="card" style={{ padding: "1rem" }}>
              <h3 className="card-title" style={{ marginBottom: "0.75rem" }}>
                Review Member Details
              </h3>
              <p>
                <strong>Name:</strong> {registrationForm.fullName || "-"}
              </p>
              <p>
                <strong>Email:</strong> {registrationForm.email || "-"}
              </p>
              <p>
                <strong>Mobile:</strong> {registrationForm.mobile || "-"}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {[
                  registrationForm.addressLine,
                  registrationForm.city,
                  registrationForm.state,
                ]
                  .filter(Boolean)
                  .join(", ") || "-"}
              </p>
              <p>
                <strong>Aadhar:</strong> {registrationForm.aadhar || "-"}
              </p>
              <p>
                <strong>PAN:</strong> {registrationForm.pan || "-"}
              </p>
            </div>
          )}

          <div className="registration-actions">
            {registrationStep < 4 ? (
              <button className="btn btn-primary btn-sm" onClick={goNextStep}>
                NEXT
              </button>
            ) : (
              <button
                className="btn btn-primary btn-sm"
                onClick={handleAddMember}
              >
                ADD MEMBER
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === "fee" && (
        <div className="card fee-collection-card">
          <div className="fee-collection-header">
            <h3>Pending Fee Collection ({dueFeeMembers.length} members)</h3>
          </div>

          <div className="fee-collection-list">
            {dueFeeMembers.map((member) => (
              <div key={member.id} className="fee-row">
                <div className="fee-member">
                  <p className="fee-member-name">{member.name}</p>
                  <p className="fee-member-id">{member.id}</p>
                </div>

                <div className="fee-amount-block">
                  <p className="fee-amount">Due Amount: ₹{member.amount}</p>
                  <p className="fee-date">Due: {member.dueDate}</p>
                </div>

                <div className="fee-status">Payment Due</div>

                <button className="btn btn-primary btn-sm fee-action-btn">
                  COLLECT FEE
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "profile" && selectedMember && (
        <div className="card profile-management-card">
          <div className="profile-management-layout">
            <div className="profile-member-list">
              <h3>Select Member</h3>
              <div className="profile-member-items">
                {profileMembers.map((member) => (
                  <button
                    key={member.id}
                    className={`profile-member-item ${selectedMember.id === member.id ? "active" : ""}`}
                    onClick={() => setSelectedMemberId(member.id)}
                  >
                    <p className="profile-member-item-name">{member.name}</p>
                    <p className="profile-member-item-meta">
                      {member.id} • {member.status}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="profile-member-detail">
              <h3>Manage {selectedMember.name}</h3>

              <div className="profile-detail-group">
                <h4>Contact Information</h4>
                <p>
                  <strong>Email:</strong> {selectedMember.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {selectedMember.mobile}
                </p>
              </div>

              <div className="profile-detail-group">
                <h4>Address</h4>
                <p>{selectedMember.address}</p>
              </div>

              <div className="profile-detail-group">
                <h4>KYC Information</h4>
                <p>
                  <strong>Aadhar:</strong> {selectedMember.aadhar}
                </p>
                <p>
                  <strong>PAN:</strong> {selectedMember.pan}
                </p>
                <span
                  className={`profile-kyc-chip ${
                    selectedMember.kyc === "KYC Verified"
                      ? "verified"
                      : "pending"
                  }`}
                >
                  {selectedMember.kyc}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
