//==========================================================================
// EliMZ_Pictures.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc Enhance the picture feature with plugin commands!
@author Hakuen Studio | v2.2.0
@url https://hakuenstudio.itch.io/

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
https://www.patreon.com/hakuenstudio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Introduction
============================================================================

When using pictures, sometimes you may want to show or move them in a more 
complex way. 
But the only place you can be free is changing/setting the x and y 
position through variables.

============================================================================
Features
============================================================================

● New command for show and move pictures, letting you use formulas and 
variables for positions, scale, and opacity.
● New shorter commands for a quick show and move pictures.
● Fade picture command.
● Erase more than one picture at once using \v[id] or formulas.

============================================================================
How to use
============================================================================

Simply use the plugin commands and you are good to go.
It doesn't have the wait for finish movement feature. You have to use the 
default wait event command.

The erase command can be used with one of the two ways:

Using "," → 1, 3, 6, 7, 8 Will erase all the listed picture id's.
Using "#" → 3#9 Will erase all the picture id's between and 
including 3#9.

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
Version 2.2.0 - 02/27/2021
- Added multiple origin points, instead of just default Upper Left and Center
Version 2.1.1 - 01/18/2021
- Add a change to the erase command, now you can choose between list 
various id's per comma "," or use "#" to get a range of numbers.

Version 2.1.0 - 01/05/2021
- Add option to use formulas or \v[id] in the picture fields id and 
filename.
- New plugin command that let you erase more than one picture id at once. 
Can also use formulas and \v[id].

Version 2.0.0 - 12/18/2020
- Adapted to work with Eli Book 3.0.0.

Version 1.0.0 - 11/29/2020
- Plugin release!

@command show
@text Show Picture
@desc The default show picture command. But you can use formulas and \v[id].

@arg name
@text Picture name
@type file
@dir img/pictures
@desc The picture file. Can use \v[id] or formulas in the text field.
@default

@arg id
@text Picture Id
@type text
@desc The picture id. Can use \v[id] or formulas.
@default 1

@arg origin
@text Origin
@type select
@option UpperLeft
@option UpperCenter
@option UpperRight
@option CenterLeft
@option Center
@option CenterRight
@option LowLeft
@option LowCenter
@option LowRight
@desc Choose the origin of the picture.
@default UpperLeft

@arg x
@text Position X
@type text
@desc The X position on the screen.
@default 0

@arg y
@text Position Y
@type text
@desc The Y position on the screen.
@default 0

@arg scaleWidth
@text Scale Width
@type text
@desc Must return a number of 0 to 100.
@default 100

@arg scaleHeight
@text Scale Height
@type text
@desc Must return a number of 0 to 100.
@default 100

@arg opacity
@text Opacity
@type text
@desc 0 to 255.
@default 255

@arg blendMode
@text Blend mode
@type select
@desc Choose blend Type
@option Normal @option Additive @option Multiply @option Screen
@default Normal

@command quickShow
@text Quick show
@desc A shorter command to show pictures. Scale, opacity and blend mode are set to default values.

@arg name
@text Picture name
@type file
@dir img/pictures
@desc The picture file. Can use \v[id] or formulas in the text field.
@default

@arg id
@text Picture Id
@type text
@desc The picture id. Can use \v[id] or formulas.
@default 1

@arg origin
@text Origin
@type select
@option UpperLeft
@option UpperCenter
@option UpperRight
@option CenterLeft
@option Center
@option CenterRight
@option LowLeft
@option LowCenter
@option LowRight
@desc Choose the origin of the picture.
@default UpperLeft

@arg x
@text Position X
@type text
@desc The X position on the screen.
@default 0

@arg y
@text Position Y
@type text
@desc The Y position on the screen.
@default 0

@command move
@text Move Picture
@desc The default move picture, but with more easing options and capable of formulas and \v[id].

@arg id
@text Picture Id
@type text
@desc The picture id. Can use \v[id] or formulas.
@default 1

@arg origin
@text Origin
@type select
@option UpperLeft
@option UpperCenter
@option UpperRight
@option CenterLeft
@option Center
@option CenterRight
@option LowLeft
@option LowCenter
@option LowRight
@desc Choose the origin of the picture.
@default UpperLeft

@arg x
@text Position X
@type text
@desc The X position on the screen.
@default 0

@arg y
@text Position Y
@type text
@desc The Y position on the screen.
@default 0

@arg scaleWidth
@text Scale Width
@type text
@desc Must return a number of 0 to 100.
@default 100

@arg scaleHeight
@text Scale Height
@type text
@desc Must return a number of 0 to 100.
@default 100

@arg opacity
@text Opacity
@type text
@desc 0 to 255
@default 255

@arg blendMode
@text Blend mode
@type select
@desc Choose blend Type
@option Normal @option Additive @option Multiply @option Screen
@default Normal

@arg duration
@text Duration
@type text
@desc The number of frames that the picture will take to finish the movement.
@default 60

@arg easingType
@text Easing
@type select
@option Constant speed
@option Slow start
@option Slow end
@option Slow start and end
@desc Select the easy type.
@default Constant speed

@command quickMove
@text Quick Move
@desc A shorter command to move pictures. Scale, opacity and blend mode are set to default values.

@arg id
@text Picture Id
@type text
@desc The picture id. Can use \v[id] or formulas.
@default 1

@arg origin
@text Origin
@type select
@option UpperLeft
@option UpperCenter
@option UpperRight
@option CenterLeft
@option Center
@option CenterRight
@option LowLeft
@option LowCenter
@option LowRight
@desc Choose the origin of the picture.
@default UpperLeft

@arg x
@text Position X
@type text
@desc The X position on the screen.
@default 0

@arg y
@text Position Y
@type text
@desc The Y position on the screen.
@default 0

@arg duration
@text Duration
@type text
@desc The number of frames that the picture will take to finish the movement.
@default 60

@arg easingType
@text Easing
@type select
@option Constant speed
@option Slow start
@option Slow end
@option Slow start and end
@desc Select the easy type.
@default Constant speed

@command showAndMove
@text Show and Move
@desc You can show and move the picture at once.

@arg id
@text Picture Id
@type text
@desc The picture id. Can use \v[id] or formulas.
@default 1

@arg name
@text Picture name
@type file
@dir img/pictures
@desc The picture file. Can use \v[id] or formulas in the text field.
@default

@arg origin
@text Origin
@type select
@option UpperLeft
@option UpperCenter
@option UpperRight
@option CenterLeft
@option Center
@option CenterRight
@option LowLeft
@option LowCenter
@option LowRight
@desc Choose the origin of the picture.
@default UpperLeft

@arg x
@text Position X
@type text
@desc The X position on the screen(Start, final).
@default 0, 0

@arg y
@text Position Y
@type text
@desc The Y position on the screen(Start, final).
@default 0, 0

@arg scaleWidth
@text Scale Width
@type text
@desc Must return a number of 0 to 100(Start, final).
@default 100, 100

@arg scaleHeight
@text Scale Height
@type text
@desc Must return a number of 0 to 100(Start, final).
@default 100, 100

@arg opacity
@text Opacity
@type text
@desc 0 to 255(Start, Final).
@default 255, 255

@arg blendMode
@text Blend mode
@type select
@desc Choose blend Type
@option Normal @option Additive @option Multiply @option Screen
@default Normal

@arg duration
@text Duration
@type text
@desc The number of frames that the picture will take to finish the movement.
@default 60

@arg easingType
@text Easing
@type select
@option Constant speed
@option Slow start
@option Slow end
@option Slow start and end
@desc Select the easy type.
@default Constant speed

@command fadeIn
@text Fade In
@desc Fade in a picture.

@arg id
@text Id
@type text
@desc The picture id. Can use \v[id] or formulas.
@default 0

@arg duration
@text Duration
@type number
@desc the time in frames.
@default 60

@command fadeOut
@text Fade Out
@desc Fade out a picture.

@arg id
@text Id
@type text
@desc The picture id. Can use \v[id] or formulas.
@default 0

@arg duration
@text Duration
@type number
@desc the time in frames.
@default 60

@command erase
@text Erase
@desc Separate each one with a comma. Can use \v[id] or formula.

@arg id
@text Id
@type text
@desc The picture id. Can use \v[id] or formulas.
@default

*/

"use strict"

var Eli = Eli || {};
var Imported = Imported || {};
Imported.Eli_Pictures = true;

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
{

Eli.Pictures = {

    alias: this.alias || {},

    initialize(){
        EliPluginManager.registerCommands(this);
    },

    getPicOrigin(origin){
        const anchors = {
            UpperLeft: 0,
            UpperCenter: 1,
            UpperRight: 2,
            CenterLeft: 3,
            Center: 4,
            CenterRight: 5,
            LowLeft: 6,
            LowCenter: 7,
            LowRight: 8,
        }
        console.log(origin, anchors[origin])
        return anchors[origin]
    },

    setupStaticArgs(args){
        const id = +(EliBook.processEscapeVarOrFormula(args.id));
        const origin = this.getPicOrigin(args.origin);
        const blendMode = +EliBook.getBlendMode(args.blendMode);

        return [id, origin, blendMode];
    },

    setupCoordinates(newX, newY){
        const x = +EliBook.processEscapeVarOrFormula(newX);
        const y = +EliBook.processEscapeVarOrFormula(newY);

        return [x, y];
    },

    setupScale(newScaleWidth, newScaleHeight){
        const scaleWidth = +EliBook.processEscapeVarOrFormula(newScaleWidth);
        const scaleHeight = +EliBook.processEscapeVarOrFormula(newScaleHeight);

        return [scaleWidth, scaleHeight];
    },

    show(args){
        const name = EliBook.processEscapeVarOrFormula(args.name);
        const [id, origin, blendMode] = this.setupStaticArgs(args);
        const [x, y] = this.setupCoordinates(args.x, args.y);
        const [scaleWidth, scaleHeight] = this.setupScale(args.scaleWidth, args.scaleHeight);
        const opacity = +EliBook.processEscapeVarOrFormula(args.opacity);

        $gameScreen.showPicture(id, name, origin, x, y, scaleWidth, scaleHeight, opacity, blendMode);
    },

    move(args){
        const [id, origin, blendMode] = this.setupStaticArgs(args);
        const [x, y] = this.setupCoordinates(args.x, args.y);
        const [scaleW, scaleH] = this.setupScale(args.scaleWidth, args.scaleHeight);
        const opacity = +EliBook.processEscapeVarOrFormula(args.opacity);
        const duration = +args.duration;
        const easeType = EliBook.getDefaultEasingType(args.easingType);
        
        this.startMove(id, origin, x, y, scaleW, scaleH, opacity, blendMode, duration, easeType);

    },

    startMove(id, origin, x, y, scaleW, scaleH, opacity, blendMode, duration, easeType){
        $gameScreen.movePicture(id, origin, x, y, scaleW, scaleH, opacity, blendMode, duration, easeType);
    },

    showAndMove(args){
        const name = EliBook.processEscapeVarOrFormula(args.name);
        const duration = +args.duration;
        const [id, origin, blendMode] = this.setupStaticArgs(args);

        let [x1, x2] = args.x.split(",");
        let [y1, y2] = args.y.split(",");
        let [scaleW1, scaleW2] = args.scaleWidth.split(",");
        let [scaleH1, scaleH2] = args.scaleHeight.split(",");
        let [opacity1, opacity2] = args.opacity.split(",");

        [x1, y1] = this.setupCoordinates(x1, y1);
        [x2, y2] = this.setupCoordinates(x2, y2);
        [scaleW1, scaleH1] = this.setupScale(scaleW1, scaleH1);
        [scaleW2, scaleH2] = this.setupScale(scaleW2, scaleH2);
        opacity1 = +EliBook.processEscapeVarOrFormula(opacity1);
        opacity2 = +EliBook.processEscapeVarOrFormula(opacity2);

        $gameScreen.showPicture(id, name, origin, x1, y1, scaleW1, scaleH1, opacity1, blendMode);

        let easeType = EliBook.getDefaultEasingType(args.easingType);

        this.startMove(id, origin, x2, y2, scaleW2, scaleH2, opacity2, blendMode,
                duration, easeType);
    },

    quickShow(args){
        const [id, origin] = this.setupStaticArgs(args);
        const [x, y] = this.setupCoordinates(args.x, args.y);
        const name = EliBook.processEscapeVarOrFormula(args.name);
        $gameScreen.showPicture(id, name, origin, x, y, 100, 100, 255, 0);
    },

    quickMove(args){
        const [id, origin] = this.setupStaticArgs(args);
        const [x, y] = this.setupCoordinates(args.x, args.y);
        const duration = +args.duration;
        const easeType = EliBook.getDefaultEasingType(args.easingType);

        this.startMove(id, origin, x, y, 100, 100, 255, 0, duration, easeType);
    },

    fadeIn(args){
        const picture = $gameScreen.picture(+args.id);
        if(picture){
            picture._fadeInDuration = +args.duration;
        }
    },

    fadeOut(args){
        const picture = $gameScreen.picture(+args.id);
        if(picture){
            picture._fadeOutDuration = +args.duration;
        }
    },

    erase(args){
        if(args.id.includes("#")){
            var ids = args.id.split("#").map(item => +item);
            const maxNumbers = ids[1] - (ids[0]-1);
            const arr = Array.from({length: maxNumbers.clamp(0, 100)}, (_, i) => i + ids[0])
            ids = arr;
        }else{
            var ids = args.id.split(",");
        }

        for(let id of ids){
            id = EliBook.processEscapeVarOrFormula(id);
            $gameScreen.erasePicture(+id);
        }
    },

};


const Plugin = Eli.Pictures;
const Alias = Eli.Pictures.alias;

Plugin.initialize();

/* ========================================================================== */
/*                                   OBJECT                                   */
/* ========================================================================== */

Alias.Game_Picture_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
    Alias.Game_Picture_initialize.call(this);
    this._fadeInDuration = 0;
    this._fadeOutDuration = 0;
};

Alias.Game_Picture_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function(){
    Alias.Game_Picture_update.call(this);
    this.updateFadeOut();
    this.updateFadeIn();
};

Game_Picture.prototype.updateFadeOut = function() {
    if (this._fadeOutDuration > 0) {
        const d = this._fadeOutDuration;

        this._opacity = (this._opacity * (d - 1)) / d;
        this._fadeOutDuration--;
    }
};

Game_Picture.prototype.updateFadeIn = function() {
    if (this._fadeInDuration > 0) {
        const d = this._fadeInDuration;

        this._opacity = (this._opacity * (d - 1) + 255) / d;
        this._fadeInDuration--;
    }
};

/* ========================================================================== */
/*                                   SPRITE                                   */
/* ========================================================================== */

// Overwrite origin
// Alias.Sprite_Picture_updateOrigin = Sprite_Picture.prototype.updateOrigin;
Sprite_Picture.prototype.getAnchorByOrigin = function(origin) {
    const anchors = [
        [0,     0],
        [0.5,   0],
        [1,     0],
        [0,     0.5],
        [0.5,   0.5],
        [1,     0.5],
        [0,     1],
        [0.5,   1],
        [1,     1]
    ]
    return anchors[origin] || [0, 0]
}

Sprite_Picture.prototype.updateOrigin = function() {
    const picture = this.picture();
    const [x, y] = this.getAnchorByOrigin(picture.origin())
    this.anchor.x = x
    this.anchor.y = y
};

}