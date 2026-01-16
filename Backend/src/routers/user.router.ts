import express from 'express';
import logger from '../config/logger.config';
import { container } from 'tsyringe';
import { UserController } from '../controller/UserController';

const userRouter = express.Router();
const userController = container.resolve(UserController);

userRouter.post("/", (req, res) => userController.createProfile(req, res));
userRouter.get("/", (req, res) => userController.getAllProfiles(req, res));
userRouter.get("/:id", (req, res) => userController.getProfile(req, res));
userRouter.put("/:id", (req, res) => userController.updateProfile(req, res));
userRouter.delete("/:id", (req, res) => userController.deleteProfile(req, res));

userRouter.patch("/:id/skills", (req, res) => userController.addSkill(req, res));
userRouter.put("/:id/education", (req, res) => userController.updateEducation(req, res));
userRouter.put("/:id/work-history", (req, res) => userController.updateWorkHistory(req, res));
userRouter.post("/:id/projects", (req, res) => userController.addProject(req, res));

export default userRouter;