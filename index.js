var mysql      = require('mysql');
var express    = require('express');
var dbconfig   = require('./sql/database.js');
var connection = mysql.createConnection(dbconfig);
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.use(express.static('views'));

require('./sql/userlist')(app, connection);     //get '/userlist' post '/userlist'
require('./sql/homepage')(app);                 //get '/'
require('./sql/purchase')(app, connection);     //get '/purchase'
require('./sql/lootbox')(app, connection);      //get '/
require('./sql/card')(app, connection);         //get '/usercard' get '/cardlist'
require('./sql/adventure')(app, connection);         //get '/usercard' get '/cardlist'


app.listen(9090, function(){
    console.log('listen in 9090');
});