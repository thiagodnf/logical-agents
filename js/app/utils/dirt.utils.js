define([
	'random_utils',
	'array_utils',
], function(RandomUtils, ArrayUtils) {

	'use strict';

    return {
		getRandomDirts: function(walls, lines, columns){
            var dirts = [];

			var max = parseInt(0.15 * (lines * columns));

            while(dirts.length < max){
				var i = RandomUtils.randInt(1, columns - 2);
                var j = RandomUtils.randInt(1, lines - 2);

				if(i == 1 && j == 1){
					continue;
				}
				if(i == 1 && j == 2){
					continue;
				}
				if(i == 2 && j == 1){
					continue;
				}
				if(i == 2 && j == 2){
					continue;
				}

                if( ! ArrayUtils.contains(walls, i + "_" + j)){
                    if( ! ArrayUtils.contains(dirts, i + "_" + j)){
                        dirts.push(i + "_" + j);
                    }
                }
            }

			return dirts;
        },
		getDirts: function(type, walls, lines, columns){
			if( ! type){
				throw TypeError("Type cannot be undefined");
			}
			if( ! walls){
				throw TypeError("Walls cannot be undefined");
			}
			if( ! lines){
				throw TypeError("Lines cannot be undefined");
			}
			if( ! columns){
				throw TypeError("Columns cannot be undefined");
			}

			if(type == "random"){
				return this.getRandomDirts(walls, lines, columns);
			}
        }
	};
});
