import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ambiente } from '../entities/ambiente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ambiente])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
