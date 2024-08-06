import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HomeAssistantService } from './service/home_assistant.service';

@Module({
  imports: [HttpModule],
  providers: [HomeAssistantService],
  exports: [HomeAssistantService],
})
export class HomeAssistantModule {}
