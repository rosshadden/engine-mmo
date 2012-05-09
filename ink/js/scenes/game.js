define(function(){
	return function(engine){
		engine.scene('game')
		.enter(function(){
			engine.utilities.log('Game entered.');
		});
	};
});