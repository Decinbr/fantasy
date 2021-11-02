//==========================================================================
// EliMZ_BitmapFontPro.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc v1.1.0 - Use bitmap font instead of default fonts!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
https://www.patreon.com/hakuenstudio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Introduction
============================================================================

Those who want to use pixel fonts, or even more detailed fonts can get a 
lot of trouble when aiming for the perfection of the font visuals.
Rpg Maker can blurry and add an outline to your fonts. This plugin solves 
this problem, letting you use a bitmap font(a .png file) like a sprite 
sheet, which lets your fonts be rendered more faithful.

============================================================================
Features
============================================================================

• Add bitmap font to your game.
• Choose the size of the space between characters.
• Choose the size of the space
• Choose the characters(letters) your bitmap will use.
• Choose if you want to smooth or not the font.
• Can add as many fonts as you want. (PRO)
• Set specific fonts for scenes or windows. (PRO)
• Change text color. (PRO)
• Use Underline and Strike-through with Eli Message Actions. (PRO)

============================================================================
How to use
============================================================================

This is not the technical "Bitmap font". 
This bitmap font is created like a sprite sheet, in a png file using a 
single row.
The height of this png file will determine the size that a character can 
occupy on the lines.
The default line-height of the RPG Maker is 36. So try to keep under 
this(Unless you have another plugin that can change this value)

The width of the file doesn't matter. Can be any size, but you must create 
this in a way that each character will be on his grid.
You don't need to worry about center them on the grid, they just need to 
be inside.
The plugin will auto calculate the width of each letter.

In the plugin parameters, there is a field where you can list all 
characters that this bitmap font has.
So, they need to be in the same order that your bitmap is.

Still, in plugin parameters, you can change the size in pixels that will 
exist between characters and also the blank space size when using the 
"spacebar" key.

Optionally, instead of just put a blank space when using the "spacebar", 
you can choose if the plugin will create an empty bitmap for that blank 
space, of if it will only add a space when inserting the text.

If you are using some pixelated fonts, you can choose to remove the smooth 
effect that RPG Maker has by default.

Pro version

You can use as many Bitmap Fonts as you want. And also set a specific font 
to a window or scene.
You just need to put the name of the window or scene on the 
Window List/Scene List parameter.
This name is case sensitive, and the Scene List has a higher priority than 
the Window List.

To use Underline and StrikeThrough you must have the Eli_MessageActions.

NOTE¹: All escape characters should work normally. 
But for now, this plugin does not support the escape codes that change the 
font size( \{ \} and \FS).

NOTE²: The color escape codes are only supported on the PRO Version.

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
Version 1.0.2 - 07/12/2021
- Fixed a problem thats was not calculating text height properly.
- Add an option to render the blank space with the "spacebar" key as a 
bitmap.
Version 1.0.1 - 07/02/2021
- Performance improvements
- Fixed a problem with the align command of Eli Message Actions
Version 1.0.0 - 06/20/2021
- Plugin release!

@param file
@text Font file
@type file
@dir img/system
@desc The bitmap font to use.
@default 

@param characters
@text All Characters
@type struct<charactersSt>
@desc A list of all the characters your font bitmap file have.
@default {"upper":"ABCDEFGHIJKLMNOPQRSTUVWXYZ","lower":"abcdefghijklmnopqrstuvwxyz","numbers":"0123456789","signs":"!?.'\"|#$%¨&*()-_=+§¢¬ºª´`~^,<>:;/\\@"}

@param spaceBetweenCharacters
@text Space between characters
@type number
@desc The size in pixels of space between each character.
@default 2

@param blankSpace
@text Blank space size
@type number
@desc The size in pixels that the space will have.
@default 6

@param smooth
@text Apply smooth?
@type boolean
@desc Choose if you want to apply smooth when drawing the font.
@default false

@param spaceBitmap
@text Add space as a bitmap
@type boolean
@desc If true, the "space" will be rendered as an empty bitmap.
@default true

*/

/*~struct~charactersSt:

@param upper
@text Upper Case
@type text
@desc A list of all the characters your font bitmap file have.
@default ABCDEFGHIJKLMNOPQRSTUVWXYZ

@param lower
@text Lower Case
@type text
@desc A list of all the characters your font bitmap file have.
@default abcdefghijklmnopqrstuvwxyz

@param numbers
@text Numbers
@type text
@desc A list of all the characters your font bitmap file have.
@default 0123456789

@param signs
@text Signs
@type text
@desc A list of all the characters your font bitmap file have.
@default !?.'"|#$%¨&*()-_=+§¢¬ºª´`~^,<>:;/\@

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_BitmapFont = true

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
    const requiredVersion = ['3','3','2']
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

Eli.BitmapFont = {

    parameters: EliPluginManager.createParameters() || {},
    alias: this.alias || {},
    loading: 0,
    index: 0,
    isLoaded: 0,

    initialize(){
        this.parameters.fonts = [
            this.parameters
        ]
        this.isLoaded += this.getAllCharacters(this.parameters.fonts[0].characters).length

        this.createBitmap()
    },

    createBitmap(){
        const font = this.parameters.fonts[0]
        const fontName = font.file
        const fontBitmap = ImageManager.loadSystem(fontName)
        
        font.bitmaps = {}
        font.height = 0
        font.size = 1

        fontBitmap.addLoadListener(this.setupFont.bind(this, font, fontBitmap))
    },

    getAllCharacters(fontCharacters){
        const {upper, lower, numbers, signs} = fontCharacters
        return upper + lower + numbers + signs
    },

    setupFont(font, fontBitmap){
        const allCharacters = this.getAllCharacters(font.characters)
        const standardHeight = fontBitmap.height
        const standardWidth = fontBitmap.width / allCharacters.length

        font.height = standardHeight

        for(let i = 0; i < allCharacters.length; i++){
            const char = allCharacters[i]
            const minX = i*standardWidth
            const maxX = minX + standardWidth
            const bounds = fontBitmap.searchBounds(minX, maxX)
            const width = (bounds[1] + 1) - bounds[0]
            const sourceSettings = {
                sx: bounds[0],
                sy: 0,
                sw: width,
                sh: standardHeight
            }
                
            font.bitmaps[char] = new Bitmap(width + font.spaceBetweenCharacters, standardHeight)
            font.bitmaps[char].addLoadListener(this.setupCharacter.bind(this, sourceSettings, font.bitmaps[char], fontBitmap))
        }

        if(this.param().spaceBitmap){
            font.bitmaps[" "] = new Bitmap(font.blankSpace, standardHeight)
        }
    },

    setupCharacter(sourceSettings, charBitmap, fontBitmap){
        const {sx, sy, sw, sh} = sourceSettings

        charBitmap.blt(fontBitmap, sx, sy, sw, sh, 0, 0)
        this.loading++
    },

    isAllFontsLoaded(){
        return this.loading === this.isLoaded
    },

    param(){
        return this.parameters;
    },
    
}

const Plugin = Eli.BitmapFont
const Alias = Eli.BitmapFont.alias

Plugin.initialize()

/* ========================================================================== */
/*                                    CORE                                    */
/* ========================================================================== */

/* --------------------------------- BITMAP --------------------------------- */

{

Bitmap.prototype.fontBitmap = function(){
    return Plugin.param().fonts[0]
}

Bitmap.prototype.measureBitmapTextWidth = function(text){
    let width = 0

    for(const char of String(text)){
        const bitmap = this.fontBitmap().bitmaps[char]
        const {size, blankSpace} = this.fontBitmap()

        if(bitmap){
            width += bitmap.width * size
        }else{
            width += blankSpace * size
        } 
    }

    return width
}

Bitmap.prototype.measureBitmapTextWidthForEachChar = function(text){
    let width = []
    const txt = String(text)

    for(let i = 0; i < txt.length; i++ ){
        const char = txt[i]
        const bitmap = this.fontBitmap().bitmaps[char]
        const {size, blankSpace} = this.fontBitmap()

        if(bitmap){
            width.push(bitmap.width * size)
        }else{
            width.push(blankSpace * size)
        }
    }

    return width
}

Bitmap.prototype.getBitmapTextXwithAlign = function(textWidth, x, maxWidth, align){
    switch(align){
        case "left":    return x
        case "center":  return x + (maxWidth / 2) - (textWidth / 2)
        case "right":   return x + maxWidth - textWidth
    }

    return x
}

Bitmap.prototype.drawBitmapText = function(text, x, y, maxWidth, lineHeight, align){
    const txt = String(text)
    const textWidth = this.measureBitmapTextWidth(txt)
    const size = this.fontBitmap().size
    let tx = this.getBitmapTextXwithAlign(textWidth, x, maxWidth, align)

    for(let i = 0; i < txt.length; i++){
        const char = txt[i]
        const bitmap = this.fontBitmap().bitmaps[char]
        const charWidth = this.measureBitmapTextWidth(char)

        if(bitmap){
            this.drawBitmapFontCharacter(bitmap, size, tx, y, lineHeight)
        }

        tx += charWidth * size
    }

}

Bitmap.prototype.getSourceAndDestinationSettings = function(bitmap, size, y, lineHeight){
    const width = bitmap.width
    const height = bitmap.height

    return {
        sx: 0,
        sy: 0,
        sw: width,
        sh: height,
        dw: width * size,
        dh: height * size,
        ty: (y + (lineHeight/2) - (height/2)) + 2,
    }
}

Bitmap.prototype.drawBitmapFontCharacter = function(bitmap, size, tx, y, lineHeight){
    const {sx, sy, sw, sh, dw, dh, ty} = this.getSourceAndDestinationSettings(bitmap, size, y, lineHeight)
    const oldSmooth = this._smooth
    const oldContextSmooth = this.context.imageSmoothingEnabled

    this._smooth = this.fontBitmap().smooth
    this.context.imageSmoothingEnabled = this.fontBitmap().smooth
    
    this.blt(bitmap, sx, sy, sw, sh, tx, ty, dw, dh)

    this._smooth = oldSmooth
    this.context.imageSmoothingEnabled = oldContextSmooth
}
Bitmap.prototype.getFirstLeftPixel = function(minX, maxX){
    const alphaPixel = "#000000"
    let pixel = "#000000"
    let firstPixel = 0
    
    for(let w = minX; w <= maxX; w++){
        
        for(let h = 0; h < this.height; h++){
            pixel = this.getPixel(w, h)

            if(pixel !== alphaPixel){
                firstPixel = w
                break
            }
        }

        if(pixel !== alphaPixel) break
    }

    return firstPixel
}

Bitmap.prototype.getLastRightPixel = function(maxX, minX){
    const alphaPixel = "#000000"
    let pixel = "#000000"
    let lastPixel = 0
    
    for(let w = maxX-1; w >= minX; w--){
        
        for(let h = this.height; h >= 0; h--){
            pixel = this.getPixel(w, h)

            if(pixel !== alphaPixel){
                lastPixel = w
                break
            }
        }
        if(pixel !== alphaPixel) break
    }

    return lastPixel
}

Bitmap.prototype.searchBounds = function(minX, maxX){
    const coords = [
        this.getFirstLeftPixel(minX, maxX), 
        this.getLastRightPixel(maxX, minX)
    ]

    return coords
}

Alias.Bitmap_drawText = Bitmap.prototype.drawText
Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
    if(Plugin.isAllFontsLoaded()){
        this.drawBitmapText(text, x, y, maxWidth, lineHeight, align)
    }else{
        Alias.Bitmap_drawText.call(this, text, x, y, maxWidth, lineHeight, align)
    }
}

Alias.Bitmap_measureTextWidth = Bitmap.prototype.measureTextWidth
Bitmap.prototype.measureTextWidth = function(text) {
    if(Plugin.isAllFontsLoaded()){
        return this.measureBitmapTextWidth(text)
    }else{
        return Alias.Bitmap_measureTextWidth.call(this, text)
    }
}

}

/* ========================================================================== */
/*                                   WINDOW                                   */
/* ========================================================================== */

/* ------------------------------- WINDOW BASE ------------------------------ */

{

Alias.Window_Base_resetFontSettings = Window_Base.prototype.resetFontSettings
Window_Base.prototype.resetFontSettings = function() {
    Alias.Window_Base_resetFontSettings.call(this)
    this.contents.fontSize = this.contents.fontBitmap().height
}

Alias.Window_Base_calcTextHeight = Window_Base.prototype.calcTextHeight
Window_Base.prototype.calcTextHeight = function(textState) {
    const textHeight = Alias.Window_Base_calcTextHeight.call(this, textState)
    const defaultLineSpacing = this.lineHeight() - $gameSystem.mainFontSize()
    const fontBitmapLineSpacing = this.lineHeight() - this.contents.fontBitmap().height
    
    return (textHeight - defaultLineSpacing) + fontBitmapLineSpacing
}

}

}