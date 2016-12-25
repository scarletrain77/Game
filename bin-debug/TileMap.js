// TypeScript file
var TileMap = (function (_super) {
    __extends(TileMap, _super);
    function TileMap() {
        var _this = this;
        _super.call(this);
        //地图行列数
        this._column = 10;
        this._row = 10;
        this._config = [
            { x: 0, y: 0, walkable: true, image: "road_jpg" },
            { x: 1, y: 0, walkable: true, image: "road_jpg" },
            { x: 2, y: 0, walkable: true, image: "road_jpg" },
            { x: 3, y: 0, walkable: true, image: "road_jpg" },
            { x: 4, y: 0, walkable: true, image: "road_jpg" },
            { x: 5, y: 0, walkable: true, image: "road_jpg" },
            { x: 6, y: 0, walkable: true, image: "road_jpg" },
            { x: 7, y: 0, walkable: true, image: "road_jpg" },
            { x: 8, y: 0, walkable: true, image: "road_jpg" },
            { x: 9, y: 0, walkable: true, image: "road_jpg" },
            { x: 0, y: 1, walkable: true, image: "road_jpg" },
            { x: 1, y: 1, walkable: true, image: "road_jpg" },
            { x: 2, y: 1, walkable: true, image: "road_jpg" },
            { x: 3, y: 1, walkable: true, image: "road_jpg" },
            { x: 4, y: 1, walkable: true, image: "road_jpg" },
            { x: 5, y: 1, walkable: true, image: "road_jpg" },
            { x: 6, y: 1, walkable: false, image: "block_jpg" },
            { x: 7, y: 1, walkable: true, image: "road_jpg" },
            { x: 8, y: 1, walkable: true, image: "road_jpg" },
            { x: 9, y: 1, walkable: true, image: "road_jpg" },
            { x: 0, y: 2, walkable: true, image: "road_jpg" },
            { x: 1, y: 2, walkable: true, image: "road_jpg" },
            { x: 2, y: 2, walkable: true, image: "road_jpg" },
            { x: 3, y: 2, walkable: true, image: "road_jpg" },
            { x: 4, y: 2, walkable: true, image: "road_jpg" },
            { x: 5, y: 2, walkable: true, image: "road_jpg" },
            { x: 6, y: 2, walkable: false, image: "block_jpg" },
            { x: 7, y: 2, walkable: true, image: "road_jpg" },
            { x: 8, y: 2, walkable: true, image: "road_jpg" },
            { x: 9, y: 2, walkable: true, image: "road_jpg" },
            { x: 0, y: 3, walkable: true, image: "road_jpg" },
            { x: 1, y: 3, walkable: true, image: "road_jpg" },
            { x: 2, y: 3, walkable: true, image: "road_jpg" },
            { x: 3, y: 3, walkable: true, image: "road_jpg" },
            { x: 4, y: 3, walkable: true, image: "road_jpg" },
            { x: 5, y: 3, walkable: true, image: "road_jpg" },
            { x: 6, y: 3, walkable: false, image: "block_jpg" },
            { x: 7, y: 3, walkable: true, image: "road_jpg" },
            { x: 8, y: 3, walkable: true, image: "road_jpg" },
            { x: 9, y: 3, walkable: true, image: "road_jpg" },
            { x: 0, y: 4, walkable: true, image: "road_jpg" },
            { x: 1, y: 4, walkable: true, image: "road_jpg" },
            { x: 2, y: 4, walkable: true, image: "road_jpg" },
            { x: 3, y: 4, walkable: true, image: "road_jpg" },
            { x: 4, y: 4, walkable: true, image: "road_jpg" },
            { x: 5, y: 4, walkable: true, image: "road_jpg" },
            { x: 6, y: 4, walkable: false, image: "block_jpg" },
            { x: 7, y: 4, walkable: true, image: "road_jpg" },
            { x: 8, y: 4, walkable: true, image: "road_jpg" },
            { x: 9, y: 4, walkable: true, image: "road_jpg" },
            { x: 0, y: 5, walkable: true, image: "road_jpg" },
            { x: 1, y: 5, walkable: true, image: "road_jpg" },
            { x: 2, y: 5, walkable: false, image: "block_jpg" },
            { x: 3, y: 5, walkable: true, image: "road_jpg" },
            { x: 4, y: 5, walkable: true, image: "road_jpg" },
            { x: 5, y: 5, walkable: true, image: "road_jpg" },
            { x: 6, y: 5, walkable: false, image: "block_jpg" },
            { x: 7, y: 5, walkable: true, image: "road_jpg" },
            { x: 8, y: 5, walkable: true, image: "road_jpg" },
            { x: 9, y: 5, walkable: true, image: "road_jpg" },
            { x: 0, y: 6, walkable: true, image: "road_jpg" },
            { x: 1, y: 6, walkable: true, image: "road_jpg" },
            { x: 2, y: 6, walkable: false, image: "block_jpg" },
            { x: 3, y: 6, walkable: false, image: "block_jpg" },
            { x: 4, y: 6, walkable: false, image: "block_jpg" },
            { x: 5, y: 6, walkable: false, image: "block_jpg" },
            { x: 6, y: 6, walkable: false, image: "block_jpg" },
            { x: 7, y: 6, walkable: true, image: "road_jpg" },
            { x: 8, y: 6, walkable: true, image: "road_jpg" },
            { x: 9, y: 6, walkable: true, image: "road_jpg" },
            { x: 0, y: 7, walkable: true, image: "road_jpg" },
            { x: 1, y: 7, walkable: true, image: "road_jpg" },
            { x: 2, y: 7, walkable: true, image: "road_jpg" },
            { x: 3, y: 7, walkable: true, image: "road_jpg" },
            { x: 4, y: 7, walkable: true, image: "road_jpg" },
            { x: 5, y: 7, walkable: true, image: "road_jpg" },
            { x: 6, y: 7, walkable: false, image: "block_jpg" },
            { x: 7, y: 7, walkable: true, image: "road_jpg" },
            { x: 8, y: 7, walkable: true, image: "road_jpg" },
            { x: 9, y: 7, walkable: true, image: "road_jpg" },
            { x: 0, y: 8, walkable: true, image: "road_jpg" },
            { x: 1, y: 8, walkable: true, image: "road_jpg" },
            { x: 2, y: 8, walkable: true, image: "road_jpg" },
            { x: 3, y: 8, walkable: true, image: "road_jpg" },
            { x: 4, y: 8, walkable: true, image: "road_jpg" },
            { x: 5, y: 8, walkable: true, image: "road_jpg" },
            { x: 6, y: 8, walkable: false, image: "block_jpg" },
            { x: 7, y: 8, walkable: true, image: "road_jpg" },
            { x: 8, y: 8, walkable: true, image: "road_jpg" },
            { x: 9, y: 8, walkable: true, image: "road_jpg" },
            { x: 0, y: 9, walkable: true, image: "road_jpg" },
            { x: 1, y: 9, walkable: true, image: "road_jpg" },
            { x: 2, y: 9, walkable: true, image: "road_jpg" },
            { x: 3, y: 9, walkable: true, image: "road_jpg" },
            { x: 4, y: 9, walkable: true, image: "road_jpg" },
            { x: 5, y: 9, walkable: true, image: "road_jpg" },
            { x: 6, y: 9, walkable: true, image: "road_jpg" },
            { x: 7, y: 9, walkable: true, image: "road_jpg" },
            { x: 8, y: 9, walkable: true, image: "road_jpg" },
            { x: 9, y: 9, walkable: true, image: "road_jpg" },
        ];
        for (var i = 0; i < this._config.length; i++) {
            var tiledata = new TileData(this._config[i].walkable, this._config[i].image, this._config[i].x, this._config[i].y);
            var bitmap = new Tile(tiledata);
            this.addChild(bitmap);
        }
        this._player = new Player();
        this.touchEnabled = true;
        this._player.idle();
        this.addChild(this._player);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this._moveX = new Array();
            _this._moveY = new Array();
            _this.findPathForNode(e.stageX, e.stageY);
            //console.log("point:x:" + e.stageX + "y:" + e.stageY);
        }, this);
    }
    var d = __define,c=TileMap,p=c.prototype;
    p.findPathForNode = function (touchX, touchY) {
        var playerX = Math.floor(this._player._body.x / Tile.TILE_SIZE);
        var playerY = Math.floor(this._player._body.y / Tile.TILE_SIZE);
        var gridX = Math.floor(touchX / Tile.TILE_SIZE);
        var gridY = Math.floor(touchY / Tile.TILE_SIZE);
        var astar = new AStar();
        var grid = new Grid(this._column, this._row, this._config);
        grid.setStartNode(playerX, playerY);
        grid.setEndNode(gridX, gridY);
        if (astar.findPath(grid)) {
            //var alphax = 1;
            for (var i = 0; i < astar.path.length; i++) {
                var targetX = astar.path[i].x * Tile.TILE_SIZE + Tile.TILE_SIZE / 2 - Body.RUN_BODY_W / 2;
                var targetY = astar.path[i].y * Tile.TILE_SIZE + Tile.TILE_SIZE / 2 - Body.RUN_BODY_H / 2;
                this._moveX[i] = targetX;
                this._moveY[i] = targetY;
            }
            this._player.move(this._moveX, this._moveY);
        }
    };
    return TileMap;
}(egret.DisplayObjectContainer));
egret.registerClass(TileMap,'TileMap');
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(data) {
        _super.call(this);
        this.data = data;
        var bitmap = new egret.Bitmap();
        this.addChild(bitmap);
        bitmap.texture = RES.getRes(data.image);
        bitmap.height = Tile.TILE_SIZE;
        bitmap.width = Tile.TILE_SIZE;
        bitmap.x = data.x * Tile.TILE_SIZE;
        bitmap.y = data.y * Tile.TILE_SIZE;
    }
    var d = __define,c=Tile,p=c.prototype;
    //地图的大小
    Tile.TILE_SIZE = 64;
    return Tile;
}(egret.DisplayObjectContainer));
egret.registerClass(Tile,'Tile');
var TileData = (function (_super) {
    __extends(TileData, _super);
    function TileData(walkable, image, x, y) {
        _super.call(this);
        this.walkable = walkable;
        this.image = image;
        this.x = x;
        this.y = y;
    }
    var d = __define,c=TileData,p=c.prototype;
    return TileData;
}(egret.DisplayObjectContainer));
egret.registerClass(TileData,'TileData');
//# sourceMappingURL=TileMap.js.map