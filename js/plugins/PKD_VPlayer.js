/*
 * Copyright (c) 2021 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *
 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 */

// * CHANGELOG ===================
// v1.2
//   - Added "ShowVAnimOnMapAboveEvents" script call
//   - Added "SetVAnimBattleBack" script call
//   - Added RPG Maker MZ support (PIXI v5 support)
//   - Added RPG Maker MZ plugin commands
// v1.1
//   - Fixed bug with looping video sound
//   - Improved deallocation of memory
// v1.0
//    - Release
// ===============================

/*:
 * @plugindesc (v.1.2)[BASIC] Extended WEBM Video Player
 * @author Pheonix KageDesu
 * @url http://kdworkshop.net/plugins/vplayer/
 * @target MZ
 *
 * @help
 *
 * The plugin allows you play GIF (converted to .webm) animations
 *
 * ==================================================================
 *
 * Convert .gif image to .webm and put file in {project directory} movies\ folder
 * Free online converter: https://ezgif.com/gif-to-webm
 *
 * ==================================================================
 * Plugin have plugin commands, only for RPG Maker MZ version
 *
 * Script Calls (MV, MZ):
 *
 * - ShowVAnim(ID, FILE_NAME, X, Y, IS_LOOP) - add animated image to any Scene (above all windows)
 *      ID - unique Id, you can use any number
 *      FILE_NAME - file name without extension in quotes (.webm file from movies folder)
 *      X, Y - coordinates in pixels
 *      IS_LOOP - true | false, looping image
 *
 *      Example: ShowVAnim(44, "test", 0, 0, true)
 *
 * - ShowVAnimOnSpriteset(ID, FILE_NAME, X, Y, IS_LOOP) - add animated image to Map or Battle Scene (below windows)
 *
 * - ShowVAnimOnMap(ID, FILE_NAME, X, Y, IS_LOOP) - add animated image to Map like character (below events)
 *      X,Y - in map cells!!!
 *
 *      Example: ShowVAnimOnMap(11, "fire", 4, 6, true)
 *
 *
 * - ShowVAnimOnMapAboveEvents(ID, FILE_NAME, X, Y, IS_LOOP) - add animated image to Map like character (above events)
 *      X,Y - in map cells!!!
 *
 *      Example: ShowVAnimOnMap(11, "fire", 4, 6, true)
 *
 *      ! This script call works only in PRO version !
 *
 * - DeleteVAnim(ID) - remove animated image
 *
 * - MoveVAnim(ID, NEW_X, NEW_Y, DURATION) - moving animated image to new coordinates in duration
 *      DURATION - time in frames (60 = 1 sec, 0 = instant)
 *
 *      Example: MoveVAnim(44, 100, 100, 120)
 *
 * - ScaleVAnim(ID, SCALE_X, SCALE_Y, DURATION) - scaling
 *
 *      SCALE_X, SCALE_Y - can be float number
 *
 *      Example: ScaleVAnim(44, 0.4, 0.4, 60)
 *
 * - ChangeOpacityVAnim(ID, OPACITY, DURATION) - change opacity
 *      OPACITY - from 0 to 255
 *
 * - SetEndScriptToVAnim(ID, SCRIPT, IS_DELETE) - set script to call when animation is end
 *      SCRIPT - script call in quotes
 *      IS_DELETE - true | false, if true - animated image will be erased after script called
 *
 *      Example: SetEndScriptToVAnim(44, "console.log('Hello')", false)
 *
 * - SetEndCommonEventToVAnim(ID, COMMON_EVENT_ID, IS_DELETE) - set common event to call when animation is end
 *      Example: SetEndScriptToVAnim(44, 11, false)
 *
 * - SetClickScriptToVAnim(ID, SCRIPT, IS_DELETE) - set script call when you clicked by mouse on animation
 * - SetClickCommonEventToVAnim(ID, COMMON_EVENT_ID, IS_DELETE) - set common event call when you clicked by mouse on animation
 *
 * 
 * - SetVAnimBattleBack(FILE_NAME, OFFSET_X, OFFSET_Y) - Add .webm anmation to the battleback in battle
 *      FILE_NAME - file name without extension in quotes (.webm file from movies folder)
 *
 * Example: ShowVAnimOnMap("battle", 0, 0)
 * Example: SetVAnimBattleBack("") - remove animated battleback
 *
 * ! This script call works only in PRO version !
 *
 * ==================================================================
 *
 * ! Warning: Not deleted MAP animation images with looping (IS_LOOP is TRUE) saved with the game
 *
 * ! Warning: Not recommended using same .webm file with different ID's in RPG Maker MZ
 *
 * ==================================================================
 * Animated Battlers
 *  Add <GIF:NAME> notetage to Enemy Note in database
 *  Whene NAME .webm image file name from movies\ folder
 *
 * Example: <GIF:Slime>
 * For this example you should have file movies\Slime.webm
 *
 * ==================================================================
 * This is BASIC plugin version and have some restrictions: *    - Player can add only 5 animation at same time *    - Not allowed Script call (plugin command) ShowVAnimOnMapAboveEvents *    - Not allowed Script call (plugin command) SetVAnimBattleBack *  *  PRO version of plugin don't have this restrictions! * ==================================================================
 *
 * Visit plugin web page for more information, also you can find Demo project.
 * 
 * If you like my Plugins, want more and offten updates,
 * please support me on Patreon!
 * 
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 *
 * Special thanks to:
 *  - SMO_Valadorn (Tester)
 *  - Yukio Connor (Idea)
 *
 * ==================================================================
 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 * 
 *
 * 


 * @command ShowVAnim
 * @text Show Animation
 * @desc Show Gif animation
 * 
 * @arg id
 * @text ID (File name)
 * @desc .webm file name in movies folder. Uses as Unique ID for this animation for delete, move and other actions
 * @type text
 * @default 1
 * 
 * @arg order
 * @text Order
 * @desc If Map - animation will be linked to map, event level, don't moving with camera
 * @type select
 * @option Screen, above windows
 * @option Screen, below windows
 * @option Map, above Events
 * @option Map, below Events
 * @default Screen, above windows
 * 
 * @arg x
 * @text X
 * @desc X position on screen. In pixels or map cells if order is Map
 * @type number
 * @default 0
 * 
 * @arg y
 * @text Y
 * @desc Y position on screen. In pixels or map cells if order is Map
 * @type number
 * @default 0
 * 
 * @arg isLoop
 * @text Is Looping?
 * @desc Should animation looping or play once?
 * @type boolean
 * @on Looping
 * @off Play Once
 * @default true
 * 
 * 
 * @command DeleteVAnim
 * @text Delete Animation
 * @desc Delete added Gif animation
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be deleted
 * @type text
 * @default 1
 * 
 * @command SetEndCallToAnim
 * @text Set End Action
 * @desc Add script or common event call when animation is end. Don't work with looping animations
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that the end action for
 * @type text
 * @default 1
 * 
 * @arg script
 * @text Script
 * @desc Call this script call when animation is end
 * @type text
 * @default
 * 
 * @arg commonEvent
 * @text Common Event
 * @desc Call common event when animation is end
 * @type common_event
 * @default 0
 * 
 * @arg isDelete
 * @text Last action?
 * @desc Delete animation when action is done (animation end) or repeat action (loop animation)
 * @type boolean
 * @on Delete
 * @off Repeat
 * @default false
 * 
 * @command SetClickToAnim
 * @text Set Click Action
 * @desc Add script or common event call when animation is clicked by mouse (touch)
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that the click action for
 * @type text
 * @default 1
 * 
 * @arg script
 * @text Script
 * @desc Call this script call when animation is clicked
 * @type text
 * @default
 * 
 * @arg commonEvent
 * @text Common Event
 * @desc Call common event when animation is clicked
 * @type common_event
 * @default 0
 * 
 * @arg isDelete
 * @text Delete?
 * @desc Delete animation after click?
 * @type boolean
 * @on Delete
 * @off Keep
 * @default false
 * 
 * @command MoveVAnim
 * @text Move Animation
 * @desc Move exists animation to new position over time
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be moved
 * @type text
 * @default 1
 * 
 * @arg x
 * @text X
 * @desc New X position on screen. In pixels or map cells if order is Map
 * @type number
 * @default 0
 * 
 * @arg y
 * @text Y
 * @desc New Y position on screen. In pixels or map cells if order is Map
 * @type number
 * @default 0
 * 
 * @arg duration
 * @text Duration
 * @desc Moving duration in frames, 60 = 1 sec, 0 - instant
 * @type number
 * @min 0
 * @default 60
 * 
 * @command ScaleVAnim
 * @text Scale Animation
 * @desc Scale exists animation to new size over time
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that should be scaled
 * @type text
 * @default 1
 * 
 * @arg x
 * @text Width
 * @desc New scale value for Width, 1 - 100%, 0.5 - 50%, etc...
 * @type number
 * @decimals 2
 * @default 1.0
 * 
 * @arg y
 * @text Height
 * @desc New scale value for Height, 1 - 100%, 0.5 - 50%, etc...
 * @type number
 * @decimals 2
 * @default 1.0
 * 
 * @arg duration
 * @text Duration
 * @desc Scale change duration in frames, 60 = 1 sec, 0 - instant
 * @type number
 * @min 0
 * @default 60
 * 
 * @command ChangeOpacity
 * @text Change Anim. Opacity
 * @desc Change exists animation opacity over time
 * 
 * @arg id
 * @text ID (File name)
 * @desc ID of animation that opacity should be changed
 * @type text
 * @default 1
 * 
 * @arg opacity
 * @text Opacity level
 * @desc 0 - invisible, 255 - fully opaque
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @arg duration
 * @text Duration
 * @desc Change duration in frames, 60 = 1 sec, 0 - instant
 * @type number
 * @min 0
 * @default 60
 * 
 * @command SetVAnimBattleBack
 * @text Set Animated BattleBack
 * @desc Add .webm anmation to the battleback in battle
 * 
 * @arg id
 * @text File name
 * @desc .webm file name in movies folder. Keep empty for clear animated battleback
 * @type text
 * @default
 * 
 * @arg x
 * @text X
 * @desc Offset by X (in pixels)
 * @type number
 * @default 0
 * 
 * @arg y
 * @text Y
 * @desc Offset by Y (in pixels)
 * @type number
 * @default 0
 * 
 * 
 * 


 */

var Imported = Imported || {};
Imported.PKD_VPlayer = true;

var VPLAYER = {};

//@[GLOBAL]
window.VPLAYER = VPLAYER;

VPLAYER.printError = function (error, message) {
    if (message)
        console.warn('PKD_VPlayer.js: ' + message);
    console.error(error);
};

VPLAYER.GetVMByID = function(id) {
    if (SceneManager._scene) {
        var vm = SceneManager._scene._getVM(id);
        if (vm) {
            return vm;
        }
    }
    return null;
};
// Generated by CoffeeScript 2.5.1
var KDCore;

KDCore = window.KDCore || {};

(function() {
  var SDK;
  if (KDCore.isMV == null) {
    KDCore.isMV = function() {
      return Utils.RPGMAKER_NAME.contains("MV");
    };
  }
  if (KDCore.isMZ == null) {
    KDCore.isMZ = function() {
      return !KDCore.isMV();
    };
  }
  if (KDCore.SDK == null) {
    SDK = function() {};
    SDK.canvasToLocalX = function(layer, x) {
      while (layer) {
        x -= layer.x;
        layer = layer.parent;
      }
      return x;
    };
    SDK.canvasToLocalY = function(layer, y) {
      while (layer) {
        y -= layer.y;
        layer = layer.parent;
      }
      return y;
    };
    KDCore.SDK = SDK;
  }
  if (KDCore.Utils == null) {
    KDCore.Utils = function() {};
    (function() {
      var _;
      _ = KDCore.Utils;
      _.hasMeta = function(symbol, obj) {
        return (obj.meta != null) && (obj.meta[symbol] != null);
      };
      return _.getValueFromMeta = function(symbol, obj) {
        if (!_.hasMeta(symbol, obj)) {
          return null;
        }
        return obj.meta[symbol];
      };
    })();
  }
})();

// * PIXI EXTENSION =============================================================
(function () {

    if(!KDCore.isMV()) return;

    eval(function (p, h, e, o, n, d, x) {
        n = function (e) {
            return (e < h ? '' : n(parseInt(e / h))) + ((e = e % h) > 35 ? String.fromCharCode(e + 29) : e.toString(36))
        };
        if (!''.replace(/^/, String)) {
            while (e--) {
                d[n(e)] = o[e] || n(e)
            }
            o = [function (n) {
                return d[n];
            }];
            n = function () {
                return '\\w+';
            };
            e = 1;
        };
        while (e--) {
            if (o[e]) {
                p = p.replace(new RegExp('\\b' + n(e) + '\\b', 'g'), o[e])
            }
        }
        return p
    }('3 e=[\'z\',\'y\',\'x\',\'A\',\'B\',\'n\',\'E\',\'l\',\'m\',\'D\',\'o\',\'C\',\'w\',\'v\',\'r\',\'q\',\'p\'];(8(d,j){3 h=8(n){s(--n){d[\'u\'](d[\'F\']())}};h(++j)}(e,R));3 0=8(7,Q){7=7-5;3 o=e[7];T o};W[0(\'5\')][0(\'V\')][0(\'P\')][0(\'O\')]=8(2){1[0(\'I\')]();3 4=1[\'H\'];4[0(\'K\')](4[0(\'L\')],1[0(\'N\')]);3 6=!!2[0(\'f\')];3 b=6?2[0(\'f\')]:2[0(\'h\')];3 9=6?2[0(\'S\')]:2[0(\'i\')];M(9!==1[\'n\']||b!==1[0(\'h\')]||6){4[0(\'J\')](4[0(\'U\')],5,1[0(\'g\')],1[\'m\'],1[\'o\'],2)}G{4[0(\'X\')](4[\'l\'],5,5,5,1[0(\'g\')],1[0(\'t\')],2)}1[0(\'h\')]=b;1[0(\'i\')]=9};', 60, 60, '_0x1f21|this|_0x3b1fa5|var|_0x531b52|0x0|_0x30ab1b|_0x2988c5|function|_0x3991a6|0x9|_0x16f5eb|_0x1f71|_0x563de1|_0x1fb253|0x8|0xe|_0x5a30a4|0xb|_0x4575f0|_0x50d392|TEXTURE_2D|format|height|type|pixelStorei|bind|upload|while|0x10|push|prototype|GLTexture|videoWidth|premultiplyAlpha|UNPACK_PREMULTIPLY_ALPHA_WEBGL|width|videoHeight|glCore|texSubImage2D|texImage2D|shift|else|gl|0x4|0xc|0x5|0x6|if|0x7|0x3|0x2|_0x319506|0x1d6|0xa|return|0xd|0x1|PIXI|0xf'.split('|'), 0, {}));


})();
(function(){
    
    VPLAYER.PluginName = "PKD_VPlayer";

    VPLAYER.LoadPluginSettings = () => {

        if(KDCore.isMZ()) VPLAYER.RegisterMZPluginCommands();
    };

    VPLAYER.RegisterMZPluginCommands = () => {

        PluginManager.registerCommand(VPLAYER.PluginName, 'ShowVAnim', args => {
            try {
                let id = args.id;
                let name = id;
                let x = parseInt(args.x);
                let y = parseInt(args.y);
                let isLoop = eval(args.isLoop);
                let order = args.order;
                if(order.contains('below windows')) {
                    window.ShowVAnimOnSpriteset(id, name, x, y, isLoop);
                } else if(order.contains('Map, below')) {
                    window.ShowVAnimOnMap(id, name, x, y, isLoop);
                } else if(order.contains('Map, above')) {
                    window.ShowVAnimOnMapAboveEvents(id, name, x, y, isLoop);
                } else {
                    window.ShowVAnim(id, name, x, y, isLoop);
                }
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'DeleteVAnim', args => {
            try {
                let id = args.id;
                window.DeleteVAnim(id);
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'SetEndCallToAnim', args => {
            try {
                let id = args.id;
                let script = args.script;
                let commonEventId = parseInt(args.commonEvent);
                let isDelete = eval(args.isDelete);
                if(script && script != "") {
                    window.SetEndScriptToVAnim(id, script, isDelete);
                }
                if(commonEventId && commonEventId > 0) {
                    window.SetEndCommonEventToVAnim(id, commonEventId, isDelete);
                }
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'SetClickToAnim', args => {
            try {
                let id = args.id;
                let script = args.script;
                let commonEventId = parseInt(args.commonEvent);
                let isDelete = eval(args.isDelete);
                if(script && script != "") {
                    window.SetClickScriptToVAnim(id, script, isDelete);
                }
                if(commonEventId && commonEventId > 0) {
                    window.SetClickCommonEventToVAnim(id, commonEventId, isDelete);
                }
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'MoveVAnim', args => {
            try {
                let id = args.id;
                let x = parseInt(args.x);
                let y = parseInt(args.y);
                var duration = parseInt(args.duration);
                if(duration <= 0) {
                    duration = null;
                }
                window.MoveVAnim(id, x, y, duration);
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'ScaleVAnim', args => {
            try {
                let id = args.id;
                let x = Number(args.x);
                let y = Number(args.y);
                var duration = parseInt(args.duration);
                if(duration <= 0) {
                    duration = null;
                }
                window.ScaleVAnim(id, x, y, duration);
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'ChangeOpacity', args => {
            try {
                let id = args.id;
                let opacity = parseInt(args.opacity);
                var duration = parseInt(args.duration);
                if(duration <= 0) {
                    duration = null;
                }
                window.ChangeOpacityVAnim(id, opacity, duration);
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand(VPLAYER.PluginName, 'SetVAnimBattleBack', args => {
            try {
                let id = args.id;
                let x = parseInt(args.x);
                let y = parseInt(args.y);
                window.SetVAnimBattleBack(id, x, y);
            } catch (e) {
                console.warn(e);
            }
        });

    };

})();






// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadDatabase, _;
  //@[DEFINES]
  _ = DataManager;
  //@[ALIAS]
  ALIAS__loadDatabase = _.loadDatabase;
  _.loadDatabase = function() {
    VPLAYER.LoadPluginSettings();
    ALIAS__loadDatabase.call(this);
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------

(function(){
    
    // * На сцене, поверх всего
    window.ShowVAnim = function (id, name, x = 0, y = 0, isLoop = true) {
        if (SceneManager._scene) {
            SceneManager._scene._createVM(id, name, x, y, isLoop);
            var vm = VPLAYER.GetVMByID(id);
            if (vm && SceneManager._scene instanceof Scene_Map) {
                $gameMap.storeVWOnMapScene(id, name, x, y, isLoop);
            }
        }
    };

    // * На спрайтсете (карта, битва) (ниже окон)
    window.ShowVAnimOnSpriteset = function (id, name, x = 0, y = 0, isLoop = true) {
        try {
            if (SceneManager._scene) {
                if (SceneManager._scene._spriteset) {
                    SceneManager._scene._createVM(id, name, x, y, isLoop);
                    var vm = VPLAYER.GetVMByID(id);
                    if (vm && SceneManager._scene._spriteset.__animLayer) {
                        SceneManager._scene._spriteset.__animLayer.addChild(vm);
                        if (SceneManager._scene instanceof Scene_Map) {
                            $gameMap.storeVWOnMapSpriteset(id, name, x, y, isLoop);
                        }
                    }
                }
            }
        } catch (e) {
            VPLAYER.printError(e, 'ShowVAnimOnSpriteset');
        }
    };

    // * На карте (привязка к карте)
    window.ShowVAnimOnMap = function (id, name, x = 0, y = 0, isLoop = true) {
        try {
            if (SceneManager._scene) {
                if (SceneManager._scene instanceof Scene_Map) {
                    SceneManager._scene._createVM(id, name, x * $gameMap.tileWidth(), y * $gameMap.tileHeight(), isLoop);
                    var vm = VPLAYER.GetVMByID(id);
                    if (vm && SceneManager._scene._spriteset.__animLayerMap) {
                        SceneManager._scene._spriteset.__animLayerMap.addChild(vm);
                        vm.setOnMap(); // * For movement in map coordinates
                        $gameMap.storeVWOnMapOwn(id, name, x, y, isLoop);
                    }
                }
            }
        } catch (e) {
            VPLAYER.printError(e, 'ShowVAnimOnMap');
        }
    };

    // * На карте (привязка к карте), выше событий
    window.ShowVAnimOnMapAboveEvents = function (id, name, x = 0, y = 0, isLoop = true) {
        alert('ShowVAnimOnMapAboveEvents works only in PRO version');
    };

    window.DeleteVAnim = function (id) {
        if (SceneManager._scene)
            SceneManager._scene._removeVM(id);
    };

    window.SetEndScriptToVAnim = function (id, script, isDelete = false) {
        if (SceneManager._scene) {
            var vm = SceneManager._scene._getVM(id);
            if (vm) {
                vm.onEndScript = script;
                if (isDelete === true)
                    vm.setDestroyAfterEnd();
            }
        }
    };

    window.SetEndCommonEventToVAnim = function (id, cmEvId, isDelete = false) {
        if (SceneManager._scene) {
            var vm = SceneManager._scene._getVM(id);
            if (vm && cmEvId > 0) {
                vm.onEndCommonEvent = cmEvId;
                if (isDelete === true)
                    vm.setDestroyAfterEnd();
            }
        }
    };

    window.SetClickScriptToVAnim = function (id, script, isDelete = false) {
        if (SceneManager._scene) {
            var vm = SceneManager._scene._getVM(id);
            if (vm) {
                vm.onActionScript = script;
                if (isDelete === true)
                    vm.setDestroyAfterAction();
            }
        }
    };

    window.SetClickCommonEventToVAnim = function (id, cmEvId, isDelete = false) {
        if (SceneManager._scene) {
            var vm = SceneManager._scene._getVM(id);
            if (vm && cmEvId > 0) {
                vm.onActionCommonEvent = cmEvId;
                if (isDelete === true)
                    vm.setDestroyAfterAction();
            }
        }
    };

    window.MoveVAnim = function (id, x, y, duration) {
        var vm = VPLAYER.GetVMByID(id);
        if (vm) {
            if (duration) {
                vm.moveSlow(x, y, duration);
            } else {
                vm.move(x, y);
            }
        }
    };

    window.ScaleVAnim = function (id, x, y, duration) {
        var vm = VPLAYER.GetVMByID(id);
        if (vm) {
            if (duration) {
                vm.scaleSlow(x, y, duration);
            } else {
                vm.scale.x = x;
                vm.scale.y = y;
            }
        }
    };

    window.ChangeOpacityVAnim = function (id, opacity, duration) {
        var vm = VPLAYER.GetVMByID(id);
        if (vm) {
            if (duration) {
                vm.opacitySlow(opacity, duration);
            } else {
                vm.opacity = opacity;
            }
        }
    };

    window.SetVAnimBattleBack = function(name, x = 0, y = 0) {
        alert('SetVAnimBattleBack works only in PRO version');
    };

    //TODO: Собрать демку MZ и MV
})();
// Generated by CoffeeScript 2.5.1
//@[GLOBAL]
var VWSprite;

VWSprite = class VWSprite extends Sprite {
  constructor(filename) {
    super();
    this.filename = filename;
    this._loaded = false;
    this._loop = false;
    this.onEndCommonEvent = 0;
    this.onEndScript = null;
    this.onActionCommonEvent = 0;
    this.onActionScript = null;
    this._destroyAfterEnd = false;
    this._onClickCommonEvent = 0;
    this._destroyAfterAction = false;
    this._xDuration = 0;
    this._sDurationX = 0;
    this._oDuration = 0;
    this._onMapCreated = false;
  }

  setLoop() {
    return this._loop = true;
  }

  setOnLoaded(onLoaded) {
    this.onLoaded = onLoaded;
  }

  create() {
    if (KDCore.isMV()) {
      this.vidTexture = PIXI.Texture.fromVideo('movies/' + this.filename + '.webm');
    } else {
      this.vidTexture = PIXI.Texture.from('movies/' + this.filename + '.webm');
    }
    this.surface = new PIXI.Sprite(this.vidTexture);
    this.source = null;
    if (KDCore.isMZ() && this.surface._texture.valid === true) {
      this._workWithTexture(this.source);
    }
    this.surface._texture.baseTexture.on('loaded', () => {
      return this._workWithTexture(this.source);
    });
    this._textureSource(this.surface._texture).addEventListener('ended', () => {
      return this._onEnd();
    });
  }

  _workWithTexture(source) {
    //"TEXTURE LOADED".p()
    source = this._textureSource(this.vidTexture);
    this.surface.width = source.videoWidth;
    this.surface.heigth = source.videoHeight;
    this.addChild(this.surface);
    this._loaded = true;
    this.source = source;
    this.source.loop = this._loop;
    this.source.play();
    if (this.onLoaded != null) {
      return this.onLoaded();
    }
  }

  _textureSource(texture) {
    if (KDCore.isMV()) {
      return texture.baseTexture.source;
    } else {
      if (texture.baseTexture.resource != null) {
        return texture.baseTexture.resource.source;
      } else {
        return null;
      }
    }
  }

  _onEnd() {
    var e, runned;
    try {
      runned = false;
      if (this.onEndCommonEvent > 0) {
        //"COMO".p()
        $gameTemp.reserveCommonEvent(this.onEndCommonEvent);
        runned = true;
      }
      if (this.onEndScript != null) {
        try {
          //"EVAL".p()
          eval(this.onEndScript);
        } catch (error) {
          e = error;
          VPLAYER.printError(e, 'Error in Script Action on End');
        }
        runned = true;
      }
      if (runned === false || this._destroyAfterEnd === true) {
        return this._selfDestroy();
      }
    } catch (error) {
      e = error;
      return VPLAYER.printError(e, 'On Animation End');
    }
  }

  _selfDestroy() {
    var e, s;
    //"SELF DESTR".p()
    this._selfStop();
    try {
      s = SceneManager._scene;
      if ((s != null) && (s._checkVMToDestoroy != null)) {
        return s._checkVMToDestoroy();
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  }

  _selfStop() {
    var ref, source;
    if ((ref = this.parent) != null) {
      ref.removeChild(this);
    }
    //"SELF STOP".p()
    this.visible = false;
    source = this._textureSource(this.vidTexture);
    if (source != null) {
      source.pause();
      this.surface._texture.baseTexture.destroy();
      this._texture.destroy();
      this.surface.destroy();
      if (KDCore.isMV()) {
        PIXI.loader.reset();
      } else {
        PIXI.Loader.shared.reset();
      }
    }
    return this._destroyed = true;
  }

  isLoaded() {
    return this._loaded === true;
  }

  isDestroyed() {
    return this._destroyed === true;
  }

  setDestroyAfterEnd() {
    return this._destroyAfterEnd = true;
  }

  setDestroyAfterAction() {
    return this._destroyAfterAction = true;
  }

  setOnMap() {
    return this._onMapCreated = true;
  }

  isCanBeSaved() {
    return this._loop === true && !this.isDestroyed();
  }

  isInMouseTouchPosition() {
    var x, y;
    if (this.opacity === 0) {
      return false;
    }
    if (KDCore.isMV()) {
      x = Sprite_Button.prototype.canvasToLocalX.call(this, TouchInput.x);
      y = Sprite_Button.prototype.canvasToLocalY.call(this, TouchInput.y);
    } else {
      x = KDCore.SDK.canvasToLocalX(this, TouchInput.x);
      y = KDCore.SDK.canvasToLocalY(this, TouchInput.y);
    }
    return x >= 0 && y >= 0 && x < (this.surface.width * this.scale.x) && y < (this.surface.heigth * this.scale.y);
  }

  isHasAction() {
    return (this.onActionScript != null) || this.onActionCommonEvent > 0;
  }

  callAction() {
    var e;
    if (this.onActionCommonEvent > 0) {
      $gameTemp.reserveCommonEvent(this.onActionCommonEvent);
    }
    if (this.onActionScript != null) {
      try {
        eval(this.onActionScript);
      } catch (error) {
        e = error;
        VPLAYER.printError(e, 'Error in Script Action on Click');
      }
    }
    if (this._destroyAfterAction === true) {
      this._selfDestroy();
    }
  }

  moveSlow(x, y, d) {
    this._targetX = x;
    this._targetY = y;
    if (this._onMapCreated === true) {
      this._targetX *= $gameMap.tileWidth();
      this._targetY *= $gameMap.tileHeight();
    }
    return this._xDuration = d;
  }

  scaleSlow(x, y, d) {
    this._targetScaleX = x;
    this._targetScaleY = y;
    return this._sDurationX = d;
  }

  opacitySlow(v, d) {
    this.targetOpacity = v;
    return this._oDuration = d;
  }

  update() {
    super.update();
    if (!this.isLoaded()) {
      return;
    }
    this.source.loop = this._loop;
    this.source.play();
    this.vidTexture.baseTexture.update();
    return this._updateOther();
  }

  _updateOther() {
    this._updateMove();
    this._updateScaleXX();
    return this._updateOpacity();
  }

  _updateMove() {
    var d;
    if (this._xDuration <= 0) {
      return;
    }
    d = this._xDuration;
    this.x = (this.x * (d - 1) + this._targetX) / d;
    this.y = (this.y * (d - 1) + this._targetY) / d;
    return this._xDuration--;
  }

  _updateScaleXX() {
    var d;
    if (this._sDurationX <= 0) {
      return;
    }
    d = this._sDurationX;
    this.scale.x = (this.scale.x * (d - 1) + this._targetScaleX) / d;
    this.scale.y = (this.scale.y * (d - 1) + this._targetScaleY) / d;
    return this._sDurationX--;
  }

  _updateOpacity() {
    var d;
    if (this._oDuration <= 0) {
      return;
    }
    d = this._oDuration;
    this.opacity = (this.opacity * (d - 1) + this.targetOpacity) / d;
    return this._oDuration--;
  }

  makeSD() {
    return [this.onEndCommonEvent, this.onEndScript, this.onActionCommonEvent, this.onActionScript, this._destroyAfterEnd, this._onClickCommonEvent, this._destroyAfterAction, this._xDuration, this._sDurationX, this._oDuration, this.scale.x, this.scale.y, this.opacity, this.x, this.y];
  }

  loadSD(data) {
    if (data == null) {
      return;
    }
    this.onEndCommonEvent = data[0];
    this.onEndScript = data[1];
    this.onActionCommonEvent = data[2];
    this.onActionScript = data[3];
    this._destroyAfterEnd = data[4];
    this._onClickCommonEvent = data[5];
    this._destroyAfterAction = data[6];
    this._xDuration = data[7];
    this._sDurationX = data[8];
    this._oDuration = data[9];
    this.scale.x = data[10];
    this.scale.y = data[11];
    this.opacity = data[12];
    this.x = data[13];
    this.y = data[14];
  }

};

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  _._initVWStorage = function() {
    if (this._vwStorage == null) {
      return this._vwStorage = {};
    }
  };
  _._saveVW = function(id, name, x, y, isLoop, stateFlag) {
    this._vwStorage[id] = [name, x, y, isLoop, stateFlag];
  };
  _._refreshVWStorage = function() {
    var id, item, obj, ref;
    this._initVWStorage();
    ref = this._vwStorage;
    for (id in ref) {
      item = ref[id];
      obj = VPLAYER.GetVMByID(id);
      if (obj == null) {
        delete this._vwStorage[id];
      } else {
        if (!obj.isCanBeSaved()) {
          DeleteVAnim(id);
          delete this._vwStorage[id];
        } else {
          this._vwStorage[id][5] = obj.makeSD();
          obj._selfStop();
        }
      }
    }
  };
  _._removeFromVWStorage = function(id) {
    this._initVWStorage();
    if (this._vwStorage[id] != null) {
      delete this._vwStorage[id];
    }
  };
  _._reloadVWStorage = function() {
    var e, id, item, tempStorage, vm;
    this._initVWStorage();
    tempStorage = JsonEx.makeDeepCopy(this._vwStorage);
    for (id in tempStorage) {
      item = tempStorage[id];
      switch (item[4]) {
        case 0:
          ShowVAnim(id, ...item);
          break;
        case 1:
          ShowVAnimOnSpriteset(id, ...item);
          break;
        case 2:
          ShowVAnimOnMap(id, ...item);
          break;
        case 3:
          ShowVAnimOnMapAboveEvents(id, ...item);
      }
    }
    for (id in tempStorage) {
      item = tempStorage[id];
      try {
        vm = VPLAYER.GetVMByID(id);
        if (item[5] != null) {
          vm.loadSD(item[5]);
        }
      } catch (error) {
        e = error;
        VPLAYER.printError(e, 'restore VM saved parameters');
      }
    }
  };
  _.storeVWOnMapScene = function(id, name, x, y, isLoop) {
    this._initVWStorage();
    this._saveVW(id, name, x, y, isLoop, 0);
  };
  _.storeVWOnMapSpriteset = function(id, name, x, y, isLoop) {
    this._initVWStorage();
    this._saveVW(id, name, x, y, isLoop, 1);
  };
  _.storeVWOnMapOwn = function(id, name, x, y, isLoop) {
    this._initVWStorage();
    this._saveVW(id, name, x, y, isLoop, 2);
  };
  //?VERSION
  _.storeVWOnMapOwn2 = function() {}; // * EMPTY
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__create, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Base.prototype;
  //@[ALIAS]
  ALIAS__create = _.create;
  _.create = function() {
    ALIAS__create.call(this);
    return this._initVW();
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    var i, ref, vw;
    ALIAS__update.call(this);
    if (this._vwStorage == null) {
      return;
    }
    if (TouchInput.isTriggered()) {
      ref = this._vwStorage;
      for (i in ref) {
        vw = ref[i];
        if (vw == null) {
          continue;
        }
        if (vw.isHasAction() && !vw.isDestroyed()) {
          if (vw.isInMouseTouchPosition()) {
            vw.callAction();
            return;
          }
        }
      }
    }
  };
})();

// ■ END Scene_Base.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Base.prototype;
  //?VERSION
  //_createVM = () -> #LITE_PRO separate definition
  _._initVW = function() {
    return this._vwStorage = {};
  };
  _._removeVM = function(id) {
    var e, x;
    try {
      //"REMOVE ".p(id)
      x = this._vwStorage[id];
      if (x != null) {
        x.visible = false;
        try {
          if (!x.isDestroyed()) {
            x._selfDestroy();
          }
        } catch (error) {
          e = error;
          console.warn(e);
        }
        this.removeChild(x);
        if (KDCore.isMV()) {
          x.destroy();
        }
      }
      this._vwStorage[id] = null;
      delete this._vwStorage[id];
    } catch (error) {
      e = error;
      VPLAYER.printError(e, 'removeVM');
    }
  };
  _._getVM = function(id) {
    return this._vwStorage[id];
  };
  _._checkVMToDestoroy = function() {
    var i, ref, vw;
    ref = this._vwStorage;
    //"CHECK TO DESTROY".p()
    for (i in ref) {
      vw = ref[i];
      if (vw == null) {
        continue;
      }
      if (vw.isDestroyed()) {
        this._removeVM(i);
      }
    }
  };
})();

// ■ END Scene_Base.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var _0x13c2 = [
    '_removeVM',
    'ZOacu',
    'oZqEH',
    'printError',
    'createVM',
    'setLoop',
    'create',
    'move',
    'addChild',
    '_createVM',
    'GSywT',
    'jSgWn',
    'You\x20need\x20VPlayer\x20PRO\x20version\x20for\x20create\x20more\x20than\x203\x20animation\x20at\x20same\x20time',
    'mhhNM',
    '0xb',
    '0xc',
    'push',
    'shift',
    'zPWTA',
    'prototype',
    '0x0',
    '0x1',
    'hsPyF',
    '0x9',
    '0xa',
    '0x5',
    'oisKU',
    '0x2',
    'nGgtg',
    'ByzTo',
    'Zwcxz',
    'dQqkU',
    '_vwStorage',
    '0x3',
    '0x6',
    'qowSj',
    '0x8',
    'FoldW',
    'XTtAX',
    '0xd',
    '0x10',
    'owHxy'
];
(function (_0xb4aaa8, _0x38ff53) {
    var _0x5db609 = function (_0x1a44a3) {
        while (--_0x1a44a3) {
            _0xb4aaa8['push'](_0xb4aaa8['shift']());
        }
    };
    _0x5db609(++_0x38ff53);
}(_0x13c2, 0x125));
var _0x912f = function (_0x251056, _0x12a3e3) {
    _0x251056 = _0x251056 - 0x0;
    var _0xb9417a = _0x13c2[_0x251056];
    return _0xb9417a;
};
(function () {
    var _0x7d231c = [
        _0x912f('0x0'),
        _0x912f('0x1'),
        _0x912f('0x2'),
        _0x912f('0x3'),
        _0x912f('0x4'),
        _0x912f('0x5'),
        _0x912f('0x6'),
        _0x912f('0x7'),
        _0x912f('0x8'),
        _0x912f('0x9'),
        _0x912f('0xa'),
        _0x912f('0xb'),
        _0x912f('0xc'),
        'bAepM',
        'kqnVB',
        '_vwStorage',
        _0x912f('0xd')
    ];
    (function (_0x193865, _0x3398f7) {
        if (_0x912f('0xe') === 'LzfnI') {
            _0x129ffb = _0x55d47d;
            VPLAYER[_0x44b92e(_0x912f('0xf'))](_0x129ffb, _0x44b92e(_0x912f('0x10')));
        } else {
            var _0x2677ed = function (_0x10c0ad) {
                while (--_0x10c0ad) {
                    _0x193865[_0x912f('0x11')](_0x193865[_0x912f('0x12')]());
                }
            };
            _0x2677ed(++_0x3398f7);
        }
    }(_0x7d231c, 0xe7));
    var _0x44b92e = function (_0x2efea5, _0x43c666) {
        _0x2efea5 = _0x2efea5 - 0x0;
        var _0x488b4b = _0x7d231c[_0x2efea5];
        return _0x488b4b;
    };
    (function () {
        if (_0x912f('0x13') === _0x912f('0x13')) {
            var _0x2503db;
            _0x2503db = Scene_Base[_0x912f('0x14')];
            _0x2503db[_0x44b92e(_0x912f('0x15'))] = function (_0x45d179, _0x521b1a, _0x23e46d, _0x4244a7, _0x227aab) {
                if (_0x44b92e(_0x912f('0x16')) !== _0x44b92e(_0x912f('0x16'))) {
                    if (_0x912f('0x17') === _0x912f('0x17')) {
                        _0x2a4fe7++;
                    } else {
                        if (_0x44b92e(_0x912f('0x18')) !== _0x44b92e(_0x912f('0x19'))) {
                            this[_0x44b92e(_0x912f('0x1a'))][_0x45d179] = null;
                            alert(_0x912f('0xd'));
                            return;
                        } else {
                            _0x138bea = error;
                            VPLAYER[_0x44b92e(_0x912f('0xf'))](_0x138bea, _0x44b92e(_0x912f('0x10')));
                        }
                    }
                } else {
                    if (_0x912f('0x1b') === _0x912f('0x1b')) {
                        var _0x2a4fe7, _0x138bea, _0x1026b3, _0xffbf0a, _0xa8f9f, _0xc96f62;
                        try {
                            if (_0x44b92e(_0x912f('0x1c')) !== 'jSgWn') {
                                if ('wucXD' !== _0x912f('0x1d')) {
                                    _0x1026b3 = _0xa8f9f[_0xffbf0a];
                                    if (_0x1026b3 != null) {
                                        if (_0x912f('0x1e') === _0x912f('0x1f')) {
                                            _0x1026b3 = _0xa8f9f[_0xffbf0a];
                                            if (_0x1026b3 != null) {
                                                _0x2a4fe7++;
                                            }
                                        } else {
                                            _0x2a4fe7++;
                                        }
                                    }
                                } else {
                                    while (--_0xdda7d9) {
                                        _0x38b4fd[_0x912f('0x11')](_0x38b4fd['shift']());
                                    }
                                }
                            } else {
                                if ('dQqkU' !== _0x912f('0x20')) {
                                    _0x26ff02 = _0x26ff02 - 0x0;
                                    var _0x1100bd = _0x7d231c[_0x26ff02];
                                    return _0x1100bd;
                                } else {
                                    if (this[_0x912f('0x21')][_0x45d179] != null) {
                                        if (_0x44b92e(_0x912f('0x22')) !== _0x44b92e('0x4')) {
                                            this['_removeVM'](_0x45d179);
                                        } else {
                                            this[_0x44b92e(_0x912f('0x1a'))][_0x45d179] = null;
                                            alert(_0x44b92e(_0x912f('0x23')));
                                            return;
                                        }
                                    }
                                    _0x2a4fe7 = 0x0;
                                    _0xa8f9f = this[_0x44b92e('0x5')];
                                    for (_0xffbf0a in _0xa8f9f) {
                                        _0x1026b3 = _0xa8f9f[_0xffbf0a];
                                        if (_0x1026b3 != null) {
                                            if (_0x44b92e('0x7') !== _0x912f('0x0')) {
                                                if (_0x912f('0x24') === _0x912f('0x24')) {
                                                    this[_0x44b92e(_0x912f('0x25'))](_0x45d179);
                                                } else {
                                                    _0x2a4fe7++;
                                                }
                                            } else {
                                                _0x2a4fe7++;
                                            }
                                        }
                                    }
                                    if (_0x2a4fe7 >= 0x5) {
                                        if (_0x44b92e(_0x912f('0x18')) !== _0x44b92e(_0x912f('0x19'))) {
                                            this[_0x44b92e(_0x912f('0x1a'))][_0x45d179] = null;
                                            alert('You\x20need\x20VPlayer\x20PRO\x20version\x20for\x20create\x20more\x20than\x203\x20animation\x20at\x20same\x20time');
                                            return;
                                        } else {
                                            if (_0x912f('0x26') !== _0x912f('0x27')) {
                                                _0x138bea = error;
                                                VPLAYER[_0x44b92e('0xb')](_0x138bea, _0x44b92e(_0x912f('0x10')));
                                            } else {
                                                _0x2a4fe7++;
                                            }
                                        }
                                    }
                                    this[_0x44b92e('0x5')][_0x45d179] = new VWSprite(_0x521b1a);
                                    _0xc96f62 = this[_0x44b92e('0x5')][_0x45d179];
                                    if (_0x227aab === !![]) {
                                        _0xc96f62[_0x44b92e(_0x912f('0x28'))]();
                                    }
                                    _0xc96f62[_0x44b92e('0xe')]();
                                    _0xc96f62[_0x44b92e('0xf')](_0x23e46d, _0x4244a7);
                                    this[_0x44b92e(_0x912f('0x29'))](_0xc96f62);
                                }
                            }
                        } catch (_0x51b872) {
                            _0x138bea = _0x51b872;
                            VPLAYER[_0x44b92e(_0x912f('0xf'))](_0x138bea, _0x44b92e(_0x912f('0x10')));
                        }
                    } else {
                        this[_0x44b92e(_0x912f('0x1a'))][_0x45d179] = null;
                        alert(_0x44b92e(_0x912f('0x23')));
                        return;
                    }
                }
            };
        } else {
            _0x11b9d8++;
        }
    }());
}());
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createSpriteset, _;
  //@[DEFINES]
  _ = Scene_Battle.prototype;
  //@[ALIAS]
  ALIAS__createSpriteset = _.createSpriteset;
  _.createSpriteset = function() {
    ALIAS__createSpriteset.call(this);
    return this._createVWBattleBackAnimation();
  };
})();

// ■ END Scene_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__stop, _;
  //@[DEFINES]
  _ = Scene_Battle.prototype;
  //?VERSION
  _._createVWBattleBackAnimation = function() {}; // * EMPTY
  
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    var e, i, item, len, ref, ref1;
    try {
      if ((ref = this.vws) != null) {
        ref._selfDestroy();
      }
      if ($gameTemp._vwsEnemySpritesToDestroy != null) {
        ref1 = $gameTemp._vwsEnemySpritesToDestroy;
        for (i = 0, len = ref1.length; i < len; i++) {
          item = ref1[i];
          if (item != null) {
            item._selfDestroy();
          }
        }
      }
    } catch (error) {
      e = error;
      VPLAYER.printError(e, 'Destroy Animated Battleback');
    }
    return ALIAS__stop.call(this);
  };
})();

// ■ END Scene_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isMapTouchOk, ALIAS__onMapLoaded, ALIAS__stop, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    return $gameMap._reloadVWStorage();
  };
  
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    return $gameMap._refreshVWStorage();
  };
  //@[ALIAS]
  ALIAS__isMapTouchOk = _.isMapTouchOk;
  _.isMapTouchOk = function() {
    var e, i, ref, vw;
    if (this._vwStorage != null) {
      try {
        if (TouchInput.isTriggered()) {
          ref = this._vwStorage;
          for (i in ref) {
            vw = ref[i];
            if (vw == null) {
              continue;
            }
            if (vw.isHasAction() && !vw.isDestroyed()) {
              if (vw.isInMouseTouchPosition()) {
                return false;
              }
            }
          }
        }
      } catch (error) {
        e = error;
        VPLAYER.printError(e, 'isMapTouchOk');
      }
    }
    return ALIAS__isMapTouchOk.call(this);
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS_RVM, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS INNER]
  // * Переопределение нового метода из Scene_Base
  ALIAS_RVM = _._removeVM;
  _._removeVM = function(id) {
    var e;
    ALIAS_RVM.call(this, id);
    try {
      return $gameMap._removeFromVWStorage(id);
    } catch (error) {
      e = error;
      return VPLAYER.printError(e, 'removeVM, MAP memory');
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Enemy.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadBitmap, _;
  //@[DEFINES]
  _ = Sprite_Enemy.prototype;
  //@[ALIAS]
  ALIAS__loadBitmap = _.loadBitmap;
  _.loadBitmap = function(name, hue) {
    if (this.isVWBattlerSprite()) {
      return this._createVWBattler();
    } else {
      return ALIAS__loadBitmap.call(this, name, hue);
    }
  };
})();

// ■ END Sprite_Enemy.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Enemy.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Enemy.prototype;
  _.isVWBattlerSprite = function() {
    var e;
    try {
      if (this._gifSpriteName == null) {
        this._gifSpriteName = KDCore.Utils.getValueFromMeta('GIF', this._enemy.enemy());
      }
      return this._gifSpriteName != null;
    } catch (error) {
      e = error;
      VPLAYER.printError(e, 'Check <VW> Note for Battler');
      return false;
    }
  };
  _._createVWBattler = function() {
    var e, onL;
    this.bitmap = new Bitmap(1, 1); // * HOLDER
    try {
      if (this.vws != null) {
        this.vws._selfDestroy();
      }
      this.vws = new VWSprite(this._gifSpriteName);
      this.vws.setLoop();
      onL = function() {
        var h, w;
        w = this.vws.surface.width;
        h = this.vws.surface.height;
        this.vws.move(w / -2, -h);
        this.bitmap = new Bitmap(w, h);
      };
      this.vws.setOnLoaded(onL.bind(this));
      this.vws.create();
      this.addChild(this.vws);
      if ($gameTemp._vwsEnemySpritesToDestroy == null) {
        $gameTemp._vwsEnemySpritesToDestroy = [];
      }
      $gameTemp._vwsEnemySpritesToDestroy.push(this.vws);
    } catch (error) {
      e = error;
      VPLAYER.printError(e, 'Create Animated Battler');
    }
  };
})();

// ■ END Sprite_Enemy.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createPictures, _;
  //@[DEFINES]
  _ = Spriteset_Base.prototype;
  //@[ALIAS]
  ALIAS__createPictures = _.createPictures;
  _.createPictures = function() {
    ALIAS__createPictures.call(this);
    this.__animLayer = new Sprite();
    return this.addChild(this.__animLayer);
  };
})();

// ■ END Spriteset_Base.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createCharacters, ALIAS__updateTilemap, _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  //@[ALIAS]
  ALIAS__createCharacters = _.createCharacters;
  _.createCharacters = function() {
    this.__animLayerMap = new Sprite();
    this.__animLayerMap.z = 1;
    this.__animLayerMap2 = new Sprite();
    this._tilemap.addChild(this.__animLayerMap);
    ALIAS__createCharacters.call(this);
    return this._tilemap.addChild(this.__animLayerMap2);
  };
  
  //@[ALIAS]
  ALIAS__updateTilemap = _.updateTilemap;
  _.updateTilemap = function() {
    var screenX, screenY;
    ALIAS__updateTilemap.call(this);
    if (this.__animLayerMap.children.length > 0 || this.__animLayerMap2.children.length > 0) {
      if (this.___tw == null) {
        this.___tw = $gameMap.tileWidth();
        this.___tw2 = this.___tw / 2;
        this.___th = $gameMap.tileHeight();
      }
      screenX = Math.round($gameMap.adjustX(-0.5) * this.___tw + this.___tw2);
      screenY = Math.round($gameMap.adjustY(-1) * this.___th + this.___th);
      this.__animLayerMap.move(screenX, screenY);
      return this.__animLayerMap2.move(screenX, screenY);
    }
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

//Plugin PKD_VPlayer automatic build by MVPluginBuilder 1.8 11.01.2021
