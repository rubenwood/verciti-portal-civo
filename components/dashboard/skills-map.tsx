"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { X, Users, MapPin, GraduationCap, Building2, Briefcase, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { userProfiles } from "@/lib/mock-data";

// UK TopoJSON URL
const UK_TOPO_JSON = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-kingdom/uk-countries.json";

// Workplace/Project locations
const workplaces = [
  {
    id: "wp1",
    name: "Aberdeen Hydrogen Plant",
    type: "project",
    coordinates: [-2.1, 57.15] as [number, number],
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
    coordinates: [-2.24, 53.48] as [number, number],
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
    coordinates: [-0.12, 51.51] as [number, number],
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
    coordinates: [-3.18, 51.48] as [number, number],
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
    coordinates: [-3.19, 55.95] as [number, number],
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
    coordinates: [-5.93, 54.6] as [number, number],
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
  { id: "ts1", name: "University of Strathclyde", type: "university", coordinates: [-4.25, 55.86] as [number, number], skills: ["Hydrogen Fundamentals", "Electrolyser(s)", "FCEV"] },
  { id: "ts2", name: "Imperial College London", type: "university", coordinates: [-0.17, 51.5] as [number, number], skills: ["Electrical Theory (Fundamentals)", "Energy Storage", "Solar Power"] },
  { id: "ts3", name: "University of Manchester", type: "university", coordinates: [-2.23, 53.47] as [number, number], skills: ["Wind Energy", "Marine", "Electrical Theory (Fundamentals)"] },
  { id: "ts4", name: "Cardiff University", type: "university", coordinates: [-3.18, 51.49] as [number, number], skills: ["Solar Power", "Energy Storage", "Hazardous Voltages"] },
  { id: "ts5", name: "University of Edinburgh", type: "university", coordinates: [-3.19, 55.94] as [number, number], skills: ["Hydrogen Fundamentals", "R&D Interactive Laboratories", "Hydrogen Production"] },
  { id: "ts6", name: "Newcastle College", type: "college", coordinates: [-1.61, 54.97] as [number, number], skills: ["Plant & Machinery", "Hazardous Voltages", "Storage Tanks"] },
  { id: "ts7", name: "Birmingham City University", type: "university", coordinates: [-1.89, 52.48] as [number, number], skills: ["Electrical Theory (Fundamentals)", "Intermediate Electrical Theory", "Solar Power"] },
  { id: "ts8", name: "Liverpool John Moores", type: "university", coordinates: [-2.98, 53.41] as [number, number], skills: ["Marine", "Wind Energy", "Storage Tanks"] },
  { id: "ts9", name: "Leeds College of Building", type: "college", coordinates: [-1.55, 53.8] as [number, number], skills: ["Hazardous Voltages", "Plant & Machinery", "Electrical Theory (Fundamentals)"] },
  { id: "ts10", name: "Indeed Job Board - Glasgow", type: "jobboard", coordinates: [-4.25, 55.86] as [number, number], skills: ["Hydrogen Fundamentals", "Electrolyser(s)", "Plant & Machinery"] },
  { id: "ts11", name: "LinkedIn Jobs - Bristol", type: "jobboard", coordinates: [-2.59, 51.45] as [number, number], skills: ["Solar Power", "Energy Storage", "Wind Energy"] },
  { id: "ts12", name: "Reed - Sheffield", type: "jobboard", coordinates: [-1.47, 53.38] as [number, number], skills: ["Hazardous Voltages", "Electrical Theory (Fundamentals)", "Plant & Machinery"] },
];

type Workplace = typeof workplaces[0];
type Skill = Workplace["skills"][0];
type TalentSource = typeof talentSources[0];

export function SkillsMap() {
  const [selectedWorkplace, setSelectedWorkplace] = useState<Workplace | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showTalentSources, setShowTalentSources] = useState(false);
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);

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

  const relevantTalentSources = highlightedSkill 
    ? getTalentSourcesForSkill(highlightedSkill)
    : [];

  return (
    <div className="relative h-[calc(100vh-180px)] bg-card rounded-lg border border-border overflow-hidden">
      {/* Map Container */}
      <div className="absolute inset-0">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [-4, 55.5],
            scale: 2800,
          }}
          className="w-full h-full"
        >
          <Geographies geography={UK_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="hsl(var(--muted))"
                  stroke="hsl(var(--border))"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "hsl(var(--muted)/0.8)" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Workplace/Project Markers */}
          {workplaces.map((workplace) => {
            const fillPercentage = (workplace.staffAssigned / workplace.staffRequired) * 100;
            const isSelected = selectedWorkplace?.id === workplace.id;
            
            return (
              <Marker
                key={workplace.id}
                coordinates={workplace.coordinates}
                onClick={() => {
                  setSelectedWorkplace(workplace);
                  setSelectedSkill(null);
                  setShowTalentSources(false);
                  setHighlightedSkill(null);
                }}
              >
                {/* Pulsing ring */}
                <circle
                  r={12}
                  fill="none"
                  stroke={fillPercentage >= 75 ? "hsl(var(--success))" : fillPercentage >= 50 ? "hsl(var(--warning))" : "hsl(var(--destructive))"}
                  strokeWidth={2}
                  opacity={0.4}
                  className="animate-ping"
                  style={{ animationDuration: "2s" }}
                />
                {/* Main marker */}
                <circle
                  r={isSelected ? 10 : 8}
                  fill={fillPercentage >= 75 ? "hsl(var(--success))" : fillPercentage >= 50 ? "hsl(var(--warning))" : "hsl(var(--destructive))"}
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                  className="cursor-pointer transition-all hover:r-10"
                />
                {/* Inner indicator */}
                <circle
                  r={3}
                  fill="hsl(var(--background))"
                />
              </Marker>
            );
          })}

          {/* Talent Source Markers (shown when finding more) */}
          {showTalentSources && relevantTalentSources.map((source) => (
            <Marker key={source.id} coordinates={source.coordinates}>
              {/* Pulsing ring */}
              <circle
                r={10}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                opacity={0.5}
                className="animate-ping"
                style={{ animationDuration: "1.5s" }}
              />
              {/* Main marker */}
              <circle
                r={7}
                fill={source.type === "university" ? "hsl(var(--primary))" : source.type === "college" ? "hsl(215, 70%, 50%)" : "hsl(280, 70%, 50%)"}
                stroke="hsl(var(--background))"
                strokeWidth={2}
              />
              {/* Icon indicator */}
              {source.type === "university" && (
                <text
                  textAnchor="middle"
                  y={3}
                  className="fill-background text-[8px] font-bold"
                >
                  U
                </text>
              )}
              {source.type === "college" && (
                <text
                  textAnchor="middle"
                  y={3}
                  className="fill-background text-[8px] font-bold"
                >
                  C
                </text>
              )}
              {source.type === "jobboard" && (
                <text
                  textAnchor="middle"
                  y={3}
                  className="fill-background text-[8px] font-bold"
                >
                  J
                </text>
              )}
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg border border-border p-3 text-xs space-y-2">
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
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">University</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-3 h-3 rounded-full" style={{ background: "hsl(215, 70%, 50%)" }} />
                <span className="text-muted-foreground">College</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-3 h-3 rounded-full" style={{ background: "hsl(280, 70%, 50%)" }} />
                <span className="text-muted-foreground">Job Board</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Workplace/Project Panel */}
      {selectedWorkplace && !selectedSkill && (
        <div className="absolute top-4 right-4 bottom-4 w-96 bg-background/95 backdrop-blur-sm rounded-lg border border-border shadow-lg overflow-hidden flex flex-col">
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
        <div className="absolute top-4 right-4 bottom-4 w-96 bg-background/95 backdrop-blur-sm rounded-lg border border-border shadow-lg overflow-hidden flex flex-col">
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
                <div key={person.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {person.fullName.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{person.fullName}</p>
                    <p className="text-xs text-muted-foreground truncate">{person.jobTitle}</p>
                  </div>
                  {person.certifications.some(c => c.activityName === selectedSkill.name) && (
                    <span className="px-2 py-0.5 rounded text-xs bg-success/10 text-success">Certified</span>
                  )}
                </div>
              ))}
              {getPeopleWithSkill(selectedSkill.name).length > 8 && (
                <p className="text-xs text-muted-foreground text-center py-2">
                  +{getPeopleWithSkill(selectedSkill.name).length - 8} more
                </p>
              )}
              {getPeopleWithSkill(selectedSkill.name).length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No staff currently have this skill
                </p>
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
        <div className="absolute top-4 right-4 bottom-4 w-96 bg-background/95 backdrop-blur-sm rounded-lg border border-border shadow-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Talent Sources</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Finding talent with &quot;{highlightedSkill}&quot;
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleClosePanel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {/* Universities */}
              {relevantTalentSources.filter(s => s.type === "university").length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-foreground flex items-center gap-2 mb-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Universities
                  </h4>
                  <div className="space-y-2">
                    {relevantTalentSources.filter(s => s.type === "university").map((source) => (
                      <div key={source.id} className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                        <p className="text-sm font-medium text-foreground">{source.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Graduates with: {source.skills.slice(0, 2).join(", ")}
                        </p>
                        <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">
                          Contact Careers Office
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Colleges */}
              {relevantTalentSources.filter(s => s.type === "college").length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-foreground flex items-center gap-2 mb-2">
                    <Building2 className="h-4 w-4" style={{ color: "hsl(215, 70%, 50%)" }} />
                    Colleges
                  </h4>
                  <div className="space-y-2">
                    {relevantTalentSources.filter(s => s.type === "college").map((source) => (
                      <div key={source.id} className="p-3 rounded-lg bg-muted/50 border border-border">
                        <p className="text-sm font-medium text-foreground">{source.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Apprentices with: {source.skills.slice(0, 2).join(", ")}
                        </p>
                        <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">
                          View Apprenticeship Programs
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Job Boards */}
              {relevantTalentSources.filter(s => s.type === "jobboard").length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-foreground flex items-center gap-2 mb-2">
                    <Briefcase className="h-4 w-4" style={{ color: "hsl(280, 70%, 50%)" }} />
                    Job Boards
                  </h4>
                  <div className="space-y-2">
                    {relevantTalentSources.filter(s => s.type === "jobboard").map((source) => (
                      <div key={source.id} className="p-3 rounded-lg bg-muted/50 border border-border">
                        <p className="text-sm font-medium text-foreground">{source.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Active candidates with relevant skills
                        </p>
                        <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">
                          Search Candidates
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                  const skill = selectedWorkplace.skills.find(s => s.name === highlightedSkill);
                  if (skill) setSelectedSkill(skill);
                }
              }}
            >
              Back to Skill Details
            </Button>
          </div>
        </div>
      )}

      {/* Instructions when no selection */}
      {!selectedWorkplace && !showTalentSources && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur-sm rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 inline mr-2" />
          Click on a location to view workplace details and skills requirements
        </div>
      )}
    </div>
  );
}
