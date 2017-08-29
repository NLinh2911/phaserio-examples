// TEXT - SPEECH BOX
var text;

WebFontConfig = {
	google: {
		families: ['Candal', 'Montserrat']
	}
};

demo.state8 = function () {};
demo.state8.prototype = {
	preload: function () {
		game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
	},

	create: function () {
		game.stage.backgroundColor = '#98FB98';
		addChangeStateEventListeners();

		//
		text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices enim sem, quis interdum velit blandit eget. Suspendisse mollis est a lectus dictum ornare. Donec a suscipit magna. Sed mauris turpis, tristique quis ante ut, ullamcorper facilisis nisl. Proin quis orci faucibus, congue nisi ac, imperdiet justo. Donec scelerisque, libero.';


		this.spellOutText(100, 50, 1000, text, 40, 40, '#fff', 'Candal', "center", "center", "top");
		this.spellOutText(100, 650, 1000, text, 40, 20, '#000', 'Montserrat', "left", "right", "bottoms");
	},
	/**
	 * With new Phaser version CE v2.7.8, we need to set align, boundsAlignH, boundsalignV for text style
	 * the text is in a rectangle at coordinate x, y with width - the rectangle can be set with setTextBounds(x, y, width, height)
	 * bounsAlignH & boundsAlignV are for whole text alignment in the bound rectangle  
	 * algin is simple for alignment of each line 
	 **/
	spellOutText: function (x, y, width, text, fontSize, speed, fill, font, align, boundsAlignH, boundsAlignV) {
		var index = 0;
		var sentence = game.add.text(x, y, '', {
			fontSize: fontSize + 'px',
			fill: fill,
			font: font,
			align: align,
			boundsAlignH: boundsAlignH,
			boundsAlignV: boundsAlignV
		});
		//sentence.setTextBounds(x, y, 1200);
		// Use currentLine to the length of each line 
		var currentLine = game.add.text(10, 10, '', {
			fontSize: fontSize + 'px',
			font: font,
			align: align,
			boundsAlignH: boundsAlignH,
			boundsAlignV: boundsAlignV
		});
		// Set text alpha (opacity) to make currentLine invisible
		currentLine.alpha = 0;
		// a time loop events to add char
		var loop = game.time.events.loop(speed, addChar);

		function addChar() {
			sentence.text += text[index];
			currentLine.text += text[index];

			// move to a new line when finish a letter and the current line reachs width limit
			if (currentLine.width > width && text[index] == ' ') {
				sentence.text += '\n';
				currentLine.text = '';
			}
			// stop adding char when sentence finishes
			if (index >= text.length - 1) {
				game.time.events.remove(loop);
//				console.log('Stop!');
			}
			index++;
		}
	}
};

