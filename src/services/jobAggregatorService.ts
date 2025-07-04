import { JobListing, JobSearchFilters, APIResponse } from '../types/api';
import upworkService from './upworkService';
import linkedinService from './linkedinService';
import indeedService from './indeedService';
import claudeService from './claudeService';

class JobAggregatorService {
  async searchAllPlatforms(filters: JobSearchFilters): Promise<JobListing[]> {
    const promises = [
      upworkService.searchJobs(filters),
      linkedinService.searchJobs(filters),
      indeedService.searchJobs(filters)
    ];

    try {
      const results = await Promise.allSettled(promises);
      const allJobs: JobListing[] = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.success && result.value.data) {
          allJobs.push(...result.value.data);
        } else {
          const platforms = ['Upwork', 'LinkedIn', 'Indeed'];
          console.warn(`Failed to fetch jobs from ${platforms[index]}:`, 
            result.status === 'fulfilled' ? result.value.error : result.reason);
        }
      });

      // Remove duplicates based on title and company
      const uniqueJobs = this.removeDuplicates(allJobs);
      
      // Sort by posted date (newest first)
      return uniqueJobs.sort((a, b) => 
        new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      );
    } catch (error) {
      console.error('Error aggregating jobs:', error);
      return [];
    }
  }

  async calculateMatchScores(jobs: JobListing[], resumeData: any): Promise<JobListing[]> {
    const jobsWithScores = await Promise.all(
      jobs.map(async (job) => {
        try {
          const matchScore = await claudeService.calculateMatchScore(job, resumeData);
          return { ...job, matchScore };
        } catch (error) {
          console.error(`Error calculating match score for job ${job.id}:`, error);
          return { ...job, matchScore: 0 };
        }
      })
    );

    // Sort by match score (highest first)
    return jobsWithScores.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  }

  async applyToJob(job: JobListing, proposal: string): Promise<APIResponse<boolean>> {
    switch (job.platform) {
      case 'upwork':
        return upworkService.applyToJob(job.id, proposal);
      case 'linkedin':
        return linkedinService.applyToJob(job.id, proposal);
      case 'indeed':
        return indeedService.applyToJob(job.id, proposal);
      default:
        return {
          success: false,
          error: 'Unsupported platform'
        };
    }
  }

  private removeDuplicates(jobs: JobListing[]): JobListing[] {
    const seen = new Set<string>();
    return jobs.filter(job => {
      const key = `${job.title.toLowerCase()}-${job.company.toLowerCase()}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }
}

export default new JobAggregatorService();