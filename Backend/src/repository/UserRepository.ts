import { th } from "zod/locales";
import { Project } from "../db/models/Project";
import { User } from "../db/models/User";
import { IUserRepository } from "./IUserRepository";
import { Work } from "../db/models/Work";
import { Education } from "../db/models/Education";


export class UserRepository implements IUserRepository {
    async addProject(userId: number, projectData: any): Promise<Project> {
        return await Project.create({ ...projectData, userId });
    }

    async addSkill(id: number, newSkill: string): Promise<void> {
        const user = await User.findByPk(id);
        if (user) {
            const skills = user.skills || [];
            if (!skills.includes(newSkill)) {
                await user.update({ skills: [...skills, newSkill] });
            }
        }
    }

    async createUser(data: any): Promise<User> {
        return await User.create(data, {
            include: [Project, Work, Education]
        });
    }

    async deleteProfile(id: number): Promise<number> {
        return await User.destroy({ where: { id } });
    }

    async getAllProfiles(limit: number, offset: number): Promise<User[]> {
        return User.findAll({
            limit,
            offset, 
            include: [
                { model: Project, as: 'projects' },
                { model: Work, as: 'workHistory' },
                { model: Education, as: 'education' }
            ]
        });
    }           

    async getUserById(id: number): Promise<User | null> {
        return await User.findByPk(id, {
            include: [
                { model: Project, as: 'projects' },
                { model: Work, as: 'workHistory' },
                { model: Education, as: 'education' }
            ]
        });
    }

    async updateEducation(userId: number, educationData: any[]): Promise<void> {
        const user = await User.findByPk(userId);
        if (user) {
            await user.update({ education: educationData });
        }
    }

    async updateUser(id: number, data: any): Promise<void> {
        const user = await User.findByPk(id);
        if (user) {
            await user.update(data);
        }
    }
    async updateWorkHistory(userId: number, workData: any[]): Promise<void> {
        const user = await User.findByPk(userId);
        if (user) {
            await user.update({ workHistory: workData });
        }
    }
}