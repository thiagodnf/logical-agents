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
], function($, Environment, RandomUtils, RandomRule, PreviousMemoryRule, FullMemoryRule, ZigZagRule, GreedyRule, IntelligentRule) {

	'use strict';

    var environments = [];

    var dirts = [];

    var lines = 12;

    var columns = 14;

    function Panel(id, type) {

        this.initialize = function(){
            this.generateDirts();
            this.restart();
        }

        this.generateDirts = function(){
            for(var i = 0; i < 12; i++){
                var x = RandomUtils.randInt(1, columns-2);
                var y = RandomUtils.randInt(1, lines-2);

                if(dirts.indexOf(x + "_" + y) == -1){
                    dirts.push(x + "_" + y);
                }
            }
        }

        this.restart = function(){
            environments = [];

            environments.push(new Environment("#random-agent", dirts, new RandomRule(), lines, columns));
            environments.push(new Environment("#previous-memory-agent", dirts, new PreviousMemoryRule(), lines, columns));
            environments.push(new Environment("#full-memory-agent", dirts, new FullMemoryRule(), lines, columns));
            environments.push(new Environment("#zig-zag-agent", dirts, new ZigZagRule(), lines, columns));
            environments.push(new Environment("#greedy-agent", dirts, new GreedyRule(), lines, columns));
            environments.push(new Environment("#intelligent-agent", dirts, new IntelligentRule(), lines, columns));

            this.draw();
        }

        this.draw = function(){
            $.each(environments, function(index, environment){
                environment.draw();
            });
        }

        this.speed = function(value){
            $.each(environments, function(index, environment){
                environment.agent.speed = parseInt(value);
            });
        };

        this.next = function(callback){
            var done = 0;

            $.each(environments, function(index, environment){
                environment.agent.next(function(){
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
