export interface IPost {
  date: string;
  title: string;
  excerpt: string;
  slug: string;
  image: string;
  tags: string[];
  isPublished: boolean;
}

export interface IQualification {
  title: string;
  description: string;
  link: string;
  icon: string;
}

export interface ISkill {
  title: string;
  skills: string[];
}
export interface IProject {
  name: string;
  description: string;
  tags: string[];
  image: string;
  githubURL: string;
}

export interface IService {
  cta: string;
  subtext: string;
  summary: string;
  link: string;
}

export interface IHeader {
  title: string;
  summary: string;
  image: string;
}
