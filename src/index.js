import Game from './game';
import Player from './player';
import Tilemap from './tilemap';

// Create the game
var game = new Game(1024, 768);

// Create the player and add it to the game
var tile = new Tilemap("untitled",game.backBufferCtx);
game.addEntity(tile);
game.addEntity(new Player(60, 60));
game.addMap(tile.map);

// Start the main game loop
game.loop();
