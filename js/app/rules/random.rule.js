define([
	'array_utils',
	'perception',
	'action',
], function(ArrayUtils, Perception, Action) {

	'use strict';

    function RandomRule() {
    	this.getOptions = function(agent){

			var options = Action.getMovementActions();

            if(Perception.hasWallOnTop(agent)){
                ArrayUtils.removeByElement(options, Action.MOVE_TO_TOP)
            }

            if(Perception.hasWallOnBottom(agent)){
                ArrayUtils.removeByElement(options, Action.MOVE_TO_BOTTOM)
            }

            if(Perception.hasWallOnLeft(agent)){
                ArrayUtils.removeByElement(options, Action.MOVE_TO_LEFT)
            }

            if(Perception.hasWallOnRight(agent)){
                ArrayUtils.removeByElement(options, Action.MOVE_TO_RIGHT)
            }

			return options;
        };
    }

	return RandomRule;
});
