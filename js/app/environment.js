define([
    'jquery',
    'agent',
    'snap_svg',
], function($, Agent, Snap) {

	'use strict';

    function Environment(id, walls, dirts, rule, lines, columns) {

        this.id = id;

        this.dirts = dirts;

        this.walls = walls;

        this.snap = Snap(id);

        this.size = 25;

        this.lines = lines;

        this.columns = columns;

        this.agent = new Agent(this, rule);

        this.drawGrid = function(){
            var str = "";

            for ( var i = 2; i < this.lines-1; i++) {
                var line = this.snap.line(0, 0.5 + i * this.size, this.columns * this.size, i * this.size+0.5);
                line.attr({stroke: "#000", strokeWidth: 1, strokeLinecap:"round"});
            }

            for ( var j = 2; j < this.columns-1; j++) {
                var line = this.snap.line(0.5 + j * this.size, 0, 0.5+j * this.size, this.lines * this.size);
                line.attr({stroke: "#000", strokeWidth: 1, strokeLinecap:"round"});
            }
        }

        this.drawWalls = function(){
            for (var i = 0; i < this.walls.length; i++) {
                var pos = this.walls[i].split("_");
                this.snap.image("images/wall_28.png", pos[0]*this.size, pos[1]*this.size, this.size, this.size);
            }
            /*for (var i = 0; i < this.lines; i++) {
                for (var j = 0; j < this.columns; j++) {
                    if(j == 0 || j == this.columns-1 || i == 0 || i == this.lines-1){
                        this.snap.image("images/wall_28.png", j*this.size, i*this.size, this.size, this.size);
                    }
                }
            }*/
        }

        this.drawDirts = function(){
            for (var i = 0; i < this.dirts.length; i++) {

                var pos = this.dirts[i].split("_");

                var img = this.snap.image("images/dirt.png", pos[0]*this.size+4, pos[1]*this.size+4, this.size-4,  this.size-4);

                img.attr({
                    id: "dirt_" + this.dirts[i],
                    class: "dirt"
                });
            };
        };

        this.drawCells = function(){
            for ( var j = 0; j < this.lines; j++) {

                for ( var i = 0; i < this.columns; i++) {

                    var cell = this.snap.rect(i*this.size, j*this.size, this.size, this.size);

                    cell.attr({
                        id: "cell_" + i + "_" + j,
                        fill: "#d0dafd",
                        class: "cells",
                    });
                }
            }
        };

        this.draw = function(){
            $(this.id).html("");

            $(this.id).width(this.columns*this.size);
            $(this.id).height(this.lines*this.size);

            this.drawCells();
            this.drawGrid();
            this.drawWalls();
            this.drawDirts();

            this.agent.draw();
        };
    }

    return Environment;
});
