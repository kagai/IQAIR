import { IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  ts: string;
  @IsNumber()
  aqius: number;
  @IsString()
  mainus: string;
  @IsNumber()
  aqicn: number;
  @IsString()
  maincn: string;
}
