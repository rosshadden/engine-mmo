define(['./entity', 'engine/draw'], function(Entity, draw){
	var Player = Entity.extend({
		init:	function(properties){
			this._super(properties);
			
			this.isAnimated = false;
			
			this.position = properties.position || {
				x:	0,
				y:	0
			};
			
			this.velocity = properties.velocity || {
				x:  4,
				y:  4
			};
			
			this.animation = [{
				x:			0,
				y:			0,
				w:			100,
				h:			100
			}];
			
			this.sprite.src = 'images/characters/cecil.png';
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
		}
	});
	
	return Player;
});
