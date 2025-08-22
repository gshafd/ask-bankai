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
  BarChart3
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
      {/* Ultra-Modern Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-accent rounded-full blur-3xl opacity-15 animate-pulse"></div>
        
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center mb-16 fade-in">
            <div className="max-w-5xl mx-auto">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
                  <Zap className="w-4 h-4" />
                  Next-Gen AI Banking
                </span>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Autonomous
                </span>
                <br />
                <span className="text-foreground">Banking AI</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                Revolutionary multi-agent orchestration that processes customer requests in 
                <span className="text-primary font-semibold"> 4.2 minutes</span> with 
                <span className="text-secondary font-semibold"> 97.8% accuracy</span>
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button 
                  size="xl" 
                  variant="banking-primary"
                  onClick={() => setActiveView("customer-portal")}
                  className="group"
                >
                  <Brain className="w-6 h-6 mr-3 group-hover:animate-spin" />
                  Start AI Orchestration
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="xl" 
                  variant="banking-outline"
                  onClick={() => setActiveView("dashboard")}
                >
                  <BarChart3 className="w-6 h-6 mr-3" />
                  View Analytics
                </Button>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
                <div className="text-center slide-up">
                  <div className="text-3xl font-bold text-primary mb-1">8</div>
                  <div className="text-sm text-muted-foreground">AI Agents</div>
                </div>
                <div className="text-center slide-up" style={{animationDelay: '0.1s'}}>
                  <div className="text-3xl font-bold text-secondary mb-1">97.8%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div className="text-center slide-up" style={{animationDelay: '0.2s'}}>
                  <div className="text-3xl font-bold text-accent mb-1">4.2m</div>
                  <div className="text-sm text-muted-foreground">Avg Resolution</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Feature Cards */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <Card className="banking-card hover:shadow-banking hover:scale-105 transition-bounce group scale-in">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Multi-Agent Orchestra</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                8 specialized AI agents working in perfect harmony for unparalleled customer service automation
              </p>
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex justify-center items-center gap-2 text-primary font-semibold">
                  <CheckCircle2 className="w-5 h-5" />
                  98.5% Intent Accuracy
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="banking-card hover:shadow-accent hover:scale-105 transition-bounce group scale-in" style={{animationDelay: '0.1s'}}>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Lightning Speed</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Real-time processing with industry-leading resolution times and satisfaction scores
              </p>
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex justify-center items-center gap-2 text-secondary font-semibold">
                  <TrendingUp className="w-5 h-5" />
                  4.2min Average Resolution
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="banking-card hover:shadow-glow hover:scale-105 transition-bounce group scale-in" style={{animationDelay: '0.2s'}}>
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Bank-Grade Security</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Built-in compliance for Reg E, PSD2, and RBI with complete audit trails
              </p>
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex justify-center items-center gap-2 text-accent font-semibold">
                  <Shield className="w-5 h-5" />
                  100% Compliance Coverage
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Architecture */}
      <Tabs defaultValue="workflow" className="mb-16">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        <TabsContent value="workflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>End-to-End Workflow</CardTitle>
              <CardDescription>Complete customer service automation pipeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">1. Data Ingestion</h4>
                  <p className="text-sm text-muted-foreground">Multi-channel intake from web, mobile, call, and email</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-banking-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Bot className="w-6 h-6 text-banking-secondary" />
                  </div>
                  <h4 className="font-semibold mb-2">2. Agent Orchestration</h4>
                  <p className="text-sm text-muted-foreground">8 specialized agents process in sequence</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-warning" />
                  </div>
                  <h4 className="font-semibold mb-2">3. Compliance Check</h4>
                  <p className="text-sm text-muted-foreground">Regulatory validation and risk assessment</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                  <h4 className="font-semibold mb-2">4. Resolution</h4>
                  <p className="text-sm text-muted-foreground">Automated case resolution and communication</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Channel Intake Agent", desc: "Captures and structures multi-channel inputs", icon: Database },
              { name: "Intent Detection Agent", desc: "AI-powered query classification with 98.5% accuracy", icon: Brain },
              { name: "Authentication Agent", desc: "Multi-factor identity verification and KYC", icon: Shield },
              { name: "Entitlement Agent", desc: "Validates customer permissions and access rights", icon: Users },
              { name: "Knowledge Retrieval Agent", desc: "Fetches relevant policies and procedures", icon: FileText },
              { name: "Resolution Agent", desc: "Executes transactions and creates dispute cases", icon: CheckCircle2 },
              { name: "Compliance Agent", desc: "Ensures regulatory adherence", icon: Shield },
              { name: "Communication Agent", desc: "Drafts customer-facing responses", icon: MessageSquare }
            ].map((agent, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <agent.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{agent.name}</h4>
                      <p className="text-sm text-muted-foreground">{agent.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { channel: "Web Portal", desc: "Structured support forms with real-time assistance", percentage: "45%" },
              { channel: "Mobile App", desc: "In-app chat and form submissions", percentage: "32%" },
              { channel: "Call Center", desc: "Speech-to-text transcription processing", percentage: "18%" },
              { channel: "Email", desc: "Unstructured email parsing and extraction", percentage: "5%" }
            ].map((channel, index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">{channel.percentage}</div>
                  <h4 className="font-semibold mb-2">{channel.channel}</h4>
                  <p className="text-sm text-muted-foreground">{channel.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Live agent performance monitoring
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    SLA tracking and alerting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Customer satisfaction metrics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Channel performance analysis
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance & Security</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Regulation E dispute compliance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    PSD2 authentication standards
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    RBI guidelines adherence
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Audit trail and documentation
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Ultra-Modern CTA Section */}
      <div className="container mx-auto px-6 py-20">
        <Card className="banking-card relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-accent rounded-full blur-3xl opacity-20 -translate-y-32 translate-x-32"></div>
          
          <CardContent className="relative p-12 text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 fade-in">
                Transform Banking with AI
              </h3>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed slide-up">
                Join the future of customer service. Deploy autonomous AI agents that work 24/7, 
                resolve issues in minutes, and exceed customer expectations.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 scale-in">
                <Button 
                  size="xl" 
                  variant="banking-primary"
                  onClick={() => setActiveView("customer-portal")}
                  className="group"
                >
                  <Users className="w-6 h-6 mr-3" />
                  Experience AI Orchestration
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="xl" 
                  variant="banking-outline"
                  onClick={() => setActiveView("dashboard")}
                >
                  <BarChart3 className="w-6 h-6 mr-3" />
                  View Performance Analytics
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span>Enterprise Grade</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span>Real-time Processing</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span>24/7 Availability</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;