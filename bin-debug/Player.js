// TypeScript file
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(name) {
        _super.call(this);
        this._name = name;
        this._body = new Body(name, "Idle", 8, 8, 8);
        this._modeText = new egret.TextField();
        this._stateMachine = new StateMachine();
        this._modeText.y = 30;
        this._modeText.text = "Now is playing";
        this.mode = this._body.mode;
        this.addChild(this._body);
        this.addChild(this._modeText);
    }
    var d = __define,c=Player,p=c.prototype;
    p.move = function (targetX, targetY) {
        this._stateMachine.setState(new PlayerMoveState(this, targetX, targetY));
    };
    p.idle = function () {
        this._stateMachine.setState(new PlayerIdleState(this));
    };
    p.attack = function () {
        this._stateMachine.setState(new PlayerAttackState(this));
    };
    d(p, "modeText"
        ,function () {
            return this._modeText;
        }
    );
    d(p, "body"
        ,function () {
            return this._body;
        }
    );
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
        this._player.modeText.text = "Move";
        this._player.body.reset();
        this._player.body.mode = "Run";
        var tw = egret.Tween.get(this._player.body);
        for (var i = 0; i < this._targetX.length; i++) {
            if (i == this._targetX.length - 1) {
                tw.to({ x: this._targetX[i], y: this._targetY[i] }, 100).call(this._player.idle, this._player);
                console.log("== - 1");
            }
            else {
                tw.to({ x: this._targetX[i], y: this._targetY[i] }, 100);
                console.log("else");
            }
        }
    };
    p.onExit = function () {
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
        this._player.body.reset();
        this._player.body.mode = "Idle";
        this._player.modeText.text = "Now is idling";
    };
    return PlayerIdleState;
}(PlayerState));
egret.registerClass(PlayerIdleState,'PlayerIdleState');
var PlayerAttackState = (function (_super) {
    __extends(PlayerAttackState, _super);
    function PlayerAttackState() {
        _super.apply(this, arguments);
    }
    var d = __define,c=PlayerAttackState,p=c.prototype;
    p.onEnter = function () {
        this._player.body.reset();
        this._player.body.mode = "Attack";
        this._player.modeText.text = "Attacking";
    };
    return PlayerAttackState;
}(PlayerState));
egret.registerClass(PlayerAttackState,'PlayerAttackState');
//# sourceMappingURL=Player.js.map