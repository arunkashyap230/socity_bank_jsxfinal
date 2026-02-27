export const membersSeed = [
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

export const loansSeed = [
  {
    id: "LN-2001",
    member: "MSR-0001 • Satyam Ray",
    principal: "250000",
    tenure: "24",
    status: "PENDING",
  },
  {
    id: "LN-2002",
    member: "MSR-0002 • Ananya Singh",
    principal: "100000",
    tenure: "12",
    status: "APPROVED",
  },
];

export const guarantorsSeed = [
  {
    id: "GUA-001",
    name: "Ritesh Kumar",
    memberId: "MSR-0001",
    phone: "+919800000101",
    relation: "Brother",
    status: "Active",
  },
  {
    id: "GUA-002",
    name: "Nisha Sharma",
    memberId: "MSR-0002",
    phone: "+919800000102",
    relation: "Spouse",
    status: "Pending",
  },
  {
    id: "GUA-003",
    name: "Deepak Joshi",
    memberId: "MSR-0003",
    phone: "+919800000103",
    relation: "Friend",
    status: "Active",
  },
];

export const noticesSeed = [
  {
    id: "N-101",
    title: "Monthly Fee Reminder",
    date: "2026-02-10",
    status: "Published",
  },
  {
    id: "N-102",
    title: "Loan Camp Announcement",
    date: "2026-02-18",
    status: "Draft",
  },
];

export const reportsSeed = [
  {
    id: "R-001",
    type: "Daily",
    date: "2026-02-25",
    amount: "₹ 25,000",
    description: "Fee collection",
    status: "Posted",
  },
  {
    id: "R-002",
    type: "Weekly",
    date: "2026-02-23",
    amount: "₹ 1,25,000",
    description: "Loan repayments",
    status: "Posted",
  },
];
