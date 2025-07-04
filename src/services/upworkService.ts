import axios from 'axios';
import { JobListing, JobSearchFilters, APIResponse } from '../types/api';

class UpworkService {
  private baseURL = 'https://www.upwork.com/api';
  private apiKey: string | null = null;
  private accessToken: string | null = null;

  constructor() {
    this.apiKey = import.meta.env.VITE_UPWORK_API_KEY;
    this.accessToken = import.meta.env.VITE_UPWORK_ACCESS_TOKEN;
  }

  async searchJobs(filters: JobSearchFilters): Promise<APIResponse<JobListing[]>> {
    if (!this.apiKey || !this.accessToken) {
      return {
        success: false,
        error: 'Upwork API credentials not configured'
      };
    }

    try {
      // Note: This is a simplified example. Actual Upwork API requires OAuth flow
      const params = new URLSearchParams({
        q: filters.keywords.join(' '),
        ...(filters.location && { location: filters.location }),
        ...(filters.minBudget && { budget_min: filters.minBudget.toString() }),
        ...(filters.maxBudget && { budget_max: filters.maxBudget.toString() }),
        ...(filters.jobType && { job_type: filters.jobType }),
        sort: 'recency'
      });

      const response = await axios.get(`${this.baseURL}/profiles/v1/search/jobs?${params}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'User-Agent': 'AutoApply AI'
        }
      });

      const jobs: JobListing[] = response.data.jobs?.map((job: any) => ({
        id: job.id,
        title: job.title,
        company: job.client?.company_name || 'Unknown',
        description: job.description,
        location: job.client?.location?.country || 'Remote',
        budget: job.budget ? `$${job.budget}/hr` : undefined,
        skills: job.skills || [],
        postedAt: job.date_created,
        platform: 'upwork' as const,
        url: job.url
      })) || [];

      return {
        success: true,
        data: jobs
      };
    } catch (error) {
      console.error('Upwork API error:', error);
      return {
        success: false,
        error: 'Failed to fetch jobs from Upwork'
      };
    }
  }

  async applyToJob(jobId: string, proposal: string): Promise<APIResponse<boolean>> {
    if (!this.apiKey || !this.accessToken) {
      return {
        success: false,
        error: 'Upwork API credentials not configured'
      };
    }

    try {
      const response = await axios.post(
        `${this.baseURL}/hr/v2/applications`,
        {
          job_id: jobId,
          cover_letter: proposal
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        data: true
      };
    } catch (error) {
      console.error('Upwork application error:', error);
      return {
        success: false,
        error: 'Failed to submit application to Upwork'
      };
    }
  }

  // OAuth flow methods
  getAuthURL(): string {
    const clientId = this.apiKey;
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/upwork');
    return `https://www.upwork.com/api/auth/v1/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  }

  async exchangeCodeForToken(code: string): Promise<APIResponse<string>> {
    try {
      const response = await axios.post('/api/auth/upwork/token', { code });
      return {
        success: true,
        data: response.data.access_token
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to exchange code for token'
      };
    }
  }
}

export default new UpworkService();