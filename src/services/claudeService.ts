import Anthropic from '@anthropic-ai/sdk';
import { ProposalRequest, ResumeData, JobListing } from '../types/api';

class ClaudeService {
  private client: Anthropic | null = null;

  constructor() {
    const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;
    if (apiKey) {
      this.client = new Anthropic({
        apiKey,
        dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
      });
    }
  }

  async generateProposal(request: ProposalRequest): Promise<string> {
    if (!this.client) {
      throw new Error('Claude API key not configured');
    }

    const { jobListing, resumeData, tone, customInstructions } = request;

    const prompt = this.buildProposalPrompt(jobListing, resumeData, tone, customInstructions);

    try {
      const response = await this.client.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      return response.content[0].type === 'text' ? response.content[0].text : '';
    } catch (error) {
      console.error('Error generating proposal:', error);
      throw new Error('Failed to generate proposal');
    }
  }

  async calculateMatchScore(jobListing: JobListing, resumeData: ResumeData): Promise<number> {
    if (!this.client) {
      throw new Error('Claude API key not configured');
    }

    const prompt = `
      Analyze the job match between this job listing and resume. Return only a number between 0-100.

      Job Title: ${jobListing.title}
      Job Description: ${jobListing.description}
      Required Skills: ${jobListing.skills.join(', ')}

      Resume Skills: ${resumeData.skills.join(', ')}
      Experience: ${resumeData.experience.map(exp => `${exp.title} at ${exp.company}`).join(', ')}

      Calculate match score (0-100) based on:
      - Skill overlap
      - Experience relevance
      - Job requirements alignment

      Return only the numeric score.
    `;

    try {
      const response = await this.client.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 10,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      const scoreText = response.content[0].type === 'text' ? response.content[0].text : '0';
      return Math.min(100, Math.max(0, parseInt(scoreText.trim()) || 0));
    } catch (error) {
      console.error('Error calculating match score:', error);
      return 0;
    }
  }

  private buildProposalPrompt(
    jobListing: JobListing,
    resumeData: ResumeData,
    tone: string,
    customInstructions?: string
  ): string {
    return `
      Generate a compelling job application proposal based on the following information:

      JOB LISTING:
      Title: ${jobListing.title}
      Company: ${jobListing.company}
      Description: ${jobListing.description}
      Required Skills: ${jobListing.skills.join(', ')}
      Budget: ${jobListing.budget || 'Not specified'}

      APPLICANT RESUME:
      Name: ${resumeData.name}
      Skills: ${resumeData.skills.join(', ')}
      Experience: ${resumeData.experience.map(exp => 
        `${exp.title} at ${exp.company} (${exp.duration})`
      ).join(', ')}

      TONE: ${tone}
      ${customInstructions ? `CUSTOM INSTRUCTIONS: ${customInstructions}` : ''}

      Generate a personalized proposal that:
      1. Addresses the specific job requirements
      2. Highlights relevant experience and skills
      3. Shows enthusiasm for the role
      4. Includes a clear call to action
      5. Maintains the requested tone
      6. Is concise but compelling (200-400 words)

      Do not include placeholder text or generic statements. Make it specific to this job and applicant.
    `;
  }
}

export default new ClaudeService();