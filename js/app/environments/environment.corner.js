define([
    'jquery',
    'environment',
], function($, Environment) {

	'use strict';

    var EnvironmentCorner = Class({ extends: Environment }, {

        // Override the constructor from "Environment".
        'private construct' : function (id, type, size, lines, columns) {
            // invoke the parent constructor
            this.super('construct', id, type, size, lines, columns);
        },
        generateWalls: function(lines, columns){
            var walls = this.getBasicWalls(lines, columns);

			for (var j = 0; j < lines; j++) {
				for (var i = 0; i < columns; i++) {
					if(i > columns/2 && j < lines/2){
						walls.push( i + "_" + j);
					}
				}
			}

			return walls;
        },
    });

    return EnvironmentCorner;
});
