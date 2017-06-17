(function() {
	'use strict';
	var $asm = {};
	global.GameLogic = global.GameLogic || {};
	global.GameLogic.Common = global.GameLogic.Common || {};
	ss.initAssembly($asm, 'GameLogic.Common');
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Common.CustomLogicAction_ClientAction
	var $GameLogic_Common_CustomLogicAction_ClientAction = function() {
	};
	$GameLogic_Common_CustomLogicAction_ClientAction.__typeName = 'GameLogic.Common.CustomLogicAction_ClientAction';
	$GameLogic_Common_CustomLogicAction_ClientAction.createInstance = function() {
		return $GameLogic_Common_CustomLogicAction_ClientAction.$ctor();
	};
	$GameLogic_Common_CustomLogicAction_ClientAction.$ctor = function() {
		var $this = Pather.Common.Models.Common.Actions.ClientActions.LogicAction_ClientAction.$ctor();
		$this.logicActionType = 0;
		return $this;
	};
	$GameLogic_Common_CustomLogicAction_ClientAction.isInstanceOfType = function() {
		return true;
	};
	global.GameLogic.Common.CustomLogicAction_ClientAction = $GameLogic_Common_CustomLogicAction_ClientAction;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Common.CustomLogicAction_GameSegmentAction
	var $GameLogic_Common_CustomLogicAction_GameSegmentAction = function() {
	};
	$GameLogic_Common_CustomLogicAction_GameSegmentAction.__typeName = 'GameLogic.Common.CustomLogicAction_GameSegmentAction';
	$GameLogic_Common_CustomLogicAction_GameSegmentAction.createInstance = function() {
		return $GameLogic_Common_CustomLogicAction_GameSegmentAction.$ctor();
	};
	$GameLogic_Common_CustomLogicAction_GameSegmentAction.$ctor = function() {
		var $this = Pather.Common.Models.Common.Actions.GameSegmentAction.LogicAction_GameSegmentAction.$ctor();
		$this.logicActionType = 0;
		//todo blech
		$this.gameSegmentActionType = 'logicAction';
		return $this;
	};
	$GameLogic_Common_CustomLogicAction_GameSegmentAction.isInstanceOfType = function() {
		return true;
	};
	global.GameLogic.Common.CustomLogicAction_GameSegmentAction = $GameLogic_Common_CustomLogicAction_GameSegmentAction;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Common.CustomLogicAction_GameWorldAction
	var $GameLogic_Common_CustomLogicAction_GameWorldAction = function() {
	};
	$GameLogic_Common_CustomLogicAction_GameWorldAction.__typeName = 'GameLogic.Common.CustomLogicAction_GameWorldAction';
	$GameLogic_Common_CustomLogicAction_GameWorldAction.createInstance = function() {
		return $GameLogic_Common_CustomLogicAction_GameWorldAction.$ctor();
	};
	$GameLogic_Common_CustomLogicAction_GameWorldAction.$ctor = function() {
		var $this = Pather.Common.Models.Common.Actions.GameWorldAction.LogicAction_GameWorldAction.$ctor();
		$this.logicActionType = 0;
		return $this;
	};
	$GameLogic_Common_CustomLogicAction_GameWorldAction.isInstanceOfType = function() {
		return true;
	};
	global.GameLogic.Common.CustomLogicAction_GameWorldAction = $GameLogic_Common_CustomLogicAction_GameWorldAction;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Common.CustomLogicAction_NeighborGameSegmentAction
	var $GameLogic_Common_CustomLogicAction_NeighborGameSegmentAction = function() {
	};
	$GameLogic_Common_CustomLogicAction_NeighborGameSegmentAction.__typeName = 'GameLogic.Common.CustomLogicAction_NeighborGameSegmentAction';
	$GameLogic_Common_CustomLogicAction_NeighborGameSegmentAction.createInstance = function() {
		return $GameLogic_Common_CustomLogicAction_NeighborGameSegmentAction.$ctor();
	};
	$GameLogic_Common_CustomLogicAction_NeighborGameSegmentAction.$ctor = function() {
		var $this = Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.LogicAction_NeighborGameSegmentAction.$ctor();
		$this.logicActionType = 0;
		return $this;
	};
	$GameLogic_Common_CustomLogicAction_NeighborGameSegmentAction.isInstanceOfType = function() {
		return true;
	};
	global.GameLogic.Common.CustomLogicAction_NeighborGameSegmentAction = $GameLogic_Common_CustomLogicAction_NeighborGameSegmentAction;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Common.CustomLogicAction_TellGameSegmentAction
	var $GameLogic_Common_CustomLogicAction_TellGameSegmentAction = function() {
	};
	$GameLogic_Common_CustomLogicAction_TellGameSegmentAction.__typeName = 'GameLogic.Common.CustomLogicAction_TellGameSegmentAction';
	$GameLogic_Common_CustomLogicAction_TellGameSegmentAction.createInstance = function() {
		return $GameLogic_Common_CustomLogicAction_TellGameSegmentAction.$ctor();
	};
	$GameLogic_Common_CustomLogicAction_TellGameSegmentAction.$ctor = function() {
		var $this = Pather.Common.Models.Common.Actions.TellGameSegmentAction.LogicAction_TellGameSegmentAction.$ctor();
		$this.logicActionType = 0;
		return $this;
	};
	$GameLogic_Common_CustomLogicAction_TellGameSegmentAction.isInstanceOfType = function() {
		return true;
	};
	global.GameLogic.Common.CustomLogicAction_TellGameSegmentAction = $GameLogic_Common_CustomLogicAction_TellGameSegmentAction;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Common.CutTree_CustomLogicAction_ClientAction
	var $GameLogic_Common_CutTree_CustomLogicAction_ClientAction = function() {
	};
	$GameLogic_Common_CutTree_CustomLogicAction_ClientAction.__typeName = 'GameLogic.Common.CutTree_CustomLogicAction_ClientAction';
	$GameLogic_Common_CutTree_CustomLogicAction_ClientAction.createInstance = function() {
		return $GameLogic_Common_CutTree_CustomLogicAction_ClientAction.$ctor();
	};
	$GameLogic_Common_CutTree_CustomLogicAction_ClientAction.$ctor = function() {
		var $this = $GameLogic_Common_CustomLogicAction_ClientAction.$ctor();
		$this.treeX = 0;
		$this.treeY = 0;
		$this.logicActionType = 0;
		return $this;
	};
	$GameLogic_Common_CutTree_CustomLogicAction_ClientAction.isInstanceOfType = function() {
		return true;
	};
	global.GameLogic.Common.CutTree_CustomLogicAction_ClientAction = $GameLogic_Common_CutTree_CustomLogicAction_ClientAction;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Common.CutTree_CustomLogicAction_GameSegmentAction
	var $GameLogic_Common_CutTree_CustomLogicAction_GameSegmentAction = function() {
	};
	$GameLogic_Common_CutTree_CustomLogicAction_GameSegmentAction.__typeName = 'GameLogic.Common.CutTree_CustomLogicAction_GameSegmentAction';
	$GameLogic_Common_CutTree_CustomLogicAction_GameSegmentAction.createInstance = function() {
		return $GameLogic_Common_CutTree_CustomLogicAction_GameSegmentAction.$ctor();
	};
	$GameLogic_Common_CutTree_CustomLogicAction_GameSegmentAction.$ctor = function() {
		var $this = $GameLogic_Common_CustomLogicAction_GameSegmentAction.$ctor();
		$this.treeX = 0;
		$this.treeY = 0;
		$this.logicActionType = 0;
		return $this;
	};
	$GameLogic_Common_CutTree_CustomLogicAction_GameSegmentAction.isInstanceOfType = function() {
		return true;
	};
	global.GameLogic.Common.CutTree_CustomLogicAction_GameSegmentAction = $GameLogic_Common_CutTree_CustomLogicAction_GameSegmentAction;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Common.CutTree_CustomLogicAction_GameWorldAction
	var $GameLogic_Common_CutTree_CustomLogicAction_GameWorldAction = function() {
	};
	$GameLogic_Common_CutTree_CustomLogicAction_GameWorldAction.__typeName = 'GameLogic.Common.CutTree_CustomLogicAction_GameWorldAction';
	$GameLogic_Common_CutTree_CustomLogicAction_GameWorldAction.createInstance = function() {
		return $GameLogic_Common_CutTree_CustomLogicAction_GameWorldAction.$ctor();
	};
	$GameLogic_Common_CutTree_CustomLogicAction_GameWorldAction.$ctor = function() {
		var $this = $GameLogic_Common_CustomLogicAction_GameWorldAction.$ctor();
		$this.treeX = 0;
		$this.treeY = 0;
		$this.logicActionType = 0;
		return $this;
	};
	$GameLogic_Common_CutTree_CustomLogicAction_GameWorldAction.isInstanceOfType = function() {
		return true;
	};
	global.GameLogic.Common.CutTree_CustomLogicAction_GameWorldAction = $GameLogic_Common_CutTree_CustomLogicAction_GameWorldAction;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Common.CutTree_CustomLogicAction_NeighborGameSegmentAction
	var $GameLogic_Common_CutTree_CustomLogicAction_NeighborGameSegmentAction = function() {
	};
	$GameLogic_Common_CutTree_CustomLogicAction_NeighborGameSegmentAction.__typeName = 'GameLogic.Common.CutTree_CustomLogicAction_NeighborGameSegmentAction';
	$GameLogic_Common_CutTree_CustomLogicAction_NeighborGameSegmentAction.createInstance = function() {
		return $GameLogic_Common_CutTree_CustomLogicAction_NeighborGameSegmentAction.$ctor();
	};
	$GameLogic_Common_CutTree_CustomLogicAction_NeighborGameSegmentAction.$ctor = function() {
		var $this = $GameLogic_Common_CustomLogicAction_NeighborGameSegmentAction.$ctor();
		$this.treeX = 0;
		$this.treeY = 0;
		$this.logicActionType = 0;
		return $this;
	};
	$GameLogic_Common_CutTree_CustomLogicAction_NeighborGameSegmentAction.isInstanceOfType = function() {
		return true;
	};
	global.GameLogic.Common.CutTree_CustomLogicAction_NeighborGameSegmentAction = $GameLogic_Common_CutTree_CustomLogicAction_NeighborGameSegmentAction;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Common.CutTree_CustomLogicAction_TellGameSegmentAction
	var $GameLogic_Common_CutTree_CustomLogicAction_TellGameSegmentAction = function() {
	};
	$GameLogic_Common_CutTree_CustomLogicAction_TellGameSegmentAction.__typeName = 'GameLogic.Common.CutTree_CustomLogicAction_TellGameSegmentAction';
	$GameLogic_Common_CutTree_CustomLogicAction_TellGameSegmentAction.createInstance = function() {
		return $GameLogic_Common_CutTree_CustomLogicAction_TellGameSegmentAction.$ctor();
	};
	$GameLogic_Common_CutTree_CustomLogicAction_TellGameSegmentAction.$ctor = function() {
		var $this = $GameLogic_Common_CustomLogicAction_TellGameSegmentAction.$ctor();
		$this.treeX = 0;
		$this.treeY = 0;
		$this.logicActionType = 0;
		return $this;
	};
	$GameLogic_Common_CutTree_CustomLogicAction_TellGameSegmentAction.isInstanceOfType = function() {
		return true;
	};
	global.GameLogic.Common.CutTree_CustomLogicAction_TellGameSegmentAction = $GameLogic_Common_CutTree_CustomLogicAction_TellGameSegmentAction;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Common.LogicActionType
	var $GameLogic_Common_LogicActionType = function() {
	};
	$GameLogic_Common_LogicActionType.__typeName = 'GameLogic.Common.LogicActionType';
	global.GameLogic.Common.LogicActionType = $GameLogic_Common_LogicActionType;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Common.LogicGameBoard
	var $GameLogic_Common_LogicGameBoard = function() {
		this.logicGrid = null;
		Pather.Common.GameFramework.GameBoard.call(this);
	};
	$GameLogic_Common_LogicGameBoard.__typeName = 'GameLogic.Common.LogicGameBoard';
	$GameLogic_Common_LogicGameBoard.buildGridItem = function(item) {
		if (item.value === -2147483648) {
			return item.type.toString();
		}
		else {
			return item.type.toString() + '|' + item.value;
		}
	};
	$GameLogic_Common_LogicGameBoard.fromGridItem = function(s) {
		if (s.indexOf('|') !== -1) {
			var strings = s.split('|');
			return $GameLogic_Common_LogicGridItem.$ctor(ss.cast(ss.Enum.parse($GameLogic_Common_LogicGridItemType, strings[0]), String), parseInt(strings[1]));
		}
		else {
			return $GameLogic_Common_LogicGridItem.$ctor(ss.cast(ss.Enum.parse($GameLogic_Common_LogicGridItemType, s), String), -2147483648);
		}
	};
	global.GameLogic.Common.LogicGameBoard = $GameLogic_Common_LogicGameBoard;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Common.LogicGridItem
	var $GameLogic_Common_LogicGridItem = function() {
	};
	$GameLogic_Common_LogicGridItem.__typeName = 'GameLogic.Common.LogicGridItem';
	$GameLogic_Common_LogicGridItem.$ctor = function(type, value) {
		var $this = {};
		$this.type = null;
		$this.value = 0;
		$this.type = type;
		$this.value = value;
		return $this;
	};
	$GameLogic_Common_LogicGridItem.isInstanceOfType = function() {
		return true;
	};
	global.GameLogic.Common.LogicGridItem = $GameLogic_Common_LogicGridItem;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Common.LogicGridItemType
	var $GameLogic_Common_LogicGridItemType = function() {
	};
	$GameLogic_Common_LogicGridItemType.__typeName = 'GameLogic.Common.LogicGridItemType';
	global.GameLogic.Common.LogicGridItemType = $GameLogic_Common_LogicGridItemType;
	ss.initClass($GameLogic_Common_CustomLogicAction_ClientAction, $asm, {}, Pather.Common.Models.Common.Actions.ClientActions.LogicAction_ClientAction, [Pather.Common.Models.Common.Actions.IAction]);
	ss.initClass($GameLogic_Common_CustomLogicAction_GameSegmentAction, $asm, {}, Pather.Common.Models.Common.Actions.GameSegmentAction.LogicAction_GameSegmentAction, [Pather.Common.Models.Common.Actions.IAction]);
	ss.initClass($GameLogic_Common_CustomLogicAction_GameWorldAction, $asm, {}, Pather.Common.Models.Common.Actions.GameWorldAction.LogicAction_GameWorldAction, [Pather.Common.Models.Common.Actions.IAction]);
	ss.initClass($GameLogic_Common_CustomLogicAction_NeighborGameSegmentAction, $asm, {}, Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.LogicAction_NeighborGameSegmentAction, [Pather.Common.Models.Common.Actions.IAction]);
	ss.initClass($GameLogic_Common_CustomLogicAction_TellGameSegmentAction, $asm, {}, Pather.Common.Models.Common.Actions.TellGameSegmentAction.LogicAction_TellGameSegmentAction, [Pather.Common.Models.Common.Actions.IAction]);
	ss.initClass($GameLogic_Common_CutTree_CustomLogicAction_ClientAction, $asm, {}, $GameLogic_Common_CustomLogicAction_ClientAction, [Pather.Common.Models.Common.Actions.IAction]);
	ss.initClass($GameLogic_Common_CutTree_CustomLogicAction_GameSegmentAction, $asm, {}, $GameLogic_Common_CustomLogicAction_GameSegmentAction, [Pather.Common.Models.Common.Actions.IAction]);
	ss.initClass($GameLogic_Common_CutTree_CustomLogicAction_GameWorldAction, $asm, {}, $GameLogic_Common_CustomLogicAction_GameWorldAction, [Pather.Common.Models.Common.Actions.IAction]);
	ss.initClass($GameLogic_Common_CutTree_CustomLogicAction_NeighborGameSegmentAction, $asm, {}, $GameLogic_Common_CustomLogicAction_NeighborGameSegmentAction, [Pather.Common.Models.Common.Actions.IAction]);
	ss.initClass($GameLogic_Common_CutTree_CustomLogicAction_TellGameSegmentAction, $asm, {}, $GameLogic_Common_CustomLogicAction_TellGameSegmentAction, [Pather.Common.Models.Common.Actions.IAction]);
	ss.initEnum($GameLogic_Common_LogicActionType, $asm, { cutTree: 0 });
	ss.initClass($GameLogic_Common_LogicGameBoard, $asm, {
		init$1: function(grid) {
			this.grid = grid;
			this.weightGrid = new Array(grid.length);
			this.logicGrid = new Array(grid.length);
			for (var i = 0; i < grid.length; i++) {
				var strings = grid[i];
				this.weightGrid[i] = new Array(strings.length);
				this.logicGrid[i] = new Array(strings.length);
				for (var j = 0; j < strings.length; j++) {
					var s = strings[j];
					var item = $GameLogic_Common_LogicGameBoard.fromGridItem(s);
					this.logicGrid[i][j] = item;
					this.$updateWeightedGrid(item, i, j);
				}
			}
			this.aStarGraph = new Graph(this.weightGrid);
		},
		init: function() {
			this.grid = new Array(Pather.Common.Constants.numberOfSquares);
			for (var x = 0; x < Pather.Common.Constants.numberOfSquares; x++) {
				this.grid[x] = new Array(Pather.Common.Constants.numberOfSquares);
				for (var y = 0; y < Pather.Common.Constants.numberOfSquares; y++) {
					var rand = Math.random() * 100;
					var slot = $GameLogic_Common_LogicGameBoard.buildGridItem($GameLogic_Common_LogicGridItem.$ctor('empty', -2147483648));
					if (rand < 15) {
						slot = $GameLogic_Common_LogicGameBoard.buildGridItem($GameLogic_Common_LogicGridItem.$ctor('wall', -2147483648));
					}
					else {
						rand = Math.random() * 100;
						if (rand < 20) {
							slot = $GameLogic_Common_LogicGameBoard.buildGridItem($GameLogic_Common_LogicGridItem.$ctor('tree', ss.Int32.trunc(Math.random() * 100)));
						}
					}
					this.grid[x][y] = slot;
				}
			}
			this.init$1(this.grid);
		},
		$updateWeightedGrid: function(item, x, y) {
			switch (item.type) {
				case 'tree': {
					this.weightGrid[x][y] = 0;
					break;
				}
				case 'wall': {
					this.weightGrid[x][y] = 0;
					break;
				}
				case 'empty': {
					this.weightGrid[x][y] = 1;
					break;
				}
				default: {
					throw new ss.ArgumentOutOfRangeException();
				}
			}
		},
		changePoint: function(item, x, y) {
			this.logicGrid[x][y] = item;
			this.grid[x][y] = $GameLogic_Common_LogicGameBoard.buildGridItem(item);
			this.$updateWeightedGrid(item, x, y);
			this.aStarGraph.grid[x][y].weight = this.weightGrid[x][y];
		},
		getAtXY: function(squareX, squareY) {
			return this.logicGrid[squareX][squareY];
		}
	}, Pather.Common.GameFramework.GameBoard);
	ss.initClass($GameLogic_Common_LogicGridItem, $asm, {});
	ss.initEnum($GameLogic_Common_LogicGridItemType, $asm, { tree: 'tree', wall: 'wall', empty: 'empty' }, true);
})();
