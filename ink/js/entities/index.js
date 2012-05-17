define([
	'./sprites/index',
	'./player'
], function(sprites, player){
	'use strict';
	
	return function(Σ){
		//sprites(Σ);
		
		player(Σ);
	};
});