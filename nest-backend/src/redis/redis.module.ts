// src/redis/redis.module.ts
import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  providers: [RedisService],
  exports: [RedisService], // Export RedisService to make it available to other modules
})
export class RedisModule {}
