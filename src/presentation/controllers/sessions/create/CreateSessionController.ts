import { CreateSession } from '@/domain/useCase/sessions/create/CreateSession';
import {
  Controller,
  HttpResponse,
  HttpStatusCode,
} from '@/presentation/protocols';
import { Input, Output } from './dtos';

export class CreateSessionController implements Controller {
  constructor(private readonly createSession: CreateSession) {}

  async handle(httpRequest: Input): Promise<HttpResponse<Output>> {
    if (!httpRequest.email || !httpRequest.password) {
      throw new Error('Parametros inválidos');
    }

    const session = await this.createSession.execute({
      email: httpRequest.email,
      password: httpRequest.password,
    });

    return {
      statusCode: HttpStatusCode.ok,
      body: {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      },
    };
  }
}
