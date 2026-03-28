import GhostContentAPI from '@tryghost/content-api';

const defaultGhostUrl = process.env.NODE_ENV === 'production'
  ? 'http://ghost:2368'
  : 'https://hitchhikerdiary.pavalep.com';

const ghostUrl = process.env.GHOST_API_URL || process.env.GHOST_URL || defaultGhostUrl;
const ghostKey = process.env.GHOST_CONTENT_API_KEY;

// Initialize Ghost Content API
const api = new GhostContentAPI({
  url: ghostUrl,
  key: ghostKey || '',
  version: 'v5.0'
});

const ensureConfigured = () => {
  if (!ghostKey) {
    throw new Error('Missing GHOST_CONTENT_API_KEY. Configure it in your environment.');
  }
};

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
export const getPosts = async (limit = 12, page = 1): Promise<{ posts: Post[], meta: unknown }> => {
  try {
    ensureConfigured();
    const posts = await api.posts.browse({
      limit,
      page,
      include: ['tags', 'authors'],
      formats: ['html', 'plaintext']
    });
    const postsWithMeta = posts as Post[] & { meta?: unknown };
    return { posts: posts as Post[], meta: postsWithMeta.meta ?? null };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], meta: null };
  }
};

// Fetch featured posts for hero section
export const getFeaturedPosts = async (limit = 6): Promise<Post[]> => {
  try {
    ensureConfigured();
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
    ensureConfigured();
    const post = await api.posts.read(
      { slug },
      {
        include: ['tags', 'authors'],
        formats: ['html', 'plaintext']
      }
    );
    return post as Post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

// Fetch all tags
export const getTags = async (): Promise<Tag[]> => {
  try {
    ensureConfigured();
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
    ensureConfigured();
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
