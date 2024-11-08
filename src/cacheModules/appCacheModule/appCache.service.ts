import { Injectable } from '@nestjs/common';
const NodeCache = require('node-cache');

@Injectable()
export class AppCacheService {
    private cache: any;
    constructor() {
        this.cache = new NodeCache();
    }

    set(key: string, value: any, ttlSeconds: number = 3600): void {
        // Set a key-value pair with an optional TTL (time-to-live) in seconds
        this.cache.set(key, value, ttlSeconds);
    }

    get(key: string): any {
        // Retrieve a value from the cache
        return this.cache.get(key);
    }

    delete(key: string): void {
        // Delete a key-value pair from the cache
        this.cache.del(key);
    }
    getTTL(key: string): number | 0 | undefined {
        // undefined if the key does not exist
        // 0 if this key has no ttl
        // a timestamp in ms representing the time at which the key will expire
        return this.cache.getTtl(key);
    }
}
