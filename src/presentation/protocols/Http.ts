export type HttpResponse<Body = any> = {
  statusCode: number;
  body?: Body;
};

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  badRequest = 400,
}
