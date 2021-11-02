//=============================================================================
// RPG Maker MZ - Button Picture
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0 Creates a single sequence based picture motion in the screen.
 * @author ELMZ
 *
 * @help Picture Motion Plugin
 *
 * Description:
 * This plugin allows you to show an image that creates sequence timers so it
 * appears as if you're showing a film reel / motion picture or a gif like
 * set of sequenced images.
 * 
 * Instructions:

 * Place all images in the img / Pictures folder.
 * 
 * What does it mean by Prefix?
 * 
 * In your plugin commands, the imagename is a prefix. It means that if
 * you have an image sequence of Picture_1, Picture_2, Picture_3 for
 * example, the image name should be Picture, not Picture_ or Picture_1.
 * The command only needs the first word.
 *
 *=====================================================================
 *Plugin Commands:
 *
 *Start Animation:
 *
 *Start , PictureMotion , imageName , speed , x , y , frames , Loop
 *	
 *where:
 *imageName is the name of the image you are using. (Prefix Only)
 *speed is the speed of the sequence for interchanging
 *x is the x coordinate of the motion picture
 *y is the y coordinate of the motion picture
 *frames is the number of frames your motion picture has
 *
 * Stop image sequence:
 *
 * Stop, PictureMotion 
 *
 * @command Start
 * @text Start
 * @desc Start image sequence.
 *
 * @arg imageName
 * @text imageName
 * @desc Name imagen load sequence
 * @type string
 *
 * @arg speed
 * @type number
 * @min 1
 * @max 10
 * @default 1
 * @text Speed
 * @desc Control speed animation max 1 min 10.
 *
 * @arg cordx
 * @type number
 * @default 1
 * @text x coordinate
 * @desc Is the x coordinate of the motion picture
 *
 * @arg cordy
 * @type number
 * @default 1
 * @text y coordinate
 * @desc Is the y coordinate of the motion picture
 *
 * @arg Nframes
 * @type number
 * @default 1
 * @text frames
 * @desc frames is the number of frames your motion picture has
 *
 * @arg repeat
 * @type select
 * @option true
 * @value true
 * @option false
 * @value false
 * Default: true
 * @default true
 * @text Loop
 * @desc Loop Animation
 *
 * @command Stop
 * @text Stop
 * @desc Stop image sequence.
 */

var Imported = Imported || {};
Imported.SOUL_PictureMotion = true;

var ELMZ = ELMZ || {};
ELMZ.PictureMotion = ELMZ.PictureMotion || {};


var tempImageSpeed = 0;
var tempImageX = null;
var tempImage_xCoord = 0;
var tempImage_yCoord = 0;
var tempSequence = 0;
var startMotion = false;
var contador=1;
var tempRepeat="true";

(function() {
	  const pluginName = "ELMZ_PictureMotion";

    PluginManager.registerCommand(pluginName, "Start", args => {
		
         tempImageX = String(args.imageName);
		 tempImageSpeed = Number(args.speed);
		 tempImage_xCoord  = Number(args.cordx);
		 tempImage_yCoord  = Number(args.cordx);
		 tempSequence = Number(args.Nframes);
		 tempRepeat = args.repeat;
		for (var i = 1; i <= tempSequence; i++) {
		    								ImageManager.loadPicture(tempImageX + '_' + i);
		    							}
										contador=1;
										startMotion = true;
    });
	
	PluginManager.registerCommand(pluginName, "Stop", args => {
										startMotion = false;
    });
	
	    ELMZ.PictureMotion.Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function() {
        ELMZ.PictureMotion.Spriteset_Map_createLowerLayer.call(this);
        this.cycleImageNumberX = 0;
        this.cycleImageCounterX = 0;
        this.motionpicture = new Sprite();
        this.addChild(this.motionpicture);    
    };

    ELMZ.PictureMotion.Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        ELMZ.PictureMotion.Spriteset_Map_update.call(this);
        this.motionpicture.x = tempImage_xCoord;
        this.motionpicture.y = tempImage_yCoord;
        
        if (this.cycleImageCounterX >= tempImageSpeed) {
            this.cycleImageCounterX = 0;
            if (this.cycleImageNumberX >= tempSequence) {
                this.cycleImageNumberX = 1;
            } else {
                this.cycleImageNumberX++;

            }
			
            if (startMotion) {
				if(tempRepeat=="true") 
				{this.motionpicture.bitmap = ImageManager.loadPicture(tempImageX + '_' + this.cycleImageNumberX); }
			else{contador=contador+1
		    if (contador<tempSequence){
            	 this.motionpicture.bitmap = ImageManager.loadPicture(tempImageX + '_' + contador);
               }}
								
            } else {
            	this.motionpicture.bitmap = ImageManager.loadPicture(null);
            }
        } else {
            this.cycleImageCounterX++;
        }
    };

	
  

})();
