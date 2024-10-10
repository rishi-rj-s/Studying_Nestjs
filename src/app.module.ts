import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopicsModule } from './topics/topics.module';
import { EpisodesModule } from './episodes/episodes.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [TopicsModule, EpisodesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
