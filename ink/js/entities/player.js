define(function(){
	return function(engine){
		engine.c('animate')
		.requires('flicker')
		.defines({
			animate:function(name){
				var a = this.animations[name].slice();
				a.push(name);
				return this.flicker.apply(this, a);
			}
		});

		engine.c('player')
		.requires('sprite update animate characters.png')
		.defines({
			sizeX:	25,
			sizeY:	25,
			
			frameX:	25,
			frameY:	25,
			
			regX:	24 / 2,
			regY:	24 / 2,
			
			update:	function(tick){
			}
		}).init(function(){
			this.posX = engine.sys.sizeX / 2;
			this.posY = engine.sys.sizeY / 2;
			
			this.animations = {
				idle:	[100, [0, 1, 2, 3, 4], 100]
			};
			
			this.on('update', this.update);
			
			this.animate('idle');
		});
	};
});