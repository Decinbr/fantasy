//============================================================================
// EliMZ_QuitMenuCommonEvent.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc v3.0.0 - Play a common event when the menu is closed.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-quitmenucommonevent-rpg-maker-mv

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
https://www.patreon.com/hakuenstudio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Introduction
============================================================================

You may want to increase a variable or turn on a switch automatically 
depending on what equipment the actors are using.
Or, to do several things like changing the appearance of the character, 
increase speed and more.
This plugin allows you to do this check as it allows you to run a common 
event every time the player exits / closes the menu.

============================================================================
Features
============================================================================

Play a common event on the map scene every time the player closes/exits 
the menu.

============================================================================
How to use
============================================================================

Just choose your common event Id in the plugin parameters.

============================================================================
Terms of Use
============================================================================

https://www.hakuenstudio.com/rpg-maker/terms-of-use

============================================================================
Links
============================================================================

Facebook - https://www.facebook.com/hakuenstudio
Instagram - https://www.instagram.com/hakuenstudio
Twitter - https://twitter.com/hakuen_studio

============================================================================
Update log
============================================================================
Version 3.0.0 - 08/15/2021
- Adapted to work with Eli Book 4.0.0.
Version 2.0.0 - 12/18/2020
- Adapted to work with Eli Book 3.0.0.
Version 1.0.1 - 10/16/2020
- Adapted to work with Eli Book 2.0.0
Version 1.0.0 - 10/06/2020
- Plugin release!

@param commonEventId
@text Common Event Id
@type common_event
@desc Select here the common event to play when leaves the menu.
@default 0

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_QuitMenuCommonEvent = true

/* ========================================================================== */
/*                                    ALERT                                   */
/* ========================================================================== */

{

    const installWarning = `You must have installed the EliMZ_Book plugin above all Eli plugins.
Please download it for free.`
    const pluginName = (() => {
        const srcScript = document.currentScript.src
        const start = srcScript.lastIndexOf("/") + 1
        const end = srcScript.lastIndexOf(".js")
        const pluginName = srcScript.substring(start, end)

        return pluginName
    })()
    const requiredVersion = ['4','0','0']
    const updateWarning = `${pluginName} needs the EliMZ_Book ${requiredVersion} version.
Please download it for free.`

    function callEliBook(){
        window.open('https://hakuenstudio.itch.io/')
    }
    
    function needInstallBook() {
        if(!Eli.alert){

            if(window.confirm(installWarning)) callEliBook()
            Eli.alert = true
        }
    }

    function needUpdateBook() {
        if(!Eli.alert){

            if(window.confirm(updateWarning)) callEliBook()
            Eli.alert = true
        }
    }
    
    if(!Imported.Eli_Book) needInstallBook()
    if(Eli.Book.Version < requiredVersion) needUpdateBook()
     
}

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */

{

Eli.QuitMenuCommonEvent = {

    parameters: {commonEventId: 0},
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = Eli.PluginManager.createParameters()
        this.parameters = parameters
    },

    initPluginCommands(){},

    param(){
        return this.parameters
    },

}

const Plugin = Eli.QuitMenuCommonEvent
const Alias = Eli.QuitMenuCommonEvent.alias

Plugin.initialize()

/* -------------------------------- SCENE MAP ------------------------------- */

Alias.Scene_Map_callMenu = Scene_Map.prototype.callMenu
Scene_Map.prototype.callMenu = function() {
    Alias.Scene_Map_callMenu.call(this)
    this.reserveQuitMenuCommonEvent()
}

Scene_Map.prototype.reserveQuitMenuCommonEvent = function(){
    const id = Plugin.param().commonEventId
    $gameTemp.reserveCommonEvent(id)
}

}