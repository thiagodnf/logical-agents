define([

], function() {

	'use strict';

    return {
		contains: function(array, element){
			return array.indexOf(element) > -1;
		},
		removeByIndex: function(array, index) {
			if (index > -1) {
            	array.splice(index, 1);
			}
        },
        removeByElement: function(array, element) {
			this.removeByIndex(array, array.indexOf(element));
        },
	};
});
