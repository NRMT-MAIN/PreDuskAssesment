import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';

@Table({ tableName: 'work_experience', underscored: true })
export class Work extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  company!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  position!: string;

  @Column({ type: DataType.TEXT })
  description!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, field: 'user_id' })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}