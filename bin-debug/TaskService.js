var EventEmitter = (function () {
    function EventEmitter() {
    }
    var d = __define,c=EventEmitter,p=c.prototype;
    p.addObserver = function (observer) { };
    p.notify = function (task) { };
    return EventEmitter;
}());
egret.registerClass(EventEmitter,'EventEmitter');
var SceneService = (function (_super) {
    __extends(SceneService, _super);
    function SceneService() {
        _super.call(this);
        this.observerList = [];
        this.taskList = {};
        SceneService.count++;
        if (SceneService.count > 1) {
            throw "singleton";
        }
    }
    var d = __define,c=SceneService,p=c.prototype;
    p.notify = function (task) {
        for (var _i = 0, _a = this.observerList; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.onChange(task);
        }
    };
    SceneService.count = 0;
    return SceneService;
}(EventEmitter));
egret.registerClass(SceneService,'SceneService');
var TaskService = (function (_super) {
    __extends(TaskService, _super);
    function TaskService() {
        _super.call(this);
        this.observerList = [];
        this.taskList = {};
        this._currentTask = 0;
        this._taskAllNumber = 0;
        TaskService.count++;
        if (TaskService.count > 1) {
            throw "singleton";
        }
    }
    var d = __define,c=TaskService,p=c.prototype;
    p.addObserver = function (a) {
        this.observerList.push(a);
    };
    p.notify = function (task) {
        for (var _i = 0, _a = this.observerList; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.onChange(task);
        }
    };
    TaskService.getInstance = function () {
        if (TaskService.instance == null) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    };
    /*public getTaskByCustomStrategy(strategy:Strategy){
        return strategy.selector(this.taskList);
    }*/
    p.getTaskByCustomRule = function (rule) {
        //var clone = Object.assign({}, this.taskList);
        //return rule(clone);
        /*var canvas:HTMLCanvasElement;
        var context = canvas.getContext("2d");*/
        return rule(this.taskList);
    };
    p.getCurrentId = function () {
        return "00" + this._currentTask.toString();
    };
    p.getNextId = function () {
        var temp = this._currentTask + 1;
        return "00" + temp.toString();
    };
    p.submit = function (id) {
        if (!id) {
            return ErrorCode.ERROR_TASK;
        }
        var task = this.taskList[id];
        if (!task) {
            return ErrorCode.SUCCESS;
        }
        console.log("submit" + id);
        if (task.status == TaskStatus.CAN_SUBMIT) {
            task.status = TaskStatus.SUBMITTED;
            task.onAccept();
            this.notify(task);
            this._currentTask++;
            return ErrorCode.SUCCESS;
        }
        else {
            return ErrorCode.ERROR_TASK;
        }
    };
    p.accept = function (id) {
        var temp = this.taskList[id];
        if (temp.status == TaskStatus.ACCEPTABLE) {
            temp.status = TaskStatus.DURING;
        }
        this.notify(temp);
        /*if (!id) {
            return ErrorCode.ERROR_TASK;
        }
        let task = this.taskList[id];
        if (!task) {
            return ErrorCode.SUCCESS;
        }
        console.log("accept" + id);
        if (task.status == TaskStatus.CAN_SUBMIT) {
            task.status = TaskStatus.SUBMITTED;
            this.notify(task);
            return ErrorCode.SUCCESS;
        } else {
            return ErrorCode.ERROR_TASK;
        }*/
    };
    p.addTask = function (task) {
        // var a = this.taskList["111"];
        this.taskList[task.id] = task;
        this._taskAllNumber++;
    };
    d(p, "taskAllNumber"
        ,function () {
            return this._taskAllNumber;
        }
    );
    p.getTask = function (num) {
        var temp = "00" + num.toString();
        return this.taskList[temp];
    };
    TaskService.count = 0;
    return TaskService;
}(EventEmitter));
egret.registerClass(TaskService,'TaskService');
var TaskSystem = (function (_super) {
    __extends(TaskSystem, _super);
    function TaskSystem() {
        _super.call(this);
        var NPC1x = 0;
        var NPC1y = 300;
        var NPC2x = 400;
        var NPC2y = 300;
        //var taskService:TaskService = new TaskService();       
        var task_2 = new Task("000", "task2", "press button to kill monsters", "npc_0", "npc_1", new KillMonsterTaskCondition());
        //task_2.status = TaskStatus.UNACCEPTABLE;
        task_2.total = 10;
        TaskService.getInstance().addTask(task_2);
        var task_1 = new Task("001", "task1", "press NPC1 to finish task", "npc_0", "npc_1", new NPCTalkTaskCondition());
        task_1.status = TaskStatus.ACCEPTABLE;
        TaskService.getInstance().addTask(task_1);
        var NPC_1 = new NPC("npc_0", "madoka", 8, NPC1x, NPC1y, "press the button \nto get task");
        var NPC_2 = new NPC("npc_1", "senpai", 7, NPC2x, NPC2y, "press the button \nif you finish task");
        var taskPanel = new TaskPanel(20, NPC2y + 500);
        var monsterButton = new MockKillMonsterBotton();
        TaskService.getInstance().addObserver(taskPanel);
        TaskService.getInstance().addObserver(NPC_1);
        TaskService.getInstance().addObserver(NPC_2);
        TaskService.getInstance().addObserver(monsterButton);
        this.addChild(taskPanel);
        this.addChild(NPC_1);
        this.addChild(NPC_2);
        this.addChild(monsterButton);
    }
    var d = __define,c=TaskSystem,p=c.prototype;
    return TaskSystem;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskSystem,'TaskSystem');
//# sourceMappingURL=TaskService.js.map