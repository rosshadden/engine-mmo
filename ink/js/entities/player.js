define(function(){
	'use strict';
	
	return function(Σ){
		Σ.c('animation')
		.requires('flicker')
		.namespaces({
			current:	'',
			
			list:	{},
			
			add:	function(key, value){
				if(Σ.is(value)){
					this.list[key] = value;
				}else{
					for(var item in key){
						this.list[item] = key[item];
					}
				}
				
				return this;
			}
		})
		.defines({
			animate:	function(name){
				var animation = this.animation.list[name].slice();
				
				animation.push(name);
				this.animation.current = name;
				
				return this.flicker.apply(this, animation);
			}
		});

		Σ.c('player')
		.requires('sprite animation update net characters.png')
		.defines({
			sizeX:	16,
			sizeY:	16,
			
			frameX:	16,
			frameY:	16,
			
			regX:	16 / 2,
			regY:	16 / 2,
			
			speed:	4,
			
			moveRequest:	function(position){
				this.net.emit('moveRequest', position);
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
				var dir,
					Δx = this.destinationX - this.posX,
					Δy = this.destinationY - this.posY;
				
				if(Δx === 0 && Δy === 0){
					dir = 'idle';
				}else if(Δx > 0){
					this.posX += this.speed;
					dir = 'right';
				}else if(Δx < 0){
					this.posX -= this.speed;
					dir = 'left';
				}else if(Δy > 0){
					this.posY += this.speed;
					dir = 'down';
				}else if(Δy < 0){
					this.posY -= this.speed;
					dir = 'up';
				}else{
					dir = 'idle';
				}

				if(dir !== this.animation.current){
					this.animate(dir);
				}
			}
		}).init(function(){
			var self = this;
			
			self.animation.add({
				idle:	[1e3, [0]],
				up:		[200, [4, 5], -1],
				down:	[200, [0, 1], -1],
				left:	[200, [2, 3], -1],
				right:	[200, [6, 7], -1]
			});
			
			self.on('update', self.update);
			
			self.net.on('set', function(params){
				self.attr(params);
			});
			
			self.net.on('move', function(player){
				if(player.id === self.id){
					self.moveTo(player.position);
				}
			});
			
			this.animate('idle');
		});
	};
});
