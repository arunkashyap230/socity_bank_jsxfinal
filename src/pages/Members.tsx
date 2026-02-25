import { useState } from "react";
import { Search, UserPlus, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const kycClass: Record<string, string> = { Verified: "status-verified", Pending: "status-pending" };
const feeClass: Record<string, string> = { Paid: "status-paid", Due: "status-due" };
const statusClass: Record<string, string> = { active: "status-active", inactive: "status-failed" };

const Members = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = membersData.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Members Management</h1>
          <p className="text-sm text-muted-foreground">Manage society members, KYC verification, and membership fees</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="w-4 h-4" /> Add Member
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryCards.map((c) => (
          <div key={c.label} className={`stat-card ${c.className} flex items-center gap-4`}>
            <span className="text-3xl">{c.icon}</span>
            <div>
              <p className="text-3xl font-bold">{c.value}</p>
              <p className="text-xs opacity-80">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="all-members">
        <TabsList>
          <TabsTrigger value="all-members">ALL MEMBERS</TabsTrigger>
          <TabsTrigger value="registration">MEMBER REGISTRATION</TabsTrigger>
          <TabsTrigger value="fee">FEE COLLECTION</TabsTrigger>
          <TabsTrigger value="profile">PROFILE MANAGEMENT</TabsTrigger>
        </TabsList>

        <TabsContent value="all-members" className="mt-4">
          <div className="bg-card rounded-xl shadow-sm border border-border">
            {/* Filters */}
            <div className="p-4 flex items-center gap-4 border-b border-border">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by name, email, or member ID" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-input rounded-md px-3 py-2 text-sm bg-card"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header-row">
                    <th className="text-left px-6 py-3 text-sm font-semibold">Member ID</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold">Member Details</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold">Contact</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold">KYC Status</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold">Fee Status</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold">Member Status</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold">Join Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m) => (
                    <tr key={m.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-primary">{m.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                            {m.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{m.name}</p>
                            <p className="text-xs text-muted-foreground">{m.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-foreground">{m.phone}</p>
                        <p className="text-xs text-muted-foreground">{m.city}</p>
                      </td>
                      <td className="px-6 py-4"><span className={`status-chip ${kycClass[m.kyc]}`}>{m.kyc}</span></td>
                      <td className="px-6 py-4"><span className={`status-chip ${feeClass[m.fee]}`}>{m.fee}</span></td>
                      <td className="px-6 py-4"><span className={`status-chip ${statusClass[m.status]}`}>{m.status}</span></td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{m.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="registration" className="mt-4">
          <div className="bg-card rounded-xl shadow-sm border border-border p-8 text-center text-muted-foreground">
            Member Registration form coming soon
          </div>
        </TabsContent>
        <TabsContent value="fee" className="mt-4">
          <div className="bg-card rounded-xl shadow-sm border border-border p-8 text-center text-muted-foreground">
            Fee Collection module coming soon
          </div>
        </TabsContent>
        <TabsContent value="profile" className="mt-4">
          <div className="bg-card rounded-xl shadow-sm border border-border p-8 text-center text-muted-foreground">
            Profile Management coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Members;
