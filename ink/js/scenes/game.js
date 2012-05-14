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
		});
	};
});
