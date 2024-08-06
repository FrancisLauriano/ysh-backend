import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { LocationsService, LocationsError } from './locations.service';
import { IAmbiente } from '../interface/ambiente.interface';

@Controller('')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  // lista todos os ambientes - locationsLista
  @Get('locations')
  async getLocations(): Promise<IAmbiente[] | LocationsError> {
    try {
      return await this.locationsService.locationsLista();
    } catch (error) {
      throw new LocationsError(
        `Erro ao obter as localizações: ${error.message}`
      );
    }
  }

  // lista os tipos de ambiente do banco de dados - locationsTiposLista
  @Get('locations/location-types')
  async getLocationTypes(): Promise<string[] | LocationsError> {
    try {
      return await this.locationsService.locationsTiposLista();
    } catch (error) {
      throw new LocationsError(
        `Erro ao obter os tipos de localização: ${error.message}`
      );
    }
  }

  // adiciona ambiente ao banco de dados - locationAdd
  @Post('locations')
  async createLocation(
    @Body() createLocationDto: IAmbiente
  ): Promise<IAmbiente | LocationsError> {
    try {
      const locationsCreate =
        await this.locationsService.locationAdd(createLocationDto);
      return locationsCreate;
    } catch (error) {
      throw new LocationsError(`Erro ao criar o ambiente: ${error.message}`);
    }
  }

  // atualiza informação de ambiente no banco de dados - locationUpdate
  @Put('locations/:id_ambiente')
  async updateLocation(
    @Param('id_ambiente') id_ambiente: number,
    @Body() updateLocationDto: Partial<IAmbiente>
  ): Promise<any | LocationsError> {
    try {
      await this.locationsService.locationUpdate(
        id_ambiente,
        updateLocationDto
      );
    } catch (error) {
      throw new LocationsError(
        `Erro ao atualizar a localização: ${error.message}`
      );
    }
  }

  // deleta ambiente do banco de dados - locationDelete
  @Delete('locations/:id_ambiente')
  async deleteLocation(
    @Param('id_ambiente') id_ambiente: number
  ): Promise<any | LocationsError> {
    try {
      await this.locationsService.locationDelete(id_ambiente);
      return { status: HttpStatus.OK };
    } catch (error) {
      throw new LocationsError(
        `Erro ao excluir a localização: ${error.message}`
      );
    }
  }

  // lista um ambiente específico pelo ID - locationId
  @Get('locations/:id_ambiente')
  async getLocationById(
    @Param('id_ambiente') id_ambiente: number
  ): Promise<IAmbiente | null | LocationsError> {
    try {
      return await this.locationsService.locationId(id_ambiente);
    } catch (error) {
      throw new LocationsError(
        `Erro ao obter o localização por ID: ${error.message}`
      );
    }
  }
}
