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
        panel.restart();
    }

    function next(){
        $("#btn-play-stop").enabled(false);
        $("#btn-next").enabled(false);
        $("#btn-restart").enabled(false);

        panel.next(function(){
            $("#btn-play-stop").enabled(true);
            $("#btn-next").enabled(true);
            $("#btn-restart").enabled(true);
        });
    }

    function playStop(){
        isPlay =  ! isPlay;

        $("#btn-next").enabled( ! isPlay);
        $("#btn-restart").enabled( ! isPlay);

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

        panel.draw();

        $('.selectpicker').selectpicker();

        $("#btn-play-stop").click(playStop);
        $("#btn-next").click(next);
        $("#btn-restart").click(restart);

        $("#speed").change(function(){
            panel.speed($( "#speed option:selected" ).val());
        });
    })
});
