//============================================================================
// EliMZ_HelpWindows.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc v3.0.0 - Add a Help Window for each default scene/window.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-help-windows-for-rpg-maker-mv

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
https://www.patreon.com/hakuenstudio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Introduction
============================================================================

By default, only some Rpg Maker Mz scenes have a help window. And yet, 
they are not always saying something.
This plugin adds help windows in scenes that did not have them (Options 
for example), as well as provides the possibility of inserting content 
in each one.

============================================================================
Features
============================================================================

Adds and makes it possible to edit help window content in the following 
scenes/menus:
• Main menu.
• Item Category
• Skills.
• Equipment.
• Options.
• Save / Load.
• End Game.
• Title Screen.
• Name window.
• Shop.
• Battle.
• Choices.
• Select item.
• Input number.

In addition to the texts, you can also decide for bottom or top position 
and number of lines.

If you want to add a help window in other place, just talk to me.

============================================================================
How to use
============================================================================

■ Plugin Parameters:

The plugin parameters were structured mostly as follows:
• Enable - True to use this help window in game, false to not use.
• Position - Top or bottom.
• Lines - Choose a number of lines.
• Text - The text that will be inserted in the help window according 
to each command(Symbol).

There is also a plugin command to change the choice help text and the 
number input help text. You need to use them before you call the choice or 
number input command.

============================================================================
Terms of Use
============================================================================

https://www.hakuenstudio.com/rpg-maker/terms-of-use

============================================================================
Special thanks and considerations
============================================================================

Thanks to Silva for clarifying to me how help windows works.
Thanks to Caethril that help me understand a lot of things in the year 
of 2019 when I started to make this plugin.
Thanks to LTN games that help me with the plugin parameters.

============================================================================
Links
============================================================================

Facebook - https://www.facebook.com/hakuenstudio
Instagram - https://www.instagram.com/hakuenstudio
Twitter - https://twitter.com/hakuen_studio

============================================================================
Update log
============================================================================
Version 3.0.0 - 08/19/2021
- Now the choice help window will only show if you use the plugin command
before the choice command.
- Need Eli Book 4.0.0 now.
Version 2.1.2 - 05/23/2021
- Fixed an issue where the Shop window scene was not changing the help 
window to top position.
Version 2.1.1 - 05/01/2021
- Fixed a little bug that was making the help windows for choice and number 
input appearing every time the scene map starts.
Version 2.1.0 - 04/30/2021
- Added help windows for choices, select item and number input.
- Added plugin commands to hide/show the help windows from choices and 
number input.
Version 2.0.0 - 12/18/2020
- Adapted to work with Eli Book 3.0.0.
Version 1.0.1 - 10/16/2020
- Adapted to Eli Book 2.0.0
Version 1.0.0 - 10/06/2020
- Plugin release! 

@param title
@text Title Help Window
@type struct<sttitle>
@desc Help Window for the title scene.
@default {"enable":"true","text":"{\"newGame\":\"\\\"Start a new game\\\"\",\"continue\":\"\\\"Continue a previous game\\\"\",\"options\":\"\\\"Settings\\\"\",\"PatchNotes\":\"\\\"Yanfly Patch notes\\\"\",\"credits\":\"\\\"Yanfly Credits Page\\\"\",\"homePage\":\"\\\"Yanfly External Link\\\"\"}","position":"Top","lines":"2","offsetX":"0","offsetY":"0"}

@param menu
@text Menu Help Window
@type struct<stmenu>
@desc Help Window for the menu scene.
@default {"enable":"true","text":"{\"item\":\"\\\"Esses são os itens que usará no jogo. \\\\\\\\\\\\\\\\nesse aqui \\\\\\\\c[3]tem duas linhas.\\\\n\\\"\",\"skill\":\"\\\"Skills\\\"\",\"equip\":\"\\\"Equipaments\\\"\",\"status\":\"\\\"Status\\\"\",\"formation\":\"\\\"Formation\\\"\",\"options\":\"\\\"Options\\\"\",\"save\":\"\\\"Save game\\\"\",\"gameEnd\":\"\\\"Game End\\\"\",\"class\":\"\\\"Class(YEP_ClassChangeCore)\\\"\",\"row\":\"\\\"Row(YEP_RowFormation)\\\"\",\"statAllocate\":\"\\\"Stat Allocate(YEP_StatAllocation)\\\"\",\"quest\":\"\\\"Quest(YEP_QuestJournal)\\\"\",\"PatchNotes\":\"\\\"Patch notes(YEP_PatchNotes)\\\"\",\"debug\":\"\\\"Debug(YEP_MainMenuManager)\\\"\",\"help\":\"\\\"Help(YEP_HelpFileAccess)\\\"\"}","position":"Top","lines":"2","visibleRows":"3"}

@param itemCategory
@text Item Help Window
@type struct<stitemCategory>
@desc Help Window for the item scene.
@default {"enable":"true","text":"{\"item\":\"\\\"Items\\\"\",\"weapon\":\"\\\"Weapons\\\"\",\"armor\":\"\\\"Armor\\\"\",\"keyItem\":\"\\\"Key items\\\"\",\"shield\":\"\\\"Shields\\\"\"}","position":"Bottom","lines":"3"}

@param skill
@text Skill Help Window
@type struct<stskill>
@desc Help Window for the skill scene.
@default {"enable":"true","text":"[\"\\\"First database skill.\\\"\",\"\\\"Second database skill.\\\"\",\"\\\"etc...\\\"\"]","specialText":"{\"learnSkills\":\"\\\"Skill learn\\\"\",\"battleSkills\":\"\\\"Battle Skills\\\"\",\"tpMode\":\"\\\"Tp Mode\\\"\"}","position":"Top","lines":"2"}

@param equip
@text Equip Help Window
@type struct<stequip>
@desc Help Window for the equip scene.
@default {"enable":"true","commandText":"{\"equip\":\"\\\"Equipaments\\\"\",\"optimize\":\"\\\"Optimize\\\"\",\"clear\":\"\\\"Clear\\\"\",\"cancel\":\"\\\"Cancel\\\"\",\"customize\":\"\\\"Customize\\\"\"}","slotText":"[\"\\\"First Database Equipment types.\\\"\",\"\\\"Second Database Equipment types.\\\"\",\"\\\"Third Database Equipment types.\\\"\",\"\\\"Fourth Database Equipment types.\\\"\",\"\\\"Fifth Database Equipment types.\\\"\",\"\\\"etc...\\\"\"]","position":"Top","lines":"2"}

@param save
@text Save Help Window
@type struct<stsave>
@desc Help Window for the save scene.
@default {"enable":"true","text":"\"This is an autosave slot.\"","position":"Top","lines":"2"}

@param load
@text Load Help Window
@type struct<stload>
@desc Help Window for the load scene.
@default {"enable":"true","text":"\"This is the autoload help.\"","position":"Top","lines":"2"}

@param options
@text Options Help Window
@type struct<stoptions>
@desc Help Window for the options scene.
@default {"enable":"true","text":"{\"alwaysDash\":\"Always Dash\",\"commandRemember\":\"Command Remember\",\"touchUI\":\"\\\"Enable or Disable the default buttons on screen.\\\"\",\"bgmVolume\":\"Bgm volume\",\"bgsVolume\":\"Bgs volume\",\"meVolume\":\"ME volume\",\"seVolume\":\"SE volume\",\"language\":\"Language(IAVRA_Localization)\",\"animateTiles\":\"Animate tiles(YEP_AnimateTilesOption)\",\"atbSpeed\":\"Atb speed(YEP_X_BattleSysATB)\",\"battleAniSpeed\":\"Battle animation speed(YEP_BattleAniSpeedOpt)\",\"battleCamera\":\"Battle camera(YEP_X_ActSeqPack3)\",\"difficultySlider\":\"Difficulty slider(YEP_X_DifficultySlider)\",\"messageSpeed\":\"Message speed(YEP_X_MessageSpeedOpt)\",\"mapQuestWindow\":\"Map quests(YEP_X_MapQuestWindow)\",\"masterVolume\":\"Master volume(YEP_OptionsCore(Master Volume))\",\"windowToneRed\":\"Window tone red(YEP_OptionsCore)\",\"windowToneGreen\":\"Window tone green(YEP_OptionsCore)\",\"windowToneBlue\":\"Window tone blue(YEP_OptionsCore)\",\"synchFps\":\"Synch Fps(YEP_SynchFpsOption)\",\"gamepadConfig\":\"GamePad config(GamepadConfig)\",\"keyConfig\":\"Keyboard config(YEP_KeyboardConfig)\",\"autosave\":\"Auto Save(YEP_X_Autosave)\"}","position":"Bottom","lines":"2"}

@param gameEnd
@text Game End Help Window
@type struct<stgameEnd>
@desc Help Window for the game end scene.
@default {"enable":"true","text":"{\"toTitle\":\"To title\",\"cancel\":\"Cancel\"}","position":"Top","lines":"2"}

@param name
@text Name Input Help Window
@type struct<stname>
@desc Help Window for the name input scene.
@default {"enable":"true","text":"\"This is the name help text.\"","visibility":"true","position":"Top","lines":"2"}

@param shop
@text Shop Help Window
@type struct<stshop>
@desc Help Window for the shop scene.
@default {"enable":"true","text":"{\"buy\":\"Buy\",\"sell\":\"Sell\",\"cancel\":\"Cancel\",\"equip\":\"Equip(YEP_ShopMenuCore)\"}","position":"Top","lines":"2"}

@param battle
@text Battle Help Window
@type struct<stBattle>
@desc Help Window for the battle scene.
@default {"enable":"true","partyCmdText":"{\"fight\":\"\\\"Go, smash them!\\\"\",\"escape\":\"\\\"Run!\\\"\"}","actorCmdText":"{\"attack\":\"\\\"Attack an enemy.\\\"\",\"skillExt\":\"[\\\"\\\\\\\"Magic skills!\\\\\\\"\\\",\\\"\\\\\\\"Special Skills!\\\\\\\"\\\"]\",\"guard\":\"\\\"Defend yourself.\\\"\",\"item\":\"\\\"Select an item to use.\\\"\"}","lines":"2"}

@param selectItem
@text Select Item Help Window
@type struct<stSelectItem>
@desc Help Window for the select item on map.
@default {"enable":"true","lines":"2"}

@param choice
@text Choice Help Window
@type struct<stChoices>
@desc Help Window for the choice window.
@default {"enable":"true","lines":"2","text":"[\"\\\"A\\\"\",\"\\\"B\\\"\",\"\\\"C\\\"\",\"\\\"D\\\"\",\"\\\"E\\\"\",\"\\\"F\\\"\"]"}

@param numberInput
@text Number Input Help Window
@type struct<stNumberInput>
@desc Help Window for the input number window.
@default {"enable":"true","visibility":"true","lines":"2","text":"This is the number input help text.\nPlease, insert a number."}

@command choiceCmd
@text Choice Help Text
@desc Set the help text for each choice index.

    @arg choiceText
    @text The choice text
    @type multiline_string[]
    @desc Set here the text for each choice index
    @default

@command numberInputCmd
@text Number Input Help Text
@desc Set the help text for each choice index.

    @arg text
    @text Text
    @type multiline_string
    @desc Set here the text for the help window of the number input window.
    @default

@command hideHelp
@text Hide help window
@desc Hide the choice or number input help window.

    @arg type
    @text Select a window
    @type select
    @option numberInput
    @desc Select the help window you want to Show/Hide
    @default numberInput

    @arg flag
    @text Show/Hide
    @type boolean
    @desc Choose if you want to enable or disable.
    Show = true | Hide = false
    @default false

*/

/* ------------------------------- TITLE HELP ------------------------------- */
{
/*~struct~sttitle:

@param enable
@text Enable this help window?
@type boolean
@desc Enable or disable this help window.
@default true

@param text
@text Text
@type struct<stTitleSymbols>
@desc Set the text that will be show in the help window of each command. You can use escape codes too.
@default 

@param position
@text Position
@type select
@option Top
@option Bottom
@desc The default position of the window.
@default Top

@param lines
@text Lines
@type number
@desc The number of lines
@default 2

@param offsetX
@text Offset X
@type text
@desc The offset X
@default 0

@param offsetY
@text Offset Y
@type text
@desc The offset Y.
@default 0

*/
}

/* ------------------------------ TITLE SYMBOLS ----------------------------- */
{
/*~struct~stTitleSymbols:

@param newGame
@text New Game
@type note
@desc
@default

@param continue
@text Continue
@type note
@desc
@default

@param options
@text Options
@type note
@desc
@default

@param PatchNotes
@text YEP_PatchNotes
@type note
@desc
@default

@param credits
@text YEP_CreditsPage
@type note
@desc
@default

@param homePage
@text YEP_ExternalLinks
@type note
@desc
@default

*/
}

/* -------------------------------- MENU HELP ------------------------------- */
{
/*~struct~stmenu:

@param enable
@text Enable this help window?
@type boolean
@desc Enable or disable this help window.
@default true

@param text
@text Text
@type struct<stMenuSymbols>
@desc Set the text that will be show in the help window of each command.
@default

@param position
@text Position
@type select
@option Top
@option Bottom
@desc The default position of the window.
@default Top

@param lines
@text Lines
@type number
@desc The number of lines.
@default 2

@param visibleRows
@text Status Rows
@type number
@desc The number of visible rows for status window.
@default 3

*/
}

/* ------------------------------ MENU SYMBOLS ------------------------------ */
{
/*~struct~stMenuSymbols:

@param item
@text Items
@type note
@desc
@default

@param skill
@text Skills
@type note
@desc
@default

@param equip
@text Equipaments
@type note
@desc
@default

@param status
@text Status
@type note
@desc
@default

@param formation
@text Formation
@type note
@desc
@default

@param options
@text Options
@type note
@desc
@default

@param save
@text Save
@type note
@desc
@default

@param gameEnd
@text Game End
@type note
@desc
@default

@param class
@text Class(YEP_ClassChangeCore)
@type note
@desc
@default

@param row
@text Row(YEP_RowFormation)
@type note
@desc
@default

@param statAllocate
@text Stat Allocate(YEP_StatAllocation)
@type note
@desc
@default

@param quest
@text Quest(YEP_QuestJournal)
@type note
@desc
@default

@param PatchNotes
@text Patch notes(YEP_PatchNotes)
@type note
@desc
@default

@param debug
@text Debug(YEP_MainMenuManager)
@type note
@desc
@default

@param help
@text Help(YEP_HelpFileAccess)
@type note
@desc
@default

*/

}

/* -------------------------------- ITEM HELP ------------------------------- */
{
/*~struct~stitemCategory:

@param enable
@text Enable this help window?
@type boolean
@desc Enable or disable this help window.
@default true

@param text
@text Text
@type struct<stItemCtSymbols>
@desc Set the text that will be show in the help window of each command.
@default

@param position
@text Position
@type select
@option Top
@option Bottom
@desc The default position of the window.
@default Top

@param lines
@text Lines
@type number
@desc The number of lines.
@default 2

*/
}

/* -------------------------- ITEM CATEGORY SYMBOLS ------------------------- */
{
/*~struct~stItemCtSymbols:

@param item
@text Regular Items
@type note
@desc
@default

@param weapon
@text Weapons
@type note
@desc
@default

@param armor
@text Armor
@type note
@desc
@default

@param keyItem
@text Important items
@type note
@desc
@default

@param shield
@text Shields
@type note
@desc
@default

*/

}

/* ------------------------------- SKILL HELP ------------------------------- */
{

/*~struct~stskill:

@param enable
@text Enable this help window?
@type boolean
@desc Enable or disable this help window.
@default true

@param text
@text Text 1
@type note[]
@desc Set the text that will be show in the help window of each skill type.
@default ["\"First database skill.\"","\"Second database skill.\"","\"etc...\""]

@param specialText
@text Text 2
@type struct<stSkillSpecialText>
@desc Set the text that will be show in the help window of each skill type made by other plugins.
@default

@param position
@text Position
@type select
@option Top
@option Bottom
@desc The default position of the window.
@default Top

@param lines
@text Lines
@type number
@desc The number of lines.
@default 2

*/
}

/* -------------------------- SKILL SPECIAL SYMBOLS ------------------------- */
{
/*~struct~stSkillSpecialText:

@param learnSkills
@text Skill learn(YEP_SkillLearnSystem)
@type note
@desc
@default

@param battleSkills
@text Battle Skills(YEP_EquipBattleSkills)
@type note
@desc
@default

@param tpMode
@text Tp mode(YEP_EnhancedTP)
@type note
@desc
@default

*/

}

/* ---------------------------------- EQUIP --------------------------------- */
{
/*~struct~stequip:

@param enable
@text Enable this help window?
@type boolean
@desc Enable or disable this help window.
@default true

@param commandText
@text Text(EquipCommand)
@type struct<stEquipCmdText>
@desc Set the text that will be show in the help window of each command.
@default

@param slotText
@text Text(EquipSlot)
@type note[]
@desc Set the text that will be show in the help window of each slot of equipament.
@default ["\"First Database Equipment types.\"","\"Second Database Equipment types.\"","\"Third Database Equipment types.\"","\"Fourth Database Equipment types.\"","\"Fifth Database Equipment types.\"","\"etc...\""]

@param position
@text Position
@type select
@option Top
@option Bottom
@desc The default position of the window.
@default Top

@param lines
@text Lines
@type number
@desc The number of lines.
@default 2

*/
}

/* ------------------------------ EQUIP SYMBOLS ----------------------------- */
{
/*~struct~stEquipCmdText:

@param equip
@text Equip
@type note
@desc
@default

@param optimize
@text Optimize
@type note
@desc
@default

@param clear
@text Clear
@type note
@desc
@default

@param cancel
@text Cancel(YEP_EquipCore)
@type note
@desc
@default

@param customize
@text Customize(YEP_EquipCore)
@type note
@desc
@default

*/
}

/* -------------------------------- SAVE HELP ------------------------------- */
{
/*~struct~stsave:

@param enable
@text Enable this help window?
@type boolean
@desc Enable or disable this help window.
@default true

@param text
@text Text
@type note
@desc Set the text that will be show in the help window of scene save.
@default "This is the save help text."

@param position
@text Position
@type select
@option Top
@option Bottom
@desc The default position of the window.
@default Top

@param lines
@text Lines
@type number
@desc The number of lines.
@default 2

*/
}

/* -------------------------------- LOAD HELP ------------------------------- */
{
/*~struct~stload:

@param enable
@text Enable this help window?
@type boolean
@desc Enable or disable this help window.
@default true

@param text
@text Text
@type note
@desc Set the text that will be show in the help window of scene load.
@default "This is the load help text."

@param position
@text Position
@type select
@option Top
@option Bottom
@desc The default position of the window.
@default Top

@param lines
@text Lines
@type number
@desc The number of lines.
@default 2

*/
}

/* ------------------------------ OPTIONS HELP ------------------------------ */
{
/*~struct~stoptions:

@param enable
@text Enable this help window?
@type boolean
@desc Enable or disable this help window.
@default true

@param text
@text Text
@type struct<stOptionsSymbols>
@desc Set the text that will be show in the help window of each option.
@default 

@param position
@text Position
@type select
@option Top
@option Bottom
@desc The default position of the window.
@default Top

@param lines
@text Lines
@type number
@desc The number of lines.
@default 2

*/
}

/* ----------------------------- OPTIONS SYMBOL ----------------------------- */
{
/*~struct~stOptionsSymbols:

@param alwaysDash
@text Always Dash
@type note
@desc 
@default Always Dash

@param commandRemember
@text Command Remember
@type note
@desc 
@default Command Remember

@param touchUI
@text Touch Ui
@type note
@desc 
@default Enable or disable the default buttons on screen.

@param bgmVolume
@text Bgm volume
@type note
@desc 
@default Bgm volume

@param bgsVolume
@text Bgs volume
@type note
@desc 
@default Bgs volume

@param meVolume
@text ME volume
@type note
@desc 
@default ME volume

@param seVolume
@text SE volume
@type note
@desc
@default SE volume

@param language
@text Language(IAVRA_Localization)
@type note
@desc
@default Language(IAVRA_Localization)

@param animateTiles
@text Animate tiles(YEP_AnimateTilesOption)
@type note
@desc
@default Animate tiles(YEP_AnimateTilesOption)

@param atbSpeed
@text Atb speed(YEP_X_BattleSysATB)
@type note
@desc
@default Atb speed(YEP_X_BattleSysATB)

@param battleAniSpeed
@text Battle animation speed(YEP_BattleAniSpeedOpt)
@type note
@desc
@default Battle animation speed(YEP_BattleAniSpeedOpt)

@param battleCamera
@text Battle camera(YEP_X_ActSeqPack3)
@type note
@desc
@default Battle camera(YEP_X_ActSeqPack3)

@param difficultySlider
@text Difficulty slider(YEP_X_DifficultySlider)
@type note
@desc
@default Difficulty slider(YEP_X_DifficultySlider)

@param messageSpeed
@text Message speed(YEP_X_MessageSpeedOpt)
@type note
@desc
@default Message speed(YEP_X_MessageSpeedOpt)

@param mapQuestWindow
@text Map quests(YEP_X_MapQuestWindow)
@type note
@desc
@default Map quests(YEP_X_MapQuestWindow)

@param masterVolume
@text Master volume(YEP_OptionsCore(Master Volume))
@type note
@desc
@default Master volume(YEP_OptionsCore(Master Volume))

@param windowToneRed
@text Window tone red(YEP_OptionsCore)
@type note
@desc
@default Window tone red(YEP_OptionsCore)

@param windowToneGreen
@text Window tone green(YEP_OptionsCore)
@type note
@desc
@default Window tone green(YEP_OptionsCore)

@param windowToneBlue
@text Window tone blue(YEP_OptionsCore)
@type note
@desc
@default Window tone blue(YEP_OptionsCore)

@param synchFps
@text Synch Fps(YEP_SynchFpsOption)
@type note
@desc
@default Synch Fps(YEP_SynchFpsOption)

@param gamepadConfig
@text GamePad config(GamepadConfig)
@type note
@desc
@default GamePad config(GamepadConfig)

@param keyConfig
@text Keyboard config(YEP_KeyboardConfig)
@type note
@desc
@default Keyboard config(YEP_KeyboardConfig)

@param autosave
@text Auto Save(YEP_X_Autosave)
@type note
@desc
@default Auto Save(YEP_X_Autosave)

*/

}

/* ------------------------------ GAME END HELP ----------------------------- */
{
/*~struct~stgameEnd:

@param enable
@text Enable this help window?
@type boolean
@desc Enable or disable this help window.
@default true

@param text
@text Text
@type struct<stGameEndSymbols>
@desc Set the text that will be show in the help window of each command.
@default

@param position
@text Position
@type select
@option Top
@option Bottom
@desc The default position of the window.
@default Top

@param lines
@text Lines
@type number
@desc The number of lines.
@default 2

*/
}

/* ---------------------------- GAME END SYMBOLS ---------------------------- */
{
/*~struct~stGameEndSymbols:

@param toTitle
@text To title
@type note
@desc
@default To title

@param cancel
@text Cancel
@type note
@desc
@default Cancel

*/
}

/* ------------------------------- NAME INPUT ------------------------------- */
{
/*~struct~stname:

@param enable
@text Enable this help window?
@type boolean
@desc Enable or disable this help window.
@default true

@param text
@text Text
@type note
@desc Set the text that will be show in the help window of scene name.
@default "This is the name help text."

@param visibility
@text Visibility
@type boolean
@desc
@default true

@param position
@text Position
@type select
@option Top
@option Bottom
@desc The default position of the window.
@default Top

@param lines
@text Lines
@type number
@desc The number of lines.
@default 2

*/
}

/* -------------------------------- SHOP HELP ------------------------------- */
{
/*~struct~stshop:

@param enable
@text Enable this help window?
@type boolean
@desc Enable or disable this help window.
@default true

@param text
@text Text
@type struct<stshopSymbols>
@desc Set the text that will be show in the help window of each command.
@default

@param position
@text Position
@type select
@option Top
@option Bottom
@desc The default position of the window.
@default Top

@param lines
@text Lines
@type number
@desc The number of lines.
@default 2

*/
}

/* ------------------------------ SHOP SYMBOLS ------------------------------ */
{
/*~struct~stshopSymbols:

@param buy
@text Buy
@type note
@desc
@default Buy

@param sell
@text Sell
@type note
@desc
@default Sell

@param cancel
@text Cancel
@type note
@desc
@default Cancel

@param equip
@text Equip(YEP_ShopMenuCore)
@type note
@desc
@default Equip(YEP_ShopMenuCore)

*/
}

/* --------------------------------- BATTLE --------------------------------- */
{
/*~struct~stBattle:

@param enable
@text Enable this help window?
@type boolean
@desc Enable or disable this help window.
@default true

@param partyCmdText
@text Party commands
@type struct<stPartyCmdSymbols>
@desc Set the text that will be show in the help window of each command.
@default

@param actorCmdText
@text Actor commandsd
@type struct<stActorCmdSymbols>
@desc Set the text that will be show in the help window of each command.
@default

@param lines
@text Lines
@type number
@desc The number of lines.
@default 2

*/
}

/* ------------------------------ PARTY COMMAND ----------------------------- */
{
/*~struct~stPartyCmdSymbols:

@param fight
@text Fight
@type note
@desc
@default Buy

@param escape
@text Escape
@type note
@desc
@default Sell

*/
}

/* ------------------------------ ACTOR COMMAND ----------------------------- */
{
/*~struct~stActorCmdSymbols:

@param attack
@text Attack
@type note
@desc
@default Buy

@param skillExt
@text Skills
@type note[]
@desc
@default Sell

@param guard
@text Guard
@type note
@desc
@default Sell

@param item
@text Item
@type note
@desc
@default Sell

*/
}

/* ------------------------------- SELECT ITEM ------------------------------ */
{
/*~struct~stSelectItem:

@param enable
@text Enable this help window?
@type boolean
@desc Enable or disable this help window.
@default true

@param lines
@text Lines
@type number
@desc The number of lines.
@default 2

*/
}

/* ------------------------------ CHOICE WINDOW ----------------------------- */
{
/*~struct~stChoices:

@param enable
@text Enable this help window?
@type boolean
@desc Enable or disable this help window.
@default true

@param lines
@text Lines
@type number
@desc The number of lines.
@default 2

@param text
@text Text
@type note[]
@desc The texts to put for each choice index.
@default

*/
}

/* ------------------------------ NUMBER INPUT ------------------------------ */
{
/*~struct~stNumberInput:

@param enable
@text Enable this help window?
@type boolean
@desc Enable or disable this help window.
@default true

@param visibility
@text Show/Hide the help window
@type boolean
@desc Show/Hide the help window
@default true

@param lines
@text Lines
@type number
@desc The number of lines.
@default 2

@param text
@text Text
@type multiline_string
@desc The texts to put for each choice index.
@default

*/

}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_HelpWindows = true

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

Eli.HelpWindows = {

    parameters: {},
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
        this.parameters.choice.visibility = false
    },

    initPluginCommands(){
        const commands = ['choiceCmd', 'numberInputCmd', 'hideHelp']
        Eli.PluginManager.registerCommands(this, commands)
    },

	param() { return this.parameters },

	title() { return this.param().title},

	menu() { return this.param().menu },

	itemCategory() { return this.param().itemCategory },

	skill() { return this.param().skill },

	equip() { return this.param().equip },

	save() { return this.param().save },

	load() { return this.param().load },

	options() { return this.param().options },

	gameEnd() { return this.param().gameEnd },

	name() { return this.param().name },

	shop() { return this.param().shop },

	battle() { return this.param().battle },

    selectItem() { return this.param().selectItem },

    choice() { return this.param().choice },

    numberInput() { return this.param().numberInput },

    choiceCmd(args){
        const texts = JSON.parse(args.choiceText)
        texts.forEach((text, index) => {
            this.parameters.choice.text[index] = text
        })
        this.choice().visibility = true
    },

    numberInputCmd(args){
        this.parameters.numberInput.text = args.text
    },

    hideHelp(args){
        const helpType = args.type
        this.parameters[helpType].visibility = JSON.parse(args.flag)
    },

}

const Plugin = Eli.HelpWindows
const Alias = Eli.HelpWindows.alias

Plugin.initialize()

/* ------------------------------- WINDOW HELP ------------------------------ */
{

Window_Help.prototype.setTextWrap = function(text) {
	if (this._text !== text) {
		this._text = text.replace(/\\n/g, '\n')
		this.refresh()
	}
}

Alias.Window_Help_setItem = Window_Help.prototype.setItem
Window_Help.prototype.setItem = function(item) {
	if(item) {
		item.description = item.description.replace(/\\n/g, '\n') || ''
	}
	Alias.Window_Help_setItem.call(this, item)
}

}

/* ========================================================================== */
/*                                 TITLE HELP                                 */
/* ========================================================================== */

if(Plugin.title().enable){

/* ------------------------------- SCENE TITLE ------------------------------ */
{

Alias.Scene_Title_create = Scene_Title.prototype.create
Scene_Title.prototype.create = function() {
    Alias.Scene_Title_create.call(this)
    this.createHelpWindow()
    this.associateHelpWindow()
}

Scene_Title.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help(this.helpWindowRect())
    this._helpWindow.hide()
    this._helpWindow.close()
    this.addWindow(this._helpWindow)
}

Scene_Title.prototype.helpWindowRect = function() {
    const offsetX = Plugin.title().offsetX
    const offsetY = Plugin.title().offsetY
    const width = Graphics.boxWidth
    const height = this.calcWindowHeight(2, false)
    const x = Eli.Utils.needEval(offsetX)
    const y = this.helpPosition(height) + Eli.Utils.needEval(offsetY)

    return new Rectangle(x, y, width, height)
}

Scene_Title.prototype.helpPosition = function(height){
    const type = Plugin.title().position
    const position = { Top: 0, Bottom: Graphics.boxHeight - height }

    return position[type]
}

Scene_Title.prototype.associateHelpWindow = function(){
    this._commandWindow.setHelpWindow(this._helpWindow)
}

}

/* -------------------------- WINDOW TITLE COMMAND -------------------------- */
{

Alias.Window_TitleCommand_open = Window_TitleCommand.prototype.open
Window_TitleCommand.prototype.open = function() {
    Alias.Window_TitleCommand_open.call(this)
    this._helpWindow.show()
    this._helpWindow.open()
}

Alias.Window_TitleCommand_close = Window_TitleCommand.prototype.close
Window_TitleCommand.prototype.close = function() {
    Alias.Window_TitleCommand_close.call(this)
    this._helpWindow.close()
}

Alias.Window_TitleCommand_updateHelp = Window_TitleCommand.prototype.updateHelp
Window_TitleCommand.prototype.updateHelp = function() {
    Alias.Window_TitleCommand_updateHelp.call(this)
    this.updateMoreHelp()
}

Window_TitleCommand.prototype.updateMoreHelp = function() {
    const symbol = this.currentSymbol()
    const text = Plugin.title().text

    this._helpWindow.setTextWrap(text[symbol] || '')
}

}

} // Plugin.title().enable

/* ========================================================================== */
/*                               MAIN MENU HELP                               */
/* ========================================================================== */

if(Plugin.menu().enable){

/* ------------------------------- SCENE MENU ------------------------------- */
{

Scene_Menu.prototype.helpAreaHeight = function() {
    const lines = Plugin.menu().lines
    return this.calcWindowHeight(lines, false)
}

Scene_Menu.prototype.isBottomHelpMode = function() {
    const type = Plugin.menu().position
    const position = { Top: false, Bottom: true }

    return position[type]
}

Alias.Scene_Menu_create = Scene_Menu.prototype.create
Scene_Menu.prototype.create = function() {
    Alias.Scene_Menu_create.call(this)
    this.createHelpWindow()
    this.associateHelpWindow()
}

Scene_Menu.prototype.associateHelpWindow = function() {
    this._commandWindow.setHelpWindow(this._helpWindow)
}

}

/* --------------------------------- WINDOW --------------------------------- */
{

Window_MenuStatus.prototype.numVisibleRows = function() {
    return Plugin.menu().visibleRows
}

Alias.Window_MenuCommand_updateHelp = Window_MenuCommand.prototype.updateHelp
Window_MenuCommand.prototype.updateHelp = function() {
    Alias.Window_MenuCommand_updateHelp.call(this);
    this.updateMoreHelp()
}

Window_MenuCommand.prototype.updateMoreHelp = function(){
    const symbol = SceneManager._scene._commandWindow.currentSymbol()
    const text =  Plugin.menu().text

    this._helpWindow.setTextWrap(text[symbol] || '')
}

}

} // Plugin.menu().enable

/* ========================================================================== */
/*                                  ITEM HELP                                 */
/* ========================================================================== */

if(Plugin.itemCategory().enable) {

/* ------------------------------- SCENE ITEM ------------------------------- */
{

Scene_Item.prototype.helpAreaHeight = function() {
    const lines = Plugin.itemCategory().lines
    return this.calcWindowHeight(lines, false)
}

Scene_Item.prototype.isBottomHelpMode = function() {
    const type = Plugin.itemCategory().position
    const position = { Top: false, Bottom: true }

    return position[type]
}

}

/* --------------------------------- WINDOW --------------------------------- */
{

Alias.Window_ItemCategory_updateHelp = Window_ItemCategory.prototype.updateHelp
Window_ItemCategory.prototype.updateHelp = function (){
    Alias.Window_ItemCategory_updateHelp.call(this)
    if(this.active) this.updateMoreHelp()
}

Window_ItemCategory.prototype.updateMoreHelp = function() {
    const symbol = this.currentSymbol()
    const text = Plugin.itemCategory().text

    this._helpWindow.setTextWrap(text[symbol] || '')
}

}

} // Plugin.itemCategory().enable

/* ========================================================================== */
/*                                 SKILL HELP                                 */
/* ========================================================================== */

if(Plugin.skill().enable){

/* ------------------------------- SCENE SKILL ------------------------------ */
{

Scene_Skill.prototype.helpAreaHeight = function() {
    const lines = Plugin.skill().lines
    return this.calcWindowHeight(lines, false)
}

Scene_Skill.prototype.isBottomHelpMode = function() {
    const type = Plugin.skill().position
    const position = { Top: false, Bottom: true }

    return position[type]
}

}

/* ---------------------------- WINDOW SKILL TYPE --------------------------- */
{

Alias.Window_SkillType_updateHelp = Window_SkillType.prototype.updateHelp
Window_SkillType.prototype.updateHelp = function(){
    Alias.Window_SkillType_updateHelp.call(this)
    this.updateMoreHelp()
}

Window_SkillType.prototype.updateMoreHelp = function() {
    const ext = this.currentExt()
    const textN = Plugin.skill().text
    const textS = Plugin.skill().specialText

    if(typeof(ext) === 'number') {
        this._helpWindow.setTextWrap(textN[ext-1] || '')
    }
    if(typeof(ext) === 'string'){
        this._helpWindow.setTextWrap(textS[ext] || '')
    }
}

}

} // Plugin.skill().enable

/* ========================================================================== */
/*                                 EQUIP HELP                                 */
/* ========================================================================== */

if(Plugin.equip().enable){

/* ------------------------------- SCENE EQUIP ------------------------------ */
{

Scene_Equip.prototype.helpAreaHeight = function() {
    return this.calcWindowHeight(Plugin.equip().lines, false)
}

Scene_Equip.prototype.isBottomHelpMode = function() {
    const type = Plugin.equip().position;
    const position = { Top: false, Bottom: true }

    return position[type]
}

}

/* -------------------------- WINDOW EQUIP COMMAND -------------------------- */
{

Alias.Window_EquipCommand_updateHelp = Window_EquipCommand.prototype.updateHelp
Window_EquipCommand.prototype.updateHelp = function(){
    Alias.Window_EquipCommand_updateHelp.call(this)
    this.updateMoreHelp()
}

Window_EquipCommand.prototype.updateMoreHelp = function() {
    const symbol = this.currentSymbol()
    const text = Plugin.equip().commandText

    this._helpWindow.setTextWrap(text[symbol] || '')
}

Alias.Window_EquipSlot_updateHelp = Window_EquipSlot.prototype.updateHelp
Window_EquipSlot.prototype.updateHelp = function(){
    Alias.Window_EquipSlot_updateHelp.call(this)
    this.updateMoreHelp()
}

Window_EquipSlot.prototype.updateMoreHelp = function() {
    const slotIndex = this._index
    const slotNameIndex = this.actorSlotName(this._actor, slotIndex)
    const text = Plugin.equip().slotText
    const allSlots = $dataSystem.equipTypes
    const index = allSlots.indexOf(slotNameIndex)

    this._helpWindow.setText(text[index-1] || '')
}

}

} // Plugin.equip().enable

/* ========================================================================== */
/*                                  SAVE HELP                                 */
/* ========================================================================== */

if(Plugin.save().enable){

/* ------------------------------- SCENE SAVE ------------------------------- */
{

Alias.Scene_Save_createListWindow = Scene_Save.prototype.createListWindow
Scene_Save.prototype.createListWindow = function() {
    Alias.Scene_Save_createListWindow.call(this)
    this._listWindow.setHelpWindow(this._helpWindow)
}

Scene_Save.prototype.helpAreaHeight = function() {
    return this.calcWindowHeight(Plugin.save().lines, false)
}

Scene_Save.prototype.helpWindowRect = function() {
    const wx = 0;
    const wy = this.helpAreaTop()
    const ww = Graphics.boxWidth
    const wh = this.helpAreaHeight()

    return new Rectangle(wx, wy, ww, wh)
}

Scene_Save.prototype.listWindowRect = function() {
    const wx = 0;
    const wy = this.mainAreaTop()
    const ww = Graphics.boxWidth
    const wh = this.mainAreaHeight()

    return new Rectangle(wx, wy, ww, wh)
}

Scene_Save.prototype.isBottomHelpMode = function() {
    const type = Plugin.save().position;
    const position = { Top: false, Bottom: true }

    return position[type]
}

Alias.Scene_Save_start = Scene_Save.prototype.start
Scene_Save.prototype.start = function() {
    Alias.Scene_Save_start.call(this)
    this._listWindow.updateHelp()
}

}

} // Plugin.save().enable

/* ========================================================================== */
/*                                  LOAD HELP                                 */
/* ========================================================================== */

if(Plugin.load().enable) {

/* ------------------------------- SCENE LOAD ------------------------------- */
{

Alias.Scene_Load_createListWindow = Scene_Load.prototype.createListWindow
Scene_Load.prototype.createListWindow = function() {
    Alias.Scene_Load_createListWindow.call(this)
    this._listWindow.setHelpWindow(this._helpWindow)
}

Scene_Load.prototype.helpAreaHeight = function() {
    const lines = Plugin.load().lines
    return this.calcWindowHeight(lines, false)
}

Scene_Load.prototype.helpWindowRect = function() {
    const wx = 0
    const wy = this.helpAreaTop()
    const ww = Graphics.boxWidth
    const wh = this.helpAreaHeight()

    return new Rectangle(wx, wy, ww, wh)
}

Scene_Load.prototype.listWindowRect = function() {
    const wx = 0
    const wy = this.mainAreaTop()
    const ww = Graphics.boxWidth
    const wh = this.mainAreaHeight()

    return new Rectangle(wx, wy, ww, wh)
}

Scene_Load.prototype.isBottomHelpMode = function() {
    const type = Plugin.load().position
    const position = { Top: false, Bottom: true }

    return position[type]
}

Alias.Scene_Load_start = Scene_Load.prototype.start
Scene_Load.prototype.start = function() {
    Alias.Scene_Load_start.call(this)
    this._listWindow.updateHelp()
}

}

} // Plugin.load().enable

/* ========================================================================== */
/*                             SAVE E LOAD WINDOW                             */
/* ========================================================================== */

if(Plugin.load().enable || Plugin.save().enable){

Alias.Window_SavefileList_updateHelp = Window_SavefileList.prototype.updateHelp
Window_SavefileList.prototype.updateHelp = function(){
    Alias.Window_SavefileList_updateHelp.call(this)
    this.updateMoreHelp()
}

Window_SavefileList.prototype.updateMoreHelp = function(){
    if(this._mode === 'save'){
        this.updateSaveHelp()

    }else if(this._mode === 'load'){
        this.updateLoadHelp()
    }
}

Window_SavefileList.prototype.updateSaveHelp = function(){
    if(this._index === 0 && this._autosave){
        const text = Plugin.save().text
        this._helpWindow.setText(text || '')

    }else{
        const text = TextManager.saveMessage
        this._helpWindow.setText(text || '')
    }
}

Window_SavefileList.prototype.updateLoadHelp = function(){
    if(this._index === 0 && this._autosave){
        const text = Plugin.load().text
        this._helpWindow.setText(text || '')

    }else{
        const text = TextManager.loadMessage
        this._helpWindow.setText(text || '')
    }
}

} // Plugin.load().enable || Plugin.save().enable

/* ========================================================================== */
/*                                OPTIONS HELP                                */
/* ========================================================================== */

if(Plugin.options().enable && !Imported.YEP_OptionsCore){

/* ---------------------------------- SCENE --------------------------------- */
{

Alias.Scene_Options_create = Scene_Options.prototype.create
Scene_Options.prototype.create = function() {
    Alias.Scene_Options_create.call(this)
    this.createHelpWindow()
    this.associateHelpWindow()
    this.adjustOptionsWindow()
}

Scene_Options.prototype.associateHelpWindow = function() {
    this._optionsWindow.setHelpWindow(this._helpWindow)
}

Scene_Options.prototype.adjustOptionsWindow = function(){
    this._optionsWindow.y = this.mainAreaTop()
}

Scene_Options.prototype.helpAreaHeight = function() {
    return this.calcWindowHeight(Plugin.options().lines, false)
}

Scene_Options.prototype.isBottomHelpMode = function() {
    const type = Plugin.options().position
    const position = { Top: false, Bottom: true }

    return position[type]
}

}

/* ------------------------------ WINDOW OPTION ----------------------------- */
{

Alias.Window_Options_updateHelp = Window_Options.prototype.updateHelp
Window_Options.prototype.updateHelp = function(){
    Alias.Window_Options_updateHelp.call(this)
    this.updateMoreHelp()
}

Window_Options.prototype.updateMoreHelp = function(){
    const symbol = this.currentSymbol()
    const text = Plugin.options().text

    this._helpWindow.setTextWrap(text[symbol] || '')
}

}

} // Plugin.options().enable && !Imported.YEP_OptionsCore

/* ========================================================================== */
/*                                GAME END HELP                               */
/* ========================================================================== */

if(Plugin.gameEnd().enable){

/* ----------------------------- SCENE GAME END ----------------------------- */
{

Alias.Scene_GameEnd_create = Scene_GameEnd.prototype.create
Scene_GameEnd.prototype.create = function() {
    Alias.Scene_GameEnd_create.call(this)
    this.createHelpWindow()
    this.associateHelpWindow()
}

Scene_GameEnd.prototype.associateHelpWindow = function() {
    this._commandWindow.setHelpWindow(this._helpWindow)
}

Scene_GameEnd.prototype.helpAreaHeight = function() {
    const lines = Plugin.gameEnd().lines
    return this.calcWindowHeight(lines, false)
}

Scene_GameEnd.prototype.isBottomHelpMode = function() {
    const type = Plugin.gameEnd().position
    const position = { Top: false, Bottom: true }

    return position[type]
}

}

/* ----------------------------- WINDOW GAME END ---------------------------- */
{

Alias.Window_GameEnd_updateHelp = Window_GameEnd.prototype.updateHelp
Window_GameEnd.prototype.updateHelp = function(){
    Alias.Window_GameEnd_updateHelp.call(this)
    this.updateMoreHelp()
}

Window_GameEnd.prototype.updateMoreHelp = function() {
    const symbol = this.currentSymbol()
    const text = Plugin.gameEnd().text

    this._helpWindow.setTextWrap(text[symbol] || '')
}

}

} // Plugin.gameEnd().enable

/* ========================================================================== */
/*                                  NAME HELP                                 */
/* ========================================================================== */

if(Plugin.name().enable) {

/* ------------------------------- SCENE NAME ------------------------------- */
{

Alias.Scene_Name_create = Scene_Name.prototype.create
Scene_Name.prototype.create = function() {
    Alias.Scene_Name_create.call(this)
    this.createHelpWindow()
}

Alias.Scene_Name_createHelpWindow = Scene_Name.prototype.createHelpWindow
Scene_Name.prototype.createHelpWindow = function() {
    Alias.Scene_Name_createHelpWindow.call(this)
    this._helpWindow.hide()
    this._helpWindow.close()
    this._helpWindow.setTextWrap(Plugin.name().text)
}

Alias.Scene_Name_start = Scene_Name.prototype.start
Scene_Name.prototype.start = function() {
    Alias.Scene_Name_start.call(this)
    this._helpWindow.show()
    this._helpWindow.open()
}

Scene_Name.prototype.helpAreaHeight = function() {
    const lines = Plugin.name().lines
    return this.calcWindowHeight(lines, false)
}

Scene_Name.prototype.isBottomHelpMode = function() {
    const type = Plugin.name().position
    const position = { Top: false, Bottom: true }

    return position[type]
}

Scene_Name.prototype.editWindowRect = function() {
    const padding = $gameSystem.windowPadding()
    const ww = Graphics.boxWidth
    const wh = ImageManager.faceHeight + padding * 2
    const wx = 0
    const wy = this.mainAreaTop()

    return new Rectangle(wx, wy, ww, wh)
}

Scene_Name.prototype.inputWindowRect = function() {
    const wx = this._editWindow.x
    const wy = this._editWindow.y + this._editWindow.height
    const ww = this._editWindow.width
    const maxHeight = this.mainAreaHeight() - (this._editWindow.height + this.helpAreaHeight())
    const wh = Math.max(Window_NameInput.prototype.fittingHeight(9), maxHeight)

    return new Rectangle(wx, wy, ww, wh)
}

}

/* ---------------------------- WINDOW NAME INPUT --------------------------- */
Window_NameInput.prototype.lineHeight = function() {
    return 22
}

} // Plugin.name().enable

/* ========================================================================== */
/*                                  SHOP HELP                                 */
/* ========================================================================== */

if(Plugin.shop().enable){

/* ------------------------------- SCENE SHOP ------------------------------- */
{

Alias.Scene_Shop_start = Scene_Shop.prototype.start
Scene_Shop.prototype.start = function(){
    Alias.Scene_Shop_start.call(this)
    const symbol = this._commandWindow.currentSymbol()
    this._categoryWindow._helpWindow.setTextWrap(Plugin.shop().text[symbol])
}

Scene_Shop.prototype.isBottomHelpMode = function() {
    const type = Plugin.shop().position
    const position = { Top: false, Bottom: true }

    return position[type]
}

Scene_Shop.prototype.helpAreaHeight = function() {
    const lines = Plugin.shop().lines
    return this.calcWindowHeight(lines, false)
}

Alias.Scene_Shop_createCommandWindow = Scene_Shop.prototype.createCommandWindow;
Scene_Shop.prototype.createCommandWindow = function() {
    Alias.Scene_Shop_createCommandWindow.call(this)
    this._commandWindow.setHelpWindow(this._helpWindow)
}

Alias.Scene_Shop_onBuyCancel = Scene_Shop.prototype.onBuyCancel
Scene_Shop.prototype.onBuyCancel = function() {
    Alias.Scene_Shop_onBuyCancel.call(this)
    this._commandWindow.activate()
}

}

/* --------------------------- WINDOW SHOP COMMAND -------------------------- */
{

Window_ShopCommand.prototype.updateMoreHelp = function() {
    const symbol = this.currentSymbol()
    const text = Plugin.shop().text

    this._helpWindow.setTextWrap(text[symbol])
}

Alias.Window_ShopCommand_updateHelp = Window_ShopCommand.prototype.updateHelp
Window_ShopCommand.prototype.updateHelp = function() {
    Alias.Window_ShopCommand_updateHelp.call(this)
    this.updateMoreHelp()
}

}

} // Plugin.shop().enable

/* ========================================================================== */
/*                                 BATTLE HELP                                */
/* ========================================================================== */

if(Plugin.battle().enable){

/* ------------------------------ SCENE BATTLE ------------------------------ */
{

Alias.Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows
Scene_Battle.prototype.createAllWindows = function() {
    Alias.Scene_Battle_createAllWindows.call(this)
    this.associateHelpWindow()
}

Alias.Scene_Battle_createHelpWindow = Scene_Battle.prototype.createHelpWindow
Scene_Battle.prototype.createHelpWindow = function(){
    Alias.Scene_Battle_createHelpWindow.call(this)
    this.closeHelpWindow()
}

Scene_Battle.prototype.associateHelpWindow = function(){
    this._partyCommandWindow.setHelpWindow(this._helpWindow)
    this._actorCommandWindow.setHelpWindow(this._helpWindow)
}

Scene_Battle.prototype.helpAreaHeight = function() {
    const lines = Plugin.battle().lines
    return this.calcWindowHeight(lines, false)
}

Scene_Battle.prototype.openHelpWindow = function(){
    this._helpWindow.show()
    this._helpWindow.open()
}

Scene_Battle.prototype.closeHelpWindow = function(){
    this._helpWindow.hide()
    this._helpWindow.close()
}

Alias.Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection
Scene_Battle.prototype.startPartyCommandSelection = function() {
    Alias.Scene_Battle_startPartyCommandSelection.call(this)
    this.openHelpWindow()
}

Alias.Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection
Scene_Battle.prototype.startActorCommandSelection = function() {
    Alias.Scene_Battle_startActorCommandSelection.call(this)
    this.openHelpWindow()
}

Alias.Scene_Battle_hideSubInputWindows = Scene_Battle.prototype.hideSubInputWindows
Scene_Battle.prototype.hideSubInputWindows = function() {
    Alias.Scene_Battle_hideSubInputWindows.call(this)
    this.closeHelpWindow()
}

}

/* --------------------------- WINDOW BATTLE SKILL -------------------------- */
{

Alias.Window_BattleSkill_hide = Window_BattleSkill.prototype.hide
Window_BattleSkill.prototype.hide = function() {
    Alias.Window_BattleSkill_hide.call(this)
    SceneManager._scene.openHelpWindow()
}

Alias.Window_BattleItem_hide = Window_BattleItem.prototype.hide
Window_BattleItem.prototype.hide = function() {
    Alias.Window_BattleItem_hide.call(this)
    SceneManager._scene.openHelpWindow()
}

Window_PartyCommand.prototype.updateHelp = function(){
    this.updateMoreHelp()
}

Window_PartyCommand.prototype.updateMoreHelp = function() {
    const symbol = this.currentSymbol()
    const text = Plugin.battle().partyCmdText

    this._helpWindow.setTextWrap(text[symbol] || '')
}

Window_ActorCommand.prototype.updateHelp = function(){
    this.updateMoreHelp()
}

Window_ActorCommand.prototype.updateMoreHelp = function() {
    const cmdSymbol = this.currentSymbol()
    const cmdExt = this.currentExt()
    const symbolText = Plugin.battle().actorCmdText
    const extText = Plugin.battle().actorCmdText.skillExt

    if(cmdSymbol === 'skill') {
        this._helpWindow.setTextWrap(extText[cmdExt-1] || '')
    } else{
        this._helpWindow.setTextWrap(symbolText[cmdSymbol] || '')
    }
}

}

} // Plugin.battle().enable

/* ========================================================================== */
/*                              SELECT ITEM HELP                              */
/* ========================================================================== */

if(Plugin.selectItem().enable){

/* ---------------------------- WINDOW EVENT ITEM --------------------------- */
Window_EventItem.prototype.helpWindowRect = function() { 
    const wx = 0
    const wy = 0
    const ww = Graphics.boxWidth
    const wh = SceneManager._scene.calcWindowHeight(2, false)
    return new Rectangle(wx, wy, ww, wh)
}

Window_EventItem.prototype.createHelpWindow = function() {
    const rect = this.helpWindowRect()
    this._helpWindow = new Window_Help(rect)
    this._helpWindow.visible = false
    this._helpWindow.close()
    SceneManager._scene.addWindow(this._helpWindow)
}

Alias.Window_EventItem_initialize = Window_EventItem.prototype.initialize
Window_EventItem.prototype.initialize = function(rect) {
    Alias.Window_EventItem_initialize.call(this, rect)
    this.createHelpWindow()
}

Window_EventItem.prototype.updateHelpPosition = function(){
    if(this.y === 0){
        this._helpWindow.y = this.y + this.height + 12
    }else{
        this._helpWindow.y = 0
    } 
}

Alias.Window_EventItem_open = Window_EventItem.prototype.open
Window_EventItem.prototype.open = function(){
    Alias.Window_EventItem_open.call(this)
    if(this._helpWindow){
        this.updateHelpPosition()
        this._helpWindow.open()
    }
}

Alias.Window_EventItem_close = Window_EventItem.prototype.close
Window_EventItem.prototype.close = function(){
    Alias.Window_EventItem_close.call(this)
    if(this._helpWindow){
        this._helpWindow.close()
    }
}

Window_EventItem.prototype.updateHelpWindowVisibility = function(){
    return this.isOpening() || this.isOpenAndActive() || this.isClosing()
}

Alias.Window_EventItem_update = Window_EventItem.prototype.update
Window_EventItem.prototype.update = function(){
    Alias.Window_EventItem_update.call(this)
    if(this._helpWindow){
        this._helpWindow.visible = this.updateHelpWindowVisibility()
    }
}

} // Plugin.selectItem().enable

/* ========================================================================== */
/*                                 CHOICE HELP                                */
/* ========================================================================== */

if(Plugin.choice().enable){

Window_ChoiceList.prototype.helpWindowRect = function() { 
    const wx = 0
    const wy = 0
    const ww = Graphics.boxWidth
    const wh = SceneManager._scene.calcWindowHeight(2, false)

    return new Rectangle(wx, wy, ww, wh)
}

Window_ChoiceList.prototype.createHelpWindow = function() {
    const rect = this.helpWindowRect()
    this._helpWindow = new Window_Help(rect)
    this._helpWindow.visible = false
    this._helpWindow.close()
    SceneManager._scene.addWindow(this._helpWindow)
}

Alias.Window_ChoiceList_initialize = Window_ChoiceList.prototype.initialize
Window_ChoiceList.prototype.initialize = function() {
    Alias.Window_ChoiceList_initialize.call(this)
    this.createHelpWindow()
}

Alias.Window_ChoiceList_updateHelp = Window_ChoiceList.prototype.updateHelp
Window_ChoiceList.prototype.updateHelp = function() {
    Alias.Window_ChoiceList_updateHelp.call(this)
    const text = Plugin.choice().text[this._index] || ""
    this._helpWindow.setText(text)
}

Alias.Window_ChoiceList_open = Window_ChoiceList.prototype.open
Window_ChoiceList.prototype.open = function(){
    Alias.Window_ChoiceList_open.call(this)

    if(this._helpWindow && Plugin.choice().visibility){
        this._helpWindow.open()
    }
}

Alias.Window_ChoiceList_close = Window_ChoiceList.prototype.close
Window_ChoiceList.prototype.close = function(){
    Alias.Window_ChoiceList_close.call(this)

    if(this._helpWindow){
        this._helpWindow.close()
        
    }
}

Window_ChoiceList.prototype.updateHelpWindowVisibility = function(){
    return Plugin.choice().visibility && (this.isOpening() || this.isOpenAndActive() || this.isClosing())
}

Alias.Window_ChoiceList_update = Window_ChoiceList.prototype.update
Window_ChoiceList.prototype.update = function(){
    Alias.Window_ChoiceList_update.call(this)

    if(this._helpWindow){
        this._helpWindow.visible = this.updateHelpWindowVisibility()
        if(this._helpWindow.isClosed()){
            Plugin.choice().visibility = false
        }
    }
}

} // Plugin.choice().enable

/* ========================================================================== */
/*                              NUMBER INPUT HELP                             */
/* ========================================================================== */

if(Plugin.numberInput().enable){

Window_NumberInput.prototype.helpWindowRect = function() { 
    const wx = 0
    const wy = 0
    const ww = Graphics.boxWidth
    const wh = SceneManager._scene.calcWindowHeight(2, false)
    return new Rectangle(wx, wy, ww, wh)
}

Window_NumberInput.prototype.createHelpWindow = function() {
    const rect = this.helpWindowRect()
    this._helpWindow = new Window_Help(rect)
    this._helpWindow.visible = false
    this._helpWindow.close()
    SceneManager._scene.addWindow(this._helpWindow)
}

Alias.Window_NumberInput_initialize = Window_NumberInput.prototype.initialize
Window_NumberInput.prototype.initialize = function() {
    Alias.Window_NumberInput_initialize.call(this)
    this.createHelpWindow()
}

Alias.Window_NumberInput_start = Window_NumberInput.prototype.start
Window_NumberInput.prototype.start = function() {
    Alias.Window_NumberInput_start.call(this)
}

Alias.Window_NumberInput_open = Window_NumberInput.prototype.open
Window_NumberInput.prototype.open = function(){
    Alias.Window_NumberInput_open.call(this)

    if(this._helpWindow && Plugin.numberInput().visibility){
        this._helpWindow.open()
    }
}

Alias.Window_NumberInput_close = Window_NumberInput.prototype.close
Window_NumberInput.prototype.close = function(){
    Alias.Window_NumberInput_close.call(this)

    if(this._helpWindow){
        this._helpWindow.close()
    }
}

Alias.Window_NumberInput_updateHelp = Window_NumberInput.prototype.updateHelp
Window_NumberInput.prototype.updateHelp = function() {
    Alias.Window_NumberInput_updateHelp.call(this)
    this._helpWindow.setText(Plugin.numberInput().text)
}

Window_NumberInput.prototype.updateHelpWindowVisibility = function(){
    return this.isOpening() || this.isOpenAndActive() || this.isClosing()
}

Alias.Window_NumberInput_update = Window_NumberInput.prototype.update
Window_NumberInput.prototype.update = function(){
    Alias.Window_NumberInput_update.call(this)
    if(this._helpWindow){
        this._helpWindow.visible = this.updateHelpWindowVisibility()
    }
}

}

}