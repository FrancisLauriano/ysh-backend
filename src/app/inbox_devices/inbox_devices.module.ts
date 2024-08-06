import { Module } from '@nestjs/common';
import { InboxDevicesController } from './inbox_devices.controller';
import { InboxDevicesService } from './inbox_devices.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [InboxDevicesController],
  providers: [InboxDevicesService],
})
export class InboxDevicesModule {}
