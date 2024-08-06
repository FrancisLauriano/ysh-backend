import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesLocationsController } from './devices_locations.controller';
import { DevicesLocationsService } from './devices_locations.service';
import { Device } from '../entities/device.entity';
import { Ambiente } from '../entities/ambiente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ambiente, Device])],
  controllers: [DevicesLocationsController],
  providers: [DevicesLocationsService],
})
export class DevicesLocationsModule {}
