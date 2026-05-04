const express = require('express');
const app = express();

app.set('trust proxy', true);

app.get('/', (req, res) => {
  const ip = req.ip;
  const device = req.headers['user-agent'];

  console.log('IP:', ip);
  console.log('Device:', device);

  res.send('Hello 👋 Logged successfully');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server running...');
});
