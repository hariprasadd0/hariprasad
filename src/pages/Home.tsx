//Components
import { CardHeader, CardFooter } from "@/components/ui/card";
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
} from "@/components/components";
// Icons
import {  FiGithub } from "react-icons/fi";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/animate/tabs";
import Timeline from "@/components/Timeline";
import socialLinks from "@/data/socialLinks";
import works from "@/data/works";
import { eduData } from "@/data/education";
import { experience, experienceStatus } from "@/data/experience";
import { getIcon } from "@/lib/icons";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BlogPost, loadMarkdownFiles } from "@/utils/loadMarkdown";
import Footer from "./Footer";
import { GithubChart } from "@/components/GithubChart";
import {
  FlagIcon,
  FlaskIcon,
  GraduationCapIcon,
  ToolboxIcon,
  XIcon,
} from "@phosphor-icons/react";
import { techCategories } from "@/data/techData";
import { TechStack } from "@/components/tech-stack";
import { DemoFrame } from "@/components/demoFrame";
import { Helmet } from "react-helmet-async";
import { DribbbleLogoIcon } from "@phosphor-icons/react";
import { SiTryhackme } from "react-icons/si";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [iframeErrors, setIframeErrors] = useState<Record<string, boolean>>({});

  // Check theme on mount and listen for changes
  useEffect(() => {
    // Initial check
    const checkTheme = () => {
      const theme = localStorage.getItem("vite-ui-theme");
      setIsDarkMode(theme === "dark");
    };

    // Set up observer for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkTheme();
        }
      });
    });

    // Initial check
    checkTheme();

    // Start observing the documentElement for class changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
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
        console.error("Error loading posts:", error);
      }
    };

    loadPosts();
  }, []);

  const defaultTab = experienceStatus ? "Experience" : "Education";

  const categories = useMemo(
    () => [...new Set(blogPosts.map((post) => post.category))],
    [blogPosts],
  );

  const categoryCount = useMemo(
    () =>
      blogPosts.reduce<Record<string, number>>((countObj, post) => {
        countObj[post.category] = (countObj[post.category] || 0) + 1;
        return countObj;
      }, {}),
    [blogPosts],
  );

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return blogPosts;
    return blogPosts.filter((post) => post.category === activeCategory);
  }, [blogPosts, activeCategory]);

  // Helper function to safely get category count
  const getCategoryCount = (category: string) => categoryCount[category] || 0;

  const handleLiveClick = useCallback(
    (link: string) => (ev: React.MouseEvent) => {
      ev.stopPropagation();
      window.open(link, "_blank");
    },
    [],
  );

  return (
    <>
      <Helmet>
        <title>Hariprasad | Full Stack Developer</title>
      </Helmet>
       
      <Card className="dark:bg-[#101010] relative h-full outline-none border-none shadow-none overflow-hidden rounded-none flex flex-col  items-center px-6 md:p-0">
<div
  className="pointer-events-none fixed bottom-0 left-1/2 -translate-x-1/2 
             w-full max-w-4xl h-14 z-50
             backdrop-blur-[8px] 
             bg-gradient-to-t from-background/50 via-background/20 to-transparent"
  style={{
    maskImage: "linear-gradient(to top, black 35%, transparent 100%)",
    WebkitMaskImage: "linear-gradient(to top, black 35%, transparent 100%)"
  }}
/>

       <div className=" relative  pt-16 pb-8 mx-16 md:max-w-none max-w-lg flex flex-col gap-4 md:gap-10">
           <div
      className="absolute inset-0 z-0 -left-10 pointer-events-none dark:opacity-[0.06] opacity-[0.06] w-10
                 border dark:border-[#eee] border-[#000]/70"
      style={{
        backgroundImage:
          "repeating-linear-gradient(-45deg, transparent, transparent 2px, currentColor 2px, currentColor 3px, transparent 3px, transparent 6px)",
      }}
    />
        <section className="max-w-xl flex  flex-col gap-1 overflow-x-hidden mx-16">
          <img
            src={"https://i.pinimg.com/1200x/1e/3c/de/1e3cdedb3e4e38b3ab900b5b10d1d26f.jpg"}
            alt="banner"
            className="w-full h-36 md:h-32 object-cover absolute -top-12 md:-top-3 left-0 translate-y-[10px] select-none"
            style={{
  maskImage: `
    linear-gradient(to right, transparent, black 10%, black 90%, transparent),
    linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)
  `,
  WebkitMaskImage: `
    linear-gradient(to right, transparent, black 10%, black 90%, transparent),
    linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)
  `,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
}}
          />
          
          <div className="flex gap-2  mb-3 flex-col w-full">
            <Avatar className="rounded-full h-20 w-20 md:w-24 md:h-24">
              <AvatarImage alt="Hariprasad" src="https://i.pinimg.com/1200x/28/e7/84/28e784c256f8193db4b20fc59ef23a35.jpg" />
              <AvatarFallback className="text-sm text-gray-500">
                HP
              </AvatarFallback>
            </Avatar>
          <div className="flex justify-between items-center w-full">
         <h1 className="text-2xl md:text-3xl font-medium tracking-wide">Hariprasad</h1>
         <Link className="text-muted-foreground text-sm" to={"https://x.com/hariiprasad0"}>/ @hariiprasad0</Link>
            </div>
          </div>

          <HoverCard>
          <div className="text-sm leading-6 text-muted-foreground mb-6 space-y-3">
  <p>
    <HoverCardTrigger asChild>
      <span className="pr-1 text-primary text-md font-semibold">
        Backend Engineer
      </span>
    </HoverCardTrigger>
    interested in <span className="font-semibold text-primary">systems</span>{" "}
    and <span className="font-semibold text-primary">security</span>. I enjoy
    understanding how things work at a low level and turning that understanding
    into clean, reliable software.
  </p>

  <p>
    I spend time exploring security challenges on{" "}
    <a
      href="https://tryhackme.com/p/hariprasad0"
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 mx-1 text-primary font-semibold align-middle"
    >
      <SiTryhackme size={16} className="h-[1em] w-[1em] text-red-500 align-middle drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]" />
      TryHackMe
    </a>{" "}
    and when I step away from backend work I often experiment with UI/UX and
    share a few of those ideas on{" "}
    <a
      href="https://dribbble.com"
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 mx-1 text-primary font-semibold align-middle"
    >
      <DribbbleLogoIcon
        size={16}
        weight="duotone"
        className="align-middle  text-[#EA4C89] drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_1px_3px_rgba(234,76,137,0.45)]"
      />
      Dribbble
    </a>.
  </p>
</div>
            <HoverCardContent className="w-80 rounded-none hidden cursor-none">
             
            </HoverCardContent>
          </HoverCard>
       <div className=" items-center gap-2 flex">
            {socialLinks.map((link) => {
              return (
                <TooltipProvider key={link.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        aria-label={link.ariaLabel}
                        variant={"outline"}
                        className=" shadow-none py-3 px-3 rounded-[2px] bg-muted/20"
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
                    <TooltipContent className="text-xs rounded-[2px]">
                      <p>{link.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
            <ModeToggle />
          </div>
          <Tabs defaultValue={defaultTab} className="mt-6 w-full">
            <TabsList tabIndex={-1}>
              <TabsTrigger className="text-xs" value="Experience">
                <FlaskIcon weight="duotone" />
                Background
              </TabsTrigger>
              {eduData.length > 0 && (
                <TabsTrigger className="text-xs" value="Education">
                  <GraduationCapIcon weight="duotone" />
                  Education
                </TabsTrigger>
              )}
              {techCategories.length > 0 && (
                <TabsTrigger className="text-xs" value="tech-stack">
                  <ToolboxIcon weight="duotone" />
                  Tech Stack
                </TabsTrigger>
              )}
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
              {techCategories.length > 0 ? (
                <TabsContent value="tech-stack">
                  <TechStack categories={techCategories} />
                </TabsContent>
              ) : (
                <></>
              )}
            </TabsContents>
          </Tabs>
        </section>
        <GithubChart isDarkMode={isDarkMode} />
        {/* WORKS */}
        <section className="max-w-xl flex flex-col gap-7 mx-16">
          <div className="font-medium text-instrument text-lg tracking-wide">Projects</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            {works.map((item) => {
              const slides = item.carouselImg;
              return (
                <div
                  key={item.id}
                  className={`${item.disabled ? "pointer-events-none opacity-50" : ""
                    }`}
                >
                  {item.disabled ? (
                    <Card className="disabled:bg-slate-700 card flex flex-col gap-4 p-4 rounded-[2px] shadow-none ">
                      <div className="flex items-center space-x-3">
                        <Avatar className="rounded-[2px] w-12 h-12">
                          <AvatarImage alt="project" src={item.icon} />
                          <AvatarFallback className="text-sm text-gray-500">
                            {item.avatarFallback}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex justify-between w-full items-center ">
                          <h2 className="text-lg font-medium">{item.title}</h2>
                          <Button
                            variant="secondary"
                            className=" hidden md:block text-xs px-3 py-1 rounded-[2px]"
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
                        <Card className="bg-muted/20 flex flex-col gap-4 p-4 rounded-[2px]  shadow-none  hover:shadow-md transition-shadow cursor-pointer w-full h-full">
                          <img src={slides[0]} alt="" className="rounded-[2px]" />
                          <div className="flex items-center space-x-2 justify-between w-full">
                            <Avatar className="rounded-sm w-8 h-8 border">
                              <AvatarImage alt="project" src={item.icon} />
                              <AvatarFallback className="text-sm text-gray-500">
                                {item.avatarFallback}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex justify-between w-full items-center ">
                              <h2 className="text-md font-medium flex items-center gap-2">
                                {item.title}{" "}
                                {item.liveLink ? (
                                  ""
                                ) : (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button>
                                          {(() => {
                                            const Icon = getIcon("warning");
                                            return Icon ? (
                                              <Icon
                                                size={20}
                                                className="text-yellow-500 animate-pulse"
                                              />
                                            ) : null;
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
                                className="text-xs p-1 dark:bg-muted rounded-[2px] cursor-pointer"
                              >
                                Live
                              </button>
                              <span className="text-xs text-gray-500 ">|</span>
                              <span
                                onClick={handleLiveClick(item.githubLink)}
                                className="text-xs p-1 dark:bg-muted rounded-[2px] cursor-pointer"
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
                      <DrawerContent hidden={!iframeErrors[item.id]}>
                        <DemoFrame
                          className="h-full"
                          url={item.liveLink}
                          onLoadError={() => setIframeErrors(prev => ({ ...prev, [item.id]: true }))}
                          fallback={
                            <>
                              <DrawerHeader className="flex md:justify-between px-6 w-full items-center">
                                <DrawerTitle className="flex gap-6 items-center">
                                  <Avatar className="rounded-[2px] w-20 h-20">
                                    <AvatarImage src={item.avatarSrc} />
                                    <AvatarFallback>{item.avatarFallback}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex flex-col gap-2 items-start">
                                    <h2 className="text-2xl font-medium pt-3">{item.title}</h2>
                                    <p className="font-normal text-sm text-start text-muted-foreground">{item?.context}</p>
                                    <div className="flex gap-3 p-1">
                                      <Link to={item.githubLink}>
                                        <Button size="sm" className="flex gap-2">
                                          <FiGithub />
                                          View Project
                                        </Button>
                                      </Link>
                                      <Link to={item.liveLink}>
                                        <Button size="sm" variant="outline" disabled={!item.liveLink}>
                                          Live Preview
                                        </Button>
                                      </Link>
                                    </div>
                                  </div>
                                </DrawerTitle>
                                <DrawerClose className="hidden md:block">
                                  <Button variant="outline" className="shadow-none outline-none border-none px-2">
                                    <XIcon />
                                  </Button>
                                </DrawerClose>
                              </DrawerHeader>
                              <Separator />
                              <ScrollArea className="h-[90vh]">
                                <Tabs className="px-3 py-3" defaultValue="overview">
                                  <TabsList>
                                    <TabsTrigger className="text-xs" value="overview">Overview</TabsTrigger>
                                    <TabsTrigger className="text-xs" value="caseStudy">Details</TabsTrigger>
                                    <button className="absolute right-14">
                                      <FlagIcon size={18} />
                                    </button>
                                  </TabsList>
                                  <TabsContents>
                                    <TabsContent value="overview">
                                      <div className="p-4 mb-3 md:hidden flex flex-col gap-1">
                                        <h3 className="text-xm font-medium">Overview</h3>
                                        <p className="text-sm text-muted-foreground md:w-3/4 leading-6">{item?.description}</p>
                                      </div>
                                      <Carousel>
                                        <CarouselContent className="px-3">
                                          {slides.map((img, index) => (
                                            <CarouselItem key={index}>
                                              <img
                                                src={img}
                                                alt="Image"
                                                className="rounded-[2px] border object-cover w-full aspect-auto md:aspect-video border-muted-foreground/20"
                                              />
                                            </CarouselItem>
                                          ))}
                                        </CarouselContent>
                                        <CarouselPrevious />
                                        <CarouselNext />
                                      </Carousel>
                                    </TabsContent>
                                    <TabsContent value="caseStudy">
                                      <Card className="w-full shadow-none border-none">
                                        <CardHeader className="border-b p-4">
                                          <div className="space-y-2">
                                            <h3 className="font-medium">Tech Stack</h3>
                                            <div className="flex flex-wrap gap-2">
                                              {item?.tech?.map((techName, index) => {
                                                const IconComponent = getIcon(techName);
                                                return IconComponent ? (
                                                  <Tech key={index} tech={techName} Icon={IconComponent} />
                                                ) : (
                                                  <span key={index} className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-[2px]">
                                                    {techName}
                                                  </span>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        </CardHeader>
                                        <CardContent className="p-4 flex flex-col gap-4">
                                          <h3 className="text-xm font-medium">Description</h3>
                                          <p className="text-sm text-muted-foreground md:w-3/4 leading-6">{item?.description}</p>
                                          <div className="space-y-2">
                                            <h3 className="font-medium">Problem & Solution</h3>
                                            <p className="text-sm text-muted-foreground">{item?.problem_solution}</p>
                                            <h3 className="font-medium">Features</h3>
                                            {item?.features?.map((feature, index) => (
                                              <ul key={index} className="list-disc list-inside text-sm text-muted-foreground">
                                                <li>{feature}</li>
                                              </ul>
                                            ))}
                                          </div>
                                        </CardContent>
                                        <CardFooter className="p-4 flex items-center justify-between border-t">
                                          <Link to={item.liveLink}>
                                            <Button variant="outline" size="sm">Live Demo</Button>
                                          </Link>
                                          <Link to={item.githubLink}>
                                            <Button variant="default" size="sm">View Code</Button>
                                          </Link>
                                        </CardFooter>
                                      </Card>
                                    </TabsContent>
                                  </TabsContents>
                                </Tabs>
                              </ScrollArea>
                            </>
                          }
                        />


                      </DrawerContent>
                    </Drawer>
                  )}
                </div>
              );
            })}
          </div>
        </section>
       
        <section className="max-w-xl flex flex-col gap-7 mx-16">
          <div className="font-medium text-instrument text-lg tracking-wide">Writings</div>

          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="mb-4">
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
              <TabsContent value="all" className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {blogPosts.map((item) => (
                    <Card
                      key={item.id}
                      onClick={() => navigate(`/${item.slug}`, { replace: true })}
                      className="flex flex-col gap-4 p-3 rounded-[2px] shadow-none hover:shadow-md transition-shadow cursor-pointer w-full h-full bg-muted/20"
                    >
                      <div className="flex flex-col h-full gap-2">
                        <Badge
                          className={`flex justify-between bg-transparent hover:bg-transparent shadow-none text-muted-foreground p-0 font-medium ${item.readTime ? "w-full" : "w-fit"}`}
                        >
                          <p>{item.date}</p>
                          <p>{item.readTime}</p>
                        </Badge>
                        <h6 className="text-lg font-medium mt-2">{item.title}</h6>
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
                <TabsContent key={category} value={category} className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {filteredPosts.map((item) => (
                      <Card
                        key={item.id}
                        onClick={() => navigate(`/${item.slug}`)}
                        className="flex flex-col gap-4 p-3 rounded-[2px] shadow-none hover:shadow-md transition-shadow cursor-pointer w-full h-full bg-muted/20"
                      >
                        <div className="flex flex-col h-full gap-2">
                          <Badge
                            className={`flex justify-between bg-transparent shadow-none hover:bg-transparent text-muted-foreground p-0 font-medium ${item.readTime ? "w-full" : "w-fit"}`}
                          >
                            <p>{item.date}</p>
                            <p>{item.readTime}</p>
                          </Badge>
                          <h6 className="text-lg font-medium mt-2">
                            {item.title}
                          </h6>
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
      <section className="max-w-xl  flex-col gap-6 mx-16 hidden">
  <div className="font-medium text-instrument text-lg tracking-wide">
    Open Source Contributions
  </div>

  <div className="flex flex-col gap-3">

    <div className="group relative flex items-start gap-3 rounded-[2px] border bg-muted/20 backdrop-blur-sm p-3 transition hover:bg-muted/40">
      
      <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary/60 opacity-60 group-hover:opacity-100"></span>

      <FiGithub className="mt-[3px] text-muted-foreground" size={16} />

      <div className="flex flex-col gap-[2px]">
        <span className="text-sm font-medium">xmigrate</span>
        <span className="text-xs text-muted-foreground">
          Improved PostgreSQL query performance and added migration tests.
        </span>
      </div>

      <span className="ml-auto text-[11px] text-muted-foreground">
        2025
      </span>

    </div>

    <div className="group relative flex items-start gap-3 rounded-[2px] border bg-muted/20 backdrop-blur-sm p-3 transition hover:bg-muted/40">
      
      <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary/60 opacity-60 group-hover:opacity-100"></span>

      <FiGithub className="mt-[3px] text-muted-foreground" size={16} />

      <div className="flex flex-col gap-[2px]">
        <span className="text-sm font-medium">Fumadocs</span>
        <span className="text-xs text-muted-foreground">
          Fixed UI components and improved documentation layout.
        </span>
      </div>

      <span className="ml-auto text-[11px] text-muted-foreground">
        2024
      </span>

    </div>

  </div>
</section>

            <section className="relative mx-16 py-4 w-full ">
              <span className=" border-b w-full" />
           <Footer />
            </section>
          <div
      className="absolute  z-0 -right-10 top-0 bottom-0 pointer-events-none dark:opacity-[0.06] opacity-[0.06] w-10
                 border dark:border-[#eee] border-[#000]/70"
      style={{
        backgroundImage:
          "repeating-linear-gradient(-45deg, transparent, transparent 2px, currentColor 2px, currentColor 3px, transparent 3px, transparent 6px)",
      }}
    />
        </div>
      
      </Card>
    </>
  );
};

export default Home;
