import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'kodban',
      password: process.env.PG_DB_PASSWORD,
      database: 'inklink',
      entities: [],
      synchronize: true, // Note: set to false in production
    }),
    // other modules...
  ],
})
export class DbModule {}