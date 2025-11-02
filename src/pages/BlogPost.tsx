import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { TbArrowBack } from "react-icons/tb";
import { loadMarkdownFiles, BlogPost } from '@/utils/loadMarkdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/prism'

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  const handleBackNavigation = () => {
    navigate('/');
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if 'B' key is pressed (case-insensitive)
      if (event.key.toLowerCase() === 'b' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        handleBackNavigation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleBackNavigation]);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const posts = await loadMarkdownFiles();
        const foundPost = posts.find(p => p.slug === slug);
        setPost(foundPost || null);
      } catch (error) {
         console.error('Error loading blog post:', error);
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
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground bg-muted p-2 rounded-md transition-colors"
        >
          <TbArrowBack size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl px-6 md:px-10 py-8">
      {/* Header */}
      <div className="absolute top-4 right-4 flex items-center gap-2 group">
        <button
          onClick={handleBackNavigation}
          className="flex items-center gap-2 bg-secondary p-2 rounded-md transition-colors mb-8 group"
          title="Back to home (or press B)"
        >
          <TbArrowBack strokeWidth={1.5} size={24} className="group-hover:scale-110 transition-transform" />
          <kbd className="hidden md:inline-flex items-center justify-center min-w-[24px] h-6 px-2 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-600 shadow-sm">
            B
          </kbd>        
          </button>

      </div>

      {/* Markdown Content */}
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            // Custom image handling for local images
            img: ({ node, ...props }) => {
              const src = props.src || '';
              // If image path is relative, prepend the journals folder path
              const imageSrc = src.startsWith('http')
                ? src
                :src.startsWith('/')
                ? src
                : `/src/data/journals/${post.id}/${src}`;

              return (
                <img
                  {...props}
                  src={imageSrc}
                  alt={props.alt || ''}
                  className="rounded-sm my-4 dark:bg-white"
                  loading="lazy"
                />
              );
            },
            // Style code blocks
           code({ node, inline, className, children: codeChildren, ...props }:any) {
            
          const match = /language-(\w+)/.exec(className || "");

          return !inline && match ? (
            <SyntaxHighlighter
              style={dracula }
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
            a: ({ node, ...props }) => (
              <a
                {...props}
                className="text-primary hover:underline"
                target={props.href?.startsWith('http') ? '_blank' : undefined}
                rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default BlogPostPage;
