import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis.service';
import Redis from 'ioredis';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
    providers: [
        {
            useFactory: (): Redis => {
                return new Redis(process.env.REDIS_CON_URL as string);
            },
            provide: 'REDIS_CLIENT',
        },
        RedisCacheService,
    ],
    exports: [RedisCacheService],
})
export class RedisCacheModule {}
