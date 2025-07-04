import React, { useState } from 'react';
import { ToggleLeftIcon, ToggleRightIcon, BellIcon, DollarSignIcon, ClockIcon, FilterIcon } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    autoApply: true,
    notifications: true,
    emailUpdates: false,
    minBudget: 50,
    maxApplicationsPerDay: 10,
    preferredJobTypes: ['remote', 'full-time'],
    excludedKeywords: ['junior', 'intern'],
    requiredKeywords: ['react', 'typescript']
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSliderChange = (setting: keyof typeof settings, value: number) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleArrayChange = (setting: keyof typeof settings, value: string[]) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full flex items-center transition-colors ${
        enabled ? 'bg-blue-500' : 'bg-slate-300'
      }`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-0.5'
      }`} />
    </button>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Settings</h2>
        <p className="text-slate-600">Configure your AI agent preferences and application rules</p>
      </div>

      {/* General Settings */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">General Settings</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-800">Auto-Apply</h4>
              <p className="text-sm text-slate-600">Enable AI to automatically apply to matched jobs</p>
            </div>
            <ToggleSwitch 
              enabled={settings.autoApply} 
              onChange={() => handleToggle('autoApply')} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-800">Push Notifications</h4>
              <p className="text-sm text-slate-600">Get notified about new applications and responses</p>
            </div>
            <ToggleSwitch 
              enabled={settings.notifications} 
              onChange={() => handleToggle('notifications')} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-800">Email Updates</h4>
              <p className="text-sm text-slate-600">Receive daily email summaries of activity</p>
            </div>
            <ToggleSwitch 
              enabled={settings.emailUpdates} 
              onChange={() => handleToggle('emailUpdates')} 
            />
          </div>
        </div>
      </div>

      {/* Application Rules */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Application Rules</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <DollarSignIcon className="w-5 h-5 text-slate-600" />
              <h4 className="font-medium text-slate-800">Minimum Budget</h4>
            </div>
            <div className="space-y-2">
              <input
                type="range"
                min="20"
                max="200"
                value={settings.minBudget}
                onChange={(e) => handleSliderChange('minBudget', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-slate-600">
                <span>$20/hr</span>
                <span className="font-medium text-slate-800">${settings.minBudget}/hr</span>
                <span>$200/hr</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <ClockIcon className="w-5 h-5 text-slate-600" />
              <h4 className="font-medium text-slate-800">Max Applications Per Day</h4>
            </div>
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="50"
                value={settings.maxApplicationsPerDay}
                onChange={(e) => handleSliderChange('maxApplicationsPerDay', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-slate-600">
                <span>1</span>
                <span className="font-medium text-slate-800">{settings.maxApplicationsPerDay} applications</span>
                <span>50</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-slate-800 mb-3">Preferred Job Types</h4>
            <div className="flex flex-wrap gap-2">
              {['remote', 'full-time', 'part-time', 'contract', 'freelance'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    const newTypes = settings.preferredJobTypes.includes(type)
                      ? settings.preferredJobTypes.filter(t => t !== type)
                      : [...settings.preferredJobTypes, type];
                    handleArrayChange('preferredJobTypes', newTypes);
                  }}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    settings.preferredJobTypes.includes(type)
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Keyword Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <FilterIcon className="w-5 h-5 text-slate-600" />
            <h3 className="text-lg font-semibold text-slate-800">Keyword Filters</h3>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h4 className="font-medium text-slate-800 mb-3">Required Keywords</h4>
            <p className="text-sm text-slate-600 mb-3">Jobs must contain these keywords to be considered</p>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {settings.requiredKeywords.map((keyword, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add required keyword..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const value = e.currentTarget.value.trim();
                    if (value && !settings.requiredKeywords.includes(value)) {
                      handleArrayChange('requiredKeywords', [...settings.requiredKeywords, value]);
                      e.currentTarget.value = '';
                    }
                  }
                }}
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-slate-800 mb-3">Excluded Keywords</h4>
            <p className="text-sm text-slate-600 mb-3">Jobs with these keywords will be automatically rejected</p>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {settings.excludedKeywords.map((keyword, index) => (
                  <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add excluded keyword..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const value = e.currentTarget.value.trim();
                    if (value && !settings.excludedKeywords.includes(value)) {
                      handleArrayChange('excludedKeywords', [...settings.excludedKeywords, value]);
                      e.currentTarget.value = '';
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-medium transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;