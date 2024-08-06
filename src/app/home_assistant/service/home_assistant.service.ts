import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

export class HomeAssistantError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HomeAssistantError ';
  }
}

@Injectable()
export class HomeAssistantService {
  private readonly API_URL_HA = process.env.API_URL_HA;
  private readonly TOKEN = process.env.TOKEN;
  private readonly ERR_MSG_PREFIX = 'Erro';

  constructor(private readonly httpService: HttpService) {
    this.API_URL_HA = process.env.API_URL_HA;
    this.TOKEN = process.env.TOKEN;
  }

  private handleError(error: any, action: string): HomeAssistantError {
    return new HomeAssistantError(
      `${this.ERR_MSG_PREFIX} ${action}: ${error.message}`
    );
  }

  async getEntityHA(): Promise<any[] | HomeAssistantError> {
    try {
      const url = `${this.API_URL_HA}/api/states`;
      const config = {
        headers: { Authorization: `Bearer ${this.TOKEN}` },
      };
      const response = await lastValueFrom(this.httpService.get(url, config));
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'get entity HA');
    }
  }
}
