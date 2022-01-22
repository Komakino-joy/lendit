const http = require('http');
let cron = require('node-cron');

const app = require('./app');

const { sendEmail } = require('./send-email');

const dotenv = require('dotenv');

dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const PORT = process.env.PORT || 49180;
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Hello from Asset Tracker...')
})

async function startServer() {
  server.listen(PORT, '0.0.0.0', () => {
      console.log(`listening on port ${PORT}`);
  });

  // run everday hour at 20 mins '00 20 * * * *'
  cron.schedule('0 4 * * *', () => { 
    sendEmail();
  },
  {
      scheduled: true,
      timezone: "America/Los_Angeles"
  });

};

startServer();