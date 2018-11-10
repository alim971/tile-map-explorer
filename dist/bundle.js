/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Game; });
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input */ "./src/input.js");


/** @class Game
  * A class representing the high-level functionality
  * of a game - the game loop, buffer swapping, etc.
  */
class Game {
  /** @constructor
    * Creates the game instance
    * @param {integer} width - the width of the game screen in pixels
    * @param {integer} heght - the height of the game screen in pixels
    */
  constructor(width, height) {
    this._start = null;
    this.WIDTH = width;
    this.HEIGHT = height;
    this.input = new _input__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.map = [];
    this.entities = [];

    // Set up the back buffer
    this.backBuffer = document.createElement('canvas');
    this.backBuffer.width = this.WIDTH;
    this.backBuffer.height = this.HEIGHT;
    this.backBufferCtx = this.backBuffer.getContext('2d');

    // Set up the screen buffer
    this.screenBuffer = document.createElement('canvas');
    this.screenBuffer.width = this.WIDTH;
    this.screenBuffer.height = this.HEIGHT;
    this.screenBufferCtx = this.screenBuffer.getContext('2d');
    document.body.append(this.screenBuffer);
  }
  /** @method addEntity
    * Adds an entity to the game world
    * Entities should have an update() and render()
    * method.
    * @param {Object} entity - the entity.
    */
  addEntity(entity) {
    this.entities.push(entity);
  }

  addMap(map) {
    this.map = map;
  }
  /** @method update
    * Updates the game state
    * @param {integer} elapsedTime - the number of milliseconds per frame
    */
  update(elapsedTime) {

    // Update game entitites
    this.entities.forEach(entity => entity.update(elapsedTime, this.input,this.map));

    // Swap input buffers
    this.input.update();
  }
  /** @method render
    * Renders the game state
    * @param {integer} elapsedTime - the number of milliseconds per frame
    */
  render(elapsedTime) {
    // Clear the back buffer
    this.backBufferCtx.fillStyle = "white";
    this.backBufferCtx.fillRect(0,0,this.WIDTH, this.HEIGHT);

    // TODO: Render game

    // Render entities
    this.entities.forEach(entity => entity.render(elapsedTime, this.backBufferCtx));

    // Flip the back buffer
    this.screenBufferCtx.drawImage(this.backBuffer, 0, 0);
  }
  /** @method loop
    * Updates and renders the game,
    * and calls itself on the next draw cycle.
    * @param {DOMHighResTimestamp} timestamp - the current system time
    */
  loop(timestamp) {
    var elapsedTime = this._frame_start ? timestamp - this._frame_start : 0;
    this.update(elapsedTime);
    this.render(elapsedTime);
    this._frame_start = timestamp;
    window.requestAnimationFrame((timestamp) => {this.loop(timestamp)});
  }
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _tilemap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tilemap */ "./src/tilemap.js");




// Create the game
var game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](1024, 768);

// Create the player and add it to the game
var tile = new _tilemap__WEBPACK_IMPORTED_MODULE_2__["default"]("untitled",game.backBufferCtx);
game.addEntity(tile);
game.addEntity(new _player__WEBPACK_IMPORTED_MODULE_1__["default"](60, 60));
game.addMap(tile.map);

// Start the main game loop
game.loop();


/***/ }),

/***/ "./src/input.js":
/*!**********************!*\
  !*** ./src/input.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Input; });

/** @module Input
  * A class for handling input from the user
  * will work for all keys on the keyboard
  */
class Input {
  /** @constructor
    * Constructs a new instance of the Input class
    * and attaches event listeners to the window.
    */
  constructor() {
    this.oldState = {}
    this.newState = {}

    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.newState[event.key] = true;
    });

    window.addEventListener('keyup', (event) => {
      event.preventDefault();
      this.newState[event.key] = false;
    });

  }

  /** @method update
    * Copies the new state to the old state
    */
  update() {
    this.oldState = JSON.parse(JSON.stringify(this.newState));
  }

  /** @method keyPressed
    * Returns true if the specified key is
    * currently pressed.
    * @param {String} key - the key to test
    * @return {bool} if the key is pressed
    */
  keyPressed(key) {
    return this.newState[key];
  }

  /** @method keyDown
    * Returns true if the specified key
    * went down this frame
    * @param {String} key - the key to test
    * @return {bool} if the key is pressed
    */
  keyDown(key) {
    return this.newState[key] && !this.oldState[key];
  }

  /** @method keyUp
    * Returns true if the specified key
    * went up this frame
    * @param {String} key - the key to test
    * @return {bool} if the key is pressed
    */
  keyUp(key) {
    return !this.newState[key] && this.oldState[key];
  }
}


/***/ }),

/***/ "./src/maps/untitled.json":
/*!********************************!*\
  !*** ./src/maps/untitled.json ***!
  \********************************/
/*! exports provided: height, infinite, layers, nextlayerid, nextobjectid, orientation, renderorder, tiledversion, tileheight, tilesets, tilewidth, type, version, width, default */
/***/ (function(module) {

module.exports = {"height":24,"infinite":false,"layers":[{"data":[24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,31,32,33,32,33,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,54,55,56,55,56,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,77,78,79,78,79,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,52,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,119,120,121,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,142,143,144,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,165,166,167,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,119,120,121,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,142,143,144,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,165,166,167,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24],"height":24,"id":1,"name":"Tile Layer 1","opacity":1,"type":"tilelayer","visible":true,"width":32,"x":0,"y":0},{"data":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,75,74,74,74,74,74,74,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,163,163,163,0,0,75,0,0,0,0,0,74,0,0,0,0,0,0,0,0,0,0,0,0,0,163,0,0,0,0,0,0,0,0,0,0,0,75,0,0,0,0,0,74,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,163,0,0,75,0,0,0,0,0,74,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,163,163,0,101,0,75,74,75,0,74,75,74,0,0,0,0,0,0,0,0,0,0,0,0,0,163,0,0,0,0,0,0,0,0,0,0,0,0,0,101,0,0,0,0,0,0,0,27,27,27,27,27,27,27,0,0,163,163,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,74,28,74,74,28,28,75,0,0,163,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,74,75,74,75,75,75,75,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,74,75,29,29,74,74,75,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,101,0,101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,163,0,488,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,488,488,488,488,0,0,0,0,0,0,0,0,0,0,0,0,0,163,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,488,488,488,488,488,0,0,0,0,0,0,0,0,163,163,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,488,488,488,488,488,488,488,488,488,488,488,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,488,488,488,488,488,488,488,488,488,488,488,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,488,488,488,488,488,488,488,488,0,0,0,0,0,0,0,0,0,0,0,163,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,488,488,488,488,488,488,488,488,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,488,488,488,0,0,0,0,0,0,0,0,0,0,0,0,0,0,163,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,163,0,0,0,0,0,0,0,0,0,101,0,163,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"height":24,"id":2,"name":"Tile Layer 2","opacity":1,"type":"tilelayer","visible":true,"width":32,"x":0,"y":0}],"nextlayerid":3,"nextobjectid":1,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.2.0","tileheight":32,"tilesets":[{"columns":23,"firstgid":1,"image":"/maps/32x32_map_tile v3.1.png","imageheight":928,"imagewidth":736,"margin":0,"name":"sample","spacing":0,"tilecount":667,"tileheight":32,"tilewidth":32}],"tilewidth":32,"type":"map","version":1.2,"width":32};

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
/** @module Player
  * A class representing the player.
  */
class Player {
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


/***/ }),

/***/ "./src/tilemap.js":
/*!************************!*\
  !*** ./src/tilemap.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tilemap; });
/** @module Tilemap
 * A class representing the player.
 */

class Tilemap {
    /** @constructor
     * Constructs a new player instance
     * @param {float} x - the player's x position
     * @param {float} y - the player's y position
     */
    constructor(name,canvas) {
        this.name = name;
        this.layers = [];
        this.data = [];
        this.c = canvas;
        this.map = new Array(33);

        for (var i = 0; i < 33; i++) {
            this.map[i] = new Array(2);
            for(var j = 0; j < 25; j++) {
                if (j == 25) {
                    this.map[i][j] = 1;
                } else
                    this.map[i][j] = 0;
            }
        }
        this.loadTileset();
    }

    renderLayer() {
        // data: [array of tiles, 1-based, position of sprite from top-left]
        // height: integer, height in number of sprites
        // name: "string", internal name of layer
        // opacity: integer
        // type: "string", layer type (tile, object)
        // visible: boolean
        // width: integer, width in number of sprites
        // x: integer, starting x position
        // y: integer, starting y position
        var size = this.data.tilewidth;
        let _this = this;
        let x = 0;
        let y = 0
        for(var j = 0; j < 2; j++) {
            let layer = this.data.layers[j];
            layer.data.forEach(function(tile_idx, i) {
                x = (i % layer.width);
                y = ~~(i / layer.width);
                if (!tile_idx) { return; }
                if(j == 1) {
                    _this.map[x][y] = 1;
                }
                var img_x, img_y, s_x, s_y,
                    tile = _this.data.tilesets[0];
                tile_idx--;
                img_x = (tile_idx % (tile.imagewidth / size)) * size;
                img_y = ~~(tile_idx / (tile.imagewidth / size)) * size;
                s_x = x * size;
                s_y = y * size;
                _this.c.drawImage(_this.tileset, img_x, img_y, size, size,
                    s_x, s_y, size, size);
            });
        }
    }

    loadTileset() {
        this.data = __webpack_require__(/*! ./maps/untitled.json */ "./src/maps/untitled.json");
        this.tileset = new Image(1024,768);
        this.tileset.src = "." + this.data.tilesets[0].image;
        this.renderLayer();
    }
    render(deltaT, contex){
        this.renderLayer();
    }
    update(deltaT, input) {

    }

}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map