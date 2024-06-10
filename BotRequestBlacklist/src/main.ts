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
    public ignoredIp: string []

    constructor() {
        this.logLines = []
        this.parsedLog = []
        this.ignoredIp = ["127.0.0.1"]
    }

    public parseFile(filePath: string) {
        fs.readFile(filePath, {encoding: "utf8", flag: 'r'}, (err, file) => {
            if(err){
                console.error(err);
            } else {
                this.logLines = file.split('\n');
                this.parseLines(this.logLines);
            }
        });
    };

    /*
    * @description Parse an array of string in the form of => `date - ip : Method path`
    * @param lines string[]
     */
    private parseLines(lines: string[]): Log[] {
        lines.forEach((line) => {
            const dateRegex: RegExp = new RegExp("(?<=\\[Last Sync: )(.*?)(?= @)");
            const timeRegex: RegExp = new RegExp("(?<=@ )(.*?)(?=\])");
            const ipRegex: RegExp = new RegExp("(?:\\d{1,3}\\.){3}\\d{1,3}");
            const pathRegex: RegExp = new RegExp("(?<= )(?=\/)(.*)(?= -)");
            const httpMethodRegex: RegExp = new RegExp("(?<=(?:\\d{1,3}\\.){3}\\d{1,3}: )(.*)(?= \\/)");
            const statusCodeRegex: RegExp = new RegExp("(?<=\> )(.*)");

            const date = line.match(dateRegex);
            const time = line.match(timeRegex);
            const ip = line.match(ipRegex);
            const path = line.match(pathRegex);
            const httpMethod = line.match(httpMethodRegex);
            const statusCode = line.match(statusCodeRegex);

            if (date !== null && time !== null && ip !== null && path !== null && httpMethod !== null && statusCode !== null) {
                this.parsedLog.push({"date": date[0].toString(), "ip": ip[0].toString(), "method": httpMethod[0].toString(), "path": path[0].toString(), "statusCode": statusCode[0].toString()});
            }
        })
        this.countDistinctIps(this.parsedLog)
        return this.parsedLog;
    };

    public countDistinctIps(parsedLogs: Log[]): number {
        let uniqueIps: string[] = [];
        // console.log(parsedLogs.length)
        parsedLogs.map((logLine) => {
            if(!uniqueIps.includes(logLine.ip)){
                uniqueIps.push(logLine.ip);
            }
        })
        // console.log("number of unique ips: " + uniqueIps.length);
        return uniqueIps.length;
    }

    public exportBlacklist(){}
    public countStatusCode() {}
}

const logParser = new LogParser();
logParser.parseFile('src/logs/requests.log');

