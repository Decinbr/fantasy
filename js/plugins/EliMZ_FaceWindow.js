//==========================================================================
// EliMZ_FaceWindow.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc v3.1.0 - Adds a face window for the message box!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-face-window-for-rpg-maker-mz

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
https://www.patreon.com/hakuenstudio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Introduction
============================================================================

Showing the faces of the characters in the message window is cool!
But sometimes it can get in the way of calculating the size of the text 
we write.
Or perhaps, you may want to show the character's face elsewhere on your 
game screen.
This plugin will help you do that!

============================================================================
Features
============================================================================

● Show the character's face in a window apart from the message box.
● Use any face size.
● Show the window using "easing animations"!
● Choose the tone and type of background!
● Animated faces!
● Different animations for when the message box is writing and when it is 
not (Idle and Talk animations).

============================================================================
How to use
============================================================================

Configure the plugin parameters.
It is important to remember that the size of your window will be the same 
as defined in the parameters + twice the Window padding!

You can configure the position of the face window for each position of the 
message window (top, middle, bottom).

Optionally you can also define a movement animation for when the window 
appears.
You will be able to define where the window will come from through the 
initial positions.
And where it will end with the target/final positions.

If you do not want to use this animation, leave the parameter 
"Duration(Frames)" = 0.

Face Settings

Image - This is the image file you will be targeting.

Start Index - The position of the face at which the animation will start.

Middle Index - When the message box is no longer writing, the face 
animation will only repeat up to this number. Useful for creating Idle 
face animations. 
If you don't want to use it, leave it with the same value as the End Index.

End Index - When the message box is writing, the face animation will 
repeat up to this number. It must be equal to or greater than the 
Middle Index.

Frame Speed ​​- How fast the face will change index.

Example:

Start index = 0
Middle Index = 1
End Index = 3

If the message box is writing, the face will repeat the index in this order:
0, 1, 0, 1, 0, 1...etc.

Otherwise, it will repeat the index in this order:
0, 1, 2, 3, 0, 1, 2, 3, etc...

If you want to change the window skin, use Eli Window Skin for it.
The name of the window is: Window_FaceMessage

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
Version 3.1.0 - 10/12/2021
- Add a plugin parameter that let you disable the face animation inside 
the external face window.
Version 3.0.0 - 09/22/2021
- Add a plugin parameter that lets you assign a switch to enable/disable 
the external face window.
- Improved the plugin parameters to set the window position.
- Improved the plugin parameter and the code that handle the window 
animation for showing and hiding.
- Improved the way you can set animations for your faces.
- Fixed a bug that sometimes was removing the face window from the screen 
when a choice is set right after a message command.
- Need Eli Book 4.1.0 now.
Version 2.2.1 - 08/30/2021
- Code clean up.
Version 2.2.0 - 08/21/2021
- Added temporary patch to work with Eli Book 4.0.0.
Version 2.1.1 - 07/02/2021
- Fixed compatibility with Eli Message Actions that was giving a delay when 
changing face message images
Version 2.1.0 - 06/29/2021
- Add an animated face feature!
Version 2.0.0 - 12/18/2020
- Adapted to work with Eli Book 3.0.0.
Version 1.0.1 - 12/14/2020
- Fixed a problem that was preventing from update the window tone.
Version 1.0.0 - 12/13/2020
- Plugin release!

@param switchId
@text Switch: Disable Face Window
@type switch
@desc If this switch is on, the external face window will not show.
@default 0

@param switchIdAnimation
@text Switch: Disable Face Animation
@type switch
@desc If this switch is on, the face animation inside the external face window will be disabled.
@default 0

@param faceWidth
@text Face Width
@type number
@desc The width of the face
@default 144
@parent separator2

@param separator1
@text Face Window

@param windowWidth
@text Width
@type number
@desc The width of the window
@default 144
@parent separator1

@param windowHeight
@text Height
@type number
@desc The height of the window
@default 144
@parent separator1

@param padding
@text Padding
@type number
@desc The empty space size between the edges of the face image and the window border.
@default 12
@parent separator1

@param backgroundType
@text Background type
@type boolean
@desc Set to true if you to always get the message background type.
@default true
@parent separator1

@param windowTone
@text Tone
@type text
@desc Choose the default tone for the window. Can use rgb, hex or html colors.
@default 0,0,0
@parent separator1

@param hideSkin
@text Hide Skin
@type boolean
@desc Set to true if you want to hide the window skin. Only works with Background type to false.
@default false
@parent separator1

@param topPos
@text Top Position
@type struct<positionSt>
@desc The position of the face window when the message is on top.
@default 
@parent separator1

@param centerPos
@text Center Position
@type struct<positionSt>
@desc The position of the face window when the message is on center.
@default 
@parent separator1

@param bottomPos
@text Bottom Position
@type struct<positionSt>
@desc The position of the face window when the message is on bottom.
@default 
@parent separator1

@param separator2
@text Face Image

@param faceWidth
@text Face Width
@type number
@desc The width of the face
@default 144
@parent separator2

@param faceHeight
@text Face Height
@type number
@desc The height of the face
@default 144
@parent separator2

@param faceSettings
@text Animate Face Settings
@type struct<faceSettingsSt>[]
@desc Set all your animated face settings.
@default []
@parent separator2

*/

/* --------------------------- FACE IMAGE SETTINGS -------------------------- */
{

/*~struct~faceSettingsSt:

@param image
@text Face image
@type file
@dir img/faces
@desc The first index of this animated face.
@default

@param startIndex
@text Start Index
@type number
@desc The first index of this animated face.
@default 0

@param middleIndex
@text Idle Index
@type number
@desc The last index of the animated face when message is not writting.
@default 0

@param endIndex
@text Talking Index
@type number
@desc The last index of the animated face when message is writting. Must be equal or higher than Idle.
@default 0

@param frameSpeed
@text Frame Speed
@type number
@desc How fast, in frames, the face will change from start index to endIndex.
@default 30

*/

}

/* -------------------------------- POSITION -------------------------------- */
{
/*~struct~positionSt:

@param initial
@text Initial Positions

@param frames
@text Duration (Frames)
@type text
@desc Need to be above 0 for the easing movement to work.
@default 0
@parent initial
    
@param easing
@text Easing
@type select
@option linear @option --- In --- @option easeInQuad @option easeInCubic @option easeInQuart @option easeInQuint @option easeInSine @option easeInExpo @option easeInCirc @option easeInBack @option easeInBounce @option --- Out --- @option easeOutQuad @option easeOutCubic @option easeOutQuart @option easeOutQuint @option easeOutSine @option easeOutExpo @option easeOutCirc @option easeOutBack @option easeOutBounce @option --- In / Out --- @option easeInOutQuad @option easeInOutCubic @option easeInOutQuart @option easeInOutQuint @option easeInOutSine @option easeInOutExpo @option easeInOutCirc @option easeInOutBack @option easeInOutBounce @option --- Out / In --- @option easeOutInQuad @option easeOutInCubic @option easeOutInQuart @option easeOutInQuint @option easeOutInSine @option easeOutInCirc @option easeOutInExpo @option easeOutInBack @option easeOutInBounce
@desc Choose the easing type. The Duration need to be above 0.
@default linear
@parent initial

@param outsideX
@text Off Screen X
@type select
@option none
@option left
@option right
@desc The horizontal direction the window will come from.
@default left
@parent initial
    
@param outsideY
@text Off Screen Y
@type select
@option none
@option top
@option bottom
@desc The vertical direction the window will come from.
@default none
@parent initial

@param target
@text Target/Final Positions

@param alignX
@text Align X
@type select
@option none
@option left
@option center
@option right
@desc Select none to only use offset value.
@default right
@parent target
    
@param offsetX
@text Offset X
@type text
@desc The Offset X position.
@default 0
@parent target

@param alignY
@text Align Y
@type select
@option none
@option top
@option center
@option bottom
@desc Select none to only use offset value.
@default center
@parent target

@param offsetY
@text Offset Y
@type text
@desc The offset Y position.
@default 0
@parent target

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_FaceWindow = true

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
    const requiredVersion = ['4','1','0']
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

/* --------------------------- WINDOW FACE MESSAGE --------------------------- */
class Window_FaceMessage extends Window_Base{

    constructor(rect){
        super(rect)
    }

    initialize(rect){
        super.initialize(rect)
        this.initMembers()
        this.initWindowTone()
        this.createFace()
        if(Plugin.param().hideSkin){
            this.hideWindowSkin()
        }
    }

    initWindowTone(){
        const tone = Plugin.param().windowTone
        this.setTone(...tone)
    }

    initMembers(){
        this.hideAnimation = anime({autoplay: false})
        this.faceIndex = -1
        this.faceName = ''
        this.index = 0
        this.showAnimation = anime({autoplay: false})
        this.padding = Plugin.param().padding
        this.posType = 0
        this.x = -1000
        this.y = -1000
    }

    createFace(){
        this.faceSprite = new Sprite_FaceMessage()
        this.addChild(this.faceSprite)
        Plugin.sprite = this.faceSprite
    }

    refreshBackground() {
        this.setBackgroundType($gameMessage.background())
    }

    hideWindowSkin(){
        this.opacity = 0
    }

    start() {
        if(Plugin.param().backgroundType){
            this.refreshBackground()
        }

        if(this.messageSettingsAreChanged()){

            if($gameMessage.faceName()){
                this.refreshMoveAnimations()
                this.refreshFaceSprite($gameMessage.faceName(), $gameMessage.faceIndex())
                this.showAnimation.play()
            }else{
                this.hideAnimation.play()
            }
            
        }

        this.refreshMessageSettings()
    }

    messageSettingsAreChanged(){
        return  this.faceName !== $gameMessage.faceName() || 
                this.faceIndex !== $gameMessage.faceIndex() ||
                this.posType !== $gameMessage.positionType()
    }

    refreshMoveAnimations(){
        const [initialX, initialY, targetX, targetY, frames, easing] = this.getMoveAnimationData()
        this.showAnimation = anime(this.createShowAnimation(initialX, initialY, targetX, targetY, frames, easing))
    }

    getMoveAnimationData(){
        const posType = $gameMessage.positionType()
        const {frames, easing} = Plugin.getPositionData(posType)
        const {initialX, initialY, targetX, targetY} = Plugin.cachedPositions[posType]

        return [initialX, initialY, targetX, targetY, frames, easing]
    }

    createShowAnimation(initialX, initialY, targetX, targetY, frames, easing){
        return {
            targets: this,
            x: [initialX, targetX],
            y: [initialY, targetY],
            round: 1,
            easing: easing,
            duration: frames,
            autoplay: false,
            complete: () => {
                this.refreshHideAnimation(initialX, initialY, easing, frames)
            }
        }
    }

    refreshHideAnimation(initialX, initialY, easing, frames){
        this.hideAnimation = anime(this.createHideAnimation(initialX, initialY, easing, frames))
    }

    createHideAnimation(initialX, initialY, easing, frames){
        return {
            targets: this,
            x: initialX,
            y: initialY,
            round: 1,
            easing: easing,
            duration: frames,
            autoplay: false,
            complete: () => {
                this.refreshMessageSettings()
                this.hideAnimation = anime({autoplay: false})
            }
        }
    }

    refreshMessageSettings(){
        this.faceName = $gameMessage.faceName()
        this.faceIndex = $gameMessage.faceIndex()
        this.posType = $gameMessage.positionType()
    }

    refreshFaceSprite(faceName, faceIndex){
        this.faceSprite.refreshFaceBitmap(faceName, faceIndex)
    }

    update(){
        super.update()
        this.updateVisibility()
    }

    updateVisibility(){
        this.visible = !Plugin.isFaceWindowDisabled()
    }

    updateTone() {
        const tone = Plugin.param().windowTone
        this.setTone(...tone)
    }

}

/* ------------------------------- SPRITE FACE ------------------------------ */
class Sprite_FaceMessage extends Sprite{

    initialize(bitmap){
        super.initialize(bitmap)
        this.faceIndex = 0
        this.frameCount = 0
        this.setFrame(0, 0, Plugin.param().faceWidth, Plugin.param().faceHeight)
        this.move(Plugin.param().padding, Plugin.param().padding)
    }

    refreshFaceBitmap(faceName, faceIndex){
        this.frameCount = 0
        this.bitmap = ImageManager.loadFace(faceName)
        this.bitmap.addLoadListener(this.refreshFaceFrame.bind(this, faceIndex))

        Plugin.setFaceSettings(faceName, faceIndex)
    }

    refreshFaceFrame(faceIndex){
        const faceWidth = Plugin.param().faceWidth
        const faceHeight = Plugin.param().faceHeight
        const cols = this.bitmap.width / faceHeight
        const rows = this.bitmap.height / faceWidth
        const index = faceIndex
        const x = index % cols * faceWidth
        const y = (Math.floor(index / cols) % rows) * faceHeight
        
        this.setFrame(x, y, faceWidth, faceHeight)
    }

    refreshAnimation(limitIndex){
        if(this.hasAnimatedFace()){
            this.frameCount++

            if(this.canChangeFaceIndex()){
                this.changeFaceIndex(limitIndex)
                this.refreshFaceFrame(this.faceIndex)
                this.frameCount = 0
            }
        }
    }

    canChangeFaceIndex(){
        return this.frameCount >= Plugin.getFaceSettings().frameSpeed
    }

    changeFaceIndex(limitIndex){
        if(this.faceIndex >= limitIndex){
            this.faceIndex = Plugin.getFaceSettings().startIndex
        }else{
            this.faceIndex += 1
        }
    }

    hasAnimatedFace(){
        return $gameMessage.faceName() && !Plugin.isFaceWindowAnimationDisabled()
    }

}

/* ------------------------------ PLUGIN OBJECT ----------------------------- */

Eli.FaceWindow = {

    parameters: {
        switchId: 0,
        switchIdAnimation: 0,
        windowWidth: 0,
        windowHeight: 0,
        faceWidth: 0,
        faceHeight: 0,
        topPos:  {
            alignX: "right",
            alignY: "center",
            easing: "linear",
            frames: 0,
            offsetX: 0,
            offsetY: 0,
            outsideX: "none",
            outsideY: "none"
        },
        centerPos:  {
            alignX: "right",
            alignY: "center",
            easing: "linear",
            frames: 0,
            offsetX: 0,
            offsetY: 0,
            outsideX: "none",
            outsideY: "none"
        },
        bottomPos:  {
            alignX: "right",
            alignY: "center",
            easing: "linear",
            frames: 0,
            offsetX: 0,
            offsetY: 0,
            outsideX: "none",
            outsideY: "none"
        },
        padding: 0,
        backgroundType: false,
        windowTone: '',
        hideSkin: false,
        faceSettings: [{
            image: '',
            startIndex: 0,
            middleIndex: 0,
            endIndex: 0,
            frameSpeed: 0,
        }],
    },
    alias: {},
    cachedPositions: { 
        0: {initialX: 0, initialY: 0, targetX: 0, targetY: 0},
        1: {initialX: 0, initialY: 0, targetX: 0, targetY: 0},
        2: {initialX: 0, initialY: 0, targetX: 0, targetY: 0},
    },
    Window_FaceMessage: Window_FaceMessage,
    Sprite_FaceMessage: Sprite_FaceMessage,
    container: null,
    sprite: null,
    currentFaceSettings: {
        image: "",
        startIndex: 0,
        middleIndex: 0,
        endIndex: 0,
        frameSpeed: Infinity,
    },

    param(){
        return this.parameters
    },

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.formatParameters()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){
        const commands = []
        Eli.PluginManager.registerCommands(this, commands)
    },

    formatParameters(){
        const parameters = this.parameters

        parameters.topPos.frames = Eli.Utils.framesToMiliSeconds(parameters.topPos.frames)
        parameters.centerPos.frames = Eli.Utils.framesToMiliSeconds(parameters.centerPos.frames)
        parameters.bottomPos.frames = Eli.Utils.framesToMiliSeconds(parameters.bottomPos.frames)
        parameters.windowTone = Eli.ColorManager.getRgb(parameters.windowTone)
    },

    initPositions(){
        for(let i = 0; i < 3; i++){
            const {alignX, offsetX, alignY, offsetY, outsideX, outsideY} = this.getPositionData(i)

            const [targetX, targetY] = this.findTargetCoordinates(alignX, offsetX, alignY, offsetY)
            const [initialX, initialY] = this.findInitialCoordinates(outsideX, outsideY, targetX, targetY)
            
            this.cachedPositions[i] = {initialX, initialY, targetX, targetY}
        }  
    },

    findInitialCoordinates(outsideX, outsideY, targetX, targetY) {
        let x = targetX
        let y = targetY
    
        if(outsideX === "left"){
            x = -this.getWindowWidth()
        } else if(outsideX === "right"){
            x = Graphics.width + this.getWindowWidth()
        }
    
        if(outsideY === "top"){
            y = -this.getWindowHeight()
        } else if(outsideY === "bottom"){
            y = Graphics.height + this.getWindowHeight()
        }
        
        return [x, y]
    },

    findTargetCoordinates(alignX, offsetX, alignY, offsetY){
        return [
            Eli.Utils.calculateScreenPosition(alignX, offsetX, this.getWindowWidth(), "x"),
            Eli.Utils.calculateScreenPosition(alignY, offsetY, this.getWindowHeight(), "y")
        ]
    },

    getPositionData(posType){
        const positions = {
            0: this.param().topPos,
            1: this.param().centerPos,
            2: this.param().bottomPos,
        }
        return positions[posType]
    },

    getWindowWidth(){
        return this.parameters.windowWidth + this.parameters.padding * 2
    },

    getWindowHeight(){
        return this.parameters.windowHeight + this.parameters.padding * 2
    },

    createEmptyFaceSetting(faceName, faceIndex){
        return {
            image: faceName,
            startIndex: faceIndex,
            middleIndex: 0,
            endIndex: 0,
            frameSpeed: Infinity,
        }
    },

    getFaceSettings(){
        return this.currentFaceSettings
    },

    setFaceSettings(faceName, faceIndex){
        const getSettings =  item => item.image === faceName && item.startIndex === faceIndex
        this.currentFaceSettings =  this.param().faceSettings.find(getSettings) || 
                                    this.createEmptyFaceSetting(faceName, faceIndex)
    },

    getFaceWindow(){
        return this.container
    },

    getFaceSprite(){
        return this.sprite
    },

    isFaceWindowDisabled(){
        const id = this.param().switchId
        return $gameSwitches.value(id)
    },

    isFaceWindowAnimationDisabled(){
        const id = this.param().switchIdAnimation
        return $gameSwitches.value(id)
    },
    
}

const Plugin = Eli.FaceWindow
const Alias = Eli.FaceWindow.alias

Plugin.initialize()

/* ---------------------------- GAME INTERPRETER ---------------------------- */
{

Alias.Game_Interpreter_command101 = Game_Interpreter.prototype.command101
Game_Interpreter.prototype.command101 = function(params){
    if(!$gameMessage.isBusy()) {
        $gameMessage.setInterpreter(this)
    }

    return Alias.Game_Interpreter_command101.call(this, params)
}

Alias.Game_Interpreter_executeCommand = Game_Interpreter.prototype.executeCommand
Game_Interpreter.prototype.executeCommand = function() {
    const alias = Alias.Game_Interpreter_executeCommand.call(this)

    if(this.isMessageInterpreter() && this.canHideFaceWindow()){
       this.hideFaceWindow()
    }

    return alias
}

Game_Interpreter.prototype.isMessageInterpreter = function(){
    return this === $gameMessage.getInterpreter()
}

Game_Interpreter.prototype.canHideFaceWindow = function(){
    const currentCode = this.getCurrentCommandCode()
    const msgCodes = this.getAllowedCodesToShowFaceWindow()

    return !$gameMessage.isBusy() && !msgCodes.includes(currentCode)
}

Game_Interpreter.prototype.getCurrentCommandCode = function(){
    return this._list && this._list[this._index] ? this.currentCommand().code : 0
}

Game_Interpreter.prototype.getAllowedCodesToShowFaceWindow = function(){
    return [101, 401]
}

Game_Interpreter.prototype.hideFaceWindow = function(){
    Plugin.getFaceWindow().hideAnimation.play()
}

}

/* ------------------------------ GAME MESSAGE ------------------------------ */
{

Alias.Game_Message_initialize = Game_Message.prototype.initialize
Game_Message.prototype.initialize = function() {
    Alias.Game_Message_initialize.call(this)
    this.interpreter = null
}

Game_Message.prototype.setInterpreter = function(interpreter){
    this.interpreter = interpreter
}

Game_Message.prototype.getInterpreter = function(){
    return this.interpreter
}

}

/* ------------------------------- SCENE BOOT ------------------------------- */
{

Alias.Scene_Boot_start = Scene_Boot.prototype.start
Scene_Boot.prototype.start = function() {
    Alias.Scene_Boot_start.call(this)
    Plugin.initPositions()
}

}

/* ------------------------------ SCENE MESSAGE ----------------------------- */
{

Alias.Scene_Message_createAllWindows = Scene_Message.prototype.createAllWindows
Scene_Message.prototype.createAllWindows = function() {
    Alias.Scene_Message_createAllWindows.call(this)
    this.createFaceWindow()
}

Scene_Message.prototype.createFaceWindow = function(){
    const rect = this.faceWindowRect()
    this.faceMessageWindow = new Window_FaceMessage(rect)
    this.addChild(this.faceMessageWindow)
    Plugin.container = this.faceMessageWindow
}

Scene_Message.prototype.faceWindowRect = function(){
    const ww = Plugin.getWindowWidth()
    const wh = Plugin.getWindowHeight()
    const wx = 0
    const wy = 0
    return new Rectangle(wx, wy, ww, wh)
}

}

/* ----------------------------- WINDOW MESSAGE ----------------------------- */
{

Alias.Window_Message_startMessage = Window_Message.prototype.startMessage
Window_Message.prototype.startMessage = function() {
    Alias.Window_Message_startMessage.call(this)
    this.startFaceWindow()
}

Alias.Window_Message_newLineX = Window_Message.prototype.newLineX
Window_Message.prototype.newLineX = function(textState){
    const alias = Alias.Window_Message_newLineX.call(this, textState)

    if(this.canRemoveMarginForFaceWindow()){
        const margin = this.getMarginForFaceWindow()

        return alias - margin
    }else{
        return alias
    }
}

Alias.Window_Message_loadMessageFace = Window_Message.prototype.loadMessageFace
Window_Message.prototype.loadMessageFace = function(){
    Alias.Window_Message_loadMessageFace.call(this)
    if(!Plugin.isFaceWindowDisabled()){
        this._faceBitmap = null
    }
}

Alias.Window_Message_updateInput = Window_Message.prototype.updateInput
Window_Message.prototype.updateInput = function() {
    const alias = Alias.Window_Message_updateInput.call(this)
    if(alias){
        this.updateIdleFaceWindow()
    }

    return alias
}

Alias.Window_Message_processCharacter = Window_Message.prototype.processCharacter
Window_Message.prototype.processCharacter = function(textState) {
    Alias.Window_Message_processCharacter.call(this, textState)
    this.updateTalkingFaceWindow()
}

Window_Message.prototype.canRemoveMarginForFaceWindow = function(){
    return $gameMessage.faceName() && !Plugin.isFaceWindowDisabled()
}

Window_Message.prototype.getMarginForFaceWindow = function(){
    const faceWidth = ImageManager.faceWidth
    const spacing = 20

    return faceWidth + spacing - 4
}

Window_Message.prototype.startFaceWindow = function(){
    Plugin.getFaceWindow().start()
}

Window_Message.prototype.updateIdleFaceWindow = function(){
    Plugin.getFaceSprite().refreshAnimation(Plugin.getFaceSettings().middleIndex)
}

Window_Message.prototype.updateTalkingFaceWindow = function(){
    Plugin.getFaceSprite().refreshAnimation(Plugin.getFaceSettings().endIndex)
}

}

}