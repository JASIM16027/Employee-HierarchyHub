import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheService {
    constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

    async get(key: string): Promise<any> {
        return await this.redis.get(key);
    }

    async set(key: string, value: any, ttl?: number): Promise<void> {
        await this.redis.set(key, value);
        if (ttl) {
            await this.redis.expire(key, ttl);
        }
    }

    async delete(key: string): Promise<void> {
        try {
            await this.redis.del(key);
        } catch (error) {
            throw error;
        }
    }

}
