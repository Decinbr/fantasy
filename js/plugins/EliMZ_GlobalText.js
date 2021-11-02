//============================================================================
// EliMZ_GlobalText.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc v3.0.0 - You can use escape codes in every window!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-super-text

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
https://www.patreon.com/hakuenstudio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
==============================================================================
Introduction
==============================================================================

Sometimes you may want to customize your windows a little. It can often be the 
case that you want to change the colors of the texts, add icons or even 
variable values.
With this plugin you can easily customize your texts in the windows using 
escape codes as in the message box!

==============================================================================
Features
==============================================================================

Activate escape codes to be used in any window!

==============================================================================
How to use
==============================================================================

You can use Auto mode on plugin parameters, and all text will be converted 
automatically.

If you set to Manual mode, you have to choose a tag of your choice in the 
plugin parameters.

Then, just type the tag as the first letter in any text.

Example:
-Actor name
§\c[3]Harold

*NOTE¹: Not all codes can work outside the message box, such as waiting for 
frames or opening the gold window.

*NOTE²: Using escape codes in centralized texts, in horizontal windows 
(like the item category) ends up decentralizing them. Use Eli Message Actions
to centralize them with escape codes.

*NOTE³: There are some windows that I do not add the global text 
functionality because it messes with the text.
Window_Shop, Window_ItemList, Window_NumberInput, Window_SkillList.

==============================================================================
Terms of Use
==============================================================================

https://www.hakuenstudio.com/rpg-maker/terms-of-use

============================================================================
Links
============================================================================

Facebook - https://www.facebook.com/hakuenstudio
Instagram - https://www.instagram.com/hakuenstudio
Twitter - https://twitter.com/hakuen_studio

==============================================================================
Update log
==============================================================================
Version 3.0.0 - 08/19/2021
- Removed the Fix Align plugin parameter, since Eli Message Actions can 
handle alignment now.
- Need Eli Book 4.0.0 now.
Version 2.0.1 - 04/12/2021
- Fixed an issue that some windows are not converting multiple escape 
characters.
Version 2.0.0 - 12/18/2020
- Adapted to work with Eli Book 3.0.0.
Version 1.2.0 - 10/19/2020
- Created an experimental fix for the issue with centralized texts.
- Changed the plugin name.
- Adapt to Eli Book 2.0.0
Version 1.1.0 - 10/02/2020
- Fixed a bug in Window_ShopStatus.
Version 1.0.0 - 09/20/2020
- Plugin release!

@param auto
@text Automatic Mode
@type boolean
@desc If you set to false, you will have to put a tag on the first letter of any text.
@default false

@param tag
@text Tag
@type text
@desc The tag used to detect if the text has escape codes. Must be used as first letter(Only for Manual mode).
@default §
@parent mode

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_GlobalText = true

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

Eli.GlobalText = {

    parameters: {auto: false, tag: '§'},
    alias: {},
    regGlobalEscape: null,
    regIcon: /\\i/gi,

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.regGlobalEscape = new RegExp(this.parameters.tag, "gi")
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){
        const commands = []
        Eli.PluginManager.registerCommands(this, commands)
    },

    param(){
        return this.parameters
    },

}

const Plugin = Eli.GlobalText
const Alias = Eli.GlobalText.alias

Plugin.initialize()

/* ------------------------------ GAME MESSAGE ------------------------------ */
Alias.Game_Message_add = Game_Message.prototype.add
Game_Message.prototype.add = function(text) {
    text = Eli.Utils.convertEscapeCharacters(text)
    text = text.replace(Plugin.regGlobalEscape, '')
    Alias.Game_Message_add.call(this, text)
}

/* ------------------------------- WINDOW BASE ------------------------------ */
{

Alias.Window_Base_initialize = Window_Base.prototype.initialize
Window_Base.prototype.initialize = function(x, y, width, height){
    Alias.Window_Base_initialize.call(this, x, y, width, height)
    this._globalTag = Plugin.param().tag
}

Alias.Window_Base_drawText = Window_Base.prototype.drawText
Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
    if(this.canDrawGlobalText(String(text))){
        text = String(text).replace(Plugin.regGlobalEscape, '')
        this.drawTextEx(text, x, y, maxWidth)
    }else{
        Alias.Window_Base_drawText.call(this, text, x, y, maxWidth, align);
    }
}

Alias.Window_Base_drawTextEx = Window_Base.prototype.drawTextEx
Window_Base.prototype.drawTextEx = function(text, x, y) {
    if(text){
        text = this.convertEscapeCharacters(text)
        text = text.replace(Plugin.regGlobalEscape, '')
    }

    return Alias.Window_Base_drawTextEx.call(this, text, x, y)
}

Window_Base.prototype.canDrawGlobalText = function(text){
    const isWindowShop = () => this.constructor.name === "Window_ShopStatus"
    const isWindowNumberInput = () => this.constructor.name === "Window_NumberInput"
    const isItemList = () => this instanceof Window_ItemList || this instanceof Window_SkillList
    const isValidWindow = () => !isWindowShop() && !isWindowNumberInput() && !isItemList()
    const startWithGlobalTag = text.charAt(0) === this._globalTag
    
    return text && (startWithGlobalTag || Plugin.param().auto) && isValidWindow()
}

}

}