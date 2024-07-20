import * as fs from 'fs';
import * as path from 'path';

// Format the date and time for folder and file names
const date = new Date();
const formattedDate = date
	.toLocaleDateString('fr-FR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})
	.replace(/\//g, '-'); // Replace slashes with dashes
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

const filePath = path.join(folderPath, `${formattedTime}.txt`);
try {
	fs.writeFileSync(filePath, 'Wesh ma couille');
	console.log(`File created: ${filePath}`);
} catch (err) {
	console.error(`Error creating file: ${err}`);
}

/*speedtest.onFinish = (results) => {
	const rawSummary = results.getSummary();
	console.log(rawSummary);
	const data = Buffer.from(JSON.stringify(rawSummary));
	const now = Date.now().toLocaleString('FR-fr');
	fs.writeFile(`./reports/${now}.txt`, data, { encoding: 'utf8' }, () => {});
};*/
