import { useState } from "react";
import { Search, UserPlus } from "lucide-react";

const membersData = [
  {
    id: "MSR-0001",
    name: "Satyam Ray",
    email: "satyam.ray@example.com",
    phone: "+919810000001",
    city: "Bangalore, Karnataka",
    kyc: "Verified",
    fee: "Due",
    status: "active",
    joinDate: "9/16/2025",
  },
  {
    id: "MSR-0002",
    name: "Ananya Singh",
    email: "ananya.singh@example.com",
    phone: "+919810000002",
    city: "Delhi, Delhi",
    kyc: "Verified",
    fee: "Paid",
    status: "active",
    joinDate: "8/10/2025",
  },
  {
    id: "MSR-0003",
    name: "Rohit Sharma",
    email: "rohit.sharma@example.com",
    phone: "+919810000003",
    city: "Mumbai, Maharashtra",
    kyc: "Pending",
    fee: "Due",
    status: "active",
    joinDate: "7/22/2025",
  },
  {
    id: "MSR-0004",
    name: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "+919810000004",
    city: "Chennai, Tamil Nadu",
    kyc: "Verified",
    fee: "Paid",
    status: "active",
    joinDate: "6/15/2025",
  },
  {
    id: "MSR-0005",
    name: "Vikram Patel",
    email: "vikram.patel@example.com",
    phone: "+919810000005",
    city: "Ahmedabad, Gujarat",
    kyc: "Verified",
    fee: "Paid",
    status: "active",
    joinDate: "5/20/2025",
  },
  {
    id: "MSR-0006",
    name: "Sneha Verma",
    email: "sneha.verma@example.com",
    phone: "+919810000006",
    city: "Pune, Maharashtra",
    kyc: "Pending",
    fee: "Due",
    status: "inactive",
    joinDate: "4/10/2025",
  },
];

const summaryCards = [
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
];

const dueFeeMembers = [
  { id: "MSR-0001", name: "Satyam Ray", amount: 1000, dueDate: "12/31/2025" },
  { id: "MSR-0003", name: "Rohit Sharma", amount: 1000, dueDate: "12/14/2025" },
  { id: "MSR-0004", name: "Priya Nair", amount: 1000, dueDate: "12/03/2025" },
  { id: "MSR-0006", name: "Sneha Verma", amount: 1200, dueDate: "11/30/2025" },
  { id: "MSR-0007", name: "Deepak Kumar", amount: 1000, dueDate: "11/28/2025" },
  { id: "MSR-0008", name: "Aarti Gupta", amount: 1000, dueDate: "11/25/2025" },
];

const profileMembers = [
  {
    id: "MSR-0001",
    name: "Satyam Ray",
    status: "active",
    email: "satyam.ray@example.com",
    mobile: "+919810000001",
    address: "12 MG Road, Bangalore, Karnataka - 560001",
    aadhar: "1234-5678-9012",
    pan: "ABCDE1234F",
    kyc: "KYC Verified",
  },
  {
    id: "MSR-0002",
    name: "Ananya Singh",
    status: "active",
    email: "ananya.singh@example.com",
    mobile: "+919810000002",
    address: "45 Civil Lines, Delhi - 110054",
    aadhar: "2345-6789-0123",
    pan: "FGHIJ5678K",
    kyc: "KYC Pending",
  },
  {
    id: "MSR-0003",
    name: "Rohit Sharma",
    status: "active",
    email: "rohit.sharma@example.com",
    mobile: "+919810000003",
    address: "18 Link Road, Mumbai, Maharashtra - 400050",
    aadhar: "3456-7890-1234",
    pan: "KLMNO9012P",
    kyc: "KYC Verified",
  },
  {
    id: "MSR-0004",
    name: "Priya Nair",
    status: "active",
    email: "priya.nair@example.com",
    mobile: "+919810000004",
    address: "9 Anna Salai, Chennai, Tamil Nadu - 600002",
    aadhar: "4567-8901-2345",
    pan: "PQRST3456U",
    kyc: "KYC Verified",
  },
  {
    id: "MSR-0005",
    name: "Vikram Patel",
    status: "active",
    email: "vikram.patel@example.com",
    mobile: "+919810000005",
    address: "22 Ashram Road, Ahmedabad, Gujarat - 380009",
    aadhar: "5678-9012-3456",
    pan: "UVWXY7890Z",
    kyc: "KYC Pending",
  },
  {
    id: "MSR-0006",
    name: "Sneha Verma",
    status: "inactive",
    email: "sneha.verma@example.com",
    mobile: "+919810000006",
    address: "34 FC Road, Pune, Maharashtra - 411004",
    aadhar: "6789-0123-4567",
    pan: "LMNOP1234Q",
    kyc: "KYC Verified",
  },
];

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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all-members");
  const [registrationStep, setRegistrationStep] = useState(1);
  const [registrationForm, setRegistrationForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
  });
  const [selectedMemberId, setSelectedMemberId] = useState(
    profileMembers[0].id,
  );

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

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Members Management</h1>
          <p className="page-subtitle">
            Manage society members, KYC verification, and membership fees
          </p>
        </div>
        <button className="btn btn-primary" style={{ gap: 8 }}>
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
        <div className="card">
          <div className="filters-row">
            <div className="search-wrapper">
              <Search />
              <input
                className="input"
                placeholder="Search by name, email, or member ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: "2.25rem" }}
              />
            </div>
            <div className="filter-group">
              <span className="filter-label">Status</span>
              <select
                className="input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ width: "auto" }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
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
                  <th>Member Status</th>
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
        //   <div className="card placeholder-box">Member Registration form coming soon</div>
        // )}
        // {activeTab === "fee" && (
        //   <div className="card placeholder-box">Fee Collection module coming soon</div>
        // )}
        // {activeTab === "profile" && (
        //   <div className="card placeholder-box">Profile Management coming soon</div>
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

          <div className="registration-actions">
            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                setRegistrationStep((prev) => (prev < 4 ? prev + 1 : prev))
              }
            >
              NEXT
            </button>
          </div>
        </div>
      )}

      {activeTab === "fee" && (
        <>
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
        </>
      )}

      {activeTab === "profile" && (
        // <div className="card placeholder-box">
        //   Profile Management coming soon
        // </div>
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
                  className={`profile-kyc-chip ${selectedMember.kyc === "KYC Verified" ? "verified" : "pending"}`}
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
