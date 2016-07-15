define([
    'jquery',
    'environment',
    'array_utils',
], function($, Environment, ArrayUtils) {

	'use strict';

    var EnvironmentRoom = Class({ extends: Environment }, {

        // Override the constructor from "Environment".
        'private construct' : function (id, type, size, lines, columns) {
            // invoke the parent constructor
            this.super('construct', id, type, size, lines, columns);
        },
        generateWalls: function(lines, columns){
            var walls = this.getBasicWalls(lines, columns);

            for (var i = 0; i < columns; i++) {
				for (var j = 0; j < lines; j++) {
					if(i == 3 && (j > 2 && j < lines - 3)){
						walls.push( i + "_" + j);
					}
					if(i == columns-4 && (j > 2 && j < lines - 3)){
						walls.push( i + "_" + j);
					}
					if(j == lines-4 && (i > 2 && i < columns - 3)){
						walls.push( i + "_" + j);
					}
					if(j == 3 && (i > 2 && i < columns - 3)){
						walls.push( i + "_" + j);
					}
				}
			}

			var entrance = parseInt(columns/2) + "_" + parseInt(lines-4);

			ArrayUtils.removeByElement(walls, entrance);

			return walls;
        },
    });

    return EnvironmentRoom;
});
