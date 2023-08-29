import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { Logger } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import axios from 'axios';

describe('AppService', () => {
  let appService: AppService;
  let module: TestingModule;
  let logger: Logger;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        AppService,
        Logger,
        {
          provide: 'API_KEY',
          useValue: 'test-key',
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    logger = module.get<Logger>(Logger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await module.close();
  });

  describe('getAirQualityNearestCity', () => {
    it('should return air quality data for a valid location', async () => {
      const lat = 48.856613;
      const lon = 2.352222;
      const apiKey = 'test-key';
      const expectedResponse = {
        data: {
          status: 'success',
          data: {
            city: 'Paris',
            state: 'Ile-de-France',
            country: 'France',
            location: { type: 'Point', coordinates: [2.352222, 48.856613] },
            current: {
              weather: { ts: '2022-01-01T00:00:00.000Z', tp: 10, pr: 1013, hu: 87, ws: 2.6, wd: 70, ic: '01n' },
              pollution: { ts: '2022-01-01T00:00:00.000Z', aqius: 42, mainus: 'p2', aqicn: 23, maincn: 'p1' },
            },
          },
        },
      };

      jest.spyOn(axios, 'get').mockResolvedValueOnce(expectedResponse);

      const result = await appService.getAirQualityNearestCity(lat, lon, apiKey);

      expect(result).toEqual(expectedResponse.data.data.current.pollution);
    });

    it('should throw an error for an invalid API key', async () => {
      const lat = 48.856613;
      const lon = 2.352222;
      const apiKey = 'invalid-key';
      const expectedError = { response: { status: 403 } };

      jest.spyOn(axios, 'get').mockRejectedValueOnce(expectedError);

      await expect(appService.getAirQualityNearestCity(lat, lon, apiKey)).rejects.toEqual(expectedError);
    });

    it('should throw an error for an expired API key', async () => {
      const lat = 48.856613;
      const lon = 2.352222;
      const apiKey = 'expired-key';
      const expectedError = { response: { status: 401 } };

      jest.spyOn(axios, 'get').mockRejectedValueOnce(expectedError);

      await expect(appService.getAirQualityNearestCity(lat, lon, apiKey)).rejects.toEqual(expectedError);
    });

    it('should throw an error for an unknown error', async () => {
      const lat = 48.856613;
      const lon = 2.352222;
      const apiKey = 'test-key';
      const expectedError = { response: {} };

      jest.spyOn(axios, 'get').mockRejectedValueOnce(expectedError);

      await expect(appService.getAirQualityNearestCity(lat, lon, apiKey)).rejects.toEqual(expectedError);
    });
  });
});