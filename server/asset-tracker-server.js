const http = require('http');
let cron = require('node-cron');
const dotenv = require('dotenv');
const socket = require("socket.io");

const app = require('./app');
const { sendEmail } = require('./send-email');

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

const io = socket(server);

io.on("connection", (socket) => {

  socket.on("memberId", (payload) => {
      console.log(socket.id, "=id");
      console.log(payload.memberId)
    });

    socket.on("asset-transaction", (payload) => {
      const { assetBreakdown, selectedAsset, memberId } = payload;
      socket.broadcast.emit("asset-transaction-response", { assetBreakdown, selectedAsset, memberId});
    });

    socket.on("delete-asset", (payload) => {
        console.log(socket.id, "=id");
    
        socket.emit("delete-asset-response", {
          payload,
        });
    });
});

startServer();