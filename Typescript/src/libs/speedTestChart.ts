import * as echarts from 'echarts';
import { ISummary } from '../types/summary.type.js';

fetch('data/reports.json')
	.then((response) => {
		return response.json();
	})
	.then((data: ISummary[]) => {
		const downloadSpeeds = data.map((entry) => entry.download);
		const uploadSpeeds = data.map((entry) => entry.upload);
		const latency = data.map((entry) => entry.latency);
		const jitter = data.map((entry) => entry.jitter);
		const date = data.map((entry) =>
			new Intl.DateTimeFormat('fr-FR', {
				dateStyle: 'short',
				timeStyle: 'short',
			}).format(new Date(entry.createdAt!))
		);

		const downloadAndUploadChart = echarts.init(document.getElementById('downloadAndUploadChart'));
		const downloadAndUploadChartOptions = {
			title: {
				text: 'Download and Upload Speed',
			},
			toolbox: {
				feature: {
					dataZoom: {
						yAxisIndex: false,
					},
					saveAsImage: {
						pixelRatio: 2,
					},
				},
			},
			dataZoom: [
				{
					type: 'inside',
				},
				{
					type: 'slider',
				},
			],
			tooltip: {
				trigger: 'axis',
				formatter: '{b0}<br />{a0}: {c0} Mbps<br />{a1}: {c1} Mbps',
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
				axisLabel: {
					formatter: '{value} Mbps',
				},
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
		downloadAndUploadChart.setOption(downloadAndUploadChartOptions);

		const latencyAndJitterChart = echarts.init(document.getElementById('latencyAndJitterChart'));
		const latencyAndJitterChartOptions = {
			title: {
				text: 'Latency and Jitter over time',
			},
			toolbox: {
				feature: {
					dataZoom: {
						yAxisIndex: false,
					},
					saveAsImage: {
						pixelRatio: 2,
					},
				},
			},
			dataZoom: [
				{
					type: 'inside',
				},
				{
					type: 'slider',
				},
			],
			tooltip: {
				trigger: 'axis',
				formatter: '{b0}<br />{a0}: {c0} ms<br />{a1}: {c1} ms',
			},
			legend: {
				data: ['Latency', 'Jitter'],
			},
			xAxis: {
				type: 'category',
				data: date,
			},
			yAxis: {
				type: 'value',
				axisLabel: {
					formatter: '{value} Ms',
				},
			},
			series: [
				{
					name: 'Latency',
					type: 'line',
					data: latency,
					color: '#f43f5e',
				},
				{
					name: 'Jitter',
					type: 'line',
					data: jitter,
					color: '#fbbf24',
				},
			],
		};
		latencyAndJitterChart.setOption(latencyAndJitterChartOptions);
	})
	.catch((err) => {
		console.error(err);
	});
