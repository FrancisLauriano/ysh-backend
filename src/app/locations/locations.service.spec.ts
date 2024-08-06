import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService, LocationsError } from './locations.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('LocationsService', () => {
  let devicesLocationsService: LocationsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    devicesLocationsService = module.get<LocationsService>(LocationsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(devicesLocationsService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  it('should get locations successfully', async () => {
    const mockData = { some: 'data' };
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(
        of({ data: mockData } as AxiosResponse<{ some: string }>)
      );

    const result = await devicesLocationsService.getLocations();

    expect(result).toEqual(mockData);
  });

  it('should handle error during get locations', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(throwError(new Error('Some error')));

    await expect(devicesLocationsService.getLocations()).rejects.toThrowError(
      LocationsError
    );
  });

  it('should get location types successfully', async () => {
    const mockData = ['type1', 'type2'];
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(
        of({ data: ['type1', 'type2'] } as AxiosResponse<string[]>)
      );

    const result = await devicesLocationsService.getLocationTypes();

    expect(result).toEqual(mockData);
  });

  it('should handle error during get location types', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(throwError(new Error('Some error')));

    await expect(
      devicesLocationsService.getLocationTypes()
    ).rejects.toThrowError(LocationsError);
  });

  it('should create location successfully', async () => {
    const mockData = { id: 1, label: 'Location 1' };
    jest.spyOn(httpService, 'post').mockReturnValueOnce(
      of({ data: { id: 1, label: 'Location 1' } } as AxiosResponse<{
        id: number;
        label: string;
      }>)
    );

    const result = await devicesLocationsService.createLocation(
      'Location 1',
      'type1',
      null
    );

    expect(result).toEqual(mockData);
  });

  it('should handle error during create location', async () => {
    jest
      .spyOn(httpService, 'post')
      .mockReturnValueOnce(throwError(new Error('Some error')));

    await expect(
      devicesLocationsService.createLocation('Location 1', 'type1', null)
    ).rejects.toThrowError(LocationsError);
  });

  it('should update location successfully', async () => {
    const mockData = { id: 1, label: 'Updated Location 1' };
    jest.spyOn(httpService, 'put').mockReturnValueOnce(
      of({
        data: { id: 1, label: 'Updated Location 1' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as AxiosResponse<{ id: number; label: string }>)
    );

    const result = await devicesLocationsService.updateLocation(
      1,
      'Updated Location 1',
      'type1',
      null
    );

    expect(result).toEqual(mockData);
  });

  it('should handle error during update location', async () => {
    jest
      .spyOn(httpService, 'put')
      .mockReturnValueOnce(throwError(new Error('Some error')));

    await expect(
      devicesLocationsService.updateLocation(
        1,
        'Updated Location 1',
        'type1',
        null
      )
    ).rejects.toThrowError(LocationsError);
  });

  it('should delete location successfully', async () => {
    const mockData = { message: 'Location deleted successfully' };
    jest.spyOn(httpService, 'delete').mockReturnValueOnce(
      of({
        data: { message: 'Location deleted successfully' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as AxiosResponse<{ message: string }>)
    );

    const result = await devicesLocationsService.deleteLocation(1);

    expect(result).toEqual(mockData);
  });

  it('should handle error during delete location', async () => {
    jest
      .spyOn(httpService, 'delete')
      .mockReturnValueOnce(throwError(new Error('Some error')));

    await expect(
      devicesLocationsService.deleteLocation(1)
    ).rejects.toThrowError(LocationsError);
  });
});
