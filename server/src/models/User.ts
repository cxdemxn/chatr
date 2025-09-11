// src/entities/User.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Room } from './Room';
import { Message } from './Message';

export type LanguageCode = 'en' | 'fr' | 'yo' | 'ha' | string;

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 150, unique: true })
  email!: string;

  @Column()
  password!: string; // hashed

  @Column({ name: 'language_preference', length: 10, default: 'en' })
  languagePreference!: LanguageCode;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // rooms the user participates in
  @ManyToMany(() => Room, (room) => room.participants)
  rooms!: Room[];

  @OneToMany(() => Message, (msg) => msg.sender)
  messages!: Message[];
}
