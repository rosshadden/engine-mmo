define([
	'./game'
], function(game){
	return function(engine){
		game(engine);
	};
});