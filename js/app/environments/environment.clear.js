define([
    'jquery',
    'environment',
], function($, Environment) {

	'use strict';

    var EnvironmentClear = Class({ extends: Environment }, {

        // Override the constructor from "Environment".
        'private construct' : function (id, type, size, lines, columns) {
            // invoke the parent constructor
            this.super('construct', id, type, size, lines, columns);
        },
        generateWalls: function(lines, columns){
            return this.getBasicWalls(lines, columns);
        },
    });

    return EnvironmentClear;
});
