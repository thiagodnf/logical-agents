define([
    'random_utils',
    'snap_svg',
    'array_utils',
    'random_rule',
    'action',
    'perception',
], function(RandomUtils, Snap, ArrayUtils, RandomRule, Action, Perception) {

	'use strict';

    function Agent(env, rule) {

        this.env = env;

        this.rule = rule;

        this.i = 1;

        this.j = 1;

        this.img;

        this.speed = 200;

        this.draw = function(){
            var x = this.i * this.env.size;
            var y = this.j * this.env.size;

            this.img = this.env.snap.image("images/aspirator_28.png", x, y, this.env.size, this.env.size);
        };

        this.next = function(callback){

            var cell = this.env.snap.select("#cell_" + this.i + "_" + this.j);;

            if(cell != null){
                cell.attr("fill", "#f0f86b");
            }

            var options = [];

            if(Perception.hasDirt(this)){
				options = [Action.CLEAR];
			}else{
                options = rule.getOptions(this);
            }

            var nextAction = options[RandomUtils.randInt(0, options.length)];

            this.execute(nextAction, callback);
        }

        this.execute = function(action, callback){
            var that = this;

            if(action == Action.MOVE_TO_TOP){
                this.j--;
            }else if(action == Action.MOVE_TO_BOTTOM){
                this.j++;
            }else if(action == Action.MOVE_TO_LEFT){
                this.i--;
            }else if(action == Action.MOVE_TO_RIGHT){
                this.i++;
            }else if(action == Action.CLEAR){
                var dirt = this.env.snap.select("#dirt_" + this.i + "_" + this.j);

                if(dirt != null){
                    dirt.remove();
                }

                that.done(callback);
            }else if(action == Action.DO_NOTHING){
                that.done(callback);
            }

            if(action >= 1 && action <= 4){
                this.img.animate({
                    x: this.i * this.env.size,
                    y: this.j * this.env.size
                }, this.speed, null, function(){that.done(callback)});
            }
        };

        this.done = function(callback){
            callback();
        };
    }

    return Agent;
});
