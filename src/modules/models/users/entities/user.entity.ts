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
import { Country } from '../enum/Country.enum';
import { Gender } from '../enum/Gender.enum';

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

  @Column({ nullable: true })
  password: string;

  @Column({
    default:
      'https://velog.velcdn.com/images/hclou0806/profile/d4697cef-6173-43eb-b60a-fa9bb447722d/social_profile.png',
    nullable: true,
  })
  photo_url: string;

  @Column({ nullable: true })
  name: string;

  @Column({
    type: 'enum',
    enum: Country,
    default: Country.KOREA,
    nullable: true,
  })
  country: Country;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.NONSELECT,
    nullable: true,
  })
  gender: Gender;

  @Column({ type: 'timestamp', nullable: true })
  last_login!: Date;

  // RELATED COLUMNS
  @ManyToMany(() => Room, (room) => room.users, {
    eager: true,
  })
  @JoinTable()
  chatRooms: Room[];
}
