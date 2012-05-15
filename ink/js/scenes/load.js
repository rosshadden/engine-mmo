define(function(){
	'use strict';
	
	return function(Σ){
		Σ.scene('load')
		.enter(function(){
			Σ.tile.sizeX = Σ.tile.sizeY = 16;
			
			Σ.load(Σ.config.assets)
			.complete(function(){
				Σ.scene('game').enter();
			});
		});
	};
});