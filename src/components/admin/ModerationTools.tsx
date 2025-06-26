
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertTriangle, Eye, Ban, Check, X } from "lucide-react";

const ModerationTools = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    {
      id: 1,
      type: "Inappropriate Content",
      postTitle: "Discussion about advanced algorithms",
      reportedBy: "student123@university.edu",
      reportedUser: "john.doe@university.edu",
      date: "2024-01-20",
      status: "Pending",
      priority: "High"
    },
    {
      id: 2,
      type: "Spam",
      postTitle: "Help with calculus homework",
      reportedBy: "prof.wilson@university.edu",
      reportedUser: "spam.user@university.edu",
      date: "2024-01-19",
      status: "Under Review",
      priority: "Medium"
    },
    {
      id: 3,
      type: "Academic Dishonesty",
      postTitle: "Looking for exam answers",
      reportedBy: "admin@university.edu",
      reportedUser: "cheater@university.edu",
      date: "2024-01-18",
      status: "Resolved",
      priority: "High"
    }
  ];

  const flaggedContent = [
    {
      id: 1,
      type: "Post",
      title: "Suspicious research paper discussion",
      author: "questionable.user@university.edu",
      flagReason: "Potential plagiarism",
      date: "2024-01-20"
    },
    {
      id: 2,
      type: "Comment",
      title: "Inappropriate language in mathematics forum",
      author: "rude.student@university.edu",
      flagReason: "Offensive language",
      date: "2024-01-19"
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="reports" className="w-full">
        <TabsList>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="flagged">Flagged Content</TabsTrigger>
          <TabsTrigger value="banned">Banned Users</TabsTrigger>
        </TabsList>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Content Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Post Title</TableHead>
                    <TableHead>Reported User</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.type}</TableCell>
                      <TableCell className="max-w-xs truncate">{report.postTitle}</TableCell>
                      <TableCell>{report.reportedUser}</TableCell>
                      <TableCell>{report.reportedBy}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>
                        <Badge variant={report.priority === 'High' ? 'destructive' : 'secondary'}>
                          {report.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={report.status === 'Resolved' ? 'default' : 'secondary'}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flagged">
          <Card>
            <CardHeader>
              <CardTitle>Flagged Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Flag Reason</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flaggedContent.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.type}</TableCell>
                      <TableCell className="max-w-xs truncate">{item.title}</TableCell>
                      <TableCell>{item.author}</TableCell>
                      <TableCell>{item.flagReason}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Review</Button>
                          <Button size="sm" variant="destructive">Remove</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banned">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ban className="h-5 w-5 text-red-500" />
                Banned Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">cheater@university.edu</p>
                    <p className="text-sm text-gray-500">Banned for academic dishonesty</p>
                    <p className="text-xs text-gray-400">Banned on: 2024-01-18</p>
                  </div>
                  <Button variant="outline" size="sm">Unban</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">spam.user@university.edu</p>
                    <p className="text-sm text-gray-500">Banned for repeated spam</p>
                    <p className="text-xs text-gray-400">Banned on: 2024-01-15</p>
                  </div>
                  <Button variant="outline" size="sm">Unban</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModerationTools;
