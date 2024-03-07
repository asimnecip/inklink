// src/redis/redis.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: 'localhost',
      port: 6379,
      password: process.env.REDIS_PASSWORD
    });
  }

  onModuleInit() {
    console.log('Redis client connected');
  }

  onModuleDestroy() {
    this.redis.disconnect();
  }

  // Define the 'get' method
  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  // Define the 'set' method
  async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
  }

  async del(key: string): Promise<number> {
    return await this.redis.del(key);
  }
  async hget(key: string, field: string): Promise<string | null> {
    return await this.redis.hget(key, field);
  }
  
  async hset(key: string, field: string, value: string): Promise<void> {
    await this.redis.hset(key, field, value);
  }
  
  async hgetall(key: string): Promise<{ [key: string]: string }> {
    return await this.redis.hgetall(key);
  }

  // Delete a field from a hash
  async hdel(key: string, field: string): Promise<number> {
    return await this.redis.hdel(key, field);
  }

  // Get a range of elements from a list
  async lrange(key: string, start: number, stop: number): Promise<string[]> {
    return await this.redis.lrange(key, start, stop);
  }

  // Push a value to the end of a list
  async rpush(key: string, value: string): Promise<number> {
    return await this.redis.rpush(key, value);
  }

}
