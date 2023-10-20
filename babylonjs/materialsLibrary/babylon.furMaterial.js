(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-materials", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-materials"] = factory(require("babylonjs"));
	else
		root["MATERIALS"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Materials_effect__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/materials/src/fur/fur.fragment.ts":
/*!******************************************************!*\
  !*** ../../../dev/materials/src/fur/fur.fragment.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   furPixelShader: () => (/* binding */ furPixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Shaders/ShadersInclude/imageProcessingCompatibility */ "babylonjs/Materials/effect");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.













var name = "furPixelShader";
var shader = "precision highp float;uniform vec4 vEyePosition;uniform vec4 vDiffuseColor;uniform vec4 furColor;uniform float furLength;varying vec3 vPositionW;varying float vfur_length;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<helperFunctions>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;uniform sampler2D diffuseSampler;uniform vec2 vDiffuseInfos;\n#endif\n#ifdef HIGHLEVEL\nuniform float furOffset;uniform float furOcclusion;uniform sampler2D furTexture;varying vec2 vFurUV;\n#endif\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#include<fogFragmentDeclaration>\n#include<clipPlaneFragmentDeclaration>\nfloat Rand(vec3 rv) {float x=dot(rv,vec3(12.9898,78.233,24.65487));return fract(sin(x)*43758.5453);}\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_FRAGMENT_MAIN_BEGIN\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);vec4 baseColor=furColor;vec3 diffuseColor=vDiffuseColor.rgb;float alpha=vDiffuseColor.a;\n#ifdef DIFFUSE\nbaseColor*=texture2D(diffuseSampler,vDiffuseUV);\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\nbaseColor.rgb*=vDiffuseInfos.y;\n#endif\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n#ifdef HIGHLEVEL\nvec4 furTextureColor=texture2D(furTexture,vec2(vFurUV.x,vFurUV.y));if (furTextureColor.a<=0.0 || furTextureColor.g<furOffset) {discard;}\nfloat occlusion=mix(0.0,furTextureColor.b*1.2,furOffset);baseColor=vec4(baseColor.xyz*max(occlusion,furOcclusion),1.1-furOffset);\n#endif\nvec3 diffuseBase=vec3(0.,0.,0.);lightingInfo info;float shadow=1.;float glossiness=0.;float aggShadow=0.;float numLights=0.;\n#ifdef SPECULARTERM\nvec3 specularBase=vec3(0.,0.,0.);\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\n#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)\nalpha*=vColor.a;\n#endif\nvec3 finalDiffuse=clamp(diffuseBase.rgb*baseColor.rgb,0.0,1.0);\n#ifdef HIGHLEVEL\nvec4 color=vec4(finalDiffuse,alpha);\n#else\nfloat r=vfur_length/furLength*0.5;vec4 color=vec4(finalDiffuse*(0.5+r),alpha);\n#endif\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n#define CUSTOM_FRAGMENT_MAIN_END\n}";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var furPixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/materials/src/fur/fur.vertex.ts":
/*!****************************************************!*\
  !*** ../../../dev/materials/src/fur/fur.vertex.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   furVertexShader: () => (/* binding */ furVertexShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Shaders/ShadersInclude/vertexColorMixing */ "babylonjs/Materials/effect");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.















var name = "furVertexShader";
var shader = "precision highp float;attribute vec3 position;attribute vec3 normal;\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n#include<bakedVertexAnimationDeclaration>\nuniform float furLength;uniform float furAngle;\n#ifdef HIGHLEVEL\nuniform float furOffset;uniform vec3 furGravity;uniform float furTime;uniform float furSpacing;uniform float furDensity;\n#endif\n#ifdef HEIGHTMAP\nuniform sampler2D heightTexture;\n#endif\n#ifdef HIGHLEVEL\nvarying vec2 vFurUV;\n#endif\n#include<instancesDeclaration>\nuniform mat4 view;uniform mat4 viewProjection;\n#ifdef DIFFUSE\nvarying vec2 vDiffuseUV;uniform mat4 diffuseMatrix;uniform vec2 vDiffuseInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\nvarying float vfur_length;\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nfloat Rand(vec3 rv) {float x=dot(rv,vec3(12.9898,78.233,24.65487));return fract(sin(x)*43758.5453);}\n#define CUSTOM_VERTEX_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_VERTEX_MAIN_BEGIN\n#include<instancesVertex>\n#include<bonesVertex>\n#include<bakedVertexAnimation>\nfloat r=Rand(position);\n#ifdef HEIGHTMAP\n#if __VERSION__>100\nvfur_length=furLength*texture(heightTexture,uv).x;\n#else\nvfur_length=furLength*texture2D(heightTexture,uv).r;\n#endif\n#else \nvfur_length=(furLength*r);\n#endif\nvec3 tangent1=vec3(normal.y,-normal.x,0);vec3 tangent2=vec3(-normal.z,0,normal.x);r=Rand(tangent1*r);float J=(2.0+4.0*r);r=Rand(tangent2*r);float K=(2.0+2.0*r);tangent1=tangent1*J+tangent2*K;tangent1=normalize(tangent1);vec3 newPosition=position+normal*vfur_length*cos(furAngle)+tangent1*vfur_length*sin(furAngle);\n#ifdef HIGHLEVEL\nvec3 forceDirection=vec3(0.0,0.0,0.0);forceDirection.x=sin(furTime+position.x*0.05)*0.2;forceDirection.y=cos(furTime*0.7+position.y*0.04)*0.2;forceDirection.z=sin(furTime*0.7+position.z*0.04)*0.2;vec3 displacement=vec3(0.0,0.0,0.0);displacement=furGravity+forceDirection;float displacementFactor=pow(furOffset,3.0);vec3 aNormal=normal;aNormal.xyz+=displacement*displacementFactor;newPosition=vec3(newPosition.x,newPosition.y,newPosition.z)+(normalize(aNormal)*furOffset*furSpacing);\n#endif\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\ngl_Position=viewProjection*finalWorld*vec4(newPosition,1.0);vec4 worldPos=finalWorld*vec4(newPosition,1.0);vPositionW=vec3(worldPos);\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef DIFFUSE\nif (vDiffuseInfos.x==0.)\n{vDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));}\nelse\n{vDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));}\n#ifdef HIGHLEVEL\nvFurUV=vDiffuseUV*furDensity;\n#endif\n#else\n#ifdef HIGHLEVEL\nvFurUV=uv*furDensity;\n#endif\n#endif\n#include<clipPlaneVertex>\n#include<fogVertex>\n#include<shadowsVertex>[0..maxSimultaneousLights]\n#include<vertexColorMixing>\n#if defined(POINTSIZE) && !defined(WEBGPU)\ngl_PointSize=pointSize;\n#endif\n#define CUSTOM_VERTEX_MAIN_END\n}\n";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var furVertexShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/materials/src/fur/furMaterial.ts":
/*!*****************************************************!*\
  !*** ../../../dev/materials/src/fur/furMaterial.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FurMaterial: () => (/* binding */ FurMaterial)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/clipPlaneMaterialHelper */ "babylonjs/Materials/effect");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fur_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fur.fragment */ "../../../dev/materials/src/fur/fur.fragment.ts");
/* harmony import */ var _fur_vertex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fur.vertex */ "../../../dev/materials/src/fur/fur.vertex.ts");


















var FurMaterialDefines = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__extends)(FurMaterialDefines, _super);
    function FurMaterialDefines() {
        var _this = _super.call(this) || this;
        _this.DIFFUSE = false;
        _this.HEIGHTMAP = false;
        _this.CLIPPLANE = false;
        _this.CLIPPLANE2 = false;
        _this.CLIPPLANE3 = false;
        _this.CLIPPLANE4 = false;
        _this.CLIPPLANE5 = false;
        _this.CLIPPLANE6 = false;
        _this.ALPHATEST = false;
        _this.DEPTHPREPASS = false;
        _this.POINTSIZE = false;
        _this.FOG = false;
        _this.NORMAL = false;
        _this.UV1 = false;
        _this.UV2 = false;
        _this.VERTEXCOLOR = false;
        _this.VERTEXALPHA = false;
        _this.NUM_BONE_INFLUENCERS = 0;
        _this.BonesPerMesh = 0;
        _this.INSTANCES = false;
        _this.INSTANCESCOLOR = false;
        _this.HIGHLEVEL = false;
        _this.IMAGEPROCESSINGPOSTPROCESS = false;
        _this.SKIPFINALCOLORCLAMP = false;
        _this.rebuild();
        return _this;
    }
    return FurMaterialDefines;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialDefines));
var FurMaterial = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__extends)(FurMaterial, _super);
    function FurMaterial(name, scene) {
        var _this = _super.call(this, name, scene) || this;
        _this.diffuseColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(1, 1, 1);
        _this.furLength = 1;
        _this.furAngle = 0;
        _this.furColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.44, 0.21, 0.02);
        _this.furOffset = 0.0;
        _this.furSpacing = 12;
        _this.furGravity = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0);
        _this.furSpeed = 100;
        _this.furDensity = 20;
        _this.furOcclusion = 0.0;
        _this._disableLighting = false;
        _this._maxSimultaneousLights = 4;
        _this.highLevelFur = true;
        _this._furTime = 0;
        return _this;
    }
    Object.defineProperty(FurMaterial.prototype, "furTime", {
        get: function () {
            return this._furTime;
        },
        set: function (furTime) {
            this._furTime = furTime;
        },
        enumerable: false,
        configurable: true
    });
    FurMaterial.prototype.needAlphaBlending = function () {
        return this.alpha < 1.0;
    };
    FurMaterial.prototype.needAlphaTesting = function () {
        return false;
    };
    FurMaterial.prototype.getAlphaTestTexture = function () {
        return null;
    };
    FurMaterial.prototype.updateFur = function () {
        for (var i = 1; i < this._meshes.length; i++) {
            var offsetFur = this._meshes[i].material;
            offsetFur.furLength = this.furLength;
            offsetFur.furAngle = this.furAngle;
            offsetFur.furGravity = this.furGravity;
            offsetFur.furSpacing = this.furSpacing;
            offsetFur.furSpeed = this.furSpeed;
            offsetFur.furColor = this.furColor;
            offsetFur.diffuseTexture = this.diffuseTexture;
            offsetFur.furTexture = this.furTexture;
            offsetFur.highLevelFur = this.highLevelFur;
            offsetFur.furTime = this.furTime;
            offsetFur.furDensity = this.furDensity;
        }
    };
    // Methods
    FurMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
        if (this.isFrozen) {
            if (subMesh.effect && subMesh.effect._wasPreviouslyReady && subMesh.effect._wasPreviouslyUsingInstances === useInstances) {
                return true;
            }
        }
        if (!subMesh.materialDefines) {
            subMesh.materialDefines = new FurMaterialDefines();
        }
        var defines = subMesh.materialDefines;
        var scene = this.getScene();
        if (this._isReadyForSubMesh(subMesh)) {
            return true;
        }
        var engine = scene.getEngine();
        // Textures
        if (defines._areTexturesDirty) {
            if (scene.texturesEnabled) {
                if (this.diffuseTexture && babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialFlags.DiffuseTextureEnabled) {
                    if (!this.diffuseTexture.isReady()) {
                        return false;
                    }
                    else {
                        defines._needUVs = true;
                        defines.DIFFUSE = true;
                    }
                }
                if (this.heightTexture && engine.getCaps().maxVertexTextureImageUnits) {
                    if (!this.heightTexture.isReady()) {
                        return false;
                    }
                    else {
                        defines._needUVs = true;
                        defines.HEIGHTMAP = true;
                    }
                }
            }
        }
        // High level
        if (this.highLevelFur !== defines.HIGHLEVEL) {
            defines.HIGHLEVEL = true;
            defines.markAsUnprocessed();
        }
        // Misc.
        babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialHelper.PrepareDefinesForMisc(mesh, scene, false, this.pointsCloud, this.fogEnabled, this._shouldTurnAlphaTestOn(mesh), defines);
        // Lights
        defines._needNormals = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialHelper.PrepareDefinesForLights(scene, mesh, defines, false, this._maxSimultaneousLights, this._disableLighting);
        // Values that need to be evaluated on every frame
        babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialHelper.PrepareDefinesForFrameBoundValues(scene, engine, this, defines, useInstances ? true : false);
        // Attribs
        babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialHelper.PrepareDefinesForAttributes(mesh, defines, true, true);
        // Get correct effect
        if (defines.isDirty) {
            defines.markAsProcessed();
            scene.resetCachedMaterial();
            // Fallbacks
            var fallbacks = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.EffectFallbacks();
            if (defines.FOG) {
                fallbacks.addFallback(1, "FOG");
            }
            babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialHelper.HandleFallbacksForShadows(defines, fallbacks, this.maxSimultaneousLights);
            if (defines.NUM_BONE_INFLUENCERS > 0) {
                fallbacks.addCPUSkinningFallback(0, mesh);
            }
            defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess;
            //Attributes
            var attribs = [babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind];
            if (defines.NORMAL) {
                attribs.push(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind);
            }
            if (defines.UV1) {
                attribs.push(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind);
            }
            if (defines.UV2) {
                attribs.push(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind);
            }
            if (defines.VERTEXCOLOR) {
                attribs.push(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind);
            }
            babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialHelper.PrepareAttributesForBones(attribs, mesh, defines, fallbacks);
            babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialHelper.PrepareAttributesForInstances(attribs, defines);
            // Legacy browser patch
            var shaderName = "fur";
            var join = defines.toString();
            var uniforms = [
                "world",
                "view",
                "viewProjection",
                "vEyePosition",
                "vLightsType",
                "vDiffuseColor",
                "vFogInfos",
                "vFogColor",
                "pointSize",
                "vDiffuseInfos",
                "mBones",
                "diffuseMatrix",
                "furLength",
                "furAngle",
                "furColor",
                "furOffset",
                "furGravity",
                "furTime",
                "furSpacing",
                "furDensity",
                "furOcclusion",
            ];
            (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.addClipPlaneUniforms)(uniforms);
            var samplers = ["diffuseSampler", "heightTexture", "furTexture"];
            var uniformBuffers = new Array();
            babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialHelper.PrepareUniformsAndSamplersList({
                uniformsNames: uniforms,
                uniformBuffersNames: uniformBuffers,
                samplers: samplers,
                defines: defines,
                maxSimultaneousLights: this.maxSimultaneousLights,
            });
            subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
                attributes: attribs,
                uniformsNames: uniforms,
                uniformBuffersNames: uniformBuffers,
                samplers: samplers,
                defines: join,
                fallbacks: fallbacks,
                onCompiled: this.onCompiled,
                onError: this.onError,
                indexParameters: { maxSimultaneousLights: this.maxSimultaneousLights },
            }, engine), defines, this._materialContext);
        }
        if (!subMesh.effect || !subMesh.effect.isReady()) {
            return false;
        }
        defines._renderId = scene.getRenderId();
        subMesh.effect._wasPreviouslyReady = true;
        subMesh.effect._wasPreviouslyUsingInstances = !!useInstances;
        return true;
    };
    FurMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
        var scene = this.getScene();
        var defines = subMesh.materialDefines;
        if (!defines) {
            return;
        }
        var effect = subMesh.effect;
        if (!effect) {
            return;
        }
        this._activeEffect = effect;
        // Matrices
        this.bindOnlyWorldMatrix(world);
        this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix());
        // Bones
        babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialHelper.BindBonesParameters(mesh, this._activeEffect);
        if (scene.getCachedMaterial() !== this) {
            // Textures
            if (this._diffuseTexture && babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialFlags.DiffuseTextureEnabled) {
                this._activeEffect.setTexture("diffuseSampler", this._diffuseTexture);
                this._activeEffect.setFloat2("vDiffuseInfos", this._diffuseTexture.coordinatesIndex, this._diffuseTexture.level);
                this._activeEffect.setMatrix("diffuseMatrix", this._diffuseTexture.getTextureMatrix());
            }
            if (this._heightTexture) {
                this._activeEffect.setTexture("heightTexture", this._heightTexture);
            }
            // Clip plane
            (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.bindClipPlane)(this._activeEffect, this, scene);
            // Point size
            if (this.pointsCloud) {
                this._activeEffect.setFloat("pointSize", this.pointSize);
            }
            scene.bindEyePosition(effect);
        }
        this._activeEffect.setColor4("vDiffuseColor", this.diffuseColor, this.alpha * mesh.visibility);
        if (scene.lightsEnabled && !this.disableLighting) {
            babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialHelper.BindLights(scene, mesh, this._activeEffect, defines, this.maxSimultaneousLights);
        }
        // View
        if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Scene.FOGMODE_NONE) {
            this._activeEffect.setMatrix("view", scene.getViewMatrix());
        }
        // Fog
        babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialHelper.BindFogParameters(scene, mesh, this._activeEffect);
        this._activeEffect.setFloat("furLength", this.furLength);
        this._activeEffect.setFloat("furAngle", this.furAngle);
        this._activeEffect.setColor4("furColor", this.furColor, 1.0);
        if (this.highLevelFur) {
            this._activeEffect.setVector3("furGravity", this.furGravity);
            this._activeEffect.setFloat("furOffset", this.furOffset);
            this._activeEffect.setFloat("furSpacing", this.furSpacing);
            this._activeEffect.setFloat("furDensity", this.furDensity);
            this._activeEffect.setFloat("furOcclusion", this.furOcclusion);
            this._furTime += this.getScene().getEngine().getDeltaTime() / this.furSpeed;
            this._activeEffect.setFloat("furTime", this._furTime);
            this._activeEffect.setTexture("furTexture", this.furTexture);
        }
        this._afterBind(mesh, this._activeEffect);
    };
    FurMaterial.prototype.getAnimatables = function () {
        var results = [];
        if (this.diffuseTexture && this.diffuseTexture.animations && this.diffuseTexture.animations.length > 0) {
            results.push(this.diffuseTexture);
        }
        if (this.heightTexture && this.heightTexture.animations && this.heightTexture.animations.length > 0) {
            results.push(this.heightTexture);
        }
        return results;
    };
    FurMaterial.prototype.getActiveTextures = function () {
        var activeTextures = _super.prototype.getActiveTextures.call(this);
        if (this._diffuseTexture) {
            activeTextures.push(this._diffuseTexture);
        }
        if (this._heightTexture) {
            activeTextures.push(this._heightTexture);
        }
        return activeTextures;
    };
    FurMaterial.prototype.hasTexture = function (texture) {
        if (_super.prototype.hasTexture.call(this, texture)) {
            return true;
        }
        if (this.diffuseTexture === texture) {
            return true;
        }
        if (this._heightTexture === texture) {
            return true;
        }
        return false;
    };
    FurMaterial.prototype.dispose = function (forceDisposeEffect) {
        if (this.diffuseTexture) {
            this.diffuseTexture.dispose();
        }
        if (this._meshes) {
            for (var i = 1; i < this._meshes.length; i++) {
                var mat = this._meshes[i].material;
                if (mat) {
                    mat.dispose(forceDisposeEffect);
                }
                this._meshes[i].dispose();
            }
        }
        _super.prototype.dispose.call(this, forceDisposeEffect);
    };
    FurMaterial.prototype.clone = function (name) {
        var _this = this;
        return babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Clone(function () { return new FurMaterial(name, _this.getScene()); }, this);
    };
    FurMaterial.prototype.serialize = function () {
        var serializationObject = _super.prototype.serialize.call(this);
        serializationObject.customType = "BABYLON.FurMaterial";
        if (this._meshes) {
            serializationObject.sourceMeshName = this._meshes[0].name;
            serializationObject.quality = this._meshes.length;
        }
        return serializationObject;
    };
    FurMaterial.prototype.getClassName = function () {
        return "FurMaterial";
    };
    // Statics
    FurMaterial.Parse = function (source, scene, rootUrl) {
        var material = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new FurMaterial(source.name, scene); }, source, scene, rootUrl);
        if (source.sourceMeshName && material.highLevelFur) {
            scene.executeWhenReady(function () {
                var sourceMesh = scene.getMeshByName(source.sourceMeshName);
                if (sourceMesh) {
                    var furTexture = FurMaterial.GenerateTexture("Fur Texture", scene);
                    material.furTexture = furTexture;
                    FurMaterial.FurifyMesh(sourceMesh, source.quality);
                }
            });
        }
        return material;
    };
    FurMaterial.GenerateTexture = function (name, scene) {
        // Generate fur textures
        var texture = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.DynamicTexture("FurTexture " + name, 256, scene, true);
        var context = texture.getContext();
        for (var i = 0; i < 20000; ++i) {
            context.fillStyle = "rgba(255, " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", 1)";
            context.fillRect(Math.random() * texture.getSize().width, Math.random() * texture.getSize().height, 2, 2);
        }
        texture.update(false);
        texture.wrapU = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Texture.WRAP_ADDRESSMODE;
        texture.wrapV = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Texture.WRAP_ADDRESSMODE;
        return texture;
    };
    // Creates and returns an array of meshes used as shells for the Fur Material
    // that can be disposed later in your code
    // The quality is in interval [0, 100]
    FurMaterial.FurifyMesh = function (sourceMesh, quality) {
        var meshes = [sourceMesh];
        var mat = sourceMesh.material;
        var i;
        if (!(mat instanceof FurMaterial)) {
            throw "The material of the source mesh must be a Fur Material";
        }
        for (i = 1; i < quality; i++) {
            var offsetFur = new FurMaterial(mat.name + i, sourceMesh.getScene());
            sourceMesh.getScene().materials.pop();
            babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Tags.EnableFor(offsetFur);
            babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Tags.AddTagsTo(offsetFur, "furShellMaterial");
            offsetFur.furLength = mat.furLength;
            offsetFur.furAngle = mat.furAngle;
            offsetFur.furGravity = mat.furGravity;
            offsetFur.furSpacing = mat.furSpacing;
            offsetFur.furSpeed = mat.furSpeed;
            offsetFur.furColor = mat.furColor;
            offsetFur.diffuseTexture = mat.diffuseTexture;
            offsetFur.furOffset = i / quality;
            offsetFur.furTexture = mat.furTexture;
            offsetFur.highLevelFur = mat.highLevelFur;
            offsetFur.furTime = mat.furTime;
            offsetFur.furDensity = mat.furDensity;
            var offsetMesh = sourceMesh.clone(sourceMesh.name + i);
            offsetMesh.material = offsetFur;
            offsetMesh.skeleton = sourceMesh.skeleton;
            offsetMesh.position = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero();
            meshes.push(offsetMesh);
        }
        for (i = 1; i < meshes.length; i++) {
            meshes[i].parent = sourceMesh;
        }
        sourceMesh.material._meshes = meshes;
        return meshes;
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)("diffuseTexture")
    ], FurMaterial.prototype, "_diffuseTexture", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)("_markAllSubMeshesAsTexturesDirty")
    ], FurMaterial.prototype, "diffuseTexture", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)("heightTexture")
    ], FurMaterial.prototype, "_heightTexture", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)("_markAllSubMeshesAsTexturesDirty")
    ], FurMaterial.prototype, "heightTexture", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)()
    ], FurMaterial.prototype, "diffuseColor", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], FurMaterial.prototype, "furLength", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], FurMaterial.prototype, "furAngle", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)()
    ], FurMaterial.prototype, "furColor", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], FurMaterial.prototype, "furOffset", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], FurMaterial.prototype, "furSpacing", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsVector3)()
    ], FurMaterial.prototype, "furGravity", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], FurMaterial.prototype, "furSpeed", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], FurMaterial.prototype, "furDensity", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], FurMaterial.prototype, "furOcclusion", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)("disableLighting")
    ], FurMaterial.prototype, "_disableLighting", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)("_markAllSubMeshesAsLightsDirty")
    ], FurMaterial.prototype, "disableLighting", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)("maxSimultaneousLights")
    ], FurMaterial.prototype, "_maxSimultaneousLights", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)("_markAllSubMeshesAsLightsDirty")
    ], FurMaterial.prototype, "maxSimultaneousLights", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], FurMaterial.prototype, "highLevelFur", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], FurMaterial.prototype, "furTime", null);
    return FurMaterial;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PushMaterial));
(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.FurMaterial", FurMaterial);


/***/ }),

/***/ "../../../dev/materials/src/fur/index.ts":
/*!***********************************************!*\
  !*** ../../../dev/materials/src/fur/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FurMaterial: () => (/* reexport safe */ _furMaterial__WEBPACK_IMPORTED_MODULE_0__.FurMaterial)
/* harmony export */ });
/* harmony import */ var _furMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./furMaterial */ "../../../dev/materials/src/fur/furMaterial.ts");



/***/ }),

/***/ "../../../lts/materials/src/legacy/legacy-fur.ts":
/*!*******************************************************!*\
  !*** ../../../lts/materials/src/legacy/legacy-fur.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FurMaterial: () => (/* reexport safe */ materials_fur_index__WEBPACK_IMPORTED_MODULE_0__.FurMaterial)
/* harmony export */ });
/* harmony import */ var materials_fur_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! materials/fur/index */ "../../../dev/materials/src/fur/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var key in materials_fur_index__WEBPACK_IMPORTED_MODULE_0__) {
        globalObject.BABYLON[key] = materials_fur_index__WEBPACK_IMPORTED_MODULE_0__[key];
    }
}



/***/ }),

/***/ "babylonjs/Materials/effect":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Materials_effect__;

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
/* global Reflect, Promise, SuppressedError, Symbol */

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
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
  function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
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

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
    var dispose;
    if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
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
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/fur.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   materials: () => (/* reexport module object */ _lts_materials_legacy_legacy_fur__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_materials_legacy_legacy_fur__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/materials/legacy/legacy-fur */ "../../../lts/materials/src/legacy/legacy-fur.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_materials_legacy_legacy_fur__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5mdXJNYXRlcmlhbC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFpRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQStGQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEhBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBMEJBO0FBQUE7QUF6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7O0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQTREQTtBQUFBO0FBaERBO0FBR0E7QUFHQTtBQUdBO0FBR0E7QUFHQTtBQUdBO0FBR0E7QUFHQTtBQUdBO0FBS0E7QUFLQTtBQUtBO0FBSUE7O0FBSUE7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7O0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQXJnQkE7QUFEQTtBQUNBO0FBRUE7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBRUE7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBS0E7QUFEQTtBQUNBO0FBRUE7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBRUE7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBV0E7QUFEQTtBQUdBO0FBcWNBO0FBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RrQkE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7O0FDZEE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDalhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL01BVEVSSUFMUy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vTUFURVJJQUxTLy4uLy4uLy4uL2Rldi9tYXRlcmlhbHMvc3JjL2Z1ci9mdXIuZnJhZ21lbnQudHMiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTLy4uLy4uLy4uL2Rldi9tYXRlcmlhbHMvc3JjL2Z1ci9mdXIudmVydGV4LnRzIiwid2VicGFjazovL01BVEVSSUFMUy8uLi8uLi8uLi9kZXYvbWF0ZXJpYWxzL3NyYy9mdXIvZnVyTWF0ZXJpYWwudHMiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTLy4uLy4uLy4uL2Rldi9tYXRlcmlhbHMvc3JjL2Z1ci9pbmRleC50cyIsIndlYnBhY2s6Ly9NQVRFUklBTFMvLi4vLi4vLi4vbHRzL21hdGVyaWFscy9zcmMvbGVnYWN5L2xlZ2FjeS1mdXIudHMiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTL2V4dGVybmFsIHVtZCB7XCJyb290XCI6XCJCQUJZTE9OXCIsXCJjb21tb25qc1wiOlwiYmFieWxvbmpzXCIsXCJjb21tb25qczJcIjpcImJhYnlsb25qc1wiLFwiYW1kXCI6XCJiYWJ5bG9uanNcIn0iLCJ3ZWJwYWNrOi8vTUFURVJJQUxTLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYubWpzIiwid2VicGFjazovL01BVEVSSUFMUy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9NQVRFUklBTFMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9NQVRFUklBTFMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9NQVRFUklBTFMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9NQVRFUklBTFMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9NQVRFUklBTFMvLi9zcmMvZnVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImJhYnlsb25qcy1tYXRlcmlhbHNcIiwgW1wiYmFieWxvbmpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJhYnlsb25qcy1tYXRlcmlhbHNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWJ5bG9uanNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIk1BVEVSSUFMU1wiXSA9IGZhY3Rvcnkocm9vdFtcIkJBQllMT05cIl0pO1xufSkoKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0aGlzKSwgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01hdGVyaWFsc19lZmZlY3RfXykgPT4ge1xucmV0dXJuICIsIi8vIERvIG5vdCBlZGl0LlxuaW1wb3J0IHsgU2hhZGVyU3RvcmUgfSBmcm9tIFwiY29yZS9FbmdpbmVzL3NoYWRlclN0b3JlXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvaGVscGVyRnVuY3Rpb25zXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvbGlnaHRGcmFnbWVudERlY2xhcmF0aW9uXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvbGlnaHRVYm9EZWNsYXJhdGlvblwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2xpZ2h0c0ZyYWdtZW50RnVuY3Rpb25zXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvc2hhZG93c0ZyYWdtZW50RnVuY3Rpb25zXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvZm9nRnJhZ21lbnREZWNsYXJhdGlvblwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2NsaXBQbGFuZUZyYWdtZW50RGVjbGFyYXRpb25cIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9jbGlwUGxhbmVGcmFnbWVudFwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2RlcHRoUHJlUGFzc1wiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2xpZ2h0RnJhZ21lbnRcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9mb2dGcmFnbWVudFwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2ltYWdlUHJvY2Vzc2luZ0NvbXBhdGliaWxpdHlcIjtcblxuY29uc3QgbmFtZSA9IFwiZnVyUGl4ZWxTaGFkZXJcIjtcbmNvbnN0IHNoYWRlciA9IGBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7dW5pZm9ybSB2ZWM0IHZFeWVQb3NpdGlvbjt1bmlmb3JtIHZlYzQgdkRpZmZ1c2VDb2xvcjt1bmlmb3JtIHZlYzQgZnVyQ29sb3I7dW5pZm9ybSBmbG9hdCBmdXJMZW5ndGg7dmFyeWluZyB2ZWMzIHZQb3NpdGlvblc7dmFyeWluZyBmbG9hdCB2ZnVyX2xlbmd0aDtcbiNpZmRlZiBOT1JNQUxcbnZhcnlpbmcgdmVjMyB2Tm9ybWFsVztcbiNlbmRpZlxuI2lmZGVmIFZFUlRFWENPTE9SXG52YXJ5aW5nIHZlYzQgdkNvbG9yO1xuI2VuZGlmXG4jaW5jbHVkZTxoZWxwZXJGdW5jdGlvbnM+XG4jaW5jbHVkZTxfX2RlY2xfX2xpZ2h0RnJhZ21lbnQ+WzAuLm1heFNpbXVsdGFuZW91c0xpZ2h0c11cbiNpZmRlZiBESUZGVVNFXG52YXJ5aW5nIHZlYzIgdkRpZmZ1c2VVVjt1bmlmb3JtIHNhbXBsZXIyRCBkaWZmdXNlU2FtcGxlcjt1bmlmb3JtIHZlYzIgdkRpZmZ1c2VJbmZvcztcbiNlbmRpZlxuI2lmZGVmIEhJR0hMRVZFTFxudW5pZm9ybSBmbG9hdCBmdXJPZmZzZXQ7dW5pZm9ybSBmbG9hdCBmdXJPY2NsdXNpb247dW5pZm9ybSBzYW1wbGVyMkQgZnVyVGV4dHVyZTt2YXJ5aW5nIHZlYzIgdkZ1clVWO1xuI2VuZGlmXG4jaW5jbHVkZTxsaWdodHNGcmFnbWVudEZ1bmN0aW9ucz5cbiNpbmNsdWRlPHNoYWRvd3NGcmFnbWVudEZ1bmN0aW9ucz5cbiNpbmNsdWRlPGZvZ0ZyYWdtZW50RGVjbGFyYXRpb24+XG4jaW5jbHVkZTxjbGlwUGxhbmVGcmFnbWVudERlY2xhcmF0aW9uPlxuZmxvYXQgUmFuZCh2ZWMzIHJ2KSB7ZmxvYXQgeD1kb3QocnYsdmVjMygxMi45ODk4LDc4LjIzMywyNC42NTQ4NykpO3JldHVybiBmcmFjdChzaW4oeCkqNDM3NTguNTQ1Myk7fVxuI2RlZmluZSBDVVNUT01fRlJBR01FTlRfREVGSU5JVElPTlNcbnZvaWQgbWFpbih2b2lkKSB7XG4jZGVmaW5lIENVU1RPTV9GUkFHTUVOVF9NQUlOX0JFR0lOXG4jaW5jbHVkZTxjbGlwUGxhbmVGcmFnbWVudD5cbnZlYzMgdmlld0RpcmVjdGlvblc9bm9ybWFsaXplKHZFeWVQb3NpdGlvbi54eXotdlBvc2l0aW9uVyk7dmVjNCBiYXNlQ29sb3I9ZnVyQ29sb3I7dmVjMyBkaWZmdXNlQ29sb3I9dkRpZmZ1c2VDb2xvci5yZ2I7ZmxvYXQgYWxwaGE9dkRpZmZ1c2VDb2xvci5hO1xuI2lmZGVmIERJRkZVU0VcbmJhc2VDb2xvcio9dGV4dHVyZTJEKGRpZmZ1c2VTYW1wbGVyLHZEaWZmdXNlVVYpO1xuI2lmZGVmIEFMUEhBVEVTVFxuaWYgKGJhc2VDb2xvci5hPDAuNClcbmRpc2NhcmQ7XG4jZW5kaWZcbiNpbmNsdWRlPGRlcHRoUHJlUGFzcz5cbmJhc2VDb2xvci5yZ2IqPXZEaWZmdXNlSW5mb3MueTtcbiNlbmRpZlxuI2lmZGVmIFZFUlRFWENPTE9SXG5iYXNlQ29sb3IucmdiKj12Q29sb3IucmdiO1xuI2VuZGlmXG4jaWZkZWYgTk9STUFMXG52ZWMzIG5vcm1hbFc9bm9ybWFsaXplKHZOb3JtYWxXKTtcbiNlbHNlXG52ZWMzIG5vcm1hbFc9dmVjMygxLjAsMS4wLDEuMCk7XG4jZW5kaWZcbiNpZmRlZiBISUdITEVWRUxcbnZlYzQgZnVyVGV4dHVyZUNvbG9yPXRleHR1cmUyRChmdXJUZXh0dXJlLHZlYzIodkZ1clVWLngsdkZ1clVWLnkpKTtpZiAoZnVyVGV4dHVyZUNvbG9yLmE8PTAuMCB8fCBmdXJUZXh0dXJlQ29sb3IuZzxmdXJPZmZzZXQpIHtkaXNjYXJkO31cbmZsb2F0IG9jY2x1c2lvbj1taXgoMC4wLGZ1clRleHR1cmVDb2xvci5iKjEuMixmdXJPZmZzZXQpO2Jhc2VDb2xvcj12ZWM0KGJhc2VDb2xvci54eXoqbWF4KG9jY2x1c2lvbixmdXJPY2NsdXNpb24pLDEuMS1mdXJPZmZzZXQpO1xuI2VuZGlmXG52ZWMzIGRpZmZ1c2VCYXNlPXZlYzMoMC4sMC4sMC4pO2xpZ2h0aW5nSW5mbyBpbmZvO2Zsb2F0IHNoYWRvdz0xLjtmbG9hdCBnbG9zc2luZXNzPTAuO2Zsb2F0IGFnZ1NoYWRvdz0wLjtmbG9hdCBudW1MaWdodHM9MC47XG4jaWZkZWYgU1BFQ1VMQVJURVJNXG52ZWMzIHNwZWN1bGFyQmFzZT12ZWMzKDAuLDAuLDAuKTtcbiNlbmRpZlxuI2luY2x1ZGU8bGlnaHRGcmFnbWVudD5bMC4ubWF4U2ltdWx0YW5lb3VzTGlnaHRzXVxuI2lmIGRlZmluZWQoVkVSVEVYQUxQSEEpIHx8IGRlZmluZWQoSU5TVEFOQ0VTQ09MT1IpICYmIGRlZmluZWQoSU5TVEFOQ0VTKVxuYWxwaGEqPXZDb2xvci5hO1xuI2VuZGlmXG52ZWMzIGZpbmFsRGlmZnVzZT1jbGFtcChkaWZmdXNlQmFzZS5yZ2IqYmFzZUNvbG9yLnJnYiwwLjAsMS4wKTtcbiNpZmRlZiBISUdITEVWRUxcbnZlYzQgY29sb3I9dmVjNChmaW5hbERpZmZ1c2UsYWxwaGEpO1xuI2Vsc2VcbmZsb2F0IHI9dmZ1cl9sZW5ndGgvZnVyTGVuZ3RoKjAuNTt2ZWM0IGNvbG9yPXZlYzQoZmluYWxEaWZmdXNlKigwLjUrciksYWxwaGEpO1xuI2VuZGlmXG4jaW5jbHVkZTxmb2dGcmFnbWVudD5cbmdsX0ZyYWdDb2xvcj1jb2xvcjtcbiNpbmNsdWRlPGltYWdlUHJvY2Vzc2luZ0NvbXBhdGliaWxpdHk+XG4jZGVmaW5lIENVU1RPTV9GUkFHTUVOVF9NQUlOX0VORFxufWA7XG4vLyBTaWRlZWZmZWN0XG5TaGFkZXJTdG9yZS5TaGFkZXJzU3RvcmVbbmFtZV0gPSBzaGFkZXI7XG4vKiogQGludGVybmFsICovXG5leHBvcnQgY29uc3QgZnVyUGl4ZWxTaGFkZXIgPSB7IG5hbWUsIHNoYWRlciB9O1xuIiwiLy8gRG8gbm90IGVkaXQuXG5pbXBvcnQgeyBTaGFkZXJTdG9yZSB9IGZyb20gXCJjb3JlL0VuZ2luZXMvc2hhZGVyU3RvcmVcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9ib25lc0RlY2xhcmF0aW9uXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvYmFrZWRWZXJ0ZXhBbmltYXRpb25EZWNsYXJhdGlvblwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2luc3RhbmNlc0RlY2xhcmF0aW9uXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvY2xpcFBsYW5lVmVydGV4RGVjbGFyYXRpb25cIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9mb2dWZXJ0ZXhEZWNsYXJhdGlvblwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2xpZ2h0RnJhZ21lbnREZWNsYXJhdGlvblwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2xpZ2h0VWJvRGVjbGFyYXRpb25cIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9pbnN0YW5jZXNWZXJ0ZXhcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9ib25lc1ZlcnRleFwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2Jha2VkVmVydGV4QW5pbWF0aW9uXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvY2xpcFBsYW5lVmVydGV4XCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvZm9nVmVydGV4XCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvc2hhZG93c1ZlcnRleFwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL3ZlcnRleENvbG9yTWl4aW5nXCI7XG5cbmNvbnN0IG5hbWUgPSBcImZ1clZlcnRleFNoYWRlclwiO1xuY29uc3Qgc2hhZGVyID0gYHByZWNpc2lvbiBoaWdocCBmbG9hdDthdHRyaWJ1dGUgdmVjMyBwb3NpdGlvbjthdHRyaWJ1dGUgdmVjMyBub3JtYWw7XG4jaWZkZWYgVVYxXG5hdHRyaWJ1dGUgdmVjMiB1djtcbiNlbmRpZlxuI2lmZGVmIFVWMlxuYXR0cmlidXRlIHZlYzIgdXYyO1xuI2VuZGlmXG4jaWZkZWYgVkVSVEVYQ09MT1JcbmF0dHJpYnV0ZSB2ZWM0IGNvbG9yO1xuI2VuZGlmXG4jaW5jbHVkZTxib25lc0RlY2xhcmF0aW9uPlxuI2luY2x1ZGU8YmFrZWRWZXJ0ZXhBbmltYXRpb25EZWNsYXJhdGlvbj5cbnVuaWZvcm0gZmxvYXQgZnVyTGVuZ3RoO3VuaWZvcm0gZmxvYXQgZnVyQW5nbGU7XG4jaWZkZWYgSElHSExFVkVMXG51bmlmb3JtIGZsb2F0IGZ1ck9mZnNldDt1bmlmb3JtIHZlYzMgZnVyR3Jhdml0eTt1bmlmb3JtIGZsb2F0IGZ1clRpbWU7dW5pZm9ybSBmbG9hdCBmdXJTcGFjaW5nO3VuaWZvcm0gZmxvYXQgZnVyRGVuc2l0eTtcbiNlbmRpZlxuI2lmZGVmIEhFSUdIVE1BUFxudW5pZm9ybSBzYW1wbGVyMkQgaGVpZ2h0VGV4dHVyZTtcbiNlbmRpZlxuI2lmZGVmIEhJR0hMRVZFTFxudmFyeWluZyB2ZWMyIHZGdXJVVjtcbiNlbmRpZlxuI2luY2x1ZGU8aW5zdGFuY2VzRGVjbGFyYXRpb24+XG51bmlmb3JtIG1hdDQgdmlldzt1bmlmb3JtIG1hdDQgdmlld1Byb2plY3Rpb247XG4jaWZkZWYgRElGRlVTRVxudmFyeWluZyB2ZWMyIHZEaWZmdXNlVVY7dW5pZm9ybSBtYXQ0IGRpZmZ1c2VNYXRyaXg7dW5pZm9ybSB2ZWMyIHZEaWZmdXNlSW5mb3M7XG4jZW5kaWZcbiNpZmRlZiBQT0lOVFNJWkVcbnVuaWZvcm0gZmxvYXQgcG9pbnRTaXplO1xuI2VuZGlmXG52YXJ5aW5nIHZlYzMgdlBvc2l0aW9uVztcbiNpZmRlZiBOT1JNQUxcbnZhcnlpbmcgdmVjMyB2Tm9ybWFsVztcbiNlbmRpZlxudmFyeWluZyBmbG9hdCB2ZnVyX2xlbmd0aDtcbiNpZmRlZiBWRVJURVhDT0xPUlxudmFyeWluZyB2ZWM0IHZDb2xvcjtcbiNlbmRpZlxuI2luY2x1ZGU8Y2xpcFBsYW5lVmVydGV4RGVjbGFyYXRpb24+XG4jaW5jbHVkZTxmb2dWZXJ0ZXhEZWNsYXJhdGlvbj5cbiNpbmNsdWRlPF9fZGVjbF9fbGlnaHRGcmFnbWVudD5bMC4ubWF4U2ltdWx0YW5lb3VzTGlnaHRzXVxuZmxvYXQgUmFuZCh2ZWMzIHJ2KSB7ZmxvYXQgeD1kb3QocnYsdmVjMygxMi45ODk4LDc4LjIzMywyNC42NTQ4NykpO3JldHVybiBmcmFjdChzaW4oeCkqNDM3NTguNTQ1Myk7fVxuI2RlZmluZSBDVVNUT01fVkVSVEVYX0RFRklOSVRJT05TXG52b2lkIG1haW4odm9pZCkge1xuI2RlZmluZSBDVVNUT01fVkVSVEVYX01BSU5fQkVHSU5cbiNpbmNsdWRlPGluc3RhbmNlc1ZlcnRleD5cbiNpbmNsdWRlPGJvbmVzVmVydGV4PlxuI2luY2x1ZGU8YmFrZWRWZXJ0ZXhBbmltYXRpb24+XG5mbG9hdCByPVJhbmQocG9zaXRpb24pO1xuI2lmZGVmIEhFSUdIVE1BUFxuI2lmIF9fVkVSU0lPTl9fPjEwMFxudmZ1cl9sZW5ndGg9ZnVyTGVuZ3RoKnRleHR1cmUoaGVpZ2h0VGV4dHVyZSx1dikueDtcbiNlbHNlXG52ZnVyX2xlbmd0aD1mdXJMZW5ndGgqdGV4dHVyZTJEKGhlaWdodFRleHR1cmUsdXYpLnI7XG4jZW5kaWZcbiNlbHNlIFxudmZ1cl9sZW5ndGg9KGZ1ckxlbmd0aCpyKTtcbiNlbmRpZlxudmVjMyB0YW5nZW50MT12ZWMzKG5vcm1hbC55LC1ub3JtYWwueCwwKTt2ZWMzIHRhbmdlbnQyPXZlYzMoLW5vcm1hbC56LDAsbm9ybWFsLngpO3I9UmFuZCh0YW5nZW50MSpyKTtmbG9hdCBKPSgyLjArNC4wKnIpO3I9UmFuZCh0YW5nZW50MipyKTtmbG9hdCBLPSgyLjArMi4wKnIpO3RhbmdlbnQxPXRhbmdlbnQxKkordGFuZ2VudDIqSzt0YW5nZW50MT1ub3JtYWxpemUodGFuZ2VudDEpO3ZlYzMgbmV3UG9zaXRpb249cG9zaXRpb24rbm9ybWFsKnZmdXJfbGVuZ3RoKmNvcyhmdXJBbmdsZSkrdGFuZ2VudDEqdmZ1cl9sZW5ndGgqc2luKGZ1ckFuZ2xlKTtcbiNpZmRlZiBISUdITEVWRUxcbnZlYzMgZm9yY2VEaXJlY3Rpb249dmVjMygwLjAsMC4wLDAuMCk7Zm9yY2VEaXJlY3Rpb24ueD1zaW4oZnVyVGltZStwb3NpdGlvbi54KjAuMDUpKjAuMjtmb3JjZURpcmVjdGlvbi55PWNvcyhmdXJUaW1lKjAuNytwb3NpdGlvbi55KjAuMDQpKjAuMjtmb3JjZURpcmVjdGlvbi56PXNpbihmdXJUaW1lKjAuNytwb3NpdGlvbi56KjAuMDQpKjAuMjt2ZWMzIGRpc3BsYWNlbWVudD12ZWMzKDAuMCwwLjAsMC4wKTtkaXNwbGFjZW1lbnQ9ZnVyR3Jhdml0eStmb3JjZURpcmVjdGlvbjtmbG9hdCBkaXNwbGFjZW1lbnRGYWN0b3I9cG93KGZ1ck9mZnNldCwzLjApO3ZlYzMgYU5vcm1hbD1ub3JtYWw7YU5vcm1hbC54eXorPWRpc3BsYWNlbWVudCpkaXNwbGFjZW1lbnRGYWN0b3I7bmV3UG9zaXRpb249dmVjMyhuZXdQb3NpdGlvbi54LG5ld1Bvc2l0aW9uLnksbmV3UG9zaXRpb24ueikrKG5vcm1hbGl6ZShhTm9ybWFsKSpmdXJPZmZzZXQqZnVyU3BhY2luZyk7XG4jZW5kaWZcbiNpZmRlZiBOT1JNQUxcbnZOb3JtYWxXPW5vcm1hbGl6ZSh2ZWMzKGZpbmFsV29ybGQqdmVjNChub3JtYWwsMC4wKSkpO1xuI2VuZGlmXG5nbF9Qb3NpdGlvbj12aWV3UHJvamVjdGlvbipmaW5hbFdvcmxkKnZlYzQobmV3UG9zaXRpb24sMS4wKTt2ZWM0IHdvcmxkUG9zPWZpbmFsV29ybGQqdmVjNChuZXdQb3NpdGlvbiwxLjApO3ZQb3NpdGlvblc9dmVjMyh3b3JsZFBvcyk7XG4jaWZuZGVmIFVWMVxudmVjMiB1dj12ZWMyKDAuLDAuKTtcbiNlbmRpZlxuI2lmbmRlZiBVVjJcbnZlYzIgdXYyPXZlYzIoMC4sMC4pO1xuI2VuZGlmXG4jaWZkZWYgRElGRlVTRVxuaWYgKHZEaWZmdXNlSW5mb3MueD09MC4pXG57dkRpZmZ1c2VVVj12ZWMyKGRpZmZ1c2VNYXRyaXgqdmVjNCh1diwxLjAsMC4wKSk7fVxuZWxzZVxue3ZEaWZmdXNlVVY9dmVjMihkaWZmdXNlTWF0cml4KnZlYzQodXYyLDEuMCwwLjApKTt9XG4jaWZkZWYgSElHSExFVkVMXG52RnVyVVY9dkRpZmZ1c2VVVipmdXJEZW5zaXR5O1xuI2VuZGlmXG4jZWxzZVxuI2lmZGVmIEhJR0hMRVZFTFxudkZ1clVWPXV2KmZ1ckRlbnNpdHk7XG4jZW5kaWZcbiNlbmRpZlxuI2luY2x1ZGU8Y2xpcFBsYW5lVmVydGV4PlxuI2luY2x1ZGU8Zm9nVmVydGV4PlxuI2luY2x1ZGU8c2hhZG93c1ZlcnRleD5bMC4ubWF4U2ltdWx0YW5lb3VzTGlnaHRzXVxuI2luY2x1ZGU8dmVydGV4Q29sb3JNaXhpbmc+XG4jaWYgZGVmaW5lZChQT0lOVFNJWkUpICYmICFkZWZpbmVkKFdFQkdQVSlcbmdsX1BvaW50U2l6ZT1wb2ludFNpemU7XG4jZW5kaWZcbiNkZWZpbmUgQ1VTVE9NX1ZFUlRFWF9NQUlOX0VORFxufVxuYDtcbi8vIFNpZGVlZmZlY3RcblNoYWRlclN0b3JlLlNoYWRlcnNTdG9yZVtuYW1lXSA9IHNoYWRlcjtcbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBjb25zdCBmdXJWZXJ0ZXhTaGFkZXIgPSB7IG5hbWUsIHNoYWRlciB9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgeyBzZXJpYWxpemVBc1ZlY3RvcjMsIHNlcmlhbGl6ZUFzVGV4dHVyZSwgc2VyaWFsaXplLCBleHBhbmRUb1Byb3BlcnR5LCBzZXJpYWxpemVBc0NvbG9yMywgU2VyaWFsaXphdGlvbkhlbHBlciB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9yc1wiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdHJpeCB9IGZyb20gXCJjb3JlL01hdGhzL21hdGgudmVjdG9yXCI7XHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLnZlY3RvclwiO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcbmltcG9ydCB0eXBlIHsgSUFuaW1hdGFibGUgfSBmcm9tIFwiY29yZS9BbmltYXRpb25zL2FuaW1hdGFibGUuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRhZ3MgfSBmcm9tIFwiY29yZS9NaXNjL3RhZ3NcIjtcclxuaW1wb3J0IHR5cGUgeyBCYXNlVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9iYXNlVGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3RleHR1cmVcIjtcclxuaW1wb3J0IHsgRHluYW1pY1RleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvZHluYW1pY1RleHR1cmVcIjtcclxuaW1wb3J0IHR5cGUgeyBJRWZmZWN0Q3JlYXRpb25PcHRpb25zIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL2VmZmVjdFwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbERlZmluZXMgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxEZWZpbmVzXCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsSGVscGVyIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsSGVscGVyXCI7XHJcbmltcG9ydCB7IFB1c2hNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9wdXNoTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWxGbGFncyB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbEZsYWdzXCI7XHJcbmltcG9ydCB7IFZlcnRleEJ1ZmZlciB9IGZyb20gXCJjb3JlL0J1ZmZlcnMvYnVmZmVyXCI7XHJcbmltcG9ydCB0eXBlIHsgQWJzdHJhY3RNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL2Fic3RyYWN0TWVzaFwiO1xyXG5pbXBvcnQgdHlwZSB7IFN1Yk1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvc3ViTWVzaFwiO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5pbXBvcnQgeyBTY2VuZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcbmltcG9ydCB7IFJlZ2lzdGVyQ2xhc3MgfSBmcm9tIFwiY29yZS9NaXNjL3R5cGVTdG9yZVwiO1xyXG5pbXBvcnQgeyBFZmZlY3RGYWxsYmFja3MgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvZWZmZWN0RmFsbGJhY2tzXCI7XHJcblxyXG5pbXBvcnQgXCIuL2Z1ci5mcmFnbWVudFwiO1xyXG5pbXBvcnQgXCIuL2Z1ci52ZXJ0ZXhcIjtcclxuaW1wb3J0IHsgYWRkQ2xpcFBsYW5lVW5pZm9ybXMsIGJpbmRDbGlwUGxhbmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvY2xpcFBsYW5lTWF0ZXJpYWxIZWxwZXJcIjtcclxuXHJcbmNsYXNzIEZ1ck1hdGVyaWFsRGVmaW5lcyBleHRlbmRzIE1hdGVyaWFsRGVmaW5lcyB7XHJcbiAgICBwdWJsaWMgRElGRlVTRSA9IGZhbHNlO1xyXG4gICAgcHVibGljIEhFSUdIVE1BUCA9IGZhbHNlO1xyXG4gICAgcHVibGljIENMSVBQTEFORSA9IGZhbHNlO1xyXG4gICAgcHVibGljIENMSVBQTEFORTIgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBDTElQUExBTkUzID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgQ0xJUFBMQU5FNCA9IGZhbHNlO1xyXG4gICAgcHVibGljIENMSVBQTEFORTUgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBDTElQUExBTkU2ID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgQUxQSEFURVNUID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgREVQVEhQUkVQQVNTID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgUE9JTlRTSVpFID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgRk9HID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgTk9STUFMID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgVVYxID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgVVYyID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgVkVSVEVYQ09MT1IgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBWRVJURVhBTFBIQSA9IGZhbHNlO1xyXG4gICAgcHVibGljIE5VTV9CT05FX0lORkxVRU5DRVJTID0gMDtcclxuICAgIHB1YmxpYyBCb25lc1Blck1lc2ggPSAwO1xyXG4gICAgcHVibGljIElOU1RBTkNFUyA9IGZhbHNlO1xyXG4gICAgcHVibGljIElOU1RBTkNFU0NPTE9SID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgSElHSExFVkVMID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgSU1BR0VQUk9DRVNTSU5HUE9TVFBST0NFU1MgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBTS0lQRklOQUxDT0xPUkNMQU1QID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnJlYnVpbGQoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZ1ck1hdGVyaWFsIGV4dGVuZHMgUHVzaE1hdGVyaWFsIHtcclxuICAgIEBzZXJpYWxpemVBc1RleHR1cmUoXCJkaWZmdXNlVGV4dHVyZVwiKVxyXG4gICAgcHJpdmF0ZSBfZGlmZnVzZVRleHR1cmU6IEJhc2VUZXh0dXJlO1xyXG4gICAgQGV4cGFuZFRvUHJvcGVydHkoXCJfbWFya0FsbFN1Yk1lc2hlc0FzVGV4dHVyZXNEaXJ0eVwiKVxyXG4gICAgcHVibGljIGRpZmZ1c2VUZXh0dXJlOiBCYXNlVGV4dHVyZTtcclxuXHJcbiAgICBAc2VyaWFsaXplQXNUZXh0dXJlKFwiaGVpZ2h0VGV4dHVyZVwiKVxyXG4gICAgcHJpdmF0ZSBfaGVpZ2h0VGV4dHVyZTogQmFzZVRleHR1cmU7XHJcbiAgICBAZXhwYW5kVG9Qcm9wZXJ0eShcIl9tYXJrQWxsU3ViTWVzaGVzQXNUZXh0dXJlc0RpcnR5XCIpXHJcbiAgICBwdWJsaWMgaGVpZ2h0VGV4dHVyZTogQmFzZVRleHR1cmU7XHJcblxyXG4gICAgQHNlcmlhbGl6ZUFzQ29sb3IzKClcclxuICAgIHB1YmxpYyBkaWZmdXNlQ29sb3IgPSBuZXcgQ29sb3IzKDEsIDEsIDEpO1xyXG5cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIGZ1ckxlbmd0aDogbnVtYmVyID0gMTtcclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBmdXJBbmdsZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBAc2VyaWFsaXplQXNDb2xvcjMoKVxyXG4gICAgcHVibGljIGZ1ckNvbG9yID0gbmV3IENvbG9yMygwLjQ0LCAwLjIxLCAwLjAyKTtcclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBmdXJPZmZzZXQ6IG51bWJlciA9IDAuMDtcclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBmdXJTcGFjaW5nOiBudW1iZXIgPSAxMjtcclxuXHJcbiAgICBAc2VyaWFsaXplQXNWZWN0b3IzKClcclxuICAgIHB1YmxpYyBmdXJHcmF2aXR5ID0gbmV3IFZlY3RvcjMoMCwgMCwgMCk7XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZnVyU3BlZWQ6IG51bWJlciA9IDEwMDtcclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBmdXJEZW5zaXR5OiBudW1iZXIgPSAyMDtcclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBmdXJPY2NsdXNpb246IG51bWJlciA9IDAuMDtcclxuXHJcbiAgICBwdWJsaWMgZnVyVGV4dHVyZTogRHluYW1pY1RleHR1cmU7XHJcblxyXG4gICAgQHNlcmlhbGl6ZShcImRpc2FibGVMaWdodGluZ1wiKVxyXG4gICAgcHJpdmF0ZSBfZGlzYWJsZUxpZ2h0aW5nID0gZmFsc2U7XHJcbiAgICBAZXhwYW5kVG9Qcm9wZXJ0eShcIl9tYXJrQWxsU3ViTWVzaGVzQXNMaWdodHNEaXJ0eVwiKVxyXG4gICAgcHVibGljIGRpc2FibGVMaWdodGluZzogYm9vbGVhbjtcclxuXHJcbiAgICBAc2VyaWFsaXplKFwibWF4U2ltdWx0YW5lb3VzTGlnaHRzXCIpXHJcbiAgICBwcml2YXRlIF9tYXhTaW11bHRhbmVvdXNMaWdodHMgPSA0O1xyXG4gICAgQGV4cGFuZFRvUHJvcGVydHkoXCJfbWFya0FsbFN1Yk1lc2hlc0FzTGlnaHRzRGlydHlcIilcclxuICAgIHB1YmxpYyBtYXhTaW11bHRhbmVvdXNMaWdodHM6IG51bWJlcjtcclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBoaWdoTGV2ZWxGdXI6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIHB1YmxpYyBfbWVzaGVzOiBBYnN0cmFjdE1lc2hbXTtcclxuXHJcbiAgICBwcml2YXRlIF9mdXJUaW1lOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgc2NlbmU/OiBTY2VuZSkge1xyXG4gICAgICAgIHN1cGVyKG5hbWUsIHNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBnZXQgZnVyVGltZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZnVyVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGZ1clRpbWUoZnVyVGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZnVyVGltZSA9IGZ1clRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5lZWRBbHBoYUJsZW5kaW5nKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFscGhhIDwgMS4wO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZWVkQWxwaGFUZXN0aW5nKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QWxwaGFUZXN0VGV4dHVyZSgpOiBOdWxsYWJsZTxCYXNlVGV4dHVyZT4ge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVGdXIoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLl9tZXNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0RnVyID0gPEZ1ck1hdGVyaWFsPnRoaXMuX21lc2hlc1tpXS5tYXRlcmlhbDtcclxuXHJcbiAgICAgICAgICAgIG9mZnNldEZ1ci5mdXJMZW5ndGggPSB0aGlzLmZ1ckxlbmd0aDtcclxuICAgICAgICAgICAgb2Zmc2V0RnVyLmZ1ckFuZ2xlID0gdGhpcy5mdXJBbmdsZTtcclxuICAgICAgICAgICAgb2Zmc2V0RnVyLmZ1ckdyYXZpdHkgPSB0aGlzLmZ1ckdyYXZpdHk7XHJcbiAgICAgICAgICAgIG9mZnNldEZ1ci5mdXJTcGFjaW5nID0gdGhpcy5mdXJTcGFjaW5nO1xyXG4gICAgICAgICAgICBvZmZzZXRGdXIuZnVyU3BlZWQgPSB0aGlzLmZ1clNwZWVkO1xyXG4gICAgICAgICAgICBvZmZzZXRGdXIuZnVyQ29sb3IgPSB0aGlzLmZ1ckNvbG9yO1xyXG4gICAgICAgICAgICBvZmZzZXRGdXIuZGlmZnVzZVRleHR1cmUgPSB0aGlzLmRpZmZ1c2VUZXh0dXJlO1xyXG4gICAgICAgICAgICBvZmZzZXRGdXIuZnVyVGV4dHVyZSA9IHRoaXMuZnVyVGV4dHVyZTtcclxuICAgICAgICAgICAgb2Zmc2V0RnVyLmhpZ2hMZXZlbEZ1ciA9IHRoaXMuaGlnaExldmVsRnVyO1xyXG4gICAgICAgICAgICBvZmZzZXRGdXIuZnVyVGltZSA9IHRoaXMuZnVyVGltZTtcclxuICAgICAgICAgICAgb2Zmc2V0RnVyLmZ1ckRlbnNpdHkgPSB0aGlzLmZ1ckRlbnNpdHk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE1ldGhvZHNcclxuICAgIHB1YmxpYyBpc1JlYWR5Rm9yU3ViTWVzaChtZXNoOiBBYnN0cmFjdE1lc2gsIHN1Yk1lc2g6IFN1Yk1lc2gsIHVzZUluc3RhbmNlcz86IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5pc0Zyb3plbikge1xyXG4gICAgICAgICAgICBpZiAoc3ViTWVzaC5lZmZlY3QgJiYgc3ViTWVzaC5lZmZlY3QuX3dhc1ByZXZpb3VzbHlSZWFkeSAmJiBzdWJNZXNoLmVmZmVjdC5fd2FzUHJldmlvdXNseVVzaW5nSW5zdGFuY2VzID09PSB1c2VJbnN0YW5jZXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXN1Yk1lc2gubWF0ZXJpYWxEZWZpbmVzKSB7XHJcbiAgICAgICAgICAgIHN1Yk1lc2gubWF0ZXJpYWxEZWZpbmVzID0gbmV3IEZ1ck1hdGVyaWFsRGVmaW5lcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGVmaW5lcyA9IDxGdXJNYXRlcmlhbERlZmluZXM+c3ViTWVzaC5tYXRlcmlhbERlZmluZXM7XHJcbiAgICAgICAgY29uc3Qgc2NlbmUgPSB0aGlzLmdldFNjZW5lKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9pc1JlYWR5Rm9yU3ViTWVzaChzdWJNZXNoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGVuZ2luZSA9IHNjZW5lLmdldEVuZ2luZSgpO1xyXG5cclxuICAgICAgICAvLyBUZXh0dXJlc1xyXG4gICAgICAgIGlmIChkZWZpbmVzLl9hcmVUZXh0dXJlc0RpcnR5KSB7XHJcbiAgICAgICAgICAgIGlmIChzY2VuZS50ZXh0dXJlc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpZmZ1c2VUZXh0dXJlICYmIE1hdGVyaWFsRmxhZ3MuRGlmZnVzZVRleHR1cmVFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRpZmZ1c2VUZXh0dXJlLmlzUmVhZHkoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5lcy5fbmVlZFVWcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmluZXMuRElGRlVTRSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGVpZ2h0VGV4dHVyZSAmJiBlbmdpbmUuZ2V0Q2FwcygpLm1heFZlcnRleFRleHR1cmVJbWFnZVVuaXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhlaWdodFRleHR1cmUuaXNSZWFkeSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZpbmVzLl9uZWVkVVZzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5lcy5IRUlHSFRNQVAgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSGlnaCBsZXZlbFxyXG4gICAgICAgIGlmICh0aGlzLmhpZ2hMZXZlbEZ1ciAhPT0gZGVmaW5lcy5ISUdITEVWRUwpIHtcclxuICAgICAgICAgICAgZGVmaW5lcy5ISUdITEVWRUwgPSB0cnVlO1xyXG4gICAgICAgICAgICBkZWZpbmVzLm1hcmtBc1VucHJvY2Vzc2VkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNaXNjLlxyXG4gICAgICAgIE1hdGVyaWFsSGVscGVyLlByZXBhcmVEZWZpbmVzRm9yTWlzYyhtZXNoLCBzY2VuZSwgZmFsc2UsIHRoaXMucG9pbnRzQ2xvdWQsIHRoaXMuZm9nRW5hYmxlZCwgdGhpcy5fc2hvdWxkVHVybkFscGhhVGVzdE9uKG1lc2gpLCBkZWZpbmVzKTtcclxuXHJcbiAgICAgICAgLy8gTGlnaHRzXHJcbiAgICAgICAgZGVmaW5lcy5fbmVlZE5vcm1hbHMgPSBNYXRlcmlhbEhlbHBlci5QcmVwYXJlRGVmaW5lc0ZvckxpZ2h0cyhzY2VuZSwgbWVzaCwgZGVmaW5lcywgZmFsc2UsIHRoaXMuX21heFNpbXVsdGFuZW91c0xpZ2h0cywgdGhpcy5fZGlzYWJsZUxpZ2h0aW5nKTtcclxuXHJcbiAgICAgICAgLy8gVmFsdWVzIHRoYXQgbmVlZCB0byBiZSBldmFsdWF0ZWQgb24gZXZlcnkgZnJhbWVcclxuICAgICAgICBNYXRlcmlhbEhlbHBlci5QcmVwYXJlRGVmaW5lc0ZvckZyYW1lQm91bmRWYWx1ZXMoc2NlbmUsIGVuZ2luZSwgdGhpcywgZGVmaW5lcywgdXNlSW5zdGFuY2VzID8gdHJ1ZSA6IGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gQXR0cmlic1xyXG4gICAgICAgIE1hdGVyaWFsSGVscGVyLlByZXBhcmVEZWZpbmVzRm9yQXR0cmlidXRlcyhtZXNoLCBkZWZpbmVzLCB0cnVlLCB0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gR2V0IGNvcnJlY3QgZWZmZWN0XHJcbiAgICAgICAgaWYgKGRlZmluZXMuaXNEaXJ0eSkge1xyXG4gICAgICAgICAgICBkZWZpbmVzLm1hcmtBc1Byb2Nlc3NlZCgpO1xyXG5cclxuICAgICAgICAgICAgc2NlbmUucmVzZXRDYWNoZWRNYXRlcmlhbCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gRmFsbGJhY2tzXHJcbiAgICAgICAgICAgIGNvbnN0IGZhbGxiYWNrcyA9IG5ldyBFZmZlY3RGYWxsYmFja3MoKTtcclxuICAgICAgICAgICAgaWYgKGRlZmluZXMuRk9HKSB7XHJcbiAgICAgICAgICAgICAgICBmYWxsYmFja3MuYWRkRmFsbGJhY2soMSwgXCJGT0dcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIE1hdGVyaWFsSGVscGVyLkhhbmRsZUZhbGxiYWNrc0ZvclNoYWRvd3MoZGVmaW5lcywgZmFsbGJhY2tzLCB0aGlzLm1heFNpbXVsdGFuZW91c0xpZ2h0cyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGVmaW5lcy5OVU1fQk9ORV9JTkZMVUVOQ0VSUyA+IDApIHtcclxuICAgICAgICAgICAgICAgIGZhbGxiYWNrcy5hZGRDUFVTa2lubmluZ0ZhbGxiYWNrKDAsIG1lc2gpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkZWZpbmVzLklNQUdFUFJPQ0VTU0lOR1BPU1RQUk9DRVNTID0gc2NlbmUuaW1hZ2VQcm9jZXNzaW5nQ29uZmlndXJhdGlvbi5hcHBseUJ5UG9zdFByb2Nlc3M7XHJcblxyXG4gICAgICAgICAgICAvL0F0dHJpYnV0ZXNcclxuICAgICAgICAgICAgY29uc3QgYXR0cmlicyA9IFtWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkZWZpbmVzLk5PUk1BTCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlicy5wdXNoKFZlcnRleEJ1ZmZlci5Ob3JtYWxLaW5kKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRlZmluZXMuVVYxKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJzLnB1c2goVmVydGV4QnVmZmVyLlVWS2luZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkZWZpbmVzLlVWMikge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlicy5wdXNoKFZlcnRleEJ1ZmZlci5VVjJLaW5kKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRlZmluZXMuVkVSVEVYQ09MT1IpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnMucHVzaChWZXJ0ZXhCdWZmZXIuQ29sb3JLaW5kKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgTWF0ZXJpYWxIZWxwZXIuUHJlcGFyZUF0dHJpYnV0ZXNGb3JCb25lcyhhdHRyaWJzLCBtZXNoLCBkZWZpbmVzLCBmYWxsYmFja3MpO1xyXG4gICAgICAgICAgICBNYXRlcmlhbEhlbHBlci5QcmVwYXJlQXR0cmlidXRlc0Zvckluc3RhbmNlcyhhdHRyaWJzLCBkZWZpbmVzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIExlZ2FjeSBicm93c2VyIHBhdGNoXHJcbiAgICAgICAgICAgIGNvbnN0IHNoYWRlck5hbWUgPSBcImZ1clwiO1xyXG4gICAgICAgICAgICBjb25zdCBqb2luID0gZGVmaW5lcy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBjb25zdCB1bmlmb3JtcyA9IFtcclxuICAgICAgICAgICAgICAgIFwid29ybGRcIixcclxuICAgICAgICAgICAgICAgIFwidmlld1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ2aWV3UHJvamVjdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2RXllUG9zaXRpb25cIixcclxuICAgICAgICAgICAgICAgIFwidkxpZ2h0c1R5cGVcIixcclxuICAgICAgICAgICAgICAgIFwidkRpZmZ1c2VDb2xvclwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2Rm9nSW5mb3NcIixcclxuICAgICAgICAgICAgICAgIFwidkZvZ0NvbG9yXCIsXHJcbiAgICAgICAgICAgICAgICBcInBvaW50U2l6ZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2RGlmZnVzZUluZm9zXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1Cb25lc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaWZmdXNlTWF0cml4XCIsXHJcbiAgICAgICAgICAgICAgICBcImZ1ckxlbmd0aFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmdXJBbmdsZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJmdXJDb2xvclwiLFxyXG4gICAgICAgICAgICAgICAgXCJmdXJPZmZzZXRcIixcclxuICAgICAgICAgICAgICAgIFwiZnVyR3Jhdml0eVwiLFxyXG4gICAgICAgICAgICAgICAgXCJmdXJUaW1lXCIsXHJcbiAgICAgICAgICAgICAgICBcImZ1clNwYWNpbmdcIixcclxuICAgICAgICAgICAgICAgIFwiZnVyRGVuc2l0eVwiLFxyXG4gICAgICAgICAgICAgICAgXCJmdXJPY2NsdXNpb25cIixcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgYWRkQ2xpcFBsYW5lVW5pZm9ybXModW5pZm9ybXMpO1xyXG4gICAgICAgICAgICBjb25zdCBzYW1wbGVycyA9IFtcImRpZmZ1c2VTYW1wbGVyXCIsIFwiaGVpZ2h0VGV4dHVyZVwiLCBcImZ1clRleHR1cmVcIl07XHJcblxyXG4gICAgICAgICAgICBjb25zdCB1bmlmb3JtQnVmZmVycyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcblxyXG4gICAgICAgICAgICBNYXRlcmlhbEhlbHBlci5QcmVwYXJlVW5pZm9ybXNBbmRTYW1wbGVyc0xpc3QoPElFZmZlY3RDcmVhdGlvbk9wdGlvbnM+e1xyXG4gICAgICAgICAgICAgICAgdW5pZm9ybXNOYW1lczogdW5pZm9ybXMsXHJcbiAgICAgICAgICAgICAgICB1bmlmb3JtQnVmZmVyc05hbWVzOiB1bmlmb3JtQnVmZmVycyxcclxuICAgICAgICAgICAgICAgIHNhbXBsZXJzOiBzYW1wbGVycyxcclxuICAgICAgICAgICAgICAgIGRlZmluZXM6IGRlZmluZXMsXHJcbiAgICAgICAgICAgICAgICBtYXhTaW11bHRhbmVvdXNMaWdodHM6IHRoaXMubWF4U2ltdWx0YW5lb3VzTGlnaHRzLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHN1Yk1lc2guc2V0RWZmZWN0KFxyXG4gICAgICAgICAgICAgICAgc2NlbmUuZ2V0RW5naW5lKCkuY3JlYXRlRWZmZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgIHNoYWRlck5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgPElFZmZlY3RDcmVhdGlvbk9wdGlvbnM+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBhdHRyaWJzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmlmb3Jtc05hbWVzOiB1bmlmb3JtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pZm9ybUJ1ZmZlcnNOYW1lczogdW5pZm9ybUJ1ZmZlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhbXBsZXJzOiBzYW1wbGVycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5lczogam9pbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2tzOiBmYWxsYmFja3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGlsZWQ6IHRoaXMub25Db21waWxlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvcjogdGhpcy5vbkVycm9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleFBhcmFtZXRlcnM6IHsgbWF4U2ltdWx0YW5lb3VzTGlnaHRzOiB0aGlzLm1heFNpbXVsdGFuZW91c0xpZ2h0cyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW5naW5lXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgZGVmaW5lcyxcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsQ29udGV4dFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXN1Yk1lc2guZWZmZWN0IHx8ICFzdWJNZXNoLmVmZmVjdC5pc1JlYWR5KCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVmaW5lcy5fcmVuZGVySWQgPSBzY2VuZS5nZXRSZW5kZXJJZCgpO1xyXG4gICAgICAgIHN1Yk1lc2guZWZmZWN0Ll93YXNQcmV2aW91c2x5UmVhZHkgPSB0cnVlO1xyXG4gICAgICAgIHN1Yk1lc2guZWZmZWN0Ll93YXNQcmV2aW91c2x5VXNpbmdJbnN0YW5jZXMgPSAhIXVzZUluc3RhbmNlcztcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJpbmRGb3JTdWJNZXNoKHdvcmxkOiBNYXRyaXgsIG1lc2g6IE1lc2gsIHN1Yk1lc2g6IFN1Yk1lc2gpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzY2VuZSA9IHRoaXMuZ2V0U2NlbmUoKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGVmaW5lcyA9IDxGdXJNYXRlcmlhbERlZmluZXM+c3ViTWVzaC5tYXRlcmlhbERlZmluZXM7XHJcbiAgICAgICAgaWYgKCFkZWZpbmVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGVmZmVjdCA9IHN1Yk1lc2guZWZmZWN0O1xyXG4gICAgICAgIGlmICghZWZmZWN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0ID0gZWZmZWN0O1xyXG5cclxuICAgICAgICAvLyBNYXRyaWNlc1xyXG4gICAgICAgIHRoaXMuYmluZE9ubHlXb3JsZE1hdHJpeCh3b3JsZCk7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0LnNldE1hdHJpeChcInZpZXdQcm9qZWN0aW9uXCIsIHNjZW5lLmdldFRyYW5zZm9ybU1hdHJpeCgpKTtcclxuXHJcbiAgICAgICAgLy8gQm9uZXNcclxuICAgICAgICBNYXRlcmlhbEhlbHBlci5CaW5kQm9uZXNQYXJhbWV0ZXJzKG1lc2gsIHRoaXMuX2FjdGl2ZUVmZmVjdCk7XHJcblxyXG4gICAgICAgIGlmIChzY2VuZS5nZXRDYWNoZWRNYXRlcmlhbCgpICE9PSB0aGlzKSB7XHJcbiAgICAgICAgICAgIC8vIFRleHR1cmVzXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kaWZmdXNlVGV4dHVyZSAmJiBNYXRlcmlhbEZsYWdzLkRpZmZ1c2VUZXh0dXJlRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0LnNldFRleHR1cmUoXCJkaWZmdXNlU2FtcGxlclwiLCB0aGlzLl9kaWZmdXNlVGV4dHVyZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0LnNldEZsb2F0MihcInZEaWZmdXNlSW5mb3NcIiwgdGhpcy5fZGlmZnVzZVRleHR1cmUuY29vcmRpbmF0ZXNJbmRleCwgdGhpcy5fZGlmZnVzZVRleHR1cmUubGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0LnNldE1hdHJpeChcImRpZmZ1c2VNYXRyaXhcIiwgdGhpcy5fZGlmZnVzZVRleHR1cmUuZ2V0VGV4dHVyZU1hdHJpeCgpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2hlaWdodFRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUVmZmVjdC5zZXRUZXh0dXJlKFwiaGVpZ2h0VGV4dHVyZVwiLCB0aGlzLl9oZWlnaHRUZXh0dXJlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ2xpcCBwbGFuZVxyXG4gICAgICAgICAgICBiaW5kQ2xpcFBsYW5lKHRoaXMuX2FjdGl2ZUVmZmVjdCwgdGhpcywgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgLy8gUG9pbnQgc2l6ZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5wb2ludHNDbG91ZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0LnNldEZsb2F0KFwicG9pbnRTaXplXCIsIHRoaXMucG9pbnRTaXplKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2NlbmUuYmluZEV5ZVBvc2l0aW9uKGVmZmVjdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3Quc2V0Q29sb3I0KFwidkRpZmZ1c2VDb2xvclwiLCB0aGlzLmRpZmZ1c2VDb2xvciwgdGhpcy5hbHBoYSAqIG1lc2gudmlzaWJpbGl0eSk7XHJcblxyXG4gICAgICAgIGlmIChzY2VuZS5saWdodHNFbmFibGVkICYmICF0aGlzLmRpc2FibGVMaWdodGluZykge1xyXG4gICAgICAgICAgICBNYXRlcmlhbEhlbHBlci5CaW5kTGlnaHRzKHNjZW5lLCBtZXNoLCB0aGlzLl9hY3RpdmVFZmZlY3QsIGRlZmluZXMsIHRoaXMubWF4U2ltdWx0YW5lb3VzTGlnaHRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFZpZXdcclxuICAgICAgICBpZiAoc2NlbmUuZm9nRW5hYmxlZCAmJiBtZXNoLmFwcGx5Rm9nICYmIHNjZW5lLmZvZ01vZGUgIT09IFNjZW5lLkZPR01PREVfTk9ORSkge1xyXG4gICAgICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3Quc2V0TWF0cml4KFwidmlld1wiLCBzY2VuZS5nZXRWaWV3TWF0cml4KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRm9nXHJcbiAgICAgICAgTWF0ZXJpYWxIZWxwZXIuQmluZEZvZ1BhcmFtZXRlcnMoc2NlbmUsIG1lc2gsIHRoaXMuX2FjdGl2ZUVmZmVjdCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2FjdGl2ZUVmZmVjdC5zZXRGbG9hdChcImZ1ckxlbmd0aFwiLCB0aGlzLmZ1ckxlbmd0aCk7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0LnNldEZsb2F0KFwiZnVyQW5nbGVcIiwgdGhpcy5mdXJBbmdsZSk7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0LnNldENvbG9yNChcImZ1ckNvbG9yXCIsIHRoaXMuZnVyQ29sb3IsIDEuMCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmhpZ2hMZXZlbEZ1cikge1xyXG4gICAgICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3Quc2V0VmVjdG9yMyhcImZ1ckdyYXZpdHlcIiwgdGhpcy5mdXJHcmF2aXR5KTtcclxuICAgICAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0LnNldEZsb2F0KFwiZnVyT2Zmc2V0XCIsIHRoaXMuZnVyT2Zmc2V0KTtcclxuICAgICAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0LnNldEZsb2F0KFwiZnVyU3BhY2luZ1wiLCB0aGlzLmZ1clNwYWNpbmcpO1xyXG4gICAgICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3Quc2V0RmxvYXQoXCJmdXJEZW5zaXR5XCIsIHRoaXMuZnVyRGVuc2l0eSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUVmZmVjdC5zZXRGbG9hdChcImZ1ck9jY2x1c2lvblwiLCB0aGlzLmZ1ck9jY2x1c2lvbik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9mdXJUaW1lICs9IHRoaXMuZ2V0U2NlbmUoKS5nZXRFbmdpbmUoKS5nZXREZWx0YVRpbWUoKSAvIHRoaXMuZnVyU3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUVmZmVjdC5zZXRGbG9hdChcImZ1clRpbWVcIiwgdGhpcy5fZnVyVGltZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3Quc2V0VGV4dHVyZShcImZ1clRleHR1cmVcIiwgdGhpcy5mdXJUZXh0dXJlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2FmdGVyQmluZChtZXNoLCB0aGlzLl9hY3RpdmVFZmZlY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBbmltYXRhYmxlcygpOiBJQW5pbWF0YWJsZVtdIHtcclxuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpZmZ1c2VUZXh0dXJlICYmIHRoaXMuZGlmZnVzZVRleHR1cmUuYW5pbWF0aW9ucyAmJiB0aGlzLmRpZmZ1c2VUZXh0dXJlLmFuaW1hdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXN1bHRzLnB1c2godGhpcy5kaWZmdXNlVGV4dHVyZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5oZWlnaHRUZXh0dXJlICYmIHRoaXMuaGVpZ2h0VGV4dHVyZS5hbmltYXRpb25zICYmIHRoaXMuaGVpZ2h0VGV4dHVyZS5hbmltYXRpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuaGVpZ2h0VGV4dHVyZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QWN0aXZlVGV4dHVyZXMoKTogQmFzZVRleHR1cmVbXSB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlVGV4dHVyZXMgPSBzdXBlci5nZXRBY3RpdmVUZXh0dXJlcygpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZGlmZnVzZVRleHR1cmUpIHtcclxuICAgICAgICAgICAgYWN0aXZlVGV4dHVyZXMucHVzaCh0aGlzLl9kaWZmdXNlVGV4dHVyZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5faGVpZ2h0VGV4dHVyZSkge1xyXG4gICAgICAgICAgICBhY3RpdmVUZXh0dXJlcy5wdXNoKHRoaXMuX2hlaWdodFRleHR1cmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFjdGl2ZVRleHR1cmVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYXNUZXh0dXJlKHRleHR1cmU6IEJhc2VUZXh0dXJlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHN1cGVyLmhhc1RleHR1cmUodGV4dHVyZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5kaWZmdXNlVGV4dHVyZSA9PT0gdGV4dHVyZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9oZWlnaHRUZXh0dXJlID09PSB0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKGZvcmNlRGlzcG9zZUVmZmVjdD86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5kaWZmdXNlVGV4dHVyZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRpZmZ1c2VUZXh0dXJlLmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tZXNoZXMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLl9tZXNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdCA9IHRoaXMuX21lc2hlc1tpXS5tYXRlcmlhbDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0LmRpc3Bvc2UoZm9yY2VEaXNwb3NlRWZmZWN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX21lc2hlc1tpXS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoZm9yY2VEaXNwb3NlRWZmZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvbmUobmFtZTogc3RyaW5nKTogRnVyTWF0ZXJpYWwge1xyXG4gICAgICAgIHJldHVybiBTZXJpYWxpemF0aW9uSGVscGVyLkNsb25lKCgpID0+IG5ldyBGdXJNYXRlcmlhbChuYW1lLCB0aGlzLmdldFNjZW5lKCkpLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VyaWFsaXplKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3Qgc2VyaWFsaXphdGlvbk9iamVjdCA9IHN1cGVyLnNlcmlhbGl6ZSgpO1xyXG4gICAgICAgIHNlcmlhbGl6YXRpb25PYmplY3QuY3VzdG9tVHlwZSA9IFwiQkFCWUxPTi5GdXJNYXRlcmlhbFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbWVzaGVzKSB7XHJcbiAgICAgICAgICAgIHNlcmlhbGl6YXRpb25PYmplY3Quc291cmNlTWVzaE5hbWUgPSB0aGlzLl9tZXNoZXNbMF0ubmFtZTtcclxuICAgICAgICAgICAgc2VyaWFsaXphdGlvbk9iamVjdC5xdWFsaXR5ID0gdGhpcy5fbWVzaGVzLmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJpYWxpemF0aW9uT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJGdXJNYXRlcmlhbFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFN0YXRpY3NcclxuICAgIHB1YmxpYyBzdGF0aWMgUGFyc2Uoc291cmNlOiBhbnksIHNjZW5lOiBTY2VuZSwgcm9vdFVybDogc3RyaW5nKTogRnVyTWF0ZXJpYWwge1xyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gU2VyaWFsaXphdGlvbkhlbHBlci5QYXJzZSgoKSA9PiBuZXcgRnVyTWF0ZXJpYWwoc291cmNlLm5hbWUsIHNjZW5lKSwgc291cmNlLCBzY2VuZSwgcm9vdFVybCk7XHJcblxyXG4gICAgICAgIGlmIChzb3VyY2Uuc291cmNlTWVzaE5hbWUgJiYgbWF0ZXJpYWwuaGlnaExldmVsRnVyKSB7XHJcbiAgICAgICAgICAgIHNjZW5lLmV4ZWN1dGVXaGVuUmVhZHkoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc291cmNlTWVzaCA9IDxNZXNoPnNjZW5lLmdldE1lc2hCeU5hbWUoc291cmNlLnNvdXJjZU1lc2hOYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2VNZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZnVyVGV4dHVyZSA9IEZ1ck1hdGVyaWFsLkdlbmVyYXRlVGV4dHVyZShcIkZ1ciBUZXh0dXJlXCIsIHNjZW5lKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5mdXJUZXh0dXJlID0gZnVyVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgICAgICBGdXJNYXRlcmlhbC5GdXJpZnlNZXNoKHNvdXJjZU1lc2gsIHNvdXJjZS5xdWFsaXR5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWF0ZXJpYWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBHZW5lcmF0ZVRleHR1cmUobmFtZTogc3RyaW5nLCBzY2VuZTogU2NlbmUpOiBEeW5hbWljVGV4dHVyZSB7XHJcbiAgICAgICAgLy8gR2VuZXJhdGUgZnVyIHRleHR1cmVzXHJcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IG5ldyBEeW5hbWljVGV4dHVyZShcIkZ1clRleHR1cmUgXCIgKyBuYW1lLCAyNTYsIHNjZW5lLCB0cnVlKTtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGV4dHVyZS5nZXRDb250ZXh0KCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjAwMDA7ICsraSkge1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgyNTUsIFwiICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KSArIFwiLCBcIiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSkgKyBcIiwgMSlcIjtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdChNYXRoLnJhbmRvbSgpICogdGV4dHVyZS5nZXRTaXplKCkud2lkdGgsIE1hdGgucmFuZG9tKCkgKiB0ZXh0dXJlLmdldFNpemUoKS5oZWlnaHQsIDIsIDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGV4dHVyZS51cGRhdGUoZmFsc2UpO1xyXG4gICAgICAgIHRleHR1cmUud3JhcFUgPSBUZXh0dXJlLldSQVBfQUREUkVTU01PREU7XHJcbiAgICAgICAgdGV4dHVyZS53cmFwViA9IFRleHR1cmUuV1JBUF9BRERSRVNTTU9ERTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ3JlYXRlcyBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBtZXNoZXMgdXNlZCBhcyBzaGVsbHMgZm9yIHRoZSBGdXIgTWF0ZXJpYWxcclxuICAgIC8vIHRoYXQgY2FuIGJlIGRpc3Bvc2VkIGxhdGVyIGluIHlvdXIgY29kZVxyXG4gICAgLy8gVGhlIHF1YWxpdHkgaXMgaW4gaW50ZXJ2YWwgWzAsIDEwMF1cclxuICAgIHB1YmxpYyBzdGF0aWMgRnVyaWZ5TWVzaChzb3VyY2VNZXNoOiBNZXNoLCBxdWFsaXR5OiBudW1iZXIpOiBNZXNoW10ge1xyXG4gICAgICAgIGNvbnN0IG1lc2hlcyA9IFtzb3VyY2VNZXNoXTtcclxuICAgICAgICBjb25zdCBtYXQ6IEZ1ck1hdGVyaWFsID0gPEZ1ck1hdGVyaWFsPnNvdXJjZU1lc2gubWF0ZXJpYWw7XHJcbiAgICAgICAgbGV0IGk7XHJcblxyXG4gICAgICAgIGlmICghKG1hdCBpbnN0YW5jZW9mIEZ1ck1hdGVyaWFsKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBcIlRoZSBtYXRlcmlhbCBvZiB0aGUgc291cmNlIG1lc2ggbXVzdCBiZSBhIEZ1ciBNYXRlcmlhbFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChpID0gMTsgaSA8IHF1YWxpdHk7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXRGdXIgPSBuZXcgRnVyTWF0ZXJpYWwobWF0Lm5hbWUgKyBpLCBzb3VyY2VNZXNoLmdldFNjZW5lKCkpO1xyXG4gICAgICAgICAgICBzb3VyY2VNZXNoLmdldFNjZW5lKCkubWF0ZXJpYWxzLnBvcCgpO1xyXG4gICAgICAgICAgICBUYWdzLkVuYWJsZUZvcihvZmZzZXRGdXIpO1xyXG4gICAgICAgICAgICBUYWdzLkFkZFRhZ3NUbyhvZmZzZXRGdXIsIFwiZnVyU2hlbGxNYXRlcmlhbFwiKTtcclxuXHJcbiAgICAgICAgICAgIG9mZnNldEZ1ci5mdXJMZW5ndGggPSBtYXQuZnVyTGVuZ3RoO1xyXG4gICAgICAgICAgICBvZmZzZXRGdXIuZnVyQW5nbGUgPSBtYXQuZnVyQW5nbGU7XHJcbiAgICAgICAgICAgIG9mZnNldEZ1ci5mdXJHcmF2aXR5ID0gbWF0LmZ1ckdyYXZpdHk7XHJcbiAgICAgICAgICAgIG9mZnNldEZ1ci5mdXJTcGFjaW5nID0gbWF0LmZ1clNwYWNpbmc7XHJcbiAgICAgICAgICAgIG9mZnNldEZ1ci5mdXJTcGVlZCA9IG1hdC5mdXJTcGVlZDtcclxuICAgICAgICAgICAgb2Zmc2V0RnVyLmZ1ckNvbG9yID0gbWF0LmZ1ckNvbG9yO1xyXG4gICAgICAgICAgICBvZmZzZXRGdXIuZGlmZnVzZVRleHR1cmUgPSBtYXQuZGlmZnVzZVRleHR1cmU7XHJcbiAgICAgICAgICAgIG9mZnNldEZ1ci5mdXJPZmZzZXQgPSBpIC8gcXVhbGl0eTtcclxuICAgICAgICAgICAgb2Zmc2V0RnVyLmZ1clRleHR1cmUgPSBtYXQuZnVyVGV4dHVyZTtcclxuICAgICAgICAgICAgb2Zmc2V0RnVyLmhpZ2hMZXZlbEZ1ciA9IG1hdC5oaWdoTGV2ZWxGdXI7XHJcbiAgICAgICAgICAgIG9mZnNldEZ1ci5mdXJUaW1lID0gbWF0LmZ1clRpbWU7XHJcbiAgICAgICAgICAgIG9mZnNldEZ1ci5mdXJEZW5zaXR5ID0gbWF0LmZ1ckRlbnNpdHk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXRNZXNoID0gc291cmNlTWVzaC5jbG9uZShzb3VyY2VNZXNoLm5hbWUgKyBpKSBhcyBNZXNoO1xyXG5cclxuICAgICAgICAgICAgb2Zmc2V0TWVzaC5tYXRlcmlhbCA9IG9mZnNldEZ1cjtcclxuICAgICAgICAgICAgb2Zmc2V0TWVzaC5za2VsZXRvbiA9IHNvdXJjZU1lc2guc2tlbGV0b247XHJcbiAgICAgICAgICAgIG9mZnNldE1lc2gucG9zaXRpb24gPSBWZWN0b3IzLlplcm8oKTtcclxuICAgICAgICAgICAgbWVzaGVzLnB1c2gob2Zmc2V0TWVzaCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgbWVzaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG1lc2hlc1tpXS5wYXJlbnQgPSBzb3VyY2VNZXNoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgKDxGdXJNYXRlcmlhbD5zb3VyY2VNZXNoLm1hdGVyaWFsKS5fbWVzaGVzID0gbWVzaGVzO1xyXG5cclxuICAgICAgICByZXR1cm4gbWVzaGVzO1xyXG4gICAgfVxyXG59XHJcblxyXG5SZWdpc3RlckNsYXNzKFwiQkFCWUxPTi5GdXJNYXRlcmlhbFwiLCBGdXJNYXRlcmlhbCk7XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL2Z1ck1hdGVyaWFsXCI7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzICovXHJcbmltcG9ydCAqIGFzIE1hdExpYiBmcm9tIFwibWF0ZXJpYWxzL2Z1ci9pbmRleFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGVudHJ5IHBvaW50IGZvciB0aGUgVU1EIG1vZHVsZS5cclxuICogVGhlIGVudHJ5IHBvaW50IGZvciBhIGZ1dHVyZSBFU00gcGFja2FnZSBzaG91bGQgYmUgaW5kZXgudHNcclxuICovXHJcbmNvbnN0IGdsb2JhbE9iamVjdCA9IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdW5kZWZpbmVkO1xyXG5pZiAodHlwZW9mIGdsb2JhbE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gTWF0TGliKSB7XHJcbiAgICAgICAgKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OW2tleV0gPSAoPGFueT5NYXRMaWIpW2tleV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCAqIGZyb20gXCJtYXRlcmlhbHMvZnVyL2luZGV4XCI7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9iYWJ5bG9uanNfTWF0ZXJpYWxzX2VmZmVjdF9fOyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCAqL1xuXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcbiAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcbiAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn1cblxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xuICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xuICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHQ7XG4gIH1cbiAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xuICB2YXIgdCA9IHt9O1xuICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgIHRbcF0gPSBzW3BdO1xuICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgIH1cbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xuICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cbiAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcbiAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XG4gIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xuICB2YXIgXywgZG9uZSA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGNvbnRleHQgPSB7fTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XG4gICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xuICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XG4gICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcbiAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XG4gICAgICB9XG4gIH1cbiAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xuICBkb25lID0gdHJ1ZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XG4gIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xuICB9XG4gIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcbiAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XG4gIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICB9XG59XG5cbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICBvW2syXSA9IG1ba107XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XG4gIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcbiAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgIH1cbiAgfTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcbiAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICBpZiAoIW0pIHJldHVybiBvO1xuICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgdHJ5IHtcbiAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICB9XG4gIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICB9XG4gICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgfVxuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xuICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcbiAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgIHJba10gPSBhW2pdO1xuICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcbiAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xuICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XG4gIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XG4gIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cbiAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XG4gIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcbiAgdmFyIGksIHA7XG4gIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcbiAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XG4gIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XG4gIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XG4gIHJldHVybiBjb29rZWQ7XG59O1xuXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xuICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcbiAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xuICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcbiAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XG4gIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZC5cIik7XG4gICAgdmFyIGRpc3Bvc2U7XG4gICAgaWYgKGFzeW5jKSB7XG4gICAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XG4gICAgfVxuICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcbiAgICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xuICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XG4gIH1cbiAgZWxzZSBpZiAoYXN5bmMpIHtcbiAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcbiAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xuICBmdW5jdGlvbiBmYWlsKGUpIHtcbiAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XG4gICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcbiAgfVxuICBmdW5jdGlvbiBuZXh0KCkge1xuICAgIHdoaWxlIChlbnYuc3RhY2subGVuZ3RoKSB7XG4gICAgICB2YXIgcmVjID0gZW52LnN0YWNrLnBvcCgpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlYy5kaXNwb3NlICYmIHJlYy5kaXNwb3NlLmNhbGwocmVjLnZhbHVlKTtcbiAgICAgICAgaWYgKHJlYy5hc3luYykgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgZmFpbChlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xuICB9XG4gIHJldHVybiBuZXh0KCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgX19leHRlbmRzLFxuICBfX2Fzc2lnbixcbiAgX19yZXN0LFxuICBfX2RlY29yYXRlLFxuICBfX3BhcmFtLFxuICBfX21ldGFkYXRhLFxuICBfX2F3YWl0ZXIsXG4gIF9fZ2VuZXJhdG9yLFxuICBfX2NyZWF0ZUJpbmRpbmcsXG4gIF9fZXhwb3J0U3RhcixcbiAgX192YWx1ZXMsXG4gIF9fcmVhZCxcbiAgX19zcHJlYWQsXG4gIF9fc3ByZWFkQXJyYXlzLFxuICBfX3NwcmVhZEFycmF5LFxuICBfX2F3YWl0LFxuICBfX2FzeW5jR2VuZXJhdG9yLFxuICBfX2FzeW5jRGVsZWdhdG9yLFxuICBfX2FzeW5jVmFsdWVzLFxuICBfX21ha2VUZW1wbGF0ZU9iamVjdCxcbiAgX19pbXBvcnRTdGFyLFxuICBfX2ltcG9ydERlZmF1bHQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRHZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRJbixcbiAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2UsXG4gIF9fZGlzcG9zZVJlc291cmNlcyxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBtYXRlcmlhbHMgZnJvbSBcIkBsdHMvbWF0ZXJpYWxzL2xlZ2FjeS9sZWdhY3ktZnVyXCI7XHJcbmV4cG9ydCB7IG1hdGVyaWFscyB9O1xyXG5leHBvcnQgZGVmYXVsdCBtYXRlcmlhbHM7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==