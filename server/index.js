import http from "http";
import app from "./config/express";
import config from "./config/config";
import ngrok from "ngrok";

export function start() {

  return new Promise((resolve, reject) => {
      let server = http.createServer(app);
      app.server = server;

      // start server
      app.server.listen(config.server.port, (err) => {
        if (err) {
          return reject(err);
        }
        ngrok.connect(config.server.port).then(url => {
          console.log(`Node.js local server is publicly-accessible at ${url}`);
        }).catch(err => {
          console.log(err);
        });
        resolve(app);
      });
  });
};
