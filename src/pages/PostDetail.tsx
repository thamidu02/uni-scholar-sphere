
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import PostVoting from "@/components/post/PostVoting";
import PostContent from "@/components/post/PostContent";
import CommentInput from "@/components/post/CommentInput";
import CommentsList from "@/components/post/CommentsList";

// Dummy post data (in a real app, this would come from an API)
const dummyPost = {
  id: "1",
  title: "Resources for Advanced Algorithms and Data Structures",
  content:
    "I'm currently studying for the Advanced Algorithms course and looking for supplementary materials beyond the textbook. Can anyone recommend some good resources? I'm particularly interested in graph algorithms and dynamic programming techniques.\n\nI've already gone through the lecture notes and practiced the problems in the textbook, but I feel I need more challenging exercises to really master these concepts before the exam next month.\n\nAny recommendations for online courses, YouTube channels, or practice problem sets would be greatly appreciated!",
  department: "Computer Science",
  questionType: "text",
  author: {
    id: "user1",
    name: "Alex Johnson",
  },
  votes: 24,
  userVote: null,
  comments: [
    {
      id: "comment1",
      author: {
        id: "user2",
        name: "Prof. Williams",
      },
      content:
        "I'd recommend checking out the Algorithm Design Manual by Skiena as a supplementary text. For online resources, MIT's OpenCourseWare has excellent materials on advanced algorithms.",
      votes: 12,
      userVote: null,
      createdAt: "2023-04-06T16:15:00Z",
      isBestAnswer: false,
    },
    {
      id: "comment2",
      author: {
        id: "user3",
        name: "Emily Chen",
      },
      content:
        "For graph algorithms specifically, I found the Stanford course on Coursera really helpful. It goes deeper into network flow problems and matching algorithms than our textbook does.",
      votes: 8,
      userVote: null,
      createdAt: "2023-04-06T17:30:00Z",
      isBestAnswer: true,
    },
    {
      id: "comment3",
      author: {
        id: "user4",
        name: "David Park",
      },
      content:
        "Have you tried the competitive programming problems on Codeforces or LeetCode? They have a good collection of algorithm challenges that really test your understanding. I found them particularly useful for dynamic programming practice.",
      votes: 6,
      userVote: null,
      createdAt: "2023-04-07T09:45:00Z",
      isBestAnswer: false,
    },
  ],
  createdAt: "2023-04-06T15:00:00Z",
};

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const [comments, setComments] = useState(dummyPost.comments);
  const [postVotes, setPostVotes] = useState({ votes: dummyPost.votes, userVote: dummyPost.userVote });
  
  // In a real app, check if current user is the post author
  const isPostAuthor = true;

  const handlePostVote = (voteType: 'up' | 'down') => {
    setPostVotes(prev => {
      const isCurrentVote = prev.userVote === voteType;
      const newUserVote = isCurrentVote ? null : voteType;
      
      let voteChange = 0;
      if (prev.userVote === 'up' && newUserVote === 'down') voteChange = -2;
      else if (prev.userVote === 'down' && newUserVote === 'up') voteChange = 2;
      else if (prev.userVote === null && newUserVote === 'up') voteChange = 1;
      else if (prev.userVote === null && newUserVote === 'down') voteChange = -1;
      else if (prev.userVote === 'up' && newUserVote === null) voteChange = -1;
      else if (prev.userVote === 'down' && newUserVote === null) voteChange = 1;

      return {
        votes: prev.votes + voteChange,
        userVote: newUserVote
      };
    });
  };

  const handleCommentVote = (commentId: string, voteType: 'up' | 'down') => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === commentId) {
          const isCurrentVote = comment.userVote === voteType;
          const newUserVote = isCurrentVote ? null : voteType;
          
          let voteChange = 0;
          if (comment.userVote === 'up' && newUserVote === 'down') voteChange = -2;
          else if (comment.userVote === 'down' && newUserVote === 'up') voteChange = 2;
          else if (comment.userVote === null && newUserVote === 'up') voteChange = 1;
          else if (comment.userVote === null && newUserVote === 'down') voteChange = -1;
          else if (comment.userVote === 'up' && newUserVote === null) voteChange = -1;
          else if (comment.userVote === 'down' && newUserVote === null) voteChange = 1;

          return {
            ...comment,
            votes: comment.votes + voteChange,
            userVote: newUserVote
          };
        }
        return comment;
      })
    );
  };

  const handleMarkBestAnswer = (commentId: string) => {
    setComments(prevComments => 
      prevComments.map(comment => ({
        ...comment,
        isBestAnswer: comment.id === commentId ? !comment.isBestAnswer : false
      }))
    );
  };

  const handleCommentSubmit = (comment: string, codeAnswer?: string, image?: File) => {
    // In a real app, this would save to the backend
    console.log('New comment:', { comment, codeAnswer, image });
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link
            to="/"
            className="text-academic-blue hover:text-academic-navy mb-4 inline-block"
          >
            ← Back to discussions
          </Link>
        </div>

        <Card className="mb-8">
          <div className="flex">
            <PostVoting
              votes={postVotes.votes}
              userVote={postVotes.userVote}
              onVote={handlePostVote}
            />
            <PostContent
              title={dummyPost.title}
              content={dummyPost.content}
              department={dummyPost.department}
              author={dummyPost.author}
              createdAt={dummyPost.createdAt}
            />
          </div>
        </Card>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-academic-navy">
            {dummyPost.comments.length} Answers
          </h2>
          
          <CommentInput onSubmit={handleCommentSubmit} />

          <CommentsList
            comments={comments}
            isPostAuthor={isPostAuthor}
            onCommentVote={handleCommentVote}
            onMarkBestAnswer={handleMarkBestAnswer}
          />
        </div>
      </div>
    </Layout>
  );
};

export default PostDetail;
