import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import cors from "cors";
import logger from "morgan";
import fs from "fs";
import path from "path";

import config from "./config";
import routes from "../routes";

const app = express();

// pretty output
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

// enable logging
if (config.logging && config.logging.enable) {
  if (!fs.exists("log")) {
    fs.mkdirSync("log");
  }
  app.use(logger(config.logging.format || "combined", {
    stream: fs.createWriteStream(path.join("log", "access.log"), { flags: "a" })
  }));
}

app.use(cors());

app.use(express.static(path.resolve('dist')));
app.use(express.static(path.resolve('uploads')));

// register body parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// allow method override
app.use(methodOverride());

// register routes
routes(app);

// index page
app.use('*', (req, res) => { 
  res.sendFile(path.resolve('dist/index.html'))
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.sendFile(res.json({}));
});

export default app;
