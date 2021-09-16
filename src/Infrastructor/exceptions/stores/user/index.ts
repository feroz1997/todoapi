import { exceptionLogger } from "../../../loggers";

class UserException extends Error {
    
    constructor(...params: any[]) {
        super(...params);
        this.name = "UsertoreError";
        this.printErrorStack(this.stack)
    }

    private printErrorStack(stack: any) {
        exceptionLogger.error(stack);
    }
}

export default UserException;
