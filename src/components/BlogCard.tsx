import { Card } from './components';

const BlogCard = () => {
  const blog = [
    {
      id: 1,
      title: 'How to Hack Your Brain',
      description: 'What i did to fix my attention span',
    },
    {
      id: 2,
      title: 'How to Hack',
      description: 'How did i create a ransomware',
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      {blog.map((item) => (
        <Card
          className="p-2 rounded-sm w-full flex flex-col gap-1 hover:-translate-y-1 transition duration-200 ease-in-out"
          key={item.id}
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
