
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { MessageSquare, Award, User } from "lucide-react";

interface UserActivityFeedProps {
  userId?: string;
}

const UserActivityFeed = ({ userId }: UserActivityFeedProps) => {
  // Mock activity data
  const activities = [
    {
      id: "1",
      type: "post",
      title: "Created a new post",
      description: "Resources for Advanced Algorithms and Data Structures",
      department: "Computer Science",
      timestamp: "2024-01-06T15:00:00Z",
      votes: 24,
      comments: 12
    },
    {
      id: "2",
      type: "best_answer",
      title: "Answer marked as best",
      description: "Provided solution for dynamic programming problem",
      department: "Computer Science",
      timestamp: "2024-01-05T14:30:00Z",
      reputation: 15
    },
    {
      id: "3",
      type: "comment",
      title: "Commented on post",
      description: "Understanding Coordinate Geometry in 3D Space",
      department: "Mathematics",
      timestamp: "2024-01-04T10:15:00Z",
      votes: 8
    },
    {
      id: "4",
      type: "achievement",
      title: "Earned badge",
      description: "Problem Solver - Helped 10+ users with their questions",
      timestamp: "2024-01-03T16:45:00Z"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "post":
        return <MessageSquare className="h-4 w-4" />;
      case "best_answer":
        return <Award className="h-4 w-4 text-green-600" />;
      case "achievement":
        return <Award className="h-4 w-4 text-yellow-500" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-academic-navy">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <Card key={activity.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-gray-100 rounded-full">
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-academic-navy">
                      {activity.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {formatDate(activity.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-2">{activity.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    {activity.department && (
                      <Badge variant="outline" className="text-xs">
                        {activity.department}
                      </Badge>
                    )}
                    
                    {activity.votes && (
                      <span className="text-gray-500">
                        {activity.votes} votes
                      </span>
                    )}
                    
                    {activity.comments && (
                      <span className="text-gray-500">
                        {activity.comments} comments
                      </span>
                    )}
                    
                    {activity.reputation && (
                      <span className="text-green-600 font-medium">
                        +{activity.reputation} reputation
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserActivityFeed;
