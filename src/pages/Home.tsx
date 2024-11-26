//Components
import BlogCard from '@/components/BlogCard';
import { CardHeader, CardFooter } from '@/components/ui/card';
import {
  Card,
  CardContent,
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Separator,
  ScrollArea,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ModeToggle,
  Tech,
} from '@/components/components';
// Icons
import {
  FiGithub,
  FiCalendar,
  DiMongodb,
  X,
  BiLogoTypescript,
  FaReact,
  FaNodeJs,
  FaAws,
  IoIosGitBranch,
  RiTailwindCssFill,
  RiNextjsFill,
} from '@/components/icons/icon';

import Timeline from '@/components/Timeline';
import socialLinks from '@/data/socialLinks';
import works from '@/data/works';
import { DiPostgresql } from 'react-icons/di';
import { FreelanceLogo, userLogo } from '@/assets/workImg';
const Home = () => {
  const blog = false;
  const experience = false;
  const defaultTab = experience ? 'Experience' : 'Education';
  const eduData = [
    {
      title: 'Bachelor of Computer Applications',
      company: 'ITM College of Arts & Science',
      role: '2021 - 2024',
      skills: [
        'Python',
        'PSQL',
        'Data Structures',
        'Java',
        'C#',
        'Web',
        'Networking',
      ],
      current: true,
    },
    {
      title: 'XII-Computer Science',
      company: 'G.H.S.S Malur',
      role: '2019-2020',
      period: '2023 - Present',
      current: false,
      skills: ['html', 'cpp', 'Basic CS'],
    },
  ];

  return (
    <Card className=" h-full outline-none shadow-none overflow-hidden rounded-none flex flex-col  items-center  md:flex-row gap-2 md:gap-16">
      <div className=" md:px-10 px-6 md:pt-0 pt-10 flex  flex-col gap-1">
        <div className="flex gap-2 items-center mb-3 ">
          <Avatar className="w-12 h-12">
            <AvatarImage
              alt="avatar"
              className="object-cover align-bottom "
              src={userLogo}
            />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>{' '}
          <h1 className="text-3xl md:text-3xl font-medium ">Hariprasad</h1>
        </div>

        <HoverCard>
          <p className="text-base md:text-lg leading-6  md:!leading-8 text-muted-foreground mb-6">
            I am a
            <HoverCardTrigger asChild>
              <span className=" cursor-pointer px-1.5 text-primary/80 underline underline-offset-2 font-medium ">
                Software Developer
              </span>
            </HoverCardTrigger>
            & Designer based in Kerala, India, focused on delivering digital
            solutions
          </p>

          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage
                  alt="avatar"
                  src={FreelanceLogo}
                />
                <AvatarFallback>F</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@closureLabs</h4>
                <p className="text-sm">
                  An open-source organization focused on building solutions
                </p>
                <div className="flex items-center pt-2">
                  <FiCalendar className="mr-2 h-4 w-4 opacity-70" />{' '}
                  <span className="text-xs text-muted-foreground">
                    Joined December 2021
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <div className="flex items-center gap-2">
          {socialLinks.map((link) => {
            return (
              <TooltipProvider key={link.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      aria-label={link.ariaLabel}
                      variant={'outline'}
                      className=" shadow-none py-3 px-3"
                    >
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-2 text-secondary-foreground"
                      >
                        {link.icon}
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{link.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
          <ModeToggle />
        </div>
        <Tabs
          defaultValue={defaultTab}
          className="mt-6   w-full md:h-48 transition-transform"
        >
          <TabsList tabIndex={-1}>
            <TabsTrigger
              className="text-xs"
              value="Education"
            >
              Education
            </TabsTrigger>
            {experience ? (
              <TabsTrigger
                className="text-xs"
                value="Experience"
              >
                Experience
              </TabsTrigger>
            ) : (
              <></>
            )}
            <TabsTrigger
              className="text-xs"
              value="Tech-Stack"
            >
              Tech Stack
            </TabsTrigger>

            {blog ? (
              <TabsTrigger
                className="text-xs"
                value="Blog"
              >
                Blog
              </TabsTrigger>
            ) : (
              <></>
            )}
          </TabsList>

          {experience ? (
            <TabsContent value="Experience">
              <Timeline data={eduData} />
            </TabsContent>
          ) : (
            <></>
          )}
          <TabsContent value="Tech-Stack">
            <Card className=" my-1 flex p-3 max-w-md py-5 gap-2 flex-wrap shadow-none">
              <Tech
                tech="Typescript"
                Icon={BiLogoTypescript}
              />
              <Tech
                tech="React"
                Icon={FaReact}
              />
              <Tech
                tech="MonogDB"
                Icon={DiMongodb}
              />
              <Tech
                tech="Git"
                Icon={IoIosGitBranch}
              />
              <Tech
                tech="Aws"
                Icon={FaAws}
              />
              <Tech
                tech="Tailwind CSS"
                Icon={RiTailwindCssFill}
              />
              <Tech
                tech="Node Js"
                Icon={FaNodeJs}
              />
              <Tech
                tech="Next Js"
                Icon={RiNextjsFill}
              />
              <Tech
                tech="postgresql"
                Icon={DiPostgresql}
              />
            </Card>
          </TabsContent>
          <TabsContent value="Education">
            <Timeline data={eduData} />
          </TabsContent>
          <TabsContent value="Blog">
            <Card className=" flex flex-col p-4 py-3  flex-wrap shadow-none ">
              <BlogCard />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {/* WORKS */}
      <div className=" flex md:h-screen md:mb-0 mb-8 justify-center items-center px-6">
        <div className="flex flex-col gap-5 items-center">
          {works.map((item) => (
            <Drawer key={item.id}>
              {/* Make the Card trigger the drawer */}
              <DrawerTrigger asChild>
                <Card className="card flex flex-col gap-4 p-4 rounded-sm  shadow-none  hover:shadow-md transition-shadow cursor-pointer ">
                  {/* Top Section with Avatar and Title */}
                  <div className="flex items-center space-x-3">
                    <Avatar className="rounded-md w-12 h-12">
                      <AvatarImage
                        alt="project"
                        src={item.icon}
                      />
                      <AvatarFallback className="text-sm text-gray-500">
                        {item.avatarFallback}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex justify-between w-full items-center">
                      <h2 className="text-lg font-medium ">{item.title}</h2>
                      <Button
                        variant="secondary"
                        className="text-sm px-5 py-2 rounded-full  transition"
                      >
                        view
                      </Button>
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="px-2">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </DrawerTrigger>

              {/* Drawer content remains the same */}
              <DrawerContent>
                <DrawerHeader className="flex md:justify-between px-6  w-full  items-center ">
                  <DrawerTitle className="flex gap-6  items-center">
                    <Avatar className="rounded-md w-20 h-20">
                      <AvatarImage src={item.avatarSrc} />
                      <AvatarFallback>{item.avatarFallback}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col gap-2 items-start">
                      <h2 className="text-2xl font-medium ">{item.title}</h2>
                      <p className="font-normal text-sm text-start text-muted-foreground">
                        {item?.context}
                      </p>
                      <div className="flex  gap-3 p-1">
                        <Button
                          size={'sm'}
                          className="flex gap-2 "
                        >
                          <FiGithub />
                          View Project
                        </Button>
                        <Button
                          size={'sm'}
                          variant={'outline'}
                        >
                          Live Preview
                        </Button>
                      </div>
                    </div>
                  </DrawerTitle>

                  <DrawerClose className="hidden md:block">
                    <Button
                      variant="outline"
                      className="shadow-none outline-none border-none px-2"
                    >
                      <X />
                    </Button>
                  </DrawerClose>
                </DrawerHeader>
                <Separator />
                <ScrollArea className="h-[90vh]">
                  <Tabs
                    className="px-3 py-3"
                    defaultValue="overview"
                  >
                    <TabsList>
                      <TabsTrigger
                        className="text-xs"
                        value="overview"
                      >
                        Overview
                      </TabsTrigger>
                      <TabsTrigger
                        className="text-xs "
                        value="caseStudy"
                      >
                        case study
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                      <div className=" p-4 mb-3 md:hidden flex flex-col gap-1 ">
                        <h3 className="text-xm font-medium">Overview</h3>

                        <p className="text-sm text-muted-foreground md:w-3/4 leading-6">
                          {item?.description}
                        </p>
                      </div>
                      <Carousel>
                        <CarouselContent className="px-3">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index}>
                              <img
                                src={item.carouselImg}
                                alt="Image"
                                className="rounded-xl border object-cover w-full aspect-auto md:aspect-video border-muted-foreground/20 data-[loading]:top-0 "
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </TabsContent>
                    <TabsContent value="caseStudy">
                      <Card className="w-full  shadow-none border-none">
                        <CardHeader className="border-b p-4">
                          <h3 className="text-xm font-medium">Description</h3>

                          <p className="text-sm text-muted-foreground md:w-3/4 leading-6">
                            {item?.description}
                          </p>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <h3 className="font-medium">Problem & Solution</h3>
                            <p className="text-sm text-muted-foreground">
                              Shoppers lacked tools to make environmentally
                              informed choices. EcoMingle bridges this gap by
                              displaying the carbon footprint of products.
                            </p>

                            <h3 className="font-medium ">Features</h3>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              <li>Carbon footprint calculator</li>
                              <li>Vendor eco-certification</li>
                              <li>User feedback on sustainability</li>
                            </ul>

                            <h3 className="font-medium ">Tech Stack</h3>
                            <p className="text-sm text-muted-foreground">
                              React, Tailwind CSS, Node.js, MongoDB, Figma.
                            </p>
                          </div>
                        </CardContent>

                        <CardFooter className="p-4 flex items-center justify-between border-t">
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            Live Demo
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                          >
                            View Code
                          </Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </ScrollArea>
              </DrawerContent>
            </Drawer>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Home;