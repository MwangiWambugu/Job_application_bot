import React from 'react';
import { BotIcon, LogOutIcon, UserIcon } from 'lucide-react';

interface HeaderProps {
  user: any;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 px-8 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <BotIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-800">AutoApply AI</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="bg-slate-100 p-2 rounded-full">
              <UserIcon className="w-4 h-4 text-slate-600" />
            </div>
            <span className="text-slate-700 font-medium">{user.name}</span>
          </div>
          
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOutIcon className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;