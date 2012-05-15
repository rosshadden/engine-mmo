define(function(){
	'use strict';
	
	return function(Σ){
		Σ.c('treeGreen')
		.requires('sprite zelda.png')
		.defines({
			sizeX:	64,
			sizeY:	80,
			frameX:	0,
			frameY:	0
		});
		
		Σ.c('treeRed')
		.requires('sprite zelda.png')
		.defines({
			sizeX:	64,
			sizeY:	80,
			frameX:	0,
			frameY:	1
		})
	};
});