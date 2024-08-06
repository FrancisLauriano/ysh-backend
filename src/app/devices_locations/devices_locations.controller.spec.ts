import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevicesLocationsController } from './devices_locations.controller';
import {
  DevicesLocationsService,
  DevicesLocationsError,
} from './devices_locations.service';
import { Ambiente } from '../entities/ambiente.entity';
import { Device } from '../entities/device.entity';

describe('DevicesLocationsController', () => {
  let controller: DevicesLocationsController;
  let service: DevicesLocationsService;
  let ambienteRepository: Repository<Ambiente>;
  let deviceRepository: Repository<Device>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesLocationsController],
      providers: [
        DevicesLocationsService,
        {
          provide: 'DevicesLocationsService',
          useValue: {
            listaDevicesInLocation: jest.fn(),
            updateDevicesInLocation: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Ambiente),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Device),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<DevicesLocationsController>(
      DevicesLocationsController
    );
    service = module.get<DevicesLocationsService>('DevicesLocationsService');
    ambienteRepository = module.get<Repository<Ambiente>>(
      getRepositoryToken(Ambiente)
    );
    deviceRepository = module.get<Repository<Device>>(
      getRepositoryToken(Device)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDevicesInLocation', () => {
    it('should return devices in a location', async () => {
      const locationId = 1;
      const devices = [];
      jest.spyOn(ambienteRepository, 'findOne').mockResolvedValue({
        devices: devices,
      } as Ambiente);

      const result = await controller.getDevicesInLocation(locationId);

      expect(result).toEqual(devices);
    });

    it('should throw an error if an error occurs', async () => {
      const locationId = 1;
      const errorMessage = 'Error fetching devices';
      jest
        .spyOn(ambienteRepository, 'findOne')
        .mockRejectedValue(new Error(errorMessage));

      await expect(
        controller.getDevicesInLocation(locationId)
      ).rejects.toThrowError(errorMessage);
    });

    it('should update devices in a location', async () => {
      const locationId = 1;
      const deviceIds = [1, 2];

      // Criar um ambiente com a lista de dispositivos definida
      const ambiente = new Ambiente();
      ambiente.devices = [];

      // Simular o método findOne para retornar o ambiente criado
      jest.spyOn(ambienteRepository, 'findOne').mockResolvedValue(ambiente);

      // Simular o método findOne do deviceRepository para retornar um dispositivo válido
      jest.spyOn(deviceRepository, 'findOne').mockResolvedValue(new Device());

      // Simular o método save do ambienteRepository
      const mockSave = jest
        .spyOn(ambienteRepository, 'save')
        .mockResolvedValue(ambiente);

      // Chamar a função a ser testada
      await controller.updateDevicesInLocation(locationId, deviceIds);

      // Esperar que o método save seja chamado uma vez
      expect(mockSave).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if an error occurs', async () => {
      const locationId = 1;
      const deviceIds = [1, 2];
      const errorMessage = 'Error updating devices';
      jest
        .spyOn(ambienteRepository, 'findOne')
        .mockRejectedValue(new Error(errorMessage));

      await expect(
        controller.updateDevicesInLocation(locationId, deviceIds)
      ).rejects.toThrowError(errorMessage);
    });
  });
});
