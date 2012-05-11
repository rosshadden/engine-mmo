var PORT = +(process.argv[2] || process.env.PORT || 3000),
	express = require('express'),
	routes = require('./routes'),
	
	app = express();
	
	app.server = require('http').createServer(app);
	app.session = new express.session.MemoryStore;
	
var	engine = require('./engine')(app);

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	//app.use(express.logger('dev'));
	app.use(require('stylus').middleware({
		src:	__dirname + '/ink'
	}));
	app.use(express.static(__dirname + '/ink'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('Shhhh! IT IS SECRET.'));
	app.use(express.session({
		key:	'engine',
		store:	app.session
	}));
	app.use(app.router);
	
	//TODO:	Move this to engine.js.
	app.use('/engine', express.static(__dirname + '/engine/client'));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

////////////////////////////////////////////////////////////////
//	ROUTES
app.get('/', function(request, response, next){
	var id = request.sessionID;
	
	engine.events.emitter.once('connect', function(connectedID){
		var data,
			network = engine.network.with(id);
		
		if(connectedID === id){
			data = {
				id:	id,
				position: engine.players.get(id).position || {
					x:	5,
					y:	5
				}
			};
			
			network.broadcast('join', data);
			
			data.me = true;
			
			network.emit('join', data);
		}
	});
	
	next();
}, routes.index);

////////////////////////////////////////////////////////////////
//	AJAX
app.get('/maps/:path', function(request, response){
	try{
		var map = require('./resources/maps/' + request.params.path + '.json');
		
		response.json(map);
	}catch(e){
		console.log('Error: A client tried to access map "%s".', request.params.path);
		response.send('The map you seek does not exist.', 404);
	}
});

app.get('/get/players', function(request, response){
	var players = [],
		playerList = engine.players.get();
	
	for(var player in playerList){
		players.push({
			id:			player,
			position:	playerList[player].position
		});
	}
	
	response.json(players);
});

////////////////////////////////////////////////////////////////
//	RUN
app.server.listen(PORT);

console.log("Server started on port %d [%s]", PORT, app.settings.env);

////////////////////////////////////////////////////////////////
//	EVENTS
engine.network.on('moveRequest', function(position){
	var self = this,
		id = self.handshake.sessionID,
		player = engine.players.get(id);
	
	player.position = position;
	
	engine.network.emit('move', {
		id:			id,
		position:	position
	});
});
