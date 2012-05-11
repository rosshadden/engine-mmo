define(function(){
	'use strict';
	
	return function(Σ){
		Σ.scene('game')
		.enter(function(){
			window.me = Σ.e('player mouse');
			
			Σ.network.on('join', function(position){
				Σ.utilities.log('Player joined.', position);
			});
			
			Σ.utilities.log('Game entered.');
		});
	};
});
