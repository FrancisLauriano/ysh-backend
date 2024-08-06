import { Module } from '@nestjs/common';
import { DevicesLocationsController } from './devices_locations.controller';
import { DevicesLocationsService } from './devices_locations.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [DevicesLocationsController],
  providers: [DevicesLocationsService],
})
export class LocationsModule {}
