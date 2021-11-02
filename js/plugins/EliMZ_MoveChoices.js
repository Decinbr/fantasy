//============================================================================
// EliMZ_MoveChoices.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc v2.1.0 - Change the position of the Choice Window.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-move-choices-rpg-maker-mv

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
https://www.patreon.com/hakuenstudio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Introduction
============================================================================

By default, the choice window can only be in three positions:
					Left | Center | Right.
But what if you wanted to give her a more dynamic position?
With this plugin, you can choose the position you want for the choice 
window.

============================================================================
Features
============================================================================

The plugin offers the following:
● Set the choice position on the screen using custom values or using 9 
different predefined positions.
● You can set a delay to the choice to prevent the players from 
accidentally choose a choice when pressing the ok button too quickly.
● Move the choice window using easing animation, like pictures!

============================================================================
How to use
============================================================================

● Use the plugin commands before the show choice command.

● Offset X and Y → Here you can find options to leave the window's initial 
position off the screen. The plugin will automatically calculate the width 
of the window and place it off the screen. This is useful to give the 
player the impression of the window coming from outside the screen. You 
can also choose not to use the offset.

● Preset Origin and Target position → Here you can configure predefined 
positions for windows:

TopLeft, TopCenter, TopRight
CenterLeft, CenterMiddle, CenterRight
BottomLeft, BottomMiddle, BottomRight

● Custom → Can use any value, including variables(\v[id])

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
Version 2.1.0 - 08/21/2021
- Added temporary patch to work with Eli Book 4.0.0.
Version 2.0.0 - 12/18/2020
- Adapted to work with Eli Book 3.0.0.
Version 1.1.1 - 12/05/2020
- Applied some fixes to the choice positions when the system ui width & 
height is less than the system screen height & width.
Version 1.1.0 - 11/25/2020
- Added ease movement!
- Remove the enable plugin command, now it is automaticaly handled.
- Add a new plugin command to show the choice in a fixed position.
Version 1.0.0 - 10/19/2020
- Plugin release! 

@command setupMovement
@text Show/Move Choice
@desc Move the choice window to a custom position

    @arg duration
    @text Movement speed
    @type number
    @desc Set here how fast the window will move. Lower numbers more faster.
    @default 30

    @arg delay
    @text Delay in frames
    @type number
    @desc Set the delay value to be able to confirm a choice. Leave it to 0 if you don't want to use.
    @default 15

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

    @arg originPreset
    @text Preset Origin position
    @type select
    @desc Choose a value for the initial positions X and Y.
    @option Custom Position @option Top Left @option Top Center @option Top Right @option Center Left @option Center Middle @option Center Right @option Bottom Left @option Bottom Center @option Bottom Right
    @default Center Left

    @arg originX
    @text Custom Origin X
    @type text
    @desc Only works if you choose custom above. 
    You can use numbers, formulas or variables(\v[id])
    @default 0
    @parent originPreset

    @arg originY
    @text Custom Origin Y
    @type text
    @desc Only works if you choose custom above.
    You can use numbers, formulas or variables(\v[id])
    @default 0
    @parent originPreset

    @arg offsetX
    @text Offset X
    @type select
    @desc An additional value for the X coordinate. It will push the window out of screen.
    @option Out of screen(left)
    @value left
    @option Out of screen(right)
    @value right
    @option none
    @value none
    @default none
    @parent originPreset

    @arg offsetY
    @text Offset Y
    @type select
    @desc An additional value for the Y coordinate. It will push the window out of screen.
    @option Out of screen(up)
    @value up
    @option Out of screen(down)
    @value down
    @option none
    @value none
    @default none
    @parent originPreset

    @arg targetPreset
    @text Preset Target position
    @type select
    @desc Choose a value for the final positions X and Y.
    @option Custom Position @option Top Left @option Top Center @option Top Right @option Center Left @option Center Middle @option Center Right @option Bottom Left @option Bottom Center @option Bottom Right
    @default Center Left

    @arg targetX
    @text Custom Target X
    @type text
    @desc Only works if you choose custom above. 
    You can use numbers, formulas or variables(\v[id])
    @default 0
    @parent targetPreset

    @arg targetY
    @text Custom Target Y
    @type text
    @desc Only works if you choose custom above.
    You can use numbers, formulas or variables(\v[id])
    @default 0
    @parent targetPreset

@command setupPosition
@text Fixed position
@desc Show the choice without movement in a fixed position.

    @arg targetPreset
    @text Preset Target position
    @type select
    @desc Choose a value for the final positions X and Y.
    @option Custom Position @option Top Left @option Top Center @option Top Right @option Center Left @option Center Middle @option Center Right @option Bottom Left @option Bottom Center @option Bottom Right
    @default Center Left

    @arg targetX
    @text Custom Target X
    @type text
    @desc Only works if you choose custom above. 
    You can use numbers, formulas or variables(\v[id])
    @default 0

    @arg targetY
    @text Custom Target Y
    @type text
    @desc Only works if you choose custom above.
    You can use numbers, formulas or variables(\v[id])
    @default 0

    @arg delay
    @text Delay in frames
    @type number
    @desc Set the delay value to be able to confirm a choice. Leave it to 0 if you don't want to use.
    @default 15


*/

"use strict"; 

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_MoveChoices = true

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

/* ----------------------------- TEMP FUNCTIONS ----------------------------- */

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

const EliBook = Eli.Book
const EliEasing = Eli.Easing

Eli.MoveChoices = {

	parameters: {},
	alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.resetSettings()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){
        const commands = ['setupPosition', 'setupMovement']
        Eli.PluginManager.registerCommands(this, commands)
    },

	resetSettings(){
		this.enable = false;
		this.canEase = false;
		this.settings = {
			easeType: '',
			duration: 30,
			originPreset: 4,
			originX: '0',
			originY: '0',
			offsetX: 'none',
			offsetY: 'none',
			targetPreset: 4,
			targetX: '0',
			targetY: '0',
			delay: 15
		};
	},

	isEnable(){
		return this.enable;
	},

	canMove(){
		return this.canEase;
	},

	getSettings(){
		return this.settings;
	},

	enablePlugin(value){
		this.enable = value;
	},

	setupMovement(args){
		const presetArray = ['Custom Position', 
		'Top Left', 'Top Center', 'Top Right', 
		'Center Left', 'Center Middle', 'Center Right', 
		'Bottom Left', 'Bottom Center', 'Bottom Right'];
		const easeType = EliBook.getEasingType(args.easeType, args.easeMove);

		this.settings = {
			easeType: easeType,
			duration: +args.duration,
			originPreset: presetArray.indexOf(args.originPreset),
			originX: +Eli.Utils.processEscapeVarOrFormula(args.originX),
			originY: +Eli.Utils.processEscapeVarOrFormula(args.originY),
			offsetX: args.offsetX,
			offsetY: args.offsetY,
			targetPreset: presetArray.indexOf(args.targetPreset),
			targetX: +Eli.Utils.processEscapeVarOrFormula(args.targetX),
			targetY: +Eli.Utils.processEscapeVarOrFormula(args.targetY),
			delay: +args.delay
		}
		this.enable = true;
		this.canEase = true;
	},

	setupPosition(args){
		const presetArray = ['Custom Position', 
		'Top Left', 'Top Center', 'Top Right', 
		'Center Left', 'Center Middle', 'Center Right', 
		'Bottom Left', 'Bottom Center', 'Bottom Right'];
		const settings = this.settings;

		this.canEase = false;
		settings.targetPreset = presetArray.indexOf(args.targetPreset),
		settings.targetX = +Eli.Utils.processEscapeVarOrFormula(args.targetX),
		settings.targetY = +Eli.Utils.processEscapeVarOrFormula(args.targetY),
		settings.delay = +args.delay
		this.enable = true;
	},

};

const Plugin = Eli.MoveChoices;
const Alias = Eli.MoveChoices.alias;

Plugin.initialize();

/* ========================================================================== */
/*                                WINDOW CHOICE                               */
/* ========================================================================== */

Alias.Window_ChoiceList_initialize = Window_ChoiceList.prototype.initialize;
Window_ChoiceList.prototype.initialize = function(messageWindow) {
	Alias.Window_ChoiceList_initialize.call(this, messageWindow);
	this.initMoveObjs();
};

Window_ChoiceList.prototype.initMoveObjs = function(){
	this._easingType = '';
	this._canEase = false;
	this._currentDuration = 0;
	this._duration = 0;
	this._originX = 0;
	this._originY = 0;
	this._targetX = 0;
	this._targetY = 0;
	this._limitX = 0;
	this._limitY = 0;
	this._delay = 0;
};

Alias.Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
Window_ChoiceList.prototype.updatePlacement = function() {
	Alias.Window_ChoiceList_updatePlacement.call(this);
	if(Plugin.isEnable()){
		this.setupMovement();
		this.prepareForMovement();
	}
};

Window_ChoiceList.prototype.setupMovement = function(){
	this.setLimits();
	this.setOriginAndDestination();
	this.setDelay();
};

Window_ChoiceList.prototype.setLimits = function(){
	this._limitX = Graphics.width - this.width;
	this._limitY = Graphics.height - this.height;
};

Window_ChoiceList.prototype.setOriginAndDestination = function(){
	const {originPreset, originX, originY, targetPreset, targetX, targetY} = Plugin.getSettings();
	const origin = this.setPresetPositions(originPreset, originX, originY, this.setOffsetX(), this.setOffsetY());
	const target = this.setPresetPositions(targetPreset, targetX, targetY);
	const difW = (Graphics.width - Graphics.boxWidth) / 2;
	const difH = (Graphics.height - Graphics.boxHeight) / 2;

	this._originX = origin.x - difW;
	this._originY = origin.y - difH;
	this._targetX = target.x - difW;
	this._targetY = target.y - difH;

};

Window_ChoiceList.prototype.setPresetPositions = function(presetParam, x, y, offsetX = 0, offsetY = 0){
	const w = this.width;
	const h = this.height;
	const customX = Math.min(x, this._limitX);
	const customY = Math.min(y, this._limitY);
	const preset = EliBook.presetPos(w, h, customX, customY, presetParam, false);
	const result = {
		x: preset.x + offsetX,
		y: preset.y + offsetY
	}
	
	return result;
}

Window_ChoiceList.prototype.setOffsetX = function(){
	const offsetX = Plugin.getSettings().offsetX;
	const width = this.width;
	const dif = (Graphics.width - Graphics.boxWidth) / 2;
	const options = {
		left: - (dif + width),
		right: dif + width,
		none: 0
	};

	return options[offsetX] || 0;
};

Window_ChoiceList.prototype.setOffsetY = function(){
	const offsetY = Plugin.getSettings().offsetY;
	const height = this.height;
	const dif = (Graphics.height - Graphics.boxHeight) / 2;
	const options = {
		up: - (dif + height),
		down: dif + height,
		none: 0
	};

	return options[offsetY] || 0;
};

Window_ChoiceList.prototype.prepareForMovement = function(){
	if(Plugin.canMove()){
		this._easingType = Plugin.getSettings().easeType;
		this._duration = Plugin.getSettings().duration;
		this._currentDuration = 0;
		this._canEase = true;
		
	}else{
		this.x = this._targetX;
		this.y = this._targetY;
	}
};

Alias.Window_ChoiceList_update = Window_ChoiceList.prototype.update;
Window_ChoiceList.prototype.update = function(){
	Alias.Window_ChoiceList_update.call(this);
	if(this._canEase){
		this.updateEasing();
	}
};

Window_ChoiceList.prototype.updateEasing = function(){
	this._currentDuration++;
	
    let elapsedTime = this._currentDuration / this._duration;
    elapsedTime = EliEasing.execute(this._easingType, elapsedTime);

    this.x = this._originX + elapsedTime * (this._targetX - this._originX);
	this.y = this._originY + elapsedTime * (this._targetY - this._originY);

    if(this._currentDuration >= this._duration){
        this._canEase = false;
    }
};

// Overwrite
Window_ChoiceList.prototype.isOkEnabled = function() { 
	if(!this._canEase){
		this._delay--;
		if(this._delay <= 0) return true;
	}else{
		return false;
	}
};

Window_ChoiceList.prototype.setDelay = function(){
	this._delay = Plugin.getSettings().delay;
};

Alias.Window_ChoiceList_close = Window_ChoiceList.prototype.close;
Window_ChoiceList.prototype.close = function() {
	Alias.Window_ChoiceList_close.call(this);
	Plugin.enablePlugin(false);
};

}