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
		.requires('sprite cecil.png update animate')
		.defines({
			update:	function(tick){
				this.animate('idle');
			}
		}).init(function(){
			this.sizeX = engine.tile.sizeX;
			this.sizeY = engine.tile.sizeY;

			//setup registration point
			this.regX = this.sizeX * 0.5;
			this.regY = this.sizeY * 0.5;
			
			this.posX = 110;
			this.posY = 3;
			
			this.animations = {
				idle:	[600, [0, 1], -1]
			};
			
			this.on('update', this.update);
		});
	};
});