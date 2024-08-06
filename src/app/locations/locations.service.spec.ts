import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService, LocationsError } from './locations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ambiente } from '../entities/ambiente.entity';

describe('LocationsService', () => {
  let locationsService: LocationsService;
  let locationRepository: Repository<Ambiente>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsService,
        {
          provide: getRepositoryToken(Ambiente),
          useClass: Repository,
        },
      ],
    }).compile();

    locationsService = module.get<LocationsService>(LocationsService);
    locationRepository = module.get<Repository<Ambiente>>(
      getRepositoryToken(Ambiente)
    );
  });

  it('should be defined', () => {
    expect(locationsService).toBeDefined();
  });

  describe('locationsLista', () => {
    it('should return a list of locations from the database', async () => {
      const locations: Ambiente[] = [{ id_ambiente: 1, nome: 'Location 1' }];
      jest.spyOn(locationRepository, 'find').mockResolvedValueOnce(locations);

      const result = await locationsService.locationsLista();

      expect(result).toEqual(locations);
    });

    it('should throw an error if fetching locations from the database fails', async () => {
      const errorMessage = 'Error fetching locations';
      jest
        .spyOn(locationRepository, 'find')
        .mockRejectedValueOnce(new Error(errorMessage));

      await expect(locationsService.locationsLista()).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe('locationsTiposLista', () => {
    it('should return a list of location types from the database', async () => {
      const tipos: any[] = [{ tipo: 'Type 1' }, { tipo: 'Type 2' }];
      jest.spyOn(locationRepository, 'createQueryBuilder').mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        distinct: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValueOnce(tipos),
      } as any);

      const result = await locationsService.locationsTiposLista();

      expect(result).toEqual(['Type 1', 'Type 2']);
    });

    it('should throw an error if fetching location types from the database fails', async () => {
      const errorMessage = 'Error fetching location types';
      jest.spyOn(locationRepository, 'createQueryBuilder').mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        distinct: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
      } as any);

      await expect(locationsService.locationsTiposLista()).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe('locationAdd', () => {
    it('should add a location to the database', async () => {
      const location: Ambiente = { id_ambiente: 1, nome: 'Location 1' };
      jest.spyOn(locationRepository, 'save').mockResolvedValueOnce(location);

      jest.spyOn(locationRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(locationsService.locationAdd(location)).resolves.toEqual(
        location
      );

      expect(locationRepository.findOne).toHaveBeenCalledWith({
        where: { nome: location.nome, tipo: location.tipo },
      });
      expect(locationRepository.save).toHaveBeenCalledWith(location);
    });

    it('should throw an error if saving the location fails', async () => {
      const errorMessage = 'Error adding location';
      jest
        .spyOn(locationRepository, 'save')
        .mockRejectedValueOnce(new Error(errorMessage));

      const invalidLocation: Ambiente = {
        id_ambiente: 1,
        nome: 'Invalid Location',
      };

      jest.spyOn(locationRepository, 'findOne').mockResolvedValueOnce(null);

      const ambiente: Ambiente = {
        id_ambiente: invalidLocation.id_ambiente,
        nome: invalidLocation.nome,
      };

      await expect(locationsService.locationAdd(ambiente)).rejects.toThrowError(
        errorMessage
      );

      expect(locationRepository.findOne).toHaveBeenCalledWith({
        where: { nome: ambiente.nome, tipo: ambiente.tipo },
      });
      expect(locationRepository.save).toHaveBeenCalledWith(ambiente);
    });
  });

  describe('locationUpdate', () => {
    it('should update a location in the database', async () => {
      const updateData = { nome: 'Updated Location' };

      const ambienteMock = { id_ambiente: 1, nome: 'Location 1' };
      jest
        .spyOn(locationRepository, 'findOne')
        .mockResolvedValueOnce(ambienteMock);

      jest
        .spyOn(locationRepository, 'save')
        .mockResolvedValueOnce(ambienteMock);

      await locationsService.locationUpdate(1, updateData);

      expect(locationRepository.findOne).toHaveBeenCalledWith({
        where: { id_ambiente: 1 },
      });

      expect(locationRepository.save).toHaveBeenCalledWith(ambienteMock);
    });

    it('should throw an error if updating the location fails', async () => {
      const errorMessage = 'Ambiente não encontrado';

      jest.spyOn(locationRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(
        locationsService.locationUpdate(1, null)
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe('locationId', () => {
    it('should return a location from the database by ID', async () => {
      const location: Ambiente = { id_ambiente: 1, nome: 'Location 1' };
      jest.spyOn(locationRepository, 'findOne').mockResolvedValueOnce(location);

      const result = await locationsService.locationId(1);

      expect(result).toEqual(location);
    });

    it('should return null if location with given ID is not found in the database', async () => {
      jest.spyOn(locationRepository, 'findOne').mockResolvedValueOnce(null);

      const result = await locationsService.locationId(1);

      expect(result).toBeNull();
    });

    it('should throw an error if fetching the location from the database fails', async () => {
      const errorMessage = 'Error fetching location';
      jest
        .spyOn(locationRepository, 'findOne')
        .mockRejectedValueOnce(new Error(errorMessage));

      await expect(locationsService.locationId(1)).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe('locationDelete', () => {
    it('should delete a location from the database', async () => {
      const mockFindOne = jest.fn().mockResolvedValueOnce(Ambiente);

      const mockRemove = jest.fn().mockResolvedValueOnce(true);

      locationsService['locationRepository'].findOne = mockFindOne;
      locationsService['locationRepository'].remove = mockRemove;

      const result = await locationsService.locationDelete(1);

      expect(mockFindOne).toHaveBeenCalledWith({
        where: { id_ambiente: 1 },
      });

      expect(mockRemove).toHaveBeenCalledWith(Ambiente);

      expect(result).toEqual('Ambiente deletado com sucesso');
    });
  });
});
