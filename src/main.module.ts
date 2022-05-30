import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [ProvidersModule, ResourcesModule],
})
export class MainModule {}
