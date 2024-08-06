import { Controller, Body, Get, Param, Put } from '@nestjs/common';
import {
  DevicesLocationsService,
  DevicesLocationsError,
} from './devices_locations.service';

@Controller('')
export class DevicesLocationsController {
  constructor(
    private readonly devicesLocationsService: DevicesLocationsService
  ) {}

  @Get('locations/:location_id/devices')
  async getDevicesInLocation(
    @Param('location_id') location_id: number
  ): Promise<any[] | DevicesLocationsError> {
    try {
      return await this.devicesLocationsService.getDevicesInLocation(
        location_id
      );
    } catch (error) {
      throw new DevicesLocationsError(
        `Erro ao obter dispositivos na localização: ${error.message}`
      );
    }
  }

  @Put('locations/:location_id/devices')
  async updateDevicesInLocation(
    @Param('location_id') location_id: number,
    @Body() deviceLocationData: number[]
  ): Promise<any | DevicesLocationsError> {
    try {
      return await this.devicesLocationsService.updateDevicesInLocation(
        location_id,
        deviceLocationData
      );
    } catch (error) {
      throw new DevicesLocationsError(
        `Erro ao atualizar dispositivos na localização: ${error.message}`
      );
    }
  }
}
