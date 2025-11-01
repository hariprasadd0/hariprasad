export type ExperienceItem = {
  title: string;
  company: string;
  duration: string;
  link?: string;
  skills: string[];
  current: boolean;
};

export const experience: ExperienceItem[] = [
  {
    title: 'Software Engineer Intern',
    company: 'xmigrate',
    duration: 'June 2025 - Present',
    link: 'https://xmigrate.cloud',
    skills: [
      'python',
      'postgresql',
      'golang',
      'nextjs',
    ],
    current: true,
  },
  {
    title: 'Freelancer',
    company: 'Self',
    duration: 'March 2024 - Present',
    link: '',
    current: false,
    skills: ['Web Development', 'UI/UX',],
  },
];

export const experienceStatus = true;
