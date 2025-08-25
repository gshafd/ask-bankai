import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  Database, 
  Shield, 
  Brain, 
  MessageSquare, 
  FileCheck, 
  Phone,
  Mail,
  FileText,
  Bot,
  TrendingUp,
  BarChart3,
  Download,
  ClipboardCheck
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  description: string;
  status: "pending" | "processing" | "completed" | "error";
  progress: number;
  icon: any;
  output?: string;
  processingTime?: number;
}

interface AgentOrchestratorProps {
  caseId: string;
  onComplete: (result: any) => void;
}

interface OrchestrationResult {
  emailDraft: {
    to: string;
    subject: string;
    body: string;
  };
  finalReport: any;
}

export function AgentOrchestrator({ caseId, onComplete }: AgentOrchestratorProps) {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "intake",
      name: "Channel Intake Agent",
      description: "Capturing structured interaction data",
      status: "completed",
      progress: 100,
      icon: Phone,
      output: "Interaction packet created - Web portal submission",
      processingTime: 1.2
    },
    {
      id: "intent",
      name: "Intent Detection Agent",
      description: "Classifying customer query intent",
      status: "completed",
      progress: 100,
      icon: Brain,
      output: "Intent: Card Dispute | Confidence: 95% | Product: Credit Card | Urgency: High",
      processingTime: 2.1
    },
    {
      id: "auth",
      name: "Authentication & KYC Agent",
      description: "Validating customer identity",
      status: "processing",
      progress: 75,
      icon: Shield,
      processingTime: 3.5
    },
    {
      id: "entitlement",
      name: "Profile & Entitlement Agent",
      description: "Checking customer permissions",
      status: "pending",
      progress: 0,
      icon: Database
    },
    {
      id: "knowledge",
      name: "Knowledge Retrieval Agent",
      description: "Fetching relevant policies and procedures",
      status: "pending",
      progress: 0,
      icon: FileCheck
    },
    {
      id: "resolution",
      name: "Transaction Resolution Agent",
      description: "Processing dispute and creating case",
      status: "pending",
      progress: 0,
      icon: CheckCircle2
    },
    {
      id: "compliance",
      name: "Compliance & Risk Agent",
      description: "Ensuring regulatory compliance",
      status: "pending",
      progress: 0,
      icon: AlertCircle
    },
    {
      id: "communication",
      name: "Communication Agent",
      description: "Drafting customer response",
      status: "pending",
      progress: 0,
      icon: MessageSquare
    }
  ]);

  const [isCompleted, setIsCompleted] = useState(false);
  const [orchestrationResult, setOrchestrationResult] = useState<OrchestrationResult | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => {
        const updated = [...prev];
        let changed = false;

        // Process agents sequentially
        for (let i = 0; i < updated.length; i++) {
          const agent = updated[i];
          
          if (agent.status === "processing" && agent.progress < 100) {
            agent.progress = Math.min(100, agent.progress + Math.random() * 15);
            changed = true;
            
            if (agent.progress >= 100) {
              agent.status = "completed";
              agent.output = getAgentOutput(agent.id);
              
              // Start next agent
              if (i + 1 < updated.length && updated[i + 1].status === "pending") {
                updated[i + 1].status = "processing";
                updated[i + 1].progress = 10;
              }
            }
            break; // Only process one agent at a time
          }
          
          if (agent.status === "pending" && i === 0) {
            agent.status = "processing";
            agent.progress = 10;
            changed = true;
            break;
          }
        }

        // Check if all completed
        if (updated.every(a => a.status === "completed") && !isCompleted) {
          setIsCompleted(true);
          const result = {
            emailDraft: generateEmailDraft(),
            finalReport: generateFinalReport()
          };
          setOrchestrationResult(result);
          onComplete({
            caseId,
            resolution: "Dispute case created successfully",
            customerMessage: "Your card dispute has been filed. Case #CD-2024-001"
          });
        }

        return changed ? updated : prev;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [caseId, onComplete, isCompleted]);

  const getAgentOutput = (agentId: string): string => {
    const outputs: Record<string, string> = {
      auth: "Identity verified ✓ | KYC status: Active | Risk score: Low",
      entitlement: "Dispute privileges: Active ✓ | Channel permissions: Web/Mobile ✓",
      knowledge: "Retrieved: Reg E dispute procedures | Timeline: 10 business days | Required docs: Transaction details",
      resolution: "Dispute case CD-2024-001 created | Transaction flagged | Provisional credit approved",
      compliance: "Reg E compliant ✓ | Dispute timeline met ✓ | Customer notification required ✓",
      communication: "Draft message prepared for customer review and approval"
    };
    return outputs[agentId] || "Processing complete";
  };

  const generateEmailDraft = () => {
    return {
      to: "john.doe@email.com",
      subject: "Transaction Dispute Resolution - Case #CD-2024-001",
      body: `Dear John,

Thank you for contacting us regarding the unauthorized transaction on your account. After a thorough investigation, we have determined that your dispute claim is valid.

Resolution Summary:
• Transaction Amount: $487.50
• Merchant: MERCHANT_XYZ
• Resolution: Full refund approved
• Timeline: 1-2 business days

The provisional credit has been applied to your account, and we have initiated an investigation with the merchant. You can expect to see the refund reflected in your account balance within the next 1-2 business days.

If you have any additional questions or concerns, please don't hesitate to contact us at 1-800-BANK-HELP or through your mobile banking app.

Best regards,
Customer Service Team
Case ID: CD-2024-001`
    };
  };

  const generateFinalReport = () => {
    return {
      caseId: "CD-2024-001",
      customer: "John Doe (****4567)",
      issueType: "Unauthorized Transaction",
      amount: "$487.50",
      resolution: "Full Refund Approved",
      processingTime: "3.2 minutes",
      complianceStatus: "Regulation E Compliant",
      agentPerformance: [
        { name: "Intent Detection", score: 98.7, time: "0.3s" },
        { name: "Authentication", score: 100, time: "0.8s" },
        { name: "Transaction Analysis", score: 94.2, time: "1.1s" },
        { name: "Risk Assessment", score: 96.8, time: "0.7s" },
        { name: "Resolution Engine", score: 98.1, time: "0.3s" },
        { name: "Communication", score: 97.5, time: "0.2s" }
      ],
      businessImpact: {
        customerSatisfaction: "97.8%",
        costSavings: "$847",
        fasterProcessing: "92%",
        regulatoryCompliance: "100%"
      }
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success";
      case "processing": return "default";
      case "error": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircle2;
      case "processing": return Clock;
      case "error": return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold">Agent Orchestration Pipeline</h3>
        <p className="text-muted-foreground">Case ID: {caseId}</p>
      </div>

      {/* Pipeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Processing Status</CardTitle>
          <CardDescription>Real-time agent execution pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agents.map((agent, index) => {
              const StatusIcon = getStatusIcon(agent.status);
              const AgentIcon = agent.icon;
              
              return (
                <div key={agent.id} className="relative">
                  {/* Connection Line */}
                  {index < agents.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-8 bg-border" />
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      agent.status === "completed" ? "bg-success/10 border-2 border-success" :
                      agent.status === "processing" ? "bg-primary/10 border-2 border-primary animate-pulse-banking" :
                      agent.status === "error" ? "bg-destructive/10 border-2 border-destructive" :
                      "bg-muted border-2 border-border"
                    }`}>
                      <AgentIcon className={`w-5 h-5 ${
                        agent.status === "completed" ? "text-success" :
                        agent.status === "processing" ? "text-primary" :
                        agent.status === "error" ? "text-destructive" :
                        "text-muted-foreground"
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{agent.name}</h4>
                          <p className="text-sm text-muted-foreground">{agent.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusColor(agent.status) as any}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {agent.status}
                          </Badge>
                          {agent.processingTime && agent.status === "completed" && (
                            <span className="text-xs text-muted-foreground">
                              {agent.processingTime}s
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {agent.status !== "pending" && (
                        <div className="space-y-2">
                          <Progress value={agent.progress} className="h-2" />
                          {agent.output && (
                            <div className="bg-muted/50 rounded-lg p-3">
                              <p className="text-sm font-mono">{agent.output}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {index < agents.length - 1 && agent.status === "completed" && (
                      <ArrowRight className="w-4 h-4 text-success mt-4" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {agents.filter(a => a.status === "completed").length}
              </div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {agents.filter(a => a.status === "processing").length}
              </div>
              <p className="text-sm text-muted-foreground">Processing</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-muted-foreground">
                {agents.filter(a => a.status === "pending").length}
              </div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {Math.round((agents.filter(a => a.status === "completed").length / agents.length) * 100)}%
              </div>
              <p className="text-sm text-muted-foreground">Complete</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Draft and Final Report - Only show after completion */}
      {isCompleted && orchestrationResult && (
        <div className="space-y-6 animate-fade-in">
          {/* Communication Agent Output - Email Draft */}
          <Card className="banking-card">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" />
                Communication Agent Output
              </CardTitle>
              <CardDescription>Personalized customer communication generation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">Draft Email Generated</span>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded border border-blue-100 dark:border-blue-900">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600 dark:text-gray-400">To:</span>
                      <span className="font-medium">{orchestrationResult.emailDraft.to}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600 dark:text-gray-400">Subject:</span>
                      <span className="font-medium">{orchestrationResult.emailDraft.subject}</span>
                    </div>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <div className="whitespace-pre-line">
                      {orchestrationResult.emailDraft.body}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="text-xs text-success">Email sent automatically via secure banking portal</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final Orchestration Report */}
          <Card className="banking-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center gap-3 justify-center">
                <FileCheck className="w-6 h-6 text-primary" />
                Final Orchestration Report
              </CardTitle>
              <CardDescription>Comprehensive summary of AI agent collaboration and business impact</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Case Summary */}
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-card rounded-lg border border-border/50">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <ClipboardCheck className="w-5 h-5 text-primary" />
                      Case Resolution Summary
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Case ID:</span>
                        <span className="font-medium">{orchestrationResult.finalReport.caseId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Customer:</span>
                        <span className="font-medium">{orchestrationResult.finalReport.customer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Issue Type:</span>
                        <span className="font-medium">{orchestrationResult.finalReport.issueType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium">{orchestrationResult.finalReport.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Resolution:</span>
                        <span className="font-medium text-success">{orchestrationResult.finalReport.resolution}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Processing Time:</span>
                        <span className="font-medium">{orchestrationResult.finalReport.processingTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Compliance Status:</span>
                        <span className="font-medium text-success">{orchestrationResult.finalReport.complianceStatus}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-success/10 rounded-lg border border-success/20">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-success" />
                      Business Impact Metrics
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded">
                        <div className="text-2xl font-bold text-success">{orchestrationResult.finalReport.businessImpact.customerSatisfaction}</div>
                        <div className="text-muted-foreground">Customer Satisfaction</div>
                      </div>
                      <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded">
                        <div className="text-2xl font-bold text-success">{orchestrationResult.finalReport.businessImpact.costSavings}</div>
                        <div className="text-muted-foreground">Cost Savings vs Manual</div>
                      </div>
                      <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded">
                        <div className="text-2xl font-bold text-success">{orchestrationResult.finalReport.businessImpact.fasterProcessing}</div>
                        <div className="text-muted-foreground">Faster Processing</div>
                      </div>
                      <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded">
                        <div className="text-2xl font-bold text-success">{orchestrationResult.finalReport.businessImpact.regulatoryCompliance}</div>
                        <div className="text-muted-foreground">Regulatory Compliance</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agent Performance */}
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-card rounded-lg border border-border/50">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Bot className="w-5 h-5 text-primary" />
                      Agent Performance Analysis
                    </h3>
                    <div className="space-y-4">
                      {orchestrationResult.finalReport.agentPerformance.map((agent: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white/30 dark:bg-gray-800/30 rounded">
                          <div className="flex-1">
                            <div className="text-sm font-medium">{agent.name}</div>
                            <div className="text-xs text-muted-foreground">Processed in {agent.time}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-success">{agent.score}%</div>
                            <div className="text-xs text-muted-foreground">Accuracy</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-accent/10 rounded-lg border border-accent/20">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-accent" />
                      Real-time Dashboard Updates
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                        <span>Case metrics updated in analytics dashboard</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                        <span>Customer satisfaction score recalculated</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                        <span>Resolution time benchmarks updated</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                        <span>Compliance reports automatically generated</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-sm text-muted-foreground">
                      Case processed successfully with full regulatory compliance and optimal customer experience
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="banking-outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                    <Button variant="banking-primary" size="sm">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}