import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TechCategory } from "@/data/techData";

interface TechStackProps {
  categories: TechCategory[];
}

export const TechStack = ({ categories }: TechStackProps) => {
  console.log(categories);
  return (
    <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories?.map((category) => (
        <Card
          key={category.title}
          className=" bg-transparent last:col-span-2 flex flex-col rounded-none border-border/50 shadow-none hover:border-border hover:shadow-sm transition-all duration-300"
        >
          <CardHeader className="p-2">
            <CardTitle className="text-xs font-medium  text-muted-foreground">
              {category.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-2">
            <div className="flex flex-col gap-2 ">
              {category?.items?.map((item) => (
                <Badge
                  key={item.tech}
                  variant="outline"
                  className="
                    flex items-center gap-3
                    border-none
                    px-0
                    rounded-none
                    text-secondary-foreground
                    font-medium text-xs
                    transition-colors cursor-default
                  "
                >
                  {/* Render the Icon directly since it is a component in your data */}
                  <item.Icon className="h-4 w-4 text-foreground/70" />
                  <span className="text-subtext">{item.tech}</span>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
