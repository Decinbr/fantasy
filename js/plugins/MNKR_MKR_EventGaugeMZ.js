/ *
 * ------------------------------------------------- ---
 * MNKR_MKR_EventGaugeMZ.js
 * Ver.0.0.3
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * ------------------------------------------------- ---
 * /

// ================================================ =============================
// MKR_EventGauge.js
// ================================================ =============================
// Copyright (c) 2021 Mankind
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------ ----------------------------
// Version
// 2.0.0 2021/05/26 ・ Fixed not to save gauge information in save data.
//-Fixed so that gauge information is also initialized when the map is initialized.
// //
// 1.2.3 2020/04/10 ・ After temporarily deleting the event,
// Fixed the problem that an error occurs when opening and closing the menu.
// //
// 1.2.2 2020/02/13 -Fixed the problem that an error occurs when temporarily deleting an event.
// //
// 1.2.1 2018/10/22 ・ Gauge was set on the map at the start of the new game
// Fixed the problem that an error occurs when there is an event.
// //
// 1.2.0 2018/10/20 ・ Fixed the problem that the gauge was not displayed for some events.
// //
// 1.1.9 2018/09/26 ・ When selecting a tile set for the event image,
// Whether to display the event gauge
// Enabled to switch with plugin parameters.
// //
// 1.1.8 2018/05/29 ・ Fixed conflict with some plugins.
// //
// 1.1.7 2018/03/18 ・ Gauge opacity can be set for each event.
// ・ The gauge amount setting was separated by the remaining amount and the maximum value.
// //
// 1.1.6 2017/07/16 ・ Remove unnecessary code
// ・ Fixed because I forgot to change the version
// //
// 1.1.5 2017/07/16 In the Maker MV project created with an older version
// Fixed because the plugin did not work properly
// //
// 1.1.4 2017/05/27 ・ On the map that displays the event gauge
// Fixed the problem that could not be saved.
// ・ Partially changed the command description method by script
// ・ Gauge color can be changed with plugin / script command
// //
// 1.1.3 2017/03/11 ・ Gauge offsetX / Y with plug-in / script command
// Can be changed.
// ・ Gauge can be drawn on the picture.
// (Add plugin parameters)
// //
// 1.1.2 2017/03/05 ・ Added option settings to the description in the memo field
// ・ Register the gauge in the memory cache
// (Support for some memory release plugins)
// //
// 1.1.1 2017/02/17 ・ Added a method to use numbers instead of variables in gauge settings.
// ・ Added option settings to the description in the memo field
// //
// 1.1.0 2017/02/14 ・ Changed only the event that executed the target of the plug-in command.
// ・ In [Event ID] of the script command
// Enabled to specify 0 which represents the executed event itself.
// -Variables can be used as part of plugin / script commands.
// ・ The opacity of the gauge can be specified by the plug-in parameter.
// ・ Corrected the plug-in description according to the above correction.
// //
// 1.0.2 2017/02/14 Fixed the problem that the gauge may be hidden when opening and closing the menu.
// //
// 1.0.1 2017/02/14 Fixed because some commands by script did not work.
// //
// 1.0.0 2017/02/13 First edition released.
// ------------------------------------------------ ----------------------------
// [Twitter] https://twitter.com/mankind_games/
// [GitHub] https://github.com/mankindGames/
// [Blog] http://mankind-games.blogspot.jp/
// ================================================ =============================

/ *:
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_MKR_EventGaugeMZ.js
 *
 * @plugindesc Event gauge display
 * @author Mankind (modified munokura)
 *
 * @help
 * Displays a gauge at the foot of the specified event. (Display position can be adjusted)
 * The maximum value / remaining amount of the gauge is when the event is generated (map movement).
 * Set with the value specified in the event_memo field (variables can also be used).
 *
 * (When using variables for maximum gauge / remaining amount)
 * The maximum gauge value / remaining amount corresponds to the value of the variable, and the value of the variable and the remaining amount of the gauge are synchronized.
 * (However, the remaining gauge will never exceed the maximum value,
 * It cannot be less than 0)
 *
 * Gauges are hidden due to event transparency,
 * It will be redisplayed when the transparency is removed.
 *
 * For events (pages) for which no event image is set
 * Gauges are not displayed.
 * For events using tileset images
 * It is possible to display or set the gauge with the plug-in parameter.
 * (The upper left corner of tile set B is treated as a [nothing] square and the gauge is not displayed.)
 *
 * However, with the plug-in / script command described later
 * When the gauge is hidden, regardless of whether or not transparency or image settings are set.
 * You need to set the gauge to display with the plugin / script command.
 *
 * When the event command [Temporarily delete event] is executed, it is linked to the event.
 * The gauge will be erased at the same time.
 *
 *
 * [Example of use for copy and paste, memo field setting / command]
 * * The meaning of each item will be described later.
 * The content is line by line, so
 * Please copy the usage example part of the required line.
 *
 * Event_Note field:
 * <Egauge: vr10>
 * <Egauge: mvr11>
 * <Egauge: vr10 mvr11>
 * <Egauge: 15>
 * <Egauge: 3 Wh20 Ht6>
 * <Egauge: vr12 Wh100 Ht10 Fx3 Vs0>
 * <Egauge: 5 Ys-50>
 * <Egauge: vr5 Xs10 Ys10 Fx1 Fc3 Sc11 Bc7>
 * <Egauge: 50 op80>
 *
 * Plugin command (effective for the gauge of the executed event):
 * Show gauge
 * Hide gauge
 * Increase / decrease the remaining gauge
 * Specify the remaining gauge
 * Specify the maximum gauge value
 * Gauge X coordinate offset
 * Gauge Y coordinate offset
 * Gauge background setting
 * Specify gauge display color 1
 * Specify gauge display color 2
 * Specify gauge opacity
 *
 * Script command (effective for the gauge of the event with the specified ID):
 * $ gameMap.showGaugeWindow (1);
 * $ gameMap.hideGaugeWindow (1);
 * $ gameMap.isHideGaugeWindow (1);
 * $ gameMap.addGaugeValue (1, 3);
 * $ gameMap.addGaugeValue (this._eventId, 3);
 * $ gameMap.setGaugeValue (1, 5);
 * $ gameMap.setGaugeValue (this._eventId, 5);
 * $ gameMap.setGaugeMaxValue (1, 5);
 * $ gameMap.setGaugeOffsetX (1, ​​20);
 * $ gameMap.setGaugeOffsetY (1, 40);
 * $ gameMap.setGaugeBackColor (1, 16);
 * $ gameMap.setGaugeColor1 (1, 17);
 * $ gameMap.setGaugeColor2 (1, 17);
 * $ gameMap.addGaugeValue (1, $ gameVariables.value (10));
 * $ gameMap.addGaugeValue (this._eventId, $ gameVariables.value (10));
 * $ gameMap.setGaugeValue (1, $ gameVariables.value (15));
 * $ gameMap.setGaugeMaxValue (1, $ gameVariables.value (20));
 * $ gameMap.setOpacity