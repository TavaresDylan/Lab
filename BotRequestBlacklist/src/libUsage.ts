import { Blacklister } from './Blacklister';
import * as fs from 'node:fs';
// Import of JSON configs
import forbiddenWordList from '../logs/forbiddenWordList.json';
import whiteList from '../logs/whiteList.json';
import blackList from '../logs/blackList.json';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';

const ipValidTest = '127.0.0.1';
const ipInvalidTest = '211.226.150.72';
// const blacklistTest = ['192.33.12.1', '198.168.2.2'];
// const forbiddenWordsTest = ['kekw'];
const urlPathValidTest = '/coucou';
const urlPathInvalidTest = '/kekw';

const filename = fileURLToPath(
	require('url').pathToFileURL(__filename).toString()
);
const dirnameFromFile = dirname(filename);
const logsFolderPath = path.join(dirnameFromFile, '../logs');

const blacklister = new Blacklister(
	whiteList,
	blackList,
	forbiddenWordList,
	logsFolderPath
);

/*
console.log('// Valid IP Valid URL');
blacklister.checkIpValidation(ipValidTest, blacklist);
blacklister.checkRequestPathValidation(urlPathValidTest, ipValidTest);
console.log('// Valid IP Invalid URL');
blacklister.checkIpValidation(ipValidTest, blacklist);
blacklister.checkRequestPathValidation(urlPathInvalidTest, ipValidTest);
console.log('// Invalid IP Valid URL');
blacklister.checkIpValidation(ipInvalidTest, blacklist);
blacklister.checkRequestPathValidation(urlPathValidTest, ipInvalidTest);
console.log('// Invalid IP Invalid URL');
blacklister.checkIpValidation(ipInvalidTest, blacklist);
blacklister.checkRequestPathValidation(urlPathInvalidTest, ipInvalidTest);
*/

fs.readFile(
	'src/logs/requests.log',
	{ encoding: 'utf8', flag: 'r' },
	(err, file) => {
		if (err) {
			console.error(err);
		} else {
			const logLines = file.split('\n');
			console.log('totalOfRequests:', logLines.length);
			const parsedLogs = blacklister.parseLines(logLines);
			console.log(
				'Total count of unique ip :',
				blacklister.countDistinctIps(parsedLogs)
			);
			const matchedBotLogs =
				blacklister.filterPotentialBotRequests(parsedLogs);
			console.log(matchedBotLogs.length);
			const ipsToBlacklist = blacklister.filterUniqueIps(matchedBotLogs);
			console.log(ipsToBlacklist.length);
			console.log('Total of blacklisted ip :', ipsToBlacklist.length);
			blacklister.exportBlacklist(ipsToBlacklist);
		}
	}
);
