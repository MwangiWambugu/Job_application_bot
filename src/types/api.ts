export interface JobListing {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  budget?: string;
  skills: string[];
  postedAt: string;
  platform: 'upwork' | 'linkedin' | 'indeed';
  url: string;
  matchScore?: number;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description?: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
  }>;
}

export interface ProposalRequest {
  jobListing: JobListing;
  resumeData: ResumeData;
  tone: 'professional' | 'casual' | 'persuasive';
  customInstructions?: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface JobSearchFilters {
  keywords: string[];
  location?: string;
  minBudget?: number;
  maxBudget?: number;
  jobType?: string;
  experienceLevel?: string;
}