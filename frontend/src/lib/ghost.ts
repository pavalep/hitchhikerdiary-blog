import GhostContentAPI from '@tryghost/content-api';

// Initialize Ghost Content API
const api = new GhostContentAPI({
  url: process.env.GHOST_URL!,
  key: process.env.GHOST_CONTENT_API_KEY!,
  version: 'v5.0'
});

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  html: string;
  plaintext: string;
  feature_image?: string;
  published_at: string;
  updated_at: string;
  created_at: string;
  url: string;
  reading_time: number;
  primary_author: {
    id: string;
    name: string;
    slug: string;
    profile_image?: string;
    cover_image?: string;
    bio?: string;
    website?: string;
    location?: string;
    facebook?: string;
    twitter?: string;
  };
  primary_tag?: {
    id: string;
    name: string;
    slug: string;
    description?: string;
    feature_image?: string;
    url: string;
  };
  tags: Array<{
    id: string;
    name: string;
    slug: string;
    description?: string;
    feature_image?: string;
    url: string;
  }>;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  feature_image?: string;
  url: string;
  count?: {
    posts: number;
  };
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  profile_image?: string;
  cover_image?: string;
  bio?: string;
  website?: string;
  location?: string;
  facebook?: string;
  twitter?: string;
  count?: {
    posts: number;
  };
}

// Fetch all posts with pagination
export const getPosts = async (limit = 12, page = 1): Promise<{ posts: Post[], meta: any }> => {
  try {
    const posts = await api.posts.browse({
      limit,
      page,
      include: ['tags', 'authors'],
      formats: ['html', 'plaintext']
    });
    return { posts: posts as Post[], meta: (posts as any).meta };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], meta: null };
  }
};

// Fetch featured posts for hero section
export const getFeaturedPosts = async (limit = 6): Promise<Post[]> => {
  try {
    const posts = await api.posts.browse({
      limit,
      filter: 'featured:true',
      include: ['tags', 'authors'],
      formats: ['html', 'plaintext']
    });
    return posts as Post[];
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
};

// Fetch single post by slug
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    const post = await api.posts.read({
      slug,
      include: ['tags', 'authors'],
      formats: ['html', 'plaintext']
    });
    return post as Post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

// Fetch all tags
export const getTags = async (): Promise<Tag[]> => {
  try {
    const tags = await api.tags.browse({
      include: ['count.posts']
    });
    return tags as Tag[];
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
};

// Fetch posts by tag
export const getPostsByTag = async (tagSlug: string, limit = 12): Promise<Post[]> => {
  try {
    const posts = await api.posts.browse({
      limit,
      filter: `tag:${tagSlug}`,
      include: ['tags', 'authors'],
      formats: ['html', 'plaintext']
    });
    return posts as Post[];
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    return [];
  }
};

export default api;
