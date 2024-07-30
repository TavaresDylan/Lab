<script setup lang='ts'>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide, onMounted } from 'vue';
import axios from 'axios';

import {
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	ToolboxComponent,
	GridComponent,
	DataZoomComponent
} from 'echarts/components';
import { ISummary } from '@/types/summary.type';

use([
	CanvasRenderer,
	LineChart,
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	ToolboxComponent,
	GridComponent,
	DataZoomComponent
]);

const downloadSpeeds = ref<(number | null | undefined)[]>([]);
const uploadSpeeds = ref<(number | null | undefined)[]>([]);
const latency = ref<(number | null | undefined)[]>([]);
const jitter = ref<(number | null | undefined)[]>([]);
const date = ref<(string | null | undefined)[]>([]);

const isLoading = ref<boolean>(true);

onMounted(async () => {
	isLoading.value = true;
	await axios.get<ISummary[]>('http://localhost:5174/data/reports.json')
		.then((response) => {
			const data = response.data;
			downloadSpeeds.value = data.map((entry) => entry.download);
			uploadSpeeds.value = data.map((entry) => entry.upload);
			latency.value = data.map((entry) => entry.latency);
			jitter.value = data.map((entry) => entry.jitter);
			date.value = data.map((entry) =>
				new Intl.DateTimeFormat('fr-FR', {
					dateStyle: 'short',
					timeStyle: 'short',
				}).format(new Date(entry.createdAt!))
			);
			return response.data;
		}).finally(() => {
			isLoading.value = false;
		});
});

provide(THEME_KEY, 'light');

const option = ref({
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
});
</script>

<template>
	<div>
		<h1 class='text-center font-bold text-4xl mt-8'>Speedtest statistiques</h1>
		<v-chart v-if="!isLoading" class="chart" :option="option" autoresize />
	</div>
</template>

<style scoped>
.chart {
	height: 50vh;
}
</style>
