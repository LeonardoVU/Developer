(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-ktx2decoder", [], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-ktx2decoder"] = factory();
	else
		root["KTX2DECODER"] = factory();
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js":
/*!*********************************************************************!*\
  !*** ../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EngineFormat: () => (/* binding */ EngineFormat),
/* harmony export */   SourceTextureFormat: () => (/* binding */ SourceTextureFormat),
/* harmony export */   TranscodeTarget: () => (/* binding */ TranscodeTarget)
/* harmony export */ });
var SourceTextureFormat;
(function (SourceTextureFormat) {
    SourceTextureFormat[SourceTextureFormat["ETC1S"] = 0] = "ETC1S";
    SourceTextureFormat[SourceTextureFormat["UASTC4x4"] = 1] = "UASTC4x4";
})(SourceTextureFormat || (SourceTextureFormat = {}));
var TranscodeTarget;
(function (TranscodeTarget) {
    TranscodeTarget[TranscodeTarget["ASTC_4X4_RGBA"] = 0] = "ASTC_4X4_RGBA";
    TranscodeTarget[TranscodeTarget["BC7_RGBA"] = 1] = "BC7_RGBA";
    TranscodeTarget[TranscodeTarget["BC3_RGBA"] = 2] = "BC3_RGBA";
    TranscodeTarget[TranscodeTarget["BC1_RGB"] = 3] = "BC1_RGB";
    TranscodeTarget[TranscodeTarget["PVRTC1_4_RGBA"] = 4] = "PVRTC1_4_RGBA";
    TranscodeTarget[TranscodeTarget["PVRTC1_4_RGB"] = 5] = "PVRTC1_4_RGB";
    TranscodeTarget[TranscodeTarget["ETC2_RGBA"] = 6] = "ETC2_RGBA";
    TranscodeTarget[TranscodeTarget["ETC1_RGB"] = 7] = "ETC1_RGB";
    TranscodeTarget[TranscodeTarget["RGBA32"] = 8] = "RGBA32";
    TranscodeTarget[TranscodeTarget["R8"] = 9] = "R8";
    TranscodeTarget[TranscodeTarget["RG8"] = 10] = "RG8";
})(TranscodeTarget || (TranscodeTarget = {}));
var EngineFormat;
(function (EngineFormat) {
    EngineFormat[EngineFormat["COMPRESSED_RGBA_BPTC_UNORM_EXT"] = 36492] = "COMPRESSED_RGBA_BPTC_UNORM_EXT";
    EngineFormat[EngineFormat["COMPRESSED_RGBA_ASTC_4X4_KHR"] = 37808] = "COMPRESSED_RGBA_ASTC_4X4_KHR";
    EngineFormat[EngineFormat["COMPRESSED_RGB_S3TC_DXT1_EXT"] = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT";
    EngineFormat[EngineFormat["COMPRESSED_RGBA_S3TC_DXT5_EXT"] = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT";
    EngineFormat[EngineFormat["COMPRESSED_RGBA_PVRTC_4BPPV1_IMG"] = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG";
    EngineFormat[EngineFormat["COMPRESSED_RGB_PVRTC_4BPPV1_IMG"] = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG";
    EngineFormat[EngineFormat["COMPRESSED_RGBA8_ETC2_EAC"] = 37496] = "COMPRESSED_RGBA8_ETC2_EAC";
    EngineFormat[EngineFormat["COMPRESSED_RGB8_ETC2"] = 37492] = "COMPRESSED_RGB8_ETC2";
    EngineFormat[EngineFormat["COMPRESSED_RGB_ETC1_WEBGL"] = 36196] = "COMPRESSED_RGB_ETC1_WEBGL";
    EngineFormat[EngineFormat["RGBA8Format"] = 32856] = "RGBA8Format";
    EngineFormat[EngineFormat["R8Format"] = 33321] = "R8Format";
    EngineFormat[EngineFormat["RG8Format"] = 33323] = "RG8Format";
})(EngineFormat || (EngineFormat = {}));


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Misc/dataReader.js":
/*!**********************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Misc/dataReader.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataReader: () => (/* binding */ DataReader)
/* harmony export */ });
/**
 * Utility class for reading from a data buffer
 */
class DataReader {
    /**
     * The current byte offset from the beginning of the data buffer.
     */
    get byteOffset() {
        return this._dataByteOffset;
    }
    /**
     * Constructor
     * @param buffer The buffer to set
     * @param byteOffset The starting offset in the buffer
     * @param byteLength The byte length of the buffer
     */
    constructor(buffer, byteOffset, byteLength) {
        if (buffer.buffer) {
            this._dataView = new DataView(buffer.buffer, buffer.byteOffset + (byteOffset ?? 0), byteLength ?? buffer.byteLength);
        }
        else {
            this._dataView = new DataView(buffer, byteOffset ?? 0, byteLength ?? buffer.byteLength);
        }
        this._dataByteOffset = 0;
    }
    /**
     * Read a unsigned 8-bit integer from the currently loaded data range.
     * @returns The 8-bit integer read
     */
    readUint8() {
        const value = this._dataView.getUint8(this._dataByteOffset);
        this._dataByteOffset += 1;
        return value;
    }
    /**
     * Read a signed 8-bit integer from the currently loaded data range.
     * @returns The 8-bit integer read
     */
    readInt8() {
        const value = this._dataView.getInt8(this._dataByteOffset);
        this._dataByteOffset += 1;
        return value;
    }
    /**
     * Read a unsigned 16-bit integer from the currently loaded data range.
     * @returns The 16-bit integer read
     */
    readUint16() {
        const value = this._dataView.getUint16(this._dataByteOffset, true);
        this._dataByteOffset += 2;
        return value;
    }
    /**
     * Read a signed 16-bit integer from the currently loaded data range.
     * @returns The 16-bit integer read
     */
    readInt16() {
        const value = this._dataView.getInt16(this._dataByteOffset, true);
        this._dataByteOffset += 2;
        return value;
    }
    /**
     * Read a unsigned 32-bit integer from the currently loaded data range.
     * @returns The 32-bit integer read
     */
    readUint32() {
        const value = this._dataView.getUint32(this._dataByteOffset, true);
        this._dataByteOffset += 4;
        return value;
    }
    /**
     * Read a signed 32-bit integer from the currently loaded data range.
     * @returns The 32-bit integer read
     */
    readInt32() {
        const value = this._dataView.getInt32(this._dataByteOffset, true);
        this._dataByteOffset += 4;
        return value;
    }
    /**
     * Read a unsigned 32-bit integer from the currently loaded data range.
     * @returns The 32-bit integer read
     */
    readUint64() {
        // split 64-bit number into two 32-bit (4-byte) parts
        const left = this._dataView.getUint32(this._dataByteOffset, true);
        const right = this._dataView.getUint32(this._dataByteOffset + 4, true);
        // combine the two 32-bit values
        const combined = left + 2 ** 32 * right; // That was weird..Keeping it for posterity: true ? left + 2 ** 32 * right : 2 ** 32 * left + right;
        /*if (!Number.isSafeInteger(combined)) {
            console.warn('DataReader: ' + combined + ' exceeds MAX_SAFE_INTEGER. Precision may be lost.');
        }*/
        this._dataByteOffset += 8;
        return combined;
    }
    /**
     * Read a byte array from the currently loaded data range.
     * @param byteLength The byte length to read
     * @returns The byte array read
     */
    readUint8Array(byteLength) {
        const value = new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + this._dataByteOffset, byteLength);
        this._dataByteOffset += byteLength;
        return value;
    }
    /**
     * Skips the given byte length the currently loaded data range.
     * @param byteLength The byte length to skip
     * @returns This instance
     */
    skipBytes(byteLength) {
        this._dataByteOffset += byteLength;
        return this;
    }
}


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Misc/index.js":
/*!*****************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Misc/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataReader: () => (/* reexport safe */ _dataReader__WEBPACK_IMPORTED_MODULE_0__.DataReader)
/* harmony export */ });
/* harmony import */ var _dataReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataReader */ "../../../tools/ktx2Decoder/dist/Misc/dataReader.js");



/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Transcoders/index.js":
/*!************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Transcoders/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LiteTranscoder: () => (/* reexport safe */ _liteTranscoder__WEBPACK_IMPORTED_MODULE_0__.LiteTranscoder),
/* harmony export */   LiteTranscoder_UASTC_ASTC: () => (/* reexport safe */ _liteTranscoder_UASTC_ASTC__WEBPACK_IMPORTED_MODULE_1__.LiteTranscoder_UASTC_ASTC),
/* harmony export */   LiteTranscoder_UASTC_BC7: () => (/* reexport safe */ _liteTranscoder_UASTC_BC7__WEBPACK_IMPORTED_MODULE_2__.LiteTranscoder_UASTC_BC7),
/* harmony export */   LiteTranscoder_UASTC_R8_UNORM: () => (/* reexport safe */ _liteTranscoder_UASTC_R8_UNORM__WEBPACK_IMPORTED_MODULE_3__.LiteTranscoder_UASTC_R8_UNORM),
/* harmony export */   LiteTranscoder_UASTC_RG8_UNORM: () => (/* reexport safe */ _liteTranscoder_UASTC_RG8_UNORM__WEBPACK_IMPORTED_MODULE_4__.LiteTranscoder_UASTC_RG8_UNORM),
/* harmony export */   LiteTranscoder_UASTC_RGBA_SRGB: () => (/* reexport safe */ _liteTranscoder_UASTC_RGBA_SRGB__WEBPACK_IMPORTED_MODULE_6__.LiteTranscoder_UASTC_RGBA_SRGB),
/* harmony export */   LiteTranscoder_UASTC_RGBA_UNORM: () => (/* reexport safe */ _liteTranscoder_UASTC_RGBA_UNORM__WEBPACK_IMPORTED_MODULE_5__.LiteTranscoder_UASTC_RGBA_UNORM),
/* harmony export */   MSCTranscoder: () => (/* reexport safe */ _mscTranscoder__WEBPACK_IMPORTED_MODULE_7__.MSCTranscoder)
/* harmony export */ });
/* harmony import */ var _liteTranscoder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./liteTranscoder */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder.js");
/* harmony import */ var _liteTranscoder_UASTC_ASTC__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./liteTranscoder_UASTC_ASTC */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_ASTC.js");
/* harmony import */ var _liteTranscoder_UASTC_BC7__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./liteTranscoder_UASTC_BC7 */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_BC7.js");
/* harmony import */ var _liteTranscoder_UASTC_R8_UNORM__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./liteTranscoder_UASTC_R8_UNORM */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_R8_UNORM.js");
/* harmony import */ var _liteTranscoder_UASTC_RG8_UNORM__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./liteTranscoder_UASTC_RG8_UNORM */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RG8_UNORM.js");
/* harmony import */ var _liteTranscoder_UASTC_RGBA_UNORM__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./liteTranscoder_UASTC_RGBA_UNORM */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RGBA_UNORM.js");
/* harmony import */ var _liteTranscoder_UASTC_RGBA_SRGB__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./liteTranscoder_UASTC_RGBA_SRGB */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RGBA_SRGB.js");
/* harmony import */ var _mscTranscoder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mscTranscoder */ "../../../tools/ktx2Decoder/dist/Transcoders/mscTranscoder.js");










/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder.js":
/*!*********************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LiteTranscoder: () => (/* binding */ LiteTranscoder)
/* harmony export */ });
/* harmony import */ var _transcoder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transcoder */ "../../../tools/ktx2Decoder/dist/transcoder.js");
/* harmony import */ var _wasmMemoryManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wasmMemoryManager */ "../../../tools/ktx2Decoder/dist/wasmMemoryManager.js");


/**
 * @internal
 */
class LiteTranscoder extends _transcoder__WEBPACK_IMPORTED_MODULE_0__.Transcoder {
    _loadModule() {
        if (this._modulePromise) {
            return this._modulePromise;
        }
        this._modulePromise = _wasmMemoryManager__WEBPACK_IMPORTED_MODULE_1__.WASMMemoryManager.LoadWASM(this._modulePath).then((wasmBinary) => {
            return new Promise((resolve) => {
                WebAssembly.instantiate(wasmBinary, { env: { memory: this._memoryManager.wasmMemory } }).then((moduleWrapper) => {
                    resolve({ module: moduleWrapper.instance.exports });
                });
            });
        });
        return this._modulePromise;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    get memoryManager() {
        return this._memoryManager;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    setModulePath(modulePath) {
        this._modulePath = modulePath;
    }
    initialize() {
        this._transcodeInPlace = true;
    }
    needMemoryManager() {
        return true;
    }
    setMemoryManager(memoryMgr) {
        this._memoryManager = memoryMgr;
    }
    transcode(src, dst, level, width, height, uncompressedByteLength, ktx2Reader, imageDesc, encodedData) {
        return this._loadModule().then((moduleWrapper) => {
            const transcoder = moduleWrapper.module;
            const [textureView, uncompressedTextureView, nBlocks] = this._prepareTranscoding(width, height, uncompressedByteLength, encodedData);
            return transcoder.transcode(nBlocks) === 0 ? (this._transcodeInPlace ? textureView.slice() : uncompressedTextureView.slice()) : null;
        });
    }
    _prepareTranscoding(width, height, uncompressedByteLength, encodedData, uncompressedNumComponents) {
        const nBlocks = ((width + 3) >> 2) * ((height + 3) >> 2);
        if (uncompressedNumComponents !== undefined) {
            uncompressedByteLength = width * ((height + 3) >> 2) * 4 * uncompressedNumComponents;
        }
        const texMemoryPages = ((nBlocks * 16 + 65535 + (this._transcodeInPlace ? 0 : uncompressedByteLength)) >> 16) + 1;
        const textureView = this.memoryManager.getMemoryView(texMemoryPages, 65536, nBlocks * 16);
        const uncompressedTextureView = this._transcodeInPlace
            ? null
            : new Uint8Array(this._memoryManager.wasmMemory.buffer, 65536 + nBlocks * 16, uncompressedNumComponents !== undefined ? width * height * uncompressedNumComponents : uncompressedByteLength);
        textureView.set(encodedData);
        return [textureView, uncompressedTextureView, nBlocks];
    }
}


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_ASTC.js":
/*!********************************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_ASTC.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LiteTranscoder_UASTC_ASTC: () => (/* binding */ LiteTranscoder_UASTC_ASTC)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./liteTranscoder */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder.js");


/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
class LiteTranscoder_UASTC_ASTC extends _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__.LiteTranscoder {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static CanTranscode(src, dst, isInGammaSpace) {
        return src === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 && dst === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.ASTC_4X4_RGBA;
    }
    getName() {
        return LiteTranscoder_UASTC_ASTC.Name;
    }
    initialize() {
        super.initialize();
        this.setModulePath(LiteTranscoder_UASTC_ASTC.WasmModuleURL);
    }
}
/**
 * URL to use when loading the wasm module for the transcoder
 */
LiteTranscoder_UASTC_ASTC.WasmModuleURL = "https://preview.babylonjs.com/ktx2Transcoders/1/uastc_astc.wasm";
LiteTranscoder_UASTC_ASTC.Name = "UniversalTranscoder_UASTC_ASTC";


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_BC7.js":
/*!*******************************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_BC7.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LiteTranscoder_UASTC_BC7: () => (/* binding */ LiteTranscoder_UASTC_BC7)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./liteTranscoder */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder.js");


/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
class LiteTranscoder_UASTC_BC7 extends _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__.LiteTranscoder {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static CanTranscode(src, dst, isInGammaSpace) {
        return src === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 && dst === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.BC7_RGBA;
    }
    getName() {
        return LiteTranscoder_UASTC_BC7.Name;
    }
    initialize() {
        super.initialize();
        this.setModulePath(LiteTranscoder_UASTC_BC7.WasmModuleURL);
    }
}
/**
 * URL to use when loading the wasm module for the transcoder
 */
LiteTranscoder_UASTC_BC7.WasmModuleURL = "https://preview.babylonjs.com/ktx2Transcoders/1/uastc_bc7.wasm";
LiteTranscoder_UASTC_BC7.Name = "UniversalTranscoder_UASTC_BC7";


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_R8_UNORM.js":
/*!************************************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_R8_UNORM.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LiteTranscoder_UASTC_R8_UNORM: () => (/* binding */ LiteTranscoder_UASTC_R8_UNORM)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./liteTranscoder */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder.js");


/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
class LiteTranscoder_UASTC_R8_UNORM extends _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__.LiteTranscoder {
    static CanTranscode(src, dst, isInGammaSpace) {
        return src === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 && dst === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.R8;
    }
    getName() {
        return LiteTranscoder_UASTC_R8_UNORM.Name;
    }
    initialize() {
        super.initialize();
        this._transcodeInPlace = false;
        this.setModulePath(LiteTranscoder_UASTC_R8_UNORM.WasmModuleURL);
    }
    transcode(src, dst, level, width, height, uncompressedByteLength, ktx2Reader, imageDesc, encodedData) {
        return this._loadModule().then((moduleWrapper) => {
            const transcoder = moduleWrapper.module;
            const [, uncompressedTextureView] = this._prepareTranscoding(width, height, uncompressedByteLength, encodedData, 1);
            return transcoder.decode(width, height) === 0 ? uncompressedTextureView.slice() : null;
        });
    }
}
/**
 * URL to use when loading the wasm module for the transcoder (unorm)
 */
LiteTranscoder_UASTC_R8_UNORM.WasmModuleURL = "https://preview.babylonjs.com/ktx2Transcoders/1/uastc_r8_unorm.wasm";
LiteTranscoder_UASTC_R8_UNORM.Name = "UniversalTranscoder_UASTC_R8_UNORM";


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RG8_UNORM.js":
/*!*************************************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RG8_UNORM.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LiteTranscoder_UASTC_RG8_UNORM: () => (/* binding */ LiteTranscoder_UASTC_RG8_UNORM)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./liteTranscoder */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder.js");


/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
class LiteTranscoder_UASTC_RG8_UNORM extends _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__.LiteTranscoder {
    static CanTranscode(src, dst, isInGammaSpace) {
        return src === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 && dst === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.RG8;
    }
    getName() {
        return LiteTranscoder_UASTC_RG8_UNORM.Name;
    }
    initialize() {
        super.initialize();
        this._transcodeInPlace = false;
        this.setModulePath(LiteTranscoder_UASTC_RG8_UNORM.WasmModuleURL);
    }
    transcode(src, dst, level, width, height, uncompressedByteLength, ktx2Reader, imageDesc, encodedData) {
        return this._loadModule().then((moduleWrapper) => {
            const transcoder = moduleWrapper.module;
            const [, uncompressedTextureView] = this._prepareTranscoding(width, height, uncompressedByteLength, encodedData, 2);
            return transcoder.decode(width, height) === 0 ? uncompressedTextureView.slice() : null;
        });
    }
}
/**
 * URL to use when loading the wasm module for the transcoder (unorm)
 */
LiteTranscoder_UASTC_RG8_UNORM.WasmModuleURL = "https://preview.babylonjs.com/ktx2Transcoders/1/uastc_rg8_unorm.wasm";
LiteTranscoder_UASTC_RG8_UNORM.Name = "UniversalTranscoder_UASTC_RG8_UNORM";


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RGBA_SRGB.js":
/*!*************************************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RGBA_SRGB.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LiteTranscoder_UASTC_RGBA_SRGB: () => (/* binding */ LiteTranscoder_UASTC_RGBA_SRGB)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./liteTranscoder */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder.js");


/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
class LiteTranscoder_UASTC_RGBA_SRGB extends _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__.LiteTranscoder {
    static CanTranscode(src, dst, isInGammaSpace) {
        return src === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 && dst === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.RGBA32 && isInGammaSpace;
    }
    getName() {
        return LiteTranscoder_UASTC_RGBA_SRGB.Name;
    }
    initialize() {
        super.initialize();
        this._transcodeInPlace = false;
        this.setModulePath(LiteTranscoder_UASTC_RGBA_SRGB.WasmModuleURL);
    }
    transcode(src, dst, level, width, height, uncompressedByteLength, ktx2Reader, imageDesc, encodedData) {
        return this._loadModule().then((moduleWrapper) => {
            const transcoder = moduleWrapper.module;
            const [, uncompressedTextureView] = this._prepareTranscoding(width, height, uncompressedByteLength, encodedData, 4);
            return transcoder.decode(width, height) === 0 ? uncompressedTextureView.slice() : null;
        });
    }
}
/**
 * URL to use when loading the wasm module for the transcoder (srgb)
 */
LiteTranscoder_UASTC_RGBA_SRGB.WasmModuleURL = "https://preview.babylonjs.com/ktx2Transcoders/1/uastc_rgba8_srgb_v2.wasm";
LiteTranscoder_UASTC_RGBA_SRGB.Name = "UniversalTranscoder_UASTC_RGBA_SRGB";


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RGBA_UNORM.js":
/*!**************************************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RGBA_UNORM.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LiteTranscoder_UASTC_RGBA_UNORM: () => (/* binding */ LiteTranscoder_UASTC_RGBA_UNORM)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./liteTranscoder */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder.js");


/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
class LiteTranscoder_UASTC_RGBA_UNORM extends _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__.LiteTranscoder {
    static CanTranscode(src, dst, isInGammaSpace) {
        return src === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 && dst === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.RGBA32 && !isInGammaSpace;
    }
    getName() {
        return LiteTranscoder_UASTC_RGBA_UNORM.Name;
    }
    initialize() {
        super.initialize();
        this._transcodeInPlace = false;
        this.setModulePath(LiteTranscoder_UASTC_RGBA_UNORM.WasmModuleURL);
    }
    transcode(src, dst, level, width, height, uncompressedByteLength, ktx2Reader, imageDesc, encodedData) {
        return this._loadModule().then((moduleWrapper) => {
            const transcoder = moduleWrapper.module;
            const [, uncompressedTextureView] = this._prepareTranscoding(width, height, uncompressedByteLength, encodedData, 4);
            return transcoder.decode(width, height) === 0 ? uncompressedTextureView.slice() : null;
        });
    }
}
/**
 * URL to use when loading the wasm module for the transcoder (unorm)
 */
LiteTranscoder_UASTC_RGBA_UNORM.WasmModuleURL = "https://preview.babylonjs.com/ktx2Transcoders/1/uastc_rgba8_unorm_v2.wasm";
LiteTranscoder_UASTC_RGBA_UNORM.Name = "UniversalTranscoder_UASTC_RGBA_UNORM";


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Transcoders/mscTranscoder.js":
/*!********************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Transcoders/mscTranscoder.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MSCTranscoder: () => (/* binding */ MSCTranscoder)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _transcoder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transcoder */ "../../../tools/ktx2Decoder/dist/transcoder.js");
/* harmony import */ var _wasmMemoryManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../wasmMemoryManager */ "../../../tools/ktx2Decoder/dist/wasmMemoryManager.js");



/**
 * @internal
 */
class MSCTranscoder extends _transcoder__WEBPACK_IMPORTED_MODULE_1__.Transcoder {
    getName() {
        return MSCTranscoder.Name;
    }
    _getMSCBasisTranscoder() {
        if (this._mscBasisTranscoderPromise) {
            return this._mscBasisTranscoderPromise;
        }
        this._mscBasisTranscoderPromise = _wasmMemoryManager__WEBPACK_IMPORTED_MODULE_2__.WASMMemoryManager.LoadWASM(MSCTranscoder.WasmModuleURL).then((wasmBinary) => {
            if (MSCTranscoder.UseFromWorkerThread) {
                importScripts(MSCTranscoder.JSModuleURL);
            }
            // Worker Number = 0 and MSC_TRANSCODER has not been loaded yet.
            else if (typeof MSC_TRANSCODER === "undefined") {
                return new Promise((resolve, reject) => {
                    const head = document.getElementsByTagName("head")[0];
                    const script = document.createElement("script");
                    script.setAttribute("type", "text/javascript");
                    script.setAttribute("src", MSCTranscoder.JSModuleURL);
                    script.onload = () => {
                        MSC_TRANSCODER({ wasmBinary }).then((basisModule) => {
                            basisModule.initTranscoders();
                            this._mscBasisModule = basisModule;
                            resolve();
                        });
                    };
                    script.onerror = () => {
                        reject("Can not load MSC_TRANSCODER script.");
                    };
                    head.appendChild(script);
                });
            }
            return new Promise((resolve) => {
                MSC_TRANSCODER({ wasmBinary }).then((basisModule) => {
                    basisModule.initTranscoders();
                    this._mscBasisModule = basisModule;
                    resolve();
                });
            });
        });
        return this._mscBasisTranscoderPromise;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static CanTranscode(src, dst, isInGammaSpace) {
        return true;
    }
    transcode(src, dst, level, width, height, uncompressedByteLength, ktx2Reader, imageDesc, encodedData) {
        const isVideo = false;
        return this._getMSCBasisTranscoder().then(() => {
            const basisModule = this._mscBasisModule;
            let transcoder;
            let imageInfo;
            let result;
            let textureData = null;
            try {
                transcoder = src === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 ? new basisModule.UastcImageTranscoder() : new basisModule.BasisLzEtc1sImageTranscoder();
                const texFormat = src === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 ? basisModule.TextureFormat.UASTC4x4 : basisModule.TextureFormat.ETC1S;
                imageInfo = new basisModule.ImageInfo(texFormat, width, height, level);
                const targetFormat = basisModule.TranscodeTarget[core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget[dst]]; // works because the labels of the sourceTextureFormat enum are the same as the property names used in TranscodeTarget!
                if (!basisModule.isFormatSupported(targetFormat, texFormat)) {
                    throw new Error(`MSCTranscoder: Transcoding from "${core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat[src]}" to "${core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget[dst]}" not supported by current transcoder build.`);
                }
                if (src === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.ETC1S) {
                    const sgd = ktx2Reader.supercompressionGlobalData;
                    transcoder.decodePalettes(sgd.endpointCount, sgd.endpointsData, sgd.selectorCount, sgd.selectorsData);
                    transcoder.decodeTables(sgd.tablesData);
                    imageInfo.flags = imageDesc.imageFlags;
                    imageInfo.rgbByteOffset = 0;
                    imageInfo.rgbByteLength = imageDesc.rgbSliceByteLength;
                    imageInfo.alphaByteOffset = imageDesc.alphaSliceByteOffset > 0 ? imageDesc.rgbSliceByteLength : 0;
                    imageInfo.alphaByteLength = imageDesc.alphaSliceByteLength;
                    result = transcoder.transcodeImage(targetFormat, encodedData, imageInfo, 0, isVideo);
                }
                else {
                    imageInfo.flags = 0;
                    imageInfo.rgbByteOffset = 0;
                    imageInfo.rgbByteLength = uncompressedByteLength;
                    imageInfo.alphaByteOffset = 0;
                    imageInfo.alphaByteLength = 0;
                    result = transcoder.transcodeImage(targetFormat, encodedData, imageInfo, 0, ktx2Reader.hasAlpha, isVideo);
                }
            }
            finally {
                if (transcoder) {
                    transcoder.delete();
                }
                if (imageInfo) {
                    imageInfo.delete();
                }
                if (result && result.transcodedImage) {
                    textureData = result.transcodedImage.get_typed_memory_view().slice();
                    result.transcodedImage.delete();
                }
            }
            return textureData;
        });
    }
}
/**
 * URL to use when loading the MSC transcoder
 */
MSCTranscoder.JSModuleURL = "https://preview.babylonjs.com/ktx2Transcoders/1/msc_basis_transcoder.js";
/**
 * URL to use when loading the wasm module for the transcoder
 */
MSCTranscoder.WasmModuleURL = "https://preview.babylonjs.com/ktx2Transcoders/1/msc_basis_transcoder.wasm";
MSCTranscoder.UseFromWorkerThread = true;
MSCTranscoder.Name = "MSCTranscoder";


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/index.js":
/*!************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataReader: () => (/* reexport safe */ _Misc_index__WEBPACK_IMPORTED_MODULE_6__.DataReader),
/* harmony export */   KTX2Decoder: () => (/* reexport safe */ _ktx2Decoder__WEBPACK_IMPORTED_MODULE_0__.KTX2Decoder),
/* harmony export */   KTX2FileReader: () => (/* reexport safe */ _ktx2FileReader__WEBPACK_IMPORTED_MODULE_1__.KTX2FileReader),
/* harmony export */   LiteTranscoder: () => (/* reexport safe */ _Transcoders_index__WEBPACK_IMPORTED_MODULE_7__.LiteTranscoder),
/* harmony export */   LiteTranscoder_UASTC_ASTC: () => (/* reexport safe */ _Transcoders_index__WEBPACK_IMPORTED_MODULE_7__.LiteTranscoder_UASTC_ASTC),
/* harmony export */   LiteTranscoder_UASTC_BC7: () => (/* reexport safe */ _Transcoders_index__WEBPACK_IMPORTED_MODULE_7__.LiteTranscoder_UASTC_BC7),
/* harmony export */   LiteTranscoder_UASTC_R8_UNORM: () => (/* reexport safe */ _Transcoders_index__WEBPACK_IMPORTED_MODULE_7__.LiteTranscoder_UASTC_R8_UNORM),
/* harmony export */   LiteTranscoder_UASTC_RG8_UNORM: () => (/* reexport safe */ _Transcoders_index__WEBPACK_IMPORTED_MODULE_7__.LiteTranscoder_UASTC_RG8_UNORM),
/* harmony export */   LiteTranscoder_UASTC_RGBA_SRGB: () => (/* reexport safe */ _Transcoders_index__WEBPACK_IMPORTED_MODULE_7__.LiteTranscoder_UASTC_RGBA_SRGB),
/* harmony export */   LiteTranscoder_UASTC_RGBA_UNORM: () => (/* reexport safe */ _Transcoders_index__WEBPACK_IMPORTED_MODULE_7__.LiteTranscoder_UASTC_RGBA_UNORM),
/* harmony export */   MSCTranscoder: () => (/* reexport safe */ _Transcoders_index__WEBPACK_IMPORTED_MODULE_7__.MSCTranscoder),
/* harmony export */   SupercompressionScheme: () => (/* reexport safe */ _ktx2FileReader__WEBPACK_IMPORTED_MODULE_1__.SupercompressionScheme),
/* harmony export */   Transcoder: () => (/* reexport safe */ _transcoder__WEBPACK_IMPORTED_MODULE_2__.Transcoder),
/* harmony export */   TranscoderManager: () => (/* reexport safe */ _transcoderManager__WEBPACK_IMPORTED_MODULE_3__.TranscoderManager),
/* harmony export */   WASMMemoryManager: () => (/* reexport safe */ _wasmMemoryManager__WEBPACK_IMPORTED_MODULE_4__.WASMMemoryManager),
/* harmony export */   ZSTDDecoder: () => (/* reexport safe */ _zstddec__WEBPACK_IMPORTED_MODULE_5__.ZSTDDecoder)
/* harmony export */ });
/* harmony import */ var _ktx2Decoder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ktx2Decoder */ "../../../tools/ktx2Decoder/dist/ktx2Decoder.js");
/* harmony import */ var _ktx2FileReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ktx2FileReader */ "../../../tools/ktx2Decoder/dist/ktx2FileReader.js");
/* harmony import */ var _transcoder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transcoder */ "../../../tools/ktx2Decoder/dist/transcoder.js");
/* harmony import */ var _transcoderManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transcoderManager */ "../../../tools/ktx2Decoder/dist/transcoderManager.js");
/* harmony import */ var _wasmMemoryManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wasmMemoryManager */ "../../../tools/ktx2Decoder/dist/wasmMemoryManager.js");
/* harmony import */ var _zstddec__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./zstddec */ "../../../tools/ktx2Decoder/dist/zstddec.js");
/* harmony import */ var _Misc_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Misc/index */ "../../../tools/ktx2Decoder/dist/Misc/index.js");
/* harmony import */ var _Transcoders_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Transcoders/index */ "../../../tools/ktx2Decoder/dist/Transcoders/index.js");
/* eslint-disable import/no-internal-modules */










/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/ktx2Decoder.js":
/*!******************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/ktx2Decoder.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KTX2Decoder: () => (/* binding */ KTX2Decoder)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _ktx2FileReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ktx2FileReader */ "../../../tools/ktx2Decoder/dist/ktx2FileReader.js");
/* harmony import */ var _transcoderManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transcoderManager */ "../../../tools/ktx2Decoder/dist/transcoderManager.js");
/* harmony import */ var _Transcoders_liteTranscoder_UASTC_ASTC__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Transcoders/liteTranscoder_UASTC_ASTC */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_ASTC.js");
/* harmony import */ var _Transcoders_liteTranscoder_UASTC_BC7__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Transcoders/liteTranscoder_UASTC_BC7 */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_BC7.js");
/* harmony import */ var _Transcoders_liteTranscoder_UASTC_RGBA_UNORM__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Transcoders/liteTranscoder_UASTC_RGBA_UNORM */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RGBA_UNORM.js");
/* harmony import */ var _Transcoders_liteTranscoder_UASTC_RGBA_SRGB__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Transcoders/liteTranscoder_UASTC_RGBA_SRGB */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RGBA_SRGB.js");
/* harmony import */ var _Transcoders_liteTranscoder_UASTC_R8_UNORM__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Transcoders/liteTranscoder_UASTC_R8_UNORM */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_R8_UNORM.js");
/* harmony import */ var _Transcoders_liteTranscoder_UASTC_RG8_UNORM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Transcoders/liteTranscoder_UASTC_RG8_UNORM */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RG8_UNORM.js");
/* harmony import */ var _Transcoders_mscTranscoder__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Transcoders/mscTranscoder */ "../../../tools/ktx2Decoder/dist/Transcoders/mscTranscoder.js");
/* harmony import */ var _zstddec__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./zstddec */ "../../../tools/ktx2Decoder/dist/zstddec.js");
/* harmony import */ var _transcodeDecisionTree__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./transcodeDecisionTree */ "../../../tools/ktx2Decoder/dist/transcodeDecisionTree.js");
/**
 * Resources used for the implementation:
 *  - 3js KTX2 loader: https://github.com/mrdoob/three.js/blob/dfb5c23ce126ec845e4aa240599915fef5375797/examples/jsm/loaders/KTX2Loader.js
 *  - Universal Texture Transcoders: https://github.com/KhronosGroup/Universal-Texture-Transcoders
 *  - KTX2 specification: http://github.khronos.org/KTX-Specification/
 *  - KTX2 binaries to convert files: https://github.com/KhronosGroup/KTX-Software/releases
 *  - KTX specification: https://www.khronos.org/registry/DataFormat/specs/1.3/dataformat.1.3.html
 *  - KTX-Software: https://github.com/KhronosGroup/KTX-Software
 */












const isPowerOfTwo = (value) => {
    return (value & (value - 1)) === 0 && value !== 0;
};
/**
 * Class for decoding KTX2 files
 *
 */
class KTX2Decoder {
    constructor() {
        this._transcoderMgr = new _transcoderManager__WEBPACK_IMPORTED_MODULE_2__.TranscoderManager();
    }
    decode(data, caps, options) {
        const finalOptions = { ...options, ...KTX2Decoder.DefaultDecoderOptions };
        return Promise.resolve().then(() => {
            const kfr = new _ktx2FileReader__WEBPACK_IMPORTED_MODULE_1__.KTX2FileReader(data);
            if (!kfr.isValid()) {
                throw new Error("Invalid KT2 file: wrong signature");
            }
            kfr.parse();
            if (kfr.needZSTDDecoder) {
                if (!this._zstdDecoder) {
                    this._zstdDecoder = new _zstddec__WEBPACK_IMPORTED_MODULE_10__.ZSTDDecoder();
                }
                return this._zstdDecoder.init().then(() => {
                    return this._decodeData(kfr, caps, finalOptions);
                });
            }
            return this._decodeData(kfr, caps, finalOptions);
        });
    }
    _decodeData(kfr, caps, options) {
        const width = kfr.header.pixelWidth;
        const height = kfr.header.pixelHeight;
        const srcTexFormat = kfr.textureFormat;
        const decisionTree = new _transcodeDecisionTree__WEBPACK_IMPORTED_MODULE_11__.TranscodeDecisionTree(srcTexFormat, kfr.hasAlpha, isPowerOfTwo(width) && isPowerOfTwo(height), caps, options);
        if (options?.transcodeFormatDecisionTree) {
            decisionTree.parseTree(options?.transcodeFormatDecisionTree);
        }
        const transcodeFormat = decisionTree.transcodeFormat;
        const engineFormat = decisionTree.engineFormat;
        const roundToMultiple4 = decisionTree.roundToMultiple4;
        const transcoder = this._transcoderMgr.findTranscoder(srcTexFormat, transcodeFormat, kfr.isInGammaSpace, options?.bypassTranscoders);
        if (transcoder === null) {
            throw new Error(`no transcoder found to transcode source texture format "${core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat[srcTexFormat]}" to format "${core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget[transcodeFormat]}"`);
        }
        const mipmaps = [];
        const dataPromises = [];
        const decodedData = {
            width: 0,
            height: 0,
            transcodedFormat: engineFormat,
            mipmaps,
            isInGammaSpace: kfr.isInGammaSpace,
            hasAlpha: kfr.hasAlpha,
            transcoderName: transcoder.getName(),
        };
        let firstImageDescIndex = 0;
        for (let level = 0; level < kfr.header.levelCount; level++) {
            if (level > 0) {
                firstImageDescIndex += Math.max(kfr.header.layerCount, 1) * kfr.header.faceCount * Math.max(kfr.header.pixelDepth >> (level - 1), 1);
            }
            const levelWidth = Math.floor(width / (1 << level)) || 1;
            const levelHeight = Math.floor(height / (1 << level)) || 1;
            const numImagesInLevel = kfr.header.faceCount; // note that cubemap are not supported yet (see KTX2FileReader), so faceCount == 1
            const levelImageByteLength = ((levelWidth + 3) >> 2) * ((levelHeight + 3) >> 2) * kfr.dfdBlock.bytesPlane[0];
            const levelUncompressedByteLength = kfr.levels[level].uncompressedByteLength;
            let levelDataBuffer = kfr.data.buffer;
            let levelDataOffset = kfr.levels[level].byteOffset + kfr.data.byteOffset;
            let imageOffsetInLevel = 0;
            if (kfr.header.supercompressionScheme === _ktx2FileReader__WEBPACK_IMPORTED_MODULE_1__.SupercompressionScheme.ZStandard) {
                levelDataBuffer = this._zstdDecoder.decode(new Uint8Array(levelDataBuffer, levelDataOffset, kfr.levels[level].byteLength), levelUncompressedByteLength);
                levelDataOffset = 0;
            }
            if (level === 0) {
                decodedData.width = roundToMultiple4 ? (levelWidth + 3) & ~3 : levelWidth;
                decodedData.height = roundToMultiple4 ? (levelHeight + 3) & ~3 : levelHeight;
            }
            for (let imageIndex = 0; imageIndex < numImagesInLevel; imageIndex++) {
                let encodedData;
                let imageDesc = null;
                if (kfr.header.supercompressionScheme === _ktx2FileReader__WEBPACK_IMPORTED_MODULE_1__.SupercompressionScheme.BasisLZ) {
                    imageDesc = kfr.supercompressionGlobalData.imageDescs[firstImageDescIndex + imageIndex];
                    encodedData = new Uint8Array(levelDataBuffer, levelDataOffset + imageDesc.rgbSliceByteOffset, imageDesc.rgbSliceByteLength + imageDesc.alphaSliceByteLength);
                }
                else {
                    encodedData = new Uint8Array(levelDataBuffer, levelDataOffset + imageOffsetInLevel, levelImageByteLength);
                    imageOffsetInLevel += levelImageByteLength;
                }
                const mipmap = {
                    data: null,
                    width: levelWidth,
                    height: levelHeight,
                };
                const transcodedData = transcoder
                    .transcode(srcTexFormat, transcodeFormat, level, levelWidth, levelHeight, levelUncompressedByteLength, kfr, imageDesc, encodedData)
                    .then((data) => {
                    mipmap.data = data;
                    return data;
                })
                    .catch((reason) => {
                    decodedData.errors = decodedData.errors ?? "";
                    decodedData.errors += reason + "\n" + reason.stack + "\n";
                    return null;
                });
                dataPromises.push(transcodedData);
                mipmaps.push(mipmap);
            }
        }
        return Promise.all(dataPromises).then(() => {
            return decodedData;
        });
    }
}
KTX2Decoder.DefaultDecoderOptions = {};
// Put in the order you want the transcoders to be used in priority
_transcoderManager__WEBPACK_IMPORTED_MODULE_2__.TranscoderManager.RegisterTranscoder(_Transcoders_liteTranscoder_UASTC_ASTC__WEBPACK_IMPORTED_MODULE_3__.LiteTranscoder_UASTC_ASTC);
_transcoderManager__WEBPACK_IMPORTED_MODULE_2__.TranscoderManager.RegisterTranscoder(_Transcoders_liteTranscoder_UASTC_BC7__WEBPACK_IMPORTED_MODULE_4__.LiteTranscoder_UASTC_BC7);
_transcoderManager__WEBPACK_IMPORTED_MODULE_2__.TranscoderManager.RegisterTranscoder(_Transcoders_liteTranscoder_UASTC_RGBA_UNORM__WEBPACK_IMPORTED_MODULE_5__.LiteTranscoder_UASTC_RGBA_UNORM);
_transcoderManager__WEBPACK_IMPORTED_MODULE_2__.TranscoderManager.RegisterTranscoder(_Transcoders_liteTranscoder_UASTC_RGBA_SRGB__WEBPACK_IMPORTED_MODULE_6__.LiteTranscoder_UASTC_RGBA_SRGB);
_transcoderManager__WEBPACK_IMPORTED_MODULE_2__.TranscoderManager.RegisterTranscoder(_Transcoders_liteTranscoder_UASTC_R8_UNORM__WEBPACK_IMPORTED_MODULE_7__.LiteTranscoder_UASTC_R8_UNORM);
_transcoderManager__WEBPACK_IMPORTED_MODULE_2__.TranscoderManager.RegisterTranscoder(_Transcoders_liteTranscoder_UASTC_RG8_UNORM__WEBPACK_IMPORTED_MODULE_8__.LiteTranscoder_UASTC_RG8_UNORM);
_transcoderManager__WEBPACK_IMPORTED_MODULE_2__.TranscoderManager.RegisterTranscoder(_Transcoders_mscTranscoder__WEBPACK_IMPORTED_MODULE_9__.MSCTranscoder); // catch all transcoder - will throw an error if the format can't be transcoded


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/ktx2FileReader.js":
/*!*********************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/ktx2FileReader.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KTX2FileReader: () => (/* binding */ KTX2FileReader),
/* harmony export */   SupercompressionScheme: () => (/* binding */ SupercompressionScheme)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _Misc_dataReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Misc/dataReader */ "../../../tools/ktx2Decoder/dist/Misc/dataReader.js");
/* eslint-disable @typescript-eslint/naming-convention */


/** @internal */
var SupercompressionScheme;
(function (SupercompressionScheme) {
    SupercompressionScheme[SupercompressionScheme["None"] = 0] = "None";
    SupercompressionScheme[SupercompressionScheme["BasisLZ"] = 1] = "BasisLZ";
    SupercompressionScheme[SupercompressionScheme["ZStandard"] = 2] = "ZStandard";
    SupercompressionScheme[SupercompressionScheme["ZLib"] = 3] = "ZLib";
})(SupercompressionScheme || (SupercompressionScheme = {}));
class KTX2FileReader {
    /**
     * Will throw an exception if the file can't be parsed
     * @param data
     */
    constructor(data) {
        this._data = data;
    }
    get data() {
        return this._data;
    }
    get header() {
        return this._header;
    }
    get levels() {
        return this._levels;
    }
    get dfdBlock() {
        return this._dfdBlock;
    }
    get supercompressionGlobalData() {
        return this._supercompressionGlobalData;
    }
    isValid() {
        return KTX2FileReader.IsValid(this._data);
    }
    parse() {
        let offsetInFile = 12; // skip the header
        /**
         * Get the header
         */
        const hdrReader = new _Misc_dataReader__WEBPACK_IMPORTED_MODULE_1__.DataReader(this._data, offsetInFile, 17 * 4);
        const header = (this._header = {
            vkFormat: hdrReader.readUint32(),
            typeSize: hdrReader.readUint32(),
            pixelWidth: hdrReader.readUint32(),
            pixelHeight: hdrReader.readUint32(),
            pixelDepth: hdrReader.readUint32(),
            layerCount: hdrReader.readUint32(),
            faceCount: hdrReader.readUint32(),
            levelCount: hdrReader.readUint32(),
            supercompressionScheme: hdrReader.readUint32(),
            dfdByteOffset: hdrReader.readUint32(),
            dfdByteLength: hdrReader.readUint32(),
            kvdByteOffset: hdrReader.readUint32(),
            kvdByteLength: hdrReader.readUint32(),
            sgdByteOffset: hdrReader.readUint64(),
            sgdByteLength: hdrReader.readUint64(),
        });
        if (header.pixelDepth > 0) {
            throw new Error(`Failed to parse KTX2 file - Only 2D textures are currently supported.`);
        }
        if (header.layerCount > 1) {
            throw new Error(`Failed to parse KTX2 file - Array textures are not currently supported.`);
        }
        if (header.faceCount > 1) {
            throw new Error(`Failed to parse KTX2 file - Cube textures are not currently supported.`);
        }
        offsetInFile += hdrReader.byteOffset;
        /**
         * Get the levels
         */
        let levelCount = Math.max(1, header.levelCount);
        const levelReader = new _Misc_dataReader__WEBPACK_IMPORTED_MODULE_1__.DataReader(this._data, offsetInFile, levelCount * 3 * (2 * 4));
        const levels = (this._levels = []);
        while (levelCount--) {
            levels.push({
                byteOffset: levelReader.readUint64(),
                byteLength: levelReader.readUint64(),
                uncompressedByteLength: levelReader.readUint64(),
            });
        }
        offsetInFile += levelReader.byteOffset;
        /**
         * Get the data format descriptor (DFD) blocks
         */
        const dfdReader = new _Misc_dataReader__WEBPACK_IMPORTED_MODULE_1__.DataReader(this._data, header.dfdByteOffset, header.dfdByteLength);
        const dfdBlock = (this._dfdBlock = {
            vendorId: dfdReader.skipBytes(4 /* skip totalSize */).readUint16(),
            descriptorType: dfdReader.readUint16(),
            versionNumber: dfdReader.readUint16(),
            descriptorBlockSize: dfdReader.readUint16(),
            colorModel: dfdReader.readUint8(),
            colorPrimaries: dfdReader.readUint8(),
            transferFunction: dfdReader.readUint8(),
            flags: dfdReader.readUint8(),
            texelBlockDimension: {
                x: dfdReader.readUint8() + 1,
                y: dfdReader.readUint8() + 1,
                z: dfdReader.readUint8() + 1,
                w: dfdReader.readUint8() + 1,
            },
            bytesPlane: [
                dfdReader.readUint8() /* bytesPlane0 */,
                dfdReader.readUint8() /* bytesPlane1 */,
                dfdReader.readUint8() /* bytesPlane2 */,
                dfdReader.readUint8() /* bytesPlane3 */,
                dfdReader.readUint8() /* bytesPlane4 */,
                dfdReader.readUint8() /* bytesPlane5 */,
                dfdReader.readUint8() /* bytesPlane6 */,
                dfdReader.readUint8() /* bytesPlane7 */,
            ],
            numSamples: 0,
            samples: new Array(),
        });
        dfdBlock.numSamples = (dfdBlock.descriptorBlockSize - 24) / 16;
        for (let i = 0; i < dfdBlock.numSamples; i++) {
            const sample = {
                bitOffset: dfdReader.readUint16(),
                bitLength: dfdReader.readUint8() + 1,
                channelType: dfdReader.readUint8(),
                channelFlags: 0,
                samplePosition: [
                    dfdReader.readUint8() /* samplePosition0 */,
                    dfdReader.readUint8() /* samplePosition1 */,
                    dfdReader.readUint8() /* samplePosition2 */,
                    dfdReader.readUint8() /* samplePosition3 */,
                ],
                sampleLower: dfdReader.readUint32(),
                sampleUpper: dfdReader.readUint32(),
            };
            sample.channelFlags = (sample.channelType & 0xf0) >> 4;
            sample.channelType = sample.channelType & 0x0f;
            dfdBlock.samples.push(sample);
        }
        /**
         * Get the Supercompression Global Data (sgd)
         */
        const sgd = (this._supercompressionGlobalData = {});
        if (header.sgdByteLength > 0) {
            const sgdReader = new _Misc_dataReader__WEBPACK_IMPORTED_MODULE_1__.DataReader(this._data, header.sgdByteOffset, header.sgdByteLength);
            sgd.endpointCount = sgdReader.readUint16();
            sgd.selectorCount = sgdReader.readUint16();
            sgd.endpointsByteLength = sgdReader.readUint32();
            sgd.selectorsByteLength = sgdReader.readUint32();
            sgd.tablesByteLength = sgdReader.readUint32();
            sgd.extendedByteLength = sgdReader.readUint32();
            sgd.imageDescs = [];
            const imageCount = this._getImageCount();
            for (let i = 0; i < imageCount; i++) {
                sgd.imageDescs.push({
                    imageFlags: sgdReader.readUint32(),
                    rgbSliceByteOffset: sgdReader.readUint32(),
                    rgbSliceByteLength: sgdReader.readUint32(),
                    alphaSliceByteOffset: sgdReader.readUint32(),
                    alphaSliceByteLength: sgdReader.readUint32(),
                });
            }
            const endpointsByteOffset = header.sgdByteOffset + sgdReader.byteOffset;
            const selectorsByteOffset = endpointsByteOffset + sgd.endpointsByteLength;
            const tablesByteOffset = selectorsByteOffset + sgd.selectorsByteLength;
            const extendedByteOffset = tablesByteOffset + sgd.tablesByteLength;
            sgd.endpointsData = new Uint8Array(this._data.buffer, this._data.byteOffset + endpointsByteOffset, sgd.endpointsByteLength);
            sgd.selectorsData = new Uint8Array(this._data.buffer, this._data.byteOffset + selectorsByteOffset, sgd.selectorsByteLength);
            sgd.tablesData = new Uint8Array(this._data.buffer, this._data.byteOffset + tablesByteOffset, sgd.tablesByteLength);
            sgd.extendedData = new Uint8Array(this._data.buffer, this._data.byteOffset + extendedByteOffset, sgd.extendedByteLength);
        }
    }
    _getImageCount() {
        let layerPixelDepth = Math.max(this._header.pixelDepth, 1);
        for (let i = 1; i < this._header.levelCount; i++) {
            layerPixelDepth += Math.max(this._header.pixelDepth >> i, 1);
        }
        return Math.max(this._header.layerCount, 1) * this._header.faceCount * layerPixelDepth;
    }
    get textureFormat() {
        return this._dfdBlock.colorModel === 166 /* DFDModel.UASTC */ ? core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 : core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.ETC1S;
    }
    get hasAlpha() {
        const tformat = this.textureFormat;
        switch (tformat) {
            case core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.ETC1S:
                return (this._dfdBlock.numSamples === 2 &&
                    (this._dfdBlock.samples[0].channelType === 15 /* DFDChannel_ETC1S.AAA */ || this._dfdBlock.samples[1].channelType === 15 /* DFDChannel_ETC1S.AAA */));
            case core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4:
                return this._dfdBlock.samples[0].channelType === 3 /* DFDChannel_UASTC.RGBA */;
        }
        return false;
    }
    get needZSTDDecoder() {
        return this._header.supercompressionScheme === SupercompressionScheme.ZStandard;
    }
    get isInGammaSpace() {
        return this._dfdBlock.transferFunction === 2 /* DFDTransferFunction.sRGB */;
    }
    static IsValid(data) {
        if (data.byteLength >= 12) {
            // '«', 'K', 'T', 'X', ' ', '2', '0', '»', '\r', '\n', '\x1A', '\n'
            const identifier = new Uint8Array(data.buffer, data.byteOffset, 12);
            if (identifier[0] === 0xab &&
                identifier[1] === 0x4b &&
                identifier[2] === 0x54 &&
                identifier[3] === 0x58 &&
                identifier[4] === 0x20 &&
                identifier[5] === 0x32 &&
                identifier[6] === 0x30 &&
                identifier[7] === 0xbb &&
                identifier[8] === 0x0d &&
                identifier[9] === 0x0a &&
                identifier[10] === 0x1a &&
                identifier[11] === 0x0a) {
                return true;
            }
        }
        return false;
    }
}


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/legacy/legacy.js":
/*!********************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/legacy/legacy.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataReader: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.DataReader),
/* harmony export */   KTX2Decoder: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.KTX2Decoder),
/* harmony export */   KTX2FileReader: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.KTX2FileReader),
/* harmony export */   LiteTranscoder: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.LiteTranscoder),
/* harmony export */   LiteTranscoder_UASTC_ASTC: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.LiteTranscoder_UASTC_ASTC),
/* harmony export */   LiteTranscoder_UASTC_BC7: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.LiteTranscoder_UASTC_BC7),
/* harmony export */   LiteTranscoder_UASTC_R8_UNORM: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.LiteTranscoder_UASTC_R8_UNORM),
/* harmony export */   LiteTranscoder_UASTC_RG8_UNORM: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.LiteTranscoder_UASTC_RG8_UNORM),
/* harmony export */   LiteTranscoder_UASTC_RGBA_SRGB: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.LiteTranscoder_UASTC_RGBA_SRGB),
/* harmony export */   LiteTranscoder_UASTC_RGBA_UNORM: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.LiteTranscoder_UASTC_RGBA_UNORM),
/* harmony export */   MSCTranscoder: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.MSCTranscoder),
/* harmony export */   SupercompressionScheme: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.SupercompressionScheme),
/* harmony export */   Transcoder: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.Transcoder),
/* harmony export */   TranscoderManager: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.TranscoderManager),
/* harmony export */   WASMMemoryManager: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.WASMMemoryManager),
/* harmony export */   ZSTDDecoder: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.ZSTDDecoder)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "../../../tools/ktx2Decoder/dist/index.js");
/* eslint-disable import/no-internal-modules */

const globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.KTX2DECODER = _index__WEBPACK_IMPORTED_MODULE_0__.KTX2Decoder;
}



/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/transcodeDecisionTree.js":
/*!****************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/transcodeDecisionTree.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TranscodeDecisionTree: () => (/* binding */ TranscodeDecisionTree)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* eslint-disable @typescript-eslint/naming-convention */

const DecisionTree = {
    ETC1S: {
        option: "forceRGBA",
        yes: {
            transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.RGBA32,
            engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.RGBA8Format,
            roundToMultiple4: false,
        },
        no: {
            cap: "etc2",
            yes: {
                alpha: true,
                yes: {
                    transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.ETC2_RGBA,
                    engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGBA8_ETC2_EAC,
                },
                no: {
                    transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.ETC1_RGB,
                    engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGB8_ETC2,
                },
            },
            no: {
                cap: "etc1",
                alpha: false,
                yes: {
                    transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.ETC1_RGB,
                    engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGB_ETC1_WEBGL,
                },
                no: {
                    cap: "bptc",
                    yes: {
                        transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.BC7_RGBA,
                        engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGBA_BPTC_UNORM_EXT,
                    },
                    no: {
                        cap: "s3tc",
                        yes: {
                            alpha: true,
                            yes: {
                                transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.BC3_RGBA,
                                engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGBA_S3TC_DXT5_EXT,
                            },
                            no: {
                                transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.BC1_RGB,
                                engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGB_S3TC_DXT1_EXT,
                            },
                        },
                        no: {
                            cap: "pvrtc",
                            needsPowerOfTwo: true,
                            yes: {
                                alpha: true,
                                yes: {
                                    transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.PVRTC1_4_RGBA,
                                    engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,
                                },
                                no: {
                                    transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.PVRTC1_4_RGB,
                                    engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGB_PVRTC_4BPPV1_IMG,
                                },
                            },
                            no: {
                                transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.RGBA32,
                                engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.RGBA8Format,
                                roundToMultiple4: false,
                            },
                        },
                    },
                },
            },
        },
    },
    UASTC: {
        option: "forceRGBA",
        yes: {
            transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.RGBA32,
            engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.RGBA8Format,
            roundToMultiple4: false,
        },
        no: {
            option: "forceR8",
            yes: {
                transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.R8,
                engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.R8Format,
                roundToMultiple4: false,
            },
            no: {
                option: "forceRG8",
                yes: {
                    transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.RG8,
                    engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.RG8Format,
                    roundToMultiple4: false,
                },
                no: {
                    cap: "astc",
                    yes: {
                        transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.ASTC_4X4_RGBA,
                        engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGBA_ASTC_4X4_KHR,
                    },
                    no: {
                        cap: "bptc",
                        yes: {
                            transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.BC7_RGBA,
                            engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGBA_BPTC_UNORM_EXT,
                        },
                        no: {
                            option: "useRGBAIfASTCBC7NotAvailableWhenUASTC",
                            yes: {
                                transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.RGBA32,
                                engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.RGBA8Format,
                                roundToMultiple4: false,
                            },
                            no: {
                                cap: "etc2",
                                yes: {
                                    alpha: true,
                                    yes: {
                                        transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.ETC2_RGBA,
                                        engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGBA8_ETC2_EAC,
                                    },
                                    no: {
                                        transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.ETC1_RGB,
                                        engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGB8_ETC2,
                                    },
                                },
                                no: {
                                    cap: "etc1",
                                    yes: {
                                        transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.ETC1_RGB,
                                        engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGB_ETC1_WEBGL,
                                    },
                                    no: {
                                        cap: "s3tc",
                                        yes: {
                                            alpha: true,
                                            yes: {
                                                transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.BC3_RGBA,
                                                engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGBA_S3TC_DXT5_EXT,
                                            },
                                            no: {
                                                transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.BC1_RGB,
                                                engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGB_S3TC_DXT1_EXT,
                                            },
                                        },
                                        no: {
                                            cap: "pvrtc",
                                            needsPowerOfTwo: true,
                                            yes: {
                                                alpha: true,
                                                yes: {
                                                    transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.PVRTC1_4_RGBA,
                                                    engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,
                                                },
                                                no: {
                                                    transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.PVRTC1_4_RGB,
                                                    engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGB_PVRTC_4BPPV1_IMG,
                                                },
                                            },
                                            no: {
                                                transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.RGBA32,
                                                engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.RGBA8Format,
                                                roundToMultiple4: false,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
class TranscodeDecisionTree {
    static _IsLeafNode(node) {
        return node.engineFormat !== undefined;
    }
    get transcodeFormat() {
        return this._transcodeFormat;
    }
    get engineFormat() {
        return this._engineFormat;
    }
    get roundToMultiple4() {
        return this._roundToMultiple4;
    }
    constructor(textureFormat, hasAlpha, isPowerOfTwo, caps, options) {
        this._textureFormat = textureFormat;
        this._hasAlpha = hasAlpha;
        this._isPowerOfTwo = isPowerOfTwo;
        this._caps = caps;
        this._options = options ?? {};
        this.parseTree(DecisionTree);
    }
    parseTree(tree) {
        const node = this._textureFormat === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 ? tree.UASTC : tree.ETC1S;
        if (node) {
            this._parseNode(node);
        }
        return node !== undefined;
    }
    _parseNode(node) {
        if (!node) {
            return;
        }
        if (TranscodeDecisionTree._IsLeafNode(node)) {
            this._transcodeFormat = node.transcodeFormat;
            this._engineFormat = node.engineFormat;
            this._roundToMultiple4 = node.roundToMultiple4 ?? true;
        }
        else {
            let condition = true;
            if (node.cap !== undefined) {
                condition = condition && !!this._caps[node.cap];
            }
            if (node.option !== undefined) {
                condition = condition && !!this._options[node.option];
            }
            if (node.alpha !== undefined) {
                condition = condition && this._hasAlpha === node.alpha;
            }
            if (node.needsPowerOfTwo !== undefined) {
                condition = condition && this._isPowerOfTwo === node.needsPowerOfTwo;
            }
            if (node.transcodeFormat !== undefined) {
                if (Array.isArray(node.transcodeFormat)) {
                    condition = condition && node.transcodeFormat.indexOf(this._transcodeFormat) !== -1;
                }
                else {
                    condition = condition && node.transcodeFormat === this._transcodeFormat;
                }
            }
            this._parseNode(condition ? node.yes : node.no);
        }
    }
}


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/transcoder.js":
/*!*****************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/transcoder.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transcoder: () => (/* binding */ Transcoder)
/* harmony export */ });
/**
 * @internal
 */
class Transcoder {
    static CanTranscode(src, dst, isInGammaSpace) {
        return false;
    }
    getName() {
        return Transcoder.Name;
    }
    initialize() { }
    needMemoryManager() {
        return false;
    }
    setMemoryManager(memoryMgr) { }
    transcode(src, dst, level, width, height, uncompressedByteLength, ktx2Reader, imageDesc, encodedData) {
        return Promise.resolve(null);
    }
}
Transcoder.Name = "Transcoder";


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/transcoderManager.js":
/*!************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/transcoderManager.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TranscoderManager: () => (/* binding */ TranscoderManager)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _wasmMemoryManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wasmMemoryManager */ "../../../tools/ktx2Decoder/dist/wasmMemoryManager.js");


/**
 * @internal
 */
class TranscoderManager {
    static RegisterTranscoder(transcoder) {
        TranscoderManager._Transcoders.push(transcoder);
    }
    findTranscoder(src, dst, isInGammaSpace, bypass) {
        let transcoder = null;
        const key = core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat[src] + "_" + core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget[dst];
        for (let i = 0; i < TranscoderManager._Transcoders.length; ++i) {
            if (TranscoderManager._Transcoders[i].CanTranscode(src, dst, isInGammaSpace) && (!bypass || bypass.indexOf(TranscoderManager._Transcoders[i].Name) < 0)) {
                transcoder = this._getExistingTranscoder(key, TranscoderManager._Transcoders[i].Name);
                if (!transcoder) {
                    transcoder = new TranscoderManager._Transcoders[i]();
                    transcoder.initialize();
                    if (transcoder.needMemoryManager()) {
                        if (!this._wasmMemoryManager) {
                            this._wasmMemoryManager = new _wasmMemoryManager__WEBPACK_IMPORTED_MODULE_1__.WASMMemoryManager();
                        }
                        transcoder.setMemoryManager(this._wasmMemoryManager);
                    }
                    if (!TranscoderManager._TranscoderInstances[key]) {
                        TranscoderManager._TranscoderInstances[key] = [];
                    }
                    TranscoderManager._TranscoderInstances[key].push(transcoder);
                }
                break;
            }
        }
        return transcoder;
    }
    _getExistingTranscoder(key, transcoderName) {
        const transcoders = TranscoderManager._TranscoderInstances[key];
        if (transcoders) {
            for (let t = 0; t < transcoders.length; ++t) {
                const transcoder = transcoders[t];
                if (transcoderName === transcoder.getName()) {
                    return transcoder;
                }
            }
        }
        return null;
    }
}
TranscoderManager._Transcoders = [];
TranscoderManager._TranscoderInstances = {};


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/wasmMemoryManager.js":
/*!************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/wasmMemoryManager.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WASMMemoryManager: () => (/* binding */ WASMMemoryManager)
/* harmony export */ });
/**
 * @internal
 */
class WASMMemoryManager {
    static LoadWASM(path) {
        if (this.LoadBinariesFromCurrentThread) {
            return new Promise((resolve, reject) => {
                fetch(path)
                    .then((response) => {
                    if (response.ok) {
                        return response.arrayBuffer();
                    }
                    throw new Error(`Could not fetch the wasm component from "${path}": ${response.status} - ${response.statusText}`);
                })
                    .then((wasmBinary) => resolve(wasmBinary))
                    .catch((reason) => {
                    reject(reason);
                });
            });
        }
        const id = this._RequestId++;
        return new Promise((resolve) => {
            const wasmLoadedHandler = (msg) => {
                if (msg.data.action === "wasmLoaded" && msg.data.id === id) {
                    self.removeEventListener("message", wasmLoadedHandler);
                    resolve(msg.data.wasmBinary);
                }
            };
            self.addEventListener("message", wasmLoadedHandler);
            postMessage({ action: "loadWASM", path: path, id: id });
        });
    }
    constructor(initialMemoryPages = WASMMemoryManager.InitialMemoryPages) {
        this._numPages = initialMemoryPages;
        this._memory = new WebAssembly.Memory({ initial: this._numPages });
        this._memoryViewByteLength = this._numPages << 16;
        this._memoryViewOffset = 0;
        this._memoryView = new Uint8Array(this._memory.buffer, this._memoryViewOffset, this._memoryViewByteLength);
    }
    get wasmMemory() {
        return this._memory;
    }
    getMemoryView(numPages, offset = 0, byteLength) {
        byteLength = byteLength ?? numPages << 16;
        if (this._numPages < numPages) {
            this._memory.grow(numPages - this._numPages);
            this._numPages = numPages;
            this._memoryView = new Uint8Array(this._memory.buffer, offset, byteLength);
            this._memoryViewByteLength = byteLength;
            this._memoryViewOffset = offset;
        }
        else {
            this._memoryView = new Uint8Array(this._memory.buffer, offset, byteLength);
            this._memoryViewByteLength = byteLength;
            this._memoryViewOffset = offset;
        }
        return this._memoryView;
    }
}
WASMMemoryManager.LoadBinariesFromCurrentThread = true;
WASMMemoryManager.InitialMemoryPages = (1 * 1024 * 1024) >> 16; // 1 Mbytes
WASMMemoryManager._RequestId = 0;


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/zstddec.js":
/*!**************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/zstddec.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZSTDDecoder: () => (/* binding */ ZSTDDecoder)
/* harmony export */ });
let init;
let instance;
let heap;
const IMPORT_OBJECT = {
    env: {
        emscripten_notify_memory_growth: function () {
            heap = new Uint8Array(instance.exports.memory.buffer);
        },
    },
};
/**
 * ZSTD (Zstandard) decoder.
 */
class ZSTDDecoder {
    init() {
        if (init) {
            return init;
        }
        if (typeof fetch !== "undefined") {
            // Web.
            init = fetch(ZSTDDecoder.WasmModuleURL)
                .then((response) => {
                if (response.ok) {
                    return response.arrayBuffer();
                }
                throw new Error(`Could not fetch the wasm component for the Zstandard decompression lib: ${response.status} - ${response.statusText}`);
            })
                .then((arrayBuffer) => WebAssembly.instantiate(arrayBuffer, IMPORT_OBJECT))
                .then(this._init);
        }
        else {
            // Node.js.
            init = WebAssembly.instantiateStreaming(fetch(ZSTDDecoder.WasmModuleURL), IMPORT_OBJECT).then(this._init);
        }
        return init;
    }
    _init(result) {
        instance = result.instance;
        IMPORT_OBJECT.env.emscripten_notify_memory_growth(); // initialize heap.
    }
    decode(array, uncompressedSize = 0) {
        if (!instance) {
            throw new Error(`ZSTDDecoder: Await .init() before decoding.`);
        }
        // Write compressed data into WASM memory.
        const compressedSize = array.byteLength;
        const compressedPtr = instance.exports.malloc(compressedSize);
        heap.set(array, compressedPtr);
        // Decompress into WASM memory.
        uncompressedSize = uncompressedSize || Number(instance.exports.ZSTD_findDecompressedSize(compressedPtr, compressedSize));
        const uncompressedPtr = instance.exports.malloc(uncompressedSize);
        const actualSize = instance.exports.ZSTD_decompress(uncompressedPtr, uncompressedSize, compressedPtr, compressedSize);
        // Read decompressed data and free WASM memory.
        const dec = heap.slice(uncompressedPtr, uncompressedPtr + actualSize);
        instance.exports.free(compressedPtr);
        instance.exports.free(uncompressedPtr);
        return dec;
    }
}
ZSTDDecoder.WasmModuleURL = "https://preview.babylonjs.com/zstddec.wasm";
/**
 * BSD License
 *
 * For Zstandard software
 *
 * Copyright (c) 2016-present, Yann Collet, Facebook, Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *  * Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 *
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 *  * Neither the name Facebook nor the names of its contributors may be used to
 *    endorse or promote products derived from this software without specific
 *    prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   ktx2decoder: () => (/* reexport module object */ ktx2decoder_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var ktx2decoder_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ktx2decoder/legacy/legacy */ "../../../tools/ktx2Decoder/dist/legacy/legacy.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ktx2decoder_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5rdHgyRGVjb2Rlci5tYXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNoQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0SUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTEE7QUFDQTtBQUdBOztBQUVBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQVdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBT0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBTUE7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckdBO0FBRUE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQW5CQTs7QUFFQTtBQUNBO0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBRUE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQW5CQTs7QUFFQTtBQUNBO0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBRUE7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFXQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBdENBOztBQUVBO0FBQ0E7QUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFFQTtBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQVdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUF0Q0E7O0FBRUE7QUFDQTtBQU1BOzs7Ozs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUVBO0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBV0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQXRDQTs7QUFFQTtBQUNBO0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBRUE7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFXQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBdENBOztBQUVBO0FBQ0E7QUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBRUE7QUFFQTtBQU1BOztBQUVBO0FBQ0E7QUFjQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQVdBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBaEpBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBRUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUExSUE7QUE2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeExBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEyR0E7QUFPQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDelhBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBV0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM1BBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFXQTtBQUNBOztBQTFCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmQTtBQUdBO0FBRUE7O0FBRUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQXBEQTtBQU1BOzs7Ozs7Ozs7Ozs7Ozs7QUNiQTs7QUFFQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFRQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQXpFQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQ0lBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBdkRBO0FBMERBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0JBOzs7Ozs7O0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9LVFgyREVDT0RFUi93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvLi4vLi4vLi4vZGV2L2NvcmUvc3JjL01hdGVyaWFscy9UZXh0dXJlcy9rdHgyZGVjb2RlclR5cGVzLnRzIiwid2VicGFjazovL0tUWDJERUNPREVSLy4uLy4uLy4uL3Rvb2xzL2t0eDJEZWNvZGVyL3NyYy9NaXNjL2RhdGFSZWFkZXIudHMiLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvLi4vLi4vLi4vdG9vbHMva3R4MkRlY29kZXIvc3JjL01pc2MvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvLi4vLi4vLi4vdG9vbHMva3R4MkRlY29kZXIvc3JjL1RyYW5zY29kZXJzL2luZGV4LnRzIiwid2VicGFjazovL0tUWDJERUNPREVSLy4uLy4uLy4uL3Rvb2xzL2t0eDJEZWNvZGVyL3NyYy9UcmFuc2NvZGVycy9saXRlVHJhbnNjb2Rlci50cyIsIndlYnBhY2s6Ly9LVFgyREVDT0RFUi8uLi8uLi8uLi90b29scy9rdHgyRGVjb2Rlci9zcmMvVHJhbnNjb2RlcnMvbGl0ZVRyYW5zY29kZXJfVUFTVENfQVNUQy50cyIsIndlYnBhY2s6Ly9LVFgyREVDT0RFUi8uLi8uLi8uLi90b29scy9rdHgyRGVjb2Rlci9zcmMvVHJhbnNjb2RlcnMvbGl0ZVRyYW5zY29kZXJfVUFTVENfQkM3LnRzIiwid2VicGFjazovL0tUWDJERUNPREVSLy4uLy4uLy4uL3Rvb2xzL2t0eDJEZWNvZGVyL3NyYy9UcmFuc2NvZGVycy9saXRlVHJhbnNjb2Rlcl9VQVNUQ19SOF9VTk9STS50cyIsIndlYnBhY2s6Ly9LVFgyREVDT0RFUi8uLi8uLi8uLi90b29scy9rdHgyRGVjb2Rlci9zcmMvVHJhbnNjb2RlcnMvbGl0ZVRyYW5zY29kZXJfVUFTVENfUkc4X1VOT1JNLnRzIiwid2VicGFjazovL0tUWDJERUNPREVSLy4uLy4uLy4uL3Rvb2xzL2t0eDJEZWNvZGVyL3NyYy9UcmFuc2NvZGVycy9saXRlVHJhbnNjb2Rlcl9VQVNUQ19SR0JBX1NSR0IudHMiLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvLi4vLi4vLi4vdG9vbHMva3R4MkRlY29kZXIvc3JjL1RyYW5zY29kZXJzL2xpdGVUcmFuc2NvZGVyX1VBU1RDX1JHQkFfVU5PUk0udHMiLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvLi4vLi4vLi4vdG9vbHMva3R4MkRlY29kZXIvc3JjL1RyYW5zY29kZXJzL21zY1RyYW5zY29kZXIudHMiLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvLi4vLi4vLi4vdG9vbHMva3R4MkRlY29kZXIvc3JjL2luZGV4LnRzIiwid2VicGFjazovL0tUWDJERUNPREVSLy4uLy4uLy4uL3Rvb2xzL2t0eDJEZWNvZGVyL3NyYy9rdHgyRGVjb2Rlci50cyIsIndlYnBhY2s6Ly9LVFgyREVDT0RFUi8uLi8uLi8uLi90b29scy9rdHgyRGVjb2Rlci9zcmMva3R4MkZpbGVSZWFkZXIudHMiLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvLi4vLi4vLi4vdG9vbHMva3R4MkRlY29kZXIvc3JjL2xlZ2FjeS9sZWdhY3kudHMiLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvLi4vLi4vLi4vdG9vbHMva3R4MkRlY29kZXIvc3JjL3RyYW5zY29kZURlY2lzaW9uVHJlZS50cyIsIndlYnBhY2s6Ly9LVFgyREVDT0RFUi8uLi8uLi8uLi90b29scy9rdHgyRGVjb2Rlci9zcmMvdHJhbnNjb2Rlci50cyIsIndlYnBhY2s6Ly9LVFgyREVDT0RFUi8uLi8uLi8uLi90b29scy9rdHgyRGVjb2Rlci9zcmMvdHJhbnNjb2Rlck1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvLi4vLi4vLi4vdG9vbHMva3R4MkRlY29kZXIvc3JjL3dhc21NZW1vcnlNYW5hZ2VyLnRzIiwid2VicGFjazovL0tUWDJERUNPREVSLy4uLy4uLy4uL3Rvb2xzL2t0eDJEZWNvZGVyL3NyYy96c3RkZGVjLnRzIiwid2VicGFjazovL0tUWDJERUNPREVSL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0tUWDJERUNPREVSL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9LVFgyREVDT0RFUi93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0tUWDJERUNPREVSL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9LVFgyREVDT0RFUi8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImJhYnlsb25qcy1rdHgyZGVjb2RlclwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJiYWJ5bG9uanMta3R4MmRlY29kZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiS1RYMkRFQ09ERVJcIl0gPSBmYWN0b3J5KCk7XG59KSgodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHRoaXMpLCAoKSA9PiB7XG5yZXR1cm4gIiwiZXhwb3J0IGVudW0gU291cmNlVGV4dHVyZUZvcm1hdCB7XHJcbiAgICBFVEMxUyxcclxuICAgIFVBU1RDNHg0LFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBUcmFuc2NvZGVUYXJnZXQge1xyXG4gICAgQVNUQ180WDRfUkdCQSxcclxuICAgIEJDN19SR0JBLFxyXG4gICAgQkMzX1JHQkEsXHJcbiAgICBCQzFfUkdCLFxyXG4gICAgUFZSVEMxXzRfUkdCQSxcclxuICAgIFBWUlRDMV80X1JHQixcclxuICAgIEVUQzJfUkdCQSxcclxuICAgIEVUQzFfUkdCLFxyXG4gICAgUkdCQTMyLFxyXG4gICAgUjgsXHJcbiAgICBSRzgsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVuZ2luZUZvcm1hdCB7XHJcbiAgICBDT01QUkVTU0VEX1JHQkFfQlBUQ19VTk9STV9FWFQgPSAweDhlOGMsXHJcbiAgICBDT01QUkVTU0VEX1JHQkFfQVNUQ180WDRfS0hSID0gMHg5M2IwLFxyXG4gICAgQ09NUFJFU1NFRF9SR0JfUzNUQ19EWFQxX0VYVCA9IDB4ODNmMCxcclxuICAgIENPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDVfRVhUID0gMHg4M2YzLFxyXG4gICAgQ09NUFJFU1NFRF9SR0JBX1BWUlRDXzRCUFBWMV9JTUcgPSAweDhjMDIsXHJcbiAgICBDT01QUkVTU0VEX1JHQl9QVlJUQ180QlBQVjFfSU1HID0gMHg4YzAwLFxyXG4gICAgQ09NUFJFU1NFRF9SR0JBOF9FVEMyX0VBQyA9IDB4OTI3OCxcclxuICAgIENPTVBSRVNTRURfUkdCOF9FVEMyID0gMHg5Mjc0LFxyXG4gICAgQ09NUFJFU1NFRF9SR0JfRVRDMV9XRUJHTCA9IDB4OGQ2NCxcclxuICAgIFJHQkE4Rm9ybWF0ID0gMHg4MDU4LFxyXG4gICAgUjhGb3JtYXQgPSAweDgyMjksXHJcbiAgICBSRzhGb3JtYXQgPSAweDgyMmIsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMZWFmIG5vZGUgb2YgYSBkZWNpc2lvbiB0cmVlXHJcbiAqIEl0IGRlZmluZXMgdGhlIHRyYW5zY29kaW5nIGZvcm1hdCB0byB1c2UgdG8gdHJhbnNjb2RlIHRoZSB0ZXh0dXJlIGFzIHdlbGwgYXMgdGhlIGNvcnJlc3BvbmRpbmcgZm9ybWF0IHRvIHVzZSBhdCB0aGUgZW5naW5lIGxldmVsIHdoZW4gY3JlYXRpbmcgdGhlIHRleHR1cmVcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUxlYWYge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZm9ybWF0IHRvIHRyYW5zY29kZSB0b1xyXG4gICAgICovXHJcbiAgICB0cmFuc2NvZGVGb3JtYXQ6IFRyYW5zY29kZVRhcmdldDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBmb3JtYXQgdG8gdXNlIHdoZW4gY3JlYXRpbmcgdGhlIHRleHR1cmUgYXQgdGhlIGVuZ2luZSBsZXZlbCBhZnRlciBpdCBoYXMgYmVlbiB0cmFuc2NvZGVkIHRvIHRyYW5zY29kZUZvcm1hdFxyXG4gICAgICovXHJcbiAgICBlbmdpbmVGb3JtYXQ6IEVuZ2luZUZvcm1hdDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdGhlIHRleHR1cmUgbXVzdCBiZSByb3VuZGVkIHRvIGEgbXVsdGlwbGUgb2YgNCAoc2hvdWxkIG5vcm1hbGx5IGJlIHRoZSBjYXNlIGZvciBhbGwgY29tcHJlc3NlZCBmb3JtYXRzKS4gRGVmYXVsdDogdHJ1ZVxyXG4gICAgICovXHJcbiAgICByb3VuZFRvTXVsdGlwbGU0PzogYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlZ3VsYXIgbm9kZSBvZiBhIGRlY2lzaW9uIHRyZWVcclxuICpcclxuICogRWFjaCBwcm9wZXJ0eSAoZXhjZXB0IGZvciBcInllc1wiIGFuZCBcIm5vXCIpLCBpZiBub3QgZW1wdHksIHdpbGwgYmUgY2hlY2tlZCBpbiBvcmRlciB0byBkZXRlcm1pbmUgdGhlIG5leHQgbm9kZSB0byBzZWxlY3QuXHJcbiAqIElmIGFsbCBjaGVja3MgYXJlIHN1Y2Nlc3NmdWwsIHRoZSBcInllc1wiIG5vZGUgd2lsbCBiZSBzZWxlY3RlZCwgZWxzZSB0aGUgXCJub1wiIG5vZGUgd2lsbCBiZSBzZWxlY3RlZC5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5vZGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgY2FwYWJpbGl0eSB0byBjaGVjay4gQ2FuIGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nOlxyXG4gICAgICogICAgICBhc3RjXHJcbiAgICAgKiAgICAgIGJwdGNcclxuICAgICAqICAgICAgczN0Y1xyXG4gICAgICogICAgICBwdnJ0Y1xyXG4gICAgICogICAgICBldGMyXHJcbiAgICAgKiAgICAgIGV0YzFcclxuICAgICAqL1xyXG4gICAgY2FwPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIG9wdGlvbiB0byBjaGVjayBmcm9tIHRoZSBvcHRpb25zIG9iamVjdCBwYXNzZWQgdG8gdGhlIEtUWDIgZGVjb2RlIGZ1bmN0aW9uLiB7QGxpbmsgSUtUWDJEZWNvZGVyT3B0aW9uc31cclxuICAgICAqL1xyXG4gICAgb3B0aW9uPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGFscGhhIGlzIHByZXNlbnQgaW4gdGhlIHRleHR1cmVcclxuICAgICAqL1xyXG4gICAgYWxwaGE/OiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgdHJhbnNjb2RpbmcgZm9ybWF0LlxyXG4gICAgICovXHJcbiAgICB0cmFuc2NvZGVGb3JtYXQ/OiBUcmFuc2NvZGVUYXJnZXQgfCBUcmFuc2NvZGVUYXJnZXRbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyB0aGF0IHRoZSB0ZXh0dXJlIGlzIGEgcG93ZXIgb2YgdHdvXHJcbiAgICAgKi9cclxuICAgIG5lZWRzUG93ZXJPZlR3bz86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbm9kZSB0byBzZWxlY3QgaWYgYWxsIGNoZWNrcyBhcmUgc3VjY2Vzc2Z1bFxyXG4gICAgICovXHJcbiAgICB5ZXM/OiBJTm9kZSB8IElMZWFmO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG5vZGUgdG8gc2VsZWN0IGlmIGF0IGxlYXN0IG9uZSBjaGVjayBpcyBub3Qgc3VjY2Vzc2Z1bFxyXG4gICAgICovXHJcbiAgICBubz86IElOb2RlIHwgSUxlYWY7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWNpc2lvbiB0cmVlIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSB0cmFuc2NvZGluZyBmb3JtYXQgdG8gdXNlIGZvciBhIGdpdmVuIHNvdXJjZSB0ZXh0dXJlIGZvcm1hdFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJRGVjaXNpb25UcmVlIHtcclxuICAgIC8qKlxyXG4gICAgICogdGV4dHVyZUZvcm1hdCBjYW4gYmUgZWl0aGVyIFVBU1RDIG9yIEVUQzFTXHJcbiAgICAgKi9cclxuICAgIFt0ZXh0dXJlRm9ybWF0OiBzdHJpbmddOiBJTm9kZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlc3VsdCBvZiB0aGUgS1RYMiBkZWNvZGUgZnVuY3Rpb25cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURlY29kZWREYXRhIHtcclxuICAgIC8qKlxyXG4gICAgICogV2lkdGggb2YgdGhlIHRleHR1cmVcclxuICAgICAqL1xyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhlaWdodCBvZiB0aGUgdGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBmb3JtYXQgdG8gdXNlIHdoZW4gY3JlYXRpbmcgdGhlIHRleHR1cmUgYXQgdGhlIGVuZ2luZSBsZXZlbFxyXG4gICAgICogVGhpcyBjb3JyZXNwb25kcyB0byB0aGUgZW5naW5lRm9ybWF0IHByb3BlcnR5IG9mIHRoZSBsZWFmIG5vZGUgb2YgdGhlIGRlY2lzaW9uIHRyZWVcclxuICAgICAqL1xyXG4gICAgdHJhbnNjb2RlZEZvcm1hdDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGlzdCBvZiBtaXBtYXAgbGV2ZWxzLlxyXG4gICAgICogVGhlIGZpcnN0IGVsZW1lbnQgaXMgdGhlIGJhc2UgbGV2ZWwsIHRoZSBsYXN0IGVsZW1lbnQgaXMgdGhlIHNtYWxsZXN0IG1pcG1hcCBsZXZlbCAoaWYgbW9yZSB0aGFuIG9uZSBtaXBtYXAgbGV2ZWwgaXMgcHJlc2VudClcclxuICAgICAqL1xyXG4gICAgbWlwbWFwczogQXJyYXk8SU1pcG1hcD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoZSB0ZXh0dXJlIGRhdGEgaXMgaW4gZ2FtbWEgc3BhY2Ugb3Igbm90XHJcbiAgICAgKi9cclxuICAgIGlzSW5HYW1tYVNwYWNlOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0aGUgdGV4dHVyZSBoYXMgYW4gYWxwaGEgY2hhbm5lbCBvciBub3RcclxuICAgICAqL1xyXG4gICAgaGFzQWxwaGE6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgdHJhbnNjb2RlciB1c2VkIHRvIHRyYW5zY29kZSB0aGUgdGV4dHVyZVxyXG4gICAgICovXHJcbiAgICB0cmFuc2NvZGVyTmFtZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGVycm9ycyAoaWYgYW55KSBlbmNvdW50ZXJlZCBkdXJpbmcgdGhlIGRlY29kaW5nIHByb2Nlc3NcclxuICAgICAqL1xyXG4gICAgZXJyb3JzPzogc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogRGVmaW5lcyBhIG1pcG1hcCBsZXZlbFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJTWlwbWFwIHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRhdGEgb2YgdGhlIG1pcG1hcCBsZXZlbFxyXG4gICAgICovXHJcbiAgICBkYXRhOiBVaW50OEFycmF5IHwgbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB3aWR0aCBvZiB0aGUgbWlwbWFwIGxldmVsXHJcbiAgICAgKi9cclxuICAgIHdpZHRoOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBtaXBtYXAgbGV2ZWxcclxuICAgICAqL1xyXG4gICAgaGVpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgY29tcHJlc3NlZCB0ZXh0dXJlIGZvcm1hdHMgc3VwcG9ydGVkIGJ5IHRoZSBicm93c2VyXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElDb21wcmVzc2VkRm9ybWF0Q2FwYWJpbGl0aWVzIHtcclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0aGUgYnJvd3NlciBzdXBwb3J0cyBBU1RDXHJcbiAgICAgKi9cclxuICAgIGFzdGM/OiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0aGUgYnJvd3NlciBzdXBwb3J0cyBCUFRDXHJcbiAgICAgKi9cclxuICAgIGJwdGM/OiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0aGUgYnJvd3NlciBzdXBwb3J0cyBTM1RDXHJcbiAgICAgKi9cclxuICAgIHMzdGM/OiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0aGUgYnJvd3NlciBzdXBwb3J0cyBQVlJUQ1xyXG4gICAgICovXHJcbiAgICBwdnJ0Yz86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIEVUQzJcclxuICAgICAqL1xyXG4gICAgZXRjMj86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIEVUQzFcclxuICAgICAqL1xyXG4gICAgZXRjMT86IGJvb2xlYW47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBPcHRpb25zIHBhc3NlZCB0byB0aGUgS1RYMiBkZWNvZGUgZnVuY3Rpb25cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUtUWDJEZWNvZGVyT3B0aW9ucyB7XHJcbiAgICAvKiogdXNlIFJHQkEgZm9ybWF0IGlmIEFTVEMgYW5kIEJDNyBhcmUgbm90IGF2YWlsYWJsZSBhcyB0cmFuc2NvZGVkIGZvcm1hdCAqL1xyXG4gICAgdXNlUkdCQUlmQVNUQ0JDN05vdEF2YWlsYWJsZVdoZW5VQVNUQz86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqIGZvcmNlIHRvIGFsd2F5cyB1c2UgKHVuY29tcHJlc3NlZCkgUkdCQSBmb3IgdHJhbnNjb2RlZCBmb3JtYXQgKi9cclxuICAgIGZvcmNlUkdCQT86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqIGZvcmNlIHRvIGFsd2F5cyB1c2UgKHVuY29tcHJlc3NlZCkgUjggZm9yIHRyYW5zY29kZWQgZm9ybWF0ICovXHJcbiAgICBmb3JjZVI4PzogYm9vbGVhbjtcclxuXHJcbiAgICAvKiogZm9yY2UgdG8gYWx3YXlzIHVzZSAodW5jb21wcmVzc2VkKSBSRzggZm9yIHRyYW5zY29kZWQgZm9ybWF0ICovXHJcbiAgICBmb3JjZVJHOD86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBsaXN0IG9mIHRyYW5zY29kZXJzIHRvIGJ5cGFzcyB3aGVuIGxvb2tpbmcgZm9yIGEgc3VpdGFibGUgdHJhbnNjb2Rlci4gVGhlIGF2YWlsYWJsZSB0cmFuc2NvZGVycyBhcmU6XHJcbiAgICAgKiAgICAgIFVuaXZlcnNhbFRyYW5zY29kZXJfVUFTVENfQVNUQ1xyXG4gICAgICogICAgICBVbml2ZXJzYWxUcmFuc2NvZGVyX1VBU1RDX0JDN1xyXG4gICAgICogICAgICBVbml2ZXJzYWxUcmFuc2NvZGVyX1VBU1RDX1JHQkFfVU5PUk1cclxuICAgICAqICAgICAgVW5pdmVyc2FsVHJhbnNjb2Rlcl9VQVNUQ19SR0JBX1NSR0JcclxuICAgICAqICAgICAgVW5pdmVyc2FsVHJhbnNjb2Rlcl9VQVNUQ19SOF9VTk9STVxyXG4gICAgICogICAgICBVbml2ZXJzYWxUcmFuc2NvZGVyX1VBU1RDX1JHOF9VTk9STVxyXG4gICAgICogICAgICBNU0NUcmFuc2NvZGVyXHJcbiAgICAgKi9cclxuICAgIGJ5cGFzc1RyYW5zY29kZXJzPzogc3RyaW5nW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDdXN0b20gZGVjaXNpb24gdHJlZSB0byBhcHBseSBhZnRlciB0aGUgZGVmYXVsdCBkZWNpc2lvbiB0cmVlIGhhcyBzZWxlY3RlZCBhIHRyYW5zY29kaW5nIGZvcm1hdC5cclxuICAgICAqIEFsbG93cyB0aGUgdXNlciB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBkZWNpc2lvbiB0cmVlIHNlbGVjdGlvbi5cclxuICAgICAqIFRoZSBkZWNpc2lvbiB0cmVlIGNhbiB1c2UgdGhlIElOb2RlLnRyYW5zY29kZUZvcm1hdCBwcm9wZXJ0eSB0byBiYXNlIGl0cyBkZWNpc2lvbiBvbiB0aGUgdHJhbnNjb2RpbmcgZm9ybWF0IHNlbGVjdGVkIGJ5IHRoZSBkZWZhdWx0IGRlY2lzaW9uIHRyZWUuXHJcbiAgICAgKi9cclxuICAgIHRyYW5zY29kZUZvcm1hdERlY2lzaW9uVHJlZT86IElEZWNpc2lvblRyZWU7XHJcbn1cclxuIiwiLyoqXHJcbiAqIFV0aWxpdHkgY2xhc3MgZm9yIHJlYWRpbmcgZnJvbSBhIGRhdGEgYnVmZmVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRGF0YVJlYWRlciB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjdXJyZW50IGJ5dGUgb2Zmc2V0IGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgZGF0YSBidWZmZXIuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgYnl0ZU9mZnNldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YUJ5dGVPZmZzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YVZpZXc6IERhdGFWaWV3O1xyXG4gICAgcHJpdmF0ZSBfZGF0YUJ5dGVPZmZzZXQ6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0gYnVmZmVyIFRoZSBidWZmZXIgdG8gc2V0XHJcbiAgICAgKiBAcGFyYW0gYnl0ZU9mZnNldCBUaGUgc3RhcnRpbmcgb2Zmc2V0IGluIHRoZSBidWZmZXJcclxuICAgICAqIEBwYXJhbSBieXRlTGVuZ3RoIFRoZSBieXRlIGxlbmd0aCBvZiB0aGUgYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGJ1ZmZlcjogQXJyYXlCdWZmZXIgfCBBcnJheUJ1ZmZlclZpZXcsIGJ5dGVPZmZzZXQ/OiBudW1iZXIsIGJ5dGVMZW5ndGg/OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoKGJ1ZmZlciBhcyBBcnJheUJ1ZmZlclZpZXcpLmJ1ZmZlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhVmlldyA9IG5ldyBEYXRhVmlldyhcclxuICAgICAgICAgICAgICAgIChidWZmZXIgYXMgQXJyYXlCdWZmZXJWaWV3KS5idWZmZXIsXHJcbiAgICAgICAgICAgICAgICAoYnVmZmVyIGFzIEFycmF5QnVmZmVyVmlldykuYnl0ZU9mZnNldCArIChieXRlT2Zmc2V0ID8/IDApLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aCA/PyAoYnVmZmVyIGFzIEFycmF5QnVmZmVyVmlldykuYnl0ZUxlbmd0aFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFWaWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciBhcyBBcnJheUJ1ZmZlciwgYnl0ZU9mZnNldCA/PyAwLCBieXRlTGVuZ3RoID8/IChidWZmZXIgYXMgQXJyYXlCdWZmZXIpLmJ5dGVMZW5ndGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZGF0YUJ5dGVPZmZzZXQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBhIHVuc2lnbmVkIDgtYml0IGludGVnZXIgZnJvbSB0aGUgY3VycmVudGx5IGxvYWRlZCBkYXRhIHJhbmdlLlxyXG4gICAgICogQHJldHVybnMgVGhlIDgtYml0IGludGVnZXIgcmVhZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZFVpbnQ4KCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9kYXRhVmlldy5nZXRVaW50OCh0aGlzLl9kYXRhQnl0ZU9mZnNldCk7XHJcbiAgICAgICAgdGhpcy5fZGF0YUJ5dGVPZmZzZXQgKz0gMTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkIGEgc2lnbmVkIDgtYml0IGludGVnZXIgZnJvbSB0aGUgY3VycmVudGx5IGxvYWRlZCBkYXRhIHJhbmdlLlxyXG4gICAgICogQHJldHVybnMgVGhlIDgtYml0IGludGVnZXIgcmVhZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZEludDgoKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2RhdGFWaWV3LmdldEludDgodGhpcy5fZGF0YUJ5dGVPZmZzZXQpO1xyXG4gICAgICAgIHRoaXMuX2RhdGFCeXRlT2Zmc2V0ICs9IDE7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBhIHVuc2lnbmVkIDE2LWJpdCBpbnRlZ2VyIGZyb20gdGhlIGN1cnJlbnRseSBsb2FkZWQgZGF0YSByYW5nZS5cclxuICAgICAqIEByZXR1cm5zIFRoZSAxNi1iaXQgaW50ZWdlciByZWFkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkVWludDE2KCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9kYXRhVmlldy5nZXRVaW50MTYodGhpcy5fZGF0YUJ5dGVPZmZzZXQsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuX2RhdGFCeXRlT2Zmc2V0ICs9IDI7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBhIHNpZ25lZCAxNi1iaXQgaW50ZWdlciBmcm9tIHRoZSBjdXJyZW50bHkgbG9hZGVkIGRhdGEgcmFuZ2UuXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgMTYtYml0IGludGVnZXIgcmVhZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZEludDE2KCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9kYXRhVmlldy5nZXRJbnQxNih0aGlzLl9kYXRhQnl0ZU9mZnNldCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fZGF0YUJ5dGVPZmZzZXQgKz0gMjtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkIGEgdW5zaWduZWQgMzItYml0IGludGVnZXIgZnJvbSB0aGUgY3VycmVudGx5IGxvYWRlZCBkYXRhIHJhbmdlLlxyXG4gICAgICogQHJldHVybnMgVGhlIDMyLWJpdCBpbnRlZ2VyIHJlYWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRVaW50MzIoKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2RhdGFWaWV3LmdldFVpbnQzMih0aGlzLl9kYXRhQnl0ZU9mZnNldCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fZGF0YUJ5dGVPZmZzZXQgKz0gNDtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkIGEgc2lnbmVkIDMyLWJpdCBpbnRlZ2VyIGZyb20gdGhlIGN1cnJlbnRseSBsb2FkZWQgZGF0YSByYW5nZS5cclxuICAgICAqIEByZXR1cm5zIFRoZSAzMi1iaXQgaW50ZWdlciByZWFkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkSW50MzIoKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2RhdGFWaWV3LmdldEludDMyKHRoaXMuX2RhdGFCeXRlT2Zmc2V0LCB0cnVlKTtcclxuICAgICAgICB0aGlzLl9kYXRhQnl0ZU9mZnNldCArPSA0O1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgYSB1bnNpZ25lZCAzMi1iaXQgaW50ZWdlciBmcm9tIHRoZSBjdXJyZW50bHkgbG9hZGVkIGRhdGEgcmFuZ2UuXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgMzItYml0IGludGVnZXIgcmVhZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZFVpbnQ2NCgpOiBudW1iZXIge1xyXG4gICAgICAgIC8vIHNwbGl0IDY0LWJpdCBudW1iZXIgaW50byB0d28gMzItYml0ICg0LWJ5dGUpIHBhcnRzXHJcbiAgICAgICAgY29uc3QgbGVmdCA9IHRoaXMuX2RhdGFWaWV3LmdldFVpbnQzMih0aGlzLl9kYXRhQnl0ZU9mZnNldCwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc3QgcmlnaHQgPSB0aGlzLl9kYXRhVmlldy5nZXRVaW50MzIodGhpcy5fZGF0YUJ5dGVPZmZzZXQgKyA0LCB0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gY29tYmluZSB0aGUgdHdvIDMyLWJpdCB2YWx1ZXNcclxuICAgICAgICBjb25zdCBjb21iaW5lZCA9IGxlZnQgKyAyICoqIDMyICogcmlnaHQ7IC8vIFRoYXQgd2FzIHdlaXJkLi5LZWVwaW5nIGl0IGZvciBwb3N0ZXJpdHk6IHRydWUgPyBsZWZ0ICsgMiAqKiAzMiAqIHJpZ2h0IDogMiAqKiAzMiAqIGxlZnQgKyByaWdodDtcclxuXHJcbiAgICAgICAgLyppZiAoIU51bWJlci5pc1NhZmVJbnRlZ2VyKGNvbWJpbmVkKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0RhdGFSZWFkZXI6ICcgKyBjb21iaW5lZCArICcgZXhjZWVkcyBNQVhfU0FGRV9JTlRFR0VSLiBQcmVjaXNpb24gbWF5IGJlIGxvc3QuJyk7XHJcbiAgICAgICAgfSovXHJcblxyXG4gICAgICAgIHRoaXMuX2RhdGFCeXRlT2Zmc2V0ICs9IDg7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBhIGJ5dGUgYXJyYXkgZnJvbSB0aGUgY3VycmVudGx5IGxvYWRlZCBkYXRhIHJhbmdlLlxyXG4gICAgICogQHBhcmFtIGJ5dGVMZW5ndGggVGhlIGJ5dGUgbGVuZ3RoIHRvIHJlYWRcclxuICAgICAqIEByZXR1cm5zIFRoZSBieXRlIGFycmF5IHJlYWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRVaW50OEFycmF5KGJ5dGVMZW5ndGg6IG51bWJlcik6IFVpbnQ4QXJyYXkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fZGF0YVZpZXcuYnVmZmVyLCB0aGlzLl9kYXRhVmlldy5ieXRlT2Zmc2V0ICsgdGhpcy5fZGF0YUJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuX2RhdGFCeXRlT2Zmc2V0ICs9IGJ5dGVMZW5ndGg7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2tpcHMgdGhlIGdpdmVuIGJ5dGUgbGVuZ3RoIHRoZSBjdXJyZW50bHkgbG9hZGVkIGRhdGEgcmFuZ2UuXHJcbiAgICAgKiBAcGFyYW0gYnl0ZUxlbmd0aCBUaGUgYnl0ZSBsZW5ndGggdG8gc2tpcFxyXG4gICAgICogQHJldHVybnMgVGhpcyBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2tpcEJ5dGVzKGJ5dGVMZW5ndGg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2RhdGFCeXRlT2Zmc2V0ICs9IGJ5dGVMZW5ndGg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0ICogZnJvbSBcIi4vZGF0YVJlYWRlclwiO1xyXG4iLCJleHBvcnQgKiBmcm9tIFwiLi9saXRlVHJhbnNjb2RlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9saXRlVHJhbnNjb2Rlcl9VQVNUQ19BU1RDXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2xpdGVUcmFuc2NvZGVyX1VBU1RDX0JDN1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9saXRlVHJhbnNjb2Rlcl9VQVNUQ19SOF9VTk9STVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9saXRlVHJhbnNjb2Rlcl9VQVNUQ19SRzhfVU5PUk1cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbGl0ZVRyYW5zY29kZXJfVUFTVENfUkdCQV9VTk9STVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9saXRlVHJhbnNjb2Rlcl9VQVNUQ19SR0JBX1NSR0JcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbXNjVHJhbnNjb2RlclwiO1xyXG4iLCJpbXBvcnQgdHlwZSAqIGFzIEtUWDIgZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2t0eDJkZWNvZGVyVHlwZXNcIjtcclxuXHJcbmltcG9ydCB7IFRyYW5zY29kZXIgfSBmcm9tIFwiLi4vdHJhbnNjb2RlclwiO1xyXG5pbXBvcnQgeyBXQVNNTWVtb3J5TWFuYWdlciB9IGZyb20gXCIuLi93YXNtTWVtb3J5TWFuYWdlclwiO1xyXG5pbXBvcnQgdHlwZSB7IEtUWDJGaWxlUmVhZGVyLCBJS1RYMl9JbWFnZURlc2MgfSBmcm9tIFwiLi4va3R4MkZpbGVSZWFkZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBMaXRlVHJhbnNjb2RlciBleHRlbmRzIFRyYW5zY29kZXIge1xyXG4gICAgcHJpdmF0ZSBfbW9kdWxlUGF0aDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfbW9kdWxlUHJvbWlzZTogUHJvbWlzZTx7IG1vZHVsZTogYW55IH0+O1xyXG4gICAgcHJpdmF0ZSBfbWVtb3J5TWFuYWdlcjogV0FTTU1lbW9yeU1hbmFnZXI7XHJcbiAgICBwcm90ZWN0ZWQgX3RyYW5zY29kZUluUGxhY2U6IGJvb2xlYW47XHJcblxyXG4gICAgcHJvdGVjdGVkIF9sb2FkTW9kdWxlKCk6IFByb21pc2U8eyBtb2R1bGU6IGFueSB9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21vZHVsZVByb21pc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vZHVsZVByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9tb2R1bGVQcm9taXNlID0gV0FTTU1lbW9yeU1hbmFnZXIuTG9hZFdBU00odGhpcy5fbW9kdWxlUGF0aCkudGhlbigod2FzbUJpbmFyeSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgICAgIFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKHdhc21CaW5hcnkgYXMgQXJyYXlCdWZmZXIsIHsgZW52OiB7IG1lbW9yeTogdGhpcy5fbWVtb3J5TWFuYWdlci53YXNtTWVtb3J5IH0gfSkudGhlbigobW9kdWxlV3JhcHBlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoeyBtb2R1bGU6IG1vZHVsZVdyYXBwZXIuaW5zdGFuY2UuZXhwb3J0cyB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZHVsZVByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG4gICAgcHJvdGVjdGVkIGdldCBtZW1vcnlNYW5hZ2VyKCk6IFdBU01NZW1vcnlNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWVtb3J5TWFuYWdlcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbiAgICBwcm90ZWN0ZWQgc2V0TW9kdWxlUGF0aChtb2R1bGVQYXRoOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tb2R1bGVQYXRoID0gbW9kdWxlUGF0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl90cmFuc2NvZGVJblBsYWNlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmVlZE1lbW9yeU1hbmFnZXIoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldE1lbW9yeU1hbmFnZXIobWVtb3J5TWdyOiBXQVNNTWVtb3J5TWFuYWdlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21lbW9yeU1hbmFnZXIgPSBtZW1vcnlNZ3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRyYW5zY29kZShcclxuICAgICAgICBzcmM6IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdCxcclxuICAgICAgICBkc3Q6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LFxyXG4gICAgICAgIGxldmVsOiBudW1iZXIsXHJcbiAgICAgICAgd2lkdGg6IG51bWJlcixcclxuICAgICAgICBoZWlnaHQ6IG51bWJlcixcclxuICAgICAgICB1bmNvbXByZXNzZWRCeXRlTGVuZ3RoOiBudW1iZXIsXHJcbiAgICAgICAga3R4MlJlYWRlcjogS1RYMkZpbGVSZWFkZXIsXHJcbiAgICAgICAgaW1hZ2VEZXNjOiBJS1RYMl9JbWFnZURlc2MgfCBudWxsLFxyXG4gICAgICAgIGVuY29kZWREYXRhOiBVaW50OEFycmF5XHJcbiAgICApOiBQcm9taXNlPFVpbnQ4QXJyYXkgfCBudWxsPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRNb2R1bGUoKS50aGVuKChtb2R1bGVXcmFwcGVyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNjb2RlcjogYW55ID0gbW9kdWxlV3JhcHBlci5tb2R1bGU7XHJcbiAgICAgICAgICAgIGNvbnN0IFt0ZXh0dXJlVmlldywgdW5jb21wcmVzc2VkVGV4dHVyZVZpZXcsIG5CbG9ja3NdID0gdGhpcy5fcHJlcGFyZVRyYW5zY29kaW5nKHdpZHRoLCBoZWlnaHQsIHVuY29tcHJlc3NlZEJ5dGVMZW5ndGgsIGVuY29kZWREYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cmFuc2NvZGVyLnRyYW5zY29kZShuQmxvY2tzKSA9PT0gMCA/ICh0aGlzLl90cmFuc2NvZGVJblBsYWNlID8gdGV4dHVyZVZpZXcuc2xpY2UoKSA6IHVuY29tcHJlc3NlZFRleHR1cmVWaWV3IS5zbGljZSgpKSA6IG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9wcmVwYXJlVHJhbnNjb2RpbmcoXHJcbiAgICAgICAgd2lkdGg6IG51bWJlcixcclxuICAgICAgICBoZWlnaHQ6IG51bWJlcixcclxuICAgICAgICB1bmNvbXByZXNzZWRCeXRlTGVuZ3RoOiBudW1iZXIsXHJcbiAgICAgICAgZW5jb2RlZERhdGE6IFVpbnQ4QXJyYXksXHJcbiAgICAgICAgdW5jb21wcmVzc2VkTnVtQ29tcG9uZW50cz86IG51bWJlclxyXG4gICAgKTogW1VpbnQ4QXJyYXksIFVpbnQ4QXJyYXkgfCBudWxsLCBudW1iZXJdIHtcclxuICAgICAgICBjb25zdCBuQmxvY2tzID0gKCh3aWR0aCArIDMpID4+IDIpICogKChoZWlnaHQgKyAzKSA+PiAyKTtcclxuXHJcbiAgICAgICAgaWYgKHVuY29tcHJlc3NlZE51bUNvbXBvbmVudHMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB1bmNvbXByZXNzZWRCeXRlTGVuZ3RoID0gd2lkdGggKiAoKGhlaWdodCArIDMpID4+IDIpICogNCAqIHVuY29tcHJlc3NlZE51bUNvbXBvbmVudHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0ZXhNZW1vcnlQYWdlcyA9ICgobkJsb2NrcyAqIDE2ICsgNjU1MzUgKyAodGhpcy5fdHJhbnNjb2RlSW5QbGFjZSA/IDAgOiB1bmNvbXByZXNzZWRCeXRlTGVuZ3RoKSkgPj4gMTYpICsgMTtcclxuXHJcbiAgICAgICAgY29uc3QgdGV4dHVyZVZpZXcgPSB0aGlzLm1lbW9yeU1hbmFnZXIuZ2V0TWVtb3J5Vmlldyh0ZXhNZW1vcnlQYWdlcywgNjU1MzYsIG5CbG9ja3MgKiAxNik7XHJcblxyXG4gICAgICAgIGNvbnN0IHVuY29tcHJlc3NlZFRleHR1cmVWaWV3ID0gdGhpcy5fdHJhbnNjb2RlSW5QbGFjZVxyXG4gICAgICAgICAgICA/IG51bGxcclxuICAgICAgICAgICAgOiBuZXcgVWludDhBcnJheShcclxuICAgICAgICAgICAgICAgICAgdGhpcy5fbWVtb3J5TWFuYWdlci53YXNtTWVtb3J5LmJ1ZmZlcixcclxuICAgICAgICAgICAgICAgICAgNjU1MzYgKyBuQmxvY2tzICogMTYsXHJcbiAgICAgICAgICAgICAgICAgIHVuY29tcHJlc3NlZE51bUNvbXBvbmVudHMgIT09IHVuZGVmaW5lZCA/IHdpZHRoICogaGVpZ2h0ICogdW5jb21wcmVzc2VkTnVtQ29tcG9uZW50cyA6IHVuY29tcHJlc3NlZEJ5dGVMZW5ndGhcclxuICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB0ZXh0dXJlVmlldy5zZXQoZW5jb2RlZERhdGEpO1xyXG5cclxuICAgICAgICByZXR1cm4gW3RleHR1cmVWaWV3LCB1bmNvbXByZXNzZWRUZXh0dXJlVmlldywgbkJsb2Nrc107XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgS1RYMiBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMva3R4MmRlY29kZXJUeXBlc1wiO1xyXG5cclxuaW1wb3J0IHsgTGl0ZVRyYW5zY29kZXIgfSBmcm9tIFwiLi9saXRlVHJhbnNjb2RlclwiO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY2xhc3MgTGl0ZVRyYW5zY29kZXJfVUFTVENfQVNUQyBleHRlbmRzIExpdGVUcmFuc2NvZGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogVVJMIHRvIHVzZSB3aGVuIGxvYWRpbmcgdGhlIHdhc20gbW9kdWxlIGZvciB0aGUgdHJhbnNjb2RlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFdhc21Nb2R1bGVVUkwgPSBcImh0dHBzOi8vcHJldmlldy5iYWJ5bG9uanMuY29tL2t0eDJUcmFuc2NvZGVycy8xL3Vhc3RjX2FzdGMud2FzbVwiO1xyXG5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIHB1YmxpYyBzdGF0aWMgQ2FuVHJhbnNjb2RlKHNyYzogS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0LCBkc3Q6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LCBpc0luR2FtbWFTcGFjZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBzcmMgPT09IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdC5VQVNUQzR4NCAmJiBkc3QgPT09IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LkFTVENfNFg0X1JHQkE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBOYW1lID0gXCJVbml2ZXJzYWxUcmFuc2NvZGVyX1VBU1RDX0FTVENcIjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBMaXRlVHJhbnNjb2Rlcl9VQVNUQ19BU1RDLk5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0TW9kdWxlUGF0aChMaXRlVHJhbnNjb2Rlcl9VQVNUQ19BU1RDLldhc21Nb2R1bGVVUkwpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIEtUWDIgZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2t0eDJkZWNvZGVyVHlwZXNcIjtcclxuXHJcbmltcG9ydCB7IExpdGVUcmFuc2NvZGVyIH0gZnJvbSBcIi4vbGl0ZVRyYW5zY29kZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIExpdGVUcmFuc2NvZGVyX1VBU1RDX0JDNyBleHRlbmRzIExpdGVUcmFuc2NvZGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogVVJMIHRvIHVzZSB3aGVuIGxvYWRpbmcgdGhlIHdhc20gbW9kdWxlIGZvciB0aGUgdHJhbnNjb2RlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFdhc21Nb2R1bGVVUkwgPSBcImh0dHBzOi8vcHJldmlldy5iYWJ5bG9uanMuY29tL2t0eDJUcmFuc2NvZGVycy8xL3Vhc3RjX2JjNy53YXNtXCI7XHJcblxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgcHVibGljIHN0YXRpYyBDYW5UcmFuc2NvZGUoc3JjOiBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQsIGRzdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQsIGlzSW5HYW1tYVNwYWNlOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHNyYyA9PT0gS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0LlVBU1RDNHg0ICYmIGRzdCA9PT0gS1RYMi5UcmFuc2NvZGVUYXJnZXQuQkM3X1JHQkE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBOYW1lID0gXCJVbml2ZXJzYWxUcmFuc2NvZGVyX1VBU1RDX0JDN1wiO1xyXG5cclxuICAgIHB1YmxpYyBnZXROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIExpdGVUcmFuc2NvZGVyX1VBU1RDX0JDNy5OYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0aWFsaXplKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUoKTtcclxuICAgICAgICB0aGlzLnNldE1vZHVsZVBhdGgoTGl0ZVRyYW5zY29kZXJfVUFTVENfQkM3Lldhc21Nb2R1bGVVUkwpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIEtUWDIgZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2t0eDJkZWNvZGVyVHlwZXNcIjtcclxuXHJcbmltcG9ydCB7IExpdGVUcmFuc2NvZGVyIH0gZnJvbSBcIi4vbGl0ZVRyYW5zY29kZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBLVFgyRmlsZVJlYWRlciwgSUtUWDJfSW1hZ2VEZXNjIH0gZnJvbSBcIi4uL2t0eDJGaWxlUmVhZGVyXCI7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBMaXRlVHJhbnNjb2Rlcl9VQVNUQ19SOF9VTk9STSBleHRlbmRzIExpdGVUcmFuc2NvZGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogVVJMIHRvIHVzZSB3aGVuIGxvYWRpbmcgdGhlIHdhc20gbW9kdWxlIGZvciB0aGUgdHJhbnNjb2RlciAodW5vcm0pXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgV2FzbU1vZHVsZVVSTCA9IFwiaHR0cHM6Ly9wcmV2aWV3LmJhYnlsb25qcy5jb20va3R4MlRyYW5zY29kZXJzLzEvdWFzdGNfcjhfdW5vcm0ud2FzbVwiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgQ2FuVHJhbnNjb2RlKHNyYzogS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0LCBkc3Q6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LCBpc0luR2FtbWFTcGFjZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBzcmMgPT09IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdC5VQVNUQzR4NCAmJiBkc3QgPT09IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LlI4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTmFtZSA9IFwiVW5pdmVyc2FsVHJhbnNjb2Rlcl9VQVNUQ19SOF9VTk9STVwiO1xyXG5cclxuICAgIHB1YmxpYyBnZXROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIExpdGVUcmFuc2NvZGVyX1VBU1RDX1I4X1VOT1JNLk5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIHRoaXMuX3RyYW5zY29kZUluUGxhY2UgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNldE1vZHVsZVBhdGgoTGl0ZVRyYW5zY29kZXJfVUFTVENfUjhfVU5PUk0uV2FzbU1vZHVsZVVSTCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRyYW5zY29kZShcclxuICAgICAgICBzcmM6IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdCxcclxuICAgICAgICBkc3Q6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LFxyXG4gICAgICAgIGxldmVsOiBudW1iZXIsXHJcbiAgICAgICAgd2lkdGg6IG51bWJlcixcclxuICAgICAgICBoZWlnaHQ6IG51bWJlcixcclxuICAgICAgICB1bmNvbXByZXNzZWRCeXRlTGVuZ3RoOiBudW1iZXIsXHJcbiAgICAgICAga3R4MlJlYWRlcjogS1RYMkZpbGVSZWFkZXIsXHJcbiAgICAgICAgaW1hZ2VEZXNjOiBJS1RYMl9JbWFnZURlc2MgfCBudWxsLFxyXG4gICAgICAgIGVuY29kZWREYXRhOiBVaW50OEFycmF5XHJcbiAgICApOiBQcm9taXNlPFVpbnQ4QXJyYXkgfCBudWxsPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRNb2R1bGUoKS50aGVuKChtb2R1bGVXcmFwcGVyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNjb2RlcjogYW55ID0gbW9kdWxlV3JhcHBlci5tb2R1bGU7XHJcbiAgICAgICAgICAgIGNvbnN0IFssIHVuY29tcHJlc3NlZFRleHR1cmVWaWV3XSA9IHRoaXMuX3ByZXBhcmVUcmFuc2NvZGluZyh3aWR0aCwgaGVpZ2h0LCB1bmNvbXByZXNzZWRCeXRlTGVuZ3RoLCBlbmNvZGVkRGF0YSwgMSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHJhbnNjb2Rlci5kZWNvZGUod2lkdGgsIGhlaWdodCkgPT09IDAgPyB1bmNvbXByZXNzZWRUZXh0dXJlVmlldyEuc2xpY2UoKSA6IG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgS1RYMiBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMva3R4MmRlY29kZXJUeXBlc1wiO1xyXG5cclxuaW1wb3J0IHsgTGl0ZVRyYW5zY29kZXIgfSBmcm9tIFwiLi9saXRlVHJhbnNjb2RlclwiO1xyXG5pbXBvcnQgdHlwZSB7IEtUWDJGaWxlUmVhZGVyLCBJS1RYMl9JbWFnZURlc2MgfSBmcm9tIFwiLi4va3R4MkZpbGVSZWFkZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIExpdGVUcmFuc2NvZGVyX1VBU1RDX1JHOF9VTk9STSBleHRlbmRzIExpdGVUcmFuc2NvZGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogVVJMIHRvIHVzZSB3aGVuIGxvYWRpbmcgdGhlIHdhc20gbW9kdWxlIGZvciB0aGUgdHJhbnNjb2RlciAodW5vcm0pXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgV2FzbU1vZHVsZVVSTCA9IFwiaHR0cHM6Ly9wcmV2aWV3LmJhYnlsb25qcy5jb20va3R4MlRyYW5zY29kZXJzLzEvdWFzdGNfcmc4X3Vub3JtLndhc21cIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIENhblRyYW5zY29kZShzcmM6IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdCwgZHN0OiBLVFgyLlRyYW5zY29kZVRhcmdldCwgaXNJbkdhbW1hU3BhY2U6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gc3JjID09PSBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQuVUFTVEM0eDQgJiYgZHN0ID09PSBLVFgyLlRyYW5zY29kZVRhcmdldC5SRzg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBOYW1lID0gXCJVbml2ZXJzYWxUcmFuc2NvZGVyX1VBU1RDX1JHOF9VTk9STVwiO1xyXG5cclxuICAgIHB1YmxpYyBnZXROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIExpdGVUcmFuc2NvZGVyX1VBU1RDX1JHOF9VTk9STS5OYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0aWFsaXplKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUoKTtcclxuICAgICAgICB0aGlzLl90cmFuc2NvZGVJblBsYWNlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZXRNb2R1bGVQYXRoKExpdGVUcmFuc2NvZGVyX1VBU1RDX1JHOF9VTk9STS5XYXNtTW9kdWxlVVJMKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdHJhbnNjb2RlKFxyXG4gICAgICAgIHNyYzogS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0LFxyXG4gICAgICAgIGRzdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQsXHJcbiAgICAgICAgbGV2ZWw6IG51bWJlcixcclxuICAgICAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgICAgIGhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgIHVuY29tcHJlc3NlZEJ5dGVMZW5ndGg6IG51bWJlcixcclxuICAgICAgICBrdHgyUmVhZGVyOiBLVFgyRmlsZVJlYWRlcixcclxuICAgICAgICBpbWFnZURlc2M6IElLVFgyX0ltYWdlRGVzYyB8IG51bGwsXHJcbiAgICAgICAgZW5jb2RlZERhdGE6IFVpbnQ4QXJyYXlcclxuICAgICk6IFByb21pc2U8VWludDhBcnJheSB8IG51bGw+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZE1vZHVsZSgpLnRoZW4oKG1vZHVsZVdyYXBwZXI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0cmFuc2NvZGVyOiBhbnkgPSBtb2R1bGVXcmFwcGVyLm1vZHVsZTtcclxuICAgICAgICAgICAgY29uc3QgWywgdW5jb21wcmVzc2VkVGV4dHVyZVZpZXddID0gdGhpcy5fcHJlcGFyZVRyYW5zY29kaW5nKHdpZHRoLCBoZWlnaHQsIHVuY29tcHJlc3NlZEJ5dGVMZW5ndGgsIGVuY29kZWREYXRhLCAyKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cmFuc2NvZGVyLmRlY29kZSh3aWR0aCwgaGVpZ2h0KSA9PT0gMCA/IHVuY29tcHJlc3NlZFRleHR1cmVWaWV3IS5zbGljZSgpIDogbnVsbDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBLVFgyIGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9rdHgyZGVjb2RlclR5cGVzXCI7XHJcblxyXG5pbXBvcnQgeyBMaXRlVHJhbnNjb2RlciB9IGZyb20gXCIuL2xpdGVUcmFuc2NvZGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgS1RYMkZpbGVSZWFkZXIsIElLVFgyX0ltYWdlRGVzYyB9IGZyb20gXCIuLi9rdHgyRmlsZVJlYWRlclwiO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY2xhc3MgTGl0ZVRyYW5zY29kZXJfVUFTVENfUkdCQV9TUkdCIGV4dGVuZHMgTGl0ZVRyYW5zY29kZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBVUkwgdG8gdXNlIHdoZW4gbG9hZGluZyB0aGUgd2FzbSBtb2R1bGUgZm9yIHRoZSB0cmFuc2NvZGVyIChzcmdiKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFdhc21Nb2R1bGVVUkwgPSBcImh0dHBzOi8vcHJldmlldy5iYWJ5bG9uanMuY29tL2t0eDJUcmFuc2NvZGVycy8xL3Vhc3RjX3JnYmE4X3NyZ2JfdjIud2FzbVwiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgQ2FuVHJhbnNjb2RlKHNyYzogS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0LCBkc3Q6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LCBpc0luR2FtbWFTcGFjZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBzcmMgPT09IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdC5VQVNUQzR4NCAmJiBkc3QgPT09IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LlJHQkEzMiAmJiBpc0luR2FtbWFTcGFjZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIE5hbWUgPSBcIlVuaXZlcnNhbFRyYW5zY29kZXJfVUFTVENfUkdCQV9TUkdCXCI7XHJcblxyXG4gICAgcHVibGljIGdldE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gTGl0ZVRyYW5zY29kZXJfVUFTVENfUkdCQV9TUkdCLk5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIHRoaXMuX3RyYW5zY29kZUluUGxhY2UgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNldE1vZHVsZVBhdGgoTGl0ZVRyYW5zY29kZXJfVUFTVENfUkdCQV9TUkdCLldhc21Nb2R1bGVVUkwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0cmFuc2NvZGUoXHJcbiAgICAgICAgc3JjOiBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQsXHJcbiAgICAgICAgZHN0OiBLVFgyLlRyYW5zY29kZVRhcmdldCxcclxuICAgICAgICBsZXZlbDogbnVtYmVyLFxyXG4gICAgICAgIHdpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgaGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgdW5jb21wcmVzc2VkQnl0ZUxlbmd0aDogbnVtYmVyLFxyXG4gICAgICAgIGt0eDJSZWFkZXI6IEtUWDJGaWxlUmVhZGVyLFxyXG4gICAgICAgIGltYWdlRGVzYzogSUtUWDJfSW1hZ2VEZXNjIHwgbnVsbCxcclxuICAgICAgICBlbmNvZGVkRGF0YTogVWludDhBcnJheVxyXG4gICAgKTogUHJvbWlzZTxVaW50OEFycmF5IHwgbnVsbD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkTW9kdWxlKCkudGhlbigobW9kdWxlV3JhcHBlcjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zY29kZXI6IGFueSA9IG1vZHVsZVdyYXBwZXIubW9kdWxlO1xyXG4gICAgICAgICAgICBjb25zdCBbLCB1bmNvbXByZXNzZWRUZXh0dXJlVmlld10gPSB0aGlzLl9wcmVwYXJlVHJhbnNjb2Rpbmcod2lkdGgsIGhlaWdodCwgdW5jb21wcmVzc2VkQnl0ZUxlbmd0aCwgZW5jb2RlZERhdGEsIDQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRyYW5zY29kZXIuZGVjb2RlKHdpZHRoLCBoZWlnaHQpID09PSAwID8gdW5jb21wcmVzc2VkVGV4dHVyZVZpZXchLnNsaWNlKCkgOiBudWxsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIEtUWDIgZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2t0eDJkZWNvZGVyVHlwZXNcIjtcclxuXHJcbmltcG9ydCB7IExpdGVUcmFuc2NvZGVyIH0gZnJvbSBcIi4vbGl0ZVRyYW5zY29kZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBLVFgyRmlsZVJlYWRlciwgSUtUWDJfSW1hZ2VEZXNjIH0gZnJvbSBcIi4uL2t0eDJGaWxlUmVhZGVyXCI7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBMaXRlVHJhbnNjb2Rlcl9VQVNUQ19SR0JBX1VOT1JNIGV4dGVuZHMgTGl0ZVRyYW5zY29kZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBVUkwgdG8gdXNlIHdoZW4gbG9hZGluZyB0aGUgd2FzbSBtb2R1bGUgZm9yIHRoZSB0cmFuc2NvZGVyICh1bm9ybSlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBXYXNtTW9kdWxlVVJMID0gXCJodHRwczovL3ByZXZpZXcuYmFieWxvbmpzLmNvbS9rdHgyVHJhbnNjb2RlcnMvMS91YXN0Y19yZ2JhOF91bm9ybV92Mi53YXNtXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBDYW5UcmFuc2NvZGUoc3JjOiBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQsIGRzdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQsIGlzSW5HYW1tYVNwYWNlOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHNyYyA9PT0gS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0LlVBU1RDNHg0ICYmIGRzdCA9PT0gS1RYMi5UcmFuc2NvZGVUYXJnZXQuUkdCQTMyICYmICFpc0luR2FtbWFTcGFjZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIE5hbWUgPSBcIlVuaXZlcnNhbFRyYW5zY29kZXJfVUFTVENfUkdCQV9VTk9STVwiO1xyXG5cclxuICAgIHB1YmxpYyBnZXROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIExpdGVUcmFuc2NvZGVyX1VBU1RDX1JHQkFfVU5PUk0uTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy5fdHJhbnNjb2RlSW5QbGFjZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2V0TW9kdWxlUGF0aChMaXRlVHJhbnNjb2Rlcl9VQVNUQ19SR0JBX1VOT1JNLldhc21Nb2R1bGVVUkwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0cmFuc2NvZGUoXHJcbiAgICAgICAgc3JjOiBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQsXHJcbiAgICAgICAgZHN0OiBLVFgyLlRyYW5zY29kZVRhcmdldCxcclxuICAgICAgICBsZXZlbDogbnVtYmVyLFxyXG4gICAgICAgIHdpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgaGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgdW5jb21wcmVzc2VkQnl0ZUxlbmd0aDogbnVtYmVyLFxyXG4gICAgICAgIGt0eDJSZWFkZXI6IEtUWDJGaWxlUmVhZGVyLFxyXG4gICAgICAgIGltYWdlRGVzYzogSUtUWDJfSW1hZ2VEZXNjIHwgbnVsbCxcclxuICAgICAgICBlbmNvZGVkRGF0YTogVWludDhBcnJheVxyXG4gICAgKTogUHJvbWlzZTxVaW50OEFycmF5IHwgbnVsbD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkTW9kdWxlKCkudGhlbigobW9kdWxlV3JhcHBlcjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zY29kZXI6IGFueSA9IG1vZHVsZVdyYXBwZXIubW9kdWxlO1xyXG4gICAgICAgICAgICBjb25zdCBbLCB1bmNvbXByZXNzZWRUZXh0dXJlVmlld10gPSB0aGlzLl9wcmVwYXJlVHJhbnNjb2Rpbmcod2lkdGgsIGhlaWdodCwgdW5jb21wcmVzc2VkQnl0ZUxlbmd0aCwgZW5jb2RlZERhdGEsIDQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRyYW5zY29kZXIuZGVjb2RlKHdpZHRoLCBoZWlnaHQpID09PSAwID8gdW5jb21wcmVzc2VkVGV4dHVyZVZpZXchLnNsaWNlKCkgOiBudWxsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIEtUWDIgZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2t0eDJkZWNvZGVyVHlwZXNcIjtcclxuXHJcbmltcG9ydCB7IFRyYW5zY29kZXIgfSBmcm9tIFwiLi4vdHJhbnNjb2RlclwiO1xyXG5pbXBvcnQgdHlwZSB7IEtUWDJGaWxlUmVhZGVyLCBJS1RYMl9JbWFnZURlc2MgfSBmcm9tIFwiLi4va3R4MkZpbGVSZWFkZXJcIjtcclxuaW1wb3J0IHsgV0FTTU1lbW9yeU1hbmFnZXIgfSBmcm9tIFwiLi4vd2FzbU1lbW9yeU1hbmFnZXJcIjtcclxuXHJcbmRlY2xhcmUgbGV0IE1TQ19UUkFOU0NPREVSOiBhbnk7XHJcblxyXG5kZWNsYXJlIGZ1bmN0aW9uIGltcG9ydFNjcmlwdHMoLi4udXJsczogc3RyaW5nW10pOiB2b2lkO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1TQ1RyYW5zY29kZXIgZXh0ZW5kcyBUcmFuc2NvZGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogVVJMIHRvIHVzZSB3aGVuIGxvYWRpbmcgdGhlIE1TQyB0cmFuc2NvZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgSlNNb2R1bGVVUkwgPSBcImh0dHBzOi8vcHJldmlldy5iYWJ5bG9uanMuY29tL2t0eDJUcmFuc2NvZGVycy8xL21zY19iYXNpc190cmFuc2NvZGVyLmpzXCI7XHJcbiAgICAvKipcclxuICAgICAqIFVSTCB0byB1c2Ugd2hlbiBsb2FkaW5nIHRoZSB3YXNtIG1vZHVsZSBmb3IgdGhlIHRyYW5zY29kZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBXYXNtTW9kdWxlVVJMID0gXCJodHRwczovL3ByZXZpZXcuYmFieWxvbmpzLmNvbS9rdHgyVHJhbnNjb2RlcnMvMS9tc2NfYmFzaXNfdHJhbnNjb2Rlci53YXNtXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBVc2VGcm9tV29ya2VyVGhyZWFkID0gdHJ1ZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIE5hbWUgPSBcIk1TQ1RyYW5zY29kZXJcIjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBNU0NUcmFuc2NvZGVyLk5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbXNjQmFzaXNUcmFuc2NvZGVyUHJvbWlzZTogUHJvbWlzZTx2b2lkPjtcclxuICAgIHByaXZhdGUgX21zY0Jhc2lzTW9kdWxlOiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0TVNDQmFzaXNUcmFuc2NvZGVyKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9tc2NCYXNpc1RyYW5zY29kZXJQcm9taXNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tc2NCYXNpc1RyYW5zY29kZXJQcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbXNjQmFzaXNUcmFuc2NvZGVyUHJvbWlzZSA9IFdBU01NZW1vcnlNYW5hZ2VyLkxvYWRXQVNNKE1TQ1RyYW5zY29kZXIuV2FzbU1vZHVsZVVSTCkudGhlbigod2FzbUJpbmFyeSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoTVNDVHJhbnNjb2Rlci5Vc2VGcm9tV29ya2VyVGhyZWFkKSB7XHJcbiAgICAgICAgICAgICAgICBpbXBvcnRTY3JpcHRzKE1TQ1RyYW5zY29kZXIuSlNNb2R1bGVVUkwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFdvcmtlciBOdW1iZXIgPSAwIGFuZCBNU0NfVFJBTlNDT0RFUiBoYXMgbm90IGJlZW4gbG9hZGVkIHlldC5cclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIE1TQ19UUkFOU0NPREVSID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHQvamF2YXNjcmlwdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwic3JjXCIsIE1TQ1RyYW5zY29kZXIuSlNNb2R1bGVVUkwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzY3JpcHQub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNU0NfVFJBTlNDT0RFUih7IHdhc21CaW5hcnkgfSkudGhlbigoYmFzaXNNb2R1bGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzaXNNb2R1bGUuaW5pdFRyYW5zY29kZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tc2NCYXNpc01vZHVsZSA9IGJhc2lzTW9kdWxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzY3JpcHQub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiQ2FuIG5vdCBsb2FkIE1TQ19UUkFOU0NPREVSIHNjcmlwdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgTVNDX1RSQU5TQ09ERVIoeyB3YXNtQmluYXJ5IH0pLnRoZW4oKGJhc2lzTW9kdWxlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBiYXNpc01vZHVsZS5pbml0VHJhbnNjb2RlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tc2NCYXNpc01vZHVsZSA9IGJhc2lzTW9kdWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21zY0Jhc2lzVHJhbnNjb2RlclByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgcHVibGljIHN0YXRpYyBDYW5UcmFuc2NvZGUoc3JjOiBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQsIGRzdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQsIGlzSW5HYW1tYVNwYWNlOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRyYW5zY29kZShcclxuICAgICAgICBzcmM6IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdCxcclxuICAgICAgICBkc3Q6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LFxyXG4gICAgICAgIGxldmVsOiBudW1iZXIsXHJcbiAgICAgICAgd2lkdGg6IG51bWJlcixcclxuICAgICAgICBoZWlnaHQ6IG51bWJlcixcclxuICAgICAgICB1bmNvbXByZXNzZWRCeXRlTGVuZ3RoOiBudW1iZXIsXHJcbiAgICAgICAga3R4MlJlYWRlcjogS1RYMkZpbGVSZWFkZXIsXHJcbiAgICAgICAgaW1hZ2VEZXNjOiBJS1RYMl9JbWFnZURlc2MgfCBudWxsLFxyXG4gICAgICAgIGVuY29kZWREYXRhOiBVaW50OEFycmF5XHJcbiAgICApOiBQcm9taXNlPFVpbnQ4QXJyYXkgfCBudWxsPiB7XHJcbiAgICAgICAgY29uc3QgaXNWaWRlbyA9IGZhbHNlO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TVNDQmFzaXNUcmFuc2NvZGVyKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhc2lzTW9kdWxlID0gdGhpcy5fbXNjQmFzaXNNb2R1bGU7XHJcblxyXG4gICAgICAgICAgICBsZXQgdHJhbnNjb2RlcjogYW55O1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2VJbmZvOiBhbnk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IGFueTtcclxuICAgICAgICAgICAgbGV0IHRleHR1cmVEYXRhOiBhbnkgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRyYW5zY29kZXIgPSBzcmMgPT09IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdC5VQVNUQzR4NCA/IG5ldyBiYXNpc01vZHVsZS5VYXN0Y0ltYWdlVHJhbnNjb2RlcigpIDogbmV3IGJhc2lzTW9kdWxlLkJhc2lzTHpFdGMxc0ltYWdlVHJhbnNjb2RlcigpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGV4Rm9ybWF0ID0gc3JjID09PSBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQuVUFTVEM0eDQgPyBiYXNpc01vZHVsZS5UZXh0dXJlRm9ybWF0LlVBU1RDNHg0IDogYmFzaXNNb2R1bGUuVGV4dHVyZUZvcm1hdC5FVEMxUztcclxuXHJcbiAgICAgICAgICAgICAgICBpbWFnZUluZm8gPSBuZXcgYmFzaXNNb2R1bGUuSW1hZ2VJbmZvKHRleEZvcm1hdCwgd2lkdGgsIGhlaWdodCwgbGV2ZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldEZvcm1hdCA9IGJhc2lzTW9kdWxlLlRyYW5zY29kZVRhcmdldFtLVFgyLlRyYW5zY29kZVRhcmdldFtkc3RdXTsgLy8gd29ya3MgYmVjYXVzZSB0aGUgbGFiZWxzIG9mIHRoZSBzb3VyY2VUZXh0dXJlRm9ybWF0IGVudW0gYXJlIHRoZSBzYW1lIGFzIHRoZSBwcm9wZXJ0eSBuYW1lcyB1c2VkIGluIFRyYW5zY29kZVRhcmdldCFcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWJhc2lzTW9kdWxlLmlzRm9ybWF0U3VwcG9ydGVkKHRhcmdldEZvcm1hdCwgdGV4Rm9ybWF0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgYE1TQ1RyYW5zY29kZXI6IFRyYW5zY29kaW5nIGZyb20gXCIke0tUWDIuU291cmNlVGV4dHVyZUZvcm1hdFtzcmNdfVwiIHRvIFwiJHtLVFgyLlRyYW5zY29kZVRhcmdldFtkc3RdfVwiIG5vdCBzdXBwb3J0ZWQgYnkgY3VycmVudCB0cmFuc2NvZGVyIGJ1aWxkLmBcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzcmMgPT09IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdC5FVEMxUykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNnZCA9IGt0eDJSZWFkZXIuc3VwZXJjb21wcmVzc2lvbkdsb2JhbERhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZXIuZGVjb2RlUGFsZXR0ZXMoc2dkLmVuZHBvaW50Q291bnQsIHNnZC5lbmRwb2ludHNEYXRhLCBzZ2Quc2VsZWN0b3JDb3VudCwgc2dkLnNlbGVjdG9yc0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZXIuZGVjb2RlVGFibGVzKHNnZC50YWJsZXNEYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VJbmZvLmZsYWdzID0gaW1hZ2VEZXNjIS5pbWFnZUZsYWdzO1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlSW5mby5yZ2JCeXRlT2Zmc2V0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZUluZm8ucmdiQnl0ZUxlbmd0aCA9IGltYWdlRGVzYyEucmdiU2xpY2VCeXRlTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlSW5mby5hbHBoYUJ5dGVPZmZzZXQgPSBpbWFnZURlc2MhLmFscGhhU2xpY2VCeXRlT2Zmc2V0ID4gMCA/IGltYWdlRGVzYyEucmdiU2xpY2VCeXRlTGVuZ3RoIDogMDtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZUluZm8uYWxwaGFCeXRlTGVuZ3RoID0gaW1hZ2VEZXNjIS5hbHBoYVNsaWNlQnl0ZUxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJhbnNjb2Rlci50cmFuc2NvZGVJbWFnZSh0YXJnZXRGb3JtYXQsIGVuY29kZWREYXRhLCBpbWFnZUluZm8sIDAsIGlzVmlkZW8pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZUluZm8uZmxhZ3MgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlSW5mby5yZ2JCeXRlT2Zmc2V0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZUluZm8ucmdiQnl0ZUxlbmd0aCA9IHVuY29tcHJlc3NlZEJ5dGVMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VJbmZvLmFscGhhQnl0ZU9mZnNldCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VJbmZvLmFscGhhQnl0ZUxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyYW5zY29kZXIudHJhbnNjb2RlSW1hZ2UodGFyZ2V0Rm9ybWF0LCBlbmNvZGVkRGF0YSwgaW1hZ2VJbmZvLCAwLCBrdHgyUmVhZGVyLmhhc0FscGhhLCBpc1ZpZGVvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgIGlmICh0cmFuc2NvZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2Rlci5kZWxldGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW1hZ2VJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VJbmZvLmRlbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LnRyYW5zY29kZWRJbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHR1cmVEYXRhID0gcmVzdWx0LnRyYW5zY29kZWRJbWFnZS5nZXRfdHlwZWRfbWVtb3J5X3ZpZXcoKS5zbGljZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC50cmFuc2NvZGVkSW1hZ2UuZGVsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0dXJlRGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8taW50ZXJuYWwtbW9kdWxlcyAqL1xyXG5leHBvcnQgKiBmcm9tIFwiLi9rdHgyRGVjb2RlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9rdHgyRmlsZVJlYWRlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi90cmFuc2NvZGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3RyYW5zY29kZXJNYW5hZ2VyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3dhc21NZW1vcnlNYW5hZ2VyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3pzdGRkZWNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vTWlzYy9pbmRleFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9UcmFuc2NvZGVycy9pbmRleFwiO1xyXG4iLCIvKipcclxuICogUmVzb3VyY2VzIHVzZWQgZm9yIHRoZSBpbXBsZW1lbnRhdGlvbjpcclxuICogIC0gM2pzIEtUWDIgbG9hZGVyOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvZGZiNWMyM2NlMTI2ZWM4NDVlNGFhMjQwNTk5OTE1ZmVmNTM3NTc5Ny9leGFtcGxlcy9qc20vbG9hZGVycy9LVFgyTG9hZGVyLmpzXHJcbiAqICAtIFVuaXZlcnNhbCBUZXh0dXJlIFRyYW5zY29kZXJzOiBodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL1VuaXZlcnNhbC1UZXh0dXJlLVRyYW5zY29kZXJzXHJcbiAqICAtIEtUWDIgc3BlY2lmaWNhdGlvbjogaHR0cDovL2dpdGh1Yi5raHJvbm9zLm9yZy9LVFgtU3BlY2lmaWNhdGlvbi9cclxuICogIC0gS1RYMiBiaW5hcmllcyB0byBjb252ZXJ0IGZpbGVzOiBodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL0tUWC1Tb2Z0d2FyZS9yZWxlYXNlc1xyXG4gKiAgLSBLVFggc3BlY2lmaWNhdGlvbjogaHR0cHM6Ly93d3cua2hyb25vcy5vcmcvcmVnaXN0cnkvRGF0YUZvcm1hdC9zcGVjcy8xLjMvZGF0YWZvcm1hdC4xLjMuaHRtbFxyXG4gKiAgLSBLVFgtU29mdHdhcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvS1RYLVNvZnR3YXJlXHJcbiAqL1xyXG5pbXBvcnQgKiBhcyBLVFgyIGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9rdHgyZGVjb2RlclR5cGVzXCI7XHJcblxyXG5pbXBvcnQgdHlwZSB7IElLVFgyX0ltYWdlRGVzYyB9IGZyb20gXCIuL2t0eDJGaWxlUmVhZGVyXCI7XHJcbmltcG9ydCB7IEtUWDJGaWxlUmVhZGVyLCBTdXBlcmNvbXByZXNzaW9uU2NoZW1lIH0gZnJvbSBcIi4va3R4MkZpbGVSZWFkZXJcIjtcclxuaW1wb3J0IHsgVHJhbnNjb2Rlck1hbmFnZXIgfSBmcm9tIFwiLi90cmFuc2NvZGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMaXRlVHJhbnNjb2Rlcl9VQVNUQ19BU1RDIH0gZnJvbSBcIi4vVHJhbnNjb2RlcnMvbGl0ZVRyYW5zY29kZXJfVUFTVENfQVNUQ1wiO1xyXG5pbXBvcnQgeyBMaXRlVHJhbnNjb2Rlcl9VQVNUQ19CQzcgfSBmcm9tIFwiLi9UcmFuc2NvZGVycy9saXRlVHJhbnNjb2Rlcl9VQVNUQ19CQzdcIjtcclxuaW1wb3J0IHsgTGl0ZVRyYW5zY29kZXJfVUFTVENfUkdCQV9VTk9STSB9IGZyb20gXCIuL1RyYW5zY29kZXJzL2xpdGVUcmFuc2NvZGVyX1VBU1RDX1JHQkFfVU5PUk1cIjtcclxuaW1wb3J0IHsgTGl0ZVRyYW5zY29kZXJfVUFTVENfUkdCQV9TUkdCIH0gZnJvbSBcIi4vVHJhbnNjb2RlcnMvbGl0ZVRyYW5zY29kZXJfVUFTVENfUkdCQV9TUkdCXCI7XHJcbmltcG9ydCB7IExpdGVUcmFuc2NvZGVyX1VBU1RDX1I4X1VOT1JNIH0gZnJvbSBcIi4vVHJhbnNjb2RlcnMvbGl0ZVRyYW5zY29kZXJfVUFTVENfUjhfVU5PUk1cIjtcclxuaW1wb3J0IHsgTGl0ZVRyYW5zY29kZXJfVUFTVENfUkc4X1VOT1JNIH0gZnJvbSBcIi4vVHJhbnNjb2RlcnMvbGl0ZVRyYW5zY29kZXJfVUFTVENfUkc4X1VOT1JNXCI7XHJcbmltcG9ydCB7IE1TQ1RyYW5zY29kZXIgfSBmcm9tIFwiLi9UcmFuc2NvZGVycy9tc2NUcmFuc2NvZGVyXCI7XHJcbmltcG9ydCB7IFpTVEREZWNvZGVyIH0gZnJvbSBcIi4venN0ZGRlY1wiO1xyXG5pbXBvcnQgeyBUcmFuc2NvZGVEZWNpc2lvblRyZWUgfSBmcm9tIFwiLi90cmFuc2NvZGVEZWNpc2lvblRyZWVcIjtcclxuXHJcbmNvbnN0IGlzUG93ZXJPZlR3byA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XHJcbiAgICByZXR1cm4gKHZhbHVlICYgKHZhbHVlIC0gMSkpID09PSAwICYmIHZhbHVlICE9PSAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIGZvciBkZWNvZGluZyBLVFgyIGZpbGVzXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgS1RYMkRlY29kZXIge1xyXG4gICAgcHJpdmF0ZSBfdHJhbnNjb2Rlck1ncjogVHJhbnNjb2Rlck1hbmFnZXI7XHJcbiAgICBwcml2YXRlIF96c3RkRGVjb2RlcjogWlNURERlY29kZXI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBEZWZhdWx0RGVjb2Rlck9wdGlvbnM6IEtUWDIuSUtUWDJEZWNvZGVyT3B0aW9ucyA9IHt9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3RyYW5zY29kZXJNZ3IgPSBuZXcgVHJhbnNjb2Rlck1hbmFnZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVjb2RlKGRhdGE6IFVpbnQ4QXJyYXksIGNhcHM6IEtUWDIuSUNvbXByZXNzZWRGb3JtYXRDYXBhYmlsaXRpZXMsIG9wdGlvbnM/OiBLVFgyLklLVFgyRGVjb2Rlck9wdGlvbnMpOiBQcm9taXNlPEtUWDIuSURlY29kZWREYXRhPiB7XHJcbiAgICAgICAgY29uc3QgZmluYWxPcHRpb25zID0geyAuLi5vcHRpb25zLCAuLi5LVFgyRGVjb2Rlci5EZWZhdWx0RGVjb2Rlck9wdGlvbnMgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBrZnIgPSBuZXcgS1RYMkZpbGVSZWFkZXIoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWtmci5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgS1QyIGZpbGU6IHdyb25nIHNpZ25hdHVyZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAga2ZyLnBhcnNlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoa2ZyLm5lZWRaU1RERGVjb2Rlcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl96c3RkRGVjb2Rlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3pzdGREZWNvZGVyID0gbmV3IFpTVEREZWNvZGVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3pzdGREZWNvZGVyLmluaXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVjb2RlRGF0YShrZnIsIGNhcHMsIGZpbmFsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlY29kZURhdGEoa2ZyLCBjYXBzLCBmaW5hbE9wdGlvbnMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2RlY29kZURhdGEoa2ZyOiBLVFgyRmlsZVJlYWRlciwgY2FwczogS1RYMi5JQ29tcHJlc3NlZEZvcm1hdENhcGFiaWxpdGllcywgb3B0aW9ucz86IEtUWDIuSUtUWDJEZWNvZGVyT3B0aW9ucyk6IFByb21pc2U8S1RYMi5JRGVjb2RlZERhdGE+IHtcclxuICAgICAgICBjb25zdCB3aWR0aCA9IGtmci5oZWFkZXIucGl4ZWxXaWR0aDtcclxuICAgICAgICBjb25zdCBoZWlnaHQgPSBrZnIuaGVhZGVyLnBpeGVsSGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IHNyY1RleEZvcm1hdCA9IGtmci50ZXh0dXJlRm9ybWF0O1xyXG5cclxuICAgICAgICBjb25zdCBkZWNpc2lvblRyZWUgPSBuZXcgVHJhbnNjb2RlRGVjaXNpb25UcmVlKHNyY1RleEZvcm1hdCwga2ZyLmhhc0FscGhhLCBpc1Bvd2VyT2ZUd28od2lkdGgpICYmIGlzUG93ZXJPZlR3byhoZWlnaHQpLCBjYXBzLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnM/LnRyYW5zY29kZUZvcm1hdERlY2lzaW9uVHJlZSkge1xyXG4gICAgICAgICAgICBkZWNpc2lvblRyZWUucGFyc2VUcmVlKG9wdGlvbnM/LnRyYW5zY29kZUZvcm1hdERlY2lzaW9uVHJlZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0cmFuc2NvZGVGb3JtYXQgPSBkZWNpc2lvblRyZWUudHJhbnNjb2RlRm9ybWF0O1xyXG4gICAgICAgIGNvbnN0IGVuZ2luZUZvcm1hdCA9IGRlY2lzaW9uVHJlZS5lbmdpbmVGb3JtYXQ7XHJcbiAgICAgICAgY29uc3Qgcm91bmRUb011bHRpcGxlNCA9IGRlY2lzaW9uVHJlZS5yb3VuZFRvTXVsdGlwbGU0O1xyXG5cclxuICAgICAgICBjb25zdCB0cmFuc2NvZGVyID0gdGhpcy5fdHJhbnNjb2Rlck1nci5maW5kVHJhbnNjb2RlcihzcmNUZXhGb3JtYXQsIHRyYW5zY29kZUZvcm1hdCwga2ZyLmlzSW5HYW1tYVNwYWNlLCBvcHRpb25zPy5ieXBhc3NUcmFuc2NvZGVycyk7XHJcblxyXG4gICAgICAgIGlmICh0cmFuc2NvZGVyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgIGBubyB0cmFuc2NvZGVyIGZvdW5kIHRvIHRyYW5zY29kZSBzb3VyY2UgdGV4dHVyZSBmb3JtYXQgXCIke0tUWDIuU291cmNlVGV4dHVyZUZvcm1hdFtzcmNUZXhGb3JtYXRdfVwiIHRvIGZvcm1hdCBcIiR7S1RYMi5UcmFuc2NvZGVUYXJnZXRbdHJhbnNjb2RlRm9ybWF0XX1cImBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1pcG1hcHM6IEFycmF5PEtUWDIuSU1pcG1hcD4gPSBbXTtcclxuICAgICAgICBjb25zdCBkYXRhUHJvbWlzZXM6IEFycmF5PFByb21pc2U8VWludDhBcnJheSB8IG51bGw+PiA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGRlY29kZWREYXRhOiBLVFgyLklEZWNvZGVkRGF0YSA9IHtcclxuICAgICAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgICAgdHJhbnNjb2RlZEZvcm1hdDogZW5naW5lRm9ybWF0LFxyXG4gICAgICAgICAgICBtaXBtYXBzLFxyXG4gICAgICAgICAgICBpc0luR2FtbWFTcGFjZToga2ZyLmlzSW5HYW1tYVNwYWNlLFxyXG4gICAgICAgICAgICBoYXNBbHBoYToga2ZyLmhhc0FscGhhLFxyXG4gICAgICAgICAgICB0cmFuc2NvZGVyTmFtZTogdHJhbnNjb2Rlci5nZXROYW1lKCksXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IGZpcnN0SW1hZ2VEZXNjSW5kZXggPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBsZXZlbCA9IDA7IGxldmVsIDwga2ZyLmhlYWRlci5sZXZlbENvdW50OyBsZXZlbCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChsZXZlbCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGZpcnN0SW1hZ2VEZXNjSW5kZXggKz0gTWF0aC5tYXgoa2ZyLmhlYWRlci5sYXllckNvdW50LCAxKSAqIGtmci5oZWFkZXIuZmFjZUNvdW50ICogTWF0aC5tYXgoa2ZyLmhlYWRlci5waXhlbERlcHRoID4+IChsZXZlbCAtIDEpLCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgbGV2ZWxXaWR0aCA9IE1hdGguZmxvb3Iod2lkdGggLyAoMSA8PCBsZXZlbCkpIHx8IDE7XHJcbiAgICAgICAgICAgIGNvbnN0IGxldmVsSGVpZ2h0ID0gTWF0aC5mbG9vcihoZWlnaHQgLyAoMSA8PCBsZXZlbCkpIHx8IDE7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBudW1JbWFnZXNJbkxldmVsID0ga2ZyLmhlYWRlci5mYWNlQ291bnQ7IC8vIG5vdGUgdGhhdCBjdWJlbWFwIGFyZSBub3Qgc3VwcG9ydGVkIHlldCAoc2VlIEtUWDJGaWxlUmVhZGVyKSwgc28gZmFjZUNvdW50ID09IDFcclxuICAgICAgICAgICAgY29uc3QgbGV2ZWxJbWFnZUJ5dGVMZW5ndGggPSAoKGxldmVsV2lkdGggKyAzKSA+PiAyKSAqICgobGV2ZWxIZWlnaHQgKyAzKSA+PiAyKSAqIGtmci5kZmRCbG9jay5ieXRlc1BsYW5lWzBdO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbGV2ZWxVbmNvbXByZXNzZWRCeXRlTGVuZ3RoID0ga2ZyLmxldmVsc1tsZXZlbF0udW5jb21wcmVzc2VkQnl0ZUxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGxldCBsZXZlbERhdGFCdWZmZXIgPSBrZnIuZGF0YS5idWZmZXI7XHJcblxyXG4gICAgICAgICAgICBsZXQgbGV2ZWxEYXRhT2Zmc2V0ID0ga2ZyLmxldmVsc1tsZXZlbF0uYnl0ZU9mZnNldCArIGtmci5kYXRhLmJ5dGVPZmZzZXQ7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZU9mZnNldEluTGV2ZWwgPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKGtmci5oZWFkZXIuc3VwZXJjb21wcmVzc2lvblNjaGVtZSA9PT0gU3VwZXJjb21wcmVzc2lvblNjaGVtZS5aU3RhbmRhcmQpIHtcclxuICAgICAgICAgICAgICAgIGxldmVsRGF0YUJ1ZmZlciA9IHRoaXMuX3pzdGREZWNvZGVyLmRlY29kZShuZXcgVWludDhBcnJheShsZXZlbERhdGFCdWZmZXIsIGxldmVsRGF0YU9mZnNldCwga2ZyLmxldmVsc1tsZXZlbF0uYnl0ZUxlbmd0aCksIGxldmVsVW5jb21wcmVzc2VkQnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBsZXZlbERhdGFPZmZzZXQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGRlY29kZWREYXRhLndpZHRoID0gcm91bmRUb011bHRpcGxlNCA/IChsZXZlbFdpZHRoICsgMykgJiB+MyA6IGxldmVsV2lkdGg7XHJcbiAgICAgICAgICAgICAgICBkZWNvZGVkRGF0YS5oZWlnaHQgPSByb3VuZFRvTXVsdGlwbGU0ID8gKGxldmVsSGVpZ2h0ICsgMykgJiB+MyA6IGxldmVsSGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbWFnZUluZGV4ID0gMDsgaW1hZ2VJbmRleCA8IG51bUltYWdlc0luTGV2ZWw7IGltYWdlSW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuY29kZWREYXRhOiBVaW50OEFycmF5O1xyXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlRGVzYzogSUtUWDJfSW1hZ2VEZXNjIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGtmci5oZWFkZXIuc3VwZXJjb21wcmVzc2lvblNjaGVtZSA9PT0gU3VwZXJjb21wcmVzc2lvblNjaGVtZS5CYXNpc0xaKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VEZXNjID0ga2ZyLnN1cGVyY29tcHJlc3Npb25HbG9iYWxEYXRhLmltYWdlRGVzY3MhW2ZpcnN0SW1hZ2VEZXNjSW5kZXggKyBpbWFnZUluZGV4XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZW5jb2RlZERhdGEgPSBuZXcgVWludDhBcnJheShsZXZlbERhdGFCdWZmZXIsIGxldmVsRGF0YU9mZnNldCArIGltYWdlRGVzYy5yZ2JTbGljZUJ5dGVPZmZzZXQsIGltYWdlRGVzYy5yZ2JTbGljZUJ5dGVMZW5ndGggKyBpbWFnZURlc2MuYWxwaGFTbGljZUJ5dGVMZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbmNvZGVkRGF0YSA9IG5ldyBVaW50OEFycmF5KGxldmVsRGF0YUJ1ZmZlciwgbGV2ZWxEYXRhT2Zmc2V0ICsgaW1hZ2VPZmZzZXRJbkxldmVsLCBsZXZlbEltYWdlQnl0ZUxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlT2Zmc2V0SW5MZXZlbCArPSBsZXZlbEltYWdlQnl0ZUxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtaXBtYXA6IEtUWDIuSU1pcG1hcCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBsZXZlbFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogbGV2ZWxIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zY29kZWREYXRhID0gdHJhbnNjb2RlclxyXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2NvZGUoc3JjVGV4Rm9ybWF0LCB0cmFuc2NvZGVGb3JtYXQsIGxldmVsLCBsZXZlbFdpZHRoLCBsZXZlbEhlaWdodCwgbGV2ZWxVbmNvbXByZXNzZWRCeXRlTGVuZ3RoLCBrZnIsIGltYWdlRGVzYywgZW5jb2RlZERhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWlwbWFwLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlY29kZWREYXRhLmVycm9ycyA9IGRlY29kZWREYXRhLmVycm9ycyA/PyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWNvZGVkRGF0YS5lcnJvcnMgKz0gcmVhc29uICsgXCJcXG5cIiArIHJlYXNvbi5zdGFjayArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGRhdGFQcm9taXNlcy5wdXNoKHRyYW5zY29kZWREYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtaXBtYXBzLnB1c2gobWlwbWFwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGRhdGFQcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWNvZGVkRGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gUHV0IGluIHRoZSBvcmRlciB5b3Ugd2FudCB0aGUgdHJhbnNjb2RlcnMgdG8gYmUgdXNlZCBpbiBwcmlvcml0eVxyXG5UcmFuc2NvZGVyTWFuYWdlci5SZWdpc3RlclRyYW5zY29kZXIoTGl0ZVRyYW5zY29kZXJfVUFTVENfQVNUQyk7XHJcblRyYW5zY29kZXJNYW5hZ2VyLlJlZ2lzdGVyVHJhbnNjb2RlcihMaXRlVHJhbnNjb2Rlcl9VQVNUQ19CQzcpO1xyXG5UcmFuc2NvZGVyTWFuYWdlci5SZWdpc3RlclRyYW5zY29kZXIoTGl0ZVRyYW5zY29kZXJfVUFTVENfUkdCQV9VTk9STSk7XHJcblRyYW5zY29kZXJNYW5hZ2VyLlJlZ2lzdGVyVHJhbnNjb2RlcihMaXRlVHJhbnNjb2Rlcl9VQVNUQ19SR0JBX1NSR0IpO1xyXG5UcmFuc2NvZGVyTWFuYWdlci5SZWdpc3RlclRyYW5zY29kZXIoTGl0ZVRyYW5zY29kZXJfVUFTVENfUjhfVU5PUk0pO1xyXG5UcmFuc2NvZGVyTWFuYWdlci5SZWdpc3RlclRyYW5zY29kZXIoTGl0ZVRyYW5zY29kZXJfVUFTVENfUkc4X1VOT1JNKTtcclxuVHJhbnNjb2Rlck1hbmFnZXIuUmVnaXN0ZXJUcmFuc2NvZGVyKE1TQ1RyYW5zY29kZXIpOyAvLyBjYXRjaCBhbGwgdHJhbnNjb2RlciAtIHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIGZvcm1hdCBjYW4ndCBiZSB0cmFuc2NvZGVkXHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xyXG5pbXBvcnQgKiBhcyBLVFgyIGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9rdHgyZGVjb2RlclR5cGVzXCI7XHJcblxyXG5pbXBvcnQgeyBEYXRhUmVhZGVyIH0gZnJvbSBcIi4vTWlzYy9kYXRhUmVhZGVyXCI7XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBlbnVtIFN1cGVyY29tcHJlc3Npb25TY2hlbWUge1xyXG4gICAgTm9uZSA9IDAsXHJcbiAgICBCYXNpc0xaID0gMSxcclxuICAgIFpTdGFuZGFyZCA9IDIsXHJcbiAgICBaTGliID0gMyxcclxufVxyXG5cclxuY29uc3QgZW51bSBERkRNb2RlbCB7XHJcbiAgICBFVEMxUyA9IDE2MyxcclxuICAgIFVBU1RDID0gMTY2LFxyXG59XHJcblxyXG5jb25zdCBlbnVtIERGRENoYW5uZWxfRVRDMVMge1xyXG4gICAgUkdCID0gMCxcclxuICAgIFJSUiA9IDMsXHJcbiAgICBHR0cgPSA0LFxyXG4gICAgQUFBID0gMTUsXHJcbn1cclxuXHJcbmNvbnN0IGVudW0gREZEQ2hhbm5lbF9VQVNUQyB7XHJcbiAgICBSR0IgPSAwLFxyXG4gICAgUkdCQSA9IDMsXHJcbiAgICBSUlIgPSA0LFxyXG4gICAgUlJSRyA9IDUsXHJcbn1cclxuXHJcbmNvbnN0IGVudW0gREZEVHJhbnNmZXJGdW5jdGlvbiB7XHJcbiAgICBsaW5lYXIgPSAxLFxyXG4gICAgc1JHQiA9IDIsXHJcbn1cclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZXhwb3J0IGludGVyZmFjZSBJS1RYMl9IZWFkZXIge1xyXG4gICAgdmtGb3JtYXQ6IG51bWJlcjtcclxuICAgIHR5cGVTaXplOiBudW1iZXI7XHJcbiAgICBwaXhlbFdpZHRoOiBudW1iZXI7XHJcbiAgICBwaXhlbEhlaWdodDogbnVtYmVyO1xyXG4gICAgcGl4ZWxEZXB0aDogbnVtYmVyO1xyXG4gICAgbGF5ZXJDb3VudDogbnVtYmVyO1xyXG4gICAgZmFjZUNvdW50OiBudW1iZXI7XHJcbiAgICBsZXZlbENvdW50OiBudW1iZXI7XHJcbiAgICBzdXBlcmNvbXByZXNzaW9uU2NoZW1lOiBudW1iZXI7XHJcbiAgICBkZmRCeXRlT2Zmc2V0OiBudW1iZXI7XHJcbiAgICBkZmRCeXRlTGVuZ3RoOiBudW1iZXI7XHJcbiAgICBrdmRCeXRlT2Zmc2V0OiBudW1iZXI7XHJcbiAgICBrdmRCeXRlTGVuZ3RoOiBudW1iZXI7XHJcbiAgICBzZ2RCeXRlT2Zmc2V0OiBudW1iZXI7XHJcbiAgICBzZ2RCeXRlTGVuZ3RoOiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZXhwb3J0IGludGVyZmFjZSBJS1RYMl9MZXZlbCB7XHJcbiAgICBieXRlT2Zmc2V0OiBudW1iZXI7XHJcbiAgICBieXRlTGVuZ3RoOiBudW1iZXI7XHJcbiAgICB1bmNvbXByZXNzZWRCeXRlTGVuZ3RoOiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJS1RYMl9TYW1wbGUge1xyXG4gICAgYml0T2Zmc2V0OiBudW1iZXI7XHJcbiAgICBiaXRMZW5ndGg6IG51bWJlcjtcclxuICAgIGNoYW5uZWxUeXBlOiBudW1iZXI7XHJcbiAgICBjaGFubmVsRmxhZ3M6IG51bWJlcjtcclxuICAgIHNhbXBsZVBvc2l0aW9uOiBudW1iZXJbXTtcclxuICAgIHNhbXBsZUxvd2VyOiBudW1iZXI7XHJcbiAgICBzYW1wbGVVcHBlcjogbnVtYmVyO1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUtUWDJfREZEIHtcclxuICAgIHZlbmRvcklkOiBudW1iZXI7XHJcbiAgICBkZXNjcmlwdG9yVHlwZTogbnVtYmVyO1xyXG4gICAgdmVyc2lvbk51bWJlcjogbnVtYmVyO1xyXG4gICAgZGVzY3JpcHRvckJsb2NrU2l6ZTogbnVtYmVyO1xyXG4gICAgY29sb3JNb2RlbDogbnVtYmVyO1xyXG4gICAgY29sb3JQcmltYXJpZXM6IG51bWJlcjtcclxuICAgIHRyYW5zZmVyRnVuY3Rpb246IG51bWJlcjtcclxuICAgIGZsYWdzOiBudW1iZXI7XHJcbiAgICB0ZXhlbEJsb2NrRGltZW5zaW9uOiB7XHJcbiAgICAgICAgeDogbnVtYmVyO1xyXG4gICAgICAgIHk6IG51bWJlcjtcclxuICAgICAgICB6OiBudW1iZXI7XHJcbiAgICAgICAgdzogbnVtYmVyO1xyXG4gICAgfTtcclxuICAgIGJ5dGVzUGxhbmU6IEFycmF5PG51bWJlcj47XHJcbiAgICBudW1TYW1wbGVzOiBudW1iZXI7XHJcbiAgICBzYW1wbGVzOiBBcnJheTxJS1RYMl9TYW1wbGU+O1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUtUWDJfSW1hZ2VEZXNjIHtcclxuICAgIGltYWdlRmxhZ3M6IG51bWJlcjtcclxuICAgIHJnYlNsaWNlQnl0ZU9mZnNldDogbnVtYmVyO1xyXG4gICAgcmdiU2xpY2VCeXRlTGVuZ3RoOiBudW1iZXI7XHJcbiAgICBhbHBoYVNsaWNlQnl0ZU9mZnNldDogbnVtYmVyO1xyXG4gICAgYWxwaGFTbGljZUJ5dGVMZW5ndGg6IG51bWJlcjtcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElLVFgyX1N1cGVyY29tcHJlc3Npb25HbG9iYWxEYXRhIHtcclxuICAgIGVuZHBvaW50Q291bnQ/OiBudW1iZXI7XHJcbiAgICBzZWxlY3RvckNvdW50PzogbnVtYmVyO1xyXG4gICAgZW5kcG9pbnRzQnl0ZUxlbmd0aD86IG51bWJlcjtcclxuICAgIHNlbGVjdG9yc0J5dGVMZW5ndGg/OiBudW1iZXI7XHJcbiAgICB0YWJsZXNCeXRlTGVuZ3RoPzogbnVtYmVyO1xyXG4gICAgZXh0ZW5kZWRCeXRlTGVuZ3RoPzogbnVtYmVyO1xyXG4gICAgaW1hZ2VEZXNjcz86IEFycmF5PElLVFgyX0ltYWdlRGVzYz47XHJcbiAgICBlbmRwb2ludHNEYXRhPzogVWludDhBcnJheTtcclxuICAgIHNlbGVjdG9yc0RhdGE/OiBVaW50OEFycmF5O1xyXG4gICAgdGFibGVzRGF0YT86IFVpbnQ4QXJyYXk7XHJcbiAgICBleHRlbmRlZERhdGE/OiBVaW50OEFycmF5O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgS1RYMkZpbGVSZWFkZXIge1xyXG4gICAgcHJpdmF0ZSBfZGF0YTogVWludDhBcnJheTtcclxuICAgIHByaXZhdGUgX2hlYWRlcjogSUtUWDJfSGVhZGVyO1xyXG4gICAgcHJpdmF0ZSBfbGV2ZWxzOiBBcnJheTxJS1RYMl9MZXZlbD47XHJcbiAgICBwcml2YXRlIF9kZmRCbG9jazogSUtUWDJfREZEO1xyXG4gICAgcHJpdmF0ZSBfc3VwZXJjb21wcmVzc2lvbkdsb2JhbERhdGE6IElLVFgyX1N1cGVyY29tcHJlc3Npb25HbG9iYWxEYXRhO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgdGhlIGZpbGUgY2FuJ3QgYmUgcGFyc2VkXHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBVaW50OEFycmF5KSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhKCk6IFVpbnQ4QXJyYXkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaGVhZGVyKCk6IElLVFgyX0hlYWRlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlYWRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGxldmVscygpOiBBcnJheTxJS1RYMl9MZXZlbD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZXZlbHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkZmRCbG9jaygpOiBJS1RYMl9ERkQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZmRCbG9jaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHN1cGVyY29tcHJlc3Npb25HbG9iYWxEYXRhKCk6IElLVFgyX1N1cGVyY29tcHJlc3Npb25HbG9iYWxEYXRhIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3VwZXJjb21wcmVzc2lvbkdsb2JhbERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzVmFsaWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIEtUWDJGaWxlUmVhZGVyLklzVmFsaWQodGhpcy5fZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBhcnNlKCkge1xyXG4gICAgICAgIGxldCBvZmZzZXRJbkZpbGUgPSAxMjsgLy8gc2tpcCB0aGUgaGVhZGVyXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldCB0aGUgaGVhZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3QgaGRyUmVhZGVyID0gbmV3IERhdGFSZWFkZXIodGhpcy5fZGF0YSwgb2Zmc2V0SW5GaWxlLCAxNyAqIDQpO1xyXG5cclxuICAgICAgICBjb25zdCBoZWFkZXIgPSAodGhpcy5faGVhZGVyID0ge1xyXG4gICAgICAgICAgICB2a0Zvcm1hdDogaGRyUmVhZGVyLnJlYWRVaW50MzIoKSxcclxuICAgICAgICAgICAgdHlwZVNpemU6IGhkclJlYWRlci5yZWFkVWludDMyKCksXHJcbiAgICAgICAgICAgIHBpeGVsV2lkdGg6IGhkclJlYWRlci5yZWFkVWludDMyKCksXHJcbiAgICAgICAgICAgIHBpeGVsSGVpZ2h0OiBoZHJSZWFkZXIucmVhZFVpbnQzMigpLFxyXG4gICAgICAgICAgICBwaXhlbERlcHRoOiBoZHJSZWFkZXIucmVhZFVpbnQzMigpLFxyXG4gICAgICAgICAgICBsYXllckNvdW50OiBoZHJSZWFkZXIucmVhZFVpbnQzMigpLFxyXG4gICAgICAgICAgICBmYWNlQ291bnQ6IGhkclJlYWRlci5yZWFkVWludDMyKCksXHJcbiAgICAgICAgICAgIGxldmVsQ291bnQ6IGhkclJlYWRlci5yZWFkVWludDMyKCksXHJcbiAgICAgICAgICAgIHN1cGVyY29tcHJlc3Npb25TY2hlbWU6IGhkclJlYWRlci5yZWFkVWludDMyKCksXHJcblxyXG4gICAgICAgICAgICBkZmRCeXRlT2Zmc2V0OiBoZHJSZWFkZXIucmVhZFVpbnQzMigpLFxyXG4gICAgICAgICAgICBkZmRCeXRlTGVuZ3RoOiBoZHJSZWFkZXIucmVhZFVpbnQzMigpLFxyXG4gICAgICAgICAgICBrdmRCeXRlT2Zmc2V0OiBoZHJSZWFkZXIucmVhZFVpbnQzMigpLFxyXG4gICAgICAgICAgICBrdmRCeXRlTGVuZ3RoOiBoZHJSZWFkZXIucmVhZFVpbnQzMigpLFxyXG4gICAgICAgICAgICBzZ2RCeXRlT2Zmc2V0OiBoZHJSZWFkZXIucmVhZFVpbnQ2NCgpLFxyXG4gICAgICAgICAgICBzZ2RCeXRlTGVuZ3RoOiBoZHJSZWFkZXIucmVhZFVpbnQ2NCgpLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaGVhZGVyLnBpeGVsRGVwdGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIHBhcnNlIEtUWDIgZmlsZSAtIE9ubHkgMkQgdGV4dHVyZXMgYXJlIGN1cnJlbnRseSBzdXBwb3J0ZWQuYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGVhZGVyLmxheWVyQ291bnQgPiAxKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIHBhcnNlIEtUWDIgZmlsZSAtIEFycmF5IHRleHR1cmVzIGFyZSBub3QgY3VycmVudGx5IHN1cHBvcnRlZC5gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoZWFkZXIuZmFjZUNvdW50ID4gMSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBwYXJzZSBLVFgyIGZpbGUgLSBDdWJlIHRleHR1cmVzIGFyZSBub3QgY3VycmVudGx5IHN1cHBvcnRlZC5gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9mZnNldEluRmlsZSArPSBoZHJSZWFkZXIuYnl0ZU9mZnNldDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0IHRoZSBsZXZlbHNcclxuICAgICAgICAgKi9cclxuICAgICAgICBsZXQgbGV2ZWxDb3VudCA9IE1hdGgubWF4KDEsIGhlYWRlci5sZXZlbENvdW50KTtcclxuXHJcbiAgICAgICAgY29uc3QgbGV2ZWxSZWFkZXIgPSBuZXcgRGF0YVJlYWRlcih0aGlzLl9kYXRhLCBvZmZzZXRJbkZpbGUsIGxldmVsQ291bnQgKiAzICogKDIgKiA0KSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxldmVsczogQXJyYXk8SUtUWDJfTGV2ZWw+ID0gKHRoaXMuX2xldmVscyA9IFtdKTtcclxuXHJcbiAgICAgICAgd2hpbGUgKGxldmVsQ291bnQtLSkge1xyXG4gICAgICAgICAgICBsZXZlbHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBieXRlT2Zmc2V0OiBsZXZlbFJlYWRlci5yZWFkVWludDY0KCksXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBsZXZlbFJlYWRlci5yZWFkVWludDY0KCksXHJcbiAgICAgICAgICAgICAgICB1bmNvbXByZXNzZWRCeXRlTGVuZ3RoOiBsZXZlbFJlYWRlci5yZWFkVWludDY0KCksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2Zmc2V0SW5GaWxlICs9IGxldmVsUmVhZGVyLmJ5dGVPZmZzZXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldCB0aGUgZGF0YSBmb3JtYXQgZGVzY3JpcHRvciAoREZEKSBibG9ja3NcclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdCBkZmRSZWFkZXIgPSBuZXcgRGF0YVJlYWRlcih0aGlzLl9kYXRhLCBoZWFkZXIuZGZkQnl0ZU9mZnNldCwgaGVhZGVyLmRmZEJ5dGVMZW5ndGgpO1xyXG5cclxuICAgICAgICBjb25zdCBkZmRCbG9jayA9ICh0aGlzLl9kZmRCbG9jayA9IHtcclxuICAgICAgICAgICAgdmVuZG9ySWQ6IGRmZFJlYWRlci5za2lwQnl0ZXMoNCAvKiBza2lwIHRvdGFsU2l6ZSAqLykucmVhZFVpbnQxNigpLFxyXG4gICAgICAgICAgICBkZXNjcmlwdG9yVHlwZTogZGZkUmVhZGVyLnJlYWRVaW50MTYoKSxcclxuICAgICAgICAgICAgdmVyc2lvbk51bWJlcjogZGZkUmVhZGVyLnJlYWRVaW50MTYoKSxcclxuICAgICAgICAgICAgZGVzY3JpcHRvckJsb2NrU2l6ZTogZGZkUmVhZGVyLnJlYWRVaW50MTYoKSxcclxuICAgICAgICAgICAgY29sb3JNb2RlbDogZGZkUmVhZGVyLnJlYWRVaW50OCgpLFxyXG4gICAgICAgICAgICBjb2xvclByaW1hcmllczogZGZkUmVhZGVyLnJlYWRVaW50OCgpLFxyXG4gICAgICAgICAgICB0cmFuc2ZlckZ1bmN0aW9uOiBkZmRSZWFkZXIucmVhZFVpbnQ4KCksXHJcbiAgICAgICAgICAgIGZsYWdzOiBkZmRSZWFkZXIucmVhZFVpbnQ4KCksXHJcbiAgICAgICAgICAgIHRleGVsQmxvY2tEaW1lbnNpb246IHtcclxuICAgICAgICAgICAgICAgIHg6IGRmZFJlYWRlci5yZWFkVWludDgoKSArIDEsXHJcbiAgICAgICAgICAgICAgICB5OiBkZmRSZWFkZXIucmVhZFVpbnQ4KCkgKyAxLFxyXG4gICAgICAgICAgICAgICAgejogZGZkUmVhZGVyLnJlYWRVaW50OCgpICsgMSxcclxuICAgICAgICAgICAgICAgIHc6IGRmZFJlYWRlci5yZWFkVWludDgoKSArIDEsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJ5dGVzUGxhbmU6IFtcclxuICAgICAgICAgICAgICAgIGRmZFJlYWRlci5yZWFkVWludDgoKSAvKiBieXRlc1BsYW5lMCAqLyxcclxuICAgICAgICAgICAgICAgIGRmZFJlYWRlci5yZWFkVWludDgoKSAvKiBieXRlc1BsYW5lMSAqLyxcclxuICAgICAgICAgICAgICAgIGRmZFJlYWRlci5yZWFkVWludDgoKSAvKiBieXRlc1BsYW5lMiAqLyxcclxuICAgICAgICAgICAgICAgIGRmZFJlYWRlci5yZWFkVWludDgoKSAvKiBieXRlc1BsYW5lMyAqLyxcclxuICAgICAgICAgICAgICAgIGRmZFJlYWRlci5yZWFkVWludDgoKSAvKiBieXRlc1BsYW5lNCAqLyxcclxuICAgICAgICAgICAgICAgIGRmZFJlYWRlci5yZWFkVWludDgoKSAvKiBieXRlc1BsYW5lNSAqLyxcclxuICAgICAgICAgICAgICAgIGRmZFJlYWRlci5yZWFkVWludDgoKSAvKiBieXRlc1BsYW5lNiAqLyxcclxuICAgICAgICAgICAgICAgIGRmZFJlYWRlci5yZWFkVWludDgoKSAvKiBieXRlc1BsYW5lNyAqLyxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgbnVtU2FtcGxlczogMCxcclxuICAgICAgICAgICAgc2FtcGxlczogbmV3IEFycmF5PElLVFgyX1NhbXBsZT4oKSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGZkQmxvY2subnVtU2FtcGxlcyA9IChkZmRCbG9jay5kZXNjcmlwdG9yQmxvY2tTaXplIC0gMjQpIC8gMTY7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGZkQmxvY2subnVtU2FtcGxlczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNhbXBsZSA9IHtcclxuICAgICAgICAgICAgICAgIGJpdE9mZnNldDogZGZkUmVhZGVyLnJlYWRVaW50MTYoKSxcclxuICAgICAgICAgICAgICAgIGJpdExlbmd0aDogZGZkUmVhZGVyLnJlYWRVaW50OCgpICsgMSxcclxuICAgICAgICAgICAgICAgIGNoYW5uZWxUeXBlOiBkZmRSZWFkZXIucmVhZFVpbnQ4KCksXHJcbiAgICAgICAgICAgICAgICBjaGFubmVsRmxhZ3M6IDAsXHJcbiAgICAgICAgICAgICAgICBzYW1wbGVQb3NpdGlvbjogW1xyXG4gICAgICAgICAgICAgICAgICAgIGRmZFJlYWRlci5yZWFkVWludDgoKSAvKiBzYW1wbGVQb3NpdGlvbjAgKi8sXHJcbiAgICAgICAgICAgICAgICAgICAgZGZkUmVhZGVyLnJlYWRVaW50OCgpIC8qIHNhbXBsZVBvc2l0aW9uMSAqLyxcclxuICAgICAgICAgICAgICAgICAgICBkZmRSZWFkZXIucmVhZFVpbnQ4KCkgLyogc2FtcGxlUG9zaXRpb24yICovLFxyXG4gICAgICAgICAgICAgICAgICAgIGRmZFJlYWRlci5yZWFkVWludDgoKSAvKiBzYW1wbGVQb3NpdGlvbjMgKi8sXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgc2FtcGxlTG93ZXI6IGRmZFJlYWRlci5yZWFkVWludDMyKCksXHJcbiAgICAgICAgICAgICAgICBzYW1wbGVVcHBlcjogZGZkUmVhZGVyLnJlYWRVaW50MzIoKSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHNhbXBsZS5jaGFubmVsRmxhZ3MgPSAoc2FtcGxlLmNoYW5uZWxUeXBlICYgMHhmMCkgPj4gNDtcclxuICAgICAgICAgICAgc2FtcGxlLmNoYW5uZWxUeXBlID0gc2FtcGxlLmNoYW5uZWxUeXBlICYgMHgwZjtcclxuXHJcbiAgICAgICAgICAgIGRmZEJsb2NrLnNhbXBsZXMucHVzaChzYW1wbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0IHRoZSBTdXBlcmNvbXByZXNzaW9uIEdsb2JhbCBEYXRhIChzZ2QpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3Qgc2dkOiBJS1RYMl9TdXBlcmNvbXByZXNzaW9uR2xvYmFsRGF0YSA9ICh0aGlzLl9zdXBlcmNvbXByZXNzaW9uR2xvYmFsRGF0YSA9IHt9KTtcclxuXHJcbiAgICAgICAgaWYgKGhlYWRlci5zZ2RCeXRlTGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBzZ2RSZWFkZXIgPSBuZXcgRGF0YVJlYWRlcih0aGlzLl9kYXRhLCBoZWFkZXIuc2dkQnl0ZU9mZnNldCwgaGVhZGVyLnNnZEJ5dGVMZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgc2dkLmVuZHBvaW50Q291bnQgPSBzZ2RSZWFkZXIucmVhZFVpbnQxNigpO1xyXG4gICAgICAgICAgICBzZ2Quc2VsZWN0b3JDb3VudCA9IHNnZFJlYWRlci5yZWFkVWludDE2KCk7XHJcbiAgICAgICAgICAgIHNnZC5lbmRwb2ludHNCeXRlTGVuZ3RoID0gc2dkUmVhZGVyLnJlYWRVaW50MzIoKTtcclxuICAgICAgICAgICAgc2dkLnNlbGVjdG9yc0J5dGVMZW5ndGggPSBzZ2RSZWFkZXIucmVhZFVpbnQzMigpO1xyXG4gICAgICAgICAgICBzZ2QudGFibGVzQnl0ZUxlbmd0aCA9IHNnZFJlYWRlci5yZWFkVWludDMyKCk7XHJcbiAgICAgICAgICAgIHNnZC5leHRlbmRlZEJ5dGVMZW5ndGggPSBzZ2RSZWFkZXIucmVhZFVpbnQzMigpO1xyXG4gICAgICAgICAgICBzZ2QuaW1hZ2VEZXNjcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaW1hZ2VDb3VudCA9IHRoaXMuX2dldEltYWdlQ291bnQoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2VDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzZ2QuaW1hZ2VEZXNjcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZUZsYWdzOiBzZ2RSZWFkZXIucmVhZFVpbnQzMigpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJnYlNsaWNlQnl0ZU9mZnNldDogc2dkUmVhZGVyLnJlYWRVaW50MzIoKSxcclxuICAgICAgICAgICAgICAgICAgICByZ2JTbGljZUJ5dGVMZW5ndGg6IHNnZFJlYWRlci5yZWFkVWludDMyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgYWxwaGFTbGljZUJ5dGVPZmZzZXQ6IHNnZFJlYWRlci5yZWFkVWludDMyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgYWxwaGFTbGljZUJ5dGVMZW5ndGg6IHNnZFJlYWRlci5yZWFkVWludDMyKCksXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZW5kcG9pbnRzQnl0ZU9mZnNldCA9IGhlYWRlci5zZ2RCeXRlT2Zmc2V0ICsgc2dkUmVhZGVyLmJ5dGVPZmZzZXQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdG9yc0J5dGVPZmZzZXQgPSBlbmRwb2ludHNCeXRlT2Zmc2V0ICsgc2dkLmVuZHBvaW50c0J5dGVMZW5ndGg7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhYmxlc0J5dGVPZmZzZXQgPSBzZWxlY3RvcnNCeXRlT2Zmc2V0ICsgc2dkLnNlbGVjdG9yc0J5dGVMZW5ndGg7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4dGVuZGVkQnl0ZU9mZnNldCA9IHRhYmxlc0J5dGVPZmZzZXQgKyBzZ2QudGFibGVzQnl0ZUxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIHNnZC5lbmRwb2ludHNEYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fZGF0YS5idWZmZXIsIHRoaXMuX2RhdGEuYnl0ZU9mZnNldCArIGVuZHBvaW50c0J5dGVPZmZzZXQsIHNnZC5lbmRwb2ludHNCeXRlTGVuZ3RoKTtcclxuICAgICAgICAgICAgc2dkLnNlbGVjdG9yc0RhdGEgPSBuZXcgVWludDhBcnJheSh0aGlzLl9kYXRhLmJ1ZmZlciwgdGhpcy5fZGF0YS5ieXRlT2Zmc2V0ICsgc2VsZWN0b3JzQnl0ZU9mZnNldCwgc2dkLnNlbGVjdG9yc0J5dGVMZW5ndGgpO1xyXG4gICAgICAgICAgICBzZ2QudGFibGVzRGF0YSA9IG5ldyBVaW50OEFycmF5KHRoaXMuX2RhdGEuYnVmZmVyLCB0aGlzLl9kYXRhLmJ5dGVPZmZzZXQgKyB0YWJsZXNCeXRlT2Zmc2V0LCBzZ2QudGFibGVzQnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgICAgIHNnZC5leHRlbmRlZERhdGEgPSBuZXcgVWludDhBcnJheSh0aGlzLl9kYXRhLmJ1ZmZlciwgdGhpcy5fZGF0YS5ieXRlT2Zmc2V0ICsgZXh0ZW5kZWRCeXRlT2Zmc2V0LCBzZ2QuZXh0ZW5kZWRCeXRlTGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0SW1hZ2VDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBsYXllclBpeGVsRGVwdGggPSBNYXRoLm1heCh0aGlzLl9oZWFkZXIucGl4ZWxEZXB0aCwgMSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLl9oZWFkZXIubGV2ZWxDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxheWVyUGl4ZWxEZXB0aCArPSBNYXRoLm1heCh0aGlzLl9oZWFkZXIucGl4ZWxEZXB0aCA+PiBpLCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBNYXRoLm1heCh0aGlzLl9oZWFkZXIubGF5ZXJDb3VudCwgMSkgKiB0aGlzLl9oZWFkZXIuZmFjZUNvdW50ICogbGF5ZXJQaXhlbERlcHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdGV4dHVyZUZvcm1hdCgpOiBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZmRCbG9jay5jb2xvck1vZGVsID09PSBERkRNb2RlbC5VQVNUQyA/IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdC5VQVNUQzR4NCA6IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdC5FVEMxUztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGhhc0FscGhhKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHRmb3JtYXQgPSB0aGlzLnRleHR1cmVGb3JtYXQ7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodGZvcm1hdCkge1xyXG4gICAgICAgICAgICBjYXNlIEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdC5FVEMxUzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGZkQmxvY2subnVtU2FtcGxlcyA9PT0gMiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLl9kZmRCbG9jay5zYW1wbGVzWzBdLmNoYW5uZWxUeXBlID09PSBERkRDaGFubmVsX0VUQzFTLkFBQSB8fCB0aGlzLl9kZmRCbG9jay5zYW1wbGVzWzFdLmNoYW5uZWxUeXBlID09PSBERkRDaGFubmVsX0VUQzFTLkFBQSlcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBjYXNlIEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdC5VQVNUQzR4NDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kZmRCbG9jay5zYW1wbGVzWzBdLmNoYW5uZWxUeXBlID09PSBERkRDaGFubmVsX1VBU1RDLlJHQkE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBuZWVkWlNURERlY29kZXIoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlYWRlci5zdXBlcmNvbXByZXNzaW9uU2NoZW1lID09PSBTdXBlcmNvbXByZXNzaW9uU2NoZW1lLlpTdGFuZGFyZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzSW5HYW1tYVNwYWNlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZmRCbG9jay50cmFuc2ZlckZ1bmN0aW9uID09PSBERkRUcmFuc2ZlckZ1bmN0aW9uLnNSR0I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBJc1ZhbGlkKGRhdGE6IEFycmF5QnVmZmVyVmlldyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChkYXRhLmJ5dGVMZW5ndGggPj0gMTIpIHtcclxuICAgICAgICAgICAgLy8gJ8KrJywgJ0snLCAnVCcsICdYJywgJyAnLCAnMicsICcwJywgJ8K7JywgJ1xccicsICdcXG4nLCAnXFx4MUEnLCAnXFxuJ1xyXG4gICAgICAgICAgICBjb25zdCBpZGVudGlmaWVyID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgMTIpO1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyWzBdID09PSAweGFiICYmXHJcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyWzFdID09PSAweDRiICYmXHJcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyWzJdID09PSAweDU0ICYmXHJcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyWzNdID09PSAweDU4ICYmXHJcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyWzRdID09PSAweDIwICYmXHJcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyWzVdID09PSAweDMyICYmXHJcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyWzZdID09PSAweDMwICYmXHJcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyWzddID09PSAweGJiICYmXHJcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyWzhdID09PSAweDBkICYmXHJcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyWzldID09PSAweDBhICYmXHJcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyWzEwXSA9PT0gMHgxYSAmJlxyXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllclsxMV0gPT09IDB4MGFcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzICovXHJcbmltcG9ydCB7IEtUWDJEZWNvZGVyIH0gZnJvbSBcIi4uL2luZGV4XCI7XHJcblxyXG5jb25zdCBnbG9iYWxPYmplY3QgPSB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcclxuaWYgKHR5cGVvZiBnbG9iYWxPYmplY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICg8YW55Pmdsb2JhbE9iamVjdCkuS1RYMkRFQ09ERVIgPSBLVFgyRGVjb2RlcjtcclxufVxyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4uL2luZGV4XCI7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xyXG5pbXBvcnQgKiBhcyBLVFgyIGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9rdHgyZGVjb2RlclR5cGVzXCI7XHJcblxyXG5jb25zdCBEZWNpc2lvblRyZWU6IEtUWDIuSURlY2lzaW9uVHJlZSA9IHtcclxuICAgIEVUQzFTOiB7XHJcbiAgICAgICAgb3B0aW9uOiBcImZvcmNlUkdCQVwiLFxyXG4gICAgICAgIHllczoge1xyXG4gICAgICAgICAgICB0cmFuc2NvZGVGb3JtYXQ6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LlJHQkEzMixcclxuICAgICAgICAgICAgZW5naW5lRm9ybWF0OiBLVFgyLkVuZ2luZUZvcm1hdC5SR0JBOEZvcm1hdCxcclxuICAgICAgICAgICAgcm91bmRUb011bHRpcGxlNDogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBubzoge1xyXG4gICAgICAgICAgICBjYXA6IFwiZXRjMlwiLFxyXG4gICAgICAgICAgICB5ZXM6IHtcclxuICAgICAgICAgICAgICAgIGFscGhhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgeWVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlRm9ybWF0OiBLVFgyLlRyYW5zY29kZVRhcmdldC5FVEMyX1JHQkEsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5naW5lRm9ybWF0OiBLVFgyLkVuZ2luZUZvcm1hdC5DT01QUkVTU0VEX1JHQkE4X0VUQzJfRUFDLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlRm9ybWF0OiBLVFgyLlRyYW5zY29kZVRhcmdldC5FVEMxX1JHQixcclxuICAgICAgICAgICAgICAgICAgICBlbmdpbmVGb3JtYXQ6IEtUWDIuRW5naW5lRm9ybWF0LkNPTVBSRVNTRURfUkdCOF9FVEMyLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbm86IHtcclxuICAgICAgICAgICAgICAgIGNhcDogXCJldGMxXCIsXHJcbiAgICAgICAgICAgICAgICBhbHBoYTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB5ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2NvZGVGb3JtYXQ6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LkVUQzFfUkdCLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZ2luZUZvcm1hdDogS1RYMi5FbmdpbmVGb3JtYXQuQ09NUFJFU1NFRF9SR0JfRVRDMV9XRUJHTCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBubzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcDogXCJicHRjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgeWVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZUZvcm1hdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQuQkM3X1JHQkEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZUZvcm1hdDogS1RYMi5FbmdpbmVGb3JtYXQuQ09NUFJFU1NFRF9SR0JBX0JQVENfVU5PUk1fRVhULFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbm86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwOiBcInMzdGNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgeWVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHBoYTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZUZvcm1hdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQuQkMzX1JHQkEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lRm9ybWF0OiBLVFgyLkVuZ2luZUZvcm1hdC5DT01QUkVTU0VEX1JHQkFfUzNUQ19EWFQ1X0VYVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBubzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZUZvcm1hdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQuQkMxX1JHQixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVGb3JtYXQ6IEtUWDIuRW5naW5lRm9ybWF0LkNPTVBSRVNTRURfUkdCX1MzVENfRFhUMV9FWFQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBubzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwOiBcInB2cnRjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWVkc1Bvd2VyT2ZUd286IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHBoYTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlRm9ybWF0OiBLVFgyLlRyYW5zY29kZVRhcmdldC5QVlJUQzFfNF9SR0JBLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVGb3JtYXQ6IEtUWDIuRW5naW5lRm9ybWF0LkNPTVBSRVNTRURfUkdCQV9QVlJUQ180QlBQVjFfSU1HLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlRm9ybWF0OiBLVFgyLlRyYW5zY29kZVRhcmdldC5QVlJUQzFfNF9SR0IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZUZvcm1hdDogS1RYMi5FbmdpbmVGb3JtYXQuQ09NUFJFU1NFRF9SR0JfUFZSVENfNEJQUFYxX0lNRyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlRm9ybWF0OiBLVFgyLlRyYW5zY29kZVRhcmdldC5SR0JBMzIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lRm9ybWF0OiBLVFgyLkVuZ2luZUZvcm1hdC5SR0JBOEZvcm1hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3VuZFRvTXVsdGlwbGU0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgVUFTVEM6IHtcclxuICAgICAgICBvcHRpb246IFwiZm9yY2VSR0JBXCIsXHJcbiAgICAgICAgeWVzOiB7XHJcbiAgICAgICAgICAgIHRyYW5zY29kZUZvcm1hdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQuUkdCQTMyLFxyXG4gICAgICAgICAgICBlbmdpbmVGb3JtYXQ6IEtUWDIuRW5naW5lRm9ybWF0LlJHQkE4Rm9ybWF0LFxyXG4gICAgICAgICAgICByb3VuZFRvTXVsdGlwbGU0OiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5vOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbjogXCJmb3JjZVI4XCIsXHJcbiAgICAgICAgICAgIHllczoge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNjb2RlRm9ybWF0OiBLVFgyLlRyYW5zY29kZVRhcmdldC5SOCxcclxuICAgICAgICAgICAgICAgIGVuZ2luZUZvcm1hdDogS1RYMi5FbmdpbmVGb3JtYXQuUjhGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICByb3VuZFRvTXVsdGlwbGU0OiBmYWxzZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbm86IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbjogXCJmb3JjZVJHOFwiLFxyXG4gICAgICAgICAgICAgICAgeWVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlRm9ybWF0OiBLVFgyLlRyYW5zY29kZVRhcmdldC5SRzgsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5naW5lRm9ybWF0OiBLVFgyLkVuZ2luZUZvcm1hdC5SRzhGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcm91bmRUb011bHRpcGxlNDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbm86IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXA6IFwiYXN0Y1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHllczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2NvZGVGb3JtYXQ6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LkFTVENfNFg0X1JHQkEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZUZvcm1hdDogS1RYMi5FbmdpbmVGb3JtYXQuQ09NUFJFU1NFRF9SR0JBX0FTVENfNFg0X0tIUixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcDogXCJicHRjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHllczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlRm9ybWF0OiBLVFgyLlRyYW5zY29kZVRhcmdldC5CQzdfUkdCQSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZUZvcm1hdDogS1RYMi5FbmdpbmVGb3JtYXQuQ09NUFJFU1NFRF9SR0JBX0JQVENfVU5PUk1fRVhULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBubzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uOiBcInVzZVJHQkFJZkFTVENCQzdOb3RBdmFpbGFibGVXaGVuVUFTVENcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZUZvcm1hdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQuUkdCQTMyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZUZvcm1hdDogS1RYMi5FbmdpbmVGb3JtYXQuUkdCQThGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91bmRUb011bHRpcGxlNDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXA6IFwiZXRjMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHBoYTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2NvZGVGb3JtYXQ6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LkVUQzJfUkdCQSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZUZvcm1hdDogS1RYMi5FbmdpbmVGb3JtYXQuQ09NUFJFU1NFRF9SR0JBOF9FVEMyX0VBQyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZUZvcm1hdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQuRVRDMV9SR0IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVGb3JtYXQ6IEtUWDIuRW5naW5lRm9ybWF0LkNPTVBSRVNTRURfUkdCOF9FVEMyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwOiBcImV0YzFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2NvZGVGb3JtYXQ6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LkVUQzFfUkdCLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lRm9ybWF0OiBLVFgyLkVuZ2luZUZvcm1hdC5DT01QUkVTU0VEX1JHQl9FVEMxX1dFQkdMLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBubzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwOiBcInMzdGNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFscGhhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2NvZGVGb3JtYXQ6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LkJDM19SR0JBLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVGb3JtYXQ6IEtUWDIuRW5naW5lRm9ybWF0LkNPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDVfRVhULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlRm9ybWF0OiBLVFgyLlRyYW5zY29kZVRhcmdldC5CQzFfUkdCLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVGb3JtYXQ6IEtUWDIuRW5naW5lRm9ybWF0LkNPTVBSRVNTRURfUkdCX1MzVENfRFhUMV9FWFQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBubzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcDogXCJwdnJ0Y1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRzUG93ZXJPZlR3bzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxwaGE6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlRm9ybWF0OiBLVFgyLlRyYW5zY29kZVRhcmdldC5QVlJUQzFfNF9SR0JBLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lRm9ybWF0OiBLVFgyLkVuZ2luZUZvcm1hdC5DT01QUkVTU0VEX1JHQkFfUFZSVENfNEJQUFYxX0lNRyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZUZvcm1hdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQuUFZSVEMxXzRfUkdCLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lRm9ybWF0OiBLVFgyLkVuZ2luZUZvcm1hdC5DT01QUkVTU0VEX1JHQl9QVlJUQ180QlBQVjFfSU1HLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlRm9ybWF0OiBLVFgyLlRyYW5zY29kZVRhcmdldC5SR0JBMzIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZUZvcm1hdDogS1RYMi5FbmdpbmVGb3JtYXQuUkdCQThGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kVG9NdWx0aXBsZTQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyYW5zY29kZURlY2lzaW9uVHJlZSB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfSXNMZWFmTm9kZShub2RlOiBLVFgyLklOb2RlIHwgS1RYMi5JTGVhZik6IG5vZGUgaXMgS1RYMi5JTGVhZiB7XHJcbiAgICAgICAgcmV0dXJuIChub2RlIGFzIEtUWDIuSUxlYWYpLmVuZ2luZUZvcm1hdCAhPT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3RleHR1cmVGb3JtYXQ6IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdDtcclxuICAgIHByaXZhdGUgX2hhc0FscGhhOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfaXNQb3dlck9mVHdvOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfY2FwczogS1RYMi5JQ29tcHJlc3NlZEZvcm1hdENhcGFiaWxpdGllcztcclxuICAgIHByaXZhdGUgX29wdGlvbnM6IEtUWDIuSUtUWDJEZWNvZGVyT3B0aW9ucztcclxuICAgIHByaXZhdGUgX3RyYW5zY29kZUZvcm1hdDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfZW5naW5lRm9ybWF0OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9yb3VuZFRvTXVsdGlwbGU0OiBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgdHJhbnNjb2RlRm9ybWF0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFuc2NvZGVGb3JtYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBlbmdpbmVGb3JtYXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZ2luZUZvcm1hdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJvdW5kVG9NdWx0aXBsZTQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdW5kVG9NdWx0aXBsZTQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IodGV4dHVyZUZvcm1hdDogS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0LCBoYXNBbHBoYTogYm9vbGVhbiwgaXNQb3dlck9mVHdvOiBib29sZWFuLCBjYXBzOiBLVFgyLklDb21wcmVzc2VkRm9ybWF0Q2FwYWJpbGl0aWVzLCBvcHRpb25zPzogS1RYMi5JS1RYMkRlY29kZXJPcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5fdGV4dHVyZUZvcm1hdCA9IHRleHR1cmVGb3JtYXQ7XHJcbiAgICAgICAgdGhpcy5faGFzQWxwaGEgPSBoYXNBbHBoYTtcclxuICAgICAgICB0aGlzLl9pc1Bvd2VyT2ZUd28gPSBpc1Bvd2VyT2ZUd287XHJcbiAgICAgICAgdGhpcy5fY2FwcyA9IGNhcHM7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnMgPz8ge307XHJcblxyXG4gICAgICAgIHRoaXMucGFyc2VUcmVlKERlY2lzaW9uVHJlZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBhcnNlVHJlZSh0cmVlOiBLVFgyLklEZWNpc2lvblRyZWUpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5fdGV4dHVyZUZvcm1hdCA9PT0gS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0LlVBU1RDNHg0ID8gdHJlZS5VQVNUQyA6IHRyZWUuRVRDMVM7XHJcbiAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFyc2VOb2RlKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3BhcnNlTm9kZShub2RlOiBLVFgyLklOb2RlIHwgS1RYMi5JTGVhZiB8IHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghbm9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoVHJhbnNjb2RlRGVjaXNpb25UcmVlLl9Jc0xlYWZOb2RlKG5vZGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zY29kZUZvcm1hdCA9IG5vZGUudHJhbnNjb2RlRm9ybWF0O1xyXG4gICAgICAgICAgICB0aGlzLl9lbmdpbmVGb3JtYXQgPSBub2RlLmVuZ2luZUZvcm1hdDtcclxuICAgICAgICAgICAgdGhpcy5fcm91bmRUb011bHRpcGxlNCA9IG5vZGUucm91bmRUb011bHRpcGxlNCA/PyB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBjb25kaXRpb24gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5vZGUuY2FwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbmRpdGlvbiA9IGNvbmRpdGlvbiAmJiAhIXRoaXMuX2NhcHNbbm9kZS5jYXAgYXMga2V5b2YgdHlwZW9mIHRoaXMuX2NhcHNdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChub2RlLm9wdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25kaXRpb24gPSBjb25kaXRpb24gJiYgISF0aGlzLl9vcHRpb25zW25vZGUub3B0aW9uIGFzIGtleW9mIHR5cGVvZiB0aGlzLl9vcHRpb25zXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm9kZS5hbHBoYSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25kaXRpb24gPSBjb25kaXRpb24gJiYgdGhpcy5faGFzQWxwaGEgPT09IG5vZGUuYWxwaGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vZGUubmVlZHNQb3dlck9mVHdvICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbmRpdGlvbiA9IGNvbmRpdGlvbiAmJiB0aGlzLl9pc1Bvd2VyT2ZUd28gPT09IG5vZGUubmVlZHNQb3dlck9mVHdvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChub2RlLnRyYW5zY29kZUZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlLnRyYW5zY29kZUZvcm1hdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb24gPSBjb25kaXRpb24gJiYgbm9kZS50cmFuc2NvZGVGb3JtYXQuaW5kZXhPZih0aGlzLl90cmFuc2NvZGVGb3JtYXQpICE9PSAtMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uID0gY29uZGl0aW9uICYmIG5vZGUudHJhbnNjb2RlRm9ybWF0ID09PSB0aGlzLl90cmFuc2NvZGVGb3JtYXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3BhcnNlTm9kZShjb25kaXRpb24gPyBub2RlLnllcyEgOiBub2RlLm5vISk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cclxuaW1wb3J0IHR5cGUgKiBhcyBLVFgyIGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9rdHgyZGVjb2RlclR5cGVzXCI7XHJcblxyXG5pbXBvcnQgdHlwZSB7IFdBU01NZW1vcnlNYW5hZ2VyIH0gZnJvbSBcIi4vd2FzbU1lbW9yeU1hbmFnZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBLVFgyRmlsZVJlYWRlciwgSUtUWDJfSW1hZ2VEZXNjIH0gZnJvbSBcIi4va3R4MkZpbGVSZWFkZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2NvZGVyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgQ2FuVHJhbnNjb2RlKHNyYzogS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0LCBkc3Q6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LCBpc0luR2FtbWFTcGFjZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIE5hbWUgPSBcIlRyYW5zY29kZXJcIjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBUcmFuc2NvZGVyLk5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRpYWxpemUoKTogdm9pZCB7fVxyXG5cclxuICAgIHB1YmxpYyBuZWVkTWVtb3J5TWFuYWdlcigpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldE1lbW9yeU1hbmFnZXIobWVtb3J5TWdyOiBXQVNNTWVtb3J5TWFuYWdlcik6IHZvaWQge31cclxuXHJcbiAgICBwdWJsaWMgdHJhbnNjb2RlKFxyXG4gICAgICAgIHNyYzogS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0LFxyXG4gICAgICAgIGRzdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQsXHJcbiAgICAgICAgbGV2ZWw6IG51bWJlcixcclxuICAgICAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgICAgIGhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgIHVuY29tcHJlc3NlZEJ5dGVMZW5ndGg6IG51bWJlcixcclxuICAgICAgICBrdHgyUmVhZGVyOiBLVFgyRmlsZVJlYWRlcixcclxuICAgICAgICBpbWFnZURlc2M6IElLVFgyX0ltYWdlRGVzYyB8IG51bGwsXHJcbiAgICAgICAgZW5jb2RlZERhdGE6IFVpbnQ4QXJyYXlcclxuICAgICk6IFByb21pc2U8VWludDhBcnJheSB8IG51bGw+IHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIEtUWDIgZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2t0eDJkZWNvZGVyVHlwZXNcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgVHJhbnNjb2RlciB9IGZyb20gXCIuL3RyYW5zY29kZXJcIjtcclxuaW1wb3J0IHsgV0FTTU1lbW9yeU1hbmFnZXIgfSBmcm9tIFwiLi93YXNtTWVtb3J5TWFuYWdlclwiO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRyYW5zY29kZXJNYW5hZ2VyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgX1RyYW5zY29kZXJzOiBBcnJheTx0eXBlb2YgVHJhbnNjb2Rlcj4gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFJlZ2lzdGVyVHJhbnNjb2Rlcih0cmFuc2NvZGVyOiB0eXBlb2YgVHJhbnNjb2Rlcikge1xyXG4gICAgICAgIFRyYW5zY29kZXJNYW5hZ2VyLl9UcmFuc2NvZGVycy5wdXNoKHRyYW5zY29kZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9UcmFuc2NvZGVySW5zdGFuY2VzOiB7IFtrZXk6IHN0cmluZ106IEFycmF5PFRyYW5zY29kZXI+IH0gPSB7fTtcclxuXHJcbiAgICBwcml2YXRlIF93YXNtTWVtb3J5TWFuYWdlcjogV0FTTU1lbW9yeU1hbmFnZXI7XHJcblxyXG4gICAgcHVibGljIGZpbmRUcmFuc2NvZGVyKHNyYzogS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0LCBkc3Q6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LCBpc0luR2FtbWFTcGFjZTogYm9vbGVhbiwgYnlwYXNzPzogc3RyaW5nW10pOiBUcmFuc2NvZGVyIHwgbnVsbCB7XHJcbiAgICAgICAgbGV0IHRyYW5zY29kZXI6IFRyYW5zY29kZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAgICAgY29uc3Qga2V5ID0gS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0W3NyY10gKyBcIl9cIiArIEtUWDIuVHJhbnNjb2RlVGFyZ2V0W2RzdF07XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVHJhbnNjb2Rlck1hbmFnZXIuX1RyYW5zY29kZXJzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGlmIChUcmFuc2NvZGVyTWFuYWdlci5fVHJhbnNjb2RlcnNbaV0uQ2FuVHJhbnNjb2RlKHNyYywgZHN0LCBpc0luR2FtbWFTcGFjZSkgJiYgKCFieXBhc3MgfHwgYnlwYXNzLmluZGV4T2YoVHJhbnNjb2Rlck1hbmFnZXIuX1RyYW5zY29kZXJzW2ldLk5hbWUpIDwgMCkpIHtcclxuICAgICAgICAgICAgICAgIHRyYW5zY29kZXIgPSB0aGlzLl9nZXRFeGlzdGluZ1RyYW5zY29kZXIoa2V5LCBUcmFuc2NvZGVyTWFuYWdlci5fVHJhbnNjb2RlcnNbaV0uTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRyYW5zY29kZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2NvZGVyID0gbmV3IFRyYW5zY29kZXJNYW5hZ2VyLl9UcmFuc2NvZGVyc1tpXSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZXIhLmluaXRpYWxpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNjb2RlciEubmVlZE1lbW9yeU1hbmFnZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3dhc21NZW1vcnlNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl93YXNtTWVtb3J5TWFuYWdlciA9IG5ldyBXQVNNTWVtb3J5TWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZXIhLnNldE1lbW9yeU1hbmFnZXIodGhpcy5fd2FzbU1lbW9yeU1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIVRyYW5zY29kZXJNYW5hZ2VyLl9UcmFuc2NvZGVySW5zdGFuY2VzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVHJhbnNjb2Rlck1hbmFnZXIuX1RyYW5zY29kZXJJbnN0YW5jZXNba2V5XSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBUcmFuc2NvZGVyTWFuYWdlci5fVHJhbnNjb2Rlckluc3RhbmNlc1trZXldLnB1c2godHJhbnNjb2Rlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRyYW5zY29kZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0RXhpc3RpbmdUcmFuc2NvZGVyKGtleTogc3RyaW5nLCB0cmFuc2NvZGVyTmFtZTogc3RyaW5nKTogVHJhbnNjb2RlciB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zY29kZXJzID0gVHJhbnNjb2Rlck1hbmFnZXIuX1RyYW5zY29kZXJJbnN0YW5jZXNba2V5XTtcclxuXHJcbiAgICAgICAgaWYgKHRyYW5zY29kZXJzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgdHJhbnNjb2RlcnMubGVuZ3RoOyArK3QpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zY29kZXIgPSB0cmFuc2NvZGVyc1t0XTtcclxuICAgICAgICAgICAgICAgIGlmICh0cmFuc2NvZGVyTmFtZSA9PT0gdHJhbnNjb2Rlci5nZXROYW1lKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNjb2RlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuIiwiZGVjbGFyZSBmdW5jdGlvbiBwb3N0TWVzc2FnZShtZXNzYWdlOiBhbnksIHRyYW5zZmVyPzogYW55W10pOiB2b2lkO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFdBU01NZW1vcnlNYW5hZ2VyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgTG9hZEJpbmFyaWVzRnJvbUN1cnJlbnRUaHJlYWQgPSB0cnVlO1xyXG4gICAgcHVibGljIHN0YXRpYyBJbml0aWFsTWVtb3J5UGFnZXMgPSAoMSAqIDEwMjQgKiAxMDI0KSA+PiAxNjsgLy8gMSBNYnl0ZXNcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfUmVxdWVzdElkID0gMDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIExvYWRXQVNNKHBhdGg6IHN0cmluZyk6IFByb21pc2U8QXJyYXlCdWZmZXI+IHtcclxuICAgICAgICBpZiAodGhpcy5Mb2FkQmluYXJpZXNGcm9tQ3VycmVudFRocmVhZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmV0Y2gocGF0aClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmZXRjaCB0aGUgd2FzbSBjb21wb25lbnQgZnJvbSBcIiR7cGF0aH1cIjogJHtyZXNwb25zZS5zdGF0dXN9IC0gJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHdhc21CaW5hcnkpID0+IHJlc29sdmUod2FzbUJpbmFyeSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlYXNvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLl9SZXF1ZXN0SWQrKztcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdhc21Mb2FkZWRIYW5kbGVyID0gKG1zZzogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobXNnLmRhdGEuYWN0aW9uID09PSBcIndhc21Mb2FkZWRcIiAmJiBtc2cuZGF0YS5pZCA9PT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHdhc21Mb2FkZWRIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG1zZy5kYXRhLndhc21CaW5hcnkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCB3YXNtTG9hZGVkSGFuZGxlcik7XHJcblxyXG4gICAgICAgICAgICBwb3N0TWVzc2FnZSh7IGFjdGlvbjogXCJsb2FkV0FTTVwiLCBwYXRoOiBwYXRoLCBpZDogaWQgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbWVtb3J5OiBXZWJBc3NlbWJseS5NZW1vcnk7XHJcbiAgICBwcml2YXRlIF9udW1QYWdlczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbWVtb3J5VmlldzogVWludDhBcnJheTtcclxuICAgIHByaXZhdGUgX21lbW9yeVZpZXdCeXRlTGVuZ3RoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9tZW1vcnlWaWV3T2Zmc2V0OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaW5pdGlhbE1lbW9yeVBhZ2VzOiBudW1iZXIgPSBXQVNNTWVtb3J5TWFuYWdlci5Jbml0aWFsTWVtb3J5UGFnZXMpIHtcclxuICAgICAgICB0aGlzLl9udW1QYWdlcyA9IGluaXRpYWxNZW1vcnlQYWdlcztcclxuXHJcbiAgICAgICAgdGhpcy5fbWVtb3J5ID0gbmV3IFdlYkFzc2VtYmx5Lk1lbW9yeSh7IGluaXRpYWw6IHRoaXMuX251bVBhZ2VzIH0pO1xyXG4gICAgICAgIHRoaXMuX21lbW9yeVZpZXdCeXRlTGVuZ3RoID0gdGhpcy5fbnVtUGFnZXMgPDwgMTY7XHJcbiAgICAgICAgdGhpcy5fbWVtb3J5Vmlld09mZnNldCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbWVtb3J5VmlldyA9IG5ldyBVaW50OEFycmF5KHRoaXMuX21lbW9yeS5idWZmZXIsIHRoaXMuX21lbW9yeVZpZXdPZmZzZXQsIHRoaXMuX21lbW9yeVZpZXdCeXRlTGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHdhc21NZW1vcnkoKTogV2ViQXNzZW1ibHkuTWVtb3J5IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWVtb3J5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRNZW1vcnlWaWV3KG51bVBhZ2VzOiBudW1iZXIsIG9mZnNldDogbnVtYmVyID0gMCwgYnl0ZUxlbmd0aD86IG51bWJlcik6IFVpbnQ4QXJyYXkge1xyXG4gICAgICAgIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID8/IG51bVBhZ2VzIDw8IDE2O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbnVtUGFnZXMgPCBudW1QYWdlcykge1xyXG4gICAgICAgICAgICB0aGlzLl9tZW1vcnkuZ3JvdyhudW1QYWdlcyAtIHRoaXMuX251bVBhZ2VzKTtcclxuICAgICAgICAgICAgdGhpcy5fbnVtUGFnZXMgPSBudW1QYWdlcztcclxuICAgICAgICAgICAgdGhpcy5fbWVtb3J5VmlldyA9IG5ldyBVaW50OEFycmF5KHRoaXMuX21lbW9yeS5idWZmZXIsIG9mZnNldCwgYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21lbW9yeVZpZXdCeXRlTGVuZ3RoID0gYnl0ZUxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5fbWVtb3J5Vmlld09mZnNldCA9IG9mZnNldDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9tZW1vcnlWaWV3ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fbWVtb3J5LmJ1ZmZlciwgb2Zmc2V0LCBieXRlTGVuZ3RoKTtcclxuICAgICAgICAgICAgdGhpcy5fbWVtb3J5Vmlld0J5dGVMZW5ndGggPSBieXRlTGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLl9tZW1vcnlWaWV3T2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lbW9yeVZpZXc7XHJcbiAgICB9XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXHJcbi8qKlxyXG4gKiBGcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9kb25tY2N1cmR5L3pzdGRkZWMgYnkgRG9uIE1jQ3VyZHlcclxuICovXHJcbmludGVyZmFjZSBEZWNvZGVyRXhwb3J0cyB7XHJcbiAgICBtZW1vcnk6IFVpbnQ4QXJyYXk7XHJcblxyXG4gICAgWlNURF9maW5kRGVjb21wcmVzc2VkU2l6ZTogKGNvbXByZXNzZWRQdHI6IG51bWJlciwgY29tcHJlc3NlZFNpemU6IG51bWJlcikgPT4gbnVtYmVyO1xyXG4gICAgWlNURF9kZWNvbXByZXNzOiAodW5jb21wcmVzc2VkUHRyOiBudW1iZXIsIHVuY29tcHJlc3NlZFNpemU6IG51bWJlciwgY29tcHJlc3NlZFB0cjogbnVtYmVyLCBjb21wcmVzc2VkU2l6ZTogbnVtYmVyKSA9PiBudW1iZXI7XHJcbiAgICBtYWxsb2M6IChwdHI6IG51bWJlcikgPT4gbnVtYmVyO1xyXG4gICAgZnJlZTogKHB0cjogbnVtYmVyKSA9PiB2b2lkO1xyXG59XHJcblxyXG5sZXQgaW5pdDogUHJvbWlzZTx2b2lkPjtcclxubGV0IGluc3RhbmNlOiB7IGV4cG9ydHM6IERlY29kZXJFeHBvcnRzIH07XHJcbmxldCBoZWFwOiBVaW50OEFycmF5O1xyXG5cclxuY29uc3QgSU1QT1JUX09CSkVDVCA9IHtcclxuICAgIGVudjoge1xyXG4gICAgICAgIGVtc2NyaXB0ZW5fbm90aWZ5X21lbW9yeV9ncm93dGg6IGZ1bmN0aW9uICgpOiB2b2lkIHtcclxuICAgICAgICAgICAgaGVhcCA9IG5ldyBVaW50OEFycmF5KGluc3RhbmNlLmV4cG9ydHMubWVtb3J5LmJ1ZmZlcik7XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn07XHJcblxyXG4vKipcclxuICogWlNURCAoWnN0YW5kYXJkKSBkZWNvZGVyLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFpTVEREZWNvZGVyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgV2FzbU1vZHVsZVVSTCA9IFwiaHR0cHM6Ly9wcmV2aWV3LmJhYnlsb25qcy5jb20venN0ZGRlYy53YXNtXCI7XHJcblxyXG4gICAgaW5pdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAoaW5pdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5pdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZmV0Y2ggIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgLy8gV2ViLlxyXG5cclxuICAgICAgICAgICAgaW5pdCA9IGZldGNoKFpTVEREZWNvZGVyLldhc21Nb2R1bGVVUkwpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmFycmF5QnVmZmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZldGNoIHRoZSB3YXNtIGNvbXBvbmVudCBmb3IgdGhlIFpzdGFuZGFyZCBkZWNvbXByZXNzaW9uIGxpYjogJHtyZXNwb25zZS5zdGF0dXN9IC0gJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChhcnJheUJ1ZmZlcikgPT4gV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoYXJyYXlCdWZmZXIsIElNUE9SVF9PQkpFQ1QpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4odGhpcy5faW5pdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gTm9kZS5qcy5cclxuXHJcbiAgICAgICAgICAgIGluaXQgPSBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZyhmZXRjaChaU1RERGVjb2Rlci5XYXNtTW9kdWxlVVJMKSwgSU1QT1JUX09CSkVDVCkudGhlbih0aGlzLl9pbml0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpbml0O1xyXG4gICAgfVxyXG5cclxuICAgIF9pbml0KHJlc3VsdDogV2ViQXNzZW1ibHkuV2ViQXNzZW1ibHlJbnN0YW50aWF0ZWRTb3VyY2UpOiB2b2lkIHtcclxuICAgICAgICBpbnN0YW5jZSA9IHJlc3VsdC5pbnN0YW5jZSBhcyB1bmtub3duIGFzIHsgZXhwb3J0czogRGVjb2RlckV4cG9ydHMgfTtcclxuXHJcbiAgICAgICAgSU1QT1JUX09CSkVDVC5lbnYuZW1zY3JpcHRlbl9ub3RpZnlfbWVtb3J5X2dyb3d0aCgpOyAvLyBpbml0aWFsaXplIGhlYXAuXHJcbiAgICB9XHJcblxyXG4gICAgZGVjb2RlKGFycmF5OiBVaW50OEFycmF5LCB1bmNvbXByZXNzZWRTaXplID0gMCk6IFVpbnQ4QXJyYXkge1xyXG4gICAgICAgIGlmICghaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBaU1RERGVjb2RlcjogQXdhaXQgLmluaXQoKSBiZWZvcmUgZGVjb2RpbmcuYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBXcml0ZSBjb21wcmVzc2VkIGRhdGEgaW50byBXQVNNIG1lbW9yeS5cclxuICAgICAgICBjb25zdCBjb21wcmVzc2VkU2l6ZSA9IGFycmF5LmJ5dGVMZW5ndGg7XHJcbiAgICAgICAgY29uc3QgY29tcHJlc3NlZFB0ciA9IGluc3RhbmNlLmV4cG9ydHMubWFsbG9jKGNvbXByZXNzZWRTaXplKTtcclxuICAgICAgICBoZWFwLnNldChhcnJheSwgY29tcHJlc3NlZFB0cik7XHJcblxyXG4gICAgICAgIC8vIERlY29tcHJlc3MgaW50byBXQVNNIG1lbW9yeS5cclxuICAgICAgICB1bmNvbXByZXNzZWRTaXplID0gdW5jb21wcmVzc2VkU2l6ZSB8fCBOdW1iZXIoaW5zdGFuY2UuZXhwb3J0cy5aU1REX2ZpbmREZWNvbXByZXNzZWRTaXplKGNvbXByZXNzZWRQdHIsIGNvbXByZXNzZWRTaXplKSk7XHJcbiAgICAgICAgY29uc3QgdW5jb21wcmVzc2VkUHRyID0gaW5zdGFuY2UuZXhwb3J0cy5tYWxsb2ModW5jb21wcmVzc2VkU2l6ZSk7XHJcbiAgICAgICAgY29uc3QgYWN0dWFsU2l6ZSA9IGluc3RhbmNlLmV4cG9ydHMuWlNURF9kZWNvbXByZXNzKHVuY29tcHJlc3NlZFB0ciwgdW5jb21wcmVzc2VkU2l6ZSwgY29tcHJlc3NlZFB0ciwgY29tcHJlc3NlZFNpemUpO1xyXG5cclxuICAgICAgICAvLyBSZWFkIGRlY29tcHJlc3NlZCBkYXRhIGFuZCBmcmVlIFdBU00gbWVtb3J5LlxyXG4gICAgICAgIGNvbnN0IGRlYyA9IGhlYXAuc2xpY2UodW5jb21wcmVzc2VkUHRyLCB1bmNvbXByZXNzZWRQdHIgKyBhY3R1YWxTaXplKTtcclxuICAgICAgICBpbnN0YW5jZS5leHBvcnRzLmZyZWUoY29tcHJlc3NlZFB0cik7XHJcbiAgICAgICAgaW5zdGFuY2UuZXhwb3J0cy5mcmVlKHVuY29tcHJlc3NlZFB0cik7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWM7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCU0QgTGljZW5zZVxyXG4gKlxyXG4gKiBGb3IgWnN0YW5kYXJkIHNvZnR3YXJlXHJcbiAqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50LCBZYW5uIENvbGxldCwgRmFjZWJvb2ssIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcclxuICogYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxyXG4gKlxyXG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcclxuICogICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXHJcbiAqXHJcbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcclxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxyXG4gKiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cclxuICpcclxuICogICogTmVpdGhlciB0aGUgbmFtZSBGYWNlYm9vayBub3IgdGhlIG5hbWVzIG9mIGl0cyBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG9cclxuICogICAgZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXQgc3BlY2lmaWNcclxuICogICAgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxyXG4gKlxyXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcclxuICogQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcclxuICogV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxyXG4gKiBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxyXG4gKiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcclxuICogKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xyXG4gKiBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cclxuICogQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcclxuICogKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcclxuICogU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXHJcbiAqL1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMga3R4MmRlY29kZXIgZnJvbSBcImt0eDJkZWNvZGVyL2xlZ2FjeS9sZWdhY3lcIjtcclxuXHJcbmV4cG9ydCB7IGt0eDJkZWNvZGVyIH07XHJcbmV4cG9ydCBkZWZhdWx0IGt0eDJkZWNvZGVyO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=