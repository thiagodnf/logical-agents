define([
    'jquery',
    'bootstrap',
    'bootstrap_select',
    'bootstrap_submenu',
    'jquery_form_validator',
    'joii',
    'environment',
    'environment_clear',
    'snackbar',
    'snackbar_utils',
], function($, Bootstrap, BootstrapSelect, BootstrapSubmenu, JQueryFormValidator, JOII, Environment, EnvironmentClear, Snackbar, SnackbarUtils) {

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

    function next(){
        if( ! environment.hasAgents()){
            SnackbarUtils.alert("You should include at least an agent");
            return;
        }

        $(".btn-toolbar").enabled(false);

        environment.next(function(){
            $(".btn-toolbar").enabled(true);

            $('.selectpicker').selectpicker('refresh');
        });

        $('.selectpicker').selectpicker('refresh');
    }

    function playStop(){
        if( ! environment.hasAgents()){
            SnackbarUtils.alert("You should include at least an agent");
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

            if(done == environment.getAgents().length){
                setTimeout(run, 0);
            }
        });
    }

    function createAgent(url){
        if(url){
            require([url], function(Agent){
                var agent = new Agent(environment);

                environment.newAgent(agent);

                SnackbarUtils.success("The agent called '" + agent.getName() + "' has been added");
            });
        }else{
            SnackbarUtils.error("You should define a agent");
        }
    }

    $(function(){

        var width = $(".canvas").width();
        var height = $(".canvas").height();

        var columns = parseInt(width/28);
        var lines = 18;

        $("#input-columns").val(columns);

        environment = new EnvironmentClear("#svg","clear", 28, lines, columns);
        environment.initialize();

        $('[data-submenu]').submenupicker();

        $('.selectpicker').selectpicker();

        $("#btn-play-stop").click(playStop);
        $("#btn-next").click(next);

        $("#btn-restart").click(function(){
            if(confirm("Would you like to restart the environment?")){
                environment.draw();
            }
        });

        $("#max-steps").change(function(){
            environment.setMaxsteps(parseInt($( "#max-steps option:selected" ).val()));
        });

        $("#speed").change(function(){
            environment.setSpeed(parseInt($( "#speed option:selected" ).val()));
        });

        $(".btn-new-agent").click(function(){
            createAgent($(this).attr("data-agent-url"));
        });

        $("#btn-new-environment").click(function(){
            $("#new-environment").modal('show');
        });

        $.validate({
    		form : '#form-new-environment',
    		onSuccess : function($form) {

                $("#new-environment").modal("hide");

                var url = $("#input-type").val();
                var size = $("#input-size").val();
                var lines = $("#input-lines").val();
                var columns = $("#input-columns").val();

                console.log("Loading " + url);

                if(url == "app/environments/environment.clear"){
                    url = 'environment_clear';
                }

                if(url){
                    require([url], function(Environment){
                        environment = new Environment("#svg", url, size, lines, columns);
                        environment.initialize();

                        SnackbarUtils.success("The environment has been generated");
                    });
                }else{
                    SnackbarUtils.alert("You should define a url for the environment before");
                }

    			// Will stop the submission of the form
    			return false;
    		},
    	});

        $("#btn-example-custom-agent").click(function(){
            $("#input-url-agent").val("https://pastebin.com/raw/4KieFF0t");
        })

        $.validate({
    		form : '#form-new-custom-agent',
    		onSuccess : function($form) {

                $("#new-custom-agent").modal("hide");

                createAgent($("#input-url-agent").val());

    			// Will stop the submission of the form
    			return false;
    		},
    	});
    })
});
