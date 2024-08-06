import { Test, TestingModule } from '@nestjs/testing';
import {
  InboxDevicesService,
  InboxDevicesError,
} from './inbox_devices.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('InboxDevicesService', () => {
  let inboxDevicesService: InboxDevicesService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InboxDevicesService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
          },
        },
      ],
    }).compile();

    inboxDevicesService = module.get<InboxDevicesService>(InboxDevicesService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(inboxDevicesService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  it('should get inbox successfully', async () => {
    const mockData = [{ id: 1, label: 'Device 1' }];
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(
        of({ data: mockData } as AxiosResponse<{ id: number; label: string }[]>)
      );

    const result = await inboxDevicesService.getInbox();

    expect(result).toEqual(mockData);
  });

  it('should handle error during get inbox', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(throwError(new Error('Some error')));

    await expect(inboxDevicesService.getInbox()).rejects.toThrowError(
      InboxDevicesError
    );
  });

  it('should get scan no inbox successfully', async () => {
    const mockData = ['scan1', 'scan2'];
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(of({ data: mockData } as AxiosResponse<string[]>));

    const result = await inboxDevicesService.getScanNoInbox();

    expect(result).toEqual(mockData);
  });

  it('should handle error during get scan no inbox', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(throwError(new Error('Some error')));

    await expect(inboxDevicesService.getScanNoInbox()).rejects.toThrowError(
      InboxDevicesError
    );
  });

  it('should get devices successfully', async () => {
    const mockData = [{ id: 1, label: 'Device 1' }];
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(
        of({ data: mockData } as AxiosResponse<{ id: number; label: string }[]>)
      );

    const result = await inboxDevicesService.getDevices();

    expect(result).toEqual(mockData);
  });

  it('should handle error during get devices', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(throwError(new Error('Some error')));

    await expect(inboxDevicesService.getDevices()).rejects.toThrowError(
      InboxDevicesError
    );
  });

  it('should get device by id successfully', async () => {
    const device_id = 1;
    const mockData = { id: device_id, label: 'Device 1' };
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(
        of({ data: mockData } as AxiosResponse<{ id: number; label: string }>)
      );

    const result = await inboxDevicesService.getDeviceId(device_id);

    expect(result).toEqual(mockData);
  });

  it('should handle error during get device by id', async () => {
    const device_id = 1;
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(throwError(new Error('Some error')));

    await expect(
      inboxDevicesService.getDeviceId(device_id)
    ).rejects.toThrowError(InboxDevicesError);
  });

  it('should create device successfully', async () => {
    const mockData = { id: 1, label: 'Device 1' };
    jest.spyOn(httpService, 'post').mockReturnValueOnce(
      of({
        data: mockData,
      } as AxiosResponse<{ id: number; label: string }>)
    );

    const result = await inboxDevicesService.createDevice('Device 1', 'uid1');

    expect(result).toEqual(mockData);
  });

  it('should handle error during create device', async () => {
    jest
      .spyOn(httpService, 'post')
      .mockReturnValueOnce(throwError(new Error('Some error')));

    await expect(
      inboxDevicesService.createDevice('Device 1', 'uid1')
    ).rejects.toThrowError(InboxDevicesError);
  });

  it('should replace device successfully', async () => {
    const device_id = 1;
    const mockData = { id: device_id, label: 'Replaced Device 1' };
    jest.spyOn(httpService, 'put').mockReturnValueOnce(
      of({
        data: mockData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as AxiosResponse<{ id: number; label: string }>)
    );

    const result = await inboxDevicesService.replaceDevice(
      device_id,
      'new_uid'
    );

    expect(result).toEqual(mockData);
  });

  it('should handle error during replace device', async () => {
    const device_id = 1;
    jest
      .spyOn(httpService, 'put')
      .mockReturnValueOnce(throwError(new Error('Some error')));

    await expect(
      inboxDevicesService.replaceDevice(device_id, 'new_uid')
    ).rejects.toThrowError(InboxDevicesError);
  });

  it('should update device properties successfully', async () => {
    const device_id = 1;
    const mockData = {
      id: device_id,
      name: 'Device 1',
      data: { property: 'value' },
    };
    jest.spyOn(httpService, 'put').mockReturnValueOnce(
      of({
        data: mockData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as AxiosResponse<{
        id: number;
        name: string;
        data: { property: string };
      }>)
    );

    const result = await inboxDevicesService.updateDeviceProperties(
      device_id,
      'Device 1',
      { property: 'value' }
    );

    expect(result).toEqual(mockData);
  });

  it('should handle error during update device properties', async () => {
    const device_id = 1;
    jest
      .spyOn(httpService, 'put')
      .mockReturnValueOnce(throwError(new Error('Some error')));

    await expect(
      inboxDevicesService.updateDeviceProperties(device_id, 'Device 1', {
        property: 'value',
      })
    ).rejects.toThrowError(InboxDevicesError);
  });
});
