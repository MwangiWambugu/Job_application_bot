import React, { useState } from 'react';
import { SearchIcon, StarIcon, MapPinIcon, DollarSignIcon, ClockIcon, ExternalLinkIcon } from 'lucide-react';

const JobMatching = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const jobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp',
      location: 'Remote',
      budget: '$80-120/hr',
      matchScore: 95,
      description: 'Looking for an experienced React developer to build modern web applications...',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      postedAt: '2 hours ago',
      applied: false
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      budget: '$70-100/hr',
      matchScore: 92,
      description: 'We need a full stack developer to work on our SaaS platform...',
      skills: ['React', 'Python', 'PostgreSQL', 'Docker'],
      postedAt: '4 hours ago',
      applied: true
    },
    {
      id: 3,
      title: 'Frontend Engineer',
      company: 'InnovateInc',
      location: 'San Francisco, CA',
      budget: '$90-130/hr',
      matchScore: 88,
      description: 'Join our team to create beautiful user interfaces and experiences...',
      skills: ['React', 'Vue.js', 'CSS', 'Figma'],
      postedAt: '6 hours ago',
      applied: false
    },
    {
      id: 4,
      title: 'JavaScript Developer',
      company: 'DevStudio',
      location: 'Remote',
      budget: '$60-90/hr',
      matchScore: 85,
      description: 'Seeking a JavaScript developer for various web development projects...',
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
      postedAt: '8 hours ago',
      applied: true
    },
    {
      id: 5,
      title: 'UI/UX Developer',
      company: 'DesignLab',
      location: 'Los Angeles, CA',
      budget: '$75-110/hr',
      matchScore: 78,
      description: 'Looking for a developer who can bridge design and development...',
      skills: ['React', 'CSS', 'Figma', 'Animation'],
      postedAt: '12 hours ago',
      applied: false
    }
  ];

  const filters = ['Remote', 'Full-time', 'Part-time', 'High Budget', 'New Posting'];

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const handleApply = (jobId: number) => {
    // In a real app, this would trigger the AI to generate and submit an application
    console.log(`Applying to job ${jobId}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Job Matching</h2>
        <p className="text-slate-600">AI-powered job recommendations based on your profile</p>
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
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Search
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
        {jobs.map((job) => (
          <div key={job.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-slate-800">{job.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(job.matchScore)}`}>
                    {job.matchScore}% Match
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                  <span className="font-medium">{job.company}</span>
                  <div className="flex items-center space-x-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSignIcon className="w-4 h-4" />
                    <span>{job.budget}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{job.postedAt}</span>
                  </div>
                </div>
                <p className="text-slate-700 mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-slate-600">{job.matchScore}%</span>
                </div>
                {job.applied ? (
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                    Applied
                  </span>
                ) : (
                  <button
                    onClick={() => handleApply(job.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Apply Now
                  </button>
                )}
                <button className="flex items-center space-x-1 text-slate-600 hover:text-blue-600 text-sm">
                  <ExternalLinkIcon className="w-4 h-4" />
                  <span>View Details</span>
                </button>
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
              Consider improving your React skills - 85% of matched jobs require advanced React knowledge
            </span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-slate-700">
              Your TypeScript experience is highly valued - matches increased 23% this week
            </span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-slate-700">
              Remote positions show 40% higher response rates for your profile
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMatching;