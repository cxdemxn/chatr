// src/entities/Room.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Message } from './Message';

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryGeneratedColumn()
  id!: number;

  // optional friendly name for group chats; DMs can be null
  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string | null;

  @Column({ default: false, name: 'is_group' })
  isGroup!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToMany(() => User, (user) => user.rooms, { cascade: true })
  @JoinTable({
    name: 'room_participants',
    joinColumn: { name: 'room_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  participants!: User[];

  @OneToMany(() => Message, (message) => message.room)
  messages!: Message[];
}
