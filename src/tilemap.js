/** @module Tilemap
 * A class representing the player.
 */

import $ from 'jquery';
export default class Tilemap {
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
    renderLayers(layers) {
        layers = $.isArray(layers) ? layers : this.data.layers;
        for(var i = 0; i < layers.length; i++)
            this.renderLayer(layers[i]);
    }
    loadTileset() {
        this.data = require('./maps/untitled.json');
        this.tileset = $("<img />", {src: this.data.tilesets[0].image})[0];
        this.renderLayer();
    }
    render(deltaT, contex){
        this.renderLayer();
    }
    update(deltaT, input) {

    }

}
