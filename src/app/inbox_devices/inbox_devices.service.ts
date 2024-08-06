import { HomeAssistantService } from '../home_assistant/service/home_assistant.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDevice } from '../interface/device.interface';
import { Device } from '../entities/device.entity';
import { Repository } from 'typeorm';

export class InboxDevicesError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InboxDevicesError';
  }
}

@Injectable()
export class InboxDevicesService {
  private readonly ERR_MSG_PREFIX = 'Erro';

  constructor(
    private readonly homeAssistantService: HomeAssistantService,
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>
  ) {}

  private handleError(error: any, action: string): InboxDevicesError {
    return new InboxDevicesError(
      `${this.ERR_MSG_PREFIX} ${action}: ${error.message}`
    );
  }

  async devicesScanDisponiveis(): Promise<
    IDevice[] | null | InboxDevicesError
  > {
    try {
      const devicesData = await this.homeAssistantService.getEntityHA();

      if (!Array.isArray(devicesData)) {
        throw new Error(
          'A resposta de getEntityHA não é um array de dispositivos'
        );
      }
      // filtrar apenas as entidades que possuem a propriedade device_class e não são 'connectivity', 'timestamp' ou 'problem'
      const dispositivosRetornados = devicesData.filter((device: any) => {
        return (
          device.attributes &&
          device.attributes.hasOwnProperty('device_class') &&
          !['connectivity', 'timestamp', 'problem'].includes(
            device.attributes.device_class
          )
        );
      });

      // consultar o banco de dados para obter a lista de dispositivos já armazenados
      const dispositivosArmazenados = await this.deviceRepository.find();

      // comparar as duas listas para identificar os dispositivos disponíveis para serem adicionados
      const dispositivosDisponiveis = dispositivosRetornados.filter(
        (device: IDevice) => {
          return !dispositivosArmazenados.some(
            (d: IDevice) => d.entity_id === device.entity_id
          );
        }
      );

      return dispositivosDisponiveis;
    } catch (error) {
      throw this.handleError(error, 'DevicesScanDisponiveis');
    }
  }

  // Método para adicionar um dispositivo ao banco de dados
  async deviceAdd(device: IDevice): Promise<IDevice | InboxDevicesError> {
    try {
      const existingDevice = await this.deviceRepository.findOne({
        where: { entity_id: device.entity_id },
      });

      if (existingDevice) {
        throw new Error('Dispositivo já cadastrado');
      }
      const newDevice = await this.deviceRepository.save(device);

      return newDevice;
    } catch (error) {
      throw this.handleError(error, 'DeviceAdd');
    }
  }

  // Método para atualizar as informações de um dispositivo no banco de dados
  async deviceUpdate(
    device_id: number,
    updatedDeviceData: Partial<IDevice>
  ): Promise<IDevice | InboxDevicesError> {
    try {
      // buscar o dispositivo pelo id_device
      const deviceToUpdate = await this.deviceRepository.findOne({
        where: { id_device: device_id },
      });

      // verificar se o dispositivo foi encontrado
      if (!deviceToUpdate) {
        throw new Error('Dispositivo não encontrado');
      }

      Object.assign(deviceToUpdate, updatedDeviceData);
      const updatedDevice = await this.deviceRepository.save(deviceToUpdate);

      return updatedDevice;
    } catch (error) {
      throw this.handleError(error, 'DeviceUpdate');
    }
  }

  // Método para listar todos os dispositivos do banco de dados
  async devicesLista(): Promise<IDevice[] | InboxDevicesError> {
    try {
      const dispositivos = await this.deviceRepository.find();
      return dispositivos;
    } catch (error) {
      throw this.handleError(error, 'DevicesLista');
    }
  }

  // Método para buscar um dispositivo específico pelo id_device no bando de dados
  async deviceID(device_id: number): Promise<IDevice | InboxDevicesError> {
    try {
      const dispositivo = await this.deviceRepository.findOne({
        where: { id_device: device_id },
      });

      if (!dispositivo) {
        throw new Error('Dispositivo não encontrado');
      }

      return dispositivo;
    } catch (error) {
      throw this.handleError(error, 'DeviceID');
    }
  }

  // Método para remover um dispositivo do banco de dados
  async deviceDelete(device_id: number): Promise<string | InboxDevicesError> {
    try {
      // buscar dispositivo pelo id_device
      const deviceToDelete = await this.deviceRepository.findOne({
        where: { id_device: device_id },
      });

      // verificar se o dispositivo foi encontrado
      if (!deviceToDelete) {
        throw new Error('Dispositivo não encontrado');
      }

      // Se o dispositivo existir, deletar
      await this.deviceRepository.remove(deviceToDelete);
      return 'Dispositivo deletado com sucesso';
    } catch (error) {
      throw this.handleError(error, 'DeviceDelete');
    }
  }

  // Método para substituir um dispositivo específico, transferindo a configuração de id_device, name_device, e ambiente (id_ambiente, nome e tipo)do dispositivo anterior para o novo dispositivo.
  async deviceReplace(
    oldDeviceId: number,
    newDeviceData: Partial<IDevice>
  ): Promise<IDevice | InboxDevicesError> {
    try {
      const oldDevice = await this.deviceRepository.findOne({
        where: { id_device: oldDeviceId },
        relations: ['ambiente'],
      });

      if (!oldDevice) {
        throw new Error('Dispositivo anterior não encontrado');
      }

      const newDevice = this.deviceRepository.create({
        id_device: oldDevice.id_device,
        name_device: oldDevice.name_device,
        entity_id: newDeviceData.entity_id || oldDevice.entity_id,
        state: newDeviceData.state || oldDevice.state,
        last_changed: newDeviceData.last_changed || oldDevice.last_changed,
        last_updated: newDeviceData.last_updated || oldDevice.last_updated,
        attributes: newDeviceData.attributes || oldDevice.attributes,
        context: newDeviceData.context || oldDevice.context,
        ambiente: oldDevice.ambiente,
      });

      const savedDevice = await this.deviceRepository.save(newDevice);
      return savedDevice;
    } catch (error) {
      throw this.handleError(error, 'DeviceReplace');
    }
  }

  // Método para buscar um dispositivo específico pelo name_device ou pelo id_device no banco de dados
  async findDevicesByNameOrId(
    searchTerm: string | number
  ): Promise<IDevice | IDevice[] | InboxDevicesError> {
    try {
      const dispositivo = await this.deviceRepository
        .createQueryBuilder('device')
        .where(
          'device.name_device = :searchTerm OR device.id_device = :searchTerm',
          { searchTerm }
        )
        .getMany();

      return dispositivo;
    } catch (error) {
      throw this.handleError(error, 'DeviceByNameOrId');
    }
  }
}
