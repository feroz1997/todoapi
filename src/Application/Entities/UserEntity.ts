import { v4 as uuidv4 } from "uuid";

export default class UserEntity {

    public userId: string;
    public email: string;
    public password: string;
    public loggedToken: string;

    constructor(userId: string, email: string, password: string, loggedToken: string) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.loggedToken = loggedToken;
    }

    static createFromObj(obj: {userId: string; email: string; password: string; loggedToken: string;}) {
        const { userId, email, password, loggedToken } = obj;
        return new UserEntity(userId, email, password, loggedToken);
    }

    static createFromDetails(details: { email: string; password: string }) {
        const { email, password } = details;
        return new UserEntity(uuidv4(), email, password, "");
    }

    setLoggedToken(loggedToken: string) {
        this.loggedToken = loggedToken;
    }
}
