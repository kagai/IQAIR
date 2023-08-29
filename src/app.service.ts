import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  private readonly nearestCityUrl = `${process.env.AIR_QUALITY_BASE_URL}/nearest_city`;
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return JSON.stringify({
      message: 'Hello World!',
    });
  }

  healthCheck(): string {
    return JSON.stringify({
      message: 'up',
    });
  }

  async getAirQualityNearestCity(lat: number, lon: number, key: string): Promise<Response> {
    const params = {
      lat: lat.toString(),
      lon: lon.toString(),
      key,
    };

    try {
      const response = await axios.get(`${this.nearestCityUrl}`, { params });

      this.logger.debug(`getAirQualityNearestCity result: ${JSON.stringify(response.data.data.current.pollution)}`);

      return response.data.data.current.pollution;
    } catch (error) {
      this.logger.error(`getAirQualityNearestCity error: ${JSON.stringify(error)}`);
      throw error;
    }
  }
}

interface Location {
  type: string;
  coordinates: number[];
}

interface Pollution {
  ts: string;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
}

interface Weather {
  ts: string;
  tp: number;
  pr: number;
  hu: number;
  ws: number;
  wd: number;
  ic: string;
}

interface Current {
  pollution: Pollution;
  weather: Weather;
}

interface Data {
  city: string;
  state: string;
  country: string;
  location: Location;
  current: Current;
}

interface Response {
  ts: string | number | Date;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
  status: string;
  data: Pollution;
}

export interface MyDataResponse {
  status:
    | 'success'
    | 'call_limit_reached'
    | 'api_key_expired'
    | 'incorrect_api_key'
    | 'ip_location_failed'
    | 'no_nearest_station'
    | 'feature_not_available'
    | 'too_many_requests'
    | 'unknown_error'
    | 'error';
  data?: Data;
  error?: string;
  Result?: any;
}
