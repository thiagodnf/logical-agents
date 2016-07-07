define([
    'jquery',
    'agent',
    'action',
    'random_utils',
    'array_utils',
], function($, Agent, Action, RandomUtils, ArrayUtils) {

    // Define a class called "Employee" that extends on "Person"
    var FullMemoryAgent = Class({ extends: Agent }, {

        memory: [],
        // Override the constructor from "Agent".
        'private construct' : function (environment) {
            // invoke the parent constructor
            this.super('construct', environment, "Full Memory");
        },
        getAction: function(posI, posJ, perceptions){

            var actions = Action.getMovementActions();

            if(ArrayUtils.contains(perceptions, "HAS_DIRT")){
                return Action.CLEAR;
            }

            if(ArrayUtils.contains(perceptions, "OBSTACLE_ON_TOP")){
                ArrayUtils.removeByElement(actions, Action.MOVE_TO_TOP);
            }
            if(ArrayUtils.contains(perceptions, "OBSTACLE_ON_BOTTOM")){
                ArrayUtils.removeByElement(actions, Action.MOVE_TO_BOTTOM);
            }
            if(ArrayUtils.contains(perceptions, "OBSTACLE_ON_LEFT")){
                ArrayUtils.removeByElement(actions, Action.MOVE_TO_LEFT);
            }
            if(ArrayUtils.contains(perceptions, "OBSTACLE_ON_RIGHT")){
                ArrayUtils.removeByElement(actions, Action.MOVE_TO_RIGHT);
            }

            if(this.visitedLeftCell(posI, posJ, this.memory)){
				ArrayUtils.removeByElement(actions, Action.MOVE_TO_LEFT)
			}
			if(this.visitedRightCell(posI, posJ, this.memory)){
				ArrayUtils.removeByElement(actions, Action.MOVE_TO_RIGHT)
			}
			if(this.visitedTopCell(posI, posJ, this.memory)){
				ArrayUtils.removeByElement(actions, Action.MOVE_TO_TOP)
			}
			if(this.visitedBottomCell(posI, posJ, this.memory)){
				ArrayUtils.removeByElement(actions, Action.MOVE_TO_BOTTOM)
			}

            this.memory.push(posI + "_" + posJ);

            if(actions.length == 0){
                actions = Action.getMovementActions();
            }

            var index = RandomUtils.randInt(0, actions.length);

            return actions[index];
        },
        visitedLeftCell: function(posI, postJ, memory){
			return ArrayUtils.contains(memory, (parseInt(posI)-1) + "_" + postJ);
		},
		visitedRightCell: function(posI, postJ, memory){
			return ArrayUtils.contains(memory, (parseInt(posI)+1) + "_" + postJ);
		},
		visitedTopCell: function(posI, postJ, memory){
			return ArrayUtils.contains(memory, posI + "_" + (parseInt(postJ)-1));
		},
		visitedBottomCell: function(posI, postJ, memory){
			return ArrayUtils.contains(memory, posI + "_" + (parseInt(postJ)+1));
		}
    });

    return FullMemoryAgent;
});
