const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// TODO: Replace these with your real values or use environment variables
const s3 = new AWS.S3({
  region: 'us-west-2',
  accessKeyId: 'AKIAY6QVYY4PRW3L7BEE',
  secretAccessKey: '8VAdYWL7B0KjkiY4DhNp0Ctv0nofCf8GpdEuUAFW',
});
const BUCKET = 'cryptopulse-investments-ansh-2025';

app.post('/upload', async (req, res) => {
  const { records } = req.body;
  if (!records || !Array.isArray(records)) {
    return res.status(400).json({ error: 'No records array provided.' });
  }
  try {
    const result = await s3
      .putObject({
        Bucket: BUCKET,
        Key: 'cryptopulse-investments.json', // Single file for demo
        Body: JSON.stringify(records, null, 2),
        ContentType: 'application/json',
      })
      .promise();
    res.json({ message: 'Uploaded to S3!', etag: result.ETag });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed.' });
  }
});

app.listen(4000, () => console.log('Server running on port 4000'));
