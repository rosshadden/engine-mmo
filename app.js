var PORT = +(process.argv[2] || process.env.PORT || 3000),
	express = require('express'),
	routes = require('./routes'),

	_ = require('underscore')._,
	r = require('requirejs'),
	
	app = express();
	
	app.server = require('http').createServer(app);
	app.session = new express.session.MemoryStore;
	
var	engine = require('./engine')(app);

var maps = {};

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
app.get('/', routes.index);

////////////////////////////////////////////////////////////////
//	AJAX
app.get('/maps/:path', function(request, response){
	var map,
		path = request.params.path;

	try{
		if(maps[path]){
			map = maps[path].map;
		}else{
			var dimensions,
				collision = [];

			map = require('./resources/maps/' + path + '.json');

			dimensions = map.properties.dimensions;

			for(var x = 0; x < dimensions.width; x++){
				collision[x] = [];

				for (var y = 0; y < dimensions.height; y++){
					collision[x][y] = 0;
				}
			}

			r(['resources/entities/scenery'], function(entities){
				var current, requires;

				for(var entity in entities){
					current = entities[entity];

					if(!current.collision && current.requires){
						requires = current.requires.split(' ');

						for(var i = 0; i < requires.length; i++){
							if(!!entities[requires[i]] && !!entities[requires[i]].collision){
								current.collision = entities[requires[i]].collision;

								break;
							}
						}
					}
				}

				map.tiles.forEach(function(tile, t){
					current = entities[tile.type];

					if(current.collision){
						current.collision.forEach(function(point, p){
							collision[point.x + tile.x][point.y + tile.y] = 1;
						});
					}
				});
			});

			maps[path] = {
				map:		map,
				collision:	collision
			};
		}
		
		response.json(map);
	}catch(e){
		console.log('Error: A client tried to access map "%s".', request.params.path);
		response.send('The map you seek does not exist.', 404);
	}
});

app.get('/entities/:entity', function(request, response){
	var entity = request.params.entity;

	try{
		response.sendfile(__dirname + '/resources/entities/scenery.js');
	}catch(e){
		console.log('Error: A client tried to access resource "%s".', request.params.entity);
		response.send('The resource you seek does not exist.', 404);
	}
});

app.get('/get/players', function(request, response){
	var id = request.sessionID,
		players = [],
		playerList = engine.players.get();
	
	for(var player in playerList){
		if(player !== id){
			players.push({
				id:			player,
				position:	playerList[player].position
			});
		}
	}
	
	response.json(players);
});

////////////////////////////////////////////////////////////////
//	RUN
app.server.listen(PORT);

console.log("Server started on port %d [%s]", PORT, app.settings.env);

////////////////////////////////////////////////////////////////
//	EVENTS
engine.network.on('enterMap', function(map){
	var id = this.handshake.sessionID,
		player = engine.players.get(id),
		withPlayer = engine.network.with(player);

	//if(map in maps){
		withPlayer
		.set('map', map)
		.emit('enterMap', true);
	//}

	if(!player.position){
		player.position = {
			x:	0,
			y:	0
		};
	}
	
	var data = {
		id:	id,
		position: engine.players.get(id).position
	};
	
	withPlayer.broadcast('join', data);
	
	data.me = true;
	
	withPlayer.emit('join', data);

	player.events.on('unload', function(){
		withPlayer.broadcast('leave', id);
	});
});

engine.network.on('moveRequest', function(position){
	var id = this.handshake.sessionID,
		player = engine.players.get(id);

	engine.network.with(player)
	.get('map', function(err, map){
		var path;

		try{
			var graph = new engine.collision.Graph(maps[map].collision);
			var start = graph.nodes[player.position.x][player.position.y];
			var end = graph.nodes[position.x][position.y];
			var path = engine.collision.astar.search(graph.nodes, start, end);
		}catch(e){
			path = [];
		}
		
		if(path.length > 0){
			player.position = position;
			
			engine.network.emit('move', {
				id:		id,
				path:	path
			});
		}
	});
});