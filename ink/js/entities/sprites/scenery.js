﻿define(function(){
	'use strict';
	
	return function(Σ){
		Σ.c('grass')
		.requires('sprite zelda.png')
		.defines({
			sizeX:	16,
			sizeY:	16,
			frameX:	13.7,
			frameY:	2.8,
			collision: [
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[1, 1, 1, 1],
				[1, 1, 1, 1],
				[0, 1, 1, 0]
			]
		});
		
		Σ.c('tree')
		.requires('sprite zelda.png')
		.defines({
			sizeX:	64,
			sizeY:	80,
			frameX:	0,
			frameY:	0
		});
		
		Σ.c('tree-green')
		.requires('tree')
		.defines({
			frameX:	0,
			frameY:	0
		});
		
		Σ.c('tree-red')
		.requires('tree')
		.defines({
			frameX:	0,
			frameY:	1
		});
		
		Σ.c('tree-gold')
		.requires('tree')
		.defines({
			frameX:	0,
			frameY:	2
		});
		
		Σ.c('tree-rainbow')
		.requires('tree animation')
		.init(function(){
			this.animation.add('idle', [1e2, [{
				x:	0,
				y:	0
			},{
				x:	0,
				y:	1
			}], -1]);
			
			this.animate('idle');
		});
	};
});
