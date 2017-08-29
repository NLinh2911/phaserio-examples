// TIME EVENTS AND PARTICLES

demo.state6 = function () {};
demo.state6.prototype = {
	preload: function () {
		game.load.image('volcano', 'assets/sprites/volcano.png');
		game.load.image('redBall', 'assets/sprites/redBall.png');
		game.load.image('orBall', 'assets/sprites/orBall.png');
	},
	create: function () {
		game.stage.backgroundColor = '#3939ac';
		addChangeStateEventListeners();

		game.add.sprite(centerX, 1000, 'volcano').anchor.set(0.5, 1);

		// Create an emitter with x = centerX, y = 500, maxNumber = 2000 particles
		var emitter = game.add.emitter(centerX, 500, 2000);
		// Make particles
		// The first arrays contain what particles we want to use
		// 0 is the default frame if we use spritesheet, we can specify frames
		// 5000 particles
		// false - do not collide with arcade body - we don't have an arcade body
		// true - collide with world bounds
		emitter.makeParticles(['redBall', 'orBall'], 0, 5000, false, true);
		// make particles have
		emitter.minParticleSpeed.set(-300, -100);
		emitter.maxParticleSpeed.set(300, -300);
		// falling down faster
		emitter.gravity.y = 300;


		// Add time event, start emitter
		game.time.events.add(2000, function () {
			// false - do not fire all particles at once
			// each particle lasts 5000s
			// fire every 20s
			emitter.start(false, 5000, 20);
			// infinite time loop - check the emitter every 500s 
//			game.time.events.loop(500, function() {
//        if (emitter.on) {
//          emitter.on = false;
//        } else {
//          emitter.on = true;
//        }
//      });
		});
	},
	update: function () {}
};