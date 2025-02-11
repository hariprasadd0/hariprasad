import {
  img2,
  img3,
  EcoMingleLogo,
  Ecomingle01,
  Ecomingle02,
  Ecomingle03,
  codora,
} from '@/assets/workImg';

const items = [
  {
    id: 1,
    avatarSrc: EcoMingleLogo,
    carouselImg: [Ecomingle01, Ecomingle02, Ecomingle03],
    avatarFallback: 'EM',
    title: 'Ecomingle',
    context: 'Eco-conscious e-commerce platform',
    tech: ['React', 'Tailwind', 'Material-UI', 'Node Js', 'MongoDB'],
    icon: EcoMingleLogo,
    description:
      'A sustainable e-commerce platform empowering eco-conscious shopping by offering verified eco-friendly products and fostering greener choices for a better planet',
    problem_solution:
      'Shoppers lacked tools to make environmentally informed choices. EcoMingle bridges this gap by displaying the carbon footprint of products.',
    features: ['Carbon footprint calculator', 'Vendor eco-certification'],
    liveLink: 'https://eco-mingle.vercel.app/dashboard',
    githubLink: 'https://github.com/hariprasadd0/EcoMingle',
    disabled: false,
  },

  {
    id: 2,
    avatarSrc: codora,
    carouselImg: [img2],
    avatarFallback: 'C',
    title: 'Codora',
    context: 'Project Manager for indies and small teams',
    tech: ['Node js '],
    icon: codora,
    description:
      ' A project management tool designed for indie developers and small teams, offering streamlined task tracking and efficient project organization. ',
    liveLink: '',
    githubLink: 'https://github.com/hariprasadd0/codora',
    disabled: false,
  },

  {
    id: 3,
    avatarSrc: '',
    carouselImg: [img3],
    avatarFallback: 'T T',
    title: 'TinyTailor',
    context: 'Eco-conscious e-commerce platform',
    tech: ['Angular', 'Tailwind CSS', 'GO'],
    icon: '',
    description:
      'A lightweight and easy-to-use tailoring management system designed for small tailoring businesses. It simplifies order tracking, measurement handling, and customer management',
    liveLink: '',
    githubLink: '',
    disabled: true,
  },
];

export default items;
