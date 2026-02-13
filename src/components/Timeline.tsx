import { Badge } from "@/components/ui/badge";
import { getIcon } from "@/lib/icons";

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
    <div className="space-y-5 pt-2 pb-3 p-2">
      {" "}
      {/* Added responsive padding at the bottom */}
      {data.map((item, index) => (
        <div key={index} className="relative group">
          <div className="flex items-start gap-4">
            {/* Status Indicator */}
            <div className="mt-2">
              <div
                className={`w-2 h-2 rounded-full transition-colors
                  ${item.current
                    ? "bg-primary/90 ring-4 ring-primary/20"
                    : "bg-muted-foreground/30"
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
                      {item.companyLogo && (
                      <img
                        src={item.companyLogo}
                        alt={item.company}
                        className="w-5 h-5 filter grayscale"
                      />
                    )}
                        <h3 className="font-medium text-md tracking-wider">{item.company}</h3>
                      </>
                    ) : (
                      <h3 className="font-medium text-md text-[#A3A3A3] tracking-wide">
                        {item.company}
                      </h3>
                    )}
                  </div>

                  {/* Company */}
                  <div className="flex items-center gap-1 mt-1">
                    
                    <p className="text-xs text-muted-foreground">
                      {item.title}
                      {item.duration && (
                        <span className="text-muted-foreground/60">
                          {" "}
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
                  {item.skills.map((skill) => {
                    const Icon = getIcon(skill.toLowerCase());
                    return (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="flex items-center gap-0.5 text-xs font-normal px-2 py-0.5 text-muted-foreground rounded-[2px] "
                      >
                       {Icon && <Icon className="inline w-4 h-4" /> ? <Icon className="inline w-4 h-4" /> : skill.toLowerCase()}
                      </Badge>
                    );
                  })}
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
