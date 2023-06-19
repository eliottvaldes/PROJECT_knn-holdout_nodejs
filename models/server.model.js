const express = require('express');
const cors = require('cors');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;

        // define the paths for routes
        this.paths = {
            euclidian:  '/api/euclidian',
            knn:        '/api/knn',
            setup:      '/api/setup',
        }

        // run the middlewares and routes
        this.middlewares();
        this.routes();
    }


    // middlewares definition
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    // routes definition
    routes() {
        // define the routes to use each path value
        this.app.use(this.paths.euclidian, require('../routes/euclidian.routes'));
        this.app.use(this.paths.knn, require('../routes/knn.routes'));
        this.app.use(this.paths.setup, require('../routes/setup.routes'));

        // 404 error
        this.app.use('*', (req, res) => {
            res.status(404).json({
                msg: '404 error | Resource not found'
            });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }

}

module.exports = Server;