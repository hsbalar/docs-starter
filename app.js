#!/bin/env node

// register babel hook
require("babel-register")();

// start the server
require("./server").start()
.then((app) => {
  console.log("Server started: http://localhost:3000");
}).catch((err) => {
  console.error("Unable to start server.");
  console.error(err);
  process.exit(-1);
});
