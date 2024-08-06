import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

export class DevicesLocationsError extends Error {
  details: any;
  constructor(message: string) {
    super(message);
    this.name = 'DevicesLocationsError';
  }
}

@Injectable()
export class DevicesLocationsService {
  private readonly API_URL = process.env.API_URL;
  private readonly ERR_MSG_PREFIX = 'Erro';

  constructor(private readonly httpService: HttpService) {
    this.API_URL = process.env.API_URL;
  }

  private handleError(error: any, action: string): DevicesLocationsError {
    return new DevicesLocationsError(
      `${this.ERR_MSG_PREFIX} ${action}: ${error.message}`
    );
  }

  async getDevicesInLocation(
    location_id: number
  ): Promise<any[] | DevicesLocationsError> {
    try {
      const url = `${this.API_URL}//locations/${location_id}/devices`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'get devices in location');
    }
  }

  async updateDevicesInLocation(
    location_id: number,
    deviceLocationData: number[]
  ): Promise<any | DevicesLocationsError> {
    try {
      const url = `${this.API_URL}//locations/${location_id}/devices`;
      const response = await lastValueFrom(
        this.httpService.put(url, deviceLocationData)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'update devices in location');
    }
  }
}
