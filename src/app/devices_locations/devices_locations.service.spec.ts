import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  DevicesLocationsService,
  DevicesLocationsError,
} from './devices_locations.service';
import { Ambiente } from '../entities/ambiente.entity';
import { Device } from '../entities/device.entity';

describe('DevicesLocationsService', () => {
  let service: DevicesLocationsService;
  let ambienteRepository: Repository<Ambiente>;
  let deviceRepository: Repository<Device>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevicesLocationsService,
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

    service = module.get<DevicesLocationsService>(DevicesLocationsService);
    ambienteRepository = module.get<Repository<Ambiente>>(
      getRepositoryToken(Ambiente)
    );
    deviceRepository = module.get<Repository<Device>>(
      getRepositoryToken(Device)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listaDevicesInLocation', () => {
    it('should return devices in a location', async () => {
      const mockAmbiente = new Ambiente();
      mockAmbiente.id_ambiente = 1;
      const mockDevice1 = new Device();
      const mockDevice2 = new Device();
      mockAmbiente.devices = [mockDevice1, mockDevice2];

      jest.spyOn(ambienteRepository, 'findOne').mockResolvedValue(mockAmbiente);

      const result = await service.listaDevicesInLocation(1);

      expect(result).toEqual([mockDevice1, mockDevice2]);
    });

    it('should return null if location is not found', async () => {
      jest.spyOn(ambienteRepository, 'findOne').mockResolvedValue(null);

      const result = await service.listaDevicesInLocation(1);

      expect(result).toBeNull();
    });

    it('should throw an error if an error occurs', async () => {
      jest
        .spyOn(ambienteRepository, 'findOne')
        .mockRejectedValue(new Error('Database error'));

      await expect(service.listaDevicesInLocation(1)).rejects.toThrowError(
        DevicesLocationsError
      );
    });
  });

  describe('updateDevicesInLocation', () => {
    it('should update devices in a location', async () => {
      const mockAmbiente = new Ambiente();
      mockAmbiente.devices = [];
      jest.spyOn(ambienteRepository, 'findOne').mockResolvedValue(mockAmbiente);
      jest.spyOn(deviceRepository, 'findOne').mockResolvedValue(new Device());
      jest.spyOn(ambienteRepository, 'save').mockResolvedValue(mockAmbiente);

      await expect(
        service.updateDevicesInLocation(1, 1)
      ).resolves.not.toThrow();
    });

    it('should throw an error if location is not found', async () => {
      jest.spyOn(ambienteRepository, 'findOne').mockResolvedValue(null);

      await expect(service.updateDevicesInLocation(1, 1)).rejects.toThrowError(
        DevicesLocationsError
      );
    });

    it('should throw an error if device is not found', async () => {
      jest
        .spyOn(ambienteRepository, 'findOne')
        .mockResolvedValue(new Ambiente());
      jest.spyOn(deviceRepository, 'findOne').mockResolvedValue(null);

      await expect(service.updateDevicesInLocation(1, 1)).rejects.toThrowError(
        DevicesLocationsError
      );
    });

    it('should throw an error if device is already associated with the location', async () => {
      const mockAmbiente = new Ambiente();
      mockAmbiente.devices = [new Device()];
      jest.spyOn(ambienteRepository, 'findOne').mockResolvedValue(mockAmbiente);

      await expect(service.updateDevicesInLocation(1, 1)).rejects.toThrowError(
        DevicesLocationsError
      );
    });

    it('should throw an error if an error occurs', async () => {
      jest
        .spyOn(ambienteRepository, 'findOne')
        .mockRejectedValue(new Error('Database error'));

      await expect(service.updateDevicesInLocation(1, 1)).rejects.toThrowError(
        DevicesLocationsError
      );
    });
  });
});
