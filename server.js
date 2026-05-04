app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Location Access</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        background: linear-gradient(135deg, #4facfe, #00f2fe);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      .card {
        background: rgba(255,255,255,0.1);
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      }

      h2 {
        margin-bottom: 10px;
      }

      p {
        opacity: 0.9;
        font-size: 14px;
      }

      button {
        margin-top: 20px;
        padding: 12px 25px;
        border: none;
        border-radius: 30px;
        background: white;
        color: #007aff;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
      }

      button:active {
        transform: scale(0.95);
      }
    </style>
  </head>

  <body>
    <div class="card">
      <h2>📍 Share Your Location</h2>
      <p>We need your location to continue</p>

      <button onclick="getLocation()">Allow Location</button>
    </div>

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

            document.body.innerHTML = "<h2>✅ Location Shared Successfully</h2>";
          },
          () => {
            alert('Location permission denied');
          }
        );
      }
    </script>
  </body>
  </html>
  `);
});
