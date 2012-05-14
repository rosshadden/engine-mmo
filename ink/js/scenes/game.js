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
			build:	function(){
				this.placeTiles();
			},
			
			placeTiles:	function(){
				var map = [
					[1,2,4,5,0,3,4,5,6,7],
					[1,2,4,5,0,3,4,5,6,7],
					[1,2,4,5,0,3,4,5,6,7],
					[1,2,4,5,0,3,4,5,6,7]
				];
				
				var v,
					lengthY = map.length,
					lengthX = map[0].length;
				for(var y = 0; y < lengthY; y++){
					for(var x = 0; x < lengthX; x++){
						v = map[y][x];
						
						if(v){
							v--;
							
							Σ.e('tile zelda.png').attr({
								tileX:	x,
								tileY:	y,
								frame:	v
							});
						}
					}
				}
			},
		});
		
		Σ.scene('game')
		.enter(function(){
			Σ.network.on('join', function(player){
				addPlayer(player);
			});
			
			Σ.network.get('/get/players', function(players){
				players.forEach(function(player, p){
					addPlayer(player);
				});
			});
			
			Σ.utilities.sheet({
				tree:	[0, 0]
			}, 'zelda.png')
			
			Σ.e('tree')
			.attr({
				sizeX:	64,
				sizeY:	80,
				posX:	50,
				posY:	200
			});
		});
	};
});
