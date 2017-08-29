// TILE, TILEMAP, TILE COLLISION,
var grass, rocks;
demo.state1 = function () {};
demo.state1.prototype = {
	preload: function () {
		// load titemap
		// 2nd params: null can be a json object 
		// 3rd params: default file type is csv, so specify that we use json
		game.load.tilemap('field', 'assets/tilemaps/field.json', null, Phaser.Tilemap.TILED_JSON);
		// load tile images
		game.load.image('grassTiles', 'assets/tilemaps/grassTiles.png');
		game.load.image('rockTiles', 'assets/tilemaps/rockTiles.png');
	},
	create: function () {
		game.stage.backgroundColor = '#DDDDDD';
		addChangeStateEventListeners();
		// allows the game screen to automatically adjust to any screen size
	  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	  // aligning the canvas element horizontally and vertically, always centered on screen regardless of size
	  game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
		
		// add titemap as background
		var map = game.add.tilemap('field');
		// need to add tileset to map -> no tileset image -> json file doesn't load tilemap
		map.addTilesetImage('grassTiles');
		map.addTilesetImage('rockTiles');

		// add layers to tilemap - order matters - if rocks before grass -> grass will cover all rocks
		grass = map.createLayer('grass');
		rocks = map.createLayer('rocks');
		// set collision with tiles - collision with rocks is true
		// have to look up index of the colliding tiles in the json files
		// rock layer has tile position in a data array -> value 0 stands for no rocks and rocks values are from 1 to 9
		// collide with tile 1 to 9, collision enables true with layer 'rocks'
		//map.setCollisionBetween(1, 9, true, 'rocks'); // check tile index starts from 1 to 9 inclusive
		// or ByExclusion checks all layer except the index in arr [0]
		map.setCollisionByExclusion([0], true, 'rocks');
		map.setCollision(11, true, 'grass');

		// since we start physics in state0, in the same game, we don't need to do it again

		// add adam - adam var is already declared in state0
		adam = game.add.sprite(250, 250, 'adam');
		adam.scale.set(0.2, 0.2);
		game.physics.enable(adam);
		//
		adam.body.collideWorldBounds = true;
		// Add animations to adam
		adam.animations.add('walk', [0, 1, 2, 3, 4], 15, true);

		cursors = game.input.keyboard.createCursorKeys();
	},
	update: function () {
		// check collions with rock
		// can add a callback func 
		game.physics.arcade.collide(adam, rocks, function () {
			console.log('Hitting rocks')
		});
		game.physics.arcade.collide(adam, grass, function () {
			console.log('Hitting grass')
		});
	
		// movement control
		if (cursors.right.isDown) {
			adam.animations.play('walk');
			adam.body.velocity.x = speed;
			adam.scale.set(0.2, 0.2);
		} else if (cursors.left.isDown) {
			adam.animations.play('walk');
			adam.body.velocity.x = -speed;
			adam.scale.set(-0.2, 0.2);
		} else if (cursors.up.isDown) {
			adam.animations.play('walk');
			adam.body.velocity.y = -speed;
		} else if (cursors.down.isDown) {
			adam.animations.play('walk');
			adam.body.velocity.y = speed;
		} else {
			adam.animations.stop();
			// reset velocity
			adam.body.velocity.x = 0;
			adam.body.velocity.y = 0;
			adam.frame = 0;
		}
	}
};