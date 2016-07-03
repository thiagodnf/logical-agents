define([
	'array_utils',
	'action',
	'full_memory_rule',
], function(ArrayUtils, Action, FullMemoryRule) {

	'use strict';

    function ZigZagRule() {

		this.rule = new FullMemoryRule();

    	this.getOptions = function(agent){

			var options = this.rule.getOptions(agent);

			if(ArrayUtils.contains(options, Action.MOVE_TO_BOTTOM) && ArrayUtils.contains(options, Action.MOVE_TO_RIGHT)){
                ArrayUtils.removeByElement(options, Action.MOVE_TO_BOTTOM)
            }

			if(ArrayUtils.contains(options, Action.MOVE_TO_BOTTOM) && ArrayUtils.contains(options, Action.MOVE_TO_LEFT)){
                ArrayUtils.removeByElement(options, Action.MOVE_TO_BOTTOM)
            }

			return options;
        };
    };

	return ZigZagRule;
});
