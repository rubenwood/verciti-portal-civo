"use client";

import { Header } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { modules } from "@/lib/mock-data";
import {
  BookOpen,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  Zap,
  Sun,
  Wind,
  Battery,
  Cpu,
  Cog,
  AlertTriangle,
} from "lucide-react";

const moduleDetails = [
  {
    name: "Hydrogen Fundamentals",
    icon: Zap,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    enrolled: 45,
    completed: 32,
    avgScore: 82,
    duration: "4 hours",
  },
  {
    name: "Solar Power",
    icon: Sun,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    enrolled: 52,
    completed: 41,
    avgScore: 78,
    duration: "3.5 hours",
  },
  {
    name: "Wind Energy",
    icon: Wind,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    enrolled: 38,
    completed: 28,
    avgScore: 85,
    duration: "4 hours",
  },
  {
    name: "Energy Storage",
    icon: Battery,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    enrolled: 41,
    completed: 35,
    avgScore: 80,
    duration: "3 hours",
  },
  {
    name: "Introduction to Power Electronics",
    icon: Cpu,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    enrolled: 56,
    completed: 42,
    avgScore: 76,
    duration: "5 hours",
  },
  {
    name: "Intermediate Power Electronics",
    icon: Cpu,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    enrolled: 34,
    completed: 22,
    avgScore: 74,
    duration: "6 hours",
  },
  {
    name: "Introduction to Motors and Drives",
    icon: Cog,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    enrolled: 48,
    completed: 38,
    avgScore: 81,
    duration: "4.5 hours",
  },
  {
    name: "Hazardous Voltages",
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    enrolled: 62,
    completed: 58,
    avgScore: 92,
    duration: "2 hours",
  },
];

export default function CoursesPage() {
  return (
    <div className="flex flex-col">
      <Header 
        title="Courses & Modules" 
        subtitle="Overview of all available learning modules and their engagement metrics"
      />
      
      <div className="flex-1 space-y-6 p-6">
        {/* Summary Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-chart-1/10 p-2">
                  <BookOpen className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{modules.length}</p>
                  <p className="text-sm text-muted-foreground">Total Modules</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-chart-2/10 p-2">
                  <Users className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">376</p>
                  <p className="text-sm text-muted-foreground">Total Enrollments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-chart-4/10 p-2">
                  <CheckCircle2 className="h-5 w-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">296</p>
                  <p className="text-sm text-muted-foreground">Completions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-chart-3/10 p-2">
                  <TrendingUp className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">81%</p>
                  <p className="text-sm text-muted-foreground">Avg. Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Module Cards */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {moduleDetails.map((module) => {
            const completionRate = Math.round((module.completed / module.enrolled) * 100);
            
            return (
              <Card key={module.name} className="border-border bg-card">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`rounded-lg ${module.bgColor} p-2`}>
                      <module.icon className={`h-5 w-5 ${module.color}`} />
                    </div>
                    <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {module.duration}
                    </Badge>
                  </div>
                  <CardTitle className="text-base text-card-foreground mt-3">
                    {module.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Enrollment & Completion */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Completion</span>
                      <span className="font-medium text-card-foreground">
                        {module.completed}/{module.enrolled}
                      </span>
                    </div>
                    <Progress value={completionRate} className="h-2" />
                    <p className="text-xs text-muted-foreground">{completionRate}% completion rate</p>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-card-foreground">{module.enrolled}</p>
                      <p className="text-xs text-muted-foreground">Enrolled</p>
                    </div>
                    <div className="h-8 w-px bg-border"></div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-success">{module.avgScore}%</p>
                      <p className="text-xs text-muted-foreground">Avg Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
