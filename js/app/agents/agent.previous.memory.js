define([
    'jquery',
    'agent',
    'action',
    'random_utils',
    'array_utils',
], function($, Agent, Action, RandomUtils, ArrayUtils) {

    // Define a class called "Employee" that extends on "Person"
    var PreviousMemoryAgent = Class({ extends: Agent }, {

        last: {
            i: -1,
            j: -1
        },
        // Override the constructor from "Agent".
        'private construct' : function (environment) {
            // invoke the parent constructor
            this.super('construct', environment, "Previous Memory");
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

            if(this.cameFromLeft(posI, posJ, this.last)){
                ArrayUtils.removeByElement(actions, Action.MOVE_TO_LEFT)
            }
            if(this.cameFromRight(posI, posJ, this.last)){
                ArrayUtils.removeByElement(actions, Action.MOVE_TO_RIGHT)
            }
            if(this.cameFromTop(posI, posJ, this.last)){
                ArrayUtils.removeByElement(actions, Action.MOVE_TO_TOP)
            }
            if(this.cameFromBottom(posI, posJ, this.last)){
                ArrayUtils.removeByElement(actions, Action.MOVE_TO_BOTTOM)
            }

            this.last.i = posI;
            this.last.j = posJ;

            var index = RandomUtils.randInt(0, actions.length);

            return actions[index];
        },
        cameFromLeft: function(posI, postJ, last){
    		return last.i == (parseInt(posI) - 1);
    	},
    	cameFromRight: function(posI, postJ, last){
    		return last.i == (parseInt(posI) + 1);
    	},
    	cameFromTop: function(posI, postJ, last){
    		return last.j == (parseInt(postJ) - 1);
    	},
    	cameFromBottom: function(posI, postJ, last){
    		return last.j == (parseInt(postJ) + 1);
    	},
    });

    return PreviousMemoryAgent;
});
