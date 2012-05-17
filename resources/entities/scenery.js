define(function(){
	'use strict';
	
	return {
		grass: {
			requires: 'sprite zelda.png',
			defines: {
				sizeX:	16,
				sizeY:	16,
				frameX:	13.7,
				frameY:	2.8,
				collision: [
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[1, 1, 1, 1],
					[1, 1, 1, 1],
					[0, 1, 1, 0]
				]
			}
		},
		
		tree: {
			requires: 'sprite zelda.png',
			defines: {
				sizeX:	64,
				sizeY:	80,
				frameX:	0,
				frameY:	0
			}
		},
		
		treeGreen: {
			requires: 'tree',
			defines: {
				frameX:	0,
				frameY:	0
			}
		},
		
		treeRed: {
			requires: 'tree',
			defines: {
				frameX:	0,
				frameY:	1
			}
		},
		
		treeGold: {
			requires: 'tree',
			defines: {
				frameX:	0,
				frameY:	2
			}
		},
		
		treeRainbow: {
			requires: 'tree animation',
			init: function(){
				this.animation.add('idle', [1e2, [{
					x:	0,
					y:	0
				},{
					x:	0,
					y:	1
				}], -1]);
				
				this.animate('idle');
			}
		}
	};
});
