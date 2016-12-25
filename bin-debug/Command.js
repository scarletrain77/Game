var WalkCommand = (function () {
    function WalkCommand(x, y) {
        this.x = x;
        this.y = y;
    }
    var d = __define,c=WalkCommand,p=c.prototype;
    p.execute = function (callback) {
        GameScene.getCurrentScene().moveTo(this.x, this.y, function () {
            callback();
        });
    };
    p.cancel = function (callback) {
        GameScene.getCurrentScene().stopMove(function () {
            callback();
        });
    };
    return WalkCommand;
}());
egret.registerClass(WalkCommand,'WalkCommand',["Command"]);
var FightCommand = (function () {
    function FightCommand() {
        /**
         * 所有的 Command 都需要有这个标记，应该如何封装处理这个问题呢？
         */
        this._hasBeenCancelled = false;
    }
    var d = __define,c=FightCommand,p=c.prototype;
    p.execute = function (callback) {
        var _this = this;
        console.log("开始战斗");
        egret.setTimeout(function () {
            if (!_this._hasBeenCancelled) {
                console.log("结束战斗");
                callback();
            }
        }, this, 500);
    };
    p.cancel = function (callback) {
        console.log("脱离战斗");
        this._hasBeenCancelled = true;
        egret.setTimeout(function () {
            callback();
        }, this, 100);
    };
    return FightCommand;
}());
egret.registerClass(FightCommand,'FightCommand',["Command"]);
var TalkCommand = (function () {
    function TalkCommand() {
    }
    var d = __define,c=TalkCommand,p=c.prototype;
    p.execute = function (callback) {
        console.log("打开对话框");
        egret.setTimeout(function () {
            console.log("结束对话");
            callback();
        }, this, 500);
    };
    p.cancel = function (callback) {
        console.log("关闭对话框");
    };
    return TalkCommand;
}());
egret.registerClass(TalkCommand,'TalkCommand',["Command"]);
var CommandList = (function () {
    function CommandList() {
        this._list = [];
        this._frozen = false;
    }
    var d = __define,c=CommandList,p=c.prototype;
    p.addCommand = function (command) {
        this._list.push(command);
    };
    p.cancel = function () {
        var _this = this;
        this._frozen = true;
        var command = this.currentCommand;
        egret.setTimeout(function () {
            if (_this._frozen) {
                _this._frozen = false;
            }
        }, this, 2000);
        if (command) {
            command.cancel(function () {
                _this._frozen = false;
            });
            this._list = [];
        }
    };
    p.execute = function () {
        var _this = this;
        if (this._frozen) {
            egret.setTimeout(this.execute, this, 100);
            return;
        }
        var command = this._list.shift();
        this.currentCommand = command;
        if (command) {
            console.log("执行下一命令", command);
            command.execute(function () {
                _this.execute();
            });
        }
        else {
            console.log("全部命令执行完毕");
        }
    };
    return CommandList;
}());
egret.registerClass(CommandList,'CommandList');
//# sourceMappingURL=Command.js.map