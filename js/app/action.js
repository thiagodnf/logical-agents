define([

], function() {

	'use strict';

    return {
		MOVE_TO_TOP: 1,
		MOVE_TO_BOTTOM: 2,
		MOVE_TO_LEFT: 3,
		MOVE_TO_RIGHT: 4,
		CLEAR: 5,
		DO_NOTHING: 6,
		getMovementActions: function(){
			return [
				this.MOVE_TO_TOP,
				this.MOVE_TO_BOTTOM,
				this.MOVE_TO_RIGHT,
				this.MOVE_TO_LEFT
			];
		},
		toString: function(options){
			var str = [];

			for(var i = 0; i < options.length; i++){
				if(options[i] == this.MOVE_TO_TOP){
					str.push("MOVE_TO_TOP");
				}else if(options[i] == this.MOVE_TO_BOTTOM){
					str.push("MOVE_TO_BOTTOM");
				}else if(options[i] == this.MOVE_TO_RIGHT){
					str.push("MOVE_TO_RIGHT");
				}else if(options[i] == this.MOVE_TO_LEFT){
					str.push("MOVE_TO_LEFT");
				}
			}

			return str;
		}
	};
});
