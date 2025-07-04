import axios from 'axios';
import { JobListing, JobSearchFilters, APIResponse } from '../types/api';

class IndeedService {
  private baseURL = 'https://api.indeed.com/ads/apisearch';
  private publisherKey: string | null = null;

  constructor() {
    this.publisherKey = import.meta.env.VITE_INDEED_PUBLISHER_KEY;
  }

  async searchJobs(filters: JobSearchFilters): Promise<APIResponse<JobListing[]>> {
    if (!this.publisherKey) {
      return {
        success: false,
        error: 'Indeed API credentials not configured'
      };
    }

    try {
      const params = new URLSearchParams({
        publisher: this.publisherKey,
        q: filters.keywords.join(' '),
        l: filters.location || '',
        sort: 'date',
        radius: '25',
        st: 'jobsite',
        jt: filters.jobType || 'all',
        start: '0',
        limit: '25',
        fromage: '7', // Jobs from last 7 days
        format: 'json',
        v: '2'
      });

      const response = await axios.get(`${this.baseURL}?${params}`);

      const jobs: JobListing[] = response.data.results?.map((job: any) => ({
        id: job.jobkey,
        title: job.jobtitle,
        company: job.company,
        description: job.snippet,
        location: job.formattedLocation,
        budget: job.salary || undefined,
        skills: this.extractSkillsFromDescription(job.snippet),
        postedAt: job.date,
        platform: 'indeed' as const,
        url: job.url
      })) || [];

      return {
        success: true,
        data: jobs
      };
    } catch (error) {
      console.error('Indeed API error:', error);
      return {
        success: false,
        error: 'Failed to fetch jobs from Indeed'
      };
    }
  }

  async applyToJob(jobId: string, proposal: string): Promise<APIResponse<boolean>> {
    // Note: Indeed doesn't provide a direct API for job applications
    // This would typically require web scraping or browser automation
    return {
      success: false,
      error: 'Indeed does not support direct API applications. Manual application required.'
    };
  }

  private extractSkillsFromDescription(description: string): string[] {
    // Simple skill extraction - in production, use more sophisticated NLP
    const commonSkills = [
      'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++', 'SQL',
      'AWS', 'Docker', 'Kubernetes', 'Git', 'HTML', 'CSS', 'Angular', 'Vue.js'
    ];

    return commonSkills.filter(skill => 
      description.toLowerCase().includes(skill.toLowerCase())
    );
  }
}

export default new IndeedService();