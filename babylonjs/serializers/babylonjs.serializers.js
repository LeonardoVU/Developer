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

/***/ "../../../dev/serializers/src/OBJ/index.ts":
/*!*************************************************!*\
  !*** ../../../dev/serializers/src/OBJ/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBJExport: () => (/* reexport safe */ _objSerializer__WEBPACK_IMPORTED_MODULE_0__.OBJExport)
/* harmony export */ });
/* harmony import */ var _objSerializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objSerializer */ "../../../dev/serializers/src/OBJ/objSerializer.ts");



/***/ }),

/***/ "../../../dev/serializers/src/OBJ/objSerializer.ts":
/*!*********************************************************!*\
  !*** ../../../dev/serializers/src/OBJ/objSerializer.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBJExport: () => (/* binding */ OBJExport)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/material */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);



/**
 * Class for generating OBJ data from a Babylon scene.
 */
var OBJExport = /** @class */ (function () {
    function OBJExport() {
    }
    /**
     * Exports the geometry of a Mesh array in .OBJ file format (text)
     * @param meshes defines the list of meshes to serialize
     * @param materials defines if materials should be exported
     * @param matlibname defines the name of the associated mtl file
     * @param globalposition defines if the exported positions are globals or local to the exported mesh
     * @returns the OBJ content
     */
    OBJExport.OBJ = function (meshes, materials, matlibname, globalposition) {
        var output = [];
        var v = 1;
        // keep track of uv index in case mixed meshes are passed in
        var textureV = 1;
        if (materials) {
            if (!matlibname) {
                matlibname = "mat";
            }
            output.push("mtllib " + matlibname + ".mtl");
        }
        for (var j = 0; j < meshes.length; j++) {
            var mesh = meshes[j];
            var objectName = mesh.name || "mesh".concat(j, "}");
            output.push("o ".concat(objectName));
            //Uses the position of the item in the scene, to the file (this back to normal in the end)
            var inverseTransform = null;
            if (globalposition) {
                var transform = mesh.computeWorldMatrix(true);
                inverseTransform = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Matrix();
                transform.invertToRef(inverseTransform);
                mesh.bakeTransformIntoVertices(transform);
            }
            //TODO: submeshes (groups)
            //TODO: smoothing groups (s 1, s off);
            if (materials) {
                var mat = mesh.material;
                if (mat) {
                    output.push("usemtl " + mat.id);
                }
            }
            var g = mesh.geometry;
            if (!g) {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("No geometry is present on the mesh");
                continue;
            }
            var trunkVerts = g.getVerticesData("position");
            var trunkNormals = g.getVerticesData("normal");
            var trunkUV = g.getVerticesData("uv");
            var trunkFaces = g.getIndices();
            var currentV = 0;
            var currentTextureV = 0;
            if (!trunkVerts || !trunkFaces) {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("There are no position vertices or indices on the mesh!");
                continue;
            }
            var useRightHandedSystem = meshes[0].getScene().useRightHandedSystem;
            var handednessSign = useRightHandedSystem ? 1 : -1;
            for (var i = 0; i < trunkVerts.length; i += 3) {
                output.push("v " + trunkVerts[i] * handednessSign + " " + trunkVerts[i + 1] + " " + trunkVerts[i + 2]);
                currentV++;
            }
            if (trunkNormals != null) {
                for (var i = 0; i < trunkNormals.length; i += 3) {
                    output.push("vn " + trunkNormals[i] * handednessSign + " " + trunkNormals[i + 1] + " " + trunkNormals[i + 2]);
                }
            }
            if (trunkUV != null) {
                for (var i = 0; i < trunkUV.length; i += 2) {
                    output.push("vt " + trunkUV[i] + " " + trunkUV[i + 1]);
                    currentTextureV++;
                }
            }
            var blanks = ["", "", ""];
            var material = mesh.material || mesh.getScene().defaultMaterial;
            var sideOrientation = material._getEffectiveOrientation(mesh);
            var _a = sideOrientation === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.ClockWiseSideOrientation ? [2, 1] : [1, 2], offset1 = _a[0], offset2 = _a[1];
            for (var i = 0; i < trunkFaces.length; i += 3) {
                var indices = [String(trunkFaces[i] + v), String(trunkFaces[i + offset1] + v), String(trunkFaces[i + offset2] + v)];
                var textureIndices = [String(trunkFaces[i] + textureV), String(trunkFaces[i + offset1] + textureV), String(trunkFaces[i + offset2] + textureV)];
                var facePositions = indices;
                var faceUVs = trunkUV != null ? textureIndices : blanks;
                var faceNormals = trunkNormals != null ? indices : blanks;
                output.push("f " +
                    facePositions[0] +
                    "/" +
                    faceUVs[0] +
                    "/" +
                    faceNormals[0] +
                    " " +
                    facePositions[1] +
                    "/" +
                    faceUVs[1] +
                    "/" +
                    faceNormals[1] +
                    " " +
                    facePositions[2] +
                    "/" +
                    faceUVs[2] +
                    "/" +
                    faceNormals[2]);
            }
            //back de previous matrix, to not change the original mesh in the scene
            if (globalposition && inverseTransform) {
                mesh.bakeTransformIntoVertices(inverseTransform);
            }
            v += currentV;
            textureV += currentTextureV;
        }
        var text = output.join("\n");
        return text;
    };
    /**
     * Exports the material(s) of a mesh in .MTL file format (text)
     * @param mesh defines the mesh to extract the material from
     * @returns the mtl content
     */
    //TODO: Export the materials of mesh array
    OBJExport.MTL = function (mesh) {
        var output = [];
        var m = mesh.material;
        output.push("newmtl mat1");
        output.push("  Ns " + m.specularPower.toFixed(4));
        output.push("  Ni 1.5000");
        output.push("  d " + m.alpha.toFixed(4));
        output.push("  Tr 0.0000");
        output.push("  Tf 1.0000 1.0000 1.0000");
        output.push("  illum 2");
        output.push("  Ka " + m.ambientColor.r.toFixed(4) + " " + m.ambientColor.g.toFixed(4) + " " + m.ambientColor.b.toFixed(4));
        output.push("  Kd " + m.diffuseColor.r.toFixed(4) + " " + m.diffuseColor.g.toFixed(4) + " " + m.diffuseColor.b.toFixed(4));
        output.push("  Ks " + m.specularColor.r.toFixed(4) + " " + m.specularColor.g.toFixed(4) + " " + m.specularColor.b.toFixed(4));
        output.push("  Ke " + m.emissiveColor.r.toFixed(4) + " " + m.emissiveColor.g.toFixed(4) + " " + m.emissiveColor.b.toFixed(4));
        //TODO: uv scale, offset, wrap
        //TODO: UV mirrored in Blender? second UV channel? lightMap? reflection textures?
        var uvscale = "";
        if (m.ambientTexture) {
            output.push("  map_Ka " + uvscale + m.ambientTexture.name);
        }
        if (m.diffuseTexture) {
            output.push("  map_Kd " + uvscale + m.diffuseTexture.name);
            //TODO: alpha testing, opacity in diffuse texture alpha channel (diffuseTexture.hasAlpha -> map_d)
        }
        if (m.specularTexture) {
            output.push("  map_Ks " + uvscale + m.specularTexture.name);
            /* TODO: glossiness = specular highlight component is in alpha channel of specularTexture. (???)
            if (m.useGlossinessFromSpecularMapAlpha)  {
                output.push("  map_Ns "+uvscale + m.specularTexture.name);
            }
            */
        }
        /* TODO: emissive texture not in .MAT format (???)
        if (m.emissiveTexture) {
            output.push("  map_d "+uvscale+m.emissiveTexture.name);
        }
        */
        if (m.bumpTexture) {
            output.push("  map_bump -imfchan z " + uvscale + m.bumpTexture.name);
        }
        if (m.opacityTexture) {
            output.push("  map_d " + uvscale + m.opacityTexture.name);
        }
        var text = output.join("\n");
        return text;
    };
    return OBJExport;
}());



/***/ }),

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

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/EXT_mesh_gpu_instancing.ts":
/*!***********************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/EXT_mesh_gpu_instancing.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXT_mesh_gpu_instancing: () => (/* binding */ EXT_mesh_gpu_instancing)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Buffers/buffer */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__);





var NAME = "EXT_mesh_gpu_instancing";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var EXT_mesh_gpu_instancing = /** @class */ (function () {
    function EXT_mesh_gpu_instancing(exporter) {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
        this._exporter = exporter;
    }
    EXT_mesh_gpu_instancing.prototype.dispose = function () { };
    Object.defineProperty(EXT_mesh_gpu_instancing.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * After node is exported
     * @param context the GLTF context when loading the asset
     * @param node the node exported
     * @param babylonNode the corresponding babylon node
     * @param nodeMap map from babylon node id to node index
     * @param binaryWriter binary writer
     * @returns nullable promise, resolves with the node
     */
    EXT_mesh_gpu_instancing.prototype.postExportNodeAsync = function (context, node, babylonNode, nodeMap, binaryWriter) {
        var _this = this;
        return new Promise(function (resolve) {
            if (node && babylonNode instanceof babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__.Mesh) {
                if (babylonNode.hasThinInstances && binaryWriter) {
                    _this._wasUsed = true;
                    var noTranslation = babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero();
                    var noRotation = babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__.Quaternion.Identity();
                    var noScale = babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__.Vector3.One();
                    // retrieve all the instance world matrix
                    var matrix = babylonNode.thinInstanceGetWorldMatrices();
                    var iwt = babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__.TmpVectors.Vector3[2];
                    var iwr = babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__.TmpVectors.Quaternion[1];
                    var iws = babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__.TmpVectors.Vector3[3];
                    var hasAnyInstanceWorldTranslation = false;
                    var hasAnyInstanceWorldRotation = false;
                    var hasAnyInstanceWorldScale = false;
                    // prepare temp buffers
                    var translationBuffer = new Float32Array(babylonNode.thinInstanceCount * 3);
                    var rotationBuffer = new Float32Array(babylonNode.thinInstanceCount * 4);
                    var scaleBuffer = new Float32Array(babylonNode.thinInstanceCount * 3);
                    var i = 0;
                    for (var _i = 0, matrix_1 = matrix; _i < matrix_1.length; _i++) {
                        var m = matrix_1[_i];
                        m.decompose(iws, iwr, iwt);
                        // fill the temp buffer
                        translationBuffer.set(iwt.asArray(), i * 3);
                        rotationBuffer.set(iwr.normalize().asArray(), i * 4); // ensure the quaternion is normalized
                        scaleBuffer.set(iws.asArray(), i * 3);
                        // this is where we decide if there is any transformation
                        hasAnyInstanceWorldTranslation = hasAnyInstanceWorldTranslation || !iwt.equalsWithEpsilon(noTranslation);
                        hasAnyInstanceWorldRotation = hasAnyInstanceWorldRotation || !iwr.equalsWithEpsilon(noRotation);
                        hasAnyInstanceWorldScale = hasAnyInstanceWorldScale || !iws.equalsWithEpsilon(noScale);
                        i++;
                    }
                    var extension = {
                        attributes: {},
                    };
                    // do we need to write TRANSLATION ?
                    if (hasAnyInstanceWorldTranslation) {
                        extension.attributes["TRANSLATION"] = _this._buildAccessor(translationBuffer, "VEC3" /* AccessorType.VEC3 */, babylonNode.thinInstanceCount, binaryWriter, 5126 /* AccessorComponentType.FLOAT */);
                    }
                    // do we need to write ROTATION ?
                    if (hasAnyInstanceWorldRotation) {
                        var componentType = 5126 /* AccessorComponentType.FLOAT */; // we decided to stay on FLOAT for now see https://github.com/BabylonJS/Babylon.js/pull/12495
                        extension.attributes["ROTATION"] = _this._buildAccessor(rotationBuffer, "VEC4" /* AccessorType.VEC4 */, babylonNode.thinInstanceCount, binaryWriter, componentType);
                    }
                    // do we need to write SCALE ?
                    if (hasAnyInstanceWorldScale) {
                        extension.attributes["SCALE"] = _this._buildAccessor(scaleBuffer, "VEC3" /* AccessorType.VEC3 */, babylonNode.thinInstanceCount, binaryWriter, 5126 /* AccessorComponentType.FLOAT */);
                    }
                    /* eslint-enable @typescript-eslint/naming-convention*/
                    node.extensions = node.extensions || {};
                    node.extensions[NAME] = extension;
                }
            }
            resolve(node);
        });
    };
    EXT_mesh_gpu_instancing.prototype._buildAccessor = function (buffer, type, count, binaryWriter, componentType) {
        // write the buffer
        var bufferOffset = binaryWriter.getByteOffset();
        switch (componentType) {
            case 5126 /* AccessorComponentType.FLOAT */: {
                for (var i = 0; i != buffer.length; i++) {
                    binaryWriter.setFloat32(buffer[i]);
                }
                break;
            }
            case 5120 /* AccessorComponentType.BYTE */: {
                for (var i = 0; i != buffer.length; i++) {
                    binaryWriter.setByte(buffer[i] * 127);
                }
                break;
            }
            case 5122 /* AccessorComponentType.SHORT */: {
                for (var i = 0; i != buffer.length; i++) {
                    binaryWriter.setInt16(buffer[i] * 32767);
                }
                break;
            }
        }
        // build the buffer view
        var bv = { buffer: 0, byteOffset: bufferOffset, byteLength: buffer.length * babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__.VertexBuffer.GetTypeByteLength(componentType) };
        var bufferViewIndex = this._exporter._bufferViews.length;
        this._exporter._bufferViews.push(bv);
        // finally build the accessor
        var accessorIndex = this._exporter._accessors.length;
        var accessor = {
            bufferView: bufferViewIndex,
            componentType: componentType,
            count: count,
            type: type,
            normalized: componentType == 5120 /* AccessorComponentType.BYTE */ || componentType == 5122 /* AccessorComponentType.SHORT */,
        };
        this._exporter._accessors.push(accessor);
        return accessorIndex;
    };
    return EXT_mesh_gpu_instancing;
}());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new EXT_mesh_gpu_instancing(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_lights_punctual.ts":
/*!*******************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_lights_punctual.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_lights_punctual: () => (/* binding */ KHR_lights_punctual)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/logger */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");






var NAME = "KHR_lights_punctual";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_lights_punctual/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_lights_punctual = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_lights_punctual(exporter) {
        /** The name of this extension. */
        this.name = NAME;
        /** Defines whether this extension is enabled. */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._exporter = exporter;
    }
    /** @internal */
    KHR_lights_punctual.prototype.dispose = function () {
        this._lights = null;
    };
    Object.defineProperty(KHR_lights_punctual.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return !!this._lights;
        },
        enumerable: false,
        configurable: true
    });
    /** @internal */
    KHR_lights_punctual.prototype.onExporting = function () {
        this._exporter._glTF.extensions[NAME] = this._lights;
    };
    /**
     * Define this method to modify the default behavior when exporting a node
     * @param context The context when exporting the node
     * @param node glTF node
     * @param babylonNode BabylonJS node
     * @param nodeMap Node mapping of unique id to glTF node index
     * @returns nullable INode promise
     */
    KHR_lights_punctual.prototype.postExportNodeAsync = function (context, node, babylonNode, nodeMap) {
        var _this = this;
        return new Promise(function (resolve) {
            if (node && babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.ShadowLight) {
                var light = void 0;
                var lightType = babylonNode.getTypeID() == babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Light.LIGHTTYPEID_POINTLIGHT
                    ? "point" /* KHRLightsPunctual_LightType.POINT */
                    : babylonNode.getTypeID() == babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Light.LIGHTTYPEID_DIRECTIONALLIGHT
                        ? "directional" /* KHRLightsPunctual_LightType.DIRECTIONAL */
                        : babylonNode.getTypeID() == babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Light.LIGHTTYPEID_SPOTLIGHT
                            ? "spot" /* KHRLightsPunctual_LightType.SPOT */
                            : null;
                if (lightType == null) {
                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("".concat(context, ": Light ").concat(babylonNode.name, " is not supported in ").concat(NAME));
                }
                else {
                    if (!babylonNode.position.equalsToFloats(0, 0, 0)) {
                        node.translation = babylonNode.position.asArray();
                    }
                    if (lightType !== "point" /* KHRLightsPunctual_LightType.POINT */) {
                        var localAxis = babylonNode.direction;
                        var yaw = -Math.atan2(localAxis.z, localAxis.x) + Math.PI / 2;
                        var len = Math.sqrt(localAxis.x * localAxis.x + localAxis.z * localAxis.z);
                        var pitch = -Math.atan2(localAxis.y, len);
                        var lightRotationQuaternion = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.RotationYawPitchRoll(yaw + Math.PI, pitch, 0);
                        if (!babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.IsIdentity(lightRotationQuaternion)) {
                            node.rotation = lightRotationQuaternion.asArray();
                        }
                    }
                    if (babylonNode.falloffType !== babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Light.FALLOFF_GLTF) {
                        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("".concat(context, ": Light falloff for ").concat(babylonNode.name, " does not match the ").concat(NAME, " specification!"));
                    }
                    light = {
                        type: lightType,
                    };
                    if (!babylonNode.diffuse.equals(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.White())) {
                        light.color = babylonNode.diffuse.asArray();
                    }
                    if (babylonNode.intensity !== 1.0) {
                        light.intensity = babylonNode.intensity;
                    }
                    if (babylonNode.range !== Number.MAX_VALUE) {
                        light.range = babylonNode.range;
                    }
                    if (lightType === "spot" /* KHRLightsPunctual_LightType.SPOT */) {
                        var babylonSpotLight = babylonNode;
                        if (babylonSpotLight.angle !== Math.PI / 2.0) {
                            if (light.spot == null) {
                                light.spot = {};
                            }
                            light.spot.outerConeAngle = babylonSpotLight.angle / 2.0;
                        }
                        if (babylonSpotLight.innerAngle !== 0) {
                            if (light.spot == null) {
                                light.spot = {};
                            }
                            light.spot.innerConeAngle = babylonSpotLight.innerAngle / 2.0;
                        }
                    }
                    _this._lights || (_this._lights = {
                        lights: [],
                    });
                    _this._lights.lights.push(light);
                    var lightReference = {
                        light: _this._lights.lights.length - 1,
                    };
                    // Avoid duplicating the Light's parent node if possible.
                    var parentBabylonNode = babylonNode.parent;
                    if (parentBabylonNode && parentBabylonNode.getChildren().length == 1) {
                        var parentNode = _this._exporter._nodes[nodeMap[parentBabylonNode.uniqueId]];
                        if (parentNode) {
                            var parentTranslation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArrayToRef(parentNode.translation || [0, 0, 0], 0, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[0]);
                            var parentRotation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromArrayToRef(parentNode.rotation || [0, 0, 0, 1], 0, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Quaternion[0]);
                            var parentScale = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArrayToRef(parentNode.scale || [1, 1, 1], 0, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[1]);
                            var parentMatrix = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Matrix.ComposeToRef(parentScale, parentRotation, parentTranslation, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Matrix[0]);
                            var translation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArrayToRef(node.translation || [0, 0, 0], 0, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[2]);
                            var rotation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromArrayToRef(node.rotation || [0, 0, 0, 1], 0, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Quaternion[1]);
                            var matrix = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Matrix.ComposeToRef(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.OneReadOnly, rotation, translation, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Matrix[1]);
                            parentMatrix.multiplyToRef(matrix, matrix);
                            matrix.decompose(parentScale, parentRotation, parentTranslation);
                            if (parentTranslation.equalsToFloats(0, 0, 0)) {
                                delete parentNode.translation;
                            }
                            else {
                                parentNode.translation = parentTranslation.asArray();
                            }
                            if (babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.IsIdentity(parentRotation)) {
                                delete parentNode.rotation;
                            }
                            else {
                                parentNode.rotation = parentRotation.asArray();
                            }
                            if (parentScale.equalsToFloats(1, 1, 1)) {
                                delete parentNode.scale;
                            }
                            else {
                                parentNode.scale = parentScale.asArray();
                            }
                            parentNode.extensions || (parentNode.extensions = {});
                            parentNode.extensions[NAME] = lightReference;
                            // Do not export the original node
                            resolve(null);
                            return;
                        }
                    }
                    node.extensions || (node.extensions = {});
                    node.extensions[NAME] = lightReference;
                }
            }
            resolve(node);
        });
    };
    return KHR_lights_punctual;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_1__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_lights_punctual(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_anisotropy.ts":
/*!************************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_anisotropy.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_anisotropy: () => (/* binding */ KHR_materials_anisotropy)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrBaseMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__);


var NAME = "KHR_materials_anisotropy";
/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_anisotropy = /** @class */ (function () {
    function KHR_materials_anisotropy(exporter) {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
        this._exporter = exporter;
    }
    KHR_materials_anisotropy.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_anisotropy.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_materials_anisotropy.prototype.postExportMaterialAdditionalTextures = function (context, node, babylonMaterial) {
        var additionalTextures = [];
        if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRBaseMaterial) {
            if (babylonMaterial.anisotropy.isEnabled && !babylonMaterial.anisotropy.legacy) {
                if (babylonMaterial.anisotropy.texture) {
                    additionalTextures.push(babylonMaterial.anisotropy.texture);
                }
                return additionalTextures;
            }
        }
        return [];
    };
    KHR_materials_anisotropy.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRBaseMaterial) {
                if (!babylonMaterial.anisotropy.isEnabled || babylonMaterial.anisotropy.legacy) {
                    resolve(node);
                    return;
                }
                _this._wasUsed = true;
                node.extensions = node.extensions || {};
                var anisotropyTextureInfo = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.anisotropy.texture);
                var anisotropyInfo_1 = {
                    anisotropyStrength: babylonMaterial.anisotropy.intensity,
                    anisotropyRotation: babylonMaterial.anisotropy.angle,
                    anisotropyTexture: anisotropyTextureInfo !== null && anisotropyTextureInfo !== void 0 ? anisotropyTextureInfo : undefined,
                    hasTextures: function () {
                        return anisotropyInfo_1.anisotropyTexture !== null;
                    },
                };
                node.extensions[NAME] = anisotropyInfo_1;
            }
            resolve(node);
        });
    };
    return KHR_materials_anisotropy;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_anisotropy(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_clearcoat.ts":
/*!***********************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_clearcoat.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_clearcoat: () => (/* binding */ KHR_materials_clearcoat)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Misc/tools */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__);



var NAME = "KHR_materials_clearcoat";
/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_clearcoat = /** @class */ (function () {
    function KHR_materials_clearcoat(exporter) {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
        this._exporter = exporter;
    }
    KHR_materials_clearcoat.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_clearcoat.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_materials_clearcoat.prototype.postExportMaterialAdditionalTextures = function (context, node, babylonMaterial) {
        var additionalTextures = [];
        if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRBaseMaterial) {
            if (babylonMaterial.clearCoat.isEnabled) {
                if (babylonMaterial.clearCoat.texture) {
                    additionalTextures.push(babylonMaterial.clearCoat.texture);
                }
                if (!babylonMaterial.clearCoat.useRoughnessFromMainTexture && babylonMaterial.clearCoat.textureRoughness) {
                    additionalTextures.push(babylonMaterial.clearCoat.textureRoughness);
                }
                if (babylonMaterial.clearCoat.bumpTexture) {
                    additionalTextures.push(babylonMaterial.clearCoat.bumpTexture);
                }
                return additionalTextures;
            }
        }
        return [];
    };
    KHR_materials_clearcoat.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRBaseMaterial) {
                if (!babylonMaterial.clearCoat.isEnabled) {
                    resolve(node);
                    return;
                }
                _this._wasUsed = true;
                node.extensions = node.extensions || {};
                var clearCoatTextureInfo = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.clearCoat.texture);
                var clearCoatTextureRoughnessInfo = void 0;
                if (babylonMaterial.clearCoat.useRoughnessFromMainTexture) {
                    clearCoatTextureRoughnessInfo = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.clearCoat.texture);
                }
                else {
                    clearCoatTextureRoughnessInfo = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.clearCoat.textureRoughness);
                }
                if (babylonMaterial.clearCoat.isTintEnabled) {
                    babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__.Tools.Warn("Clear Color tint is not supported for glTF export. Ignoring for: ".concat(babylonMaterial.name));
                }
                if (babylonMaterial.clearCoat.remapF0OnInterfaceChange) {
                    babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__.Tools.Warn("Clear Color F0 remapping is not supported for glTF export. Ignoring for: ".concat(babylonMaterial.name));
                }
                var clearCoatNormalTextureInfo = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.clearCoat.bumpTexture);
                var clearCoatInfo_1 = {
                    clearcoatFactor: babylonMaterial.clearCoat.intensity,
                    clearcoatTexture: clearCoatTextureInfo !== null && clearCoatTextureInfo !== void 0 ? clearCoatTextureInfo : undefined,
                    clearcoatRoughnessFactor: babylonMaterial.clearCoat.roughness,
                    clearcoatRoughnessTexture: clearCoatTextureRoughnessInfo !== null && clearCoatTextureRoughnessInfo !== void 0 ? clearCoatTextureRoughnessInfo : undefined,
                    clearcoatNormalTexture: clearCoatNormalTextureInfo !== null && clearCoatNormalTextureInfo !== void 0 ? clearCoatNormalTextureInfo : undefined,
                    hasTextures: function () {
                        return clearCoatInfo_1.clearcoatTexture !== null || clearCoatInfo_1.clearcoatRoughnessTexture !== null || clearCoatInfo_1.clearcoatRoughnessTexture !== null;
                    },
                };
                node.extensions[NAME] = clearCoatInfo_1;
            }
            resolve(node);
        });
    };
    return KHR_materials_clearcoat;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_clearcoat(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_diffuse_transmission.ts":
/*!**********************************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_diffuse_transmission.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_diffuse_transmission: () => (/* binding */ KHR_materials_diffuse_transmission)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__);


var NAME = "KHR_materials_diffuse_transmission";
/**
 * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1825)
 * !!! Experimental Extension Subject to Changes !!!
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_diffuse_transmission = /** @class */ (function () {
    function KHR_materials_diffuse_transmission(exporter) {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
        this._exporter = exporter;
    }
    KHR_materials_diffuse_transmission.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_diffuse_transmission.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * After exporting a material, deal with additional textures
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns array of additional textures to export
     */
    KHR_materials_diffuse_transmission.prototype.postExportMaterialAdditionalTextures = function (context, node, babylonMaterial) {
        var additionalTextures = [];
        if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
            if (this._isExtensionEnabled(babylonMaterial)) {
                if (babylonMaterial.subSurface.thicknessTexture) {
                    additionalTextures.push(babylonMaterial.subSurface.thicknessTexture);
                }
                return additionalTextures;
            }
        }
        return additionalTextures;
    };
    KHR_materials_diffuse_transmission.prototype._isExtensionEnabled = function (mat) {
        // This extension must not be used on a material that also uses KHR_materials_unlit
        if (mat.unlit) {
            return false;
        }
        var subs = mat.subSurface;
        if (!subs.isTranslucencyEnabled) {
            return false;
        }
        return (!mat.unlit &&
            !subs.useAlbedoToTintTranslucency &&
            subs.useGltfStyleTextures &&
            subs.volumeIndexOfRefraction === 1 &&
            subs.minimumThickness === 0 &&
            subs.maximumThickness === 0);
    };
    KHR_materials_diffuse_transmission.prototype._hasTexturesExtension = function (mat) {
        return mat.subSurface.translucencyIntensityTexture != null || mat.subSurface.translucencyColorTexture != null;
    };
    /**
     * After exporting a material
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns promise that resolves with the updated node
     */
    KHR_materials_diffuse_transmission.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            var _a, _b;
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial && _this._isExtensionEnabled(babylonMaterial)) {
                _this._wasUsed = true;
                var subs = babylonMaterial.subSurface;
                var diffuseTransmissionFactor = subs.translucencyIntensity == 1 ? undefined : subs.translucencyIntensity;
                var diffuseTransmissionTexture = (_a = _this._exporter._glTFMaterialExporter._getTextureInfo(subs.translucencyIntensityTexture)) !== null && _a !== void 0 ? _a : undefined;
                var diffuseTransmissionColorFactor = !subs.translucencyColor || subs.translucencyColor.equalsFloats(1.0, 1.0, 1.0) ? undefined : subs.translucencyColor.asArray();
                var diffuseTransmissionColorTexture = (_b = _this._exporter._glTFMaterialExporter._getTextureInfo(subs.translucencyColorTexture)) !== null && _b !== void 0 ? _b : undefined;
                var diffuseTransmissionInfo = {
                    diffuseTransmissionFactor: diffuseTransmissionFactor,
                    diffuseTransmissionTexture: diffuseTransmissionTexture,
                    diffuseTransmissionColorFactor: diffuseTransmissionColorFactor,
                    diffuseTransmissionColorTexture: diffuseTransmissionColorTexture,
                    hasTextures: function () {
                        return _this._hasTexturesExtension(babylonMaterial);
                    },
                };
                node.extensions = node.extensions || {};
                node.extensions[NAME] = diffuseTransmissionInfo;
            }
            resolve(node);
        });
    };
    return KHR_materials_diffuse_transmission;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_diffuse_transmission(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_dispersion.ts":
/*!************************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_dispersion.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_dispersion: () => (/* binding */ KHR_materials_dispersion)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__);


var NAME = "KHR_materials_dispersion";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/87bd64a7f5e23c84b6aef2e6082069583ed0ddb4/extensions/2.0/Khronos/KHR_materials_dispersion/README.md)
 * @experimental
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_dispersion = /** @class */ (function () {
    /** Constructor */
    function KHR_materials_dispersion() {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
    }
    /** Dispose */
    KHR_materials_dispersion.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_dispersion.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_materials_dispersion.prototype._isExtensionEnabled = function (mat) {
        // This extension must not be used on a material that also uses KHR_materials_unlit
        if (mat.unlit) {
            return false;
        }
        var subs = mat.subSurface;
        // this extension requires refraction to be enabled.
        if (!subs.isRefractionEnabled && !subs.isDispersionEnabled) {
            return false;
        }
        return true;
    };
    /**
     * After exporting a material
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns promise, resolves with the material
     */
    KHR_materials_dispersion.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial && _this._isExtensionEnabled(babylonMaterial)) {
                _this._wasUsed = true;
                var subs = babylonMaterial.subSurface;
                var dispersion = subs.dispersion;
                var dispersionInfo = {
                    dispersion: dispersion,
                };
                node.extensions = node.extensions || {};
                node.extensions[NAME] = dispersionInfo;
            }
            resolve(node);
        });
    };
    return KHR_materials_dispersion;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function () { return new KHR_materials_dispersion(); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_emissive_strength.ts":
/*!*******************************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_emissive_strength.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_emissive_strength: () => (/* binding */ KHR_materials_emissive_strength)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__);


var NAME = "KHR_materials_emissive_strength";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_emissive_strength/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_emissive_strength = /** @class */ (function () {
    function KHR_materials_emissive_strength() {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
    }
    /** Dispose */
    KHR_materials_emissive_strength.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_emissive_strength.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * After exporting a material
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns promise, resolves with the material
     */
    KHR_materials_emissive_strength.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            if (!(babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial)) {
                return resolve(node);
            }
            var emissiveColor = babylonMaterial.emissiveColor.asArray();
            var tempEmissiveStrength = Math.max.apply(Math, emissiveColor);
            if (tempEmissiveStrength > 1) {
                _this._wasUsed = true;
                node.extensions || (node.extensions = {});
                var emissiveStrengthInfo = {
                    emissiveStrength: tempEmissiveStrength,
                };
                // Normalize each value of the emissive factor to have a max value of 1
                var newEmissiveFactor = babylonMaterial.emissiveColor.scale(1 / emissiveStrengthInfo.emissiveStrength);
                node.emissiveFactor = newEmissiveFactor.asArray();
                node.extensions[NAME] = emissiveStrengthInfo;
            }
            return resolve(node);
        });
    };
    return KHR_materials_emissive_strength;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_emissive_strength(); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_ior.ts":
/*!*****************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_ior.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_ior: () => (/* binding */ KHR_materials_ior)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__);


var NAME = "KHR_materials_ior";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_ior/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_ior = /** @class */ (function () {
    function KHR_materials_ior() {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
    }
    /** Dispose */
    KHR_materials_ior.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_ior.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_materials_ior.prototype._isExtensionEnabled = function (mat) {
        // This extension must not be used on a material that also uses KHR_materials_unlit
        if (mat.unlit) {
            return false;
        }
        return mat.indexOfRefraction != undefined && mat.indexOfRefraction != 1.5; // 1.5 is normative default value.
    };
    /**
     * After exporting a material
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns promise, resolves with the material
     */
    KHR_materials_ior.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial && _this._isExtensionEnabled(babylonMaterial)) {
                _this._wasUsed = true;
                var iorInfo = {
                    ior: babylonMaterial.indexOfRefraction,
                };
                node.extensions = node.extensions || {};
                node.extensions[NAME] = iorInfo;
            }
            resolve(node);
        });
    };
    return KHR_materials_ior;
}());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_ior(); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_iridescence.ts":
/*!*************************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_iridescence.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_iridescence: () => (/* binding */ KHR_materials_iridescence)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrBaseMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__);


var NAME = "KHR_materials_iridescence";
/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_iridescence = /** @class */ (function () {
    function KHR_materials_iridescence(exporter) {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
        this._exporter = exporter;
    }
    KHR_materials_iridescence.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_iridescence.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_materials_iridescence.prototype.postExportMaterialAdditionalTextures = function (context, node, babylonMaterial) {
        var additionalTextures = [];
        if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRBaseMaterial) {
            if (babylonMaterial.iridescence.isEnabled) {
                if (babylonMaterial.iridescence.texture) {
                    additionalTextures.push(babylonMaterial.iridescence.texture);
                }
                if (babylonMaterial.iridescence.thicknessTexture && babylonMaterial.iridescence.thicknessTexture !== babylonMaterial.iridescence.texture) {
                    additionalTextures.push(babylonMaterial.iridescence.thicknessTexture);
                }
                return additionalTextures;
            }
        }
        return [];
    };
    KHR_materials_iridescence.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRBaseMaterial) {
                if (!babylonMaterial.iridescence.isEnabled) {
                    resolve(node);
                    return;
                }
                _this._wasUsed = true;
                node.extensions = node.extensions || {};
                var iridescenceTextureInfo = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.iridescence.texture);
                var iridescenceThicknessTextureInfo = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.iridescence.thicknessTexture);
                var iridescenceInfo_1 = {
                    iridescenceFactor: babylonMaterial.iridescence.intensity,
                    iridescenceIor: babylonMaterial.iridescence.indexOfRefraction,
                    iridescenceThicknessMinimum: babylonMaterial.iridescence.minimumThickness,
                    iridescenceThicknessMaximum: babylonMaterial.iridescence.maximumThickness,
                    iridescenceTexture: iridescenceTextureInfo !== null && iridescenceTextureInfo !== void 0 ? iridescenceTextureInfo : undefined,
                    iridescenceThicknessTexture: iridescenceThicknessTextureInfo !== null && iridescenceThicknessTextureInfo !== void 0 ? iridescenceThicknessTextureInfo : undefined,
                    hasTextures: function () {
                        return iridescenceInfo_1.iridescenceTexture !== null || iridescenceInfo_1.iridescenceThicknessTexture !== null;
                    },
                };
                node.extensions[NAME] = iridescenceInfo_1;
            }
            resolve(node);
        });
    };
    return KHR_materials_iridescence;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_iridescence(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_sheen.ts":
/*!*******************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_sheen.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_sheen: () => (/* binding */ KHR_materials_sheen)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__);


var NAME = "KHR_materials_sheen";
/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_sheen = /** @class */ (function () {
    function KHR_materials_sheen(exporter) {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
        this._exporter = exporter;
    }
    KHR_materials_sheen.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_sheen.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_materials_sheen.prototype.postExportMaterialAdditionalTextures = function (context, node, babylonMaterial) {
        if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
            if (babylonMaterial.sheen.isEnabled && babylonMaterial.sheen.texture) {
                return [babylonMaterial.sheen.texture];
            }
        }
        return [];
    };
    KHR_materials_sheen.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            var _a, _b, _c, _d;
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
                if (!babylonMaterial.sheen.isEnabled) {
                    resolve(node);
                    return;
                }
                _this._wasUsed = true;
                if (node.extensions == null) {
                    node.extensions = {};
                }
                var sheenInfo_1 = {
                    sheenColorFactor: babylonMaterial.sheen.color.asArray(),
                    sheenRoughnessFactor: (_a = babylonMaterial.sheen.roughness) !== null && _a !== void 0 ? _a : 0,
                    hasTextures: function () {
                        return sheenInfo_1.sheenColorTexture !== null || sheenInfo_1.sheenRoughnessTexture !== null;
                    },
                };
                if (babylonMaterial.sheen.texture) {
                    sheenInfo_1.sheenColorTexture = (_b = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.sheen.texture)) !== null && _b !== void 0 ? _b : undefined;
                }
                if (babylonMaterial.sheen.textureRoughness && !babylonMaterial.sheen.useRoughnessFromMainTexture) {
                    sheenInfo_1.sheenRoughnessTexture = (_c = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.sheen.textureRoughness)) !== null && _c !== void 0 ? _c : undefined;
                }
                else if (babylonMaterial.sheen.texture && babylonMaterial.sheen.useRoughnessFromMainTexture) {
                    sheenInfo_1.sheenRoughnessTexture = (_d = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.sheen.texture)) !== null && _d !== void 0 ? _d : undefined;
                }
                node.extensions[NAME] = sheenInfo_1;
            }
            resolve(node);
        });
    };
    return KHR_materials_sheen;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_sheen(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_specular.ts":
/*!**********************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_specular.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_specular: () => (/* binding */ KHR_materials_specular)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__);


var NAME = "KHR_materials_specular";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_specular/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_specular = /** @class */ (function () {
    function KHR_materials_specular(exporter) {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
        this._exporter = exporter;
    }
    /** Dispose */
    KHR_materials_specular.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_specular.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * After exporting a material, deal with the additional textures
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns array of additional textures to export
     */
    KHR_materials_specular.prototype.postExportMaterialAdditionalTextures = function (context, node, babylonMaterial) {
        var additionalTextures = [];
        if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
            if (this._isExtensionEnabled(babylonMaterial)) {
                if (babylonMaterial.metallicReflectanceTexture) {
                    additionalTextures.push(babylonMaterial.metallicReflectanceTexture);
                }
                if (babylonMaterial.reflectanceTexture) {
                    additionalTextures.push(babylonMaterial.reflectanceTexture);
                }
                return additionalTextures;
            }
        }
        return additionalTextures;
    };
    KHR_materials_specular.prototype._isExtensionEnabled = function (mat) {
        // This extension must not be used on a material that also uses KHR_materials_unlit
        if (mat.unlit) {
            return false;
        }
        return ((mat.metallicF0Factor != undefined && mat.metallicF0Factor != 1.0) ||
            (mat.metallicReflectanceColor != undefined && !mat.metallicReflectanceColor.equalsFloats(1.0, 1.0, 1.0)) ||
            this._hasTexturesExtension(mat));
    };
    KHR_materials_specular.prototype._hasTexturesExtension = function (mat) {
        return mat.metallicReflectanceTexture != null || mat.reflectanceTexture != null;
    };
    /**
     * After exporting a material
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns promise, resolves with the material
     */
    KHR_materials_specular.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            var _a, _b;
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial && _this._isExtensionEnabled(babylonMaterial)) {
                _this._wasUsed = true;
                node.extensions = node.extensions || {};
                var metallicReflectanceTexture = (_a = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.metallicReflectanceTexture)) !== null && _a !== void 0 ? _a : undefined;
                var reflectanceTexture = (_b = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.reflectanceTexture)) !== null && _b !== void 0 ? _b : undefined;
                var metallicF0Factor = babylonMaterial.metallicF0Factor == 1.0 ? undefined : babylonMaterial.metallicF0Factor;
                var metallicReflectanceColor = babylonMaterial.metallicReflectanceColor.equalsFloats(1.0, 1.0, 1.0)
                    ? undefined
                    : babylonMaterial.metallicReflectanceColor.asArray();
                var specularInfo = {
                    specularFactor: metallicF0Factor,
                    specularTexture: metallicReflectanceTexture,
                    specularColorFactor: metallicReflectanceColor,
                    specularColorTexture: reflectanceTexture,
                    hasTextures: function () {
                        return _this._hasTexturesExtension(babylonMaterial);
                    },
                };
                node.extensions[NAME] = specularInfo;
            }
            resolve(node);
        });
    };
    return KHR_materials_specular;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_specular(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_transmission.ts":
/*!**************************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_transmission.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_transmission: () => (/* binding */ KHR_materials_transmission)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Misc/logger */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__);




var NAME = "KHR_materials_transmission";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_transmission/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_transmission = /** @class */ (function () {
    function KHR_materials_transmission(exporter) {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
        this._exporter = exporter;
    }
    /** Dispose */
    KHR_materials_transmission.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_transmission.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * After exporting a material, deal with additional textures
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns array of additional textures to export
     */
    KHR_materials_transmission.prototype.postExportMaterialAdditionalTextures = function (context, node, babylonMaterial) {
        var additionalTextures = [];
        if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
            if (this._isExtensionEnabled(babylonMaterial)) {
                if (babylonMaterial.subSurface.thicknessTexture) {
                    additionalTextures.push(babylonMaterial.subSurface.thicknessTexture);
                }
                return additionalTextures;
            }
        }
        return additionalTextures;
    };
    KHR_materials_transmission.prototype._isExtensionEnabled = function (mat) {
        // This extension must not be used on a material that also uses KHR_materials_unlit
        if (mat.unlit) {
            return false;
        }
        var subs = mat.subSurface;
        return (subs.isRefractionEnabled && subs.refractionIntensity != undefined && subs.refractionIntensity != 0) || this._hasTexturesExtension(mat);
    };
    KHR_materials_transmission.prototype._hasTexturesExtension = function (mat) {
        return mat.subSurface.refractionIntensityTexture != null;
    };
    /**
     * After exporting a material
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns true if successful
     */
    KHR_materials_transmission.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function () {
            var subSurface, transmissionFactor, volumeInfo, transmissionTexture;
            var _this = this;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial && this._isExtensionEnabled(babylonMaterial))) return [3 /*break*/, 4];
                        this._wasUsed = true;
                        subSurface = babylonMaterial.subSurface;
                        transmissionFactor = subSurface.refractionIntensity === 0 ? undefined : subSurface.refractionIntensity;
                        volumeInfo = {
                            transmissionFactor: transmissionFactor,
                            hasTextures: function () {
                                return _this._hasTexturesExtension(babylonMaterial);
                            },
                        };
                        if (!subSurface.refractionIntensityTexture) return [3 /*break*/, 3];
                        if (!subSurface.useGltfStyleTextures) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._exporter._glTFMaterialExporter._exportTextureInfoAsync(subSurface.refractionIntensityTexture, "image/png" /* ImageMimeType.PNG */)];
                    case 1:
                        transmissionTexture = _a.sent();
                        if (transmissionTexture) {
                            volumeInfo.transmissionTexture = transmissionTexture;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.Logger.Warn("".concat(context, ": Exporting a subsurface refraction intensity texture without `useGltfStyleTextures` is not supported"));
                        _a.label = 3;
                    case 3:
                        node.extensions || (node.extensions = {});
                        node.extensions[NAME] = volumeInfo;
                        _a.label = 4;
                    case 4: return [2 /*return*/, node];
                }
            });
        });
    };
    return KHR_materials_transmission;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_transmission(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_unlit.ts":
/*!*******************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_unlit.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_unlit: () => (/* binding */ KHR_materials_unlit)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Materials/standardMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__);



var NAME = "KHR_materials_unlit";
/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_unlit = /** @class */ (function () {
    function KHR_materials_unlit() {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
    }
    Object.defineProperty(KHR_materials_unlit.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_materials_unlit.prototype.dispose = function () { };
    KHR_materials_unlit.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            var unlitMaterial = false;
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
                unlitMaterial = babylonMaterial.unlit;
            }
            else if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.StandardMaterial) {
                unlitMaterial = babylonMaterial.disableLighting;
            }
            if (unlitMaterial) {
                _this._wasUsed = true;
                if (node.extensions == null) {
                    node.extensions = {};
                }
                node.extensions[NAME] = {};
            }
            resolve(node);
        });
    };
    return KHR_materials_unlit;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function () { return new KHR_materials_unlit(); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_volume.ts":
/*!********************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_volume.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_volume: () => (/* binding */ KHR_materials_volume)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Maths/math.color */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__);



var NAME = "KHR_materials_volume";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_volume = /** @class */ (function () {
    function KHR_materials_volume(exporter) {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
        this._exporter = exporter;
    }
    KHR_materials_volume.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_volume.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * After exporting a material, deal with additional textures
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns array of additional textures to export
     */
    KHR_materials_volume.prototype.postExportMaterialAdditionalTextures = function (context, node, babylonMaterial) {
        var additionalTextures = [];
        if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
            if (this._isExtensionEnabled(babylonMaterial)) {
                if (babylonMaterial.subSurface.thicknessTexture) {
                    additionalTextures.push(babylonMaterial.subSurface.thicknessTexture);
                }
                return additionalTextures;
            }
        }
        return additionalTextures;
    };
    KHR_materials_volume.prototype._isExtensionEnabled = function (mat) {
        // This extension must not be used on a material that also uses KHR_materials_unlit
        if (mat.unlit) {
            return false;
        }
        var subs = mat.subSurface;
        // this extension requires either the KHR_materials_transmission or KHR_materials_diffuse_transmission extensions.
        if (!subs.isRefractionEnabled && !subs.isTranslucencyEnabled) {
            return false;
        }
        return ((subs.maximumThickness != undefined && subs.maximumThickness != 0) ||
            (subs.tintColorAtDistance != undefined && subs.tintColorAtDistance != Number.POSITIVE_INFINITY) ||
            (subs.tintColor != undefined && subs.tintColor != babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.Color3.White()) ||
            this._hasTexturesExtension(mat));
    };
    KHR_materials_volume.prototype._hasTexturesExtension = function (mat) {
        return mat.subSurface.thicknessTexture != null;
    };
    /**
     * After exporting a material
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns promise that resolves with the updated node
     */
    KHR_materials_volume.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            var _a;
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial && _this._isExtensionEnabled(babylonMaterial)) {
                _this._wasUsed = true;
                var subs = babylonMaterial.subSurface;
                var thicknessFactor = subs.maximumThickness == 0 ? undefined : subs.maximumThickness;
                var thicknessTexture = (_a = _this._exporter._glTFMaterialExporter._getTextureInfo(subs.thicknessTexture)) !== null && _a !== void 0 ? _a : undefined;
                var attenuationDistance = subs.tintColorAtDistance == Number.POSITIVE_INFINITY ? undefined : subs.tintColorAtDistance;
                var attenuationColor = subs.tintColor.equalsFloats(1.0, 1.0, 1.0) ? undefined : subs.tintColor.asArray();
                var volumeInfo = {
                    thicknessFactor: thicknessFactor,
                    thicknessTexture: thicknessTexture,
                    attenuationDistance: attenuationDistance,
                    attenuationColor: attenuationColor,
                    hasTextures: function () {
                        return _this._hasTexturesExtension(babylonMaterial);
                    },
                };
                node.extensions = node.extensions || {};
                node.extensions[NAME] = volumeInfo;
            }
            resolve(node);
        });
    };
    return KHR_materials_volume;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_volume(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_texture_transform.ts":
/*!*********************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_texture_transform.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_texture_transform: () => (/* binding */ KHR_texture_transform)
/* harmony export */ });
/* harmony import */ var babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/tools */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");


var NAME = "KHR_texture_transform";
/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_texture_transform = /** @class */ (function () {
    function KHR_texture_transform() {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        /** Reference to the glTF exporter */
        this._wasUsed = false;
    }
    KHR_texture_transform.prototype.dispose = function () { };
    Object.defineProperty(KHR_texture_transform.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_texture_transform.prototype.postExportTexture = function (context, textureInfo, babylonTexture) {
        var canUseExtension = babylonTexture &&
            ((babylonTexture.uAng === 0 && babylonTexture.wAng === 0 && babylonTexture.vAng === 0) ||
                (babylonTexture.uRotationCenter === 0 && babylonTexture.vRotationCenter === 0));
        if (canUseExtension) {
            var textureTransform = {};
            var transformIsRequired = false;
            if (babylonTexture.uOffset !== 0 || babylonTexture.vOffset !== 0) {
                textureTransform.offset = [babylonTexture.uOffset, babylonTexture.vOffset];
                transformIsRequired = true;
            }
            if (babylonTexture.uScale !== 1 || babylonTexture.vScale !== 1) {
                textureTransform.scale = [babylonTexture.uScale, babylonTexture.vScale];
                transformIsRequired = true;
            }
            if (babylonTexture.wAng !== 0) {
                textureTransform.rotation = -babylonTexture.wAng;
                transformIsRequired = true;
            }
            if (babylonTexture.coordinatesIndex !== 0) {
                textureTransform.texCoord = babylonTexture.coordinatesIndex;
                transformIsRequired = true;
            }
            if (!transformIsRequired) {
                return;
            }
            this._wasUsed = true;
            if (!textureInfo.extensions) {
                textureInfo.extensions = {};
            }
            textureInfo.extensions[NAME] = textureTransform;
        }
    };
    KHR_texture_transform.prototype.preExportTextureAsync = function (context, babylonTexture) {
        return new Promise(function (resolve, reject) {
            var scene = babylonTexture.getScene();
            if (!scene) {
                reject("".concat(context, ": \"scene\" is not defined for Babylon texture ").concat(babylonTexture.name, "!"));
                return;
            }
            /*
             * The KHR_texture_transform schema only supports w rotation around the origin.
             * See https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_texture_transform#gltf-schema-updates.
             */
            if (babylonTexture.uAng !== 0 || babylonTexture.vAng !== 0) {
                babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("".concat(context, ": Texture ").concat(babylonTexture.name, " with rotation in the u or v axis is not supported in glTF."));
                resolve(null);
            }
            else if (babylonTexture.wAng !== 0 && (babylonTexture.uRotationCenter !== 0 || babylonTexture.vRotationCenter !== 0)) {
                babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("".concat(context, ": Texture ").concat(babylonTexture.name, " with rotation not centered at the origin cannot be exported with ").concat(NAME));
                resolve(null);
            }
            else {
                resolve(babylonTexture);
            }
        });
    };
    return KHR_texture_transform;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_1__._Exporter.RegisterExtension(NAME, function () { return new KHR_texture_transform(); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/index.ts":
/*!*****************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/index.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXT_mesh_gpu_instancing: () => (/* reexport safe */ _EXT_mesh_gpu_instancing__WEBPACK_IMPORTED_MODULE_12__.EXT_mesh_gpu_instancing),
/* harmony export */   KHR_lights_punctual: () => (/* reexport safe */ _KHR_lights_punctual__WEBPACK_IMPORTED_MODULE_1__.KHR_lights_punctual),
/* harmony export */   KHR_materials_anisotropy: () => (/* reexport safe */ _KHR_materials_anisotropy__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_anisotropy),
/* harmony export */   KHR_materials_clearcoat: () => (/* reexport safe */ _KHR_materials_clearcoat__WEBPACK_IMPORTED_MODULE_2__.KHR_materials_clearcoat),
/* harmony export */   KHR_materials_diffuse_transmission: () => (/* reexport safe */ _KHR_materials_diffuse_transmission__WEBPACK_IMPORTED_MODULE_14__.KHR_materials_diffuse_transmission),
/* harmony export */   KHR_materials_dispersion: () => (/* reexport safe */ _KHR_materials_dispersion__WEBPACK_IMPORTED_MODULE_10__.KHR_materials_dispersion),
/* harmony export */   KHR_materials_emissive_strength: () => (/* reexport safe */ _KHR_materials_emissive_strength__WEBPACK_IMPORTED_MODULE_13__.KHR_materials_emissive_strength),
/* harmony export */   KHR_materials_ior: () => (/* reexport safe */ _KHR_materials_ior__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_ior),
/* harmony export */   KHR_materials_iridescence: () => (/* reexport safe */ _KHR_materials_iridescence__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_iridescence),
/* harmony export */   KHR_materials_sheen: () => (/* reexport safe */ _KHR_materials_sheen__WEBPACK_IMPORTED_MODULE_5__.KHR_materials_sheen),
/* harmony export */   KHR_materials_specular: () => (/* reexport safe */ _KHR_materials_specular__WEBPACK_IMPORTED_MODULE_8__.KHR_materials_specular),
/* harmony export */   KHR_materials_transmission: () => (/* reexport safe */ _KHR_materials_transmission__WEBPACK_IMPORTED_MODULE_11__.KHR_materials_transmission),
/* harmony export */   KHR_materials_unlit: () => (/* reexport safe */ _KHR_materials_unlit__WEBPACK_IMPORTED_MODULE_6__.KHR_materials_unlit),
/* harmony export */   KHR_materials_volume: () => (/* reexport safe */ _KHR_materials_volume__WEBPACK_IMPORTED_MODULE_9__.KHR_materials_volume),
/* harmony export */   KHR_texture_transform: () => (/* reexport safe */ _KHR_texture_transform__WEBPACK_IMPORTED_MODULE_0__.KHR_texture_transform)
/* harmony export */ });
/* harmony import */ var _KHR_texture_transform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KHR_texture_transform */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_texture_transform.ts");
/* harmony import */ var _KHR_lights_punctual__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KHR_lights_punctual */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_lights_punctual.ts");
/* harmony import */ var _KHR_materials_clearcoat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./KHR_materials_clearcoat */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_clearcoat.ts");
/* harmony import */ var _KHR_materials_iridescence__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./KHR_materials_iridescence */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_iridescence.ts");
/* harmony import */ var _KHR_materials_anisotropy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./KHR_materials_anisotropy */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_anisotropy.ts");
/* harmony import */ var _KHR_materials_sheen__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./KHR_materials_sheen */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_sheen.ts");
/* harmony import */ var _KHR_materials_unlit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./KHR_materials_unlit */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_unlit.ts");
/* harmony import */ var _KHR_materials_ior__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./KHR_materials_ior */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_ior.ts");
/* harmony import */ var _KHR_materials_specular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./KHR_materials_specular */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_specular.ts");
/* harmony import */ var _KHR_materials_volume__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./KHR_materials_volume */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_volume.ts");
/* harmony import */ var _KHR_materials_dispersion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./KHR_materials_dispersion */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_dispersion.ts");
/* harmony import */ var _KHR_materials_transmission__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./KHR_materials_transmission */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_transmission.ts");
/* harmony import */ var _EXT_mesh_gpu_instancing__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./EXT_mesh_gpu_instancing */ "../../../dev/serializers/src/glTF/2.0/Extensions/EXT_mesh_gpu_instancing.ts");
/* harmony import */ var _KHR_materials_emissive_strength__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./KHR_materials_emissive_strength */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_emissive_strength.ts");
/* harmony import */ var _KHR_materials_diffuse_transmission__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./KHR_materials_diffuse_transmission */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_diffuse_transmission.ts");

















/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/glTFAnimation.ts":
/*!**************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/glTFAnimation.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _GLTFAnimation: () => (/* binding */ _GLTFAnimation)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Lights/light */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFUtilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glTFUtilities */ "../../../dev/serializers/src/glTF/2.0/glTFUtilities.ts");









/**
 * @internal
 * Enum for handling in tangent and out tangent.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var _TangentType;
(function (_TangentType) {
    /**
     * Specifies that input tangents are used.
     */
    _TangentType[_TangentType["INTANGENT"] = 0] = "INTANGENT";
    /**
     * Specifies that output tangents are used.
     */
    _TangentType[_TangentType["OUTTANGENT"] = 1] = "OUTTANGENT";
})(_TangentType || (_TangentType = {}));
/**
 * @internal
 * Utility class for generating glTF animation data from BabylonJS.
 */
var _GLTFAnimation = /** @class */ (function () {
    function _GLTFAnimation() {
    }
    /**
     * Determine if a node is transformable - ie has properties it should be part of animation of transformation.
     * @param babylonNode the node to test
     * @returns true if can be animated, false otherwise. False if the parameter is null or undefined.
     */
    _GLTFAnimation._IsTransformable = function (babylonNode) {
        return babylonNode && (babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TransformNode || babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Camera || babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Light);
    };
    /**
     * @ignore
     *
     * Creates glTF channel animation from BabylonJS animation.
     * @param babylonTransformNode - BabylonJS mesh.
     * @param animation - animation.
     * @param animationChannelTargetPath - The target animation channel.
     * @param useQuaternion - Specifies if quaternions are used.
     * @returns nullable IAnimationData
     */
    _GLTFAnimation._CreateNodeAnimation = function (babylonTransformNode, animation, animationChannelTargetPath, useQuaternion, animationSampleRate) {
        if (this._IsTransformable(babylonTransformNode)) {
            var inputs = [];
            var outputs = [];
            var keyFrames = animation.getKeys();
            var minMaxKeyFrames = _GLTFAnimation._CalculateMinMaxKeyFrames(keyFrames);
            var interpolationOrBake = _GLTFAnimation._DeduceInterpolation(keyFrames, animationChannelTargetPath, useQuaternion);
            var interpolation = interpolationOrBake.interpolationType;
            var shouldBakeAnimation = interpolationOrBake.shouldBakeAnimation;
            if (shouldBakeAnimation) {
                _GLTFAnimation._CreateBakedAnimation(babylonTransformNode, animation, animationChannelTargetPath, minMaxKeyFrames.min, minMaxKeyFrames.max, animation.framePerSecond, animationSampleRate, inputs, outputs, minMaxKeyFrames, useQuaternion);
            }
            else {
                if (interpolation === "LINEAR" /* AnimationSamplerInterpolation.LINEAR */ || interpolation === "STEP" /* AnimationSamplerInterpolation.STEP */) {
                    _GLTFAnimation._CreateLinearOrStepAnimation(babylonTransformNode, animation, animationChannelTargetPath, inputs, outputs, useQuaternion);
                }
                else if (interpolation === "CUBICSPLINE" /* AnimationSamplerInterpolation.CUBICSPLINE */) {
                    _GLTFAnimation._CreateCubicSplineAnimation(babylonTransformNode, animation, animationChannelTargetPath, inputs, outputs, useQuaternion);
                }
                else {
                    _GLTFAnimation._CreateBakedAnimation(babylonTransformNode, animation, animationChannelTargetPath, minMaxKeyFrames.min, minMaxKeyFrames.max, animation.framePerSecond, animationSampleRate, inputs, outputs, minMaxKeyFrames, useQuaternion);
                }
            }
            if (inputs.length && outputs.length) {
                var result = {
                    inputs: inputs,
                    outputs: outputs,
                    samplerInterpolation: interpolation,
                    inputsMin: shouldBakeAnimation ? minMaxKeyFrames.min : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.FloatRound(minMaxKeyFrames.min / animation.framePerSecond),
                    inputsMax: shouldBakeAnimation ? minMaxKeyFrames.max : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.FloatRound(minMaxKeyFrames.max / animation.framePerSecond),
                };
                return result;
            }
        }
        return null;
    };
    _GLTFAnimation._DeduceAnimationInfo = function (animation) {
        var animationChannelTargetPath = null;
        var dataAccessorType = "VEC3" /* AccessorType.VEC3 */;
        var useQuaternion = false;
        var property = animation.targetProperty.split(".");
        switch (property[0]) {
            case "scaling": {
                animationChannelTargetPath = "scale" /* AnimationChannelTargetPath.SCALE */;
                break;
            }
            case "position": {
                animationChannelTargetPath = "translation" /* AnimationChannelTargetPath.TRANSLATION */;
                break;
            }
            case "rotation": {
                dataAccessorType = "VEC4" /* AccessorType.VEC4 */;
                animationChannelTargetPath = "rotation" /* AnimationChannelTargetPath.ROTATION */;
                break;
            }
            case "rotationQuaternion": {
                dataAccessorType = "VEC4" /* AccessorType.VEC4 */;
                useQuaternion = true;
                animationChannelTargetPath = "rotation" /* AnimationChannelTargetPath.ROTATION */;
                break;
            }
            case "influence": {
                dataAccessorType = "SCALAR" /* AccessorType.SCALAR */;
                animationChannelTargetPath = "weights" /* AnimationChannelTargetPath.WEIGHTS */;
                break;
            }
            default: {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("Unsupported animatable property ".concat(property[0]));
            }
        }
        if (animationChannelTargetPath) {
            return { animationChannelTargetPath: animationChannelTargetPath, dataAccessorType: dataAccessorType, useQuaternion: useQuaternion };
        }
        else {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("animation channel target path and data accessor type could be deduced");
        }
        return null;
    };
    /**
     * @ignore
     * Create node animations from the transform node animations
     * @param babylonNode
     * @param runtimeGLTFAnimation
     * @param idleGLTFAnimations
     * @param nodeMap
     * @param nodes
     * @param binaryWriter
     * @param bufferViews
     * @param accessors
     * @param animationSampleRate
     */
    _GLTFAnimation._CreateNodeAnimationFromNodeAnimations = function (babylonNode, runtimeGLTFAnimation, idleGLTFAnimations, nodeMap, nodes, binaryWriter, bufferViews, accessors, animationSampleRate, shouldExportAnimation) {
        var glTFAnimation;
        if (_GLTFAnimation._IsTransformable(babylonNode)) {
            if (babylonNode.animations) {
                for (var _i = 0, _a = babylonNode.animations; _i < _a.length; _i++) {
                    var animation = _a[_i];
                    if (shouldExportAnimation && !shouldExportAnimation(animation)) {
                        continue;
                    }
                    var animationInfo = _GLTFAnimation._DeduceAnimationInfo(animation);
                    if (animationInfo) {
                        glTFAnimation = {
                            name: animation.name,
                            samplers: [],
                            channels: [],
                        };
                        _GLTFAnimation._AddAnimation("".concat(animation.name), animation.hasRunningRuntimeAnimations ? runtimeGLTFAnimation : glTFAnimation, babylonNode, animation, animationInfo.dataAccessorType, animationInfo.animationChannelTargetPath, nodeMap, binaryWriter, bufferViews, accessors, animationInfo.useQuaternion, animationSampleRate);
                        if (glTFAnimation.samplers.length && glTFAnimation.channels.length) {
                            idleGLTFAnimations.push(glTFAnimation);
                        }
                    }
                }
            }
        }
    };
    /**
     * @ignore
     * Create individual morph animations from the mesh's morph target animation tracks
     * @param babylonNode
     * @param runtimeGLTFAnimation
     * @param idleGLTFAnimations
     * @param nodeMap
     * @param nodes
     * @param binaryWriter
     * @param bufferViews
     * @param accessors
     * @param animationSampleRate
     */
    _GLTFAnimation._CreateMorphTargetAnimationFromMorphTargetAnimations = function (babylonNode, runtimeGLTFAnimation, idleGLTFAnimations, nodeMap, nodes, binaryWriter, bufferViews, accessors, animationSampleRate, shouldExportAnimation) {
        var glTFAnimation;
        if (babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Mesh) {
            var morphTargetManager = babylonNode.morphTargetManager;
            if (morphTargetManager) {
                for (var i = 0; i < morphTargetManager.numTargets; ++i) {
                    var morphTarget = morphTargetManager.getTarget(i);
                    for (var _i = 0, _a = morphTarget.animations; _i < _a.length; _i++) {
                        var animation = _a[_i];
                        if (shouldExportAnimation && !shouldExportAnimation(animation)) {
                            continue;
                        }
                        var combinedAnimation = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Animation("".concat(animation.name), "influence", animation.framePerSecond, animation.dataType, animation.loopMode, animation.enableBlending);
                        var combinedAnimationKeys = [];
                        var animationKeys = animation.getKeys();
                        for (var j = 0; j < animationKeys.length; ++j) {
                            var animationKey = animationKeys[j];
                            for (var k = 0; k < morphTargetManager.numTargets; ++k) {
                                if (k == i) {
                                    combinedAnimationKeys.push(animationKey);
                                }
                                else {
                                    combinedAnimationKeys.push({ frame: animationKey.frame, value: 0 });
                                }
                            }
                        }
                        combinedAnimation.setKeys(combinedAnimationKeys);
                        var animationInfo = _GLTFAnimation._DeduceAnimationInfo(combinedAnimation);
                        if (animationInfo) {
                            glTFAnimation = {
                                name: combinedAnimation.name,
                                samplers: [],
                                channels: [],
                            };
                            _GLTFAnimation._AddAnimation(animation.name, animation.hasRunningRuntimeAnimations ? runtimeGLTFAnimation : glTFAnimation, babylonNode, combinedAnimation, animationInfo.dataAccessorType, animationInfo.animationChannelTargetPath, nodeMap, binaryWriter, bufferViews, accessors, animationInfo.useQuaternion, animationSampleRate, morphTargetManager.numTargets);
                            if (glTFAnimation.samplers.length && glTFAnimation.channels.length) {
                                idleGLTFAnimations.push(glTFAnimation);
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * @internal
     * Create node and morph animations from the animation groups
     * @param babylonScene
     * @param glTFAnimations
     * @param nodeMap
     * @param nodes
     * @param binaryWriter
     * @param bufferViews
     * @param accessors
     * @param animationSampleRate
     */
    _GLTFAnimation._CreateNodeAndMorphAnimationFromAnimationGroups = function (babylonScene, glTFAnimations, nodeMap, binaryWriter, bufferViews, accessors, animationSampleRate, shouldExportAnimation) {
        var _a;
        var glTFAnimation;
        if (babylonScene.animationGroups) {
            var animationGroups = babylonScene.animationGroups;
            var _loop_1 = function (animationGroup) {
                var morphAnimations = new Map();
                var sampleAnimations = new Map();
                var morphAnimationMeshes = new Set();
                var animationGroupFrameDiff = animationGroup.to - animationGroup.from;
                glTFAnimation = {
                    name: animationGroup.name,
                    channels: [],
                    samplers: [],
                };
                var _loop_2 = function (i) {
                    var targetAnimation = animationGroup.targetedAnimations[i];
                    var target = targetAnimation.target;
                    var animation = targetAnimation.animation;
                    if (shouldExportAnimation && !shouldExportAnimation(animation)) {
                        return "continue";
                    }
                    if (this_1._IsTransformable(target) || (target.length === 1 && this_1._IsTransformable(target[0]))) {
                        var animationInfo = _GLTFAnimation._DeduceAnimationInfo(targetAnimation.animation);
                        if (animationInfo) {
                            var babylonTransformNode = this_1._IsTransformable(target) ? target : this_1._IsTransformable(target[0]) ? target[0] : null;
                            if (babylonTransformNode) {
                                _GLTFAnimation._AddAnimation("".concat(animation.name), glTFAnimation, babylonTransformNode, animation, animationInfo.dataAccessorType, animationInfo.animationChannelTargetPath, nodeMap, binaryWriter, bufferViews, accessors, animationInfo.useQuaternion, animationSampleRate);
                            }
                        }
                    }
                    else if (target instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.MorphTarget || (target.length === 1 && target[0] instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.MorphTarget)) {
                        var animationInfo = _GLTFAnimation._DeduceAnimationInfo(targetAnimation.animation);
                        if (animationInfo) {
                            var babylonMorphTarget_1 = target instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.MorphTarget ? target : target[0];
                            if (babylonMorphTarget_1) {
                                var babylonMorphTargetManager_1 = babylonScene.morphTargetManagers.find(function (morphTargetManager) {
                                    for (var j = 0; j < morphTargetManager.numTargets; ++j) {
                                        if (morphTargetManager.getTarget(j) === babylonMorphTarget_1) {
                                            return true;
                                        }
                                    }
                                    return false;
                                });
                                if (babylonMorphTargetManager_1) {
                                    var babylonMesh = babylonScene.meshes.find(function (mesh) {
                                        return mesh.morphTargetManager === babylonMorphTargetManager_1;
                                    });
                                    if (babylonMesh) {
                                        if (!morphAnimations.has(babylonMesh)) {
                                            morphAnimations.set(babylonMesh, new Map());
                                        }
                                        (_a = morphAnimations.get(babylonMesh)) === null || _a === void 0 ? void 0 : _a.set(babylonMorphTarget_1, animation);
                                        morphAnimationMeshes.add(babylonMesh);
                                        sampleAnimations.set(babylonMesh, animation);
                                    }
                                }
                            }
                        }
                    }
                    else {
                        // this is the place for the KHR_animation_pointer.
                    }
                };
                for (var i = 0; i < animationGroup.targetedAnimations.length; ++i) {
                    _loop_2(i);
                }
                morphAnimationMeshes.forEach(function (mesh) {
                    var morphTargetManager = mesh.morphTargetManager;
                    var combinedAnimationGroup = null;
                    var animationKeys = [];
                    var sampleAnimation = sampleAnimations.get(mesh);
                    var sampleAnimationKeys = sampleAnimation.getKeys();
                    var numAnimationKeys = sampleAnimationKeys.length;
                    /*
                        Due to how glTF expects morph target animation data to be formatted, we need to rearrange the individual morph target animation tracks,
                        such that we have a single animation, where a given keyframe input value has successive output values for each morph target belonging to the manager.
                        See: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations

                        We do this via constructing a new Animation track, and interleaving the frames of each morph target animation track in the current Animation Group
                        We reuse the Babylon Animation data structure for ease of handling export of cubic spline animation keys, and to reuse the
                        existing _GLTFAnimation.AddAnimation codepath with minimal modification, however the constructed Babylon Animation is NOT intended for use in-engine.
                    */
                    for (var i = 0; i < numAnimationKeys; ++i) {
                        for (var j = 0; j < morphTargetManager.numTargets; ++j) {
                            var morphTarget = morphTargetManager.getTarget(j);
                            var animationsByMorphTarget = morphAnimations.get(mesh);
                            if (animationsByMorphTarget) {
                                var morphTargetAnimation = animationsByMorphTarget.get(morphTarget);
                                if (morphTargetAnimation) {
                                    if (!combinedAnimationGroup) {
                                        combinedAnimationGroup = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Animation("".concat(animationGroup.name, "_").concat(mesh.name, "_MorphWeightAnimation"), "influence", morphTargetAnimation.framePerSecond, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, morphTargetAnimation.loopMode, morphTargetAnimation.enableBlending);
                                    }
                                    animationKeys.push(morphTargetAnimation.getKeys()[i]);
                                }
                                else {
                                    animationKeys.push({
                                        frame: animationGroup.from + (animationGroupFrameDiff / numAnimationKeys) * i,
                                        value: morphTarget.influence,
                                        inTangent: sampleAnimationKeys[0].inTangent ? 0 : undefined,
                                        outTangent: sampleAnimationKeys[0].outTangent ? 0 : undefined,
                                    });
                                }
                            }
                        }
                    }
                    combinedAnimationGroup.setKeys(animationKeys);
                    var animationInfo = _GLTFAnimation._DeduceAnimationInfo(combinedAnimationGroup);
                    if (animationInfo) {
                        _GLTFAnimation._AddAnimation("".concat(animationGroup.name, "_").concat(mesh.name, "_MorphWeightAnimation"), glTFAnimation, mesh, combinedAnimationGroup, animationInfo.dataAccessorType, animationInfo.animationChannelTargetPath, nodeMap, binaryWriter, bufferViews, accessors, animationInfo.useQuaternion, animationSampleRate, morphTargetManager === null || morphTargetManager === void 0 ? void 0 : morphTargetManager.numTargets);
                    }
                });
                if (glTFAnimation.channels.length && glTFAnimation.samplers.length) {
                    glTFAnimations.push(glTFAnimation);
                }
            };
            var this_1 = this;
            for (var _i = 0, animationGroups_1 = animationGroups; _i < animationGroups_1.length; _i++) {
                var animationGroup = animationGroups_1[_i];
                _loop_1(animationGroup);
            }
        }
    };
    _GLTFAnimation._AddAnimation = function (name, glTFAnimation, babylonTransformNode, animation, dataAccessorType, animationChannelTargetPath, nodeMap, binaryWriter, bufferViews, accessors, useQuaternion, animationSampleRate, morphAnimationChannels) {
        var animationData = _GLTFAnimation._CreateNodeAnimation(babylonTransformNode, animation, animationChannelTargetPath, useQuaternion, animationSampleRate);
        var bufferView;
        var accessor;
        var keyframeAccessorIndex;
        var dataAccessorIndex;
        var outputLength;
        var animationSampler;
        var animationChannel;
        if (animationData) {
            /*
             * Now that we have the glTF converted morph target animation data,
             * we can remove redundant input data so that we have n input frames,
             * and morphAnimationChannels * n output frames
             */
            if (morphAnimationChannels) {
                var index = 0;
                var currentInput = 0;
                var newInputs = [];
                while (animationData.inputs.length > 0) {
                    currentInput = animationData.inputs.shift();
                    if (index % morphAnimationChannels == 0) {
                        newInputs.push(currentInput);
                    }
                    index++;
                }
                animationData.inputs = newInputs;
            }
            var nodeIndex = nodeMap[babylonTransformNode.uniqueId];
            // Creates buffer view and accessor for key frames.
            var byteLength = animationData.inputs.length * 4;
            bufferView = _glTFUtilities__WEBPACK_IMPORTED_MODULE_1__._GLTFUtilities._CreateBufferView(0, binaryWriter.getByteOffset(), byteLength, undefined, "".concat(name, "  keyframe data view"));
            bufferViews.push(bufferView);
            animationData.inputs.forEach(function (input) {
                binaryWriter.setFloat32(input);
            });
            accessor = _glTFUtilities__WEBPACK_IMPORTED_MODULE_1__._GLTFUtilities._CreateAccessor(bufferViews.length - 1, "".concat(name, "  keyframes"), "SCALAR" /* AccessorType.SCALAR */, 5126 /* AccessorComponentType.FLOAT */, animationData.inputs.length, null, [animationData.inputsMin], [animationData.inputsMax]);
            accessors.push(accessor);
            keyframeAccessorIndex = accessors.length - 1;
            // create bufferview and accessor for keyed values.
            outputLength = animationData.outputs.length;
            byteLength = _glTFUtilities__WEBPACK_IMPORTED_MODULE_1__._GLTFUtilities._GetDataAccessorElementCount(dataAccessorType) * 4 * animationData.outputs.length;
            // check for in and out tangents
            bufferView = _glTFUtilities__WEBPACK_IMPORTED_MODULE_1__._GLTFUtilities._CreateBufferView(0, binaryWriter.getByteOffset(), byteLength, undefined, "".concat(name, "  data view"));
            bufferViews.push(bufferView);
            animationData.outputs.forEach(function (output) {
                output.forEach(function (entry) {
                    binaryWriter.setFloat32(entry);
                });
            });
            accessor = _glTFUtilities__WEBPACK_IMPORTED_MODULE_1__._GLTFUtilities._CreateAccessor(bufferViews.length - 1, "".concat(name, "  data"), dataAccessorType, 5126 /* AccessorComponentType.FLOAT */, outputLength, null, null, null);
            accessors.push(accessor);
            dataAccessorIndex = accessors.length - 1;
            // create sampler
            animationSampler = {
                interpolation: animationData.samplerInterpolation,
                input: keyframeAccessorIndex,
                output: dataAccessorIndex,
            };
            glTFAnimation.samplers.push(animationSampler);
            // create channel
            animationChannel = {
                sampler: glTFAnimation.samplers.length - 1,
                target: {
                    node: nodeIndex,
                    path: animationChannelTargetPath,
                },
            };
            glTFAnimation.channels.push(animationChannel);
        }
    };
    /**
     * Create a baked animation
     * @param babylonTransformNode BabylonJS mesh
     * @param animation BabylonJS animation corresponding to the BabylonJS mesh
     * @param animationChannelTargetPath animation target channel
     * @param minFrame minimum animation frame
     * @param maxFrame maximum animation frame
     * @param fps frames per second of the animation
     * @param sampleRate
     * @param inputs input key frames of the animation
     * @param outputs output key frame data of the animation
     * @param minMaxFrames
     * @param minMaxFrames.min
     * @param minMaxFrames.max
     * @param useQuaternion specifies if quaternions should be used
     */
    _GLTFAnimation._CreateBakedAnimation = function (babylonTransformNode, animation, animationChannelTargetPath, minFrame, maxFrame, fps, sampleRate, inputs, outputs, minMaxFrames, useQuaternion) {
        var value;
        var quaternionCache = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.Identity();
        var previousTime = null;
        var time;
        var maxUsedFrame = null;
        var currKeyFrame = null;
        var nextKeyFrame = null;
        var prevKeyFrame = null;
        var endFrame = null;
        minMaxFrames.min = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.FloatRound(minFrame / fps);
        var keyFrames = animation.getKeys();
        for (var i = 0, length_1 = keyFrames.length; i < length_1; ++i) {
            endFrame = null;
            currKeyFrame = keyFrames[i];
            if (i + 1 < length_1) {
                nextKeyFrame = keyFrames[i + 1];
                if ((currKeyFrame.value.equals && currKeyFrame.value.equals(nextKeyFrame.value)) || currKeyFrame.value === nextKeyFrame.value) {
                    if (i === 0) {
                        // set the first frame to itself
                        endFrame = currKeyFrame.frame;
                    }
                    else {
                        continue;
                    }
                }
                else {
                    endFrame = nextKeyFrame.frame;
                }
            }
            else {
                // at the last key frame
                prevKeyFrame = keyFrames[i - 1];
                if ((currKeyFrame.value.equals && currKeyFrame.value.equals(prevKeyFrame.value)) || currKeyFrame.value === prevKeyFrame.value) {
                    continue;
                }
                else {
                    endFrame = maxFrame;
                }
            }
            if (endFrame) {
                for (var f = currKeyFrame.frame; f <= endFrame; f += sampleRate) {
                    time = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.FloatRound(f / fps);
                    if (time === previousTime) {
                        continue;
                    }
                    previousTime = time;
                    maxUsedFrame = time;
                    var state = {
                        key: 0,
                        repeatCount: 0,
                        loopMode: animation.loopMode,
                    };
                    value = animation._interpolate(f, state);
                    _GLTFAnimation._SetInterpolatedValue(babylonTransformNode, value, time, animation, animationChannelTargetPath, quaternionCache, inputs, outputs, useQuaternion);
                }
            }
        }
        if (maxUsedFrame) {
            minMaxFrames.max = maxUsedFrame;
        }
    };
    _GLTFAnimation._ConvertFactorToVector3OrQuaternion = function (factor, babylonTransformNode, animation, animationChannelTargetPath, useQuaternion) {
        var basePositionRotationOrScale = _GLTFAnimation._GetBasePositionRotationOrScale(babylonTransformNode, animationChannelTargetPath, useQuaternion);
        // handles single component x, y, z or w component animation by using a base property and animating over a component.
        var property = animation.targetProperty.split(".");
        var componentName = property ? property[1] : ""; // x, y, z, or w component
        var value = useQuaternion ? babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromArray(basePositionRotationOrScale).normalize() : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(basePositionRotationOrScale);
        switch (componentName) {
            case "x":
            case "y":
            case "z": {
                value[componentName] = factor;
                break;
            }
            case "w": {
                value.w = factor;
                break;
            }
            default: {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("glTFAnimation: Unsupported component name \"".concat(componentName, "\"!"));
            }
        }
        return value;
    };
    _GLTFAnimation._SetInterpolatedValue = function (babylonTransformNode, value, time, animation, animationChannelTargetPath, quaternionCache, inputs, outputs, useQuaternion) {
        var cacheValue;
        inputs.push(time);
        if (animationChannelTargetPath === "weights" /* AnimationChannelTargetPath.WEIGHTS */) {
            outputs.push([value]);
            return;
        }
        if (animation.dataType === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT) {
            value = this._ConvertFactorToVector3OrQuaternion(value, babylonTransformNode, animation, animationChannelTargetPath, useQuaternion);
        }
        if (animationChannelTargetPath === "rotation" /* AnimationChannelTargetPath.ROTATION */) {
            if (useQuaternion) {
                quaternionCache = value;
            }
            else {
                cacheValue = value;
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.RotationYawPitchRollToRef(cacheValue.y, cacheValue.x, cacheValue.z, quaternionCache);
            }
            outputs.push(quaternionCache.asArray());
        }
        else {
            // scaling and position animation
            cacheValue = value;
            outputs.push(cacheValue.asArray());
        }
    };
    /**
     * Creates linear animation from the animation key frames
     * @param babylonTransformNode BabylonJS mesh
     * @param animation BabylonJS animation
     * @param animationChannelTargetPath The target animation channel
     * @param inputs Array to store the key frame times
     * @param outputs Array to store the key frame data
     * @param useQuaternion Specifies if quaternions are used in the animation
     */
    _GLTFAnimation._CreateLinearOrStepAnimation = function (babylonTransformNode, animation, animationChannelTargetPath, inputs, outputs, useQuaternion) {
        for (var _i = 0, _a = animation.getKeys(); _i < _a.length; _i++) {
            var keyFrame = _a[_i];
            inputs.push(keyFrame.frame / animation.framePerSecond); // keyframes in seconds.
            _GLTFAnimation._AddKeyframeValue(keyFrame, animation, outputs, animationChannelTargetPath, babylonTransformNode, useQuaternion);
        }
    };
    /**
     * Creates cubic spline animation from the animation key frames
     * @param babylonTransformNode BabylonJS mesh
     * @param animation BabylonJS animation
     * @param animationChannelTargetPath The target animation channel
     * @param inputs Array to store the key frame times
     * @param outputs Array to store the key frame data
     * @param useQuaternion Specifies if quaternions are used in the animation
     */
    _GLTFAnimation._CreateCubicSplineAnimation = function (babylonTransformNode, animation, animationChannelTargetPath, inputs, outputs, useQuaternion) {
        animation.getKeys().forEach(function (keyFrame) {
            inputs.push(keyFrame.frame / animation.framePerSecond); // keyframes in seconds.
            _GLTFAnimation._AddSplineTangent(_TangentType.INTANGENT, outputs, animationChannelTargetPath, "CUBICSPLINE" /* AnimationSamplerInterpolation.CUBICSPLINE */, keyFrame, useQuaternion);
            _GLTFAnimation._AddKeyframeValue(keyFrame, animation, outputs, animationChannelTargetPath, babylonTransformNode, useQuaternion);
            _GLTFAnimation._AddSplineTangent(_TangentType.OUTTANGENT, outputs, animationChannelTargetPath, "CUBICSPLINE" /* AnimationSamplerInterpolation.CUBICSPLINE */, keyFrame, useQuaternion);
        });
    };
    _GLTFAnimation._GetBasePositionRotationOrScale = function (babylonTransformNode, animationChannelTargetPath, useQuaternion) {
        var basePositionRotationOrScale;
        if (animationChannelTargetPath === "rotation" /* AnimationChannelTargetPath.ROTATION */) {
            if (useQuaternion) {
                var q = babylonTransformNode.rotationQuaternion;
                basePositionRotationOrScale = (q !== null && q !== void 0 ? q : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.Identity()).asArray();
            }
            else {
                var r = babylonTransformNode.rotation;
                basePositionRotationOrScale = (r !== null && r !== void 0 ? r : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero()).asArray();
            }
        }
        else if (animationChannelTargetPath === "translation" /* AnimationChannelTargetPath.TRANSLATION */) {
            var p = babylonTransformNode.position;
            basePositionRotationOrScale = (p !== null && p !== void 0 ? p : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero()).asArray();
        }
        else {
            // scale
            var s = babylonTransformNode.scaling;
            basePositionRotationOrScale = (s !== null && s !== void 0 ? s : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.One()).asArray();
        }
        return basePositionRotationOrScale;
    };
    /**
     * Adds a key frame value
     * @param keyFrame
     * @param animation
     * @param outputs
     * @param animationChannelTargetPath
     * @param babylonTransformNode
     * @param useQuaternion
     */
    _GLTFAnimation._AddKeyframeValue = function (keyFrame, animation, outputs, animationChannelTargetPath, babylonTransformNode, useQuaternion) {
        var newPositionRotationOrScale;
        var animationType = animation.dataType;
        if (animationType === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_VECTOR3) {
            var value = keyFrame.value.asArray();
            if (animationChannelTargetPath === "rotation" /* AnimationChannelTargetPath.ROTATION */) {
                var array = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(value);
                var rotationQuaternion = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.RotationYawPitchRoll(array.y, array.x, array.z);
                value = rotationQuaternion.asArray();
            }
            outputs.push(value); // scale  vector.
        }
        else if (animationType === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT) {
            if (animationChannelTargetPath === "weights" /* AnimationChannelTargetPath.WEIGHTS */) {
                outputs.push([keyFrame.value]);
            }
            else {
                // handles single component x, y, z or w component animation by using a base property and animating over a component.
                newPositionRotationOrScale = this._ConvertFactorToVector3OrQuaternion(keyFrame.value, babylonTransformNode, animation, animationChannelTargetPath, useQuaternion);
                if (newPositionRotationOrScale) {
                    if (animationChannelTargetPath === "rotation" /* AnimationChannelTargetPath.ROTATION */) {
                        var posRotScale = useQuaternion
                            ? newPositionRotationOrScale
                            : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.RotationYawPitchRoll(newPositionRotationOrScale.y, newPositionRotationOrScale.x, newPositionRotationOrScale.z).normalize();
                        outputs.push(posRotScale.asArray());
                    }
                    outputs.push(newPositionRotationOrScale.asArray());
                }
            }
        }
        else if (animationType === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_QUATERNION) {
            outputs.push(keyFrame.value.normalize().asArray());
        }
        else {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("glTFAnimation: Unsupported key frame values for animation!");
        }
    };
    /**
     * @internal
     * Determine the interpolation based on the key frames
     * @param keyFrames
     * @param animationChannelTargetPath
     * @param useQuaternion
     */
    _GLTFAnimation._DeduceInterpolation = function (keyFrames, animationChannelTargetPath, useQuaternion) {
        var interpolationType;
        var shouldBakeAnimation = false;
        var key;
        if (animationChannelTargetPath === "rotation" /* AnimationChannelTargetPath.ROTATION */ && !useQuaternion) {
            return { interpolationType: "LINEAR" /* AnimationSamplerInterpolation.LINEAR */, shouldBakeAnimation: true };
        }
        for (var i = 0, length_2 = keyFrames.length; i < length_2; ++i) {
            key = keyFrames[i];
            if (key.inTangent || key.outTangent) {
                if (interpolationType) {
                    if (interpolationType !== "CUBICSPLINE" /* AnimationSamplerInterpolation.CUBICSPLINE */) {
                        interpolationType = "LINEAR" /* AnimationSamplerInterpolation.LINEAR */;
                        shouldBakeAnimation = true;
                        break;
                    }
                }
                else {
                    interpolationType = "CUBICSPLINE" /* AnimationSamplerInterpolation.CUBICSPLINE */;
                }
            }
            else {
                if (interpolationType) {
                    if (interpolationType === "CUBICSPLINE" /* AnimationSamplerInterpolation.CUBICSPLINE */ ||
                        (key.interpolation && key.interpolation === 1 /* AnimationKeyInterpolation.STEP */ && interpolationType !== "STEP" /* AnimationSamplerInterpolation.STEP */)) {
                        interpolationType = "LINEAR" /* AnimationSamplerInterpolation.LINEAR */;
                        shouldBakeAnimation = true;
                        break;
                    }
                }
                else {
                    if (key.interpolation && key.interpolation === 1 /* AnimationKeyInterpolation.STEP */) {
                        interpolationType = "STEP" /* AnimationSamplerInterpolation.STEP */;
                    }
                    else {
                        interpolationType = "LINEAR" /* AnimationSamplerInterpolation.LINEAR */;
                    }
                }
            }
        }
        if (!interpolationType) {
            interpolationType = "LINEAR" /* AnimationSamplerInterpolation.LINEAR */;
        }
        return { interpolationType: interpolationType, shouldBakeAnimation: shouldBakeAnimation };
    };
    /**
     * Adds an input tangent or output tangent to the output data
     * If an input tangent or output tangent is missing, it uses the zero vector or zero quaternion
     * @param tangentType Specifies which type of tangent to handle (inTangent or outTangent)
     * @param outputs The animation data by keyframe
     * @param animationChannelTargetPath The target animation channel
     * @param interpolation The interpolation type
     * @param keyFrame The key frame with the animation data
     * @param useQuaternion Specifies if quaternions are used
     */
    _GLTFAnimation._AddSplineTangent = function (tangentType, outputs, animationChannelTargetPath, interpolation, keyFrame, useQuaternion) {
        var tangent;
        var tangentValue = tangentType === _TangentType.INTANGENT ? keyFrame.inTangent : keyFrame.outTangent;
        if (interpolation === "CUBICSPLINE" /* AnimationSamplerInterpolation.CUBICSPLINE */) {
            if (animationChannelTargetPath === "rotation" /* AnimationChannelTargetPath.ROTATION */) {
                if (tangentValue) {
                    if (useQuaternion) {
                        tangent = tangentValue.asArray();
                    }
                    else {
                        var array = tangentValue;
                        tangent = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.RotationYawPitchRoll(array.y, array.x, array.z).asArray();
                    }
                }
                else {
                    tangent = [0, 0, 0, 0];
                }
            }
            else if (animationChannelTargetPath === "weights" /* AnimationChannelTargetPath.WEIGHTS */) {
                if (tangentValue) {
                    tangent = [tangentValue];
                }
                else {
                    tangent = [0];
                }
            }
            else {
                if (tangentValue) {
                    tangent = tangentValue.asArray();
                }
                else {
                    tangent = [0, 0, 0];
                }
            }
            outputs.push(tangent);
        }
    };
    /**
     * Get the minimum and maximum key frames' frame values
     * @param keyFrames animation key frames
     * @returns the minimum and maximum key frame value
     */
    _GLTFAnimation._CalculateMinMaxKeyFrames = function (keyFrames) {
        var min = Infinity;
        var max = -Infinity;
        keyFrames.forEach(function (keyFrame) {
            min = Math.min(min, keyFrame.frame);
            max = Math.max(max, keyFrame.frame);
        });
        return { min: min, max: max };
    };
    return _GLTFAnimation;
}());



/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/glTFData.ts":
/*!*********************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/glTFData.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTFData: () => (/* binding */ GLTFData)
/* harmony export */ });
/**
 * Class for holding and downloading glTF file data
 */
var GLTFData = /** @class */ (function () {
    /**
     * Initializes the glTF file object
     */
    function GLTFData() {
        this.glTFFiles = {};
    }
    /**
     * Downloads the glTF data as files based on their names and data
     */
    GLTFData.prototype.downloadFiles = function () {
        /**
         * Checks for a matching suffix at the end of a string (for ES5 and lower)
         * @param str Source string
         * @param suffix Suffix to search for in the source string
         * @returns Boolean indicating whether the suffix was found (true) or not (false)
         */
        function endsWith(str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }
        for (var key in this.glTFFiles) {
            var link = document.createElement("a");
            document.body.appendChild(link);
            link.setAttribute("type", "hidden");
            link.download = key;
            var blob = this.glTFFiles[key];
            var mimeType = void 0;
            if (endsWith(key, ".glb")) {
                mimeType = { type: "model/gltf-binary" };
            }
            else if (endsWith(key, ".bin")) {
                mimeType = { type: "application/octet-stream" };
            }
            else if (endsWith(key, ".gltf")) {
                mimeType = { type: "model/gltf+json" };
            }
            else if (endsWith(key, ".jpeg") || endsWith(key, ".jpg")) {
                mimeType = { type: "image/jpeg" /* ImageMimeType.JPEG */ };
            }
            else if (endsWith(key, ".png")) {
                mimeType = { type: "image/png" /* ImageMimeType.PNG */ };
            }
            link.href = window.URL.createObjectURL(new Blob([blob], mimeType));
            link.click();
        }
    };
    return GLTFData;
}());



/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts":
/*!*************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/glTFExporter.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _BinaryWriter: () => (/* binding */ _BinaryWriter),
/* harmony export */   _Exporter: () => (/* binding */ _Exporter)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/multiMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFMaterialExporter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glTFMaterialExporter */ "../../../dev/serializers/src/glTF/2.0/glTFMaterialExporter.ts");
/* harmony import */ var _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./glTFUtilities */ "../../../dev/serializers/src/glTF/2.0/glTFUtilities.ts");
/* harmony import */ var _glTFData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./glTFData */ "../../../dev/serializers/src/glTF/2.0/glTFData.ts");
/* harmony import */ var _glTFAnimation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./glTFAnimation */ "../../../dev/serializers/src/glTF/2.0/glTFAnimation.ts");


















// Matrix that converts handedness on the X-axis.
var convertHandednessMatrix = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Matrix.Compose(new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3(-1, 1, 1), babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.Identity(), babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero());
// 180 degrees rotation in Y.
var rotation180Y = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion(0, 1, 0, 0);
function isNoopNode(node, useRightHandedSystem) {
    if (!(node instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TransformNode)) {
        return false;
    }
    // Transform
    if (useRightHandedSystem) {
        var matrix = node.getWorldMatrix();
        if (!matrix.isIdentity()) {
            return false;
        }
    }
    else {
        var matrix = node.getWorldMatrix().multiplyToRef(convertHandednessMatrix, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Matrix[0]);
        if (!matrix.isIdentity()) {
            return false;
        }
    }
    // Geometry
    if ((node instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Mesh && node.geometry) || (node instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.InstancedMesh && node.sourceMesh.geometry)) {
        return false;
    }
    return true;
}
function convertNodeHandedness(node) {
    var translation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArrayToRef(node.translation || [0, 0, 0], 0, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[0]);
    var rotation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromArrayToRef(node.rotation || [0, 0, 0, 1], 0, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Quaternion[0]);
    var scale = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArrayToRef(node.scale || [1, 1, 1], 0, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[1]);
    var matrix = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Matrix.ComposeToRef(scale, rotation, translation, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Matrix[0]).multiplyToRef(convertHandednessMatrix, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Matrix[0]);
    matrix.decompose(scale, rotation, translation);
    if (translation.equalsToFloats(0, 0, 0)) {
        delete node.translation;
    }
    else {
        node.translation = translation.asArray();
    }
    if (babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.IsIdentity(rotation)) {
        delete node.rotation;
    }
    else {
        node.rotation = rotation.asArray();
    }
    if (scale.equalsToFloats(1, 1, 1)) {
        delete node.scale;
    }
    else {
        node.scale = scale.asArray();
    }
}
function getBinaryWriterFunc(binaryWriter, attributeComponentKind) {
    switch (attributeComponentKind) {
        case 5121 /* AccessorComponentType.UNSIGNED_BYTE */: {
            return binaryWriter.setUInt8.bind(binaryWriter);
        }
        case 5123 /* AccessorComponentType.UNSIGNED_SHORT */: {
            return binaryWriter.setUInt16.bind(binaryWriter);
        }
        case 5125 /* AccessorComponentType.UNSIGNED_INT */: {
            return binaryWriter.setUInt32.bind(binaryWriter);
        }
        case 5126 /* AccessorComponentType.FLOAT */: {
            return binaryWriter.setFloat32.bind(binaryWriter);
        }
        default: {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Unsupported Attribute Component kind: " + attributeComponentKind);
            return null;
        }
    }
}
/**
 * Converts Babylon Scene into glTF 2.0.
 * @internal
 */
var _Exporter = /** @class */ (function () {
    /**
     * Creates a glTF Exporter instance, which can accept optional exporter options
     * @param babylonScene Babylon scene object
     * @param options Options to modify the behavior of the exporter
     */
    function _Exporter(babylonScene, options) {
        this._extensions = {};
        this._glTF = {
            asset: { generator: "Babylon.js v".concat(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Engine.Version), version: "2.0" },
        };
        babylonScene = babylonScene || babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.EngineStore.LastCreatedScene;
        if (!babylonScene) {
            return;
        }
        this._babylonScene = babylonScene;
        this._bufferViews = [];
        this._accessors = [];
        this._meshes = [];
        this._scenes = [];
        this._cameras = [];
        this._nodes = [];
        this._images = [];
        this._materials = [];
        this._materialMap = [];
        this._textures = [];
        this._samplers = [];
        this._skins = [];
        this._animations = [];
        this._imageData = {};
        this._orderedImageData = [];
        this._options = options || {};
        this._animationSampleRate = this._options.animationSampleRate || 1 / 60;
        this._glTFMaterialExporter = new _glTFMaterialExporter__WEBPACK_IMPORTED_MODULE_1__._GLTFMaterialExporter(this);
        this._loadExtensions();
    }
    _Exporter.prototype._applyExtension = function (node, extensions, index, actionAsync) {
        var _this = this;
        if (index >= extensions.length) {
            return Promise.resolve(node);
        }
        var currentPromise = actionAsync(extensions[index], node);
        if (!currentPromise) {
            return this._applyExtension(node, extensions, index + 1, actionAsync);
        }
        return currentPromise.then(function (newNode) { return _this._applyExtension(newNode, extensions, index + 1, actionAsync); });
    };
    _Exporter.prototype._applyExtensions = function (node, actionAsync) {
        var extensions = [];
        for (var _i = 0, _a = _Exporter._ExtensionNames; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            extensions.push(this._extensions[name_1]);
        }
        return this._applyExtension(node, extensions, 0, actionAsync);
    };
    _Exporter.prototype._extensionsPreExportTextureAsync = function (context, babylonTexture, mimeType) {
        return this._applyExtensions(babylonTexture, function (extension, node) { return extension.preExportTextureAsync && extension.preExportTextureAsync(context, node, mimeType); });
    };
    _Exporter.prototype._extensionsPostExportMeshPrimitiveAsync = function (context, meshPrimitive, babylonSubMesh, binaryWriter) {
        return this._applyExtensions(meshPrimitive, function (extension, node) { return extension.postExportMeshPrimitiveAsync && extension.postExportMeshPrimitiveAsync(context, node, babylonSubMesh, binaryWriter); });
    };
    _Exporter.prototype._extensionsPostExportNodeAsync = function (context, node, babylonNode, nodeMap, binaryWriter) {
        return this._applyExtensions(node, function (extension, node) { return extension.postExportNodeAsync && extension.postExportNodeAsync(context, node, babylonNode, nodeMap, binaryWriter); });
    };
    _Exporter.prototype._extensionsPostExportMaterialAsync = function (context, material, babylonMaterial) {
        return this._applyExtensions(material, function (extension, node) { return extension.postExportMaterialAsync && extension.postExportMaterialAsync(context, node, babylonMaterial); });
    };
    _Exporter.prototype._extensionsPostExportMaterialAdditionalTextures = function (context, material, babylonMaterial) {
        var output = [];
        for (var _i = 0, _a = _Exporter._ExtensionNames; _i < _a.length; _i++) {
            var name_2 = _a[_i];
            var extension = this._extensions[name_2];
            if (extension.postExportMaterialAdditionalTextures) {
                output.push.apply(output, extension.postExportMaterialAdditionalTextures(context, material, babylonMaterial));
            }
        }
        return output;
    };
    _Exporter.prototype._extensionsPostExportTextures = function (context, textureInfo, babylonTexture) {
        for (var _i = 0, _a = _Exporter._ExtensionNames; _i < _a.length; _i++) {
            var name_3 = _a[_i];
            var extension = this._extensions[name_3];
            if (extension.postExportTexture) {
                extension.postExportTexture(context, textureInfo, babylonTexture);
            }
        }
    };
    _Exporter.prototype._forEachExtensions = function (action) {
        for (var _i = 0, _a = _Exporter._ExtensionNames; _i < _a.length; _i++) {
            var name_4 = _a[_i];
            var extension = this._extensions[name_4];
            if (extension.enabled) {
                action(extension);
            }
        }
    };
    _Exporter.prototype._extensionsOnExporting = function () {
        var _this = this;
        this._forEachExtensions(function (extension) {
            if (extension.wasUsed) {
                if (_this._glTF.extensionsUsed == null) {
                    _this._glTF.extensionsUsed = [];
                }
                if (_this._glTF.extensionsUsed.indexOf(extension.name) === -1) {
                    _this._glTF.extensionsUsed.push(extension.name);
                }
                if (extension.required) {
                    if (_this._glTF.extensionsRequired == null) {
                        _this._glTF.extensionsRequired = [];
                    }
                    if (_this._glTF.extensionsRequired.indexOf(extension.name) === -1) {
                        _this._glTF.extensionsRequired.push(extension.name);
                    }
                }
                if (_this._glTF.extensions == null) {
                    _this._glTF.extensions = {};
                }
                if (extension.onExporting) {
                    extension.onExporting();
                }
            }
        });
    };
    /**
     * Load glTF serializer extensions
     */
    _Exporter.prototype._loadExtensions = function () {
        for (var _i = 0, _a = _Exporter._ExtensionNames; _i < _a.length; _i++) {
            var name_5 = _a[_i];
            var extension = _Exporter._ExtensionFactories[name_5](this);
            this._extensions[name_5] = extension;
        }
    };
    _Exporter.prototype.dispose = function () {
        for (var extensionKey in this._extensions) {
            var extension = this._extensions[extensionKey];
            extension.dispose();
        }
    };
    Object.defineProperty(_Exporter.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Registers a glTF exporter extension
     * @param name Name of the extension to export
     * @param factory The factory function that creates the exporter extension
     */
    _Exporter.RegisterExtension = function (name, factory) {
        if (_Exporter.UnregisterExtension(name)) {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Extension with the name ".concat(name, " already exists"));
        }
        _Exporter._ExtensionFactories[name] = factory;
        _Exporter._ExtensionNames.push(name);
    };
    /**
     * Un-registers an exporter extension
     * @param name The name fo the exporter extension
     * @returns A boolean indicating whether the extension has been un-registered
     */
    _Exporter.UnregisterExtension = function (name) {
        if (!_Exporter._ExtensionFactories[name]) {
            return false;
        }
        delete _Exporter._ExtensionFactories[name];
        var index = _Exporter._ExtensionNames.indexOf(name);
        if (index !== -1) {
            _Exporter._ExtensionNames.splice(index, 1);
        }
        return true;
    };
    _Exporter.prototype._reorderIndicesBasedOnPrimitiveMode = function (submesh, primitiveMode, babylonIndices, byteOffset, binaryWriter) {
        switch (primitiveMode) {
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFillMode: {
                if (!byteOffset) {
                    byteOffset = 0;
                }
                for (var i = submesh.indexStart, length_1 = submesh.indexStart + submesh.indexCount; i < length_1; i = i + 3) {
                    var index = byteOffset + i * 4;
                    // swap the second and third indices
                    var secondIndex = binaryWriter.getUInt32(index + 4);
                    var thirdIndex = binaryWriter.getUInt32(index + 8);
                    binaryWriter.setUInt32(thirdIndex, index + 4);
                    binaryWriter.setUInt32(secondIndex, index + 8);
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFanDrawMode: {
                for (var i = submesh.indexStart + submesh.indexCount - 1, start = submesh.indexStart; i >= start; --i) {
                    binaryWriter.setUInt32(babylonIndices[i], byteOffset);
                    byteOffset += 4;
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleStripDrawMode: {
                if (submesh.indexCount >= 3) {
                    binaryWriter.setUInt32(babylonIndices[submesh.indexStart + 2], byteOffset + 4);
                    binaryWriter.setUInt32(babylonIndices[submesh.indexStart + 1], byteOffset + 8);
                }
                break;
            }
        }
    };
    /**
     * Reorders the vertex attribute data based on the primitive mode.  This is necessary when indices are not available and the winding order is
     * clock-wise during export to glTF
     * @param submesh BabylonJS submesh
     * @param primitiveMode Primitive mode of the mesh
     * @param vertexBufferKind The type of vertex attribute
     * @param meshAttributeArray The vertex attribute data
     * @param byteOffset The offset to the binary data
     * @param binaryWriter The binary data for the glTF file
     */
    _Exporter.prototype._reorderVertexAttributeDataBasedOnPrimitiveMode = function (submesh, primitiveMode, vertexBufferKind, meshAttributeArray, byteOffset, binaryWriter) {
        switch (primitiveMode) {
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFillMode: {
                this._reorderTriangleFillMode(submesh, vertexBufferKind, meshAttributeArray, byteOffset, binaryWriter);
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleStripDrawMode: {
                this._reorderTriangleStripDrawMode(submesh, vertexBufferKind, meshAttributeArray, byteOffset, binaryWriter);
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFanDrawMode: {
                this._reorderTriangleFanMode(submesh, vertexBufferKind, meshAttributeArray, byteOffset, binaryWriter);
                break;
            }
        }
    };
    /**
     * Reorders the vertex attributes in the correct triangle mode order .  This is necessary when indices are not available and the winding order is
     * clock-wise during export to glTF
     * @param submesh BabylonJS submesh
     * @param vertexBufferKind The type of vertex attribute
     * @param meshAttributeArray The vertex attribute data
     * @param byteOffset The offset to the binary data
     * @param binaryWriter The binary data for the glTF file
     */
    _Exporter.prototype._reorderTriangleFillMode = function (submesh, vertexBufferKind, meshAttributeArray, byteOffset, binaryWriter) {
        var vertexBuffer = this._getVertexBufferFromMesh(vertexBufferKind, submesh.getMesh());
        if (vertexBuffer) {
            var stride = vertexBuffer.byteStride / babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.GetTypeByteLength(vertexBuffer.type);
            if (submesh.verticesCount % 3 !== 0) {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("The submesh vertices for the triangle fill mode is not divisible by 3!");
            }
            else {
                var vertexData = [];
                var index = 0;
                switch (vertexBufferKind) {
                    case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind:
                    case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind: {
                        for (var x = submesh.verticesStart; x < submesh.verticesStart + submesh.verticesCount; x = x + 3) {
                            index = x * stride;
                            vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index));
                            vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index + 2 * stride));
                            vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index + stride));
                        }
                        break;
                    }
                    case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind: {
                        for (var x = submesh.verticesStart; x < submesh.verticesStart + submesh.verticesCount; x = x + 3) {
                            index = x * stride;
                            vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index));
                            vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index + 2 * stride));
                            vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index + stride));
                        }
                        break;
                    }
                    case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind: {
                        var size = vertexBuffer.getSize();
                        for (var x = submesh.verticesStart; x < submesh.verticesStart + submesh.verticesCount; x = x + size) {
                            index = x * stride;
                            if (size === 4) {
                                vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index));
                                vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index + 2 * stride));
                                vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index + stride));
                            }
                            else {
                                vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index));
                                vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index + 2 * stride));
                                vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index + stride));
                            }
                        }
                        break;
                    }
                    case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind:
                    case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind: {
                        for (var x = submesh.verticesStart; x < submesh.verticesStart + submesh.verticesCount; x = x + 3) {
                            index = x * stride;
                            vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2.FromArray(meshAttributeArray, index));
                            vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2.FromArray(meshAttributeArray, index + 2 * stride));
                            vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2.FromArray(meshAttributeArray, index + stride));
                        }
                        break;
                    }
                    default: {
                        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("Unsupported Vertex Buffer type: ".concat(vertexBufferKind));
                    }
                }
                this._writeVertexAttributeData(vertexData, byteOffset, vertexBufferKind, binaryWriter);
            }
        }
        else {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("reorderTriangleFillMode: Vertex Buffer Kind ".concat(vertexBufferKind, " not present!"));
        }
    };
    /**
     * Reorders the vertex attributes in the correct triangle strip order.  This is necessary when indices are not available and the winding order is
     * clock-wise during export to glTF
     * @param submesh BabylonJS submesh
     * @param vertexBufferKind The type of vertex attribute
     * @param meshAttributeArray The vertex attribute data
     * @param byteOffset The offset to the binary data
     * @param binaryWriter The binary data for the glTF file
     */
    _Exporter.prototype._reorderTriangleStripDrawMode = function (submesh, vertexBufferKind, meshAttributeArray, byteOffset, binaryWriter) {
        var vertexBuffer = this._getVertexBufferFromMesh(vertexBufferKind, submesh.getMesh());
        if (vertexBuffer) {
            var stride = vertexBuffer.byteStride / babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.GetTypeByteLength(vertexBuffer.type);
            var vertexData = [];
            var index = 0;
            switch (vertexBufferKind) {
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind:
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind: {
                    index = submesh.verticesStart;
                    vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index + 2 * stride));
                    vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index + stride));
                    break;
                }
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind: {
                    for (var x = submesh.verticesStart + submesh.verticesCount - 1; x >= submesh.verticesStart; --x) {
                        index = x * stride;
                        vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index));
                    }
                    break;
                }
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind: {
                    for (var x = submesh.verticesStart + submesh.verticesCount - 1; x >= submesh.verticesStart; --x) {
                        index = x * stride;
                        vertexBuffer.getSize() === 4
                            ? vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index))
                            : vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index));
                    }
                    break;
                }
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind:
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind: {
                    for (var x = submesh.verticesStart + submesh.verticesCount - 1; x >= submesh.verticesStart; --x) {
                        index = x * stride;
                        vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2.FromArray(meshAttributeArray, index));
                    }
                    break;
                }
                default: {
                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("Unsupported Vertex Buffer type: ".concat(vertexBufferKind));
                }
            }
            this._writeVertexAttributeData(vertexData, byteOffset + 12, vertexBufferKind, binaryWriter);
        }
        else {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("reorderTriangleStripDrawMode: Vertex buffer kind ".concat(vertexBufferKind, " not present!"));
        }
    };
    /**
     * Reorders the vertex attributes in the correct triangle fan order.  This is necessary when indices are not available and the winding order is
     * clock-wise during export to glTF
     * @param submesh BabylonJS submesh
     * @param vertexBufferKind The type of vertex attribute
     * @param meshAttributeArray The vertex attribute data
     * @param byteOffset The offset to the binary data
     * @param binaryWriter The binary data for the glTF file
     */
    _Exporter.prototype._reorderTriangleFanMode = function (submesh, vertexBufferKind, meshAttributeArray, byteOffset, binaryWriter) {
        var vertexBuffer = this._getVertexBufferFromMesh(vertexBufferKind, submesh.getMesh());
        if (vertexBuffer) {
            var stride = vertexBuffer.byteStride / babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.GetTypeByteLength(vertexBuffer.type);
            var vertexData = [];
            var index = 0;
            switch (vertexBufferKind) {
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind:
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind: {
                    for (var x = submesh.verticesStart + submesh.verticesCount - 1; x >= submesh.verticesStart; --x) {
                        index = x * stride;
                        vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index));
                    }
                    break;
                }
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind: {
                    for (var x = submesh.verticesStart + submesh.verticesCount - 1; x >= submesh.verticesStart; --x) {
                        index = x * stride;
                        vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index));
                    }
                    break;
                }
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind: {
                    for (var x = submesh.verticesStart + submesh.verticesCount - 1; x >= submesh.verticesStart; --x) {
                        index = x * stride;
                        vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index));
                        vertexBuffer.getSize() === 4
                            ? vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index))
                            : vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index));
                    }
                    break;
                }
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind:
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind: {
                    for (var x = submesh.verticesStart + submesh.verticesCount - 1; x >= submesh.verticesStart; --x) {
                        index = x * stride;
                        vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2.FromArray(meshAttributeArray, index));
                    }
                    break;
                }
                default: {
                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("Unsupported Vertex Buffer type: ".concat(vertexBufferKind));
                }
            }
            this._writeVertexAttributeData(vertexData, byteOffset, vertexBufferKind, binaryWriter);
        }
        else {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("reorderTriangleFanMode: Vertex buffer kind ".concat(vertexBufferKind, " not present!"));
        }
    };
    /**
     * Writes the vertex attribute data to binary
     * @param vertices The vertices to write to the binary writer
     * @param byteOffset The offset into the binary writer to overwrite binary data
     * @param vertexAttributeKind The vertex attribute type
     * @param binaryWriter The writer containing the binary data
     */
    _Exporter.prototype._writeVertexAttributeData = function (vertices, byteOffset, vertexAttributeKind, binaryWriter) {
        for (var _i = 0, vertices_1 = vertices; _i < vertices_1.length; _i++) {
            var vertex = vertices_1[_i];
            if (vertexAttributeKind === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind) {
                vertex.normalize();
            }
            else if (vertexAttributeKind === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind && vertex instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4) {
                _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._NormalizeTangentFromRef(vertex);
            }
            for (var _a = 0, _b = vertex.asArray(); _a < _b.length; _a++) {
                var component = _b[_a];
                binaryWriter.setFloat32(component, byteOffset);
                byteOffset += 4;
            }
        }
    };
    /**
     * Writes mesh attribute data to a data buffer
     * Returns the bytelength of the data
     * @param vertexBufferKind Indicates what kind of vertex data is being passed in
     * @param attributeComponentKind
     * @param meshAttributeArray Array containing the attribute data
     * @param stride Specifies the space between data
     * @param binaryWriter The buffer to write the binary data to
     * @param babylonTransformNode
     */
    _Exporter.prototype._writeAttributeData = function (vertexBufferKind, attributeComponentKind, meshAttributeArray, stride, binaryWriter, babylonTransformNode) {
        var vertexAttributes = [];
        var index;
        switch (vertexBufferKind) {
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind: {
                for (var k = 0, length_2 = meshAttributeArray.length / stride; k < length_2; ++k) {
                    index = k * stride;
                    var vertexData = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index);
                    vertexAttributes.push(vertexData.asArray());
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind: {
                for (var k = 0, length_3 = meshAttributeArray.length / stride; k < length_3; ++k) {
                    index = k * stride;
                    var vertexData = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index);
                    vertexAttributes.push(vertexData.normalize().asArray());
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind: {
                for (var k = 0, length_4 = meshAttributeArray.length / stride; k < length_4; ++k) {
                    index = k * stride;
                    var vertexData = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index);
                    _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._NormalizeTangentFromRef(vertexData);
                    vertexAttributes.push(vertexData.asArray());
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind: {
                var meshMaterial = babylonTransformNode.material;
                var convertToLinear = meshMaterial ? meshMaterial.getClassName() === "StandardMaterial" : true;
                var vertexData = stride === 3 ? new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3() : new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color4();
                var useExactSrgbConversions = this._babylonScene.getEngine().useExactSrgbConversions;
                for (var k = 0, length_5 = meshAttributeArray.length / stride; k < length_5; ++k) {
                    index = k * stride;
                    if (stride === 3) {
                        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArrayToRef(meshAttributeArray, index, vertexData);
                        if (convertToLinear) {
                            vertexData.toLinearSpaceToRef(vertexData, useExactSrgbConversions);
                        }
                    }
                    else {
                        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color4.FromArrayToRef(meshAttributeArray, index, vertexData);
                        if (convertToLinear) {
                            vertexData.toLinearSpaceToRef(vertexData, useExactSrgbConversions);
                        }
                    }
                    vertexAttributes.push(vertexData.asArray());
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind:
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind: {
                for (var k = 0, length_6 = meshAttributeArray.length / stride; k < length_6; ++k) {
                    index = k * stride;
                    var vertexData = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2.FromArray(meshAttributeArray, index);
                    vertexAttributes.push(vertexData.asArray());
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesKind:
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesExtraKind: {
                for (var k = 0, length_7 = meshAttributeArray.length / stride; k < length_7; ++k) {
                    index = k * stride;
                    var vertexData = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index);
                    vertexAttributes.push(vertexData.asArray());
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesWeightsKind:
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesWeightsExtraKind: {
                for (var k = 0, length_8 = meshAttributeArray.length / stride; k < length_8; ++k) {
                    index = k * stride;
                    var vertexData = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index);
                    vertexAttributes.push(vertexData.asArray());
                }
                break;
            }
            default: {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Unsupported Vertex Buffer Type: " + vertexBufferKind);
                vertexAttributes = [];
            }
        }
        var writeBinaryFunc = getBinaryWriterFunc(binaryWriter, attributeComponentKind);
        if (writeBinaryFunc) {
            for (var _i = 0, vertexAttributes_1 = vertexAttributes; _i < vertexAttributes_1.length; _i++) {
                var vertexAttribute = vertexAttributes_1[_i];
                for (var _a = 0, vertexAttribute_1 = vertexAttribute; _a < vertexAttribute_1.length; _a++) {
                    var component = vertexAttribute_1[_a];
                    writeBinaryFunc(component);
                }
            }
        }
    };
    _Exporter.prototype._createMorphTargetBufferViewKind = function (vertexBufferKind, accessorType, attributeComponentKind, mesh, morphTarget, binaryWriter, byteStride) {
        var vertexCount;
        var minMax;
        var morphData = [];
        var difference = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[0];
        switch (vertexBufferKind) {
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind: {
                var morphPositions = morphTarget.getPositions();
                if (!morphPositions) {
                    return null;
                }
                var originalPositions = mesh.getVerticesData(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind, undefined, undefined, true);
                var vertexStart = 0;
                var min = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3(Infinity, Infinity, Infinity);
                var max = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3(-Infinity, -Infinity, -Infinity);
                vertexCount = originalPositions.length / 3;
                for (var i = vertexStart; i < vertexCount; ++i) {
                    var originalPosition = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(originalPositions, i * 3);
                    var morphPosition = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(morphPositions, i * 3);
                    morphPosition.subtractToRef(originalPosition, difference);
                    min.copyFromFloats(Math.min(difference.x, min.x), Math.min(difference.y, min.y), Math.min(difference.z, min.z));
                    max.copyFromFloats(Math.max(difference.x, max.x), Math.max(difference.y, max.y), Math.max(difference.z, max.z));
                    morphData.push(difference.x, difference.y, difference.z);
                }
                minMax = { min: min, max: max };
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind: {
                var morphNormals = morphTarget.getNormals();
                if (!morphNormals) {
                    return null;
                }
                var originalNormals = mesh.getVerticesData(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, undefined, undefined, true);
                var vertexStart = 0;
                vertexCount = originalNormals.length / 3;
                for (var i = vertexStart; i < vertexCount; ++i) {
                    var originalNormal = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(originalNormals, i * 3).normalize();
                    var morphNormal = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(morphNormals, i * 3).normalize();
                    morphNormal.subtractToRef(originalNormal, difference);
                    morphData.push(difference.x, difference.y, difference.z);
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind: {
                var morphTangents = morphTarget.getTangents();
                if (!morphTangents) {
                    return null;
                }
                // Handedness cannot be displaced, so morph target tangents omit the w component
                accessorType = "VEC3" /* AccessorType.VEC3 */;
                byteStride = 12; // 3 components (x/y/z) * 4 bytes (float32)
                var originalTangents = mesh.getVerticesData(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind, undefined, undefined, true);
                var vertexStart = 0;
                vertexCount = originalTangents.length / 4;
                for (var i = vertexStart; i < vertexCount; ++i) {
                    // Only read the x, y, z components and ignore w
                    var originalTangent = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(originalTangents, i * 4);
                    _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._NormalizeTangentFromRef(originalTangent);
                    // Morph target tangents omit the w component so it won't be present in the data
                    var morphTangent = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(morphTangents, i * 3);
                    _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._NormalizeTangentFromRef(morphTangent);
                    morphTangent.subtractToRef(originalTangent, difference);
                    morphData.push(difference.x, difference.y, difference.z);
                }
                break;
            }
            default: {
                return null;
            }
        }
        var binaryWriterFunc = getBinaryWriterFunc(binaryWriter, attributeComponentKind);
        if (!binaryWriterFunc) {
            return null;
        }
        var typeByteLength = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.GetTypeByteLength(attributeComponentKind);
        var byteLength = morphData.length * typeByteLength;
        var bufferView = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateBufferView(0, binaryWriter.getByteOffset(), byteLength, byteStride, "".concat(vertexBufferKind, " - ").concat(morphTarget.name, " (Morph Target)"));
        this._bufferViews.push(bufferView);
        var bufferViewIndex = this._bufferViews.length - 1;
        for (var _i = 0, morphData_1 = morphData; _i < morphData_1.length; _i++) {
            var value = morphData_1[_i];
            binaryWriterFunc(value);
        }
        return { bufferViewIndex: bufferViewIndex, vertexCount: vertexCount, accessorType: accessorType, minMax: minMax };
    };
    /**
     * Generates glTF json data
     * @param shouldUseGlb Indicates whether the json should be written for a glb file
     * @param glTFPrefix Text to use when prefixing a glTF file
     * @param prettyPrint Indicates whether the json file should be pretty printed (true) or not (false)
     * @returns json data as string
     */
    _Exporter.prototype._generateJSON = function (shouldUseGlb, glTFPrefix, prettyPrint) {
        var _this = this;
        var buffer = { byteLength: this._totalByteLength };
        var imageName;
        var imageData;
        var bufferView;
        var byteOffset = this._totalByteLength;
        if (buffer.byteLength) {
            this._glTF.buffers = [buffer];
        }
        if (this._nodes && this._nodes.length) {
            this._glTF.nodes = this._nodes;
        }
        if (this._meshes && this._meshes.length) {
            this._glTF.meshes = this._meshes;
        }
        if (this._scenes && this._scenes.length) {
            this._glTF.scenes = this._scenes;
            this._glTF.scene = 0;
        }
        if (this._cameras && this._cameras.length) {
            this._glTF.cameras = this._cameras;
        }
        if (this._bufferViews && this._bufferViews.length) {
            this._glTF.bufferViews = this._bufferViews;
        }
        if (this._accessors && this._accessors.length) {
            this._glTF.accessors = this._accessors;
        }
        if (this._animations && this._animations.length) {
            this._glTF.animations = this._animations;
        }
        if (this._materials && this._materials.length) {
            this._glTF.materials = this._materials;
        }
        if (this._textures && this._textures.length) {
            this._glTF.textures = this._textures;
        }
        if (this._samplers && this._samplers.length) {
            this._glTF.samplers = this._samplers;
        }
        if (this._skins && this._skins.length) {
            this._glTF.skins = this._skins;
        }
        if (this._images && this._images.length) {
            if (!shouldUseGlb) {
                this._glTF.images = this._images;
            }
            else {
                this._glTF.images = [];
                this._images.forEach(function (image) {
                    if (image.uri) {
                        imageData = _this._imageData[image.uri];
                        _this._orderedImageData.push(imageData);
                        imageName = image.uri.split(".")[0] + " image";
                        bufferView = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateBufferView(0, byteOffset, imageData.data.byteLength, undefined, imageName);
                        byteOffset += imageData.data.byteLength;
                        _this._bufferViews.push(bufferView);
                        image.bufferView = _this._bufferViews.length - 1;
                        image.name = imageName;
                        image.mimeType = imageData.mimeType;
                        image.uri = undefined;
                        if (!_this._glTF.images) {
                            _this._glTF.images = [];
                        }
                        _this._glTF.images.push(image);
                    }
                });
                // Replace uri with bufferview and mime type for glb
                buffer.byteLength = byteOffset;
            }
        }
        if (!shouldUseGlb) {
            buffer.uri = glTFPrefix + ".bin";
        }
        var jsonText = prettyPrint ? JSON.stringify(this._glTF, null, 2) : JSON.stringify(this._glTF);
        return jsonText;
    };
    /**
     * Generates data for .gltf and .bin files based on the glTF prefix string
     * @param glTFPrefix Text to use when prefixing a glTF file
     * @param dispose Dispose the exporter
     * @returns GLTFData with glTF file data
     */
    _Exporter.prototype._generateGLTFAsync = function (glTFPrefix, dispose) {
        var _this = this;
        if (dispose === void 0) { dispose = true; }
        return this._generateBinaryAsync().then(function (binaryBuffer) {
            _this._extensionsOnExporting();
            var jsonText = _this._generateJSON(false, glTFPrefix, true);
            var bin = new Blob([binaryBuffer], { type: "application/octet-stream" });
            var glTFFileName = glTFPrefix + ".gltf";
            var glTFBinFile = glTFPrefix + ".bin";
            var container = new _glTFData__WEBPACK_IMPORTED_MODULE_3__.GLTFData();
            container.glTFFiles[glTFFileName] = jsonText;
            container.glTFFiles[glTFBinFile] = bin;
            if (_this._imageData) {
                for (var image in _this._imageData) {
                    container.glTFFiles[image] = new Blob([_this._imageData[image].data], { type: _this._imageData[image].mimeType });
                }
            }
            if (dispose) {
                _this.dispose();
            }
            return container;
        });
    };
    /**
     * Creates a binary buffer for glTF
     * @returns array buffer for binary data
     */
    _Exporter.prototype._generateBinaryAsync = function () {
        var _this = this;
        var binaryWriter = new _BinaryWriter(4);
        return this._createSceneAsync(binaryWriter).then(function () {
            if (_this._localEngine) {
                _this._localEngine.dispose();
            }
            return binaryWriter.getArrayBuffer();
        });
    };
    /**
     * Pads the number to a multiple of 4
     * @param num number to pad
     * @returns padded number
     */
    _Exporter.prototype._getPadding = function (num) {
        var remainder = num % 4;
        var padding = remainder === 0 ? remainder : 4 - remainder;
        return padding;
    };
    /**
     * @internal
     */
    _Exporter.prototype._generateGLBAsync = function (glTFPrefix, dispose) {
        var _this = this;
        if (dispose === void 0) { dispose = true; }
        return this._generateBinaryAsync().then(function (binaryBuffer) {
            _this._extensionsOnExporting();
            var jsonText = _this._generateJSON(true);
            var glbFileName = glTFPrefix + ".glb";
            var headerLength = 12;
            var chunkLengthPrefix = 8;
            var jsonLength = jsonText.length;
            var encodedJsonText;
            var imageByteLength = 0;
            // make use of TextEncoder when available
            if (typeof TextEncoder !== "undefined") {
                var encoder = new TextEncoder();
                encodedJsonText = encoder.encode(jsonText);
                jsonLength = encodedJsonText.length;
            }
            for (var i = 0; i < _this._orderedImageData.length; ++i) {
                imageByteLength += _this._orderedImageData[i].data.byteLength;
            }
            var jsonPadding = _this._getPadding(jsonLength);
            var binPadding = _this._getPadding(binaryBuffer.byteLength);
            var imagePadding = _this._getPadding(imageByteLength);
            var byteLength = headerLength + 2 * chunkLengthPrefix + jsonLength + jsonPadding + binaryBuffer.byteLength + binPadding + imageByteLength + imagePadding;
            //header
            var headerBuffer = new ArrayBuffer(headerLength);
            var headerBufferView = new DataView(headerBuffer);
            headerBufferView.setUint32(0, 0x46546c67, true); //glTF
            headerBufferView.setUint32(4, 2, true); // version
            headerBufferView.setUint32(8, byteLength, true); // total bytes in file
            //json chunk
            var jsonChunkBuffer = new ArrayBuffer(chunkLengthPrefix + jsonLength + jsonPadding);
            var jsonChunkBufferView = new DataView(jsonChunkBuffer);
            jsonChunkBufferView.setUint32(0, jsonLength + jsonPadding, true);
            jsonChunkBufferView.setUint32(4, 0x4e4f534a, true);
            //json chunk bytes
            var jsonData = new Uint8Array(jsonChunkBuffer, chunkLengthPrefix);
            // if TextEncoder was available, we can simply copy the encoded array
            if (encodedJsonText) {
                jsonData.set(encodedJsonText);
            }
            else {
                var blankCharCode = "_".charCodeAt(0);
                for (var i = 0; i < jsonLength; ++i) {
                    var charCode = jsonText.charCodeAt(i);
                    // if the character doesn't fit into a single UTF-16 code unit, just put a blank character
                    if (charCode != jsonText.codePointAt(i)) {
                        jsonData[i] = blankCharCode;
                    }
                    else {
                        jsonData[i] = charCode;
                    }
                }
            }
            //json padding
            var jsonPaddingView = new Uint8Array(jsonChunkBuffer, chunkLengthPrefix + jsonLength);
            for (var i = 0; i < jsonPadding; ++i) {
                jsonPaddingView[i] = 0x20;
            }
            //binary chunk
            var binaryChunkBuffer = new ArrayBuffer(chunkLengthPrefix);
            var binaryChunkBufferView = new DataView(binaryChunkBuffer);
            binaryChunkBufferView.setUint32(0, binaryBuffer.byteLength + imageByteLength + imagePadding, true);
            binaryChunkBufferView.setUint32(4, 0x004e4942, true);
            // binary padding
            var binPaddingBuffer = new ArrayBuffer(binPadding);
            var binPaddingView = new Uint8Array(binPaddingBuffer);
            for (var i = 0; i < binPadding; ++i) {
                binPaddingView[i] = 0;
            }
            var imagePaddingBuffer = new ArrayBuffer(imagePadding);
            var imagePaddingView = new Uint8Array(imagePaddingBuffer);
            for (var i = 0; i < imagePadding; ++i) {
                imagePaddingView[i] = 0;
            }
            var glbData = [headerBuffer, jsonChunkBuffer, binaryChunkBuffer, binaryBuffer];
            // binary data
            for (var i = 0; i < _this._orderedImageData.length; ++i) {
                glbData.push(_this._orderedImageData[i].data);
            }
            glbData.push(binPaddingBuffer);
            glbData.push(imagePaddingBuffer);
            var glbFile = new Blob(glbData, { type: "application/octet-stream" });
            var container = new _glTFData__WEBPACK_IMPORTED_MODULE_3__.GLTFData();
            container.glTFFiles[glbFileName] = glbFile;
            if (_this._localEngine != null) {
                _this._localEngine.dispose();
            }
            if (dispose) {
                _this.dispose();
            }
            return container;
        });
    };
    /**
     * Sets the TRS for each node
     * @param node glTF Node for storing the transformation data
     * @param babylonTransformNode Babylon mesh used as the source for the transformation data
     */
    _Exporter.prototype._setNodeTransformation = function (node, babylonTransformNode) {
        if (!babylonTransformNode.getPivotPoint().equalsToFloats(0, 0, 0)) {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Pivot points are not supported in the glTF serializer");
        }
        if (!babylonTransformNode.position.equalsToFloats(0, 0, 0)) {
            node.translation = babylonTransformNode.position.asArray();
        }
        if (!babylonTransformNode.scaling.equalsToFloats(1, 1, 1)) {
            node.scale = babylonTransformNode.scaling.asArray();
        }
        var rotationQuaternion = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromEulerAngles(babylonTransformNode.rotation.x, babylonTransformNode.rotation.y, babylonTransformNode.rotation.z);
        if (babylonTransformNode.rotationQuaternion) {
            rotationQuaternion.multiplyInPlace(babylonTransformNode.rotationQuaternion);
        }
        if (!babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.IsIdentity(rotationQuaternion)) {
            node.rotation = rotationQuaternion.normalize().asArray();
        }
    };
    _Exporter.prototype._setCameraTransformation = function (node, babylonCamera) {
        var translation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[0];
        var rotation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Quaternion[0];
        babylonCamera.getWorldMatrix().decompose(undefined, rotation, translation);
        if (!translation.equalsToFloats(0, 0, 0)) {
            node.translation = translation.asArray();
        }
        // // Rotation by 180 as glTF has a different convention than Babylon.
        rotation.multiplyInPlace(rotation180Y);
        if (!babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.IsIdentity(rotation)) {
            node.rotation = rotation.asArray();
        }
    };
    _Exporter.prototype._getVertexBufferFromMesh = function (attributeKind, bufferMesh) {
        if (bufferMesh.isVerticesDataPresent(attributeKind, true)) {
            var vertexBuffer = bufferMesh.getVertexBuffer(attributeKind, true);
            if (vertexBuffer) {
                return vertexBuffer;
            }
        }
        return null;
    };
    /**
     * Creates a bufferview based on the vertices type for the Babylon mesh
     * @param kind Indicates the type of vertices data
     * @param attributeComponentKind Indicates the numerical type used to store the data
     * @param babylonTransformNode The Babylon mesh to get the vertices data from
     * @param binaryWriter The buffer to write the bufferview data to
     * @param byteStride
     */
    _Exporter.prototype._createBufferViewKind = function (kind, attributeComponentKind, babylonTransformNode, binaryWriter, byteStride) {
        var bufferMesh = babylonTransformNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Mesh
            ? babylonTransformNode
            : babylonTransformNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.InstancedMesh
                ? babylonTransformNode.sourceMesh
                : null;
        if (bufferMesh) {
            var vertexBuffer = bufferMesh.getVertexBuffer(kind, true);
            var vertexData = bufferMesh.getVerticesData(kind, undefined, undefined, true);
            if (vertexBuffer && vertexData) {
                var typeByteLength = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.GetTypeByteLength(attributeComponentKind);
                var byteLength = vertexData.length * typeByteLength;
                var bufferView = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateBufferView(0, binaryWriter.getByteOffset(), byteLength, byteStride, kind + " - " + bufferMesh.name);
                this._bufferViews.push(bufferView);
                this._writeAttributeData(kind, attributeComponentKind, vertexData, byteStride / typeByteLength, binaryWriter, babylonTransformNode);
            }
        }
    };
    /**
     * The primitive mode of the Babylon mesh
     * @param babylonMesh The BabylonJS mesh
     * @returns Unsigned integer of the primitive mode or null
     */
    _Exporter.prototype._getMeshPrimitiveMode = function (babylonMesh) {
        if (babylonMesh instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.LinesMesh) {
            return babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.LineListDrawMode;
        }
        if (babylonMesh instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.InstancedMesh || babylonMesh instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Mesh) {
            var baseMesh = babylonMesh instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Mesh ? babylonMesh : babylonMesh.sourceMesh;
            if (typeof baseMesh.overrideRenderingFillMode === "number") {
                return baseMesh.overrideRenderingFillMode;
            }
        }
        return babylonMesh.material ? babylonMesh.material.fillMode : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFillMode;
    };
    /**
     * Sets the primitive mode of the glTF mesh primitive
     * @param meshPrimitive glTF mesh primitive
     * @param primitiveMode The primitive mode
     */
    _Exporter.prototype._setPrimitiveMode = function (meshPrimitive, primitiveMode) {
        switch (primitiveMode) {
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFillMode: {
                // glTF defaults to using Triangle Mode
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleStripDrawMode: {
                meshPrimitive.mode = 5 /* MeshPrimitiveMode.TRIANGLE_STRIP */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFanDrawMode: {
                meshPrimitive.mode = 6 /* MeshPrimitiveMode.TRIANGLE_FAN */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.PointListDrawMode: {
                meshPrimitive.mode = 0 /* MeshPrimitiveMode.POINTS */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.PointFillMode: {
                meshPrimitive.mode = 0 /* MeshPrimitiveMode.POINTS */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.LineLoopDrawMode: {
                meshPrimitive.mode = 2 /* MeshPrimitiveMode.LINE_LOOP */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.LineListDrawMode: {
                meshPrimitive.mode = 1 /* MeshPrimitiveMode.LINES */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.LineStripDrawMode: {
                meshPrimitive.mode = 3 /* MeshPrimitiveMode.LINE_STRIP */;
                break;
            }
        }
    };
    /**
     * Sets the vertex attribute accessor based of the glTF mesh primitive
     * @param meshPrimitive glTF mesh primitive
     * @param attributeKind vertex attribute
     */
    _Exporter.prototype._setAttributeKind = function (attributes, attributeKind) {
        switch (attributeKind) {
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind: {
                attributes.POSITION = this._accessors.length - 1;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind: {
                attributes.NORMAL = this._accessors.length - 1;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind: {
                attributes.COLOR_0 = this._accessors.length - 1;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind: {
                attributes.TANGENT = this._accessors.length - 1;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind: {
                attributes.TEXCOORD_0 = this._accessors.length - 1;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind: {
                attributes.TEXCOORD_1 = this._accessors.length - 1;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesKind: {
                attributes.JOINTS_0 = this._accessors.length - 1;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesExtraKind: {
                attributes.JOINTS_1 = this._accessors.length - 1;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesWeightsKind: {
                attributes.WEIGHTS_0 = this._accessors.length - 1;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesWeightsExtraKind: {
                attributes.WEIGHTS_1 = this._accessors.length - 1;
                break;
            }
            default: {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Unsupported Vertex Buffer Type: " + attributeKind);
            }
        }
    };
    /**
     * Sets data for the primitive attributes of each submesh
     * @param mesh glTF Mesh object to store the primitive attribute information
     * @param babylonTransformNode Babylon mesh to get the primitive attribute data from
     * @param binaryWriter Buffer to write the attribute data to
     * @returns promise that resolves when done setting the primitive attributes
     */
    _Exporter.prototype._setPrimitiveAttributesAsync = function (mesh, babylonTransformNode, binaryWriter) {
        var _a, _b, _c, _d, _e, _f, _g;
        var promises = [];
        var bufferMesh = null;
        var bufferView;
        var minMax;
        if (babylonTransformNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Mesh) {
            bufferMesh = babylonTransformNode;
        }
        else if (babylonTransformNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.InstancedMesh) {
            bufferMesh = babylonTransformNode.sourceMesh;
        }
        var attributeData = [
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind, accessorType: "VEC3" /* AccessorType.VEC3 */, accessorComponentType: 5126 /* AccessorComponentType.FLOAT */, byteStride: 12 },
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, accessorType: "VEC3" /* AccessorType.VEC3 */, accessorComponentType: 5126 /* AccessorComponentType.FLOAT */, byteStride: 12 },
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind, accessorType: "VEC4" /* AccessorType.VEC4 */, accessorComponentType: 5126 /* AccessorComponentType.FLOAT */, byteStride: 16 },
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind, accessorType: "VEC4" /* AccessorType.VEC4 */, accessorComponentType: 5126 /* AccessorComponentType.FLOAT */, byteStride: 16 },
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind, accessorType: "VEC2" /* AccessorType.VEC2 */, accessorComponentType: 5126 /* AccessorComponentType.FLOAT */, byteStride: 8 },
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind, accessorType: "VEC2" /* AccessorType.VEC2 */, accessorComponentType: 5126 /* AccessorComponentType.FLOAT */, byteStride: 8 },
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesKind, accessorType: "VEC4" /* AccessorType.VEC4 */, accessorComponentType: 5123 /* AccessorComponentType.UNSIGNED_SHORT */, byteStride: 8 },
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesExtraKind, accessorType: "VEC4" /* AccessorType.VEC4 */, accessorComponentType: 5123 /* AccessorComponentType.UNSIGNED_SHORT */, byteStride: 8 },
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesWeightsKind, accessorType: "VEC4" /* AccessorType.VEC4 */, accessorComponentType: 5126 /* AccessorComponentType.FLOAT */, byteStride: 16 },
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesWeightsExtraKind, accessorType: "VEC4" /* AccessorType.VEC4 */, accessorComponentType: 5126 /* AccessorComponentType.FLOAT */, byteStride: 16 },
        ];
        if (bufferMesh) {
            var indexBufferViewIndex = null;
            var primitiveMode = this._getMeshPrimitiveMode(bufferMesh);
            var vertexAttributeBufferViews = {};
            var morphTargetManager = bufferMesh.morphTargetManager;
            // For each BabylonMesh, create bufferviews for each 'kind'
            for (var _i = 0, attributeData_1 = attributeData; _i < attributeData_1.length; _i++) {
                var attribute = attributeData_1[_i];
                var attributeKind = attribute.kind;
                var attributeComponentKind = attribute.accessorComponentType;
                if (bufferMesh.isVerticesDataPresent(attributeKind, true)) {
                    var vertexBuffer = this._getVertexBufferFromMesh(attributeKind, bufferMesh);
                    attribute.byteStride = vertexBuffer
                        ? vertexBuffer.getSize() * babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.GetTypeByteLength(attribute.accessorComponentType)
                        : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.DeduceStride(attributeKind) * 4;
                    if (attribute.byteStride === 12) {
                        attribute.accessorType = "VEC3" /* AccessorType.VEC3 */;
                    }
                    this._createBufferViewKind(attributeKind, attributeComponentKind, babylonTransformNode, binaryWriter, attribute.byteStride);
                    attribute.bufferViewIndex = this._bufferViews.length - 1;
                    vertexAttributeBufferViews[attributeKind] = attribute.bufferViewIndex;
                    // Write any morph target data to the buffer and create an associated buffer view
                    if (morphTargetManager) {
                        for (var i = 0; i < morphTargetManager.numTargets; ++i) {
                            var morphTarget = morphTargetManager.getTarget(i);
                            var morphTargetInfo = this._createMorphTargetBufferViewKind(attributeKind, attribute.accessorType, attributeComponentKind, bufferMesh, morphTarget, binaryWriter, attribute.byteStride);
                            // Store info about the morph target that will be needed later when creating per-submesh accessors
                            if (morphTargetInfo) {
                                if (!attribute.morphTargetInfo) {
                                    attribute.morphTargetInfo = [];
                                }
                                attribute.morphTargetInfo[i] = morphTargetInfo;
                            }
                        }
                    }
                }
            }
            if (bufferMesh.getTotalIndices()) {
                var indices = bufferMesh.getIndices();
                if (indices) {
                    var byteLength = indices.length * 4;
                    bufferView = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateBufferView(0, binaryWriter.getByteOffset(), byteLength, undefined, "Indices - " + bufferMesh.name);
                    this._bufferViews.push(bufferView);
                    indexBufferViewIndex = this._bufferViews.length - 1;
                    for (var k = 0, length_9 = indices.length; k < length_9; ++k) {
                        binaryWriter.setUInt32(indices[k]);
                    }
                }
            }
            if (bufferMesh.subMeshes) {
                // go through all mesh primitives (submeshes)
                for (var _h = 0, _j = bufferMesh.subMeshes; _h < _j.length; _h++) {
                    var submesh = _j[_h];
                    var babylonMaterial = submesh.getMaterial() || bufferMesh.getScene().defaultMaterial;
                    var materialIndex = null;
                    if (babylonMaterial) {
                        if (bufferMesh instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.LinesMesh) {
                            // get the color from the lines mesh and set it in the material
                            var material = {
                                name: bufferMesh.name + " material",
                            };
                            if (!bufferMesh.color.equals(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.White()) || bufferMesh.alpha < 1) {
                                material.pbrMetallicRoughness = {
                                    baseColorFactor: bufferMesh.color.asArray().concat([bufferMesh.alpha]),
                                };
                            }
                            this._materials.push(material);
                            materialIndex = this._materials.length - 1;
                        }
                        else if (babylonMaterial instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.MultiMaterial) {
                            var subMaterial = babylonMaterial.subMaterials[submesh.materialIndex];
                            if (subMaterial) {
                                babylonMaterial = subMaterial;
                                materialIndex = this._materialMap[babylonMaterial.uniqueId];
                            }
                        }
                        else {
                            materialIndex = this._materialMap[babylonMaterial.uniqueId];
                        }
                    }
                    var glTFMaterial = materialIndex != null ? this._materials[materialIndex] : null;
                    var meshPrimitive = { attributes: {} };
                    this._setPrimitiveMode(meshPrimitive, primitiveMode);
                    for (var _k = 0, attributeData_2 = attributeData; _k < attributeData_2.length; _k++) {
                        var attribute = attributeData_2[_k];
                        var attributeKind = attribute.kind;
                        if ((attributeKind === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind || attributeKind === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind) && !this._options.exportUnusedUVs) {
                            if (!glTFMaterial || !this._glTFMaterialExporter._hasTexturesPresent(glTFMaterial)) {
                                continue;
                            }
                        }
                        var vertexData = bufferMesh.getVerticesData(attributeKind, undefined, undefined, true);
                        if (vertexData) {
                            var vertexBuffer = this._getVertexBufferFromMesh(attributeKind, bufferMesh);
                            if (vertexBuffer) {
                                var stride = vertexBuffer.getSize();
                                var bufferViewIndex = attribute.bufferViewIndex;
                                if (bufferViewIndex != undefined) {
                                    // check to see if bufferviewindex has a numeric value assigned.
                                    minMax = { min: null, max: null };
                                    if (attributeKind == babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind) {
                                        minMax = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CalculateMinMaxPositions(vertexData, 0, vertexData.length / stride);
                                    }
                                    var accessor = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateAccessor(bufferViewIndex, attributeKind + " - " + babylonTransformNode.name, attribute.accessorType, attribute.accessorComponentType, vertexData.length / stride, 0, minMax.min, minMax.max);
                                    this._accessors.push(accessor);
                                    this._setAttributeKind(meshPrimitive.attributes, attributeKind);
                                }
                            }
                        }
                    }
                    if (indexBufferViewIndex) {
                        // Create accessor
                        var accessor = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateAccessor(indexBufferViewIndex, "indices - " + babylonTransformNode.name, "SCALAR" /* AccessorType.SCALAR */, 5125 /* AccessorComponentType.UNSIGNED_INT */, submesh.indexCount, submesh.indexStart * 4, null, null);
                        this._accessors.push(accessor);
                        meshPrimitive.indices = this._accessors.length - 1;
                    }
                    if (Object.keys(meshPrimitive.attributes).length > 0) {
                        var sideOrientation = babylonMaterial._getEffectiveOrientation(bufferMesh);
                        if (sideOrientation === (this._babylonScene.useRightHandedSystem ? babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.ClockWiseSideOrientation : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.CounterClockWiseSideOrientation)) {
                            var byteOffset = indexBufferViewIndex != null ? this._bufferViews[indexBufferViewIndex].byteOffset : null;
                            if (byteOffset == null) {
                                byteOffset = 0;
                            }
                            var babylonIndices = null;
                            if (indexBufferViewIndex != null) {
                                babylonIndices = bufferMesh.getIndices();
                            }
                            if (babylonIndices) {
                                this._reorderIndicesBasedOnPrimitiveMode(submesh, primitiveMode, babylonIndices, byteOffset, binaryWriter);
                            }
                            else {
                                for (var _l = 0, attributeData_3 = attributeData; _l < attributeData_3.length; _l++) {
                                    var attribute = attributeData_3[_l];
                                    var vertexData = bufferMesh.getVerticesData(attribute.kind, undefined, undefined, true);
                                    if (vertexData) {
                                        var byteOffset_1 = this._bufferViews[vertexAttributeBufferViews[attribute.kind]].byteOffset || 0;
                                        this._reorderVertexAttributeDataBasedOnPrimitiveMode(submesh, primitiveMode, attribute.kind, vertexData, byteOffset_1, binaryWriter);
                                    }
                                }
                            }
                        }
                        if (materialIndex != null) {
                            meshPrimitive.material = materialIndex;
                        }
                    }
                    // If there are morph targets, write out targets and associated accessors
                    if (morphTargetManager) {
                        // By convention, morph target names are stored in the mesh extras.
                        if (!mesh.extras) {
                            mesh.extras = {};
                        }
                        mesh.extras.targetNames = [];
                        for (var i = 0; i < morphTargetManager.numTargets; ++i) {
                            var morphTarget = morphTargetManager.getTarget(i);
                            mesh.extras.targetNames.push(morphTarget.name);
                            for (var _m = 0, attributeData_4 = attributeData; _m < attributeData_4.length; _m++) {
                                var attribute = attributeData_4[_m];
                                var morphTargetInfo = (_a = attribute.morphTargetInfo) === null || _a === void 0 ? void 0 : _a[i];
                                if (morphTargetInfo) {
                                    // Write the accessor
                                    var byteOffset = 0;
                                    var accessor = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateAccessor(morphTargetInfo.bufferViewIndex, "".concat(attribute.kind, " - ").concat(morphTarget.name, " (Morph Target)"), morphTargetInfo.accessorType, attribute.accessorComponentType, morphTargetInfo.vertexCount, byteOffset, (_d = (_c = (_b = morphTargetInfo.minMax) === null || _b === void 0 ? void 0 : _b.min) === null || _c === void 0 ? void 0 : _c.asArray()) !== null && _d !== void 0 ? _d : null, (_g = (_f = (_e = morphTargetInfo.minMax) === null || _e === void 0 ? void 0 : _e.max) === null || _f === void 0 ? void 0 : _f.asArray()) !== null && _g !== void 0 ? _g : null);
                                    this._accessors.push(accessor);
                                    // Create a target that references the new accessor
                                    if (!meshPrimitive.targets) {
                                        meshPrimitive.targets = [];
                                    }
                                    if (!meshPrimitive.targets[i]) {
                                        meshPrimitive.targets[i] = {};
                                    }
                                    this._setAttributeKind(meshPrimitive.targets[i], attribute.kind);
                                }
                            }
                        }
                    }
                    mesh.primitives.push(meshPrimitive);
                    this._extensionsPostExportMeshPrimitiveAsync("postExport", meshPrimitive, submesh, binaryWriter);
                    promises.push();
                }
            }
        }
        return Promise.all(promises).then(function () {
            /* do nothing */
        });
    };
    /**
     * Creates a glTF scene based on the array of meshes
     * Returns the total byte offset
     * @param binaryWriter Buffer to write binary data to
     * @returns a promise that resolves when done
     */
    _Exporter.prototype._createSceneAsync = function (binaryWriter) {
        var _this = this;
        var _a;
        var scene = { nodes: [] };
        var glTFNodeIndex;
        var glTFNode;
        var directDescendents;
        var nodes = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__spreadArray)([], this._babylonScene.transformNodes, true), this._babylonScene.meshes, true), this._babylonScene.lights, true), this._babylonScene.cameras, true);
        var removedRootNodes = new Set();
        // Scene metadata
        if (this._babylonScene.metadata) {
            if (this._options.metadataSelector) {
                scene.extras = this._options.metadataSelector(this._babylonScene.metadata);
            }
            else if (this._babylonScene.metadata.gltf) {
                scene.extras = this._babylonScene.metadata.gltf.extras;
            }
        }
        // Remove no-op root nodes
        if (((_a = this._options.removeNoopRootNodes) !== null && _a !== void 0 ? _a : true) && !this._options.includeCoordinateSystemConversionNodes) {
            for (var _i = 0, _b = this._babylonScene.rootNodes; _i < _b.length; _i++) {
                var rootNode = _b[_i];
                if (isNoopNode(rootNode, this._babylonScene.useRightHandedSystem)) {
                    removedRootNodes.add(rootNode);
                    // Exclude the node from list of nodes to export
                    nodes.splice(nodes.indexOf(rootNode), 1);
                }
            }
        }
        // Export babylon cameras to glTFCamera
        var cameraMap = new Map();
        this._babylonScene.cameras.forEach(function (camera) {
            if (_this._options.shouldExportNode && !_this._options.shouldExportNode(camera)) {
                return;
            }
            var glTFCamera = {
                type: camera.mode === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Camera.PERSPECTIVE_CAMERA ? "perspective" /* CameraType.PERSPECTIVE */ : "orthographic" /* CameraType.ORTHOGRAPHIC */,
            };
            if (camera.name) {
                glTFCamera.name = camera.name;
            }
            if (glTFCamera.type === "perspective" /* CameraType.PERSPECTIVE */) {
                glTFCamera.perspective = {
                    aspectRatio: camera.getEngine().getAspectRatio(camera),
                    yfov: camera.fovMode === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Camera.FOVMODE_VERTICAL_FIXED ? camera.fov : camera.fov * camera.getEngine().getAspectRatio(camera),
                    znear: camera.minZ,
                    zfar: camera.maxZ,
                };
            }
            else if (glTFCamera.type === "orthographic" /* CameraType.ORTHOGRAPHIC */) {
                var halfWidth = camera.orthoLeft && camera.orthoRight ? 0.5 * (camera.orthoRight - camera.orthoLeft) : camera.getEngine().getRenderWidth() * 0.5;
                var halfHeight = camera.orthoBottom && camera.orthoTop ? 0.5 * (camera.orthoTop - camera.orthoBottom) : camera.getEngine().getRenderHeight() * 0.5;
                glTFCamera.orthographic = {
                    xmag: halfWidth,
                    ymag: halfHeight,
                    znear: camera.minZ,
                    zfar: camera.maxZ,
                };
            }
            cameraMap.set(camera, _this._cameras.length);
            _this._cameras.push(glTFCamera);
        });
        var _c = this._getExportNodes(nodes), exportNodes = _c[0], exportMaterials = _c[1];
        return this._glTFMaterialExporter._convertMaterialsToGLTFAsync(exportMaterials, "image/png" /* ImageMimeType.PNG */, true).then(function () {
            return _this._createNodeMapAndAnimationsAsync(exportNodes, binaryWriter).then(function (nodeMap) {
                return _this._createSkinsAsync(nodeMap, binaryWriter).then(function (skinMap) {
                    _this._nodeMap = nodeMap;
                    _this._totalByteLength = binaryWriter.getByteOffset();
                    if (_this._totalByteLength == undefined) {
                        throw new Error("undefined byte length!");
                    }
                    // Build Hierarchy with the node map.
                    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                        var babylonNode = nodes_1[_i];
                        glTFNodeIndex = _this._nodeMap[babylonNode.uniqueId];
                        if (glTFNodeIndex !== undefined) {
                            glTFNode = _this._nodes[glTFNodeIndex];
                            if (babylonNode.metadata) {
                                if (_this._options.metadataSelector) {
                                    glTFNode.extras = _this._options.metadataSelector(babylonNode.metadata);
                                }
                                else if (babylonNode.metadata.gltf) {
                                    glTFNode.extras = babylonNode.metadata.gltf.extras;
                                }
                            }
                            if (babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Camera) {
                                glTFNode.camera = cameraMap.get(babylonNode);
                            }
                            if (_this._options.shouldExportNode && !_this._options.shouldExportNode(babylonNode)) {
                                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Log("Omitting " + babylonNode.name + " from scene.");
                            }
                            else {
                                if (!babylonNode.parent && !_this._babylonScene.useRightHandedSystem) {
                                    convertNodeHandedness(glTFNode);
                                }
                                if (!babylonNode.parent || removedRootNodes.has(babylonNode.parent)) {
                                    scene.nodes.push(glTFNodeIndex);
                                }
                            }
                            if (babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Mesh) {
                                if (babylonNode.skeleton) {
                                    glTFNode.skin = skinMap[babylonNode.skeleton.uniqueId];
                                }
                            }
                            directDescendents = babylonNode.getDescendants(true);
                            if (!glTFNode.children && directDescendents && directDescendents.length) {
                                var children = [];
                                for (var _a = 0, directDescendents_1 = directDescendents; _a < directDescendents_1.length; _a++) {
                                    var descendent = directDescendents_1[_a];
                                    if (_this._nodeMap[descendent.uniqueId] != null) {
                                        children.push(_this._nodeMap[descendent.uniqueId]);
                                    }
                                }
                                if (children.length) {
                                    glTFNode.children = children;
                                }
                            }
                        }
                    }
                    if (scene.nodes.length) {
                        _this._scenes.push(scene);
                    }
                });
            });
        });
    };
    /**
     * Getting the nodes and materials that would be exported.
     * @param nodes Babylon transform nodes
     * @returns Set of materials which would be exported.
     */
    _Exporter.prototype._getExportNodes = function (nodes) {
        var exportNodes = [];
        var exportMaterials = new Set();
        for (var _i = 0, nodes_2 = nodes; _i < nodes_2.length; _i++) {
            var babylonNode = nodes_2[_i];
            if (!this._options.shouldExportNode || this._options.shouldExportNode(babylonNode)) {
                exportNodes.push(babylonNode);
                var babylonMesh = babylonNode;
                if (babylonMesh.subMeshes && babylonMesh.subMeshes.length > 0) {
                    var material = babylonMesh.material || babylonMesh.getScene().defaultMaterial;
                    if (material instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.MultiMaterial) {
                        for (var _a = 0, _b = material.subMaterials; _a < _b.length; _a++) {
                            var subMaterial = _b[_a];
                            if (subMaterial) {
                                exportMaterials.add(subMaterial);
                            }
                        }
                    }
                    else {
                        exportMaterials.add(material);
                    }
                }
            }
            else {
                "Excluding node ".concat(babylonNode.name);
            }
        }
        return [exportNodes, exportMaterials];
    };
    /**
     * Creates a mapping of Node unique id to node index and handles animations
     * @param nodes Babylon transform nodes
     * @param binaryWriter Buffer to write binary data to
     * @returns Node mapping of unique id to index
     */
    _Exporter.prototype._createNodeMapAndAnimationsAsync = function (nodes, binaryWriter) {
        var _this = this;
        var promiseChain = Promise.resolve();
        var nodeMap = {};
        var nodeIndex;
        var runtimeGLTFAnimation = {
            name: "runtime animations",
            channels: [],
            samplers: [],
        };
        var idleGLTFAnimations = [];
        var _loop_1 = function (babylonNode) {
            promiseChain = promiseChain.then(function () {
                return _this._createNodeAsync(babylonNode, binaryWriter).then(function (node) {
                    var promise = _this._extensionsPostExportNodeAsync("createNodeAsync", node, babylonNode, nodeMap, binaryWriter);
                    if (promise == null) {
                        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Not exporting node ".concat(babylonNode.name));
                        return Promise.resolve();
                    }
                    else {
                        return promise.then(function (node) {
                            if (!node) {
                                return;
                            }
                            _this._nodes.push(node);
                            nodeIndex = _this._nodes.length - 1;
                            nodeMap[babylonNode.uniqueId] = nodeIndex;
                            if (!_this._babylonScene.animationGroups.length) {
                                _glTFAnimation__WEBPACK_IMPORTED_MODULE_4__._GLTFAnimation._CreateMorphTargetAnimationFromMorphTargetAnimations(babylonNode, runtimeGLTFAnimation, idleGLTFAnimations, nodeMap, _this._nodes, binaryWriter, _this._bufferViews, _this._accessors, _this._animationSampleRate, _this._options.shouldExportAnimation);
                                if (babylonNode.animations.length) {
                                    _glTFAnimation__WEBPACK_IMPORTED_MODULE_4__._GLTFAnimation._CreateNodeAnimationFromNodeAnimations(babylonNode, runtimeGLTFAnimation, idleGLTFAnimations, nodeMap, _this._nodes, binaryWriter, _this._bufferViews, _this._accessors, _this._animationSampleRate, _this._options.shouldExportAnimation);
                                }
                            }
                        });
                    }
                });
            });
        };
        for (var _i = 0, nodes_3 = nodes; _i < nodes_3.length; _i++) {
            var babylonNode = nodes_3[_i];
            _loop_1(babylonNode);
        }
        return promiseChain.then(function () {
            if (runtimeGLTFAnimation.channels.length && runtimeGLTFAnimation.samplers.length) {
                _this._animations.push(runtimeGLTFAnimation);
            }
            idleGLTFAnimations.forEach(function (idleGLTFAnimation) {
                if (idleGLTFAnimation.channels.length && idleGLTFAnimation.samplers.length) {
                    _this._animations.push(idleGLTFAnimation);
                }
            });
            if (_this._babylonScene.animationGroups.length) {
                _glTFAnimation__WEBPACK_IMPORTED_MODULE_4__._GLTFAnimation._CreateNodeAndMorphAnimationFromAnimationGroups(_this._babylonScene, _this._animations, nodeMap, binaryWriter, _this._bufferViews, _this._accessors, _this._animationSampleRate, _this._options.shouldExportAnimation);
            }
            return nodeMap;
        });
    };
    /**
     * Creates a glTF node from a Babylon mesh
     * @param babylonNode Source Babylon mesh
     * @param binaryWriter Buffer for storing geometry data
     * @returns glTF node
     */
    _Exporter.prototype._createNodeAsync = function (babylonNode, binaryWriter) {
        var _this = this;
        return Promise.resolve().then(function () {
            // create node to hold translation/rotation/scale and the mesh
            var node = {};
            // create mesh
            var mesh = { primitives: [] };
            if (babylonNode.name) {
                node.name = babylonNode.name;
            }
            if (babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TransformNode) {
                // Set transformation
                _this._setNodeTransformation(node, babylonNode);
                if (babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Mesh) {
                    var morphTargetManager = babylonNode.morphTargetManager;
                    if (morphTargetManager && morphTargetManager.numTargets > 0) {
                        mesh.weights = [];
                        for (var i = 0; i < morphTargetManager.numTargets; ++i) {
                            mesh.weights.push(morphTargetManager.getTarget(i).influence);
                        }
                    }
                }
                return _this._setPrimitiveAttributesAsync(mesh, babylonNode, binaryWriter).then(function () {
                    if (mesh.primitives.length) {
                        _this._meshes.push(mesh);
                        node.mesh = _this._meshes.length - 1;
                    }
                    return node;
                });
            }
            else if (babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Camera) {
                _this._setCameraTransformation(node, babylonNode);
                return node;
            }
            else {
                return node;
            }
        });
    };
    /**
     * Creates a glTF skin from a Babylon skeleton
     * @param nodeMap Babylon transform nodes
     * @param binaryWriter Buffer to write binary data to
     * @returns Node mapping of unique id to index
     */
    _Exporter.prototype._createSkinsAsync = function (nodeMap, binaryWriter) {
        var _a;
        var promiseChain = Promise.resolve();
        var skinMap = {};
        for (var _i = 0, _b = this._babylonScene.skeletons; _i < _b.length; _i++) {
            var skeleton = _b[_i];
            if (skeleton.bones.length <= 0) {
                continue;
            }
            // create skin
            var skin = { joints: [] };
            var inverseBindMatrices = [];
            var boneIndexMap = {};
            var maxBoneIndex = -1;
            for (var i = 0; i < skeleton.bones.length; ++i) {
                var bone = skeleton.bones[i];
                var boneIndex = (_a = bone.getIndex()) !== null && _a !== void 0 ? _a : i;
                if (boneIndex !== -1) {
                    boneIndexMap[boneIndex] = bone;
                    if (boneIndex > maxBoneIndex) {
                        maxBoneIndex = boneIndex;
                    }
                }
            }
            for (var boneIndex = 0; boneIndex <= maxBoneIndex; ++boneIndex) {
                var bone = boneIndexMap[boneIndex];
                inverseBindMatrices.push(bone.getInvertedAbsoluteTransform());
                var transformNode = bone.getTransformNode();
                if (transformNode && nodeMap[transformNode.uniqueId] !== null && nodeMap[transformNode.uniqueId] !== undefined) {
                    skin.joints.push(nodeMap[transformNode.uniqueId]);
                }
                else {
                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Exporting a bone without a linked transform node is currently unsupported");
                }
            }
            if (skin.joints.length > 0) {
                // create buffer view for inverse bind matrices
                var byteStride = 64; // 4 x 4 matrix of 32 bit float
                var byteLength = inverseBindMatrices.length * byteStride;
                var bufferViewOffset = binaryWriter.getByteOffset();
                var bufferView = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateBufferView(0, bufferViewOffset, byteLength, undefined, "InverseBindMatrices" + " - " + skeleton.name);
                this._bufferViews.push(bufferView);
                var bufferViewIndex = this._bufferViews.length - 1;
                var bindMatrixAccessor = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateAccessor(bufferViewIndex, "InverseBindMatrices" + " - " + skeleton.name, "MAT4" /* AccessorType.MAT4 */, 5126 /* AccessorComponentType.FLOAT */, inverseBindMatrices.length, null, null, null);
                var inverseBindAccessorIndex = this._accessors.push(bindMatrixAccessor) - 1;
                skin.inverseBindMatrices = inverseBindAccessorIndex;
                this._skins.push(skin);
                skinMap[skeleton.uniqueId] = this._skins.length - 1;
                inverseBindMatrices.forEach(function (mat) {
                    mat.m.forEach(function (cell) {
                        binaryWriter.setFloat32(cell);
                    });
                });
            }
        }
        return promiseChain.then(function () {
            return skinMap;
        });
    };
    _Exporter._ExtensionNames = new Array();
    _Exporter._ExtensionFactories = {};
    return _Exporter;
}());

/**
 * @internal
 *
 * Stores glTF binary data.  If the array buffer byte length is exceeded, it doubles in size dynamically
 */
var _BinaryWriter = /** @class */ (function () {
    /**
     * Initialize binary writer with an initial byte length
     * @param byteLength Initial byte length of the array buffer
     */
    function _BinaryWriter(byteLength) {
        this._arrayBuffer = new ArrayBuffer(byteLength);
        this._dataView = new DataView(this._arrayBuffer);
        this._byteOffset = 0;
    }
    /**
     * Resize the array buffer to the specified byte length
     * @param byteLength The new byte length
     * @returns The resized array buffer
     */
    _BinaryWriter.prototype._resizeBuffer = function (byteLength) {
        var newBuffer = new ArrayBuffer(byteLength);
        var copyOldBufferSize = Math.min(this._arrayBuffer.byteLength, byteLength);
        var oldUint8Array = new Uint8Array(this._arrayBuffer, 0, copyOldBufferSize);
        var newUint8Array = new Uint8Array(newBuffer);
        newUint8Array.set(oldUint8Array, 0);
        this._arrayBuffer = newBuffer;
        this._dataView = new DataView(this._arrayBuffer);
        return newBuffer;
    };
    /**
     * Get an array buffer with the length of the byte offset
     * @returns ArrayBuffer resized to the byte offset
     */
    _BinaryWriter.prototype.getArrayBuffer = function () {
        return this._resizeBuffer(this.getByteOffset());
    };
    /**
     * Get the byte offset of the array buffer
     * @returns byte offset
     */
    _BinaryWriter.prototype.getByteOffset = function () {
        if (this._byteOffset == undefined) {
            throw new Error("Byte offset is undefined!");
        }
        return this._byteOffset;
    };
    /**
     * Stores an UInt8 in the array buffer
     * @param entry
     * @param byteOffset If defined, specifies where to set the value as an offset.
     */
    _BinaryWriter.prototype.setUInt8 = function (entry, byteOffset) {
        if (byteOffset != null) {
            if (byteOffset < this._byteOffset) {
                this._dataView.setUint8(byteOffset, entry);
            }
            else {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
            }
        }
        else {
            if (this._byteOffset + 1 > this._arrayBuffer.byteLength) {
                this._resizeBuffer(this._arrayBuffer.byteLength * 2);
            }
            this._dataView.setUint8(this._byteOffset, entry);
            this._byteOffset += 1;
        }
    };
    /**
     * Stores an UInt16 in the array buffer
     * @param entry
     * @param byteOffset If defined, specifies where to set the value as an offset.
     */
    _BinaryWriter.prototype.setUInt16 = function (entry, byteOffset) {
        if (byteOffset != null) {
            if (byteOffset < this._byteOffset) {
                this._dataView.setUint16(byteOffset, entry, true);
            }
            else {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
            }
        }
        else {
            if (this._byteOffset + 2 > this._arrayBuffer.byteLength) {
                this._resizeBuffer(this._arrayBuffer.byteLength * 2);
            }
            this._dataView.setUint16(this._byteOffset, entry, true);
            this._byteOffset += 2;
        }
    };
    /**
     * Gets an UInt32 in the array buffer
     * @param byteOffset If defined, specifies where to set the value as an offset.
     * @returns entry
     */
    _BinaryWriter.prototype.getUInt32 = function (byteOffset) {
        if (byteOffset < this._byteOffset) {
            return this._dataView.getUint32(byteOffset, true);
        }
        else {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
            throw new Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
        }
    };
    _BinaryWriter.prototype.getVector3Float32FromRef = function (vector3, byteOffset) {
        if (byteOffset + 8 > this._byteOffset) {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
        }
        else {
            vector3.x = this._dataView.getFloat32(byteOffset, true);
            vector3.y = this._dataView.getFloat32(byteOffset + 4, true);
            vector3.z = this._dataView.getFloat32(byteOffset + 8, true);
        }
    };
    _BinaryWriter.prototype.setVector3Float32FromRef = function (vector3, byteOffset) {
        if (byteOffset + 8 > this._byteOffset) {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
        }
        else {
            this._dataView.setFloat32(byteOffset, vector3.x, true);
            this._dataView.setFloat32(byteOffset + 4, vector3.y, true);
            this._dataView.setFloat32(byteOffset + 8, vector3.z, true);
        }
    };
    _BinaryWriter.prototype.getVector4Float32FromRef = function (vector4, byteOffset) {
        if (byteOffset + 12 > this._byteOffset) {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
        }
        else {
            vector4.x = this._dataView.getFloat32(byteOffset, true);
            vector4.y = this._dataView.getFloat32(byteOffset + 4, true);
            vector4.z = this._dataView.getFloat32(byteOffset + 8, true);
            vector4.w = this._dataView.getFloat32(byteOffset + 12, true);
        }
    };
    _BinaryWriter.prototype.setVector4Float32FromRef = function (vector4, byteOffset) {
        if (byteOffset + 12 > this._byteOffset) {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
        }
        else {
            this._dataView.setFloat32(byteOffset, vector4.x, true);
            this._dataView.setFloat32(byteOffset + 4, vector4.y, true);
            this._dataView.setFloat32(byteOffset + 8, vector4.z, true);
            this._dataView.setFloat32(byteOffset + 12, vector4.w, true);
        }
    };
    /**
     * Stores a Float32 in the array buffer
     * @param entry
     * @param byteOffset
     */
    _BinaryWriter.prototype.setFloat32 = function (entry, byteOffset) {
        if (isNaN(entry)) {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("Invalid data being written!");
        }
        if (byteOffset != null) {
            if (byteOffset < this._byteOffset) {
                this._dataView.setFloat32(byteOffset, entry, true);
            }
            else {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary length!");
            }
        }
        if (this._byteOffset + 4 > this._arrayBuffer.byteLength) {
            this._resizeBuffer(this._arrayBuffer.byteLength * 2);
        }
        this._dataView.setFloat32(this._byteOffset, entry, true);
        this._byteOffset += 4;
    };
    /**
     * Stores an UInt32 in the array buffer
     * @param entry
     * @param byteOffset If defined, specifies where to set the value as an offset.
     */
    _BinaryWriter.prototype.setUInt32 = function (entry, byteOffset) {
        if (byteOffset != null) {
            if (byteOffset < this._byteOffset) {
                this._dataView.setUint32(byteOffset, entry, true);
            }
            else {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
            }
        }
        else {
            if (this._byteOffset + 4 > this._arrayBuffer.byteLength) {
                this._resizeBuffer(this._arrayBuffer.byteLength * 2);
            }
            this._dataView.setUint32(this._byteOffset, entry, true);
            this._byteOffset += 4;
        }
    };
    /**
     * Stores an Int16 in the array buffer
     * @param entry
     * @param byteOffset If defined, specifies where to set the value as an offset.
     */
    _BinaryWriter.prototype.setInt16 = function (entry, byteOffset) {
        if (byteOffset != null) {
            if (byteOffset < this._byteOffset) {
                this._dataView.setInt16(byteOffset, entry, true);
            }
            else {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
            }
        }
        else {
            if (this._byteOffset + 2 > this._arrayBuffer.byteLength) {
                this._resizeBuffer(this._arrayBuffer.byteLength * 2);
            }
            this._dataView.setInt16(this._byteOffset, entry, true);
            this._byteOffset += 2;
        }
    };
    /**
     * Stores a byte in the array buffer
     * @param entry
     * @param byteOffset If defined, specifies where to set the value as an offset.
     */
    _BinaryWriter.prototype.setByte = function (entry, byteOffset) {
        if (byteOffset != null) {
            if (byteOffset < this._byteOffset) {
                this._dataView.setInt8(byteOffset, entry);
            }
            else {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
            }
        }
        else {
            if (this._byteOffset + 1 > this._arrayBuffer.byteLength) {
                this._resizeBuffer(this._arrayBuffer.byteLength * 2);
            }
            this._dataView.setInt8(this._byteOffset, entry);
            this._byteOffset++;
        }
    };
    return _BinaryWriter;
}());



/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/glTFExporterExtension.ts":
/*!**********************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/glTFExporterExtension.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __IGLTFExporterExtensionV2: () => (/* binding */ __IGLTFExporterExtensionV2)
/* harmony export */ });
/** @internal */
// eslint-disable-next-line no-var, @typescript-eslint/naming-convention
var __IGLTFExporterExtensionV2 = 0; // I am here to allow dts to be created


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/glTFMaterialExporter.ts":
/*!*********************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/glTFMaterialExporter.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _GLTFMaterialExporter: () => (/* binding */ _GLTFMaterialExporter)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/dumpTools */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);










function getFileExtensionFromMimeType(mimeType) {
    switch (mimeType) {
        case "image/jpeg" /* ImageMimeType.JPEG */:
            return ".jpg";
        case "image/png" /* ImageMimeType.PNG */:
            return ".png";
        case "image/webp" /* ImageMimeType.WEBP */:
            return ".webp";
        case "image/avif" /* ImageMimeType.AVIF */:
            return ".avif";
    }
}
/**
 * Utility methods for working with glTF material conversion properties.  This class should only be used internally
 * @internal
 */
var _GLTFMaterialExporter = /** @class */ (function () {
    function _GLTFMaterialExporter(exporter) {
        /**
         * Mapping to store textures
         */
        this._textureMap = {};
        // Mapping of internal textures to images to avoid exporting duplicate images.
        this._internalTextureToImage = {};
        this._textureMap = {};
        this._exporter = exporter;
    }
    /**
     * Specifies if two colors are approximately equal in value
     * @param color1 first color to compare to
     * @param color2 second color to compare to
     * @param epsilon threshold value
     * @returns boolean specifying if the colors are approximately equal in value
     */
    _GLTFMaterialExporter._FuzzyEquals = function (color1, color2, epsilon) {
        return babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Scalar.WithinEpsilon(color1.r, color2.r, epsilon) && babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Scalar.WithinEpsilon(color1.g, color2.g, epsilon) && babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Scalar.WithinEpsilon(color1.b, color2.b, epsilon);
    };
    /**
     * Gets the materials from a Babylon scene and converts them to glTF materials
     * @param exportMaterials
     * @param mimeType texture mime type
     * @param hasTextureCoords specifies if texture coordinates are present on the material
     * @returns promise that resolves after all materials have been converted
     */
    _GLTFMaterialExporter.prototype._convertMaterialsToGLTFAsync = function (exportMaterials, mimeType, hasTextureCoords) {
        var _this = this;
        var promises = [];
        exportMaterials.forEach(function (material) {
            if (material.getClassName() === "StandardMaterial") {
                promises.push(_this._convertStandardMaterialAsync(material, mimeType, hasTextureCoords));
            }
            else if (material.getClassName().indexOf("PBR") !== -1) {
                promises.push(_this._convertPBRMaterialAsync(material, mimeType, hasTextureCoords));
            }
            else {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Unsupported material type: ".concat(material.name));
            }
        });
        return Promise.all(promises).then(function () {
            /* do nothing */
        });
    };
    /**
     * Makes a copy of the glTF material without the texture parameters
     * @param originalMaterial original glTF material
     * @returns glTF material without texture parameters
     */
    _GLTFMaterialExporter.prototype._stripTexturesFromMaterial = function (originalMaterial) {
        var newMaterial = {};
        if (originalMaterial) {
            newMaterial.name = originalMaterial.name;
            newMaterial.doubleSided = originalMaterial.doubleSided;
            newMaterial.alphaMode = originalMaterial.alphaMode;
            newMaterial.alphaCutoff = originalMaterial.alphaCutoff;
            newMaterial.emissiveFactor = originalMaterial.emissiveFactor;
            var originalPBRMetallicRoughness = originalMaterial.pbrMetallicRoughness;
            if (originalPBRMetallicRoughness) {
                newMaterial.pbrMetallicRoughness = {};
                newMaterial.pbrMetallicRoughness.baseColorFactor = originalPBRMetallicRoughness.baseColorFactor;
                newMaterial.pbrMetallicRoughness.metallicFactor = originalPBRMetallicRoughness.metallicFactor;
                newMaterial.pbrMetallicRoughness.roughnessFactor = originalPBRMetallicRoughness.roughnessFactor;
            }
        }
        return newMaterial;
    };
    /**
     * Specifies if the material has any texture parameters present
     * @param material glTF Material
     * @returns boolean specifying if texture parameters are present
     */
    _GLTFMaterialExporter.prototype._hasTexturesPresent = function (material) {
        var _a;
        if (material.emissiveTexture || material.normalTexture || material.occlusionTexture) {
            return true;
        }
        var pbrMat = material.pbrMetallicRoughness;
        if (pbrMat) {
            if (pbrMat.baseColorTexture || pbrMat.metallicRoughnessTexture) {
                return true;
            }
        }
        if (material.extensions) {
            for (var extension in material.extensions) {
                var extensionObject = material.extensions[extension];
                if (extensionObject) {
                    return (_a = extensionObject.hasTextures) === null || _a === void 0 ? void 0 : _a.call(extensionObject);
                }
            }
        }
        return false;
    };
    _GLTFMaterialExporter.prototype._getTextureInfo = function (babylonTexture) {
        if (babylonTexture) {
            var textureUid = babylonTexture.uid;
            if (textureUid in this._textureMap) {
                return this._textureMap[textureUid];
            }
        }
        return null;
    };
    /**
     * Converts a Babylon StandardMaterial to a glTF Metallic Roughness Material
     * @param babylonStandardMaterial
     * @returns glTF Metallic Roughness Material representation
     */
    _GLTFMaterialExporter.prototype._convertToGLTFPBRMetallicRoughness = function (babylonStandardMaterial) {
        // Defines a cubic bezier curve where x is specular power and y is roughness
        var P0 = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2(0, 1);
        var P1 = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2(0, 0.1);
        var P2 = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2(0, 0.1);
        var P3 = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2(1300, 0.1);
        /**
         * Given the control points, solve for x based on a given t for a cubic bezier curve
         * @param t a value between 0 and 1
         * @param p0 first control point
         * @param p1 second control point
         * @param p2 third control point
         * @param p3 fourth control point
         * @returns number result of cubic bezier curve at the specified t
         */
        function cubicBezierCurve(t, p0, p1, p2, p3) {
            return (1 - t) * (1 - t) * (1 - t) * p0 + 3 * (1 - t) * (1 - t) * t * p1 + 3 * (1 - t) * t * t * p2 + t * t * t * p3;
        }
        /**
         * Evaluates a specified specular power value to determine the appropriate roughness value,
         * based on a pre-defined cubic bezier curve with specular on the abscissa axis (x-axis)
         * and roughness on the ordinant axis (y-axis)
         * @param specularPower specular power of standard material
         * @returns Number representing the roughness value
         */
        function solveForRoughness(specularPower) {
            // Given P0.x = 0, P1.x = 0, P2.x = 0
            //   x = t * t * t * P3.x
            //   t = (x / P3.x)^(1/3)
            var t = Math.pow(specularPower / P3.x, 0.333333);
            return cubicBezierCurve(t, P0.y, P1.y, P2.y, P3.y);
        }
        var diffuse = babylonStandardMaterial.diffuseColor.toLinearSpace(babylonStandardMaterial.getScene().getEngine().useExactSrgbConversions).scale(0.5);
        var opacity = babylonStandardMaterial.alpha;
        var specularPower = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Scalar.Clamp(babylonStandardMaterial.specularPower, 0, _GLTFMaterialExporter._MaxSpecularPower);
        var roughness = solveForRoughness(specularPower);
        var glTFPbrMetallicRoughness = {
            baseColorFactor: [diffuse.r, diffuse.g, diffuse.b, opacity],
            metallicFactor: 0,
            roughnessFactor: roughness,
        };
        return glTFPbrMetallicRoughness;
    };
    /**
     * Computes the metallic factor
     * @param diffuse diffused value
     * @param specular specular value
     * @param oneMinusSpecularStrength one minus the specular strength
     * @returns metallic value
     */
    _GLTFMaterialExporter._SolveMetallic = function (diffuse, specular, oneMinusSpecularStrength) {
        if (specular < this._DielectricSpecular.r) {
            this._DielectricSpecular;
            return 0;
        }
        var a = this._DielectricSpecular.r;
        var b = (diffuse * oneMinusSpecularStrength) / (1.0 - this._DielectricSpecular.r) + specular - 2.0 * this._DielectricSpecular.r;
        var c = this._DielectricSpecular.r - specular;
        var D = b * b - 4.0 * a * c;
        return babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Scalar.Clamp((-b + Math.sqrt(D)) / (2.0 * a), 0, 1);
    };
    /**
     * Sets the glTF alpha mode to a glTF material from the Babylon Material
     * @param glTFMaterial glTF material
     * @param babylonMaterial Babylon material
     */
    _GLTFMaterialExporter._SetAlphaMode = function (glTFMaterial, babylonMaterial) {
        if (babylonMaterial.needAlphaBlending()) {
            glTFMaterial.alphaMode = "BLEND" /* MaterialAlphaMode.BLEND */;
        }
        else if (babylonMaterial.needAlphaTesting()) {
            glTFMaterial.alphaMode = "MASK" /* MaterialAlphaMode.MASK */;
            glTFMaterial.alphaCutoff = babylonMaterial.alphaCutOff;
        }
    };
    /**
     * Converts a Babylon Standard Material to a glTF Material
     * @param babylonStandardMaterial BJS Standard Material
     * @param mimeType mime type to use for the textures
     * @param hasTextureCoords specifies if texture coordinates are present on the submesh to determine if textures should be applied
     * @returns promise, resolved with the material
     */
    _GLTFMaterialExporter.prototype._convertStandardMaterialAsync = function (babylonStandardMaterial, mimeType, hasTextureCoords) {
        var materialMap = this._exporter._materialMap;
        var materials = this._exporter._materials;
        var promises = [];
        var pbrMetallicRoughness = this._convertToGLTFPBRMetallicRoughness(babylonStandardMaterial);
        var material = { name: babylonStandardMaterial.name };
        if (babylonStandardMaterial.backFaceCulling != null && !babylonStandardMaterial.backFaceCulling) {
            if (!babylonStandardMaterial.twoSidedLighting) {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn(babylonStandardMaterial.name + ": Back-face culling disabled and two-sided lighting disabled is not supported in glTF.");
            }
            material.doubleSided = true;
        }
        if (hasTextureCoords) {
            if (babylonStandardMaterial.diffuseTexture) {
                promises.push(this._exportTextureAsync(babylonStandardMaterial.diffuseTexture, mimeType).then(function (textureInfo) {
                    if (textureInfo) {
                        pbrMetallicRoughness.baseColorTexture = textureInfo;
                    }
                }));
            }
            var bumpTexture_1 = babylonStandardMaterial.bumpTexture;
            if (bumpTexture_1) {
                promises.push(this._exportTextureAsync(bumpTexture_1, mimeType).then(function (textureInfo) {
                    if (textureInfo) {
                        material.normalTexture = textureInfo;
                        if (bumpTexture_1.level !== 1) {
                            material.normalTexture.scale = bumpTexture_1.level;
                        }
                    }
                }));
            }
            if (babylonStandardMaterial.emissiveTexture) {
                material.emissiveFactor = [1.0, 1.0, 1.0];
                promises.push(this._exportTextureAsync(babylonStandardMaterial.emissiveTexture, mimeType).then(function (textureInfo) {
                    if (textureInfo) {
                        material.emissiveTexture = textureInfo;
                    }
                }));
            }
            if (babylonStandardMaterial.ambientTexture) {
                promises.push(this._exportTextureAsync(babylonStandardMaterial.ambientTexture, mimeType).then(function (textureInfo) {
                    if (textureInfo) {
                        var occlusionTexture = {
                            index: textureInfo.index,
                        };
                        material.occlusionTexture = occlusionTexture;
                    }
                }));
            }
        }
        if (babylonStandardMaterial.alpha < 1.0 || babylonStandardMaterial.opacityTexture) {
            if (babylonStandardMaterial.alphaMode === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Constants.ALPHA_COMBINE) {
                material.alphaMode = "BLEND" /* MaterialAlphaMode.BLEND */;
            }
            else {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn(babylonStandardMaterial.name + ": glTF 2.0 does not support alpha mode: " + babylonStandardMaterial.alphaMode.toString());
            }
        }
        if (babylonStandardMaterial.emissiveColor && !_GLTFMaterialExporter._FuzzyEquals(babylonStandardMaterial.emissiveColor, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.Black(), _GLTFMaterialExporter._Epsilon)) {
            material.emissiveFactor = babylonStandardMaterial.emissiveColor.asArray();
        }
        material.pbrMetallicRoughness = pbrMetallicRoughness;
        _GLTFMaterialExporter._SetAlphaMode(material, babylonStandardMaterial);
        materials.push(material);
        materialMap[babylonStandardMaterial.uniqueId] = materials.length - 1;
        return this._finishMaterial(promises, material, babylonStandardMaterial, mimeType);
    };
    _GLTFMaterialExporter.prototype._finishMaterial = function (promises, glTFMaterial, babylonMaterial, mimeType) {
        var _this = this;
        return Promise.all(promises).then(function () {
            var textures = _this._exporter._extensionsPostExportMaterialAdditionalTextures("exportMaterial", glTFMaterial, babylonMaterial);
            var tasks = null;
            for (var _i = 0, textures_1 = textures; _i < textures_1.length; _i++) {
                var texture = textures_1[_i];
                if (!tasks) {
                    tasks = [];
                }
                tasks.push(_this._exportTextureAsync(texture, mimeType));
            }
            if (!tasks) {
                tasks = [Promise.resolve(null)];
            }
            return Promise.all(tasks).then(function () {
                var extensionWork = _this._exporter._extensionsPostExportMaterialAsync("exportMaterial", glTFMaterial, babylonMaterial);
                if (!extensionWork) {
                    return glTFMaterial;
                }
                return extensionWork.then(function () { return glTFMaterial; });
            });
        });
    };
    /**
     * Converts an image typed array buffer to a base64 image
     * @param buffer typed array buffer
     * @param width width of the image
     * @param height height of the image
     * @param mimeType mimetype of the image
     * @returns base64 image string
     */
    _GLTFMaterialExporter.prototype._getImageDataAsync = function (buffer, width, height, mimeType) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
            var textureType, hostingScene, engine, tempTexture, data;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        textureType = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTURETYPE_UNSIGNED_BYTE;
                        hostingScene = this._exporter._babylonScene;
                        engine = hostingScene.getEngine();
                        tempTexture = engine.createRawTexture(buffer, width, height, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTUREFORMAT_RGBA, false, true, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_SAMPLINGMODE, null, textureType);
                        return [4 /*yield*/, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TextureTools.ApplyPostProcess("pass", tempTexture, hostingScene, textureType, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTURE_NEAREST_SAMPLINGMODE, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTUREFORMAT_RGBA)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, engine._readTexturePixels(tempTexture, width, height)];
                    case 2:
                        data = _a.sent();
                        return [4 /*yield*/, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.DumpTools.DumpDataAsync(width, height, data, mimeType, undefined, true, true)];
                    case 3: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    /**
     * Generates a white texture based on the specified width and height
     * @param width width of the texture in pixels
     * @param height height of the texture in pixels
     * @param scene babylonjs scene
     * @returns white texture
     */
    _GLTFMaterialExporter.prototype._createWhiteTexture = function (width, height, scene) {
        var data = new Uint8Array(width * height * 4);
        for (var i = 0; i < data.length; i = i + 4) {
            data[i] = data[i + 1] = data[i + 2] = data[i + 3] = 0xff;
        }
        var rawTexture = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.RawTexture.CreateRGBATexture(data, width, height, scene);
        return rawTexture;
    };
    /**
     * Resizes the two source textures to the same dimensions.  If a texture is null, a default white texture is generated.  If both textures are null, returns null
     * @param texture1 first texture to resize
     * @param texture2 second texture to resize
     * @param scene babylonjs scene
     * @returns resized textures or null
     */
    _GLTFMaterialExporter.prototype._resizeTexturesToSameDimensions = function (texture1, texture2, scene) {
        var texture1Size = texture1 ? texture1.getSize() : { width: 0, height: 0 };
        var texture2Size = texture2 ? texture2.getSize() : { width: 0, height: 0 };
        var resizedTexture1;
        var resizedTexture2;
        if (texture1Size.width < texture2Size.width) {
            if (texture1 && texture1 instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture) {
                resizedTexture1 = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TextureTools.CreateResizedCopy(texture1, texture2Size.width, texture2Size.height, true);
            }
            else {
                resizedTexture1 = this._createWhiteTexture(texture2Size.width, texture2Size.height, scene);
            }
            resizedTexture2 = texture2;
        }
        else if (texture1Size.width > texture2Size.width) {
            if (texture2 && texture2 instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture) {
                resizedTexture2 = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TextureTools.CreateResizedCopy(texture2, texture1Size.width, texture1Size.height, true);
            }
            else {
                resizedTexture2 = this._createWhiteTexture(texture1Size.width, texture1Size.height, scene);
            }
            resizedTexture1 = texture1;
        }
        else {
            resizedTexture1 = texture1;
            resizedTexture2 = texture2;
        }
        return {
            texture1: resizedTexture1,
            texture2: resizedTexture2,
        };
    };
    /**
     * Converts an array of pixels to a Float32Array
     * Throws an error if the pixel format is not supported
     * @param pixels - array buffer containing pixel values
     * @returns Float32 of pixels
     */
    _GLTFMaterialExporter.prototype._convertPixelArrayToFloat32 = function (pixels) {
        if (pixels instanceof Uint8Array) {
            var length_1 = pixels.length;
            var buffer = new Float32Array(pixels.length);
            for (var i = 0; i < length_1; ++i) {
                buffer[i] = pixels[i] / 255;
            }
            return buffer;
        }
        else if (pixels instanceof Float32Array) {
            return pixels;
        }
        else {
            throw new Error("Unsupported pixel format!");
        }
    };
    /**
     * Convert Specular Glossiness Textures to Metallic Roughness
     * See link below for info on the material conversions from PBR Metallic/Roughness and Specular/Glossiness
     * @link https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Archived/KHR_materials_pbrSpecularGlossiness/examples/convert-between-workflows-bjs/js/babylon.pbrUtilities.js
     * @param diffuseTexture texture used to store diffuse information
     * @param specularGlossinessTexture texture used to store specular and glossiness information
     * @param factors specular glossiness material factors
     * @param mimeType the mime type to use for the texture
     * @returns pbr metallic roughness interface or null
     */
    _GLTFMaterialExporter.prototype._convertSpecularGlossinessTexturesToMetallicRoughnessAsync = function (diffuseTexture, specularGlossinessTexture, factors, mimeType) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
            var promises, scene, resizedTextures, diffuseSize, diffuseBuffer, specularGlossinessBuffer, width, height, diffusePixels, specularPixels, byteLength, metallicRoughnessBuffer, baseColorBuffer, strideSize, maxBaseColor, maxMetallic, maxRoughness, h, w, offset, diffuseColor, specularColor, glossiness, specularGlossiness, metallicRoughness, metallicRoughnessFactors_1, writeOutMetallicRoughnessTexture, writeOutBaseColorTexture, h, w, destinationOffset, linearBaseColorPixel, sRGBBaseColorPixel, metallicRoughnessPixel;
            var _a;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        promises = new Array();
                        if (!(diffuseTexture || specularGlossinessTexture)) {
                            return [2 /*return*/, Promise.reject("_ConvertSpecularGlosinessTexturesToMetallicRoughness: diffuse and specular glossiness textures are not defined!")];
                        }
                        scene = diffuseTexture ? diffuseTexture.getScene() : specularGlossinessTexture ? specularGlossinessTexture.getScene() : null;
                        if (!scene) return [3 /*break*/, 3];
                        resizedTextures = this._resizeTexturesToSameDimensions(diffuseTexture, specularGlossinessTexture, scene);
                        diffuseSize = (_a = resizedTextures.texture1) === null || _a === void 0 ? void 0 : _a.getSize();
                        diffuseBuffer = void 0;
                        specularGlossinessBuffer = void 0;
                        width = diffuseSize.width;
                        height = diffuseSize.height;
                        return [4 /*yield*/, resizedTextures.texture1.readPixels()];
                    case 1:
                        diffusePixels = _b.sent();
                        return [4 /*yield*/, resizedTextures.texture2.readPixels()];
                    case 2:
                        specularPixels = _b.sent();
                        if (diffusePixels) {
                            diffuseBuffer = this._convertPixelArrayToFloat32(diffusePixels);
                        }
                        else {
                            return [2 /*return*/, Promise.reject("Failed to retrieve pixels from diffuse texture!")];
                        }
                        if (specularPixels) {
                            specularGlossinessBuffer = this._convertPixelArrayToFloat32(specularPixels);
                        }
                        else {
                            return [2 /*return*/, Promise.reject("Failed to retrieve pixels from specular glossiness texture!")];
                        }
                        byteLength = specularGlossinessBuffer.byteLength;
                        metallicRoughnessBuffer = new Uint8Array(byteLength);
                        baseColorBuffer = new Uint8Array(byteLength);
                        strideSize = 4;
                        maxBaseColor = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.Black();
                        maxMetallic = 0;
                        maxRoughness = 0;
                        for (h = 0; h < height; ++h) {
                            for (w = 0; w < width; ++w) {
                                offset = (width * h + w) * strideSize;
                                diffuseColor = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3(diffuseBuffer[offset], diffuseBuffer[offset + 1], diffuseBuffer[offset + 2])
                                    .toLinearSpace(scene.getEngine().useExactSrgbConversions)
                                    .multiply(factors.diffuseColor);
                                specularColor = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3(specularGlossinessBuffer[offset], specularGlossinessBuffer[offset + 1], specularGlossinessBuffer[offset + 2])
                                    .toLinearSpace(scene.getEngine().useExactSrgbConversions)
                                    .multiply(factors.specularColor);
                                glossiness = specularGlossinessBuffer[offset + 3] * factors.glossiness;
                                specularGlossiness = {
                                    diffuseColor: diffuseColor,
                                    specularColor: specularColor,
                                    glossiness: glossiness,
                                };
                                metallicRoughness = this._convertSpecularGlossinessToMetallicRoughness(specularGlossiness);
                                maxBaseColor.r = Math.max(maxBaseColor.r, metallicRoughness.baseColor.r);
                                maxBaseColor.g = Math.max(maxBaseColor.g, metallicRoughness.baseColor.g);
                                maxBaseColor.b = Math.max(maxBaseColor.b, metallicRoughness.baseColor.b);
                                maxMetallic = Math.max(maxMetallic, metallicRoughness.metallic);
                                maxRoughness = Math.max(maxRoughness, metallicRoughness.roughness);
                                baseColorBuffer[offset] = metallicRoughness.baseColor.r * 255;
                                baseColorBuffer[offset + 1] = metallicRoughness.baseColor.g * 255;
                                baseColorBuffer[offset + 2] = metallicRoughness.baseColor.b * 255;
                                baseColorBuffer[offset + 3] = resizedTextures.texture1.hasAlpha ? diffuseBuffer[offset + 3] * 255 : 255;
                                metallicRoughnessBuffer[offset] = 0;
                                metallicRoughnessBuffer[offset + 1] = metallicRoughness.roughness * 255;
                                metallicRoughnessBuffer[offset + 2] = metallicRoughness.metallic * 255;
                                metallicRoughnessBuffer[offset + 3] = 255;
                            }
                        }
                        metallicRoughnessFactors_1 = {
                            baseColor: maxBaseColor,
                            metallic: maxMetallic,
                            roughness: maxRoughness,
                        };
                        writeOutMetallicRoughnessTexture = false;
                        writeOutBaseColorTexture = false;
                        for (h = 0; h < height; ++h) {
                            for (w = 0; w < width; ++w) {
                                destinationOffset = (width * h + w) * strideSize;
                                baseColorBuffer[destinationOffset] /= metallicRoughnessFactors_1.baseColor.r > _GLTFMaterialExporter._Epsilon ? metallicRoughnessFactors_1.baseColor.r : 1;
                                baseColorBuffer[destinationOffset + 1] /= metallicRoughnessFactors_1.baseColor.g > _GLTFMaterialExporter._Epsilon ? metallicRoughnessFactors_1.baseColor.g : 1;
                                baseColorBuffer[destinationOffset + 2] /= metallicRoughnessFactors_1.baseColor.b > _GLTFMaterialExporter._Epsilon ? metallicRoughnessFactors_1.baseColor.b : 1;
                                linearBaseColorPixel = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.FromInts(baseColorBuffer[destinationOffset], baseColorBuffer[destinationOffset + 1], baseColorBuffer[destinationOffset + 2]);
                                sRGBBaseColorPixel = linearBaseColorPixel.toGammaSpace(scene.getEngine().useExactSrgbConversions);
                                baseColorBuffer[destinationOffset] = sRGBBaseColorPixel.r * 255;
                                baseColorBuffer[destinationOffset + 1] = sRGBBaseColorPixel.g * 255;
                                baseColorBuffer[destinationOffset + 2] = sRGBBaseColorPixel.b * 255;
                                if (!_GLTFMaterialExporter._FuzzyEquals(sRGBBaseColorPixel, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.White(), _GLTFMaterialExporter._Epsilon)) {
                                    writeOutBaseColorTexture = true;
                                }
                                metallicRoughnessBuffer[destinationOffset + 1] /=
                                    metallicRoughnessFactors_1.roughness > _GLTFMaterialExporter._Epsilon ? metallicRoughnessFactors_1.roughness : 1;
                                metallicRoughnessBuffer[destinationOffset + 2] /= metallicRoughnessFactors_1.metallic > _GLTFMaterialExporter._Epsilon ? metallicRoughnessFactors_1.metallic : 1;
                                metallicRoughnessPixel = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.FromInts(255, metallicRoughnessBuffer[destinationOffset + 1], metallicRoughnessBuffer[destinationOffset + 2]);
                                if (!_GLTFMaterialExporter._FuzzyEquals(metallicRoughnessPixel, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.White(), _GLTFMaterialExporter._Epsilon)) {
                                    writeOutMetallicRoughnessTexture = true;
                                }
                            }
                        }
                        if (writeOutMetallicRoughnessTexture) {
                            promises.push(this._getImageDataAsync(metallicRoughnessBuffer, width, height, mimeType).then(function (data) {
                                metallicRoughnessFactors_1.metallicRoughnessTextureData = data;
                            }));
                        }
                        if (writeOutBaseColorTexture) {
                            promises.push(this._getImageDataAsync(baseColorBuffer, width, height, mimeType).then(function (data) {
                                metallicRoughnessFactors_1.baseColorTextureData = data;
                            }));
                        }
                        return [2 /*return*/, Promise.all(promises).then(function () {
                                return metallicRoughnessFactors_1;
                            })];
                    case 3: return [2 /*return*/, Promise.reject("_ConvertSpecularGlossinessTexturesToMetallicRoughness: Scene from textures is missing!")];
                }
            });
        });
    };
    /**
     * Converts specular glossiness material properties to metallic roughness
     * @param specularGlossiness interface with specular glossiness material properties
     * @returns interface with metallic roughness material properties
     */
    _GLTFMaterialExporter.prototype._convertSpecularGlossinessToMetallicRoughness = function (specularGlossiness) {
        var diffusePerceivedBrightness = this._getPerceivedBrightness(specularGlossiness.diffuseColor);
        var specularPerceivedBrightness = this._getPerceivedBrightness(specularGlossiness.specularColor);
        var oneMinusSpecularStrength = 1 - this._getMaxComponent(specularGlossiness.specularColor);
        var metallic = _GLTFMaterialExporter._SolveMetallic(diffusePerceivedBrightness, specularPerceivedBrightness, oneMinusSpecularStrength);
        var baseColorFromDiffuse = specularGlossiness.diffuseColor.scale(oneMinusSpecularStrength / (1.0 - _GLTFMaterialExporter._DielectricSpecular.r) / Math.max(1 - metallic, _GLTFMaterialExporter._Epsilon));
        var baseColorFromSpecular = specularGlossiness.specularColor
            .subtract(_GLTFMaterialExporter._DielectricSpecular.scale(1 - metallic))
            .scale(1 / Math.max(metallic, _GLTFMaterialExporter._Epsilon));
        var baseColor = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.Lerp(baseColorFromDiffuse, baseColorFromSpecular, metallic * metallic);
        baseColor = baseColor.clampToRef(0, 1, baseColor);
        var metallicRoughness = {
            baseColor: baseColor,
            metallic: metallic,
            roughness: 1 - specularGlossiness.glossiness,
        };
        return metallicRoughness;
    };
    /**
     * Calculates the surface reflectance, independent of lighting conditions
     * @param color Color source to calculate brightness from
     * @returns number representing the perceived brightness, or zero if color is undefined
     */
    _GLTFMaterialExporter.prototype._getPerceivedBrightness = function (color) {
        if (color) {
            return Math.sqrt(0.299 * color.r * color.r + 0.587 * color.g * color.g + 0.114 * color.b * color.b);
        }
        return 0;
    };
    /**
     * Returns the maximum color component value
     * @param color
     * @returns maximum color component value, or zero if color is null or undefined
     */
    _GLTFMaterialExporter.prototype._getMaxComponent = function (color) {
        if (color) {
            return Math.max(color.r, Math.max(color.g, color.b));
        }
        return 0;
    };
    /**
     * Convert a PBRMaterial (Metallic/Roughness) to Metallic Roughness factors
     * @param babylonPBRMaterial BJS PBR Metallic Roughness Material
     * @param mimeType mime type to use for the textures
     * @param glTFPbrMetallicRoughness glTF PBR Metallic Roughness interface
     * @param hasTextureCoords specifies if texture coordinates are present on the submesh to determine if textures should be applied
     * @returns glTF PBR Metallic Roughness factors
     */
    _GLTFMaterialExporter.prototype._convertMetalRoughFactorsToMetallicRoughnessAsync = function (babylonPBRMaterial, mimeType, glTFPbrMetallicRoughness, hasTextureCoords) {
        var promises = [];
        var baseColor = babylonPBRMaterial._albedoColor;
        var metallic = babylonPBRMaterial._metallic;
        var roughness = babylonPBRMaterial._roughness;
        var metallicRoughness = {
            baseColor: baseColor,
            metallic: metallic,
            roughness: roughness,
        };
        if (hasTextureCoords) {
            var albedoTexture = babylonPBRMaterial._albedoTexture;
            if (albedoTexture) {
                promises.push(this._exportTextureAsync(babylonPBRMaterial._albedoTexture, mimeType).then(function (glTFTexture) {
                    if (glTFTexture) {
                        glTFPbrMetallicRoughness.baseColorTexture = glTFTexture;
                    }
                }));
            }
            var metallicTexture = babylonPBRMaterial._metallicTexture;
            if (metallicTexture) {
                promises.push(this._exportTextureAsync(metallicTexture, mimeType).then(function (glTFTexture) {
                    if (glTFTexture) {
                        glTFPbrMetallicRoughness.metallicRoughnessTexture = glTFTexture;
                    }
                }));
            }
        }
        return Promise.all(promises).then(function () {
            return metallicRoughness;
        });
    };
    _GLTFMaterialExporter.prototype._getTextureSampler = function (texture) {
        var sampler = {};
        if (!texture || !(texture instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture)) {
            return sampler;
        }
        var wrapS = this._getGLTFTextureWrapMode(texture.wrapU);
        if (wrapS !== 10497 /* TextureWrapMode.REPEAT */) {
            sampler.wrapS = wrapS;
        }
        var wrapT = this._getGLTFTextureWrapMode(texture.wrapV);
        if (wrapT !== 10497 /* TextureWrapMode.REPEAT */) {
            sampler.wrapT = wrapT;
        }
        switch (texture.samplingMode) {
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_LINEAR: {
                sampler.magFilter = 9729 /* TextureMagFilter.LINEAR */;
                sampler.minFilter = 9729 /* TextureMinFilter.LINEAR */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_NEAREST: {
                sampler.magFilter = 9729 /* TextureMagFilter.LINEAR */;
                sampler.minFilter = 9728 /* TextureMinFilter.NEAREST */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_LINEAR: {
                sampler.magFilter = 9728 /* TextureMagFilter.NEAREST */;
                sampler.minFilter = 9729 /* TextureMinFilter.LINEAR */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_LINEAR_MIPLINEAR: {
                sampler.magFilter = 9728 /* TextureMagFilter.NEAREST */;
                sampler.minFilter = 9987 /* TextureMinFilter.LINEAR_MIPMAP_LINEAR */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_NEAREST: {
                sampler.magFilter = 9728 /* TextureMagFilter.NEAREST */;
                sampler.minFilter = 9728 /* TextureMinFilter.NEAREST */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_LINEAR_MIPNEAREST: {
                sampler.magFilter = 9728 /* TextureMagFilter.NEAREST */;
                sampler.minFilter = 9985 /* TextureMinFilter.LINEAR_MIPMAP_NEAREST */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_NEAREST_MIPNEAREST: {
                sampler.magFilter = 9729 /* TextureMagFilter.LINEAR */;
                sampler.minFilter = 9984 /* TextureMinFilter.NEAREST_MIPMAP_NEAREST */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_NEAREST_MIPLINEAR: {
                sampler.magFilter = 9729 /* TextureMagFilter.LINEAR */;
                sampler.minFilter = 9986 /* TextureMinFilter.NEAREST_MIPMAP_LINEAR */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_NEAREST_MIPLINEAR: {
                sampler.magFilter = 9728 /* TextureMagFilter.NEAREST */;
                sampler.minFilter = 9986 /* TextureMinFilter.NEAREST_MIPMAP_LINEAR */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_LINEAR_MIPLINEAR: {
                sampler.magFilter = 9729 /* TextureMagFilter.LINEAR */;
                sampler.minFilter = 9987 /* TextureMinFilter.LINEAR_MIPMAP_LINEAR */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_LINEAR_MIPNEAREST: {
                sampler.magFilter = 9729 /* TextureMagFilter.LINEAR */;
                sampler.minFilter = 9985 /* TextureMinFilter.LINEAR_MIPMAP_NEAREST */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_NEAREST_MIPNEAREST: {
                sampler.magFilter = 9728 /* TextureMagFilter.NEAREST */;
                sampler.minFilter = 9984 /* TextureMinFilter.NEAREST_MIPMAP_NEAREST */;
                break;
            }
        }
        return sampler;
    };
    _GLTFMaterialExporter.prototype._getGLTFTextureWrapMode = function (wrapMode) {
        switch (wrapMode) {
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.WRAP_ADDRESSMODE: {
                return 10497 /* TextureWrapMode.REPEAT */;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.CLAMP_ADDRESSMODE: {
                return 33071 /* TextureWrapMode.CLAMP_TO_EDGE */;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.MIRROR_ADDRESSMODE: {
                return 33648 /* TextureWrapMode.MIRRORED_REPEAT */;
            }
            default: {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("Unsupported Texture Wrap Mode ".concat(wrapMode, "!"));
                return 10497 /* TextureWrapMode.REPEAT */;
            }
        }
    };
    /**
     * Convert a PBRMaterial (Specular/Glossiness) to Metallic Roughness factors
     * @param babylonPBRMaterial BJS PBR Metallic Roughness Material
     * @param mimeType mime type to use for the textures
     * @param pbrMetallicRoughness glTF PBR Metallic Roughness interface
     * @param hasTextureCoords specifies if texture coordinates are present on the submesh to determine if textures should be applied
     * @returns glTF PBR Metallic Roughness factors
     */
    _GLTFMaterialExporter.prototype._convertSpecGlossFactorsToMetallicRoughnessAsync = function (babylonPBRMaterial, mimeType, pbrMetallicRoughness, hasTextureCoords) {
        var _this = this;
        return Promise.resolve().then(function () {
            var specGloss = {
                diffuseColor: babylonPBRMaterial._albedoColor,
                specularColor: babylonPBRMaterial._reflectivityColor,
                glossiness: babylonPBRMaterial._microSurface,
            };
            var albedoTexture = babylonPBRMaterial._albedoTexture;
            var reflectivityTexture = babylonPBRMaterial._reflectivityTexture;
            var useMicrosurfaceFromReflectivityMapAlpha = babylonPBRMaterial._useMicroSurfaceFromReflectivityMapAlpha;
            if (reflectivityTexture && !useMicrosurfaceFromReflectivityMapAlpha) {
                return Promise.reject("_ConvertPBRMaterial: Glossiness values not included in the reflectivity texture are currently not supported");
            }
            if ((albedoTexture || reflectivityTexture) && hasTextureCoords) {
                var samplerIndex_1 = _this._exportTextureSampler(albedoTexture || reflectivityTexture);
                return _this._convertSpecularGlossinessTexturesToMetallicRoughnessAsync(albedoTexture, reflectivityTexture, specGloss, mimeType).then(function (metallicRoughnessFactors) {
                    var textures = _this._exporter._textures;
                    if (metallicRoughnessFactors.baseColorTextureData) {
                        var imageIndex = _this._exportImage("baseColor".concat(textures.length), mimeType, metallicRoughnessFactors.baseColorTextureData);
                        pbrMetallicRoughness.baseColorTexture = _this._exportTextureInfo(imageIndex, samplerIndex_1, albedoTexture === null || albedoTexture === void 0 ? void 0 : albedoTexture.coordinatesIndex);
                    }
                    if (metallicRoughnessFactors.metallicRoughnessTextureData) {
                        var imageIndex = _this._exportImage("metallicRoughness".concat(textures.length), mimeType, metallicRoughnessFactors.metallicRoughnessTextureData);
                        pbrMetallicRoughness.metallicRoughnessTexture = _this._exportTextureInfo(imageIndex, samplerIndex_1, reflectivityTexture === null || reflectivityTexture === void 0 ? void 0 : reflectivityTexture.coordinatesIndex);
                    }
                    return metallicRoughnessFactors;
                });
            }
            else {
                return _this._convertSpecularGlossinessToMetallicRoughness(specGloss);
            }
        });
    };
    /**
     * Converts a Babylon PBR Base Material to a glTF Material
     * @param babylonPBRMaterial BJS PBR Base Material
     * @param mimeType mime type to use for the textures
     * @param hasTextureCoords specifies if texture coordinates are present on the submesh to determine if textures should be applied
     * @returns async glTF Material representation
     */
    _GLTFMaterialExporter.prototype._convertPBRMaterialAsync = function (babylonPBRMaterial, mimeType, hasTextureCoords) {
        var _this = this;
        var glTFPbrMetallicRoughness = {};
        var glTFMaterial = {
            name: babylonPBRMaterial.name,
        };
        var useMetallicRoughness = babylonPBRMaterial.isMetallicWorkflow();
        if (useMetallicRoughness) {
            var albedoColor = babylonPBRMaterial._albedoColor;
            var alpha = babylonPBRMaterial.alpha;
            if (albedoColor) {
                glTFPbrMetallicRoughness.baseColorFactor = [albedoColor.r, albedoColor.g, albedoColor.b, alpha];
            }
            return this._convertMetalRoughFactorsToMetallicRoughnessAsync(babylonPBRMaterial, mimeType, glTFPbrMetallicRoughness, hasTextureCoords).then(function (metallicRoughness) {
                return _this._setMetallicRoughnessPbrMaterial(metallicRoughness, babylonPBRMaterial, glTFMaterial, glTFPbrMetallicRoughness, mimeType, hasTextureCoords);
            });
        }
        else {
            return this._convertSpecGlossFactorsToMetallicRoughnessAsync(babylonPBRMaterial, mimeType, glTFPbrMetallicRoughness, hasTextureCoords).then(function (metallicRoughness) {
                return _this._setMetallicRoughnessPbrMaterial(metallicRoughness, babylonPBRMaterial, glTFMaterial, glTFPbrMetallicRoughness, mimeType, hasTextureCoords);
            });
        }
    };
    _GLTFMaterialExporter.prototype._setMetallicRoughnessPbrMaterial = function (metallicRoughness, babylonPBRMaterial, glTFMaterial, glTFPbrMetallicRoughness, mimeType, hasTextureCoords) {
        var materialMap = this._exporter._materialMap;
        var materials = this._exporter._materials;
        var promises = [];
        if (metallicRoughness) {
            _GLTFMaterialExporter._SetAlphaMode(glTFMaterial, babylonPBRMaterial);
            if (!(_GLTFMaterialExporter._FuzzyEquals(metallicRoughness.baseColor, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.White(), _GLTFMaterialExporter._Epsilon) &&
                babylonPBRMaterial.alpha >= _GLTFMaterialExporter._Epsilon)) {
                glTFPbrMetallicRoughness.baseColorFactor = [metallicRoughness.baseColor.r, metallicRoughness.baseColor.g, metallicRoughness.baseColor.b, babylonPBRMaterial.alpha];
            }
            if (metallicRoughness.metallic != null && metallicRoughness.metallic !== 1) {
                glTFPbrMetallicRoughness.metallicFactor = metallicRoughness.metallic;
            }
            if (metallicRoughness.roughness != null && metallicRoughness.roughness !== 1) {
                glTFPbrMetallicRoughness.roughnessFactor = metallicRoughness.roughness;
            }
            if (babylonPBRMaterial.backFaceCulling != null && !babylonPBRMaterial.backFaceCulling) {
                if (!babylonPBRMaterial._twoSidedLighting) {
                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn(babylonPBRMaterial.name + ": Back-face culling disabled and two-sided lighting disabled is not supported in glTF.");
                }
                glTFMaterial.doubleSided = true;
            }
            if (hasTextureCoords) {
                var bumpTexture_2 = babylonPBRMaterial._bumpTexture;
                if (bumpTexture_2) {
                    var promise = this._exportTextureAsync(bumpTexture_2, mimeType).then(function (glTFTexture) {
                        if (glTFTexture) {
                            glTFMaterial.normalTexture = glTFTexture;
                            if (bumpTexture_2.level !== 1) {
                                glTFMaterial.normalTexture.scale = bumpTexture_2.level;
                            }
                        }
                    });
                    promises.push(promise);
                }
                var ambientTexture = babylonPBRMaterial._ambientTexture;
                if (ambientTexture) {
                    var promise = this._exportTextureAsync(ambientTexture, mimeType).then(function (glTFTexture) {
                        if (glTFTexture) {
                            var occlusionTexture = {
                                index: glTFTexture.index,
                                texCoord: glTFTexture.texCoord,
                                extensions: glTFTexture.extensions,
                            };
                            glTFMaterial.occlusionTexture = occlusionTexture;
                            var ambientTextureStrength = babylonPBRMaterial._ambientTextureStrength;
                            if (ambientTextureStrength) {
                                occlusionTexture.strength = ambientTextureStrength;
                            }
                        }
                    });
                    promises.push(promise);
                }
                var emissiveTexture = babylonPBRMaterial._emissiveTexture;
                if (emissiveTexture) {
                    var promise = this._exportTextureAsync(emissiveTexture, mimeType).then(function (glTFTexture) {
                        if (glTFTexture) {
                            glTFMaterial.emissiveTexture = glTFTexture;
                        }
                    });
                    promises.push(promise);
                }
            }
            var emissiveColor = babylonPBRMaterial._emissiveColor;
            if (!_GLTFMaterialExporter._FuzzyEquals(emissiveColor, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.Black(), _GLTFMaterialExporter._Epsilon)) {
                glTFMaterial.emissiveFactor = emissiveColor.asArray();
            }
            glTFMaterial.pbrMetallicRoughness = glTFPbrMetallicRoughness;
            materials.push(glTFMaterial);
            materialMap[babylonPBRMaterial.uniqueId] = materials.length - 1;
        }
        return this._finishMaterial(promises, glTFMaterial, babylonPBRMaterial, mimeType);
    };
    _GLTFMaterialExporter.prototype._getPixelsFromTexture = function (babylonTexture) {
        var pixels = babylonTexture.textureType === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTURETYPE_UNSIGNED_BYTE
            ? babylonTexture.readPixels()
            : babylonTexture.readPixels();
        return pixels;
    };
    /**
     * Extracts a texture from a Babylon texture into file data and glTF data
     * @param babylonTexture Babylon texture to extract
     * @param mimeType Mime Type of the babylonTexture
     * @returns glTF texture info, or null if the texture format is not supported
     */
    _GLTFMaterialExporter.prototype._exportTextureAsync = function (babylonTexture, mimeType) {
        var _this = this;
        var extensionPromise = this._exporter._extensionsPreExportTextureAsync("exporter", babylonTexture, mimeType);
        if (!extensionPromise) {
            return this._exportTextureInfoAsync(babylonTexture, mimeType);
        }
        return extensionPromise.then(function (texture) {
            if (!texture) {
                return _this._exportTextureInfoAsync(babylonTexture, mimeType);
            }
            return _this._exportTextureInfoAsync(texture, mimeType);
        });
    };
    _GLTFMaterialExporter.prototype._exportTextureInfoAsync = function (babylonTexture, mimeType) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
            var textureUid, pixels_1, samplerIndex, textureMimeType, internalTextureToImage, internalTextureUniqueId, imageIndexPromise, size_1, textureInfo, _a;
            var _this = this;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        textureUid = babylonTexture.uid;
                        if (!!(textureUid in this._textureMap)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._getPixelsFromTexture(babylonTexture)];
                    case 1:
                        pixels_1 = _b.sent();
                        if (!pixels_1) {
                            return [2 /*return*/, null];
                        }
                        samplerIndex = this._exportTextureSampler(babylonTexture);
                        textureMimeType = babylonTexture.mimeType;
                        if (textureMimeType) {
                            switch (textureMimeType) {
                                case "image/jpeg":
                                case "image/png":
                                case "image/webp":
                                    mimeType = textureMimeType;
                                    break;
                                default:
                                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Unsupported media type: ".concat(textureMimeType));
                                    break;
                            }
                        }
                        internalTextureToImage = this._internalTextureToImage;
                        internalTextureUniqueId = babylonTexture.getInternalTexture().uniqueId;
                        internalTextureToImage[internalTextureUniqueId] || (internalTextureToImage[internalTextureUniqueId] = {});
                        imageIndexPromise = internalTextureToImage[internalTextureUniqueId][mimeType];
                        if (imageIndexPromise === undefined) {
                            size_1 = babylonTexture.getSize();
                            imageIndexPromise = (function () { return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(_this, void 0, void 0, function () {
                                var data;
                                return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this._getImageDataAsync(pixels_1, size_1.width, size_1.height, mimeType)];
                                        case 1:
                                            data = _a.sent();
                                            return [2 /*return*/, this._exportImage(babylonTexture.name, mimeType, data)];
                                    }
                                });
                            }); })();
                            internalTextureToImage[internalTextureUniqueId][mimeType] = imageIndexPromise;
                        }
                        _a = this._exportTextureInfo;
                        return [4 /*yield*/, imageIndexPromise];
                    case 2:
                        textureInfo = _a.apply(this, [_b.sent(), samplerIndex, babylonTexture.coordinatesIndex]);
                        this._textureMap[textureUid] = textureInfo;
                        this._exporter._extensionsPostExportTextures("exporter", this._textureMap[textureUid], babylonTexture);
                        _b.label = 3;
                    case 3: return [2 /*return*/, this._textureMap[textureUid]];
                }
            });
        });
    };
    _GLTFMaterialExporter.prototype._exportImage = function (name, mimeType, data) {
        var imageData = this._exporter._imageData;
        var baseName = name.replace(/\.\/|\/|\.\\|\\/g, "_");
        var extension = getFileExtensionFromMimeType(mimeType);
        var fileName = baseName + extension;
        if (fileName in imageData) {
            fileName = "".concat(baseName, "_").concat(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.RandomId()).concat(extension);
        }
        imageData[fileName] = {
            data: data,
            mimeType: mimeType,
        };
        var images = this._exporter._images;
        images.push({
            name: name,
            uri: fileName,
        });
        return images.length - 1;
    };
    _GLTFMaterialExporter.prototype._exportTextureInfo = function (imageIndex, samplerIndex, coordinatesIndex) {
        var textures = this._exporter._textures;
        var textureIndex = textures.findIndex(function (t) { return t.sampler == samplerIndex && t.source === imageIndex; });
        if (textureIndex === -1) {
            textureIndex = textures.length;
            textures.push({
                source: imageIndex,
                sampler: samplerIndex,
            });
        }
        var textureInfo = { index: textureIndex };
        if (coordinatesIndex) {
            textureInfo.texCoord = coordinatesIndex;
        }
        return textureInfo;
    };
    _GLTFMaterialExporter.prototype._exportTextureSampler = function (texture) {
        var sampler = this._getTextureSampler(texture);
        // if a pre-existing sampler with identical parameters exists, then reuse the previous sampler
        var samplers = this._exporter._samplers;
        var samplerIndex = samplers.findIndex(function (s) { return s.minFilter === sampler.minFilter && s.magFilter === sampler.magFilter && s.wrapS === sampler.wrapS && s.wrapT === sampler.wrapT; });
        if (samplerIndex !== -1) {
            return samplerIndex;
        }
        samplers.push(sampler);
        return samplers.length - 1;
    };
    /**
     * Represents the dielectric specular values for R, G and B
     */
    _GLTFMaterialExporter._DielectricSpecular = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3(0.04, 0.04, 0.04);
    /**
     * Allows the maximum specular power to be defined for material calculations
     */
    _GLTFMaterialExporter._MaxSpecularPower = 1024;
    /**
     * Numeric tolerance value
     */
    _GLTFMaterialExporter._Epsilon = 1e-6;
    return _GLTFMaterialExporter;
}());



/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/glTFSerializer.ts":
/*!***************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/glTFSerializer.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTF2Export: () => (/* binding */ GLTF2Export)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");

/**
 * Class for generating glTF data from a Babylon scene.
 */
var GLTF2Export = /** @class */ (function () {
    function GLTF2Export() {
    }
    /**
     * Exports the geometry of the scene to .gltf file format asynchronously
     * @param scene Babylon scene with scene hierarchy information
     * @param filePrefix File prefix to use when generating the glTF file
     * @param options Exporter options
     * @returns Returns an object with a .gltf file and associates texture names
     * as keys and their data and paths as values
     */
    GLTF2Export.GLTFAsync = function (scene, filePrefix, options) {
        return scene.whenReadyAsync().then(function () {
            var glTFPrefix = filePrefix.replace(/\.[^/.]+$/, "");
            var gltfGenerator = new _glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter(scene, options);
            return gltfGenerator._generateGLTFAsync(glTFPrefix);
        });
    };
    GLTF2Export._PreExportAsync = function (scene, options) {
        return Promise.resolve().then(function () {
            if (options && options.exportWithoutWaitingForScene) {
                return Promise.resolve();
            }
            else {
                return scene.whenReadyAsync();
            }
        });
    };
    GLTF2Export._PostExportAsync = function (scene, glTFData, options) {
        return Promise.resolve().then(function () {
            if (options && options.exportWithoutWaitingForScene) {
                return glTFData;
            }
            else {
                return glTFData;
            }
        });
    };
    /**
     * Exports the geometry of the scene to .glb file format asychronously
     * @param scene Babylon scene with scene hierarchy information
     * @param filePrefix File prefix to use when generating glb file
     * @param options Exporter options
     * @returns Returns an object with a .glb filename as key and data as value
     */
    GLTF2Export.GLBAsync = function (scene, filePrefix, options) {
        var _this = this;
        return this._PreExportAsync(scene, options).then(function () {
            var glTFPrefix = filePrefix.replace(/\.[^/.]+$/, "");
            var gltfGenerator = new _glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter(scene, options);
            return gltfGenerator._generateGLBAsync(glTFPrefix).then(function (glTFData) {
                return _this._PostExportAsync(scene, glTFData, options);
            });
        });
    };
    return GLTF2Export;
}());



/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/glTFUtilities.ts":
/*!**************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/glTFUtilities.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _GLTFUtilities: () => (/* binding */ _GLTFUtilities)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Maths/math.vector */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);

/**
 * @internal
 */
var _GLTFUtilities = /** @class */ (function () {
    function _GLTFUtilities() {
    }
    /**
     * Creates a buffer view based on the supplied arguments
     * @param bufferIndex index value of the specified buffer
     * @param byteOffset byte offset value
     * @param byteLength byte length of the bufferView
     * @param byteStride byte distance between conequential elements
     * @param name name of the buffer view
     * @returns bufferView for glTF
     */
    _GLTFUtilities._CreateBufferView = function (bufferIndex, byteOffset, byteLength, byteStride, name) {
        var bufferview = { buffer: bufferIndex, byteLength: byteLength };
        if (byteOffset) {
            bufferview.byteOffset = byteOffset;
        }
        if (name) {
            bufferview.name = name;
        }
        if (byteStride) {
            bufferview.byteStride = byteStride;
        }
        return bufferview;
    };
    /**
     * Creates an accessor based on the supplied arguments
     * @param bufferviewIndex The index of the bufferview referenced by this accessor
     * @param name The name of the accessor
     * @param type The type of the accessor
     * @param componentType The datatype of components in the attribute
     * @param count The number of attributes referenced by this accessor
     * @param byteOffset The offset relative to the start of the bufferView in bytes
     * @param min Minimum value of each component in this attribute
     * @param max Maximum value of each component in this attribute
     * @returns accessor for glTF
     */
    _GLTFUtilities._CreateAccessor = function (bufferviewIndex, name, type, componentType, count, byteOffset, min, max) {
        var accessor = { name: name, bufferView: bufferviewIndex, componentType: componentType, count: count, type: type };
        if (min != null) {
            accessor.min = min;
        }
        if (max != null) {
            accessor.max = max;
        }
        if (byteOffset != null) {
            accessor.byteOffset = byteOffset;
        }
        return accessor;
    };
    /**
     * Calculates the minimum and maximum values of an array of position floats
     * @param positions Positions array of a mesh
     * @param vertexStart Starting vertex offset to calculate min and max values
     * @param vertexCount Number of vertices to check for min and max values
     * @returns min number array and max number array
     */
    _GLTFUtilities._CalculateMinMaxPositions = function (positions, vertexStart, vertexCount) {
        var min = [Infinity, Infinity, Infinity];
        var max = [-Infinity, -Infinity, -Infinity];
        var positionStrideSize = 3;
        var indexOffset;
        var position;
        var vector;
        if (vertexCount) {
            for (var i = vertexStart, length_1 = vertexStart + vertexCount; i < length_1; ++i) {
                indexOffset = positionStrideSize * i;
                position = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(positions, indexOffset);
                vector = position.asArray();
                for (var j = 0; j < positionStrideSize; ++j) {
                    var num = vector[j];
                    if (num < min[j]) {
                        min[j] = num;
                    }
                    if (num > max[j]) {
                        max[j] = num;
                    }
                    ++indexOffset;
                }
            }
        }
        return { min: min, max: max };
    };
    _GLTFUtilities._NormalizeTangentFromRef = function (tangent) {
        var length = Math.sqrt(tangent.x * tangent.x + tangent.y * tangent.y + tangent.z * tangent.z);
        if (length > 0) {
            tangent.x /= length;
            tangent.y /= length;
            tangent.z /= length;
        }
    };
    _GLTFUtilities._GetDataAccessorElementCount = function (accessorType) {
        switch (accessorType) {
            case "MAT2" /* AccessorType.MAT2 */:
                return 4;
            case "MAT3" /* AccessorType.MAT3 */:
                return 9;
            case "MAT4" /* AccessorType.MAT4 */:
                return 16;
            case "SCALAR" /* AccessorType.SCALAR */:
                return 1;
            case "VEC2" /* AccessorType.VEC2 */:
                return 2;
            case "VEC3" /* AccessorType.VEC3 */:
                return 3;
            case "VEC4" /* AccessorType.VEC4 */:
                return 4;
        }
    };
    return _GLTFUtilities;
}());



/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/index.ts":
/*!******************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/index.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXT_mesh_gpu_instancing: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.EXT_mesh_gpu_instancing),
/* harmony export */   GLTF2Export: () => (/* reexport safe */ _glTFSerializer__WEBPACK_IMPORTED_MODULE_5__.GLTF2Export),
/* harmony export */   GLTFData: () => (/* reexport safe */ _glTFData__WEBPACK_IMPORTED_MODULE_1__.GLTFData),
/* harmony export */   KHR_lights_punctual: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_lights_punctual),
/* harmony export */   KHR_materials_anisotropy: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_anisotropy),
/* harmony export */   KHR_materials_clearcoat: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_clearcoat),
/* harmony export */   KHR_materials_diffuse_transmission: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_diffuse_transmission),
/* harmony export */   KHR_materials_dispersion: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_dispersion),
/* harmony export */   KHR_materials_emissive_strength: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_emissive_strength),
/* harmony export */   KHR_materials_ior: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_ior),
/* harmony export */   KHR_materials_iridescence: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_iridescence),
/* harmony export */   KHR_materials_sheen: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_sheen),
/* harmony export */   KHR_materials_specular: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_specular),
/* harmony export */   KHR_materials_transmission: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_transmission),
/* harmony export */   KHR_materials_unlit: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_unlit),
/* harmony export */   KHR_materials_volume: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_volume),
/* harmony export */   KHR_texture_transform: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_texture_transform),
/* harmony export */   _BinaryWriter: () => (/* reexport safe */ _glTFExporter__WEBPACK_IMPORTED_MODULE_2__._BinaryWriter),
/* harmony export */   _Exporter: () => (/* reexport safe */ _glTFExporter__WEBPACK_IMPORTED_MODULE_2__._Exporter),
/* harmony export */   _GLTFAnimation: () => (/* reexport safe */ _glTFAnimation__WEBPACK_IMPORTED_MODULE_0__._GLTFAnimation),
/* harmony export */   _GLTFMaterialExporter: () => (/* reexport safe */ _glTFMaterialExporter__WEBPACK_IMPORTED_MODULE_4__._GLTFMaterialExporter),
/* harmony export */   _GLTFUtilities: () => (/* reexport safe */ _glTFUtilities__WEBPACK_IMPORTED_MODULE_6__._GLTFUtilities),
/* harmony export */   __IGLTFExporterExtensionV2: () => (/* reexport safe */ _glTFExporterExtension__WEBPACK_IMPORTED_MODULE_3__.__IGLTFExporterExtensionV2)
/* harmony export */ });
/* harmony import */ var _glTFAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTFAnimation */ "../../../dev/serializers/src/glTF/2.0/glTFAnimation.ts");
/* harmony import */ var _glTFData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glTFData */ "../../../dev/serializers/src/glTF/2.0/glTFData.ts");
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var _glTFExporterExtension__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./glTFExporterExtension */ "../../../dev/serializers/src/glTF/2.0/glTFExporterExtension.ts");
/* harmony import */ var _glTFMaterialExporter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./glTFMaterialExporter */ "../../../dev/serializers/src/glTF/2.0/glTFMaterialExporter.ts");
/* harmony import */ var _glTFSerializer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./glTFSerializer */ "../../../dev/serializers/src/glTF/2.0/glTFSerializer.ts");
/* harmony import */ var _glTFUtilities__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./glTFUtilities */ "../../../dev/serializers/src/glTF/2.0/glTFUtilities.ts");
/* harmony import */ var _Extensions_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Extensions/index */ "../../../dev/serializers/src/glTF/2.0/Extensions/index.ts");
/* eslint-disable import/no-internal-modules */










/***/ }),

/***/ "../../../dev/serializers/src/glTF/glTFFileExporter.ts":
/*!*************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/glTFFileExporter.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __IGLTFExporterExtension: () => (/* binding */ __IGLTFExporterExtension)
/* harmony export */ });
/** @internal */
// eslint-disable-next-line no-var, @typescript-eslint/naming-convention
var __IGLTFExporterExtension = 0; // I am here to allow dts to be created


/***/ }),

/***/ "../../../dev/serializers/src/glTF/index.ts":
/*!**************************************************!*\
  !*** ../../../dev/serializers/src/glTF/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXT_mesh_gpu_instancing: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__.EXT_mesh_gpu_instancing),
/* harmony export */   GLTF2Export: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__.GLTF2Export),
/* harmony export */   GLTFData: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__.GLTFData),
/* harmony export */   KHR_lights_punctual: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__.KHR_lights_punctual),
/* harmony export */   KHR_materials_anisotropy: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_anisotropy),
/* harmony export */   KHR_materials_clearcoat: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_clearcoat),
/* harmony export */   KHR_materials_diffuse_transmission: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_diffuse_transmission),
/* harmony export */   KHR_materials_dispersion: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_dispersion),
/* harmony export */   KHR_materials_emissive_strength: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_emissive_strength),
/* harmony export */   KHR_materials_ior: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_ior),
/* harmony export */   KHR_materials_iridescence: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_iridescence),
/* harmony export */   KHR_materials_sheen: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_sheen),
/* harmony export */   KHR_materials_specular: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_specular),
/* harmony export */   KHR_materials_transmission: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_transmission),
/* harmony export */   KHR_materials_unlit: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_unlit),
/* harmony export */   KHR_materials_volume: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_volume),
/* harmony export */   KHR_texture_transform: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__.KHR_texture_transform),
/* harmony export */   _BinaryWriter: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__._BinaryWriter),
/* harmony export */   _Exporter: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__._Exporter),
/* harmony export */   _GLTFAnimation: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__._GLTFAnimation),
/* harmony export */   _GLTFMaterialExporter: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__._GLTFMaterialExporter),
/* harmony export */   _GLTFUtilities: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__._GLTFUtilities),
/* harmony export */   __IGLTFExporterExtension: () => (/* reexport safe */ _glTFFileExporter__WEBPACK_IMPORTED_MODULE_0__.__IGLTFExporterExtension),
/* harmony export */   __IGLTFExporterExtensionV2: () => (/* reexport safe */ _2_0_index__WEBPACK_IMPORTED_MODULE_1__.__IGLTFExporterExtensionV2)
/* harmony export */ });
/* harmony import */ var _glTFFileExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTFFileExporter */ "../../../dev/serializers/src/glTF/glTFFileExporter.ts");
/* harmony import */ var _2_0_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./2.0/index */ "../../../dev/serializers/src/glTF/2.0/index.ts");
/* eslint-disable import/no-internal-modules */




/***/ }),

/***/ "../../../dev/serializers/src/index.ts":
/*!*********************************************!*\
  !*** ../../../dev/serializers/src/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXT_mesh_gpu_instancing: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.EXT_mesh_gpu_instancing),
/* harmony export */   GLTF2Export: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.GLTF2Export),
/* harmony export */   GLTFData: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.GLTFData),
/* harmony export */   KHR_lights_punctual: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.KHR_lights_punctual),
/* harmony export */   KHR_materials_anisotropy: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_anisotropy),
/* harmony export */   KHR_materials_clearcoat: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_clearcoat),
/* harmony export */   KHR_materials_diffuse_transmission: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_diffuse_transmission),
/* harmony export */   KHR_materials_dispersion: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_dispersion),
/* harmony export */   KHR_materials_emissive_strength: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_emissive_strength),
/* harmony export */   KHR_materials_ior: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_ior),
/* harmony export */   KHR_materials_iridescence: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_iridescence),
/* harmony export */   KHR_materials_sheen: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_sheen),
/* harmony export */   KHR_materials_specular: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_specular),
/* harmony export */   KHR_materials_transmission: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_transmission),
/* harmony export */   KHR_materials_unlit: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_unlit),
/* harmony export */   KHR_materials_volume: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_volume),
/* harmony export */   KHR_texture_transform: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.KHR_texture_transform),
/* harmony export */   OBJExport: () => (/* reexport safe */ _OBJ_index__WEBPACK_IMPORTED_MODULE_0__.OBJExport),
/* harmony export */   STLExport: () => (/* reexport safe */ _stl_index__WEBPACK_IMPORTED_MODULE_2__.STLExport),
/* harmony export */   USDZExportAsync: () => (/* reexport safe */ _USDZ_index__WEBPACK_IMPORTED_MODULE_3__.USDZExportAsync),
/* harmony export */   _BinaryWriter: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__._BinaryWriter),
/* harmony export */   _Exporter: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__._Exporter),
/* harmony export */   _GLTFAnimation: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__._GLTFAnimation),
/* harmony export */   _GLTFMaterialExporter: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__._GLTFMaterialExporter),
/* harmony export */   _GLTFUtilities: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__._GLTFUtilities),
/* harmony export */   __IGLTFExporterExtension: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.__IGLTFExporterExtension),
/* harmony export */   __IGLTFExporterExtensionV2: () => (/* reexport safe */ _glTF_index__WEBPACK_IMPORTED_MODULE_1__.__IGLTFExporterExtensionV2)
/* harmony export */ });
/* harmony import */ var _OBJ_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OBJ/index */ "../../../dev/serializers/src/OBJ/index.ts");
/* harmony import */ var _glTF_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glTF/index */ "../../../dev/serializers/src/glTF/index.ts");
/* harmony import */ var _stl_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stl/index */ "../../../dev/serializers/src/stl/index.ts");
/* harmony import */ var _USDZ_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./USDZ/index */ "../../../dev/serializers/src/USDZ/index.ts");
/* eslint-disable import/no-internal-modules */






/***/ }),

/***/ "../../../dev/serializers/src/stl/index.ts":
/*!*************************************************!*\
  !*** ../../../dev/serializers/src/stl/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STLExport: () => (/* reexport safe */ _stlSerializer__WEBPACK_IMPORTED_MODULE_0__.STLExport)
/* harmony export */ });
/* harmony import */ var _stlSerializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stlSerializer */ "../../../dev/serializers/src/stl/stlSerializer.ts");



/***/ }),

/***/ "../../../dev/serializers/src/stl/stlSerializer.ts":
/*!*********************************************************!*\
  !*** ../../../dev/serializers/src/stl/stlSerializer.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STLExport: () => (/* binding */ STLExport)
/* harmony export */ });
/* harmony import */ var babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Maths/math.vector */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__);




/**
 * Class for generating STL data from a Babylon scene.
 */
var STLExport = /** @class */ (function () {
    function STLExport() {
    }
    /**
     * Exports the geometry of a Mesh array in .STL file format (ASCII)
     * @param meshes list defines the mesh to serialize
     * @param download triggers the automatic download of the file.
     * @param fileName changes the downloads fileName.
     * @param binary changes the STL to a binary type.
     * @param isLittleEndian toggle for binary type exporter.
     * @param doNotBakeTransform toggle if meshes transforms should be baked or not.
     * @param supportInstancedMeshes toggle to export instanced Meshes. Enabling support for instanced meshes will override doNoBakeTransform as true
     * @param exportIndividualMeshes toggle to export each mesh as an independent mesh. By default, all the meshes are combined into one mesh. This property has no effect when exporting in binary format
     * @returns the STL as UTF8 string
     */
    STLExport.CreateSTL = function (meshes, download, fileName, binary, isLittleEndian, doNotBakeTransform, supportInstancedMeshes, exportIndividualMeshes) {
        //Binary support adapted from https://gist.github.com/paulkaplan/6d5f0ab2c7e8fdc68a61
        if (download === void 0) { download = true; }
        if (fileName === void 0) { fileName = "stlmesh"; }
        if (binary === void 0) { binary = false; }
        if (isLittleEndian === void 0) { isLittleEndian = true; }
        if (doNotBakeTransform === void 0) { doNotBakeTransform = false; }
        if (supportInstancedMeshes === void 0) { supportInstancedMeshes = false; }
        if (exportIndividualMeshes === void 0) { exportIndividualMeshes = false; }
        var getFaceData = function (indices, vertices, i) {
            var id = [indices[i] * 3, indices[i + 1] * 3, indices[i + 2] * 3];
            var v = [
                new babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.Vector3(vertices[id[0]], vertices[id[0] + 2], vertices[id[0] + 1]),
                new babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.Vector3(vertices[id[1]], vertices[id[1] + 2], vertices[id[1] + 1]),
                new babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.Vector3(vertices[id[2]], vertices[id[2] + 2], vertices[id[2] + 1]),
            ];
            var p1p2 = v[0].subtract(v[1]);
            var p3p2 = v[2].subtract(v[1]);
            var n = babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.Vector3.Cross(p3p2, p1p2).normalize();
            return { v: v, n: n };
        };
        var writeVector = function (dataview, offset, vector, isLittleEndian) {
            offset = writeFloat(dataview, offset, vector.x, isLittleEndian);
            offset = writeFloat(dataview, offset, vector.y, isLittleEndian);
            return writeFloat(dataview, offset, vector.z, isLittleEndian);
        };
        var writeFloat = function (dataview, offset, value, isLittleEndian) {
            dataview.setFloat32(offset, value, isLittleEndian);
            return offset + 4;
        };
        var getVerticesData = function (mesh) {
            if (supportInstancedMeshes) {
                var sourceMesh = mesh;
                if (mesh instanceof babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.InstancedMesh) {
                    sourceMesh = mesh.sourceMesh;
                }
                var data_1 = sourceMesh.getVerticesData(babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind, true, true);
                if (!data_1)
                    return [];
                var temp = babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero();
                var index = void 0;
                for (index = 0; index < data_1.length; index += 3) {
                    babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.Vector3.TransformCoordinatesFromFloatsToRef(data_1[index], data_1[index + 1], data_1[index + 2], mesh.computeWorldMatrix(true), temp).toArray(data_1, index);
                }
                return data_1;
            }
            else {
                return mesh.getVerticesData(babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind) || [];
            }
        };
        if (supportInstancedMeshes) {
            doNotBakeTransform = true;
        }
        var data = "";
        var faceCount = 0;
        var offset = 0;
        if (binary) {
            for (var i = 0; i < meshes.length; i++) {
                var mesh = meshes[i];
                var indices = mesh.getIndices();
                faceCount += indices ? indices.length / 3 : 0;
            }
            var bufferSize = 84 + 50 * faceCount;
            var buffer = new ArrayBuffer(bufferSize);
            data = new DataView(buffer);
            offset += 80;
            data.setUint32(offset, faceCount, isLittleEndian);
            offset += 4;
        }
        else {
            if (!exportIndividualMeshes) {
                data = "solid stlmesh\r\n";
            }
        }
        for (var i = 0; i < meshes.length; i++) {
            var mesh = meshes[i];
            if (!binary && exportIndividualMeshes) {
                data += "solid " + mesh.name + "\r\n";
            }
            if (!doNotBakeTransform && mesh instanceof babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.Mesh) {
                mesh.bakeCurrentTransformIntoVertices();
            }
            var vertices = getVerticesData(mesh);
            var indices = mesh.getIndices() || [];
            for (var i_1 = 0; i_1 < indices.length; i_1 += 3) {
                var fd = getFaceData(indices, vertices, i_1);
                if (binary) {
                    offset = writeVector(data, offset, fd.n, isLittleEndian);
                    offset = writeVector(data, offset, fd.v[0], isLittleEndian);
                    offset = writeVector(data, offset, fd.v[1], isLittleEndian);
                    offset = writeVector(data, offset, fd.v[2], isLittleEndian);
                    offset += 2;
                }
                else {
                    data += "\tfacet normal " + fd.n.x + " " + fd.n.y + " " + fd.n.z + "\r\n";
                    data += "\t\touter loop\r\n";
                    data += "\t\t\tvertex " + fd.v[0].x + " " + fd.v[0].y + " " + fd.v[0].z + "\r\n";
                    data += "\t\t\tvertex " + fd.v[1].x + " " + fd.v[1].y + " " + fd.v[1].z + "\r\n";
                    data += "\t\t\tvertex " + fd.v[2].x + " " + fd.v[2].y + " " + fd.v[2].z + "\r\n";
                    data += "\t\tendloop\r\n";
                    data += "\tendfacet\r\n";
                }
            }
            if (!binary && exportIndividualMeshes) {
                data += "endsolid " + name + "\r\n";
            }
        }
        if (!binary && !exportIndividualMeshes) {
            data += "endsolid stlmesh";
        }
        if (download) {
            var a = document.createElement("a");
            var blob = new Blob([data], { type: "application/octet-stream" });
            a.href = window.URL.createObjectURL(blob);
            a.download = fileName + ".stl";
            a.click();
        }
        return data;
    };
    return STLExport;
}());



/***/ }),

/***/ "../../../lts/serializers/src/legacy/legacy-glTF2Serializer.ts":
/*!*********************************************************************!*\
  !*** ../../../lts/serializers/src/legacy/legacy-glTF2Serializer.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXT_mesh_gpu_instancing: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.EXT_mesh_gpu_instancing),
/* harmony export */   GLTF2Export: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.GLTF2Export),
/* harmony export */   GLTFData: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.GLTFData),
/* harmony export */   KHR_lights_punctual: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_lights_punctual),
/* harmony export */   KHR_materials_anisotropy: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_anisotropy),
/* harmony export */   KHR_materials_clearcoat: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_clearcoat),
/* harmony export */   KHR_materials_diffuse_transmission: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_diffuse_transmission),
/* harmony export */   KHR_materials_dispersion: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_dispersion),
/* harmony export */   KHR_materials_emissive_strength: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_emissive_strength),
/* harmony export */   KHR_materials_ior: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_ior),
/* harmony export */   KHR_materials_iridescence: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_iridescence),
/* harmony export */   KHR_materials_sheen: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_sheen),
/* harmony export */   KHR_materials_specular: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_specular),
/* harmony export */   KHR_materials_transmission: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_transmission),
/* harmony export */   KHR_materials_unlit: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_unlit),
/* harmony export */   KHR_materials_volume: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_volume),
/* harmony export */   KHR_texture_transform: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_texture_transform),
/* harmony export */   _BinaryWriter: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__._BinaryWriter),
/* harmony export */   _Exporter: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__._Exporter),
/* harmony export */   _GLTFAnimation: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__._GLTFAnimation),
/* harmony export */   _GLTFMaterialExporter: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__._GLTFMaterialExporter),
/* harmony export */   _GLTFUtilities: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__._GLTFUtilities),
/* harmony export */   __IGLTFExporterExtension: () => (/* reexport safe */ serializers_glTF_glTFFileExporter__WEBPACK_IMPORTED_MODULE_0__.__IGLTFExporterExtension),
/* harmony export */   __IGLTFExporterExtensionV2: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.__IGLTFExporterExtensionV2)
/* harmony export */ });
/* harmony import */ var serializers_glTF_glTFFileExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! serializers/glTF/glTFFileExporter */ "../../../dev/serializers/src/glTF/glTFFileExporter.ts");
/* harmony import */ var serializers_glTF_2_0_glTFData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! serializers/glTF/2.0/glTFData */ "../../../dev/serializers/src/glTF/2.0/glTFData.ts");
/* harmony import */ var serializers_glTF_2_0_glTFSerializer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! serializers/glTF/2.0/glTFSerializer */ "../../../dev/serializers/src/glTF/2.0/glTFSerializer.ts");
/* harmony import */ var serializers_glTF_2_0_Extensions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! serializers/glTF/2.0/Extensions/index */ "../../../dev/serializers/src/glTF/2.0/Extensions/index.ts");
/* harmony import */ var serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! serializers/glTF/2.0/index */ "../../../dev/serializers/src/glTF/2.0/index.ts");
/* eslint-disable import/no-internal-modules */





/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    var BABYLON_1 = globalObject.BABYLON;
    BABYLON_1.GLTF2 = BABYLON_1.GLTF2 || {};
    BABYLON_1.GLTF2.Exporter = BABYLON_1.GLTF2.Exporter || {};
    BABYLON_1.GLTF2.Exporter.Extensions = BABYLON_1.GLTF2.Exporter.Extensions || {};
    var keys = [];
    for (var key in serializers_glTF_glTFFileExporter__WEBPACK_IMPORTED_MODULE_0__) {
        BABYLON_1[key] = serializers_glTF_glTFFileExporter__WEBPACK_IMPORTED_MODULE_0__[key];
        keys.push(key);
    }
    for (var key in serializers_glTF_2_0_glTFData__WEBPACK_IMPORTED_MODULE_1__) {
        BABYLON_1[key] = serializers_glTF_2_0_glTFData__WEBPACK_IMPORTED_MODULE_1__[key];
        keys.push(key);
    }
    for (var key in serializers_glTF_2_0_glTFSerializer__WEBPACK_IMPORTED_MODULE_2__) {
        BABYLON_1[key] = serializers_glTF_2_0_glTFSerializer__WEBPACK_IMPORTED_MODULE_2__[key];
        keys.push(key);
    }
    for (var key in serializers_glTF_2_0_Extensions_index__WEBPACK_IMPORTED_MODULE_3__) {
        BABYLON_1.GLTF2.Exporter.Extensions[key] = serializers_glTF_2_0_Extensions_index__WEBPACK_IMPORTED_MODULE_3__[key];
        keys.push(key);
    }
    for (var key in serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__) {
        // Prevent Reassignment.
        if (keys.indexOf(key) > -1) {
            continue;
        }
        BABYLON_1.GLTF2.Exporter[key] = serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__[key];
    }
}




/***/ }),

/***/ "../../../lts/serializers/src/legacy/legacy-objSerializer.ts":
/*!*******************************************************************!*\
  !*** ../../../lts/serializers/src/legacy/legacy-objSerializer.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBJExport: () => (/* reexport safe */ serializers_OBJ_index__WEBPACK_IMPORTED_MODULE_0__.OBJExport)
/* harmony export */ });
/* harmony import */ var serializers_OBJ_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! serializers/OBJ/index */ "../../../dev/serializers/src/OBJ/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var serializer in serializers_OBJ_index__WEBPACK_IMPORTED_MODULE_0__) {
        globalObject.BABYLON[serializer] = serializers_OBJ_index__WEBPACK_IMPORTED_MODULE_0__[serializer];
    }
}



/***/ }),

/***/ "../../../lts/serializers/src/legacy/legacy-stlSerializer.ts":
/*!*******************************************************************!*\
  !*** ../../../lts/serializers/src/legacy/legacy-stlSerializer.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STLExport: () => (/* reexport safe */ serializers_stl_index__WEBPACK_IMPORTED_MODULE_0__.STLExport)
/* harmony export */ });
/* harmony import */ var serializers_stl_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! serializers/stl/index */ "../../../dev/serializers/src/stl/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var serializer in serializers_stl_index__WEBPACK_IMPORTED_MODULE_0__) {
        globalObject.BABYLON[serializer] = serializers_stl_index__WEBPACK_IMPORTED_MODULE_0__[serializer];
    }
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

/***/ "../../../lts/serializers/src/legacy/legacy.ts":
/*!*****************************************************!*\
  !*** ../../../lts/serializers/src/legacy/legacy.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXT_mesh_gpu_instancing: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.EXT_mesh_gpu_instancing),
/* harmony export */   GLTF2Export: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.GLTF2Export),
/* harmony export */   GLTFData: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.GLTFData),
/* harmony export */   KHR_lights_punctual: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.KHR_lights_punctual),
/* harmony export */   KHR_materials_anisotropy: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_anisotropy),
/* harmony export */   KHR_materials_clearcoat: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_clearcoat),
/* harmony export */   KHR_materials_diffuse_transmission: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_diffuse_transmission),
/* harmony export */   KHR_materials_dispersion: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_dispersion),
/* harmony export */   KHR_materials_emissive_strength: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_emissive_strength),
/* harmony export */   KHR_materials_ior: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_ior),
/* harmony export */   KHR_materials_iridescence: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_iridescence),
/* harmony export */   KHR_materials_sheen: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_sheen),
/* harmony export */   KHR_materials_specular: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_specular),
/* harmony export */   KHR_materials_transmission: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_transmission),
/* harmony export */   KHR_materials_unlit: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_unlit),
/* harmony export */   KHR_materials_volume: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.KHR_materials_volume),
/* harmony export */   KHR_texture_transform: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.KHR_texture_transform),
/* harmony export */   OBJExport: () => (/* reexport safe */ _legacy_objSerializer__WEBPACK_IMPORTED_MODULE_2__.OBJExport),
/* harmony export */   STLExport: () => (/* reexport safe */ _legacy_stlSerializer__WEBPACK_IMPORTED_MODULE_3__.STLExport),
/* harmony export */   USDZExportAsync: () => (/* reexport safe */ _legacy_usdzSerializer__WEBPACK_IMPORTED_MODULE_4__.USDZExportAsync),
/* harmony export */   _BinaryWriter: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__._BinaryWriter),
/* harmony export */   _Exporter: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__._Exporter),
/* harmony export */   _GLTFAnimation: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__._GLTFAnimation),
/* harmony export */   _GLTFMaterialExporter: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__._GLTFMaterialExporter),
/* harmony export */   _GLTFUtilities: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__._GLTFUtilities),
/* harmony export */   __IGLTFExporterExtension: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.__IGLTFExporterExtension),
/* harmony export */   __IGLTFExporterExtensionV2: () => (/* reexport safe */ _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__.__IGLTFExporterExtensionV2)
/* harmony export */ });
/* harmony import */ var serializers_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! serializers/index */ "../../../dev/serializers/src/index.ts");
/* harmony import */ var _legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./legacy-glTF2Serializer */ "../../../lts/serializers/src/legacy/legacy-glTF2Serializer.ts");
/* harmony import */ var _legacy_objSerializer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./legacy-objSerializer */ "../../../lts/serializers/src/legacy/legacy-objSerializer.ts");
/* harmony import */ var _legacy_stlSerializer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./legacy-stlSerializer */ "../../../lts/serializers/src/legacy/legacy-stlSerializer.ts");
/* harmony import */ var _legacy_usdzSerializer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./legacy-usdzSerializer */ "../../../lts/serializers/src/legacy/legacy-usdzSerializer.ts");
/* eslint-disable import/export */
/* eslint-disable import/no-internal-modules */







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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   serializers: () => (/* reexport module object */ _lts_serializers_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_serializers_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/serializers/legacy/legacy */ "../../../lts/serializers/src/legacy/legacy.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_serializers_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbmpzLnNlcmlhbGl6ZXJzLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0NBO0FBQ0E7QUFJQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQThMQTtBQTdMQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUVBOzs7O0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pNQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTtBQUVBO0FBT0E7QUFDQTtBQUdBO0FBQ0E7QUFrREE7QUFDQTtBQVNBO0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQWVBO0FBRUE7QUFDQTtBQUlBO0FBRUE7O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBSUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBSUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQWFBO0FBRUE7QUFDQTtBQUNBO0FBTUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBWUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQU9BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBUUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQWtDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBb0JBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFpQkE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFZQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBYUE7QUFDQTtBQUVBOzs7Ozs7Ozs7QUFTQTtBQUNBOzs7Ozs7QUFDQTtBQWFBO0FBQ0E7O0FBQUE7OztBQUlBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTs7Ozs7Ozs7Ozs7QUFDQTtBQUVBO0FBQ0E7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7QUFBQTtBQUVBOzs7Ozs7QUFNQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcHRCQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFjQTtBQWJBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUlBO0FBR0E7QUFDQTtBQUVBO0FBR0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBQUE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFPQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RMQTtBQUNBO0FBQ0E7QUFFQTtBQUlBO0FBQ0E7QUFHQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQWVBOztBQUVBO0FBQ0E7QUFqQkE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBV0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNMQTtBQUVBO0FBR0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFjQTtBQWJBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUlBO0FBR0E7QUFDQTtBQUVBO0FBR0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRkE7QUFFQTtBQUdBO0FBRUE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFjQTtBQWJBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUlBO0FBR0E7QUFDQTtBQUVBO0FBR0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFHQTtBQUVBO0FBR0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBY0E7QUFiQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFJQTtBQUdBO0FBQ0E7QUFFQTtBQUdBO0FBREE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUFBO0FBQ0E7O0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SEE7QUFFQTtBQUVBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQVlBO0FBQ0E7QUFaQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUdBO0FBRUE7QUFDQTtBQUdBO0FBREE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRUE7QUFFQTtBQUdBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQTZDQTtBQTNDQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25FQTtBQUVBO0FBRUE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFZQTtBQVhBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQTtBQUVBO0FBR0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFjQTtBQWJBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUlBO0FBR0E7QUFDQTtBQUVBO0FBR0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hGQTtBQUVBO0FBR0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFjQTtBQWJBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBS0E7QUFDQTtBQUVBO0FBR0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BGQTtBQUVBO0FBR0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFjQTtBQWJBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUlBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQURBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQUE7QUFDQTs7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsSEE7QUFFQTtBQUVBO0FBRUE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFjQTtBQWJBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUlBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQURBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTs7Ozs7OztBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTs7O0FBSUE7QUFDQTs7QUFHQTs7OztBQUNBO0FBQ0E7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEhBO0FBRUE7QUFDQTtBQUVBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBWUE7QUFYQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBR0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6REE7QUFFQTtBQUVBO0FBRUE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFjQTtBQWJBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUlBO0FBR0E7QUFDQTtBQUVBO0FBR0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUFBO0FBQ0E7O0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNySEE7QUFJQTtBQUVBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBYUE7QUFaQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUdBO0FBREE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFJQTtBQUNBO0FBaURBOzs7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUFBO0FBbzhCQTtBQW44QkE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFhQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQWFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7QUFZQTtBQUNBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7OztBQVlBO0FBQ0E7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7OztBQVdBO0FBQ0E7O0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBY0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTs7QUExREE7QUFBQTtBQTJEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUF6SUE7QUFBQTtBQUFBO0FBMElBO0FBQ0E7QUFDQTtBQUVBO0FBZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBVUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FBZUE7QUFDQTtBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBV0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7O0FBUUE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7OztBQVFBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7Ozs7O0FBU0E7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FDemhDQTs7QUFFQTtBQUNBO0FBTUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFFQTtBQUNBO0FBSUE7QUFDQTtBQUlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdUNBOzs7QUFHQTtBQUNBO0FBdU9BOzs7O0FBSUE7QUFDQTtBQWpKQTtBQWtKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQXpLQTtBQUFBO0FBTUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFJQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBTUE7QUFJQTtBQUVBO0FBT0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBc0NBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBOzs7QUFBQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBUUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7OztBQU9BO0FBQ0E7QUFPQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQVlBO0FBQ0E7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBL0NBO0FBQUE7QUFBQTtBQWdEQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFVQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFsekRBO0FBQ0E7QUFrekRBO0FBQUE7QUFoNURBO0FBazVEQTs7OztBQUlBO0FBQ0E7QUFhQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7Ozs7Ozs7Ozs7Ozs7OztBQy94RUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFLQTtBQUNBO0FBdURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBNkJBO0FBbEJBOztBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBYUE7QUFDQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7OztBQU9BO0FBQ0E7Ozs7OztBQUNBO0FBRUE7QUFDQTtBQUdBO0FBRUE7O0FBQUE7QUFFQTs7QUFBQTtBQUVBO0FBQUE7Ozs7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7QUFTQTtBQUNBOzs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7O0FBQUE7QUFDQTs7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBRUE7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7OztBQU9BO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7QUFPQTtBQUNBO0FBQUE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7O0FBQ0E7QUFDQTtBQUNBOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBQ0E7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTs7QUFBQTtBQUNBO0FBQ0E7O0FBR0E7Ozs7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBemtDQTs7QUFFQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQVVBOztBQUVBO0FBQ0E7QUFxakNBO0FBQUE7QUEza0NBOzs7Ozs7Ozs7Ozs7Ozs7O0FDckZBO0FBc0RBOztBQUVBO0FBQ0E7QUFBQTtBQXFEQTtBQXBEQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3R0E7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUE4SEE7QUE3SEE7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7Ozs7Ozs7OztBQVdBO0FBQ0E7QUFVQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQW1KQTtBQWxKQTs7Ozs7Ozs7Ozs7QUFXQTtBQUNBO0FBVUE7QUFSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pEQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNOQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvT0JKL2luZGV4LnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvT0JKL29ialNlcmlhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9VU0RaL2luZGV4LnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvVVNEWi91c2R6RXhwb3J0ZXIudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0VYVF9tZXNoX2dwdV9pbnN0YW5jaW5nLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi8yLjAvRXh0ZW5zaW9ucy9LSFJfbGlnaHRzX3B1bmN0dWFsLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi8yLjAvRXh0ZW5zaW9ucy9LSFJfbWF0ZXJpYWxzX2FuaXNvdHJvcHkudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl9tYXRlcmlhbHNfY2xlYXJjb2F0LnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi8yLjAvRXh0ZW5zaW9ucy9LSFJfbWF0ZXJpYWxzX2RpZmZ1c2VfdHJhbnNtaXNzaW9uLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi8yLjAvRXh0ZW5zaW9ucy9LSFJfbWF0ZXJpYWxzX2Rpc3BlcnNpb24udHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl9tYXRlcmlhbHNfZW1pc3NpdmVfc3RyZW5ndGgudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl9tYXRlcmlhbHNfaW9yLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi8yLjAvRXh0ZW5zaW9ucy9LSFJfbWF0ZXJpYWxzX2lyaWRlc2NlbmNlLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi8yLjAvRXh0ZW5zaW9ucy9LSFJfbWF0ZXJpYWxzX3NoZWVuLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi8yLjAvRXh0ZW5zaW9ucy9LSFJfbWF0ZXJpYWxzX3NwZWN1bGFyLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi8yLjAvRXh0ZW5zaW9ucy9LSFJfbWF0ZXJpYWxzX3RyYW5zbWlzc2lvbi50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL2dsVEYvMi4wL0V4dGVuc2lvbnMvS0hSX21hdGVyaWFsc191bmxpdC50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL2dsVEYvMi4wL0V4dGVuc2lvbnMvS0hSX21hdGVyaWFsc192b2x1bWUudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl90ZXh0dXJlX3RyYW5zZm9ybS50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL2dsVEYvMi4wL0V4dGVuc2lvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9nbFRGLzIuMC9nbFRGQW5pbWF0aW9uLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi8yLjAvZ2xURkRhdGEudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9nbFRGLzIuMC9nbFRGRXhwb3J0ZXIudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9nbFRGLzIuMC9nbFRGRXhwb3J0ZXJFeHRlbnNpb24udHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9nbFRGLzIuMC9nbFRGTWF0ZXJpYWxFeHBvcnRlci50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL2dsVEYvMi4wL2dsVEZTZXJpYWxpemVyLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi8yLjAvZ2xURlV0aWxpdGllcy50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL2dsVEYvMi4wL2luZGV4LnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi9nbFRGRmlsZUV4cG9ydGVyLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi9pbmRleC50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL2luZGV4LnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvc3RsL2luZGV4LnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvc3RsL3N0bFNlcmlhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vbHRzL3NlcmlhbGl6ZXJzL3NyYy9sZWdhY3kvbGVnYWN5LWdsVEYyU2VyaWFsaXplci50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9sdHMvc2VyaWFsaXplcnMvc3JjL2xlZ2FjeS9sZWdhY3ktb2JqU2VyaWFsaXplci50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9sdHMvc2VyaWFsaXplcnMvc3JjL2xlZ2FjeS9sZWdhY3ktc3RsU2VyaWFsaXplci50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9sdHMvc2VyaWFsaXplcnMvc3JjL2xlZ2FjeS9sZWdhY3ktdXNkelNlcmlhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vbHRzL3NlcmlhbGl6ZXJzL3NyYy9sZWdhY3kvbGVnYWN5LnRzIiwid2VicGFjazovL1NFUklBTElaRVJTL2V4dGVybmFsIHVtZCB7XCJyb290XCI6XCJCQUJZTE9OXCIsXCJjb21tb25qc1wiOlwiYmFieWxvbmpzXCIsXCJjb21tb25qczJcIjpcImJhYnlsb25qc1wiLFwiYW1kXCI6XCJiYWJ5bG9uanNcIn0iLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5tanMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1NFUklBTElaRVJTL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1NFUklBTElaRVJTLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImJhYnlsb25qcy1zZXJpYWxpemVyc1wiLCBbXCJiYWJ5bG9uanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYmFieWxvbmpzLXNlcmlhbGl6ZXJzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYmFieWxvbmpzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTRVJJQUxJWkVSU1wiXSA9IGZhY3Rvcnkocm9vdFtcIkJBQllMT05cIl0pO1xufSkoKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0aGlzKSwgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01hdGhzX21hdGhfdmVjdG9yX18pID0+IHtcbnJldHVybiAiLCJleHBvcnQgKiBmcm9tIFwiLi9vYmpTZXJpYWxpemVyXCI7XHJcbiIsImltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgeyBNYXRyaXggfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLnZlY3RvclwiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCJjb3JlL01pc2MvdG9vbHNcIjtcclxuaW1wb3J0IHR5cGUgeyBTdGFuZGFyZE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL3N0YW5kYXJkTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBHZW9tZXRyeSB9IGZyb20gXCJjb3JlL01lc2hlcy9nZW9tZXRyeVwiO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIGZvciBnZW5lcmF0aW5nIE9CSiBkYXRhIGZyb20gYSBCYWJ5bG9uIHNjZW5lLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9CSkV4cG9ydCB7XHJcbiAgICAvKipcclxuICAgICAqIEV4cG9ydHMgdGhlIGdlb21ldHJ5IG9mIGEgTWVzaCBhcnJheSBpbiAuT0JKIGZpbGUgZm9ybWF0ICh0ZXh0KVxyXG4gICAgICogQHBhcmFtIG1lc2hlcyBkZWZpbmVzIHRoZSBsaXN0IG9mIG1lc2hlcyB0byBzZXJpYWxpemVcclxuICAgICAqIEBwYXJhbSBtYXRlcmlhbHMgZGVmaW5lcyBpZiBtYXRlcmlhbHMgc2hvdWxkIGJlIGV4cG9ydGVkXHJcbiAgICAgKiBAcGFyYW0gbWF0bGlibmFtZSBkZWZpbmVzIHRoZSBuYW1lIG9mIHRoZSBhc3NvY2lhdGVkIG10bCBmaWxlXHJcbiAgICAgKiBAcGFyYW0gZ2xvYmFscG9zaXRpb24gZGVmaW5lcyBpZiB0aGUgZXhwb3J0ZWQgcG9zaXRpb25zIGFyZSBnbG9iYWxzIG9yIGxvY2FsIHRvIHRoZSBleHBvcnRlZCBtZXNoXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgT0JKIGNvbnRlbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBPQkoobWVzaGVzOiBNZXNoW10sIG1hdGVyaWFscz86IGJvb2xlYW4sIG1hdGxpYm5hbWU/OiBzdHJpbmcsIGdsb2JhbHBvc2l0aW9uPzogYm9vbGVhbik6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qgb3V0cHV0OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIGxldCB2ID0gMTtcclxuICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIHV2IGluZGV4IGluIGNhc2UgbWl4ZWQgbWVzaGVzIGFyZSBwYXNzZWQgaW5cclxuICAgICAgICBsZXQgdGV4dHVyZVYgPSAxO1xyXG5cclxuICAgICAgICBpZiAobWF0ZXJpYWxzKSB7XHJcbiAgICAgICAgICAgIGlmICghbWF0bGlibmFtZSkge1xyXG4gICAgICAgICAgICAgICAgbWF0bGlibmFtZSA9IFwibWF0XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3V0cHV0LnB1c2goXCJtdGxsaWIgXCIgKyBtYXRsaWJuYW1lICsgXCIubXRsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1lc2hlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNoID0gbWVzaGVzW2pdO1xyXG4gICAgICAgICAgICBjb25zdCBvYmplY3ROYW1lID0gbWVzaC5uYW1lIHx8IGBtZXNoJHtqfX1gO1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChgbyAke29iamVjdE5hbWV9YCk7XHJcblxyXG4gICAgICAgICAgICAvL1VzZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIGluIHRoZSBzY2VuZSwgdG8gdGhlIGZpbGUgKHRoaXMgYmFjayB0byBub3JtYWwgaW4gdGhlIGVuZClcclxuICAgICAgICAgICAgbGV0IGludmVyc2VUcmFuc2Zvcm06IE51bGxhYmxlPE1hdHJpeD4gPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoZ2xvYmFscG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IG1lc2guY29tcHV0ZVdvcmxkTWF0cml4KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgaW52ZXJzZVRyYW5zZm9ybSA9IG5ldyBNYXRyaXgoKTtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5pbnZlcnRUb1JlZihpbnZlcnNlVHJhbnNmb3JtKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtZXNoLmJha2VUcmFuc2Zvcm1JbnRvVmVydGljZXModHJhbnNmb3JtKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9UT0RPOiBzdWJtZXNoZXMgKGdyb3VwcylcclxuICAgICAgICAgICAgLy9UT0RPOiBzbW9vdGhpbmcgZ3JvdXBzIChzIDEsIHMgb2ZmKTtcclxuICAgICAgICAgICAgaWYgKG1hdGVyaWFscykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ID0gbWVzaC5tYXRlcmlhbDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goXCJ1c2VtdGwgXCIgKyBtYXQuaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGc6IE51bGxhYmxlPEdlb21ldHJ5PiA9IG1lc2guZ2VvbWV0cnk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWcpIHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLldhcm4oXCJObyBnZW9tZXRyeSBpcyBwcmVzZW50IG9uIHRoZSBtZXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRydW5rVmVydHMgPSBnLmdldFZlcnRpY2VzRGF0YShcInBvc2l0aW9uXCIpO1xyXG4gICAgICAgICAgICBjb25zdCB0cnVua05vcm1hbHMgPSBnLmdldFZlcnRpY2VzRGF0YShcIm5vcm1hbFwiKTtcclxuICAgICAgICAgICAgY29uc3QgdHJ1bmtVViA9IGcuZ2V0VmVydGljZXNEYXRhKFwidXZcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRydW5rRmFjZXMgPSBnLmdldEluZGljZXMoKTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRWID0gMDtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRUZXh0dXJlViA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRydW5rVmVydHMgfHwgIXRydW5rRmFjZXMpIHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLldhcm4oXCJUaGVyZSBhcmUgbm8gcG9zaXRpb24gdmVydGljZXMgb3IgaW5kaWNlcyBvbiB0aGUgbWVzaCFcIik7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdXNlUmlnaHRIYW5kZWRTeXN0ZW0gPSBtZXNoZXNbMF0uZ2V0U2NlbmUoKS51c2VSaWdodEhhbmRlZFN5c3RlbTtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGVkbmVzc1NpZ24gPSB1c2VSaWdodEhhbmRlZFN5c3RlbSA/IDEgOiAtMTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJ1bmtWZXJ0cy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goXCJ2IFwiICsgdHJ1bmtWZXJ0c1tpXSAqIGhhbmRlZG5lc3NTaWduICsgXCIgXCIgKyB0cnVua1ZlcnRzW2kgKyAxXSArIFwiIFwiICsgdHJ1bmtWZXJ0c1tpICsgMl0pO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFYrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRydW5rTm9ybWFscyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRydW5rTm9ybWFscy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKFwidm4gXCIgKyB0cnVua05vcm1hbHNbaV0gKiBoYW5kZWRuZXNzU2lnbiArIFwiIFwiICsgdHJ1bmtOb3JtYWxzW2kgKyAxXSArIFwiIFwiICsgdHJ1bmtOb3JtYWxzW2kgKyAyXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRydW5rVVYgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cnVua1VWLmxlbmd0aDsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goXCJ2dCBcIiArIHRydW5rVVZbaV0gKyBcIiBcIiArIHRydW5rVVZbaSArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV4dHVyZVYrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYmxhbmtzOiBzdHJpbmdbXSA9IFtcIlwiLCBcIlwiLCBcIlwiXTtcclxuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBtZXNoLm1hdGVyaWFsIHx8IG1lc2guZ2V0U2NlbmUoKS5kZWZhdWx0TWF0ZXJpYWw7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzaWRlT3JpZW50YXRpb24gPSBtYXRlcmlhbC5fZ2V0RWZmZWN0aXZlT3JpZW50YXRpb24obWVzaCk7XHJcbiAgICAgICAgICAgIGNvbnN0IFtvZmZzZXQxLCBvZmZzZXQyXSA9IHNpZGVPcmllbnRhdGlvbiA9PT0gTWF0ZXJpYWwuQ2xvY2tXaXNlU2lkZU9yaWVudGF0aW9uID8gWzIsIDFdIDogWzEsIDJdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cnVua0ZhY2VzLmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRpY2VzID0gW1N0cmluZyh0cnVua0ZhY2VzW2ldICsgdiksIFN0cmluZyh0cnVua0ZhY2VzW2kgKyBvZmZzZXQxXSArIHYpLCBTdHJpbmcodHJ1bmtGYWNlc1tpICsgb2Zmc2V0Ml0gKyB2KV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0dXJlSW5kaWNlcyA9IFtTdHJpbmcodHJ1bmtGYWNlc1tpXSArIHRleHR1cmVWKSwgU3RyaW5nKHRydW5rRmFjZXNbaSArIG9mZnNldDFdICsgdGV4dHVyZVYpLCBTdHJpbmcodHJ1bmtGYWNlc1tpICsgb2Zmc2V0Ml0gKyB0ZXh0dXJlVildO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZhY2VQb3NpdGlvbnMgPSBpbmRpY2VzO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmFjZVVWcyA9IHRydW5rVVYgIT0gbnVsbCA/IHRleHR1cmVJbmRpY2VzIDogYmxhbmtzO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmFjZU5vcm1hbHMgPSB0cnVua05vcm1hbHMgIT0gbnVsbCA/IGluZGljZXMgOiBibGFua3M7XHJcblxyXG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgXCJmIFwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjZVBvc2l0aW9uc1swXSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiL1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjZVVWc1swXSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiL1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjZU5vcm1hbHNbMF0gK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhY2VQb3NpdGlvbnNbMV0gK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIi9cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhY2VVVnNbMV0gK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIi9cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhY2VOb3JtYWxzWzFdICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWNlUG9zaXRpb25zWzJdICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCIvXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWNlVVZzWzJdICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCIvXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWNlTm9ybWFsc1syXVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2JhY2sgZGUgcHJldmlvdXMgbWF0cml4LCB0byBub3QgY2hhbmdlIHRoZSBvcmlnaW5hbCBtZXNoIGluIHRoZSBzY2VuZVxyXG4gICAgICAgICAgICBpZiAoZ2xvYmFscG9zaXRpb24gJiYgaW52ZXJzZVRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgbWVzaC5iYWtlVHJhbnNmb3JtSW50b1ZlcnRpY2VzKGludmVyc2VUcmFuc2Zvcm0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHYgKz0gY3VycmVudFY7XHJcbiAgICAgICAgICAgIHRleHR1cmVWICs9IGN1cnJlbnRUZXh0dXJlVjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdGV4dDogc3RyaW5nID0gb3V0cHV0LmpvaW4oXCJcXG5cIik7XHJcbiAgICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBvcnRzIHRoZSBtYXRlcmlhbChzKSBvZiBhIG1lc2ggaW4gLk1UTCBmaWxlIGZvcm1hdCAodGV4dClcclxuICAgICAqIEBwYXJhbSBtZXNoIGRlZmluZXMgdGhlIG1lc2ggdG8gZXh0cmFjdCB0aGUgbWF0ZXJpYWwgZnJvbVxyXG4gICAgICogQHJldHVybnMgdGhlIG10bCBjb250ZW50XHJcbiAgICAgKi9cclxuICAgIC8vVE9ETzogRXhwb3J0IHRoZSBtYXRlcmlhbHMgb2YgbWVzaCBhcnJheVxyXG4gICAgcHVibGljIHN0YXRpYyBNVEwobWVzaDogTWVzaCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gW107XHJcbiAgICAgICAgY29uc3QgbSA9IDxTdGFuZGFyZE1hdGVyaWFsPm1lc2gubWF0ZXJpYWw7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCJuZXdtdGwgbWF0MVwiKTtcclxuICAgICAgICBvdXRwdXQucHVzaChcIiAgTnMgXCIgKyBtLnNwZWN1bGFyUG93ZXIudG9GaXhlZCg0KSk7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCIgIE5pIDEuNTAwMFwiKTtcclxuICAgICAgICBvdXRwdXQucHVzaChcIiAgZCBcIiArIG0uYWxwaGEudG9GaXhlZCg0KSk7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCIgIFRyIDAuMDAwMFwiKTtcclxuICAgICAgICBvdXRwdXQucHVzaChcIiAgVGYgMS4wMDAwIDEuMDAwMCAxLjAwMDBcIik7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCIgIGlsbHVtIDJcIik7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCIgIEthIFwiICsgbS5hbWJpZW50Q29sb3Iuci50b0ZpeGVkKDQpICsgXCIgXCIgKyBtLmFtYmllbnRDb2xvci5nLnRvRml4ZWQoNCkgKyBcIiBcIiArIG0uYW1iaWVudENvbG9yLmIudG9GaXhlZCg0KSk7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCIgIEtkIFwiICsgbS5kaWZmdXNlQ29sb3Iuci50b0ZpeGVkKDQpICsgXCIgXCIgKyBtLmRpZmZ1c2VDb2xvci5nLnRvRml4ZWQoNCkgKyBcIiBcIiArIG0uZGlmZnVzZUNvbG9yLmIudG9GaXhlZCg0KSk7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCIgIEtzIFwiICsgbS5zcGVjdWxhckNvbG9yLnIudG9GaXhlZCg0KSArIFwiIFwiICsgbS5zcGVjdWxhckNvbG9yLmcudG9GaXhlZCg0KSArIFwiIFwiICsgbS5zcGVjdWxhckNvbG9yLmIudG9GaXhlZCg0KSk7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCIgIEtlIFwiICsgbS5lbWlzc2l2ZUNvbG9yLnIudG9GaXhlZCg0KSArIFwiIFwiICsgbS5lbWlzc2l2ZUNvbG9yLmcudG9GaXhlZCg0KSArIFwiIFwiICsgbS5lbWlzc2l2ZUNvbG9yLmIudG9GaXhlZCg0KSk7XHJcblxyXG4gICAgICAgIC8vVE9ETzogdXYgc2NhbGUsIG9mZnNldCwgd3JhcFxyXG4gICAgICAgIC8vVE9ETzogVVYgbWlycm9yZWQgaW4gQmxlbmRlcj8gc2Vjb25kIFVWIGNoYW5uZWw/IGxpZ2h0TWFwPyByZWZsZWN0aW9uIHRleHR1cmVzP1xyXG4gICAgICAgIGNvbnN0IHV2c2NhbGUgPSBcIlwiO1xyXG5cclxuICAgICAgICBpZiAobS5hbWJpZW50VGV4dHVyZSkge1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChcIiAgbWFwX0thIFwiICsgdXZzY2FsZSArIG0uYW1iaWVudFRleHR1cmUubmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobS5kaWZmdXNlVGV4dHVyZSkge1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChcIiAgbWFwX0tkIFwiICsgdXZzY2FsZSArIG0uZGlmZnVzZVRleHR1cmUubmFtZSk7XHJcbiAgICAgICAgICAgIC8vVE9ETzogYWxwaGEgdGVzdGluZywgb3BhY2l0eSBpbiBkaWZmdXNlIHRleHR1cmUgYWxwaGEgY2hhbm5lbCAoZGlmZnVzZVRleHR1cmUuaGFzQWxwaGEgLT4gbWFwX2QpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobS5zcGVjdWxhclRleHR1cmUpIHtcclxuICAgICAgICAgICAgb3V0cHV0LnB1c2goXCIgIG1hcF9LcyBcIiArIHV2c2NhbGUgKyBtLnNwZWN1bGFyVGV4dHVyZS5uYW1lKTtcclxuICAgICAgICAgICAgLyogVE9ETzogZ2xvc3NpbmVzcyA9IHNwZWN1bGFyIGhpZ2hsaWdodCBjb21wb25lbnQgaXMgaW4gYWxwaGEgY2hhbm5lbCBvZiBzcGVjdWxhclRleHR1cmUuICg/Pz8pXHJcbiAgICAgICAgICAgIGlmIChtLnVzZUdsb3NzaW5lc3NGcm9tU3BlY3VsYXJNYXBBbHBoYSkgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKFwiICBtYXBfTnMgXCIrdXZzY2FsZSArIG0uc3BlY3VsYXJUZXh0dXJlLm5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBUT0RPOiBlbWlzc2l2ZSB0ZXh0dXJlIG5vdCBpbiAuTUFUIGZvcm1hdCAoPz8/KVxyXG4gICAgICAgIGlmIChtLmVtaXNzaXZlVGV4dHVyZSkge1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChcIiAgbWFwX2QgXCIrdXZzY2FsZSttLmVtaXNzaXZlVGV4dHVyZS5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKi9cclxuXHJcbiAgICAgICAgaWYgKG0uYnVtcFRleHR1cmUpIHtcclxuICAgICAgICAgICAgb3V0cHV0LnB1c2goXCIgIG1hcF9idW1wIC1pbWZjaGFuIHogXCIgKyB1dnNjYWxlICsgbS5idW1wVGV4dHVyZS5uYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtLm9wYWNpdHlUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFwiICBtYXBfZCBcIiArIHV2c2NhbGUgKyBtLm9wYWNpdHlUZXh0dXJlLm5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGV4dCA9IG91dHB1dC5qb2luKFwiXFxuXCIpO1xyXG4gICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgfVxyXG59XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzICovXHJcbmV4cG9ydCAqIGZyb20gXCIuL3VzZHpFeHBvcnRlclwiO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cclxuaW1wb3J0IHsgVmVydGV4QnVmZmVyIH0gZnJvbSBcImNvcmUvQnVmZmVycy9idWZmZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBDYW1lcmEgfSBmcm9tIFwiY29yZS9DYW1lcmFzL2NhbWVyYVwiO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiY29yZS9FbmdpbmVzL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgUEJSTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvUEJSL3Bick1hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgUEJSTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9QQlIvcGJyTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IFN0YW5kYXJkTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvc3RhbmRhcmRNYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2Jhc2VUZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy90ZXh0dXJlXCI7XHJcbmltcG9ydCB7IENvbG9yMyB9IGZyb20gXCJjb3JlL01hdGhzL21hdGguY29sb3JcIjtcclxuaW1wb3J0IHsgTWF0cml4LCBWZWN0b3IyIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC52ZWN0b3JcIjtcclxuaW1wb3J0IHR5cGUgeyBHZW9tZXRyeSB9IGZyb20gXCJjb3JlL01lc2hlcy9nZW9tZXRyeVwiO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5pbXBvcnQgeyBEdW1wVG9vbHMgfSBmcm9tIFwiY29yZS9NaXNjL2R1bXBUb29sc1wiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCJjb3JlL01pc2MvdG9vbHNcIjtcclxuaW1wb3J0IHR5cGUgeyBTY2VuZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcbmltcG9ydCB0eXBlIHsgRmxvYXRBcnJheSwgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5cclxuLyoqXHJcbiAqIFBvcnRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvZXhhbXBsZXMvanNtL2V4cG9ydGVycy9VU0RaRXhwb3J0ZXIuanNcclxuICogVGhhbmtzIGEgbG90IHRvIHRoZSB0aHJlZS5qcyB0ZWFtIGZvciB0aGVpciBhbWF6aW5nIHdvcmshXHJcbiAqL1xyXG5cclxuLy8gRkZsYXRlIGFjY2Vzc1xyXG5kZWNsYXJlIGNvbnN0IGZmbGF0ZTogYW55O1xyXG5cclxuLyoqXHJcbiAqIE9wdGlvbnMgZm9yIHRoZSBVU0RaIGV4cG9ydFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJVVNEWkV4cG9ydE9wdGlvbnMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBVUkwgdG8gbG9hZCB0aGUgZmZsYXRlIGxpYnJhcnkgZnJvbVxyXG4gICAgICovXHJcbiAgICBmZmxhdGVVcmw/OiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIEluY2x1ZGUgYW5jaG9yaW5nIHByb3BlcnRpZXMgaW4gdGhlIFVTRFogZmlsZVxyXG4gICAgICovXHJcbiAgICBpbmNsdWRlQW5jaG9yaW5nUHJvcGVydGllcz86IGJvb2xlYW47XHJcbiAgICAvKipcclxuICAgICAqIEFuY2hvcmluZyB0eXBlIChwbGFuZSBieSBkZWZhdWx0KVxyXG4gICAgICovXHJcbiAgICBhbmNob3JpbmdUeXBlPzogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBQbGFuZSBhbmNob3JpbmcgYWxpZ25tZW50IChob3Jpem9udGFsIGJ5IGRlZmF1bHQpXHJcbiAgICAgKi9cclxuICAgIHBsYW5lQW5jaG9yaW5nQWxpZ25tZW50Pzogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBNb2RlbCBmaWxlIG5hbWUgKG1vZGVsLnVzZGEgYnkgZGVmYXVsdClcclxuICAgICAqL1xyXG4gICAgbW9kZWxGaWxlTmFtZT86IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogUHJlY2lzaW9uIHRvIHVzZSBmb3IgbnVtYmVyICg1IGJ5IGRlZmF1bHQpXHJcbiAgICAgKi9cclxuICAgIHByZWNpc2lvbj86IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogRXhwb3J0IHRoZSBjYW1lcmEgKGZhbHNlIGJ5IGRlZmF1bHQpXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydENhbWVyYT86IGJvb2xlYW47XHJcbiAgICAvKipcclxuICAgICAqIENhbWVyYSBzZW5zb3Igd2lkdGggKDM1IGJ5IGRlZmF1bHQpXHJcbiAgICAgKi9cclxuICAgIGNhbWVyYVNlbnNvcldpZHRoPzogbnVtYmVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZEhlYWRlcigpIHtcclxuICAgIHJldHVybiBgI3VzZGEgMS4wXHJcbiAgICAoXHJcbiAgICAgICAgY3VzdG9tTGF5ZXJEYXRhID0ge1xyXG4gICAgICAgICAgICBzdHJpbmcgY3JlYXRvciA9IFwiQmFieWxvbi5qcyBVU0RaRXhwb3J0QXN5bmNcIlxyXG4gICAgICAgIH1cclxuICAgICAgICBkZWZhdWx0UHJpbSA9IFwiUm9vdFwiXHJcbiAgICAgICAgbWV0ZXJzUGVyVW5pdCA9IDFcclxuICAgICAgICB1cEF4aXMgPSBcIllcIlxyXG4gICAgKWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkU2NlbmVTdGFydChvcHRpb25zOiBJVVNEWkV4cG9ydE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGFsaWdubWVudCA9XHJcbiAgICAgICAgb3B0aW9ucy5pbmNsdWRlQW5jaG9yaW5nUHJvcGVydGllcyA9PT0gdHJ1ZVxyXG4gICAgICAgICAgICA/IGBcclxuXHRcdHRva2VuIHByZWxpbWluYXJ5OmFuY2hvcmluZzp0eXBlID0gXCIke29wdGlvbnMuYW5jaG9yaW5nVHlwZX1cIlxyXG5cdFx0dG9rZW4gcHJlbGltaW5hcnk6cGxhbmVBbmNob3Jpbmc6YWxpZ25tZW50ID0gXCIke29wdGlvbnMucGxhbmVBbmNob3JpbmdBbGlnbm1lbnR9XCJgXHJcbiAgICAgICAgICAgIDogXCJcIjtcclxuICAgIHJldHVybiBgZGVmIFhmb3JtIFwiUm9vdFwiXHJcbiAgICB7XHJcbiAgICAgICAgZGVmIFNjb3BlIFwiU2NlbmVzXCIgKFxyXG4gICAgICAgICAgICBraW5kID0gXCJzY2VuZUxpYnJhcnlcIlxyXG4gICAgICAgIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRlZiBYZm9ybSBcIlNjZW5lXCIgKFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBib29sIHByZWxpbWluYXJ5X2NvbGxpZGVzV2l0aEVudmlyb25tZW50ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyBzY2VuZU5hbWUgPSBcIlNjZW5lXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9IFwiU2NlbmVcIlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIHske2FsaWdubWVudH1cclxuICAgICAgICAgICAgYDtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRTY2VuZUVuZCgpIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9YDtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRNZXNoVmVydGV4Q291bnQoZ2VvbWV0cnk6IEdlb21ldHJ5KSB7XHJcbiAgICBjb25zdCBjb3VudCA9IGdlb21ldHJ5LmdldEluZGljZXMoKT8ubGVuZ3RoID8gZ2VvbWV0cnkuZ2V0VG90YWxJbmRpY2VzKCkgOiBnZW9tZXRyeS5nZXRUb3RhbFZlcnRpY2VzKCk7XHJcblxyXG4gICAgcmV0dXJuIEFycmF5KGNvdW50IC8gMylcclxuICAgICAgICAuZmlsbCgzKVxyXG4gICAgICAgIC5qb2luKFwiLCBcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkTWVzaFZlcnRleEluZGljZXMoZ2VvbWV0cnk6IEdlb21ldHJ5KSB7XHJcbiAgICBjb25zdCBpbmRleCA9IGdlb21ldHJ5LmdldEluZGljZXMoKTtcclxuICAgIGNvbnN0IGFycmF5ID0gW107XHJcblxyXG4gICAgaWYgKGluZGV4ICE9PSBudWxsKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRleC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBhcnJheS5wdXNoKGluZGV4W2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGdlb21ldHJ5LmdldFRvdGFsVmVydGljZXMoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBhcnJheS5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYXJyYXkuam9pbihcIiwgXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZFZlY3RvcjNBcnJheShhdHRyaWJ1dGU6IEZsb2F0QXJyYXksIG9wdGlvbnM6IElVU0RaRXhwb3J0T3B0aW9ucywgc3RyaWRlID0gMykge1xyXG4gICAgY29uc3QgYXJyYXkgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJpYnV0ZS5sZW5ndGggLyBzdHJpZGU7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHggPSBhdHRyaWJ1dGVbaSAqIHN0cmlkZV07XHJcbiAgICAgICAgY29uc3QgeSA9IGF0dHJpYnV0ZVtpICogc3RyaWRlICsgMV07XHJcbiAgICAgICAgY29uc3QgeiA9IGF0dHJpYnV0ZVtpICogc3RyaWRlICsgMl07XHJcblxyXG4gICAgICAgIGFycmF5LnB1c2goYCgke3gudG9QcmVjaXNpb24ob3B0aW9ucy5wcmVjaXNpb24pfSwgJHt5LnRvUHJlY2lzaW9uKG9wdGlvbnMucHJlY2lzaW9uKX0sICR7ei50b1ByZWNpc2lvbihvcHRpb25zLnByZWNpc2lvbil9KWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhcnJheS5qb2luKFwiLCBcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkVmVjdG9yMkFycmF5KGF0dHJpYnV0ZTogRmxvYXRBcnJheSwgb3B0aW9uczogSVVTRFpFeHBvcnRPcHRpb25zKSB7XHJcbiAgICBjb25zdCBhcnJheSA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0cmlidXRlLmxlbmd0aCAvIDI7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHggPSBhdHRyaWJ1dGVbaSAqIDJdO1xyXG4gICAgICAgIGNvbnN0IHkgPSBhdHRyaWJ1dGVbaSAqIDIgKyAxXTtcclxuXHJcbiAgICAgICAgYXJyYXkucHVzaChgKCR7eC50b1ByZWNpc2lvbihvcHRpb25zLnByZWNpc2lvbil9LCAkeygxIC0geSkudG9QcmVjaXNpb24ob3B0aW9ucy5wcmVjaXNpb24pfSlgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYXJyYXkuam9pbihcIiwgXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZEFkZGl0aW9uYWxBdHRyaWJ1dGVzKGdlb21ldHJ5OiBHZW9tZXRyeSwgb3B0aW9uczogSVVTRFpFeHBvcnRPcHRpb25zKSB7XHJcbiAgICBsZXQgc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGlkID0gaSA+IDAgPyBpIDogXCJcIjtcclxuICAgICAgICBjb25zdCB1dkF0dHJpYnV0ZSA9IGdlb21ldHJ5LmdldFZlcnRpY2VzRGF0YShWZXJ0ZXhCdWZmZXIuVVZLaW5kICsgKGlkID8gaWQgOiBcIlwiKSk7XHJcblxyXG4gICAgICAgIGlmICh1dkF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgICBzdHJpbmcgKz0gYFxyXG5cdFx0dGV4Q29vcmQyZltdIHByaW12YXJzOnN0JHtpZH0gPSBbJHtCdWlsZFZlY3RvcjJBcnJheSh1dkF0dHJpYnV0ZSwgb3B0aW9ucyl9XSAoXHJcblx0XHRcdGludGVycG9sYXRpb24gPSBcInZlcnRleFwiXHJcblx0XHQpYDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdmVydGV4IGNvbG9yc1xyXG5cclxuICAgIGNvbnN0IGNvbG9yQXR0cmlidXRlID0gZ2VvbWV0cnkuZ2V0VmVydGljZXNEYXRhKFZlcnRleEJ1ZmZlci5Db2xvcktpbmQpO1xyXG5cclxuICAgIGlmIChjb2xvckF0dHJpYnV0ZSkge1xyXG4gICAgICAgIHN0cmluZyArPSBgXHJcblx0Y29sb3IzZltdIHByaW12YXJzOmRpc3BsYXlDb2xvciA9IFske0J1aWxkVmVjdG9yM0FycmF5KGNvbG9yQXR0cmlidXRlLCBvcHRpb25zLCA0KX1dIChcclxuXHRcdGludGVycG9sYXRpb24gPSBcInZlcnRleFwiXHJcblx0XHQpYDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RyaW5nO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZE1lc2goZ2VvbWV0cnk6IEdlb21ldHJ5LCBvcHRpb25zOiBJVVNEWkV4cG9ydE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IG5hbWUgPSBcIkdlb21ldHJ5XCI7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IGdlb21ldHJ5LmdldFZlcnRpY2VzRGF0YShWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kKTtcclxuICAgIGNvbnN0IG5vcm1hbCA9IGdlb21ldHJ5LmdldFZlcnRpY2VzRGF0YShWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kKTtcclxuXHJcbiAgICBpZiAoIXBvc2l0aW9uIHx8ICFub3JtYWwpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGBcclxuXHRkZWYgTWVzaCBcIiR7bmFtZX1cIlxyXG5cdHtcclxuXHRcdGludFtdIGZhY2VWZXJ0ZXhDb3VudHMgPSBbJHtCdWlsZE1lc2hWZXJ0ZXhDb3VudChnZW9tZXRyeSl9XVxyXG5cdFx0aW50W10gZmFjZVZlcnRleEluZGljZXMgPSBbJHtCdWlsZE1lc2hWZXJ0ZXhJbmRpY2VzKGdlb21ldHJ5KX1dXHJcblx0XHRub3JtYWwzZltdIG5vcm1hbHMgPSBbJHtCdWlsZFZlY3RvcjNBcnJheShub3JtYWwsIG9wdGlvbnMpfV0gKFxyXG5cdFx0XHRpbnRlcnBvbGF0aW9uID0gXCJ2ZXJ0ZXhcIlxyXG5cdFx0KVxyXG5cdFx0cG9pbnQzZltdIHBvaW50cyA9IFske0J1aWxkVmVjdG9yM0FycmF5KHBvc2l0aW9uLCBvcHRpb25zKX1dXHJcbiAgICAgICAgJHtCdWlsZEFkZGl0aW9uYWxBdHRyaWJ1dGVzKGdlb21ldHJ5LCBvcHRpb25zKX1cclxuXHRcdHVuaWZvcm0gdG9rZW4gc3ViZGl2aXNpb25TY2hlbWUgPSBcIm5vbmVcIlxyXG5cdH1cclxuYDtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRNZXNoT2JqZWN0KGdlb21ldHJ5OiBHZW9tZXRyeSwgb3B0aW9uczogSVVTRFpFeHBvcnRPcHRpb25zKSB7XHJcbiAgICBjb25zdCBtZXNoID0gQnVpbGRNZXNoKGdlb21ldHJ5LCBvcHRpb25zKTtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgZGVmIFwiR2VvbWV0cnlcIlxyXG4gICAgICAgIHtcclxuICAgICAgICAke21lc2h9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkVVNERmlsZUFzU3RyaW5nKGRhdGFUb0luc2VydDogc3RyaW5nKSB7XHJcbiAgICBsZXQgb3V0cHV0ID0gQnVpbGRIZWFkZXIoKTtcclxuICAgIG91dHB1dCArPSBkYXRhVG9JbnNlcnQ7XHJcbiAgICByZXR1cm4gZmZsYXRlLnN0clRvVTgob3V0cHV0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRNYXRyaXgobWF0cml4OiBNYXRyaXgpIHtcclxuICAgIGNvbnN0IGFycmF5ID0gbWF0cml4Lm0gYXMgbnVtYmVyW107XHJcblxyXG4gICAgcmV0dXJuIGAoICR7QnVpbGRNYXRyaXhSb3coYXJyYXksIDApfSwgJHtCdWlsZE1hdHJpeFJvdyhhcnJheSwgNCl9LCAke0J1aWxkTWF0cml4Um93KGFycmF5LCA4KX0sICR7QnVpbGRNYXRyaXhSb3coYXJyYXksIDEyKX0gKWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkTWF0cml4Um93KGFycmF5OiBudW1iZXJbXSwgb2Zmc2V0OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBgKCR7YXJyYXlbb2Zmc2V0ICsgMF19LCAke2FycmF5W29mZnNldCArIDFdfSwgJHthcnJheVtvZmZzZXQgKyAyXX0sICR7YXJyYXlbb2Zmc2V0ICsgM119KWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkWGZvcm0obWVzaDogTWVzaCkge1xyXG4gICAgY29uc3QgbmFtZSA9IFwiT2JqZWN0X1wiICsgbWVzaC51bmlxdWVJZDtcclxuICAgIGNvbnN0IG1hdHJpeCA9IG1lc2guZ2V0V29ybGRNYXRyaXgoKS5jbG9uZSgpO1xyXG5cclxuICAgIGlmIChtYXRyaXguZGV0ZXJtaW5hbnQoKSA8IDApIHtcclxuICAgICAgICBtYXRyaXgubXVsdGlwbHlUb1JlZihNYXRyaXguU2NhbGluZygtMSwgMSwgMSksIG1hdHJpeCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBCdWlsZE1hdHJpeChtYXRyaXgpO1xyXG5cclxuICAgIHJldHVybiBgZGVmIFhmb3JtIFwiJHtuYW1lfVwiIChcclxuXHRwcmVwZW5kIHJlZmVyZW5jZXMgPSBALi9nZW9tZXRyaWVzL0dlb21ldHJ5XyR7bWVzaC5nZW9tZXRyeSEudW5pcXVlSWR9LnVzZGFAPC9HZW9tZXRyeT5cclxuXHRwcmVwZW5kIGFwaVNjaGVtYXMgPSBbXCJNYXRlcmlhbEJpbmRpbmdBUElcIl1cclxuKVxyXG57XHJcblx0bWF0cml4NGQgeGZvcm1PcDp0cmFuc2Zvcm0gPSAke3RyYW5zZm9ybX1cclxuXHR1bmlmb3JtIHRva2VuW10geGZvcm1PcE9yZGVyID0gW1wieGZvcm1PcDp0cmFuc2Zvcm1cIl1cdFxyXG5cclxuICAgIHJlbCBtYXRlcmlhbDpiaW5kaW5nID0gPC9NYXRlcmlhbHMvTWF0ZXJpYWxfJHttZXNoLm1hdGVyaWFsIS51bmlxdWVJZH0+XHJcbn1cclxuXHJcbmA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkTWF0ZXJpYWxzKG1hdGVyaWFsczogeyBba2V5OiBzdHJpbmddOiBNYXRlcmlhbCB9LCB0ZXh0dXJlVG9FeHBvcnRzOiB7IFtrZXk6IHN0cmluZ106IEJhc2VUZXh0dXJlIH0sIG9wdGlvbnM6IElVU0RaRXhwb3J0T3B0aW9ucykge1xyXG4gICAgY29uc3QgYXJyYXkgPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHV1aWQgaW4gbWF0ZXJpYWxzKSB7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBtYXRlcmlhbHNbdXVpZF07XHJcblxyXG4gICAgICAgIGFycmF5LnB1c2goQnVpbGRNYXRlcmlhbChtYXRlcmlhbCwgdGV4dHVyZVRvRXhwb3J0cywgb3B0aW9ucykpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBgXHJcbiAgICBkZWYgXCJNYXRlcmlhbHNcIlxyXG57XHJcbiR7YXJyYXkuam9pbihcIlwiKX1cclxufVxyXG5cclxuYDtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRXcmFwcGluZyh3cmFwcGluZzogbnVtYmVyKSB7XHJcbiAgICBzd2l0Y2ggKHdyYXBwaW5nKSB7XHJcbiAgICAgICAgY2FzZSBDb25zdGFudHMuVEVYVFVSRV9DTEFNUF9BRERSRVNTTU9ERTpcclxuICAgICAgICAgICAgcmV0dXJuIFwiY2xhbXBcIjtcclxuICAgICAgICBjYXNlIENvbnN0YW50cy5URVhUVVJFX01JUlJPUl9BRERSRVNTTU9ERTpcclxuICAgICAgICAgICAgcmV0dXJuIFwibWlycm9yXCI7XHJcbiAgICAgICAgY2FzZSBDb25zdGFudHMuVEVYVFVSRV9XUkFQX0FERFJFU1NNT0RFOlxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcInJlcGVhdFwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZENvbG9yNChjb2xvcjogQ29sb3IzKSB7XHJcbiAgICByZXR1cm4gYCgke2NvbG9yLnJ9LCAke2NvbG9yLmd9LCAke2NvbG9yLmJ9LCAxLjApYDtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRWZWN0b3IyKHZlY3RvcjogVmVjdG9yMikge1xyXG4gICAgcmV0dXJuIGAoJHt2ZWN0b3IueH0sICR7dmVjdG9yLnl9KWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkQ29sb3IoY29sb3I6IENvbG9yMykge1xyXG4gICAgcmV0dXJuIGAoJHtjb2xvci5yfSwgJHtjb2xvci5nfSwgJHtjb2xvci5ifSlgO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZFRleHR1cmUoXHJcbiAgICB0ZXh0dXJlOiBUZXh0dXJlLFxyXG4gICAgbWF0ZXJpYWw6IE1hdGVyaWFsLFxyXG4gICAgbWFwVHlwZTogc3RyaW5nLFxyXG4gICAgY29sb3I6IE51bGxhYmxlPENvbG9yMz4sXHJcbiAgICB0ZXh0dXJlVG9FeHBvcnRzOiB7IFtrZXk6IHN0cmluZ106IEJhc2VUZXh0dXJlIH0sXHJcbiAgICBvcHRpb25zOiBJVVNEWkV4cG9ydE9wdGlvbnNcclxuKSB7XHJcbiAgICBjb25zdCBpZCA9IHRleHR1cmUuZ2V0SW50ZXJuYWxUZXh0dXJlKCkhLnVuaXF1ZUlkICsgXCJfXCIgKyB0ZXh0dXJlLmludmVydFk7XHJcblxyXG4gICAgdGV4dHVyZVRvRXhwb3J0c1tpZF0gPSB0ZXh0dXJlO1xyXG5cclxuICAgIGNvbnN0IHV2ID0gdGV4dHVyZS5jb29yZGluYXRlc0luZGV4ID4gMCA/IFwic3RcIiArIHRleHR1cmUuY29vcmRpbmF0ZXNJbmRleCA6IFwic3RcIjtcclxuICAgIGNvbnN0IHJlcGVhdCA9IG5ldyBWZWN0b3IyKHRleHR1cmUudVNjYWxlLCB0ZXh0dXJlLnZTY2FsZSk7XHJcbiAgICBjb25zdCBvZmZzZXQgPSBuZXcgVmVjdG9yMih0ZXh0dXJlLnVPZmZzZXQsIHRleHR1cmUudk9mZnNldCk7XHJcbiAgICBjb25zdCByb3RhdGlvbiA9IHRleHR1cmUud0FuZztcclxuXHJcbiAgICAvLyByb3RhdGlvbiBpcyBhcm91bmQgdGhlIHdyb25nIHBvaW50LiBhZnRlciByb3RhdGlvbiB3ZSBuZWVkIHRvIHNoaWZ0IG9mZnNldCBhZ2FpbiBzbyB0aGF0IHdlJ3JlIHJvdGF0aW5nIGFyb3VuZCB0aGUgcmlnaHQgc3BvdFxyXG4gICAgY29uc3QgeFJvdGF0aW9uT2Zmc2V0ID0gTWF0aC5zaW4ocm90YXRpb24pO1xyXG4gICAgY29uc3QgeVJvdGF0aW9uT2Zmc2V0ID0gTWF0aC5jb3Mocm90YXRpb24pO1xyXG5cclxuICAgIC8vIHRleHR1cmUgY29vcmRpbmF0ZXMgc3RhcnQgaW4gdGhlIG9wcG9zaXRlIGNvcm5lciwgbmVlZCB0byBjb3JyZWN0XHJcbiAgICBvZmZzZXQueSA9IDEgLSBvZmZzZXQueSAtIHJlcGVhdC55O1xyXG5cclxuICAgIG9mZnNldC54ICs9IHhSb3RhdGlvbk9mZnNldCAqIHJlcGVhdC54O1xyXG4gICAgb2Zmc2V0LnkgKz0gKDEgLSB5Um90YXRpb25PZmZzZXQpICogcmVwZWF0Lnk7XHJcblxyXG4gICAgcmV0dXJuIGBcclxuICAgIGRlZiBTaGFkZXIgXCJQcmltdmFyUmVhZGVyXyR7bWFwVHlwZX1cIlxyXG4gICAge1xyXG4gICAgICAgIHVuaWZvcm0gdG9rZW4gaW5mbzppZCA9IFwiVXNkUHJpbXZhclJlYWRlcl9mbG9hdDJcIlxyXG4gICAgICAgIGZsb2F0MiBpbnB1dHM6ZmFsbGJhY2sgPSAoMC4wLCAwLjApXHJcbiAgICAgICAgdG9rZW4gaW5wdXRzOnZhcm5hbWUgPSBcIiR7dXZ9XCJcclxuICAgICAgICBmbG9hdDIgb3V0cHV0czpyZXN1bHRcclxuICAgIH1cclxuXHJcbiAgICBkZWYgU2hhZGVyIFwiVHJhbnNmb3JtMmRfJHttYXBUeXBlfVwiXHJcbiAgICB7XHJcbiAgICAgICAgdW5pZm9ybSB0b2tlbiBpbmZvOmlkID0gXCJVc2RUcmFuc2Zvcm0yZFwiXHJcbiAgICAgICAgdG9rZW4gaW5wdXRzOmluLmNvbm5lY3QgPSA8L01hdGVyaWFscy9NYXRlcmlhbF8ke21hdGVyaWFsLnVuaXF1ZUlkfS9QcmltdmFyUmVhZGVyXyR7bWFwVHlwZX0ub3V0cHV0czpyZXN1bHQ+XHJcbiAgICAgICAgZmxvYXQgaW5wdXRzOnJvdGF0aW9uID0gJHsocm90YXRpb24gKiAoMTgwIC8gTWF0aC5QSSkpLnRvRml4ZWQob3B0aW9ucy5wcmVjaXNpb24pfVxyXG4gICAgICAgIGZsb2F0MiBpbnB1dHM6c2NhbGUgPSAke0J1aWxkVmVjdG9yMihyZXBlYXQpfVxyXG4gICAgICAgIGZsb2F0MiBpbnB1dHM6dHJhbnNsYXRpb24gPSAke0J1aWxkVmVjdG9yMihvZmZzZXQpfVxyXG4gICAgICAgIGZsb2F0MiBvdXRwdXRzOnJlc3VsdFxyXG4gICAgfVxyXG5cclxuICAgIGRlZiBTaGFkZXIgXCJUZXh0dXJlXyR7dGV4dHVyZS51bmlxdWVJZH1fJHttYXBUeXBlfVwiXHJcbiAgICB7XHJcbiAgICAgICAgdW5pZm9ybSB0b2tlbiBpbmZvOmlkID0gXCJVc2RVVlRleHR1cmVcIlxyXG4gICAgICAgIGFzc2V0IGlucHV0czpmaWxlID0gQHRleHR1cmVzL1RleHR1cmVfJHtpZH0ucG5nQFxyXG4gICAgICAgIGZsb2F0MiBpbnB1dHM6c3QuY29ubmVjdCA9IDwvTWF0ZXJpYWxzL01hdGVyaWFsXyR7bWF0ZXJpYWwudW5pcXVlSWR9L1RyYW5zZm9ybTJkXyR7bWFwVHlwZX0ub3V0cHV0czpyZXN1bHQ+XHJcbiAgICAgICAgJHtjb2xvciA/IFwiZmxvYXQ0IGlucHV0czpzY2FsZSA9IFwiICsgQnVpbGRDb2xvcjQoY29sb3IpIDogXCJcIn1cclxuICAgICAgICB0b2tlbiBpbnB1dHM6c291cmNlQ29sb3JTcGFjZSA9IFwiJHt0ZXh0dXJlLmdhbW1hU3BhY2UgPyBcInJhd1wiIDogXCJzUkdCXCJ9XCJcclxuICAgICAgICB0b2tlbiBpbnB1dHM6d3JhcFMgPSBcIiR7QnVpbGRXcmFwcGluZyh0ZXh0dXJlLndyYXBVKX1cIlxyXG4gICAgICAgIHRva2VuIGlucHV0czp3cmFwVCA9IFwiJHtCdWlsZFdyYXBwaW5nKHRleHR1cmUud3JhcFYpfVwiXHJcbiAgICAgICAgZmxvYXQgb3V0cHV0czpyXHJcbiAgICAgICAgZmxvYXQgb3V0cHV0czpnXHJcbiAgICAgICAgZmxvYXQgb3V0cHV0czpiXHJcbiAgICAgICAgZmxvYXQzIG91dHB1dHM6cmdiXHJcbiAgICAgICAgJHttYXRlcmlhbC5uZWVkQWxwaGFCbGVuZGluZygpID8gXCJmbG9hdCBvdXRwdXRzOmFcIiA6IFwiXCJ9XHJcbiAgICB9YDtcclxufVxyXG5cclxuZnVuY3Rpb24gRXh0cmFjdFRleHR1cmVJbmZvcm1hdGlvbnMobWF0ZXJpYWw6IE1hdGVyaWFsKSB7XHJcbiAgICBjb25zdCBjbGFzc05hbWUgPSBtYXRlcmlhbC5nZXRDbGFzc05hbWUoKTtcclxuXHJcbiAgICBzd2l0Y2ggKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIGNhc2UgXCJTdGFuZGFyZE1hdGVyaWFsXCI6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkaWZmdXNlTWFwOiAobWF0ZXJpYWwgYXMgU3RhbmRhcmRNYXRlcmlhbCkuZGlmZnVzZVRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBkaWZmdXNlOiAobWF0ZXJpYWwgYXMgU3RhbmRhcmRNYXRlcmlhbCkuZGlmZnVzZUNvbG9yLFxyXG4gICAgICAgICAgICAgICAgYWxwaGFDdXRPZmY6IChtYXRlcmlhbCBhcyBTdGFuZGFyZE1hdGVyaWFsKS5hbHBoYUN1dE9mZixcclxuICAgICAgICAgICAgICAgIGVtaXNzaXZlTWFwOiAobWF0ZXJpYWwgYXMgU3RhbmRhcmRNYXRlcmlhbCkuZW1pc3NpdmVUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgZW1pc3NpdmU6IChtYXRlcmlhbCBhcyBTdGFuZGFyZE1hdGVyaWFsKS5lbWlzc2l2ZUNvbG9yLFxyXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzTWFwOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsTWFwOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbWV0YWxuZXNzTWFwOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzOiAxLFxyXG4gICAgICAgICAgICAgICAgbWV0YWxuZXNzOiAwLFxyXG4gICAgICAgICAgICAgICAgYW9NYXA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBhb01hcEludGVuc2l0eTogMCxcclxuICAgICAgICAgICAgICAgIGFscGhhTWFwOiAobWF0ZXJpYWwgYXMgU3RhbmRhcmRNYXRlcmlhbCkub3BhY2l0eVRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBpb3I6IDEsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgY2FzZSBcIlBCUk1hdGVyaWFsXCI6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkaWZmdXNlTWFwOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLmFsYmVkb1RleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBkaWZmdXNlOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLmFsYmVkb0NvbG9yLFxyXG4gICAgICAgICAgICAgICAgYWxwaGFDdXRPZmY6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkuYWxwaGFDdXRPZmYsXHJcbiAgICAgICAgICAgICAgICBlbWlzc2l2ZU1hcDogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5lbWlzc2l2ZVRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBlbWlzc2l2ZTogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5lbWlzc2l2ZUNvbG9yLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsTWFwOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLmJ1bXBUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzTWFwOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLm1ldGFsbGljVGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIHJvdWdobmVzc0NoYW5uZWw6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkudXNlUm91Z2huZXNzRnJvbU1ldGFsbGljVGV4dHVyZUFscGhhID8gXCJhXCIgOiBcImdcIixcclxuICAgICAgICAgICAgICAgIHJvdWdobmVzczogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5yb3VnaG5lc3MgfHwgMSxcclxuICAgICAgICAgICAgICAgIG1ldGFsbmVzc01hcDogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5tZXRhbGxpY1RleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBtZXRhbG5lc3NDaGFubmVsOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLnVzZU1ldGFsbG5lc3NGcm9tTWV0YWxsaWNUZXh0dXJlQmx1ZSA/IFwiYlwiIDogXCJyXCIsXHJcbiAgICAgICAgICAgICAgICBtZXRhbG5lc3M6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkubWV0YWxsaWMgfHwgMCxcclxuICAgICAgICAgICAgICAgIGFvTWFwOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLmFtYmllbnRUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgYW9NYXBDaGFubmVsOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLnVzZUFtYmllbnRJbkdyYXlTY2FsZSA/IFwiclwiIDogXCJyZ2JcIixcclxuICAgICAgICAgICAgICAgIGFvTWFwSW50ZW5zaXR5OiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLmFtYmllbnRUZXh0dXJlU3RyZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhbHBoYU1hcDogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5vcGFjaXR5VGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIGlvcjogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5pbmRleE9mUmVmcmFjdGlvbixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICBjYXNlIFwiUEJSTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbFwiOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZGlmZnVzZU1hcDogKG1hdGVyaWFsIGFzIFBCUk1ldGFsbGljUm91Z2huZXNzTWF0ZXJpYWwpLmJhc2VUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgZGlmZnVzZTogKG1hdGVyaWFsIGFzIFBCUk1ldGFsbGljUm91Z2huZXNzTWF0ZXJpYWwpLmJhc2VDb2xvcixcclxuICAgICAgICAgICAgICAgIGFscGhhQ3V0T2ZmOiAobWF0ZXJpYWwgYXMgUEJSTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbCkuYWxwaGFDdXRPZmYsXHJcbiAgICAgICAgICAgICAgICBlbWlzc2l2ZU1hcDogKG1hdGVyaWFsIGFzIFBCUk1ldGFsbGljUm91Z2huZXNzTWF0ZXJpYWwpLmVtaXNzaXZlVGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIGVtaXNzaXZlOiAobWF0ZXJpYWwgYXMgUEJSTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbCkuZW1pc3NpdmVDb2xvcixcclxuICAgICAgICAgICAgICAgIG5vcm1hbE1hcDogKG1hdGVyaWFsIGFzIFBCUk1ldGFsbGljUm91Z2huZXNzTWF0ZXJpYWwpLm5vcm1hbFRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICByb3VnaG5lc3NNYXA6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkubWV0YWxsaWNUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzQ2hhbm5lbDogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS51c2VSb3VnaG5lc3NGcm9tTWV0YWxsaWNUZXh0dXJlQWxwaGEgPyBcImFcIiA6IFwiZ1wiLFxyXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzOiAobWF0ZXJpYWwgYXMgUEJSTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbCkucm91Z2huZXNzIHx8IDEsXHJcbiAgICAgICAgICAgICAgICBtZXRhbG5lc3NNYXA6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkubWV0YWxsaWNUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgbWV0YWxuZXNzQ2hhbm5lbDogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS51c2VNZXRhbGxuZXNzRnJvbU1ldGFsbGljVGV4dHVyZUJsdWUgPyBcImJcIiA6IFwiclwiLFxyXG4gICAgICAgICAgICAgICAgbWV0YWxuZXNzOiAobWF0ZXJpYWwgYXMgUEJSTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbCkubWV0YWxsaWMgfHwgMCxcclxuICAgICAgICAgICAgICAgIGFvTWFwOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLmFtYmllbnRUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgYW9NYXBDaGFubmVsOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLnVzZUFtYmllbnRJbkdyYXlTY2FsZSA/IFwiclwiIDogXCJyZ2JcIixcclxuICAgICAgICAgICAgICAgIGFvTWFwSW50ZW5zaXR5OiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLmFtYmllbnRUZXh0dXJlU3RyZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhbHBoYU1hcDogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5vcGFjaXR5VGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIGlvcjogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5pbmRleE9mUmVmcmFjdGlvbixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZGlmZnVzZU1hcDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGRpZmZ1c2U6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBlbWlzc2l2ZU1hcDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGVtaXNzZW1pc3NpdmVpdmVDb2xvcjogbnVsbCxcclxuICAgICAgICAgICAgICAgIG5vcm1hbE1hcDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHJvdWdobmVzc01hcDogbnVsbCxcclxuICAgICAgICAgICAgICAgIG1ldGFsbmVzc01hcDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGFscGhhQ3V0T2ZmOiAwLFxyXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzOiAwLFxyXG4gICAgICAgICAgICAgICAgbWV0YWxuZXNzOiAwLFxyXG4gICAgICAgICAgICAgICAgYW9NYXA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBhb01hcEludGVuc2l0eTogMCxcclxuICAgICAgICAgICAgICAgIGFscGhhTWFwOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgaW9yOiAxLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZE1hdGVyaWFsKG1hdGVyaWFsOiBNYXRlcmlhbCwgdGV4dHVyZVRvRXhwb3J0czogeyBba2V5OiBzdHJpbmddOiBCYXNlVGV4dHVyZSB9LCBvcHRpb25zOiBJVVNEWkV4cG9ydE9wdGlvbnMpIHtcclxuICAgIC8vIGh0dHBzOi8vZ3JhcGhpY3MucGl4YXIuY29tL3VzZC9kb2NzL1VzZFByZXZpZXdTdXJmYWNlLVByb3Bvc2FsLmh0bWxcclxuXHJcbiAgICBjb25zdCBwYWQgPSBcIlx0XHRcdFwiO1xyXG4gICAgY29uc3QgaW5wdXRzID0gW107XHJcbiAgICBjb25zdCBzYW1wbGVycyA9IFtdO1xyXG5cclxuICAgIGNvbnN0IHtcclxuICAgICAgICBkaWZmdXNlTWFwLFxyXG4gICAgICAgIGRpZmZ1c2UsXHJcbiAgICAgICAgYWxwaGFDdXRPZmYsXHJcbiAgICAgICAgZW1pc3NpdmVNYXAsXHJcbiAgICAgICAgZW1pc3NpdmUsXHJcbiAgICAgICAgbm9ybWFsTWFwLFxyXG4gICAgICAgIHJvdWdobmVzc01hcCxcclxuICAgICAgICByb3VnaG5lc3NDaGFubmVsLFxyXG4gICAgICAgIHJvdWdobmVzcyxcclxuICAgICAgICBtZXRhbG5lc3NNYXAsXHJcbiAgICAgICAgbWV0YWxuZXNzQ2hhbm5lbCxcclxuICAgICAgICBtZXRhbG5lc3MsXHJcbiAgICAgICAgYW9NYXAsXHJcbiAgICAgICAgYW9NYXBDaGFubmVsLFxyXG4gICAgICAgIGFvTWFwSW50ZW5zaXR5LFxyXG4gICAgICAgIGFscGhhTWFwLFxyXG4gICAgICAgIGlvcixcclxuICAgIH0gPSBFeHRyYWN0VGV4dHVyZUluZm9ybWF0aW9ucyhtYXRlcmlhbCk7XHJcblxyXG4gICAgaWYgKGRpZmZ1c2VNYXAgIT09IG51bGwpIHtcclxuICAgICAgICBpbnB1dHMucHVzaChgJHtwYWR9Y29sb3IzZiBpbnB1dHM6ZGlmZnVzZUNvbG9yLmNvbm5lY3QgPSA8L01hdGVyaWFscy9NYXRlcmlhbF8ke21hdGVyaWFsLnVuaXF1ZUlkfS9UZXh0dXJlXyR7ZGlmZnVzZU1hcC51bmlxdWVJZH1fZGlmZnVzZS5vdXRwdXRzOnJnYj5gKTtcclxuXHJcbiAgICAgICAgaWYgKG1hdGVyaWFsLm5lZWRBbHBoYUJsZW5kaW5nKCkpIHtcclxuICAgICAgICAgICAgaW5wdXRzLnB1c2goYCR7cGFkfWZsb2F0IGlucHV0czpvcGFjaXR5LmNvbm5lY3QgPSA8L01hdGVyaWFscy9NYXRlcmlhbF8ke21hdGVyaWFsLnVuaXF1ZUlkfS9UZXh0dXJlXyR7ZGlmZnVzZU1hcC51bmlxdWVJZH1fZGlmZnVzZS5vdXRwdXRzOmE+YCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbC5uZWVkQWxwaGFUZXN0aW5nKCkpIHtcclxuICAgICAgICAgICAgaW5wdXRzLnB1c2goYCR7cGFkfWZsb2F0IGlucHV0czpvcGFjaXR5LmNvbm5lY3QgPSA8L01hdGVyaWFscy9NYXRlcmlhbF8ke21hdGVyaWFsLnVuaXF1ZUlkfS9UZXh0dXJlXyR7ZGlmZnVzZU1hcC51bmlxdWVJZH1fZGlmZnVzZS5vdXRwdXRzOmE+YCk7XHJcbiAgICAgICAgICAgIGlucHV0cy5wdXNoKGAke3BhZH1mbG9hdCBpbnB1dHM6b3BhY2l0eVRocmVzaG9sZCA9ICR7YWxwaGFDdXRPZmZ9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzYW1wbGVycy5wdXNoKEJ1aWxkVGV4dHVyZShkaWZmdXNlTWFwIGFzIFRleHR1cmUsIG1hdGVyaWFsLCBcImRpZmZ1c2VcIiwgZGlmZnVzZSwgdGV4dHVyZVRvRXhwb3J0cywgb3B0aW9ucykpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbnB1dHMucHVzaChgJHtwYWR9Y29sb3IzZiBpbnB1dHM6ZGlmZnVzZUNvbG9yID0gJHtCdWlsZENvbG9yKGRpZmZ1c2UgfHwgQ29sb3IzLldoaXRlKCkpfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbWlzc2l2ZU1hcCAhPT0gbnVsbCkge1xyXG4gICAgICAgIGlucHV0cy5wdXNoKGAke3BhZH1jb2xvcjNmIGlucHV0czplbWlzc2l2ZUNvbG9yLmNvbm5lY3QgPSA8L01hdGVyaWFscy9NYXRlcmlhbF8ke21hdGVyaWFsLnVuaXF1ZUlkfS9UZXh0dXJlXyR7ZW1pc3NpdmVNYXAudW5pcXVlSWR9X2VtaXNzaXZlLm91dHB1dHM6cmdiPmApO1xyXG5cclxuICAgICAgICBzYW1wbGVycy5wdXNoKEJ1aWxkVGV4dHVyZShlbWlzc2l2ZU1hcCBhcyBUZXh0dXJlLCBtYXRlcmlhbCwgXCJlbWlzc2l2ZVwiLCBlbWlzc2l2ZSwgdGV4dHVyZVRvRXhwb3J0cywgb3B0aW9ucykpO1xyXG4gICAgfSBlbHNlIGlmIChlbWlzc2l2ZSAmJiBlbWlzc2l2ZS50b0x1bWluYW5jZSgpID4gMCkge1xyXG4gICAgICAgIGlucHV0cy5wdXNoKGAke3BhZH1jb2xvcjNmIGlucHV0czplbWlzc2l2ZUNvbG9yID0gJHtCdWlsZENvbG9yKGVtaXNzaXZlKX1gKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobm9ybWFsTWFwICE9PSBudWxsKSB7XHJcbiAgICAgICAgaW5wdXRzLnB1c2goYCR7cGFkfW5vcm1hbDNmIGlucHV0czpub3JtYWwuY29ubmVjdCA9IDwvTWF0ZXJpYWxzL01hdGVyaWFsXyR7bWF0ZXJpYWwudW5pcXVlSWR9L1RleHR1cmVfJHtub3JtYWxNYXAudW5pcXVlSWR9X25vcm1hbC5vdXRwdXRzOnJnYj5gKTtcclxuXHJcbiAgICAgICAgc2FtcGxlcnMucHVzaChCdWlsZFRleHR1cmUobm9ybWFsTWFwIGFzIFRleHR1cmUsIG1hdGVyaWFsLCBcIm5vcm1hbFwiLCBudWxsLCB0ZXh0dXJlVG9FeHBvcnRzLCBvcHRpb25zKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFvTWFwICE9PSBudWxsKSB7XHJcbiAgICAgICAgaW5wdXRzLnB1c2goYCR7cGFkfWZsb2F0IGlucHV0czpvY2NsdXNpb24uY29ubmVjdCA9IDwvTWF0ZXJpYWxzL01hdGVyaWFsXyR7bWF0ZXJpYWwudW5pcXVlSWR9L1RleHR1cmVfJHthb01hcC51bmlxdWVJZH1fb2NjbHVzaW9uLm91dHB1dHM6JHthb01hcENoYW5uZWx9PmApO1xyXG5cclxuICAgICAgICBzYW1wbGVycy5wdXNoKEJ1aWxkVGV4dHVyZShhb01hcCBhcyBUZXh0dXJlLCBtYXRlcmlhbCwgXCJvY2NsdXNpb25cIiwgbmV3IENvbG9yMyhhb01hcEludGVuc2l0eSwgYW9NYXBJbnRlbnNpdHksIGFvTWFwSW50ZW5zaXR5KSwgdGV4dHVyZVRvRXhwb3J0cywgb3B0aW9ucykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyb3VnaG5lc3NNYXAgIT09IG51bGwpIHtcclxuICAgICAgICBpbnB1dHMucHVzaChgJHtwYWR9ZmxvYXQgaW5wdXRzOnJvdWdobmVzcy5jb25uZWN0ID0gPC9NYXRlcmlhbHMvTWF0ZXJpYWxfJHttYXRlcmlhbC51bmlxdWVJZH0vVGV4dHVyZV8ke3JvdWdobmVzc01hcC51bmlxdWVJZH1fcm91Z2huZXNzLm91dHB1dHM6JHtyb3VnaG5lc3NDaGFubmVsfT5gKTtcclxuXHJcbiAgICAgICAgc2FtcGxlcnMucHVzaChCdWlsZFRleHR1cmUocm91Z2huZXNzTWFwIGFzIFRleHR1cmUsIG1hdGVyaWFsLCBcInJvdWdobmVzc1wiLCBuZXcgQ29sb3IzKHJvdWdobmVzcywgcm91Z2huZXNzLCByb3VnaG5lc3MpLCB0ZXh0dXJlVG9FeHBvcnRzLCBvcHRpb25zKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlucHV0cy5wdXNoKGAke3BhZH1mbG9hdCBpbnB1dHM6cm91Z2huZXNzID0gJHtyb3VnaG5lc3N9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1ldGFsbmVzc01hcCAhPT0gbnVsbCkge1xyXG4gICAgICAgIGlucHV0cy5wdXNoKGAke3BhZH1mbG9hdCBpbnB1dHM6bWV0YWxsaWMuY29ubmVjdCA9IDwvTWF0ZXJpYWxzL01hdGVyaWFsXyR7bWF0ZXJpYWwudW5pcXVlSWR9L1RleHR1cmVfJHttZXRhbG5lc3NNYXAudW5pcXVlSWR9X21ldGFsbGljLm91dHB1dHM6JHttZXRhbG5lc3NDaGFubmVsfT5gKTtcclxuXHJcbiAgICAgICAgc2FtcGxlcnMucHVzaChCdWlsZFRleHR1cmUobWV0YWxuZXNzTWFwIGFzIFRleHR1cmUsIG1hdGVyaWFsLCBcIm1ldGFsbGljXCIsIG5ldyBDb2xvcjMobWV0YWxuZXNzLCBtZXRhbG5lc3MsIG1ldGFsbmVzcyksIHRleHR1cmVUb0V4cG9ydHMsIG9wdGlvbnMpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5wdXRzLnB1c2goYCR7cGFkfWZsb2F0IGlucHV0czptZXRhbGxpYyA9ICR7bWV0YWxuZXNzfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhbHBoYU1hcCAhPT0gbnVsbCkge1xyXG4gICAgICAgIGlucHV0cy5wdXNoKGAke3BhZH1mbG9hdCBpbnB1dHM6b3BhY2l0eS5jb25uZWN0ID0gPC9NYXRlcmlhbHMvTWF0ZXJpYWxfJHttYXRlcmlhbC51bmlxdWVJZH0vVGV4dHVyZV8ke2FscGhhTWFwLnVuaXF1ZUlkfV9vcGFjaXR5Lm91dHB1dHM6cj5gKTtcclxuICAgICAgICBpbnB1dHMucHVzaChgJHtwYWR9ZmxvYXQgaW5wdXRzOm9wYWNpdHlUaHJlc2hvbGQgPSAwLjAwMDFgKTtcclxuXHJcbiAgICAgICAgc2FtcGxlcnMucHVzaChCdWlsZFRleHR1cmUoYWxwaGFNYXAgYXMgVGV4dHVyZSwgbWF0ZXJpYWwsIFwib3BhY2l0eVwiLCBudWxsLCB0ZXh0dXJlVG9FeHBvcnRzLCBvcHRpb25zKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlucHV0cy5wdXNoKGAke3BhZH1mbG9hdCBpbnB1dHM6b3BhY2l0eSA9ICR7bWF0ZXJpYWwuYWxwaGF9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRzLnB1c2goYCR7cGFkfWZsb2F0IGlucHV0czppb3IgPSAke2lvcn1gKTtcclxuXHJcbiAgICByZXR1cm4gYFxyXG5cdGRlZiBNYXRlcmlhbCBcIk1hdGVyaWFsXyR7bWF0ZXJpYWwudW5pcXVlSWR9XCJcclxuXHR7XHJcblx0XHRkZWYgU2hhZGVyIFwiUHJldmlld1N1cmZhY2VcIlxyXG5cdFx0e1xyXG5cdFx0XHR1bmlmb3JtIHRva2VuIGluZm86aWQgPSBcIlVzZFByZXZpZXdTdXJmYWNlXCJcclxuJHtpbnB1dHMuam9pbihcIlxcblwiKX1cclxuXHRcdFx0aW50IGlucHV0czp1c2VTcGVjdWxhcldvcmtmbG93ID0gMFxyXG5cdFx0XHR0b2tlbiBvdXRwdXRzOnN1cmZhY2VcclxuXHRcdH1cclxuXHJcblx0XHR0b2tlbiBvdXRwdXRzOnN1cmZhY2UuY29ubmVjdCA9IDwvTWF0ZXJpYWxzL01hdGVyaWFsXyR7bWF0ZXJpYWwudW5pcXVlSWR9L1ByZXZpZXdTdXJmYWNlLm91dHB1dHM6c3VyZmFjZT5cclxuXHJcbiR7c2FtcGxlcnMuam9pbihcIlxcblwiKX1cclxuXHJcblx0fVxyXG5gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZENhbWVyYShjYW1lcmE6IENhbWVyYSwgb3B0aW9uczogSVVTRFpFeHBvcnRPcHRpb25zKSB7XHJcbiAgICBjb25zdCBuYW1lID0gXCJDYW1lcmFfXCIgKyBjYW1lcmEudW5pcXVlSWQ7XHJcbiAgICBjb25zdCBtYXRyaXggPSBNYXRyaXguUm90YXRpb25ZKE1hdGguUEkpLm11bHRpcGx5KGNhbWVyYS5nZXRXb3JsZE1hdHJpeCgpKTsgLy8gd29yayB0b3dhcmRzIHBvc2l0aXZlIHpcclxuXHJcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBCdWlsZE1hdHJpeChtYXRyaXgpO1xyXG5cclxuICAgIGlmIChjYW1lcmEubW9kZSA9PT0gQ29uc3RhbnRzLk9SVEhPR1JBUEhJQ19DQU1FUkEpIHtcclxuICAgICAgICByZXR1cm4gYGRlZiBDYW1lcmEgXCIke25hbWV9XCJcclxuXHRcdHtcclxuXHRcdFx0bWF0cml4NGQgeGZvcm1PcDp0cmFuc2Zvcm0gPSAke3RyYW5zZm9ybX1cclxuXHRcdFx0dW5pZm9ybSB0b2tlbltdIHhmb3JtT3BPcmRlciA9IFtcInhmb3JtT3A6dHJhbnNmb3JtXCJdXHJcblxyXG5cdFx0XHRmbG9hdDIgY2xpcHBpbmdSYW5nZSA9ICgke2NhbWVyYS5taW5aLnRvUHJlY2lzaW9uKG9wdGlvbnMucHJlY2lzaW9uKX0sICR7Y2FtZXJhLm1heFoudG9QcmVjaXNpb24ob3B0aW9ucy5wcmVjaXNpb24pfSlcclxuXHRcdFx0ZmxvYXQgaG9yaXpvbnRhbEFwZXJ0dXJlID0gJHsoKE1hdGguYWJzKGNhbWVyYS5vcnRob0xlZnQgfHwgMSkgKyBNYXRoLmFicyhjYW1lcmEub3J0aG9SaWdodCB8fCAxKSkgKiAxMCkudG9QcmVjaXNpb24ob3B0aW9ucy5wcmVjaXNpb24pfVxyXG5cdFx0XHRmbG9hdCB2ZXJ0aWNhbEFwZXJ0dXJlID0gJHsoKE1hdGguYWJzKGNhbWVyYS5vcnRob1RvcCB8fCAxKSArIE1hdGguYWJzKGNhbWVyYS5vcnRob0JvdHRvbSB8fCAxKSkgKiAxMCkudG9QcmVjaXNpb24ob3B0aW9ucy5wcmVjaXNpb24pfVxyXG5cdFx0XHR0b2tlbiBwcm9qZWN0aW9uID0gXCJvcnRob2dyYXBoaWNcIlxyXG5cdFx0fVxyXG5cdFxyXG5cdGA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGFzcGVjdCA9IGNhbWVyYS5nZXRFbmdpbmUoKS5nZXRBc3BlY3RSYXRpbyhjYW1lcmEpO1xyXG4gICAgICAgIGNvbnN0IHNlbnNvcndpZHRoID0gb3B0aW9ucy5jYW1lcmFTZW5zb3JXaWR0aCB8fCAzNTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBkZWYgQ2FtZXJhIFwiJHtuYW1lfVwiXHJcblx0XHR7XHJcblx0XHRcdG1hdHJpeDRkIHhmb3JtT3A6dHJhbnNmb3JtID0gJHt0cmFuc2Zvcm19XHJcblx0XHRcdHVuaWZvcm0gdG9rZW5bXSB4Zm9ybU9wT3JkZXIgPSBbXCJ4Zm9ybU9wOnRyYW5zZm9ybVwiXVxyXG5cclxuXHRcdFx0ZmxvYXQyIGNsaXBwaW5nUmFuZ2UgPSAoJHtjYW1lcmEubWluWi50b1ByZWNpc2lvbihvcHRpb25zLnByZWNpc2lvbil9LCAke2NhbWVyYS5tYXhaLnRvUHJlY2lzaW9uKG9wdGlvbnMucHJlY2lzaW9uKX0pXHJcblx0XHRcdGZsb2F0IGZvY2FsTGVuZ3RoID0gJHsoc2Vuc29yd2lkdGggLyAoMiAqIE1hdGgudGFuKGNhbWVyYS5mb3YgKiAwLjUpKSkudG9QcmVjaXNpb24ob3B0aW9ucy5wcmVjaXNpb24pfVxyXG4gICAgICAgICAgICB0b2tlbiBwcm9qZWN0aW9uID0gXCJwZXJzcGVjdGl2ZVwiXHJcblx0XHRcdGZsb2F0IGhvcml6b250YWxBcGVydHVyZSA9ICR7KHNlbnNvcndpZHRoICogYXNwZWN0KS50b1ByZWNpc2lvbihvcHRpb25zLnByZWNpc2lvbil9XHJcblx0XHRcdGZsb2F0IHZlcnRpY2FsQXBlcnR1cmUgPSAkeyhzZW5zb3J3aWR0aCAvIGFzcGVjdCkudG9QcmVjaXNpb24ob3B0aW9ucy5wcmVjaXNpb24pfSAgICAgICAgICAgIFxyXG5cdFx0fVxyXG5cdFxyXG5cdGA7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gc2NlbmUgc2NlbmUgdG8gZXhwb3J0XHJcbiAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgdG8gY29uZmlndXJlIHRoZSBleHBvcnRcclxuICogQHBhcmFtIG1lc2hQcmVkaWNhdGUgcHJlZGljYXRlIHRvIGZpbHRlciB0aGUgbWVzaGVzIHRvIGV4cG9ydFxyXG4gKiBAcmV0dXJucyBhIHVpbnQ4IGFycmF5IGNvbnRhaW5pbmcgdGhlIFVTRFogZmlsZVxyXG4gKiAjSDJHNVhXIzMgLSBTaW1wbGUgc3BoZXJlXHJcbiAqICNIMkc1WFcjNCAtIFJlZCBzcGhlcmVcclxuICogIzVOM1JXSyM0IC0gQm9vbWJveFxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFVTRFpFeHBvcnRBc3luYyhzY2VuZTogU2NlbmUsIG9wdGlvbnM6IFBhcnRpYWw8SVVTRFpFeHBvcnRPcHRpb25zPiwgbWVzaFByZWRpY2F0ZT86IChtOiBNZXNoKSA9PiBib29sZWFuKTogUHJvbWlzZTxVaW50OEFycmF5PiB7XHJcbiAgICBjb25zdCBsb2NhbE9wdGlvbnMgPSB7XHJcbiAgICAgICAgZmZsYXRlVXJsOiBcImh0dHBzOi8vdW5wa2cuY29tL2ZmbGF0ZUAwLjguMlwiLFxyXG4gICAgICAgIGluY2x1ZGVBbmNob3JpbmdQcm9wZXJ0aWVzOiB0cnVlLFxyXG4gICAgICAgIGFuY2hvcmluZ1R5cGU6IFwicGxhbmVcIixcclxuICAgICAgICBwbGFuZUFuY2hvcmluZ0FsaWdubWVudDogXCJob3Jpem9udGFsXCIsXHJcbiAgICAgICAgbW9kZWxGaWxlTmFtZTogXCJtb2RlbC51c2RhXCIsXHJcbiAgICAgICAgcHJlY2lzaW9uOiA1LFxyXG4gICAgICAgIGV4cG9ydENhbWVyYTogZmFsc2UsXHJcbiAgICAgICAgY2FtZXJhU2Vuc29yV2lkdGg6IDM1LFxyXG4gICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEdldCB0aGUgZmZsYXRlIGxpYnJhcnlcclxuICAgIGlmICh0eXBlb2YgZmZsYXRlID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgYXdhaXQgVG9vbHMuTG9hZFNjcmlwdEFzeW5jKGxvY2FsT3B0aW9ucy5mZmxhdGVVcmwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFN0YXJ0IHRoZSBleHBvcnRcclxuICAgIGNvbnN0IGZpbGVzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XHJcblxyXG4gICAgLy8gbW9kZWwgZmlsZSBzaG91bGQgYmUgZmlyc3QgaW4gVVNEWiBhcmNoaXZlIHNvIHdlIGluaXQgaXQgaGVyZVxyXG4gICAgZmlsZXNbbG9jYWxPcHRpb25zLm1vZGVsRmlsZU5hbWVdID0gbnVsbDtcclxuXHJcbiAgICBsZXQgb3V0cHV0ID0gQnVpbGRIZWFkZXIoKTtcclxuICAgIG91dHB1dCArPSBCdWlsZFNjZW5lU3RhcnQobG9jYWxPcHRpb25zKTtcclxuXHJcbiAgICBjb25zdCBtYXRlcmlhbFRvRXhwb3J0czogeyBba2V5OiBzdHJpbmddOiBNYXRlcmlhbCB9ID0ge307XHJcblxyXG4gICAgLy8gTWVzaGVzXHJcbiAgICBmb3IgKGNvbnN0IGFic3RyYWN0TWVzaCBvZiBzY2VuZS5tZXNoZXMpIHtcclxuICAgICAgICBpZiAoYWJzdHJhY3RNZXNoLmdldFRvdGFsVmVydGljZXMoKSA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbWVzaCA9IGFic3RyYWN0TWVzaCBhcyBNZXNoO1xyXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbWVzaC5nZW9tZXRyeTtcclxuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG1lc2gubWF0ZXJpYWw7XHJcblxyXG4gICAgICAgIGlmICghbWF0ZXJpYWwgfHwgIWdlb21ldHJ5IHx8IChtZXNoUHJlZGljYXRlICYmICFtZXNoUHJlZGljYXRlKG1lc2gpKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZE1hdGVyaWFscyA9IFtcIlN0YW5kYXJkTWF0ZXJpYWxcIiwgXCJQQlJNYXRlcmlhbFwiLCBcIlBCUk1ldGFsbGljUm91Z2huZXNzTWF0ZXJpYWxcIl07XHJcblxyXG4gICAgICAgIGlmIChzdXBwb3J0ZWRNYXRlcmlhbHMuaW5kZXhPZihtYXRlcmlhbC5nZXRDbGFzc05hbWUoKSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdlb21ldHJ5RmlsZU5hbWUgPSBcImdlb21ldHJpZXMvR2VvbWV0cnlfXCIgKyBnZW9tZXRyeS51bmlxdWVJZCArIFwiLnVzZGFcIjtcclxuXHJcbiAgICAgICAgICAgIGlmICghKGdlb21ldHJ5RmlsZU5hbWUgaW4gZmlsZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNoT2JqZWN0ID0gQnVpbGRNZXNoT2JqZWN0KGdlb21ldHJ5LCBsb2NhbE9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgZmlsZXNbZ2VvbWV0cnlGaWxlTmFtZV0gPSBCdWlsZFVTREZpbGVBc1N0cmluZyhtZXNoT2JqZWN0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCEobWF0ZXJpYWwudW5pcXVlSWQgaW4gbWF0ZXJpYWxUb0V4cG9ydHMpKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbFRvRXhwb3J0c1ttYXRlcmlhbC51bmlxdWVJZF0gPSBtYXRlcmlhbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3V0cHV0ICs9IEJ1aWxkWGZvcm0obWVzaCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgVG9vbHMuV2FybihcIlVTRFpFeHBvcnRBc3luYyBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgbWF0ZXJpYWwgdHlwZTogXCIgKyBtYXRlcmlhbC5nZXRDbGFzc05hbWUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIENhbWVyYVxyXG4gICAgaWYgKHNjZW5lLmFjdGl2ZUNhbWVyYSAmJiBsb2NhbE9wdGlvbnMuZXhwb3J0Q2FtZXJhKSB7XHJcbiAgICAgICAgb3V0cHV0ICs9IEJ1aWxkQ2FtZXJhKHNjZW5lLmFjdGl2ZUNhbWVyYSwgbG9jYWxPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDbG9zZSBzY2VuZVxyXG4gICAgb3V0cHV0ICs9IEJ1aWxkU2NlbmVFbmQoKTtcclxuXHJcbiAgICAvLyBNYXRlcmlhbHNcclxuICAgIGNvbnN0IHRleHR1cmVUb0V4cG9ydHM6IHsgW2tleTogc3RyaW5nXTogQmFzZVRleHR1cmUgfSA9IHt9O1xyXG4gICAgb3V0cHV0ICs9IEJ1aWxkTWF0ZXJpYWxzKG1hdGVyaWFsVG9FeHBvcnRzLCB0ZXh0dXJlVG9FeHBvcnRzLCBsb2NhbE9wdGlvbnMpO1xyXG5cclxuICAgIC8vIENvbXByZXNzXHJcbiAgICBmaWxlc1tsb2NhbE9wdGlvbnMubW9kZWxGaWxlTmFtZV0gPSBmZmxhdGUuc3RyVG9VOChvdXRwdXQpO1xyXG5cclxuICAgIC8vIFRleHR1cmVzXHJcbiAgICBmb3IgKGNvbnN0IGlkIGluIHRleHR1cmVUb0V4cG9ydHMpIHtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gdGV4dHVyZVRvRXhwb3J0c1tpZF07XHJcblxyXG4gICAgICAgIGNvbnN0IHNpemUgPSB0ZXh0dXJlLmdldFNpemUoKTtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlRGF0YSA9IGF3YWl0IHRleHR1cmUucmVhZFBpeGVscygpO1xyXG5cclxuICAgICAgICBpZiAoIXRleHR1cmVEYXRhKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRleHR1cmUgZGF0YSBpcyBub3QgYXZhaWxhYmxlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZmlsZUNvbnRlbnQgPSBhd2FpdCBEdW1wVG9vbHMuRHVtcERhdGFBc3luYyhzaXplLndpZHRoLCBzaXplLmhlaWdodCwgdGV4dHVyZURhdGEsIFwiaW1hZ2UvcG5nXCIsIHVuZGVmaW5lZCwgZmFsc2UsIHRydWUpO1xyXG5cclxuICAgICAgICBmaWxlc1tgdGV4dHVyZXMvVGV4dHVyZV8ke2lkfS5wbmdgXSA9IG5ldyBVaW50OEFycmF5KGZpbGVDb250ZW50IGFzIEFycmF5QnVmZmVyKS5zbGljZSgpOyAvLyBUaGlzIGlzIHRvIGF2b2lkIGdldHRpbmcgYSBsaW5rIGFuZCBub3QgYSBjb3B5XHJcbiAgICB9XHJcblxyXG4gICAgLy8gNjQgYnl0ZSBhbGlnbm1lbnRcclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS8xMDFhcnJvd3ovZmZsYXRlL2lzc3Vlcy8zOSNpc3N1ZWNvbW1lbnQtNzc3MjYzMTA5XHJcblxyXG4gICAgbGV0IG9mZnNldCA9IDA7XHJcblxyXG4gICAgZm9yIChjb25zdCBmaWxlbmFtZSBpbiBmaWxlcykge1xyXG4gICAgICAgIGNvbnN0IGZpbGUgPSBmaWxlc1tmaWxlbmFtZV07XHJcbiAgICAgICAgaWYgKCFmaWxlKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBoZWFkZXJTaXplID0gMzQgKyBmaWxlbmFtZS5sZW5ndGg7XHJcblxyXG4gICAgICAgIG9mZnNldCArPSBoZWFkZXJTaXplO1xyXG5cclxuICAgICAgICBjb25zdCBvZmZzZXRNb2Q2NCA9IG9mZnNldCAmIDYzO1xyXG5cclxuICAgICAgICBpZiAob2Zmc2V0TW9kNjQgIT09IDQpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFkTGVuZ3RoID0gNjQgLSBvZmZzZXRNb2Q2NDtcclxuICAgICAgICAgICAgY29uc3QgcGFkZGluZyA9IG5ldyBVaW50OEFycmF5KHBhZExlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbiAgICAgICAgICAgIGZpbGVzW2ZpbGVuYW1lXSA9IFtmaWxlLCB7IGV4dHJhOiB7IDEyMzQ1OiBwYWRkaW5nIH0gfV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvZmZzZXQgPSBmaWxlLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmZsYXRlLnppcFN5bmMoZmlsZXMsIHsgbGV2ZWw6IDAgfSk7XHJcbn1cclxuIiwiaW1wb3J0IHR5cGUgeyBJQnVmZmVyVmlldywgSUFjY2Vzc29yLCBJTm9kZSwgSUVYVE1lc2hHcHVJbnN0YW5jaW5nIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBBY2Nlc3NvclR5cGUsIEFjY2Vzc29yQ29tcG9uZW50VHlwZSB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIgfSBmcm9tIFwiLi4vZ2xURkV4cG9ydGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB0eXBlIHsgX0JpbmFyeVdyaXRlciB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJcIjtcclxuaW1wb3J0IHsgX0V4cG9ydGVyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHR5cGUgeyBOb2RlIH0gZnJvbSBcImNvcmUvbm9kZVwiO1xyXG5pbXBvcnQgeyBNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL21lc2hcIjtcclxuaW1wb3J0IFwiY29yZS9NZXNoZXMvdGhpbkluc3RhbmNlTWVzaFwiO1xyXG5pbXBvcnQgeyBUbXBWZWN0b3JzLCBRdWF0ZXJuaW9uLCBWZWN0b3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC52ZWN0b3JcIjtcclxuaW1wb3J0IHsgVmVydGV4QnVmZmVyIH0gZnJvbSBcImNvcmUvQnVmZmVycy9idWZmZXJcIjtcclxuXHJcbmNvbnN0IE5BTUUgPSBcIkVYVF9tZXNoX2dwdV9pbnN0YW5jaW5nXCI7XHJcblxyXG4vKipcclxuICogW1NwZWNpZmljYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi9ibG9iL21haW4vZXh0ZW5zaW9ucy8yLjAvVmVuZG9yL0VYVF9tZXNoX2dwdV9pbnN0YW5jaW5nL1JFQURNRS5tZClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEVYVF9tZXNoX2dwdV9pbnN0YW5jaW5nIGltcGxlbWVudHMgSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIHtcclxuICAgIC8qKiBOYW1lIG9mIHRoaXMgZXh0ZW5zaW9uICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IE5BTUU7XHJcblxyXG4gICAgLyoqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyBlbmFibGVkICovXHJcbiAgICBwdWJsaWMgZW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgLyoqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyByZXF1aXJlZCAqL1xyXG4gICAgcHVibGljIHJlcXVpcmVkID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfZXhwb3J0ZXI6IF9FeHBvcnRlcjtcclxuXHJcbiAgICBwcml2YXRlIF93YXNVc2VkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZXhwb3J0ZXI6IF9FeHBvcnRlcikge1xyXG4gICAgICAgIHRoaXMuX2V4cG9ydGVyID0gZXhwb3J0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7fVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBnZXQgd2FzVXNlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2FzVXNlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFmdGVyIG5vZGUgaXMgZXhwb3J0ZWRcclxuICAgICAqIEBwYXJhbSBjb250ZXh0IHRoZSBHTFRGIGNvbnRleHQgd2hlbiBsb2FkaW5nIHRoZSBhc3NldFxyXG4gICAgICogQHBhcmFtIG5vZGUgdGhlIG5vZGUgZXhwb3J0ZWRcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uTm9kZSB0aGUgY29ycmVzcG9uZGluZyBiYWJ5bG9uIG5vZGVcclxuICAgICAqIEBwYXJhbSBub2RlTWFwIG1hcCBmcm9tIGJhYnlsb24gbm9kZSBpZCB0byBub2RlIGluZGV4XHJcbiAgICAgKiBAcGFyYW0gYmluYXJ5V3JpdGVyIGJpbmFyeSB3cml0ZXJcclxuICAgICAqIEByZXR1cm5zIG51bGxhYmxlIHByb21pc2UsIHJlc29sdmVzIHdpdGggdGhlIG5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBvc3RFeHBvcnROb2RlQXN5bmMoXHJcbiAgICAgICAgY29udGV4dDogc3RyaW5nLFxyXG4gICAgICAgIG5vZGU6IE51bGxhYmxlPElOb2RlPixcclxuICAgICAgICBiYWJ5bG9uTm9kZTogTm9kZSxcclxuICAgICAgICBub2RlTWFwOiB7IFtrZXk6IG51bWJlcl06IG51bWJlciB9LFxyXG4gICAgICAgIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlclxyXG4gICAgKTogUHJvbWlzZTxOdWxsYWJsZTxJTm9kZT4+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKG5vZGUgJiYgYmFieWxvbk5vZGUgaW5zdGFuY2VvZiBNZXNoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk5vZGUuaGFzVGhpbkluc3RhbmNlcyAmJiBiaW5hcnlXcml0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93YXNVc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9UcmFuc2xhdGlvbiA9IFZlY3RvcjMuWmVybygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vUm90YXRpb24gPSBRdWF0ZXJuaW9uLklkZW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9TY2FsZSA9IFZlY3RvcjMuT25lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJldHJpZXZlIGFsbCB0aGUgaW5zdGFuY2Ugd29ybGQgbWF0cml4XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0cml4ID0gYmFieWxvbk5vZGUudGhpbkluc3RhbmNlR2V0V29ybGRNYXRyaWNlcygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpd3QgPSBUbXBWZWN0b3JzLlZlY3RvcjNbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXdyID0gVG1wVmVjdG9ycy5RdWF0ZXJuaW9uWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl3cyA9IFRtcFZlY3RvcnMuVmVjdG9yM1szXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhhc0FueUluc3RhbmNlV29ybGRUcmFuc2xhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBoYXNBbnlJbnN0YW5jZVdvcmxkUm90YXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGFzQW55SW5zdGFuY2VXb3JsZFNjYWxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHByZXBhcmUgdGVtcCBidWZmZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRpb25CdWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KGJhYnlsb25Ob2RlLnRoaW5JbnN0YW5jZUNvdW50ICogMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm90YXRpb25CdWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KGJhYnlsb25Ob2RlLnRoaW5JbnN0YW5jZUNvdW50ICogNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2NhbGVCdWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KGJhYnlsb25Ob2RlLnRoaW5JbnN0YW5jZUNvdW50ICogMyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG0gb2YgbWF0cml4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG0uZGVjb21wb3NlKGl3cywgaXdyLCBpd3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmlsbCB0aGUgdGVtcCBidWZmZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRpb25CdWZmZXIuc2V0KGl3dC5hc0FycmF5KCksIGkgKiAzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRpb25CdWZmZXIuc2V0KGl3ci5ub3JtYWxpemUoKS5hc0FycmF5KCksIGkgKiA0KTsgLy8gZW5zdXJlIHRoZSBxdWF0ZXJuaW9uIGlzIG5vcm1hbGl6ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGVCdWZmZXIuc2V0KGl3cy5hc0FycmF5KCksIGkgKiAzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgd2hlcmUgd2UgZGVjaWRlIGlmIHRoZXJlIGlzIGFueSB0cmFuc2Zvcm1hdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNBbnlJbnN0YW5jZVdvcmxkVHJhbnNsYXRpb24gPSBoYXNBbnlJbnN0YW5jZVdvcmxkVHJhbnNsYXRpb24gfHwgIWl3dC5lcXVhbHNXaXRoRXBzaWxvbihub1RyYW5zbGF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzQW55SW5zdGFuY2VXb3JsZFJvdGF0aW9uID0gaGFzQW55SW5zdGFuY2VXb3JsZFJvdGF0aW9uIHx8ICFpd3IuZXF1YWxzV2l0aEVwc2lsb24obm9Sb3RhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0FueUluc3RhbmNlV29ybGRTY2FsZSA9IGhhc0FueUluc3RhbmNlV29ybGRTY2FsZSB8fCAhaXdzLmVxdWFsc1dpdGhFcHNpbG9uKG5vU2NhbGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXh0ZW5zaW9uOiBJRVhUTWVzaEdwdUluc3RhbmNpbmcgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHt9LFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvIHdlIG5lZWQgdG8gd3JpdGUgVFJBTlNMQVRJT04gP1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYXNBbnlJbnN0YW5jZVdvcmxkVHJhbnNsYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uLmF0dHJpYnV0ZXNbXCJUUkFOU0xBVElPTlwiXSA9IHRoaXMuX2J1aWxkQWNjZXNzb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbkJ1ZmZlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjY2Vzc29yVHlwZS5WRUMzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFieWxvbk5vZGUudGhpbkluc3RhbmNlQ291bnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5hcnlXcml0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY2Nlc3NvckNvbXBvbmVudFR5cGUuRkxPQVRcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZG8gd2UgbmVlZCB0byB3cml0ZSBST1RBVElPTiA/XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhc0FueUluc3RhbmNlV29ybGRSb3RhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRUeXBlID0gQWNjZXNzb3JDb21wb25lbnRUeXBlLkZMT0FUOyAvLyB3ZSBkZWNpZGVkIHRvIHN0YXkgb24gRkxPQVQgZm9yIG5vdyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL0JhYnlsb25KUy9CYWJ5bG9uLmpzL3B1bGwvMTI0OTVcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uLmF0dHJpYnV0ZXNbXCJST1RBVElPTlwiXSA9IHRoaXMuX2J1aWxkQWNjZXNzb3Iocm90YXRpb25CdWZmZXIsIEFjY2Vzc29yVHlwZS5WRUM0LCBiYWJ5bG9uTm9kZS50aGluSW5zdGFuY2VDb3VudCwgYmluYXJ5V3JpdGVyLCBjb21wb25lbnRUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZG8gd2UgbmVlZCB0byB3cml0ZSBTQ0FMRSA/XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhc0FueUluc3RhbmNlV29ybGRTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlbnNpb24uYXR0cmlidXRlc1tcIlNDQUxFXCJdID0gdGhpcy5fYnVpbGRBY2Nlc3NvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlQnVmZmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQWNjZXNzb3JUeXBlLlZFQzMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTm9kZS50aGluSW5zdGFuY2VDb3VudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjY2Vzc29yQ29tcG9uZW50VHlwZS5GTE9BVFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24qL1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9ucyA9IG5vZGUuZXh0ZW5zaW9ucyB8fCB7fTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmV4dGVuc2lvbnNbTkFNRV0gPSBleHRlbnNpb247XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzb2x2ZShub2RlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9idWlsZEFjY2Vzc29yKGJ1ZmZlcjogRmxvYXQzMkFycmF5LCB0eXBlOiBBY2Nlc3NvclR5cGUsIGNvdW50OiBudW1iZXIsIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlciwgY29tcG9uZW50VHlwZTogQWNjZXNzb3JDb21wb25lbnRUeXBlKTogbnVtYmVyIHtcclxuICAgICAgICAvLyB3cml0ZSB0aGUgYnVmZmVyXHJcbiAgICAgICAgY29uc3QgYnVmZmVyT2Zmc2V0ID0gYmluYXJ5V3JpdGVyLmdldEJ5dGVPZmZzZXQoKTtcclxuICAgICAgICBzd2l0Y2ggKGNvbXBvbmVudFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBBY2Nlc3NvckNvbXBvbmVudFR5cGUuRkxPQVQ6IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpICE9IGJ1ZmZlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlci5zZXRGbG9hdDMyKGJ1ZmZlcltpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEFjY2Vzc29yQ29tcG9uZW50VHlwZS5CWVRFOiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSAhPSBidWZmZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBiaW5hcnlXcml0ZXIuc2V0Qnl0ZShidWZmZXJbaV0gKiAxMjcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBBY2Nlc3NvckNvbXBvbmVudFR5cGUuU0hPUlQ6IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpICE9IGJ1ZmZlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlci5zZXRJbnQxNihidWZmZXJbaV0gKiAzMjc2Nyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYnVpbGQgdGhlIGJ1ZmZlciB2aWV3XHJcbiAgICAgICAgY29uc3QgYnY6IElCdWZmZXJWaWV3ID0geyBidWZmZXI6IDAsIGJ5dGVPZmZzZXQ6IGJ1ZmZlck9mZnNldCwgYnl0ZUxlbmd0aDogYnVmZmVyLmxlbmd0aCAqIFZlcnRleEJ1ZmZlci5HZXRUeXBlQnl0ZUxlbmd0aChjb21wb25lbnRUeXBlKSB9O1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlclZpZXdJbmRleCA9IHRoaXMuX2V4cG9ydGVyLl9idWZmZXJWaWV3cy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5fZXhwb3J0ZXIuX2J1ZmZlclZpZXdzLnB1c2goYnYpO1xyXG5cclxuICAgICAgICAvLyBmaW5hbGx5IGJ1aWxkIHRoZSBhY2Nlc3NvclxyXG4gICAgICAgIGNvbnN0IGFjY2Vzc29ySW5kZXggPSB0aGlzLl9leHBvcnRlci5fYWNjZXNzb3JzLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBhY2Nlc3NvcjogSUFjY2Vzc29yID0ge1xyXG4gICAgICAgICAgICBidWZmZXJWaWV3OiBidWZmZXJWaWV3SW5kZXgsXHJcbiAgICAgICAgICAgIGNvbXBvbmVudFR5cGU6IGNvbXBvbmVudFR5cGUsXHJcbiAgICAgICAgICAgIGNvdW50OiBjb3VudCxcclxuICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgbm9ybWFsaXplZDogY29tcG9uZW50VHlwZSA9PSBBY2Nlc3NvckNvbXBvbmVudFR5cGUuQllURSB8fCBjb21wb25lbnRUeXBlID09IEFjY2Vzc29yQ29tcG9uZW50VHlwZS5TSE9SVCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX2V4cG9ydGVyLl9hY2Nlc3NvcnMucHVzaChhY2Nlc3Nvcik7XHJcbiAgICAgICAgcmV0dXJuIGFjY2Vzc29ySW5kZXg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuX0V4cG9ydGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsIChleHBvcnRlcikgPT4gbmV3IEVYVF9tZXNoX2dwdV9pbnN0YW5jaW5nKGV4cG9ydGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgU3BvdExpZ2h0IH0gZnJvbSBcImNvcmUvTGlnaHRzL3Nwb3RMaWdodFwiO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgVmVjdG9yMywgUXVhdGVybmlvbiwgVG1wVmVjdG9ycywgTWF0cml4IH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC52ZWN0b3JcIjtcclxuaW1wb3J0IHsgQ29sb3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5jb2xvclwiO1xyXG5pbXBvcnQgeyBMaWdodCB9IGZyb20gXCJjb3JlL0xpZ2h0cy9saWdodFwiO1xyXG5pbXBvcnQgdHlwZSB7IE5vZGUgfSBmcm9tIFwiY29yZS9ub2RlXCI7XHJcbmltcG9ydCB7IFNoYWRvd0xpZ2h0IH0gZnJvbSBcImNvcmUvTGlnaHRzL3NoYWRvd0xpZ2h0XCI7XHJcbmltcG9ydCB0eXBlIHsgSU5vZGUsIElLSFJMaWdodHNQdW5jdHVhbF9MaWdodFJlZmVyZW5jZSwgSUtIUkxpZ2h0c1B1bmN0dWFsX0xpZ2h0LCBJS0hSTGlnaHRzUHVuY3R1YWwgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEtIUkxpZ2h0c1B1bmN0dWFsX0xpZ2h0VHlwZSB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIgfSBmcm9tIFwiLi4vZ2xURkV4cG9ydGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IF9FeHBvcnRlciB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmUvTWlzYy9sb2dnZXJcIjtcclxuaW1wb3J0IHsgX0dMVEZVdGlsaXRpZXMgfSBmcm9tIFwiLi4vZ2xURlV0aWxpdGllc1wiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX2xpZ2h0c19wdW5jdHVhbFwiO1xyXG5cclxuLyoqXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvYmxvYi9tYXN0ZXIvZXh0ZW5zaW9ucy8yLjAvS2hyb25vcy9LSFJfbGlnaHRzX3B1bmN0dWFsL1JFQURNRS5tZClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEtIUl9saWdodHNfcHVuY3R1YWwgaW1wbGVtZW50cyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIge1xyXG4gICAgLyoqIFRoZSBuYW1lIG9mIHRoaXMgZXh0ZW5zaW9uLiAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgZW5hYmxlZC4gKi9cclxuICAgIHB1YmxpYyBlbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIHJlcXVpcmVkICovXHJcbiAgICBwdWJsaWMgcmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBnbFRGIGV4cG9ydGVyICovXHJcbiAgICBwcml2YXRlIF9leHBvcnRlcjogX0V4cG9ydGVyO1xyXG5cclxuICAgIHByaXZhdGUgX2xpZ2h0czogSUtIUkxpZ2h0c1B1bmN0dWFsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGV4cG9ydGVyOiBfRXhwb3J0ZXIpIHtcclxuICAgICAgICB0aGlzLl9leHBvcnRlciA9IGV4cG9ydGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgICh0aGlzLl9saWdodHMgYXMgYW55KSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGdldCB3YXNVc2VkKCkge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMuX2xpZ2h0cztcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgb25FeHBvcnRpbmcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZXhwb3J0ZXIhLl9nbFRGLmV4dGVuc2lvbnMhW05BTUVdID0gdGhpcy5fbGlnaHRzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmUgdGhpcyBtZXRob2QgdG8gbW9kaWZ5IHRoZSBkZWZhdWx0IGJlaGF2aW9yIHdoZW4gZXhwb3J0aW5nIGEgbm9kZVxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgVGhlIGNvbnRleHQgd2hlbiBleHBvcnRpbmcgdGhlIG5vZGVcclxuICAgICAqIEBwYXJhbSBub2RlIGdsVEYgbm9kZVxyXG4gICAgICogQHBhcmFtIGJhYnlsb25Ob2RlIEJhYnlsb25KUyBub2RlXHJcbiAgICAgKiBAcGFyYW0gbm9kZU1hcCBOb2RlIG1hcHBpbmcgb2YgdW5pcXVlIGlkIHRvIGdsVEYgbm9kZSBpbmRleFxyXG4gICAgICogQHJldHVybnMgbnVsbGFibGUgSU5vZGUgcHJvbWlzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9zdEV4cG9ydE5vZGVBc3luYyhjb250ZXh0OiBzdHJpbmcsIG5vZGU6IE51bGxhYmxlPElOb2RlPiwgYmFieWxvbk5vZGU6IE5vZGUsIG5vZGVNYXA6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0pOiBQcm9taXNlPE51bGxhYmxlPElOb2RlPj4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobm9kZSAmJiBiYWJ5bG9uTm9kZSBpbnN0YW5jZW9mIFNoYWRvd0xpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGlnaHQ6IElLSFJMaWdodHNQdW5jdHVhbF9MaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaWdodFR5cGUgPVxyXG4gICAgICAgICAgICAgICAgICAgIGJhYnlsb25Ob2RlLmdldFR5cGVJRCgpID09IExpZ2h0LkxJR0hUVFlQRUlEX1BPSU5UTElHSFRcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBLSFJMaWdodHNQdW5jdHVhbF9MaWdodFR5cGUuUE9JTlRcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBiYWJ5bG9uTm9kZS5nZXRUeXBlSUQoKSA9PSBMaWdodC5MSUdIVFRZUEVJRF9ESVJFQ1RJT05BTExJR0hUXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyBLSFJMaWdodHNQdW5jdHVhbF9MaWdodFR5cGUuRElSRUNUSU9OQUxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA6IGJhYnlsb25Ob2RlLmdldFR5cGVJRCgpID09IExpZ2h0LkxJR0hUVFlQRUlEX1NQT1RMSUdIVFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBLSFJMaWdodHNQdW5jdHVhbF9MaWdodFR5cGUuU1BPVFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpZ2h0VHlwZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLldhcm4oYCR7Y29udGV4dH06IExpZ2h0ICR7YmFieWxvbk5vZGUubmFtZX0gaXMgbm90IHN1cHBvcnRlZCBpbiAke05BTUV9YCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYmFieWxvbk5vZGUucG9zaXRpb24uZXF1YWxzVG9GbG9hdHMoMCwgMCwgMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS50cmFuc2xhdGlvbiA9IGJhYnlsb25Ob2RlLnBvc2l0aW9uLmFzQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpZ2h0VHlwZSAhPT0gS0hSTGlnaHRzUHVuY3R1YWxfTGlnaHRUeXBlLlBPSU5UKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsQXhpcyA9IGJhYnlsb25Ob2RlLmRpcmVjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeWF3ID0gLU1hdGguYXRhbjIobG9jYWxBeGlzLnosIGxvY2FsQXhpcy54KSArIE1hdGguUEkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsZW4gPSBNYXRoLnNxcnQobG9jYWxBeGlzLnggKiBsb2NhbEF4aXMueCArIGxvY2FsQXhpcy56ICogbG9jYWxBeGlzLnopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwaXRjaCA9IC1NYXRoLmF0YW4yKGxvY2FsQXhpcy55LCBsZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsaWdodFJvdGF0aW9uUXVhdGVybmlvbiA9IFF1YXRlcm5pb24uUm90YXRpb25ZYXdQaXRjaFJvbGwoeWF3ICsgTWF0aC5QSSwgcGl0Y2gsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIVF1YXRlcm5pb24uSXNJZGVudGl0eShsaWdodFJvdGF0aW9uUXVhdGVybmlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucm90YXRpb24gPSBsaWdodFJvdGF0aW9uUXVhdGVybmlvbi5hc0FycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTm9kZS5mYWxsb2ZmVHlwZSAhPT0gTGlnaHQuRkFMTE9GRl9HTFRGKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5XYXJuKGAke2NvbnRleHR9OiBMaWdodCBmYWxsb2ZmIGZvciAke2JhYnlsb25Ob2RlLm5hbWV9IGRvZXMgbm90IG1hdGNoIHRoZSAke05BTUV9IHNwZWNpZmljYXRpb24hYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBsaWdodFR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWJhYnlsb25Ob2RlLmRpZmZ1c2UuZXF1YWxzKENvbG9yMy5XaGl0ZSgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWdodC5jb2xvciA9IGJhYnlsb25Ob2RlLmRpZmZ1c2UuYXNBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk5vZGUuaW50ZW5zaXR5ICE9PSAxLjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHQuaW50ZW5zaXR5ID0gYmFieWxvbk5vZGUuaW50ZW5zaXR5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk5vZGUucmFuZ2UgIT09IE51bWJlci5NQVhfVkFMVUUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHQucmFuZ2UgPSBiYWJ5bG9uTm9kZS5yYW5nZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaWdodFR5cGUgPT09IEtIUkxpZ2h0c1B1bmN0dWFsX0xpZ2h0VHlwZS5TUE9UKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhYnlsb25TcG90TGlnaHQgPSBiYWJ5bG9uTm9kZSBhcyBTcG90TGlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uU3BvdExpZ2h0LmFuZ2xlICE9PSBNYXRoLlBJIC8gMi4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlnaHQuc3BvdCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHQuc3BvdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHQuc3BvdC5vdXRlckNvbmVBbmdsZSA9IGJhYnlsb25TcG90TGlnaHQuYW5nbGUgLyAyLjA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhYnlsb25TcG90TGlnaHQuaW5uZXJBbmdsZSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpZ2h0LnNwb3QgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0LnNwb3QgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0LnNwb3QuaW5uZXJDb25lQW5nbGUgPSBiYWJ5bG9uU3BvdExpZ2h0LmlubmVyQW5nbGUgLyAyLjA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpZ2h0cyB8fD0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWdodHM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpZ2h0cy5saWdodHMucHVzaChsaWdodCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpZ2h0UmVmZXJlbmNlOiBJS0hSTGlnaHRzUHVuY3R1YWxfTGlnaHRSZWZlcmVuY2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0OiB0aGlzLl9saWdodHMubGlnaHRzLmxlbmd0aCAtIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQXZvaWQgZHVwbGljYXRpbmcgdGhlIExpZ2h0J3MgcGFyZW50IG5vZGUgaWYgcG9zc2libGUuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50QmFieWxvbk5vZGUgPSBiYWJ5bG9uTm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudEJhYnlsb25Ob2RlICYmIHBhcmVudEJhYnlsb25Ob2RlLmdldENoaWxkcmVuKCkubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IHRoaXMuX2V4cG9ydGVyLl9ub2Rlc1tub2RlTWFwW3BhcmVudEJhYnlsb25Ob2RlLnVuaXF1ZUlkXV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRUcmFuc2xhdGlvbiA9IFZlY3RvcjMuRnJvbUFycmF5VG9SZWYocGFyZW50Tm9kZS50cmFuc2xhdGlvbiB8fCBbMCwgMCwgMF0sIDAsIFRtcFZlY3RvcnMuVmVjdG9yM1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRSb3RhdGlvbiA9IFF1YXRlcm5pb24uRnJvbUFycmF5VG9SZWYocGFyZW50Tm9kZS5yb3RhdGlvbiB8fCBbMCwgMCwgMCwgMV0sIDAsIFRtcFZlY3RvcnMuUXVhdGVybmlvblswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRTY2FsZSA9IFZlY3RvcjMuRnJvbUFycmF5VG9SZWYocGFyZW50Tm9kZS5zY2FsZSB8fCBbMSwgMSwgMV0sIDAsIFRtcFZlY3RvcnMuVmVjdG9yM1sxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRNYXRyaXggPSBNYXRyaXguQ29tcG9zZVRvUmVmKHBhcmVudFNjYWxlLCBwYXJlbnRSb3RhdGlvbiwgcGFyZW50VHJhbnNsYXRpb24sIFRtcFZlY3RvcnMuTWF0cml4WzBdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0cmFuc2xhdGlvbiA9IFZlY3RvcjMuRnJvbUFycmF5VG9SZWYobm9kZS50cmFuc2xhdGlvbiB8fCBbMCwgMCwgMF0sIDAsIFRtcFZlY3RvcnMuVmVjdG9yM1syXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb3RhdGlvbiA9IFF1YXRlcm5pb24uRnJvbUFycmF5VG9SZWYobm9kZS5yb3RhdGlvbiB8fCBbMCwgMCwgMCwgMV0sIDAsIFRtcFZlY3RvcnMuUXVhdGVybmlvblsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRyaXggPSBNYXRyaXguQ29tcG9zZVRvUmVmKFZlY3RvcjMuT25lUmVhZE9ubHksIHJvdGF0aW9uLCB0cmFuc2xhdGlvbiwgVG1wVmVjdG9ycy5NYXRyaXhbMV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE1hdHJpeC5tdWx0aXBseVRvUmVmKG1hdHJpeCwgbWF0cml4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdHJpeC5kZWNvbXBvc2UocGFyZW50U2NhbGUsIHBhcmVudFJvdGF0aW9uLCBwYXJlbnRUcmFuc2xhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudFRyYW5zbGF0aW9uLmVxdWFsc1RvRmxvYXRzKDAsIDAsIDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcmVudE5vZGUudHJhbnNsYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGUudHJhbnNsYXRpb24gPSBwYXJlbnRUcmFuc2xhdGlvbi5hc0FycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFF1YXRlcm5pb24uSXNJZGVudGl0eShwYXJlbnRSb3RhdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyZW50Tm9kZS5yb3RhdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5yb3RhdGlvbiA9IHBhcmVudFJvdGF0aW9uLmFzQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50U2NhbGUuZXF1YWxzVG9GbG9hdHMoMSwgMSwgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyZW50Tm9kZS5zY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5zY2FsZSA9IHBhcmVudFNjYWxlLmFzQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlLmV4dGVuc2lvbnMgfHw9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5leHRlbnNpb25zW05BTUVdID0gbGlnaHRSZWZlcmVuY2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG8gbm90IGV4cG9ydCB0aGUgb3JpZ2luYWwgbm9kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5leHRlbnNpb25zIHx8PSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmV4dGVuc2lvbnNbTkFNRV0gPSBsaWdodFJlZmVyZW5jZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNvbHZlKG5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5fRXhwb3J0ZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKGV4cG9ydGVyKSA9PiBuZXcgS0hSX2xpZ2h0c19wdW5jdHVhbChleHBvcnRlcikpO1xyXG4iLCJpbXBvcnQgdHlwZSB7IElNYXRlcmlhbCwgSUtIUk1hdGVyaWFsc0FuaXNvdHJvcHkgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB0eXBlIHsgSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlckV4dGVuc2lvblwiO1xyXG5pbXBvcnQgeyBfRXhwb3J0ZXIgfSBmcm9tIFwiLi4vZ2xURkV4cG9ydGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgUEJSQmFzZU1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJCYXNlTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBCYXNlVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9iYXNlVGV4dHVyZVwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX21hdGVyaWFsc19hbmlzb3Ryb3B5XCI7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBLSFJfbWF0ZXJpYWxzX2FuaXNvdHJvcHkgaW1wbGVtZW50cyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIge1xyXG4gICAgLyoqIE5hbWUgb2YgdGhpcyBleHRlbnNpb24gKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIHJlcXVpcmVkICovXHJcbiAgICBwdWJsaWMgcmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF9leHBvcnRlcjogX0V4cG9ydGVyO1xyXG5cclxuICAgIHByaXZhdGUgX3dhc1VzZWQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihleHBvcnRlcjogX0V4cG9ydGVyKSB7XHJcbiAgICAgICAgdGhpcy5fZXhwb3J0ZXIgPSBleHBvcnRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHt9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGdldCB3YXNVc2VkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93YXNVc2VkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3N0RXhwb3J0TWF0ZXJpYWxBZGRpdGlvbmFsVGV4dHVyZXM/KGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogQmFzZVRleHR1cmVbXSB7XHJcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbFRleHR1cmVzOiBCYXNlVGV4dHVyZVtdID0gW107XHJcbiAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIFBCUkJhc2VNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsLmFuaXNvdHJvcHkuaXNFbmFibGVkICYmICFiYWJ5bG9uTWF0ZXJpYWwuYW5pc290cm9weS5sZWdhY3kpIHtcclxuICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwuYW5pc290cm9weS50ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFRleHR1cmVzLnB1c2goYmFieWxvbk1hdGVyaWFsLmFuaXNvdHJvcHkudGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWRkaXRpb25hbFRleHR1cmVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvc3RFeHBvcnRNYXRlcmlhbEFzeW5jPyhjb250ZXh0OiBzdHJpbmcsIG5vZGU6IElNYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IFByb21pc2U8SU1hdGVyaWFsPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJCYXNlTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIGlmICghYmFieWxvbk1hdGVyaWFsLmFuaXNvdHJvcHkuaXNFbmFibGVkIHx8IGJhYnlsb25NYXRlcmlhbC5hbmlzb3Ryb3B5LmxlZ2FjeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3dhc1VzZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9ucyA9IG5vZGUuZXh0ZW5zaW9ucyB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBhbmlzb3Ryb3B5VGV4dHVyZUluZm8gPSB0aGlzLl9leHBvcnRlci5fZ2xURk1hdGVyaWFsRXhwb3J0ZXIuX2dldFRleHR1cmVJbmZvKGJhYnlsb25NYXRlcmlhbC5hbmlzb3Ryb3B5LnRleHR1cmUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGFuaXNvdHJvcHlJbmZvOiBJS0hSTWF0ZXJpYWxzQW5pc290cm9weSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBhbmlzb3Ryb3B5U3RyZW5ndGg6IGJhYnlsb25NYXRlcmlhbC5hbmlzb3Ryb3B5LmludGVuc2l0eSxcclxuICAgICAgICAgICAgICAgICAgICBhbmlzb3Ryb3B5Um90YXRpb246IGJhYnlsb25NYXRlcmlhbC5hbmlzb3Ryb3B5LmFuZ2xlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFuaXNvdHJvcHlUZXh0dXJlOiBhbmlzb3Ryb3B5VGV4dHVyZUluZm8gPz8gdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGhhc1RleHR1cmVzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbmlzb3Ryb3B5SW5mby5hbmlzb3Ryb3B5VGV4dHVyZSAhPT0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBub2RlLmV4dGVuc2lvbnNbTkFNRV0gPSBhbmlzb3Ryb3B5SW5mbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNvbHZlKG5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5fRXhwb3J0ZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKGV4cG9ydGVyKSA9PiBuZXcgS0hSX21hdGVyaWFsc19hbmlzb3Ryb3B5KGV4cG9ydGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgSU1hdGVyaWFsLCBJS0hSTWF0ZXJpYWxzQ2xlYXJjb2F0IH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgX0V4cG9ydGVyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFBCUkJhc2VNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9QQlIvcGJyQmFzZU1hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgQmFzZVRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvYmFzZVRleHR1cmVcIjtcclxuXHJcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcImNvcmUvTWlzYy90b29sc1wiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX21hdGVyaWFsc19jbGVhcmNvYXRcIjtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEtIUl9tYXRlcmlhbHNfY2xlYXJjb2F0IGltcGxlbWVudHMgSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIHtcclxuICAgIC8qKiBOYW1lIG9mIHRoaXMgZXh0ZW5zaW9uICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IE5BTUU7XHJcblxyXG4gICAgLyoqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyBlbmFibGVkICovXHJcbiAgICBwdWJsaWMgZW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgLyoqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyByZXF1aXJlZCAqL1xyXG4gICAgcHVibGljIHJlcXVpcmVkID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfZXhwb3J0ZXI6IF9FeHBvcnRlcjtcclxuXHJcbiAgICBwcml2YXRlIF93YXNVc2VkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZXhwb3J0ZXI6IF9FeHBvcnRlcikge1xyXG4gICAgICAgIHRoaXMuX2V4cG9ydGVyID0gZXhwb3J0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7fVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBnZXQgd2FzVXNlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2FzVXNlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zdEV4cG9ydE1hdGVyaWFsQWRkaXRpb25hbFRleHR1cmVzPyhjb250ZXh0OiBzdHJpbmcsIG5vZGU6IElNYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IEJhc2VUZXh0dXJlW10ge1xyXG4gICAgICAgIGNvbnN0IGFkZGl0aW9uYWxUZXh0dXJlczogQmFzZVRleHR1cmVbXSA9IFtdO1xyXG4gICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJCYXNlTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbC5jbGVhckNvYXQuaXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC50ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFRleHR1cmVzLnB1c2goYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC50ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC51c2VSb3VnaG5lc3NGcm9tTWFpblRleHR1cmUgJiYgYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC50ZXh0dXJlUm91Z2huZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFRleHR1cmVzLnB1c2goYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC50ZXh0dXJlUm91Z2huZXNzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwuY2xlYXJDb2F0LmJ1bXBUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFRleHR1cmVzLnB1c2goYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC5idW1wVGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWRkaXRpb25hbFRleHR1cmVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvc3RFeHBvcnRNYXRlcmlhbEFzeW5jPyhjb250ZXh0OiBzdHJpbmcsIG5vZGU6IElNYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IFByb21pc2U8SU1hdGVyaWFsPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJCYXNlTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIGlmICghYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC5pc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl93YXNVc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBub2RlLmV4dGVuc2lvbnMgPSBub2RlLmV4dGVuc2lvbnMgfHwge307XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xlYXJDb2F0VGV4dHVyZUluZm8gPSB0aGlzLl9leHBvcnRlci5fZ2xURk1hdGVyaWFsRXhwb3J0ZXIuX2dldFRleHR1cmVJbmZvKGJhYnlsb25NYXRlcmlhbC5jbGVhckNvYXQudGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2xlYXJDb2F0VGV4dHVyZVJvdWdobmVzc0luZm87XHJcbiAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC51c2VSb3VnaG5lc3NGcm9tTWFpblRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckNvYXRUZXh0dXJlUm91Z2huZXNzSW5mbyA9IHRoaXMuX2V4cG9ydGVyLl9nbFRGTWF0ZXJpYWxFeHBvcnRlci5fZ2V0VGV4dHVyZUluZm8oYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC50ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJDb2F0VGV4dHVyZVJvdWdobmVzc0luZm8gPSB0aGlzLl9leHBvcnRlci5fZ2xURk1hdGVyaWFsRXhwb3J0ZXIuX2dldFRleHR1cmVJbmZvKGJhYnlsb25NYXRlcmlhbC5jbGVhckNvYXQudGV4dHVyZVJvdWdobmVzcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbC5jbGVhckNvYXQuaXNUaW50RW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFRvb2xzLldhcm4oYENsZWFyIENvbG9yIHRpbnQgaXMgbm90IHN1cHBvcnRlZCBmb3IgZ2xURiBleHBvcnQuIElnbm9yaW5nIGZvcjogJHtiYWJ5bG9uTWF0ZXJpYWwubmFtZX1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC5yZW1hcEYwT25JbnRlcmZhY2VDaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBUb29scy5XYXJuKGBDbGVhciBDb2xvciBGMCByZW1hcHBpbmcgaXMgbm90IHN1cHBvcnRlZCBmb3IgZ2xURiBleHBvcnQuIElnbm9yaW5nIGZvcjogJHtiYWJ5bG9uTWF0ZXJpYWwubmFtZX1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGVhckNvYXROb3JtYWxUZXh0dXJlSW5mbyA9IHRoaXMuX2V4cG9ydGVyLl9nbFRGTWF0ZXJpYWxFeHBvcnRlci5fZ2V0VGV4dHVyZUluZm8oYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC5idW1wVGV4dHVyZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xlYXJDb2F0SW5mbzogSUtIUk1hdGVyaWFsc0NsZWFyY29hdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhcmNvYXRGYWN0b3I6IGJhYnlsb25NYXRlcmlhbC5jbGVhckNvYXQuaW50ZW5zaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyY29hdFRleHR1cmU6IGNsZWFyQ29hdFRleHR1cmVJbmZvID8/IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBjbGVhcmNvYXRSb3VnaG5lc3NGYWN0b3I6IGJhYnlsb25NYXRlcmlhbC5jbGVhckNvYXQucm91Z2huZXNzLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyY29hdFJvdWdobmVzc1RleHR1cmU6IGNsZWFyQ29hdFRleHR1cmVSb3VnaG5lc3NJbmZvID8/IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBjbGVhcmNvYXROb3JtYWxUZXh0dXJlOiBjbGVhckNvYXROb3JtYWxUZXh0dXJlSW5mbyA/PyB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaGFzVGV4dHVyZXM6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsZWFyQ29hdEluZm8uY2xlYXJjb2F0VGV4dHVyZSAhPT0gbnVsbCB8fCBjbGVhckNvYXRJbmZvLmNsZWFyY29hdFJvdWdobmVzc1RleHR1cmUgIT09IG51bGwgfHwgY2xlYXJDb2F0SW5mby5jbGVhcmNvYXRSb3VnaG5lc3NUZXh0dXJlICE9PSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9uc1tOQU1FXSA9IGNsZWFyQ29hdEluZm87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzb2x2ZShub2RlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuX0V4cG9ydGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsIChleHBvcnRlcikgPT4gbmV3IEtIUl9tYXRlcmlhbHNfY2xlYXJjb2F0KGV4cG9ydGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgSU1hdGVyaWFsLCBJS0hSTWF0ZXJpYWxzRGlmZnVzZVRyYW5zbWlzc2lvbiB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIgfSBmcm9tIFwiLi4vZ2xURkV4cG9ydGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IF9FeHBvcnRlciB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBQQlJNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9QQlIvcGJyTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBCYXNlVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9iYXNlVGV4dHVyZVwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX21hdGVyaWFsc19kaWZmdXNlX3RyYW5zbWlzc2lvblwiO1xyXG5cclxuLyoqXHJcbiAqIFtQcm9wb3NlZCBTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvcHVsbC8xODI1KVxyXG4gKiAhISEgRXhwZXJpbWVudGFsIEV4dGVuc2lvbiBTdWJqZWN0IHRvIENoYW5nZXMgISEhXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBLSFJfbWF0ZXJpYWxzX2RpZmZ1c2VfdHJhbnNtaXNzaW9uIGltcGxlbWVudHMgSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIHtcclxuICAgIC8qKiBOYW1lIG9mIHRoaXMgZXh0ZW5zaW9uICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IE5BTUU7XHJcblxyXG4gICAgLyoqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyBlbmFibGVkICovXHJcbiAgICBwdWJsaWMgZW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgLyoqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyByZXF1aXJlZCAqL1xyXG4gICAgcHVibGljIHJlcXVpcmVkID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfZXhwb3J0ZXI6IF9FeHBvcnRlcjtcclxuXHJcbiAgICBwcml2YXRlIF93YXNVc2VkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZXhwb3J0ZXI6IF9FeHBvcnRlcikge1xyXG4gICAgICAgIHRoaXMuX2V4cG9ydGVyID0gZXhwb3J0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7fVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBnZXQgd2FzVXNlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2FzVXNlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFmdGVyIGV4cG9ydGluZyBhIG1hdGVyaWFsLCBkZWFsIHdpdGggYWRkaXRpb25hbCB0ZXh0dXJlc1xyXG4gICAgICogQHBhcmFtIGNvbnRleHQgR0xURiBjb250ZXh0IG9mIHRoZSBtYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIG5vZGUgZXhwb3J0ZWQgR0xURiBub2RlXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvbk1hdGVyaWFsIGNvcnJlc3BvbmRpbmcgYmFieWxvbiBtYXRlcmlhbFxyXG4gICAgICogQHJldHVybnMgYXJyYXkgb2YgYWRkaXRpb25hbCB0ZXh0dXJlcyB0byBleHBvcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBvc3RFeHBvcnRNYXRlcmlhbEFkZGl0aW9uYWxUZXh0dXJlcz8oY29udGV4dDogc3RyaW5nLCBub2RlOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBCYXNlVGV4dHVyZVtdIHtcclxuICAgICAgICBjb25zdCBhZGRpdGlvbmFsVGV4dHVyZXM6IEJhc2VUZXh0dXJlW10gPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0V4dGVuc2lvbkVuYWJsZWQoYmFieWxvbk1hdGVyaWFsKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbC5zdWJTdXJmYWNlLnRoaWNrbmVzc1RleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVGV4dHVyZXMucHVzaChiYWJ5bG9uTWF0ZXJpYWwuc3ViU3VyZmFjZS50aGlja25lc3NUZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBhZGRpdGlvbmFsVGV4dHVyZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhZGRpdGlvbmFsVGV4dHVyZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNFeHRlbnNpb25FbmFibGVkKG1hdDogUEJSTWF0ZXJpYWwpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBUaGlzIGV4dGVuc2lvbiBtdXN0IG5vdCBiZSB1c2VkIG9uIGEgbWF0ZXJpYWwgdGhhdCBhbHNvIHVzZXMgS0hSX21hdGVyaWFsc191bmxpdFxyXG4gICAgICAgIGlmIChtYXQudW5saXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdWJzID0gbWF0LnN1YlN1cmZhY2U7XHJcbiAgICAgICAgaWYgKCFzdWJzLmlzVHJhbnNsdWNlbmN5RW5hYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAhbWF0LnVubGl0ICYmXHJcbiAgICAgICAgICAgICFzdWJzLnVzZUFsYmVkb1RvVGludFRyYW5zbHVjZW5jeSAmJlxyXG4gICAgICAgICAgICBzdWJzLnVzZUdsdGZTdHlsZVRleHR1cmVzICYmXHJcbiAgICAgICAgICAgIHN1YnMudm9sdW1lSW5kZXhPZlJlZnJhY3Rpb24gPT09IDEgJiZcclxuICAgICAgICAgICAgc3Vicy5taW5pbXVtVGhpY2tuZXNzID09PSAwICYmXHJcbiAgICAgICAgICAgIHN1YnMubWF4aW11bVRoaWNrbmVzcyA9PT0gMFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaGFzVGV4dHVyZXNFeHRlbnNpb24obWF0OiBQQlJNYXRlcmlhbCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBtYXQuc3ViU3VyZmFjZS50cmFuc2x1Y2VuY3lJbnRlbnNpdHlUZXh0dXJlICE9IG51bGwgfHwgbWF0LnN1YlN1cmZhY2UudHJhbnNsdWNlbmN5Q29sb3JUZXh0dXJlICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZnRlciBleHBvcnRpbmcgYSBtYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgR0xURiBjb250ZXh0IG9mIHRoZSBtYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIG5vZGUgZXhwb3J0ZWQgR0xURiBub2RlXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvbk1hdGVyaWFsIGNvcnJlc3BvbmRpbmcgYmFieWxvbiBtYXRlcmlhbFxyXG4gICAgICogQHJldHVybnMgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHVwZGF0ZWQgbm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9zdEV4cG9ydE1hdGVyaWFsQXN5bmM/KGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogUHJvbWlzZTxJTWF0ZXJpYWw+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsICYmIHRoaXMuX2lzRXh0ZW5zaW9uRW5hYmxlZChiYWJ5bG9uTWF0ZXJpYWwpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93YXNVc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJzID0gYmFieWxvbk1hdGVyaWFsLnN1YlN1cmZhY2U7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZGlmZnVzZVRyYW5zbWlzc2lvbkZhY3RvciA9IHN1YnMudHJhbnNsdWNlbmN5SW50ZW5zaXR5ID09IDEgPyB1bmRlZmluZWQgOiBzdWJzLnRyYW5zbHVjZW5jeUludGVuc2l0eTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZ1c2VUcmFuc21pc3Npb25UZXh0dXJlID0gdGhpcy5fZXhwb3J0ZXIuX2dsVEZNYXRlcmlhbEV4cG9ydGVyLl9nZXRUZXh0dXJlSW5mbyhzdWJzLnRyYW5zbHVjZW5jeUludGVuc2l0eVRleHR1cmUpID8/IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZ1c2VUcmFuc21pc3Npb25Db2xvckZhY3RvciA9ICFzdWJzLnRyYW5zbHVjZW5jeUNvbG9yIHx8IHN1YnMudHJhbnNsdWNlbmN5Q29sb3IuZXF1YWxzRmxvYXRzKDEuMCwgMS4wLCAxLjApID8gdW5kZWZpbmVkIDogc3Vicy50cmFuc2x1Y2VuY3lDb2xvci5hc0FycmF5KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaWZmdXNlVHJhbnNtaXNzaW9uQ29sb3JUZXh0dXJlID0gdGhpcy5fZXhwb3J0ZXIuX2dsVEZNYXRlcmlhbEV4cG9ydGVyLl9nZXRUZXh0dXJlSW5mbyhzdWJzLnRyYW5zbHVjZW5jeUNvbG9yVGV4dHVyZSkgPz8gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZ1c2VUcmFuc21pc3Npb25JbmZvOiBJS0hSTWF0ZXJpYWxzRGlmZnVzZVRyYW5zbWlzc2lvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBkaWZmdXNlVHJhbnNtaXNzaW9uRmFjdG9yLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpZmZ1c2VUcmFuc21pc3Npb25UZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpZmZ1c2VUcmFuc21pc3Npb25Db2xvckZhY3RvcixcclxuICAgICAgICAgICAgICAgICAgICBkaWZmdXNlVHJhbnNtaXNzaW9uQ29sb3JUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgICAgIGhhc1RleHR1cmVzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYXNUZXh0dXJlc0V4dGVuc2lvbihiYWJ5bG9uTWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5leHRlbnNpb25zID0gbm9kZS5leHRlbnNpb25zIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5leHRlbnNpb25zW05BTUVdID0gZGlmZnVzZVRyYW5zbWlzc2lvbkluZm87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzb2x2ZShub2RlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuX0V4cG9ydGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsIChleHBvcnRlcikgPT4gbmV3IEtIUl9tYXRlcmlhbHNfZGlmZnVzZV90cmFuc21pc3Npb24oZXhwb3J0ZXIpKTtcclxuIiwiaW1wb3J0IHR5cGUgeyBJTWF0ZXJpYWwsIElLSFJNYXRlcmlhbHNEaXNwZXJzaW9uIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgX0V4cG9ydGVyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFBCUk1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJNYXRlcmlhbFwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX21hdGVyaWFsc19kaXNwZXJzaW9uXCI7XHJcblxyXG4vKipcclxuICogW1NwZWNpZmljYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi9ibG9iLzg3YmQ2NGE3ZjVlMjNjODRiNmFlZjJlNjA4MjA2OTU4M2VkMGRkYjQvZXh0ZW5zaW9ucy8yLjAvS2hyb25vcy9LSFJfbWF0ZXJpYWxzX2Rpc3BlcnNpb24vUkVBRE1FLm1kKVxyXG4gKiBAZXhwZXJpbWVudGFsXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBLSFJfbWF0ZXJpYWxzX2Rpc3BlcnNpb24gaW1wbGVtZW50cyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIge1xyXG4gICAgLyoqIE5hbWUgb2YgdGhpcyBleHRlbnNpb24gKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIHJlcXVpcmVkICovXHJcbiAgICBwdWJsaWMgcmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF93YXNVc2VkID0gZmFsc2U7XHJcblxyXG4gICAgLyoqIENvbnN0cnVjdG9yICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgLyoqIERpc3Bvc2UgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge31cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZ2V0IHdhc1VzZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dhc1VzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNFeHRlbnNpb25FbmFibGVkKG1hdDogUEJSTWF0ZXJpYWwpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBUaGlzIGV4dGVuc2lvbiBtdXN0IG5vdCBiZSB1c2VkIG9uIGEgbWF0ZXJpYWwgdGhhdCBhbHNvIHVzZXMgS0hSX21hdGVyaWFsc191bmxpdFxyXG4gICAgICAgIGlmIChtYXQudW5saXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdWJzID0gbWF0LnN1YlN1cmZhY2U7XHJcbiAgICAgICAgLy8gdGhpcyBleHRlbnNpb24gcmVxdWlyZXMgcmVmcmFjdGlvbiB0byBiZSBlbmFibGVkLlxyXG4gICAgICAgIGlmICghc3Vicy5pc1JlZnJhY3Rpb25FbmFibGVkICYmICFzdWJzLmlzRGlzcGVyc2lvbkVuYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFmdGVyIGV4cG9ydGluZyBhIG1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBHTFRGIGNvbnRleHQgb2YgdGhlIG1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gbm9kZSBleHBvcnRlZCBHTFRGIG5vZGVcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uTWF0ZXJpYWwgY29ycmVzcG9uZGluZyBiYWJ5bG9uIG1hdGVyaWFsXHJcbiAgICAgKiBAcmV0dXJucyBwcm9taXNlLCByZXNvbHZlcyB3aXRoIHRoZSBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9zdEV4cG9ydE1hdGVyaWFsQXN5bmM/KGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogUHJvbWlzZTxJTWF0ZXJpYWw+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsICYmIHRoaXMuX2lzRXh0ZW5zaW9uRW5hYmxlZChiYWJ5bG9uTWF0ZXJpYWwpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93YXNVc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJzID0gYmFieWxvbk1hdGVyaWFsLnN1YlN1cmZhY2U7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNwZXJzaW9uID0gc3Vicy5kaXNwZXJzaW9uO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3BlcnNpb25JbmZvOiBJS0hSTWF0ZXJpYWxzRGlzcGVyc2lvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwZXJzaW9uOiBkaXNwZXJzaW9uLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9ucyA9IG5vZGUuZXh0ZW5zaW9ucyB8fCB7fTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9uc1tOQU1FXSA9IGRpc3BlcnNpb25JbmZvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc29sdmUobm9kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbl9FeHBvcnRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAoKSA9PiBuZXcgS0hSX21hdGVyaWFsc19kaXNwZXJzaW9uKCkpO1xyXG4iLCJpbXBvcnQgdHlwZSB7IElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgX0V4cG9ydGVyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFBCUk1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJNYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IElNYXRlcmlhbCwgSUtIUk1hdGVyaWFsc0VtaXNzaXZlU3RyZW5ndGggfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcblxyXG5jb25zdCBOQU1FID0gXCJLSFJfbWF0ZXJpYWxzX2VtaXNzaXZlX3N0cmVuZ3RoXCI7XHJcblxyXG4vKipcclxuICogW1NwZWNpZmljYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi9ibG9iL21haW4vZXh0ZW5zaW9ucy8yLjAvS2hyb25vcy9LSFJfbWF0ZXJpYWxzX2VtaXNzaXZlX3N0cmVuZ3RoL1JFQURNRS5tZClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEtIUl9tYXRlcmlhbHNfZW1pc3NpdmVfc3RyZW5ndGggaW1wbGVtZW50cyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIge1xyXG4gICAgLyoqIE5hbWUgb2YgdGhpcyBleHRlbnNpb24gKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIHJlcXVpcmVkICovXHJcbiAgICBwdWJsaWMgcmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF93YXNVc2VkID0gZmFsc2U7XHJcblxyXG4gICAgLyoqIERpc3Bvc2UgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge31cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZ2V0IHdhc1VzZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dhc1VzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZnRlciBleHBvcnRpbmcgYSBtYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgR0xURiBjb250ZXh0IG9mIHRoZSBtYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIG5vZGUgZXhwb3J0ZWQgR0xURiBub2RlXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvbk1hdGVyaWFsIGNvcnJlc3BvbmRpbmcgYmFieWxvbiBtYXRlcmlhbFxyXG4gICAgICogQHJldHVybnMgcHJvbWlzZSwgcmVzb2x2ZXMgd2l0aCB0aGUgbWF0ZXJpYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBvc3RFeHBvcnRNYXRlcmlhbEFzeW5jKGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogUHJvbWlzZTxJTWF0ZXJpYWw+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKCEoYmFieWxvbk1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShub2RlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZW1pc3NpdmVDb2xvciA9IGJhYnlsb25NYXRlcmlhbC5lbWlzc2l2ZUNvbG9yLmFzQXJyYXkoKTtcclxuICAgICAgICAgICAgY29uc3QgdGVtcEVtaXNzaXZlU3RyZW5ndGggPSBNYXRoLm1heCguLi5lbWlzc2l2ZUNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0ZW1wRW1pc3NpdmVTdHJlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dhc1VzZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9ucyB8fD0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZW1pc3NpdmVTdHJlbmd0aEluZm86IElLSFJNYXRlcmlhbHNFbWlzc2l2ZVN0cmVuZ3RoID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXNzaXZlU3RyZW5ndGg6IHRlbXBFbWlzc2l2ZVN0cmVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBOb3JtYWxpemUgZWFjaCB2YWx1ZSBvZiB0aGUgZW1pc3NpdmUgZmFjdG9yIHRvIGhhdmUgYSBtYXggdmFsdWUgb2YgMVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RW1pc3NpdmVGYWN0b3IgPSBiYWJ5bG9uTWF0ZXJpYWwuZW1pc3NpdmVDb2xvci5zY2FsZSgxIC8gZW1pc3NpdmVTdHJlbmd0aEluZm8uZW1pc3NpdmVTdHJlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbm9kZS5lbWlzc2l2ZUZhY3RvciA9IG5ld0VtaXNzaXZlRmFjdG9yLmFzQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9uc1tOQU1FXSA9IGVtaXNzaXZlU3RyZW5ndGhJbmZvO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShub2RlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuX0V4cG9ydGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsIChleHBvcnRlcikgPT4gbmV3IEtIUl9tYXRlcmlhbHNfZW1pc3NpdmVfc3RyZW5ndGgoKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgSU1hdGVyaWFsLCBJS0hSTWF0ZXJpYWxzSW9yIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgX0V4cG9ydGVyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFBCUk1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJNYXRlcmlhbFwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX21hdGVyaWFsc19pb3JcIjtcclxuXHJcbi8qKlxyXG4gKiBbU3BlY2lmaWNhdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL0tocm9ub3NHcm91cC9nbFRGL2Jsb2IvbWFpbi9leHRlbnNpb25zLzIuMC9LaHJvbm9zL0tIUl9tYXRlcmlhbHNfaW9yL1JFQURNRS5tZClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEtIUl9tYXRlcmlhbHNfaW9yIGltcGxlbWVudHMgSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIHtcclxuICAgIC8qKiBOYW1lIG9mIHRoaXMgZXh0ZW5zaW9uICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IE5BTUU7XHJcblxyXG4gICAgLyoqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyBlbmFibGVkICovXHJcbiAgICBwdWJsaWMgZW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgLyoqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyByZXF1aXJlZCAqL1xyXG4gICAgcHVibGljIHJlcXVpcmVkID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfd2FzVXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgICAvKiogRGlzcG9zZSAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7fVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBnZXQgd2FzVXNlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2FzVXNlZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pc0V4dGVuc2lvbkVuYWJsZWQobWF0OiBQQlJNYXRlcmlhbCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIFRoaXMgZXh0ZW5zaW9uIG11c3Qgbm90IGJlIHVzZWQgb24gYSBtYXRlcmlhbCB0aGF0IGFsc28gdXNlcyBLSFJfbWF0ZXJpYWxzX3VubGl0XHJcbiAgICAgICAgaWYgKG1hdC51bmxpdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXQuaW5kZXhPZlJlZnJhY3Rpb24gIT0gdW5kZWZpbmVkICYmIG1hdC5pbmRleE9mUmVmcmFjdGlvbiAhPSAxLjU7IC8vIDEuNSBpcyBub3JtYXRpdmUgZGVmYXVsdCB2YWx1ZS5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFmdGVyIGV4cG9ydGluZyBhIG1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBHTFRGIGNvbnRleHQgb2YgdGhlIG1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gbm9kZSBleHBvcnRlZCBHTFRGIG5vZGVcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uTWF0ZXJpYWwgY29ycmVzcG9uZGluZyBiYWJ5bG9uIG1hdGVyaWFsXHJcbiAgICAgKiBAcmV0dXJucyBwcm9taXNlLCByZXNvbHZlcyB3aXRoIHRoZSBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9zdEV4cG9ydE1hdGVyaWFsQXN5bmM/KGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogUHJvbWlzZTxJTWF0ZXJpYWw+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsICYmIHRoaXMuX2lzRXh0ZW5zaW9uRW5hYmxlZChiYWJ5bG9uTWF0ZXJpYWwpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93YXNVc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpb3JJbmZvOiBJS0hSTWF0ZXJpYWxzSW9yID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlvcjogYmFieWxvbk1hdGVyaWFsLmluZGV4T2ZSZWZyYWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9ucyA9IG5vZGUuZXh0ZW5zaW9ucyB8fCB7fTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9uc1tOQU1FXSA9IGlvckluZm87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzb2x2ZShub2RlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG5fRXhwb3J0ZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKGV4cG9ydGVyKSA9PiBuZXcgS0hSX21hdGVyaWFsc19pb3IoKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgSU1hdGVyaWFsLCBJS0hSTWF0ZXJpYWxzSXJpZGVzY2VuY2UgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB0eXBlIHsgSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlckV4dGVuc2lvblwiO1xyXG5pbXBvcnQgeyBfRXhwb3J0ZXIgfSBmcm9tIFwiLi4vZ2xURkV4cG9ydGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgUEJSQmFzZU1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJCYXNlTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBCYXNlVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9iYXNlVGV4dHVyZVwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX21hdGVyaWFsc19pcmlkZXNjZW5jZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY2xhc3MgS0hSX21hdGVyaWFsc19pcmlkZXNjZW5jZSBpbXBsZW1lbnRzIElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB7XHJcbiAgICAvKiogTmFtZSBvZiB0aGlzIGV4dGVuc2lvbiAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgZW5hYmxlZCAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIC8qKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgcmVxdWlyZWQgKi9cclxuICAgIHB1YmxpYyByZXF1aXJlZCA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX2V4cG9ydGVyOiBfRXhwb3J0ZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfd2FzVXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGV4cG9ydGVyOiBfRXhwb3J0ZXIpIHtcclxuICAgICAgICB0aGlzLl9leHBvcnRlciA9IGV4cG9ydGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge31cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZ2V0IHdhc1VzZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dhc1VzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvc3RFeHBvcnRNYXRlcmlhbEFkZGl0aW9uYWxUZXh0dXJlcz8oY29udGV4dDogc3RyaW5nLCBub2RlOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBCYXNlVGV4dHVyZVtdIHtcclxuICAgICAgICBjb25zdCBhZGRpdGlvbmFsVGV4dHVyZXM6IEJhc2VUZXh0dXJlW10gPSBbXTtcclxuICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsIGluc3RhbmNlb2YgUEJSQmFzZU1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwuaXJpZGVzY2VuY2UuaXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsLmlyaWRlc2NlbmNlLnRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVGV4dHVyZXMucHVzaChiYWJ5bG9uTWF0ZXJpYWwuaXJpZGVzY2VuY2UudGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsLmlyaWRlc2NlbmNlLnRoaWNrbmVzc1RleHR1cmUgJiYgYmFieWxvbk1hdGVyaWFsLmlyaWRlc2NlbmNlLnRoaWNrbmVzc1RleHR1cmUgIT09IGJhYnlsb25NYXRlcmlhbC5pcmlkZXNjZW5jZS50ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFRleHR1cmVzLnB1c2goYmFieWxvbk1hdGVyaWFsLmlyaWRlc2NlbmNlLnRoaWNrbmVzc1RleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFkZGl0aW9uYWxUZXh0dXJlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3N0RXhwb3J0TWF0ZXJpYWxBc3luYz8oY29udGV4dDogc3RyaW5nLCBub2RlOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBQcm9taXNlPElNYXRlcmlhbD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsIGluc3RhbmNlb2YgUEJSQmFzZU1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWJhYnlsb25NYXRlcmlhbC5pcmlkZXNjZW5jZS5pc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl93YXNVc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBub2RlLmV4dGVuc2lvbnMgPSBub2RlLmV4dGVuc2lvbnMgfHwge307XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaXJpZGVzY2VuY2VUZXh0dXJlSW5mbyA9IHRoaXMuX2V4cG9ydGVyLl9nbFRGTWF0ZXJpYWxFeHBvcnRlci5fZ2V0VGV4dHVyZUluZm8oYmFieWxvbk1hdGVyaWFsLmlyaWRlc2NlbmNlLnRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXJpZGVzY2VuY2VUaGlja25lc3NUZXh0dXJlSW5mbyA9IHRoaXMuX2V4cG9ydGVyLl9nbFRGTWF0ZXJpYWxFeHBvcnRlci5fZ2V0VGV4dHVyZUluZm8oYmFieWxvbk1hdGVyaWFsLmlyaWRlc2NlbmNlLnRoaWNrbmVzc1RleHR1cmUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGlyaWRlc2NlbmNlSW5mbzogSUtIUk1hdGVyaWFsc0lyaWRlc2NlbmNlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlyaWRlc2NlbmNlRmFjdG9yOiBiYWJ5bG9uTWF0ZXJpYWwuaXJpZGVzY2VuY2UuaW50ZW5zaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIGlyaWRlc2NlbmNlSW9yOiBiYWJ5bG9uTWF0ZXJpYWwuaXJpZGVzY2VuY2UuaW5kZXhPZlJlZnJhY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgaXJpZGVzY2VuY2VUaGlja25lc3NNaW5pbXVtOiBiYWJ5bG9uTWF0ZXJpYWwuaXJpZGVzY2VuY2UubWluaW11bVRoaWNrbmVzcyxcclxuICAgICAgICAgICAgICAgICAgICBpcmlkZXNjZW5jZVRoaWNrbmVzc01heGltdW06IGJhYnlsb25NYXRlcmlhbC5pcmlkZXNjZW5jZS5tYXhpbXVtVGhpY2tuZXNzLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpcmlkZXNjZW5jZVRleHR1cmU6IGlyaWRlc2NlbmNlVGV4dHVyZUluZm8gPz8gdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGlyaWRlc2NlbmNlVGhpY2tuZXNzVGV4dHVyZTogaXJpZGVzY2VuY2VUaGlja25lc3NUZXh0dXJlSW5mbyA/PyB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaGFzVGV4dHVyZXM6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlyaWRlc2NlbmNlSW5mby5pcmlkZXNjZW5jZVRleHR1cmUgIT09IG51bGwgfHwgaXJpZGVzY2VuY2VJbmZvLmlyaWRlc2NlbmNlVGhpY2tuZXNzVGV4dHVyZSAhPT0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBub2RlLmV4dGVuc2lvbnNbTkFNRV0gPSBpcmlkZXNjZW5jZUluZm87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzb2x2ZShub2RlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuX0V4cG9ydGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsIChleHBvcnRlcikgPT4gbmV3IEtIUl9tYXRlcmlhbHNfaXJpZGVzY2VuY2UoZXhwb3J0ZXIpKTtcclxuIiwiaW1wb3J0IHR5cGUgeyBJTWF0ZXJpYWwsIElLSFJNYXRlcmlhbHNTaGVlbiB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIgfSBmcm9tIFwiLi4vZ2xURkV4cG9ydGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IF9FeHBvcnRlciB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBQQlJNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9QQlIvcGJyTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBCYXNlVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9iYXNlVGV4dHVyZVwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX21hdGVyaWFsc19zaGVlblwiO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY2xhc3MgS0hSX21hdGVyaWFsc19zaGVlbiBpbXBsZW1lbnRzIElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB7XHJcbiAgICAvKiogTmFtZSBvZiB0aGlzIGV4dGVuc2lvbiAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgZW5hYmxlZCAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIC8qKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgcmVxdWlyZWQgKi9cclxuICAgIHB1YmxpYyByZXF1aXJlZCA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX3dhc1VzZWQgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF9leHBvcnRlcjogX0V4cG9ydGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGV4cG9ydGVyOiBfRXhwb3J0ZXIpIHtcclxuICAgICAgICB0aGlzLl9leHBvcnRlciA9IGV4cG9ydGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge31cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZ2V0IHdhc1VzZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dhc1VzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvc3RFeHBvcnRNYXRlcmlhbEFkZGl0aW9uYWxUZXh0dXJlcyhjb250ZXh0OiBzdHJpbmcsIG5vZGU6IElNYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IEJhc2VUZXh0dXJlW10ge1xyXG4gICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsLnNoZWVuLmlzRW5hYmxlZCAmJiBiYWJ5bG9uTWF0ZXJpYWwuc2hlZW4udGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtiYWJ5bG9uTWF0ZXJpYWwuc2hlZW4udGV4dHVyZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zdEV4cG9ydE1hdGVyaWFsQXN5bmMoY29udGV4dDogc3RyaW5nLCBub2RlOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBQcm9taXNlPElNYXRlcmlhbD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIGlmICghYmFieWxvbk1hdGVyaWFsLnNoZWVuLmlzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3dhc1VzZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub2RlLmV4dGVuc2lvbnMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9ucyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2hlZW5JbmZvOiBJS0hSTWF0ZXJpYWxzU2hlZW4gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hlZW5Db2xvckZhY3RvcjogYmFieWxvbk1hdGVyaWFsLnNoZWVuLmNvbG9yLmFzQXJyYXkoKSxcclxuICAgICAgICAgICAgICAgICAgICBzaGVlblJvdWdobmVzc0ZhY3RvcjogYmFieWxvbk1hdGVyaWFsLnNoZWVuLnJvdWdobmVzcyA/PyAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGhhc1RleHR1cmVzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzaGVlbkluZm8uc2hlZW5Db2xvclRleHR1cmUgIT09IG51bGwgfHwgc2hlZW5JbmZvLnNoZWVuUm91Z2huZXNzVGV4dHVyZSAhPT0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsLnNoZWVuLnRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaGVlbkluZm8uc2hlZW5Db2xvclRleHR1cmUgPSB0aGlzLl9leHBvcnRlci5fZ2xURk1hdGVyaWFsRXhwb3J0ZXIuX2dldFRleHR1cmVJbmZvKGJhYnlsb25NYXRlcmlhbC5zaGVlbi50ZXh0dXJlKSA/PyB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbC5zaGVlbi50ZXh0dXJlUm91Z2huZXNzICYmICFiYWJ5bG9uTWF0ZXJpYWwuc2hlZW4udXNlUm91Z2huZXNzRnJvbU1haW5UZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hlZW5JbmZvLnNoZWVuUm91Z2huZXNzVGV4dHVyZSA9IHRoaXMuX2V4cG9ydGVyLl9nbFRGTWF0ZXJpYWxFeHBvcnRlci5fZ2V0VGV4dHVyZUluZm8oYmFieWxvbk1hdGVyaWFsLnNoZWVuLnRleHR1cmVSb3VnaG5lc3MpID8/IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYmFieWxvbk1hdGVyaWFsLnNoZWVuLnRleHR1cmUgJiYgYmFieWxvbk1hdGVyaWFsLnNoZWVuLnVzZVJvdWdobmVzc0Zyb21NYWluVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNoZWVuSW5mby5zaGVlblJvdWdobmVzc1RleHR1cmUgPSB0aGlzLl9leHBvcnRlci5fZ2xURk1hdGVyaWFsRXhwb3J0ZXIuX2dldFRleHR1cmVJbmZvKGJhYnlsb25NYXRlcmlhbC5zaGVlbi50ZXh0dXJlKSA/PyB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbm9kZS5leHRlbnNpb25zW05BTUVdID0gc2hlZW5JbmZvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc29sdmUobm9kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbl9FeHBvcnRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAoZXhwb3J0ZXIpID0+IG5ldyBLSFJfbWF0ZXJpYWxzX3NoZWVuKGV4cG9ydGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgSU1hdGVyaWFsLCBJS0hSTWF0ZXJpYWxzU3BlY3VsYXIgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB0eXBlIHsgSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlckV4dGVuc2lvblwiO1xyXG5pbXBvcnQgeyBfRXhwb3J0ZXIgfSBmcm9tIFwiLi4vZ2xURkV4cG9ydGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgUEJSTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvUEJSL3Bick1hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgQmFzZVRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvYmFzZVRleHR1cmVcIjtcclxuXHJcbmNvbnN0IE5BTUUgPSBcIktIUl9tYXRlcmlhbHNfc3BlY3VsYXJcIjtcclxuXHJcbi8qKlxyXG4gKiBbU3BlY2lmaWNhdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL0tocm9ub3NHcm91cC9nbFRGL2Jsb2IvbWFpbi9leHRlbnNpb25zLzIuMC9LaHJvbm9zL0tIUl9tYXRlcmlhbHNfc3BlY3VsYXIvUkVBRE1FLm1kKVxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY2xhc3MgS0hSX21hdGVyaWFsc19zcGVjdWxhciBpbXBsZW1lbnRzIElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB7XHJcbiAgICAvKiogTmFtZSBvZiB0aGlzIGV4dGVuc2lvbiAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgZW5hYmxlZCAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIC8qKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgcmVxdWlyZWQgKi9cclxuICAgIHB1YmxpYyByZXF1aXJlZCA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX2V4cG9ydGVyOiBfRXhwb3J0ZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfd2FzVXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGV4cG9ydGVyOiBfRXhwb3J0ZXIpIHtcclxuICAgICAgICB0aGlzLl9leHBvcnRlciA9IGV4cG9ydGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEaXNwb3NlICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHt9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGdldCB3YXNVc2VkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93YXNVc2VkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWZ0ZXIgZXhwb3J0aW5nIGEgbWF0ZXJpYWwsIGRlYWwgd2l0aCB0aGUgYWRkaXRpb25hbCB0ZXh0dXJlc1xyXG4gICAgICogQHBhcmFtIGNvbnRleHQgR0xURiBjb250ZXh0IG9mIHRoZSBtYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIG5vZGUgZXhwb3J0ZWQgR0xURiBub2RlXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvbk1hdGVyaWFsIGNvcnJlc3BvbmRpbmcgYmFieWxvbiBtYXRlcmlhbFxyXG4gICAgICogQHJldHVybnMgYXJyYXkgb2YgYWRkaXRpb25hbCB0ZXh0dXJlcyB0byBleHBvcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBvc3RFeHBvcnRNYXRlcmlhbEFkZGl0aW9uYWxUZXh0dXJlcz8oY29udGV4dDogc3RyaW5nLCBub2RlOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBCYXNlVGV4dHVyZVtdIHtcclxuICAgICAgICBjb25zdCBhZGRpdGlvbmFsVGV4dHVyZXM6IEJhc2VUZXh0dXJlW10gPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0V4dGVuc2lvbkVuYWJsZWQoYmFieWxvbk1hdGVyaWFsKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbC5tZXRhbGxpY1JlZmxlY3RhbmNlVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxUZXh0dXJlcy5wdXNoKGJhYnlsb25NYXRlcmlhbC5tZXRhbGxpY1JlZmxlY3RhbmNlVGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsLnJlZmxlY3RhbmNlVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxUZXh0dXJlcy5wdXNoKGJhYnlsb25NYXRlcmlhbC5yZWZsZWN0YW5jZVRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFkZGl0aW9uYWxUZXh0dXJlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFkZGl0aW9uYWxUZXh0dXJlcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pc0V4dGVuc2lvbkVuYWJsZWQobWF0OiBQQlJNYXRlcmlhbCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIFRoaXMgZXh0ZW5zaW9uIG11c3Qgbm90IGJlIHVzZWQgb24gYSBtYXRlcmlhbCB0aGF0IGFsc28gdXNlcyBLSFJfbWF0ZXJpYWxzX3VubGl0XHJcbiAgICAgICAgaWYgKG1hdC51bmxpdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIChtYXQubWV0YWxsaWNGMEZhY3RvciAhPSB1bmRlZmluZWQgJiYgbWF0Lm1ldGFsbGljRjBGYWN0b3IgIT0gMS4wKSB8fFxyXG4gICAgICAgICAgICAobWF0Lm1ldGFsbGljUmVmbGVjdGFuY2VDb2xvciAhPSB1bmRlZmluZWQgJiYgIW1hdC5tZXRhbGxpY1JlZmxlY3RhbmNlQ29sb3IuZXF1YWxzRmxvYXRzKDEuMCwgMS4wLCAxLjApKSB8fFxyXG4gICAgICAgICAgICB0aGlzLl9oYXNUZXh0dXJlc0V4dGVuc2lvbihtYXQpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9oYXNUZXh0dXJlc0V4dGVuc2lvbihtYXQ6IFBCUk1hdGVyaWFsKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIG1hdC5tZXRhbGxpY1JlZmxlY3RhbmNlVGV4dHVyZSAhPSBudWxsIHx8IG1hdC5yZWZsZWN0YW5jZVRleHR1cmUgIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFmdGVyIGV4cG9ydGluZyBhIG1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBHTFRGIGNvbnRleHQgb2YgdGhlIG1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gbm9kZSBleHBvcnRlZCBHTFRGIG5vZGVcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uTWF0ZXJpYWwgY29ycmVzcG9uZGluZyBiYWJ5bG9uIG1hdGVyaWFsXHJcbiAgICAgKiBAcmV0dXJucyBwcm9taXNlLCByZXNvbHZlcyB3aXRoIHRoZSBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9zdEV4cG9ydE1hdGVyaWFsQXN5bmM/KGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogUHJvbWlzZTxJTWF0ZXJpYWw+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsICYmIHRoaXMuX2lzRXh0ZW5zaW9uRW5hYmxlZChiYWJ5bG9uTWF0ZXJpYWwpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93YXNVc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBub2RlLmV4dGVuc2lvbnMgPSBub2RlLmV4dGVuc2lvbnMgfHwge307XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgbWV0YWxsaWNSZWZsZWN0YW5jZVRleHR1cmUgPSB0aGlzLl9leHBvcnRlci5fZ2xURk1hdGVyaWFsRXhwb3J0ZXIuX2dldFRleHR1cmVJbmZvKGJhYnlsb25NYXRlcmlhbC5tZXRhbGxpY1JlZmxlY3RhbmNlVGV4dHVyZSkgPz8gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmbGVjdGFuY2VUZXh0dXJlID0gdGhpcy5fZXhwb3J0ZXIuX2dsVEZNYXRlcmlhbEV4cG9ydGVyLl9nZXRUZXh0dXJlSW5mbyhiYWJ5bG9uTWF0ZXJpYWwucmVmbGVjdGFuY2VUZXh0dXJlKSA/PyB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXRhbGxpY0YwRmFjdG9yID0gYmFieWxvbk1hdGVyaWFsLm1ldGFsbGljRjBGYWN0b3IgPT0gMS4wID8gdW5kZWZpbmVkIDogYmFieWxvbk1hdGVyaWFsLm1ldGFsbGljRjBGYWN0b3I7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXRhbGxpY1JlZmxlY3RhbmNlQ29sb3IgPSBiYWJ5bG9uTWF0ZXJpYWwubWV0YWxsaWNSZWZsZWN0YW5jZUNvbG9yLmVxdWFsc0Zsb2F0cygxLjAsIDEuMCwgMS4wKVxyXG4gICAgICAgICAgICAgICAgICAgID8gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgOiBiYWJ5bG9uTWF0ZXJpYWwubWV0YWxsaWNSZWZsZWN0YW5jZUNvbG9yLmFzQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGVjdWxhckluZm86IElLSFJNYXRlcmlhbHNTcGVjdWxhciA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzcGVjdWxhckZhY3RvcjogbWV0YWxsaWNGMEZhY3RvcixcclxuICAgICAgICAgICAgICAgICAgICBzcGVjdWxhclRleHR1cmU6IG1ldGFsbGljUmVmbGVjdGFuY2VUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwZWN1bGFyQ29sb3JGYWN0b3I6IG1ldGFsbGljUmVmbGVjdGFuY2VDb2xvcixcclxuICAgICAgICAgICAgICAgICAgICBzcGVjdWxhckNvbG9yVGV4dHVyZTogcmVmbGVjdGFuY2VUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgICAgIGhhc1RleHR1cmVzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYXNUZXh0dXJlc0V4dGVuc2lvbihiYWJ5bG9uTWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5leHRlbnNpb25zW05BTUVdID0gc3BlY3VsYXJJbmZvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc29sdmUobm9kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbl9FeHBvcnRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAoZXhwb3J0ZXIpID0+IG5ldyBLSFJfbWF0ZXJpYWxzX3NwZWN1bGFyKGV4cG9ydGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgSU1hdGVyaWFsLCBJS0hSTWF0ZXJpYWxzVHJhbnNtaXNzaW9uIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJbWFnZU1pbWVUeXBlIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgX0V4cG9ydGVyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFBCUk1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJNYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2Jhc2VUZXh0dXJlXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JlL01pc2MvbG9nZ2VyXCI7XHJcblxyXG5jb25zdCBOQU1FID0gXCJLSFJfbWF0ZXJpYWxzX3RyYW5zbWlzc2lvblwiO1xyXG5cclxuLyoqXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvYmxvYi9tYWluL2V4dGVuc2lvbnMvMi4wL0tocm9ub3MvS0hSX21hdGVyaWFsc190cmFuc21pc3Npb24vUkVBRE1FLm1kKVxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY2xhc3MgS0hSX21hdGVyaWFsc190cmFuc21pc3Npb24gaW1wbGVtZW50cyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIge1xyXG4gICAgLyoqIE5hbWUgb2YgdGhpcyBleHRlbnNpb24gKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIHJlcXVpcmVkICovXHJcbiAgICBwdWJsaWMgcmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF9leHBvcnRlcjogX0V4cG9ydGVyO1xyXG5cclxuICAgIHByaXZhdGUgX3dhc1VzZWQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihleHBvcnRlcjogX0V4cG9ydGVyKSB7XHJcbiAgICAgICAgdGhpcy5fZXhwb3J0ZXIgPSBleHBvcnRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKiogRGlzcG9zZSAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7fVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBnZXQgd2FzVXNlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2FzVXNlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFmdGVyIGV4cG9ydGluZyBhIG1hdGVyaWFsLCBkZWFsIHdpdGggYWRkaXRpb25hbCB0ZXh0dXJlc1xyXG4gICAgICogQHBhcmFtIGNvbnRleHQgR0xURiBjb250ZXh0IG9mIHRoZSBtYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIG5vZGUgZXhwb3J0ZWQgR0xURiBub2RlXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvbk1hdGVyaWFsIGNvcnJlc3BvbmRpbmcgYmFieWxvbiBtYXRlcmlhbFxyXG4gICAgICogQHJldHVybnMgYXJyYXkgb2YgYWRkaXRpb25hbCB0ZXh0dXJlcyB0byBleHBvcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBvc3RFeHBvcnRNYXRlcmlhbEFkZGl0aW9uYWxUZXh0dXJlcz8oY29udGV4dDogc3RyaW5nLCBub2RlOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBCYXNlVGV4dHVyZVtdIHtcclxuICAgICAgICBjb25zdCBhZGRpdGlvbmFsVGV4dHVyZXM6IEJhc2VUZXh0dXJlW10gPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0V4dGVuc2lvbkVuYWJsZWQoYmFieWxvbk1hdGVyaWFsKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbC5zdWJTdXJmYWNlLnRoaWNrbmVzc1RleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVGV4dHVyZXMucHVzaChiYWJ5bG9uTWF0ZXJpYWwuc3ViU3VyZmFjZS50aGlja25lc3NUZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBhZGRpdGlvbmFsVGV4dHVyZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhZGRpdGlvbmFsVGV4dHVyZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNFeHRlbnNpb25FbmFibGVkKG1hdDogUEJSTWF0ZXJpYWwpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBUaGlzIGV4dGVuc2lvbiBtdXN0IG5vdCBiZSB1c2VkIG9uIGEgbWF0ZXJpYWwgdGhhdCBhbHNvIHVzZXMgS0hSX21hdGVyaWFsc191bmxpdFxyXG4gICAgICAgIGlmIChtYXQudW5saXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdWJzID0gbWF0LnN1YlN1cmZhY2U7XHJcbiAgICAgICAgcmV0dXJuIChzdWJzLmlzUmVmcmFjdGlvbkVuYWJsZWQgJiYgc3Vicy5yZWZyYWN0aW9uSW50ZW5zaXR5ICE9IHVuZGVmaW5lZCAmJiBzdWJzLnJlZnJhY3Rpb25JbnRlbnNpdHkgIT0gMCkgfHwgdGhpcy5faGFzVGV4dHVyZXNFeHRlbnNpb24obWF0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9oYXNUZXh0dXJlc0V4dGVuc2lvbihtYXQ6IFBCUk1hdGVyaWFsKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIG1hdC5zdWJTdXJmYWNlLnJlZnJhY3Rpb25JbnRlbnNpdHlUZXh0dXJlICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZnRlciBleHBvcnRpbmcgYSBtYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgR0xURiBjb250ZXh0IG9mIHRoZSBtYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIG5vZGUgZXhwb3J0ZWQgR0xURiBub2RlXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvbk1hdGVyaWFsIGNvcnJlc3BvbmRpbmcgYmFieWxvbiBtYXRlcmlhbFxyXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiBzdWNjZXNzZnVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBwb3N0RXhwb3J0TWF0ZXJpYWxBc3luYz8oY29udGV4dDogc3RyaW5nLCBub2RlOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBQcm9taXNlPElNYXRlcmlhbD4ge1xyXG4gICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCAmJiB0aGlzLl9pc0V4dGVuc2lvbkVuYWJsZWQoYmFieWxvbk1hdGVyaWFsKSkge1xyXG4gICAgICAgICAgICB0aGlzLl93YXNVc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN1YlN1cmZhY2UgPSBiYWJ5bG9uTWF0ZXJpYWwuc3ViU3VyZmFjZTtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNtaXNzaW9uRmFjdG9yID0gc3ViU3VyZmFjZS5yZWZyYWN0aW9uSW50ZW5zaXR5ID09PSAwID8gdW5kZWZpbmVkIDogc3ViU3VyZmFjZS5yZWZyYWN0aW9uSW50ZW5zaXR5O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgdm9sdW1lSW5mbzogSUtIUk1hdGVyaWFsc1RyYW5zbWlzc2lvbiA9IHtcclxuICAgICAgICAgICAgICAgIHRyYW5zbWlzc2lvbkZhY3RvcjogdHJhbnNtaXNzaW9uRmFjdG9yLFxyXG4gICAgICAgICAgICAgICAgaGFzVGV4dHVyZXM6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faGFzVGV4dHVyZXNFeHRlbnNpb24oYmFieWxvbk1hdGVyaWFsKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoc3ViU3VyZmFjZS5yZWZyYWN0aW9uSW50ZW5zaXR5VGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1YlN1cmZhY2UudXNlR2x0ZlN0eWxlVGV4dHVyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0cmFuc21pc3Npb25UZXh0dXJlID0gYXdhaXQgdGhpcy5fZXhwb3J0ZXIuX2dsVEZNYXRlcmlhbEV4cG9ydGVyLl9leHBvcnRUZXh0dXJlSW5mb0FzeW5jKHN1YlN1cmZhY2UucmVmcmFjdGlvbkludGVuc2l0eVRleHR1cmUsIEltYWdlTWltZVR5cGUuUE5HKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNtaXNzaW9uVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2b2x1bWVJbmZvLnRyYW5zbWlzc2lvblRleHR1cmUgPSB0cmFuc21pc3Npb25UZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLldhcm4oYCR7Y29udGV4dH06IEV4cG9ydGluZyBhIHN1YnN1cmZhY2UgcmVmcmFjdGlvbiBpbnRlbnNpdHkgdGV4dHVyZSB3aXRob3V0IFxcYHVzZUdsdGZTdHlsZVRleHR1cmVzXFxgIGlzIG5vdCBzdXBwb3J0ZWRgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbm9kZS5leHRlbnNpb25zIHx8PSB7fTtcclxuICAgICAgICAgICAgbm9kZS5leHRlbnNpb25zW05BTUVdID0gdm9sdW1lSW5mbztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG59XHJcblxyXG5fRXhwb3J0ZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKGV4cG9ydGVyKSA9PiBuZXcgS0hSX21hdGVyaWFsc190cmFuc21pc3Npb24oZXhwb3J0ZXIpKTtcclxuIiwiaW1wb3J0IHR5cGUgeyBJTWF0ZXJpYWwgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB0eXBlIHsgSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlckV4dGVuc2lvblwiO1xyXG5pbXBvcnQgeyBfRXhwb3J0ZXIgfSBmcm9tIFwiLi4vZ2xURkV4cG9ydGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgUEJSTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvUEJSL3Bick1hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFN0YW5kYXJkTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvc3RhbmRhcmRNYXRlcmlhbFwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX21hdGVyaWFsc191bmxpdFwiO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY2xhc3MgS0hSX21hdGVyaWFsc191bmxpdCBpbXBsZW1lbnRzIElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB7XHJcbiAgICAvKiogTmFtZSBvZiB0aGlzIGV4dGVuc2lvbiAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgZW5hYmxlZCAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIC8qKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgcmVxdWlyZWQgKi9cclxuICAgIHB1YmxpYyByZXF1aXJlZCA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX3dhc1VzZWQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGdldCB3YXNVc2VkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93YXNVc2VkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge31cclxuXHJcbiAgICBwdWJsaWMgcG9zdEV4cG9ydE1hdGVyaWFsQXN5bmM/KGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogUHJvbWlzZTxJTWF0ZXJpYWw+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgbGV0IHVubGl0TWF0ZXJpYWwgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgdW5saXRNYXRlcmlhbCA9IGJhYnlsb25NYXRlcmlhbC51bmxpdDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBTdGFuZGFyZE1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICB1bmxpdE1hdGVyaWFsID0gYmFieWxvbk1hdGVyaWFsLmRpc2FibGVMaWdodGluZztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHVubGl0TWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dhc1VzZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub2RlLmV4dGVuc2lvbnMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9ucyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9uc1tOQU1FXSA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXNvbHZlKG5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5fRXhwb3J0ZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKCkgPT4gbmV3IEtIUl9tYXRlcmlhbHNfdW5saXQoKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgSU1hdGVyaWFsLCBJS0hSTWF0ZXJpYWxzVm9sdW1lIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgX0V4cG9ydGVyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFBCUk1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJNYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2Jhc2VUZXh0dXJlXCI7XHJcbmltcG9ydCB7IENvbG9yMyB9IGZyb20gXCJjb3JlL01hdGhzL21hdGguY29sb3JcIjtcclxuXHJcbmNvbnN0IE5BTUUgPSBcIktIUl9tYXRlcmlhbHNfdm9sdW1lXCI7XHJcblxyXG4vKipcclxuICogW1NwZWNpZmljYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi9ibG9iL21haW4vZXh0ZW5zaW9ucy8yLjAvS2hyb25vcy9LSFJfbWF0ZXJpYWxzX3ZvbHVtZS9SRUFETUUubWQpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBLSFJfbWF0ZXJpYWxzX3ZvbHVtZSBpbXBsZW1lbnRzIElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB7XHJcbiAgICAvKiogTmFtZSBvZiB0aGlzIGV4dGVuc2lvbiAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgZW5hYmxlZCAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIC8qKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgcmVxdWlyZWQgKi9cclxuICAgIHB1YmxpYyByZXF1aXJlZCA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX2V4cG9ydGVyOiBfRXhwb3J0ZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfd2FzVXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGV4cG9ydGVyOiBfRXhwb3J0ZXIpIHtcclxuICAgICAgICB0aGlzLl9leHBvcnRlciA9IGV4cG9ydGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge31cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZ2V0IHdhc1VzZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dhc1VzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZnRlciBleHBvcnRpbmcgYSBtYXRlcmlhbCwgZGVhbCB3aXRoIGFkZGl0aW9uYWwgdGV4dHVyZXNcclxuICAgICAqIEBwYXJhbSBjb250ZXh0IEdMVEYgY29udGV4dCBvZiB0aGUgbWF0ZXJpYWxcclxuICAgICAqIEBwYXJhbSBub2RlIGV4cG9ydGVkIEdMVEYgbm9kZVxyXG4gICAgICogQHBhcmFtIGJhYnlsb25NYXRlcmlhbCBjb3JyZXNwb25kaW5nIGJhYnlsb24gbWF0ZXJpYWxcclxuICAgICAqIEByZXR1cm5zIGFycmF5IG9mIGFkZGl0aW9uYWwgdGV4dHVyZXMgdG8gZXhwb3J0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwb3N0RXhwb3J0TWF0ZXJpYWxBZGRpdGlvbmFsVGV4dHVyZXM/KGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogQmFzZVRleHR1cmVbXSB7XHJcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbFRleHR1cmVzOiBCYXNlVGV4dHVyZVtdID0gW107XHJcblxyXG4gICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNFeHRlbnNpb25FbmFibGVkKGJhYnlsb25NYXRlcmlhbCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwuc3ViU3VyZmFjZS50aGlja25lc3NUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFRleHR1cmVzLnB1c2goYmFieWxvbk1hdGVyaWFsLnN1YlN1cmZhY2UudGhpY2tuZXNzVGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWRkaXRpb25hbFRleHR1cmVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWRkaXRpb25hbFRleHR1cmVzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2lzRXh0ZW5zaW9uRW5hYmxlZChtYXQ6IFBCUk1hdGVyaWFsKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gVGhpcyBleHRlbnNpb24gbXVzdCBub3QgYmUgdXNlZCBvbiBhIG1hdGVyaWFsIHRoYXQgYWxzbyB1c2VzIEtIUl9tYXRlcmlhbHNfdW5saXRcclxuICAgICAgICBpZiAobWF0LnVubGl0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3VicyA9IG1hdC5zdWJTdXJmYWNlO1xyXG4gICAgICAgIC8vIHRoaXMgZXh0ZW5zaW9uIHJlcXVpcmVzIGVpdGhlciB0aGUgS0hSX21hdGVyaWFsc190cmFuc21pc3Npb24gb3IgS0hSX21hdGVyaWFsc19kaWZmdXNlX3RyYW5zbWlzc2lvbiBleHRlbnNpb25zLlxyXG4gICAgICAgIGlmICghc3Vicy5pc1JlZnJhY3Rpb25FbmFibGVkICYmICFzdWJzLmlzVHJhbnNsdWNlbmN5RW5hYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIChzdWJzLm1heGltdW1UaGlja25lc3MgIT0gdW5kZWZpbmVkICYmIHN1YnMubWF4aW11bVRoaWNrbmVzcyAhPSAwKSB8fFxyXG4gICAgICAgICAgICAoc3Vicy50aW50Q29sb3JBdERpc3RhbmNlICE9IHVuZGVmaW5lZCAmJiBzdWJzLnRpbnRDb2xvckF0RGlzdGFuY2UgIT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKSB8fFxyXG4gICAgICAgICAgICAoc3Vicy50aW50Q29sb3IgIT0gdW5kZWZpbmVkICYmIHN1YnMudGludENvbG9yICE9IENvbG9yMy5XaGl0ZSgpKSB8fFxyXG4gICAgICAgICAgICB0aGlzLl9oYXNUZXh0dXJlc0V4dGVuc2lvbihtYXQpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9oYXNUZXh0dXJlc0V4dGVuc2lvbihtYXQ6IFBCUk1hdGVyaWFsKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIG1hdC5zdWJTdXJmYWNlLnRoaWNrbmVzc1RleHR1cmUgIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFmdGVyIGV4cG9ydGluZyBhIG1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBHTFRGIGNvbnRleHQgb2YgdGhlIG1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gbm9kZSBleHBvcnRlZCBHTFRGIG5vZGVcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uTWF0ZXJpYWwgY29ycmVzcG9uZGluZyBiYWJ5bG9uIG1hdGVyaWFsXHJcbiAgICAgKiBAcmV0dXJucyBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgdXBkYXRlZCBub2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwb3N0RXhwb3J0TWF0ZXJpYWxBc3luYz8oY29udGV4dDogc3RyaW5nLCBub2RlOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBQcm9taXNlPElNYXRlcmlhbD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwgJiYgdGhpcy5faXNFeHRlbnNpb25FbmFibGVkKGJhYnlsb25NYXRlcmlhbCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dhc1VzZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnMgPSBiYWJ5bG9uTWF0ZXJpYWwuc3ViU3VyZmFjZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRoaWNrbmVzc0ZhY3RvciA9IHN1YnMubWF4aW11bVRoaWNrbmVzcyA9PSAwID8gdW5kZWZpbmVkIDogc3Vicy5tYXhpbXVtVGhpY2tuZXNzO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhpY2tuZXNzVGV4dHVyZSA9IHRoaXMuX2V4cG9ydGVyLl9nbFRGTWF0ZXJpYWxFeHBvcnRlci5fZ2V0VGV4dHVyZUluZm8oc3Vicy50aGlja25lc3NUZXh0dXJlKSA/PyB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRlbnVhdGlvbkRpc3RhbmNlID0gc3Vicy50aW50Q29sb3JBdERpc3RhbmNlID09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSA/IHVuZGVmaW5lZCA6IHN1YnMudGludENvbG9yQXREaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGF0dGVudWF0aW9uQ29sb3IgPSBzdWJzLnRpbnRDb2xvci5lcXVhbHNGbG9hdHMoMS4wLCAxLjAsIDEuMCkgPyB1bmRlZmluZWQgOiBzdWJzLnRpbnRDb2xvci5hc0FycmF5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgdm9sdW1lSW5mbzogSUtIUk1hdGVyaWFsc1ZvbHVtZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlja25lc3NGYWN0b3I6IHRoaWNrbmVzc0ZhY3RvcixcclxuICAgICAgICAgICAgICAgICAgICB0aGlja25lc3NUZXh0dXJlOiB0aGlja25lc3NUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dGVudWF0aW9uRGlzdGFuY2U6IGF0dGVudWF0aW9uRGlzdGFuY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW51YXRpb25Db2xvcjogYXR0ZW51YXRpb25Db2xvcixcclxuICAgICAgICAgICAgICAgICAgICBoYXNUZXh0dXJlczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faGFzVGV4dHVyZXNFeHRlbnNpb24oYmFieWxvbk1hdGVyaWFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9ucyA9IG5vZGUuZXh0ZW5zaW9ucyB8fCB7fTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9uc1tOQU1FXSA9IHZvbHVtZUluZm87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzb2x2ZShub2RlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuX0V4cG9ydGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsIChleHBvcnRlcikgPT4gbmV3IEtIUl9tYXRlcmlhbHNfdm9sdW1lKGV4cG9ydGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgSVRleHR1cmVJbmZvLCBJS0hSVGV4dHVyZVRyYW5zZm9ybSB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiY29yZS9NaXNjL3Rvb2xzXCI7XHJcbmltcG9ydCB0eXBlIHsgVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy90ZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgX0V4cG9ydGVyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlclwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX3RleHR1cmVfdHJhbnNmb3JtXCI7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBLSFJfdGV4dHVyZV90cmFuc2Zvcm0gaW1wbGVtZW50cyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIge1xyXG4gICAgLyoqIE5hbWUgb2YgdGhpcyBleHRlbnNpb24gKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIHJlcXVpcmVkICovXHJcbiAgICBwdWJsaWMgcmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBnbFRGIGV4cG9ydGVyICovXHJcbiAgICBwcml2YXRlIF93YXNVc2VkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge31cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZ2V0IHdhc1VzZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dhc1VzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvc3RFeHBvcnRUZXh0dXJlPyhjb250ZXh0OiBzdHJpbmcsIHRleHR1cmVJbmZvOiBJVGV4dHVyZUluZm8sIGJhYnlsb25UZXh0dXJlOiBUZXh0dXJlKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgY2FuVXNlRXh0ZW5zaW9uID1cclxuICAgICAgICAgICAgYmFieWxvblRleHR1cmUgJiZcclxuICAgICAgICAgICAgKChiYWJ5bG9uVGV4dHVyZS51QW5nID09PSAwICYmIGJhYnlsb25UZXh0dXJlLndBbmcgPT09IDAgJiYgYmFieWxvblRleHR1cmUudkFuZyA9PT0gMCkgfHxcclxuICAgICAgICAgICAgICAgIChiYWJ5bG9uVGV4dHVyZS51Um90YXRpb25DZW50ZXIgPT09IDAgJiYgYmFieWxvblRleHR1cmUudlJvdGF0aW9uQ2VudGVyID09PSAwKSk7XHJcblxyXG4gICAgICAgIGlmIChjYW5Vc2VFeHRlbnNpb24pIHtcclxuICAgICAgICAgICAgY29uc3QgdGV4dHVyZVRyYW5zZm9ybTogSUtIUlRleHR1cmVUcmFuc2Zvcm0gPSB7fTtcclxuICAgICAgICAgICAgbGV0IHRyYW5zZm9ybUlzUmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uVGV4dHVyZS51T2Zmc2V0ICE9PSAwIHx8IGJhYnlsb25UZXh0dXJlLnZPZmZzZXQgIT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRleHR1cmVUcmFuc2Zvcm0ub2Zmc2V0ID0gW2JhYnlsb25UZXh0dXJlLnVPZmZzZXQsIGJhYnlsb25UZXh0dXJlLnZPZmZzZXRdO1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtSXNSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uVGV4dHVyZS51U2NhbGUgIT09IDEgfHwgYmFieWxvblRleHR1cmUudlNjYWxlICE9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlVHJhbnNmb3JtLnNjYWxlID0gW2JhYnlsb25UZXh0dXJlLnVTY2FsZSwgYmFieWxvblRleHR1cmUudlNjYWxlXTtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybUlzUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYmFieWxvblRleHR1cmUud0FuZyAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZVRyYW5zZm9ybS5yb3RhdGlvbiA9IC1iYWJ5bG9uVGV4dHVyZS53QW5nO1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtSXNSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uVGV4dHVyZS5jb29yZGluYXRlc0luZGV4ICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlVHJhbnNmb3JtLnRleENvb3JkID0gYmFieWxvblRleHR1cmUuY29vcmRpbmF0ZXNJbmRleDtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybUlzUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRyYW5zZm9ybUlzUmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fd2FzVXNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICghdGV4dHVyZUluZm8uZXh0ZW5zaW9ucykge1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZUluZm8uZXh0ZW5zaW9ucyA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRleHR1cmVJbmZvLmV4dGVuc2lvbnNbTkFNRV0gPSB0ZXh0dXJlVHJhbnNmb3JtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJlRXhwb3J0VGV4dHVyZUFzeW5jKGNvbnRleHQ6IHN0cmluZywgYmFieWxvblRleHR1cmU6IFRleHR1cmUpOiBQcm9taXNlPE51bGxhYmxlPFRleHR1cmU+PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2NlbmUgPSBiYWJ5bG9uVGV4dHVyZS5nZXRTY2VuZSgpO1xyXG4gICAgICAgICAgICBpZiAoIXNjZW5lKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoYCR7Y29udGV4dH06IFwic2NlbmVcIiBpcyBub3QgZGVmaW5lZCBmb3IgQmFieWxvbiB0ZXh0dXJlICR7YmFieWxvblRleHR1cmUubmFtZX0hYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAqIFRoZSBLSFJfdGV4dHVyZV90cmFuc2Zvcm0gc2NoZW1hIG9ubHkgc3VwcG9ydHMgdyByb3RhdGlvbiBhcm91bmQgdGhlIG9yaWdpbi5cclxuICAgICAgICAgICAgICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi90cmVlL21haW4vZXh0ZW5zaW9ucy8yLjAvS2hyb25vcy9LSFJfdGV4dHVyZV90cmFuc2Zvcm0jZ2x0Zi1zY2hlbWEtdXBkYXRlcy5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uVGV4dHVyZS51QW5nICE9PSAwIHx8IGJhYnlsb25UZXh0dXJlLnZBbmcgIT09IDApIHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLldhcm4oYCR7Y29udGV4dH06IFRleHR1cmUgJHtiYWJ5bG9uVGV4dHVyZS5uYW1lfSB3aXRoIHJvdGF0aW9uIGluIHRoZSB1IG9yIHYgYXhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIGdsVEYuYCk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGJhYnlsb25UZXh0dXJlLndBbmcgIT09IDAgJiYgKGJhYnlsb25UZXh0dXJlLnVSb3RhdGlvbkNlbnRlciAhPT0gMCB8fCBiYWJ5bG9uVGV4dHVyZS52Um90YXRpb25DZW50ZXIgIT09IDApKSB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5XYXJuKGAke2NvbnRleHR9OiBUZXh0dXJlICR7YmFieWxvblRleHR1cmUubmFtZX0gd2l0aCByb3RhdGlvbiBub3QgY2VudGVyZWQgYXQgdGhlIG9yaWdpbiBjYW5ub3QgYmUgZXhwb3J0ZWQgd2l0aCAke05BTUV9YCk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShiYWJ5bG9uVGV4dHVyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuX0V4cG9ydGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsICgpID0+IG5ldyBLSFJfdGV4dHVyZV90cmFuc2Zvcm0oKSk7XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL0tIUl90ZXh0dXJlX3RyYW5zZm9ybVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9LSFJfbGlnaHRzX3B1bmN0dWFsXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0tIUl9tYXRlcmlhbHNfY2xlYXJjb2F0XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0tIUl9tYXRlcmlhbHNfaXJpZGVzY2VuY2VcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vS0hSX21hdGVyaWFsc19hbmlzb3Ryb3B5XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0tIUl9tYXRlcmlhbHNfc2hlZW5cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vS0hSX21hdGVyaWFsc191bmxpdFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9LSFJfbWF0ZXJpYWxzX2lvclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9LSFJfbWF0ZXJpYWxzX3NwZWN1bGFyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0tIUl9tYXRlcmlhbHNfdm9sdW1lXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0tIUl9tYXRlcmlhbHNfZGlzcGVyc2lvblwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9LSFJfbWF0ZXJpYWxzX3RyYW5zbWlzc2lvblwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9FWFRfbWVzaF9ncHVfaW5zdGFuY2luZ1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9LSFJfbWF0ZXJpYWxzX2VtaXNzaXZlX3N0cmVuZ3RoXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0tIUl9tYXRlcmlhbHNfZGlmZnVzZV90cmFuc21pc3Npb25cIjtcclxuIiwiaW1wb3J0IHR5cGUgeyBJQW5pbWF0aW9uLCBJTm9kZSwgSUJ1ZmZlclZpZXcsIElBY2Nlc3NvciwgSUFuaW1hdGlvblNhbXBsZXIsIElBbmltYXRpb25DaGFubmVsIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBBbmltYXRpb25TYW1wbGVySW50ZXJwb2xhdGlvbiwgQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsIEFjY2Vzc29yVHlwZSwgQWNjZXNzb3JDb21wb25lbnRUeXBlIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgdHlwZSB7IE5vZGUgfSBmcm9tIFwiY29yZS9ub2RlXCI7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgeyBWZWN0b3IzLCBRdWF0ZXJuaW9uIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC52ZWN0b3JcIjtcclxuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiY29yZS9NaXNjL3Rvb2xzXCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gXCJjb3JlL0FuaW1hdGlvbnMvYW5pbWF0aW9uXCI7XHJcbmltcG9ydCB7IFRyYW5zZm9ybU5vZGUgfSBmcm9tIFwiY29yZS9NZXNoZXMvdHJhbnNmb3JtTm9kZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHsgTW9ycGhUYXJnZXQgfSBmcm9tIFwiY29yZS9Nb3JwaC9tb3JwaFRhcmdldFwiO1xyXG5pbXBvcnQgeyBNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL21lc2hcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgX0JpbmFyeVdyaXRlciB9IGZyb20gXCIuL2dsVEZFeHBvcnRlclwiO1xyXG5pbXBvcnQgeyBfR0xURlV0aWxpdGllcyB9IGZyb20gXCIuL2dsVEZVdGlsaXRpZXNcIjtcclxuaW1wb3J0IHR5cGUgeyBJQW5pbWF0aW9uS2V5IH0gZnJvbSBcImNvcmUvQW5pbWF0aW9ucy9hbmltYXRpb25LZXlcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uS2V5SW50ZXJwb2xhdGlvbiB9IGZyb20gXCJjb3JlL0FuaW1hdGlvbnMvYW5pbWF0aW9uS2V5XCI7XHJcblxyXG5pbXBvcnQgeyBDYW1lcmEgfSBmcm9tIFwiY29yZS9DYW1lcmFzL2NhbWVyYVwiO1xyXG5pbXBvcnQgeyBMaWdodCB9IGZyb20gXCJjb3JlL0xpZ2h0cy9saWdodFwiO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBJbnRlcmZhY2UgdG8gc3RvcmUgYW5pbWF0aW9uIGRhdGEuXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBpbnRlcmZhY2UgX0lBbmltYXRpb25EYXRhIHtcclxuICAgIC8qKlxyXG4gICAgICogS2V5ZnJhbWUgZGF0YS5cclxuICAgICAqL1xyXG4gICAgaW5wdXRzOiBudW1iZXJbXTtcclxuICAgIC8qKlxyXG4gICAgICogVmFsdWUgZGF0YS5cclxuICAgICAqL1xyXG4gICAgb3V0cHV0czogbnVtYmVyW11bXTtcclxuICAgIC8qKlxyXG4gICAgICogQW5pbWF0aW9uIGludGVycG9sYXRpb24gZGF0YS5cclxuICAgICAqL1xyXG4gICAgc2FtcGxlckludGVycG9sYXRpb246IEFuaW1hdGlvblNhbXBsZXJJbnRlcnBvbGF0aW9uO1xyXG4gICAgLyoqXHJcbiAgICAgKiBNaW5pbXVtIGtleWZyYW1lIHZhbHVlLlxyXG4gICAgICovXHJcbiAgICBpbnB1dHNNaW46IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogTWF4aW11bSBrZXlmcmFtZSB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgaW5wdXRzTWF4OiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGludGVyZmFjZSBfSUFuaW1hdGlvbkluZm8ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdGFyZ2V0IGNoYW5uZWwgZm9yIHRoZSBhbmltYXRpb25cclxuICAgICAqL1xyXG4gICAgYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGg6IEFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZ2xURiBhY2Nlc3NvciB0eXBlIGZvciB0aGUgZGF0YS5cclxuICAgICAqL1xyXG4gICAgZGF0YUFjY2Vzc29yVHlwZTogQWNjZXNzb3JUeXBlLlZFQzMgfCBBY2Nlc3NvclR5cGUuVkVDNCB8IEFjY2Vzc29yVHlwZS5TQ0FMQVI7XHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZmllcyBpZiBxdWF0ZXJuaW9ucyBzaG91bGQgYmUgdXNlZC5cclxuICAgICAqL1xyXG4gICAgdXNlUXVhdGVybmlvbjogYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBFbnVtIGZvciBoYW5kbGluZyBpbiB0YW5nZW50IGFuZCBvdXQgdGFuZ2VudC5cclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZW51bSBfVGFuZ2VudFR5cGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZpZXMgdGhhdCBpbnB1dCB0YW5nZW50cyBhcmUgdXNlZC5cclxuICAgICAqL1xyXG4gICAgSU5UQU5HRU5ULFxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZpZXMgdGhhdCBvdXRwdXQgdGFuZ2VudHMgYXJlIHVzZWQuXHJcbiAgICAgKi9cclxuICAgIE9VVFRBTkdFTlQsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICogVXRpbGl0eSBjbGFzcyBmb3IgZ2VuZXJhdGluZyBnbFRGIGFuaW1hdGlvbiBkYXRhIGZyb20gQmFieWxvbkpTLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIF9HTFRGQW5pbWF0aW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lIGlmIGEgbm9kZSBpcyB0cmFuc2Zvcm1hYmxlIC0gaWUgaGFzIHByb3BlcnRpZXMgaXQgc2hvdWxkIGJlIHBhcnQgb2YgYW5pbWF0aW9uIG9mIHRyYW5zZm9ybWF0aW9uLlxyXG4gICAgICogQHBhcmFtIGJhYnlsb25Ob2RlIHRoZSBub2RlIHRvIHRlc3RcclxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgY2FuIGJlIGFuaW1hdGVkLCBmYWxzZSBvdGhlcndpc2UuIEZhbHNlIGlmIHRoZSBwYXJhbWV0ZXIgaXMgbnVsbCBvciB1bmRlZmluZWQuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9Jc1RyYW5zZm9ybWFibGUoYmFieWxvbk5vZGU6IE5vZGUpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gYmFieWxvbk5vZGUgJiYgKGJhYnlsb25Ob2RlIGluc3RhbmNlb2YgVHJhbnNmb3JtTm9kZSB8fCBiYWJ5bG9uTm9kZSBpbnN0YW5jZW9mIENhbWVyYSB8fCBiYWJ5bG9uTm9kZSBpbnN0YW5jZW9mIExpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpZ25vcmVcclxuICAgICAqXHJcbiAgICAgKiBDcmVhdGVzIGdsVEYgY2hhbm5lbCBhbmltYXRpb24gZnJvbSBCYWJ5bG9uSlMgYW5pbWF0aW9uLlxyXG4gICAgICogQHBhcmFtIGJhYnlsb25UcmFuc2Zvcm1Ob2RlIC0gQmFieWxvbkpTIG1lc2guXHJcbiAgICAgKiBAcGFyYW0gYW5pbWF0aW9uIC0gYW5pbWF0aW9uLlxyXG4gICAgICogQHBhcmFtIGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoIC0gVGhlIHRhcmdldCBhbmltYXRpb24gY2hhbm5lbC5cclxuICAgICAqIEBwYXJhbSB1c2VRdWF0ZXJuaW9uIC0gU3BlY2lmaWVzIGlmIHF1YXRlcm5pb25zIGFyZSB1c2VkLlxyXG4gICAgICogQHJldHVybnMgbnVsbGFibGUgSUFuaW1hdGlvbkRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBfQ3JlYXRlTm9kZUFuaW1hdGlvbihcclxuICAgICAgICBiYWJ5bG9uVHJhbnNmb3JtTm9kZTogTm9kZSxcclxuICAgICAgICBhbmltYXRpb246IEFuaW1hdGlvbixcclxuICAgICAgICBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aDogQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsXHJcbiAgICAgICAgdXNlUXVhdGVybmlvbjogYm9vbGVhbixcclxuICAgICAgICBhbmltYXRpb25TYW1wbGVSYXRlOiBudW1iZXJcclxuICAgICk6IE51bGxhYmxlPF9JQW5pbWF0aW9uRGF0YT4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9Jc1RyYW5zZm9ybWFibGUoYmFieWxvblRyYW5zZm9ybU5vZGUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0czogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICAgICAgY29uc3Qgb3V0cHV0czogbnVtYmVyW11bXSA9IFtdO1xyXG4gICAgICAgICAgICBjb25zdCBrZXlGcmFtZXMgPSBhbmltYXRpb24uZ2V0S2V5cygpO1xyXG4gICAgICAgICAgICBjb25zdCBtaW5NYXhLZXlGcmFtZXMgPSBfR0xURkFuaW1hdGlvbi5fQ2FsY3VsYXRlTWluTWF4S2V5RnJhbWVzKGtleUZyYW1lcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGludGVycG9sYXRpb25PckJha2UgPSBfR0xURkFuaW1hdGlvbi5fRGVkdWNlSW50ZXJwb2xhdGlvbihrZXlGcmFtZXMsIGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLCB1c2VRdWF0ZXJuaW9uKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGludGVycG9sYXRpb24gPSBpbnRlcnBvbGF0aW9uT3JCYWtlLmludGVycG9sYXRpb25UeXBlO1xyXG4gICAgICAgICAgICBjb25zdCBzaG91bGRCYWtlQW5pbWF0aW9uID0gaW50ZXJwb2xhdGlvbk9yQmFrZS5zaG91bGRCYWtlQW5pbWF0aW9uO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNob3VsZEJha2VBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIF9HTFRGQW5pbWF0aW9uLl9DcmVhdGVCYWtlZEFuaW1hdGlvbihcclxuICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uVHJhbnNmb3JtTm9kZSxcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluTWF4S2V5RnJhbWVzLm1pbixcclxuICAgICAgICAgICAgICAgICAgICBtaW5NYXhLZXlGcmFtZXMubWF4LFxyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcmFtZVBlclNlY29uZCxcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TYW1wbGVSYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0cyxcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXRzLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbk1heEtleUZyYW1lcyxcclxuICAgICAgICAgICAgICAgICAgICB1c2VRdWF0ZXJuaW9uXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGludGVycG9sYXRpb24gPT09IEFuaW1hdGlvblNhbXBsZXJJbnRlcnBvbGF0aW9uLkxJTkVBUiB8fCBpbnRlcnBvbGF0aW9uID09PSBBbmltYXRpb25TYW1wbGVySW50ZXJwb2xhdGlvbi5TVEVQKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX0dMVEZBbmltYXRpb24uX0NyZWF0ZUxpbmVhck9yU3RlcEFuaW1hdGlvbihiYWJ5bG9uVHJhbnNmb3JtTm9kZSwgYW5pbWF0aW9uLCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCwgaW5wdXRzLCBvdXRwdXRzLCB1c2VRdWF0ZXJuaW9uKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW50ZXJwb2xhdGlvbiA9PT0gQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24uQ1VCSUNTUExJTkUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfR0xURkFuaW1hdGlvbi5fQ3JlYXRlQ3ViaWNTcGxpbmVBbmltYXRpb24oYmFieWxvblRyYW5zZm9ybU5vZGUsIGFuaW1hdGlvbiwgYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsIGlucHV0cywgb3V0cHV0cywgdXNlUXVhdGVybmlvbik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIF9HTFRGQW5pbWF0aW9uLl9DcmVhdGVCYWtlZEFuaW1hdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFieWxvblRyYW5zZm9ybU5vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbk1heEtleUZyYW1lcy5taW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbk1heEtleUZyYW1lcy5tYXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcmFtZVBlclNlY29uZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uU2FtcGxlUmF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5NYXhLZXlGcmFtZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZVF1YXRlcm5pb25cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5wdXRzLmxlbmd0aCAmJiBvdXRwdXRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBfSUFuaW1hdGlvbkRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRzOiBpbnB1dHMsXHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0czogb3V0cHV0cyxcclxuICAgICAgICAgICAgICAgICAgICBzYW1wbGVySW50ZXJwb2xhdGlvbjogaW50ZXJwb2xhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHNNaW46IHNob3VsZEJha2VBbmltYXRpb24gPyBtaW5NYXhLZXlGcmFtZXMubWluIDogVG9vbHMuRmxvYXRSb3VuZChtaW5NYXhLZXlGcmFtZXMubWluIC8gYW5pbWF0aW9uLmZyYW1lUGVyU2Vjb25kKSxcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHNNYXg6IHNob3VsZEJha2VBbmltYXRpb24gPyBtaW5NYXhLZXlGcmFtZXMubWF4IDogVG9vbHMuRmxvYXRSb3VuZChtaW5NYXhLZXlGcmFtZXMubWF4IC8gYW5pbWF0aW9uLmZyYW1lUGVyU2Vjb25kKSxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0RlZHVjZUFuaW1hdGlvbkluZm8oYW5pbWF0aW9uOiBBbmltYXRpb24pOiBOdWxsYWJsZTxfSUFuaW1hdGlvbkluZm8+IHtcclxuICAgICAgICBsZXQgYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGg6IE51bGxhYmxlPEFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoPiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGRhdGFBY2Nlc3NvclR5cGUgPSBBY2Nlc3NvclR5cGUuVkVDMztcclxuICAgICAgICBsZXQgdXNlUXVhdGVybmlvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHByb3BlcnR5ID0gYW5pbWF0aW9uLnRhcmdldFByb3BlcnR5LnNwbGl0KFwiLlwiKTtcclxuICAgICAgICBzd2l0Y2ggKHByb3BlcnR5WzBdKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzY2FsaW5nXCI6IHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoID0gQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGguU0NBTEU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwicG9zaXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGggPSBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aC5UUkFOU0xBVElPTjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJyb3RhdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhQWNjZXNzb3JUeXBlID0gQWNjZXNzb3JUeXBlLlZFQzQ7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCA9IEFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLlJPVEFUSU9OO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcInJvdGF0aW9uUXVhdGVybmlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhQWNjZXNzb3JUeXBlID0gQWNjZXNzb3JUeXBlLlZFQzQ7XHJcbiAgICAgICAgICAgICAgICB1c2VRdWF0ZXJuaW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoID0gQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGguUk9UQVRJT047XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiaW5mbHVlbmNlXCI6IHtcclxuICAgICAgICAgICAgICAgIGRhdGFBY2Nlc3NvclR5cGUgPSBBY2Nlc3NvclR5cGUuU0NBTEFSO1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGggPSBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aC5XRUlHSFRTO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuRXJyb3IoYFVuc3VwcG9ydGVkIGFuaW1hdGFibGUgcHJvcGVydHkgJHtwcm9wZXJ0eVswXX1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGg6IGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLCBkYXRhQWNjZXNzb3JUeXBlOiBkYXRhQWNjZXNzb3JUeXBlLCB1c2VRdWF0ZXJuaW9uOiB1c2VRdWF0ZXJuaW9uIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgVG9vbHMuRXJyb3IoXCJhbmltYXRpb24gY2hhbm5lbCB0YXJnZXQgcGF0aCBhbmQgZGF0YSBhY2Nlc3NvciB0eXBlIGNvdWxkIGJlIGRlZHVjZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICogQ3JlYXRlIG5vZGUgYW5pbWF0aW9ucyBmcm9tIHRoZSB0cmFuc2Zvcm0gbm9kZSBhbmltYXRpb25zXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvbk5vZGVcclxuICAgICAqIEBwYXJhbSBydW50aW1lR0xURkFuaW1hdGlvblxyXG4gICAgICogQHBhcmFtIGlkbGVHTFRGQW5pbWF0aW9uc1xyXG4gICAgICogQHBhcmFtIG5vZGVNYXBcclxuICAgICAqIEBwYXJhbSBub2Rlc1xyXG4gICAgICogQHBhcmFtIGJpbmFyeVdyaXRlclxyXG4gICAgICogQHBhcmFtIGJ1ZmZlclZpZXdzXHJcbiAgICAgKiBAcGFyYW0gYWNjZXNzb3JzXHJcbiAgICAgKiBAcGFyYW0gYW5pbWF0aW9uU2FtcGxlUmF0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIF9DcmVhdGVOb2RlQW5pbWF0aW9uRnJvbU5vZGVBbmltYXRpb25zKFxyXG4gICAgICAgIGJhYnlsb25Ob2RlOiBOb2RlLFxyXG4gICAgICAgIHJ1bnRpbWVHTFRGQW5pbWF0aW9uOiBJQW5pbWF0aW9uLFxyXG4gICAgICAgIGlkbGVHTFRGQW5pbWF0aW9uczogSUFuaW1hdGlvbltdLFxyXG4gICAgICAgIG5vZGVNYXA6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0sXHJcbiAgICAgICAgbm9kZXM6IElOb2RlW10sXHJcbiAgICAgICAgYmluYXJ5V3JpdGVyOiBfQmluYXJ5V3JpdGVyLFxyXG4gICAgICAgIGJ1ZmZlclZpZXdzOiBJQnVmZmVyVmlld1tdLFxyXG4gICAgICAgIGFjY2Vzc29yczogSUFjY2Vzc29yW10sXHJcbiAgICAgICAgYW5pbWF0aW9uU2FtcGxlUmF0ZTogbnVtYmVyLFxyXG4gICAgICAgIHNob3VsZEV4cG9ydEFuaW1hdGlvbj86IChhbmltYXRpb246IEFuaW1hdGlvbikgPT4gYm9vbGVhblxyXG4gICAgKSB7XHJcbiAgICAgICAgbGV0IGdsVEZBbmltYXRpb246IElBbmltYXRpb247XHJcbiAgICAgICAgaWYgKF9HTFRGQW5pbWF0aW9uLl9Jc1RyYW5zZm9ybWFibGUoYmFieWxvbk5vZGUpKSB7XHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uTm9kZS5hbmltYXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGFuaW1hdGlvbiBvZiBiYWJ5bG9uTm9kZS5hbmltYXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNob3VsZEV4cG9ydEFuaW1hdGlvbiAmJiAhc2hvdWxkRXhwb3J0QW5pbWF0aW9uKGFuaW1hdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbkluZm8gPSBfR0xURkFuaW1hdGlvbi5fRGVkdWNlQW5pbWF0aW9uSW5mbyhhbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb25JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsVEZBbmltYXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBhbmltYXRpb24ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbXBsZXJzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWxzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX0dMVEZBbmltYXRpb24uX0FkZEFuaW1hdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAke2FuaW1hdGlvbi5uYW1lfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24uaGFzUnVubmluZ1J1bnRpbWVBbmltYXRpb25zID8gcnVudGltZUdMVEZBbmltYXRpb24gOiBnbFRGQW5pbWF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFieWxvbk5vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25JbmZvLmRhdGFBY2Nlc3NvclR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25JbmZvLmFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZU1hcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlclZpZXdzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3JzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uSW5mby51c2VRdWF0ZXJuaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uU2FtcGxlUmF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2xURkFuaW1hdGlvbi5zYW1wbGVycy5sZW5ndGggJiYgZ2xURkFuaW1hdGlvbi5jaGFubmVscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkbGVHTFRGQW5pbWF0aW9ucy5wdXNoKGdsVEZBbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICogQ3JlYXRlIGluZGl2aWR1YWwgbW9ycGggYW5pbWF0aW9ucyBmcm9tIHRoZSBtZXNoJ3MgbW9ycGggdGFyZ2V0IGFuaW1hdGlvbiB0cmFja3NcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uTm9kZVxyXG4gICAgICogQHBhcmFtIHJ1bnRpbWVHTFRGQW5pbWF0aW9uXHJcbiAgICAgKiBAcGFyYW0gaWRsZUdMVEZBbmltYXRpb25zXHJcbiAgICAgKiBAcGFyYW0gbm9kZU1hcFxyXG4gICAgICogQHBhcmFtIG5vZGVzXHJcbiAgICAgKiBAcGFyYW0gYmluYXJ5V3JpdGVyXHJcbiAgICAgKiBAcGFyYW0gYnVmZmVyVmlld3NcclxuICAgICAqIEBwYXJhbSBhY2Nlc3NvcnNcclxuICAgICAqIEBwYXJhbSBhbmltYXRpb25TYW1wbGVSYXRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgX0NyZWF0ZU1vcnBoVGFyZ2V0QW5pbWF0aW9uRnJvbU1vcnBoVGFyZ2V0QW5pbWF0aW9ucyhcclxuICAgICAgICBiYWJ5bG9uTm9kZTogTm9kZSxcclxuICAgICAgICBydW50aW1lR0xURkFuaW1hdGlvbjogSUFuaW1hdGlvbixcclxuICAgICAgICBpZGxlR0xURkFuaW1hdGlvbnM6IElBbmltYXRpb25bXSxcclxuICAgICAgICBub2RlTWFwOiB7IFtrZXk6IG51bWJlcl06IG51bWJlciB9LFxyXG4gICAgICAgIG5vZGVzOiBJTm9kZVtdLFxyXG4gICAgICAgIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlcixcclxuICAgICAgICBidWZmZXJWaWV3czogSUJ1ZmZlclZpZXdbXSxcclxuICAgICAgICBhY2Nlc3NvcnM6IElBY2Nlc3NvcltdLFxyXG4gICAgICAgIGFuaW1hdGlvblNhbXBsZVJhdGU6IG51bWJlcixcclxuICAgICAgICBzaG91bGRFeHBvcnRBbmltYXRpb24/OiAoYW5pbWF0aW9uOiBBbmltYXRpb24pID0+IGJvb2xlYW5cclxuICAgICkge1xyXG4gICAgICAgIGxldCBnbFRGQW5pbWF0aW9uOiBJQW5pbWF0aW9uO1xyXG4gICAgICAgIGlmIChiYWJ5bG9uTm9kZSBpbnN0YW5jZW9mIE1lc2gpIHtcclxuICAgICAgICAgICAgY29uc3QgbW9ycGhUYXJnZXRNYW5hZ2VyID0gYmFieWxvbk5vZGUubW9ycGhUYXJnZXRNYW5hZ2VyO1xyXG4gICAgICAgICAgICBpZiAobW9ycGhUYXJnZXRNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vcnBoVGFyZ2V0TWFuYWdlci5udW1UYXJnZXRzOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb3JwaFRhcmdldCA9IG1vcnBoVGFyZ2V0TWFuYWdlci5nZXRUYXJnZXQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBhbmltYXRpb24gb2YgbW9ycGhUYXJnZXQuYW5pbWF0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hvdWxkRXhwb3J0QW5pbWF0aW9uICYmICFzaG91bGRFeHBvcnRBbmltYXRpb24oYW5pbWF0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tYmluZWRBbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYCR7YW5pbWF0aW9uLm5hbWV9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5mbHVlbmNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24uZnJhbWVQZXJTZWNvbmQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24uZGF0YVR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24ubG9vcE1vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24uZW5hYmxlQmxlbmRpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tYmluZWRBbmltYXRpb25LZXlzOiBJQW5pbWF0aW9uS2V5W10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uS2V5cyA9IGFuaW1hdGlvbi5nZXRLZXlzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFuaW1hdGlvbktleXMubGVuZ3RoOyArK2opIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbktleSA9IGFuaW1hdGlvbktleXNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1vcnBoVGFyZ2V0TWFuYWdlci5udW1UYXJnZXRzOyArK2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoayA9PSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkQW5pbWF0aW9uS2V5cy5wdXNoKGFuaW1hdGlvbktleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluZWRBbmltYXRpb25LZXlzLnB1c2goeyBmcmFtZTogYW5pbWF0aW9uS2V5LmZyYW1lLCB2YWx1ZTogMCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluZWRBbmltYXRpb24uc2V0S2V5cyhjb21iaW5lZEFuaW1hdGlvbktleXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmltYXRpb25JbmZvID0gX0dMVEZBbmltYXRpb24uX0RlZHVjZUFuaW1hdGlvbkluZm8oY29tYmluZWRBbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW5pbWF0aW9uSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xURkFuaW1hdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb21iaW5lZEFuaW1hdGlvbi5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbXBsZXJzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX0dMVEZBbmltYXRpb24uX0FkZEFuaW1hdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24uaGFzUnVubmluZ1J1bnRpbWVBbmltYXRpb25zID8gcnVudGltZUdMVEZBbmltYXRpb24gOiBnbFRGQW5pbWF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhYnlsb25Ob2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkQW5pbWF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkluZm8uZGF0YUFjY2Vzc29yVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25JbmZvLmFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVNYXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluYXJ5V3JpdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlclZpZXdzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc29ycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25JbmZvLnVzZVF1YXRlcm5pb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uU2FtcGxlUmF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldE1hbmFnZXIubnVtVGFyZ2V0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnbFRGQW5pbWF0aW9uLnNhbXBsZXJzLmxlbmd0aCAmJiBnbFRGQW5pbWF0aW9uLmNoYW5uZWxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkbGVHTFRGQW5pbWF0aW9ucy5wdXNoKGdsVEZBbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKiBDcmVhdGUgbm9kZSBhbmQgbW9ycGggYW5pbWF0aW9ucyBmcm9tIHRoZSBhbmltYXRpb24gZ3JvdXBzXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvblNjZW5lXHJcbiAgICAgKiBAcGFyYW0gZ2xURkFuaW1hdGlvbnNcclxuICAgICAqIEBwYXJhbSBub2RlTWFwXHJcbiAgICAgKiBAcGFyYW0gbm9kZXNcclxuICAgICAqIEBwYXJhbSBiaW5hcnlXcml0ZXJcclxuICAgICAqIEBwYXJhbSBidWZmZXJWaWV3c1xyXG4gICAgICogQHBhcmFtIGFjY2Vzc29yc1xyXG4gICAgICogQHBhcmFtIGFuaW1hdGlvblNhbXBsZVJhdGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBfQ3JlYXRlTm9kZUFuZE1vcnBoQW5pbWF0aW9uRnJvbUFuaW1hdGlvbkdyb3VwcyhcclxuICAgICAgICBiYWJ5bG9uU2NlbmU6IFNjZW5lLFxyXG4gICAgICAgIGdsVEZBbmltYXRpb25zOiBJQW5pbWF0aW9uW10sXHJcbiAgICAgICAgbm9kZU1hcDogeyBba2V5OiBudW1iZXJdOiBudW1iZXIgfSxcclxuICAgICAgICBiaW5hcnlXcml0ZXI6IF9CaW5hcnlXcml0ZXIsXHJcbiAgICAgICAgYnVmZmVyVmlld3M6IElCdWZmZXJWaWV3W10sXHJcbiAgICAgICAgYWNjZXNzb3JzOiBJQWNjZXNzb3JbXSxcclxuICAgICAgICBhbmltYXRpb25TYW1wbGVSYXRlOiBudW1iZXIsXHJcbiAgICAgICAgc2hvdWxkRXhwb3J0QW5pbWF0aW9uPzogKGFuaW1hdGlvbjogQW5pbWF0aW9uKSA9PiBib29sZWFuXHJcbiAgICApIHtcclxuICAgICAgICBsZXQgZ2xURkFuaW1hdGlvbjogSUFuaW1hdGlvbjtcclxuICAgICAgICBpZiAoYmFieWxvblNjZW5lLmFuaW1hdGlvbkdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBhbmltYXRpb25Hcm91cHMgPSBiYWJ5bG9uU2NlbmUuYW5pbWF0aW9uR3JvdXBzO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGFuaW1hdGlvbkdyb3VwIG9mIGFuaW1hdGlvbkdyb3Vwcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbW9ycGhBbmltYXRpb25zOiBNYXA8TWVzaCwgTWFwPE1vcnBoVGFyZ2V0LCBBbmltYXRpb24+PiA9IG5ldyBNYXAoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNhbXBsZUFuaW1hdGlvbnM6IE1hcDxNZXNoLCBBbmltYXRpb24+ID0gbmV3IE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbW9ycGhBbmltYXRpb25NZXNoZXM6IFNldDxNZXNoPiA9IG5ldyBTZXQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbkdyb3VwRnJhbWVEaWZmID0gYW5pbWF0aW9uR3JvdXAudG8gLSBhbmltYXRpb25Hcm91cC5mcm9tO1xyXG4gICAgICAgICAgICAgICAgZ2xURkFuaW1hdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBhbmltYXRpb25Hcm91cC5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWxzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBzYW1wbGVyczogW10sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbmltYXRpb25Hcm91cC50YXJnZXRlZEFuaW1hdGlvbnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRBbmltYXRpb24gPSBhbmltYXRpb25Hcm91cC50YXJnZXRlZEFuaW1hdGlvbnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGFyZ2V0QW5pbWF0aW9uLnRhcmdldDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmltYXRpb24gPSB0YXJnZXRBbmltYXRpb24uYW5pbWF0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaG91bGRFeHBvcnRBbmltYXRpb24gJiYgIXNob3VsZEV4cG9ydEFuaW1hdGlvbihhbmltYXRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fSXNUcmFuc2Zvcm1hYmxlKHRhcmdldCkgfHwgKHRhcmdldC5sZW5ndGggPT09IDEgJiYgdGhpcy5fSXNUcmFuc2Zvcm1hYmxlKHRhcmdldFswXSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbkluZm8gPSBfR0xURkFuaW1hdGlvbi5fRGVkdWNlQW5pbWF0aW9uSW5mbyh0YXJnZXRBbmltYXRpb24uYW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhYnlsb25UcmFuc2Zvcm1Ob2RlID0gdGhpcy5fSXNUcmFuc2Zvcm1hYmxlKHRhcmdldCkgPyB0YXJnZXQgOiB0aGlzLl9Jc1RyYW5zZm9ybWFibGUodGFyZ2V0WzBdKSA/IHRhcmdldFswXSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFieWxvblRyYW5zZm9ybU5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfR0xURkFuaW1hdGlvbi5fQWRkQW5pbWF0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHthbmltYXRpb24ubmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbFRGQW5pbWF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uVHJhbnNmb3JtTm9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25JbmZvLmRhdGFBY2Nlc3NvclR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkluZm8uYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVNYXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyVmlld3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc29ycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uSW5mby51c2VRdWF0ZXJuaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TYW1wbGVSYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0IGluc3RhbmNlb2YgTW9ycGhUYXJnZXQgfHwgKHRhcmdldC5sZW5ndGggPT09IDEgJiYgdGFyZ2V0WzBdIGluc3RhbmNlb2YgTW9ycGhUYXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbkluZm8gPSBfR0xURkFuaW1hdGlvbi5fRGVkdWNlQW5pbWF0aW9uSW5mbyh0YXJnZXRBbmltYXRpb24uYW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhYnlsb25Nb3JwaFRhcmdldCA9IHRhcmdldCBpbnN0YW5jZW9mIE1vcnBoVGFyZ2V0ID8gKHRhcmdldCBhcyBNb3JwaFRhcmdldCkgOiAodGFyZ2V0WzBdIGFzIE1vcnBoVGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTW9ycGhUYXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYWJ5bG9uTW9ycGhUYXJnZXRNYW5hZ2VyID0gYmFieWxvblNjZW5lLm1vcnBoVGFyZ2V0TWFuYWdlcnMuZmluZCgobW9ycGhUYXJnZXRNYW5hZ2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbW9ycGhUYXJnZXRNYW5hZ2VyLm51bVRhcmdldHM7ICsraikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vcnBoVGFyZ2V0TWFuYWdlci5nZXRUYXJnZXQoaikgPT09IGJhYnlsb25Nb3JwaFRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk1vcnBoVGFyZ2V0TWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYWJ5bG9uTWVzaCA9IGJhYnlsb25TY2VuZS5tZXNoZXMuZmluZCgobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChtZXNoIGFzIE1lc2gpLm1vcnBoVGFyZ2V0TWFuYWdlciA9PT0gYmFieWxvbk1vcnBoVGFyZ2V0TWFuYWdlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgYXMgTWVzaDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhYnlsb25NZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1vcnBoQW5pbWF0aW9ucy5oYXMoYmFieWxvbk1lc2gpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhBbmltYXRpb25zLnNldChiYWJ5bG9uTWVzaCwgbmV3IE1hcCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoQW5pbWF0aW9ucy5nZXQoYmFieWxvbk1lc2gpPy5zZXQoYmFieWxvbk1vcnBoVGFyZ2V0LCBhbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhBbmltYXRpb25NZXNoZXMuYWRkKGJhYnlsb25NZXNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbXBsZUFuaW1hdGlvbnMuc2V0KGJhYnlsb25NZXNoLCBhbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyB0aGUgcGxhY2UgZm9yIHRoZSBLSFJfYW5pbWF0aW9uX3BvaW50ZXIuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbW9ycGhBbmltYXRpb25NZXNoZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vcnBoVGFyZ2V0TWFuYWdlciA9IG1lc2gubW9ycGhUYXJnZXRNYW5hZ2VyITtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29tYmluZWRBbmltYXRpb25Hcm91cDogTnVsbGFibGU8QW5pbWF0aW9uPiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uS2V5czogSUFuaW1hdGlvbktleVtdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2FtcGxlQW5pbWF0aW9uID0gc2FtcGxlQW5pbWF0aW9ucy5nZXQobWVzaCkhO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNhbXBsZUFuaW1hdGlvbktleXMgPSBzYW1wbGVBbmltYXRpb24uZ2V0S2V5cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG51bUFuaW1hdGlvbktleXMgPSBzYW1wbGVBbmltYXRpb25LZXlzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBEdWUgdG8gaG93IGdsVEYgZXhwZWN0cyBtb3JwaCB0YXJnZXQgYW5pbWF0aW9uIGRhdGEgdG8gYmUgZm9ybWF0dGVkLCB3ZSBuZWVkIHRvIHJlYXJyYW5nZSB0aGUgaW5kaXZpZHVhbCBtb3JwaCB0YXJnZXQgYW5pbWF0aW9uIHRyYWNrcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjaCB0aGF0IHdlIGhhdmUgYSBzaW5nbGUgYW5pbWF0aW9uLCB3aGVyZSBhIGdpdmVuIGtleWZyYW1lIGlucHV0IHZhbHVlIGhhcyBzdWNjZXNzaXZlIG91dHB1dCB2YWx1ZXMgZm9yIGVhY2ggbW9ycGggdGFyZ2V0IGJlbG9uZ2luZyB0byB0aGUgbWFuYWdlci5cclxuICAgICAgICAgICAgICAgICAgICAgICAgU2VlOiBodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi8yLjAjYW5pbWF0aW9uc1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgZG8gdGhpcyB2aWEgY29uc3RydWN0aW5nIGEgbmV3IEFuaW1hdGlvbiB0cmFjaywgYW5kIGludGVybGVhdmluZyB0aGUgZnJhbWVzIG9mIGVhY2ggbW9ycGggdGFyZ2V0IGFuaW1hdGlvbiB0cmFjayBpbiB0aGUgY3VycmVudCBBbmltYXRpb24gR3JvdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgcmV1c2UgdGhlIEJhYnlsb24gQW5pbWF0aW9uIGRhdGEgc3RydWN0dXJlIGZvciBlYXNlIG9mIGhhbmRsaW5nIGV4cG9ydCBvZiBjdWJpYyBzcGxpbmUgYW5pbWF0aW9uIGtleXMsIGFuZCB0byByZXVzZSB0aGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcgX0dMVEZBbmltYXRpb24uQWRkQW5pbWF0aW9uIGNvZGVwYXRoIHdpdGggbWluaW1hbCBtb2RpZmljYXRpb24sIGhvd2V2ZXIgdGhlIGNvbnN0cnVjdGVkIEJhYnlsb24gQW5pbWF0aW9uIGlzIE5PVCBpbnRlbmRlZCBmb3IgdXNlIGluLWVuZ2luZS5cclxuICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQW5pbWF0aW9uS2V5czsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbW9ycGhUYXJnZXRNYW5hZ2VyLm51bVRhcmdldHM7ICsraikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9ycGhUYXJnZXQgPSBtb3JwaFRhcmdldE1hbmFnZXIuZ2V0VGFyZ2V0KGopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uc0J5TW9ycGhUYXJnZXQgPSBtb3JwaEFuaW1hdGlvbnMuZ2V0KG1lc2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbnNCeU1vcnBoVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9ycGhUYXJnZXRBbmltYXRpb24gPSBhbmltYXRpb25zQnlNb3JwaFRhcmdldC5nZXQobW9ycGhUYXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb3JwaFRhcmdldEFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbWJpbmVkQW5pbWF0aW9uR3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkQW5pbWF0aW9uR3JvdXAgPSBuZXcgQW5pbWF0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAke2FuaW1hdGlvbkdyb3VwLm5hbWV9XyR7bWVzaC5uYW1lfV9Nb3JwaFdlaWdodEFuaW1hdGlvbmAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZsdWVuY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldEFuaW1hdGlvbi5mcmFtZVBlclNlY29uZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldEFuaW1hdGlvbi5sb29wTW9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldEFuaW1hdGlvbi5lbmFibGVCbGVuZGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25LZXlzLnB1c2gobW9ycGhUYXJnZXRBbmltYXRpb24uZ2V0S2V5cygpW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25LZXlzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWU6IGFuaW1hdGlvbkdyb3VwLmZyb20gKyAoYW5pbWF0aW9uR3JvdXBGcmFtZURpZmYgLyBudW1BbmltYXRpb25LZXlzKSAqIGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbW9ycGhUYXJnZXQuaW5mbHVlbmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5UYW5nZW50OiBzYW1wbGVBbmltYXRpb25LZXlzWzBdLmluVGFuZ2VudCA/IDAgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRUYW5nZW50OiBzYW1wbGVBbmltYXRpb25LZXlzWzBdLm91dFRhbmdlbnQgPyAwIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29tYmluZWRBbmltYXRpb25Hcm91cCEuc2V0S2V5cyhhbmltYXRpb25LZXlzKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmltYXRpb25JbmZvID0gX0dMVEZBbmltYXRpb24uX0RlZHVjZUFuaW1hdGlvbkluZm8oY29tYmluZWRBbmltYXRpb25Hcm91cCEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb25JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9HTFRGQW5pbWF0aW9uLl9BZGRBbmltYXRpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHthbmltYXRpb25Hcm91cC5uYW1lfV8ke21lc2gubmFtZX1fTW9ycGhXZWlnaHRBbmltYXRpb25gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xURkFuaW1hdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc2gsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lZEFuaW1hdGlvbkdyb3VwISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkluZm8uZGF0YUFjY2Vzc29yVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkluZm8uYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlTWFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluYXJ5V3JpdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyVmlld3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25JbmZvLnVzZVF1YXRlcm5pb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TYW1wbGVSYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhUYXJnZXRNYW5hZ2VyPy5udW1UYXJnZXRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2xURkFuaW1hdGlvbi5jaGFubmVscy5sZW5ndGggJiYgZ2xURkFuaW1hdGlvbi5zYW1wbGVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbFRGQW5pbWF0aW9ucy5wdXNoKGdsVEZBbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9BZGRBbmltYXRpb24oXHJcbiAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgIGdsVEZBbmltYXRpb246IElBbmltYXRpb24sXHJcbiAgICAgICAgYmFieWxvblRyYW5zZm9ybU5vZGU6IE5vZGUsXHJcbiAgICAgICAgYW5pbWF0aW9uOiBBbmltYXRpb24sXHJcbiAgICAgICAgZGF0YUFjY2Vzc29yVHlwZTogQWNjZXNzb3JUeXBlLFxyXG4gICAgICAgIGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoOiBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCxcclxuICAgICAgICBub2RlTWFwOiB7IFtrZXk6IG51bWJlcl06IG51bWJlciB9LFxyXG4gICAgICAgIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlcixcclxuICAgICAgICBidWZmZXJWaWV3czogSUJ1ZmZlclZpZXdbXSxcclxuICAgICAgICBhY2Nlc3NvcnM6IElBY2Nlc3NvcltdLFxyXG4gICAgICAgIHVzZVF1YXRlcm5pb246IGJvb2xlYW4sXHJcbiAgICAgICAgYW5pbWF0aW9uU2FtcGxlUmF0ZTogbnVtYmVyLFxyXG4gICAgICAgIG1vcnBoQW5pbWF0aW9uQ2hhbm5lbHM/OiBudW1iZXJcclxuICAgICkge1xyXG4gICAgICAgIGNvbnN0IGFuaW1hdGlvbkRhdGEgPSBfR0xURkFuaW1hdGlvbi5fQ3JlYXRlTm9kZUFuaW1hdGlvbihiYWJ5bG9uVHJhbnNmb3JtTm9kZSwgYW5pbWF0aW9uLCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCwgdXNlUXVhdGVybmlvbiwgYW5pbWF0aW9uU2FtcGxlUmF0ZSk7XHJcbiAgICAgICAgbGV0IGJ1ZmZlclZpZXc6IElCdWZmZXJWaWV3O1xyXG4gICAgICAgIGxldCBhY2Nlc3NvcjogSUFjY2Vzc29yO1xyXG4gICAgICAgIGxldCBrZXlmcmFtZUFjY2Vzc29ySW5kZXg6IG51bWJlcjtcclxuICAgICAgICBsZXQgZGF0YUFjY2Vzc29ySW5kZXg6IG51bWJlcjtcclxuICAgICAgICBsZXQgb3V0cHV0TGVuZ3RoOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvblNhbXBsZXI6IElBbmltYXRpb25TYW1wbGVyO1xyXG4gICAgICAgIGxldCBhbmltYXRpb25DaGFubmVsOiBJQW5pbWF0aW9uQ2hhbm5lbDtcclxuXHJcbiAgICAgICAgaWYgKGFuaW1hdGlvbkRhdGEpIHtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICogTm93IHRoYXQgd2UgaGF2ZSB0aGUgZ2xURiBjb252ZXJ0ZWQgbW9ycGggdGFyZ2V0IGFuaW1hdGlvbiBkYXRhLFxyXG4gICAgICAgICAgICAgKiB3ZSBjYW4gcmVtb3ZlIHJlZHVuZGFudCBpbnB1dCBkYXRhIHNvIHRoYXQgd2UgaGF2ZSBuIGlucHV0IGZyYW1lcyxcclxuICAgICAgICAgICAgICogYW5kIG1vcnBoQW5pbWF0aW9uQ2hhbm5lbHMgKiBuIG91dHB1dCBmcmFtZXNcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGlmIChtb3JwaEFuaW1hdGlvbkNoYW5uZWxzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRJbnB1dDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0lucHV0czogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChhbmltYXRpb25EYXRhLmlucHV0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudElucHV0ID0gYW5pbWF0aW9uRGF0YS5pbnB1dHMuc2hpZnQoKSE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICUgbW9ycGhBbmltYXRpb25DaGFubmVscyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0lucHV0cy5wdXNoKGN1cnJlbnRJbnB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25EYXRhLmlucHV0cyA9IG5ld0lucHV0cztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgbm9kZUluZGV4ID0gbm9kZU1hcFtiYWJ5bG9uVHJhbnNmb3JtTm9kZS51bmlxdWVJZF07XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGVzIGJ1ZmZlciB2aWV3IGFuZCBhY2Nlc3NvciBmb3Iga2V5IGZyYW1lcy5cclxuICAgICAgICAgICAgbGV0IGJ5dGVMZW5ndGggPSBhbmltYXRpb25EYXRhLmlucHV0cy5sZW5ndGggKiA0O1xyXG4gICAgICAgICAgICBidWZmZXJWaWV3ID0gX0dMVEZVdGlsaXRpZXMuX0NyZWF0ZUJ1ZmZlclZpZXcoMCwgYmluYXJ5V3JpdGVyLmdldEJ5dGVPZmZzZXQoKSwgYnl0ZUxlbmd0aCwgdW5kZWZpbmVkLCBgJHtuYW1lfSAga2V5ZnJhbWUgZGF0YSB2aWV3YCk7XHJcbiAgICAgICAgICAgIGJ1ZmZlclZpZXdzLnB1c2goYnVmZmVyVmlldyk7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkRhdGEuaW5wdXRzLmZvckVhY2goZnVuY3Rpb24gKGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICBiaW5hcnlXcml0ZXIuc2V0RmxvYXQzMihpbnB1dCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYWNjZXNzb3IgPSBfR0xURlV0aWxpdGllcy5fQ3JlYXRlQWNjZXNzb3IoXHJcbiAgICAgICAgICAgICAgICBidWZmZXJWaWV3cy5sZW5ndGggLSAxLFxyXG4gICAgICAgICAgICAgICAgYCR7bmFtZX0gIGtleWZyYW1lc2AsXHJcbiAgICAgICAgICAgICAgICBBY2Nlc3NvclR5cGUuU0NBTEFSLFxyXG4gICAgICAgICAgICAgICAgQWNjZXNzb3JDb21wb25lbnRUeXBlLkZMT0FULFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRGF0YS5pbnB1dHMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgICAgIFthbmltYXRpb25EYXRhLmlucHV0c01pbl0sXHJcbiAgICAgICAgICAgICAgICBbYW5pbWF0aW9uRGF0YS5pbnB1dHNNYXhdXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGFjY2Vzc29ycy5wdXNoKGFjY2Vzc29yKTtcclxuICAgICAgICAgICAga2V5ZnJhbWVBY2Nlc3NvckluZGV4ID0gYWNjZXNzb3JzLmxlbmd0aCAtIDE7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgYnVmZmVydmlldyBhbmQgYWNjZXNzb3IgZm9yIGtleWVkIHZhbHVlcy5cclxuICAgICAgICAgICAgb3V0cHV0TGVuZ3RoID0gYW5pbWF0aW9uRGF0YS5vdXRwdXRzLmxlbmd0aDtcclxuICAgICAgICAgICAgYnl0ZUxlbmd0aCA9IF9HTFRGVXRpbGl0aWVzLl9HZXREYXRhQWNjZXNzb3JFbGVtZW50Q291bnQoZGF0YUFjY2Vzc29yVHlwZSkgKiA0ICogYW5pbWF0aW9uRGF0YS5vdXRwdXRzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciBpbiBhbmQgb3V0IHRhbmdlbnRzXHJcbiAgICAgICAgICAgIGJ1ZmZlclZpZXcgPSBfR0xURlV0aWxpdGllcy5fQ3JlYXRlQnVmZmVyVmlldygwLCBiaW5hcnlXcml0ZXIuZ2V0Qnl0ZU9mZnNldCgpLCBieXRlTGVuZ3RoLCB1bmRlZmluZWQsIGAke25hbWV9ICBkYXRhIHZpZXdgKTtcclxuICAgICAgICAgICAgYnVmZmVyVmlld3MucHVzaChidWZmZXJWaWV3KTtcclxuXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkRhdGEub3V0cHV0cy5mb3JFYWNoKGZ1bmN0aW9uIChvdXRwdXQpIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlci5zZXRGbG9hdDMyKGVudHJ5KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGFjY2Vzc29yID0gX0dMVEZVdGlsaXRpZXMuX0NyZWF0ZUFjY2Vzc29yKGJ1ZmZlclZpZXdzLmxlbmd0aCAtIDEsIGAke25hbWV9ICBkYXRhYCwgZGF0YUFjY2Vzc29yVHlwZSwgQWNjZXNzb3JDb21wb25lbnRUeXBlLkZMT0FULCBvdXRwdXRMZW5ndGgsIG51bGwsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICBhY2Nlc3NvcnMucHVzaChhY2Nlc3Nvcik7XHJcbiAgICAgICAgICAgIGRhdGFBY2Nlc3NvckluZGV4ID0gYWNjZXNzb3JzLmxlbmd0aCAtIDE7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgc2FtcGxlclxyXG4gICAgICAgICAgICBhbmltYXRpb25TYW1wbGVyID0ge1xyXG4gICAgICAgICAgICAgICAgaW50ZXJwb2xhdGlvbjogYW5pbWF0aW9uRGF0YS5zYW1wbGVySW50ZXJwb2xhdGlvbixcclxuICAgICAgICAgICAgICAgIGlucHV0OiBrZXlmcmFtZUFjY2Vzc29ySW5kZXgsXHJcbiAgICAgICAgICAgICAgICBvdXRwdXQ6IGRhdGFBY2Nlc3NvckluZGV4LFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBnbFRGQW5pbWF0aW9uLnNhbXBsZXJzLnB1c2goYW5pbWF0aW9uU2FtcGxlcik7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgY2hhbm5lbFxyXG4gICAgICAgICAgICBhbmltYXRpb25DaGFubmVsID0ge1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlcjogZ2xURkFuaW1hdGlvbi5zYW1wbGVycy5sZW5ndGggLSAxLFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZTogbm9kZUluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZ2xURkFuaW1hdGlvbi5jaGFubmVscy5wdXNoKGFuaW1hdGlvbkNoYW5uZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIGJha2VkIGFuaW1hdGlvblxyXG4gICAgICogQHBhcmFtIGJhYnlsb25UcmFuc2Zvcm1Ob2RlIEJhYnlsb25KUyBtZXNoXHJcbiAgICAgKiBAcGFyYW0gYW5pbWF0aW9uIEJhYnlsb25KUyBhbmltYXRpb24gY29ycmVzcG9uZGluZyB0byB0aGUgQmFieWxvbkpTIG1lc2hcclxuICAgICAqIEBwYXJhbSBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCBhbmltYXRpb24gdGFyZ2V0IGNoYW5uZWxcclxuICAgICAqIEBwYXJhbSBtaW5GcmFtZSBtaW5pbXVtIGFuaW1hdGlvbiBmcmFtZVxyXG4gICAgICogQHBhcmFtIG1heEZyYW1lIG1heGltdW0gYW5pbWF0aW9uIGZyYW1lXHJcbiAgICAgKiBAcGFyYW0gZnBzIGZyYW1lcyBwZXIgc2Vjb25kIG9mIHRoZSBhbmltYXRpb25cclxuICAgICAqIEBwYXJhbSBzYW1wbGVSYXRlXHJcbiAgICAgKiBAcGFyYW0gaW5wdXRzIGlucHV0IGtleSBmcmFtZXMgb2YgdGhlIGFuaW1hdGlvblxyXG4gICAgICogQHBhcmFtIG91dHB1dHMgb3V0cHV0IGtleSBmcmFtZSBkYXRhIG9mIHRoZSBhbmltYXRpb25cclxuICAgICAqIEBwYXJhbSBtaW5NYXhGcmFtZXNcclxuICAgICAqIEBwYXJhbSBtaW5NYXhGcmFtZXMubWluXHJcbiAgICAgKiBAcGFyYW0gbWluTWF4RnJhbWVzLm1heFxyXG4gICAgICogQHBhcmFtIHVzZVF1YXRlcm5pb24gc3BlY2lmaWVzIGlmIHF1YXRlcm5pb25zIHNob3VsZCBiZSB1c2VkXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9DcmVhdGVCYWtlZEFuaW1hdGlvbihcclxuICAgICAgICBiYWJ5bG9uVHJhbnNmb3JtTm9kZTogTm9kZSxcclxuICAgICAgICBhbmltYXRpb246IEFuaW1hdGlvbixcclxuICAgICAgICBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aDogQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsXHJcbiAgICAgICAgbWluRnJhbWU6IG51bWJlcixcclxuICAgICAgICBtYXhGcmFtZTogbnVtYmVyLFxyXG4gICAgICAgIGZwczogbnVtYmVyLFxyXG4gICAgICAgIHNhbXBsZVJhdGU6IG51bWJlcixcclxuICAgICAgICBpbnB1dHM6IG51bWJlcltdLFxyXG4gICAgICAgIG91dHB1dHM6IG51bWJlcltdW10sXHJcbiAgICAgICAgbWluTWF4RnJhbWVzOiB7IG1pbjogbnVtYmVyOyBtYXg6IG51bWJlciB9LFxyXG4gICAgICAgIHVzZVF1YXRlcm5pb246IGJvb2xlYW5cclxuICAgICkge1xyXG4gICAgICAgIGxldCB2YWx1ZTogbnVtYmVyIHwgVmVjdG9yMyB8IFF1YXRlcm5pb247XHJcbiAgICAgICAgY29uc3QgcXVhdGVybmlvbkNhY2hlOiBRdWF0ZXJuaW9uID0gUXVhdGVybmlvbi5JZGVudGl0eSgpO1xyXG4gICAgICAgIGxldCBwcmV2aW91c1RpbWU6IE51bGxhYmxlPG51bWJlcj4gPSBudWxsO1xyXG4gICAgICAgIGxldCB0aW1lOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IG1heFVzZWRGcmFtZTogTnVsbGFibGU8bnVtYmVyPiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGN1cnJLZXlGcmFtZTogTnVsbGFibGU8SUFuaW1hdGlvbktleT4gPSBudWxsO1xyXG4gICAgICAgIGxldCBuZXh0S2V5RnJhbWU6IE51bGxhYmxlPElBbmltYXRpb25LZXk+ID0gbnVsbDtcclxuICAgICAgICBsZXQgcHJldktleUZyYW1lOiBOdWxsYWJsZTxJQW5pbWF0aW9uS2V5PiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGVuZEZyYW1lOiBOdWxsYWJsZTxudW1iZXI+ID0gbnVsbDtcclxuICAgICAgICBtaW5NYXhGcmFtZXMubWluID0gVG9vbHMuRmxvYXRSb3VuZChtaW5GcmFtZSAvIGZwcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGtleUZyYW1lcyA9IGFuaW1hdGlvbi5nZXRLZXlzKCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBrZXlGcmFtZXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgZW5kRnJhbWUgPSBudWxsO1xyXG4gICAgICAgICAgICBjdXJyS2V5RnJhbWUgPSBrZXlGcmFtZXNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAoaSArIDEgPCBsZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIG5leHRLZXlGcmFtZSA9IGtleUZyYW1lc1tpICsgMV07XHJcbiAgICAgICAgICAgICAgICBpZiAoKGN1cnJLZXlGcmFtZS52YWx1ZS5lcXVhbHMgJiYgY3VycktleUZyYW1lLnZhbHVlLmVxdWFscyhuZXh0S2V5RnJhbWUudmFsdWUpKSB8fCBjdXJyS2V5RnJhbWUudmFsdWUgPT09IG5leHRLZXlGcmFtZS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgZmlyc3QgZnJhbWUgdG8gaXRzZWxmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZEZyYW1lID0gY3VycktleUZyYW1lLmZyYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kRnJhbWUgPSBuZXh0S2V5RnJhbWUuZnJhbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhdCB0aGUgbGFzdCBrZXkgZnJhbWVcclxuICAgICAgICAgICAgICAgIHByZXZLZXlGcmFtZSA9IGtleUZyYW1lc1tpIC0gMV07XHJcbiAgICAgICAgICAgICAgICBpZiAoKGN1cnJLZXlGcmFtZS52YWx1ZS5lcXVhbHMgJiYgY3VycktleUZyYW1lLnZhbHVlLmVxdWFscyhwcmV2S2V5RnJhbWUudmFsdWUpKSB8fCBjdXJyS2V5RnJhbWUudmFsdWUgPT09IHByZXZLZXlGcmFtZS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbmRGcmFtZSA9IG1heEZyYW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbmRGcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZiA9IGN1cnJLZXlGcmFtZS5mcmFtZTsgZiA8PSBlbmRGcmFtZTsgZiArPSBzYW1wbGVSYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZSA9IFRvb2xzLkZsb2F0Um91bmQoZiAvIGZwcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWUgPT09IHByZXZpb3VzVGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNUaW1lID0gdGltZTtcclxuICAgICAgICAgICAgICAgICAgICBtYXhVc2VkRnJhbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb29wTW9kZTogYW5pbWF0aW9uLmxvb3BNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBhbmltYXRpb24uX2ludGVycG9sYXRlKGYsIHN0YXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX0dMVEZBbmltYXRpb24uX1NldEludGVycG9sYXRlZFZhbHVlKGJhYnlsb25UcmFuc2Zvcm1Ob2RlLCB2YWx1ZSwgdGltZSwgYW5pbWF0aW9uLCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCwgcXVhdGVybmlvbkNhY2hlLCBpbnB1dHMsIG91dHB1dHMsIHVzZVF1YXRlcm5pb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXhVc2VkRnJhbWUpIHtcclxuICAgICAgICAgICAgbWluTWF4RnJhbWVzLm1heCA9IG1heFVzZWRGcmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0NvbnZlcnRGYWN0b3JUb1ZlY3RvcjNPclF1YXRlcm5pb24oXHJcbiAgICAgICAgZmFjdG9yOiBudW1iZXIsXHJcbiAgICAgICAgYmFieWxvblRyYW5zZm9ybU5vZGU6IE5vZGUsXHJcbiAgICAgICAgYW5pbWF0aW9uOiBBbmltYXRpb24sXHJcbiAgICAgICAgYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGg6IEFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLFxyXG4gICAgICAgIHVzZVF1YXRlcm5pb246IGJvb2xlYW5cclxuICAgICk6IFZlY3RvcjMgfCBRdWF0ZXJuaW9uIHtcclxuICAgICAgICBjb25zdCBiYXNlUG9zaXRpb25Sb3RhdGlvbk9yU2NhbGUgPSBfR0xURkFuaW1hdGlvbi5fR2V0QmFzZVBvc2l0aW9uUm90YXRpb25PclNjYWxlKGJhYnlsb25UcmFuc2Zvcm1Ob2RlLCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCwgdXNlUXVhdGVybmlvbik7XHJcbiAgICAgICAgLy8gaGFuZGxlcyBzaW5nbGUgY29tcG9uZW50IHgsIHksIHogb3IgdyBjb21wb25lbnQgYW5pbWF0aW9uIGJ5IHVzaW5nIGEgYmFzZSBwcm9wZXJ0eSBhbmQgYW5pbWF0aW5nIG92ZXIgYSBjb21wb25lbnQuXHJcbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSBhbmltYXRpb24udGFyZ2V0UHJvcGVydHkuc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudE5hbWUgPSBwcm9wZXJ0eSA/IHByb3BlcnR5WzFdIDogXCJcIjsgLy8geCwgeSwgeiwgb3IgdyBjb21wb25lbnRcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHVzZVF1YXRlcm5pb24gPyBRdWF0ZXJuaW9uLkZyb21BcnJheShiYXNlUG9zaXRpb25Sb3RhdGlvbk9yU2NhbGUpLm5vcm1hbGl6ZSgpIDogVmVjdG9yMy5Gcm9tQXJyYXkoYmFzZVBvc2l0aW9uUm90YXRpb25PclNjYWxlKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChjb21wb25lbnROYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ4XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJ5XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJ6XCI6IHtcclxuICAgICAgICAgICAgICAgIHZhbHVlW2NvbXBvbmVudE5hbWVdID0gZmFjdG9yO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcIndcIjoge1xyXG4gICAgICAgICAgICAgICAgKHZhbHVlIGFzIFF1YXRlcm5pb24pLncgPSBmYWN0b3I7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5FcnJvcihgZ2xURkFuaW1hdGlvbjogVW5zdXBwb3J0ZWQgY29tcG9uZW50IG5hbWUgXCIke2NvbXBvbmVudE5hbWV9XCIhYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfU2V0SW50ZXJwb2xhdGVkVmFsdWUoXHJcbiAgICAgICAgYmFieWxvblRyYW5zZm9ybU5vZGU6IE5vZGUsXHJcbiAgICAgICAgdmFsdWU6IG51bWJlciB8IFZlY3RvcjMgfCBRdWF0ZXJuaW9uLFxyXG4gICAgICAgIHRpbWU6IG51bWJlcixcclxuICAgICAgICBhbmltYXRpb246IEFuaW1hdGlvbixcclxuICAgICAgICBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aDogQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsXHJcbiAgICAgICAgcXVhdGVybmlvbkNhY2hlOiBRdWF0ZXJuaW9uLFxyXG4gICAgICAgIGlucHV0czogbnVtYmVyW10sXHJcbiAgICAgICAgb3V0cHV0czogbnVtYmVyW11bXSxcclxuICAgICAgICB1c2VRdWF0ZXJuaW9uOiBib29sZWFuXHJcbiAgICApIHtcclxuICAgICAgICBsZXQgY2FjaGVWYWx1ZTogVmVjdG9yMyB8IFF1YXRlcm5pb24gfCBudW1iZXI7XHJcbiAgICAgICAgaW5wdXRzLnB1c2godGltZSk7XHJcblxyXG4gICAgICAgIGlmIChhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCA9PT0gQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGguV0VJR0hUUykge1xyXG4gICAgICAgICAgICBvdXRwdXRzLnB1c2goW3ZhbHVlIGFzIG51bWJlcl0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYW5pbWF0aW9uLmRhdGFUeXBlID09PSBBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuX0NvbnZlcnRGYWN0b3JUb1ZlY3RvcjNPclF1YXRlcm5pb24odmFsdWUgYXMgbnVtYmVyLCBiYWJ5bG9uVHJhbnNmb3JtTm9kZSwgYW5pbWF0aW9uLCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCwgdXNlUXVhdGVybmlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGggPT09IEFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLlJPVEFUSU9OKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VRdWF0ZXJuaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBxdWF0ZXJuaW9uQ2FjaGUgPSB2YWx1ZSBhcyBRdWF0ZXJuaW9uO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FjaGVWYWx1ZSA9IHZhbHVlIGFzIFZlY3RvcjM7XHJcbiAgICAgICAgICAgICAgICBRdWF0ZXJuaW9uLlJvdGF0aW9uWWF3UGl0Y2hSb2xsVG9SZWYoY2FjaGVWYWx1ZS55LCBjYWNoZVZhbHVlLngsIGNhY2hlVmFsdWUueiwgcXVhdGVybmlvbkNhY2hlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvdXRwdXRzLnB1c2gocXVhdGVybmlvbkNhY2hlLmFzQXJyYXkoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gc2NhbGluZyBhbmQgcG9zaXRpb24gYW5pbWF0aW9uXHJcbiAgICAgICAgICAgIGNhY2hlVmFsdWUgPSB2YWx1ZSBhcyBWZWN0b3IzO1xyXG4gICAgICAgICAgICBvdXRwdXRzLnB1c2goY2FjaGVWYWx1ZS5hc0FycmF5KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgbGluZWFyIGFuaW1hdGlvbiBmcm9tIHRoZSBhbmltYXRpb24ga2V5IGZyYW1lc1xyXG4gICAgICogQHBhcmFtIGJhYnlsb25UcmFuc2Zvcm1Ob2RlIEJhYnlsb25KUyBtZXNoXHJcbiAgICAgKiBAcGFyYW0gYW5pbWF0aW9uIEJhYnlsb25KUyBhbmltYXRpb25cclxuICAgICAqIEBwYXJhbSBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCBUaGUgdGFyZ2V0IGFuaW1hdGlvbiBjaGFubmVsXHJcbiAgICAgKiBAcGFyYW0gaW5wdXRzIEFycmF5IHRvIHN0b3JlIHRoZSBrZXkgZnJhbWUgdGltZXNcclxuICAgICAqIEBwYXJhbSBvdXRwdXRzIEFycmF5IHRvIHN0b3JlIHRoZSBrZXkgZnJhbWUgZGF0YVxyXG4gICAgICogQHBhcmFtIHVzZVF1YXRlcm5pb24gU3BlY2lmaWVzIGlmIHF1YXRlcm5pb25zIGFyZSB1c2VkIGluIHRoZSBhbmltYXRpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0NyZWF0ZUxpbmVhck9yU3RlcEFuaW1hdGlvbihcclxuICAgICAgICBiYWJ5bG9uVHJhbnNmb3JtTm9kZTogTm9kZSxcclxuICAgICAgICBhbmltYXRpb246IEFuaW1hdGlvbixcclxuICAgICAgICBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aDogQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsXHJcbiAgICAgICAgaW5wdXRzOiBudW1iZXJbXSxcclxuICAgICAgICBvdXRwdXRzOiBudW1iZXJbXVtdLFxyXG4gICAgICAgIHVzZVF1YXRlcm5pb246IGJvb2xlYW5cclxuICAgICkge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5RnJhbWUgb2YgYW5pbWF0aW9uLmdldEtleXMoKSkge1xyXG4gICAgICAgICAgICBpbnB1dHMucHVzaChrZXlGcmFtZS5mcmFtZSAvIGFuaW1hdGlvbi5mcmFtZVBlclNlY29uZCk7IC8vIGtleWZyYW1lcyBpbiBzZWNvbmRzLlxyXG4gICAgICAgICAgICBfR0xURkFuaW1hdGlvbi5fQWRkS2V5ZnJhbWVWYWx1ZShrZXlGcmFtZSwgYW5pbWF0aW9uLCBvdXRwdXRzLCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCwgYmFieWxvblRyYW5zZm9ybU5vZGUsIHVzZVF1YXRlcm5pb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgY3ViaWMgc3BsaW5lIGFuaW1hdGlvbiBmcm9tIHRoZSBhbmltYXRpb24ga2V5IGZyYW1lc1xyXG4gICAgICogQHBhcmFtIGJhYnlsb25UcmFuc2Zvcm1Ob2RlIEJhYnlsb25KUyBtZXNoXHJcbiAgICAgKiBAcGFyYW0gYW5pbWF0aW9uIEJhYnlsb25KUyBhbmltYXRpb25cclxuICAgICAqIEBwYXJhbSBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCBUaGUgdGFyZ2V0IGFuaW1hdGlvbiBjaGFubmVsXHJcbiAgICAgKiBAcGFyYW0gaW5wdXRzIEFycmF5IHRvIHN0b3JlIHRoZSBrZXkgZnJhbWUgdGltZXNcclxuICAgICAqIEBwYXJhbSBvdXRwdXRzIEFycmF5IHRvIHN0b3JlIHRoZSBrZXkgZnJhbWUgZGF0YVxyXG4gICAgICogQHBhcmFtIHVzZVF1YXRlcm5pb24gU3BlY2lmaWVzIGlmIHF1YXRlcm5pb25zIGFyZSB1c2VkIGluIHRoZSBhbmltYXRpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0NyZWF0ZUN1YmljU3BsaW5lQW5pbWF0aW9uKFxyXG4gICAgICAgIGJhYnlsb25UcmFuc2Zvcm1Ob2RlOiBOb2RlLFxyXG4gICAgICAgIGFuaW1hdGlvbjogQW5pbWF0aW9uLFxyXG4gICAgICAgIGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoOiBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCxcclxuICAgICAgICBpbnB1dHM6IG51bWJlcltdLFxyXG4gICAgICAgIG91dHB1dHM6IG51bWJlcltdW10sXHJcbiAgICAgICAgdXNlUXVhdGVybmlvbjogYm9vbGVhblxyXG4gICAgKSB7XHJcbiAgICAgICAgYW5pbWF0aW9uLmdldEtleXMoKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXlGcmFtZSkge1xyXG4gICAgICAgICAgICBpbnB1dHMucHVzaChrZXlGcmFtZS5mcmFtZSAvIGFuaW1hdGlvbi5mcmFtZVBlclNlY29uZCk7IC8vIGtleWZyYW1lcyBpbiBzZWNvbmRzLlxyXG4gICAgICAgICAgICBfR0xURkFuaW1hdGlvbi5fQWRkU3BsaW5lVGFuZ2VudChfVGFuZ2VudFR5cGUuSU5UQU5HRU5ULCBvdXRwdXRzLCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCwgQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24uQ1VCSUNTUExJTkUsIGtleUZyYW1lLCB1c2VRdWF0ZXJuaW9uKTtcclxuICAgICAgICAgICAgX0dMVEZBbmltYXRpb24uX0FkZEtleWZyYW1lVmFsdWUoa2V5RnJhbWUsIGFuaW1hdGlvbiwgb3V0cHV0cywgYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsIGJhYnlsb25UcmFuc2Zvcm1Ob2RlLCB1c2VRdWF0ZXJuaW9uKTtcclxuXHJcbiAgICAgICAgICAgIF9HTFRGQW5pbWF0aW9uLl9BZGRTcGxpbmVUYW5nZW50KF9UYW5nZW50VHlwZS5PVVRUQU5HRU5ULCBvdXRwdXRzLCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCwgQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24uQ1VCSUNTUExJTkUsIGtleUZyYW1lLCB1c2VRdWF0ZXJuaW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfR2V0QmFzZVBvc2l0aW9uUm90YXRpb25PclNjYWxlKGJhYnlsb25UcmFuc2Zvcm1Ob2RlOiBOb2RlLCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aDogQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsIHVzZVF1YXRlcm5pb246IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgYmFzZVBvc2l0aW9uUm90YXRpb25PclNjYWxlOiBudW1iZXJbXTtcclxuICAgICAgICBpZiAoYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGggPT09IEFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLlJPVEFUSU9OKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VRdWF0ZXJuaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBxID0gKGJhYnlsb25UcmFuc2Zvcm1Ob2RlIGFzIFRyYW5zZm9ybU5vZGUpLnJvdGF0aW9uUXVhdGVybmlvbjtcclxuICAgICAgICAgICAgICAgIGJhc2VQb3NpdGlvblJvdGF0aW9uT3JTY2FsZSA9IChxID8/IFF1YXRlcm5pb24uSWRlbnRpdHkoKSkuYXNBcnJheSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcjogVmVjdG9yMyA9IChiYWJ5bG9uVHJhbnNmb3JtTm9kZSBhcyBUcmFuc2Zvcm1Ob2RlKS5yb3RhdGlvbjtcclxuICAgICAgICAgICAgICAgIGJhc2VQb3NpdGlvblJvdGF0aW9uT3JTY2FsZSA9IChyID8/IFZlY3RvcjMuWmVybygpKS5hc0FycmF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoID09PSBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aC5UUkFOU0xBVElPTikge1xyXG4gICAgICAgICAgICBjb25zdCBwOiBWZWN0b3IzID0gKGJhYnlsb25UcmFuc2Zvcm1Ob2RlIGFzIFRyYW5zZm9ybU5vZGUpLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBiYXNlUG9zaXRpb25Sb3RhdGlvbk9yU2NhbGUgPSAocCA/PyBWZWN0b3IzLlplcm8oKSkuYXNBcnJheSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHNjYWxlXHJcbiAgICAgICAgICAgIGNvbnN0IHM6IFZlY3RvcjMgPSAoYmFieWxvblRyYW5zZm9ybU5vZGUgYXMgVHJhbnNmb3JtTm9kZSkuc2NhbGluZztcclxuICAgICAgICAgICAgYmFzZVBvc2l0aW9uUm90YXRpb25PclNjYWxlID0gKHMgPz8gVmVjdG9yMy5PbmUoKSkuYXNBcnJheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYmFzZVBvc2l0aW9uUm90YXRpb25PclNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGtleSBmcmFtZSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIGtleUZyYW1lXHJcbiAgICAgKiBAcGFyYW0gYW5pbWF0aW9uXHJcbiAgICAgKiBAcGFyYW0gb3V0cHV0c1xyXG4gICAgICogQHBhcmFtIGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvblRyYW5zZm9ybU5vZGVcclxuICAgICAqIEBwYXJhbSB1c2VRdWF0ZXJuaW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9BZGRLZXlmcmFtZVZhbHVlKFxyXG4gICAgICAgIGtleUZyYW1lOiBJQW5pbWF0aW9uS2V5LFxyXG4gICAgICAgIGFuaW1hdGlvbjogQW5pbWF0aW9uLFxyXG4gICAgICAgIG91dHB1dHM6IG51bWJlcltdW10sXHJcbiAgICAgICAgYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGg6IEFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLFxyXG4gICAgICAgIGJhYnlsb25UcmFuc2Zvcm1Ob2RlOiBOb2RlLFxyXG4gICAgICAgIHVzZVF1YXRlcm5pb246IGJvb2xlYW5cclxuICAgICkge1xyXG4gICAgICAgIGxldCBuZXdQb3NpdGlvblJvdGF0aW9uT3JTY2FsZTogTnVsbGFibGU8VmVjdG9yMyB8IFF1YXRlcm5pb24gfCBudW1iZXI+O1xyXG4gICAgICAgIGNvbnN0IGFuaW1hdGlvblR5cGUgPSBhbmltYXRpb24uZGF0YVR5cGU7XHJcbiAgICAgICAgaWYgKGFuaW1hdGlvblR5cGUgPT09IEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX1ZFQ1RPUjMpIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0ga2V5RnJhbWUudmFsdWUuYXNBcnJheSgpO1xyXG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGggPT09IEFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLlJPVEFUSU9OKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhcnJheSA9IFZlY3RvcjMuRnJvbUFycmF5KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJvdGF0aW9uUXVhdGVybmlvbiA9IFF1YXRlcm5pb24uUm90YXRpb25ZYXdQaXRjaFJvbGwoYXJyYXkueSwgYXJyYXkueCwgYXJyYXkueik7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHJvdGF0aW9uUXVhdGVybmlvbi5hc0FycmF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3V0cHV0cy5wdXNoKHZhbHVlKTsgLy8gc2NhbGUgIHZlY3Rvci5cclxuICAgICAgICB9IGVsc2UgaWYgKGFuaW1hdGlvblR5cGUgPT09IEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FUKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCA9PT0gQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGguV0VJR0hUUykge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0cy5wdXNoKFtrZXlGcmFtZS52YWx1ZV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gaGFuZGxlcyBzaW5nbGUgY29tcG9uZW50IHgsIHksIHogb3IgdyBjb21wb25lbnQgYW5pbWF0aW9uIGJ5IHVzaW5nIGEgYmFzZSBwcm9wZXJ0eSBhbmQgYW5pbWF0aW5nIG92ZXIgYSBjb21wb25lbnQuXHJcbiAgICAgICAgICAgICAgICBuZXdQb3NpdGlvblJvdGF0aW9uT3JTY2FsZSA9IHRoaXMuX0NvbnZlcnRGYWN0b3JUb1ZlY3RvcjNPclF1YXRlcm5pb24oXHJcbiAgICAgICAgICAgICAgICAgICAga2V5RnJhbWUudmFsdWUgYXMgbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhYnlsb25UcmFuc2Zvcm1Ob2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCxcclxuICAgICAgICAgICAgICAgICAgICB1c2VRdWF0ZXJuaW9uXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1Bvc2l0aW9uUm90YXRpb25PclNjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoID09PSBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aC5ST1RBVElPTikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3NSb3RTY2FsZSA9IHVzZVF1YXRlcm5pb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKG5ld1Bvc2l0aW9uUm90YXRpb25PclNjYWxlIGFzIFF1YXRlcm5pb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFF1YXRlcm5pb24uUm90YXRpb25ZYXdQaXRjaFJvbGwobmV3UG9zaXRpb25Sb3RhdGlvbk9yU2NhbGUueSwgbmV3UG9zaXRpb25Sb3RhdGlvbk9yU2NhbGUueCwgbmV3UG9zaXRpb25Sb3RhdGlvbk9yU2NhbGUueikubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dHMucHVzaChwb3NSb3RTY2FsZS5hc0FycmF5KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXRzLnB1c2gobmV3UG9zaXRpb25Sb3RhdGlvbk9yU2NhbGUuYXNBcnJheSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYW5pbWF0aW9uVHlwZSA9PT0gQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfUVVBVEVSTklPTikge1xyXG4gICAgICAgICAgICBvdXRwdXRzLnB1c2goKGtleUZyYW1lLnZhbHVlIGFzIFF1YXRlcm5pb24pLm5vcm1hbGl6ZSgpLmFzQXJyYXkoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgVG9vbHMuRXJyb3IoXCJnbFRGQW5pbWF0aW9uOiBVbnN1cHBvcnRlZCBrZXkgZnJhbWUgdmFsdWVzIGZvciBhbmltYXRpb24hXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICogRGV0ZXJtaW5lIHRoZSBpbnRlcnBvbGF0aW9uIGJhc2VkIG9uIHRoZSBrZXkgZnJhbWVzXHJcbiAgICAgKiBAcGFyYW0ga2V5RnJhbWVzXHJcbiAgICAgKiBAcGFyYW0gYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGhcclxuICAgICAqIEBwYXJhbSB1c2VRdWF0ZXJuaW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9EZWR1Y2VJbnRlcnBvbGF0aW9uKFxyXG4gICAgICAgIGtleUZyYW1lczogSUFuaW1hdGlvbktleVtdLFxyXG4gICAgICAgIGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoOiBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCxcclxuICAgICAgICB1c2VRdWF0ZXJuaW9uOiBib29sZWFuXHJcbiAgICApOiB7IGludGVycG9sYXRpb25UeXBlOiBBbmltYXRpb25TYW1wbGVySW50ZXJwb2xhdGlvbjsgc2hvdWxkQmFrZUFuaW1hdGlvbjogYm9vbGVhbiB9IHtcclxuICAgICAgICBsZXQgaW50ZXJwb2xhdGlvblR5cGU6IEFuaW1hdGlvblNhbXBsZXJJbnRlcnBvbGF0aW9uIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBzaG91bGRCYWtlQW5pbWF0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGtleTogSUFuaW1hdGlvbktleTtcclxuXHJcbiAgICAgICAgaWYgKGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoID09PSBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aC5ST1RBVElPTiAmJiAhdXNlUXVhdGVybmlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4geyBpbnRlcnBvbGF0aW9uVHlwZTogQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24uTElORUFSLCBzaG91bGRCYWtlQW5pbWF0aW9uOiB0cnVlIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0ga2V5RnJhbWVzLmxlbmd0aDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGtleSA9IGtleUZyYW1lc1tpXTtcclxuICAgICAgICAgICAgaWYgKGtleS5pblRhbmdlbnQgfHwga2V5Lm91dFRhbmdlbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbnRlcnBvbGF0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnRlcnBvbGF0aW9uVHlwZSAhPT0gQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24uQ1VCSUNTUExJTkUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJwb2xhdGlvblR5cGUgPSBBbmltYXRpb25TYW1wbGVySW50ZXJwb2xhdGlvbi5MSU5FQVI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3VsZEJha2VBbmltYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGludGVycG9sYXRpb25UeXBlID0gQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24uQ1VCSUNTUExJTkU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJwb2xhdGlvblR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVycG9sYXRpb25UeXBlID09PSBBbmltYXRpb25TYW1wbGVySW50ZXJwb2xhdGlvbi5DVUJJQ1NQTElORSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoa2V5LmludGVycG9sYXRpb24gJiYga2V5LmludGVycG9sYXRpb24gPT09IEFuaW1hdGlvbktleUludGVycG9sYXRpb24uU1RFUCAmJiBpbnRlcnBvbGF0aW9uVHlwZSAhPT0gQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24uU1RFUClcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJwb2xhdGlvblR5cGUgPSBBbmltYXRpb25TYW1wbGVySW50ZXJwb2xhdGlvbi5MSU5FQVI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3VsZEJha2VBbmltYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkuaW50ZXJwb2xhdGlvbiAmJiBrZXkuaW50ZXJwb2xhdGlvbiA9PT0gQW5pbWF0aW9uS2V5SW50ZXJwb2xhdGlvbi5TVEVQKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVycG9sYXRpb25UeXBlID0gQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24uU1RFUDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnBvbGF0aW9uVHlwZSA9IEFuaW1hdGlvblNhbXBsZXJJbnRlcnBvbGF0aW9uLkxJTkVBUjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpbnRlcnBvbGF0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICBpbnRlcnBvbGF0aW9uVHlwZSA9IEFuaW1hdGlvblNhbXBsZXJJbnRlcnBvbGF0aW9uLkxJTkVBUjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7IGludGVycG9sYXRpb25UeXBlOiBpbnRlcnBvbGF0aW9uVHlwZSwgc2hvdWxkQmFrZUFuaW1hdGlvbjogc2hvdWxkQmFrZUFuaW1hdGlvbiB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBpbnB1dCB0YW5nZW50IG9yIG91dHB1dCB0YW5nZW50IHRvIHRoZSBvdXRwdXQgZGF0YVxyXG4gICAgICogSWYgYW4gaW5wdXQgdGFuZ2VudCBvciBvdXRwdXQgdGFuZ2VudCBpcyBtaXNzaW5nLCBpdCB1c2VzIHRoZSB6ZXJvIHZlY3RvciBvciB6ZXJvIHF1YXRlcm5pb25cclxuICAgICAqIEBwYXJhbSB0YW5nZW50VHlwZSBTcGVjaWZpZXMgd2hpY2ggdHlwZSBvZiB0YW5nZW50IHRvIGhhbmRsZSAoaW5UYW5nZW50IG9yIG91dFRhbmdlbnQpXHJcbiAgICAgKiBAcGFyYW0gb3V0cHV0cyBUaGUgYW5pbWF0aW9uIGRhdGEgYnkga2V5ZnJhbWVcclxuICAgICAqIEBwYXJhbSBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCBUaGUgdGFyZ2V0IGFuaW1hdGlvbiBjaGFubmVsXHJcbiAgICAgKiBAcGFyYW0gaW50ZXJwb2xhdGlvbiBUaGUgaW50ZXJwb2xhdGlvbiB0eXBlXHJcbiAgICAgKiBAcGFyYW0ga2V5RnJhbWUgVGhlIGtleSBmcmFtZSB3aXRoIHRoZSBhbmltYXRpb24gZGF0YVxyXG4gICAgICogQHBhcmFtIHVzZVF1YXRlcm5pb24gU3BlY2lmaWVzIGlmIHF1YXRlcm5pb25zIGFyZSB1c2VkXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9BZGRTcGxpbmVUYW5nZW50KFxyXG4gICAgICAgIHRhbmdlbnRUeXBlOiBfVGFuZ2VudFR5cGUsXHJcbiAgICAgICAgb3V0cHV0czogbnVtYmVyW11bXSxcclxuICAgICAgICBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aDogQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsXHJcbiAgICAgICAgaW50ZXJwb2xhdGlvbjogQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24sXHJcbiAgICAgICAga2V5RnJhbWU6IElBbmltYXRpb25LZXksXHJcbiAgICAgICAgdXNlUXVhdGVybmlvbjogYm9vbGVhblxyXG4gICAgKSB7XHJcbiAgICAgICAgbGV0IHRhbmdlbnQ6IG51bWJlcltdO1xyXG4gICAgICAgIGNvbnN0IHRhbmdlbnRWYWx1ZTogVmVjdG9yMyB8IFF1YXRlcm5pb24gfCBudW1iZXIgPSB0YW5nZW50VHlwZSA9PT0gX1RhbmdlbnRUeXBlLklOVEFOR0VOVCA/IGtleUZyYW1lLmluVGFuZ2VudCA6IGtleUZyYW1lLm91dFRhbmdlbnQ7XHJcbiAgICAgICAgaWYgKGludGVycG9sYXRpb24gPT09IEFuaW1hdGlvblNhbXBsZXJJbnRlcnBvbGF0aW9uLkNVQklDU1BMSU5FKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCA9PT0gQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGguUk9UQVRJT04pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YW5nZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlUXVhdGVybmlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YW5nZW50ID0gKHRhbmdlbnRWYWx1ZSBhcyBRdWF0ZXJuaW9uKS5hc0FycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyYXkgPSB0YW5nZW50VmFsdWUgYXMgVmVjdG9yMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFuZ2VudCA9IFF1YXRlcm5pb24uUm90YXRpb25ZYXdQaXRjaFJvbGwoYXJyYXkueSwgYXJyYXkueCwgYXJyYXkueikuYXNBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFuZ2VudCA9IFswLCAwLCAwLCAwXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCA9PT0gQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGguV0VJR0hUUykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhbmdlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhbmdlbnQgPSBbdGFuZ2VudFZhbHVlIGFzIG51bWJlcl07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhbmdlbnQgPSBbMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFuZ2VudFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFuZ2VudCA9ICh0YW5nZW50VmFsdWUgYXMgVmVjdG9yMykuYXNBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0YW5nZW50ID0gWzAsIDAsIDBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvdXRwdXRzLnB1c2godGFuZ2VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIGtleSBmcmFtZXMnIGZyYW1lIHZhbHVlc1xyXG4gICAgICogQHBhcmFtIGtleUZyYW1lcyBhbmltYXRpb24ga2V5IGZyYW1lc1xyXG4gICAgICogQHJldHVybnMgdGhlIG1pbmltdW0gYW5kIG1heGltdW0ga2V5IGZyYW1lIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9DYWxjdWxhdGVNaW5NYXhLZXlGcmFtZXMoa2V5RnJhbWVzOiBJQW5pbWF0aW9uS2V5W10pOiB7IG1pbjogbnVtYmVyOyBtYXg6IG51bWJlciB9IHtcclxuICAgICAgICBsZXQgbWluOiBudW1iZXIgPSBJbmZpbml0eTtcclxuICAgICAgICBsZXQgbWF4OiBudW1iZXIgPSAtSW5maW5pdHk7XHJcbiAgICAgICAga2V5RnJhbWVzLmZvckVhY2goZnVuY3Rpb24gKGtleUZyYW1lKSB7XHJcbiAgICAgICAgICAgIG1pbiA9IE1hdGgubWluKG1pbiwga2V5RnJhbWUuZnJhbWUpO1xyXG4gICAgICAgICAgICBtYXggPSBNYXRoLm1heChtYXgsIGtleUZyYW1lLmZyYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHsgbWluOiBtaW4sIG1heDogbWF4IH07XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW1hZ2VNaW1lVHlwZSB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBmb3IgaG9sZGluZyBhbmQgZG93bmxvYWRpbmcgZ2xURiBmaWxlIGRhdGFcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHTFRGRGF0YSB7XHJcbiAgICAvKipcclxuICAgICAqIE9iamVjdCB3aGljaCBjb250YWlucyB0aGUgZmlsZSBuYW1lIGFzIHRoZSBrZXkgYW5kIGl0cyBkYXRhIGFzIHRoZSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBnbFRGRmlsZXM6IHsgW2ZpbGVOYW1lOiBzdHJpbmddOiBzdHJpbmcgfCBCbG9iIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgZ2xURiBmaWxlIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5nbFRGRmlsZXMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERvd25sb2FkcyB0aGUgZ2xURiBkYXRhIGFzIGZpbGVzIGJhc2VkIG9uIHRoZWlyIG5hbWVzIGFuZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb3dubG9hZEZpbGVzKCk6IHZvaWQge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENoZWNrcyBmb3IgYSBtYXRjaGluZyBzdWZmaXggYXQgdGhlIGVuZCBvZiBhIHN0cmluZyAoZm9yIEVTNSBhbmQgbG93ZXIpXHJcbiAgICAgICAgICogQHBhcmFtIHN0ciBTb3VyY2Ugc3RyaW5nXHJcbiAgICAgICAgICogQHBhcmFtIHN1ZmZpeCBTdWZmaXggdG8gc2VhcmNoIGZvciBpbiB0aGUgc291cmNlIHN0cmluZ1xyXG4gICAgICAgICAqIEByZXR1cm5zIEJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBzdWZmaXggd2FzIGZvdW5kICh0cnVlKSBvciBub3QgKGZhbHNlKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGVuZHNXaXRoKHN0cjogc3RyaW5nLCBzdWZmaXg6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyLmluZGV4T2Yoc3VmZml4LCBzdHIubGVuZ3RoIC0gc3VmZml4Lmxlbmd0aCkgIT09IC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5nbFRGRmlsZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xyXG4gICAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgIGxpbmsuZG93bmxvYWQgPSBrZXk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJsb2IgPSB0aGlzLmdsVEZGaWxlc1trZXldO1xyXG4gICAgICAgICAgICBsZXQgbWltZVR5cGU7XHJcblxyXG4gICAgICAgICAgICBpZiAoZW5kc1dpdGgoa2V5LCBcIi5nbGJcIikpIHtcclxuICAgICAgICAgICAgICAgIG1pbWVUeXBlID0geyB0eXBlOiBcIm1vZGVsL2dsdGYtYmluYXJ5XCIgfTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlbmRzV2l0aChrZXksIFwiLmJpblwiKSkge1xyXG4gICAgICAgICAgICAgICAgbWltZVR5cGUgPSB7IHR5cGU6IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIgfTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlbmRzV2l0aChrZXksIFwiLmdsdGZcIikpIHtcclxuICAgICAgICAgICAgICAgIG1pbWVUeXBlID0geyB0eXBlOiBcIm1vZGVsL2dsdGYranNvblwiIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5kc1dpdGgoa2V5LCBcIi5qcGVnXCIpIHx8IGVuZHNXaXRoKGtleSwgXCIuanBnXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBtaW1lVHlwZSA9IHsgdHlwZTogSW1hZ2VNaW1lVHlwZS5KUEVHIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5kc1dpdGgoa2V5LCBcIi5wbmdcIikpIHtcclxuICAgICAgICAgICAgICAgIG1pbWVUeXBlID0geyB0eXBlOiBJbWFnZU1pbWVUeXBlLlBORyB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsaW5rLmhyZWYgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbYmxvYl0sIG1pbWVUeXBlKSk7XHJcbiAgICAgICAgICAgIGxpbmsuY2xpY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHR5cGUge1xyXG4gICAgSUJ1ZmZlclZpZXcsXHJcbiAgICBJQWNjZXNzb3IsXHJcbiAgICBJTm9kZSxcclxuICAgIElTY2VuZSxcclxuICAgIElNZXNoLFxyXG4gICAgSU1hdGVyaWFsLFxyXG4gICAgSVRleHR1cmUsXHJcbiAgICBJSW1hZ2UsXHJcbiAgICBJU2FtcGxlcixcclxuICAgIElBbmltYXRpb24sXHJcbiAgICBJTWVzaFByaW1pdGl2ZSxcclxuICAgIElCdWZmZXIsXHJcbiAgICBJR0xURixcclxuICAgIElUZXh0dXJlSW5mbyxcclxuICAgIElTa2luLFxyXG4gICAgSUNhbWVyYSxcclxufSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEFjY2Vzc29yVHlwZSwgSW1hZ2VNaW1lVHlwZSwgTWVzaFByaW1pdGl2ZU1vZGUsIEFjY2Vzc29yQ29tcG9uZW50VHlwZSwgQ2FtZXJhVHlwZSB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgRmxvYXRBcnJheSwgSW5kaWNlc0FycmF5LCBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB7IE1hdHJpeCwgVG1wVmVjdG9ycywgVmVjdG9yMiwgVmVjdG9yMywgVmVjdG9yNCwgUXVhdGVybmlvbiB9IGZyb20gXCJjb3JlL01hdGhzL21hdGgudmVjdG9yXCI7XHJcbmltcG9ydCB7IENvbG9yMywgQ29sb3I0IH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5jb2xvclwiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCJjb3JlL01pc2MvdG9vbHNcIjtcclxuaW1wb3J0IHsgVmVydGV4QnVmZmVyIH0gZnJvbSBcImNvcmUvQnVmZmVycy9idWZmZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBOb2RlIH0gZnJvbSBcImNvcmUvbm9kZVwiO1xyXG5pbXBvcnQgeyBUcmFuc2Zvcm1Ob2RlIH0gZnJvbSBcImNvcmUvTWVzaGVzL3RyYW5zZm9ybU5vZGVcIjtcclxuaW1wb3J0IHR5cGUgeyBBYnN0cmFjdE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvYWJzdHJhY3RNZXNoXCI7XHJcbmltcG9ydCB0eXBlIHsgU3ViTWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9zdWJNZXNoXCI7XHJcbmltcG9ydCB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5pbXBvcnQgdHlwZSB7IE1vcnBoVGFyZ2V0IH0gZnJvbSBcImNvcmUvTW9ycGgvbW9ycGhUYXJnZXRcIjtcclxuaW1wb3J0IHsgTGluZXNNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL2xpbmVzTWVzaFwiO1xyXG5pbXBvcnQgeyBJbnN0YW5jZWRNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL2luc3RhbmNlZE1lc2hcIjtcclxuaW1wb3J0IHR5cGUgeyBCb25lIH0gZnJvbSBcImNvcmUvQm9uZXMvYm9uZVwiO1xyXG5pbXBvcnQgdHlwZSB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2Jhc2VUZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy90ZXh0dXJlXCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IEVuZ2luZSB9IGZyb20gXCJjb3JlL0VuZ2luZXMvZW5naW5lXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIgfSBmcm9tIFwiLi9nbFRGRXhwb3J0ZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgX0dMVEZNYXRlcmlhbEV4cG9ydGVyIH0gZnJvbSBcIi4vZ2xURk1hdGVyaWFsRXhwb3J0ZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBJRXhwb3J0T3B0aW9ucyB9IGZyb20gXCIuL2dsVEZTZXJpYWxpemVyXCI7XHJcbmltcG9ydCB7IF9HTFRGVXRpbGl0aWVzIH0gZnJvbSBcIi4vZ2xURlV0aWxpdGllc1wiO1xyXG5pbXBvcnQgeyBHTFRGRGF0YSB9IGZyb20gXCIuL2dsVEZEYXRhXCI7XHJcbmltcG9ydCB7IF9HTFRGQW5pbWF0aW9uIH0gZnJvbSBcIi4vZ2xURkFuaW1hdGlvblwiO1xyXG5pbXBvcnQgeyBDYW1lcmEgfSBmcm9tIFwiY29yZS9DYW1lcmFzL2NhbWVyYVwiO1xyXG5pbXBvcnQgeyBFbmdpbmVTdG9yZSB9IGZyb20gXCJjb3JlL0VuZ2luZXMvZW5naW5lU3RvcmVcIjtcclxuaW1wb3J0IHsgTXVsdGlNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tdWx0aU1hdGVyaWFsXCI7XHJcblxyXG4vLyBNYXRyaXggdGhhdCBjb252ZXJ0cyBoYW5kZWRuZXNzIG9uIHRoZSBYLWF4aXMuXHJcbmNvbnN0IGNvbnZlcnRIYW5kZWRuZXNzTWF0cml4ID0gTWF0cml4LkNvbXBvc2UobmV3IFZlY3RvcjMoLTEsIDEsIDEpLCBRdWF0ZXJuaW9uLklkZW50aXR5KCksIFZlY3RvcjMuWmVybygpKTtcclxuXHJcbi8vIDE4MCBkZWdyZWVzIHJvdGF0aW9uIGluIFkuXHJcbmNvbnN0IHJvdGF0aW9uMTgwWSA9IG5ldyBRdWF0ZXJuaW9uKDAsIDEsIDAsIDApO1xyXG5cclxuZnVuY3Rpb24gaXNOb29wTm9kZShub2RlOiBOb2RlLCB1c2VSaWdodEhhbmRlZFN5c3RlbTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIFRyYW5zZm9ybU5vZGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRyYW5zZm9ybVxyXG4gICAgaWYgKHVzZVJpZ2h0SGFuZGVkU3lzdGVtKSB7XHJcbiAgICAgICAgY29uc3QgbWF0cml4ID0gbm9kZS5nZXRXb3JsZE1hdHJpeCgpO1xyXG4gICAgICAgIGlmICghbWF0cml4LmlzSWRlbnRpdHkoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBtYXRyaXggPSBub2RlLmdldFdvcmxkTWF0cml4KCkubXVsdGlwbHlUb1JlZihjb252ZXJ0SGFuZGVkbmVzc01hdHJpeCwgVG1wVmVjdG9ycy5NYXRyaXhbMF0pO1xyXG4gICAgICAgIGlmICghbWF0cml4LmlzSWRlbnRpdHkoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEdlb21ldHJ5XHJcbiAgICBpZiAoKG5vZGUgaW5zdGFuY2VvZiBNZXNoICYmIG5vZGUuZ2VvbWV0cnkpIHx8IChub2RlIGluc3RhbmNlb2YgSW5zdGFuY2VkTWVzaCAmJiBub2RlLnNvdXJjZU1lc2guZ2VvbWV0cnkpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb252ZXJ0Tm9kZUhhbmRlZG5lc3Mobm9kZTogSU5vZGUpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gVmVjdG9yMy5Gcm9tQXJyYXlUb1JlZihub2RlLnRyYW5zbGF0aW9uIHx8IFswLCAwLCAwXSwgMCwgVG1wVmVjdG9ycy5WZWN0b3IzWzBdKTtcclxuICAgIGNvbnN0IHJvdGF0aW9uID0gUXVhdGVybmlvbi5Gcm9tQXJyYXlUb1JlZihub2RlLnJvdGF0aW9uIHx8IFswLCAwLCAwLCAxXSwgMCwgVG1wVmVjdG9ycy5RdWF0ZXJuaW9uWzBdKTtcclxuICAgIGNvbnN0IHNjYWxlID0gVmVjdG9yMy5Gcm9tQXJyYXlUb1JlZihub2RlLnNjYWxlIHx8IFsxLCAxLCAxXSwgMCwgVG1wVmVjdG9ycy5WZWN0b3IzWzFdKTtcclxuICAgIGNvbnN0IG1hdHJpeCA9IE1hdHJpeC5Db21wb3NlVG9SZWYoc2NhbGUsIHJvdGF0aW9uLCB0cmFuc2xhdGlvbiwgVG1wVmVjdG9ycy5NYXRyaXhbMF0pLm11bHRpcGx5VG9SZWYoY29udmVydEhhbmRlZG5lc3NNYXRyaXgsIFRtcFZlY3RvcnMuTWF0cml4WzBdKTtcclxuXHJcbiAgICBtYXRyaXguZGVjb21wb3NlKHNjYWxlLCByb3RhdGlvbiwgdHJhbnNsYXRpb24pO1xyXG5cclxuICAgIGlmICh0cmFuc2xhdGlvbi5lcXVhbHNUb0Zsb2F0cygwLCAwLCAwKSkge1xyXG4gICAgICAgIGRlbGV0ZSBub2RlLnRyYW5zbGF0aW9uO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBub2RlLnRyYW5zbGF0aW9uID0gdHJhbnNsYXRpb24uYXNBcnJheSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChRdWF0ZXJuaW9uLklzSWRlbnRpdHkocm90YXRpb24pKSB7XHJcbiAgICAgICAgZGVsZXRlIG5vZGUucm90YXRpb247XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5vZGUucm90YXRpb24gPSByb3RhdGlvbi5hc0FycmF5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNjYWxlLmVxdWFsc1RvRmxvYXRzKDEsIDEsIDEpKSB7XHJcbiAgICAgICAgZGVsZXRlIG5vZGUuc2NhbGU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5vZGUuc2NhbGUgPSBzY2FsZS5hc0FycmF5KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEJpbmFyeVdyaXRlckZ1bmMoYmluYXJ5V3JpdGVyOiBfQmluYXJ5V3JpdGVyLCBhdHRyaWJ1dGVDb21wb25lbnRLaW5kOiBBY2Nlc3NvckNvbXBvbmVudFR5cGUpOiBOdWxsYWJsZTwoZW50cnk6IG51bWJlciwgYnl0ZU9mZnNldD86IG51bWJlcikgPT4gdm9pZD4ge1xyXG4gICAgc3dpdGNoIChhdHRyaWJ1dGVDb21wb25lbnRLaW5kKSB7XHJcbiAgICAgICAgY2FzZSBBY2Nlc3NvckNvbXBvbmVudFR5cGUuVU5TSUdORURfQllURToge1xyXG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5V3JpdGVyLnNldFVJbnQ4LmJpbmQoYmluYXJ5V3JpdGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBBY2Nlc3NvckNvbXBvbmVudFR5cGUuVU5TSUdORURfU0hPUlQ6IHtcclxuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeVdyaXRlci5zZXRVSW50MTYuYmluZChiaW5hcnlXcml0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIEFjY2Vzc29yQ29tcG9uZW50VHlwZS5VTlNJR05FRF9JTlQ6IHtcclxuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeVdyaXRlci5zZXRVSW50MzIuYmluZChiaW5hcnlXcml0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIEFjY2Vzc29yQ29tcG9uZW50VHlwZS5GTE9BVDoge1xyXG4gICAgICAgICAgICByZXR1cm4gYmluYXJ5V3JpdGVyLnNldEZsb2F0MzIuYmluZChiaW5hcnlXcml0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgIFRvb2xzLldhcm4oXCJVbnN1cHBvcnRlZCBBdHRyaWJ1dGUgQ29tcG9uZW50IGtpbmQ6IFwiICsgYXR0cmlidXRlQ29tcG9uZW50S2luZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFV0aWxpdHkgaW50ZXJmYWNlIGZvciBzdG9yaW5nIHZlcnRleCBhdHRyaWJ1dGUgZGF0YVxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuaW50ZXJmYWNlIF9JVmVydGV4QXR0cmlidXRlRGF0YSB7XHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZmllcyB0aGUgQmFieWxvbiBWZXJ0ZXggQnVmZmVyIFR5cGUgKFBvc2l0aW9uLCBOb3JtYWwsIENvbG9yLCBldGMuKVxyXG4gICAgICovXHJcbiAgICBraW5kOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGdsVEYgQWNjZXNzb3IgVHlwZSAoVkVDMiwgVkVDMywgZXRjLilcclxuICAgICAqL1xyXG4gICAgYWNjZXNzb3JUeXBlOiBBY2Nlc3NvclR5cGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGdsVEYgQWNjZXNzb3IgQ29tcG9uZW50IFR5cGUgKEJZVEUsIFVOU0lHTkVEX0JZVEUsIEZMT0FULCBTSE9SVCwgSU5ULCBldGMuLilcclxuICAgICAqL1xyXG4gICAgYWNjZXNzb3JDb21wb25lbnRUeXBlOiBBY2Nlc3NvckNvbXBvbmVudFR5cGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZpZXMgdGhlIEJ1ZmZlclZpZXcgaW5kZXggZm9yIHRoZSB2ZXJ0ZXggYXR0cmlidXRlIGRhdGFcclxuICAgICAqL1xyXG4gICAgYnVmZmVyVmlld0luZGV4PzogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmaWVzIHRoZSBudW1iZXIgb2YgYnl0ZXMgcGVyIGF0dHJpYnV0ZSBlbGVtZW50IChlLmcuIHBvc2l0aW9uIHdvdWxkIGJlIDMgZmxvYXRzICh4L3kveikgd2hlcmUgZWFjaCBmbG9hdCBpcyA0IGJ5dGVzLCBzbyBhIDEyIGJ5dGUgc3RyaWRlKVxyXG4gICAgICovXHJcbiAgICBieXRlU3RyaWRlPzogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmaWVzIGluZm9ybWF0aW9uIGFib3V0IGVhY2ggbW9ycGggdGFyZ2V0IGFzc29jaWF0ZWQgd2l0aCB0aGlzIGF0dHJpYnV0ZVxyXG4gICAgICovXHJcbiAgICBtb3JwaFRhcmdldEluZm8/OiBSZWFkb25seTx7IGJ1ZmZlclZpZXdJbmRleDogbnVtYmVyOyB2ZXJ0ZXhDb3VudDogbnVtYmVyOyBhY2Nlc3NvclR5cGU6IEFjY2Vzc29yVHlwZTsgbWluTWF4PzogeyBtaW46IFZlY3RvcjM7IG1heDogVmVjdG9yMyB9IH0+W107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBCYWJ5bG9uIFNjZW5lIGludG8gZ2xURiAyLjAuXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIF9FeHBvcnRlciB7XHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlcyB0aGUgZ2xURiB0byBleHBvcnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9nbFRGOiBJR0xURjtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGFsbCBnZW5lcmF0ZWQgYnVmZmVyIHZpZXdzLCB3aGljaCByZXByZXNlbnRzIHZpZXdzIGludG8gdGhlIG1haW4gZ2xURiBidWZmZXIgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2J1ZmZlclZpZXdzOiBJQnVmZmVyVmlld1tdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yZXMgYWxsIHRoZSBnZW5lcmF0ZWQgYWNjZXNzb3JzLCB3aGljaCBpcyB1c2VkIGZvciBhY2Nlc3NpbmcgdGhlIGRhdGEgd2l0aGluIHRoZSBidWZmZXIgdmlld3MgaW4gZ2xURlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2FjY2Vzc29yczogSUFjY2Vzc29yW107XHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlcyBhbGwgdGhlIGdlbmVyYXRlZCBub2Rlcywgd2hpY2ggY29udGFpbnMgdHJhbnNmb3JtIGFuZC9vciBtZXNoIGluZm9ybWF0aW9uIHBlciBub2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfbm9kZXM6IElOb2RlW107XHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlcyBhbGwgdGhlIGdlbmVyYXRlZCBnbFRGIHNjZW5lcywgd2hpY2ggc3RvcmVzIG11bHRpcGxlIG5vZGUgaGllcmFyY2hpZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc2NlbmVzOiBJU2NlbmVbXTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGFsbCB0aGUgZ2VuZXJhdGVkIGdsVEYgY2FtZXJhc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jYW1lcmFzOiBJQ2FtZXJhW107XHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlcyBhbGwgdGhlIGdlbmVyYXRlZCBtZXNoIGluZm9ybWF0aW9uLCBlYWNoIGNvbnRhaW5pbmcgYSBzZXQgb2YgcHJpbWl0aXZlcyB0byByZW5kZXIgaW4gZ2xURlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9tZXNoZXM6IElNZXNoW107XHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlcyBhbGwgdGhlIGdlbmVyYXRlZCBtYXRlcmlhbCBpbmZvcm1hdGlvbiwgd2hpY2ggcmVwcmVzZW50cyB0aGUgYXBwZWFyYW5jZSBvZiBlYWNoIHByaW1pdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX21hdGVyaWFsczogSU1hdGVyaWFsW107XHJcblxyXG4gICAgcHVibGljIF9tYXRlcmlhbE1hcDogeyBbbWF0ZXJpYWxJRDogbnVtYmVyXTogbnVtYmVyIH07XHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlcyBhbGwgdGhlIGdlbmVyYXRlZCB0ZXh0dXJlIGluZm9ybWF0aW9uLCB3aGljaCBpcyByZWZlcmVuY2VkIGJ5IGdsVEYgbWF0ZXJpYWxzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfdGV4dHVyZXM6IElUZXh0dXJlW107XHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlcyBhbGwgdGhlIGdlbmVyYXRlZCBpbWFnZSBpbmZvcm1hdGlvbiwgd2hpY2ggaXMgcmVmZXJlbmNlZCBieSBnbFRGIHRleHR1cmVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfaW1hZ2VzOiBJSW1hZ2VbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlcyBhbGwgdGhlIHRleHR1cmUgc2FtcGxlcnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9zYW1wbGVyczogSVNhbXBsZXJbXTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGFsbCB0aGUgZ2VuZXJhdGVkIGdsVEYgc2tpbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9za2luczogSVNraW5bXTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGFsbCB0aGUgZ2VuZXJhdGVkIGFuaW1hdGlvbiBzYW1wbGVycywgd2hpY2ggaXMgcmVmZXJlbmNlZCBieSBnbFRGIGFuaW1hdGlvbnNcclxuICAgICAqL1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yZXMgdGhlIGFuaW1hdGlvbnMgZm9yIGdsVEYgbW9kZWxzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2FuaW1hdGlvbnM6IElBbmltYXRpb25bXTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIHRoZSB0b3RhbCBhbW91bnQgb2YgYnl0ZXMgc3RvcmVkIGluIHRoZSBnbFRGIGJ1ZmZlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF90b3RhbEJ5dGVMZW5ndGg6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGEgcmVmZXJlbmNlIHRvIHRoZSBCYWJ5bG9uIHNjZW5lIGNvbnRhaW5pbmcgdGhlIHNvdXJjZSBnZW9tZXRyeSBhbmQgbWF0ZXJpYWwgaW5mb3JtYXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIF9iYWJ5bG9uU2NlbmU6IFNjZW5lO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yZXMgYSBtYXAgb2YgdGhlIGltYWdlIGRhdGEsIHdoZXJlIHRoZSBrZXkgaXMgdGhlIGZpbGUgbmFtZSBhbmQgdGhlIHZhbHVlXHJcbiAgICAgKiBpcyB0aGUgaW1hZ2UgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2ltYWdlRGF0YTogeyBbZmlsZU5hbWU6IHN0cmluZ106IHsgZGF0YTogQXJyYXlCdWZmZXI7IG1pbWVUeXBlOiBJbWFnZU1pbWVUeXBlIH0gfTtcclxuXHJcbiAgICBwcml2YXRlIF9vcmRlcmVkSW1hZ2VEYXRhOiBBcnJheTx7IGRhdGE6IEFycmF5QnVmZmVyOyBtaW1lVHlwZTogSW1hZ2VNaW1lVHlwZSB9PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlcyBhIG1hcCBvZiB0aGUgdW5pcXVlIGlkIG9mIGEgbm9kZSB0byBpdHMgaW5kZXggaW4gdGhlIG5vZGUgYXJyYXlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfbm9kZU1hcDogeyBba2V5OiBudW1iZXJdOiBudW1iZXIgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEJha2VkIGFuaW1hdGlvbiBzYW1wbGUgcmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9hbmltYXRpb25TYW1wbGVSYXRlOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogSUV4cG9ydE9wdGlvbnM7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9jYWxFbmdpbmU6IEVuZ2luZTtcclxuXHJcbiAgICBwdWJsaWMgX2dsVEZNYXRlcmlhbEV4cG9ydGVyOiBfR0xURk1hdGVyaWFsRXhwb3J0ZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfZXh0ZW5zaW9uczogeyBbbmFtZTogc3RyaW5nXTogSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIH0gPSB7fTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfRXh0ZW5zaW9uTmFtZXMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0V4dGVuc2lvbkZhY3RvcmllczogeyBbbmFtZTogc3RyaW5nXTogKGV4cG9ydGVyOiBfRXhwb3J0ZXIpID0+IElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB9ID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSBfYXBwbHlFeHRlbnNpb248VD4oXHJcbiAgICAgICAgbm9kZTogTnVsbGFibGU8VD4sXHJcbiAgICAgICAgZXh0ZW5zaW9uczogSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyW10sXHJcbiAgICAgICAgaW5kZXg6IG51bWJlcixcclxuICAgICAgICBhY3Rpb25Bc3luYzogKGV4dGVuc2lvbjogSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyLCBub2RlOiBOdWxsYWJsZTxUPikgPT4gUHJvbWlzZTxOdWxsYWJsZTxUPj4gfCB1bmRlZmluZWRcclxuICAgICk6IFByb21pc2U8TnVsbGFibGU8VD4+IHtcclxuICAgICAgICBpZiAoaW5kZXggPj0gZXh0ZW5zaW9ucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRQcm9taXNlID0gYWN0aW9uQXN5bmMoZXh0ZW5zaW9uc1tpbmRleF0sIG5vZGUpO1xyXG5cclxuICAgICAgICBpZiAoIWN1cnJlbnRQcm9taXNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcHBseUV4dGVuc2lvbihub2RlLCBleHRlbnNpb25zLCBpbmRleCArIDEsIGFjdGlvbkFzeW5jKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvbWlzZS50aGVuKChuZXdOb2RlKSA9PiB0aGlzLl9hcHBseUV4dGVuc2lvbihuZXdOb2RlLCBleHRlbnNpb25zLCBpbmRleCArIDEsIGFjdGlvbkFzeW5jKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYXBwbHlFeHRlbnNpb25zPFQ+KFxyXG4gICAgICAgIG5vZGU6IE51bGxhYmxlPFQ+LFxyXG4gICAgICAgIGFjdGlvbkFzeW5jOiAoZXh0ZW5zaW9uOiBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIsIG5vZGU6IE51bGxhYmxlPFQ+KSA9PiBQcm9taXNlPE51bGxhYmxlPFQ+PiB8IHVuZGVmaW5lZFxyXG4gICAgKTogUHJvbWlzZTxOdWxsYWJsZTxUPj4ge1xyXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbnM6IElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMltdID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIF9FeHBvcnRlci5fRXh0ZW5zaW9uTmFtZXMpIHtcclxuICAgICAgICAgICAgZXh0ZW5zaW9ucy5wdXNoKHRoaXMuX2V4dGVuc2lvbnNbbmFtZV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5RXh0ZW5zaW9uKG5vZGUsIGV4dGVuc2lvbnMsIDAsIGFjdGlvbkFzeW5jKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgX2V4dGVuc2lvbnNQcmVFeHBvcnRUZXh0dXJlQXN5bmMoY29udGV4dDogc3RyaW5nLCBiYWJ5bG9uVGV4dHVyZTogTnVsbGFibGU8VGV4dHVyZT4sIG1pbWVUeXBlOiBJbWFnZU1pbWVUeXBlKTogUHJvbWlzZTxOdWxsYWJsZTxCYXNlVGV4dHVyZT4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlFeHRlbnNpb25zKGJhYnlsb25UZXh0dXJlLCAoZXh0ZW5zaW9uLCBub2RlKSA9PiBleHRlbnNpb24ucHJlRXhwb3J0VGV4dHVyZUFzeW5jICYmIGV4dGVuc2lvbi5wcmVFeHBvcnRUZXh0dXJlQXN5bmMoY29udGV4dCwgbm9kZSwgbWltZVR5cGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgX2V4dGVuc2lvbnNQb3N0RXhwb3J0TWVzaFByaW1pdGl2ZUFzeW5jKFxyXG4gICAgICAgIGNvbnRleHQ6IHN0cmluZyxcclxuICAgICAgICBtZXNoUHJpbWl0aXZlOiBJTWVzaFByaW1pdGl2ZSxcclxuICAgICAgICBiYWJ5bG9uU3ViTWVzaDogU3ViTWVzaCxcclxuICAgICAgICBiaW5hcnlXcml0ZXI6IF9CaW5hcnlXcml0ZXJcclxuICAgICk6IFByb21pc2U8TnVsbGFibGU8SU1lc2hQcmltaXRpdmU+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5RXh0ZW5zaW9ucyhcclxuICAgICAgICAgICAgbWVzaFByaW1pdGl2ZSxcclxuICAgICAgICAgICAgKGV4dGVuc2lvbiwgbm9kZSkgPT4gZXh0ZW5zaW9uLnBvc3RFeHBvcnRNZXNoUHJpbWl0aXZlQXN5bmMgJiYgZXh0ZW5zaW9uLnBvc3RFeHBvcnRNZXNoUHJpbWl0aXZlQXN5bmMoY29udGV4dCwgbm9kZSwgYmFieWxvblN1Yk1lc2gsIGJpbmFyeVdyaXRlcilcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBfZXh0ZW5zaW9uc1Bvc3RFeHBvcnROb2RlQXN5bmMoXHJcbiAgICAgICAgY29udGV4dDogc3RyaW5nLFxyXG4gICAgICAgIG5vZGU6IE51bGxhYmxlPElOb2RlPixcclxuICAgICAgICBiYWJ5bG9uTm9kZTogTm9kZSxcclxuICAgICAgICBub2RlTWFwOiB7IFtrZXk6IG51bWJlcl06IG51bWJlciB9LFxyXG4gICAgICAgIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlclxyXG4gICAgKTogUHJvbWlzZTxOdWxsYWJsZTxJTm9kZT4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlFeHRlbnNpb25zKG5vZGUsIChleHRlbnNpb24sIG5vZGUpID0+IGV4dGVuc2lvbi5wb3N0RXhwb3J0Tm9kZUFzeW5jICYmIGV4dGVuc2lvbi5wb3N0RXhwb3J0Tm9kZUFzeW5jKGNvbnRleHQsIG5vZGUsIGJhYnlsb25Ob2RlLCBub2RlTWFwLCBiaW5hcnlXcml0ZXIpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgX2V4dGVuc2lvbnNQb3N0RXhwb3J0TWF0ZXJpYWxBc3luYyhjb250ZXh0OiBzdHJpbmcsIG1hdGVyaWFsOiBOdWxsYWJsZTxJTWF0ZXJpYWw+LCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogUHJvbWlzZTxOdWxsYWJsZTxJTWF0ZXJpYWw+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5RXh0ZW5zaW9ucyhtYXRlcmlhbCwgKGV4dGVuc2lvbiwgbm9kZSkgPT4gZXh0ZW5zaW9uLnBvc3RFeHBvcnRNYXRlcmlhbEFzeW5jICYmIGV4dGVuc2lvbi5wb3N0RXhwb3J0TWF0ZXJpYWxBc3luYyhjb250ZXh0LCBub2RlLCBiYWJ5bG9uTWF0ZXJpYWwpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgX2V4dGVuc2lvbnNQb3N0RXhwb3J0TWF0ZXJpYWxBZGRpdGlvbmFsVGV4dHVyZXMoY29udGV4dDogc3RyaW5nLCBtYXRlcmlhbDogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogQmFzZVRleHR1cmVbXSB7XHJcbiAgICAgICAgY29uc3Qgb3V0cHV0OiBCYXNlVGV4dHVyZVtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBfRXhwb3J0ZXIuX0V4dGVuc2lvbk5hbWVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuX2V4dGVuc2lvbnNbbmFtZV07XHJcblxyXG4gICAgICAgICAgICBpZiAoZXh0ZW5zaW9uLnBvc3RFeHBvcnRNYXRlcmlhbEFkZGl0aW9uYWxUZXh0dXJlcykge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goLi4uZXh0ZW5zaW9uLnBvc3RFeHBvcnRNYXRlcmlhbEFkZGl0aW9uYWxUZXh0dXJlcyhjb250ZXh0LCBtYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIF9leHRlbnNpb25zUG9zdEV4cG9ydFRleHR1cmVzKGNvbnRleHQ6IHN0cmluZywgdGV4dHVyZUluZm86IElUZXh0dXJlSW5mbywgYmFieWxvblRleHR1cmU6IEJhc2VUZXh0dXJlKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIF9FeHBvcnRlci5fRXh0ZW5zaW9uTmFtZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgZXh0ZW5zaW9uID0gdGhpcy5fZXh0ZW5zaW9uc1tuYW1lXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChleHRlbnNpb24ucG9zdEV4cG9ydFRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbi5wb3N0RXhwb3J0VGV4dHVyZShjb250ZXh0LCB0ZXh0dXJlSW5mbywgYmFieWxvblRleHR1cmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2ZvckVhY2hFeHRlbnNpb25zKGFjdGlvbjogKGV4dGVuc2lvbjogSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIF9FeHBvcnRlci5fRXh0ZW5zaW9uTmFtZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgZXh0ZW5zaW9uID0gdGhpcy5fZXh0ZW5zaW9uc1tuYW1lXTtcclxuICAgICAgICAgICAgaWYgKGV4dGVuc2lvbi5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24oZXh0ZW5zaW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9leHRlbnNpb25zT25FeHBvcnRpbmcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZm9yRWFjaEV4dGVuc2lvbnMoKGV4dGVuc2lvbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXh0ZW5zaW9uLndhc1VzZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9nbFRGLmV4dGVuc2lvbnNVc2VkID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nbFRGLmV4dGVuc2lvbnNVc2VkID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dsVEYuZXh0ZW5zaW9uc1VzZWQuaW5kZXhPZihleHRlbnNpb24ubmFtZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2xURi5leHRlbnNpb25zVXNlZC5wdXNoKGV4dGVuc2lvbi5uYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXh0ZW5zaW9uLnJlcXVpcmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dsVEYuZXh0ZW5zaW9uc1JlcXVpcmVkID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2xURi5leHRlbnNpb25zUmVxdWlyZWQgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dsVEYuZXh0ZW5zaW9uc1JlcXVpcmVkLmluZGV4T2YoZXh0ZW5zaW9uLm5hbWUpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9nbFRGLmV4dGVuc2lvbnNSZXF1aXJlZC5wdXNoKGV4dGVuc2lvbi5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dsVEYuZXh0ZW5zaW9ucyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2xURi5leHRlbnNpb25zID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGV4dGVuc2lvbi5vbkV4cG9ydGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbi5vbkV4cG9ydGluZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIGdsVEYgc2VyaWFsaXplciBleHRlbnNpb25zXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2xvYWRFeHRlbnNpb25zKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBfRXhwb3J0ZXIuX0V4dGVuc2lvbk5hbWVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IF9FeHBvcnRlci5fRXh0ZW5zaW9uRmFjdG9yaWVzW25hbWVdKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9leHRlbnNpb25zW25hbWVdID0gZXh0ZW5zaW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBnbFRGIEV4cG9ydGVyIGluc3RhbmNlLCB3aGljaCBjYW4gYWNjZXB0IG9wdGlvbmFsIGV4cG9ydGVyIG9wdGlvbnNcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uU2NlbmUgQmFieWxvbiBzY2VuZSBvYmplY3RcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdG8gbW9kaWZ5IHRoZSBiZWhhdmlvciBvZiB0aGUgZXhwb3J0ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGJhYnlsb25TY2VuZT86IE51bGxhYmxlPFNjZW5lPiwgb3B0aW9ucz86IElFeHBvcnRPcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5fZ2xURiA9IHtcclxuICAgICAgICAgICAgYXNzZXQ6IHsgZ2VuZXJhdG9yOiBgQmFieWxvbi5qcyB2JHtFbmdpbmUuVmVyc2lvbn1gLCB2ZXJzaW9uOiBcIjIuMFwiIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgICBiYWJ5bG9uU2NlbmUgPSBiYWJ5bG9uU2NlbmUgfHwgRW5naW5lU3RvcmUuTGFzdENyZWF0ZWRTY2VuZTtcclxuICAgICAgICBpZiAoIWJhYnlsb25TY2VuZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2JhYnlsb25TY2VuZSA9IGJhYnlsb25TY2VuZTtcclxuICAgICAgICB0aGlzLl9idWZmZXJWaWV3cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2FjY2Vzc29ycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX21lc2hlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3NjZW5lcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2NhbWVyYXMgPSBbXTtcclxuICAgICAgICB0aGlzLl9ub2RlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX21hdGVyaWFscyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX21hdGVyaWFsTWFwID0gW107XHJcbiAgICAgICAgdGhpcy5fdGV4dHVyZXMgPSBbXTtcclxuICAgICAgICB0aGlzLl9zYW1wbGVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3NraW5zID0gW107XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2ltYWdlRGF0YSA9IHt9O1xyXG4gICAgICAgIHRoaXMuX29yZGVyZWRJbWFnZURhdGEgPSBbXTtcclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICB0aGlzLl9hbmltYXRpb25TYW1wbGVSYXRlID0gdGhpcy5fb3B0aW9ucy5hbmltYXRpb25TYW1wbGVSYXRlIHx8IDEgLyA2MDtcclxuXHJcbiAgICAgICAgdGhpcy5fZ2xURk1hdGVyaWFsRXhwb3J0ZXIgPSBuZXcgX0dMVEZNYXRlcmlhbEV4cG9ydGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2xvYWRFeHRlbnNpb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBleHRlbnNpb25LZXkgaW4gdGhpcy5fZXh0ZW5zaW9ucykge1xyXG4gICAgICAgICAgICBjb25zdCBleHRlbnNpb24gPSB0aGlzLl9leHRlbnNpb25zW2V4dGVuc2lvbktleV07XHJcblxyXG4gICAgICAgICAgICBleHRlbnNpb24uZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG9wdGlvbnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlcnMgYSBnbFRGIGV4cG9ydGVyIGV4dGVuc2lvblxyXG4gICAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgZXh0ZW5zaW9uIHRvIGV4cG9ydFxyXG4gICAgICogQHBhcmFtIGZhY3RvcnkgVGhlIGZhY3RvcnkgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIHRoZSBleHBvcnRlciBleHRlbnNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBSZWdpc3RlckV4dGVuc2lvbihuYW1lOiBzdHJpbmcsIGZhY3Rvcnk6IChleHBvcnRlcjogX0V4cG9ydGVyKSA9PiBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoX0V4cG9ydGVyLlVucmVnaXN0ZXJFeHRlbnNpb24obmFtZSkpIHtcclxuICAgICAgICAgICAgVG9vbHMuV2FybihgRXh0ZW5zaW9uIHdpdGggdGhlIG5hbWUgJHtuYW1lfSBhbHJlYWR5IGV4aXN0c2ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX0V4cG9ydGVyLl9FeHRlbnNpb25GYWN0b3JpZXNbbmFtZV0gPSBmYWN0b3J5O1xyXG4gICAgICAgIF9FeHBvcnRlci5fRXh0ZW5zaW9uTmFtZXMucHVzaChuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuLXJlZ2lzdGVycyBhbiBleHBvcnRlciBleHRlbnNpb25cclxuICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIGZvIHRoZSBleHBvcnRlciBleHRlbnNpb25cclxuICAgICAqIEByZXR1cm5zIEEgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGV4dGVuc2lvbiBoYXMgYmVlbiB1bi1yZWdpc3RlcmVkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVW5yZWdpc3RlckV4dGVuc2lvbihuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIV9FeHBvcnRlci5fRXh0ZW5zaW9uRmFjdG9yaWVzW25hbWVdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVsZXRlIF9FeHBvcnRlci5fRXh0ZW5zaW9uRmFjdG9yaWVzW25hbWVdO1xyXG5cclxuICAgICAgICBjb25zdCBpbmRleCA9IF9FeHBvcnRlci5fRXh0ZW5zaW9uTmFtZXMuaW5kZXhPZihuYW1lKTtcclxuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgIF9FeHBvcnRlci5fRXh0ZW5zaW9uTmFtZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3Jlb3JkZXJJbmRpY2VzQmFzZWRPblByaW1pdGl2ZU1vZGUoc3VibWVzaDogU3ViTWVzaCwgcHJpbWl0aXZlTW9kZTogbnVtYmVyLCBiYWJ5bG9uSW5kaWNlczogSW5kaWNlc0FycmF5LCBieXRlT2Zmc2V0OiBudW1iZXIsIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlcikge1xyXG4gICAgICAgIHN3aXRjaCAocHJpbWl0aXZlTW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIE1hdGVyaWFsLlRyaWFuZ2xlRmlsbE1vZGU6IHtcclxuICAgICAgICAgICAgICAgIGlmICghYnl0ZU9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHN1Ym1lc2guaW5kZXhTdGFydCwgbGVuZ3RoID0gc3VibWVzaC5pbmRleFN0YXJ0ICsgc3VibWVzaC5pbmRleENvdW50OyBpIDwgbGVuZ3RoOyBpID0gaSArIDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGJ5dGVPZmZzZXQgKyBpICogNDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzd2FwIHRoZSBzZWNvbmQgYW5kIHRoaXJkIGluZGljZXNcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWNvbmRJbmRleCA9IGJpbmFyeVdyaXRlci5nZXRVSW50MzIoaW5kZXggKyA0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGlyZEluZGV4ID0gYmluYXJ5V3JpdGVyLmdldFVJbnQzMihpbmRleCArIDgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlci5zZXRVSW50MzIodGhpcmRJbmRleCwgaW5kZXggKyA0KTtcclxuICAgICAgICAgICAgICAgICAgICBiaW5hcnlXcml0ZXIuc2V0VUludDMyKHNlY29uZEluZGV4LCBpbmRleCArIDgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBNYXRlcmlhbC5UcmlhbmdsZUZhbkRyYXdNb2RlOiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gc3VibWVzaC5pbmRleFN0YXJ0ICsgc3VibWVzaC5pbmRleENvdW50IC0gMSwgc3RhcnQgPSBzdWJtZXNoLmluZGV4U3RhcnQ7IGkgPj0gc3RhcnQ7IC0taSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlci5zZXRVSW50MzIoYmFieWxvbkluZGljZXNbaV0sIGJ5dGVPZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgKz0gNDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgTWF0ZXJpYWwuVHJpYW5nbGVTdHJpcERyYXdNb2RlOiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3VibWVzaC5pbmRleENvdW50ID49IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBiaW5hcnlXcml0ZXIuc2V0VUludDMyKGJhYnlsb25JbmRpY2VzW3N1Ym1lc2guaW5kZXhTdGFydCArIDJdLCBieXRlT2Zmc2V0ICsgNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmluYXJ5V3JpdGVyLnNldFVJbnQzMihiYWJ5bG9uSW5kaWNlc1tzdWJtZXNoLmluZGV4U3RhcnQgKyAxXSwgYnl0ZU9mZnNldCArIDgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW9yZGVycyB0aGUgdmVydGV4IGF0dHJpYnV0ZSBkYXRhIGJhc2VkIG9uIHRoZSBwcmltaXRpdmUgbW9kZS4gIFRoaXMgaXMgbmVjZXNzYXJ5IHdoZW4gaW5kaWNlcyBhcmUgbm90IGF2YWlsYWJsZSBhbmQgdGhlIHdpbmRpbmcgb3JkZXIgaXNcclxuICAgICAqIGNsb2NrLXdpc2UgZHVyaW5nIGV4cG9ydCB0byBnbFRGXHJcbiAgICAgKiBAcGFyYW0gc3VibWVzaCBCYWJ5bG9uSlMgc3VibWVzaFxyXG4gICAgICogQHBhcmFtIHByaW1pdGl2ZU1vZGUgUHJpbWl0aXZlIG1vZGUgb2YgdGhlIG1lc2hcclxuICAgICAqIEBwYXJhbSB2ZXJ0ZXhCdWZmZXJLaW5kIFRoZSB0eXBlIG9mIHZlcnRleCBhdHRyaWJ1dGVcclxuICAgICAqIEBwYXJhbSBtZXNoQXR0cmlidXRlQXJyYXkgVGhlIHZlcnRleCBhdHRyaWJ1dGUgZGF0YVxyXG4gICAgICogQHBhcmFtIGJ5dGVPZmZzZXQgVGhlIG9mZnNldCB0byB0aGUgYmluYXJ5IGRhdGFcclxuICAgICAqIEBwYXJhbSBiaW5hcnlXcml0ZXIgVGhlIGJpbmFyeSBkYXRhIGZvciB0aGUgZ2xURiBmaWxlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3Jlb3JkZXJWZXJ0ZXhBdHRyaWJ1dGVEYXRhQmFzZWRPblByaW1pdGl2ZU1vZGUoXHJcbiAgICAgICAgc3VibWVzaDogU3ViTWVzaCxcclxuICAgICAgICBwcmltaXRpdmVNb2RlOiBudW1iZXIsXHJcbiAgICAgICAgdmVydGV4QnVmZmVyS2luZDogc3RyaW5nLFxyXG4gICAgICAgIG1lc2hBdHRyaWJ1dGVBcnJheTogRmxvYXRBcnJheSxcclxuICAgICAgICBieXRlT2Zmc2V0OiBudW1iZXIsXHJcbiAgICAgICAgYmluYXJ5V3JpdGVyOiBfQmluYXJ5V3JpdGVyXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBzd2l0Y2ggKHByaW1pdGl2ZU1vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBNYXRlcmlhbC5UcmlhbmdsZUZpbGxNb2RlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW9yZGVyVHJpYW5nbGVGaWxsTW9kZShzdWJtZXNoLCB2ZXJ0ZXhCdWZmZXJLaW5kLCBtZXNoQXR0cmlidXRlQXJyYXksIGJ5dGVPZmZzZXQsIGJpbmFyeVdyaXRlcik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIE1hdGVyaWFsLlRyaWFuZ2xlU3RyaXBEcmF3TW9kZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVvcmRlclRyaWFuZ2xlU3RyaXBEcmF3TW9kZShzdWJtZXNoLCB2ZXJ0ZXhCdWZmZXJLaW5kLCBtZXNoQXR0cmlidXRlQXJyYXksIGJ5dGVPZmZzZXQsIGJpbmFyeVdyaXRlcik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIE1hdGVyaWFsLlRyaWFuZ2xlRmFuRHJhd01vZGU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlb3JkZXJUcmlhbmdsZUZhbk1vZGUoc3VibWVzaCwgdmVydGV4QnVmZmVyS2luZCwgbWVzaEF0dHJpYnV0ZUFycmF5LCBieXRlT2Zmc2V0LCBiaW5hcnlXcml0ZXIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW9yZGVycyB0aGUgdmVydGV4IGF0dHJpYnV0ZXMgaW4gdGhlIGNvcnJlY3QgdHJpYW5nbGUgbW9kZSBvcmRlciAuICBUaGlzIGlzIG5lY2Vzc2FyeSB3aGVuIGluZGljZXMgYXJlIG5vdCBhdmFpbGFibGUgYW5kIHRoZSB3aW5kaW5nIG9yZGVyIGlzXHJcbiAgICAgKiBjbG9jay13aXNlIGR1cmluZyBleHBvcnQgdG8gZ2xURlxyXG4gICAgICogQHBhcmFtIHN1Ym1lc2ggQmFieWxvbkpTIHN1Ym1lc2hcclxuICAgICAqIEBwYXJhbSB2ZXJ0ZXhCdWZmZXJLaW5kIFRoZSB0eXBlIG9mIHZlcnRleCBhdHRyaWJ1dGVcclxuICAgICAqIEBwYXJhbSBtZXNoQXR0cmlidXRlQXJyYXkgVGhlIHZlcnRleCBhdHRyaWJ1dGUgZGF0YVxyXG4gICAgICogQHBhcmFtIGJ5dGVPZmZzZXQgVGhlIG9mZnNldCB0byB0aGUgYmluYXJ5IGRhdGFcclxuICAgICAqIEBwYXJhbSBiaW5hcnlXcml0ZXIgVGhlIGJpbmFyeSBkYXRhIGZvciB0aGUgZ2xURiBmaWxlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3Jlb3JkZXJUcmlhbmdsZUZpbGxNb2RlKHN1Ym1lc2g6IFN1Yk1lc2gsIHZlcnRleEJ1ZmZlcktpbmQ6IHN0cmluZywgbWVzaEF0dHJpYnV0ZUFycmF5OiBGbG9hdEFycmF5LCBieXRlT2Zmc2V0OiBudW1iZXIsIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlcikge1xyXG4gICAgICAgIGNvbnN0IHZlcnRleEJ1ZmZlciA9IHRoaXMuX2dldFZlcnRleEJ1ZmZlckZyb21NZXNoKHZlcnRleEJ1ZmZlcktpbmQsIHN1Ym1lc2guZ2V0TWVzaCgpIGFzIE1lc2gpO1xyXG4gICAgICAgIGlmICh2ZXJ0ZXhCdWZmZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RyaWRlID0gdmVydGV4QnVmZmVyLmJ5dGVTdHJpZGUgLyBWZXJ0ZXhCdWZmZXIuR2V0VHlwZUJ5dGVMZW5ndGgodmVydGV4QnVmZmVyLnR5cGUpO1xyXG4gICAgICAgICAgICBpZiAoc3VibWVzaC52ZXJ0aWNlc0NvdW50ICUgMyAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuRXJyb3IoXCJUaGUgc3VibWVzaCB2ZXJ0aWNlcyBmb3IgdGhlIHRyaWFuZ2xlIGZpbGwgbW9kZSBpcyBub3QgZGl2aXNpYmxlIGJ5IDMhXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmVydGV4RGF0YTogVmVjdG9yMltdIHwgVmVjdG9yM1tdIHwgVmVjdG9yNFtdID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh2ZXJ0ZXhCdWZmZXJLaW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLk5vcm1hbEtpbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IHN1Ym1lc2gudmVydGljZXNTdGFydDsgeCA8IHN1Ym1lc2gudmVydGljZXNTdGFydCArIHN1Ym1lc2gudmVydGljZXNDb3VudDsgeCA9IHggKyAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHggKiBzdHJpZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmVydGV4RGF0YSBhcyBWZWN0b3IzW10pLnB1c2goVmVjdG9yMy5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZlcnRleERhdGEgYXMgVmVjdG9yM1tdKS5wdXNoKFZlY3RvcjMuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXggKyAyICogc3RyaWRlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmVydGV4RGF0YSBhcyBWZWN0b3IzW10pLnB1c2goVmVjdG9yMy5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCArIHN0cmlkZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5UYW5nZW50S2luZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gc3VibWVzaC52ZXJ0aWNlc1N0YXJ0OyB4IDwgc3VibWVzaC52ZXJ0aWNlc1N0YXJ0ICsgc3VibWVzaC52ZXJ0aWNlc0NvdW50OyB4ID0geCArIDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0geCAqIHN0cmlkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjRbXSkucHVzaChWZWN0b3I0LkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmVydGV4RGF0YSBhcyBWZWN0b3I0W10pLnB1c2goVmVjdG9yNC5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCArIDIgKiBzdHJpZGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjRbXSkucHVzaChWZWN0b3I0LkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4ICsgc3RyaWRlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLkNvbG9yS2luZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaXplID0gdmVydGV4QnVmZmVyLmdldFNpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IHN1Ym1lc2gudmVydGljZXNTdGFydDsgeCA8IHN1Ym1lc2gudmVydGljZXNTdGFydCArIHN1Ym1lc2gudmVydGljZXNDb3VudDsgeCA9IHggKyBzaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHggKiBzdHJpZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2l6ZSA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjRbXSkucHVzaChWZWN0b3I0LkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZlcnRleERhdGEgYXMgVmVjdG9yNFtdKS5wdXNoKFZlY3RvcjQuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXggKyAyICogc3RyaWRlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZlcnRleERhdGEgYXMgVmVjdG9yNFtdKS5wdXNoKFZlY3RvcjQuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXggKyBzdHJpZGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZlcnRleERhdGEgYXMgVmVjdG9yM1tdKS5wdXNoKFZlY3RvcjMuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmVydGV4RGF0YSBhcyBWZWN0b3IzW10pLnB1c2goVmVjdG9yMy5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCArIDIgKiBzdHJpZGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmVydGV4RGF0YSBhcyBWZWN0b3IzW10pLnB1c2goVmVjdG9yMy5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCArIHN0cmlkZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5VVktpbmQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuVVYyS2luZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gc3VibWVzaC52ZXJ0aWNlc1N0YXJ0OyB4IDwgc3VibWVzaC52ZXJ0aWNlc1N0YXJ0ICsgc3VibWVzaC52ZXJ0aWNlc0NvdW50OyB4ID0geCArIDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0geCAqIHN0cmlkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjJbXSkucHVzaChWZWN0b3IyLkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmVydGV4RGF0YSBhcyBWZWN0b3IyW10pLnB1c2goVmVjdG9yMi5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCArIDIgKiBzdHJpZGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjJbXSkucHVzaChWZWN0b3IyLkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4ICsgc3RyaWRlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVG9vbHMuRXJyb3IoYFVuc3VwcG9ydGVkIFZlcnRleCBCdWZmZXIgdHlwZTogJHt2ZXJ0ZXhCdWZmZXJLaW5kfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX3dyaXRlVmVydGV4QXR0cmlidXRlRGF0YSh2ZXJ0ZXhEYXRhLCBieXRlT2Zmc2V0LCB2ZXJ0ZXhCdWZmZXJLaW5kLCBiaW5hcnlXcml0ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgVG9vbHMuV2FybihgcmVvcmRlclRyaWFuZ2xlRmlsbE1vZGU6IFZlcnRleCBCdWZmZXIgS2luZCAke3ZlcnRleEJ1ZmZlcktpbmR9IG5vdCBwcmVzZW50IWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlb3JkZXJzIHRoZSB2ZXJ0ZXggYXR0cmlidXRlcyBpbiB0aGUgY29ycmVjdCB0cmlhbmdsZSBzdHJpcCBvcmRlci4gIFRoaXMgaXMgbmVjZXNzYXJ5IHdoZW4gaW5kaWNlcyBhcmUgbm90IGF2YWlsYWJsZSBhbmQgdGhlIHdpbmRpbmcgb3JkZXIgaXNcclxuICAgICAqIGNsb2NrLXdpc2UgZHVyaW5nIGV4cG9ydCB0byBnbFRGXHJcbiAgICAgKiBAcGFyYW0gc3VibWVzaCBCYWJ5bG9uSlMgc3VibWVzaFxyXG4gICAgICogQHBhcmFtIHZlcnRleEJ1ZmZlcktpbmQgVGhlIHR5cGUgb2YgdmVydGV4IGF0dHJpYnV0ZVxyXG4gICAgICogQHBhcmFtIG1lc2hBdHRyaWJ1dGVBcnJheSBUaGUgdmVydGV4IGF0dHJpYnV0ZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gYnl0ZU9mZnNldCBUaGUgb2Zmc2V0IHRvIHRoZSBiaW5hcnkgZGF0YVxyXG4gICAgICogQHBhcmFtIGJpbmFyeVdyaXRlciBUaGUgYmluYXJ5IGRhdGEgZm9yIHRoZSBnbFRGIGZpbGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfcmVvcmRlclRyaWFuZ2xlU3RyaXBEcmF3TW9kZShzdWJtZXNoOiBTdWJNZXNoLCB2ZXJ0ZXhCdWZmZXJLaW5kOiBzdHJpbmcsIG1lc2hBdHRyaWJ1dGVBcnJheTogRmxvYXRBcnJheSwgYnl0ZU9mZnNldDogbnVtYmVyLCBiaW5hcnlXcml0ZXI6IF9CaW5hcnlXcml0ZXIpIHtcclxuICAgICAgICBjb25zdCB2ZXJ0ZXhCdWZmZXIgPSB0aGlzLl9nZXRWZXJ0ZXhCdWZmZXJGcm9tTWVzaCh2ZXJ0ZXhCdWZmZXJLaW5kLCBzdWJtZXNoLmdldE1lc2goKSBhcyBNZXNoKTtcclxuICAgICAgICBpZiAodmVydGV4QnVmZmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0cmlkZSA9IHZlcnRleEJ1ZmZlci5ieXRlU3RyaWRlIC8gVmVydGV4QnVmZmVyLkdldFR5cGVCeXRlTGVuZ3RoKHZlcnRleEJ1ZmZlci50eXBlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHZlcnRleERhdGE6IFZlY3RvcjJbXSB8IFZlY3RvcjNbXSB8IFZlY3RvcjRbXSA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHZlcnRleEJ1ZmZlcktpbmQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLlBvc2l0aW9uS2luZDpcclxuICAgICAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLk5vcm1hbEtpbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHN1Ym1lc2gudmVydGljZXNTdGFydDtcclxuICAgICAgICAgICAgICAgICAgICAodmVydGV4RGF0YSBhcyBWZWN0b3IzW10pLnB1c2goVmVjdG9yMy5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCArIDIgKiBzdHJpZGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAodmVydGV4RGF0YSBhcyBWZWN0b3IzW10pLnB1c2goVmVjdG9yMy5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCArIHN0cmlkZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuVGFuZ2VudEtpbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gc3VibWVzaC52ZXJ0aWNlc1N0YXJ0ICsgc3VibWVzaC52ZXJ0aWNlc0NvdW50IC0gMTsgeCA+PSBzdWJtZXNoLnZlcnRpY2VzU3RhcnQ7IC0teCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHggKiBzdHJpZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjRbXSkucHVzaChWZWN0b3I0LkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuQ29sb3JLaW5kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IHN1Ym1lc2gudmVydGljZXNTdGFydCArIHN1Ym1lc2gudmVydGljZXNDb3VudCAtIDE7IHggPj0gc3VibWVzaC52ZXJ0aWNlc1N0YXJ0OyAtLXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSB4ICogc3RyaWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhCdWZmZXIuZ2V0U2l6ZSgpID09PSA0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjRbXSkucHVzaChWZWN0b3I0LkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKHZlcnRleERhdGEgYXMgVmVjdG9yM1tdKS5wdXNoKFZlY3RvcjMuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5VVktpbmQ6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5VVjJLaW5kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IHN1Ym1lc2gudmVydGljZXNTdGFydCArIHN1Ym1lc2gudmVydGljZXNDb3VudCAtIDE7IHggPj0gc3VibWVzaC52ZXJ0aWNlc1N0YXJ0OyAtLXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSB4ICogc3RyaWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAodmVydGV4RGF0YSBhcyBWZWN0b3IyW10pLnB1c2goVmVjdG9yMi5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBUb29scy5FcnJvcihgVW5zdXBwb3J0ZWQgVmVydGV4IEJ1ZmZlciB0eXBlOiAke3ZlcnRleEJ1ZmZlcktpbmR9YCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fd3JpdGVWZXJ0ZXhBdHRyaWJ1dGVEYXRhKHZlcnRleERhdGEsIGJ5dGVPZmZzZXQgKyAxMiwgdmVydGV4QnVmZmVyS2luZCwgYmluYXJ5V3JpdGVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBUb29scy5XYXJuKGByZW9yZGVyVHJpYW5nbGVTdHJpcERyYXdNb2RlOiBWZXJ0ZXggYnVmZmVyIGtpbmQgJHt2ZXJ0ZXhCdWZmZXJLaW5kfSBub3QgcHJlc2VudCFgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW9yZGVycyB0aGUgdmVydGV4IGF0dHJpYnV0ZXMgaW4gdGhlIGNvcnJlY3QgdHJpYW5nbGUgZmFuIG9yZGVyLiAgVGhpcyBpcyBuZWNlc3Nhcnkgd2hlbiBpbmRpY2VzIGFyZSBub3QgYXZhaWxhYmxlIGFuZCB0aGUgd2luZGluZyBvcmRlciBpc1xyXG4gICAgICogY2xvY2std2lzZSBkdXJpbmcgZXhwb3J0IHRvIGdsVEZcclxuICAgICAqIEBwYXJhbSBzdWJtZXNoIEJhYnlsb25KUyBzdWJtZXNoXHJcbiAgICAgKiBAcGFyYW0gdmVydGV4QnVmZmVyS2luZCBUaGUgdHlwZSBvZiB2ZXJ0ZXggYXR0cmlidXRlXHJcbiAgICAgKiBAcGFyYW0gbWVzaEF0dHJpYnV0ZUFycmF5IFRoZSB2ZXJ0ZXggYXR0cmlidXRlIGRhdGFcclxuICAgICAqIEBwYXJhbSBieXRlT2Zmc2V0IFRoZSBvZmZzZXQgdG8gdGhlIGJpbmFyeSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gYmluYXJ5V3JpdGVyIFRoZSBiaW5hcnkgZGF0YSBmb3IgdGhlIGdsVEYgZmlsZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9yZW9yZGVyVHJpYW5nbGVGYW5Nb2RlKHN1Ym1lc2g6IFN1Yk1lc2gsIHZlcnRleEJ1ZmZlcktpbmQ6IHN0cmluZywgbWVzaEF0dHJpYnV0ZUFycmF5OiBGbG9hdEFycmF5LCBieXRlT2Zmc2V0OiBudW1iZXIsIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlcikge1xyXG4gICAgICAgIGNvbnN0IHZlcnRleEJ1ZmZlciA9IHRoaXMuX2dldFZlcnRleEJ1ZmZlckZyb21NZXNoKHZlcnRleEJ1ZmZlcktpbmQsIHN1Ym1lc2guZ2V0TWVzaCgpIGFzIE1lc2gpO1xyXG4gICAgICAgIGlmICh2ZXJ0ZXhCdWZmZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RyaWRlID0gdmVydGV4QnVmZmVyLmJ5dGVTdHJpZGUgLyBWZXJ0ZXhCdWZmZXIuR2V0VHlwZUJ5dGVMZW5ndGgodmVydGV4QnVmZmVyLnR5cGUpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdmVydGV4RGF0YTogVmVjdG9yMltdIHwgVmVjdG9yM1tdIHwgVmVjdG9yNFtdID0gW107XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodmVydGV4QnVmZmVyS2luZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuTm9ybWFsS2luZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSBzdWJtZXNoLnZlcnRpY2VzU3RhcnQgKyBzdWJtZXNoLnZlcnRpY2VzQ291bnQgLSAxOyB4ID49IHN1Ym1lc2gudmVydGljZXNTdGFydDsgLS14KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0geCAqIHN0cmlkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHZlcnRleERhdGEgYXMgVmVjdG9yM1tdKS5wdXNoKFZlY3RvcjMuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5UYW5nZW50S2luZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSBzdWJtZXNoLnZlcnRpY2VzU3RhcnQgKyBzdWJtZXNoLnZlcnRpY2VzQ291bnQgLSAxOyB4ID49IHN1Ym1lc2gudmVydGljZXNTdGFydDsgLS14KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0geCAqIHN0cmlkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHZlcnRleERhdGEgYXMgVmVjdG9yNFtdKS5wdXNoKFZlY3RvcjQuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5Db2xvcktpbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gc3VibWVzaC52ZXJ0aWNlc1N0YXJ0ICsgc3VibWVzaC52ZXJ0aWNlc0NvdW50IC0gMTsgeCA+PSBzdWJtZXNoLnZlcnRpY2VzU3RhcnQ7IC0teCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHggKiBzdHJpZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjRbXSkucHVzaChWZWN0b3I0LkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRleEJ1ZmZlci5nZXRTaXplKCkgPT09IDRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKHZlcnRleERhdGEgYXMgVmVjdG9yNFtdKS5wdXNoKFZlY3RvcjQuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAodmVydGV4RGF0YSBhcyBWZWN0b3IzW10pLnB1c2goVmVjdG9yMy5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLlVWS2luZDpcclxuICAgICAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLlVWMktpbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gc3VibWVzaC52ZXJ0aWNlc1N0YXJ0ICsgc3VibWVzaC52ZXJ0aWNlc0NvdW50IC0gMTsgeCA+PSBzdWJtZXNoLnZlcnRpY2VzU3RhcnQ7IC0teCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHggKiBzdHJpZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjJbXSkucHVzaChWZWN0b3IyLkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFRvb2xzLkVycm9yKGBVbnN1cHBvcnRlZCBWZXJ0ZXggQnVmZmVyIHR5cGU6ICR7dmVydGV4QnVmZmVyS2luZH1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl93cml0ZVZlcnRleEF0dHJpYnV0ZURhdGEodmVydGV4RGF0YSwgYnl0ZU9mZnNldCwgdmVydGV4QnVmZmVyS2luZCwgYmluYXJ5V3JpdGVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBUb29scy5XYXJuKGByZW9yZGVyVHJpYW5nbGVGYW5Nb2RlOiBWZXJ0ZXggYnVmZmVyIGtpbmQgJHt2ZXJ0ZXhCdWZmZXJLaW5kfSBub3QgcHJlc2VudCFgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZXMgdGhlIHZlcnRleCBhdHRyaWJ1dGUgZGF0YSB0byBiaW5hcnlcclxuICAgICAqIEBwYXJhbSB2ZXJ0aWNlcyBUaGUgdmVydGljZXMgdG8gd3JpdGUgdG8gdGhlIGJpbmFyeSB3cml0ZXJcclxuICAgICAqIEBwYXJhbSBieXRlT2Zmc2V0IFRoZSBvZmZzZXQgaW50byB0aGUgYmluYXJ5IHdyaXRlciB0byBvdmVyd3JpdGUgYmluYXJ5IGRhdGFcclxuICAgICAqIEBwYXJhbSB2ZXJ0ZXhBdHRyaWJ1dGVLaW5kIFRoZSB2ZXJ0ZXggYXR0cmlidXRlIHR5cGVcclxuICAgICAqIEBwYXJhbSBiaW5hcnlXcml0ZXIgVGhlIHdyaXRlciBjb250YWluaW5nIHRoZSBiaW5hcnkgZGF0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF93cml0ZVZlcnRleEF0dHJpYnV0ZURhdGEodmVydGljZXM6IFZlY3RvcjJbXSB8IFZlY3RvcjNbXSB8IFZlY3RvcjRbXSwgYnl0ZU9mZnNldDogbnVtYmVyLCB2ZXJ0ZXhBdHRyaWJ1dGVLaW5kOiBzdHJpbmcsIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlcikge1xyXG4gICAgICAgIGZvciAoY29uc3QgdmVydGV4IG9mIHZlcnRpY2VzKSB7XHJcbiAgICAgICAgICAgIGlmICh2ZXJ0ZXhBdHRyaWJ1dGVLaW5kID09PSBWZXJ0ZXhCdWZmZXIuTm9ybWFsS2luZCkge1xyXG4gICAgICAgICAgICAgICAgdmVydGV4Lm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZlcnRleEF0dHJpYnV0ZUtpbmQgPT09IFZlcnRleEJ1ZmZlci5UYW5nZW50S2luZCAmJiB2ZXJ0ZXggaW5zdGFuY2VvZiBWZWN0b3I0KSB7XHJcbiAgICAgICAgICAgICAgICBfR0xURlV0aWxpdGllcy5fTm9ybWFsaXplVGFuZ2VudEZyb21SZWYodmVydGV4KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBjb21wb25lbnQgb2YgdmVydGV4LmFzQXJyYXkoKSkge1xyXG4gICAgICAgICAgICAgICAgYmluYXJ5V3JpdGVyLnNldEZsb2F0MzIoY29tcG9uZW50LCBieXRlT2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgKz0gNDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyBtZXNoIGF0dHJpYnV0ZSBkYXRhIHRvIGEgZGF0YSBidWZmZXJcclxuICAgICAqIFJldHVybnMgdGhlIGJ5dGVsZW5ndGggb2YgdGhlIGRhdGFcclxuICAgICAqIEBwYXJhbSB2ZXJ0ZXhCdWZmZXJLaW5kIEluZGljYXRlcyB3aGF0IGtpbmQgb2YgdmVydGV4IGRhdGEgaXMgYmVpbmcgcGFzc2VkIGluXHJcbiAgICAgKiBAcGFyYW0gYXR0cmlidXRlQ29tcG9uZW50S2luZFxyXG4gICAgICogQHBhcmFtIG1lc2hBdHRyaWJ1dGVBcnJheSBBcnJheSBjb250YWluaW5nIHRoZSBhdHRyaWJ1dGUgZGF0YVxyXG4gICAgICogQHBhcmFtIHN0cmlkZSBTcGVjaWZpZXMgdGhlIHNwYWNlIGJldHdlZW4gZGF0YVxyXG4gICAgICogQHBhcmFtIGJpbmFyeVdyaXRlciBUaGUgYnVmZmVyIHRvIHdyaXRlIHRoZSBiaW5hcnkgZGF0YSB0b1xyXG4gICAgICogQHBhcmFtIGJhYnlsb25UcmFuc2Zvcm1Ob2RlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfd3JpdGVBdHRyaWJ1dGVEYXRhKFxyXG4gICAgICAgIHZlcnRleEJ1ZmZlcktpbmQ6IHN0cmluZyxcclxuICAgICAgICBhdHRyaWJ1dGVDb21wb25lbnRLaW5kOiBBY2Nlc3NvckNvbXBvbmVudFR5cGUsXHJcbiAgICAgICAgbWVzaEF0dHJpYnV0ZUFycmF5OiBGbG9hdEFycmF5LFxyXG4gICAgICAgIHN0cmlkZTogbnVtYmVyLFxyXG4gICAgICAgIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlcixcclxuICAgICAgICBiYWJ5bG9uVHJhbnNmb3JtTm9kZTogVHJhbnNmb3JtTm9kZVxyXG4gICAgKSB7XHJcbiAgICAgICAgbGV0IHZlcnRleEF0dHJpYnV0ZXM6IG51bWJlcltdW10gPSBbXTtcclxuICAgICAgICBsZXQgaW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICAgICAgc3dpdGNoICh2ZXJ0ZXhCdWZmZXJLaW5kKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLlBvc2l0aW9uS2luZDoge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDAsIGxlbmd0aCA9IG1lc2hBdHRyaWJ1dGVBcnJheS5sZW5ndGggLyBzdHJpZGU7IGsgPCBsZW5ndGg7ICsraykge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gayAqIHN0cmlkZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2ZXJ0ZXhEYXRhID0gVmVjdG9yMy5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4QXR0cmlidXRlcy5wdXNoKHZlcnRleERhdGEuYXNBcnJheSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLk5vcm1hbEtpbmQ6IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwLCBsZW5ndGggPSBtZXNoQXR0cmlidXRlQXJyYXkubGVuZ3RoIC8gc3RyaWRlOyBrIDwgbGVuZ3RoOyArK2spIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGsgKiBzdHJpZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmVydGV4RGF0YSA9IFZlY3RvcjMuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleEF0dHJpYnV0ZXMucHVzaCh2ZXJ0ZXhEYXRhLm5vcm1hbGl6ZSgpLmFzQXJyYXkoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5UYW5nZW50S2luZDoge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDAsIGxlbmd0aCA9IG1lc2hBdHRyaWJ1dGVBcnJheS5sZW5ndGggLyBzdHJpZGU7IGsgPCBsZW5ndGg7ICsraykge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gayAqIHN0cmlkZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2ZXJ0ZXhEYXRhID0gVmVjdG9yNC5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX0dMVEZVdGlsaXRpZXMuX05vcm1hbGl6ZVRhbmdlbnRGcm9tUmVmKHZlcnRleERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleEF0dHJpYnV0ZXMucHVzaCh2ZXJ0ZXhEYXRhLmFzQXJyYXkoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5Db2xvcktpbmQ6IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc2hNYXRlcmlhbCA9IChiYWJ5bG9uVHJhbnNmb3JtTm9kZSBhcyBNZXNoKS5tYXRlcmlhbDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRUb0xpbmVhciA9IG1lc2hNYXRlcmlhbCA/IG1lc2hNYXRlcmlhbC5nZXRDbGFzc05hbWUoKSA9PT0gXCJTdGFuZGFyZE1hdGVyaWFsXCIgOiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmVydGV4RGF0YTogQ29sb3IzIHwgQ29sb3I0ID0gc3RyaWRlID09PSAzID8gbmV3IENvbG9yMygpIDogbmV3IENvbG9yNCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdXNlRXhhY3RTcmdiQ29udmVyc2lvbnMgPSB0aGlzLl9iYWJ5bG9uU2NlbmUuZ2V0RW5naW5lKCkudXNlRXhhY3RTcmdiQ29udmVyc2lvbnM7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMCwgbGVuZ3RoID0gbWVzaEF0dHJpYnV0ZUFycmF5Lmxlbmd0aCAvIHN0cmlkZTsgayA8IGxlbmd0aDsgKytrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBrICogc3RyaWRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJpZGUgPT09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29sb3IzLkZyb21BcnJheVRvUmVmKG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXgsIHZlcnRleERhdGEgYXMgQ29sb3IzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnZlcnRUb0xpbmVhcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZlcnRleERhdGEgYXMgQ29sb3IzKS50b0xpbmVhclNwYWNlVG9SZWYodmVydGV4RGF0YSBhcyBDb2xvcjMsIHVzZUV4YWN0U3JnYkNvbnZlcnNpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbG9yNC5Gcm9tQXJyYXlUb1JlZihtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4LCB2ZXJ0ZXhEYXRhIGFzIENvbG9yNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb252ZXJ0VG9MaW5lYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2ZXJ0ZXhEYXRhIGFzIENvbG9yNCkudG9MaW5lYXJTcGFjZVRvUmVmKHZlcnRleERhdGEgYXMgQ29sb3I0LCB1c2VFeGFjdFNyZ2JDb252ZXJzaW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4QXR0cmlidXRlcy5wdXNoKHZlcnRleERhdGEuYXNBcnJheSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLlVWS2luZDpcclxuICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuVVYyS2luZDoge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDAsIGxlbmd0aCA9IG1lc2hBdHRyaWJ1dGVBcnJheS5sZW5ndGggLyBzdHJpZGU7IGsgPCBsZW5ndGg7ICsraykge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gayAqIHN0cmlkZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2ZXJ0ZXhEYXRhID0gVmVjdG9yMi5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4QXR0cmlidXRlcy5wdXNoKHZlcnRleERhdGEuYXNBcnJheSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLk1hdHJpY2VzSW5kaWNlc0tpbmQ6XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLk1hdHJpY2VzSW5kaWNlc0V4dHJhS2luZDoge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDAsIGxlbmd0aCA9IG1lc2hBdHRyaWJ1dGVBcnJheS5sZW5ndGggLyBzdHJpZGU7IGsgPCBsZW5ndGg7ICsraykge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gayAqIHN0cmlkZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2ZXJ0ZXhEYXRhID0gVmVjdG9yNC5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4QXR0cmlidXRlcy5wdXNoKHZlcnRleERhdGEuYXNBcnJheSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLk1hdHJpY2VzV2VpZ2h0c0tpbmQ6XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLk1hdHJpY2VzV2VpZ2h0c0V4dHJhS2luZDoge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDAsIGxlbmd0aCA9IG1lc2hBdHRyaWJ1dGVBcnJheS5sZW5ndGggLyBzdHJpZGU7IGsgPCBsZW5ndGg7ICsraykge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gayAqIHN0cmlkZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2ZXJ0ZXhEYXRhID0gVmVjdG9yNC5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4QXR0cmlidXRlcy5wdXNoKHZlcnRleERhdGEuYXNBcnJheSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLldhcm4oXCJVbnN1cHBvcnRlZCBWZXJ0ZXggQnVmZmVyIFR5cGU6IFwiICsgdmVydGV4QnVmZmVyS2luZCk7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhBdHRyaWJ1dGVzID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdyaXRlQmluYXJ5RnVuYyA9IGdldEJpbmFyeVdyaXRlckZ1bmMoYmluYXJ5V3JpdGVyLCBhdHRyaWJ1dGVDb21wb25lbnRLaW5kKTtcclxuXHJcbiAgICAgICAgaWYgKHdyaXRlQmluYXJ5RnVuYykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZlcnRleEF0dHJpYnV0ZSBvZiB2ZXJ0ZXhBdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNvbXBvbmVudCBvZiB2ZXJ0ZXhBdHRyaWJ1dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZUJpbmFyeUZ1bmMoY29tcG9uZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jcmVhdGVNb3JwaFRhcmdldEJ1ZmZlclZpZXdLaW5kKFxyXG4gICAgICAgIHZlcnRleEJ1ZmZlcktpbmQ6IHN0cmluZyxcclxuICAgICAgICBhY2Nlc3NvclR5cGU6IEFjY2Vzc29yVHlwZSxcclxuICAgICAgICBhdHRyaWJ1dGVDb21wb25lbnRLaW5kOiBBY2Nlc3NvckNvbXBvbmVudFR5cGUsXHJcbiAgICAgICAgbWVzaDogTWVzaCxcclxuICAgICAgICBtb3JwaFRhcmdldDogTW9ycGhUYXJnZXQsXHJcbiAgICAgICAgYmluYXJ5V3JpdGVyOiBfQmluYXJ5V3JpdGVyLFxyXG4gICAgICAgIGJ5dGVTdHJpZGU6IG51bWJlclxyXG4gICAgKTogTnVsbGFibGU8eyBidWZmZXJWaWV3SW5kZXg6IG51bWJlcjsgdmVydGV4Q291bnQ6IG51bWJlcjsgYWNjZXNzb3JUeXBlOiBBY2Nlc3NvclR5cGU7IG1pbk1heD86IHsgbWluOiBWZWN0b3IzOyBtYXg6IFZlY3RvcjMgfSB9PiB7XHJcbiAgICAgICAgbGV0IHZlcnRleENvdW50OiBudW1iZXI7XHJcbiAgICAgICAgbGV0IG1pbk1heDogeyBtaW46IFZlY3RvcjM7IG1heDogVmVjdG9yMyB9IHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIGNvbnN0IG1vcnBoRGF0YTogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICBjb25zdCBkaWZmZXJlbmNlOiBWZWN0b3IzID0gVG1wVmVjdG9ycy5WZWN0b3IzWzBdO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHZlcnRleEJ1ZmZlcktpbmQpIHtcclxuICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kOiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb3JwaFBvc2l0aW9ucyA9IG1vcnBoVGFyZ2V0LmdldFBvc2l0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtb3JwaFBvc2l0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsUG9zaXRpb25zID0gbWVzaC5nZXRWZXJ0aWNlc0RhdGEoVmVydGV4QnVmZmVyLlBvc2l0aW9uS2luZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpITtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZlcnRleFN0YXJ0ID0gMDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbiA9IG5ldyBWZWN0b3IzKEluZmluaXR5LCBJbmZpbml0eSwgSW5maW5pdHkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF4ID0gbmV3IFZlY3RvcjMoLUluZmluaXR5LCAtSW5maW5pdHksIC1JbmZpbml0eSk7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhDb3VudCA9IG9yaWdpbmFsUG9zaXRpb25zLmxlbmd0aCAvIDM7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gdmVydGV4U3RhcnQ7IGkgPCB2ZXJ0ZXhDb3VudDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxQb3NpdGlvbiA9IFZlY3RvcjMuRnJvbUFycmF5KG9yaWdpbmFsUG9zaXRpb25zLCBpICogMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9ycGhQb3NpdGlvbiA9IFZlY3RvcjMuRnJvbUFycmF5KG1vcnBoUG9zaXRpb25zLCBpICogMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9ycGhQb3NpdGlvbi5zdWJ0cmFjdFRvUmVmKG9yaWdpbmFsUG9zaXRpb24sIGRpZmZlcmVuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbi5jb3B5RnJvbUZsb2F0cyhNYXRoLm1pbihkaWZmZXJlbmNlLngsIG1pbi54KSwgTWF0aC5taW4oZGlmZmVyZW5jZS55LCBtaW4ueSksIE1hdGgubWluKGRpZmZlcmVuY2UueiwgbWluLnopKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXguY29weUZyb21GbG9hdHMoTWF0aC5tYXgoZGlmZmVyZW5jZS54LCBtYXgueCksIE1hdGgubWF4KGRpZmZlcmVuY2UueSwgbWF4LnkpLCBNYXRoLm1heChkaWZmZXJlbmNlLnosIG1heC56KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9ycGhEYXRhLnB1c2goZGlmZmVyZW5jZS54LCBkaWZmZXJlbmNlLnksIGRpZmZlcmVuY2Uueik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbWluTWF4ID0geyBtaW4sIG1heCB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLk5vcm1hbEtpbmQ6IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1vcnBoTm9ybWFscyA9IG1vcnBoVGFyZ2V0LmdldE5vcm1hbHMoKTtcclxuICAgICAgICAgICAgICAgIGlmICghbW9ycGhOb3JtYWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxOb3JtYWxzID0gbWVzaC5nZXRWZXJ0aWNlc0RhdGEoVmVydGV4QnVmZmVyLk5vcm1hbEtpbmQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKSE7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2ZXJ0ZXhTdGFydCA9IDA7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhDb3VudCA9IG9yaWdpbmFsTm9ybWFscy5sZW5ndGggLyAzO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHZlcnRleFN0YXJ0OyBpIDwgdmVydGV4Q291bnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsTm9ybWFsID0gVmVjdG9yMy5Gcm9tQXJyYXkob3JpZ2luYWxOb3JtYWxzLCBpICogMykubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9ycGhOb3JtYWwgPSBWZWN0b3IzLkZyb21BcnJheShtb3JwaE5vcm1hbHMsIGkgKiAzKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICBtb3JwaE5vcm1hbC5zdWJ0cmFjdFRvUmVmKG9yaWdpbmFsTm9ybWFsLCBkaWZmZXJlbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBtb3JwaERhdGEucHVzaChkaWZmZXJlbmNlLngsIGRpZmZlcmVuY2UueSwgZGlmZmVyZW5jZS56KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5UYW5nZW50S2luZDoge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbW9ycGhUYW5nZW50cyA9IG1vcnBoVGFyZ2V0LmdldFRhbmdlbnRzKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1vcnBoVGFuZ2VudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBIYW5kZWRuZXNzIGNhbm5vdCBiZSBkaXNwbGFjZWQsIHNvIG1vcnBoIHRhcmdldCB0YW5nZW50cyBvbWl0IHRoZSB3IGNvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgYWNjZXNzb3JUeXBlID0gQWNjZXNzb3JUeXBlLlZFQzM7XHJcbiAgICAgICAgICAgICAgICBieXRlU3RyaWRlID0gMTI7IC8vIDMgY29tcG9uZW50cyAoeC95L3opICogNCBieXRlcyAoZmxvYXQzMilcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbFRhbmdlbnRzID0gbWVzaC5nZXRWZXJ0aWNlc0RhdGEoVmVydGV4QnVmZmVyLlRhbmdlbnRLaW5kLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSkhO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmVydGV4U3RhcnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgdmVydGV4Q291bnQgPSBvcmlnaW5hbFRhbmdlbnRzLmxlbmd0aCAvIDQ7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gdmVydGV4U3RhcnQ7IGkgPCB2ZXJ0ZXhDb3VudDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSByZWFkIHRoZSB4LCB5LCB6IGNvbXBvbmVudHMgYW5kIGlnbm9yZSB3XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxUYW5nZW50ID0gVmVjdG9yMy5Gcm9tQXJyYXkob3JpZ2luYWxUYW5nZW50cywgaSAqIDQpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9HTFRGVXRpbGl0aWVzLl9Ob3JtYWxpemVUYW5nZW50RnJvbVJlZihvcmlnaW5hbFRhbmdlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBNb3JwaCB0YXJnZXQgdGFuZ2VudHMgb21pdCB0aGUgdyBjb21wb25lbnQgc28gaXQgd29uJ3QgYmUgcHJlc2VudCBpbiB0aGUgZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vcnBoVGFuZ2VudCA9IFZlY3RvcjMuRnJvbUFycmF5KG1vcnBoVGFuZ2VudHMsIGkgKiAzKTtcclxuICAgICAgICAgICAgICAgICAgICBfR0xURlV0aWxpdGllcy5fTm9ybWFsaXplVGFuZ2VudEZyb21SZWYobW9ycGhUYW5nZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbW9ycGhUYW5nZW50LnN1YnRyYWN0VG9SZWYob3JpZ2luYWxUYW5nZW50LCBkaWZmZXJlbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBtb3JwaERhdGEucHVzaChkaWZmZXJlbmNlLngsIGRpZmZlcmVuY2UueSwgZGlmZmVyZW5jZS56KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYmluYXJ5V3JpdGVyRnVuYyA9IGdldEJpbmFyeVdyaXRlckZ1bmMoYmluYXJ5V3JpdGVyLCBhdHRyaWJ1dGVDb21wb25lbnRLaW5kKTtcclxuICAgICAgICBpZiAoIWJpbmFyeVdyaXRlckZ1bmMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0eXBlQnl0ZUxlbmd0aCA9IFZlcnRleEJ1ZmZlci5HZXRUeXBlQnl0ZUxlbmd0aChhdHRyaWJ1dGVDb21wb25lbnRLaW5kKTtcclxuICAgICAgICBjb25zdCBieXRlTGVuZ3RoID0gbW9ycGhEYXRhLmxlbmd0aCAqIHR5cGVCeXRlTGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlclZpZXcgPSBfR0xURlV0aWxpdGllcy5fQ3JlYXRlQnVmZmVyVmlldygwLCBiaW5hcnlXcml0ZXIuZ2V0Qnl0ZU9mZnNldCgpLCBieXRlTGVuZ3RoLCBieXRlU3RyaWRlLCBgJHt2ZXJ0ZXhCdWZmZXJLaW5kfSAtICR7bW9ycGhUYXJnZXQubmFtZX0gKE1vcnBoIFRhcmdldClgKTtcclxuICAgICAgICB0aGlzLl9idWZmZXJWaWV3cy5wdXNoKGJ1ZmZlclZpZXcpO1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlclZpZXdJbmRleCA9IHRoaXMuX2J1ZmZlclZpZXdzLmxlbmd0aCAtIDE7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgbW9ycGhEYXRhKSB7XHJcbiAgICAgICAgICAgIGJpbmFyeVdyaXRlckZ1bmModmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHsgYnVmZmVyVmlld0luZGV4LCB2ZXJ0ZXhDb3VudCwgYWNjZXNzb3JUeXBlLCBtaW5NYXggfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlcyBnbFRGIGpzb24gZGF0YVxyXG4gICAgICogQHBhcmFtIHNob3VsZFVzZUdsYiBJbmRpY2F0ZXMgd2hldGhlciB0aGUganNvbiBzaG91bGQgYmUgd3JpdHRlbiBmb3IgYSBnbGIgZmlsZVxyXG4gICAgICogQHBhcmFtIGdsVEZQcmVmaXggVGV4dCB0byB1c2Ugd2hlbiBwcmVmaXhpbmcgYSBnbFRGIGZpbGVcclxuICAgICAqIEBwYXJhbSBwcmV0dHlQcmludCBJbmRpY2F0ZXMgd2hldGhlciB0aGUganNvbiBmaWxlIHNob3VsZCBiZSBwcmV0dHkgcHJpbnRlZCAodHJ1ZSkgb3Igbm90IChmYWxzZSlcclxuICAgICAqIEByZXR1cm5zIGpzb24gZGF0YSBhcyBzdHJpbmdcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZ2VuZXJhdGVKU09OKHNob3VsZFVzZUdsYjogYm9vbGVhbiwgZ2xURlByZWZpeD86IHN0cmluZywgcHJldHR5UHJpbnQ/OiBib29sZWFuKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBidWZmZXI6IElCdWZmZXIgPSB7IGJ5dGVMZW5ndGg6IHRoaXMuX3RvdGFsQnl0ZUxlbmd0aCB9O1xyXG4gICAgICAgIGxldCBpbWFnZU5hbWU6IHN0cmluZztcclxuICAgICAgICBsZXQgaW1hZ2VEYXRhOiB7IGRhdGE6IEFycmF5QnVmZmVyOyBtaW1lVHlwZTogSW1hZ2VNaW1lVHlwZSB9O1xyXG4gICAgICAgIGxldCBidWZmZXJWaWV3OiBJQnVmZmVyVmlldztcclxuICAgICAgICBsZXQgYnl0ZU9mZnNldDogbnVtYmVyID0gdGhpcy5fdG90YWxCeXRlTGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAoYnVmZmVyLmJ5dGVMZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2xURi5idWZmZXJzID0gW2J1ZmZlcl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9ub2RlcyAmJiB0aGlzLl9ub2Rlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2xURi5ub2RlcyA9IHRoaXMuX25vZGVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbWVzaGVzICYmIHRoaXMuX21lc2hlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2xURi5tZXNoZXMgPSB0aGlzLl9tZXNoZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9zY2VuZXMgJiYgdGhpcy5fc2NlbmVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9nbFRGLnNjZW5lcyA9IHRoaXMuX3NjZW5lcztcclxuICAgICAgICAgICAgdGhpcy5fZ2xURi5zY2VuZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9jYW1lcmFzICYmIHRoaXMuX2NhbWVyYXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dsVEYuY2FtZXJhcyA9IHRoaXMuX2NhbWVyYXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9idWZmZXJWaWV3cyAmJiB0aGlzLl9idWZmZXJWaWV3cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2xURi5idWZmZXJWaWV3cyA9IHRoaXMuX2J1ZmZlclZpZXdzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fYWNjZXNzb3JzICYmIHRoaXMuX2FjY2Vzc29ycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2xURi5hY2Nlc3NvcnMgPSB0aGlzLl9hY2Nlc3NvcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9hbmltYXRpb25zICYmIHRoaXMuX2FuaW1hdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dsVEYuYW5pbWF0aW9ucyA9IHRoaXMuX2FuaW1hdGlvbnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tYXRlcmlhbHMgJiYgdGhpcy5fbWF0ZXJpYWxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9nbFRGLm1hdGVyaWFscyA9IHRoaXMuX21hdGVyaWFscztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3RleHR1cmVzICYmIHRoaXMuX3RleHR1cmVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9nbFRGLnRleHR1cmVzID0gdGhpcy5fdGV4dHVyZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9zYW1wbGVycyAmJiB0aGlzLl9zYW1wbGVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2xURi5zYW1wbGVycyA9IHRoaXMuX3NhbXBsZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fc2tpbnMgJiYgdGhpcy5fc2tpbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dsVEYuc2tpbnMgPSB0aGlzLl9za2lucztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2ltYWdlcyAmJiB0aGlzLl9pbWFnZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICghc2hvdWxkVXNlR2xiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nbFRGLmltYWdlcyA9IHRoaXMuX2ltYWdlcztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dsVEYuaW1hZ2VzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5faW1hZ2VzLmZvckVhY2goKGltYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlLnVyaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZURhdGEgPSB0aGlzLl9pbWFnZURhdGFbaW1hZ2UudXJpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3JkZXJlZEltYWdlRGF0YS5wdXNoKGltYWdlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlTmFtZSA9IGltYWdlLnVyaS5zcGxpdChcIi5cIilbMF0gKyBcIiBpbWFnZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmZXJWaWV3ID0gX0dMVEZVdGlsaXRpZXMuX0NyZWF0ZUJ1ZmZlclZpZXcoMCwgYnl0ZU9mZnNldCwgaW1hZ2VEYXRhLmRhdGEuYnl0ZUxlbmd0aCwgdW5kZWZpbmVkLCBpbWFnZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBieXRlT2Zmc2V0ICs9IGltYWdlRGF0YS5kYXRhLmJ5dGVMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlclZpZXdzLnB1c2goYnVmZmVyVmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlLmJ1ZmZlclZpZXcgPSB0aGlzLl9idWZmZXJWaWV3cy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZS5uYW1lID0gaW1hZ2VOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZS5taW1lVHlwZSA9IGltYWdlRGF0YS5taW1lVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2UudXJpID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2dsVEYuaW1hZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9nbFRGLmltYWdlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2dsVEYuaW1hZ2VzLnB1c2goaW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gUmVwbGFjZSB1cmkgd2l0aCBidWZmZXJ2aWV3IGFuZCBtaW1lIHR5cGUgZm9yIGdsYlxyXG4gICAgICAgICAgICAgICAgYnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlT2Zmc2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXNob3VsZFVzZUdsYikge1xyXG4gICAgICAgICAgICBidWZmZXIudXJpID0gZ2xURlByZWZpeCArIFwiLmJpblwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QganNvblRleHQgPSBwcmV0dHlQcmludCA/IEpTT04uc3RyaW5naWZ5KHRoaXMuX2dsVEYsIG51bGwsIDIpIDogSlNPTi5zdHJpbmdpZnkodGhpcy5fZ2xURik7XHJcblxyXG4gICAgICAgIHJldHVybiBqc29uVGV4dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlcyBkYXRhIGZvciAuZ2x0ZiBhbmQgLmJpbiBmaWxlcyBiYXNlZCBvbiB0aGUgZ2xURiBwcmVmaXggc3RyaW5nXHJcbiAgICAgKiBAcGFyYW0gZ2xURlByZWZpeCBUZXh0IHRvIHVzZSB3aGVuIHByZWZpeGluZyBhIGdsVEYgZmlsZVxyXG4gICAgICogQHBhcmFtIGRpc3Bvc2UgRGlzcG9zZSB0aGUgZXhwb3J0ZXJcclxuICAgICAqIEByZXR1cm5zIEdMVEZEYXRhIHdpdGggZ2xURiBmaWxlIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9nZW5lcmF0ZUdMVEZBc3luYyhnbFRGUHJlZml4OiBzdHJpbmcsIGRpc3Bvc2UgPSB0cnVlKTogUHJvbWlzZTxHTFRGRGF0YT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nZW5lcmF0ZUJpbmFyeUFzeW5jKCkudGhlbigoYmluYXJ5QnVmZmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2V4dGVuc2lvbnNPbkV4cG9ydGluZygpO1xyXG4gICAgICAgICAgICBjb25zdCBqc29uVGV4dCA9IHRoaXMuX2dlbmVyYXRlSlNPTihmYWxzZSwgZ2xURlByZWZpeCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJpbiA9IG5ldyBCbG9iKFtiaW5hcnlCdWZmZXJdLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBnbFRGRmlsZU5hbWUgPSBnbFRGUHJlZml4ICsgXCIuZ2x0ZlwiO1xyXG4gICAgICAgICAgICBjb25zdCBnbFRGQmluRmlsZSA9IGdsVEZQcmVmaXggKyBcIi5iaW5cIjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IG5ldyBHTFRGRGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmdsVEZGaWxlc1tnbFRGRmlsZU5hbWVdID0ganNvblRleHQ7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5nbFRGRmlsZXNbZ2xURkJpbkZpbGVdID0gYmluO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ltYWdlRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpbWFnZSBpbiB0aGlzLl9pbWFnZURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuZ2xURkZpbGVzW2ltYWdlXSA9IG5ldyBCbG9iKFt0aGlzLl9pbWFnZURhdGFbaW1hZ2VdLmRhdGFdLCB7IHR5cGU6IHRoaXMuX2ltYWdlRGF0YVtpbWFnZV0ubWltZVR5cGUgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkaXNwb3NlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBiaW5hcnkgYnVmZmVyIGZvciBnbFRGXHJcbiAgICAgKiBAcmV0dXJucyBhcnJheSBidWZmZXIgZm9yIGJpbmFyeSBkYXRhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2dlbmVyYXRlQmluYXJ5QXN5bmMoKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xyXG4gICAgICAgIGNvbnN0IGJpbmFyeVdyaXRlciA9IG5ldyBfQmluYXJ5V3JpdGVyKDQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVTY2VuZUFzeW5jKGJpbmFyeVdyaXRlcikudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2NhbEVuZ2luZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9jYWxFbmdpbmUuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBiaW5hcnlXcml0ZXIuZ2V0QXJyYXlCdWZmZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhZHMgdGhlIG51bWJlciB0byBhIG11bHRpcGxlIG9mIDRcclxuICAgICAqIEBwYXJhbSBudW0gbnVtYmVyIHRvIHBhZFxyXG4gICAgICogQHJldHVybnMgcGFkZGVkIG51bWJlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9nZXRQYWRkaW5nKG51bTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCByZW1haW5kZXIgPSBudW0gJSA0O1xyXG4gICAgICAgIGNvbnN0IHBhZGRpbmcgPSByZW1haW5kZXIgPT09IDAgPyByZW1haW5kZXIgOiA0IC0gcmVtYWluZGVyO1xyXG5cclxuICAgICAgICByZXR1cm4gcGFkZGluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2dlbmVyYXRlR0xCQXN5bmMoZ2xURlByZWZpeDogc3RyaW5nLCBkaXNwb3NlID0gdHJ1ZSk6IFByb21pc2U8R0xURkRhdGE+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2VuZXJhdGVCaW5hcnlBc3luYygpLnRoZW4oKGJpbmFyeUJ1ZmZlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9leHRlbnNpb25zT25FeHBvcnRpbmcoKTtcclxuICAgICAgICAgICAgY29uc3QganNvblRleHQgPSB0aGlzLl9nZW5lcmF0ZUpTT04odHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGdsYkZpbGVOYW1lID0gZ2xURlByZWZpeCArIFwiLmdsYlwiO1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJMZW5ndGggPSAxMjtcclxuICAgICAgICAgICAgY29uc3QgY2h1bmtMZW5ndGhQcmVmaXggPSA4O1xyXG4gICAgICAgICAgICBsZXQganNvbkxlbmd0aCA9IGpzb25UZXh0Lmxlbmd0aDtcclxuICAgICAgICAgICAgbGV0IGVuY29kZWRKc29uVGV4dDtcclxuICAgICAgICAgICAgbGV0IGltYWdlQnl0ZUxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIC8vIG1ha2UgdXNlIG9mIFRleHRFbmNvZGVyIHdoZW4gYXZhaWxhYmxlXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgVGV4dEVuY29kZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcclxuICAgICAgICAgICAgICAgIGVuY29kZWRKc29uVGV4dCA9IGVuY29kZXIuZW5jb2RlKGpzb25UZXh0KTtcclxuICAgICAgICAgICAgICAgIGpzb25MZW5ndGggPSBlbmNvZGVkSnNvblRleHQubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fb3JkZXJlZEltYWdlRGF0YS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VCeXRlTGVuZ3RoICs9IHRoaXMuX29yZGVyZWRJbWFnZURhdGFbaV0uZGF0YS5ieXRlTGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGpzb25QYWRkaW5nID0gdGhpcy5fZ2V0UGFkZGluZyhqc29uTGVuZ3RoKTtcclxuICAgICAgICAgICAgY29uc3QgYmluUGFkZGluZyA9IHRoaXMuX2dldFBhZGRpbmcoYmluYXJ5QnVmZmVyLmJ5dGVMZW5ndGgpO1xyXG4gICAgICAgICAgICBjb25zdCBpbWFnZVBhZGRpbmcgPSB0aGlzLl9nZXRQYWRkaW5nKGltYWdlQnl0ZUxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBieXRlTGVuZ3RoID0gaGVhZGVyTGVuZ3RoICsgMiAqIGNodW5rTGVuZ3RoUHJlZml4ICsganNvbkxlbmd0aCArIGpzb25QYWRkaW5nICsgYmluYXJ5QnVmZmVyLmJ5dGVMZW5ndGggKyBiaW5QYWRkaW5nICsgaW1hZ2VCeXRlTGVuZ3RoICsgaW1hZ2VQYWRkaW5nO1xyXG5cclxuICAgICAgICAgICAgLy9oZWFkZXJcclxuICAgICAgICAgICAgY29uc3QgaGVhZGVyQnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGhlYWRlckxlbmd0aCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlckJ1ZmZlclZpZXcgPSBuZXcgRGF0YVZpZXcoaGVhZGVyQnVmZmVyKTtcclxuICAgICAgICAgICAgaGVhZGVyQnVmZmVyVmlldy5zZXRVaW50MzIoMCwgMHg0NjU0NmM2NywgdHJ1ZSk7IC8vZ2xURlxyXG4gICAgICAgICAgICBoZWFkZXJCdWZmZXJWaWV3LnNldFVpbnQzMig0LCAyLCB0cnVlKTsgLy8gdmVyc2lvblxyXG4gICAgICAgICAgICBoZWFkZXJCdWZmZXJWaWV3LnNldFVpbnQzMig4LCBieXRlTGVuZ3RoLCB0cnVlKTsgLy8gdG90YWwgYnl0ZXMgaW4gZmlsZVxyXG5cclxuICAgICAgICAgICAgLy9qc29uIGNodW5rXHJcbiAgICAgICAgICAgIGNvbnN0IGpzb25DaHVua0J1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihjaHVua0xlbmd0aFByZWZpeCArIGpzb25MZW5ndGggKyBqc29uUGFkZGluZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGpzb25DaHVua0J1ZmZlclZpZXcgPSBuZXcgRGF0YVZpZXcoanNvbkNodW5rQnVmZmVyKTtcclxuICAgICAgICAgICAganNvbkNodW5rQnVmZmVyVmlldy5zZXRVaW50MzIoMCwganNvbkxlbmd0aCArIGpzb25QYWRkaW5nLCB0cnVlKTtcclxuICAgICAgICAgICAganNvbkNodW5rQnVmZmVyVmlldy5zZXRVaW50MzIoNCwgMHg0ZTRmNTM0YSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvL2pzb24gY2h1bmsgYnl0ZXNcclxuICAgICAgICAgICAgY29uc3QganNvbkRhdGEgPSBuZXcgVWludDhBcnJheShqc29uQ2h1bmtCdWZmZXIsIGNodW5rTGVuZ3RoUHJlZml4KTtcclxuICAgICAgICAgICAgLy8gaWYgVGV4dEVuY29kZXIgd2FzIGF2YWlsYWJsZSwgd2UgY2FuIHNpbXBseSBjb3B5IHRoZSBlbmNvZGVkIGFycmF5XHJcbiAgICAgICAgICAgIGlmIChlbmNvZGVkSnNvblRleHQpIHtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhLnNldChlbmNvZGVkSnNvblRleHQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmxhbmtDaGFyQ29kZSA9IFwiX1wiLmNoYXJDb2RlQXQoMCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGpzb25MZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYXJDb2RlID0ganNvblRleHQuY2hhckNvZGVBdChpKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgY2hhcmFjdGVyIGRvZXNuJ3QgZml0IGludG8gYSBzaW5nbGUgVVRGLTE2IGNvZGUgdW5pdCwganVzdCBwdXQgYSBibGFuayBjaGFyYWN0ZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgIT0ganNvblRleHQuY29kZVBvaW50QXQoaSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAganNvbkRhdGFbaV0gPSBibGFua0NoYXJDb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzb25EYXRhW2ldID0gY2hhckNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2pzb24gcGFkZGluZ1xyXG4gICAgICAgICAgICBjb25zdCBqc29uUGFkZGluZ1ZpZXcgPSBuZXcgVWludDhBcnJheShqc29uQ2h1bmtCdWZmZXIsIGNodW5rTGVuZ3RoUHJlZml4ICsganNvbkxlbmd0aCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwganNvblBhZGRpbmc7ICsraSkge1xyXG4gICAgICAgICAgICAgICAganNvblBhZGRpbmdWaWV3W2ldID0gMHgyMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9iaW5hcnkgY2h1bmtcclxuICAgICAgICAgICAgY29uc3QgYmluYXJ5Q2h1bmtCdWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoY2h1bmtMZW5ndGhQcmVmaXgpO1xyXG4gICAgICAgICAgICBjb25zdCBiaW5hcnlDaHVua0J1ZmZlclZpZXcgPSBuZXcgRGF0YVZpZXcoYmluYXJ5Q2h1bmtCdWZmZXIpO1xyXG4gICAgICAgICAgICBiaW5hcnlDaHVua0J1ZmZlclZpZXcuc2V0VWludDMyKDAsIGJpbmFyeUJ1ZmZlci5ieXRlTGVuZ3RoICsgaW1hZ2VCeXRlTGVuZ3RoICsgaW1hZ2VQYWRkaW5nLCB0cnVlKTtcclxuICAgICAgICAgICAgYmluYXJ5Q2h1bmtCdWZmZXJWaWV3LnNldFVpbnQzMig0LCAweDAwNGU0OTQyLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGJpbmFyeSBwYWRkaW5nXHJcbiAgICAgICAgICAgIGNvbnN0IGJpblBhZGRpbmdCdWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoYmluUGFkZGluZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJpblBhZGRpbmdWaWV3ID0gbmV3IFVpbnQ4QXJyYXkoYmluUGFkZGluZ0J1ZmZlcik7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluUGFkZGluZzsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBiaW5QYWRkaW5nVmlld1tpXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGltYWdlUGFkZGluZ0J1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihpbWFnZVBhZGRpbmcpO1xyXG4gICAgICAgICAgICBjb25zdCBpbWFnZVBhZGRpbmdWaWV3ID0gbmV3IFVpbnQ4QXJyYXkoaW1hZ2VQYWRkaW5nQnVmZmVyKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZVBhZGRpbmc7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VQYWRkaW5nVmlld1tpXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdsYkRhdGEgPSBbaGVhZGVyQnVmZmVyLCBqc29uQ2h1bmtCdWZmZXIsIGJpbmFyeUNodW5rQnVmZmVyLCBiaW5hcnlCdWZmZXJdO1xyXG5cclxuICAgICAgICAgICAgLy8gYmluYXJ5IGRhdGFcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9vcmRlcmVkSW1hZ2VEYXRhLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBnbGJEYXRhLnB1c2godGhpcy5fb3JkZXJlZEltYWdlRGF0YVtpXS5kYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2xiRGF0YS5wdXNoKGJpblBhZGRpbmdCdWZmZXIpO1xyXG5cclxuICAgICAgICAgICAgZ2xiRGF0YS5wdXNoKGltYWdlUGFkZGluZ0J1ZmZlcik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBnbGJGaWxlID0gbmV3IEJsb2IoZ2xiRGF0YSwgeyB0eXBlOiBcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gbmV3IEdMVEZEYXRhKCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5nbFRGRmlsZXNbZ2xiRmlsZU5hbWVdID0gZ2xiRmlsZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2NhbEVuZ2luZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbEVuZ2luZS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkaXNwb3NlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIFRSUyBmb3IgZWFjaCBub2RlXHJcbiAgICAgKiBAcGFyYW0gbm9kZSBnbFRGIE5vZGUgZm9yIHN0b3JpbmcgdGhlIHRyYW5zZm9ybWF0aW9uIGRhdGFcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uVHJhbnNmb3JtTm9kZSBCYWJ5bG9uIG1lc2ggdXNlZCBhcyB0aGUgc291cmNlIGZvciB0aGUgdHJhbnNmb3JtYXRpb24gZGF0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZXROb2RlVHJhbnNmb3JtYXRpb24obm9kZTogSU5vZGUsIGJhYnlsb25UcmFuc2Zvcm1Ob2RlOiBUcmFuc2Zvcm1Ob2RlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFiYWJ5bG9uVHJhbnNmb3JtTm9kZS5nZXRQaXZvdFBvaW50KCkuZXF1YWxzVG9GbG9hdHMoMCwgMCwgMCkpIHtcclxuICAgICAgICAgICAgVG9vbHMuV2FybihcIlBpdm90IHBvaW50cyBhcmUgbm90IHN1cHBvcnRlZCBpbiB0aGUgZ2xURiBzZXJpYWxpemVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWJhYnlsb25UcmFuc2Zvcm1Ob2RlLnBvc2l0aW9uLmVxdWFsc1RvRmxvYXRzKDAsIDAsIDApKSB7XHJcbiAgICAgICAgICAgIG5vZGUudHJhbnNsYXRpb24gPSBiYWJ5bG9uVHJhbnNmb3JtTm9kZS5wb3NpdGlvbi5hc0FycmF5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWJhYnlsb25UcmFuc2Zvcm1Ob2RlLnNjYWxpbmcuZXF1YWxzVG9GbG9hdHMoMSwgMSwgMSkpIHtcclxuICAgICAgICAgICAgbm9kZS5zY2FsZSA9IGJhYnlsb25UcmFuc2Zvcm1Ob2RlLnNjYWxpbmcuYXNBcnJheSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgcm90YXRpb25RdWF0ZXJuaW9uID0gUXVhdGVybmlvbi5Gcm9tRXVsZXJBbmdsZXMoYmFieWxvblRyYW5zZm9ybU5vZGUucm90YXRpb24ueCwgYmFieWxvblRyYW5zZm9ybU5vZGUucm90YXRpb24ueSwgYmFieWxvblRyYW5zZm9ybU5vZGUucm90YXRpb24ueik7XHJcbiAgICAgICAgaWYgKGJhYnlsb25UcmFuc2Zvcm1Ob2RlLnJvdGF0aW9uUXVhdGVybmlvbikge1xyXG4gICAgICAgICAgICByb3RhdGlvblF1YXRlcm5pb24ubXVsdGlwbHlJblBsYWNlKGJhYnlsb25UcmFuc2Zvcm1Ob2RlLnJvdGF0aW9uUXVhdGVybmlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghUXVhdGVybmlvbi5Jc0lkZW50aXR5KHJvdGF0aW9uUXVhdGVybmlvbikpIHtcclxuICAgICAgICAgICAgbm9kZS5yb3RhdGlvbiA9IHJvdGF0aW9uUXVhdGVybmlvbi5ub3JtYWxpemUoKS5hc0FycmF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3NldENhbWVyYVRyYW5zZm9ybWF0aW9uKG5vZGU6IElOb2RlLCBiYWJ5bG9uQ2FtZXJhOiBDYW1lcmEpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbiA9IFRtcFZlY3RvcnMuVmVjdG9yM1swXTtcclxuICAgICAgICBjb25zdCByb3RhdGlvbiA9IFRtcFZlY3RvcnMuUXVhdGVybmlvblswXTtcclxuICAgICAgICBiYWJ5bG9uQ2FtZXJhLmdldFdvcmxkTWF0cml4KCkuZGVjb21wb3NlKHVuZGVmaW5lZCwgcm90YXRpb24sIHRyYW5zbGF0aW9uKTtcclxuXHJcbiAgICAgICAgaWYgKCF0cmFuc2xhdGlvbi5lcXVhbHNUb0Zsb2F0cygwLCAwLCAwKSkge1xyXG4gICAgICAgICAgICBub2RlLnRyYW5zbGF0aW9uID0gdHJhbnNsYXRpb24uYXNBcnJheSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gLy8gUm90YXRpb24gYnkgMTgwIGFzIGdsVEYgaGFzIGEgZGlmZmVyZW50IGNvbnZlbnRpb24gdGhhbiBCYWJ5bG9uLlxyXG4gICAgICAgIHJvdGF0aW9uLm11bHRpcGx5SW5QbGFjZShyb3RhdGlvbjE4MFkpO1xyXG5cclxuICAgICAgICBpZiAoIVF1YXRlcm5pb24uSXNJZGVudGl0eShyb3RhdGlvbikpIHtcclxuICAgICAgICAgICAgbm9kZS5yb3RhdGlvbiA9IHJvdGF0aW9uLmFzQXJyYXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0VmVydGV4QnVmZmVyRnJvbU1lc2goYXR0cmlidXRlS2luZDogc3RyaW5nLCBidWZmZXJNZXNoOiBNZXNoKTogTnVsbGFibGU8VmVydGV4QnVmZmVyPiB7XHJcbiAgICAgICAgaWYgKGJ1ZmZlck1lc2guaXNWZXJ0aWNlc0RhdGFQcmVzZW50KGF0dHJpYnV0ZUtpbmQsIHRydWUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZlcnRleEJ1ZmZlciA9IGJ1ZmZlck1lc2guZ2V0VmVydGV4QnVmZmVyKGF0dHJpYnV0ZUtpbmQsIHRydWUpO1xyXG4gICAgICAgICAgICBpZiAodmVydGV4QnVmZmVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmVydGV4QnVmZmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGJ1ZmZlcnZpZXcgYmFzZWQgb24gdGhlIHZlcnRpY2VzIHR5cGUgZm9yIHRoZSBCYWJ5bG9uIG1lc2hcclxuICAgICAqIEBwYXJhbSBraW5kIEluZGljYXRlcyB0aGUgdHlwZSBvZiB2ZXJ0aWNlcyBkYXRhXHJcbiAgICAgKiBAcGFyYW0gYXR0cmlidXRlQ29tcG9uZW50S2luZCBJbmRpY2F0ZXMgdGhlIG51bWVyaWNhbCB0eXBlIHVzZWQgdG8gc3RvcmUgdGhlIGRhdGFcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uVHJhbnNmb3JtTm9kZSBUaGUgQmFieWxvbiBtZXNoIHRvIGdldCB0aGUgdmVydGljZXMgZGF0YSBmcm9tXHJcbiAgICAgKiBAcGFyYW0gYmluYXJ5V3JpdGVyIFRoZSBidWZmZXIgdG8gd3JpdGUgdGhlIGJ1ZmZlcnZpZXcgZGF0YSB0b1xyXG4gICAgICogQHBhcmFtIGJ5dGVTdHJpZGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfY3JlYXRlQnVmZmVyVmlld0tpbmQoXHJcbiAgICAgICAga2luZDogc3RyaW5nLFxyXG4gICAgICAgIGF0dHJpYnV0ZUNvbXBvbmVudEtpbmQ6IEFjY2Vzc29yQ29tcG9uZW50VHlwZSxcclxuICAgICAgICBiYWJ5bG9uVHJhbnNmb3JtTm9kZTogVHJhbnNmb3JtTm9kZSxcclxuICAgICAgICBiaW5hcnlXcml0ZXI6IF9CaW5hcnlXcml0ZXIsXHJcbiAgICAgICAgYnl0ZVN0cmlkZTogbnVtYmVyXHJcbiAgICApIHtcclxuICAgICAgICBjb25zdCBidWZmZXJNZXNoID1cclxuICAgICAgICAgICAgYmFieWxvblRyYW5zZm9ybU5vZGUgaW5zdGFuY2VvZiBNZXNoXHJcbiAgICAgICAgICAgICAgICA/IChiYWJ5bG9uVHJhbnNmb3JtTm9kZSBhcyBNZXNoKVxyXG4gICAgICAgICAgICAgICAgOiBiYWJ5bG9uVHJhbnNmb3JtTm9kZSBpbnN0YW5jZW9mIEluc3RhbmNlZE1lc2hcclxuICAgICAgICAgICAgICAgICAgPyAoYmFieWxvblRyYW5zZm9ybU5vZGUgYXMgSW5zdGFuY2VkTWVzaCkuc291cmNlTWVzaFxyXG4gICAgICAgICAgICAgICAgICA6IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChidWZmZXJNZXNoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZlcnRleEJ1ZmZlciA9IGJ1ZmZlck1lc2guZ2V0VmVydGV4QnVmZmVyKGtpbmQsIHRydWUpO1xyXG4gICAgICAgICAgICBjb25zdCB2ZXJ0ZXhEYXRhID0gYnVmZmVyTWVzaC5nZXRWZXJ0aWNlc0RhdGEoa2luZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZlcnRleEJ1ZmZlciAmJiB2ZXJ0ZXhEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlQnl0ZUxlbmd0aCA9IFZlcnRleEJ1ZmZlci5HZXRUeXBlQnl0ZUxlbmd0aChhdHRyaWJ1dGVDb21wb25lbnRLaW5kKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ5dGVMZW5ndGggPSB2ZXJ0ZXhEYXRhLmxlbmd0aCAqIHR5cGVCeXRlTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnVmZmVyVmlldyA9IF9HTFRGVXRpbGl0aWVzLl9DcmVhdGVCdWZmZXJWaWV3KDAsIGJpbmFyeVdyaXRlci5nZXRCeXRlT2Zmc2V0KCksIGJ5dGVMZW5ndGgsIGJ5dGVTdHJpZGUsIGtpbmQgKyBcIiAtIFwiICsgYnVmZmVyTWVzaC5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlclZpZXdzLnB1c2goYnVmZmVyVmlldyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fd3JpdGVBdHRyaWJ1dGVEYXRhKGtpbmQsIGF0dHJpYnV0ZUNvbXBvbmVudEtpbmQsIHZlcnRleERhdGEsIGJ5dGVTdHJpZGUgLyB0eXBlQnl0ZUxlbmd0aCwgYmluYXJ5V3JpdGVyLCBiYWJ5bG9uVHJhbnNmb3JtTm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcHJpbWl0aXZlIG1vZGUgb2YgdGhlIEJhYnlsb24gbWVzaFxyXG4gICAgICogQHBhcmFtIGJhYnlsb25NZXNoIFRoZSBCYWJ5bG9uSlMgbWVzaFxyXG4gICAgICogQHJldHVybnMgVW5zaWduZWQgaW50ZWdlciBvZiB0aGUgcHJpbWl0aXZlIG1vZGUgb3IgbnVsbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9nZXRNZXNoUHJpbWl0aXZlTW9kZShiYWJ5bG9uTWVzaDogQWJzdHJhY3RNZXNoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoYmFieWxvbk1lc2ggaW5zdGFuY2VvZiBMaW5lc01lc2gpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGVyaWFsLkxpbmVMaXN0RHJhd01vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiYWJ5bG9uTWVzaCBpbnN0YW5jZW9mIEluc3RhbmNlZE1lc2ggfHwgYmFieWxvbk1lc2ggaW5zdGFuY2VvZiBNZXNoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhc2VNZXNoID0gYmFieWxvbk1lc2ggaW5zdGFuY2VvZiBNZXNoID8gYmFieWxvbk1lc2ggOiBiYWJ5bG9uTWVzaC5zb3VyY2VNZXNoO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGJhc2VNZXNoLm92ZXJyaWRlUmVuZGVyaW5nRmlsbE1vZGUgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBiYXNlTWVzaC5vdmVycmlkZVJlbmRlcmluZ0ZpbGxNb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiYWJ5bG9uTWVzaC5tYXRlcmlhbCA/IGJhYnlsb25NZXNoLm1hdGVyaWFsLmZpbGxNb2RlIDogTWF0ZXJpYWwuVHJpYW5nbGVGaWxsTW9kZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHByaW1pdGl2ZSBtb2RlIG9mIHRoZSBnbFRGIG1lc2ggcHJpbWl0aXZlXHJcbiAgICAgKiBAcGFyYW0gbWVzaFByaW1pdGl2ZSBnbFRGIG1lc2ggcHJpbWl0aXZlXHJcbiAgICAgKiBAcGFyYW0gcHJpbWl0aXZlTW9kZSBUaGUgcHJpbWl0aXZlIG1vZGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc2V0UHJpbWl0aXZlTW9kZShtZXNoUHJpbWl0aXZlOiBJTWVzaFByaW1pdGl2ZSwgcHJpbWl0aXZlTW9kZTogbnVtYmVyKSB7XHJcbiAgICAgICAgc3dpdGNoIChwcmltaXRpdmVNb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTWF0ZXJpYWwuVHJpYW5nbGVGaWxsTW9kZToge1xyXG4gICAgICAgICAgICAgICAgLy8gZ2xURiBkZWZhdWx0cyB0byB1c2luZyBUcmlhbmdsZSBNb2RlXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIE1hdGVyaWFsLlRyaWFuZ2xlU3RyaXBEcmF3TW9kZToge1xyXG4gICAgICAgICAgICAgICAgbWVzaFByaW1pdGl2ZS5tb2RlID0gTWVzaFByaW1pdGl2ZU1vZGUuVFJJQU5HTEVfU1RSSVA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIE1hdGVyaWFsLlRyaWFuZ2xlRmFuRHJhd01vZGU6IHtcclxuICAgICAgICAgICAgICAgIG1lc2hQcmltaXRpdmUubW9kZSA9IE1lc2hQcmltaXRpdmVNb2RlLlRSSUFOR0xFX0ZBTjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgTWF0ZXJpYWwuUG9pbnRMaXN0RHJhd01vZGU6IHtcclxuICAgICAgICAgICAgICAgIG1lc2hQcmltaXRpdmUubW9kZSA9IE1lc2hQcmltaXRpdmVNb2RlLlBPSU5UUztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgTWF0ZXJpYWwuUG9pbnRGaWxsTW9kZToge1xyXG4gICAgICAgICAgICAgICAgbWVzaFByaW1pdGl2ZS5tb2RlID0gTWVzaFByaW1pdGl2ZU1vZGUuUE9JTlRTO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBNYXRlcmlhbC5MaW5lTG9vcERyYXdNb2RlOiB7XHJcbiAgICAgICAgICAgICAgICBtZXNoUHJpbWl0aXZlLm1vZGUgPSBNZXNoUHJpbWl0aXZlTW9kZS5MSU5FX0xPT1A7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIE1hdGVyaWFsLkxpbmVMaXN0RHJhd01vZGU6IHtcclxuICAgICAgICAgICAgICAgIG1lc2hQcmltaXRpdmUubW9kZSA9IE1lc2hQcmltaXRpdmVNb2RlLkxJTkVTO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBNYXRlcmlhbC5MaW5lU3RyaXBEcmF3TW9kZToge1xyXG4gICAgICAgICAgICAgICAgbWVzaFByaW1pdGl2ZS5tb2RlID0gTWVzaFByaW1pdGl2ZU1vZGUuTElORV9TVFJJUDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgdmVydGV4IGF0dHJpYnV0ZSBhY2Nlc3NvciBiYXNlZCBvZiB0aGUgZ2xURiBtZXNoIHByaW1pdGl2ZVxyXG4gICAgICogQHBhcmFtIG1lc2hQcmltaXRpdmUgZ2xURiBtZXNoIHByaW1pdGl2ZVxyXG4gICAgICogQHBhcmFtIGF0dHJpYnV0ZUtpbmQgdmVydGV4IGF0dHJpYnV0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZXRBdHRyaWJ1dGVLaW5kKGF0dHJpYnV0ZXM6IHsgW25hbWU6IHN0cmluZ106IG51bWJlciB9LCBhdHRyaWJ1dGVLaW5kOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBzd2l0Y2ggKGF0dHJpYnV0ZUtpbmQpIHtcclxuICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kOiB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLlBPU0lUSU9OID0gdGhpcy5fYWNjZXNzb3JzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5Ob3JtYWxLaW5kOiB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLk5PUk1BTCA9IHRoaXMuX2FjY2Vzc29ycy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuQ29sb3JLaW5kOiB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLkNPTE9SXzAgPSB0aGlzLl9hY2Nlc3NvcnMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLlRhbmdlbnRLaW5kOiB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLlRBTkdFTlQgPSB0aGlzLl9hY2Nlc3NvcnMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLlVWS2luZDoge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcy5URVhDT09SRF8wID0gdGhpcy5fYWNjZXNzb3JzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5VVjJLaW5kOiB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLlRFWENPT1JEXzEgPSB0aGlzLl9hY2Nlc3NvcnMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLk1hdHJpY2VzSW5kaWNlc0tpbmQ6IHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMuSk9JTlRTXzAgPSB0aGlzLl9hY2Nlc3NvcnMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLk1hdHJpY2VzSW5kaWNlc0V4dHJhS2luZDoge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcy5KT0lOVFNfMSA9IHRoaXMuX2FjY2Vzc29ycy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuTWF0cmljZXNXZWlnaHRzS2luZDoge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcy5XRUlHSFRTXzAgPSB0aGlzLl9hY2Nlc3NvcnMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLk1hdHJpY2VzV2VpZ2h0c0V4dHJhS2luZDoge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcy5XRUlHSFRTXzEgPSB0aGlzLl9hY2Nlc3NvcnMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLldhcm4oXCJVbnN1cHBvcnRlZCBWZXJ0ZXggQnVmZmVyIFR5cGU6IFwiICsgYXR0cmlidXRlS2luZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGRhdGEgZm9yIHRoZSBwcmltaXRpdmUgYXR0cmlidXRlcyBvZiBlYWNoIHN1Ym1lc2hcclxuICAgICAqIEBwYXJhbSBtZXNoIGdsVEYgTWVzaCBvYmplY3QgdG8gc3RvcmUgdGhlIHByaW1pdGl2ZSBhdHRyaWJ1dGUgaW5mb3JtYXRpb25cclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uVHJhbnNmb3JtTm9kZSBCYWJ5bG9uIG1lc2ggdG8gZ2V0IHRoZSBwcmltaXRpdmUgYXR0cmlidXRlIGRhdGEgZnJvbVxyXG4gICAgICogQHBhcmFtIGJpbmFyeVdyaXRlciBCdWZmZXIgdG8gd3JpdGUgdGhlIGF0dHJpYnV0ZSBkYXRhIHRvXHJcbiAgICAgKiBAcmV0dXJucyBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiBkb25lIHNldHRpbmcgdGhlIHByaW1pdGl2ZSBhdHRyaWJ1dGVzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3NldFByaW1pdGl2ZUF0dHJpYnV0ZXNBc3luYyhtZXNoOiBJTWVzaCwgYmFieWxvblRyYW5zZm9ybU5vZGU6IFRyYW5zZm9ybU5vZGUsIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2VzOiBQcm9taXNlPElNZXNoUHJpbWl0aXZlPltdID0gW107XHJcbiAgICAgICAgbGV0IGJ1ZmZlck1lc2g6IE51bGxhYmxlPE1lc2g+ID0gbnVsbDtcclxuICAgICAgICBsZXQgYnVmZmVyVmlldzogSUJ1ZmZlclZpZXc7XHJcbiAgICAgICAgbGV0IG1pbk1heDogeyBtaW46IE51bGxhYmxlPG51bWJlcltdPjsgbWF4OiBOdWxsYWJsZTxudW1iZXJbXT4gfTtcclxuXHJcbiAgICAgICAgaWYgKGJhYnlsb25UcmFuc2Zvcm1Ob2RlIGluc3RhbmNlb2YgTWVzaCkge1xyXG4gICAgICAgICAgICBidWZmZXJNZXNoID0gYmFieWxvblRyYW5zZm9ybU5vZGUgYXMgTWVzaDtcclxuICAgICAgICB9IGVsc2UgaWYgKGJhYnlsb25UcmFuc2Zvcm1Ob2RlIGluc3RhbmNlb2YgSW5zdGFuY2VkTWVzaCkge1xyXG4gICAgICAgICAgICBidWZmZXJNZXNoID0gKGJhYnlsb25UcmFuc2Zvcm1Ob2RlIGFzIEluc3RhbmNlZE1lc2gpLnNvdXJjZU1lc2g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURhdGE6IF9JVmVydGV4QXR0cmlidXRlRGF0YVtdID0gW1xyXG4gICAgICAgICAgICB7IGtpbmQ6IFZlcnRleEJ1ZmZlci5Qb3NpdGlvbktpbmQsIGFjY2Vzc29yVHlwZTogQWNjZXNzb3JUeXBlLlZFQzMsIGFjY2Vzc29yQ29tcG9uZW50VHlwZTogQWNjZXNzb3JDb21wb25lbnRUeXBlLkZMT0FULCBieXRlU3RyaWRlOiAxMiB9LFxyXG4gICAgICAgICAgICB7IGtpbmQ6IFZlcnRleEJ1ZmZlci5Ob3JtYWxLaW5kLCBhY2Nlc3NvclR5cGU6IEFjY2Vzc29yVHlwZS5WRUMzLCBhY2Nlc3NvckNvbXBvbmVudFR5cGU6IEFjY2Vzc29yQ29tcG9uZW50VHlwZS5GTE9BVCwgYnl0ZVN0cmlkZTogMTIgfSxcclxuICAgICAgICAgICAgeyBraW5kOiBWZXJ0ZXhCdWZmZXIuQ29sb3JLaW5kLCBhY2Nlc3NvclR5cGU6IEFjY2Vzc29yVHlwZS5WRUM0LCBhY2Nlc3NvckNvbXBvbmVudFR5cGU6IEFjY2Vzc29yQ29tcG9uZW50VHlwZS5GTE9BVCwgYnl0ZVN0cmlkZTogMTYgfSxcclxuICAgICAgICAgICAgeyBraW5kOiBWZXJ0ZXhCdWZmZXIuVGFuZ2VudEtpbmQsIGFjY2Vzc29yVHlwZTogQWNjZXNzb3JUeXBlLlZFQzQsIGFjY2Vzc29yQ29tcG9uZW50VHlwZTogQWNjZXNzb3JDb21wb25lbnRUeXBlLkZMT0FULCBieXRlU3RyaWRlOiAxNiB9LFxyXG4gICAgICAgICAgICB7IGtpbmQ6IFZlcnRleEJ1ZmZlci5VVktpbmQsIGFjY2Vzc29yVHlwZTogQWNjZXNzb3JUeXBlLlZFQzIsIGFjY2Vzc29yQ29tcG9uZW50VHlwZTogQWNjZXNzb3JDb21wb25lbnRUeXBlLkZMT0FULCBieXRlU3RyaWRlOiA4IH0sXHJcbiAgICAgICAgICAgIHsga2luZDogVmVydGV4QnVmZmVyLlVWMktpbmQsIGFjY2Vzc29yVHlwZTogQWNjZXNzb3JUeXBlLlZFQzIsIGFjY2Vzc29yQ29tcG9uZW50VHlwZTogQWNjZXNzb3JDb21wb25lbnRUeXBlLkZMT0FULCBieXRlU3RyaWRlOiA4IH0sXHJcbiAgICAgICAgICAgIHsga2luZDogVmVydGV4QnVmZmVyLk1hdHJpY2VzSW5kaWNlc0tpbmQsIGFjY2Vzc29yVHlwZTogQWNjZXNzb3JUeXBlLlZFQzQsIGFjY2Vzc29yQ29tcG9uZW50VHlwZTogQWNjZXNzb3JDb21wb25lbnRUeXBlLlVOU0lHTkVEX1NIT1JULCBieXRlU3RyaWRlOiA4IH0sXHJcbiAgICAgICAgICAgIHsga2luZDogVmVydGV4QnVmZmVyLk1hdHJpY2VzSW5kaWNlc0V4dHJhS2luZCwgYWNjZXNzb3JUeXBlOiBBY2Nlc3NvclR5cGUuVkVDNCwgYWNjZXNzb3JDb21wb25lbnRUeXBlOiBBY2Nlc3NvckNvbXBvbmVudFR5cGUuVU5TSUdORURfU0hPUlQsIGJ5dGVTdHJpZGU6IDggfSxcclxuICAgICAgICAgICAgeyBraW5kOiBWZXJ0ZXhCdWZmZXIuTWF0cmljZXNXZWlnaHRzS2luZCwgYWNjZXNzb3JUeXBlOiBBY2Nlc3NvclR5cGUuVkVDNCwgYWNjZXNzb3JDb21wb25lbnRUeXBlOiBBY2Nlc3NvckNvbXBvbmVudFR5cGUuRkxPQVQsIGJ5dGVTdHJpZGU6IDE2IH0sXHJcbiAgICAgICAgICAgIHsga2luZDogVmVydGV4QnVmZmVyLk1hdHJpY2VzV2VpZ2h0c0V4dHJhS2luZCwgYWNjZXNzb3JUeXBlOiBBY2Nlc3NvclR5cGUuVkVDNCwgYWNjZXNzb3JDb21wb25lbnRUeXBlOiBBY2Nlc3NvckNvbXBvbmVudFR5cGUuRkxPQVQsIGJ5dGVTdHJpZGU6IDE2IH0sXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgaWYgKGJ1ZmZlck1lc2gpIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4QnVmZmVyVmlld0luZGV4OiBOdWxsYWJsZTxudW1iZXI+ID0gbnVsbDtcclxuICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlTW9kZSA9IHRoaXMuX2dldE1lc2hQcmltaXRpdmVNb2RlKGJ1ZmZlck1lc2gpO1xyXG4gICAgICAgICAgICBjb25zdCB2ZXJ0ZXhBdHRyaWJ1dGVCdWZmZXJWaWV3czogeyBbYXR0cmlidXRlS2luZDogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcclxuICAgICAgICAgICAgY29uc3QgbW9ycGhUYXJnZXRNYW5hZ2VyID0gYnVmZmVyTWVzaC5tb3JwaFRhcmdldE1hbmFnZXI7XHJcblxyXG4gICAgICAgICAgICAvLyBGb3IgZWFjaCBCYWJ5bG9uTWVzaCwgY3JlYXRlIGJ1ZmZlcnZpZXdzIGZvciBlYWNoICdraW5kJ1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGF0dHJpYnV0ZSBvZiBhdHRyaWJ1dGVEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVLaW5kID0gYXR0cmlidXRlLmtpbmQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVDb21wb25lbnRLaW5kID0gYXR0cmlidXRlLmFjY2Vzc29yQ29tcG9uZW50VHlwZTtcclxuICAgICAgICAgICAgICAgIGlmIChidWZmZXJNZXNoLmlzVmVydGljZXNEYXRhUHJlc2VudChhdHRyaWJ1dGVLaW5kLCB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZlcnRleEJ1ZmZlciA9IHRoaXMuX2dldFZlcnRleEJ1ZmZlckZyb21NZXNoKGF0dHJpYnV0ZUtpbmQsIGJ1ZmZlck1lc2gpO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZS5ieXRlU3RyaWRlID0gdmVydGV4QnVmZmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdmVydGV4QnVmZmVyLmdldFNpemUoKSAqIFZlcnRleEJ1ZmZlci5HZXRUeXBlQnl0ZUxlbmd0aChhdHRyaWJ1dGUuYWNjZXNzb3JDb21wb25lbnRUeXBlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFZlcnRleEJ1ZmZlci5EZWR1Y2VTdHJpZGUoYXR0cmlidXRlS2luZCkgKiA0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUuYnl0ZVN0cmlkZSA9PT0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlLmFjY2Vzc29yVHlwZSA9IEFjY2Vzc29yVHlwZS5WRUMzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlQnVmZmVyVmlld0tpbmQoYXR0cmlidXRlS2luZCwgYXR0cmlidXRlQ29tcG9uZW50S2luZCwgYmFieWxvblRyYW5zZm9ybU5vZGUsIGJpbmFyeVdyaXRlciwgYXR0cmlidXRlLmJ5dGVTdHJpZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZS5idWZmZXJWaWV3SW5kZXggPSB0aGlzLl9idWZmZXJWaWV3cy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleEF0dHJpYnV0ZUJ1ZmZlclZpZXdzW2F0dHJpYnV0ZUtpbmRdID0gYXR0cmlidXRlLmJ1ZmZlclZpZXdJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV3JpdGUgYW55IG1vcnBoIHRhcmdldCBkYXRhIHRvIHRoZSBidWZmZXIgYW5kIGNyZWF0ZSBhbiBhc3NvY2lhdGVkIGJ1ZmZlciB2aWV3XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vcnBoVGFyZ2V0TWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vcnBoVGFyZ2V0TWFuYWdlci5udW1UYXJnZXRzOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vcnBoVGFyZ2V0ID0gbW9ycGhUYXJnZXRNYW5hZ2VyLmdldFRhcmdldChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vcnBoVGFyZ2V0SW5mbyA9IHRoaXMuX2NyZWF0ZU1vcnBoVGFyZ2V0QnVmZmVyVmlld0tpbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlS2luZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGUuYWNjZXNzb3JUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZUNvbXBvbmVudEtpbmQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyTWVzaCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5hcnlXcml0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlLmJ5dGVTdHJpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RvcmUgaW5mbyBhYm91dCB0aGUgbW9ycGggdGFyZ2V0IHRoYXQgd2lsbCBiZSBuZWVkZWQgbGF0ZXIgd2hlbiBjcmVhdGluZyBwZXItc3VibWVzaCBhY2Nlc3NvcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb3JwaFRhcmdldEluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWF0dHJpYnV0ZS5tb3JwaFRhcmdldEluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlLm1vcnBoVGFyZ2V0SW5mbyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGUubW9ycGhUYXJnZXRJbmZvW2ldID0gbW9ycGhUYXJnZXRJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYnVmZmVyTWVzaC5nZXRUb3RhbEluZGljZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kaWNlcyA9IGJ1ZmZlck1lc2guZ2V0SW5kaWNlcygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGljZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBieXRlTGVuZ3RoID0gaW5kaWNlcy5sZW5ndGggKiA0O1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlclZpZXcgPSBfR0xURlV0aWxpdGllcy5fQ3JlYXRlQnVmZmVyVmlldygwLCBiaW5hcnlXcml0ZXIuZ2V0Qnl0ZU9mZnNldCgpLCBieXRlTGVuZ3RoLCB1bmRlZmluZWQsIFwiSW5kaWNlcyAtIFwiICsgYnVmZmVyTWVzaC5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXJWaWV3cy5wdXNoKGJ1ZmZlclZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4QnVmZmVyVmlld0luZGV4ID0gdGhpcy5fYnVmZmVyVmlld3MubGVuZ3RoIC0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDAsIGxlbmd0aCA9IGluZGljZXMubGVuZ3RoOyBrIDwgbGVuZ3RoOyArK2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmluYXJ5V3JpdGVyLnNldFVJbnQzMihpbmRpY2VzW2tdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChidWZmZXJNZXNoLnN1Yk1lc2hlcykge1xyXG4gICAgICAgICAgICAgICAgLy8gZ28gdGhyb3VnaCBhbGwgbWVzaCBwcmltaXRpdmVzIChzdWJtZXNoZXMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1Ym1lc2ggb2YgYnVmZmVyTWVzaC5zdWJNZXNoZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYmFieWxvbk1hdGVyaWFsID0gc3VibWVzaC5nZXRNYXRlcmlhbCgpIHx8IGJ1ZmZlck1lc2guZ2V0U2NlbmUoKS5kZWZhdWx0TWF0ZXJpYWw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXRlcmlhbEluZGV4OiBOdWxsYWJsZTxudW1iZXI+ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXJNZXNoIGluc3RhbmNlb2YgTGluZXNNZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNvbG9yIGZyb20gdGhlIGxpbmVzIG1lc2ggYW5kIHNldCBpdCBpbiB0aGUgbWF0ZXJpYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsOiBJTWF0ZXJpYWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYnVmZmVyTWVzaC5uYW1lICsgXCIgbWF0ZXJpYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWJ1ZmZlck1lc2guY29sb3IuZXF1YWxzKENvbG9yMy5XaGl0ZSgpKSB8fCBidWZmZXJNZXNoLmFscGhhIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLnBick1ldGFsbGljUm91Z2huZXNzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlQ29sb3JGYWN0b3I6IGJ1ZmZlck1lc2guY29sb3IuYXNBcnJheSgpLmNvbmNhdChbYnVmZmVyTWVzaC5hbHBoYV0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbEluZGV4ID0gdGhpcy5fbWF0ZXJpYWxzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYmFieWxvbk1hdGVyaWFsIGluc3RhbmNlb2YgTXVsdGlNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViTWF0ZXJpYWwgPSBiYWJ5bG9uTWF0ZXJpYWwuc3ViTWF0ZXJpYWxzW3N1Ym1lc2gubWF0ZXJpYWxJbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwgPSBzdWJNYXRlcmlhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbEluZGV4ID0gdGhpcy5fbWF0ZXJpYWxNYXBbYmFieWxvbk1hdGVyaWFsLnVuaXF1ZUlkXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsSW5kZXggPSB0aGlzLl9tYXRlcmlhbE1hcFtiYWJ5bG9uTWF0ZXJpYWwudW5pcXVlSWRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBnbFRGTWF0ZXJpYWw6IE51bGxhYmxlPElNYXRlcmlhbD4gPSBtYXRlcmlhbEluZGV4ICE9IG51bGwgPyB0aGlzLl9tYXRlcmlhbHNbbWF0ZXJpYWxJbmRleF0gOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNoUHJpbWl0aXZlOiBJTWVzaFByaW1pdGl2ZSA9IHsgYXR0cmlidXRlczoge30gfTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRQcmltaXRpdmVNb2RlKG1lc2hQcmltaXRpdmUsIHByaW1pdGl2ZU1vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGF0dHJpYnV0ZSBvZiBhdHRyaWJ1dGVEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZUtpbmQgPSBhdHRyaWJ1dGUua2luZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChhdHRyaWJ1dGVLaW5kID09PSBWZXJ0ZXhCdWZmZXIuVVZLaW5kIHx8IGF0dHJpYnV0ZUtpbmQgPT09IFZlcnRleEJ1ZmZlci5VVjJLaW5kKSAmJiAhdGhpcy5fb3B0aW9ucy5leHBvcnRVbnVzZWRVVnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZ2xURk1hdGVyaWFsIHx8ICF0aGlzLl9nbFRGTWF0ZXJpYWxFeHBvcnRlci5faGFzVGV4dHVyZXNQcmVzZW50KGdsVEZNYXRlcmlhbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2ZXJ0ZXhEYXRhID0gYnVmZmVyTWVzaC5nZXRWZXJ0aWNlc0RhdGEoYXR0cmlidXRlS2luZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmVydGV4RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmVydGV4QnVmZmVyID0gdGhpcy5fZ2V0VmVydGV4QnVmZmVyRnJvbU1lc2goYXR0cmlidXRlS2luZCwgYnVmZmVyTWVzaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmVydGV4QnVmZmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RyaWRlID0gdmVydGV4QnVmZmVyLmdldFNpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBidWZmZXJWaWV3SW5kZXggPSBhdHRyaWJ1dGUuYnVmZmVyVmlld0luZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXJWaWV3SW5kZXggIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiBidWZmZXJ2aWV3aW5kZXggaGFzIGEgbnVtZXJpYyB2YWx1ZSBhc3NpZ25lZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluTWF4ID0geyBtaW46IG51bGwsIG1heDogbnVsbCB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlS2luZCA9PSBWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5NYXggPSBfR0xURlV0aWxpdGllcy5fQ2FsY3VsYXRlTWluTWF4UG9zaXRpb25zKHZlcnRleERhdGEsIDAsIHZlcnRleERhdGEubGVuZ3RoIC8gc3RyaWRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhY2Nlc3NvciA9IF9HTFRGVXRpbGl0aWVzLl9DcmVhdGVBY2Nlc3NvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlclZpZXdJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZUtpbmQgKyBcIiAtIFwiICsgYmFieWxvblRyYW5zZm9ybU5vZGUubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZS5hY2Nlc3NvclR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGUuYWNjZXNzb3JDb21wb25lbnRUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVydGV4RGF0YS5sZW5ndGggLyBzdHJpZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluTWF4Lm1pbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbk1heC5tYXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWNjZXNzb3JzLnB1c2goYWNjZXNzb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRBdHRyaWJ1dGVLaW5kKG1lc2hQcmltaXRpdmUuYXR0cmlidXRlcywgYXR0cmlidXRlS2luZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXhCdWZmZXJWaWV3SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGFjY2Vzc29yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjY2Vzc29yID0gX0dMVEZVdGlsaXRpZXMuX0NyZWF0ZUFjY2Vzc29yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhCdWZmZXJWaWV3SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluZGljZXMgLSBcIiArIGJhYnlsb25UcmFuc2Zvcm1Ob2RlLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY2Nlc3NvclR5cGUuU0NBTEFSLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQWNjZXNzb3JDb21wb25lbnRUeXBlLlVOU0lHTkVEX0lOVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1lc2guaW5kZXhDb3VudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1lc2guaW5kZXhTdGFydCAqIDQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY2Nlc3NvcnMucHVzaChhY2Nlc3Nvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc2hQcmltaXRpdmUuaW5kaWNlcyA9IHRoaXMuX2FjY2Vzc29ycy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKG1lc2hQcmltaXRpdmUuYXR0cmlidXRlcykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaWRlT3JpZW50YXRpb24gPSBiYWJ5bG9uTWF0ZXJpYWwuX2dldEVmZmVjdGl2ZU9yaWVudGF0aW9uKGJ1ZmZlck1lc2gpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpZGVPcmllbnRhdGlvbiA9PT0gKHRoaXMuX2JhYnlsb25TY2VuZS51c2VSaWdodEhhbmRlZFN5c3RlbSA/IE1hdGVyaWFsLkNsb2NrV2lzZVNpZGVPcmllbnRhdGlvbiA6IE1hdGVyaWFsLkNvdW50ZXJDbG9ja1dpc2VTaWRlT3JpZW50YXRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnl0ZU9mZnNldCA9IGluZGV4QnVmZmVyVmlld0luZGV4ICE9IG51bGwgPyB0aGlzLl9idWZmZXJWaWV3c1tpbmRleEJ1ZmZlclZpZXdJbmRleF0uYnl0ZU9mZnNldCA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnl0ZU9mZnNldCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZU9mZnNldCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmFieWxvbkluZGljZXM6IE51bGxhYmxlPEluZGljZXNBcnJheT4gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4QnVmZmVyVmlld0luZGV4ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uSW5kaWNlcyA9IGJ1ZmZlck1lc2guZ2V0SW5kaWNlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhYnlsb25JbmRpY2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVvcmRlckluZGljZXNCYXNlZE9uUHJpbWl0aXZlTW9kZShzdWJtZXNoLCBwcmltaXRpdmVNb2RlLCBiYWJ5bG9uSW5kaWNlcywgYnl0ZU9mZnNldCwgYmluYXJ5V3JpdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyaWJ1dGUgb2YgYXR0cmlidXRlRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2ZXJ0ZXhEYXRhID0gYnVmZmVyTWVzaC5nZXRWZXJ0aWNlc0RhdGEoYXR0cmlidXRlLmtpbmQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZlcnRleERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ5dGVPZmZzZXQgPSB0aGlzLl9idWZmZXJWaWV3c1t2ZXJ0ZXhBdHRyaWJ1dGVCdWZmZXJWaWV3c1thdHRyaWJ1dGUua2luZF1dLmJ5dGVPZmZzZXQgfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlb3JkZXJWZXJ0ZXhBdHRyaWJ1dGVEYXRhQmFzZWRPblByaW1pdGl2ZU1vZGUoc3VibWVzaCwgcHJpbWl0aXZlTW9kZSwgYXR0cmlidXRlLmtpbmQsIHZlcnRleERhdGEsIGJ5dGVPZmZzZXQsIGJpbmFyeVdyaXRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRlcmlhbEluZGV4ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc2hQcmltaXRpdmUubWF0ZXJpYWwgPSBtYXRlcmlhbEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbW9ycGggdGFyZ2V0cywgd3JpdGUgb3V0IHRhcmdldHMgYW5kIGFzc29jaWF0ZWQgYWNjZXNzb3JzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vcnBoVGFyZ2V0TWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBCeSBjb252ZW50aW9uLCBtb3JwaCB0YXJnZXQgbmFtZXMgYXJlIHN0b3JlZCBpbiB0aGUgbWVzaCBleHRyYXMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWVzaC5leHRyYXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc2guZXh0cmFzID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzaC5leHRyYXMudGFyZ2V0TmFtZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9ycGhUYXJnZXRNYW5hZ2VyLm51bVRhcmdldHM7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9ycGhUYXJnZXQgPSBtb3JwaFRhcmdldE1hbmFnZXIuZ2V0VGFyZ2V0KGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzaC5leHRyYXMudGFyZ2V0TmFtZXMucHVzaChtb3JwaFRhcmdldC5uYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGF0dHJpYnV0ZSBvZiBhdHRyaWJ1dGVEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9ycGhUYXJnZXRJbmZvID0gYXR0cmlidXRlLm1vcnBoVGFyZ2V0SW5mbz8uW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb3JwaFRhcmdldEluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV3JpdGUgdGhlIGFjY2Vzc29yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ5dGVPZmZzZXQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhY2Nlc3NvciA9IF9HTFRGVXRpbGl0aWVzLl9DcmVhdGVBY2Nlc3NvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoVGFyZ2V0SW5mby5idWZmZXJWaWV3SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHthdHRyaWJ1dGUua2luZH0gLSAke21vcnBoVGFyZ2V0Lm5hbWV9IChNb3JwaCBUYXJnZXQpYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoVGFyZ2V0SW5mby5hY2Nlc3NvclR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGUuYWNjZXNzb3JDb21wb25lbnRUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhUYXJnZXRJbmZvLnZlcnRleENvdW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZU9mZnNldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoVGFyZ2V0SW5mby5taW5NYXg/Lm1pbj8uYXNBcnJheSgpID8/IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldEluZm8ubWluTWF4Py5tYXg/LmFzQXJyYXkoKSA/PyBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjY2Vzc29ycy5wdXNoKGFjY2Vzc29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIHRhcmdldCB0aGF0IHJlZmVyZW5jZXMgdGhlIG5ldyBhY2Nlc3NvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1lc2hQcmltaXRpdmUudGFyZ2V0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzaFByaW1pdGl2ZS50YXJnZXRzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWVzaFByaW1pdGl2ZS50YXJnZXRzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNoUHJpbWl0aXZlLnRhcmdldHNbaV0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0QXR0cmlidXRlS2luZChtZXNoUHJpbWl0aXZlLnRhcmdldHNbaV0sIGF0dHJpYnV0ZS5raW5kKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1lc2gucHJpbWl0aXZlcy5wdXNoKG1lc2hQcmltaXRpdmUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9leHRlbnNpb25zUG9zdEV4cG9ydE1lc2hQcmltaXRpdmVBc3luYyhcInBvc3RFeHBvcnRcIiwgbWVzaFByaW1pdGl2ZSwgc3VibWVzaCwgYmluYXJ5V3JpdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgLyogZG8gbm90aGluZyAqL1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGdsVEYgc2NlbmUgYmFzZWQgb24gdGhlIGFycmF5IG9mIG1lc2hlc1xyXG4gICAgICogUmV0dXJucyB0aGUgdG90YWwgYnl0ZSBvZmZzZXRcclxuICAgICAqIEBwYXJhbSBiaW5hcnlXcml0ZXIgQnVmZmVyIHRvIHdyaXRlIGJpbmFyeSBkYXRhIHRvXHJcbiAgICAgKiBAcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIGRvbmVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfY3JlYXRlU2NlbmVBc3luYyhiaW5hcnlXcml0ZXI6IF9CaW5hcnlXcml0ZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBzY2VuZTogSVNjZW5lID0geyBub2RlczogW10gfTtcclxuICAgICAgICBsZXQgZ2xURk5vZGVJbmRleDogbnVtYmVyO1xyXG4gICAgICAgIGxldCBnbFRGTm9kZTogSU5vZGU7XHJcbiAgICAgICAgbGV0IGRpcmVjdERlc2NlbmRlbnRzOiBOb2RlW107XHJcbiAgICAgICAgY29uc3Qgbm9kZXM6IE5vZGVbXSA9IFsuLi50aGlzLl9iYWJ5bG9uU2NlbmUudHJhbnNmb3JtTm9kZXMsIC4uLnRoaXMuX2JhYnlsb25TY2VuZS5tZXNoZXMsIC4uLnRoaXMuX2JhYnlsb25TY2VuZS5saWdodHMsIC4uLnRoaXMuX2JhYnlsb25TY2VuZS5jYW1lcmFzXTtcclxuICAgICAgICBjb25zdCByZW1vdmVkUm9vdE5vZGVzID0gbmV3IFNldDxOb2RlPigpO1xyXG5cclxuICAgICAgICAvLyBTY2VuZSBtZXRhZGF0YVxyXG4gICAgICAgIGlmICh0aGlzLl9iYWJ5bG9uU2NlbmUubWV0YWRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMubWV0YWRhdGFTZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgc2NlbmUuZXh0cmFzID0gdGhpcy5fb3B0aW9ucy5tZXRhZGF0YVNlbGVjdG9yKHRoaXMuX2JhYnlsb25TY2VuZS5tZXRhZGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYmFieWxvblNjZW5lLm1ldGFkYXRhLmdsdGYpIHtcclxuICAgICAgICAgICAgICAgIHNjZW5lLmV4dHJhcyA9IHRoaXMuX2JhYnlsb25TY2VuZS5tZXRhZGF0YS5nbHRmLmV4dHJhcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIG5vLW9wIHJvb3Qgbm9kZXNcclxuICAgICAgICBpZiAoKHRoaXMuX29wdGlvbnMucmVtb3ZlTm9vcFJvb3ROb2RlcyA/PyB0cnVlKSAmJiAhdGhpcy5fb3B0aW9ucy5pbmNsdWRlQ29vcmRpbmF0ZVN5c3RlbUNvbnZlcnNpb25Ob2Rlcykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJvb3ROb2RlIG9mIHRoaXMuX2JhYnlsb25TY2VuZS5yb290Tm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc05vb3BOb2RlKHJvb3ROb2RlLCB0aGlzLl9iYWJ5bG9uU2NlbmUudXNlUmlnaHRIYW5kZWRTeXN0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZFJvb3ROb2Rlcy5hZGQocm9vdE5vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBFeGNsdWRlIHRoZSBub2RlIGZyb20gbGlzdCBvZiBub2RlcyB0byBleHBvcnRcclxuICAgICAgICAgICAgICAgICAgICBub2Rlcy5zcGxpY2Uobm9kZXMuaW5kZXhPZihyb290Tm9kZSksIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFeHBvcnQgYmFieWxvbiBjYW1lcmFzIHRvIGdsVEZDYW1lcmFcclxuICAgICAgICBjb25zdCBjYW1lcmFNYXAgPSBuZXcgTWFwPENhbWVyYSwgbnVtYmVyPigpO1xyXG4gICAgICAgIHRoaXMuX2JhYnlsb25TY2VuZS5jYW1lcmFzLmZvckVhY2goKGNhbWVyYSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5zaG91bGRFeHBvcnROb2RlICYmICF0aGlzLl9vcHRpb25zLnNob3VsZEV4cG9ydE5vZGUoY2FtZXJhKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBnbFRGQ2FtZXJhOiBJQ2FtZXJhID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogY2FtZXJhLm1vZGUgPT09IENhbWVyYS5QRVJTUEVDVElWRV9DQU1FUkEgPyBDYW1lcmFUeXBlLlBFUlNQRUNUSVZFIDogQ2FtZXJhVHlwZS5PUlRIT0dSQVBISUMsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FtZXJhLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGdsVEZDYW1lcmEubmFtZSA9IGNhbWVyYS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZ2xURkNhbWVyYS50eXBlID09PSBDYW1lcmFUeXBlLlBFUlNQRUNUSVZFKSB7XHJcbiAgICAgICAgICAgICAgICBnbFRGQ2FtZXJhLnBlcnNwZWN0aXZlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFzcGVjdFJhdGlvOiBjYW1lcmEuZ2V0RW5naW5lKCkuZ2V0QXNwZWN0UmF0aW8oY2FtZXJhKSxcclxuICAgICAgICAgICAgICAgICAgICB5Zm92OiBjYW1lcmEuZm92TW9kZSA9PT0gQ2FtZXJhLkZPVk1PREVfVkVSVElDQUxfRklYRUQgPyBjYW1lcmEuZm92IDogY2FtZXJhLmZvdiAqIGNhbWVyYS5nZXRFbmdpbmUoKS5nZXRBc3BlY3RSYXRpbyhjYW1lcmEpLFxyXG4gICAgICAgICAgICAgICAgICAgIHpuZWFyOiBjYW1lcmEubWluWixcclxuICAgICAgICAgICAgICAgICAgICB6ZmFyOiBjYW1lcmEubWF4WixcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZ2xURkNhbWVyYS50eXBlID09PSBDYW1lcmFUeXBlLk9SVEhPR1JBUEhJQykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFsZldpZHRoID0gY2FtZXJhLm9ydGhvTGVmdCAmJiBjYW1lcmEub3J0aG9SaWdodCA/IDAuNSAqIChjYW1lcmEub3J0aG9SaWdodCAtIGNhbWVyYS5vcnRob0xlZnQpIDogY2FtZXJhLmdldEVuZ2luZSgpLmdldFJlbmRlcldpZHRoKCkgKiAwLjU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoYWxmSGVpZ2h0ID0gY2FtZXJhLm9ydGhvQm90dG9tICYmIGNhbWVyYS5vcnRob1RvcCA/IDAuNSAqIChjYW1lcmEub3J0aG9Ub3AgLSBjYW1lcmEub3J0aG9Cb3R0b20pIDogY2FtZXJhLmdldEVuZ2luZSgpLmdldFJlbmRlckhlaWdodCgpICogMC41O1xyXG4gICAgICAgICAgICAgICAgZ2xURkNhbWVyYS5vcnRob2dyYXBoaWMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeG1hZzogaGFsZldpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIHltYWc6IGhhbGZIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgem5lYXI6IGNhbWVyYS5taW5aLFxyXG4gICAgICAgICAgICAgICAgICAgIHpmYXI6IGNhbWVyYS5tYXhaLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FtZXJhTWFwLnNldChjYW1lcmEsIHRoaXMuX2NhbWVyYXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgdGhpcy5fY2FtZXJhcy5wdXNoKGdsVEZDYW1lcmEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBbZXhwb3J0Tm9kZXMsIGV4cG9ydE1hdGVyaWFsc10gPSB0aGlzLl9nZXRFeHBvcnROb2Rlcyhub2Rlcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dsVEZNYXRlcmlhbEV4cG9ydGVyLl9jb252ZXJ0TWF0ZXJpYWxzVG9HTFRGQXN5bmMoZXhwb3J0TWF0ZXJpYWxzLCBJbWFnZU1pbWVUeXBlLlBORywgdHJ1ZSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVOb2RlTWFwQW5kQW5pbWF0aW9uc0FzeW5jKGV4cG9ydE5vZGVzLCBiaW5hcnlXcml0ZXIpLnRoZW4oKG5vZGVNYXApID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVTa2luc0FzeW5jKG5vZGVNYXAsIGJpbmFyeVdyaXRlcikudGhlbigoc2tpbk1hcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25vZGVNYXAgPSBub2RlTWFwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b3RhbEJ5dGVMZW5ndGggPSBiaW5hcnlXcml0ZXIuZ2V0Qnl0ZU9mZnNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b3RhbEJ5dGVMZW5ndGggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVuZGVmaW5lZCBieXRlIGxlbmd0aCFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBCdWlsZCBIaWVyYXJjaHkgd2l0aCB0aGUgbm9kZSBtYXAuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBiYWJ5bG9uTm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbFRGTm9kZUluZGV4ID0gdGhpcy5fbm9kZU1hcFtiYWJ5bG9uTm9kZS51bmlxdWVJZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnbFRGTm9kZUluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsVEZOb2RlID0gdGhpcy5fbm9kZXNbZ2xURk5vZGVJbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhYnlsb25Ob2RlLm1ldGFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMubWV0YWRhdGFTZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbFRGTm9kZS5leHRyYXMgPSB0aGlzLl9vcHRpb25zLm1ldGFkYXRhU2VsZWN0b3IoYmFieWxvbk5vZGUubWV0YWRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYmFieWxvbk5vZGUubWV0YWRhdGEuZ2x0Zikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbFRGTm9kZS5leHRyYXMgPSBiYWJ5bG9uTm9kZS5tZXRhZGF0YS5nbHRmLmV4dHJhcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhYnlsb25Ob2RlIGluc3RhbmNlb2YgQ2FtZXJhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xURk5vZGUuY2FtZXJhID0gY2FtZXJhTWFwLmdldChiYWJ5bG9uTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuc2hvdWxkRXhwb3J0Tm9kZSAmJiAhdGhpcy5fb3B0aW9ucy5zaG91bGRFeHBvcnROb2RlKGJhYnlsb25Ob2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRvb2xzLkxvZyhcIk9taXR0aW5nIFwiICsgYmFieWxvbk5vZGUubmFtZSArIFwiIGZyb20gc2NlbmUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWJhYnlsb25Ob2RlLnBhcmVudCAmJiAhdGhpcy5fYmFieWxvblNjZW5lLnVzZVJpZ2h0SGFuZGVkU3lzdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnROb2RlSGFuZGVkbmVzcyhnbFRGTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWJhYnlsb25Ob2RlLnBhcmVudCB8fCByZW1vdmVkUm9vdE5vZGVzLmhhcyhiYWJ5bG9uTm9kZS5wYXJlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLm5vZGVzLnB1c2goZ2xURk5vZGVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTm9kZSBpbnN0YW5jZW9mIE1lc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk5vZGUuc2tlbGV0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xURk5vZGUuc2tpbiA9IHNraW5NYXBbYmFieWxvbk5vZGUuc2tlbGV0b24udW5pcXVlSWRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3REZXNjZW5kZW50cyA9IGJhYnlsb25Ob2RlLmdldERlc2NlbmRhbnRzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFnbFRGTm9kZS5jaGlsZHJlbiAmJiBkaXJlY3REZXNjZW5kZW50cyAmJiBkaXJlY3REZXNjZW5kZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGlsZHJlbjogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGRlc2NlbmRlbnQgb2YgZGlyZWN0RGVzY2VuZGVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX25vZGVNYXBbZGVzY2VuZGVudC51bmlxdWVJZF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh0aGlzLl9ub2RlTWFwW2Rlc2NlbmRlbnQudW5pcXVlSWRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsVEZOb2RlLmNoaWxkcmVuID0gY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY2VuZS5ub2Rlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2NlbmVzLnB1c2goc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHRpbmcgdGhlIG5vZGVzIGFuZCBtYXRlcmlhbHMgdGhhdCB3b3VsZCBiZSBleHBvcnRlZC5cclxuICAgICAqIEBwYXJhbSBub2RlcyBCYWJ5bG9uIHRyYW5zZm9ybSBub2Rlc1xyXG4gICAgICogQHJldHVybnMgU2V0IG9mIG1hdGVyaWFscyB3aGljaCB3b3VsZCBiZSBleHBvcnRlZC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZ2V0RXhwb3J0Tm9kZXMobm9kZXM6IE5vZGVbXSk6IFtOb2RlW10sIFNldDxNYXRlcmlhbD5dIHtcclxuICAgICAgICBjb25zdCBleHBvcnROb2RlczogTm9kZVtdID0gW107XHJcbiAgICAgICAgY29uc3QgZXhwb3J0TWF0ZXJpYWxzOiBTZXQ8TWF0ZXJpYWw+ID0gbmV3IFNldDxNYXRlcmlhbD4oKTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBiYWJ5bG9uTm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX29wdGlvbnMuc2hvdWxkRXhwb3J0Tm9kZSB8fCB0aGlzLl9vcHRpb25zLnNob3VsZEV4cG9ydE5vZGUoYmFieWxvbk5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICBleHBvcnROb2Rlcy5wdXNoKGJhYnlsb25Ob2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYWJ5bG9uTWVzaCA9IGJhYnlsb25Ob2RlIGFzIEFic3RyYWN0TWVzaDtcclxuICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTWVzaC5zdWJNZXNoZXMgJiYgYmFieWxvbk1lc2guc3ViTWVzaGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IGJhYnlsb25NZXNoLm1hdGVyaWFsIHx8IGJhYnlsb25NZXNoLmdldFNjZW5lKCkuZGVmYXVsdE1hdGVyaWFsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRlcmlhbCBpbnN0YW5jZW9mIE11bHRpTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBzdWJNYXRlcmlhbCBvZiBtYXRlcmlhbC5zdWJNYXRlcmlhbHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydE1hdGVyaWFscy5hZGQoc3ViTWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwb3J0TWF0ZXJpYWxzLmFkZChtYXRlcmlhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYEV4Y2x1ZGluZyBub2RlICR7YmFieWxvbk5vZGUubmFtZX1gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gW2V4cG9ydE5vZGVzLCBleHBvcnRNYXRlcmlhbHNdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG1hcHBpbmcgb2YgTm9kZSB1bmlxdWUgaWQgdG8gbm9kZSBpbmRleCBhbmQgaGFuZGxlcyBhbmltYXRpb25zXHJcbiAgICAgKiBAcGFyYW0gbm9kZXMgQmFieWxvbiB0cmFuc2Zvcm0gbm9kZXNcclxuICAgICAqIEBwYXJhbSBiaW5hcnlXcml0ZXIgQnVmZmVyIHRvIHdyaXRlIGJpbmFyeSBkYXRhIHRvXHJcbiAgICAgKiBAcmV0dXJucyBOb2RlIG1hcHBpbmcgb2YgdW5pcXVlIGlkIHRvIGluZGV4XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NyZWF0ZU5vZGVNYXBBbmRBbmltYXRpb25zQXN5bmMobm9kZXM6IE5vZGVbXSwgYmluYXJ5V3JpdGVyOiBfQmluYXJ5V3JpdGVyKTogUHJvbWlzZTx7IFtrZXk6IG51bWJlcl06IG51bWJlciB9PiB7XHJcbiAgICAgICAgbGV0IHByb21pc2VDaGFpbiA9IFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIGNvbnN0IG5vZGVNYXA6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0gPSB7fTtcclxuICAgICAgICBsZXQgbm9kZUluZGV4OiBudW1iZXI7XHJcbiAgICAgICAgY29uc3QgcnVudGltZUdMVEZBbmltYXRpb246IElBbmltYXRpb24gPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwicnVudGltZSBhbmltYXRpb25zXCIsXHJcbiAgICAgICAgICAgIGNoYW5uZWxzOiBbXSxcclxuICAgICAgICAgICAgc2FtcGxlcnM6IFtdLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgaWRsZUdMVEZBbmltYXRpb25zOiBJQW5pbWF0aW9uW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBiYWJ5bG9uTm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgICBwcm9taXNlQ2hhaW4gPSBwcm9taXNlQ2hhaW4udGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlTm9kZUFzeW5jKGJhYnlsb25Ob2RlLCBiaW5hcnlXcml0ZXIpLnRoZW4oKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5fZXh0ZW5zaW9uc1Bvc3RFeHBvcnROb2RlQXN5bmMoXCJjcmVhdGVOb2RlQXN5bmNcIiwgbm9kZSwgYmFieWxvbk5vZGUsIG5vZGVNYXAsIGJpbmFyeVdyaXRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb21pc2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb29scy5XYXJuKGBOb3QgZXhwb3J0aW5nIG5vZGUgJHtiYWJ5bG9uTm9kZS5uYW1lfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbigobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbm9kZXMucHVzaChub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVJbmRleCA9IHRoaXMuX25vZGVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlTWFwW2JhYnlsb25Ob2RlLnVuaXF1ZUlkXSA9IG5vZGVJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2JhYnlsb25TY2VuZS5hbmltYXRpb25Hcm91cHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX0dMVEZBbmltYXRpb24uX0NyZWF0ZU1vcnBoVGFyZ2V0QW5pbWF0aW9uRnJvbU1vcnBoVGFyZ2V0QW5pbWF0aW9ucyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFieWxvbk5vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bnRpbWVHTFRGQW5pbWF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZGxlR0xURkFuaW1hdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVNYXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25vZGVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5hcnlXcml0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlclZpZXdzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY2Nlc3NvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvblNhbXBsZVJhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuc2hvdWxkRXhwb3J0QW5pbWF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk5vZGUuYW5pbWF0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX0dMVEZBbmltYXRpb24uX0NyZWF0ZU5vZGVBbmltYXRpb25Gcm9tTm9kZUFuaW1hdGlvbnMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTm9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bnRpbWVHTFRGQW5pbWF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRsZUdMVEZBbmltYXRpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZU1hcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25vZGVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluYXJ5V3JpdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyVmlld3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY2Nlc3NvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb25TYW1wbGVSYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5zaG91bGRFeHBvcnRBbmltYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwcm9taXNlQ2hhaW4udGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChydW50aW1lR0xURkFuaW1hdGlvbi5jaGFubmVscy5sZW5ndGggJiYgcnVudGltZUdMVEZBbmltYXRpb24uc2FtcGxlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb25zLnB1c2gocnVudGltZUdMVEZBbmltYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlkbGVHTFRGQW5pbWF0aW9ucy5mb3JFYWNoKChpZGxlR0xURkFuaW1hdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlkbGVHTFRGQW5pbWF0aW9uLmNoYW5uZWxzLmxlbmd0aCAmJiBpZGxlR0xURkFuaW1hdGlvbi5zYW1wbGVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb25zLnB1c2goaWRsZUdMVEZBbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9iYWJ5bG9uU2NlbmUuYW5pbWF0aW9uR3JvdXBzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgX0dMVEZBbmltYXRpb24uX0NyZWF0ZU5vZGVBbmRNb3JwaEFuaW1hdGlvbkZyb21BbmltYXRpb25Hcm91cHMoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmFieWxvblNjZW5lLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZU1hcCxcclxuICAgICAgICAgICAgICAgICAgICBiaW5hcnlXcml0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyVmlld3MsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWNjZXNzb3JzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvblNhbXBsZVJhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5zaG91bGRFeHBvcnRBbmltYXRpb25cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBub2RlTWFwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGdsVEYgbm9kZSBmcm9tIGEgQmFieWxvbiBtZXNoXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvbk5vZGUgU291cmNlIEJhYnlsb24gbWVzaFxyXG4gICAgICogQHBhcmFtIGJpbmFyeVdyaXRlciBCdWZmZXIgZm9yIHN0b3JpbmcgZ2VvbWV0cnkgZGF0YVxyXG4gICAgICogQHJldHVybnMgZ2xURiBub2RlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NyZWF0ZU5vZGVBc3luYyhiYWJ5bG9uTm9kZTogTm9kZSwgYmluYXJ5V3JpdGVyOiBfQmluYXJ5V3JpdGVyKTogUHJvbWlzZTxJTm9kZT4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gY3JlYXRlIG5vZGUgdG8gaG9sZCB0cmFuc2xhdGlvbi9yb3RhdGlvbi9zY2FsZSBhbmQgdGhlIG1lc2hcclxuICAgICAgICAgICAgY29uc3Qgbm9kZTogSU5vZGUgPSB7fTtcclxuICAgICAgICAgICAgLy8gY3JlYXRlIG1lc2hcclxuICAgICAgICAgICAgY29uc3QgbWVzaDogSU1lc2ggPSB7IHByaW1pdGl2ZXM6IFtdIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoYmFieWxvbk5vZGUubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5uYW1lID0gYmFieWxvbk5vZGUubmFtZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGJhYnlsb25Ob2RlIGluc3RhbmNlb2YgVHJhbnNmb3JtTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IHRyYW5zZm9ybWF0aW9uXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXROb2RlVHJhbnNmb3JtYXRpb24obm9kZSwgYmFieWxvbk5vZGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhYnlsb25Ob2RlIGluc3RhbmNlb2YgTWVzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vcnBoVGFyZ2V0TWFuYWdlciA9IGJhYnlsb25Ob2RlLm1vcnBoVGFyZ2V0TWFuYWdlcjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobW9ycGhUYXJnZXRNYW5hZ2VyICYmIG1vcnBoVGFyZ2V0TWFuYWdlci5udW1UYXJnZXRzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNoLndlaWdodHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb3JwaFRhcmdldE1hbmFnZXIubnVtVGFyZ2V0czsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNoLndlaWdodHMucHVzaChtb3JwaFRhcmdldE1hbmFnZXIuZ2V0VGFyZ2V0KGkpLmluZmx1ZW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2V0UHJpbWl0aXZlQXR0cmlidXRlc0FzeW5jKG1lc2gsIGJhYnlsb25Ob2RlLCBiaW5hcnlXcml0ZXIpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNoLnByaW1pdGl2ZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21lc2hlcy5wdXNoKG1lc2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLm1lc2ggPSB0aGlzLl9tZXNoZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChiYWJ5bG9uTm9kZSBpbnN0YW5jZW9mIENhbWVyYSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0Q2FtZXJhVHJhbnNmb3JtYXRpb24obm9kZSwgYmFieWxvbk5vZGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGdsVEYgc2tpbiBmcm9tIGEgQmFieWxvbiBza2VsZXRvblxyXG4gICAgICogQHBhcmFtIG5vZGVNYXAgQmFieWxvbiB0cmFuc2Zvcm0gbm9kZXNcclxuICAgICAqIEBwYXJhbSBiaW5hcnlXcml0ZXIgQnVmZmVyIHRvIHdyaXRlIGJpbmFyeSBkYXRhIHRvXHJcbiAgICAgKiBAcmV0dXJucyBOb2RlIG1hcHBpbmcgb2YgdW5pcXVlIGlkIHRvIGluZGV4XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NyZWF0ZVNraW5zQXN5bmMobm9kZU1hcDogeyBba2V5OiBudW1iZXJdOiBudW1iZXIgfSwgYmluYXJ5V3JpdGVyOiBfQmluYXJ5V3JpdGVyKTogUHJvbWlzZTx7IFtrZXk6IG51bWJlcl06IG51bWJlciB9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZUNoYWluID0gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgY29uc3Qgc2tpbk1hcDogeyBba2V5OiBudW1iZXJdOiBudW1iZXIgfSA9IHt9O1xyXG4gICAgICAgIGZvciAoY29uc3Qgc2tlbGV0b24gb2YgdGhpcy5fYmFieWxvblNjZW5lLnNrZWxldG9ucykge1xyXG4gICAgICAgICAgICBpZiAoc2tlbGV0b24uYm9uZXMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBza2luXHJcbiAgICAgICAgICAgIGNvbnN0IHNraW46IElTa2luID0geyBqb2ludHM6IFtdIH07XHJcbiAgICAgICAgICAgIGNvbnN0IGludmVyc2VCaW5kTWF0cmljZXM6IE1hdHJpeFtdID0gW107XHJcblxyXG4gICAgICAgICAgICBjb25zdCBib25lSW5kZXhNYXA6IHsgW2luZGV4OiBudW1iZXJdOiBCb25lIH0gPSB7fTtcclxuICAgICAgICAgICAgbGV0IG1heEJvbmVJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNrZWxldG9uLmJvbmVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBib25lID0gc2tlbGV0b24uYm9uZXNbaV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBib25lSW5kZXggPSBib25lLmdldEluZGV4KCkgPz8gaTtcclxuICAgICAgICAgICAgICAgIGlmIChib25lSW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9uZUluZGV4TWFwW2JvbmVJbmRleF0gPSBib25lO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChib25lSW5kZXggPiBtYXhCb25lSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4Qm9uZUluZGV4ID0gYm9uZUluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgYm9uZUluZGV4ID0gMDsgYm9uZUluZGV4IDw9IG1heEJvbmVJbmRleDsgKytib25lSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJvbmUgPSBib25lSW5kZXhNYXBbYm9uZUluZGV4XTtcclxuICAgICAgICAgICAgICAgIGludmVyc2VCaW5kTWF0cmljZXMucHVzaChib25lLmdldEludmVydGVkQWJzb2x1dGVUcmFuc2Zvcm0oKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdHJhbnNmb3JtTm9kZSA9IGJvbmUuZ2V0VHJhbnNmb3JtTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zZm9ybU5vZGUgJiYgbm9kZU1hcFt0cmFuc2Zvcm1Ob2RlLnVuaXF1ZUlkXSAhPT0gbnVsbCAmJiBub2RlTWFwW3RyYW5zZm9ybU5vZGUudW5pcXVlSWRdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBza2luLmpvaW50cy5wdXNoKG5vZGVNYXBbdHJhbnNmb3JtTm9kZS51bmlxdWVJZF0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBUb29scy5XYXJuKFwiRXhwb3J0aW5nIGEgYm9uZSB3aXRob3V0IGEgbGlua2VkIHRyYW5zZm9ybSBub2RlIGlzIGN1cnJlbnRseSB1bnN1cHBvcnRlZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNraW4uam9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBidWZmZXIgdmlldyBmb3IgaW52ZXJzZSBiaW5kIG1hdHJpY2VzXHJcbiAgICAgICAgICAgICAgICBjb25zdCBieXRlU3RyaWRlID0gNjQ7IC8vIDQgeCA0IG1hdHJpeCBvZiAzMiBiaXQgZmxvYXRcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ5dGVMZW5ndGggPSBpbnZlcnNlQmluZE1hdHJpY2VzLmxlbmd0aCAqIGJ5dGVTdHJpZGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBidWZmZXJWaWV3T2Zmc2V0ID0gYmluYXJ5V3JpdGVyLmdldEJ5dGVPZmZzZXQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlclZpZXcgPSBfR0xURlV0aWxpdGllcy5fQ3JlYXRlQnVmZmVyVmlldygwLCBidWZmZXJWaWV3T2Zmc2V0LCBieXRlTGVuZ3RoLCB1bmRlZmluZWQsIFwiSW52ZXJzZUJpbmRNYXRyaWNlc1wiICsgXCIgLSBcIiArIHNrZWxldG9uLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyVmlld3MucHVzaChidWZmZXJWaWV3KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlclZpZXdJbmRleCA9IHRoaXMuX2J1ZmZlclZpZXdzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiaW5kTWF0cml4QWNjZXNzb3IgPSBfR0xURlV0aWxpdGllcy5fQ3JlYXRlQWNjZXNzb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyVmlld0luZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiSW52ZXJzZUJpbmRNYXRyaWNlc1wiICsgXCIgLSBcIiArIHNrZWxldG9uLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgQWNjZXNzb3JUeXBlLk1BVDQsXHJcbiAgICAgICAgICAgICAgICAgICAgQWNjZXNzb3JDb21wb25lbnRUeXBlLkZMT0FULFxyXG4gICAgICAgICAgICAgICAgICAgIGludmVyc2VCaW5kTWF0cmljZXMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBudWxsXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW52ZXJzZUJpbmRBY2Nlc3NvckluZGV4ID0gdGhpcy5fYWNjZXNzb3JzLnB1c2goYmluZE1hdHJpeEFjY2Vzc29yKSAtIDE7XHJcbiAgICAgICAgICAgICAgICBza2luLmludmVyc2VCaW5kTWF0cmljZXMgPSBpbnZlcnNlQmluZEFjY2Vzc29ySW5kZXg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9za2lucy5wdXNoKHNraW4pO1xyXG4gICAgICAgICAgICAgICAgc2tpbk1hcFtza2VsZXRvbi51bmlxdWVJZF0gPSB0aGlzLl9za2lucy5sZW5ndGggLSAxO1xyXG5cclxuICAgICAgICAgICAgICAgIGludmVyc2VCaW5kTWF0cmljZXMuZm9yRWFjaCgobWF0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Lm0uZm9yRWFjaCgoY2VsbDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlci5zZXRGbG9hdDMyKGNlbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2VDaGFpbi50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHNraW5NYXA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICpcclxuICogU3RvcmVzIGdsVEYgYmluYXJ5IGRhdGEuICBJZiB0aGUgYXJyYXkgYnVmZmVyIGJ5dGUgbGVuZ3RoIGlzIGV4Y2VlZGVkLCBpdCBkb3VibGVzIGluIHNpemUgZHluYW1pY2FsbHlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBfQmluYXJ5V3JpdGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogQXJyYXkgYnVmZmVyIHdoaWNoIHN0b3JlcyBhbGwgYmluYXJ5IGRhdGFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfYXJyYXlCdWZmZXI6IEFycmF5QnVmZmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBWaWV3IG9mIHRoZSBhcnJheSBidWZmZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZGF0YVZpZXc6IERhdGFWaWV3O1xyXG4gICAgLyoqXHJcbiAgICAgKiBieXRlIG9mZnNldCBvZiBkYXRhIGluIGFycmF5IGJ1ZmZlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9ieXRlT2Zmc2V0OiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemUgYmluYXJ5IHdyaXRlciB3aXRoIGFuIGluaXRpYWwgYnl0ZSBsZW5ndGhcclxuICAgICAqIEBwYXJhbSBieXRlTGVuZ3RoIEluaXRpYWwgYnl0ZSBsZW5ndGggb2YgdGhlIGFycmF5IGJ1ZmZlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihieXRlTGVuZ3RoOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9hcnJheUJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihieXRlTGVuZ3RoKTtcclxuICAgICAgICB0aGlzLl9kYXRhVmlldyA9IG5ldyBEYXRhVmlldyh0aGlzLl9hcnJheUJ1ZmZlcik7XHJcbiAgICAgICAgdGhpcy5fYnl0ZU9mZnNldCA9IDA7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJlc2l6ZSB0aGUgYXJyYXkgYnVmZmVyIHRvIHRoZSBzcGVjaWZpZWQgYnl0ZSBsZW5ndGhcclxuICAgICAqIEBwYXJhbSBieXRlTGVuZ3RoIFRoZSBuZXcgYnl0ZSBsZW5ndGhcclxuICAgICAqIEByZXR1cm5zIFRoZSByZXNpemVkIGFycmF5IGJ1ZmZlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9yZXNpemVCdWZmZXIoYnl0ZUxlbmd0aDogbnVtYmVyKTogQXJyYXlCdWZmZXIge1xyXG4gICAgICAgIGNvbnN0IG5ld0J1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihieXRlTGVuZ3RoKTtcclxuICAgICAgICBjb25zdCBjb3B5T2xkQnVmZmVyU2l6ZSA9IE1hdGgubWluKHRoaXMuX2FycmF5QnVmZmVyLmJ5dGVMZW5ndGgsIGJ5dGVMZW5ndGgpO1xyXG4gICAgICAgIGNvbnN0IG9sZFVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheSh0aGlzLl9hcnJheUJ1ZmZlciwgMCwgY29weU9sZEJ1ZmZlclNpemUpO1xyXG4gICAgICAgIGNvbnN0IG5ld1VpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheShuZXdCdWZmZXIpO1xyXG4gICAgICAgIG5ld1VpbnQ4QXJyYXkuc2V0KG9sZFVpbnQ4QXJyYXksIDApO1xyXG4gICAgICAgIHRoaXMuX2FycmF5QnVmZmVyID0gbmV3QnVmZmVyO1xyXG4gICAgICAgIHRoaXMuX2RhdGFWaWV3ID0gbmV3IERhdGFWaWV3KHRoaXMuX2FycmF5QnVmZmVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld0J1ZmZlcjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGFuIGFycmF5IGJ1ZmZlciB3aXRoIHRoZSBsZW5ndGggb2YgdGhlIGJ5dGUgb2Zmc2V0XHJcbiAgICAgKiBAcmV0dXJucyBBcnJheUJ1ZmZlciByZXNpemVkIHRvIHRoZSBieXRlIG9mZnNldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QXJyYXlCdWZmZXIoKTogQXJyYXlCdWZmZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNpemVCdWZmZXIodGhpcy5nZXRCeXRlT2Zmc2V0KCkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGJ5dGUgb2Zmc2V0IG9mIHRoZSBhcnJheSBidWZmZXJcclxuICAgICAqIEByZXR1cm5zIGJ5dGUgb2Zmc2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRCeXRlT2Zmc2V0KCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2J5dGVPZmZzZXQgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJ5dGUgb2Zmc2V0IGlzIHVuZGVmaW5lZCFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9ieXRlT2Zmc2V0O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yZXMgYW4gVUludDggaW4gdGhlIGFycmF5IGJ1ZmZlclxyXG4gICAgICogQHBhcmFtIGVudHJ5XHJcbiAgICAgKiBAcGFyYW0gYnl0ZU9mZnNldCBJZiBkZWZpbmVkLCBzcGVjaWZpZXMgd2hlcmUgdG8gc2V0IHRoZSB2YWx1ZSBhcyBhbiBvZmZzZXQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRVSW50OChlbnRyeTogbnVtYmVyLCBieXRlT2Zmc2V0PzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGJ5dGVPZmZzZXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoYnl0ZU9mZnNldCA8IHRoaXMuX2J5dGVPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFWaWV3LnNldFVpbnQ4KGJ5dGVPZmZzZXQsIGVudHJ5KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLkVycm9yKFwiQmluYXJ5V3JpdGVyOiBieXRlb2Zmc2V0IGlzIGdyZWF0ZXIgdGhhbiB0aGUgY3VycmVudCBiaW5hcnkgYnVmZmVyIGxlbmd0aCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYnl0ZU9mZnNldCArIDEgPiB0aGlzLl9hcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNpemVCdWZmZXIodGhpcy5fYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCAqIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFWaWV3LnNldFVpbnQ4KHRoaXMuX2J5dGVPZmZzZXQsIGVudHJ5KTtcclxuICAgICAgICAgICAgdGhpcy5fYnl0ZU9mZnNldCArPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlcyBhbiBVSW50MTYgaW4gdGhlIGFycmF5IGJ1ZmZlclxyXG4gICAgICogQHBhcmFtIGVudHJ5XHJcbiAgICAgKiBAcGFyYW0gYnl0ZU9mZnNldCBJZiBkZWZpbmVkLCBzcGVjaWZpZXMgd2hlcmUgdG8gc2V0IHRoZSB2YWx1ZSBhcyBhbiBvZmZzZXQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRVSW50MTYoZW50cnk6IG51bWJlciwgYnl0ZU9mZnNldD86IG51bWJlcikge1xyXG4gICAgICAgIGlmIChieXRlT2Zmc2V0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGJ5dGVPZmZzZXQgPCB0aGlzLl9ieXRlT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhVmlldy5zZXRVaW50MTYoYnl0ZU9mZnNldCwgZW50cnksIHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuRXJyb3IoXCJCaW5hcnlXcml0ZXI6IGJ5dGVvZmZzZXQgaXMgZ3JlYXRlciB0aGFuIHRoZSBjdXJyZW50IGJpbmFyeSBidWZmZXIgbGVuZ3RoIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9ieXRlT2Zmc2V0ICsgMiA+IHRoaXMuX2FycmF5QnVmZmVyLmJ5dGVMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZUJ1ZmZlcih0aGlzLl9hcnJheUJ1ZmZlci5ieXRlTGVuZ3RoICogMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fZGF0YVZpZXcuc2V0VWludDE2KHRoaXMuX2J5dGVPZmZzZXQsIGVudHJ5LCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fYnl0ZU9mZnNldCArPSAyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYW4gVUludDMyIGluIHRoZSBhcnJheSBidWZmZXJcclxuICAgICAqIEBwYXJhbSBieXRlT2Zmc2V0IElmIGRlZmluZWQsIHNwZWNpZmllcyB3aGVyZSB0byBzZXQgdGhlIHZhbHVlIGFzIGFuIG9mZnNldC5cclxuICAgICAqIEByZXR1cm5zIGVudHJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRVSW50MzIoYnl0ZU9mZnNldDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoYnl0ZU9mZnNldCA8IHRoaXMuX2J5dGVPZmZzZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFWaWV3LmdldFVpbnQzMihieXRlT2Zmc2V0LCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBUb29scy5FcnJvcihcIkJpbmFyeVdyaXRlcjogYnl0ZW9mZnNldCBpcyBncmVhdGVyIHRoYW4gdGhlIGN1cnJlbnQgYmluYXJ5IGJ1ZmZlciBsZW5ndGghXCIpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCaW5hcnlXcml0ZXI6IGJ5dGVvZmZzZXQgaXMgZ3JlYXRlciB0aGFuIHRoZSBjdXJyZW50IGJpbmFyeSBidWZmZXIgbGVuZ3RoIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFZlY3RvcjNGbG9hdDMyRnJvbVJlZih2ZWN0b3IzOiBWZWN0b3IzLCBieXRlT2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoYnl0ZU9mZnNldCArIDggPiB0aGlzLl9ieXRlT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIFRvb2xzLkVycm9yKGBCaW5hcnlXcml0ZXI6IGJ5dGVvZmZzZXQgaXMgZ3JlYXRlciB0aGFuIHRoZSBjdXJyZW50IGJpbmFyeSBidWZmZXIgbGVuZ3RoIWApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZlY3RvcjMueCA9IHRoaXMuX2RhdGFWaWV3LmdldEZsb2F0MzIoYnl0ZU9mZnNldCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHZlY3RvcjMueSA9IHRoaXMuX2RhdGFWaWV3LmdldEZsb2F0MzIoYnl0ZU9mZnNldCArIDQsIHRydWUpO1xyXG4gICAgICAgICAgICB2ZWN0b3IzLnogPSB0aGlzLl9kYXRhVmlldy5nZXRGbG9hdDMyKGJ5dGVPZmZzZXQgKyA4LCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFZlY3RvcjNGbG9hdDMyRnJvbVJlZih2ZWN0b3IzOiBWZWN0b3IzLCBieXRlT2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoYnl0ZU9mZnNldCArIDggPiB0aGlzLl9ieXRlT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIFRvb2xzLkVycm9yKGBCaW5hcnlXcml0ZXI6IGJ5dGVvZmZzZXQgaXMgZ3JlYXRlciB0aGFuIHRoZSBjdXJyZW50IGJpbmFyeSBidWZmZXIgbGVuZ3RoIWApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFWaWV3LnNldEZsb2F0MzIoYnl0ZU9mZnNldCwgdmVjdG9yMy54LCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YVZpZXcuc2V0RmxvYXQzMihieXRlT2Zmc2V0ICsgNCwgdmVjdG9yMy55LCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YVZpZXcuc2V0RmxvYXQzMihieXRlT2Zmc2V0ICsgOCwgdmVjdG9yMy56LCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFZlY3RvcjRGbG9hdDMyRnJvbVJlZih2ZWN0b3I0OiBWZWN0b3I0LCBieXRlT2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoYnl0ZU9mZnNldCArIDEyID4gdGhpcy5fYnl0ZU9mZnNldCkge1xyXG4gICAgICAgICAgICBUb29scy5FcnJvcihgQmluYXJ5V3JpdGVyOiBieXRlb2Zmc2V0IGlzIGdyZWF0ZXIgdGhhbiB0aGUgY3VycmVudCBiaW5hcnkgYnVmZmVyIGxlbmd0aCFgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2ZWN0b3I0LnggPSB0aGlzLl9kYXRhVmlldy5nZXRGbG9hdDMyKGJ5dGVPZmZzZXQsIHRydWUpO1xyXG4gICAgICAgICAgICB2ZWN0b3I0LnkgPSB0aGlzLl9kYXRhVmlldy5nZXRGbG9hdDMyKGJ5dGVPZmZzZXQgKyA0LCB0cnVlKTtcclxuICAgICAgICAgICAgdmVjdG9yNC56ID0gdGhpcy5fZGF0YVZpZXcuZ2V0RmxvYXQzMihieXRlT2Zmc2V0ICsgOCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHZlY3RvcjQudyA9IHRoaXMuX2RhdGFWaWV3LmdldEZsb2F0MzIoYnl0ZU9mZnNldCArIDEyLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFZlY3RvcjRGbG9hdDMyRnJvbVJlZih2ZWN0b3I0OiBWZWN0b3I0LCBieXRlT2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoYnl0ZU9mZnNldCArIDEyID4gdGhpcy5fYnl0ZU9mZnNldCkge1xyXG4gICAgICAgICAgICBUb29scy5FcnJvcihgQmluYXJ5V3JpdGVyOiBieXRlb2Zmc2V0IGlzIGdyZWF0ZXIgdGhhbiB0aGUgY3VycmVudCBiaW5hcnkgYnVmZmVyIGxlbmd0aCFgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhVmlldy5zZXRGbG9hdDMyKGJ5dGVPZmZzZXQsIHZlY3RvcjQueCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFWaWV3LnNldEZsb2F0MzIoYnl0ZU9mZnNldCArIDQsIHZlY3RvcjQueSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFWaWV3LnNldEZsb2F0MzIoYnl0ZU9mZnNldCArIDgsIHZlY3RvcjQueiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFWaWV3LnNldEZsb2F0MzIoYnl0ZU9mZnNldCArIDEyLCB2ZWN0b3I0LncsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGEgRmxvYXQzMiBpbiB0aGUgYXJyYXkgYnVmZmVyXHJcbiAgICAgKiBAcGFyYW0gZW50cnlcclxuICAgICAqIEBwYXJhbSBieXRlT2Zmc2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRGbG9hdDMyKGVudHJ5OiBudW1iZXIsIGJ5dGVPZmZzZXQ/OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoaXNOYU4oZW50cnkpKSB7XHJcbiAgICAgICAgICAgIFRvb2xzLkVycm9yKFwiSW52YWxpZCBkYXRhIGJlaW5nIHdyaXR0ZW4hXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYnl0ZU9mZnNldCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChieXRlT2Zmc2V0IDwgdGhpcy5fYnl0ZU9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YVZpZXcuc2V0RmxvYXQzMihieXRlT2Zmc2V0LCBlbnRyeSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5FcnJvcihcIkJpbmFyeVdyaXRlcjogYnl0ZW9mZnNldCBpcyBncmVhdGVyIHRoYW4gdGhlIGN1cnJlbnQgYmluYXJ5IGxlbmd0aCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2J5dGVPZmZzZXQgKyA0ID4gdGhpcy5fYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNpemVCdWZmZXIodGhpcy5fYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCAqIDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9kYXRhVmlldy5zZXRGbG9hdDMyKHRoaXMuX2J5dGVPZmZzZXQsIGVudHJ5LCB0cnVlKTtcclxuICAgICAgICB0aGlzLl9ieXRlT2Zmc2V0ICs9IDQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlcyBhbiBVSW50MzIgaW4gdGhlIGFycmF5IGJ1ZmZlclxyXG4gICAgICogQHBhcmFtIGVudHJ5XHJcbiAgICAgKiBAcGFyYW0gYnl0ZU9mZnNldCBJZiBkZWZpbmVkLCBzcGVjaWZpZXMgd2hlcmUgdG8gc2V0IHRoZSB2YWx1ZSBhcyBhbiBvZmZzZXQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRVSW50MzIoZW50cnk6IG51bWJlciwgYnl0ZU9mZnNldD86IG51bWJlcikge1xyXG4gICAgICAgIGlmIChieXRlT2Zmc2V0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGJ5dGVPZmZzZXQgPCB0aGlzLl9ieXRlT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhVmlldy5zZXRVaW50MzIoYnl0ZU9mZnNldCwgZW50cnksIHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuRXJyb3IoXCJCaW5hcnlXcml0ZXI6IGJ5dGVvZmZzZXQgaXMgZ3JlYXRlciB0aGFuIHRoZSBjdXJyZW50IGJpbmFyeSBidWZmZXIgbGVuZ3RoIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9ieXRlT2Zmc2V0ICsgNCA+IHRoaXMuX2FycmF5QnVmZmVyLmJ5dGVMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZUJ1ZmZlcih0aGlzLl9hcnJheUJ1ZmZlci5ieXRlTGVuZ3RoICogMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fZGF0YVZpZXcuc2V0VWludDMyKHRoaXMuX2J5dGVPZmZzZXQsIGVudHJ5LCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fYnl0ZU9mZnNldCArPSA0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGFuIEludDE2IGluIHRoZSBhcnJheSBidWZmZXJcclxuICAgICAqIEBwYXJhbSBlbnRyeVxyXG4gICAgICogQHBhcmFtIGJ5dGVPZmZzZXQgSWYgZGVmaW5lZCwgc3BlY2lmaWVzIHdoZXJlIHRvIHNldCB0aGUgdmFsdWUgYXMgYW4gb2Zmc2V0LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0SW50MTYoZW50cnk6IG51bWJlciwgYnl0ZU9mZnNldD86IG51bWJlcikge1xyXG4gICAgICAgIGlmIChieXRlT2Zmc2V0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGJ5dGVPZmZzZXQgPCB0aGlzLl9ieXRlT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhVmlldy5zZXRJbnQxNihieXRlT2Zmc2V0LCBlbnRyeSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5FcnJvcihcIkJpbmFyeVdyaXRlcjogYnl0ZW9mZnNldCBpcyBncmVhdGVyIHRoYW4gdGhlIGN1cnJlbnQgYmluYXJ5IGJ1ZmZlciBsZW5ndGghXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2J5dGVPZmZzZXQgKyAyID4gdGhpcy5fYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzaXplQnVmZmVyKHRoaXMuX2FycmF5QnVmZmVyLmJ5dGVMZW5ndGggKiAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9kYXRhVmlldy5zZXRJbnQxNih0aGlzLl9ieXRlT2Zmc2V0LCBlbnRyeSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2J5dGVPZmZzZXQgKz0gMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlcyBhIGJ5dGUgaW4gdGhlIGFycmF5IGJ1ZmZlclxyXG4gICAgICogQHBhcmFtIGVudHJ5XHJcbiAgICAgKiBAcGFyYW0gYnl0ZU9mZnNldCBJZiBkZWZpbmVkLCBzcGVjaWZpZXMgd2hlcmUgdG8gc2V0IHRoZSB2YWx1ZSBhcyBhbiBvZmZzZXQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRCeXRlKGVudHJ5OiBudW1iZXIsIGJ5dGVPZmZzZXQ/OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoYnl0ZU9mZnNldCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChieXRlT2Zmc2V0IDwgdGhpcy5fYnl0ZU9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YVZpZXcuc2V0SW50OChieXRlT2Zmc2V0LCBlbnRyeSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5FcnJvcihcIkJpbmFyeVdyaXRlcjogYnl0ZW9mZnNldCBpcyBncmVhdGVyIHRoYW4gdGhlIGN1cnJlbnQgYmluYXJ5IGJ1ZmZlciBsZW5ndGghXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2J5dGVPZmZzZXQgKyAxID4gdGhpcy5fYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzaXplQnVmZmVyKHRoaXMuX2FycmF5QnVmZmVyLmJ5dGVMZW5ndGggKiAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9kYXRhVmlldy5zZXRJbnQ4KHRoaXMuX2J5dGVPZmZzZXQsIGVudHJ5KTtcclxuICAgICAgICAgICAgdGhpcy5fYnl0ZU9mZnNldCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgdHlwZSB7IEltYWdlTWltZVR5cGUsIElNZXNoUHJpbWl0aXZlLCBJTm9kZSwgSU1hdGVyaWFsLCBJVGV4dHVyZUluZm8gfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB0eXBlIHsgTm9kZSB9IGZyb20gXCJjb3JlL25vZGVcIjtcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcblxyXG5pbXBvcnQgdHlwZSB7IFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFN1Yk1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvc3ViTWVzaFwiO1xyXG5pbXBvcnQgdHlwZSB7IElEaXNwb3NhYmxlIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgX0JpbmFyeVdyaXRlciB9IGZyb20gXCIuL2dsVEZFeHBvcnRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGRXhwb3J0ZXJFeHRlbnNpb24gfSBmcm9tIFwiLi4vZ2xURkZpbGVFeHBvcnRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgQmFzZVRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvYmFzZVRleHR1cmVcIjtcclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXZhciwgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCB2YXIgX19JR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIgPSAwOyAvLyBJIGFtIGhlcmUgdG8gYWxsb3cgZHRzIHRvIGJlIGNyZWF0ZWRcclxuXHJcbi8qKlxyXG4gKiBJbnRlcmZhY2UgZm9yIGEgZ2xURiBleHBvcnRlciBleHRlbnNpb25cclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiBleHRlbmRzIElHTFRGRXhwb3J0ZXJFeHRlbnNpb24sIElEaXNwb3NhYmxlIHtcclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lIHRoaXMgbWV0aG9kIHRvIG1vZGlmeSB0aGUgZGVmYXVsdCBiZWhhdmlvciBiZWZvcmUgZXhwb3J0aW5nIGEgdGV4dHVyZVxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgVGhlIGNvbnRleHQgd2hlbiBsb2FkaW5nIHRoZSBhc3NldFxyXG4gICAgICogQHBhcmFtIGJhYnlsb25UZXh0dXJlIFRoZSBCYWJ5bG9uLmpzIHRleHR1cmVcclxuICAgICAqIEBwYXJhbSBtaW1lVHlwZSBUaGUgbWltZS10eXBlIG9mIHRoZSBnZW5lcmF0ZWQgaW1hZ2VcclxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGV4cG9ydGVkIHRleHR1cmVcclxuICAgICAqL1xyXG4gICAgcHJlRXhwb3J0VGV4dHVyZUFzeW5jPyhjb250ZXh0OiBzdHJpbmcsIGJhYnlsb25UZXh0dXJlOiBOdWxsYWJsZTxUZXh0dXJlPiwgbWltZVR5cGU6IEltYWdlTWltZVR5cGUpOiBQcm9taXNlPE51bGxhYmxlPFRleHR1cmU+PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZSB0aGlzIG1ldGhvZCB0byBnZXQgbm90aWZpZWQgd2hlbiBhIHRleHR1cmUgaW5mbyBpcyBjcmVhdGVkXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBUaGUgY29udGV4dCB3aGVuIGxvYWRpbmcgdGhlIGFzc2V0XHJcbiAgICAgKiBAcGFyYW0gdGV4dHVyZUluZm8gVGhlIGdsVEYgdGV4dHVyZSBpbmZvXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvblRleHR1cmUgVGhlIEJhYnlsb24uanMgdGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBwb3N0RXhwb3J0VGV4dHVyZT8oY29udGV4dDogc3RyaW5nLCB0ZXh0dXJlSW5mbzogSVRleHR1cmVJbmZvLCBiYWJ5bG9uVGV4dHVyZTogQmFzZVRleHR1cmUpOiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lIHRoaXMgbWV0aG9kIHRvIG1vZGlmeSB0aGUgZGVmYXVsdCBiZWhhdmlvciB3aGVuIGV4cG9ydGluZyB0ZXh0dXJlIGluZm9cclxuICAgICAqIEBwYXJhbSBjb250ZXh0IFRoZSBjb250ZXh0IHdoZW4gbG9hZGluZyB0aGUgYXNzZXRcclxuICAgICAqIEBwYXJhbSBtZXNoUHJpbWl0aXZlIGdsVEYgbWVzaCBwcmltaXRpdmVcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uU3ViTWVzaCBCYWJ5bG9uIHN1Ym1lc2hcclxuICAgICAqIEBwYXJhbSBiaW5hcnlXcml0ZXIgZ2xURiBzZXJpYWxpemVyIGJpbmFyeSB3cml0ZXIgaW5zdGFuY2VcclxuICAgICAqIEByZXR1cm5zIG51bGxhYmxlIElNZXNoUHJpbWl0aXZlIHByb21pc2VcclxuICAgICAqL1xyXG4gICAgcG9zdEV4cG9ydE1lc2hQcmltaXRpdmVBc3luYz8oY29udGV4dDogc3RyaW5nLCBtZXNoUHJpbWl0aXZlOiBOdWxsYWJsZTxJTWVzaFByaW1pdGl2ZT4sIGJhYnlsb25TdWJNZXNoOiBTdWJNZXNoLCBiaW5hcnlXcml0ZXI6IF9CaW5hcnlXcml0ZXIpOiBQcm9taXNlPElNZXNoUHJpbWl0aXZlPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZSB0aGlzIG1ldGhvZCB0byBtb2RpZnkgdGhlIGRlZmF1bHQgYmVoYXZpb3Igd2hlbiBleHBvcnRpbmcgYSBub2RlXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBUaGUgY29udGV4dCB3aGVuIGV4cG9ydGluZyB0aGUgbm9kZVxyXG4gICAgICogQHBhcmFtIG5vZGUgZ2xURiBub2RlXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvbk5vZGUgQmFieWxvbkpTIG5vZGVcclxuICAgICAqIEByZXR1cm5zIG51bGxhYmxlIElOb2RlIHByb21pc2VcclxuICAgICAqL1xyXG4gICAgcG9zdEV4cG9ydE5vZGVBc3luYz8oY29udGV4dDogc3RyaW5nLCBub2RlOiBOdWxsYWJsZTxJTm9kZT4sIGJhYnlsb25Ob2RlOiBOb2RlLCBub2RlTWFwOiB7IFtrZXk6IG51bWJlcl06IG51bWJlciB9LCBiaW5hcnlXcml0ZXI6IF9CaW5hcnlXcml0ZXIpOiBQcm9taXNlPE51bGxhYmxlPElOb2RlPj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmUgdGhpcyBtZXRob2QgdG8gbW9kaWZ5IHRoZSBkZWZhdWx0IGJlaGF2aW9yIHdoZW4gZXhwb3J0aW5nIGEgbWF0ZXJpYWxcclxuICAgICAqIEBwYXJhbSBtYXRlcmlhbCBnbFRGIG1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvbk1hdGVyaWFsIEJhYnlsb25KUyBtYXRlcmlhbFxyXG4gICAgICogQHJldHVybnMgbnVsbGFibGUgSU1hdGVyaWFsIHByb21pc2VcclxuICAgICAqL1xyXG4gICAgcG9zdEV4cG9ydE1hdGVyaWFsQXN5bmM/KGNvbnRleHQ6IHN0cmluZywgbm9kZTogTnVsbGFibGU8SU1hdGVyaWFsPiwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IFByb21pc2U8SU1hdGVyaWFsPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZSB0aGlzIG1ldGhvZCB0byByZXR1cm4gYWRkaXRpb25hbCB0ZXh0dXJlcyB0byBleHBvcnQgZnJvbSBhIG1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gbWF0ZXJpYWwgZ2xURiBtYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIGJhYnlsb25NYXRlcmlhbCBCYWJ5bG9uSlMgbWF0ZXJpYWxcclxuICAgICAqIEByZXR1cm5zIExpc3Qgb2YgdGV4dHVyZXNcclxuICAgICAqL1xyXG4gICAgcG9zdEV4cG9ydE1hdGVyaWFsQWRkaXRpb25hbFRleHR1cmVzPyhjb250ZXh0OiBzdHJpbmcsIG5vZGU6IElNYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IEJhc2VUZXh0dXJlW107XHJcblxyXG4gICAgLyoqIEdldHMgYSBib29sZWFuIGluZGljYXRpbmcgdGhhdCB0aGlzIGV4dGVuc2lvbiB3YXMgdXNlZCAqL1xyXG4gICAgd2FzVXNlZDogYm9vbGVhbjtcclxuXHJcbiAgICAvKiogR2V0cyBhIGJvb2xlYW4gaW5kaWNhdGluZyB0aGF0IHRoaXMgZXh0ZW5zaW9uIGlzIHJlcXVpcmVkIGZvciB0aGUgZmlsZSB0byB3b3JrICovXHJcbiAgICByZXF1aXJlZDogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCBhZnRlciB0aGUgZXhwb3J0ZXIgc3RhdGUgY2hhbmdlcyB0byBFWFBPUlRJTkdcclxuICAgICAqL1xyXG4gICAgb25FeHBvcnRpbmc/KCk6IHZvaWQ7XHJcbn1cclxuIiwiaW1wb3J0IHR5cGUgeyBJVGV4dHVyZUluZm8sIElNYXRlcmlhbCwgSU1hdGVyaWFsUGJyTWV0YWxsaWNSb3VnaG5lc3MsIElNYXRlcmlhbE9jY2x1c2lvblRleHR1cmVJbmZvLCBJU2FtcGxlciwgSU1hdGVyaWFsRXh0ZW5zaW9uIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJbWFnZU1pbWVUeXBlLCBNYXRlcmlhbEFscGhhTW9kZSwgVGV4dHVyZU1hZ0ZpbHRlciwgVGV4dHVyZU1pbkZpbHRlciwgVGV4dHVyZVdyYXBNb2RlIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB7IFZlY3RvcjIgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLnZlY3RvclwiO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcbmltcG9ydCB7IFNjYWxhciB9IGZyb20gXCJjb3JlL01hdGhzL21hdGguc2NhbGFyXCI7XHJcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcImNvcmUvTWlzYy90b29sc1wiO1xyXG5pbXBvcnQgeyBUZXh0dXJlVG9vbHMgfSBmcm9tIFwiY29yZS9NaXNjL3RleHR1cmVUb29sc1wiO1xyXG5pbXBvcnQgdHlwZSB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2Jhc2VUZXh0dXJlXCI7XHJcbmltcG9ydCB7IFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBSYXdUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3Jhd1RleHR1cmVcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBfRXhwb3J0ZXIgfSBmcm9tIFwiLi9nbFRGRXhwb3J0ZXJcIjtcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcImNvcmUvRW5naW5lcy9jb25zdGFudHNcIjtcclxuaW1wb3J0IHsgRHVtcFRvb2xzIH0gZnJvbSBcImNvcmUvTWlzYy9kdW1wVG9vbHNcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBTdGFuZGFyZE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL3N0YW5kYXJkTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBQQlJCYXNlTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvUEJSL3BickJhc2VNYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IFBCUk1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJNYXRlcmlhbFwiO1xyXG5cclxuLyoqXHJcbiAqIEludGVyZmFjZSBmb3Igc3RvcmluZyBzcGVjdWxhciBnbG9zc2luZXNzIGZhY3RvcnNcclxuICogQGludGVybmFsXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmludGVyZmFjZSBfSVBCUlNwZWN1bGFyR2xvc3NpbmVzcyB7XHJcbiAgICAvKipcclxuICAgICAqIFJlcHJlc2VudHMgdGhlIGxpbmVhciBkaWZmdXNlIGZhY3RvcnMgb2YgdGhlIG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIGRpZmZ1c2VDb2xvcjogQ29sb3IzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXByZXNlbnRzIHRoZSBsaW5lYXIgc3BlY3VsYXIgZmFjdG9ycyBvZiB0aGUgbWF0ZXJpYWxcclxuICAgICAqL1xyXG4gICAgc3BlY3VsYXJDb2xvcjogQ29sb3IzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXByZXNlbnRzIHRoZSBzbW9vdGhuZXNzIG9mIHRoZSBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBnbG9zc2luZXNzOiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbnRlcmZhY2UgZm9yIHN0b3JpbmcgbWV0YWxsaWMgcm91Z2huZXNzIGZhY3RvcnNcclxuICogQGludGVybmFsXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmludGVyZmFjZSBfSVBCUk1ldGFsbGljUm91Z2huZXNzIHtcclxuICAgIC8qKlxyXG4gICAgICogUmVwcmVzZW50cyB0aGUgYWxiZWRvIGNvbG9yIG9mIHRoZSBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBiYXNlQ29sb3I6IENvbG9yMztcclxuICAgIC8qKlxyXG4gICAgICogUmVwcmVzZW50cyB0aGUgbWV0YWxuZXNzIG9mIHRoZSBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBtZXRhbGxpYzogTnVsbGFibGU8bnVtYmVyPjtcclxuICAgIC8qKlxyXG4gICAgICogUmVwcmVzZW50cyB0aGUgcm91Z2huZXNzIG9mIHRoZSBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICByb3VnaG5lc3M6IE51bGxhYmxlPG51bWJlcj47XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBtZXRhbGxpYyByb3VnaG5lc3MgdGV4dHVyZSBkYXRhXHJcbiAgICAgKi9cclxuICAgIG1ldGFsbGljUm91Z2huZXNzVGV4dHVyZURhdGE/OiBOdWxsYWJsZTxBcnJheUJ1ZmZlcj47XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBiYXNlIGNvbG9yIHRleHR1cmUgZGF0YVxyXG4gICAgICovXHJcbiAgICBiYXNlQ29sb3JUZXh0dXJlRGF0YT86IE51bGxhYmxlPEFycmF5QnVmZmVyPjtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RmlsZUV4dGVuc2lvbkZyb21NaW1lVHlwZShtaW1lVHlwZTogSW1hZ2VNaW1lVHlwZSk6IHN0cmluZyB7XHJcbiAgICBzd2l0Y2ggKG1pbWVUeXBlKSB7XHJcbiAgICAgICAgY2FzZSBJbWFnZU1pbWVUeXBlLkpQRUc6XHJcbiAgICAgICAgICAgIHJldHVybiBcIi5qcGdcIjtcclxuICAgICAgICBjYXNlIEltYWdlTWltZVR5cGUuUE5HOlxyXG4gICAgICAgICAgICByZXR1cm4gXCIucG5nXCI7XHJcbiAgICAgICAgY2FzZSBJbWFnZU1pbWVUeXBlLldFQlA6XHJcbiAgICAgICAgICAgIHJldHVybiBcIi53ZWJwXCI7XHJcbiAgICAgICAgY2FzZSBJbWFnZU1pbWVUeXBlLkFWSUY6XHJcbiAgICAgICAgICAgIHJldHVybiBcIi5hdmlmXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVdGlsaXR5IG1ldGhvZHMgZm9yIHdvcmtpbmcgd2l0aCBnbFRGIG1hdGVyaWFsIGNvbnZlcnNpb24gcHJvcGVydGllcy4gIFRoaXMgY2xhc3Mgc2hvdWxkIG9ubHkgYmUgdXNlZCBpbnRlcm5hbGx5XHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIF9HTFRGTWF0ZXJpYWxFeHBvcnRlciB7XHJcbiAgICAvKipcclxuICAgICAqIFJlcHJlc2VudHMgdGhlIGRpZWxlY3RyaWMgc3BlY3VsYXIgdmFsdWVzIGZvciBSLCBHIGFuZCBCXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9EaWVsZWN0cmljU3BlY3VsYXI6IENvbG9yMyA9IG5ldyBDb2xvcjMoMC4wNCwgMC4wNCwgMC4wNCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbGxvd3MgdGhlIG1heGltdW0gc3BlY3VsYXIgcG93ZXIgdG8gYmUgZGVmaW5lZCBmb3IgbWF0ZXJpYWwgY2FsY3VsYXRpb25zXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9NYXhTcGVjdWxhclBvd2VyID0gMTAyNDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcHBpbmcgdG8gc3RvcmUgdGV4dHVyZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfdGV4dHVyZU1hcDogeyBbdGV4dHVyZUlkOiBzdHJpbmddOiBJVGV4dHVyZUluZm8gfSA9IHt9O1xyXG5cclxuICAgIC8vIE1hcHBpbmcgb2YgaW50ZXJuYWwgdGV4dHVyZXMgdG8gaW1hZ2VzIHRvIGF2b2lkIGV4cG9ydGluZyBkdXBsaWNhdGUgaW1hZ2VzLlxyXG4gICAgcHJpdmF0ZSBfaW50ZXJuYWxUZXh0dXJlVG9JbWFnZTogeyBbdW5pcXVlSWQ6IG51bWJlcl06IHsgW21pbWVUeXBlOiBzdHJpbmddOiBQcm9taXNlPG51bWJlcj4gfSB9ID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOdW1lcmljIHRvbGVyYW5jZSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfRXBzaWxvbiA9IDFlLTY7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZlcmVuY2UgdG8gdGhlIGdsVEYgRXhwb3J0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZXhwb3J0ZXI6IF9FeHBvcnRlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihleHBvcnRlcjogX0V4cG9ydGVyKSB7XHJcbiAgICAgICAgdGhpcy5fdGV4dHVyZU1hcCA9IHt9O1xyXG4gICAgICAgIHRoaXMuX2V4cG9ydGVyID0gZXhwb3J0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZpZXMgaWYgdHdvIGNvbG9ycyBhcmUgYXBwcm94aW1hdGVseSBlcXVhbCBpbiB2YWx1ZVxyXG4gICAgICogQHBhcmFtIGNvbG9yMSBmaXJzdCBjb2xvciB0byBjb21wYXJlIHRvXHJcbiAgICAgKiBAcGFyYW0gY29sb3IyIHNlY29uZCBjb2xvciB0byBjb21wYXJlIHRvXHJcbiAgICAgKiBAcGFyYW0gZXBzaWxvbiB0aHJlc2hvbGQgdmFsdWVcclxuICAgICAqIEByZXR1cm5zIGJvb2xlYW4gc3BlY2lmeWluZyBpZiB0aGUgY29sb3JzIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWFsIGluIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9GdXp6eUVxdWFscyhjb2xvcjE6IENvbG9yMywgY29sb3IyOiBDb2xvcjMsIGVwc2lsb246IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBTY2FsYXIuV2l0aGluRXBzaWxvbihjb2xvcjEuciwgY29sb3IyLnIsIGVwc2lsb24pICYmIFNjYWxhci5XaXRoaW5FcHNpbG9uKGNvbG9yMS5nLCBjb2xvcjIuZywgZXBzaWxvbikgJiYgU2NhbGFyLldpdGhpbkVwc2lsb24oY29sb3IxLmIsIGNvbG9yMi5iLCBlcHNpbG9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1hdGVyaWFscyBmcm9tIGEgQmFieWxvbiBzY2VuZSBhbmQgY29udmVydHMgdGhlbSB0byBnbFRGIG1hdGVyaWFsc1xyXG4gICAgICogQHBhcmFtIGV4cG9ydE1hdGVyaWFsc1xyXG4gICAgICogQHBhcmFtIG1pbWVUeXBlIHRleHR1cmUgbWltZSB0eXBlXHJcbiAgICAgKiBAcGFyYW0gaGFzVGV4dHVyZUNvb3JkcyBzcGVjaWZpZXMgaWYgdGV4dHVyZSBjb29yZGluYXRlcyBhcmUgcHJlc2VudCBvbiB0aGUgbWF0ZXJpYWxcclxuICAgICAqIEByZXR1cm5zIHByb21pc2UgdGhhdCByZXNvbHZlcyBhZnRlciBhbGwgbWF0ZXJpYWxzIGhhdmUgYmVlbiBjb252ZXJ0ZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9jb252ZXJ0TWF0ZXJpYWxzVG9HTFRGQXN5bmMoZXhwb3J0TWF0ZXJpYWxzOiBTZXQ8TWF0ZXJpYWw+LCBtaW1lVHlwZTogSW1hZ2VNaW1lVHlwZSwgaGFzVGV4dHVyZUNvb3JkczogYm9vbGVhbikge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2VzOiBQcm9taXNlPElNYXRlcmlhbD5bXSA9IFtdO1xyXG4gICAgICAgIGV4cG9ydE1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobWF0ZXJpYWwuZ2V0Q2xhc3NOYW1lKCkgPT09IFwiU3RhbmRhcmRNYXRlcmlhbFwiKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMuX2NvbnZlcnRTdGFuZGFyZE1hdGVyaWFsQXN5bmMobWF0ZXJpYWwgYXMgU3RhbmRhcmRNYXRlcmlhbCwgbWltZVR5cGUsIGhhc1RleHR1cmVDb29yZHMpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbC5nZXRDbGFzc05hbWUoKS5pbmRleE9mKFwiUEJSXCIpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLl9jb252ZXJ0UEJSTWF0ZXJpYWxBc3luYyhtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCwgbWltZVR5cGUsIGhhc1RleHR1cmVDb29yZHMpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLldhcm4oYFVuc3VwcG9ydGVkIG1hdGVyaWFsIHR5cGU6ICR7bWF0ZXJpYWwubmFtZX1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAvKiBkbyBub3RoaW5nICovXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYWtlcyBhIGNvcHkgb2YgdGhlIGdsVEYgbWF0ZXJpYWwgd2l0aG91dCB0aGUgdGV4dHVyZSBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0gb3JpZ2luYWxNYXRlcmlhbCBvcmlnaW5hbCBnbFRGIG1hdGVyaWFsXHJcbiAgICAgKiBAcmV0dXJucyBnbFRGIG1hdGVyaWFsIHdpdGhvdXQgdGV4dHVyZSBwYXJhbWV0ZXJzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfc3RyaXBUZXh0dXJlc0Zyb21NYXRlcmlhbChvcmlnaW5hbE1hdGVyaWFsOiBJTWF0ZXJpYWwpOiBJTWF0ZXJpYWwge1xyXG4gICAgICAgIGNvbnN0IG5ld01hdGVyaWFsOiBJTWF0ZXJpYWwgPSB7fTtcclxuICAgICAgICBpZiAob3JpZ2luYWxNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICBuZXdNYXRlcmlhbC5uYW1lID0gb3JpZ2luYWxNYXRlcmlhbC5uYW1lO1xyXG4gICAgICAgICAgICBuZXdNYXRlcmlhbC5kb3VibGVTaWRlZCA9IG9yaWdpbmFsTWF0ZXJpYWwuZG91YmxlU2lkZWQ7XHJcbiAgICAgICAgICAgIG5ld01hdGVyaWFsLmFscGhhTW9kZSA9IG9yaWdpbmFsTWF0ZXJpYWwuYWxwaGFNb2RlO1xyXG4gICAgICAgICAgICBuZXdNYXRlcmlhbC5hbHBoYUN1dG9mZiA9IG9yaWdpbmFsTWF0ZXJpYWwuYWxwaGFDdXRvZmY7XHJcbiAgICAgICAgICAgIG5ld01hdGVyaWFsLmVtaXNzaXZlRmFjdG9yID0gb3JpZ2luYWxNYXRlcmlhbC5lbWlzc2l2ZUZhY3RvcjtcclxuICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxQQlJNZXRhbGxpY1JvdWdobmVzcyA9IG9yaWdpbmFsTWF0ZXJpYWwucGJyTWV0YWxsaWNSb3VnaG5lc3M7XHJcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbFBCUk1ldGFsbGljUm91Z2huZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdNYXRlcmlhbC5wYnJNZXRhbGxpY1JvdWdobmVzcyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbmV3TWF0ZXJpYWwucGJyTWV0YWxsaWNSb3VnaG5lc3MuYmFzZUNvbG9yRmFjdG9yID0gb3JpZ2luYWxQQlJNZXRhbGxpY1JvdWdobmVzcy5iYXNlQ29sb3JGYWN0b3I7XHJcbiAgICAgICAgICAgICAgICBuZXdNYXRlcmlhbC5wYnJNZXRhbGxpY1JvdWdobmVzcy5tZXRhbGxpY0ZhY3RvciA9IG9yaWdpbmFsUEJSTWV0YWxsaWNSb3VnaG5lc3MubWV0YWxsaWNGYWN0b3I7XHJcbiAgICAgICAgICAgICAgICBuZXdNYXRlcmlhbC5wYnJNZXRhbGxpY1JvdWdobmVzcy5yb3VnaG5lc3NGYWN0b3IgPSBvcmlnaW5hbFBCUk1ldGFsbGljUm91Z2huZXNzLnJvdWdobmVzc0ZhY3RvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3TWF0ZXJpYWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZpZXMgaWYgdGhlIG1hdGVyaWFsIGhhcyBhbnkgdGV4dHVyZSBwYXJhbWV0ZXJzIHByZXNlbnRcclxuICAgICAqIEBwYXJhbSBtYXRlcmlhbCBnbFRGIE1hdGVyaWFsXHJcbiAgICAgKiBAcmV0dXJucyBib29sZWFuIHNwZWNpZnlpbmcgaWYgdGV4dHVyZSBwYXJhbWV0ZXJzIGFyZSBwcmVzZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfaGFzVGV4dHVyZXNQcmVzZW50KG1hdGVyaWFsOiBJTWF0ZXJpYWwpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAobWF0ZXJpYWwuZW1pc3NpdmVUZXh0dXJlIHx8IG1hdGVyaWFsLm5vcm1hbFRleHR1cmUgfHwgbWF0ZXJpYWwub2NjbHVzaW9uVGV4dHVyZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGJyTWF0ID0gbWF0ZXJpYWwucGJyTWV0YWxsaWNSb3VnaG5lc3M7XHJcbiAgICAgICAgaWYgKHBick1hdCkge1xyXG4gICAgICAgICAgICBpZiAocGJyTWF0LmJhc2VDb2xvclRleHR1cmUgfHwgcGJyTWF0Lm1ldGFsbGljUm91Z2huZXNzVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtYXRlcmlhbC5leHRlbnNpb25zKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZXh0ZW5zaW9uIGluIG1hdGVyaWFsLmV4dGVuc2lvbnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbk9iamVjdCA9IG1hdGVyaWFsLmV4dGVuc2lvbnNbZXh0ZW5zaW9uXTtcclxuICAgICAgICAgICAgICAgIGlmIChleHRlbnNpb25PYmplY3QgYXMgSU1hdGVyaWFsRXh0ZW5zaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4dGVuc2lvbk9iamVjdC5oYXNUZXh0dXJlcz8uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgX2dldFRleHR1cmVJbmZvKGJhYnlsb25UZXh0dXJlOiBOdWxsYWJsZTxCYXNlVGV4dHVyZT4pOiBOdWxsYWJsZTxJVGV4dHVyZUluZm8+IHtcclxuICAgICAgICBpZiAoYmFieWxvblRleHR1cmUpIHtcclxuICAgICAgICAgICAgY29uc3QgdGV4dHVyZVVpZCA9IGJhYnlsb25UZXh0dXJlLnVpZDtcclxuICAgICAgICAgICAgaWYgKHRleHR1cmVVaWQgaW4gdGhpcy5fdGV4dHVyZU1hcCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RleHR1cmVNYXBbdGV4dHVyZVVpZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIEJhYnlsb24gU3RhbmRhcmRNYXRlcmlhbCB0byBhIGdsVEYgTWV0YWxsaWMgUm91Z2huZXNzIE1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvblN0YW5kYXJkTWF0ZXJpYWxcclxuICAgICAqIEByZXR1cm5zIGdsVEYgTWV0YWxsaWMgUm91Z2huZXNzIE1hdGVyaWFsIHJlcHJlc2VudGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfY29udmVydFRvR0xURlBCUk1ldGFsbGljUm91Z2huZXNzKGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsOiBTdGFuZGFyZE1hdGVyaWFsKTogSU1hdGVyaWFsUGJyTWV0YWxsaWNSb3VnaG5lc3Mge1xyXG4gICAgICAgIC8vIERlZmluZXMgYSBjdWJpYyBiZXppZXIgY3VydmUgd2hlcmUgeCBpcyBzcGVjdWxhciBwb3dlciBhbmQgeSBpcyByb3VnaG5lc3NcclxuICAgICAgICBjb25zdCBQMCA9IG5ldyBWZWN0b3IyKDAsIDEpO1xyXG4gICAgICAgIGNvbnN0IFAxID0gbmV3IFZlY3RvcjIoMCwgMC4xKTtcclxuICAgICAgICBjb25zdCBQMiA9IG5ldyBWZWN0b3IyKDAsIDAuMSk7XHJcbiAgICAgICAgY29uc3QgUDMgPSBuZXcgVmVjdG9yMigxMzAwLCAwLjEpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHaXZlbiB0aGUgY29udHJvbCBwb2ludHMsIHNvbHZlIGZvciB4IGJhc2VkIG9uIGEgZ2l2ZW4gdCBmb3IgYSBjdWJpYyBiZXppZXIgY3VydmVcclxuICAgICAgICAgKiBAcGFyYW0gdCBhIHZhbHVlIGJldHdlZW4gMCBhbmQgMVxyXG4gICAgICAgICAqIEBwYXJhbSBwMCBmaXJzdCBjb250cm9sIHBvaW50XHJcbiAgICAgICAgICogQHBhcmFtIHAxIHNlY29uZCBjb250cm9sIHBvaW50XHJcbiAgICAgICAgICogQHBhcmFtIHAyIHRoaXJkIGNvbnRyb2wgcG9pbnRcclxuICAgICAgICAgKiBAcGFyYW0gcDMgZm91cnRoIGNvbnRyb2wgcG9pbnRcclxuICAgICAgICAgKiBAcmV0dXJucyBudW1iZXIgcmVzdWx0IG9mIGN1YmljIGJlemllciBjdXJ2ZSBhdCB0aGUgc3BlY2lmaWVkIHRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBjdWJpY0JlemllckN1cnZlKHQ6IG51bWJlciwgcDA6IG51bWJlciwgcDE6IG51bWJlciwgcDI6IG51bWJlciwgcDM6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiAoMSAtIHQpICogKDEgLSB0KSAqICgxIC0gdCkgKiBwMCArIDMgKiAoMSAtIHQpICogKDEgLSB0KSAqIHQgKiBwMSArIDMgKiAoMSAtIHQpICogdCAqIHQgKiBwMiArIHQgKiB0ICogdCAqIHAzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRXZhbHVhdGVzIGEgc3BlY2lmaWVkIHNwZWN1bGFyIHBvd2VyIHZhbHVlIHRvIGRldGVybWluZSB0aGUgYXBwcm9wcmlhdGUgcm91Z2huZXNzIHZhbHVlLFxyXG4gICAgICAgICAqIGJhc2VkIG9uIGEgcHJlLWRlZmluZWQgY3ViaWMgYmV6aWVyIGN1cnZlIHdpdGggc3BlY3VsYXIgb24gdGhlIGFic2Npc3NhIGF4aXMgKHgtYXhpcylcclxuICAgICAgICAgKiBhbmQgcm91Z2huZXNzIG9uIHRoZSBvcmRpbmFudCBheGlzICh5LWF4aXMpXHJcbiAgICAgICAgICogQHBhcmFtIHNwZWN1bGFyUG93ZXIgc3BlY3VsYXIgcG93ZXIgb2Ygc3RhbmRhcmQgbWF0ZXJpYWxcclxuICAgICAgICAgKiBAcmV0dXJucyBOdW1iZXIgcmVwcmVzZW50aW5nIHRoZSByb3VnaG5lc3MgdmFsdWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBzb2x2ZUZvclJvdWdobmVzcyhzcGVjdWxhclBvd2VyOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgICAgICAvLyBHaXZlbiBQMC54ID0gMCwgUDEueCA9IDAsIFAyLnggPSAwXHJcbiAgICAgICAgICAgIC8vICAgeCA9IHQgKiB0ICogdCAqIFAzLnhcclxuICAgICAgICAgICAgLy8gICB0ID0gKHggLyBQMy54KV4oMS8zKVxyXG4gICAgICAgICAgICBjb25zdCB0ID0gTWF0aC5wb3coc3BlY3VsYXJQb3dlciAvIFAzLngsIDAuMzMzMzMzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGN1YmljQmV6aWVyQ3VydmUodCwgUDAueSwgUDEueSwgUDIueSwgUDMueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkaWZmdXNlID0gYmFieWxvblN0YW5kYXJkTWF0ZXJpYWwuZGlmZnVzZUNvbG9yLnRvTGluZWFyU3BhY2UoYmFieWxvblN0YW5kYXJkTWF0ZXJpYWwuZ2V0U2NlbmUoKS5nZXRFbmdpbmUoKS51c2VFeGFjdFNyZ2JDb252ZXJzaW9ucykuc2NhbGUoMC41KTtcclxuICAgICAgICBjb25zdCBvcGFjaXR5ID0gYmFieWxvblN0YW5kYXJkTWF0ZXJpYWwuYWxwaGE7XHJcbiAgICAgICAgY29uc3Qgc3BlY3VsYXJQb3dlciA9IFNjYWxhci5DbGFtcChiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC5zcGVjdWxhclBvd2VyLCAwLCBfR0xURk1hdGVyaWFsRXhwb3J0ZXIuX01heFNwZWN1bGFyUG93ZXIpO1xyXG5cclxuICAgICAgICBjb25zdCByb3VnaG5lc3MgPSBzb2x2ZUZvclJvdWdobmVzcyhzcGVjdWxhclBvd2VyKTtcclxuXHJcbiAgICAgICAgY29uc3QgZ2xURlBick1ldGFsbGljUm91Z2huZXNzOiBJTWF0ZXJpYWxQYnJNZXRhbGxpY1JvdWdobmVzcyA9IHtcclxuICAgICAgICAgICAgYmFzZUNvbG9yRmFjdG9yOiBbZGlmZnVzZS5yLCBkaWZmdXNlLmcsIGRpZmZ1c2UuYiwgb3BhY2l0eV0sXHJcbiAgICAgICAgICAgIG1ldGFsbGljRmFjdG9yOiAwLFxyXG4gICAgICAgICAgICByb3VnaG5lc3NGYWN0b3I6IHJvdWdobmVzcyxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gZ2xURlBick1ldGFsbGljUm91Z2huZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tcHV0ZXMgdGhlIG1ldGFsbGljIGZhY3RvclxyXG4gICAgICogQHBhcmFtIGRpZmZ1c2UgZGlmZnVzZWQgdmFsdWVcclxuICAgICAqIEBwYXJhbSBzcGVjdWxhciBzcGVjdWxhciB2YWx1ZVxyXG4gICAgICogQHBhcmFtIG9uZU1pbnVzU3BlY3VsYXJTdHJlbmd0aCBvbmUgbWludXMgdGhlIHNwZWN1bGFyIHN0cmVuZ3RoXHJcbiAgICAgKiBAcmV0dXJucyBtZXRhbGxpYyB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIF9Tb2x2ZU1ldGFsbGljKGRpZmZ1c2U6IG51bWJlciwgc3BlY3VsYXI6IG51bWJlciwgb25lTWludXNTcGVjdWxhclN0cmVuZ3RoOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChzcGVjdWxhciA8IHRoaXMuX0RpZWxlY3RyaWNTcGVjdWxhci5yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0RpZWxlY3RyaWNTcGVjdWxhcjtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhID0gdGhpcy5fRGllbGVjdHJpY1NwZWN1bGFyLnI7XHJcbiAgICAgICAgY29uc3QgYiA9IChkaWZmdXNlICogb25lTWludXNTcGVjdWxhclN0cmVuZ3RoKSAvICgxLjAgLSB0aGlzLl9EaWVsZWN0cmljU3BlY3VsYXIucikgKyBzcGVjdWxhciAtIDIuMCAqIHRoaXMuX0RpZWxlY3RyaWNTcGVjdWxhci5yO1xyXG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLl9EaWVsZWN0cmljU3BlY3VsYXIuciAtIHNwZWN1bGFyO1xyXG4gICAgICAgIGNvbnN0IEQgPSBiICogYiAtIDQuMCAqIGEgKiBjO1xyXG4gICAgICAgIHJldHVybiBTY2FsYXIuQ2xhbXAoKC1iICsgTWF0aC5zcXJ0KEQpKSAvICgyLjAgKiBhKSwgMCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBnbFRGIGFscGhhIG1vZGUgdG8gYSBnbFRGIG1hdGVyaWFsIGZyb20gdGhlIEJhYnlsb24gTWF0ZXJpYWxcclxuICAgICAqIEBwYXJhbSBnbFRGTWF0ZXJpYWwgZ2xURiBtYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIGJhYnlsb25NYXRlcmlhbCBCYWJ5bG9uIG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9TZXRBbHBoYU1vZGUoZ2xURk1hdGVyaWFsOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwgJiB7IGFscGhhQ3V0T2ZmOiBudW1iZXIgfSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwubmVlZEFscGhhQmxlbmRpbmcoKSkge1xyXG4gICAgICAgICAgICBnbFRGTWF0ZXJpYWwuYWxwaGFNb2RlID0gTWF0ZXJpYWxBbHBoYU1vZGUuQkxFTkQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChiYWJ5bG9uTWF0ZXJpYWwubmVlZEFscGhhVGVzdGluZygpKSB7XHJcbiAgICAgICAgICAgIGdsVEZNYXRlcmlhbC5hbHBoYU1vZGUgPSBNYXRlcmlhbEFscGhhTW9kZS5NQVNLO1xyXG4gICAgICAgICAgICBnbFRGTWF0ZXJpYWwuYWxwaGFDdXRvZmYgPSBiYWJ5bG9uTWF0ZXJpYWwuYWxwaGFDdXRPZmY7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgYSBCYWJ5bG9uIFN0YW5kYXJkIE1hdGVyaWFsIHRvIGEgZ2xURiBNYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsIEJKUyBTdGFuZGFyZCBNYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIG1pbWVUeXBlIG1pbWUgdHlwZSB0byB1c2UgZm9yIHRoZSB0ZXh0dXJlc1xyXG4gICAgICogQHBhcmFtIGhhc1RleHR1cmVDb29yZHMgc3BlY2lmaWVzIGlmIHRleHR1cmUgY29vcmRpbmF0ZXMgYXJlIHByZXNlbnQgb24gdGhlIHN1Ym1lc2ggdG8gZGV0ZXJtaW5lIGlmIHRleHR1cmVzIHNob3VsZCBiZSBhcHBsaWVkXHJcbiAgICAgKiBAcmV0dXJucyBwcm9taXNlLCByZXNvbHZlZCB3aXRoIHRoZSBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2NvbnZlcnRTdGFuZGFyZE1hdGVyaWFsQXN5bmMoYmFieWxvblN0YW5kYXJkTWF0ZXJpYWw6IFN0YW5kYXJkTWF0ZXJpYWwsIG1pbWVUeXBlOiBJbWFnZU1pbWVUeXBlLCBoYXNUZXh0dXJlQ29vcmRzOiBib29sZWFuKTogUHJvbWlzZTxJTWF0ZXJpYWw+IHtcclxuICAgICAgICBjb25zdCBtYXRlcmlhbE1hcCA9IHRoaXMuX2V4cG9ydGVyLl9tYXRlcmlhbE1hcDtcclxuICAgICAgICBjb25zdCBtYXRlcmlhbHMgPSB0aGlzLl9leHBvcnRlci5fbWF0ZXJpYWxzO1xyXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gW107XHJcbiAgICAgICAgY29uc3QgcGJyTWV0YWxsaWNSb3VnaG5lc3MgPSB0aGlzLl9jb252ZXJ0VG9HTFRGUEJSTWV0YWxsaWNSb3VnaG5lc3MoYmFieWxvblN0YW5kYXJkTWF0ZXJpYWwpO1xyXG5cclxuICAgICAgICBjb25zdCBtYXRlcmlhbDogSU1hdGVyaWFsID0geyBuYW1lOiBiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC5uYW1lIH07XHJcbiAgICAgICAgaWYgKGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsLmJhY2tGYWNlQ3VsbGluZyAhPSBudWxsICYmICFiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC5iYWNrRmFjZUN1bGxpbmcpIHtcclxuICAgICAgICAgICAgaWYgKCFiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC50d29TaWRlZExpZ2h0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5XYXJuKGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsLm5hbWUgKyBcIjogQmFjay1mYWNlIGN1bGxpbmcgZGlzYWJsZWQgYW5kIHR3by1zaWRlZCBsaWdodGluZyBkaXNhYmxlZCBpcyBub3Qgc3VwcG9ydGVkIGluIGdsVEYuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLmRvdWJsZVNpZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGhhc1RleHR1cmVDb29yZHMpIHtcclxuICAgICAgICAgICAgaWYgKGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsLmRpZmZ1c2VUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V4cG9ydFRleHR1cmVBc3luYyhiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC5kaWZmdXNlVGV4dHVyZSwgbWltZVR5cGUpLnRoZW4oKHRleHR1cmVJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0dXJlSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGJyTWV0YWxsaWNSb3VnaG5lc3MuYmFzZUNvbG9yVGV4dHVyZSA9IHRleHR1cmVJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgYnVtcFRleHR1cmUgPSBiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC5idW1wVGV4dHVyZTtcclxuICAgICAgICAgICAgaWYgKGJ1bXBUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V4cG9ydFRleHR1cmVBc3luYyhidW1wVGV4dHVyZSwgbWltZVR5cGUpLnRoZW4oKHRleHR1cmVJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0dXJlSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwubm9ybWFsVGV4dHVyZSA9IHRleHR1cmVJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1bXBUZXh0dXJlLmxldmVsICE9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwubm9ybWFsVGV4dHVyZS5zY2FsZSA9IGJ1bXBUZXh0dXJlLmxldmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsLmVtaXNzaXZlVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuZW1pc3NpdmVGYWN0b3IgPSBbMS4wLCAxLjAsIDEuMF07XHJcblxyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9leHBvcnRUZXh0dXJlQXN5bmMoYmFieWxvblN0YW5kYXJkTWF0ZXJpYWwuZW1pc3NpdmVUZXh0dXJlLCBtaW1lVHlwZSkudGhlbigodGV4dHVyZUluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRleHR1cmVJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5lbWlzc2l2ZVRleHR1cmUgPSB0ZXh0dXJlSW5mbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC5hbWJpZW50VGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9leHBvcnRUZXh0dXJlQXN5bmMoYmFieWxvblN0YW5kYXJkTWF0ZXJpYWwuYW1iaWVudFRleHR1cmUsIG1pbWVUeXBlKS50aGVuKCh0ZXh0dXJlSW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGV4dHVyZUluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9jY2x1c2lvblRleHR1cmU6IElNYXRlcmlhbE9jY2x1c2lvblRleHR1cmVJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0ZXh0dXJlSW5mby5pbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5vY2NsdXNpb25UZXh0dXJlID0gb2NjbHVzaW9uVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYmFieWxvblN0YW5kYXJkTWF0ZXJpYWwuYWxwaGEgPCAxLjAgfHwgYmFieWxvblN0YW5kYXJkTWF0ZXJpYWwub3BhY2l0eVRleHR1cmUpIHtcclxuICAgICAgICAgICAgaWYgKGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsLmFscGhhTW9kZSA9PT0gQ29uc3RhbnRzLkFMUEhBX0NPTUJJTkUpIHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhTW9kZSA9IE1hdGVyaWFsQWxwaGFNb2RlLkJMRU5EO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuV2FybihiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC5uYW1lICsgXCI6IGdsVEYgMi4wIGRvZXMgbm90IHN1cHBvcnQgYWxwaGEgbW9kZTogXCIgKyBiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC5hbHBoYU1vZGUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsLmVtaXNzaXZlQ29sb3IgJiYgIV9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRnV6enlFcXVhbHMoYmFieWxvblN0YW5kYXJkTWF0ZXJpYWwuZW1pc3NpdmVDb2xvciwgQ29sb3IzLkJsYWNrKCksIF9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRXBzaWxvbikpIHtcclxuICAgICAgICAgICAgbWF0ZXJpYWwuZW1pc3NpdmVGYWN0b3IgPSBiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC5lbWlzc2l2ZUNvbG9yLmFzQXJyYXkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1hdGVyaWFsLnBick1ldGFsbGljUm91Z2huZXNzID0gcGJyTWV0YWxsaWNSb3VnaG5lc3M7XHJcbiAgICAgICAgX0dMVEZNYXRlcmlhbEV4cG9ydGVyLl9TZXRBbHBoYU1vZGUobWF0ZXJpYWwsIGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsKTtcclxuXHJcbiAgICAgICAgbWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xyXG4gICAgICAgIG1hdGVyaWFsTWFwW2JhYnlsb25TdGFuZGFyZE1hdGVyaWFsLnVuaXF1ZUlkXSA9IG1hdGVyaWFscy5sZW5ndGggLSAxO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fZmluaXNoTWF0ZXJpYWwocHJvbWlzZXMsIG1hdGVyaWFsLCBiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbCwgbWltZVR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2ZpbmlzaE1hdGVyaWFsPFQ+KHByb21pc2VzOiBQcm9taXNlPFQ+W10sIGdsVEZNYXRlcmlhbDogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsLCBtaW1lVHlwZTogSW1hZ2VNaW1lVHlwZSkge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHR1cmVzID0gdGhpcy5fZXhwb3J0ZXIuX2V4dGVuc2lvbnNQb3N0RXhwb3J0TWF0ZXJpYWxBZGRpdGlvbmFsVGV4dHVyZXMoXCJleHBvcnRNYXRlcmlhbFwiLCBnbFRGTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIGxldCB0YXNrczogTnVsbGFibGU8UHJvbWlzZTxOdWxsYWJsZTxJVGV4dHVyZUluZm8+PltdPiA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRleHR1cmUgb2YgdGV4dHVyZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGFza3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXNrcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGFza3MucHVzaCh0aGlzLl9leHBvcnRUZXh0dXJlQXN5bmModGV4dHVyZSwgbWltZVR5cGUpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCF0YXNrcykge1xyXG4gICAgICAgICAgICAgICAgdGFza3MgPSBbUHJvbWlzZS5yZXNvbHZlKG51bGwpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHRhc2tzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbldvcmsgPSB0aGlzLl9leHBvcnRlci5fZXh0ZW5zaW9uc1Bvc3RFeHBvcnRNYXRlcmlhbEFzeW5jKFwiZXhwb3J0TWF0ZXJpYWxcIiwgZ2xURk1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFleHRlbnNpb25Xb3JrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdsVEZNYXRlcmlhbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBleHRlbnNpb25Xb3JrLnRoZW4oKCkgPT4gZ2xURk1hdGVyaWFsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhbiBpbWFnZSB0eXBlZCBhcnJheSBidWZmZXIgdG8gYSBiYXNlNjQgaW1hZ2VcclxuICAgICAqIEBwYXJhbSBidWZmZXIgdHlwZWQgYXJyYXkgYnVmZmVyXHJcbiAgICAgKiBAcGFyYW0gd2lkdGggd2lkdGggb2YgdGhlIGltYWdlXHJcbiAgICAgKiBAcGFyYW0gaGVpZ2h0IGhlaWdodCBvZiB0aGUgaW1hZ2VcclxuICAgICAqIEBwYXJhbSBtaW1lVHlwZSBtaW1ldHlwZSBvZiB0aGUgaW1hZ2VcclxuICAgICAqIEByZXR1cm5zIGJhc2U2NCBpbWFnZSBzdHJpbmdcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBfZ2V0SW1hZ2VEYXRhQXN5bmMoYnVmZmVyOiBVaW50OEFycmF5IHwgRmxvYXQzMkFycmF5LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgbWltZVR5cGU6IEltYWdlTWltZVR5cGUpOiBQcm9taXNlPEFycmF5QnVmZmVyPiB7XHJcbiAgICAgICAgY29uc3QgdGV4dHVyZVR5cGUgPSBDb25zdGFudHMuVEVYVFVSRVRZUEVfVU5TSUdORURfQllURTtcclxuXHJcbiAgICAgICAgY29uc3QgaG9zdGluZ1NjZW5lID0gdGhpcy5fZXhwb3J0ZXIuX2JhYnlsb25TY2VuZTtcclxuICAgICAgICBjb25zdCBlbmdpbmUgPSBob3N0aW5nU2NlbmUuZ2V0RW5naW5lKCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIHRlbXBvcmFyeSB0ZXh0dXJlIHdpdGggdGhlIHRleHR1cmUgYnVmZmVyIGRhdGFcclxuICAgICAgICBjb25zdCB0ZW1wVGV4dHVyZSA9IGVuZ2luZS5jcmVhdGVSYXdUZXh0dXJlKGJ1ZmZlciwgd2lkdGgsIGhlaWdodCwgQ29uc3RhbnRzLlRFWFRVUkVGT1JNQVRfUkdCQSwgZmFsc2UsIHRydWUsIFRleHR1cmUuTkVBUkVTVF9TQU1QTElOR01PREUsIG51bGwsIHRleHR1cmVUeXBlKTtcclxuXHJcbiAgICAgICAgYXdhaXQgVGV4dHVyZVRvb2xzLkFwcGx5UG9zdFByb2Nlc3MoXCJwYXNzXCIsIHRlbXBUZXh0dXJlLCBob3N0aW5nU2NlbmUsIHRleHR1cmVUeXBlLCBDb25zdGFudHMuVEVYVFVSRV9ORUFSRVNUX1NBTVBMSU5HTU9ERSwgQ29uc3RhbnRzLlRFWFRVUkVGT1JNQVRfUkdCQSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBlbmdpbmUuX3JlYWRUZXh0dXJlUGl4ZWxzKHRlbXBUZXh0dXJlLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChhd2FpdCBEdW1wVG9vbHMuRHVtcERhdGFBc3luYyh3aWR0aCwgaGVpZ2h0LCBkYXRhLCBtaW1lVHlwZSwgdW5kZWZpbmVkLCB0cnVlLCB0cnVlKSkgYXMgQXJyYXlCdWZmZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZXMgYSB3aGl0ZSB0ZXh0dXJlIGJhc2VkIG9uIHRoZSBzcGVjaWZpZWQgd2lkdGggYW5kIGhlaWdodFxyXG4gICAgICogQHBhcmFtIHdpZHRoIHdpZHRoIG9mIHRoZSB0ZXh0dXJlIGluIHBpeGVsc1xyXG4gICAgICogQHBhcmFtIGhlaWdodCBoZWlnaHQgb2YgdGhlIHRleHR1cmUgaW4gcGl4ZWxzXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgYmFieWxvbmpzIHNjZW5lXHJcbiAgICAgKiBAcmV0dXJucyB3aGl0ZSB0ZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NyZWF0ZVdoaXRlVGV4dHVyZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgc2NlbmU6IFNjZW5lKTogVGV4dHVyZSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBVaW50OEFycmF5KHdpZHRoICogaGVpZ2h0ICogNCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgPSBpICsgNCkge1xyXG4gICAgICAgICAgICBkYXRhW2ldID0gZGF0YVtpICsgMV0gPSBkYXRhW2kgKyAyXSA9IGRhdGFbaSArIDNdID0gMHhmZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJhd1RleHR1cmUgPSBSYXdUZXh0dXJlLkNyZWF0ZVJHQkFUZXh0dXJlKGRhdGEsIHdpZHRoLCBoZWlnaHQsIHNjZW5lKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJhd1RleHR1cmU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemVzIHRoZSB0d28gc291cmNlIHRleHR1cmVzIHRvIHRoZSBzYW1lIGRpbWVuc2lvbnMuICBJZiBhIHRleHR1cmUgaXMgbnVsbCwgYSBkZWZhdWx0IHdoaXRlIHRleHR1cmUgaXMgZ2VuZXJhdGVkLiAgSWYgYm90aCB0ZXh0dXJlcyBhcmUgbnVsbCwgcmV0dXJucyBudWxsXHJcbiAgICAgKiBAcGFyYW0gdGV4dHVyZTEgZmlyc3QgdGV4dHVyZSB0byByZXNpemVcclxuICAgICAqIEBwYXJhbSB0ZXh0dXJlMiBzZWNvbmQgdGV4dHVyZSB0byByZXNpemVcclxuICAgICAqIEBwYXJhbSBzY2VuZSBiYWJ5bG9uanMgc2NlbmVcclxuICAgICAqIEByZXR1cm5zIHJlc2l6ZWQgdGV4dHVyZXMgb3IgbnVsbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9yZXNpemVUZXh0dXJlc1RvU2FtZURpbWVuc2lvbnModGV4dHVyZTE6IE51bGxhYmxlPEJhc2VUZXh0dXJlPiwgdGV4dHVyZTI6IE51bGxhYmxlPEJhc2VUZXh0dXJlPiwgc2NlbmU6IFNjZW5lKTogeyB0ZXh0dXJlMTogQmFzZVRleHR1cmU7IHRleHR1cmUyOiBCYXNlVGV4dHVyZSB9IHtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlMVNpemUgPSB0ZXh0dXJlMSA/IHRleHR1cmUxLmdldFNpemUoKSA6IHsgd2lkdGg6IDAsIGhlaWdodDogMCB9O1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmUyU2l6ZSA9IHRleHR1cmUyID8gdGV4dHVyZTIuZ2V0U2l6ZSgpIDogeyB3aWR0aDogMCwgaGVpZ2h0OiAwIH07XHJcbiAgICAgICAgbGV0IHJlc2l6ZWRUZXh0dXJlMTogQmFzZVRleHR1cmU7XHJcbiAgICAgICAgbGV0IHJlc2l6ZWRUZXh0dXJlMjogQmFzZVRleHR1cmU7XHJcblxyXG4gICAgICAgIGlmICh0ZXh0dXJlMVNpemUud2lkdGggPCB0ZXh0dXJlMlNpemUud2lkdGgpIHtcclxuICAgICAgICAgICAgaWYgKHRleHR1cmUxICYmIHRleHR1cmUxIGluc3RhbmNlb2YgVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzaXplZFRleHR1cmUxID0gVGV4dHVyZVRvb2xzLkNyZWF0ZVJlc2l6ZWRDb3B5KHRleHR1cmUxLCB0ZXh0dXJlMlNpemUud2lkdGgsIHRleHR1cmUyU2l6ZS5oZWlnaHQsIHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzaXplZFRleHR1cmUxID0gdGhpcy5fY3JlYXRlV2hpdGVUZXh0dXJlKHRleHR1cmUyU2l6ZS53aWR0aCwgdGV4dHVyZTJTaXplLmhlaWdodCwgc2NlbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc2l6ZWRUZXh0dXJlMiA9IHRleHR1cmUyITtcclxuICAgICAgICB9IGVsc2UgaWYgKHRleHR1cmUxU2l6ZS53aWR0aCA+IHRleHR1cmUyU2l6ZS53aWR0aCkge1xyXG4gICAgICAgICAgICBpZiAodGV4dHVyZTIgJiYgdGV4dHVyZTIgaW5zdGFuY2VvZiBUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICByZXNpemVkVGV4dHVyZTIgPSBUZXh0dXJlVG9vbHMuQ3JlYXRlUmVzaXplZENvcHkodGV4dHVyZTIsIHRleHR1cmUxU2l6ZS53aWR0aCwgdGV4dHVyZTFTaXplLmhlaWdodCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNpemVkVGV4dHVyZTIgPSB0aGlzLl9jcmVhdGVXaGl0ZVRleHR1cmUodGV4dHVyZTFTaXplLndpZHRoLCB0ZXh0dXJlMVNpemUuaGVpZ2h0LCBzY2VuZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzaXplZFRleHR1cmUxID0gdGV4dHVyZTEhO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc2l6ZWRUZXh0dXJlMSA9IHRleHR1cmUxITtcclxuICAgICAgICAgICAgcmVzaXplZFRleHR1cmUyID0gdGV4dHVyZTIhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGV4dHVyZTE6IHJlc2l6ZWRUZXh0dXJlMSEsXHJcbiAgICAgICAgICAgIHRleHR1cmUyOiByZXNpemVkVGV4dHVyZTIhLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhbiBhcnJheSBvZiBwaXhlbHMgdG8gYSBGbG9hdDMyQXJyYXlcclxuICAgICAqIFRocm93cyBhbiBlcnJvciBpZiB0aGUgcGl4ZWwgZm9ybWF0IGlzIG5vdCBzdXBwb3J0ZWRcclxuICAgICAqIEBwYXJhbSBwaXhlbHMgLSBhcnJheSBidWZmZXIgY29udGFpbmluZyBwaXhlbCB2YWx1ZXNcclxuICAgICAqIEByZXR1cm5zIEZsb2F0MzIgb2YgcGl4ZWxzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NvbnZlcnRQaXhlbEFycmF5VG9GbG9hdDMyKHBpeGVsczogQXJyYXlCdWZmZXJWaWV3KTogRmxvYXQzMkFycmF5IHtcclxuICAgICAgICBpZiAocGl4ZWxzIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xyXG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSBwaXhlbHMubGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zdCBidWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KHBpeGVscy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJbaV0gPSBwaXhlbHNbaV0gLyAyNTU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcclxuICAgICAgICB9IGVsc2UgaWYgKHBpeGVscyBpbnN0YW5jZW9mIEZsb2F0MzJBcnJheSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGl4ZWxzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuc3VwcG9ydGVkIHBpeGVsIGZvcm1hdCFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydCBTcGVjdWxhciBHbG9zc2luZXNzIFRleHR1cmVzIHRvIE1ldGFsbGljIFJvdWdobmVzc1xyXG4gICAgICogU2VlIGxpbmsgYmVsb3cgZm9yIGluZm8gb24gdGhlIG1hdGVyaWFsIGNvbnZlcnNpb25zIGZyb20gUEJSIE1ldGFsbGljL1JvdWdobmVzcyBhbmQgU3BlY3VsYXIvR2xvc3NpbmVzc1xyXG4gICAgICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL0tocm9ub3NHcm91cC9nbFRGL2Jsb2IvbWFpbi9leHRlbnNpb25zLzIuMC9BcmNoaXZlZC9LSFJfbWF0ZXJpYWxzX3BiclNwZWN1bGFyR2xvc3NpbmVzcy9leGFtcGxlcy9jb252ZXJ0LWJldHdlZW4td29ya2Zsb3dzLWJqcy9qcy9iYWJ5bG9uLnBiclV0aWxpdGllcy5qc1xyXG4gICAgICogQHBhcmFtIGRpZmZ1c2VUZXh0dXJlIHRleHR1cmUgdXNlZCB0byBzdG9yZSBkaWZmdXNlIGluZm9ybWF0aW9uXHJcbiAgICAgKiBAcGFyYW0gc3BlY3VsYXJHbG9zc2luZXNzVGV4dHVyZSB0ZXh0dXJlIHVzZWQgdG8gc3RvcmUgc3BlY3VsYXIgYW5kIGdsb3NzaW5lc3MgaW5mb3JtYXRpb25cclxuICAgICAqIEBwYXJhbSBmYWN0b3JzIHNwZWN1bGFyIGdsb3NzaW5lc3MgbWF0ZXJpYWwgZmFjdG9yc1xyXG4gICAgICogQHBhcmFtIG1pbWVUeXBlIHRoZSBtaW1lIHR5cGUgdG8gdXNlIGZvciB0aGUgdGV4dHVyZVxyXG4gICAgICogQHJldHVybnMgcGJyIG1ldGFsbGljIHJvdWdobmVzcyBpbnRlcmZhY2Ugb3IgbnVsbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIF9jb252ZXJ0U3BlY3VsYXJHbG9zc2luZXNzVGV4dHVyZXNUb01ldGFsbGljUm91Z2huZXNzQXN5bmMoXHJcbiAgICAgICAgZGlmZnVzZVRleHR1cmU6IE51bGxhYmxlPEJhc2VUZXh0dXJlPixcclxuICAgICAgICBzcGVjdWxhckdsb3NzaW5lc3NUZXh0dXJlOiBOdWxsYWJsZTxCYXNlVGV4dHVyZT4sXHJcbiAgICAgICAgZmFjdG9yczogX0lQQlJTcGVjdWxhckdsb3NzaW5lc3MsXHJcbiAgICAgICAgbWltZVR5cGU6IEltYWdlTWltZVR5cGVcclxuICAgICk6IFByb21pc2U8X0lQQlJNZXRhbGxpY1JvdWdobmVzcz4ge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gbmV3IEFycmF5PFByb21pc2U8dm9pZD4+KCk7XHJcbiAgICAgICAgaWYgKCEoZGlmZnVzZVRleHR1cmUgfHwgc3BlY3VsYXJHbG9zc2luZXNzVGV4dHVyZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwiX0NvbnZlcnRTcGVjdWxhckdsb3NpbmVzc1RleHR1cmVzVG9NZXRhbGxpY1JvdWdobmVzczogZGlmZnVzZSBhbmQgc3BlY3VsYXIgZ2xvc3NpbmVzcyB0ZXh0dXJlcyBhcmUgbm90IGRlZmluZWQhXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2NlbmU6IE51bGxhYmxlPFNjZW5lPiA9IGRpZmZ1c2VUZXh0dXJlID8gZGlmZnVzZVRleHR1cmUuZ2V0U2NlbmUoKSA6IHNwZWN1bGFyR2xvc3NpbmVzc1RleHR1cmUgPyBzcGVjdWxhckdsb3NzaW5lc3NUZXh0dXJlLmdldFNjZW5lKCkgOiBudWxsO1xyXG4gICAgICAgIGlmIChzY2VuZSkge1xyXG4gICAgICAgICAgICBjb25zdCByZXNpemVkVGV4dHVyZXMgPSB0aGlzLl9yZXNpemVUZXh0dXJlc1RvU2FtZURpbWVuc2lvbnMoZGlmZnVzZVRleHR1cmUsIHNwZWN1bGFyR2xvc3NpbmVzc1RleHR1cmUsIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRpZmZ1c2VTaXplID0gcmVzaXplZFRleHR1cmVzLnRleHR1cmUxPy5nZXRTaXplKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGlmZnVzZUJ1ZmZlcjogRmxvYXQzMkFycmF5O1xyXG4gICAgICAgICAgICBsZXQgc3BlY3VsYXJHbG9zc2luZXNzQnVmZmVyOiBGbG9hdDMyQXJyYXk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGRpZmZ1c2VTaXplLndpZHRoO1xyXG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBkaWZmdXNlU2l6ZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkaWZmdXNlUGl4ZWxzID0gYXdhaXQgcmVzaXplZFRleHR1cmVzLnRleHR1cmUxLnJlYWRQaXhlbHMoKTtcclxuICAgICAgICAgICAgY29uc3Qgc3BlY3VsYXJQaXhlbHMgPSBhd2FpdCByZXNpemVkVGV4dHVyZXMudGV4dHVyZTIucmVhZFBpeGVscygpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRpZmZ1c2VQaXhlbHMpIHtcclxuICAgICAgICAgICAgICAgIGRpZmZ1c2VCdWZmZXIgPSB0aGlzLl9jb252ZXJ0UGl4ZWxBcnJheVRvRmxvYXQzMihkaWZmdXNlUGl4ZWxzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIkZhaWxlZCB0byByZXRyaWV2ZSBwaXhlbHMgZnJvbSBkaWZmdXNlIHRleHR1cmUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzcGVjdWxhclBpeGVscykge1xyXG4gICAgICAgICAgICAgICAgc3BlY3VsYXJHbG9zc2luZXNzQnVmZmVyID0gdGhpcy5fY29udmVydFBpeGVsQXJyYXlUb0Zsb2F0MzIoc3BlY3VsYXJQaXhlbHMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwiRmFpbGVkIHRvIHJldHJpZXZlIHBpeGVscyBmcm9tIHNwZWN1bGFyIGdsb3NzaW5lc3MgdGV4dHVyZSFcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJ5dGVMZW5ndGggPSBzcGVjdWxhckdsb3NzaW5lc3NCdWZmZXIuYnl0ZUxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1ldGFsbGljUm91Z2huZXNzQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhc2VDb2xvckJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KGJ5dGVMZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3RyaWRlU2l6ZSA9IDQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heEJhc2VDb2xvciA9IENvbG9yMy5CbGFjaygpO1xyXG4gICAgICAgICAgICBsZXQgbWF4TWV0YWxsaWMgPSAwO1xyXG4gICAgICAgICAgICBsZXQgbWF4Um91Z2huZXNzID0gMDtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGggPSAwOyBoIDwgaGVpZ2h0OyArK2gpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHcgPSAwOyB3IDwgd2lkdGg7ICsrdykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9ICh3aWR0aCAqIGggKyB3KSAqIHN0cmlkZVNpemU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZ1c2VDb2xvciA9IG5ldyBDb2xvcjMoZGlmZnVzZUJ1ZmZlcltvZmZzZXRdLCBkaWZmdXNlQnVmZmVyW29mZnNldCArIDFdLCBkaWZmdXNlQnVmZmVyW29mZnNldCArIDJdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudG9MaW5lYXJTcGFjZShzY2VuZS5nZXRFbmdpbmUoKS51c2VFeGFjdFNyZ2JDb252ZXJzaW9ucylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm11bHRpcGx5KGZhY3RvcnMuZGlmZnVzZUNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGVjdWxhckNvbG9yID0gbmV3IENvbG9yMyhzcGVjdWxhckdsb3NzaW5lc3NCdWZmZXJbb2Zmc2V0XSwgc3BlY3VsYXJHbG9zc2luZXNzQnVmZmVyW29mZnNldCArIDFdLCBzcGVjdWxhckdsb3NzaW5lc3NCdWZmZXJbb2Zmc2V0ICsgMl0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50b0xpbmVhclNwYWNlKHNjZW5lLmdldEVuZ2luZSgpLnVzZUV4YWN0U3JnYkNvbnZlcnNpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAubXVsdGlwbHkoZmFjdG9ycy5zcGVjdWxhckNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBnbG9zc2luZXNzID0gc3BlY3VsYXJHbG9zc2luZXNzQnVmZmVyW29mZnNldCArIDNdICogZmFjdG9ycy5nbG9zc2luZXNzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGVjdWxhckdsb3NzaW5lc3M6IF9JUEJSU3BlY3VsYXJHbG9zc2luZXNzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWZmdXNlQ29sb3I6IGRpZmZ1c2VDb2xvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlY3VsYXJDb2xvcjogc3BlY3VsYXJDb2xvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2xvc3NpbmVzczogZ2xvc3NpbmVzcyxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXRhbGxpY1JvdWdobmVzcyA9IHRoaXMuX2NvbnZlcnRTcGVjdWxhckdsb3NzaW5lc3NUb01ldGFsbGljUm91Z2huZXNzKHNwZWN1bGFyR2xvc3NpbmVzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4QmFzZUNvbG9yLnIgPSBNYXRoLm1heChtYXhCYXNlQ29sb3IuciwgbWV0YWxsaWNSb3VnaG5lc3MuYmFzZUNvbG9yLnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1heEJhc2VDb2xvci5nID0gTWF0aC5tYXgobWF4QmFzZUNvbG9yLmcsIG1ldGFsbGljUm91Z2huZXNzLmJhc2VDb2xvci5nKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXhCYXNlQ29sb3IuYiA9IE1hdGgubWF4KG1heEJhc2VDb2xvci5iLCBtZXRhbGxpY1JvdWdobmVzcy5iYXNlQ29sb3IuYik7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4TWV0YWxsaWMgPSBNYXRoLm1heChtYXhNZXRhbGxpYywgbWV0YWxsaWNSb3VnaG5lc3MubWV0YWxsaWMhKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXhSb3VnaG5lc3MgPSBNYXRoLm1heChtYXhSb3VnaG5lc3MsIG1ldGFsbGljUm91Z2huZXNzLnJvdWdobmVzcyEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ29sb3JCdWZmZXJbb2Zmc2V0XSA9IG1ldGFsbGljUm91Z2huZXNzLmJhc2VDb2xvci5yICogMjU1O1xyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDb2xvckJ1ZmZlcltvZmZzZXQgKyAxXSA9IG1ldGFsbGljUm91Z2huZXNzLmJhc2VDb2xvci5nICogMjU1O1xyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDb2xvckJ1ZmZlcltvZmZzZXQgKyAyXSA9IG1ldGFsbGljUm91Z2huZXNzLmJhc2VDb2xvci5iICogMjU1O1xyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDb2xvckJ1ZmZlcltvZmZzZXQgKyAzXSA9IHJlc2l6ZWRUZXh0dXJlcy50ZXh0dXJlMS5oYXNBbHBoYSA/IGRpZmZ1c2VCdWZmZXJbb2Zmc2V0ICsgM10gKiAyNTUgOiAyNTU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGFsbGljUm91Z2huZXNzQnVmZmVyW29mZnNldF0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGFsbGljUm91Z2huZXNzQnVmZmVyW29mZnNldCArIDFdID0gbWV0YWxsaWNSb3VnaG5lc3Mucm91Z2huZXNzISAqIDI1NTtcclxuICAgICAgICAgICAgICAgICAgICBtZXRhbGxpY1JvdWdobmVzc0J1ZmZlcltvZmZzZXQgKyAyXSA9IG1ldGFsbGljUm91Z2huZXNzLm1ldGFsbGljISAqIDI1NTtcclxuICAgICAgICAgICAgICAgICAgICBtZXRhbGxpY1JvdWdobmVzc0J1ZmZlcltvZmZzZXQgKyAzXSA9IDI1NTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmV0cmlldmVzIHRoZSBtZXRhbGxpYyByb3VnaG5lc3MgZmFjdG9ycyBmcm9tIHRoZSBtYXhpbXVtIHRleHR1cmUgdmFsdWVzLlxyXG4gICAgICAgICAgICBjb25zdCBtZXRhbGxpY1JvdWdobmVzc0ZhY3RvcnM6IF9JUEJSTWV0YWxsaWNSb3VnaG5lc3MgPSB7XHJcbiAgICAgICAgICAgICAgICBiYXNlQ29sb3I6IG1heEJhc2VDb2xvcixcclxuICAgICAgICAgICAgICAgIG1ldGFsbGljOiBtYXhNZXRhbGxpYyxcclxuICAgICAgICAgICAgICAgIHJvdWdobmVzczogbWF4Um91Z2huZXNzLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IHdyaXRlT3V0TWV0YWxsaWNSb3VnaG5lc3NUZXh0dXJlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCB3cml0ZU91dEJhc2VDb2xvclRleHR1cmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGggPSAwOyBoIDwgaGVpZ2h0OyArK2gpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHcgPSAwOyB3IDwgd2lkdGg7ICsrdykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uT2Zmc2V0ID0gKHdpZHRoICogaCArIHcpICogc3RyaWRlU2l6ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNvbG9yQnVmZmVyW2Rlc3RpbmF0aW9uT2Zmc2V0XSAvPSBtZXRhbGxpY1JvdWdobmVzc0ZhY3RvcnMuYmFzZUNvbG9yLnIgPiBfR0xURk1hdGVyaWFsRXhwb3J0ZXIuX0Vwc2lsb24gPyBtZXRhbGxpY1JvdWdobmVzc0ZhY3RvcnMuYmFzZUNvbG9yLnIgOiAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDb2xvckJ1ZmZlcltkZXN0aW5hdGlvbk9mZnNldCArIDFdIC89IG1ldGFsbGljUm91Z2huZXNzRmFjdG9ycy5iYXNlQ29sb3IuZyA+IF9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRXBzaWxvbiA/IG1ldGFsbGljUm91Z2huZXNzRmFjdG9ycy5iYXNlQ29sb3IuZyA6IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNvbG9yQnVmZmVyW2Rlc3RpbmF0aW9uT2Zmc2V0ICsgMl0gLz0gbWV0YWxsaWNSb3VnaG5lc3NGYWN0b3JzLmJhc2VDb2xvci5iID4gX0dMVEZNYXRlcmlhbEV4cG9ydGVyLl9FcHNpbG9uID8gbWV0YWxsaWNSb3VnaG5lc3NGYWN0b3JzLmJhc2VDb2xvci5iIDogMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZWFyQmFzZUNvbG9yUGl4ZWwgPSBDb2xvcjMuRnJvbUludHMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VDb2xvckJ1ZmZlcltkZXN0aW5hdGlvbk9mZnNldF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VDb2xvckJ1ZmZlcltkZXN0aW5hdGlvbk9mZnNldCArIDFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXNlQ29sb3JCdWZmZXJbZGVzdGluYXRpb25PZmZzZXQgKyAyXVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc1JHQkJhc2VDb2xvclBpeGVsID0gbGluZWFyQmFzZUNvbG9yUGl4ZWwudG9HYW1tYVNwYWNlKHNjZW5lLmdldEVuZ2luZSgpLnVzZUV4YWN0U3JnYkNvbnZlcnNpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ29sb3JCdWZmZXJbZGVzdGluYXRpb25PZmZzZXRdID0gc1JHQkJhc2VDb2xvclBpeGVsLnIgKiAyNTU7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNvbG9yQnVmZmVyW2Rlc3RpbmF0aW9uT2Zmc2V0ICsgMV0gPSBzUkdCQmFzZUNvbG9yUGl4ZWwuZyAqIDI1NTtcclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ29sb3JCdWZmZXJbZGVzdGluYXRpb25PZmZzZXQgKyAyXSA9IHNSR0JCYXNlQ29sb3JQaXhlbC5iICogMjU1O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIV9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRnV6enlFcXVhbHMoc1JHQkJhc2VDb2xvclBpeGVsLCBDb2xvcjMuV2hpdGUoKSwgX0dMVEZNYXRlcmlhbEV4cG9ydGVyLl9FcHNpbG9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZU91dEJhc2VDb2xvclRleHR1cmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0YWxsaWNSb3VnaG5lc3NCdWZmZXJbZGVzdGluYXRpb25PZmZzZXQgKyAxXSAvPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhbGxpY1JvdWdobmVzc0ZhY3RvcnMucm91Z2huZXNzISA+IF9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRXBzaWxvbiA/IG1ldGFsbGljUm91Z2huZXNzRmFjdG9ycy5yb3VnaG5lc3MhIDogMTtcclxuICAgICAgICAgICAgICAgICAgICBtZXRhbGxpY1JvdWdobmVzc0J1ZmZlcltkZXN0aW5hdGlvbk9mZnNldCArIDJdIC89IG1ldGFsbGljUm91Z2huZXNzRmFjdG9ycy5tZXRhbGxpYyEgPiBfR0xURk1hdGVyaWFsRXhwb3J0ZXIuX0Vwc2lsb24gPyBtZXRhbGxpY1JvdWdobmVzc0ZhY3RvcnMubWV0YWxsaWMhIDogMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWV0YWxsaWNSb3VnaG5lc3NQaXhlbCA9IENvbG9yMy5Gcm9tSW50cygyNTUsIG1ldGFsbGljUm91Z2huZXNzQnVmZmVyW2Rlc3RpbmF0aW9uT2Zmc2V0ICsgMV0sIG1ldGFsbGljUm91Z2huZXNzQnVmZmVyW2Rlc3RpbmF0aW9uT2Zmc2V0ICsgMl0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIV9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRnV6enlFcXVhbHMobWV0YWxsaWNSb3VnaG5lc3NQaXhlbCwgQ29sb3IzLldoaXRlKCksIF9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRXBzaWxvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVPdXRNZXRhbGxpY1JvdWdobmVzc1RleHR1cmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHdyaXRlT3V0TWV0YWxsaWNSb3VnaG5lc3NUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dldEltYWdlRGF0YUFzeW5jKG1ldGFsbGljUm91Z2huZXNzQnVmZmVyLCB3aWR0aCwgaGVpZ2h0LCBtaW1lVHlwZSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhbGxpY1JvdWdobmVzc0ZhY3RvcnMubWV0YWxsaWNSb3VnaG5lc3NUZXh0dXJlRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHdyaXRlT3V0QmFzZUNvbG9yVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRJbWFnZURhdGFBc3luYyhiYXNlQ29sb3JCdWZmZXIsIHdpZHRoLCBoZWlnaHQsIG1pbWVUeXBlKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFsbGljUm91Z2huZXNzRmFjdG9ycy5iYXNlQ29sb3JUZXh0dXJlRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0YWxsaWNSb3VnaG5lc3NGYWN0b3JzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJfQ29udmVydFNwZWN1bGFyR2xvc3NpbmVzc1RleHR1cmVzVG9NZXRhbGxpY1JvdWdobmVzczogU2NlbmUgZnJvbSB0ZXh0dXJlcyBpcyBtaXNzaW5nIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBzcGVjdWxhciBnbG9zc2luZXNzIG1hdGVyaWFsIHByb3BlcnRpZXMgdG8gbWV0YWxsaWMgcm91Z2huZXNzXHJcbiAgICAgKiBAcGFyYW0gc3BlY3VsYXJHbG9zc2luZXNzIGludGVyZmFjZSB3aXRoIHNwZWN1bGFyIGdsb3NzaW5lc3MgbWF0ZXJpYWwgcHJvcGVydGllc1xyXG4gICAgICogQHJldHVybnMgaW50ZXJmYWNlIHdpdGggbWV0YWxsaWMgcm91Z2huZXNzIG1hdGVyaWFsIHByb3BlcnRpZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfY29udmVydFNwZWN1bGFyR2xvc3NpbmVzc1RvTWV0YWxsaWNSb3VnaG5lc3Moc3BlY3VsYXJHbG9zc2luZXNzOiBfSVBCUlNwZWN1bGFyR2xvc3NpbmVzcyk6IF9JUEJSTWV0YWxsaWNSb3VnaG5lc3Mge1xyXG4gICAgICAgIGNvbnN0IGRpZmZ1c2VQZXJjZWl2ZWRCcmlnaHRuZXNzID0gdGhpcy5fZ2V0UGVyY2VpdmVkQnJpZ2h0bmVzcyhzcGVjdWxhckdsb3NzaW5lc3MuZGlmZnVzZUNvbG9yKTtcclxuICAgICAgICBjb25zdCBzcGVjdWxhclBlcmNlaXZlZEJyaWdodG5lc3MgPSB0aGlzLl9nZXRQZXJjZWl2ZWRCcmlnaHRuZXNzKHNwZWN1bGFyR2xvc3NpbmVzcy5zcGVjdWxhckNvbG9yKTtcclxuICAgICAgICBjb25zdCBvbmVNaW51c1NwZWN1bGFyU3RyZW5ndGggPSAxIC0gdGhpcy5fZ2V0TWF4Q29tcG9uZW50KHNwZWN1bGFyR2xvc3NpbmVzcy5zcGVjdWxhckNvbG9yKTtcclxuICAgICAgICBjb25zdCBtZXRhbGxpYyA9IF9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fU29sdmVNZXRhbGxpYyhkaWZmdXNlUGVyY2VpdmVkQnJpZ2h0bmVzcywgc3BlY3VsYXJQZXJjZWl2ZWRCcmlnaHRuZXNzLCBvbmVNaW51c1NwZWN1bGFyU3RyZW5ndGgpO1xyXG4gICAgICAgIGNvbnN0IGJhc2VDb2xvckZyb21EaWZmdXNlID0gc3BlY3VsYXJHbG9zc2luZXNzLmRpZmZ1c2VDb2xvci5zY2FsZShcclxuICAgICAgICAgICAgb25lTWludXNTcGVjdWxhclN0cmVuZ3RoIC8gKDEuMCAtIF9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRGllbGVjdHJpY1NwZWN1bGFyLnIpIC8gTWF0aC5tYXgoMSAtIG1ldGFsbGljLCBfR0xURk1hdGVyaWFsRXhwb3J0ZXIuX0Vwc2lsb24pXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBiYXNlQ29sb3JGcm9tU3BlY3VsYXIgPSBzcGVjdWxhckdsb3NzaW5lc3Muc3BlY3VsYXJDb2xvclxyXG4gICAgICAgICAgICAuc3VidHJhY3QoX0dMVEZNYXRlcmlhbEV4cG9ydGVyLl9EaWVsZWN0cmljU3BlY3VsYXIuc2NhbGUoMSAtIG1ldGFsbGljKSlcclxuICAgICAgICAgICAgLnNjYWxlKDEgLyBNYXRoLm1heChtZXRhbGxpYywgX0dMVEZNYXRlcmlhbEV4cG9ydGVyLl9FcHNpbG9uKSk7XHJcbiAgICAgICAgbGV0IGJhc2VDb2xvciA9IENvbG9yMy5MZXJwKGJhc2VDb2xvckZyb21EaWZmdXNlLCBiYXNlQ29sb3JGcm9tU3BlY3VsYXIsIG1ldGFsbGljICogbWV0YWxsaWMpO1xyXG4gICAgICAgIGJhc2VDb2xvciA9IGJhc2VDb2xvci5jbGFtcFRvUmVmKDAsIDEsIGJhc2VDb2xvcik7XHJcblxyXG4gICAgICAgIGNvbnN0IG1ldGFsbGljUm91Z2huZXNzOiBfSVBCUk1ldGFsbGljUm91Z2huZXNzID0ge1xyXG4gICAgICAgICAgICBiYXNlQ29sb3I6IGJhc2VDb2xvcixcclxuICAgICAgICAgICAgbWV0YWxsaWM6IG1ldGFsbGljLFxyXG4gICAgICAgICAgICByb3VnaG5lc3M6IDEgLSBzcGVjdWxhckdsb3NzaW5lc3MuZ2xvc3NpbmVzcyxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gbWV0YWxsaWNSb3VnaG5lc3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBzdXJmYWNlIHJlZmxlY3RhbmNlLCBpbmRlcGVuZGVudCBvZiBsaWdodGluZyBjb25kaXRpb25zXHJcbiAgICAgKiBAcGFyYW0gY29sb3IgQ29sb3Igc291cmNlIHRvIGNhbGN1bGF0ZSBicmlnaHRuZXNzIGZyb21cclxuICAgICAqIEByZXR1cm5zIG51bWJlciByZXByZXNlbnRpbmcgdGhlIHBlcmNlaXZlZCBicmlnaHRuZXNzLCBvciB6ZXJvIGlmIGNvbG9yIGlzIHVuZGVmaW5lZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9nZXRQZXJjZWl2ZWRCcmlnaHRuZXNzKGNvbG9yOiBDb2xvcjMpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChjb2xvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KDAuMjk5ICogY29sb3IuciAqIGNvbG9yLnIgKyAwLjU4NyAqIGNvbG9yLmcgKiBjb2xvci5nICsgMC4xMTQgKiBjb2xvci5iICogY29sb3IuYik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbWF4aW11bSBjb2xvciBjb21wb25lbnQgdmFsdWVcclxuICAgICAqIEBwYXJhbSBjb2xvclxyXG4gICAgICogQHJldHVybnMgbWF4aW11bSBjb2xvciBjb21wb25lbnQgdmFsdWUsIG9yIHplcm8gaWYgY29sb3IgaXMgbnVsbCBvciB1bmRlZmluZWRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZ2V0TWF4Q29tcG9uZW50KGNvbG9yOiBDb2xvcjMpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChjb2xvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoY29sb3IuciwgTWF0aC5tYXgoY29sb3IuZywgY29sb3IuYikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnQgYSBQQlJNYXRlcmlhbCAoTWV0YWxsaWMvUm91Z2huZXNzKSB0byBNZXRhbGxpYyBSb3VnaG5lc3MgZmFjdG9yc1xyXG4gICAgICogQHBhcmFtIGJhYnlsb25QQlJNYXRlcmlhbCBCSlMgUEJSIE1ldGFsbGljIFJvdWdobmVzcyBNYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIG1pbWVUeXBlIG1pbWUgdHlwZSB0byB1c2UgZm9yIHRoZSB0ZXh0dXJlc1xyXG4gICAgICogQHBhcmFtIGdsVEZQYnJNZXRhbGxpY1JvdWdobmVzcyBnbFRGIFBCUiBNZXRhbGxpYyBSb3VnaG5lc3MgaW50ZXJmYWNlXHJcbiAgICAgKiBAcGFyYW0gaGFzVGV4dHVyZUNvb3JkcyBzcGVjaWZpZXMgaWYgdGV4dHVyZSBjb29yZGluYXRlcyBhcmUgcHJlc2VudCBvbiB0aGUgc3VibWVzaCB0byBkZXRlcm1pbmUgaWYgdGV4dHVyZXMgc2hvdWxkIGJlIGFwcGxpZWRcclxuICAgICAqIEByZXR1cm5zIGdsVEYgUEJSIE1ldGFsbGljIFJvdWdobmVzcyBmYWN0b3JzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NvbnZlcnRNZXRhbFJvdWdoRmFjdG9yc1RvTWV0YWxsaWNSb3VnaG5lc3NBc3luYyhcclxuICAgICAgICBiYWJ5bG9uUEJSTWF0ZXJpYWw6IFBCUkJhc2VNYXRlcmlhbCxcclxuICAgICAgICBtaW1lVHlwZTogSW1hZ2VNaW1lVHlwZSxcclxuICAgICAgICBnbFRGUGJyTWV0YWxsaWNSb3VnaG5lc3M6IElNYXRlcmlhbFBick1ldGFsbGljUm91Z2huZXNzLFxyXG4gICAgICAgIGhhc1RleHR1cmVDb29yZHM6IGJvb2xlYW5cclxuICAgICk6IFByb21pc2U8X0lQQlJNZXRhbGxpY1JvdWdobmVzcz4ge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gW107XHJcbiAgICAgICAgY29uc3QgYmFzZUNvbG9yID0gYmFieWxvblBCUk1hdGVyaWFsLl9hbGJlZG9Db2xvcjtcclxuICAgICAgICBjb25zdCBtZXRhbGxpYyA9IGJhYnlsb25QQlJNYXRlcmlhbC5fbWV0YWxsaWM7XHJcbiAgICAgICAgY29uc3Qgcm91Z2huZXNzID0gYmFieWxvblBCUk1hdGVyaWFsLl9yb3VnaG5lc3M7XHJcbiAgICAgICAgY29uc3QgbWV0YWxsaWNSb3VnaG5lc3M6IF9JUEJSTWV0YWxsaWNSb3VnaG5lc3MgPSB7XHJcbiAgICAgICAgICAgIGJhc2VDb2xvcjogYmFzZUNvbG9yLFxyXG4gICAgICAgICAgICBtZXRhbGxpYzogbWV0YWxsaWMsXHJcbiAgICAgICAgICAgIHJvdWdobmVzczogcm91Z2huZXNzLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChoYXNUZXh0dXJlQ29vcmRzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFsYmVkb1RleHR1cmUgPSBiYWJ5bG9uUEJSTWF0ZXJpYWwuX2FsYmVkb1RleHR1cmU7XHJcbiAgICAgICAgICAgIGlmIChhbGJlZG9UZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V4cG9ydFRleHR1cmVBc3luYyhiYWJ5bG9uUEJSTWF0ZXJpYWwuX2FsYmVkb1RleHR1cmUhLCBtaW1lVHlwZSkudGhlbigoZ2xURlRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdsVEZUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbFRGUGJyTWV0YWxsaWNSb3VnaG5lc3MuYmFzZUNvbG9yVGV4dHVyZSA9IGdsVEZUZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbWV0YWxsaWNUZXh0dXJlID0gYmFieWxvblBCUk1hdGVyaWFsLl9tZXRhbGxpY1RleHR1cmU7XHJcbiAgICAgICAgICAgIGlmIChtZXRhbGxpY1RleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXhwb3J0VGV4dHVyZUFzeW5jKG1ldGFsbGljVGV4dHVyZSwgbWltZVR5cGUpLnRoZW4oKGdsVEZUZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnbFRGVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xURlBick1ldGFsbGljUm91Z2huZXNzLm1ldGFsbGljUm91Z2huZXNzVGV4dHVyZSA9IGdsVEZUZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG1ldGFsbGljUm91Z2huZXNzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2dldFRleHR1cmVTYW1wbGVyKHRleHR1cmU6IE51bGxhYmxlPEJhc2VUZXh0dXJlPik6IElTYW1wbGVyIHtcclxuICAgICAgICBjb25zdCBzYW1wbGVyOiBJU2FtcGxlciA9IHt9O1xyXG4gICAgICAgIGlmICghdGV4dHVyZSB8fCAhKHRleHR1cmUgaW5zdGFuY2VvZiBUZXh0dXJlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2FtcGxlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHdyYXBTID0gdGhpcy5fZ2V0R0xURlRleHR1cmVXcmFwTW9kZSh0ZXh0dXJlLndyYXBVKTtcclxuICAgICAgICBpZiAod3JhcFMgIT09IFRleHR1cmVXcmFwTW9kZS5SRVBFQVQpIHtcclxuICAgICAgICAgICAgc2FtcGxlci53cmFwUyA9IHdyYXBTO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgd3JhcFQgPSB0aGlzLl9nZXRHTFRGVGV4dHVyZVdyYXBNb2RlKHRleHR1cmUud3JhcFYpO1xyXG4gICAgICAgIGlmICh3cmFwVCAhPT0gVGV4dHVyZVdyYXBNb2RlLlJFUEVBVCkge1xyXG4gICAgICAgICAgICBzYW1wbGVyLndyYXBUID0gd3JhcFQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzd2l0Y2ggKHRleHR1cmUuc2FtcGxpbmdNb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVGV4dHVyZS5MSU5FQVJfTElORUFSOiB7XHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyLm1hZ0ZpbHRlciA9IFRleHR1cmVNYWdGaWx0ZXIuTElORUFSO1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlci5taW5GaWx0ZXIgPSBUZXh0dXJlTWluRmlsdGVyLkxJTkVBUjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVGV4dHVyZS5MSU5FQVJfTkVBUkVTVDoge1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlci5tYWdGaWx0ZXIgPSBUZXh0dXJlTWFnRmlsdGVyLkxJTkVBUjtcclxuICAgICAgICAgICAgICAgIHNhbXBsZXIubWluRmlsdGVyID0gVGV4dHVyZU1pbkZpbHRlci5ORUFSRVNUO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUZXh0dXJlLk5FQVJFU1RfTElORUFSOiB7XHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyLm1hZ0ZpbHRlciA9IFRleHR1cmVNYWdGaWx0ZXIuTkVBUkVTVDtcclxuICAgICAgICAgICAgICAgIHNhbXBsZXIubWluRmlsdGVyID0gVGV4dHVyZU1pbkZpbHRlci5MSU5FQVI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFRleHR1cmUuTkVBUkVTVF9MSU5FQVJfTUlQTElORUFSOiB7XHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyLm1hZ0ZpbHRlciA9IFRleHR1cmVNYWdGaWx0ZXIuTkVBUkVTVDtcclxuICAgICAgICAgICAgICAgIHNhbXBsZXIubWluRmlsdGVyID0gVGV4dHVyZU1pbkZpbHRlci5MSU5FQVJfTUlQTUFQX0xJTkVBUjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVGV4dHVyZS5ORUFSRVNUX05FQVJFU1Q6IHtcclxuICAgICAgICAgICAgICAgIHNhbXBsZXIubWFnRmlsdGVyID0gVGV4dHVyZU1hZ0ZpbHRlci5ORUFSRVNUO1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlci5taW5GaWx0ZXIgPSBUZXh0dXJlTWluRmlsdGVyLk5FQVJFU1Q7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFRleHR1cmUuTkVBUkVTVF9MSU5FQVJfTUlQTkVBUkVTVDoge1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlci5tYWdGaWx0ZXIgPSBUZXh0dXJlTWFnRmlsdGVyLk5FQVJFU1Q7XHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyLm1pbkZpbHRlciA9IFRleHR1cmVNaW5GaWx0ZXIuTElORUFSX01JUE1BUF9ORUFSRVNUO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUZXh0dXJlLkxJTkVBUl9ORUFSRVNUX01JUE5FQVJFU1Q6IHtcclxuICAgICAgICAgICAgICAgIHNhbXBsZXIubWFnRmlsdGVyID0gVGV4dHVyZU1hZ0ZpbHRlci5MSU5FQVI7XHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyLm1pbkZpbHRlciA9IFRleHR1cmVNaW5GaWx0ZXIuTkVBUkVTVF9NSVBNQVBfTkVBUkVTVDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVGV4dHVyZS5MSU5FQVJfTkVBUkVTVF9NSVBMSU5FQVI6IHtcclxuICAgICAgICAgICAgICAgIHNhbXBsZXIubWFnRmlsdGVyID0gVGV4dHVyZU1hZ0ZpbHRlci5MSU5FQVI7XHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyLm1pbkZpbHRlciA9IFRleHR1cmVNaW5GaWx0ZXIuTkVBUkVTVF9NSVBNQVBfTElORUFSO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUZXh0dXJlLk5FQVJFU1RfTkVBUkVTVF9NSVBMSU5FQVI6IHtcclxuICAgICAgICAgICAgICAgIHNhbXBsZXIubWFnRmlsdGVyID0gVGV4dHVyZU1hZ0ZpbHRlci5ORUFSRVNUO1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlci5taW5GaWx0ZXIgPSBUZXh0dXJlTWluRmlsdGVyLk5FQVJFU1RfTUlQTUFQX0xJTkVBUjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVGV4dHVyZS5MSU5FQVJfTElORUFSX01JUExJTkVBUjoge1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlci5tYWdGaWx0ZXIgPSBUZXh0dXJlTWFnRmlsdGVyLkxJTkVBUjtcclxuICAgICAgICAgICAgICAgIHNhbXBsZXIubWluRmlsdGVyID0gVGV4dHVyZU1pbkZpbHRlci5MSU5FQVJfTUlQTUFQX0xJTkVBUjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVGV4dHVyZS5MSU5FQVJfTElORUFSX01JUE5FQVJFU1Q6IHtcclxuICAgICAgICAgICAgICAgIHNhbXBsZXIubWFnRmlsdGVyID0gVGV4dHVyZU1hZ0ZpbHRlci5MSU5FQVI7XHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyLm1pbkZpbHRlciA9IFRleHR1cmVNaW5GaWx0ZXIuTElORUFSX01JUE1BUF9ORUFSRVNUO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUZXh0dXJlLk5FQVJFU1RfTkVBUkVTVF9NSVBORUFSRVNUOiB7XHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyLm1hZ0ZpbHRlciA9IFRleHR1cmVNYWdGaWx0ZXIuTkVBUkVTVDtcclxuICAgICAgICAgICAgICAgIHNhbXBsZXIubWluRmlsdGVyID0gVGV4dHVyZU1pbkZpbHRlci5ORUFSRVNUX01JUE1BUF9ORUFSRVNUO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzYW1wbGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2dldEdMVEZUZXh0dXJlV3JhcE1vZGUod3JhcE1vZGU6IG51bWJlcik6IFRleHR1cmVXcmFwTW9kZSB7XHJcbiAgICAgICAgc3dpdGNoICh3cmFwTW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIFRleHR1cmUuV1JBUF9BRERSRVNTTU9ERToge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFRleHR1cmVXcmFwTW9kZS5SRVBFQVQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUZXh0dXJlLkNMQU1QX0FERFJFU1NNT0RFOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVGV4dHVyZVdyYXBNb2RlLkNMQU1QX1RPX0VER0U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERToge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFRleHR1cmVXcmFwTW9kZS5NSVJST1JFRF9SRVBFQVQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuRXJyb3IoYFVuc3VwcG9ydGVkIFRleHR1cmUgV3JhcCBNb2RlICR7d3JhcE1vZGV9IWApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFRleHR1cmVXcmFwTW9kZS5SRVBFQVQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IGEgUEJSTWF0ZXJpYWwgKFNwZWN1bGFyL0dsb3NzaW5lc3MpIHRvIE1ldGFsbGljIFJvdWdobmVzcyBmYWN0b3JzXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvblBCUk1hdGVyaWFsIEJKUyBQQlIgTWV0YWxsaWMgUm91Z2huZXNzIE1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gbWltZVR5cGUgbWltZSB0eXBlIHRvIHVzZSBmb3IgdGhlIHRleHR1cmVzXHJcbiAgICAgKiBAcGFyYW0gcGJyTWV0YWxsaWNSb3VnaG5lc3MgZ2xURiBQQlIgTWV0YWxsaWMgUm91Z2huZXNzIGludGVyZmFjZVxyXG4gICAgICogQHBhcmFtIGhhc1RleHR1cmVDb29yZHMgc3BlY2lmaWVzIGlmIHRleHR1cmUgY29vcmRpbmF0ZXMgYXJlIHByZXNlbnQgb24gdGhlIHN1Ym1lc2ggdG8gZGV0ZXJtaW5lIGlmIHRleHR1cmVzIHNob3VsZCBiZSBhcHBsaWVkXHJcbiAgICAgKiBAcmV0dXJucyBnbFRGIFBCUiBNZXRhbGxpYyBSb3VnaG5lc3MgZmFjdG9yc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jb252ZXJ0U3BlY0dsb3NzRmFjdG9yc1RvTWV0YWxsaWNSb3VnaG5lc3NBc3luYyhcclxuICAgICAgICBiYWJ5bG9uUEJSTWF0ZXJpYWw6IFBCUkJhc2VNYXRlcmlhbCxcclxuICAgICAgICBtaW1lVHlwZTogSW1hZ2VNaW1lVHlwZSxcclxuICAgICAgICBwYnJNZXRhbGxpY1JvdWdobmVzczogSU1hdGVyaWFsUGJyTWV0YWxsaWNSb3VnaG5lc3MsXHJcbiAgICAgICAgaGFzVGV4dHVyZUNvb3JkczogYm9vbGVhblxyXG4gICAgKTogUHJvbWlzZTxfSVBCUk1ldGFsbGljUm91Z2huZXNzPiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzcGVjR2xvc3M6IF9JUEJSU3BlY3VsYXJHbG9zc2luZXNzID0ge1xyXG4gICAgICAgICAgICAgICAgZGlmZnVzZUNvbG9yOiBiYWJ5bG9uUEJSTWF0ZXJpYWwuX2FsYmVkb0NvbG9yLFxyXG4gICAgICAgICAgICAgICAgc3BlY3VsYXJDb2xvcjogYmFieWxvblBCUk1hdGVyaWFsLl9yZWZsZWN0aXZpdHlDb2xvcixcclxuICAgICAgICAgICAgICAgIGdsb3NzaW5lc3M6IGJhYnlsb25QQlJNYXRlcmlhbC5fbWljcm9TdXJmYWNlLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCBhbGJlZG9UZXh0dXJlID0gYmFieWxvblBCUk1hdGVyaWFsLl9hbGJlZG9UZXh0dXJlO1xyXG4gICAgICAgICAgICBjb25zdCByZWZsZWN0aXZpdHlUZXh0dXJlID0gYmFieWxvblBCUk1hdGVyaWFsLl9yZWZsZWN0aXZpdHlUZXh0dXJlO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VNaWNyb3N1cmZhY2VGcm9tUmVmbGVjdGl2aXR5TWFwQWxwaGEgPSBiYWJ5bG9uUEJSTWF0ZXJpYWwuX3VzZU1pY3JvU3VyZmFjZUZyb21SZWZsZWN0aXZpdHlNYXBBbHBoYTtcclxuICAgICAgICAgICAgaWYgKHJlZmxlY3Rpdml0eVRleHR1cmUgJiYgIXVzZU1pY3Jvc3VyZmFjZUZyb21SZWZsZWN0aXZpdHlNYXBBbHBoYSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwiX0NvbnZlcnRQQlJNYXRlcmlhbDogR2xvc3NpbmVzcyB2YWx1ZXMgbm90IGluY2x1ZGVkIGluIHRoZSByZWZsZWN0aXZpdHkgdGV4dHVyZSBhcmUgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKChhbGJlZG9UZXh0dXJlIHx8IHJlZmxlY3Rpdml0eVRleHR1cmUpICYmIGhhc1RleHR1cmVDb29yZHMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNhbXBsZXJJbmRleCA9IHRoaXMuX2V4cG9ydFRleHR1cmVTYW1wbGVyKGFsYmVkb1RleHR1cmUgfHwgcmVmbGVjdGl2aXR5VGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udmVydFNwZWN1bGFyR2xvc3NpbmVzc1RleHR1cmVzVG9NZXRhbGxpY1JvdWdobmVzc0FzeW5jKGFsYmVkb1RleHR1cmUsIHJlZmxlY3Rpdml0eVRleHR1cmUsIHNwZWNHbG9zcywgbWltZVR5cGUpLnRoZW4oKG1ldGFsbGljUm91Z2huZXNzRmFjdG9ycykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHR1cmVzID0gdGhpcy5fZXhwb3J0ZXIuX3RleHR1cmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXRhbGxpY1JvdWdobmVzc0ZhY3RvcnMuYmFzZUNvbG9yVGV4dHVyZURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VJbmRleCA9IHRoaXMuX2V4cG9ydEltYWdlKGBiYXNlQ29sb3Ike3RleHR1cmVzLmxlbmd0aH1gLCBtaW1lVHlwZSwgbWV0YWxsaWNSb3VnaG5lc3NGYWN0b3JzLmJhc2VDb2xvclRleHR1cmVEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGJyTWV0YWxsaWNSb3VnaG5lc3MuYmFzZUNvbG9yVGV4dHVyZSA9IHRoaXMuX2V4cG9ydFRleHR1cmVJbmZvKGltYWdlSW5kZXgsIHNhbXBsZXJJbmRleCwgYWxiZWRvVGV4dHVyZT8uY29vcmRpbmF0ZXNJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXRhbGxpY1JvdWdobmVzc0ZhY3RvcnMubWV0YWxsaWNSb3VnaG5lc3NUZXh0dXJlRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWFnZUluZGV4ID0gdGhpcy5fZXhwb3J0SW1hZ2UoYG1ldGFsbGljUm91Z2huZXNzJHt0ZXh0dXJlcy5sZW5ndGh9YCwgbWltZVR5cGUsIG1ldGFsbGljUm91Z2huZXNzRmFjdG9ycy5tZXRhbGxpY1JvdWdobmVzc1RleHR1cmVEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGJyTWV0YWxsaWNSb3VnaG5lc3MubWV0YWxsaWNSb3VnaG5lc3NUZXh0dXJlID0gdGhpcy5fZXhwb3J0VGV4dHVyZUluZm8oaW1hZ2VJbmRleCwgc2FtcGxlckluZGV4LCByZWZsZWN0aXZpdHlUZXh0dXJlPy5jb29yZGluYXRlc0luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXRhbGxpY1JvdWdobmVzc0ZhY3RvcnM7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb252ZXJ0U3BlY3VsYXJHbG9zc2luZXNzVG9NZXRhbGxpY1JvdWdobmVzcyhzcGVjR2xvc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIEJhYnlsb24gUEJSIEJhc2UgTWF0ZXJpYWwgdG8gYSBnbFRGIE1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvblBCUk1hdGVyaWFsIEJKUyBQQlIgQmFzZSBNYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIG1pbWVUeXBlIG1pbWUgdHlwZSB0byB1c2UgZm9yIHRoZSB0ZXh0dXJlc1xyXG4gICAgICogQHBhcmFtIGhhc1RleHR1cmVDb29yZHMgc3BlY2lmaWVzIGlmIHRleHR1cmUgY29vcmRpbmF0ZXMgYXJlIHByZXNlbnQgb24gdGhlIHN1Ym1lc2ggdG8gZGV0ZXJtaW5lIGlmIHRleHR1cmVzIHNob3VsZCBiZSBhcHBsaWVkXHJcbiAgICAgKiBAcmV0dXJucyBhc3luYyBnbFRGIE1hdGVyaWFsIHJlcHJlc2VudGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfY29udmVydFBCUk1hdGVyaWFsQXN5bmMoYmFieWxvblBCUk1hdGVyaWFsOiBQQlJCYXNlTWF0ZXJpYWwsIG1pbWVUeXBlOiBJbWFnZU1pbWVUeXBlLCBoYXNUZXh0dXJlQ29vcmRzOiBib29sZWFuKTogUHJvbWlzZTxJTWF0ZXJpYWw+IHtcclxuICAgICAgICBjb25zdCBnbFRGUGJyTWV0YWxsaWNSb3VnaG5lc3M6IElNYXRlcmlhbFBick1ldGFsbGljUm91Z2huZXNzID0ge307XHJcbiAgICAgICAgY29uc3QgZ2xURk1hdGVyaWFsOiBJTWF0ZXJpYWwgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IGJhYnlsb25QQlJNYXRlcmlhbC5uYW1lLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgdXNlTWV0YWxsaWNSb3VnaG5lc3MgPSBiYWJ5bG9uUEJSTWF0ZXJpYWwuaXNNZXRhbGxpY1dvcmtmbG93KCk7XHJcblxyXG4gICAgICAgIGlmICh1c2VNZXRhbGxpY1JvdWdobmVzcykge1xyXG4gICAgICAgICAgICBjb25zdCBhbGJlZG9Db2xvciA9IGJhYnlsb25QQlJNYXRlcmlhbC5fYWxiZWRvQ29sb3I7XHJcbiAgICAgICAgICAgIGNvbnN0IGFscGhhID0gYmFieWxvblBCUk1hdGVyaWFsLmFscGhhO1xyXG4gICAgICAgICAgICBpZiAoYWxiZWRvQ29sb3IpIHtcclxuICAgICAgICAgICAgICAgIGdsVEZQYnJNZXRhbGxpY1JvdWdobmVzcy5iYXNlQ29sb3JGYWN0b3IgPSBbYWxiZWRvQ29sb3IuciwgYWxiZWRvQ29sb3IuZywgYWxiZWRvQ29sb3IuYiwgYWxwaGFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb252ZXJ0TWV0YWxSb3VnaEZhY3RvcnNUb01ldGFsbGljUm91Z2huZXNzQXN5bmMoYmFieWxvblBCUk1hdGVyaWFsLCBtaW1lVHlwZSwgZ2xURlBick1ldGFsbGljUm91Z2huZXNzLCBoYXNUZXh0dXJlQ29vcmRzKS50aGVuKChtZXRhbGxpY1JvdWdobmVzcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NldE1ldGFsbGljUm91Z2huZXNzUGJyTWF0ZXJpYWwobWV0YWxsaWNSb3VnaG5lc3MsIGJhYnlsb25QQlJNYXRlcmlhbCwgZ2xURk1hdGVyaWFsLCBnbFRGUGJyTWV0YWxsaWNSb3VnaG5lc3MsIG1pbWVUeXBlLCBoYXNUZXh0dXJlQ29vcmRzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnZlcnRTcGVjR2xvc3NGYWN0b3JzVG9NZXRhbGxpY1JvdWdobmVzc0FzeW5jKGJhYnlsb25QQlJNYXRlcmlhbCwgbWltZVR5cGUsIGdsVEZQYnJNZXRhbGxpY1JvdWdobmVzcywgaGFzVGV4dHVyZUNvb3JkcykudGhlbigobWV0YWxsaWNSb3VnaG5lc3MpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXRNZXRhbGxpY1JvdWdobmVzc1Bick1hdGVyaWFsKG1ldGFsbGljUm91Z2huZXNzLCBiYWJ5bG9uUEJSTWF0ZXJpYWwsIGdsVEZNYXRlcmlhbCwgZ2xURlBick1ldGFsbGljUm91Z2huZXNzLCBtaW1lVHlwZSwgaGFzVGV4dHVyZUNvb3Jkcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zZXRNZXRhbGxpY1JvdWdobmVzc1Bick1hdGVyaWFsKFxyXG4gICAgICAgIG1ldGFsbGljUm91Z2huZXNzOiBOdWxsYWJsZTxfSVBCUk1ldGFsbGljUm91Z2huZXNzPixcclxuICAgICAgICBiYWJ5bG9uUEJSTWF0ZXJpYWw6IFBCUkJhc2VNYXRlcmlhbCxcclxuICAgICAgICBnbFRGTWF0ZXJpYWw6IElNYXRlcmlhbCxcclxuICAgICAgICBnbFRGUGJyTWV0YWxsaWNSb3VnaG5lc3M6IElNYXRlcmlhbFBick1ldGFsbGljUm91Z2huZXNzLFxyXG4gICAgICAgIG1pbWVUeXBlOiBJbWFnZU1pbWVUeXBlLFxyXG4gICAgICAgIGhhc1RleHR1cmVDb29yZHM6IGJvb2xlYW5cclxuICAgICk6IFByb21pc2U8SU1hdGVyaWFsPiB7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxNYXAgPSB0aGlzLl9leHBvcnRlci5fbWF0ZXJpYWxNYXA7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxzID0gdGhpcy5fZXhwb3J0ZXIuX21hdGVyaWFscztcclxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xyXG4gICAgICAgIGlmIChtZXRhbGxpY1JvdWdobmVzcykge1xyXG4gICAgICAgICAgICBfR0xURk1hdGVyaWFsRXhwb3J0ZXIuX1NldEFscGhhTW9kZShnbFRGTWF0ZXJpYWwsIGJhYnlsb25QQlJNYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICEoXHJcbiAgICAgICAgICAgICAgICAgICAgX0dMVEZNYXRlcmlhbEV4cG9ydGVyLl9GdXp6eUVxdWFscyhtZXRhbGxpY1JvdWdobmVzcy5iYXNlQ29sb3IsIENvbG9yMy5XaGl0ZSgpLCBfR0xURk1hdGVyaWFsRXhwb3J0ZXIuX0Vwc2lsb24pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvblBCUk1hdGVyaWFsLmFscGhhID49IF9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRXBzaWxvblxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGdsVEZQYnJNZXRhbGxpY1JvdWdobmVzcy5iYXNlQ29sb3JGYWN0b3IgPSBbbWV0YWxsaWNSb3VnaG5lc3MuYmFzZUNvbG9yLnIsIG1ldGFsbGljUm91Z2huZXNzLmJhc2VDb2xvci5nLCBtZXRhbGxpY1JvdWdobmVzcy5iYXNlQ29sb3IuYiwgYmFieWxvblBCUk1hdGVyaWFsLmFscGhhXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1ldGFsbGljUm91Z2huZXNzLm1ldGFsbGljICE9IG51bGwgJiYgbWV0YWxsaWNSb3VnaG5lc3MubWV0YWxsaWMgIT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGdsVEZQYnJNZXRhbGxpY1JvdWdobmVzcy5tZXRhbGxpY0ZhY3RvciA9IG1ldGFsbGljUm91Z2huZXNzLm1ldGFsbGljO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtZXRhbGxpY1JvdWdobmVzcy5yb3VnaG5lc3MgIT0gbnVsbCAmJiBtZXRhbGxpY1JvdWdobmVzcy5yb3VnaG5lc3MgIT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGdsVEZQYnJNZXRhbGxpY1JvdWdobmVzcy5yb3VnaG5lc3NGYWN0b3IgPSBtZXRhbGxpY1JvdWdobmVzcy5yb3VnaG5lc3M7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uUEJSTWF0ZXJpYWwuYmFja0ZhY2VDdWxsaW5nICE9IG51bGwgJiYgIWJhYnlsb25QQlJNYXRlcmlhbC5iYWNrRmFjZUN1bGxpbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmICghYmFieWxvblBCUk1hdGVyaWFsLl90d29TaWRlZExpZ2h0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9vbHMuV2FybihiYWJ5bG9uUEJSTWF0ZXJpYWwubmFtZSArIFwiOiBCYWNrLWZhY2UgY3VsbGluZyBkaXNhYmxlZCBhbmQgdHdvLXNpZGVkIGxpZ2h0aW5nIGRpc2FibGVkIGlzIG5vdCBzdXBwb3J0ZWQgaW4gZ2xURi5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnbFRGTWF0ZXJpYWwuZG91YmxlU2lkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaGFzVGV4dHVyZUNvb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnVtcFRleHR1cmUgPSBiYWJ5bG9uUEJSTWF0ZXJpYWwuX2J1bXBUZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1bXBUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuX2V4cG9ydFRleHR1cmVBc3luYyhidW1wVGV4dHVyZSwgbWltZVR5cGUpLnRoZW4oKGdsVEZUZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnbFRGVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xURk1hdGVyaWFsLm5vcm1hbFRleHR1cmUgPSBnbFRGVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidW1wVGV4dHVyZS5sZXZlbCAhPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsVEZNYXRlcmlhbC5ub3JtYWxUZXh0dXJlLnNjYWxlID0gYnVtcFRleHR1cmUubGV2ZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYW1iaWVudFRleHR1cmUgPSBiYWJ5bG9uUEJSTWF0ZXJpYWwuX2FtYmllbnRUZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFtYmllbnRUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuX2V4cG9ydFRleHR1cmVBc3luYyhhbWJpZW50VGV4dHVyZSwgbWltZVR5cGUpLnRoZW4oKGdsVEZUZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnbFRGVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2NjbHVzaW9uVGV4dHVyZTogSU1hdGVyaWFsT2NjbHVzaW9uVGV4dHVyZUluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGdsVEZUZXh0dXJlLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleENvb3JkOiBnbFRGVGV4dHVyZS50ZXhDb29yZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlbnNpb25zOiBnbFRGVGV4dHVyZS5leHRlbnNpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbFRGTWF0ZXJpYWwub2NjbHVzaW9uVGV4dHVyZSA9IG9jY2x1c2lvblRleHR1cmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbWJpZW50VGV4dHVyZVN0cmVuZ3RoID0gYmFieWxvblBCUk1hdGVyaWFsLl9hbWJpZW50VGV4dHVyZVN0cmVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFtYmllbnRUZXh0dXJlU3RyZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvY2NsdXNpb25UZXh0dXJlLnN0cmVuZ3RoID0gYW1iaWVudFRleHR1cmVTdHJlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbWlzc2l2ZVRleHR1cmUgPSBiYWJ5bG9uUEJSTWF0ZXJpYWwuX2VtaXNzaXZlVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIGlmIChlbWlzc2l2ZVRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5fZXhwb3J0VGV4dHVyZUFzeW5jKGVtaXNzaXZlVGV4dHVyZSwgbWltZVR5cGUpLnRoZW4oKGdsVEZUZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnbFRGVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xURk1hdGVyaWFsLmVtaXNzaXZlVGV4dHVyZSA9IGdsVEZUZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChwcm9taXNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBlbWlzc2l2ZUNvbG9yID0gYmFieWxvblBCUk1hdGVyaWFsLl9lbWlzc2l2ZUNvbG9yO1xyXG4gICAgICAgICAgICBpZiAoIV9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRnV6enlFcXVhbHMoZW1pc3NpdmVDb2xvciwgQ29sb3IzLkJsYWNrKCksIF9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRXBzaWxvbikpIHtcclxuICAgICAgICAgICAgICAgIGdsVEZNYXRlcmlhbC5lbWlzc2l2ZUZhY3RvciA9IGVtaXNzaXZlQ29sb3IuYXNBcnJheSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnbFRGTWF0ZXJpYWwucGJyTWV0YWxsaWNSb3VnaG5lc3MgPSBnbFRGUGJyTWV0YWxsaWNSb3VnaG5lc3M7XHJcbiAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKGdsVEZNYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsTWFwW2JhYnlsb25QQlJNYXRlcmlhbC51bmlxdWVJZF0gPSBtYXRlcmlhbHMubGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9maW5pc2hNYXRlcmlhbChwcm9taXNlcywgZ2xURk1hdGVyaWFsLCBiYWJ5bG9uUEJSTWF0ZXJpYWwsIG1pbWVUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXRQaXhlbHNGcm9tVGV4dHVyZShiYWJ5bG9uVGV4dHVyZTogQmFzZVRleHR1cmUpOiBQcm9taXNlPE51bGxhYmxlPFVpbnQ4QXJyYXkgfCBGbG9hdDMyQXJyYXk+PiB7XHJcbiAgICAgICAgY29uc3QgcGl4ZWxzID1cclxuICAgICAgICAgICAgYmFieWxvblRleHR1cmUudGV4dHVyZVR5cGUgPT09IENvbnN0YW50cy5URVhUVVJFVFlQRV9VTlNJR05FRF9CWVRFXHJcbiAgICAgICAgICAgICAgICA/IChiYWJ5bG9uVGV4dHVyZS5yZWFkUGl4ZWxzKCkgYXMgUHJvbWlzZTxVaW50OEFycmF5PilcclxuICAgICAgICAgICAgICAgIDogKGJhYnlsb25UZXh0dXJlLnJlYWRQaXhlbHMoKSBhcyBQcm9taXNlPEZsb2F0MzJBcnJheT4pO1xyXG4gICAgICAgIHJldHVybiBwaXhlbHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHRyYWN0cyBhIHRleHR1cmUgZnJvbSBhIEJhYnlsb24gdGV4dHVyZSBpbnRvIGZpbGUgZGF0YSBhbmQgZ2xURiBkYXRhXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvblRleHR1cmUgQmFieWxvbiB0ZXh0dXJlIHRvIGV4dHJhY3RcclxuICAgICAqIEBwYXJhbSBtaW1lVHlwZSBNaW1lIFR5cGUgb2YgdGhlIGJhYnlsb25UZXh0dXJlXHJcbiAgICAgKiBAcmV0dXJucyBnbFRGIHRleHR1cmUgaW5mbywgb3IgbnVsbCBpZiB0aGUgdGV4dHVyZSBmb3JtYXQgaXMgbm90IHN1cHBvcnRlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2V4cG9ydFRleHR1cmVBc3luYyhiYWJ5bG9uVGV4dHVyZTogQmFzZVRleHR1cmUsIG1pbWVUeXBlOiBJbWFnZU1pbWVUeXBlKTogUHJvbWlzZTxOdWxsYWJsZTxJVGV4dHVyZUluZm8+PiB7XHJcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uUHJvbWlzZSA9IHRoaXMuX2V4cG9ydGVyLl9leHRlbnNpb25zUHJlRXhwb3J0VGV4dHVyZUFzeW5jKFwiZXhwb3J0ZXJcIiwgYmFieWxvblRleHR1cmUgYXMgVGV4dHVyZSwgbWltZVR5cGUpO1xyXG4gICAgICAgIGlmICghZXh0ZW5zaW9uUHJvbWlzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXhwb3J0VGV4dHVyZUluZm9Bc3luYyhiYWJ5bG9uVGV4dHVyZSwgbWltZVR5cGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvblByb21pc2UudGhlbigodGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9leHBvcnRUZXh0dXJlSW5mb0FzeW5jKGJhYnlsb25UZXh0dXJlLCBtaW1lVHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V4cG9ydFRleHR1cmVJbmZvQXN5bmModGV4dHVyZSwgbWltZVR5cGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBfZXhwb3J0VGV4dHVyZUluZm9Bc3luYyhiYWJ5bG9uVGV4dHVyZTogQmFzZVRleHR1cmUsIG1pbWVUeXBlOiBJbWFnZU1pbWVUeXBlKTogUHJvbWlzZTxOdWxsYWJsZTxJVGV4dHVyZUluZm8+PiB7XHJcbiAgICAgICAgY29uc3QgdGV4dHVyZVVpZCA9IGJhYnlsb25UZXh0dXJlLnVpZDtcclxuICAgICAgICBpZiAoISh0ZXh0dXJlVWlkIGluIHRoaXMuX3RleHR1cmVNYXApKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBpeGVscyA9IGF3YWl0IHRoaXMuX2dldFBpeGVsc0Zyb21UZXh0dXJlKGJhYnlsb25UZXh0dXJlKTtcclxuICAgICAgICAgICAgaWYgKCFwaXhlbHMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzYW1wbGVySW5kZXggPSB0aGlzLl9leHBvcnRUZXh0dXJlU2FtcGxlcihiYWJ5bG9uVGV4dHVyZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBQcmVzZXJ2ZSB0ZXh0dXJlIG1pbWUgdHlwZSBpZiBkZWZpbmVkXHJcbiAgICAgICAgICAgIGNvbnN0IHRleHR1cmVNaW1lVHlwZSA9IChiYWJ5bG9uVGV4dHVyZSBhcyBUZXh0dXJlKS5taW1lVHlwZTtcclxuICAgICAgICAgICAgaWYgKHRleHR1cmVNaW1lVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0ZXh0dXJlTWltZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaW1hZ2UvanBlZ1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpbWFnZS9wbmdcIjpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaW1hZ2Uvd2VicFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW1lVHlwZSA9IHRleHR1cmVNaW1lVHlwZSBhcyBJbWFnZU1pbWVUeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb29scy5XYXJuKGBVbnN1cHBvcnRlZCBtZWRpYSB0eXBlOiAke3RleHR1cmVNaW1lVHlwZX1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGludGVybmFsVGV4dHVyZVRvSW1hZ2UgPSB0aGlzLl9pbnRlcm5hbFRleHR1cmVUb0ltYWdlO1xyXG4gICAgICAgICAgICBjb25zdCBpbnRlcm5hbFRleHR1cmVVbmlxdWVJZCA9IGJhYnlsb25UZXh0dXJlLmdldEludGVybmFsVGV4dHVyZSgpIS51bmlxdWVJZDtcclxuICAgICAgICAgICAgaW50ZXJuYWxUZXh0dXJlVG9JbWFnZVtpbnRlcm5hbFRleHR1cmVVbmlxdWVJZF0gfHw9IHt9O1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2VJbmRleFByb21pc2UgPSBpbnRlcm5hbFRleHR1cmVUb0ltYWdlW2ludGVybmFsVGV4dHVyZVVuaXF1ZUlkXVttaW1lVHlwZV07XHJcbiAgICAgICAgICAgIGlmIChpbWFnZUluZGV4UHJvbWlzZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzaXplID0gYmFieWxvblRleHR1cmUuZ2V0U2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VJbmRleFByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLl9nZXRJbWFnZURhdGFBc3luYyhwaXhlbHMsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0LCBtaW1lVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V4cG9ydEltYWdlKGJhYnlsb25UZXh0dXJlLm5hbWUsIG1pbWVUeXBlLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgICAgICBpbnRlcm5hbFRleHR1cmVUb0ltYWdlW2ludGVybmFsVGV4dHVyZVVuaXF1ZUlkXVttaW1lVHlwZV0gPSBpbWFnZUluZGV4UHJvbWlzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdGV4dHVyZUluZm8gPSB0aGlzLl9leHBvcnRUZXh0dXJlSW5mbyhhd2FpdCBpbWFnZUluZGV4UHJvbWlzZSwgc2FtcGxlckluZGV4LCBiYWJ5bG9uVGV4dHVyZS5jb29yZGluYXRlc0luZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZU1hcFt0ZXh0dXJlVWlkXSA9IHRleHR1cmVJbmZvO1xyXG4gICAgICAgICAgICB0aGlzLl9leHBvcnRlci5fZXh0ZW5zaW9uc1Bvc3RFeHBvcnRUZXh0dXJlcyhcImV4cG9ydGVyXCIsIHRoaXMuX3RleHR1cmVNYXBbdGV4dHVyZVVpZF0sIGJhYnlsb25UZXh0dXJlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0dXJlTWFwW3RleHR1cmVVaWRdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2V4cG9ydEltYWdlKG5hbWU6IHN0cmluZywgbWltZVR5cGU6IEltYWdlTWltZVR5cGUsIGRhdGE6IEFycmF5QnVmZmVyKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCBpbWFnZURhdGEgPSB0aGlzLl9leHBvcnRlci5faW1hZ2VEYXRhO1xyXG5cclxuICAgICAgICBjb25zdCBiYXNlTmFtZSA9IG5hbWUucmVwbGFjZSgvXFwuXFwvfFxcL3xcXC5cXFxcfFxcXFwvZywgXCJfXCIpO1xyXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IGdldEZpbGVFeHRlbnNpb25Gcm9tTWltZVR5cGUobWltZVR5cGUpO1xyXG4gICAgICAgIGxldCBmaWxlTmFtZSA9IGJhc2VOYW1lICsgZXh0ZW5zaW9uO1xyXG4gICAgICAgIGlmIChmaWxlTmFtZSBpbiBpbWFnZURhdGEpIHtcclxuICAgICAgICAgICAgZmlsZU5hbWUgPSBgJHtiYXNlTmFtZX1fJHtUb29scy5SYW5kb21JZCgpfSR7ZXh0ZW5zaW9ufWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbWFnZURhdGFbZmlsZU5hbWVdID0ge1xyXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICBtaW1lVHlwZTogbWltZVR5cGUsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgaW1hZ2VzID0gdGhpcy5fZXhwb3J0ZXIuX2ltYWdlcztcclxuICAgICAgICBpbWFnZXMucHVzaCh7XHJcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgIHVyaTogZmlsZU5hbWUsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpbWFnZXMubGVuZ3RoIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9leHBvcnRUZXh0dXJlSW5mbyhpbWFnZUluZGV4OiBudW1iZXIsIHNhbXBsZXJJbmRleDogbnVtYmVyLCBjb29yZGluYXRlc0luZGV4PzogbnVtYmVyKTogSVRleHR1cmVJbmZvIHtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlcyA9IHRoaXMuX2V4cG9ydGVyLl90ZXh0dXJlcztcclxuICAgICAgICBsZXQgdGV4dHVyZUluZGV4ID0gdGV4dHVyZXMuZmluZEluZGV4KCh0KSA9PiB0LnNhbXBsZXIgPT0gc2FtcGxlckluZGV4ICYmIHQuc291cmNlID09PSBpbWFnZUluZGV4KTtcclxuICAgICAgICBpZiAodGV4dHVyZUluZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICB0ZXh0dXJlSW5kZXggPSB0ZXh0dXJlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRleHR1cmVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgc291cmNlOiBpbWFnZUluZGV4LFxyXG4gICAgICAgICAgICAgICAgc2FtcGxlcjogc2FtcGxlckluZGV4LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRleHR1cmVJbmZvOiBJVGV4dHVyZUluZm8gPSB7IGluZGV4OiB0ZXh0dXJlSW5kZXggfTtcclxuICAgICAgICBpZiAoY29vcmRpbmF0ZXNJbmRleCkge1xyXG4gICAgICAgICAgICB0ZXh0dXJlSW5mby50ZXhDb29yZCA9IGNvb3JkaW5hdGVzSW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0ZXh0dXJlSW5mbztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9leHBvcnRUZXh0dXJlU2FtcGxlcih0ZXh0dXJlOiBOdWxsYWJsZTxCYXNlVGV4dHVyZT4pOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHNhbXBsZXIgPSB0aGlzLl9nZXRUZXh0dXJlU2FtcGxlcih0ZXh0dXJlKTtcclxuXHJcbiAgICAgICAgLy8gaWYgYSBwcmUtZXhpc3Rpbmcgc2FtcGxlciB3aXRoIGlkZW50aWNhbCBwYXJhbWV0ZXJzIGV4aXN0cywgdGhlbiByZXVzZSB0aGUgcHJldmlvdXMgc2FtcGxlclxyXG4gICAgICAgIGNvbnN0IHNhbXBsZXJzID0gdGhpcy5fZXhwb3J0ZXIuX3NhbXBsZXJzO1xyXG4gICAgICAgIGNvbnN0IHNhbXBsZXJJbmRleCA9IHNhbXBsZXJzLmZpbmRJbmRleChcclxuICAgICAgICAgICAgKHMpID0+IHMubWluRmlsdGVyID09PSBzYW1wbGVyLm1pbkZpbHRlciAmJiBzLm1hZ0ZpbHRlciA9PT0gc2FtcGxlci5tYWdGaWx0ZXIgJiYgcy53cmFwUyA9PT0gc2FtcGxlci53cmFwUyAmJiBzLndyYXBUID09PSBzYW1wbGVyLndyYXBUXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoc2FtcGxlckluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2FtcGxlckluZGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2FtcGxlcnMucHVzaChzYW1wbGVyKTtcclxuICAgICAgICByZXR1cm4gc2FtcGxlcnMubGVuZ3RoIC0gMTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgdHlwZSB7IE5vZGUgfSBmcm9tIFwiY29yZS9ub2RlXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgdHlwZSB7IEFuaW1hdGlvbiB9IGZyb20gXCJjb3JlL0FuaW1hdGlvbnMvYW5pbWF0aW9uXCI7XHJcbmltcG9ydCB0eXBlIHsgR0xURkRhdGEgfSBmcm9tIFwiLi9nbFRGRGF0YVwiO1xyXG5pbXBvcnQgeyBfRXhwb3J0ZXIgfSBmcm9tIFwiLi9nbFRGRXhwb3J0ZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBIb2xkcyBhIGNvbGxlY3Rpb24gb2YgZXhwb3J0ZXIgb3B0aW9ucyBhbmQgcGFyYW1ldGVyc1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJRXhwb3J0T3B0aW9ucyB7XHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHdoaWNoIGluZGljYXRlcyB3aGV0aGVyIGEgYmFieWxvbiBub2RlIHNob3VsZCBiZSBleHBvcnRlZCBvciBub3RcclxuICAgICAqIEBwYXJhbSBub2RlIHNvdXJjZSBCYWJ5bG9uIG5vZGUuIEl0IGlzIHVzZWQgdG8gY2hlY2sgd2hldGhlciBpdCBzaG91bGQgYmUgZXhwb3J0ZWQgdG8gZ2xURiBvciBub3RcclxuICAgICAqIEByZXR1cm5zIGJvb2xlYW4sIHdoaWNoIGluZGljYXRlcyB3aGV0aGVyIHRoZSBub2RlIHNob3VsZCBiZSBleHBvcnRlZCAodHJ1ZSkgb3Igbm90IChmYWxzZSlcclxuICAgICAqL1xyXG4gICAgc2hvdWxkRXhwb3J0Tm9kZT8obm9kZTogTm9kZSk6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB3aGljaCBpbmRpY2F0ZXMgd2hldGhlciBhbiBhbmltYXRpb24gb24gdGhlIHNjZW5lIHNob3VsZCBiZSBleHBvcnRlZCBvciBub3RcclxuICAgICAqIEBwYXJhbSBhbmltYXRpb24gc291cmNlIGFuaW1hdGlvblxyXG4gICAgICogQHJldHVybnMgYm9vbGVhbiwgd2hpY2ggaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGFuaW1hdGlvbiBzaG91bGQgYmUgZXhwb3J0ZWQgKHRydWUpIG9yIG5vdCAoZmFsc2UpXHJcbiAgICAgKi9cclxuICAgIHNob3VsZEV4cG9ydEFuaW1hdGlvbj8oYW5pbWF0aW9uOiBBbmltYXRpb24pOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBleHRyYWN0IHRoZSBwYXJ0IG9mIG5vZGUncyBtZXRhZGF0YSB0aGF0IHdpbGwgYmUgZXhwb3J0ZWQgaW50byBnbFRGIG5vZGUgZXh0cmFzXHJcbiAgICAgKiBAcGFyYW0gbWV0YWRhdGEgc291cmNlIG1ldGFkYXRhIHRvIHJlYWQgZnJvbVxyXG4gICAgICogQHJldHVybnMgdGhlIGRhdGEgdG8gc3RvcmUgdG8gZ2xURiBub2RlIGV4dHJhc1xyXG4gICAgICovXHJcbiAgICBtZXRhZGF0YVNlbGVjdG9yPyhtZXRhZGF0YTogYW55KTogYW55O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHNhbXBsZSByYXRlIHRvIGJha2UgYW5pbWF0aW9uIGN1cnZlcy4gRGVmYXVsdHMgdG8gMSAvIDYwLlxyXG4gICAgICovXHJcbiAgICBhbmltYXRpb25TYW1wbGVSYXRlPzogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmVnaW4gc2VyaWFsaXphdGlvbiB3aXRob3V0IHdhaXRpbmcgZm9yIHRoZSBzY2VuZSB0byBiZSByZWFkeS4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydFdpdGhvdXRXYWl0aW5nRm9yU2NlbmU/OiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5kaWNhdGVzIGlmIHVudXNlZCB2ZXJ0ZXggdXYgYXR0cmlidXRlcyBzaG91bGQgYmUgaW5jbHVkZWQgaW4gZXhwb3J0LiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgZXhwb3J0VW51c2VkVVZzPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBuby1vcCByb290IG5vZGVzIHdoZW4gcG9zc2libGUuIERlZmF1bHRzIHRvIHRydWUuXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZU5vb3BSb290Tm9kZXM/OiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5kaWNhdGVzIGlmIGNvb3JkaW5hdGUgc3lzdGVtIHN3YXBwaW5nIHJvb3Qgbm9kZXMgc2hvdWxkIGJlIGluY2x1ZGVkIGluIGV4cG9ydC4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBQbGVhc2UgdXNlIHJlbW92ZU5vb3BSb290Tm9kZXMgaW5zdGVhZFxyXG4gICAgICovXHJcbiAgICBpbmNsdWRlQ29vcmRpbmF0ZVN5c3RlbUNvbnZlcnNpb25Ob2Rlcz86IGJvb2xlYW47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBmb3IgZ2VuZXJhdGluZyBnbFRGIGRhdGEgZnJvbSBhIEJhYnlsb24gc2NlbmUuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR0xURjJFeHBvcnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBvcnRzIHRoZSBnZW9tZXRyeSBvZiB0aGUgc2NlbmUgdG8gLmdsdGYgZmlsZSBmb3JtYXQgYXN5bmNocm9ub3VzbHlcclxuICAgICAqIEBwYXJhbSBzY2VuZSBCYWJ5bG9uIHNjZW5lIHdpdGggc2NlbmUgaGllcmFyY2h5IGluZm9ybWF0aW9uXHJcbiAgICAgKiBAcGFyYW0gZmlsZVByZWZpeCBGaWxlIHByZWZpeCB0byB1c2Ugd2hlbiBnZW5lcmF0aW5nIHRoZSBnbFRGIGZpbGVcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIEV4cG9ydGVyIG9wdGlvbnNcclxuICAgICAqIEByZXR1cm5zIFJldHVybnMgYW4gb2JqZWN0IHdpdGggYSAuZ2x0ZiBmaWxlIGFuZCBhc3NvY2lhdGVzIHRleHR1cmUgbmFtZXNcclxuICAgICAqIGFzIGtleXMgYW5kIHRoZWlyIGRhdGEgYW5kIHBhdGhzIGFzIHZhbHVlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdMVEZBc3luYyhzY2VuZTogU2NlbmUsIGZpbGVQcmVmaXg6IHN0cmluZywgb3B0aW9ucz86IElFeHBvcnRPcHRpb25zKTogUHJvbWlzZTxHTFRGRGF0YT4ge1xyXG4gICAgICAgIHJldHVybiBzY2VuZS53aGVuUmVhZHlBc3luYygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBnbFRGUHJlZml4ID0gZmlsZVByZWZpeC5yZXBsYWNlKC9cXC5bXi8uXSskLywgXCJcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGdsdGZHZW5lcmF0b3IgPSBuZXcgX0V4cG9ydGVyKHNjZW5lLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdsdGZHZW5lcmF0b3IuX2dlbmVyYXRlR0xURkFzeW5jKGdsVEZQcmVmaXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9QcmVFeHBvcnRBc3luYyhzY2VuZTogU2NlbmUsIG9wdGlvbnM/OiBJRXhwb3J0T3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5leHBvcnRXaXRob3V0V2FpdGluZ0ZvclNjZW5lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NlbmUud2hlblJlYWR5QXN5bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9Qb3N0RXhwb3J0QXN5bmMoc2NlbmU6IFNjZW5lLCBnbFRGRGF0YTogR0xURkRhdGEsIG9wdGlvbnM/OiBJRXhwb3J0T3B0aW9ucyk6IFByb21pc2U8R0xURkRhdGE+IHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZXhwb3J0V2l0aG91dFdhaXRpbmdGb3JTY2VuZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdsVEZEYXRhO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdsVEZEYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBvcnRzIHRoZSBnZW9tZXRyeSBvZiB0aGUgc2NlbmUgdG8gLmdsYiBmaWxlIGZvcm1hdCBhc3ljaHJvbm91c2x5XHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgQmFieWxvbiBzY2VuZSB3aXRoIHNjZW5lIGhpZXJhcmNoeSBpbmZvcm1hdGlvblxyXG4gICAgICogQHBhcmFtIGZpbGVQcmVmaXggRmlsZSBwcmVmaXggdG8gdXNlIHdoZW4gZ2VuZXJhdGluZyBnbGIgZmlsZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRXhwb3J0ZXIgb3B0aW9uc1xyXG4gICAgICogQHJldHVybnMgUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBhIC5nbGIgZmlsZW5hbWUgYXMga2V5IGFuZCBkYXRhIGFzIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR0xCQXN5bmMoc2NlbmU6IFNjZW5lLCBmaWxlUHJlZml4OiBzdHJpbmcsIG9wdGlvbnM/OiBJRXhwb3J0T3B0aW9ucyk6IFByb21pc2U8R0xURkRhdGE+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fUHJlRXhwb3J0QXN5bmMoc2NlbmUsIG9wdGlvbnMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBnbFRGUHJlZml4ID0gZmlsZVByZWZpeC5yZXBsYWNlKC9cXC5bXi8uXSskLywgXCJcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGdsdGZHZW5lcmF0b3IgPSBuZXcgX0V4cG9ydGVyKHNjZW5lLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdsdGZHZW5lcmF0b3IuX2dlbmVyYXRlR0xCQXN5bmMoZ2xURlByZWZpeCkudGhlbigoZ2xURkRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9Qb3N0RXhwb3J0QXN5bmMoc2NlbmUsIGdsVEZEYXRhLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHR5cGUgeyBJQnVmZmVyVmlldywgQWNjZXNzb3JDb21wb25lbnRUeXBlLCBJQWNjZXNzb3IgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEFjY2Vzc29yVHlwZSB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgRmxvYXRBcnJheSwgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IFZlY3RvcjQgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLnZlY3RvclwiO1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC52ZWN0b3JcIjtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBfR0xURlV0aWxpdGllcyB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBidWZmZXIgdmlldyBiYXNlZCBvbiB0aGUgc3VwcGxpZWQgYXJndW1lbnRzXHJcbiAgICAgKiBAcGFyYW0gYnVmZmVySW5kZXggaW5kZXggdmFsdWUgb2YgdGhlIHNwZWNpZmllZCBidWZmZXJcclxuICAgICAqIEBwYXJhbSBieXRlT2Zmc2V0IGJ5dGUgb2Zmc2V0IHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gYnl0ZUxlbmd0aCBieXRlIGxlbmd0aCBvZiB0aGUgYnVmZmVyVmlld1xyXG4gICAgICogQHBhcmFtIGJ5dGVTdHJpZGUgYnl0ZSBkaXN0YW5jZSBiZXR3ZWVuIGNvbmVxdWVudGlhbCBlbGVtZW50c1xyXG4gICAgICogQHBhcmFtIG5hbWUgbmFtZSBvZiB0aGUgYnVmZmVyIHZpZXdcclxuICAgICAqIEByZXR1cm5zIGJ1ZmZlclZpZXcgZm9yIGdsVEZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBfQ3JlYXRlQnVmZmVyVmlldyhidWZmZXJJbmRleDogbnVtYmVyLCBieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg6IG51bWJlciwgYnl0ZVN0cmlkZT86IG51bWJlciwgbmFtZT86IHN0cmluZyk6IElCdWZmZXJWaWV3IHtcclxuICAgICAgICBjb25zdCBidWZmZXJ2aWV3OiBJQnVmZmVyVmlldyA9IHsgYnVmZmVyOiBidWZmZXJJbmRleCwgYnl0ZUxlbmd0aDogYnl0ZUxlbmd0aCB9O1xyXG4gICAgICAgIGlmIChieXRlT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlcnZpZXcuYnl0ZU9mZnNldCA9IGJ5dGVPZmZzZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlcnZpZXcubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChieXRlU3RyaWRlKSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlcnZpZXcuYnl0ZVN0cmlkZSA9IGJ5dGVTdHJpZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYnVmZmVydmlldztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gYWNjZXNzb3IgYmFzZWQgb24gdGhlIHN1cHBsaWVkIGFyZ3VtZW50c1xyXG4gICAgICogQHBhcmFtIGJ1ZmZlcnZpZXdJbmRleCBUaGUgaW5kZXggb2YgdGhlIGJ1ZmZlcnZpZXcgcmVmZXJlbmNlZCBieSB0aGlzIGFjY2Vzc29yXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgYWNjZXNzb3JcclxuICAgICAqIEBwYXJhbSB0eXBlIFRoZSB0eXBlIG9mIHRoZSBhY2Nlc3NvclxyXG4gICAgICogQHBhcmFtIGNvbXBvbmVudFR5cGUgVGhlIGRhdGF0eXBlIG9mIGNvbXBvbmVudHMgaW4gdGhlIGF0dHJpYnV0ZVxyXG4gICAgICogQHBhcmFtIGNvdW50IFRoZSBudW1iZXIgb2YgYXR0cmlidXRlcyByZWZlcmVuY2VkIGJ5IHRoaXMgYWNjZXNzb3JcclxuICAgICAqIEBwYXJhbSBieXRlT2Zmc2V0IFRoZSBvZmZzZXQgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0IG9mIHRoZSBidWZmZXJWaWV3IGluIGJ5dGVzXHJcbiAgICAgKiBAcGFyYW0gbWluIE1pbmltdW0gdmFsdWUgb2YgZWFjaCBjb21wb25lbnQgaW4gdGhpcyBhdHRyaWJ1dGVcclxuICAgICAqIEBwYXJhbSBtYXggTWF4aW11bSB2YWx1ZSBvZiBlYWNoIGNvbXBvbmVudCBpbiB0aGlzIGF0dHJpYnV0ZVxyXG4gICAgICogQHJldHVybnMgYWNjZXNzb3IgZm9yIGdsVEZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBfQ3JlYXRlQWNjZXNzb3IoXHJcbiAgICAgICAgYnVmZmVydmlld0luZGV4OiBudW1iZXIsXHJcbiAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgIHR5cGU6IEFjY2Vzc29yVHlwZSxcclxuICAgICAgICBjb21wb25lbnRUeXBlOiBBY2Nlc3NvckNvbXBvbmVudFR5cGUsXHJcbiAgICAgICAgY291bnQ6IG51bWJlcixcclxuICAgICAgICBieXRlT2Zmc2V0OiBOdWxsYWJsZTxudW1iZXI+LFxyXG4gICAgICAgIG1pbjogTnVsbGFibGU8bnVtYmVyW10+LFxyXG4gICAgICAgIG1heDogTnVsbGFibGU8bnVtYmVyW10+XHJcbiAgICApOiBJQWNjZXNzb3Ige1xyXG4gICAgICAgIGNvbnN0IGFjY2Vzc29yOiBJQWNjZXNzb3IgPSB7IG5hbWU6IG5hbWUsIGJ1ZmZlclZpZXc6IGJ1ZmZlcnZpZXdJbmRleCwgY29tcG9uZW50VHlwZTogY29tcG9uZW50VHlwZSwgY291bnQ6IGNvdW50LCB0eXBlOiB0eXBlIH07XHJcblxyXG4gICAgICAgIGlmIChtaW4gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBhY2Nlc3Nvci5taW4gPSBtaW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBhY2Nlc3Nvci5tYXggPSBtYXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChieXRlT2Zmc2V0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgYWNjZXNzb3IuYnl0ZU9mZnNldCA9IGJ5dGVPZmZzZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWNjZXNzb3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcyBvZiBhbiBhcnJheSBvZiBwb3NpdGlvbiBmbG9hdHNcclxuICAgICAqIEBwYXJhbSBwb3NpdGlvbnMgUG9zaXRpb25zIGFycmF5IG9mIGEgbWVzaFxyXG4gICAgICogQHBhcmFtIHZlcnRleFN0YXJ0IFN0YXJ0aW5nIHZlcnRleCBvZmZzZXQgdG8gY2FsY3VsYXRlIG1pbiBhbmQgbWF4IHZhbHVlc1xyXG4gICAgICogQHBhcmFtIHZlcnRleENvdW50IE51bWJlciBvZiB2ZXJ0aWNlcyB0byBjaGVjayBmb3IgbWluIGFuZCBtYXggdmFsdWVzXHJcbiAgICAgKiBAcmV0dXJucyBtaW4gbnVtYmVyIGFycmF5IGFuZCBtYXggbnVtYmVyIGFycmF5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgX0NhbGN1bGF0ZU1pbk1heFBvc2l0aW9ucyhwb3NpdGlvbnM6IEZsb2F0QXJyYXksIHZlcnRleFN0YXJ0OiBudW1iZXIsIHZlcnRleENvdW50OiBudW1iZXIpOiB7IG1pbjogbnVtYmVyW107IG1heDogbnVtYmVyW10gfSB7XHJcbiAgICAgICAgY29uc3QgbWluID0gW0luZmluaXR5LCBJbmZpbml0eSwgSW5maW5pdHldO1xyXG4gICAgICAgIGNvbnN0IG1heCA9IFstSW5maW5pdHksIC1JbmZpbml0eSwgLUluZmluaXR5XTtcclxuICAgICAgICBjb25zdCBwb3NpdGlvblN0cmlkZVNpemUgPSAzO1xyXG4gICAgICAgIGxldCBpbmRleE9mZnNldDogbnVtYmVyO1xyXG4gICAgICAgIGxldCBwb3NpdGlvbjogVmVjdG9yMztcclxuICAgICAgICBsZXQgdmVjdG9yOiBudW1iZXJbXTtcclxuXHJcbiAgICAgICAgaWYgKHZlcnRleENvdW50KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB2ZXJ0ZXhTdGFydCwgbGVuZ3RoID0gdmVydGV4U3RhcnQgKyB2ZXJ0ZXhDb3VudDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleE9mZnNldCA9IHBvc2l0aW9uU3RyaWRlU2l6ZSAqIGk7XHJcblxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSBWZWN0b3IzLkZyb21BcnJheShwb3NpdGlvbnMsIGluZGV4T2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgIHZlY3RvciA9IHBvc2l0aW9uLmFzQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBvc2l0aW9uU3RyaWRlU2l6ZTsgKytqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbnVtID0gdmVjdG9yW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChudW0gPCBtaW5bal0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluW2pdID0gbnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobnVtID4gbWF4W2pdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFtqXSA9IG51bTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKytpbmRleE9mZnNldDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geyBtaW4sIG1heCB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgX05vcm1hbGl6ZVRhbmdlbnRGcm9tUmVmKHRhbmdlbnQ6IFZlY3RvcjQgfCBWZWN0b3IzKSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gTWF0aC5zcXJ0KHRhbmdlbnQueCAqIHRhbmdlbnQueCArIHRhbmdlbnQueSAqIHRhbmdlbnQueSArIHRhbmdlbnQueiAqIHRhbmdlbnQueik7XHJcbiAgICAgICAgaWYgKGxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGFuZ2VudC54IC89IGxlbmd0aDtcclxuICAgICAgICAgICAgdGFuZ2VudC55IC89IGxlbmd0aDtcclxuICAgICAgICAgICAgdGFuZ2VudC56IC89IGxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBfR2V0RGF0YUFjY2Vzc29yRWxlbWVudENvdW50KGFjY2Vzc29yVHlwZTogQWNjZXNzb3JUeXBlKSB7XHJcbiAgICAgICAgc3dpdGNoIChhY2Nlc3NvclR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBBY2Nlc3NvclR5cGUuTUFUMjpcclxuICAgICAgICAgICAgICAgIHJldHVybiA0O1xyXG4gICAgICAgICAgICBjYXNlIEFjY2Vzc29yVHlwZS5NQVQzOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDk7XHJcbiAgICAgICAgICAgIGNhc2UgQWNjZXNzb3JUeXBlLk1BVDQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTY7XHJcbiAgICAgICAgICAgIGNhc2UgQWNjZXNzb3JUeXBlLlNDQUxBUjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICBjYXNlIEFjY2Vzc29yVHlwZS5WRUMyOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgICAgIGNhc2UgQWNjZXNzb3JUeXBlLlZFQzM6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMztcclxuICAgICAgICAgICAgY2FzZSBBY2Nlc3NvclR5cGUuVkVDNDpcclxuICAgICAgICAgICAgICAgIHJldHVybiA0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8taW50ZXJuYWwtbW9kdWxlcyAqL1xyXG5leHBvcnQgKiBmcm9tIFwiLi9nbFRGQW5pbWF0aW9uXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dsVEZEYXRhXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dsVEZFeHBvcnRlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9nbFRGRXhwb3J0ZXJFeHRlbnNpb25cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2xURk1hdGVyaWFsRXhwb3J0ZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2xURlNlcmlhbGl6ZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2xURlV0aWxpdGllc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9FeHRlbnNpb25zL2luZGV4XCI7XHJcbiIsIi8qKiBAaW50ZXJuYWwgKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXZhciwgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCB2YXIgX19JR0xURkV4cG9ydGVyRXh0ZW5zaW9uID0gMDsgLy8gSSBhbSBoZXJlIHRvIGFsbG93IGR0cyB0byBiZSBjcmVhdGVkXHJcblxyXG4vKipcclxuICogSW50ZXJmYWNlIGZvciBleHRlbmRpbmcgdGhlIGV4cG9ydGVyXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIG5hbWUgb2YgdGhpcyBleHRlbnNpb25cclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgZW5hYmxlZFxyXG4gICAgICovXHJcbiAgICBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIHJlcXVpcmVkXHJcbiAgICAgKi9cclxuICAgIHJlcXVpcmVkOiBib29sZWFuO1xyXG59XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzICovXHJcbmV4cG9ydCAqIGZyb20gXCIuL2dsVEZGaWxlRXhwb3J0ZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vMi4wL2luZGV4XCI7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzICovXHJcbmV4cG9ydCAqIGZyb20gXCIuL09CSi9pbmRleFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9nbFRGL2luZGV4XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3N0bC9pbmRleFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9VU0RaL2luZGV4XCI7XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL3N0bFNlcmlhbGl6ZXJcIjtcclxuIiwiaW1wb3J0IHsgTWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9tZXNoXCI7XHJcbmltcG9ydCB7IEluc3RhbmNlZE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvaW5zdGFuY2VkTWVzaFwiO1xyXG5pbXBvcnQgeyBWZXJ0ZXhCdWZmZXIgfSBmcm9tIFwiY29yZS9CdWZmZXJzL2J1ZmZlclwiO1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC52ZWN0b3JcIjtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBmb3IgZ2VuZXJhdGluZyBTVEwgZGF0YSBmcm9tIGEgQmFieWxvbiBzY2VuZS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTVExFeHBvcnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBvcnRzIHRoZSBnZW9tZXRyeSBvZiBhIE1lc2ggYXJyYXkgaW4gLlNUTCBmaWxlIGZvcm1hdCAoQVNDSUkpXHJcbiAgICAgKiBAcGFyYW0gbWVzaGVzIGxpc3QgZGVmaW5lcyB0aGUgbWVzaCB0byBzZXJpYWxpemVcclxuICAgICAqIEBwYXJhbSBkb3dubG9hZCB0cmlnZ2VycyB0aGUgYXV0b21hdGljIGRvd25sb2FkIG9mIHRoZSBmaWxlLlxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIGNoYW5nZXMgdGhlIGRvd25sb2FkcyBmaWxlTmFtZS5cclxuICAgICAqIEBwYXJhbSBiaW5hcnkgY2hhbmdlcyB0aGUgU1RMIHRvIGEgYmluYXJ5IHR5cGUuXHJcbiAgICAgKiBAcGFyYW0gaXNMaXR0bGVFbmRpYW4gdG9nZ2xlIGZvciBiaW5hcnkgdHlwZSBleHBvcnRlci5cclxuICAgICAqIEBwYXJhbSBkb05vdEJha2VUcmFuc2Zvcm0gdG9nZ2xlIGlmIG1lc2hlcyB0cmFuc2Zvcm1zIHNob3VsZCBiZSBiYWtlZCBvciBub3QuXHJcbiAgICAgKiBAcGFyYW0gc3VwcG9ydEluc3RhbmNlZE1lc2hlcyB0b2dnbGUgdG8gZXhwb3J0IGluc3RhbmNlZCBNZXNoZXMuIEVuYWJsaW5nIHN1cHBvcnQgZm9yIGluc3RhbmNlZCBtZXNoZXMgd2lsbCBvdmVycmlkZSBkb05vQmFrZVRyYW5zZm9ybSBhcyB0cnVlXHJcbiAgICAgKiBAcGFyYW0gZXhwb3J0SW5kaXZpZHVhbE1lc2hlcyB0b2dnbGUgdG8gZXhwb3J0IGVhY2ggbWVzaCBhcyBhbiBpbmRlcGVuZGVudCBtZXNoLiBCeSBkZWZhdWx0LCBhbGwgdGhlIG1lc2hlcyBhcmUgY29tYmluZWQgaW50byBvbmUgbWVzaC4gVGhpcyBwcm9wZXJ0eSBoYXMgbm8gZWZmZWN0IHdoZW4gZXhwb3J0aW5nIGluIGJpbmFyeSBmb3JtYXRcclxuICAgICAqIEByZXR1cm5zIHRoZSBTVEwgYXMgVVRGOCBzdHJpbmdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBDcmVhdGVTVEwoXHJcbiAgICAgICAgbWVzaGVzOiAoTWVzaCB8IEluc3RhbmNlZE1lc2gpW10sXHJcbiAgICAgICAgZG93bmxvYWQ6IGJvb2xlYW4gPSB0cnVlLFxyXG4gICAgICAgIGZpbGVOYW1lOiBzdHJpbmcgPSBcInN0bG1lc2hcIixcclxuICAgICAgICBiaW5hcnk6IGJvb2xlYW4gPSBmYWxzZSxcclxuICAgICAgICBpc0xpdHRsZUVuZGlhbjogYm9vbGVhbiA9IHRydWUsXHJcbiAgICAgICAgZG9Ob3RCYWtlVHJhbnNmb3JtOiBib29sZWFuID0gZmFsc2UsXHJcbiAgICAgICAgc3VwcG9ydEluc3RhbmNlZE1lc2hlczogYm9vbGVhbiA9IGZhbHNlLFxyXG4gICAgICAgIGV4cG9ydEluZGl2aWR1YWxNZXNoZXM6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICAgKTogYW55IHtcclxuICAgICAgICAvL0JpbmFyeSBzdXBwb3J0IGFkYXB0ZWQgZnJvbSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9wYXVsa2FwbGFuLzZkNWYwYWIyYzdlOGZkYzY4YTYxXHJcblxyXG4gICAgICAgIGNvbnN0IGdldEZhY2VEYXRhID0gZnVuY3Rpb24gKGluZGljZXM6IGFueSwgdmVydGljZXM6IGFueSwgaTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gW2luZGljZXNbaV0gKiAzLCBpbmRpY2VzW2kgKyAxXSAqIDMsIGluZGljZXNbaSArIDJdICogM107XHJcbiAgICAgICAgICAgIGNvbnN0IHYgPSBbXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yMyh2ZXJ0aWNlc1tpZFswXV0sIHZlcnRpY2VzW2lkWzBdICsgMl0sIHZlcnRpY2VzW2lkWzBdICsgMV0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IFZlY3RvcjModmVydGljZXNbaWRbMV1dLCB2ZXJ0aWNlc1tpZFsxXSArIDJdLCB2ZXJ0aWNlc1tpZFsxXSArIDFdKSxcclxuICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IzKHZlcnRpY2VzW2lkWzJdXSwgdmVydGljZXNbaWRbMl0gKyAyXSwgdmVydGljZXNbaWRbMl0gKyAxXSksXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGNvbnN0IHAxcDIgPSB2WzBdLnN1YnRyYWN0KHZbMV0pO1xyXG4gICAgICAgICAgICBjb25zdCBwM3AyID0gdlsyXS5zdWJ0cmFjdCh2WzFdKTtcclxuICAgICAgICAgICAgY29uc3QgbiA9IFZlY3RvcjMuQ3Jvc3MocDNwMiwgcDFwMikubm9ybWFsaXplKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4geyB2LCBuIH07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3Qgd3JpdGVWZWN0b3IgPSBmdW5jdGlvbiAoZGF0YXZpZXc6IGFueSwgb2Zmc2V0OiBudW1iZXIsIHZlY3RvcjogVmVjdG9yMywgaXNMaXR0bGVFbmRpYW46IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gd3JpdGVGbG9hdChkYXRhdmlldywgb2Zmc2V0LCB2ZWN0b3IueCwgaXNMaXR0bGVFbmRpYW4pO1xyXG4gICAgICAgICAgICBvZmZzZXQgPSB3cml0ZUZsb2F0KGRhdGF2aWV3LCBvZmZzZXQsIHZlY3Rvci55LCBpc0xpdHRsZUVuZGlhbik7XHJcbiAgICAgICAgICAgIHJldHVybiB3cml0ZUZsb2F0KGRhdGF2aWV3LCBvZmZzZXQsIHZlY3Rvci56LCBpc0xpdHRsZUVuZGlhbik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3Qgd3JpdGVGbG9hdCA9IGZ1bmN0aW9uIChkYXRhdmlldzogYW55LCBvZmZzZXQ6IG51bWJlciwgdmFsdWU6IG51bWJlciwgaXNMaXR0bGVFbmRpYW46IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgZGF0YXZpZXcuc2V0RmxvYXQzMihvZmZzZXQsIHZhbHVlLCBpc0xpdHRsZUVuZGlhbik7XHJcbiAgICAgICAgICAgIHJldHVybiBvZmZzZXQgKyA0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGdldFZlcnRpY2VzRGF0YSA9IGZ1bmN0aW9uIChtZXNoOiBJbnN0YW5jZWRNZXNoIHwgTWVzaCkge1xyXG4gICAgICAgICAgICBpZiAoc3VwcG9ydEluc3RhbmNlZE1lc2hlcykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZU1lc2ggPSBtZXNoO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lc2ggaW5zdGFuY2VvZiBJbnN0YW5jZWRNZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlTWVzaCA9IG1lc2guc291cmNlTWVzaDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBzb3VyY2VNZXNoLmdldFZlcnRpY2VzRGF0YShWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGlmICghZGF0YSkgcmV0dXJuIFtdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcCA9IFZlY3RvcjMuWmVybygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgZGF0YS5sZW5ndGg7IGluZGV4ICs9IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBWZWN0b3IzLlRyYW5zZm9ybUNvb3JkaW5hdGVzRnJvbUZsb2F0c1RvUmVmKGRhdGFbaW5kZXhdLCBkYXRhW2luZGV4ICsgMV0sIGRhdGFbaW5kZXggKyAyXSwgbWVzaC5jb21wdXRlV29ybGRNYXRyaXgodHJ1ZSksIHRlbXApLnRvQXJyYXkoZGF0YSwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzaC5nZXRWZXJ0aWNlc0RhdGEoVmVydGV4QnVmZmVyLlBvc2l0aW9uS2luZCkgfHwgW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoc3VwcG9ydEluc3RhbmNlZE1lc2hlcykge1xyXG4gICAgICAgICAgICBkb05vdEJha2VUcmFuc2Zvcm0gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRhdGE6IERhdGFWaWV3IHwgc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgbGV0IGZhY2VDb3VudCA9IDA7XHJcbiAgICAgICAgbGV0IG9mZnNldCA9IDA7XHJcblxyXG4gICAgICAgIGlmIChiaW5hcnkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc2ggPSBtZXNoZXNbaV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRpY2VzID0gbWVzaC5nZXRJbmRpY2VzKCk7XHJcbiAgICAgICAgICAgICAgICBmYWNlQ291bnQgKz0gaW5kaWNlcyA/IGluZGljZXMubGVuZ3RoIC8gMyA6IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlclNpemUgPSA4NCArIDUwICogZmFjZUNvdW50O1xyXG4gICAgICAgICAgICBjb25zdCBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoYnVmZmVyU2l6ZSk7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKTtcclxuXHJcbiAgICAgICAgICAgIG9mZnNldCArPSA4MDtcclxuICAgICAgICAgICAgZGF0YS5zZXRVaW50MzIob2Zmc2V0LCBmYWNlQ291bnQsIGlzTGl0dGxlRW5kaWFuKTtcclxuICAgICAgICAgICAgb2Zmc2V0ICs9IDQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCFleHBvcnRJbmRpdmlkdWFsTWVzaGVzKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gXCJzb2xpZCBzdGxtZXNoXFxyXFxuXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVzaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc2ggPSBtZXNoZXNbaV07XHJcbiAgICAgICAgICAgIGlmICghYmluYXJ5ICYmIGV4cG9ydEluZGl2aWR1YWxNZXNoZXMpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgKz0gXCJzb2xpZCBcIiArIG1lc2gubmFtZSArIFwiXFxyXFxuXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFkb05vdEJha2VUcmFuc2Zvcm0gJiYgbWVzaCBpbnN0YW5jZW9mIE1lc2gpIHtcclxuICAgICAgICAgICAgICAgIG1lc2guYmFrZUN1cnJlbnRUcmFuc2Zvcm1JbnRvVmVydGljZXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB2ZXJ0aWNlcyA9IGdldFZlcnRpY2VzRGF0YShtZXNoKTtcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlcyA9IG1lc2guZ2V0SW5kaWNlcygpIHx8IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRpY2VzLmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmZCA9IGdldEZhY2VEYXRhKGluZGljZXMsIHZlcnRpY2VzLCBpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYmluYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gd3JpdGVWZWN0b3IoZGF0YSwgb2Zmc2V0LCBmZC5uLCBpc0xpdHRsZUVuZGlhbik7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gd3JpdGVWZWN0b3IoZGF0YSwgb2Zmc2V0LCBmZC52WzBdLCBpc0xpdHRsZUVuZGlhbik7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gd3JpdGVWZWN0b3IoZGF0YSwgb2Zmc2V0LCBmZC52WzFdLCBpc0xpdHRsZUVuZGlhbik7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gd3JpdGVWZWN0b3IoZGF0YSwgb2Zmc2V0LCBmZC52WzJdLCBpc0xpdHRsZUVuZGlhbik7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ICs9IDI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgKz0gXCJcXHRmYWNldCBub3JtYWwgXCIgKyBmZC5uLnggKyBcIiBcIiArIGZkLm4ueSArIFwiIFwiICsgZmQubi56ICsgXCJcXHJcXG5cIjtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhICs9IFwiXFx0XFx0b3V0ZXIgbG9vcFxcclxcblwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgKz0gXCJcXHRcXHRcXHR2ZXJ0ZXggXCIgKyBmZC52WzBdLnggKyBcIiBcIiArIGZkLnZbMF0ueSArIFwiIFwiICsgZmQudlswXS56ICsgXCJcXHJcXG5cIjtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhICs9IFwiXFx0XFx0XFx0dmVydGV4IFwiICsgZmQudlsxXS54ICsgXCIgXCIgKyBmZC52WzFdLnkgKyBcIiBcIiArIGZkLnZbMV0ueiArIFwiXFxyXFxuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSArPSBcIlxcdFxcdFxcdHZlcnRleCBcIiArIGZkLnZbMl0ueCArIFwiIFwiICsgZmQudlsyXS55ICsgXCIgXCIgKyBmZC52WzJdLnogKyBcIlxcclxcblwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgKz0gXCJcXHRcXHRlbmRsb29wXFxyXFxuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSArPSBcIlxcdGVuZGZhY2V0XFxyXFxuXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFiaW5hcnkgJiYgZXhwb3J0SW5kaXZpZHVhbE1lc2hlcykge1xyXG4gICAgICAgICAgICAgICAgZGF0YSArPSBcImVuZHNvbGlkIFwiICsgbmFtZSArIFwiXFxyXFxuXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghYmluYXJ5ICYmICFleHBvcnRJbmRpdmlkdWFsTWVzaGVzKSB7XHJcbiAgICAgICAgICAgIGRhdGEgKz0gXCJlbmRzb2xpZCBzdGxtZXNoXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZG93bmxvYWQpIHtcclxuICAgICAgICAgICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2RhdGFdLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIgfSk7XHJcbiAgICAgICAgICAgIGEuaHJlZiA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG4gICAgICAgICAgICBhLmRvd25sb2FkID0gZmlsZU5hbWUgKyBcIi5zdGxcIjtcclxuICAgICAgICAgICAgYS5jbGljaygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXMgKi9cclxuaW1wb3J0ICogYXMgRXhwb3J0ZXJzIGZyb20gXCJzZXJpYWxpemVycy9nbFRGL2dsVEZGaWxlRXhwb3J0ZXJcIjtcclxuaW1wb3J0ICogYXMgRGF0YXMgZnJvbSBcInNlcmlhbGl6ZXJzL2dsVEYvMi4wL2dsVEZEYXRhXCI7XHJcbmltcG9ydCAqIGFzIFNlcmlhbGl6ZXJzIGZyb20gXCJzZXJpYWxpemVycy9nbFRGLzIuMC9nbFRGU2VyaWFsaXplclwiO1xyXG5pbXBvcnQgKiBhcyBFeHRlbnNpb25zIGZyb20gXCJzZXJpYWxpemVycy9nbFRGLzIuMC9FeHRlbnNpb25zL2luZGV4XCI7XHJcbmltcG9ydCAqIGFzIEdMVEYyIGZyb20gXCJzZXJpYWxpemVycy9nbFRGLzIuMC9pbmRleFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGVudHJ5IHBvaW50IGZvciB0aGUgVU1EIG1vZHVsZS5cclxuICogVGhlIGVudHJ5IHBvaW50IGZvciBhIGZ1dHVyZSBFU00gcGFja2FnZSBzaG91bGQgYmUgaW5kZXgudHNcclxuICovXHJcbmNvbnN0IGdsb2JhbE9iamVjdCA9IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdW5kZWZpbmVkO1xyXG5pZiAodHlwZW9mIGdsb2JhbE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OID0gKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OIHx8IHt9O1xyXG4gICAgY29uc3QgQkFCWUxPTiA9ICg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTjtcclxuICAgIEJBQllMT04uR0xURjIgPSBCQUJZTE9OLkdMVEYyIHx8IHt9O1xyXG4gICAgQkFCWUxPTi5HTFRGMi5FeHBvcnRlciA9IEJBQllMT04uR0xURjIuRXhwb3J0ZXIgfHwge307XHJcbiAgICBCQUJZTE9OLkdMVEYyLkV4cG9ydGVyLkV4dGVuc2lvbnMgPSBCQUJZTE9OLkdMVEYyLkV4cG9ydGVyLkV4dGVuc2lvbnMgfHwge307XHJcblxyXG4gICAgY29uc3Qga2V5cyA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gRXhwb3J0ZXJzKSB7XHJcbiAgICAgICAgQkFCWUxPTltrZXldID0gKDxhbnk+RXhwb3J0ZXJzKVtrZXldO1xyXG4gICAgICAgIGtleXMucHVzaChrZXkpO1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gRGF0YXMpIHtcclxuICAgICAgICBCQUJZTE9OW2tleV0gPSAoPGFueT5EYXRhcylba2V5XTtcclxuICAgICAgICBrZXlzLnB1c2goa2V5KTtcclxuICAgIH1cclxuICAgIGZvciAoY29uc3Qga2V5IGluIFNlcmlhbGl6ZXJzKSB7XHJcbiAgICAgICAgQkFCWUxPTltrZXldID0gKDxhbnk+U2VyaWFsaXplcnMpW2tleV07XHJcbiAgICAgICAga2V5cy5wdXNoKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gRXh0ZW5zaW9ucykge1xyXG4gICAgICAgIEJBQllMT04uR0xURjIuRXhwb3J0ZXIuRXh0ZW5zaW9uc1trZXldID0gKDxhbnk+RXh0ZW5zaW9ucylba2V5XTtcclxuICAgICAgICBrZXlzLnB1c2goa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBHTFRGMikge1xyXG4gICAgICAgIC8vIFByZXZlbnQgUmVhc3NpZ25tZW50LlxyXG4gICAgICAgIGlmIChrZXlzLmluZGV4T2Yoa2V5KSA+IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQkFCWUxPTi5HTFRGMi5FeHBvcnRlcltrZXldID0gKDxhbnk+R0xURjIpW2tleV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCAqIGZyb20gXCJzZXJpYWxpemVycy9nbFRGL2dsVEZGaWxlRXhwb3J0ZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcInNlcmlhbGl6ZXJzL2dsVEYvMi4wL2luZGV4XCI7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzICovXHJcbmltcG9ydCAqIGFzIFNlcmlhbGl6ZXJzIGZyb20gXCJzZXJpYWxpemVycy9PQkovaW5kZXhcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBlbnRyeSBwb2ludCBmb3IgdGhlIFVNRCBtb2R1bGUuXHJcbiAqIFRoZSBlbnRyeSBwb2ludCBmb3IgYSBmdXR1cmUgRVNNIHBhY2thZ2Ugc2hvdWxkIGJlIGluZGV4LnRzXHJcbiAqL1xyXG5jb25zdCBnbG9iYWxPYmplY3QgPSB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcclxuaWYgKHR5cGVvZiBnbG9iYWxPYmplY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGZvciAoY29uc3Qgc2VyaWFsaXplciBpbiBTZXJpYWxpemVycykge1xyXG4gICAgICAgICg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTltzZXJpYWxpemVyXSA9ICg8YW55PlNlcmlhbGl6ZXJzKVtzZXJpYWxpemVyXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0ICogZnJvbSBcInNlcmlhbGl6ZXJzL09CSi9pbmRleFwiO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8taW50ZXJuYWwtbW9kdWxlcyAqL1xyXG5pbXBvcnQgKiBhcyBTZXJpYWxpemVycyBmcm9tIFwic2VyaWFsaXplcnMvc3RsL2luZGV4XCI7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgZW50cnkgcG9pbnQgZm9yIHRoZSBVTUQgbW9kdWxlLlxyXG4gKiBUaGUgZW50cnkgcG9pbnQgZm9yIGEgZnV0dXJlIEVTTSBwYWNrYWdlIHNob3VsZCBiZSBpbmRleC50c1xyXG4gKi9cclxuY29uc3QgZ2xvYmFsT2JqZWN0ID0gdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XHJcbmlmICh0eXBlb2YgZ2xvYmFsT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBmb3IgKGNvbnN0IHNlcmlhbGl6ZXIgaW4gU2VyaWFsaXplcnMpIHtcclxuICAgICAgICAoPGFueT5nbG9iYWxPYmplY3QpLkJBQllMT05bc2VyaWFsaXplcl0gPSAoPGFueT5TZXJpYWxpemVycylbc2VyaWFsaXplcl07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCAqIGZyb20gXCJzZXJpYWxpemVycy9zdGwvaW5kZXhcIjtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXMgKi9cclxuaW1wb3J0ICogYXMgU2VyaWFsaXplcnMgZnJvbSBcInNlcmlhbGl6ZXJzL1VTRFovaW5kZXhcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBlbnRyeSBwb2ludCBmb3IgdGhlIFVNRCBtb2R1bGUuXHJcbiAqIFRoZSBlbnRyeSBwb2ludCBmb3IgYSBmdXR1cmUgRVNNIHBhY2thZ2Ugc2hvdWxkIGJlIGluZGV4LnRzXHJcbiAqL1xyXG5jb25zdCBnbG9iYWxPYmplY3QgPSB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcclxuaWYgKHR5cGVvZiBnbG9iYWxPYmplY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGZvciAoY29uc3Qgc2VyaWFsaXplciBpbiBTZXJpYWxpemVycykge1xyXG4gICAgICAgICg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTltzZXJpYWxpemVyXSA9ICg8YW55PlNlcmlhbGl6ZXJzKVtzZXJpYWxpemVyXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0ICogZnJvbSBcInNlcmlhbGl6ZXJzL1VTRFovaW5kZXhcIjtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L2V4cG9ydCAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8taW50ZXJuYWwtbW9kdWxlcyAqL1xyXG5pbXBvcnQgXCJzZXJpYWxpemVycy9pbmRleFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9sZWdhY3ktZ2xURjJTZXJpYWxpemVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2xlZ2FjeS1vYmpTZXJpYWxpemVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2xlZ2FjeS1zdGxTZXJpYWxpemVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2xlZ2FjeS11c2R6U2VyaWFsaXplclwiO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01hdGhzX21hdGhfdmVjdG9yX187IiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG5cblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1Jcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sLCBJdGVyYXRvciAqL1xuXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcbiAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcbiAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn1cblxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xuICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xuICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHQ7XG4gIH1cbiAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xuICB2YXIgdCA9IHt9O1xuICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgIHRbcF0gPSBzW3BdO1xuICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgIH1cbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xuICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cbiAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcbiAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XG4gIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xuICB2YXIgXywgZG9uZSA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGNvbnRleHQgPSB7fTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XG4gICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xuICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XG4gICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcbiAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XG4gICAgICB9XG4gIH1cbiAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xuICBkb25lID0gdHJ1ZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XG4gIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xuICB9XG4gIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcbiAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XG4gIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xuICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgfVxufVxuXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgfVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgb1trMl0gPSBtW2tdO1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xuICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XG4gIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICB9XG4gIH07XG4gIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XG4gIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgaWYgKCFtKSByZXR1cm4gbztcbiAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gIHRyeSB7XG4gICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgfVxuICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgfVxuICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gIH1cbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcbiAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXG4gICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XG4gIHJldHVybiBhcjtcbn1cblxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XG4gIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xuICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXG4gICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcbiAgICAgICAgICByW2tdID0gYVtqXTtcbiAgcmV0dXJuIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XG4gIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcbiAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xuICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xuICByZXR1cm4gaSA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBBc3luY0l0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBBc3luY0l0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpLCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIsIGF3YWl0UmV0dXJuKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKGdbbl0pIHsgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgaWYgKGYpIGlbbl0gPSBmKGlbbl0pOyB9IH1cbiAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxuICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cbiAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xuICB2YXIgaSwgcDtcbiAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xuICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xuICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XG4gIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cbiAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcbiAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cbiAgcmV0dXJuIGNvb2tlZDtcbn07XG5cbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gIG9bXCJkZWZhdWx0XCJdID0gdjtcbn07XG5cbnZhciBvd25LZXlzID0gZnVuY3Rpb24obykge1xuICBvd25LZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gKG8pIHtcbiAgICB2YXIgYXIgPSBbXTtcbiAgICBmb3IgKHZhciBrIGluIG8pIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgaykpIGFyW2FyLmxlbmd0aF0gPSBrO1xuICAgIHJldHVybiBhcjtcbiAgfTtcbiAgcmV0dXJuIG93bktleXMobyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xuICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayA9IG93bktleXMobW9kKSwgaSA9IDA7IGkgPCBrLmxlbmd0aDsgaSsrKSBpZiAoa1tpXSAhPT0gXCJkZWZhdWx0XCIpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwga1tpXSk7XG4gIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XG4gIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcbiAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XG4gIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZShlbnYsIHZhbHVlLCBhc3luYykge1xuICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xuICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcbiAgICBpZiAoYXN5bmMpIHtcbiAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xuICAgIH1cbiAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XG4gICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcbiAgICAgIGlmIChhc3luYykgaW5uZXIgPSBkaXNwb3NlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRpc3Bvc2UgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBub3QgZGlzcG9zYWJsZS5cIik7XG4gICAgaWYgKGlubmVyKSBkaXNwb3NlID0gZnVuY3Rpb24oKSB7IHRyeSB7IGlubmVyLmNhbGwodGhpcyk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpOyB9IH07XG4gICAgZW52LnN0YWNrLnB1c2goeyB2YWx1ZTogdmFsdWUsIGRpc3Bvc2U6IGRpc3Bvc2UsIGFzeW5jOiBhc3luYyB9KTtcbiAgfVxuICBlbHNlIGlmIChhc3luYykge1xuICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xuICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2Rpc3Bvc2VSZXNvdXJjZXMoZW52KSB7XG4gIGZ1bmN0aW9uIGZhaWwoZSkge1xuICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcbiAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xuICB9XG4gIHZhciByLCBzID0gMDtcbiAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICB3aGlsZSAociA9IGVudi5zdGFjay5wb3AoKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFyLmFzeW5jICYmIHMgPT09IDEpIHJldHVybiBzID0gMCwgZW52LnN0YWNrLnB1c2gociksIFByb21pc2UucmVzb2x2ZSgpLnRoZW4obmV4dCk7XG4gICAgICAgIGlmIChyLmRpc3Bvc2UpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gci5kaXNwb3NlLmNhbGwoci52YWx1ZSk7XG4gICAgICAgICAgaWYgKHIuYXN5bmMpIHJldHVybiBzIHw9IDIsIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHMgfD0gMTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGZhaWwoZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzID09PSAxKSByZXR1cm4gZW52Lmhhc0Vycm9yID8gUHJvbWlzZS5yZWplY3QoZW52LmVycm9yKSA6IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIGlmIChlbnYuaGFzRXJyb3IpIHRocm93IGVudi5lcnJvcjtcbiAgfVxuICByZXR1cm4gbmV4dCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24ocGF0aCwgcHJlc2VydmVKc3gpIHtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiICYmIC9eXFwuXFwuP1xcLy8udGVzdChwYXRoKSkge1xuICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXFwuKHRzeCkkfCgoPzpcXC5kKT8pKCg/OlxcLlteLi9dKz8pPylcXC4oW2NtXT8pdHMkL2ksIGZ1bmN0aW9uIChtLCB0c3gsIGQsIGV4dCwgY20pIHtcbiAgICAgICAgICByZXR1cm4gdHN4ID8gcHJlc2VydmVKc3ggPyBcIi5qc3hcIiA6IFwiLmpzXCIgOiBkICYmICghZXh0IHx8ICFjbSkgPyBtIDogKGQgKyBleHQgKyBcIi5cIiArIGNtLnRvTG93ZXJDYXNlKCkgKyBcImpzXCIpO1xuICAgICAgfSk7XG4gIH1cbiAgcmV0dXJuIHBhdGg7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgX19leHRlbmRzLFxuICBfX2Fzc2lnbixcbiAgX19yZXN0LFxuICBfX2RlY29yYXRlLFxuICBfX3BhcmFtLFxuICBfX2VzRGVjb3JhdGUsXG4gIF9fcnVuSW5pdGlhbGl6ZXJzLFxuICBfX3Byb3BLZXksXG4gIF9fc2V0RnVuY3Rpb25OYW1lLFxuICBfX21ldGFkYXRhLFxuICBfX2F3YWl0ZXIsXG4gIF9fZ2VuZXJhdG9yLFxuICBfX2NyZWF0ZUJpbmRpbmcsXG4gIF9fZXhwb3J0U3RhcixcbiAgX192YWx1ZXMsXG4gIF9fcmVhZCxcbiAgX19zcHJlYWQsXG4gIF9fc3ByZWFkQXJyYXlzLFxuICBfX3NwcmVhZEFycmF5LFxuICBfX2F3YWl0LFxuICBfX2FzeW5jR2VuZXJhdG9yLFxuICBfX2FzeW5jRGVsZWdhdG9yLFxuICBfX2FzeW5jVmFsdWVzLFxuICBfX21ha2VUZW1wbGF0ZU9iamVjdCxcbiAgX19pbXBvcnRTdGFyLFxuICBfX2ltcG9ydERlZmF1bHQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRHZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRJbixcbiAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2UsXG4gIF9fZGlzcG9zZVJlc291cmNlcyxcbiAgX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24sXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgc2VyaWFsaXplcnMgZnJvbSBcIkBsdHMvc2VyaWFsaXplcnMvbGVnYWN5L2xlZ2FjeVwiO1xyXG5leHBvcnQgeyBzZXJpYWxpemVycyB9O1xyXG5leHBvcnQgZGVmYXVsdCBzZXJpYWxpemVycztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9