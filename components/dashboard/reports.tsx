"use client";

import { useState } from "react";
import {
  Download,
  Share2,
  Calendar,
  Plus,
  FileText,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type StakeholderView = "enterprise" | "government" | "college" | "investor";

const stakeholderTabs: { id: StakeholderView; label: string }[] = [
  { id: "enterprise", label: "Enterprise / Project Developer" },
  { id: "government", label: "Government / Funder" },
  { id: "college", label: "College / Training Provider" },
  { id: "investor", label: "Investor / Strategic" },
];

const reportSections = [
  { title: "Overall readiness status", description: "Auto-generated from current evidence and readiness state." },
  { title: "Sector readiness", description: "Auto-generated from current evidence and readiness state." },
  { title: "Safety-critical assurance", description: "Auto-generated from current evidence and readiness state." },
  { title: "Evidence coverage", description: "Auto-generated from current evidence and readiness state." },
  { title: "Supply-chain readiness", description: "Auto-generated from current evidence and readiness state." },
  { title: "Role gaps", description: "Auto-generated from current evidence and readiness state." },
  { title: "Expiry & revalidation risk", description: "Auto-generated from current evidence and readiness state." },
  { title: "Recommended interventions", description: "Auto-generated from current evidence and readiness state." },
  { title: "Next mobilisation risks", description: "Auto-generated from current evidence and readiness state." },
];

export function Reports() {
  const [activeView, setActiveView] = useState<StakeholderView>("enterprise");

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#6e7a70]">
        <span>Regional Net Zero Infrastructure Workforce Readiness Programme</span>
        <span>/</span>
        <span>Workspace</span>
        <span>/</span>
        <span className="text-[#e8efe9] font-medium">Reports</span>
      </div>

      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#e8efe9] mb-2">Workforce Readiness Assurance Report</h1>
          <p className="text-sm text-[#6e7a70]">
            Tailored assurance pack for each stakeholder audience. Auto-bundled from the same source of truth.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 px-4 border-border/50 bg-card/30 text-[#e8efe9]">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" className="h-9 px-4 border-border/50 bg-card/30 text-[#e8efe9]">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" className="h-9 px-4 border-border/50 bg-card/30 text-[#e8efe9]">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button className="h-9 px-4 bg-[#a3e635] text-black hover:bg-[#95d62f]">
            <Plus className="mr-2 h-4 w-4" />
            Generate summary
          </Button>
        </div>
      </div>

      {/* Stakeholder Audience Tabs */}
      <div className="flex items-center gap-2">
        {stakeholderTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            className={cn(
              "px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
              activeView === tab.id
                ? "bg-[#a3e635] text-black"
                : "bg-card/30 border border-border/50 text-[#6e7a70] hover:text-[#e8efe9] hover:border-border"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* View Description */}
      <div className="bg-card/30 border border-border/50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-[#e8efe9] mb-1">Enterprise / Project Developer view</h3>
        <p className="text-sm text-[#6e7a70]">Answers: Can we mobilise safely and on time?</p>
      </div>

      {/* KPI Summary Bar */}
      <div className="bg-card/30 border border-border/50 rounded-lg p-5">
        <div className="grid grid-cols-5 gap-8">
          <div>
            <div className="text-xs text-[#6e7a70] uppercase tracking-wide mb-1">Programme Status</div>
            <div className="text-2xl font-semibold text-[#ef4444]">At Risk</div>
          </div>
          <div>
            <div className="text-xs text-[#6e7a70] uppercase tracking-wide mb-1">Readiness Score</div>
            <div className="text-2xl font-semibold text-[#e8efe9]">67%</div>
          </div>
          <div>
            <div className="text-xs text-[#6e7a70] uppercase tracking-wide mb-1">Evidence Confidence</div>
            <div className="text-2xl font-semibold text-[#e8efe9]">Medium</div>
          </div>
          <div>
            <div className="text-xs text-[#6e7a70] uppercase tracking-wide mb-1">Top Risk</div>
            <div className="text-sm font-medium text-[#e8efe9]">High-voltage authorisation gaps</div>
          </div>
          <div>
            <div className="text-xs text-[#6e7a70] uppercase tracking-wide mb-1">Recommended Intervention</div>
            <div className="text-sm font-medium text-[#a3e635]">Evidence request & assessor verification cycle</div>
          </div>
        </div>
      </div>

      {/* Report Section Cards - 3x3 Grid */}
      <div className="grid grid-cols-3 gap-4">
        {reportSections.map((section, i) => (
          <div
            key={i}
            className="bg-card/30 border border-border/50 rounded-lg p-4 hover:border-border transition-colors cursor-pointer group"
          >
            <div className="flex items-start gap-3 mb-3">
              <FileText className="h-5 w-5 text-[#6e7a70] mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-[#e8efe9] mb-1">{section.title}</h3>
                <p className="text-xs text-[#6e7a70]">{section.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[#a3e635] text-sm font-medium group-hover:gap-2 transition-all">
              <span>Open section</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
