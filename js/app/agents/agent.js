define([
    'random_utils',
    'snap_svg',
    'array_utils',
    'action',
    'perception',
    'jquery',
], function(RandomUtils, Snap, ArrayUtils, Action, Perception, $) {

	'use strict';

    // Define a simple class called "Agent".
    var Agent = Class({

        // Declare a property called 'name'.
        'public immutable string name' : null,

        id: 1,

        env: undefined,

        lastPos: [],

        img: undefined,

        cleanedDirt: 0,

        steps: 0,

        maxSteps: -1,

        name: "Unknown",

        // Declare a constructor to be executed upon instantiation.
        'private construct': function (environment, name) {
            this.env = environment;
            this.name = name;
        },
        initialize: function(env){
            this.lastPos = [];
            this.lastPos.push({i:1, j:1});
            this.cleanedDirt = 0;
            this.steps = 0;

            var str = '';

            str += '<div class="agent-list-item %%CLASS%%" data-dirts="0">';
            str += '<a href="#" class="list-group-item clearfix">';
            str += '<img src="%%IMAGE%%" width="20px"/>';
            str += ' %%NAME%% <span id="%%CLASS%%" class="badge">0</span>';
            str += '</a>';

            str += '</div>';

            str = str.replace("%%NAME%%", this.getName() || "Unknown");
            str = str.replace("%%CLASS%%", "agent_"+this.id);
            str = str.replace("%%CLASS%%", "agent_"+this.id);
            str = str.replace("%%IMAGE%%", "images/agents/" + this.id +".png");

            $(".agent-list").append(str);
        },

        draw: function(){
            var x = this.getI() * this.env.getSize();
            var y = this.getJ() * this.env.getSize();

            this.img = this.env.getSnap().image("images/agents/" + this.id +".png", x, y, this.env.getSize(), this.env.getSize());
        },

        next: function(callback){

            if(this.env.getMaxsteps() != -1 && this.steps >= this.env.getMaxsteps()){
                return this.update(callback);
            }

            var perceptions = Perception.getPerceptions(this)

            var action = this.getAction(this.getI(), this.getJ(), perceptions);

            if(this.isValidAction(perceptions, action)){
                this.execute(action, callback);
            }else{
                this.update(callback);
            }
        },

        isValidAction: function(perceptions, action){
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
        },

        execute: function(action, callback){
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
                var dirt = this.env.getSnap().select("#dirt_" + i + "_" + j);

                if(dirt != null){
                    dirt.remove();
                }

                this.cleanedDirt++;
            }

            if(this.getI() != i || this.getJ() != j){
                this.steps++;
            }

            this.lastPos.push({i:i, j:j});
        },
        getI: function(){
            return this.lastPos[this.lastPos.length - 1].i;
        },
        getJ: function(){
            return this.lastPos[this.lastPos.length - 1].j;
        },
        isAtPosition: function(i, j){
            return this.getI() == i && this.getJ() == j;
        },
        update: function(callback){
            var that = this;

            $("#agent_"+this.id).text(this.cleanedDirt);
            $(".agent_"+this.id).attr("data-dirts",this.cleanedDirt);

            $('.agent-list div').sort(function(a,b){
                return parseInt(a.dataset.dirts) < parseInt(b.dataset.dirts);
            }).appendTo('.agent-list');

            var i = this.getI();
            var j = this.getJ();

            this.img.animate({
                x: i * this.env.getSize(),
                y: j * this.env.getSize()
            }, this.env.getSpeed(), null, function(){
                if(callback) callback();
            });
        },
    });

    return Agent;
});
