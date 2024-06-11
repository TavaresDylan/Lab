import * as fs from "node:fs";

interface Log {
    date: string;
    time: string;
    ip: string;
    method: string;
    path: string;
    statusCode: string;
}

interface BlockedIp {
    ips: Array<string>;
    lastUpdate: string;
}

class LogParser {
    public ignoredIps: string [];
    public blacklist: BlockedIp[];
    public forbiddenWords: string[];
    public blacklistPath?: string;

    constructor(forbiddenWords: string[] = [".php"], ignoredIps: string[] = ["127.0.0.1"], blacklistPath?: string) {
        this.ignoredIps = ignoredIps;
        this.blacklist = [];
        this.blacklistPath = blacklistPath;
        this.forbiddenWords = forbiddenWords;
    }

    /**
     * @desc - Parse an Argolight API .log file into a JSON
     * @param {string[]} lines - The lines of the .log
     * @return {Log[]} - Returns an array of parsed logs
     */
    public parseLines(lines: string[]): Log[] {
        const parsedLogs: Log[] = []
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
                parsedLogs.push({"date": date[0].toString(), time: time[0].toString(), "ip": ip[0].toString(), "method": httpMethod[0].toString(), "path": path[0].toString(), "statusCode": statusCode[0].toString()});
            }
        })
        return parsedLogs;
    };

    /**
     * @desc - Filters the passed parsedLogs and return the total count of distinct ips
     * @param {Log[]} parsedLogs - The parsedLogs to count the total of distinct ips
     * @return {number} - Returns the count of unique ips found into the passed parsed logs array
     */
    public countDistinctIps(parsedLogs: Log[]): number {
        let uniqueIps: string[] = [];
        parsedLogs.forEach((logLine) => {
            if(!uniqueIps.includes(logLine.ip) && !this.ignoredIps.includes(logLine.ip)){
                uniqueIps.push(logLine.ip);
            }
        })
        return uniqueIps.length;
    }

    /**
     * @desc - Filters the passed parsedLogs and return the result of distinct ip
     * @param {Log[]} parsedLogs - The parsedLogs to filter distinct ips
     * @return {string[]} - Returns all logs filtered by selected http status code
     */
    public filterUniqueIps(parsedLogs: Log[]): string[] {
        let uniqueIps: string[] = [];
        parsedLogs.forEach((logLine) => {
            if(!uniqueIps.includes(logLine.ip) && !this.ignoredIps.includes(logLine.ip)){
                uniqueIps.push(logLine.ip);
            }
        })
        return uniqueIps;
    }

    /**
     * @desc - Filters the passed parsedLogs by http status code
     * @param {Log[]} parsedLogs - The parsedLogs to search into
     * @param {string} statusCode - The status code to search
     * @return {Log[]} - Returns all logs filtered by selected http status code
     */
    public getAllRequestsByStatusCode(parsedLogs: Log[], statusCode: string): Log[] {
        const requestsFilteredByStatusCode: Log[] = []
        parsedLogs.forEach((log) => {
            if(log.statusCode === statusCode){
                requestsFilteredByStatusCode.push(log);
            }
        })
        return requestsFilteredByStatusCode;
    }

    /**
     * @desc Filters the passed parsedLogs
     * @param {Log[]} parsedLogs The parsedLogs to search into for requests potentially made by bots
     * @return {Log[]} Returns all logs which are made by bots
    */
    public filterPotentialBotRequests(parsedLogs: Log[]): Log[]{
        let matchedBotLogs: Log[] = []
        if(this.forbiddenWords.length > 0){
            parsedLogs.forEach((log) => {
                if(this.forbiddenWords.every(word => log.path.includes(word)) && !this.ignoredIps.every(ip => log.path.includes(ip))){
                    matchedBotLogs.push(log);
                }
            })
        }
        return matchedBotLogs;
    }

    /**
     * @desc Export in json format
     * @param {string[]} blacklist The parsedLogs to search into for requests potentially made by bots
     * @return {void}
     */
    public exportBlacklist(blacklist: string[]): void{
        fs.writeFileSync("./src/logs/ipBlacklist.json", JSON.stringify(blacklist));
    }

    /**
     * @desc Export in json format
     * @param {Log[]} parsedLogs The parsedLogs to search into for requests potentially made by bots
     * @return {void}
     */
    public exportParsedLogFile(parsedLogs: Log[]): void {
        fs.writeFileSync('src/logs/parsedLogs.json', JSON.stringify(parsedLogs, null, 2))
    }
}

const logParser = new LogParser();

fs.readFile('src/logs/requests.log', {encoding: "utf8", flag: 'r'}, (err, file) => {
    if(err){
        console.error(err);
    } else {
        const logLines = file.split('\n');
        const parsedLogs = logParser.parseLines(logLines);
        logParser.exportParsedLogFile(parsedLogs);
        const notFoundRequests = logParser.getAllRequestsByStatusCode(parsedLogs, "404");
        const errorServerRequests = logParser.getAllRequestsByStatusCode(parsedLogs, "500");
        console.log("Total of requests :", parsedLogs.length);
        console.log("Total of error 500 :", errorServerRequests.length);
        console.log("Total of error 404 :", notFoundRequests.length);
        console.log("Total count of unique ip :", logParser.countDistinctIps(parsedLogs));
        const matchedBotLogs = logParser.filterPotentialBotRequests(parsedLogs);
        const ipsToBlacklist = logParser.filterUniqueIps(matchedBotLogs);
        console.log("Total of blacklisted ip :", ipsToBlacklist.length);
        logParser.exportBlacklist(ipsToBlacklist);
    }
});


