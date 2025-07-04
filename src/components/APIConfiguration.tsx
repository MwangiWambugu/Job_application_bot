import React, { useState } from 'react';
import { KeyIcon, CheckCircleIcon, XCircleIcon, ExternalLinkIcon } from 'lucide-react';

const APIConfiguration = () => {
  const [apiKeys, setApiKeys] = useState({
    claude: import.meta.env.VITE_CLAUDE_API_KEY || '',
    upworkClientId: import.meta.env.VITE_UPWORK_API_KEY || '',
    upworkAccessToken: import.meta.env.VITE_UPWORK_ACCESS_TOKEN || '',
    linkedinClientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID || '',
    linkedinAccessToken: import.meta.env.VITE_LINKEDIN_ACCESS_TOKEN || '',
    indeedPublisher: import.meta.env.VITE_INDEED_PUBLISHER_KEY || ''
  });

  const [testResults, setTestResults] = useState<Record<string, boolean | null>>({});
  const [isTestingConnection, setIsTestingConnection] = useState<Record<string, boolean>>({});

  const handleKeyChange = (key: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [key]: value }));
  };

  const testConnection = async (service: string) => {
    setIsTestingConnection(prev => ({ ...prev, [service]: true }));
    
    // Simulate API test - in production, make actual test calls
    setTimeout(() => {
      const isValid = apiKeys[service as keyof typeof apiKeys].length > 10;
      setTestResults(prev => ({ ...prev, [service]: isValid }));
      setIsTestingConnection(prev => ({ ...prev, [service]: false }));
    }, 2000);
  };

  const getAuthURL = (platform: string) => {
    switch (platform) {
      case 'upwork':
        return 'https://www.upwork.com/api/auth/v1/oauth/authorize';
      case 'linkedin':
        return 'https://www.linkedin.com/oauth/v2/authorization';
      default:
        return '#';
    }
  };

  const apiConfigs = [
    {
      name: 'Claude AI',
      key: 'claude',
      description: 'For generating proposals and calculating match scores',
      placeholder: 'sk-ant-api03-...',
      docsUrl: 'https://docs.anthropic.com/claude/reference/getting-started-with-the-api',
      requiresOAuth: false
    },
    {
      name: 'Upwork Client ID',
      key: 'upworkClientId',
      description: 'Upwork API client ID for job searching',
      placeholder: 'your-upwork-client-id',
      docsUrl: 'https://developers.upwork.com/',
      requiresOAuth: true
    },
    {
      name: 'Upwork Access Token',
      key: 'upworkAccessToken',
      description: 'OAuth access token for Upwork API',
      placeholder: 'oauth-access-token',
      docsUrl: 'https://developers.upwork.com/',
      requiresOAuth: true
    },
    {
      name: 'LinkedIn Client ID',
      key: 'linkedinClientId',
      description: 'LinkedIn API client ID for job searching',
      placeholder: 'your-linkedin-client-id',
      docsUrl: 'https://docs.microsoft.com/en-us/linkedin/',
      requiresOAuth: true
    },
    {
      name: 'LinkedIn Access Token',
      key: 'linkedinAccessToken',
      description: 'OAuth access token for LinkedIn API',
      placeholder: 'oauth-access-token',
      docsUrl: 'https://docs.microsoft.com/en-us/linkedin/',
      requiresOAuth: true
    },
    {
      name: 'Indeed Publisher Key',
      key: 'indeedPublisher',
      description: 'Indeed API publisher key for job searching',
      placeholder: 'your-indeed-publisher-key',
      docsUrl: 'https://opensource.indeedeng.io/api-documentation/',
      requiresOAuth: false
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">API Configuration</h2>
        <p className="text-slate-600">Configure API keys and authentication for job platforms</p>
      </div>

      {/* Environment Variables Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Environment Variables</h3>
        <p className="text-blue-700 mb-4">
          For security, API keys should be stored in environment variables. Create a <code className="bg-blue-100 px-2 py-1 rounded">.env</code> file in your project root:
        </p>
        <div className="bg-blue-100 p-4 rounded-lg font-mono text-sm text-blue-800">
          <div>VITE_CLAUDE_API_KEY=your_claude_api_key</div>
          <div>VITE_UPWORK_API_KEY=your_upwork_client_id</div>
          <div>VITE_UPWORK_ACCESS_TOKEN=your_upwork_access_token</div>
          <div>VITE_LINKEDIN_CLIENT_ID=your_linkedin_client_id</div>
          <div>VITE_LINKEDIN_ACCESS_TOKEN=your_linkedin_access_token</div>
          <div>VITE_INDEED_PUBLISHER_KEY=your_indeed_publisher_key</div>
        </div>
      </div>

      {/* API Configuration Cards */}
      <div className="space-y-6">
        {apiConfigs.map((config) => (
          <div key={config.key} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <KeyIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{config.name}</h3>
                    <p className="text-sm text-slate-600">{config.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {testResults[config.key] !== undefined && (
                    <div className="flex items-center space-x-1">
                      {testResults[config.key] ? (
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircleIcon className="w-5 h-5 text-red-500" />
                      )}
                      <span className={`text-sm ${testResults[config.key] ? 'text-green-600' : 'text-red-600'}`}>
                        {testResults[config.key] ? 'Connected' : 'Failed'}
                      </span>
                    </div>
                  )}
                  <a
                    href={config.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                    <span>Docs</span>
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex space-x-3">
                  <input
                    type="password"
                    value={apiKeys[config.key as keyof typeof apiKeys]}
                    onChange={(e) => handleKeyChange(config.key, e.target.value)}
                    placeholder={config.placeholder}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => testConnection(config.key)}
                    disabled={!apiKeys[config.key as keyof typeof apiKeys] || isTestingConnection[config.key]}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    {isTestingConnection[config.key] ? 'Testing...' : 'Test'}
                  </button>
                </div>

                {config.requiresOAuth && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-orange-800 text-sm mb-2">
                      This service requires OAuth authentication. You'll need to:
                    </p>
                    <ol className="text-orange-700 text-sm space-y-1 ml-4 list-decimal">
                      <li>Register your application with {config.name.split(' ')[0]}</li>
                      <li>Get your client ID and secret</li>
                      <li>Complete the OAuth flow to get an access token</li>
                    </ol>
                    <button
                      onClick={() => window.open(getAuthURL(config.key.split(/(?=[A-Z])/)[0]), '_blank')}
                      className="mt-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Start OAuth Flow
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save Configuration */}
      <div className="flex justify-end">
        <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-medium transition-colors">
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default APIConfiguration;