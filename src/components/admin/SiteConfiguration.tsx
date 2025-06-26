
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SiteConfiguration = () => {
  const [settings, setSettings] = useState({
    siteName: "UniAcademic",
    siteDescription: "Academic forum for university students and faculty",
    allowRegistration: true,
    requireEmailVerification: true,
    enablePostApproval: false,
    maxPostLength: 5000,
    enableDownvotes: true,
    enableComments: true,
    maintenanceMode: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="posting">Posting</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleSettingChange('siteName', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow New User Registration</Label>
                  <p className="text-sm text-gray-500">Allow new users to register accounts</p>
                </div>
                <Switch
                  checked={settings.allowRegistration}
                  onCheckedChange={(checked) => handleSettingChange('allowRegistration', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">Put the site in maintenance mode</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                />
              </div>

              <Button className="bg-academic-navy hover:bg-academic-navy/90">
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="posting">
          <Card>
            <CardHeader>
              <CardTitle>Posting Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="maxPostLength">Maximum Post Length (characters)</Label>
                <Input
                  id="maxPostLength"
                  type="number"
                  value={settings.maxPostLength}
                  onChange={(e) => handleSettingChange('maxPostLength', parseInt(e.target.value))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Post Approval</Label>
                  <p className="text-sm text-gray-500">All posts require admin approval before being visible</p>
                </div>
                <Switch
                  checked={settings.enablePostApproval}
                  onCheckedChange={(checked) => handleSettingChange('enablePostApproval', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Downvotes</Label>
                  <p className="text-sm text-gray-500">Allow users to downvote posts and comments</p>
                </div>
                <Switch
                  checked={settings.enableDownvotes}
                  onCheckedChange={(checked) => handleSettingChange('enableDownvotes', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Comments</Label>
                  <p className="text-sm text-gray-500">Allow users to comment on posts</p>
                </div>
                <Switch
                  checked={settings.enableComments}
                  onCheckedChange={(checked) => handleSettingChange('enableComments', checked)}
                />
              </div>

              <Button className="bg-academic-navy hover:bg-academic-navy/90">
                Save Posting Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Email Verification</Label>
                  <p className="text-sm text-gray-500">New users must verify their email address</p>
                </div>
                <Switch
                  checked={settings.requireEmailVerification}
                  onCheckedChange={(checked) => handleSettingChange('requireEmailVerification', checked)}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Content Filtering</h3>
                <div className="space-y-2">
                  <Label>Blocked Words (comma-separated)</Label>
                  <Textarea placeholder="Enter words to block..." />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Rate Limiting</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Posts per hour</Label>
                    <Input type="number" defaultValue="5" />
                  </div>
                  <div className="space-y-2">
                    <Label>Comments per hour</Label>
                    <Input type="number" defaultValue="20" />
                  </div>
                </div>
              </div>

              <Button className="bg-academic-navy hover:bg-academic-navy/90">
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Department Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Computer Science</p>
                    <p className="text-sm text-gray-500">156 posts, 89 members</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Remove</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Mathematics</p>
                    <p className="text-sm text-gray-500">98 posts, 67 members</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Remove</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Biology</p>
                    <p className="text-sm text-gray-500">78 posts, 54 members</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Remove</Button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Add New Department</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Department Name" />
                  <Input placeholder="Department Code" />
                </div>
                <Button className="mt-4 bg-academic-navy hover:bg-academic-navy/90">
                  Add Department
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteConfiguration;
