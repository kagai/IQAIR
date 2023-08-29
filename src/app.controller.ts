import { Controller, Get, Logger, Query, ValidationPipe } from '@nestjs/common';
import { AppService, MyDataResponse } from './app.service';
import { NearestCityDto } from './dto/air-quality.dto';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/nearest_city')
  async getAirQuality(@Query(ValidationPipe) location: NearestCityDto): Promise<MyDataResponse> {
    const { lat, lon, key } = location;
    this.logger.debug(`getAirQualityNearestCity location: ${JSON.stringify(location)}`);

    try {
      const response = await this.appService.getAirQualityNearestCity(lat, lon, key);

      const responseData = {
        pollution: response,
      };

      return {
        status: 'success',
        Result: responseData,
      };
    } catch (error) {
      if (error.response && error.response.status) {
        const statusCode = error.response.status;
        let status: MyDataResponse['status'] = 'error';
        let errorMessage: string;

        switch (statusCode) {
          case 403:
            status = 'incorrect_api_key';
            errorMessage = 'Incorrect API key.';
            break;
          case 401:
            status = 'api_key_expired';
            errorMessage = 'API key has expired.';
            break;
          // Handle other error status codes here
          default:
            status = 'unknown_error';
            errorMessage = 'An error occurred.';
            break;
        }

        return { status, error: errorMessage };
      } else {
        return { status: 'unknown_error', error: 'An error occurred while fetching data.' };
      }
    }
  }

  @Get('/health-check')
  healthCheck(): string {
    return this.appService.healthCheck();
  }
}
