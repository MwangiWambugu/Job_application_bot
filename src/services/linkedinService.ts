import axios from 'axios';
import { JobListing, JobSearchFilters, APIResponse } from '../types/api';

class LinkedInService {
  private baseURL = 'https://api.linkedin.com/v2';
  private accessToken: string | null = null;

  constructor() {
    this.accessToken = import.meta.env.VITE_LINKEDIN_ACCESS_TOKEN;
  }

  async searchJobs(filters: JobSearchFilters): Promise<APIResponse<JobListing[]>> {
    if (!this.accessToken) {
      return {
        success: false,
        error: 'LinkedIn API credentials not configured'
      };
    }

    try {
      const params = new URLSearchParams({
        keywords: filters.keywords.join(' '),
        ...(filters.location && { locationId: filters.location }),
        ...(filters.experienceLevel && { experienceLevel: filters.experienceLevel }),
        count: '25',
        start: '0'
      });

      const response = await axios.get(`${this.baseURL}/jobSearch?${params}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });

      const jobs: JobListing[] = response.data.elements?.map((job: any) => ({
        id: job.id,
        title: job.title,
        company: job.companyDetails?.company?.name || 'Unknown',
        description: job.description?.text || '',
        location: job.formattedLocation || 'Remote',
        budget: undefined, // LinkedIn doesn't typically show salary in search
        skills: job.skillsFromDescription || [],
        postedAt: new Date(job.listedAt).toISOString(),
        platform: 'linkedin' as const,
        url: `https://www.linkedin.com/jobs/view/${job.id}`
      })) || [];

      return {
        success: true,
        data: jobs
      };
    } catch (error) {
      console.error('LinkedIn API error:', error);
      return {
        success: false,
        error: 'Failed to fetch jobs from LinkedIn'
      };
    }
  }

  async applyToJob(jobId: string, proposal: string): Promise<APIResponse<boolean>> {
    if (!this.accessToken) {
      return {
        success: false,
        error: 'LinkedIn API credentials not configured'
      };
    }

    try {
      // Note: LinkedIn's API for job applications is limited and requires special permissions
      const response = await axios.post(
        `${this.baseURL}/simpleJobPostings/${jobId}/jobApplications`,
        {
          coverLetter: proposal
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0'
          }
        }
      );

      return {
        success: true,
        data: true
      };
    } catch (error) {
      console.error('LinkedIn application error:', error);
      return {
        success: false,
        error: 'Failed to submit application to LinkedIn'
      };
    }
  }

  getAuthURL(): string {
    const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/linkedin');
    const scope = encodeURIComponent('r_liteprofile r_emailaddress w_member_social');
    return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  }
}

export default new LinkedInService();