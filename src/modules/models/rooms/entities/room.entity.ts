import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Message } from '../../messages/entities/message.entity';
import { Gpt } from '../../gpts/entities/gpt.entity';

@Entity()
export class Room extends BaseEntity {
  // BASIC COLUMNS
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  // INPUT COLUMNS
  @Column()
  from_name: string;

  @Column()
  from_avatar: string;

  @Column()
  last_msg: string;

  @Column({ type: 'timestamp' })
  last_time: Date;

  // RELATED COLUMNS
  @ManyToMany(() => User, (user) => user.chatRooms)
  @JoinTable()
  users: User[];

  @OneToMany(() => Message, (message) => message.room, {
    eager: true,
  })
  messages: Message[];

  @ManyToOne(() => Gpt, (gpt) => gpt.rooms, {
    nullable: true,
    eager: true,
  })
  isGptIn: Gpt;
}
