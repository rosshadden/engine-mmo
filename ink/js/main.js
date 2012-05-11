//	I'd much rather not have the dev have to do all this,
//	but I can't think of another way to include require.js,
//	and it is very useful inside the engine.
require.config({
	paths:	{
		'engine':	'/engine'
	}
});

require([
	'engine/index',
	'./scenes/index',
	'./entities/index'
], function(Σ, scenes, entities){
	'use strict';
	
	window.engine = window.Σ = Σ;
	
	Σ.config = {
		version:	0.02,
		
		canvas:	'#screen',
		
		assets:	{
			images:	[
				'images/characters/cecil.png',
				'images/characters/characters.png'
			]
		}
	};
	
	scenes(Σ);
	entities(Σ);
	
	Σ.ready(function(){
		Σ.sys.init(Σ.config.canvas).start();
		
		Σ.scene('load').enter();
	});
});
