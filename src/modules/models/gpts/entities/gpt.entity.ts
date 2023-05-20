import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';

@Entity()
export class Gpt extends BaseEntity {
  // BASIC COLUMNS
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  // INPUT COLUMNS
  @Column()
  name: string;

  @Column({
    default:
      'https://velog.velcdn.com/images/hclou0806/profile/d4697cef-6173-43eb-b60a-fa9bb447722d/social_profile.png',
  })
  profile_img: string;

  @Column()
  prompt: string;

  //RELATED COLUMNS
  @OneToMany(() => Room, (room) => room.isGptIn)
  rooms: Room[];
}
