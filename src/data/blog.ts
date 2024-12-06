const BLOG_URL =
  'https://raw.githubusercontent.com/hariprasadd0/Thoughtbin/refs/heads/main/data/journal.json';
export interface Blog {
  title: string;
  description: string;
  date: string;
  url: string;
}
export const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await fetch(BLOG_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }
    const blogs: Blog[] = await response.json();
    console.log(blogs);

    return blogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};
