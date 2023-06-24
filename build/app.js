import express from "express";
import http from "http";
var app = express();
var httpServer = http.createServer(app);
export { app, httpServer };
