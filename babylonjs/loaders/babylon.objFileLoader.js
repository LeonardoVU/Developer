(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-loaders", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-loaders"] = factory(require("babylonjs"));
	else
		root["LOADERS"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_tools__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/loaders/src/OBJ/index.ts":
/*!*********************************************!*\
  !*** ../../../dev/loaders/src/OBJ/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MTLFileLoader: () => (/* reexport safe */ _mtlFileLoader__WEBPACK_IMPORTED_MODULE_0__.MTLFileLoader),
/* harmony export */   OBJFileLoader: () => (/* reexport safe */ _objFileLoader__WEBPACK_IMPORTED_MODULE_3__.OBJFileLoader),
/* harmony export */   SolidParser: () => (/* reexport safe */ _solidParser__WEBPACK_IMPORTED_MODULE_2__.SolidParser)
/* harmony export */ });
/* harmony import */ var _mtlFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mtlFileLoader */ "../../../dev/loaders/src/OBJ/mtlFileLoader.ts");
/* harmony import */ var _objLoadingOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objLoadingOptions */ "../../../dev/loaders/src/OBJ/objLoadingOptions.ts");
/* harmony import */ var _solidParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solidParser */ "../../../dev/loaders/src/OBJ/solidParser.ts");
/* harmony import */ var _objFileLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./objFileLoader */ "../../../dev/loaders/src/OBJ/objFileLoader.ts");






/***/ }),

/***/ "../../../dev/loaders/src/OBJ/mtlFileLoader.ts":
/*!*****************************************************!*\
  !*** ../../../dev/loaders/src/OBJ/mtlFileLoader.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MTLFileLoader: () => (/* binding */ MTLFileLoader)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/standardMaterial */ "babylonjs/Misc/tools");
/* harmony import */ var babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__);



/**
 * Class reading and parsing the MTL file bundled with the obj file.
 */
var MTLFileLoader = /** @class */ (function () {
    function MTLFileLoader() {
        /**
         * All material loaded from the mtl will be set here
         */
        this.materials = [];
    }
    /**
     * This function will read the mtl file and create each material described inside
     * This function could be improve by adding :
     * -some component missing (Ni, Tf...)
     * -including the specific options available
     *
     * @param scene defines the scene the material will be created in
     * @param data defines the mtl data to parse
     * @param rootUrl defines the rooturl to use in order to load relative dependencies
     * @param assetContainer defines the asset container to store the material in (can be null)
     */
    MTLFileLoader.prototype.parseMTL = function (scene, data, rootUrl, assetContainer) {
        if (data instanceof ArrayBuffer) {
            return;
        }
        //Split the lines from the file
        var lines = data.split("\n");
        // whitespace char ie: [ \t\r\n\f]
        var delimiter_pattern = /\s+/;
        //Array with RGB colors
        var color;
        //New material
        var material = null;
        //Look at each line
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            // Blank line or comment
            if (line.length === 0 || line.charAt(0) === "#") {
                continue;
            }
            //Get the first parameter (keyword)
            var pos = line.indexOf(" ");
            var key = pos >= 0 ? line.substring(0, pos) : line;
            key = key.toLowerCase();
            //Get the data following the key
            var value = pos >= 0 ? line.substring(pos + 1).trim() : "";
            //This mtl keyword will create the new material
            if (key === "newmtl") {
                //Check if it is the first material.
                // Materials specifications are described after this keyword.
                if (material) {
                    //Add the previous material in the material array.
                    this.materials.push(material);
                }
                //Create a new material.
                // value is the name of the material read in the mtl file
                scene._blockEntityCollection = !!assetContainer;
                material = new babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.StandardMaterial(value, scene);
                material._parentContainer = assetContainer;
                scene._blockEntityCollection = false;
            }
            else if (key === "kd" && material) {
                // Diffuse color (color under white light) using RGB values
                //value  = "r g b"
                color = value.split(delimiter_pattern, 3).map(parseFloat);
                //color = [r,g,b]
                //Set tghe color into the material
                material.diffuseColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
            }
            else if (key === "ka" && material) {
                // Ambient color (color under shadow) using RGB values
                //value = "r g b"
                color = value.split(delimiter_pattern, 3).map(parseFloat);
                //color = [r,g,b]
                //Set tghe color into the material
                material.ambientColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
            }
            else if (key === "ks" && material) {
                // Specular color (color when light is reflected from shiny surface) using RGB values
                //value = "r g b"
                color = value.split(delimiter_pattern, 3).map(parseFloat);
                //color = [r,g,b]
                //Set the color into the material
                material.specularColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
            }
            else if (key === "ke" && material) {
                // Emissive color using RGB values
                color = value.split(delimiter_pattern, 3).map(parseFloat);
                material.emissiveColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
            }
            else if (key === "ns" && material) {
                //value = "Integer"
                material.specularPower = parseFloat(value);
            }
            else if (key === "d" && material) {
                //d is dissolve for current material. It mean alpha for BABYLON
                material.alpha = parseFloat(value);
                //Texture
                //This part can be improved by adding the possible options of texture
            }
            else if (key === "map_ka" && material) {
                // ambient texture map with a loaded image
                //We must first get the folder of the image
                material.ambientTexture = MTLFileLoader._GetTexture(rootUrl, value, scene);
            }
            else if (key === "map_kd" && material) {
                // Diffuse texture map with a loaded image
                material.diffuseTexture = MTLFileLoader._GetTexture(rootUrl, value, scene);
            }
            else if (key === "map_ks" && material) {
                // Specular texture map with a loaded image
                //We must first get the folder of the image
                material.specularTexture = MTLFileLoader._GetTexture(rootUrl, value, scene);
            }
            else if (key === "map_ns") {
                //Specular
                //Specular highlight component
                //We must first get the folder of the image
                //
                //Not supported by BABYLON
                //
                //    continue;
            }
            else if (key === "map_bump" && material) {
                //The bump texture
                var values = value.split(delimiter_pattern);
                var bumpMultiplierIndex = values.indexOf("-bm");
                var bumpMultiplier = null;
                if (bumpMultiplierIndex >= 0) {
                    bumpMultiplier = values[bumpMultiplierIndex + 1];
                    values.splice(bumpMultiplierIndex, 2); // remove
                }
                material.bumpTexture = MTLFileLoader._GetTexture(rootUrl, values.join(" "), scene);
                if (material.bumpTexture && bumpMultiplier !== null) {
                    material.bumpTexture.level = parseFloat(bumpMultiplier);
                }
            }
            else if (key === "map_d" && material) {
                // The dissolve of the material
                material.opacityTexture = MTLFileLoader._GetTexture(rootUrl, value, scene);
                //Options for illumination
            }
            else if (key === "illum") {
                //Illumination
                if (value === "0") {
                    //That mean Kd == Kd
                }
                else if (value === "1") {
                    //Color on and Ambient on
                }
                else if (value === "2") {
                    //Highlight on
                }
                else if (value === "3") {
                    //Reflection on and Ray trace on
                }
                else if (value === "4") {
                    //Transparency: Glass on, Reflection: Ray trace on
                }
                else if (value === "5") {
                    //Reflection: Fresnel on and Ray trace on
                }
                else if (value === "6") {
                    //Transparency: Refraction on, Reflection: Fresnel off and Ray trace on
                }
                else if (value === "7") {
                    //Transparency: Refraction on, Reflection: Fresnel on and Ray trace on
                }
                else if (value === "8") {
                    //Reflection on and Ray trace off
                }
                else if (value === "9") {
                    //Transparency: Glass on, Reflection: Ray trace off
                }
                else if (value === "10") {
                    //Casts shadows onto invisible surfaces
                }
            }
            else {
                // console.log("Unhandled expression at line : " + i +'\n' + "with value : " + line);
            }
        }
        //At the end of the file, add the last material
        if (material) {
            this.materials.push(material);
        }
    };
    /**
     * Gets the texture for the material.
     *
     * If the material is imported from input file,
     * We sanitize the url to ensure it takes the texture from aside the material.
     *
     * @param rootUrl The root url to load from
     * @param value The value stored in the mtl
     * @param scene
     * @returns The Texture
     */
    MTLFileLoader._GetTexture = function (rootUrl, value, scene) {
        if (!value) {
            return null;
        }
        var url = rootUrl;
        // Load from input file.
        if (rootUrl === "file:") {
            var lastDelimiter = value.lastIndexOf("\\");
            if (lastDelimiter === -1) {
                lastDelimiter = value.lastIndexOf("/");
            }
            if (lastDelimiter > -1) {
                url += value.substring(lastDelimiter + 1);
            }
            else {
                url += value;
            }
        }
        // Not from input file.
        else {
            url += value;
        }
        return new babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Texture(url, scene, false, MTLFileLoader.INVERT_TEXTURE_Y);
    };
    /**
     * Invert Y-Axis of referenced textures on load
     */
    MTLFileLoader.INVERT_TEXTURE_Y = true;
    return MTLFileLoader;
}());



/***/ }),

/***/ "../../../dev/loaders/src/OBJ/objFileLoader.metadata.ts":
/*!**************************************************************!*\
  !*** ../../../dev/loaders/src/OBJ/objFileLoader.metadata.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBJFileLoaderMetadata: () => (/* binding */ OBJFileLoaderMetadata)
/* harmony export */ });
var OBJFileLoaderMetadata = {
    name: "obj",
    extensions: ".obj",
};


/***/ }),

/***/ "../../../dev/loaders/src/OBJ/objFileLoader.ts":
/*!*****************************************************!*\
  !*** ../../../dev/loaders/src/OBJ/objFileLoader.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBJFileLoader: () => (/* binding */ OBJFileLoader)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/standardMaterial */ "babylonjs/Misc/tools");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _objFileLoader_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objFileLoader.metadata */ "../../../dev/loaders/src/OBJ/objFileLoader.metadata.ts");
/* harmony import */ var _mtlFileLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mtlFileLoader */ "../../../dev/loaders/src/OBJ/mtlFileLoader.ts");
/* harmony import */ var _solidParser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./solidParser */ "../../../dev/loaders/src/OBJ/solidParser.ts");








/**
 * OBJ file type loader.
 * This is a babylon scene loader plugin.
 */
var OBJFileLoader = /** @class */ (function () {
    /**
     * Creates loader for .OBJ files
     *
     * @param loadingOptions options for loading and parsing OBJ/MTL files.
     */
    function OBJFileLoader(loadingOptions) {
        /**
         * Defines the name of the plugin.
         */
        this.name = _objFileLoader_metadata__WEBPACK_IMPORTED_MODULE_1__.OBJFileLoaderMetadata.name;
        /**
         * Defines the extension the plugin is able to load.
         */
        this.extensions = _objFileLoader_metadata__WEBPACK_IMPORTED_MODULE_1__.OBJFileLoaderMetadata.extensions;
        this._assetContainer = null;
        this._loadingOptions = loadingOptions || OBJFileLoader._DefaultLoadingOptions;
    }
    Object.defineProperty(OBJFileLoader, "INVERT_TEXTURE_Y", {
        /**
         * Invert Y-Axis of referenced textures on load
         */
        get: function () {
            return _mtlFileLoader__WEBPACK_IMPORTED_MODULE_2__.MTLFileLoader.INVERT_TEXTURE_Y;
        },
        set: function (value) {
            _mtlFileLoader__WEBPACK_IMPORTED_MODULE_2__.MTLFileLoader.INVERT_TEXTURE_Y = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OBJFileLoader, "_DefaultLoadingOptions", {
        get: function () {
            return {
                computeNormals: OBJFileLoader.COMPUTE_NORMALS,
                optimizeNormals: OBJFileLoader.OPTIMIZE_NORMALS,
                importVertexColors: OBJFileLoader.IMPORT_VERTEX_COLORS,
                invertY: OBJFileLoader.INVERT_Y,
                invertTextureY: OBJFileLoader.INVERT_TEXTURE_Y,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                UVScaling: OBJFileLoader.UV_SCALING,
                materialLoadingFailsSilently: OBJFileLoader.MATERIAL_LOADING_FAILS_SILENTLY,
                optimizeWithUV: OBJFileLoader.OPTIMIZE_WITH_UV,
                skipMaterials: OBJFileLoader.SKIP_MATERIALS,
                useLegacyBehavior: OBJFileLoader.USE_LEGACY_BEHAVIOR,
            };
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Calls synchronously the MTL file attached to this obj.
     * Load function or importMesh function don't enable to load 2 files in the same time asynchronously.
     * Without this function materials are not displayed in the first frame (but displayed after).
     * In consequence it is impossible to get material information in your HTML file
     *
     * @param url The URL of the MTL file
     * @param rootUrl defines where to load data from
     * @param onSuccess Callback function to be called when the MTL file is loaded
     * @param onFailure
     */
    OBJFileLoader.prototype._loadMTL = function (url, rootUrl, onSuccess, onFailure) {
        //The complete path to the mtl file
        var pathOfFile = rootUrl + url;
        // Loads through the babylon tools to allow fileInput search.
        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.LoadFile(pathOfFile, onSuccess, undefined, undefined, false, function (request, exception) {
            onFailure(pathOfFile, exception);
        });
    };
    /**
     * Instantiates a OBJ file loader plugin.
     * @returns the created plugin
     */
    OBJFileLoader.prototype.createPlugin = function () {
        return new OBJFileLoader(OBJFileLoader._DefaultLoadingOptions);
    };
    /**
     * If the data string can be loaded directly.
     * @returns if the data can be loaded directly
     */
    OBJFileLoader.prototype.canDirectLoad = function () {
        return false;
    };
    /**
     * Imports one or more meshes from the loaded OBJ data and adds them to the scene
     * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
     * @param scene the scene the meshes should be added to
     * @param data the OBJ data to load
     * @param rootUrl root url to load from
     * @returns a promise containing the loaded meshes, particles, skeletons and animations
     */
    OBJFileLoader.prototype.importMeshAsync = function (meshesNames, scene, data, rootUrl) {
        //get the meshes from OBJ file
        return this._parseSolid(meshesNames, scene, data, rootUrl).then(function (meshes) {
            return {
                meshes: meshes,
                particleSystems: [],
                skeletons: [],
                animationGroups: [],
                transformNodes: [],
                geometries: [],
                lights: [],
                spriteManagers: [],
            };
        });
    };
    /**
     * Imports all objects from the loaded OBJ data and adds them to the scene
     * @param scene the scene the objects should be added to
     * @param data the OBJ data to load
     * @param rootUrl root url to load from
     * @returns a promise which completes when objects have been loaded to the scene
     */
    OBJFileLoader.prototype.loadAsync = function (scene, data, rootUrl) {
        //Get the 3D model
        return this.importMeshAsync(null, scene, data, rootUrl).then(function () {
            // return void
        });
    };
    /**
     * Load into an asset container.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @returns The loaded asset container
     */
    OBJFileLoader.prototype.loadAssetContainerAsync = function (scene, data, rootUrl) {
        var _this = this;
        var container = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.AssetContainer(scene);
        this._assetContainer = container;
        return this.importMeshAsync(null, scene, data, rootUrl)
            .then(function (result) {
            result.meshes.forEach(function (mesh) { return container.meshes.push(mesh); });
            result.meshes.forEach(function (mesh) {
                var material = mesh.material;
                if (material) {
                    // Materials
                    if (container.materials.indexOf(material) == -1) {
                        container.materials.push(material);
                        // Textures
                        var textures = material.getActiveTextures();
                        textures.forEach(function (t) {
                            if (container.textures.indexOf(t) == -1) {
                                container.textures.push(t);
                            }
                        });
                    }
                }
            });
            _this._assetContainer = null;
            return container;
        })
            .catch(function (ex) {
            _this._assetContainer = null;
            throw ex;
        });
    };
    /**
     * Read the OBJ file and create an Array of meshes.
     * Each mesh contains all information given by the OBJ and the MTL file.
     * i.e. vertices positions and indices, optional normals values, optional UV values, optional material
     * @param meshesNames defines a string or array of strings of the mesh names that should be loaded from the file
     * @param scene defines the scene where are displayed the data
     * @param data defines the content of the obj file
     * @param rootUrl defines the path to the folder
     * @returns the list of loaded meshes
     */
    OBJFileLoader.prototype._parseSolid = function (meshesNames, scene, data, rootUrl) {
        var _this = this;
        var fileToLoad = ""; //The name of the mtlFile to load
        var materialsFromMTLFile = new _mtlFileLoader__WEBPACK_IMPORTED_MODULE_2__.MTLFileLoader();
        var materialToUse = [];
        var babylonMeshesArray = []; //The mesh for babylon
        // Sanitize data
        data = data.replace(/#.*$/gm, "").trim();
        // Main function
        var solidParser = new _solidParser__WEBPACK_IMPORTED_MODULE_3__.SolidParser(materialToUse, babylonMeshesArray, this._loadingOptions);
        solidParser.parse(meshesNames, data, scene, this._assetContainer, function (fileName) {
            fileToLoad = fileName;
        });
        // load the materials
        var mtlPromises = [];
        // Check if we have a file to load
        if (fileToLoad !== "" && !this._loadingOptions.skipMaterials) {
            //Load the file synchronously
            mtlPromises.push(new Promise(function (resolve, reject) {
                _this._loadMTL(fileToLoad, rootUrl, function (dataLoaded) {
                    try {
                        //Create materials thanks MTLLoader function
                        materialsFromMTLFile.parseMTL(scene, dataLoaded, rootUrl, _this._assetContainer);
                        //Look at each material loaded in the mtl file
                        for (var n = 0; n < materialsFromMTLFile.materials.length; n++) {
                            //Three variables to get all meshes with the same material
                            var startIndex = 0;
                            var _indices = [];
                            var _index = void 0;
                            //The material from MTL file is used in the meshes loaded
                            //Push the indice in an array
                            //Check if the material is not used for another mesh
                            while ((_index = materialToUse.indexOf(materialsFromMTLFile.materials[n].name, startIndex)) > -1) {
                                _indices.push(_index);
                                startIndex = _index + 1;
                            }
                            //If the material is not used dispose it
                            if (_index === -1 && _indices.length === 0) {
                                //If the material is not needed, remove it
                                materialsFromMTLFile.materials[n].dispose();
                            }
                            else {
                                for (var o = 0; o < _indices.length; o++) {
                                    //Apply the material to the Mesh for each mesh with the material
                                    var mesh = babylonMeshesArray[_indices[o]];
                                    var material = materialsFromMTLFile.materials[n];
                                    mesh.material = material;
                                    if (!mesh.getTotalIndices()) {
                                        // No indices, we need to turn on point cloud
                                        material.pointsCloud = true;
                                    }
                                }
                            }
                        }
                        resolve();
                    }
                    catch (e) {
                        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Error processing MTL file: '".concat(fileToLoad, "'"));
                        if (_this._loadingOptions.materialLoadingFailsSilently) {
                            resolve();
                        }
                        else {
                            reject(e);
                        }
                    }
                }, function (pathOfFile, exception) {
                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Error downloading MTL file: '".concat(fileToLoad, "'"));
                    if (_this._loadingOptions.materialLoadingFailsSilently) {
                        resolve();
                    }
                    else {
                        reject(exception);
                    }
                });
            }));
        }
        //Return an array with all Mesh
        return Promise.all(mtlPromises).then(function () {
            var isLine = function (mesh) { var _a, _b; return Boolean((_b = (_a = mesh._internalMetadata) === null || _a === void 0 ? void 0 : _a["_isLine"]) !== null && _b !== void 0 ? _b : false); };
            // Iterate over the mesh, determine if it is a line mesh, clone or modify the material to line rendering.
            babylonMeshesArray.forEach(function (mesh) {
                var _a, _b;
                if (isLine(mesh)) {
                    var mat = (_a = mesh.material) !== null && _a !== void 0 ? _a : new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.StandardMaterial(mesh.name + "_line", scene);
                    // If another mesh is using this material and it is not a line then we need to clone it.
                    var needClone = mat.getBindedMeshes().filter(function (e) { return !isLine(e); }).length > 0;
                    if (needClone) {
                        mat = (_b = mat.clone(mat.name + "_line")) !== null && _b !== void 0 ? _b : mat;
                    }
                    mat.wireframe = true;
                    mesh.material = mat;
                    if (mesh._internalMetadata) {
                        mesh._internalMetadata["_isLine"] = undefined;
                    }
                }
            });
            return babylonMeshesArray;
        });
    };
    /**
     * Defines if UVs are optimized by default during load.
     */
    OBJFileLoader.OPTIMIZE_WITH_UV = true;
    /**
     * Invert model on y-axis (does a model scaling inversion)
     */
    OBJFileLoader.INVERT_Y = false;
    /**
     * Include in meshes the vertex colors available in some OBJ files.  This is not part of OBJ standard.
     */
    OBJFileLoader.IMPORT_VERTEX_COLORS = false;
    /**
     * Compute the normals for the model, even if normals are present in the file.
     */
    OBJFileLoader.COMPUTE_NORMALS = false;
    /**
     * Optimize the normals for the model. Lighting can be uneven if you use OptimizeWithUV = true because new vertices can be created for the same location if they pertain to different faces.
     * Using OptimizehNormals = true will help smoothing the lighting by averaging the normals of those vertices.
     */
    OBJFileLoader.OPTIMIZE_NORMALS = false;
    /**
     * Defines custom scaling of UV coordinates of loaded meshes.
     */
    OBJFileLoader.UV_SCALING = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2(1, 1);
    /**
     * Skip loading the materials even if defined in the OBJ file (materials are ignored).
     */
    OBJFileLoader.SKIP_MATERIALS = false;
    /**
     * When a material fails to load OBJ loader will silently fail and onSuccess() callback will be triggered.
     *
     * Defaults to true for backwards compatibility.
     */
    OBJFileLoader.MATERIAL_LOADING_FAILS_SILENTLY = true;
    /**
     * Loads assets without handedness conversions. This flag is for compatibility. Use it only if absolutely required. Defaults to false.
     */
    OBJFileLoader.USE_LEGACY_BEHAVIOR = false;
    return OBJFileLoader;
}());

//Add this loader into the register plugin
(0,babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.RegisterSceneLoaderPlugin)(new OBJFileLoader());


/***/ }),

/***/ "../../../dev/loaders/src/OBJ/objLoadingOptions.ts":
/*!*********************************************************!*\
  !*** ../../../dev/loaders/src/OBJ/objLoadingOptions.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../../dev/loaders/src/OBJ/solidParser.ts":
/*!***************************************************!*\
  !*** ../../../dev/loaders/src/OBJ/solidParser.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SolidParser: () => (/* binding */ SolidParser)
/* harmony export */ });
/* harmony import */ var babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/logger */ "babylonjs/Misc/tools");
/* harmony import */ var babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__);








/**
 * Class used to load mesh data from OBJ content
 */
var SolidParser = /** @class */ (function () {
    /**
     * Creates a new SolidParser
     * @param materialToUse defines the array to fill with the list of materials to use (it will be filled by the parse function)
     * @param babylonMeshesArray defines the array to fill with the list of loaded meshes (it will be filled by the parse function)
     * @param loadingOptions defines the loading options to use
     */
    function SolidParser(materialToUse, babylonMeshesArray, loadingOptions) {
        this._positions = []; //values for the positions of vertices
        this._normals = []; //Values for the normals
        this._uvs = []; //Values for the textures
        this._colors = [];
        this._extColors = []; //Extension color
        this._meshesFromObj = []; //[mesh] Contains all the obj meshes
        this._indicesForBabylon = []; //The list of indices for VertexData
        this._wrappedPositionForBabylon = []; //The list of position in vectors
        this._wrappedUvsForBabylon = []; //Array with all value of uvs to match with the indices
        this._wrappedColorsForBabylon = []; // Array with all color values to match with the indices
        this._wrappedNormalsForBabylon = []; //Array with all value of normals to match with the indices
        this._tuplePosNorm = []; //Create a tuple with indice of Position, Normal, UV  [pos, norm, uvs]
        this._curPositionInIndices = 0;
        this._hasMeshes = false; //Meshes are defined in the file
        this._unwrappedPositionsForBabylon = []; //Value of positionForBabylon w/o Vector3() [x,y,z]
        this._unwrappedColorsForBabylon = []; // Value of colorForBabylon w/o Color4() [r,g,b,a]
        this._unwrappedNormalsForBabylon = []; //Value of normalsForBabylon w/o Vector3()  [x,y,z]
        this._unwrappedUVForBabylon = []; //Value of uvsForBabylon w/o Vector3()      [x,y,z]
        this._triangles = []; //Indices from new triangles coming from polygons
        this._materialNameFromObj = ""; //The name of the current material
        this._objMeshName = ""; //The name of the current obj mesh
        this._increment = 1; //Id for meshes created by the multimaterial
        this._isFirstMaterial = true;
        this._grayColor = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color4(0.5, 0.5, 0.5, 1);
        this._hasLineData = false; //If this mesh has line segment(l) data
        this._materialToUse = materialToUse;
        this._babylonMeshesArray = babylonMeshesArray;
        this._loadingOptions = loadingOptions;
    }
    /**
     * Search for obj in the given array.
     * This function is called to check if a couple of data already exists in an array.
     *
     * If found, returns the index of the founded tuple index. Returns -1 if not found
     * @param arr Array<{ normals: Array<number>, idx: Array<number> }>
     * @param obj Array<number>
     * @returns {boolean}
     */
    SolidParser.prototype._isInArray = function (arr, obj) {
        if (!arr[obj[0]]) {
            arr[obj[0]] = { normals: [], idx: [] };
        }
        var idx = arr[obj[0]].normals.indexOf(obj[1]);
        return idx === -1 ? -1 : arr[obj[0]].idx[idx];
    };
    SolidParser.prototype._isInArrayUV = function (arr, obj) {
        if (!arr[obj[0]]) {
            arr[obj[0]] = { normals: [], idx: [], uv: [] };
        }
        var idx = arr[obj[0]].normals.indexOf(obj[1]);
        if (idx != 1 && obj[2] === arr[obj[0]].uv[idx]) {
            return arr[obj[0]].idx[idx];
        }
        return -1;
    };
    /**
     * This function set the data for each triangle.
     * Data are position, normals and uvs
     * If a tuple of (position, normal) is not set, add the data into the corresponding array
     * If the tuple already exist, add only their indice
     *
     * @param indicePositionFromObj Integer The index in positions array
     * @param indiceUvsFromObj Integer The index in uvs array
     * @param indiceNormalFromObj Integer The index in normals array
     * @param positionVectorFromOBJ Vector3 The value of position at index objIndice
     * @param textureVectorFromOBJ Vector3 The value of uvs
     * @param normalsVectorFromOBJ Vector3 The value of normals at index objNormale
     * @param positionColorsFromOBJ
     */
    SolidParser.prototype._setData = function (indicePositionFromObj, indiceUvsFromObj, indiceNormalFromObj, positionVectorFromOBJ, textureVectorFromOBJ, normalsVectorFromOBJ, positionColorsFromOBJ) {
        //Check if this tuple already exists in the list of tuples
        var _index;
        if (this._loadingOptions.optimizeWithUV) {
            _index = this._isInArrayUV(this._tuplePosNorm, [indicePositionFromObj, indiceNormalFromObj, indiceUvsFromObj]);
        }
        else {
            _index = this._isInArray(this._tuplePosNorm, [indicePositionFromObj, indiceNormalFromObj]);
        }
        //If it not exists
        if (_index === -1) {
            //Add an new indice.
            //The array of indices is only an array with his length equal to the number of triangles - 1.
            //We add vertices data in this order
            this._indicesForBabylon.push(this._wrappedPositionForBabylon.length);
            //Push the position of vertice for Babylon
            //Each element is a Vector3(x,y,z)
            this._wrappedPositionForBabylon.push(positionVectorFromOBJ);
            //Push the uvs for Babylon
            //Each element is a Vector2(u,v)
            //If the UVs are missing, set (u,v)=(0,0)
            textureVectorFromOBJ = textureVectorFromOBJ !== null && textureVectorFromOBJ !== void 0 ? textureVectorFromOBJ : new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2(0, 0);
            this._wrappedUvsForBabylon.push(textureVectorFromOBJ);
            //Push the normals for Babylon
            //Each element is a Vector3(x,y,z)
            this._wrappedNormalsForBabylon.push(normalsVectorFromOBJ);
            if (positionColorsFromOBJ !== undefined) {
                //Push the colors for Babylon
                //Each element is a BABYLON.Color4(r,g,b,a)
                this._wrappedColorsForBabylon.push(positionColorsFromOBJ);
            }
            //Add the tuple in the comparison list
            this._tuplePosNorm[indicePositionFromObj].normals.push(indiceNormalFromObj);
            this._tuplePosNorm[indicePositionFromObj].idx.push(this._curPositionInIndices++);
            if (this._loadingOptions.optimizeWithUV) {
                this._tuplePosNorm[indicePositionFromObj].uv.push(indiceUvsFromObj);
            }
        }
        else {
            //The tuple already exists
            //Add the index of the already existing tuple
            //At this index we can get the value of position, normal, color and uvs of vertex
            this._indicesForBabylon.push(_index);
        }
    };
    /**
     * Transform Vector() and BABYLON.Color() objects into numbers in an array
     */
    SolidParser.prototype._unwrapData = function () {
        try {
            //Every array has the same length
            for (var l = 0; l < this._wrappedPositionForBabylon.length; l++) {
                //Push the x, y, z values of each element in the unwrapped array
                this._unwrappedPositionsForBabylon.push(this._wrappedPositionForBabylon[l].x * this._handednessSign, this._wrappedPositionForBabylon[l].y, this._wrappedPositionForBabylon[l].z);
                this._unwrappedNormalsForBabylon.push(this._wrappedNormalsForBabylon[l].x * this._handednessSign, this._wrappedNormalsForBabylon[l].y, this._wrappedNormalsForBabylon[l].z);
                this._unwrappedUVForBabylon.push(this._wrappedUvsForBabylon[l].x, this._wrappedUvsForBabylon[l].y); //z is an optional value not supported by BABYLON
                if (this._loadingOptions.importVertexColors) {
                    //Push the r, g, b, a values of each element in the unwrapped array
                    this._unwrappedColorsForBabylon.push(this._wrappedColorsForBabylon[l].r, this._wrappedColorsForBabylon[l].g, this._wrappedColorsForBabylon[l].b, this._wrappedColorsForBabylon[l].a);
                }
            }
            // Reset arrays for the next new meshes
            this._wrappedPositionForBabylon.length = 0;
            this._wrappedNormalsForBabylon.length = 0;
            this._wrappedUvsForBabylon.length = 0;
            this._wrappedColorsForBabylon.length = 0;
            this._tuplePosNorm.length = 0;
            this._curPositionInIndices = 0;
        }
        catch (e) {
            throw new Error("Unable to unwrap data while parsing OBJ data.");
        }
    };
    /**
     * Create triangles from polygons
     * It is important to notice that a triangle is a polygon
     * We get 5 patterns of face defined in OBJ File :
     * facePattern1 = ["1","2","3","4","5","6"]
     * facePattern2 = ["1/1","2/2","3/3","4/4","5/5","6/6"]
     * facePattern3 = ["1/1/1","2/2/2","3/3/3","4/4/4","5/5/5","6/6/6"]
     * facePattern4 = ["1//1","2//2","3//3","4//4","5//5","6//6"]
     * facePattern5 = ["-1/-1/-1","-2/-2/-2","-3/-3/-3","-4/-4/-4","-5/-5/-5","-6/-6/-6"]
     * Each pattern is divided by the same method
     * @param faces Array[String] The indices of elements
     * @param v Integer The variable to increment
     */
    SolidParser.prototype._getTriangles = function (faces, v) {
        //Work for each element of the array
        for (var faceIndex = v; faceIndex < faces.length - 1; faceIndex++) {
            //Add on the triangle variable the indexes to obtain triangles
            this._pushTriangle(faces, faceIndex);
        }
        //Result obtained after 2 iterations:
        //Pattern1 => triangle = ["1","2","3","1","3","4"];
        //Pattern2 => triangle = ["1/1","2/2","3/3","1/1","3/3","4/4"];
        //Pattern3 => triangle = ["1/1/1","2/2/2","3/3/3","1/1/1","3/3/3","4/4/4"];
        //Pattern4 => triangle = ["1//1","2//2","3//3","1//1","3//3","4//4"];
        //Pattern5 => triangle = ["-1/-1/-1","-2/-2/-2","-3/-3/-3","-1/-1/-1","-3/-3/-3","-4/-4/-4"];
    };
    /**
     * To get color between color and extension color
     * @param index Integer The index of the element in the array
     * @returns value of target color
     */
    SolidParser.prototype._getColor = function (index) {
        var _a;
        if (this._loadingOptions.importVertexColors) {
            return (_a = this._extColors[index]) !== null && _a !== void 0 ? _a : this._colors[index];
        }
        else {
            return undefined;
        }
    };
    /**
     * Create triangles and push the data for each polygon for the pattern 1
     * In this pattern we get vertice positions
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern1 = function (face, v) {
        //Get the indices of triangles for each polygon
        this._getTriangles(face, v);
        //For each element in the triangles array.
        //This var could contains 1 to an infinity of triangles
        for (var k = 0; k < this._triangles.length; k++) {
            // Set position indice
            var indicePositionFromObj = parseInt(this._triangles[k]) - 1;
            this._setData(indicePositionFromObj, 0, 0, // In the pattern 1, normals and uvs are not defined
            this._positions[indicePositionFromObj], // Get the vectors data
            babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2.Zero(), babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), // Create default vectors
            this._getColor(indicePositionFromObj));
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    /**
     * Create triangles and push the data for each polygon for the pattern 2
     * In this pattern we get vertice positions and uvs
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern2 = function (face, v) {
        var _a;
        //Get the indices of triangles for each polygon
        this._getTriangles(face, v);
        for (var k = 0; k < this._triangles.length; k++) {
            //triangle[k] = "1/1"
            //Split the data for getting position and uv
            var point = this._triangles[k].split("/"); // ["1", "1"]
            //Set position indice
            var indicePositionFromObj = parseInt(point[0]) - 1;
            //Set uv indice
            var indiceUvsFromObj = parseInt(point[1]) - 1;
            this._setData(indicePositionFromObj, indiceUvsFromObj, 0, //Default value for normals
            this._positions[indicePositionFromObj], //Get the values for each element
            (_a = this._uvs[indiceUvsFromObj]) !== null && _a !== void 0 ? _a : babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2.Zero(), babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), //Default value for normals
            this._getColor(indicePositionFromObj));
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    /**
     * Create triangles and push the data for each polygon for the pattern 3
     * In this pattern we get vertice positions, uvs and normals
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern3 = function (face, v) {
        var _a, _b;
        //Get the indices of triangles for each polygon
        this._getTriangles(face, v);
        for (var k = 0; k < this._triangles.length; k++) {
            //triangle[k] = "1/1/1"
            //Split the data for getting position, uv, and normals
            var point = this._triangles[k].split("/"); // ["1", "1", "1"]
            // Set position indice
            var indicePositionFromObj = parseInt(point[0]) - 1;
            // Set uv indice
            var indiceUvsFromObj = parseInt(point[1]) - 1;
            // Set normal indice
            var indiceNormalFromObj = parseInt(point[2]) - 1;
            this._setData(indicePositionFromObj, indiceUvsFromObj, indiceNormalFromObj, this._positions[indicePositionFromObj], (_a = this._uvs[indiceUvsFromObj]) !== null && _a !== void 0 ? _a : babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2.Zero(), (_b = this._normals[indiceNormalFromObj]) !== null && _b !== void 0 ? _b : babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up() //Set the vector for each component
            );
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    /**
     * Create triangles and push the data for each polygon for the pattern 4
     * In this pattern we get vertice positions and normals
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern4 = function (face, v) {
        this._getTriangles(face, v);
        for (var k = 0; k < this._triangles.length; k++) {
            //triangle[k] = "1//1"
            //Split the data for getting position and normals
            var point = this._triangles[k].split("//"); // ["1", "1"]
            // We check indices, and normals
            var indicePositionFromObj = parseInt(point[0]) - 1;
            var indiceNormalFromObj = parseInt(point[1]) - 1;
            this._setData(indicePositionFromObj, 1, //Default value for uv
            indiceNormalFromObj, this._positions[indicePositionFromObj], //Get each vector of data
            babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2.Zero(), this._normals[indiceNormalFromObj], this._getColor(indicePositionFromObj));
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    /*
     * Create triangles and push the data for each polygon for the pattern 3
     * In this pattern we get vertice positions, uvs and normals
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern5 = function (face, v) {
        //Get the indices of triangles for each polygon
        this._getTriangles(face, v);
        for (var k = 0; k < this._triangles.length; k++) {
            //triangle[k] = "-1/-1/-1"
            //Split the data for getting position, uv, and normals
            var point = this._triangles[k].split("/"); // ["-1", "-1", "-1"]
            // Set position indice
            var indicePositionFromObj = this._positions.length + parseInt(point[0]);
            // Set uv indice
            var indiceUvsFromObj = this._uvs.length + parseInt(point[1]);
            // Set normal indice
            var indiceNormalFromObj = this._normals.length + parseInt(point[2]);
            this._setData(indicePositionFromObj, indiceUvsFromObj, indiceNormalFromObj, this._positions[indicePositionFromObj], this._uvs[indiceUvsFromObj], this._normals[indiceNormalFromObj], //Set the vector for each component
            this._getColor(indicePositionFromObj));
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    SolidParser.prototype._addPreviousObjMesh = function () {
        //Check if it is not the first mesh. Otherwise we don't have data.
        if (this._meshesFromObj.length > 0) {
            //Get the previous mesh for applying the data about the faces
            //=> in obj file, faces definition append after the name of the mesh
            this._handledMesh = this._meshesFromObj[this._meshesFromObj.length - 1];
            //Set the data into Array for the mesh
            this._unwrapData();
            if (this._loadingOptions.useLegacyBehavior) {
                // Reverse tab. Otherwise face are displayed in the wrong sens
                this._indicesForBabylon.reverse();
            }
            //Set the information for the mesh
            //Slice the array to avoid rewriting because of the fact this is the same var which be rewrited
            this._handledMesh.indices = this._indicesForBabylon.slice();
            this._handledMesh.positions = this._unwrappedPositionsForBabylon.slice();
            this._handledMesh.normals = this._unwrappedNormalsForBabylon.slice();
            this._handledMesh.uvs = this._unwrappedUVForBabylon.slice();
            this._handledMesh.hasLines = this._hasLineData;
            if (this._loadingOptions.importVertexColors) {
                this._handledMesh.colors = this._unwrappedColorsForBabylon.slice();
            }
            //Reset the array for the next mesh
            this._indicesForBabylon.length = 0;
            this._unwrappedPositionsForBabylon.length = 0;
            this._unwrappedColorsForBabylon.length = 0;
            this._unwrappedNormalsForBabylon.length = 0;
            this._unwrappedUVForBabylon.length = 0;
            this._hasLineData = false;
        }
    };
    SolidParser.prototype._optimizeNormals = function (mesh) {
        var positions = mesh.getVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind);
        var normals = mesh.getVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind);
        var mapVertices = {};
        if (!positions || !normals) {
            return;
        }
        for (var i = 0; i < positions.length / 3; i++) {
            var x = positions[i * 3 + 0];
            var y = positions[i * 3 + 1];
            var z = positions[i * 3 + 2];
            var key = x + "_" + y + "_" + z;
            var lst = mapVertices[key];
            if (!lst) {
                lst = [];
                mapVertices[key] = lst;
            }
            lst.push(i);
        }
        var normal = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3();
        for (var key in mapVertices) {
            var lst = mapVertices[key];
            if (lst.length < 2) {
                continue;
            }
            var v0Idx = lst[0];
            for (var i = 1; i < lst.length; ++i) {
                var vIdx = lst[i];
                normals[v0Idx * 3 + 0] += normals[vIdx * 3 + 0];
                normals[v0Idx * 3 + 1] += normals[vIdx * 3 + 1];
                normals[v0Idx * 3 + 2] += normals[vIdx * 3 + 2];
            }
            normal.copyFromFloats(normals[v0Idx * 3 + 0], normals[v0Idx * 3 + 1], normals[v0Idx * 3 + 2]);
            normal.normalize();
            for (var i = 0; i < lst.length; ++i) {
                var vIdx = lst[i];
                normals[vIdx * 3 + 0] = normal.x;
                normals[vIdx * 3 + 1] = normal.y;
                normals[vIdx * 3 + 2] = normal.z;
            }
        }
        mesh.setVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, normals);
    };
    SolidParser._IsLineElement = function (line) {
        return line.startsWith("l");
    };
    SolidParser._IsObjectElement = function (line) {
        return line.startsWith("o");
    };
    SolidParser._IsGroupElement = function (line) {
        return line.startsWith("g");
    };
    SolidParser._GetZbrushMRGB = function (line, notParse) {
        if (!line.startsWith("mrgb"))
            return null;
        line = line.replace("mrgb", "").trim();
        // if include vertex color , not load mrgb anymore
        if (notParse)
            return [];
        var regex = /[a-z0-9]/g;
        var regArray = line.match(regex);
        if (!regArray || regArray.length % 8 !== 0) {
            return [];
        }
        var array = [];
        for (var regIndex = 0; regIndex < regArray.length / 8; regIndex++) {
            //each item is MMRRGGBB, m is material index
            // const m = regArray[regIndex * 8 + 0] + regArray[regIndex * 8 + 1];
            var r = regArray[regIndex * 8 + 2] + regArray[regIndex * 8 + 3];
            var g = regArray[regIndex * 8 + 4] + regArray[regIndex * 8 + 5];
            var b = regArray[regIndex * 8 + 6] + regArray[regIndex * 8 + 7];
            array.push(new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color4(parseInt(r, 16) / 255, parseInt(g, 16) / 255, parseInt(b, 16) / 255, 1));
        }
        return array;
    };
    /**
     * Function used to parse an OBJ string
     * @param meshesNames defines the list of meshes to load (all if not defined)
     * @param data defines the OBJ string
     * @param scene defines the hosting scene
     * @param assetContainer defines the asset container to load data in
     * @param onFileToLoadFound defines a callback that will be called if a MTL file is found
     */
    SolidParser.prototype.parse = function (meshesNames, data, scene, assetContainer, onFileToLoadFound) {
        var _this = this;
        var _a, _b;
        //Move Santitize here to forbid delete zbrush data
        // Sanitize data
        data = data.replace(/#MRGB/g, "mrgb");
        data = data.replace(/#.*$/gm, "").trim();
        if (this._loadingOptions.useLegacyBehavior) {
            this._pushTriangle = function (faces, faceIndex) { return _this._triangles.push(faces[0], faces[faceIndex], faces[faceIndex + 1]); };
            this._handednessSign = 1;
        }
        else if (scene.useRightHandedSystem) {
            this._pushTriangle = function (faces, faceIndex) { return _this._triangles.push(faces[0], faces[faceIndex + 1], faces[faceIndex]); };
            this._handednessSign = 1;
        }
        else {
            this._pushTriangle = function (faces, faceIndex) { return _this._triangles.push(faces[0], faces[faceIndex], faces[faceIndex + 1]); };
            this._handednessSign = -1;
        }
        // Split the file into lines
        // Preprocess line data
        var linesOBJ = data.split("\n");
        var lineLines = [];
        var currentGroup = [];
        lineLines.push(currentGroup);
        for (var i = 0; i < linesOBJ.length; i++) {
            var line = linesOBJ[i].trim().replace(/\s\s/g, " ");
            // Comment or newLine
            if (line.length === 0 || line.charAt(0) === "#") {
                continue;
            }
            if (SolidParser._IsGroupElement(line) || SolidParser._IsObjectElement(line)) {
                currentGroup = [];
                lineLines.push(currentGroup);
            }
            if (SolidParser._IsLineElement(line)) {
                var lineValues = line.split(" ");
                // create line elements with two vertices only
                for (var i_1 = 1; i_1 < lineValues.length - 1; i_1++) {
                    currentGroup.push("l ".concat(lineValues[i_1], " ").concat(lineValues[i_1 + 1]));
                }
            }
            else {
                currentGroup.push(line);
            }
        }
        var lines = lineLines.flat();
        // Look at each line
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim().replace(/\s\s/g, " ");
            var result = void 0;
            // Comment or newLine
            if (line.length === 0 || line.charAt(0) === "#") {
                continue;
            }
            else if (SolidParser.VertexPattern.test(line)) {
                //Get information about one position possible for the vertices
                result = line.match(/[^ ]+/g); // match will return non-null due to passing regex pattern
                // Value of result with line: "v 1.0 2.0 3.0"
                // ["v", "1.0", "2.0", "3.0"]
                // Create a Vector3 with the position x, y, z
                this._positions.push(new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3])));
                if (this._loadingOptions.importVertexColors) {
                    if (result.length >= 7) {
                        var r = parseFloat(result[4]);
                        var g = parseFloat(result[5]);
                        var b = parseFloat(result[6]);
                        this._colors.push(new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color4(r > 1 ? r / 255 : r, g > 1 ? g / 255 : g, b > 1 ? b / 255 : b, result.length === 7 || result[7] === undefined ? 1 : parseFloat(result[7])));
                    }
                    else {
                        // TODO: maybe push NULL and if all are NULL to skip (and remove grayColor var).
                        this._colors.push(this._grayColor);
                    }
                }
            }
            else if ((result = SolidParser.NormalPattern.exec(line)) !== null) {
                //Create a Vector3 with the normals x, y, z
                //Value of result
                // ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
                //Add the Vector in the list of normals
                this._normals.push(new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3])));
            }
            else if ((result = SolidParser.UVPattern.exec(line)) !== null) {
                //Create a Vector2 with the normals u, v
                //Value of result
                // ["vt 0.1 0.2 0.3", "0.1", "0.2"]
                //Add the Vector in the list of uvs
                this._uvs.push(new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2(parseFloat(result[1]) * this._loadingOptions.UVScaling.x, parseFloat(result[2]) * this._loadingOptions.UVScaling.y));
                //Identify patterns of faces
                //Face could be defined in different type of pattern
            }
            else if ((result = SolidParser.FacePattern3.exec(line)) !== null) {
                //Value of result:
                //["f 1/1/1 2/2/2 3/3/3", "1/1/1 2/2/2 3/3/3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern3(result[1].trim().split(" "), // ["1/1/1", "2/2/2", "3/3/3"]
                1);
            }
            else if ((result = SolidParser.FacePattern4.exec(line)) !== null) {
                //Value of result:
                //["f 1//1 2//2 3//3", "1//1 2//2 3//3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern4(result[1].trim().split(" "), // ["1//1", "2//2", "3//3"]
                1);
            }
            else if ((result = SolidParser.FacePattern5.exec(line)) !== null) {
                //Value of result:
                //["f -1/-1/-1 -2/-2/-2 -3/-3/-3", "-1/-1/-1 -2/-2/-2 -3/-3/-3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern5(result[1].trim().split(" "), // ["-1/-1/-1", "-2/-2/-2", "-3/-3/-3"]
                1);
            }
            else if ((result = SolidParser.FacePattern2.exec(line)) !== null) {
                //Value of result:
                //["f 1/1 2/2 3/3", "1/1 2/2 3/3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern2(result[1].trim().split(" "), // ["1/1", "2/2", "3/3"]
                1);
            }
            else if ((result = SolidParser.FacePattern1.exec(line)) !== null) {
                //Value of result
                //["f 1 2 3", "1 2 3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern1(result[1].trim().split(" "), // ["1", "2", "3"]
                1);
                // Define a mesh or an object
                // Each time this keyword is analyzed, create a new Object with all data for creating a babylonMesh
            }
            else if ((result = SolidParser.LinePattern1.exec(line)) !== null) {
                //Value of result
                //["l 1 2"]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern1(result[1].trim().split(" "), // ["1", "2"]
                0);
                this._hasLineData = true;
                // Define a mesh or an object
                // Each time this keyword is analyzed, create a new Object with all data for creating a babylonMesh
            }
            else if ((result = SolidParser.LinePattern2.exec(line)) !== null) {
                //Value of result
                //["l 1/1 2/2"]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern2(result[1].trim().split(" "), // ["1/1", "2/2"]
                0);
                this._hasLineData = true;
                // Define a mesh or an object
                // Each time this keyword is analyzed, create a new Object with all data for creating a babylonMesh
            }
            else if ((result = SolidParser._GetZbrushMRGB(line, !this._loadingOptions.importVertexColors))) {
                result.forEach(function (element) {
                    _this._extColors.push(element);
                });
            }
            else if ((result = SolidParser.LinePattern3.exec(line)) !== null) {
                //Value of result
                //["l 1/1/1 2/2/2"]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern3(result[1].trim().split(" "), // ["1/1/1", "2/2/2"]
                0);
                this._hasLineData = true;
                // Define a mesh or an object
                // Each time this keyword is analyzed, create a new Object with all data for creating a babylonMesh
            }
            else if (SolidParser.GroupDescriptor.test(line) || SolidParser.ObjectDescriptor.test(line)) {
                // Create a new mesh corresponding to the name of the group.
                // Definition of the mesh
                var objMesh = {
                    name: line.substring(2).trim(), //Set the name of the current obj mesh
                    indices: null,
                    positions: null,
                    normals: null,
                    uvs: null,
                    colors: null,
                    materialName: this._materialNameFromObj,
                    isObject: SolidParser.ObjectDescriptor.test(line),
                };
                this._addPreviousObjMesh();
                //Push the last mesh created with only the name
                this._meshesFromObj.push(objMesh);
                //Set this variable to indicate that now meshesFromObj has objects defined inside
                this._hasMeshes = true;
                this._isFirstMaterial = true;
                this._increment = 1;
                //Keyword for applying a material
            }
            else if (SolidParser.UseMtlDescriptor.test(line)) {
                //Get the name of the material
                this._materialNameFromObj = line.substring(7).trim();
                //If this new material is in the same mesh
                if (!this._isFirstMaterial || !this._hasMeshes) {
                    //Set the data for the previous mesh
                    this._addPreviousObjMesh();
                    //Create a new mesh
                    var objMesh = 
                    //Set the name of the current obj mesh
                    {
                        name: (this._objMeshName || "mesh") + "_mm" + this._increment.toString(), //Set the name of the current obj mesh
                        indices: null,
                        positions: null,
                        normals: null,
                        uvs: null,
                        colors: null,
                        materialName: this._materialNameFromObj,
                        isObject: false,
                    };
                    this._increment++;
                    //If meshes are already defined
                    this._meshesFromObj.push(objMesh);
                    this._hasMeshes = true;
                }
                //Set the material name if the previous line define a mesh
                if (this._hasMeshes && this._isFirstMaterial) {
                    //Set the material name to the previous mesh (1 material per mesh)
                    this._meshesFromObj[this._meshesFromObj.length - 1].materialName = this._materialNameFromObj;
                    this._isFirstMaterial = false;
                }
                // Keyword for loading the mtl file
            }
            else if (SolidParser.MtlLibGroupDescriptor.test(line)) {
                // Get the name of mtl file
                onFileToLoadFound(line.substring(7).trim());
                // Apply smoothing
            }
            else if (SolidParser.SmoothDescriptor.test(line)) {
                // smooth shading => apply smoothing
                // Today I don't know it work with babylon and with obj.
                // With the obj file  an integer is set
            }
            else {
                //If there is another possibility
                babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Logger.Log("Unhandled expression at line : " + line);
            }
        }
        // At the end of the file, add the last mesh into the meshesFromObj array
        if (this._hasMeshes) {
            // Set the data for the last mesh
            this._handledMesh = this._meshesFromObj[this._meshesFromObj.length - 1];
            if (this._loadingOptions.useLegacyBehavior) {
                //Reverse indices for displaying faces in the good sense
                this._indicesForBabylon.reverse();
            }
            //Get the good array
            this._unwrapData();
            //Set array
            this._handledMesh.indices = this._indicesForBabylon;
            this._handledMesh.positions = this._unwrappedPositionsForBabylon;
            this._handledMesh.normals = this._unwrappedNormalsForBabylon;
            this._handledMesh.uvs = this._unwrappedUVForBabylon;
            this._handledMesh.hasLines = this._hasLineData;
            if (this._loadingOptions.importVertexColors) {
                this._handledMesh.colors = this._unwrappedColorsForBabylon;
            }
        }
        // If any o or g keyword not found, create a mesh with a random id
        if (!this._hasMeshes) {
            var newMaterial = null;
            if (this._indicesForBabylon.length) {
                if (this._loadingOptions.useLegacyBehavior) {
                    // reverse tab of indices
                    this._indicesForBabylon.reverse();
                }
                //Get positions normals uvs
                this._unwrapData();
            }
            else {
                // There is no indices in the file. We will have to switch to point cloud rendering
                for (var _i = 0, _c = this._positions; _i < _c.length; _i++) {
                    var pos = _c[_i];
                    this._unwrappedPositionsForBabylon.push(pos.x, pos.y, pos.z);
                }
                if (this._normals.length) {
                    for (var _d = 0, _e = this._normals; _d < _e.length; _d++) {
                        var normal = _e[_d];
                        this._unwrappedNormalsForBabylon.push(normal.x, normal.y, normal.z);
                    }
                }
                if (this._uvs.length) {
                    for (var _f = 0, _g = this._uvs; _f < _g.length; _f++) {
                        var uv = _g[_f];
                        this._unwrappedUVForBabylon.push(uv.x, uv.y);
                    }
                }
                if (this._extColors.length) {
                    for (var _h = 0, _j = this._extColors; _h < _j.length; _h++) {
                        var color = _j[_h];
                        this._unwrappedColorsForBabylon.push(color.r, color.g, color.b, color.a);
                    }
                }
                else {
                    if (this._colors.length) {
                        for (var _k = 0, _l = this._colors; _k < _l.length; _k++) {
                            var color = _l[_k];
                            this._unwrappedColorsForBabylon.push(color.r, color.g, color.b, color.a);
                        }
                    }
                }
                if (!this._materialNameFromObj) {
                    // Create a material with point cloud on
                    newMaterial = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.StandardMaterial(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Geometry.RandomId(), scene);
                    newMaterial.pointsCloud = true;
                    this._materialNameFromObj = newMaterial.name;
                    if (!this._normals.length) {
                        newMaterial.disableLighting = true;
                        newMaterial.emissiveColor = babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color3.White();
                    }
                }
            }
            //Set data for one mesh
            this._meshesFromObj.push({
                name: babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Geometry.RandomId(),
                indices: this._indicesForBabylon,
                positions: this._unwrappedPositionsForBabylon,
                colors: this._unwrappedColorsForBabylon,
                normals: this._unwrappedNormalsForBabylon,
                uvs: this._unwrappedUVForBabylon,
                materialName: this._materialNameFromObj,
                directMaterial: newMaterial,
                isObject: true,
                hasLines: this._hasLineData,
            });
        }
        //Set data for each mesh
        for (var j = 0; j < this._meshesFromObj.length; j++) {
            //check meshesNames (stlFileLoader)
            if (meshesNames && this._meshesFromObj[j].name) {
                if (meshesNames instanceof Array) {
                    if (meshesNames.indexOf(this._meshesFromObj[j].name) === -1) {
                        continue;
                    }
                }
                else {
                    if (this._meshesFromObj[j].name !== meshesNames) {
                        continue;
                    }
                }
            }
            //Get the current mesh
            //Set the data with VertexBuffer for each mesh
            this._handledMesh = this._meshesFromObj[j];
            //Create a Mesh with the name of the obj mesh
            scene._blockEntityCollection = !!assetContainer;
            var babylonMesh = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Mesh(this._meshesFromObj[j].name, scene);
            babylonMesh._parentContainer = assetContainer;
            scene._blockEntityCollection = false;
            this._handledMesh._babylonMesh = babylonMesh;
            // If this is a group mesh, it should have an object mesh as a parent. So look for the first object mesh that appears before it.
            if (!this._handledMesh.isObject) {
                for (var k = j - 1; k >= 0; --k) {
                    if (this._meshesFromObj[k].isObject && this._meshesFromObj[k]._babylonMesh) {
                        babylonMesh.parent = this._meshesFromObj[k]._babylonMesh;
                        break;
                    }
                }
            }
            //Push the name of the material to an array
            //This is indispensable for the importMesh function
            this._materialToUse.push(this._meshesFromObj[j].materialName);
            //If the mesh is a line mesh
            if (this._handledMesh.hasLines) {
                (_a = babylonMesh._internalMetadata) !== null && _a !== void 0 ? _a : (babylonMesh._internalMetadata = {});
                babylonMesh._internalMetadata["_isLine"] = true; //this is a line mesh
            }
            if (((_b = this._handledMesh.positions) === null || _b === void 0 ? void 0 : _b.length) === 0) {
                //Push the mesh into an array
                this._babylonMeshesArray.push(babylonMesh);
                continue;
            }
            var vertexData = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexData(); //The container for the values
            //Set the data for the babylonMesh
            vertexData.uvs = this._handledMesh.uvs;
            vertexData.indices = this._handledMesh.indices;
            vertexData.positions = this._handledMesh.positions;
            if (this._loadingOptions.computeNormals) {
                var normals = new Array();
                babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexData.ComputeNormals(this._handledMesh.positions, this._handledMesh.indices, normals);
                vertexData.normals = normals;
            }
            else {
                vertexData.normals = this._handledMesh.normals;
            }
            if (this._loadingOptions.importVertexColors) {
                vertexData.colors = this._handledMesh.colors;
            }
            //Set the data from the VertexBuffer to the current Mesh
            vertexData.applyToMesh(babylonMesh);
            if (this._loadingOptions.invertY) {
                babylonMesh.scaling.y *= -1;
            }
            if (this._loadingOptions.optimizeNormals) {
                this._optimizeNormals(babylonMesh);
            }
            //Push the mesh into an array
            this._babylonMeshesArray.push(babylonMesh);
            if (this._handledMesh.directMaterial) {
                babylonMesh.material = this._handledMesh.directMaterial;
            }
        }
    };
    // Descriptor
    /** Object descriptor */
    SolidParser.ObjectDescriptor = /^o/;
    /** Group descriptor */
    SolidParser.GroupDescriptor = /^g/;
    /** Material lib descriptor */
    SolidParser.MtlLibGroupDescriptor = /^mtllib /;
    /** Use a material descriptor */
    SolidParser.UseMtlDescriptor = /^usemtl /;
    /** Smooth descriptor */
    SolidParser.SmoothDescriptor = /^s /;
    // Patterns
    /** Pattern used to detect a vertex */
    SolidParser.VertexPattern = /^v(\s+[\d|.|+|\-|e|E]+){3,7}/;
    /** Pattern used to detect a normal */
    SolidParser.NormalPattern = /^vn(\s+[\d|.|+|\-|e|E]+)( +[\d|.|+|\-|e|E]+)( +[\d|.|+|\-|e|E]+)/;
    /** Pattern used to detect a UV set */
    SolidParser.UVPattern = /^vt(\s+[\d|.|+|\-|e|E]+)( +[\d|.|+|\-|e|E]+)/;
    /** Pattern used to detect a first kind of face (f vertex vertex vertex) */
    SolidParser.FacePattern1 = /^f\s+(([\d]{1,}[\s]?){3,})+/;
    /** Pattern used to detect a second kind of face (f vertex/uvs vertex/uvs vertex/uvs) */
    SolidParser.FacePattern2 = /^f\s+((([\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
    /** Pattern used to detect a third kind of face (f vertex/uvs/normal vertex/uvs/normal vertex/uvs/normal) */
    SolidParser.FacePattern3 = /^f\s+((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
    /** Pattern used to detect a fourth kind of face (f vertex//normal vertex//normal vertex//normal)*/
    SolidParser.FacePattern4 = /^f\s+((([\d]{1,}\/\/[\d]{1,}[\s]?){3,})+)/;
    /** Pattern used to detect a fifth kind of face (f -vertex/-uvs/-normal -vertex/-uvs/-normal -vertex/-uvs/-normal) */
    SolidParser.FacePattern5 = /^f\s+(((-[\d]{1,}\/-[\d]{1,}\/-[\d]{1,}[\s]?){3,})+)/;
    /** Pattern used to detect a line(l vertex vertex) */
    SolidParser.LinePattern1 = /^l\s+(([\d]{1,}[\s]?){2,})+/;
    /** Pattern used to detect a second kind of line (l vertex/uvs vertex/uvs) */
    SolidParser.LinePattern2 = /^l\s+((([\d]{1,}\/[\d]{1,}[\s]?){2,})+)/;
    /** Pattern used to detect a third kind of line (l vertex/uvs/normal vertex/uvs/normal) */
    SolidParser.LinePattern3 = /^l\s+((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?){2,})+)/;
    return SolidParser;
}());



/***/ }),

/***/ "../../../lts/loaders/src/legacy/legacy-objFileLoader.ts":
/*!***************************************************************!*\
  !*** ../../../lts/loaders/src/legacy/legacy-objFileLoader.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MTLFileLoader: () => (/* reexport safe */ loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__.MTLFileLoader),
/* harmony export */   OBJFileLoader: () => (/* reexport safe */ loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__.OBJFileLoader),
/* harmony export */   SolidParser: () => (/* reexport safe */ loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__.SolidParser)
/* harmony export */ });
/* harmony import */ var loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loaders/OBJ/index */ "../../../dev/loaders/src/OBJ/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var key in loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__) {
        if (!globalObject.BABYLON[key]) {
            globalObject.BABYLON[key] = loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__[key];
        }
    }
}



/***/ }),

/***/ "babylonjs/Misc/tools":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_tools__;

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
/*!******************************!*\
  !*** ./src/objFileLoader.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   loaders: () => (/* reexport module object */ _lts_loaders_legacy_legacy_objFileLoader__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_loaders_legacy_legacy_objFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/loaders/legacy/legacy-objFileLoader */ "../../../lts/loaders/src/legacy/legacy-objFileLoader.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_loaders_legacy_legacy_objFileLoader__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5vYmpGaWxlTG9hZGVyLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBSUE7O0FBRUE7QUFDQTtBQUFBO0FBTUE7O0FBRUE7QUFDQTtBQStNQTtBQTdNQTs7Ozs7Ozs7OztBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7OztBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBdE5BOztBQUVBO0FBQ0E7QUFvTkE7QUFBQTtBQXhOQTs7Ozs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTEE7QUFDQTtBQUdBO0FBQ0E7QUFHQTtBQUNBO0FBRUE7QUFFQTtBQVlBOzs7QUFHQTtBQUNBO0FBbUVBOzs7O0FBSUE7QUFDQTtBQWxCQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUVBO0FBVUE7QUFDQTtBQTlEQTtBQUhBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7QUFKQTtBQThEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTs7Ozs7Ozs7OztBQVVBO0FBQ0E7QUFNQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBeFVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBWUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQXNSQTtBQUFBO0FBMVVBO0FBNFVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMVdBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSUE7QUFnQkE7O0FBRUE7QUFDQTtBQXFFQTs7Ozs7QUFLQTtBQUNBO0FBckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7OztBQWFBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFJQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUlBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTs7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFFQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBT0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7QUFPQTtBQUNBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTE5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF5N0JBO0FBQUE7QUE1OUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUNoQkE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0xPQURFUlMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vZGV2L2xvYWRlcnMvc3JjL09CSi9pbmRleC50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9PQkovbXRsRmlsZUxvYWRlci50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9PQkovb2JqRmlsZUxvYWRlci5tZXRhZGF0YS50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9PQkovb2JqRmlsZUxvYWRlci50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9PQkovc29saWRQYXJzZXIudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9sdHMvbG9hZGVycy9zcmMvbGVnYWN5L2xlZ2FjeS1vYmpGaWxlTG9hZGVyLnRzIiwid2VicGFjazovL0xPQURFUlMvZXh0ZXJuYWwgdW1kIHtcInJvb3RcIjpcIkJBQllMT05cIixcImNvbW1vbmpzXCI6XCJiYWJ5bG9uanNcIixcImNvbW1vbmpzMlwiOlwiYmFieWxvbmpzXCIsXCJhbWRcIjpcImJhYnlsb25qc1wifSIsIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0xPQURFUlMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0xPQURFUlMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uL3NyYy9vYmpGaWxlTG9hZGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImJhYnlsb25qcy1sb2FkZXJzXCIsIFtcImJhYnlsb25qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJiYWJ5bG9uanMtbG9hZGVyc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiTE9BREVSU1wiXSA9IGZhY3Rvcnkocm9vdFtcIkJBQllMT05cIl0pO1xufSkoKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0aGlzKSwgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01pc2NfdG9vbHNfXykgPT4ge1xucmV0dXJuICIsImV4cG9ydCAqIGZyb20gXCIuL210bEZpbGVMb2FkZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vb2JqTG9hZGluZ09wdGlvbnNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vc29saWRQYXJzZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vb2JqRmlsZUxvYWRlclwiO1xyXG4iLCJpbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgQ29sb3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5jb2xvclwiO1xyXG5pbXBvcnQgeyBUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3RleHR1cmVcIjtcclxuaW1wb3J0IHsgU3RhbmRhcmRNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9zdGFuZGFyZE1hdGVyaWFsXCI7XHJcblxyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHR5cGUgeyBBc3NldENvbnRhaW5lciB9IGZyb20gXCJjb3JlL2Fzc2V0Q29udGFpbmVyXCI7XHJcbi8qKlxyXG4gKiBDbGFzcyByZWFkaW5nIGFuZCBwYXJzaW5nIHRoZSBNVEwgZmlsZSBidW5kbGVkIHdpdGggdGhlIG9iaiBmaWxlLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1UTEZpbGVMb2FkZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZlcnQgWS1BeGlzIG9mIHJlZmVyZW5jZWQgdGV4dHVyZXMgb24gbG9hZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIElOVkVSVF9URVhUVVJFX1kgPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxsIG1hdGVyaWFsIGxvYWRlZCBmcm9tIHRoZSBtdGwgd2lsbCBiZSBzZXQgaGVyZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbWF0ZXJpYWxzOiBTdGFuZGFyZE1hdGVyaWFsW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gd2lsbCByZWFkIHRoZSBtdGwgZmlsZSBhbmQgY3JlYXRlIGVhY2ggbWF0ZXJpYWwgZGVzY3JpYmVkIGluc2lkZVxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBjb3VsZCBiZSBpbXByb3ZlIGJ5IGFkZGluZyA6XHJcbiAgICAgKiAtc29tZSBjb21wb25lbnQgbWlzc2luZyAoTmksIFRmLi4uKVxyXG4gICAgICogLWluY2x1ZGluZyB0aGUgc3BlY2lmaWMgb3B0aW9ucyBhdmFpbGFibGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgZGVmaW5lcyB0aGUgc2NlbmUgdGhlIG1hdGVyaWFsIHdpbGwgYmUgY3JlYXRlZCBpblxyXG4gICAgICogQHBhcmFtIGRhdGEgZGVmaW5lcyB0aGUgbXRsIGRhdGEgdG8gcGFyc2VcclxuICAgICAqIEBwYXJhbSByb290VXJsIGRlZmluZXMgdGhlIHJvb3R1cmwgdG8gdXNlIGluIG9yZGVyIHRvIGxvYWQgcmVsYXRpdmUgZGVwZW5kZW5jaWVzXHJcbiAgICAgKiBAcGFyYW0gYXNzZXRDb250YWluZXIgZGVmaW5lcyB0aGUgYXNzZXQgY29udGFpbmVyIHRvIHN0b3JlIHRoZSBtYXRlcmlhbCBpbiAoY2FuIGJlIG51bGwpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwYXJzZU1UTChzY2VuZTogU2NlbmUsIGRhdGE6IHN0cmluZyB8IEFycmF5QnVmZmVyLCByb290VXJsOiBzdHJpbmcsIGFzc2V0Q29udGFpbmVyOiBOdWxsYWJsZTxBc3NldENvbnRhaW5lcj4pOiB2b2lkIHtcclxuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vU3BsaXQgdGhlIGxpbmVzIGZyb20gdGhlIGZpbGVcclxuICAgICAgICBjb25zdCBsaW5lcyA9IGRhdGEuc3BsaXQoXCJcXG5cIik7XHJcbiAgICAgICAgLy8gd2hpdGVzcGFjZSBjaGFyIGllOiBbIFxcdFxcclxcblxcZl1cclxuICAgICAgICBjb25zdCBkZWxpbWl0ZXJfcGF0dGVybiA9IC9cXHMrLztcclxuICAgICAgICAvL0FycmF5IHdpdGggUkdCIGNvbG9yc1xyXG4gICAgICAgIGxldCBjb2xvcjogbnVtYmVyW107XHJcbiAgICAgICAgLy9OZXcgbWF0ZXJpYWxcclxuICAgICAgICBsZXQgbWF0ZXJpYWw6IE51bGxhYmxlPFN0YW5kYXJkTWF0ZXJpYWw+ID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy9Mb29rIGF0IGVhY2ggbGluZVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgbGluZSA9IGxpbmVzW2ldLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJsYW5rIGxpbmUgb3IgY29tbWVudFxyXG4gICAgICAgICAgICBpZiAobGluZS5sZW5ndGggPT09IDAgfHwgbGluZS5jaGFyQXQoMCkgPT09IFwiI1wiKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9HZXQgdGhlIGZpcnN0IHBhcmFtZXRlciAoa2V5d29yZClcclxuICAgICAgICAgICAgY29uc3QgcG9zID0gbGluZS5pbmRleE9mKFwiIFwiKTtcclxuICAgICAgICAgICAgbGV0IGtleSA9IHBvcyA+PSAwID8gbGluZS5zdWJzdHJpbmcoMCwgcG9zKSA6IGxpbmU7XHJcbiAgICAgICAgICAgIGtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAgICAgLy9HZXQgdGhlIGRhdGEgZm9sbG93aW5nIHRoZSBrZXlcclxuICAgICAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHBvcyA+PSAwID8gbGluZS5zdWJzdHJpbmcocG9zICsgMSkudHJpbSgpIDogXCJcIjtcclxuXHJcbiAgICAgICAgICAgIC8vVGhpcyBtdGwga2V5d29yZCB3aWxsIGNyZWF0ZSB0aGUgbmV3IG1hdGVyaWFsXHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IFwibmV3bXRsXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgaXQgaXMgdGhlIGZpcnN0IG1hdGVyaWFsLlxyXG4gICAgICAgICAgICAgICAgLy8gTWF0ZXJpYWxzIHNwZWNpZmljYXRpb25zIGFyZSBkZXNjcmliZWQgYWZ0ZXIgdGhpcyBrZXl3b3JkLlxyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9BZGQgdGhlIHByZXZpb3VzIG1hdGVyaWFsIGluIHRoZSBtYXRlcmlhbCBhcnJheS5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGVyaWFscy5wdXNoKG1hdGVyaWFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vQ3JlYXRlIGEgbmV3IG1hdGVyaWFsLlxyXG4gICAgICAgICAgICAgICAgLy8gdmFsdWUgaXMgdGhlIG5hbWUgb2YgdGhlIG1hdGVyaWFsIHJlYWQgaW4gdGhlIG10bCBmaWxlXHJcblxyXG4gICAgICAgICAgICAgICAgc2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9ICEhYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbCA9IG5ldyBTdGFuZGFyZE1hdGVyaWFsKHZhbHVlLCBzY2VuZSk7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5fcGFyZW50Q29udGFpbmVyID0gYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgICAgICAgICBzY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImtkXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIERpZmZ1c2UgY29sb3IgKGNvbG9yIHVuZGVyIHdoaXRlIGxpZ2h0KSB1c2luZyBSR0IgdmFsdWVzXHJcblxyXG4gICAgICAgICAgICAgICAgLy92YWx1ZSAgPSBcInIgZyBiXCJcclxuICAgICAgICAgICAgICAgIGNvbG9yID0gPG51bWJlcltdPnZhbHVlLnNwbGl0KGRlbGltaXRlcl9wYXR0ZXJuLCAzKS5tYXAocGFyc2VGbG9hdCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbG9yID0gW3IsZyxiXVxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGdoZSBjb2xvciBpbnRvIHRoZSBtYXRlcmlhbFxyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gQ29sb3IzLkZyb21BcnJheShjb2xvcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImthXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIEFtYmllbnQgY29sb3IgKGNvbG9yIHVuZGVyIHNoYWRvdykgdXNpbmcgUkdCIHZhbHVlc1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFsdWUgPSBcInIgZyBiXCJcclxuICAgICAgICAgICAgICAgIGNvbG9yID0gPG51bWJlcltdPnZhbHVlLnNwbGl0KGRlbGltaXRlcl9wYXR0ZXJuLCAzKS5tYXAocGFyc2VGbG9hdCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbG9yID0gW3IsZyxiXVxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGdoZSBjb2xvciBpbnRvIHRoZSBtYXRlcmlhbFxyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuYW1iaWVudENvbG9yID0gQ29sb3IzLkZyb21BcnJheShjb2xvcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImtzXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIFNwZWN1bGFyIGNvbG9yIChjb2xvciB3aGVuIGxpZ2h0IGlzIHJlZmxlY3RlZCBmcm9tIHNoaW55IHN1cmZhY2UpIHVzaW5nIFJHQiB2YWx1ZXNcclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhbHVlID0gXCJyIGcgYlwiXHJcbiAgICAgICAgICAgICAgICBjb2xvciA9IDxudW1iZXJbXT52YWx1ZS5zcGxpdChkZWxpbWl0ZXJfcGF0dGVybiwgMykubWFwKHBhcnNlRmxvYXQpO1xyXG4gICAgICAgICAgICAgICAgLy9jb2xvciA9IFtyLGcsYl1cclxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBjb2xvciBpbnRvIHRoZSBtYXRlcmlhbFxyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuc3BlY3VsYXJDb2xvciA9IENvbG9yMy5Gcm9tQXJyYXkoY29sb3IpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJrZVwiICYmIG1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbWlzc2l2ZSBjb2xvciB1c2luZyBSR0IgdmFsdWVzXHJcbiAgICAgICAgICAgICAgICBjb2xvciA9IHZhbHVlLnNwbGl0KGRlbGltaXRlcl9wYXR0ZXJuLCAzKS5tYXAocGFyc2VGbG9hdCk7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5lbWlzc2l2ZUNvbG9yID0gQ29sb3IzLkZyb21BcnJheShjb2xvcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIm5zXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vdmFsdWUgPSBcIkludGVnZXJcIlxyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuc3BlY3VsYXJQb3dlciA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJkXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vZCBpcyBkaXNzb2x2ZSBmb3IgY3VycmVudCBtYXRlcmlhbC4gSXQgbWVhbiBhbHBoYSBmb3IgQkFCWUxPTlxyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuYWxwaGEgPSBwYXJzZUZsb2F0KHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL1RleHR1cmVcclxuICAgICAgICAgICAgICAgIC8vVGhpcyBwYXJ0IGNhbiBiZSBpbXByb3ZlZCBieSBhZGRpbmcgdGhlIHBvc3NpYmxlIG9wdGlvbnMgb2YgdGV4dHVyZVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJtYXBfa2FcIiAmJiBtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gYW1iaWVudCB0ZXh0dXJlIG1hcCB3aXRoIGEgbG9hZGVkIGltYWdlXHJcbiAgICAgICAgICAgICAgICAvL1dlIG11c3QgZmlyc3QgZ2V0IHRoZSBmb2xkZXIgb2YgdGhlIGltYWdlXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5hbWJpZW50VGV4dHVyZSA9IE1UTEZpbGVMb2FkZXIuX0dldFRleHR1cmUocm9vdFVybCwgdmFsdWUsIHNjZW5lKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwibWFwX2tkXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIERpZmZ1c2UgdGV4dHVyZSBtYXAgd2l0aCBhIGxvYWRlZCBpbWFnZVxyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuZGlmZnVzZVRleHR1cmUgPSBNVExGaWxlTG9hZGVyLl9HZXRUZXh0dXJlKHJvb3RVcmwsIHZhbHVlLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIm1hcF9rc1wiICYmIG1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTcGVjdWxhciB0ZXh0dXJlIG1hcCB3aXRoIGEgbG9hZGVkIGltYWdlXHJcbiAgICAgICAgICAgICAgICAvL1dlIG11c3QgZmlyc3QgZ2V0IHRoZSBmb2xkZXIgb2YgdGhlIGltYWdlXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5zcGVjdWxhclRleHR1cmUgPSBNVExGaWxlTG9hZGVyLl9HZXRUZXh0dXJlKHJvb3RVcmwsIHZhbHVlLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIm1hcF9uc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAvL1NwZWN1bGFyXHJcbiAgICAgICAgICAgICAgICAvL1NwZWN1bGFyIGhpZ2hsaWdodCBjb21wb25lbnRcclxuICAgICAgICAgICAgICAgIC8vV2UgbXVzdCBmaXJzdCBnZXQgdGhlIGZvbGRlciBvZiB0aGUgaW1hZ2VcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvL05vdCBzdXBwb3J0ZWQgYnkgQkFCWUxPTlxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIC8vICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJtYXBfYnVtcFwiICYmIG1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAvL1RoZSBidW1wIHRleHR1cmVcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IHZhbHVlLnNwbGl0KGRlbGltaXRlcl9wYXR0ZXJuKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1bXBNdWx0aXBsaWVySW5kZXggPSB2YWx1ZXMuaW5kZXhPZihcIi1ibVwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBidW1wTXVsdGlwbGllcjogTnVsbGFibGU8c3RyaW5nPiA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGJ1bXBNdWx0aXBsaWVySW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bXBNdWx0aXBsaWVyID0gdmFsdWVzW2J1bXBNdWx0aXBsaWVySW5kZXggKyAxXTtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMuc3BsaWNlKGJ1bXBNdWx0aXBsaWVySW5kZXgsIDIpOyAvLyByZW1vdmVcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5idW1wVGV4dHVyZSA9IE1UTEZpbGVMb2FkZXIuX0dldFRleHR1cmUocm9vdFVybCwgdmFsdWVzLmpvaW4oXCIgXCIpLCBzY2VuZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0ZXJpYWwuYnVtcFRleHR1cmUgJiYgYnVtcE11bHRpcGxpZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5idW1wVGV4dHVyZS5sZXZlbCA9IHBhcnNlRmxvYXQoYnVtcE11bHRpcGxpZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJtYXBfZFwiICYmIG1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgZGlzc29sdmUgb2YgdGhlIG1hdGVyaWFsXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5vcGFjaXR5VGV4dHVyZSA9IE1UTEZpbGVMb2FkZXIuX0dldFRleHR1cmUocm9vdFVybCwgdmFsdWUsIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL09wdGlvbnMgZm9yIGlsbHVtaW5hdGlvblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJpbGx1bVwiKSB7XHJcbiAgICAgICAgICAgICAgICAvL0lsbHVtaW5hdGlvblxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBcIjBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGhhdCBtZWFuIEtkID09IEtkXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29sb3Igb24gYW5kIEFtYmllbnQgb25cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiMlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9IaWdobGlnaHQgb25cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9SZWZsZWN0aW9uIG9uIGFuZCBSYXkgdHJhY2Ugb25cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiNFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UcmFuc3BhcmVuY3k6IEdsYXNzIG9uLCBSZWZsZWN0aW9uOiBSYXkgdHJhY2Ugb25cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiNVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9SZWZsZWN0aW9uOiBGcmVzbmVsIG9uIGFuZCBSYXkgdHJhY2Ugb25cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiNlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UcmFuc3BhcmVuY3k6IFJlZnJhY3Rpb24gb24sIFJlZmxlY3Rpb246IEZyZXNuZWwgb2ZmIGFuZCBSYXkgdHJhY2Ugb25cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiN1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UcmFuc3BhcmVuY3k6IFJlZnJhY3Rpb24gb24sIFJlZmxlY3Rpb246IEZyZXNuZWwgb24gYW5kIFJheSB0cmFjZSBvblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCI4XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1JlZmxlY3Rpb24gb24gYW5kIFJheSB0cmFjZSBvZmZcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiOVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UcmFuc3BhcmVuY3k6IEdsYXNzIG9uLCBSZWZsZWN0aW9uOiBSYXkgdHJhY2Ugb2ZmXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBcIjEwXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0Nhc3RzIHNoYWRvd3Mgb250byBpbnZpc2libGUgc3VyZmFjZXNcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVW5oYW5kbGVkIGV4cHJlc3Npb24gYXQgbGluZSA6IFwiICsgaSArJ1xcbicgKyBcIndpdGggdmFsdWUgOiBcIiArIGxpbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vQXQgdGhlIGVuZCBvZiB0aGUgZmlsZSwgYWRkIHRoZSBsYXN0IG1hdGVyaWFsXHJcbiAgICAgICAgaWYgKG1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHRleHR1cmUgZm9yIHRoZSBtYXRlcmlhbC5cclxuICAgICAqXHJcbiAgICAgKiBJZiB0aGUgbWF0ZXJpYWwgaXMgaW1wb3J0ZWQgZnJvbSBpbnB1dCBmaWxlLFxyXG4gICAgICogV2Ugc2FuaXRpemUgdGhlIHVybCB0byBlbnN1cmUgaXQgdGFrZXMgdGhlIHRleHR1cmUgZnJvbSBhc2lkZSB0aGUgbWF0ZXJpYWwuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgVGhlIHJvb3QgdXJsIHRvIGxvYWQgZnJvbVxyXG4gICAgICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSBzdG9yZWQgaW4gdGhlIG10bFxyXG4gICAgICogQHBhcmFtIHNjZW5lXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgVGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfR2V0VGV4dHVyZShyb290VXJsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHNjZW5lOiBTY2VuZSk6IE51bGxhYmxlPFRleHR1cmU+IHtcclxuICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHVybCA9IHJvb3RVcmw7XHJcbiAgICAgICAgLy8gTG9hZCBmcm9tIGlucHV0IGZpbGUuXHJcbiAgICAgICAgaWYgKHJvb3RVcmwgPT09IFwiZmlsZTpcIikge1xyXG4gICAgICAgICAgICBsZXQgbGFzdERlbGltaXRlciA9IHZhbHVlLmxhc3RJbmRleE9mKFwiXFxcXFwiKTtcclxuICAgICAgICAgICAgaWYgKGxhc3REZWxpbWl0ZXIgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBsYXN0RGVsaW1pdGVyID0gdmFsdWUubGFzdEluZGV4T2YoXCIvXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobGFzdERlbGltaXRlciA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgKz0gdmFsdWUuc3Vic3RyaW5nKGxhc3REZWxpbWl0ZXIgKyAxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHVybCArPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBOb3QgZnJvbSBpbnB1dCBmaWxlLlxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB1cmwgKz0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFRleHR1cmUodXJsLCBzY2VuZSwgZmFsc2UsIE1UTEZpbGVMb2FkZXIuSU5WRVJUX1RFWFRVUkVfWSk7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzXHJcbmltcG9ydCB0eXBlIHsgSVNjZW5lTG9hZGVyUGx1Z2luTWV0YWRhdGEgfSBmcm9tIFwiY29yZS9pbmRleFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IE9CSkZpbGVMb2FkZXJNZXRhZGF0YSA9IHtcclxuICAgIG5hbWU6IFwib2JqXCIsXHJcbiAgICBleHRlbnNpb25zOiBcIi5vYmpcIixcclxufSBhcyBjb25zdCBzYXRpc2ZpZXMgSVNjZW5lTG9hZGVyUGx1Z2luTWV0YWRhdGE7XHJcbiIsImltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC52ZWN0b3JcIjtcclxuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiY29yZS9NaXNjL3Rvb2xzXCI7XHJcbmltcG9ydCB0eXBlIHsgQWJzdHJhY3RNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL2Fic3RyYWN0TWVzaFwiO1xyXG5pbXBvcnQgdHlwZSB7IElTY2VuZUxvYWRlclBsdWdpbkFzeW5jLCBJU2NlbmVMb2FkZXJQbHVnaW5GYWN0b3J5LCBJU2NlbmVMb2FkZXJQbHVnaW4sIElTY2VuZUxvYWRlckFzeW5jUmVzdWx0IH0gZnJvbSBcImNvcmUvTG9hZGluZy9zY2VuZUxvYWRlclwiO1xyXG5pbXBvcnQgeyBSZWdpc3RlclNjZW5lTG9hZGVyUGx1Z2luIH0gZnJvbSBcImNvcmUvTG9hZGluZy9zY2VuZUxvYWRlclwiO1xyXG5pbXBvcnQgeyBBc3NldENvbnRhaW5lciB9IGZyb20gXCJjb3JlL2Fzc2V0Q29udGFpbmVyXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFdlYlJlcXVlc3QgfSBmcm9tIFwiY29yZS9NaXNjL3dlYlJlcXVlc3RcIjtcclxuaW1wb3J0IHsgT0JKRmlsZUxvYWRlck1ldGFkYXRhIH0gZnJvbSBcIi4vb2JqRmlsZUxvYWRlci5tZXRhZGF0YVwiO1xyXG5pbXBvcnQgeyBNVExGaWxlTG9hZGVyIH0gZnJvbSBcIi4vbXRsRmlsZUxvYWRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE9CSkxvYWRpbmdPcHRpb25zIH0gZnJvbSBcIi4vb2JqTG9hZGluZ09wdGlvbnNcIjtcclxuaW1wb3J0IHsgU29saWRQYXJzZXIgfSBmcm9tIFwiLi9zb2xpZFBhcnNlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5pbXBvcnQgeyBTdGFuZGFyZE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL3N0YW5kYXJkTWF0ZXJpYWxcIjtcclxuXHJcbmRlY2xhcmUgbW9kdWxlIFwiY29yZS9Mb2FkaW5nL3NjZW5lTG9hZGVyXCIge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzZG9jL3JlcXVpcmUtanNkb2NcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgU2NlbmVMb2FkZXJQbHVnaW5PcHRpb25zIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmVzIG9wdGlvbnMgZm9yIHRoZSBvYmogbG9hZGVyLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFtPQkpGaWxlTG9hZGVyTWV0YWRhdGEubmFtZV06IHt9O1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogT0JKIGZpbGUgdHlwZSBsb2FkZXIuXHJcbiAqIFRoaXMgaXMgYSBiYWJ5bG9uIHNjZW5lIGxvYWRlciBwbHVnaW4uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgT0JKRmlsZUxvYWRlciBpbXBsZW1lbnRzIElTY2VuZUxvYWRlclBsdWdpbkFzeW5jLCBJU2NlbmVMb2FkZXJQbHVnaW5GYWN0b3J5IHtcclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBpZiBVVnMgYXJlIG9wdGltaXplZCBieSBkZWZhdWx0IGR1cmluZyBsb2FkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIE9QVElNSVpFX1dJVEhfVVYgPSB0cnVlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZlcnQgbW9kZWwgb24geS1heGlzIChkb2VzIGEgbW9kZWwgc2NhbGluZyBpbnZlcnNpb24pXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgSU5WRVJUX1kgPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICogSW52ZXJ0IFktQXhpcyBvZiByZWZlcmVuY2VkIHRleHR1cmVzIG9uIGxvYWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSU5WRVJUX1RFWFRVUkVfWSgpIHtcclxuICAgICAgICByZXR1cm4gTVRMRmlsZUxvYWRlci5JTlZFUlRfVEVYVFVSRV9ZO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0IElOVkVSVF9URVhUVVJFX1kodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICBNVExGaWxlTG9hZGVyLklOVkVSVF9URVhUVVJFX1kgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluY2x1ZGUgaW4gbWVzaGVzIHRoZSB2ZXJ0ZXggY29sb3JzIGF2YWlsYWJsZSBpbiBzb21lIE9CSiBmaWxlcy4gIFRoaXMgaXMgbm90IHBhcnQgb2YgT0JKIHN0YW5kYXJkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIElNUE9SVF9WRVJURVhfQ09MT1JTID0gZmFsc2U7XHJcbiAgICAvKipcclxuICAgICAqIENvbXB1dGUgdGhlIG5vcm1hbHMgZm9yIHRoZSBtb2RlbCwgZXZlbiBpZiBub3JtYWxzIGFyZSBwcmVzZW50IGluIHRoZSBmaWxlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIENPTVBVVEVfTk9STUFMUyA9IGZhbHNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBPcHRpbWl6ZSB0aGUgbm9ybWFscyBmb3IgdGhlIG1vZGVsLiBMaWdodGluZyBjYW4gYmUgdW5ldmVuIGlmIHlvdSB1c2UgT3B0aW1pemVXaXRoVVYgPSB0cnVlIGJlY2F1c2UgbmV3IHZlcnRpY2VzIGNhbiBiZSBjcmVhdGVkIGZvciB0aGUgc2FtZSBsb2NhdGlvbiBpZiB0aGV5IHBlcnRhaW4gdG8gZGlmZmVyZW50IGZhY2VzLlxyXG4gICAgICogVXNpbmcgT3B0aW1pemVoTm9ybWFscyA9IHRydWUgd2lsbCBoZWxwIHNtb290aGluZyB0aGUgbGlnaHRpbmcgYnkgYXZlcmFnaW5nIHRoZSBub3JtYWxzIG9mIHRob3NlIHZlcnRpY2VzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIE9QVElNSVpFX05PUk1BTFMgPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBjdXN0b20gc2NhbGluZyBvZiBVViBjb29yZGluYXRlcyBvZiBsb2FkZWQgbWVzaGVzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFVWX1NDQUxJTkcgPSBuZXcgVmVjdG9yMigxLCAxKTtcclxuICAgIC8qKlxyXG4gICAgICogU2tpcCBsb2FkaW5nIHRoZSBtYXRlcmlhbHMgZXZlbiBpZiBkZWZpbmVkIGluIHRoZSBPQkogZmlsZSAobWF0ZXJpYWxzIGFyZSBpZ25vcmVkKS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTS0lQX01BVEVSSUFMUyA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hlbiBhIG1hdGVyaWFsIGZhaWxzIHRvIGxvYWQgT0JKIGxvYWRlciB3aWxsIHNpbGVudGx5IGZhaWwgYW5kIG9uU3VjY2VzcygpIGNhbGxiYWNrIHdpbGwgYmUgdHJpZ2dlcmVkLlxyXG4gICAgICpcclxuICAgICAqIERlZmF1bHRzIHRvIHRydWUgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIE1BVEVSSUFMX0xPQURJTkdfRkFJTFNfU0lMRU5UTFkgPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgYXNzZXRzIHdpdGhvdXQgaGFuZGVkbmVzcyBjb252ZXJzaW9ucy4gVGhpcyBmbGFnIGlzIGZvciBjb21wYXRpYmlsaXR5LiBVc2UgaXQgb25seSBpZiBhYnNvbHV0ZWx5IHJlcXVpcmVkLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBVU0VfTEVHQUNZX0JFSEFWSU9SID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBuYW1lIG9mIHRoZSBwbHVnaW4uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gT0JKRmlsZUxvYWRlck1ldGFkYXRhLm5hbWU7XHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGV4dGVuc2lvbiB0aGUgcGx1Z2luIGlzIGFibGUgdG8gbG9hZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGV4dGVuc2lvbnMgPSBPQkpGaWxlTG9hZGVyTWV0YWRhdGEuZXh0ZW5zaW9ucztcclxuXHJcbiAgICBwcml2YXRlIF9hc3NldENvbnRhaW5lcjogTnVsbGFibGU8QXNzZXRDb250YWluZXI+ID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9sb2FkaW5nT3B0aW9uczogT0JKTG9hZGluZ09wdGlvbnM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGxvYWRlciBmb3IgLk9CSiBmaWxlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsb2FkaW5nT3B0aW9ucyBvcHRpb25zIGZvciBsb2FkaW5nIGFuZCBwYXJzaW5nIE9CSi9NVEwgZmlsZXMuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxvYWRpbmdPcHRpb25zPzogT0JKTG9hZGluZ09wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLl9sb2FkaW5nT3B0aW9ucyA9IGxvYWRpbmdPcHRpb25zIHx8IE9CSkZpbGVMb2FkZXIuX0RlZmF1bHRMb2FkaW5nT3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXQgX0RlZmF1bHRMb2FkaW5nT3B0aW9ucygpOiBPQkpMb2FkaW5nT3B0aW9ucyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29tcHV0ZU5vcm1hbHM6IE9CSkZpbGVMb2FkZXIuQ09NUFVURV9OT1JNQUxTLFxyXG4gICAgICAgICAgICBvcHRpbWl6ZU5vcm1hbHM6IE9CSkZpbGVMb2FkZXIuT1BUSU1JWkVfTk9STUFMUyxcclxuICAgICAgICAgICAgaW1wb3J0VmVydGV4Q29sb3JzOiBPQkpGaWxlTG9hZGVyLklNUE9SVF9WRVJURVhfQ09MT1JTLFxyXG4gICAgICAgICAgICBpbnZlcnRZOiBPQkpGaWxlTG9hZGVyLklOVkVSVF9ZLFxyXG4gICAgICAgICAgICBpbnZlcnRUZXh0dXJlWTogT0JKRmlsZUxvYWRlci5JTlZFUlRfVEVYVFVSRV9ZLFxyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbiAgICAgICAgICAgIFVWU2NhbGluZzogT0JKRmlsZUxvYWRlci5VVl9TQ0FMSU5HLFxyXG4gICAgICAgICAgICBtYXRlcmlhbExvYWRpbmdGYWlsc1NpbGVudGx5OiBPQkpGaWxlTG9hZGVyLk1BVEVSSUFMX0xPQURJTkdfRkFJTFNfU0lMRU5UTFksXHJcbiAgICAgICAgICAgIG9wdGltaXplV2l0aFVWOiBPQkpGaWxlTG9hZGVyLk9QVElNSVpFX1dJVEhfVVYsXHJcbiAgICAgICAgICAgIHNraXBNYXRlcmlhbHM6IE9CSkZpbGVMb2FkZXIuU0tJUF9NQVRFUklBTFMsXHJcbiAgICAgICAgICAgIHVzZUxlZ2FjeUJlaGF2aW9yOiBPQkpGaWxlTG9hZGVyLlVTRV9MRUdBQ1lfQkVIQVZJT1IsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxzIHN5bmNocm9ub3VzbHkgdGhlIE1UTCBmaWxlIGF0dGFjaGVkIHRvIHRoaXMgb2JqLlxyXG4gICAgICogTG9hZCBmdW5jdGlvbiBvciBpbXBvcnRNZXNoIGZ1bmN0aW9uIGRvbid0IGVuYWJsZSB0byBsb2FkIDIgZmlsZXMgaW4gdGhlIHNhbWUgdGltZSBhc3luY2hyb25vdXNseS5cclxuICAgICAqIFdpdGhvdXQgdGhpcyBmdW5jdGlvbiBtYXRlcmlhbHMgYXJlIG5vdCBkaXNwbGF5ZWQgaW4gdGhlIGZpcnN0IGZyYW1lIChidXQgZGlzcGxheWVkIGFmdGVyKS5cclxuICAgICAqIEluIGNvbnNlcXVlbmNlIGl0IGlzIGltcG9zc2libGUgdG8gZ2V0IG1hdGVyaWFsIGluZm9ybWF0aW9uIGluIHlvdXIgSFRNTCBmaWxlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHVybCBUaGUgVVJMIG9mIHRoZSBNVEwgZmlsZVxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgZGVmaW5lcyB3aGVyZSB0byBsb2FkIGRhdGEgZnJvbVxyXG4gICAgICogQHBhcmFtIG9uU3VjY2VzcyBDYWxsYmFjayBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgTVRMIGZpbGUgaXMgbG9hZGVkXHJcbiAgICAgKiBAcGFyYW0gb25GYWlsdXJlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2xvYWRNVEwoXHJcbiAgICAgICAgdXJsOiBzdHJpbmcsXHJcbiAgICAgICAgcm9vdFVybDogc3RyaW5nLFxyXG4gICAgICAgIG9uU3VjY2VzczogKHJlc3BvbnNlOiBzdHJpbmcgfCBBcnJheUJ1ZmZlciwgcmVzcG9uc2VVcmw/OiBzdHJpbmcpID0+IGFueSxcclxuICAgICAgICBvbkZhaWx1cmU6IChwYXRoT2ZGaWxlOiBzdHJpbmcsIGV4Y2VwdGlvbj86IGFueSkgPT4gdm9pZFxyXG4gICAgKSB7XHJcbiAgICAgICAgLy9UaGUgY29tcGxldGUgcGF0aCB0byB0aGUgbXRsIGZpbGVcclxuICAgICAgICBjb25zdCBwYXRoT2ZGaWxlID0gcm9vdFVybCArIHVybDtcclxuXHJcbiAgICAgICAgLy8gTG9hZHMgdGhyb3VnaCB0aGUgYmFieWxvbiB0b29scyB0byBhbGxvdyBmaWxlSW5wdXQgc2VhcmNoLlxyXG4gICAgICAgIFRvb2xzLkxvYWRGaWxlKHBhdGhPZkZpbGUsIG9uU3VjY2VzcywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGZhbHNlLCAocmVxdWVzdD86IFdlYlJlcXVlc3QgfCB1bmRlZmluZWQsIGV4Y2VwdGlvbj86IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBvbkZhaWx1cmUocGF0aE9mRmlsZSwgZXhjZXB0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc3RhbnRpYXRlcyBhIE9CSiBmaWxlIGxvYWRlciBwbHVnaW4uXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3JlYXRlZCBwbHVnaW5cclxuICAgICAqL1xyXG4gICAgY3JlYXRlUGx1Z2luKCk6IElTY2VuZUxvYWRlclBsdWdpbkFzeW5jIHwgSVNjZW5lTG9hZGVyUGx1Z2luIHtcclxuICAgICAgICByZXR1cm4gbmV3IE9CSkZpbGVMb2FkZXIoT0JKRmlsZUxvYWRlci5fRGVmYXVsdExvYWRpbmdPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHRoZSBkYXRhIHN0cmluZyBjYW4gYmUgbG9hZGVkIGRpcmVjdGx5LlxyXG4gICAgICogQHJldHVybnMgaWYgdGhlIGRhdGEgY2FuIGJlIGxvYWRlZCBkaXJlY3RseVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2FuRGlyZWN0TG9hZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbXBvcnRzIG9uZSBvciBtb3JlIG1lc2hlcyBmcm9tIHRoZSBsb2FkZWQgT0JKIGRhdGEgYW5kIGFkZHMgdGhlbSB0byB0aGUgc2NlbmVcclxuICAgICAqIEBwYXJhbSBtZXNoZXNOYW1lcyBhIHN0cmluZyBvciBhcnJheSBvZiBzdHJpbmdzIG9mIHRoZSBtZXNoIG5hbWVzIHRoYXQgc2hvdWxkIGJlIGxvYWRlZCBmcm9tIHRoZSBmaWxlXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgdGhlIHNjZW5lIHRoZSBtZXNoZXMgc2hvdWxkIGJlIGFkZGVkIHRvXHJcbiAgICAgKiBAcGFyYW0gZGF0YSB0aGUgT0JKIGRhdGEgdG8gbG9hZFxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgcm9vdCB1cmwgdG8gbG9hZCBmcm9tXHJcbiAgICAgKiBAcmV0dXJucyBhIHByb21pc2UgY29udGFpbmluZyB0aGUgbG9hZGVkIG1lc2hlcywgcGFydGljbGVzLCBza2VsZXRvbnMgYW5kIGFuaW1hdGlvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGltcG9ydE1lc2hBc3luYyhtZXNoZXNOYW1lczogYW55LCBzY2VuZTogU2NlbmUsIGRhdGE6IGFueSwgcm9vdFVybDogc3RyaW5nKTogUHJvbWlzZTxJU2NlbmVMb2FkZXJBc3luY1Jlc3VsdD4ge1xyXG4gICAgICAgIC8vZ2V0IHRoZSBtZXNoZXMgZnJvbSBPQkogZmlsZVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJzZVNvbGlkKG1lc2hlc05hbWVzLCBzY2VuZSwgZGF0YSwgcm9vdFVybCkudGhlbigobWVzaGVzKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBtZXNoZXM6IG1lc2hlcyxcclxuICAgICAgICAgICAgICAgIHBhcnRpY2xlU3lzdGVtczogW10sXHJcbiAgICAgICAgICAgICAgICBza2VsZXRvbnM6IFtdLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uR3JvdXBzOiBbXSxcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybU5vZGVzOiBbXSxcclxuICAgICAgICAgICAgICAgIGdlb21ldHJpZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgbGlnaHRzOiBbXSxcclxuICAgICAgICAgICAgICAgIHNwcml0ZU1hbmFnZXJzOiBbXSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEltcG9ydHMgYWxsIG9iamVjdHMgZnJvbSB0aGUgbG9hZGVkIE9CSiBkYXRhIGFuZCBhZGRzIHRoZW0gdG8gdGhlIHNjZW5lXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgdGhlIHNjZW5lIHRoZSBvYmplY3RzIHNob3VsZCBiZSBhZGRlZCB0b1xyXG4gICAgICogQHBhcmFtIGRhdGEgdGhlIE9CSiBkYXRhIHRvIGxvYWRcclxuICAgICAqIEBwYXJhbSByb290VXJsIHJvb3QgdXJsIHRvIGxvYWQgZnJvbVxyXG4gICAgICogQHJldHVybnMgYSBwcm9taXNlIHdoaWNoIGNvbXBsZXRlcyB3aGVuIG9iamVjdHMgaGF2ZSBiZWVuIGxvYWRlZCB0byB0aGUgc2NlbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRBc3luYyhzY2VuZTogU2NlbmUsIGRhdGE6IHN0cmluZywgcm9vdFVybDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy9HZXQgdGhlIDNEIG1vZGVsXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1wb3J0TWVzaEFzeW5jKG51bGwsIHNjZW5lLCBkYXRhLCByb290VXJsKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIHZvaWRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgaW50byBhbiBhc3NldCBjb250YWluZXIuXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgVGhlIHNjZW5lIHRvIGxvYWQgaW50b1xyXG4gICAgICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gaW1wb3J0XHJcbiAgICAgKiBAcGFyYW0gcm9vdFVybCBUaGUgcm9vdCB1cmwgZm9yIHNjZW5lIGFuZCByZXNvdXJjZXNcclxuICAgICAqIEByZXR1cm5zIFRoZSBsb2FkZWQgYXNzZXQgY29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkQXNzZXRDb250YWluZXJBc3luYyhzY2VuZTogU2NlbmUsIGRhdGE6IHN0cmluZywgcm9vdFVybDogc3RyaW5nKTogUHJvbWlzZTxBc3NldENvbnRhaW5lcj4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IG5ldyBBc3NldENvbnRhaW5lcihzY2VuZSk7XHJcbiAgICAgICAgdGhpcy5fYXNzZXRDb250YWluZXIgPSBjb250YWluZXI7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmltcG9ydE1lc2hBc3luYyhudWxsLCBzY2VuZSwgZGF0YSwgcm9vdFVybClcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0Lm1lc2hlcy5mb3JFYWNoKChtZXNoKSA9PiBjb250YWluZXIubWVzaGVzLnB1c2gobWVzaCkpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0Lm1lc2hlcy5mb3JFYWNoKChtZXNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBtZXNoLm1hdGVyaWFsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNYXRlcmlhbHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5tYXRlcmlhbHMuaW5kZXhPZihtYXRlcmlhbCkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5tYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGV4dHVyZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHR1cmVzID0gbWF0ZXJpYWwuZ2V0QWN0aXZlVGV4dHVyZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmVzLmZvckVhY2goKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyLnRleHR1cmVzLmluZGV4T2YodCkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRleHR1cmVzLnB1c2godCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Fzc2V0Q29udGFpbmVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Fzc2V0Q29udGFpbmVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRocm93IGV4O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgdGhlIE9CSiBmaWxlIGFuZCBjcmVhdGUgYW4gQXJyYXkgb2YgbWVzaGVzLlxyXG4gICAgICogRWFjaCBtZXNoIGNvbnRhaW5zIGFsbCBpbmZvcm1hdGlvbiBnaXZlbiBieSB0aGUgT0JKIGFuZCB0aGUgTVRMIGZpbGUuXHJcbiAgICAgKiBpLmUuIHZlcnRpY2VzIHBvc2l0aW9ucyBhbmQgaW5kaWNlcywgb3B0aW9uYWwgbm9ybWFscyB2YWx1ZXMsIG9wdGlvbmFsIFVWIHZhbHVlcywgb3B0aW9uYWwgbWF0ZXJpYWxcclxuICAgICAqIEBwYXJhbSBtZXNoZXNOYW1lcyBkZWZpbmVzIGEgc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3Mgb2YgdGhlIG1lc2ggbmFtZXMgdGhhdCBzaG91bGQgYmUgbG9hZGVkIGZyb20gdGhlIGZpbGVcclxuICAgICAqIEBwYXJhbSBzY2VuZSBkZWZpbmVzIHRoZSBzY2VuZSB3aGVyZSBhcmUgZGlzcGxheWVkIHRoZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBkZWZpbmVzIHRoZSBjb250ZW50IG9mIHRoZSBvYmogZmlsZVxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgZGVmaW5lcyB0aGUgcGF0aCB0byB0aGUgZm9sZGVyXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgbGlzdCBvZiBsb2FkZWQgbWVzaGVzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3BhcnNlU29saWQobWVzaGVzTmFtZXM6IGFueSwgc2NlbmU6IFNjZW5lLCBkYXRhOiBzdHJpbmcsIHJvb3RVcmw6IHN0cmluZyk6IFByb21pc2U8QXJyYXk8QWJzdHJhY3RNZXNoPj4ge1xyXG4gICAgICAgIGxldCBmaWxlVG9Mb2FkOiBzdHJpbmcgPSBcIlwiOyAvL1RoZSBuYW1lIG9mIHRoZSBtdGxGaWxlIHRvIGxvYWRcclxuICAgICAgICBjb25zdCBtYXRlcmlhbHNGcm9tTVRMRmlsZTogTVRMRmlsZUxvYWRlciA9IG5ldyBNVExGaWxlTG9hZGVyKCk7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxUb1VzZTogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBjb25zdCBiYWJ5bG9uTWVzaGVzQXJyYXk6IEFycmF5PE1lc2g+ID0gW107IC8vVGhlIG1lc2ggZm9yIGJhYnlsb25cclxuXHJcbiAgICAgICAgLy8gU2FuaXRpemUgZGF0YVxyXG4gICAgICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoLyMuKiQvZ20sIFwiXCIpLnRyaW0oKTtcclxuXHJcbiAgICAgICAgLy8gTWFpbiBmdW5jdGlvblxyXG4gICAgICAgIGNvbnN0IHNvbGlkUGFyc2VyID0gbmV3IFNvbGlkUGFyc2VyKG1hdGVyaWFsVG9Vc2UsIGJhYnlsb25NZXNoZXNBcnJheSwgdGhpcy5fbG9hZGluZ09wdGlvbnMpO1xyXG5cclxuICAgICAgICBzb2xpZFBhcnNlci5wYXJzZShtZXNoZXNOYW1lcywgZGF0YSwgc2NlbmUsIHRoaXMuX2Fzc2V0Q29udGFpbmVyLCAoZmlsZU5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBmaWxlVG9Mb2FkID0gZmlsZU5hbWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGxvYWQgdGhlIG1hdGVyaWFsc1xyXG4gICAgICAgIGNvbnN0IG10bFByb21pc2VzOiBBcnJheTxQcm9taXNlPHZvaWQ+PiA9IFtdO1xyXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIGhhdmUgYSBmaWxlIHRvIGxvYWRcclxuICAgICAgICBpZiAoZmlsZVRvTG9hZCAhPT0gXCJcIiAmJiAhdGhpcy5fbG9hZGluZ09wdGlvbnMuc2tpcE1hdGVyaWFscykge1xyXG4gICAgICAgICAgICAvL0xvYWQgdGhlIGZpbGUgc3luY2hyb25vdXNseVxyXG4gICAgICAgICAgICBtdGxQcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRNVEwoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVUb0xvYWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChkYXRhTG9hZGVkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ3JlYXRlIG1hdGVyaWFscyB0aGFua3MgTVRMTG9hZGVyIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxzRnJvbU1UTEZpbGUucGFyc2VNVEwoc2NlbmUsIGRhdGFMb2FkZWQsIHJvb3RVcmwsIHRoaXMuX2Fzc2V0Q29udGFpbmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0xvb2sgYXQgZWFjaCBtYXRlcmlhbCBsb2FkZWQgaW4gdGhlIG10bCBmaWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBtYXRlcmlhbHNGcm9tTVRMRmlsZS5tYXRlcmlhbHMubGVuZ3RoOyBuKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UaHJlZSB2YXJpYWJsZXMgdG8gZ2V0IGFsbCBtZXNoZXMgd2l0aCB0aGUgc2FtZSBtYXRlcmlhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF9pbmRpY2VzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBfaW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RoZSBtYXRlcmlhbCBmcm9tIE1UTCBmaWxlIGlzIHVzZWQgaW4gdGhlIG1lc2hlcyBsb2FkZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9QdXNoIHRoZSBpbmRpY2UgaW4gYW4gYXJyYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9DaGVjayBpZiB0aGUgbWF0ZXJpYWwgaXMgbm90IHVzZWQgZm9yIGFub3RoZXIgbWVzaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKF9pbmRleCA9IG1hdGVyaWFsVG9Vc2UuaW5kZXhPZihtYXRlcmlhbHNGcm9tTVRMRmlsZS5tYXRlcmlhbHNbbl0ubmFtZSwgc3RhcnRJbmRleCkpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pbmRpY2VzLnB1c2goX2luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0SW5kZXggPSBfaW5kZXggKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSWYgdGhlIG1hdGVyaWFsIGlzIG5vdCB1c2VkIGRpc3Bvc2UgaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pbmRleCA9PT0gLTEgJiYgX2luZGljZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lmIHRoZSBtYXRlcmlhbCBpcyBub3QgbmVlZGVkLCByZW1vdmUgaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsc0Zyb21NVExGaWxlLm1hdGVyaWFsc1tuXS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IF9pbmRpY2VzLmxlbmd0aDsgbysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9BcHBseSB0aGUgbWF0ZXJpYWwgdG8gdGhlIE1lc2ggZm9yIGVhY2ggbWVzaCB3aXRoIHRoZSBtYXRlcmlhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lc2ggPSBiYWJ5bG9uTWVzaGVzQXJyYXlbX2luZGljZXNbb11dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbWF0ZXJpYWxzRnJvbU1UTEZpbGUubWF0ZXJpYWxzW25dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc2gubWF0ZXJpYWwgPSBtYXRlcmlhbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtZXNoLmdldFRvdGFsSW5kaWNlcygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vIGluZGljZXMsIHdlIG5lZWQgdG8gdHVybiBvbiBwb2ludCBjbG91ZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5wb2ludHNDbG91ZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUb29scy5XYXJuKGBFcnJvciBwcm9jZXNzaW5nIE1UTCBmaWxlOiAnJHtmaWxlVG9Mb2FkfSdgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMubWF0ZXJpYWxMb2FkaW5nRmFpbHNTaWxlbnRseSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHBhdGhPZkZpbGU6IHN0cmluZywgZXhjZXB0aW9uPzogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUb29scy5XYXJuKGBFcnJvciBkb3dubG9hZGluZyBNVEwgZmlsZTogJyR7ZmlsZVRvTG9hZH0nYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMubWF0ZXJpYWxMb2FkaW5nRmFpbHNTaWxlbnRseSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGV4Y2VwdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9SZXR1cm4gYW4gYXJyYXkgd2l0aCBhbGwgTWVzaFxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChtdGxQcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzTGluZSA9IChtZXNoOiBBYnN0cmFjdE1lc2gpID0+IEJvb2xlYW4obWVzaC5faW50ZXJuYWxNZXRhZGF0YT8uW1wiX2lzTGluZVwiXSA/PyBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIG1lc2gsIGRldGVybWluZSBpZiBpdCBpcyBhIGxpbmUgbWVzaCwgY2xvbmUgb3IgbW9kaWZ5IHRoZSBtYXRlcmlhbCB0byBsaW5lIHJlbmRlcmluZy5cclxuICAgICAgICAgICAgYmFieWxvbk1lc2hlc0FycmF5LmZvckVhY2goKG1lc2gpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0xpbmUobWVzaCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWF0ID0gbWVzaC5tYXRlcmlhbCA/PyBuZXcgU3RhbmRhcmRNYXRlcmlhbChtZXNoLm5hbWUgKyBcIl9saW5lXCIsIHNjZW5lKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBhbm90aGVyIG1lc2ggaXMgdXNpbmcgdGhpcyBtYXRlcmlhbCBhbmQgaXQgaXMgbm90IGEgbGluZSB0aGVuIHdlIG5lZWQgdG8gY2xvbmUgaXQuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmVlZENsb25lID0gbWF0LmdldEJpbmRlZE1lc2hlcygpLmZpbHRlcigoZSkgPT4gIWlzTGluZShlKSkubGVuZ3RoID4gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmVlZENsb25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdCA9IG1hdC5jbG9uZShtYXQubmFtZSArIFwiX2xpbmVcIikgPz8gbWF0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBtYXQud2lyZWZyYW1lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBtZXNoLm1hdGVyaWFsID0gbWF0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNoLl9pbnRlcm5hbE1ldGFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc2guX2ludGVybmFsTWV0YWRhdGFbXCJfaXNMaW5lXCJdID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYmFieWxvbk1lc2hlc0FycmF5O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL0FkZCB0aGlzIGxvYWRlciBpbnRvIHRoZSByZWdpc3RlciBwbHVnaW5cclxuUmVnaXN0ZXJTY2VuZUxvYWRlclBsdWdpbihuZXcgT0JKRmlsZUxvYWRlcigpKTtcclxuIiwiaW1wb3J0IHR5cGUgeyBBc3NldENvbnRhaW5lciB9IGZyb20gXCJjb3JlL2Fzc2V0Q29udGFpbmVyXCI7XHJcbmltcG9ydCB7IFZlcnRleEJ1ZmZlciB9IGZyb20gXCJjb3JlL0J1ZmZlcnMvYnVmZmVyXCI7XHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgU3RhbmRhcmRNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9zdGFuZGFyZE1hdGVyaWFsXCI7XHJcbmltcG9ydCB7IENvbG9yMywgQ29sb3I0IH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5jb2xvclwiO1xyXG5pbXBvcnQgeyBWZWN0b3IyLCBWZWN0b3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC52ZWN0b3JcIjtcclxuaW1wb3J0IHR5cGUgeyBBYnN0cmFjdE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvYWJzdHJhY3RNZXNoXCI7XHJcbmltcG9ydCB7IEdlb21ldHJ5IH0gZnJvbSBcImNvcmUvTWVzaGVzL2dlb21ldHJ5XCI7XHJcbmltcG9ydCB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5pbXBvcnQgeyBWZXJ0ZXhEYXRhIH0gZnJvbSBcImNvcmUvTWVzaGVzL21lc2gudmVydGV4RGF0YVwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB0eXBlIHsgT0JKTG9hZGluZ09wdGlvbnMgfSBmcm9tIFwiLi9vYmpMb2FkaW5nT3B0aW9uc1wiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZS9NaXNjL2xvZ2dlclwiO1xyXG5cclxudHlwZSBNZXNoT2JqZWN0ID0ge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgaW5kaWNlczogTnVsbGFibGU8QXJyYXk8bnVtYmVyPj47XHJcbiAgICBwb3NpdGlvbnM6IE51bGxhYmxlPEFycmF5PG51bWJlcj4+O1xyXG4gICAgbm9ybWFsczogTnVsbGFibGU8QXJyYXk8bnVtYmVyPj47XHJcbiAgICBjb2xvcnM6IE51bGxhYmxlPEFycmF5PG51bWJlcj4+O1xyXG4gICAgdXZzOiBOdWxsYWJsZTxBcnJheTxudW1iZXI+PjtcclxuICAgIG1hdGVyaWFsTmFtZTogc3RyaW5nO1xyXG4gICAgZGlyZWN0TWF0ZXJpYWw/OiBOdWxsYWJsZTxNYXRlcmlhbD47XHJcbiAgICBpc09iamVjdDogYm9vbGVhbjsgLy8gSWYgdGhlIGVudGl0eSBpcyBkZWZpbmVkIGFzIGFuIG9iamVjdCAoXCJvXCIpLCBvciBncm91cCAoXCJnXCIpXHJcbiAgICBfYmFieWxvbk1lc2g/OiBBYnN0cmFjdE1lc2g7IC8vIFRoZSBjb3JyZXNwb25kaW5nIEJhYnlsb24gbWVzaFxyXG4gICAgaGFzTGluZXM/OiBib29sZWFuOyAvLyBJZiB0aGUgbWVzaCBoYXMgbGluZXNcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyB1c2VkIHRvIGxvYWQgbWVzaCBkYXRhIGZyb20gT0JKIGNvbnRlbnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTb2xpZFBhcnNlciB7XHJcbiAgICAvLyBEZXNjcmlwdG9yXHJcbiAgICAvKiogT2JqZWN0IGRlc2NyaXB0b3IgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgT2JqZWN0RGVzY3JpcHRvciA9IC9eby87XHJcbiAgICAvKiogR3JvdXAgZGVzY3JpcHRvciAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBHcm91cERlc2NyaXB0b3IgPSAvXmcvO1xyXG4gICAgLyoqIE1hdGVyaWFsIGxpYiBkZXNjcmlwdG9yICovXHJcbiAgICBwdWJsaWMgc3RhdGljIE10bExpYkdyb3VwRGVzY3JpcHRvciA9IC9ebXRsbGliIC87XHJcbiAgICAvKiogVXNlIGEgbWF0ZXJpYWwgZGVzY3JpcHRvciAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBVc2VNdGxEZXNjcmlwdG9yID0gL151c2VtdGwgLztcclxuICAgIC8qKiBTbW9vdGggZGVzY3JpcHRvciAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTbW9vdGhEZXNjcmlwdG9yID0gL15zIC87XHJcblxyXG4gICAgLy8gUGF0dGVybnNcclxuICAgIC8qKiBQYXR0ZXJuIHVzZWQgdG8gZGV0ZWN0IGEgdmVydGV4ICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFZlcnRleFBhdHRlcm4gPSAvXnYoXFxzK1tcXGR8LnwrfFxcLXxlfEVdKyl7Myw3fS87XHJcbiAgICAvKiogUGF0dGVybiB1c2VkIHRvIGRldGVjdCBhIG5vcm1hbCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBOb3JtYWxQYXR0ZXJuID0gL152bihcXHMrW1xcZHwufCt8XFwtfGV8RV0rKSggK1tcXGR8LnwrfFxcLXxlfEVdKykoICtbXFxkfC58K3xcXC18ZXxFXSspLztcclxuICAgIC8qKiBQYXR0ZXJuIHVzZWQgdG8gZGV0ZWN0IGEgVVYgc2V0ICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFVWUGF0dGVybiA9IC9ednQoXFxzK1tcXGR8LnwrfFxcLXxlfEVdKykoICtbXFxkfC58K3xcXC18ZXxFXSspLztcclxuICAgIC8qKiBQYXR0ZXJuIHVzZWQgdG8gZGV0ZWN0IGEgZmlyc3Qga2luZCBvZiBmYWNlIChmIHZlcnRleCB2ZXJ0ZXggdmVydGV4KSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBGYWNlUGF0dGVybjEgPSAvXmZcXHMrKChbXFxkXXsxLH1bXFxzXT8pezMsfSkrLztcclxuICAgIC8qKiBQYXR0ZXJuIHVzZWQgdG8gZGV0ZWN0IGEgc2Vjb25kIGtpbmQgb2YgZmFjZSAoZiB2ZXJ0ZXgvdXZzIHZlcnRleC91dnMgdmVydGV4L3V2cykgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRmFjZVBhdHRlcm4yID0gL15mXFxzKygoKFtcXGRdezEsfVxcL1tcXGRdezEsfVtcXHNdPyl7Myx9KSspLztcclxuICAgIC8qKiBQYXR0ZXJuIHVzZWQgdG8gZGV0ZWN0IGEgdGhpcmQga2luZCBvZiBmYWNlIChmIHZlcnRleC91dnMvbm9ybWFsIHZlcnRleC91dnMvbm9ybWFsIHZlcnRleC91dnMvbm9ybWFsKSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBGYWNlUGF0dGVybjMgPSAvXmZcXHMrKCgoW1xcZF17MSx9XFwvW1xcZF17MSx9XFwvW1xcZF17MSx9W1xcc10/KXszLH0pKykvO1xyXG4gICAgLyoqIFBhdHRlcm4gdXNlZCB0byBkZXRlY3QgYSBmb3VydGgga2luZCBvZiBmYWNlIChmIHZlcnRleC8vbm9ybWFsIHZlcnRleC8vbm9ybWFsIHZlcnRleC8vbm9ybWFsKSovXHJcbiAgICBwdWJsaWMgc3RhdGljIEZhY2VQYXR0ZXJuNCA9IC9eZlxccysoKChbXFxkXXsxLH1cXC9cXC9bXFxkXXsxLH1bXFxzXT8pezMsfSkrKS87XHJcbiAgICAvKiogUGF0dGVybiB1c2VkIHRvIGRldGVjdCBhIGZpZnRoIGtpbmQgb2YgZmFjZSAoZiAtdmVydGV4Ly11dnMvLW5vcm1hbCAtdmVydGV4Ly11dnMvLW5vcm1hbCAtdmVydGV4Ly11dnMvLW5vcm1hbCkgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRmFjZVBhdHRlcm41ID0gL15mXFxzKygoKC1bXFxkXXsxLH1cXC8tW1xcZF17MSx9XFwvLVtcXGRdezEsfVtcXHNdPyl7Myx9KSspLztcclxuICAgIC8qKiBQYXR0ZXJuIHVzZWQgdG8gZGV0ZWN0IGEgbGluZShsIHZlcnRleCB2ZXJ0ZXgpICovXHJcbiAgICBwdWJsaWMgc3RhdGljIExpbmVQYXR0ZXJuMSA9IC9ebFxccysoKFtcXGRdezEsfVtcXHNdPyl7Mix9KSsvO1xyXG4gICAgLyoqIFBhdHRlcm4gdXNlZCB0byBkZXRlY3QgYSBzZWNvbmQga2luZCBvZiBsaW5lIChsIHZlcnRleC91dnMgdmVydGV4L3V2cykgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgTGluZVBhdHRlcm4yID0gL15sXFxzKygoKFtcXGRdezEsfVxcL1tcXGRdezEsfVtcXHNdPyl7Mix9KSspLztcclxuICAgIC8qKiBQYXR0ZXJuIHVzZWQgdG8gZGV0ZWN0IGEgdGhpcmQga2luZCBvZiBsaW5lIChsIHZlcnRleC91dnMvbm9ybWFsIHZlcnRleC91dnMvbm9ybWFsKSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBMaW5lUGF0dGVybjMgPSAvXmxcXHMrKCgoW1xcZF17MSx9XFwvW1xcZF17MSx9XFwvW1xcZF17MSx9W1xcc10/KXsyLH0pKykvO1xyXG5cclxuICAgIHByaXZhdGUgX2xvYWRpbmdPcHRpb25zOiBPQkpMb2FkaW5nT3B0aW9ucztcclxuICAgIHByaXZhdGUgX3Bvc2l0aW9uczogQXJyYXk8VmVjdG9yMz4gPSBbXTsgLy92YWx1ZXMgZm9yIHRoZSBwb3NpdGlvbnMgb2YgdmVydGljZXNcclxuICAgIHByaXZhdGUgX25vcm1hbHM6IEFycmF5PFZlY3RvcjM+ID0gW107IC8vVmFsdWVzIGZvciB0aGUgbm9ybWFsc1xyXG4gICAgcHJpdmF0ZSBfdXZzOiBBcnJheTxWZWN0b3IyPiA9IFtdOyAvL1ZhbHVlcyBmb3IgdGhlIHRleHR1cmVzXHJcbiAgICBwcml2YXRlIF9jb2xvcnM6IEFycmF5PENvbG9yND4gPSBbXTtcclxuICAgIHByaXZhdGUgX2V4dENvbG9yczogQXJyYXk8Q29sb3I0PiA9IFtdOyAvL0V4dGVuc2lvbiBjb2xvclxyXG4gICAgcHJpdmF0ZSBfbWVzaGVzRnJvbU9iajogQXJyYXk8TWVzaE9iamVjdD4gPSBbXTsgLy9bbWVzaF0gQ29udGFpbnMgYWxsIHRoZSBvYmogbWVzaGVzXHJcbiAgICBwcml2YXRlIF9oYW5kbGVkTWVzaDogTWVzaE9iamVjdDsgLy9UaGUgY3VycmVudCBtZXNoIG9mIG1lc2hlcyBhcnJheVxyXG4gICAgcHJpdmF0ZSBfaW5kaWNlc0ZvckJhYnlsb246IEFycmF5PG51bWJlcj4gPSBbXTsgLy9UaGUgbGlzdCBvZiBpbmRpY2VzIGZvciBWZXJ0ZXhEYXRhXHJcbiAgICBwcml2YXRlIF93cmFwcGVkUG9zaXRpb25Gb3JCYWJ5bG9uOiBBcnJheTxWZWN0b3IzPiA9IFtdOyAvL1RoZSBsaXN0IG9mIHBvc2l0aW9uIGluIHZlY3RvcnNcclxuICAgIHByaXZhdGUgX3dyYXBwZWRVdnNGb3JCYWJ5bG9uOiBBcnJheTxWZWN0b3IyPiA9IFtdOyAvL0FycmF5IHdpdGggYWxsIHZhbHVlIG9mIHV2cyB0byBtYXRjaCB3aXRoIHRoZSBpbmRpY2VzXHJcbiAgICBwcml2YXRlIF93cmFwcGVkQ29sb3JzRm9yQmFieWxvbjogQXJyYXk8Q29sb3I0PiA9IFtdOyAvLyBBcnJheSB3aXRoIGFsbCBjb2xvciB2YWx1ZXMgdG8gbWF0Y2ggd2l0aCB0aGUgaW5kaWNlc1xyXG4gICAgcHJpdmF0ZSBfd3JhcHBlZE5vcm1hbHNGb3JCYWJ5bG9uOiBBcnJheTxWZWN0b3IzPiA9IFtdOyAvL0FycmF5IHdpdGggYWxsIHZhbHVlIG9mIG5vcm1hbHMgdG8gbWF0Y2ggd2l0aCB0aGUgaW5kaWNlc1xyXG4gICAgcHJpdmF0ZSBfdHVwbGVQb3NOb3JtOiBBcnJheTx7IG5vcm1hbHM6IEFycmF5PG51bWJlcj47IGlkeDogQXJyYXk8bnVtYmVyPjsgdXY6IEFycmF5PG51bWJlcj4gfT4gPSBbXTsgLy9DcmVhdGUgYSB0dXBsZSB3aXRoIGluZGljZSBvZiBQb3NpdGlvbiwgTm9ybWFsLCBVViAgW3Bvcywgbm9ybSwgdXZzXVxyXG4gICAgcHJpdmF0ZSBfY3VyUG9zaXRpb25JbkluZGljZXMgPSAwO1xyXG4gICAgcHJpdmF0ZSBfaGFzTWVzaGVzOiBCb29sZWFuID0gZmFsc2U7IC8vTWVzaGVzIGFyZSBkZWZpbmVkIGluIHRoZSBmaWxlXHJcbiAgICBwcml2YXRlIF91bndyYXBwZWRQb3NpdGlvbnNGb3JCYWJ5bG9uOiBBcnJheTxudW1iZXI+ID0gW107IC8vVmFsdWUgb2YgcG9zaXRpb25Gb3JCYWJ5bG9uIHcvbyBWZWN0b3IzKCkgW3gseSx6XVxyXG4gICAgcHJpdmF0ZSBfdW53cmFwcGVkQ29sb3JzRm9yQmFieWxvbjogQXJyYXk8bnVtYmVyPiA9IFtdOyAvLyBWYWx1ZSBvZiBjb2xvckZvckJhYnlsb24gdy9vIENvbG9yNCgpIFtyLGcsYixhXVxyXG4gICAgcHJpdmF0ZSBfdW53cmFwcGVkTm9ybWFsc0ZvckJhYnlsb246IEFycmF5PG51bWJlcj4gPSBbXTsgLy9WYWx1ZSBvZiBub3JtYWxzRm9yQmFieWxvbiB3L28gVmVjdG9yMygpICBbeCx5LHpdXHJcbiAgICBwcml2YXRlIF91bndyYXBwZWRVVkZvckJhYnlsb246IEFycmF5PG51bWJlcj4gPSBbXTsgLy9WYWx1ZSBvZiB1dnNGb3JCYWJ5bG9uIHcvbyBWZWN0b3IzKCkgICAgICBbeCx5LHpdXHJcbiAgICBwcml2YXRlIF90cmlhbmdsZXM6IEFycmF5PHN0cmluZz4gPSBbXTsgLy9JbmRpY2VzIGZyb20gbmV3IHRyaWFuZ2xlcyBjb21pbmcgZnJvbSBwb2x5Z29uc1xyXG4gICAgcHJpdmF0ZSBfbWF0ZXJpYWxOYW1lRnJvbU9iajogc3RyaW5nID0gXCJcIjsgLy9UaGUgbmFtZSBvZiB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgcHJpdmF0ZSBfb2JqTWVzaE5hbWU6IHN0cmluZyA9IFwiXCI7IC8vVGhlIG5hbWUgb2YgdGhlIGN1cnJlbnQgb2JqIG1lc2hcclxuICAgIHByaXZhdGUgX2luY3JlbWVudDogbnVtYmVyID0gMTsgLy9JZCBmb3IgbWVzaGVzIGNyZWF0ZWQgYnkgdGhlIG11bHRpbWF0ZXJpYWxcclxuICAgIHByaXZhdGUgX2lzRmlyc3RNYXRlcmlhbDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwcml2YXRlIF9ncmF5Q29sb3IgPSBuZXcgQ29sb3I0KDAuNSwgMC41LCAwLjUsIDEpO1xyXG4gICAgcHJpdmF0ZSBfbWF0ZXJpYWxUb1VzZTogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIF9iYWJ5bG9uTWVzaGVzQXJyYXk6IEFycmF5PE1lc2g+O1xyXG4gICAgcHJpdmF0ZSBfcHVzaFRyaWFuZ2xlOiAoZmFjZXM6IEFycmF5PHN0cmluZz4sIGZhY2VJbmRleDogbnVtYmVyKSA9PiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBfaGFuZGVkbmVzc1NpZ246IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2hhc0xpbmVEYXRhOiBib29sZWFuID0gZmFsc2U7IC8vSWYgdGhpcyBtZXNoIGhhcyBsaW5lIHNlZ21lbnQobCkgZGF0YVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBTb2xpZFBhcnNlclxyXG4gICAgICogQHBhcmFtIG1hdGVyaWFsVG9Vc2UgZGVmaW5lcyB0aGUgYXJyYXkgdG8gZmlsbCB3aXRoIHRoZSBsaXN0IG9mIG1hdGVyaWFscyB0byB1c2UgKGl0IHdpbGwgYmUgZmlsbGVkIGJ5IHRoZSBwYXJzZSBmdW5jdGlvbilcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uTWVzaGVzQXJyYXkgZGVmaW5lcyB0aGUgYXJyYXkgdG8gZmlsbCB3aXRoIHRoZSBsaXN0IG9mIGxvYWRlZCBtZXNoZXMgKGl0IHdpbGwgYmUgZmlsbGVkIGJ5IHRoZSBwYXJzZSBmdW5jdGlvbilcclxuICAgICAqIEBwYXJhbSBsb2FkaW5nT3B0aW9ucyBkZWZpbmVzIHRoZSBsb2FkaW5nIG9wdGlvbnMgdG8gdXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihtYXRlcmlhbFRvVXNlOiBzdHJpbmdbXSwgYmFieWxvbk1lc2hlc0FycmF5OiBBcnJheTxNZXNoPiwgbG9hZGluZ09wdGlvbnM6IE9CSkxvYWRpbmdPcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxUb1VzZSA9IG1hdGVyaWFsVG9Vc2U7XHJcbiAgICAgICAgdGhpcy5fYmFieWxvbk1lc2hlc0FycmF5ID0gYmFieWxvbk1lc2hlc0FycmF5O1xyXG4gICAgICAgIHRoaXMuX2xvYWRpbmdPcHRpb25zID0gbG9hZGluZ09wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWFyY2ggZm9yIG9iaiBpbiB0aGUgZ2l2ZW4gYXJyYXkuXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB0byBjaGVjayBpZiBhIGNvdXBsZSBvZiBkYXRhIGFscmVhZHkgZXhpc3RzIGluIGFuIGFycmF5LlxyXG4gICAgICpcclxuICAgICAqIElmIGZvdW5kLCByZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZm91bmRlZCB0dXBsZSBpbmRleC4gUmV0dXJucyAtMSBpZiBub3QgZm91bmRcclxuICAgICAqIEBwYXJhbSBhcnIgQXJyYXk8eyBub3JtYWxzOiBBcnJheTxudW1iZXI+LCBpZHg6IEFycmF5PG51bWJlcj4gfT5cclxuICAgICAqIEBwYXJhbSBvYmogQXJyYXk8bnVtYmVyPlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2lzSW5BcnJheShhcnI6IEFycmF5PHsgbm9ybWFsczogQXJyYXk8bnVtYmVyPjsgaWR4OiBBcnJheTxudW1iZXI+IH0+LCBvYmo6IEFycmF5PG51bWJlcj4pIHtcclxuICAgICAgICBpZiAoIWFycltvYmpbMF1dKSB7XHJcbiAgICAgICAgICAgIGFycltvYmpbMF1dID0geyBub3JtYWxzOiBbXSwgaWR4OiBbXSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBpZHggPSBhcnJbb2JqWzBdXS5ub3JtYWxzLmluZGV4T2Yob2JqWzFdKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlkeCA9PT0gLTEgPyAtMSA6IGFycltvYmpbMF1dLmlkeFtpZHhdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2lzSW5BcnJheVVWKGFycjogQXJyYXk8eyBub3JtYWxzOiBBcnJheTxudW1iZXI+OyBpZHg6IEFycmF5PG51bWJlcj47IHV2OiBBcnJheTxudW1iZXI+IH0+LCBvYmo6IEFycmF5PG51bWJlcj4pIHtcclxuICAgICAgICBpZiAoIWFycltvYmpbMF1dKSB7XHJcbiAgICAgICAgICAgIGFycltvYmpbMF1dID0geyBub3JtYWxzOiBbXSwgaWR4OiBbXSwgdXY6IFtdIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGlkeCA9IGFycltvYmpbMF1dLm5vcm1hbHMuaW5kZXhPZihvYmpbMV0pO1xyXG5cclxuICAgICAgICBpZiAoaWR4ICE9IDEgJiYgb2JqWzJdID09PSBhcnJbb2JqWzBdXS51dltpZHhdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJbb2JqWzBdXS5pZHhbaWR4XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzZXQgdGhlIGRhdGEgZm9yIGVhY2ggdHJpYW5nbGUuXHJcbiAgICAgKiBEYXRhIGFyZSBwb3NpdGlvbiwgbm9ybWFscyBhbmQgdXZzXHJcbiAgICAgKiBJZiBhIHR1cGxlIG9mIChwb3NpdGlvbiwgbm9ybWFsKSBpcyBub3Qgc2V0LCBhZGQgdGhlIGRhdGEgaW50byB0aGUgY29ycmVzcG9uZGluZyBhcnJheVxyXG4gICAgICogSWYgdGhlIHR1cGxlIGFscmVhZHkgZXhpc3QsIGFkZCBvbmx5IHRoZWlyIGluZGljZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBpbmRpY2VQb3NpdGlvbkZyb21PYmogSW50ZWdlciBUaGUgaW5kZXggaW4gcG9zaXRpb25zIGFycmF5XHJcbiAgICAgKiBAcGFyYW0gaW5kaWNlVXZzRnJvbU9iaiBJbnRlZ2VyIFRoZSBpbmRleCBpbiB1dnMgYXJyYXlcclxuICAgICAqIEBwYXJhbSBpbmRpY2VOb3JtYWxGcm9tT2JqIEludGVnZXIgVGhlIGluZGV4IGluIG5vcm1hbHMgYXJyYXlcclxuICAgICAqIEBwYXJhbSBwb3NpdGlvblZlY3RvckZyb21PQkogVmVjdG9yMyBUaGUgdmFsdWUgb2YgcG9zaXRpb24gYXQgaW5kZXggb2JqSW5kaWNlXHJcbiAgICAgKiBAcGFyYW0gdGV4dHVyZVZlY3RvckZyb21PQkogVmVjdG9yMyBUaGUgdmFsdWUgb2YgdXZzXHJcbiAgICAgKiBAcGFyYW0gbm9ybWFsc1ZlY3RvckZyb21PQkogVmVjdG9yMyBUaGUgdmFsdWUgb2Ygbm9ybWFscyBhdCBpbmRleCBvYmpOb3JtYWxlXHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25Db2xvcnNGcm9tT0JKXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3NldERhdGEoXHJcbiAgICAgICAgaW5kaWNlUG9zaXRpb25Gcm9tT2JqOiBudW1iZXIsXHJcbiAgICAgICAgaW5kaWNlVXZzRnJvbU9iajogbnVtYmVyLFxyXG4gICAgICAgIGluZGljZU5vcm1hbEZyb21PYmo6IG51bWJlcixcclxuICAgICAgICBwb3NpdGlvblZlY3RvckZyb21PQko6IFZlY3RvcjMsXHJcbiAgICAgICAgdGV4dHVyZVZlY3RvckZyb21PQko6IFZlY3RvcjIsXHJcbiAgICAgICAgbm9ybWFsc1ZlY3RvckZyb21PQko6IFZlY3RvcjMsXHJcbiAgICAgICAgcG9zaXRpb25Db2xvcnNGcm9tT0JKPzogQ29sb3I0XHJcbiAgICApIHtcclxuICAgICAgICAvL0NoZWNrIGlmIHRoaXMgdHVwbGUgYWxyZWFkeSBleGlzdHMgaW4gdGhlIGxpc3Qgb2YgdHVwbGVzXHJcbiAgICAgICAgbGV0IF9pbmRleDogbnVtYmVyO1xyXG4gICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy5vcHRpbWl6ZVdpdGhVVikge1xyXG4gICAgICAgICAgICBfaW5kZXggPSB0aGlzLl9pc0luQXJyYXlVVih0aGlzLl90dXBsZVBvc05vcm0sIFtpbmRpY2VQb3NpdGlvbkZyb21PYmosIGluZGljZU5vcm1hbEZyb21PYmosIGluZGljZVV2c0Zyb21PYmpdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBfaW5kZXggPSB0aGlzLl9pc0luQXJyYXkodGhpcy5fdHVwbGVQb3NOb3JtLCBbaW5kaWNlUG9zaXRpb25Gcm9tT2JqLCBpbmRpY2VOb3JtYWxGcm9tT2JqXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0lmIGl0IG5vdCBleGlzdHNcclxuICAgICAgICBpZiAoX2luZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICAvL0FkZCBhbiBuZXcgaW5kaWNlLlxyXG4gICAgICAgICAgICAvL1RoZSBhcnJheSBvZiBpbmRpY2VzIGlzIG9ubHkgYW4gYXJyYXkgd2l0aCBoaXMgbGVuZ3RoIGVxdWFsIHRvIHRoZSBudW1iZXIgb2YgdHJpYW5nbGVzIC0gMS5cclxuICAgICAgICAgICAgLy9XZSBhZGQgdmVydGljZXMgZGF0YSBpbiB0aGlzIG9yZGVyXHJcbiAgICAgICAgICAgIHRoaXMuX2luZGljZXNGb3JCYWJ5bG9uLnB1c2godGhpcy5fd3JhcHBlZFBvc2l0aW9uRm9yQmFieWxvbi5sZW5ndGgpO1xyXG4gICAgICAgICAgICAvL1B1c2ggdGhlIHBvc2l0aW9uIG9mIHZlcnRpY2UgZm9yIEJhYnlsb25cclxuICAgICAgICAgICAgLy9FYWNoIGVsZW1lbnQgaXMgYSBWZWN0b3IzKHgseSx6KVxyXG4gICAgICAgICAgICB0aGlzLl93cmFwcGVkUG9zaXRpb25Gb3JCYWJ5bG9uLnB1c2gocG9zaXRpb25WZWN0b3JGcm9tT0JKKTtcclxuICAgICAgICAgICAgLy9QdXNoIHRoZSB1dnMgZm9yIEJhYnlsb25cclxuICAgICAgICAgICAgLy9FYWNoIGVsZW1lbnQgaXMgYSBWZWN0b3IyKHUsdilcclxuICAgICAgICAgICAgLy9JZiB0aGUgVVZzIGFyZSBtaXNzaW5nLCBzZXQgKHUsdik9KDAsMClcclxuICAgICAgICAgICAgdGV4dHVyZVZlY3RvckZyb21PQkogPSB0ZXh0dXJlVmVjdG9yRnJvbU9CSiA/PyBuZXcgVmVjdG9yMigwLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5fd3JhcHBlZFV2c0ZvckJhYnlsb24ucHVzaCh0ZXh0dXJlVmVjdG9yRnJvbU9CSik7XHJcbiAgICAgICAgICAgIC8vUHVzaCB0aGUgbm9ybWFscyBmb3IgQmFieWxvblxyXG4gICAgICAgICAgICAvL0VhY2ggZWxlbWVudCBpcyBhIFZlY3RvcjMoeCx5LHopXHJcbiAgICAgICAgICAgIHRoaXMuX3dyYXBwZWROb3JtYWxzRm9yQmFieWxvbi5wdXNoKG5vcm1hbHNWZWN0b3JGcm9tT0JKKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwb3NpdGlvbkNvbG9yc0Zyb21PQkogIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgLy9QdXNoIHRoZSBjb2xvcnMgZm9yIEJhYnlsb25cclxuICAgICAgICAgICAgICAgIC8vRWFjaCBlbGVtZW50IGlzIGEgQkFCWUxPTi5Db2xvcjQocixnLGIsYSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uLnB1c2gocG9zaXRpb25Db2xvcnNGcm9tT0JKKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9BZGQgdGhlIHR1cGxlIGluIHRoZSBjb21wYXJpc29uIGxpc3RcclxuICAgICAgICAgICAgdGhpcy5fdHVwbGVQb3NOb3JtW2luZGljZVBvc2l0aW9uRnJvbU9ial0ubm9ybWFscy5wdXNoKGluZGljZU5vcm1hbEZyb21PYmopO1xyXG4gICAgICAgICAgICB0aGlzLl90dXBsZVBvc05vcm1baW5kaWNlUG9zaXRpb25Gcm9tT2JqXS5pZHgucHVzaCh0aGlzLl9jdXJQb3NpdGlvbkluSW5kaWNlcysrKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLm9wdGltaXplV2l0aFVWKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90dXBsZVBvc05vcm1baW5kaWNlUG9zaXRpb25Gcm9tT2JqXS51di5wdXNoKGluZGljZVV2c0Zyb21PYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9UaGUgdHVwbGUgYWxyZWFkeSBleGlzdHNcclxuICAgICAgICAgICAgLy9BZGQgdGhlIGluZGV4IG9mIHRoZSBhbHJlYWR5IGV4aXN0aW5nIHR1cGxlXHJcbiAgICAgICAgICAgIC8vQXQgdGhpcyBpbmRleCB3ZSBjYW4gZ2V0IHRoZSB2YWx1ZSBvZiBwb3NpdGlvbiwgbm9ybWFsLCBjb2xvciBhbmQgdXZzIG9mIHZlcnRleFxyXG4gICAgICAgICAgICB0aGlzLl9pbmRpY2VzRm9yQmFieWxvbi5wdXNoKF9pbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNmb3JtIFZlY3RvcigpIGFuZCBCQUJZTE9OLkNvbG9yKCkgb2JqZWN0cyBpbnRvIG51bWJlcnMgaW4gYW4gYXJyYXlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfdW53cmFwRGF0YSgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvL0V2ZXJ5IGFycmF5IGhhcyB0aGUgc2FtZSBsZW5ndGhcclxuICAgICAgICAgICAgZm9yIChsZXQgbCA9IDA7IGwgPCB0aGlzLl93cmFwcGVkUG9zaXRpb25Gb3JCYWJ5bG9uLmxlbmd0aDsgbCsrKSB7XHJcbiAgICAgICAgICAgICAgICAvL1B1c2ggdGhlIHgsIHksIHogdmFsdWVzIG9mIGVhY2ggZWxlbWVudCBpbiB0aGUgdW53cmFwcGVkIGFycmF5XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91bndyYXBwZWRQb3NpdGlvbnNGb3JCYWJ5bG9uLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd3JhcHBlZFBvc2l0aW9uRm9yQmFieWxvbltsXS54ICogdGhpcy5faGFuZGVkbmVzc1NpZ24sXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd3JhcHBlZFBvc2l0aW9uRm9yQmFieWxvbltsXS55LFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dyYXBwZWRQb3NpdGlvbkZvckJhYnlsb25bbF0uelxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Vud3JhcHBlZE5vcm1hbHNGb3JCYWJ5bG9uLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd3JhcHBlZE5vcm1hbHNGb3JCYWJ5bG9uW2xdLnggKiB0aGlzLl9oYW5kZWRuZXNzU2lnbixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93cmFwcGVkTm9ybWFsc0ZvckJhYnlsb25bbF0ueSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93cmFwcGVkTm9ybWFsc0ZvckJhYnlsb25bbF0uelxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl91bndyYXBwZWRVVkZvckJhYnlsb24ucHVzaCh0aGlzLl93cmFwcGVkVXZzRm9yQmFieWxvbltsXS54LCB0aGlzLl93cmFwcGVkVXZzRm9yQmFieWxvbltsXS55KTsgLy96IGlzIGFuIG9wdGlvbmFsIHZhbHVlIG5vdCBzdXBwb3J0ZWQgYnkgQkFCWUxPTlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLmltcG9ydFZlcnRleENvbG9ycykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vUHVzaCB0aGUgciwgZywgYiwgYSB2YWx1ZXMgb2YgZWFjaCBlbGVtZW50IGluIHRoZSB1bndyYXBwZWQgYXJyYXlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91bndyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uW2xdLnIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uW2xdLmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uW2xdLmIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uW2xdLmFcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFJlc2V0IGFycmF5cyBmb3IgdGhlIG5leHQgbmV3IG1lc2hlc1xyXG4gICAgICAgICAgICB0aGlzLl93cmFwcGVkUG9zaXRpb25Gb3JCYWJ5bG9uLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX3dyYXBwZWROb3JtYWxzRm9yQmFieWxvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl93cmFwcGVkVXZzRm9yQmFieWxvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl93cmFwcGVkQ29sb3JzRm9yQmFieWxvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl90dXBsZVBvc05vcm0ubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fY3VyUG9zaXRpb25JbkluZGljZXMgPSAwO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIHVud3JhcCBkYXRhIHdoaWxlIHBhcnNpbmcgT0JKIGRhdGEuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSB0cmlhbmdsZXMgZnJvbSBwb2x5Z29uc1xyXG4gICAgICogSXQgaXMgaW1wb3J0YW50IHRvIG5vdGljZSB0aGF0IGEgdHJpYW5nbGUgaXMgYSBwb2x5Z29uXHJcbiAgICAgKiBXZSBnZXQgNSBwYXR0ZXJucyBvZiBmYWNlIGRlZmluZWQgaW4gT0JKIEZpbGUgOlxyXG4gICAgICogZmFjZVBhdHRlcm4xID0gW1wiMVwiLFwiMlwiLFwiM1wiLFwiNFwiLFwiNVwiLFwiNlwiXVxyXG4gICAgICogZmFjZVBhdHRlcm4yID0gW1wiMS8xXCIsXCIyLzJcIixcIjMvM1wiLFwiNC80XCIsXCI1LzVcIixcIjYvNlwiXVxyXG4gICAgICogZmFjZVBhdHRlcm4zID0gW1wiMS8xLzFcIixcIjIvMi8yXCIsXCIzLzMvM1wiLFwiNC80LzRcIixcIjUvNS81XCIsXCI2LzYvNlwiXVxyXG4gICAgICogZmFjZVBhdHRlcm40ID0gW1wiMS8vMVwiLFwiMi8vMlwiLFwiMy8vM1wiLFwiNC8vNFwiLFwiNS8vNVwiLFwiNi8vNlwiXVxyXG4gICAgICogZmFjZVBhdHRlcm41ID0gW1wiLTEvLTEvLTFcIixcIi0yLy0yLy0yXCIsXCItMy8tMy8tM1wiLFwiLTQvLTQvLTRcIixcIi01Ly01Ly01XCIsXCItNi8tNi8tNlwiXVxyXG4gICAgICogRWFjaCBwYXR0ZXJuIGlzIGRpdmlkZWQgYnkgdGhlIHNhbWUgbWV0aG9kXHJcbiAgICAgKiBAcGFyYW0gZmFjZXMgQXJyYXlbU3RyaW5nXSBUaGUgaW5kaWNlcyBvZiBlbGVtZW50c1xyXG4gICAgICogQHBhcmFtIHYgSW50ZWdlciBUaGUgdmFyaWFibGUgdG8gaW5jcmVtZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2dldFRyaWFuZ2xlcyhmYWNlczogQXJyYXk8c3RyaW5nPiwgdjogbnVtYmVyKSB7XHJcbiAgICAgICAgLy9Xb3JrIGZvciBlYWNoIGVsZW1lbnQgb2YgdGhlIGFycmF5XHJcbiAgICAgICAgZm9yIChsZXQgZmFjZUluZGV4ID0gdjsgZmFjZUluZGV4IDwgZmFjZXMubGVuZ3RoIC0gMTsgZmFjZUluZGV4KyspIHtcclxuICAgICAgICAgICAgLy9BZGQgb24gdGhlIHRyaWFuZ2xlIHZhcmlhYmxlIHRoZSBpbmRleGVzIHRvIG9idGFpbiB0cmlhbmdsZXNcclxuICAgICAgICAgICAgdGhpcy5fcHVzaFRyaWFuZ2xlKGZhY2VzLCBmYWNlSW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9SZXN1bHQgb2J0YWluZWQgYWZ0ZXIgMiBpdGVyYXRpb25zOlxyXG4gICAgICAgIC8vUGF0dGVybjEgPT4gdHJpYW5nbGUgPSBbXCIxXCIsXCIyXCIsXCIzXCIsXCIxXCIsXCIzXCIsXCI0XCJdO1xyXG4gICAgICAgIC8vUGF0dGVybjIgPT4gdHJpYW5nbGUgPSBbXCIxLzFcIixcIjIvMlwiLFwiMy8zXCIsXCIxLzFcIixcIjMvM1wiLFwiNC80XCJdO1xyXG4gICAgICAgIC8vUGF0dGVybjMgPT4gdHJpYW5nbGUgPSBbXCIxLzEvMVwiLFwiMi8yLzJcIixcIjMvMy8zXCIsXCIxLzEvMVwiLFwiMy8zLzNcIixcIjQvNC80XCJdO1xyXG4gICAgICAgIC8vUGF0dGVybjQgPT4gdHJpYW5nbGUgPSBbXCIxLy8xXCIsXCIyLy8yXCIsXCIzLy8zXCIsXCIxLy8xXCIsXCIzLy8zXCIsXCI0Ly80XCJdO1xyXG4gICAgICAgIC8vUGF0dGVybjUgPT4gdHJpYW5nbGUgPSBbXCItMS8tMS8tMVwiLFwiLTIvLTIvLTJcIixcIi0zLy0zLy0zXCIsXCItMS8tMS8tMVwiLFwiLTMvLTMvLTNcIixcIi00Ly00Ly00XCJdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG8gZ2V0IGNvbG9yIGJldHdlZW4gY29sb3IgYW5kIGV4dGVuc2lvbiBjb2xvclxyXG4gICAgICogQHBhcmFtIGluZGV4IEludGVnZXIgVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IGluIHRoZSBhcnJheVxyXG4gICAgICogQHJldHVybnMgdmFsdWUgb2YgdGFyZ2V0IGNvbG9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2dldENvbG9yKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMuaW1wb3J0VmVydGV4Q29sb3JzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9leHRDb2xvcnNbaW5kZXhdID8/IHRoaXMuX2NvbG9yc1tpbmRleF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgdHJpYW5nbGVzIGFuZCBwdXNoIHRoZSBkYXRhIGZvciBlYWNoIHBvbHlnb24gZm9yIHRoZSBwYXR0ZXJuIDFcclxuICAgICAqIEluIHRoaXMgcGF0dGVybiB3ZSBnZXQgdmVydGljZSBwb3NpdGlvbnNcclxuICAgICAqIEBwYXJhbSBmYWNlXHJcbiAgICAgKiBAcGFyYW0gdlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjEoZmFjZTogQXJyYXk8c3RyaW5nPiwgdjogbnVtYmVyKSB7XHJcbiAgICAgICAgLy9HZXQgdGhlIGluZGljZXMgb2YgdHJpYW5nbGVzIGZvciBlYWNoIHBvbHlnb25cclxuICAgICAgICB0aGlzLl9nZXRUcmlhbmdsZXMoZmFjZSwgdik7XHJcbiAgICAgICAgLy9Gb3IgZWFjaCBlbGVtZW50IGluIHRoZSB0cmlhbmdsZXMgYXJyYXkuXHJcbiAgICAgICAgLy9UaGlzIHZhciBjb3VsZCBjb250YWlucyAxIHRvIGFuIGluZmluaXR5IG9mIHRyaWFuZ2xlc1xyXG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5fdHJpYW5nbGVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIC8vIFNldCBwb3NpdGlvbiBpbmRpY2VcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlUG9zaXRpb25Gcm9tT2JqID0gcGFyc2VJbnQodGhpcy5fdHJpYW5nbGVzW2tdKSAtIDE7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zZXREYXRhKFxyXG4gICAgICAgICAgICAgICAgaW5kaWNlUG9zaXRpb25Gcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgIDAsIC8vIEluIHRoZSBwYXR0ZXJuIDEsIG5vcm1hbHMgYW5kIHV2cyBhcmUgbm90IGRlZmluZWRcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uc1tpbmRpY2VQb3NpdGlvbkZyb21PYmpdLCAvLyBHZXQgdGhlIHZlY3RvcnMgZGF0YVxyXG4gICAgICAgICAgICAgICAgVmVjdG9yMi5aZXJvKCksXHJcbiAgICAgICAgICAgICAgICBWZWN0b3IzLlVwKCksIC8vIENyZWF0ZSBkZWZhdWx0IHZlY3RvcnNcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dldENvbG9yKGluZGljZVBvc2l0aW9uRnJvbU9iailcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9SZXNldCB2YXJpYWJsZSBmb3IgdGhlIG5leHQgbGluZVxyXG4gICAgICAgIHRoaXMuX3RyaWFuZ2xlcy5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHRyaWFuZ2xlcyBhbmQgcHVzaCB0aGUgZGF0YSBmb3IgZWFjaCBwb2x5Z29uIGZvciB0aGUgcGF0dGVybiAyXHJcbiAgICAgKiBJbiB0aGlzIHBhdHRlcm4gd2UgZ2V0IHZlcnRpY2UgcG9zaXRpb25zIGFuZCB1dnNcclxuICAgICAqIEBwYXJhbSBmYWNlXHJcbiAgICAgKiBAcGFyYW0gdlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjIoZmFjZTogQXJyYXk8c3RyaW5nPiwgdjogbnVtYmVyKSB7XHJcbiAgICAgICAgLy9HZXQgdGhlIGluZGljZXMgb2YgdHJpYW5nbGVzIGZvciBlYWNoIHBvbHlnb25cclxuICAgICAgICB0aGlzLl9nZXRUcmlhbmdsZXMoZmFjZSwgdik7XHJcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLl90cmlhbmdsZXMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgLy90cmlhbmdsZVtrXSA9IFwiMS8xXCJcclxuICAgICAgICAgICAgLy9TcGxpdCB0aGUgZGF0YSBmb3IgZ2V0dGluZyBwb3NpdGlvbiBhbmQgdXZcclxuICAgICAgICAgICAgY29uc3QgcG9pbnQgPSB0aGlzLl90cmlhbmdsZXNba10uc3BsaXQoXCIvXCIpOyAvLyBbXCIxXCIsIFwiMVwiXVxyXG4gICAgICAgICAgICAvL1NldCBwb3NpdGlvbiBpbmRpY2VcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlUG9zaXRpb25Gcm9tT2JqID0gcGFyc2VJbnQocG9pbnRbMF0pIC0gMTtcclxuICAgICAgICAgICAgLy9TZXQgdXYgaW5kaWNlXHJcbiAgICAgICAgICAgIGNvbnN0IGluZGljZVV2c0Zyb21PYmogPSBwYXJzZUludChwb2ludFsxXSkgLSAxO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fc2V0RGF0YShcclxuICAgICAgICAgICAgICAgIGluZGljZVBvc2l0aW9uRnJvbU9iaixcclxuICAgICAgICAgICAgICAgIGluZGljZVV2c0Zyb21PYmosXHJcbiAgICAgICAgICAgICAgICAwLCAvL0RlZmF1bHQgdmFsdWUgZm9yIG5vcm1hbHNcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uc1tpbmRpY2VQb3NpdGlvbkZyb21PYmpdLCAvL0dldCB0aGUgdmFsdWVzIGZvciBlYWNoIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgIHRoaXMuX3V2c1tpbmRpY2VVdnNGcm9tT2JqXSA/PyBWZWN0b3IyLlplcm8oKSxcclxuICAgICAgICAgICAgICAgIFZlY3RvcjMuVXAoKSwgLy9EZWZhdWx0IHZhbHVlIGZvciBub3JtYWxzXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRDb2xvcihpbmRpY2VQb3NpdGlvbkZyb21PYmopXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1Jlc2V0IHZhcmlhYmxlIGZvciB0aGUgbmV4dCBsaW5lXHJcbiAgICAgICAgdGhpcy5fdHJpYW5nbGVzLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgdHJpYW5nbGVzIGFuZCBwdXNoIHRoZSBkYXRhIGZvciBlYWNoIHBvbHlnb24gZm9yIHRoZSBwYXR0ZXJuIDNcclxuICAgICAqIEluIHRoaXMgcGF0dGVybiB3ZSBnZXQgdmVydGljZSBwb3NpdGlvbnMsIHV2cyBhbmQgbm9ybWFsc1xyXG4gICAgICogQHBhcmFtIGZhY2VcclxuICAgICAqIEBwYXJhbSB2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3NldERhdGFGb3JDdXJyZW50RmFjZVdpdGhQYXR0ZXJuMyhmYWNlOiBBcnJheTxzdHJpbmc+LCB2OiBudW1iZXIpIHtcclxuICAgICAgICAvL0dldCB0aGUgaW5kaWNlcyBvZiB0cmlhbmdsZXMgZm9yIGVhY2ggcG9seWdvblxyXG4gICAgICAgIHRoaXMuX2dldFRyaWFuZ2xlcyhmYWNlLCB2KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLl90cmlhbmdsZXMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgLy90cmlhbmdsZVtrXSA9IFwiMS8xLzFcIlxyXG4gICAgICAgICAgICAvL1NwbGl0IHRoZSBkYXRhIGZvciBnZXR0aW5nIHBvc2l0aW9uLCB1diwgYW5kIG5vcm1hbHNcclxuICAgICAgICAgICAgY29uc3QgcG9pbnQgPSB0aGlzLl90cmlhbmdsZXNba10uc3BsaXQoXCIvXCIpOyAvLyBbXCIxXCIsIFwiMVwiLCBcIjFcIl1cclxuICAgICAgICAgICAgLy8gU2V0IHBvc2l0aW9uIGluZGljZVxyXG4gICAgICAgICAgICBjb25zdCBpbmRpY2VQb3NpdGlvbkZyb21PYmogPSBwYXJzZUludChwb2ludFswXSkgLSAxO1xyXG4gICAgICAgICAgICAvLyBTZXQgdXYgaW5kaWNlXHJcbiAgICAgICAgICAgIGNvbnN0IGluZGljZVV2c0Zyb21PYmogPSBwYXJzZUludChwb2ludFsxXSkgLSAxO1xyXG4gICAgICAgICAgICAvLyBTZXQgbm9ybWFsIGluZGljZVxyXG4gICAgICAgICAgICBjb25zdCBpbmRpY2VOb3JtYWxGcm9tT2JqID0gcGFyc2VJbnQocG9pbnRbMl0pIC0gMTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3NldERhdGEoXHJcbiAgICAgICAgICAgICAgICBpbmRpY2VQb3NpdGlvbkZyb21PYmosXHJcbiAgICAgICAgICAgICAgICBpbmRpY2VVdnNGcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgaW5kaWNlTm9ybWFsRnJvbU9iaixcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uc1tpbmRpY2VQb3NpdGlvbkZyb21PYmpdLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXZzW2luZGljZVV2c0Zyb21PYmpdID8/IFZlY3RvcjIuWmVybygpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbm9ybWFsc1tpbmRpY2VOb3JtYWxGcm9tT2JqXSA/PyBWZWN0b3IzLlVwKCkgLy9TZXQgdGhlIHZlY3RvciBmb3IgZWFjaCBjb21wb25lbnRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9SZXNldCB2YXJpYWJsZSBmb3IgdGhlIG5leHQgbGluZVxyXG4gICAgICAgIHRoaXMuX3RyaWFuZ2xlcy5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHRyaWFuZ2xlcyBhbmQgcHVzaCB0aGUgZGF0YSBmb3IgZWFjaCBwb2x5Z29uIGZvciB0aGUgcGF0dGVybiA0XHJcbiAgICAgKiBJbiB0aGlzIHBhdHRlcm4gd2UgZ2V0IHZlcnRpY2UgcG9zaXRpb25zIGFuZCBub3JtYWxzXHJcbiAgICAgKiBAcGFyYW0gZmFjZVxyXG4gICAgICogQHBhcmFtIHZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc2V0RGF0YUZvckN1cnJlbnRGYWNlV2l0aFBhdHRlcm40KGZhY2U6IEFycmF5PHN0cmluZz4sIHY6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2dldFRyaWFuZ2xlcyhmYWNlLCB2KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLl90cmlhbmdsZXMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgLy90cmlhbmdsZVtrXSA9IFwiMS8vMVwiXHJcbiAgICAgICAgICAgIC8vU3BsaXQgdGhlIGRhdGEgZm9yIGdldHRpbmcgcG9zaXRpb24gYW5kIG5vcm1hbHNcclxuICAgICAgICAgICAgY29uc3QgcG9pbnQgPSB0aGlzLl90cmlhbmdsZXNba10uc3BsaXQoXCIvL1wiKTsgLy8gW1wiMVwiLCBcIjFcIl1cclxuICAgICAgICAgICAgLy8gV2UgY2hlY2sgaW5kaWNlcywgYW5kIG5vcm1hbHNcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlUG9zaXRpb25Gcm9tT2JqID0gcGFyc2VJbnQocG9pbnRbMF0pIC0gMTtcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlTm9ybWFsRnJvbU9iaiA9IHBhcnNlSW50KHBvaW50WzFdKSAtIDE7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zZXREYXRhKFxyXG4gICAgICAgICAgICAgICAgaW5kaWNlUG9zaXRpb25Gcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgMSwgLy9EZWZhdWx0IHZhbHVlIGZvciB1dlxyXG4gICAgICAgICAgICAgICAgaW5kaWNlTm9ybWFsRnJvbU9iaixcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uc1tpbmRpY2VQb3NpdGlvbkZyb21PYmpdLCAvL0dldCBlYWNoIHZlY3RvciBvZiBkYXRhXHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyLlplcm8oKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX25vcm1hbHNbaW5kaWNlTm9ybWFsRnJvbU9ial0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRDb2xvcihpbmRpY2VQb3NpdGlvbkZyb21PYmopXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vUmVzZXQgdmFyaWFibGUgZm9yIHRoZSBuZXh0IGxpbmVcclxuICAgICAgICB0aGlzLl90cmlhbmdsZXMubGVuZ3RoID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICogQ3JlYXRlIHRyaWFuZ2xlcyBhbmQgcHVzaCB0aGUgZGF0YSBmb3IgZWFjaCBwb2x5Z29uIGZvciB0aGUgcGF0dGVybiAzXHJcbiAgICAgKiBJbiB0aGlzIHBhdHRlcm4gd2UgZ2V0IHZlcnRpY2UgcG9zaXRpb25zLCB1dnMgYW5kIG5vcm1hbHNcclxuICAgICAqIEBwYXJhbSBmYWNlXHJcbiAgICAgKiBAcGFyYW0gdlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjUoZmFjZTogQXJyYXk8c3RyaW5nPiwgdjogbnVtYmVyKSB7XHJcbiAgICAgICAgLy9HZXQgdGhlIGluZGljZXMgb2YgdHJpYW5nbGVzIGZvciBlYWNoIHBvbHlnb25cclxuICAgICAgICB0aGlzLl9nZXRUcmlhbmdsZXMoZmFjZSwgdik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5fdHJpYW5nbGVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIC8vdHJpYW5nbGVba10gPSBcIi0xLy0xLy0xXCJcclxuICAgICAgICAgICAgLy9TcGxpdCB0aGUgZGF0YSBmb3IgZ2V0dGluZyBwb3NpdGlvbiwgdXYsIGFuZCBub3JtYWxzXHJcbiAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gdGhpcy5fdHJpYW5nbGVzW2tdLnNwbGl0KFwiL1wiKTsgLy8gW1wiLTFcIiwgXCItMVwiLCBcIi0xXCJdXHJcbiAgICAgICAgICAgIC8vIFNldCBwb3NpdGlvbiBpbmRpY2VcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlUG9zaXRpb25Gcm9tT2JqID0gdGhpcy5fcG9zaXRpb25zLmxlbmd0aCArIHBhcnNlSW50KHBvaW50WzBdKTtcclxuICAgICAgICAgICAgLy8gU2V0IHV2IGluZGljZVxyXG4gICAgICAgICAgICBjb25zdCBpbmRpY2VVdnNGcm9tT2JqID0gdGhpcy5fdXZzLmxlbmd0aCArIHBhcnNlSW50KHBvaW50WzFdKTtcclxuICAgICAgICAgICAgLy8gU2V0IG5vcm1hbCBpbmRpY2VcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlTm9ybWFsRnJvbU9iaiA9IHRoaXMuX25vcm1hbHMubGVuZ3RoICsgcGFyc2VJbnQocG9pbnRbMl0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fc2V0RGF0YShcclxuICAgICAgICAgICAgICAgIGluZGljZVBvc2l0aW9uRnJvbU9iaixcclxuICAgICAgICAgICAgICAgIGluZGljZVV2c0Zyb21PYmosXHJcbiAgICAgICAgICAgICAgICBpbmRpY2VOb3JtYWxGcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9zaXRpb25zW2luZGljZVBvc2l0aW9uRnJvbU9ial0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLl91dnNbaW5kaWNlVXZzRnJvbU9ial0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ub3JtYWxzW2luZGljZU5vcm1hbEZyb21PYmpdLCAvL1NldCB0aGUgdmVjdG9yIGZvciBlYWNoIGNvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0Q29sb3IoaW5kaWNlUG9zaXRpb25Gcm9tT2JqKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1Jlc2V0IHZhcmlhYmxlIGZvciB0aGUgbmV4dCBsaW5lXHJcbiAgICAgICAgdGhpcy5fdHJpYW5nbGVzLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYWRkUHJldmlvdXNPYmpNZXNoKCkge1xyXG4gICAgICAgIC8vQ2hlY2sgaWYgaXQgaXMgbm90IHRoZSBmaXJzdCBtZXNoLiBPdGhlcndpc2Ugd2UgZG9uJ3QgaGF2ZSBkYXRhLlxyXG4gICAgICAgIGlmICh0aGlzLl9tZXNoZXNGcm9tT2JqLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy9HZXQgdGhlIHByZXZpb3VzIG1lc2ggZm9yIGFwcGx5aW5nIHRoZSBkYXRhIGFib3V0IHRoZSBmYWNlc1xyXG4gICAgICAgICAgICAvLz0+IGluIG9iaiBmaWxlLCBmYWNlcyBkZWZpbml0aW9uIGFwcGVuZCBhZnRlciB0aGUgbmFtZSBvZiB0aGUgbWVzaFxyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaCA9IHRoaXMuX21lc2hlc0Zyb21PYmpbdGhpcy5fbWVzaGVzRnJvbU9iai5sZW5ndGggLSAxXTtcclxuXHJcbiAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIGludG8gQXJyYXkgZm9yIHRoZSBtZXNoXHJcbiAgICAgICAgICAgIHRoaXMuX3Vud3JhcERhdGEoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy51c2VMZWdhY3lCZWhhdmlvcikge1xyXG4gICAgICAgICAgICAgICAgLy8gUmV2ZXJzZSB0YWIuIE90aGVyd2lzZSBmYWNlIGFyZSBkaXNwbGF5ZWQgaW4gdGhlIHdyb25nIHNlbnNcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luZGljZXNGb3JCYWJ5bG9uLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9TZXQgdGhlIGluZm9ybWF0aW9uIGZvciB0aGUgbWVzaFxyXG4gICAgICAgICAgICAvL1NsaWNlIHRoZSBhcnJheSB0byBhdm9pZCByZXdyaXRpbmcgYmVjYXVzZSBvZiB0aGUgZmFjdCB0aGlzIGlzIHRoZSBzYW1lIHZhciB3aGljaCBiZSByZXdyaXRlZFxyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaC5pbmRpY2VzID0gdGhpcy5faW5kaWNlc0ZvckJhYnlsb24uc2xpY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2gucG9zaXRpb25zID0gdGhpcy5fdW53cmFwcGVkUG9zaXRpb25zRm9yQmFieWxvbi5zbGljZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaC5ub3JtYWxzID0gdGhpcy5fdW53cmFwcGVkTm9ybWFsc0ZvckJhYnlsb24uc2xpY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2gudXZzID0gdGhpcy5fdW53cmFwcGVkVVZGb3JCYWJ5bG9uLnNsaWNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZWRNZXNoLmhhc0xpbmVzID0gdGhpcy5faGFzTGluZURhdGE7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMuaW1wb3J0VmVydGV4Q29sb3JzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaC5jb2xvcnMgPSB0aGlzLl91bndyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uLnNsaWNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vUmVzZXQgdGhlIGFycmF5IGZvciB0aGUgbmV4dCBtZXNoXHJcbiAgICAgICAgICAgIHRoaXMuX2luZGljZXNGb3JCYWJ5bG9uLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX3Vud3JhcHBlZFBvc2l0aW9uc0ZvckJhYnlsb24ubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fdW53cmFwcGVkQ29sb3JzRm9yQmFieWxvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl91bndyYXBwZWROb3JtYWxzRm9yQmFieWxvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl91bndyYXBwZWRVVkZvckJhYnlsb24ubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgdGhpcy5faGFzTGluZURhdGEgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfb3B0aW1pemVOb3JtYWxzKG1lc2g6IEFic3RyYWN0TWVzaCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IG1lc2guZ2V0VmVydGljZXNEYXRhKFZlcnRleEJ1ZmZlci5Qb3NpdGlvbktpbmQpO1xyXG4gICAgICAgIGNvbnN0IG5vcm1hbHMgPSBtZXNoLmdldFZlcnRpY2VzRGF0YShWZXJ0ZXhCdWZmZXIuTm9ybWFsS2luZCk7XHJcbiAgICAgICAgY29uc3QgbWFwVmVydGljZXM6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyW10gfSA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoIXBvc2l0aW9ucyB8fCAhbm9ybWFscykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvc2l0aW9ucy5sZW5ndGggLyAzOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgeCA9IHBvc2l0aW9uc1tpICogMyArIDBdO1xyXG4gICAgICAgICAgICBjb25zdCB5ID0gcG9zaXRpb25zW2kgKiAzICsgMV07XHJcbiAgICAgICAgICAgIGNvbnN0IHogPSBwb3NpdGlvbnNbaSAqIDMgKyAyXTtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0geCArIFwiX1wiICsgeSArIFwiX1wiICsgejtcclxuXHJcbiAgICAgICAgICAgIGxldCBsc3QgPSBtYXBWZXJ0aWNlc1trZXldO1xyXG4gICAgICAgICAgICBpZiAoIWxzdCkge1xyXG4gICAgICAgICAgICAgICAgbHN0ID0gW107XHJcbiAgICAgICAgICAgICAgICBtYXBWZXJ0aWNlc1trZXldID0gbHN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxzdC5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgbm9ybWFsID0gbmV3IFZlY3RvcjMoKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBtYXBWZXJ0aWNlcykge1xyXG4gICAgICAgICAgICBjb25zdCBsc3QgPSBtYXBWZXJ0aWNlc1trZXldO1xyXG4gICAgICAgICAgICBpZiAobHN0Lmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB2MElkeCA9IGxzdFswXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsc3QubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZJZHggPSBsc3RbaV07XHJcbiAgICAgICAgICAgICAgICBub3JtYWxzW3YwSWR4ICogMyArIDBdICs9IG5vcm1hbHNbdklkeCAqIDMgKyAwXTtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHNbdjBJZHggKiAzICsgMV0gKz0gbm9ybWFsc1t2SWR4ICogMyArIDFdO1xyXG4gICAgICAgICAgICAgICAgbm9ybWFsc1t2MElkeCAqIDMgKyAyXSArPSBub3JtYWxzW3ZJZHggKiAzICsgMl07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG5vcm1hbC5jb3B5RnJvbUZsb2F0cyhub3JtYWxzW3YwSWR4ICogMyArIDBdLCBub3JtYWxzW3YwSWR4ICogMyArIDFdLCBub3JtYWxzW3YwSWR4ICogMyArIDJdKTtcclxuICAgICAgICAgICAgbm9ybWFsLm5vcm1hbGl6ZSgpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsc3QubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZJZHggPSBsc3RbaV07XHJcbiAgICAgICAgICAgICAgICBub3JtYWxzW3ZJZHggKiAzICsgMF0gPSBub3JtYWwueDtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHNbdklkeCAqIDMgKyAxXSA9IG5vcm1hbC55O1xyXG4gICAgICAgICAgICAgICAgbm9ybWFsc1t2SWR4ICogMyArIDJdID0gbm9ybWFsLno7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzaC5zZXRWZXJ0aWNlc0RhdGEoVmVydGV4QnVmZmVyLk5vcm1hbEtpbmQsIG5vcm1hbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9Jc0xpbmVFbGVtZW50KGxpbmU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBsaW5lLnN0YXJ0c1dpdGgoXCJsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9Jc09iamVjdEVsZW1lbnQobGluZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGxpbmUuc3RhcnRzV2l0aChcIm9cIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0lzR3JvdXBFbGVtZW50KGxpbmU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBsaW5lLnN0YXJ0c1dpdGgoXCJnXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9HZXRaYnJ1c2hNUkdCKGxpbmU6IHN0cmluZywgbm90UGFyc2U6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoIWxpbmUuc3RhcnRzV2l0aChcIm1yZ2JcIikpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGxpbmUgPSBsaW5lLnJlcGxhY2UoXCJtcmdiXCIsIFwiXCIpLnRyaW0oKTtcclxuICAgICAgICAvLyBpZiBpbmNsdWRlIHZlcnRleCBjb2xvciAsIG5vdCBsb2FkIG1yZ2IgYW55bW9yZVxyXG4gICAgICAgIGlmIChub3RQYXJzZSkgcmV0dXJuIFtdO1xyXG4gICAgICAgIGNvbnN0IHJlZ2V4ID0gL1thLXowLTldL2c7XHJcbiAgICAgICAgY29uc3QgcmVnQXJyYXkgPSBsaW5lLm1hdGNoKHJlZ2V4KTtcclxuICAgICAgICBpZiAoIXJlZ0FycmF5IHx8IHJlZ0FycmF5Lmxlbmd0aCAlIDggIT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhcnJheTogQ29sb3I0W10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCByZWdJbmRleCA9IDA7IHJlZ0luZGV4IDwgcmVnQXJyYXkubGVuZ3RoIC8gODsgcmVnSW5kZXgrKykge1xyXG4gICAgICAgICAgICAvL2VhY2ggaXRlbSBpcyBNTVJSR0dCQiwgbSBpcyBtYXRlcmlhbCBpbmRleFxyXG4gICAgICAgICAgICAvLyBjb25zdCBtID0gcmVnQXJyYXlbcmVnSW5kZXggKiA4ICsgMF0gKyByZWdBcnJheVtyZWdJbmRleCAqIDggKyAxXTtcclxuICAgICAgICAgICAgY29uc3QgciA9IHJlZ0FycmF5W3JlZ0luZGV4ICogOCArIDJdICsgcmVnQXJyYXlbcmVnSW5kZXggKiA4ICsgM107XHJcbiAgICAgICAgICAgIGNvbnN0IGcgPSByZWdBcnJheVtyZWdJbmRleCAqIDggKyA0XSArIHJlZ0FycmF5W3JlZ0luZGV4ICogOCArIDVdO1xyXG4gICAgICAgICAgICBjb25zdCBiID0gcmVnQXJyYXlbcmVnSW5kZXggKiA4ICsgNl0gKyByZWdBcnJheVtyZWdJbmRleCAqIDggKyA3XTtcclxuICAgICAgICAgICAgYXJyYXkucHVzaChuZXcgQ29sb3I0KHBhcnNlSW50KHIsIDE2KSAvIDI1NSwgcGFyc2VJbnQoZywgMTYpIC8gMjU1LCBwYXJzZUludChiLCAxNikgLyAyNTUsIDEpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBwYXJzZSBhbiBPQkogc3RyaW5nXHJcbiAgICAgKiBAcGFyYW0gbWVzaGVzTmFtZXMgZGVmaW5lcyB0aGUgbGlzdCBvZiBtZXNoZXMgdG8gbG9hZCAoYWxsIGlmIG5vdCBkZWZpbmVkKVxyXG4gICAgICogQHBhcmFtIGRhdGEgZGVmaW5lcyB0aGUgT0JKIHN0cmluZ1xyXG4gICAgICogQHBhcmFtIHNjZW5lIGRlZmluZXMgdGhlIGhvc3Rpbmcgc2NlbmVcclxuICAgICAqIEBwYXJhbSBhc3NldENvbnRhaW5lciBkZWZpbmVzIHRoZSBhc3NldCBjb250YWluZXIgdG8gbG9hZCBkYXRhIGluXHJcbiAgICAgKiBAcGFyYW0gb25GaWxlVG9Mb2FkRm91bmQgZGVmaW5lcyBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBjYWxsZWQgaWYgYSBNVEwgZmlsZSBpcyBmb3VuZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcGFyc2UobWVzaGVzTmFtZXM6IGFueSwgZGF0YTogc3RyaW5nLCBzY2VuZTogU2NlbmUsIGFzc2V0Q29udGFpbmVyOiBOdWxsYWJsZTxBc3NldENvbnRhaW5lcj4sIG9uRmlsZVRvTG9hZEZvdW5kOiAoZmlsZVRvTG9hZDogc3RyaW5nKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgLy9Nb3ZlIFNhbnRpdGl6ZSBoZXJlIHRvIGZvcmJpZCBkZWxldGUgemJydXNoIGRhdGFcclxuICAgICAgICAvLyBTYW5pdGl6ZSBkYXRhXHJcbiAgICAgICAgZGF0YSA9IGRhdGEucmVwbGFjZSgvI01SR0IvZywgXCJtcmdiXCIpO1xyXG4gICAgICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoLyMuKiQvZ20sIFwiXCIpLnRyaW0oKTtcclxuICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMudXNlTGVnYWN5QmVoYXZpb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHVzaFRyaWFuZ2xlID0gKGZhY2VzLCBmYWNlSW5kZXgpID0+IHRoaXMuX3RyaWFuZ2xlcy5wdXNoKGZhY2VzWzBdLCBmYWNlc1tmYWNlSW5kZXhdLCBmYWNlc1tmYWNlSW5kZXggKyAxXSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRlZG5lc3NTaWduID0gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNjZW5lLnVzZVJpZ2h0SGFuZGVkU3lzdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3B1c2hUcmlhbmdsZSA9IChmYWNlcywgZmFjZUluZGV4KSA9PiB0aGlzLl90cmlhbmdsZXMucHVzaChmYWNlc1swXSwgZmFjZXNbZmFjZUluZGV4ICsgMV0sIGZhY2VzW2ZhY2VJbmRleF0pO1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kZWRuZXNzU2lnbiA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fcHVzaFRyaWFuZ2xlID0gKGZhY2VzLCBmYWNlSW5kZXgpID0+IHRoaXMuX3RyaWFuZ2xlcy5wdXNoKGZhY2VzWzBdLCBmYWNlc1tmYWNlSW5kZXhdLCBmYWNlc1tmYWNlSW5kZXggKyAxXSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRlZG5lc3NTaWduID0gLTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTcGxpdCB0aGUgZmlsZSBpbnRvIGxpbmVzXHJcbiAgICAgICAgLy8gUHJlcHJvY2VzcyBsaW5lIGRhdGFcclxuICAgICAgICBjb25zdCBsaW5lc09CSiA9IGRhdGEuc3BsaXQoXCJcXG5cIik7XHJcbiAgICAgICAgY29uc3QgbGluZUxpbmVzOiBzdHJpbmdbXVtdID0gW107XHJcbiAgICAgICAgbGV0IGN1cnJlbnRHcm91cDogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgbGluZUxpbmVzLnB1c2goY3VycmVudEdyb3VwKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lc09CSi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lID0gbGluZXNPQkpbaV0udHJpbSgpLnJlcGxhY2UoL1xcc1xccy9nLCBcIiBcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBDb21tZW50IG9yIG5ld0xpbmVcclxuICAgICAgICAgICAgaWYgKGxpbmUubGVuZ3RoID09PSAwIHx8IGxpbmUuY2hhckF0KDApID09PSBcIiNcIikge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChTb2xpZFBhcnNlci5fSXNHcm91cEVsZW1lbnQobGluZSkgfHwgU29saWRQYXJzZXIuX0lzT2JqZWN0RWxlbWVudChsaW5lKSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEdyb3VwID0gW107XHJcbiAgICAgICAgICAgICAgICBsaW5lTGluZXMucHVzaChjdXJyZW50R3JvdXApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoU29saWRQYXJzZXIuX0lzTGluZUVsZW1lbnQobGluZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVWYWx1ZXMgPSBsaW5lLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBsaW5lIGVsZW1lbnRzIHdpdGggdHdvIHZlcnRpY2VzIG9ubHlcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGluZVZhbHVlcy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50R3JvdXAucHVzaChgbCAke2xpbmVWYWx1ZXNbaV19ICR7bGluZVZhbHVlc1tpICsgMV19YCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50R3JvdXAucHVzaChsaW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbGluZXMgPSBsaW5lTGluZXMuZmxhdCgpO1xyXG4gICAgICAgIC8vIExvb2sgYXQgZWFjaCBsaW5lXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lID0gbGluZXNbaV0udHJpbSgpLnJlcGxhY2UoL1xcc1xccy9nLCBcIiBcIik7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XHJcbiAgICAgICAgICAgIC8vIENvbW1lbnQgb3IgbmV3TGluZVxyXG4gICAgICAgICAgICBpZiAobGluZS5sZW5ndGggPT09IDAgfHwgbGluZS5jaGFyQXQoMCkgPT09IFwiI1wiKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChTb2xpZFBhcnNlci5WZXJ0ZXhQYXR0ZXJuLnRlc3QobGluZSkpIHtcclxuICAgICAgICAgICAgICAgIC8vR2V0IGluZm9ybWF0aW9uIGFib3V0IG9uZSBwb3NpdGlvbiBwb3NzaWJsZSBmb3IgdGhlIHZlcnRpY2VzXHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBsaW5lLm1hdGNoKC9bXiBdKy9nKSE7IC8vIG1hdGNoIHdpbGwgcmV0dXJuIG5vbi1udWxsIGR1ZSB0byBwYXNzaW5nIHJlZ2V4IHBhdHRlcm5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBWYWx1ZSBvZiByZXN1bHQgd2l0aCBsaW5lOiBcInYgMS4wIDIuMCAzLjBcIlxyXG4gICAgICAgICAgICAgICAgLy8gW1widlwiLCBcIjEuMFwiLCBcIjIuMFwiLCBcIjMuMFwiXVxyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgVmVjdG9yMyB3aXRoIHRoZSBwb3NpdGlvbiB4LCB5LCB6XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb3NpdGlvbnMucHVzaChuZXcgVmVjdG9yMyhwYXJzZUZsb2F0KHJlc3VsdFsxXSksIHBhcnNlRmxvYXQocmVzdWx0WzJdKSwgcGFyc2VGbG9hdChyZXN1bHRbM10pKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLmltcG9ydFZlcnRleENvbG9ycykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgciA9IHBhcnNlRmxvYXQocmVzdWx0WzRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZyA9IHBhcnNlRmxvYXQocmVzdWx0WzVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYiA9IHBhcnNlRmxvYXQocmVzdWx0WzZdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbG9ycy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IENvbG9yNChyID4gMSA/IHIgLyAyNTUgOiByLCBnID4gMSA/IGcgLyAyNTUgOiBnLCBiID4gMSA/IGIgLyAyNTUgOiBiLCByZXN1bHQubGVuZ3RoID09PSA3IHx8IHJlc3VsdFs3XSA9PT0gdW5kZWZpbmVkID8gMSA6IHBhcnNlRmxvYXQocmVzdWx0WzddKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBtYXliZSBwdXNoIE5VTEwgYW5kIGlmIGFsbCBhcmUgTlVMTCB0byBza2lwIChhbmQgcmVtb3ZlIGdyYXlDb2xvciB2YXIpLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb2xvcnMucHVzaCh0aGlzLl9ncmF5Q29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0ID0gU29saWRQYXJzZXIuTm9ybWFsUGF0dGVybi5leGVjKGxpbmUpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9DcmVhdGUgYSBWZWN0b3IzIHdpdGggdGhlIG5vcm1hbHMgeCwgeSwgelxyXG4gICAgICAgICAgICAgICAgLy9WYWx1ZSBvZiByZXN1bHRcclxuICAgICAgICAgICAgICAgIC8vIFtcInZuIDEuMCAyLjAgMy4wXCIsIFwiMS4wXCIsIFwiMi4wXCIsIFwiMy4wXCJdXHJcbiAgICAgICAgICAgICAgICAvL0FkZCB0aGUgVmVjdG9yIGluIHRoZSBsaXN0IG9mIG5vcm1hbHNcclxuICAgICAgICAgICAgICAgIHRoaXMuX25vcm1hbHMucHVzaChuZXcgVmVjdG9yMyhwYXJzZUZsb2F0KHJlc3VsdFsxXSksIHBhcnNlRmxvYXQocmVzdWx0WzJdKSwgcGFyc2VGbG9hdChyZXN1bHRbM10pKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IFNvbGlkUGFyc2VyLlVWUGF0dGVybi5leGVjKGxpbmUpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9DcmVhdGUgYSBWZWN0b3IyIHdpdGggdGhlIG5vcm1hbHMgdSwgdlxyXG4gICAgICAgICAgICAgICAgLy9WYWx1ZSBvZiByZXN1bHRcclxuICAgICAgICAgICAgICAgIC8vIFtcInZ0IDAuMSAwLjIgMC4zXCIsIFwiMC4xXCIsIFwiMC4yXCJdXHJcbiAgICAgICAgICAgICAgICAvL0FkZCB0aGUgVmVjdG9yIGluIHRoZSBsaXN0IG9mIHV2c1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXZzLnB1c2gobmV3IFZlY3RvcjIocGFyc2VGbG9hdChyZXN1bHRbMV0pICogdGhpcy5fbG9hZGluZ09wdGlvbnMuVVZTY2FsaW5nLngsIHBhcnNlRmxvYXQocmVzdWx0WzJdKSAqIHRoaXMuX2xvYWRpbmdPcHRpb25zLlVWU2NhbGluZy55KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9JZGVudGlmeSBwYXR0ZXJucyBvZiBmYWNlc1xyXG4gICAgICAgICAgICAgICAgLy9GYWNlIGNvdWxkIGJlIGRlZmluZWQgaW4gZGlmZmVyZW50IHR5cGUgb2YgcGF0dGVyblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgPSBTb2xpZFBhcnNlci5GYWNlUGF0dGVybjMuZXhlYyhsaW5lKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vVmFsdWUgb2YgcmVzdWx0OlxyXG4gICAgICAgICAgICAgICAgLy9bXCJmIDEvMS8xIDIvMi8yIDMvMy8zXCIsIFwiMS8xLzEgMi8yLzIgMy8zLzNcIi4uLl1cclxuXHJcbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgZGF0YSBmb3IgdGhpcyBmYWNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjMoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0WzFdLnRyaW0oKS5zcGxpdChcIiBcIiksIC8vIFtcIjEvMS8xXCIsIFwiMi8yLzJcIiwgXCIzLzMvM1wiXVxyXG4gICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IFNvbGlkUGFyc2VyLkZhY2VQYXR0ZXJuNC5leGVjKGxpbmUpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9WYWx1ZSBvZiByZXN1bHQ6XHJcbiAgICAgICAgICAgICAgICAvL1tcImYgMS8vMSAyLy8yIDMvLzNcIiwgXCIxLy8xIDIvLzIgMy8vM1wiLi4uXVxyXG5cclxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIGZvciB0aGlzIGZhY2VcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldERhdGFGb3JDdXJyZW50RmFjZVdpdGhQYXR0ZXJuNChcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRbMV0udHJpbSgpLnNwbGl0KFwiIFwiKSwgLy8gW1wiMS8vMVwiLCBcIjIvLzJcIiwgXCIzLy8zXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0ID0gU29saWRQYXJzZXIuRmFjZVBhdHRlcm41LmV4ZWMobGluZSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL1ZhbHVlIG9mIHJlc3VsdDpcclxuICAgICAgICAgICAgICAgIC8vW1wiZiAtMS8tMS8tMSAtMi8tMi8tMiAtMy8tMy8tM1wiLCBcIi0xLy0xLy0xIC0yLy0yLy0yIC0zLy0zLy0zXCIuLi5dXHJcblxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIGRhdGEgZm9yIHRoaXMgZmFjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0RGF0YUZvckN1cnJlbnRGYWNlV2l0aFBhdHRlcm41KFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFsxXS50cmltKCkuc3BsaXQoXCIgXCIpLCAvLyBbXCItMS8tMS8tMVwiLCBcIi0yLy0yLy0yXCIsIFwiLTMvLTMvLTNcIl1cclxuICAgICAgICAgICAgICAgICAgICAxXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgPSBTb2xpZFBhcnNlci5GYWNlUGF0dGVybjIuZXhlYyhsaW5lKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vVmFsdWUgb2YgcmVzdWx0OlxyXG4gICAgICAgICAgICAgICAgLy9bXCJmIDEvMSAyLzIgMy8zXCIsIFwiMS8xIDIvMiAzLzNcIi4uLl1cclxuXHJcbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgZGF0YSBmb3IgdGhpcyBmYWNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjIoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0WzFdLnRyaW0oKS5zcGxpdChcIiBcIiksIC8vIFtcIjEvMVwiLCBcIjIvMlwiLCBcIjMvM1wiXVxyXG4gICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IFNvbGlkUGFyc2VyLkZhY2VQYXR0ZXJuMS5leGVjKGxpbmUpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9WYWx1ZSBvZiByZXN1bHRcclxuICAgICAgICAgICAgICAgIC8vW1wiZiAxIDIgM1wiLCBcIjEgMiAzXCIuLi5dXHJcblxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIGRhdGEgZm9yIHRoaXMgZmFjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0RGF0YUZvckN1cnJlbnRGYWNlV2l0aFBhdHRlcm4xKFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFsxXS50cmltKCkuc3BsaXQoXCIgXCIpLCAvLyBbXCIxXCIsIFwiMlwiLCBcIjNcIl1cclxuICAgICAgICAgICAgICAgICAgICAxXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIERlZmluZSBhIG1lc2ggb3IgYW4gb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAvLyBFYWNoIHRpbWUgdGhpcyBrZXl3b3JkIGlzIGFuYWx5emVkLCBjcmVhdGUgYSBuZXcgT2JqZWN0IHdpdGggYWxsIGRhdGEgZm9yIGNyZWF0aW5nIGEgYmFieWxvbk1lc2hcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0ID0gU29saWRQYXJzZXIuTGluZVBhdHRlcm4xLmV4ZWMobGluZSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL1ZhbHVlIG9mIHJlc3VsdFxyXG4gICAgICAgICAgICAgICAgLy9bXCJsIDEgMlwiXVxyXG5cclxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIGZvciB0aGlzIGZhY2VcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldERhdGFGb3JDdXJyZW50RmFjZVdpdGhQYXR0ZXJuMShcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRbMV0udHJpbSgpLnNwbGl0KFwiIFwiKSwgLy8gW1wiMVwiLCBcIjJcIl1cclxuICAgICAgICAgICAgICAgICAgICAwXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFzTGluZURhdGEgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIERlZmluZSBhIG1lc2ggb3IgYW4gb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAvLyBFYWNoIHRpbWUgdGhpcyBrZXl3b3JkIGlzIGFuYWx5emVkLCBjcmVhdGUgYSBuZXcgT2JqZWN0IHdpdGggYWxsIGRhdGEgZm9yIGNyZWF0aW5nIGEgYmFieWxvbk1lc2hcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0ID0gU29saWRQYXJzZXIuTGluZVBhdHRlcm4yLmV4ZWMobGluZSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL1ZhbHVlIG9mIHJlc3VsdFxyXG4gICAgICAgICAgICAgICAgLy9bXCJsIDEvMSAyLzJcIl1cclxuXHJcbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgZGF0YSBmb3IgdGhpcyBmYWNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjIoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0WzFdLnRyaW0oKS5zcGxpdChcIiBcIiksIC8vIFtcIjEvMVwiLCBcIjIvMlwiXVxyXG4gICAgICAgICAgICAgICAgICAgIDBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNMaW5lRGF0YSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGVmaW5lIGEgbWVzaCBvciBhbiBvYmplY3RcclxuICAgICAgICAgICAgICAgIC8vIEVhY2ggdGltZSB0aGlzIGtleXdvcmQgaXMgYW5hbHl6ZWQsIGNyZWF0ZSBhIG5ldyBPYmplY3Qgd2l0aCBhbGwgZGF0YSBmb3IgY3JlYXRpbmcgYSBiYWJ5bG9uTWVzaFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgPSBTb2xpZFBhcnNlci5fR2V0WmJydXNoTVJHQihsaW5lLCAhdGhpcy5fbG9hZGluZ09wdGlvbnMuaW1wb3J0VmVydGV4Q29sb3JzKSkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXh0Q29sb3JzLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0ID0gU29saWRQYXJzZXIuTGluZVBhdHRlcm4zLmV4ZWMobGluZSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL1ZhbHVlIG9mIHJlc3VsdFxyXG4gICAgICAgICAgICAgICAgLy9bXCJsIDEvMS8xIDIvMi8yXCJdXHJcblxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIGRhdGEgZm9yIHRoaXMgZmFjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0RGF0YUZvckN1cnJlbnRGYWNlV2l0aFBhdHRlcm4zKFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFsxXS50cmltKCkuc3BsaXQoXCIgXCIpLCAvLyBbXCIxLzEvMVwiLCBcIjIvMi8yXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgMFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2hhc0xpbmVEYXRhID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEZWZpbmUgYSBtZXNoIG9yIGFuIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgLy8gRWFjaCB0aW1lIHRoaXMga2V5d29yZCBpcyBhbmFseXplZCwgY3JlYXRlIGEgbmV3IE9iamVjdCB3aXRoIGFsbCBkYXRhIGZvciBjcmVhdGluZyBhIGJhYnlsb25NZXNoXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoU29saWRQYXJzZXIuR3JvdXBEZXNjcmlwdG9yLnRlc3QobGluZSkgfHwgU29saWRQYXJzZXIuT2JqZWN0RGVzY3JpcHRvci50ZXN0KGxpbmUpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgbWVzaCBjb3JyZXNwb25kaW5nIHRvIHRoZSBuYW1lIG9mIHRoZSBncm91cC5cclxuICAgICAgICAgICAgICAgIC8vIERlZmluaXRpb24gb2YgdGhlIG1lc2hcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9iak1lc2g6IE1lc2hPYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbGluZS5zdWJzdHJpbmcoMikudHJpbSgpLCAvL1NldCB0aGUgbmFtZSBvZiB0aGUgY3VycmVudCBvYmogbWVzaFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGljZXM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbHM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgdXZzOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yczogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbE5hbWU6IHRoaXMuX21hdGVyaWFsTmFtZUZyb21PYmosXHJcbiAgICAgICAgICAgICAgICAgICAgaXNPYmplY3Q6IFNvbGlkUGFyc2VyLk9iamVjdERlc2NyaXB0b3IudGVzdChsaW5lKSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRQcmV2aW91c09iak1lc2goKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL1B1c2ggdGhlIGxhc3QgbWVzaCBjcmVhdGVkIHdpdGggb25seSB0aGUgbmFtZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWVzaGVzRnJvbU9iai5wdXNoKG9iak1lc2gpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vU2V0IHRoaXMgdmFyaWFibGUgdG8gaW5kaWNhdGUgdGhhdCBub3cgbWVzaGVzRnJvbU9iaiBoYXMgb2JqZWN0cyBkZWZpbmVkIGluc2lkZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFzTWVzaGVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzRmlyc3RNYXRlcmlhbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbmNyZW1lbnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgLy9LZXl3b3JkIGZvciBhcHBseWluZyBhIG1hdGVyaWFsXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoU29saWRQYXJzZXIuVXNlTXRsRGVzY3JpcHRvci50ZXN0KGxpbmUpKSB7XHJcbiAgICAgICAgICAgICAgICAvL0dldCB0aGUgbmFtZSBvZiB0aGUgbWF0ZXJpYWxcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsTmFtZUZyb21PYmogPSBsaW5lLnN1YnN0cmluZyg3KS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9JZiB0aGlzIG5ldyBtYXRlcmlhbCBpcyBpbiB0aGUgc2FtZSBtZXNoXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0ZpcnN0TWF0ZXJpYWwgfHwgIXRoaXMuX2hhc01lc2hlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIGZvciB0aGUgcHJldmlvdXMgbWVzaFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZFByZXZpb3VzT2JqTWVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ3JlYXRlIGEgbmV3IG1lc2hcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvYmpNZXNoOiBNZXNoT2JqZWN0ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnQgb2JqIG1lc2hcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogKHRoaXMuX29iak1lc2hOYW1lIHx8IFwibWVzaFwiKSArIFwiX21tXCIgKyB0aGlzLl9pbmNyZW1lbnQudG9TdHJpbmcoKSwgLy9TZXQgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnQgb2JqIG1lc2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGljZXM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3JtYWxzOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXZzOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JzOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxOYW1lOiB0aGlzLl9tYXRlcmlhbE5hbWVGcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNPYmplY3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luY3JlbWVudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vSWYgbWVzaGVzIGFyZSBhbHJlYWR5IGRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tZXNoZXNGcm9tT2JqLnB1c2gob2JqTWVzaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGFzTWVzaGVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBtYXRlcmlhbCBuYW1lIGlmIHRoZSBwcmV2aW91cyBsaW5lIGRlZmluZSBhIG1lc2hcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faGFzTWVzaGVzICYmIHRoaXMuX2lzRmlyc3RNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBtYXRlcmlhbCBuYW1lIHRvIHRoZSBwcmV2aW91cyBtZXNoICgxIG1hdGVyaWFsIHBlciBtZXNoKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21lc2hlc0Zyb21PYmpbdGhpcy5fbWVzaGVzRnJvbU9iai5sZW5ndGggLSAxXS5tYXRlcmlhbE5hbWUgPSB0aGlzLl9tYXRlcmlhbE5hbWVGcm9tT2JqO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRmlyc3RNYXRlcmlhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gS2V5d29yZCBmb3IgbG9hZGluZyB0aGUgbXRsIGZpbGVcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChTb2xpZFBhcnNlci5NdGxMaWJHcm91cERlc2NyaXB0b3IudGVzdChsaW5lKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBuYW1lIG9mIG10bCBmaWxlXHJcbiAgICAgICAgICAgICAgICBvbkZpbGVUb0xvYWRGb3VuZChsaW5lLnN1YnN0cmluZyg3KS50cmltKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFwcGx5IHNtb290aGluZ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFNvbGlkUGFyc2VyLlNtb290aERlc2NyaXB0b3IudGVzdChsaW5lKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gc21vb3RoIHNoYWRpbmcgPT4gYXBwbHkgc21vb3RoaW5nXHJcbiAgICAgICAgICAgICAgICAvLyBUb2RheSBJIGRvbid0IGtub3cgaXQgd29yayB3aXRoIGJhYnlsb24gYW5kIHdpdGggb2JqLlxyXG4gICAgICAgICAgICAgICAgLy8gV2l0aCB0aGUgb2JqIGZpbGUgIGFuIGludGVnZXIgaXMgc2V0XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHRoZXJlIGlzIGFub3RoZXIgcG9zc2liaWxpdHlcclxuICAgICAgICAgICAgICAgIExvZ2dlci5Mb2coXCJVbmhhbmRsZWQgZXhwcmVzc2lvbiBhdCBsaW5lIDogXCIgKyBsaW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBdCB0aGUgZW5kIG9mIHRoZSBmaWxlLCBhZGQgdGhlIGxhc3QgbWVzaCBpbnRvIHRoZSBtZXNoZXNGcm9tT2JqIGFycmF5XHJcbiAgICAgICAgaWYgKHRoaXMuX2hhc01lc2hlcykge1xyXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGRhdGEgZm9yIHRoZSBsYXN0IG1lc2hcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2ggPSB0aGlzLl9tZXNoZXNGcm9tT2JqW3RoaXMuX21lc2hlc0Zyb21PYmoubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMudXNlTGVnYWN5QmVoYXZpb3IpIHtcclxuICAgICAgICAgICAgICAgIC8vUmV2ZXJzZSBpbmRpY2VzIGZvciBkaXNwbGF5aW5nIGZhY2VzIGluIHRoZSBnb29kIHNlbnNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbmRpY2VzRm9yQmFieWxvbi5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vR2V0IHRoZSBnb29kIGFycmF5XHJcbiAgICAgICAgICAgIHRoaXMuX3Vud3JhcERhdGEoKTtcclxuICAgICAgICAgICAgLy9TZXQgYXJyYXlcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2guaW5kaWNlcyA9IHRoaXMuX2luZGljZXNGb3JCYWJ5bG9uO1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaC5wb3NpdGlvbnMgPSB0aGlzLl91bndyYXBwZWRQb3NpdGlvbnNGb3JCYWJ5bG9uO1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaC5ub3JtYWxzID0gdGhpcy5fdW53cmFwcGVkTm9ybWFsc0ZvckJhYnlsb247XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZWRNZXNoLnV2cyA9IHRoaXMuX3Vud3JhcHBlZFVWRm9yQmFieWxvbjtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2guaGFzTGluZXMgPSB0aGlzLl9oYXNMaW5lRGF0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLmltcG9ydFZlcnRleENvbG9ycykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2guY29sb3JzID0gdGhpcy5fdW53cmFwcGVkQ29sb3JzRm9yQmFieWxvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgYW55IG8gb3IgZyBrZXl3b3JkIG5vdCBmb3VuZCwgY3JlYXRlIGEgbWVzaCB3aXRoIGEgcmFuZG9tIGlkXHJcbiAgICAgICAgaWYgKCF0aGlzLl9oYXNNZXNoZXMpIHtcclxuICAgICAgICAgICAgbGV0IG5ld01hdGVyaWFsOiBOdWxsYWJsZTxTdGFuZGFyZE1hdGVyaWFsPiA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbmRpY2VzRm9yQmFieWxvbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy51c2VMZWdhY3lCZWhhdmlvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJldmVyc2UgdGFiIG9mIGluZGljZXNcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRpY2VzRm9yQmFieWxvbi5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9HZXQgcG9zaXRpb25zIG5vcm1hbHMgdXZzXHJcbiAgICAgICAgICAgICAgICB0aGlzLl91bndyYXBEYXRhKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGVyZSBpcyBubyBpbmRpY2VzIGluIHRoZSBmaWxlLiBXZSB3aWxsIGhhdmUgdG8gc3dpdGNoIHRvIHBvaW50IGNsb3VkIHJlbmRlcmluZ1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwb3Mgb2YgdGhpcy5fcG9zaXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdW53cmFwcGVkUG9zaXRpb25zRm9yQmFieWxvbi5wdXNoKHBvcy54LCBwb3MueSwgcG9zLnopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ub3JtYWxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgbm9ybWFsIG9mIHRoaXMuX25vcm1hbHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdW53cmFwcGVkTm9ybWFsc0ZvckJhYnlsb24ucHVzaChub3JtYWwueCwgbm9ybWFsLnksIG5vcm1hbC56KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3V2cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHV2IG9mIHRoaXMuX3V2cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91bndyYXBwZWRVVkZvckJhYnlsb24ucHVzaCh1di54LCB1di55KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V4dENvbG9ycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNvbG9yIG9mIHRoaXMuX2V4dENvbG9ycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91bndyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uLnB1c2goY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgY29sb3IuYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY29sb3JzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNvbG9yIG9mIHRoaXMuX2NvbG9ycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdW53cmFwcGVkQ29sb3JzRm9yQmFieWxvbi5wdXNoKGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIGNvbG9yLmEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fbWF0ZXJpYWxOYW1lRnJvbU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIG1hdGVyaWFsIHdpdGggcG9pbnQgY2xvdWQgb25cclxuICAgICAgICAgICAgICAgICAgICBuZXdNYXRlcmlhbCA9IG5ldyBTdGFuZGFyZE1hdGVyaWFsKEdlb21ldHJ5LlJhbmRvbUlkKCksIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3TWF0ZXJpYWwucG9pbnRzQ2xvdWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXRlcmlhbE5hbWVGcm9tT2JqID0gbmV3TWF0ZXJpYWwubmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9ub3JtYWxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdNYXRlcmlhbC5kaXNhYmxlTGlnaHRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdNYXRlcmlhbC5lbWlzc2l2ZUNvbG9yID0gQ29sb3IzLldoaXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1NldCBkYXRhIGZvciBvbmUgbWVzaFxyXG4gICAgICAgICAgICB0aGlzLl9tZXNoZXNGcm9tT2JqLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogR2VvbWV0cnkuUmFuZG9tSWQoKSxcclxuICAgICAgICAgICAgICAgIGluZGljZXM6IHRoaXMuX2luZGljZXNGb3JCYWJ5bG9uLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25zOiB0aGlzLl91bndyYXBwZWRQb3NpdGlvbnNGb3JCYWJ5bG9uLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOiB0aGlzLl91bndyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsczogdGhpcy5fdW53cmFwcGVkTm9ybWFsc0ZvckJhYnlsb24sXHJcbiAgICAgICAgICAgICAgICB1dnM6IHRoaXMuX3Vud3JhcHBlZFVWRm9yQmFieWxvbixcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsTmFtZTogdGhpcy5fbWF0ZXJpYWxOYW1lRnJvbU9iaixcclxuICAgICAgICAgICAgICAgIGRpcmVjdE1hdGVyaWFsOiBuZXdNYXRlcmlhbCxcclxuICAgICAgICAgICAgICAgIGlzT2JqZWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaGFzTGluZXM6IHRoaXMuX2hhc0xpbmVEYXRhLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vU2V0IGRhdGEgZm9yIGVhY2ggbWVzaFxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5fbWVzaGVzRnJvbU9iai5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAvL2NoZWNrIG1lc2hlc05hbWVzIChzdGxGaWxlTG9hZGVyKVxyXG4gICAgICAgICAgICBpZiAobWVzaGVzTmFtZXMgJiYgdGhpcy5fbWVzaGVzRnJvbU9ialtqXS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWVzaGVzTmFtZXMgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNoZXNOYW1lcy5pbmRleE9mKHRoaXMuX21lc2hlc0Zyb21PYmpbal0ubmFtZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21lc2hlc0Zyb21PYmpbal0ubmFtZSAhPT0gbWVzaGVzTmFtZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0dldCB0aGUgY3VycmVudCBtZXNoXHJcbiAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIHdpdGggVmVydGV4QnVmZmVyIGZvciBlYWNoIG1lc2hcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2ggPSB0aGlzLl9tZXNoZXNGcm9tT2JqW2pdO1xyXG4gICAgICAgICAgICAvL0NyZWF0ZSBhIE1lc2ggd2l0aCB0aGUgbmFtZSBvZiB0aGUgb2JqIG1lc2hcclxuXHJcbiAgICAgICAgICAgIHNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSAhIWFzc2V0Q29udGFpbmVyO1xyXG4gICAgICAgICAgICBjb25zdCBiYWJ5bG9uTWVzaCA9IG5ldyBNZXNoKHRoaXMuX21lc2hlc0Zyb21PYmpbal0ubmFtZSwgc2NlbmUpO1xyXG4gICAgICAgICAgICBiYWJ5bG9uTWVzaC5fcGFyZW50Q29udGFpbmVyID0gYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgICAgIHNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2guX2JhYnlsb25NZXNoID0gYmFieWxvbk1lc2g7XHJcbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgYSBncm91cCBtZXNoLCBpdCBzaG91bGQgaGF2ZSBhbiBvYmplY3QgbWVzaCBhcyBhIHBhcmVudC4gU28gbG9vayBmb3IgdGhlIGZpcnN0IG9iamVjdCBtZXNoIHRoYXQgYXBwZWFycyBiZWZvcmUgaXQuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5faGFuZGxlZE1lc2guaXNPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSBqIC0gMTsgayA+PSAwOyAtLWspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWVzaGVzRnJvbU9ialtrXS5pc09iamVjdCAmJiB0aGlzLl9tZXNoZXNGcm9tT2JqW2tdLl9iYWJ5bG9uTWVzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTWVzaC5wYXJlbnQgPSB0aGlzLl9tZXNoZXNGcm9tT2JqW2tdLl9iYWJ5bG9uTWVzaCE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9QdXNoIHRoZSBuYW1lIG9mIHRoZSBtYXRlcmlhbCB0byBhbiBhcnJheVxyXG4gICAgICAgICAgICAvL1RoaXMgaXMgaW5kaXNwZW5zYWJsZSBmb3IgdGhlIGltcG9ydE1lc2ggZnVuY3Rpb25cclxuICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWxUb1VzZS5wdXNoKHRoaXMuX21lc2hlc0Zyb21PYmpbal0ubWF0ZXJpYWxOYW1lKTtcclxuICAgICAgICAgICAgLy9JZiB0aGUgbWVzaCBpcyBhIGxpbmUgbWVzaFxyXG4gICAgICAgICAgICBpZiAodGhpcy5faGFuZGxlZE1lc2guaGFzTGluZXMpIHtcclxuICAgICAgICAgICAgICAgIGJhYnlsb25NZXNoLl9pbnRlcm5hbE1ldGFkYXRhID8/PSB7fTtcclxuICAgICAgICAgICAgICAgIGJhYnlsb25NZXNoLl9pbnRlcm5hbE1ldGFkYXRhW1wiX2lzTGluZVwiXSA9IHRydWU7IC8vdGhpcyBpcyBhIGxpbmUgbWVzaFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5faGFuZGxlZE1lc2gucG9zaXRpb25zPy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIC8vUHVzaCB0aGUgbWVzaCBpbnRvIGFuIGFycmF5XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYWJ5bG9uTWVzaGVzQXJyYXkucHVzaChiYWJ5bG9uTWVzaCk7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdmVydGV4RGF0YTogVmVydGV4RGF0YSA9IG5ldyBWZXJ0ZXhEYXRhKCk7IC8vVGhlIGNvbnRhaW5lciBmb3IgdGhlIHZhbHVlc1xyXG4gICAgICAgICAgICAvL1NldCB0aGUgZGF0YSBmb3IgdGhlIGJhYnlsb25NZXNoXHJcbiAgICAgICAgICAgIHZlcnRleERhdGEudXZzID0gdGhpcy5faGFuZGxlZE1lc2gudXZzO1xyXG4gICAgICAgICAgICB2ZXJ0ZXhEYXRhLmluZGljZXMgPSB0aGlzLl9oYW5kbGVkTWVzaC5pbmRpY2VzO1xyXG4gICAgICAgICAgICB2ZXJ0ZXhEYXRhLnBvc2l0aW9ucyA9IHRoaXMuX2hhbmRsZWRNZXNoLnBvc2l0aW9ucztcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLmNvbXB1dGVOb3JtYWxzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBub3JtYWxzOiBBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuICAgICAgICAgICAgICAgIFZlcnRleERhdGEuQ29tcHV0ZU5vcm1hbHModGhpcy5faGFuZGxlZE1lc2gucG9zaXRpb25zLCB0aGlzLl9oYW5kbGVkTWVzaC5pbmRpY2VzLCBub3JtYWxzKTtcclxuICAgICAgICAgICAgICAgIHZlcnRleERhdGEubm9ybWFscyA9IG5vcm1hbHM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhEYXRhLm5vcm1hbHMgPSB0aGlzLl9oYW5kbGVkTWVzaC5ub3JtYWxzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy5pbXBvcnRWZXJ0ZXhDb2xvcnMpIHtcclxuICAgICAgICAgICAgICAgIHZlcnRleERhdGEuY29sb3JzID0gdGhpcy5faGFuZGxlZE1lc2guY29sb3JzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIGZyb20gdGhlIFZlcnRleEJ1ZmZlciB0byB0aGUgY3VycmVudCBNZXNoXHJcbiAgICAgICAgICAgIHZlcnRleERhdGEuYXBwbHlUb01lc2goYmFieWxvbk1lc2gpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMuaW52ZXJ0WSkge1xyXG4gICAgICAgICAgICAgICAgYmFieWxvbk1lc2guc2NhbGluZy55ICo9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy5vcHRpbWl6ZU5vcm1hbHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29wdGltaXplTm9ybWFscyhiYWJ5bG9uTWVzaCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vUHVzaCB0aGUgbWVzaCBpbnRvIGFuIGFycmF5XHJcbiAgICAgICAgICAgIHRoaXMuX2JhYnlsb25NZXNoZXNBcnJheS5wdXNoKGJhYnlsb25NZXNoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9oYW5kbGVkTWVzaC5kaXJlY3RNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgYmFieWxvbk1lc2gubWF0ZXJpYWwgPSB0aGlzLl9oYW5kbGVkTWVzaC5kaXJlY3RNYXRlcmlhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8taW50ZXJuYWwtbW9kdWxlcyAqL1xyXG5pbXBvcnQgKiBhcyBMb2FkZXJzIGZyb20gXCJsb2FkZXJzL09CSi9pbmRleFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGVudHJ5IHBvaW50IGZvciB0aGUgVU1EIG1vZHVsZS5cclxuICogVGhlIGVudHJ5IHBvaW50IGZvciBhIGZ1dHVyZSBFU00gcGFja2FnZSBzaG91bGQgYmUgaW5kZXgudHNcclxuICovXHJcbmNvbnN0IGdsb2JhbE9iamVjdCA9IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdW5kZWZpbmVkO1xyXG5pZiAodHlwZW9mIGdsb2JhbE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gTG9hZGVycykge1xyXG4gICAgICAgIGlmICghKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OW2tleV0pIHtcclxuICAgICAgICAgICAgKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OW2tleV0gPSAoPGFueT5Mb2FkZXJzKVtrZXldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0ICogZnJvbSBcImxvYWRlcnMvT0JKL2luZGV4XCI7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9iYWJ5bG9uanNfTWlzY190b29sc19fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIGxvYWRlcnMgZnJvbSBcIkBsdHMvbG9hZGVycy9sZWdhY3kvbGVnYWN5LW9iakZpbGVMb2FkZXJcIjtcclxuZXhwb3J0IHsgbG9hZGVycyB9O1xyXG5leHBvcnQgZGVmYXVsdCBsb2FkZXJzO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=