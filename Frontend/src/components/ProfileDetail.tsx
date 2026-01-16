import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Briefcase,
  GraduationCap,
  Code,
  FolderGit2,
} from 'lucide-react';
import { apiService } from '../services/api';
import type { Profile } from '../types/profile';

export function ProfileDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadProfile(id);
    }
  }, [id]);

  const loadProfile = async (profileId: string) => {
    try {
      setLoading(true);
      const data = await apiService.getProfile(profileId);
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !confirm('Are you sure you want to delete this profile?')) return;

    try {
      await apiService.deleteProfile(id);
      navigate('/');
    } catch (err) {
      alert('Failed to delete profile');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p>Error: {error || 'Profile not found'}</p>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to profiles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Profiles
            </Link>
            <div className="flex gap-3">
              <Link
                to={`/edit/${id}`}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Edit size={18} />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-blue-600 text-4xl font-bold shadow-lg">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
                {profile.title && <p className="text-xl text-blue-100">{profile.title}</p>}
              </div>
            </div>
          </div>

          <div className="px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {profile.email && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail size={20} className="text-gray-400" />
                  <a href={`mailto:${profile.email}`} className="hover:text-blue-600">
                    {profile.email}
                  </a>
                </div>
              )}
              {profile.phone && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone size={20} className="text-gray-400" />
                  <a href={`tel:${profile.phone}`} className="hover:text-blue-600">
                    {profile.phone}
                  </a>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin size={20} className="text-gray-400" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Globe size={20} className="text-gray-400" />
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    {profile.website}
                  </a>
                </div>
              )}
              {profile.linkedin && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Linkedin size={20} className="text-gray-400" />
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              )}
              {profile.github && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Github size={20} className="text-gray-400" />
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    GitHub Profile
                  </a>
                </div>
              )}
            </div>

            {profile.summary && (
              <div className="mb-8 pb-8 border-b">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed">{profile.summary}</p>
              </div>
            )}

            {profile.skills && profile.skills.length > 0 && (
              <div className="mb-8 pb-8 border-b">
                <div className="flex items-center gap-2 mb-4">
                  <Code size={24} className="text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium border border-blue-200"
                    >
                      {skill.name}
                      {skill.level && <span className="text-blue-500 ml-2">• {skill.level}</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.workHistory && profile.workHistory.length > 0 && (
              <div className="mb-8 pb-8 border-b">
                <div className="flex items-center gap-2 mb-6">
                  <Briefcase size={24} className="text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
                </div>
                <div className="space-y-6">
                  {profile.workHistory.map((work, index) => (
                    <div key={index} className="relative pl-6 border-l-2 border-blue-200">
                      <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7px] top-1"></div>
                      <h3 className="text-xl font-semibold text-gray-900">{work.position}</h3>
                      <p className="text-blue-600 font-medium mb-2">{work.company}</p>
                      <p className="text-sm text-gray-500 mb-2">
                        {work.startDate} - {work.endDate || 'Present'}
                      </p>
                      {work.description && <p className="text-gray-700">{work.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {profile.education && profile.education.length > 0 && (
              <div className="mb-8 pb-8 border-b">
                <div className="flex items-center gap-2 mb-6">
                  <GraduationCap size={24} className="text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Education</h2>
                </div>
                <div className="space-y-6">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="relative pl-6 border-l-2 border-blue-200">
                      <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7px] top-1"></div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-blue-600 font-medium mb-2">{edu.institution}</p>
                      <p className="text-sm text-gray-500 mb-2">
                        {edu.startDate} - {edu.endDate || 'Present'}
                      </p>
                      {edu.description && <p className="text-gray-700">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {profile.projects && profile.projects.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <FolderGit2 size={24} className="text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.projects.map((project, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-700 text-sm mb-3">{project.description}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm font-medium"
                        >
                          View Project →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
