import * as fs from 'node:fs';

const getDirName = require('path').dirname;

interface Log {
	date: string;
	time: string;
	ip: string;
	method: string;
	path: string;
	statusCode: string;
}

export class Blacklister {
	public whiteList: string[];
	public blackList: string[];
	public forbiddenWords: string[];
	public logFolderPath: string;

	constructor(
		whiteList: string[],
		blackList: string[],
		forbiddenWordList: string[],
		logFolderPath: string
	) {
		this.whiteList = whiteList;
		this.blackList = blackList;
		this.forbiddenWords = forbiddenWordList;
		this.logFolderPath = logFolderPath;

		this.ensureFileExists(logFolderPath + '/blackList.json');
		this.ensureFileExists(logFolderPath + '/whiteList.json');
		this.ensureFileExists(logFolderPath + '/parsedLogs.json');
		this.loadFiles();
	}

	private loadFiles() {
		const blackListContent = fs.readFileSync(
			`${this.logFolderPath}/blackList.json`,
			'utf8'
		);
		this.blackList = JSON.parse(blackListContent);
		const forbiddenWordListContent = fs.readFileSync(
			`${this.logFolderPath}/forbiddenWordList.json`,
			'utf8'
		);
		this.forbiddenWords = JSON.parse(forbiddenWordListContent);
		const whiteListContent = fs.readFileSync(
			`${this.logFolderPath}/whiteList.json`,
			'utf8'
		);
		this.whiteList = JSON.parse(whiteListContent);
	}

	/**
	 * @desc - Ensure that the file exists otherwise it will be created
	 * @param {string} path - The the file path to check
	 * @return {void}
	 */
	private ensureFileExists(path: string): void {
		if (!fs.existsSync(path)) {
			fs.writeFileSync(path, JSON.stringify([]));
		}
	}

	/**
	 * @desc - Parse an Argolight API .log file into a JSON
	 * @param {string[]} lines - The lines of the .log
	 * @return {Log[]} - Returns an array of parsed logs
	 */
	public parseLines(lines: string[]): Log[] {
		const parsedLogs: Log[] = [];
		lines.forEach((line) => {
			const dateRegex: RegExp = new RegExp(
				'(?<=\\[Last Sync: )(.*?)(?= @)'
			);
			const timeRegex: RegExp = new RegExp('(?<=@ )(.*?)(?=])');
			const ipRegex: RegExp = new RegExp('(?:\\d{1,3}\\.){3}\\d{1,3}');
			const pathRegex: RegExp = new RegExp('(?<= )(?=/)(.*)(?= -)');
			const httpMethodRegex: RegExp = new RegExp(
				'(?<=(?:\\d{1,3}\\.){3}\\d{1,3}: )(.*)(?= \\/)'
			);
			const statusCodeRegex: RegExp = new RegExp('(?<=> )(.*)');

			const date = line.match(dateRegex);
			const time = line.match(timeRegex);
			const ip = line.match(ipRegex);
			const path = line.match(pathRegex);
			const httpMethod = line.match(httpMethodRegex);
			const statusCode = line.match(statusCodeRegex);

			if (date && time && ip && path && httpMethod && statusCode) {
				parsedLogs.push({
					date: date[0].toString(),
					time: time[0].toString(),
					ip: ip[0].toString(),
					method: httpMethod[0].toString(),
					path: path[0].toString(),
					statusCode: statusCode[0].toString(),
				});
			}
		});
		return parsedLogs;
	}

	/**
	 * @desc - Filters the passed parsedLogs and return the total count of distinct ips
	 * @param {Log[]} parsedLogs - The parsedLogs to count the total of distinct ips
	 * @return {number} - Returns the count of unique ips found into the passed parsed logs array
	 */
	public countDistinctIps(parsedLogs: Log[]): number {
		let uniqueIps: string[] = [];
		parsedLogs.forEach((logLine) => {
			if (
				!uniqueIps.includes(logLine.ip) &&
				!this.whiteList.includes(logLine.ip)
			) {
				uniqueIps.push(logLine.ip);
			}
		});
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
			if (
				!uniqueIps.includes(logLine.ip) &&
				!this.whiteList.includes(logLine.ip)
			) {
				uniqueIps.push(logLine.ip);
			}
		});
		return uniqueIps;
	}

	/**
	 * @desc - Filters the passed parsedLogs by http status code
	 * @param {Log[]} parsedLogs - The parsedLogs to search into
	 * @param {string} statusCode - The status code to search
	 * @return {Log[]} - Returns all logs filtered by selected http status code
	 */
	public getAllRequestsByStatusCode(
		parsedLogs: Log[],
		statusCode: string
	): Log[] {
		const requestsFilteredByStatusCode: Log[] = [];
		parsedLogs.forEach((log) => {
			if (log.statusCode === statusCode) {
				requestsFilteredByStatusCode.push(log);
			}
		});
		return requestsFilteredByStatusCode;
	}

	/**
	 * @desc Filters the passed parsedLogs
	 * @param {Log[]} parsedLogs The parsedLogs to search into for requests potentially made by bots
	 * @return {Log[]} Returns all logs which are made by bots
	 */
	public filterPotentialBotRequests(parsedLogs: Log[]): Log[] {
		let matchedBotLogs: Log[] = [];
		if (this.forbiddenWords.length > 0) {
			parsedLogs.forEach((log) => {
				if (
					this.forbiddenWords.some((word) =>
						log.path.includes(word)
					) &&
					!this.whiteList.some((ip) => log.ip.includes(ip))
				) {
					matchedBotLogs.push(log);
				}
			});
		}
		return matchedBotLogs;
	}

	/**
	 * @desc Check if the transmitted ip is included into the the blacklist
	 * @param {string} ipToCheck The ip to check in the blacklist
	 * @return {boolean} Returns true if the ip is included into the blacklist otherwise returns false
	 */
	public checkIpBlacklist(ipToCheck: string): boolean {
		return this.blackList.some((blackIp) => ipToCheck.includes(blackIp));
	}

	/**
	 * @desc Check if the transmitted ip is included into the the whitelist
	 * @param {string} ipToCheck The ip to check in the blacklist
	 * @return {boolean} Returns true if the ip is included into the whitelist otherwise returns false
	 */
	public checkIpWhitelist(ipToCheck: string): boolean {
		return this.whiteList.some((whiteIp) => ipToCheck.includes(whiteIp));
	}

	/**
	 * @desc This check the if a forbidden word is present in the request path if yes it append the ip to the blacklist
	 * @param {string} requestUrl The ip to check in the blacklist
	 * @param {string} ip The associated ip
	 * @return {boolean} True if the ip is not in the blacklist else return false
	 */
	public checkRequestPathValidation(requestUrl: string, ip: string): boolean {
		if (!this.forbiddenWords.some((word) => requestUrl.includes(word))) {
			return true;
		} else {
			this.exportBlacklist([ip]);
			return false;
		}
	}

	/**
	 * @desc Append the new blacklisted ip to blacklist file and export it in json format
	 * @param {string[]} blacklist The parsedLogs to search into for requests potentially made by bots
	 * @return {void}
	 */
	public exportBlacklist(blacklist: string[]): void {
		const fileContent = fs.readFileSync(
			`${this.logFolderPath}/blackList.json`,
			'utf8'
		);
		const dataArray = JSON.parse(fileContent);
		blacklist.forEach((ip) => {
			dataArray.push(ip);
		});
		fs.writeFileSync(
			`${this.logFolderPath}/blackList.json`,
			JSON.stringify(dataArray),
			{
				flag: 'w',
			}
		);
	}
	/**
	 * @desc Export in json format
	 * @param {Log[]} parsedLogs The parsedLogs to search into for requests potentially made by bots
	 * @return {void}
	 */
	public exportParsedLogFile(parsedLogs: Log[]): void {
		fs.writeFileSync(
			`${this.logFolderPath}/parsedLogs.json`,
			JSON.stringify(parsedLogs, null, 2)
		);
	}
}
