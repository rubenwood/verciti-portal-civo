"use client";

import { Users, Clock, BookOpen, Trophy, TrendingUp, ChevronRight, Key } from "lucide-react";
import { userActivityData, assessmentAttemptData } from "@/lib/mock-data";

export function StatsCards() {
  const maxLicences = 200;
  const totalUsers = userActivityData.length;
  const availableLicences = maxLicences - totalUsers;
  
  const modulesCompleted = userActivityData.reduce(
    (acc, user) => acc + user.activitiesCompleted,
    0
  );
  
  const quizAttempts = assessmentAttemptData.length * 20 + 22;
  
  const averageScore = Math.round(
    assessmentAttemptData.reduce((acc, attempt) => acc + attempt.score, 0) / 
    assessmentAttemptData.length * 100
  ) / 100;

  return (
    <div className="space-y-4">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <Users className="h-5 w-5 text-muted-foreground mb-3" />
          <p className="text-2xl font-bold text-foreground">{totalUsers}</p>
          <p className="text-sm text-muted-foreground">Total Users</p>
        </div>
        
        <div className="rounded-lg border border-border bg-card p-4">
          <Clock className="h-5 w-5 text-muted-foreground mb-3" />
          <p className="text-2xl font-bold text-foreground">
            11d 2h 21m 5s
          </p>
          <p className="text-sm text-muted-foreground">Total Usage Time</p>
        </div>
        
        <div className="rounded-lg border border-border bg-card p-4">
          <BookOpen className="h-5 w-5 text-muted-foreground mb-3" />
          <p className="text-2xl font-bold text-foreground">{modulesCompleted}</p>
          <p className="text-sm text-muted-foreground">Modules Completed</p>
        </div>
        
        <div className="rounded-lg border border-border bg-card p-4">
          <Trophy className="h-5 w-5 text-muted-foreground mb-3" />
          <p className="text-2xl font-bold text-foreground">{quizAttempts}</p>
          <p className="text-sm text-muted-foreground">Quiz Attempts</p>
        </div>
        
        <div className="rounded-lg border border-border bg-card p-4">
          <TrendingUp className="h-5 w-5 text-muted-foreground mb-3" />
          <p className="text-2xl font-bold text-foreground">{averageScore}%</p>
          <p className="text-sm text-muted-foreground">Average Score</p>
        </div>
        
        <div className="rounded-lg border border-border bg-card p-4">
          <Key className="h-5 w-5 text-muted-foreground mb-3" />
          <p className="text-2xl font-bold text-foreground">{availableLicences}</p>
          <p className="text-sm text-muted-foreground">Licences Available</p>
        </div>
      </div>

      {/* Expandable Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="flex items-center justify-between rounded-lg border border-border bg-card p-4 text-left hover:bg-muted/30 transition-colors">
          <span className="font-semibold text-foreground">Most Popular Modules</span>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
        
        <button className="flex items-center justify-between rounded-lg border border-border bg-card p-4 text-left hover:bg-muted/30 transition-colors">
          <span className="font-semibold text-foreground">Quiz Stats</span>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
