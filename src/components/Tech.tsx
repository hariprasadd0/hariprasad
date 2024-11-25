import React, { ComponentPropsWithoutRef,  } from "react";
import { Badge } from "./components";

type TechProps = {
  tech: string;
  Icon: React.ElementType;
} & ComponentPropsWithoutRef<typeof Badge>;


const Tech = ({ tech, Icon, ...props }: TechProps) => {
 
  return (
    
    <Badge
      variant={"outline"}
      className={`flex gap-2 rounded-md  px-3 py-1 items-center`}
      {...props}
    >
      {<Icon />}
      <p>{tech}</p>
    </Badge>
  );
};

export default Tech;
