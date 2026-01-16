import "reflect-metadata";
import { container, Lifecycle } from "tsyringe";
import { UserRepository } from "./repository/UserRepository";
import { UserService } from "./service/UserService";
import { UserController } from "./controller/UserController";
import { DatabaseConfig } from "./config/db.config";

container.registerSingleton(DatabaseConfig);

container.register("IUserRepository", { useClass: UserRepository }, { lifecycle: Lifecycle.Singleton });

container.register("IUserService", { useClass: UserService} , { lifecycle: Lifecycle.Singleton });

container.registerSingleton(UserController);

export { container };