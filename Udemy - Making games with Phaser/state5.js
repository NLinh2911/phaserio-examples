// GRAVITY AND ACCELERATION
var accel = 400,
	jumpSpeed = -250,
	platform, platformGroup, hitPlatform;
demo.state5 = function () {};
demo.state5.prototype = {
	preload: function () {
		game.load.image('platform', 'assets/sprites/platform.png');
	},
	create: function () {
		game.stage.backgroundColor = '#b3fff0';
		addChangeStateEventListeners();

		//
		adam = game.add.sprite(centerX, 800, 'adam');
		adam.anchor.set(0.5);
		adam.scale.set(0.6);

		platform = game.add.sprite(0, 800, 'platform');
		platformGroup = game.add.group();
		for (var i = 0; i < 3; i++) {
			platformGroup.create(1000 + 600*i, 350 * i + 100, 'platform');
		}
		for (var i = 0; i < 3; i++) {
			platformGroup.create(650 + 600*i, 400, 'platform');
		}
		// enable physics for all objects
		game.physics.enable([adam, platform, platformGroup]);

		adam.body.gravity.y = 500;
		adam.body.bounce.y = 0.3;
		// without drag, adam moves even when no key is pressed
		adam.body.drag.x = 400;
		adam.body.collideWorldBounds = true;
		// Add animations to adam
		adam.animations.add('walk', [0, 1, 2, 3, 4], 20, true);

		// immovable so that platforms do not fall down
		platform.body.immovable = true;
		platformGroup.setAll('body.immovable', true);

		cursors = game.input.keyboard.createCursorKeys();
		// camera
		game.camera.follow(adam);
		game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 600, 1000);
	},
	update: function () {
		// check collision between adam and platforms
		hitPlatform = game.physics.arcade.collide(adam, [platform, platformGroup]);

		// movement control
		if (cursors.right.isDown) {
			adam.animations.play('walk');
			adam.body.acceleration.x = accel;
			adam.scale.set(0.6, 0.6);
		} else if (cursors.left.isDown) {
			adam.animations.play('walk');
			adam.body.acceleration.x = -accel;
			adam.scale.set(-0.6, 0.6);
		} else if (cursors.up.isDown) {
			adam.body.velocity.y = jumpSpeed;
		} else {
			adam.animations.stop();
			// reset acceleration
			adam.body.acceleration.x = 0;
			adam.frame = 0;
		}

	}
};