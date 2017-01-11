// TypeScript file
var TileMap = (function (_super) {
    __extends(TileMap, _super);
    function TileMap(user, userPanel) {
        _super.call(this);
        this._tiles = [];
        //地图行列数
        this._column = 10;
        this._row = 10;
        this._user = user;
        this._userPanel = userPanel;
        var nowConfig = 0;
        this._tileConfig = new Array();
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                if (i == 0 || j == 0 || j == 9 || i == 9 || ((i == 4 || i == 5) && j < 6) || ((i == 3 || i == 6) && j > 3 && j < 6)) {
                    this._tileConfig[nowConfig] = new TileData(false, "block_jpg", i, j);
                }
                else {
                    this._tileConfig[nowConfig] = new TileData(true, "road_jpg", i, j);
                }
                this._tiles[nowConfig] = new Tile(this._tileConfig[nowConfig]);
                this._tiles[nowConfig].touchEnabled = true;
                this.addChild(this._tiles[nowConfig]);
                nowConfig++;
            }
        }
        /*this._userSystem = new UserSystem();
        this._user = this._userSystem.user;
        this._user.defaultHero.player.idle();
        this.addChild(this._user.defaultHero.player);
        this.addChild(this._userSystem);*/
        this._user.defaultHero.player.idle();
        //this.addChild(this._user.defaultHero.player);
        //TouchEvent
        /*this.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
            this.moveTo(e.stageX, e.stageY);
        }, this);*/
    }
    var d = __define,c=TileMap,p=c.prototype;
    p.moveTo = function (x, y) {
        if (this._userPanel.isShowing == false) {
            this._moveX = new Array();
            this._moveY = new Array();
            this.findPathForNode(x, y);
        }
        //console.log("point:x:" + x + "y:" + y);
    };
    d(p, "NPCs"
        ,function () {
            var npcs = [];
            return npcs;
        }
    );
    p.findPathForNode = function (touchX, touchY) {
        //var playerX: number = Math.floor(this._player._body.x / Tile.TILE_SIZE);
        //var playerY: number = Math.floor(this._player._body.y / Tile.TILE_SIZE);
        var playerX = Math.floor(this._user.defaultHero.player.body.x / Tile.TILE_SIZE);
        var playerY = Math.floor(this._user.defaultHero.player.body.y / Tile.TILE_SIZE);
        var gridX = Math.floor(touchX / Tile.TILE_SIZE);
        var gridY = Math.floor(touchY / Tile.TILE_SIZE);
        var astar = new AStar();
        var grid = new Grid(this._column, this._row, this._tileConfig);
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
            this._user.defaultHero.player.move(this._moveX, this._moveY);
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