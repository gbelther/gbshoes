export type HttpResponse<Body = any> = {
  statusCode: number;
  body?: Body;
};

export enum HttpStatusCode {
  created = 201,
  badRequest = 400,
}
