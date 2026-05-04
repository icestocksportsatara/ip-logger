const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

// MAIN PAGE
app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Location Access</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>

  <body style="font-family:sans-serif;text-align:center;padding-top:50px;">
    <h2>📍 Share Your Location</h2>
    <button onclick="getLocation()">Allow Location</button>

    <script>
      function getLocation() {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetch('/location', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                lat: position.coords.latitude,
                lon: position.coords.longitude
              })
            });

            document.body.innerHTML = "<h2>✅ Location Shared</h2>";
          },
          () => {
            alert('Permission denied');
          }
        );
      }
    </script>
  </body>
  </html>
  `);
});

// RECEIVE LOCATION
app.post('/location', (req, res) => {
  console.log('Latitude:', req.body.lat);
  console.log('Longitude:', req.body.lon);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server running...');
});
