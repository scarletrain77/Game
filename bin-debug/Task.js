var Task = (function () {
    function Task(id, name, desc, fromNpcId, toNpcId, condition) {
        this._current = 0;
        this.total = -1;
        this._id = id;
        this._name = name;
        this._status = TaskStatus.ACCEPTABLE;
        this._desc = desc;
        this._fromNpcId = fromNpcId;
        this._toNpcId = toNpcId;
        this.condition = condition;
    }
    var d = __define,c=Task,p=c.prototype;
    p.checkStatus = function () {
        /* if(this.current > this.total){
             console.warn();
         }*/
        if (this._status == TaskStatus.DURING
            && this._current >= this.total) {
            this._status = TaskStatus.CAN_SUBMIT;
        }
        //notify
        TaskService.getInstance().notify(this);
    };
    p.onAccept = function () {
        this.condition.onAccept(this);
    };
    p.getCurrent = function () {
        return this._current;
    };
    p.setCurrent = function (value) {
        this._current = value;
        this.checkStatus();
    };
    d(p, "current"
        ,function () {
            return this._current;
        }
        ,function (value) {
            this._current = value;
            this.checkStatus();
        }
    );
    d(p, "id"
        ,function () {
            return this._id;
        }
    );
    d(p, "name"
        ,function () {
            return this._name;
        }
    );
    d(p, "fromNpcId"
        ,function () {
            return this._fromNpcId;
        }
    );
    d(p, "toNpcId"
        ,function () {
            return this._toNpcId;
        }
    );
    d(p, "status"
        ,function () {
            return this._status;
        }
        ,function (value) {
            this._status = value;
        }
    );
    d(p, "desc"
        ,function () {
            return this._desc;
        }
        ,function (d) {
            this._desc = d;
        }
    );
    return Task;
}());
egret.registerClass(Task,'Task',["TaskConditionContext"]);
/*
interface Object{
    assign(a:any, b:any);
}

interface Strategy{
    selector:Function;
}*/
var NPCTalkTaskCondition = (function () {
    function NPCTalkTaskCondition() {
        this.type = "Talk";
    }
    var d = __define,c=NPCTalkTaskCondition,p=c.prototype;
    p.onAccept = function (task) {
        var current = 0;
        current++;
        task.setCurrent(current);
        //console.log("here");
        //   context.checkStatus();
    };
    /*onAccept(task:Task){
        task.current++;
        task.current = task.total;
    }*/
    p.onSubmit = function (task) {
    };
    return NPCTalkTaskCondition;
}());
egret.registerClass(NPCTalkTaskCondition,'NPCTalkTaskCondition',["TaskCondition"]);
var KillMonsterTaskCondition = (function () {
    function KillMonsterTaskCondition(monster) {
        this.type = "Kill";
        this.monsters = [];
        this.monsters.push(monster);
    }
    var d = __define,c=KillMonsterTaskCondition,p=c.prototype;
    p.onAccept = function (task) {
        task.setCurrent(task.getCurrent());
    };
    p.onSubmit = function (task) {
    };
    return KillMonsterTaskCondition;
}());
egret.registerClass(KillMonsterTaskCondition,'KillMonsterTaskCondition',["TaskCondition"]);
var EquipmentGetTaskCondition = (function () {
    function EquipmentGetTaskCondition() {
        this.type = "Get";
    }
    var d = __define,c=EquipmentGetTaskCondition,p=c.prototype;
    p.onAccept = function (task) {
        task.setCurrent(task.getCurrent());
    };
    p.onSubmit = function (task) {
    };
    return EquipmentGetTaskCondition;
}());
egret.registerClass(EquipmentGetTaskCondition,'EquipmentGetTaskCondition',["TaskCondition"]);
var EquipmentsGetTaskButton = (function (_super) {
    __extends(EquipmentsGetTaskButton, _super);
    function EquipmentsGetTaskButton(x, y) {
        _super.call(this);
        this._jewelBitmap = new egret.Bitmap();
        this._jewelBitmap.texture = RES.getRes("jewel_png");
        this._jewelBitmap.x = x;
        this._jewelBitmap.y = y;
        this.addChild(this._jewelBitmap);
        this.alpha = 1;
        this._jewelBitmap.touchEnabled = true;
        //this._jewelBitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
    var d = __define,c=EquipmentsGetTaskButton,p=c.prototype;
    p.onChange = function () {
    };
    p.onClick = function () {
        console.log(TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].status);
        if (TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].status == TaskStatus.DURING && GameScene.getCurrentScene().userSystem.user.defaultHero.getFightPower() <= 125 && TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].condition.type == "Get") {
            GameScene.getCurrentScene().userSystem.user.defaultHero.addEquipment(new Equipment("C", 100, 100, 100));
            GameScene.getCurrentScene().userSystem.userPanel.updateUserinfo();
            TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].status = TaskStatus.CAN_SUBMIT;
            this.alpha = 0;
        }
        console.log(TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].status);
        TaskService.getInstance().notify(TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()]);
    };
    return EquipmentsGetTaskButton;
}(egret.DisplayObjectContainer));
egret.registerClass(EquipmentsGetTaskButton,'EquipmentsGetTaskButton',["Observer"]);
var KillMonsterButton = (function (_super) {
    __extends(KillMonsterButton, _super);
    function KillMonsterButton() {
        _super.call(this);
        this.subButton = new Button(50, 100, "Sub");
        this.subButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.subButton.touchEnabled = true;
        this.addChild(this.subButton);
    }
    var d = __define,c=KillMonsterButton,p=c.prototype;
    p.onClick = function () {
        //>=1
        if (TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].total > 0) {
            if (TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].status == TaskStatus.DURING && TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].total >= 0) {
                TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].total--;
            }
            if (TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].total == 0) {
                TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].status = TaskStatus.CAN_SUBMIT;
            }
            TaskService.getInstance().notify(TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()]);
        }
    };
    p.onChange = function () {
    };
    return KillMonsterButton;
}(egret.DisplayObjectContainer));
egret.registerClass(KillMonsterButton,'KillMonsterButton',["Observer"]);
//# sourceMappingURL=Task.js.map