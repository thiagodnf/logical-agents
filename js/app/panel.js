define([
    'jquery',
    'environment',
    'random_utils',
    'random_rule',
    'previous_memory_rule',
    'full_memory_rule',
    'zig_zag_rule',
    'greedy_rule',
    'intelligent_rule',
    'wall_utils',
    'array_utils',
], function($, Environment, RandomUtils, RandomRule, PreviousMemoryRule, FullMemoryRule, ZigZagRule, GreedyRule, IntelligentRule, WallUtils, ArrayUtils) {

	'use strict';

    var environments = [];

    var dirts = [];

    var walls = [];

    var lines = 13;

    var columns = 13;

    var speed = 200;

    var map = "clear";

    var maxSteps = -1;

    function Panel(id, type) {

        this.initialize = function(){
            this.generateWalls();
            this.generateDirts();
            this.start();
        }

        this.generateDirts = function(){
            dirts = [];

            while(dirts.length < 12){
                var i = RandomUtils.randInt(1, lines - 2);
                var j = RandomUtils.randInt(1, columns - 2);

                if( ! ArrayUtils.contains(walls, i + "_" + j)){
                    if( ! ArrayUtils.contains(dirts, i + "_" + j)){
                        dirts.push(i + "_" + j);
                    }
                }
            }
        }

        this.generateWalls = function(){
            walls = WallUtils.getWalls(map, lines, columns);
        };

        this.start = function(){
            environments = [];

            environments.push(new Environment("#random-agent", walls, dirts, new RandomRule(), lines, columns));
            environments.push(new Environment("#previous-memory-agent", walls, dirts, new PreviousMemoryRule(), lines, columns));
            environments.push(new Environment("#full-memory-agent", walls, dirts, new FullMemoryRule(), lines, columns));
            environments.push(new Environment("#zig-zag-agent", walls, dirts, new ZigZagRule(), lines, columns));
            environments.push(new Environment("#greedy-agent", walls, dirts, new GreedyRule(), lines, columns));
            //environments.push(new Environment("#intelligent-agent", walls, dirts, new IntelligentRule(), lines, columns));

            this.speed(speed);

            this.maxSteps(maxSteps);

            this.map(map);

            this.draw();
        }

        this.map = function(value){
            map = value;
        };

        this.draw = function(){
            $.each(environments, function(index, environment){
                environment.draw();
            });
        }

        this.speed = function(value){
            speed = value;

            $.each(environments, function(index, environment){
                environment.agent.speed = parseInt(value);
            });
        };

        this.maxSteps = function(value){
            maxSteps = value;

            $.each(environments, function(index, environment){
                environment.agent.maxSteps = parseInt(value);
            });
        };

        this.next = function(callback){
            var done = 0;

            $.each(environments, function(index, environment){
                environment.agent.next(function(agent){
                    done++;

                    if(done == environments.length){
                        callback();
                    }
                });
            });
        }
    }

    return Panel;
});
