import * as echarts from 'echarts';
import { ISummary } from 'summary.type.js';

const app = document.getElementById('app');
const div = document.createElement('div');
div.setAttribute('id', '1');
app.append(div);

fetch('data/reports.json')
	.then((response) => {
		return response.json();
	})
	.then((data: ISummary[]) => {
		const downloadSpeeds = data.map((entry) => entry.download);
		const uploadSpeeds = data.map((entry) => entry.upload);
		const date = data.map((entry) => entry.createdAt);

		const chart = echarts.init(document.getElementById('chart'));
		const option = {
			title: {
				text: 'Download and Upload Speed',
			},
			tooltip: {
				trigger: 'axis',
			},
			legend: {
				data: ['Download', 'Upload'],
			},
			xAxis: {
				type: 'category',
				data: date,
			},
			yAxis: {
				type: 'value',
				label: 'Mbps',
			},
			series: [
				{
					name: 'Download',
					type: 'line',
					data: downloadSpeeds,
				},
				{
					name: 'Upload',
					type: 'line',
					data: uploadSpeeds,
				},
			],
		};
		chart.setOption(option);
	})
	.catch((err) => {
		console.error(err);
	});
