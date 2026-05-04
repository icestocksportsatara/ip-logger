const express = require('express');
const app = express();

app.set('trust proxy', true);
app.use(express.json());

// MAIN PAGE
app.get('/', (req, res) => {
  res.send(`
    <h2>Location Access Required</h2>
    <button onclick="getLocation()">Share Location</button>

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
            alert('Location shared!');
          },
          () => {
            alert('Permission denied');
          }
        );
      }
    </script>
  `);
});

// RECEIVE LOCATION
app.post('/location', (req, res) => {
  const { lat, lon } = req.body;

  console.log('Latitude:', lat);
  console.log('Longitude:', lon);

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server running...');
});
