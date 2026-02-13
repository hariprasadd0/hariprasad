import { IconType } from "react-icons";

export interface TechItem {
  tech: string;
  Icon: IconType;
}

export interface TechCategory {
  title: string;
  items: TechItem[];
}
import { BiLogoTypescript } from "react-icons/bi";

import {
  SiDocker,
  SiAmazon,
} from "react-icons/si";
import { FaGolang } from "react-icons/fa6";


import { FaNodeJs } from "react-icons/fa";
import { DiPostgresql, DiMongodb } from "react-icons/di";
import { RiNextjsFill } from "react-icons/ri";


export const techCategories: TechCategory[] = [
  {
    title: "Languages & Runtime",
    items: [
      { tech: "Golang", Icon: FaGolang },
      { tech: "Node.js", Icon: FaNodeJs },
      { tech: "TypeScript", Icon: BiLogoTypescript },
      { tech: "Next.js", Icon: RiNextjsFill },
    ],
  },
  {
    title: "Cloud",
    items: [
      { tech: "Docker", Icon: SiDocker },
      { tech: "AWS", Icon: SiAmazon },
    ],
  },
  {
    title: "Database",
    items: [
      { tech: "PostgreSQL", Icon: DiPostgresql },
      { tech: "MongoDB", Icon: DiMongodb },
    ],
  },
];
