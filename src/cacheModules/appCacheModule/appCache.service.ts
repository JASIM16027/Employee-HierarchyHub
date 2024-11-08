import { Injectable } from '@nestjs/common';
const NodeCache = require('node-cache');

@Injectable()
export class AppCacheService {
    private cache: any;
    constructor() {
        this.cache = new NodeCache();
    }

    set(key: string, value: any, ttlSeconds: number = 3600): void {
        this.cache.set(key, value, ttlSeconds);
    }

    get(key: string): any {
        return this.cache.get(key);
    }

    delete(key: string): void {
        this.cache.del(key);
    }
    getTTL(key: string): number | 0 | undefined {
        return this.cache.getTtl(key);
    }
}
