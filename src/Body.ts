class NPCBody extends egret.DisplayObjectContainer {
    public static BODY_H: number;
    public static BODY_W: number;
    private playerArray: egret.Bitmap[];
    private timeOnEnterFrame: number = 0;
    private animFrameEnd = 7;
    private frameNumber = 0;
    private isPlayFirst = true;
    constructor(name: string, animFrameAll: number) {
        super();
        this.playerArray = new Array<egret.Bitmap>();
        this.animFrameEnd = animFrameAll - 1;

        var temp = 1;
        for (var i: number = 0; i < animFrameAll; i++) {
            var num: string = "";
            if (temp == 10) {
                temp = 0;
                num = name + "1" + temp.toString() + "_png";
            } else if (temp > 10) {
                num = name + "1" + temp.toString() + "_png";
            } else {
                num = name + "0" + temp.toString() + "_png";
            }
            var tempBit = new egret.Bitmap(RES.getRes(num));
            this.playerArray.push(tempBit);
            temp++;
        }
        NPCBody.BODY_H = this.playerArray[0].height;
        NPCBody.BODY_W = this.playerArray[0].width;
        this.once(egret.Event.ADDED_TO_STAGE, this.onLoad, this);
    }

    private onLoad(event: egret.Event) {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.timeOnEnterFrame = egret.getTimer();
    }

    private onEnterFrame(e: egret.Event) {
        if (this.frameNumber >= 1) {
            this.removeChild(this.playerArray[this.frameNumber - 1]);
        } else if (this.frameNumber == 0 && this.isPlayFirst == false) {
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
    }
}

class Body extends egret.DisplayObjectContainer {
    public static RUN_BODY_H: number;
    public static RUN_BODY_W: number;
    public static IDLE_BODY_H: number;
    public static IDLE_BODY_W: number;
    private idleArray: egret.Bitmap[];
    private runArray: egret.Bitmap[]
    private timeOnEnterFrame: number = 0;
    //目前所在的帧数，idle一共8帧，即帧数为0-7
    private frameNumber = 0;
    //是不是第一次播放
    private isPlayFirst = true;
    //判断状态切换前的是Run状态还是Idle状态
    private isRunChild = false;
    private isIdleChild = false;
    //两个动画的播放起始和结束帧
    private idleAnimFrameEnd = 7;
    private runAnimFrameEnd = 7;
    public mode = "Run";

    public constructor(name: string, mode: string, idleFrame: number, runFrame: number) {
        super();

        this.idleAnimFrameEnd = idleFrame - 1;
        this.runAnimFrameEnd = runFrame - 1;

        var player01: egret.Bitmap = new egret.Bitmap(RES.getRes(name + "idle01_png"));
        var player02: egret.Bitmap = new egret.Bitmap(RES.getRes(name + "idle02_png"));
        var player03: egret.Bitmap = new egret.Bitmap(RES.getRes(name + "idle03_png"));
        var player04: egret.Bitmap = new egret.Bitmap(RES.getRes(name + "idle04_png"));
        var player05: egret.Bitmap = new egret.Bitmap(RES.getRes(name + "idle05_png"));
        var player06: egret.Bitmap = new egret.Bitmap(RES.getRes(name + "idle06_png"));
        var player07: egret.Bitmap = new egret.Bitmap(RES.getRes(name + "idle07_png"));
        var player08: egret.Bitmap = new egret.Bitmap(RES.getRes(name + "idle08_png"));
        var player09: egret.Bitmap = new egret.Bitmap(RES.getRes(name + "run01_png"));
        var player10: egret.Bitmap = new egret.Bitmap(RES.getRes(name + "run02_png"));
        var player11: egret.Bitmap = new egret.Bitmap(RES.getRes(name + "run03_png"));
        var player12: egret.Bitmap = new egret.Bitmap(RES.getRes(name + "run04_png"));
        var player13: egret.Bitmap = new egret.Bitmap(RES.getRes(name + "run05_png"));
        var player14: egret.Bitmap = new egret.Bitmap(RES.getRes(name + "run06_png"));
        var player15: egret.Bitmap = new egret.Bitmap(RES.getRes(name + "run07_png"));
        var player16: egret.Bitmap = new egret.Bitmap(RES.getRes(name + "run08_png"));
        this.idleArray = [player01, player02, player03, player04, player05, player06, player07, player08];
        this.runArray = [player09, player10, player11, player12, player13, player14, player15, player16];
        this.mode = mode;
        Body.RUN_BODY_W = this.idleArray[0].width;
        Body.RUN_BODY_H = this.idleArray[0].height;
        Body.RUN_BODY_W = this.runArray[0].width;
        Body.RUN_BODY_H = this.runArray[0].height;
        this.once(egret.Event.ADDED_TO_STAGE, this.onLoad, this);
    }

    public reset(): void {
        this.isPlayFirst = true;
        if (this.frameNumber == 0) {
            this.frameNumber = 8;
        }
        if (this.isIdleChild == true) {
            this.removeChild(this.idleArray[this.frameNumber - 1]);
            //console.log("remove idle"+ this.frameNumber);
        } else if (this.isRunChild == true) {
            this.removeChild(this.runArray[this.frameNumber - 1]);
            //console.log("remove run" + this.frameNumber);
        }
        this.isIdleChild = false;
        this.isRunChild = false;
        this.frameNumber = 0;
    }

    private onLoad(event: egret.Event) {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.timeOnEnterFrame = egret.getTimer();
    }
    private onEnterFrame(e: egret.Event) {
        //帧数大于0的时候，才能移除前一帧
        //当帧数为0的时候，移除的是最后一帧
        //第一次播放的时候，第0帧前面没有要移除的第7帧
        if (this.mode == "Idle") {
            if (this.frameNumber >= 1) {
                this.removeChild(this.idleArray[this.frameNumber - 1]);
            } else if (this.frameNumber == 0 && this.isPlayFirst == false) {
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
            //console.log(this.frameNumber);
        } else if (this.mode == "Run") {
            //console.log("Run:"+this.frameNumber);
            if (this.frameNumber >= 1) {
                this.removeChild(this.runArray[this.frameNumber - 1]);
            } else if (this.frameNumber == 0 && this.isPlayFirst == false) {
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
    }
}
