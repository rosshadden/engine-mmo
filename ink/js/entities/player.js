define(function(){
	'use strict';
	
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
		.requires('sprite update animate net characters.png')
		.defines({
			sizeX:	25,
			sizeY:	25,
			
			frameX:	25,
			frameY:	25,
			
			regX:	24 / 2,
			regY:	24 / 2,
			
			speed:	4,
			
			moveRequest:	function(position){
				this.emit('moveRequest', position);
			},
			
			moveTo:	function(position){
				var x = position.x,
					y = position.y;
				
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
			var self = this;
			
			self.posX = engine.sys.sizeX / 2;
			self.posY = engine.sys.sizeY / 2;
			
			self.destinationX = self.posX;
			self.destinationY = self.posY;
			
			self.animations = {
				idle:	[100, [0, 1], 100],
				up:		[100, [4, 5], 100],
				down:	[100, [0, 1], 100],
				left:	[100, [2, 3], 100],
				right:	[100, [6, 7], 100]
			};
			
			self.on('update', self.update);
			
			self.on('click', function(x, y){
				x = ~~(x / engine.tile.sizeX);
				y = ~~(y / engine.tile.sizeY);
				
				self.moveRequest({
					x:	x,
					y:	y
				});
			});
			
			self.bind('move', function(position){
				self.moveTo(position);
			});
			
			self.animate('idle');
		});
	};
});