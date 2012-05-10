define([
	'./player'
], function(player){
	'use strict';
	
	return function(engine){
		player(engine);
	};
});