
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, CheckCircle, Check } from 'lucide-react';

interface Author {
  id: string;
  name: string;
}

interface Comment {
  id: string;
  author: Author;
  content: string;
  votes: number;
  userVote: 'up' | 'down' | null;
  createdAt: string;
  isBestAnswer: boolean;
}

interface CommentCardProps {
  comment: Comment;
  isPostAuthor: boolean;
  onVote: (commentId: string, voteType: 'up' | 'down') => void;
  onMarkBestAnswer: (commentId: string) => void;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const CommentCard = ({ comment, isPostAuthor, onVote, onMarkBestAnswer }: CommentCardProps) => {
  return (
    <Card className={`overflow-hidden ${comment.isBestAnswer ? 'ring-2 ring-green-200 bg-green-50/30' : ''}`}>
      {comment.isBestAnswer && (
        <div className="bg-green-100 px-4 py-2 border-b border-green-200">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Best Answer</span>
          </div>
        </div>
      )}
      <div className="flex">
        <div className="w-12 bg-gray-50 flex flex-col items-center py-4">
          <button 
            className={`upvote-button transition-colors ${
              comment.userVote === 'up' 
                ? 'text-academic-blue' 
                : 'text-gray-500 hover:text-academic-blue'
            }`}
            onClick={() => onVote(comment.id, 'up')}
          >
            <ArrowUp className="h-4 w-4" />
          </button>
          <span className="my-1 text-sm font-medium">
            {comment.votes}
          </span>
          <button 
            className={`downvote-button transition-colors ${
              comment.userVote === 'down' 
                ? 'text-red-500' 
                : 'text-gray-500 hover:text-red-500'
            }`}
            onClick={() => onVote(comment.id, 'down')}
          >
            <ArrowDown className="h-4 w-4" />
          </button>
        </div>

        <CardContent className="flex-1 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback>
                  {getInitials(comment.author.name)}
                </AvatarFallback>
              </Avatar>
              <Link
                to={`/user/${comment.author.id}`}
                className="font-medium text-academic-navy hover:underline"
              >
                {comment.author.name}
              </Link>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-500">
                {formatDate(comment.createdAt)}
              </span>
            </div>
            
            {isPostAuthor && (
              <Button
                variant={comment.isBestAnswer ? "default" : "outline"}
                size="sm"
                onClick={() => onMarkBestAnswer(comment.id)}
                className={`text-xs transition-colors ${
                  comment.isBestAnswer 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'hover:bg-green-50 hover:text-green-700 hover:border-green-300'
                }`}
              >
                <Check className="h-3 w-3 mr-1" />
                {comment.isBestAnswer ? 'Best Answer' : 'Mark as Best'}
              </Button>
            )}
          </div>
          <p className="text-gray-700">{comment.content}</p>
        </CardContent>
      </div>
    </Card>
  );
};

export default CommentCard;
