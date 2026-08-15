import CronJob from 'cron';
import http from 'node:http';
import https from 'node:https';

// FOR EVERY 14 MINUTES SET A CRON JOB TO CHECK IF THE SERVER IS UP AND RUNNING
const job = new CronJob.CronJob('*/14 * * * *', () => {
    const baseUrl = process.env.BASE_URL || 'https://huddle-1-4166.onrender.com'; // Replace with your server URL
    if(!baseUrl) return; // Exit if BASE_URL is not defined
  const url = new URL('/health', baseUrl).href; // Replace with your health check endpoint
  const client = url.startsWith('https') ? https : http;

  client.get(url, (res) => {
    if (res.statusCode === 200) {
      console.log(`GET request successfull. Status code: ${res.statusCode}`);
    } else {
      console.error(`GET request failed. Status code: ${res.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error while sending request, checking server status: ${err.message}`);
  });
});

export default job;