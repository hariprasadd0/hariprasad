import { DiMongodb } from 'react-icons/di';
import { BiLogoTypescript } from 'react-icons/bi';
import { FaReact, FaNodeJs, FaAws } from 'react-icons/fa';
import { IoIosGitBranch } from 'react-icons/io';
import { RiTailwindCssFill, RiNextjsFill } from 'react-icons/ri';
import { DiPostgresql } from 'react-icons/di';
import { IconType } from 'react-icons';

export interface TechItem {
  tech: string;
  Icon: IconType;
}

export const techData: TechItem[] = [
  { tech: 'Typescript', Icon: BiLogoTypescript },
  { tech: 'React', Icon: FaReact },
  { tech: 'MongoDB', Icon: DiMongodb },
  { tech: 'Git', Icon: IoIosGitBranch },
  { tech: 'AWS', Icon: FaAws },
  { tech: 'Tailwind CSS', Icon: RiTailwindCssFill },
  { tech: 'Node.js', Icon: FaNodeJs },
  { tech: 'Next.js', Icon: RiNextjsFill },
  { tech: 'PostgreSQL', Icon: DiPostgresql },
];
