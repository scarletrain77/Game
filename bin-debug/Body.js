var PlayerBody = (function (_super) {
    __extends(PlayerBody, _super);
    function PlayerBody(name, animFrameAll) {
        _super.call(this);
        this.timeOnEnterFrame = 0;
        this.animFrameEnd = 7;
        this.frameNumber = 0;
        this.isPlayFirst = true;
        this.playerArray = new Array();
        this.animFrameEnd = animFrameAll - 1;
        for (var i = 0; i < animFrameAll; i++) {
            var temp = i + 1;
            var num = name + "0" + temp.toString() + "_png";
            var tempBit = new egret.Bitmap(RES.getRes(num));
            this.playerArray.push(tempBit);
        }
        PlayerBody.BODY_H = this.playerArray[0].height;
        PlayerBody.BODY_W = this.playerArray[0].width;
        this.once(egret.Event.ADDED_TO_STAGE, this.onLoad, this);
    }
    var d = __define,c=PlayerBody,p=c.prototype;
    p.onLoad = function (event) {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.timeOnEnterFrame = egret.getTimer();
    };
    p.onEnterFrame = function (e) {
        if (this.frameNumber >= 1) {
            this.removeChild(this.playerArray[this.frameNumber - 1]);
        }
        else if (this.frameNumber == 0 && this.isPlayFirst == false) {
            this.removeChild(this.playerArray[this.animFrameEnd]);
        }
        this.addChild(this.playerArray[this.frameNumber]);
        this.frameNumber++;
        if (this.frameNumber == this.animFrameEnd + 1) {
            this.frameNumber = 0;
        }
        this.isPlayFirst = false;
        this.timeOnEnterFrame = egret.getTimer();
        //console.log(this.frameNumber);
    };
    return PlayerBody;
}(egret.DisplayObjectContainer));
egret.registerClass(PlayerBody,'PlayerBody');
var Body = (function (_super) {
    __extends(Body, _super);
    function Body(mode) {
        _super.call(this);
        this.timeOnEnterFrame = 0;
        //目前所在的帧数，idle一共8帧，即帧数为0-7
        this.frameNumber = 0;
        //是不是第一次播放
        this.isPlayFirst = true;
        //判断状态切换前的是Run状态还是Idle状态
        this.isRunChild = false;
        this.isIdleChild = false;
        //两个动画的播放起始和结束帧
        this.idleAnimFrameEnd = 7;
        this.runAnimFrameEnd = 7;
        this.mode = "Run";
        var player01 = new egret.Bitmap(RES.getRes("idle01_png"));
        var player02 = new egret.Bitmap(RES.getRes("idle02_png"));
        var player03 = new egret.Bitmap(RES.getRes("idle03_png"));
        var player04 = new egret.Bitmap(RES.getRes("idle04_png"));
        var player05 = new egret.Bitmap(RES.getRes("idle05_png"));
        var player06 = new egret.Bitmap(RES.getRes("idle06_png"));
        var player07 = new egret.Bitmap(RES.getRes("idle07_png"));
        var player08 = new egret.Bitmap(RES.getRes("idle08_png"));
        var player09 = new egret.Bitmap(RES.getRes("run01_png"));
        var player10 = new egret.Bitmap(RES.getRes("run02_png"));
        var player11 = new egret.Bitmap(RES.getRes("run03_png"));
        var player12 = new egret.Bitmap(RES.getRes("run04_png"));
        var player13 = new egret.Bitmap(RES.getRes("run05_png"));
        var player14 = new egret.Bitmap(RES.getRes("run06_png"));
        var player15 = new egret.Bitmap(RES.getRes("run07_png"));
        var player16 = new egret.Bitmap(RES.getRes("run08_png"));
        this.idleArray = [player01, player02, player03, player04, player05, player06, player07, player08];
        this.runArray = [player09, player10, player11, player12, player13, player14, player15, player16];
        this.mode = mode;
        Body.RUN_BODY_W = this.idleArray[0].width;
        Body.RUN_BODY_H = this.idleArray[0].height;
        Body.RUN_BODY_W = this.runArray[0].width;
        Body.RUN_BODY_H = this.runArray[0].height;
        this.once(egret.Event.ADDED_TO_STAGE, this.onLoad, this);
    }
    var d = __define,c=Body,p=c.prototype;
    p.reset = function () {
        this.isPlayFirst = true;
        if (this.frameNumber == 0) {
            this.frameNumber = 8;
        }
        if (this.isIdleChild == true) {
            this.removeChild(this.idleArray[this.frameNumber - 1]);
        }
        else if (this.isRunChild == true) {
            this.removeChild(this.runArray[this.frameNumber - 1]);
        }
        this.isIdleChild = false;
        this.isRunChild = false;
        this.frameNumber = 0;
    };
    p.onLoad = function (event) {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.timeOnEnterFrame = egret.getTimer();
    };
    p.onEnterFrame = function (e) {
        //帧数大于0的时候，才能移除前一帧
        //当帧数为0的时候，移除的是最后一帧
        //第一次播放的时候，第0帧前面没有要移除的第7帧
        if (this.mode == "Idle") {
            if (this.frameNumber >= 1) {
                this.removeChild(this.idleArray[this.frameNumber - 1]);
            }
            else if (this.frameNumber == 0 && this.isPlayFirst == false) {
                this.removeChild(this.idleArray[this.idleAnimFrameEnd]);
            }
            this.addChild(this.idleArray[this.frameNumber]);
            this.isIdleChild = true;
            this.frameNumber++;
            if (this.frameNumber == this.idleAnimFrameEnd + 1) {
                this.frameNumber = 0;
            }
            this.isPlayFirst = false;
            this.timeOnEnterFrame = egret.getTimer();
        }
        else if (this.mode == "Run") {
            //console.log("Run:"+this.frameNumber);
            if (this.frameNumber >= 1) {
                this.removeChild(this.runArray[this.frameNumber - 1]);
            }
            else if (this.frameNumber == 0 && this.isPlayFirst == false) {
                this.removeChild(this.runArray[this.runAnimFrameEnd]);
            }
            this.addChild(this.runArray[this.frameNumber]);
            this.isRunChild = true;
            this.frameNumber++;
            if (this.frameNumber == this.runAnimFrameEnd + 1) {
                this.frameNumber = 0;
            }
            this.isPlayFirst = false;
            this.timeOnEnterFrame = egret.getTimer();
        }
    };
    return Body;
}(egret.DisplayObjectContainer));
egret.registerClass(Body,'Body');
//# sourceMappingURL=Body.js.map