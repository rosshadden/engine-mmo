define(function(){
	return function(engine){
		engine.c('player')
		.require('images/characters/cecil.png sprite')
		.namespace({
			update:	function(tick){
				this.screen.setPos(this);
				
				console.log('updating');
			}
		})
		.extend({
		}).init(function(){
			this.on('update', this.update);
		});
	};
});