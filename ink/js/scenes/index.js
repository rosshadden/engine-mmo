define([
	'./load',
	'./game'
], function(load, game){
	'use strict';
	
	return function(engine){
		load(engine);
		game(engine);
	};
});