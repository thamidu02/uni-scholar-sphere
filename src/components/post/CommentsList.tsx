
import React from 'react';
import CommentCard from './CommentCard';

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

interface CommentsListProps {
  comments: Comment[];
  isPostAuthor: boolean;
  onCommentVote: (commentId: string, voteType: 'up' | 'down') => void;
  onMarkBestAnswer: (commentId: string) => void;
}

const CommentsList = ({ comments, isPostAuthor, onCommentVote, onMarkBestAnswer }: CommentsListProps) => {
  const sortedComments = [...comments].sort((a, b) => {
    if (a.isBestAnswer && !b.isBestAnswer) return -1;
    if (!a.isBestAnswer && b.isBestAnswer) return 1;
    return 0;
  });

  return (
    <div className="space-y-4">
      {sortedComments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          isPostAuthor={isPostAuthor}
          onVote={onCommentVote}
          onMarkBestAnswer={onMarkBestAnswer}
        />
      ))}
    </div>
  );
};

export default CommentsList;
