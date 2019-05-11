let express = require('express');
const port = 4311;
let middlewares = require('./core/commons/middlewares');
let log = require('./core/commons/logger');
const initDatabases = require('./core/commons/db');
let app = express();
app.use(require('body-parser').json());
app.use(middlewares.cors);
app.use(middlewares.apiTimeout(60000));
process.on('uncaughtException', function (err) {
    log.error(err);
});
app.use((req, res, next) => {
    console.log(req.method + " : " + req.url);
    //console.log(req.body, req.params, req.headers, req.query, req.files, req.text)
    next()
});

let versionV1Routes = require('./core/routes/route')(express);
app.use('/', versionV1Routes);
app.use(middlewares.error404);
app.use(middlewares.error40x);
app.listen(port);
log.info("Server Started on " + port);