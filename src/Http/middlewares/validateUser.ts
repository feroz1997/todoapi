import { Request, Response, NextFunction } from "express";

import { comparePasswords } from "../../Infrastructor/utils/UserUtils";
import HttpResponse from "../../Application/utils/HttpResponse";
import HttpStatusCode from "../../Application/utils/HttpStatusCode";
import UserEntity from "../../Application/entities/UserEntity";
import UserSerivce from "../../Application/services/UserService";
import AuthException from "../../Application/exceptions/auth";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        console.log((!(email && password)) ,"%%%%%%%%%%%%%%%%%")
        if (!(email && password)) {
            throw new AuthException("Please Provide Email Or Password");
        }

        const { data } = await UserSerivce.fetchByEmail(email);
        const user: UserEntity = JSON.parse(JSON.stringify(data));
        if (!user) {
            throw new AuthException("Invalid Email");
        } else if (user instanceof UserEntity) {
            const validPassword = await comparePasswords(password, user.password);
            if (!validPassword) {
                throw new AuthException("Invalid Password");
            }
        }
        req.body.user = user;
        next();
    } catch (err: any) {
        return HttpResponse.response(
            res,
            new HttpResponse(HttpStatusCode.BAD_REQUEST, {
                type: JSON.stringify(err.name),
                error: JSON.stringify(err.message),
            })
        );
    }
};
