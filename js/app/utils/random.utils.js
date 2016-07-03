define([

], function() {

	'use strict';

    return {
		randInt: function(min, max){
            return Math.floor((Math.random() * max) + min);
        },
	};
});
