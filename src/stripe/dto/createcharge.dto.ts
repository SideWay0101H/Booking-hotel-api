// create-charge.dto.ts
import { IsNumber, IsString } from 'class-validator';

export class CreateChargeDto {
  @IsNumber()
  amount: number;

  @IsString()
  currency: string;
  //
  @IsString()
  source: string;

  @IsString()
  description: string;
}