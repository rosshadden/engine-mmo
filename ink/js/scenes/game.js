define(function(){
	'use strict';
	
	return function(Σ){
		var addPlayer = function(player){
			var newPlayer;
			
			if(Σ('#' + player.id).length > 0){
				newPlayer = Σ('#' + player.id)[0];
			}else{
				newPlayer = Σ.e('player');
			}
			
			newPlayer
			.attr('id', player.id)
			.addClass('scene-game')
			.warp(player.position);
			
			if(player.me){
				window.me = newPlayer
				.comp('mouse')
				.on('click', function(x, y){
					x = ~~(x / Σ.tile.sizeX);
					y = ~~(y / Σ.tile.sizeY);
					
					this.moveRequest({
						x:	x,
						y:	y
					});
				});
			}
		};
		
		Σ.c('map')
		.defines({
			load:	function(name){
				return Σ.network.get('/maps/' + name, function(map){
					require(['/entities/scenery'], function(entities){
						Σ.sys.clearColor = map.background.color;

						for(var entity in entities){
							Σ.c(entity)
							.requires(entities[entity].requires)
							.defines(entities[entity].defines)
							.init(entities[entity].init);
						}
						
						map.tiles.forEach(function(tile, t){
							Σ.e(tile.type)
							.attr(tile)
							.addClass('scene-game map-' + name);
						});
					});
				});
			}
		});
		
		Σ.scene('game')
		.enter(function(map){
			Σ.network.sockets
			.emit('enterMap', map)
			.once('enterMap', function(){
				Σ.network.get('/get/players', function(players){
					players.forEach(function(player, p){
						addPlayer(player);
					});
				});
				
				Σ.e('map').load(map);
			})
			.once('join', function(player){
				addPlayer(player);
			});
		})
		.exit(function(){
			Σ('.scene-game').dispose();
		});
	};
});
