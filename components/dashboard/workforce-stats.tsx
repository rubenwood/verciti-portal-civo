"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, GraduationCap, Award, AlertTriangle } from "lucide-react";
import { userProfiles } from "@/lib/mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

export function WorkforceStats() {
  // Calculate workforce statistics
  const totalUsers = userProfiles.length;
  const activeUsers = userProfiles.filter(u => u.status === "active").length;
  const signedUpNotLoggedIn = userProfiles.filter(u => u.status === "signed_up_not_logged_in").length;
  const notSignedUp = userProfiles.filter(u => u.status === "not_signed_up").length;
  
  // Calculate job role breakdown
  const jobRoleCounts: Record<string, { total: number; trained: number; certified: number }> = {};
  
  userProfiles.forEach(user => {
    const role = user.jobTitle;
    if (!jobRoleCounts[role]) {
      jobRoleCounts[role] = { total: 0, trained: 0, certified: 0 };
    }
    jobRoleCounts[role].total++;
    
    // Consider "trained" if they have completed at least one activity
    if (user.completedActivities.length > 0) {
      jobRoleCounts[role].trained++;
    }
    
    // Consider "certified" if they have at least one certification
    if (user.certifications.length > 0) {
      jobRoleCounts[role].certified++;
    }
  });
  
  const jobRoleData = Object.entries(jobRoleCounts).map(([role, data]) => ({
    role: role.length > 15 ? role.substring(0, 15) + "..." : role,
    fullRole: role,
    total: data.total,
    trained: data.trained,
    certified: data.certified,
    trainingRate: Math.round((data.trained / data.total) * 100),
    certificationRate: Math.round((data.certified / data.total) * 100),
  }));

  // Status breakdown for pie chart
  const statusData = [
    { name: "Active", value: activeUsers, color: "#13CE66" },
    { name: "Signed Up (Not Logged In)", value: signedUpNotLoggedIn, color: "#FFB020" },
    { name: "Not Signed Up", value: notSignedUp, color: "#A8A8A8" },
  ].filter(d => d.value > 0);

  // Training compliance stats
  const usersWithOverdueTraining = userProfiles.filter(u => 
    u.training.some(t => t.status === "overdue")
  ).length;
  
  const usersWithCertifications = userProfiles.filter(u => u.certifications.length > 0).length;

  const COLORS = ["#97FB57", "#3366FF", "#FFB020", "#13CE66", "#A8A8A8"];

  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <Users className="h-5 w-5 text-muted-foreground mb-3" />
          <p className="text-2xl font-bold text-foreground">{totalUsers}</p>
          <p className="text-sm text-muted-foreground">Total Workforce</p>
        </div>
        
        <div className="rounded-lg border border-border bg-card p-4">
          <UserCheck className="h-5 w-5 text-success mb-3" />
          <p className="text-2xl font-bold text-foreground">{activeUsers}</p>
          <p className="text-sm text-muted-foreground">Active Users</p>
        </div>
        
        <div className="rounded-lg border border-border bg-card p-4">
          <UserX className="h-5 w-5 text-warning mb-3" />
          <p className="text-2xl font-bold text-foreground">{signedUpNotLoggedIn + notSignedUp}</p>
          <p className="text-sm text-muted-foreground">Inactive Users</p>
        </div>
        
        <div className="rounded-lg border border-border bg-card p-4">
          <GraduationCap className="h-5 w-5 text-info mb-3" />
          <p className="text-2xl font-bold text-foreground">{userProfiles.filter(u => u.completedActivities.length > 0).length}</p>
          <p className="text-sm text-muted-foreground">Trained Staff</p>
        </div>
        
        <div className="rounded-lg border border-border bg-card p-4">
          <Award className="h-5 w-5 text-primary mb-3" />
          <p className="text-2xl font-bold text-foreground">{usersWithCertifications}</p>
          <p className="text-sm text-muted-foreground">Certified Staff</p>
        </div>
        
        <div className="rounded-lg border border-border bg-card p-4">
          <AlertTriangle className="h-5 w-5 text-destructive mb-3" />
          <p className="text-2xl font-bold text-foreground">{usersWithOverdueTraining}</p>
          <p className="text-sm text-muted-foreground">Overdue Training</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Role Breakdown Chart */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground">
              Workforce by Job Role
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobRoleData} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3D3D3D" />
                  <XAxis type="number" stroke="#A8A8A8" fontSize={12} />
                  <YAxis 
                    type="category" 
                    dataKey="role" 
                    stroke="#A8A8A8" 
                    fontSize={11} 
                    width={100}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#1a1a1a", 
                      border: "1px solid #3D3D3D",
                      borderRadius: "8px",
                      color: "#fff"
                    }}
                    formatter={(value, name) => [value, name === "total" ? "Total" : name === "trained" ? "Trained" : "Certified"]}
                  />
                  <Bar dataKey="total" fill="#A8A8A8" name="Total" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="trained" fill="#3366FF" name="Trained" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="certified" fill="#97FB57" name="Certified" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* User Status Pie Chart */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground">
              User Status Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#1a1a1a", 
                      border: "1px solid #3D3D3D",
                      borderRadius: "8px",
                      color: "#fff"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training Adequacy by Role Table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-foreground">
            Training & Certification Adequacy by Role
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-normal">Job Role</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-normal">Total Staff</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-normal">Trained</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-normal">Training Rate</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-normal">Certified</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-normal">Certification Rate</th>
                </tr>
              </thead>
              <tbody>
                {jobRoleData.map((row, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="py-3 px-4 text-foreground">{row.fullRole}</td>
                    <td className="text-center py-3 px-4 text-foreground">{row.total}</td>
                    <td className="text-center py-3 px-4 text-foreground">{row.trained}</td>
                    <td className="text-center py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        row.trainingRate >= 80 ? "bg-success/20 text-success" :
                        row.trainingRate >= 50 ? "bg-warning/20 text-warning" :
                        "bg-destructive/20 text-destructive"
                      }`}>
                        {row.trainingRate}%
                      </span>
                    </td>
                    <td className="text-center py-3 px-4 text-foreground">{row.certified}</td>
                    <td className="text-center py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        row.certificationRate >= 80 ? "bg-success/20 text-success" :
                        row.certificationRate >= 50 ? "bg-warning/20 text-warning" :
                        "bg-destructive/20 text-destructive"
                      }`}>
                        {row.certificationRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
