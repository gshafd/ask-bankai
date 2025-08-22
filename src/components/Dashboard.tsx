import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Filter,
  Search,
  Eye,
  Download,
  RefreshCw,
  BarChart3
} from "lucide-react";

interface CaseData {
  caseId: string;
  customerId: string;
  customerName: string;
  intent: string;
  channel: string;
  product: string;
  status: "processing" | "completed" | "pending" | "escalated";
  assignedAgent: string;
  sla: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
}

const mockCases: CaseData[] = [
  {
    caseId: "CS-2024-001",
    customerId: "CUST-12345",
    customerName: "John Doe",
    intent: "Card Dispute",
    channel: "Web Portal",
    product: "Credit Card",
    status: "processing",
    assignedAgent: "Resolution Agent",
    sla: "2h 15m",
    priority: "high",
    createdAt: "2024-01-15 10:30"
  },
  {
    caseId: "CS-2024-002",
    customerId: "CUST-67890",
    customerName: "Sarah Smith",
    intent: "Balance Inquiry",
    channel: "Mobile App",
    product: "Checking Account",
    status: "completed",
    assignedAgent: "Knowledge Agent",
    sla: "0h 45m",
    priority: "low",
    createdAt: "2024-01-15 09:15"
  },
  {
    caseId: "CS-2024-003",
    customerId: "CUST-11111",
    customerName: "Mike Johnson",
    intent: "Loan Inquiry",
    channel: "Call Center",
    product: "Personal Loan",
    status: "pending",
    assignedAgent: "Intake Agent",
    sla: "3h 20m",
    priority: "medium",
    createdAt: "2024-01-15 08:00"
  }
];

export function Dashboard() {
  const [cases, setCases] = useState<CaseData[]>(mockCases);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.caseId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success";
      case "processing": return "default";
      case "escalated": return "destructive";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "warning";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Cases</p>
                <p className="text-3xl font-bold">247</p>
                <p className="text-sm text-success">+12% from yesterday</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Resolution Time</p>
                <p className="text-3xl font-bold">4.2m</p>
                <p className="text-sm text-success">-18% improvement</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-3xl font-bold">97.8%</p>
                <p className="text-sm text-success">+2.1% this week</p>
              </div>
              <div className="w-12 h-12 bg-banking-secondary/10 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-banking-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
                <p className="text-3xl font-bold">4.9</p>
                <p className="text-sm text-success">+0.2 rating increase</p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs defaultValue="cases" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="cases">Active Cases</TabsTrigger>
          <TabsTrigger value="pipeline">Agent Pipeline</TabsTrigger>
          <TabsTrigger value="customer360">Customer 360</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Case Management</CardTitle>
                  <CardDescription>Monitor and manage customer service cases</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search cases or customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>

              {/* Cases Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Case ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Intent</TableHead>
                      <TableHead>Channel</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Agent</TableHead>
                      <TableHead>SLA</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCases.map((case_) => (
                      <TableRow key={case_.caseId}>
                        <TableCell className="font-medium">{case_.caseId}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{case_.customerName}</div>
                            <div className="text-sm text-muted-foreground">{case_.customerId}</div>
                          </div>
                        </TableCell>
                        <TableCell>{case_.intent}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{case_.channel}</Badge>
                        </TableCell>
                        <TableCell>{case_.product}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(case_.status) as any}>
                            {case_.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getPriorityColor(case_.priority) as any}>
                            {case_.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{case_.assignedAgent}</TableCell>
                        <TableCell>
                          <span className={`font-medium ${
                            case_.sla.startsWith('0') ? 'text-success' :
                            case_.sla.startsWith('1') ? 'text-warning' :
                            'text-destructive'
                          }`}>
                            {case_.sla}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Pipeline Status</CardTitle>
              <CardDescription>Real-time view of agent orchestration workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">Pipeline Visualization</p>
                <p className="text-muted-foreground">Select a case to view its agent orchestration flow</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer360" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer 360 View</CardTitle>
              <CardDescription>Comprehensive customer profile and interaction history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">Customer Profile</p>
                <p className="text-muted-foreground">Select a customer to view detailed profile and history</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Performance</CardTitle>
                <CardDescription>Performance metrics by agent type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Intent Detection Agent</span>
                    <span className="font-medium">98.5% accuracy</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Resolution Agent</span>
                    <span className="font-medium">96.2% success rate</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Compliance Agent</span>
                    <span className="font-medium">100% coverage</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Distribution</CardTitle>
                <CardDescription>Cases by input channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Web Portal</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Mobile App</span>
                    <span className="font-medium">32%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Call Center</span>
                    <span className="font-medium">23%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Configure agents, SLA thresholds, and system parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <AlertTriangle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">Configuration Panel</p>
                <p className="text-muted-foreground">Agent settings and system configuration options</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}