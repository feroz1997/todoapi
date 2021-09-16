import { v4 as uuidv4 } from "uuid";

export default class UserEntity {
    public userId: string;
    public email: string;
    public password: string;
    public loggedToken: string;

    constructor(userId: string, email: string, loggedToken: string) {
        this.userId = userId;
        this.loggedToken = loggedToken;
        this.email = email;
    }

    static createFromObj(obj: { userId: string; email: string; loggedToken: string }) {
        const { userId, email, loggedToken } = obj;
        return new UserEntity(userId, email, loggedToken);
    }

    static createFromDetails(details: { email: string }) {
        const { email } = details;
        return new UserEntity(uuidv4(), email, "");
    }

    setLoggedToken(loggedToken: string) {
        this.loggedToken = loggedToken;
    }

    setPassword(password: string) {
        this.password = password;
    }
}
