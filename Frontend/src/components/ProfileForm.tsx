import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { apiService } from '../services/api';
import type { Profile, Skill, Education, WorkHistory, Project } from '../types/profile';

export function ProfileForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>({
    name: '',
    email: '',
    phone: '',
    title: '',
    summary: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    skills: [],
    education: [],
    workHistory: [],
    projects: [],
  });

  const [newSkill, setNewSkill] = useState({ name: '', level: '' });
  const [newEducation, setNewEducation] = useState<Education>({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [newWork, setNewWork] = useState<WorkHistory>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    current: false,
  });
  const [newProject, setNewProject] = useState<Project>({
    title: '',
    description: '',
    technologies: [],
    url: '',
  });

  useEffect(() => {
    if (isEdit && id) {
      loadProfile(id);
    }
  }, [id, isEdit]);

  const loadProfile = async (profileId: string) => {
    try {
      setLoading(true);
      const data = await apiService.getProfile(profileId);
      setFormData(data);
    } catch (err) {
      alert('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit && id) {
        await apiService.updateProfile(id, formData);
      } else {
        await apiService.createProfile(formData);
      }
      navigate('/');
    } catch (err) {
      alert(`Failed to ${isEdit ? 'update' : 'create'} profile`);
    } finally {
      setLoading(false);
    }
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      setFormData({
        ...formData,
        skills: [...(formData.skills || []), { ...newSkill }],
      });
      setNewSkill({ name: '', level: '' });
    }
  };

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills?.filter((_, i) => i !== index),
    });
  };

  const addEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      setFormData({
        ...formData,
        education: [...(formData.education || []), { ...newEducation }],
      });
      setNewEducation({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    }
  };

  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education?.filter((_, i) => i !== index),
    });
  };

  const addWork = () => {
    if (newWork.company && newWork.position) {
      setFormData({
        ...formData,
        workHistory: [...(formData.workHistory || []), { ...newWork }],
      });
      setNewWork({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false,
      });
    }
  };

  const removeWork = (index: number) => {
    setFormData({
      ...formData,
      workHistory: formData.workHistory?.filter((_, i) => i !== index),
    });
  };

  const addProject = () => {
    if (newProject.title && newProject.description) {
      setFormData({
        ...formData,
        projects: [...(formData.projects || []), { ...newProject }],
      });
      setNewProject({
        title: '',
        description: '',
        technologies: [],
        url: '',
      });
    }
  };

  const removeProject = (index: number) => {
    setFormData({
      ...formData,
      projects: formData.projects?.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Profiles
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {isEdit ? 'Edit Profile' : 'Create New Profile'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Summary
                </label>
                <textarea
                  rows={4}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Skills</h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Skill name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Level (optional)"
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                  className="w-40 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg flex items-center gap-2 border border-blue-200"
                  >
                    {skill.name}
                    {skill.level && <span className="text-blue-500">• {skill.level}</span>}
                    <button type="button" onClick={() => removeSkill(index)}>
                      <X size={16} className="text-blue-400 hover:text-blue-600" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Work History</h2>
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Company"
                    value={newWork.company}
                    onChange={(e) => setNewWork({ ...newWork, company: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={newWork.position}
                    onChange={(e) => setNewWork({ ...newWork, position: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Start Date (e.g., Jan 2020)"
                    value={newWork.startDate}
                    onChange={(e) => setNewWork({ ...newWork, startDate: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="End Date (leave empty if current)"
                    value={newWork.endDate}
                    onChange={(e) => setNewWork({ ...newWork, endDate: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Description"
                  value={newWork.description}
                  onChange={(e) => setNewWork({ ...newWork, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addWork}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add Work Experience
                </button>
              </div>
              <div className="space-y-3">
                {formData.workHistory?.map((work, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
                    <button
                      type="button"
                      onClick={() => removeWork(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                    <h3 className="font-semibold text-gray-900">{work.position}</h3>
                    <p className="text-blue-600">{work.company}</p>
                    <p className="text-sm text-gray-500">
                      {work.startDate} - {work.endDate || 'Present'}
                    </p>
                    {work.description && <p className="text-sm text-gray-700 mt-2">{work.description}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Education</h2>
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Institution"
                    value={newEducation.institution}
                    onChange={(e) =>
                      setNewEducation({ ...newEducation, institution: e.target.value })
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={newEducation.degree}
                    onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={newEducation.field}
                    onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Start Date"
                    value={newEducation.startDate}
                    onChange={(e) =>
                      setNewEducation({ ...newEducation, startDate: e.target.value })
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    value={newEducation.endDate}
                    onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="button"
                  onClick={addEducation}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add Education
                </button>
              </div>
              <div className="space-y-3">
                {formData.education?.map((edu, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-blue-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Projects</h2>
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  rows={2}
                  placeholder="Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="url"
                  placeholder="Project URL (optional)"
                  value={newProject.url}
                  onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addProject}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add Project
                </button>
              </div>
              <div className="space-y-3">
                {formData.projects?.map((project, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                    <h3 className="font-semibold text-gray-900">{project.title}</h3>
                    <p className="text-sm text-gray-700">{project.description}</p>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {project.url}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                {loading ? 'Saving...' : isEdit ? 'Update Profile' : 'Create Profile'}
              </button>
              <Link
                to="/"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
