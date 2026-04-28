"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { X, Users, MapPin, GraduationCap, Building2, Briefcase, ChevronRight, Search, ExternalLink, Plus, Check, Minus, FileText, Link2, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { userProfiles, modules } from "@/lib/mock-data";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.CircleMarker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import("react-leaflet").then((mod) => mod.Tooltip),
  { ssr: false }
);

// Component to handle map right-click events
function MapRightClickHandler({ onRightClick }: { onRightClick: (lat: number, lng: number) => void }) {
  const { useMapEvents } = require("react-leaflet");
  
  useMapEvents({
    contextmenu: (e: { latlng: { lat: number; lng: number }; originalEvent: MouseEvent }) => {
      e.originalEvent.preventDefault();
      onRightClick(e.latlng.lat, e.latlng.lng);
    },
  });
  
  return null;
}

// Workplace/Project locations
const workplaces = [
  {
    id: "wp1",
    name: "Aberdeen Hydrogen Plant",
    type: "project",
    coordinates: [57.15, -2.1] as [number, number],
    staffAssigned: 24,
    staffRequired: 100,
    skills: [
      { name: "Hydrogen Fundamentals", have: 18, need: 40 },
      { name: "Electrolyser(s)", have: 8, need: 25 },
      { name: "Hazardous Voltages", have: 20, need: 35 },
      { name: "Plant & Machinery", have: 12, need: 30 },
      { name: "Storage Tanks", have: 6, need: 20 },
    ],
  },
  {
    id: "wp2",
    name: "Manchester Wind Farm",
    type: "project",
    coordinates: [53.48, -2.24] as [number, number],
    staffAssigned: 45,
    staffRequired: 80,
    skills: [
      { name: "Wind Energy", have: 32, need: 50 },
      { name: "Electrical Theory (Fundamentals)", have: 40, need: 60 },
      { name: "Hazardous Voltages", have: 28, need: 40 },
      { name: "Marine", have: 15, need: 25 },
    ],
  },
  {
    id: "wp3",
    name: "London HQ",
    type: "workplace",
    coordinates: [51.51, -0.12] as [number, number],
    staffAssigned: 120,
    staffRequired: 150,
    skills: [
      { name: "Electrical Theory (Fundamentals)", have: 85, need: 100 },
      { name: "Intermediate Electrical Theory", have: 60, need: 80 },
      { name: "Solar Power", have: 45, need: 70 },
      { name: "Energy Storage", have: 55, need: 75 },
    ],
  },
  {
    id: "wp4",
    name: "Cardiff Solar Installation",
    type: "project",
    coordinates: [51.48, -3.18] as [number, number],
    staffAssigned: 18,
    staffRequired: 50,
    skills: [
      { name: "Solar Power", have: 12, need: 30 },
      { name: "Electrical Theory (Fundamentals)", have: 15, need: 35 },
      { name: "Energy Storage", have: 8, need: 20 },
      { name: "Hazardous Voltages", have: 14, need: 25 },
    ],
  },
  {
    id: "wp5",
    name: "Edinburgh R&D Center",
    type: "workplace",
    coordinates: [55.95, -3.19] as [number, number],
    staffAssigned: 35,
    staffRequired: 60,
    skills: [
      { name: "Hydrogen Fundamentals", have: 28, need: 40 },
      { name: "FCEV", have: 15, need: 30 },
      { name: "R&D Interactive Laboratories", have: 20, need: 35 },
      { name: "Hydrogen Production", have: 18, need: 30 },
    ],
  },
  {
    id: "wp6",
    name: "Belfast Marine Hub",
    type: "project",
    coordinates: [54.6, -5.93] as [number, number],
    staffAssigned: 22,
    staffRequired: 45,
    skills: [
      { name: "Marine", have: 16, need: 30 },
      { name: "Wind Energy", have: 12, need: 25 },
      { name: "Storage Tanks", have: 8, need: 18 },
      { name: "Plant & Machinery", have: 10, need: 20 },
    ],
  },
];

// Talent source locations (universities, colleges, job boards)
const talentSources = [
  { id: "ts1", name: "University of Strathclyde", type: "university", coordinates: [55.86, -4.25] as [number, number], skills: ["Hydrogen Fundamentals", "Electrolyser(s)", "FCEV"], graduates: 120 },
  { id: "ts2", name: "Imperial College London", type: "university", coordinates: [51.5, -0.17] as [number, number], skills: ["Electrical Theory (Fundamentals)", "Energy Storage", "Solar Power"], graduates: 250 },
  { id: "ts3", name: "University of Manchester", type: "university", coordinates: [53.47, -2.23] as [number, number], skills: ["Wind Energy", "Marine", "Electrical Theory (Fundamentals)"], graduates: 180 },
  { id: "ts4", name: "Cardiff University", type: "university", coordinates: [51.49, -3.18] as [number, number], skills: ["Solar Power", "Energy Storage", "Hazardous Voltages"], graduates: 95 },
  { id: "ts5", name: "University of Edinburgh", type: "university", coordinates: [55.94, -3.19] as [number, number], skills: ["Hydrogen Fundamentals", "R&D Interactive Laboratories", "Hydrogen Production"], graduates: 140 },
  { id: "ts6", name: "Newcastle College", type: "college", coordinates: [54.97, -1.61] as [number, number], skills: ["Plant & Machinery", "Hazardous Voltages", "Storage Tanks"], graduates: 65 },
  { id: "ts7", name: "Birmingham City University", type: "university", coordinates: [52.48, -1.89] as [number, number], skills: ["Electrical Theory (Fundamentals)", "Intermediate Electrical Theory", "Solar Power"], graduates: 110 },
  { id: "ts8", name: "Liverpool John Moores", type: "university", coordinates: [53.41, -2.98] as [number, number], skills: ["Marine", "Wind Energy", "Storage Tanks"], graduates: 85 },
  { id: "ts9", name: "Leeds College of Building", type: "college", coordinates: [53.8, -1.55] as [number, number], skills: ["Hazardous Voltages", "Plant & Machinery", "Electrical Theory (Fundamentals)"], graduates: 45 },
  { id: "ts10", name: "Indeed - Glasgow", type: "jobboard", coordinates: [55.86, -4.25] as [number, number], skills: ["Hydrogen Fundamentals", "Electrolyser(s)", "Plant & Machinery"], candidates: 340 },
  { id: "ts11", name: "LinkedIn Jobs - Bristol", type: "jobboard", coordinates: [51.45, -2.59] as [number, number], skills: ["Solar Power", "Energy Storage", "Wind Energy"], candidates: 520 },
  { id: "ts12", name: "Reed - Sheffield", type: "jobboard", coordinates: [53.38, -1.47] as [number, number], skills: ["Hazardous Voltages", "Electrical Theory (Fundamentals)", "Plant & Machinery"], candidates: 280 },
  { id: "ts13", name: "Totaljobs - Nottingham", type: "jobboard", coordinates: [52.95, -1.15] as [number, number], skills: ["Energy Storage", "Solar Power", "Wind Energy"], candidates: 195 },
  { id: "ts14", name: "Queen's University Belfast", type: "university", coordinates: [54.58, -5.94] as [number, number], skills: ["Marine", "Wind Energy", "Hydrogen Fundamentals"], graduates: 75 },
];

type Workplace = typeof workplaces[0];
type Skill = Workplace["skills"][0];
type TalentSource = typeof talentSources[0];

// Mock candidates for talent sources
interface Candidate {
  id: string;
  anonymousId: string;
  skills: string[];
  experienceYears: number;
  qualification: string;
  cvUrl: string;
  portfolioUrl?: string;
  availability: "immediate" | "2-weeks" | "1-month" | "3-months";
  location: string;
}

const generateCandidates = (source: TalentSource): Candidate[] => {
  const count = source.type === "jobboard" ? (source.candidates || 50) : (source.graduates || 30);
  const displayCount = Math.min(count, 15); // Show max 15 candidates
  
  const qualifications = source.type === "jobboard" 
    ? ["BSc Engineering", "MSc Energy Systems", "HND Electrical", "BEng Mechanical", "PhD Renewable Energy", "NVQ Level 3", "City & Guilds"]
    : ["BSc (Expected)", "MSc (Expected)", "PhD Candidate", "Final Year", "Graduate 2024", "Graduate 2025"];
  
  const locations = ["London", "Manchester", "Glasgow", "Edinburgh", "Birmingham", "Bristol", "Cardiff", "Leeds", "Newcastle", "Belfast"];
  const availabilities: Candidate["availability"][] = ["immediate", "2-weeks", "1-month", "3-months"];
  
  return Array.from({ length: displayCount }, (_, i) => ({
    id: `${source.id}-c${i + 1}`,
    anonymousId: `Candidate ${String(i + 1).padStart(3, "0")}`,
    skills: source.skills.slice(0, Math.floor(Math.random() * source.skills.length) + 1),
    experienceYears: source.type === "jobboard" ? Math.floor(Math.random() * 10) + 1 : 0,
    qualification: qualifications[Math.floor(Math.random() * qualifications.length)],
    cvUrl: `#cv-${source.id}-${i + 1}`,
    portfolioUrl: Math.random() > 0.4 ? `#portfolio-${source.id}-${i + 1}` : undefined,
    availability: availabilities[Math.floor(Math.random() * availabilities.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
  }));
};

function MapContent({
  workplaces,
  talentSources,
  selectedWorkplace,
  showTalentSources,
  highlightedSkill,
  onWorkplaceClick,
  relevantTalentSources,
  onRightClick,
}: {
  workplaces: Workplace[];
  talentSources: TalentSource[];
  selectedWorkplace: Workplace | null;
  showTalentSources: boolean;
  highlightedSkill: string | null;
  onWorkplaceClick: (workplace: Workplace) => void;
  relevantTalentSources: TalentSource[];
  onRightClick: (lat: number, lng: number) => void;
}) {
  return (
    <>
      <MapRightClickHandler onRightClick={onRightClick} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      
      {/* Workplace/Project Markers */}
      {workplaces.map((workplace) => {
        const fillPercentage = (workplace.staffAssigned / workplace.staffRequired) * 100;
        const isSelected = selectedWorkplace?.id === workplace.id;
        const color = fillPercentage >= 75 ? "#22c55e" : fillPercentage >= 50 ? "#eab308" : "#ef4444";
        
        return (
          <CircleMarker
            key={workplace.id}
            center={workplace.coordinates}
            radius={isSelected ? 14 : 10}
            pathOptions={{
              fillColor: color,
              fillOpacity: 0.9,
              color: "#fff",
              weight: isSelected ? 3 : 2,
            }}
            eventHandlers={{
              click: () => onWorkplaceClick(workplace),
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
              <div className="text-xs">
                <p className="font-semibold">{workplace.name}</p>
                <p className="text-muted-foreground">{workplace.staffAssigned} / {workplace.staffRequired} staff</p>
              </div>
            </Tooltip>
          </CircleMarker>
        );
      })}

      {/* Talent Source Markers (shown when finding more) */}
      {showTalentSources && relevantTalentSources.map((source) => {
        const color = source.type === "university" ? "#3b82f6" : source.type === "college" ? "#8b5cf6" : "#ec4899";
        
        return (
          <CircleMarker
            key={source.id}
            center={source.coordinates}
            radius={8}
            pathOptions={{
              fillColor: color,
              fillOpacity: 0.9,
              color: "#fff",
              weight: 2,
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
              <div className="text-xs">
                <p className="font-semibold">{source.name}</p>
                <p className="text-muted-foreground capitalize">{source.type}</p>
                {source.type === "jobboard" ? (
                  <p className="text-primary">{(source as typeof talentSources[0] & { candidates?: number }).candidates} candidates</p>
                ) : (
                  <p className="text-primary">{source.graduates} graduates/year</p>
                )}
              </div>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </>
  );
}

export function SkillsMap() {
  const [selectedWorkplace, setSelectedWorkplace] = useState<Workplace | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showTalentSources, setShowTalentSources] = useState(false);
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [allWorkplaces, setAllWorkplaces] = useState(workplaces);
  const [placedCoordinates, setPlacedCoordinates] = useState<[number, number] | null>(null);
  const [selectedTalentSource, setSelectedTalentSource] = useState<TalentSource | null>(null);
  const [candidateSearch, setCandidateSearch] = useState("");
  
  // New workplace form state
  const [newWorkplaceName, setNewWorkplaceName] = useState("");
  const [newWorkplaceType, setNewWorkplaceType] = useState<"workplace" | "project">("project");
  const [selectedSkills, setSelectedSkills] = useState<{ name: string; need: number }[]>([]);
  const [assignedWorkers, setAssignedWorkers] = useState<string[]>([]);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [skillSearch, setSkillSearch] = useState("");
  const [workerSearch, setWorkerSearch] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get people with a specific skill
  const getPeopleWithSkill = (skillName: string) => {
    return userProfiles.filter(user => 
      user.completedActivities.includes(skillName) || 
      user.certifications.some(cert => cert.activityName === skillName)
    );
  };

  // Get talent sources for a skill
  const getTalentSourcesForSkill = (skillName: string) => {
    return talentSources.filter(source => source.skills.includes(skillName));
  };

  const handleFindMore = (skill: Skill) => {
    setHighlightedSkill(skill.name);
    setShowTalentSources(true);
    setSelectedSkill(null);
  };

  const handleBackToWorkplace = () => {
    setSelectedSkill(null);
  };

  const handleClosePanel = () => {
    setSelectedWorkplace(null);
    setSelectedSkill(null);
    setShowTalentSources(false);
    setHighlightedSkill(null);
  };

  const handleWorkplaceClick = (workplace: Workplace) => {
    setSelectedWorkplace(workplace);
    setSelectedSkill(null);
    setShowTalentSources(false);
    setHighlightedSkill(null);
  };

  const handleMapRightClick = (lat: number, lng: number) => {
    setPlacedCoordinates([lat, lng]);
    setShowAddModal(true);
    // Reset form state
    setNewWorkplaceName("");
    setNewWorkplaceType("project");
    setSelectedSkills([]);
    setAssignedWorkers([]);
    setStep(1);
  };

  const relevantTalentSources = highlightedSkill 
    ? getTalentSourcesForSkill(highlightedSkill)
    : [];

  // Filter skills based on search
  const filteredSkills = modules.filter(skill => 
    skill.toLowerCase().includes(skillSearch.toLowerCase()) &&
    !selectedSkills.some(s => s.name === skill)
  );

  // Filter workers based on search and selected skills
  const availableWorkers = userProfiles.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(workerSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(workerSearch.toLowerCase());
    const hasRelevantSkills = selectedSkills.length === 0 || selectedSkills.some(skill =>
      user.completedActivities.includes(skill.name) ||
      user.certifications.some(cert => cert.activityName === skill.name)
    );
    return matchesSearch && hasRelevantSkills && !assignedWorkers.includes(user.id);
  });

// Reset modal state
  const resetModal = () => {
  setNewWorkplaceName("");
  setNewWorkplaceType("project");
  setSelectedSkills([]);
  setAssignedWorkers([]);
  setStep(1);
  setSkillSearch("");
  setWorkerSearch("");
  setPlacedCoordinates(null);
  };

// Add new workplace
  const handleCreateWorkplace = () => {
  if (!placedCoordinates) return;
  const newWorkplace: Workplace = {
  id: `wp${allWorkplaces.length + 1}`,
  name: newWorkplaceName,
  type: newWorkplaceType,
  coordinates: placedCoordinates,
      staffAssigned: assignedWorkers.length,
      staffRequired: selectedSkills.reduce((sum, s) => sum + s.need, 0),
      skills: selectedSkills.map(s => ({
        name: s.name,
        have: assignedWorkers.filter(workerId => {
          const worker = userProfiles.find(u => u.id === workerId);
          return worker?.completedActivities.includes(s.name) ||
            worker?.certifications.some(cert => cert.activityName === s.name);
        }).length,
        need: s.need,
      })),
    };
    setAllWorkplaces([...allWorkplaces, newWorkplace]);
    setShowAddModal(false);
    resetModal();
  };

  return (
    <div className="relative h-[calc(100vh-180px)] bg-card rounded-lg border border-border overflow-hidden">
      {/* Map Container */}
      <div className="absolute inset-0">
        {isClient ? (
          <>
            <link
              rel="stylesheet"
              href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
              integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
              crossOrigin=""
            />
            <MapContainer
              center={[54.5, -4]}
              zoom={6}
              minZoom={5}
              maxZoom={12}
              scrollWheelZoom={true}
              className="h-full w-full"
              style={{ background: "#1a1a2e" }}
            >
<MapContent
  workplaces={allWorkplaces}
  talentSources={talentSources}
  selectedWorkplace={selectedWorkplace}
  showTalentSources={showTalentSources}
  highlightedSkill={highlightedSkill}
  onWorkplaceClick={handleWorkplaceClick}
  relevantTalentSources={relevantTalentSources}
  onRightClick={handleMapRightClick}
  />
            </MapContainer>
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-muted/20">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3 animate-pulse" />
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg border border-border p-3 text-xs space-y-2 z-[1000]">
        <p className="font-medium text-foreground">Staffing Level</p>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-success" />
          <span className="text-muted-foreground">&gt;75% staffed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-warning" />
          <span className="text-muted-foreground">50-75% staffed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-destructive" />
          <span className="text-muted-foreground">&lt;50% staffed</span>
        </div>
        {showTalentSources && (
          <>
            <div className="border-t border-border my-2 pt-2">
              <p className="font-medium text-foreground mb-2">Talent Sources</p>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: "#3b82f6" }} />
                <span className="text-muted-foreground">University</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-3 h-3 rounded-full" style={{ background: "#8b5cf6" }} />
                <span className="text-muted-foreground">College</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-3 h-3 rounded-full" style={{ background: "#ec4899" }} />
                <span className="text-muted-foreground">Job Board</span>
              </div>
            </div>
          </>
        )}
        <div className="border-t border-border mt-3 pt-3">
          <p className="text-muted-foreground flex items-center gap-1.5">
            <Plus className="h-3 w-3" />
            Right-click map to add
          </p>
        </div>
      </div>

      {/* Workplace/Project Panel */}
      {selectedWorkplace && !selectedSkill && (
        <div className="absolute top-4 right-4 bottom-4 w-96 bg-background/95 backdrop-blur-sm rounded-lg border border-border shadow-lg overflow-hidden flex flex-col z-[1000]">
          <div className="p-4 border-b border-border">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  selectedWorkplace.type === "project" ? "bg-primary/10" : "bg-muted"
                )}>
                  {selectedWorkplace.type === "project" ? (
                    <Briefcase className="h-5 w-5 text-primary" />
                  ) : (
                    <Building2 className="h-5 w-5 text-foreground" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{selectedWorkplace.name}</h3>
                  <p className="text-xs text-muted-foreground capitalize">{selectedWorkplace.type}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleClosePanel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Staff Allocation</span>
              <span className="text-2xl font-bold text-foreground">
                {selectedWorkplace.staffAssigned} <span className="text-muted-foreground text-lg">/ {selectedWorkplace.staffRequired}</span>
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all",
                  (selectedWorkplace.staffAssigned / selectedWorkplace.staffRequired) >= 0.75 
                    ? "bg-success" 
                    : (selectedWorkplace.staffAssigned / selectedWorkplace.staffRequired) >= 0.5 
                      ? "bg-warning" 
                      : "bg-destructive"
                )}
                style={{ width: `${(selectedWorkplace.staffAssigned / selectedWorkplace.staffRequired) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {selectedWorkplace.staffRequired - selectedWorkplace.staffAssigned} more staff needed
            </p>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <h4 className="font-medium text-sm text-foreground mb-3">Skills Required</h4>
            <div className="space-y-2">
              {selectedWorkplace.skills.map((skill, index) => {
                const percentage = (skill.have / skill.need) * 100;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedSkill(skill)}
                    className="w-full p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-sm font-semibold",
                          percentage >= 75 ? "text-success" : percentage >= 50 ? "text-warning" : "text-destructive"
                        )}>
                          {skill.have} / {skill.need}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          percentage >= 75 ? "bg-success" : percentage >= 50 ? "bg-warning" : "bg-destructive"
                        )}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Skill Detail Panel */}
      {selectedSkill && selectedWorkplace && (
        <div className="absolute top-4 right-4 bottom-4 w-96 bg-background/95 backdrop-blur-sm rounded-lg border border-border shadow-lg overflow-hidden flex flex-col z-[1000]">
          <div className="p-4 border-b border-border">
            <div className="flex items-start justify-between">
              <div>
                <button 
                  onClick={handleBackToWorkplace}
                  className="text-xs text-muted-foreground hover:text-foreground mb-1 flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3 rotate-180" />
                  Back to {selectedWorkplace.name}
                </button>
                <h3 className="font-semibold text-foreground">{selectedSkill.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedSkill.have} of {selectedSkill.need} required
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleClosePanel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Staff with this skill
              </h4>
              <span className="text-xs text-muted-foreground">
                {getPeopleWithSkill(selectedSkill.name).length} people
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              {getPeopleWithSkill(selectedSkill.name).slice(0, 8).map((person) => (
                <div key={person.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-semibold">
                    {person.fullName.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{person.fullName}</p>
                    <p className="text-xs text-muted-foreground truncate">{person.jobTitle}</p>
                  </div>
                  {person.certifications.some(c => c.activityName === selectedSkill.name) && (
                    <span className="px-2 py-0.5 rounded-full bg-success/20 text-success text-xs">
                      Certified
                    </span>
                  )}
                </div>
              ))}
              {getPeopleWithSkill(selectedSkill.name).length > 8 && (
                <p className="text-xs text-muted-foreground text-center py-2">
                  +{getPeopleWithSkill(selectedSkill.name).length - 8} more staff
                </p>
              )}
              {getPeopleWithSkill(selectedSkill.name).length === 0 && (
                <div className="text-center py-6">
                  <Users className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No staff with this skill yet</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-border">
            <Button 
              className="w-full" 
              onClick={() => handleFindMore(selectedSkill)}
            >
              <Search className="h-4 w-4 mr-2" />
              Find More Talent
            </Button>
          </div>
        </div>
      )}

      {/* Talent Sources Panel */}
      {showTalentSources && highlightedSkill && (
        <div className="absolute top-4 right-4 bottom-4 w-96 bg-background/95 backdrop-blur-sm rounded-lg border border-border shadow-lg overflow-hidden flex flex-col z-[1000]">
          <div className="p-4 border-b border-border">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Talent Sources</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Finding talent for: <span className="text-primary">{highlightedSkill}</span>
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleClosePanel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {/* Universities */}
            <div className="mb-6">
              <h4 className="font-medium text-sm text-foreground flex items-center gap-2 mb-3">
                <GraduationCap className="h-4 w-4" />
                Universities & Colleges
              </h4>
              <div className="space-y-2">
                {relevantTalentSources
                  .filter(s => s.type === "university" || s.type === "college")
                  .map((source) => (
                    <div key={source.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">{source.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{source.type}</p>
                          <p className="text-xs text-primary mt-1">{source.graduates} graduates/year</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => setSelectedTalentSource(source)}
                        >
                          <Users className="h-3 w-3 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                {relevantTalentSources.filter(s => s.type === "university" || s.type === "college").length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-4">No institutions found for this skill</p>
                )}
              </div>
            </div>

            {/* Job Boards */}
            <div>
              <h4 className="font-medium text-sm text-foreground flex items-center gap-2 mb-3">
                <Briefcase className="h-4 w-4" />
                Job Boards
              </h4>
              <div className="space-y-2">
                {relevantTalentSources
                  .filter(s => s.type === "jobboard")
                  .map((source) => (
                    <div key={source.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">{source.name}</p>
                          <p className="text-xs text-muted-foreground">Job board</p>
                          <p className="text-xs text-primary mt-1">{(source as typeof talentSources[0] & { candidates?: number }).candidates || 0} candidates available</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => setSelectedTalentSource(source)}
                        >
                          <Users className="h-3 w-3 mr-1" />
                          View Candidates
                        </Button>
                      </div>
                    </div>
                  ))}
                {relevantTalentSources.filter(s => s.type === "jobboard").length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-4">No job boards found for this skill</p>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-border">
            <Button 
              variant="outline"
              className="w-full" 
              onClick={() => {
                setShowTalentSources(false);
                setHighlightedSkill(null);
                if (selectedWorkplace) {
                  setSelectedSkill(selectedWorkplace.skills.find(s => s.name === highlightedSkill) || null);
                }
              }}
            >
              <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
              Back to Skill Details
            </Button>
          </div>
        </div>
      )}

      {/* Add Workplace Modal */}
      <Dialog open={showAddModal} onOpenChange={(open) => {
        setShowAddModal(open);
        if (!open) resetModal();
      }}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col z-[9999]">
          <DialogHeader>
            <DialogTitle>Add New Workplace or Project</DialogTitle>
            <DialogDescription>
              {step === 1 && "Enter basic details for your new workplace or project"}
              {step === 2 && "Select the skills required for this location"}
              {step === 3 && "Assign workers to this location"}
            </DialogDescription>
          </DialogHeader>

          {/* Step Indicator */}
          <div className="flex items-center gap-2 py-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {step > s ? <Check className="h-4 w-4" /> : s}
                </div>
                <span className={cn(
                  "text-sm hidden sm:block",
                  step >= s ? "text-foreground" : "text-muted-foreground"
                )}>
                  {s === 1 ? "Details" : s === 2 ? "Skills" : "Workers"}
                </span>
                {s < 3 && <div className={cn("flex-1 h-0.5", step > s ? "bg-primary" : "bg-muted")} />}
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Step 1: Basic Details */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                  <Input
                    placeholder="e.g., Birmingham Solar Farm"
                    value={newWorkplaceName}
                    onChange={(e) => setNewWorkplaceName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Type</label>
                  <div className="flex gap-2">
                    <Button
                      variant={newWorkplaceType === "project" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setNewWorkplaceType("project")}
                    >
                      <Briefcase className="h-4 w-4 mr-2" />
                      Project
                    </Button>
                    <Button
                      variant={newWorkplaceType === "workplace" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setNewWorkplaceType("workplace")}
                    >
                      <Building2 className="h-4 w-4 mr-2" />
                      Workplace
                    </Button>
                  </div>
                </div>
                {placedCoordinates && (
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Location</label>
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm">
                        {placedCoordinates[0].toFixed(4)}°N, {Math.abs(placedCoordinates[1]).toFixed(4)}°{placedCoordinates[1] < 0 ? "W" : "E"}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">Placed on map</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Select Skills */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search skills..."
                    className="pl-9"
                    value={skillSearch}
                    onChange={(e) => setSkillSearch(e.target.value)}
                  />
                </div>

                {/* Selected Skills */}
                {selectedSkills.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Selected Skills ({selectedSkills.length})
                    </label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {selectedSkills.map((skill) => (
                        <div key={skill.name} className="flex items-center justify-between p-2 rounded-lg bg-primary/10 border border-primary/20">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Need:</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => setSelectedSkills(skills => 
                                skills.map(s => s.name === skill.name ? { ...s, need: Math.max(1, s.need - 1) } : s)
                              )}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{skill.need}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => setSelectedSkills(skills => 
                                skills.map(s => s.name === skill.name ? { ...s, need: s.need + 1 } : s)
                              )}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-destructive hover:text-destructive"
                              onClick={() => setSelectedSkills(skills => skills.filter(s => s.name !== skill.name))}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Available Skills */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Available Skills</label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {filteredSkills.map((skill) => (
                      <Button
                        key={skill}
                        variant="outline"
                        size="sm"
                        className="justify-start"
                        onClick={() => setSelectedSkills([...selectedSkills, { name: skill, need: 10 }])}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        {skill}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Assign Workers */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search workers..."
                    className="pl-9"
                    value={workerSearch}
                    onChange={(e) => setWorkerSearch(e.target.value)}
                  />
                </div>

                {/* Assigned Workers */}
                {assignedWorkers.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Assigned Workers ({assignedWorkers.length})
                    </label>
                    <div className="space-y-1 max-h-28 overflow-y-auto">
                      {assignedWorkers.map((workerId) => {
                        const worker = userProfiles.find(u => u.id === workerId);
                        if (!worker) return null;
                        return (
                          <div key={workerId} className="flex items-center justify-between p-2 rounded-lg bg-primary/10 border border-primary/20">
                            <div>
                              <p className="text-sm font-medium">{worker.fullName}</p>
                              <p className="text-xs text-muted-foreground">{worker.jobTitle}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-destructive hover:text-destructive"
                              onClick={() => setAssignedWorkers(workers => workers.filter(id => id !== workerId))}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Available Workers */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Available Workers {selectedSkills.length > 0 && "(filtered by selected skills)"}
                  </label>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {availableWorkers.slice(0, 20).map((worker) => {
                      const matchingSkills = selectedSkills.filter(skill =>
                        worker.completedActivities.includes(skill.name) ||
                        worker.certifications.some(cert => cert.activityName === skill.name)
                      );
                      return (
                        <button
                          key={worker.id}
                          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors text-left"
                          onClick={() => setAssignedWorkers([...assignedWorkers, worker.id])}
                        >
                          <div>
                            <p className="text-sm font-medium">{worker.fullName}</p>
                            <p className="text-xs text-muted-foreground">{worker.jobTitle}</p>
                            {matchingSkills.length > 0 && (
                              <p className="text-xs text-primary mt-0.5">
                                {matchingSkills.length} matching skill{matchingSkills.length > 1 ? "s" : ""}
                              </p>
                            )}
                          </div>
                          <Plus className="h-4 w-4 text-muted-foreground" />
                        </button>
                      );
                    })}
                    {availableWorkers.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">No matching workers found</p>
                    )}
                    {availableWorkers.length > 20 && (
                      <p className="text-xs text-muted-foreground text-center py-2">
                        Showing 20 of {availableWorkers.length} workers. Use search to filter.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between pt-4 border-t border-border mt-4">
            <Button
              variant="outline"
              onClick={() => step > 1 ? setStep((step - 1) as 1 | 2 | 3) : setShowAddModal(false)}
            >
              {step === 1 ? "Cancel" : "Back"}
            </Button>
            {step < 3 ? (
              <Button
                onClick={() => setStep((step + 1) as 1 | 2 | 3)}
                disabled={step === 1 && !newWorkplaceName.trim()}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleCreateWorkplace}
                disabled={selectedSkills.length === 0}
              >
                Create {newWorkplaceType === "project" ? "Project" : "Workplace"}
              </Button>
            )}
          </div>
</DialogContent>
      </Dialog>

      {/* Talent Source Contact Modal */}
      <Dialog open={!!selectedTalentSource} onOpenChange={(open) => {
        if (!open) {
          setSelectedTalentSource(null);
          setCandidateSearch("");
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col z-[9999]">
          {selectedTalentSource && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedTalentSource.type === "university" ? (
                    <GraduationCap className="h-5 w-5 text-info" />
                  ) : selectedTalentSource.type === "college" ? (
                    <GraduationCap className="h-5 w-5 text-purple-400" />
                  ) : (
                    <Briefcase className="h-5 w-5 text-pink-400" />
                  )}
                  {selectedTalentSource.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedTalentSource.type === "jobboard" 
                    ? `Browse ${selectedTalentSource.candidates || 0} available candidates`
                    : `Connect with ${selectedTalentSource.graduates || 0} graduates/year`
                  }
                </DialogDescription>
              </DialogHeader>

              {/* Institution Info */}
              <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground capitalize">{selectedTalentSource.type}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {selectedTalentSource.coordinates[0].toFixed(2)}°N, {Math.abs(selectedTalentSource.coordinates[1]).toFixed(2)}°W
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      {selectedTalentSource.type === "jobboard" 
                        ? selectedTalentSource.candidates || 0
                        : selectedTalentSource.graduates || 0
                      }
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedTalentSource.type === "jobboard" ? "candidates" : "graduates/year"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">Relevant skills offered:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTalentSource.skills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates by skill or location..."
                  className="pl-9"
                  value={candidateSearch}
                  onChange={(e) => setCandidateSearch(e.target.value)}
                />
              </div>

              {/* Candidates List */}
              <div className="flex-1 overflow-auto space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm text-foreground">
                    {selectedTalentSource.type === "jobboard" ? "Available Candidates" : "Recent Graduates"}
                  </h4>
                  <span className="text-xs text-muted-foreground">Anonymized profiles</span>
                </div>
                
                {generateCandidates(selectedTalentSource)
                  .filter(c => 
                    candidateSearch === "" ||
                    c.skills.some(s => s.toLowerCase().includes(candidateSearch.toLowerCase())) ||
                    c.location.toLowerCase().includes(candidateSearch.toLowerCase())
                  )
                  .map((candidate) => (
                    <div key={candidate.id} className="p-3 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                              <Users className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{candidate.anonymousId}</p>
                              <p className="text-xs text-muted-foreground">{candidate.qualification}</p>
                            </div>
                          </div>
                          
                          <div className="mt-2 flex flex-wrap gap-1">
                            {candidate.skills.map((skill) => (
                              <span key={skill} className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                          
                          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {candidate.location}
                            </span>
                            {candidate.experienceYears > 0 && (
                              <span>{candidate.experienceYears} yr{candidate.experienceYears > 1 ? "s" : ""} exp</span>
                            )}
                            <span className={cn(
                              "flex items-center gap-1",
                              candidate.availability === "immediate" && "text-success",
                              candidate.availability === "2-weeks" && "text-primary",
                              candidate.availability === "1-month" && "text-warning",
                              candidate.availability === "3-months" && "text-muted-foreground"
                            )}>
                              <Clock className="h-3 w-3" />
                              {candidate.availability === "immediate" ? "Immediate" : 
                               candidate.availability === "2-weeks" ? "2 weeks" :
                               candidate.availability === "1-month" ? "1 month" : "3 months"}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-1.5">
                          <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
                            <a href={candidate.cvUrl} target="_blank" rel="noopener noreferrer">
                              <FileText className="h-3 w-3 mr-1" />
                              CV
                            </a>
                          </Button>
                          {candidate.portfolioUrl && (
                            <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
                              <a href={candidate.portfolioUrl} target="_blank" rel="noopener noreferrer">
                                <Link2 className="h-3 w-3 mr-1" />
                                Portfolio
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between pt-4 border-t border-border mt-2">
                <Button variant="outline" onClick={() => setSelectedTalentSource(null)}>
                  Close
                </Button>
                <Button>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit {selectedTalentSource.type === "jobboard" ? "Job Board" : "Institution"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
