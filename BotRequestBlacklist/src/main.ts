import * as fs from "node:fs";

interface Log {
    date: string;
    ip: string;
    method: string;
    path: string;
    statusCode: string;
}

class LogParser {
    public logLines: string[];
    public parsedLog: Log[];

    constructor() {
        this.logLines = []
        this.parsedLog = []
    }

    public parseFile(filePath: string) {
        fs.readFile(filePath, "utf8", (err, file) => {
            if(err){
                console.error(err);
            } else {
                this.logLines = file.split('\n');
                // console.log(this.logLines.slice(0,15));
                this.parseLines(this.logLines);
            }
        });
    };

    /*
    * @description Parse an array of string in the form of => `date - ip : Method path`
    * @param lines string[]
     */
    public parseLines(lines: string[]) {
        lines.slice(0,2).forEach((line) => {
            const dateAndTimeRegex: RegExp = new RegExp("(?<=\\[Last Sync: )(.*?)(?=\\])");
            const dateRegex: RegExp = new RegExp("(?<=\\[Last Sync: )(.*?)(?= @)");
            const timeRegex: RegExp = new RegExp("(?<=@ )(.*?)(?=\\])");
            const ipRegex: RegExp = new RegExp("(?:\\d{1,3}\\.){3}\\d{1,3}");
            const pathRegex: RegExp = new RegExp("(?<= )(?=\\/)(.*)(?= -)");
            const httpMethodRegex: RegExp = new RegExp("(?<=(?:\\d{1,3}\\.){3}\\d{1,3}: )(.*)(?= \\/)");
            const statusCodeRegex: RegExp = new RegExp("(?<=\\> )(.*)(?=)");

            const dateAndTime = line.match(dateAndTimeRegex);
            console.log("Date and time :", dateAndTime);
            const date = line.match(dateRegex);
            console.log("Date :", date);
            const time = line.match(timeRegex);
            console.log("Time :", time);
            const ip = line.match(ipRegex);
            console.log("Ip :", ip);
            const path = line.match(pathRegex);
            console.log("Path :", path);
            const httpMethod = line.match(httpMethodRegex);
            console.log("Http method :", httpMethod);
            const statusCode = line.match(statusCodeRegex)
            console.log("Status code :", statusCode);
        })
    };
}

const logParser = new LogParser();
logParser.parseFile('src/logs/requests.log');

