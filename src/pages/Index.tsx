import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankingLayout } from "@/components/BankingLayout";
import { CustomerPortal } from "@/components/CustomerPortal";
import { AgentOrchestrator } from "@/components/AgentOrchestrator";
import { Dashboard } from "@/components/Dashboard";
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
  FileText
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
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-6">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setActiveView("overview")}>
              ← Back to Overview
            </Button>
          </div>
          <CustomerPortal onSubmitSupport={handleSubmitSupport} />
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
    <BankingLayout title="Autonomous Banking Customer Service Orchestrator">
      {/* Modern Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-banking-secondary/5 to-banking-accent/5 rounded-3xl"></div>
        <div className="relative text-center py-20 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              Next-Generation AI Banking
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Autonomous Banking</span>
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">Customer Service</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Transform customer service with AI-powered multi-agent orchestration. 
              Experience seamless automation from intake to resolution.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                variant="banking-primary"
                onClick={() => setActiveView("customer-portal")}
                className="h-14 px-8 text-lg"
              >
                Start Support Request
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="banking-outline"
                onClick={() => setActiveView("dashboard")}
                className="h-14 px-8 text-lg"
              >
                View Live Dashboard
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">4.2min</div>
                <div className="text-sm text-muted-foreground">Avg Resolution</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-1">97.8%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-banking-secondary mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">AI Availability</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="border-2 border-primary/20 hover:border-primary/40 transition-smooth">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Multi-Agent AI</h3>
            <p className="text-muted-foreground">
              8 specialized AI agents working in orchestrated sequence for optimal customer service
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-banking-secondary/20 hover:border-banking-secondary/40 transition-smooth">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Real-time Processing</h3>
            <p className="text-muted-foreground">
              Average resolution time of 4.2 minutes with 97.8% success rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-banking-accent/20 hover:border-banking-accent/40 transition-smooth">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-banking-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Compliance First</h3>
            <p className="text-muted-foreground">
              Built-in regulatory compliance for Reg E, PSD2, and RBI requirements
            </p>
          </CardContent>
        </Card>
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

      {/* Call to Action */}
      <Card className="bg-gradient-primary text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Customer Service?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Experience the future of banking customer service with our autonomous AI orchestrator. 
            Reduce response times, increase satisfaction, and ensure compliance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setActiveView("customer-portal")}
            >
              Try Customer Portal
            </Button>
            <Button 
              size="lg" 
              variant="banking-ghost"
              onClick={() => setActiveView("dashboard")}
            >
              View Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </BankingLayout>
  );
};

export default Index;