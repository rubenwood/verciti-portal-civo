"use client";

import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Network,
  FolderKanban,
  Map,
  Clock,
  Users,
  Building2,
  Search,
  Target,
  ShieldCheck,
  FileText,
  CheckSquare,
  BarChart3,
  Package,
  Bot,
  Bell,
  Plug,
  Settings2,
  UserCog,
  Lock,
  GraduationCap,
} from "lucide-react";

export type SidebarPage =
  | "overview"
  | "ecosystem"
  | "programmes"
  | "mobilisation-map"
  | "mobilisation-timeline"
  | "workforce-readiness"
  | "supplier-readiness"
  | "supplier-discovery"
  | "role-readiness"
  | "safety-critical"
  | "evidence"
  | "interventions"
  | "learning"
  | "reports"
  | "readiness-pack"
  | "readiness-assistant"
  | "alerts"
  | "integrations"
  | "readiness-rules"
  | "stakeholder-access"
  | "access-governance";

interface SidebarProps {
  activePage: SidebarPage;
  onPageChange: (page: SidebarPage) => void;
  alertCount?: number;
}

const workspaceItems: { id: SidebarPage; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "ecosystem", label: "Ecosystem", icon: Network },
  { id: "programmes", label: "Programmes", icon: FolderKanban },
  { id: "mobilisation-map", label: "Mobilisation Map", icon: Map },
  { id: "mobilisation-timeline", label: "Mobilisation Timeline", icon: Clock },
  { id: "workforce-readiness", label: "Workforce Readiness", icon: Users },
  { id: "supplier-readiness", label: "Supplier Readiness", icon: Building2 },
  { id: "supplier-discovery", label: "Supplier Discovery", icon: Search },
  { id: "role-readiness", label: "Role Readiness", icon: Target },
  { id: "safety-critical", label: "Safety-Critical Assurance", icon: ShieldCheck },
  { id: "evidence", label: "Evidence", icon: FileText },
  { id: "interventions", label: "Interventions", icon: CheckSquare },
  { id: "learning", label: "Learning", icon: GraduationCap },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "readiness-pack", label: "Readiness Pack", icon: Package },
  { id: "readiness-assistant", label: "Readiness Assistant", icon: Bot },
];

const systemItems: { id: SidebarPage; label: string; icon: React.ElementType; badge?: boolean }[] = [
  { id: "alerts", label: "Alerts", icon: Bell, badge: true },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "readiness-rules", label: "Readiness Rules", icon: Settings2 },
  { id: "stakeholder-access", label: "Stakeholder Access", icon: UserCog },
  { id: "access-governance", label: "Access & Governance", icon: Lock },
];

export function Sidebar({ activePage, onPageChange, alertCount = 11 }: SidebarProps) {
  return (
    <aside className="w-[232px] h-screen bg-[#0a0d0c] border-r border-[#1c211e] flex flex-col overflow-hidden">
      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {/* Workspace Section */}
        <div className="mb-6">
          <div className="px-3 mb-2">
            <span className="text-[10px] font-medium tracking-[0.08em] text-[#6e7a70] uppercase">
              Workspace
            </span>
          </div>
          <ul className="space-y-0.5">
            {workspaceItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onPageChange(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-colors",
                      isActive
                        ? "bg-[#a3ff3c]/10 text-[#a3ff3c]"
                        : "text-[#a8b3aa] hover:bg-[#131815] hover:text-[#e8efe9]"
                    )}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-[#a3ff3c]" : "text-[#6e7a70]")} />
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* System Section */}
        <div>
          <div className="px-3 mb-2">
            <span className="text-[10px] font-medium tracking-[0.08em] text-[#6e7a70] uppercase">
              System
            </span>
          </div>
          <ul className="space-y-0.5">
            {systemItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onPageChange(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-colors",
                      isActive
                        ? "bg-[#a3ff3c]/10 text-[#a3ff3c]"
                        : "text-[#a8b3aa] hover:bg-[#131815] hover:text-[#e8efe9]"
                    )}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-[#a3ff3c]" : "text-[#6e7a70]")} />
                    <span className="truncate flex-1 text-left">{item.label}</span>
                    {item.badge && alertCount > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-[#131815] border border-[#232a25] text-[#a8b3aa] rounded">
                        {alertCount}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
