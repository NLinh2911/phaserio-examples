var SpaceHipster = SpaceHipster || {};

//loading the game assets
SpaceHipster.Preload = function () {};


SpaceHipster.Preload.prototype = {
  preload: function() {
  	//show logo in loading screen
  	this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);
 
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
 		// pass the sprite to be a preload sprite which adjusts its width or height crop adjusted based on the percentage of the loader in real-time. This allows you to easily make loading bars for games
    this.load.setPreloadSprite(this.preloadBar);
 
  	//load game assets
  	this.load.image('space', 'assets/images/space.png');
  	this.load.image('rock', 'assets/images/rock.png');
    this.load.spritesheet('playership', 'assets/images/player.png', 12, 12);
    this.load.spritesheet('power', 'assets/images/power.png', 12, 12);
  	this.load.image('playerParticle', 'assets/images/player-particle.png');
    this.load.audio('collect', 'assets/audio/collect.ogg');
    this.load.audio('explosion', 'assets/audio/explosion.ogg');
  },
  create: function() {
  	this.state.start('MainMenu');
  }
};