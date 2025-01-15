import {
  img2,
  img3,
  EcoMingleLogo,
  Ecomingle01,
  Ecomingle02,
  Ecomingle03,
} from '@/assets/workImg';

const items = [
  {
    id: 1,
    avatarSrc: EcoMingleLogo,
    carouselImg: [Ecomingle01, Ecomingle02, Ecomingle03],
    avatarFallback: 'EM',
    title: 'Ecomingle',
    context: 'Eco-conscious e-commerce platform',
    tech: ['React', 'Tailwind CSS'],
    icon: EcoMingleLogo,
    description:
      'A sustainable e-commerce platform empowering eco-conscious shopping by offering verified eco-friendly products and fostering greener choices for a better planet',
    liveLink: 'https://eco-mingle.vercel.app/dashboard',
    githubLink: 'https://github.com/hariprasadd0/EcoMingle',
  },

  {
    id: 2,
    avatarSrc: 'https://github.com/shadcn.png',
    carouselImg: [img2],
    avatarFallback: 'CN',
    title: 'Bintray',
    context: 'Eco-conscious e-commerce platform',
    tech: ['Next.js', 'Tailwind CSS'],
    icon: EcoMingleLogo,
    description:
      'Helped found the initial Booking.com Design System and its related services used on all Booking.com products. Currently, leading various efforts to further scale the system.',
    liveLink: '',
    githubLink: '',
  },

  {
    id: 3,
    avatarSrc: 'https://github.com/shadcn.png',
    carouselImg: [img3],
    avatarFallback: 'CN',
    title: 'G-Cloud',
    context: 'Eco-conscious e-commerce platform',
    tech: ['Angular', 'Tailwind CSS', 'GO'],
    icon: EcoMingleLogo,
    description:
      'Helped found the initial Booking.com Design System and its related services used on all Booking.com products. Currently, leading various efforts to further scale the system.',
    liveLink: '',
    githubLink: '',
  },
];

export default items;
