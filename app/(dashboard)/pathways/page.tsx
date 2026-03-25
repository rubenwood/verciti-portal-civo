"use client";

import { Header } from "@/components/dashboard/header";
import { LearningPathwayModal } from "@/components/dashboard/learning-pathway-modal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { courses, modules } from "@/lib/mock-data";
import { Zap, Atom, BookOpen, Users, Clock, Award } from "lucide-react";

export default function PathwaysPage() {
  const getCourseIcon = (courseName: string) => {
    if (courseName.toLowerCase().includes("electrification")) {
      return <Zap className="h-8 w-8 text-chart-3" />;
    }
    if (courseName.toLowerCase().includes("hydrogen")) {
      return <Atom className="h-8 w-8 text-chart-2" />;
    }
    return <BookOpen className="h-8 w-8 text-chart-1" />;
  };

  const courseStats = {
    "Electrification": { enrolled: 89, avgCompletion: 72, certifications: 45 },
    "Hydrogen": { enrolled: 67, avgCompletion: 65, certifications: 38 },
  };

  return (
    <div className="flex flex-col">
      <Header 
        title="Learning Pathways" 
        subtitle="Manage and create custom learning pathways for your organisation"
      />
      
      <div className="flex-1 space-y-6 p-6">
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Available Courses</h2>
            <p className="text-sm text-muted-foreground">
              View existing pathways or create custom learning journeys
            </p>
          </div>
          <LearningPathwayModal />
        </div>

        {/* Course Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {courses.map((course) => {
            const stats = courseStats[course.name as keyof typeof courseStats] || { enrolled: 0, avgCompletion: 0, certifications: 0 };
            
            return (
              <Card key={course.id} className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-muted p-3">
                        {getCourseIcon(course.name)}
                      </div>
                      <div>
                        <CardTitle className="text-xl text-card-foreground">{course.name}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {course.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-primary/20 text-primary border-0">
                      {course.modules.length} Modules
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg bg-muted/30 p-3 text-center">
                      <Users className="mx-auto h-5 w-5 text-chart-2" />
                      <p className="mt-1 text-lg font-semibold text-card-foreground">{stats.enrolled}</p>
                      <p className="text-xs text-muted-foreground">Enrolled</p>
                    </div>
                    <div className="rounded-lg bg-muted/30 p-3 text-center">
                      <Clock className="mx-auto h-5 w-5 text-chart-3" />
                      <p className="mt-1 text-lg font-semibold text-card-foreground">{stats.avgCompletion}%</p>
                      <p className="text-xs text-muted-foreground">Avg. Completion</p>
                    </div>
                    <div className="rounded-lg bg-muted/30 p-3 text-center">
                      <Award className="mx-auto h-5 w-5 text-chart-4" />
                      <p className="mt-1 text-lg font-semibold text-card-foreground">{stats.certifications}</p>
                      <p className="text-xs text-muted-foreground">Certified</p>
                    </div>
                  </div>

                  {/* Module List */}
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-card-foreground">Course Modules</h4>
                    <div className="space-y-1">
                      {course.modules.map((module, index) => (
                        <div
                          key={module}
                          className="flex items-center gap-3 rounded-md bg-muted/30 px-3 py-2"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                            {index + 1}
                          </span>
                          <span className="text-sm text-card-foreground">{module}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* All Available Modules */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">All Available Modules</CardTitle>
            <CardDescription className="text-muted-foreground">
              Individual modules that can be combined into custom learning pathways
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {modules.map((module) => (
                <div
                  key={module}
                  className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4"
                >
                  <BookOpen className="h-5 w-5 text-chart-1" />
                  <span className="text-sm font-medium text-card-foreground">{module}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
