define(function(){
	'use strict';
	
	return function(engine){
		engine.scene('game')
		.enter(function(){
			window.me = engine.e('player mouse')
			.attr({
				id:		'me'
			});
			
			engine.utilities.log('Game entered.');
		});
	};
});