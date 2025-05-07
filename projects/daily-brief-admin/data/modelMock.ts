export type Language = 'pt-BR' | 'en' | 'es';

export type PostStatus = 'pending' | 'approved' | 'rejected';

export type PostVersion = {
  id: string;
  createdAt: string;
  updatedBy: string;
  content: {
    [key in Language]: string;
  };
  title: {
    [key in Language]: string;
  };
};

export type Post = {
  id: string;
  slug: string;
  title: {
    [key in Language]: string;
  };
  content: {
    [key in Language]: string;
  };
  excerpt: {
    [key in Language]: string;
  };
  status: PostStatus;
  category: string;
  author: string;
  featuredImage: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishDate?: string;
  monetization: {
    adsenseEnabled: boolean;
    affiliateLinks: {
      provider: 'hotmart' | 'clickbank' | 'amazon';
      id: string;
      url: string;
    }[];
  };
  versions: PostVersion[];
};

export type Log = {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: {
    postId?: string;
    postTitle?: string;
    change?: string;
  };
};

export type DashboardSummary = {
  totalPosts: number;
  pendingPosts: number;
  approvedPosts: number;
  rejectedPosts: number;
  todayViews: number;
  monthlyViews: number;
  affiliateClicks: number;
  affiliateConversions: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  createdAt: string;
  lastActive?: string;
};

export interface DashboardCard {
  title: string;
  value: number | string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}
