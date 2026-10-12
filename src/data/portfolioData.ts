import { SkillItem, ProjectItem, EndorsementItem, SocialLinkItem } from '../types/portfolio';
import neuralSynthesizerImg from '../assets/images/neural_synthesizer_1791460899279.jpg';
import codeStudioImg from '../assets/images/code_studio_architecture_1791460920186.jpg';
import spatialPortalImg from '../assets/images/spatial_portal_world_1791460929725.jpg';
import cropScannerImg from '../assets/images/crop_scanner_ai_1791460887466.jpg';

export {
  neuralSynthesizerImg,
  codeStudioImg,
  spatialPortalImg,
  cropScannerImg,
};

export const PORTFOLIO_INFO = {
  name: 'Udayan Goel',
  role: 'AI & Modern Web Engineer',
  degree: 'B.Tech in Computer Science & Engineering (Core)',
  university: 'JECRC University',
  location: 'Jaipur, Rajasthan, India',
  cohort: '2026–Present',
  status: 'Open for AI Research & Software Internships',
  email: 'goeludayan@gmail.com',
  heroVideoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
  bio: 'Computer Science engineer at JECRC University specializing in artificial intelligence and modern web architectures. Grounded in computational fundamentals, I engineer high-performance systems and intelligent diagnostic tools that bridge mathematical precision with seamless digital experiences.',
  heroTagline: 'Where dreams rise through the silence.',
  heroKicker: 'PORTFOLIO · UDAYAN GOEL · 2026',
};

export const CORE_PILLARS = [
  {
    id: 'pillar-ai',
    title: 'Applied AI & Computer Vision',
    tagline: 'Intelligent Inference',
    description: 'Developing specialized neural classifiers, computer vision pipelines, and diagnostic algorithms designed for tangible agricultural and diagnostic problems.',
    metrics: '94%+ Neural Diagnostic Accuracy',
    image: neuralSynthesizerImg,
  },
  {
    id: 'pillar-web',
    title: 'Modern Web Architectures',
    tagline: 'Reactive Component Systems',
    description: 'Engineering responsive single-page applications with React 19, TypeScript, and modern CSS frameworks, pairing fluid micro-interactions with resilient state contracts.',
    metrics: '60 FPS Motion Physics',
    image: codeStudioImg,
  },
  {
    id: 'pillar-cs',
    title: 'Algorithmic Rigor & Foundations',
    tagline: 'Computational Precision',
    description: 'Cultivating deep computational fundamentals across data structures, algorithmic complexity, system architecture, and modular software design.',
    metrics: 'Space-Time Optimized',
    image: spatialPortalImg,
  },
];

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'ai-llm',
    name: 'Artificial Intelligence & LLMs',
    category: 'AI & Data',
    level: 'Active Exploration & Integration',
    experience: 'Gemini Models · Neural Classifiers · Autonomous Agents',
    highlight: 'Building intelligent workflows, multimodal prompt engineering, and conversational retrieval systems with modern SDKs.',
    tags: ['Prompt Engineering', 'Python', 'Embeddings', 'AI Agents'],
  },
  {
    id: 'python-dev',
    name: 'Python & Scientific Computing',
    category: 'AI & Data',
    level: 'Applied Scientific Stack',
    experience: 'Data Wrangling · Automation Scripts · Computer Vision',
    highlight: 'Developing image processing routines, CV pipelines for agricultural health diagnostics, and mathematical scripting.',
    tags: ['Python', 'OpenCV', 'TensorFlow', 'Automation'],
  },
  {
    id: 'react-ts',
    name: 'React 19 & TypeScript',
    category: 'Frontend & Web',
    level: 'Core Production Stack',
    experience: 'Component Systems · Custom Hooks · Strict Types',
    highlight: 'Crafting resilient, high-speed single page applications with fluid state management, accessible UI, and type-safe contracts.',
    tags: ['TypeScript', 'Hooks', 'Vite', 'Component Architecture'],
  },
  {
    id: 'tailwind-motion',
    name: 'Tailwind CSS & Motion',
    category: 'Frontend & Web',
    level: 'Advanced UI/UX',
    experience: 'Spring Physics · Responsive Layouts · Micro-interactions',
    highlight: 'Translating complex design concepts into fluid 60fps animations, magnetic interactions, and responsive design systems.',
    tags: ['Tailwind CSS', 'Motion', 'Liquid Glass', 'Responsive'],
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    category: 'Core CS',
    level: 'Active Academic Mastery',
    experience: 'Computational Complexity · Graphs · Trees · DP',
    highlight: 'Deep computational rigor in C/C++ and Python, focusing on space-time efficiency and systematic problem-solving architectures.',
    tags: ['Complexity Analysis', 'Algorithms', 'C++', 'Data Structures'],
  },
  {
    id: 'git-systems',
    name: 'Git & Systems Tooling',
    category: 'Productivity & Tools',
    level: 'Daily Engineering Standard',
    experience: 'Semantic Versioning · CI/CD · CLI Environments',
    highlight: 'Maintaining clean commit histories, branching strategies, and reproducible local development environments on Linux.',
    tags: ['Git', 'GitHub', 'Linux Shell', 'Build Tooling'],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'ai-crop-scanner',
    title: 'AI Based Crop Scanner',
    subtitle: 'Computer Vision & Agricultural Diagnostics',
    category: 'AI PROJECT',
    categoryKey: 'ai',
    description: 'An intelligent agricultural assistance tool that uses computer vision algorithms to detect early-stage crop infections and nutrient deficiencies. Designed to assist agriculturalists and students with instant plant health diagnostics.',
    highlights: [
      'Real-time leaf image scanning & health scoring',
      'Pretrained neural classifier for crop diseases',
      'Automated organic and chemical treatment advice',
      'Offline-capable caching and diagnostic history',
    ],
    tags: ['Python', 'Computer Vision', 'Artificial Intelligence', 'TensorFlow', 'Web API'],
    metrics: '94%+ Neural Diagnostic Accuracy',
    image: cropScannerImg,
    githubUrl: 'https://github.com/',
    demoUrl: '#',
  },
];

export const INITIAL_ENDORSEMENTS: EndorsementItem[] = [];

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    name: 'LinkedIn',
    category: 'Professional Network',
    handle: 'in/udayan-goel',
    url: 'https://www.linkedin.com/in/udayan-goel-ab102a403',
    accent: 'hover:border-[#0077B5]/60 hover:text-sky-400',
    iconName: 'linkedin',
  },
  {
    name: 'GitHub',
    category: 'Open Source & Repos',
    handle: 'github.com/udayan',
    url: 'https://github.com/',
    accent: 'hover:border-cyan-500/60 hover:text-cyan-300',
    iconName: 'github',
  },
  {
    name: 'Direct Email',
    category: 'Fast Inquiries & Notes',
    handle: 'goeludayan@gmail.com',
    url: 'mailto:goeludayan@gmail.com',
    accent: 'hover:border-emerald-500/60 hover:text-emerald-400',
    iconName: 'email',
  },
];
