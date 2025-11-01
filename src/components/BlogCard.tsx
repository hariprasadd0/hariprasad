import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom";

type Blog = {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  imageUrl?: string;
  slug: string;
};

type BlogCardProps = {
  blog: Blog;
};

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/blog/${blog.slug}`);
  };

  return (
    <Card 
      className="cursor-pointer shadow-none border-none p-4 hover:bg-muted/50 transition-colors w-full"
      onClick={handleClick}
    >
      <div className="flex flex-col gap-3 w-full">
        <span className="text-sm text-muted-foreground">{blog.date}</span>
        <h3 className="font-medium text-xl leading-tight">{blog.title}</h3>
        {blog.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{blog.description}</p>
        )}
      </div>
    </Card>
  );
};

export default BlogCard;
