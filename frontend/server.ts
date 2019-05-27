const next = require('next');
const routes = require('./routes');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);
const express = require('express');

async function start(port = 3000) {
  try {
    await app.prepare();
    express().use(handler).listen(3000);
  
    console.log(`server on. port: ${port}`);
  } catch (e) {
    console.error(e);
  }
}

start();