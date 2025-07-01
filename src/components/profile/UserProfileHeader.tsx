
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, User } from "lucide-react";

interface UserProfileHeaderProps {
  userId?: string;
}

const UserProfileHeader = ({ userId }: UserProfileHeaderProps) => {
  // Mock user data - in real app, fetch based on userId
  const user = {
    id: userId || "user1",
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    department: "Computer Science",
    role: "Graduate Student",
    joinDate: "2023-01-15",
    bio: "Passionate about algorithms and data structures. Currently working on my thesis in machine learning applications for network optimization.",
    reputation: 1250,
    posts: 24,
    bestAnswers: 8,
    helpfulVotes: 156,
    badges: ["Top Contributor", "Problem Solver", "Helpful"]
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="" alt={user.name} />
              <AvatarFallback className="text-xl">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Follow
            </Button>
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-academic-navy mb-2">
                  {user.name}
                </h1>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="outline">{user.department}</Badge>
                  <Badge variant="outline">{user.role}</Badge>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  <p>{user.email}</p>
                  <p>Member since {formatDate(user.joinDate)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span className="text-xl font-bold text-academic-navy">
                  {user.reputation}
                </span>
                <span className="text-sm text-gray-500">reputation</span>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{user.bio}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-xl font-bold text-academic-navy">{user.posts}</div>
                <div className="text-sm text-gray-500">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{user.bestAnswers}</div>
                <div className="text-sm text-gray-500">Best Answers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">{user.helpfulVotes}</div>
                <div className="text-sm text-gray-500">Helpful Votes</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">{user.badges.length}</div>
                <div className="text-sm text-gray-500">Badges</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {user.badges.map((badge, index) => (
                <Badge key={index} className="bg-yellow-100 text-yellow-800">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileHeader;
