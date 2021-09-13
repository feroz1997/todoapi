import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const authToken = (data: object | string, secret: any): string => {
    return jwt.sign(data,secret);
};

export const comparePasswords = async (plain:string,hashed:string):Promise<boolean>=>{
    return await bcrypt.compare(plain,hashed);
}
export const decodeToken = (token: any, secret: string) : any =>{
    return jwt.verify(token,secret)
}