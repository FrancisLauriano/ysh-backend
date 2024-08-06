import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InboxDevicesController } from './inbox_devices.controller';
import { InboxDevicesService } from './inbox_devices.service';
import { HomeAssistantModule } from '../home_assistant/home_assistant.module';
import { Device } from '../entities/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device]), HomeAssistantModule],
  controllers: [InboxDevicesController],
  providers: [InboxDevicesService],
})
export class InboxDevicesModule {}
