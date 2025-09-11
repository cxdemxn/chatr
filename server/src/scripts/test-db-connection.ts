// src/scripts/test-connection.ts
import 'reflect-metadata';
import AppDataSource, {initializeDataSource, getRepository, destroyDataSource } from '../config/data-source';
import { User } from '../models/User';
import { Room } from '../models/Room';
import { Message } from '../models/Message';
import bcrypt from 'bcrypt';

async function main() {
  try {
    await initializeDataSource();
    console.log('DataSource initialized');

    // Repositories
    const userRepo = getRepository(User);
    const msgRepo = getRepository(Message);
    const roomRepo = getRepository(Room);

    // Clear tables for repeatable test (dev only)
    // await msgRepo.clear();
    // await roomRepo.clear();
    // await userRepo.clear();

    await AppDataSource.query(`TRUNCATE TABLE messages, rooms, users RESTART IDENTITY CASCADE`);

    // Create two users
    const passwordHash1 = await bcrypt.hash('password123', 10);
    const passwordHash2 = await bcrypt.hash('secret456', 10);

    const alice = userRepo.create({
      name: 'Alice',
      email: 'alice@example.com',
      password: passwordHash1,
      languagePreference: 'en',
    });
    const bob = userRepo.create({
      name: 'Bob',
      email: 'bob@example.com',
      password: passwordHash2,
      languagePreference: 'fr',
    });

    await userRepo.save([alice, bob]);
    console.log('Users created:', alice.id, bob.id);

    // Create a DM room for Alice & Bob
    const dmRoom = roomRepo.create({
      name: null,
      isGroup: false,
      participants: [alice, bob],
    });
    await roomRepo.save(dmRoom);
    console.log('DM Room created:', dmRoom.id);

    // Create a sample message (Alice sends Spanish text)
    const msg = msgRepo.create({
      sender: alice,
      room: dmRoom,
      content: 'Hola, ¿cómo estás?',
      translations: {
        en: 'Hello, how are you?',
        fr: 'Bonjour, comment ça va?',
      },
    });
    await msgRepo.save(msg);
    console.log('Message saved:', msg.id);

    // Fetch messages for room
    const messages = await msgRepo.find({
      where: { room: { id: dmRoom.id } as any },
      relations: ['sender'],
      order: { createdAt: 'ASC' },
    });

    console.log('Messages in room:', messages.map(m => ({
      id: m.id,
      sender: m.sender.name,
      content: m.content,
      translations: m.translations
    })));

    await destroyDataSource();
    console.log('Done.');
  } catch (err) {
    console.error('Error during test script', err);
    process.exit(1);
  }
}

main();
