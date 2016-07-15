define([
    'jquery',
    'agent',
    'action',
    'random_utils',
    'array_utils',
], function($, Agent, Action, RandomUtils, ArrayUtils) {

    var SimpleAgent = Class({ extends: Agent }, {

        // Override the constructor from "Agent".
        'private construct' : function (environment) {
            // invoke the parent constructor
            this.super('construct', environment, "Simple (or Random)");
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

            var index = RandomUtils.randInt(0, actions.length);

            return actions[index];
        },
    });

    return SimpleAgent;
});
