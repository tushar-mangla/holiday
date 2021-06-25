var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser')
var app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname+'/views'));
app.use(bodyParser.urlencoded({extended: true}));

var connection = mysql.createConnection({
	host    : 'localhost',
	user    : 'root',
	database: 'project_1'
});


app.get('/', function(req, res){
	//console.log(req);
	//res.send('you have reached the home page');
	res.render("html");
});

app.post("/register", function(req, res){
	var name = {first_name: req.body.fname, last_name: req.body.lname, email_id: req.body.email};
	var number = {mobile_no: req.body.number,city : req.body.city, age : req.body.age};
	
	connection.query('INSERT INTO name SET ?', name, function(err, results){
		if(err) throw err;
		console.log("this part is done");
	});
	
	connection.query('INSERT INTO number SET ?', number, function(err, results){
		if(err) throw err;
		//console.log("hurray!!");
		res.redirect('/');
		
	});
	
	console.log("post request sent to / register")
});


app.listen(port, function(){
	console.log("server running on " + port);
});




