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
    public ignoredIp: string [];

    constructor() {
        this.logLines = [];
        this.parsedLog = [];
        this.ignoredIp = ["127.0.0.1"];
    }

    /*
    * @description Parse an array of string in the form of => `date - ip : Method path`
    * @param lines string[]
     */
    public parseLines(lines: string[]): Log[] {
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
        parsedLogs.map((logLine) => {
            if(!uniqueIps.includes(logLine.ip) && !this.ignoredIp.includes(logLine.ip)){
                uniqueIps.push(logLine.ip);
            }
        })
        return uniqueIps.length;
    }

    private filterUniqueIps(parsedLogs: Log[]): string[] {
        let uniqueIps: string[] = [];
        parsedLogs.map((logLine) => {
            if(!uniqueIps.includes(logLine.ip) && !this.ignoredIp.includes(logLine.ip)){
                uniqueIps.push(logLine.ip);
            }
        })
        return uniqueIps;
    }

    public getAllRequestsByStatusCode(statusCode: string): Log[] {
        const requestsFilteredByStatusCode: Log[] = []
        this.parsedLog.map((log) => {
            if(log.statusCode === statusCode){
                requestsFilteredByStatusCode.push(log);
            }
        })
        return requestsFilteredByStatusCode;
    }

    public filterPotentialBotRequests(parsedLogs: Log[]){
        let phpPathRequestLogs: Log[] = []
        parsedLogs.map((log) => {
            if(log.path.includes('.php')){
                phpPathRequestLogs.push(log);
            }
        })
        return this.filterUniqueIps(phpPathRequestLogs);
    }

    //TODO: Append in an Array the ips whiches have tried to get on all .php files
    public blacklistFromUrlDictionnary(){}
    /*
    * @desc Export the IP Blacklist on JSON format
     */
    public exportBlacklist(){}
    public countStatusCode() {}
}

const logParser = new LogParser();

fs.readFile('src/logs/requests.log', {encoding: "utf8", flag: 'r'}, (err, file) => {
    if(err){
        console.error(err);
    } else {
        const logLines = file.split('\n');
        const parsedLogs = logParser.parseLines(logLines);
        const notFoundRequests = logParser.getAllRequestsByStatusCode("404");
        const errorServerRequests = logParser.getAllRequestsByStatusCode("500");
        console.log("Total of requests :", parsedLogs.length);
        console.log("Total of error 500 :", errorServerRequests.length);
        console.log("Total of error 404 :", notFoundRequests.length);
        console.log("Total count of unique ip :", logParser.countDistinctIps(parsedLogs));
        console.log("Total of blacklisted ip :", logParser.filterPotentialBotRequests(parsedLogs).length);
        logParser.filterPotentialBotRequests(parsedLogs);
    }
});


