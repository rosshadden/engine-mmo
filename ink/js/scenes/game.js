define(function(){
	return function(engine){
		engine.scene('game')
		.enter(function(){
			engine.e('player')
			.attr({
				id:		'me'
			});
			
			engine.utilities.log('Game entered.');
		});
	};
});