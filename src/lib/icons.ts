import { DiMongodb, DiPostgresql } from "react-icons/di";
import { BiLogoTypescript } from "react-icons/bi";
import { FaReact, FaNodeJs, FaAws } from "react-icons/fa";
import { IoIosGitBranch } from "react-icons/io";
import { RiTailwindCssFill, RiNextjsFill } from "react-icons/ri";
import { SiAngular, SiMui, SiGo, SiShadcnui } from "react-icons/si";
import { IconType } from "react-icons";
import { AiOutlinePython } from "react-icons/ai";
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  ReadCvLogoIcon,
  WarningCircleIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import { TbBrandLeetcode } from "react-icons/tb";

export interface IconItem {
  name: string;
  Icon: IconType;
  category?: string;
  aliases?: string[];
}

export const icons: IconItem[] = [
  {
    name: "TypeScript",
    Icon: BiLogoTypescript,
    category: "tech",
    aliases: ["typescript", "ts"],
  },
  {
    name: "React",
    Icon: FaReact,
    category: "tech",
    aliases: ["react", "reactjs"],
  },
  {
    name: "Next.js",
    Icon: RiNextjsFill,
    category: "tech",
    aliases: ["nextjs", "next.js"],
  },
  {
    name: "Node.js",
    Icon: FaNodeJs,
    category: "tech",
    aliases: ["nodejs", "node", "node js"],
  },
  {
    name: "MongoDB",
    Icon: DiMongodb,
    category: "tech",
    aliases: ["mongodb", "mongo"],
  },
  {
    name: "PostgreSQL",
    Icon: DiPostgresql,
    category: "tech",
    aliases: ["postgresql", "postgres", "psql"],
  },
  {
    name: "Tailwind CSS",
    Icon: RiTailwindCssFill,
    category: "tech",
    aliases: ["tailwind", "tailwind css", "tailwindcss"],
  },
  {
    name: "AWS",
    Icon: FaAws,
    category: "tech",
    aliases: ["aws", "amazon web services"],
  },
  { name: "Git", Icon: IoIosGitBranch, category: "tech", aliases: ["git"] },
  { name: "Angular", Icon: SiAngular, category: "tech", aliases: ["angular"] },
  {
    name: "Material-UI",
    Icon: SiMui,
    category: "tech",
    aliases: ["material-ui", "mui", "material ui", "materialui"],
  },
  { name: "Go", Icon: SiGo, category: "tech", aliases: ["go", "golang"] },
  {
    name: "Shadcn/UI",
    Icon: SiShadcnui,
    category: "tech",
    aliases: ["shadcn", "shadcn/ui", "shadcnui"],
  },
  {
    name: "Python",
    Icon: AiOutlinePython,
    category: "tech",
    aliases: ["python"],
  },

  // Utility icons
  {
    name: "WarningCircle",
    Icon: WarningCircleIcon,
    category: "utility",
    aliases: ["warning circle", "warning", "warning-circle"],
  },
  {
    name: "Resume",
    Icon: ReadCvLogoIcon,
    category: "social",
    aliases: ["resume", "cv"],
  },
  // Social Media Icons
  {
    name: "GitHub",
    Icon: GithubLogoIcon,
    category: "social",
    aliases: ["github", "git hub"],
  },
  {
    name: "LinkedIn",
    Icon: LinkedinLogoIcon,
    category: "social",
    aliases: ["linkedin", "linked in"],
  },
  {
    name: "X",
    Icon: XLogoIcon,
    category: "social",
    aliases: ["x", "twitter", "x twitter"],
  },
  {
    name: "leetcode",
    Icon: TbBrandLeetcode,
    category: "social",
    aliases: ["leetcode"],
  },
];

const iconLookupMap = new Map<string, IconType>();
const iconItemLookupMap = new Map<string, IconItem>();

icons.forEach((iconItem) => {
  const normalizedName = iconItem.name.toLowerCase().trim();
  iconLookupMap.set(normalizedName, iconItem.Icon);
  iconItemLookupMap.set(normalizedName, iconItem);

  iconItem.aliases?.forEach((alias) => {
    const normalizedAlias = alias.toLowerCase().trim();
    iconLookupMap.set(normalizedAlias, iconItem.Icon);
    iconItemLookupMap.set(normalizedAlias, iconItem);
  });
});

export const getIcon = (name: string): IconType | undefined => {
  return iconLookupMap.get(name.toLowerCase().trim());
};
export const hasIcon = (name: string): boolean => {
  return iconLookupMap.has(name.toLowerCase().trim());
};

export const getIconItem = (name: string): IconItem | undefined => {
  return iconItemLookupMap.get(name.toLowerCase().trim());
};

export const getIconsByCategory = (category: string): IconItem[] => {
  return icons.filter((icon) => icon.category === category);
};

export const getCategories = (): string[] => {
  const categories = icons
    .map((icon) => icon.category)
    .filter((category): category is string => Boolean(category));
  return [...new Set(categories)];
};
