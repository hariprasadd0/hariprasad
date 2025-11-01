import { Card } from "@/components/ui/card"
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Badge } from "@/components/components";
import { Button } from "@/components/ui/button";

interface RedirectProps {
  url?: string;
  title?: string;
  className?: string;
}

const Redirect: React.FC<RedirectProps> = ({
  url = "https://your-blog-url.com",
  title = "Visit Blog",
  className = ""
}) => {
  const handleRedirect = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className={`cursor-pointer shadow-none border-none hover:shadow-md transition-shadow ${className}`}>
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ExternalLink size={16} />
            <span>External Link</span>
          </div>
          <Badge variant="outline" className="text-xs">
            Blog
          </Badge>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground break-all font-mono">
            {url}
          </p>
        </div>

        <Button
          variant={'outline'}
          className="shadow-md w-full flex items-center gap-2 justify-center"
          onClick={handleRedirect}
        >
          <span>Visit Blog</span>
          <ArrowRight size={16} />
        </Button>
      </div>
    </Card>
  );
};

export default Redirect;
