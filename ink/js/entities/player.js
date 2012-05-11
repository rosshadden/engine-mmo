define(function(){
	'use strict';
	
	return function(Σ){
		Σ.c('animate')
		.requires('flicker')
		.defines({
			animate:function(name){
				var a = this.animations[name].slice();
				a.push(name);
				return this.flicker.apply(this, a);
			}
		});

		Σ.c('player')
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
				this.net_emit('moveRequest', position);
			},
			
			moveTo:	function(position){
				var x = position.x,
					y = position.y;
				
				this.destinationX = x * Σ.tile.sizeX + this.regX || this.posX;
				this.destinationY = y * Σ.tile.sizeY + this.regY || this.posY;
			},
			
			warp:	function(position){
				this.posX = this.destinationX = position.x * Σ.tile.sizeX + this.regX;
				this.posY = this.destinationY = position.y * Σ.tile.sizeY + this.regY;
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
			
			self.posX = Σ.sys.sizeX / 2;
			self.posY = Σ.sys.sizeY / 2;
			
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
			
			self.net_on('set', function(params){
				self.attr(params);
			});
			
			self.net_on('move', function(player){
				if(player.id === self.id){
					self.moveTo(player.position);
				}
			});
			
			self.animate('idle');
		});
	};
});
