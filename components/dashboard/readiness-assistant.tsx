"use client";

import { useState } from "react";
import { 
  Sparkles, Info, MessageSquare, HelpCircle, Check, TrendingUp, 
  FileText, Mail, Shield, Plus, Download, Copy, Edit, Users, Send
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ReadinessAssistant() {
  const [conversation] = useState([
    {
      role: "user",
      text: "Why is Aberdeen Hydrogen Plant at risk?"
    },
    {
      role: "assistant",
      text: "Aberdeen Hydrogen Plant is currently at risk because readiness is 62% against an 85% mobilisation threshold. The main drivers are:\n\n• 76 staff still needed across five critical roles\n• HV authorisation evidence missing for 12 workers\n• Hydrogen emergency response refresher overdue for 18 workers\n• Evidence completion is 68%, below the 85% target\n• Site induction scheduling is not confirmed\n\nRecommended next step: prioritise evidence requests, refresher sessions and site induction scheduling within the next 7 days.",
      sources: ["Mobilisation Timeline", "Evidence Vault", "Supplier Readiness", "Readiness Rules"]
    }
  ]);

  const suggestedQuestions = [
    "Why is this project at risk?",
    "Which suppliers are blocking mobilisation?",
    "What evidence is missing?",
    "Which actions would improve readiness fastest?",
    "Draft a supplier evidence request.",
    "Generate a board summary.",
    "Explain the readiness forecast.",
  ];

  const suggestedActions = [
    { action: "Escalate HV authorisation evidence request", owner: "Supplier B", impact: "+12 workers toward readiness" },
    { action: "Schedule H2 emergency response refresher", owner: "Training provider", impact: "+18 workers from Not Authorised to Conditional" },
    { action: "Confirm site induction slots", owner: "Site authority", impact: "+41 workers from Conditional to Deployment-ready" },
    { action: "Add assessor capacity", owner: "Assessor network", impact: "23 assessment records verified" },
  ];

  const guardrails = [
    "Uses verified TRACE data only",
    "Shows source context for summaries",
    "Does not certify readiness",
    "Does not override assessor decisions",
    "Does not expose restricted evidence without permission",
    "Produces drafts for human review",
    "Does not make final safety, readiness or authorisation decisions",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">TRACE Readiness Assistant</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Evidence-aware support for readiness decisions.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Context Card */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Current Context</span>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {[
              { label: "Context", value: "Aberdeen Hydrogen Plant" },
              { label: "Status", value: <Badge className="bg-warning/20 text-warning text-[10px]">At Risk</Badge> },
              { label: "Readiness", value: "62%" },
              { label: "Mobilisation date", value: "25 May 2025" },
              { label: "Evidence confidence", value: "Medium" },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-[10px] text-muted-foreground mb-1">{item.label}</div>
                <div className="text-sm font-medium">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Conversation</span>
          </div>
          
          <div className="space-y-4 mb-4">
            {conversation.map((msg, i) => (
              <div key={i} className={cn("flex gap-3", msg.role === "user" && "justify-end")}>
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  msg.role === "user" 
                    ? "bg-primary/10 text-primary order-2"
                    : "bg-muted text-muted-foreground"
                )}>
                  {msg.role === "user" ? (
                    <span className="text-xs font-medium">EO</span>
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                </div>
                <div className={cn(
                  "flex-1 max-w-[80%]",
                  msg.role === "user" && "order-1"
                )}>
                  <div className={cn(
                    "p-3 rounded-xl text-sm whitespace-pre-wrap",
                    msg.role === "user" 
                      ? "bg-primary/10 text-foreground"
                      : "bg-muted/50 text-foreground"
                  )}>
                    {msg.text}
                  </div>
                  {msg.sources && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.sources.map((s, j) => (
                        <Badge key={j} variant="outline" className="text-[9px] px-1.5 py-0.5">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Input 
              placeholder="Ask about readiness, evidence, risks or actions..." 
              className="flex-1 h-10 text-sm"
            />
            <Button size="sm" className="h-10 px-4">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Suggested Questions</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, i) => (
              <button 
                key={i} 
                className="px-3 py-1.5 rounded-full text-xs border border-border bg-muted/30 hover:bg-muted transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Suggested Actions */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-1">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Suggested Actions</span>
            </div>
            <div className="text-[10px] text-muted-foreground mb-4">Based on platform data</div>
            
            <div className="space-y-2 mb-4">
              {suggestedActions.map((item, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/30 border border-border">
                  <div className="text-xs font-semibold mb-1">{item.action}</div>
                  <div className="text-[10px] text-muted-foreground mb-0.5">Owner: {item.owner}</div>
                  <div className="text-[10px] text-primary">{item.impact}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" className="text-xs h-7">Create Actions</Button>
              <Button variant="ghost" size="sm" className="text-xs h-7">Edit Before Creating</Button>
              <Button variant="ghost" size="sm" className="text-xs h-7">Dismiss</Button>
            </div>
          </div>

          {/* Assistant Impact */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Assistant Impact</span>
            </div>
            
            <div className="space-y-3 mb-4">
              {[
                { label: "Summaries generated", value: "28" },
                { label: "Actions drafted", value: "41" },
                { label: "Evidence requests drafted", value: "16" },
                { label: "Reports supported", value: "9" },
                { label: "Average time saved", value: "3.2 hrs/week" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-semibold">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-muted/30 text-[10px] text-muted-foreground leading-relaxed">
              Keep this subtle. Do not make AI the main product.
            </div>
          </div>
        </div>

        {/* Board Summary Generator */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Generate Board Summary</span>
          </div>
          
          <div className="mb-4">
            <div className="text-[10px] text-muted-foreground mb-2">Prompt</div>
            <Input 
              defaultValue="Generate a one-page board summary for Aberdeen Hydrogen Plant readiness."
              className="text-xs"
            />
          </div>

          <div className="p-4 rounded-lg bg-muted/30 text-sm leading-relaxed mb-4">
            Aberdeen Hydrogen Plant remains <strong>At Risk</strong> with 62% readiness against an 85% threshold. Current blockers relate to HV authorisation evidence, hydrogen emergency response refreshers, site induction scheduling and assessment verification. If recommended recovery actions are completed within 7 days, readiness is forecast to improve to 85%.
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" className="text-xs">
              <Plus className="h-3 w-3 mr-1.5" />Insert into Readiness Pack
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Download className="h-3 w-3 mr-1.5" />Export Summary
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <Copy className="h-3 w-3 mr-1.5" />Copy Text
            </Button>
          </div>
        </div>

        {/* Evidence Request Drafting */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Draft Evidence Request</span>
          </div>
          
          <div className="mb-4">
            <div className="text-[10px] text-muted-foreground mb-2">Prompt</div>
            <Input 
              defaultValue="Draft a supplier evidence request for missing HV authorisation evidence."
              className="text-xs"
            />
          </div>

          <div className="p-4 rounded-lg bg-muted/30 text-sm leading-relaxed mb-4">
            Please provide current high-voltage authorisation evidence for the 12 workers listed in the Supplier B readiness queue. Evidence should include current employer authorisation, issue date, expiry date and verification contact. This evidence is required to support project mobilisation readiness for Aberdeen Hydrogen Plant.
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" className="text-xs">
              <Send className="h-3 w-3 mr-1.5" />Send Request
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Edit className="h-3 w-3 mr-1.5" />Edit Draft
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <Users className="h-3 w-3 mr-1.5" />Attach Worker List
            </Button>
          </div>
        </div>

        {/* Assistant Guardrails */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Assistant Guardrails</span>
          </div>
          <div className="text-[10px] text-muted-foreground mb-4">How the assistant operates</div>
          
          <div className="grid grid-cols-2 gap-2">
            {guardrails.map((g, i) => (
              <div key={i} className="flex items-start gap-2">
                <Check className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-xs">{g}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border text-xs text-muted-foreground">
        <Badge variant="outline" className="text-[10px]">Prototype</Badge>
        <span>Prototype view using illustrative data. TRACE Readiness Assistant supports explanation and reporting on verified platform data. It does not replace human assurance, assessor review or site authority decisions.</span>
        <span className="ml-auto">Secured by verciti TRACE</span>
      </div>
    </div>
  );
}
