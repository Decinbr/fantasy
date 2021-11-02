```jsx
/*:
 *
 * @target MZ
 * @plugindesc Window Base Customizada
 * @author Kleberson Romero (Komuro)
 * @version 2.5
 * 
 * @url https://www.notion.so/Comuns-Plugins-c43978c8021c41e4be7e5ea94acbbad8#67deab13b5d04a0db0359a14425aaa8b
 * 
 * @param WindowBase Custom
 * 
 * @param Dragable
 * @text Arrastavel?
 * @parent WindowBase Custom
 * @type boolean
 * @on Sim
 * @off Não
 * @desc Ativar ou Desativar Janela Arrastavel
 * @default true
 *
 * @param Closeable
 * @text Fechavel?
 * @parent WindowBase Custom
 * @type boolean
 * @on Sim
 * @off Não
 * @desc Ativar ou Desativar Janela Fechavel
 * @default true
 *
 * @help
 * Esse plugin adiciona várias funções na Window_Base padrão do RMMZ.
 *
 * Como Arrasto de Janela, Fechamento por Click em área, área de uma Janela.
 * Título na Janela.
 *
 * Para add título a uma janela chama o seguinte cod. no initilize da janela escolhida
 * this.create_title_sprite("Título Janela")
 *
 *  //=============================================//
 * //              Exemplo de USO!                // 
 * //=============================================//
 * const _alias_Window_TitleCommand = Window_TitleCommand.prototype.initialize;
 * Window_TitleCommand.prototype.initialize = function(rect) {
 *  _alias_Window_TitleCommand.call(this, rect);
 *  this.create_title_sprite("Bem vindo ao KR_Engine!");
 *  this.closeable = false;
 *  this.dragable = true;
 *};
 *
 * Nota Importante o Plugin deve conter o nome como KR_Custom_Window.js pois os parametros só 
 * são lidos se o Nome do Plugin for igual ao pluginName da const pluginName.
 *
 */

// Cria uma Variavel KR
var KR = KR || {};
KR.Window    = {};
KR.Window.version = 2.5;

const pluginName = 'KR_Custom_Window';

// Parametros do PluginManager
KR.Window.parameters   = PluginManager.parameters(pluginName);
KR.Window.Draggable     = eval(KR.Window.parameters['Draggable'] || 'true');
KR.Window.Closeable    = eval(KR.Window.parameters['Closeable'] || 'false');
// Variavel Global de Janelas derivadas da Window_Base
$window = []
  //=======================================================================//
 //  ** Metodo Alias do Window_Base.initialize                            //
//=======================================================================//
const _Window_Base_Initilize = Window_Base.prototype.initialize;

Window_Base.prototype.initialize = function(rect) {   
    //Alias
    _Window_Base_Initilize.call(this,rect);
    //Novos Parametros
    this.draggable = KR.Window.Draggable;
    this.closeable = KR.Window.Closeable;
    this.max_X = Graphics.width - this.width;
    this.max_Y = Graphics.height - this.height;
    this.buttoncreate = null;
    this.create_title_sprite();
    $window = this;
};
//=======================================================================//
 //  ** Metodo de Criação do Sprite de Título                             //
//=======================================================================//
Window_Base.prototype.create_title_sprite = function(text){
  this.text = text
  this.title_sprite = new Sprite();
  this.title_sprite.bitmap = new Bitmap(this.width, this.height);
  this.title_sprite.x = 0;
  this.title_sprite.y = -4;
  this.addChild(this.title_sprite);
};
  //=======================================================================//
 //  ** Metodo executado ao Clicar no ButtonX                             //
//=======================================================================//
Window_Base.prototype.clickButtonX = function(){
  SoundManager.playOk();
  this.deactivate();
  this.hide();
  this.close(); 
};
  //=======================================================================//
 //  ** Metodo Alias do Window_Base.update                                //
//=======================================================================//
const _alias_Window_Base_update_drag = Window_Base.prototype.update;
Window_Base.prototype.update = function() {
  _alias_Window_Base_update_drag.call(this,arguments);
    this.update_drag_move();
    if (TouchInput.isTriggered() && (this.in_area(this.width-14,2,16,16)) && (this.closeable)){
    this.on_close();  
    }else if (TouchInput.isTriggered() && (this.in_area(this.width-14,2,16,16)) && (!this.closeable)){ SoundManager.playBuzzer() }  
    this.update_title_sprite();
};
  //=======================================================================//
 //  ** Metodo de Atualização do Sprite de Título                         //
//=======================================================================//
Window_Base.prototype.update_title_sprite = function(){
    //-----------------------------------------------------------------------------------------------------//
    if (this.text === undefined){                          // Se o Texto não for definido
      this.text = "";                                     //  Define o texto para Vazio
    }else{                                               // Caso possuia texto definido
      this.title_sprite.bitmap._drawTextOutline(this.text,0,15,this.width); // Escreve a sobra do texto
      this.title_sprite.bitmap._drawTextBody(this.text,0,15,this.width);   //  Escrebe o texto
    }
    //-----------------------------------------------------------------------------------------------------//
    if (this.title_sprite === undefined){             // Se o Sprite for indefinido
       this.title_sprite.bitmap.clear();            // Limpa o Bitmap
    }else{
      
      if(this.text.length > 5 ){
        this.title_sprite.x = (this.width / 4);
      }else{
        this.title_sprite.x = (this.width / 2.3);
      }
      this.title_sprite.visible = this.visible;
    }
    //-----------------------------------------------------------------------------------------------------//
};
  //=======================================================================//
 //  ** Metodo Alias do Window_Base.on_close                              //
//=======================================================================//
Window_Base.prototype.on_close = function(){
  SoundManager.playOk();
  this.deactivate();
  this.hide();
  this.close();
};
  //=======================================================================//
 //  ** Metodo de atualização drag_move Window_Base                       //
//=======================================================================//
Window_Base.prototype.update_drag_move = function() {
    this.check_dragability();
    if(this.in_draging){ this.update_in_drag() }
};
  //=======================================================================//
 //  ** Metodo de verificação de arrasto na area(grid) Window_Base        //
//=======================================================================//
Window_Base.prototype.check_dragability = function() {
    if(TouchInput.isPressed()){
    if(this.can_drag() && (this.in_area(0,0,this.width-16,16))) { this.in_drag()}} // Verifica se é possivel arrastar a janela e se está na area
    else{ if(this.in_draging){ this.drag_cancel() }}        // Cancela o arrasto
};
  //=======================================================================//
 //  ** Metodo de verificação se janela é arrastevel Window_Base          //
//=======================================================================//
Window_Base.prototype.can_drag = function() {
	if (this.draggable){ return true }else{ return false	}
};
  //=======================================================================//
 //  ** Metodo de verificação se está dentro a área da janela             //
//=======================================================================//
Window_Base.prototype.in_area = function(x,y,width,height) {
    var tx = TouchInput.x;
    var ty = TouchInput.y;   
    if(tx >= this.x+x && tx <= (this.x+this.width) && ty >= this.y+y && ty <= (this.y+height)) { return true} else{ return false }
};
  //=======================================================================//
 //  ** Metodo de verificação está arrastando?                            //
//=======================================================================//
Window_Base.prototype.in_drag = function() {
    this.in_draging = true;
    this.ini_pos_drag = [this.x,this.y];
    this.ini_pos_touch_drag = [TouchInput.x,TouchInput.y];
    this.backOpacity = 90;
};
  //=======================================================================//
 //  ** Metodo de cancelamento do arrasto                                 //
//=======================================================================//
Window_Base.prototype.drag_cancel = function() {
    this.in_draging = false;
    this.update_pos_grid();
    this.backOpacity = 200;
};
  //=======================================================================//
 //  ** Metodo de Atualização da posição do arrasto                       //
//=======================================================================//
Window_Base.prototype.update_in_drag = function() {
    var difX = TouchInput.x - this.ini_pos_touch_drag[0];
    var difY = TouchInput.y - this.ini_pos_touch_drag[1];
    this.x = this.ini_pos_drag[0] + difX;
    this.y = this.ini_pos_drag[1] + difY;
};
  //==========================================================================//
 //  ** Metodo de Atualização da posição do arrasto dentro da area do grafico //
//===========================================================================//
Window_Base.prototype.update_pos_grid = function() {
    // Calculo de Maximo X
    if (this.x > this.max_X){ 
    	this.x = this.max_X;
    if (this.x > this.max_X && this.y > this.max_Y){
      this.x = this.max_X;
      this.y = this.max_Y;
    }
    }else if (this.x < 0) {
    	this.x = 0;
    if (this.x && this.y < 0){ this.x = 0; this.y = 0 }
    }
    // Calculo de Maximo Y
    if (this.y > this.max_Y){
    	this.y = this.max_Y;
    }else if (this.y < 0) {
		  this.y = 0;
    if (this.y && this.x < 0){ this.x = 0; this.y = 0 }
    }
};

  //=============================================//
 //              Exemplo de USO!                // 
//=============================================//
const _alias_Window_TitleCommand = Window_TitleCommand.prototype.initialize;
Window_TitleCommand.prototype.initialize = function(rect) {
  _alias_Window_TitleCommand.call(this, rect);
  this.create_title_sprite("Plugins Comuns S2");
};

const _alias_Window_Options = Window_Options.prototype.initialize;

Window_Options.prototype.initialize = function(rect) {
  _alias_Window_Options.call(this, rect);
  this.draggable = true;
  this.closeable = true;
};

const _alias_Scene_Base_Update = Scene_Base.prototype.update

Scene_Base.prototype.update = function() {
  _alias_Scene_Base_Update.call(this);
  //console.log($window.constructor);
  switch($window.constructor){
    
    case Window_Options:
      if($window._openness<=0){
        SoundManager.playCancel();
        SceneManager.pop();
      }
    break;
    
    case Window_SavefileList:
      if($window._openness<=0){
        SoundManager.playCancel();
        SceneManager.pop();
      }
    break;

    case Window_MenuStatus:
      if($window._openness<=0){
        SoundManager.playCancel();
        SceneManager.pop();
      }
    break;
    
  }
};