define([
    'jquery',
    'environment',
], function($, Environment) {

	'use strict';

    var EnvironmentBomberman = Class({ extends: Environment }, {

        // Override the constructor from "Environment".
        'private construct' : function (id, type, size, lines, columns) {
            // invoke the parent constructor
            this.super('construct', id, type, size, lines, columns);
        },
        generateWalls: function(lines, columns){
            var walls = this.getBasicWalls(lines, columns);

			for (var j = 0; j < lines; j++) {
                for (var i = 0; i < columns; i++) {
					if(j % 2 == 0 && i % 2 == 0){
						walls.push( i + "_" + j);
					}
				}
			}

			return walls;
        },
    });

    return EnvironmentBomberman;
});
