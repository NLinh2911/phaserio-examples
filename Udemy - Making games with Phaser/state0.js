// CHANGE BETWEEN STATES, SCALE MODE, CAMERA, ANIMATION, KEYBOARD EVENTS
var demo = {},
	cursors,
	centerX = 1500 / 2,
	centerY = 1000 / 2,
	adam, speed = 200; // our game object

demo.state0 = function () {};
demo.state0.prototype = {
	preload: function () {
		game.load.spritesheet('adam', 'assets/spritesheets/adamSheet.png', 240, 370);
		game.load.image('tree', 'assets/backgrounds/treeBG.png');
	},
	create: function () {
		//game.stage.backgroundColor = '#800080';
		// function to change between states
		addChangeStateEventListeners();
		
		// allows the game screen to automatically adjust to any screen size
	  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	  // aligning the canvas element horizontally and vertically, always centered on screen regardless of size
	  game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
		

		// Use physics.arcade for the game physics engine
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Set world bounds since our background is 2810x1000 
		game.world.setBounds(0, 0, 2813, 1000);
		// Add sprites and images
		game.add.sprite(0, 0, 'tree');
		adam = game.add.sprite(centerX, centerY, 'adam');
		adam.anchor.set(0.5);
		adam.scale.set(0.7);
		// enable physics for adam
		game.physics.arcade.enable(adam);
		adam.body.collideWorldBounds = true;
		// Add animations to adam
		adam.animations.add('walk', [0, 1, 2, 3, 4], 15, true);


		// Our controls: This populates the cursors object with four properties: up, down, left, right, that are all instances of Phaser.Key objects
		cursors = game.input.keyboard.createCursorKeys();

		// Camera follows adam
		game.camera.follow(adam);
		//  The deadzone is a Rectangle that defines the limits at which the camera will start to scroll
		//  It does NOT keep the target sprite within the rectangle, all it does is control the boundary
		//  at which the camera will start to move. So when the sprite hits the edge, the camera scrolls
		//  (until it reaches an edge of the world)
		game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 600, 1000);

	},
	update: function () {

		// movement control
		if (cursors.right.isDown) {
			adam.animations.play('walk');
			adam.body.velocity.x = speed;
			adam.scale.set(0.7, 0.7);
		} else if (cursors.left.isDown) {
			adam.animations.play('walk');
			adam.body.velocity.x = -speed;
			adam.scale.set(-0.7, 0.7);
		} else if (cursors.up.isDown) {
			adam.animations.play('walk');
			adam.body.velocity.y = -speed;
			// stop adam from moving up too high - only want adam to move on the brown road
			// in console.log -> adam.y shows adam y coordinate
			if (adam.y < 395) {
				adam.y = 395;
			}
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

// TO CHANGE BETWEEN STAGES
function changeState(i, stateNum) {
	// in phaser callball function is called with another params - i which carries all the events info
	console.log('state' + stateNum);
	game.state.start('state' + stateNum);
}

function addKeyCallback(key, fn, args) {
	game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners() {
	addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
	addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
	addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
	addKeyCallback(Phaser.Keyboard.THREE, changeState, 3);
	addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4);
	addKeyCallback(Phaser.Keyboard.FIVE, changeState, 5);
	addKeyCallback(Phaser.Keyboard.SIX, changeState, 6);
	addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7);
	addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8);
	addKeyCallback(Phaser.Keyboard.NINE, changeState, 9);
}
