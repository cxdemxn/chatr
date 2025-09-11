// src/entities/Message.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Room } from './Room';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.messages, { eager: true })
  @JoinColumn({ name: 'sender_id' })
  sender!: User;

  @ManyToOne(() => Room, (room) => room.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room_id' })
  room!: Room;

  @Column({ type: 'text', name: 'content' })
  content!: string; // original

  /**
   * translations: JSON object keyed by language code, e.g.:
   * { "en": "hello", "fr": "bonjour" }
   *
   * Use jsonb in Postgres for fast queries.
   */
  @Column({ type: 'jsonb', name: 'translations', nullable: true })
  translations?: Record<string, string>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
