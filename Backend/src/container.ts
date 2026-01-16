import "reflect-metadata";
import { container, Lifecycle } from "tsyringe";
import { UserRepository } from "./repository/UserRepository";
import { UserService } from "./service/UserService";



container.register("IUserRepository", { useClass: UserRepository }, { lifecycle: Lifecycle.Singleton });

container.register("IUserService", { useClass: UserService} , { lifecycle: Lifecycle.Singleton });

export { container };