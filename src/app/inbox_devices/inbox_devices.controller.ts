import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import {
  InboxDevicesService,
  InboxDevicesError,
} from './inbox_devices.service';

@Controller('')
export class InboxDevicesController {
  constructor(private readonly inboxDevicesService: InboxDevicesService) {}

  @Get('inbox')
  async getInbox(): Promise<any[] | InboxDevicesError> {
    try {
      return await this.inboxDevicesService.getInbox();
    } catch (error) {
      throw new InboxDevicesError(
        `Erro ao obter a caixa de entrada: ${error.message}`
      );
    }
  }

  @Get('inbox/scan')
  async getScanNoInbox(): Promise<string[] | InboxDevicesError> {
    try {
      return await this.inboxDevicesService.getScanNoInbox();
    } catch (error) {
      throw new InboxDevicesError(
        `Erro ao obter os dispositivos de varredura: ${error.message}`
      );
    }
  }

  @Get('devices')
  async getDevices(): Promise<any[] | InboxDevicesError> {
    try {
      return await this.inboxDevicesService.getDevices();
    } catch (error) {
      throw new InboxDevicesError(
        `Erro ao obter os dispositivos: ${error.message}`
      );
    }
  }

  @Get('devices/:id')
  async getDeviceById(
    @Param('id') id: number
  ): Promise<object | InboxDevicesError> {
    try {
      return await this.inboxDevicesService.getDeviceId(id);
    } catch (error) {
      throw new InboxDevicesError(
        `Erro ao obter o dispositivo por ID: ${error.message}`
      );
    }
  }

  @Post('devices')
  async createDevice(
    @Body() createDeviceDto: { label: string; openhab_uid: string }
  ): Promise<object | InboxDevicesError> {
    try {
      return await this.inboxDevicesService.createDevice(
        createDeviceDto.label,
        createDeviceDto.openhab_uid
      );
    } catch (error) {
      throw new InboxDevicesError(
        `Erro ao criar o dispositivo: ${error.message}`
      );
    }
  }

  @Put('devices/:id/replace')
  async replaceDevice(
    @Param('id') id: number,
    @Body() replaceDeviceDto: { openhab_uid: string }
  ): Promise<object | InboxDevicesError> {
    try {
      return await this.inboxDevicesService.replaceDevice(
        id,
        replaceDeviceDto.openhab_uid
      );
    } catch (error) {
      throw new InboxDevicesError(
        `Erro ao substituir o dispositivo: ${error.message}`
      );
    }
  }

  @Put('devices/:id/properties')
  async updateDeviceProperties(
    @Param('id') id: number,
    @Body() updateDevicePropertiesDto: { name: string; data: object }
  ): Promise<object | InboxDevicesError> {
    try {
      return await this.inboxDevicesService.updateDeviceProperties(
        id,
        updateDevicePropertiesDto.name,
        updateDevicePropertiesDto.data
      );
    } catch (error) {
      throw new InboxDevicesError(
        `Erro ao atualizar as propriedades do dispositivo: ${error.message}`
      );
    }
  }
}
