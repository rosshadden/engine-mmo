define([
	'./load',
	'./game'
], function(load, game){
	return function(engine){
		load(engine);
		game(engine);
	};
});