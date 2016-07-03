define([
    'jquery',
    'bootstrap',
    'bootstrap_select',
    'panel',
], function($, Bootstrap, BootstrapSelect, Panel) {

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

    var panel = new Panel();

    function restart(){
        panel.start();
    }

    function next(){
        $("#btn-play-stop").enabled(false);
        $("#btn-next").enabled(false);
        $("#btn-restart").enabled(false);
        $("#max-steps").enabled(false);
        $("#speed").enabled(false);
        $("#map").enabled(false);

        panel.next(function(){
            $("#btn-play-stop").enabled(true);
            $("#btn-next").enabled(true);
            $("#btn-restart").enabled(true);
            $("#max-steps").enabled(true);
            $("#map").enabled(true);

            $('.selectpicker').selectpicker('refresh');
        });

        $('.selectpicker').selectpicker('refresh');
    }

    function playStop(){
        isPlay =  ! isPlay;

        $("#btn-next").enabled( ! isPlay);
        $("#btn-restart").enabled( ! isPlay);
        $("#max-steps").enabled( ! isPlay);
        $("#speed").enabled( ! isPlay);
        $("#map").enabled( ! isPlay);

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

        panel.next(function(){
            setTimeout(run, 0);
        });
    }

    $(function(){
        panel.initialize();

        $('.selectpicker').selectpicker();

        $("#btn-play-stop").click(playStop);
        $("#btn-next").click(next);
        $("#btn-restart").click(restart);

        $("#max-steps").change(function(){
            panel.maxSteps($( "#max-steps option:selected" ).val());
        });

        $("#map").change(function(){
            panel.map($( "#map option:selected" ).val());
            panel.initialize();
        });

        $("#speed").change(function(){
            panel.speed($( "#speed option:selected" ).val());
        });
    })
});
