import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import {
  HomeAssistantService,
  HomeAssistantError,
} from './home_assistant.service';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('HomeAssistantService', () => {
  let homeAssistantService: HomeAssistantService;
  let httpServiceMock: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeAssistantService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    homeAssistantService =
      module.get<HomeAssistantService>(HomeAssistantService);
    httpServiceMock = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(homeAssistantService).toBeDefined();
    expect(httpServiceMock).toBeDefined();
  });

  it('should get entities from Home Assistant successfully', async () => {
    const mockData = [{ id: 'entity1' }, { id: 'entity2' }];
    jest
      .spyOn(httpServiceMock, 'get')
      .mockReturnValueOnce(of({ data: mockData } as AxiosResponse<any[]>));

    const entities = await homeAssistantService.getEntityHA();

    expect(entities).toEqual(mockData);
    expect(httpServiceMock.get).toBeCalledWith(expect.any(String), {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
    });
  });

  it('should throw HomeAssistantError if request to Home Assistant fails', async () => {
    const errorMessage = 'Error fetching entities from Home Assistant';
    jest
      .spyOn(httpServiceMock, 'get')
      .mockReturnValueOnce(throwError({ message: errorMessage }));

    await expect(homeAssistantService.getEntityHA()).rejects.toThrowError(
      HomeAssistantError
    );
  });
});
