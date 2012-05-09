define([
	'./player'
], function(player){
	return function(engine){
		player(engine);
	};
});