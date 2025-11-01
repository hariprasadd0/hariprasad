import { FiLinkedin, FiGithub } from 'react-icons/fi';
import { BsTwitterX } from 'react-icons/bs';


const socialLinks = [
  {
    id: 1,
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/hariprasad0/',
    icon: <FiLinkedin size={16} />,
    ariaLabel: 'linkedin',
  },
  {
    id: 2,
    name: 'Twitter',
    link: 'https://twitter.com/hariiprasad0',
    icon: <BsTwitterX size={16} />,
    ariaLabel: 'X',
  },
  {
    id: 3,
    name: 'GitHub',
    link: 'https://github.com/hariprasadd0',
    icon: <FiGithub size={16} />,
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
