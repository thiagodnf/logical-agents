define([
    'jquery',
    'agent',
    'action',
    'random_utils',
    'array_utils',
], function($, Agent, Action, RandomUtils, ArrayUtils) {

    Agent.prototype.getName = function(perceptions){
        return "Simple (or Random)";
    };

    Agent.prototype.getAction = function(perceptions){

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
    }

    return Agent;
});
