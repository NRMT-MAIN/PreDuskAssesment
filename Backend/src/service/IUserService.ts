import { User } from "../db/models/User";


export interface IUserService {
    createUserProfile(data: any): Promise<User>;
    getUserProfileById(id: number): Promise<User | null>;
    updateUserProfile(id: number, data: any): Promise<void>;
    getAllUserProfiles(limit: number, offset: number): Promise<User[]>;
    addUserSkill(id: number, newSkill: string): Promise<void>;
    updateUserWorkHistory(userId: number, workData: any[]): Promise<void>;
    updateUserEducation(userId: number, educationData: any[]): Promise<void>;
    addUserProject(userId: number, projectData: any): Promise<any>;
    deleteUserProfile(id: number): Promise<number>;
}