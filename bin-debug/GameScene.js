var GameScene = (function () {
    function GameScene() {
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
        egret.setTimeout(function () {
            console.log("结束移动");
            callback();
        }, this, 500);
    };
    p.stopMove = function (callback) {
        console.log("取消移动");
        callback();
    };
    return GameScene;
}());
egret.registerClass(GameScene,'GameScene');
//# sourceMappingURL=GameScene.js.map