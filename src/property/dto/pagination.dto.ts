import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  skip: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  limit: number;
}
