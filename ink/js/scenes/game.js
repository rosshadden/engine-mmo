define(function(){
	'use strict';
	
	return function(Σ){
		Σ.scene('game')
		.enter(function(){
			//window.me = Σ.e('player');
			
			Σ.network.on('join', function(player){
				var newPlayer;
				
				if(Σ('#' + player.id).length > 0){
					newPlayer = Σ('#' + player.id)[0];
				}else{
					newPlayer = Σ.e('player');
				}
				
				newPlayer.attr({
					id:				player.id,
					posX:			player.position.x,
					posY:			player.position.y,
					destinationX:	player.position.x,
					destinationY:	player.position.y
				});
				
				if(player.me){
					newPlayer.comp('mouse');
				}
			});
			
			Σ.utilities.log('Game entered.');
		});
	};
});
