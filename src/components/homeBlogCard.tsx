import { Card } from './components';
import { useNavigate } from 'react-router-dom';
type Blog = {
  title: string;
  description: string;
  url: string;
};
type BlogCardProps = {
  blog: Blog[];
};
const HomeBlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2">
      {blog.length < 2 ? (
        <div className="text-right">
          <span className="text-sm text-muted-foreground cursor-pointer  rounded-sm px-2 py-1" 
           onClick={() => navigate('/blog')}
          >
            see more
          </span>
        </div>
      ) : (
        <></>
      )}
      {blog.map((item, index) => (
        <Card
          className="p-2 rounded-sm cursor-pointer w-full flex flex-col gap-1 hover:-translate-y-1 transition duration-200 ease-in-out"
          key={index}
          onClick={() => navigate('/blog/')}
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

export default HomeBlogCard;
