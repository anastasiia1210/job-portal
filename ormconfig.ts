// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/**/db/migrations/*{.ts,.js}'],
  synchronize: false,
  charset: 'utf8mb8',
  cli: {
    migrationsDir: 'db/migrations',
  },
  logging: true,
};
