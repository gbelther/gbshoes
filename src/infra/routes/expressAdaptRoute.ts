import { Controller } from '@/presentation/protocols';
import { NextFunction, Request, Response } from 'express';

export const expressAdaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const query = request.query || {};
    const params = request.params || {};
    const body = request.body || {};
    const requestUnified = {
      ...query,
      ...params,
      ...body,
    };
    try {
      const httpResponse = await controller.handle(requestUnified);
      response.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      next(error);
    }
  };
};
