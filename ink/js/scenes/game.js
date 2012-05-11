define(function(){
	'use strict';
	
	return function(engine){
		engine.scene('game')
		.enter(function(){
			window.me = engine.e('player mouse')
			.attr({
				id:		'me'
			});
			
			/*engine.network.on('join', function(position){
				engine.utilities.log('Player joined.', position);
			});*/
			
			engine.utilities.log('Game entered.');
		});
	};
});
