//Components
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
  ModeToggle,
  Tech,
  Badge,
} from '@/components/components';
// Icons
import { FiCalendar, FiGithub } from 'react-icons/fi';
import { Flag, X } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/components/animate/tabs';
import Timeline from '@/components/Timeline';
import socialLinks from '@/data/socialLinks';
import works from '@/data/works';
import { eduData } from '@/data/education';
import { experience, experienceStatus } from '@/data/experience';
import { getIcon } from '@/lib/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BlogPost, loadMarkdownFiles } from '@/utils/loadMarkdown';
import Footer from './Footer';
import { GithubChart } from '@/components/GithubChart';
import { FlaskIcon, GraduationCapIcon } from '@phosphor-icons/react';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Check theme on mount and listen for changes
  useEffect(() => {
    // Initial check
    const checkTheme = () => {
      const theme = localStorage.getItem('vite-ui-theme');
      setIsDarkMode(theme === 'dark');
    };

    // Set up observer for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    // Initial check
    checkTheme();

    // Start observing the documentElement for class changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await loadMarkdownFiles();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };

    loadPosts();
  }, []);

  const defaultTab = experienceStatus ? 'Experience' : 'Education';

const categories = useMemo(() => 
  [...new Set(blogPosts.map(post => post.category))], 
  [blogPosts]
);

const categoryCount = useMemo(() => 
  blogPosts.reduce<Record<string, number>>((countObj, post) => {
    countObj[post.category] = (countObj[post.category] || 0) + 1;
    return countObj;
  }, {}),
  [blogPosts]
);

const filteredPosts = useMemo(() => {
  if (activeCategory === 'all') return blogPosts;
  return blogPosts.filter(post => post.category === activeCategory);
}, [blogPosts, activeCategory]);

  // Helper function to safely get category count
  const getCategoryCount = (category: string) => categoryCount[category] || 0;

  const handleLiveClick = useCallback((link: string) => (ev: React.MouseEvent) => {
  ev.stopPropagation();
  window.open(link, '_blank');
}, []);

  return (
    <Card className="h-full outline-none shadow-none overflow-hidden rounded-none flex flex-col  items-center  p-6 pb-8 md:p-16 md:pb-8 gap-4 md:gap-10">
      <section className="max-w-xl flex  flex-col gap-1">
        <div className="flex gap-2 items-center mb-3 ">
          <h1 className="text-xl md:text-2xl font-medium ">Hey, I'm Hariprasad</h1>
        </div>

        <HoverCard>
          <p className="text-sm sm:text-base md:text-md leading-6 md:leading-7 text-muted-foreground mb-6">
            A generalist{''}
            <HoverCardTrigger asChild>
              <span className=" cursor-pointer px-1.5 text-primary/80 underline underline-offset-4 font-medium decoration-wavy decoration-gray-400/70">
              Engineer
              </span>
            </HoverCardTrigger>
            passionate about backend systems & security. I enjoy diving into technical papers and building projects that bring concepts to life.
          </p>
          <HoverCardContent className="w-80">
            <Link to={experience[0]?.link || "/"} target="_blank">
              <div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@{experience[0]?.company}</h4>
                  <p className="text-sm">
                    {experience[0]?.title}
                  </p>
                  <div className="flex items-center pt-2">
                    <FiCalendar className="mr-2 h-4 w-4 opacity-70" />{' '}
                    <span className="text-xs text-muted-foreground">
                      {experience[0]?.duration}
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
                  <TooltipContent className="text-xs rounded-sm">
                    <p >{link.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
          <ModeToggle />
        </div>
        <Tabs
          defaultValue={defaultTab}
          className="mt-6 w-full"
        >
          <TabsList tabIndex={-1}>
            <TabsTrigger
              className="text-xs"
              value="Experience"
            >
              <FlaskIcon/>Background
            </TabsTrigger>
            {eduData.length > 0 &&
              <TabsTrigger
                className="text-xs"
                value="Education"
              >
                <GraduationCapIcon/>Education
              </TabsTrigger>
            }
          </TabsList>

        <TabsContents>
          {experience ? (
            <TabsContent value="Experience">
              <Timeline data={experience} />
            </TabsContent>
          ) : (
            <></>
          )}
          {eduData.length > 0 ? (
            <TabsContent value="Education">
              <Timeline data={eduData} />
            </TabsContent>
          ) : (
            <></>
          )}
          </TabsContents>
        </Tabs>
      </section>
      <GithubChart isDarkMode={isDarkMode}/>
      {/* WORKS */}
      <section className="max-w-xl flex flex-col gap-7">
        <div className='font-medium'>Projects</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          {works.map((item) => {
            const slides = item.carouselImg;
            return (
              <div
                key={item.id}
                className={`${item.disabled ? 'pointer-events-none opacity-50' : ''
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
                          className=" hidden md:block text-xs px-3 py-1 rounded-full"
                          disabled
                        >
                          In Progress
                        </Button>
                      </div>
                    </div>
                    <div className="px-2 truncate">
                      <p className="text-sm text-muted-foreground leading-relaxed ">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                ) : (
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Card className="  flex flex-col gap-4 p-4 rounded-sm  shadow-none  hover:shadow-md transition-shadow cursor-pointer w-full h-full">
                        <img src={slides[0]} alt="" className='rounded-[4px]' />
                        <div className="flex items-center space-x-2 justify-between w-full">
                          <Avatar className="rounded-sm w-8 h-8 border">
                            <AvatarImage
                              alt="project"
                              src={item.icon}
                            />
                            <AvatarFallback className="text-sm text-gray-500">
                              {item.avatarFallback}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex justify-between w-full items-center ">
                            <h2 className="text-md font-medium flex items-center gap-2">
                              {item.title} {item.liveLink ? "" : (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button>
                                        {(() => {
                                          const Icon = getIcon('warning');
                                          return Icon ? <Icon size={20} className="text-yellow-500 animate-pulse" /> : null;
                                        })()}
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Live link is not available </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </h2>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={handleLiveClick(item.liveLink)}
                              className="text-xs p-1 dark:bg-muted rounded-[4px] cursor-pointer"
                            >
                              Live
                            </button>
                            <span className="text-xs text-gray-500 ">|</span>
                            <span
                              onClick={handleLiveClick(item.githubLink)}
                              className="text-xs p-1 dark:bg-muted rounded-[4px] cursor-pointer"
                            >
                              GitHub
                            </span>
                          </div>
                        </div>

                        <div className="max-w-prose mx-auto flex-1">
                          <p className="text-xs text-muted-foreground text-left leading-relaxed line-clamp-3">
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
                                  disabled={!item.liveLink}
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
                              Details
                            </TabsTrigger>
                            <button className='absolute right-14 '>
                              <Flag size={18} />
                            </button>
                          </TabsList>
                          <TabsContents>
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
                                  <div className="flex flex-wrap gap-2">
                                    {item?.tech?.map((techName, index) => {
                                      const IconComponent = getIcon(techName);
                                      return IconComponent ? (
                                        <Tech
                                          key={index}
                                          tech={techName}
                                          Icon={IconComponent}
                                        />
                                      ) : (
                                        <span key={index} className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                                          {techName}
                                        </span>
                                      );
                                    })}
                                  </div>
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
                          </TabsContents>
                        </Tabs>
                      </ScrollArea>
                    </DrawerContent>
                  </Drawer>
                )}
              </div>
            );
          })}
        </div>
      </section>
     <section className='max-w-xl flex flex-col gap-7'>
  <div className='font-medium'>Writings</div>

  <Tabs value={activeCategory} onValueChange={setActiveCategory}>
    <TabsList className='mb-4'>
      <TabsTrigger value="all">All</TabsTrigger>
      {categories.map((category) => (
        <TabsTrigger
          key={category}
          value={category}
          disabled={getCategoryCount(category) === 0}
        >
          {category} ({getCategoryCount(category)})
        </TabsTrigger>
      ))}
    </TabsList>

    <TabsContents>
      {/* ALL */}
      <TabsContent value="all" className='w-full'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {blogPosts.map((item) => (
            <Card
              key={item.id}
              onClick={() => navigate(`/${item.slug}`)}
              className="flex flex-col gap-4 p-3 rounded-sm shadow-none hover:shadow-md transition-shadow cursor-pointer w-full h-full"
            >
              <div className="flex flex-col h-full gap-2">
                <Badge className={`flex justify-between bg-transparent hover:bg-transparent shadow-none text-muted-foreground p-0 font-medium ${item.readTime ? 'w-full' : 'w-fit'}`}>
                  <p>{item.date}</p>
                  <p>{item.readTime}</p>
                </Badge>
                <h6 className="text-md font-medium mt-2">{item.title}</h6>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-3 flex-grow">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* CATEGORIES */}
      {categories.map((category) => (
        <TabsContent key={category} value={category} className='w-full'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredPosts.map((item) => (
                <Card
                  key={item.id}
                  onClick={() => navigate(`/${item.slug}`)}
                  className="flex flex-col gap-4 p-3 rounded-sm shadow-none hover:shadow-md transition-shadow cursor-pointer w-full h-full"
                >
                  <div className="flex flex-col h-full gap-2">
                    <Badge className={`flex justify-between bg-transparent shadow-none hover:bg-transparent text-muted-foreground p-0 font-medium ${item.readTime ? 'w-full' : 'w-fit'}`}>
                      <p>{item.date}</p>
                      <p>{item.readTime}</p>
                    </Badge>
                    <h6 className="text-md font-medium mt-2">{item.title}</h6>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-3 flex-grow">
                      {item.description}
                    </p>
                  </div>
                </Card>
              ))}
          </div>
        </TabsContent>
      ))}
    </TabsContents>
  </Tabs>
</section>

      <Footer />
    </Card>
  );
};

export default Home;
