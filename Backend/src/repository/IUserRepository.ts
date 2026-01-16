import { Project } from '../db/models/Project';
import { User } from '../db/models/User';

export interface IUserRepository {
  createUser(data: any): Promise<User>;
  getUserById(id: number): Promise<User | null>;
  updateUser(id: number, data: any): Promise<void>;
  getAllProfiles(limit: number, offset: number): Promise<User[]>;
  addSkill(id: number, newSkill: string): Promise<void>;
  updateWorkHistory(userId: number, workData: any[]): Promise<void>;
  updateEducation(userId: number, educationData: any[]): Promise<void>;
  addProject(userId: number, projectData: any): Promise<Project>;
  deleteProfile(id: number): Promise<number>;
}