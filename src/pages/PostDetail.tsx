
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, MessageSquare, CheckCircle, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Dummy post data (in a real app, this would come from an API)
const dummyPost = {
  id: "1",
  title: "Resources for Advanced Algorithms and Data Structures",
  content:
    "I'm currently studying for the Advanced Algorithms course and looking for supplementary materials beyond the textbook. Can anyone recommend some good resources? I'm particularly interested in graph algorithms and dynamic programming techniques.\n\nI've already gone through the lecture notes and practiced the problems in the textbook, but I feel I need more challenging exercises to really master these concepts before the exam next month.\n\nAny recommendations for online courses, YouTube channels, or practice problem sets would be greatly appreciated!",
  department: "Computer Science",
  author: {
    id: "user1",
    name: "Alex Johnson",
  },
  votes: 24,
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
      createdAt: "2023-04-07T09:45:00Z",
      isBestAnswer: false,
    },
  ],
  createdAt: "2023-04-06T15:00:00Z",
};

// Function to format date
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

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const [comments, setComments] = useState(dummyPost.comments);
  
  // In a real app, check if current user is the post author
  const isPostAuthor = true; // Mock - in real app, compare current user ID with post author ID

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleMarkBestAnswer = (commentId: string) => {
    setComments(prevComments => 
      prevComments.map(comment => ({
        ...comment,
        isBestAnswer: comment.id === commentId ? !comment.isBestAnswer : false
      }))
    );
  };

  // Sort comments to show best answer first
  const sortedComments = [...comments].sort((a, b) => {
    if (a.isBestAnswer && !b.isBestAnswer) return -1;
    if (!a.isBestAnswer && b.isBestAnswer) return 1;
    return 0;
  });

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
            {/* Voting Column */}
            <div className="w-16 bg-gray-50 flex flex-col items-center py-6">
              <button className="upvote-button text-gray-500 hover:text-academic-blue">
                <ArrowUp className="h-5 w-5" />
              </button>
              <span className="my-1 font-medium">{dummyPost.votes}</span>
              <button className="downvote-button text-gray-500 hover:text-red-500">
                <ArrowDown className="h-5 w-5" />
              </button>
            </div>

            {/* Post Content */}
            <div className="flex-1 p-6">
              <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                <Badge
                  variant="outline"
                  className="font-normal bg-academic-light-gray/50"
                >
                  {dummyPost.department}
                </Badge>
                <span>Posted by</span>
                <Link
                  to={`/user/${dummyPost.author.id}`}
                  className="font-medium text-academic-navy hover:underline"
                >
                  {dummyPost.author.name}
                </Link>
                <span className="text-gray-400">•</span>
                <span>{formatDate(dummyPost.createdAt)}</span>
              </div>

              <h1 className="text-2xl font-bold mb-4 text-academic-navy">
                {dummyPost.title}
              </h1>

              <div className="prose max-w-none">
                {dummyPost.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-4 text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-academic-navy">
            {dummyPost.comments.length} Comments
          </h2>
          <div className="mb-6">
            <Textarea
              placeholder="Add a comment to the discussion..."
              className="min-h-[100px] mb-2"
            />
            <div className="flex justify-end">
              <Button className="bg-academic-navy hover:bg-academic-navy/90">
                Comment
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {sortedComments.map((comment) => (
              <Card key={comment.id} className={`overflow-hidden ${comment.isBestAnswer ? 'ring-2 ring-green-200 bg-green-50/30' : ''}`}>
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
                    <button className="upvote-button text-gray-500 hover:text-academic-blue">
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <span className="my-1 text-sm font-medium">
                      {comment.votes}
                    </span>
                    <button className="downvote-button text-gray-500 hover:text-red-500">
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
                          onClick={() => handleMarkBestAnswer(comment.id)}
                          className={`text-xs ${comment.isBestAnswer ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-green-50 hover:text-green-700 hover:border-green-300'}`}
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
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostDetail;
