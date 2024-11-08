import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { AppCacheService } from './appCache.service';

@Module({
    imports: [CacheModule.register()],
    providers: [AppCacheService],
    exports: [AppCacheService],
})
export class AppCacheModule {}
