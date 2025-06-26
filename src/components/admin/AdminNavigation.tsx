
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UserManagement from "./UserManagement";
import SiteAnalytics from "./SiteAnalytics";
import ModerationTools from "./ModerationTools";
import SiteConfiguration from "./SiteConfiguration";

const AdminNavigation = () => {
  return (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="users">User Management</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="moderation">Moderation</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="users" className="mt-6">
        <UserManagement />
      </TabsContent>
      
      <TabsContent value="analytics" className="mt-6">
        <SiteAnalytics />
      </TabsContent>
      
      <TabsContent value="moderation" className="mt-6">
        <ModerationTools />
      </TabsContent>
      
      <TabsContent value="settings" className="mt-6">
        <SiteConfiguration />
      </TabsContent>
    </Tabs>
  );
};

export default AdminNavigation;
