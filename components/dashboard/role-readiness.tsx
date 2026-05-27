"use client";

import { Button } from "@/components/ui/button";
import { Filter, Download, Zap, FlameKindling } from "lucide-react";
import { cn } from "@/lib/utils";

type RiskLevel = "red" | "amber" | "green";

interface RoleData {
  role: string;
  needed: number;
  ready: number;
  inTraining: number;
  conditional: number;
  blocked: number;
  risk: RiskLevel;
}

const roleData: RoleData[] = [
  { role: "Electrical installer", needed: 128, ready: 76, inTraining: 25, conditional: 9, blocked: 18, risk: "amber" },
  { role: "Hydrogen technician", needed: 88, ready: 52, inTraining: 14, conditional: 8, blocked: 6, risk: "amber" },
  { role: "High-voltage engineer", needed: 35, ready: 19, inTraining: 6, conditional: 4, blocked: 6, risk: "red" },
  { role: "Maintenance technician", needed: 68, ready: 42, inTraining: 10, conditional: 5, blocked: 3, risk: "amber" },
  { role: "Emergency response lead", needed: 12, ready: 7, inTraining: 2, conditional: 1, blocked: 2, risk: "red" },
];

const hydrogenRequirements = [
  "Hydrogen safety module complete",
  "Practical assessment verified",
  "Employer sign-off",
  "Emergency response refresher current",
  "Site induction pending or complete",
];

const electricalRequirements = [
  "Electrical safety training complete",
  "High-voltage awareness complete",
  "Employer verification",
  "Evidence of relevant certification",
  "Expiry dates current",
];

function RiskBadge({ risk }: { risk: RiskLevel }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium",
        risk === "red" && "bg-destructive/20 text-destructive",
        risk === "amber" && "bg-warning/20 text-warning",
        risk === "green" && "bg-success/20 text-success"
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          risk === "red" && "bg-destructive",
          risk === "amber" && "bg-warning",
          risk === "green" && "bg-success"
        )}
      />
      {risk === "red" ? "Red" : risk === "amber" ? "Amber" : "Green"}
    </span>
  );
}

function ProgressBadge({ percent }: { percent: number }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium",
        percent >= 65 ? "bg-success/20 text-success" : percent >= 55 ? "bg-warning/20 text-warning" : "bg-destructive/20 text-destructive"
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          percent >= 65 ? "bg-success" : percent >= 55 ? "bg-warning" : "bg-destructive"
        )}
      />
      {percent}%
    </span>
  );
}

export function RoleReadiness() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#6e7a70]">
        <span>Regional Net Zero Infrastructure Workforce Readiness Programme</span>
        <span>/</span>
        <span>Workspace</span>
        <span>/</span>
        <span className="text-[#e8efe9]">Role Readiness</span>
      </div>

      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#e8efe9] mb-1">Role Readiness</h1>
          <p className="text-sm text-[#6e7a70]">
            Where headcount falls short of programme requirements — by role, status and risk band.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-8 px-3 text-sm border-border/50 bg-card/30">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="h-8 px-3 text-sm border-border/50 bg-card/30">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Role Gap Matrix Table */}
      <div className="bg-card/30 border border-border/50 rounded-lg p-4">
        <div className="mb-4">
          <h2 className="text-sm font-medium text-[#e8efe9]">Role gap matrix</h2>
          <p className="text-xs text-[#6e7a70]">Needed vs Ready - with conditional, in-training and blocked breakdown</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-xs text-[#6e7a70] border-b border-border/30">
              <th className="text-left pb-3 font-normal">Role</th>
              <th className="text-center pb-3 font-normal">Needed</th>
              <th className="text-center pb-3 font-normal">Ready</th>
              <th className="text-center pb-3 font-normal">In training</th>
              <th className="text-center pb-3 font-normal">Conditional</th>
              <th className="text-center pb-3 font-normal">Blocked</th>
              <th className="text-center pb-3 font-normal">Risk</th>
            </tr>
          </thead>
          <tbody>
            {roleData.map((row, i) => (
              <tr key={i} className="border-b border-border/20 last:border-0">
                <td className="py-3 text-sm font-medium text-[#e8efe9]">{row.role}</td>
                <td className="py-3 text-sm text-center text-[#6e7a70]">{row.needed}</td>
                <td className="py-3 text-sm text-center text-success font-medium">{row.ready}</td>
                <td className="py-3 text-sm text-center text-[#60a5fa]">{row.inTraining}</td>
                <td className="py-3 text-sm text-center text-warning">{row.conditional}</td>
                <td className="py-3 text-sm text-center text-destructive">{row.blocked}</td>
                <td className="py-3 text-center">
                  <RiskBadge risk={row.risk} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Section - Two Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Needed vs Ready Bar Chart */}
        <div className="bg-card/30 border border-border/50 rounded-lg p-4">
          <div className="mb-4">
            <h2 className="text-sm font-medium text-[#e8efe9]">Needed vs Ready</h2>
            <p className="text-xs text-[#6e7a70]">Bar chart by role - marker shows target requirement</p>
          </div>
          <div className="space-y-4">
            {roleData.map((row, i) => {
              const percent = Math.round((row.ready / row.needed) * 100);
              const barColor = percent >= 65 ? "bg-success" : percent >= 55 ? "bg-warning" : "bg-destructive";
              return (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-40 text-sm text-[#e8efe9] shrink-0">{row.role}</div>
                  <div className="flex-1 h-4 bg-[#1a1f1c] rounded-full relative overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", barColor)}
                      style={{ width: `${percent}%` }}
                    />
                    {/* Target marker */}
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-[#6e7a70]"
                      style={{ left: '100%', transform: 'translateX(-2px)' }}
                    />
                  </div>
                  <div className="w-16 text-xs text-[#6e7a70] text-right shrink-0">
                    {row.ready} / {row.needed}
                  </div>
                  <ProgressBadge percent={percent} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Readiness Rules */}
        <div className="bg-card/30 border border-border/50 rounded-lg p-4 flex flex-col">
          <div className="mb-4">
            <h2 className="text-sm font-medium text-[#e8efe9]">Readiness rules</h2>
            <p className="text-xs text-[#6e7a70]">Per-role requirement library — evaluated by Trace on every evidence change</p>
          </div>
          
          <div className="flex-1 space-y-4">
            {/* Hydrogen Technician */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#a3ff3c]/20 flex items-center justify-center">
                  <FlameKindling className="h-3.5 w-3.5 text-[#a3ff3c]" />
                </div>
                <span className="text-sm font-medium text-[#e8efe9]">Hydrogen Technician requires</span>
              </div>
              <div className="pl-8 space-y-1">
                {hydrogenRequirements.map((req, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#6e7a70]">
                    <span className="text-success">✓</span>
                    {req}
                  </div>
                ))}
              </div>
            </div>

            {/* Electrical Installer */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-warning/20 flex items-center justify-center">
                  <Zap className="h-3.5 w-3.5 text-warning" />
                </div>
                <span className="text-sm font-medium text-[#e8efe9]">Electrical Installer requires</span>
              </div>
              <div className="pl-8 space-y-1">
                {electricalRequirements.map((req, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#6e7a70]">
                    <span className="text-success">✓</span>
                    {req}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Formula Bar */}
          <div className="mt-4 pt-4 border-t border-border/30">
            <div className="flex items-center justify-center gap-2 text-xs">
              <span className="px-2 py-1 rounded bg-card/50 border border-border/30 text-[#e8efe9]">Requirements</span>
              <span className="text-[#6e7a70]">+</span>
              <span className="px-2 py-1 rounded bg-card/50 border border-border/30 text-[#e8efe9]">Evidence</span>
              <span className="text-[#6e7a70]">+</span>
              <span className="px-2 py-1 rounded bg-card/50 border border-border/30 text-[#e8efe9]">Expiry</span>
              <span className="text-[#6e7a70]">+</span>
              <span className="px-2 py-1 rounded bg-card/50 border border-border/30 text-[#e8efe9]">Authorisation</span>
              <span className="text-[#6e7a70]">+</span>
              <span className="px-2 py-1 rounded bg-card/50 border border-border/30 text-[#e8efe9]">Safety rules</span>
              <span className="text-[#6e7a70]">=</span>
              <span className="px-2 py-1 rounded bg-primary/20 border border-primary/30 text-primary font-medium">Readiness Status</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
