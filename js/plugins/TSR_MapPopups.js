//===========================================================================
//=== TSR_MapPopups === A Plugin by The Northern Frog =======================
//===========================================================================

var TSR = TSR || {};
TSR.mapPopups = TSR.mapPopups || {};
TSR.mapPopups.version = 1.38;
TSR.mapPopups.pluginName = 'TSR_MapPopups';

var Imported = Imported || {};
Imported[TSR.mapPopups.pluginName] = true;

//===========================================================================

/*:
 * @target MZ
 * @plugindesc v1.3.8 This Plugin add popups on the map to show text, items,
 *                    gold or damage/recovery.
 * @author TSR, The Northern Frog, 2021      
 * @help 
 * ==========================================================================
 * == About this Plugin =====================================================
 * ==========================================================================
 * Use the following Plugin Commands to display map popups.
 * 
 *     -START TEXT POPUP
 *              Text: The text to be displayed by the popup.
 *                      *You can use the following escape characters
 *                       in text popups: \V[x], \N[x], \P[x] and \G
 * 
 *            Target: The event Id of the target on which the popup will
 *                    show (set it to 0 for targeting the Player).
 *        Text color: The text color code to change the color of the 
 *                    popup text.
 * 
 *     -START ITEM POPUP
 *            Target: The event Id of the target on which the popup will
 *                    show (set it to 0 for targeting the Player).
 *          Category: The item category (Items, Weapons or Armors).
 *           Item Id: The database Id of the item.
 *          Quantity: The quantity displayed with the item.
 *        Text color: The text color code to change the color of the 
 *                    popup text.
 *      Apply effect: When set to true, the plugin will make the change
 *                    in the inventory in addition to showing the popup.
 * 
 *     -START GOLD POPUP
 *            Target: The event Id of the target on which the popup will
 *                    show (set it to 0 for targeting the Player).
 *            Amount: The amount of gold to be displayed by the popup.
 *        Text color: The text color code to change the color of the 
 *                    popup text.
 *              Icon: The icon index of you gold icon, if any.
 *                    (leave it to 0 if none)
 *      Apply effect: When set to true, the plugin will make the change
 *                    in the party gold in addition to showing the popup.
 * 
 *     -START DAMAGE POPUP
 *            Target: The event Id of the target on which the popup will
 *                    show (set it to 0 for targeting the Player).
 *       Damage type: The damage type. This change the text color, and
 *                    will be use as suffix if you use that option.
 *      Damage value: The value that is to be displayed by the popup.
 *                    Use negatives values for recovery popups. This will
 *                    change the text color accordingly.
 *                          *you can use the escape code \V[x] to set
 *                           the damage to a variable value
 * 
 *      Apply effect: When set to true, the plugin will make the change
 *                    to party status in addition to showing the popup.
 *                    (no effect on events)
 *      Affect party: When set to true, the effect will affect the whole
 *                    party, not just the player (Apply effect must be true).
 * 
 * 
 * 
 * POPUPS DURATION
 * ===============
 * The default duration of the map popups is 60 frames. This can be changed
 * for all popups within the parameters. Alternatively, all popups commands
 * have the 'Duration' argument. This argument will overwrite the setting
 * in the parameters so you can set specific duration for eacb popups.
 * 
 *  *The minimal value for popups duration is 60 frames, because anything
 *   bellow that doesn't look good.
 * 
 * 
 * 
 * POPUPS POSITION
 * ===============
 * Map popups will appear just above their targeted characters. This is
 * meant for default 48x48 images. If you're using images of a different
 * size, you may want to change the popups position. This can be done
 * in the general parameters (see next section), or by setting specific
 * offset for each popups through the plugin commands.
 * 
 * In addition to the above, all popups have the followings commands:
 * 
 *       Position X: set the horizontal offset* in pixel, relative to
 *                   the targeted character position.
 *  
 *       Position Y: set the vertical offset* in pixel, relative to
 *                   the targeted character position.
 * 
 * 
 *    *the value entered in the commands are offset values. To make
 *     the popup appear at an absolute position on the screen, use
 *     the keyword 'pos' along with the value.
 * 
 *          Example:
 *            
 *             Position X: 100
 * 
 *                  The above will make the popup appear 100 pixels
 *                  on the right of the targeted character.
 * 
 *             Position X: pos 100
 * 
 *                  Adding 'pos' with the value will make the popup
 *                  appear at 100 pixels from the left of the screen.
 *                  You can add 'pos' before or after the value, and
 *                  white spaces doesn't matter.
 * 
 * 
 *    **The position values entered in the plugin command will overide
 *      the position settings of the general parameters, if any.
 *   
 *         
 * 
 * PLUGIN PARAMETERS
 * =================
 * Set the following parameters to your liking in the Plugin Manager.
 * 
 *     -POPUPS OFFSET X
 *         Add an horizontal offset in pixels to all popups. This
 *         is relative to the targeted event/player position. 
 * 
 *     -POPUPS OFFSET Y
 *         Add a vertical offset in pixels to all popups. This
 *         is relative to the targeted event/player position.
 * 
 *     -SHOW CURRENCY UNIT
 *         Show the default currency unit in gold popups?
 * 
 *     -CURRENCY ABBREVIATION
 *         Enter the currency abbreviation to be used in the gold
 *         popups if your currency unit name in the database is too
 *         long. Leave that parameter blank to use the database cur-
 *         rency unit as is.
 * 
 *     -DAMAGE POPUP PREFIX
 *         Show an operator in front of the value of damage popups
 *         to indicate gain or loss?
 * 
 *     -DAMAGE POPUP SUFFIX
 *         Show the damage type following the value of damage popups?
 * 
 * 
 * 
 * AUTO ITEM POPUPS
 * ================
 * When this parameter is set to true, item popups will show auto-
 * matically when you use the event command 'Change Item' to add
 * or remove items from the party inventory. No matter how you set
 * the parameters, you can always toggle on and off this feature with
 * the following script call:
 * 
 *          $gamePlayer.setAutoItemPopups(set)
 * 
 *              *replace 'set' by true or false.
 * 
 *      ITEM COLOR TAGS
 *      ===============
 *      When using the 'Auto Item Popup' feature, the plugin will check
 *      for color meta tag in the Items database noteboxes to assign
 *      text color for the auto popups. The colors set in the tag can
 *      be either one of the default window colors (1 to 31), or an hex
 *      value. If there's no color meta tags, the color will be 0 (white).
 * 
 * 
 * 
 * AUTO GOLD POPUPS
 * ================
 * When this parameter is set to true, gold popups will show auto-
 * matically when you use the event command 'Change Gold' to add or
 * remove gold from the party. There's a parameter to set the text
 * color and icon index of the auto gold popups. No matter how you
 * set the parameters, you can always toggle on and off this feature 
 * with the following script call:
 * 
 *          $gamePlayer.setAutoGoldPopups(set)
 * 
 *              *replace 'set' by true or false.
 *
 * 
 * 
 * AUTO EXP POPUPS
 * ================
 * When this parameter is set to true, a text popup will show auto-
 * matically when you use the event command 'Change Exp'. There's a 
 * parameter to set the text color of the auto exp popups. If the 
 * gain/loss of exp leads to a level up or down, an additional popup
 * will show the gain/loss in levels. No matter how you set the 
 * parameters, you can always toggle on and off this feature  with 
 * the following script call:
 * 
 *          $gamePlayer.setAutoGoldPopups(set)
 * 
 *              *replace 'set' by true or false.
 * 
 * 
 * DAMAGE POPUPS MOTION
 * ====================
 * When this parameter is turned ON, the damage popups will move in
 * a similar way than the default damage popups in battle (each digits
 * makes a short drop, than tilt a bit and fade out). You can turn this
 * parameter OFF if you want the damage popups to move like other map 
 * popups of this plugin (digits makes a drop, tilt, than rise up as 
 * they fade out).
 * 
 * 
 * 
 * SCRIPT CALLS
 * ============
 * Alternatively, those script calls can be used:
 * 
 *   **character can be either $gamePlayer or $gameMap._events[eventId]
 *   **to target a specific follower, use: $gamePlayer.followers().follower(index)
 * 
 *     -character.startTextPopup(text, color)
 *             text: Text to be displayed
 *            color: Text color code       
 * 
 *     -character.startItemPopup(category, itemId, quantity, color, goldIndex, apEffect)
 *         category: Item category ('ITEMS', 'WEAPONS' or 'ARMORS')
 *           itemId: Item Id in the database
 *         quantity: Quantity of the item
 *            color: Text color code
 *        goldIndex: Gold icon index
 *         apEffect: Apply the change to party inventory
 * 
 *              *For gold popups, use the same call and set itemId to 0, and
 *               set any category.
 * 
 *     -character.startDamageMapPopup(type, value, apEffect, affectAll) 
 *             type: Damage type ('hp', 'mp' or 'tp')
 *            value: Damage value. Use positive values for damages, and
 *                   negatives values for recovery. You can use \V[x]
 *                   to assign a variable value as damage
 *         apEffect: Apply the change to party inventory
 *        affectAll: Apply effect to the whole party (apEffect must be true)
 * 
 * 
 * 
 * =========================================================================
 * == Term of Usage ========================================================
 * =========================================================================
 * 
 * Use in any independant RPG Maker MZ projects, including commercials.
 *
 * Credit is required for using this Plugin. 
 * For crediting, use 'TSR' along with one of
 * the following terms: 
 *      'The Northern Frog' or 'A frog from the north'
 * 
 * Do not change the Header or the Terms of usage.
 *
 * DO NOT REDISTRIBUTE!
 * If you want to share it, share the link to my itch.io account: 
 * https://the-northern-frog.itch.io/
 * 
 *
 * ==========================================================================
 * == Dev Log ===============================================================
 * ==========================================================================
 * 12/02/21 completed plugin,                                     v1.00
 * 14/02/21 add 'apply effect' and 'affect all' arguments,        v1.01
 * 08/08/21 add escape characters for text popups,                v1.02
 * 15/08/21 add currency abbreviation and accord damage popups
 *          suffixes to the TextManager entries and positions
 *          parameters for popups,                                v1.12
 * 02/09/21 add the popup duration parameter and command argument v1.22
 * 23/09/21 add the auto item popup feature and item meta colors  v1.23
 * 24/09/21 fix problem with item meta colors                     v1.24
 * 26/09/21 add the option to target the calling event itself     v1.25
 * 28/09/21 add the auto popups feature to gold and exp           v1.35
 * 29/09/21 change the damage popups motion                       v1.36
 * 01/10/21 fix damage popups stacking up                         v1.37
 * 14/10/21 fix stacking up of non auto popups                    v1.38
 * 
 * ==========================================================================
 * == END ===================================================================                                           
 * ==========================================================================
 *
 *                              "Have fun!"
 *                                                  TSR, The Northern Frog
 *
 * ==========================================================================
 *
 * @param ---General---
 *
 * @param Popups Duration
 * @parent ---General---
 * @type number
 * @min 60
 * @desc Enter the duration of all popups in frames.
 * Default: 60
 * @default 60
 * 
 * @param Popups Offset X
 * @parent ---General---
 * @desc Enter the horizontal offset for all popups.
 * @default
 * 
 * @param Popups Offset Y
 * @parent ---General---
 * @desc Enter the vertical offset for all popups.
 * @default
 * 
 * @param Show Currency Unit
 * @parent ---General---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Show currency unit in gold popups?
 * OFF - false  ON - true
 * @default true
 * 
 * @param Currency Abbreviation
 * @parent ---General---
 * @desc Enter the currency abbreviation for the gold popups.
 * Leave it blank to use the database currency unit entry.
 * @default
 * 
 * @param Damage Popups Prefix
 * @parent ---General---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Show an operator (+ or -) before damage/recovery popups?
 * OFF - false  ON - true
 * @default true
 * 
 * @param Damage Popups Suffix
 * @parent ---General---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Show the damage type after the damage values?
 * OFF - false  ON - true
 * @default true
 * 
 * 
 * @param ---Item Popups---
 * 
 * @param Auto Item Popups
 * @parent ---Item Popups---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Enable auto item popups with the Change Items event command?
 * OFF - false  ON - true
 * @default false
 *   
 *
 * @param ---Gold Popups---
 * 
 * @param Auto Gold Popups
 * @parent ---Gold Popups---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Enable auto gold popups with the Change Gold event command?
 * OFF - false  ON - true
 * @default false
 * 
 * @param Auto Gold Color
 * @parent ---Gold Popups---
 * @type number
 * @min 0
 * @desc Enter the text color for gold popups.
 * Default: 0
 * @default 0
 * 
 * @param Auto Gold Icon
 * @parent ---Gold Popups---
 * @type number
 * @min 0
 * @desc Enter the icon index for gold popups (0 for none).
 * Default: 0
 * @default 0
 * 
 * 
 * @param ---Exp Popups---
 * 
 * @param Auto Exp Popups
 * @parent ---Exp Popups---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Enable auto exp popups with the Change Exp event command?
 * OFF - false  ON - true
 * @default false
 * 
 * @param Exp Color
 * @parent ---Exp Popups---
 * @type number
 * @min 0
 * @desc Enter the text color for exp popups.
 * Default: 0
 * @default 0
 * 
 * 
 * @param ---Damage Popups---
 * 
 * @param Damage Motion
 * @parent ---Damage Popups---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Enable the damage motion for damage opups digits?
 * OFF - false  ON - true
 * @default true
 * 
 * 
 * @command text
 * @text Start text popup
 * @desc Create a map popup with some text.
 * @min -1
 * @arg text
 * @default
 * @text Map popup text
 * @desc Set the text of the map popup.
 * 
 * @arg target
 * @type number
 * @min 0
 * @default 0
 * @text Target event Id
 * @desc Set the event Id of the target (0 for player).
 * 
 * @arg color
 * @type number
 * @min 0
 * @default 0
 * @text Text Color
 * @desc Set the text color of the popup.
 *
 * @arg duration
 * @type number
 * @min 0
 * @default
 * @text Popup Duration
 * @desc Set the duration of the popup (overwrite the parameter setting).
 * 
 * @arg posX
 * @default
 * @text Position X
 * @desc Set the horizontal position of the popup.
 * 
 * @arg posY
 * @default
 * @text Position Y
 * @desc Set the vertical position of the popup.
 * 
 * 
 * @command item
 * @text Start item popup
 * @desc Create a map popup that show an item name, icon and quantity.
 *
 * @arg target
 * @type number
 * @min -1
 * @default 0
 * @text Target event Id
 * @desc Set the event Id of the target (0 for player).
 * 
 * @arg category
 * @type combo
 * @option Items
 * @option Weapons
 * @option Armors
 * @default Items
 * @text Item category
 * @desc Set the category of the item popup.
 * 
 * @arg itemId
 * @type number
 * @min 1
 * @default 1
 * @text Item Id
 * @desc Set the database id of the item.
 * 
 * @arg quantity
 * @type number
 * @min -99
 * @max 99
 * @default 1
 * @text Item quantity
 * @desc Set the quantity of the item.
 *
 * @arg color
 * @type number
 * @min 0
 * @default 0
 * @text Text Color
 * @desc Set the text color of the popup.
 * 
 * @arg effect
 * @type boolean
 * @on ON
 * @off OFF
 * @text Apply effect
 * @desc Apply item quantity changes on party inventory?
 * OFF - false  ON - true
 * @default true
 * 
 * @arg duration
 * @type number
 * @min 0
 * @default
 * @text Popup Duration
 * @desc Set the duration of the popup (overwrite the parameter setting).
 * 
 * @arg posX
 * @default
 * @text Position X
 * @desc Set the horizontal position of the popup.
 * 
 * @arg posY
 * @default
 * @text Position Y
 * @desc Set the vertical position of the popup.
 * 
 * 
 * @command gold
 * @text Start gold popup
 * @desc Create a gold popup.
 *
 * @arg target
 * @type number
 * @min -1
 * @default 0
 * @text Target event Id
 * @desc Set the event Id of the target (0 for player).
 * 
 * @arg value
 * @type number
 * @min -999999
 * @default 1
 * @text Gold amount
 * @desc Set the amount of gold to show in the popup.
 * 
 * @arg color
 * @type number
 * @min 0
 * @default 0
 * @text Text Color
 * @desc Set the text color of the popup.
 * 
 * @arg icon
 * @type number
 * @min 0
 * @default 0
 * @text Gold icon
 * @desc Set the icon index for gold icon (0 for none).
 * 
 * @arg effect
 * @type boolean
 * @on ON
 * @off OFF
 * @text Apply effect
 * @desc Apply changes on party gold?
 * OFF - false  ON - true
 * @default true
 * 
 * @arg duration
 * @type number
 * @min 0
 * @default
 * @text Popup Duration
 * @desc Set the duration of the popup (overwrite the parameter setting).
 * 
 * @arg posX
 * @default
 * @text Position X
 * @desc Set the horizontal position of the popup.
 * 
 * @arg posY
 * @default
 * @text Position Y
 * @desc Set the vertical position of the popup.
 * 
 * 
 * @command damage
 * @text Start damage popup
 * @desc Create a map damage popup.
 *
 * @arg target
 * @type number
 * @min -1
 * @default 0
 * @text Target event Id
 * @desc Set the event Id of the target (0 for player).
 * 
* @arg category
 * @type combo
 * @option hp
 * @option mp
 * @option tp
 * @default hp
 * @text Damage type
 * @desc Set the damage type of the popup.
 * 
 * @arg value
 * @default 1
 * @text Damage value
 * @desc Set the amount of damage to show. (negative values for recovery)
 * 
 * @arg effect
 * @type boolean
 * @on ON
 * @off OFF
 * @text Apply effect
 * @desc Apply changes on Player?
 * OFF - false  ON - true
 * @default true
 * 
 * @arg all
 * @type boolean
 * @on ON
 * @off OFF
 * @text Affect all
 * @desc Apply changes on whole party?
 * OFF - false  ON - true
 * @default false
 * 
 * @arg duration
 * @type number
 * @min 0
 * @default
 * @text Popup Duration
 * @desc Set the duration of the popup (overwrite the parameter setting).
 * 
 * @arg posX
 * @default
 * @text Position X
 * @desc Set the horizontal position of the popup.
 * 
 * @arg posY
 * @default
 * @text Position Y
 * @desc Set the vertical position of the popup.
 * 
 * 
 */

(() => {
const _0x52d9b6=_0x48ad;(function(_0x30ba43,_0x371bf0){const _0x2aa908=_0x48ad,_0x1847c9=_0x30ba43();while(!![]){try{const _0x3e214b=parseInt(_0x2aa908(0x21d))/0x1*(-parseInt(_0x2aa908(0x222))/0x2)+-parseInt(_0x2aa908(0x1f9))/0x3+-parseInt(_0x2aa908(0x242))/0x4*(parseInt(_0x2aa908(0x20f))/0x5)+parseInt(_0x2aa908(0x207))/0x6+-parseInt(_0x2aa908(0x1be))/0x7+parseInt(_0x2aa908(0x26b))/0x8+-parseInt(_0x2aa908(0x23e))/0x9*(-parseInt(_0x2aa908(0x228))/0xa);if(_0x3e214b===_0x371bf0)break;else _0x1847c9['push'](_0x1847c9['shift']());}catch(_0x3d8130){_0x1847c9['push'](_0x1847c9['shift']());}}}(_0x308c,0x2e307),TSR[_0x52d9b6(0x203)]=PluginManager[_0x52d9b6(0x244)](TSR['mapPopups'][_0x52d9b6(0x1c2)]),TSR[_0x52d9b6(0x211)][_0x52d9b6(0x1bb)]=Number(TSR[_0x52d9b6(0x203)][_0x52d9b6(0x1d2)])||0x3c,TSR[_0x52d9b6(0x211)][_0x52d9b6(0x1bd)]=String(TSR[_0x52d9b6(0x203)]['Popups\x20Offset\x20X'])||null,TSR[_0x52d9b6(0x211)]['_offsetY']=String(TSR['Parameters'][_0x52d9b6(0x23a)])||null,TSR['mapPopups'][_0x52d9b6(0x231)]=String(TSR[_0x52d9b6(0x203)][_0x52d9b6(0x1ed)])||null,TSR[_0x52d9b6(0x211)]['_currencyUnit']=eval(String(TSR[_0x52d9b6(0x203)][_0x52d9b6(0x1f4)])),TSR[_0x52d9b6(0x211)][_0x52d9b6(0x231)]=String(TSR[_0x52d9b6(0x203)]['Currency\x20Abbreviation'])||null,TSR[_0x52d9b6(0x211)][_0x52d9b6(0x252)]=eval(String(TSR[_0x52d9b6(0x203)]['Damage\x20Popups\x20Prefix'])),TSR[_0x52d9b6(0x211)][_0x52d9b6(0x24c)]=eval(String(TSR['Parameters'][_0x52d9b6(0x1b7)])),TSR[_0x52d9b6(0x211)][_0x52d9b6(0x251)]=eval(String(TSR[_0x52d9b6(0x203)][_0x52d9b6(0x239)])),TSR[_0x52d9b6(0x211)][_0x52d9b6(0x1ff)]=eval(String(TSR[_0x52d9b6(0x203)][_0x52d9b6(0x1e0)])),TSR[_0x52d9b6(0x211)]['_autoGoldColor']=Number(TSR[_0x52d9b6(0x203)][_0x52d9b6(0x1db)])||0x0,TSR[_0x52d9b6(0x211)][_0x52d9b6(0x1fe)]=Number(TSR[_0x52d9b6(0x203)]['Auto\x20Gold\x20Icon'])||0x0,TSR[_0x52d9b6(0x211)][_0x52d9b6(0x24d)]=eval(String(TSR[_0x52d9b6(0x203)]['Auto\x20Exp\x20Popups'])),TSR[_0x52d9b6(0x211)][_0x52d9b6(0x1fd)]=Number(TSR[_0x52d9b6(0x203)][_0x52d9b6(0x1c5)])||0x0,TSR[_0x52d9b6(0x211)]['_damageMotion']=eval(String(TSR[_0x52d9b6(0x203)][_0x52d9b6(0x21c)])),PluginManager[_0x52d9b6(0x1ba)](TSR['mapPopups'][_0x52d9b6(0x1c2)],_0x52d9b6(0x212),_0x1feb43=>{const _0x27f968=_0x52d9b6,_0x45c959=String(_0x1feb43[_0x27f968(0x212)]),_0x14db5e=Number(_0x1feb43[_0x27f968(0x21b)])<0x0?$gameMap['_interpreter'][_0x27f968(0x25f)]:Number(_0x1feb43['target']),_0x9b56cc=Number(_0x1feb43['color']),_0x193983=Number(_0x1feb43[_0x27f968(0x1d0)])||TSR[_0x27f968(0x211)][_0x27f968(0x1bb)],_0x3450e9=String(_0x1feb43[_0x27f968(0x21f)]),_0x4d12b0=String(_0x1feb43[_0x27f968(0x1f3)]);let _0x52cfdd=_0x14db5e?$gameMap['_events'][_0x14db5e]:$gamePlayer;_0x52cfdd[_0x27f968(0x269)](_0x45c959,_0x9b56cc,_0x193983,_0x3450e9,_0x4d12b0);}),PluginManager[_0x52d9b6(0x1ba)](TSR[_0x52d9b6(0x211)][_0x52d9b6(0x1c2)],_0x52d9b6(0x1da),_0x1796d4=>{const _0x57095b=_0x52d9b6,_0x34b4cc=Number(_0x1796d4[_0x57095b(0x26c)]),_0x4e58ef=Number(_0x1796d4['quantity']),_0x3fd9db=String(_0x1796d4[_0x57095b(0x219)]),_0x1d5af9=Number(_0x1796d4['color']),_0x12e5da=eval(String(_0x1796d4[_0x57095b(0x1e2)])),_0x566b38=Number(_0x1796d4[_0x57095b(0x21b)])<0x0?$gameMap[_0x57095b(0x258)][_0x57095b(0x25f)]:Number(_0x1796d4[_0x57095b(0x21b)]),_0x26765d=Number(_0x1796d4['duration'])||TSR[_0x57095b(0x211)][_0x57095b(0x1bb)],_0x34123d=String(_0x1796d4[_0x57095b(0x21f)]),_0x196cec=String(_0x1796d4[_0x57095b(0x1f3)]);let _0x508339=_0x566b38?$gameMap[_0x57095b(0x208)][_0x566b38]:$gamePlayer;_0x508339['startItemPopup'](_0x3fd9db,_0x34b4cc,_0x4e58ef,_0x1d5af9,0x0,_0x12e5da,_0x26765d,_0x34123d,_0x196cec);}),PluginManager['registerCommand'](TSR[_0x52d9b6(0x211)]['pluginName'],_0x52d9b6(0x1dd),_0x391959=>{const _0x258dfa=_0x52d9b6,_0x2a2788=0x0,_0x47ebbe=Number(_0x391959[_0x258dfa(0x24b)]),_0x3865fe=_0x258dfa(0x240),_0x35ddd3=Number(_0x391959[_0x258dfa(0x24e)]),_0x12fe15=Number(_0x391959[_0x258dfa(0x1c8)]),_0x4b4840=eval(String(_0x391959[_0x258dfa(0x1e2)])),_0x4ac3bc=Number(_0x391959['target'])<0x0?$gameMap[_0x258dfa(0x258)]['_eventId']:Number(_0x391959[_0x258dfa(0x21b)]),_0x15a814=Number(_0x391959[_0x258dfa(0x1d0)])||TSR[_0x258dfa(0x211)][_0x258dfa(0x1bb)],_0x5ddc86=String(_0x391959['posX']),_0x3cdc38=String(_0x391959[_0x258dfa(0x1f3)]);let _0x3ef994=_0x4ac3bc?$gameMap[_0x258dfa(0x208)][_0x4ac3bc]:$gamePlayer;_0x3ef994[_0x258dfa(0x232)](_0x3865fe,_0x2a2788,_0x47ebbe,_0x35ddd3,_0x12fe15,_0x4b4840,_0x15a814,_0x5ddc86,_0x3cdc38);}),PluginManager[_0x52d9b6(0x1ba)](TSR[_0x52d9b6(0x211)][_0x52d9b6(0x1c2)],_0x52d9b6(0x206),_0x5c6dfe=>{const _0xe6e254=_0x52d9b6,_0x42abcd=String(_0x5c6dfe['category']),_0xd1d0ce=String(_0x5c6dfe[_0xe6e254(0x24b)]),_0x489eaf=eval(String(_0x5c6dfe['effect'])),_0x93d9c2=eval(String(_0x5c6dfe[_0xe6e254(0x1e8)])),_0x22522c=Number(_0x5c6dfe[_0xe6e254(0x21b)])<0x0?$gameMap['_interpreter']['_eventId']:Number(_0x5c6dfe[_0xe6e254(0x21b)]),_0x30770e=Number(_0x5c6dfe[_0xe6e254(0x1d0)])||TSR[_0xe6e254(0x211)][_0xe6e254(0x1bb)],_0x3b1604=String(_0x5c6dfe[_0xe6e254(0x21f)]),_0x12ba7e=String(_0x5c6dfe[_0xe6e254(0x1f3)]);let _0x19a146=_0x22522c?$gameMap[_0xe6e254(0x208)][_0x22522c]:$gamePlayer;_0x19a146[_0xe6e254(0x209)](_0x42abcd,_0xd1d0ce,_0x489eaf,_0x93d9c2,_0x30770e,_0x3b1604,_0x12ba7e);}),TSR[_0x52d9b6(0x211)][_0x52d9b6(0x216)]=ColorManager[_0x52d9b6(0x20a)],ColorManager[_0x52d9b6(0x20a)]=function(_0x40f094){const _0x59cf31=_0x52d9b6;if(_0x40f094>0x3)switch(_0x40f094){case 0x4:return _0x59cf31(0x1de);case 0x5:return _0x59cf31(0x227);default:return _0x59cf31(0x1cf);}else return TSR[_0x59cf31(0x211)][_0x59cf31(0x216)]['call'](this,_0x40f094);},Game_System[_0x52d9b6(0x24a)][_0x52d9b6(0x247)]=function(_0x49bb75){const _0x1b217d=_0x52d9b6;TSR[_0x1b217d(0x211)][_0x1b217d(0x251)]=_0x49bb75;},Game_System['prototype']['setAutoGoldPopups']=function(_0x5daf90){const _0x44962c=_0x52d9b6;TSR[_0x44962c(0x211)][_0x44962c(0x1ff)]=_0x5daf90;},Game_System[_0x52d9b6(0x24a)][_0x52d9b6(0x1c6)]=function(_0x462ba2){const _0x127f82=_0x52d9b6;TSR[_0x127f82(0x211)][_0x127f82(0x24d)]=_0x462ba2;},Game_Character[_0x52d9b6(0x24a)][_0x52d9b6(0x23c)]=function(){const _0x2a13a6=_0x52d9b6;return this[_0x2a13a6(0x1c4)];},Game_Character[_0x52d9b6(0x24a)][_0x52d9b6(0x249)]=function(){const _0x198211=_0x52d9b6;this[_0x198211(0x1c4)]=![];},Game_Character['prototype'][_0x52d9b6(0x1dc)]=function(){const _0x2ef611=_0x52d9b6;return this[_0x2ef611(0x245)];},Game_Character[_0x52d9b6(0x24a)]['clearSecondPopup']=function(){const _0x99f602=_0x52d9b6;this[_0x99f602(0x245)]=![];},Game_Character[_0x52d9b6(0x24a)][_0x52d9b6(0x269)]=function(_0x3dcacb,_0x59389c,_0x530dc2,_0x20d9f0,_0x171b32,_0x2f4953){const _0x1ea239=_0x52d9b6,_0x2ab583=ColorManager[_0x1ea239(0x25b)](_0x59389c);this[_0x1ea239(0x1c4)]=[_0x1ea239(0x212),_0x3dcacb,_0x2ab583,_0x530dc2,_0x20d9f0,_0x171b32];if(_0x2f4953){const _0xd0316f=_0x2f4953>0x0?'+':'',_0x4b6f9a=_0xd0316f+_0x2f4953+'\x20'+TextManager['levelA'];this[_0x1ea239(0x245)]=[_0x1ea239(0x212),_0x4b6f9a,_0x2ab583,_0x530dc2,_0x20d9f0,_0x171b32];}},Game_Character[_0x52d9b6(0x24a)][_0x52d9b6(0x232)]=function(_0x33e776,_0x4fa97a,_0x412395,_0x1cf8c0,_0x1c1a22,_0x2cb86c,_0x3f8898,_0x1d20b4,_0x1dc45e,_0x58d7cf){const _0x58e069=_0x52d9b6,_0x118ab6=eval(_0x58e069(0x235)+_0x33e776+'['+_0x4fa97a+']'),_0x3a9d0d=_0x118ab6?_0x58e069(0x1da):_0x58e069(0x1dd),_0x3b96e3=_0x118ab6?_0x118ab6[_0x58e069(0x246)]:0x0,_0x2d9e03=_0x118ab6?_0x118ab6['iconIndex']:_0x1c1a22,_0x10d9bb=_0x58d7cf?_0x1cf8c0:ColorManager['textColor'](_0x1cf8c0);this[_0x58e069(0x1c4)]=[_0x3a9d0d,_0x3b96e3,_0x2d9e03,_0x412395,_0x10d9bb,_0x3f8898,_0x1d20b4,_0x1dc45e,_0x58d7cf],_0x2cb86c&&!_0x58d7cf&&(_0x3a9d0d===_0x58e069(0x1da)?$gameParty[_0x58e069(0x1e7)](_0x118ab6,_0x412395,!![],!![]):$gameParty[_0x58e069(0x1fb)](_0x412395,!![]));},Game_Character[_0x52d9b6(0x24a)][_0x52d9b6(0x209)]=function(_0x341579,_0x15bbff,_0x84bd79,_0x234840,_0x2affee,_0x372be4,_0xa3d69e){const _0x152422=_0x52d9b6,_0x59b013=Window_Base[_0x152422(0x24a)][_0x152422(0x1bc)](_0x15bbff),_0x394a8c=_0x59b013<0x0,_0x51d327=Math['abs'](_0x59b013)[_0x152422(0x1b6)]();let _0x4ff3ab,_0x2d9e54='',_0x10b858='';if(_0x341579==='hp')_0x4ff3ab=!_0x394a8c?ColorManager['damageColor'](0x0):ColorManager[_0x152422(0x20a)](0x1);else{if(_0x341579==='mp')_0x4ff3ab=!_0x394a8c?ColorManager[_0x152422(0x20a)](0x2):ColorManager['damageColor'](0x3);else _0x341579==='tp'&&(_0x4ff3ab=!_0x394a8c?ColorManager[_0x152422(0x20a)](0x4):ColorManager[_0x152422(0x20a)](0x5));}if(TSR[_0x152422(0x211)][_0x152422(0x252)])_0x2d9e54=_0x394a8c?'+':'-';if(TSR[_0x152422(0x211)][_0x152422(0x24c)])_0x10b858=_0x341579?TextManager[_0x341579]:'';this[_0x152422(0x1c4)]=[_0x152422(0x206),_0x2d9e54+_0x51d327+_0x10b858,_0x4ff3ab,_0x2affee,_0x372be4,_0xa3d69e];if(_0x84bd79&&!this[_0x152422(0x25f)]){if(!_0x234840){const _0x4914c2=this===$gamePlayer?$gameParty[_0x152422(0x236)]():$gameParty[_0x152422(0x1f7)]()[this[_0x152422(0x1e1)]];switch(_0x341579){case'hp':_0x4914c2['gainHp'](-_0x59b013);break;case'mp':_0x4914c2[_0x152422(0x241)](-_0x59b013);break;case'tp':_0x4914c2[_0x152422(0x24f)](_0x4914c2['tp']-_0x59b013);break;default:break;}}else{for(const _0x2fb3df of $gameParty[_0x152422(0x1f7)]()){switch(_0x341579){case'hp':_0x2fb3df['gainHp'](-_0x59b013);break;case'mp':_0x2fb3df[_0x152422(0x241)](-_0x59b013);break;case'tp':_0x2fb3df[_0x152422(0x24f)](_0x2fb3df['tp']-_0x59b013);break;default:break;}}const _0x5d6bab=$gamePlayer[_0x152422(0x264)]();if(_0x5d6bab[_0x152422(0x233)]())for(const _0x448d9b of _0x5d6bab['_data']){_0x448d9b[_0x152422(0x1c4)]=['damage',_0x2d9e54+_0x51d327+_0x10b858,_0x4ff3ab,_0x2affee,_0x372be4,_0xa3d69e];}}}},TSR['mapPopups'][_0x52d9b6(0x1bf)]=Game_Party[_0x52d9b6(0x24a)][_0x52d9b6(0x1e7)],Game_Party[_0x52d9b6(0x24a)][_0x52d9b6(0x1e7)]=function(_0x384420,_0x431628,_0x305292,_0x74dbd5){const _0xfe3c56=_0x52d9b6;TSR[_0xfe3c56(0x211)][_0xfe3c56(0x1bf)][_0xfe3c56(0x255)](this,_0x384420,_0x431628,_0x305292);const _0x484178=this['itemDataObj'](_0x384420);if(_0x484178&&TSR[_0xfe3c56(0x211)][_0xfe3c56(0x251)]&&!_0x74dbd5){const _0x37d157=_0x384420[_0xfe3c56(0x22a)]['color']?_0x384420[_0xfe3c56(0x22a)]['color']['trim']():'0',_0x40a3b2=_0x37d157[_0xfe3c56(0x21a)]<0x6?ColorManager[_0xfe3c56(0x25b)](parseInt(_0x37d157)):_0x37d157[_0xfe3c56(0x1f6)]('#')?_0x37d157:'#'[_0xfe3c56(0x1f5)](_0x37d157),_0x22322b=TSR[_0xfe3c56(0x211)]['_popupDuration'];$gamePlayer[_0xfe3c56(0x232)](_0x484178,_0x384420['id'],_0x431628,_0x40a3b2,0x0,![],_0x22322b,0x0,0x0,!![]),$gameMap[_0xfe3c56(0x258)][_0xfe3c56(0x23b)](0x1);}},Game_Party[_0x52d9b6(0x24a)]['itemDataObj']=function(_0x3ca584){const _0x46520f=_0x52d9b6;if(!_0x3ca584)return null;else{if(DataManager[_0x46520f(0x1d5)](_0x3ca584))return _0x46520f(0x240);else{if(DataManager['isWeapon'](_0x3ca584))return _0x46520f(0x25a);else return DataManager[_0x46520f(0x1ea)](_0x3ca584)?_0x46520f(0x1d7):null;}}},TSR[_0x52d9b6(0x211)][_0x52d9b6(0x248)]=Game_Party[_0x52d9b6(0x24a)][_0x52d9b6(0x1fb)],Game_Party[_0x52d9b6(0x24a)]['gainGold']=function(_0x546493,_0xca3df6){const _0x45cb5f=_0x52d9b6;TSR[_0x45cb5f(0x211)][_0x45cb5f(0x248)]['call'](this,_0x546493);if(TSR[_0x45cb5f(0x211)][_0x45cb5f(0x1ff)]&&!_0xca3df6){const _0x1396ce=TSR[_0x45cb5f(0x211)][_0x45cb5f(0x1e6)],_0x1c948c=ColorManager['textColor'](_0x1396ce),_0x268bc2=TSR['mapPopups'][_0x45cb5f(0x1fe)],_0x314555=TSR[_0x45cb5f(0x211)][_0x45cb5f(0x1bb)];$gamePlayer[_0x45cb5f(0x232)](_0x45cb5f(0x240),0x0,_0x546493,_0x1c948c,_0x268bc2,![],_0x314555,0x0,0x0,!![]),$gameMap[_0x45cb5f(0x258)][_0x45cb5f(0x23b)](0x1);}},TSR[_0x52d9b6(0x211)]['_GameActor_changeExp']=Game_Actor[_0x52d9b6(0x24a)][_0x52d9b6(0x1cb)],Game_Actor['prototype'][_0x52d9b6(0x1cb)]=function(_0x192c7d,_0x3b1945){const _0x63e001=_0x52d9b6,_0x2a6540=this[_0x63e001(0x262)],_0x292adf=this[_0x63e001(0x260)](),_0x906664=_0x192c7d-_0x292adf;TSR[_0x63e001(0x211)][_0x63e001(0x266)][_0x63e001(0x255)](this,_0x192c7d,_0x3b1945);if(TSR['mapPopups']['_autoExpPopup']&&this['currentExp']()!==_0x292adf){const _0x108695=this[_0x63e001(0x262)]-_0x2a6540,_0x59b04e=_0x906664>0x0?'+':'',_0x44303a=_0x59b04e+_0x906664+'\x20'+TextManager['expA'],_0x3183bc=TSR[_0x63e001(0x211)][_0x63e001(0x1fd)],_0x4e82ca=TSR[_0x63e001(0x211)][_0x63e001(0x1bb)];$gamePlayer[_0x63e001(0x269)](_0x44303a,_0x3183bc,_0x4e82ca,0x0,0x0,_0x108695),$gameMap[_0x63e001(0x258)][_0x63e001(0x23b)](0x1);}},TSR[_0x52d9b6(0x211)][_0x52d9b6(0x1c3)]=Spriteset_Map[_0x52d9b6(0x24a)]['createUpperLayer'],Spriteset_Map[_0x52d9b6(0x24a)][_0x52d9b6(0x21e)]=function(){const _0x2386e0=_0x52d9b6;TSR[_0x2386e0(0x211)][_0x2386e0(0x1c3)][_0x2386e0(0x255)](this),this['createMapPopupsSet']();},Spriteset_Map[_0x52d9b6(0x24a)][_0x52d9b6(0x254)]=function(){const _0x25d01a=_0x52d9b6,_0x47d408=this[_0x25d01a(0x23d)]();this[_0x25d01a(0x1e4)]=new Sprite(),this[_0x25d01a(0x1e4)]['setFrame'](_0x47d408['x'],_0x47d408['y'],_0x47d408[_0x25d01a(0x218)],_0x47d408[_0x25d01a(0x1ec)]),this[_0x25d01a(0x1ca)](this[_0x25d01a(0x1e4)]);},TSR[_0x52d9b6(0x211)][_0x52d9b6(0x221)]=Sprite_Character[_0x52d9b6(0x24a)][_0x52d9b6(0x257)],Sprite_Character[_0x52d9b6(0x24a)][_0x52d9b6(0x257)]=function(){const _0x4e96ce=_0x52d9b6;TSR['mapPopups']['_Sprite_Character_initMembers'][_0x4e96ce(0x255)](this),this[_0x4e96ce(0x1e4)]=[],this[_0x4e96ce(0x20d)]=[];},TSR['mapPopups'][_0x52d9b6(0x1eb)]=Sprite_Character[_0x52d9b6(0x24a)]['update'],Sprite_Character[_0x52d9b6(0x24a)][_0x52d9b6(0x215)]=function(){const _0x4cb51e=_0x52d9b6;TSR['mapPopups'][_0x4cb51e(0x1eb)][_0x4cb51e(0x255)](this),this[_0x4cb51e(0x1c9)]();},Sprite_Character[_0x52d9b6(0x24a)]['setupMapPopups']=function(){const _0x36814c=_0x52d9b6,_0x36593e=this[_0x36814c(0x26a)][_0x36814c(0x23c)](),_0x2ef798=this[_0x36814c(0x26a)][_0x36814c(0x1dc)]();_0x2ef798&&(this[_0x36814c(0x26a)][_0x36814c(0x223)](),this[_0x36814c(0x1c1)](_0x2ef798)),_0x36593e&&(this[_0x36814c(0x26a)]['clearMapPopup'](),this[_0x36814c(0x1c1)](_0x36593e));},Sprite_Character[_0x52d9b6(0x24a)][_0x52d9b6(0x1c1)]=function(_0x158e32){const _0x98cc1=_0x52d9b6,_0x269438=_0x158e32[0x0];let _0x84e07f=_0x158e32[0x1],_0x5f30ae=ColorManager['normalColor'](),_0x38f01a=0x0,_0x39c3a6=0x0,_0x6aa1dc=0x0,_0x331e7c=0x0,_0x2fd01b=![];if(_0x269438==='text')_0x5f30ae=_0x158e32[0x2],_0x39c3a6=_0x158e32[0x3],_0x6aa1dc=_0x158e32[0x4],_0x331e7c=_0x158e32[0x5];else{if(_0x269438===_0x98cc1(0x1da)){const _0x475090=_0x158e32[0x2],_0x41577a=_0x158e32[0x3]>0x1||_0x158e32[0x3]<0x0?'\x20x'+Math[_0x98cc1(0x253)](_0x158e32[0x3]):'',_0x209c34=_0x158e32[0x3]<0x0?'-':'';_0x5f30ae=_0x158e32[0x4],_0x84e07f=_0x209c34['concat'](_0x84e07f[_0x98cc1(0x1f5)](_0x41577a)),_0x38f01a=ImageManager['iconWidth']/0x2,_0x39c3a6=_0x158e32[0x5],_0x6aa1dc=_0x158e32[0x6],_0x331e7c=_0x158e32[0x7],_0x2fd01b=_0x158e32[0x8];const _0x13941f=this[_0x98cc1(0x204)](_0x475090,_0x84e07f,_0x38f01a,_0x39c3a6,_0x6aa1dc,_0x331e7c);this['_mapPopupIconsSet'][_0x98cc1(0x22b)](_0x13941f);if(_0x2fd01b)_0x13941f['y']-=(ImageManager['iconWidth']+0x4)*this[_0x98cc1(0x20d)][_0x98cc1(0x1d8)](_0x13941f);}else{if(_0x269438==='gold'){_0x84e07f=_0x158e32[0x3],_0x5f30ae=_0x158e32[0x4];const _0x653482=TSR[_0x98cc1(0x211)]['_currencyAbb']||TextManager[_0x98cc1(0x1f8)];if(TSR[_0x98cc1(0x211)]['_currencyUnit'])_0x84e07f+='\x5csysColor'+_0x653482;_0x39c3a6=_0x158e32[0x5],_0x6aa1dc=_0x158e32[0x6],_0x331e7c=_0x158e32[0x7];if(_0x158e32[0x2]){_0x38f01a=ImageManager[_0x98cc1(0x1b8)]/0x2;const _0xce480f=_0x158e32[0x2],_0x255ecc=this[_0x98cc1(0x204)](_0xce480f,_0x158e32[0x3][_0x98cc1(0x1b6)](),_0x38f01a,_0x39c3a6,_0x6aa1dc,_0x331e7c);this[_0x98cc1(0x20d)][_0x98cc1(0x22b)](_0x255ecc);if(_0x2fd01b)_0x255ecc['y']-=(ImageManager[_0x98cc1(0x1b8)]+0x4)*this[_0x98cc1(0x20d)]['indexOf'](_0x255ecc);}}else _0x269438===_0x98cc1(0x206)&&(_0x84e07f=_0x158e32[0x1],_0x5f30ae=_0x158e32[0x2],_0x39c3a6=_0x158e32[0x3],_0x6aa1dc=_0x158e32[0x4],_0x331e7c=_0x158e32[0x5]);}}_0x84e07f='\x5ccolor'+_0x5f30ae+_0x84e07f;const _0x2bd4dd=this['createMapPopupSprite'](_0x269438,_0x84e07f,_0x38f01a,_0x39c3a6,_0x6aa1dc,_0x331e7c);this[_0x98cc1(0x1e4)][_0x98cc1(0x22b)](_0x2bd4dd);if(_0x2fd01b)_0x2bd4dd['y']-=(ImageManager[_0x98cc1(0x1b8)]+0x4)*this['_mapPopupsSet']['indexOf'](_0x2bd4dd);},Sprite_Character['prototype']['createMapPopupSprite']=function(_0x2a4099,_0x35d044,_0x298ca3,_0x1f0a60,_0x35f671,_0x2fed3c){const _0x2d75f3=_0x52d9b6,_0x11db58=this[_0x2d75f3(0x1cd)](),_0x16c07b=new Sprite_MapPopup();let _0x42a3e3=parseInt(TSR['mapPopups']['_offsetX'])||0x0,_0x421c7e=parseInt(TSR[_0x2d75f3(0x211)][_0x2d75f3(0x238)])||0x0,_0x258163=_0x35f671&&_0x35f671[_0x2d75f3(0x1f0)]()['includes'](_0x2d75f3(0x1ee)),_0x972c67=_0x2fed3c&&_0x2fed3c['toLowerCase']()[_0x2d75f3(0x1f6)](_0x2d75f3(0x1ee));if(_0x35f671)_0x42a3e3=parseInt(_0x35f671['replace'](/\s*pos\s*/,''));if(_0x2fed3c)_0x421c7e=parseInt(_0x2fed3c[_0x2d75f3(0x220)](/\s*pos\s*/,''));return _0x16c07b['x']=_0x258163?_0x42a3e3-_0x11db58/0x2+_0x298ca3:this['x']-_0x11db58/0x2+_0x298ca3+_0x42a3e3,_0x16c07b['y']=_0x972c67?_0x421c7e-$gameMap['tileHeight']()+$gameSystem[_0x2d75f3(0x200)]()/0x2:this['y']-$gameMap[_0x2d75f3(0x225)]()+$gameSystem['windowPadding']()/0x2+_0x421c7e,_0x16c07b[_0x2d75f3(0x259)]=_0x1f0a60,_0x16c07b[_0x2d75f3(0x210)](_0x2a4099,_0x35d044),SceneManager[_0x2d75f3(0x20e)]['_spriteset'][_0x2d75f3(0x1e4)][_0x2d75f3(0x1ca)](_0x16c07b),_0x16c07b;},Sprite_Character[_0x52d9b6(0x24a)][_0x52d9b6(0x204)]=function(_0x46c2be,_0x41fd02,_0x134a87,_0x2560b4,_0x22b329,_0x3c6284){const _0x893324=_0x52d9b6,_0x475ebb=this['charWidth'](),_0x50137a=_0x41fd02[_0x893324(0x21a)]*_0x475ebb,_0x2f6c30=new Sprite_MapIcon();let _0x2eb1b1=parseInt(TSR[_0x893324(0x211)][_0x893324(0x1bd)])||0x0,_0x107d55=parseInt(TSR[_0x893324(0x211)][_0x893324(0x238)])||0x0,_0x23f7f2=_0x22b329&&_0x22b329[_0x893324(0x1f0)]()[_0x893324(0x1f6)](_0x893324(0x1ee)),_0x1b4422=_0x3c6284&&_0x3c6284[_0x893324(0x1f0)]()[_0x893324(0x1f6)](_0x893324(0x1ee));if(_0x22b329)_0x2eb1b1=parseInt(_0x22b329['replace'](/\s*pos\s*/,''));if(_0x3c6284)_0x107d55=parseInt(_0x3c6284[_0x893324(0x220)](/\s*pos\s*/,''));return _0x2f6c30['x']=_0x23f7f2?_0x2eb1b1-_0x50137a/0x2-_0x475ebb-_0x475ebb/0x2+_0x134a87:this['x']-_0x50137a/0x2-_0x475ebb-_0x475ebb/0x2+_0x134a87+_0x2eb1b1,_0x2f6c30['y']=_0x1b4422?_0x107d55-$gameMap[_0x893324(0x225)]():this['y']-$gameMap[_0x893324(0x225)]()+_0x107d55,_0x2f6c30['_duration']=_0x2560b4,_0x2f6c30[_0x893324(0x210)](_0x46c2be),SceneManager[_0x893324(0x20e)]['_spriteset'][_0x893324(0x1e4)][_0x893324(0x1ca)](_0x2f6c30),_0x2f6c30;},Sprite_Character[_0x52d9b6(0x24a)]['charWidth']=function(){const _0x1391cd=_0x52d9b6,_0x2bc966=$gameSystem[_0x1391cd(0x1d1)]()-0x4;return Math[_0x1391cd(0x234)](_0x2bc966*0.5);},Sprite_Character[_0x52d9b6(0x24a)][_0x52d9b6(0x1c9)]=function(){const _0xf46ba5=_0x52d9b6;this[_0xf46ba5(0x256)](),this[_0xf46ba5(0x1e4)]['length']>0x0&&(!this['_mapPopupsSet'][0x0][_0xf46ba5(0x250)]()&&(SceneManager[_0xf46ba5(0x20e)][_0xf46ba5(0x25c)][_0xf46ba5(0x1e4)][_0xf46ba5(0x22e)](this['_mapPopupsSet'][0x0]),this[_0xf46ba5(0x1e4)][_0xf46ba5(0x22d)]())),this[_0xf46ba5(0x20d)]['length']>0x0&&(!this[_0xf46ba5(0x20d)][0x0][_0xf46ba5(0x250)]()&&(SceneManager[_0xf46ba5(0x20e)]['_spriteset'][_0xf46ba5(0x1e4)][_0xf46ba5(0x22e)](this[_0xf46ba5(0x20d)][0x0]),this['_mapPopupIconsSet']['shift']()));});function Sprite_MapPopup(){const _0xc2c5aa=_0x52d9b6;this['initialize'][_0xc2c5aa(0x213)](this,arguments);}function _0x48ad(_0x211af3,_0x228dbb){const _0x308ca3=_0x308c();return _0x48ad=function(_0x48ad9c,_0x218397){_0x48ad9c=_0x48ad9c-0x1b6;let _0x19c85a=_0x308ca3[_0x48ad9c];return _0x19c85a;},_0x48ad(_0x211af3,_0x228dbb);}function _0x308c(){const _0x51cf3a=['IconSet','#808080','duration','mainFontSize','Popups\x20Duration','setFrame','createChildSprite','isItem','_lastDisplayY','Armors','indexOf','createMapPopup','item','Auto\x20Gold\x20Color','requestSecondPopups','gold','#ff9900','outlineWidth','Auto\x20Gold\x20Popups','_memberIndex','effect','initialize','_mapPopupsSet','normalColor','_autoGoldColor','gainItem','all','initMember','isArmor','_Sprite_Character_update','height','Currency\x20Abbreviation','pos','children','toLowerCase','opacity','constructor','posY','Show\x20Currency\x20Unit','concat','includes','battleMembers','currencyUnit','985629ocUoju','numbPopup','gainGold','tileWidth','_expColor','_autoGoldIcon','_autoGoldPopup','windowPadding','mainFontFace','numberFontFace','Parameters','createMapIconSprite','anchor','damage','215406RnaXsm','_events','startDamageMapPopup','damageColor','_damageMotion','pad','_mapPopupIconsSet','_scene','3845Acnkca','setup','mapPopups','text','apply','round','update','ColorManager_damageColor','popupColor','width','category','length','target','Damage\x20Motion','39311PCRsLW','createUpperLayer','posX','replace','_Sprite_Character_initMembers','10fmNoKP','clearSecondPopup','rgba(0,\x200,\x200,\x200.7)','tileHeight','updateChild','#4d94ff','344710ULGgpW','create','meta','push','_lastDisplayX','shift','removeChild','\x5csysColor','systemColor','_currencyAbb','startItemPopup','isVisible','floor','$data','leader','fontFace','_offsetY','Auto\x20Item\x20Popups','Popups\x20Offset\x20Y','wait','requestMapPopups','pictureContainerRect','279pwEHvT','createBitmap','Items','gainMp','1352xycMir','_mapPopupType','parameters','_requestSecondPopups','name','setAutoItemPopups','_Game_Party_gainGold','clearMapPopup','prototype','value','_suffix','_autoExpPopup','color','setTp','isPlaying','_autoItemPopup','_prefix','abs','createMapPopupsSet','call','setupMapPopups','initMembers','_interpreter','_duration','Weapons','textColor','_spriteset','drawText','updateScroll','_eventId','currentExp','loadSystem','_level','updateSprite','followers','_dropDelay','_GameActor_changeExp','_displayX','bitmap','startTextPopup','_character','1829872dEqdiT','itemId','toString','Damage\x20Popups\x20Suffix','iconWidth','fontSize','registerCommand','_popupDuration','convertEscapeCharacters','_offsetX','2513175vFYxGV','_Game_Party_gainItem','slice','startMapPopup','pluginName','_Spriteset_Map_createUpperLayer','_requestMapPopups','Exp\x20Color','setAutoExpPopups','_displayY','icon','updateMapPopups','addChild','changeExp','\x5ccolor','charWidth'];_0x308c=function(){return _0x51cf3a;};return _0x308c();}Sprite_MapPopup['prototype']=Object[_0x52d9b6(0x229)](Sprite[_0x52d9b6(0x24a)]),Sprite_MapPopup[_0x52d9b6(0x24a)][_0x52d9b6(0x1f2)]=Sprite_MapPopup,Sprite_MapPopup[_0x52d9b6(0x24a)]['initialize']=function(){const _0x165ee1=_0x52d9b6;Sprite[_0x165ee1(0x24a)]['initialize'][_0x165ee1(0x255)](this),this['initMember']();},Sprite_MapPopup[_0x52d9b6(0x24a)]['initMember']=function(){const _0x500b1b=_0x52d9b6;this[_0x500b1b(0x205)]['x']=0.5,this[_0x500b1b(0x205)]['y']=0.5,this[_0x500b1b(0x259)]=0x0;},Sprite_MapPopup[_0x52d9b6(0x24a)][_0x52d9b6(0x210)]=function(_0x436bdc,_0x3c5d4a){const _0x27a7ca=_0x52d9b6;this['_dropDelay']=this[_0x27a7ca(0x259)]/0x3*0x2,this[_0x27a7ca(0x243)]=_0x436bdc,this[_0x27a7ca(0x22c)]=$gameMap[_0x27a7ca(0x267)],this[_0x27a7ca(0x1d6)]=$gameMap['_displayY'],this[_0x27a7ca(0x1d9)](_0x3c5d4a);},Sprite_MapPopup[_0x52d9b6(0x24a)][_0x52d9b6(0x215)]=function(){const _0x5dbf45=_0x52d9b6;Sprite[_0x5dbf45(0x24a)][_0x5dbf45(0x215)]['call'](this);if(this['_duration']>0x0){this[_0x5dbf45(0x259)]--;for(const _0x2cdacc of this[_0x5dbf45(0x1ef)]){this[_0x5dbf45(0x226)](_0x2cdacc);}}this[_0x5dbf45(0x25e)]();},Sprite_MapPopup[_0x52d9b6(0x24a)][_0x52d9b6(0x226)]=function(_0x22eb97){const _0x41f5e4=_0x52d9b6;if(this[_0x41f5e4(0x259)]>this['_dropDelay']){_0x22eb97['dy']+=0.5,_0x22eb97['ry']+=_0x22eb97['dy'];if(_0x22eb97['ry']>=0x0){_0x22eb97['ry']=0x0;if(this[_0x41f5e4(0x1fa)]())_0x22eb97['dy']*=-0.6;}_0x22eb97['y']=Math[_0x41f5e4(0x214)](_0x22eb97['ry']);}else{if(this[_0x41f5e4(0x259)]===this[_0x41f5e4(0x265)])_0x22eb97['y']=0x0;else{if(this[_0x41f5e4(0x259)]<this['_dropDelay']-0x2){const _0x434574=this[_0x41f5e4(0x243)]!==_0x41f5e4(0x206)||!TSR[_0x41f5e4(0x211)][_0x41f5e4(0x20b)]?0x1:0x0;_0x22eb97['y']-=_0x434574,_0x22eb97[_0x41f5e4(0x1f1)]-=0x4;}}}},Sprite_MapPopup[_0x52d9b6(0x24a)][_0x52d9b6(0x25e)]=function(){const _0x521c78=_0x52d9b6;let _0x190766=0x0,_0x1b6c7e=0x0;$gameMap[_0x521c78(0x267)]!==this[_0x521c78(0x22c)]&&(_0x190766=$gameMap[_0x521c78(0x267)]-this['_lastDisplayX']),$gameMap[_0x521c78(0x1c7)]!==this['_lastDisplayY']&&(_0x1b6c7e=$gameMap[_0x521c78(0x1c7)]-this['_lastDisplayY']),this['x']=this['x']-_0x190766*$gameMap[_0x521c78(0x1fc)](),this['y']=this['y']-_0x1b6c7e*$gameMap[_0x521c78(0x225)](),this[_0x521c78(0x22c)]=$gameMap[_0x521c78(0x267)],this[_0x521c78(0x1d6)]=$gameMap[_0x521c78(0x1c7)];},Sprite_MapPopup[_0x52d9b6(0x24a)][_0x52d9b6(0x1d9)]=function(_0x5470e6){const _0x39a0b3=_0x52d9b6,_0x25e1c2=this['fontSize'](),_0x5d2d4c=Math[_0x39a0b3(0x234)](_0x25e1c2*0.65);let _0x1dae8d=undefined,_0x1cb066=undefined,_0x163b70=this[_0x39a0b3(0x217)](),_0x194b97=ColorManager[_0x39a0b3(0x230)]();_0x5470e6[_0x39a0b3(0x1f6)](_0x39a0b3(0x1cc))&&(_0x1dae8d=_0x5470e6[_0x39a0b3(0x1d8)](_0x39a0b3(0x1cc)),_0x163b70=_0x5470e6[_0x39a0b3(0x1c0)](_0x1dae8d+0x6,_0x1dae8d+0xd),_0x5470e6=_0x5470e6[_0x39a0b3(0x1c0)](0x0,_0x1dae8d)+_0x5470e6[_0x39a0b3(0x1c0)](_0x1dae8d+0xd));_0x5470e6['includes'](_0x39a0b3(0x22f))&&(_0x1cb066=_0x5470e6['indexOf'](_0x39a0b3(0x22f)),_0x5470e6=_0x5470e6[_0x39a0b3(0x1c0)](0x0,_0x1cb066)+_0x5470e6[_0x39a0b3(0x1c0)](_0x1cb066+0x9));_0x5470e6=Window_Base[_0x39a0b3(0x24a)]['convertEscapeCharacters'](_0x5470e6);for(let _0x138b3d=0x0;_0x138b3d<_0x5470e6[_0x39a0b3(0x21a)];_0x138b3d++){const _0x39980e=this[_0x39a0b3(0x1d4)](_0x5d2d4c,_0x25e1c2),_0x2f75bd=this['numbPopup']()?0.6:0.5;if(_0x138b3d>=_0x1dae8d)_0x39980e['bitmap'][_0x39a0b3(0x25b)]=_0x163b70;if(_0x138b3d>=_0x1cb066)_0x39980e['bitmap'][_0x39a0b3(0x25b)]=_0x194b97;_0x39980e[_0x39a0b3(0x268)][_0x39a0b3(0x25d)](_0x5470e6[_0x138b3d],0x0,0x0,_0x5d2d4c,_0x25e1c2,'center'),_0x39980e['x']=(_0x138b3d-(_0x5470e6['length']-0x1)/0x2)*(_0x25e1c2*_0x2f75bd),_0x39980e['dy']=this[_0x39a0b3(0x1fa)]()?-_0x138b3d:-_0x138b3d/0x3;}},Sprite_MapPopup['prototype']['createChildSprite']=function(_0x4654b7,_0x4c908a){const _0x1b459e=_0x52d9b6,_0x541db4=new Sprite();return _0x541db4['bitmap']=this['createBitmap'](_0x4654b7,_0x4c908a+this[_0x1b459e(0x20c)]()),_0x541db4[_0x1b459e(0x205)]['x']=0x0,_0x541db4[_0x1b459e(0x205)]['y']=0.5,_0x541db4['y']=this[_0x1b459e(0x243)]===_0x1b459e(0x206)&&TSR[_0x1b459e(0x211)][_0x1b459e(0x20b)]?-0x18:-0x28,_0x541db4['ry']=_0x541db4['y'],this['addChild'](_0x541db4),_0x541db4;},Sprite_MapPopup['prototype'][_0x52d9b6(0x1fa)]=function(){const _0x522489=_0x52d9b6;return this[_0x522489(0x243)]==='damage'||this[_0x522489(0x243)]===_0x522489(0x1dd);},Sprite_MapPopup[_0x52d9b6(0x24a)][_0x52d9b6(0x20c)]=function(){const _0x184933=_0x52d9b6;return $gameSystem[_0x184933(0x200)]();},Sprite_MapPopup[_0x52d9b6(0x24a)][_0x52d9b6(0x237)]=function(){const _0x54cfae=_0x52d9b6;return this['numbPopup']()?$gameSystem[_0x54cfae(0x202)]():$gameSystem[_0x54cfae(0x201)]();},Sprite_MapPopup[_0x52d9b6(0x24a)][_0x52d9b6(0x1b9)]=function(){const _0x5c31b4=_0x52d9b6;return this[_0x5c31b4(0x1fa)]()?$gameSystem[_0x5c31b4(0x1d1)]()-0x5:$gameSystem[_0x5c31b4(0x1d1)]()-0x4;},Sprite_MapPopup['prototype'][_0x52d9b6(0x217)]=function(){const _0x1f4228=_0x52d9b6;return ColorManager[_0x1f4228(0x1e5)]();},Sprite_MapPopup[_0x52d9b6(0x24a)]['outlineColor']=function(){const _0x140ec7=_0x52d9b6;return _0x140ec7(0x224);},Sprite_MapPopup['prototype']['outlineWidth']=function(){return 0x4;},Sprite_MapPopup[_0x52d9b6(0x24a)][_0x52d9b6(0x23f)]=function(_0x31e85f,_0x38c97d){const _0xa05397=_0x52d9b6,_0x4248ab=new Bitmap(_0x31e85f,_0x38c97d);return _0x4248ab[_0xa05397(0x237)]=this['fontFace'](),_0x4248ab[_0xa05397(0x1b9)]=this['fontSize'](),_0x4248ab['textColor']=this[_0xa05397(0x217)](),_0x4248ab['outlineColor']=this['outlineColor'](),_0x4248ab[_0xa05397(0x1df)]=this[_0xa05397(0x1df)](),_0x4248ab;},Sprite_MapPopup[_0x52d9b6(0x24a)][_0x52d9b6(0x250)]=function(){return this['_duration']>0x0;};function Sprite_MapIcon(){const _0x1cd725=_0x52d9b6;this[_0x1cd725(0x1e3)]['apply'](this,arguments);}Sprite_MapIcon[_0x52d9b6(0x24a)]=Object[_0x52d9b6(0x229)](Sprite[_0x52d9b6(0x24a)]),Sprite_MapIcon[_0x52d9b6(0x24a)]['constructor']=Sprite_MapIcon,Sprite_MapIcon[_0x52d9b6(0x24a)][_0x52d9b6(0x1e3)]=function(){const _0x3d1a41=_0x52d9b6;Sprite[_0x3d1a41(0x24a)][_0x3d1a41(0x1e3)][_0x3d1a41(0x255)](this),this['initMember']();},Sprite_MapIcon['prototype'][_0x52d9b6(0x1e9)]=function(){const _0x35598a=_0x52d9b6;this[_0x35598a(0x205)]['x']=0.5,this['anchor']['y']=0.5,this[_0x35598a(0x259)]=0x0;},Sprite_MapIcon['prototype']['setup']=function(_0x3a36d0){const _0x3028de=_0x52d9b6;this['_dropDelay']=this[_0x3028de(0x259)]/0x3*0x2;const _0x19f03f=ImageManager[_0x3028de(0x1b8)],_0x43f17a=_0x3a36d0%0x10*_0x19f03f,_0xfaa5a5=Math['floor'](_0x3a36d0/0x10)*_0x19f03f;this[_0x3028de(0x22c)]=$gameMap['_displayX'],this[_0x3028de(0x1d6)]=$gameMap[_0x3028de(0x1c7)],this['createIconSprite'](_0x43f17a,_0xfaa5a5,_0x19f03f,_0x19f03f);},Sprite_MapIcon['prototype']['createIconSprite']=function(_0x424b6f,_0x239cd1,_0x7bf7bf,_0x1646db){const _0x193911=_0x52d9b6,_0x241df9=new Sprite();_0x241df9[_0x193911(0x268)]=ImageManager[_0x193911(0x261)](_0x193911(0x1ce)),_0x241df9[_0x193911(0x1d3)](_0x424b6f,_0x239cd1,_0x7bf7bf,_0x1646db),_0x241df9[_0x193911(0x205)]['x']=0.5,_0x241df9[_0x193911(0x205)]['y']=0.5,_0x241df9['y']=-0x28,_0x241df9['ry']=_0x241df9['y'],_0x241df9['dy']=0x0,this[_0x193911(0x1ca)](_0x241df9);},Sprite_MapIcon[_0x52d9b6(0x24a)]['update']=function(){const _0x580bae=_0x52d9b6;if(this[_0x580bae(0x259)]>0x0){this[_0x580bae(0x259)]--;for(const _0x2ee9d4 of this[_0x580bae(0x1ef)]){this[_0x580bae(0x263)](_0x2ee9d4);}}this[_0x580bae(0x25e)]();},Sprite_MapIcon[_0x52d9b6(0x24a)]['updateSprite']=function(_0x245eb5){const _0x164cdd=_0x52d9b6;if(this[_0x164cdd(0x259)]>this[_0x164cdd(0x265)])_0x245eb5['dy']+=0.5,_0x245eb5['ry']+=_0x245eb5['dy'],_0x245eb5['ry']>=0x0&&(_0x245eb5['ry']=0x0),_0x245eb5['y']=Math[_0x164cdd(0x214)](_0x245eb5['ry']);else{if(this[_0x164cdd(0x259)]===this[_0x164cdd(0x265)])_0x245eb5['y']=0x0;else this[_0x164cdd(0x259)]<this[_0x164cdd(0x265)]-0x2&&(_0x245eb5['y']-=0x1,_0x245eb5[_0x164cdd(0x1f1)]-=0x4);}},Sprite_MapIcon[_0x52d9b6(0x24a)][_0x52d9b6(0x25e)]=function(){const _0x4ac189=_0x52d9b6;let _0x4c8d05=0x0,_0xf0db93=0x0;$gameMap['_displayX']!==this[_0x4ac189(0x22c)]&&(_0x4c8d05=$gameMap[_0x4ac189(0x267)]-this[_0x4ac189(0x22c)]),$gameMap[_0x4ac189(0x1c7)]!==this[_0x4ac189(0x1d6)]&&(_0xf0db93=$gameMap[_0x4ac189(0x1c7)]-this[_0x4ac189(0x1d6)]),this['x']=this['x']-_0x4c8d05*$gameMap[_0x4ac189(0x1fc)](),this['y']=this['y']-_0xf0db93*$gameMap[_0x4ac189(0x225)](),this[_0x4ac189(0x22c)]=$gameMap[_0x4ac189(0x267)],this[_0x4ac189(0x1d6)]=$gameMap[_0x4ac189(0x1c7)];},Sprite_MapIcon[_0x52d9b6(0x24a)][_0x52d9b6(0x250)]=function(){const _0x496097=_0x52d9b6;return this[_0x496097(0x259)]>0x0;};
})();

//== END ========================================================================
//===============================================================================