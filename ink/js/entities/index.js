define([
	'./player'
], function(player){
	'use strict';
	
	return function(Σ){
		player(Σ);
	};
});