// import {createHttpTerminator} from 'http-terminator';

const express = require('express')
const http = require('http');
const { Server } = require("socket.io");
const terminator = require('http-terminator')

module.exports.LiveServer = class LiveServer {
    init() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server,{
            cors: {
              origin: "*",
              methods: ["GET", "POST"]
            }
        });

        this.app.use(express.json());

        this.app.post('/', (req, res) => {
            this.io.emit('log', req.body);
            res.send({success:true})
        })

        this.io.on('connection', (socket) => {
            console.log('Window connected');
            this.socket = socket
        });
    }

    randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    startServer() {
        this.init();
        this.port = 4444
        // this.port = this.randomInteger(1000,9999)
        const serverObj = this.server.listen(this.port, () => {
            console.log(`Laradump server on http://localhost:${this.port}`)
        });
        this.httpTerminator = terminator.createHttpTerminator({
            server:serverObj,
        });
    }

    stopServer() {
        if (this.httpTerminator) this.httpTerminator.terminate();
    }
}