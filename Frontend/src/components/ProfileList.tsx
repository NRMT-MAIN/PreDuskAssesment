import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Plus, Briefcase, Mail } from 'lucide-react';
import { apiService } from '../services/api';
import type { Profile } from '../types/profile';

export function ProfileList() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllProfiles();
      setProfiles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profiles');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profiles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Me-API Playground Profiles</h1>
            <p className="mt-2 text-gray-600">Manage professional portfolios</p>
          </div>
          <Link
            to="/create"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Plus size={20} />
            Create Profile
          </Link>
        </div>

        {profiles.length === 0 ? (
          <div className="text-center py-12">
            <User size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No profiles yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first professional profile</p>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Create Your Profile
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <Link
                key={profile.id}
                to={`/profile/${profile.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-200 hover:border-blue-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{profile.name}</h3>
                {profile.title && (
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Briefcase size={16} />
                    <span className="text-sm">{profile.title}</span>
                  </div>
                )}
                {profile.email && (
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <Mail size={16} />
                    <span className="text-sm">{profile.email}</span>
                  </div>
                )}
                {profile.summary && (
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">{profile.summary}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {profile.skills?.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                    >
                      {skill.name}
                    </span>
                  ))}
                  {profile.skills && profile.skills.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                      +{profile.skills.length - 3} more
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
