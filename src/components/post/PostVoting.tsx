
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface PostVotingProps {
  votes: number;
  userVote: 'up' | 'down' | null;
  onVote: (voteType: 'up' | 'down') => void;
}

const PostVoting = ({ votes, userVote, onVote }: PostVotingProps) => {
  return (
    <div className="w-16 bg-gray-50 flex flex-col items-center py-6">
      <button 
        className={`upvote-button transition-colors ${
          userVote === 'up' 
            ? 'text-academic-blue' 
            : 'text-gray-500 hover:text-academic-blue'
        }`}
        onClick={() => onVote('up')}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      <span className="my-1 font-medium">{votes}</span>
      <button 
        className={`downvote-button transition-colors ${
          userVote === 'down' 
            ? 'text-red-500' 
            : 'text-gray-500 hover:text-red-500'
        }`}
        onClick={() => onVote('down')}
      >
        <ArrowDown className="h-5 w-5" />
      </button>
    </div>
  );
};

export default PostVoting;
