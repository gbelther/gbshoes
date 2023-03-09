import { CreateSessionController } from '@/presentation/controllers/sessions/create/CreateSessionController';
import { makeCreateSessionUseCase } from '../useCases/createSessionUseCaseFactory';

export const makeCreateSessionController = () =>
  new CreateSessionController(makeCreateSessionUseCase());
