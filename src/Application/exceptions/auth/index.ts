
class AuthException extends Error {
    
    constructor(...params: any[]) {
        super(...params);
        this.name = "AuthError";
    }
}

export default AuthException;
