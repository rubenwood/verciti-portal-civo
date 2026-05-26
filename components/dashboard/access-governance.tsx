"use client";

import { useState } from "react";
import { 
  History, Download, Plus, Share2, Users, Link, Lock, Fingerprint, 
  Eye, Shield, Check, X, Settings, Clock, Building, GraduationCap,
  FileText, AlertCircle, MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stakeholderTones = {
  anchor: { color: "hsl(var(--primary))", line: "hsl(var(--primary)/0.3)", soft: "hsl(var(--primary)/0.1)", ic: Building },
  supply: { color: "#2dd4bf", line: "rgba(45,212,191,0.3)", soft: "rgba(45,212,191,0.1)", ic: Users },
  gov: { color: "#60a5fa", line: "rgba(96,165,250,0.3)", soft: "rgba(96,165,250,0.1)", ic: Building },
  provider: { color: "#c084fc", line: "rgba(192,132,252,0.3)", soft: "rgba(192,132,252,0.1)", ic: GraduationCap },
};

export function AccessGovernance() {
  const roleMatrix = [
    { tone: "anchor", stake: "Anchor Employer", view: "Project readiness", can: ["Supplier readiness", "Role gaps", "Evidence confidence", "Project risks"], cant: ["Private supplier commercial data"] },
    { tone: "supply", stake: "Supply Chain", view: "Supplier workspace", can: ["Own workers", "Own evidence gaps", "Assigned actions", "Project requests"], cant: ["Other suppliers' workforce records"] },
    { tone: "gov", stake: "Government / Funder", view: "Regional readiness", can: ["Aggregated readiness", "Skills gaps", "Funded outcomes"], cant: ["Personal worker records"] },
    { tone: "provider", stake: "Education Provider", view: "Provider dashboard", can: ["Cohorts", "Modules", "Assessments", "Evidence generated"], cant: ["Employer-sensitive supplier data"] },
  ];

  const evidenceRules = [
    { type: "Worker identity evidence", visibility: "Restricted", rule: "Employer / authorised assessor only", tone: "blocked" },
    { type: "Training completion", visibility: "Shared by permission", rule: "Employer, provider, assessor", tone: "training" },
    { type: "Practical assessment", visibility: "Restricted", rule: "Assessor verified; shared with project owner by rule", tone: "blocked" },
    { type: "Supplier readiness summary", visibility: "Shareable", rule: "Anchor employer / project owner", tone: "ready" },
    { type: "Regional readiness data", visibility: "Aggregated", rule: "Government / funder anonymised view", tone: "evidence" },
    { type: "Medical / fitness evidence", visibility: "Highly restricted", rule: "Status only unless authorised", tone: "blocked" },
  ];

  const auditLog = [
    { time: "14 May 2025, 09:32", user: "E. Okafor", action: "Changed evidence visibility", object: "HV certificate bundle" },
    { time: "14 May 2025, 09:18", user: "M. Patel", action: "Approved evidence access", object: "GreenVolt Ltd" },
    { time: "13 May 2025, 16:14", user: "S. Turner", action: "Generated anonymised report", object: "Regional dashboard" },
    { time: "12 May 2025, 11:08", user: "A. Singh", action: "Restricted medical evidence view", object: "Worker record" },
  ];

  const organizations = [
    { name: "Project Owner Demo", access: "Full project ecosystem view", role: "anchor", roleLbl: "Anchor Employer / Project Owner" },
    { name: "GreenVolt Ltd", access: "Own organisation only", role: "supply", roleLbl: "Supply Chain Organisation" },
    { name: "Regional Skills Authority", access: "Aggregated regional view", role: "gov", roleLbl: "Government / Funder" },
    { name: "College Partner A", access: "Assigned cohorts and evidence", role: "provider", roleLbl: "Education / Training Provider" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Access & Governance</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mt-1">
            Manage stakeholder permissions, evidence visibility, data-sharing rules and audit controls across the readiness ecosystem.
          </p>
          <p className="text-xs text-muted-foreground italic mt-1 max-w-2xl">
            Trace is designed for multi-stakeholder ecosystems where each organisation needs controlled access to the readiness data relevant to its role.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <History className="h-4 w-4 mr-2" />Audit log
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />Export governance report
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />Create sharing rule
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-6 gap-3">
        {[
          { icon: Share2, label: "Active Organisations", value: "64", sub: "Across ecosystem" },
          { icon: Users, label: "User Roles Configured", value: "12", sub: "Permission groups" },
          { icon: Link, label: "Evidence Sharing Rules", value: "28", sub: "Active rules" },
          { icon: Lock, label: "Restricted Evidence Items", value: "416", sub: "Permission controlled" },
          { icon: Fingerprint, label: "Audit Events Logged", value: "12,842", sub: "Last 90 days" },
          { icon: Eye, label: "Anonymised Reports", value: "18", sub: "Government / funder views" },
        ].map((kpi, i) => (
          <div key={i} className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <kpi.icon className="h-3.5 w-3.5" />
              </div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
            </div>
            <div className="text-xl font-semibold">{kpi.value}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Governance Note */}
      <div className="p-4 rounded-xl border border-warning/30 bg-gradient-to-r from-warning/5 to-transparent">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-warning">Governance note</div>
            <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
              This prototype illustrates role-based access concepts. Production deployment would require customer-specific permission models, data protection review, data-sharing agreements and secure authentication architecture.
            </div>
          </div>
        </div>
      </div>

      {/* Role-Based Access Matrix */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <div className="text-sm font-medium">Role-Based Access Matrix</div>
          <div className="text-[10px] text-muted-foreground">What each stakeholder type can and cannot see in the shared ecosystem</div>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-4 py-2 font-normal">Stakeholder</th>
              <th className="text-left px-4 py-2 font-normal">Primary View</th>
              <th className="text-left px-4 py-2 font-normal">Can See</th>
              <th className="text-left px-4 py-2 font-normal">Cannot See</th>
            </tr>
          </thead>
          <tbody>
            {roleMatrix.map((r, i) => {
              const t = stakeholderTones[r.tone as keyof typeof stakeholderTones];
              return (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="px-4 py-2.5">
                    <Badge 
                      variant="outline" 
                      className="text-[10px]"
                      style={{ color: t.color, borderColor: t.line, background: t.soft }}
                    >
                      <t.ic className="h-2.5 w-2.5 mr-1" />
                      {r.stake}
                    </Badge>
                  </td>
                  <td className="px-4 py-2.5 font-medium">{r.view}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex flex-wrap gap-1">
                      {r.can.map((c, j) => (
                        <Badge key={j} className="bg-success/20 text-success text-[9px] px-1.5">
                          <Check className="h-2 w-2 mr-0.5" />{c}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex flex-wrap gap-1">
                      {r.cant.map((c, j) => (
                        <Badge key={j} className="bg-destructive/20 text-destructive text-[9px] px-1.5">
                          <X className="h-2 w-2 mr-0.5" />{c}
                        </Badge>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Evidence Visibility Rules + Audit Log */}
        <div className="col-span-7 space-y-4">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <div className="text-sm font-medium">Evidence Visibility Rules</div>
              <div className="text-[10px] text-muted-foreground">Default rules governing how evidence is shared across the ecosystem</div>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left px-4 py-2 font-normal">Evidence Type</th>
                  <th className="text-left px-4 py-2 font-normal">Visibility</th>
                  <th className="text-left px-4 py-2 font-normal">Default Rule</th>
                </tr>
              </thead>
              <tbody>
                {evidenceRules.map((r, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="px-4 py-2.5 font-medium">{r.type}</td>
                    <td className="px-4 py-2.5">
                      <Badge className={cn(
                        "text-[10px]",
                        r.tone === "blocked" && "bg-destructive/20 text-destructive",
                        r.tone === "training" && "bg-blue-500/20 text-blue-400",
                        r.tone === "ready" && "bg-success/20 text-success",
                        r.tone === "evidence" && "bg-muted text-muted-foreground"
                      )}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1" />
                        {r.visibility}
                      </Badge>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">{r.rule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Audit Log</div>
                <div className="text-[10px] text-muted-foreground">Append-only record of governance actions</div>
              </div>
              <button className="text-xs text-primary hover:underline">View full audit log →</button>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left px-4 py-2 font-normal">Time</th>
                  <th className="text-left px-4 py-2 font-normal">User</th>
                  <th className="text-left px-4 py-2 font-normal">Action</th>
                  <th className="text-left px-4 py-2 font-normal">Object</th>
                  <th className="text-left px-4 py-2 font-normal">Result</th>
                </tr>
              </thead>
              <tbody>
                {auditLog.map((r, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="px-4 py-2.5 font-mono text-[10px] text-muted-foreground">{r.time}</td>
                    <td className="px-4 py-2.5">{r.user}</td>
                    <td className="px-4 py-2.5">{r.action}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{r.object}</td>
                    <td className="px-4 py-2.5">
                      <Badge className="bg-success/20 text-success text-[10px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-success mr-1" />Logged
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Organization Permissions + Actions */}
        <div className="col-span-5 space-y-4">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <div className="text-sm font-medium">Organisation Permissions</div>
              <div className="text-[10px] text-muted-foreground">Active organisations and their access level</div>
            </div>
            <div>
              {organizations.map((o, i) => {
                const t = stakeholderTones[o.role as keyof typeof stakeholderTones];
                return (
                  <div key={i} className="px-4 py-3 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div 
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: t.soft, color: t.color, border: `1px solid ${t.line}` }}
                      >
                        <t.ic className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm font-semibold flex-1">{o.name}</span>
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-2 pl-10 text-[10px]">
                      <Badge 
                        variant="outline" 
                        className="text-[9px] px-1.5"
                        style={{ color: t.color, borderColor: t.line, background: t.soft }}
                      >
                        {o.roleLbl}
                      </Badge>
                      <span className="text-muted-foreground">{o.access}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-medium mb-1">Governance Actions</div>
            <div className="text-[10px] text-muted-foreground mb-4">Manage permissions, sharing rules and retention</div>
            <div className="space-y-2">
              {[
                { icon: Users, label: "Configure role permissions", primary: true },
                { icon: Plus, label: "Create evidence sharing rule" },
                { icon: History, label: "Review audit log" },
                { icon: Download, label: "Export governance report" },
                { icon: Eye, label: "Manage anonymised views" },
                { icon: Clock, label: "Configure data retention" },
              ].map((action, i) => (
                <Button 
                  key={i} 
                  variant={action.primary ? "default" : "outline"} 
                  size="sm" 
                  className="w-full justify-start text-xs h-9"
                >
                  <action.icon className="h-3.5 w-3.5 mr-2" />{action.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border text-xs text-muted-foreground">
        <Badge variant="outline" className="text-[10px]">Prototype</Badge>
        <span>Prototype view using illustrative data. Production requires specific governance, access control architecture and data protection review.</span>
        <span className="ml-auto">Secured by verciti TRACE</span>
      </div>
    </div>
  );
}
