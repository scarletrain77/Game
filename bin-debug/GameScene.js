var GameScene = (function (_super) {
    __extends(GameScene, _super);
    //private _taskSystem: TaskSystem;
    function GameScene() {
        _super.call(this);
        //this._tileMap = new TileMap();
        this._userSystem = new UserSystem();
        //this._taskSystem = new TaskSystem();
        this.addChild(this._userSystem);
        //this.addChild(this._taskSystem);
        //this.addChild(this._userSystem);
    }
    var d = __define,c=GameScene,p=c.prototype;
    GameScene.replaceScene = function (scene) {
        GameScene._scene = scene;
    };
    GameScene.getCurrentScene = function () {
        return GameScene._scene;
    };
    p.moveTo = function (x, y, callback) {
        console.log("开始移动");
        this._userSystem.tileMap.moveTo(x, y);
        egret.setTimeout(function () {
            console.log("结束移动");
            callback();
        }, this, 1000);
    };
    p.stopMove = function (callback) {
        console.log("取消移动");
        callback();
    };
    p.beginTalk = function (callback) {
        console.log("开始谈话");
        UserSystem.currentNPC.onClick();
        egret.setTimeout(function () {
            console.log("结束谈话");
            callback();
        }, this, 1000);
    };
    p.fight = function (callback) {
        console.log("开始攻击");
        this._userSystem.monster.onClick();
        egret.setTimeout(function () {
            console.log("结束攻击");
            callback();
        }, this, 1000);
    };
    p.getEquipment = function (callback) {
        console.log("开始拾取");
        this._userSystem.equipmentButton.onClick();
        egret.setTimeout(function () {
            console.log("结束拾取");
            callback();
        }, this, 1000);
    };
    d(p, "userSystem"
        ,function () {
            return this._userSystem;
        }
    );
    return GameScene;
}(egret.DisplayObjectContainer));
egret.registerClass(GameScene,'GameScene');
//# sourceMappingURL=GameScene.js.map