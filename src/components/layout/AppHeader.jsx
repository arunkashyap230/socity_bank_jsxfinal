import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

const AppHeader = () => {
  return (
    <header className="h-16 bg-primary flex items-center justify-between px-6 shadow-md">
      <h2 className="text-primary-foreground font-semibold text-lg">
        Welcome back, Admin!
      </h2>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search members, transactions..."
            className="pl-9 w-72 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:bg-primary-foreground/20"
          />
        </div>

        <button className="relative p-2 rounded-full hover:bg-primary-foreground/10 transition-colors">
          <Bell className="w-5 h-5 text-primary-foreground" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive rounded-full text-[10px] text-primary-foreground flex items-center justify-center font-bold">
            3
          </span>
        </button>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-sm font-medium text-primary-foreground">Admin User</p>
            <p className="text-xs text-primary-foreground/60">societybank@org</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-sidebar-active flex items-center justify-center text-sm font-bold text-primary-foreground">
            AU
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
