import { DiMongodb, DiPostgresql } from 'react-icons/di';
import { BiLogoTypescript } from 'react-icons/bi';
import { FaReact, FaNodeJs, FaAws } from 'react-icons/fa';
import { IoIosGitBranch } from 'react-icons/io';
import { RiTailwindCssFill, RiNextjsFill } from 'react-icons/ri';
import { SiAngular, SiMui, SiGo, SiShadcnui } from 'react-icons/si';
import { IconType } from 'react-icons';
import { AiOutlinePython } from "react-icons/ai";

export interface IconItem {
  name: string;
  Icon: IconType;
  category?: string;
  aliases?: string[];
}

export const icons: IconItem[] = [
  { name: 'TypeScript', Icon: BiLogoTypescript, category: 'tech', aliases: ['typescript', 'ts'] },
  { name: 'React', Icon: FaReact, category: 'tech', aliases: ['react', 'reactjs'] },
  { name: 'Next.js', Icon: RiNextjsFill, category: 'tech', aliases: ['nextjs', 'next.js'] },
  { name: 'Node.js', Icon: FaNodeJs, category: 'tech', aliases: ['nodejs', 'node', 'node js'] },
  { name: 'MongoDB', Icon: DiMongodb, category: 'tech', aliases: ['mongodb', 'mongo'] },
  { name: 'PostgreSQL', Icon: DiPostgresql, category: 'tech', aliases: ['postgresql', 'postgres', 'psql'] },
  { name: 'Tailwind CSS', Icon: RiTailwindCssFill, category: 'tech', aliases: ['tailwind', 'tailwind css', 'tailwindcss'] },
  { name: 'AWS', Icon: FaAws, category: 'tech', aliases: ['aws', 'amazon web services'] },
  { name: 'Git', Icon: IoIosGitBranch, category: 'tech', aliases: ['git'] },
  { name: 'Angular', Icon: SiAngular, category: 'tech', aliases: ['angular'] },
  { name: 'Material-UI', Icon: SiMui, category: 'tech', aliases: ['material-ui', 'mui', 'material ui', 'materialui'] },
  { name: 'Go', Icon: SiGo, category: 'tech', aliases: ['go', 'golang'] },
  { name: 'Shadcn/UI', Icon: SiShadcnui, category: 'tech', aliases: ['shadcn', 'shadcn/ui', 'shadcnui'] },
  { name: 'Python', Icon: AiOutlinePython, category: 'tech', aliases: ['python'] },
];

// Helper function to get icon by name (case insensitive and checks aliases)
export const getIcon = (name: string): IconType | undefined => {
  const normalizedName = name.toLowerCase().trim();
  const iconItem = icons.find(icon => 
    icon.name.toLowerCase() === normalizedName || 
    (icon.aliases && icon.aliases.some(alias => alias.toLowerCase() === normalizedName))
  );
  return iconItem?.Icon;
};

// Helper function to check if an icon exists
export const hasIcon = (name: string): boolean => {
  return getIcon(name) !== undefined;
};

// Helper function to get icons by category
export const getIconsByCategory = (category: string): IconItem[] => {
  return icons.filter(icon => icon.category === category);
};

// Helper function to get all categories
export const getCategories = (): string[] => {
  const categories = icons.map(icon => icon.category).filter((category): category is string => Boolean(category));
  return [...new Set(categories)];
};

// Helper function to get icon item (with name and category info)
export const getIconItem = (name: string): IconItem | undefined => {
  const normalizedName = name.toLowerCase().trim();
  return icons.find(icon => 
    icon.name.toLowerCase() === normalizedName || 
    (icon.aliases && icon.aliases.some(alias => alias.toLowerCase() === normalizedName))
  );
};
