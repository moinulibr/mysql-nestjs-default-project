import { IsInt, IsPositive, IsString, Length } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @Length(2, 10, { message: 'Name must be between 2 and 10 characters' })
  name: string;

  @IsString()
  @Length(2, 100, { groups: ['create'] })
  @Length(1, 150, { groups: ['update'] })
  description: string;

  @IsInt()
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  area: number;
}
