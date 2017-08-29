// ROTATION, SPRITE GROUP, FIRE BULLETS, OVERLAP
var barrel, bullets, bullet, enemy, enemyGroup, velocity = 500,
	nextFire = 0,
	fireRate = 200;
demo.state2 = function () {};
demo.state2.prototype = {
	preload: function () {
		game.load.image('base', 'assets/sprites/cannonBase.png');
		game.load.image('barrel', 'assets/sprites/cannonBarrel.png');
		game.load.image('bullet', 'assets/sprites/bullet.png');
	},
	create: function () {
		game.stage.backgroundColor = '#ffb3b3';
		addChangeStateEventListeners();

		// Create cannon
		// Add the cannon base in the center of the screen
		var base = game.add.sprite(centerX, centerY, 'base');
		base.anchor.setTo(0.5);
		base.scale.set(0.4);


		// Add bullets
		bullets = game.add.group();
		bullets.enableBody = true;
		//bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(50, 'bullet');
		// When the number of bullets is 50, if we fire more than 50, an error appears
		// Fix it by killing bullet after they leave the game world bounds
		// for all bullets property 'checkWorldBounds' is set to true -> game will check if the object is within the bounds
		bullets.setAll('checkWorldBounds', true);
		// kill bullets if out of bounds 
		bullets.setAll('outOfBoundsKill', true);
		bullets.setAll('anchor.y', 0.5);
		bullets.setAll('scale.x', 0.85);
		bullets.setAll('scale.y', 0.85);
		// Add cannon barrel after bullet so that bullets don't go over the barrel
		barrel = game.add.sprite(centerX, centerY, 'barrel');
		barrel.scale.setTo(0.5);
		barrel.anchor.setTo(0.3, 0.5);

		// Create one big adam to the left
		enemy = game.add.sprite(100, 200, 'adam');
		game.physics.enable(enemy);
		// Create a group of adam to the right
		enemyGroup = game.add.group();
		enemyGroup.enableBody = true;
		//enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;

		for (var i = 0; i < 3; i++) {
			enemyGroup.create(1300, 350 * i + 100, 'adam');
		}

		enemyGroup.setAll('anchor.y', 0.5);
		enemyGroup.setAll('anchor.x', 0.5);
		enemyGroup.setAll('scale.x', 0.4);
		enemyGroup.setAll('scale.y', 0.4);
	},
	update: function () {

		// allow cannon to rotate following the mouse pointer 
		barrel.rotation = game.physics.arcade.angleToPointer(barrel);

		// When the mouse is clicked -> fire a bullet
		if (game.input.activePointer.isDown) {
			// fire() is a method of state2 object - this refers to the demo.state2 object
			this.fire();
		}

		// Check if bullets hit enemies
		game.physics.arcade.overlap(enemyGroup, bullets, null, this.killEnemy);
		game.physics.arcade.overlap(enemy, bullets, null, this.killEnemy);
	},

	// Add fire function
	fire: function () {
		// However, if the cannon fires too fast and there are 50 fired bullets on screen -> error happens since no bullet is yet out of bounds and killed -> so create a big amount of bullets e.g. 500 or slow down the firing rate
		// Limit the fire rate with nextFire time
		if (game.time.now > nextFire) {
			nextFire = game.time.now + fireRate;
			//console.log('Fire!');
			// add bullet
			bullet = bullets.getFirstDead();
			bullet.reset(barrel.x, barrel.y);

			game.physics.arcade.moveToPointer(bullet, velocity);
			// set the rotation of the bullet
			bullet.rotation = game.physics.arcade.angleToPointer(bullet);
		}
	},
	killEnemy: function (hitEnemy, bullet) {
		bullet.kill();
		hitEnemy.kill();
	}

};
