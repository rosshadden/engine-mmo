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
					Σ.sys.clearColor = map.background.color;
					
					map.tiles.forEach(function(tile, t){
						Σ.e(tile.type)
						.attr(tile);
					});
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
			
			Σ.e('map')
			.load('home')
			.done(function(map){
			});
		});
	};
});
