import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';

@Entity()
export class User extends BaseEntity {
  // BASIC COLUMNS
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  // INPUT COLUMNS
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  photo_url: string;

  @Column({ type: 'timestamp' })
  last_login!: Date;

  // RELATED COLUMNS
  @ManyToMany(() => Room, (room) => room.users, {
    eager: true,
  })
  @JoinTable()
  chatRooms: Room[];
}
