import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import {
  InboxDevicesService,
  InboxDevicesError,
} from './inbox_devices.service';
import { HomeAssistantService } from '../home_assistant/service/home_assistant.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Device } from '../entities/device.entity';
import { Attributes } from '../entities/attributes.entity';
import { Context } from '../entities/context.entity';

describe('InboxDevicesService', () => {
  let inboxDevicesService: InboxDevicesService;
  let homeAssistantService: HomeAssistantService;
  let deviceRepository: Repository<Device>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        InboxDevicesService,
        HomeAssistantService,
        {
          provide: getRepositoryToken(Device),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
      ],
    }).compile();

    inboxDevicesService = module.get<InboxDevicesService>(InboxDevicesService);
    homeAssistantService =
      module.get<HomeAssistantService>(HomeAssistantService);
    deviceRepository = module.get<Repository<Device>>(
      getRepositoryToken(Device)
    );
  });

  it('should be defined', () => {
    expect(inboxDevicesService).toBeDefined();
  });

  describe('devicesScanDisponiveis', () => {
    it('should return an array of available devices', async () => {
      jest.spyOn(homeAssistantService, 'getEntityHA').mockResolvedValueOnce([
        { entity_id: 'device1', attributes: { device_class: 'light' } },
        { entity_id: 'device2', attributes: { device_class: 'switch' } },
      ]);
      jest.spyOn(deviceRepository, 'find').mockResolvedValueOnce([
        {
          entity_id: 'device1',
          id_device: 0,
          state: '',
          last_changed: '',
          last_updated: '',
          attributes: new Attributes(),
          context: new Context(),
          name_device: '',
        },
      ]);

      const result = await inboxDevicesService.devicesScanDisponiveis();

      expect(result).toEqual([
        { entity_id: 'device2', attributes: { device_class: 'switch' } },
      ]);
    });

    it('should throw an error if external service call fails', async () => {
      const errorMessage = 'Error fetching devices';
      jest
        .spyOn(homeAssistantService, 'getEntityHA')
        .mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        inboxDevicesService.devicesScanDisponiveis()
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe('deviceAdd', () => {
    it('should add a device to the database', async () => {
      const device: Device = {
        id_device: 1,
        entity_id: 'test_device',
        state: '',
        last_changed: '',
        last_updated: '',
        attributes: null,
        context: null,
        name_device: '',
      };
      jest.spyOn(deviceRepository, 'save').mockResolvedValueOnce(device);

      const result = await inboxDevicesService.deviceAdd(device);

      expect(result).toEqual(device);
    });

    it('should throw an error if saving the device fails', async () => {
      const errorMessage = 'Error adding device';
      jest
        .spyOn(deviceRepository, 'save')
        .mockRejectedValueOnce(new Error(errorMessage));

      const invalidDevice = {
        id_device: 1,
        entity_id: 'test_device',
        state: '',
        last_changed: '',
        last_updated: '',
        attributes: null,
        context: null,
        name_device: '',
      };
      await expect(
        inboxDevicesService.deviceAdd(invalidDevice)
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe('deviceUpdate', () => {
    it('should update a device in the database', async () => {
      const updatedDeviceData = { state: 'updated_state' };
      const deviceToUpdate: Device = {
        id_device: 1,
        entity_id: 'device1',
        state: '',
        last_changed: '',
        last_updated: '',
        attributes: null,
        context: null,
        name_device: 'teste',
      };
      jest
        .spyOn(deviceRepository, 'findOne')
        .mockResolvedValueOnce(deviceToUpdate);
      jest
        .spyOn(deviceRepository, 'save')
        .mockResolvedValueOnce(updatedDeviceData as any);

      const result = await inboxDevicesService.deviceUpdate(
        1,
        updatedDeviceData
      );

      expect(result).toEqual(updatedDeviceData as any);
    });

    it('should throw an error if updating the device fails', async () => {
      jest.spyOn(deviceRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(
        inboxDevicesService.deviceUpdate(1, null)
      ).rejects.toThrowError('Dispositivo não encontrado');
    });
  });

  describe('devicesLista', () => {
    it('should return a list of devices from the database', async () => {
      const devices: Device[] = [
        {
          id_device: 1,
          entity_id: 'device1',
          state: '',
          last_changed: '',
          last_updated: '',
          attributes: null,
          context: null,
          name_device: '',
        },
      ];
      jest.spyOn(deviceRepository, 'find').mockResolvedValueOnce(devices);

      const result = await inboxDevicesService.devicesLista();

      expect(result).toEqual(devices);
    });

    it('should throw an error if fetching devices from the database fails', async () => {
      const errorMessage = 'Error fetching devices';
      jest
        .spyOn(deviceRepository, 'find')
        .mockRejectedValueOnce(new Error(errorMessage));

      await expect(inboxDevicesService.devicesLista()).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe('deviceID', () => {
    it('should return a device from the database by ID', async () => {
      const device: Device = {
        id_device: 1,
        entity_id: 'device1',
        state: '',
        last_changed: '',
        last_updated: '',
        attributes: null,
        context: null,
        name_device: '',
      };
      jest.spyOn(deviceRepository, 'findOne').mockResolvedValueOnce(device);

      const result = await inboxDevicesService.deviceID(1);

      expect(result).toEqual(device);
    });

    it('should return null if device with given ID is not found in the database', async () => {
      const errorMessage = 'Erro DeviceID: Dispositivo não encontrado';
      const deviceId = 999;
      jest.spyOn(deviceRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(inboxDevicesService.deviceID(deviceId)).rejects.toThrowError(
        errorMessage
      );
    });

    it('should throw an error if fetching the device from the database fails', async () => {
      const errorMessage = 'Error fetching device';
      jest
        .spyOn(deviceRepository, 'findOne')
        .mockRejectedValueOnce(new Error(errorMessage));

      await expect(inboxDevicesService.deviceID(1)).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe('deviceDelete', () => {
    it('should delete a device from the database', async () => {
      const deviceToDeleteId = 1;

      const deviceToDelete: Device = {
        id_device: deviceToDeleteId,
        entity_id: '',
        state: '',
        last_changed: '',
        last_updated: '',
        attributes: new Attributes(),
        context: new Context(),
        name_device: '',
      };

      jest
        .spyOn(deviceRepository, 'findOne')
        .mockResolvedValueOnce(deviceToDelete);
      jest
        .spyOn(deviceRepository, 'remove')
        .mockResolvedValueOnce(deviceToDelete);

      const result = await inboxDevicesService.deviceDelete(deviceToDeleteId);

      expect(result).toEqual('Dispositivo deletado com sucesso');
    });

    it('should throw an error if deleting the device from the database fails', async () => {
      jest
        .spyOn(deviceRepository, 'remove')
        .mockRejectedValueOnce(new Error('Dispositivo não encontrado'));

      await expect(async () => {
        await inboxDevicesService.deviceDelete(1);
      }).rejects.toThrowError('Erro DeviceDelete: Dispositivo não encontrado');
    });
  });

  describe('deviceReplace', () => {
    it('should replace an existing device with new device data', async () => {
      const oldDeviceId = 1;
      const oldDevice: Device = {
        id_device: oldDeviceId,
        name_device: 'Old Device',
        entity_id: 'old_device_entity_id',
        state: 'old_device_state',
        last_changed: '2024-04-20T12:00:00Z',
        last_updated: '2024-04-20T12:00:00Z',
        attributes: new Attributes(),
        context: new Context(),
        ambiente: null,
      };

      jest.spyOn(deviceRepository, 'findOne').mockResolvedValueOnce(oldDevice);

      const newDeviceData = {
        entity_id: 'new_device_entity_id',
        state: 'new_device_state',
        last_changed: '2024-04-21T12:00:00Z',
        last_updated: '2024-04-21T12:00:00Z',
        attributes: new Attributes(),
        context: new Context(),
        ambiente: null,
      };

      const savedNewDevice = {
        ...oldDevice,
        entity_id: newDeviceData.entity_id,
        state: newDeviceData.state,
        last_changed: newDeviceData.last_changed,
        last_updated: newDeviceData.last_updated,
        attributes: newDeviceData.attributes,
        context: newDeviceData.context,
      };
      jest
        .spyOn(deviceRepository, 'save')
        .mockResolvedValueOnce(savedNewDevice);

      const result = await inboxDevicesService.deviceReplace(
        oldDeviceId,
        newDeviceData
      );

      expect(result).toEqual(savedNewDevice);
    });

    it('should throw an error if the old device is not found', async () => {
      jest.spyOn(deviceRepository, 'findOne').mockResolvedValueOnce(null);

      const newDeviceData = {
        entity_id: 'new_device_entity_id',
        state: 'new_device_state',
        last_changed: '2024-04-21T12:00:00Z',
        last_updated: '2024-04-21T12:00:00Z',
        attributes: new Attributes(),
        context: new Context(),
        ambiente: null,
      };

      await expect(
        inboxDevicesService.deviceReplace(1, newDeviceData)
      ).rejects.toThrowError('Dispositivo anterior não encontrado');
    });
  });

  describe('findDevicesByNameOrId', () => {
    it('should return a device by name', async () => {
      const searchTerm = 'device_name';
      const deviceMock = [{ id_device: 1, name_device: searchTerm } as Device];
      const mockQueryBuilder = {
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(deviceMock),
      } as unknown as SelectQueryBuilder<Device>;
      jest
        .spyOn(deviceRepository, 'createQueryBuilder')
        .mockReturnValueOnce(mockQueryBuilder);

      const result =
        await inboxDevicesService.findDevicesByNameOrId(searchTerm);

      expect(result).toEqual(deviceMock);
    });

    it('should return a device by ID', async () => {
      const searchTerm = 1;
      const deviceMock = [{ id_device: searchTerm } as Device];
      const mockQueryBuilder = {
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(deviceMock),
      } as unknown as SelectQueryBuilder<Device>;
      jest
        .spyOn(deviceRepository, 'createQueryBuilder')
        .mockReturnValueOnce(mockQueryBuilder);

      const result =
        await inboxDevicesService.findDevicesByNameOrId(searchTerm);

      expect(result).toEqual(deviceMock);
    });

    it('should return null when no device is found', async () => {
      const searchTerm = 'non_existing_device';
      const deviceMock: Device[] = [];
      const mockQueryBuilder = {
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(deviceMock),
      } as unknown as SelectQueryBuilder<Device>;
      jest
        .spyOn(deviceRepository, 'createQueryBuilder')
        .mockReturnValueOnce(mockQueryBuilder);

      const result =
        await inboxDevicesService.findDevicesByNameOrId(searchTerm);

      expect(result).toEqual([]);
    });
  });
});
