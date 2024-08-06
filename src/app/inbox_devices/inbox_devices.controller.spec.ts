import { Test, TestingModule } from '@nestjs/testing';
import { InboxDevicesController } from './inbox_devices.controller';
import {
  InboxDevicesService,
  InboxDevicesError,
} from './inbox_devices.service';

describe('InboxDevicesController', () => {
  let controller: InboxDevicesController;
  let service: InboxDevicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InboxDevicesController],
      providers: [
        {
          provide: InboxDevicesService,
          useValue: {
            getInbox: jest.fn(),
            getScanNoInbox: jest.fn(),
            getDevices: jest.fn(),
            getDeviceId: jest.fn(),
            createDevice: jest.fn(),
            replaceDevice: jest.fn(),
            updateDeviceProperties: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<InboxDevicesController>(InboxDevicesController);
    service = module.get<InboxDevicesService>(InboxDevicesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getInbox', () => {
    it('should return inbox data', async () => {
      const mockData = [{ id: 1, label: 'Device 1' }];
      jest.spyOn(service, 'getInbox').mockResolvedValue(mockData);

      const result = await controller.getInbox();

      expect(result).toEqual(mockData);
    });

    it('should handle errors', async () => {
      jest
        .spyOn(service, 'getInbox')
        .mockRejectedValue(new Error('Some error'));

      await expect(controller.getInbox()).rejects.toThrowError(
        InboxDevicesError
      );
    });
  });

  describe('getScanNoInbox', () => {
    it('should return scan data', async () => {
      const mockData = ['Device 1'];
      jest.spyOn(service, 'getScanNoInbox').mockResolvedValue(mockData);

      const result = await controller.getScanNoInbox();

      expect(result).toEqual(mockData);
    });

    it('should handle errors', async () => {
      jest
        .spyOn(service, 'getScanNoInbox')
        .mockRejectedValue(new Error('Some error'));

      await expect(controller.getScanNoInbox()).rejects.toThrowError(
        InboxDevicesError
      );
    });
  });

  describe('getDevices', () => {
    it('should return devices data', async () => {
      const mockData = [{ id: 1, label: 'Device 1' }];
      jest.spyOn(service, 'getDevices').mockResolvedValue(mockData);

      const result = await controller.getDevices();

      expect(result).toEqual(mockData);
    });

    it('should handle errors', async () => {
      jest
        .spyOn(service, 'getDevices')
        .mockRejectedValue(new Error('Some error'));

      await expect(controller.getDevices()).rejects.toThrowError(
        InboxDevicesError
      );
    });
  });

  describe('getDeviceById', () => {
    it('should return device data by ID', async () => {
      const mockData = { id: 1, label: 'Device 1' };
      jest.spyOn(service, 'getDeviceId').mockResolvedValue(mockData);

      const result = await controller.getDeviceById(1);

      expect(result).toEqual(mockData);
    });

    it('should handle errors', async () => {
      jest
        .spyOn(service, 'getDeviceId')
        .mockRejectedValue(new Error('Some error'));

      await expect(controller.getDeviceById(1)).rejects.toThrowError(
        InboxDevicesError
      );
    });
  });

  describe('createDevice', () => {
    it('should create a device successfully', async () => {
      const createDeviceDto = { label: 'Device 1', openhab_uid: 'uid1' };
      const mockData = { id: 1, label: 'Device 1' };
      jest.spyOn(service, 'createDevice').mockResolvedValue(mockData);

      const result = await controller.createDevice(createDeviceDto);

      expect(result).toEqual(mockData);
    });

    it('should handle errors', async () => {
      const createDeviceDto = { label: 'Device 1', openhab_uid: 'uid1' };
      jest
        .spyOn(service, 'createDevice')
        .mockRejectedValue(new Error('Some error'));

      await expect(
        controller.createDevice(createDeviceDto)
      ).rejects.toThrowError(InboxDevicesError);
    });
  });

  describe('replaceDevice', () => {
    it('should replace a device successfully', async () => {
      const replaceDeviceDto = { openhab_uid: 'uid1' };
      const mockData = { id: 1, label: 'Device 1' };
      jest.spyOn(service, 'replaceDevice').mockResolvedValue(mockData);

      const result = await controller.replaceDevice(1, replaceDeviceDto);

      expect(result).toEqual(mockData);
    });

    it('should handle errors', async () => {
      const replaceDeviceDto = { openhab_uid: 'uid1' };
      jest
        .spyOn(service, 'replaceDevice')
        .mockRejectedValue(new Error('Some error'));

      await expect(
        controller.replaceDevice(1, replaceDeviceDto)
      ).rejects.toThrowError(InboxDevicesError);
    });
  });

  describe('updateDeviceProperties', () => {
    it('should update device properties successfully', async () => {
      const updateDevicePropertiesDto = {
        name: 'property1',
        data: { key: 'value' },
      };
      const mockData = {
        id: 1,
        label: 'Device 1',
        property1: { key: 'value' },
      };
      jest.spyOn(service, 'updateDeviceProperties').mockResolvedValue(mockData);

      const result = await controller.updateDeviceProperties(
        1,
        updateDevicePropertiesDto
      );

      expect(result).toEqual(mockData);
    });

    it('should handle errors', async () => {
      const updateDevicePropertiesDto = {
        name: 'property1',
        data: { key: 'value' },
      };
      jest
        .spyOn(service, 'updateDeviceProperties')
        .mockRejectedValue(new Error('Some error'));

      await expect(
        controller.updateDeviceProperties(1, updateDevicePropertiesDto)
      ).rejects.toThrowError(InboxDevicesError);
    });
  });
});
