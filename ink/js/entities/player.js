define(function(){
	return function(engine){
		engine.c('player')
		.require('sprite images/characters/cecil.png')
		.namespace({
			update:	function(tick){
				this.screen.setPos(this);
			}
		})
		.extend({
		}).init(function(){
		});
	};
});