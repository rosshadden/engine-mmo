define([
	'./load',
	'./game'
], function(load, game){
	'use strict';
	
	return function(Σ){
		load(Σ);
		game(Σ);
	};
});