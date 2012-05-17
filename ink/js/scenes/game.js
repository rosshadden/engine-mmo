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
					this.moveRequest({
						x:	~~(x / Σ.tile.sizeX),
						y:	~~(y / Σ.tile.sizeY)
					});
				});
			}
		};
		
		Σ.c('fromSheet')
		.defines({
			init:	function(){
				console.log('fromSheet', this.posX);
			}
		});
		
		Σ.c('map')
		.defines({
			load:	function(name){
				return Σ.network.get('/maps/' + name, function(map){
					require(['/entities/scenery'], function(entities){
						var current, component;

						Σ.sys.clearColor = map.background.color;

						for(var entity in entities){
							current = entities[entity];

							component = Σ.c(entity);

							if(current.requires){
								component.requires(current.requires);
							}
							if(current.defines){
								component.defines(current.defines);
							}
							if(current.init){
								component.init(current.init);
							}
						}
						
						map.tiles.forEach(function(tile, t){
							tile.posX = Σ.tile.toPosX(tile.x);
							tile.posY = Σ.tile.toPosX(tile.y);

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
			})
			.on('leave', function(player){
				console.log('player', player, 'left.');
			});
		})
		.exit(function(){
			Σ('.scene-game').dispose();
		});
	};
});
