import { Sequelize } from 'sequelize-typescript';
import { singleton } from "tsyringe";
import { User } from '../db/models/User';
import { Project } from '../db/models/Project';
import { Work } from '../db/models/Work';
import { Education } from '../db/models/Education';
import dotenv from 'dotenv';

dotenv.config();

@singleton()
export class DatabaseConfig {
  public sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: 'mysql',
      models: [User, Project, Work, Education],
      logging: false,
    });
  }

  public async initialize(): Promise<void> {
    await this.sequelize.authenticate();
    await this.sequelize.sync();
  }
}

