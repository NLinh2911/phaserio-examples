# Making Game With Phaser - Udemy Course

## State like a scene in your game
* with single state game, {preload: preload, create: create, update: update} equals to game.state.add() & game.state.start()

## Game has state from 0 to 9
* Add events listeners to change between states
* Phaser.Keyboard.ONE returns the key code of number one button in keyboard

## State 0
* Set ScaleMode so we can have reponsive game screen
```js
    // we put this statement in state0 but it will apply to all states
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
```

* Use Cursors to control our player
```js
    // in create() function
    // Our controls: This populates the cursors object with four properties: up, down, left, right, that are all instances of Phaser.Key objects
    cursors = game.input.keyboard.createCursorKeys();
    // then use conditional logic in update() to set action when the key is down
```

* Use camera to follow our player - set a deadzone while the player is out of it, the camera follows

## State 1
* Tile, Tilemap
* A standard tile is 32x32px
* Like sprites, tiles are added to the game in the order in the code
* Check collision with tiles layers by setting collision of the tilemap
* *NOTE:* Sometimes, the player can still walk over the rock - an error - no solution found yet

## State 2: A cannon firing bullets
* Use group, createMultiple, setAll, getFirstDead, reset
* Set rotation following the pointer

## State 3: Buttons, Sound markers
* add.button
* event on button pressed and released -> change tint and play sound segment
* sound.addMarker('low', 0.15, 0.5); the segments lasts from 0.15s to 0.5s

## State 4: Tweens: a way to change value from one point to another point over a certain time following a pattern


## State 5: Gravity and Acceleration, Drag

## State 6: Time Events and Particle Emitter
*
## State 7: Touch Screen Swipe - Skip

## State 8: Text - Speech Box 

```js
	\\ add a new text to game
	game.add.text(x, y, text, style)
	\\ style is an object containings info about text style 
	style = {font: 'Candal', fontSize: '20px', fill: '#ffffff', align: 'center', boundsAlignH: 'left', boundsAlignV: 'middle'}
	\\ align can be left, center, right; boundsAlignH can be left, center, right; boundsAlignV can be top, middle, bottom
```
* *NOTE:* Why using sentence.setTextBounds() makes the second text disappear??? Only the first text is spelled out
## State 9: Update Score with Firebase - Skip