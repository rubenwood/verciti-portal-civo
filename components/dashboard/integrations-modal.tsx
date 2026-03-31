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
import { Puzzle, Check, Link2, ExternalLink } from "lucide-react";
import { trainingProviders } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

// Simulated org-level integrations state
const initialIntegrations = [
  { providerId: "udemy", connected: true, connectedAt: "2024-01-15" },
  { providerId: "linkedin", connected: true, connectedAt: "2024-02-01" },
];

export function IntegrationsModal() {
  const [open, setOpen] = useState(false);
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = (providerId: string) => {
    setConnecting(providerId);
    // Simulate connection delay
    setTimeout(() => {
      setIntegrations(prev => [
        ...prev,
        { providerId, connected: true, connectedAt: new Date().toISOString().split('T')[0] }
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
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Platform Integrations</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Connect external learning platforms to automatically sync training completions and certifications.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
          {/* Connected Integrations */}
          {connectedCount > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <Check className="h-4 w-4 text-success" />
                Connected ({connectedCount})
              </h3>
              <div className="grid gap-3">
                {trainingProviders
                  .filter(p => isConnected(p.id))
                  .map((provider) => (
                    <div
                      key={provider.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-success/5 border border-success/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center text-success font-semibold">
                          {provider.logo}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">{provider.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Connected on {new Date(getConnectionDate(provider.id)!).toLocaleDateString("en-GB")}
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
                          onClick={() => handleDisconnect(provider.id)}
                        >
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Available Integrations with Account Linking */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Link2 className="h-4 w-4 text-primary" />
              Available Integrations
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              These platforms support automatic account linking. Users can connect their accounts to sync completions automatically.
            </p>
            <div className="grid gap-3">
              {providersWithLinking
                .filter(p => !isConnected(p.id))
                .map((provider) => (
                  <div
                    key={provider.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground font-semibold">
                        {provider.logo}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{provider.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Supports automatic completion sync
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="h-8"
                      disabled={connecting === provider.id}
                      onClick={() => handleConnect(provider.id)}
                    >
                      {connecting === provider.id ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
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
                ))}
            </div>
          </div>

          {/* Manual Upload Only Providers */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              Manual Upload Only
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              These platforms require users to manually upload completion certificates as evidence.
            </p>
            <div className="grid gap-2">
              {trainingProviders
                .filter(p => !p.supportsAccountLinking && p.id !== "other")
                .map((provider) => (
                  <div
                    key={provider.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border border-border/50",
                      "bg-muted/10"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground text-sm font-semibold">
                        {provider.logo}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{provider.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Manual certificate upload required
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                      No API
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

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
