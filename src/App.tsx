import React, { useState } from 'react';
import { BotIcon, TrendingUpIcon, TargetIcon, SettingsIcon, FileTextIcon, SearchIcon, KeyIcon } from 'lucide-react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ResumeUpload from './components/ResumeUpload';
import JobMatching from './components/JobMatching';
import Settings from './components/Settings';
import APIConfiguration from './components/APIConfiguration';
import Landing from './components/Landing';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState<any>(null);

  const handleLogin = () => {
    setUser({ name: 'John Doe', email: 'john@example.com' });
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  if (!user) {
    return <Landing onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header user={user} onLogout={handleLogout} />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-slate-200 min-h-screen shadow-lg">
          <nav className="p-6 space-y-2">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                currentView === 'dashboard' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'hover:bg-blue-50 text-slate-600 hover:text-blue-600'
              }`}
            >
              <TrendingUpIcon className="w-5 h-5 mr-3" />
              Dashboard
            </button>
            
            <button
              onClick={() => setCurrentView('resume')}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                currentView === 'resume' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'hover:bg-blue-50 text-slate-600 hover:text-blue-600'
              }`}
            >
              <FileTextIcon className="w-5 h-5 mr-3" />
              Resume
            </button>
            
            <button
              onClick={() => setCurrentView('jobs')}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                currentView === 'jobs' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'hover:bg-blue-50 text-slate-600 hover:text-blue-600'
              }`}
            >
              <SearchIcon className="w-5 h-5 mr-3" />
              Job Matching
            </button>

            <button
              onClick={() => setCurrentView('api')}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                currentView === 'api' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'hover:bg-blue-50 text-slate-600 hover:text-blue-600'
              }`}
            >
              <KeyIcon className="w-5 h-5 mr-3" />
              API Setup
            </button>
            
            <button
              onClick={() => setCurrentView('settings')}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                currentView === 'settings' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'hover:bg-blue-50 text-slate-600 hover:text-blue-600'
              }`}
            >
              <SettingsIcon className="w-5 h-5 mr-3" />
              Settings
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'resume' && <ResumeUpload />}
          {currentView === 'jobs' && <JobMatching />}
          {currentView === 'api' && <APIConfiguration />}
          {currentView === 'settings' && <Settings />}
        </div>
      </div>
    </div>
  );
}

export default App;