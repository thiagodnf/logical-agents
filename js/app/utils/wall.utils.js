define([
	'random_utils',
	'array_utils',
], function(RandomUtils, ArrayUtils) {

	'use strict';

    return {
		getBasicWalls: function(lines, columns){
            var walls = [];

            for (var j = 0; j < lines; j++) {
                for (var i = 0; i < columns; i++) {
                    if(j == 0 || j == lines - 1 || i == 0 || i == columns - 1){
                        walls.push( i + "_" + j);
                    }
                }
            }

            return walls;
        },
		getBombermanWalls: function(lines, columns){

		},
		getRandomWalls: function(lines, columns){
			var walls = this.getBasicWalls(lines, columns);



			return walls;
		},
		getCornerWalls: function(lines, columns){

		},
		getRoomWalls: function(lines, columns){
			var walls = this.getBasicWalls(lines, columns);

			

			return walls;
		},
		getWalls: function(map, lines, columns){
			if( ! map){
				throw TypeError("Map cannot be undefined");
			}
			if( ! lines){
				throw TypeError("Lines cannot be undefined");
			}
			if( ! columns){
				throw TypeError("Columns cannot be undefined");
			}

			if(map == "clear"){
				return this.getBasicWalls(lines, columns);
			}else if(map == "bomberman"){
				return this.getBombermanWalls(lines, columns);
			}else if(map == "random"){
				return this.getRandomWalls(lines, columns);
			}else if(map == "corner"){
				return this.getCornerWalls(lines, columns);
			}else if(map == "room"){
				return this.getRoomWalls(lines, columns);
			}
        }
	};
});
