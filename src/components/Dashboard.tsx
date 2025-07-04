import React from 'react';
import { TrendingUpIcon, TrendingDownIcon, ClockIcon, CheckCircleIcon, XCircleIcon, EyeIcon } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Applications Sent', value: '247', change: '+23', changeType: 'increase' },
    { title: 'Response Rate', value: '18%', change: '+2.3%', changeType: 'increase' },
    { title: 'Active Jobs', value: '15', change: '-3', changeType: 'decrease' },
    { title: 'Avg. Match Score', value: '87%', change: '+1.2%', changeType: 'increase' },
  ];

  const recentApplications = [
    { id: 1, title: 'React Developer for E-commerce Platform', company: 'TechCorp', status: 'Applied', matchScore: 95, appliedAt: '2 hours ago' },
    { id: 2, title: 'Frontend Engineer - SaaS Dashboard', company: 'StartupXYZ', status: 'Viewed', matchScore: 92, appliedAt: '4 hours ago' },
    { id: 3, title: 'Full Stack Developer', company: 'InnovateInc', status: 'Responded', matchScore: 88, appliedAt: '6 hours ago' },
    { id: 4, title: 'JavaScript Developer', company: 'DevStudio', status: 'Applied', matchScore: 85, appliedAt: '8 hours ago' },
    { id: 5, title: 'UI/UX Developer', company: 'DesignLab', status: 'Rejected', matchScore: 78, appliedAt: '12 hours ago' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Applied': return <ClockIcon className="w-4 h-4 text-blue-500" />;
      case 'Viewed': return <EyeIcon className="w-4 h-4 text-orange-500" />;
      case 'Responded': return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case 'Rejected': return <XCircleIcon className="w-4 h-4 text-red-500" />;
      default: return <ClockIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-800';
      case 'Viewed': return 'bg-orange-100 text-orange-800';
      case 'Responded': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Dashboard</h2>
        <p className="text-slate-600">Overview of your AI-powered job application activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changeType === 'increase' ? (
                  <TrendingUpIcon className="w-4 h-4" />
                ) : (
                  <TrendingDownIcon className="w-4 h-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Recent Applications</h3>
          <p className="text-sm text-slate-600">Latest jobs applied to by your AI agent</p>
        </div>
        <div className="divide-y divide-slate-200">
          {recentApplications.map((app) => (
            <div key={app.id} className="p-6 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800 mb-1">{app.title}</h4>
                  <p className="text-sm text-slate-600">{app.company}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-800">Match Score</div>
                    <div className="text-sm text-slate-600">{app.matchScore}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-600">{app.appliedAt}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(app.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Activity Status */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">AI Agent Status</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">Active</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-500 mb-1">12</div>
            <div className="text-sm text-slate-600">Jobs Scanned Today</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-emerald-500 mb-1">3</div>
            <div className="text-sm text-slate-600">Applications Sent</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-orange-500 mb-1">8</div>
            <div className="text-sm text-slate-600">Proposals Generated</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;