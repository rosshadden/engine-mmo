define(['./entity', 'engine/draw'], function(Entity, draw){
	var Player = Entity.extend({
		init:	function(properties){
			var self = this;
			
			self._super(properties);
			
			self.isAnimated = true;
			self.isAnimating = true;
			
			self.sprite.src = 'images/characters/cecil.png';
			
			self.position = properties.position || {
				x:	0,
				y:	0
			};
			
			self.velocity = properties.velocity || {
				x:  4,
				y:  4
			};
			
			self.animation = [{
				x:			111,
				y:			3,
				w:			16,
				h:			16
			},{
				x:			128,
				y:			3,
				w:			16,
				h:			16
			}];
			
			self.currentFrame = 0;
			
			self.interval = (function(interval){
				var output;
				if(typeof interval === 'number'){
					output = function(frame){
						return frame === interval;
					};
				}else if(typeof interval === 'boolean'){
					output = function(){
						return interval;
					};
				}else if(typeof interval === 'function'){
					output = interval;
				}
				return output;
			})(properties.interval || 6);
		},
		
		move:	function(dir){
			var self = this;
		},
		
		draw:	function(){
			draw.sprite({
				src:		this.sprite,
				width:		this.dim.width,
				height:		this.dim.height,
				position:	this.position,
				sprite:		this.animation[this.spriteIndex]
			});
			
			if(this.isAnimating && this.interval(this.currentFrame)){
				this.spriteIndex = (this.spriteIndex + 1) % this.animation.length;
				this.currentFrame = 0;
			}else if(!this.isAnimating){
				this.currentFrame = 0;
			}
			
			this.currentFrame++;
		}
	});
	
	return Player;
});
