import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

export class InboxDevicesError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InboxDevicesError';
  }
}

@Injectable()
export class InboxDevicesService {
  private readonly API_URL = process.env.API_URL;
  private readonly ERR_MSG_PREFIX = 'Erro';

  constructor(private readonly httpService: HttpService) {
    this.API_URL = process.env.API_URL;
  }

  private handleError(error: any, action: string): InboxDevicesError {
    return new InboxDevicesError(
      `${this.ERR_MSG_PREFIX} ${action}: ${error.message}`
    );
  }

  async getInbox(): Promise<any[] | InboxDevicesError> {
    try {
      const url = `${this.API_URL}/inbox`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'get inbox');
    }
  }

  async getScanNoInbox(): Promise<string[] | InboxDevicesError> {
    try {
      const url = `${this.API_URL}/inbox/scan`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'get scan no inbox');
    }
  }

  async getDevices(): Promise<any[] | InboxDevicesError> {
    try {
      const url = `${this.API_URL}//devices`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'get devices');
    }
  }

  async getDeviceId(device_id: number): Promise<object | InboxDevicesError> {
    try {
      const url = `${this.API_URL}//devices/${device_id}`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'get devices id');
    }
  }

  async createDevice(
    label: string,
    openhab_uid: string
  ): Promise<object | InboxDevicesError> {
    try {
      const inboxDeviceData = {
        label,
        openhab_uid,
      };
      const url = `${this.API_URL}//devices`;
      const response = await lastValueFrom(
        this.httpService.post(url, inboxDeviceData)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'create devices');
    }
  }

  async replaceDevice(
    device_Id: number,
    openhab_uid: string
  ): Promise<object | InboxDevicesError> {
    try {
      const deviceReplaceData = {
        device_Id,
        openhab_uid,
      };
      const url = `${this.API_URL}//devices/${device_Id}/replace`;
      const response = await lastValueFrom(
        this.httpService.put(url, deviceReplaceData)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'replace devices');
    }
  }

  async updateDeviceProperties(
    device_Id: number,
    name: string,
    data: object
  ): Promise<object | InboxDevicesError> {
    try {
      const devicePropertiesData = {
        name,
        data,
      };
      const url = `${this.API_URL}//devices/${device_Id}/properties`;
      const response = await lastValueFrom(
        this.httpService.put(url, devicePropertiesData)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'update device propertie');
    }
  }
}
