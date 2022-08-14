export interface ImgurGenericResponse {
  id: string;
  datetime: number;
  link: string;
}

export interface ImgurCreateResponse extends ImgurGenericResponse {
  title?: string;
  description?: string;
  token: string;
}

export interface ImgurReadResponse extends ImgurGenericResponse {
  title: string | null;
  description: string | null;
}

export interface ImgurUpdateResponse extends ImgurGenericResponse {
  title?: string;
  description?: string;
}

export interface ImgurRemoveResponse extends ImgurGenericResponse {
  title: string | null;
  description: string | null;
}
