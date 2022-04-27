var express = require('express');
var routerMedicion = express.Router();
var pool = require('../../mysql');

//Espera recibir por parámetro un id de una electrovalvula y devuelve su último log
routerMedicion.get('/:id', function(req, res) {
    pool.query('Select * from Log_Riegos where electrovalvulaId=? order by fecha desc', [req.params.id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        //console.log(res);
        res.send(result[0]);
    });
});

//Espera recibir por parámetro un id de una electrovalvula y devuelve todos sus logs
routerMedicion.get('/:id/todos', function(req, res) {
    pool.query('Select * from Log_Riegos where electrovalvulaId=? order by fecha desc', [req.params.id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

//Espera recibir por parámetro un id de dispositivo y un valor de medición y lo inserta en base de datos.
routerMedicion.post('/agregar', function(req, res) {
    //console.log("llego el request POST");
    pool.query('Insert into Log_Riegos (apertura,fecha,electrovalvulaId) values (?,?,?)', [req.body.apertura, req.body.fecha, req.body.electrovalvulaId], function(err, result, fields) {
        if (err) {
            //console.log(err);
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

module.exports = routerMedicion;