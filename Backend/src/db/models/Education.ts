import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';

@Table({ tableName: 'education', underscored: true })
export class Education extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  institution!: string;

  @Column({ type: DataType.STRING })
  degree!: string;

  @Column({ type: DataType.DATE, field: 'start_date' })
  startDate!: Date;

  @Column({ type: DataType.DATE, field: 'end_date' })
  endDate?: Date;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, field: 'user_id' })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}