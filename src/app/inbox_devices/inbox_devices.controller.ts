import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import {
  InboxDevicesService,
  InboxDevicesError,
} from './inbox_devices.service';
import { IDevice } from '../interface/device.interface';

@Controller('')
export class InboxDevicesController {
  constructor(private readonly inboxDevicesService: InboxDevicesService) {}

  // lista todos os dispositivos emparelhados ao Home Assistant - devicesScanDisponiveis
  @Get('inbox')
  async getInbox(): Promise<any[] | InboxDevicesError> {
    try {
      return await this.inboxDevicesService.devicesScanDisponiveis();
    } catch (error) {
      throw new InboxDevicesError(
        `Erro ao obter a caixa de entrada: ${error.message}`
      );
    }
  }

  // lista todos os dispositivos cadastrados - devicesLista
  @Get('devices')
  async getDevices(): Promise<IDevice[] | null | InboxDevicesError> {
    try {
      return await this.inboxDevicesService.devicesLista();
    } catch (error) {
      throw new InboxDevicesError(
        `Erro ao obter os dispositivos: ${error.message}`
      );
    }
  }

  // lista um dispositivo específico pelo ID - deviceID
  @Get('devices/:id_device')
  async getDeviceById(
    @Param('id_device') id_device: number
  ): Promise<IDevice | null | InboxDevicesError> {
    try {
      return await this.inboxDevicesService.deviceID(id_device);
    } catch (error) {
      throw new InboxDevicesError(
        `Erro ao obter o dispositivo por ID: ${error.message}`
      );
    }
  }

  // adicionar um dispositivo ao banco de dados - deviceAdd
  @Post('devices')
  async createDevice(
    @Body() createDeviceDto: IDevice
  ): Promise<IDevice | InboxDevicesError> {
    try {
      const deviceCreate =
        await this.inboxDevicesService.deviceAdd(createDeviceDto);
      return deviceCreate;
    } catch (error) {
      throw new InboxDevicesError(
        `Erro ao criar o dispositivo: ${error.message}`
      );
    }
  }

  // atualiza informação de dispositivo no banco de dados - deviceUpdate
  @Put('devices/:id_device/properties')
  async updateDeviceProperties(
    @Param('id_device') id_device: number,
    @Body() updateDevicePropertiesDto: Partial<IDevice>
  ): Promise<IDevice | InboxDevicesError> {
    try {
      const deviceUpdate = await this.inboxDevicesService.deviceUpdate(
        id_device,
        updateDevicePropertiesDto
      );
      return deviceUpdate;
    } catch (error) {
      throw new InboxDevicesError(
        `Erro ao atualizar as propriedades do dispositivo: ${error.message}`
      );
    }
  }

  // deleta um dispositivo do banco de dados - deviceDelete
  @Delete('devices/:id_device')
  async deleteDeviceById(
    @Param('id_device') id_device: number
  ): Promise<any | InboxDevicesError> {
    try {
      await this.inboxDevicesService.deviceDelete(id_device);
      return { status: HttpStatus.OK };
    } catch (error) {
      throw new InboxDevicesError(
        `Erro ao deletar o dispositivo por ID: ${error.message}`
      );
    }
  }

  // substitui um dispositivo específico, transferindo a configuração de id_device, name_device, e ambiente (id_ambiente, nome e tipo)do dispositivo anterior para o novo dispositivo.
  @Put('devices/:id_device/replace')
  async replaceDevice(
    @Param('id_device') id_device: number,
    @Body() replaceDeviceDto: Partial<IDevice>
  ): Promise<IDevice | InboxDevicesError> {
    try {
      return await this.inboxDevicesService.deviceReplace(
        id_device,
        replaceDeviceDto
      );
    } catch (error) {
      throw new InboxDevicesError(
        `Erro ao substituir o dispositivo: ${error.message}`
      );
    }
  }

  // pesquisa um dispositivo pelo ID (id_device) ou pelo nome (name_device) - findDevicesByNameOrId
  @Get('devices_id_name/:searchTerm')
  async findDevicesByNameOrId(
    @Param('searchTerm') searchTerm: string | number
  ): Promise<IDevice | IDevice[] | null | InboxDevicesError> {
    try {
      return await this.inboxDevicesService.findDevicesByNameOrId(searchTerm);
    } catch (error) {
      throw new InboxDevicesError(
        `Erro ao buscar dispositivos pelo nome ou ID: ${error.message}`
      );
    }
  }
}
