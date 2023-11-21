import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  link: string;
}
export class UpdateBookmarkDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  link?: string;
}
export class GetAllBookmarksData {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  link: string;
}

export class GetAllBookmarksDto {
  data: GetAllBookmarksData;
  @IsOptional()
  page: number;
  @IsOptional()
  perPage: number;
  @IsOptional()
  total: number;
  @IsOptional()
  totalPages: number;
}
