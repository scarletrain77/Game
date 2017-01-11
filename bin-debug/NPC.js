var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(id, bitmap, frameAll, x, y, dialog) {
        _super.call(this);
        this._id = id;
        this.x = x;
        this.y = y;
        this._body = new NPCBody(bitmap, frameAll);
        this._dialog = new DialogPanel(dialog);
        this._dialog.x = -this._body.width / 8;
        this._dialog.y = -this._body.height * 3 / 4;
        // console.log("id:" + this._id + "x:" + this._dialog.x + "y:" + this._dialog.y);
        this._isEmojiQM = false;
        this._emoji = new egret.Bitmap();
        this.setEmojiTexture();
        this._emoji.width = 50;
        this._emoji.height = 50;
        this._emoji.x = this._body.x;
        this._emoji.y = this._body.y - this._emoji.height;
        this.changeEmojiState(TaskService.getInstance().taskList["000"]);
        this.addChild(this._body);
        this.addChild(this._emoji);
        this.addChild(this._dialog);
        this._body.touchEnabled = true;
        /*this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e)=>{
            this.onClick();
        }, this);*/
        this.init();
    }
    var d = __define,c=NPC,p=c.prototype;
    p.onChange = function (task) {
        console.log('NPC on Change' + task.name);
        this.changeEmojiState(task);
    };
    d(p, "body"
        ,function () {
            return this._body;
        }
    );
    p.getDialogPanelState = function () {
        return this._dialog.isShowing;
    };
    p.changeEmojiState = function (task) {
        if (this._id == task.fromNpcId) {
            if (task.status == TaskStatus.UNACCEPTABLE) {
                this.emojiFadeOut();
            }
            else if (task.status == TaskStatus.ACCEPTABLE) {
                this._isEmojiQM = false;
                this.setEmojiTexture();
                this.emojiFadeIn();
            }
            else if (task.status == TaskStatus.DURING) {
                this.emojiFadeOut();
            }
            else if (task.status == TaskStatus.CAN_SUBMIT) {
                this.emojiFadeOut();
            }
            else if (task.status == TaskStatus.SUBMITTED) {
                this.emojiFadeOut();
            }
        }
        else {
            if (task.status == TaskStatus.CAN_SUBMIT) {
                this._isEmojiQM = false;
                this.setEmojiTexture();
                this.emojiFadeIn();
            }
            else if (task.status == TaskStatus.SUBMITTED) {
                this.emojiFadeOut();
            }
            else if (task.status == TaskStatus.DURING) {
                this._isEmojiQM = true;
                this.setEmojiTexture();
                this.emojiFadeIn();
            }
            else if (task.status == TaskStatus.ACCEPTABLE) {
                this.emojiFadeOut();
            }
        }
    };
    /**
     * 找到第一个状态为可提交的，如果没有就找已经接受了的
     */
    p.init = function () {
        var rule = function (taskList) {
            for (var id in taskList) {
                var task = taskList[id];
                if (task.status == TaskStatus.CAN_SUBMIT) {
                    return task;
                }
            }
            for (var id in taskList) {
                var task = taskList[id];
                if (task.status == TaskStatus.ACCEPTABLE) {
                    return task;
                }
            }
        };
        TaskService.getInstance().getTaskByCustomRule(rule);
        //this.taskService.getTaskByCustomRole(rule);
    };
    p.emojiFadeIn = function () {
        var tw = egret.Tween.get(this._emoji);
        if (this._emoji.alpha == 0) {
            tw.to({ "alpha": 1 }, 100);
        }
    };
    p.emojiFadeOut = function () {
        var tw = egret.Tween.get(this._emoji);
        if (this._emoji.alpha == 1) {
            tw.to({ "alpha": 0 }, 100);
        }
    };
    p.setEmojiTexture = function () {
        if (this._isEmojiQM == true) {
            this._emoji.texture = RES.getRes("questionMark_png");
        }
        else {
            this._emoji.texture = RES.getRes("exclamationPoint_png");
        }
    };
    p.onClick = function () {
        //this._dialog.panelFadeIn();
        if (TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].status == TaskStatus.ACCEPTABLE && this._id == TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].fromNpcId) {
            this._dialog.panelFadeIn();
        }
        else if (TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].status == TaskStatus.CAN_SUBMIT && this._id == TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].toNpcId) {
            this._dialog.panelFadeIn();
        }
        //special task 
        if (TaskService.getInstance().taskList["000"].status == TaskStatus.DURING && this._id == TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].fromNpcId) {
            TaskService.getInstance().taskList["000"].status = TaskStatus.CAN_SUBMIT;
        }
        TaskService.getInstance().notify(TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()]);
    };
    return NPC;
}(egret.DisplayObjectContainer));
egret.registerClass(NPC,'NPC',["Observer"]);
//# sourceMappingURL=NPC.js.map