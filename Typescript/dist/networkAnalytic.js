import SpeedTest from '@cloudflare/speedtest';
import fs from 'fs';
new SpeedTest().onFinish = (results) => {
    results.getSummary();
    fs.open('./reports/', results.getSummary());
};
