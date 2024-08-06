import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { LocationsService, LocationsError } from './locations.service';

describe('LocationsController', () => {
  let controller: LocationsController;
  let service: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [
        {
          provide: LocationsService,
          useValue: {
            getLocations: jest.fn(),
            getLocationTypes: jest.fn(),
            createLocation: jest.fn(),
            updateLocation: jest.fn(),
            deleteLocation: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LocationsController>(LocationsController);
    service = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getLocations', () => {
    it('should return locations data', async () => {
      const mockData = [{ id: 1, label: 'Location 1' }];
      jest.spyOn(service, 'getLocations').mockResolvedValue(mockData);

      const result = await controller.getLocations();

      expect(result).toEqual(mockData);
    });

    it('should handle errors during get locations', async () => {
      jest
        .spyOn(service, 'getLocations')
        .mockRejectedValue(new LocationsError('Some error'));

      await expect(controller.getLocations()).rejects.toThrowError(
        LocationsError
      );
    });
  });

  describe('getLocationTypes', () => {
    it('should return location types', async () => {
      const mockData = ['Type1', 'Type2'];
      jest.spyOn(service, 'getLocationTypes').mockResolvedValue(mockData);

      const result = await controller.getLocationTypes();

      expect(result).toEqual(mockData);
    });

    it('should handle errors during get location types', async () => {
      jest
        .spyOn(service, 'getLocationTypes')
        .mockRejectedValue(new LocationsError('Some error'));

      await expect(controller.getLocationTypes()).rejects.toThrowError(
        LocationsError
      );
    });
  });

  describe('createLocation', () => {
    it('should create a location successfully', async () => {
      const createLocationDto = {
        label: 'Location 1',
        location_type: 'Type1',
        parent_location_id: null,
      };
      const mockData = { id: 1, label: 'Location 1' };
      jest.spyOn(service, 'createLocation').mockResolvedValue(mockData);

      const result = await controller.createLocation(createLocationDto);

      expect(result).toEqual(mockData);
    });

    it('should handle errors during create location', async () => {
      const createLocationDto = {
        label: 'Location 1',
        location_type: 'Type1',
        parent_location_id: null,
      };
      jest
        .spyOn(service, 'createLocation')
        .mockRejectedValue(new LocationsError('Some error'));

      await expect(
        controller.createLocation(createLocationDto)
      ).rejects.toThrowError(LocationsError);
    });
  });

  describe('updateLocation', () => {
    it('should update a location successfully', async () => {
      const updateLocationDto = {
        label: 'Updated Location',
        location_type: 'Type2',
        parent_location_id: 2,
      };
      const mockData = { id: 1, label: 'Updated Location' };
      jest.spyOn(service, 'updateLocation').mockResolvedValue(mockData);

      const result = await controller.updateLocation(1, updateLocationDto);

      expect(result).toEqual(mockData);
    });

    it('should handle errors during update location', async () => {
      const updateLocationDto = {
        label: 'Updated Location',
        location_type: 'Type2',
        parent_location_id: 2,
      };
      jest
        .spyOn(service, 'updateLocation')
        .mockRejectedValue(new LocationsError('Some error'));

      await expect(
        controller.updateLocation(1, updateLocationDto)
      ).rejects.toThrowError(LocationsError);
    });
  });

  describe('deleteLocation', () => {
    it('should delete a location successfully', async () => {
      jest
        .spyOn(service, 'deleteLocation')
        .mockResolvedValue({ success: true });

      const result = await controller.deleteLocation(1);

      expect(result).toEqual({ success: true });
    });

    it('should handle errors during delete location', async () => {
      jest
        .spyOn(service, 'deleteLocation')
        .mockRejectedValue(new LocationsError('Some error'));

      await expect(controller.deleteLocation(1)).rejects.toThrowError(
        LocationsError
      );
    });
  });
});
