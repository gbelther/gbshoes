import { HttpResponse } from './Http';

export interface Controller<HttpRequest = any, Body = any> {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse<Body | Error>>;
}
