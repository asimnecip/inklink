// src/redis/redis.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
      password: process.env.REDIS_PASSWORD
    });
  }

  onModuleInit() {
    console.log('Redis client connected');
  }

  onModuleDestroy() {
    this.redisClient.disconnect();
  }

  // Define the 'get' method
  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  // Define the 'set' method
  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async del(key: string): Promise<number> {
    return await this.redisClient.del(key);
  }
}
