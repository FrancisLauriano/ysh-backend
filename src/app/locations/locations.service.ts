import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

export class LocationsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LocationsError';
  }
}

@Injectable()
export class LocationsService {
  private readonly API_URL = process.env.API_URL;
  private readonly ERR_MSG_PREFIX = 'Erro';

  constructor(private readonly httpService: HttpService) {
    this.API_URL = process.env.API_URL;
  }

  private handleError(error: any, action: string): LocationsError {
    return new LocationsError(
      `${this.ERR_MSG_PREFIX} ${action}: ${error.message}`
    );
  }

  async getLocations(): Promise<object | LocationsError> {
    try {
      const url = `${this.API_URL}//locations`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'get locations');
    }
  }

  async getLocationTypes(): Promise<string[] | LocationsError> {
    try {
      const url = `${this.API_URL}//locations/location_types`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Erro get location types');
    }
  }

  async createLocation(
    label: string,
    location_type: string,
    parent_location_id: number | null
  ): Promise<object | LocationsError> {
    try {
      const locationData = {
        label,
        location_type,
        parent_location_id,
      };
      const url = `${this.API_URL}//locations`;
      const response = await lastValueFrom(
        this.httpService.post(url, locationData)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Erro create location');
    }
  }

  async updateLocation(
    location_id: number,
    label: string,
    location_type: string,
    parent_location_id: number | null
  ): Promise<object | LocationsError> {
    try {
      const locationData = {
        label,
        location_type,
        parent_location_id,
      };
      const url = `${this.API_URL}//locations/${location_id}`;
      const response = await lastValueFrom(
        this.httpService.put(url, locationData)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Erro update location');
    }
  }

  async deleteLocation(location_id: number): Promise<any | LocationsError> {
    try {
      const url = `${this.API_URL}//locations/${location_id}`;
      const response = await lastValueFrom(this.httpService.delete(url));
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Erro delete location');
    }
  }
}
