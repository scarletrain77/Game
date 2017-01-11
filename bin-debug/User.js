var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Cache = function (target, propertyName, desc) {
    //const getter = desc.get;
    var method = desc.value;
    /*desc.get = function () {
        return getter.apply(this);
    }
    return desc;*/
    desc.value = function () {
        //没有修改过数据时，输出原本的
        if (this["_cacheFightPower"] != null && this["_dirty"] == false) {
            console.log("haven't revise");
            return target["_cacheFightPower"];
        }
        else {
            this["_cacheFightPower"] = method.apply(this);
            console.log("revised");
            return method.apply(this);
        }
    };
    return desc;
};
var User = (function () {
    //heroesInTeam:Hero[] = [];
    function User(name) {
        this._gold = 0;
        this._exp = 0;
        this._totalExp = 100;
        this._level = 1;
        this._heroes = [];
        this._cacheFighterPower = 0;
        this._cacheDefensePower = 0;
        this._dirty = false;
        this._name = name;
        //一定有默认的英雄
        this.addHero(new Hero("homura", 100, 100, 100));
        this._defaultHero = this._heroes[0];
    }
    var d = __define,c=User,p=c.prototype;
    p.addHero = function (hero) {
        hero.setIsInteam(true);
        this._heroes.push(hero);
        this._dirty = true;
    };
    d(p, "userInfo"
        ,function () {
            var temp = "Name:" + this._name + "\n" +
                "Gold:" + this._gold + "\n" +
                "Exp/TotalExp:" + this._exp + "/" + this._totalExp + "\n" +
                "Level:" + this._level + "\n" +
                "FightPower:" + this.getFightPower() + "\n" +
                "DefensePower:" + this.getDefensePower() + "\n";
            return temp;
        }
    );
    p.resetUser = function () {
        this._cacheDefensePower = 0;
        this._cacheFighterPower = 0;
    };
    d(p, "hearoesInTeam"
        ,function () {
            return this._heroes.filter(function (hero) { return hero.isInTeam; });
        }
    );
    d(p, "defaultHero"
        ,function () {
            return this._defaultHero;
        }
    );
    //@Logger
    p.print = function () {
        console.log("hello");
    };
    p.getFightPower = function () {
        /* var arr:Hero[] = [];
         function test(hero:Hero){
             return true;
         }
         arr.every(hero=>hero.isInteam);*/
        if (!this._cacheFighterPower) {
            var result = 0;
            this.hearoesInTeam.forEach(function (hero) { return result += hero.getFightPower(); });
            //result += this.pet.getFightPower();
            this._cacheFighterPower = result;
        }
        console.log("User:" + this._cacheFighterPower);
        return this._cacheFighterPower;
    };
    p.getDefensePower = function () {
        if (!this._cacheDefensePower) {
            var result = 0;
            this.hearoesInTeam.forEach(function (hero) { return result += hero.getDefensePower(); });
            //result += this.pet.getFightPower();
            this._cacheDefensePower = result;
        }
        console.log("User:" + this._cacheDefensePower);
        return this._cacheDefensePower;
    };
    __decorate([
        Cache
    ], p, "getFightPower", null);
    __decorate([
        Cache
    ], p, "getDefensePower", null);
    return User;
}());
egret.registerClass(User,'User');
var Hero = (function () {
    function Hero(name, strength, quick, wisdom) {
        this._isInTeam = true;
        this._equipments = [];
        this._strength = strength;
        this._quick = quick;
        this._wisdom = wisdom;
        this._level = 0;
        this._hp = 50;
        this._name = name;
        this._player = new Player(name);
    }
    var d = __define,c=Hero,p=c.prototype;
    d(p, "heroInfo"
        ,function () {
            var temp = "HeroName:" + this._name + "\n" +
                "HP:" + this._hp + "\n" +
                "Level:" + this._level + "\n" +
                "FightPower:" + this.getFightPower() + "\n" +
                "DefensePower:" + this.getDefensePower();
            return temp;
        }
    );
    p.resetHero = function () {
        this._cacheDefensePower = 0;
        this._cacheFightPower = 0;
    };
    d(p, "player"
        ,function () {
            return this._player;
        }
    );
    d(p, "name"
        ,function () {
            return this._name;
        }
    );
    d(p, "isInTeam"
        ,function () {
            return this._isInTeam;
        }
    );
    p.setIsInteam = function (is) {
        this._isInTeam = is;
    };
    // @Cache
    p.getFightPower = function () {
        if (!this._cacheFightPower) {
            var result = 0;
            this._equipments.forEach(function (e) { return result += e.getFightPower(); });
            this._strength += this._level * 0.5;
            result += this._strength;
            this._cacheFightPower = result;
        }
        return this._cacheFightPower;
    };
    p.getDefensePower = function () {
        if (!this._cacheDefensePower) {
            var result = 0;
            this._equipments.forEach(function (e) { return result += e.getDefensePower(); });
            this._wisdom += this._level * 0.2;
            result += this._wisdom;
            this._cacheDefensePower = result;
        }
        return this._cacheDefensePower;
    };
    p.addEquipment = function (equipment) {
        this._equipments.push(equipment);
    };
    p.getEquipmentsInfo = function () {
        var text = "Equipments\n";
        this._equipments.forEach(function (e) { return text = text + e.equipmentInfo; });
        return text;
    };
    p.updateEquipmentInfo = function () {
        var text = "Equipments\n";
        this._equipments.forEach(function (e) {
            e.restEquipment();
            text = text + e.equipmentInfo;
        });
        return text;
    };
    p.resetEquipments = function () {
        this._cacheDefensePower = 0;
        this._cacheFightPower = 0;
    };
    p.getJewelsInfo = function () {
        var text = "Jewels\n";
        this._equipments.forEach(function (e) { return text += e.getJewelsInfo(); });
        return text;
    };
    p.updateJewelsInfo = function () {
        var text = "Jewels\n";
        this._equipments.forEach(function (e) {
            text += e.getJewelsInfo();
        });
        return text;
    };
    return Hero;
}());
egret.registerClass(Hero,'Hero');
var Equipment = (function () {
    function Equipment(name, strength, quick, wisdom) {
        this._jewels = [];
        this._name = name;
        this._strength = strength;
        this._quick = quick;
        this._wisdom = wisdom;
        this._level = 0;
    }
    var d = __define,c=Equipment,p=c.prototype;
    p.addJewel = function (jewel) {
        this._jewels.push(jewel);
    };
    //@Cache
    p.getFightPower = function () {
        if (!this._cacheFightPower) {
            var result = 0;
            this._jewels.forEach(function (jewel) { return result += jewel.getFightPower(); });
            this._strength += this._level * 0.5;
            result += this._strength;
            this._cacheFightPower = result;
        }
        return this._cacheFightPower;
    };
    p.getDefensePower = function () {
        if (!this._cacheDefensePower) {
            var result = 0;
            this._jewels.forEach(function (jewel) { return result += jewel.getDefensePower(); });
            this._wisdom += this._level * 0.2;
            result += this._wisdom;
            this._cacheDefensePower = result;
        }
        //console.log("Equipment:" + result);
        return this._cacheDefensePower;
    };
    p.restEquipment = function () {
        this._cacheDefensePower = 0;
        this._cacheFightPower = 0;
    };
    d(p, "equipmentInfo"
        ,function () {
            var temp = "EquipmentName:" + this._name + "\n" +
                "Level:" + this._level + "\n" +
                "FightPower:" + this.getFightPower() + "\n" +
                "DefensePower:" + this.getDefensePower() + "\n";
            return temp;
        }
    );
    p.getJewelsInfo = function () {
        var text = "";
        this._jewels.forEach(function (e) { return text += e.jewelInfo; });
        return text;
    };
    return Equipment;
}());
egret.registerClass(Equipment,'Equipment');
var Jewel = (function () {
    function Jewel(type, level) {
        this._type = type;
        this._level = level;
        if (this._type == "strength") {
            this._strength = 10;
            this._quick = 0;
            this._wisdom = 0;
        }
        else if (this._type == "quick") {
            this._strength = 0;
            this._quick = 10;
            this._wisdom = 0;
        }
        else if (this._type == "wisdom") {
            this._strength = 0;
            this._quick = 0;
            this._wisdom = 10;
        }
    }
    var d = __define,c=Jewel,p=c.prototype;
    p.getFightPower = function () {
        this._strength += this._level * 0.5;
        //console.log("jewel:" + this._strength);
        return this._strength;
    };
    p.getDefensePower = function () {
        this._wisdom += this._level * 0.2;
        return this._wisdom;
    };
    d(p, "jewelInfo"
        ,function () {
            var temp = "Type:" + this._type + "\n" +
                "Level:" + this._level + "\n" +
                "FightPower:" + this.getFightPower() + "\n" +
                "DefensePower:" + this.getDefensePower() + "\n";
            return temp;
        }
    );
    return Jewel;
}());
egret.registerClass(Jewel,'Jewel');
//# sourceMappingURL=User.js.map