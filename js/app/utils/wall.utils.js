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
			var walls = this.getBasicWalls(lines, columns);

			for (var j = 0; j < lines; j++) {
                for (var i = 0; i < columns; i++) {
					if(j% 2 == 0 && i%2 == 0){
						walls.push( i + "_" + j);
					}
				}
			}

			return walls;
		},
		getRandomWalls: function(lines, columns){
			var walls = this.getBasicWalls(lines, columns);

			var originalSize = walls.length;

			var max = parseInt(0.1 * (lines * columns));

			while((walls.length - originalSize) < max){
				var i = RandomUtils.randInt(1, lines - 2);
				var j = RandomUtils.randInt(1, columns - 2);

				//prevents an agent is blocked
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
					walls.push(i + "_" + j);
				}
			}

			return walls;
		},
		getCornerWalls: function(lines, columns){
			var walls = this.getBasicWalls(lines, columns);

			for (var j = 0; j < lines; j++) {
				for (var i = 0; i < columns; i++) {
					if(i > columns/2 && j < lines/2){
						walls.push( i + "_" + j);
					}
				}
			}

			return walls;
		},
		getRoomWalls: function(lines, columns){
			var walls = this.getBasicWalls(lines, columns);

			for (var i = 0; i < columns; i++) {
				for (var j = 0; j < lines; j++) {
					if(i == 3 && (j > 2 && j < lines - 3)){
						walls.push( i + "_" + j);
					}
					if(i == columns-4 && (j > 2 && j < lines - 3)){
						walls.push( i + "_" + j);
					}
					if(j == lines-4 && (i > 2 && i < columns - 3)){
						walls.push( i + "_" + j);
					}
					if(j == 3 && (i > 2 && i < columns - 3)){
						walls.push( i + "_" + j);
					}
				}
			}

			var entrance = parseInt(columns/2) + "_" + parseInt(lines-4);

			ArrayUtils.removeByElement(walls, entrance);

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
