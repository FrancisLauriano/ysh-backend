import { Test, TestingModule } from '@nestjs/testing';
import { DevicesLocationsController } from './devices_locations.controller';
import {
  DevicesLocationsService,
  DevicesLocationsError,
} from './devices_locations.service';

describe('DevicesLocationsController', () => {
  let controller: DevicesLocationsController;
  let service: DevicesLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesLocationsController],
      providers: [
        {
          provide: DevicesLocationsService,
          useValue: {
            getDevicesInLocation: jest.fn(),
            updateDevicesInLocation: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DevicesLocationsController>(
      DevicesLocationsController
    );
    service = module.get<DevicesLocationsService>(DevicesLocationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDevicesInLocation', () => {
    it('should return devices data for a valid location ID', async () => {
      const locationId = 1;
      const mockData = [{ deviceId: 1, locationId }];

      jest.spyOn(service, 'getDevicesInLocation').mockResolvedValue(mockData);

      const result = await controller.getDevicesInLocation(locationId);

      expect(result).toEqual(mockData);
    });

    it('should handle errors during get devices in location', async () => {
      const locationId = 2;

      jest
        .spyOn(service, 'getDevicesInLocation')
        .mockRejectedValue(new DevicesLocationsError('Some error'));

      await expect(
        controller.getDevicesInLocation(locationId)
      ).rejects.toThrowError(DevicesLocationsError);
    });
  });

  describe('updateDevicesInLocation', () => {
    it('should update devices for a valid location ID', async () => {
      const locationId = 1;
      const deviceLocationData = [1, 2, 3];
      const mockData = { success: true };

      jest
        .spyOn(service, 'updateDevicesInLocation')
        .mockResolvedValue(mockData);

      const result = await controller.updateDevicesInLocation(
        locationId,
        deviceLocationData
      );

      expect(result).toEqual(mockData);
    });

    it('should handle errors during update devices in location', async () => {
      const locationId = 2;
      const deviceLocationData = [4, 5, 6];

      jest
        .spyOn(service, 'updateDevicesInLocation')
        .mockRejectedValue(new DevicesLocationsError('Some error'));

      await expect(
        controller.updateDevicesInLocation(locationId, deviceLocationData)
      ).rejects.toThrowError(DevicesLocationsError);
    });
  });
});
