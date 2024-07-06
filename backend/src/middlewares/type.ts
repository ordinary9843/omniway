import { Response } from 'express';

export type MiddlewareResult = void | Response<any, Record<string, any>> | any;
