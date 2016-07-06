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

			if(this.hasDirt(agent)){
				perceptions.push(this.HAS_DIRT);
			}

			if(this.hasWallOnTop(agent)){
                perceptions.push(this.OBSTACLE_ON_TOP);
            }

            if(this.hasWallOnBottom(agent)){
                perceptions.push(this.OBSTACLE_ON_BOTTOM);
            }

            if(this.hasWallOnLeft(agent)){
                perceptions.push(this.OBSTACLE_ON_LEFT);
            }

            if(this.hasWallOnRight(agent)){
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
			return agent.env.snap.select("#dirt_" + agent.getI() + "_" + agent.getJ()) != null;
		},
		hasWallOnRight: function(agent){
            return ArrayUtils.contains(agent.env.walls, (parseInt(agent.getI())+1) + "_" + agent.getJ());
        },
        hasWallOnLeft: function(agent){
            return ArrayUtils.contains(agent.env.walls, (parseInt(agent.getI())-1) + "_" + agent.getJ());
        },
        hasWallOnTop: function(agent){
            return ArrayUtils.contains(agent.env.walls, agent.getI() + "_" + (parseInt(agent.getJ())-1));
        },
        hasWallOnBottom: function(agent){
            return ArrayUtils.contains(agent.env.walls, agent.getI() + "_" + (parseInt(agent.getJ())+1));
        },
		hasAgentOnLeft: function(agent){
			for(var i = 0; i < agent.env.agents.length; i++){
				if(agent.env.agents[i].isAtPosition((parseInt(agent.getI())-1), agent.getJ())){
					return true;
				}
			}
			return false;
        },
		hasAgentOnRight: function(agent){
			for(var i = 0; i < agent.env.agents.length; i++){
				if(agent.env.agents[i].isAtPosition((parseInt(agent.getI())+1), agent.getJ())){
					return true;
				}
			}
			return false;
        },
		hasAgentOnTop: function(agent){
			for(var i = 0; i < agent.env.agents.length; i++){
				if(agent.env.agents[i].isAtPosition(agent.getI(), (parseInt(agent.getJ())-1))){
					return true;
				}
			}
			return false;
        },
		hasAgentOnBottom: function(agent){
			for(var i = 0; i < agent.env.agents.length; i++){
				if(agent.env.agents[i].isAtPosition(agent.getI(), (parseInt(agent.getJ())+1))){
					return true;
				}
			}
			return false;
        },
	};
});
