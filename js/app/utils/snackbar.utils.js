define([

], function() {

	'use strict';

    return {
		info: function(msg, callback){
			$.snackbar({
				htmlAllowed: true, // allows HTML as content value
				//content: msg+" <a id='btn-undo' href='#' class='text-right'>Undo</a>",
				content: msg,
				timeout: 5000
			});
			//$("#btn-undo").click(callback);
		},
		alert: function(msg, callback){
			$.snackbar({
				htmlAllowed: true, // allows HTML as content value
				content: "<span style='color:#ff4d4d'>Ops!</span> " + msg,
				timeout: 5000
			});
		},
		success: function(msg, callback){
			$.snackbar({
				htmlAllowed: true, // allows HTML as content value
				content: "<span style='color:#00cd00'>Success!</span> " + msg,
				timeout: 5000
			});
		},
		warning: function(msg, callback){
			$.snackbar({
				htmlAllowed: true, // allows HTML as content value
				content: "<span style='color:#FFFF00'>Warning!</span> " + msg,
				timeout: 5000
			});
		},
	};
});
