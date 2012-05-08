//	I'd much rather not have the dev have to do all this,
//	but I can't think of another way to include require.js,
//	and it is very useful inside the engine.
require.config({
	paths:	{
		'engine':	'/engine',
		'entities':	'/entities',
		'scenes':	'./scenes'
	}
});

require([
	'engine/index',
	'scenes/index'
], function(engine, scenes){
	window.engine = engine;
	
	engine.canvas = '#screen';
	
	scenes(engine);
	
	engine.ready(function(){
		engine.sys.init(engine.canvas)
		.attr({
			clearColor:	'#336'
		})
		.start();
		
		engine.scene('home').enter();
	});
});
