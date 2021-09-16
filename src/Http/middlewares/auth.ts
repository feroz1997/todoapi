import { Request, Response, NextFunction } from "express";

import { decodeToken } from "../../Infrastructor/utils/UserUtils";
import UserSerivce from "../../Application/services/UserService";
import HttpResponse from "../../Application/utils/HttpResponse";
import HttpStatusCode from "../../Application/utils/HttpStatusCode";
import UserEntity from "../../Application/entities/UserEntity";
import AuthException from "../../Application/exceptions/auth";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["auth-token"];
        
        if (!token) {
            throw new AuthException("Auth Token Not Given...!");
        }

        const decoded = decodeToken(token, process.env.JWT_SECRET);
        const { statusCode, data } = await UserSerivce.fetchByUserId(decoded.userId);
        const user: UserEntity = JSON.parse(JSON.stringify(data));

        if (statusCode === HttpStatusCode.OK && user.loggedToken === token) {
            req.body.UserId = user.userId;
            return next();
        }
        throw new AuthException("Please Aunthenticate....!");
    } catch (error:any) {
        console.log(error)
        return HttpResponse.response(
            res,
            new HttpResponse(HttpStatusCode.UNAUTHORIZED, {
                type: JSON.stringify(error.name),
                error: JSON.stringify(error.message)
            })
        );
    }
};
