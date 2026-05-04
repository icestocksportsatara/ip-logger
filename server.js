const express = require('express');
const app = express();

app.set('trust proxy', true);

app.get('/', async (req, res) => {
  const ip = req.ip;

  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();

    console.log('IP:', ip);
    console.log('City:', data.city);
    console.log('Country:', data.country);
    console.log('ISP:', data.isp);

  } catch (err) {
    console.log('Error fetching location');
  }

  res.send('Logged with location 👍');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server running...');
});
