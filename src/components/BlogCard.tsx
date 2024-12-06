import { Card } from './components';
import { Blog } from '@/data/blog';
const BlogCard = ({ blog }) => {
  return (
    <div className="flex flex-col gap-2">
      {blog.map((item: Blog, index) => (
        <Card
          className="p-2 rounded-sm cursor-pointer w-full flex flex-col gap-1 hover:-translate-y-1 transition duration-200 ease-in-out"
          key={index}
          onClick={() => window.open(`${item.url}`, '_blank')}
        >
          <h1 className="font-semibold">{item.title}</h1>
          <span className="text-muted-foreground text-sm">
            {item.description}
          </span>
        </Card>
      ))}
    </div>
  );
};

export default BlogCard;
