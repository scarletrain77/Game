var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster(x, y) {
        _super.call(this);
        this._hp = 100;
        this.x = x;
        this.y = y;
        this._type = "normal";
        this._body = new NPCBody("QB", 11);
        Monster._id++;
        this._body.touchEnabled = true;
        this.addChild(this._body);
    }
    var d = __define,c=Monster,p=c.prototype;
    p.onAccept = function () { };
    p.onChange = function () { };
    p.onClick = function () {
        if (TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].total > 0) {
            console.log("click, total>0");
            if (TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].status == TaskStatus.DURING && TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].total >= 0 && GameScene.getCurrentScene().userSystem.user.defaultHero.getFightPower() > this._hp) {
                TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].total--;
                this.alpha = 0;
                console.log("total" + TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].total);
            }
            if (TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].total == 0) {
                TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].status = TaskStatus.CAN_SUBMIT;
            }
            TaskService.getInstance().notify(TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()]);
        }
    };
    Monster._id = 0;
    return Monster;
}(egret.DisplayObjectContainer));
egret.registerClass(Monster,'Monster',["Observer"]);
var Monsters = (function (_super) {
    __extends(Monsters, _super);
    function Monsters(monsters, taskNumberString) {
        _super.call(this);
        this._monsters = new Array();
        this._monsters = monsters;
        this._number = 0;
        this._taskNumberString = taskNumberString;
        this.addButton = new Button(50, 100, "add");
        this.subButton = new Button(50, 200, "sub");
        this.addButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickAdd, this);
        this.subButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSub, this);
        this.addChild(this.addButton);
        this.addChild(this.subButton);
    }
    var d = __define,c=Monsters,p=c.prototype;
    p.addMonster = function (monster) {
        this._monsters.push(monster);
        this._number++;
    };
    d(p, "number"
        ,function () {
            return this._number;
        }
    );
    p.onClickAdd = function () {
        this._number++;
        console.log(this.number);
        if (TaskService.getInstance().taskList[this._taskNumberString].status == TaskStatus.DURING) {
        }
    };
    p.onClickSub = function () {
        if (this._number > 0) {
            this._number--;
        }
        console.log(this.number);
    };
    return Monsters;
}(egret.DisplayObjectContainer));
egret.registerClass(Monsters,'Monsters');
//# sourceMappingURL=Monster.js.map