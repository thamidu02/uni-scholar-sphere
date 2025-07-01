
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, User } from "lucide-react";

interface UserReputationProps {
  userId?: string;
}

const UserReputation = ({ userId }: UserReputationProps) => {
  // Mock reputation data
  const reputationData = {
    total: 1250,
    breakdown: [
      { source: "Best Answers", points: 600, count: 8, description: "15 points per best answer" },
      { source: "Helpful Posts", points: 400, count: 40, description: "10 points per helpful post" },
      { source: "Question Upvotes", points: 200, count: 20, description: "10 points per question upvote" },
      { source: "Answer Upvotes", points: 50, count: 25, description: "2 points per answer upvote" }
    ],
    badges: [
      { name: "Top Contributor", description: "Posted 20+ helpful answers", earned: "2024-01-01", rarity: "gold" },
      { name: "Problem Solver", description: "Received 10+ best answer marks", earned: "2023-12-15", rarity: "silver" },
      { name: "Helpful", description: "Received 50+ helpful votes", earned: "2023-11-20", rarity: "bronze" },
      { name: "Active Member", description: "Active for 6+ months", earned: "2023-07-15", rarity: "bronze" }
    ],
    recentChanges: [
      { date: "2024-01-06", change: +15, reason: "Best answer marked" },
      { date: "2024-01-05", change: +10, reason: "Post marked as helpful" },
      { date: "2024-01-04", change: +2, reason: "Answer upvoted" },
      { date: "2024-01-03", change: +10, reason: "Question upvoted" }
    ]
  };

  const getBadgeColor = (rarity: string) => {
    switch (rarity) {
      case "gold": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "silver": return "bg-gray-100 text-gray-800 border-gray-300";
      case "bronze": return "bg-orange-100 text-orange-800 border-orange-300";
      default: return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-academic-navy" />
              Reputation Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center pb-4 border-b">
                <div className="text-3xl font-bold text-academic-navy">
                  {reputationData.total}
                </div>
                <div className="text-sm text-gray-500">Total Reputation</div>
              </div>
              
              {reputationData.breakdown.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{item.source}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-academic-navy">+{item.points}</div>
                    <div className="text-sm text-gray-500">{item.count} times</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reputationData.recentChanges.map((change, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">{change.reason}</div>
                    <div className="text-xs text-gray-500">{formatDate(change.date)}</div>
                  </div>
                  <div className={`font-bold ${change.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {change.change > 0 ? '+' : ''}{change.change}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Badges & Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reputationData.badges.map((badge, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className={`p-2 rounded-full ${getBadgeColor(badge.rarity)}`}>
                  <Award className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{badge.name}</h3>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getBadgeColor(badge.rarity)}`}
                    >
                      {badge.rarity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{badge.description}</p>
                  <p className="text-xs text-gray-500">
                    Earned {new Date(badge.earned).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserReputation;
