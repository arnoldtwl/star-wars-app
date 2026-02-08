const { list } = require('@vercel/blob');

async function listBlobs() {
    const { blobs } = await list({
        token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    console.log('Existing blobs:');
    blobs.forEach(blob => {
        console.log(`${blob.pathname}: ${blob.url}`);
    });
}

// Simple .env parser for this script
const fs = require('fs');
const path = require('path');
try {
    const envPath = path.join(__dirname, '..', '.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["'](.*)["']$/, '$1');
                process.env[key] = value;
            }
        });
    }
} catch (e) {
    console.error('Error loading .env.local:', e);
}

listBlobs().catch(console.error);
