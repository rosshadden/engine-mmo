define([
	'./scenery'
], function(scenery){
	'use strict';
	
	return function(Σ){
		return {
			scenery:	scenery(Σ)
		};
	};
});