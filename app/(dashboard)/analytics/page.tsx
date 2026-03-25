"use client";

import { Header } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";

const moduleCompletionData = [
  { name: "Hydrogen", completed: 32, inProgress: 13 },
  { name: "Solar", completed: 41, inProgress: 11 },
  { name: "Wind", completed: 28, inProgress: 10 },
  { name: "Storage", completed: 35, inProgress: 6 },
  { name: "Power Elec.", completed: 42, inProgress: 14 },
  { name: "Motors", completed: 38, inProgress: 10 },
  { name: "Hazardous V.", completed: 58, inProgress: 4 },
];

const weeklyActivityData = [
  { day: "Mon", logins: 45, activities: 32 },
  { day: "Tue", logins: 52, activities: 41 },
  { day: "Wed", logins: 48, activities: 38 },
  { day: "Thu", logins: 61, activities: 45 },
  { day: "Fri", logins: 42, activities: 28 },
  { day: "Sat", logins: 18, activities: 12 },
  { day: "Sun", logins: 15, activities: 10 },
];

const assessmentScoreDistribution = [
  { range: "0-50%", count: 8 },
  { range: "51-60%", count: 12 },
  { range: "61-70%", count: 24 },
  { range: "71-80%", count: 38 },
  { range: "81-90%", count: 45 },
  { range: "91-100%", count: 29 },
];

const courseEnrollmentData = [
  { name: "Electrification", value: 89, color: "#FFB020" },
  { name: "Hydrogen", value: 67, color: "#3366FF" },
  { name: "Custom Paths", value: 23, color: "#97FB57" },
];

const monthlyTrendData = [
  { month: "Jan", users: 120, completions: 45 },
  { month: "Feb", users: 145, completions: 62 },
  { month: "Mar", users: 178, completions: 89 },
  { month: "Apr", users: 195, completions: 105 },
  { month: "May", users: 220, completions: 128 },
  { month: "Jun", users: 247, completions: 156 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
        <p className="text-sm font-medium text-card-foreground">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col">
      <Header 
        title="Analytics" 
        subtitle="Comprehensive insights into learner engagement and performance"
      />
      
      <div className="flex-1 space-y-6 p-6">
        {/* Top Row Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Module Completion Chart */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Module Completion</CardTitle>
              <CardDescription className="text-muted-foreground">
                Completed vs in-progress learners by module
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={moduleCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3D3D3D" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#A8A8A8" 
                    tick={{ fill: '#A8A8A8', fontSize: 12 }}
                  />
                  <YAxis stroke="#A8A8A8" tick={{ fill: '#A8A8A8', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="completed" fill="#97FB57" name="Completed" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="inProgress" fill="#3366FF" name="In Progress" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Weekly Activity</CardTitle>
              <CardDescription className="text-muted-foreground">
                Login and activity trends this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3D3D3D" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#A8A8A8"
                    tick={{ fill: '#A8A8A8', fontSize: 12 }}
                  />
                  <YAxis stroke="#A8A8A8" tick={{ fill: '#A8A8A8', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="logins"
                    stroke="#97FB57"
                    fill="#97FB57"
                    fillOpacity={0.2}
                    name="Logins"
                  />
                  <Area
                    type="monotone"
                    dataKey="activities"
                    stroke="#3366FF"
                    fill="#3366FF"
                    fillOpacity={0.2}
                    name="Activities"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Middle Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Assessment Score Distribution */}
          <Card className="border-border bg-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-card-foreground">Assessment Score Distribution</CardTitle>
              <CardDescription className="text-muted-foreground">
                Distribution of assessment scores across all modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={assessmentScoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3D3D3D" />
                  <XAxis 
                    dataKey="range" 
                    stroke="#A8A8A8"
                    tick={{ fill: '#A8A8A8', fontSize: 12 }}
                  />
                  <YAxis stroke="#A8A8A8" tick={{ fill: '#A8A8A8', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="count" 
                    fill="#13CE66" 
                    name="Learners"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Course Enrollment Pie */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Course Enrollment</CardTitle>
              <CardDescription className="text-muted-foreground">
                Distribution by pathway
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={courseEnrollmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {courseEnrollmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {courseEnrollmentData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-card-foreground">{item.name}</span>
                    </div>
                    <span className="text-muted-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trend */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Growth Trend</CardTitle>
            <CardDescription className="text-muted-foreground">
              Total users and completions over the past 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3D3D3D" />
                <XAxis 
                  dataKey="month" 
                  stroke="#A8A8A8"
                  tick={{ fill: '#A8A8A8', fontSize: 12 }}
                />
                <YAxis stroke="#A8A8A8" tick={{ fill: '#A8A8A8', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#97FB57"
                  strokeWidth={2}
                  dot={{ fill: '#97FB57', strokeWidth: 2 }}
                  name="Total Users"
                />
                <Line
                  type="monotone"
                  dataKey="completions"
                  stroke="#FFB020"
                  strokeWidth={2}
                  dot={{ fill: '#FFB020', strokeWidth: 2 }}
                  name="Completions"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
