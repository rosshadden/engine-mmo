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
], function(engine, scenes, entities){
	window.engine = engine;
	
	engine.config = {
		version:	0.01,
		
		canvas:	'#screen',
		
		assets:	{
			images:	[
				'images/characters/cecil.png'
			]
		}
	};
	
	scenes(engine);
	entities(engine);
	
	engine.ready(function(){
		engine.sys.init(engine.config.canvas).start();
		
		engine.scene('load').enter();
	});
});
