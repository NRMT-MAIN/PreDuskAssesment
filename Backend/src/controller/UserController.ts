import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { IUserService } from "../service/IUserService";
import logger from "../config/logger.config";
import { log } from "node:console";


@injectable()
export class UserController {
    constructor(
        @inject("IUserService") private userService: IUserService
    ) {}

    public createProfile = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.createUserProfile(req.body);
            logger.info(`User created with ID: ${user.id}`);
            res.status(201).json(user);
        } catch (error: any) {
            logger.error(`Error creating user: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    };

    public getProfile = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.getUserProfileById(Number(req.params.id));
            if (!user) {
                logger.warn(`User not found with ID: ${req.params.id}`);
                res.status(404).json({ error: "User not found" });
                return;
            }
            logger.info(`User retrieved with ID: ${user.id}`);
            res.json(user);
        } catch (error: any) {
            logger.error(`Error retrieving user: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    };

    public addSkill = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.userService.addUserSkill(Number(req.params.id), req.body.skill);
            logger.info(`Skill added for User ID: ${req.params.id}`);
            res.json({ message: "Skill added successfully" });
        } catch (error: any) {
            logger.error(`Error adding skill: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    };

    public deleteProfile = async (req: Request, res: Response): Promise<void> => {
        try {
            const deletedCount = await this.userService.deleteUserProfile(Number(req.params.id));
            if (deletedCount === 0) {
                logger.warn(`User not found for deletion with ID: ${req.params.id}`);
                res.status(404).json({ error: "User not found" });
                return;
            }
            logger.info(`User deleted with ID: ${req.params.id}`);
            res.json({ message: "User deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };

    public getAllProfiles = async (req: Request, res: Response): Promise<void> => {
        try {
            const limit = Number(req.query.limit) || 10;
            const offset = Number(req.query.offset) || 0;
            const users = await this.userService.getAllUserProfiles(limit, offset);
            logger.info(`Retrieved ${users.length} users`);
            res.json(users);
        } catch (error: any) {
            logger.error(`Error retrieving users: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    };

    public updateEducation = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.userService.updateUserEducation(Number(req.params.id), req.body.education);
            res.json({ message: "Education updated successfully" });
            logger.info(`Education updated for User ID: ${req.params.id}`);
        }
        catch (error: any) {
            logger.error(`Error updating education: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    };

    public updateWorkHistory = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.userService.updateUserWorkHistory(Number(req.params.id), req.body.workHistory);
            logger.info(`Work history updated for User ID: ${req.params.id}`);
            res.json({ message: "Work history updated successfully" });
        }
        catch (error: any) {
            logger.error(`Error updating work history: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    };
    public addProject = async (req: Request, res: Response): Promise<void> => {
        try {
            const project = await this.userService.addUserProject(Number(req.params.id), req.body);
            logger.info(`Project added for User ID: ${req.params.id}`);
            res.status(201).json(project);
        }
        catch (error: any) {
            logger.error(`Error adding project: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    };

    public updateProfile = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.userService.updateUserProfile(Number(req.params.id), req.body);
            logger.info(`Profile updated for User ID: ${req.params.id}`);
            res.json({ message: "Profile updated successfully" });
        }
        catch (error: any) {
            logger.error(`Error updating profile: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    };
}