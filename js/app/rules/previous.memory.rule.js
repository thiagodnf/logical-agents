define([
	'array_utils',
	'perception',
	'action',
	'random_rule',
], function(ArrayUtils, Perception, Action, RandomRule) {

	'use strict';

    function PreviousMemoryRule(lastI, lastJ) {

		this.last = {
			i: lastI || -1,
			j: lastJ || -1
		};

		this.rule = new RandomRule();

    	this.getOptions = function(agent){

			var options = this.rule.getOptions(agent);

			if(Perception.cameFromLeft(agent, this.last)){
				ArrayUtils.removeByElement(options, Action.MOVE_TO_LEFT)
			}

			if(Perception.cameFromRight(agent, this.last)){
				ArrayUtils.removeByElement(options, Action.MOVE_TO_RIGHT)
			}

			if(Perception.cameFromTop(agent, this.last)){
				ArrayUtils.removeByElement(options, Action.MOVE_TO_TOP)
			}

			if(Perception.cameFromBottom(agent, this.last)){
				ArrayUtils.removeByElement(options, Action.MOVE_TO_BOTTOM)
			}

			this.last.i = agent.i;
			this.last.j = agent.j;

			return options;
        };
    };

	return PreviousMemoryRule;
});
