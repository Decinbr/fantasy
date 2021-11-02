//=============================================================================
// ** RPG Maker MZ - DragonMZ_AnimationControl.js
//=============================================================================

var Dragon                 = Dragon             || {};
Dragon.AnimControl         = Dragon.AnimControl || {};
Dragon.AnimControl.VERSION = [1, 0, 0];

/*:
 * @plugindesc [RPG Maker MZ] - Dragon Animation Control (v.1.0.0)
 * @url http://dragonrefuge.net
 * @target MZ
 * @author The Dragon (Jorge Feitosa)
 */

(($) => {

    function VirtualTarget() {
        this.initialize(...arguments);
    }
    ((proto) => {
        proto.initialize = function(position = [0, 0], posType = 'screen', layer = 4, angleOffset = null, angle = null) {
            if (position instanceof Array) {
                position = new Point(...position);
            }
            this._position      = position;
            this._posType       = posType;
            this._layer         = Math.max(0, Math.min(9, layer));
            this._angleOffset   = angleOffset;
            this._angle         = angle;
            this._sprite        = new Sprite();
            this.position       = this._sprite.position;
            this.scale          = this._sprite.scale;
            const owner         = this
            this.worldTransform = {
                apply: function(pos, newPos) {
                    owner._sprite.position.set(owner.x, owner.y);
                    owner._sprite.updateTransform();
                    return PIXI.Matrix.prototype.apply.call(owner._sprite.worldTransform, pos, newPos);
                }
            };
            let
            parent,
            scene = SceneManager._scene;
            if (posType === 'map' && scene instanceof Scene_Map) {
                parent = scene._spriteset;
            } else {
                parent = scene;
            }
            parent.addChild(this._sprite);
        }

        proto.setBlendColor = function() {};

        proto.updateTransform = function() {};

        Object.defineProperties(proto, {
            height: {
                get: function() {
                    return $gameMap.tileHeight();
                },
                configurable: true
            },
            x: {
                get: function() {
                    if (this._posType === 'map') {
                        const tw = $gameMap.tileWidth();
                        return Math.floor($gameMap.adjustX(this._position.x) * tw);
                    } else {
                        return this._position.x;
                    }
                },
                configurable: true
            },
            y: {
                get: function() {
                    if (this._posType === 'map') {
                        const th = $gameMap.tileHeight();
                        return Math.floor($gameMap.adjustY(this._position.y) * th);
                    } else {
                        return this._position.y;
                    }
                },
                configurable: true
            }
        });
    })(VirtualTarget.prototype);

    $.VirtualTarget = VirtualTarget;


    const alias_Game_Temp_prototype_requestAnimation = Game_Temp.prototype.requestAnimation;
    Game_Temp.prototype.requestAnimation = function(targets) {
        arguments[0] = targets.map((target) => {
            if (target instanceof Array) {
                return new VirtualTarget(...target);
            }
            return target;
        });
        return alias_Game_Temp_prototype_requestAnimation.call(this, ...arguments);
    };

    
    const alias_Spriteset_Base_prototype_createAnimationSprite = Spriteset_Base.prototype.createAnimationSprite;
    Spriteset_Base.prototype.createAnimationSprite = function() {
        const lastEffectsContainer = this._effectsContainer;
        this._effectsContainer     = this;
        alias_Spriteset_Base_prototype_createAnimationSprite.call(this, ...arguments);
        this._effectsContainer     = lastEffectsContainer;
    };


    const alias_Spriteset_Base_prototype_removeAnimation = Spriteset_Base.prototype.removeAnimation;
    Spriteset_Base.prototype.removeAnimation = function(sprite) {
        const lastEffectsContainer = this._effectsContainer;
        this._effectsContainer     = this;
        alias_Spriteset_Base_prototype_removeAnimation.call(this, ...arguments);
        this._effectsContainer     = lastEffectsContainer;
    };

    const alias_Spriteset_Map_prototype_findTargetSprite = Spriteset_Map.prototype.findTargetSprite;
    Spriteset_Map.prototype.findTargetSprite = function(target) {
        if (target instanceof VirtualTarget) {
            return target;
        }
        return alias_Spriteset_Map_prototype_findTargetSprite.call(this, ...arguments);
    };

    $.play = function(animationId, mirror, layer, position, posType, angleOffset, angle) {
        $gameTemp.requestAnimation(
            [new VirtualTarget(position, posType, layer, angleOffset, angle)],
            animationId,
            mirror
        );
    }

})(Dragon.AnimControl);