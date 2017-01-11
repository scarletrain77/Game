var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        var sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        //TileMapSuccess
        //this.addChild(new TileMap());
        //TaskSystem without UserPanel
        //this.addChild(new TaskSystem());
        //this.addChild(new UserSystem());
        var scene = new GameScene();
        GameScene.replaceScene(scene);
        this.addChild(scene);
        var list = new CommandList();
        GameScene.getCurrentScene().userSystem.tileMap.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (GameScene.getCurrentScene().userSystem.NPC_0.getDialogPanelState() == false) {
                list.addCommand(new WalkCommand(e.stageX, e.stageY));
                list.execute();
            }
        }, this);
        GameScene.getCurrentScene().userSystem.NPC_0.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            UserSystem.currentNPC = GameScene.getCurrentScene().userSystem.NPC_0;
            list.addCommand(new WalkCommand(e.stageX, e.stageY));
            list.addCommand(new TalkCommand());
            list.execute();
        }, this);
        GameScene.getCurrentScene().userSystem.NPC_1.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            UserSystem.currentNPC = GameScene.getCurrentScene().userSystem.NPC_1;
            list.addCommand(new WalkCommand(e.stageX, e.stageY));
            list.addCommand(new TalkCommand());
            list.execute();
        }, this);
        GameScene.getCurrentScene().userSystem.monster.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            list.addCommand(new WalkCommand(e.stageX, e.stageY));
            list.addCommand(new FightCommand());
            list.execute();
        }, this);
        GameScene.getCurrentScene().userSystem.equipmentButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            list.addCommand(new WalkCommand(e.stageX, e.stageY));
            list.addCommand(new EquipmentCommand());
            list.execute();
        }, this);
        /*var button = new Button(100, 100, "add");
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
            console.log("add");
            GameScene.getCurrentScene().userSystem.user.defaultHero.addEquipment(new Equipment("C", 100, 100, 100));
            GameScene.getCurrentScene().userSystem.userPanel.updateUserinfo();
        }, this);
        this.addChild(button);

        list.addCommand(new WalkCommand(1, 1));
        list.addCommand(new FightCommand());
        list.addCommand(new WalkCommand(3, 3));
        list.addCommand(new TalkCommand());
        list.addCommand(new WalkCommand(5, 5));*/
        /*egret.setTimeout(function () {
            list.cancel();
            list.addCommand(new WalkCommand(5, 5))
            list.execute();

        }, this, 600)*/
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map