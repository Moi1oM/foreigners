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

  @Column()
  password: string;

  @Column()
  photo_url: string;

  @Column({ type: 'enum', enum: Country, default: Country.KOREA })
  country: Country;

  @Column({ type: 'enum', enum: Gender, default: Gender.NONSELECT })
  gender: Gender;

  @Column({ type: 'timestamp' })
  last_login!: Date;

  // RELATED COLUMNS
  @ManyToMany(() => Room, (room) => room.users, {
    eager: true,
  })
  @JoinTable()
  chatRooms: Room[];
}
