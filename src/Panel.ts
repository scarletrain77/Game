class Button extends egret.DisplayObjectContainer {
    private _body: egret.Shape;
    private _name: egret.TextField;

    constructor(x: number, y: number, name: string) {
        super();

        this.x = x;
        this.y = y;

        var widthRec = 300;
        var heightRec = 200;

        this._body = new egret.Shape();
        this._body.graphics.beginFill(0x66ccff, 1);
        this._body.graphics.drawRoundRect(widthRec / 4, heightRec * 3 / 4, widthRec / 2, heightRec / 4, 20, 20);
        this._body.graphics.endFill();


        this._name = new egret.TextField();
        this._name.text = name;
        this._name.textColor = 0x000000;
        this._name.x = widthRec / 4 + 35;
        this._name.y = heightRec * 3 / 4 + 10;

        this.addChild(this._body);
        this.addChild(this._name);

        this.touchEnabled = true;
    }
}

class TaskPanel extends egret.DisplayObjectContainer implements Observer {

    private _body: egret.Shape;
    private _taskText: egret.TextField;
    //private _taskListText: egret.TextField;
    private _taskTextList: egret.TextField[] = [];
    private _statusTextList: {
        [index: string]: egret.TextField
    } = {};
    private _statusText: egret.TextField;
    //private _statusListText: egret.TextField;

    private _taskListX: number;
    private _taskListY: number;
    private _blankHeight: number = 30;

    constructor(x: number, y: number) {
        super();

        var panelWidth = 640;
        var panelHeight = 436;

        this.x = x;
        this.y = y;
        this._body = new egret.Shape();
        this._body.graphics.beginFill(0x000000, 0.5);
        this._body.graphics.drawRect(0, 0, panelWidth, panelHeight);
        this._body.graphics.endFill();

        this.addChild(this._body);

        //两个表头
        this._taskText = new egret.TextField();
        this._taskText.text = "Task";
        this._taskText.textColor = 0xFFFFFF;
        this._taskText.x = 0;
        this._taskText.y = 0;

        this._statusText = new egret.TextField();
        this._statusText.text = "Status";
        this._statusText.textColor = 0xFFFFFF;
        this._statusText.x = panelWidth * 3 / 4;
        this._statusText.y = 0;

        this.addChild(this._taskText);
        this.addChild(this._statusText);

        /*this._taskListText = new egret.TextField();
        this._taskListText.text = "";
        this._taskListText.textColor = 0x000000;
        this._taskListText.x = this._taskText.x;
        this._taskListText.y = this._taskText.y + this._blankHeight;

        this._statusListText = new egret.TextField();
        this._statusListText.text = "";
        this._statusListText.textColor = 0x000000;
        this._statusListText.x = this._statusText.x;
        this._statusListText.y = this._statusText.y + this._blankHeight;
        
        this.addChild(this._taskListText);
        this.addChild(this._statusListText);
        */



        //任务状态列表
        var tempY: number = this._taskText.y;
        for (var i = 0; i < TaskService.getInstance().taskAllNumber; i++) {
            var taskTemp = new egret.TextField();
            var statusTemp = new egret.TextField();
            taskTemp.text = TaskService.getInstance().getTask(i).desc;
            taskTemp.textColor = 0xFFFFFF;
            taskTemp.x = this._taskText.x;
            tempY += this._blankHeight;
            taskTemp.y = tempY;
            this._taskTextList.push(taskTemp);
            this.addChild(this._taskTextList[i]);

            statusTemp.text = TaskService.getInstance().getTask(i).status;
            statusTemp.textColor = 0xFFFFFF;
            statusTemp.x = this._statusText.x;
            statusTemp.y = tempY;
            this._statusTextList["00" + i] = statusTemp;
            this.addChild(this._statusTextList["00" + i]);
        }

    }

    onChange(task: Task) {
        //this.setTaskList(1, task.desc);
        //this._taskListText.text = task.desc;
        this._statusTextList[task.id].text = task.status.toString();
        //this._statusListText.text = task.status.toString();
        console.log("Panel onChange" + task.name + task.status.toString());
    }
}

class DialogPanel extends egret.DisplayObjectContainer {
    private _button: egret.Shape;
    private _buttonText: egret.TextField;
    private _body: egret.Shape;
    private _taskText: egret.TextField;
    public isShowing: boolean = false;

    constructor(taskString: string) {
        super();

        var widthRec = 300;
        var heightRec = 200;

        this._body = new egret.Shape();
        this._body.graphics.beginFill(0x000000, 0.5);
        this._body.graphics.drawRect(0, 0, widthRec, heightRec);
        this._body.graphics.endFill();

        this._button = new egret.Shape();
        this._button.graphics.beginFill(0xFFF4C1, 1);
        this._button.graphics.drawRoundRect(widthRec / 4, heightRec * 3 / 4, widthRec / 2, heightRec / 4, 20, 20);
        this._button.graphics.endFill();

        this._buttonText = new egret.TextField();
        this._buttonText.text = "Press";
        this._buttonText.textColor = 0x000000;
        this._buttonText.x = widthRec / 4 + 35;
        this._buttonText.y = heightRec * 3 / 4 + 10;

        this._taskText = new egret.TextField();
        this._taskText.text = taskString;
        this._taskText.textColor = 0xFFFFFF;
        this._taskText.x = 0;
        this._taskText.y = 0;

        this.alpha = 0;

        this.addChild(this._body);
        this.addChild(this._button);
        this.addChild(this._buttonText);
        this.addChild(this._taskText);

        this._button.touchEnabled = true;
        this._button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    public panelFadeIn(): void {
        var tw: egret.Tween = egret.Tween.get(this);
        tw.to({ "alpha": 1 }, 500);
        this.isShowing = true;
    }

    public panelFadeOut(): void {
        var tw: egret.Tween = egret.Tween.get(this);
        tw.to({ "alpha": 0 }, 500);
        this.isShowing = false;
    }

    private onClick(): void {
        this.panelFadeOut();
        if (TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].status == TaskStatus.ACCEPTABLE) {
            TaskService.getInstance().accept(TaskService.getInstance().getCurrentId());
        } else if (TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()].status == TaskStatus.CAN_SUBMIT) {
            TaskService.getInstance().submit(TaskService.getInstance().getCurrentId());
            //TaskService.getInstance().notify(TaskService.getInstance().taskList[TaskService.getInstance().getNextId()]);
        } else {
            console.log("no taskStatus");
        }
        this.panelFadeOut();
        TaskService.getInstance().notify(TaskService.getInstance().taskList[TaskService.getInstance().getCurrentId()]);
    }
}
