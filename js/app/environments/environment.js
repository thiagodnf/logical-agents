define([
    'jquery',
    'agent',
    'snap_svg',
    'random_utils',
    'array_utils',
    'dirt_utils'
], function($, Agent, Snap, RandomUtils, ArrayUtils, DirtUtils) {

	'use strict';

    // Define a simple class called "Environment".
    var Environment = Class({
        id: '',

        type: '',

        size: '',

        lines: '',

        columns: '',

        agentID: 1,

        speed: 200,

        maxSteps: -1,

        dirts: [],

        walls: [],

        agents: [],

        snap: '',
        // Declare a constructor to be executed upon instantiation.
        'private construct': function (id, type, size, lines, columns) {
            this.id = id;
            this.type = type;
            this.size = size;
            this.lines = lines;
            this.columns = columns;
            this.snap = Snap(id);
        },
        initialize: function(){
            //this.walls = WallUtils.getWalls(this.type, this.lines, this.columns);

            this.walls = this.generateWalls(this.lines, this.columns);
            this.dirts = DirtUtils.getDirts("random", this.walls, this.lines, this.columns);

            this.draw();
        },
        drawGrid: function(){
            var str = "";

            for ( var i = 2; i < this.lines-1; i++) {
                var line = this.snap.line(0, 0.5 + i * this.size, this.columns * this.size, i * this.size+0.5);
                line.attr({stroke: "#c9e6f2", strokeWidth: 1, strokeLinecap:"round"});
            }

            for ( var j = 2; j < this.columns-1; j++) {
                var line = this.snap.line(0.5 + j * this.size, 0, 0.5+j * this.size, this.lines * this.size);
                line.attr({stroke: "#c9e6f2", strokeWidth: 1, strokeLinecap:"round"});
            }
        },
        drawWalls: function(){
            for (var i = 0; i < this.walls.length; i++) {
                var pos = this.walls[i].split("_");
                this.snap.image("images/wall_28.png", pos[0]*this.size, pos[1]*this.size, this.size, this.size);
            }
        },
        drawDirts: function(){
            for (var i = 0; i < this.dirts.length; i++) {

                var pos = this.dirts[i].split("_");

                var img = this.snap.image("images/dirt.png", pos[0]*this.size+4, pos[1]*this.size+4, this.size-4,  this.size-4);

                img.attr({
                    id: "dirt_" + this.dirts[i],
                    class: "dirt"
                });
            };
        },
        newAgent: function(agent){
            if( this.agents.length == 10){
                alert("You cant include new agents");
                return;
            }

            agent.setId(this.agentID++);

            this.agents.push(agent);

            agent.initialize();

            agent.draw();
        },
        drawAgents: function(){
            for (var i = 0; i < this.agents.length; i++) {
                this.agents[i].initialize();
                this.agents[i].draw();
            }
        },
        draw: function(){
            $(this.id).html("");

            $(".agent-list").html("");

            $(this.id).width(this.columns*this.size);
            $(this.id).height(this.lines*this.size);

            this.drawGrid();
            this.drawWalls();
            this.drawDirts();
            this.drawAgents();

            $(".panel").height($(".canvas").height());
        },
        next: function(callback){
            $.each(this.agents, function(index, agent){
                agent.next();
            });

            $.each(this.agents, function(index, agent){
                agent.update(callback);
            });
        },
        hasAgents: function(){
            return this.agents.length != 0;
        },
        getBasicWalls: function(lines, columns){
            var walls = [];

            for (var j = 0; j < lines; j++) {
                for (var i = 0; i < columns; i++) {
                    if(j == 0 || j == lines - 1 || i == 0 || i == columns - 1){
                        walls.push( i + "_" + j);
                    }
                }
            }

            return walls;
        },
        generateWalls: function(lines, columns){
            return this.getBasicWalls(lines, columns);
        },
    });

    return Environment;
});
