(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-addons", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-addons"] = factory(require("babylonjs"));
	else
		root["ADDONS"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Maths_math__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/addons/src/htmlMesh/fitStrategy.ts":
/*!*******************************************************!*\
  !*** ../../../dev/addons/src/htmlMesh/fitStrategy.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FitStrategy: () => (/* binding */ FitStrategy)
/* harmony export */ });
var FitStrategyContain = {
    wrapElement: function (element) {
        var sizingElement = document.createElement("div");
        sizingElement.style.display = "flex";
        sizingElement.style.justifyContent = "center";
        sizingElement.style.alignItems = "center";
        var scalingElement = document.createElement("div");
        scalingElement.style.visibility = "hidden";
        scalingElement.appendChild(element);
        sizingElement.appendChild(scalingElement);
        return sizingElement;
    },
    updateSize: function (sizingElement, width, height) {
        var scalingElement = sizingElement.firstElementChild;
        sizingElement.style.width = "".concat(width, "px");
        sizingElement.style.height = "".concat(height, "px");
        var _a = [scalingElement.offsetWidth, scalingElement.offsetHeight], childWidth = _a[0], childHeight = _a[1];
        var scale = Math.min(width / childWidth, height / childHeight);
        scalingElement.style.transform = "scale(".concat(scale, ")");
        scalingElement.style.visibility = "visible";
    },
};
var FitStrategyCover = {
    wrapElement: function (element) {
        var sizingElement = document.createElement("div");
        sizingElement.style.display = "flex";
        sizingElement.style.justifyContent = "center";
        sizingElement.style.alignItems = "center";
        sizingElement.style.overflow = "hidden";
        var scalingElement = document.createElement("div");
        scalingElement.style.visibility = "hidden";
        scalingElement.appendChild(element);
        sizingElement.appendChild(scalingElement);
        return sizingElement;
    },
    updateSize: function (sizingElement, width, height) {
        var scalingElement = sizingElement.firstElementChild;
        sizingElement.style.width = "".concat(width, "px");
        sizingElement.style.height = "".concat(height, "px");
        var _a = [scalingElement.offsetWidth, scalingElement.offsetHeight], childWidth = _a[0], childHeight = _a[1];
        var scale = Math.max(width / childWidth, height / childHeight);
        scalingElement.style.transform = "scale(".concat(scale, ")");
        scalingElement.style.visibility = "visible";
    },
};
var FitStrategyStretch = {
    wrapElement: function (element) {
        var sizingElement = document.createElement("div");
        sizingElement.style.display = "flex";
        sizingElement.style.justifyContent = "center";
        sizingElement.style.alignItems = "center";
        var scalingElement = document.createElement("div");
        scalingElement.style.visibility = "hidden";
        scalingElement.appendChild(element);
        sizingElement.appendChild(scalingElement);
        return sizingElement;
    },
    updateSize: function (sizingElement, width, height) {
        var scalingElement = sizingElement.firstElementChild;
        sizingElement.style.width = "".concat(width, "px");
        sizingElement.style.height = "".concat(height, "px");
        var _a = [scalingElement.offsetWidth, scalingElement.offsetHeight], childWidth = _a[0], childHeight = _a[1];
        scalingElement.style.transform = "scale(".concat(width / childWidth, ", ").concat(height / childHeight, ")");
        scalingElement.style.visibility = "visible";
    },
};
var FitStrategyNone = {
    wrapElement: function (element) {
        return element;
    },
    updateSize: function (sizingElement, width, height) {
        if (sizingElement) {
            sizingElement.style.width = "".concat(width, "px");
            sizingElement.style.height = "".concat(height, "px");
        }
    },
};
var FitStrategy = {
    CONTAIN: FitStrategyContain,
    COVER: FitStrategyCover,
    STRETCH: FitStrategyStretch,
    NONE: FitStrategyNone,
};


/***/ }),

/***/ "../../../dev/addons/src/htmlMesh/htmlMesh.ts":
/*!****************************************************!*\
  !*** ../../../dev/addons/src/htmlMesh/htmlMesh.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HtmlMesh: () => (/* binding */ HtmlMesh)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/logger */ "babylonjs/Maths/math");
/* harmony import */ var babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pointerEventsCaptureBehavior__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pointerEventsCaptureBehavior */ "../../../dev/addons/src/htmlMesh/pointerEventsCaptureBehavior.ts");
/* harmony import */ var _fitStrategy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fitStrategy */ "../../../dev/addons/src/htmlMesh/fitStrategy.ts");








/**
 * This class represents HTML content that we want to render as though it is part of the scene.  The HTML content is actually
 * rendered below the canvas, but a depth mask is created by this class that writes to the depth buffer but does not
 * write to the color buffer, effectively punching a hole in the canvas.  CSS transforms are used to scale, translate, and rotate
 * the HTML content so that it matches the camera and mesh orientation.  The class supports interactions in editable and non-editable mode.
 * In non-editable mode (the default), events are passed to the HTML content when the pointer is over the mask (and not occluded by other meshes
 * in the scene).
 * #HVHYJC#5
 * #B17TC7#112
 */
var HtmlMesh = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__extends)(HtmlMesh, _super);
    /**
     * Contruct an instance of HtmlMesh
     * @param scene
     * @param id The id of the mesh.  Will be used as the id of the HTML element as well.
     * @param options object with optional parameters
     */
    function HtmlMesh(scene, id, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.captureOnPointerEnter, captureOnPointerEnter = _c === void 0 ? true : _c, _d = _b.isCanvasOverlay, isCanvasOverlay = _d === void 0 ? false : _d, _e = _b.fitStrategy, fitStrategy = _e === void 0 ? _fitStrategy__WEBPACK_IMPORTED_MODULE_2__.FitStrategy.NONE : _e;
        var _this = _super.call(this, id, scene) || this;
        // Override the super class's _isEnabled property so we can control when the mesh
        // is enabled.  I.e., we don't want to render the mesh until there is content to show.
        _this._enabled = false;
        // The mesh is ready when content has been set and the content size has been set
        // The former is done by the user, the latter is done by the renderer.
        _this._ready = false;
        /**
         * @internal
         */
        _this._isCanvasOverlay = false;
        _this._requiresUpdate = true;
        _this._inverseScaleMatrix = null;
        _this._captureOnPointerEnter = true;
        _this._pointerEventCaptureBehavior = null;
        _this._sourceWidth = null;
        _this._sourceHeight = null;
        _this._fitStrategy = _fitStrategy__WEBPACK_IMPORTED_MODULE_2__.FitStrategy.NONE;
        // Requires a browser to work.  Bail if we aren't running in a browser
        if (typeof document === "undefined") {
            babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("Creating an instance of an HtmlMesh with id ".concat(id, " outside of a browser.  The mesh will not be visible."));
            return _this;
        }
        _this._fitStrategy = fitStrategy;
        _this._isCanvasOverlay = isCanvasOverlay;
        _this._createMask();
        _this._element = _this._createElement();
        // Set enabled by default, so this will show as soon as it's ready
        _this.setEnabled(true);
        _this._captureOnPointerEnter = captureOnPointerEnter;
        // Create a behavior to capture pointer events
        _this._pointerEventCaptureBehavior = new _pointerEventsCaptureBehavior__WEBPACK_IMPORTED_MODULE_1__.PointerEventsCaptureBehavior(_this.capturePointerEvents.bind(_this), _this.releasePointerEvents.bind(_this), {
            captureOnPointerEnter: _this._captureOnPointerEnter,
        });
        _this.addBehavior(_this._pointerEventCaptureBehavior);
        return _this;
    }
    Object.defineProperty(HtmlMesh.prototype, "isHtmlMesh", {
        /**
         * Helps identifying a html mesh from a regular mesh
         */
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HtmlMesh.prototype, "sourceWidth", {
        /**
         * Return the source width of the content in pixels
         */
        get: function () {
            return this._sourceWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HtmlMesh.prototype, "sourceHeight", {
        /**
         * Return the source height of the content in pixels
         */
        get: function () {
            return this._sourceHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HtmlMesh.prototype, "width", {
        /**
         * The width of the content in pixels
         */
        get: function () {
            return this._width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HtmlMesh.prototype, "height", {
        /**
         * The height of the content in pixels
         */
        get: function () {
            return this._height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HtmlMesh.prototype, "element", {
        /**
         * The HTML element that is being rendered as a mesh
         */
        get: function () {
            return this._element;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HtmlMesh.prototype, "requiresUpdate", {
        /**
         * True if the mesh has been moved, rotated, or scaled since the last time this
         * property was read.  This property is reset to false after reading.
         */
        get: function () {
            return this._requiresUpdate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HtmlMesh.prototype, "captureOnPointerEnter", {
        /**
         * Enable capture for the pointer when entering the mesh area
         */
        set: function (captureOnPointerEnter) {
            this._captureOnPointerEnter = captureOnPointerEnter;
            if (this._pointerEventCaptureBehavior) {
                this._pointerEventCaptureBehavior.captureOnPointerEnter = captureOnPointerEnter;
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Disposes of the mesh and the HTML element
     */
    HtmlMesh.prototype.dispose = function () {
        var _a;
        _super.prototype.dispose.call(this);
        (_a = this._element) === null || _a === void 0 ? void 0 : _a.remove();
        this._element = undefined;
        if (this._pointerEventCaptureBehavior) {
            this._pointerEventCaptureBehavior.dispose();
            this._pointerEventCaptureBehavior = null;
        }
    };
    /**
     * @internal
     */
    HtmlMesh.prototype._markAsUpdated = function () {
        this._requiresUpdate = false;
    };
    /**
     * Sets the content of the element to the specified content adjusting the mesh scale to match and making it visible.
     * If the the specified content is undefined, then it will make the mesh invisible.  In either case it will clear the
     * element content first.
     * @param element The element to render as a mesh
     * @param width The width of the mesh in Babylon units
     * @param height The height of the mesh in Babylon units
     */
    HtmlMesh.prototype.setContent = function (element, width, height) {
        // If content is changed, we are no longer ready
        this._setAsReady(false);
        // Also invalidate the source width and height
        this._sourceWidth = null;
        this._sourceHeight = null;
        if (!this._element) {
            return;
        }
        this._width = width;
        this._height = height;
        this._requiresUpdate = true;
        this.scaling.setAll(1);
        if (element) {
            this._element.appendChild(this._fitStrategy.wrapElement(element));
            this._updateScaleIfNecessary();
        }
        if (this.sourceWidth && this.sourceHeight) {
            this._setAsReady(true);
        }
    };
    // Overides BABYLON.Mesh.setEnabled
    HtmlMesh.prototype.setEnabled = function (enabled) {
        // Capture requested enabled state
        this._enabled = enabled;
        // If disabling or enabling and we are ready
        if (!enabled || this._ready) {
            this._doSetEnabled(enabled);
        }
    };
    /**
     * Sets the content size in pixels
     * @param width width of the source
     * @param height height of the source
     */
    HtmlMesh.prototype.setContentSizePx = function (width, height) {
        this._sourceWidth = width;
        this._sourceHeight = height;
        if (!this._element || !this._element.firstElementChild) {
            return;
        }
        this._fitStrategy.updateSize(this._element.firstElementChild, width, height);
        this._updateScaleIfNecessary();
        if (this.width && this.height) {
            this._setAsReady(true);
        }
    };
    HtmlMesh.prototype._setAsReady = function (ready) {
        this._ready = ready;
        if (ready) {
            this._doSetEnabled(this._enabled);
        }
        else {
            this._doSetEnabled(false);
        }
    };
    HtmlMesh.prototype._doSetEnabled = function (enabled) {
        var _this = this;
        var _a;
        if (!this._element) {
            return;
        }
        //if enabled, then start listening for changes to the
        // scaling, rotation, and position.  otherwise stop listening
        if (enabled && !this._worldMatrixUpdateObserver) {
            this._worldMatrixUpdateObserver = this.onAfterWorldMatrixUpdateObservable.add(function () {
                _this._requiresUpdate = true;
            });
        }
        else if (!enabled) {
            (_a = this._worldMatrixUpdateObserver) === null || _a === void 0 ? void 0 : _a.remove();
            this._worldMatrixUpdateObserver = null;
        }
        // If enabled, then revert the content element display
        // otherwise hide it
        this._element.style.display = enabled ? "" : "none";
        // Capture the content z index
        this._setElementZIndex(this.position.z * -10000);
        _super.prototype.setEnabled.call(this, enabled);
    };
    HtmlMesh.prototype._updateScaleIfNecessary = function () {
        // If we have setContent before, the content scale is baked into the mesh.  If we don't reset the vertices to
        // the original size, then we will multiply the scale when we bake the scale below.  By applying the inverse, we back out
        // the scaling that has been done so we are starting from the same point.
        // First reset the scale to 1
        this.scaling.setAll(1);
        // Then back out the original vertices changes to match the content scale
        if (this._inverseScaleMatrix) {
            this.bakeTransformIntoVertices(this._inverseScaleMatrix);
            // Clear out the matrix so it doesn't get applied again unless we scale
            this._inverseScaleMatrix = null;
        }
        // Set scale to match content.  Note we can't just scale the mesh, because that will scale the content as well
        // What we need to do is compute a scale matrix and then bake that into the mesh vertices.  This will leave the
        // mesh scale at 1, so our content will stay it's original width and height until we scale the mesh.
        var scaleX = this._width || 1;
        var scaleY = this._height || 1;
        var scaleMatrix = babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.Matrix.Scaling(scaleX, scaleY, 1);
        this.bakeTransformIntoVertices(scaleMatrix);
        // Get an inverse of the scale matrix that we can use to back out the scale changes we have made so
        // we don't multiply the scale.
        this._inverseScaleMatrix = new babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.Matrix();
        scaleMatrix.invertToRef(this._inverseScaleMatrix);
    };
    HtmlMesh.prototype._createMask = function () {
        var vertexData = (0,babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.CreatePlaneVertexData)({ width: 1, height: 1 });
        vertexData.applyToMesh(this);
        var scene = this.getScene();
        this.checkCollisions = true;
        var depthMask = new babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.StandardMaterial("".concat(this.id, "-mat"), scene);
        if (!this._isCanvasOverlay) {
            depthMask.backFaceCulling = false;
            depthMask.disableColorWrite = true;
            depthMask.disableLighting = true;
        }
        this.material = depthMask;
        // Optimization - Freeze material since it never needs to change
        this.material.freeze();
    };
    HtmlMesh.prototype._setElementZIndex = function (zIndex) {
        if (this._element) {
            this._element.style.zIndex = "".concat(zIndex);
        }
    };
    /**
     * Callback used by the PointerEventsCaptureBehavior to capture pointer events
     */
    HtmlMesh.prototype.capturePointerEvents = function () {
        if (!this._element) {
            return;
        }
        // Enable dom content to capture pointer events
        this._element.style.pointerEvents = "auto";
        // Supress events outside of the dom content
        document.getElementsByTagName("body")[0].style.pointerEvents = "none";
    };
    /**
     * Callback used by the PointerEventsCaptureBehavior to release pointer events
     */
    HtmlMesh.prototype.releasePointerEvents = function () {
        if (!this._element) {
            return;
        }
        // Enable pointer events on canvas
        document.getElementsByTagName("body")[0].style.pointerEvents = "auto";
        // Disable pointer events on dom content
        this._element.style.pointerEvents = "none";
    };
    HtmlMesh.prototype._createElement = function () {
        // Requires a browser to work.  Bail if we aren't running in a browser
        if (typeof document === "undefined") {
            return;
        }
        var div = document.createElement("div");
        div.id = this.id;
        div.style.backgroundColor = this._isCanvasOverlay ? "transparent" : "#000";
        div.style.zIndex = "1";
        div.style.position = "absolute";
        div.style.pointerEvents = "none";
        div.style.backfaceVisibility = "hidden";
        return div;
    };
    return HtmlMesh;
}(babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.Mesh));



/***/ }),

/***/ "../../../dev/addons/src/htmlMesh/htmlMeshRenderer.ts":
/*!************************************************************!*\
  !*** ../../../dev/addons/src/htmlMesh/htmlMeshRenderer.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HtmlMeshRenderer: () => (/* binding */ HtmlMeshRenderer)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/logger */ "babylonjs/Maths/math");
/* harmony import */ var babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0__);




var _positionUpdateFailMessage = "Failed to update html mesh renderer position due to failure to get canvas rect.  HtmlMesh instances may not render correctly";
var babylonUnitsToPixels = 100;
// Returns a function that ensures that HtmlMeshes are rendered before all other meshes.
// Note this will only be applied to group 0.
// If neither mesh is an HtmlMesh, then the default render order is used
// This prevents HtmlMeshes from appearing in front of other meshes when they are behind them
var renderOrderFunc = function (defaultRenderOrder) {
    return function (subMeshA, subMeshB) {
        var meshA = subMeshA.getMesh();
        var meshB = subMeshB.getMesh();
        // Use property check instead of instanceof since it is less expensive and
        // this will be called many times per frame
        var meshAIsHtmlMesh = meshA["isHtmlMesh"];
        var meshBIsHtmlMesh = meshB["isHtmlMesh"];
        if (meshAIsHtmlMesh) {
            return meshBIsHtmlMesh ? (meshA.absolutePosition.z <= meshB.absolutePosition.z ? 1 : -1) : -1;
        }
        else {
            return meshBIsHtmlMesh ? 1 : defaultRenderOrder(subMeshA, subMeshB);
        }
    };
};
/**
 * An instance of this is required to render HtmlMeshes in the scene.
 * if using HtmlMeshes, you must not set render order for group 0 using
 * scene.setRenderingOrder.  You must instead pass the compare functions
 * to the HtmlMeshRenderer constructor.  If you do not, then your render
 * order will be overwritten if the HtmlMeshRenderer is created after and
 * the HtmlMeshes will not render correctly (they will appear in front of
 * meshes that are actually in front of them) if the HtmlMeshRenderer is
 * created before.
 */
var HtmlMeshRenderer = /** @class */ (function () {
    /**
     * Contruct an instance of HtmlMeshRenderer
     * @param scene
     * @param options object containing the following optional properties:
     * @returns
     */
    function HtmlMeshRenderer(scene, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.parentContainerId, parentContainerId = _c === void 0 ? null : _c, _d = _b._containerId, _containerId = _d === void 0 ? "css-container" : _d, _e = _b.enableOverlayRender, enableOverlayRender = _e === void 0 ? true : _e, _f = _b.defaultOpaqueRenderOrder, defaultOpaqueRenderOrder = _f === void 0 ? babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0__.RenderingGroup.PainterSortCompare : _f, _g = _b.defaultAlphaTestRenderOrder, defaultAlphaTestRenderOrder = _g === void 0 ? babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0__.RenderingGroup.PainterSortCompare : _g, _h = _b.defaultTransparentRenderOrder, defaultTransparentRenderOrder = _h === void 0 ? babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0__.RenderingGroup.defaultTransparentSortCompare : _h;
        var _this = this;
        this._cache = {
            cameraData: { fov: 0, position: new babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3(), style: "" },
            htmlMeshData: new WeakMap(),
        };
        this._width = 0;
        this._height = 0;
        this._heightHalf = 0;
        // Create some refs to avoid creating new objects every frame
        this._temp = {
            scaleTransform: new babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3(),
            rotationTransform: new babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Quaternion(),
            positionTransform: new babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Vector3(),
            objectMatrix: babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Matrix.Identity(),
            cameraWorldMatrix: babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Matrix.Identity(),
            cameraRotationMatrix: babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Matrix.Identity(),
            cameraWorldMatrixAsArray: new Array(16),
        };
        // Keep track of DPR so we can resize if DPR changes
        // Otherwise the DOM content will scale, but the mesh won't
        this._lastDevicePixelRatio = window.devicePixelRatio;
        // Keep track of camera matrix changes so we only update the
        // DOM element styles when necessary
        this._cameraMatrixUpdated = true;
        // Keep track of position changes so we only update the DOM element
        // styles when necessary
        this._previousCanvasDocumentPosition = {
            top: 0,
            left: 0,
        };
        this._renderObserver = null;
        this._onCameraMatrixChanged = function (camera) {
            _this._cameraWorldMatrix = camera.getWorldMatrix();
            _this._cameraMatrixUpdated = true;
        };
        // Requires a browser to work.  Only init if we are in a browser
        if (typeof document === "undefined") {
            return;
        }
        this._containerId = _containerId;
        this._init(scene, parentContainerId, enableOverlayRender, defaultOpaqueRenderOrder, defaultAlphaTestRenderOrder, defaultTransparentRenderOrder);
    }
    /**
     * Dispose of the HtmlMeshRenderer
     */
    HtmlMeshRenderer.prototype.dispose = function () {
        var _a, _b;
        if (this._renderObserver) {
            this._renderObserver.remove();
            this._renderObserver = null;
        }
        (_a = this._overlayElements) === null || _a === void 0 ? void 0 : _a.container.remove();
        this._overlayElements = null;
        (_b = this._inSceneElements) === null || _b === void 0 ? void 0 : _b.container.remove();
        this._inSceneElements = null;
    };
    HtmlMeshRenderer.prototype._init = function (scene, parentContainerId, enableOverlayRender, defaultOpaqueRenderOrder, defaultAlphaTestRenderOrder, defaultTransparentRenderOrder) {
        var _this = this;
        var _a;
        // Requires a browser to work.  Only init if we are in a browser
        if (typeof document === "undefined") {
            return;
        }
        // Create the DOM containers
        var parentContainer = parentContainerId ? document.getElementById(parentContainerId) : document.body;
        if (!parentContainer) {
            parentContainer = document.body;
        }
        // if the container already exists, then remove it
        var inSceneContainerId = "".concat(this._containerId, "_in_scene");
        this._inSceneElements = this._createRenderLayerElements(inSceneContainerId);
        parentContainer.insertBefore(this._inSceneElements.container, parentContainer.firstChild);
        if (enableOverlayRender) {
            var overlayContainerId = "".concat(this._containerId, "_overlay");
            this._overlayElements = this._createRenderLayerElements(overlayContainerId);
            var zIndex = +((_a = scene.getEngine().getRenderingCanvas().style.zIndex) !== null && _a !== void 0 ? _a : "0") + 1;
            this._overlayElements.container.style.zIndex = "".concat(zIndex);
            this._overlayElements.container.style.pointerEvents = "none";
            parentContainer.insertBefore(this._overlayElements.container, parentContainer.firstChild);
        }
        this._engine = scene.getEngine();
        var clientRect = this._engine.getRenderingCanvasClientRect();
        if (!clientRect) {
            throw new Error("Failed to get client rect for rendering canvas");
        }
        // Set the size and resize behavior
        this._setSize(clientRect.width, clientRect.height);
        this._engine.onResizeObservable.add(function () {
            var clientRect = _this._engine.getRenderingCanvasClientRect();
            if (clientRect) {
                _this._setSize(clientRect.width, clientRect.height);
            }
        });
        var projectionObs;
        var matrixObs;
        var observeCamera = function () {
            var camera = scene.activeCamera;
            if (camera) {
                projectionObs = camera.onProjectionMatrixChangedObservable.add(function () {
                    _this._onCameraMatrixChanged(camera);
                });
                matrixObs = camera.onViewMatrixChangedObservable.add(function () {
                    _this._onCameraMatrixChanged(camera);
                });
            }
        };
        observeCamera();
        scene.onActiveCameraChanged.add(function () {
            var _a, _b;
            if (projectionObs) {
                (_a = scene.activeCamera) === null || _a === void 0 ? void 0 : _a.onProjectionMatrixChangedObservable.remove(projectionObs);
            }
            if (matrixObs) {
                (_b = scene.activeCamera) === null || _b === void 0 ? void 0 : _b.onViewMatrixChangedObservable.remove(matrixObs);
            }
            observeCamera();
        });
        // We need to make sure that HtmlMeshes are rendered before all other meshes
        // so that they don't appear in front of meshes that are actually in front of them
        // Updating the render order isn't ideal, but it is the only way to acheive this
        // The implication is that an app using the HtmlMeshRendered must set the scene render order
        // via the HtmlMeshRendered constructor
        var opaqueRenderOrder = renderOrderFunc(defaultOpaqueRenderOrder);
        var alphaTestRenderOrder = renderOrderFunc(defaultAlphaTestRenderOrder);
        var transparentRenderOrder = renderOrderFunc(defaultTransparentRenderOrder);
        scene.setRenderingOrder(0, opaqueRenderOrder, alphaTestRenderOrder, transparentRenderOrder);
        this._renderObserver = scene.onBeforeRenderObservable.add(function () {
            _this._render(scene, scene.activeCamera);
        });
    };
    HtmlMeshRenderer.prototype._createRenderLayerElements = function (containerId) {
        var existingContainer = document.getElementById(containerId);
        if (existingContainer) {
            existingContainer.remove();
        }
        var container = document.createElement("div");
        container.id = containerId;
        container.style.position = "absolute";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.zIndex = "-1";
        var domElement = document.createElement("div");
        domElement.style.overflow = "hidden";
        var cameraElement = document.createElement("div");
        cameraElement.style.webkitTransformStyle = "preserve-3d";
        cameraElement.style.transformStyle = "preserve-3d";
        cameraElement.style.pointerEvents = "none";
        domElement.appendChild(cameraElement);
        container.appendChild(domElement);
        return {
            container: container,
            domElement: domElement,
            cameraElement: cameraElement,
        };
    };
    HtmlMeshRenderer.prototype._getSize = function () {
        return {
            width: this._width,
            height: this._height,
        };
    };
    HtmlMeshRenderer.prototype._setSize = function (width, height) {
        this._width = width;
        this._height = height;
        this._heightHalf = this._height / 2;
        if (!this._inSceneElements || !this._overlayElements) {
            return;
        }
        var domElements = [this._inSceneElements.domElement, this._overlayElements.domElement, this._inSceneElements.cameraElement, this._overlayElements.cameraElement];
        domElements.forEach(function (dom) {
            if (dom) {
                dom.style.width = "".concat(width, "px");
                dom.style.height = "".concat(height, "px");
            }
        });
    };
    // prettier-ignore
    HtmlMeshRenderer.prototype._getCameraCSSMatrix = function (matrix) {
        var elements = matrix.m;
        return "matrix3d(".concat(this._epsilon(elements[0]), ",").concat(this._epsilon(-elements[1]), ",").concat(this._epsilon(elements[2]), ",").concat(this._epsilon(elements[3]), ",").concat(this._epsilon(elements[4]), ",").concat(this._epsilon(-elements[5]), ",").concat(this._epsilon(elements[6]), ",").concat(this._epsilon(elements[7]), ",").concat(this._epsilon(elements[8]), ",").concat(this._epsilon(-elements[9]), ",").concat(this._epsilon(elements[10]), ",").concat(this._epsilon(elements[11]), ",").concat(this._epsilon(elements[12]), ",").concat(this._epsilon(-elements[13]), ",").concat(this._epsilon(elements[14]), ",").concat(this._epsilon(elements[15]), ")");
    };
    // Convert a Babylon world matrix to a CSS matrix
    // This also handles conversion from BJS left handed coords
    // to CSS right handed coords
    // prettier-ignore
    HtmlMeshRenderer.prototype._getHtmlContentCSSMatrix = function (matrix, useRightHandedSystem) {
        var elements = matrix.m;
        // In a right handed coordinate system, the elements 11 to 14 have to change their direction
        var direction = useRightHandedSystem ? -1 : 1;
        var matrix3d = "matrix3d(".concat(this._epsilon(elements[0]), ",").concat(this._epsilon(elements[1]), ",").concat(this._epsilon(elements[2] * -direction), ",").concat(this._epsilon(elements[3]), ",").concat(this._epsilon(-elements[4]), ",").concat(this._epsilon(-elements[5]), ",").concat(this._epsilon(elements[6] * direction), ",").concat(this._epsilon(-elements[7]), ",").concat(this._epsilon(elements[8] * -direction), ",").concat(this._epsilon(elements[9] * -direction), ",").concat(this._epsilon(elements[10]), ",").concat(this._epsilon(elements[11] * direction), ",").concat(this._epsilon(elements[12] * direction), ",").concat(this._epsilon(elements[13] * direction), ",").concat(this._epsilon(elements[14] * direction), ",").concat(this._epsilon(elements[15]), ")");
        return matrix3d;
    };
    HtmlMeshRenderer.prototype._getTransformationMatrix = function (htmlMesh, useRightHandedSystem) {
        var _a;
        // Get the camera world matrix
        // Make sure the camera world matrix is up to date
        if (!this._cameraWorldMatrix) {
            this._cameraWorldMatrix = (_a = htmlMesh.getScene().activeCamera) === null || _a === void 0 ? void 0 : _a.getWorldMatrix();
        }
        if (!this._cameraWorldMatrix) {
            return babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Matrix.Identity();
        }
        var objectWorldMatrix = htmlMesh.getWorldMatrix();
        // Scale the object matrix by the base scale factor for the mesh
        // which is the ratio of the mesh width/height to the renderer
        // width/height divided by the babylon units to pixels ratio
        var widthScaleFactor = 1;
        var heightScaleFactor = 1;
        if (htmlMesh.sourceWidth && htmlMesh.sourceHeight) {
            widthScaleFactor = htmlMesh.width / (htmlMesh.sourceWidth / babylonUnitsToPixels);
            heightScaleFactor = htmlMesh.height / (htmlMesh.sourceHeight / babylonUnitsToPixels);
        }
        // Apply the scale to the object's world matrix.  Note we aren't scaling
        // the object, just getting a matrix as though it were scaled, so we can
        // scale the content
        var scaleTransform = this._temp.scaleTransform;
        var rotationTransform = this._temp.rotationTransform;
        var positionTransform = this._temp.positionTransform;
        var scaledAndTranslatedObjectMatrix = this._temp.objectMatrix;
        objectWorldMatrix.decompose(scaleTransform, rotationTransform, positionTransform);
        scaleTransform.x *= widthScaleFactor;
        scaleTransform.y *= heightScaleFactor;
        babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Matrix.ComposeToRef(scaleTransform, rotationTransform, positionTransform, scaledAndTranslatedObjectMatrix);
        // Adjust direction of 12 and 13 of the transformation matrix based on the handedness of the system
        var direction = useRightHandedSystem ? -1 : 1;
        // Adjust translation values to be from camera vs world origin
        // Note that we are also adjusting these values to be pixels vs Babylon units
        var position = htmlMesh.getAbsolutePosition();
        scaledAndTranslatedObjectMatrix.setRowFromFloats(3, (-this._cameraWorldMatrix.m[12] + position.x) * babylonUnitsToPixels * direction, (-this._cameraWorldMatrix.m[13] + position.y) * babylonUnitsToPixels * direction, (this._cameraWorldMatrix.m[14] - position.z) * babylonUnitsToPixels, this._cameraWorldMatrix.m[15] * 0.00001 * babylonUnitsToPixels);
        // Adjust other values to be pixels vs Babylon units
        scaledAndTranslatedObjectMatrix.multiplyAtIndex(3, babylonUnitsToPixels);
        scaledAndTranslatedObjectMatrix.multiplyAtIndex(7, babylonUnitsToPixels);
        scaledAndTranslatedObjectMatrix.multiplyAtIndex(11, babylonUnitsToPixels);
        return scaledAndTranslatedObjectMatrix;
    };
    HtmlMeshRenderer.prototype._renderHtmlMesh = function (htmlMesh, useRightHandedSystem) {
        var _a, _b;
        if (!htmlMesh.element || !htmlMesh.element.firstElementChild) {
            // nothing to render, so bail
            return;
        }
        // We need to ensure html mesh data is initialized before
        // computing the base scale factor
        var htmlMeshData = this._cache.htmlMeshData.get(htmlMesh);
        if (!htmlMeshData) {
            htmlMeshData = { style: "" };
            this._cache.htmlMeshData.set(htmlMesh, htmlMeshData);
        }
        var cameraElement = htmlMesh._isCanvasOverlay ? (_a = this._overlayElements) === null || _a === void 0 ? void 0 : _a.cameraElement : (_b = this._inSceneElements) === null || _b === void 0 ? void 0 : _b.cameraElement;
        if (htmlMesh.element.parentNode !== cameraElement) {
            cameraElement.appendChild(htmlMesh.element);
        }
        // If the htmlMesh content has changed, update the base scale factor
        if (htmlMesh.requiresUpdate) {
            this._updateBaseScaleFactor(htmlMesh);
        }
        // Get the transformation matrix for the html mesh
        var scaledAndTranslatedObjectMatrix = this._getTransformationMatrix(htmlMesh, useRightHandedSystem);
        var style = "translate(-50%, -50%) ".concat(this._getHtmlContentCSSMatrix(scaledAndTranslatedObjectMatrix, useRightHandedSystem));
        // In a right handed system, screens are on the wrong side of the mesh, so we have to rotate by Math.PI which results in the matrix3d seen below
        style += "".concat(useRightHandedSystem ? "matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)" : "");
        if (htmlMeshData.style !== style) {
            htmlMesh.element.style.webkitTransform = style;
            htmlMesh.element.style.transform = style;
        }
        htmlMesh._markAsUpdated();
    };
    HtmlMeshRenderer.prototype._render = function (scene, camera) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        var needsUpdate = false;
        var useRightHandedSystem = scene.useRightHandedSystem;
        // Update the container position and size if necessary
        this._updateContainerPositionIfNeeded();
        // Check for a camera change
        if (this._cameraMatrixUpdated) {
            this._cameraMatrixUpdated = false;
            needsUpdate = true;
        }
        // If the camera position has changed, then we also need to update
        if (camera.position.x !== this._cache.cameraData.position.x ||
            camera.position.y !== this._cache.cameraData.position.y ||
            camera.position.z !== this._cache.cameraData.position.z) {
            this._cache.cameraData.position.copyFrom(camera.position);
            needsUpdate = true;
        }
        // Check for a dpr change
        if (window.devicePixelRatio !== this._lastDevicePixelRatio) {
            this._lastDevicePixelRatio = window.devicePixelRatio;
            babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Logger.Log("In render - dpr changed: ", this._lastDevicePixelRatio);
            needsUpdate = true;
        }
        // Check if any meshes need to be updated
        var meshesNeedingUpdate = scene.meshes.filter(function (mesh) { return mesh["isHtmlMesh"] && (needsUpdate || mesh.requiresUpdate); });
        needsUpdate = needsUpdate || meshesNeedingUpdate.length > 0;
        if (!needsUpdate) {
            return;
        }
        // Get a projection matrix for the camera
        var projectionMatrix = camera.getProjectionMatrix();
        var fov = projectionMatrix.m[5] * this._heightHalf;
        if (this._cache.cameraData.fov !== fov) {
            if (camera.mode == babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Camera.PERSPECTIVE_CAMERA) {
                [(_a = this._overlayElements) === null || _a === void 0 ? void 0 : _a.domElement, (_b = this._inSceneElements) === null || _b === void 0 ? void 0 : _b.domElement].forEach(function (el) {
                    if (el) {
                        el.style.webkitPerspective = fov + "px";
                        el.style.perspective = fov + "px";
                    }
                });
            }
            else {
                [(_c = this._overlayElements) === null || _c === void 0 ? void 0 : _c.domElement, (_d = this._inSceneElements) === null || _d === void 0 ? void 0 : _d.domElement].forEach(function (el) {
                    if (el) {
                        el.style.webkitPerspective = "";
                        el.style.perspective = "";
                    }
                });
            }
            this._cache.cameraData.fov = fov;
        }
        // Get the CSS matrix for the camera (which will include any camera rotation)
        if (camera.parent === null) {
            camera.computeWorldMatrix();
        }
        var cameraMatrixWorld = this._temp.cameraWorldMatrix;
        cameraMatrixWorld.copyFrom(camera.getWorldMatrix());
        var cameraRotationMatrix = this._temp.cameraRotationMatrix;
        cameraMatrixWorld.getRotationMatrix().transposeToRef(cameraRotationMatrix);
        var cameraMatrixWorldAsArray = this._temp.cameraWorldMatrixAsArray;
        cameraMatrixWorld.copyToArray(cameraMatrixWorldAsArray);
        // For a few values, we have to adjust the direction based on the handedness of the system
        var direction = useRightHandedSystem ? 1 : -1;
        cameraMatrixWorldAsArray[1] = cameraRotationMatrix.m[1];
        cameraMatrixWorldAsArray[2] = cameraRotationMatrix.m[2] * direction;
        cameraMatrixWorldAsArray[4] = cameraRotationMatrix.m[4] * direction;
        cameraMatrixWorldAsArray[6] = cameraRotationMatrix.m[6] * direction;
        cameraMatrixWorldAsArray[8] = cameraRotationMatrix.m[8] * direction;
        cameraMatrixWorldAsArray[9] = cameraRotationMatrix.m[9] * direction;
        babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Matrix.FromArrayToRef(cameraMatrixWorldAsArray, 0, cameraMatrixWorld);
        var cameraCSSMatrix = this._getCameraCSSMatrix(cameraMatrixWorld);
        var style = cameraCSSMatrix;
        if (this._cache.cameraData.style !== style) {
            [(_e = this._inSceneElements) === null || _e === void 0 ? void 0 : _e.cameraElement, (_f = this._overlayElements) === null || _f === void 0 ? void 0 : _f.cameraElement].forEach(function (el) {
                if (el) {
                    el.style.webkitTransform = style;
                    el.style.transform = style;
                }
            });
            this._cache.cameraData.style = style;
        }
        // _Render objects if necessary
        meshesNeedingUpdate.forEach(function (mesh) {
            _this._renderHtmlMesh(mesh, useRightHandedSystem);
        });
    };
    HtmlMeshRenderer.prototype._updateBaseScaleFactor = function (htmlMesh) {
        // Get screen width and height
        var screenWidth = this._width;
        var screenHeight = this._height;
        // Calculate aspect ratios
        var htmlMeshAspectRatio = (htmlMesh.width || 1) / (htmlMesh.height || 1);
        var screenAspectRatio = screenWidth / screenHeight;
        // Adjust screen dimensions based on aspect ratios
        if (htmlMeshAspectRatio > screenAspectRatio) {
            // If the HTML mesh is wider relative to its height than the screen, adjust the screen width
            screenWidth = screenHeight * htmlMeshAspectRatio;
        }
        else {
            // If the HTML mesh is taller relative to its width than the screen, adjust the screen height
            screenHeight = screenWidth / htmlMeshAspectRatio;
        }
        // Set content to fill screen so we get max resolution when it is shrunk to fit the mesh
        htmlMesh.setContentSizePx(screenWidth, screenHeight);
    };
    HtmlMeshRenderer.prototype._updateContainerPositionIfNeeded = function () {
        var _this = this;
        var _a, _b;
        // Determine if the canvas has moved on the screen
        var canvasRect = this._engine.getRenderingCanvasClientRect();
        // canvas rect may be null if layout not complete
        if (!canvasRect) {
            babylonjs_Maths_math__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn(_positionUpdateFailMessage);
            return;
        }
        var scrollTop = window.scrollY;
        var scrollLeft = window.scrollX;
        var canvasDocumentTop = canvasRect.top + scrollTop;
        var canvasDocumentLeft = canvasRect.left + scrollLeft;
        if (this._previousCanvasDocumentPosition.top !== canvasDocumentTop || this._previousCanvasDocumentPosition.left !== canvasDocumentLeft) {
            this._previousCanvasDocumentPosition.top = canvasDocumentTop;
            this._previousCanvasDocumentPosition.left = canvasDocumentLeft;
            [(_a = this._inSceneElements) === null || _a === void 0 ? void 0 : _a.container, (_b = this._overlayElements) === null || _b === void 0 ? void 0 : _b.container].forEach(function (container) {
                if (!container) {
                    return;
                }
                // set the top and left of the css container to match the canvas
                var containerParent = container.offsetParent;
                var parentRect = containerParent.getBoundingClientRect();
                var parentDocumentTop = parentRect.top + scrollTop;
                var parentDocumentLeft = parentRect.left + scrollLeft;
                var ancestorMarginsAndPadding = _this._getAncestorMarginsAndPadding(containerParent);
                // Add the body margin
                var bodyStyle = window.getComputedStyle(document.body);
                var bodyMarginTop = parseInt(bodyStyle.marginTop, 10);
                var bodyMarginLeft = parseInt(bodyStyle.marginLeft, 10);
                container.style.top = "".concat(canvasDocumentTop - parentDocumentTop - ancestorMarginsAndPadding.marginTop + ancestorMarginsAndPadding.paddingTop + bodyMarginTop, "px");
                container.style.left = "".concat(canvasDocumentLeft - parentDocumentLeft - ancestorMarginsAndPadding.marginLeft + ancestorMarginsAndPadding.paddingLeft + bodyMarginLeft, "px");
            });
        }
    };
    HtmlMeshRenderer.prototype._epsilon = function (value) {
        return Math.abs(value) < 1e-10 ? 0 : value;
    };
    // Get total margins and padding for an element, excluding the body and document margins
    HtmlMeshRenderer.prototype._getAncestorMarginsAndPadding = function (element) {
        var marginTop = 0;
        var marginLeft = 0;
        var paddingTop = 0;
        var paddingLeft = 0;
        while (element && element !== document.body && element !== document.documentElement) {
            var style = window.getComputedStyle(element);
            marginTop += parseInt(style.marginTop, 10);
            marginLeft += parseInt(style.marginLeft, 10);
            paddingTop += parseInt(style.paddingTop, 10);
            paddingLeft += parseInt(style.paddingLeft, 10);
            element = element.offsetParent;
        }
        return { marginTop: marginTop, marginLeft: marginLeft, paddingTop: paddingTop, paddingLeft: paddingLeft };
    };
    return HtmlMeshRenderer;
}());



/***/ }),

/***/ "../../../dev/addons/src/htmlMesh/index.ts":
/*!*************************************************!*\
  !*** ../../../dev/addons/src/htmlMesh/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FitStrategy: () => (/* reexport safe */ _fitStrategy__WEBPACK_IMPORTED_MODULE_3__.FitStrategy),
/* harmony export */   HtmlMesh: () => (/* reexport safe */ _htmlMesh__WEBPACK_IMPORTED_MODULE_1__.HtmlMesh),
/* harmony export */   HtmlMeshRenderer: () => (/* reexport safe */ _htmlMeshRenderer__WEBPACK_IMPORTED_MODULE_0__.HtmlMeshRenderer),
/* harmony export */   PointerEventsCaptureBehavior: () => (/* reexport safe */ _pointerEventsCaptureBehavior__WEBPACK_IMPORTED_MODULE_2__.PointerEventsCaptureBehavior)
/* harmony export */ });
/* harmony import */ var _htmlMeshRenderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./htmlMeshRenderer */ "../../../dev/addons/src/htmlMesh/htmlMeshRenderer.ts");
/* harmony import */ var _htmlMesh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./htmlMesh */ "../../../dev/addons/src/htmlMesh/htmlMesh.ts");
/* harmony import */ var _pointerEventsCaptureBehavior__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pointerEventsCaptureBehavior */ "../../../dev/addons/src/htmlMesh/pointerEventsCaptureBehavior.ts");
/* harmony import */ var _fitStrategy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fitStrategy */ "../../../dev/addons/src/htmlMesh/fitStrategy.ts");




// Export public classes and functions



/***/ }),

/***/ "../../../dev/addons/src/htmlMesh/pointerEventsCapture.ts":
/*!****************************************************************!*\
  !*** ../../../dev/addons/src/htmlMesh/pointerEventsCapture.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCapturingId: () => (/* binding */ getCapturingId),
/* harmony export */   releaseCurrent: () => (/* binding */ releaseCurrent),
/* harmony export */   requestCapture: () => (/* binding */ requestCapture),
/* harmony export */   requestRelease: () => (/* binding */ requestRelease)
/* harmony export */ });
/* harmony import */ var babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/tools */ "babylonjs/Maths/math");
/* harmony import */ var babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__);

var captureRequestQueue = [];
// Key is request id, value is object with capture and release callbacks
var pendingRequestCallbacks = new Map();
// Keep track of release requests with no matching capture request
// in case the release request arrived before the capture to avoid
// the capture request never getting released.
var unmatchedReleaseRequests = [];
var currentOwner = null; // Called on first capture or release request
/**
 * Get the id of the object currently capturing pointer events
 * @returns The id of the object currently capturing pointer events
 * or null if no object is capturing pointer events
 */
var getCapturingId = function () {
    return currentOwner;
};
/**
 * Request that the object with the given id capture pointer events.  If there is no current
 * owner, then the request is granted immediately.  If there is a current owner, then the request
 * is queued until the current owner releases pointer events.
 * @param requestId An id to identify the request.  This id will be used to match the capture
 * request with the release request.
 * @param captureCallback The callback to call when the request is granted and the object is capturing
 * @param releaseCallback The callback to call when the object is no longer capturing pointer events
 */
var requestCapture = function (requestId, captureCallback, releaseCallback) {
    debugLog("In pointerEventsCapture.requestCapture - Pointer events capture requested for ".concat(requestId));
    // If there is a release for this request, then ignore the request
    if (removeUnmatchedRequest(requestId)) {
        debugLog("In pointerEventsCapture.requestCapture - Capture request matched previous release request ".concat(requestId, ".  Cancelling capture request"));
        return;
    }
    else if (requestId !== currentOwner) {
        // if the request is not already in the queue, add it to the queue
        enqueueCaptureRequest(requestId, captureCallback, releaseCallback);
    }
    if (!currentOwner) {
        // If there is no current owner, go ahead and grant the request
        transferPointerEventsOwnership();
    }
    // If the request id is the current owner, do nothing
};
/**
 * Release pointer events from the object with the given id.  If the object is the current owner
 * then pointer events are released immediately.  If the object is not the current owner, then the
 * associated capture request is removed from the queue.  If there is no matching capture request
 * in the queue, then the release request is added to a list of unmatched release requests and will
 * negate the next capture request with the same id.  This is to guard against the possibility that
 * the release request arrived before the capture request.
 * @param requestId The id which should match the id of the capture request
 */
var requestRelease = function (requestId) {
    debugLog("In pointerEventsCapture.requestRelease - Pointer events release requested for ".concat(requestId));
    // if the requestId is the current capture holder release it
    if (!requestId || requestId === currentOwner) {
        transferPointerEventsOwnership();
    }
    else if (cancelRequest(requestId)) {
        // if the request is in the queue, but not the current capture holder, remove it and it's callbacks
        pendingRequestCallbacks.delete(requestId);
    }
    else {
        debugLog("In pointerEventsCapture.requestRelease - Received release request ".concat(requestId, " but no matching capture request was received"));
        // request was not current and not in queue, likely because we received a release
        // request before the capture.  Add it to the unmatched list to guard against this possibility
        if (!unmatchedReleaseRequests.includes(requestId)) {
            unmatchedReleaseRequests.push(requestId);
        }
    }
};
/**
 * Relase pointer events from the current owner
 */
var releaseCurrent = function () {
    requestRelease(currentOwner);
};
var enqueueCaptureRequest = function (requestId, capture, release) {
    debugLog("In pointerEventsCapture.enqueueCaptureRequest - Enqueueing capture request for  ".concat(requestId));
    if (!captureRequestQueue.includes(requestId)) {
        captureRequestQueue.push(requestId);
        pendingRequestCallbacks.set(requestId, { capture: capture, release: release });
    }
};
// Removes the request from the queue if it exists.  Returns true
// if the request was found and removed, otherwise false
var cancelRequest = function (requestId) {
    var removed = false;
    captureRequestQueue = captureRequestQueue.filter(function (id) {
        if (id !== requestId) {
            return true;
        }
        else {
            removed = true;
            debugLog("In pointerEventsCapture.cancelRequest - Canceling pointer events capture request ".concat(requestId));
            return false;
        }
    });
    return removed;
};
var removeUnmatchedRequest = function (requestId) {
    var removed = false;
    unmatchedReleaseRequests = unmatchedReleaseRequests.filter(function (id) {
        if (id !== requestId) {
            return true;
        }
        else {
            removed = true;
            return false;
        }
    });
    return removed;
};
var transferPointerEventsOwnership = function () {
    var newOwnerId = nextCaptureRequest();
    debugLog("In pointerEventsCapture.transferPointerEventsOwnership - Transferrring pointer events from ".concat(currentOwner, " to ").concat(newOwnerId));
    // Release the current owner
    doRelease();
    if (newOwnerId) {
        doCapture(newOwnerId);
    }
};
var doRelease = function () {
    var _a;
    debugLog("In pointerEventsCapture.doRelease - Releasing pointer events from ".concat(currentOwner));
    if (currentOwner) {
        // call the release callback
        (_a = pendingRequestCallbacks.get(currentOwner)) === null || _a === void 0 ? void 0 : _a.release();
        // And remove the callbacks
        pendingRequestCallbacks.delete(currentOwner);
        currentOwner = null;
    }
};
var doCapture = function (newOwnerId) {
    var _a;
    if (newOwnerId) {
        // call the capture callback
        (_a = pendingRequestCallbacks.get(newOwnerId)) === null || _a === void 0 ? void 0 : _a.capture();
    }
    currentOwner = newOwnerId;
    debugLog("In pointerEventsCapture.doCapture - Pointer events now captured by ".concat(newOwnerId));
};
var nextCaptureRequest = function () {
    return captureRequestQueue.length > 0 ? captureRequestQueue.shift() : null;
};
var debugLog = function (message) {
    // If we are runnning in a test runner (in node, so window is not defined)
    // or if the debug flag is set, then log the message
    if (typeof window === "undefined" || window["pointer-events-capture-debug"]) {
        babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Tools.Log("".concat(performance.now(), " - game.scene.pointerEvents - ").concat(message, "\ncurrentOwner: ").concat(currentOwner, "\nqueue: ").concat(captureRequestQueue, "\nunmatched: ").concat(unmatchedReleaseRequests));
    }
};
// #endregion Debugging support


/***/ }),

/***/ "../../../dev/addons/src/htmlMesh/pointerEventsCaptureBehavior.ts":
/*!************************************************************************!*\
  !*** ../../../dev/addons/src/htmlMesh/pointerEventsCaptureBehavior.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PointerEventsCaptureBehavior: () => (/* binding */ PointerEventsCaptureBehavior)
/* harmony export */ });
/* harmony import */ var babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/logger */ "babylonjs/Maths/math");
/* harmony import */ var babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pointerEventsCapture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pointerEventsCapture */ "../../../dev/addons/src/htmlMesh/pointerEventsCapture.ts");


// Module level variable for holding the current scene
var _scene = null;
// Module level variable to hold the count of behavior instances that are currently capturing pointer events
// on entry.  This is used to determine if we need to start or stop observing pointer movement.
var captureOnEnterCount = 0;
// Map used to store instance of the PointerEventsCaptureBehavior for a mesh
// We do this because this gets checked on pointer move and we don't want to
// use getBehaviorByName() because that is a linear search
var meshToBehaviorMap = new WeakMap();
var startCaptureOnEnter = function (scene) {
    // If we are not in a browser, do nothing
    if (typeof document === "undefined") {
        return;
    }
    if (captureOnEnterCount === 0) {
        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("touchstart", onPointerMove);
        _scene = _scene !== null && _scene !== void 0 ? _scene : scene;
        babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.Log("PointerEventsCaptureBehavior: Starting observation of pointer move events.");
        _scene.onDisposeObservable.add(doStopCaptureOnEnter);
    }
    captureOnEnterCount++;
};
var doStopCaptureOnEnter = function () {
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("touchstart", onPointerMove);
    _scene = null;
    babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.Log("PointerEventsCaptureBehavior: Stopping observation of pointer move events.");
    captureOnEnterCount = 0;
};
var stopCaptureOnEnter = function () {
    // If we are not in a browser, do nothing
    if (typeof document === "undefined") {
        return;
    }
    // If we are not observing pointer movement, do nothing
    if (!_scene) {
        return;
    }
    captureOnEnterCount--;
    if (captureOnEnterCount <= 0) {
        doStopCaptureOnEnter();
    }
};
// Module level function used to determine if an entered mesh should capture pointer events
var onPointerMove = function (evt) {
    if (!_scene) {
        return;
    }
    var canvasRect = _scene.getEngine().getRenderingCanvasClientRect();
    if (!canvasRect) {
        return;
    }
    // Get the object that contains the client X and Y from either the pointer event or from the
    // TouchEvent touch
    var _a = "touches" in evt ? evt.touches[0] : evt, clientX = _a.clientX, clientY = _a.clientY;
    // get the picked mesh, if any
    var pointerScreenX = clientX - canvasRect.left;
    var pointerScreenY = clientY - canvasRect.top;
    var pointerCaptureBehavior;
    var pickResult = _scene.pick(pointerScreenX, pointerScreenY, function (mesh) {
        // If the mesh has an instance of PointerEventsCaptureBehavior attached to it,
        // and capture on pointer enter is true, then we want to pick it
        var pointerCaptureBehavior = meshToBehaviorMap.get(mesh);
        return mesh.isEnabled() && typeof pointerCaptureBehavior !== "undefined" && pointerCaptureBehavior._captureOnPointerEnter;
    });
    var pickedMesh;
    if (pickResult.hit) {
        pickedMesh = pickResult.pickedMesh;
    }
    else {
        pickedMesh = null;
    }
    var capturingIdAsInt = parseInt((0,_pointerEventsCapture__WEBPACK_IMPORTED_MODULE_1__.getCapturingId)() || "");
    // if the picked mesh is the current capturing mesh, do nothing
    if (pickedMesh && pickedMesh.uniqueId === capturingIdAsInt) {
        return;
    }
    // If there is a capturing mesh and it is not the current picked mesh, or no
    // mesh is picked, release the capturing mesh
    if (capturingIdAsInt && (!pickedMesh || pickedMesh.uniqueId !== capturingIdAsInt)) {
        (0,_pointerEventsCapture__WEBPACK_IMPORTED_MODULE_1__.releaseCurrent)();
    }
    // If there is a picked mesh and it is not the current capturing mesh, capture
    // the pointer events.  Note that the current capturing mesh has already been
    // released above
    if (pickedMesh) {
        pointerCaptureBehavior = meshToBehaviorMap.get(pickedMesh);
        pointerCaptureBehavior.capturePointerEvents();
    }
};
/**
 * Behavior for any content that can capture pointer events, i.e. bypass the Babylon pointer event handling
 * and receive pointer events directly.  It will register the capture triggers and negotiate the capture and
 * release of pointer events.  Curerntly this applies only to HtmlMesh
 */
var PointerEventsCaptureBehavior = /** @class */ (function () {
    function PointerEventsCaptureBehavior(_captureCallback, _releaseCallback, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.captureOnPointerEnter, captureOnPointerEnter = _c === void 0 ? true : _c;
        this._captureCallback = _captureCallback;
        this._releaseCallback = _releaseCallback;
        /** gets or sets behavior's name */
        this.name = "PointerEventsCaptureBehavior";
        this._attachedMesh = null;
        this._captureOnPointerEnter = captureOnPointerEnter;
        // Warn if we are not in a browser
        if (typeof document === "undefined") {
            babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("Creating an instance of PointerEventsCaptureBehavior outside of a browser.  The behavior will not work.");
        }
    }
    Object.defineProperty(PointerEventsCaptureBehavior.prototype, "attachedMesh", {
        /**
         * Gets or sets the mesh that the behavior is attached to
         */
        get: function () {
            return this._attachedMesh;
        },
        set: function (value) {
            this._attachedMesh = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PointerEventsCaptureBehavior.prototype, "captureOnPointerEnter", {
        /**
         * Set if the behavior should capture pointer events when the pointer enters the mesh
         */
        set: function (captureOnPointerEnter) {
            if (this._captureOnPointerEnter === captureOnPointerEnter) {
                return;
            }
            this._captureOnPointerEnter = captureOnPointerEnter;
            if (this._attachedMesh) {
                if (this._captureOnPointerEnter) {
                    startCaptureOnEnter(this._attachedMesh.getScene());
                }
                else {
                    stopCaptureOnEnter();
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Function called when the behavior needs to be initialized (before attaching it to a target)
     */
    PointerEventsCaptureBehavior.prototype.init = function () { };
    /**
     * Called when the behavior is attached to a target
     * @param mesh defines the target where the behavior is attached to
     */
    PointerEventsCaptureBehavior.prototype.attach = function (mesh) {
        // Add a reference to this behavior on the mesh.  We do this so we can get a
        // reference to the behavior in the onPointerMove function without relying on
        // getBehaviorByName(), which does a linear search of the behaviors array.
        this.attachedMesh = mesh;
        meshToBehaviorMap.set(mesh, this);
        if (this._captureOnPointerEnter) {
            startCaptureOnEnter(mesh.getScene());
        }
    };
    /**
     * Called when the behavior is detached from its target
     */
    PointerEventsCaptureBehavior.prototype.detach = function () {
        if (!this.attachedMesh) {
            return;
        }
        // Remove the reference to this behavior from the mesh
        meshToBehaviorMap.delete(this.attachedMesh);
        if (this._captureOnPointerEnter) {
            stopCaptureOnEnter();
        }
        this.attachedMesh = null;
    };
    /**
     * Dispose the behavior
     */
    PointerEventsCaptureBehavior.prototype.dispose = function () {
        this.detach();
    };
    // Release pointer events
    PointerEventsCaptureBehavior.prototype.releasePointerEvents = function () {
        if (!this.attachedMesh) {
            return;
        }
        (0,_pointerEventsCapture__WEBPACK_IMPORTED_MODULE_1__.requestRelease)(this.attachedMesh.uniqueId.toString());
    };
    // Capture pointer events
    PointerEventsCaptureBehavior.prototype.capturePointerEvents = function () {
        if (!this.attachedMesh) {
            return;
        }
        (0,_pointerEventsCapture__WEBPACK_IMPORTED_MODULE_1__.requestCapture)(this.attachedMesh.uniqueId.toString(), this._captureCallback, this._releaseCallback);
    };
    return PointerEventsCaptureBehavior;
}());



/***/ }),

/***/ "../../../dev/addons/src/index.ts":
/*!****************************************!*\
  !*** ../../../dev/addons/src/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FitStrategy: () => (/* reexport safe */ _htmlMesh__WEBPACK_IMPORTED_MODULE_0__.FitStrategy),
/* harmony export */   HtmlMesh: () => (/* reexport safe */ _htmlMesh__WEBPACK_IMPORTED_MODULE_0__.HtmlMesh),
/* harmony export */   HtmlMeshRenderer: () => (/* reexport safe */ _htmlMesh__WEBPACK_IMPORTED_MODULE_0__.HtmlMeshRenderer),
/* harmony export */   PointerEventsCaptureBehavior: () => (/* reexport safe */ _htmlMesh__WEBPACK_IMPORTED_MODULE_0__.PointerEventsCaptureBehavior)
/* harmony export */ });
/* harmony import */ var _htmlMesh__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./htmlMesh */ "../../../dev/addons/src/htmlMesh/index.ts");



/***/ }),

/***/ "babylonjs/Maths/math":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Maths_math__;

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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addons: () => (/* reexport module object */ addons_index__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var addons_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! addons/index */ "../../../dev/addons/src/index.ts");
// eslint-disable-next-line import/no-internal-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addons_index__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbmpzLmFkZG9ucy5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBQUE7QUFxREE7Ozs7O0FBS0E7QUFDQTtBQUFBO0FBQ0E7QUFwREE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUVBO0FBTUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQWtCQTtBQVdBO0FBQ0E7QUFDQTs7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQS9FQTtBQUhBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQWdDQTtBQUhBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUtBO0FBSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBeUNBO0FBSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBS0E7QUFIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFLQTtBQUhBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQU1BO0FBSkE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUtBO0FBSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7O0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNVdBO0FBR0E7QUFFQTtBQUdBO0FBR0E7QUFDQTtBQWNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7O0FBU0E7QUFDQTtBQTRDQTs7Ozs7QUFLQTtBQUNBO0FBRUE7QUFGQTtBQTVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFvaUJBO0FBQ0E7QUFDQTtBQUNBO0FBN2dCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFBQTs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBaUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTs7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFBQTs7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbnFCQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFlQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeExBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQW1CQTtBQUdBO0FBRkE7QUFDQTtBQXBCQTtBQUNBO0FBc0JBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBcEJBO0FBSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7OztBQUpBO0FBdUJBO0FBSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbE9BOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3ZZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9BRERPTlMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0FERE9OUy8uLi8uLi8uLi9kZXYvYWRkb25zL3NyYy9odG1sTWVzaC9maXRTdHJhdGVneS50cyIsIndlYnBhY2s6Ly9BRERPTlMvLi4vLi4vLi4vZGV2L2FkZG9ucy9zcmMvaHRtbE1lc2gvaHRtbE1lc2gudHMiLCJ3ZWJwYWNrOi8vQURET05TLy4uLy4uLy4uL2Rldi9hZGRvbnMvc3JjL2h0bWxNZXNoL2h0bWxNZXNoUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vQURET05TLy4uLy4uLy4uL2Rldi9hZGRvbnMvc3JjL2h0bWxNZXNoL2luZGV4LnRzIiwid2VicGFjazovL0FERE9OUy8uLi8uLi8uLi9kZXYvYWRkb25zL3NyYy9odG1sTWVzaC9wb2ludGVyRXZlbnRzQ2FwdHVyZS50cyIsIndlYnBhY2s6Ly9BRERPTlMvLi4vLi4vLi4vZGV2L2FkZG9ucy9zcmMvaHRtbE1lc2gvcG9pbnRlckV2ZW50c0NhcHR1cmVCZWhhdmlvci50cyIsIndlYnBhY2s6Ly9BRERPTlMvLi4vLi4vLi4vZGV2L2FkZG9ucy9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vQURET05TL2V4dGVybmFsIHVtZCB7XCJyb290XCI6XCJCQUJZTE9OXCIsXCJjb21tb25qc1wiOlwiYmFieWxvbmpzXCIsXCJjb21tb25qczJcIjpcImJhYnlsb25qc1wiLFwiYW1kXCI6XCJiYWJ5bG9uanNcIn0iLCJ3ZWJwYWNrOi8vQURET05TLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYubWpzIiwid2VicGFjazovL0FERE9OUy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9BRERPTlMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vQURET05TL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9BRERPTlMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9BRERPTlMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9BRERPTlMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYmFieWxvbmpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiYmFieWxvbmpzLWFkZG9uc1wiLCBbXCJiYWJ5bG9uanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYmFieWxvbmpzLWFkZG9uc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiQURET05TXCJdID0gZmFjdG9yeShyb290W1wiQkFCWUxPTlwiXSk7XG59KSgodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHRoaXMpLCAoX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9iYWJ5bG9uanNfTWF0aHNfbWF0aF9fKSA9PiB7XG5yZXR1cm4gIiwiZXhwb3J0IHR5cGUgRml0U3RyYXRlZ3lUeXBlID0ge1xyXG4gICAgd3JhcEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudDtcclxuICAgIHVwZGF0ZVNpemUoc2l6aW5nRWxlbWVudDogSFRNTEVsZW1lbnQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IEZpdFN0cmF0ZWd5Q29udGFpbjogRml0U3RyYXRlZ3lUeXBlID0ge1xyXG4gICAgd3JhcEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgY29uc3Qgc2l6aW5nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgc2l6aW5nRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgc2l6aW5nRWxlbWVudC5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgc2l6aW5nRWxlbWVudC5zdHlsZS5hbGlnbkl0ZW1zID0gXCJjZW50ZXJcIjtcclxuICAgICAgICBjb25zdCBzY2FsaW5nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgc2NhbGluZ0VsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgc2NhbGluZ0VsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgICAgc2l6aW5nRWxlbWVudC5hcHBlbmRDaGlsZChzY2FsaW5nRWxlbWVudCk7XHJcbiAgICAgICAgcmV0dXJuIHNpemluZ0VsZW1lbnQ7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlU2l6ZShzaXppbmdFbGVtZW50OiBIVE1MRWxlbWVudCwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBzY2FsaW5nRWxlbWVudCA9IHNpemluZ0VsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQhIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHNpemluZ0VsZW1lbnQuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7XHJcbiAgICAgICAgc2l6aW5nRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xyXG5cclxuICAgICAgICBjb25zdCBbY2hpbGRXaWR0aCwgY2hpbGRIZWlnaHRdID0gW3NjYWxpbmdFbGVtZW50IS5vZmZzZXRXaWR0aCwgc2NhbGluZ0VsZW1lbnQhLm9mZnNldEhlaWdodF07XHJcbiAgICAgICAgY29uc3Qgc2NhbGUgPSBNYXRoLm1pbih3aWR0aCAvIGNoaWxkV2lkdGgsIGhlaWdodCAvIGNoaWxkSGVpZ2h0KTtcclxuICAgICAgICBzY2FsaW5nRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoJHtzY2FsZX0pYDtcclxuICAgICAgICBzY2FsaW5nRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuY29uc3QgRml0U3RyYXRlZ3lDb3ZlcjogRml0U3RyYXRlZ3lUeXBlID0ge1xyXG4gICAgd3JhcEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgY29uc3Qgc2l6aW5nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgc2l6aW5nRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgc2l6aW5nRWxlbWVudC5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgc2l6aW5nRWxlbWVudC5zdHlsZS5hbGlnbkl0ZW1zID0gXCJjZW50ZXJcIjtcclxuICAgICAgICBzaXppbmdFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICBjb25zdCBzY2FsaW5nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgc2NhbGluZ0VsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgc2NhbGluZ0VsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgICAgc2l6aW5nRWxlbWVudC5hcHBlbmRDaGlsZChzY2FsaW5nRWxlbWVudCk7XHJcbiAgICAgICAgcmV0dXJuIHNpemluZ0VsZW1lbnQ7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlU2l6ZShzaXppbmdFbGVtZW50OiBIVE1MRWxlbWVudCwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBzY2FsaW5nRWxlbWVudCA9IHNpemluZ0VsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQhIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHNpemluZ0VsZW1lbnQuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7XHJcbiAgICAgICAgc2l6aW5nRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xyXG5cclxuICAgICAgICBjb25zdCBbY2hpbGRXaWR0aCwgY2hpbGRIZWlnaHRdID0gW3NjYWxpbmdFbGVtZW50IS5vZmZzZXRXaWR0aCwgc2NhbGluZ0VsZW1lbnQhLm9mZnNldEhlaWdodF07XHJcbiAgICAgICAgY29uc3Qgc2NhbGUgPSBNYXRoLm1heCh3aWR0aCAvIGNoaWxkV2lkdGgsIGhlaWdodCAvIGNoaWxkSGVpZ2h0KTtcclxuICAgICAgICBzY2FsaW5nRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoJHtzY2FsZX0pYDtcclxuICAgICAgICBzY2FsaW5nRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuY29uc3QgRml0U3RyYXRlZ3lTdHJldGNoOiBGaXRTdHJhdGVneVR5cGUgPSB7XHJcbiAgICB3cmFwRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICBjb25zdCBzaXppbmdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBzaXppbmdFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICBzaXppbmdFbGVtZW50LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJjZW50ZXJcIjtcclxuICAgICAgICBzaXppbmdFbGVtZW50LnN0eWxlLmFsaWduSXRlbXMgPSBcImNlbnRlclwiO1xyXG4gICAgICAgIGNvbnN0IHNjYWxpbmdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBzY2FsaW5nRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICBzY2FsaW5nRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICAgICAgICBzaXppbmdFbGVtZW50LmFwcGVuZENoaWxkKHNjYWxpbmdFbGVtZW50KTtcclxuICAgICAgICByZXR1cm4gc2l6aW5nRWxlbWVudDtcclxuICAgIH0sXHJcbiAgICB1cGRhdGVTaXplKHNpemluZ0VsZW1lbnQ6IEhUTUxFbGVtZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHNjYWxpbmdFbGVtZW50ID0gc2l6aW5nRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCEgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgc2l6aW5nRWxlbWVudC5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcclxuICAgICAgICBzaXppbmdFbGVtZW50LnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XHJcblxyXG4gICAgICAgIGNvbnN0IFtjaGlsZFdpZHRoLCBjaGlsZEhlaWdodF0gPSBbc2NhbGluZ0VsZW1lbnQhLm9mZnNldFdpZHRoLCBzY2FsaW5nRWxlbWVudCEub2Zmc2V0SGVpZ2h0XTtcclxuICAgICAgICBzY2FsaW5nRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoJHt3aWR0aCAvIGNoaWxkV2lkdGh9LCAke2hlaWdodCAvIGNoaWxkSGVpZ2h0fSlgO1xyXG4gICAgICAgIHNjYWxpbmdFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCBGaXRTdHJhdGVneU5vbmU6IEZpdFN0cmF0ZWd5VHlwZSA9IHtcclxuICAgIHdyYXBFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZVNpemUoc2l6aW5nRWxlbWVudDogSFRNTEVsZW1lbnQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHNpemluZ0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgc2l6aW5nRWxlbWVudC5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcclxuICAgICAgICAgICAgc2l6aW5nRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgRml0U3RyYXRlZ3kgPSB7XHJcbiAgICBDT05UQUlOOiBGaXRTdHJhdGVneUNvbnRhaW4sXHJcbiAgICBDT1ZFUjogRml0U3RyYXRlZ3lDb3ZlcixcclxuICAgIFNUUkVUQ0g6IEZpdFN0cmF0ZWd5U3RyZXRjaCxcclxuICAgIE5PTkU6IEZpdFN0cmF0ZWd5Tm9uZSxcclxufTtcclxuIiwiaW1wb3J0IHsgTWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9tZXNoXCI7XHJcbmltcG9ydCB7IENyZWF0ZVBsYW5lVmVydGV4RGF0YSB9IGZyb20gXCJjb3JlL01lc2hlcy9CdWlsZGVycy9wbGFuZUJ1aWxkZXJcIjtcclxuaW1wb3J0IHsgU3RhbmRhcmRNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9zdGFuZGFyZE1hdGVyaWFsXCI7XHJcbmltcG9ydCB7IE1hdHJpeCB9IGZyb20gXCJjb3JlL01hdGhzL21hdGhcIjtcclxuaW1wb3J0IHsgUG9pbnRlckV2ZW50c0NhcHR1cmVCZWhhdmlvciB9IGZyb20gXCIuL3BvaW50ZXJFdmVudHNDYXB0dXJlQmVoYXZpb3JcIjtcclxuaW1wb3J0IHR5cGUgeyBTY2VuZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JlL01pc2MvbG9nZ2VyXCI7XHJcbmltcG9ydCB0eXBlIHsgRml0U3RyYXRlZ3lUeXBlIH0gZnJvbSBcIi4vZml0U3RyYXRlZ3lcIjtcclxuaW1wb3J0IHsgRml0U3RyYXRlZ3kgfSBmcm9tIFwiLi9maXRTdHJhdGVneVwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBIVE1MIGNvbnRlbnQgdGhhdCB3ZSB3YW50IHRvIHJlbmRlciBhcyB0aG91Z2ggaXQgaXMgcGFydCBvZiB0aGUgc2NlbmUuICBUaGUgSFRNTCBjb250ZW50IGlzIGFjdHVhbGx5XHJcbiAqIHJlbmRlcmVkIGJlbG93IHRoZSBjYW52YXMsIGJ1dCBhIGRlcHRoIG1hc2sgaXMgY3JlYXRlZCBieSB0aGlzIGNsYXNzIHRoYXQgd3JpdGVzIHRvIHRoZSBkZXB0aCBidWZmZXIgYnV0IGRvZXMgbm90XHJcbiAqIHdyaXRlIHRvIHRoZSBjb2xvciBidWZmZXIsIGVmZmVjdGl2ZWx5IHB1bmNoaW5nIGEgaG9sZSBpbiB0aGUgY2FudmFzLiAgQ1NTIHRyYW5zZm9ybXMgYXJlIHVzZWQgdG8gc2NhbGUsIHRyYW5zbGF0ZSwgYW5kIHJvdGF0ZVxyXG4gKiB0aGUgSFRNTCBjb250ZW50IHNvIHRoYXQgaXQgbWF0Y2hlcyB0aGUgY2FtZXJhIGFuZCBtZXNoIG9yaWVudGF0aW9uLiAgVGhlIGNsYXNzIHN1cHBvcnRzIGludGVyYWN0aW9ucyBpbiBlZGl0YWJsZSBhbmQgbm9uLWVkaXRhYmxlIG1vZGUuXHJcbiAqIEluIG5vbi1lZGl0YWJsZSBtb2RlICh0aGUgZGVmYXVsdCksIGV2ZW50cyBhcmUgcGFzc2VkIHRvIHRoZSBIVE1MIGNvbnRlbnQgd2hlbiB0aGUgcG9pbnRlciBpcyBvdmVyIHRoZSBtYXNrIChhbmQgbm90IG9jY2x1ZGVkIGJ5IG90aGVyIG1lc2hlc1xyXG4gKiBpbiB0aGUgc2NlbmUpLlxyXG4gKiAjSFZIWUpDIzVcclxuICogI0IxN1RDNyMxMTJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBIdG1sTWVzaCBleHRlbmRzIE1lc2gge1xyXG4gICAgLyoqXHJcbiAgICAgKiBIZWxwcyBpZGVudGlmeWluZyBhIGh0bWwgbWVzaCBmcm9tIGEgcmVndWxhciBtZXNoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaXNIdG1sTWVzaCgpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPdmVycmlkZSB0aGUgc3VwZXIgY2xhc3MncyBfaXNFbmFibGVkIHByb3BlcnR5IHNvIHdlIGNhbiBjb250cm9sIHdoZW4gdGhlIG1lc2hcclxuICAgIC8vIGlzIGVuYWJsZWQuICBJLmUuLCB3ZSBkb24ndCB3YW50IHRvIHJlbmRlciB0aGUgbWVzaCB1bnRpbCB0aGVyZSBpcyBjb250ZW50IHRvIHNob3cuXHJcbiAgICBwcml2YXRlIF9lbmFibGVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gVGhlIG1lc2ggaXMgcmVhZHkgd2hlbiBjb250ZW50IGhhcyBiZWVuIHNldCBhbmQgdGhlIGNvbnRlbnQgc2l6ZSBoYXMgYmVlbiBzZXRcclxuICAgIC8vIFRoZSBmb3JtZXIgaXMgZG9uZSBieSB0aGUgdXNlciwgdGhlIGxhdHRlciBpcyBkb25lIGJ5IHRoZSByZW5kZXJlci5cclxuICAgIHByaXZhdGUgX3JlYWR5ID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9pc0NhbnZhc092ZXJsYXkgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF9yZXF1aXJlc1VwZGF0ZSA9IHRydWU7XHJcblxyXG4gICAgcHJpdmF0ZSBfZWxlbWVudD86IEhUTUxFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBfd2lkdGg/OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9oZWlnaHQ/OiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfaW52ZXJzZVNjYWxlTWF0cml4OiBNYXRyaXggfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9jYXB0dXJlT25Qb2ludGVyRW50ZXI6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBfcG9pbnRlckV2ZW50Q2FwdHVyZUJlaGF2aW9yOiBQb2ludGVyRXZlbnRzQ2FwdHVyZUJlaGF2aW9yIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfc291cmNlV2lkdGg6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfc291cmNlSGVpZ2h0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgc291cmNlIHdpZHRoIG9mIHRoZSBjb250ZW50IGluIHBpeGVsc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHNvdXJjZVdpZHRoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zb3VyY2VXaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgc291cmNlIGhlaWdodCBvZiB0aGUgY29udGVudCBpbiBwaXhlbHNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBzb3VyY2VIZWlnaHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZUhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF93b3JsZE1hdHJpeFVwZGF0ZU9ic2VydmVyOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBfZml0U3RyYXRlZ3k6IEZpdFN0cmF0ZWd5VHlwZSA9IEZpdFN0cmF0ZWd5Lk5PTkU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb250cnVjdCBhbiBpbnN0YW5jZSBvZiBIdG1sTWVzaFxyXG4gICAgICogQHBhcmFtIHNjZW5lXHJcbiAgICAgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSBtZXNoLiAgV2lsbCBiZSB1c2VkIGFzIHRoZSBpZCBvZiB0aGUgSFRNTCBlbGVtZW50IGFzIHdlbGwuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBvYmplY3Qgd2l0aCBvcHRpb25hbCBwYXJhbWV0ZXJzXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lOiBTY2VuZSwgaWQ6IHN0cmluZywgeyBjYXB0dXJlT25Qb2ludGVyRW50ZXIgPSB0cnVlLCBpc0NhbnZhc092ZXJsYXkgPSBmYWxzZSwgZml0U3RyYXRlZ3kgPSBGaXRTdHJhdGVneS5OT05FIH0gPSB7fSkge1xyXG4gICAgICAgIHN1cGVyKGlkLCBzY2VuZSk7XHJcblxyXG4gICAgICAgIC8vIFJlcXVpcmVzIGEgYnJvd3NlciB0byB3b3JrLiAgQmFpbCBpZiB3ZSBhcmVuJ3QgcnVubmluZyBpbiBhIGJyb3dzZXJcclxuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5XYXJuKGBDcmVhdGluZyBhbiBpbnN0YW5jZSBvZiBhbiBIdG1sTWVzaCB3aXRoIGlkICR7aWR9IG91dHNpZGUgb2YgYSBicm93c2VyLiAgVGhlIG1lc2ggd2lsbCBub3QgYmUgdmlzaWJsZS5gKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZml0U3RyYXRlZ3kgPSBmaXRTdHJhdGVneTtcclxuICAgICAgICB0aGlzLl9pc0NhbnZhc092ZXJsYXkgPSBpc0NhbnZhc092ZXJsYXk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlTWFzaygpO1xyXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9jcmVhdGVFbGVtZW50KCk7XHJcblxyXG4gICAgICAgIC8vIFNldCBlbmFibGVkIGJ5IGRlZmF1bHQsIHNvIHRoaXMgd2lsbCBzaG93IGFzIHNvb24gYXMgaXQncyByZWFkeVxyXG4gICAgICAgIHRoaXMuc2V0RW5hYmxlZCh0cnVlKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FwdHVyZU9uUG9pbnRlckVudGVyID0gY2FwdHVyZU9uUG9pbnRlckVudGVyO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBiZWhhdmlvciB0byBjYXB0dXJlIHBvaW50ZXIgZXZlbnRzXHJcbiAgICAgICAgdGhpcy5fcG9pbnRlckV2ZW50Q2FwdHVyZUJlaGF2aW9yID0gbmV3IFBvaW50ZXJFdmVudHNDYXB0dXJlQmVoYXZpb3IodGhpcy5jYXB0dXJlUG9pbnRlckV2ZW50cy5iaW5kKHRoaXMpLCB0aGlzLnJlbGVhc2VQb2ludGVyRXZlbnRzLmJpbmQodGhpcyksIHtcclxuICAgICAgICAgICAgY2FwdHVyZU9uUG9pbnRlckVudGVyOiB0aGlzLl9jYXB0dXJlT25Qb2ludGVyRW50ZXIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hZGRCZWhhdmlvcih0aGlzLl9wb2ludGVyRXZlbnRDYXB0dXJlQmVoYXZpb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHdpZHRoIG9mIHRoZSBjb250ZW50IGluIHBpeGVsc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHdpZHRoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBoZWlnaHQgb2YgdGhlIGNvbnRlbnQgaW4gcGl4ZWxzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaGVpZ2h0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgSFRNTCBlbGVtZW50IHRoYXQgaXMgYmVpbmcgcmVuZGVyZWQgYXMgYSBtZXNoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZWxlbWVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRydWUgaWYgdGhlIG1lc2ggaGFzIGJlZW4gbW92ZWQsIHJvdGF0ZWQsIG9yIHNjYWxlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoaXNcclxuICAgICAqIHByb3BlcnR5IHdhcyByZWFkLiAgVGhpcyBwcm9wZXJ0eSBpcyByZXNldCB0byBmYWxzZSBhZnRlciByZWFkaW5nLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJlcXVpcmVzVXBkYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXF1aXJlc1VwZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVuYWJsZSBjYXB0dXJlIGZvciB0aGUgcG9pbnRlciB3aGVuIGVudGVyaW5nIHRoZSBtZXNoIGFyZWFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBjYXB0dXJlT25Qb2ludGVyRW50ZXIoY2FwdHVyZU9uUG9pbnRlckVudGVyOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fY2FwdHVyZU9uUG9pbnRlckVudGVyID0gY2FwdHVyZU9uUG9pbnRlckVudGVyO1xyXG4gICAgICAgIGlmICh0aGlzLl9wb2ludGVyRXZlbnRDYXB0dXJlQmVoYXZpb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5fcG9pbnRlckV2ZW50Q2FwdHVyZUJlaGF2aW9yLmNhcHR1cmVPblBvaW50ZXJFbnRlciA9IGNhcHR1cmVPblBvaW50ZXJFbnRlcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlcyBvZiB0aGUgbWVzaCBhbmQgdGhlIEhUTUwgZWxlbWVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgZGlzcG9zZSgpIHtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5fZWxlbWVudD8ucmVtb3ZlKCk7XHJcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAodGhpcy5fcG9pbnRlckV2ZW50Q2FwdHVyZUJlaGF2aW9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BvaW50ZXJFdmVudENhcHR1cmVCZWhhdmlvci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3BvaW50ZXJFdmVudENhcHR1cmVCZWhhdmlvciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfbWFya0FzVXBkYXRlZCgpIHtcclxuICAgICAgICB0aGlzLl9yZXF1aXJlc1VwZGF0ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29udGVudCBvZiB0aGUgZWxlbWVudCB0byB0aGUgc3BlY2lmaWVkIGNvbnRlbnQgYWRqdXN0aW5nIHRoZSBtZXNoIHNjYWxlIHRvIG1hdGNoIGFuZCBtYWtpbmcgaXQgdmlzaWJsZS5cclxuICAgICAqIElmIHRoZSB0aGUgc3BlY2lmaWVkIGNvbnRlbnQgaXMgdW5kZWZpbmVkLCB0aGVuIGl0IHdpbGwgbWFrZSB0aGUgbWVzaCBpbnZpc2libGUuICBJbiBlaXRoZXIgY2FzZSBpdCB3aWxsIGNsZWFyIHRoZVxyXG4gICAgICogZWxlbWVudCBjb250ZW50IGZpcnN0LlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gcmVuZGVyIGFzIGEgbWVzaFxyXG4gICAgICogQHBhcmFtIHdpZHRoIFRoZSB3aWR0aCBvZiB0aGUgbWVzaCBpbiBCYWJ5bG9uIHVuaXRzXHJcbiAgICAgKiBAcGFyYW0gaGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIG1lc2ggaW4gQmFieWxvbiB1bml0c1xyXG4gICAgICovXHJcbiAgICBzZXRDb250ZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIC8vIElmIGNvbnRlbnQgaXMgY2hhbmdlZCwgd2UgYXJlIG5vIGxvbmdlciByZWFkeVxyXG4gICAgICAgIHRoaXMuX3NldEFzUmVhZHkoZmFsc2UpO1xyXG5cclxuICAgICAgICAvLyBBbHNvIGludmFsaWRhdGUgdGhlIHNvdXJjZSB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgICAgICAgdGhpcy5fc291cmNlV2lkdGggPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZUhlaWdodCA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB0aGlzLl9yZXF1aXJlc1VwZGF0ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuc2NhbGluZy5zZXRBbGwoMSk7XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQhLmFwcGVuZENoaWxkKHRoaXMuX2ZpdFN0cmF0ZWd5LndyYXBFbGVtZW50KGVsZW1lbnQpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNjYWxlSWZOZWNlc3NhcnkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNvdXJjZVdpZHRoICYmIHRoaXMuc291cmNlSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldEFzUmVhZHkodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE92ZXJpZGVzIEJBQllMT04uTWVzaC5zZXRFbmFibGVkXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgc2V0RW5hYmxlZChlbmFibGVkOiBib29sZWFuKSB7XHJcbiAgICAgICAgLy8gQ2FwdHVyZSByZXF1ZXN0ZWQgZW5hYmxlZCBzdGF0ZVxyXG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSBlbmFibGVkO1xyXG5cclxuICAgICAgICAvLyBJZiBkaXNhYmxpbmcgb3IgZW5hYmxpbmcgYW5kIHdlIGFyZSByZWFkeVxyXG4gICAgICAgIGlmICghZW5hYmxlZCB8fCB0aGlzLl9yZWFkeSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kb1NldEVuYWJsZWQoZW5hYmxlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29udGVudCBzaXplIGluIHBpeGVsc1xyXG4gICAgICogQHBhcmFtIHdpZHRoIHdpZHRoIG9mIHRoZSBzb3VyY2VcclxuICAgICAqIEBwYXJhbSBoZWlnaHQgaGVpZ2h0IG9mIHRoZSBzb3VyY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldENvbnRlbnRTaXplUHgod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9zb3VyY2VXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZUhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9lbGVtZW50IHx8ICF0aGlzLl9lbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2ZpdFN0cmF0ZWd5LnVwZGF0ZVNpemUodGhpcy5fZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCEgYXMgSFRNTEVsZW1lbnQsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLl91cGRhdGVTY2FsZUlmTmVjZXNzYXJ5KCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLndpZHRoICYmIHRoaXMuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldEFzUmVhZHkodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfc2V0QXNSZWFkeShyZWFkeTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX3JlYWR5ID0gcmVhZHk7XHJcbiAgICAgICAgaWYgKHJlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RvU2V0RW5hYmxlZCh0aGlzLl9lbmFibGVkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9kb1NldEVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX2RvU2V0RW5hYmxlZChlbmFibGVkOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9lbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaWYgZW5hYmxlZCwgdGhlbiBzdGFydCBsaXN0ZW5pbmcgZm9yIGNoYW5nZXMgdG8gdGhlXHJcbiAgICAgICAgLy8gc2NhbGluZywgcm90YXRpb24sIGFuZCBwb3NpdGlvbi4gIG90aGVyd2lzZSBzdG9wIGxpc3RlbmluZ1xyXG4gICAgICAgIGlmIChlbmFibGVkICYmICF0aGlzLl93b3JsZE1hdHJpeFVwZGF0ZU9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dvcmxkTWF0cml4VXBkYXRlT2JzZXJ2ZXIgPSB0aGlzLm9uQWZ0ZXJXb3JsZE1hdHJpeFVwZGF0ZU9ic2VydmFibGUuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlcXVpcmVzVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghZW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl93b3JsZE1hdHJpeFVwZGF0ZU9ic2VydmVyPy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fd29ybGRNYXRyaXhVcGRhdGVPYnNlcnZlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZiBlbmFibGVkLCB0aGVuIHJldmVydCB0aGUgY29udGVudCBlbGVtZW50IGRpc3BsYXlcclxuICAgICAgICAvLyBvdGhlcndpc2UgaGlkZSBpdFxyXG4gICAgICAgIHRoaXMuX2VsZW1lbnQhLnN0eWxlLmRpc3BsYXkgPSBlbmFibGVkID8gXCJcIiA6IFwibm9uZVwiO1xyXG4gICAgICAgIC8vIENhcHR1cmUgdGhlIGNvbnRlbnQgeiBpbmRleFxyXG4gICAgICAgIHRoaXMuX3NldEVsZW1lbnRaSW5kZXgodGhpcy5wb3NpdGlvbi56ICogLTEwMDAwKTtcclxuICAgICAgICBzdXBlci5zZXRFbmFibGVkKGVuYWJsZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfdXBkYXRlU2NhbGVJZk5lY2Vzc2FyeSgpIHtcclxuICAgICAgICAvLyBJZiB3ZSBoYXZlIHNldENvbnRlbnQgYmVmb3JlLCB0aGUgY29udGVudCBzY2FsZSBpcyBiYWtlZCBpbnRvIHRoZSBtZXNoLiAgSWYgd2UgZG9uJ3QgcmVzZXQgdGhlIHZlcnRpY2VzIHRvXHJcbiAgICAgICAgLy8gdGhlIG9yaWdpbmFsIHNpemUsIHRoZW4gd2Ugd2lsbCBtdWx0aXBseSB0aGUgc2NhbGUgd2hlbiB3ZSBiYWtlIHRoZSBzY2FsZSBiZWxvdy4gIEJ5IGFwcGx5aW5nIHRoZSBpbnZlcnNlLCB3ZSBiYWNrIG91dFxyXG4gICAgICAgIC8vIHRoZSBzY2FsaW5nIHRoYXQgaGFzIGJlZW4gZG9uZSBzbyB3ZSBhcmUgc3RhcnRpbmcgZnJvbSB0aGUgc2FtZSBwb2ludC5cclxuICAgICAgICAvLyBGaXJzdCByZXNldCB0aGUgc2NhbGUgdG8gMVxyXG4gICAgICAgIHRoaXMuc2NhbGluZy5zZXRBbGwoMSk7XHJcbiAgICAgICAgLy8gVGhlbiBiYWNrIG91dCB0aGUgb3JpZ2luYWwgdmVydGljZXMgY2hhbmdlcyB0byBtYXRjaCB0aGUgY29udGVudCBzY2FsZVxyXG4gICAgICAgIGlmICh0aGlzLl9pbnZlcnNlU2NhbGVNYXRyaXgpIHtcclxuICAgICAgICAgICAgdGhpcy5iYWtlVHJhbnNmb3JtSW50b1ZlcnRpY2VzKHRoaXMuX2ludmVyc2VTY2FsZU1hdHJpeCk7XHJcbiAgICAgICAgICAgIC8vIENsZWFyIG91dCB0aGUgbWF0cml4IHNvIGl0IGRvZXNuJ3QgZ2V0IGFwcGxpZWQgYWdhaW4gdW5sZXNzIHdlIHNjYWxlXHJcbiAgICAgICAgICAgIHRoaXMuX2ludmVyc2VTY2FsZU1hdHJpeCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXQgc2NhbGUgdG8gbWF0Y2ggY29udGVudC4gIE5vdGUgd2UgY2FuJ3QganVzdCBzY2FsZSB0aGUgbWVzaCwgYmVjYXVzZSB0aGF0IHdpbGwgc2NhbGUgdGhlIGNvbnRlbnQgYXMgd2VsbFxyXG4gICAgICAgIC8vIFdoYXQgd2UgbmVlZCB0byBkbyBpcyBjb21wdXRlIGEgc2NhbGUgbWF0cml4IGFuZCB0aGVuIGJha2UgdGhhdCBpbnRvIHRoZSBtZXNoIHZlcnRpY2VzLiAgVGhpcyB3aWxsIGxlYXZlIHRoZVxyXG4gICAgICAgIC8vIG1lc2ggc2NhbGUgYXQgMSwgc28gb3VyIGNvbnRlbnQgd2lsbCBzdGF5IGl0J3Mgb3JpZ2luYWwgd2lkdGggYW5kIGhlaWdodCB1bnRpbCB3ZSBzY2FsZSB0aGUgbWVzaC5cclxuICAgICAgICBjb25zdCBzY2FsZVggPSB0aGlzLl93aWR0aCB8fCAxO1xyXG4gICAgICAgIGNvbnN0IHNjYWxlWSA9IHRoaXMuX2hlaWdodCB8fCAxO1xyXG4gICAgICAgIGNvbnN0IHNjYWxlTWF0cml4ID0gTWF0cml4LlNjYWxpbmcoc2NhbGVYLCBzY2FsZVksIDEpO1xyXG4gICAgICAgIHRoaXMuYmFrZVRyYW5zZm9ybUludG9WZXJ0aWNlcyhzY2FsZU1hdHJpeCk7XHJcblxyXG4gICAgICAgIC8vIEdldCBhbiBpbnZlcnNlIG9mIHRoZSBzY2FsZSBtYXRyaXggdGhhdCB3ZSBjYW4gdXNlIHRvIGJhY2sgb3V0IHRoZSBzY2FsZSBjaGFuZ2VzIHdlIGhhdmUgbWFkZSBzb1xyXG4gICAgICAgIC8vIHdlIGRvbid0IG11bHRpcGx5IHRoZSBzY2FsZS5cclxuICAgICAgICB0aGlzLl9pbnZlcnNlU2NhbGVNYXRyaXggPSBuZXcgTWF0cml4KCk7XHJcbiAgICAgICAgc2NhbGVNYXRyaXguaW52ZXJ0VG9SZWYodGhpcy5faW52ZXJzZVNjYWxlTWF0cml4KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX2NyZWF0ZU1hc2soKSB7XHJcbiAgICAgICAgY29uc3QgdmVydGV4RGF0YSA9IENyZWF0ZVBsYW5lVmVydGV4RGF0YSh7IHdpZHRoOiAxLCBoZWlnaHQ6IDEgfSk7XHJcbiAgICAgICAgdmVydGV4RGF0YS5hcHBseVRvTWVzaCh0aGlzKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2NlbmUgPSB0aGlzLmdldFNjZW5lKCk7XHJcbiAgICAgICAgdGhpcy5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xyXG5cclxuICAgICAgICBjb25zdCBkZXB0aE1hc2sgPSBuZXcgU3RhbmRhcmRNYXRlcmlhbChgJHt0aGlzLmlkfS1tYXRgLCBzY2VuZSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NhbnZhc092ZXJsYXkpIHtcclxuICAgICAgICAgICAgZGVwdGhNYXNrLmJhY2tGYWNlQ3VsbGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBkZXB0aE1hc2suZGlzYWJsZUNvbG9yV3JpdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBkZXB0aE1hc2suZGlzYWJsZUxpZ2h0aW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWF0ZXJpYWwgPSBkZXB0aE1hc2s7XHJcblxyXG4gICAgICAgIC8vIE9wdGltaXphdGlvbiAtIEZyZWV6ZSBtYXRlcmlhbCBzaW5jZSBpdCBuZXZlciBuZWVkcyB0byBjaGFuZ2VcclxuICAgICAgICB0aGlzLm1hdGVyaWFsLmZyZWV6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfc2V0RWxlbWVudFpJbmRleCh6SW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLl9lbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQhLnN0eWxlLnpJbmRleCA9IGAke3pJbmRleH1gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHVzZWQgYnkgdGhlIFBvaW50ZXJFdmVudHNDYXB0dXJlQmVoYXZpb3IgdG8gY2FwdHVyZSBwb2ludGVyIGV2ZW50c1xyXG4gICAgICovXHJcbiAgICBjYXB0dXJlUG9pbnRlckV2ZW50cygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRW5hYmxlIGRvbSBjb250ZW50IHRvIGNhcHR1cmUgcG9pbnRlciBldmVudHNcclxuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcclxuXHJcbiAgICAgICAgLy8gU3VwcmVzcyBldmVudHMgb3V0c2lkZSBvZiB0aGUgZG9tIGNvbnRlbnRcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF0uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgdXNlZCBieSB0aGUgUG9pbnRlckV2ZW50c0NhcHR1cmVCZWhhdmlvciB0byByZWxlYXNlIHBvaW50ZXIgZXZlbnRzXHJcbiAgICAgKi9cclxuICAgIHJlbGVhc2VQb2ludGVyRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFbmFibGUgcG9pbnRlciBldmVudHMgb24gY2FudmFzXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcclxuXHJcbiAgICAgICAgLy8gRGlzYWJsZSBwb2ludGVyIGV2ZW50cyBvbiBkb20gY29udGVudFxyXG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfY3JlYXRlRWxlbWVudCgpIHtcclxuICAgICAgICAvLyBSZXF1aXJlcyBhIGJyb3dzZXIgdG8gd29yay4gIEJhaWwgaWYgd2UgYXJlbid0IHJ1bm5pbmcgaW4gYSBicm93c2VyXHJcbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgZGl2LmlkID0gdGhpcy5pZDtcclxuICAgICAgICBkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5faXNDYW52YXNPdmVybGF5ID8gXCJ0cmFuc3BhcmVudFwiIDogXCIjMDAwXCI7XHJcbiAgICAgICAgZGl2LnN0eWxlLnpJbmRleCA9IFwiMVwiO1xyXG4gICAgICAgIGRpdi5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICBkaXYuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xyXG4gICAgICAgIGRpdi5zdHlsZS5iYWNrZmFjZVZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG5cclxuICAgICAgICByZXR1cm4gZGl2O1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgeyBNYXRyaXgsIFF1YXRlcm5pb24sIFZlY3RvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoXCI7XHJcblxyXG5pbXBvcnQgdHlwZSB7IEh0bWxNZXNoIH0gZnJvbSBcIi4vaHRtbE1lc2hcIjtcclxuaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSBcImNvcmUvQ2FtZXJhcy9jYW1lcmFcIjtcclxuaW1wb3J0IHR5cGUgeyBTdWJNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL3N1Yk1lc2hcIjtcclxuaW1wb3J0IHsgUmVuZGVyaW5nR3JvdXAgfSBmcm9tIFwiY29yZS9SZW5kZXJpbmcvcmVuZGVyaW5nR3JvdXBcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgT2JzZXJ2ZXIgfSBmcm9tIFwiY29yZS9NaXNjL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmUvTWlzYy9sb2dnZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBBYnN0cmFjdEVuZ2luZSB9IGZyb20gXCJjb3JlL0VuZ2luZXNcIjtcclxuXHJcbmNvbnN0IF9wb3NpdGlvblVwZGF0ZUZhaWxNZXNzYWdlID0gXCJGYWlsZWQgdG8gdXBkYXRlIGh0bWwgbWVzaCByZW5kZXJlciBwb3NpdGlvbiBkdWUgdG8gZmFpbHVyZSB0byBnZXQgY2FudmFzIHJlY3QuICBIdG1sTWVzaCBpbnN0YW5jZXMgbWF5IG5vdCByZW5kZXIgY29ycmVjdGx5XCI7XHJcbmNvbnN0IGJhYnlsb25Vbml0c1RvUGl4ZWxzID0gMTAwO1xyXG5cclxuLyoqXHJcbiAqIEEgZnVuY3Rpb24gdGhhdCBjb21wYXJlcyB0d28gc3VibWVzaGVzIGFuZCByZXR1cm5zIGEgbnVtYmVyIGluZGljYXRpbmcgd2hpY2hcclxuICogc2hvdWxkIGJlIHJlbmRlcmVkIGZpcnN0LlxyXG4gKi9cclxudHlwZSBSZW5kZXJPcmRlckZ1bmN0aW9uID0gKHN1Yk1lc2hBOiBTdWJNZXNoLCBzdWJNZXNoQjogU3ViTWVzaCkgPT4gbnVtYmVyO1xyXG5cclxudHlwZSBSZW5kZXJMYXllckVsZW1lbnRzID0ge1xyXG4gICAgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICAgIGRvbUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gICAgY2FtZXJhRWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbn07XHJcblxyXG4vLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBlbnN1cmVzIHRoYXQgSHRtbE1lc2hlcyBhcmUgcmVuZGVyZWQgYmVmb3JlIGFsbCBvdGhlciBtZXNoZXMuXHJcbi8vIE5vdGUgdGhpcyB3aWxsIG9ubHkgYmUgYXBwbGllZCB0byBncm91cCAwLlxyXG4vLyBJZiBuZWl0aGVyIG1lc2ggaXMgYW4gSHRtbE1lc2gsIHRoZW4gdGhlIGRlZmF1bHQgcmVuZGVyIG9yZGVyIGlzIHVzZWRcclxuLy8gVGhpcyBwcmV2ZW50cyBIdG1sTWVzaGVzIGZyb20gYXBwZWFyaW5nIGluIGZyb250IG9mIG90aGVyIG1lc2hlcyB3aGVuIHRoZXkgYXJlIGJlaGluZCB0aGVtXHJcbmNvbnN0IHJlbmRlck9yZGVyRnVuYyA9IChkZWZhdWx0UmVuZGVyT3JkZXI6IFJlbmRlck9yZGVyRnVuY3Rpb24pOiBSZW5kZXJPcmRlckZ1bmN0aW9uID0+IHtcclxuICAgIHJldHVybiAoc3ViTWVzaEE6IFN1Yk1lc2gsIHN1Yk1lc2hCOiBTdWJNZXNoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWVzaEEgPSBzdWJNZXNoQS5nZXRNZXNoKCk7XHJcbiAgICAgICAgY29uc3QgbWVzaEIgPSBzdWJNZXNoQi5nZXRNZXNoKCk7XHJcblxyXG4gICAgICAgIC8vIFVzZSBwcm9wZXJ0eSBjaGVjayBpbnN0ZWFkIG9mIGluc3RhbmNlb2Ygc2luY2UgaXQgaXMgbGVzcyBleHBlbnNpdmUgYW5kXHJcbiAgICAgICAgLy8gdGhpcyB3aWxsIGJlIGNhbGxlZCBtYW55IHRpbWVzIHBlciBmcmFtZVxyXG4gICAgICAgIGNvbnN0IG1lc2hBSXNIdG1sTWVzaCA9IChtZXNoQSBhcyBhbnkpW1wiaXNIdG1sTWVzaFwiXTtcclxuICAgICAgICBjb25zdCBtZXNoQklzSHRtbE1lc2ggPSAobWVzaEIgYXMgYW55KVtcImlzSHRtbE1lc2hcIl07XHJcbiAgICAgICAgaWYgKG1lc2hBSXNIdG1sTWVzaCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzaEJJc0h0bWxNZXNoID8gKG1lc2hBLmFic29sdXRlUG9zaXRpb24ueiA8PSBtZXNoQi5hYnNvbHV0ZVBvc2l0aW9uLnogPyAxIDogLTEpIDogLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc2hCSXNIdG1sTWVzaCA/IDEgOiBkZWZhdWx0UmVuZGVyT3JkZXIoc3ViTWVzaEEsIHN1Yk1lc2hCKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFuIGluc3RhbmNlIG9mIHRoaXMgaXMgcmVxdWlyZWQgdG8gcmVuZGVyIEh0bWxNZXNoZXMgaW4gdGhlIHNjZW5lLlxyXG4gKiBpZiB1c2luZyBIdG1sTWVzaGVzLCB5b3UgbXVzdCBub3Qgc2V0IHJlbmRlciBvcmRlciBmb3IgZ3JvdXAgMCB1c2luZ1xyXG4gKiBzY2VuZS5zZXRSZW5kZXJpbmdPcmRlci4gIFlvdSBtdXN0IGluc3RlYWQgcGFzcyB0aGUgY29tcGFyZSBmdW5jdGlvbnNcclxuICogdG8gdGhlIEh0bWxNZXNoUmVuZGVyZXIgY29uc3RydWN0b3IuICBJZiB5b3UgZG8gbm90LCB0aGVuIHlvdXIgcmVuZGVyXHJcbiAqIG9yZGVyIHdpbGwgYmUgb3ZlcndyaXR0ZW4gaWYgdGhlIEh0bWxNZXNoUmVuZGVyZXIgaXMgY3JlYXRlZCBhZnRlciBhbmRcclxuICogdGhlIEh0bWxNZXNoZXMgd2lsbCBub3QgcmVuZGVyIGNvcnJlY3RseSAodGhleSB3aWxsIGFwcGVhciBpbiBmcm9udCBvZlxyXG4gKiBtZXNoZXMgdGhhdCBhcmUgYWN0dWFsbHkgaW4gZnJvbnQgb2YgdGhlbSkgaWYgdGhlIEh0bWxNZXNoUmVuZGVyZXIgaXNcclxuICogY3JlYXRlZCBiZWZvcmUuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSHRtbE1lc2hSZW5kZXJlciB7XHJcbiAgICBwcml2YXRlIF9jb250YWluZXJJZD86IHN0cmluZztcclxuICAgIHByaXZhdGUgX2luU2NlbmVFbGVtZW50cz86IFJlbmRlckxheWVyRWxlbWVudHMgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBfb3ZlcmxheUVsZW1lbnRzPzogUmVuZGVyTGF5ZXJFbGVtZW50cyB8IG51bGw7XHJcbiAgICBwcml2YXRlIF9lbmdpbmU6IEFic3RyYWN0RW5naW5lO1xyXG5cclxuICAgIHByaXZhdGUgX2NhY2hlID0ge1xyXG4gICAgICAgIGNhbWVyYURhdGE6IHsgZm92OiAwLCBwb3NpdGlvbjogbmV3IFZlY3RvcjMoKSwgc3R5bGU6IFwiXCIgfSxcclxuICAgICAgICBodG1sTWVzaERhdGE6IG5ldyBXZWFrTWFwPG9iamVjdCwgeyBzdHlsZTogc3RyaW5nIH0+KCksXHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBfd2lkdGggPSAwO1xyXG4gICAgcHJpdmF0ZSBfaGVpZ2h0ID0gMDtcclxuICAgIHByaXZhdGUgX2hlaWdodEhhbGYgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgX2NhbWVyYVdvcmxkTWF0cml4PzogTWF0cml4O1xyXG5cclxuICAgIC8vIENyZWF0ZSBzb21lIHJlZnMgdG8gYXZvaWQgY3JlYXRpbmcgbmV3IG9iamVjdHMgZXZlcnkgZnJhbWVcclxuICAgIHByaXZhdGUgX3RlbXAgPSB7XHJcbiAgICAgICAgc2NhbGVUcmFuc2Zvcm06IG5ldyBWZWN0b3IzKCksXHJcbiAgICAgICAgcm90YXRpb25UcmFuc2Zvcm06IG5ldyBRdWF0ZXJuaW9uKCksXHJcbiAgICAgICAgcG9zaXRpb25UcmFuc2Zvcm06IG5ldyBWZWN0b3IzKCksXHJcbiAgICAgICAgb2JqZWN0TWF0cml4OiBNYXRyaXguSWRlbnRpdHkoKSxcclxuICAgICAgICBjYW1lcmFXb3JsZE1hdHJpeDogTWF0cml4LklkZW50aXR5KCksXHJcbiAgICAgICAgY2FtZXJhUm90YXRpb25NYXRyaXg6IE1hdHJpeC5JZGVudGl0eSgpLFxyXG4gICAgICAgIGNhbWVyYVdvcmxkTWF0cml4QXNBcnJheTogbmV3IEFycmF5KDE2KSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gS2VlcCB0cmFjayBvZiBEUFIgc28gd2UgY2FuIHJlc2l6ZSBpZiBEUFIgY2hhbmdlc1xyXG4gICAgLy8gT3RoZXJ3aXNlIHRoZSBET00gY29udGVudCB3aWxsIHNjYWxlLCBidXQgdGhlIG1lc2ggd29uJ3RcclxuICAgIHByaXZhdGUgX2xhc3REZXZpY2VQaXhlbFJhdGlvID0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XHJcblxyXG4gICAgLy8gS2VlcCB0cmFjayBvZiBjYW1lcmEgbWF0cml4IGNoYW5nZXMgc28gd2Ugb25seSB1cGRhdGUgdGhlXHJcbiAgICAvLyBET00gZWxlbWVudCBzdHlsZXMgd2hlbiBuZWNlc3NhcnlcclxuICAgIHByaXZhdGUgX2NhbWVyYU1hdHJpeFVwZGF0ZWQgPSB0cnVlO1xyXG5cclxuICAgIC8vIEtlZXAgdHJhY2sgb2YgcG9zaXRpb24gY2hhbmdlcyBzbyB3ZSBvbmx5IHVwZGF0ZSB0aGUgRE9NIGVsZW1lbnRcclxuICAgIC8vIHN0eWxlcyB3aGVuIG5lY2Vzc2FyeVxyXG4gICAgcHJpdmF0ZSBfcHJldmlvdXNDYW52YXNEb2N1bWVudFBvc2l0aW9uID0ge1xyXG4gICAgICAgIHRvcDogMCxcclxuICAgICAgICBsZWZ0OiAwLFxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9yZW5kZXJPYnNlcnZlcjogT2JzZXJ2ZXI8U2NlbmU+IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb250cnVjdCBhbiBpbnN0YW5jZSBvZiBIdG1sTWVzaFJlbmRlcmVyXHJcbiAgICAgKiBAcGFyYW0gc2NlbmVcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIG9iamVjdCBjb250YWluaW5nIHRoZSBmb2xsb3dpbmcgb3B0aW9uYWwgcHJvcGVydGllczpcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHNjZW5lOiBTY2VuZSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhcmVudENvbnRhaW5lcklkID0gbnVsbCxcclxuICAgICAgICAgICAgX2NvbnRhaW5lcklkID0gXCJjc3MtY29udGFpbmVyXCIsXHJcbiAgICAgICAgICAgIGVuYWJsZU92ZXJsYXlSZW5kZXIgPSB0cnVlLFxyXG4gICAgICAgICAgICBkZWZhdWx0T3BhcXVlUmVuZGVyT3JkZXIgPSBSZW5kZXJpbmdHcm91cC5QYWludGVyU29ydENvbXBhcmUsXHJcbiAgICAgICAgICAgIGRlZmF1bHRBbHBoYVRlc3RSZW5kZXJPcmRlciA9IFJlbmRlcmluZ0dyb3VwLlBhaW50ZXJTb3J0Q29tcGFyZSxcclxuICAgICAgICAgICAgZGVmYXVsdFRyYW5zcGFyZW50UmVuZGVyT3JkZXIgPSBSZW5kZXJpbmdHcm91cC5kZWZhdWx0VHJhbnNwYXJlbnRTb3J0Q29tcGFyZSxcclxuICAgICAgICB9OiB7XHJcbiAgICAgICAgICAgIHBhcmVudENvbnRhaW5lcklkPzogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgICAgICAgX2NvbnRhaW5lcklkPzogc3RyaW5nO1xyXG4gICAgICAgICAgICBkZWZhdWx0T3BhcXVlUmVuZGVyT3JkZXI/OiBSZW5kZXJPcmRlckZ1bmN0aW9uO1xyXG4gICAgICAgICAgICBkZWZhdWx0QWxwaGFUZXN0UmVuZGVyT3JkZXI/OiBSZW5kZXJPcmRlckZ1bmN0aW9uO1xyXG4gICAgICAgICAgICBkZWZhdWx0VHJhbnNwYXJlbnRSZW5kZXJPcmRlcj86IFJlbmRlck9yZGVyRnVuY3Rpb247XHJcbiAgICAgICAgICAgIGVuYWJsZU92ZXJsYXlSZW5kZXI/OiBib29sZWFuO1xyXG4gICAgICAgIH0gPSB7fVxyXG4gICAgKSB7XHJcbiAgICAgICAgLy8gUmVxdWlyZXMgYSBicm93c2VyIHRvIHdvcmsuICBPbmx5IGluaXQgaWYgd2UgYXJlIGluIGEgYnJvd3NlclxyXG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jb250YWluZXJJZCA9IF9jb250YWluZXJJZDtcclxuICAgICAgICB0aGlzLl9pbml0KHNjZW5lLCBwYXJlbnRDb250YWluZXJJZCwgZW5hYmxlT3ZlcmxheVJlbmRlciwgZGVmYXVsdE9wYXF1ZVJlbmRlck9yZGVyLCBkZWZhdWx0QWxwaGFUZXN0UmVuZGVyT3JkZXIsIGRlZmF1bHRUcmFuc3BhcmVudFJlbmRlck9yZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIEh0bWxNZXNoUmVuZGVyZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlbmRlck9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlck9ic2VydmVyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJPYnNlcnZlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9vdmVybGF5RWxlbWVudHM/LmNvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgICAgICB0aGlzLl9vdmVybGF5RWxlbWVudHMgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl9pblNjZW5lRWxlbWVudHM/LmNvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgICAgICB0aGlzLl9pblNjZW5lRWxlbWVudHMgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfaW5pdChcclxuICAgICAgICBzY2VuZTogU2NlbmUsXHJcbiAgICAgICAgcGFyZW50Q29udGFpbmVySWQ6IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgZW5hYmxlT3ZlcmxheVJlbmRlcjogYm9vbGVhbixcclxuICAgICAgICBkZWZhdWx0T3BhcXVlUmVuZGVyT3JkZXI6IFJlbmRlck9yZGVyRnVuY3Rpb24sXHJcbiAgICAgICAgZGVmYXVsdEFscGhhVGVzdFJlbmRlck9yZGVyOiBSZW5kZXJPcmRlckZ1bmN0aW9uLFxyXG4gICAgICAgIGRlZmF1bHRUcmFuc3BhcmVudFJlbmRlck9yZGVyOiBSZW5kZXJPcmRlckZ1bmN0aW9uXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICAvLyBSZXF1aXJlcyBhIGJyb3dzZXIgdG8gd29yay4gIE9ubHkgaW5pdCBpZiB3ZSBhcmUgaW4gYSBicm93c2VyXHJcbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDcmVhdGUgdGhlIERPTSBjb250YWluZXJzXHJcbiAgICAgICAgbGV0IHBhcmVudENvbnRhaW5lciA9IHBhcmVudENvbnRhaW5lcklkID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyZW50Q29udGFpbmVySWQpIDogZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgICAgICAgaWYgKCFwYXJlbnRDb250YWluZXIpIHtcclxuICAgICAgICAgICAgcGFyZW50Q29udGFpbmVyID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSBjb250YWluZXIgYWxyZWFkeSBleGlzdHMsIHRoZW4gcmVtb3ZlIGl0XHJcbiAgICAgICAgY29uc3QgaW5TY2VuZUNvbnRhaW5lcklkID0gYCR7dGhpcy5fY29udGFpbmVySWR9X2luX3NjZW5lYDtcclxuICAgICAgICB0aGlzLl9pblNjZW5lRWxlbWVudHMgPSB0aGlzLl9jcmVhdGVSZW5kZXJMYXllckVsZW1lbnRzKGluU2NlbmVDb250YWluZXJJZCk7XHJcblxyXG4gICAgICAgIHBhcmVudENvbnRhaW5lci5pbnNlcnRCZWZvcmUodGhpcy5faW5TY2VuZUVsZW1lbnRzLmNvbnRhaW5lciwgcGFyZW50Q29udGFpbmVyLmZpcnN0Q2hpbGQpO1xyXG5cclxuICAgICAgICBpZiAoZW5hYmxlT3ZlcmxheVJlbmRlcikge1xyXG4gICAgICAgICAgICBjb25zdCBvdmVybGF5Q29udGFpbmVySWQgPSBgJHt0aGlzLl9jb250YWluZXJJZH1fb3ZlcmxheWA7XHJcbiAgICAgICAgICAgIHRoaXMuX292ZXJsYXlFbGVtZW50cyA9IHRoaXMuX2NyZWF0ZVJlbmRlckxheWVyRWxlbWVudHMob3ZlcmxheUNvbnRhaW5lcklkKTtcclxuICAgICAgICAgICAgY29uc3QgekluZGV4ID0gKyhzY2VuZS5nZXRFbmdpbmUoKS5nZXRSZW5kZXJpbmdDYW52YXMoKSEuc3R5bGUuekluZGV4ID8/IFwiMFwiKSArIDE7XHJcbiAgICAgICAgICAgIHRoaXMuX292ZXJsYXlFbGVtZW50cy5jb250YWluZXIuc3R5bGUuekluZGV4ID0gYCR7ekluZGV4fWA7XHJcbiAgICAgICAgICAgIHRoaXMuX292ZXJsYXlFbGVtZW50cy5jb250YWluZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICBwYXJlbnRDb250YWluZXIuaW5zZXJ0QmVmb3JlKHRoaXMuX292ZXJsYXlFbGVtZW50cy5jb250YWluZXIsIHBhcmVudENvbnRhaW5lci5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZW5naW5lID0gc2NlbmUuZ2V0RW5naW5lKCk7XHJcbiAgICAgICAgY29uc3QgY2xpZW50UmVjdCA9IHRoaXMuX2VuZ2luZS5nZXRSZW5kZXJpbmdDYW52YXNDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgaWYgKCFjbGllbnRSZWN0KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBnZXQgY2xpZW50IHJlY3QgZm9yIHJlbmRlcmluZyBjYW52YXNcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXQgdGhlIHNpemUgYW5kIHJlc2l6ZSBiZWhhdmlvclxyXG4gICAgICAgIHRoaXMuX3NldFNpemUoY2xpZW50UmVjdC53aWR0aCwgY2xpZW50UmVjdC5oZWlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLl9lbmdpbmUub25SZXNpemVPYnNlcnZhYmxlLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsaWVudFJlY3QgPSB0aGlzLl9lbmdpbmUuZ2V0UmVuZGVyaW5nQ2FudmFzQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBpZiAoY2xpZW50UmVjdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0U2l6ZShjbGllbnRSZWN0LndpZHRoLCBjbGllbnRSZWN0LmhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHByb2plY3Rpb25PYnM6IE9ic2VydmVyPENhbWVyYT47XHJcbiAgICAgICAgbGV0IG1hdHJpeE9iczogT2JzZXJ2ZXI8Q2FtZXJhPjtcclxuXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZUNhbWVyYSA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2FtZXJhID0gc2NlbmUuYWN0aXZlQ2FtZXJhO1xyXG4gICAgICAgICAgICBpZiAoY2FtZXJhKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0aW9uT2JzID0gY2FtZXJhLm9uUHJvamVjdGlvbk1hdHJpeENoYW5nZWRPYnNlcnZhYmxlLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25DYW1lcmFNYXRyaXhDaGFuZ2VkKGNhbWVyYSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG1hdHJpeE9icyA9IGNhbWVyYS5vblZpZXdNYXRyaXhDaGFuZ2VkT2JzZXJ2YWJsZS5hZGQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uQ2FtZXJhTWF0cml4Q2hhbmdlZChjYW1lcmEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYnNlcnZlQ2FtZXJhKCk7XHJcblxyXG4gICAgICAgIHNjZW5lLm9uQWN0aXZlQ2FtZXJhQ2hhbmdlZC5hZGQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocHJvamVjdGlvbk9icykge1xyXG4gICAgICAgICAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhPy5vblByb2plY3Rpb25NYXRyaXhDaGFuZ2VkT2JzZXJ2YWJsZS5yZW1vdmUocHJvamVjdGlvbk9icyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1hdHJpeE9icykge1xyXG4gICAgICAgICAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhPy5vblZpZXdNYXRyaXhDaGFuZ2VkT2JzZXJ2YWJsZS5yZW1vdmUobWF0cml4T2JzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvYnNlcnZlQ2FtZXJhKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgSHRtbE1lc2hlcyBhcmUgcmVuZGVyZWQgYmVmb3JlIGFsbCBvdGhlciBtZXNoZXNcclxuICAgICAgICAvLyBzbyB0aGF0IHRoZXkgZG9uJ3QgYXBwZWFyIGluIGZyb250IG9mIG1lc2hlcyB0aGF0IGFyZSBhY3R1YWxseSBpbiBmcm9udCBvZiB0aGVtXHJcbiAgICAgICAgLy8gVXBkYXRpbmcgdGhlIHJlbmRlciBvcmRlciBpc24ndCBpZGVhbCwgYnV0IGl0IGlzIHRoZSBvbmx5IHdheSB0byBhY2hlaXZlIHRoaXNcclxuICAgICAgICAvLyBUaGUgaW1wbGljYXRpb24gaXMgdGhhdCBhbiBhcHAgdXNpbmcgdGhlIEh0bWxNZXNoUmVuZGVyZWQgbXVzdCBzZXQgdGhlIHNjZW5lIHJlbmRlciBvcmRlclxyXG4gICAgICAgIC8vIHZpYSB0aGUgSHRtbE1lc2hSZW5kZXJlZCBjb25zdHJ1Y3RvclxyXG4gICAgICAgIGNvbnN0IG9wYXF1ZVJlbmRlck9yZGVyID0gcmVuZGVyT3JkZXJGdW5jKGRlZmF1bHRPcGFxdWVSZW5kZXJPcmRlcik7XHJcbiAgICAgICAgY29uc3QgYWxwaGFUZXN0UmVuZGVyT3JkZXIgPSByZW5kZXJPcmRlckZ1bmMoZGVmYXVsdEFscGhhVGVzdFJlbmRlck9yZGVyKTtcclxuICAgICAgICBjb25zdCB0cmFuc3BhcmVudFJlbmRlck9yZGVyID0gcmVuZGVyT3JkZXJGdW5jKGRlZmF1bHRUcmFuc3BhcmVudFJlbmRlck9yZGVyKTtcclxuICAgICAgICBzY2VuZS5zZXRSZW5kZXJpbmdPcmRlcigwLCBvcGFxdWVSZW5kZXJPcmRlciwgYWxwaGFUZXN0UmVuZGVyT3JkZXIsIHRyYW5zcGFyZW50UmVuZGVyT3JkZXIpO1xyXG5cclxuICAgICAgICB0aGlzLl9yZW5kZXJPYnNlcnZlciA9IHNjZW5lLm9uQmVmb3JlUmVuZGVyT2JzZXJ2YWJsZS5hZGQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXIoc2NlbmUsIHNjZW5lLmFjdGl2ZUNhbWVyYSBhcyBDYW1lcmEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NyZWF0ZVJlbmRlckxheWVyRWxlbWVudHMoY29udGFpbmVySWQ6IHN0cmluZyk6IFJlbmRlckxheWVyRWxlbWVudHMge1xyXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVySWQpO1xyXG4gICAgICAgIGlmIChleGlzdGluZ0NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBleGlzdGluZ0NvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb250YWluZXIuaWQgPSBjb250YWluZXJJZDtcclxuICAgICAgICBjb250YWluZXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XHJcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xyXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSBcIi0xXCI7XHJcblxyXG4gICAgICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGRvbUVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG5cclxuICAgICAgICBjb25zdCBjYW1lcmFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICAgICAgY2FtZXJhRWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm1TdHlsZSA9IFwicHJlc2VydmUtM2RcIjtcclxuICAgICAgICBjYW1lcmFFbGVtZW50LnN0eWxlLnRyYW5zZm9ybVN0eWxlID0gXCJwcmVzZXJ2ZS0zZFwiO1xyXG5cclxuICAgICAgICBjYW1lcmFFbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcclxuXHJcbiAgICAgICAgZG9tRWxlbWVudC5hcHBlbmRDaGlsZChjYW1lcmFFbGVtZW50KTtcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tRWxlbWVudCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLFxyXG4gICAgICAgICAgICBkb21FbGVtZW50LFxyXG4gICAgICAgICAgICBjYW1lcmFFbGVtZW50LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9nZXRTaXplKCk6IHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXIgfSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMuX3dpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuX2hlaWdodCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfc2V0U2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX2hlaWdodEhhbGYgPSB0aGlzLl9oZWlnaHQgLyAyO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX2luU2NlbmVFbGVtZW50cyB8fCAhdGhpcy5fb3ZlcmxheUVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRvbUVsZW1lbnRzID0gW3RoaXMuX2luU2NlbmVFbGVtZW50cyEuZG9tRWxlbWVudCwgdGhpcy5fb3ZlcmxheUVsZW1lbnRzIS5kb21FbGVtZW50LCB0aGlzLl9pblNjZW5lRWxlbWVudHMhLmNhbWVyYUVsZW1lbnQsIHRoaXMuX292ZXJsYXlFbGVtZW50cyEuY2FtZXJhRWxlbWVudF07XHJcbiAgICAgICAgZG9tRWxlbWVudHMuZm9yRWFjaCgoZG9tKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkb20pIHtcclxuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcclxuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICBwcm90ZWN0ZWQgX2dldENhbWVyYUNTU01hdHJpeChtYXRyaXg6IE1hdHJpeCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBtYXRyaXgubTtcclxuICAgICAgICByZXR1cm4gYG1hdHJpeDNkKCR7XHJcbiAgICAgICAgICAgIHRoaXMuX2Vwc2lsb24oIGVsZW1lbnRzWzBdIClcclxuICAgICAgICB9LCR7XHJcbiAgICAgICAgICAgIHRoaXMuX2Vwc2lsb24oIC0gZWxlbWVudHNbMV0gKVxyXG4gICAgICAgIH0sJHtcclxuICAgICAgICAgICAgdGhpcy5fZXBzaWxvbiggZWxlbWVudHNbMl0gKVxyXG4gICAgICAgIH0sJHtcclxuICAgICAgICAgICAgdGhpcy5fZXBzaWxvbiggZWxlbWVudHNbM10gKVxyXG4gICAgICAgIH0sJHtcclxuICAgICAgICAgICAgdGhpcy5fZXBzaWxvbiggZWxlbWVudHNbNF0gKVxyXG4gICAgICAgIH0sJHtcclxuICAgICAgICAgICAgdGhpcy5fZXBzaWxvbiggLSBlbGVtZW50c1s1XSApXHJcbiAgICAgICAgfSwke1xyXG4gICAgICAgICAgICB0aGlzLl9lcHNpbG9uKCBlbGVtZW50c1s2XSApXHJcbiAgICAgICAgfSwke1xyXG4gICAgICAgICAgICB0aGlzLl9lcHNpbG9uKCBlbGVtZW50c1s3XSApXHJcbiAgICAgICAgfSwke1xyXG4gICAgICAgICAgICB0aGlzLl9lcHNpbG9uKCBlbGVtZW50c1s4XSApXHJcbiAgICAgICAgfSwke1xyXG4gICAgICAgICAgICB0aGlzLl9lcHNpbG9uKCAtIGVsZW1lbnRzWzldIClcclxuICAgICAgICB9LCR7XHJcbiAgICAgICAgICAgIHRoaXMuX2Vwc2lsb24oIGVsZW1lbnRzWzEwXSApXHJcbiAgICAgICAgfSwke1xyXG4gICAgICAgICAgICB0aGlzLl9lcHNpbG9uKCBlbGVtZW50c1sxMV0gKVxyXG4gICAgICAgIH0sJHtcclxuICAgICAgICAgICAgdGhpcy5fZXBzaWxvbiggZWxlbWVudHNbMTJdIClcclxuICAgICAgICB9LCR7XHJcbiAgICAgICAgICAgIHRoaXMuX2Vwc2lsb24oIC0gZWxlbWVudHNbMTNdIClcclxuICAgICAgICB9LCR7XHJcbiAgICAgICAgICAgIHRoaXMuX2Vwc2lsb24oIGVsZW1lbnRzWzE0XSApXHJcbiAgICAgICAgfSwke1xyXG4gICAgICAgICAgICB0aGlzLl9lcHNpbG9uKCBlbGVtZW50c1sxNV0gKVxyXG4gICAgICAgIH0pYDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDb252ZXJ0IGEgQmFieWxvbiB3b3JsZCBtYXRyaXggdG8gYSBDU1MgbWF0cml4XHJcbiAgICAvLyBUaGlzIGFsc28gaGFuZGxlcyBjb252ZXJzaW9uIGZyb20gQkpTIGxlZnQgaGFuZGVkIGNvb3Jkc1xyXG4gICAgLy8gdG8gQ1NTIHJpZ2h0IGhhbmRlZCBjb29yZHNcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgcHJvdGVjdGVkIF9nZXRIdG1sQ29udGVudENTU01hdHJpeChtYXRyaXg6IE1hdHJpeCwgdXNlUmlnaHRIYW5kZWRTeXN0ZW06IGJvb2xlYW4pOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gbWF0cml4Lm07XHJcbiAgICAgICAgLy8gSW4gYSByaWdodCBoYW5kZWQgY29vcmRpbmF0ZSBzeXN0ZW0sIHRoZSBlbGVtZW50cyAxMSB0byAxNCBoYXZlIHRvIGNoYW5nZSB0aGVpciBkaXJlY3Rpb25cclxuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB1c2VSaWdodEhhbmRlZFN5c3RlbSA/IC0xIDogMTtcclxuICAgICAgICBjb25zdCBtYXRyaXgzZCA9IGBtYXRyaXgzZCgke1xyXG4gICAgICAgICAgICB0aGlzLl9lcHNpbG9uKCBlbGVtZW50c1swXSApXHJcbiAgICAgICAgfSwke1xyXG4gICAgICAgICAgICB0aGlzLl9lcHNpbG9uKCBlbGVtZW50c1sxXSApXHJcbiAgICAgICAgfSwke1xyXG4gICAgICAgICAgICB0aGlzLl9lcHNpbG9uKCBlbGVtZW50c1syXSAqIC1kaXJlY3Rpb24gKVxyXG4gICAgICAgIH0sJHtcclxuICAgICAgICAgICAgdGhpcy5fZXBzaWxvbiggZWxlbWVudHNbM10gKVxyXG4gICAgICAgIH0sJHtcclxuICAgICAgICAgICAgdGhpcy5fZXBzaWxvbiggLSBlbGVtZW50c1s0XSApXHJcbiAgICAgICAgfSwke1xyXG4gICAgICAgICAgICB0aGlzLl9lcHNpbG9uKCAtIGVsZW1lbnRzWzVdIClcclxuICAgICAgICB9LCR7XHJcbiAgICAgICAgICAgIHRoaXMuX2Vwc2lsb24oIGVsZW1lbnRzWzZdICAqIGRpcmVjdGlvbiApXHJcbiAgICAgICAgfSwke1xyXG4gICAgICAgICAgICB0aGlzLl9lcHNpbG9uKCAtIGVsZW1lbnRzWzddIClcclxuICAgICAgICB9LCR7XHJcbiAgICAgICAgICAgIHRoaXMuX2Vwc2lsb24oIGVsZW1lbnRzWzhdICogLWRpcmVjdGlvbiApXHJcbiAgICAgICAgfSwke1xyXG4gICAgICAgICAgICB0aGlzLl9lcHNpbG9uKCBlbGVtZW50c1s5XSAqIC1kaXJlY3Rpb24gKVxyXG4gICAgICAgIH0sJHtcclxuICAgICAgICAgICAgdGhpcy5fZXBzaWxvbiggZWxlbWVudHNbMTBdIClcclxuICAgICAgICB9LCR7XHJcbiAgICAgICAgICAgIHRoaXMuX2Vwc2lsb24oIGVsZW1lbnRzWzExXSAqIGRpcmVjdGlvbiApXHJcbiAgICAgICAgfSwke1xyXG4gICAgICAgICAgICB0aGlzLl9lcHNpbG9uKCBlbGVtZW50c1sxMl0gKiBkaXJlY3Rpb24gKVxyXG4gICAgICAgIH0sJHtcclxuICAgICAgICAgICAgdGhpcy5fZXBzaWxvbiggZWxlbWVudHNbMTNdICogZGlyZWN0aW9uIClcclxuICAgICAgICB9LCR7XHJcbiAgICAgICAgICAgIHRoaXMuX2Vwc2lsb24oIGVsZW1lbnRzWzE0XSAqIGRpcmVjdGlvbiApXHJcbiAgICAgICAgfSwke1xyXG4gICAgICAgICAgICB0aGlzLl9lcHNpbG9uKCBlbGVtZW50c1sxNV0gKVxyXG4gICAgICAgIH0pYDtcclxuICAgICAgICByZXR1cm4gbWF0cml4M2Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9nZXRUcmFuc2Zvcm1hdGlvbk1hdHJpeChodG1sTWVzaDogSHRtbE1lc2gsIHVzZVJpZ2h0SGFuZGVkU3lzdGVtOiBib29sZWFuKTogTWF0cml4IHtcclxuICAgICAgICAvLyBHZXQgdGhlIGNhbWVyYSB3b3JsZCBtYXRyaXhcclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIGNhbWVyYSB3b3JsZCBtYXRyaXggaXMgdXAgdG8gZGF0ZVxyXG4gICAgICAgIGlmICghdGhpcy5fY2FtZXJhV29ybGRNYXRyaXgpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FtZXJhV29ybGRNYXRyaXggPSBodG1sTWVzaC5nZXRTY2VuZSgpLmFjdGl2ZUNhbWVyYT8uZ2V0V29ybGRNYXRyaXgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jYW1lcmFXb3JsZE1hdHJpeCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0cml4LklkZW50aXR5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBvYmplY3RXb3JsZE1hdHJpeCA9IGh0bWxNZXNoLmdldFdvcmxkTWF0cml4KCk7XHJcblxyXG4gICAgICAgIC8vIFNjYWxlIHRoZSBvYmplY3QgbWF0cml4IGJ5IHRoZSBiYXNlIHNjYWxlIGZhY3RvciBmb3IgdGhlIG1lc2hcclxuICAgICAgICAvLyB3aGljaCBpcyB0aGUgcmF0aW8gb2YgdGhlIG1lc2ggd2lkdGgvaGVpZ2h0IHRvIHRoZSByZW5kZXJlclxyXG4gICAgICAgIC8vIHdpZHRoL2hlaWdodCBkaXZpZGVkIGJ5IHRoZSBiYWJ5bG9uIHVuaXRzIHRvIHBpeGVscyByYXRpb1xyXG4gICAgICAgIGxldCB3aWR0aFNjYWxlRmFjdG9yID0gMTtcclxuICAgICAgICBsZXQgaGVpZ2h0U2NhbGVGYWN0b3IgPSAxO1xyXG4gICAgICAgIGlmIChodG1sTWVzaC5zb3VyY2VXaWR0aCAmJiBodG1sTWVzaC5zb3VyY2VIZWlnaHQpIHtcclxuICAgICAgICAgICAgd2lkdGhTY2FsZUZhY3RvciA9IGh0bWxNZXNoLndpZHRoISAvIChodG1sTWVzaC5zb3VyY2VXaWR0aCAvIGJhYnlsb25Vbml0c1RvUGl4ZWxzKTtcclxuICAgICAgICAgICAgaGVpZ2h0U2NhbGVGYWN0b3IgPSBodG1sTWVzaC5oZWlnaHQhIC8gKGh0bWxNZXNoLnNvdXJjZUhlaWdodCAvIGJhYnlsb25Vbml0c1RvUGl4ZWxzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFwcGx5IHRoZSBzY2FsZSB0byB0aGUgb2JqZWN0J3Mgd29ybGQgbWF0cml4LiAgTm90ZSB3ZSBhcmVuJ3Qgc2NhbGluZ1xyXG4gICAgICAgIC8vIHRoZSBvYmplY3QsIGp1c3QgZ2V0dGluZyBhIG1hdHJpeCBhcyB0aG91Z2ggaXQgd2VyZSBzY2FsZWQsIHNvIHdlIGNhblxyXG4gICAgICAgIC8vIHNjYWxlIHRoZSBjb250ZW50XHJcbiAgICAgICAgY29uc3Qgc2NhbGVUcmFuc2Zvcm0gPSB0aGlzLl90ZW1wLnNjYWxlVHJhbnNmb3JtO1xyXG4gICAgICAgIGNvbnN0IHJvdGF0aW9uVHJhbnNmb3JtID0gdGhpcy5fdGVtcC5yb3RhdGlvblRyYW5zZm9ybTtcclxuICAgICAgICBjb25zdCBwb3NpdGlvblRyYW5zZm9ybSA9IHRoaXMuX3RlbXAucG9zaXRpb25UcmFuc2Zvcm07XHJcbiAgICAgICAgY29uc3Qgc2NhbGVkQW5kVHJhbnNsYXRlZE9iamVjdE1hdHJpeCA9IHRoaXMuX3RlbXAub2JqZWN0TWF0cml4O1xyXG5cclxuICAgICAgICBvYmplY3RXb3JsZE1hdHJpeC5kZWNvbXBvc2Uoc2NhbGVUcmFuc2Zvcm0sIHJvdGF0aW9uVHJhbnNmb3JtLCBwb3NpdGlvblRyYW5zZm9ybSk7XHJcbiAgICAgICAgc2NhbGVUcmFuc2Zvcm0ueCAqPSB3aWR0aFNjYWxlRmFjdG9yO1xyXG4gICAgICAgIHNjYWxlVHJhbnNmb3JtLnkgKj0gaGVpZ2h0U2NhbGVGYWN0b3I7XHJcblxyXG4gICAgICAgIE1hdHJpeC5Db21wb3NlVG9SZWYoc2NhbGVUcmFuc2Zvcm0sIHJvdGF0aW9uVHJhbnNmb3JtLCBwb3NpdGlvblRyYW5zZm9ybSwgc2NhbGVkQW5kVHJhbnNsYXRlZE9iamVjdE1hdHJpeCk7XHJcblxyXG4gICAgICAgIC8vIEFkanVzdCBkaXJlY3Rpb24gb2YgMTIgYW5kIDEzIG9mIHRoZSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXggYmFzZWQgb24gdGhlIGhhbmRlZG5lc3Mgb2YgdGhlIHN5c3RlbVxyXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHVzZVJpZ2h0SGFuZGVkU3lzdGVtID8gLTEgOiAxO1xyXG4gICAgICAgIC8vIEFkanVzdCB0cmFuc2xhdGlvbiB2YWx1ZXMgdG8gYmUgZnJvbSBjYW1lcmEgdnMgd29ybGQgb3JpZ2luXHJcbiAgICAgICAgLy8gTm90ZSB0aGF0IHdlIGFyZSBhbHNvIGFkanVzdGluZyB0aGVzZSB2YWx1ZXMgdG8gYmUgcGl4ZWxzIHZzIEJhYnlsb24gdW5pdHNcclxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGh0bWxNZXNoLmdldEFic29sdXRlUG9zaXRpb24oKTtcclxuICAgICAgICBzY2FsZWRBbmRUcmFuc2xhdGVkT2JqZWN0TWF0cml4LnNldFJvd0Zyb21GbG9hdHMoXHJcbiAgICAgICAgICAgIDMsXHJcbiAgICAgICAgICAgICgtdGhpcy5fY2FtZXJhV29ybGRNYXRyaXgubVsxMl0gKyBwb3NpdGlvbi54KSAqIGJhYnlsb25Vbml0c1RvUGl4ZWxzICogZGlyZWN0aW9uLFxyXG4gICAgICAgICAgICAoLXRoaXMuX2NhbWVyYVdvcmxkTWF0cml4Lm1bMTNdICsgcG9zaXRpb24ueSkgKiBiYWJ5bG9uVW5pdHNUb1BpeGVscyAqIGRpcmVjdGlvbixcclxuICAgICAgICAgICAgKHRoaXMuX2NhbWVyYVdvcmxkTWF0cml4Lm1bMTRdIC0gcG9zaXRpb24ueikgKiBiYWJ5bG9uVW5pdHNUb1BpeGVscyxcclxuICAgICAgICAgICAgdGhpcy5fY2FtZXJhV29ybGRNYXRyaXgubVsxNV0gKiAwLjAwMDAxICogYmFieWxvblVuaXRzVG9QaXhlbHNcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBBZGp1c3Qgb3RoZXIgdmFsdWVzIHRvIGJlIHBpeGVscyB2cyBCYWJ5bG9uIHVuaXRzXHJcbiAgICAgICAgc2NhbGVkQW5kVHJhbnNsYXRlZE9iamVjdE1hdHJpeC5tdWx0aXBseUF0SW5kZXgoMywgYmFieWxvblVuaXRzVG9QaXhlbHMpO1xyXG4gICAgICAgIHNjYWxlZEFuZFRyYW5zbGF0ZWRPYmplY3RNYXRyaXgubXVsdGlwbHlBdEluZGV4KDcsIGJhYnlsb25Vbml0c1RvUGl4ZWxzKTtcclxuICAgICAgICBzY2FsZWRBbmRUcmFuc2xhdGVkT2JqZWN0TWF0cml4Lm11bHRpcGx5QXRJbmRleCgxMSwgYmFieWxvblVuaXRzVG9QaXhlbHMpO1xyXG5cclxuICAgICAgICByZXR1cm4gc2NhbGVkQW5kVHJhbnNsYXRlZE9iamVjdE1hdHJpeDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX3JlbmRlckh0bWxNZXNoKGh0bWxNZXNoOiBIdG1sTWVzaCwgdXNlUmlnaHRIYW5kZWRTeXN0ZW06IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoIWh0bWxNZXNoLmVsZW1lbnQgfHwgIWh0bWxNZXNoLmVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpIHtcclxuICAgICAgICAgICAgLy8gbm90aGluZyB0byByZW5kZXIsIHNvIGJhaWxcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gV2UgbmVlZCB0byBlbnN1cmUgaHRtbCBtZXNoIGRhdGEgaXMgaW5pdGlhbGl6ZWQgYmVmb3JlXHJcbiAgICAgICAgLy8gY29tcHV0aW5nIHRoZSBiYXNlIHNjYWxlIGZhY3RvclxyXG4gICAgICAgIGxldCBodG1sTWVzaERhdGEgPSB0aGlzLl9jYWNoZS5odG1sTWVzaERhdGEuZ2V0KGh0bWxNZXNoKTtcclxuICAgICAgICBpZiAoIWh0bWxNZXNoRGF0YSkge1xyXG4gICAgICAgICAgICBodG1sTWVzaERhdGEgPSB7IHN0eWxlOiBcIlwiIH07XHJcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlLmh0bWxNZXNoRGF0YS5zZXQoaHRtbE1lc2gsIGh0bWxNZXNoRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjYW1lcmFFbGVtZW50ID0gaHRtbE1lc2guX2lzQ2FudmFzT3ZlcmxheSA/IHRoaXMuX292ZXJsYXlFbGVtZW50cz8uY2FtZXJhRWxlbWVudCA6IHRoaXMuX2luU2NlbmVFbGVtZW50cz8uY2FtZXJhRWxlbWVudDtcclxuXHJcbiAgICAgICAgaWYgKGh0bWxNZXNoLmVsZW1lbnQucGFyZW50Tm9kZSAhPT0gY2FtZXJhRWxlbWVudCkge1xyXG4gICAgICAgICAgICBjYW1lcmFFbGVtZW50IS5hcHBlbmRDaGlsZChodG1sTWVzaC5lbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBodG1sTWVzaCBjb250ZW50IGhhcyBjaGFuZ2VkLCB1cGRhdGUgdGhlIGJhc2Ugc2NhbGUgZmFjdG9yXHJcbiAgICAgICAgaWYgKGh0bWxNZXNoLnJlcXVpcmVzVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUJhc2VTY2FsZUZhY3RvcihodG1sTWVzaCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIHRyYW5zZm9ybWF0aW9uIG1hdHJpeCBmb3IgdGhlIGh0bWwgbWVzaFxyXG4gICAgICAgIGNvbnN0IHNjYWxlZEFuZFRyYW5zbGF0ZWRPYmplY3RNYXRyaXggPSB0aGlzLl9nZXRUcmFuc2Zvcm1hdGlvbk1hdHJpeChodG1sTWVzaCwgdXNlUmlnaHRIYW5kZWRTeXN0ZW0pO1xyXG5cclxuICAgICAgICBsZXQgc3R5bGUgPSBgdHJhbnNsYXRlKC01MCUsIC01MCUpICR7dGhpcy5fZ2V0SHRtbENvbnRlbnRDU1NNYXRyaXgoc2NhbGVkQW5kVHJhbnNsYXRlZE9iamVjdE1hdHJpeCwgdXNlUmlnaHRIYW5kZWRTeXN0ZW0pfWA7XHJcbiAgICAgICAgLy8gSW4gYSByaWdodCBoYW5kZWQgc3lzdGVtLCBzY3JlZW5zIGFyZSBvbiB0aGUgd3Jvbmcgc2lkZSBvZiB0aGUgbWVzaCwgc28gd2UgaGF2ZSB0byByb3RhdGUgYnkgTWF0aC5QSSB3aGljaCByZXN1bHRzIGluIHRoZSBtYXRyaXgzZCBzZWVuIGJlbG93XHJcbiAgICAgICAgc3R5bGUgKz0gYCR7dXNlUmlnaHRIYW5kZWRTeXN0ZW0gPyBcIm1hdHJpeDNkKC0xLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAtMSwgMCwgMCwgMCwgMCwgMSlcIiA6IFwiXCJ9YDtcclxuXHJcbiAgICAgICAgaWYgKGh0bWxNZXNoRGF0YS5zdHlsZSAhPT0gc3R5bGUpIHtcclxuICAgICAgICAgICAgaHRtbE1lc2guZWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBzdHlsZTtcclxuICAgICAgICAgICAgaHRtbE1lc2guZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBzdHlsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGh0bWxNZXNoLl9tYXJrQXNVcGRhdGVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9yZW5kZXIoc2NlbmU6IFNjZW5lLCBjYW1lcmE6IENhbWVyYSkge1xyXG4gICAgICAgIGxldCBuZWVkc1VwZGF0ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb25zdCB1c2VSaWdodEhhbmRlZFN5c3RlbSA9IHNjZW5lLnVzZVJpZ2h0SGFuZGVkU3lzdGVtO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIGNvbnRhaW5lciBwb3NpdGlvbiBhbmQgc2l6ZSBpZiBuZWNlc3NhcnlcclxuICAgICAgICB0aGlzLl91cGRhdGVDb250YWluZXJQb3NpdGlvbklmTmVlZGVkKCk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciBhIGNhbWVyYSBjaGFuZ2VcclxuICAgICAgICBpZiAodGhpcy5fY2FtZXJhTWF0cml4VXBkYXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jYW1lcmFNYXRyaXhVcGRhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBjYW1lcmEgcG9zaXRpb24gaGFzIGNoYW5nZWQsIHRoZW4gd2UgYWxzbyBuZWVkIHRvIHVwZGF0ZVxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnggIT09IHRoaXMuX2NhY2hlLmNhbWVyYURhdGEucG9zaXRpb24ueCB8fFxyXG4gICAgICAgICAgICBjYW1lcmEucG9zaXRpb24ueSAhPT0gdGhpcy5fY2FjaGUuY2FtZXJhRGF0YS5wb3NpdGlvbi55IHx8XHJcbiAgICAgICAgICAgIGNhbWVyYS5wb3NpdGlvbi56ICE9PSB0aGlzLl9jYWNoZS5jYW1lcmFEYXRhLnBvc2l0aW9uLnpcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FjaGUuY2FtZXJhRGF0YS5wb3NpdGlvbi5jb3B5RnJvbShjYW1lcmEucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBuZWVkc1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3IgYSBkcHIgY2hhbmdlXHJcbiAgICAgICAgaWYgKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvICE9PSB0aGlzLl9sYXN0RGV2aWNlUGl4ZWxSYXRpbykge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0RGV2aWNlUGl4ZWxSYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xyXG4gICAgICAgICAgICBMb2dnZXIuTG9nKFwiSW4gcmVuZGVyIC0gZHByIGNoYW5nZWQ6IFwiLCB0aGlzLl9sYXN0RGV2aWNlUGl4ZWxSYXRpbyk7XHJcbiAgICAgICAgICAgIG5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIGFueSBtZXNoZXMgbmVlZCB0byBiZSB1cGRhdGVkXHJcbiAgICAgICAgY29uc3QgbWVzaGVzTmVlZGluZ1VwZGF0ZSA9IHNjZW5lLm1lc2hlcy5maWx0ZXIoKG1lc2gpID0+IChtZXNoIGFzIGFueSlbXCJpc0h0bWxNZXNoXCJdICYmIChuZWVkc1VwZGF0ZSB8fCAobWVzaCBhcyBIdG1sTWVzaCkucmVxdWlyZXNVcGRhdGUpKTtcclxuICAgICAgICBuZWVkc1VwZGF0ZSA9IG5lZWRzVXBkYXRlIHx8IG1lc2hlc05lZWRpbmdVcGRhdGUubGVuZ3RoID4gMDtcclxuXHJcbiAgICAgICAgaWYgKCFuZWVkc1VwZGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBHZXQgYSBwcm9qZWN0aW9uIG1hdHJpeCBmb3IgdGhlIGNhbWVyYVxyXG4gICAgICAgIGNvbnN0IHByb2plY3Rpb25NYXRyaXggPSBjYW1lcmEuZ2V0UHJvamVjdGlvbk1hdHJpeCgpO1xyXG4gICAgICAgIGNvbnN0IGZvdiA9IHByb2plY3Rpb25NYXRyaXgubVs1XSAqIHRoaXMuX2hlaWdodEhhbGY7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jYWNoZS5jYW1lcmFEYXRhLmZvdiAhPT0gZm92KSB7XHJcbiAgICAgICAgICAgIGlmIChjYW1lcmEubW9kZSA9PSBDYW1lcmEuUEVSU1BFQ1RJVkVfQ0FNRVJBKSB7XHJcbiAgICAgICAgICAgICAgICBbdGhpcy5fb3ZlcmxheUVsZW1lbnRzPy5kb21FbGVtZW50LCB0aGlzLl9pblNjZW5lRWxlbWVudHM/LmRvbUVsZW1lbnRdLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID0gZm92ICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5wZXJzcGVjdGl2ZSA9IGZvdiArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFt0aGlzLl9vdmVybGF5RWxlbWVudHM/LmRvbUVsZW1lbnQsIHRoaXMuX2luU2NlbmVFbGVtZW50cz8uZG9tRWxlbWVudF0uZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5wZXJzcGVjdGl2ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fY2FjaGUuY2FtZXJhRGF0YS5mb3YgPSBmb3Y7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIENTUyBtYXRyaXggZm9yIHRoZSBjYW1lcmEgKHdoaWNoIHdpbGwgaW5jbHVkZSBhbnkgY2FtZXJhIHJvdGF0aW9uKVxyXG4gICAgICAgIGlmIChjYW1lcmEucGFyZW50ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNhbWVyYS5jb21wdXRlV29ybGRNYXRyaXgoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNhbWVyYU1hdHJpeFdvcmxkID0gdGhpcy5fdGVtcC5jYW1lcmFXb3JsZE1hdHJpeDtcclxuICAgICAgICBjYW1lcmFNYXRyaXhXb3JsZC5jb3B5RnJvbShjYW1lcmEuZ2V0V29ybGRNYXRyaXgoKSk7XHJcbiAgICAgICAgY29uc3QgY2FtZXJhUm90YXRpb25NYXRyaXggPSB0aGlzLl90ZW1wLmNhbWVyYVJvdGF0aW9uTWF0cml4O1xyXG4gICAgICAgIGNhbWVyYU1hdHJpeFdvcmxkLmdldFJvdGF0aW9uTWF0cml4KCkudHJhbnNwb3NlVG9SZWYoY2FtZXJhUm90YXRpb25NYXRyaXgpO1xyXG5cclxuICAgICAgICBjb25zdCBjYW1lcmFNYXRyaXhXb3JsZEFzQXJyYXkgPSB0aGlzLl90ZW1wLmNhbWVyYVdvcmxkTWF0cml4QXNBcnJheTtcclxuICAgICAgICBjYW1lcmFNYXRyaXhXb3JsZC5jb3B5VG9BcnJheShjYW1lcmFNYXRyaXhXb3JsZEFzQXJyYXkpO1xyXG5cclxuICAgICAgICAvLyBGb3IgYSBmZXcgdmFsdWVzLCB3ZSBoYXZlIHRvIGFkanVzdCB0aGUgZGlyZWN0aW9uIGJhc2VkIG9uIHRoZSBoYW5kZWRuZXNzIG9mIHRoZSBzeXN0ZW1cclxuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB1c2VSaWdodEhhbmRlZFN5c3RlbSA/IDEgOiAtMTtcclxuXHJcbiAgICAgICAgY2FtZXJhTWF0cml4V29ybGRBc0FycmF5WzFdID0gY2FtZXJhUm90YXRpb25NYXRyaXgubVsxXTtcclxuICAgICAgICBjYW1lcmFNYXRyaXhXb3JsZEFzQXJyYXlbMl0gPSBjYW1lcmFSb3RhdGlvbk1hdHJpeC5tWzJdICogZGlyZWN0aW9uO1xyXG4gICAgICAgIGNhbWVyYU1hdHJpeFdvcmxkQXNBcnJheVs0XSA9IGNhbWVyYVJvdGF0aW9uTWF0cml4Lm1bNF0gKiBkaXJlY3Rpb247XHJcbiAgICAgICAgY2FtZXJhTWF0cml4V29ybGRBc0FycmF5WzZdID0gY2FtZXJhUm90YXRpb25NYXRyaXgubVs2XSAqIGRpcmVjdGlvbjtcclxuICAgICAgICBjYW1lcmFNYXRyaXhXb3JsZEFzQXJyYXlbOF0gPSBjYW1lcmFSb3RhdGlvbk1hdHJpeC5tWzhdICogZGlyZWN0aW9uO1xyXG4gICAgICAgIGNhbWVyYU1hdHJpeFdvcmxkQXNBcnJheVs5XSA9IGNhbWVyYVJvdGF0aW9uTWF0cml4Lm1bOV0gKiBkaXJlY3Rpb247XHJcblxyXG4gICAgICAgIE1hdHJpeC5Gcm9tQXJyYXlUb1JlZihjYW1lcmFNYXRyaXhXb3JsZEFzQXJyYXksIDAsIGNhbWVyYU1hdHJpeFdvcmxkKTtcclxuXHJcbiAgICAgICAgY29uc3QgY2FtZXJhQ1NTTWF0cml4ID0gdGhpcy5fZ2V0Q2FtZXJhQ1NTTWF0cml4KGNhbWVyYU1hdHJpeFdvcmxkKTtcclxuICAgICAgICBjb25zdCBzdHlsZSA9IGNhbWVyYUNTU01hdHJpeDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2NhY2hlLmNhbWVyYURhdGEuc3R5bGUgIT09IHN0eWxlKSB7XHJcbiAgICAgICAgICAgIFt0aGlzLl9pblNjZW5lRWxlbWVudHM/LmNhbWVyYUVsZW1lbnQsIHRoaXMuX292ZXJsYXlFbGVtZW50cz8uY2FtZXJhRWxlbWVudF0uZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHN0eWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLnRyYW5zZm9ybSA9IHN0eWxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5fY2FjaGUuY2FtZXJhRGF0YS5zdHlsZSA9IHN0eWxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gX1JlbmRlciBvYmplY3RzIGlmIG5lY2Vzc2FyeVxyXG4gICAgICAgIG1lc2hlc05lZWRpbmdVcGRhdGUuZm9yRWFjaCgobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJIdG1sTWVzaChtZXNoIGFzIEh0bWxNZXNoLCB1c2VSaWdodEhhbmRlZFN5c3RlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF91cGRhdGVCYXNlU2NhbGVGYWN0b3IoaHRtbE1lc2g6IEh0bWxNZXNoKSB7XHJcbiAgICAgICAgLy8gR2V0IHNjcmVlbiB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgICAgICAgbGV0IHNjcmVlbldpZHRoID0gdGhpcy5fd2lkdGg7XHJcbiAgICAgICAgbGV0IHNjcmVlbkhlaWdodCA9IHRoaXMuX2hlaWdodDtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIGFzcGVjdCByYXRpb3NcclxuICAgICAgICBjb25zdCBodG1sTWVzaEFzcGVjdFJhdGlvID0gKGh0bWxNZXNoLndpZHRoIHx8IDEpIC8gKGh0bWxNZXNoLmhlaWdodCB8fCAxKTtcclxuICAgICAgICBjb25zdCBzY3JlZW5Bc3BlY3RSYXRpbyA9IHNjcmVlbldpZHRoIC8gc2NyZWVuSGVpZ2h0O1xyXG5cclxuICAgICAgICAvLyBBZGp1c3Qgc2NyZWVuIGRpbWVuc2lvbnMgYmFzZWQgb24gYXNwZWN0IHJhdGlvc1xyXG4gICAgICAgIGlmIChodG1sTWVzaEFzcGVjdFJhdGlvID4gc2NyZWVuQXNwZWN0UmF0aW8pIHtcclxuICAgICAgICAgICAgLy8gSWYgdGhlIEhUTUwgbWVzaCBpcyB3aWRlciByZWxhdGl2ZSB0byBpdHMgaGVpZ2h0IHRoYW4gdGhlIHNjcmVlbiwgYWRqdXN0IHRoZSBzY3JlZW4gd2lkdGhcclxuICAgICAgICAgICAgc2NyZWVuV2lkdGggPSBzY3JlZW5IZWlnaHQgKiBodG1sTWVzaEFzcGVjdFJhdGlvO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBIVE1MIG1lc2ggaXMgdGFsbGVyIHJlbGF0aXZlIHRvIGl0cyB3aWR0aCB0aGFuIHRoZSBzY3JlZW4sIGFkanVzdCB0aGUgc2NyZWVuIGhlaWdodFxyXG4gICAgICAgICAgICBzY3JlZW5IZWlnaHQgPSBzY3JlZW5XaWR0aCAvIGh0bWxNZXNoQXNwZWN0UmF0aW87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXQgY29udGVudCB0byBmaWxsIHNjcmVlbiBzbyB3ZSBnZXQgbWF4IHJlc29sdXRpb24gd2hlbiBpdCBpcyBzaHJ1bmsgdG8gZml0IHRoZSBtZXNoXHJcbiAgICAgICAgaHRtbE1lc2guc2V0Q29udGVudFNpemVQeChzY3JlZW5XaWR0aCwgc2NyZWVuSGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX3VwZGF0ZUNvbnRhaW5lclBvc2l0aW9uSWZOZWVkZWQoKSB7XHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIHRoZSBjYW52YXMgaGFzIG1vdmVkIG9uIHRoZSBzY3JlZW5cclxuICAgICAgICBjb25zdCBjYW52YXNSZWN0ID0gdGhpcy5fZW5naW5lLmdldFJlbmRlcmluZ0NhbnZhc0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgLy8gY2FudmFzIHJlY3QgbWF5IGJlIG51bGwgaWYgbGF5b3V0IG5vdCBjb21wbGV0ZVxyXG4gICAgICAgIGlmICghY2FudmFzUmVjdCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuV2FybihfcG9zaXRpb25VcGRhdGVGYWlsTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnNjcm9sbFk7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsTGVmdCA9IHdpbmRvdy5zY3JvbGxYO1xyXG4gICAgICAgIGNvbnN0IGNhbnZhc0RvY3VtZW50VG9wID0gY2FudmFzUmVjdC50b3AgKyBzY3JvbGxUb3A7XHJcbiAgICAgICAgY29uc3QgY2FudmFzRG9jdW1lbnRMZWZ0ID0gY2FudmFzUmVjdC5sZWZ0ICsgc2Nyb2xsTGVmdDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3ByZXZpb3VzQ2FudmFzRG9jdW1lbnRQb3NpdGlvbi50b3AgIT09IGNhbnZhc0RvY3VtZW50VG9wIHx8IHRoaXMuX3ByZXZpb3VzQ2FudmFzRG9jdW1lbnRQb3NpdGlvbi5sZWZ0ICE9PSBjYW52YXNEb2N1bWVudExlZnQpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNDYW52YXNEb2N1bWVudFBvc2l0aW9uLnRvcCA9IGNhbnZhc0RvY3VtZW50VG9wO1xyXG4gICAgICAgICAgICB0aGlzLl9wcmV2aW91c0NhbnZhc0RvY3VtZW50UG9zaXRpb24ubGVmdCA9IGNhbnZhc0RvY3VtZW50TGVmdDtcclxuXHJcbiAgICAgICAgICAgIFt0aGlzLl9pblNjZW5lRWxlbWVudHM/LmNvbnRhaW5lciwgdGhpcy5fb3ZlcmxheUVsZW1lbnRzPy5jb250YWluZXJdLmZvckVhY2goKGNvbnRhaW5lcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjb250YWluZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHRvcCBhbmQgbGVmdCBvZiB0aGUgY3NzIGNvbnRhaW5lciB0byBtYXRjaCB0aGUgY2FudmFzXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWluZXJQYXJlbnQgPSBjb250YWluZXIub2Zmc2V0UGFyZW50IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50UmVjdCA9IGNvbnRhaW5lclBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudERvY3VtZW50VG9wID0gcGFyZW50UmVjdC50b3AgKyBzY3JvbGxUb3A7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnREb2N1bWVudExlZnQgPSBwYXJlbnRSZWN0LmxlZnQgKyBzY3JvbGxMZWZ0O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGFuY2VzdG9yTWFyZ2luc0FuZFBhZGRpbmcgPSB0aGlzLl9nZXRBbmNlc3Rvck1hcmdpbnNBbmRQYWRkaW5nKGNvbnRhaW5lclBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBib2R5IG1hcmdpblxyXG4gICAgICAgICAgICAgICAgY29uc3QgYm9keVN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBib2R5TWFyZ2luVG9wID0gcGFyc2VJbnQoYm9keVN0eWxlLm1hcmdpblRvcCwgMTApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYm9keU1hcmdpbkxlZnQgPSBwYXJzZUludChib2R5U3R5bGUubWFyZ2luTGVmdCwgMTApO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS50b3AgPSBgJHtjYW52YXNEb2N1bWVudFRvcCAtIHBhcmVudERvY3VtZW50VG9wIC0gYW5jZXN0b3JNYXJnaW5zQW5kUGFkZGluZy5tYXJnaW5Ub3AgKyBhbmNlc3Rvck1hcmdpbnNBbmRQYWRkaW5nLnBhZGRpbmdUb3AgKyBib2R5TWFyZ2luVG9wfXB4YDtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gYCR7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzRG9jdW1lbnRMZWZ0IC0gcGFyZW50RG9jdW1lbnRMZWZ0IC0gYW5jZXN0b3JNYXJnaW5zQW5kUGFkZGluZy5tYXJnaW5MZWZ0ICsgYW5jZXN0b3JNYXJnaW5zQW5kUGFkZGluZy5wYWRkaW5nTGVmdCArIGJvZHlNYXJnaW5MZWZ0XHJcbiAgICAgICAgICAgICAgICB9cHhgO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9vbkNhbWVyYU1hdHJpeENoYW5nZWQgPSAoY2FtZXJhOiBDYW1lcmEpID0+IHtcclxuICAgICAgICB0aGlzLl9jYW1lcmFXb3JsZE1hdHJpeCA9IGNhbWVyYS5nZXRXb3JsZE1hdHJpeCgpO1xyXG4gICAgICAgIHRoaXMuX2NhbWVyYU1hdHJpeFVwZGF0ZWQgPSB0cnVlO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9lcHNpbG9uKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5hYnModmFsdWUpIDwgMWUtMTAgPyAwIDogdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IHRvdGFsIG1hcmdpbnMgYW5kIHBhZGRpbmcgZm9yIGFuIGVsZW1lbnQsIGV4Y2x1ZGluZyB0aGUgYm9keSBhbmQgZG9jdW1lbnQgbWFyZ2luc1xyXG4gICAgcHJpdmF0ZSBfZ2V0QW5jZXN0b3JNYXJnaW5zQW5kUGFkZGluZyhlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGxldCBtYXJnaW5Ub3AgPSAwO1xyXG4gICAgICAgIGxldCBtYXJnaW5MZWZ0ID0gMDtcclxuICAgICAgICBsZXQgcGFkZGluZ1RvcCA9IDA7XHJcbiAgICAgICAgbGV0IHBhZGRpbmdMZWZ0ID0gMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQgJiYgZWxlbWVudCAhPT0gZG9jdW1lbnQuYm9keSAmJiBlbGVtZW50ICE9PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcclxuICAgICAgICAgICAgbWFyZ2luVG9wICs9IHBhcnNlSW50KHN0eWxlLm1hcmdpblRvcCwgMTApO1xyXG4gICAgICAgICAgICBtYXJnaW5MZWZ0ICs9IHBhcnNlSW50KHN0eWxlLm1hcmdpbkxlZnQsIDEwKTtcclxuICAgICAgICAgICAgcGFkZGluZ1RvcCArPSBwYXJzZUludChzdHlsZS5wYWRkaW5nVG9wLCAxMCk7XHJcbiAgICAgICAgICAgIHBhZGRpbmdMZWZ0ICs9IHBhcnNlSW50KHN0eWxlLnBhZGRpbmdMZWZ0LCAxMCk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7IG1hcmdpblRvcCwgbWFyZ2luTGVmdCwgcGFkZGluZ1RvcCwgcGFkZGluZ0xlZnQgfTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBIdG1sTWVzaFJlbmRlcmVyIH0gZnJvbSBcIi4vaHRtbE1lc2hSZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBIdG1sTWVzaCB9IGZyb20gXCIuL2h0bWxNZXNoXCI7XHJcbmltcG9ydCB7IFBvaW50ZXJFdmVudHNDYXB0dXJlQmVoYXZpb3IgfSBmcm9tIFwiLi9wb2ludGVyRXZlbnRzQ2FwdHVyZUJlaGF2aW9yXCI7XHJcbmltcG9ydCB7IEZpdFN0cmF0ZWd5IH0gZnJvbSBcIi4vZml0U3RyYXRlZ3lcIjtcclxuXHJcbi8vIEV4cG9ydCBwdWJsaWMgY2xhc3NlcyBhbmQgZnVuY3Rpb25zXHJcbmV4cG9ydCB7IEh0bWxNZXNoUmVuZGVyZXIsIEh0bWxNZXNoLCBQb2ludGVyRXZlbnRzQ2FwdHVyZUJlaGF2aW9yLCBGaXRTdHJhdGVneSB9O1xyXG4iLCJpbXBvcnQgeyBUb29scyB9IGZyb20gXCJjb3JlL01pc2MvdG9vbHNcIjtcclxuXHJcbi8vIEEgY2FwdHVyZSBtYW5hZ2VtZW50IHN5c3RlbSB0byBlbnN1cmUgdGhhdCB0aGUgY29ycmVjdCBvYmplY3QgaGFzIHRoZSBwb2ludGVyXHJcbi8vIGV2ZW50cyBieSBlbGltaW5hdGluZyByYWNlIGNvbmRpdGlvbnMgdGhhdCBjYW4gY2F1c2UgdGhlIHBvaW50ZXIgZXZlbnRzIHRvIGJlXHJcbi8vIHJlbGVhc2VkIGJ5IGEgZGlmZmVyZW50IG9iamVjdCBhZnRlciB0aGV5IGFyZSBjYXB0dXJlZCBsZWF2aW5nIG5vIG9iamVjdFxyXG4vLyBhcyB0aGUgb3duZXIuICBJdCBkb2VzIHRoaXMgYnkgcXVldWVpbmcgcmVxdWVzdHMgYW5kIG9ubHkgYWxsb3dpbmdcclxuLy8gY2FwdHVyZSB3aGVuIHRoZSBjdXJyZW50IGNhcHR1cmUgb3duZXIgcmVsZWFzZXMgcG9pbnRlciBldmVudHMuXHJcblxyXG50eXBlIENhcHR1cmVSZWxlYXNlQ2FsbGJhY2sgPSAoKSA9PiB2b2lkO1xyXG5cclxudHlwZSBDYXB0dXJlUmVsZWFzZUNhbGxiYWNrcyA9IHtcclxuICAgIGNhcHR1cmU6IENhcHR1cmVSZWxlYXNlQ2FsbGJhY2s7XHJcbiAgICByZWxlYXNlOiBDYXB0dXJlUmVsZWFzZUNhbGxiYWNrO1xyXG59O1xyXG5cclxubGV0IGNhcHR1cmVSZXF1ZXN0UXVldWU6IHN0cmluZ1tdID0gW107XHJcblxyXG4vLyBLZXkgaXMgcmVxdWVzdCBpZCwgdmFsdWUgaXMgb2JqZWN0IHdpdGggY2FwdHVyZSBhbmQgcmVsZWFzZSBjYWxsYmFja3NcclxuY29uc3QgcGVuZGluZ1JlcXVlc3RDYWxsYmFja3M6IE1hcDxzdHJpbmcsIENhcHR1cmVSZWxlYXNlQ2FsbGJhY2tzPiA9IG5ldyBNYXAoKTtcclxuXHJcbi8vIEtlZXAgdHJhY2sgb2YgcmVsZWFzZSByZXF1ZXN0cyB3aXRoIG5vIG1hdGNoaW5nIGNhcHR1cmUgcmVxdWVzdFxyXG4vLyBpbiBjYXNlIHRoZSByZWxlYXNlIHJlcXVlc3QgYXJyaXZlZCBiZWZvcmUgdGhlIGNhcHR1cmUgdG8gYXZvaWRcclxuLy8gdGhlIGNhcHR1cmUgcmVxdWVzdCBuZXZlciBnZXR0aW5nIHJlbGVhc2VkLlxyXG5sZXQgdW5tYXRjaGVkUmVsZWFzZVJlcXVlc3RzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxubGV0IGN1cnJlbnRPd25lcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7IC8vIENhbGxlZCBvbiBmaXJzdCBjYXB0dXJlIG9yIHJlbGVhc2UgcmVxdWVzdFxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgaWQgb2YgdGhlIG9iamVjdCBjdXJyZW50bHkgY2FwdHVyaW5nIHBvaW50ZXIgZXZlbnRzXHJcbiAqIEByZXR1cm5zIFRoZSBpZCBvZiB0aGUgb2JqZWN0IGN1cnJlbnRseSBjYXB0dXJpbmcgcG9pbnRlciBldmVudHNcclxuICogb3IgbnVsbCBpZiBubyBvYmplY3QgaXMgY2FwdHVyaW5nIHBvaW50ZXIgZXZlbnRzXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0Q2FwdHVyaW5nSWQgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gY3VycmVudE93bmVyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlcXVlc3QgdGhhdCB0aGUgb2JqZWN0IHdpdGggdGhlIGdpdmVuIGlkIGNhcHR1cmUgcG9pbnRlciBldmVudHMuICBJZiB0aGVyZSBpcyBubyBjdXJyZW50XHJcbiAqIG93bmVyLCB0aGVuIHRoZSByZXF1ZXN0IGlzIGdyYW50ZWQgaW1tZWRpYXRlbHkuICBJZiB0aGVyZSBpcyBhIGN1cnJlbnQgb3duZXIsIHRoZW4gdGhlIHJlcXVlc3RcclxuICogaXMgcXVldWVkIHVudGlsIHRoZSBjdXJyZW50IG93bmVyIHJlbGVhc2VzIHBvaW50ZXIgZXZlbnRzLlxyXG4gKiBAcGFyYW0gcmVxdWVzdElkIEFuIGlkIHRvIGlkZW50aWZ5IHRoZSByZXF1ZXN0LiAgVGhpcyBpZCB3aWxsIGJlIHVzZWQgdG8gbWF0Y2ggdGhlIGNhcHR1cmVcclxuICogcmVxdWVzdCB3aXRoIHRoZSByZWxlYXNlIHJlcXVlc3QuXHJcbiAqIEBwYXJhbSBjYXB0dXJlQ2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbiB0aGUgcmVxdWVzdCBpcyBncmFudGVkIGFuZCB0aGUgb2JqZWN0IGlzIGNhcHR1cmluZ1xyXG4gKiBAcGFyYW0gcmVsZWFzZUNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW4gdGhlIG9iamVjdCBpcyBubyBsb25nZXIgY2FwdHVyaW5nIHBvaW50ZXIgZXZlbnRzXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVxdWVzdENhcHR1cmUgPSAocmVxdWVzdElkOiBzdHJpbmcsIGNhcHR1cmVDYWxsYmFjazogQ2FwdHVyZVJlbGVhc2VDYWxsYmFjaywgcmVsZWFzZUNhbGxiYWNrOiBDYXB0dXJlUmVsZWFzZUNhbGxiYWNrKSA9PiB7XHJcbiAgICBkZWJ1Z0xvZyhgSW4gcG9pbnRlckV2ZW50c0NhcHR1cmUucmVxdWVzdENhcHR1cmUgLSBQb2ludGVyIGV2ZW50cyBjYXB0dXJlIHJlcXVlc3RlZCBmb3IgJHtyZXF1ZXN0SWR9YCk7XHJcblxyXG4gICAgLy8gSWYgdGhlcmUgaXMgYSByZWxlYXNlIGZvciB0aGlzIHJlcXVlc3QsIHRoZW4gaWdub3JlIHRoZSByZXF1ZXN0XHJcbiAgICBpZiAocmVtb3ZlVW5tYXRjaGVkUmVxdWVzdChyZXF1ZXN0SWQpKSB7XHJcbiAgICAgICAgZGVidWdMb2coYEluIHBvaW50ZXJFdmVudHNDYXB0dXJlLnJlcXVlc3RDYXB0dXJlIC0gQ2FwdHVyZSByZXF1ZXN0IG1hdGNoZWQgcHJldmlvdXMgcmVsZWFzZSByZXF1ZXN0ICR7cmVxdWVzdElkfS4gIENhbmNlbGxpbmcgY2FwdHVyZSByZXF1ZXN0YCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIGlmIChyZXF1ZXN0SWQgIT09IGN1cnJlbnRPd25lcikge1xyXG4gICAgICAgIC8vIGlmIHRoZSByZXF1ZXN0IGlzIG5vdCBhbHJlYWR5IGluIHRoZSBxdWV1ZSwgYWRkIGl0IHRvIHRoZSBxdWV1ZVxyXG4gICAgICAgIGVucXVldWVDYXB0dXJlUmVxdWVzdChyZXF1ZXN0SWQsIGNhcHR1cmVDYWxsYmFjaywgcmVsZWFzZUNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWN1cnJlbnRPd25lcikge1xyXG4gICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIGN1cnJlbnQgb3duZXIsIGdvIGFoZWFkIGFuZCBncmFudCB0aGUgcmVxdWVzdFxyXG4gICAgICAgIHRyYW5zZmVyUG9pbnRlckV2ZW50c093bmVyc2hpcCgpO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgdGhlIHJlcXVlc3QgaWQgaXMgdGhlIGN1cnJlbnQgb3duZXIsIGRvIG5vdGhpbmdcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWxlYXNlIHBvaW50ZXIgZXZlbnRzIGZyb20gdGhlIG9iamVjdCB3aXRoIHRoZSBnaXZlbiBpZC4gIElmIHRoZSBvYmplY3QgaXMgdGhlIGN1cnJlbnQgb3duZXJcclxuICogdGhlbiBwb2ludGVyIGV2ZW50cyBhcmUgcmVsZWFzZWQgaW1tZWRpYXRlbHkuICBJZiB0aGUgb2JqZWN0IGlzIG5vdCB0aGUgY3VycmVudCBvd25lciwgdGhlbiB0aGVcclxuICogYXNzb2NpYXRlZCBjYXB0dXJlIHJlcXVlc3QgaXMgcmVtb3ZlZCBmcm9tIHRoZSBxdWV1ZS4gIElmIHRoZXJlIGlzIG5vIG1hdGNoaW5nIGNhcHR1cmUgcmVxdWVzdFxyXG4gKiBpbiB0aGUgcXVldWUsIHRoZW4gdGhlIHJlbGVhc2UgcmVxdWVzdCBpcyBhZGRlZCB0byBhIGxpc3Qgb2YgdW5tYXRjaGVkIHJlbGVhc2UgcmVxdWVzdHMgYW5kIHdpbGxcclxuICogbmVnYXRlIHRoZSBuZXh0IGNhcHR1cmUgcmVxdWVzdCB3aXRoIHRoZSBzYW1lIGlkLiAgVGhpcyBpcyB0byBndWFyZCBhZ2FpbnN0IHRoZSBwb3NzaWJpbGl0eSB0aGF0XHJcbiAqIHRoZSByZWxlYXNlIHJlcXVlc3QgYXJyaXZlZCBiZWZvcmUgdGhlIGNhcHR1cmUgcmVxdWVzdC5cclxuICogQHBhcmFtIHJlcXVlc3RJZCBUaGUgaWQgd2hpY2ggc2hvdWxkIG1hdGNoIHRoZSBpZCBvZiB0aGUgY2FwdHVyZSByZXF1ZXN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVxdWVzdFJlbGVhc2UgPSAocmVxdWVzdElkOiBzdHJpbmcgfCBudWxsKSA9PiB7XHJcbiAgICBkZWJ1Z0xvZyhgSW4gcG9pbnRlckV2ZW50c0NhcHR1cmUucmVxdWVzdFJlbGVhc2UgLSBQb2ludGVyIGV2ZW50cyByZWxlYXNlIHJlcXVlc3RlZCBmb3IgJHtyZXF1ZXN0SWR9YCk7XHJcblxyXG4gICAgLy8gaWYgdGhlIHJlcXVlc3RJZCBpcyB0aGUgY3VycmVudCBjYXB0dXJlIGhvbGRlciByZWxlYXNlIGl0XHJcbiAgICBpZiAoIXJlcXVlc3RJZCB8fCByZXF1ZXN0SWQgPT09IGN1cnJlbnRPd25lcikge1xyXG4gICAgICAgIHRyYW5zZmVyUG9pbnRlckV2ZW50c093bmVyc2hpcCgpO1xyXG4gICAgfSBlbHNlIGlmIChjYW5jZWxSZXF1ZXN0KHJlcXVlc3RJZCkpIHtcclxuICAgICAgICAvLyBpZiB0aGUgcmVxdWVzdCBpcyBpbiB0aGUgcXVldWUsIGJ1dCBub3QgdGhlIGN1cnJlbnQgY2FwdHVyZSBob2xkZXIsIHJlbW92ZSBpdCBhbmQgaXQncyBjYWxsYmFja3NcclxuICAgICAgICBwZW5kaW5nUmVxdWVzdENhbGxiYWNrcy5kZWxldGUocmVxdWVzdElkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGVidWdMb2coYEluIHBvaW50ZXJFdmVudHNDYXB0dXJlLnJlcXVlc3RSZWxlYXNlIC0gUmVjZWl2ZWQgcmVsZWFzZSByZXF1ZXN0ICR7cmVxdWVzdElkfSBidXQgbm8gbWF0Y2hpbmcgY2FwdHVyZSByZXF1ZXN0IHdhcyByZWNlaXZlZGApO1xyXG4gICAgICAgIC8vIHJlcXVlc3Qgd2FzIG5vdCBjdXJyZW50IGFuZCBub3QgaW4gcXVldWUsIGxpa2VseSBiZWNhdXNlIHdlIHJlY2VpdmVkIGEgcmVsZWFzZVxyXG4gICAgICAgIC8vIHJlcXVlc3QgYmVmb3JlIHRoZSBjYXB0dXJlLiAgQWRkIGl0IHRvIHRoZSB1bm1hdGNoZWQgbGlzdCB0byBndWFyZCBhZ2FpbnN0IHRoaXMgcG9zc2liaWxpdHlcclxuICAgICAgICBpZiAoIXVubWF0Y2hlZFJlbGVhc2VSZXF1ZXN0cy5pbmNsdWRlcyhyZXF1ZXN0SWQpKSB7XHJcbiAgICAgICAgICAgIHVubWF0Y2hlZFJlbGVhc2VSZXF1ZXN0cy5wdXNoKHJlcXVlc3RJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbGFzZSBwb2ludGVyIGV2ZW50cyBmcm9tIHRoZSBjdXJyZW50IG93bmVyXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVsZWFzZUN1cnJlbnQgPSAoKSA9PiB7XHJcbiAgICByZXF1ZXN0UmVsZWFzZShjdXJyZW50T3duZXIpO1xyXG59O1xyXG5cclxuY29uc3QgZW5xdWV1ZUNhcHR1cmVSZXF1ZXN0ID0gKHJlcXVlc3RJZDogc3RyaW5nLCBjYXB0dXJlOiBDYXB0dXJlUmVsZWFzZUNhbGxiYWNrLCByZWxlYXNlOiBDYXB0dXJlUmVsZWFzZUNhbGxiYWNrKSA9PiB7XHJcbiAgICBkZWJ1Z0xvZyhgSW4gcG9pbnRlckV2ZW50c0NhcHR1cmUuZW5xdWV1ZUNhcHR1cmVSZXF1ZXN0IC0gRW5xdWV1ZWluZyBjYXB0dXJlIHJlcXVlc3QgZm9yICAke3JlcXVlc3RJZH1gKTtcclxuICAgIGlmICghY2FwdHVyZVJlcXVlc3RRdWV1ZS5pbmNsdWRlcyhyZXF1ZXN0SWQpKSB7XHJcbiAgICAgICAgY2FwdHVyZVJlcXVlc3RRdWV1ZS5wdXNoKHJlcXVlc3RJZCk7XHJcbiAgICAgICAgcGVuZGluZ1JlcXVlc3RDYWxsYmFja3Muc2V0KHJlcXVlc3RJZCwgeyBjYXB0dXJlLCByZWxlYXNlIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gUmVtb3ZlcyB0aGUgcmVxdWVzdCBmcm9tIHRoZSBxdWV1ZSBpZiBpdCBleGlzdHMuICBSZXR1cm5zIHRydWVcclxuLy8gaWYgdGhlIHJlcXVlc3Qgd2FzIGZvdW5kIGFuZCByZW1vdmVkLCBvdGhlcndpc2UgZmFsc2VcclxuY29uc3QgY2FuY2VsUmVxdWVzdCA9IChyZXF1ZXN0SWQ6IHN0cmluZyB8IG51bGwpID0+IHtcclxuICAgIGxldCByZW1vdmVkID0gZmFsc2U7XHJcbiAgICBjYXB0dXJlUmVxdWVzdFF1ZXVlID0gY2FwdHVyZVJlcXVlc3RRdWV1ZS5maWx0ZXIoKGlkKSA9PiB7XHJcbiAgICAgICAgaWYgKGlkICE9PSByZXF1ZXN0SWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVtb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGRlYnVnTG9nKGBJbiBwb2ludGVyRXZlbnRzQ2FwdHVyZS5jYW5jZWxSZXF1ZXN0IC0gQ2FuY2VsaW5nIHBvaW50ZXIgZXZlbnRzIGNhcHR1cmUgcmVxdWVzdCAke3JlcXVlc3RJZH1gKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlbW92ZWQ7XHJcbn07XHJcblxyXG5jb25zdCByZW1vdmVVbm1hdGNoZWRSZXF1ZXN0ID0gKHJlcXVlc3RJZDogc3RyaW5nKSA9PiB7XHJcbiAgICBsZXQgcmVtb3ZlZCA9IGZhbHNlO1xyXG4gICAgdW5tYXRjaGVkUmVsZWFzZVJlcXVlc3RzID0gdW5tYXRjaGVkUmVsZWFzZVJlcXVlc3RzLmZpbHRlcigoaWQpID0+IHtcclxuICAgICAgICBpZiAoaWQgIT09IHJlcXVlc3RJZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZW1vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlbW92ZWQ7XHJcbn07XHJcblxyXG5jb25zdCB0cmFuc2ZlclBvaW50ZXJFdmVudHNPd25lcnNoaXAgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBuZXdPd25lcklkID0gbmV4dENhcHR1cmVSZXF1ZXN0KCk7XHJcbiAgICBkZWJ1Z0xvZyhgSW4gcG9pbnRlckV2ZW50c0NhcHR1cmUudHJhbnNmZXJQb2ludGVyRXZlbnRzT3duZXJzaGlwIC0gVHJhbnNmZXJycmluZyBwb2ludGVyIGV2ZW50cyBmcm9tICR7Y3VycmVudE93bmVyfSB0byAke25ld093bmVySWR9YCk7XHJcbiAgICAvLyBSZWxlYXNlIHRoZSBjdXJyZW50IG93bmVyXHJcbiAgICBkb1JlbGVhc2UoKTtcclxuICAgIGlmIChuZXdPd25lcklkKSB7XHJcbiAgICAgICAgZG9DYXB0dXJlKG5ld093bmVySWQpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgZG9SZWxlYXNlID0gKCkgPT4ge1xyXG4gICAgZGVidWdMb2coYEluIHBvaW50ZXJFdmVudHNDYXB0dXJlLmRvUmVsZWFzZSAtIFJlbGVhc2luZyBwb2ludGVyIGV2ZW50cyBmcm9tICR7Y3VycmVudE93bmVyfWApO1xyXG4gICAgaWYgKGN1cnJlbnRPd25lcikge1xyXG4gICAgICAgIC8vIGNhbGwgdGhlIHJlbGVhc2UgY2FsbGJhY2tcclxuICAgICAgICBwZW5kaW5nUmVxdWVzdENhbGxiYWNrcy5nZXQoY3VycmVudE93bmVyKT8ucmVsZWFzZSgpO1xyXG4gICAgICAgIC8vIEFuZCByZW1vdmUgdGhlIGNhbGxiYWNrc1xyXG4gICAgICAgIHBlbmRpbmdSZXF1ZXN0Q2FsbGJhY2tzLmRlbGV0ZShjdXJyZW50T3duZXIpO1xyXG4gICAgICAgIGN1cnJlbnRPd25lciA9IG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBkb0NhcHR1cmUgPSAobmV3T3duZXJJZDogc3RyaW5nKSA9PiB7XHJcbiAgICBpZiAobmV3T3duZXJJZCkge1xyXG4gICAgICAgIC8vIGNhbGwgdGhlIGNhcHR1cmUgY2FsbGJhY2tcclxuICAgICAgICBwZW5kaW5nUmVxdWVzdENhbGxiYWNrcy5nZXQobmV3T3duZXJJZCk/LmNhcHR1cmUoKTtcclxuICAgIH1cclxuICAgIGN1cnJlbnRPd25lciA9IG5ld093bmVySWQ7XHJcbiAgICBkZWJ1Z0xvZyhgSW4gcG9pbnRlckV2ZW50c0NhcHR1cmUuZG9DYXB0dXJlIC0gUG9pbnRlciBldmVudHMgbm93IGNhcHR1cmVkIGJ5ICR7bmV3T3duZXJJZH1gKTtcclxufTtcclxuXHJcbmNvbnN0IG5leHRDYXB0dXJlUmVxdWVzdCA9ICgpID0+IHtcclxuICAgIHJldHVybiBjYXB0dXJlUmVxdWVzdFF1ZXVlLmxlbmd0aCA+IDAgPyBjYXB0dXJlUmVxdWVzdFF1ZXVlLnNoaWZ0KCkgOiBudWxsO1xyXG59O1xyXG5cclxuLy8gI3JlZ2lvbiBEZWJ1Z2dpbmcgc3VwcG9ydFxyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgICBpbnRlcmZhY2UgV2luZG93IHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbiAgICAgICAgXCJwb2ludGVyLWV2ZW50cy1jYXB0dXJlLWRlYnVnXCI6IGJvb2xlYW4gfCBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBkZWJ1Z0xvZyA9IChtZXNzYWdlOiBzdHJpbmcpID0+IHtcclxuICAgIC8vIElmIHdlIGFyZSBydW5ubmluZyBpbiBhIHRlc3QgcnVubmVyIChpbiBub2RlLCBzbyB3aW5kb3cgaXMgbm90IGRlZmluZWQpXHJcbiAgICAvLyBvciBpZiB0aGUgZGVidWcgZmxhZyBpcyBzZXQsIHRoZW4gbG9nIHRoZSBtZXNzYWdlXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB3aW5kb3dbXCJwb2ludGVyLWV2ZW50cy1jYXB0dXJlLWRlYnVnXCJdKSB7XHJcbiAgICAgICAgVG9vbHMuTG9nKFxyXG4gICAgICAgICAgICBgJHtwZXJmb3JtYW5jZS5ub3coKX0gLSBnYW1lLnNjZW5lLnBvaW50ZXJFdmVudHMgLSAke21lc3NhZ2V9XFxuY3VycmVudE93bmVyOiAke2N1cnJlbnRPd25lcn1cXG5xdWV1ZTogJHtjYXB0dXJlUmVxdWVzdFF1ZXVlfVxcbnVubWF0Y2hlZDogJHt1bm1hdGNoZWRSZWxlYXNlUmVxdWVzdHN9YFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcbi8vICNlbmRyZWdpb24gRGVidWdnaW5nIHN1cHBvcnRcclxuIiwiaW1wb3J0IHR5cGUgeyBBYnN0cmFjdE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvYWJzdHJhY3RNZXNoXCI7XHJcbmltcG9ydCB0eXBlIHsgQmVoYXZpb3IgfSBmcm9tIFwiY29yZS9CZWhhdmlvcnMvYmVoYXZpb3JcIjtcclxuaW1wb3J0IHR5cGUgeyBTY2VuZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JlL01pc2MvbG9nZ2VyXCI7XHJcbmltcG9ydCB7IHJlcXVlc3RDYXB0dXJlLCByZXF1ZXN0UmVsZWFzZSwgcmVsZWFzZUN1cnJlbnQsIGdldENhcHR1cmluZ0lkIH0gZnJvbSBcIi4vcG9pbnRlckV2ZW50c0NhcHR1cmVcIjtcclxuXHJcbi8vIE1vZHVsZSBsZXZlbCB2YXJpYWJsZSBmb3IgaG9sZGluZyB0aGUgY3VycmVudCBzY2VuZVxyXG5sZXQgX3NjZW5lOiBTY2VuZSB8IG51bGwgPSBudWxsO1xyXG5cclxuLy8gTW9kdWxlIGxldmVsIHZhcmlhYmxlIHRvIGhvbGQgdGhlIGNvdW50IG9mIGJlaGF2aW9yIGluc3RhbmNlcyB0aGF0IGFyZSBjdXJyZW50bHkgY2FwdHVyaW5nIHBvaW50ZXIgZXZlbnRzXHJcbi8vIG9uIGVudHJ5LiAgVGhpcyBpcyB1c2VkIHRvIGRldGVybWluZSBpZiB3ZSBuZWVkIHRvIHN0YXJ0IG9yIHN0b3Agb2JzZXJ2aW5nIHBvaW50ZXIgbW92ZW1lbnQuXHJcbmxldCBjYXB0dXJlT25FbnRlckNvdW50ID0gMDtcclxuXHJcbi8vIE1hcCB1c2VkIHRvIHN0b3JlIGluc3RhbmNlIG9mIHRoZSBQb2ludGVyRXZlbnRzQ2FwdHVyZUJlaGF2aW9yIGZvciBhIG1lc2hcclxuLy8gV2UgZG8gdGhpcyBiZWNhdXNlIHRoaXMgZ2V0cyBjaGVja2VkIG9uIHBvaW50ZXIgbW92ZSBhbmQgd2UgZG9uJ3Qgd2FudCB0b1xyXG4vLyB1c2UgZ2V0QmVoYXZpb3JCeU5hbWUoKSBiZWNhdXNlIHRoYXQgaXMgYSBsaW5lYXIgc2VhcmNoXHJcbmNvbnN0IG1lc2hUb0JlaGF2aW9yTWFwID0gbmV3IFdlYWtNYXA8QWJzdHJhY3RNZXNoLCBQb2ludGVyRXZlbnRzQ2FwdHVyZUJlaGF2aW9yPigpO1xyXG5cclxuY29uc3Qgc3RhcnRDYXB0dXJlT25FbnRlciA9IChzY2VuZTogU2NlbmUpID0+IHtcclxuICAgIC8vIElmIHdlIGFyZSBub3QgaW4gYSBicm93c2VyLCBkbyBub3RoaW5nXHJcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGNhcHR1cmVPbkVudGVyQ291bnQgPT09IDApIHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgb25Qb2ludGVyTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgb25Qb2ludGVyTW92ZSk7XHJcbiAgICAgICAgX3NjZW5lID0gX3NjZW5lID8/IHNjZW5lO1xyXG4gICAgICAgIExvZ2dlci5Mb2coXCJQb2ludGVyRXZlbnRzQ2FwdHVyZUJlaGF2aW9yOiBTdGFydGluZyBvYnNlcnZhdGlvbiBvZiBwb2ludGVyIG1vdmUgZXZlbnRzLlwiKTtcclxuICAgICAgICBfc2NlbmUub25EaXNwb3NlT2JzZXJ2YWJsZS5hZGQoZG9TdG9wQ2FwdHVyZU9uRW50ZXIpO1xyXG4gICAgfVxyXG4gICAgY2FwdHVyZU9uRW50ZXJDb3VudCsrO1xyXG59O1xyXG5cclxuY29uc3QgZG9TdG9wQ2FwdHVyZU9uRW50ZXIgPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgb25Qb2ludGVyTW92ZSk7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBvblBvaW50ZXJNb3ZlKTtcclxuICAgIF9zY2VuZSA9IG51bGw7XHJcbiAgICBMb2dnZXIuTG9nKFwiUG9pbnRlckV2ZW50c0NhcHR1cmVCZWhhdmlvcjogU3RvcHBpbmcgb2JzZXJ2YXRpb24gb2YgcG9pbnRlciBtb3ZlIGV2ZW50cy5cIik7XHJcbiAgICBjYXB0dXJlT25FbnRlckNvdW50ID0gMDtcclxufTtcclxuXHJcbmNvbnN0IHN0b3BDYXB0dXJlT25FbnRlciA9ICgpID0+IHtcclxuICAgIC8vIElmIHdlIGFyZSBub3QgaW4gYSBicm93c2VyLCBkbyBub3RoaW5nXHJcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIHdlIGFyZSBub3Qgb2JzZXJ2aW5nIHBvaW50ZXIgbW92ZW1lbnQsIGRvIG5vdGhpbmdcclxuICAgIGlmICghX3NjZW5lKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNhcHR1cmVPbkVudGVyQ291bnQtLTtcclxuICAgIGlmIChjYXB0dXJlT25FbnRlckNvdW50IDw9IDApIHtcclxuICAgICAgICBkb1N0b3BDYXB0dXJlT25FbnRlcigpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gTW9kdWxlIGxldmVsIGZ1bmN0aW9uIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIGFuIGVudGVyZWQgbWVzaCBzaG91bGQgY2FwdHVyZSBwb2ludGVyIGV2ZW50c1xyXG5jb25zdCBvblBvaW50ZXJNb3ZlID0gKGV2dDogUG9pbnRlckV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xyXG4gICAgaWYgKCFfc2NlbmUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2FudmFzUmVjdCA9IF9zY2VuZS5nZXRFbmdpbmUoKS5nZXRSZW5kZXJpbmdDYW52YXNDbGllbnRSZWN0KCk7XHJcbiAgICBpZiAoIWNhbnZhc1JlY3QpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IHRoZSBvYmplY3QgdGhhdCBjb250YWlucyB0aGUgY2xpZW50IFggYW5kIFkgZnJvbSBlaXRoZXIgdGhlIHBvaW50ZXIgZXZlbnQgb3IgZnJvbSB0aGVcclxuICAgIC8vIFRvdWNoRXZlbnQgdG91Y2hcclxuICAgIGNvbnN0IHsgY2xpZW50WCwgY2xpZW50WSB9ID0gXCJ0b3VjaGVzXCIgaW4gZXZ0ID8gZXZ0LnRvdWNoZXNbMF0gOiBldnQ7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBwaWNrZWQgbWVzaCwgaWYgYW55XHJcbiAgICBjb25zdCBwb2ludGVyU2NyZWVuWCA9IGNsaWVudFggLSBjYW52YXNSZWN0LmxlZnQ7XHJcbiAgICBjb25zdCBwb2ludGVyU2NyZWVuWSA9IGNsaWVudFkgLSBjYW52YXNSZWN0LnRvcDtcclxuXHJcbiAgICBsZXQgcG9pbnRlckNhcHR1cmVCZWhhdmlvcjogUG9pbnRlckV2ZW50c0NhcHR1cmVCZWhhdmlvciB8IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IHBpY2tSZXN1bHQgPSBfc2NlbmUucGljayhwb2ludGVyU2NyZWVuWCwgcG9pbnRlclNjcmVlblksIChtZXNoKSA9PiB7XHJcbiAgICAgICAgLy8gSWYgdGhlIG1lc2ggaGFzIGFuIGluc3RhbmNlIG9mIFBvaW50ZXJFdmVudHNDYXB0dXJlQmVoYXZpb3IgYXR0YWNoZWQgdG8gaXQsXHJcbiAgICAgICAgLy8gYW5kIGNhcHR1cmUgb24gcG9pbnRlciBlbnRlciBpcyB0cnVlLCB0aGVuIHdlIHdhbnQgdG8gcGljayBpdFxyXG4gICAgICAgIGNvbnN0IHBvaW50ZXJDYXB0dXJlQmVoYXZpb3IgPSBtZXNoVG9CZWhhdmlvck1hcC5nZXQobWVzaCk7XHJcbiAgICAgICAgcmV0dXJuIG1lc2guaXNFbmFibGVkKCkgJiYgdHlwZW9mIHBvaW50ZXJDYXB0dXJlQmVoYXZpb3IgIT09IFwidW5kZWZpbmVkXCIgJiYgcG9pbnRlckNhcHR1cmVCZWhhdmlvci5fY2FwdHVyZU9uUG9pbnRlckVudGVyO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHBpY2tlZE1lc2g6IEFic3RyYWN0TWVzaCB8IG51bGw7XHJcbiAgICBpZiAocGlja1Jlc3VsdC5oaXQpIHtcclxuICAgICAgICBwaWNrZWRNZXNoID0gcGlja1Jlc3VsdC5waWNrZWRNZXNoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwaWNrZWRNZXNoID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjYXB0dXJpbmdJZEFzSW50ID0gcGFyc2VJbnQoZ2V0Q2FwdHVyaW5nSWQoKSB8fCBcIlwiKTtcclxuXHJcbiAgICAvLyBpZiB0aGUgcGlja2VkIG1lc2ggaXMgdGhlIGN1cnJlbnQgY2FwdHVyaW5nIG1lc2gsIGRvIG5vdGhpbmdcclxuICAgIGlmIChwaWNrZWRNZXNoICYmIHBpY2tlZE1lc2gudW5pcXVlSWQgPT09IGNhcHR1cmluZ0lkQXNJbnQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgdGhlcmUgaXMgYSBjYXB0dXJpbmcgbWVzaCBhbmQgaXQgaXMgbm90IHRoZSBjdXJyZW50IHBpY2tlZCBtZXNoLCBvciBub1xyXG4gICAgLy8gbWVzaCBpcyBwaWNrZWQsIHJlbGVhc2UgdGhlIGNhcHR1cmluZyBtZXNoXHJcbiAgICBpZiAoY2FwdHVyaW5nSWRBc0ludCAmJiAoIXBpY2tlZE1lc2ggfHwgcGlja2VkTWVzaC51bmlxdWVJZCAhPT0gY2FwdHVyaW5nSWRBc0ludCkpIHtcclxuICAgICAgICByZWxlYXNlQ3VycmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIHRoZXJlIGlzIGEgcGlja2VkIG1lc2ggYW5kIGl0IGlzIG5vdCB0aGUgY3VycmVudCBjYXB0dXJpbmcgbWVzaCwgY2FwdHVyZVxyXG4gICAgLy8gdGhlIHBvaW50ZXIgZXZlbnRzLiAgTm90ZSB0aGF0IHRoZSBjdXJyZW50IGNhcHR1cmluZyBtZXNoIGhhcyBhbHJlYWR5IGJlZW5cclxuICAgIC8vIHJlbGVhc2VkIGFib3ZlXHJcbiAgICBpZiAocGlja2VkTWVzaCkge1xyXG4gICAgICAgIHBvaW50ZXJDYXB0dXJlQmVoYXZpb3IgPSBtZXNoVG9CZWhhdmlvck1hcC5nZXQocGlja2VkTWVzaCk7XHJcbiAgICAgICAgcG9pbnRlckNhcHR1cmVCZWhhdmlvciEuY2FwdHVyZVBvaW50ZXJFdmVudHMoKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBCZWhhdmlvciBmb3IgYW55IGNvbnRlbnQgdGhhdCBjYW4gY2FwdHVyZSBwb2ludGVyIGV2ZW50cywgaS5lLiBieXBhc3MgdGhlIEJhYnlsb24gcG9pbnRlciBldmVudCBoYW5kbGluZ1xyXG4gKiBhbmQgcmVjZWl2ZSBwb2ludGVyIGV2ZW50cyBkaXJlY3RseS4gIEl0IHdpbGwgcmVnaXN0ZXIgdGhlIGNhcHR1cmUgdHJpZ2dlcnMgYW5kIG5lZ290aWF0ZSB0aGUgY2FwdHVyZSBhbmRcclxuICogcmVsZWFzZSBvZiBwb2ludGVyIGV2ZW50cy4gIEN1cmVybnRseSB0aGlzIGFwcGxpZXMgb25seSB0byBIdG1sTWVzaFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFBvaW50ZXJFdmVudHNDYXB0dXJlQmVoYXZpb3IgaW1wbGVtZW50cyBCZWhhdmlvcjxBYnN0cmFjdE1lc2g+IHtcclxuICAgIC8qKiBnZXRzIG9yIHNldHMgYmVoYXZpb3IncyBuYW1lICovXHJcbiAgICBwdWJsaWMgbmFtZSA9IFwiUG9pbnRlckV2ZW50c0NhcHR1cmVCZWhhdmlvclwiO1xyXG5cclxuICAgIHByaXZhdGUgX2F0dGFjaGVkTWVzaDogQWJzdHJhY3RNZXNoIHwgbnVsbDtcclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBfY2FwdHVyZU9uUG9pbnRlckVudGVyOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBvciBzZXRzIHRoZSBtZXNoIHRoYXQgdGhlIGJlaGF2aW9yIGlzIGF0dGFjaGVkIHRvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgYXR0YWNoZWRNZXNoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hdHRhY2hlZE1lc2g7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBhdHRhY2hlZE1lc2godmFsdWU6IEFic3RyYWN0TWVzaCB8IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9hdHRhY2hlZE1lc2ggPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9jYXB0dXJlQ2FsbGJhY2s6ICgpID0+IHZvaWQsXHJcbiAgICAgICAgcHJpdmF0ZSBfcmVsZWFzZUNhbGxiYWNrOiAoKSA9PiB2b2lkLFxyXG4gICAgICAgIHsgY2FwdHVyZU9uUG9pbnRlckVudGVyID0gdHJ1ZSB9ID0ge31cclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuX2F0dGFjaGVkTWVzaCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY2FwdHVyZU9uUG9pbnRlckVudGVyID0gY2FwdHVyZU9uUG9pbnRlckVudGVyO1xyXG5cclxuICAgICAgICAvLyBXYXJuIGlmIHdlIGFyZSBub3QgaW4gYSBicm93c2VyXHJcbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBMb2dnZXIuV2FybihgQ3JlYXRpbmcgYW4gaW5zdGFuY2Ugb2YgUG9pbnRlckV2ZW50c0NhcHR1cmVCZWhhdmlvciBvdXRzaWRlIG9mIGEgYnJvd3Nlci4gIFRoZSBiZWhhdmlvciB3aWxsIG5vdCB3b3JrLmApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBpZiB0aGUgYmVoYXZpb3Igc2hvdWxkIGNhcHR1cmUgcG9pbnRlciBldmVudHMgd2hlbiB0aGUgcG9pbnRlciBlbnRlcnMgdGhlIG1lc2hcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBjYXB0dXJlT25Qb2ludGVyRW50ZXIoY2FwdHVyZU9uUG9pbnRlckVudGVyOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NhcHR1cmVPblBvaW50ZXJFbnRlciA9PT0gY2FwdHVyZU9uUG9pbnRlckVudGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY2FwdHVyZU9uUG9pbnRlckVudGVyID0gY2FwdHVyZU9uUG9pbnRlckVudGVyO1xyXG4gICAgICAgIGlmICh0aGlzLl9hdHRhY2hlZE1lc2gpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NhcHR1cmVPblBvaW50ZXJFbnRlcikge1xyXG4gICAgICAgICAgICAgICAgc3RhcnRDYXB0dXJlT25FbnRlcih0aGlzLl9hdHRhY2hlZE1lc2guZ2V0U2NlbmUoKSEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RvcENhcHR1cmVPbkVudGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiBjYWxsZWQgd2hlbiB0aGUgYmVoYXZpb3IgbmVlZHMgdG8gYmUgaW5pdGlhbGl6ZWQgKGJlZm9yZSBhdHRhY2hpbmcgaXQgdG8gYSB0YXJnZXQpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0KCkge31cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIHRoZSBiZWhhdmlvciBpcyBhdHRhY2hlZCB0byBhIHRhcmdldFxyXG4gICAgICogQHBhcmFtIG1lc2ggZGVmaW5lcyB0aGUgdGFyZ2V0IHdoZXJlIHRoZSBiZWhhdmlvciBpcyBhdHRhY2hlZCB0b1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXR0YWNoKG1lc2g6IEFic3RyYWN0TWVzaCkge1xyXG4gICAgICAgIC8vIEFkZCBhIHJlZmVyZW5jZSB0byB0aGlzIGJlaGF2aW9yIG9uIHRoZSBtZXNoLiAgV2UgZG8gdGhpcyBzbyB3ZSBjYW4gZ2V0IGFcclxuICAgICAgICAvLyByZWZlcmVuY2UgdG8gdGhlIGJlaGF2aW9yIGluIHRoZSBvblBvaW50ZXJNb3ZlIGZ1bmN0aW9uIHdpdGhvdXQgcmVseWluZyBvblxyXG4gICAgICAgIC8vIGdldEJlaGF2aW9yQnlOYW1lKCksIHdoaWNoIGRvZXMgYSBsaW5lYXIgc2VhcmNoIG9mIHRoZSBiZWhhdmlvcnMgYXJyYXkuXHJcbiAgICAgICAgdGhpcy5hdHRhY2hlZE1lc2ggPSBtZXNoO1xyXG4gICAgICAgIG1lc2hUb0JlaGF2aW9yTWFwLnNldChtZXNoLCB0aGlzKTtcclxuICAgICAgICBpZiAodGhpcy5fY2FwdHVyZU9uUG9pbnRlckVudGVyKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0Q2FwdHVyZU9uRW50ZXIobWVzaC5nZXRTY2VuZSgpISk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gdGhlIGJlaGF2aW9yIGlzIGRldGFjaGVkIGZyb20gaXRzIHRhcmdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGV0YWNoKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hdHRhY2hlZE1lc2gpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZW1vdmUgdGhlIHJlZmVyZW5jZSB0byB0aGlzIGJlaGF2aW9yIGZyb20gdGhlIG1lc2hcclxuICAgICAgICBtZXNoVG9CZWhhdmlvck1hcC5kZWxldGUodGhpcy5hdHRhY2hlZE1lc2gpO1xyXG4gICAgICAgIGlmICh0aGlzLl9jYXB0dXJlT25Qb2ludGVyRW50ZXIpIHtcclxuICAgICAgICAgICAgc3RvcENhcHR1cmVPbkVudGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYXR0YWNoZWRNZXNoID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIGJlaGF2aW9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuZGV0YWNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVsZWFzZSBwb2ludGVyIGV2ZW50c1xyXG4gICAgcHVibGljIHJlbGVhc2VQb2ludGVyRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hdHRhY2hlZE1lc2gpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0UmVsZWFzZSh0aGlzLmF0dGFjaGVkTWVzaC51bmlxdWVJZC50b1N0cmluZygpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDYXB0dXJlIHBvaW50ZXIgZXZlbnRzXHJcbiAgICBwdWJsaWMgY2FwdHVyZVBvaW50ZXJFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmF0dGFjaGVkTWVzaCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcXVlc3RDYXB0dXJlKHRoaXMuYXR0YWNoZWRNZXNoLnVuaXF1ZUlkLnRvU3RyaW5nKCksIHRoaXMuX2NhcHR1cmVDYWxsYmFjaywgdGhpcy5fcmVsZWFzZUNhbGxiYWNrKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgKiBmcm9tIFwiLi9odG1sTWVzaFwiO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2JhYnlsb25qc19NYXRoc19tYXRoX187IiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG5cblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1Jcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sLCBJdGVyYXRvciAqL1xuXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcbiAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcbiAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn1cblxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xuICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xuICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHQ7XG4gIH1cbiAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xuICB2YXIgdCA9IHt9O1xuICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgIHRbcF0gPSBzW3BdO1xuICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgIH1cbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xuICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cbiAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcbiAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XG4gIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xuICB2YXIgXywgZG9uZSA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGNvbnRleHQgPSB7fTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XG4gICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xuICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XG4gICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcbiAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XG4gICAgICB9XG4gIH1cbiAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xuICBkb25lID0gdHJ1ZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XG4gIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xuICB9XG4gIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcbiAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XG4gIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xuICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgfVxufVxuXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgfVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgb1trMl0gPSBtW2tdO1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xuICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XG4gIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICB9XG4gIH07XG4gIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XG4gIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgaWYgKCFtKSByZXR1cm4gbztcbiAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gIHRyeSB7XG4gICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgfVxuICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgfVxuICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gIH1cbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcbiAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXG4gICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XG4gIHJldHVybiBhcjtcbn1cblxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XG4gIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xuICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXG4gICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcbiAgICAgICAgICByW2tdID0gYVtqXTtcbiAgcmV0dXJuIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XG4gIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcbiAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xuICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xuICByZXR1cm4gaSA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBBc3luY0l0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBBc3luY0l0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpLCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIsIGF3YWl0UmV0dXJuKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKGdbbl0pIHsgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgaWYgKGYpIGlbbl0gPSBmKGlbbl0pOyB9IH1cbiAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxuICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cbiAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xuICB2YXIgaSwgcDtcbiAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xuICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xuICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XG4gIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cbiAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcbiAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cbiAgcmV0dXJuIGNvb2tlZDtcbn07XG5cbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gIG9bXCJkZWZhdWx0XCJdID0gdjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XG4gIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xuICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XG4gIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xuICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hZGREaXNwb3NhYmxlUmVzb3VyY2UoZW52LCB2YWx1ZSwgYXN5bmMpIHtcbiAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkLlwiKTtcbiAgICB2YXIgZGlzcG9zZSwgaW5uZXI7XG4gICAgaWYgKGFzeW5jKSB7XG4gICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcbiAgICB9XG4gICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xuICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XG4gICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xuICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xuICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XG4gIH1cbiAgZWxzZSBpZiAoYXN5bmMpIHtcbiAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcbiAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xuICBmdW5jdGlvbiBmYWlsKGUpIHtcbiAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XG4gICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcbiAgfVxuICB2YXIgciwgcyA9IDA7XG4gIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgd2hpbGUgKHIgPSBlbnYuc3RhY2sucG9wKCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghci5hc3luYyAmJiBzID09PSAxKSByZXR1cm4gcyA9IDAsIGVudi5zdGFjay5wdXNoKHIpLCBQcm9taXNlLnJlc29sdmUoKS50aGVuKG5leHQpO1xuICAgICAgICBpZiAoci5kaXNwb3NlKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHIuZGlzcG9zZS5jYWxsKHIudmFsdWUpO1xuICAgICAgICAgIGlmIChyLmFzeW5jKSByZXR1cm4gcyB8PSAyLCBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBzIHw9IDE7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICBmYWlsKGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocyA9PT0gMSkgcmV0dXJuIGVudi5oYXNFcnJvciA/IFByb21pc2UucmVqZWN0KGVudi5lcnJvcikgOiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XG4gIH1cbiAgcmV0dXJuIG5leHQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uKHBhdGgsIHByZXNlcnZlSnN4KSB7XG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiAmJiAvXlxcLlxcLj9cXC8vLnRlc3QocGF0aCkpIHtcbiAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcLih0c3gpJHwoKD86XFwuZCk/KSgoPzpcXC5bXi4vXSs/KT8pXFwuKFtjbV0/KXRzJC9pLCBmdW5jdGlvbiAobSwgdHN4LCBkLCBleHQsIGNtKSB7XG4gICAgICAgICAgcmV0dXJuIHRzeCA/IHByZXNlcnZlSnN4ID8gXCIuanN4XCIgOiBcIi5qc1wiIDogZCAmJiAoIWV4dCB8fCAhY20pID8gbSA6IChkICsgZXh0ICsgXCIuXCIgKyBjbS50b0xvd2VyQ2FzZSgpICsgXCJqc1wiKTtcbiAgICAgIH0pO1xuICB9XG4gIHJldHVybiBwYXRoO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIF9fZXh0ZW5kcyxcbiAgX19hc3NpZ24sXG4gIF9fcmVzdCxcbiAgX19kZWNvcmF0ZSxcbiAgX19wYXJhbSxcbiAgX19lc0RlY29yYXRlLFxuICBfX3J1bkluaXRpYWxpemVycyxcbiAgX19wcm9wS2V5LFxuICBfX3NldEZ1bmN0aW9uTmFtZSxcbiAgX19tZXRhZGF0YSxcbiAgX19hd2FpdGVyLFxuICBfX2dlbmVyYXRvcixcbiAgX19jcmVhdGVCaW5kaW5nLFxuICBfX2V4cG9ydFN0YXIsXG4gIF9fdmFsdWVzLFxuICBfX3JlYWQsXG4gIF9fc3ByZWFkLFxuICBfX3NwcmVhZEFycmF5cyxcbiAgX19zcHJlYWRBcnJheSxcbiAgX19hd2FpdCxcbiAgX19hc3luY0dlbmVyYXRvcixcbiAgX19hc3luY0RlbGVnYXRvcixcbiAgX19hc3luY1ZhbHVlcyxcbiAgX19tYWtlVGVtcGxhdGVPYmplY3QsXG4gIF9faW1wb3J0U3RhcixcbiAgX19pbXBvcnREZWZhdWx0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4sXG4gIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxuICBfX2Rpc3Bvc2VSZXNvdXJjZXMsXG4gIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXNcclxuaW1wb3J0ICogYXMgYWRkb25zIGZyb20gXCJhZGRvbnMvaW5kZXhcIjtcclxuXHJcbmV4cG9ydCB7IGFkZG9ucyB9O1xyXG5leHBvcnQgZGVmYXVsdCBhZGRvbnM7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==