var PORT = +(process.argv[2] || process.env.PORT || 3000),
	express = require('express'),
	routes = require('./routes'),
	http = require('http');

var app = express();
	
var	engine = require('./engine/engine.js')(app);

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	//app.use(express.logger('dev'));
	app.use(require('stylus').middleware({ src: __dirname + '/ink' }));
	app.use(express.static(__dirname + '/ink'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('Shhhh! IT IS SECRET.'));
	app.use(express.session());
	app.use(app.router);
	
	//TODO:	Move this to engine.js.
	app.use('/engine', express.static(__dirname + '/engine/client'));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);

////////////////////////////////////////////////////////////////
//	RUN
http.createServer(app).listen(PORT);

console.log("Server started on port %d [%s]", PORT, app.settings.env);
