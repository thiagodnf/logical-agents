![alt tag](https://raw.githubusercontent.com/thiagodnf/logical-agents/master/images/favicon/android-icon-72x72.png)
# Logical Agents

A Logical Agents is a program that percepts an input of the world and returns an action. The agent must be able to represent states and actions, incorporate new percepts, update internal representations of the world, deduce hidden properties of the world, and deduce appropriate actions.

## Goal

Taking some actions, the agent should clean the room by moving as little as possible.

## World (or environment)

The world available for the agent is composed by walls and dirts. This project implements the following worlds:

- CLEAR (default)
- BOMBERMAN
- RANDOM
- CORNER
- ROOM

Besides, you can choose one of these worlds or change the its dimensions. To do this, go to New -> Environment and create one.

## Perceptions

The agent has five sensors. The first four sensors percept objects around it, and the last one percepts objects below it So, when the agent percepts something, the following commands is returned:

- OBSTACLE_ON_TOP
- OBSTACLE_ON_BOTTOM
- OBSTACLE_ON_LEFT
- OBSTACLE_ON_RIGHT
- HAS_DIRT

Notice that the agent can percept more than one perceptions in the same time.

## Actions

When a agent percepts something, it needs to take some action. Through actuators, the agent can do one of the following actions:

- MOVE_TO_TOP
- MOVE_TO_BOTTOM
- MOVE_TO_LEFT
- MOVE_TO_RIGHT
- CLEAR
- DO_NOTHING

Notice that the agent can execute only an action in the same time. Besides, in some situations, some selected actions don't do anything. For example, if there is a wall above and the selected action is MOVE_TO_TOP, nothing happens with the agent.

## Make Your Own Agent

This projects implements a simple API for you develop and run your own agent. Access New -> Agent -> Custom and define the URL for your agent. The following code is a example of custom agent:

**Example**

```javascript
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
```

Explaining the example, the agent receives a perception array and its current position. The idea is define all possible actions and remove the wrong actions or these that do nothing. After that, randomly choose one and returns.

## Questions

* Can the agent percept dirts around it? No. The agent only percepts dirts when it is above it.

## Contact

If you encounter any problems, please use the [GitHub Issue Tracker](https://github.com/thiagodnf/logical-agents/issues) .

If you like this project, let me know.
