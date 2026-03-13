import type { ExperienceItem } from "@/data/experience";

type TimelineProps = {
  data: ExperienceItem[];
};

const Timeline = ({ data }: TimelineProps) => {
  return (
    <div className="space-y-5 pt-2 pb-3 p-2">
      {data.map((item, index) => (
        <div key={index} className="relative group">
          <div className="flex items-start gap-4">
            {/* Status Indicator */}
            <div className="mt-2">
              <div
                className={`w-2 h-2 rounded-full transition-colors ${
                  item.current
                    ? "bg-primary/90 ring-4 ring-primary/20"
                    : "bg-muted-foreground/30"
                }`}
              />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-1">
              {/* Company + Logo */}
              <div className="flex items-center gap-2">
                {item.companyLogo && (
                  <img
                    src={item.companyLogo}
                    alt={item.company}
                    className="w-5 h-5 filter grayscale"
                  />
                )}
                <h3
                  className={`font-medium text-md tracking-wider ${
                    item.current ? "" : "text-[#A3A3A3]"
                  }`}
                >
                  {item.company}
                </h3>
              </div>

              {/* Title + Duration */}
              <p className="text-xs text-muted-foreground">
                {item.title}
                {item.duration && (
                  <span className="text-muted-foreground/60">
                    {" "}• {item.duration}
                  </span>
                )}
              </p>

              {/* Description */}
              {item.description && (
  <ul className="font-[Satoshi] mt-1 space-y-0.5 text-[11px] leading-4 text-muted-foreground/60">
    {(Array.isArray(item.description)
      ? item.description
      : item.description.split(",")
    ).map((task, i) => (
      <li key={i} className="flex items-start gap-1.5">
        <span className="mt-[2px] text-muted-foreground/40">•</span>
        <span>{task.trim()}</span>
      </li>
    ))}
  </ul>
)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;