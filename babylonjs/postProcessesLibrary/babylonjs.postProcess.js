(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-post-process", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-post-process"] = factory(require("babylonjs"));
	else
		root["POSTPROCESSES"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_decorators__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/postProcesses/src/asciiArt/asciiArtPostProcess.ts":
/*!**********************************************************************!*\
  !*** ../../../dev/postProcesses/src/asciiArt/asciiArtPostProcess.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsciiArtFontTexture: () => (/* binding */ AsciiArtFontTexture),
/* harmony export */   AsciiArtPostProcess: () => (/* binding */ AsciiArtPostProcess)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/Extensions/engine.dynamicTexture */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _asciiart_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./asciiart.fragment */ "../../../dev/postProcesses/src/asciiArt/asciiart.fragment.ts");








/**
 * AsciiArtFontTexture is the helper class used to easily create your ascii art font texture.
 *
 * It basically takes care rendering the font front the given font size to a texture.
 * This is used later on in the postprocess.
 */
var AsciiArtFontTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(AsciiArtFontTexture, _super);
    /**
     * Create a new instance of the Ascii Art FontTexture class
     * @param name the name of the texture
     * @param font the font to use, use the W3C CSS notation
     * @param text the caracter set to use in the rendering.
     * @param scene the scene that owns the texture
     */
    function AsciiArtFontTexture(name, font, text, scene) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, scene) || this;
        scene = _this.getScene();
        if (!scene) {
            return _this;
        }
        _this.name = name;
        _this._text == text;
        _this._font == font;
        _this.wrapU = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Texture.CLAMP_ADDRESSMODE;
        _this.wrapV = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Texture.CLAMP_ADDRESSMODE;
        //this.anisotropicFilteringLevel = 1;
        // Get the font specific info.
        var maxCharHeight = _this._getFontHeight(font);
        var maxCharWidth = _this._getFontWidth(font);
        _this._charSize = Math.max(maxCharHeight.height, maxCharWidth);
        // This is an approximate size, but should always be able to fit at least the maxCharCount.
        var textureWidth = Math.ceil(_this._charSize * text.length);
        var textureHeight = _this._charSize;
        // Create the texture that will store the font characters.
        _this._texture = scene.getEngine().createDynamicTexture(textureWidth, textureHeight, false, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_SAMPLINGMODE);
        //scene.getEngine().setclamp
        var textureSize = _this.getSize();
        // Create a canvas with the final size: the one matching the texture.
        var canvas = document.createElement("canvas");
        canvas.width = textureSize.width;
        canvas.height = textureSize.height;
        var context = canvas.getContext("2d");
        context.textBaseline = "top";
        context.font = font;
        context.fillStyle = "white";
        context.imageSmoothingEnabled = false;
        // Sets the text in the texture.
        for (var i = 0; i < text.length; i++) {
            context.fillText(text[i], i * _this._charSize, -maxCharHeight.offset);
        }
        // Flush the text in the dynamic texture.
        scene.getEngine().updateDynamicTexture(_this._texture, canvas, false, true);
        return _this;
    }
    Object.defineProperty(AsciiArtFontTexture.prototype, "charSize", {
        /**
         * Gets the size of one char in the texture (each char fits in size * size space in the texture).
         */
        get: function () {
            return this._charSize;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the max char width of a font.
     * @param font the font to use, use the W3C CSS notation
     * @returns the max char width
     */
    AsciiArtFontTexture.prototype._getFontWidth = function (font) {
        var fontDraw = document.createElement("canvas");
        var ctx = fontDraw.getContext("2d");
        ctx.fillStyle = "white";
        ctx.font = font;
        return ctx.measureText("W").width;
    };
    // More info here: https://videlais.com/2014/03/16/the-many-and-varied-problems-with-measuring-font-height-for-html5-canvas/
    /**
     * Gets the max char height of a font.
     * @param font the font to use, use the W3C CSS notation
     * @returns the max char height
     */
    AsciiArtFontTexture.prototype._getFontHeight = function (font) {
        var fontDraw = document.createElement("canvas");
        var ctx = fontDraw.getContext("2d");
        ctx.fillRect(0, 0, fontDraw.width, fontDraw.height);
        ctx.textBaseline = "top";
        ctx.fillStyle = "white";
        ctx.font = font;
        ctx.fillText("jH|", 0, 0);
        var pixels = ctx.getImageData(0, 0, fontDraw.width, fontDraw.height).data;
        var start = -1;
        var end = -1;
        for (var row = 0; row < fontDraw.height; row++) {
            for (var column = 0; column < fontDraw.width; column++) {
                var index = (row * fontDraw.width + column) * 4;
                if (pixels[index] === 0) {
                    if (column === fontDraw.width - 1 && start !== -1) {
                        end = row;
                        row = fontDraw.height;
                        break;
                    }
                    continue;
                }
                else {
                    if (start === -1) {
                        start = row;
                    }
                    break;
                }
            }
        }
        return { height: end - start + 1, offset: start - 1 };
    };
    /**
     * Clones the current AsciiArtTexture.
     * @returns the clone of the texture.
     */
    AsciiArtFontTexture.prototype.clone = function () {
        return new AsciiArtFontTexture(this.name, this._font, this._text, this.getScene());
    };
    /**
     * Parses a json object representing the texture and returns an instance of it.
     * @param source the source JSON representation
     * @param scene the scene to create the texture for
     * @returns the parsed texture
     */
    AsciiArtFontTexture.Parse = function (source, scene) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new AsciiArtFontTexture(source.name, source.font, source.text, scene); }, source, scene, null);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)("font")
    ], AsciiArtFontTexture.prototype, "_font", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)("text")
    ], AsciiArtFontTexture.prototype, "_text", void 0);
    return AsciiArtFontTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.BaseTexture));

/**
 * AsciiArtPostProcess helps rendering everithing in Ascii Art.
 *
 * Simmply add it to your scene and let the nerd that lives in you have fun.
 * Example usage: var pp = new AsciiArtPostProcess("myAscii", "20px Monospace", camera);
 */
var AsciiArtPostProcess = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(AsciiArtPostProcess, _super);
    /**
     * Instantiates a new Ascii Art Post Process.
     * @param name the name to give to the postprocess
     * @camera the camera to apply the post process to.
     * @param camera
     * @param options can either be the font name or an option object following the IAsciiArtPostProcessOptions format
     */
    function AsciiArtPostProcess(name, camera, options) {
        var _this = _super.call(this, name, "asciiart", ["asciiArtFontInfos", "asciiArtOptions"], ["asciiArtFont"], 1, camera, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Texture.TRILINEAR_SAMPLINGMODE, undefined, true) || this;
        /**
         * This defines the amount you want to mix the "tile" or caracter space colored in the ascii art.
         * This number is defined between 0 and 1;
         */
        _this.mixToTile = 0;
        /**
         * This defines the amount you want to mix the normal rendering pass in the ascii art.
         * This number is defined between 0 and 1;
         */
        _this.mixToNormal = 0;
        // Default values.
        var font = "40px Monospace";
        var characterSet = " `-.'_:,\"=^;<+!*?/cL\\zrs7TivJtC{3F)Il(xZfY5S2eajo14[nuyE]P6V9kXpKwGhqAUbOd8#HRDB0$mgMW&Q%N@";
        // Use options.
        if (options) {
            if (typeof options === "string") {
                font = options;
            }
            else {
                font = options.font || font;
                characterSet = options.characterSet || characterSet;
                _this.mixToTile = options.mixToTile || _this.mixToTile;
                _this.mixToNormal = options.mixToNormal || _this.mixToNormal;
            }
        }
        var scene = (camera === null || camera === void 0 ? void 0 : camera.getScene()) || _this._scene;
        _this._asciiArtFontTexture = new AsciiArtFontTexture(name, font, characterSet, scene);
        var textureSize = _this._asciiArtFontTexture.getSize();
        _this.onApply = function (effect) {
            effect.setTexture("asciiArtFont", _this._asciiArtFontTexture);
            effect.setFloat4("asciiArtFontInfos", _this._asciiArtFontTexture.charSize, characterSet.length, textureSize.width, textureSize.height);
            effect.setFloat4("asciiArtOptions", _this.width, _this.height, _this.mixToNormal, _this.mixToTile);
        };
        return _this;
    }
    return AsciiArtPostProcess;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PostProcess));



/***/ }),

/***/ "../../../dev/postProcesses/src/asciiArt/asciiart.fragment.ts":
/*!********************************************************************!*\
  !*** ../../../dev/postProcesses/src/asciiArt/asciiart.fragment.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   asciiartPixelShader: () => (/* binding */ asciiartPixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "asciiartPixelShader";
var shader = "varying vec2 vUV;uniform sampler2D textureSampler;uniform sampler2D asciiArtFont;uniform vec4 asciiArtFontInfos;uniform vec4 asciiArtOptions;float getLuminance(vec3 color)\n{return clamp(dot(color,vec3(0.2126,0.7152,0.0722)),0.,1.);}\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void) \n{float caracterSize=asciiArtFontInfos.x;float numChar=asciiArtFontInfos.y-1.0;float fontx=asciiArtFontInfos.z;float fonty=asciiArtFontInfos.w;float screenx=asciiArtOptions.x;float screeny=asciiArtOptions.y;float tileX=float(floor((gl_FragCoord.x)/caracterSize))*caracterSize/screenx;float tileY=float(floor((gl_FragCoord.y)/caracterSize))*caracterSize/screeny;vec2 tileUV=vec2(tileX,tileY);vec4 tileColor=texture2D(textureSampler,tileUV);vec4 baseColor=texture2D(textureSampler,vUV);float tileLuminance=getLuminance(tileColor.rgb);float offsetx=(float(floor(tileLuminance*numChar)))*caracterSize/fontx;float offsety=0.0;float x=float(mod(gl_FragCoord.x,caracterSize))/fontx;float y=float(mod(gl_FragCoord.y,caracterSize))/fonty;vec4 finalColor= texture2D(asciiArtFont,vec2(offsetx+x,offsety+(caracterSize/fonty-y)));finalColor.rgb*=tileColor.rgb;finalColor.a=1.0;finalColor= mix(finalColor,tileColor,asciiArtOptions.w);finalColor= mix(finalColor,baseColor,asciiArtOptions.z);gl_FragColor=finalColor;}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var asciiartPixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/postProcesses/src/asciiArt/index.ts":
/*!********************************************************!*\
  !*** ../../../dev/postProcesses/src/asciiArt/index.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsciiArtFontTexture: () => (/* reexport safe */ _asciiArtPostProcess__WEBPACK_IMPORTED_MODULE_0__.AsciiArtFontTexture),
/* harmony export */   AsciiArtPostProcess: () => (/* reexport safe */ _asciiArtPostProcess__WEBPACK_IMPORTED_MODULE_0__.AsciiArtPostProcess)
/* harmony export */ });
/* harmony import */ var _asciiArtPostProcess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asciiArtPostProcess */ "../../../dev/postProcesses/src/asciiArt/asciiArtPostProcess.ts");



/***/ }),

/***/ "../../../dev/postProcesses/src/digitalRain/digitalRainPostProcess.ts":
/*!****************************************************************************!*\
  !*** ../../../dev/postProcesses/src/digitalRain/digitalRainPostProcess.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DigitalRainFontTexture: () => (/* binding */ DigitalRainFontTexture),
/* harmony export */   DigitalRainPostProcess: () => (/* binding */ DigitalRainPostProcess)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/Extensions/engine.dynamicTexture */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _digitalrain_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./digitalrain.fragment */ "../../../dev/postProcesses/src/digitalRain/digitalrain.fragment.ts");









/**
 * DigitalRainFontTexture is the helper class used to easily create your digital rain font texture.
 *
 * It basically takes care rendering the font front the given font size to a texture.
 * This is used later on in the postprocess.
 */
var DigitalRainFontTexture = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(DigitalRainFontTexture, _super);
    /**
     * Create a new instance of the Digital Rain FontTexture class
     * @param name the name of the texture
     * @param font the font to use, use the W3C CSS notation
     * @param text the caracter set to use in the rendering.
     * @param scene the scene that owns the texture
     */
    function DigitalRainFontTexture(name, font, text, scene) {
        if (scene === void 0) { scene = null; }
        var _this = _super.call(this, scene) || this;
        scene = _this.getScene();
        if (!scene) {
            return _this;
        }
        _this.name = name;
        _this._text == text;
        _this._font == font;
        _this.wrapU = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Texture.CLAMP_ADDRESSMODE;
        _this.wrapV = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Texture.CLAMP_ADDRESSMODE;
        // Get the font specific info.
        var maxCharHeight = _this._getFontHeight(font);
        var maxCharWidth = _this._getFontWidth(font);
        _this._charSize = Math.max(maxCharHeight.height, maxCharWidth);
        // This is an approximate size, but should always be able to fit at least the maxCharCount.
        var textureWidth = _this._charSize;
        var textureHeight = Math.ceil(_this._charSize * text.length);
        // Create the texture that will store the font characters.
        _this._texture = scene.getEngine().createDynamicTexture(textureWidth, textureHeight, false, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_SAMPLINGMODE);
        //scene.getEngine().setclamp
        var textureSize = _this.getSize();
        // Create a canvas with the final size: the one matching the texture.
        var canvas = document.createElement("canvas");
        canvas.width = textureSize.width;
        canvas.height = textureSize.height;
        var context = canvas.getContext("2d");
        context.textBaseline = "top";
        context.font = font;
        context.fillStyle = "white";
        context.imageSmoothingEnabled = false;
        // Sets the text in the texture.
        for (var i = 0; i < text.length; i++) {
            context.fillText(text[i], 0, i * _this._charSize - maxCharHeight.offset);
        }
        // Flush the text in the dynamic texture.
        scene.getEngine().updateDynamicTexture(_this._texture, canvas, false, true);
        return _this;
    }
    Object.defineProperty(DigitalRainFontTexture.prototype, "charSize", {
        /**
         * Gets the size of one char in the texture (each char fits in size * size space in the texture).
         */
        get: function () {
            return this._charSize;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the max char width of a font.
     * @param font the font to use, use the W3C CSS notation
     * @returns the max char width
     */
    DigitalRainFontTexture.prototype._getFontWidth = function (font) {
        var fontDraw = document.createElement("canvas");
        var ctx = fontDraw.getContext("2d");
        ctx.fillStyle = "white";
        ctx.font = font;
        return ctx.measureText("W").width;
    };
    // More info here: https://videlais.com/2014/03/16/the-many-and-varied-problems-with-measuring-font-height-for-html5-canvas/
    /**
     * Gets the max char height of a font.
     * @param font the font to use, use the W3C CSS notation
     * @returns the max char height
     */
    DigitalRainFontTexture.prototype._getFontHeight = function (font) {
        var fontDraw = document.createElement("canvas");
        var ctx = fontDraw.getContext("2d");
        ctx.fillRect(0, 0, fontDraw.width, fontDraw.height);
        ctx.textBaseline = "top";
        ctx.fillStyle = "white";
        ctx.font = font;
        ctx.fillText("jH|", 0, 0);
        var pixels = ctx.getImageData(0, 0, fontDraw.width, fontDraw.height).data;
        var start = -1;
        var end = -1;
        for (var row = 0; row < fontDraw.height; row++) {
            for (var column = 0; column < fontDraw.width; column++) {
                var index = (row * fontDraw.width + column) * 4;
                if (pixels[index] === 0) {
                    if (column === fontDraw.width - 1 && start !== -1) {
                        end = row;
                        row = fontDraw.height;
                        break;
                    }
                    continue;
                }
                else {
                    if (start === -1) {
                        start = row;
                    }
                    break;
                }
            }
        }
        return { height: end - start + 1, offset: start - 1 };
    };
    /**
     * Clones the current DigitalRainFontTexture.
     * @returns the clone of the texture.
     */
    DigitalRainFontTexture.prototype.clone = function () {
        return new DigitalRainFontTexture(this.name, this._font, this._text, this.getScene());
    };
    /**
     * Parses a json object representing the texture and returns an instance of it.
     * @param source the source JSON representation
     * @param scene the scene to create the texture for
     * @returns the parsed texture
     */
    DigitalRainFontTexture.Parse = function (source, scene) {
        var texture = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new DigitalRainFontTexture(source.name, source.font, source.text, scene); }, source, scene, null);
        return texture;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)("font")
    ], DigitalRainFontTexture.prototype, "_font", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)("text")
    ], DigitalRainFontTexture.prototype, "_text", void 0);
    return DigitalRainFontTexture;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.BaseTexture));

/**
 * DigitalRainPostProcess helps rendering everithing in digital rain.
 *
 * Simmply add it to your scene and let the nerd that lives in you have fun.
 * Example usage: var pp = new DigitalRainPostProcess("digitalRain", "20px Monospace", camera);
 */
var DigitalRainPostProcess = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(DigitalRainPostProcess, _super);
    /**
     * Instantiates a new Digital Rain Post Process.
     * @param name the name to give to the postprocess
     * @camera the camera to apply the post process to.
     * @param camera
     * @param options can either be the font name or an option object following the IDigitalRainPostProcessOptions format
     */
    function DigitalRainPostProcess(name, camera, options) {
        var _this = _super.call(this, name, "digitalrain", ["digitalRainFontInfos", "digitalRainOptions", "cosTimeZeroOne", "matrixSpeed"], ["digitalRainFont"], 1.0, camera, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Texture.TRILINEAR_SAMPLINGMODE, undefined, true) || this;
        /**
         * This defines the amount you want to mix the "tile" or caracter space colored in the digital rain.
         * This number is defined between 0 and 1;
         */
        _this.mixToTile = 0;
        /**
         * This defines the amount you want to mix the normal rendering pass in the digital rain.
         * This number is defined between 0 and 1;
         */
        _this.mixToNormal = 0;
        /**
         * Speed of the effect
         */
        _this.speed = 0.003;
        // Default values.
        var font = "15px Monospace";
        var characterSet = "古池や蛙飛び込む水の音ふるいけやかわずとびこむみずのおと初しぐれ猿も小蓑をほしげ也はつしぐれさるもこみのをほしげなり江戸の雨何石呑んだ時鳥えどのあめなんごくのんだほととぎす";
        // Use options.
        if (options) {
            if (typeof options === "string") {
                font = options;
            }
            else {
                font = options.font || font;
                _this.mixToTile = options.mixToTile || _this.mixToTile;
                _this.mixToNormal = options.mixToNormal || _this.mixToNormal;
            }
        }
        var scene = (camera === null || camera === void 0 ? void 0 : camera.getScene()) || null;
        _this._digitalRainFontTexture = new DigitalRainFontTexture(name, font, characterSet, scene);
        var textureSize = _this._digitalRainFontTexture.getSize();
        var alpha = 0.0;
        var cosTimeZeroOne = 0.0;
        var matrix = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Matrix.FromValues(Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random());
        _this.onApply = function (effect) {
            effect.setTexture("digitalRainFont", _this._digitalRainFontTexture);
            effect.setFloat4("digitalRainFontInfos", _this._digitalRainFontTexture.charSize, characterSet.length, textureSize.width, textureSize.height);
            effect.setFloat4("digitalRainOptions", _this.width, _this.height, _this.mixToNormal, _this.mixToTile);
            effect.setMatrix("matrixSpeed", matrix);
            alpha += _this.speed;
            cosTimeZeroOne = alpha;
            effect.setFloat("cosTimeZeroOne", cosTimeZeroOne);
        };
        return _this;
    }
    return DigitalRainPostProcess;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PostProcess));



/***/ }),

/***/ "../../../dev/postProcesses/src/digitalRain/digitalrain.fragment.ts":
/*!**************************************************************************!*\
  !*** ../../../dev/postProcesses/src/digitalRain/digitalrain.fragment.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   digitalrainPixelShader: () => (/* binding */ digitalrainPixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "digitalrainPixelShader";
var shader = "varying vec2 vUV;uniform sampler2D textureSampler;uniform sampler2D digitalRainFont;uniform vec4 digitalRainFontInfos;uniform vec4 digitalRainOptions;uniform mat4 matrixSpeed;uniform float cosTimeZeroOne;float getLuminance(vec3 color)\n{return clamp(dot(color,vec3(0.2126,0.7152,0.0722)),0.,1.);}\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void) \n{float caracterSize=digitalRainFontInfos.x;float numChar=digitalRainFontInfos.y-1.0;float fontx=digitalRainFontInfos.z;float fonty=digitalRainFontInfos.w;float screenx=digitalRainOptions.x;float screeny=digitalRainOptions.y;float ratio=screeny/fonty;float columnx=float(floor((gl_FragCoord.x)/caracterSize));float tileX=float(floor((gl_FragCoord.x)/caracterSize))*caracterSize/screenx;float tileY=float(floor((gl_FragCoord.y)/caracterSize))*caracterSize/screeny;vec2 tileUV=vec2(tileX,tileY);vec4 tileColor=texture2D(textureSampler,tileUV);vec4 baseColor=texture2D(textureSampler,vUV);float tileLuminance=getLuminance(tileColor.rgb);int st=int(mod(columnx,4.0));float speed=cosTimeZeroOne*(sin(tileX*314.5)*0.5+0.6); \nfloat x=float(mod(gl_FragCoord.x,caracterSize))/fontx;float y=float(mod(speed+gl_FragCoord.y/screeny,1.0));y*=ratio;vec4 finalColor= texture2D(digitalRainFont,vec2(x,1.0-y));vec3 high=finalColor.rgb*(vec3(1.2,1.2,1.2)*pow(1.0-y,30.0));finalColor.rgb*=vec3(pow(tileLuminance,5.0),pow(tileLuminance,1.5),pow(tileLuminance,3.0));finalColor.rgb+=high;finalColor.rgb=clamp(finalColor.rgb,0.,1.);finalColor.a=1.0;finalColor= mix(finalColor,tileColor,digitalRainOptions.w);finalColor= mix(finalColor,baseColor,digitalRainOptions.z);gl_FragColor=finalColor;}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var digitalrainPixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/postProcesses/src/digitalRain/index.ts":
/*!***********************************************************!*\
  !*** ../../../dev/postProcesses/src/digitalRain/index.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DigitalRainFontTexture: () => (/* reexport safe */ _digitalRainPostProcess__WEBPACK_IMPORTED_MODULE_0__.DigitalRainFontTexture),
/* harmony export */   DigitalRainPostProcess: () => (/* reexport safe */ _digitalRainPostProcess__WEBPACK_IMPORTED_MODULE_0__.DigitalRainPostProcess)
/* harmony export */ });
/* harmony import */ var _digitalRainPostProcess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./digitalRainPostProcess */ "../../../dev/postProcesses/src/digitalRain/digitalRainPostProcess.ts");



/***/ }),

/***/ "../../../dev/postProcesses/src/edgeDetection/edgeDetection.fragment.ts":
/*!******************************************************************************!*\
  !*** ../../../dev/postProcesses/src/edgeDetection/edgeDetection.fragment.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   edgeDetectionPixelShader: () => (/* binding */ edgeDetectionPixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Engines/shaderStore */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

var name = "edgeDetectionPixelShader";
var shader = "precision highp float;varying vec2 vUV;uniform sampler2D textureSampler;uniform sampler2D normalSampler;uniform sampler2D depthSampler;uniform float width;uniform float height;uniform vec3 edgeColor;uniform float edgeIntensity;uniform float edgeWidth;uniform int renderMode; \nvec3 boxBlur(sampler2D sampler,vec2 uv,vec2 texelSize) {vec3 result=vec3(0.0);for (int x=-1; x<=1; x++) {for (int y=-1; y<=1; y++) {vec2 offset=vec2(float(x),float(y))*texelSize;result+=texture2D(sampler,uv+offset).rgb;}}\nreturn result/9.0;}\nvoid main(void) {vec2 texelSize=vec2(1.0/width,1.0/height);vec3 originalColor=texture2D(textureSampler,vUV).rgb;if (renderMode==1 || renderMode==2 || renderMode==3) {if (length(originalColor)==0.0) {originalColor=vec3(1.0,1.0,1.0); }\nif (originalColor.r==1.0 && originalColor.g==0.0 && originalColor.b==0.0) {originalColor=vec3(1.0,1.0,1.0); }}\nvec3 normal=texture2D(normalSampler,vUV).rgb;float depth=texture2D(depthSampler,vUV).r;float edgeStrength=0.0;int range=int(edgeWidth*8.0); \nfor (int x=-range; x<=range; x++) {for (int y=-range; y<=range; y++) {if (x==0 && y==0) {continue;}\nvec3 neighborNormal=texture2D(normalSampler,vUV+texelSize*vec2(float(x),float(y))).rgb;float neighborDepth=texture2D(depthSampler,vUV+texelSize*vec2(float(x),float(y))).r;float normalDiff=length(neighborNormal-normal);float depthDiff=abs(neighborDepth-depth);edgeStrength=max(edgeStrength,max(normalDiff,depthDiff));}}\nedgeStrength=smoothstep(edgeWidth,edgeWidth+edgeIntensity,edgeStrength);vec3 finalColor=mix(originalColor,edgeColor,edgeStrength);gl_FragColor=vec4(finalColor,1.0);}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var edgeDetectionPixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/postProcesses/src/edgeDetection/edgeDetectionPostProcess.ts":
/*!********************************************************************************!*\
  !*** ../../../dev/postProcesses/src/edgeDetection/edgeDetectionPostProcess.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EdgeDetectionPostProcess: () => (/* binding */ EdgeDetectionPostProcess)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/Textures/renderTargetTexture */ "babylonjs/Misc/decorators");
/* harmony import */ var babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edgeDetection_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edgeDetection.fragment */ "../../../dev/postProcesses/src/edgeDetection/edgeDetection.fragment.ts");












/**
 * The Edge Detection effect highlights the edges of objects in the scene like a toon.
 * This can be used for stylized rendering, outlining, or visual effects that require edge enhancement.
 */
var EdgeDetectionPostProcess = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(EdgeDetectionPostProcess, _super);
    /**
     * Creates a new instance of EdgeDetectionPostProcess.
     * @param name The name of the effect.
     * @param scene The scene where the edge detection post-process will be applied.
     * @param options The required width/height ratio or specific options for the post-process.
     * @param camera The camera to apply the post-process to.
     * @param samplingMode The sampling mode to be used when computing the pass. (default: TEXTURE_NEAREST_NEAREST)
     * @param reusable If the post-process can be reused on the same frame. (default: false)
     * @param textureType The type of textures used when performing the post-process. (default: TEXTURETYPE_HALF_FLOAT)
     */
    function EdgeDetectionPostProcess(name, scene, options, camera, samplingMode, reusable, textureType) {
        if (textureType === void 0) { textureType = babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTURETYPE_UNSIGNED_BYTE; }
        var _this = _super.call(this, name, "edgeDetection", ["width", "height", "edgeColor", "edgeIntensity", "edgeWidth", "renderMode"], ["normalSampler", "depthSampler"], options, camera, samplingMode, scene.getEngine(), reusable, null, textureType) || this;
        /**
         * Defines the color of the detected edges.
         */
        _this.edgeColor = new babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__.Color3(0, 0, 0);
        /**
         * Defines the intensity of the detected edges.
         * Higher values result in more pronounced edges.
         * default: 0.2  (min:0, max:1)
         */
        _this.edgeIntensity = 0.2;
        /**
         * Defines the width of the detected edges.
         * Higher values result in thicker edges.
         * default: 0.2 (min:0.125, max:1)
         */
        _this.edgeWidth = 0.2;
        /**
         * Defines the render mode.
         * default: 0
         * 0: general, 1: normal, 2: depth, 3: outline only
         */
        _this.renderMode = 0;
        _this._geometryBufferRenderer = scene.enableGeometryBufferRenderer();
        if (!_this._geometryBufferRenderer) {
            // Geometry buffer renderer is not supported. So, work as a passthrough.
            babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.Error("Geometry Buffer Renderer support is required for this post-process.");
        }
        else {
            var h1_1 = new babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__.RenderTargetTexture("h1", { width: _this.width, height: _this.height }, scene, {
                samplingMode: babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTURE_NEAREST_NEAREST,
                generateMipMaps: false,
                generateDepthBuffer: false,
                type: babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTURETYPE_HALF_FLOAT,
            });
            // Geometry buffer renderer is supported.
            _this.onApply = function (effect) {
                effect.setFloat("width", _this.width);
                effect.setFloat("height", _this.height);
                effect.setFloat("edgeIntensity", _this.edgeIntensity);
                effect.setFloat("edgeWidth", _this.edgeWidth);
                effect.setColor3("edgeColor", _this.edgeColor);
                var normalTexture = _this._geometryBufferRenderer.getGBuffer().textures[1];
                var depthTexture = _this._geometryBufferRenderer.getGBuffer().textures[0];
                effect.setTexture("normalSampler", normalTexture);
                effect.setTexture("depthSampler", depthTexture);
                switch (_this.renderMode) {
                    case 0:
                        break;
                    case 1:
                        effect.setTexture("textureSampler", _this._geometryBufferRenderer.getGBuffer().textures[1]);
                        effect.setFloat("edgeWidth", 0);
                        break;
                    case 2:
                        effect.setTexture("textureSampler", _this._geometryBufferRenderer.getGBuffer().textures[0]);
                        effect.setFloat("edgeWidth", 0);
                        break;
                    case 3:
                        effect.setTexture("textureSampler", h1_1);
                        break;
                }
                effect.setInt("renderMode", _this.renderMode);
            };
        }
        return _this;
    }
    /**
     * Get the current class name of the current effect
     * @returns "EdgeDetectionPostProcess"
     */
    EdgeDetectionPostProcess.prototype.getClassName = function () {
        return "EdgeDetectionPostProcess";
    };
    Object.defineProperty(EdgeDetectionPostProcess, "IsSupported", {
        /**
         * Support test.
         */
        get: function () {
            var engine = babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__.EngineStore.LastCreatedEngine;
            if (!engine) {
                return false;
            }
            return engine.getCaps().drawBuffersExtension;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @internal
     */
    EdgeDetectionPostProcess._Parse = function (parsedPostProcess, targetCamera, scene, rootUrl) {
        return babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () {
            return new EdgeDetectionPostProcess(parsedPostProcess.name, scene, parsedPostProcess.options, targetCamera, parsedPostProcess.renderTargetSamplingMode, parsedPostProcess.textureType, parsedPostProcess.reusable);
        }, parsedPostProcess, scene, rootUrl);
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], EdgeDetectionPostProcess.prototype, "edgeColor", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], EdgeDetectionPostProcess.prototype, "edgeIntensity", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], EdgeDetectionPostProcess.prototype, "edgeWidth", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
        (0,babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], EdgeDetectionPostProcess.prototype, "renderMode", void 0);
    return EdgeDetectionPostProcess;
}(babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__.PostProcess));

(0,babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.EdgeDetectionPostProcess", EdgeDetectionPostProcess);


/***/ }),

/***/ "../../../dev/postProcesses/src/edgeDetection/index.ts":
/*!*************************************************************!*\
  !*** ../../../dev/postProcesses/src/edgeDetection/index.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EdgeDetectionPostProcess: () => (/* reexport safe */ _edgeDetectionPostProcess__WEBPACK_IMPORTED_MODULE_0__.EdgeDetectionPostProcess)
/* harmony export */ });
/* harmony import */ var _edgeDetectionPostProcess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edgeDetectionPostProcess */ "../../../dev/postProcesses/src/edgeDetection/edgeDetectionPostProcess.ts");



/***/ }),

/***/ "../../../dev/postProcesses/src/index.ts":
/*!***********************************************!*\
  !*** ../../../dev/postProcesses/src/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsciiArtFontTexture: () => (/* reexport safe */ _asciiArt_index__WEBPACK_IMPORTED_MODULE_0__.AsciiArtFontTexture),
/* harmony export */   AsciiArtPostProcess: () => (/* reexport safe */ _asciiArt_index__WEBPACK_IMPORTED_MODULE_0__.AsciiArtPostProcess),
/* harmony export */   DigitalRainFontTexture: () => (/* reexport safe */ _digitalRain_index__WEBPACK_IMPORTED_MODULE_1__.DigitalRainFontTexture),
/* harmony export */   DigitalRainPostProcess: () => (/* reexport safe */ _digitalRain_index__WEBPACK_IMPORTED_MODULE_1__.DigitalRainPostProcess),
/* harmony export */   EdgeDetectionPostProcess: () => (/* reexport safe */ _edgeDetection_index__WEBPACK_IMPORTED_MODULE_2__.EdgeDetectionPostProcess)
/* harmony export */ });
/* harmony import */ var _asciiArt_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asciiArt/index */ "../../../dev/postProcesses/src/asciiArt/index.ts");
/* harmony import */ var _digitalRain_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./digitalRain/index */ "../../../dev/postProcesses/src/digitalRain/index.ts");
/* harmony import */ var _edgeDetection_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edgeDetection/index */ "../../../dev/postProcesses/src/edgeDetection/index.ts");
/* eslint-disable import/no-internal-modules */





/***/ }),

/***/ "../../../lts/postProcesses/src/legacy/legacy.ts":
/*!*******************************************************!*\
  !*** ../../../lts/postProcesses/src/legacy/legacy.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsciiArtFontTexture: () => (/* reexport safe */ post_processes_index__WEBPACK_IMPORTED_MODULE_0__.AsciiArtFontTexture),
/* harmony export */   AsciiArtPostProcess: () => (/* reexport safe */ post_processes_index__WEBPACK_IMPORTED_MODULE_0__.AsciiArtPostProcess),
/* harmony export */   DigitalRainFontTexture: () => (/* reexport safe */ post_processes_index__WEBPACK_IMPORTED_MODULE_0__.DigitalRainFontTexture),
/* harmony export */   DigitalRainPostProcess: () => (/* reexport safe */ post_processes_index__WEBPACK_IMPORTED_MODULE_0__.DigitalRainPostProcess),
/* harmony export */   EdgeDetectionPostProcess: () => (/* reexport safe */ post_processes_index__WEBPACK_IMPORTED_MODULE_0__.EdgeDetectionPostProcess)
/* harmony export */ });
/* harmony import */ var post_processes_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! post-processes/index */ "../../../dev/postProcesses/src/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 *
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var key in post_processes_index__WEBPACK_IMPORTED_MODULE_0__) {
        globalObject.BABYLON[key] = post_processes_index__WEBPACK_IMPORTED_MODULE_0__[key];
    }
}



/***/ }),

/***/ "babylonjs/Misc/decorators":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_decorators__;

/***/ }),

/***/ "../../../../node_modules/tslib/tslib.es6.mjs":
/*!****************************************************!*\
  !*** ../../../../node_modules/tslib/tslib.es6.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __rewriteRelativeImportExtension: () => (/* binding */ __rewriteRelativeImportExtension),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

var ownKeys = function(o) {
  ownKeys = Object.getOwnPropertyNames || function (o) {
    var ar = [];
    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
    return ar;
  };
  return ownKeys(o);
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  var r, s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
        }
        else s |= 1;
      }
      catch (e) {
        fail(e);
      }
    }
    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  return next();
}

function __rewriteRelativeImportExtension(path, preserveJsx) {
  if (typeof path === "string" && /^\.\.?\//.test(path)) {
      return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
          return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
      });
  }
  return path;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __esDecorate,
  __runInitializers,
  __propKey,
  __setFunctionName,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
  __rewriteRelativeImportExtension,
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   postProcess: () => (/* reexport module object */ _lts_post_processes_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_post_processes_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/post-processes/legacy/legacy */ "../../../lts/postProcesses/src/legacy/legacy.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_post_processes_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbmpzLnBvc3RQcm9jZXNzLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQUE7QUFnQkE7Ozs7OztBQU1BO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFFQTs7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7O0FBQ0E7QUE3REE7QUFIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUE2REE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUEvSUE7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBNklBO0FBQUE7QUFsSkE7QUErS0E7Ozs7O0FBS0E7QUFDQTtBQUFBO0FBa0JBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFwQkE7OztBQUdBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQVlBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvUEE7QUFDQTtBQUVBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFBQTtBQWdCQTs7Ozs7O0FBTUE7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUVBOztBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBQ0E7QUEzREE7QUFIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUEyREE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUE3SUE7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBMklBO0FBQUE7QUFoSkE7QUF3S0E7Ozs7O0FBS0E7QUFDQTtBQUFBO0FBdUJBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUF6QkE7OztBQUdBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFzQkE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQW1CQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuU0E7QUFDQTtBQUVBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBRUE7QUFDQTtBQVNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTs7O0FBR0E7QUFDQTtBQUFBO0FBeUNBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBT0E7QUFFQTtBQTNEQTs7QUFFQTtBQUVBO0FBRUE7Ozs7QUFJQTtBQUVBO0FBRUE7Ozs7QUFJQTtBQUVBO0FBRUE7Ozs7QUFJQTtBQUVBO0FBNkNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUF0RkE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBcUZBO0FBSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7O0FBQUE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBYUE7QUFuSkE7QUFEQTtBQUNBO0FBUUE7QUFEQTtBQUNBO0FBUUE7QUFEQTtBQUNBO0FBUUE7QUFEQTtBQUNBO0FBNEhBO0FBQUE7QUF6SkE7QUEySkE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqTEE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7OztBQ2ZBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2haQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QT1NUUFJPQ0VTU0VTL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9QT1NUUFJPQ0VTU0VTLy4uLy4uLy4uL2Rldi9wb3N0UHJvY2Vzc2VzL3NyYy9hc2NpaUFydC9hc2NpaUFydFBvc3RQcm9jZXNzLnRzIiwid2VicGFjazovL1BPU1RQUk9DRVNTRVMvLi4vLi4vLi4vZGV2L3Bvc3RQcm9jZXNzZXMvc3JjL2FzY2lpQXJ0L2FzY2lpYXJ0LmZyYWdtZW50LnRzIiwid2VicGFjazovL1BPU1RQUk9DRVNTRVMvLi4vLi4vLi4vZGV2L3Bvc3RQcm9jZXNzZXMvc3JjL2FzY2lpQXJ0L2luZGV4LnRzIiwid2VicGFjazovL1BPU1RQUk9DRVNTRVMvLi4vLi4vLi4vZGV2L3Bvc3RQcm9jZXNzZXMvc3JjL2RpZ2l0YWxSYWluL2RpZ2l0YWxSYWluUG9zdFByb2Nlc3MudHMiLCJ3ZWJwYWNrOi8vUE9TVFBST0NFU1NFUy8uLi8uLi8uLi9kZXYvcG9zdFByb2Nlc3Nlcy9zcmMvZGlnaXRhbFJhaW4vZGlnaXRhbHJhaW4uZnJhZ21lbnQudHMiLCJ3ZWJwYWNrOi8vUE9TVFBST0NFU1NFUy8uLi8uLi8uLi9kZXYvcG9zdFByb2Nlc3Nlcy9zcmMvZGlnaXRhbFJhaW4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vUE9TVFBST0NFU1NFUy8uLi8uLi8uLi9kZXYvcG9zdFByb2Nlc3Nlcy9zcmMvZWRnZURldGVjdGlvbi9lZGdlRGV0ZWN0aW9uLmZyYWdtZW50LnRzIiwid2VicGFjazovL1BPU1RQUk9DRVNTRVMvLi4vLi4vLi4vZGV2L3Bvc3RQcm9jZXNzZXMvc3JjL2VkZ2VEZXRlY3Rpb24vZWRnZURldGVjdGlvblBvc3RQcm9jZXNzLnRzIiwid2VicGFjazovL1BPU1RQUk9DRVNTRVMvLi4vLi4vLi4vZGV2L3Bvc3RQcm9jZXNzZXMvc3JjL2VkZ2VEZXRlY3Rpb24vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vUE9TVFBST0NFU1NFUy8uLi8uLi8uLi9kZXYvcG9zdFByb2Nlc3Nlcy9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vUE9TVFBST0NFU1NFUy8uLi8uLi8uLi9sdHMvcG9zdFByb2Nlc3Nlcy9zcmMvbGVnYWN5L2xlZ2FjeS50cyIsIndlYnBhY2s6Ly9QT1NUUFJPQ0VTU0VTL2V4dGVybmFsIHVtZCB7XCJyb290XCI6XCJCQUJZTE9OXCIsXCJjb21tb25qc1wiOlwiYmFieWxvbmpzXCIsXCJjb21tb25qczJcIjpcImJhYnlsb25qc1wiLFwiYW1kXCI6XCJiYWJ5bG9uanNcIn0iLCJ3ZWJwYWNrOi8vUE9TVFBST0NFU1NFUy8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2Lm1qcyIsIndlYnBhY2s6Ly9QT1NUUFJPQ0VTU0VTL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1BPU1RQUk9DRVNTRVMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vUE9TVFBST0NFU1NFUy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vUE9TVFBST0NFU1NFUy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL1BPU1RQUk9DRVNTRVMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9QT1NUUFJPQ0VTU0VTL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vUE9TVFBST0NFU1NFUy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWJ5bG9uanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJiYWJ5bG9uanMtcG9zdC1wcm9jZXNzXCIsIFtcImJhYnlsb25qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJiYWJ5bG9uanMtcG9zdC1wcm9jZXNzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYmFieWxvbmpzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJQT1NUUFJPQ0VTU0VTXCJdID0gZmFjdG9yeShyb290W1wiQkFCWUxPTlwiXSk7XG59KSgodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHRoaXMpLCAoX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9iYWJ5bG9uanNfTWlzY19kZWNvcmF0b3JzX18pID0+IHtcbnJldHVybiAiLCJpbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgc2VyaWFsaXplIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzXCI7XHJcbmltcG9ydCB7IFNlcmlhbGl6YXRpb25IZWxwZXIgfSBmcm9tIFwiY29yZS9NaXNjL2RlY29yYXRvcnMuc2VyaWFsaXphdGlvblwiO1xyXG5pbXBvcnQgdHlwZSB7IENhbWVyYSB9IGZyb20gXCJjb3JlL0NhbWVyYXMvY2FtZXJhXCI7XHJcbmltcG9ydCB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2Jhc2VUZXh0dXJlXCI7XHJcbmltcG9ydCB7IFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5pbXBvcnQgdHlwZSB7IEVmZmVjdCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9lZmZlY3RcIjtcclxuaW1wb3J0IHsgUG9zdFByb2Nlc3MgfSBmcm9tIFwiY29yZS9Qb3N0UHJvY2Vzc2VzL3Bvc3RQcm9jZXNzXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgXCJjb3JlL0VuZ2luZXMvRXh0ZW5zaW9ucy9lbmdpbmUuZHluYW1pY1RleHR1cmVcIjtcclxuaW1wb3J0IFwiLi9hc2NpaWFydC5mcmFnbWVudFwiO1xyXG5cclxuLyoqXHJcbiAqIEFzY2lpQXJ0Rm9udFRleHR1cmUgaXMgdGhlIGhlbHBlciBjbGFzcyB1c2VkIHRvIGVhc2lseSBjcmVhdGUgeW91ciBhc2NpaSBhcnQgZm9udCB0ZXh0dXJlLlxyXG4gKlxyXG4gKiBJdCBiYXNpY2FsbHkgdGFrZXMgY2FyZSByZW5kZXJpbmcgdGhlIGZvbnQgZnJvbnQgdGhlIGdpdmVuIGZvbnQgc2l6ZSB0byBhIHRleHR1cmUuXHJcbiAqIFRoaXMgaXMgdXNlZCBsYXRlciBvbiBpbiB0aGUgcG9zdHByb2Nlc3MuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXNjaWlBcnRGb250VGV4dHVyZSBleHRlbmRzIEJhc2VUZXh0dXJlIHtcclxuICAgIEBzZXJpYWxpemUoXCJmb250XCIpXHJcbiAgICBwcml2YXRlIF9mb250OiBzdHJpbmc7XHJcblxyXG4gICAgQHNlcmlhbGl6ZShcInRleHRcIilcclxuICAgIHByaXZhdGUgX3RleHQ6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIF9jaGFyU2l6ZTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgc2l6ZSBvZiBvbmUgY2hhciBpbiB0aGUgdGV4dHVyZSAoZWFjaCBjaGFyIGZpdHMgaW4gc2l6ZSAqIHNpemUgc3BhY2UgaW4gdGhlIHRleHR1cmUpLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNoYXJTaXplKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYXJTaXplO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBBc2NpaSBBcnQgRm9udFRleHR1cmUgY2xhc3NcclxuICAgICAqIEBwYXJhbSBuYW1lIHRoZSBuYW1lIG9mIHRoZSB0ZXh0dXJlXHJcbiAgICAgKiBAcGFyYW0gZm9udCB0aGUgZm9udCB0byB1c2UsIHVzZSB0aGUgVzNDIENTUyBub3RhdGlvblxyXG4gICAgICogQHBhcmFtIHRleHQgdGhlIGNhcmFjdGVyIHNldCB0byB1c2UgaW4gdGhlIHJlbmRlcmluZy5cclxuICAgICAqIEBwYXJhbSBzY2VuZSB0aGUgc2NlbmUgdGhhdCBvd25zIHRoZSB0ZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZm9udDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIHNjZW5lOiBOdWxsYWJsZTxTY2VuZT4gPSBudWxsKSB7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUpO1xyXG5cclxuICAgICAgICBzY2VuZSA9IHRoaXMuZ2V0U2NlbmUoKTtcclxuXHJcbiAgICAgICAgaWYgKCFzY2VuZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX3RleHQgPT0gdGV4dDtcclxuICAgICAgICB0aGlzLl9mb250ID09IGZvbnQ7XHJcblxyXG4gICAgICAgIHRoaXMud3JhcFUgPSBUZXh0dXJlLkNMQU1QX0FERFJFU1NNT0RFO1xyXG4gICAgICAgIHRoaXMud3JhcFYgPSBUZXh0dXJlLkNMQU1QX0FERFJFU1NNT0RFO1xyXG4gICAgICAgIC8vdGhpcy5hbmlzb3Ryb3BpY0ZpbHRlcmluZ0xldmVsID0gMTtcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBmb250IHNwZWNpZmljIGluZm8uXHJcbiAgICAgICAgY29uc3QgbWF4Q2hhckhlaWdodCA9IHRoaXMuX2dldEZvbnRIZWlnaHQoZm9udCk7XHJcbiAgICAgICAgY29uc3QgbWF4Q2hhcldpZHRoID0gdGhpcy5fZ2V0Rm9udFdpZHRoKGZvbnQpO1xyXG5cclxuICAgICAgICB0aGlzLl9jaGFyU2l6ZSA9IE1hdGgubWF4KG1heENoYXJIZWlnaHQuaGVpZ2h0LCBtYXhDaGFyV2lkdGgpO1xyXG5cclxuICAgICAgICAvLyBUaGlzIGlzIGFuIGFwcHJveGltYXRlIHNpemUsIGJ1dCBzaG91bGQgYWx3YXlzIGJlIGFibGUgdG8gZml0IGF0IGxlYXN0IHRoZSBtYXhDaGFyQ291bnQuXHJcbiAgICAgICAgY29uc3QgdGV4dHVyZVdpZHRoID0gTWF0aC5jZWlsKHRoaXMuX2NoYXJTaXplICogdGV4dC5sZW5ndGgpO1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmVIZWlnaHQgPSB0aGlzLl9jaGFyU2l6ZTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSB0ZXh0dXJlIHRoYXQgd2lsbCBzdG9yZSB0aGUgZm9udCBjaGFyYWN0ZXJzLlxyXG4gICAgICAgIHRoaXMuX3RleHR1cmUgPSBzY2VuZS5nZXRFbmdpbmUoKS5jcmVhdGVEeW5hbWljVGV4dHVyZSh0ZXh0dXJlV2lkdGgsIHRleHR1cmVIZWlnaHQsIGZhbHNlLCBUZXh0dXJlLk5FQVJFU1RfU0FNUExJTkdNT0RFKTtcclxuICAgICAgICAvL3NjZW5lLmdldEVuZ2luZSgpLnNldGNsYW1wXHJcbiAgICAgICAgY29uc3QgdGV4dHVyZVNpemUgPSB0aGlzLmdldFNpemUoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgY2FudmFzIHdpdGggdGhlIGZpbmFsIHNpemU6IHRoZSBvbmUgbWF0Y2hpbmcgdGhlIHRleHR1cmUuXHJcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICBjYW52YXMud2lkdGggPSB0ZXh0dXJlU2l6ZS53aWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gdGV4dHVyZVNpemUuaGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSA8Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEPmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xyXG4gICAgICAgIGNvbnRleHQuZm9udCA9IGZvbnQ7XHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gU2V0cyB0aGUgdGV4dCBpbiB0aGUgdGV4dHVyZS5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dCh0ZXh0W2ldLCBpICogdGhpcy5fY2hhclNpemUsIC1tYXhDaGFySGVpZ2h0Lm9mZnNldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGbHVzaCB0aGUgdGV4dCBpbiB0aGUgZHluYW1pYyB0ZXh0dXJlLlxyXG5cclxuICAgICAgICBzY2VuZS5nZXRFbmdpbmUoKS51cGRhdGVEeW5hbWljVGV4dHVyZSh0aGlzLl90ZXh0dXJlLCBjYW52YXMsIGZhbHNlLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1heCBjaGFyIHdpZHRoIG9mIGEgZm9udC5cclxuICAgICAqIEBwYXJhbSBmb250IHRoZSBmb250IHRvIHVzZSwgdXNlIHRoZSBXM0MgQ1NTIG5vdGF0aW9uXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgbWF4IGNoYXIgd2lkdGhcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZ2V0Rm9udFdpZHRoKGZvbnQ6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgZm9udERyYXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IDxDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ+Zm9udERyYXcuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgY3R4LmZvbnQgPSBmb250O1xyXG5cclxuICAgICAgICByZXR1cm4gY3R4Lm1lYXN1cmVUZXh0KFwiV1wiKS53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb3JlIGluZm8gaGVyZTogaHR0cHM6Ly92aWRlbGFpcy5jb20vMjAxNC8wMy8xNi90aGUtbWFueS1hbmQtdmFyaWVkLXByb2JsZW1zLXdpdGgtbWVhc3VyaW5nLWZvbnQtaGVpZ2h0LWZvci1odG1sNS1jYW52YXMvXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1heCBjaGFyIGhlaWdodCBvZiBhIGZvbnQuXHJcbiAgICAgKiBAcGFyYW0gZm9udCB0aGUgZm9udCB0byB1c2UsIHVzZSB0aGUgVzNDIENTUyBub3RhdGlvblxyXG4gICAgICogQHJldHVybnMgdGhlIG1heCBjaGFyIGhlaWdodFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9nZXRGb250SGVpZ2h0KGZvbnQ6IHN0cmluZyk6IHsgaGVpZ2h0OiBudW1iZXI7IG9mZnNldDogbnVtYmVyIH0ge1xyXG4gICAgICAgIGNvbnN0IGZvbnREcmF3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICBjb25zdCBjdHggPSA8Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEPmZvbnREcmF3LmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgZm9udERyYXcud2lkdGgsIGZvbnREcmF3LmhlaWdodCk7XHJcbiAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICBjdHguZm9udCA9IGZvbnQ7XHJcbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiakh8XCIsIDAsIDApO1xyXG4gICAgICAgIGNvbnN0IHBpeGVscyA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgZm9udERyYXcud2lkdGgsIGZvbnREcmF3LmhlaWdodCkuZGF0YTtcclxuICAgICAgICBsZXQgc3RhcnQgPSAtMTtcclxuICAgICAgICBsZXQgZW5kID0gLTE7XHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgZm9udERyYXcuaGVpZ2h0OyByb3crKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCBmb250RHJhdy53aWR0aDsgY29sdW1uKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gKHJvdyAqIGZvbnREcmF3LndpZHRoICsgY29sdW1uKSAqIDQ7XHJcbiAgICAgICAgICAgICAgICBpZiAocGl4ZWxzW2luZGV4XSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW4gPT09IGZvbnREcmF3LndpZHRoIC0gMSAmJiBzdGFydCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gcm93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cgPSBmb250RHJhdy5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IHJvdztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgaGVpZ2h0OiBlbmQgLSBzdGFydCArIDEsIG9mZnNldDogc3RhcnQgLSAxIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9uZXMgdGhlIGN1cnJlbnQgQXNjaWlBcnRUZXh0dXJlLlxyXG4gICAgICogQHJldHVybnMgdGhlIGNsb25lIG9mIHRoZSB0ZXh0dXJlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgY2xvbmUoKTogQXNjaWlBcnRGb250VGV4dHVyZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBc2NpaUFydEZvbnRUZXh0dXJlKHRoaXMubmFtZSwgdGhpcy5fZm9udCwgdGhpcy5fdGV4dCwgdGhpcy5nZXRTY2VuZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlcyBhIGpzb24gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgdGV4dHVyZSBhbmQgcmV0dXJucyBhbiBpbnN0YW5jZSBvZiBpdC5cclxuICAgICAqIEBwYXJhbSBzb3VyY2UgdGhlIHNvdXJjZSBKU09OIHJlcHJlc2VudGF0aW9uXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgdGhlIHNjZW5lIHRvIGNyZWF0ZSB0aGUgdGV4dHVyZSBmb3JcclxuICAgICAqIEByZXR1cm5zIHRoZSBwYXJzZWQgdGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFBhcnNlKHNvdXJjZTogYW55LCBzY2VuZTogU2NlbmUpOiBBc2NpaUFydEZvbnRUZXh0dXJlIHtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gU2VyaWFsaXphdGlvbkhlbHBlci5QYXJzZSgoKSA9PiBuZXcgQXNjaWlBcnRGb250VGV4dHVyZShzb3VyY2UubmFtZSwgc291cmNlLmZvbnQsIHNvdXJjZS50ZXh0LCBzY2VuZSksIHNvdXJjZSwgc2NlbmUsIG51bGwpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGV4dHVyZTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIE9wdGlvbiBhdmFpbGFibGUgaW4gdGhlIEFzY2lpIEFydCBQb3N0IFByb2Nlc3MuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElBc2NpaUFydFBvc3RQcm9jZXNzT3B0aW9ucyB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBmb250IHRvIHVzZSBmb2xsb3dpbmcgdGhlIHczYyBmb250IGRlZmluaXRpb24uXHJcbiAgICAgKi9cclxuICAgIGZvbnQ/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY2hhcmFjdGVyIHNldCB0byB1c2UgaW4gdGhlIHBvc3Rwcm9jZXNzLlxyXG4gICAgICovXHJcbiAgICBjaGFyYWN0ZXJTZXQ/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGRlZmluZXMgdGhlIGFtb3VudCB5b3Ugd2FudCB0byBtaXggdGhlIFwidGlsZVwiIG9yIGNhcmFjdGVyIHNwYWNlIGNvbG9yZWQgaW4gdGhlIGFzY2lpIGFydC5cclxuICAgICAqIFRoaXMgbnVtYmVyIGlzIGRlZmluZWQgYmV0d2VlbiAwIGFuZCAxO1xyXG4gICAgICovXHJcbiAgICBtaXhUb1RpbGU/OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGRlZmluZXMgdGhlIGFtb3VudCB5b3Ugd2FudCB0byBtaXggdGhlIG5vcm1hbCByZW5kZXJpbmcgcGFzcyBpbiB0aGUgYXNjaWkgYXJ0LlxyXG4gICAgICogVGhpcyBudW1iZXIgaXMgZGVmaW5lZCBiZXR3ZWVuIDAgYW5kIDE7XHJcbiAgICAgKi9cclxuICAgIG1peFRvTm9ybWFsPzogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogQXNjaWlBcnRQb3N0UHJvY2VzcyBoZWxwcyByZW5kZXJpbmcgZXZlcml0aGluZyBpbiBBc2NpaSBBcnQuXHJcbiAqXHJcbiAqIFNpbW1wbHkgYWRkIGl0IHRvIHlvdXIgc2NlbmUgYW5kIGxldCB0aGUgbmVyZCB0aGF0IGxpdmVzIGluIHlvdSBoYXZlIGZ1bi5cclxuICogRXhhbXBsZSB1c2FnZTogdmFyIHBwID0gbmV3IEFzY2lpQXJ0UG9zdFByb2Nlc3MoXCJteUFzY2lpXCIsIFwiMjBweCBNb25vc3BhY2VcIiwgY2FtZXJhKTtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBc2NpaUFydFBvc3RQcm9jZXNzIGV4dGVuZHMgUG9zdFByb2Nlc3Mge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZm9udCB0ZXh0dXJlIHVzZWQgdG8gcmVuZGVyIHRoZSBjaGFyIGluIHRoZSBwb3N0IHByb2Nlc3MuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2FzY2lpQXJ0Rm9udFRleHR1cmU6IEFzY2lpQXJ0Rm9udFRleHR1cmU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGRlZmluZXMgdGhlIGFtb3VudCB5b3Ugd2FudCB0byBtaXggdGhlIFwidGlsZVwiIG9yIGNhcmFjdGVyIHNwYWNlIGNvbG9yZWQgaW4gdGhlIGFzY2lpIGFydC5cclxuICAgICAqIFRoaXMgbnVtYmVyIGlzIGRlZmluZWQgYmV0d2VlbiAwIGFuZCAxO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbWl4VG9UaWxlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBkZWZpbmVzIHRoZSBhbW91bnQgeW91IHdhbnQgdG8gbWl4IHRoZSBub3JtYWwgcmVuZGVyaW5nIHBhc3MgaW4gdGhlIGFzY2lpIGFydC5cclxuICAgICAqIFRoaXMgbnVtYmVyIGlzIGRlZmluZWQgYmV0d2VlbiAwIGFuZCAxO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbWl4VG9Ob3JtYWw6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW50aWF0ZXMgYSBuZXcgQXNjaWkgQXJ0IFBvc3QgUHJvY2Vzcy5cclxuICAgICAqIEBwYXJhbSBuYW1lIHRoZSBuYW1lIHRvIGdpdmUgdG8gdGhlIHBvc3Rwcm9jZXNzXHJcbiAgICAgKiBAY2FtZXJhIHRoZSBjYW1lcmEgdG8gYXBwbHkgdGhlIHBvc3QgcHJvY2VzcyB0by5cclxuICAgICAqIEBwYXJhbSBjYW1lcmFcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIGNhbiBlaXRoZXIgYmUgdGhlIGZvbnQgbmFtZSBvciBhbiBvcHRpb24gb2JqZWN0IGZvbGxvd2luZyB0aGUgSUFzY2lpQXJ0UG9zdFByb2Nlc3NPcHRpb25zIGZvcm1hdFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGNhbWVyYTogTnVsbGFibGU8Q2FtZXJhPiwgb3B0aW9ucz86IHN0cmluZyB8IElBc2NpaUFydFBvc3RQcm9jZXNzT3B0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUsIFwiYXNjaWlhcnRcIiwgW1wiYXNjaWlBcnRGb250SW5mb3NcIiwgXCJhc2NpaUFydE9wdGlvbnNcIl0sIFtcImFzY2lpQXJ0Rm9udFwiXSwgMSwgY2FtZXJhLCBUZXh0dXJlLlRSSUxJTkVBUl9TQU1QTElOR01PREUsIHVuZGVmaW5lZCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIERlZmF1bHQgdmFsdWVzLlxyXG4gICAgICAgIGxldCBmb250ID0gXCI0MHB4IE1vbm9zcGFjZVwiO1xyXG4gICAgICAgIGxldCBjaGFyYWN0ZXJTZXQgPSBcIiBgLS4nXzosXFxcIj1eOzwrISo/L2NMXFxcXHpyczdUaXZKdEN7M0YpSWwoeFpmWTVTMmVham8xNFtudXlFXVA2VjlrWHBLd0docUFVYk9kOCNIUkRCMCRtZ01XJlElTkBcIjtcclxuXHJcbiAgICAgICAgLy8gVXNlIG9wdGlvbnMuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBmb250ID0gPHN0cmluZz5vcHRpb25zO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9udCA9ICg8SUFzY2lpQXJ0UG9zdFByb2Nlc3NPcHRpb25zPm9wdGlvbnMpLmZvbnQgfHwgZm9udDtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlclNldCA9ICg8SUFzY2lpQXJ0UG9zdFByb2Nlc3NPcHRpb25zPm9wdGlvbnMpLmNoYXJhY3RlclNldCB8fCBjaGFyYWN0ZXJTZXQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1peFRvVGlsZSA9ICg8SUFzY2lpQXJ0UG9zdFByb2Nlc3NPcHRpb25zPm9wdGlvbnMpLm1peFRvVGlsZSB8fCB0aGlzLm1peFRvVGlsZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWl4VG9Ob3JtYWwgPSAoPElBc2NpaUFydFBvc3RQcm9jZXNzT3B0aW9ucz5vcHRpb25zKS5taXhUb05vcm1hbCB8fCB0aGlzLm1peFRvTm9ybWFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzY2VuZSA9IGNhbWVyYT8uZ2V0U2NlbmUoKSB8fCB0aGlzLl9zY2VuZTtcclxuICAgICAgICB0aGlzLl9hc2NpaUFydEZvbnRUZXh0dXJlID0gbmV3IEFzY2lpQXJ0Rm9udFRleHR1cmUobmFtZSwgZm9udCwgY2hhcmFjdGVyU2V0LCBzY2VuZSk7XHJcbiAgICAgICAgY29uc3QgdGV4dHVyZVNpemUgPSB0aGlzLl9hc2NpaUFydEZvbnRUZXh0dXJlLmdldFNpemUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vbkFwcGx5ID0gKGVmZmVjdDogRWZmZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGVmZmVjdC5zZXRUZXh0dXJlKFwiYXNjaWlBcnRGb250XCIsIHRoaXMuX2FzY2lpQXJ0Rm9udFRleHR1cmUpO1xyXG5cclxuICAgICAgICAgICAgZWZmZWN0LnNldEZsb2F0NChcImFzY2lpQXJ0Rm9udEluZm9zXCIsIHRoaXMuX2FzY2lpQXJ0Rm9udFRleHR1cmUuY2hhclNpemUsIGNoYXJhY3RlclNldC5sZW5ndGgsIHRleHR1cmVTaXplLndpZHRoLCB0ZXh0dXJlU2l6ZS5oZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgZWZmZWN0LnNldEZsb2F0NChcImFzY2lpQXJ0T3B0aW9uc1wiLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5taXhUb05vcm1hbCwgdGhpcy5taXhUb1RpbGUpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gRG8gbm90IGVkaXQuXG5pbXBvcnQgeyBTaGFkZXJTdG9yZSB9IGZyb20gXCJjb3JlL0VuZ2luZXMvc2hhZGVyU3RvcmVcIjtcblxuY29uc3QgbmFtZSA9IFwiYXNjaWlhcnRQaXhlbFNoYWRlclwiO1xuY29uc3Qgc2hhZGVyID0gYHZhcnlpbmcgdmVjMiB2VVY7dW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZVNhbXBsZXI7dW5pZm9ybSBzYW1wbGVyMkQgYXNjaWlBcnRGb250O3VuaWZvcm0gdmVjNCBhc2NpaUFydEZvbnRJbmZvczt1bmlmb3JtIHZlYzQgYXNjaWlBcnRPcHRpb25zO2Zsb2F0IGdldEx1bWluYW5jZSh2ZWMzIGNvbG9yKVxue3JldHVybiBjbGFtcChkb3QoY29sb3IsdmVjMygwLjIxMjYsMC43MTUyLDAuMDcyMikpLDAuLDEuKTt9XG4jZGVmaW5lIENVU1RPTV9GUkFHTUVOVF9ERUZJTklUSU9OU1xudm9pZCBtYWluKHZvaWQpIFxue2Zsb2F0IGNhcmFjdGVyU2l6ZT1hc2NpaUFydEZvbnRJbmZvcy54O2Zsb2F0IG51bUNoYXI9YXNjaWlBcnRGb250SW5mb3MueS0xLjA7ZmxvYXQgZm9udHg9YXNjaWlBcnRGb250SW5mb3MuejtmbG9hdCBmb250eT1hc2NpaUFydEZvbnRJbmZvcy53O2Zsb2F0IHNjcmVlbng9YXNjaWlBcnRPcHRpb25zLng7ZmxvYXQgc2NyZWVueT1hc2NpaUFydE9wdGlvbnMueTtmbG9hdCB0aWxlWD1mbG9hdChmbG9vcigoZ2xfRnJhZ0Nvb3JkLngpL2NhcmFjdGVyU2l6ZSkpKmNhcmFjdGVyU2l6ZS9zY3JlZW54O2Zsb2F0IHRpbGVZPWZsb2F0KGZsb29yKChnbF9GcmFnQ29vcmQueSkvY2FyYWN0ZXJTaXplKSkqY2FyYWN0ZXJTaXplL3NjcmVlbnk7dmVjMiB0aWxlVVY9dmVjMih0aWxlWCx0aWxlWSk7dmVjNCB0aWxlQ29sb3I9dGV4dHVyZTJEKHRleHR1cmVTYW1wbGVyLHRpbGVVVik7dmVjNCBiYXNlQ29sb3I9dGV4dHVyZTJEKHRleHR1cmVTYW1wbGVyLHZVVik7ZmxvYXQgdGlsZUx1bWluYW5jZT1nZXRMdW1pbmFuY2UodGlsZUNvbG9yLnJnYik7ZmxvYXQgb2Zmc2V0eD0oZmxvYXQoZmxvb3IodGlsZUx1bWluYW5jZSpudW1DaGFyKSkpKmNhcmFjdGVyU2l6ZS9mb250eDtmbG9hdCBvZmZzZXR5PTAuMDtmbG9hdCB4PWZsb2F0KG1vZChnbF9GcmFnQ29vcmQueCxjYXJhY3RlclNpemUpKS9mb250eDtmbG9hdCB5PWZsb2F0KG1vZChnbF9GcmFnQ29vcmQueSxjYXJhY3RlclNpemUpKS9mb250eTt2ZWM0IGZpbmFsQ29sb3I9IHRleHR1cmUyRChhc2NpaUFydEZvbnQsdmVjMihvZmZzZXR4K3gsb2Zmc2V0eSsoY2FyYWN0ZXJTaXplL2ZvbnR5LXkpKSk7ZmluYWxDb2xvci5yZ2IqPXRpbGVDb2xvci5yZ2I7ZmluYWxDb2xvci5hPTEuMDtmaW5hbENvbG9yPSBtaXgoZmluYWxDb2xvcix0aWxlQ29sb3IsYXNjaWlBcnRPcHRpb25zLncpO2ZpbmFsQ29sb3I9IG1peChmaW5hbENvbG9yLGJhc2VDb2xvcixhc2NpaUFydE9wdGlvbnMueik7Z2xfRnJhZ0NvbG9yPWZpbmFsQ29sb3I7fWA7XG4vLyBTaWRlZWZmZWN0XG5TaGFkZXJTdG9yZS5TaGFkZXJzU3RvcmVbbmFtZV0gPSBzaGFkZXI7XG4vKiogQGludGVybmFsICovXG5leHBvcnQgY29uc3QgYXNjaWlhcnRQaXhlbFNoYWRlciA9IHsgbmFtZSwgc2hhZGVyIH07XG4iLCJleHBvcnQgKiBmcm9tIFwiLi9hc2NpaUFydFBvc3RQcm9jZXNzXCI7XHJcbiIsImltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgeyBzZXJpYWxpemUgfSBmcm9tIFwiY29yZS9NaXNjL2RlY29yYXRvcnNcIjtcclxuaW1wb3J0IHsgU2VyaWFsaXphdGlvbkhlbHBlciB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9ycy5zZXJpYWxpemF0aW9uXCI7XHJcbmltcG9ydCB7IE1hdHJpeCB9IGZyb20gXCJjb3JlL01hdGhzL21hdGgudmVjdG9yXCI7XHJcbmltcG9ydCB0eXBlIHsgQ2FtZXJhIH0gZnJvbSBcImNvcmUvQ2FtZXJhcy9jYW1lcmFcIjtcclxuaW1wb3J0IHsgQmFzZVRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvYmFzZVRleHR1cmVcIjtcclxuaW1wb3J0IHsgVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy90ZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgRWZmZWN0IH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL2VmZmVjdFwiO1xyXG5pbXBvcnQgeyBQb3N0UHJvY2VzcyB9IGZyb20gXCJjb3JlL1Bvc3RQcm9jZXNzZXMvcG9zdFByb2Nlc3NcIjtcclxuaW1wb3J0IHR5cGUgeyBTY2VuZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcbmltcG9ydCBcImNvcmUvRW5naW5lcy9FeHRlbnNpb25zL2VuZ2luZS5keW5hbWljVGV4dHVyZVwiO1xyXG5pbXBvcnQgXCIuL2RpZ2l0YWxyYWluLmZyYWdtZW50XCI7XHJcblxyXG4vKipcclxuICogRGlnaXRhbFJhaW5Gb250VGV4dHVyZSBpcyB0aGUgaGVscGVyIGNsYXNzIHVzZWQgdG8gZWFzaWx5IGNyZWF0ZSB5b3VyIGRpZ2l0YWwgcmFpbiBmb250IHRleHR1cmUuXHJcbiAqXHJcbiAqIEl0IGJhc2ljYWxseSB0YWtlcyBjYXJlIHJlbmRlcmluZyB0aGUgZm9udCBmcm9udCB0aGUgZ2l2ZW4gZm9udCBzaXplIHRvIGEgdGV4dHVyZS5cclxuICogVGhpcyBpcyB1c2VkIGxhdGVyIG9uIGluIHRoZSBwb3N0cHJvY2Vzcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBEaWdpdGFsUmFpbkZvbnRUZXh0dXJlIGV4dGVuZHMgQmFzZVRleHR1cmUge1xyXG4gICAgQHNlcmlhbGl6ZShcImZvbnRcIilcclxuICAgIHByaXZhdGUgX2ZvbnQ6IHN0cmluZztcclxuXHJcbiAgICBAc2VyaWFsaXplKFwidGV4dFwiKVxyXG4gICAgcHJpdmF0ZSBfdGV4dDogc3RyaW5nO1xyXG5cclxuICAgIHByaXZhdGUgX2NoYXJTaXplOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBzaXplIG9mIG9uZSBjaGFyIGluIHRoZSB0ZXh0dXJlIChlYWNoIGNoYXIgZml0cyBpbiBzaXplICogc2l6ZSBzcGFjZSBpbiB0aGUgdGV4dHVyZSkuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY2hhclNpemUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hhclNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIERpZ2l0YWwgUmFpbiBGb250VGV4dHVyZSBjbGFzc1xyXG4gICAgICogQHBhcmFtIG5hbWUgdGhlIG5hbWUgb2YgdGhlIHRleHR1cmVcclxuICAgICAqIEBwYXJhbSBmb250IHRoZSBmb250IHRvIHVzZSwgdXNlIHRoZSBXM0MgQ1NTIG5vdGF0aW9uXHJcbiAgICAgKiBAcGFyYW0gdGV4dCB0aGUgY2FyYWN0ZXIgc2V0IHRvIHVzZSBpbiB0aGUgcmVuZGVyaW5nLlxyXG4gICAgICogQHBhcmFtIHNjZW5lIHRoZSBzY2VuZSB0aGF0IG93bnMgdGhlIHRleHR1cmVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBmb250OiBzdHJpbmcsIHRleHQ6IHN0cmluZywgc2NlbmU6IE51bGxhYmxlPFNjZW5lPiA9IG51bGwpIHtcclxuICAgICAgICBzdXBlcihzY2VuZSk7XHJcblxyXG4gICAgICAgIHNjZW5lID0gdGhpcy5nZXRTY2VuZSgpO1xyXG5cclxuICAgICAgICBpZiAoIXNjZW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fdGV4dCA9PSB0ZXh0O1xyXG4gICAgICAgIHRoaXMuX2ZvbnQgPT0gZm9udDtcclxuXHJcbiAgICAgICAgdGhpcy53cmFwVSA9IFRleHR1cmUuQ0xBTVBfQUREUkVTU01PREU7XHJcbiAgICAgICAgdGhpcy53cmFwViA9IFRleHR1cmUuQ0xBTVBfQUREUkVTU01PREU7XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgZm9udCBzcGVjaWZpYyBpbmZvLlxyXG4gICAgICAgIGNvbnN0IG1heENoYXJIZWlnaHQgPSB0aGlzLl9nZXRGb250SGVpZ2h0KGZvbnQpO1xyXG4gICAgICAgIGNvbnN0IG1heENoYXJXaWR0aCA9IHRoaXMuX2dldEZvbnRXaWR0aChmb250KTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2hhclNpemUgPSBNYXRoLm1heChtYXhDaGFySGVpZ2h0LmhlaWdodCwgbWF4Q2hhcldpZHRoKTtcclxuXHJcbiAgICAgICAgLy8gVGhpcyBpcyBhbiBhcHByb3hpbWF0ZSBzaXplLCBidXQgc2hvdWxkIGFsd2F5cyBiZSBhYmxlIHRvIGZpdCBhdCBsZWFzdCB0aGUgbWF4Q2hhckNvdW50LlxyXG4gICAgICAgIGNvbnN0IHRleHR1cmVXaWR0aCA9IHRoaXMuX2NoYXJTaXplO1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmVIZWlnaHQgPSBNYXRoLmNlaWwodGhpcy5fY2hhclNpemUgKiB0ZXh0Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgdGV4dHVyZSB0aGF0IHdpbGwgc3RvcmUgdGhlIGZvbnQgY2hhcmFjdGVycy5cclxuICAgICAgICB0aGlzLl90ZXh0dXJlID0gc2NlbmUuZ2V0RW5naW5lKCkuY3JlYXRlRHluYW1pY1RleHR1cmUodGV4dHVyZVdpZHRoLCB0ZXh0dXJlSGVpZ2h0LCBmYWxzZSwgVGV4dHVyZS5ORUFSRVNUX1NBTVBMSU5HTU9ERSk7XHJcbiAgICAgICAgLy9zY2VuZS5nZXRFbmdpbmUoKS5zZXRjbGFtcFxyXG4gICAgICAgIGNvbnN0IHRleHR1cmVTaXplID0gdGhpcy5nZXRTaXplKCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIGNhbnZhcyB3aXRoIHRoZSBmaW5hbCBzaXplOiB0aGUgb25lIG1hdGNoaW5nIHRoZSB0ZXh0dXJlLlxyXG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gdGV4dHVyZVNpemUud2lkdGg7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHRleHR1cmVTaXplLmhlaWdodDtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gPENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRD5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gXCJ0b3BcIjtcclxuICAgICAgICBjb250ZXh0LmZvbnQgPSBmb250O1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIGNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIFNldHMgdGhlIHRleHQgaW4gdGhlIHRleHR1cmUuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFRleHQodGV4dFtpXSwgMCwgaSAqIHRoaXMuX2NoYXJTaXplIC0gbWF4Q2hhckhlaWdodC5vZmZzZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRmx1c2ggdGhlIHRleHQgaW4gdGhlIGR5bmFtaWMgdGV4dHVyZS5cclxuICAgICAgICBzY2VuZS5nZXRFbmdpbmUoKS51cGRhdGVEeW5hbWljVGV4dHVyZSh0aGlzLl90ZXh0dXJlLCBjYW52YXMsIGZhbHNlLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1heCBjaGFyIHdpZHRoIG9mIGEgZm9udC5cclxuICAgICAqIEBwYXJhbSBmb250IHRoZSBmb250IHRvIHVzZSwgdXNlIHRoZSBXM0MgQ1NTIG5vdGF0aW9uXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgbWF4IGNoYXIgd2lkdGhcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZ2V0Rm9udFdpZHRoKGZvbnQ6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgZm9udERyYXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IDxDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ+Zm9udERyYXcuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgY3R4LmZvbnQgPSBmb250O1xyXG5cclxuICAgICAgICByZXR1cm4gY3R4Lm1lYXN1cmVUZXh0KFwiV1wiKS53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb3JlIGluZm8gaGVyZTogaHR0cHM6Ly92aWRlbGFpcy5jb20vMjAxNC8wMy8xNi90aGUtbWFueS1hbmQtdmFyaWVkLXByb2JsZW1zLXdpdGgtbWVhc3VyaW5nLWZvbnQtaGVpZ2h0LWZvci1odG1sNS1jYW52YXMvXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1heCBjaGFyIGhlaWdodCBvZiBhIGZvbnQuXHJcbiAgICAgKiBAcGFyYW0gZm9udCB0aGUgZm9udCB0byB1c2UsIHVzZSB0aGUgVzNDIENTUyBub3RhdGlvblxyXG4gICAgICogQHJldHVybnMgdGhlIG1heCBjaGFyIGhlaWdodFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9nZXRGb250SGVpZ2h0KGZvbnQ6IHN0cmluZyk6IHsgaGVpZ2h0OiBudW1iZXI7IG9mZnNldDogbnVtYmVyIH0ge1xyXG4gICAgICAgIGNvbnN0IGZvbnREcmF3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICBjb25zdCBjdHggPSA8Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEPmZvbnREcmF3LmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgZm9udERyYXcud2lkdGgsIGZvbnREcmF3LmhlaWdodCk7XHJcbiAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICBjdHguZm9udCA9IGZvbnQ7XHJcbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiakh8XCIsIDAsIDApO1xyXG4gICAgICAgIGNvbnN0IHBpeGVscyA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgZm9udERyYXcud2lkdGgsIGZvbnREcmF3LmhlaWdodCkuZGF0YTtcclxuICAgICAgICBsZXQgc3RhcnQgPSAtMTtcclxuICAgICAgICBsZXQgZW5kID0gLTE7XHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgZm9udERyYXcuaGVpZ2h0OyByb3crKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCBmb250RHJhdy53aWR0aDsgY29sdW1uKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gKHJvdyAqIGZvbnREcmF3LndpZHRoICsgY29sdW1uKSAqIDQ7XHJcbiAgICAgICAgICAgICAgICBpZiAocGl4ZWxzW2luZGV4XSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW4gPT09IGZvbnREcmF3LndpZHRoIC0gMSAmJiBzdGFydCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gcm93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cgPSBmb250RHJhdy5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IHJvdztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgaGVpZ2h0OiBlbmQgLSBzdGFydCArIDEsIG9mZnNldDogc3RhcnQgLSAxIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9uZXMgdGhlIGN1cnJlbnQgRGlnaXRhbFJhaW5Gb250VGV4dHVyZS5cclxuICAgICAqIEByZXR1cm5zIHRoZSBjbG9uZSBvZiB0aGUgdGV4dHVyZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG92ZXJyaWRlIGNsb25lKCk6IERpZ2l0YWxSYWluRm9udFRleHR1cmUge1xyXG4gICAgICAgIHJldHVybiBuZXcgRGlnaXRhbFJhaW5Gb250VGV4dHVyZSh0aGlzLm5hbWUsIHRoaXMuX2ZvbnQsIHRoaXMuX3RleHQsIHRoaXMuZ2V0U2NlbmUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZXMgYSBqc29uIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHRleHR1cmUgYW5kIHJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXQuXHJcbiAgICAgKiBAcGFyYW0gc291cmNlIHRoZSBzb3VyY2UgSlNPTiByZXByZXNlbnRhdGlvblxyXG4gICAgICogQHBhcmFtIHNjZW5lIHRoZSBzY2VuZSB0byBjcmVhdGUgdGhlIHRleHR1cmUgZm9yXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgcGFyc2VkIHRleHR1cmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBQYXJzZShzb3VyY2U6IGFueSwgc2NlbmU6IFNjZW5lKTogRGlnaXRhbFJhaW5Gb250VGV4dHVyZSB7XHJcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IFNlcmlhbGl6YXRpb25IZWxwZXIuUGFyc2UoKCkgPT4gbmV3IERpZ2l0YWxSYWluRm9udFRleHR1cmUoc291cmNlLm5hbWUsIHNvdXJjZS5mb250LCBzb3VyY2UudGV4dCwgc2NlbmUpLCBzb3VyY2UsIHNjZW5lLCBudWxsKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBPcHRpb24gYXZhaWxhYmxlIGluIHRoZSBEaWdpdGFsIFJhaW4gUG9zdCBQcm9jZXNzLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJRGlnaXRhbFJhaW5Qb3N0UHJvY2Vzc09wdGlvbnMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZm9udCB0byB1c2UgZm9sbG93aW5nIHRoZSB3M2MgZm9udCBkZWZpbml0aW9uLlxyXG4gICAgICovXHJcbiAgICBmb250Pzogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBkZWZpbmVzIHRoZSBhbW91bnQgeW91IHdhbnQgdG8gbWl4IHRoZSBcInRpbGVcIiBvciBjYXJhY3RlciBzcGFjZSBjb2xvcmVkIGluIHRoZSBkaWdpdGFsIHJhaW4uXHJcbiAgICAgKiBUaGlzIG51bWJlciBpcyBkZWZpbmVkIGJldHdlZW4gMCBhbmQgMTtcclxuICAgICAqL1xyXG4gICAgbWl4VG9UaWxlPzogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBkZWZpbmVzIHRoZSBhbW91bnQgeW91IHdhbnQgdG8gbWl4IHRoZSBub3JtYWwgcmVuZGVyaW5nIHBhc3MgaW4gdGhlIGRpZ2l0YWwgcmFpbi5cclxuICAgICAqIFRoaXMgbnVtYmVyIGlzIGRlZmluZWQgYmV0d2VlbiAwIGFuZCAxO1xyXG4gICAgICovXHJcbiAgICBtaXhUb05vcm1hbD86IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIERpZ2l0YWxSYWluUG9zdFByb2Nlc3MgaGVscHMgcmVuZGVyaW5nIGV2ZXJpdGhpbmcgaW4gZGlnaXRhbCByYWluLlxyXG4gKlxyXG4gKiBTaW1tcGx5IGFkZCBpdCB0byB5b3VyIHNjZW5lIGFuZCBsZXQgdGhlIG5lcmQgdGhhdCBsaXZlcyBpbiB5b3UgaGF2ZSBmdW4uXHJcbiAqIEV4YW1wbGUgdXNhZ2U6IHZhciBwcCA9IG5ldyBEaWdpdGFsUmFpblBvc3RQcm9jZXNzKFwiZGlnaXRhbFJhaW5cIiwgXCIyMHB4IE1vbm9zcGFjZVwiLCBjYW1lcmEpO1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERpZ2l0YWxSYWluUG9zdFByb2Nlc3MgZXh0ZW5kcyBQb3N0UHJvY2VzcyB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBmb250IHRleHR1cmUgdXNlZCB0byByZW5kZXIgdGhlIGNoYXIgaW4gdGhlIHBvc3QgcHJvY2Vzcy5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZGlnaXRhbFJhaW5Gb250VGV4dHVyZTogRGlnaXRhbFJhaW5Gb250VGV4dHVyZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZGVmaW5lcyB0aGUgYW1vdW50IHlvdSB3YW50IHRvIG1peCB0aGUgXCJ0aWxlXCIgb3IgY2FyYWN0ZXIgc3BhY2UgY29sb3JlZCBpbiB0aGUgZGlnaXRhbCByYWluLlxyXG4gICAgICogVGhpcyBudW1iZXIgaXMgZGVmaW5lZCBiZXR3ZWVuIDAgYW5kIDE7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtaXhUb1RpbGU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGRlZmluZXMgdGhlIGFtb3VudCB5b3Ugd2FudCB0byBtaXggdGhlIG5vcm1hbCByZW5kZXJpbmcgcGFzcyBpbiB0aGUgZGlnaXRhbCByYWluLlxyXG4gICAgICogVGhpcyBudW1iZXIgaXMgZGVmaW5lZCBiZXR3ZWVuIDAgYW5kIDE7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtaXhUb05vcm1hbDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNwZWVkIG9mIHRoZSBlZmZlY3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNwZWVkOiBudW1iZXIgPSAwLjAwMztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc3RhbnRpYXRlcyBhIG5ldyBEaWdpdGFsIFJhaW4gUG9zdCBQcm9jZXNzLlxyXG4gICAgICogQHBhcmFtIG5hbWUgdGhlIG5hbWUgdG8gZ2l2ZSB0byB0aGUgcG9zdHByb2Nlc3NcclxuICAgICAqIEBjYW1lcmEgdGhlIGNhbWVyYSB0byBhcHBseSB0aGUgcG9zdCBwcm9jZXNzIHRvLlxyXG4gICAgICogQHBhcmFtIGNhbWVyYVxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgY2FuIGVpdGhlciBiZSB0aGUgZm9udCBuYW1lIG9yIGFuIG9wdGlvbiBvYmplY3QgZm9sbG93aW5nIHRoZSBJRGlnaXRhbFJhaW5Qb3N0UHJvY2Vzc09wdGlvbnMgZm9ybWF0XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgY2FtZXJhOiBOdWxsYWJsZTxDYW1lcmE+LCBvcHRpb25zPzogc3RyaW5nIHwgSURpZ2l0YWxSYWluUG9zdFByb2Nlc3NPcHRpb25zKSB7XHJcbiAgICAgICAgc3VwZXIoXHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIFwiZGlnaXRhbHJhaW5cIixcclxuICAgICAgICAgICAgW1wiZGlnaXRhbFJhaW5Gb250SW5mb3NcIiwgXCJkaWdpdGFsUmFpbk9wdGlvbnNcIiwgXCJjb3NUaW1lWmVyb09uZVwiLCBcIm1hdHJpeFNwZWVkXCJdLFxyXG4gICAgICAgICAgICBbXCJkaWdpdGFsUmFpbkZvbnRcIl0sXHJcbiAgICAgICAgICAgIDEuMCxcclxuICAgICAgICAgICAgY2FtZXJhLFxyXG4gICAgICAgICAgICBUZXh0dXJlLlRSSUxJTkVBUl9TQU1QTElOR01PREUsXHJcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdHJ1ZVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIERlZmF1bHQgdmFsdWVzLlxyXG4gICAgICAgIGxldCBmb250ID0gXCIxNXB4IE1vbm9zcGFjZVwiO1xyXG4gICAgICAgIGNvbnN0IGNoYXJhY3RlclNldCA9XHJcbiAgICAgICAgICAgIFwi5Y+k5rGg44KE6JuZ6aOb44Gz6L6844KA5rC044Gu6Z+z44G144KL44GE44GR44KE44GL44KP44Ga44Go44Gz44GT44KA44G/44Ga44Gu44GK44Go5Yid44GX44GQ44KM54y/44KC5bCP6JOR44KS44G744GX44GS5Lmf44Gv44Gk44GX44GQ44KM44GV44KL44KC44GT44G/44Gu44KS44G744GX44GS44Gq44KK5rGf5oi444Gu6Zuo5L2V55+z5ZGR44KT44Gg5pmC6bOl44GI44Gp44Gu44GC44KB44Gq44KT44GU44GP44Gu44KT44Gg44G744Go44Go44GO44GZXCI7XHJcblxyXG4gICAgICAgIC8vIFVzZSBvcHRpb25zLlxyXG4gICAgICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgZm9udCA9IDxzdHJpbmc+b3B0aW9ucztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvbnQgPSAoPElEaWdpdGFsUmFpblBvc3RQcm9jZXNzT3B0aW9ucz5vcHRpb25zKS5mb250IHx8IGZvbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1peFRvVGlsZSA9ICg8SURpZ2l0YWxSYWluUG9zdFByb2Nlc3NPcHRpb25zPm9wdGlvbnMpLm1peFRvVGlsZSB8fCB0aGlzLm1peFRvVGlsZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWl4VG9Ob3JtYWwgPSAoPElEaWdpdGFsUmFpblBvc3RQcm9jZXNzT3B0aW9ucz5vcHRpb25zKS5taXhUb05vcm1hbCB8fCB0aGlzLm1peFRvTm9ybWFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzY2VuZSA9IGNhbWVyYT8uZ2V0U2NlbmUoKSB8fCBudWxsO1xyXG4gICAgICAgIHRoaXMuX2RpZ2l0YWxSYWluRm9udFRleHR1cmUgPSBuZXcgRGlnaXRhbFJhaW5Gb250VGV4dHVyZShuYW1lLCBmb250LCBjaGFyYWN0ZXJTZXQsIHNjZW5lKTtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlU2l6ZSA9IHRoaXMuX2RpZ2l0YWxSYWluRm9udFRleHR1cmUuZ2V0U2l6ZSgpO1xyXG5cclxuICAgICAgICBsZXQgYWxwaGEgPSAwLjA7XHJcbiAgICAgICAgbGV0IGNvc1RpbWVaZXJvT25lID0gMC4wO1xyXG4gICAgICAgIGNvbnN0IG1hdHJpeCA9IE1hdHJpeC5Gcm9tVmFsdWVzKFxyXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5vbkFwcGx5ID0gKGVmZmVjdDogRWZmZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGVmZmVjdC5zZXRUZXh0dXJlKFwiZGlnaXRhbFJhaW5Gb250XCIsIHRoaXMuX2RpZ2l0YWxSYWluRm9udFRleHR1cmUpO1xyXG5cclxuICAgICAgICAgICAgZWZmZWN0LnNldEZsb2F0NChcImRpZ2l0YWxSYWluRm9udEluZm9zXCIsIHRoaXMuX2RpZ2l0YWxSYWluRm9udFRleHR1cmUuY2hhclNpemUsIGNoYXJhY3RlclNldC5sZW5ndGgsIHRleHR1cmVTaXplLndpZHRoLCB0ZXh0dXJlU2l6ZS5oZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgZWZmZWN0LnNldEZsb2F0NChcImRpZ2l0YWxSYWluT3B0aW9uc1wiLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5taXhUb05vcm1hbCwgdGhpcy5taXhUb1RpbGUpO1xyXG5cclxuICAgICAgICAgICAgZWZmZWN0LnNldE1hdHJpeChcIm1hdHJpeFNwZWVkXCIsIG1hdHJpeCk7XHJcblxyXG4gICAgICAgICAgICBhbHBoYSArPSB0aGlzLnNwZWVkO1xyXG4gICAgICAgICAgICBjb3NUaW1lWmVyb09uZSA9IGFscGhhO1xyXG4gICAgICAgICAgICBlZmZlY3Quc2V0RmxvYXQoXCJjb3NUaW1lWmVyb09uZVwiLCBjb3NUaW1lWmVyb09uZSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG4iLCIvLyBEbyBub3QgZWRpdC5cbmltcG9ydCB7IFNoYWRlclN0b3JlIH0gZnJvbSBcImNvcmUvRW5naW5lcy9zaGFkZXJTdG9yZVwiO1xuXG5jb25zdCBuYW1lID0gXCJkaWdpdGFscmFpblBpeGVsU2hhZGVyXCI7XG5jb25zdCBzaGFkZXIgPSBgdmFyeWluZyB2ZWMyIHZVVjt1bmlmb3JtIHNhbXBsZXIyRCB0ZXh0dXJlU2FtcGxlcjt1bmlmb3JtIHNhbXBsZXIyRCBkaWdpdGFsUmFpbkZvbnQ7dW5pZm9ybSB2ZWM0IGRpZ2l0YWxSYWluRm9udEluZm9zO3VuaWZvcm0gdmVjNCBkaWdpdGFsUmFpbk9wdGlvbnM7dW5pZm9ybSBtYXQ0IG1hdHJpeFNwZWVkO3VuaWZvcm0gZmxvYXQgY29zVGltZVplcm9PbmU7ZmxvYXQgZ2V0THVtaW5hbmNlKHZlYzMgY29sb3IpXG57cmV0dXJuIGNsYW1wKGRvdChjb2xvcix2ZWMzKDAuMjEyNiwwLjcxNTIsMC4wNzIyKSksMC4sMS4pO31cbiNkZWZpbmUgQ1VTVE9NX0ZSQUdNRU5UX0RFRklOSVRJT05TXG52b2lkIG1haW4odm9pZCkgXG57ZmxvYXQgY2FyYWN0ZXJTaXplPWRpZ2l0YWxSYWluRm9udEluZm9zLng7ZmxvYXQgbnVtQ2hhcj1kaWdpdGFsUmFpbkZvbnRJbmZvcy55LTEuMDtmbG9hdCBmb250eD1kaWdpdGFsUmFpbkZvbnRJbmZvcy56O2Zsb2F0IGZvbnR5PWRpZ2l0YWxSYWluRm9udEluZm9zLnc7ZmxvYXQgc2NyZWVueD1kaWdpdGFsUmFpbk9wdGlvbnMueDtmbG9hdCBzY3JlZW55PWRpZ2l0YWxSYWluT3B0aW9ucy55O2Zsb2F0IHJhdGlvPXNjcmVlbnkvZm9udHk7ZmxvYXQgY29sdW1ueD1mbG9hdChmbG9vcigoZ2xfRnJhZ0Nvb3JkLngpL2NhcmFjdGVyU2l6ZSkpO2Zsb2F0IHRpbGVYPWZsb2F0KGZsb29yKChnbF9GcmFnQ29vcmQueCkvY2FyYWN0ZXJTaXplKSkqY2FyYWN0ZXJTaXplL3NjcmVlbng7ZmxvYXQgdGlsZVk9ZmxvYXQoZmxvb3IoKGdsX0ZyYWdDb29yZC55KS9jYXJhY3RlclNpemUpKSpjYXJhY3RlclNpemUvc2NyZWVueTt2ZWMyIHRpbGVVVj12ZWMyKHRpbGVYLHRpbGVZKTt2ZWM0IHRpbGVDb2xvcj10ZXh0dXJlMkQodGV4dHVyZVNhbXBsZXIsdGlsZVVWKTt2ZWM0IGJhc2VDb2xvcj10ZXh0dXJlMkQodGV4dHVyZVNhbXBsZXIsdlVWKTtmbG9hdCB0aWxlTHVtaW5hbmNlPWdldEx1bWluYW5jZSh0aWxlQ29sb3IucmdiKTtpbnQgc3Q9aW50KG1vZChjb2x1bW54LDQuMCkpO2Zsb2F0IHNwZWVkPWNvc1RpbWVaZXJvT25lKihzaW4odGlsZVgqMzE0LjUpKjAuNSswLjYpOyBcbmZsb2F0IHg9ZmxvYXQobW9kKGdsX0ZyYWdDb29yZC54LGNhcmFjdGVyU2l6ZSkpL2ZvbnR4O2Zsb2F0IHk9ZmxvYXQobW9kKHNwZWVkK2dsX0ZyYWdDb29yZC55L3NjcmVlbnksMS4wKSk7eSo9cmF0aW87dmVjNCBmaW5hbENvbG9yPSB0ZXh0dXJlMkQoZGlnaXRhbFJhaW5Gb250LHZlYzIoeCwxLjAteSkpO3ZlYzMgaGlnaD1maW5hbENvbG9yLnJnYioodmVjMygxLjIsMS4yLDEuMikqcG93KDEuMC15LDMwLjApKTtmaW5hbENvbG9yLnJnYio9dmVjMyhwb3codGlsZUx1bWluYW5jZSw1LjApLHBvdyh0aWxlTHVtaW5hbmNlLDEuNSkscG93KHRpbGVMdW1pbmFuY2UsMy4wKSk7ZmluYWxDb2xvci5yZ2IrPWhpZ2g7ZmluYWxDb2xvci5yZ2I9Y2xhbXAoZmluYWxDb2xvci5yZ2IsMC4sMS4pO2ZpbmFsQ29sb3IuYT0xLjA7ZmluYWxDb2xvcj0gbWl4KGZpbmFsQ29sb3IsdGlsZUNvbG9yLGRpZ2l0YWxSYWluT3B0aW9ucy53KTtmaW5hbENvbG9yPSBtaXgoZmluYWxDb2xvcixiYXNlQ29sb3IsZGlnaXRhbFJhaW5PcHRpb25zLnopO2dsX0ZyYWdDb2xvcj1maW5hbENvbG9yO31gO1xuLy8gU2lkZWVmZmVjdFxuU2hhZGVyU3RvcmUuU2hhZGVyc1N0b3JlW25hbWVdID0gc2hhZGVyO1xuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGNvbnN0IGRpZ2l0YWxyYWluUGl4ZWxTaGFkZXIgPSB7IG5hbWUsIHNoYWRlciB9O1xuIiwiZXhwb3J0ICogZnJvbSBcIi4vZGlnaXRhbFJhaW5Qb3N0UHJvY2Vzc1wiO1xyXG4iLCIvLyBEbyBub3QgZWRpdC5cbmltcG9ydCB7IFNoYWRlclN0b3JlIH0gZnJvbSBcImNvcmUvRW5naW5lcy9zaGFkZXJTdG9yZVwiO1xuXG5jb25zdCBuYW1lID0gXCJlZGdlRGV0ZWN0aW9uUGl4ZWxTaGFkZXJcIjtcbmNvbnN0IHNoYWRlciA9IGBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7dmFyeWluZyB2ZWMyIHZVVjt1bmlmb3JtIHNhbXBsZXIyRCB0ZXh0dXJlU2FtcGxlcjt1bmlmb3JtIHNhbXBsZXIyRCBub3JtYWxTYW1wbGVyO3VuaWZvcm0gc2FtcGxlcjJEIGRlcHRoU2FtcGxlcjt1bmlmb3JtIGZsb2F0IHdpZHRoO3VuaWZvcm0gZmxvYXQgaGVpZ2h0O3VuaWZvcm0gdmVjMyBlZGdlQ29sb3I7dW5pZm9ybSBmbG9hdCBlZGdlSW50ZW5zaXR5O3VuaWZvcm0gZmxvYXQgZWRnZVdpZHRoO3VuaWZvcm0gaW50IHJlbmRlck1vZGU7IFxudmVjMyBib3hCbHVyKHNhbXBsZXIyRCBzYW1wbGVyLHZlYzIgdXYsdmVjMiB0ZXhlbFNpemUpIHt2ZWMzIHJlc3VsdD12ZWMzKDAuMCk7Zm9yIChpbnQgeD0tMTsgeDw9MTsgeCsrKSB7Zm9yIChpbnQgeT0tMTsgeTw9MTsgeSsrKSB7dmVjMiBvZmZzZXQ9dmVjMihmbG9hdCh4KSxmbG9hdCh5KSkqdGV4ZWxTaXplO3Jlc3VsdCs9dGV4dHVyZTJEKHNhbXBsZXIsdXYrb2Zmc2V0KS5yZ2I7fX1cbnJldHVybiByZXN1bHQvOS4wO31cbnZvaWQgbWFpbih2b2lkKSB7dmVjMiB0ZXhlbFNpemU9dmVjMigxLjAvd2lkdGgsMS4wL2hlaWdodCk7dmVjMyBvcmlnaW5hbENvbG9yPXRleHR1cmUyRCh0ZXh0dXJlU2FtcGxlcix2VVYpLnJnYjtpZiAocmVuZGVyTW9kZT09MSB8fCByZW5kZXJNb2RlPT0yIHx8IHJlbmRlck1vZGU9PTMpIHtpZiAobGVuZ3RoKG9yaWdpbmFsQ29sb3IpPT0wLjApIHtvcmlnaW5hbENvbG9yPXZlYzMoMS4wLDEuMCwxLjApOyB9XG5pZiAob3JpZ2luYWxDb2xvci5yPT0xLjAgJiYgb3JpZ2luYWxDb2xvci5nPT0wLjAgJiYgb3JpZ2luYWxDb2xvci5iPT0wLjApIHtvcmlnaW5hbENvbG9yPXZlYzMoMS4wLDEuMCwxLjApOyB9fVxudmVjMyBub3JtYWw9dGV4dHVyZTJEKG5vcm1hbFNhbXBsZXIsdlVWKS5yZ2I7ZmxvYXQgZGVwdGg9dGV4dHVyZTJEKGRlcHRoU2FtcGxlcix2VVYpLnI7ZmxvYXQgZWRnZVN0cmVuZ3RoPTAuMDtpbnQgcmFuZ2U9aW50KGVkZ2VXaWR0aCo4LjApOyBcbmZvciAoaW50IHg9LXJhbmdlOyB4PD1yYW5nZTsgeCsrKSB7Zm9yIChpbnQgeT0tcmFuZ2U7IHk8PXJhbmdlOyB5KyspIHtpZiAoeD09MCAmJiB5PT0wKSB7Y29udGludWU7fVxudmVjMyBuZWlnaGJvck5vcm1hbD10ZXh0dXJlMkQobm9ybWFsU2FtcGxlcix2VVYrdGV4ZWxTaXplKnZlYzIoZmxvYXQoeCksZmxvYXQoeSkpKS5yZ2I7ZmxvYXQgbmVpZ2hib3JEZXB0aD10ZXh0dXJlMkQoZGVwdGhTYW1wbGVyLHZVVit0ZXhlbFNpemUqdmVjMihmbG9hdCh4KSxmbG9hdCh5KSkpLnI7ZmxvYXQgbm9ybWFsRGlmZj1sZW5ndGgobmVpZ2hib3JOb3JtYWwtbm9ybWFsKTtmbG9hdCBkZXB0aERpZmY9YWJzKG5laWdoYm9yRGVwdGgtZGVwdGgpO2VkZ2VTdHJlbmd0aD1tYXgoZWRnZVN0cmVuZ3RoLG1heChub3JtYWxEaWZmLGRlcHRoRGlmZikpO319XG5lZGdlU3RyZW5ndGg9c21vb3Roc3RlcChlZGdlV2lkdGgsZWRnZVdpZHRoK2VkZ2VJbnRlbnNpdHksZWRnZVN0cmVuZ3RoKTt2ZWMzIGZpbmFsQ29sb3I9bWl4KG9yaWdpbmFsQ29sb3IsZWRnZUNvbG9yLGVkZ2VTdHJlbmd0aCk7Z2xfRnJhZ0NvbG9yPXZlYzQoZmluYWxDb2xvciwxLjApO31gO1xuLy8gU2lkZWVmZmVjdFxuU2hhZGVyU3RvcmUuU2hhZGVyc1N0b3JlW25hbWVdID0gc2hhZGVyO1xuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGNvbnN0IGVkZ2VEZXRlY3Rpb25QaXhlbFNoYWRlciA9IHsgbmFtZSwgc2hhZGVyIH07XG4iLCJpbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmUvTWlzYy9sb2dnZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBDYW1lcmEgfSBmcm9tIFwiY29yZS9DYW1lcmFzL2NhbWVyYVwiO1xyXG5pbXBvcnQgdHlwZSB7IEVmZmVjdCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9lZmZlY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBQb3N0UHJvY2Vzc09wdGlvbnMgfSBmcm9tIFwiY29yZS9Qb3N0UHJvY2Vzc2VzL3Bvc3RQcm9jZXNzXCI7XHJcbmltcG9ydCB7IFBvc3RQcm9jZXNzIH0gZnJvbSBcImNvcmUvUG9zdFByb2Nlc3Nlcy9wb3N0UHJvY2Vzc1wiO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiY29yZS9FbmdpbmVzL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgXCJjb3JlL1JlbmRlcmluZy9nZW9tZXRyeUJ1ZmZlclJlbmRlcmVyU2NlbmVDb21wb25lbnRcIjtcclxuaW1wb3J0IHR5cGUgeyBHZW9tZXRyeUJ1ZmZlclJlbmRlcmVyIH0gZnJvbSBcImNvcmUvUmVuZGVyaW5nL2dlb21ldHJ5QnVmZmVyUmVuZGVyZXJcIjtcclxuaW1wb3J0IHsgQ29sb3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5jb2xvclwiO1xyXG5pbXBvcnQgeyBzZXJpYWxpemUgfSBmcm9tIFwiY29yZS9NaXNjL2RlY29yYXRvcnNcIjtcclxuaW1wb3J0IHsgU2VyaWFsaXphdGlvbkhlbHBlciB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9ycy5zZXJpYWxpemF0aW9uXCI7XHJcbmltcG9ydCB7IFJlZ2lzdGVyQ2xhc3MgfSBmcm9tIFwiY29yZS9NaXNjL3R5cGVTdG9yZVwiO1xyXG5pbXBvcnQgeyBFbmdpbmVTdG9yZSB9IGZyb20gXCJjb3JlL0VuZ2luZXMvZW5naW5lU3RvcmVcIjtcclxuaW1wb3J0IHsgUmVuZGVyVGFyZ2V0VGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9yZW5kZXJUYXJnZXRUZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgXCIuL2VkZ2VEZXRlY3Rpb24uZnJhZ21lbnRcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgRWRnZSBEZXRlY3Rpb24gZWZmZWN0IGhpZ2hsaWdodHMgdGhlIGVkZ2VzIG9mIG9iamVjdHMgaW4gdGhlIHNjZW5lIGxpa2UgYSB0b29uLlxyXG4gKiBUaGlzIGNhbiBiZSB1c2VkIGZvciBzdHlsaXplZCByZW5kZXJpbmcsIG91dGxpbmluZywgb3IgdmlzdWFsIGVmZmVjdHMgdGhhdCByZXF1aXJlIGVkZ2UgZW5oYW5jZW1lbnQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRWRnZURldGVjdGlvblBvc3RQcm9jZXNzIGV4dGVuZHMgUG9zdFByb2Nlc3Mge1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBjb2xvciBvZiB0aGUgZGV0ZWN0ZWQgZWRnZXMuXHJcbiAgICAgKi9cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGVkZ2VDb2xvcjogQ29sb3IzID0gbmV3IENvbG9yMygwLCAwLCAwKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGludGVuc2l0eSBvZiB0aGUgZGV0ZWN0ZWQgZWRnZXMuXHJcbiAgICAgKiBIaWdoZXIgdmFsdWVzIHJlc3VsdCBpbiBtb3JlIHByb25vdW5jZWQgZWRnZXMuXHJcbiAgICAgKiBkZWZhdWx0OiAwLjIgIChtaW46MCwgbWF4OjEpXHJcbiAgICAgKi9cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGVkZ2VJbnRlbnNpdHk6IG51bWJlciA9IDAuMjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIHdpZHRoIG9mIHRoZSBkZXRlY3RlZCBlZGdlcy5cclxuICAgICAqIEhpZ2hlciB2YWx1ZXMgcmVzdWx0IGluIHRoaWNrZXIgZWRnZXMuXHJcbiAgICAgKiBkZWZhdWx0OiAwLjIgKG1pbjowLjEyNSwgbWF4OjEpXHJcbiAgICAgKi9cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGVkZ2VXaWR0aDogbnVtYmVyID0gMC4yO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgcmVuZGVyIG1vZGUuXHJcbiAgICAgKiBkZWZhdWx0OiAwXHJcbiAgICAgKiAwOiBnZW5lcmFsLCAxOiBub3JtYWwsIDI6IGRlcHRoLCAzOiBvdXRsaW5lIG9ubHlcclxuICAgICAqL1xyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgcmVuZGVyTW9kZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIF9nZW9tZXRyeUJ1ZmZlclJlbmRlcmVyOiBOdWxsYWJsZTxHZW9tZXRyeUJ1ZmZlclJlbmRlcmVyPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgY3VycmVudCBjbGFzcyBuYW1lIG9mIHRoZSBjdXJyZW50IGVmZmVjdFxyXG4gICAgICogQHJldHVybnMgXCJFZGdlRGV0ZWN0aW9uUG9zdFByb2Nlc3NcIlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiRWRnZURldGVjdGlvblBvc3RQcm9jZXNzXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIEVkZ2VEZXRlY3Rpb25Qb3N0UHJvY2Vzcy5cclxuICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBlZmZlY3QuXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgVGhlIHNjZW5lIHdoZXJlIHRoZSBlZGdlIGRldGVjdGlvbiBwb3N0LXByb2Nlc3Mgd2lsbCBiZSBhcHBsaWVkLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgVGhlIHJlcXVpcmVkIHdpZHRoL2hlaWdodCByYXRpbyBvciBzcGVjaWZpYyBvcHRpb25zIGZvciB0aGUgcG9zdC1wcm9jZXNzLlxyXG4gICAgICogQHBhcmFtIGNhbWVyYSBUaGUgY2FtZXJhIHRvIGFwcGx5IHRoZSBwb3N0LXByb2Nlc3MgdG8uXHJcbiAgICAgKiBAcGFyYW0gc2FtcGxpbmdNb2RlIFRoZSBzYW1wbGluZyBtb2RlIHRvIGJlIHVzZWQgd2hlbiBjb21wdXRpbmcgdGhlIHBhc3MuIChkZWZhdWx0OiBURVhUVVJFX05FQVJFU1RfTkVBUkVTVClcclxuICAgICAqIEBwYXJhbSByZXVzYWJsZSBJZiB0aGUgcG9zdC1wcm9jZXNzIGNhbiBiZSByZXVzZWQgb24gdGhlIHNhbWUgZnJhbWUuIChkZWZhdWx0OiBmYWxzZSlcclxuICAgICAqIEBwYXJhbSB0ZXh0dXJlVHlwZSBUaGUgdHlwZSBvZiB0ZXh0dXJlcyB1c2VkIHdoZW4gcGVyZm9ybWluZyB0aGUgcG9zdC1wcm9jZXNzLiAoZGVmYXVsdDogVEVYVFVSRVRZUEVfSEFMRl9GTE9BVClcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgIHNjZW5lOiBTY2VuZSxcclxuICAgICAgICBvcHRpb25zOiBudW1iZXIgfCBQb3N0UHJvY2Vzc09wdGlvbnMsXHJcbiAgICAgICAgY2FtZXJhOiBOdWxsYWJsZTxDYW1lcmE+LFxyXG4gICAgICAgIHNhbXBsaW5nTW9kZT86IG51bWJlcixcclxuICAgICAgICByZXVzYWJsZT86IGJvb2xlYW4sXHJcbiAgICAgICAgdGV4dHVyZVR5cGU6IG51bWJlciA9IENvbnN0YW50cy5URVhUVVJFVFlQRV9VTlNJR05FRF9CWVRFXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgXCJlZGdlRGV0ZWN0aW9uXCIsXHJcbiAgICAgICAgICAgIFtcIndpZHRoXCIsIFwiaGVpZ2h0XCIsIFwiZWRnZUNvbG9yXCIsIFwiZWRnZUludGVuc2l0eVwiLCBcImVkZ2VXaWR0aFwiLCBcInJlbmRlck1vZGVcIl0sXHJcbiAgICAgICAgICAgIFtcIm5vcm1hbFNhbXBsZXJcIiwgXCJkZXB0aFNhbXBsZXJcIl0sXHJcbiAgICAgICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgICAgIGNhbWVyYSxcclxuICAgICAgICAgICAgc2FtcGxpbmdNb2RlLFxyXG4gICAgICAgICAgICBzY2VuZS5nZXRFbmdpbmUoKSxcclxuICAgICAgICAgICAgcmV1c2FibGUsXHJcbiAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgIHRleHR1cmVUeXBlXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZ2VvbWV0cnlCdWZmZXJSZW5kZXJlciA9IHNjZW5lLmVuYWJsZUdlb21ldHJ5QnVmZmVyUmVuZGVyZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9nZW9tZXRyeUJ1ZmZlclJlbmRlcmVyKSB7XHJcbiAgICAgICAgICAgIC8vIEdlb21ldHJ5IGJ1ZmZlciByZW5kZXJlciBpcyBub3Qgc3VwcG9ydGVkLiBTbywgd29yayBhcyBhIHBhc3N0aHJvdWdoLlxyXG4gICAgICAgICAgICBMb2dnZXIuRXJyb3IoXCJHZW9tZXRyeSBCdWZmZXIgUmVuZGVyZXIgc3VwcG9ydCBpcyByZXF1aXJlZCBmb3IgdGhpcyBwb3N0LXByb2Nlc3MuXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGgxID0gbmV3IFJlbmRlclRhcmdldFRleHR1cmUoXCJoMVwiLCB7IHdpZHRoOiB0aGlzLndpZHRoLCBoZWlnaHQ6IHRoaXMuaGVpZ2h0IH0sIHNjZW5lLCB7XHJcbiAgICAgICAgICAgICAgICBzYW1wbGluZ01vZGU6IENvbnN0YW50cy5URVhUVVJFX05FQVJFU1RfTkVBUkVTVCxcclxuICAgICAgICAgICAgICAgIGdlbmVyYXRlTWlwTWFwczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZURlcHRoQnVmZmVyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IENvbnN0YW50cy5URVhUVVJFVFlQRV9IQUxGX0ZMT0FULFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEdlb21ldHJ5IGJ1ZmZlciByZW5kZXJlciBpcyBzdXBwb3J0ZWQuXHJcbiAgICAgICAgICAgIHRoaXMub25BcHBseSA9IChlZmZlY3Q6IEVmZmVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWZmZWN0LnNldEZsb2F0KFwid2lkdGhcIiwgdGhpcy53aWR0aCk7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3Quc2V0RmxvYXQoXCJoZWlnaHRcIiwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgZWZmZWN0LnNldEZsb2F0KFwiZWRnZUludGVuc2l0eVwiLCB0aGlzLmVkZ2VJbnRlbnNpdHkpO1xyXG4gICAgICAgICAgICAgICAgZWZmZWN0LnNldEZsb2F0KFwiZWRnZVdpZHRoXCIsIHRoaXMuZWRnZVdpZHRoKTtcclxuICAgICAgICAgICAgICAgIGVmZmVjdC5zZXRDb2xvcjMoXCJlZGdlQ29sb3JcIiwgdGhpcy5lZGdlQ29sb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IG5vcm1hbFRleHR1cmUgPSB0aGlzLl9nZW9tZXRyeUJ1ZmZlclJlbmRlcmVyIS5nZXRHQnVmZmVyKCkudGV4dHVyZXNbMV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXB0aFRleHR1cmUgPSB0aGlzLl9nZW9tZXRyeUJ1ZmZlclJlbmRlcmVyIS5nZXRHQnVmZmVyKCkudGV4dHVyZXNbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgZWZmZWN0LnNldFRleHR1cmUoXCJub3JtYWxTYW1wbGVyXCIsIG5vcm1hbFRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgZWZmZWN0LnNldFRleHR1cmUoXCJkZXB0aFNhbXBsZXJcIiwgZGVwdGhUZXh0dXJlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMucmVuZGVyTW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZmZlY3Quc2V0VGV4dHVyZShcInRleHR1cmVTYW1wbGVyXCIsIHRoaXMuX2dlb21ldHJ5QnVmZmVyUmVuZGVyZXIhLmdldEdCdWZmZXIoKS50ZXh0dXJlc1sxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVmZmVjdC5zZXRGbG9hdChcImVkZ2VXaWR0aFwiLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZmZlY3Quc2V0VGV4dHVyZShcInRleHR1cmVTYW1wbGVyXCIsIHRoaXMuX2dlb21ldHJ5QnVmZmVyUmVuZGVyZXIhLmdldEdCdWZmZXIoKS50ZXh0dXJlc1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVmZmVjdC5zZXRGbG9hdChcImVkZ2VXaWR0aFwiLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZmZlY3Quc2V0VGV4dHVyZShcInRleHR1cmVTYW1wbGVyXCIsIGgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlZmZlY3Quc2V0SW50KFwicmVuZGVyTW9kZVwiLCB0aGlzLnJlbmRlck1vZGUpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN1cHBvcnQgdGVzdC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSXNTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgZW5naW5lID0gRW5naW5lU3RvcmUuTGFzdENyZWF0ZWRFbmdpbmU7XHJcbiAgICAgICAgaWYgKCFlbmdpbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVuZ2luZS5nZXRDYXBzKCkuZHJhd0J1ZmZlcnNFeHRlbnNpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBvdmVycmlkZSBfUGFyc2UocGFyc2VkUG9zdFByb2Nlc3M6IGFueSwgdGFyZ2V0Q2FtZXJhOiBDYW1lcmEsIHNjZW5lOiBTY2VuZSwgcm9vdFVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIFNlcmlhbGl6YXRpb25IZWxwZXIuUGFyc2UoXHJcbiAgICAgICAgICAgICgpID0+XHJcbiAgICAgICAgICAgICAgICBuZXcgRWRnZURldGVjdGlvblBvc3RQcm9jZXNzKFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZFBvc3RQcm9jZXNzLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkUG9zdFByb2Nlc3Mub3B0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRDYW1lcmEsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkUG9zdFByb2Nlc3MucmVuZGVyVGFyZ2V0U2FtcGxpbmdNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZFBvc3RQcm9jZXNzLnRleHR1cmVUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZFBvc3RQcm9jZXNzLnJldXNhYmxlXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBwYXJzZWRQb3N0UHJvY2VzcyxcclxuICAgICAgICAgICAgc2NlbmUsXHJcbiAgICAgICAgICAgIHJvb3RVcmxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5SZWdpc3RlckNsYXNzKFwiQkFCWUxPTi5FZGdlRGV0ZWN0aW9uUG9zdFByb2Nlc3NcIiwgRWRnZURldGVjdGlvblBvc3RQcm9jZXNzKTtcclxuIiwiZXhwb3J0ICogZnJvbSBcIi4vZWRnZURldGVjdGlvblBvc3RQcm9jZXNzXCI7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzICovXHJcbmV4cG9ydCAqIGZyb20gXCIuL2FzY2lpQXJ0L2luZGV4XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2RpZ2l0YWxSYWluL2luZGV4XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2VkZ2VEZXRlY3Rpb24vaW5kZXhcIjtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXMgKi9cclxuaW1wb3J0ICogYXMgcG9zdFByb2Nlc3NMaWJyYXJ5IGZyb20gXCJwb3N0LXByb2Nlc3Nlcy9pbmRleFwiO1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIFRoaXMgaXMgdGhlIGVudHJ5IHBvaW50IGZvciB0aGUgVU1EIG1vZHVsZS5cclxuICogVGhlIGVudHJ5IHBvaW50IGZvciBhIGZ1dHVyZSBFU00gcGFja2FnZSBzaG91bGQgYmUgaW5kZXgudHNcclxuICovXHJcbmNvbnN0IGdsb2JhbE9iamVjdCA9IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdW5kZWZpbmVkO1xyXG5pZiAodHlwZW9mIGdsb2JhbE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gcG9zdFByb2Nlc3NMaWJyYXJ5KSB7XHJcbiAgICAgICAgKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OW2tleV0gPSAoPGFueT5wb3N0UHJvY2Vzc0xpYnJhcnkpW2tleV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCAqIGZyb20gXCJwb3N0LXByb2Nlc3Nlcy9pbmRleFwiO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01pc2NfZGVjb3JhdG9yc19fOyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCwgSXRlcmF0b3IgKi9cblxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XG4gIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XG4gIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59XG5cbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcbiAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcbiAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0O1xuICB9XG4gIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcbiAgdmFyIHQgPSB7fTtcbiAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICB0W3BdID0gc1twXTtcbiAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICB9XG4gIHJldHVybiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcbiAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XG4gIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XG4gIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xuICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcbiAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcbiAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBjb250ZXh0ID0ge307XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xuICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcbiAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xuICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XG4gICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xuICAgICAgfVxuICB9XG4gIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcbiAgZG9uZSA9IHRydWU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xuICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcbiAgfVxuICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xuICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcbiAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gIH1cbn1cblxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gIG9bazJdID0gbVtrXTtcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcbiAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xuICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgfVxuICB9O1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xuICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gIGlmICghbSkgcmV0dXJuIG87XG4gIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICB0cnkge1xuICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gIGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgIH1cbiAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICB9XG4gIHJldHVybiBhcjtcbn1cblxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XG4gIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxuICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xuICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcbiAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxuICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXG4gICAgICAgICAgcltrXSA9IGFbal07XG4gIHJldHVybiByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xuICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgfVxuICB9XG4gIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XG4gIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcbiAgcmV0dXJuIGkgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgQXN5bmNJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gQXN5bmNJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiLCBhd2FpdFJldHVybiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gYXdhaXRSZXR1cm4oZikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGYsIHJlamVjdCk7IH07IH1cbiAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XG4gIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cbiAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XG4gIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcbiAgdmFyIGksIHA7XG4gIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcbiAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XG4gIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XG4gIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XG4gIHJldHVybiBjb29rZWQ7XG59O1xuXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59O1xuXG52YXIgb3duS2V5cyA9IGZ1bmN0aW9uKG8pIHtcbiAgb3duS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIChvKSB7XG4gICAgdmFyIGFyID0gW107XG4gICAgZm9yICh2YXIgayBpbiBvKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspKSBhclthci5sZW5ndGhdID0gaztcbiAgICByZXR1cm4gYXI7XG4gIH07XG4gIHJldHVybiBvd25LZXlzKG8pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcbiAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgPSBvd25LZXlzKG1vZCksIGkgPSAwOyBpIDwgay5sZW5ndGg7IGkrKykgaWYgKGtbaV0gIT09IFwiZGVmYXVsdFwiKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGtbaV0pO1xuICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xuICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XG4gIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xuICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hZGREaXNwb3NhYmxlUmVzb3VyY2UoZW52LCB2YWx1ZSwgYXN5bmMpIHtcbiAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkLlwiKTtcbiAgICB2YXIgZGlzcG9zZSwgaW5uZXI7XG4gICAgaWYgKGFzeW5jKSB7XG4gICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcbiAgICB9XG4gICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xuICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XG4gICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xuICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xuICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XG4gIH1cbiAgZWxzZSBpZiAoYXN5bmMpIHtcbiAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcbiAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xuICBmdW5jdGlvbiBmYWlsKGUpIHtcbiAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XG4gICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcbiAgfVxuICB2YXIgciwgcyA9IDA7XG4gIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgd2hpbGUgKHIgPSBlbnYuc3RhY2sucG9wKCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghci5hc3luYyAmJiBzID09PSAxKSByZXR1cm4gcyA9IDAsIGVudi5zdGFjay5wdXNoKHIpLCBQcm9taXNlLnJlc29sdmUoKS50aGVuKG5leHQpO1xuICAgICAgICBpZiAoci5kaXNwb3NlKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHIuZGlzcG9zZS5jYWxsKHIudmFsdWUpO1xuICAgICAgICAgIGlmIChyLmFzeW5jKSByZXR1cm4gcyB8PSAyLCBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBzIHw9IDE7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICBmYWlsKGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocyA9PT0gMSkgcmV0dXJuIGVudi5oYXNFcnJvciA/IFByb21pc2UucmVqZWN0KGVudi5lcnJvcikgOiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XG4gIH1cbiAgcmV0dXJuIG5leHQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uKHBhdGgsIHByZXNlcnZlSnN4KSB7XG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiAmJiAvXlxcLlxcLj9cXC8vLnRlc3QocGF0aCkpIHtcbiAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcLih0c3gpJHwoKD86XFwuZCk/KSgoPzpcXC5bXi4vXSs/KT8pXFwuKFtjbV0/KXRzJC9pLCBmdW5jdGlvbiAobSwgdHN4LCBkLCBleHQsIGNtKSB7XG4gICAgICAgICAgcmV0dXJuIHRzeCA/IHByZXNlcnZlSnN4ID8gXCIuanN4XCIgOiBcIi5qc1wiIDogZCAmJiAoIWV4dCB8fCAhY20pID8gbSA6IChkICsgZXh0ICsgXCIuXCIgKyBjbS50b0xvd2VyQ2FzZSgpICsgXCJqc1wiKTtcbiAgICAgIH0pO1xuICB9XG4gIHJldHVybiBwYXRoO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIF9fZXh0ZW5kcyxcbiAgX19hc3NpZ24sXG4gIF9fcmVzdCxcbiAgX19kZWNvcmF0ZSxcbiAgX19wYXJhbSxcbiAgX19lc0RlY29yYXRlLFxuICBfX3J1bkluaXRpYWxpemVycyxcbiAgX19wcm9wS2V5LFxuICBfX3NldEZ1bmN0aW9uTmFtZSxcbiAgX19tZXRhZGF0YSxcbiAgX19hd2FpdGVyLFxuICBfX2dlbmVyYXRvcixcbiAgX19jcmVhdGVCaW5kaW5nLFxuICBfX2V4cG9ydFN0YXIsXG4gIF9fdmFsdWVzLFxuICBfX3JlYWQsXG4gIF9fc3ByZWFkLFxuICBfX3NwcmVhZEFycmF5cyxcbiAgX19zcHJlYWRBcnJheSxcbiAgX19hd2FpdCxcbiAgX19hc3luY0dlbmVyYXRvcixcbiAgX19hc3luY0RlbGVnYXRvcixcbiAgX19hc3luY1ZhbHVlcyxcbiAgX19tYWtlVGVtcGxhdGVPYmplY3QsXG4gIF9faW1wb3J0U3RhcixcbiAgX19pbXBvcnREZWZhdWx0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4sXG4gIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxuICBfX2Rpc3Bvc2VSZXNvdXJjZXMsXG4gIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIHBvc3RQcm9jZXNzIGZyb20gXCJAbHRzL3Bvc3QtcHJvY2Vzc2VzL2xlZ2FjeS9sZWdhY3lcIjtcclxuZXhwb3J0IHsgcG9zdFByb2Nlc3MgfTtcclxuZXhwb3J0IGRlZmF1bHQgcG9zdFByb2Nlc3M7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==