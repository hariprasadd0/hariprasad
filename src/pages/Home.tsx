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
import { FiGithub, FiCalendar } from 'react-icons/fi';
import { X } from 'lucide-react';

import Timeline from '@/components/Timeline';
import socialLinks from '@/data/socialLinks';
import works from '@/data/works';
import { FreelanceLogo, userLogo } from '@/assets/workImg';
import { eduData } from '@/data/education';
import { techData, TechItem } from '@/data/techData';
import { experience, experienceStatus } from '@/data/experience';
import { Link } from 'react-router-dom';
import { fetchBlogs, Blog } from '@/data/blog';
import { useEffect, useState } from 'react';
const Home = () => {
  const [blog, setBlog] = useState<Blog[]>([]);
  useEffect(() => {
    const allBlogs = async () => {
      const response = await fetchBlogs();
      setBlog(response);
    };
    allBlogs();
  }, []);

  const defaultTab = experienceStatus ? 'Experience' : 'Education';

  return (
    <Card className=" h-full outline-none shadow-none overflow-hidden rounded-none flex flex-col  items-center  md:flex-row gap-2 md:gap-16">
      <section className=" md:px-10 px-6 md:pt-0 pt-10 flex  flex-col gap-1">
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
            <HoverCardTrigger asChild>
              <span className=" cursor-pointer pr-1.5 text-primary/80 underline underline-offset-2 font-medium ">
                Software Developer
              </span>
            </HoverCardTrigger>
            & Designer based in Kerala, India, focused on delivering digital
            solutions
          </p>

          <HoverCardContent className="w-80">
            <Link to={'https://github.com/Closure-Lab'}>
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
            </Link>
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
            {experienceStatus ? (
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
              <Timeline data={experience} />
            </TabsContent>
          ) : (
            <></>
          )}
          <TabsContent value="Tech-Stack">
            <Card className=" my-1 flex p-3 max-w-md py-5 gap-2 flex-wrap shadow-none">
              {techData.map(({ tech, Icon }: TechItem, index: number) => (
                <Tech
                  key={index}
                  tech={tech}
                  Icon={Icon}
                />
              ))}
            </Card>
          </TabsContent>
          <TabsContent value="Education">
            <Timeline data={eduData} />
          </TabsContent>
          <TabsContent value="Blog">
            <Card className=" flex flex-col p-4 py-3  flex-wrap shadow-none ">
              <BlogCard blog={blog} />
            </Card>
          </TabsContent>
        </Tabs>
      </section>
      {/* WORKS */}
      <div className=" flex md:h-screen md:mb-0 mb-8 justify-center items-center px-6">
        <div className="flex flex-col gap-5 items-center">
          {works.map((item) => {
            const slides = item.carouselImg;
            return (
              <div
                key={item.id}
                className={`${
                  item.disabled ? 'pointer-events-none opacity-50' : ''
                }`}
              >
                {item.disabled ? (
                  <Card className="disabled:bg-slate-700 card flex flex-col gap-4 p-4 rounded-sm shadow-none">
                    <div className="flex items-center space-x-3">
                      <Avatar className="rounded-lg w-12 h-12">
                        <AvatarImage
                          alt="project"
                          src={item.icon}
                        />
                        <AvatarFallback className="text-sm text-gray-500">
                          {item.avatarFallback}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex justify-between w-full items-center ">
                        <h2 className="text-lg font-medium">{item.title}</h2>
                        <Button
                          variant="secondary"
                          className="text-sm px-5 py-2 rounded-full"
                          disabled
                        >
                          In Progress
                        </Button>
                      </div>
                    </div>
                    <div className="px-2">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                ) : (
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Card className=" card flex flex-col gap-4 p-4 rounded-sm  shadow-none  hover:shadow-md transition-shadow cursor-pointer ">
                        <div className="flex items-center space-x-3">
                          <Avatar className="rounded-lg w-12 h-12">
                            <AvatarImage
                              alt="project"
                              src={item.icon}
                            />
                            <AvatarFallback className="text-sm text-gray-500">
                              {item.avatarFallback}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex justify-between w-full items-center ">
                            <h2 className="text-lg font-medium ">
                              {item.title}
                            </h2>
                            <Button
                              variant="secondary"
                              className="text-sm px-5 py-2 rounded-full  transition"
                            >
                              view
                            </Button>
                          </div>
                        </div>

                        <div className="px-2">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </Card>
                    </DrawerTrigger>

                    <DrawerContent>
                      <DrawerHeader className="flex md:justify-between px-6  w-full  items-center ">
                        <DrawerTitle className="flex gap-6  items-center">
                          <Avatar className="rounded-lg w-20 h-20">
                            <AvatarImage src={item.avatarSrc} />
                            <AvatarFallback>
                              {item.avatarFallback}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex flex-col gap-2 items-start">
                            <h2 className="text-2xl font-medium pt-3">
                              {item.title}
                            </h2>
                            <p className="font-normal text-sm text-start text-muted-foreground">
                              {item?.context}
                            </p>
                            <div className="flex  gap-3 p-1">
                              <Link to={item.githubLink}>
                                <Button
                                  size={'sm'}
                                  className="flex gap-2 "
                                >
                                  <FiGithub />
                                  View Project
                                </Button>
                              </Link>
                              <Link to={item.liveLink}>
                                <Button
                                  size={'sm'}
                                  variant={'outline'}
                                >
                                  Live Preview
                                </Button>
                              </Link>
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
                                {slides.map((img, index) => (
                                  <CarouselItem key={index}>
                                    <img
                                      src={img}
                                      alt="Image"
                                      className="rounded-xl border object-cover w-full aspect-auto md:aspect-video border-muted-foreground/20 data-[loading]:top-0"
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
                                <div className="space-y-2">
                                  <h3 className="font-medium ">Tech Stack</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {item?.tech.join('\t,')}
                                  </p>
                                </div>
                              </CardHeader>
                              <CardContent className="p-4 flex flex-col gap-4">
                                <h3 className="text-xm font-medium">
                                  Description
                                </h3>

                                <p className="text-sm text-muted-foreground md:w-3/4 leading-6">
                                  {item?.description}
                                </p>
                                <div className="space-y-2 ">
                                  <h3 className="font-medium">
                                    Problem & Solution
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {item?.problem_solution}
                                  </p>

                                  <h3 className="font-medium ">Features</h3>
                                  {item?.features?.map((item, index) => (
                                    <ul
                                      key={index}
                                      className="list-disc list-inside text-sm text-muted-foreground"
                                    >
                                      <li>{item}</li>
                                    </ul>
                                  ))}
                                </div>
                              </CardContent>

                              <CardFooter className="p-4 flex items-center justify-between border-t">
                                <Link to={item.liveLink}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                  >
                                    Live Demo
                                  </Button>
                                </Link>
                                <Link to={item.githubLink}>
                                  <Button
                                    variant="default"
                                    size="sm"
                                  >
                                    View Code
                                  </Button>
                                </Link>
                              </CardFooter>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      </ScrollArea>
                    </DrawerContent>
                  </Drawer>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default Home;
