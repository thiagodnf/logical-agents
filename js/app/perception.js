define([
	'array_utils'
], function(ArrayUtils) {

	'use strict';

    return {
		hasDirt: function(agent){
			return agent.env.snap.select("#dirt_" + agent.i + "_" + agent.j) != null;
		},
		hasWallOnRight: function(agent){
            return ArrayUtils.contains(agent.env.walls, (parseInt(agent.i)+1) + "_" + agent.j);
        },
        hasWallOnLeft: function(agent){
            return ArrayUtils.contains(agent.env.walls, (parseInt(agent.i)-1) + "_" + agent.j);
        },
        hasWallOnTop: function(agent){
            return ArrayUtils.contains(agent.env.walls, agent.i + "_" + (parseInt(agent.j)-1));
        },
        hasWallOnBottom: function(agent){
            return ArrayUtils.contains(agent.env.walls, agent.i + "_" + (parseInt(agent.j)+1));
        },

		cameFromLeft: function(agent, last){
			return last.i == (parseInt(agent.i) - 1);
		},
		cameFromRight: function(agent, last){
			return last.i == (parseInt(agent.i) + 1);
		},
		cameFromTop: function(agent, last){
			return last.j == (parseInt(agent.j) - 1);
		},
		cameFromBottom: function(agent, last){
			return last.j == (parseInt(agent.j) + 1);
		},

		visitedLeftCell: function(agent, memory){
			return ArrayUtils.contains(memory, (parseInt(agent.i)-1) + "_" + agent.j);
		},
		visitedRightCell: function(agent, memory){
			return ArrayUtils.contains(memory, (parseInt(agent.i)+1) + "_" + agent.j);
		},
		visitedTopCell: function(agent, memory){
			return ArrayUtils.contains(memory, agent.i + "_" + (parseInt(agent.j)-1));
		},
		visitedBottomCell: function(agent, memory){
			return ArrayUtils.contains(memory, agent.i + "_" + (parseInt(agent.j)+1));
		}
	};
});
