import { Sequelize } from 'sequelize';

// Створення підключення до PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

// Функція для перевірки підключення до бази даних
export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
    
    // Синхронізація моделей з базою даних (створення таблиць)
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1);
  }
}

export default sequelize;
