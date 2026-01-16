import type { Profile, Skill, Education, WorkHistory, Project } from '../types/profile';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

class ApiService {
  async createProfile(profile: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  }

  async getAllProfiles(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  }

  async getProfile(id: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  }

  async updateProfile(id: string, profile: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  }

  async deleteProfile(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
  }

  async addSkill(id: string, skill: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/users/${id}/skills`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skill }),
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  }

  async updateEducation(id: string, education: any[]): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/users/${id}/education`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(education),
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  }

  async updateWorkHistory(id: string, workHistory: any[]): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/users/${id}/work-history`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workHistory),
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  }

  async addProject(id: string, project: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/users/${id}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  }
}

export const apiService = new ApiService();
