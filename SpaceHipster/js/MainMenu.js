var SpaceHipster = SpaceHipster || {};
// In this screen we’ll start by showing a scrolled stars background and some text
SpaceHipster.MainMenu = function () {};

SpaceHipster.MainMenu.prototype = {
	// add an init() method in MainMenu to receive the score of the game
	init: function (score) {
		var score = score || 0;
		this.highestScore = this.highestScore || 0;
		this.highestScore = Math.max(score, this.highestScore);
	},
	
	create: function () {
		// TileSprites is when you repeat a tile many times to cover a certain area. 
		//show the space tile, repeated
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

		//By using autoscroll and setting a speed in x and y we can make that infinite scrolling effect
		// give it speed in x & y
		this.background.autoScroll(-20, 10);

		//start game text
		var text = "Click to begin";
		var style = {
			font: "30px Arial",
			fill: "#fff",
			align: "center",
			boundsAlignH: "center",
			boundsAlignV: "top"
		};
		var t = this.game.add.text(this.game.width / 2, this.game.height / 2, text, style);
		t.anchor.set(0.5);

		//highest score
		text = "Highest score: " + this.highestScore;
		style = {
			font: "15px Arial",
			fill: "#fff",
			align: "center",
			boundsAlignH: "center",
			boundsAlignV: "top"
		};

		var h = this.game.add.text(this.game.width / 2, this.game.height / 2 + 50, text, style);
		h.anchor.set(0.5);
	},
	update: function () {
		if (this.game.input.activePointer.leftButton.isDown) {
			this.game.state.start('Game');
		}
	}
};
