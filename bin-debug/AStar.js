var AStar = (function () {
    function AStar() {
        this._closed = new Array();
        this._open = new Array();
        this._path = new Array();
        this._heuristic = this.manhattan;
        this._straightCost = 1.0;
        this._diagCost = Math.SQRT2;
    }
    var d = __define,c=AStar,p=c.prototype;
    p.findPath = function (grid) {
        this._grid = grid;
        this._open = new Array();
        this._closed = new Array();
        this._startNode = this._grid.getStartNode();
        this._endNode = this._grid.getEndNode();
        this._startNode.g = 0;
        this._startNode.h = this._heuristic(this._startNode);
        this._startNode.f = this._startNode.g + this._startNode.h;
        return this.search();
    };
    p.search = function () {
        var node = this._startNode;
        while (node != this._endNode) {
            var startX = Math.max(0, node.x - 1);
            var endX = Math.min(this._grid.getNumCols() - 1, node.x + 1);
            var startY = Math.max(0, node.y - 1);
            var endY = Math.min(this._grid.getNumRows() - 1, node.y + 1);
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    var test = this._grid.getNode(i, j);
                    if (test == node || !test.walkable)
                        //if (test == node || !test.walkable || !this._grid.getNode(node.x, test.y).walkable || !this._grid.getNode(test.x, node.y).walkable)
                        continue;
                    var cost = this._straightCost;
                    if (!((node.x == test.x) || node.y == test.y)) {
                        cost = this._diagCost;
                    }
                    var g = node.g + cost;
                    var h = this._heuristic(test);
                    var f = g + h;
                    if (this.isOpen(test) || this.isClosed(test)) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                        }
                    }
                    else {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = node;
                        this._open.push(test);
                    }
                }
            }
            this._closed.push(node);
            if (this._open.length == 0) {
                alert("no path found");
                //trace
                return false;
            }
            //书上为_open.sortOn("f", Array.NUMERIC)，即对f进行排序
            this._open.sort(function (a, b) {
                return a.f - b.f;
            });
            node = this._open.shift();
        }
        this.buildPath(); //
        return true;
    };
    p.buildPath = function () {
        this._path = new Array();
        var node = this._endNode;
        this._path.push(node);
        while (node != this._startNode) {
            node = node.parent;
            this._path.unshift(node);
        }
    };
    d(p, "path"
        ,function () {
            return this._path;
        }
    );
    p.isOpen = function (node) {
        for (var i = 0; i < this._open.length; i++) {
            if (this._open[i] == node) {
                return true;
            }
        }
        return false;
    };
    p.isClosed = function (node) {
        for (var i = 0; i < this._closed.length; i++) {
            if (this._closed[i] == node) {
                return true;
            }
        }
        return false;
    };
    p.manhattan = function (node) {
        return Math.abs(node.x - this._endNode.x) * this._straightCost +
            Math.abs(node.y + this._endNode.y) * this._straightCost;
    };
    p.euclidian = function (node) {
        var dx = node.x - this._endNode.x;
        var dy = node.y - this._endNode.y;
        return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
    };
    p.diagonal = function (node) {
        var dx = Math.abs(node.x - this._endNode.x);
        var dy = Math.abs(node.y - this._endNode.y);
        var diag = Math.min(dx, dy);
        var straight = dx + dy;
        return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
    };
    p.getVisited = function () {
        return this._closed.concat(this._open);
    };
    return AStar;
}());
egret.registerClass(AStar,'AStar');
//# sourceMappingURL=AStar.js.map