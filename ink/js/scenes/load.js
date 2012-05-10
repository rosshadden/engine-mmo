define(function(){
	'use strict';
	
	return function(engine){
		engine.scene('load')
		.enter(function(){
			engine.tile.sizeX = engine.tile.sizeY = 25;
			
			engine.sys.clearColor = '#ccc';
			
			engine.load(engine.config.assets)
			.complete(function(){
				engine.scene('game').enter();
			});
		});
	};
});