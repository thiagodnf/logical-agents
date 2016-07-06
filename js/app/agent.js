define([
    'random_utils',
    'snap_svg',
    'array_utils',
    'random_rule',
    'action',
    'perception',
    'jquery',
], function(RandomUtils, Snap, ArrayUtils, RandomRule, Action, Perception, $) {

	'use strict';

    function Agent(env) {

        this.id = 1;

        this.env = env;

        this.lastPos = [];

        this.img;

        this.cleanedDirt = 0;

        this.steps = 0;

        this.maxSteps = -1;

        this.initialize = function(){
            this.lastPos = [];

            this.lastPos.push({i:1, j:1});

            this.cleanedDirt = 0;

            this.steps = 0;

            var str = '';

            str += '<a href="#" class="list-group-item clearfix">';
            str += '<img src="%%IMAGE%%" width="20px"/>';
            str += ' %%NAME%% <span id="%%ID%%" class="badge">0</span>';
            str += '</a>';

            str = str.replace("%%NAME%%", this.getName());
            str = str.replace("%%ID%%", "agent_"+this.id);
            str = str.replace("%%IMAGE%%", "images/agents/" + this.id +".png");

            $("#agent-list").append(str);
        }
        this.draw = function(){
            var x = this.getI() * this.env.size;
            var y = this.getJ() * this.env.size;

            this.img = this.env.snap.image("images/agents/" + this.id +".png", x, y, this.env.size, this.env.size);
        };

        this.next = function(callback){

            if(this.env.maxSteps != -1 && this.steps >= this.env.maxSteps){
                return this.update(callback);
            }

            var perceptions = Perception.getPerceptions(this)

            var action = this.getAction(perceptions);

            if(this.isValidAction(perceptions, action)){
                this.execute(action, callback);
            }else{
                this.update(callback);
            }
        }

        this.isValidAction = function(perceptions, action){
            if(action == Action.MOVE_TO_TOP && ArrayUtils.contains(perceptions, Perception.OBSTACLE_ON_TOP)){
                return false;
            }

            if(action == Action.MOVE_TO_BOTTOM && ArrayUtils.contains(perceptions, Perception.OBSTACLE_ON_BOTTOM)){
                return false;
            }

            if(action == Action.MOVE_TO_LEFT && ArrayUtils.contains(perceptions, Perception.OBSTACLE_ON_LEFT)){
                return false;
            }

            if(action == Action.MOVE_TO_RIGHT && ArrayUtils.contains(perceptions, Perception.OBSTACLE_ON_RIGHT)){
                return false;
            }

            return true;
        }

        this.execute = function(action, callback){
            var that = this;

            var i = this.getI();
            var j = this.getJ();

            if(action == Action.MOVE_TO_TOP){
                j--;
            }else if(action == Action.MOVE_TO_BOTTOM){
                j++;
            }else if(action == Action.MOVE_TO_LEFT){
                i--;
            }else if(action == Action.MOVE_TO_RIGHT){
                i++;
            }else if(action == Action.CLEAR){
                var dirt = this.env.snap.select("#dirt_" + i + "_" + j);

                if(dirt != null){
                    dirt.remove();
                }

                this.cleanedDirt++;
            }

            if(this.getI() != i || this.getJ() != j){
                this.steps++;
            }

            this.lastPos.push({i:i, j:j});
        };

        this.getI = function(){
            return this.lastPos[this.lastPos.length - 1].i;
        };

        this.getJ = function(){
            return this.lastPos[this.lastPos.length - 1].j;
        };

        this.isAtPosition = function(i, j){
            return this.getI() == i && this.getJ() == j;
        }

        this.update = function(callback){
            var that = this;

            $("#agent_"+this.id).text(this.cleanedDirt);

            var i = this.getI();
            var j = this.getJ();

            this.img.animate({
                x: i * this.env.size,
                y: j * this.env.size
            }, this.env.speed, null, function(){
                if(callback) callback();
            });
        };
    }

    return Agent;
});
