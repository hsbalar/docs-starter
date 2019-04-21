import http from "http";
import app from "./config/express";
import ngrok from "ngrok";

export function start() {

  return new Promise((resolve, reject) => {
      let server = http.createServer(app);
      app.server = server;

      // start server
      app.server.listen(3000, (err) => {
        if (err) {
          return reject(err);
        }
        ngrok.connect(3000).then(url => {
          console.log(`Node.js local server is publicly-accessible at ${url}`);
        }).catch(err => {
          console.log(err);
        });
        resolve(app);
      });
  });
};
