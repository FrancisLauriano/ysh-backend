import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { LocationsService, LocationsError } from './locations.service';

@Controller('')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('locations')
  async getLocations(): Promise<object | LocationsError> {
    try {
      return await this.locationsService.getLocations();
    } catch (error) {
      throw new LocationsError(
        `Erro ao obter as localizações: ${error.message}`
      );
    }
  }

  @Get('locations/location-types')
  async getLocationTypes(): Promise<string[] | LocationsError> {
    try {
      return await this.locationsService.getLocationTypes();
    } catch (error) {
      throw new LocationsError(
        `Erro ao obter os tipos de localização: ${error.message}`
      );
    }
  }

  @Post('locations')
  async createLocation(
    @Body()
    createLocationDto: {
      label: string;
      location_type: string;
      parent_location_id: number | null;
    }
  ): Promise<object | LocationsError> {
    try {
      return await this.locationsService.createLocation(
        createLocationDto.label,
        createLocationDto.location_type,
        createLocationDto.parent_location_id
      );
    } catch (error) {
      throw new LocationsError(`Erro ao criar a localização: ${error.message}`);
    }
  }

  @Put('locations/:id')
  async updateLocation(
    @Param('id') id: number,
    @Body()
    updateLocationDto: {
      label: string;
      location_type: string;
      parent_location_id: number | null;
    }
  ): Promise<object | LocationsError> {
    try {
      return await this.locationsService.updateLocation(
        id,
        updateLocationDto.label,
        updateLocationDto.location_type,
        updateLocationDto.parent_location_id
      );
    } catch (error) {
      throw new LocationsError(
        `Erro ao atualizar a localização: ${error.message}`
      );
    }
  }

  @Delete('locations/:id')
  async deleteLocation(@Param('id') id: number): Promise<any | LocationsError> {
    try {
      return await this.locationsService.deleteLocation(id);
    } catch (error) {
      throw new LocationsError(
        `Erro ao excluir a localização: ${error.message}`
      );
    }
  }
}
