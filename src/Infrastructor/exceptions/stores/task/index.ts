import { exceptionLogger } from "../../../loggers";

class TaskException extends Error {

    constructor(...params: any[]) {
        super(...params);
        this.name = "TaskStoreError";
        this.printErrorStack(this.stack)
    }

    private printErrorStack(stack: any) {
        exceptionLogger.error(stack);
    }
}

export default TaskException;
