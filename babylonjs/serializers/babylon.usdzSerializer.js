(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-serializers", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-serializers"] = factory(require("babylonjs"));
	else
		root["SERIALIZERS"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Maths_math_vector__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/serializers/src/USDZ/index.ts":
/*!**************************************************!*\
  !*** ../../../dev/serializers/src/USDZ/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   USDZExportAsync: () => (/* reexport safe */ _usdzExporter__WEBPACK_IMPORTED_MODULE_0__.USDZExportAsync)
/* harmony export */ });
/* harmony import */ var _usdzExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./usdzExporter */ "../../../dev/serializers/src/USDZ/usdzExporter.ts");
/* eslint-disable import/no-internal-modules */



/***/ }),

/***/ "../../../dev/serializers/src/USDZ/usdzExporter.ts":
/*!*********************************************************!*\
  !*** ../../../dev/serializers/src/USDZ/usdzExporter.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   USDZExportAsync: () => (/* binding */ USDZExportAsync)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/tools */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__);

/* eslint-disable @typescript-eslint/naming-convention */






function BuildHeader() {
    return "#usda 1.0\n    (\n        customLayerData = {\n            string creator = \"Babylon.js USDZExportAsync\"\n        }\n        defaultPrim = \"Root\"\n        metersPerUnit = 1\n        upAxis = \"Y\"\n    )";
}
function BuildSceneStart(options) {
    var alignment = options.includeAnchoringProperties === true
        ? "\n\t\ttoken preliminary:anchoring:type = \"".concat(options.anchoringType, "\"\n\t\ttoken preliminary:planeAnchoring:alignment = \"").concat(options.planeAnchoringAlignment, "\"")
        : "";
    return "def Xform \"Root\"\n    {\n        def Scope \"Scenes\" (\n            kind = \"sceneLibrary\"\n        )\n        {\n            def Xform \"Scene\" (\n                customData = {\n                    bool preliminary_collidesWithEnvironment = 0\n                    string sceneName = \"Scene\"\n                }\n                sceneName = \"Scene\"\n            )\n            {".concat(alignment, "\n            ");
}
function BuildSceneEnd() {
    return "\n            }\n        }\n    }";
}
function BuildMeshVertexCount(geometry) {
    var _a;
    var count = ((_a = geometry.getIndices()) === null || _a === void 0 ? void 0 : _a.length) ? geometry.getTotalIndices() : geometry.getTotalVertices();
    return Array(count / 3)
        .fill(3)
        .join(", ");
}
function BuildMeshVertexIndices(geometry) {
    var index = geometry.getIndices();
    var array = [];
    if (index !== null) {
        for (var i = 0; i < index.length; i++) {
            array.push(index[i]);
        }
    }
    else {
        var length_1 = geometry.getTotalVertices();
        for (var i = 0; i < length_1; i++) {
            array.push(i);
        }
    }
    return array.join(", ");
}
function BuildVector3Array(attribute, options, stride) {
    if (stride === void 0) { stride = 3; }
    var array = [];
    for (var i = 0; i < attribute.length / stride; i++) {
        var x = attribute[i * stride];
        var y = attribute[i * stride + 1];
        var z = attribute[i * stride + 2];
        array.push("(".concat(x.toPrecision(options.precision), ", ").concat(y.toPrecision(options.precision), ", ").concat(z.toPrecision(options.precision), ")"));
    }
    return array.join(", ");
}
function BuildVector2Array(attribute, options) {
    var array = [];
    for (var i = 0; i < attribute.length / 2; i++) {
        var x = attribute[i * 2];
        var y = attribute[i * 2 + 1];
        array.push("(".concat(x.toPrecision(options.precision), ", ").concat((1 - y).toPrecision(options.precision), ")"));
    }
    return array.join(", ");
}
function BuildAdditionalAttributes(geometry, options) {
    var string = "";
    for (var i = 0; i < 4; i++) {
        var id = i > 0 ? i : "";
        var uvAttribute = geometry.getVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind + (id ? id : ""));
        if (uvAttribute) {
            string += "\n\t\ttexCoord2f[] primvars:st".concat(id, " = [").concat(BuildVector2Array(uvAttribute, options), "] (\n\t\t\tinterpolation = \"vertex\"\n\t\t)");
        }
    }
    // vertex colors
    var colorAttribute = geometry.getVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind);
    if (colorAttribute) {
        string += "\n\tcolor3f[] primvars:displayColor = [".concat(BuildVector3Array(colorAttribute, options, 4), "] (\n\t\tinterpolation = \"vertex\"\n\t\t)");
    }
    return string;
}
function BuildMesh(geometry, options) {
    var name = "Geometry";
    var position = geometry.getVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind);
    var normal = geometry.getVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind);
    if (!position || !normal) {
        return;
    }
    return "\n\tdef Mesh \"".concat(name, "\"\n\t{\n\t\tint[] faceVertexCounts = [").concat(BuildMeshVertexCount(geometry), "]\n\t\tint[] faceVertexIndices = [").concat(BuildMeshVertexIndices(geometry), "]\n\t\tnormal3f[] normals = [").concat(BuildVector3Array(normal, options), "] (\n\t\t\tinterpolation = \"vertex\"\n\t\t)\n\t\tpoint3f[] points = [").concat(BuildVector3Array(position, options), "]\n        ").concat(BuildAdditionalAttributes(geometry, options), "\n\t\tuniform token subdivisionScheme = \"none\"\n\t}\n");
}
function BuildMeshObject(geometry, options) {
    var mesh = BuildMesh(geometry, options);
    return "\n        def \"Geometry\"\n        {\n        ".concat(mesh, "\n        }\n        ");
}
function BuildUSDFileAsString(dataToInsert) {
    var output = BuildHeader();
    output += dataToInsert;
    return fflate.strToU8(output);
}
function BuildMatrix(matrix) {
    var array = matrix.m;
    return "( ".concat(BuildMatrixRow(array, 0), ", ").concat(BuildMatrixRow(array, 4), ", ").concat(BuildMatrixRow(array, 8), ", ").concat(BuildMatrixRow(array, 12), " )");
}
function BuildMatrixRow(array, offset) {
    return "(".concat(array[offset + 0], ", ").concat(array[offset + 1], ", ").concat(array[offset + 2], ", ").concat(array[offset + 3], ")");
}
function BuildXform(mesh) {
    var name = "Object_" + mesh.uniqueId;
    var matrix = mesh.getWorldMatrix().clone();
    if (matrix.determinant() < 0) {
        matrix.multiplyToRef(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Matrix.Scaling(-1, 1, 1), matrix);
    }
    var transform = BuildMatrix(matrix);
    return "def Xform \"".concat(name, "\" (\n\tprepend references = @./geometries/Geometry_").concat(mesh.geometry.uniqueId, ".usda@</Geometry>\n\tprepend apiSchemas = [\"MaterialBindingAPI\"]\n)\n{\n\tmatrix4d xformOp:transform = ").concat(transform, "\n\tuniform token[] xformOpOrder = [\"xformOp:transform\"]\t\n\n    rel material:binding = </Materials/Material_").concat(mesh.material.uniqueId, ">\n}\n\n");
}
function BuildMaterials(materials, textureToExports, options) {
    var array = [];
    for (var uuid in materials) {
        var material = materials[uuid];
        array.push(BuildMaterial(material, textureToExports, options));
    }
    return "\n    def \"Materials\"\n{\n".concat(array.join(""), "\n}\n\n");
}
function BuildWrapping(wrapping) {
    switch (wrapping) {
        case babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTURE_CLAMP_ADDRESSMODE:
            return "clamp";
        case babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTURE_MIRROR_ADDRESSMODE:
            return "mirror";
        case babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTURE_WRAP_ADDRESSMODE:
        default:
            return "repeat";
    }
}
function BuildColor4(color) {
    return "(".concat(color.r, ", ").concat(color.g, ", ").concat(color.b, ", 1.0)");
}
function BuildVector2(vector) {
    return "(".concat(vector.x, ", ").concat(vector.y, ")");
}
function BuildColor(color) {
    return "(".concat(color.r, ", ").concat(color.g, ", ").concat(color.b, ")");
}
function BuildTexture(texture, material, mapType, color, textureToExports, options) {
    var id = texture.getInternalTexture().uniqueId + "_" + texture.invertY;
    textureToExports[id] = texture;
    var uv = texture.coordinatesIndex > 0 ? "st" + texture.coordinatesIndex : "st";
    var repeat = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2(texture.uScale, texture.vScale);
    var offset = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2(texture.uOffset, texture.vOffset);
    var rotation = texture.wAng;
    // rotation is around the wrong point. after rotation we need to shift offset again so that we're rotating around the right spot
    var xRotationOffset = Math.sin(rotation);
    var yRotationOffset = Math.cos(rotation);
    // texture coordinates start in the opposite corner, need to correct
    offset.y = 1 - offset.y - repeat.y;
    offset.x += xRotationOffset * repeat.x;
    offset.y += (1 - yRotationOffset) * repeat.y;
    return "\n    def Shader \"PrimvarReader_".concat(mapType, "\"\n    {\n        uniform token info:id = \"UsdPrimvarReader_float2\"\n        float2 inputs:fallback = (0.0, 0.0)\n        token inputs:varname = \"").concat(uv, "\"\n        float2 outputs:result\n    }\n\n    def Shader \"Transform2d_").concat(mapType, "\"\n    {\n        uniform token info:id = \"UsdTransform2d\"\n        token inputs:in.connect = </Materials/Material_").concat(material.uniqueId, "/PrimvarReader_").concat(mapType, ".outputs:result>\n        float inputs:rotation = ").concat((rotation * (180 / Math.PI)).toFixed(options.precision), "\n        float2 inputs:scale = ").concat(BuildVector2(repeat), "\n        float2 inputs:translation = ").concat(BuildVector2(offset), "\n        float2 outputs:result\n    }\n\n    def Shader \"Texture_").concat(texture.uniqueId, "_").concat(mapType, "\"\n    {\n        uniform token info:id = \"UsdUVTexture\"\n        asset inputs:file = @textures/Texture_").concat(id, ".png@\n        float2 inputs:st.connect = </Materials/Material_").concat(material.uniqueId, "/Transform2d_").concat(mapType, ".outputs:result>\n        ").concat(color ? "float4 inputs:scale = " + BuildColor4(color) : "", "\n        token inputs:sourceColorSpace = \"").concat(texture.gammaSpace ? "raw" : "sRGB", "\"\n        token inputs:wrapS = \"").concat(BuildWrapping(texture.wrapU), "\"\n        token inputs:wrapT = \"").concat(BuildWrapping(texture.wrapV), "\"\n        float outputs:r\n        float outputs:g\n        float outputs:b\n        float3 outputs:rgb\n        ").concat(material.needAlphaBlending() ? "float outputs:a" : "", "\n    }");
}
function ExtractTextureInformations(material) {
    var className = material.getClassName();
    switch (className) {
        case "StandardMaterial":
            return {
                diffuseMap: material.diffuseTexture,
                diffuse: material.diffuseColor,
                alphaCutOff: material.alphaCutOff,
                emissiveMap: material.emissiveTexture,
                emissive: material.emissiveColor,
                roughnessMap: null,
                normalMap: null,
                metalnessMap: null,
                roughness: 1,
                metalness: 0,
                aoMap: null,
                aoMapIntensity: 0,
                alphaMap: material.opacityTexture,
                ior: 1,
            };
        case "PBRMaterial":
            return {
                diffuseMap: material.albedoTexture,
                diffuse: material.albedoColor,
                alphaCutOff: material.alphaCutOff,
                emissiveMap: material.emissiveTexture,
                emissive: material.emissiveColor,
                normalMap: material.bumpTexture,
                roughnessMap: material.metallicTexture,
                roughnessChannel: material.useRoughnessFromMetallicTextureAlpha ? "a" : "g",
                roughness: material.roughness || 1,
                metalnessMap: material.metallicTexture,
                metalnessChannel: material.useMetallnessFromMetallicTextureBlue ? "b" : "r",
                metalness: material.metallic || 0,
                aoMap: material.ambientTexture,
                aoMapChannel: material.useAmbientInGrayScale ? "r" : "rgb",
                aoMapIntensity: material.ambientTextureStrength,
                alphaMap: material.opacityTexture,
                ior: material.indexOfRefraction,
            };
        case "PBRMetallicRoughnessMaterial":
            return {
                diffuseMap: material.baseTexture,
                diffuse: material.baseColor,
                alphaCutOff: material.alphaCutOff,
                emissiveMap: material.emissiveTexture,
                emissive: material.emissiveColor,
                normalMap: material.normalTexture,
                roughnessMap: material.metallicTexture,
                roughnessChannel: material.useRoughnessFromMetallicTextureAlpha ? "a" : "g",
                roughness: material.roughness || 1,
                metalnessMap: material.metallicTexture,
                metalnessChannel: material.useMetallnessFromMetallicTextureBlue ? "b" : "r",
                metalness: material.metallic || 0,
                aoMap: material.ambientTexture,
                aoMapChannel: material.useAmbientInGrayScale ? "r" : "rgb",
                aoMapIntensity: material.ambientTextureStrength,
                alphaMap: material.opacityTexture,
                ior: material.indexOfRefraction,
            };
        default:
            return {
                diffuseMap: null,
                diffuse: null,
                emissiveMap: null,
                emissemissiveiveColor: null,
                normalMap: null,
                roughnessMap: null,
                metalnessMap: null,
                alphaCutOff: 0,
                roughness: 0,
                metalness: 0,
                aoMap: null,
                aoMapIntensity: 0,
                alphaMap: null,
                ior: 1,
            };
    }
}
function BuildMaterial(material, textureToExports, options) {
    // https://graphics.pixar.com/usd/docs/UsdPreviewSurface-Proposal.html
    var pad = "			";
    var inputs = [];
    var samplers = [];
    var _a = ExtractTextureInformations(material), diffuseMap = _a.diffuseMap, diffuse = _a.diffuse, alphaCutOff = _a.alphaCutOff, emissiveMap = _a.emissiveMap, emissive = _a.emissive, normalMap = _a.normalMap, roughnessMap = _a.roughnessMap, roughnessChannel = _a.roughnessChannel, roughness = _a.roughness, metalnessMap = _a.metalnessMap, metalnessChannel = _a.metalnessChannel, metalness = _a.metalness, aoMap = _a.aoMap, aoMapChannel = _a.aoMapChannel, aoMapIntensity = _a.aoMapIntensity, alphaMap = _a.alphaMap, ior = _a.ior;
    if (diffuseMap !== null) {
        inputs.push("".concat(pad, "color3f inputs:diffuseColor.connect = </Materials/Material_").concat(material.uniqueId, "/Texture_").concat(diffuseMap.uniqueId, "_diffuse.outputs:rgb>"));
        if (material.needAlphaBlending()) {
            inputs.push("".concat(pad, "float inputs:opacity.connect = </Materials/Material_").concat(material.uniqueId, "/Texture_").concat(diffuseMap.uniqueId, "_diffuse.outputs:a>"));
        }
        else if (material.needAlphaTesting()) {
            inputs.push("".concat(pad, "float inputs:opacity.connect = </Materials/Material_").concat(material.uniqueId, "/Texture_").concat(diffuseMap.uniqueId, "_diffuse.outputs:a>"));
            inputs.push("".concat(pad, "float inputs:opacityThreshold = ").concat(alphaCutOff));
        }
        samplers.push(BuildTexture(diffuseMap, material, "diffuse", diffuse, textureToExports, options));
    }
    else {
        inputs.push("".concat(pad, "color3f inputs:diffuseColor = ").concat(BuildColor(diffuse || babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color3.White())));
    }
    if (emissiveMap !== null) {
        inputs.push("".concat(pad, "color3f inputs:emissiveColor.connect = </Materials/Material_").concat(material.uniqueId, "/Texture_").concat(emissiveMap.uniqueId, "_emissive.outputs:rgb>"));
        samplers.push(BuildTexture(emissiveMap, material, "emissive", emissive, textureToExports, options));
    }
    else if (emissive && emissive.toLuminance() > 0) {
        inputs.push("".concat(pad, "color3f inputs:emissiveColor = ").concat(BuildColor(emissive)));
    }
    if (normalMap !== null) {
        inputs.push("".concat(pad, "normal3f inputs:normal.connect = </Materials/Material_").concat(material.uniqueId, "/Texture_").concat(normalMap.uniqueId, "_normal.outputs:rgb>"));
        samplers.push(BuildTexture(normalMap, material, "normal", null, textureToExports, options));
    }
    if (aoMap !== null) {
        inputs.push("".concat(pad, "float inputs:occlusion.connect = </Materials/Material_").concat(material.uniqueId, "/Texture_").concat(aoMap.uniqueId, "_occlusion.outputs:").concat(aoMapChannel, ">"));
        samplers.push(BuildTexture(aoMap, material, "occlusion", new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color3(aoMapIntensity, aoMapIntensity, aoMapIntensity), textureToExports, options));
    }
    if (roughnessMap !== null) {
        inputs.push("".concat(pad, "float inputs:roughness.connect = </Materials/Material_").concat(material.uniqueId, "/Texture_").concat(roughnessMap.uniqueId, "_roughness.outputs:").concat(roughnessChannel, ">"));
        samplers.push(BuildTexture(roughnessMap, material, "roughness", new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color3(roughness, roughness, roughness), textureToExports, options));
    }
    else {
        inputs.push("".concat(pad, "float inputs:roughness = ").concat(roughness));
    }
    if (metalnessMap !== null) {
        inputs.push("".concat(pad, "float inputs:metallic.connect = </Materials/Material_").concat(material.uniqueId, "/Texture_").concat(metalnessMap.uniqueId, "_metallic.outputs:").concat(metalnessChannel, ">"));
        samplers.push(BuildTexture(metalnessMap, material, "metallic", new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color3(metalness, metalness, metalness), textureToExports, options));
    }
    else {
        inputs.push("".concat(pad, "float inputs:metallic = ").concat(metalness));
    }
    if (alphaMap !== null) {
        inputs.push("".concat(pad, "float inputs:opacity.connect = </Materials/Material_").concat(material.uniqueId, "/Texture_").concat(alphaMap.uniqueId, "_opacity.outputs:r>"));
        inputs.push("".concat(pad, "float inputs:opacityThreshold = 0.0001"));
        samplers.push(BuildTexture(alphaMap, material, "opacity", null, textureToExports, options));
    }
    else {
        inputs.push("".concat(pad, "float inputs:opacity = ").concat(material.alpha));
    }
    inputs.push("".concat(pad, "float inputs:ior = ").concat(ior));
    return "\n\tdef Material \"Material_".concat(material.uniqueId, "\"\n\t{\n\t\tdef Shader \"PreviewSurface\"\n\t\t{\n\t\t\tuniform token info:id = \"UsdPreviewSurface\"\n").concat(inputs.join("\n"), "\n\t\t\tint inputs:useSpecularWorkflow = 0\n\t\t\ttoken outputs:surface\n\t\t}\n\n\t\ttoken outputs:surface.connect = </Materials/Material_").concat(material.uniqueId, "/PreviewSurface.outputs:surface>\n\n").concat(samplers.join("\n"), "\n\n\t}\n");
}
function BuildCamera(camera, options) {
    var name = "Camera_" + camera.uniqueId;
    var matrix = babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Matrix.RotationY(Math.PI).multiply(camera.getWorldMatrix()); // work towards positive z
    var transform = BuildMatrix(matrix);
    if (camera.mode === babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Constants.ORTHOGRAPHIC_CAMERA) {
        return "def Camera \"".concat(name, "\"\n\t\t{\n\t\t\tmatrix4d xformOp:transform = ").concat(transform, "\n\t\t\tuniform token[] xformOpOrder = [\"xformOp:transform\"]\n\n\t\t\tfloat2 clippingRange = (").concat(camera.minZ.toPrecision(options.precision), ", ").concat(camera.maxZ.toPrecision(options.precision), ")\n\t\t\tfloat horizontalAperture = ").concat(((Math.abs(camera.orthoLeft || 1) + Math.abs(camera.orthoRight || 1)) * 10).toPrecision(options.precision), "\n\t\t\tfloat verticalAperture = ").concat(((Math.abs(camera.orthoTop || 1) + Math.abs(camera.orthoBottom || 1)) * 10).toPrecision(options.precision), "\n\t\t\ttoken projection = \"orthographic\"\n\t\t}\n\t\n\t");
    }
    else {
        var aspect = camera.getEngine().getAspectRatio(camera);
        var sensorwidth = options.cameraSensorWidth || 35;
        return "def Camera \"".concat(name, "\"\n\t\t{\n\t\t\tmatrix4d xformOp:transform = ").concat(transform, "\n\t\t\tuniform token[] xformOpOrder = [\"xformOp:transform\"]\n\n\t\t\tfloat2 clippingRange = (").concat(camera.minZ.toPrecision(options.precision), ", ").concat(camera.maxZ.toPrecision(options.precision), ")\n\t\t\tfloat focalLength = ").concat((sensorwidth / (2 * Math.tan(camera.fov * 0.5))).toPrecision(options.precision), "\n            token projection = \"perspective\"\n\t\t\tfloat horizontalAperture = ").concat((sensorwidth * aspect).toPrecision(options.precision), "\n\t\t\tfloat verticalAperture = ").concat((sensorwidth / aspect).toPrecision(options.precision), "            \n\t\t}\n\t\n\t");
    }
}
/**
 *
 * @param scene scene to export
 * @param options options to configure the export
 * @param meshPredicate predicate to filter the meshes to export
 * @returns a uint8 array containing the USDZ file
 * #H2G5XW#3 - Simple sphere
 * #H2G5XW#4 - Red sphere
 * #5N3RWK#4 - Boombox
 */
function USDZExportAsync(scene, options, meshPredicate) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
        var localOptions, files, output, materialToExports, _i, _a, abstractMesh, mesh, geometry, material, supportedMaterials, geometryFileName, meshObject, textureToExports, _b, _c, _d, _e, id, texture, size, textureData, fileContent, offset, filename, file, headerSize, offsetMod64, padLength, padding;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_f) {
            switch (_f.label) {
                case 0:
                    localOptions = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({ fflateUrl: "https://unpkg.com/fflate@0.8.2", includeAnchoringProperties: true, anchoringType: "plane", planeAnchoringAlignment: "horizontal", modelFileName: "model.usda", precision: 5, exportCamera: false, cameraSensorWidth: 35 }, options);
                    if (!(typeof fflate === "undefined")) return [3 /*break*/, 2];
                    return [4 /*yield*/, babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Tools.LoadScriptAsync(localOptions.fflateUrl)];
                case 1:
                    _f.sent();
                    _f.label = 2;
                case 2:
                    files = {};
                    // model file should be first in USDZ archive so we init it here
                    files[localOptions.modelFileName] = null;
                    output = BuildHeader();
                    output += BuildSceneStart(localOptions);
                    materialToExports = {};
                    // Meshes
                    for (_i = 0, _a = scene.meshes; _i < _a.length; _i++) {
                        abstractMesh = _a[_i];
                        if (abstractMesh.getTotalVertices() === 0) {
                            continue;
                        }
                        mesh = abstractMesh;
                        geometry = mesh.geometry;
                        material = mesh.material;
                        if (!material || !geometry || (meshPredicate && !meshPredicate(mesh))) {
                            continue;
                        }
                        supportedMaterials = ["StandardMaterial", "PBRMaterial", "PBRMetallicRoughnessMaterial"];
                        if (supportedMaterials.indexOf(material.getClassName()) !== -1) {
                            geometryFileName = "geometries/Geometry_" + geometry.uniqueId + ".usda";
                            if (!(geometryFileName in files)) {
                                meshObject = BuildMeshObject(geometry, localOptions);
                                files[geometryFileName] = BuildUSDFileAsString(meshObject);
                            }
                            if (!(material.uniqueId in materialToExports)) {
                                materialToExports[material.uniqueId] = material;
                            }
                            output += BuildXform(mesh);
                        }
                        else {
                            babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("USDZExportAsync does not support this material type: " + material.getClassName());
                        }
                    }
                    // Camera
                    if (scene.activeCamera && localOptions.exportCamera) {
                        output += BuildCamera(scene.activeCamera, localOptions);
                    }
                    // Close scene
                    output += BuildSceneEnd();
                    textureToExports = {};
                    output += BuildMaterials(materialToExports, textureToExports, localOptions);
                    // Compress
                    files[localOptions.modelFileName] = fflate.strToU8(output);
                    _b = textureToExports;
                    _c = [];
                    for (_d in _b)
                        _c.push(_d);
                    _e = 0;
                    _f.label = 3;
                case 3:
                    if (!(_e < _c.length)) return [3 /*break*/, 7];
                    _d = _c[_e];
                    if (!(_d in _b)) return [3 /*break*/, 6];
                    id = _d;
                    texture = textureToExports[id];
                    size = texture.getSize();
                    return [4 /*yield*/, texture.readPixels()];
                case 4:
                    textureData = _f.sent();
                    if (!textureData) {
                        throw new Error("Texture data is not available");
                    }
                    return [4 /*yield*/, babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.DumpTools.DumpDataAsync(size.width, size.height, textureData, "image/png", undefined, false, true)];
                case 5:
                    fileContent = _f.sent();
                    files["textures/Texture_".concat(id, ".png")] = new Uint8Array(fileContent).slice(); // This is to avoid getting a link and not a copy
                    _f.label = 6;
                case 6:
                    _e++;
                    return [3 /*break*/, 3];
                case 7:
                    offset = 0;
                    for (filename in files) {
                        file = files[filename];
                        if (!file) {
                            continue;
                        }
                        headerSize = 34 + filename.length;
                        offset += headerSize;
                        offsetMod64 = offset & 63;
                        if (offsetMod64 !== 4) {
                            padLength = 64 - offsetMod64;
                            padding = new Uint8Array(padLength);
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            files[filename] = [file, { extra: { 12345: padding } }];
                        }
                        offset = file.length;
                    }
                    return [2 /*return*/, fflate.zipSync(files, { level: 0 })];
            }
        });
    });
}


/***/ }),

/***/ "../../../lts/serializers/src/legacy/legacy-usdzSerializer.ts":
/*!********************************************************************!*\
  !*** ../../../lts/serializers/src/legacy/legacy-usdzSerializer.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   USDZExportAsync: () => (/* reexport safe */ serializers_USDZ_index__WEBPACK_IMPORTED_MODULE_0__.USDZExportAsync)
/* harmony export */ });
/* harmony import */ var serializers_USDZ_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! serializers/USDZ/index */ "../../../dev/serializers/src/USDZ/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var serializer in serializers_USDZ_index__WEBPACK_IMPORTED_MODULE_0__) {
        globalObject.BABYLON[serializer] = serializers_USDZ_index__WEBPACK_IMPORTED_MODULE_0__[serializer];
    }
}



/***/ }),

/***/ "babylonjs/Maths/math.vector":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Maths_math_vector__;

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
/*!*********************!*\
  !*** ./src/USDZ.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   serializers: () => (/* reexport module object */ _lts_serializers_legacy_legacy_usdzSerializer__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_serializers_legacy_legacy_usdzSerializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/serializers/legacy/legacy-usdzSerializer */ "../../../lts/serializers/src/legacy/legacy-usdzSerializer.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_serializers_legacy_legacy_usdzSerializer__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi51c2R6U2VyaWFsaXplci5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTtBQUVBO0FBT0E7QUFDQTtBQUdBO0FBQ0E7QUFrREE7QUFDQTtBQVNBO0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQWVBO0FBRUE7QUFDQTtBQUlBO0FBRUE7O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBSUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBSUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQWFBO0FBRUE7QUFDQTtBQUNBO0FBTUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBWUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQU9BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBUUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQWtDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBb0JBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFpQkE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFZQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBYUE7QUFDQTtBQUVBOzs7Ozs7Ozs7QUFTQTtBQUNBOzs7Ozs7QUFDQTtBQWFBO0FBQ0E7O0FBQUE7OztBQUlBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTs7Ozs7Ozs7Ozs7QUFDQTtBQUVBO0FBQ0E7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7QUFBQTtBQUVBOzs7Ozs7QUFNQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3h0QkE7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7OztBQ2RBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2haQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9VU0RaL2luZGV4LnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvVVNEWi91c2R6RXhwb3J0ZXIudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vbHRzL3NlcmlhbGl6ZXJzL3NyYy9sZWdhY3kvbGVnYWN5LXVzZHpTZXJpYWxpemVyLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTL2V4dGVybmFsIHVtZCB7XCJyb290XCI6XCJCQUJZTE9OXCIsXCJjb21tb25qc1wiOlwiYmFieWxvbmpzXCIsXCJjb21tb25qczJcIjpcImJhYnlsb25qc1wiLFwiYW1kXCI6XCJiYWJ5bG9uanNcIn0iLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5tanMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1NFUklBTElaRVJTL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1NFUklBTElaRVJTLy4vc3JjL1VTRFoudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYmFieWxvbmpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiYmFieWxvbmpzLXNlcmlhbGl6ZXJzXCIsIFtcImJhYnlsb25qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJiYWJ5bG9uanMtc2VyaWFsaXplcnNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWJ5bG9uanNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlNFUklBTElaRVJTXCJdID0gZmFjdG9yeShyb290W1wiQkFCWUxPTlwiXSk7XG59KSgodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHRoaXMpLCAoX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9iYWJ5bG9uanNfTWF0aHNfbWF0aF92ZWN0b3JfXykgPT4ge1xucmV0dXJuICIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzICovXHJcbmV4cG9ydCAqIGZyb20gXCIuL3VzZHpFeHBvcnRlclwiO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cclxuaW1wb3J0IHsgVmVydGV4QnVmZmVyIH0gZnJvbSBcImNvcmUvQnVmZmVycy9idWZmZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBDYW1lcmEgfSBmcm9tIFwiY29yZS9DYW1lcmFzL2NhbWVyYVwiO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiY29yZS9FbmdpbmVzL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgUEJSTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvUEJSL3Bick1hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgUEJSTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9QQlIvcGJyTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IFN0YW5kYXJkTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvc3RhbmRhcmRNYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2Jhc2VUZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy90ZXh0dXJlXCI7XHJcbmltcG9ydCB7IENvbG9yMyB9IGZyb20gXCJjb3JlL01hdGhzL21hdGguY29sb3JcIjtcclxuaW1wb3J0IHsgTWF0cml4LCBWZWN0b3IyIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC52ZWN0b3JcIjtcclxuaW1wb3J0IHR5cGUgeyBHZW9tZXRyeSB9IGZyb20gXCJjb3JlL01lc2hlcy9nZW9tZXRyeVwiO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5pbXBvcnQgeyBEdW1wVG9vbHMgfSBmcm9tIFwiY29yZS9NaXNjL2R1bXBUb29sc1wiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCJjb3JlL01pc2MvdG9vbHNcIjtcclxuaW1wb3J0IHR5cGUgeyBTY2VuZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcbmltcG9ydCB0eXBlIHsgRmxvYXRBcnJheSwgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5cclxuLyoqXHJcbiAqIFBvcnRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvZXhhbXBsZXMvanNtL2V4cG9ydGVycy9VU0RaRXhwb3J0ZXIuanNcclxuICogVGhhbmtzIGEgbG90IHRvIHRoZSB0aHJlZS5qcyB0ZWFtIGZvciB0aGVpciBhbWF6aW5nIHdvcmshXHJcbiAqL1xyXG5cclxuLy8gRkZsYXRlIGFjY2Vzc1xyXG5kZWNsYXJlIGNvbnN0IGZmbGF0ZTogYW55O1xyXG5cclxuLyoqXHJcbiAqIE9wdGlvbnMgZm9yIHRoZSBVU0RaIGV4cG9ydFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJVVNEWkV4cG9ydE9wdGlvbnMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBVUkwgdG8gbG9hZCB0aGUgZmZsYXRlIGxpYnJhcnkgZnJvbVxyXG4gICAgICovXHJcbiAgICBmZmxhdGVVcmw/OiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIEluY2x1ZGUgYW5jaG9yaW5nIHByb3BlcnRpZXMgaW4gdGhlIFVTRFogZmlsZVxyXG4gICAgICovXHJcbiAgICBpbmNsdWRlQW5jaG9yaW5nUHJvcGVydGllcz86IGJvb2xlYW47XHJcbiAgICAvKipcclxuICAgICAqIEFuY2hvcmluZyB0eXBlIChwbGFuZSBieSBkZWZhdWx0KVxyXG4gICAgICovXHJcbiAgICBhbmNob3JpbmdUeXBlPzogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBQbGFuZSBhbmNob3JpbmcgYWxpZ25tZW50IChob3Jpem9udGFsIGJ5IGRlZmF1bHQpXHJcbiAgICAgKi9cclxuICAgIHBsYW5lQW5jaG9yaW5nQWxpZ25tZW50Pzogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBNb2RlbCBmaWxlIG5hbWUgKG1vZGVsLnVzZGEgYnkgZGVmYXVsdClcclxuICAgICAqL1xyXG4gICAgbW9kZWxGaWxlTmFtZT86IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogUHJlY2lzaW9uIHRvIHVzZSBmb3IgbnVtYmVyICg1IGJ5IGRlZmF1bHQpXHJcbiAgICAgKi9cclxuICAgIHByZWNpc2lvbj86IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogRXhwb3J0IHRoZSBjYW1lcmEgKGZhbHNlIGJ5IGRlZmF1bHQpXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydENhbWVyYT86IGJvb2xlYW47XHJcbiAgICAvKipcclxuICAgICAqIENhbWVyYSBzZW5zb3Igd2lkdGggKDM1IGJ5IGRlZmF1bHQpXHJcbiAgICAgKi9cclxuICAgIGNhbWVyYVNlbnNvcldpZHRoPzogbnVtYmVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZEhlYWRlcigpIHtcclxuICAgIHJldHVybiBgI3VzZGEgMS4wXHJcbiAgICAoXHJcbiAgICAgICAgY3VzdG9tTGF5ZXJEYXRhID0ge1xyXG4gICAgICAgICAgICBzdHJpbmcgY3JlYXRvciA9IFwiQmFieWxvbi5qcyBVU0RaRXhwb3J0QXN5bmNcIlxyXG4gICAgICAgIH1cclxuICAgICAgICBkZWZhdWx0UHJpbSA9IFwiUm9vdFwiXHJcbiAgICAgICAgbWV0ZXJzUGVyVW5pdCA9IDFcclxuICAgICAgICB1cEF4aXMgPSBcIllcIlxyXG4gICAgKWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkU2NlbmVTdGFydChvcHRpb25zOiBJVVNEWkV4cG9ydE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGFsaWdubWVudCA9XHJcbiAgICAgICAgb3B0aW9ucy5pbmNsdWRlQW5jaG9yaW5nUHJvcGVydGllcyA9PT0gdHJ1ZVxyXG4gICAgICAgICAgICA/IGBcclxuXHRcdHRva2VuIHByZWxpbWluYXJ5OmFuY2hvcmluZzp0eXBlID0gXCIke29wdGlvbnMuYW5jaG9yaW5nVHlwZX1cIlxyXG5cdFx0dG9rZW4gcHJlbGltaW5hcnk6cGxhbmVBbmNob3Jpbmc6YWxpZ25tZW50ID0gXCIke29wdGlvbnMucGxhbmVBbmNob3JpbmdBbGlnbm1lbnR9XCJgXHJcbiAgICAgICAgICAgIDogXCJcIjtcclxuICAgIHJldHVybiBgZGVmIFhmb3JtIFwiUm9vdFwiXHJcbiAgICB7XHJcbiAgICAgICAgZGVmIFNjb3BlIFwiU2NlbmVzXCIgKFxyXG4gICAgICAgICAgICBraW5kID0gXCJzY2VuZUxpYnJhcnlcIlxyXG4gICAgICAgIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRlZiBYZm9ybSBcIlNjZW5lXCIgKFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBib29sIHByZWxpbWluYXJ5X2NvbGxpZGVzV2l0aEVudmlyb25tZW50ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBzY2VuZU5hbWUgPSBcIlNjZW5lXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9IFwiU2NlbmVcIlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIHske2FsaWdubWVudH1cclxuICAgICAgICAgICAgYDtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRTY2VuZUVuZCgpIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9YDtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRNZXNoVmVydGV4Q291bnQoZ2VvbWV0cnk6IEdlb21ldHJ5KSB7XHJcbiAgICBjb25zdCBjb3VudCA9IGdlb21ldHJ5LmdldEluZGljZXMoKT8ubGVuZ3RoID8gZ2VvbWV0cnkuZ2V0VG90YWxJbmRpY2VzKCkgOiBnZW9tZXRyeS5nZXRUb3RhbFZlcnRpY2VzKCk7XHJcblxyXG4gICAgcmV0dXJuIEFycmF5KGNvdW50IC8gMylcclxuICAgICAgICAuZmlsbCgzKVxyXG4gICAgICAgIC5qb2luKFwiLCBcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkTWVzaFZlcnRleEluZGljZXMoZ2VvbWV0cnk6IEdlb21ldHJ5KSB7XHJcbiAgICBjb25zdCBpbmRleCA9IGdlb21ldHJ5LmdldEluZGljZXMoKTtcclxuICAgIGNvbnN0IGFycmF5ID0gW107XHJcblxyXG4gICAgaWYgKGluZGV4ICE9PSBudWxsKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRleC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBhcnJheS5wdXNoKGluZGV4W2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGdlb21ldHJ5LmdldFRvdGFsVmVydGljZXMoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBhcnJheS5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYXJyYXkuam9pbihcIiwgXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZFZlY3RvcjNBcnJheShhdHRyaWJ1dGU6IEZsb2F0QXJyYXksIG9wdGlvbnM6IElVU0RaRXhwb3J0T3B0aW9ucywgc3RyaWRlID0gMykge1xyXG4gICAgY29uc3QgYXJyYXkgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJpYnV0ZS5sZW5ndGggLyBzdHJpZGU7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHggPSBhdHRyaWJ1dGVbaSAqIHN0cmlkZV07XHJcbiAgICAgICAgY29uc3QgeSA9IGF0dHJpYnV0ZVtpICogc3RyaWRlICsgMV07XHJcbiAgICAgICAgY29uc3QgeiA9IGF0dHJpYnV0ZVtpICogc3RyaWRlICsgMl07XHJcblxyXG4gICAgICAgIGFycmF5LnB1c2goYCgke3gudG9QcmVjaXNpb24ob3B0aW9ucy5wcmVjaXNpb24pfSwgJHt5LnRvUHJlY2lzaW9uKG9wdGlvbnMucHJlY2lzaW9uKX0sICR7ei50b1ByZWNpc2lvbihvcHRpb25zLnByZWNpc2lvbil9KWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhcnJheS5qb2luKFwiLCBcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkVmVjdG9yMkFycmF5KGF0dHJpYnV0ZTogRmxvYXRBcnJheSwgb3B0aW9uczogSVVTRFpFeHBvcnRPcHRpb25zKSB7XHJcbiAgICBjb25zdCBhcnJheSA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0cmlidXRlLmxlbmd0aCAvIDI7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHggPSBhdHRyaWJ1dGVbaSAqIDJdO1xyXG4gICAgICAgIGNvbnN0IHkgPSBhdHRyaWJ1dGVbaSAqIDIgKyAxXTtcclxuXHJcbiAgICAgICAgYXJyYXkucHVzaChgKCR7eC50b1ByZWNpc2lvbihvcHRpb25zLnByZWNpc2lvbil9LCAkeygxIC0geSkudG9QcmVjaXNpb24ob3B0aW9ucy5wcmVjaXNpb24pfSlgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYXJyYXkuam9pbihcIiwgXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZEFkZGl0aW9uYWxBdHRyaWJ1dGVzKGdlb21ldHJ5OiBHZW9tZXRyeSwgb3B0aW9uczogSVVTRFpFeHBvcnRPcHRpb25zKSB7XHJcbiAgICBsZXQgc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGlkID0gaSA+IDAgPyBpIDogXCJcIjtcclxuICAgICAgICBjb25zdCB1dkF0dHJpYnV0ZSA9IGdlb21ldHJ5LmdldFZlcnRpY2VzRGF0YShWZXJ0ZXhCdWZmZXIuVVZLaW5kICsgKGlkID8gaWQgOiBcIlwiKSk7XHJcblxyXG4gICAgICAgIGlmICh1dkF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgICBzdHJpbmcgKz0gYFxyXG5cdFx0dGV4Q29vcmQyZltdIHByaW12YXJzOnN0JHtpZH0gPSBbJHtCdWlsZFZlY3RvcjJBcnJheSh1dkF0dHJpYnV0ZSwgb3B0aW9ucyl9XSAoXHJcblx0XHRcdGludGVycG9sYXRpb24gPSBcInZlcnRleFwiXHJcblx0XHQpYDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdmVydGV4IGNvbG9yc1xyXG5cclxuICAgIGNvbnN0IGNvbG9yQXR0cmlidXRlID0gZ2VvbWV0cnkuZ2V0VmVydGljZXNEYXRhKFZlcnRleEJ1ZmZlci5Db2xvcktpbmQpO1xyXG5cclxuICAgIGlmIChjb2xvckF0dHJpYnV0ZSkge1xyXG4gICAgICAgIHN0cmluZyArPSBgXHJcblx0Y29sb3IzZltdIHByaW12YXJzOmRpc3BsYXlDb2xvciA9IFske0J1aWxkVmVjdG9yM0FycmF5KGNvbG9yQXR0cmlidXRlLCBvcHRpb25zLCA0KX1dIChcclxuXHRcdGludGVycG9sYXRpb24gPSBcInZlcnRleFwiXHJcblx0XHQpYDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RyaW5nO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZE1lc2goZ2VvbWV0cnk6IEdlb21ldHJ5LCBvcHRpb25zOiBJVVNEWkV4cG9ydE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IG5hbWUgPSBcIkdlb21ldHJ5XCI7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IGdlb21ldHJ5LmdldFZlcnRpY2VzRGF0YShWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kKTtcclxuICAgIGNvbnN0IG5vcm1hbCA9IGdlb21ldHJ5LmdldFZlcnRpY2VzRGF0YShWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kKTtcclxuXHJcbiAgICBpZiAoIXBvc2l0aW9uIHx8ICFub3JtYWwpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGBcclxuXHRkZWYgTWVzaCBcIiR7bmFtZX1cIlxyXG5cdHtcclxuXHRcdGludFtdIGZhY2VWZXJ0ZXhDb3VudHMgPSBbJHtCdWlsZE1lc2hWZXJ0ZXhDb3VudChnZW9tZXRyeSl9XVxyXG5cdFx0aW50W10gZmFjZVZlcnRleEluZGljZXMgPSBbJHtCdWlsZE1lc2hWZXJ0ZXhJbmRpY2VzKGdlb21ldHJ5KX1dXHJcblx0XHRub3JtYWwzZltdIG5vcm1hbHMgPSBbJHtCdWlsZFZlY3RvcjNBcnJheShub3JtYWwsIG9wdGlvbnMpfV0gKFxyXG5cdFx0XHRpbnRlcnBvbGF0aW9uID0gXCJ2ZXJ0ZXhcIlxyXG5cdFx0KVxyXG5cdFx0cG9pbnQzZltdIHBvaW50cyA9IFske0J1aWxkVmVjdG9yM0FycmF5KHBvc2l0aW9uLCBvcHRpb25zKX1dXHJcbiAgICAgICAgJHtCdWlsZEFkZGl0aW9uYWxBdHRyaWJ1dGVzKGdlb21ldHJ5LCBvcHRpb25zKX1cclxuXHRcdHVuaWZvcm0gdG9rZW4gc3ViZGl2aXNpb25TY2hlbWUgPSBcIm5vbmVcIlxyXG5cdH1cclxuYDtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRNZXNoT2JqZWN0KGdlb21ldHJ5OiBHZW9tZXRyeSwgb3B0aW9uczogSVVTRFpFeHBvcnRPcHRpb25zKSB7XHJcbiAgICBjb25zdCBtZXNoID0gQnVpbGRNZXNoKGdlb21ldHJ5LCBvcHRpb25zKTtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgZGVmIFwiR2VvbWV0cnlcIlxyXG4gICAgICAgIHtcclxuICAgICAgICAke21lc2h9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkVVNERmlsZUFzU3RyaW5nKGRhdGFUb0luc2VydDogc3RyaW5nKSB7XHJcbiAgICBsZXQgb3V0cHV0ID0gQnVpbGRIZWFkZXIoKTtcclxuICAgIG91dHB1dCArPSBkYXRhVG9JbnNlcnQ7XHJcbiAgICByZXR1cm4gZmZsYXRlLnN0clRvVTgob3V0cHV0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRNYXRyaXgobWF0cml4OiBNYXRyaXgpIHtcclxuICAgIGNvbnN0IGFycmF5ID0gbWF0cml4Lm0gYXMgbnVtYmVyW107XHJcblxyXG4gICAgcmV0dXJuIGAoICR7QnVpbGRNYXRyaXhSb3coYXJyYXksIDApfSwgJHtCdWlsZE1hdHJpeFJvdyhhcnJheSwgNCl9LCAke0J1aWxkTWF0cml4Um93KGFycmF5LCA4KX0sICR7QnVpbGRNYXRyaXhSb3coYXJyYXksIDEyKX0gKWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkTWF0cml4Um93KGFycmF5OiBudW1iZXJbXSwgb2Zmc2V0OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBgKCR7YXJyYXlbb2Zmc2V0ICsgMF19LCAke2FycmF5W29mZnNldCArIDFdfSwgJHthcnJheVtvZmZzZXQgKyAyXX0sICR7YXJyYXlbb2Zmc2V0ICsgM119KWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkWGZvcm0obWVzaDogTWVzaCkge1xyXG4gICAgY29uc3QgbmFtZSA9IFwiT2JqZWN0X1wiICsgbWVzaC51bmlxdWVJZDtcclxuICAgIGNvbnN0IG1hdHJpeCA9IG1lc2guZ2V0V29ybGRNYXRyaXgoKS5jbG9uZSgpO1xyXG5cclxuICAgIGlmIChtYXRyaXguZGV0ZXJtaW5hbnQoKSA8IDApIHtcclxuICAgICAgICBtYXRyaXgubXVsdGlwbHlUb1JlZihNYXRyaXguU2NhbGluZygtMSwgMSwgMSksIG1hdHJpeCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBCdWlsZE1hdHJpeChtYXRyaXgpO1xyXG5cclxuICAgIHJldHVybiBgZGVmIFhmb3JtIFwiJHtuYW1lfVwiIChcclxuXHRwcmVwZW5kIHJlZmVyZW5jZXMgPSBALi9nZW9tZXRyaWVzL0dlb21ldHJ5XyR7bWVzaC5nZW9tZXRyeSEudW5pcXVlSWR9LnVzZGFAPC9HZW9tZXRyeT5cclxuXHRwcmVwZW5kIGFwaVNjaGVtYXMgPSBbXCJNYXRlcmlhbEJpbmRpbmdBUElcIl1cclxuKVxyXG57XHJcblx0bWF0cml4NGQgeGZvcm1PcDp0cmFuc2Zvcm0gPSAke3RyYW5zZm9ybX1cclxuXHR1bmlmb3JtIHRva2VuW10geGZvcm1PcE9yZGVyID0gW1wieGZvcm1PcDp0cmFuc2Zvcm1cIl1cdFxyXG5cclxuICAgIHJlbCBtYXRlcmlhbDpiaW5kaW5nID0gPC9NYXRlcmlhbHMvTWF0ZXJpYWxfJHttZXNoLm1hdGVyaWFsIS51bmlxdWVJZH0+XHJcbn1cclxuXHJcbmA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkTWF0ZXJpYWxzKG1hdGVyaWFsczogeyBba2V5OiBzdHJpbmddOiBNYXRlcmlhbCB9LCB0ZXh0dXJlVG9FeHBvcnRzOiB7IFtrZXk6IHN0cmluZ106IEJhc2VUZXh0dXJlIH0sIG9wdGlvbnM6IElVU0RaRXhwb3J0T3B0aW9ucykge1xyXG4gICAgY29uc3QgYXJyYXkgPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHV1aWQgaW4gbWF0ZXJpYWxzKSB7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBtYXRlcmlhbHNbdXVpZF07XHJcblxyXG4gICAgICAgIGFycmF5LnB1c2goQnVpbGRNYXRlcmlhbChtYXRlcmlhbCwgdGV4dHVyZVRvRXhwb3J0cywgb3B0aW9ucykpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBgXHJcbiAgICBkZWYgXCJNYXRlcmlhbHNcIlxyXG57XHJcbiR7YXJyYXkuam9pbihcIlwiKX1cclxufVxyXG5cclxuYDtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRXcmFwcGluZyh3cmFwcGluZzogbnVtYmVyKSB7XHJcbiAgICBzd2l0Y2ggKHdyYXBwaW5nKSB7XHJcbiAgICAgICAgY2FzZSBDb25zdGFudHMuVEVYVFVSRV9DTEFNUF9BRERSRVNTTU9ERTpcclxuICAgICAgICAgICAgcmV0dXJuIFwiY2xhbXBcIjtcclxuICAgICAgICBjYXNlIENvbnN0YW50cy5URVhUVVJFX01JUlJPUl9BRERSRVNTTU9ERTpcclxuICAgICAgICAgICAgcmV0dXJuIFwibWlycm9yXCI7XHJcbiAgICAgICAgY2FzZSBDb25zdGFudHMuVEVYVFVSRV9XUkFQX0FERFJFU1NNT0RFOlxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcInJlcGVhdFwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZENvbG9yNChjb2xvcjogQ29sb3IzKSB7XHJcbiAgICByZXR1cm4gYCgke2NvbG9yLnJ9LCAke2NvbG9yLmd9LCAke2NvbG9yLmJ9LCAxLjApYDtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRWZWN0b3IyKHZlY3RvcjogVmVjdG9yMikge1xyXG4gICAgcmV0dXJuIGAoJHt2ZWN0b3IueH0sICR7dmVjdG9yLnl9KWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkQ29sb3IoY29sb3I6IENvbG9yMykge1xyXG4gICAgcmV0dXJuIGAoJHtjb2xvci5yfSwgJHtjb2xvci5nfSwgJHtjb2xvci5ifSlgO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZFRleHR1cmUoXHJcbiAgICB0ZXh0dXJlOiBUZXh0dXJlLFxyXG4gICAgbWF0ZXJpYWw6IE1hdGVyaWFsLFxyXG4gICAgbWFwVHlwZTogc3RyaW5nLFxyXG4gICAgY29sb3I6IE51bGxhYmxlPENvbG9yMz4sXHJcbiAgICB0ZXh0dXJlVG9FeHBvcnRzOiB7IFtrZXk6IHN0cmluZ106IEJhc2VUZXh0dXJlIH0sXHJcbiAgICBvcHRpb25zOiBJVVNEWkV4cG9ydE9wdGlvbnNcclxuKSB7XHJcbiAgICBjb25zdCBpZCA9IHRleHR1cmUuZ2V0SW50ZXJuYWxUZXh0dXJlKCkhLnVuaXF1ZUlkICsgXCJfXCIgKyB0ZXh0dXJlLmludmVydFk7XHJcblxyXG4gICAgdGV4dHVyZVRvRXhwb3J0c1tpZF0gPSB0ZXh0dXJlO1xyXG5cclxuICAgIGNvbnN0IHV2ID0gdGV4dHVyZS5jb29yZGluYXRlc0luZGV4ID4gMCA/IFwic3RcIiArIHRleHR1cmUuY29vcmRpbmF0ZXNJbmRleCA6IFwic3RcIjtcclxuICAgIGNvbnN0IHJlcGVhdCA9IG5ldyBWZWN0b3IyKHRleHR1cmUudVNjYWxlLCB0ZXh0dXJlLnZTY2FsZSk7XHJcbiAgICBjb25zdCBvZmZzZXQgPSBuZXcgVmVjdG9yMih0ZXh0dXJlLnVPZmZzZXQsIHRleHR1cmUudk9mZnNldCk7XHJcbiAgICBjb25zdCByb3RhdGlvbiA9IHRleHR1cmUud0FuZztcclxuXHJcbiAgICAvLyByb3RhdGlvbiBpcyBhcm91bmQgdGhlIHdyb25nIHBvaW50LiBhZnRlciByb3RhdGlvbiB3ZSBuZWVkIHRvIHNoaWZ0IG9mZnNldCBhZ2FpbiBzbyB0aGF0IHdlJ3JlIHJvdGF0aW5nIGFyb3VuZCB0aGUgcmlnaHQgc3BvdFxyXG4gICAgY29uc3QgeFJvdGF0aW9uT2Zmc2V0ID0gTWF0aC5zaW4ocm90YXRpb24pO1xyXG4gICAgY29uc3QgeVJvdGF0aW9uT2Zmc2V0ID0gTWF0aC5jb3Mocm90YXRpb24pO1xyXG5cclxuICAgIC8vIHRleHR1cmUgY29vcmRpbmF0ZXMgc3RhcnQgaW4gdGhlIG9wcG9zaXRlIGNvcm5lciwgbmVlZCB0byBjb3JyZWN0XHJcbiAgICBvZmZzZXQueSA9IDEgLSBvZmZzZXQueSAtIHJlcGVhdC55O1xyXG5cclxuICAgIG9mZnNldC54ICs9IHhSb3RhdGlvbk9mZnNldCAqIHJlcGVhdC54O1xyXG4gICAgb2Zmc2V0LnkgKz0gKDEgLSB5Um90YXRpb25PZmZzZXQpICogcmVwZWF0Lnk7XHJcblxyXG4gICAgcmV0dXJuIGBcclxuICAgIGRlZiBTaGFkZXIgXCJQcmltdmFyUmVhZGVyXyR7bWFwVHlwZX1cIlxyXG4gICAge1xyXG4gICAgICAgIHVuaWZvcm0gdG9rZW4gaW5mbzppZCA9IFwiVXNkUHJpbXZhclJlYWRlcl9mbG9hdDJcIlxyXG4gICAgICAgIGZsb2F0MiBpbnB1dHM6ZmFsbGJhY2sgPSAoMC4wLCAwLjApXHJcbiAgICAgICAgdG9rZW4gaW5wdXRzOnZhcm5hbWUgPSBcIiR7dXZ9XCJcclxuICAgICAgICBmbG9hdDIgb3V0cHV0czpyZXN1bHRcclxuICAgIH1cclxuXHJcbiAgICBkZWYgU2hhZGVyIFwiVHJhbnNmb3JtMmRfJHttYXBUeXBlfVwiXHJcbiAgICB7XHJcbiAgICAgICAgdW5pZm9ybSB0b2tlbiBpbmZvOmlkID0gXCJVc2RUcmFuc2Zvcm0yZFwiXHJcbiAgICAgICAgdG9rZW4gaW5wdXRzOmluLmNvbm5lY3QgPSA8L01hdGVyaWFscy9NYXRlcmlhbF8ke21hdGVyaWFsLnVuaXF1ZUlkfS9QcmltdmFyUmVhZGVyXyR7bWFwVHlwZX0ub3V0cHV0czpyZXN1bHQ+XHJcbiAgICAgICAgZmxvYXQgaW5wdXRzOnJvdGF0aW9uID0gJHsocm90YXRpb24gKiAoMTgwIC8gTWF0aC5QSSkpLnRvRml4ZWQob3B0aW9ucy5wcmVjaXNpb24pfVxyXG4gICAgICAgIGZsb2F0MiBpbnB1dHM6c2NhbGUgPSAke0J1aWxkVmVjdG9yMihyZXBlYXQpfVxyXG4gICAgICAgIGZsb2F0MiBpbnB1dHM6dHJhbnNsYXRpb24gPSAke0J1aWxkVmVjdG9yMihvZmZzZXQpfVxyXG4gICAgICAgIGZsb2F0MiBvdXRwdXRzOnJlc3VsdFxyXG4gICAgfVxyXG5cclxuICAgIGRlZiBTaGFkZXIgXCJUZXh0dXJlXyR7dGV4dHVyZS51bmlxdWVJZH1fJHttYXBUeXBlfVwiXHJcbiAgICB7XHJcbiAgICAgICAgdW5pZm9ybSB0b2tlbiBpbmZvOmlkID0gXCJVc2RVVlRleHR1cmVcIlxyXG4gICAgICAgIGFzc2V0IGlucHV0czpmaWxlID0gQHRleHR1cmVzL1RleHR1cmVfJHtpZH0ucG5nQFxyXG4gICAgICAgIGZsb2F0MiBpbnB1dHM6c3QuY29ubmVjdCA9IDwvTWF0ZXJpYWxzL01hdGVyaWFsXyR7bWF0ZXJpYWwudW5pcXVlSWR9L1RyYW5zZm9ybTJkXyR7bWFwVHlwZX0ub3V0cHV0czpyZXN1bHQ+XHJcbiAgICAgICAgJHtjb2xvciA/IFwiZmxvYXQ0IGlucHV0czpzY2FsZSA9IFwiICsgQnVpbGRDb2xvcjQoY29sb3IpIDogXCJcIn1cclxuICAgICAgICB0b2tlbiBpbnB1dHM6c291cmNlQ29sb3JTcGFjZSA9IFwiJHt0ZXh0dXJlLmdhbW1hU3BhY2UgPyBcInJhd1wiIDogXCJzUkdCXCJ9XCJcclxuICAgICAgICB0b2tlbiBpbnB1dHM6d3JhcFMgPSBcIiR7QnVpbGRXcmFwcGluZyh0ZXh0dXJlLndyYXBVKX1cIlxyXG4gICAgICAgIHRva2VuIGlucHV0czp3cmFwVCA9IFwiJHtCdWlsZFdyYXBwaW5nKHRleHR1cmUud3JhcFYpfVwiXHJcbiAgICAgICAgZmxvYXQgb3V0cHV0czpyXHJcbiAgICAgICAgZmxvYXQgb3V0cHV0czpnXHJcbiAgICAgICAgZmxvYXQgb3V0cHV0czpiXHJcbiAgICAgICAgZmxvYXQzIG91dHB1dHM6cmdiXHJcbiAgICAgICAgJHttYXRlcmlhbC5uZWVkQWxwaGFCbGVuZGluZygpID8gXCJmbG9hdCBvdXRwdXRzOmFcIiA6IFwiXCJ9XHJcbiAgICB9YDtcclxufVxyXG5cclxuZnVuY3Rpb24gRXh0cmFjdFRleHR1cmVJbmZvcm1hdGlvbnMobWF0ZXJpYWw6IE1hdGVyaWFsKSB7XHJcbiAgICBjb25zdCBjbGFzc05hbWUgPSBtYXRlcmlhbC5nZXRDbGFzc05hbWUoKTtcclxuXHJcbiAgICBzd2l0Y2ggKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIGNhc2UgXCJTdGFuZGFyZE1hdGVyaWFsXCI6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkaWZmdXNlTWFwOiAobWF0ZXJpYWwgYXMgU3RhbmRhcmRNYXRlcmlhbCkuZGlmZnVzZVRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBkaWZmdXNlOiAobWF0ZXJpYWwgYXMgU3RhbmRhcmRNYXRlcmlhbCkuZGlmZnVzZUNvbG9yLFxyXG4gICAgICAgICAgICAgICAgYWxwaGFDdXRPZmY6IChtYXRlcmlhbCBhcyBTdGFuZGFyZE1hdGVyaWFsKS5hbHBoYUN1dE9mZixcclxuICAgICAgICAgICAgICAgIGVtaXNzaXZlTWFwOiAobWF0ZXJpYWwgYXMgU3RhbmRhcmRNYXRlcmlhbCkuZW1pc3NpdmVUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgZW1pc3NpdmU6IChtYXRlcmlhbCBhcyBTdGFuZGFyZE1hdGVyaWFsKS5lbWlzc2l2ZUNvbG9yLFxyXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzTWFwOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsTWFwOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbWV0YWxuZXNzTWFwOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzOiAxLFxyXG4gICAgICAgICAgICAgICAgbWV0YWxuZXNzOiAwLFxyXG4gICAgICAgICAgICAgICAgYW9NYXA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBhb01hcEludGVuc2l0eTogMCxcclxuICAgICAgICAgICAgICAgIGFscGhhTWFwOiAobWF0ZXJpYWwgYXMgU3RhbmRhcmRNYXRlcmlhbCkub3BhY2l0eVRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBpb3I6IDEsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgY2FzZSBcIlBCUk1hdGVyaWFsXCI6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkaWZmdXNlTWFwOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLmFsYmVkb1RleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBkaWZmdXNlOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLmFsYmVkb0NvbG9yLFxyXG4gICAgICAgICAgICAgICAgYWxwaGFDdXRPZmY6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkuYWxwaGFDdXRPZmYsXHJcbiAgICAgICAgICAgICAgICBlbWlzc2l2ZU1hcDogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5lbWlzc2l2ZVRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBlbWlzc2l2ZTogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5lbWlzc2l2ZUNvbG9yLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsTWFwOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLmJ1bXBUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzTWFwOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLm1ldGFsbGljVGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIHJvdWdobmVzc0NoYW5uZWw6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkudXNlUm91Z2huZXNzRnJvbU1ldGFsbGljVGV4dHVyZUFscGhhID8gXCJhXCIgOiBcImdcIixcclxuICAgICAgICAgICAgICAgIHJvdWdobmVzczogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5yb3VnaG5lc3MgfHwgMSxcclxuICAgICAgICAgICAgICAgIG1ldGFsbmVzc01hcDogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5tZXRhbGxpY1RleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBtZXRhbG5lc3NDaGFubmVsOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLnVzZU1ldGFsbG5lc3NGcm9tTWV0YWxsaWNUZXh0dXJlQmx1ZSA/IFwiYlwiIDogXCJyXCIsXHJcbiAgICAgICAgICAgICAgICBtZXRhbG5lc3M6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkubWV0YWxsaWMgfHwgMCxcclxuICAgICAgICAgICAgICAgIGFvTWFwOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLmFtYmllbnRUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgYW9NYXBDaGFubmVsOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLnVzZUFtYmllbnRJbkdyYXlTY2FsZSA/IFwiclwiIDogXCJyZ2JcIixcclxuICAgICAgICAgICAgICAgIGFvTWFwSW50ZW5zaXR5OiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLmFtYmllbnRUZXh0dXJlU3RyZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhbHBoYU1hcDogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5vcGFjaXR5VGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIGlvcjogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5pbmRleE9mUmVmcmFjdGlvbixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICBjYXNlIFwiUEJSTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbFwiOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZGlmZnVzZU1hcDogKG1hdGVyaWFsIGFzIFBCUk1ldGFsbGljUm91Z2huZXNzTWF0ZXJpYWwpLmJhc2VUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgZGlmZnVzZTogKG1hdGVyaWFsIGFzIFBCUk1ldGFsbGljUm91Z2huZXNzTWF0ZXJpYWwpLmJhc2VDb2xvcixcclxuICAgICAgICAgICAgICAgIGFscGhhQ3V0T2ZmOiAobWF0ZXJpYWwgYXMgUEJSTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbCkuYWxwaGFDdXRPZmYsXHJcbiAgICAgICAgICAgICAgICBlbWlzc2l2ZU1hcDogKG1hdGVyaWFsIGFzIFBCUk1ldGFsbGljUm91Z2huZXNzTWF0ZXJpYWwpLmVtaXNzaXZlVGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIGVtaXNzaXZlOiAobWF0ZXJpYWwgYXMgUEJSTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbCkuZW1pc3NpdmVDb2xvcixcclxuICAgICAgICAgICAgICAgIG5vcm1hbE1hcDogKG1hdGVyaWFsIGFzIFBCUk1ldGFsbGljUm91Z2huZXNzTWF0ZXJpYWwpLm5vcm1hbFRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICByb3VnaG5lc3NNYXA6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkubWV0YWxsaWNUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzQ2hhbm5lbDogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS51c2VSb3VnaG5lc3NGcm9tTWV0YWxsaWNUZXh0dXJlQWxwaGEgPyBcImFcIiA6IFwiZ1wiLFxyXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzOiAobWF0ZXJpYWwgYXMgUEJSTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbCkucm91Z2huZXNzIHx8IDEsXHJcbiAgICAgICAgICAgICAgICBtZXRhbG5lc3NNYXA6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkubWV0YWxsaWNUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgbWV0YWxuZXNzQ2hhbm5lbDogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS51c2VNZXRhbGxuZXNzRnJvbU1ldGFsbGljVGV4dHVyZUJsdWUgPyBcImJcIiA6IFwiclwiLFxyXG4gICAgICAgICAgICAgICAgbWV0YWxuZXNzOiAobWF0ZXJpYWwgYXMgUEJSTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbCkubWV0YWxsaWMgfHwgMCxcclxuICAgICAgICAgICAgICAgIGFvTWFwOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLmFtYmllbnRUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgYW9NYXBDaGFubmVsOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLnVzZUFtYmllbnRJbkdyYXlTY2FsZSA/IFwiclwiIDogXCJyZ2JcIixcclxuICAgICAgICAgICAgICAgIGFvTWFwSW50ZW5zaXR5OiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLmFtYmllbnRUZXh0dXJlU3RyZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhbHBoYU1hcDogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5vcGFjaXR5VGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIGlvcjogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5pbmRleE9mUmVmcmFjdGlvbixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZGlmZnVzZU1hcDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGRpZmZ1c2U6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBlbWlzc2l2ZU1hcDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGVtaXNzZW1pc3NpdmVpdmVDb2xvcjogbnVsbCxcclxuICAgICAgICAgICAgICAgIG5vcm1hbE1hcDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHJvdWdobmVzc01hcDogbnVsbCxcclxuICAgICAgICAgICAgICAgIG1ldGFsbmVzc01hcDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGFscGhhQ3V0T2ZmOiAwLFxyXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzOiAwLFxyXG4gICAgICAgICAgICAgICAgbWV0YWxuZXNzOiAwLFxyXG4gICAgICAgICAgICAgICAgYW9NYXA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBhb01hcEludGVuc2l0eTogMCxcclxuICAgICAgICAgICAgICAgIGFscGhhTWFwOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgaW9yOiAxLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZE1hdGVyaWFsKG1hdGVyaWFsOiBNYXRlcmlhbCwgdGV4dHVyZVRvRXhwb3J0czogeyBba2V5OiBzdHJpbmddOiBCYXNlVGV4dHVyZSB9LCBvcHRpb25zOiBJVVNEWkV4cG9ydE9wdGlvbnMpIHtcclxuICAgIC8vIGh0dHBzOi8vZ3JhcGhpY3MucGl4YXIuY29tL3VzZC9kb2NzL1VzZFByZXZpZXdTdXJmYWNlLVByb3Bvc2FsLmh0bWxcclxuXHJcbiAgICBjb25zdCBwYWQgPSBcIlx0XHRcdFwiO1xyXG4gICAgY29uc3QgaW5wdXRzID0gW107XHJcbiAgICBjb25zdCBzYW1wbGVycyA9IFtdO1xyXG5cclxuICAgIGNvbnN0IHtcclxuICAgICAgICBkaWZmdXNlTWFwLFxyXG4gICAgICAgIGRpZmZ1c2UsXHJcbiAgICAgICAgYWxwaGFDdXRPZmYsXHJcbiAgICAgICAgZW1pc3NpdmVNYXAsXHJcbiAgICAgICAgZW1pc3NpdmUsXHJcbiAgICAgICAgbm9ybWFsTWFwLFxyXG4gICAgICAgIHJvdWdobmVzc01hcCxcclxuICAgICAgICByb3VnaG5lc3NDaGFubmVsLFxyXG4gICAgICAgIHJvdWdobmVzcyxcclxuICAgICAgICBtZXRhbG5lc3NNYXAsXHJcbiAgICAgICAgbWV0YWxuZXNzQ2hhbm5lbCxcclxuICAgICAgICBtZXRhbG5lc3MsXHJcbiAgICAgICAgYW9NYXAsXHJcbiAgICAgICAgYW9NYXBDaGFubmVsLFxyXG4gICAgICAgIGFvTWFwSW50ZW5zaXR5LFxyXG4gICAgICAgIGFscGhhTWFwLFxyXG4gICAgICAgIGlvcixcclxuICAgIH0gPSBFeHRyYWN0VGV4dHVyZUluZm9ybWF0aW9ucyhtYXRlcmlhbCk7XHJcblxyXG4gICAgaWYgKGRpZmZ1c2VNYXAgIT09IG51bGwpIHtcclxuICAgICAgICBpbnB1dHMucHVzaChgJHtwYWR9Y29sb3IzZiBpbnB1dHM6ZGlmZnVzZUNvbG9yLmNvbm5lY3QgPSA8L01hdGVyaWFscy9NYXRlcmlhbF8ke21hdGVyaWFsLnVuaXF1ZUlkfS9UZXh0dXJlXyR7ZGlmZnVzZU1hcC51bmlxdWVJZH1fZGlmZnVzZS5vdXRwdXRzOnJnYj5gKTtcclxuXHJcbiAgICAgICAgaWYgKG1hdGVyaWFsLm5lZWRBbHBoYUJsZW5kaW5nKCkpIHtcclxuICAgICAgICAgICAgaW5wdXRzLnB1c2goYCR7cGFkfWZsb2F0IGlucHV0czpvcGFjaXR5LmNvbm5lY3QgPSA8L01hdGVyaWFscy9NYXRlcmlhbF8ke21hdGVyaWFsLnVuaXF1ZUlkfS9UZXh0dXJlXyR7ZGlmZnVzZU1hcC51bmlxdWVJZH1fZGlmZnVzZS5vdXRwdXRzOmE+YCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbC5uZWVkQWxwaGFUZXN0aW5nKCkpIHtcclxuICAgICAgICAgICAgaW5wdXRzLnB1c2goYCR7cGFkfWZsb2F0IGlucHV0czpvcGFjaXR5LmNvbm5lY3QgPSA8L01hdGVyaWFscy9NYXRlcmlhbF8ke21hdGVyaWFsLnVuaXF1ZUlkfS9UZXh0dXJlXyR7ZGlmZnVzZU1hcC51bmlxdWVJZH1fZGlmZnVzZS5vdXRwdXRzOmE+YCk7XHJcbiAgICAgICAgICAgIGlucHV0cy5wdXNoKGAke3BhZH1mbG9hdCBpbnB1dHM6b3BhY2l0eVRocmVzaG9sZCA9ICR7YWxwaGFDdXRPZmZ9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzYW1wbGVycy5wdXNoKEJ1aWxkVGV4dHVyZShkaWZmdXNlTWFwIGFzIFRleHR1cmUsIG1hdGVyaWFsLCBcImRpZmZ1c2VcIiwgZGlmZnVzZSwgdGV4dHVyZVRvRXhwb3J0cywgb3B0aW9ucykpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbnB1dHMucHVzaChgJHtwYWR9Y29sb3IzZiBpbnB1dHM6ZGlmZnVzZUNvbG9yID0gJHtCdWlsZENvbG9yKGRpZmZ1c2UgfHwgQ29sb3IzLldoaXRlKCkpfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbWlzc2l2ZU1hcCAhPT0gbnVsbCkge1xyXG4gICAgICAgIGlucHV0cy5wdXNoKGAke3BhZH1jb2xvcjNmIGlucHV0czplbWlzc2l2ZUNvbG9yLmNvbm5lY3QgPSA8L01hdGVyaWFscy9NYXRlcmlhbF8ke21hdGVyaWFsLnVuaXF1ZUlkfS9UZXh0dXJlXyR7ZW1pc3NpdmVNYXAudW5pcXVlSWR9X2VtaXNzaXZlLm91dHB1dHM6cmdiPmApO1xyXG5cclxuICAgICAgICBzYW1wbGVycy5wdXNoKEJ1aWxkVGV4dHVyZShlbWlzc2l2ZU1hcCBhcyBUZXh0dXJlLCBtYXRlcmlhbCwgXCJlbWlzc2l2ZVwiLCBlbWlzc2l2ZSwgdGV4dHVyZVRvRXhwb3J0cywgb3B0aW9ucykpO1xyXG4gICAgfSBlbHNlIGlmIChlbWlzc2l2ZSAmJiBlbWlzc2l2ZS50b0x1bWluYW5jZSgpID4gMCkge1xyXG4gICAgICAgIGlucHV0cy5wdXNoKGAke3BhZH1jb2xvcjNmIGlucHV0czplbWlzc2l2ZUNvbG9yID0gJHtCdWlsZENvbG9yKGVtaXNzaXZlKX1gKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobm9ybWFsTWFwICE9PSBudWxsKSB7XHJcbiAgICAgICAgaW5wdXRzLnB1c2goYCR7cGFkfW5vcm1hbDNmIGlucHV0czpub3JtYWwuY29ubmVjdCA9IDwvTWF0ZXJpYWxzL01hdGVyaWFsXyR7bWF0ZXJpYWwudW5pcXVlSWR9L1RleHR1cmVfJHtub3JtYWxNYXAudW5pcXVlSWR9X25vcm1hbC5vdXRwdXRzOnJnYj5gKTtcclxuXHJcbiAgICAgICAgc2FtcGxlcnMucHVzaChCdWlsZFRleHR1cmUobm9ybWFsTWFwIGFzIFRleHR1cmUsIG1hdGVyaWFsLCBcIm5vcm1hbFwiLCBudWxsLCB0ZXh0dXJlVG9FeHBvcnRzLCBvcHRpb25zKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFvTWFwICE9PSBudWxsKSB7XHJcbiAgICAgICAgaW5wdXRzLnB1c2goYCR7cGFkfWZsb2F0IGlucHV0czpvY2NsdXNpb24uY29ubmVjdCA9IDwvTWF0ZXJpYWxzL01hdGVyaWFsXyR7bWF0ZXJpYWwudW5pcXVlSWR9L1RleHR1cmVfJHthb01hcC51bmlxdWVJZH1fb2NjbHVzaW9uLm91dHB1dHM6JHthb01hcENoYW5uZWx9PmApO1xyXG5cclxuICAgICAgICBzYW1wbGVycy5wdXNoKEJ1aWxkVGV4dHVyZShhb01hcCBhcyBUZXh0dXJlLCBtYXRlcmlhbCwgXCJvY2NsdXNpb25cIiwgbmV3IENvbG9yMyhhb01hcEludGVuc2l0eSwgYW9NYXBJbnRlbnNpdHksIGFvTWFwSW50ZW5zaXR5KSwgdGV4dHVyZVRvRXhwb3J0cywgb3B0aW9ucykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyb3VnaG5lc3NNYXAgIT09IG51bGwpIHtcclxuICAgICAgICBpbnB1dHMucHVzaChgJHtwYWR9ZmxvYXQgaW5wdXRzOnJvdWdobmVzcy5jb25uZWN0ID0gPC9NYXRlcmlhbHMvTWF0ZXJpYWxfJHttYXRlcmlhbC51bmlxdWVJZH0vVGV4dHVyZV8ke3JvdWdobmVzc01hcC51bmlxdWVJZH1fcm91Z2huZXNzLm91dHB1dHM6JHtyb3VnaG5lc3NDaGFubmVsfT5gKTtcclxuXHJcbiAgICAgICAgc2FtcGxlcnMucHVzaChCdWlsZFRleHR1cmUocm91Z2huZXNzTWFwIGFzIFRleHR1cmUsIG1hdGVyaWFsLCBcInJvdWdobmVzc1wiLCBuZXcgQ29sb3IzKHJvdWdobmVzcywgcm91Z2huZXNzLCByb3VnaG5lc3MpLCB0ZXh0dXJlVG9FeHBvcnRzLCBvcHRpb25zKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlucHV0cy5wdXNoKGAke3BhZH1mbG9hdCBpbnB1dHM6cm91Z2huZXNzID0gJHtyb3VnaG5lc3N9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1ldGFsbmVzc01hcCAhPT0gbnVsbCkge1xyXG4gICAgICAgIGlucHV0cy5wdXNoKGAke3BhZH1mbG9hdCBpbnB1dHM6bWV0YWxsaWMuY29ubmVjdCA9IDwvTWF0ZXJpYWxzL01hdGVyaWFsXyR7bWF0ZXJpYWwudW5pcXVlSWR9L1RleHR1cmVfJHttZXRhbG5lc3NNYXAudW5pcXVlSWR9X21ldGFsbGljLm91dHB1dHM6JHttZXRhbG5lc3NDaGFubmVsfT5gKTtcclxuXHJcbiAgICAgICAgc2FtcGxlcnMucHVzaChCdWlsZFRleHR1cmUobWV0YWxuZXNzTWFwIGFzIFRleHR1cmUsIG1hdGVyaWFsLCBcIm1ldGFsbGljXCIsIG5ldyBDb2xvcjMobWV0YWxuZXNzLCBtZXRhbG5lc3MsIG1ldGFsbmVzcyksIHRleHR1cmVUb0V4cG9ydHMsIG9wdGlvbnMpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5wdXRzLnB1c2goYCR7cGFkfWZsb2F0IGlucHV0czptZXRhbGxpYyA9ICR7bWV0YWxuZXNzfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhbHBoYU1hcCAhPT0gbnVsbCkge1xyXG4gICAgICAgIGlucHV0cy5wdXNoKGAke3BhZH1mbG9hdCBpbnB1dHM6b3BhY2l0eS5jb25uZWN0ID0gPC9NYXRlcmlhbHMvTWF0ZXJpYWxfJHttYXRlcmlhbC51bmlxdWVJZH0vVGV4dHVyZV8ke2FscGhhTWFwLnVuaXF1ZUlkfV9vcGFjaXR5Lm91dHB1dHM6cj5gKTtcclxuICAgICAgICBpbnB1dHMucHVzaChgJHtwYWR9ZmxvYXQgaW5wdXRzOm9wYWNpdHlUaHJlc2hvbGQgPSAwLjAwMDFgKTtcclxuXHJcbiAgICAgICAgc2FtcGxlcnMucHVzaChCdWlsZFRleHR1cmUoYWxwaGFNYXAgYXMgVGV4dHVyZSwgbWF0ZXJpYWwsIFwib3BhY2l0eVwiLCBudWxsLCB0ZXh0dXJlVG9FeHBvcnRzLCBvcHRpb25zKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlucHV0cy5wdXNoKGAke3BhZH1mbG9hdCBpbnB1dHM6b3BhY2l0eSA9ICR7bWF0ZXJpYWwuYWxwaGF9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRzLnB1c2goYCR7cGFkfWZsb2F0IGlucHV0czppb3IgPSAke2lvcn1gKTtcclxuXHJcbiAgICByZXR1cm4gYFxyXG5cdGRlZiBNYXRlcmlhbCBcIk1hdGVyaWFsXyR7bWF0ZXJpYWwudW5pcXVlSWR9XCJcclxuXHR7XHJcblx0XHRkZWYgU2hhZGVyIFwiUHJldmlld1N1cmZhY2VcIlxyXG5cdFx0e1xyXG5cdFx0XHR1bmlmb3JtIHRva2VuIGluZm86aWQgPSBcIlVzZFByZXZpZXdTdXJmYWNlXCJcclxuJHtpbnB1dHMuam9pbihcIlxcblwiKX1cclxuXHRcdFx0aW50IGlucHV0czp1c2VTcGVjdWxhcldvcmtmbG93ID0gMFxyXG5cdFx0XHR0b2tlbiBvdXRwdXRzOnN1cmZhY2VcclxuXHRcdH1cclxuXHJcblx0XHR0b2tlbiBvdXRwdXRzOnN1cmZhY2UuY29ubmVjdCA9IDwvTWF0ZXJpYWxzL01hdGVyaWFsXyR7bWF0ZXJpYWwudW5pcXVlSWR9L1ByZXZpZXdTdXJmYWNlLm91dHB1dHM6c3VyZmFjZT5cclxuXHJcbiR7c2FtcGxlcnMuam9pbihcIlxcblwiKX1cclxuXHJcblx0fVxyXG5gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZENhbWVyYShjYW1lcmE6IENhbWVyYSwgb3B0aW9uczogSVVTRFpFeHBvcnRPcHRpb25zKSB7XHJcbiAgICBjb25zdCBuYW1lID0gXCJDYW1lcmFfXCIgKyBjYW1lcmEudW5pcXVlSWQ7XHJcbiAgICBjb25zdCBtYXRyaXggPSBNYXRyaXguUm90YXRpb25ZKE1hdGguUEkpLm11bHRpcGx5KGNhbWVyYS5nZXRXb3JsZE1hdHJpeCgpKTsgLy8gd29yayB0b3dhcmRzIHBvc2l0aXZlIHpcclxuXHJcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBCdWlsZE1hdHJpeChtYXRyaXgpO1xyXG5cclxuICAgIGlmIChjYW1lcmEubW9kZSA9PT0gQ29uc3RhbnRzLk9SVEhPR1JBUEhJQ19DQU1FUkEpIHtcclxuICAgICAgICByZXR1cm4gYGRlZiBDYW1lcmEgXCIke25hbWV9XCJcclxuXHRcdHtcclxuXHRcdFx0bWF0cml4NGQgeGZvcm1PcDp0cmFuc2Zvcm0gPSAke3RyYW5zZm9ybX1cclxuXHRcdFx0dW5pZm9ybSB0b2tlbltdIHhmb3JtT3BPcmRlciA9IFtcInhmb3JtT3A6dHJhbnNmb3JtXCJdXHJcblxyXG5cdFx0XHRmbG9hdDIgY2xpcHBpbmdSYW5nZSA9ICgke2NhbWVyYS5taW5aLnRvUHJlY2lzaW9uKG9wdGlvbnMucHJlY2lzaW9uKX0sICR7Y2FtZXJhLm1heFoudG9QcmVjaXNpb24ob3B0aW9ucy5wcmVjaXNpb24pfSlcclxuXHRcdFx0ZmxvYXQgaG9yaXpvbnRhbEFwZXJ0dXJlID0gJHsoKE1hdGguYWJzKGNhbWVyYS5vcnRob0xlZnQgfHwgMSkgKyBNYXRoLmFicyhjYW1lcmEub3J0aG9SaWdodCB8fCAxKSkgKiAxMCkudG9QcmVjaXNpb24ob3B0aW9ucy5wcmVjaXNpb24pfVxyXG5cdFx0XHRmbG9hdCB2ZXJ0aWNhbEFwZXJ0dXJlID0gJHsoKE1hdGguYWJzKGNhbWVyYS5vcnRob1RvcCB8fCAxKSArIE1hdGguYWJzKGNhbWVyYS5vcnRob0JvdHRvbSB8fCAxKSkgKiAxMCkudG9QcmVjaXNpb24ob3B0aW9ucy5wcmVjaXNpb24pfVxyXG5cdFx0XHR0b2tlbiBwcm9qZWN0aW9uID0gXCJvcnRob2dyYXBoaWNcIlxyXG5cdFx0fVxyXG5cdFxyXG5cdGA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGFzcGVjdCA9IGNhbWVyYS5nZXRFbmdpbmUoKS5nZXRBc3BlY3RSYXRpbyhjYW1lcmEpO1xyXG4gICAgICAgIGNvbnN0IHNlbnNvcndpZHRoID0gb3B0aW9ucy5jYW1lcmFTZW5zb3JXaWR0aCB8fCAzNTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBkZWYgQ2FtZXJhIFwiJHtuYW1lfVwiXHJcblx0XHR7XHJcblx0XHRcdG1hdHJpeDRkIHhmb3JtT3A6dHJhbnNmb3JtID0gJHt0cmFuc2Zvcm19XHJcblx0XHRcdHVuaWZvcm0gdG9rZW5bXSB4Zm9ybU9wT3JkZXIgPSBbXCJ4Zm9ybU9wOnRyYW5zZm9ybVwiXVxyXG5cclxuXHRcdFx0ZmxvYXQyIGNsaXBwaW5nUmFuZ2UgPSAoJHtjYW1lcmEubWluWi50b1ByZWNpc2lvbihvcHRpb25zLnByZWNpc2lvbil9LCAke2NhbWVyYS5tYXhaLnRvUHJlY2lzaW9uKG9wdGlvbnMucHJlY2lzaW9uKX0pXHJcblx0XHRcdGZsb2F0IGZvY2FsTGVuZ3RoID0gJHsoc2Vuc29yd2lkdGggLyAoMiAqIE1hdGgudGFuKGNhbWVyYS5mb3YgKiAwLjUpKSkudG9QcmVjaXNpb24ob3B0aW9ucy5wcmVjaXNpb24pfVxyXG4gICAgICAgICAgICB0b2tlbiBwcm9qZWN0aW9uID0gXCJwZXJzcGVjdGl2ZVwiXHJcblx0XHRcdGZsb2F0IGhvcml6b250YWxBcGVydHVyZSA9ICR7KHNlbnNvcndpZHRoICogYXNwZWN0KS50b1ByZWNpc2lvbihvcHRpb25zLnByZWNpc2lvbil9XHJcblx0XHRcdGZsb2F0IHZlcnRpY2FsQXBlcnR1cmUgPSAkeyhzZW5zb3J3aWR0aCAvIGFzcGVjdCkudG9QcmVjaXNpb24ob3B0aW9ucy5wcmVjaXNpb24pfSAgICAgICAgICAgIFxyXG5cdFx0fVxyXG5cdFxyXG5cdGA7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gc2NlbmUgc2NlbmUgdG8gZXhwb3J0XHJcbiAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgdG8gY29uZmlndXJlIHRoZSBleHBvcnRcclxuICogQHBhcmFtIG1lc2hQcmVkaWNhdGUgcHJlZGljYXRlIHRvIGZpbHRlciB0aGUgbWVzaGVzIHRvIGV4cG9ydFxyXG4gKiBAcmV0dXJucyBhIHVpbnQ4IGFycmF5IGNvbnRhaW5pbmcgdGhlIFVTRFogZmlsZVxyXG4gKiAjSDJHNVhXIzMgLSBTaW1wbGUgc3BoZXJlXHJcbiAqICNIMkc1WFcjNCAtIFJlZCBzcGhlcmVcclxuICogIzVOM1JXSyM0IC0gQm9vbWJveFxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFVTRFpFeHBvcnRBc3luYyhzY2VuZTogU2NlbmUsIG9wdGlvbnM6IFBhcnRpYWw8SVVTRFpFeHBvcnRPcHRpb25zPiwgbWVzaFByZWRpY2F0ZT86IChtOiBNZXNoKSA9PiBib29sZWFuKTogUHJvbWlzZTxVaW50OEFycmF5PiB7XHJcbiAgICBjb25zdCBsb2NhbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgZmZsYXRlVXJsOiBcImh0dHBzOi8vdW5wa2cuY29tL2ZmbGF0ZUAwLjguMlwiLFxyXG4gICAgICAgIGluY2x1ZGVBbmNob3JpbmdQcm9wZXJ0aWVzOiB0cnVlLFxyXG4gICAgICAgIGFuY2hvcmluZ1R5cGU6IFwicGxhbmVcIixcclxuICAgICAgICBwbGFuZUFuY2hvcmluZ0FsaWdubWVudDogXCJob3Jpem9udGFsXCIsXHJcbiAgICAgICAgbW9kZWxGaWxlTmFtZTogXCJtb2RlbC51c2RhXCIsXHJcbiAgICAgICAgcHJlY2lzaW9uOiA1LFxyXG4gICAgICAgIGV4cG9ydENhbWVyYTogZmFsc2UsXHJcbiAgICAgICAgY2FtZXJhU2Vuc29yV2lkdGg6IDM1LFxyXG4gICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEdldCB0aGUgZmZsYXRlIGxpYnJhcnlcclxuICAgIGlmICh0eXBlb2YgZmZsYXRlID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgYXdhaXQgVG9vbHMuTG9hZFNjcmlwdEFzeW5jKGxvY2FsT3B0aW9ucy5mZmxhdGVVcmwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFN0YXJ0IHRoZSBleHBvcnRcclxuICAgIGNvbnN0IGZpbGVzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XHJcblxyXG4gICAgLy8gbW9kZWwgZmlsZSBzaG91bGQgYmUgZmlyc3QgaW4gVVNEWiBhcmNoaXZlIHNvIHdlIGluaXQgaXQgaGVyZVxyXG4gICAgZmlsZXNbbG9jYWxPcHRpb25zLm1vZGVsRmlsZU5hbWVdID0gbnVsbDtcclxuXHJcbiAgICBsZXQgb3V0cHV0ID0gQnVpbGRIZWFkZXIoKTtcclxuICAgIG91dHB1dCArPSBCdWlsZFNjZW5lU3RhcnQobG9jYWxPcHRpb25zKTtcclxuXHJcbiAgICBjb25zdCBtYXRlcmlhbFRvRXhwb3J0czogeyBba2V5OiBzdHJpbmddOiBNYXRlcmlhbCB9ID0ge307XHJcblxyXG4gICAgLy8gTWVzaGVzXHJcbiAgICBmb3IgKGNvbnN0IGFic3RyYWN0TWVzaCBvZiBzY2VuZS5tZXNoZXMpIHtcclxuICAgICAgICBpZiAoYWJzdHJhY3RNZXNoLmdldFRvdGFsVmVydGljZXMoKSA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbWVzaCA9IGFic3RyYWN0TWVzaCBhcyBNZXNoO1xyXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbWVzaC5nZW9tZXRyeTtcclxuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG1lc2gubWF0ZXJpYWw7XHJcblxyXG4gICAgICAgIGlmICghbWF0ZXJpYWwgfHwgIWdlb21ldHJ5IHx8IChtZXNoUHJlZGljYXRlICYmICFtZXNoUHJlZGljYXRlKG1lc2gpKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZE1hdGVyaWFscyA9IFtcIlN0YW5kYXJkTWF0ZXJpYWxcIiwgXCJQQlJNYXRlcmlhbFwiLCBcIlBCUk1ldGFsbGljUm91Z2huZXNzTWF0ZXJpYWxcIl07XHJcblxyXG4gICAgICAgIGlmIChzdXBwb3J0ZWRNYXRlcmlhbHMuaW5kZXhPZihtYXRlcmlhbC5nZXRDbGFzc05hbWUoKSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdlb21ldHJ5RmlsZU5hbWUgPSBcImdlb21ldHJpZXMvR2VvbWV0cnlfXCIgKyBnZW9tZXRyeS51bmlxdWVJZCArIFwiLnVzZGFcIjtcclxuXHJcbiAgICAgICAgICAgIGlmICghKGdlb21ldHJ5RmlsZU5hbWUgaW4gZmlsZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNoT2JqZWN0ID0gQnVpbGRNZXNoT2JqZWN0KGdlb21ldHJ5LCBsb2NhbE9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgZmlsZXNbZ2VvbWV0cnlGaWxlTmFtZV0gPSBCdWlsZFVTREZpbGVBc1N0cmluZyhtZXNoT2JqZWN0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCEobWF0ZXJpYWwudW5pcXVlSWQgaW4gbWF0ZXJpYWxUb0V4cG9ydHMpKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbFRvRXhwb3J0c1ttYXRlcmlhbC51bmlxdWVJZF0gPSBtYXRlcmlhbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3V0cHV0ICs9IEJ1aWxkWGZvcm0obWVzaCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgVG9vbHMuV2FybihcIlVTRFpFeHBvcnRBc3luYyBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgbWF0ZXJpYWwgdHlwZTogXCIgKyBtYXRlcmlhbC5nZXRDbGFzc05hbWUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIENhbWVyYVxyXG4gICAgaWYgKHNjZW5lLmFjdGl2ZUNhbWVyYSAmJiBsb2NhbE9wdGlvbnMuZXhwb3J0Q2FtZXJhKSB7XHJcbiAgICAgICAgb3V0cHV0ICs9IEJ1aWxkQ2FtZXJhKHNjZW5lLmFjdGl2ZUNhbWVyYSwgbG9jYWxPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDbG9zZSBzY2VuZVxyXG4gICAgb3V0cHV0ICs9IEJ1aWxkU2NlbmVFbmQoKTtcclxuXHJcbiAgICAvLyBNYXRlcmlhbHNcclxuICAgIGNvbnN0IHRleHR1cmVUb0V4cG9ydHM6IHsgW2tleTogc3RyaW5nXTogQmFzZVRleHR1cmUgfSA9IHt9O1xyXG4gICAgb3V0cHV0ICs9IEJ1aWxkTWF0ZXJpYWxzKG1hdGVyaWFsVG9FeHBvcnRzLCB0ZXh0dXJlVG9FeHBvcnRzLCBsb2NhbE9wdGlvbnMpO1xyXG5cclxuICAgIC8vIENvbXByZXNzXHJcbiAgICBmaWxlc1tsb2NhbE9wdGlvbnMubW9kZWxGaWxlTmFtZV0gPSBmZmxhdGUuc3RyVG9VOChvdXRwdXQpO1xyXG5cclxuICAgIC8vIFRleHR1cmVzXHJcbiAgICBmb3IgKGNvbnN0IGlkIGluIHRleHR1cmVUb0V4cG9ydHMpIHtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gdGV4dHVyZVRvRXhwb3J0c1tpZF07XHJcblxyXG4gICAgICAgIGNvbnN0IHNpemUgPSB0ZXh0dXJlLmdldFNpemUoKTtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlRGF0YSA9IGF3YWl0IHRleHR1cmUucmVhZFBpeGVscygpO1xyXG5cclxuICAgICAgICBpZiAoIXRleHR1cmVEYXRhKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRleHR1cmUgZGF0YSBpcyBub3QgYXZhaWxhYmxlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZmlsZUNvbnRlbnQgPSBhd2FpdCBEdW1wVG9vbHMuRHVtcERhdGFBc3luYyhzaXplLndpZHRoLCBzaXplLmhlaWdodCwgdGV4dHVyZURhdGEsIFwiaW1hZ2UvcG5nXCIsIHVuZGVmaW5lZCwgZmFsc2UsIHRydWUpO1xyXG5cclxuICAgICAgICBmaWxlc1tgdGV4dHVyZXMvVGV4dHVyZV8ke2lkfS5wbmdgXSA9IG5ldyBVaW50OEFycmF5KGZpbGVDb250ZW50IGFzIEFycmF5QnVmZmVyKS5zbGljZSgpOyAvLyBUaGlzIGlzIHRvIGF2b2lkIGdldHRpbmcgYSBsaW5rIGFuZCBub3QgYSBjb3B5XHJcbiAgICB9XHJcblxyXG4gICAgLy8gNjQgYnl0ZSBhbGlnbm1lbnRcclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS8xMDFhcnJvd3ovZmZsYXRlL2lzc3Vlcy8zOSNpc3N1ZWNvbW1lbnQtNzc3MjYzMTA5XHJcblxyXG4gICAgbGV0IG9mZnNldCA9IDA7XHJcblxyXG4gICAgZm9yIChjb25zdCBmaWxlbmFtZSBpbiBmaWxlcykge1xyXG4gICAgICAgIGNvbnN0IGZpbGUgPSBmaWxlc1tmaWxlbmFtZV07XHJcbiAgICAgICAgaWYgKCFmaWxlKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBoZWFkZXJTaXplID0gMzQgKyBmaWxlbmFtZS5sZW5ndGg7XHJcblxyXG4gICAgICAgIG9mZnNldCArPSBoZWFkZXJTaXplO1xyXG5cclxuICAgICAgICBjb25zdCBvZmZzZXRNb2Q2NCA9IG9mZnNldCAmIDYzO1xyXG5cclxuICAgICAgICBpZiAob2Zmc2V0TW9kNjQgIT09IDQpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFkTGVuZ3RoID0gNjQgLSBvZmZzZXRNb2Q2NDtcclxuICAgICAgICAgICAgY29uc3QgcGFkZGluZyA9IG5ldyBVaW50OEFycmF5KHBhZExlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbiAgICAgICAgICAgIGZpbGVzW2ZpbGVuYW1lXSA9IFtmaWxlLCB7IGV4dHJhOiB7IDEyMzQ1OiBwYWRkaW5nIH0gfV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvZmZzZXQgPSBmaWxlLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmZsYXRlLnppcFN5bmMoZmlsZXMsIHsgbGV2ZWw6IDAgfSk7XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXMgKi9cclxuaW1wb3J0ICogYXMgU2VyaWFsaXplcnMgZnJvbSBcInNlcmlhbGl6ZXJzL1VTRFovaW5kZXhcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBlbnRyeSBwb2ludCBmb3IgdGhlIFVNRCBtb2R1bGUuXHJcbiAqIFRoZSBlbnRyeSBwb2ludCBmb3IgYSBmdXR1cmUgRVNNIHBhY2thZ2Ugc2hvdWxkIGJlIGluZGV4LnRzXHJcbiAqL1xyXG5jb25zdCBnbG9iYWxPYmplY3QgPSB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcclxuaWYgKHR5cGVvZiBnbG9iYWxPYmplY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGZvciAoY29uc3Qgc2VyaWFsaXplciBpbiBTZXJpYWxpemVycykge1xyXG4gICAgICAgICg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTltzZXJpYWxpemVyXSA9ICg8YW55PlNlcmlhbGl6ZXJzKVtzZXJpYWxpemVyXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0ICogZnJvbSBcInNlcmlhbGl6ZXJzL1VTRFovaW5kZXhcIjtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2JhYnlsb25qc19NYXRoc19tYXRoX3ZlY3Rvcl9fOyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCwgSXRlcmF0b3IgKi9cblxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XG4gIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XG4gIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59XG5cbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcbiAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcbiAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0O1xuICB9XG4gIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcbiAgdmFyIHQgPSB7fTtcbiAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICB0W3BdID0gc1twXTtcbiAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICB9XG4gIHJldHVybiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcbiAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XG4gIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XG4gIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xuICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcbiAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcbiAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBjb250ZXh0ID0ge307XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xuICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcbiAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xuICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XG4gICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xuICAgICAgfVxuICB9XG4gIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcbiAgZG9uZSA9IHRydWU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xuICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcbiAgfVxuICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xuICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcbiAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gIH1cbn1cblxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gIG9bazJdID0gbVtrXTtcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcbiAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xuICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgfVxuICB9O1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xuICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gIGlmICghbSkgcmV0dXJuIG87XG4gIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICB0cnkge1xuICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gIGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgIH1cbiAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICB9XG4gIHJldHVybiBhcjtcbn1cblxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XG4gIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxuICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xuICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcbiAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxuICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXG4gICAgICAgICAgcltrXSA9IGFbal07XG4gIHJldHVybiByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xuICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgfVxuICB9XG4gIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XG4gIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcbiAgcmV0dXJuIGkgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgQXN5bmNJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gQXN5bmNJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiLCBhd2FpdFJldHVybiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gYXdhaXRSZXR1cm4oZikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGYsIHJlamVjdCk7IH07IH1cbiAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XG4gIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cbiAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XG4gIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcbiAgdmFyIGksIHA7XG4gIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcbiAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XG4gIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XG4gIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XG4gIHJldHVybiBjb29rZWQ7XG59O1xuXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59O1xuXG52YXIgb3duS2V5cyA9IGZ1bmN0aW9uKG8pIHtcbiAgb3duS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIChvKSB7XG4gICAgdmFyIGFyID0gW107XG4gICAgZm9yICh2YXIgayBpbiBvKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspKSBhclthci5sZW5ndGhdID0gaztcbiAgICByZXR1cm4gYXI7XG4gIH07XG4gIHJldHVybiBvd25LZXlzKG8pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcbiAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgPSBvd25LZXlzKG1vZCksIGkgPSAwOyBpIDwgay5sZW5ndGg7IGkrKykgaWYgKGtbaV0gIT09IFwiZGVmYXVsdFwiKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGtbaV0pO1xuICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xuICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XG4gIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xuICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hZGREaXNwb3NhYmxlUmVzb3VyY2UoZW52LCB2YWx1ZSwgYXN5bmMpIHtcbiAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkLlwiKTtcbiAgICB2YXIgZGlzcG9zZSwgaW5uZXI7XG4gICAgaWYgKGFzeW5jKSB7XG4gICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcbiAgICB9XG4gICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xuICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XG4gICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xuICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xuICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XG4gIH1cbiAgZWxzZSBpZiAoYXN5bmMpIHtcbiAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcbiAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xuICBmdW5jdGlvbiBmYWlsKGUpIHtcbiAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XG4gICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcbiAgfVxuICB2YXIgciwgcyA9IDA7XG4gIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgd2hpbGUgKHIgPSBlbnYuc3RhY2sucG9wKCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghci5hc3luYyAmJiBzID09PSAxKSByZXR1cm4gcyA9IDAsIGVudi5zdGFjay5wdXNoKHIpLCBQcm9taXNlLnJlc29sdmUoKS50aGVuKG5leHQpO1xuICAgICAgICBpZiAoci5kaXNwb3NlKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHIuZGlzcG9zZS5jYWxsKHIudmFsdWUpO1xuICAgICAgICAgIGlmIChyLmFzeW5jKSByZXR1cm4gcyB8PSAyLCBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBzIHw9IDE7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICBmYWlsKGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocyA9PT0gMSkgcmV0dXJuIGVudi5oYXNFcnJvciA/IFByb21pc2UucmVqZWN0KGVudi5lcnJvcikgOiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XG4gIH1cbiAgcmV0dXJuIG5leHQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uKHBhdGgsIHByZXNlcnZlSnN4KSB7XG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiAmJiAvXlxcLlxcLj9cXC8vLnRlc3QocGF0aCkpIHtcbiAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcLih0c3gpJHwoKD86XFwuZCk/KSgoPzpcXC5bXi4vXSs/KT8pXFwuKFtjbV0/KXRzJC9pLCBmdW5jdGlvbiAobSwgdHN4LCBkLCBleHQsIGNtKSB7XG4gICAgICAgICAgcmV0dXJuIHRzeCA/IHByZXNlcnZlSnN4ID8gXCIuanN4XCIgOiBcIi5qc1wiIDogZCAmJiAoIWV4dCB8fCAhY20pID8gbSA6IChkICsgZXh0ICsgXCIuXCIgKyBjbS50b0xvd2VyQ2FzZSgpICsgXCJqc1wiKTtcbiAgICAgIH0pO1xuICB9XG4gIHJldHVybiBwYXRoO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIF9fZXh0ZW5kcyxcbiAgX19hc3NpZ24sXG4gIF9fcmVzdCxcbiAgX19kZWNvcmF0ZSxcbiAgX19wYXJhbSxcbiAgX19lc0RlY29yYXRlLFxuICBfX3J1bkluaXRpYWxpemVycyxcbiAgX19wcm9wS2V5LFxuICBfX3NldEZ1bmN0aW9uTmFtZSxcbiAgX19tZXRhZGF0YSxcbiAgX19hd2FpdGVyLFxuICBfX2dlbmVyYXRvcixcbiAgX19jcmVhdGVCaW5kaW5nLFxuICBfX2V4cG9ydFN0YXIsXG4gIF9fdmFsdWVzLFxuICBfX3JlYWQsXG4gIF9fc3ByZWFkLFxuICBfX3NwcmVhZEFycmF5cyxcbiAgX19zcHJlYWRBcnJheSxcbiAgX19hd2FpdCxcbiAgX19hc3luY0dlbmVyYXRvcixcbiAgX19hc3luY0RlbGVnYXRvcixcbiAgX19hc3luY1ZhbHVlcyxcbiAgX19tYWtlVGVtcGxhdGVPYmplY3QsXG4gIF9faW1wb3J0U3RhcixcbiAgX19pbXBvcnREZWZhdWx0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4sXG4gIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxuICBfX2Rpc3Bvc2VSZXNvdXJjZXMsXG4gIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIHNlcmlhbGl6ZXJzIGZyb20gXCJAbHRzL3NlcmlhbGl6ZXJzL2xlZ2FjeS9sZWdhY3ktdXNkelNlcmlhbGl6ZXJcIjtcbmV4cG9ydCB7IHNlcmlhbGl6ZXJzIH07XG5leHBvcnQgZGVmYXVsdCBzZXJpYWxpemVycztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==