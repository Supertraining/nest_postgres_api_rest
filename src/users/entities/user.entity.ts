import { Role } from '../../common/enums/role.enum';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;
  //con select false no devuelve el password
  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: 'enum', default: Role.User, enum: Role })
  role: Role;

  @DeleteDateColumn()
  deletedAt: Date;
}
