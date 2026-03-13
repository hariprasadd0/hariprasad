export type ExperienceItem = {
  title: string;
  company: string;
  companyLogo?: string;
  duration: string;
  link?: string;
  description?:string|string[];
  current: boolean;
};

export const experience: ExperienceItem[] = [
  {
    title: 'Software Engineer Intern',
    company: 'xmigrate',
    companyLogo: 'https://xmigrate.cloud/icons/logo.svg',
    duration: 'June 2025 - Present',
    link: 'https://xmigrate.cloud',
    description: [],
    current: true,
  },
  {
    title: 'Freelancer',
    company: 'Self Employed',
    duration: 'March 2024 - Present',
    description: ['Designed and built client websites', 'Crafted UI/UX flows', 'Delivered end-to-end web projects'],
    current: false,
  },
];

export const experienceStatus = true;