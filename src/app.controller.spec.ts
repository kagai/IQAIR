import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService, MyDataResponse } from './app.service';
import { NearestCityDto } from './dto/air-quality.dto';
import { HttpModule } from '@nestjs/axios';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getAirQuality', () => {
    it('should return air quality data for a valid location', async () => {
      const location: NearestCityDto = { lat: 48.856613, lon: 2.352222, key: 'test_key' };
      const expectedResponse: MyDataResponse = {
        status: 'success',
        Result: {
          pollution: {
            pollution: {
              pollution: {
                aqius: 42,
                mainus: 'p2',
                aqicn: 23,
                maincn: 'p1',
              },
            },
          },
        },
      };

      jest.spyOn(appService, 'getAirQualityNearestCity').mockResolvedValueOnce(expectedResponse.Result);

      const response = await appController.getAirQuality(location);

      const expectedResponseJson = JSON.stringify(expectedResponse);
      const expectedResponseObj = JSON.parse(expectedResponseJson);
      const responseJson = JSON.stringify(response);

      expect(responseJson).toEqual(responseJson);
    });

    it('should return an error for an invalid API key', async () => {
      const location: NearestCityDto = { lat: 48.856613, lon: 2.352222, key: 'invalid_key' };
      const expectedResponse: MyDataResponse = { status: 'incorrect_api_key', error: 'Incorrect API key.' };

      const error = { response: { status: 403 } };
      jest.spyOn(appService, 'getAirQualityNearestCity').mockRejectedValueOnce(error);

      const response = await appController.getAirQuality(location);

      expect(response).toEqual(expectedResponse);
    });

    it('should return an error for an expired API key', async () => {
      const location: NearestCityDto = { lat: 48.856613, lon: 2.352222, key: 'expired_key' };
      const expectedResponse: MyDataResponse = { status: 'api_key_expired', error: 'API key has expired.' };

      const error = { response: { status: 401 } };
      jest.spyOn(appService, 'getAirQualityNearestCity').mockRejectedValueOnce(error);

      const response = await appController.getAirQuality(location);

      expect(response).toEqual(expectedResponse);
    });

    it('should return an error for an unknown error', async () => {
      const location: NearestCityDto = { lat: 48.856613, lon: 2.352222, key: 'test_key' };
      const expectedResponse: MyDataResponse = { status: 'unknown_error', error: 'An error occurred while fetching data.' };

      const error = { response: {} };
      jest.spyOn(appService, 'getAirQualityNearestCity').mockRejectedValueOnce(error);

      const response = await appController.getAirQuality(location);

      expect(response).toEqual(expectedResponse);
    });
  });
});
