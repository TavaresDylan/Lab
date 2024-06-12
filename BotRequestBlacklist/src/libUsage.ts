import { Blacklister } from './main.ts';
import blacklist from './logs/blackList.json';
import * as fs from 'node:fs';
import forbiddenWordList from './logs/forbiddenWordList.json';
import whiteList from './logs/whiteList.json';

/* TODO LIST
 - Sauvegarder la date + horaire de dernière mise à jour de la blacklist
 - ‼️🚨 : Permettre de filtrer l'ip d'une requête entrante (en live) et l'ajouter dans la blacklist le cas où la requête correspond à un mot interdit et qu'elle n'est pas déjà blacklistée */

const ipValidTest = '127.0.0.1';
const ipInvalidTest = '211.226.150.72';
// const blacklistTest = ['192.33.12.1', '198.168.2.2'];
// const forbiddenWordsTest = ['kekw'];
const urlPathValidTest = '/coucou';
const urlPathInvalidTest = '/kekw';

const blacklister2 = new Blacklister();

console.log('// Valid IP Valid URL');
blacklister2.checkIpValidation(ipValidTest, blacklist);
blacklister2.checkRequestPathValidation(urlPathValidTest, ipValidTest);
console.log('// Valid IP Invalid URL');
blacklister2.checkIpValidation(ipValidTest, blacklist);
blacklister2.checkRequestPathValidation(urlPathInvalidTest, ipValidTest);
console.log('// Invalid IP Valid URL');
blacklister2.checkIpValidation(ipInvalidTest, blacklist);
blacklister2.checkRequestPathValidation(urlPathValidTest, ipInvalidTest);
console.log('// Invalid IP Invalid URL');
blacklister2.checkIpValidation(ipInvalidTest, blacklist);
blacklister2.checkRequestPathValidation(urlPathInvalidTest, ipInvalidTest);

const isIpValid = blacklister2.checkIpValidation(ipInvalidTest, blacklist);

if (isIpValid) {
	blacklister2.checkRequestPathValidation(urlPathValidTest, ipInvalidTest);
}

///// TESTS

const blacklister = new Blacklister(forbiddenWordList, whiteList);

fs.readFile(
	'src/logs/requests.log',
	{ encoding: 'utf8', flag: 'r' },
	(err, file) => {
		if (err) {
			console.error(err);
		} else {
			const logLines = file.split('\n');
			const parsedLogs = blacklister.parseLines(logLines);
			blacklister.exportParsedLogFile(parsedLogs);
			const notFoundRequests = blacklister.getAllRequestsByStatusCode(
				parsedLogs,
				'404'
			);
			const errorServerRequests = blacklister.getAllRequestsByStatusCode(
				parsedLogs,
				'500'
			);
			console.log('Total of requests :', parsedLogs.length);
			console.log('Total of error 500 :', errorServerRequests.length);
			console.log('Total of error 404 :', notFoundRequests.length);
			console.log(
				'Total count of unique ip :',
				blacklister.countDistinctIps(parsedLogs)
			);
			const matchedBotLogs =
				blacklister.filterPotentialBotRequests(parsedLogs);
			const ipsToBlacklist = blacklister.filterUniqueIps(matchedBotLogs);
			console.log('Total of blacklisted ip :', ipsToBlacklist.length);
			blacklister.exportBlacklist(ipsToBlacklist);
		}
	}
);
