
import React, { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { PlusIcon, X, Upload, Code, FileText, Image, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreatePostButton = () => {
  const [questionType, setQuestionType] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const { toast } = useToast();

  const questionTypes = [
    { value: "text", label: "Text Question", icon: FileText },
    { value: "code", label: "Code Problem", icon: Code },
    { value: "image", label: "Image-based Question", icon: Image },
    { value: "math", label: "Math Problem", icon: Calculator },
  ];

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setUploadedImage(file);
        toast({
          title: "Image uploaded",
          description: `${file.name} has been uploaded successfully.`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive",
        });
      }
    }
  };

  const renderContentInput = () => {
    switch (questionType) {
      case "text":
        return (
          <Textarea
            id="content"
            placeholder="Describe your question in detail. Be specific about what you're trying to understand or solve."
            className="min-h-[150px] w-full"
          />
        );
      
      case "code":
        return (
          <div className="space-y-3">
            <Textarea
              id="description"
              placeholder="Describe the problem you're facing with your code..."
              className="min-h-[100px] w-full"
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Code Block</label>
              <Textarea
                id="code"
                placeholder="Paste your code here..."
                className="min-h-[200px] w-full font-mono text-sm bg-gray-50"
              />
            </div>
          </div>
        );
      
      case "image":
        return (
          <div className="space-y-3">
            <Textarea
              id="description"
              placeholder="Describe what you need help with regarding the image..."
              className="min-h-[100px] w-full"
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    {uploadedImage ? uploadedImage.name : "Click to upload an image"}
                  </p>
                </label>
              </div>
            </div>
          </div>
        );
      
      case "math":
        return (
          <div className="space-y-3">
            <Textarea
              id="description"
              placeholder="Describe the math problem you need help with..."
              className="min-h-[100px] w-full"
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Math Expression/Problem</label>
              <Textarea
                id="math"
                placeholder="Enter your mathematical expression or problem here. You can use LaTeX notation if needed."
                className="min-h-[120px] w-full font-mono text-sm"
              />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-8 text-gray-500">
            <FileText className="mx-auto h-12 w-12 mb-2 opacity-50" />
            <p>Please select a question type above to continue</p>
          </div>
        );
    }
  };

  const getSelectedTypeIcon = () => {
    const type = questionTypes.find(t => t.value === questionType);
    return type ? type.icon : FileText;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-academic-navy hover:bg-academic-navy/90">
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif">Create a New Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label htmlFor="question-type" className="text-sm font-medium">Question Type</label>
              <Select value={questionType} onValueChange={setQuestionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  {questionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input
              id="title"
              placeholder="Write a clear, descriptive title for your question"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {questionType && React.createElement(getSelectedTypeIcon(), { className: "h-4 w-4" })}
              <label className="text-sm font-medium">
                {questionType ? `${questionTypes.find(t => t.value === questionType)?.label} Content` : 'Content'}
              </label>
            </div>
            {renderContentInput()}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Tags</label>
            <div className="flex gap-2">
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag (e.g., algorithms, calculus, essay-writing)"
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button 
                type="button" 
                onClick={addTag}
                variant="outline"
                size="sm"
              >
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-red-500" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit" 
              className="bg-academic-navy hover:bg-academic-navy/90"
              disabled={!questionType}
            >
              Post Question
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostButton;
