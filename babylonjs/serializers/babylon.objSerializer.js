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

/***/ "babylonjs/Maths/math.vector":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Maths_math_vector__;

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
  !*** ./src/obj.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   serializers: () => (/* reexport module object */ _lts_serializers_legacy_legacy_objSerializer__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_serializers_legacy_legacy_objSerializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/serializers/legacy/legacy-objSerializer */ "../../../lts/serializers/src/legacy/legacy-objSerializer.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_serializers_legacy_legacy_objSerializer__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5vYmpTZXJpYWxpemVyLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0NBO0FBQ0E7QUFJQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQThMQTtBQTdMQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUVBOzs7O0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pNQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7O0FDZEE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL1NFUklBTElaRVJTL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL09CSi9pbmRleC50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL09CSi9vYmpTZXJpYWxpemVyLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2x0cy9zZXJpYWxpemVycy9zcmMvbGVnYWN5L2xlZ2FjeS1vYmpTZXJpYWxpemVyLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTL2V4dGVybmFsIHVtZCB7XCJyb290XCI6XCJCQUJZTE9OXCIsXCJjb21tb25qc1wiOlwiYmFieWxvbmpzXCIsXCJjb21tb25qczJcIjpcImJhYnlsb25qc1wiLFwiYW1kXCI6XCJiYWJ5bG9uanNcIn0iLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1NFUklBTElaRVJTL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1NFUklBTElaRVJTLy4vc3JjL29iai50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWJ5bG9uanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJiYWJ5bG9uanMtc2VyaWFsaXplcnNcIiwgW1wiYmFieWxvbmpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJhYnlsb25qcy1zZXJpYWxpemVyc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiU0VSSUFMSVpFUlNcIl0gPSBmYWN0b3J5KHJvb3RbXCJCQUJZTE9OXCJdKTtcbn0pKCh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdGhpcyksIChfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2JhYnlsb25qc19NYXRoc19tYXRoX3ZlY3Rvcl9fKSA9PiB7XG5yZXR1cm4gIiwiZXhwb3J0ICogZnJvbSBcIi4vb2JqU2VyaWFsaXplclwiO1xyXG4iLCJpbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgTWF0cml4IH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC52ZWN0b3JcIjtcclxuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiY29yZS9NaXNjL3Rvb2xzXCI7XHJcbmltcG9ydCB0eXBlIHsgU3RhbmRhcmRNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9zdGFuZGFyZE1hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgR2VvbWV0cnkgfSBmcm9tIFwiY29yZS9NZXNoZXMvZ2VvbWV0cnlcIjtcclxuaW1wb3J0IHR5cGUgeyBNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL21lc2hcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBmb3IgZ2VuZXJhdGluZyBPQkogZGF0YSBmcm9tIGEgQmFieWxvbiBzY2VuZS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBPQkpFeHBvcnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBvcnRzIHRoZSBnZW9tZXRyeSBvZiBhIE1lc2ggYXJyYXkgaW4gLk9CSiBmaWxlIGZvcm1hdCAodGV4dClcclxuICAgICAqIEBwYXJhbSBtZXNoZXMgZGVmaW5lcyB0aGUgbGlzdCBvZiBtZXNoZXMgdG8gc2VyaWFsaXplXHJcbiAgICAgKiBAcGFyYW0gbWF0ZXJpYWxzIGRlZmluZXMgaWYgbWF0ZXJpYWxzIHNob3VsZCBiZSBleHBvcnRlZFxyXG4gICAgICogQHBhcmFtIG1hdGxpYm5hbWUgZGVmaW5lcyB0aGUgbmFtZSBvZiB0aGUgYXNzb2NpYXRlZCBtdGwgZmlsZVxyXG4gICAgICogQHBhcmFtIGdsb2JhbHBvc2l0aW9uIGRlZmluZXMgaWYgdGhlIGV4cG9ydGVkIHBvc2l0aW9ucyBhcmUgZ2xvYmFscyBvciBsb2NhbCB0byB0aGUgZXhwb3J0ZWQgbWVzaFxyXG4gICAgICogQHJldHVybnMgdGhlIE9CSiBjb250ZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgT0JKKG1lc2hlczogTWVzaFtdLCBtYXRlcmlhbHM/OiBib29sZWFuLCBtYXRsaWJuYW1lPzogc3RyaW5nLCBnbG9iYWxwb3NpdGlvbj86IGJvb2xlYW4pOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IG91dHB1dDogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBsZXQgdiA9IDE7XHJcbiAgICAgICAgLy8ga2VlcCB0cmFjayBvZiB1diBpbmRleCBpbiBjYXNlIG1peGVkIG1lc2hlcyBhcmUgcGFzc2VkIGluXHJcbiAgICAgICAgbGV0IHRleHR1cmVWID0gMTtcclxuXHJcbiAgICAgICAgaWYgKG1hdGVyaWFscykge1xyXG4gICAgICAgICAgICBpZiAoIW1hdGxpYm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIG1hdGxpYm5hbWUgPSBcIm1hdFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFwibXRsbGliIFwiICsgbWF0bGlibmFtZSArIFwiLm10bFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtZXNoZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgY29uc3QgbWVzaCA9IG1lc2hlc1tqXTtcclxuICAgICAgICAgICAgY29uc3Qgb2JqZWN0TmFtZSA9IG1lc2gubmFtZSB8fCBgbWVzaCR7an19YDtcclxuICAgICAgICAgICAgb3V0cHV0LnB1c2goYG8gJHtvYmplY3ROYW1lfWApO1xyXG5cclxuICAgICAgICAgICAgLy9Vc2VzIHRoZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSBpbiB0aGUgc2NlbmUsIHRvIHRoZSBmaWxlICh0aGlzIGJhY2sgdG8gbm9ybWFsIGluIHRoZSBlbmQpXHJcbiAgICAgICAgICAgIGxldCBpbnZlcnNlVHJhbnNmb3JtOiBOdWxsYWJsZTxNYXRyaXg+ID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKGdsb2JhbHBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBtZXNoLmNvbXB1dGVXb3JsZE1hdHJpeCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGludmVyc2VUcmFuc2Zvcm0gPSBuZXcgTWF0cml4KCk7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uaW52ZXJ0VG9SZWYoaW52ZXJzZVRyYW5zZm9ybSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWVzaC5iYWtlVHJhbnNmb3JtSW50b1ZlcnRpY2VzKHRyYW5zZm9ybSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vVE9ETzogc3VibWVzaGVzIChncm91cHMpXHJcbiAgICAgICAgICAgIC8vVE9ETzogc21vb3RoaW5nIGdyb3VwcyAocyAxLCBzIG9mZik7XHJcbiAgICAgICAgICAgIGlmIChtYXRlcmlhbHMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdCA9IG1lc2gubWF0ZXJpYWw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1hdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKFwidXNlbXRsIFwiICsgbWF0LmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBnOiBOdWxsYWJsZTxHZW9tZXRyeT4gPSBtZXNoLmdlb21ldHJ5O1xyXG5cclxuICAgICAgICAgICAgaWYgKCFnKSB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5XYXJuKFwiTm8gZ2VvbWV0cnkgaXMgcHJlc2VudCBvbiB0aGUgbWVzaFwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0cnVua1ZlcnRzID0gZy5nZXRWZXJ0aWNlc0RhdGEoXCJwb3NpdGlvblwiKTtcclxuICAgICAgICAgICAgY29uc3QgdHJ1bmtOb3JtYWxzID0gZy5nZXRWZXJ0aWNlc0RhdGEoXCJub3JtYWxcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRydW5rVVYgPSBnLmdldFZlcnRpY2VzRGF0YShcInV2XCIpO1xyXG4gICAgICAgICAgICBjb25zdCB0cnVua0ZhY2VzID0gZy5nZXRJbmRpY2VzKCk7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50ViA9IDA7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50VGV4dHVyZVYgPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0cnVua1ZlcnRzIHx8ICF0cnVua0ZhY2VzKSB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5XYXJuKFwiVGhlcmUgYXJlIG5vIHBvc2l0aW9uIHZlcnRpY2VzIG9yIGluZGljZXMgb24gdGhlIG1lc2ghXCIpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHVzZVJpZ2h0SGFuZGVkU3lzdGVtID0gbWVzaGVzWzBdLmdldFNjZW5lKCkudXNlUmlnaHRIYW5kZWRTeXN0ZW07XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRlZG5lc3NTaWduID0gdXNlUmlnaHRIYW5kZWRTeXN0ZW0gPyAxIDogLTE7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRydW5rVmVydHMubGVuZ3RoOyBpICs9IDMpIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKFwidiBcIiArIHRydW5rVmVydHNbaV0gKiBoYW5kZWRuZXNzU2lnbiArIFwiIFwiICsgdHJ1bmtWZXJ0c1tpICsgMV0gKyBcIiBcIiArIHRydW5rVmVydHNbaSArIDJdKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRWKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0cnVua05vcm1hbHMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cnVua05vcm1hbHMubGVuZ3RoOyBpICs9IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChcInZuIFwiICsgdHJ1bmtOb3JtYWxzW2ldICogaGFuZGVkbmVzc1NpZ24gKyBcIiBcIiArIHRydW5rTm9ybWFsc1tpICsgMV0gKyBcIiBcIiArIHRydW5rTm9ybWFsc1tpICsgMl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cnVua1VWICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJ1bmtVVi5sZW5ndGg7IGkgKz0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKFwidnQgXCIgKyB0cnVua1VWW2ldICsgXCIgXCIgKyB0cnVua1VWW2kgKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRleHR1cmVWKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJsYW5rczogc3RyaW5nW10gPSBbXCJcIiwgXCJcIiwgXCJcIl07XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbWVzaC5tYXRlcmlhbCB8fCBtZXNoLmdldFNjZW5lKCkuZGVmYXVsdE1hdGVyaWFsO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2lkZU9yaWVudGF0aW9uID0gbWF0ZXJpYWwuX2dldEVmZmVjdGl2ZU9yaWVudGF0aW9uKG1lc2gpO1xyXG4gICAgICAgICAgICBjb25zdCBbb2Zmc2V0MSwgb2Zmc2V0Ml0gPSBzaWRlT3JpZW50YXRpb24gPT09IE1hdGVyaWFsLkNsb2NrV2lzZVNpZGVPcmllbnRhdGlvbiA/IFsyLCAxXSA6IFsxLCAyXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJ1bmtGYWNlcy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kaWNlcyA9IFtTdHJpbmcodHJ1bmtGYWNlc1tpXSArIHYpLCBTdHJpbmcodHJ1bmtGYWNlc1tpICsgb2Zmc2V0MV0gKyB2KSwgU3RyaW5nKHRydW5rRmFjZXNbaSArIG9mZnNldDJdICsgdildO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dHVyZUluZGljZXMgPSBbU3RyaW5nKHRydW5rRmFjZXNbaV0gKyB0ZXh0dXJlViksIFN0cmluZyh0cnVua0ZhY2VzW2kgKyBvZmZzZXQxXSArIHRleHR1cmVWKSwgU3RyaW5nKHRydW5rRmFjZXNbaSArIG9mZnNldDJdICsgdGV4dHVyZVYpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmYWNlUG9zaXRpb25zID0gaW5kaWNlcztcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZhY2VVVnMgPSB0cnVua1VWICE9IG51bGwgPyB0ZXh0dXJlSW5kaWNlcyA6IGJsYW5rcztcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZhY2VOb3JtYWxzID0gdHJ1bmtOb3JtYWxzICE9IG51bGwgPyBpbmRpY2VzIDogYmxhbmtzO1xyXG5cclxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhY2VQb3NpdGlvbnNbMF0gK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIi9cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhY2VVVnNbMF0gK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIi9cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhY2VOb3JtYWxzWzBdICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWNlUG9zaXRpb25zWzFdICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCIvXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWNlVVZzWzFdICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCIvXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWNlTm9ybWFsc1sxXSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIFwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjZVBvc2l0aW9uc1syXSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiL1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjZVVWc1syXSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiL1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjZU5vcm1hbHNbMl1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9iYWNrIGRlIHByZXZpb3VzIG1hdHJpeCwgdG8gbm90IGNoYW5nZSB0aGUgb3JpZ2luYWwgbWVzaCBpbiB0aGUgc2NlbmVcclxuICAgICAgICAgICAgaWYgKGdsb2JhbHBvc2l0aW9uICYmIGludmVyc2VUcmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgIG1lc2guYmFrZVRyYW5zZm9ybUludG9WZXJ0aWNlcyhpbnZlcnNlVHJhbnNmb3JtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2ICs9IGN1cnJlbnRWO1xyXG4gICAgICAgICAgICB0ZXh0dXJlViArPSBjdXJyZW50VGV4dHVyZVY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRleHQ6IHN0cmluZyA9IG91dHB1dC5qb2luKFwiXFxuXCIpO1xyXG4gICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXhwb3J0cyB0aGUgbWF0ZXJpYWwocykgb2YgYSBtZXNoIGluIC5NVEwgZmlsZSBmb3JtYXQgKHRleHQpXHJcbiAgICAgKiBAcGFyYW0gbWVzaCBkZWZpbmVzIHRoZSBtZXNoIHRvIGV4dHJhY3QgdGhlIG1hdGVyaWFsIGZyb21cclxuICAgICAqIEByZXR1cm5zIHRoZSBtdGwgY29udGVudFxyXG4gICAgICovXHJcbiAgICAvL1RPRE86IEV4cG9ydCB0aGUgbWF0ZXJpYWxzIG9mIG1lc2ggYXJyYXlcclxuICAgIHB1YmxpYyBzdGF0aWMgTVRMKG1lc2g6IE1lc2gpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IG91dHB1dCA9IFtdO1xyXG4gICAgICAgIGNvbnN0IG0gPSA8U3RhbmRhcmRNYXRlcmlhbD5tZXNoLm1hdGVyaWFsO1xyXG4gICAgICAgIG91dHB1dC5wdXNoKFwibmV3bXRsIG1hdDFcIik7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCIgIE5zIFwiICsgbS5zcGVjdWxhclBvd2VyLnRvRml4ZWQoNCkpO1xyXG4gICAgICAgIG91dHB1dC5wdXNoKFwiICBOaSAxLjUwMDBcIik7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCIgIGQgXCIgKyBtLmFscGhhLnRvRml4ZWQoNCkpO1xyXG4gICAgICAgIG91dHB1dC5wdXNoKFwiICBUciAwLjAwMDBcIik7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCIgIFRmIDEuMDAwMCAxLjAwMDAgMS4wMDAwXCIpO1xyXG4gICAgICAgIG91dHB1dC5wdXNoKFwiICBpbGx1bSAyXCIpO1xyXG4gICAgICAgIG91dHB1dC5wdXNoKFwiICBLYSBcIiArIG0uYW1iaWVudENvbG9yLnIudG9GaXhlZCg0KSArIFwiIFwiICsgbS5hbWJpZW50Q29sb3IuZy50b0ZpeGVkKDQpICsgXCIgXCIgKyBtLmFtYmllbnRDb2xvci5iLnRvRml4ZWQoNCkpO1xyXG4gICAgICAgIG91dHB1dC5wdXNoKFwiICBLZCBcIiArIG0uZGlmZnVzZUNvbG9yLnIudG9GaXhlZCg0KSArIFwiIFwiICsgbS5kaWZmdXNlQ29sb3IuZy50b0ZpeGVkKDQpICsgXCIgXCIgKyBtLmRpZmZ1c2VDb2xvci5iLnRvRml4ZWQoNCkpO1xyXG4gICAgICAgIG91dHB1dC5wdXNoKFwiICBLcyBcIiArIG0uc3BlY3VsYXJDb2xvci5yLnRvRml4ZWQoNCkgKyBcIiBcIiArIG0uc3BlY3VsYXJDb2xvci5nLnRvRml4ZWQoNCkgKyBcIiBcIiArIG0uc3BlY3VsYXJDb2xvci5iLnRvRml4ZWQoNCkpO1xyXG4gICAgICAgIG91dHB1dC5wdXNoKFwiICBLZSBcIiArIG0uZW1pc3NpdmVDb2xvci5yLnRvRml4ZWQoNCkgKyBcIiBcIiArIG0uZW1pc3NpdmVDb2xvci5nLnRvRml4ZWQoNCkgKyBcIiBcIiArIG0uZW1pc3NpdmVDb2xvci5iLnRvRml4ZWQoNCkpO1xyXG5cclxuICAgICAgICAvL1RPRE86IHV2IHNjYWxlLCBvZmZzZXQsIHdyYXBcclxuICAgICAgICAvL1RPRE86IFVWIG1pcnJvcmVkIGluIEJsZW5kZXI/IHNlY29uZCBVViBjaGFubmVsPyBsaWdodE1hcD8gcmVmbGVjdGlvbiB0ZXh0dXJlcz9cclxuICAgICAgICBjb25zdCB1dnNjYWxlID0gXCJcIjtcclxuXHJcbiAgICAgICAgaWYgKG0uYW1iaWVudFRleHR1cmUpIHtcclxuICAgICAgICAgICAgb3V0cHV0LnB1c2goXCIgIG1hcF9LYSBcIiArIHV2c2NhbGUgKyBtLmFtYmllbnRUZXh0dXJlLm5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG0uZGlmZnVzZVRleHR1cmUpIHtcclxuICAgICAgICAgICAgb3V0cHV0LnB1c2goXCIgIG1hcF9LZCBcIiArIHV2c2NhbGUgKyBtLmRpZmZ1c2VUZXh0dXJlLm5hbWUpO1xyXG4gICAgICAgICAgICAvL1RPRE86IGFscGhhIHRlc3RpbmcsIG9wYWNpdHkgaW4gZGlmZnVzZSB0ZXh0dXJlIGFscGhhIGNoYW5uZWwgKGRpZmZ1c2VUZXh0dXJlLmhhc0FscGhhIC0+IG1hcF9kKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG0uc3BlY3VsYXJUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFwiICBtYXBfS3MgXCIgKyB1dnNjYWxlICsgbS5zcGVjdWxhclRleHR1cmUubmFtZSk7XHJcbiAgICAgICAgICAgIC8qIFRPRE86IGdsb3NzaW5lc3MgPSBzcGVjdWxhciBoaWdobGlnaHQgY29tcG9uZW50IGlzIGluIGFscGhhIGNoYW5uZWwgb2Ygc3BlY3VsYXJUZXh0dXJlLiAoPz8/KVxyXG4gICAgICAgICAgICBpZiAobS51c2VHbG9zc2luZXNzRnJvbVNwZWN1bGFyTWFwQWxwaGEpICB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChcIiAgbWFwX05zIFwiK3V2c2NhbGUgKyBtLnNwZWN1bGFyVGV4dHVyZS5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogVE9ETzogZW1pc3NpdmUgdGV4dHVyZSBub3QgaW4gLk1BVCBmb3JtYXQgKD8/PylcclxuICAgICAgICBpZiAobS5lbWlzc2l2ZVRleHR1cmUpIHtcclxuICAgICAgICAgICAgb3V0cHV0LnB1c2goXCIgIG1hcF9kIFwiK3V2c2NhbGUrbS5lbWlzc2l2ZVRleHR1cmUubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICovXHJcblxyXG4gICAgICAgIGlmIChtLmJ1bXBUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFwiICBtYXBfYnVtcCAtaW1mY2hhbiB6IFwiICsgdXZzY2FsZSArIG0uYnVtcFRleHR1cmUubmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobS5vcGFjaXR5VGV4dHVyZSkge1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChcIiAgbWFwX2QgXCIgKyB1dnNjYWxlICsgbS5vcGFjaXR5VGV4dHVyZS5uYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRleHQgPSBvdXRwdXQuam9pbihcIlxcblwiKTtcclxuICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgIH1cclxufVxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8taW50ZXJuYWwtbW9kdWxlcyAqL1xyXG5pbXBvcnQgKiBhcyBTZXJpYWxpemVycyBmcm9tIFwic2VyaWFsaXplcnMvT0JKL2luZGV4XCI7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgZW50cnkgcG9pbnQgZm9yIHRoZSBVTUQgbW9kdWxlLlxyXG4gKiBUaGUgZW50cnkgcG9pbnQgZm9yIGEgZnV0dXJlIEVTTSBwYWNrYWdlIHNob3VsZCBiZSBpbmRleC50c1xyXG4gKi9cclxuY29uc3QgZ2xvYmFsT2JqZWN0ID0gdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XHJcbmlmICh0eXBlb2YgZ2xvYmFsT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBmb3IgKGNvbnN0IHNlcmlhbGl6ZXIgaW4gU2VyaWFsaXplcnMpIHtcclxuICAgICAgICAoPGFueT5nbG9iYWxPYmplY3QpLkJBQllMT05bc2VyaWFsaXplcl0gPSAoPGFueT5TZXJpYWxpemVycylbc2VyaWFsaXplcl07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCAqIGZyb20gXCJzZXJpYWxpemVycy9PQkovaW5kZXhcIjtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2JhYnlsb25qc19NYXRoc19tYXRoX3ZlY3Rvcl9fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIHNlcmlhbGl6ZXJzIGZyb20gXCJAbHRzL3NlcmlhbGl6ZXJzL2xlZ2FjeS9sZWdhY3ktb2JqU2VyaWFsaXplclwiO1xyXG5leHBvcnQgeyBzZXJpYWxpemVycyB9O1xyXG5leHBvcnQgZGVmYXVsdCBzZXJpYWxpemVycztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9