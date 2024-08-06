import { Test, TestingModule } from '@nestjs/testing';
import {
  DevicesLocationsService,
  DevicesLocationsError,
} from './devices_locations.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('DevicesLocationsService', () => {
  let devicesLocationsService: DevicesLocationsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevicesLocationsService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            put: jest.fn(),
          },
        },
      ],
    }).compile();

    devicesLocationsService = module.get<DevicesLocationsService>(
      DevicesLocationsService
    );
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(devicesLocationsService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('getDevicesInLocation', () => {
    it('should return devices for a valid location ID', async () => {
      const locationId = 1;
      const responseData = [{ deviceId: 1, locationId }];

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(
          of({ data: responseData } as AxiosResponse<
            { deviceId: number; locationId: number }[]
          >)
        );

      const result =
        await devicesLocationsService.getDevicesInLocation(locationId);

      expect(result).toEqual(responseData);
    });

    it('should throw DevicesLocationsError for an invalid location ID during retrieval', async () => {
      const locationId = 2;

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(new Error('Mocked HTTP error')));

      await expect(
        devicesLocationsService.getDevicesInLocation(locationId)
      ).rejects.toThrowError(DevicesLocationsError);
    });
  });

  describe('updateDevicesInLocation', () => {
    it('should update devices for a valid location ID', async () => {
      const locationId = 1;
      const deviceLocationData = [1, 2, 3];
      const responseData = { success: true };

      jest
        .spyOn(httpService, 'put')
        .mockReturnValueOnce(
          of({ data: responseData } as AxiosResponse<{ success: boolean }>)
        );

      const result = await devicesLocationsService.updateDevicesInLocation(
        locationId,
        deviceLocationData
      );

      expect(result).toEqual(responseData);
    });

    it('should throw DevicesLocationsError for an invalid location ID during update', async () => {
      const locationId = 2;
      const deviceLocationData = [4, 5, 6];

      jest
        .spyOn(httpService, 'put')
        .mockReturnValueOnce(throwError(new Error('Mocked HTTP error')));

      await expect(
        devicesLocationsService.updateDevicesInLocation(
          locationId,
          deviceLocationData
        )
      ).rejects.toThrowError(DevicesLocationsError);
    });
  });
});
