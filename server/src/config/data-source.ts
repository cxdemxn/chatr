import reflect from 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from '.';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: config.DB_URL,
  synchronize: true, // set to false in production
  logging: config.LOG_DB_QUERIES,
  entities: [__dirname + '/../models/*.ts'],
  migrations: [],
  subscribers: [],
});

export async function initializeDataSource() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Data Source has been initialized!');
  } catch (err) {
    console.error('❌ Error during Data Source initialization:', err);
  }
}

export async function destroyDataSource() {
  try {
    await AppDataSource.destroy();
    console.log('🛑 Data Source has been destroyed!');
  } catch (err) {
    console.error('❌ Error during Data Source destruction:', err);
  }
}

export const getRepository = (entity: any) => {
  return AppDataSource.getRepository(entity);
};


export default AppDataSource;