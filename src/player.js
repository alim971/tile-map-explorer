/** @module Player
  * A class representing the player.
  */
export default class Player {
  /** @constructor
    * Constructs a new player instance
    * @param {float} x - the player's x position
    * @param {float} y - the player's y position
    */
  constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 32;
      this.up = true;
      this.down = false;
      this.left = false;
      this.right = false;
      this.mov = 0;
      this.time = 0;
      this.sprite = new Image(32, 32);
      this.sprite.src = "./sprite/Character.png";
  }

  makeMove() {
    if(this.time > 200) {
        this.mov = (this.mov + 32) % 128;
        this.time = 0;
    }
  }

  resetMove(){
    this.mov = 0;
  }

  /** @method update
    * Updates the player
    * @param {double} deltaT - the elapsed time
    * @param {Input} input - the input object
    */
  update(deltaT, input, map) {
    this.time += deltaT;
    var x_map = Math.ceil((this.x + 25) / 32) - 1;
    var y_map = Math.ceil((this.y + 25) / 32) - 1;
    if(input.keyPressed("ArrowLeft") && !map[Math.ceil((this.x - 1) / 32) - 1][y_map]) {
        this.x--;
        if(this.left)
          this.makeMove();
        else
          this.resetMove();
        this.left = true;
        this.up = false;
        this.down = false;
        this.right = false;
        if (this.x < 3)
            this.x = 3;
    }
    else if(input.keyPressed("ArrowRight")  && !map[Math.ceil((this.x + 1 + this.radius) / 32) - 1][y_map]) {
        this.x++;
        if(this.right)
            this.makeMove();
        else
            this.resetMove();
        this.right = true;
        this.up = false;
        this.down = false;
        this.left = false;
        if (this.x + this.radius > 1024)
            this.x = 1023 - this.radius;
    }
    else if(input.keyPressed("ArrowUp")  && !map[x_map][Math.ceil((this.y - 1) / 32) - 1]) {
        this.y--;
        if(this.up)
            this.makeMove();
        else
            this.resetMove();
        this.up = true;
        this.down = false;
        this.left = false;
        this.right = false;
        if (this.y < 3)
            this.y = 3;
    }
    else if(input.keyPressed("ArrowDown") && !map[x_map][Math.ceil((this.y + 1 + this.radius) / 32) - 1]) {
        this.y++;
        if(this.down)
            this.makeMove();
        else
            this.resetMove();
        this.down = true;
        this.up = false;
        this.left = false;
        this.right = false;
        if (this.y + this.radius > 765)
            this.y = 768 - this.radius;
    }
  }

  /** @method render
    * Renders the player
    * @param {double} deltaT - elapsed time
    * @param {Context2D} context - the rendering context
    */
  render(deltaT, context) {
      if (this.up) {
          context.drawImage(this.sprite, 32, this.mov, 32, 32,
              this.x, this.y, 32, 32);
      } else if (this.down) {
          context.drawImage(this.sprite, 0, this.mov, 32, 32,
              this.x, this.y, 32, 32);
      } else if (this.left) {
          context.drawImage(this.sprite, 96, this.mov, 32, 32,
              this.x, this.y, 32, 32);
      } else if (this.right) {
          context.drawImage(this.sprite, 64, this.mov, 32, 32,
              this.x, this.y, 32, 32);
      }
  }

}
