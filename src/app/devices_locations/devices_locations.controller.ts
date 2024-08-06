import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import {
  DevicesLocationsService,
  DevicesLocationsError,
} from './devices_locations.service';
import { IDevice } from '../interface/device.interface';
import { IAmbiente } from '../interface/ambiente.interface';

@Controller('')
export class DevicesLocationsController {
  constructor(
    private readonly devicesLocationsService: DevicesLocationsService
  ) {}

  // lista todos os dispositivos vinculado a um ambiente específico  - listaDevicesInLocation
  @Get('locations/:id_ambiente/devices')
  async getDevicesInLocation(
    @Param('id_ambiente') id_ambiente: number
  ): Promise<any[] | DevicesLocationsError> {
    try {
      return await this.devicesLocationsService.listaDevicesInLocation(
        id_ambiente
      );
    } catch (error) {
      throw new DevicesLocationsError(
        `Erro ao obter dispositivos na localização: ${error.message}`
      );
    }
  }

  // adiciona um dispositivo a um ambiente  - updateDevicesInLocation
  @Put('locations/:id_ambiente/devices')
  async updateDevicesInLocation(
    @Param('id_ambiente') id_ambiente: number,
    @Body('id_device') deviceIds: number[]
  ): Promise<any | DevicesLocationsError> {
    try {
      for (const id_device of deviceIds) {
        const devicesLocationsUpdate =
          await this.devicesLocationsService.updateDevicesInLocation(
            id_ambiente,
            id_device
          );
        return devicesLocationsUpdate;
      }
    } catch (error) {
      throw new DevicesLocationsError(
        `Erro ao atualizar dispositivos na localização: ${error.message}`
      );
    }
  }
}
