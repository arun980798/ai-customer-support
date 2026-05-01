require('dotenv').config();
const app = require('./src/app');
const http = require('http');
const socketServer = require('./src/sockets/server.socket');

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

socketServer(server);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
