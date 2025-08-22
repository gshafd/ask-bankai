import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Bell, Settings, User, Search } from "lucide-react";

interface BankingLayoutProps {
  children: ReactNode;
  title?: string;
}

export function BankingLayout({ children, title = "BankAssist AI Dashboard" }: BankingLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary border-b shadow-banking">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">BankAssist AI</h1>
                <p className="text-white/80 text-sm">Autonomous Customer Service</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search cases, customers..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 w-64 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              
              <Button variant="banking-ghost" size="sm">
                <Bell className="w-4 h-4" />
                <Badge variant="destructive" className="ml-1 px-1 text-xs">3</Badge>
              </Button>
              
              <Button variant="banking-ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              
              <Button variant="banking-ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground">Real-time customer service orchestration and workflow management</p>
        </div>
        {children}
      </main>
    </div>
  );
}