//======================
// GRB_LargerChoices.js
//======================
/*:
 * @target MV MZ
 * @plugindesc Use larger texts for Show Choice command
 * @author Garbata Team
 * @url https://rpgukr.one/GRB_LargerChoices
 *
 * @help To use this plugin, add a comment starting with a line
 * CHOICE TEXT: as the first event command inside a choice branch. Then the
 * text of the comment (rest of it) will be used displayed as the choice text.
 *
 * This plugin is placed into public domain according to the CC0 public domain
 * dedication. See https://creativecommons.org/publicdomain/zero/1.0/ for more
 * information.
 *
 */
/*:ru
 * @target MV MZ
 * @plugindesc Использование больших текстов в команде Показать выбор
 * @author Команда Гарбата
 * @url https://rpgukr.one/GRB_LargerChoices
 *
 * @help Чтобы использовать этот плагин, добавьте комментарий с текстом
 * ТЕКСТ ВЫБОРА: в первой строке внутри ветви выбора. Комментарий должен
 * быть первой командой внутри ветви. Тогда текст комментария (кроме
 * первой строки) будет использоваться как текст выбора.
 *
 * Этот плагин передан в общественное достояние согласно CC0. Подробнее см. на
 * странице https://creativecommons.org/publicdomain/zero/1.0/deed.ru
 */
/*:be
 * @target MV MZ
 * @plugindesc Выкарыстанне вялікіх тэкстаў у камандзе Паказаць выбар
 * @author Каманда Гарбата
 * @url https://рпг.укр/GRB_LargerChoices
 *
 * @help Каб карыстацца гэтым плагінам, дадайце каментарый з тэкстам
 * ТЭКСТ ВЫБАРУ: у першым радку ўсярэдзіне галіны выбару. Каментарый
 * мусіць быць першай камандай усярэдзіне галіны. Тады тэкст каментарыя
 * (акрамя першага радку) будзе выкарыстоўвацца як тэкст выбару.
 *
 * Гэты плагін пярэданы ў грамадскі набытак згодна з CC0. Падрабязней гл. на
 * старонцы https://creativecommons.org/publicdomain/zero/1.0/deed.be
 */
/*:uk
 * @target MV MZ
 * @plugindesc Використання великих текстів в команді Показати вибір
 * @author Команда Гарбата
 * @url https://рпг.укр/GRB_LargerChoices
 *
 * @help Щоб користатися цим плагіном, додайте коментар з текстом ТЕКСТ ВИБОРУ:
 * в першому рядку в галину вибору. Коментар мусить бути першої командою
 * в середині галини. Тоді текст коментаря будзе вжито як текст вибору.
 *
 * Цей плагін передано до суспільного надбання згідно з CC0. Детальніше див.
 * на сторінці https://creativecommons.org/publicdomain/zero/1.0/deed.uk
 */

if (typeof Imported === 'undefined') {
  Imported = {};
}
Imported.GRB_LargerChoices = '0.2';

(function () {

var Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
Game_Interpreter.prototype.setupChoices = function(params) {
  /** @var {Object} First of the show choice commands (with code 102) */
  var startCmd = this.currentCommand();

  if (startCmd.code !== 102 || startCmd.parameters != params) {
    // The command is not called for the current command
    // I don't really understand how this can happen, probably other plugin's magic
    // To be safe, let's just bail out
    return Game_Interpreter_setupChoices.call(this, params);
  }

  var index = this._index; //UNSAFE
  var choices = this.grbFindMatchingChoices(index);
  if (!choices) {
    choices = params[0].clone();
  }

  var defaultType = params.length > 2 ? params[2] : 0;
  var cancelType = params[1];

  //it shouldn't be returning a result, really, but this won't hurt
  var result = Game_Interpreter_setupChoices.call(this, params);
  $gameMessage.setChoices(choices, defaultType, cancelType);

  return result;
}

/**
 * Retrieve the comment for the choice list if it's holding text for the
 * Choice branch.
 *
 * @param {Integer} commentIndex Index of the 108 command
 * @param {Integer} indent Expected indent (should be larger than choice's
 * indent by 1).
 * @return {String|null} Text of choice branch.
 */
Game_Interpreter.prototype.grbGetChoiceTextFromComment = function(commentIndex, indent) {
  var list = this._list; //UNSAFE
  var startRegexp = /^\s*(ТЕКСТ ВЫБОРА|ТЭКСТ ВЫБАРУ|ТЕКСТ ВИБОРУ|CHOICE TEXT):\s*$/;

  var startCommand = list[commentIndex];
  if (startCommand.code !== 108 || startCommand.parameters.length !== 1
               || !startCommand.parameters[0].match(startRegexp)
               || startCommand.indent !== indent) {
    return null;
  }

  var commentLines = [];
  for (var i = commentIndex + 1; i < list.length; i++) {
    var lineCmd = list[i];
    if (lineCmd.code !== 408 || lineCmd.indent !== indent || lineCmd.parameters.length !== 1) {
      break;
    }

    commentLines.push(lineCmd.parameters[0]);
  }

  if (commentLines.length > 0) {
    return commentLines.join("\n");
  } else {
    return null;
  }
}

/**
 * Retrieves long choice text inside event commands, written as choices.
 *
 * @method
 * @param {Integer} startIndex Index of the 102 command
 * @return {Array|null} Array of strings, or null.
 */
Game_Interpreter.prototype.grbFindMatchingChoices = function(startIndex) {
  var list = this._list; //UNSAFE
  var startCmd = list[startIndex];
  var fallbackChoices = startCmd.parameters[0];
  var indent = startCmd.indent;
  var choices = [];

  var branchIndex = startIndex + 1;
  var choiceEnded = false;
  while (branchIndex < list.length + 1 && !choiceEnded) {
    var currentCmd = list[branchIndex];
    if (currentCmd.code !== 402 || currentCmd.indent !== indent) {
      //Something is seriously wrong with the event command structure!
      //Bailing out, just in we don't break it anymore

      return null;
    }

    var choiceText = this.grbGetChoiceTextFromComment(branchIndex + 1, indent + 1);
    if (choiceText) {
      choices.push(choiceText);
    } else {
      choices.push(fallbackChoices[choices.length]);
    }

    //Skip to the next choice branch
    do {
      branchIndex++;
      var nextCmd = list[branchIndex];

      if (nextCmd.code === 404 && nextCmd.indent == indent) {
        choiceEnded = true;
        break;
      }
      else if (nextCmd.code === 402 && nextCmd.indent == indent) {
        break;
      }
    } while (branchIndex < list.length);

  }

  //Check if we didn't have 404 error (problems with the event command structure!)
  if (!choiceEnded) {
    return null;
  }

  //Check if the number of parameters we've got is same as we expected
  if (choices.length !== startCmd.parameters[0].length) {
    return null;
  }

  return choices;
}


/**
 * Retrieves height of a single element.
 *
 * @param {Integer} index Number of the element for which the height
 * is retrieved.
 */
Window_ChoiceList.prototype.grbItemHeight = function(index) {
  var choices = $gameMessage.choices();
  var text = choices[index];
  if (!text) {
    return this.itemHeight();
  }

  var lines = text.split('\n');

  var padding = 0;
  if (Utils.RPGMAKER_NAME == 'MZ') {
    padding = this.itemHeight() - this.lineHeight();
  }

  return lines.length * this.lineHeight() + padding;
};

if (Utils.RPGMAKER_NAME == 'MV') {
  var Window_ChoiceList_contentsHeight = Window_ChoiceList.prototype.contentsHeight;
  Window_ChoiceList.prototype.contentsHeight = function() {
    var height = 0;
    for (var i = 0; i <= this.maxItems(); i++) {
      height += this.grbItemHeight(i);
    }

    return height;
  };
}

Window_ChoiceList.prototype.itemRect = function(index) {
  var rect = new Rectangle();

  rect.width = this.itemWidth();
  rect.height = this.grbItemHeight(index);

  var padding = 0;
  if (Utils.RPGMAKER_NAME == 'MZ') {
    padding = this.itemHeight() - this.lineHeight();
  }

  rect.x = 0;
  rect.y = padding / 2;
  for (var i = 0; i < index; i++) {
    rect.y += this.grbItemHeight(i) + padding / 2;
  }
  return rect;
};

if (Utils.RPGMAKER_NAME == 'MZ') {
  Window_ChoiceList.prototype.textWidthEx = function(text) {
      return this.drawTextEx(text, 0, this.contents.height);
    };
}

Window_ChoiceList.prototype.maxChoiceWidth = function() {
  var maxWidth = 96;
  var choices = $gameMessage.choices();
  for (var i = 0; i < choices.length; i++) {
    var lines = choices[i].split("\n");
    for (var j = 0; j < lines.length; j++) {
      var padding = Utils.RPGMAKER_NAME == 'MV' ? this.textPadding()
                                                : this.itemPadding();
      var lineWidth = this.textWidthEx(lines[j]) + padding * 2;
      if (maxWidth < lineWidth) {
          maxWidth = lineWidth;
      }
    }
  }
  return maxWidth;
};

Window_ChoiceList.prototype.windowHeight = function() {
  var height = 0;
  for (var i = 0; i <= this.numVisibleRows(); i++) {
    height += this.grbItemHeight(i);
  }

  return height;
};

var Window_ChoiceList_start = Window_ChoiceList.prototype.start;
Window_ChoiceList.prototype.start = function() {
  this.height = this.contentsHeight();
  Window_ChoiceList_start.call(this);
}

if (Utils.RPGMAKER_NAME == 'MZ') {
    Window_ChoiceList.prototype.itemLineRect = function(index) {
        var rect = this.itemRectWithPadding(index);
        var padding = 4;
        rect.y += padding;
        rect.height -= padding * 2;
        return rect;
    };
}


})();