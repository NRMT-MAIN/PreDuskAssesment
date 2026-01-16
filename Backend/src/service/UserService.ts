import { inject, injectable } from "tsyringe";
import { IUserService } from "./IUserService";
import { User } from "../db/models/User";
import { IUserRepository } from "../repository/IUserRepository";

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject("IUserRepository") private userRepo: IUserRepository
    ) {  }
    async createUserProfile(data: any): Promise<User> {
        return this.userRepo.createUser(data);
    }
    async getUserProfileById(id: number): Promise<User | null> {
        return this.userRepo.getUserById(id);
    }   

    async updateUserProfile(id: number, data: any): Promise<void> {
        return this.userRepo.updateUser(id, data);
    }
    async getAllUserProfiles(limit: number, offset: number): Promise<User[]> {
        return this.userRepo.getAllProfiles(limit, offset);
    }

    async addUserSkill(id: number, newSkill: string): Promise<void> {
        return this.userRepo.addSkill(id, newSkill);
    }
    async updateUserWorkHistory(userId: number, workData: any[]): Promise<void> {
        return this.userRepo.updateWorkHistory(userId, workData);
    }
    async updateUserEducation(userId: number, educationData: any[]): Promise<void> {
        return this.userRepo.updateEducation(userId, educationData);
    }
    async addUserProject(userId: number, projectData: any): Promise<any> {
        return this.userRepo.addProject(userId, projectData);
    }
    async deleteUserProfile(id: number): Promise<number> {
        return this.userRepo.deleteProfile(id);
    }
}