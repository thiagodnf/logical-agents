define([
	'array_utils',
	'action',
	'perception',
	'full_memory_rule',
	'random_utils',
], function(ArrayUtils, Action, Perception, FullMemoryRule, RandomUtils) {

	'use strict';

    function IntelligentRule() {

		this.memory = [];

		this.rule = new FullMemoryRule(false);

    	this.getOptions = function(agent){

			var options = this.rule.getOptions(agent);

			console.log(options)
			/*

			this.memory.push(agent.i + "_" + agent.j);

			if(options.length == 0){
				options = this.rule.getOptions(agent);
			}

			var vPoints = this.getExtremePointsVertical();
			var hPoints = this.getExtremePointsHorizontal();

			var noVisitedCells = this.getNoVisitedCells(hPoints, vPoints);

			var nearPoint = this.getNearCell(agent, noVisitedCells);

			if(nearPoint){
				if(agent.i > nearPoint[0]){
					ArrayUtils.removeByElement(options, Action.MOVE_TO_RIGHT);
					//options = [Action.MOVE_TO_LEFT];
				}
				if(agent.i < nearPoint[0]){
					ArrayUtils.removeByElement(options, Action.MOVE_TO_LEFT);
					//options = [Action.MOVE_TO_RIGHT];
				}
				if(agent.j < nearPoint[1]){
					ArrayUtils.removeByElement(options, Action.MOVE_TO_UP);
					//options = [Action.MOVE_TO_BOTTOM];
				}
				if(agent.j > nearPoint[1]){
					ArrayUtils.removeByElement(options, Action.MOVE_TO_BOTTOM);
					//options = [Action.MOVE_TO_TOP];
				}
			}

/*
			if(options.length == 0){
				console.log("preso");

				/*

				var noVisitedCells = this.getNoVisitedCells(hPoints, vPoints);

				var nearPoint = this.getNearCell(agent, noVisitedCells);

				options = this.rule.getOptions(agent);

				console.log(options);


			}
*/
			return options;
        };

		this.getNearCell = function(agent, noVisitedCells){
			var minDistance = 99999;
			var nearPoint = undefined;

			for(var i = 0; i < noVisitedCells.length; i++){
				var point = noVisitedCells[i].split("_");

				var distance = this.euclidianDistance(agent.i, agent.j, point[0], point[1]);

				if(distance < minDistance){
					minDistance = distance;
					nearPoint = point;
				}
			}

			return nearPoint;
		}

		this.getNoVisitedCells = function(hPoints, vPoints){
			var noVisitedCells = [];

			for(var i = hPoints.min; i <= hPoints.max; i++){
				for(var j = vPoints.min; j <= vPoints.max; j++){
					if( ! ArrayUtils.contains(this.memory, i + "_" + j)){
						noVisitedCells.push(i + "_" + j)
					}
				}
			}

			return noVisitedCells;
		};

		this.euclidianDistance = function(p1, p2, q1, q2){
			return Math.sqrt(Math.pow(q1 - p1, 2) + Math.pow(q2 - p2, 2));
		}

		this.getExtremePointsHorizontal = function(){
			var max = -1;
			var min = 99999;

			for(var i = 0; i < this.memory.length; i++){
				var split = this.memory[i].split("_");

				if(parseInt(split[0]) > max){
					max = parseInt(split[0]);
				}
				if(parseInt(split[0]) < min){
					min = parseInt(split[0]);
				}
			}

			return {max: max, min: min};
		}

		this.getExtremePointsVertical = function(){
			var max = -1;
			var min = 99999;

			for(var i = 0; i < this.memory.length; i++){
				var split = this.memory[i].split("_");

				if(parseInt(split[1]) > max){
					max = parseInt(split[1]);
				}
				if(parseInt(split[1]) < min){
					min = parseInt(split[1]);
				}
			}

			return {max: max, min: min};
		}
    };

	return IntelligentRule;
});
