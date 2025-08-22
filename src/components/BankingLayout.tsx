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
      {/* Ultra-Modern Header */}
      <header className="relative bg-gradient-hero border-b border-border/50 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
        <div className="relative container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  BankAssist AI
                </h1>
                <p className="text-muted-foreground text-sm font-medium">
                  Autonomous Customer Service
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Enhanced Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search cases, customers..."
                  className="pl-10 pr-4 py-3 bg-banking-surface/50 border border-border/50 rounded-lg text-foreground placeholder-muted-foreground w-72 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-banking-surface transition-smooth backdrop-blur-sm"
                />
              </div>
              
              {/* Modern Action Buttons */}
              <Button variant="banking-ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 px-1.5 text-xs h-5 min-w-5 flex items-center justify-center">
                  3
                </Badge>
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

      {/* Modern Main Content */}
      <main className="container mx-auto px-6 py-8">
        {title && (
          <div className="mb-8 fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
            <p className="text-lg text-muted-foreground">
              Real-time customer service orchestration and workflow management
            </p>
          </div>
        )}
        <div className="slide-up">
          {children}
        </div>
      </main>
    </div>
  );
}