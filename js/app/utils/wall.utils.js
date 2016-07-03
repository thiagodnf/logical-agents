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

			while((walls.length - originalSize) < 12){
				var i = RandomUtils.randInt(1, lines - 2);
				var j = RandomUtils.randInt(1, columns - 2);

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
					if(i > 5 && j < 6){
						walls.push( i + "_" + j);
					}
				}
			}

			return walls;
		},
		getRoomWalls: function(lines, columns){
			var walls = this.getBasicWalls(lines, columns);

			walls.push("4_4");
			walls.push("4_5");
			walls.push("4_6");
			walls.push("4_7");
			walls.push("4_8");

			walls.push("8_4");
			walls.push("8_5");
			walls.push("8_6");
			walls.push("8_7");
			walls.push("8_8");

			walls.push("5_4");
			walls.push("7_4");

			walls.push("5_8");
			walls.push("6_8");
			walls.push("7_8");

			return walls;
		},
		getWalls: function(map, lines, columns){
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
