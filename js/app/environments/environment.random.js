define([
    'jquery',
    'environment',
    'random_utils',
    'array_utils'
], function($, Environment, RandomUtils, ArrayUtils) {

	'use strict';

    var EnvironmentRandom = Class({ extends: Environment }, {

        // Override the constructor from "Environment".
        'private construct' : function (id, type, size, lines, columns) {
            // invoke the parent constructor
            this.super('construct', id, type, size, lines, columns);
        },
        generateWalls: function(lines, columns){
            var walls = this.getBasicWalls(lines, columns);

            var originalSize = walls.length;

			var max = parseInt(0.1 * (lines * columns));

			while((walls.length - originalSize) < max){
				var j = RandomUtils.randInt(1, lines - 2);
				var i = RandomUtils.randInt(1, columns - 2);

				//prevents an agent is blocked
				if(i == 1 && j == 1){
					continue;
				}
				if(i == 1 && j == 2){
					continue;
				}
				if(i == 2 && j == 1){
					continue;
				}
				if(i == 2 && j == 2){
					continue;
				}

				if( ! ArrayUtils.contains(walls, i + "_" + j)){
					walls.push(i + "_" + j);
				}
			}

            return walls;
        },
    });

    return EnvironmentRandom;
});
