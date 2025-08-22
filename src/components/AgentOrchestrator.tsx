import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, AlertCircle, ArrowRight, Database, Shield, Brain, MessageSquare, FileCheck, Phone } from "lucide-react";

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

  useEffect(() => {
    // Start first agent immediately
    setAgents(prev => {
      const updated = [...prev];
      if (updated[0]?.status === "pending") {
        updated[0].status = "processing";
        updated[0].progress = 15;
        return updated;
      }
      return prev;
    });

    const interval = setInterval(() => {
      setAgents(prev => {
        const updated = [...prev];
        let changed = false;

        // Process agents sequentially
        for (let i = 0; i < updated.length; i++) {
          const agent = updated[i];
          
          if (agent.status === "processing" && agent.progress < 100) {
            agent.progress = Math.min(100, agent.progress + Math.random() * 12 + 3);
            changed = true;
            
            if (agent.progress >= 100) {
              agent.status = "completed";
              agent.output = getAgentOutput(agent.id);
              agent.processingTime = Math.random() * 3 + 1.5; // Random processing time
              
              // Start next agent
              if (i + 1 < updated.length && updated[i + 1].status === "pending") {
                updated[i + 1].status = "processing";
                updated[i + 1].progress = 15;
              }
            }
            break; // Only process one agent at a time
          }
        }

        // Check if all completed
        if (updated.every(a => a.status === "completed")) {
          setTimeout(() => {
            onComplete({
              caseId,
              resolution: "Case resolved successfully with full compliance validation",
              customerMessage: `Your request has been processed. Case ${caseId} is now complete.`
            });
          }, 1000);
        }

        return changed ? updated : prev;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [caseId, onComplete]);

  const getAgentOutput = (agentId: string): string => {
    const outputs: Record<string, string> = {
      intake: "✅ Structured interaction packet created from web portal submission | Channel: Web | Format: JSON",
      intent: "🎯 Intent: Card Dispute | Confidence: 96.8% | Product: Credit Card | Urgency: High | Reasoning: Keywords 'unauthorized charge', 'dispute' detected with transaction reference",
      auth: "🔐 Identity verification: PASSED | Customer ID: CUST-12345 verified ✓ | KYC Status: Active | Multi-factor auth completed | Risk Score: Low (2.1/10)",
      entitlement: "✅ Entitlement Check PASSED | Dispute privileges: Active ✓ | Channel permissions: Web/Mobile/Phone ✓ | Credit card dispute rights: Confirmed | Account standing: Good",
      knowledge: "📚 Knowledge Retrieved: Reg E dispute procedures (15-day window) | Chargeback process guidelines | Required documentation: Transaction details, merchant info | Reference: KB-2024-CC-001",
      resolution: "💳 Dispute Case #CD-2024-0847 CREATED ✓ | Transaction $459.99 flagged for investigation | Provisional credit of $459.99 APPROVED | Expected resolution: 7-10 business days",
      compliance: "⚖️ Regulation E Compliance: VALIDATED ✓ | Dispute filed within 60-day window ✓ | Customer notification timeline: Met ✓ | Audit trail: Generated | Risk assessment: Compliant",
      communication: "📧 Customer communication drafted: 'Your dispute case #CD-2024-0847 has been filed. Provisional credit of $459.99 applied to your account. Investigation timeline: 7-10 business days. Reference ID: REF-884721'"
    };
    return outputs[agentId] || "Processing complete";
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
      {/* Compact Pipeline Header */}
      <div className="text-center border-b pb-4">
        <h2 className="text-2xl font-bold mb-1">AI Agent Pipeline</h2>
        <p className="text-muted-foreground">Case ID: <span className="font-mono font-bold text-primary">{caseId}</span></p>
      </div>

      {/* Compact Horizontal Pipeline */}
      <Card className="border-2 border-primary/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-8 gap-2 mb-4">
            {agents.map((agent) => (
              <div key={agent.id} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-all duration-300 ${
                  agent.status === "completed" ? "bg-success border-2 border-success shadow-md" :
                  agent.status === "processing" ? "bg-primary border-2 border-primary shadow-md animate-pulse" :
                  agent.status === "error" ? "bg-destructive border-2 border-destructive shadow-md" :
                  "bg-muted border-2 border-muted"
                }`}>
                  <agent.icon className={`w-5 h-5 ${
                    agent.status === "completed" ? "text-white" :
                    agent.status === "processing" ? "text-white" :
                    agent.status === "error" ? "text-white" :
                    "text-muted-foreground"
                  }`} />
                </div>
                <h4 className="text-xs font-medium text-center leading-tight mb-1">{agent.name.replace(' Agent', '')}</h4>
                <Badge variant={getStatusColor(agent.status) as any} className="text-xs px-1 py-0">
                  {agent.status}
                </Badge>
                {agent.status !== "pending" && (
                  <div className="w-16 mt-1">
                    <Progress value={agent.progress} className="h-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round((agents.filter(a => a.status === "completed").length / agents.length) * 100)}%</span>
            </div>
            <Progress value={(agents.filter(a => a.status === "completed").length / agents.length) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Agent Outputs - Compact Cards */}
      {agents.filter(agent => agent.output).length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold">Agent Analysis Results</h3>
          <div className="space-y-3">
            {agents
              .filter(agent => agent.output)
              .map((agent) => {
                const AgentIcon = agent.icon;
                
                return (
                  <Card key={agent.id} className="border-l-4 border-l-success">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <AgentIcon className="w-4 h-4 text-success" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{agent.name}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="default" className="bg-success text-success-foreground text-xs">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Done
                              </Badge>
                              {agent.processingTime && (
                                <span className="text-xs text-muted-foreground">
                                  {agent.processingTime.toFixed(1)}s
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="bg-muted/30 rounded-md p-3 border-l-2 border-l-success/50">
                            <p className="text-sm leading-relaxed">{agent.output}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      )}

      {/* Compact Metrics */}
      <div className="grid grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-xl font-bold text-success">
              {agents.filter(a => a.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-xl font-bold text-primary">
              {agents.filter(a => a.status === "processing").length}
            </div>
            <p className="text-xs text-muted-foreground">Processing</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-xl font-bold text-muted-foreground">
              {agents.filter(a => a.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-xl font-bold">
              {Math.round((agents.filter(a => a.status === "completed").length / agents.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Complete</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}