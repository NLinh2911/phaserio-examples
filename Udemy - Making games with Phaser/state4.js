// TWEENS
var i;
demo.state4 = function(){};
demo.state4.prototype = {
  preload: function(){},
  create: function(){
    game.stage.backgroundColor = '#cc66ff';
    addChangeStateEventListeners();

    a1 = game.add.sprite(50, 100, 'adam');
    a2 = game.add.sprite(350, 100, 'adam');
    a3 = game.add.sprite(650, 100, 'adam');
    a4 = game.add.sprite(950, 100, 'adam');
    a5 = game.add.sprite(1250, 100, 'adam');
		
		// {y: '+400'} changes value by adding 400px to y postion
		// over 2000ms
		// change pattern 'Quad.easeOut'
		// true means tween starts automatically
    game.add.tween(a1).to({y: '+400'}, 2000, 'Quad.easeOut', true);
		// this i is only called when i.start() fires in console
    i = game.add.tween(a2).to({x: 100, y: 0}, 1000, 'Elastic.easeOut');
    game.add.tween(a3).from({y: 1000}, 1500, 'Circ.easeOut', true);
		// To change property like anchor 
		// the 6th params - boolean: 'true' means the tween repeats once. We can change 'true' to 2 -> repeat twices -> here we set false
		// the 7th params - boolean: 'true' means yoyo -> the tween automatically reverses itself -> sprite moves back to the original position
		// loop(true) -> loop infinitely
    game.add.tween(a4.anchor).to({x: 1}, 1000, 'Linear', true, 1000, false, true).loop(true);
    game.add.tween(a5).to({alpha: 0}, 1000, 'Bounce', true);
  }
};
