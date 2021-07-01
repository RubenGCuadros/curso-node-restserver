const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server  {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar de db
        this.connectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async connectarDB() {
        await dbConnection();
    }

    middlewares() {
        
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio público
        this.app.use( express.static('public') );

    }

    routes() {

        this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;