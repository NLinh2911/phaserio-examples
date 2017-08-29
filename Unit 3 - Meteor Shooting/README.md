## Shooting Meteors To Protect The Earth

### Sprites: 
* Shooter/ Cannon: Chạm bắn đặt tại giữa khung game 
* Đạn: sẽ tạo 1 group đạn, có thể sử dụng for loop hoặc createMultiple để tạo nhiều đạn
* Meteors: Sao băng rơi xuống trái đất từ trên trời, sẽ tạo 1 group sao băng, có thể sử dụng for loop hoặc createMultiple để tạo nhiều sao băng
* Khi sao băng bị bắn rụng thì kill() 
* Nếu sao băng chạm trái đất thì điểm/sức khỏe của trái đất giảm, nếu đến 0 thì game over
* 

### Kiến Thức Mới:

#### Scale Manager: 
* Scaling refers to how the game canvas will scale on different screen sizes. We can make the game scale to fit on any screen size automatically during the preload stage, so we don't have to worry about it later. The other two lines of code in the preload() function are responsible for aligning the canvas element horizontally and vertically, so it is always centered on screen regardless of size.

```js
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
````