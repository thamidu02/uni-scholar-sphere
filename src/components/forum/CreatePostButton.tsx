
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "lucide-react";

const CreatePostButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-academic-navy hover:bg-academic-navy/90">
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle className="font-serif">Create a New Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="department" className="text-sm font-medium">Department</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="computer-science">Computer Science</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="literature">Literature</SelectItem>
                <SelectItem value="geography">Geography</SelectItem>
                <SelectItem value="sociology">Sociology</SelectItem>
                <SelectItem value="architecture">Architecture</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input
              id="title"
              placeholder="Title for your academic discussion"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">Content</label>
            <Textarea
              id="content"
              placeholder="Share your academic question, insight or discussion topic in detail"
              className="min-h-[150px] w-full"
            />
          </div>
          <div className="flex justify-end pt-4">
            <Button
              type="submit" 
              className="bg-academic-navy hover:bg-academic-navy/90"
            >
              Post Discussion
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostButton;
