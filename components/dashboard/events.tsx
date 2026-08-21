"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  MapPin,
  CalendarDays,
  GraduationCap,
  ShieldCheck,
  ShieldAlert,
  ChevronDown,
  Search,
  CheckCircle2,
  XCircle,
  Circle,
  Users,
  ExternalLink,
} from "lucide-react";

type CategoryStatus = "complete" | "in-progress" | "outstanding";

interface ChecklistItem {
  label: string;
  done: boolean;
}

interface TrainingBreakdown {
  role: string;
  trained: number;
  required: number;
}

interface EventCategory {
  status: CategoryStatus;
  items: ChecklistItem[];
}

interface EventData {
  id: string;
  venue: string;
  location: string;
  date: string;
  capacity: number;
  attendees: number;
  tier: 1 | 2;
  staffTrained: number;
  staffRequired: number;
  inspected: boolean;
  trainingBreakdown: TrainingBreakdown[];
  training: EventCategory;
  inspection: EventCategory;
  insurance: EventCategory;
}

const events: EventData[] = [
  {
    id: "1",
    venue: "Manchester Arena",
    location: "Manchester, Greater Manchester",
    date: "18 Jun 2025",
    capacity: 21000,
    attendees: 19500,
    tier: 2,
    staffTrained: 42,
    staffRequired: 68,
    inspected: false,
    trainingBreakdown: [
      { role: "Approved person / SRI", trained: 2, required: 3 },
      { role: "Bag & search officers", trained: 14, required: 24 },
      { role: "Evacuation marshals", trained: 16, required: 22 },
      { role: "Control room operators", trained: 6, required: 9 },
      { role: "ACT Awareness certified", trained: 4, required: 10 },
    ],
    training: {
      status: "in-progress",
      items: [
        { label: "ACT Awareness e-learning completed", done: true },
        { label: "Search & screening training current", done: false },
        { label: "Evacuation & invacuation drill logged", done: false },
        { label: "Control room briefing delivered", done: true },
      ],
    },
    inspection: {
      status: "outstanding",
      items: [
        { label: "Venue security walkthrough booked", done: false },
        { label: "Vulnerability assessment completed", done: false },
        { label: "Public protection measures documented", done: false },
      ],
    },
    insurance: {
      status: "outstanding",
      items: [
        { label: "Training & inspection complete (required before cover)", done: false },
        { label: "Public liability insurance current (£10m)", done: false },
        { label: "Terrorism cover in place", done: false },
        { label: "Employer's liability certificate valid", done: false },
      ],
    },
  },
  {
    id: "2",
    venue: "ICC Wales",
    location: "Newport, Wales",
    date: "02 Jul 2025",
    capacity: 5000,
    attendees: 3200,
    tier: 2,
    staffTrained: 28,
    staffRequired: 34,
    inspected: true,
    trainingBreakdown: [
      { role: "Approved person / SRI", trained: 2, required: 2 },
      { role: "Bag & search officers", trained: 10, required: 12 },
      { role: "Evacuation marshals", trained: 9, required: 11 },
      { role: "Control room operators", trained: 4, required: 5 },
      { role: "ACT Awareness certified", trained: 3, required: 4 },
    ],
    training: {
      status: "in-progress",
      items: [
        { label: "ACT Awareness e-learning completed", done: true },
        { label: "Search & screening training current", done: true },
        { label: "Evacuation & invacuation drill logged", done: false },
        { label: "Control room briefing delivered", done: true },
      ],
    },
    inspection: {
      status: "complete",
      items: [
        { label: "Venue security walkthrough completed", done: true },
        { label: "Vulnerability assessment completed", done: true },
        { label: "Public protection measures documented", done: true },
      ],
    },
    insurance: {
      status: "outstanding",
      items: [
        { label: "Training & inspection complete (required before cover)", done: false },
        { label: "Public liability insurance current (£5m)", done: false },
        { label: "Terrorism cover in place", done: false },
        { label: "Employer's liability certificate valid", done: false },
      ],
    },
  },
  {
    id: "3",
    venue: "Waterfront Hall",
    location: "Belfast, Northern Ireland",
    date: "14 Jul 2025",
    capacity: 2235,
    attendees: 1850,
    tier: 2,
    staffTrained: 24,
    staffRequired: 24,
    inspected: true,
    trainingBreakdown: [
      { role: "Approved person / SRI", trained: 2, required: 2 },
      { role: "Bag & search officers", trained: 9, required: 9 },
      { role: "Evacuation marshals", trained: 8, required: 8 },
      { role: "Control room operators", trained: 3, required: 3 },
      { role: "ACT Awareness certified", trained: 2, required: 2 },
    ],
    training: {
      status: "complete",
      items: [
        { label: "ACT Awareness e-learning completed", done: true },
        { label: "Search & screening training current", done: true },
        { label: "Evacuation & invacuation drill logged", done: true },
        { label: "Control room briefing delivered", done: true },
      ],
    },
    inspection: {
      status: "complete",
      items: [
        { label: "Venue security walkthrough completed", done: true },
        { label: "Vulnerability assessment completed", done: true },
        { label: "Public protection measures documented", done: true },
      ],
    },
    insurance: {
      status: "outstanding",
      items: [
        { label: "Training & inspection complete (required before cover)", done: true },
        { label: "Public liability insurance current (£5m)", done: false },
        { label: "Terrorism cover in place", done: false },
        { label: "Employer's liability certificate valid", done: false },
      ],
    },
  },
  {
    id: "4",
    venue: "Leeds Town Hall",
    location: "Leeds, West Yorkshire",
    date: "26 Jul 2025",
    capacity: 550,
    attendees: 480,
    tier: 1,
    staffTrained: 6,
    staffRequired: 12,
    inspected: false,
    trainingBreakdown: [
      { role: "Responsible person", trained: 1, required: 2 },
      { role: "Evacuation marshals", trained: 3, required: 5 },
      { role: "First aid / welfare", trained: 1, required: 2 },
      { role: "ACT Awareness certified", trained: 1, required: 3 },
    ],
    training: {
      status: "in-progress",
      items: [
        { label: "ACT Awareness e-learning completed", done: true },
        { label: "Evacuation procedure briefing delivered", done: false },
        { label: "Staff roles & responsibilities assigned", done: true },
      ],
    },
    inspection: {
      status: "outstanding",
      items: [
        { label: "Venue security walkthrough booked", done: false },
        { label: "Public protection procedures reviewed", done: false },
      ],
    },
    insurance: {
      status: "outstanding",
      items: [
        { label: "Training & inspection complete (required before cover)", done: false },
        { label: "Public liability insurance current (£2m)", done: false },
        { label: "Employer's liability certificate valid", done: false },
      ],
    },
  },
  {
    id: "5",
    venue: "Edinburgh Assembly Rooms",
    location: "Edinburgh, Scotland",
    date: "08 Aug 2025",
    capacity: 780,
    attendees: 620,
    tier: 1,
    staffTrained: 3,
    staffRequired: 14,
    inspected: false,
    trainingBreakdown: [
      { role: "Responsible person", trained: 1, required: 2 },
      { role: "Evacuation marshals", trained: 1, required: 6 },
      { role: "First aid / welfare", trained: 1, required: 3 },
      { role: "ACT Awareness certified", trained: 0, required: 3 },
    ],
    training: {
      status: "outstanding",
      items: [
        { label: "ACT Awareness e-learning completed", done: false },
        { label: "Evacuation procedure briefing delivered", done: false },
        { label: "Staff roles & responsibilities assigned", done: true },
      ],
    },
    inspection: {
      status: "outstanding",
      items: [
        { label: "Venue security walkthrough booked", done: false },
        { label: "Public protection procedures reviewed", done: false },
      ],
    },
    insurance: {
      status: "outstanding",
      items: [
        { label: "Training & inspection complete (required before cover)", done: false },
        { label: "Public liability insurance current (£2m)", done: false },
        { label: "Employer's liability certificate valid", done: false },
      ],
    },
  },
];

function statusStyles(status: CategoryStatus) {
  switch (status) {
    case "complete":
      return { label: "Complete", cls: "bg-[#a3ff3c]/15 text-[#a3ff3c] border-[#a3ff3c]/30" };
    case "in-progress":
      return { label: "In progress", cls: "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30" };
    case "outstanding":
      return { label: "Outstanding", cls: "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30" };
  }
}

function Checklist({ items }: { items: ChecklistItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-2 text-sm">
          {item.done ? (
            <CheckCircle2 className="h-4 w-4 text-[#a3ff3c] shrink-0" />
          ) : (
            <Circle className="h-4 w-4 text-[#6e7a70] shrink-0" />
          )}
          <span className={item.done ? "text-[#e8efe9]" : "text-[#a8b3aa]"}>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

function CollapsibleSection({
  title,
  icon: Icon,
  status,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon: React.ElementType;
  status: CategoryStatus;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const s = statusStyles(status);
  return (
    <div className="border border-[#232a25] rounded-lg overflow-hidden bg-[#0f1311]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#131815] transition-colors"
      >
        <Icon className="h-4 w-4 text-[#a3ff3c] shrink-0" />
        <span className="text-sm font-medium text-[#e8efe9] flex-1 text-left">{title}</span>
        <span className={cn("px-2 py-0.5 text-[10px] font-medium rounded-full border", s.cls)}>{s.label}</span>
        <ChevronDown className={cn("h-4 w-4 text-[#6e7a70] transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="px-4 pb-4 pt-1 border-t border-[#232a25]">{children}</div>}
    </div>
  );
}

export function Events() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#6e7a70]">
        <span>Regional Net Zero Infrastructure Workforce Readiness Programme</span>
        <span>/</span>
        <span>Workspace</span>
        <span>/</span>
        <span className="text-[#e8efe9] font-medium">Events</span>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold text-[#e8efe9]">Event Readiness Checklist</h1>
        <p className="text-sm text-[#6e7a70] mt-1">
          Upcoming events and their compliance status under Martyn&apos;s Law (Terrorism (Protection of Premises) Act
          2025).
        </p>
      </div>

      {/* Info banner */}
      <div className="rounded-lg border border-[#a3ff3c]/20 bg-[#a3ff3c]/[0.04] p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-[#e8efe9]">Martyn&apos;s Law readiness</p>
            <p className="text-xs text-[#a8b3aa] mt-1 leading-relaxed">
              Qualifying premises and events must reduce vulnerability to terrorist attacks. Standard tier (200–799
              people) requires simple, low-cost public protection procedures. Enhanced tier (800+ people) additionally
              requires documented public protection measures, procedures provided to the SIA, and a designated senior
              responsible individual.
            </p>
            <p className="text-xs text-[#f59e0b] mt-2">
              Insurance cover cannot be purchased until all staff are trained and venue inspections are complete — no
              event is currently insured.
            </p>
          </div>
        </div>
      </div>

      {/* Event list */}
      <div className="space-y-3">
        {events.map((event) => {
          const isOpen = expandedId === event.id;
          return (
            <div key={event.id} className="border border-[#232a25] rounded-xl bg-[#0f1311] overflow-hidden">
              {/* Event header row */}
              <button
                onClick={() => setExpandedId(isOpen ? null : event.id)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#131815] transition-colors text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[15px] font-semibold text-[#e8efe9]">{event.venue}</span>
                    <span
                      className={cn(
                        "px-2 py-0.5 text-[10px] font-medium rounded-full border",
                        event.tier === 2
                          ? "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30"
                          : "bg-[#3b82f6]/15 text-[#3b82f6] border-[#3b82f6]/30"
                      )}
                    >
                      {event.tier === 2 ? "Tier 2 · Enhanced" : "Tier 1 · Standard"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-[#6e7a70] flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {event.attendees.toLocaleString()} / {event.capacity.toLocaleString()} attendees
                    </span>
                  </div>
                </div>

                {/* Staff trained summary */}
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1.5 justify-end">
                    <GraduationCap className="h-4 w-4 text-[#6e7a70]" />
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        event.staffTrained >= event.staffRequired ? "text-[#a3ff3c]" : "text-[#f59e0b]"
                      )}
                    >
                      {event.staffTrained}/{event.staffRequired}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#6e7a70]">staff trained &amp; certified</span>
                </div>

                <ChevronDown
                  className={cn("h-5 w-5 text-[#6e7a70] transition-transform shrink-0", isOpen && "rotate-180")}
                />
              </button>

              {/* Expanded sections */}
              {isOpen && (
                <div className="px-5 pb-5 space-y-3 border-t border-[#232a25] pt-4">
                  {/* TRAINING */}
                  <CollapsibleSection title="Training" icon={GraduationCap} status={event.training.status} defaultOpen>
                    <div className="pt-3 space-y-4">
                      {/* Adequately trained staff */}
                      <div className="flex items-center gap-3 rounded-lg bg-[#131815] border border-[#232a25] px-4 py-3">
                        <span
                          className={cn(
                            "text-2xl font-bold",
                            event.staffTrained >= event.staffRequired ? "text-[#a3ff3c]" : "text-[#f59e0b]"
                          )}
                        >
                          {event.staffTrained}
                        </span>
                        <div>
                          <p className="text-sm text-[#e8efe9]">of {event.staffRequired} adequately trained staff</p>
                          <p className="text-xs text-[#6e7a70]">
                            {Math.max(event.staffRequired - event.staffTrained, 0)} still to be trained &amp; certified
                          </p>
                        </div>
                      </div>

                      {/* Breakdown by category */}
                      <div>
                        <p className="text-[11px] font-medium tracking-wide text-[#6e7a70] uppercase mb-2">
                          Trained by category
                        </p>
                        <div className="space-y-1.5">
                          {event.trainingBreakdown.map((b, i) => {
                            const met = b.trained >= b.required;
                            return (
                              <div key={i} className="flex items-center gap-3 text-sm">
                                <span className="text-[#a8b3aa] flex-1">{b.role}</span>
                                <div className="w-32 h-1.5 bg-[#1a1f1c] rounded-full overflow-hidden">
                                  <div
                                    className={cn("h-full rounded-full", met ? "bg-[#a3ff3c]" : "bg-[#f59e0b]")}
                                    style={{ width: `${Math.min((b.trained / b.required) * 100, 100)}%` }}
                                  />
                                </div>
                                <span
                                  className={cn(
                                    "w-12 text-right font-medium",
                                    met ? "text-[#a3ff3c]" : "text-[#f59e0b]"
                                  )}
                                >
                                  {b.trained}/{b.required}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Checklist */}
                      <div>
                        <p className="text-[11px] font-medium tracking-wide text-[#6e7a70] uppercase mb-2">
                          Checklist
                        </p>
                        <Checklist items={event.training.items} />
                      </div>
                    </div>
                  </CollapsibleSection>

                  {/* INSPECTION */}
                  <CollapsibleSection title="Inspection" icon={Search} status={event.inspection.status}>
                    <div className="pt-3 space-y-4">
                      {/* Inspected status */}
                      <div className="flex items-center justify-between rounded-lg bg-[#131815] border border-[#232a25] px-4 py-3">
                        <span className="text-sm text-[#e8efe9]">Venue inspected</span>
                        {event.inspected ? (
                          <span className="flex items-center gap-1.5 text-sm font-medium text-[#a3ff3c]">
                            <CheckCircle2 className="h-4 w-4" /> Yes
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-sm font-medium text-[#ef4444]">
                            <XCircle className="h-4 w-4" /> No
                          </span>
                        )}
                      </div>

                      {/* Book inspection link */}
                      {!event.inspected && (
                        <a
                          href="#"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#a3ff3c] hover:underline"
                        >
                          Book a venue inspection
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}

                      {/* Checklist */}
                      <div>
                        <p className="text-[11px] font-medium tracking-wide text-[#6e7a70] uppercase mb-2">
                          Checklist
                        </p>
                        <Checklist items={event.inspection.items} />
                      </div>
                    </div>
                  </CollapsibleSection>

                  {/* INSURANCE */}
                  <CollapsibleSection title="Insurance" icon={ShieldAlert} status={event.insurance.status}>
                    <div className="pt-3 space-y-4">
                      {/* Purchase link */}
                      <a
                        href="#"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#a3ff3c] hover:underline"
                      >
                        Purchase insurance for this event
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>

                      {/* Checklist */}
                      <div>
                        <p className="text-[11px] font-medium tracking-wide text-[#6e7a70] uppercase mb-2">
                          Checklist
                        </p>
                        <Checklist items={event.insurance.items} />
                      </div>
                    </div>
                  </CollapsibleSection>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
