export interface SkillItem {
  id: string;
  name: string;
  category: 'AI & Data' | 'Frontend & Web' | 'Core CS' | 'Productivity & Tools';
  level: string;
  experience: string;
  highlight: string;
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryKey: 'ai' | 'web';
  description: string;
  highlights: string[];
  tags: string[];
  metrics: string;
  image: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface EndorsementItem {
  id: string;
  author: string;
  role: 'Academic Faculty' | 'Industry Mentor' | 'Project Partner' | 'Student Peer';
  organization?: string;
  rating: number;
  projectFocus?: string;
  message: string;
  date: string;
}

export interface SocialLinkItem {
  name: string;
  category: string;
  handle: string;
  url: string;
  accent: string;
  iconName: 'linkedin' | 'github' | 'email';
}
