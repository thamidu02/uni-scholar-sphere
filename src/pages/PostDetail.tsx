import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowUp, ArrowDown, MessageSquare, CheckCircle, Check, Code, Upload, FileText, Calculator } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Dummy post data (in a real app, this would come from an API)
const dummyPost = {
  id: "1",
  title: "Resources for Advanced Algorithms and Data Structures",
  content:
    "I'm currently studying for the Advanced Algorithms course and looking for supplementary materials beyond the textbook. Can anyone recommend some good resources? I'm particularly interested in graph algorithms and dynamic programming techniques.\n\nI've already gone through the lecture notes and practiced the problems in the textbook, but I feel I need more challenging exercises to really master these concepts before the exam next month.\n\nAny recommendations for online courses, YouTube channels, or practice problem sets would be greatly appreciated!",
  department: "Computer Science",
  questionType: "text", // Add question type to determine comment input type
  author: {
    id: "user1",
    name: "Alex Johnson",
  },
  votes: 24,
  userVote: null, // null, 'up', or 'down'
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
  const [postVotes, setPostVotes] = useState({ votes: dummyPost.votes, userVote: dummyPost.userVote });
  const [commentAnswerType, setCommentAnswerType] = useState<string>("text");
  const [newComment, setNewComment] = useState("");
  const [newCodeAnswer, setNewCodeAnswer] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const { toast } = useToast();
  
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedImage(file);
      toast({
        title: "Image uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  const renderCommentInput = () => {
    switch (commentAnswerType) {
      case "text":
        return (
          <Textarea
            placeholder="Add your answer or thoughts to the discussion..."
            className="min-h-[100px] mb-2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        );
      
      case "code":
        return (
          <div className="space-y-3 mb-2">
            <Textarea
              placeholder="Explain your code solution..."
              className="min-h-[80px]"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Code className="h-4 w-4" />
                Code Solution
              </label>
              <Textarea
                placeholder="Paste your code here..."
                className="min-h-[150px] font-mono text-sm bg-gray-50"
                value={newCodeAnswer}
                onChange={(e) => setNewCodeAnswer(e.target.value)}
              />
            </div>
          </div>
        );
      
      case "image":
        return (
          <div className="space-y-3 mb-2">
            <Textarea
              placeholder="Describe your visual solution or answer..."
              className="min-h-[80px]"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload Supporting Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="comment-image-upload"
                />
                <label htmlFor="comment-image-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    {uploadedImage ? uploadedImage.name : "Click to upload an image"}
                  </p>
                </label>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <Textarea
            placeholder="Add your answer to the discussion..."
            className="min-h-[100px] mb-2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        );
    }
  };

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
              <button 
                className={`upvote-button transition-colors ${
                  postVotes.userVote === 'up' 
                    ? 'text-academic-blue' 
                    : 'text-gray-500 hover:text-academic-blue'
                }`}
                onClick={() => handlePostVote('up')}
              >
                <ArrowUp className="h-5 w-5" />
              </button>
              <span className="my-1 font-medium">{postVotes.votes}</span>
              <button 
                className={`downvote-button transition-colors ${
                  postVotes.userVote === 'down' 
                    ? 'text-red-500' 
                    : 'text-gray-500 hover:text-red-500'
                }`}
                onClick={() => handlePostVote('down')}
              >
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
            {dummyPost.comments.length} Answers
          </h2>
          
          {/* Enhanced Comment Input */}
          <div className="mb-6 space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-medium">Answer Type</label>
              <RadioGroup 
                value={commentAnswerType} 
                onValueChange={setCommentAnswerType}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="text" id="text" />
                  <label htmlFor="text" className="text-sm flex items-center gap-2 cursor-pointer">
                    <FileText className="h-4 w-4" />
                    Text Answer
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="code" id="code" />
                  <label htmlFor="code" className="text-sm flex items-center gap-2 cursor-pointer">
                    <Code className="h-4 w-4" />
                    Code Solution
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="image" id="image" />
                  <label htmlFor="image" className="text-sm flex items-center gap-2 cursor-pointer">
                    <Upload className="h-4 w-4" />
                    Visual Answer
                  </label>
                </div>
              </RadioGroup>
            </div>
            
            {renderCommentInput()}
            
            <div className="flex justify-end">
              <Button className="bg-academic-navy hover:bg-academic-navy/90">
                Post Answer
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
                    <button 
                      className={`upvote-button transition-colors ${
                        comment.userVote === 'up' 
                          ? 'text-academic-blue' 
                          : 'text-gray-500 hover:text-academic-blue'
                      }`}
                      onClick={() => handleCommentVote(comment.id, 'up')}
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
                      onClick={() => handleCommentVote(comment.id, 'down')}
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
                          onClick={() => handleMarkBestAnswer(comment.id)}
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
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostDetail;
