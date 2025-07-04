import React, { useState, useEffect } from 'react';
import { SearchIcon, StarIcon, MapPinIcon, DollarSignIcon, ClockIcon, ExternalLinkIcon, RefreshCwIcon } from 'lucide-react';
import { JobListing, JobSearchFilters } from '../types/api';
import jobAggregatorService from '../services/jobAggregatorService';
import claudeService from '../services/claudeService';

const JobMatching = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApplying, setIsApplying] = useState<Record<string, boolean>>({});

  // Mock resume data - in production, this would come from the uploaded resume
  const resumeData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'],
    experience: [
      { title: 'Senior Frontend Developer', company: 'TechCorp', duration: '2022 - Present' },
      { title: 'Frontend Developer', company: 'StartupXYZ', duration: '2020 - 2022' }
    ],
    education: [
      { degree: 'Master of Science in Computer Science', school: 'Tech University', year: '2018' }
    ]
  };

  const searchJobs = async () => {
    setIsLoading(true);
    try {
      const filters: JobSearchFilters = {
        keywords: searchTerm ? [searchTerm] : ['React', 'Frontend', 'JavaScript'],
        location: selectedFilters.includes('Remote') ? 'Remote' : undefined,
        jobType: selectedFilters.includes('Full-time') ? 'fulltime' : undefined
      };

      const allJobs = await jobAggregatorService.searchAllPlatforms(filters);
      const jobsWithScores = await jobAggregatorService.calculateMatchScores(allJobs, resumeData);
      setJobs(jobsWithScores);
    } catch (error) {
      console.error('Error searching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = async (job: JobListing) => {
    setIsApplying(prev => ({ ...prev, [job.id]: true }));
    
    try {
      // Generate proposal using Claude
      const proposal = await claudeService.generateProposal({
        jobListing: job,
        resumeData,
        tone: 'professional'
      });

      // Apply to the job
      const result = await jobAggregatorService.applyToJob(job, proposal);
      
      if (result.success) {
        // Update job status to applied
        setJobs(prev => prev.map(j => 
          j.id === job.id ? { ...j, applied: true } : j
        ));
        alert('Application submitted successfully!');
      } else {
        alert(`Failed to apply: ${result.error}`);
      }
    } catch (error) {
      console.error('Error applying to job:', error);
      alert('Failed to generate proposal or submit application');
    } finally {
      setIsApplying(prev => ({ ...prev, [job.id]: false }));
    }
  };

  useEffect(() => {
    searchJobs();
  }, []);

  const filters = ['Remote', 'Full-time', 'Part-time', 'High Budget', 'New Posting'];

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'upwork': return 'bg-green-100 text-green-800';
      case 'linkedin': return 'bg-blue-100 text-blue-800';
      case 'indeed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Job Matching</h2>
        <p className="text-slate-600">AI-powered job recommendations from multiple platforms</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button 
            onClick={searchJobs}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <RefreshCwIcon className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Searching...' : 'Search'}</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setSelectedFilters(prev => 
                  prev.includes(filter) 
                    ? prev.filter(f => f !== filter)
                    : [...prev, filter]
                );
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedFilters.includes(filter)
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {jobs.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-slate-600">No jobs found. Try adjusting your search criteria.</p>
          </div>
        )}

        {jobs.map((job) => (
          <div key={job.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-slate-800">{job.title}</h3>
                  {job.matchScore && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(job.matchScore)}`}>
                      {job.matchScore}% Match
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(job.platform)}`}>
                    {job.platform.charAt(0).toUpperCase() + job.platform.slice(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                  <span className="font-medium">{job.company}</span>
                  <div className="flex items-center space-x-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  {job.budget && (
                    <div className="flex items-center space-x-1">
                      <DollarSignIcon className="w-4 h-4" />
                      <span>{job.budget}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{new Date(job.postedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-slate-700 mb-4 line-clamp-3">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2 ml-6">
                {job.matchScore && (
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-slate-600">{job.matchScore}%</span>
                  </div>
                )}
                {(job as any).applied ? (
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                    Applied
                  </span>
                ) : (
                  <button
                    onClick={() => handleApply(job)}
                    disabled={isApplying[job.id]}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    {isApplying[job.id] ? 'Applying...' : 'Apply Now'}
                  </button>
                )}
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-slate-600 hover:text-blue-600 text-sm"
                >
                  <ExternalLinkIcon className="w-4 h-4" />
                  <span>View Details</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">AI Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-slate-700">
              Found {jobs.length} jobs across {new Set(jobs.map(j => j.platform)).size} platforms
            </span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-slate-700">
              {jobs.filter(j => (j.matchScore || 0) >= 80).length} high-match opportunities available
            </span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-slate-700">
              Consider updating your skills to match trending requirements
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMatching;