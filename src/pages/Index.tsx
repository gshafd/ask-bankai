import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankingLayout } from "@/components/BankingLayout";
import { CustomerPortal } from "@/components/CustomerPortal";
import { AgentOrchestrator } from "@/components/AgentOrchestrator";
import { Dashboard } from "@/components/Dashboard";
import { QuickStart } from "@/components/QuickStart";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Users, 
  Bot, 
  Shield, 
  Database, 
  MessageSquare, 
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Zap,
  Globe,
  FileText,
  BarChart3,
  Upload
} from "lucide-react";

interface SupportRequest {
  caseId: string;
  customerData: any;
  status: "submitted" | "processing" | "completed";
}

const Index = () => {
  const [activeView, setActiveView] = useState<"overview" | "customer-portal" | "dashboard" | "orchestrator">("overview");
  const [supportRequest, setSupportRequest] = useState<SupportRequest | null>(null);

  const handleSubmitSupport = (data: any) => {
    const caseId = `CS-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    setSupportRequest({
      caseId,
      customerData: data,
      status: "submitted"
    });
    setActiveView("orchestrator");
  };

  const handleOrchestrationComplete = (result: any) => {
    if (supportRequest) {
      setSupportRequest({
        ...supportRequest,
        status: "completed"
      });
    }
  };

  if (activeView === "customer-portal") {
    return (
      <div className="min-h-screen banking-hero">
        <div className="container mx-auto px-6 py-12">
          <div className="mb-8 fade-in">
            <Button variant="banking-outline" onClick={() => setActiveView("overview")}>
              ← Back to Overview
            </Button>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 slide-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Quick Start
                </span>{" "}
                AI Orchestration
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Upload your documents or describe your issue. Our AI agents will handle everything else.
              </p>
            </div>
            <QuickStart onSubmit={handleSubmitSupport} />
          </div>
        </div>
      </div>
    );
  }

  if (activeView === "orchestrator" && supportRequest) {
    return (
      <BankingLayout title="Agent Orchestration">
        <div className="mb-6">
          <Button variant="outline" onClick={() => setActiveView("overview")}>
            ← Back to Overview
          </Button>
        </div>
        <AgentOrchestrator 
          caseId={supportRequest.caseId} 
          onComplete={handleOrchestrationComplete}
        />
      </BankingLayout>
    );
  }

  if (activeView === "dashboard") {
    return (
      <BankingLayout title="Operations Dashboard">
        <div className="mb-6">
          <Button variant="outline" onClick={() => setActiveView("overview")}>
            ← Back to Overview
          </Button>
        </div>
        <Dashboard />
      </BankingLayout>
    );
  }

  return (
    <div className="min-h-screen banking-hero">
      {/* Compact Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-accent rounded-full blur-3xl opacity-15 animate-pulse"></div>
        
        <div className="relative z-10 container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Content */}
            <div className="text-center lg:text-left fade-in">
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
                  <Zap className="w-4 h-4" />
                  Next-Gen AI Banking
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Autonomous
                </span>
                <br />
                <span className="text-foreground">Banking AI</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Revolutionary multi-agent orchestration processes customer requests in 
                <span className="text-primary font-semibold"> 4.2 minutes</span> with 
                <span className="text-secondary font-semibold"> 97.8% accuracy</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
                <Button 
                  size="lg" 
                  variant="banking-primary"
                  onClick={() => setActiveView("customer-portal")}
                  className="group"
                >
                  <Brain className="w-5 h-5 mr-2 group-hover:animate-spin" />
                  Start AI Orchestration
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="banking-outline"
                  onClick={() => setActiveView("dashboard")}
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>

            {/* Right Side - Live Stats & Features */}
            <div className="space-y-6 slide-up">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="banking-card text-center p-4">
                  <div className="text-2xl font-bold text-primary mb-1">8</div>
                  <div className="text-xs text-muted-foreground">AI Agents</div>
                </Card>
                <Card className="banking-card text-center p-4">
                  <div className="text-2xl font-bold text-secondary mb-1">97.8%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </Card>
                <Card className="banking-card text-center p-4">
                  <div className="text-2xl font-bold text-accent mb-1">4.2m</div>
                  <div className="text-xs text-muted-foreground">Avg Resolution</div>
                </Card>
              </div>

              {/* Key Features Compact */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 banking-card">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Multi-Agent Orchestra</h4>
                    <p className="text-xs text-muted-foreground">8 specialized AI agents in perfect harmony</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 banking-card">
                  <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Lightning Speed</h4>
                    <p className="text-xs text-muted-foreground">Real-time processing with instant resolution</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 banking-card">
                  <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Bank-Grade Security</h4>
                    <p className="text-xs text-muted-foreground">Built-in compliance for all regulations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orchestration Output Report Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Complete Orchestration Output
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how our AI agents generate comprehensive reports that automatically integrate with your analytics dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Sample Output Report */}
          <Card className="banking-card">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                AI Orchestration Report
              </CardTitle>
              <CardDescription>Case ID: CS-2024-247 | Completed in 3.8 minutes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg border border-success/20">
                  <span className="text-sm font-medium">Intent Detection</span>
                  <Badge variant="secondary">Card Dispute - Unauthorized Transaction</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg border border-success/20">
                  <span className="text-sm font-medium">Customer Verification</span>
                  <Badge variant="secondary">Identity Confirmed via KYC</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg border border-success/20">
                  <span className="text-sm font-medium">Transaction Analysis</span>
                  <Badge variant="secondary">$487.50 Disputed - Valid Claim</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg border border-success/20">
                  <span className="text-sm font-medium">Compliance Check</span>
                  <Badge variant="secondary">Reg E Compliant</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="text-sm font-medium">Resolution</span>
                  <Badge variant="default">Refund Processed - Email Sent</Badge>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Customer Satisfaction Score</span>
                  <span className="text-lg font-bold text-success">4.9/5</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Integration */}
          <Card className="banking-card">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                Real-time Dashboard Integration
              </CardTitle>
              <CardDescription>Automatic analytics updates after each case completion</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-gradient-card rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Cases Processed Today</span>
                    <span className="text-success text-sm">+1</span>
                  </div>
                  <div className="text-2xl font-bold">248</div>
                </div>
                
                <div className="p-3 bg-gradient-card rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Average Resolution Time</span>
                    <span className="text-success text-sm">-0.4m</span>
                  </div>
                  <div className="text-2xl font-bold">3.8m</div>
                </div>
                
                <div className="p-3 bg-gradient-card rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Success Rate</span>
                    <span className="text-success text-sm">+0.1%</span>
                  </div>
                  <div className="text-2xl font-bold">97.9%</div>
                </div>
                
                <div className="p-3 bg-gradient-card rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Customer Satisfaction</span>
                    <span className="text-success text-sm">+0.1</span>
                  </div>
                  <div className="text-2xl font-bold">4.9</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Process Flow Visualization */}
        <Card className="banking-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">End-to-End Process Flow</CardTitle>
            <CardDescription>From submission to dashboard analytics in real-time</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-1">1. Submit Case</h4>
                <p className="text-sm text-muted-foreground">Upload documents & details</p>
              </div>
              
              <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90 md:rotate-0" />
              
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-1">2. AI Processing</h4>
                <p className="text-sm text-muted-foreground">8 agents orchestration</p>
              </div>
              
              <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90 md:rotate-0" />
              
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-1">3. Generate Report</h4>
                <p className="text-sm text-muted-foreground">Comprehensive output</p>
              </div>
              
              <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90 md:rotate-0" />
              
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-banking-accent rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-1">4. Update Dashboard</h4>
                <p className="text-sm text-muted-foreground">Real-time analytics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Streamlined System Overview */}
      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue="workflow" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="agents">AI Agents</TabsTrigger>
          </TabsList>

          <TabsContent value="workflow" className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="banking-card text-center p-4">
                <Globe className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-sm mb-2">Multi-Channel Intake</h4>
                <p className="text-xs text-muted-foreground">Web, mobile, call, email</p>
              </Card>
              <Card className="banking-card text-center p-4">
                <Bot className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h4 className="font-semibold text-sm mb-2">AI Orchestration</h4>
                <p className="text-xs text-muted-foreground">8 agents in sequence</p>
              </Card>
              <Card className="banking-card text-center p-4">
                <Shield className="w-8 h-8 text-warning mx-auto mb-3" />
                <h4 className="font-semibold text-sm mb-2">Compliance Check</h4>
                <p className="text-xs text-muted-foreground">Regulatory validation</p>
              </Card>
              <Card className="banking-card text-center p-4">
                <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-3" />
                <h4 className="font-semibold text-sm mb-2">Resolution</h4>
                <p className="text-xs text-muted-foreground">Automated completion</p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Intent Detection", accuracy: "98.5%", icon: Brain },
                { name: "Authentication", coverage: "100%", icon: Shield },
                { name: "Knowledge Retrieval", speed: "0.3s", icon: FileText },
                { name: "Resolution Engine", success: "96.2%", icon: CheckCircle2 }
              ].map((agent, index) => (
                <Card key={index} className="banking-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <agent.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{agent.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {agent.accuracy || agent.coverage || agent.speed || agent.success}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Compact CTA Section */}
      <div className="container mx-auto px-6 py-12">
        <Card className="banking-card relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
          <CardContent className="relative p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Banking with AI?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Deploy autonomous AI agents that work 24/7, resolve issues in minutes, and exceed customer expectations.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                variant="banking-primary"
                onClick={() => setActiveView("customer-portal")}
                className="group"
              >
                <Users className="w-5 h-5 mr-2" />
                Experience AI Orchestration
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="banking-outline"
                onClick={() => setActiveView("dashboard")}
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                View Analytics Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;