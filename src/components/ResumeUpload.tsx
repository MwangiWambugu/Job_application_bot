import React, { useState } from 'react';
import { UploadIcon, FileTextIcon, CheckCircleIcon, UserIcon, BriefcaseIcon, GraduationCapIcon } from 'lucide-react';

const ResumeUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setUploadedFile(file);
      simulateProcessing();
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      simulateProcessing();
    }
  };

  const simulateProcessing = () => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setExtractedData({
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'],
        experience: [
          { title: 'Senior Frontend Developer', company: 'TechCorp', duration: '2022 - Present' },
          { title: 'Frontend Developer', company: 'StartupXYZ', duration: '2020 - 2022' },
          { title: 'Junior Developer', company: 'DevStudio', duration: '2018 - 2020' }
        ],
        education: [
          { degree: 'Master of Science in Computer Science', school: 'Tech University', year: '2018' },
          { degree: 'Bachelor of Science in Software Engineering', school: 'State College', year: '2016' }
        ]
      });
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Resume Upload</h2>
        <p className="text-slate-600">Upload your resume to enable AI-powered job matching</p>
      </div>

      {/* Upload Area */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 p-8">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
            isDragging 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/50'
          }`}
        >
          {uploadedFile ? (
            <div className="space-y-4">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-800">{uploadedFile.name}</h3>
                <p className="text-sm text-slate-600">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              {isProcessing && (
                <div className="space-y-2">
                  <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-sm text-blue-600">Processing resume with AI...</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <UploadIcon className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">Upload Your Resume</h3>
                <p className="text-slate-600 mb-4">
                  Drag and drop your resume here, or click to browse
                </p>
                <label className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium cursor-pointer inline-block transition-colors">
                  Choose File
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-slate-500">
                Supported formats: PDF, DOCX (Max 5MB)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Extracted Data */}
      {extractedData && (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800">Extracted Information</h3>
            <p className="text-sm text-slate-600">AI-parsed data from your resume</p>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Personal Info */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <UserIcon className="w-5 h-5 text-slate-600" />
                <h4 className="font-medium text-slate-800">Personal Information</h4>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-slate-600">Name:</span>
                  <span className="ml-2 text-slate-800">{extractedData.name}</span>
                </div>
                <div>
                  <span className="text-slate-600">Email:</span>
                  <span className="ml-2 text-slate-800">{extractedData.email}</span>
                </div>
                <div>
                  <span className="text-slate-600">Phone:</span>
                  <span className="ml-2 text-slate-800">{extractedData.phone}</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="font-medium text-slate-800 mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {extractedData.skills.map((skill: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <BriefcaseIcon className="w-5 h-5 text-slate-600" />
                <h4 className="font-medium text-slate-800">Experience</h4>
              </div>
              <div className="space-y-3">
                {extractedData.experience.map((exp: any, index: number) => (
                  <div key={index} className="border-l-2 border-blue-200 pl-4">
                    <h5 className="font-medium text-slate-800">{exp.title}</h5>
                    <p className="text-sm text-slate-600">{exp.company} • {exp.duration}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <GraduationCapIcon className="w-5 h-5 text-slate-600" />
                <h4 className="font-medium text-slate-800">Education</h4>
              </div>
              <div className="space-y-3">
                {extractedData.education.map((edu: any, index: number) => (
                  <div key={index} className="border-l-2 border-green-200 pl-4">
                    <h5 className="font-medium text-slate-800">{edu.degree}</h5>
                    <p className="text-sm text-slate-600">{edu.school} • {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;