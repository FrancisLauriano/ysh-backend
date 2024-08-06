import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from '../entities/device.entity';
import { Ambiente } from '../entities/ambiente.entity';
import { Repository, In } from 'typeorm';

export class DevicesLocationsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DevicesLocationsError';
  }
}

@Injectable()
export class DevicesLocationsService {
  private readonly ERR_MSG_PREFIX = 'Erro';

  constructor(
    @InjectRepository(Ambiente)
    private readonly ambienteRepository: Repository<Ambiente>,
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>
  ) {}

  private handleError(error: any, action: string): DevicesLocationsError {
    return new DevicesLocationsError(
      `${this.ERR_MSG_PREFIX} ${action}: ${error.message}`
    );
  }

  // Mostra dispositivos numa localização (id_ambiente) específica.
  async listaDevicesInLocation(location_id: number): Promise<any[] | null> {
    try {
      const ambiente = await this.ambienteRepository.findOne({
        where: { id_ambiente: location_id },
        relations: ['devices'],
      });

      return ambiente ? ambiente.devices : null;
    } catch (error) {
      throw this.handleError(error, 'ListaDevicesInLocation');
    }
  }

  // Atualiza uma localização específica (id_ambiente) adicionando um dispositivo através do id do dispositivo (id_device)
  async updateDevicesInLocation(
    location_id: number,
    device_id: number
  ): Promise<any | DevicesLocationsError> {
    try {
      const ambiente = await this.ambienteRepository.findOne({
        where: { id_ambiente: location_id },
        relations: ['devices'],
      });

      if (!ambiente) {
        throw new Error(`Localização com ID ${location_id} não encontrada`);
      }

      const device = await this.deviceRepository.findOne({
        where: { id_device: device_id },
      });

      if (!device) {
        throw new Error('Dispositivo não encontrado');
      }

      const deviceIndex = ambiente.devices.findIndex(
        (dev) => dev.id_device === device_id
      );

      if (deviceIndex !== -1) {
        throw new Error('O dispositivo já está associado a esta localização');
      }

      ambiente.devices.push(device);

      const devicesLocationsUpdate =
        await this.ambienteRepository.save(ambiente);
      return devicesLocationsUpdate;
    } catch (error) {
      throw new DevicesLocationsError(
        `Erro ao atualizar dispositivos na localização: ${error.message}`
      );
    }
  }
}
