import { UserPayload } from '../../src/utils/jwt/type';

declare global {
  namespace Express {
    interface Request {
      user: UserPayload;
    }
  }
}
