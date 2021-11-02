//==========================================================================
// EliMZ_EasingPicture.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc Add more easing animations to pictures!
@author Hakuen Studio | v2.0.0
@url https://hakuenstudio.itch.io/

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
https://www.patreon.com/hakuenstudio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Introduction
============================================================================

By default, RPG Maker MZ comes with only 4 types of easing animations:
Linear - Standard movement.
Slow Start - In Cubic
Slow End - Out Cubic
Slow Start/End - In/Out Cubic

Although that is great, when comparing with MV, it could also be better!
This plugin adds more animation options to move your pictures!

============================================================================
Features
============================================================================

● New ease types to animate your pictures.

============================================================================
How to use
============================================================================

Simply use the plugin commands and you are good to go.

You can see some examples of how it works here:
https://easings.net/

The only thing you have to know is if you use the Quick plugin command, you 
have to put it right before the move picture command.

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
Version 2.0.0 - 12/18/2020
- Adapted to work with Eli Book 3.0.0.

Version 1.1.1 - 12/03/2020
- Fixed a bug that the animation time was not counting.

Version 1.1.0 - 11/29/2020
- Removed the wait argument of the plugin commands. Use the event wait 
command instead.
- Removed the QOL plugin commands and put them in another plugin. 
- Changed some plugin commands to reduce the ease dropdown list.
- Added quick and normal plugin commands.

Version 1.0.0 - 11/11/2020
- Plugin release!

@command quickEasing
@text Change Ease type(Quick)
@desc To be used before the default move picture command. Don't need specify Id.

@arg easeType
@text Ease type
@type select
@option Linear @option Quad @option Cubic @option Quart @option Quint @option Sine @option Expo @option Circ @option Elastic @option Back @option Bounce
@desc Linear, In Quad and Out Quad are the default ones from MZ.
@default Linear

@arg easeMove
@text Ease Move
@type select
@option In
@option Out
@option InOut
@desc
@default In
@parent easeType

@command picEasing
@text Change Ease type(By Id)
@desc Can be used anywhere before move the picture. But must specify a pic Id.

@arg id
@text Picture Id
@type number
@desc The picture Id
@default 1

@arg easeType
@text Ease type
@type select
@option Linear @option Quad @option Cubic @option Quart @option Quint @option Sine @option Expo @option Circ @option Elastic @option Back @option Bounce
@desc Linear, In Quad and Out Quad are the default ones from MZ.
@default Linear

@arg easeMove
@text Ease Move
@type select
@option In
@option Out
@option InOut
@desc
@default In
@parent easeType

*/

"use strict"

var Eli = Eli || {};
var Imported = Imported || {};
Imported.Eli_EasingPicture = true;

/* ========================================================================== */
/*                                    ALERT                                   */
/* ========================================================================== */

{

    const installWarning = `You must have installed the EliMZ_Book plugin above all Eli plugins.
Please download it for free.`
    const pluginName = (() => {
        const url = String(document.currentScript._url);
        const start = url.indexOf('Eli');
        const end = url.length - 3;
        const pluginName = url.substring(start, end);

        return pluginName;
    })();
    const requiredVersion = ['3','0','0']
    const updateWarning = `${pluginName} needs an updated version of EliMZ_Book.
Please download it for free.`

    function callEliBook(){
        window.open('https://hakuenstudio.itch.io/')
    };
    
    function needInstallBook() {
        if(!Eli.alert){

            if(window.confirm(installWarning)) callEliBook();
            Eli.alert = true;
        }
    };

    function needUpdateBook() {
        if(!Eli.alert){

            if(window.confirm(updateWarning)) callEliBook();
            Eli.alert = true;
        }
    };
    
    if(!Imported.Eli_Book) needInstallBook();
    if(Eli.Book.Version < requiredVersion) needUpdateBook();
     
}

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */

Eli.EasingPicture = {

    alias: this.alias || {},
    quickEasingType: '',
    picEasingType: new Array(100).fill(''),

    initialize(){
        EliPluginManager.registerCommands(this);
    },

    quickEasing(args){
        this.setQuickEasingType(args.easeType, args.easeMove);
    },

    setQuickEasingType(type, move){
        this.quickEasingType = EliBook.getEasingType(type, move);
    },

    getQuickEasingType(){
        return this.quickEasingType;
    },

    picEasing(args){
        this.setPicEasingType(+args.id, args.easeType, args.easeMove);
    },

    setPicEasingType(id, type, move){
        this.picEasingType[id] = EliBook.getEasingType(type, move);
    },

    getPicEasingType(id){
        return this.picEasingType[id];
    },

    resetEasing(id){
        this.quickEasingType = '';
        this.picEasingType[id] = '';
    },

    canEase(id){
        return this.quickEasingType || this.picEasingType[id];
    },

};

/* ========================================================================== */
/*                                    START                                   */
/* ========================================================================== */

{

const Plugin = Eli.EasingPicture;
const Alias = Eli.EasingPicture.alias;

Plugin.initialize();

/* ------------------------------- GAME SCREEN ------------------------------ */

Alias.Game_Screen_showPicture = Game_Screen.prototype.showPicture;
Game_Screen.prototype.showPicture = function( pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode) {
    Alias.Game_Screen_showPicture.call(this, ...arguments);
    this.picture(pictureId).setId(pictureId)
};

/* ------------------------------ GAME PICTURE ------------------------------ */

Alias.Game_Picture_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
    Alias.Game_Picture_initialize.call(this);
    this._id = 0;
    this.initEasing();
};

Game_Picture.prototype.setId = function(id){
    this._id = id;
};

Game_Picture.prototype.initEasing = function(){
    this._currentDuration = 0;
    this._originX = 0;
    this._originY = 0;
    this._originScaleX = 0;
    this._originScaleY = 0;
    this._originOpacity = 0;
};

Alias.Game_Picture_move = Game_Picture.prototype.move;
Game_Picture.prototype.move = function(origin, x, y, scaleX, scaleY, opacity, blendMode, duration, easingType) {
    this.prepareEasing();
    arguments[8] = this.setNewEasingType() || easingType;
    Alias.Game_Picture_move.call(this, ...arguments);
};

Game_Picture.prototype.prepareEasing = function(){
    this._originX = this._x;
    this._originY = this._y;
    this._originScaleX = this._scaleX;
    this._originScaleY = this._scaleY;
    this._originOpacity = this._opacity;
    this._currentDuration = 0
};

Game_Picture.prototype.setNewEasingType = function(){
    if(Plugin.canEase(this._id)){
        const newEasingType = Plugin.getQuickEasingType() || Plugin.getPicEasingType(this._id);
        return newEasingType;
    }
};

Alias.Game_Picture_updateMove = Game_Picture.prototype.updateMove;
Game_Picture.prototype.updateMove = function() {
    if(Plugin.canEase(this._id)){
        this.updateEasing();
    }else{
        Alias.Game_Picture_updateMove.call(this);
    }
};

Game_Picture.prototype.updateEasing = function(){
    if(this._currentDuration < this._duration){

    this._currentDuration++;

    let elapsedTime = this._currentDuration / this._duration;
    
    elapsedTime = EliEasing.execute(this._easingType, elapsedTime);

    this._x = this._originX + elapsedTime * (this._targetX - this._originX);
    this._y = this._originY + elapsedTime * (this._targetY - this._originY);
    this._scaleX = this._originScaleX + elapsedTime * (this._targetScaleX - this._originScaleX);
    this._scaleY = this._originScaleY + elapsedTime * (this._targetScaleY - this._originScaleY);
    this._opacity = this._originOpacity + elapsedTime * (this._targetOpacity - this._originOpacity);

    }else{
        this.stopEasing();
    }

};

Game_Picture.prototype.changeEasingType = function(value){
    this._easingType = value;
};

Game_Picture.prototype.stopEasing = function(){
    this.initEasing();
    this._duration = 0;
    this._easingType = 0;
    Plugin.resetEasing(this._id);
};

}