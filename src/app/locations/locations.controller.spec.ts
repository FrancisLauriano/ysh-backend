import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { LocationsService, LocationsError } from './locations.service';
import { IAmbiente } from '../interface/ambiente.interface';

describe('LocationsController', () => {
  let controller: LocationsController;
  let locationsService: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [
        {
          provide: LocationsService,
          useValue: {
            locationsLista: jest.fn(),
            locationsTiposLista: jest.fn(),
            locationAdd: jest.fn(),
            locationUpdate: jest.fn(),
            locationNome: jest.fn(),
            locationDelete: jest.fn(),
            locationId: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LocationsController>(LocationsController);
    locationsService = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getLocations', () => {
    it('should return an array of locations', async () => {
      const locations: IAmbiente[] = [
        {
          id_ambiente: 1,
          nome: 'Living Room',
          devices: [],
        },
        {
          id_ambiente: 2,
          nome: 'Kitchen',
          devices: [],
        },
      ];

      jest
        .spyOn(locationsService, 'locationsLista')
        .mockResolvedValue(locations);

      expect(await controller.getLocations()).toEqual(locations);
    });

    it('should throw a LocationsError if an error occurs', async () => {
      const errorMessage = 'Error fetching locations';
      jest
        .spyOn(locationsService, 'locationsLista')
        .mockRejectedValue(new LocationsError(errorMessage));

      await expect(controller.getLocations()).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe('getLocationTypes', () => {
    it('should return an array of location types', async () => {
      const types: string[] = ['Living Room', 'Kitchen'];

      jest
        .spyOn(locationsService, 'locationsTiposLista')
        .mockResolvedValue(types);

      expect(await controller.getLocationTypes()).toEqual(types);
    });

    it('should throw a LocationsError if an error occurs', async () => {
      const errorMessage = 'Error fetching location types';
      jest
        .spyOn(locationsService, 'locationsTiposLista')
        .mockRejectedValue(new LocationsError(errorMessage));

      await expect(controller.getLocationTypes()).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe('createLocation', () => {
    it('should add a location', async () => {
      const location: IAmbiente = {
        id_ambiente: 1,
        nome: 'Living Room',
        devices: [],
      };

      await controller.createLocation(location);

      expect(locationsService.locationAdd).toHaveBeenCalledWith(location);
    });

    it('should throw a LocationsError if an error occurs', async () => {
      const errorMessage = 'Error adding location';
      jest
        .spyOn(locationsService, 'locationAdd')
        .mockRejectedValue(new LocationsError(errorMessage));

      await expect(controller.createLocation(null)).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe('updateLocation', () => {
    it('should update a location', async () => {
      const locationId = 1;
      const updatedLocationData: Partial<IAmbiente> = {
        nome: 'Updated Living Room',
      };

      await controller.updateLocation(locationId, updatedLocationData);

      expect(locationsService.locationUpdate).toHaveBeenCalledWith(
        locationId,
        updatedLocationData
      );
    });

    it('should throw a LocationsError if an error occurs', async () => {
      const errorMessage = 'Error updating location';
      jest
        .spyOn(locationsService, 'locationUpdate')
        .mockRejectedValue(new LocationsError(errorMessage));

      await expect(controller.updateLocation(1, null)).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe('deleteLocation', () => {
    it('should delete a location', async () => {
      const locationId = 1;

      await controller.deleteLocation(locationId);

      expect(locationsService.locationDelete).toHaveBeenCalledWith(locationId);
    });

    it('should throw a LocationsError if an error occurs', async () => {
      const errorMessage = 'Error deleting location';
      jest
        .spyOn(locationsService, 'locationDelete')
        .mockRejectedValue(new LocationsError(errorMessage));

      await expect(controller.deleteLocation(1)).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe('getLocationById', () => {
    it('should return a location by ID', async () => {
      const id_ambiente = 1;
      const location: IAmbiente = {
        id_ambiente,
        nome: 'Living Room',
        devices: [],
      };

      jest.spyOn(locationsService, 'locationId').mockResolvedValue(location);

      expect(await controller.getLocationById(id_ambiente)).toEqual(location);
    });

    it('should return null if location is not found', async () => {
      const id_ambiente = 1;
      jest.spyOn(locationsService, 'locationId').mockResolvedValue(null);

      expect(await controller.getLocationById(id_ambiente)).toBeNull();
    });

    it('should throw a LocationsError if an error occurs', async () => {
      const id_ambiente = 1;
      const errorMessage = 'Error fetching location';
      jest
        .spyOn(locationsService, 'locationId')
        .mockRejectedValue(new LocationsError(errorMessage));

      await expect(
        controller.getLocationById(id_ambiente)
      ).rejects.toThrowError(errorMessage);
    });
  });
});
