/*:
 * @plugindesc More Info on MainMenu - Version 0.3 (Beta)
 * @author DevWithCoffee
 *
 * @help This Plugin adds more game information to the cash window:
 * + Map name
 * + Name and Value of a variable to be used however you want
 * + Game time
 *   (Increase time interval to decrease lag)
 *
 * This plugin is free and can be modified as you wish
 * it is not necessary to credit the author.
 *
 * @param Var_ID
 * @desc Select Variable ID
 * @type variable
 * @default 1
 *
 * @param Update_Time
 * @desc Set clock refresh time in menu to avoid laging.
 * @type number
 * @min 10
 * @max 1000
 * @default 300
 */

(function() {
	const parameters = PluginManager.parameters('GameMenuMoreInfo');
	const VarID = parseInt(parameters["Var_ID"]);
	const updatetime = Number(parameters["Update_Time"]);

	Window_Gold.prototype.refresh = function() {
		const rect = this.itemLineRect(0);
		const x = rect.x;
		const y = rect.y;
		const width = rect.width;
		const mapname = $gameMap.displayName() || $dataMapInfos[$gameMap._mapId].name;
		
		this.contents.clear();
		this.drawText(mapname, x, y, width, "center");
		this.drawText($gameSystem.playtimeText(), x, y*8, width, "center");
		
		this.changeTextColor(ColorManager.systemColor());
		this.drawText($dataSystem.variables[VarID], x, y*16, width, "left");
		this.resetTextColor();
		this.drawText($gameVariables.value(VarID), x, y*16, width, "right");
		
		this.changeTextColor(ColorManager.systemColor());
		this.drawText(this.currencyUnit(), x, y*24, width, "left");
		this.resetTextColor();
		this.drawText(this.value(), x, y*24, width, "right");
		
		if(SceneManager._scene instanceof Scene_Menu){
			setTimeout(function(){existWindowGold()},updatetime);
		}
	}
	
	Scene_Menu.prototype.goldWindowRect = function() {
		const ww = this.mainCommandWidth();
		const wh = this.calcWindowHeight(3, true);
		const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
		const wy = this.mainAreaBottom() - wh;
		return new Rectangle(wx, wy, ww, wh);
	};

	function existWindowGold(){
		if((SceneManager._scene instanceof Scene_Menu) && SceneManager.isGameActive()){
			SceneManager._scene._goldWindow.refresh();
		}else{
			if(SceneManager._scene instanceof Scene_Menu){
				setTimeout(function(){existWindowGold()},updatetime);
			}
		}
	}
})();