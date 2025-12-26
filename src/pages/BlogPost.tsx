import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { TbArrowBack } from "react-icons/tb";
import { loadMarkdownFiles, BlogPost } from "@/utils/loadMarkdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Helmet } from "react-helmet-async";
import { getComponentForTag } from "@/components/blog/registry";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { ArrowBendDownLeftIcon } from "@phosphor-icons/react";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  const handleBackNavigation = useCallback(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if 'B' key is pressed (case-insensitive)
      if (
        event.key.toLowerCase() === "b" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        handleBackNavigation();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleBackNavigation]);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const posts = await loadMarkdownFiles();
        const foundPost = posts.find((p) => p.slug === slug);
        setPost(foundPost || null);
      } catch (error) {
        console.error("Error loading blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="container px-10 py-8 flex justify-center items-center min-h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container px-10 py-8 flex flex-col items-end justify-end min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground bg-muted p-2 rounded-md transition-colors"
        >
          <TbArrowBack size={24} />
        </button>
      </div>
    );
  }

  const canonicalUrl = `https://hariprasadk.vercel.app/${post.slug}`;
  return (
    <>
      <Helmet>
        <title>{post.title} | Hariprasad</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        {post.imageUrl && <meta property="og:image" content={post.imageUrl} />}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        {post.imageUrl && <meta name="twitter:image" content={post.imageUrl} />}

        {/* Article metadata */}
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            author: {
              "@type": "Person",
              name: post.author,
              url: "https://hariprasadk.vercel.app",
            },
            datePublished: post.date,
            url: canonicalUrl,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": canonicalUrl,
            },
            ...(post.imageUrl && { image: post.imageUrl }),
          })}
        </script>
      </Helmet>
      <div className="container max-w-4xl px-6 md:px-10 py-8">
        {/* Header */}
        <div className="absolute top-4 right-9 flex items-center gap-2 group">
          <button
            onClick={handleBackNavigation}
            className="flex items-center gap-2 bg-secondary p-2 rounded-md transition-colors mb-8 group"
            title="Back to home (or press B)"
          >
            <KbdGroup >
              <ArrowBendDownLeftIcon weight="duotone" />
              <Kbd>B</Kbd>
            </KbdGroup>
          </button>
        </div>

        {/* Markdown Content */}
        <article className="prose prose-neutral dark:prose-invert max-w-none p-5 border shadow ">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize, rehypeRaw]}
            components={{
              // Custom image handling for local images
              img: ({ ...props }) => {
                const src = props.src || "";
                // If image path is relative, prepend the journals folder path
                const imageSrc = src.startsWith("http")
                  ? src
                  : src.startsWith("/")
                    ? src
                    : `/src/data/journals/${post.id}/${src}`;

                return (
                  <img
                    {...props}
                    src={imageSrc}
                    alt={props.alt || ""}
                    className="rounded-sm my-4 dark:bg-white"
                    loading="lazy"
                  />
                );
              },
              // Style code blocks
              code({
                inline,
                className,
                children: codeChildren,
                ...props
              }: any) {
                const match = /language-(\w+)/.exec(className || "");

                return !inline && match ? (
                  <SyntaxHighlighter
                    style={dracula}
                    PreTag="div"
                    language={match[1]}
                  >
                    {String(codeChildren).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {codeChildren}
                  </code>
                );
              },
              // Style links
              a: ({ ...props }) => (
                <a
                  {...props}
                  className="text-primary hover:underline"
                  target={props.href?.startsWith("http") ? "_blank" : undefined}
                  rel={
                    props.href?.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                />
              ),
              blockquote: (props: any) => {
                // Check if children exists and has content
                const grandChildren = props.children?.[1]?.props?.children;
                const content = Array.isArray(grandChildren) ? grandChildren[0] : grandChildren;

                if (typeof content === 'string') {
                  const match = content.match(/^\[!(\w+)\]/);
                  if (match) {
                    const [, tag] = match;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Component = getComponentForTag(tag);
                    if (Component) {
                      return <Component {...props} />;
                    }
                  }
                }

                return <blockquote {...props} />;
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </>
  );
};

export default BlogPostPage;
