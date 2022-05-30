import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ProvidersModule } from './providers/providers.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [
    ProvidersModule,
    ResourcesModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class MainModule {}
