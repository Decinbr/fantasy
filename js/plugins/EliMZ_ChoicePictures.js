//============================================================================
// Eli_ChoicePictures.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book
@orderAfter EliMZ_EasingPicture

@plugindesc v2.2.0 - Show different pictures for each choice.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-choice-pictures-for-rpg-maker-mz

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
https://www.patreon.com/hakuenstudio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Introduction
============================================================================

• Build and play a game that the player can make choices is cool! 
Although Rpg Maker Mz choices are nice, this plugin made it better while it 
implements a feature that lets you show pictures while the player hovers 
over/selects different choices!

============================================================================
Features
============================================================================

● Show different pictures depending on what choice is highlighted.

============================================================================
How to use
============================================================================

● You just have to use the plugin command to setup each picture for each 
choice. You can't have more choices than pictures.
If you have 5 choices, you have to setup 5 pictures or more in the plugin 
command. They can be empty pictures, but has to be there.
● Use always before the choice command.
● If you are using EliMZ_EasingPictures, you can use the plugin command
to set the easing type by Id before setup each picture.
● In the picture name field, you can go to the text tab and use a formula 
there, like, $gameVariables.value(1).
But you must write at the beggining of the text: EVAL-your formula

Example:

EVAL-$gameVariables.value(1)

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
Version 2.2.0 - 08/21/2021
- Added temporary patch to work with Eli Book 4.0.0.
Version 2.1.0 - 06/30/2021
- Now you can use formulas to get the name of the picture in the plugin command.
Version 2.0.0 - 12/18/2020
- Adapted to work with Eli Book 3.0.0.
Version 1.1.0 - 11/29/2020
- Added compatibility with EliMZ_EasingPictures.
- No need to enable or disable the plugin anymore. It will handle it 
automatically.
Version 1.0.3 - 11/11/2020
- Fixed a bug that was not letting the user disable the plugin.
Version 1.0.2 - 11/09/2020
- Fixed a bug when hover the mouse over the choices.
Version 1.0.1 - 10/28/2020
- Code clean up.
Version 1.0.0 - 10/20/2020
- Plugin release!

@param enable
@text Enable by default
@type boolean
@desc Enable or disable the pictures for choices by default.
@default true

@command enablePlugin
@text Enable Choice Pic
@desc Choose to enable or disable choice picture

    @arg enable
    @text Enable choice pictures ?
    @type boolean
    @default true

@command setupPictures
@text Setup Choice Pictures
@desc Setup each pictures for each choice.

    @arg id
    @text Picture Id
    @type number
    @min 1
    @max 100
    @desc Choose the id for all choice pictures.
    @default 1

    @arg pictures
    @text All pictures
    @type struct<stlist>[]
    @desc Choose the default pictures for each index.
    @default ["{\"name\":\"Actor1_1\",\"origin\":\"UpperLeft\",\"x1\":\"0\",\"y1\":\"0\",\"x2\":\"300\",\"y2\":\"300\",\"scaleX\":\"100\",\"scaleY\":\"100\",\"opacity\":\"255\",\"blendMode\":\"Normal\",\"duration\":\"60\",\"easingType\":\"Slow start\"}","{\"name\":\"Actor1_2\",\"origin\":\"UpperLeft\",\"x1\":\"300\",\"y1\":\"0\",\"x2\":\"300\",\"y2\":\"300\",\"scaleX\":\"100\",\"scaleY\":\"100\",\"opacity\":\"255\",\"blendMode\":\"Normal\",\"duration\":\"60\",\"easingType\":\"Slow start\"}","{\"name\":\"Actor1_3\",\"origin\":\"UpperLeft\",\"x1\":\"0\",\"y1\":\"300\",\"x2\":\"300\",\"y2\":\"300\",\"scaleX\":\"100\",\"scaleY\":\"100\",\"opacity\":\"255\",\"blendMode\":\"Normal\",\"duration\":\"60\",\"easingType\":\"Slow start\"}","{\"name\":\"Actor1_4\",\"origin\":\"UpperLeft\",\"x1\":\"0\",\"y1\":\"0\",\"x2\":\"300\",\"y2\":\"300\",\"scaleX\":\"100\",\"scaleY\":\"100\",\"opacity\":\"255\",\"blendMode\":\"Normal\",\"duration\":\"60\",\"easingType\":\"Slow start\"}","{\"name\":\"Actor1_5\",\"origin\":\"UpperLeft\",\"x1\":\"0\",\"y1\":\"0\",\"x2\":\"300\",\"y2\":\"300\",\"scaleX\":\"100\",\"scaleY\":\"100\",\"opacity\":\"255\",\"blendMode\":\"Normal\",\"duration\":\"60\",\"easingType\":\"Slow start\"}","{\"name\":\"Actor1_6\",\"origin\":\"UpperLeft\",\"x1\":\"0\",\"y1\":\"0\",\"x2\":\"300\",\"y2\":\"300\",\"scaleX\":\"100\",\"scaleY\":\"100\",\"opacity\":\"255\",\"blendMode\":\"Normal\",\"duration\":\"60\",\"easingType\":\"Slow start\"}"]

*/

/*~struct~stlist:

@param name
@text Picture Name
@type file
@dir img/pictures

@param origin
@text Origin
@type select
@option UpperLeft
@option Center
@desc Choose the origin of the picture.
@default UpperLeft

@param x1
@text Initial X
@type text
@desc The initial X position. You can use formula and \v[id] too.
@default 0

@param y1
@text Initial Y
@type text
@desc The initial Y position. You can use formula and \v[id] too.
@default 0

@param x2
@text Final X
@type text
@desc The final X position. You can use formula and \v[id] too.
@default 0

@param y2
@text Final Y
@type text
@desc The final Y position. You can use formula and \v[id] too.
@default 0

@param scaleX
@text Scale X
@type number
@min -1000
@max 1000
@desc the scale X
@default 100

@param scaleY
@text Scale Y
@type number
@min -1000
@max 1000
@desc The scale Y
@default 100

@param opacity
@text Opacity
@type number
@desc The opacity of the picture.
@default 255

@param blendMode
@text Blend mode
@type select
@desc Choose blend Type
@option Normal
@option Additive
@option Multiply
@option Screen
@default Normal

@param duration
@text Duration
@type number
@desc The duration.
@default 60

@param easingType
@text Easing
@type select
@option Constant speed
@option Slow start
@option Slow end
@option Slow start and end
@desc Select the easy type.
@default Constant speed

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_ChoicePictures = true

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

Eli.Easing = {

    linear(t){
        return t;
    },

    quadIn(t){
        return t**2;
    },

    quadOut(t){
        return t * (2 - t);
    },

    quadInOut(t){
        if((t *= 2) < 1){
            return 0.5 * t**2;
        }
        return -0.5 * (--t * (t - 2) - 1);
    },

    cubicIn(t){
        return t**3;
    },

    cubicOut(t){
        return --t * t * t + 1;
    },

    cubicInOut(t){
        if((t *= 2) < 1){
            return 0.5 * t**3;
        }
    
        return 0.5 * ((t -= 2) * t * t + 2);
    },

    quartIn(t){
        return t**4;
    },

    quartOut(t){
        return 1 - --t * t**3;
    },

    quartInOut(t){
        if((t *= 2) < 1){
            return 0.5 * t**4;
        }
    
        return -0.5 * ( (t -= 2) * t**3 - 2);
    },

    quintIn(t){
        return t**5;
    },

    quintOut(t){
        return --t * t**4 + 1;
    },

    quintInOut(t){
        if((t *= 2) < 1){
            return 0.5 * t**5;
        }
    
        return 0.5 * ( (t -= 2) * t**4 + 2);
    },

    sineIn(t){
        const pi = Math.PI;
        return Math.cos(t * pi / 2 - pi) + 1.0;
    },

    sineOut(t){
        return Math.sin((t * Math.PI) / 2);
    },

    sineInOut(t){
        return 0.5 * (1 - Math.cos(Math.PI * t));
    },

    expoIn(t){
        return t === 0 ? 0 : Math.pow(1024, t - 1);
    },

    expoOut(t){
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    },

    expoInOut(t){
        if (t === 0){
            return 0;
        }

        if (t === 1){
            return 1;
        }

        if ((t *= 2) < 1) {
            const expo = t - 1;
            return 0.5 * Math.pow(1024, t - 1);
        }

        return 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
    },

    circIn(t){
        return 1 - Math.sqrt(1 - t * t);
    },

    circOut(t){
        return Math.sqrt(1 - --t * t);
    },

    circInOut(t){
        if ((t *= 2) < 1){
            return -0.5 * (Math.sqrt(1 - t * t) - 1);
        }

        return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },

    elasticIn(t){
        if (t === 0){
            return 0;
        }

        if (t === 1){
            return 1;
        }

        return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
    },

    elasticOut(t){
        if (t === 0){
            return 0;
        }

        if (t === 1){
            return 1;
        }

        return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
    },

    elasticInOut(t){
        if (t === 0){
            return 0;
        }

        if (t === 1){
            return 1;
        }

        t *= 2;
        if (t < 1){
            return -0.5 * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
        }

        return 0.5 * Math.pow(2, -10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI) + 1;
    },

    backIn(t){
        const s = 1.70158;
        return t * t * ((s + 1) * t - s);
    },

    backOut(t){
        const s = 1.70158;
        return --t * t * ((s + 1) * t + s) + 1;
    },

    backInOut(t){
        const s = 1.70158 * 1.525;

        if((t *= 2) < 1){
            return 0.5 * (t * t * ((s + 1) * t - s));
        }

        return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
    },

    bounceIn(t){
        return 1 - this.bounceOut(1 - t);
    },

    bounceOut(t){
        if (t < 1 / 2.75) {
            return 7.5625 * t * t;

        } else if (t < 2 / 2.75) {
            return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;

        } else if (t < 2.5 / 2.75) {
            return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;

        } else {
            return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        }
    },

    bounceInOut(t){
        if(t < 0.5){
            return this.bounceIn(t * 2) * 0.5;
        }

        return this.bounceOut(t * 2 - 1) * 0.5 + 0.5;
    },

    execute(type, t){
        return this[type](t);
    },
}

Eli.Book.getEasingType = function(type, move){
    const easingType =  {
        Linear: "linear",
        Quad: "quad", Cubic: "cubic", Quart: "quart", Quint: "quint", 
        Sine: "sine", Expo: "expo", Circ: "circ", 
        Elastic: "elastic", Back: "back", Bounce: "bounce",
    }

    if(easingType[type] === "linear"){
        return easingType[type]
    }else{
        return easingType[type]+move
    }
}

Eli.Book.getDefaultEasingType = function(type){
        const easingType = ["Constant speed", "Slow start", "Slow end", "Slow start and end"];
        return easingType.indexOf(type)
}
    
Eli.Book.presetPos = function(width, height, custom1, custom2, preset, ui){
    const baseWidth = ui ? Graphics.boxWidth : Graphics.width;
    const baseHeight = ui ? Graphics.boxHeight : Graphics.height;
    const centerX = (baseWidth - (baseWidth / 2)) - (width / 2);
    const endX = baseWidth - width;
    const centerY = (baseHeight - (baseHeight / 2)) - (height / 2);
    const endY = baseHeight - height;
    const defPos = [
        {x:custom1, y:custom2},     // 0
        {x:0,       y:0},           // 1 Top left
        {x:centerX, y:0},           // 2 Top center
        {x:endX,    y:0},           // 3 Top Right
        {x:0,       y:centerY},     // 4 Center left
        {x:centerX, y:centerY},     // 5 Center center
        {x:endX,    y:centerY},     // 6 Center right
        {x:0,       y:endY},        // 7 Bottom left
        {x:centerX, y:endY},        // 8 Bottom center
        {x:endX,    y:endY}         // 9 Bottom right
    ]
    const pX = defPos[preset].x;
    const pY = defPos[preset].y;

    return {x:pX, y:pY};
}

Eli.Book.getPicOrigin = function(type){
    const origin =  {
        UpperLeft: 0,
        Center: 1,
    };

    return origin[type];
}

Eli.Book.getBlendMode = function(mode){
    const blend =  {
        Normal: 0,
        Additive: 1,
        Multiply: 2,
        Screen: 3
    };

    return blend[mode];
}

const EliBook = Eli.Book
const EliEasing = Eli.Easing

Eli.ChoicePictures = {

    parameters: {},
    alias: {},
    id: 0,
    list: new Array(30),
    oldIndex: null,
    enable: false,

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.list.fill(this.defaultPicture())
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){
        const commands = ["enablePlugin", "setupPictures"]
        Eli.PluginManager.registerCommands(this, commands)
    },

    defaultPicture(){
        return {
            name: '',
            origin: 0,
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            scaleX: 100,
            scaleY: 100,
            opacity: 255,
            blendMode: 0,
            duration: 0,
            easingType: 0,
        }
    },

    isEnable(){
        return this.enable
    },

    getList(){
        return this.list
    },

    getId(){
        return this.id
    },

    setList(newList){
        this.list = newList
    },

    setId(id){
        this.id = id
    },

    enablePicture(boolean){
        this.enable = boolean
    },

    preload(){
        if(this.isEnable()) {

            for(const picture of this.getList()){
                ImageManager.loadPicture(picture.name)
            }
        }
    },

    showIfCan(index){
        if(this.oldIndex !== index){
            this.show(index)
            this.oldIndex = index
        }
    },

    getPicName(name){
        if(name.toUpperCase().startsWith("EVAL-")){
            name = name.substring(5)
            name = eval(name)
        }
        return name
    },

    show(index){
        if($gameMessage.isChoice() && this.isEnable()){
            const id = this.getId()
            const picture = this.getList()[index]
            const {origin, x1, y1, x2, y2, scaleX, scaleY, opacity, 
                    blendMode, duration, easingType} = picture;
            let name = this.getPicName(picture.name)

            $gameScreen.showPicture(id, name, origin, x1, y1, scaleX, scaleY, 
                    opacity, blendMode);
            $gameScreen.movePicture(id, origin, x2, y2, scaleX, scaleY, opacity, 
                    blendMode, duration, easingType)
        }
    },

    erase(){
        if(this.isEnable()){

            if(Imported.Eli_EasingPicture){
                Eli.EasingPicture.resetEasing(this.id)
            }
            $gameScreen.erasePicture(this.getId())
            this.enablePicture(false)
        }
    },

/* ----------------------------- PLUGIN COMMANDS ---------------------------- */

    enablePlugin(args){
        this.enablePicture(args.enable === 'true')
    },

    setupPictures(args){
        args = Eli.PluginManager.convertParameters(args)
        const {id, pictures } = args
        this.setId(id)

        for(const picture of pictures){
            picture.origin = EliBook.getPicOrigin(picture.origin)
            picture.blendMode = EliBook.getBlendMode(picture.blendMode)
            picture.x1 = Eli.Utils.processEscapeVarOrFormula(picture.x1)
            picture.y1 = Eli.Utils.processEscapeVarOrFormula(picture.y1)
            picture.x2 = Eli.Utils.processEscapeVarOrFormula(picture.x2)
            picture.y2 = Eli.Utils.processEscapeVarOrFormula(picture.y2)
            picture.easingType  = EliBook.getDefaultEasingType(picture.easingType)
        }

        this.setList(pictures)
        this.enablePicture(true)

    },

}

const Plugin = Eli.ChoicePictures
const Alias = Eli.ChoicePictures.alias

Plugin.initialize()

/* ========================================================================== */
/*                                   OBJECTS                                  */
/* ========================================================================== */

if(Imported.Eli_EasingPicture){

Game_Picture.prototype.stopEasing = function(){
    this.initEasing()
    this._duration = 0
    this._currentDuration = 0
    this._easingType = 0
    if(Plugin.isEnable() && Plugin.id === this._id){
        
    }else{
        Eli.EasingPicture.resetEasing(this._id)
    }
};

}

/* ========================================================================== */
/*                             WINDOW CHOICE LIST                             */
/* ========================================================================== */

Alias.Window_ChoiceList_start = Window_ChoiceList.prototype.start
Window_ChoiceList.prototype.start = function() {
    Alias.Window_ChoiceList_start.call(this)
    Plugin.oldIndex = 0
    Plugin.preload()
    Plugin.show(this._index)
}

Alias.Window_ChoiceList_select = Window_ChoiceList.prototype.select
Window_ChoiceList.prototype.select = function(index) {
    Alias.Window_ChoiceList_select.call(this, index)
    Plugin.showIfCan(index)
}

Alias.Window_ChoiceList_close = Window_ChoiceList.prototype.close
Window_ChoiceList.prototype.close = function() {
    Alias.Window_ChoiceList_close.call(this)
    Plugin.erase()
}

}