define(function(){
	'use strict';
	
	return function(engine){
		engine.scene('game')
		.enter(function(){
			window.me = engine.e('player mouse')
			.attr({
				id:		'me'
			}).on('click', function(x, y){
				x = ~~(x / engine.tile.sizeX);
				y = ~~(y / engine.tile.sizeY);
				
				this.moveTo(x, y);
			});
			
			engine.utilities.log('Game entered.');
		});
	};
});