import * as fs from "node:fs";

class LogParser {
    logLines: string[];

    constructor() {
        this.logLines = []
    }

    public parse(filePath: string) {
        fs.readFile(filePath, "utf8", (err, file) => {
            if(err){
                console.error(err);
            } else {
                this.logLines = file.split('\n');
                console.log(this.logLines.slice(0,10))
            }
        });
        return this.logLines
    }
}

const logParser = new LogParser();

const res =logParser.parse('src/logs/requests.log');

console.log(res.slice(0,15));
