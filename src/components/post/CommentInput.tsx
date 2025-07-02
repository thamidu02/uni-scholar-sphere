
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Code, Upload, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CommentInputProps {
  onSubmit: (comment: string, codeAnswer?: string, image?: File) => void;
}

const CommentInput = ({ onSubmit }: CommentInputProps) => {
  const [commentAnswerType, setCommentAnswerType] = useState<string>("text");
  const [newComment, setNewComment] = useState("");
  const [newCodeAnswer, setNewCodeAnswer] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const { toast } = useToast();

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

  const handleSubmit = () => {
    onSubmit(newComment, newCodeAnswer, uploadedImage || undefined);
    setNewComment("");
    setNewCodeAnswer("");
    setUploadedImage(null);
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

  return (
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
        <Button 
          className="bg-academic-navy hover:bg-academic-navy/90"
          onClick={handleSubmit}
        >
          Post Answer
        </Button>
      </div>
    </div>
  );
};

export default CommentInput;
