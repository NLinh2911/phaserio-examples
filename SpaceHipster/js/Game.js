var SpaceHipster = SpaceHipster || {};

SpaceHipster.Game = function () {};

SpaceHipster.Game.prototype = {
	create: function () {
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

		// add player
		this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playership');
		this.player.anchor.set(0.5);
		this.player.scale.set(2);

		// this ship has animation the whole time
		this.player.animations.add('fly', [0, 1, 2, 3], 5, true);
		this.player.animations.play('fly');
		//the camera will follow the player in the world
		this.game.camera.follow(this.player);

		//player initial score of zero
		this.playerScore = 0;
		//enable player physics
		this.game.physics.arcade.enable(this.player);
		this.playerSpeed = 120;
		this.player.body.collideWorldBounds = true;

		//sounds
		this.explosionSound = this.game.add.audio('explosion');
		this.collectSound = this.game.add.audio('collect');

		// create multiple asteroids
		this.createAsteroids();
		// create collectables
		this.createCollectables();

		//show score
		this.showLabels();
	},
	update: function () {
		// when clicking left mouse -> move the player ship
		if (this.game.input.activePointer.leftButton.isDown) {
			// move to the direction of the pointer
			this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
		}

		// check collision between the player ship and asteroids
		this.game.physics.arcade.overlap(this.player, this.asteroids, this.hitAsteroid, null, this);
		// check collision between the player ship and collectables
		this.game.physics.arcade.overlap(this.player, this.collectables, this.collect, null, this);
	},

	createAsteroids: function () {
		// create a group of asteroids
		this.asteroids = this.game.add.group();

		this.asteroids.enableBody = true;
		this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;
		// generate a random number of asteroids
		var numAsteroids = this.game.rnd.integerInRange(30, 50);

		for (var i = 0; i <= numAsteroids; i++) {
			// add sprite
			var asteroid = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
			asteroid.scale.set(this.game.rnd.integerInRange(1, 3));
			//physics properties
			asteroid.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
			asteroid.body.velocity.y = this.game.rnd.integerInRange(-20, 20);
			// set immovable = true -> the trajectory of asteroids are not affected after colliding with the player ship
			asteroid.body.immovable = true;
			asteroid.body.collideWorldBounds = true;
		}
	},

	hitAsteroid: function (player, asteroid) {
		//play explosion sound
		this.explosionSound.play();
		// make the player ship explode
		var emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
		emitter.makeParticles('playerParticle', 0, 100, false, false);
		emitter.minParticleSpeed.set(-200, -200);
		emitter.maxParticleSpeed.set(200, 200);
		// fire all particles at once in 1s and the quantity of particles is 100
		emitter.start(true, 1000, null, 100);

		// kill player ship -> game over
		this.player.kill();
		this.game.time.events.add(800, this.gameOver, this);
	},

	createCollectables: function () {
		this.collectables = this.game.add.group();

		this.collectables.enableBody = true;

		//phaser's random number generator
		var numCollectables = this.game.rnd.integerInRange(30, 50)

		for (var i = 0; i <= numCollectables; i++) {
			//add sprite
			var collectable = this.collectables.create(this.game.world.randomX, this.game.world.randomY, 'power');
			collectable.animations.add('fly', [0, 1, 2, 3], 5, true);
			collectable.animations.play('fly');
		}
	},

	collect: function (player, collectable) {
		//play collect sound
		this.collectSound.play();

		//update score
		this.playerScore++;
		this.scoreLabel.text = this.playerScore;

		//remove sprite
		collectable.kill();
	},

	showLabels: function () {
		//score text
		var text = "0";
		var style = {
			font: "30px Arial",
			fill: "#fff",
			align: "center",
			boundsAlignH: "center",
			boundsAlignV: "top"
		};
		this.scoreLabel = this.game.add.text(this.game.width - 50, 50, text, style);
		this.scoreLabel.fixedToCamera = true;
	},

	gameOver: function () {
		//pass it the score as a parameter 
		// true - we want to reset the game world
		// false - don't want to delete the game's cache
		// pass playerScore - we can pass multiple params if needed
		this.game.state.start('MainMenu', true, false, this.playerScore);
	}
};
