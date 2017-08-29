# Space Exploration Game - SpaceHipster

# Game Topics:
* Game states
* Game basic configuration
* Preloading assets
* Working with sprites and spritesheets
* Audio
* Autoscrolling tiles
* Adding a welcome screen
* Creating game elements
* Basic 2D physics
* Handing input (single click or tap)
* Particles: Particles are a game development technique that allows you to work with many individual elements or “particles”. This can be used to simulate explosions, emissions and much more.
* Game over


## Game States 
#### Boot
* Load preload assets -> create a preload bar
* Improve game experience since sometimes, loading game assets can take long time
* Define game configurations e.g. scale mode, screen size, physics engine

#### Preload
* Load game assets: images, sprites, audios

#### MainMenu
* Preset a welcome screen with tiles background
* tileSprite: a sprite repeats over an area
* create autoscrolling effects of tileSprite
* Display text
* Play/ start game when clicking left mouse

#### Game
* Create player ship, runs an animation of the player all the time
* Player follows pointer
* Create a group of asteroids -> random quantity, positon, scale
* Asteroids collision creates explosion effect with particle emitter
* Create a group of collectables -> increase score after collecting collectables
* Gameover: start MainMenu state again -> pass score

