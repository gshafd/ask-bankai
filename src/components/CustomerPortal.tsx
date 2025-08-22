import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CreditCard, DollarSign, FileText, Phone, MessageCircle, Upload, CheckCircle2, ArrowRight, Building2 } from "lucide-react";

interface CustomerPortalProps {
  onSubmitSupport: (data: any) => void;
}

export function CustomerPortal({ onSubmitSupport }: CustomerPortalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    queryType: "",
    accountInfo: "",
    description: "",
    attachments: []
  });

  const queryTypes = [
    { id: "payments", label: "Payments", icon: DollarSign, description: "Transfer issues, failed payments" },
    { id: "cards", label: "Cards", icon: CreditCard, description: "Card blocks, disputes, new cards" },
    { id: "accounts", label: "Accounts", icon: Building2, description: "Balance inquiries, account issues" },
    { id: "loans", label: "Loans", icon: FileText, description: "Loan applications, payments" },
    { id: "general", label: "General", icon: MessageCircle, description: "Other banking inquiries" },
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleSubmit = () => {
    onSubmitSupport(formData);
    setStep(5); // Success step
  };

  const progress = (step / 5) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">BankAssist AI Support</h1>
        <p className="text-muted-foreground">Get instant help with your banking needs</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span className={step >= 1 ? "text-primary font-medium" : ""}>Query Type</span>
          <span className={step >= 2 ? "text-primary font-medium" : ""}>Account Info</span>
          <span className={step >= 3 ? "text-primary font-medium" : ""}>Description</span>
          <span className={step >= 4 ? "text-primary font-medium" : ""}>Review</span>
          <span className={step >= 5 ? "text-success font-medium" : ""}>Complete</span>
        </div>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>
            {step === 1 && "Select Query Type"}
            {step === 2 && "Account Information"}
            {step === 3 && "Describe Your Issue"}
            {step === 4 && "Review & Submit"}
            {step === 5 && "Request Submitted"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Choose the type of assistance you need"}
            {step === 2 && "Verify your account details"}
            {step === 3 && "Provide details about your issue"}
            {step === 4 && "Review your request before submission"}
            {step === 5 && "Your request has been received and is being processed"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {queryTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    formData.queryType === type.id 
                      ? "ring-2 ring-primary shadow-banking" 
                      : "border-2 border-transparent"
                  }`}
                  onClick={() => setFormData({ ...formData, queryType: type.id })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <type.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{type.label}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="customer-id">Customer ID</Label>
                <Input
                  id="customer-id"
                  placeholder="Enter your Customer ID"
                  value={formData.accountInfo}
                  onChange={(e) => setFormData({ ...formData, accountInfo: e.target.value })}
                />
              </div>
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span className="font-medium text-success">Account Verified</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  John Doe • Checking Account ****1234 • Active
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Describe your issue</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide details about your issue..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <Label>Upload Supporting Documents (Optional)</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop files here or click to browse
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Choose Files
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div>
                  <Label className="text-sm font-medium">Query Type</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {queryTypes.find(t => t.id === formData.queryType) && (
                      <>
                        <Badge variant="secondary">
                          {queryTypes.find(t => t.id === formData.queryType)?.label}
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Account</Label>
                  <p className="text-sm text-muted-foreground">Checking Account ****1234</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-muted-foreground">{formData.description}</p>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Request Submitted Successfully!</h3>
                <p className="text-muted-foreground">Case ID: #CS-2024-001</p>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="text-sm">
                  Our AI agents are processing your request. You'll receive updates via email and SMS.
                  Average response time: <span className="font-medium">2-5 minutes</span>
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            {step > 1 && step < 5 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            
            {step < 4 && (
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && !formData.queryType) ||
                  (step === 2 && !formData.accountInfo) ||
                  (step === 3 && !formData.description)
                }
                className="ml-auto"
              >
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            
            {step === 4 && (
              <Button onClick={handleSubmit} className="ml-auto">
                Submit Request
              </Button>
            )}

            {step === 5 && (
              <Button onClick={() => window.location.reload()} className="mx-auto">
                Submit Another Request
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI Assistant Panel */}
      {step < 5 && (
        <Card className="mt-6 border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">AI Assistant</h4>
                <p className="text-sm text-muted-foreground">
                  {step === 1 && "I can help you find the right category for your issue. What specifically are you having trouble with?"}
                  {step === 2 && "I've verified your account details. Everything looks good to proceed."}
                  {step === 3 && "Based on your query type, I recommend including any relevant transaction IDs or error messages."}
                  {step === 4 && "Your request looks complete. Our specialized agents will handle this efficiently."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}