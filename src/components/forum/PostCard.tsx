
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, MessageSquare } from "lucide-react";

export interface PostData {
  id: string;
  title: string;
  content: string;
  department: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  votes: number;
  comments: number;
  createdAt: string;
}

interface PostCardProps {
  post: PostData;
}

const PostCard = ({ post }: PostCardProps) => {
  // Get author initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="post-card mb-4 overflow-hidden">
      <div className="flex">
        {/* Voting Column */}
        <div className="w-16 bg-gray-50 flex flex-col items-center py-4">
          <button className="upvote-button text-gray-500 hover:text-academic-blue">
            <ArrowUp className="h-5 w-5" />
          </button>
          <span className="my-1 font-medium">{post.votes}</span>
          <button className="downvote-button text-gray-500 hover:text-red-500">
            <ArrowDown className="h-5 w-5" />
          </button>
        </div>

        {/* Post Content */}
        <CardContent className="flex-1 p-4">
          <div className="flex items-center gap-2 mb-1.5 text-sm text-gray-600">
            <Badge variant="outline" className="font-normal bg-academic-light-gray/50">
              {post.department}
            </Badge>
            <span>Posted by</span>
            <Link to={`/user/${post.author.id}`} className="font-medium text-academic-navy hover:underline">
              {post.author.name}
            </Link>
            <span className="text-gray-400">•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          <Link to={`/post/${post.id}`}>
            <h3 className="text-xl font-bold mb-2 text-academic-navy hover:text-academic-blue transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-700 line-clamp-2 mb-4">{post.content}</p>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to={`/post/${post.id}`}
              className="flex items-center gap-1 text-gray-500 hover:text-academic-blue"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm">{post.comments} comments</span>
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default PostCard;
