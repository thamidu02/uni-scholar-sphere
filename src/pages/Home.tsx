
import React from "react";
import Layout from "@/components/layout/Layout";
import PostList from "@/components/forum/PostList";
import CreatePostButton from "@/components/forum/CreatePostButton";
import { PostData } from "@/components/forum/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dummy data for our posts
const dummyPosts: PostData[] = [
  {
    id: "1",
    title: "Resources for Advanced Algorithms and Data Structures",
    content: "I'm currently studying for the Advanced Algorithms course and looking for supplementary materials beyond the textbook. Can anyone recommend some good resources? I'm particularly interested in graph algorithms and dynamic programming techniques.",
    department: "Computer Science",
    author: {
      id: "user1",
      name: "Alex Johnson",
    },
    votes: 24,
    comments: 12,
    createdAt: "2023-04-06T15:00:00Z",
  },
  {
    id: "2",
    title: "Understanding Coordinate Geometry in 3D Space",
    content: "I'm struggling with visualizing coordinate geometry problems in 3D space. The concepts from the lectures seem clear, but when it comes to solving complex problems, I get lost. Any tips or resources that might help me improve?",
    department: "Mathematics",
    author: {
      id: "user2",
      name: "Sarah Chen",
    },
    votes: 16,
    comments: 8,
    createdAt: "2023-04-05T10:30:00Z",
  },
  {
    id: "3",
    title: "Experimental Design for Biochemistry Research Project",
    content: "I'm planning my final year research project on enzyme kinetics and need advice on experimental design. Has anyone worked with similar assays before? Looking for tips on minimizing experimental errors and optimizing protocol efficiency.",
    department: "Chemistry",
    author: {
      id: "user3",
      name: "Michael Rodriguez",
    },
    votes: 12,
    comments: 6,
    createdAt: "2023-04-04T18:20:00Z",
  },
  {
    id: "4",
    title: "Comparing Literary Analysis Approaches for Modernist Fiction",
    content: "For my thesis, I'm comparing different approaches to analyzing modernist fiction. Currently focusing on Joyce and Woolf. Would love to discuss which critical frameworks others have found most illuminating for these authors.",
    department: "Literature",
    author: {
      id: "user4",
      name: "Emma Thompson",
    },
    votes: 18,
    comments: 9,
    createdAt: "2023-04-03T09:15:00Z",
  },
];

const Home = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-academic-navy">
            Academic Discussions
          </h1>
          <CreatePostButton />
        </div>

        <Tabs defaultValue="hot" className="mb-6">
          <TabsList>
            <TabsTrigger value="hot">Hot</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="top">Top</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
          <TabsContent value="hot" className="mt-4">
            <PostList posts={dummyPosts} />
          </TabsContent>
          <TabsContent value="new" className="mt-4">
            <PostList posts={[...dummyPosts].reverse()} />
          </TabsContent>
          <TabsContent value="top" className="mt-4">
            <PostList posts={[...dummyPosts].sort((a, b) => b.votes - a.votes)} />
          </TabsContent>
          <TabsContent value="saved" className="mt-4">
            <div className="text-center py-8">
              <h3 className="text-lg font-medium">No saved posts</h3>
              <p className="text-gray-500 mt-1">Your saved posts will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Home;
