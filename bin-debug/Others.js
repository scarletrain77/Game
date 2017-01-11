var NumberToString = (function () {
    function NumberToString() {
    }
    var d = __define,c=NumberToString,p=c.prototype;
    NumberToString.numberToString = function (num) {
        if (num >= 0 && num < 10) {
            return '00' + num.toString();
        }
        else if (num >= 10 && num < 100) {
            return '0' + num.toString();
        }
        else if (num >= 100) {
            return num.toString();
        }
    };
    return NumberToString;
}());
egret.registerClass(NumberToString,'NumberToString');
var PictureMiddle = (function () {
    function PictureMiddle() {
    }
    var d = __define,c=PictureMiddle,p=c.prototype;
    PictureMiddle.putPictureMiddle = function (pic) {
        pic.x = 320 - pic.width / 2;
        pic.y = 568 - pic.height / 2;
    };
    return PictureMiddle;
}());
egret.registerClass(PictureMiddle,'PictureMiddle');
var BitmapBody = (function (_super) {
    __extends(BitmapBody, _super);
    function BitmapBody(name, width, height, targetX, targetY, targetAlpha) {
        _super.call(this);
        this._body = new egret.Bitmap();
        this._body.texture = RES.getRes(name);
        if (width != 0 && height != 0) {
            this._body.width = width;
            this._body.height = height;
        }
        this.x = targetX;
        this.y = targetY;
        this.alpha = targetAlpha;
    }
    var d = __define,c=BitmapBody,p=c.prototype;
    return BitmapBody;
}(egret.DisplayObjectContainer));
egret.registerClass(BitmapBody,'BitmapBody');
//# sourceMappingURL=Others.js.map