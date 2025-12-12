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
  SiGoland,
  SiDocker,
  SiAmazon,
} from "react-icons/si";

import { FaNodeJs } from "react-icons/fa";
import { DiPostgresql, DiMongodb } from "react-icons/di";

export const techCategories: TechCategory[] = [
  {
    title: "Languages & Runtime",
    items: [
      { tech: "Golang", Icon: SiGoland },
      { tech: "TypeScript", Icon: BiLogoTypescript },
      { tech: "Node.js", Icon: FaNodeJs },
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
