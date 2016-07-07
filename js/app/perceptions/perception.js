define([
	'array_utils'
], function(ArrayUtils) {

	'use strict';

    return {
		OBSTACLE_ON_TOP: "OBSTACLE_ON_TOP",
		OBSTACLE_ON_BOTTOM: "OBSTACLE_ON_BOTTOM",
		OBSTACLE_ON_LEFT: "OBSTACLE_ON_LEFT",
		OBSTACLE_ON_RIGHT: "OBSTACLE_ON_RIGHT",
		HAS_DIRT: "HAS_DIRT",
		getPerceptions: function(agent){
			var perceptions = [];

			var walls = agent.env.getWalls();
			var i = agent.getI();
			var j = agent.getJ();

			if(this.hasDirt(agent)){
				perceptions.push(this.HAS_DIRT);
			}

			if(this.hasWallOnTop(walls, i, j)){
                perceptions.push(this.OBSTACLE_ON_TOP);
            }
            if(this.hasWallOnBottom(walls, i, j)){
                perceptions.push(this.OBSTACLE_ON_BOTTOM);
            }
            if(this.hasWallOnLeft(walls, i, j)){
                perceptions.push(this.OBSTACLE_ON_LEFT);
            }
            if(this.hasWallOnRight(walls, i, j)){
                perceptions.push(this.OBSTACLE_ON_RIGHT);
            }

			if(this.hasAgentOnLeft(agent)){
                perceptions.push(this.OBSTACLE_ON_LEFT);
            }
			if(this.hasAgentOnRight(agent)){
                perceptions.push(this.OBSTACLE_ON_RIGHT);
            }
			if(this.hasAgentOnTop(agent)){
                perceptions.push(this.OBSTACLE_ON_TOP);
            }
			if(this.hasAgentOnBottom(agent)){
                perceptions.push(this.OBSTACLE_ON_BOTTOM);
            }

			return perceptions;
		},
		hasDirt: function(agent){
			return agent.env.getSnap().select("#dirt_" + agent.getI() + "_" + agent.getJ()) != null;
		},
		hasWallOnRight: function(walls, i, j){
            return ArrayUtils.contains(walls, (parseInt(i)+1) + "_" + j);
        },
        hasWallOnLeft: function(walls, i, j){
            return ArrayUtils.contains(walls, (parseInt(i)-1) + "_" + j);
        },
        hasWallOnTop: function(walls, i, j){
            return ArrayUtils.contains(walls, i + "_" + (parseInt(j)-1));
        },
        hasWallOnBottom: function(walls, i, j){
            return ArrayUtils.contains(walls, i + "_" + (parseInt(j)+1));
        },
		hasAgentOnLeft: function(agent){
			for(var i = 0; i < agent.env.getAgents().length; i++){
				if(agent.env.getAgents()[i].isAtPosition((parseInt(agent.getI())-1), agent.getJ())){
					return true;
				}
			}
			return false;
        },
		hasAgentOnRight: function(agent){
			for(var i = 0; i < agent.env.getAgents().length; i++){
				if(agent.env.getAgents()[i].isAtPosition((parseInt(agent.getI())+1), agent.getJ())){
					return true;
				}
			}
			return false;
        },
		hasAgentOnTop: function(agent){
			for(var i = 0; i < agent.env.getAgents().length; i++){
				if(agent.env.getAgents()[i].isAtPosition(agent.getI(), (parseInt(agent.getJ())-1))){
					return true;
				}
			}
			return false;
        },
		hasAgentOnBottom: function(agent){
			for(var i = 0; i < agent.env.getAgents().length; i++){
				if(agent.env.getAgents()[i].isAtPosition(agent.getI(), (parseInt(agent.getJ())+1))){
					return true;
				}
			}
			return false;
        },
	};
});
