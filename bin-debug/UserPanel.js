var UserPanel = (function (_super) {
    __extends(UserPanel, _super);
    function UserPanel(user) {
        _super.call(this);
        this._isShowing = false;
        this._user = user;
        this._heroBody = new egret.Bitmap();
        this._heroBody.texture = RES.getRes(this._user.defaultHero.name + "_png");
        this._heroBody.width = 500;
        this._heroBody.height = 500;
        PictureMiddle.putPictureMiddle(this._heroBody);
        this._heroBody.alpha = 0;
        this._jewelButton = new egret.Bitmap();
        this._jewelButton.texture = RES.getRes("jewel_png");
        this._jewelButton.x = this._heroBody.x + this._heroBody.width - 20;
        this._jewelButton.y = this._heroBody.y;
        this._jewelButton.width = 50;
        this._jewelButton.height = 50;
        this._jewelButton.alpha = 0;
        this._equipmentButton = new egret.Bitmap();
        this._equipmentButton.texture = RES.getRes("equipment_png");
        this._equipmentButton.x = this._jewelButton.x;
        this._equipmentButton.y = this._jewelButton.y + this._jewelButton.height + 5;
        this._equipmentButton.width = 50;
        this._equipmentButton.height = 50;
        this._equipmentButton.alpha = 0;
        this._heroText = new egret.TextField();
        this._heroText.text = this._user.defaultHero.heroInfo;
        this._heroText.textColor = 0xFFFFFF;
        this._heroText.x = this._heroBody.x;
        this._heroText.y = this._heroBody.y + this._heroBody.height;
        this._heroText.alpha = 0;
        this._userText = new egret.TextField();
        this._userText.text = this._user.userInfo;
        this._userText.textColor = 0xFFFFFF;
        this._userText.x = 60;
        this._userText.y = 60;
        this._userText.alpha = 0;
        this._background = new egret.Shape();
        this._background.graphics.beginFill(0x000000, 0.5);
        this._background.graphics.drawRect(50, 50, 540, 1036);
        this._background.graphics.endFill();
        this._background.alpha = 0;
        this._jewelInfo = user.defaultHero.getJewelsInfo();
        this._jewelPanel = new DetailPanel(this._jewelInfo, 50, this._jewelButton.y);
        this._equipmentsInfo = this._user.defaultHero.getEquipmentsInfo();
        this._equipmentsPanel = new DetailPanel(this._equipmentsInfo, 50, this._equipmentButton.y);
        //this.alpha = 0;
        this._showButton = new egret.Shape();
        this._showButton.graphics.beginFill(0xFFFFFF, 0.5);
        this._showButton.graphics.drawRect(0, 636, 640, 64);
        this._showButton.graphics.endFill();
        this._showButton.alpha = 1;
        this._showText = new egret.TextField();
        this._showText.text = "Show user panel";
        this._showText.x = 200;
        this._showText.y = 636 + 20;
        this._showText.textColor = 0x000000;
        this._jewelButton.touchEnabled = true;
        this._equipmentButton.touchEnabled = true;
        this._showButton.touchEnabled = true;
        this._jewelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickJewel, this);
        this._equipmentButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEquipment, this);
        this._showButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showUserPanel, this);
        this.addChild(this._showButton);
        this.addChild(this._showText);
        this.addChild(this._background);
        this.addChild(this._heroBody);
        this.addChild(this._jewelButton);
        this.addChild(this._equipmentButton);
        this.addChild(this._heroText);
        this.addChild(this._userText);
        this.addChild(this._jewelPanel);
        this.addChild(this._equipmentsPanel);
    }
    var d = __define,c=UserPanel,p=c.prototype;
    p.onClickJewel = function () {
        this._jewelPanel.showDetailPanel();
    };
    p.onClickEquipment = function () {
        this._equipmentsPanel.showDetailPanel();
        console.log("equipment");
    };
    p.updateUserinfo = function () {
        this._user.resetUser();
        this._user.defaultHero.resetHero();
        this._userText.text = this._user.userInfo;
        this._equipmentsPanel.updateDialogPanel(this._user.defaultHero.updateEquipmentInfo());
        this._jewelPanel.updateDialogPanel(this._user.defaultHero.updateJewelsInfo());
    };
    p.showUserPanel = function () {
        if (this._isShowing == false) {
            this._heroBody.alpha = 1;
            this._jewelButton.alpha = 1;
            this._equipmentButton.alpha = 1;
            this._heroText.alpha = 1;
            this._userText.alpha = 1;
            this._background.alpha = 1;
            this._isShowing = true;
        }
        else {
            this._heroBody.alpha = 0;
            this._jewelButton.alpha = 0;
            this._equipmentButton.alpha = 0;
            this._heroText.alpha = 0;
            this._userText.alpha = 0;
            this._background.alpha = 0;
            this._isShowing = false;
        }
    };
    d(p, "isShowing"
        ,function () {
            return this._isShowing;
        }
    );
    return UserPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(UserPanel,'UserPanel');
var DetailPanel = (function (_super) {
    __extends(DetailPanel, _super);
    function DetailPanel(text, x, y) {
        _super.call(this);
        this.x = x;
        this.y = y;
        this._background = new egret.Shape();
        this._background.graphics.beginFill(0x000000, 0.5);
        this._background.graphics.drawRect(0, 0, 490, 300);
        this._background.graphics.endFill();
        this._heroText = new egret.TextField();
        this._heroText.text = text;
        this._heroText.textColor = 0xFFFFFF;
        this._heroText.x = 0;
        this._heroText.y = 0;
        this.addChild(this._background);
        this.addChild(this._heroText);
        this.alpha = 0;
    }
    var d = __define,c=DetailPanel,p=c.prototype;
    p.showDetailPanel = function () {
        if (this.alpha == 1) {
            this.alpha = 0;
        }
        else {
            this.alpha = 1;
        }
        console.log("alpha" + this.alpha);
    };
    p.updateDialogPanel = function (temp) {
        this._heroText.text = temp;
    };
    return DetailPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(DetailPanel,'DetailPanel');
//# sourceMappingURL=UserPanel.js.map