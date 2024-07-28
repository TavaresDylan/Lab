export interface ISummary {
	download?: number;
	upload?: number;
	latency?: number;
	jitter?: number;
	downLoadedLatency?: number;
	downLoadedJitter?: number;
	upLoadedLatency?: number;
	upLoadedJitter?: number;
	packetLoss?: number;
	createdAt?: string;
}
