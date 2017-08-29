# Top-Down Game with Tiles - Use tiles to create Tilemaps

# Game Topics:
* Setting the game size in pixels
* Tiled basic usage
* Tile layers and object layers
* Tilemaps
* Creating sprites from object layers
* Moving a character in a top-down level

## Tileset: A tileset is a set of individual tiles, which come in an image. You can have many tilesets on your tilemaps.

## Tilemap: contains multiple tiles
* Each tile size can be 16x16, 32x32, etc. The size should be a square
* Orientation is orthogonal and file format is CSV

#### There are two types of layers:
* Tile layer: layer made of tiles/blocks.
* Objects layer: layer where you create vector objects that can contain metadata.

#### 2 Tile layer & 1 Object layer:
* backgroundLayer for non blocking elements
* blockedLayer for blocking elements such as walls, trees, etc.
* objectsLayer for game elements including player, collectables, etc.
* add 3 different types of objects or game elements: items that will be collected by the player, the player starting position, and a door that will take you to a new level
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

