"use client";

import { Card, CardContent } from "@/components/ui/card";
import { dashboardStats } from "@/lib/mock-data";
import {
  Activity,
  Award,
  BookOpen,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const stats = [
  {
    name: "Total Users",
    value: dashboardStats.totalUsers,
    icon: Users,
    change: "+12%",
    changeType: "positive" as const,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    name: "Active Today",
    value: dashboardStats.activeToday,
    icon: Activity,
    change: "+5%",
    changeType: "positive" as const,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    name: "Activities Completed",
    value: dashboardStats.activitiesCompleted.toLocaleString(),
    icon: BookOpen,
    change: "+23%",
    changeType: "positive" as const,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    name: "Average Score",
    value: `${dashboardStats.averageScore}%`,
    icon: TrendingUp,
    change: "+2.3%",
    changeType: "positive" as const,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    name: "Courses In Progress",
    value: dashboardStats.coursesInProgress,
    icon: Zap,
    change: "+8",
    changeType: "positive" as const,
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    name: "Certifications",
    value: dashboardStats.certificationsIssued,
    icon: Award,
    change: "+15",
    changeType: "positive" as const,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <Card key={stat.name} className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <span className="text-xs font-medium text-success">
                {stat.change}
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-card-foreground">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.name}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
