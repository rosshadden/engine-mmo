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
			
			speed:	2,
			
			moveTo:	function(x, y){
				this.destinationX = x * engine.tile.sizeX + this.regX || this.posX;
				this.destinationY = y * engine.tile.sizeY + this.regY || this.posY;
			},
			
			update:	function(tick){
				if(this.destinationX - this.posX > this.speed){
					this.posX += this.speed;
					this.animate('right');
				}else if(this.destinationX - this.posX < -this.speed){
					this.posX -= this.speed;
					this.animate('left');
				}else if(this.destinationY - this.posY > this.speed){
					this.posY += this.speed;
					this.animate('down');
				}else if(this.destinationY - this.posY < -this.speed){
					this.posY -= this.speed;
					this.animate('up');
				}else{
					this.animate('idle');
				}
			}
		}).init(function(){
			this.posX = engine.sys.sizeX / 2;
			this.posY = engine.sys.sizeY / 2;
			
			this.destinationX = this.posX;
			this.destinationY = this.posY;
			
			this.animations = {
				idle:	[100, [0, 1], 100],
				up:		[100, [4, 5], 100],
				down:	[100, [0, 1], 100],
				left:	[100, [2, 3], 100],
				right:	[100, [6, 7], 100]
			};
			
			this.on('update', this.update);
			
			this.animate('idle');
		});
	};
});