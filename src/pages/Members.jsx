import { useState } from "react";
import { Search, UserPlus } from "lucide-react";

const membersData = [
  { id: "MSR-0001", name: "Satyam Ray", email: "satyam.ray@example.com", phone: "+919810000001", city: "Bangalore, Karnataka", kyc: "Verified", fee: "Due", status: "active", joinDate: "9/16/2025" },
  { id: "MSR-0002", name: "Ananya Singh", email: "ananya.singh@example.com", phone: "+919810000002", city: "Delhi, Delhi", kyc: "Verified", fee: "Paid", status: "active", joinDate: "8/10/2025" },
  { id: "MSR-0003", name: "Rohit Sharma", email: "rohit.sharma@example.com", phone: "+919810000003", city: "Mumbai, Maharashtra", kyc: "Pending", fee: "Due", status: "active", joinDate: "7/22/2025" },
  { id: "MSR-0004", name: "Priya Nair", email: "priya.nair@example.com", phone: "+919810000004", city: "Chennai, Tamil Nadu", kyc: "Verified", fee: "Paid", status: "active", joinDate: "6/15/2025" },
  { id: "MSR-0005", name: "Vikram Patel", email: "vikram.patel@example.com", phone: "+919810000005", city: "Ahmedabad, Gujarat", kyc: "Verified", fee: "Paid", status: "active", joinDate: "5/20/2025" },
  { id: "MSR-0006", name: "Sneha Verma", email: "sneha.verma@example.com", phone: "+919810000006", city: "Pune, Maharashtra", kyc: "Pending", fee: "Due", status: "inactive", joinDate: "4/10/2025" },
];

const summaryCards = [
  { label: "Total Members", value: membersData.length, className: "stat-card-blue", icon: "👥" },
  { label: "KYC Verified", value: membersData.filter(m => m.kyc === "Verified").length, className: "stat-card-cyan", icon: "✅" },
  { label: "Fee Paid", value: membersData.filter(m => m.fee === "Paid").length, className: "stat-card-green", icon: "💳" },
  { label: "Active Members", value: membersData.filter(m => m.status === "active").length, className: "stat-card-orange", icon: "👤" },
];

const kycClass = { Verified: "status-verified", Pending: "status-pending" };
const feeClass = { Paid: "status-paid", Due: "status-due" };
const statusClass = { active: "status-active", inactive: "status-failed" };

const Members = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all-members");

  const filtered = membersData.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Members Management</h1>
          <p className="page-subtitle">Manage society members, KYC verification, and membership fees</p>
        </div>
        <button className="btn btn-primary" style={{ gap: 8 }}>
          <UserPlus style={{ width: 16, height: 16 }} /> Add Member
        </button>
      </div>

      <div className="grid-4">
        {summaryCards.map((c) => (
          <div key={c.label} className={`stat-card ${c.className} stat-card-flex`}>
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
            {tab === "all-members" ? "ALL MEMBERS" : tab === "registration" ? "MEMBER REGISTRATION" : tab === "fee" ? "FEE COLLECTION" : "PROFILE MANAGEMENT"}
          </button>
        ))}
      </div>

      {activeTab === "all-members" && (
        <div className="card">
          <div className="filters-row">
            <div className="search-wrapper">
              <Search />
              <input className="input" placeholder="Search by name, email, or member ID" value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: '2.25rem' }} />
            </div>
            <div className="filter-group">
              <span className="filter-label">Status</span>
              <select className="input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ width: 'auto' }}>
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
                          {m.name.split(" ").map(n => n[0]).join("")}
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
                    <td><span className={`status-chip ${kycClass[m.kyc]}`}>{m.kyc}</span></td>
                    <td><span className={`status-chip ${feeClass[m.fee]}`}>{m.fee}</span></td>
                    <td><span className={`status-chip ${statusClass[m.status]}`}>{m.status}</span></td>
                    <td className="td-muted">{m.joinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "registration" && (
        <div className="card placeholder-box">Member Registration form coming soon</div>
      )}
      {activeTab === "fee" && (
        <div className="card placeholder-box">Fee Collection module coming soon</div>
      )}
      {activeTab === "profile" && (
        <div className="card placeholder-box">Profile Management coming soon</div>
      )}
    </div>
  );
};

export default Members;
