// TypeScript file
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this);
        //var data = RES.getRes("dog_json");
        //var txtr = RES.getRes("dog_png");
        //var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        //this._body = new egret.MovieClip(mcFactory.generateMovieClipData("dog"));
        this._body = new Body("Idle");
        this._modeText = new egret.TextField();
        this._stateMachine = new StateMachine();
        this._modeText.y = 30;
        this._modeText.text = "Now is playing";
        this.addChild(this._body);
        this.addChild(this._modeText);
        //this._body.gotoAndPlay("idle", -1);
    }
    var d = __define,c=Player,p=c.prototype;
    p.move = function (targetX, targetY) {
        this._stateMachine.setState(new PlayerMoveState(this, targetX, targetY));
    };
    p.idle = function () {
        this._stateMachine.setState(new PlayerIdleState(this));
    };
    return Player;
}(egret.DisplayObjectContainer));
egret.registerClass(Player,'Player');
/**
 * 状态机。currentState现在的状态，setState设置状态。先结束前一个状态，再把现在的状态赋值进来
 */
var StateMachine = (function () {
    function StateMachine() {
    }
    var d = __define,c=StateMachine,p=c.prototype;
    p.setState = function (s) {
        if (this._currentState) {
            this._currentState.onExit();
        }
        this._currentState = s;
        this._currentState.onEnter();
    };
    return StateMachine;
}());
egret.registerClass(StateMachine,'StateMachine');
/**
 * 实现状态。_player为目前的人物，
 */
var PlayerState = (function () {
    function PlayerState(player) {
        this._player = player;
    }
    var d = __define,c=PlayerState,p=c.prototype;
    p.onEnter = function () { };
    p.onExit = function () { };
    return PlayerState;
}());
egret.registerClass(PlayerState,'PlayerState',["State"]);
var PlayerMoveState = (function (_super) {
    __extends(PlayerMoveState, _super);
    function PlayerMoveState(player, targetX, targetY) {
        _super.call(this, player);
        this._targetX = targetX;
        this._targetY = targetY;
    }
    var d = __define,c=PlayerMoveState,p=c.prototype;
    p.onEnter = function () {
        this._player._modeText.text = "Now is moving";
        //var body = new Body("Move");
        //this._player._body.gotoAndPlay("run", -1);
        this._player._body.reset();
        this._player._body.mode = "Run";
        var tw = egret.Tween.get(this._player._body);
        for (var i = 0; i < this._targetX.length; i++) {
            if (i == this._targetX.length - 1) {
                tw.to({ x: this._targetX[i], y: this._targetY[i] }, 200).call(this._player.idle, this._player);
            }
            else {
                tw.to({ x: this._targetX[i], y: this._targetY[i] }, 200);
            }
        }
        console.log("playerX:" + this._player._body.x + "playerY:" + this._player._body.y);
    };
    return PlayerMoveState;
}(PlayerState));
egret.registerClass(PlayerMoveState,'PlayerMoveState');
var PlayerIdleState = (function (_super) {
    __extends(PlayerIdleState, _super);
    function PlayerIdleState() {
        _super.apply(this, arguments);
    }
    var d = __define,c=PlayerIdleState,p=c.prototype;
    p.onEnter = function () {
        //this._player._body.gotoAndPlay("idle");
        // var body = new Body("Idle");
        this._player._body.reset();
        this._player._body.mode = "Idle";
        this._player._modeText.text = "Now is idling";
    };
    return PlayerIdleState;
}(PlayerState));
egret.registerClass(PlayerIdleState,'PlayerIdleState');
//# sourceMappingURL=Player.js.map