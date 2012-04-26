define(['engine/engine', 'entities/player'], function(Engine, Player){
	var	engine = new Engine({
		screen:	$('#screen')[0],
		
		map:	'home',
		
		init:	function(){
			var self = this;

			self.world.createEntity(Player, {
				name:       'player',
				position:   self.world.toXY(6, 6)
			});
		},
		
		update:	function(){},
		
		paint:	function(){}
	});

////////////////////////////////
//	RUN
	return engine;
});
