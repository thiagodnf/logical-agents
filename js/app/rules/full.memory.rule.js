define([
	'array_utils',
	'perception',
	'action',
	'previous_memory_rule',
], function(ArrayUtils, Perception, Action, PreviousMemoryRule) {

	'use strict';

    function FullMemoryRule() {

		this.memory = [];

		this.rule = new PreviousMemoryRule();

    	this.getOptions = function(agent){

			var options = this.rule.getOptions(agent);

			if(Perception.visitedLeftCell(agent, this.memory)){
				ArrayUtils.removeByElement(options, Action.MOVE_TO_LEFT)
			}

			if(Perception.visitedRightCell(agent, this.memory)){
				ArrayUtils.removeByElement(options, Action.MOVE_TO_RIGHT)
			}

			if(Perception.visitedTopCell(agent, this.memory)){
				ArrayUtils.removeByElement(options, Action.MOVE_TO_TOP)
			}

			if(Perception.visitedBottomCell(agent, this.memory)){
				ArrayUtils.removeByElement(options, Action.MOVE_TO_BOTTOM)
			}

			this.memory.push(agent.i + "_" + agent.j);

			if(options.length == 0){
				var last = this.memory[this.memory.length -2].split("_");
				options = new PreviousMemoryRule(last[0], last[1]).getOptions(agent);
			}

			return options;
        };
    };

	return FullMemoryRule;
});
