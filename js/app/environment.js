define([
    'jquery',
    'agent',
    'snap_svg',
    'wall_utils',
    'random_utils',
    'array_utils',
    'dirt_utils'
], function($, Agent, Snap, WallUtils, RandomUtils, ArrayUtils, DirtUtils) {

	'use strict';

    function Environment(id, type, size, lines, columns) {

        this.id = id;

        this.type = type;

        this.size = size;

        this.lines = lines;

        this.columns = columns;

        this.agentID = 1;

        this.speed = 200;

        this.maxSteps = -1;

        this.dirts = [];

        this.walls = [];

        this.agents = [];

        this.snap = Snap(id);

        this.initialize = function(){
            this.walls = WallUtils.getWalls(this.type, this.lines, this.columns);
            this.dirts = DirtUtils.getDirts("random", this.walls, this.lines, this.columns);

            this.start();
        };

        this.start = function(){
            this.draw();
        }

        this.drawGrid = function(){
            var str = "";

            for ( var i = 2; i < this.lines-1; i++) {
                var line = this.snap.line(0, 0.5 + i * this.size, this.columns * this.size, i * this.size+0.5);
                line.attr({stroke: "#c9e6f2", strokeWidth: 1, strokeLinecap:"round"});
            }

            for ( var j = 2; j < this.columns-1; j++) {
                var line = this.snap.line(0.5 + j * this.size, 0, 0.5+j * this.size, this.lines * this.size);
                line.attr({stroke: "#c9e6f2", strokeWidth: 1, strokeLinecap:"round"});
            }
        }

        this.drawWalls = function(){
            for (var i = 0; i < this.walls.length; i++) {
                var pos = this.walls[i].split("_");
                this.snap.image("images/wall_28.png", pos[0]*this.size, pos[1]*this.size, this.size, this.size);
            }
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

        this.newAgent = function(agent){
            if( this.agents.length == 10){
                alert("You cant include new agents");
                return;
            }

            agent.id = this.agentID++;

            this.agents.push(agent);

            agent.initialize();

            agent.draw();
        };

        this.drawAgents = function(){
            for (var i = 0; i < this.agents.length; i++) {
                this.agents[i].initialize();
                this.agents[i].draw();
            }
        }

        this.draw = function(){
            $(this.id).html("");

            $(".agent-list").html("");

            $(this.id).width(this.columns*this.size);
            $(this.id).height(this.lines*this.size);

            this.drawGrid();
            this.drawWalls();
            this.drawDirts();
            this.drawAgents();
        };

        this.next = function(callback){
            $.each(this.agents, function(index, agent){
                agent.next();
            });

            $.each(this.agents, function(index, agent){
                agent.update(callback);
            });
        }

        this.hasAgents = function(){
            return this.agents.length != 0;
        }
    }

    return Environment;
});
