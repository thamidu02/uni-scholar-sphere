
import React from "react";
import PostCard, { PostData } from "./PostCard";

interface PostListProps {
  posts: PostData[];
}

const PostList = ({ posts }: PostListProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium">No posts yet</h3>
        <p className="text-gray-500 mt-1">Be the first to start a discussion!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
