define([
    'jquery',
    'bootstrap',
    'bootstrap_select',
    'bootstrap_submenu',
    'jquery_form_validator',
    'environment',
], function($, Bootstrap, BootstrapSelect, BootstrapSubmenu, JQueryFormValidator, Environment) {

    $.fn.enabled = function(isEnable){
        if(isEnable){
            $(this).removeAttr("disabled");
        }else{
            $(this).attr("disabled", "disabled");
        }
    };

    $.fn.changeTextAndIcon = function(icon, text){
        $(this).html('<span class="glyphicon ' + icon + '" aria-hidden="true"></span> ' + text);
    };

    var isPlay = false;

    var environment;

    function restart(){
        environment.start();
    }

    function next(){
        $(".btn-toolbar").enabled(false);

        environment.next(function(){
            $(".btn-toolbar").enabled(true);

            $('.selectpicker').selectpicker('refresh');
        });

        $('.selectpicker').selectpicker('refresh');
    }

    function playStop(){
        if( ! environment.hasAgents()){
            alert("You should include at least a agent");
            return;
        }

        isPlay =  ! isPlay;

        $(".btn-toolbar").enabled(! isPlay);
        $("#btn-play-stop").enabled(true);

        $('.selectpicker').selectpicker('refresh');

        if(isPlay){
            $("#btn-play-stop").changeTextAndIcon('glyphicon-stop','Stop');
        }else{
            $("#btn-play-stop").changeTextAndIcon('glyphicon-play','Play');
        }

        run();
    }

    function run(){
        if( ! isPlay){
            return;
        }

        var done = 0;

        environment.next(function(){
            done++;

            if(done == environment.agents.length){
                setTimeout(run, 0);
            }
        });
    }

    $(function(){

        var width = $(".canvas").width();
        var height = $(".canvas").height();

        var columns = parseInt(width/28);
        var lines = 17;

        environment = new Environment("#svg","clear", 28, lines, columns);
        environment.initialize();

        $('[data-submenu]').submenupicker();

        //$(".dropdown-menu > li > a").mouseover(function(){
        //    $(this).parent().addClass("open")
        //});

        $('.selectpicker').selectpicker();

        $("#btn-play-stop").click(playStop);
        $("#btn-next").click(next);
        $("#btn-restart").click(restart);

        $("#max-steps").change(function(){
            environment.maxSteps = parseInt($( "#max-steps option:selected" ).val());
        });

        $("#speed").change(function(){
            environment.speed = parseInt($( "#speed option:selected" ).val());
        });

        $(".btn-new-agent").click(function(){
            var url = $(this).attr("data-agent-url");

            if(url){
                require([url], function(Agent){
                    environment.newAgent(new Agent(environment));
                });
            }else{
                $("#new-environment").modal('show');
            }
        });

        $.validate({
    		form : '#form-new-environment',
    		onSuccess : function($form) {

                $("#new-environment").modal("hide");

                var type = $("#input-type").val();
                var size = $("#input-size").val();
                var lines = $("#input-lines").val();
                var columns = $("#input-columns").val();

                environment = new Environment("#svg", type, size, lines, columns);
                environment.initialize();

    			// Will stop the submission of the form
    			return false;
    		},
    	});
    })
});
