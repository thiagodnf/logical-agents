define([

], function() {

	'use strict';

    return {
		// Returns a random integer between min (included) and max (excluded)
		randInt: function(min, max){
            return Math.floor(Math.random() * (max - min)) + min;
        },
	};
});
