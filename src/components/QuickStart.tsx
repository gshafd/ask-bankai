import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, CreditCard, MessageSquare, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuickStartProps {
  onSubmit: (data: any) => void;
}

export function QuickStart({ onSubmit }: QuickStartProps) {
  const [step, setStep] = useState<"upload" | "details">("upload");
  const [files, setFiles] = useState<File[]>([]);
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    account: "",
    issue: ""
  });
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleSubmit = () => {
    const caseData = {
      files,
      customerData,
      timestamp: new Date().toISOString()
    };
    
    toast({
      title: "Case Submitted Successfully",
      description: `Reference ID: CS-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    });
    
    onSubmit(caseData);
  };

  const isUploadReady = files.length > 0;
  const isFormReady = customerData.name && customerData.email && customerData.issue;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
          step === "upload" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}>
          <Upload className="w-4 h-4" />
          <span className="font-medium">Upload Documents</span>
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground" />
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
          step === "details" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}>
          <MessageSquare className="w-4 h-4" />
          <span className="font-medium">Basic Details</span>
        </div>
      </div>

      {step === "upload" && (
        <Card className="banking-card fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Quick Document Upload</CardTitle>
            <CardDescription className="text-lg">
              Upload your documents and let our AI agents extract all the details automatically
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Drag & Drop Area */}
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-primary/30 rounded-lg hover:border-primary/50 transition-all cursor-pointer group"
                >
                  <Upload className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-2">Drop your documents here</h3>
                  <p className="text-muted-foreground mb-4">or click to browse files</p>
                  <p className="text-sm text-muted-foreground">
                    Supports PDF, Images, Word docs, Emails
                  </p>
                </label>
              </div>

              {/* Uploaded Files */}
              {files.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold">Uploaded Files:</h4>
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="flex-1 text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 pt-6">
                <Button
                  variant="banking-outline"
                  onClick={() => setFiles([])}
                  disabled={files.length === 0}
                >
                  Clear Files
                </Button>
                <Button
                  variant="banking-primary"
                  onClick={() => setStep("details")}
                  disabled={!isUploadReady}
                  className="min-w-32"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "details" && (
        <Card className="banking-card fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Quick Details</CardTitle>
            <CardDescription className="text-lg">
              Just a few basic details to get started - our AI will handle the rest
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={customerData.name}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  className="banking-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="banking-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="account">Account Number (Optional)</Label>
                <Input
                  id="account"
                  value={customerData.account}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, account: e.target.value }))}
                  placeholder="Enter account number"
                  className="banking-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="issue">Issue Type</Label>
                <Input
                  id="issue"
                  value={customerData.issue}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, issue: e.target.value }))}
                  placeholder="e.g., Card dispute, Balance inquiry"
                  className="banking-input"
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="description">Brief Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Briefly describe your issue - our AI agents will extract the details from your documents"
                className="banking-input min-h-20"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-8">
              <Button
                variant="banking-outline"
                onClick={() => setStep("upload")}
              >
                Back to Upload
              </Button>
              <Button
                variant="banking-primary"
                onClick={handleSubmit}
                disabled={!isFormReady}
                className="min-w-32"
              >
                Start AI Processing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}