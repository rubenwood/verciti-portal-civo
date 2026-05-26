"use client";

import { useState } from "react";
import { 
  Search, 
  Settings, 
  GraduationCap, 
  Download, 
  ChevronDown, 
  Clock, 
  Filter, 
  Users, 
  ChevronRight, 
  ChevronLeft,
  Check,
  User,
  BookOpen,
  Scan,
  Cpu,
  Anchor,
  Shield,
  Package,
  Wrench,
  FlaskConical,
  Lightbulb,
  Battery,
  AlertTriangle,
  Sun
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Module {
  id: number;
  name: string;
  icon: string;
  desc: string;
  min: number;
  prog: number;
  status: "Completed" | "In Progress" | "Not Started";
  tone?: "warn";
}

const modules: Module[] = [
  { id: 1, name: "Hydrogen Fundamentals", icon: "book", desc: "To understand the principles of hydrogen fundamentals and how the colours of hydrogen are produced.", min: 7, prog: 100, status: "Completed" },
  { id: 2, name: "Hydrogen Production", icon: "book", desc: "To understand in detail how Hydrogen is produced and processed via the PEM and SMR methods.", min: 11, prog: 92, status: "In Progress" },
  { id: 3, name: "Electrolyser(s)", icon: "scan", desc: "To understand the principles of how an electrolyser functions by exploring how the system utilises water…", min: 13, prog: 78, status: "In Progress" },
  { id: 4, name: "FCEV", icon: "cpu", desc: "To understand the principles of how an FCEV system works in different vehicles.", min: 10, prog: 65, status: "In Progress" },
  { id: 5, name: "Marine", icon: "anchor", desc: "To understand the principles of how a hydrogen powered marine vessel functions by exploring the HICEV…", min: 6, prog: 100, status: "Completed" },
  { id: 6, name: "Health and Safety: Environments", icon: "shield", desc: "About this activity…", min: 11, prog: 85, status: "In Progress" },
  { id: 7, name: "Health and Safety: PPE", icon: "package", desc: "To understand the hydrogen requirements of PPE use in both indoor and outdoor environments,…", min: 9, prog: 90, status: "In Progress" },
  { id: 8, name: "Storage Tanks", icon: "drum", desc: "To understand the principles of how a Hydrogen storage tank or vessel is constructed.", min: 8, prog: 70, status: "In Progress" },
  { id: 9, name: "Plant & Machinery", icon: "wrench", desc: "To understand the principles of how a Hydrogen plant and machinery function, by exploring various…", min: 10, prog: 55, status: "In Progress" },
  { id: 10, name: "R&D Interactive Laboratories", icon: "flask", desc: "Explore hydrogen gas production in the laboratory and how it is used to power products.", min: 6, prog: 100, status: "Completed" },
  { id: 11, name: "Electrical Theory (Fundamentals)", icon: "lightbulb", desc: "Learn the fundamentals of electrical theory.", min: 10, prog: 35, status: "In Progress", tone: "warn" },
  { id: 12, name: "Intermediate Electrical Theory", icon: "scan", desc: "To gain a deeper understanding of electrical theory, including its history, formulas and application.", min: 10, prog: 10, status: "Not Started" },
  { id: 13, name: "Energy Storage", icon: "battery", desc: "Learn all about batteries and how energy is stored.", min: 40, prog: 9, status: "Not Started" },
  { id: 14, name: "Introduction to Power Electronics", icon: "book", desc: "To understand the basics of power electronics and its role in modern energy systems.", min: 10, prog: 0, status: "Not Started" },
  { id: 15, name: "Intermediate Power Electronics", icon: "book", desc: "To explore advanced power electronics concepts and real-world applications.", min: 10, prog: 0, status: "Not Started" },
  { id: 16, name: "Hazardous Voltage Awareness", icon: "alert", desc: "Understand hazardous voltage dangers, safe working practices, and the precautions required…", min: 10, prog: 2, status: "Not Started" },
  { id: 17, name: "Introduction to motors and drives", icon: "battery", desc: "Learn the fundamentals of electric motors and drives and their role in industrial systems.", min: 10, prog: 0, status: "Not Started" },
  { id: 18, name: "Solar Power", icon: "sun", desc: "Learn the basics of solar power, including how sunlight is converted into electricity, benefits…", min: 10, prog: 72, status: "In Progress" },
];

const filterChips = ["All", "In Progress", "Completed", "Role-Based", "Safety", "Electrical", "Hydrogen", "Storage"];

const pathway = [
  { n: 1, name: "Hydrogen Fundamentals", min: 7 },
  { n: 2, name: "Hydrogen Production", min: 11 },
  { n: 3, name: "Electrolyser(s)", min: 13 },
  { n: 4, name: "Storage Tanks", min: 8 },
  { n: 5, name: "Plant & Machinery", min: 10 },
  { n: 6, name: "Health and Safety: Environments", min: 11 },
  { n: 7, name: "Health and Safety: PPE", min: 9 },
  { n: 8, name: "Hazardous Voltage Awareness", min: 10 },
  { n: 9, name: "Introduction to Power Electronics", min: 10 },
  { n: 10, name: "Energy Storage", min: 40 },
];

function getIcon(iconName: string) {
  const icons: Record<string, React.ElementType> = {
    book: BookOpen,
    scan: Scan,
    cpu: Cpu,
    anchor: Anchor,
    shield: Shield,
    package: Package,
    drum: Package,
    wrench: Wrench,
    flask: FlaskConical,
    lightbulb: Lightbulb,
    battery: Battery,
    alert: AlertTriangle,
    sun: Sun,
  };
  return icons[iconName] || BookOpen;
}

function ProgressBar({ pct, tone }: { pct: number; tone?: string }) {
  return (
    <div className="h-1.5 bg-[#1d231f] rounded-sm overflow-hidden flex-1">
      <div 
        className={cn(
          "h-full rounded-sm transition-all",
          tone === "warn" ? "bg-[#f5b942]" : 
          pct < 25 && pct > 0 ? "bg-[#f5b942]" : 
          "bg-[#a3ff3c]"
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function StatusTag({ status }: { status: Module["status"] }) {
  const config = {
    "Completed": { className: "text-[#a3ff3c]", dotClass: "bg-[#a3ff3c]" },
    "In Progress": { className: "text-[#f5b942]", dotClass: "bg-[#f5b942]" },
    "Not Started": { className: "text-[#6e7a70]", dotClass: "border border-[#6e7a70] bg-transparent" },
  };
  const { className, dotClass } = config[status];
  
  return (
    <span className={cn("flex items-center gap-1.5 text-[10.5px]", className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", dotClass)} />
      {status}
    </span>
  );
}

function CourseCard({ module }: { module: Module }) {
  const Icon = getIcon(module.icon);
  
  return (
    <div className="flex gap-3 p-3.5 bg-[#0f1311] border border-[#1c211e] rounded-[10px] transition-colors hover:border-[#232a25]">
      <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-[rgba(163,255,60,0.10)] border border-[rgba(163,255,60,0.20)] flex items-center justify-center text-[#a3ff3c]">
        <Icon className="w-[18px] h-[18px]" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start gap-2">
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-[#e8efe9] leading-tight">{module.name}</div>
          </div>
          <span className="flex items-center gap-1 text-[10.5px] text-[#6e7a70] font-mono whitespace-nowrap">
            <Clock className="w-2.5 h-2.5" />
            ~{module.min} min
          </span>
        </div>
        <p className="text-[11.5px] text-[#a8b3aa] my-1.5 leading-[1.4] line-clamp-3">
          {module.desc}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <ProgressBar pct={module.prog} tone={module.tone} />
          <span className="font-mono text-[11px] text-[#a8b3aa] w-8 text-right">{module.prog}%</span>
        </div>
        <div className="flex justify-between items-center mt-1.5">
          <StatusTag status={module.status} />
        </div>
        {module.status === "Not Started" ? (
          <button className="w-full mt-2 py-1.5 bg-[#a3ff3c] text-[#0a0d0c] border-0 rounded-md text-[11.5px] font-medium hover:brightness-105">
            Assign
          </button>
        ) : (
          <button className="w-full mt-1 pt-2 bg-transparent border-0 text-[#6e7a70] text-[11px] text-left border-t border-[#1c211e] hover:text-[#e8efe9]">
            View Details
          </button>
        )}
      </div>
    </div>
  );
}

export function Learning() {
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  
  const filtered = filter === "All" 
    ? modules 
    : modules.filter(m => m.status === filter || filter === "Role-Based");

  return (
    <div className="space-y-4">
      {/* Action bar */}
      <div className="flex gap-2 justify-end">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] bg-[#0f1311] border border-[#232a25] rounded-lg text-[#e8efe9] hover:bg-[#131815]">
          <Settings className="w-[13px] h-[13px]" />
          Integrations 
          <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-[rgba(96,165,250,0.15)] text-[#60a5fa] border border-[rgba(96,165,250,0.3)]">4</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] bg-[#0f1311] border border-[#232a25] rounded-lg text-[#e8efe9] hover:bg-[#131815]">
          <GraduationCap className="w-[13px] h-[13px]" />
          Verciti Courses
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] bg-[#0f1311] border border-[#232a25] rounded-lg text-[#e8efe9] hover:bg-[#131815]">
          <Download className="w-[13px] h-[13px]" />
          Export / Report
          <ChevronDown className="w-[11px] h-[11px]" />
        </button>
      </div>

      <div className="grid grid-cols-[1fr_360px] gap-5 items-start">
        {/* Main content */}
        <div className="min-w-0">
          <div className="mb-3">
            <h1 className="text-[22px] font-semibold tracking-[-0.02em] text-[#e8efe9] mb-1">
              Course Library &amp; Assignments
            </h1>
            <p className="text-[12.5px] text-[#6e7a70]">
              Explore immersive training modules from Verciti and assign learning to your workforce.
            </p>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-4 bg-[#0f1311] border border-[#1c211e] rounded-[10px] mb-4 overflow-hidden">
            {[
              { label: "Total Modules", val: "21", sub: "Verciti Content" },
              { label: "In Progress", val: "8", sub: "Learners" },
              { label: "Completed", val: "13", sub: "Learners" },
              { label: "Avg. Progress", val: "46%", sub: "Across all learners", accent: true },
            ].map((stat, i) => (
              <div key={i} className={cn("px-4 py-3.5", i < 3 && "border-r border-[#1c211e]")}>
                <div className="text-[11px] text-[#6e7a70] mb-1">{stat.label}</div>
                <div className={cn(
                  "text-[28px] font-semibold tracking-[-0.02em] leading-none",
                  stat.accent ? "text-[#a3ff3c]" : "text-[#e8efe9]"
                )}>
                  {stat.val}
                </div>
                <div className="text-[11px] text-[#6e7a70] mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 flex-wrap mb-3.5">
            {filterChips.map(c => (
              <button 
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "px-3.5 py-1.5 text-[12.5px] rounded-full border transition-colors",
                  filter === c 
                    ? "bg-[#a3ff3c] text-[#0a0d0c] border-[#a3ff3c] font-medium" 
                    : "bg-[#0f1311] border-[#232a25] text-[#a8b3aa] hover:border-[#6e7a70] hover:text-[#e8efe9]"
                )}
              >
                {c}
              </button>
            ))}
            <button className="px-3.5 py-1.5 text-[12.5px] rounded-full bg-[#0f1311] border border-[#232a25] text-[#a8b3aa] hover:border-[#6e7a70] hover:text-[#e8efe9] flex items-center gap-1.5">
              More <ChevronDown className="w-[11px] h-[11px]" />
            </button>
          </div>

          {/* Search row */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 flex items-center gap-2 px-2.5 py-1.5 bg-[#0f1311] border border-[#232a25] rounded-lg text-[#6e7a70]">
              <Search className="w-[13px] h-[13px]" />
              <input 
                type="text"
                placeholder="Search modules by name, topic or keyword…"
                className="flex-1 bg-transparent border-0 outline-none text-[#e8efe9] text-[12px] placeholder:text-[#6e7a70]"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] bg-transparent border border-[#232a25] rounded-lg text-[#e8efe9] hover:bg-[#131815]">
              <Filter className="w-[13px] h-[13px]" />
              Filters
              <ChevronDown className="w-[11px] h-[11px]" />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] bg-[#a3ff3c] text-[#0a0d0c] border-0 rounded-lg font-medium hover:bg-[#7fd62e]">
              <Users className="w-[13px] h-[13px]" />
              Assign Modules
            </button>
          </div>

          {/* Course grid */}
          <div className="grid grid-cols-4 gap-3">
            {filtered.map(m => (
              <CourseCard key={m.id} module={m} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-3.5">
            <span className="text-[#6e7a70] text-[11px]">Showing 1 to 18 of 21 modules</span>
            <div className="flex gap-1">
              <button className="w-7 h-7 bg-[#0f1311] border border-[#232a25] rounded-md flex items-center justify-center text-[#a8b3aa] text-[11px] hover:border-[#6e7a70] hover:text-[#e8efe9]">
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button className="w-7 h-7 bg-[#a3ff3c] text-[#0a0d0c] border border-[#a3ff3c] rounded-md flex items-center justify-center text-[11px] font-medium">
                1
              </button>
              <button className="w-7 h-7 bg-[#0f1311] border border-[#232a25] rounded-md flex items-center justify-center text-[#a8b3aa] text-[11px] hover:border-[#6e7a70] hover:text-[#e8efe9]">
                2
              </button>
              <button className="w-7 h-7 bg-[#0f1311] border border-[#232a25] rounded-md flex items-center justify-center text-[#a8b3aa] text-[11px] hover:border-[#6e7a70] hover:text-[#e8efe9]">
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-3.5 sticky top-4">
          {/* Role header */}
          <div className="flex items-center gap-2 px-3.5 py-3 bg-[#0f1311] border border-[#1c211e] rounded-[10px] text-[13px] font-medium text-[#a8b3aa]">
            <User className="w-3.5 h-3.5" />
            <span>Recommended for Project Manager</span>
            <ChevronDown className="w-[13px] h-[13px] ml-auto text-[#6e7a70]" />
          </div>

          {/* Pathway card */}
          <div className="bg-[#0f1311] border border-[#1c211e] rounded-[10px] p-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[14px] font-semibold text-[#e8efe9]">Hydrogen Project Essentials</span>
              <span className="text-[10px] px-2 py-0.5 rounded border bg-[rgba(192,132,252,0.10)] text-[#c084fc] border-[rgba(192,132,252,0.3)]">
                10 Modules
              </span>
            </div>
            <div className="text-[11px] text-[#6e7a70] mb-3.5">
              Build core knowledge for managing hydrogen projects safely and effectively.
            </div>

            <div className="flex flex-col gap-2.5">
              {pathway.map(p => (
                <div key={p.n} className="flex items-center gap-2.5">
                  <span className="w-[22px] h-[22px] rounded-full bg-[#181e1a] border border-[#232a25] text-[#a8b3aa] flex items-center justify-center font-mono text-[11px] font-medium flex-shrink-0">
                    {p.n}
                  </span>
                  <span className="flex-1 text-[12.5px] text-[#e8efe9]">{p.name}</span>
                  <span className="text-[#6e7a70] text-[11px] font-mono">~{p.min} min</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1c211e]">
              <span className="text-[#6e7a70] text-[11px]">Estimated duration</span>
              <span className="flex items-center gap-1.5 text-[11px]">
                <Clock className="w-[11px] h-[11px] text-[#a3ff3c]" />
                <span className="font-mono">~2h 19m</span>
              </span>
            </div>

            <button className="w-full mt-3.5 py-2.5 bg-[#a3ff3c] text-[#0a0d0c] border-0 rounded-lg text-[12px] font-medium hover:bg-[#7fd62e] flex items-center justify-center">
              Assign Pathway
            </button>
          </div>

          {/* Why this pathway card */}
          <div className="bg-[#0f1311] border border-[#1c211e] rounded-[10px] p-4">
            <div className="text-[12.5px] font-medium text-[#e8efe9] mb-1.5">Why this pathway?</div>
            <div className="text-[#6e7a70] text-[11px] mb-2.5 leading-[1.5]">
              This pathway builds essential technical knowledge and safety awareness for Project Managers leading hydrogen and energy projects.
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#6e7a70]">
              <Check className="w-[11px] h-[11px] text-[#a3ff3c]" />
              Aligned to Project Manager role requirements
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
