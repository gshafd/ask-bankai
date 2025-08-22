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
        if (updated.every(a => a.status === "completed")) {
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
  }, [caseId, onComplete]);

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
    </div>
  );
}