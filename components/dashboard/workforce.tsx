"use client";

import { useState } from "react";
import { 
  Users, Check, Shield, Clock, AlertCircle, Upload, Plus, Filter,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export function Workforce() {
  const [activeTab, setActiveTab] = useState("examiners");

  const examiners = [
    { code: "EO", name: "Eniola Okafor", role: "Lead Authorised Examiner", dept: "Inspection Assurance", level: "NDT-3 / ASNT-3", clearance: "SC", status: "active", expires: "Aug 2026", lastSign: "07:11 today" },
    { code: "MW", name: "Marek Wójcik", role: "Robotics Assurance Engineer", dept: "Robotics Engineering", level: "NDT-2 + Trace-A2", clearance: "SC", status: "active", expires: "Mar 2027", lastSign: "06:30 today" },
    { code: "PA", name: "Priya Anand", role: "Reactor Systems Inspector", dept: "Reactor Systems", level: "NDT-3", clearance: "DV", status: "active", expires: "Nov 2026", lastSign: "Yesterday" },
    { code: "JL", name: "Jonas Lindqvist", role: "Independent Nuclear Inspector", dept: "ONR — external", clearance: "DV", level: "ONR-INI", status: "expiring", expires: "Jul 2026", lastSign: "01 May" },
    { code: "RH", name: "Ravi Hegde", role: "NDT Specialist — UT/PA", dept: "Inspection Assurance", level: "NDT-3 / PA-UT", clearance: "SC", status: "active", expires: "Feb 2027", lastSign: "06:14 today" },
    { code: "SK", name: "Sarah Kowalski", role: "Module Acceptance Reviewer", dept: "Module Manufacturing", level: "RR-MAP-04 L3", clearance: "SC", status: "active", expires: "Sep 2026", lastSign: "Today" },
    { code: "TB", name: "Tom Bradshaw", role: "Robotics Assurance Engineer", dept: "Robotics Engineering", level: "Trace-A2", clearance: "SC", status: "training", expires: "—", lastSign: "—" },
    { code: "AC", name: "Aiyana Cross", role: "Examiner — Class 1E Electrical", dept: "Inspection Assurance", level: "NDT-2 / IRSE", clearance: "SC", status: "active", expires: "Apr 2027", lastSign: "05:54 today" },
    { code: "DM", name: "Dimitri Marchetti", role: "Welds Examiner", dept: "Inspection Assurance", level: "NDT-3 / Welding L3", clearance: "SC", status: "expired", expires: "Apr 2026", lastSign: "21 Apr" },
  ];

  const roleDistribution = [
    { name: "Maintenance Technician", pct: "22%", color: "#2dd4bf" },
    { name: "Safety Officer", pct: "20%", color: "#c084fc" },
    { name: "Project Manager", pct: "20%", color: "#f5b942" },
    { name: "Junior Engineer", pct: "18%", color: "#f87171" },
    { name: "Senior Engineer", pct: "12%", color: "#4ade80" },
    { name: "Electrical Engineer", pct: "2%", color: "#a3ff3c" },
    { name: "Technical Lead", pct: "2%", color: "#60a5fa" },
    { name: "Training Coordinator", pct: "2%", color: "#818cf8" },
  ];

  const certificationData = [
    { role: "Electrical Engineer", trained: "100%", certified: "100%", expiring: 0 },
    { role: "Technical Lead", trained: "100%", certified: "100%", expiring: 0 },
    { role: "Maintenance Technician", trained: "73%", certified: "55%", expiring: 2 },
    { role: "Junior Engineer", trained: "78%", certified: "44%", expiring: 0 },
    { role: "Safety Officer", trained: "80%", certified: "70%", expiring: 2 },
    { role: "Senior Engineer", trained: "83%", certified: "67%", expiring: 2 },
    { role: "Project Manager", trained: "80%", certified: "60%", expiring: 2 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Workforce</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mt-1">
            Authorised humans-in-the-loop for autonomous inspection · qualifications continuously verified against ISO 9712, ONR licensee requirements & RR-SMR Module Acceptance procedures
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Filter className="h-4 w-4 mr-2" />Filters
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />Sync from HRIS
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />Add inspector
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { icon: Users, label: "Total Workforce", value: "49", color: "primary" },
          { icon: Check, label: "Trained Staff", value: "38", color: "primary" },
          { icon: Shield, label: "Certified Staff", value: "29", color: "primary" },
          { icon: Clock, label: "Expiring Soon", value: "8", color: "warning" },
          { icon: AlertCircle, label: "Overdue Training", value: "7", color: "destructive" },
        ].map((stat, i) => (
          <div key={i} className="p-4 rounded-xl border border-border bg-card">
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center mb-3",
              stat.color === "primary" && "bg-primary/10 text-primary",
              stat.color === "warning" && "bg-warning/10 text-warning",
              stat.color === "destructive" && "bg-destructive/10 text-destructive"
            )}>
              <stat.icon className="h-4 w-4" />
            </div>
            <div className="text-2xl font-semibold">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/30">
          {[
            { id: "examiners", label: "Authorised Examiners", count: 38 },
            { id: "robotics", label: "Robotics Operators", count: 11 },
            { id: "reviewers", label: "Module Reviewers", count: 7 },
            { id: "external", label: "External Witnesses (ONR)", count: 3 },
          ].map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="text-xs">
              {tab.label} <span className="ml-1.5 text-muted-foreground">({tab.count})</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Charts Row */}
      <div className="grid grid-cols-12 gap-4">
        {/* Pie Chart */}
        <div className="col-span-7 rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <div className="text-sm font-medium">Workforce by Job Role</div>
            <div className="text-[10px] text-muted-foreground">Distribution of inspection-assurance authorisations</div>
          </div>
          <div className="p-5 flex items-center gap-8">
            {/* Donut Chart */}
            <div 
              className="w-[180px] h-[180px] rounded-full relative"
              style={{
                background: `conic-gradient(
                  #2dd4bf 0% 22%, 
                  #c084fc 22% 42%, 
                  #f5b942 42% 62%, 
                  #f87171 62% 80%, 
                  #4ade80 80% 92%, 
                  #a3ff3c 92% 94%, 
                  #60a5fa 94% 96%, 
                  #818cf8 96% 100%
                )`
              }}
            >
              <div className="absolute inset-6 rounded-full bg-card flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold">49</span>
                <span className="text-[10px] text-muted-foreground">authorised</span>
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex-1 space-y-2">
              {roleDistribution.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-sm" style={{ background: item.color }} />
                  <span className="flex-1">{item.name}</span>
                  <span className="font-mono text-muted-foreground">{item.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certification Table */}
        <div className="col-span-5 rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <div className="text-sm font-medium">Training & Certification adequacy</div>
            <div className="text-[10px] text-muted-foreground">By role — last 30 days</div>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left px-4 py-2 font-normal">Role</th>
                <th className="text-right px-4 py-2 font-normal w-20">Trained</th>
                <th className="text-right px-4 py-2 font-normal w-20">Certified</th>
                <th className="text-right px-4 py-2 font-normal w-20">Expiring</th>
              </tr>
            </thead>
            <tbody>
              {certificationData.map((r, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="px-4 py-2">{r.role}</td>
                  <td className="px-4 py-2 text-right">
                    <Badge className={cn(
                      "text-[10px]",
                      parseInt(r.trained) >= 80 ? "bg-success/20 text-success" :
                      parseInt(r.trained) >= 60 ? "bg-warning/20 text-warning" : "bg-destructive/20 text-destructive"
                    )}>
                      {r.trained}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <Badge className={cn(
                      "text-[10px]",
                      parseInt(r.certified) >= 80 ? "bg-success/20 text-success" :
                      parseInt(r.certified) >= 60 ? "bg-warning/20 text-warning" : "bg-destructive/20 text-destructive"
                    )}>
                      {r.certified}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <Badge className={cn(
                      "text-[10px]",
                      r.expiring === 0 ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                    )}>
                      {r.expiring}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Profiles Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <div className="text-sm font-medium">User Profiles</div>
          <div className="text-[10px] text-muted-foreground">View all authorised users with their assurance status, expiry and last sign-off</div>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-4 py-2 font-normal">Examiner</th>
              <th className="text-left px-4 py-2 font-normal">Department</th>
              <th className="text-left px-4 py-2 font-normal">Role</th>
              <th className="text-left px-4 py-2 font-normal">Qualification</th>
              <th className="text-left px-4 py-2 font-normal">Clearance</th>
              <th className="text-left px-4 py-2 font-normal">Expires</th>
              <th className="text-left px-4 py-2 font-normal">Last sign-off</th>
              <th className="text-left px-4 py-2 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {examiners.map((e) => (
              <tr key={e.code} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-xs font-medium">
                      {e.code}
                    </div>
                    <div>
                      <div className="font-medium">{e.name}</div>
                      <div className="text-[10px] text-muted-foreground">{e.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">{e.dept}</td>
                <td className="px-4 py-2.5">{e.role}</td>
                <td className="px-4 py-2.5">
                  <Badge variant="outline" className="text-[10px]">{e.level}</Badge>
                </td>
                <td className="px-4 py-2.5">
                  <Badge variant="outline" className="text-[10px] text-blue-400 border-blue-400/30">{e.clearance}</Badge>
                </td>
                <td className={cn(
                  "px-4 py-2.5 font-mono text-[10px]",
                  e.status === "expired" && "text-destructive",
                  e.status === "expiring" && "text-warning",
                  e.status === "active" && "text-muted-foreground"
                )}>
                  {e.expires}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground text-[10px]">{e.lastSign}</td>
                <td className="px-4 py-2.5">
                  <Badge className={cn(
                    "text-[10px]",
                    e.status === "active" && "bg-success/20 text-success",
                    e.status === "expiring" && "bg-warning/20 text-warning",
                    e.status === "expired" && "bg-destructive/20 text-destructive",
                    e.status === "training" && "bg-blue-500/20 text-blue-400"
                  )}>
                    {e.status === "active" && "Active"}
                    {e.status === "expiring" && "Expiring"}
                    {e.status === "expired" && "Expired"}
                    {e.status === "training" && "In training"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
