import * as fs from 'fs';
import * as path from 'path';
import SpeedTest from '@cloudflare/speedtest';

const date = new Date();

const formattedDate = date
	.toLocaleDateString('fr-FR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})
	.replace(/\//g, '-');

const formattedTime = date
	.toLocaleTimeString('fr-FR', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	})
	.replace(/:/g, '-'); // Replace colons with dashes

const folderPath = path.join('src', 'reports', formattedDate);

if (!fs.existsSync(folderPath)) {
	try {
		fs.mkdirSync(folderPath, { recursive: true });
		console.log(`Folder created: ${folderPath}`);
	} catch (err) {
		console.error(`Error creating folder: ${err}`);
	}
}

const filePath = path.join(folderPath, `${formattedTime}.json`);

const speedtest = new SpeedTest();

speedtest.onFinish = (results) => {
	const rawSummary = results.getSummary();
	rawSummary.download = rawSummary.download / 1000000;
	rawSummary.download = Number(rawSummary.download.toFixed(2));
	rawSummary.upload = rawSummary.upload / 1000000;
	rawSummary.upload = Number(rawSummary.upload.toFixed(2));
	rawSummary.latency = Number(rawSummary.latency.toFixed(0));
	rawSummary.jitter = Number(rawSummary.jitter.toFixed(0));
	rawSummary.downLoadedLatency = Number(
		rawSummary.downLoadedLatency.toFixed(0)
	);
	rawSummary.downLoadedJitter = Number(
		rawSummary.downLoadedJitter.toFixed(0)
	);
	rawSummary.upLoadedLatency = Number(rawSummary.upLoadedLatency.toFixed(0));
	rawSummary.upLoadedJitter = Number(rawSummary.upLoadedJitter.toFixed(0));

	try {
		fs.writeFileSync(filePath, JSON.stringify(rawSummary, null, 2));
		console.log(`File created: ${filePath}`);
	} catch (err) {
		console.error(`Error creating file: ${err}`);
	}
};
