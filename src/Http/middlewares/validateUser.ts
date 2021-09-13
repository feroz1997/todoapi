import { Request, Response, NextFunction } from "express";
import { comparePasswords } from "../../Infrastructor/utils/userUtils";
import HttpResponse from "../../Application/utils/HttpResponse";
import HttpStatusCode from "../../Application/utils/HttpStatusCode";
import { UserStore } from "../../Infrastructor/physicalStore/UserStore/UserStore";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return HttpResponse.response(
                res,
                new HttpResponse(HttpStatusCode.BAD_REQUEST, {
                    message: "Please Provide Email Or Password",
                })
            );
        }
        const user = await new UserStore().FetchUserByEmail(email);
        if (!user) {
            throw new Error("Invalid Email or Password");
        } else {
            const validPassword = await comparePasswords(password, user.password);
            if (!validPassword) {
                throw new Error("Invalid Email or Password");
            }
        }
        req.body.user = user;
        next();
    } catch (err: any) {
        return HttpResponse.response(res, new HttpResponse(HttpStatusCode.UNAUTHORIZED, { error: JSON.stringify(err.message) }));
    }
};
