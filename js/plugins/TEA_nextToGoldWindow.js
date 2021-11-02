//TEA_nextToGoldWindow.js
/*:
 * @target MZ
 * @plugindesc Add window next to gold window
 * @author Tea
 * @url https://discord.gg/rQgnECBkDj
 *
 * @help
 * 
 * ****************************************************************************
 * 
 * This plugin makes it so you can display a value stored in a variable
 * in a window next to your gold window in the menu.
 * 
 * ############################################################################
 *                                Tea_nextToGoldWindow
 *                                    Version 1.0
 *                                        Tea
 * ############################################################################
 *
 * @param var2
 * @text first
 * @desc The variable you want to use to display the first value in the window
 * @type number
 * 
 * @param var
 * @text second
 * @desc The variable you want to use to display the second value in the window
 * @type number
 * 
 * 
 * @
 * ############################################################################
 *  End
 * ############################################################################
 * 
 * 
 * Change Log: 
 * v1.0 Release
 *
 * https://discord.gg/DriftwoodGaming
 * https://www.youtube.com/DriftwoodGamingMV
 * https://www.patreon.com/DriftwoodGaming
 * https://driftwoodGaming.com
 * 
 */
(() => {
    'use strict';
    const pluginName = 'Tea_nextToGoldWindow';
    const param = PluginManager.parameters(pluginName);

    Scene_Menu.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createCommandWindow();
        this.createGoldWindow();
        this.createGold2Window();
        this.createStatusWindow();
    };

    Scene_Menu.prototype.createGold2Window = function() {
        const rect = this.goldWindow2Rect();
        this._goldWindow2 = new Window_Gold2(rect);
        this.addWindow(this._goldWindow2);
    };
    
    Scene_Menu.prototype.goldWindow2Rect = function() {
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(1, true);
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = (this.mainAreaBottom() - wh) - 70;
        return new Rectangle(wx, wy, ww, wh);
    };


    function Window_Gold2() {
        this.initialize(...arguments);
    }
    
    Window_Gold2.prototype = Object.create(Window_Selectable.prototype);
    Window_Gold2.prototype.constructor = Window_Gold2;
    
    Window_Gold2.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.refresh();
    };
    
    Window_Gold2.prototype.colSpacing = function() {
        return 0;
    };
    
    Window_Gold2.prototype.refresh = function() {
        const rect = this.itemLineRect(0);
        const x = rect.x;
        const y = rect.y;
        const width = rect.width;
        this.contents.clear();
        this.drawCurrencyValue($gameVariables.value(param.var2), $gameVariables.value(param.var), x, y, width);
        
    };
    
    Window_Gold2.prototype.open = function() {
        this.refresh();
        Window_Selectable.prototype.open.call(this);
    };   
})();