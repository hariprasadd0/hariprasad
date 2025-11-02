import { Badge } from '@/components/ui/badge';

type TimelineItem = {
  current: boolean;
  title: string;
  company: string;
  companyLogo?: string;
  duration?: string;
  skills?: string[];
};
type TimelineProps = {
  data: TimelineItem[];
};
const Timeline = ({ data }: TimelineProps) => {
  return (
    <div className="space-y-5 pt-2 pb-6 md:pb-8 lg:pb-12">
      {' '}
      {/* Added responsive padding at the bottom */}
      {data.map((item, index) => (
        <div
          key={index}
          className="relative group"
        >
          <div className="flex items-start gap-4">
            {/* Status Indicator */}
            <div className="mt-2">
              <div
                className={`w-2 h-2 rounded-full transition-colors
                  ${
                    item.current
                      ? 'bg-primary ring-4 ring-primary/20'
                      : 'bg-muted-foreground/30'
                  }`}
              />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  {/* Title and Role */}
                  <div className="flex items-center gap-2">
                    {item.current ? (
                      <>
                        <h3 className="font-medium text-sm">{item.title}</h3>
                        
                      </>
                    ) : (
                      <h3 className="font-medium text-sm text-muted-foreground">
                        {item.title}
                      </h3>
                    )}
                  </div>

                  {/* Company */}
                  <div className="flex items-center gap-1 mt-1">
                     {item.companyLogo && (
                      <img
                        src={item.companyLogo}
                        alt={item.company}
                        className="w-5 h-5 filter grayscale saturate-0"
                      />
                    )}
                    <p className="text-xs text-muted-foreground">
                    {item.company}
                    {item.duration && (
                      <span className="text-muted-foreground/60">
                        {' '}
                        • {item.duration}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              </div>

              {/* Skills */}
              {item.skills && (
                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="text-xs font-normal px-2 py-0.5 text-muted-foreground"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
