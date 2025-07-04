import React, { useState, useEffect } from 'react';
import { BotIcon, TrendingUpIcon, TargetIcon, SettingsIcon, FileTextIcon, SearchIcon, KeyIcon } from 'lucide-react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ResumeUpload from './components/ResumeUpload';
import JobMatching from './components/JobMatching';
import Settings from './components/Settings';
import APIConfiguration from './components/APIConfiguration';
import Landing from './components/Landing';
import AuthPage from './components/AuthPage';
import { useAuth } from './hooks/useAuth';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [showLanding, setShowLanding] = useState(false);
  const { user, loading, signOut } = useAuth();

  // Show landing page for non-authenticated users who haven't seen it
  useEffect(() => {
    if (!user && !loading) {
      const hasSeenLanding = localStorage.getItem('hasSeenLanding');
      if (!hasSeenLanding) {
        setShowLanding(true);
      }
    }
  }, [user, loading]);

  const handleLandingLogin = () => {
    localStorage.setItem('hasSeenLanding', 'true');
    setShowLanding(false);
  };

  const handleAuthSuccess = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = async () => {
    await signOut();
    setCurrentView('dashboard');
    setShowLanding(false);
    localStorage.removeItem('hasSeenLanding');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <BotIcon className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show landing page for first-time visitors
  if (!user && showLanding) {
    return <Landing onLogin={handleLandingLogin} />;
  }

  // Show auth page for non-authenticated users
  if (!user) {
    return <AuthPage onSuccess={handleAuthSuccess} />;
  }

  // Main application for authenticated users
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