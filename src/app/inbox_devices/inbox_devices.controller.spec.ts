import { Test, TestingModule } from '@nestjs/testing';
import { InboxDevicesController } from './inbox_devices.controller';
import {
  InboxDevicesService,
  InboxDevicesError,
} from './inbox_devices.service';
import { IDevice } from '../interface/device.interface';
import { IAttributes } from '../interface/attributes.interface';

describe('InboxDevicesController', () => {
  let controller: InboxDevicesController;
  let inboxDevicesService: InboxDevicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InboxDevicesController],
      providers: [
        {
          provide: InboxDevicesService,
          useValue: {
            devicesScanDisponiveis: jest.fn(),
            devicesLista: jest.fn(),
            deviceID: jest.fn(),
            deviceAdd: jest.fn(),
            deviceUpdate: jest.fn(),
            deviceDelete: jest.fn(),
            findDevicesByNameOrId: jest.fn(),
            deviceReplace: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<InboxDevicesController>(InboxDevicesController);
    inboxDevicesService = module.get<InboxDevicesService>(InboxDevicesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getInbox', () => {
    it('should return an array of devices', async () => {
      const result: IDevice[] = [
        {
          entity_id: 'device1',
          attributes: {
            id_attributes: 1,
            device_class: 'light',
            friendly_name: 'My Device',
          },
          id_device: 0,
          state: '',
          last_changed: '',
          last_updated: '',
          context: undefined,
          name_device: 'teste',
        },
      ];

      jest
        .spyOn(inboxDevicesService, 'devicesScanDisponiveis')
        .mockResolvedValue(result);

      expect(await controller.getInbox()).toBe(result);
    });

    it('should throw an InboxDevicesError if an error occurs', async () => {
      const errorMessage = 'Error fetching devices';
      jest
        .spyOn(inboxDevicesService, 'devicesScanDisponiveis')
        .mockRejectedValue(new InboxDevicesError(errorMessage));

      await expect(controller.getInbox()).rejects.toThrowError(errorMessage);
    });
  });

  describe('getDevices', () => {
    it('should return an array of devices', async () => {
      const result: IDevice[] = [
        {
          entity_id: 'device1',
          attributes: {
            id_attributes: 1,
            device_class: 'light',
            friendly_name: 'My Device',
          },
          id_device: 0,
          state: '',
          last_changed: '',
          last_updated: '',
          context: undefined,
          name_device: '',
        },
      ];

      jest.spyOn(inboxDevicesService, 'devicesLista').mockResolvedValue(result);

      expect(await controller.getDevices()).toBe(result);
    });

    it('should throw an InboxDevicesError if an error occurs', async () => {
      const errorMessage = 'Error fetching devices';
      jest
        .spyOn(inboxDevicesService, 'devicesLista')
        .mockRejectedValue(new InboxDevicesError(errorMessage));

      await expect(controller.getDevices()).rejects.toThrowError(errorMessage);
    });
  });

  describe('getDeviceById', () => {
    it('should return a device', async () => {
      const result: IDevice = {
        entity_id: 'device1',
        attributes: {
          id_attributes: 1,
          device_class: 'light',
          friendly_name: 'My Device',
        },
        id_device: 0,
        state: '',
        last_changed: '',
        last_updated: '',
        context: undefined,
        name_device: '',
      };

      jest.spyOn(inboxDevicesService, 'deviceID').mockResolvedValue(result);

      expect(await controller.getDeviceById(1)).toEqual(result);
    });

    it('should return null if device is not found', async () => {
      jest.spyOn(inboxDevicesService, 'deviceID').mockResolvedValue(null);

      expect(await controller.getDeviceById(1)).toBe(null);
    });

    it('should throw an InboxDevicesError if an error occurs', async () => {
      const errorMessage = 'Error fetching device';
      jest
        .spyOn(inboxDevicesService, 'deviceID')
        .mockRejectedValue(new InboxDevicesError(errorMessage));

      await expect(controller.getDeviceById(1)).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe('createDevice', () => {
    it('should add a device', async () => {
      const device: IDevice = {
        entity_id: 'device1',
        attributes: {} as IAttributes,
        id_device: 0,
        state: '',
        last_changed: '',
        last_updated: '',
        context: undefined,
        name_device: '',
      };
      await controller.createDevice(device);

      expect(inboxDevicesService.deviceAdd).toHaveBeenCalledWith(device);
    });

    it('should throw an InboxDevicesError if an error occurs', async () => {
      const errorMessage = 'Error adding device';
      jest
        .spyOn(inboxDevicesService, 'deviceAdd')
        .mockRejectedValue(new InboxDevicesError(errorMessage));

      await expect(controller.createDevice(null)).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe('updateDeviceProperties', () => {
    it('should update device properties', async () => {
      const updatedDeviceData: Partial<IDevice> = { entity_id: 'device1' };
      await controller.updateDeviceProperties(1, updatedDeviceData);

      expect(inboxDevicesService.deviceUpdate).toHaveBeenCalledWith(
        1,
        updatedDeviceData
      );
    });

    it('should throw an InboxDevicesError if an error occurs', async () => {
      const errorMessage = 'Error updating device';
      jest
        .spyOn(inboxDevicesService, 'deviceUpdate')
        .mockRejectedValue(new InboxDevicesError(errorMessage));

      await expect(
        controller.updateDeviceProperties(1, null)
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe('deleteDeviceById', () => {
    it('should delete a device', async () => {
      await controller.deleteDeviceById(1);

      expect(inboxDevicesService.deviceDelete).toHaveBeenCalledWith(1);
    });

    it('should throw an InboxDevicesError if an error occurs', async () => {
      const errorMessage = 'Error deleting device';
      jest
        .spyOn(inboxDevicesService, 'deviceDelete')
        .mockRejectedValue(new InboxDevicesError(errorMessage));

      await expect(controller.deleteDeviceById(1)).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe('replaceDevice', () => {
    it('should replace an existing device with new device data', async () => {
      const deviceId = 1;
      const oldDevice: IDevice = {
        entity_id: 'old_device_entity_id',
        attributes: {} as IAttributes,
        id_device: deviceId,
        state: 'old_device_state',
        last_changed: '2024-04-20T12:00:00Z',
        last_updated: '2024-04-20T12:00:00Z',
        context: undefined,
        name_device: 'Old Device',
      };

      jest
        .spyOn(inboxDevicesService, 'deviceReplace')
        .mockResolvedValue(oldDevice);

      const newDeviceData: Partial<IDevice> = {
        entity_id: 'new_device_entity_id',
        state: 'new_device_state',
        last_changed: '2024-04-21T12:00:00Z',
        last_updated: '2024-04-21T12:00:00Z',
        attributes: {} as IAttributes,
        context: undefined,
        name_device: 'New Device',
      };

      const result = await controller.replaceDevice(deviceId, newDeviceData);

      expect(result).toEqual(oldDevice);
    });

    it('should throw an error if the device to replace is not found', async () => {
      const deviceId = 1;
      jest
        .spyOn(inboxDevicesService, 'deviceReplace')
        .mockRejectedValue(
          new InboxDevicesError('Dispositivo anterior não encontrado')
        );

      const newDeviceData: Partial<IDevice> = {
        entity_id: 'new_device_entity_id',
        state: 'new_device_state',
        last_changed: '2024-04-21T12:00:00Z',
        last_updated: '2024-04-21T12:00:00Z',
        attributes: {} as IAttributes,
        context: undefined,
        name_device: 'New Device',
      };

      await expect(
        controller.replaceDevice(deviceId, newDeviceData)
      ).rejects.toThrowError('Dispositivo anterior não encontrado');
    });

    it('should throw an error if an error occurs during replacement', async () => {
      const deviceId = 1;
      const errorMessage = 'Error replacing device';
      jest
        .spyOn(inboxDevicesService, 'deviceReplace')
        .mockRejectedValue(new InboxDevicesError(errorMessage));

      const newDeviceData: Partial<IDevice> = {
        entity_id: 'new_device_entity_id',
        state: 'new_device_state',
        last_changed: '2024-04-21T12:00:00Z',
        last_updated: '2024-04-21T12:00:00Z',
        attributes: {} as IAttributes,
        context: undefined,
        name_device: 'New Device',
      };

      await expect(
        controller.replaceDevice(deviceId, newDeviceData)
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe('findDevicesByNameOrId', () => {
    it('should return a device by name', async () => {
      const searchTerm = 'device_name';
      const result: IDevice = {
        entity_id: 'device1',
        attributes: {} as any,
        id_device: 1,
        state: '',
        last_changed: '',
        last_updated: '',
        context: undefined,
        name_device: searchTerm,
      };
      jest
        .spyOn(inboxDevicesService, 'findDevicesByNameOrId')
        .mockResolvedValue(result);

      expect(await controller.findDevicesByNameOrId(searchTerm)).toEqual(
        result
      );
    });

    it('should return a device by ID', async () => {
      const searchTerm = 1;
      const result: IDevice = {
        entity_id: 'device1',
        attributes: {} as any,
        id_device: searchTerm,
        state: '',
        last_changed: '',
        last_updated: '',
        context: undefined,
        name_device: '',
      };
      jest
        .spyOn(inboxDevicesService, 'findDevicesByNameOrId')
        .mockResolvedValue(result);

      expect(await controller.findDevicesByNameOrId(searchTerm)).toEqual(
        result
      );
    });

    it('should return multiple devices with the same name', async () => {
      const searchTerm = 'device_name';
      const result: IDevice[] = [
        {
          entity_id: 'device1',
          attributes: {} as any,
          id_device: 1,
          state: '',
          last_changed: '',
          last_updated: '',
          context: undefined,
          name_device: searchTerm,
        },
        {
          entity_id: 'device2',
          attributes: {} as any,
          id_device: 2,
          state: '',
          last_changed: '',
          last_updated: '',
          context: undefined,
          name_device: searchTerm,
        },
      ];
      jest
        .spyOn(inboxDevicesService, 'findDevicesByNameOrId')
        .mockResolvedValue(result);

      expect(await controller.findDevicesByNameOrId(searchTerm)).toEqual(
        result
      );
    });

    it('should return null when no device is found', async () => {
      const searchTerm = 'non_existing_device';
      jest
        .spyOn(inboxDevicesService, 'findDevicesByNameOrId')
        .mockResolvedValue(null);

      expect(await controller.findDevicesByNameOrId(searchTerm)).toBeNull();
    });

    it('should throw an InboxDevicesError if an error occurs', async () => {
      const searchTerm = 'error_device';
      const errorMessage = 'Error fetching devices';
      jest
        .spyOn(inboxDevicesService, 'findDevicesByNameOrId')
        .mockRejectedValue(new InboxDevicesError(errorMessage));

      await expect(
        controller.findDevicesByNameOrId(searchTerm)
      ).rejects.toThrowError(errorMessage);
    });
  });
});
