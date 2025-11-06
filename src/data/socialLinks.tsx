import { getIconsByCategory } from '../lib/icons';
import { createElement } from 'react';

// Get social icons from the centralized icon system
const socialIcons = getIconsByCategory('social');

// Helper function to create icon component with props
const createIconComponent = (iconName: string) => {
  const Icon = socialIcons.find(icon => icon.name === iconName)?.Icon;
  return Icon ? createElement(Icon, { size: 20 }) : null;
};

const socialLinks = [
  {
    id: 1,
    name: "Hari's LinkedIn",
    link: 'https://www.linkedin.com/in/hariprasad0/',
    icon: createIconComponent('LinkedIn'),
    ariaLabel: 'linkedin',
  },
  {
    id: 2,
    name: "Hari's X",
    link: 'https://twitter.com/hariiprasad0',
    icon: createIconComponent('X'),
    ariaLabel: 'X',
  },
  {
    id: 3,
    name: "Hari's GitHub",
    link: 'https://github.com/hariprasadd0',
    icon: createIconComponent('GitHub'),
    ariaLabel: 'github',
  },
  // {
  //   id: 5,
  //   name: 'Email',
  //   link: 'mailto:hariprasadkv02@gmail.com',
  //   icon: <IoMailOutline size={18} />,
  // },
];

export default socialLinks;
