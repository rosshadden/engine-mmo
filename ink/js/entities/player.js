define(function(){
	return function(engine){
		engine.c('player')
		.requires('sprite images/characters/cecil.png update')
		.defines({
			update:	function(tick){
			}
		}).init(function(){
			this.sizeX = 200;
			this.sizeY = 200;
			
			this.on('update', this.update);
		});
	};
});