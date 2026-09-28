export interface NavigationItem {
  label: string;
  target: string;
}

export interface HeroSection {
  name: string;
  roles: string;
  description: string;
  primaryBtnText: string;
  secondaryBtnText: string;
  profileImage: string;
}

export interface StrengthItem {
  id: string;
  tag?: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutSection {
  title: string;
  paragraphs: string[];
  strengths: StrengthItem[];
}

export interface ArsenalGroup {
  id: string;
  title: string;
  icon: string;
  items: string[];
}

export interface TechnicalArsenalSection {
  title: string;
  subtitle: string;
  groups: ArsenalGroup[];
}

export interface ProjectAccount {
  role: string;
  username: string;
  password: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  hasCaseStudy: boolean;
  caseStudyText?: string;
  demoUrl?: string;
  demoButtonText?: string;
  githubUrl?: string;
  features?: { title: string; description: string }[];
  techStack?: string[];
  accounts?: ProjectAccount[];
}

export interface FeaturedProjectsSection {
  title: string;
  subtitle: string;
  projects: ProjectItem[];
}

export interface JourneyStep {
  id: string;
  period: string;
  title: string;
  description: string;
  tags?: string[];
}

export interface JourneySection {
  title: string;
  steps: JourneyStep[];
}

export interface ContactSection {
  title: string;
  subtitle: string;
  email: string;
  github: string;
  githubUrl: string;
  placeholderName: string;
  placeholderEmail: string;
  placeholderMessage: string;
  buttonText: string;
  successMessage: string;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterSection {
  brand: string;
  tagline: string;
  links: FooterLink[];
}

export interface ContentData {
  logo: string;
  navigation: NavigationItem[];
  resumeLabel: string;
  hero: HeroSection;
  about: AboutSection;
  technicalArsenal: TechnicalArsenalSection;
  featuredProjects: FeaturedProjectsSection;
  experiences: JourneySection;
  contact: ContactSection;
  footer: FooterSection;
}
