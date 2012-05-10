define(function(){
	return function(engine){
		engine.scene('game')
		.enter(function(){
			window.me = engine.e('player')
			.attr({
				id:		'me'
			});
			
			engine.utilities.log('Game entered.');
		});
	};
});