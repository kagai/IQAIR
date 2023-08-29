import { IsNotEmpty, IsString } from 'class-validator';

export class NearestCityDto {
  @IsNotEmpty()
  lat: number;

  @IsNotEmpty()
  lon: number;

  @IsString()
  @IsNotEmpty()
  key: string;
}
