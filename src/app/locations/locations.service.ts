import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ambiente } from '../entities/ambiente.entity';
import { IAmbiente } from '../interface/ambiente.interface';

export class LocationsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'locationsError';
  }
}

@Injectable()
export class LocationsService {
  private readonly ERR_MSG_PREFIX = 'Erro';

  constructor(
    @InjectRepository(Ambiente)
    private readonly locationRepository: Repository<Ambiente>
  ) {}

  private handleError(error: any, action: string): LocationsError {
    return new LocationsError(
      `${this.ERR_MSG_PREFIX} ${action}: ${error.message}`
    );
  }

  // Método para listar todos os ambientes do banco de dados
  async locationsLista(): Promise<IAmbiente[] | LocationsError> {
    try {
      const locations = await this.locationRepository.find();
      return locations;
    } catch (error) {
      throw this.handleError(error, 'LocationsLista');
    }
  }

  // Método para listar os tipos de ambientes do banco de dados
  async locationsTiposLista(): Promise<string[] | LocationsError> {
    try {
      const tipos = await this.locationRepository
        .createQueryBuilder('ambiente')
        .select('DISTINCT ambiente.tipo', 'tipo')
        .getRawMany();
      return tipos.map((tipo) => tipo.tipo);
    } catch (error) {
      throw this.handleError(error, 'LocationsTiposLista');
    }
  }

  // Método para adicionar um ambiente ao banco de dados
  async locationAdd(ambiente: IAmbiente): Promise<IAmbiente | LocationsError> {
    try {
      if (!this.locationRepository) {
        throw new Error('Location não está definida');
      }

      const existingAmbiente = await this.locationRepository?.findOne({
        where: { nome: ambiente.nome, tipo: ambiente.tipo },
      });

      if (existingAmbiente) {
        throw new Error('Ambiente já existe');
      }

      await this.locationRepository.save(ambiente);
      return ambiente;
    } catch (error) {
      throw this.handleError(error, 'LocationAdd');
    }
  }

  // Método para atualizar informações de um ambiente no banco de dados
  async locationUpdate(
    location_id: number,
    updateLocationData: Partial<IAmbiente>
  ): Promise<IAmbiente | LocationsError> {
    try {
      const ambienteToUpdate = await this.locationRepository.findOne({
        where: { id_ambiente: location_id },
      });

      if (!ambienteToUpdate) {
        throw new Error('Ambiente não encontrado');
      }

      Object.assign(ambienteToUpdate, updateLocationData);

      const updatedAmbiente =
        await this.locationRepository.save(ambienteToUpdate);

      return updatedAmbiente;
    } catch (error) {
      throw this.handleError(error, 'LocationUpdate');
    }
  }

  // Método para buscar um ambiente pelo ID no banco de dados
  async locationId(location_id: number): Promise<any | LocationsError> {
    try {
      const location = await this.locationRepository.findOne({
        where: { id_ambiente: location_id },
      });
      return location;
    } catch (error) {
      throw this.handleError(error, 'LocationID');
    }
  }

  // Método para deletar um ambiente do banco de dados
  async locationDelete(location_id: number): Promise<string | LocationsError> {
    try {
      const ambienteToDelete = await this.locationRepository.findOne({
        where: { id_ambiente: location_id },
      });

      if (!ambienteToDelete) {
        throw new Error('Ambiente não encontrado');
      }

      await this.locationRepository.remove(ambienteToDelete);
      return 'Ambiente deletado com sucesso';
    } catch (error) {
      throw this.handleError(error, 'LocationDelete');
    }
  }
}
