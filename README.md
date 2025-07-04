# AutoApply AI - Freelance Job Application Tool

[AutoApply AI](https://curious-sfogliatella-3e9c6b.netlify.app/) <br>
[Pitch Deck](https://docs.google.com/presentation/d/1byy3u1vafGo2hfsZPdNe0XTrQBhBba38dFxx7szkXeY/edit?usp=sharing)

An AI-powered application that automatically finds, matches, and applies to freelance opportunities across multiple platforms including Upwork, LinkedIn, and Indeed.

## Features

- **AI-Powered Job Matching**: Smart resume analysis and job matching using Claude AI
- **Multi-Platform Support**: Search and apply to jobs on Upwork, LinkedIn, and Indeed
- **Automated Proposals**: AI-generated personalized cover letters and proposals
- **Real-Time Analytics**: Track application success rates and optimize your job search
- **User Authentication**: Secure login and user profile management with Supabase
- **Resume Upload & Parsing**: AI-powered resume analysis and data extraction

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Authentication, Database, Storage)
- **AI**: Claude AI (Anthropic) for proposal generation and job matching
- **APIs**: Upwork, LinkedIn, Indeed job search APIs
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Claude AI API key
- API keys for job platforms (Upwork, LinkedIn, Indeed)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd autoapply-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Fill in your API keys and configuration in the `.env` file:
- Supabase project URL and anon key
- Claude AI API key
- Job platform API credentials

4. Set up Supabase database:
- Create a new Supabase project
- The database schema includes tables for user profiles and job applications
- Enable Row Level Security (RLS) for data protection

5. Start the development server:
```bash
npm run dev
```

## Database Schema

The application uses the following main tables:

### user_profiles
- User profile information including resume data, preferences, and API keys
- Linked to Supabase auth users

### job_applications
- Track all job applications with status, match scores, and platform information
- Includes job details, proposals, and application timestamps

## API Integration

### Supported Platforms
- **Upwork**: Job search and application submission
- **LinkedIn**: Job discovery and application tracking
- **Indeed**: Job search and listing aggregation

### AI Features
- **Claude AI**: Proposal generation and job match scoring
- **Resume Parsing**: Extract skills, experience, and education from uploaded resumes
- **Smart Matching**: Calculate compatibility scores between jobs and user profiles

## Security

- User authentication handled by Supabase Auth
- Row Level Security (RLS) ensures users can only access their own data
- API keys stored securely in user profiles with encryption
- Environment variables for sensitive configuration

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── services/           # API services and integrations
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
