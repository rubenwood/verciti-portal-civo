"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Puzzle, Check, Link2, ExternalLink, BookOpen, Users, ShieldCheck, Loader2 } from "lucide-react";
import { trainingProviders } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

// LMS platforms
const lmsPlatforms = [
  { id: "moodle", name: "Moodle", logo: "M", description: "Open-source learning platform" },
  { id: "canvas", name: "Canvas LMS", logo: "C", description: "Cloud-based learning management" },
  { id: "blackboard", name: "Blackboard", logo: "Bb", description: "Enterprise learning platform" },
  { id: "cornerstone", name: "Cornerstone OnDemand", logo: "CO", description: "Talent management LMS" },
  { id: "docebo", name: "Docebo", logo: "D", description: "AI-powered learning platform" },
  { id: "absorb", name: "Absorb LMS", logo: "A", description: "Corporate training LMS" },
];

// HR Systems
const hrSystems = [
  { id: "workday", name: "Workday", logo: "W", description: "Enterprise HR & finance" },
  { id: "bamboohr", name: "BambooHR", logo: "B", description: "HR software for SMBs" },
  { id: "adp", name: "ADP Workforce", logo: "ADP", description: "Payroll & HR management" },
  { id: "sap", name: "SAP SuccessFactors", logo: "SAP", description: "Cloud-based HCM suite" },
  { id: "oracle", name: "Oracle HCM", logo: "O", description: "Human capital management" },
  { id: "personio", name: "Personio", logo: "P", description: "All-in-one HR software" },
];

// Compliance Tools
const complianceTools = [
  { id: "diligent", name: "Diligent", logo: "D", description: "GRC & compliance management" },
  { id: "navex", name: "NAVEX Global", logo: "N", description: "Ethics & compliance software" },
  { id: "sai360", name: "SAI360", logo: "S", description: "Risk & compliance platform" },
  { id: "logicgate", name: "LogicGate", logo: "LG", description: "GRC process automation" },
  { id: "resolver", name: "Resolver", logo: "R", description: "Risk intelligence platform" },
  { id: "onspring", name: "Onspring", logo: "O", description: "GRC & audit management" },
];

// Simulated org-level integrations state
const initialIntegrations = [
  { providerId: "udemy", category: "training", connected: true, connectedAt: "2024-01-15" },
  { providerId: "linkedin", category: "training", connected: true, connectedAt: "2024-02-01" },
  { providerId: "workday", category: "hr", connected: true, connectedAt: "2024-01-20" },
  { providerId: "moodle", category: "lms", connected: true, connectedAt: "2024-02-10" },
];

export function IntegrationsModal() {
  const [open, setOpen] = useState(false);
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = (providerId: string, category: string) => {
    setConnecting(providerId);
    setTimeout(() => {
      setIntegrations(prev => [
        ...prev,
        { providerId, category, connected: true, connectedAt: new Date().toISOString().split('T')[0] }
      ]);
      setConnecting(null);
    }, 1500);
  };

  const handleDisconnect = (providerId: string) => {
    setIntegrations(prev => prev.filter(i => i.providerId !== providerId));
  };

  const isConnected = (providerId: string) => 
    integrations.some(i => i.providerId === providerId && i.connected);

  const getConnectionDate = (providerId: string) => {
    const integration = integrations.find(i => i.providerId === providerId);
    return integration?.connectedAt;
  };

  const connectedCount = integrations.filter(i => i.connected).length;
  const providersWithLinking = trainingProviders.filter(p => p.supportsAccountLinking);

  const renderPlatformCard = (
    platform: { id: string; name: string; logo: string; description?: string },
    category: string,
    showDescription = true
  ) => {
    const connected = isConnected(platform.id);
    
    if (connected) {
      return (
        <div
          key={platform.id}
          className="flex items-center justify-between p-4 rounded-lg bg-success/5 border border-success/20"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center text-success font-semibold text-sm">
              {platform.logo}
            </div>
            <div>
              <p className="font-medium text-sm text-foreground">{platform.name}</p>
              <p className="text-xs text-muted-foreground">
                Connected on {new Date(getConnectionDate(platform.id)!).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-success bg-success/10 px-2 py-1 rounded-full">
              <Check className="h-3 w-3" />
              Active
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive text-xs h-7"
              onClick={() => handleDisconnect(platform.id)}
            >
              Disconnect
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div
        key={platform.id}
        className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border hover:border-primary/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground font-semibold text-sm">
            {platform.logo}
          </div>
          <div>
            <p className="font-medium text-sm text-foreground">{platform.name}</p>
            {showDescription && platform.description && (
              <p className="text-xs text-muted-foreground">{platform.description}</p>
            )}
          </div>
        </div>
        <Button
          size="sm"
          className="h-8"
          disabled={connecting === platform.id}
          onClick={() => handleConnect(platform.id, category)}
        >
          {connecting === platform.id ? (
            <>
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <ExternalLink className="mr-2 h-3 w-3" />
              Connect
            </>
          )}
        </Button>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-border h-8 px-4 text-sm">
          <Puzzle className="mr-2 h-4 w-4" />
          Integrations
          {connectedCount > 0 && (
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
              {connectedCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Platform Integrations</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Connect external platforms to sync training, HR data, and compliance records.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="training" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="training" className="text-xs">
              <BookOpen className="h-3 w-3 mr-1.5" />
              Training
            </TabsTrigger>
            <TabsTrigger value="lms" className="text-xs">
              <BookOpen className="h-3 w-3 mr-1.5" />
              LMS
            </TabsTrigger>
            <TabsTrigger value="hr" className="text-xs">
              <Users className="h-3 w-3 mr-1.5" />
              HR Systems
            </TabsTrigger>
            <TabsTrigger value="compliance" className="text-xs">
              <ShieldCheck className="h-3 w-3 mr-1.5" />
              Compliance
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto mt-4 pr-2 -mr-2">
            {/* Training Providers Tab */}
            <TabsContent value="training" className="mt-0 space-y-6">
              {/* Connected Training Providers */}
              {integrations.filter(i => i.category === "training" && i.connected).length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" />
                    Connected
                  </h3>
                  <div className="grid gap-3">
                    {trainingProviders
                      .filter(p => isConnected(p.id))
                      .map((provider) => renderPlatformCard(
                        { id: provider.id, name: provider.name, logo: provider.logo },
                        "training"
                      ))}
                  </div>
                </div>
              )}

              {/* Available with Account Linking */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-primary" />
                  Available Integrations
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Users can link their accounts to automatically sync course completions.
                </p>
                <div className="grid gap-3">
                  {providersWithLinking
                    .filter(p => !isConnected(p.id))
                    .map((provider) => renderPlatformCard(
                      { id: provider.id, name: provider.name, logo: provider.logo, description: "Supports automatic completion sync" },
                      "training"
                    ))}
                </div>
              </div>

              {/* Manual Upload Only */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  Manual Upload Only
                </h3>
                <div className="grid gap-2">
                  {trainingProviders
                    .filter(p => !p.supportsAccountLinking && p.id !== "other")
                    .map((provider) => (
                      <div
                        key={provider.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/10"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground text-sm font-semibold">
                            {provider.logo}
                          </div>
                          <p className="font-medium text-sm text-foreground">{provider.name}</p>
                        </div>
                        <span className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                          No API
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>

            {/* LMS Tab */}
            <TabsContent value="lms" className="mt-0 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-foreground mb-2">Learning Management Systems</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Connect your existing LMS to sync course catalogues, enrolments, and completion data.
                </p>
                <div className="grid gap-3">
                  {lmsPlatforms.map((platform) => renderPlatformCard(platform, "lms"))}
                </div>
              </div>
            </TabsContent>

            {/* HR Systems Tab */}
            <TabsContent value="hr" className="mt-0 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-foreground mb-2">HR & People Systems</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Sync employee data, org structures, and job roles to automate training assignments.
                </p>
                <div className="grid gap-3">
                  {hrSystems.map((platform) => renderPlatformCard(platform, "hr"))}
                </div>
              </div>
            </TabsContent>

            {/* Compliance Tab */}
            <TabsContent value="compliance" className="mt-0 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-foreground mb-2">Compliance & GRC Tools</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Integrate compliance platforms to track certifications against regulatory requirements.
                </p>
                <div className="grid gap-3">
                  {complianceTools.map((platform) => renderPlatformCard(platform, "compliance"))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="pt-4 border-t border-border mt-4">
          <p className="text-xs text-muted-foreground">
            Need to integrate with a platform not listed here?{" "}
            <button className="text-primary hover:underline">Contact support</button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
