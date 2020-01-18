import socketio from "socket.io-client";

const socket = socketio("http://192.168.25.18:3001", {
  autoConnect: false
});

function subscribeNewDev(subscribeFunction) {
  socket.on("newDev", subscribeFunction);
}

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs
  };

  socket.connect();
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export { connect, disconnect, subscribeNewDev };
