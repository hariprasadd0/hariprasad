import matter from 'gray-matter';

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  imageUrl?: string;
  content: string;
  slug: string;
}

let cachedPosts: BlogPost[] | null = null;

// This function will be used to dynamically import markdown files
export const loadMarkdownFiles = async (): Promise<BlogPost[]> => {
  if (cachedPosts) {
    return cachedPosts;
  }

  const posts: BlogPost[] = [];

  // Use Vite's glob import to load all markdown files from journals folder
  // Try both absolute and relative paths
  const markdownFiles = import.meta.glob('../data/journals/**/*.md', {
    as: 'raw',
    eager: true
  });


  for (const [path, content] of Object.entries(markdownFiles)) {
    const { data, content: markdownContent } = matter(content as string);

    // Extract folder number as ID from path (e.g., /src/data/journals/1/file.md -> "1")
    const idMatch = path.match(/journals\/(\d+)\//);
    const id = idMatch ? idMatch[1] : '0';

    // Extract filename without extension for slug
    const filename = path.split('/').pop()?.replace('.md', '') || '';
    const slug = filename
      .toLowerCase()
      .replace(/'/g, '') // Remove apostrophes
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .trim()
      .replace(/\s+/g, '-') // Spaces to hyphens
      .replace(/-+/g, '-'); // Multiple hyphens   // Trim hyphens from start and end



    posts.push({
      id,
      title: data.title || filename,
      description: data.description || '',
      category: data.category || 'system',
      readTime: data.readTime || '5 min',
      date: data.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: data.author || 'Hariprasad',
      imageUrl: data.imageUrl,
      content: markdownContent,
      slug,
    });
  }

  cachedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return cachedPosts;
};
