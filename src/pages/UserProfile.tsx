
import React from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import UserProfileHeader from "@/components/profile/UserProfileHeader";
import UserActivityFeed from "@/components/profile/UserActivityFeed";
import UserReputation from "@/components/profile/UserReputation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <UserProfileHeader userId={userId} />
        
        <Tabs defaultValue="activity" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="reputation">Reputation</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="mt-6">
            <UserActivityFeed userId={userId} />
          </TabsContent>
          
          <TabsContent value="reputation" className="mt-6">
            <UserReputation userId={userId} />
          </TabsContent>
          
          <TabsContent value="posts" className="mt-6">
            <div className="text-center py-8">
              <h3 className="text-lg font-medium">User Posts</h3>
              <p className="text-gray-500 mt-1">All posts by this user will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserProfile;
