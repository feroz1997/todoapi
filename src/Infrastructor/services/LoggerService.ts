import { Stream, Writable } from "stream";
import fs from "fs";
import path from "path";

class LoggerService {
    
    public logAccessStream: Writable;

    constructor() {
        this.logAccessStream = new Stream.Writable;
        this.logAccessStream._write = this.write;
    }

    private write(message: any, encoding: BufferEncoding) {
        fs.appendFileSync(path.join("logger.log"), message.toString());
    }
}
export default new LoggerService();
