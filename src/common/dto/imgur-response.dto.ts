export interface ImgurGenericResponseDto {
  id: string;
  datetime: number;
  link: string;
}

export interface ImgurCreateResponseDto extends ImgurGenericResponseDto {
  title?: string;
  description?: string;
  token: string;
}

export interface ImgurReadResponseDto extends ImgurGenericResponseDto {
  title: string | null;
  description: string | null;
}

export interface ImgurUpdateResponseDto extends ImgurGenericResponseDto {
  title?: string;
  description?: string;
}

export interface ImgurRemoveResponseDto extends ImgurGenericResponseDto {
  title: string | null;
  description: string | null;
}
