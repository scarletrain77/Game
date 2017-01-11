var UserSystem = (function (_super) {
    __extends(UserSystem, _super);
    function UserSystem() {
        _super.call(this);
        this._user = new User("New User");
        this._userPanel = new UserPanel(this._user);
        this._tileMap = new TileMap(this._user, this._userPanel);
        this.addChild(this._tileMap);
        this.addChild(this._user.defaultHero.player);
        this.monster = new Monster(450, 200);
        this.task_1 = new Task("000", "task1", "press NPC1 to finish task", "npc_0", "npc_1", new NPCTalkTaskCondition());
        this.task_1.status = TaskStatus.ACCEPTABLE;
        TaskService.getInstance().addTask(this.task_1);
        this.task_2 = new Task("001", "task2", "add equipments", "npc_0", "npc_1", new EquipmentGetTaskCondition());
        this.task_2.status = TaskStatus.UNACCEPTABLE;
        TaskService.getInstance().addTask(this.task_2);
        this.task_3 = new Task("002", "task3", "press button to kill monsters", "npc_0", "npc_1", new KillMonsterTaskCondition(this.monster));
        this.task_3.total = 1;
        this.task_3.status = TaskStatus.UNACCEPTABLE;
        TaskService.getInstance().addTask(this.task_3);
        this.NPC_0 = new NPC("npc_0", "madoka", 8, 180, 150, "press the button \nto get task");
        this.NPC_1 = new NPC("npc_1", "senpai", 7, 180, 380, "press the button \nif you finish task");
        this.taskPanel = new TaskPanel(0, 700);
        //var monsterButton: KillMonsterButton = new KillMonsterButton();
        this.equipmentButton = new EquipmentsGetTaskButton(400, 400);
        TaskService.getInstance().addObserver(this.taskPanel);
        TaskService.getInstance().addObserver(this.NPC_0);
        TaskService.getInstance().addObserver(this.NPC_1);
        //TaskService.getInstance().addObserver(monsterButton);
        TaskService.getInstance().addObserver(this.equipmentButton);
        TaskService.getInstance().addObserver(this.monster);
        this.addChild(this.taskPanel);
        this.addChild(this.NPC_0);
        this.addChild(this.NPC_1);
        //this.addChild(monsterButton);
        this.addChild(this.monster);
        this.addChild(this.equipmentButton);
        var jewel01 = new Jewel("strength", 1);
        var jewel02 = new Jewel("strength", 3);
        //jewel.getFightPower();
        var equipment01 = new Equipment("A", 1, 1, 1);
        equipment01.addJewel(jewel01);
        equipment01.addJewel(jewel02);
        //equipment.getFightPower();
        var equipment02 = new Equipment("B", 2, 1, 1);
        //var hero: Hero = new Hero("a", 1, 1, 1);
        //hero.addEquipment(equipment01);
        //hero.addEquipment(equipment02);
        //hero.getFightPower();
        this._user = new User("New User");
        this._user.defaultHero.addEquipment(equipment01);
        this._user.defaultHero.addEquipment(equipment02);
        //this._user.addHero(hero);
        this._userPanel = new UserPanel(this._user);
        this.addChild(this._userPanel);
        this._user.defaultHero.player.body.touchEnabled = true;
        this._user.defaultHero.player.body.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
    var d = __define,c=UserSystem,p=c.prototype;
    p.getShowingNPC = function () {
        if (this.NPC_0.getDialogPanelState() == true) {
            return this.NPC_0;
        }
        else if (this.NPC_1.getDialogPanelState() == true) {
            return this.NPC_1;
        }
    };
    p.onClick = function () {
        this._userPanel.showUserPanel();
        console.log("click");
    };
    d(p, "user"
        ,function () {
            return this._user;
        }
        ,function (user) {
            this._user = user;
        }
    );
    d(p, "userPanel"
        ,function () {
            return this._userPanel;
        }
    );
    d(p, "tileMap"
        ,function () {
            return this._tileMap;
        }
    );
    return UserSystem;
}(egret.DisplayObjectContainer));
egret.registerClass(UserSystem,'UserSystem');
/*class TaskSystem extends egret.DisplayObjectContainer {

    constructor() {
        super();

        var NPC1x = 400;
        var NPC1y = 100;
        var NPC2x = 120;
        var NPC2y = 200;

        //var taskService:TaskService = new TaskService();

        var task_1: Task = new Task("000", "task1", "press NPC1 to finish task", "npc_0", "npc_1", new NPCTalkTaskCondition());
        task_1.status = TaskStatus.ACCEPTABLE;
        TaskService.getInstance().addTask(task_1);

        var task_2: Task = new Task("001", "task2", "press button to kill monsters", "npc_0", "npc_1", new KillMonsterTaskCondition());
        task_2.status = TaskStatus.UNACCEPTABLE;
        task_2.total = 1;
        TaskService.getInstance().addTask(task_2);


        var NPC_1: NPC = new NPC("npc_0", "madoka", 8, NPC1x, NPC1y, "press the button \nto get task");
        var NPC_2: NPC = new NPC("npc_1", "senpai", 7, NPC2x, NPC2y, "press the button \nif you finish task");
        var NPC_3: NPC = new NPC("npc_2", "sayaka", 5, 300, 300, "hi");

        var taskPanel: TaskPanel = new TaskPanel(20, NPC2y + 500);

        var monsterButton: KillMonsterButton = new KillMonsterButton();


        TaskService.getInstance().addObserver(taskPanel);
        TaskService.getInstance().addObserver(NPC_1);
        TaskService.getInstance().addObserver(NPC_2);
        TaskService.getInstance().addObserver(monsterButton);

        this.addChild(taskPanel);
        this.addChild(NPC_1);
        this.addChild(NPC_2);
        this.addChild(NPC_3);
        this.addChild(monsterButton);
    }

}*/
//# sourceMappingURL=TestConnection.js.map