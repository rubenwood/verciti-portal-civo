"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GripVertical,
  Plus,
  BookOpen,
  Trash2,
  ChevronUp,
  ChevronDown,
  Save,
  Zap,
  Atom,
} from "lucide-react";
import { courses, modules } from "@/lib/mock-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CustomCourse {
  id: string;
  name: string;
  description: string;
  modules: string[];
}

export function LearningPathwayModal() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("existing");
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [customCourses, setCustomCourses] = useState<CustomCourse[]>([]);

  const handleModuleToggle = (module: string) => {
    setSelectedModules((prev) =>
      prev.includes(module)
        ? prev.filter((m) => m !== module)
        : [...prev, module]
    );
  };

  const moveModule = (index: number, direction: "up" | "down") => {
    const newModules = [...selectedModules];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newModules.length) return;
    [newModules[index], newModules[newIndex]] = [newModules[newIndex], newModules[index]];
    setSelectedModules(newModules);
  };

  const removeModule = (module: string) => {
    setSelectedModules((prev) => prev.filter((m) => m !== module));
  };

  const handleCreateCourse = () => {
    if (!newCourseName.trim()) {
      toast.error("Please enter a course name");
      return;
    }
    if (selectedModules.length === 0) {
      toast.error("Please select at least one module");
      return;
    }

    const newCourse: CustomCourse = {
      id: `custom-${Date.now()}`,
      name: newCourseName,
      description: newCourseDescription,
      modules: selectedModules,
    };

    setCustomCourses((prev) => [...prev, newCourse]);
    toast.success(`Course "${newCourseName}" created successfully`);
    
    // Reset form
    setNewCourseName("");
    setNewCourseDescription("");
    setSelectedModules([]);
    setActiveTab("existing");
  };

  const getCourseIcon = (courseName: string) => {
    if (courseName.toLowerCase().includes("electrification")) {
      return <Zap className="h-6 w-6 text-chart-3" />;
    }
    if (courseName.toLowerCase().includes("hydrogen")) {
      return <Atom className="h-6 w-6 text-chart-2" />;
    }
    return <BookOpen className="h-6 w-6 text-chart-1" />;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Create Learning Pathway
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Learning Pathways</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            View existing courses or create custom learning pathways from available modules.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="existing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Existing Courses
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Create New Course
            </TabsTrigger>
          </TabsList>

          <TabsContent value="existing" className="mt-4 space-y-4">
            {/* Existing Courses */}
            <div className="grid gap-4 md:grid-cols-2">
              {courses.map((course) => (
                <Card key={course.id} className="border-border bg-muted/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-background p-2">
                        {getCourseIcon(course.name)}
                      </div>
                      <div>
                        <CardTitle className="text-lg text-card-foreground">{course.name}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {course.modules.length} modules
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3 text-sm text-muted-foreground">{course.description}</p>
                    <div className="space-y-1">
                      {course.modules.map((module, index) => (
                        <div
                          key={module}
                          className="flex items-center gap-2 rounded-md bg-background px-3 py-2 text-sm"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                            {index + 1}
                          </span>
                          <span className="text-card-foreground">{module}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Custom Courses */}
              {customCourses.map((course) => (
                <Card key={course.id} className="border-border bg-muted/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-background p-2">
                          <BookOpen className="h-6 w-6 text-chart-1" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-card-foreground">{course.name}</CardTitle>
                          <CardDescription className="text-muted-foreground">
                            {course.modules.length} modules (Custom)
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-0">Custom</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {course.description && (
                      <p className="mb-3 text-sm text-muted-foreground">{course.description}</p>
                    )}
                    <div className="space-y-1">
                      {course.modules.map((module, index) => (
                        <div
                          key={module}
                          className="flex items-center gap-2 rounded-md bg-background px-3 py-2 text-sm"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                            {index + 1}
                          </span>
                          <span className="text-card-foreground">{module}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="mt-4">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Course Details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="course-name" className="text-card-foreground">Course Name</Label>
                  <Input
                    id="course-name"
                    placeholder="Enter course name..."
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course-description" className="text-card-foreground">Description (Optional)</Label>
                  <Textarea
                    id="course-description"
                    placeholder="Enter course description..."
                    value={newCourseDescription}
                    onChange={(e) => setNewCourseDescription(e.target.value)}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-card-foreground">Available Modules</Label>
                  <p className="text-xs text-muted-foreground">
                    Select modules to include in your course
                  </p>
                  <div className="space-y-2 rounded-lg border border-border bg-background p-3">
                    {modules.map((module) => (
                      <div
                        key={module}
                        className="flex items-center space-x-3 rounded-md p-2 hover:bg-muted/50"
                      >
                        <Checkbox
                          id={module}
                          checked={selectedModules.includes(module)}
                          onCheckedChange={() => handleModuleToggle(module)}
                        />
                        <Label
                          htmlFor={module}
                          className="flex-1 cursor-pointer text-sm text-card-foreground"
                        >
                          {module}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selected Modules (Orderable) */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-card-foreground">Course Structure</Label>
                  <p className="text-xs text-muted-foreground">
                    Reorder modules to create your learning pathway
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-background p-3 min-h-[300px]">
                  {selectedModules.length === 0 ? (
                    <div className="flex h-[280px] items-center justify-center text-center">
                      <div>
                        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/30" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Select modules from the left to build your course
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selectedModules.map((module, index) => (
                        <div
                          key={module}
                          className={cn(
                            "flex items-center gap-2 rounded-md border border-border bg-muted/30 p-3",
                            "transition-colors hover:bg-muted/50"
                          )}
                        >
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                            {index + 1}
                          </span>
                          <span className="flex-1 text-sm text-card-foreground">{module}</span>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => moveModule(index, "up")}
                              disabled={index === 0}
                            >
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => moveModule(index, "down")}
                              disabled={index === selectedModules.length - 1}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              onClick={() => removeModule(module)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {selectedModules.length > 0 && (
                  <div className="rounded-lg bg-muted/30 p-3">
                    <p className="text-sm text-muted-foreground">
                      {selectedModules.length} module{selectedModules.length !== 1 ? "s" : ""} selected
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-border"
          >
            {activeTab === "existing" ? "Close" : "Cancel"}
          </Button>
          {activeTab === "create" && (
            <Button
              onClick={handleCreateCourse}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Save className="mr-2 h-4 w-4" />
              Create Course
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
