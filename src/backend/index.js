//=======[ Settings, Imports & Data ]==========================================

var PORT = 3000;

var express = require('express');
var app = express();
//var utils = require('./mysql-connector');

//habilito cors
var cors = require('cors');
var corsOptions = {origin:'*',optionsSucessStatus:200};
app.use(cors(corsOptions));

// to parse application/json
app.use(express.json());
// to serve static files
//app.use(express.static('/home/node/app/static/'));

app.get('/test',function(req,res){
    console.log("entro mierda carajo!");
    res.send("entro mierda carajo!");
});

//ruteo dispositivo
var routerDisp = require('./routes/dispositivo');
//ruteo dispositivo
var routerMedicion = require('./routes/medicion');
//ruteo riego
var routerRiego = require('./routes/riego');

app.use('/api/dispositivo', routerDisp);

app.use('/api/medicion', routerMedicion);

app.use('/api/riego', routerRiego);


//=======[ Main module code ]==================================================
app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
    //console.log(express);
});

//=======[ End of file ]=======================================================