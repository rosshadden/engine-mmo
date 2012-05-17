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

			posX:	0,
			posY:	0,

			destination: {
				x: 0,
				y: 0
			},
			
			frameX:	16,
			frameY:	16,
			
			regX:	16 / 2,
			regY:	16 / 2,
			
			speed:	4,

			path:	[],
			
			moveRequest:	function(position){
				this.net.emit('moveRequest', position);
			},
			
			setPath:	function(path){
				this.path = path;
			},

			move:	function(){
				var dir,
					Δx = Σ.tile.toPosX(this.destination.x) - this.posX + this.regX,
					Δy = Σ.tile.toPosY(this.destination.y) - this.posY + this.regY;

				if(Δx > 0){
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
			},
			
			warp:	function(position){
				this.posX = Σ.tile.toPosX(position.x) + this.regX;
				this.posY = Σ.tile.toPosY(position.y) + this.regY;

				this.destination.x = position.x;
				this.destination.y = position.y;
			},
			
			update:	function(){
				var nextStop;

				if(this.path.length > 0){
					if(this.destination.x === Σ.tile.toTileX(this.posX) && this.destination.y === Σ.tile.toTileY(this.posY)){
						nextStop = this.path.shift();

						this.destination.x = nextStop.x;
						this.destination.y = nextStop.y;
					}
				}

				this.move();
			}
		}).init(function(){
			var self = this;
			
			self.animation.add({
				idle:	[0, 0],
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
					self.setPath(player.path.slice());
				}
			});
			
			this.animate('idle');
		});
	};
});
