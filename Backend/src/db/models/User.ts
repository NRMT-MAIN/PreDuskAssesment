import { Table, Column, Model, DataType, HasMany, DefaultScope, Scopes } from 'sequelize-typescript';
import { Project } from './Project';
import { Work } from './Work';
import { Education } from './Education';

@Table({ tableName: 'users', underscored: true })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.JSON })
  skills!: string[];

  @Column({ type: DataType.STRING, field: 'github_link' })
  githubLink?: string;

  @Column({ type: DataType.STRING, field: 'linkedin_link' })
  linkedinLink?: string;

  @Column({ type: DataType.STRING, field: 'portfolio_link' })
  portfolioLink?: string;

  @HasMany(() => Project)
  projects!: Project[];

  @HasMany(() => Education)
  education!: Education[];

  @HasMany(() => Work)
  workHistory!: Work[];
}