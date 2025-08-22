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

      {/* Comprehensive Orchestration Output Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              AI Agent Orchestration in Action
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Watch how our specialized AI agents work together seamlessly, each contributing their expertise 
            to deliver comprehensive customer service automation with real business impact
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
          {/* Detailed Agent Outputs */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Intent Detection & Classification
                </CardTitle>
                <CardDescription>Advanced NLP analysis of customer communication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium">Detected Intent</span>
                    <Badge variant="default">98.7% Confidence</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Primary:</strong> Unauthorized Transaction Dispute
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Context:</strong> Customer reports unrecognized charge of $487.50 at "MERCHANT_XYZ" on 01/15/2024
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  Authentication & Identity Verification
                </CardTitle>
                <CardDescription>Multi-factor customer authentication and KYC validation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                    <div className="text-xs font-medium text-success mb-1">Identity Verified</div>
                    <div className="text-sm">John Doe - Account ****4567</div>
                  </div>
                  <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                    <div className="text-xs font-medium text-success mb-1">KYC Status</div>
                    <div className="text-sm">Compliant - Last Updated 12/2023</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Database className="w-5 h-5 text-accent" />
                  Transaction Analysis & Risk Assessment
                </CardTitle>
                <CardDescription>Deep analysis of transaction patterns and fraud indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Transaction Amount:</span>
                      <span className="font-medium">$487.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Merchant Category:</span>
                      <span className="font-medium">Online Retail</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fraud Risk Score:</span>
                      <span className="font-medium text-destructive">7.2/10 (High)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Customer Pattern Match:</span>
                      <span className="font-medium text-warning">Unusual Location</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  Resolution & Settlement Decision
                </CardTitle>
                <CardDescription>Automated decision-making with regulatory compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="font-medium text-success">Dispute Approved - Refund Authorized</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Reasoning:</strong> High fraud indicators, unusual merchant location, customer history supports claim</p>
                    <p><strong>Compliance:</strong> Regulation E - Provisional credit issued within required timeframe</p>
                    <p><strong>Action:</strong> $487.50 refunded to account, merchant investigation initiated</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Dashboard Updates */}
          <div className="space-y-6">
            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Live Analytics Updates
                </CardTitle>
                <CardDescription>Real-time dashboard integration after case completion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-card rounded-lg border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Cases Resolved</span>
                      <span className="text-success text-sm font-bold">+1</span>
                    </div>
                    <div className="text-2xl font-bold">248</div>
                    <div className="text-xs text-muted-foreground">Today</div>
                  </div>
                  
                  <div className="p-3 bg-gradient-card rounded-lg border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Resolution Time</span>
                      <span className="text-success text-sm font-bold">-0.4m</span>
                    </div>
                    <div className="text-2xl font-bold">3.8m</div>
                    <div className="text-xs text-muted-foreground">Average</div>
                  </div>
                  
                  <div className="p-3 bg-gradient-card rounded-lg border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Success Rate</span>
                      <span className="text-success text-sm font-bold">+0.1%</span>
                    </div>
                    <div className="text-2xl font-bold">97.9%</div>
                    <div className="text-xs text-muted-foreground">This week</div>
                  </div>
                  
                  <div className="p-3 bg-gradient-card rounded-lg border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Customer Satisfaction</span>
                      <span className="text-success text-sm font-bold">+0.1</span>
                    </div>
                    <div className="text-2xl font-bold">4.9</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border/50">
                  <div className="text-center">
                    <Button variant="banking-outline" size="sm" onClick={() => setActiveView("dashboard")}>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Full Dashboard
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="text-xl">Customer Communication</CardTitle>
                <CardDescription>Automated response generation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                  <div className="text-sm space-y-2">
                    <p className="font-medium">Email Draft Generated:</p>
                    <div className="italic text-muted-foreground bg-background/50 p-3 rounded border">
                      "Dear John, We have reviewed your dispute claim and approved a full refund of $487.50. 
                      The amount will be credited to your account within 1-2 business days. Case ID: CS-2024-247"
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span className="text-xs text-success">Sent automatically</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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

      {/* Enhanced AI Agent Capabilities */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Specialized AI Agent Architecture
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Each agent is purpose-built with specialized capabilities, working in orchestrated sequence 
            to deliver comprehensive customer service automation
          </p>
        </div>

        <Tabs defaultValue="workflow" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="workflow">Process Flow</TabsTrigger>
            <TabsTrigger value="agents">Agent Capabilities</TabsTrigger>
          </TabsList>

          <TabsContent value="workflow" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="banking-card text-center p-6 hover:shadow-banking transition-all group">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Multi-Channel Intake</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Seamlessly processes inputs from web portals, mobile apps, phone calls, and emails
                </p>
                <div className="text-xs text-primary font-medium">
                  Handles 15+ input formats
                </div>
              </Card>

              <Card className="banking-card text-center p-6 hover:shadow-accent transition-all group">
                <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">AI Processing</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Advanced NLP, pattern recognition, and decision-making algorithms work in concert
                </p>
                <div className="text-xs text-secondary font-medium">
                  98.7% accuracy rate
                </div>
              </Card>

              <Card className="banking-card text-center p-6 hover:shadow-glow transition-all group">
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Compliance Validation</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Real-time regulatory compliance checking across multiple banking regulations
                </p>
                <div className="text-xs text-accent font-medium">
                  100% compliant operations
                </div>
              </Card>

              <Card className="banking-card text-center p-6 hover:shadow-subtle transition-all group">
                <div className="w-12 h-12 bg-banking-accent rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Automated Resolution</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  End-to-end case resolution with customer communication and analytics integration
                </p>
                <div className="text-xs text-banking-accent font-medium">
                  3.8min average resolution
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="banking-card p-6 hover:shadow-banking transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Intent Detection Engine</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Advanced NLP that understands customer intent from unstructured text, voice, and documents
                    </p>
                    <div className="text-xs text-primary font-medium">
                      Recognizes 200+ intent types
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="banking-card p-6 hover:shadow-accent transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Identity Verification</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Multi-factor authentication combining biometrics, device fingerprinting, and behavioral analysis
                    </p>
                    <div className="text-xs text-secondary font-medium">
                      Sub-second verification
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="banking-card p-6 hover:shadow-glow transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Transaction Intelligence</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Real-time fraud detection and risk scoring using ML models trained on millions of transactions
                    </p>
                    <div className="text-xs text-accent font-medium">
                      99.2% fraud detection rate
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="banking-card p-6 hover:shadow-banking transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Knowledge Orchestrator</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Retrieves and synthesizes information from policies, procedures, and regulatory guidelines
                    </p>
                    <div className="text-xs text-warning font-medium">
                      Access to 10,000+ documents
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="banking-card p-6 hover:shadow-accent transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Resolution Engine</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Executes complex workflows including payments, account updates, and dispute processing
                    </p>
                    <div className="text-xs text-success font-medium">
                      Handles $2M+ daily volume
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="banking-card p-6 hover:shadow-glow transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-banking-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-banking-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Communication AI</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Generates personalized, compliant customer communications across multiple channels
                    </p>
                    <div className="text-xs text-banking-accent font-medium">
                      95% customer satisfaction
                    </div>
                  </div>
                </div>
              </Card>
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