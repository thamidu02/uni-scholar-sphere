
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const SiteAnalytics = () => {
  const monthlyData = [
    { month: 'Jan', posts: 45, users: 120, comments: 234 },
    { month: 'Feb', posts: 52, users: 145, comments: 289 },
    { month: 'Mar', posts: 61, users: 167, comments: 356 },
    { month: 'Apr', posts: 58, users: 189, comments: 423 },
    { month: 'May', posts: 67, users: 201, comments: 467 },
    { month: 'Jun', posts: 74, users: 223, comments: 512 }
  ];

  const departmentData = [
    { name: 'Computer Science', value: 35, color: '#1f2937' },
    { name: 'Mathematics', value: 25, color: '#374151' },
    { name: 'Biology', value: 20, color: '#4b5563' },
    { name: 'Chemistry', value: 12, color: '#6b7280' },
    { name: 'Literature', value: 8, color: '#9ca3af' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="posts" stroke="#1f2937" strokeWidth={2} />
                <Line type="monotone" dataKey="comments" stroke="#6b7280" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Posts by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#1f2937" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Contributors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Dr. Sarah Wilson</span>
                <span className="text-sm font-medium">156 pts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">John Doe</span>
                <span className="text-sm font-medium">85 pts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Alice Smith</span>
                <span className="text-sm font-medium">67 pts</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Machine Learning</span>
                <span className="text-sm font-medium">23 posts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Calculus Help</span>
                <span className="text-sm font-medium">18 posts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Research Methods</span>
                <span className="text-sm font-medium">15 posts</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg. Response Time</span>
                <span className="text-sm font-medium">2.3 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Daily Active Users</span>
                <span className="text-sm font-medium">89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Post Engagement</span>
                <span className="text-sm font-medium">78%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SiteAnalytics;
