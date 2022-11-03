import { ChannelConnectorModule } from './modules/channelconnector.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ChannelConnectorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
