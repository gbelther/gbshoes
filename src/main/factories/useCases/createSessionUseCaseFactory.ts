import { CreateSessionUseCase } from '@/domain/useCase/sessions/create';
import { BcryptAdapter, JsonWebTokenAdapter } from '@/infra/cryptography';
import { makeCustomersRepository } from '../repositories';

export const makeCreateSessionUseCase = () =>
  new CreateSessionUseCase(
    makeCustomersRepository(),
    new BcryptAdapter(Number(process.env.PASSWORD_SALT)),
    new JsonWebTokenAdapter(
      process.env.JWT_ACCESS_SECRET,
      Number(process.env.JWT_ACCESS_EXPIRES_IN_SECOND)
    ),
    new JsonWebTokenAdapter(
      process.env.JWT_REFRESH_SECRET,
      Number(process.env.JWT_REFRESH_EXPIRES_IN_SECOND)
    )
  );
