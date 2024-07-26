import * as fs from 'fs';
import * as path from 'path';
import { ISummary } from 'summary.type';

const inputPath = 'src/reports';
const outputPath = 'public/data';

const aggregatedData: Array<ISummary> = [];

function createDateFormFolderAndFileNames(dirName: string, fileName: string) {
	const transformedTime = fileName.replaceAll('-', ':');
	const transformedDate = dirName
		.split('-')
		.reverse()
		.toString()
		.replaceAll(',', '-');
	return new Date(transformedDate + 'T' + transformedTime).toISOString();
}

fs.readdir(inputPath, (err, dirs) => {
	if (err) {
		return console.error('Unable to scan directory:', err);
	}

	dirs.forEach((dirName) => {
		const dirPath = path.join(inputPath, dirName);
		fs.readdir(dirPath, (err, files) => {
			if (err) {
				return console.error('Unable to scan directory:', err);
			}

			files.forEach((fileName) => {
				const filePath = path.join(dirPath, fileName);
				const fileContent = fs.readFileSync(filePath, 'utf8');
				const jsonData: ISummary = JSON.parse(fileContent);
				jsonData.createdAt = createDateFormFolderAndFileNames(
					dirName,
					fileName.replace('.json', '')
				);
				aggregatedData.push(jsonData);
			});

			const outputFilePath = path.join(outputPath, `reports.json`);
			fs.writeFileSync(
				outputFilePath,
				JSON.stringify(aggregatedData, null, 2),
				'utf8'
			);
		});
	});
});
