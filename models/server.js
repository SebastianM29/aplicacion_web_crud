const express = require('express')
const cors = require('cors');
const socketControllers = require('../sockets/controllers');
const http= require('http')
const socketIo = require('socket.io');
const obj = require('../config/config');





class Server {
    constructor (){
        this.app = express()

        this.port = obj.port
        this.server = http.createServer(this.app);
        this.io = socketIo(this.server)
        this.middlewares();
        this.routes();
        this.sockets();
      
        

    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'))

    }


    routes(){
        this.app.use('/', require('../routes/socket'))
          
    }

    sockets() {
        this.io.on('connection', (socket) => socketControllers(socket,this.io))
    }

     listen(){
            this.server.listen(this.port,() => {
                console.log("conectado al servidor")
            })
    }

  
  
}


module.exports = Server