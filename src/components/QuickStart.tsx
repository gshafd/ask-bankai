import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, MessageSquare, ArrowRight, CheckCircle2, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuickStartProps {
  onSubmit: (data: any) => void;
}

export function QuickStart({ onSubmit }: QuickStartProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    account: "",
    issue: "",
    description: ""
  });
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const caseData = {
      files,
      customerData,
      timestamp: new Date().toISOString()
    };
    
    const caseId = `CS-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    toast({
      title: "🎉 Case Submitted Successfully!",
      description: `Reference ID: ${caseId} - Watch our AI agents work their magic!`,
    });
    
    onSubmit(caseData);
  };

  const isFormReady = customerData.name && customerData.email && customerData.issue;

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="banking-card fade-in">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl">AI-Powered Case Submission</CardTitle>
          <CardDescription className="text-lg">
            Upload documents and provide basic details - our AI agents will handle everything else in seconds
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Document Upload Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Upload Supporting Documents
                </h3>
                
                {/* Drag & Drop Area */}
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt,.eml"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-primary/30 rounded-xl hover:border-primary/50 transition-all cursor-pointer group bg-gradient-card"
                  >
                    <Upload className="w-10 h-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h4 className="text-lg font-semibold mb-2">Drop files here</h4>
                    <p className="text-muted-foreground mb-2">or click to browse</p>
                    <p className="text-sm text-muted-foreground">
                      PDF, Images, Word docs, Emails supported
                    </p>
                  </label>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="space-y-3 mt-4">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Uploaded Files ({files.length})
                    </h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/50">
                          <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-destructive hover:text-destructive h-8 w-8 p-0"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Details Form Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Customer Details
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={customerData.name}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your full name"
                        className="banking-input"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerData.email}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="banking-input"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="account" className="text-sm font-medium">
                        Account Number
                      </Label>
                      <Input
                        id="account"
                        value={customerData.account}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, account: e.target.value }))}
                        placeholder="Optional"
                        className="banking-input"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="issue" className="text-sm font-medium">
                        Issue Type *
                      </Label>
                      <Input
                        id="issue"
                        value={customerData.issue}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, issue: e.target.value }))}
                        placeholder="e.g., Card dispute, Balance inquiry"
                        className="banking-input"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Brief Description
                    </Label>
                    <Textarea
                      id="description"
                      value={customerData.description}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Optional - Our AI will extract details from your documents"
                      className="banking-input min-h-20 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>AI Intent Detection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Automatic KYC</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Instant Processing</span>
                </div>
              </div>
              
              <Button
                variant="banking-primary"
                size="xl"
                onClick={handleSubmit}
                disabled={!isFormReady}
                className="min-w-64 group"
              >
                <Brain className="w-6 h-6 mr-3 group-hover:animate-spin" />
                Launch AI Orchestration
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <p className="text-sm text-muted-foreground">
                Our AI agents will process your request in under 5 minutes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}