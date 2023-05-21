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
  @Column({ nullable: true, default: '대화가 시작되지 않았습니다.' })
  from_name: string;

  @Column({
    nullable: true,
    default:
      'https://blog.kakaocdn.net/dn/GHYFr/btrsSwcSDQV/UQZxkayGyAXrPACyf0MaV1/img.jpg',
  })
  from_avatar: string;

  @Column({ nullable: true, default: '대화가 시작되지 않았습니다.' })
  last_msg: string;

  @Column({ type: 'timestamp', nullable: true })
  last_time: Date;

  // RELATED COLUMNS
  @ManyToMany(() => User, (user) => user.chatRooms)
  @JoinTable()
  users: User[];

  @OneToMany(() => Message, (message) => message.room, {
    eager: true,
    nullable: true,
  })
  messages: Message[];

  @ManyToOne(() => Gpt, (gpt) => gpt.rooms, {
    nullable: true,
    eager: true,
  })
  isGptIn: Gpt;
}
