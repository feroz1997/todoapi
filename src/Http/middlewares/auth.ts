import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../../Infrastructor/utils/userUtils';
import UserSerivce from '../../Application/services/User';
import HttpResponse from '../../Application/utils/HttpResponse';
import HttpStatusCode from '../../Application/utils/HttpStatusCode';
import UserEntity from '../../Application/Entities/UserEntity';


export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['auth-token'];
    if (!token) {
      return HttpResponse.response(
        res,
        new HttpResponse(HttpStatusCode.FORBIDDEN, {
          error: 'Auth Token Not Given...!',
        })
      );
    }
    const decoded = decodeToken(token, 'SECRET');
    const { statusCode, data } = await UserSerivce.fetchById(decoded.userId);
    const user: UserEntity = JSON.parse(JSON.stringify(data));
    if (statusCode === HttpStatusCode.OK && user.loggedToken === token) {
      req.body.UserId = user.userId;
      return next();
    }
    throw Error('Please Aunthenticate....!');
  } catch (error) {
    return HttpResponse.response(
      res,
      new HttpResponse(HttpStatusCode.UNAUTHORIZED, {
        error: 'Please Aunthenticate....!',
      })
    );
  }
};
