import React from 'react';
import { BotIcon, ZapIcon, TargetIcon, TrendingUpIcon, CheckCircleIcon } from 'lucide-react';

interface LandingProps {
  onLogin: () => void;
}

const Landing: React.FC<LandingProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <BotIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">AutoApply AI</h1>
          </div>
          
          <button
            onClick={onLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-800 mb-6">
            AI-Powered Job Applications
            <span className="block text-blue-500 mt-2">For Freelancers</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Let our AI agents automatically find, match, and apply to freelance opportunities 
            while you focus on what you do best. Smart resume matching, personalized proposals, 
            and real-time tracking.
          </p>
          <button
            onClick={onLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Start Auto-Applying Today
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200">
            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <TargetIcon className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Smart Job Matching</h3>
            <p className="text-slate-600">
              AI analyzes your resume and matches you with the most relevant opportunities based on skills, experience, and preferences.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200">
            <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <ZapIcon className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Auto-Generated Proposals</h3>
            <p className="text-slate-600">
              Personalized cover letters and proposals generated using advanced AI, tailored to each job posting and your unique profile.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200">
            <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <TrendingUpIcon className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Real-Time Analytics</h3>
            <p className="text-slate-600">
              Track your application success rate, response times, and optimize your job search strategy with detailed insights.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-500 mb-2">10,000+</div>
              <div className="text-slate-600">Jobs Applied</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-500 mb-2">85%</div>
              <div className="text-slate-600">Match Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">500+</div>
              <div className="text-slate-600">Happy Freelancers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-500 mb-2">24/7</div>
              <div className="text-slate-600">Auto-Apply Active</div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-slate-800 mb-8">Why Choose AutoApply AI?</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 text-left">
              <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-slate-700">Save 20+ hours per week on job searching</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-slate-700">Increase application volume by 300%</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-slate-700">Higher quality matches with AI scoring</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-slate-700">Personalized proposals for each opportunity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;