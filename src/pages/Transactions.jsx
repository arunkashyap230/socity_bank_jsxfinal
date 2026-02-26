import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const transactions = [
  { date: "4/5/2025", desc: "Business account opening", amount: "+₹75000.75", type: "CREDIT" },
  { date: "3/10/2025", desc: "Recurring deposit installment", amount: "+₹5000", type: "CREDIT" },
  { date: "2/20/2025", desc: "Fixed deposit", amount: "+₹50000", type: "CREDIT" },
  { date: "1/15/2025", desc: "Initial deposit", amount: "+₹10000", type: "CREDIT" },
];

const Transactions = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Transaction Management</h1>

      <Tabs defaultValue="deposit">
        <TabsList>
          <TabsTrigger value="deposit">CASH DEPOSIT</TabsTrigger>
          <TabsTrigger value="withdrawal">WITHDRAWAL</TabsTrigger>
          <TabsTrigger value="transfer">FUND TRANSFER</TabsTrigger>
          <TabsTrigger value="history">HISTORY</TabsTrigger>
        </TabsList>

        <TabsContent value="deposit" className="mt-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl shadow-sm border border-border p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">New Transaction</h3>
              <div>
                <label className="text-sm text-muted-foreground">Select Member</label>
                <select className="w-full border border-input rounded-md px-3 py-2 mt-1 bg-card text-sm">
                  <option>Select Member</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Account</label>
                <Input placeholder="Account -" className="mt-1" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Amount (₹)</label>
                <Input placeholder="Amount *" type="number" className="mt-1" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Narration</label>
                <Input placeholder="Narration" className="mt-1" />
              </div>
              <div className="flex gap-3">
                <Button>DEPOSIT</Button>
                <Button variant="outline">RESET</Button>
              </div>
            </div>

            <div className="bg-card rounded-xl shadow-sm border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {transactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">{tx.date}</p>
                      <p className="text-sm text-foreground">{tx.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{tx.amount}</p>
                      <span className="status-chip status-completed">{tx.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="withdrawal" className="mt-4">
          <div className="bg-card rounded-xl shadow-sm border border-border p-8 text-center text-muted-foreground">Withdrawal module coming soon</div>
        </TabsContent>
        <TabsContent value="transfer" className="mt-4">
          <div className="bg-card rounded-xl shadow-sm border border-border p-8 text-center text-muted-foreground">Fund Transfer module coming soon</div>
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <div className="bg-card rounded-xl shadow-sm border border-border p-8 text-center text-muted-foreground">Transaction History coming soon</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Transactions;
