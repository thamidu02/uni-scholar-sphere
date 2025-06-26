
import React from "react";
import Layout from "@/components/layout/Layout";
import AdminNavigation from "@/components/admin/AdminNavigation";
import DashboardStats from "@/components/admin/DashboardStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-academic-navy">Admin Dashboard</h1>
        </div>
        
        <AdminNavigation />
        <DashboardStats />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest posts and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">New post in Computer Science</span>
                  <span className="text-xs text-gray-500">2 min ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">User reported inappropriate content</span>
                  <span className="text-xs text-gray-500">15 min ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">New user registration</span>
                  <span className="text-xs text-gray-500">1 hour ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-academic-navy text-white rounded-lg text-sm hover:bg-academic-navy/90">
                  Review Reports
                </button>
                <button className="p-3 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                  Manage Users
                </button>
                <button className="p-3 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                  Site Settings
                </button>
                <button className="p-3 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                  View Analytics
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
