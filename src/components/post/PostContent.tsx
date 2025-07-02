
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface Author {
  id: string;
  name: string;
}

interface PostContentProps {
  title: string;
  content: string;
  department: string;
  author: Author;
  createdAt: string;
}

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

const PostContent = ({ title, content, department, author, createdAt }: PostContentProps) => {
  return (
    <div className="flex-1 p-6">
      <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
        <Badge
          variant="outline"
          className="font-normal bg-academic-light-gray/50"
        >
          {department}
        </Badge>
        <span>Posted by</span>
        <Link
          to={`/user/${author.id}`}
          className="font-medium text-academic-navy hover:underline"
        >
          {author.name}
        </Link>
        <span className="text-gray-400">•</span>
        <span>{formatDate(createdAt)}</span>
      </div>

      <h1 className="text-2xl font-bold mb-4 text-academic-navy">
        {title}
      </h1>

      <div className="prose max-w-none">
        {content.split("\n\n").map((paragraph, idx) => (
          <p key={idx} className="mb-4 text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PostContent;
