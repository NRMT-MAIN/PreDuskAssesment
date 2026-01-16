export interface Skill {
  id?: string;
  name: string;
  level?: string;
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface WorkHistory {
  id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
  current?: boolean;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  technologies?: string[];
  url?: string;
  startDate?: string;
  endDate?: string;
}

export interface Profile {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  title?: string;
  summary?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  skills?: Skill[];
  education?: Education[];
  workHistory?: WorkHistory[];
  projects?: Project[];
  createdAt?: string;
  updatedAt?: string;
}
