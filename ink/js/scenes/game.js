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
					var sheet;
			
					Σ.sys.clearColor = map.background.color;
					
					for(var resource in map.entities){
						sheet = {};
						
						for(var entity in map.entities[resource]){
							sheet[entity] = {
								frameX:	map.entities[resource][entity].frameX,
								frameY:	map.entities[resource][entity].frameY
							};
						}
						
						Σ.utilities.sheet(sheet, resource);
					}
				});
			}
		});
		
		Σ.scene('game')
		.enter(function(){
			Σ.network.sockets.on('join', function(player){
				addPlayer(player);
			});
			
			Σ.network.get('/get/players', function(players){
				players.forEach(function(player, p){
					addPlayer(player);
				});
			});
			
			var map = Σ.e('map');
			
			map.load('home')
			.done(function(map){
				console.log('now', map);
				Σ.e('treeGreen')
				.attr({
					sizeX:	64,
					sizeY:	80,
					posX:	50,
					posY:	200
				});
				
				Σ.e('treeRed')
				.attr({
					sizeX:	64,
					sizeY:	80,
					posX:	250,
					posY:	200
				});
			});
		});
	};
});
