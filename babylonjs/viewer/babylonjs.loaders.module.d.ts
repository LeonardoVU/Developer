
declare module "babylonjs/index" {
export * from "babylonjs/glTF/index";
export * from "babylonjs/OBJ/index";
export * from "babylonjs/STL/index";
export * from "babylonjs/SPLAT/index";

}
declare module "babylonjs/dynamic" {
/**
 * Registers the async plugin factories for all built-in loaders.
 * Loaders will be dynamically imported on demand, only when a SceneLoader load operation needs each respective loader.
 */
export function registerBuiltInLoaders(): void;

}
declare module "babylonjs/glTF/index" {
export * from "babylonjs/glTF/glTFFileLoader";
export * from "babylonjs/glTF/glTFValidation";
import * as GLTF1 from "babylonjs/glTF/1.0/index";
import * as GLTF2 from "babylonjs/glTF/2.0/index";
export { GLTF1, GLTF2 };

}
declare module "babylonjs/glTF/glTFValidation" {
import * as GLTF2 from "babylonjs-gltf2interface";
/**
 * Configuration for glTF validation
 */
export interface IGLTFValidationConfiguration {
    /**
     * The url of the glTF validator.
     */
    url: string;
}
/**
 * glTF validation
 */
export class GLTFValidation {
    /**
     * The configuration. Defaults to `{ url: "https://cdn.babylonjs.com/gltf_validator.js" }`.
     */
    static Configuration: IGLTFValidationConfiguration;
    private static _LoadScriptPromise;
    /**
     * Validate a glTF asset using the glTF-Validator.
     * @param data The JSON of a glTF or the array buffer of a binary glTF
     * @param rootUrl The root url for the glTF
     * @param fileName The file name for the glTF
     * @param getExternalResource The callback to get external resources for the glTF validator
     * @returns A promise that resolves with the glTF validation results once complete
     */
    static ValidateAsync(data: string | Uint8Array, rootUrl: string, fileName: string, getExternalResource: (uri: string) => Promise<Uint8Array>): Promise<GLTF2.IGLTFValidationResults>;
}

}
declare module "babylonjs/glTF/glTFFileLoader.metadata" {
export const GLTFMagicBase64Encoded = "Z2xURg";
export const GLTFFileLoaderMetadata: {
    readonly name: "gltf";
    readonly extensions: {
        readonly ".gltf": {
            readonly isBinary: false;
            readonly mimeType: "model/gltf+json";
        };
        readonly ".glb": {
            readonly isBinary: true;
            readonly mimeType: "model/gltf-binary";
        };
    };
    readonly canDirectLoad: (data: string) => boolean;
};

}
declare module "babylonjs/glTF/glTFFileLoader" {
import * as GLTF2 from "babylonjs-gltf2interface";
import { Nullable } from "babylonjs/types";
import { Observable } from "babylonjs/Misc/observable";
import { Camera } from "babylonjs/Cameras/camera";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
import { Material } from "babylonjs/Materials/material";
import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
import { ISceneLoaderPluginFactory, ISceneLoaderPluginAsync, ISceneLoaderProgressEvent, ISceneLoaderAsyncResult, SceneLoaderPluginOptions } from "babylonjs/Loading/sceneLoader";
import { AssetContainer } from "babylonjs/assetContainer";
import { Scene, IDisposable } from "babylonjs/scene";
import { WebRequest } from "babylonjs/Misc/webRequest";
import { IFileRequest } from "babylonjs/Misc/fileRequest";
import { IDataBuffer } from "babylonjs/Misc/dataReader";
import { GLTFFileLoaderMetadata } from "babylonjs/glTF/glTFFileLoader.metadata";
import { LoadFileError } from "babylonjs/Misc/fileTools";
import { TransformNode } from "babylonjs/Meshes/transformNode";
/**
 * Defines options for glTF loader extensions. This interface is extended by specific extensions.
 */
export interface GLTFLoaderExtensionOptions extends Record<string, Record<string, unknown> | undefined> {
}
module "babylonjs/Loading/sceneLoader" {
    interface SceneLoaderPluginOptions {
        /**
         * Defines options for the glTF loader.
         */
        [GLTFFileLoaderMetadata.name]: Partial<GLTFLoaderOptions>;
    }
}
/**
 * Mode that determines the coordinate system to use.
 */
export enum GLTFLoaderCoordinateSystemMode {
    /**
     * Automatically convert the glTF right-handed data to the appropriate system based on the current coordinate system mode of the scene.
     */
    AUTO = 0,
    /**
     * Sets the useRightHandedSystem flag on the scene.
     */
    FORCE_RIGHT_HANDED = 1
}
/**
 * Mode that determines what animations will start.
 */
export enum GLTFLoaderAnimationStartMode {
    /**
     * No animation will start.
     */
    NONE = 0,
    /**
     * The first animation will start.
     */
    FIRST = 1,
    /**
     * All animations will start.
     */
    ALL = 2
}
/**
 * Interface that contains the data for the glTF asset.
 */
export interface IGLTFLoaderData {
    /**
     * The object that represents the glTF JSON.
     */
    json: Object;
    /**
     * The BIN chunk of a binary glTF.
     */
    bin: Nullable<IDataBuffer>;
}
/**
 * Interface for extending the loader.
 */
export interface IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines the order of this extension.
     * The loader sorts the extensions using these values when loading.
     */
    order?: number;
}
/**
 * Loader state.
 */
export enum GLTFLoaderState {
    /**
     * The asset is loading.
     */
    LOADING = 0,
    /**
     * The asset is ready for rendering.
     */
    READY = 1,
    /**
     * The asset is completely loaded.
     */
    COMPLETE = 2
}
/** @internal */
export interface IGLTFLoader extends IDisposable {
    importMeshAsync: (meshesNames: string | readonly string[] | null | undefined, scene: Scene, container: Nullable<AssetContainer>, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string) => Promise<ISceneLoaderAsyncResult>;
    loadAsync: (scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string) => Promise<void>;
}
/**
 * Adds default/implicit options to extension specific options.
 */
type DefaultExtensionOptions<BaseExtensionOptions> = {
    /**
     * Defines if the extension is enabled
     */
    enabled?: boolean;
} & BaseExtensionOptions;
abstract class GLTFLoaderOptions {
    protected copyFrom(options?: Partial<Readonly<GLTFLoaderOptions>>): void;
    /**
     * Raised when the asset has been parsed
     */
    abstract onParsed?: ((loaderData: IGLTFLoaderData) => void) | undefined;
    /**
     * The coordinate system mode. Defaults to AUTO.
     */
    coordinateSystemMode: GLTFLoaderCoordinateSystemMode;
    /**
     * The animation start mode. Defaults to FIRST.
     */
    animationStartMode: GLTFLoaderAnimationStartMode;
    /**
     * Defines if the loader should load node animations. Defaults to true.
     * NOTE: The animation of this node will still load if the node is also a joint of a skin and `loadSkins` is true.
     */
    loadNodeAnimations: boolean;
    /**
     * Defines if the loader should load skins. Defaults to true.
     */
    loadSkins: boolean;
    /**
     * Defines if the loader should load morph targets. Defaults to true.
     */
    loadMorphTargets: boolean;
    /**
     * Defines if the loader should compile materials before raising the success callback. Defaults to false.
     */
    compileMaterials: boolean;
    /**
     * Defines if the loader should also compile materials with clip planes. Defaults to false.
     */
    useClipPlane: boolean;
    /**
     * Defines if the loader should compile shadow generators before raising the success callback. Defaults to false.
     */
    compileShadowGenerators: boolean;
    /**
     * Defines if the Alpha blended materials are only applied as coverage.
     * If false, (default) The luminance of each pixel will reduce its opacity to simulate the behaviour of most physical materials.
     * If true, no extra effects are applied to transparent pixels.
     */
    transparencyAsCoverage: boolean;
    /**
     * Defines if the loader should use range requests when load binary glTF files from HTTP.
     * Enabling will disable offline support and glTF validator.
     * Defaults to false.
     */
    useRangeRequests: boolean;
    /**
     * Defines if the loader should create instances when multiple glTF nodes point to the same glTF mesh. Defaults to true.
     */
    createInstances: boolean;
    /**
     * Defines if the loader should always compute the bounding boxes of meshes and not use the min/max values from the position accessor. Defaults to false.
     */
    alwaysComputeBoundingBox: boolean;
    /**
     * If true, load all materials defined in the file, even if not used by any mesh. Defaults to false.
     */
    loadAllMaterials: boolean;
    /**
     * If true, load only the materials defined in the file. Defaults to false.
     */
    loadOnlyMaterials: boolean;
    /**
     * If true, do not load any materials defined in the file. Defaults to false.
     */
    skipMaterials: boolean;
    /**
     * If true, load the color (gamma encoded) textures into sRGB buffers (if supported by the GPU), which will yield more accurate results when sampling the texture. Defaults to true.
     */
    useSRGBBuffers: boolean;
    /**
     * When loading glTF animations, which are defined in seconds, target them to this FPS. Defaults to 60.
     */
    targetFps: number;
    /**
     * Defines if the loader should always compute the nearest common ancestor of the skeleton joints instead of using `skin.skeleton`. Defaults to false.
     * Set this to true if loading assets with invalid `skin.skeleton` values.
     */
    alwaysComputeSkeletonRootNode: boolean;
    /**
     * If true, the loader will derive the name for Babylon textures from the glTF texture name, image name, or image url. Defaults to false.
     * Note that it is possible for multiple Babylon textures to share the same name when the Babylon textures load from the same glTF texture or image.
     */
    useGltfTextureNames: boolean;
    /**
     * Function called before loading a url referenced by the asset.
     * @param url url referenced by the asset
     * @returns Async url to load
     */
    preprocessUrlAsync: (url: string) => Promise<string>;
    /**
     * Defines the node to use as the root of the hierarchy when loading the scene (default: undefined). If not defined, a root node will be automatically created.
     * You can also pass null if you don't want a root node to be created.
     */
    customRootNode?: Nullable<TransformNode>;
    /**
     * Callback raised when the loader creates a mesh after parsing the glTF properties of the mesh.
     * Note that the callback is called as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
     */
    abstract onMeshLoaded?: ((mesh: AbstractMesh) => void) | undefined;
    /**
     * Callback raised when the loader creates a skin after parsing the glTF properties of the skin node.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/importers/glTF/glTFSkinning#ignoring-the-transform-of-the-skinned-mesh
     */
    abstract onSkinLoaded?: ((node: TransformNode, skinnedNode: TransformNode) => void) | undefined;
    /**
     * Callback raised when the loader creates a texture after parsing the glTF properties of the texture.
     */
    abstract onTextureLoaded?: ((texture: BaseTexture) => void) | undefined;
    /**
     * Callback raised when the loader creates a material after parsing the glTF properties of the material.
     */
    abstract onMaterialLoaded?: ((material: Material) => void) | undefined;
    /**
     * Callback raised when the loader creates a camera after parsing the glTF properties of the camera.
     */
    abstract onCameraLoaded?: ((camera: Camera) => void) | undefined;
    /**
     * Defines options for glTF extensions.
     */
    extensionOptions: {
        [Extension in keyof GLTFLoaderExtensionOptions]?: {
            [Option in keyof DefaultExtensionOptions<GLTFLoaderExtensionOptions[Extension]>]: DefaultExtensionOptions<GLTFLoaderExtensionOptions[Extension]>[Option];
        };
    };
}
/**
 * File loader for loading glTF files into a scene.
 */
export class GLTFFileLoader extends GLTFLoaderOptions implements IDisposable, ISceneLoaderPluginAsync, ISceneLoaderPluginFactory {
    /** @internal */
    static _CreateGLTF1Loader: (parent: GLTFFileLoader) => IGLTFLoader;
    /** @internal */
    static _CreateGLTF2Loader: (parent: GLTFFileLoader) => IGLTFLoader;
    /**
     * Creates a new glTF file loader.
     * @param options The options for the loader
     */
    constructor(options?: Partial<Readonly<GLTFLoaderOptions>>);
    /**
     * Raised when the asset has been parsed
     */
    onParsedObservable: Observable<IGLTFLoaderData>;
    private _onParsedObserver;
    /**
     * Raised when the asset has been parsed
     */
    set onParsed(callback: ((loaderData: IGLTFLoaderData) => void) | undefined);
    /**
     * Set this property to false to disable incremental loading which delays the loader from calling the success callback until after loading the meshes and shaders.
     * Textures always loads asynchronously. For example, the success callback can compute the bounding information of the loaded meshes when incremental loading is disabled.
     * Defaults to true.
     * @internal
     */
    static IncrementalLoading: boolean;
    /**
     * Set this property to true in order to work with homogeneous coordinates, available with some converters and exporters.
     * Defaults to false. See https://en.wikipedia.org/wiki/Homogeneous_coordinates.
     * @internal
     */
    static HomogeneousCoordinates: boolean;
    /**
     * Observable raised when the loader creates a mesh after parsing the glTF properties of the mesh.
     * Note that the observable is raised as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
     */
    readonly onMeshLoadedObservable: Observable<AbstractMesh>;
    private _onMeshLoadedObserver;
    /**
     * Callback raised when the loader creates a mesh after parsing the glTF properties of the mesh.
     * Note that the callback is called as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
     */
    set onMeshLoaded(callback: ((mesh: AbstractMesh) => void) | undefined);
    /**
     * Observable raised when the loader creates a skin after parsing the glTF properties of the skin node.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/importers/glTF/glTFSkinning#ignoring-the-transform-of-the-skinned-mesh
     * @param node - the transform node that corresponds to the original glTF skin node used for animations
     * @param skinnedNode - the transform node that is the skinned mesh itself or the parent of the skinned meshes
     */
    readonly onSkinLoadedObservable: Observable<{
        node: TransformNode;
        skinnedNode: TransformNode;
    }>;
    private _onSkinLoadedObserver;
    /**
     * Callback raised when the loader creates a skin after parsing the glTF properties of the skin node.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/importers/glTF/glTFSkinning#ignoring-the-transform-of-the-skinned-mesh
     */
    set onSkinLoaded(callback: ((node: TransformNode, skinnedNode: TransformNode) => void) | undefined);
    /**
     * Observable raised when the loader creates a texture after parsing the glTF properties of the texture.
     */
    readonly onTextureLoadedObservable: Observable<BaseTexture>;
    private _onTextureLoadedObserver;
    /**
     * Callback raised when the loader creates a texture after parsing the glTF properties of the texture.
     */
    set onTextureLoaded(callback: ((texture: BaseTexture) => void) | undefined);
    /**
     * Observable raised when the loader creates a material after parsing the glTF properties of the material.
     */
    readonly onMaterialLoadedObservable: Observable<Material>;
    private _onMaterialLoadedObserver;
    /**
     * Callback raised when the loader creates a material after parsing the glTF properties of the material.
     */
    set onMaterialLoaded(callback: ((material: Material) => void) | undefined);
    /**
     * Observable raised when the loader creates a camera after parsing the glTF properties of the camera.
     */
    readonly onCameraLoadedObservable: Observable<Camera>;
    private _onCameraLoadedObserver;
    /**
     * Callback raised when the loader creates a camera after parsing the glTF properties of the camera.
     */
    set onCameraLoaded(callback: ((camera: Camera) => void) | undefined);
    /**
     * Observable raised when the asset is completely loaded, immediately before the loader is disposed.
     * For assets with LODs, raised when all of the LODs are complete.
     * For assets without LODs, raised when the model is complete, immediately after the loader resolves the returned promise.
     */
    readonly onCompleteObservable: Observable<void>;
    private _onCompleteObserver;
    /**
     * Callback raised when the asset is completely loaded, immediately before the loader is disposed.
     * For assets with LODs, raised when all of the LODs are complete.
     * For assets without LODs, raised when the model is complete, immediately after the loader resolves the returned promise.
     */
    set onComplete(callback: () => void);
    /**
     * Observable raised when an error occurs.
     */
    readonly onErrorObservable: Observable<any>;
    private _onErrorObserver;
    /**
     * Callback raised when an error occurs.
     */
    set onError(callback: (reason: any) => void);
    /**
     * Observable raised after the loader is disposed.
     */
    readonly onDisposeObservable: Observable<void>;
    private _onDisposeObserver;
    /**
     * Callback raised after the loader is disposed.
     */
    set onDispose(callback: () => void);
    /**
     * Observable raised after a loader extension is created.
     * Set additional options for a loader extension in this event.
     */
    readonly onExtensionLoadedObservable: Observable<IGLTFLoaderExtension>;
    private _onExtensionLoadedObserver;
    /**
     * Callback raised after a loader extension is created.
     */
    set onExtensionLoaded(callback: (extension: IGLTFLoaderExtension) => void);
    /**
     * Defines if the loader logging is enabled.
     */
    get loggingEnabled(): boolean;
    set loggingEnabled(value: boolean);
    /**
     * Defines if the loader should capture performance counters.
     */
    get capturePerformanceCounters(): boolean;
    set capturePerformanceCounters(value: boolean);
    /**
     * Defines if the loader should validate the asset.
     */
    validate: boolean;
    /**
     * Observable raised after validation when validate is set to true. The event data is the result of the validation.
     */
    readonly onValidatedObservable: Observable<GLTF2.IGLTFValidationResults>;
    private _onValidatedObserver;
    /**
     * Callback raised after a loader extension is created.
     */
    set onValidated(callback: (results: GLTF2.IGLTFValidationResults) => void);
    private _loader;
    private _state;
    private _progressCallback?;
    private _requests;
    /**
     * Name of the loader ("gltf")
     */
    readonly name: "gltf";
    /** @internal */
    readonly extensions: {
        readonly ".gltf": {
            readonly isBinary: false;
            readonly mimeType: "model/gltf+json";
        };
        readonly ".glb": {
            readonly isBinary: true;
            readonly mimeType: "model/gltf-binary";
        };
    };
    /**
     * Disposes the loader, releases resources during load, and cancels any outstanding requests.
     */
    dispose(): void;
    /**
     * @internal
     */
    loadFile(scene: Scene, fileOrUrl: File | string | ArrayBufferView, rootUrl: string, onSuccess: (data: unknown, responseURL?: string) => void, onProgress?: (ev: ISceneLoaderProgressEvent) => void, useArrayBuffer?: boolean, onError?: (request?: WebRequest, exception?: LoadFileError) => void, name?: string): Nullable<IFileRequest>;
    private _loadBinary;
    /**
     * @internal
     */
    importMeshAsync(meshesNames: string | readonly string[] | null | undefined, scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<ISceneLoaderAsyncResult>;
    /**
     * @internal
     */
    loadAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<void>;
    /**
     * @internal
     */
    loadAssetContainerAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<AssetContainer>;
    /**
     * @internal
     */
    canDirectLoad(data: string): boolean;
    /**
     * @internal
     */
    directLoad(scene: Scene, data: string): Promise<Object>;
    /**
     * The callback that allows custom handling of the root url based on the response url.
     * @param rootUrl the original root url
     * @param responseURL the response url if available
     * @returns the new root url
     */
    rewriteRootURL?(rootUrl: string, responseURL?: string): string;
    /** @internal */
    createPlugin(options: SceneLoaderPluginOptions): ISceneLoaderPluginAsync;
    /**
     * The loader state or null if the loader is not active.
     */
    get loaderState(): Nullable<GLTFLoaderState>;
    /**
     * Observable raised when the loader state changes.
     */
    onLoaderStateChangedObservable: Observable<Nullable<GLTFLoaderState>>;
    /**
     * Returns a promise that resolves when the asset is completely loaded.
     * @returns a promise that resolves when the asset is completely loaded.
     */
    whenCompleteAsync(): Promise<void>;
    /**
     * @internal
     */
    _setState(state: GLTFLoaderState): void;
    /**
     * @internal
     */
    _loadFile(scene: Scene, fileOrUrl: File | string, onSuccess: (data: string | ArrayBuffer) => void, useArrayBuffer?: boolean, onError?: (request?: WebRequest) => void, onOpened?: (request: WebRequest) => void): IFileRequest;
    private _onProgress;
    private _validate;
    private _getLoader;
    private _parseJson;
    private _unpackBinaryAsync;
    private _unpackBinaryV1Async;
    private _unpackBinaryV2Async;
    private static _parseVersion;
    private static _compareVersion;
    private static readonly _logSpaces;
    private _logIndentLevel;
    private _loggingEnabled;
    /** @internal */
    _log: (message: string) => void;
    /**
     * @internal
     */
    _logOpen(message: string): void;
    /** @internal */
    _logClose(): void;
    private _logEnabled;
    private _logDisabled;
    private _capturePerformanceCounters;
    /** @internal */
    _startPerformanceCounter: (counterName: string) => void;
    /** @internal */
    _endPerformanceCounter: (counterName: string) => void;
    private _startPerformanceCounterEnabled;
    private _startPerformanceCounterDisabled;
    private _endPerformanceCounterEnabled;
    private _endPerformanceCounterDisabled;
}
export {};

}
declare module "babylonjs/glTF/2.0/index" {
export * from "babylonjs/glTF/2.0/glTFLoader";
export * from "babylonjs/glTF/2.0/glTFLoaderExtension";
export * from "babylonjs/glTF/2.0/glTFLoaderExtensionRegistry";
export * from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
export * from "babylonjs/glTF/2.0/Extensions/index";

}
declare module "babylonjs/glTF/2.0/glTFLoaderInterfaces" {
import { AnimationGroup } from "babylonjs/Animations/animationGroup";
import { Skeleton } from "babylonjs/Bones/skeleton";
import { Material } from "babylonjs/Materials/material";
import { TransformNode } from "babylonjs/Meshes/transformNode";
import { Buffer, VertexBuffer } from "babylonjs/Buffers/buffer";
import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
import { Mesh } from "babylonjs/Meshes/mesh";
import { Camera } from "babylonjs/Cameras/camera";
import { Light } from "babylonjs/Lights/light";
import * as GLTF2 from "babylonjs-gltf2interface";
/**
 * Loader interface with an index field.
 */
export interface IArrayItem {
    /**
     * The index of this item in the array.
     */
    index: number;
}
/**
 * Loader interface with additional members.
 */
export interface IAccessor extends GLTF2.IAccessor, IArrayItem {
    /** @internal */
    _data?: Promise<ArrayBufferView>;
    /** @internal */
    _babylonVertexBuffer?: {
        [kind: string]: Promise<VertexBuffer>;
    };
}
/**
 * Loader interface with additional members.
 */
export interface IAnimationChannel extends GLTF2.IAnimationChannel, IArrayItem {
}
/** @internal */
export interface _IAnimationSamplerData {
    /** @internal */
    input: Float32Array;
    /** @internal */
    interpolation: GLTF2.AnimationSamplerInterpolation;
    /** @internal */
    output: Float32Array;
}
/**
 * Loader interface with additional members.
 */
export interface IAnimationSampler extends GLTF2.IAnimationSampler, IArrayItem {
    /** @internal */
    _data?: Promise<_IAnimationSamplerData>;
}
/**
 * Loader interface with additional members.
 */
export interface IAnimation extends GLTF2.IAnimation, IArrayItem {
    /** @internal */
    channels: IAnimationChannel[];
    /** @internal */
    samplers: IAnimationSampler[];
    /** @internal */
    _babylonAnimationGroup?: AnimationGroup;
}
/**
 * Loader interface with additional members.
 */
export interface IBuffer extends GLTF2.IBuffer, IArrayItem {
    /** @internal */
    _data?: Promise<ArrayBufferView>;
}
/**
 * Loader interface with additional members.
 */
export interface IBufferView extends GLTF2.IBufferView, IArrayItem {
    /** @internal */
    _data?: Promise<ArrayBufferView>;
    /** @internal */
    _babylonBuffer?: Promise<Buffer>;
}
/**
 * Loader interface with additional members.
 */
export interface ICamera extends GLTF2.ICamera, IArrayItem {
    /** @internal */
    _babylonCamera?: Camera;
}
/**
 * Loader interface with additional members.
 */
export interface IImage extends GLTF2.IImage, IArrayItem {
    /** @internal */
    _data?: Promise<ArrayBufferView>;
}
/**
 * Loader interface with additional members.
 */
export interface IMaterialNormalTextureInfo extends GLTF2.IMaterialNormalTextureInfo, ITextureInfo {
}
/**
 * Loader interface with additional members.
 */
export interface IMaterialOcclusionTextureInfo extends GLTF2.IMaterialOcclusionTextureInfo, ITextureInfo {
}
/**
 * Loader interface with additional members.
 */
export interface IMaterialPbrMetallicRoughness extends GLTF2.IMaterialPbrMetallicRoughness {
    /** @internal */
    baseColorTexture?: ITextureInfo;
    /** @internal */
    metallicRoughnessTexture?: ITextureInfo;
}
/**
 * Loader interface with additional members.
 */
export interface IMaterial extends GLTF2.IMaterial, IArrayItem {
    /** @internal */
    pbrMetallicRoughness?: IMaterialPbrMetallicRoughness;
    /** @internal */
    normalTexture?: IMaterialNormalTextureInfo;
    /** @internal */
    occlusionTexture?: IMaterialOcclusionTextureInfo;
    /** @internal */
    emissiveTexture?: ITextureInfo;
    /** @internal */
    _data?: {
        [babylonDrawMode: number]: {
            babylonMaterial: Material;
            babylonMeshes: AbstractMesh[];
            promise: Promise<void>;
        };
    };
}
/**
 * Loader interface with additional members.
 */
export interface IMesh extends GLTF2.IMesh, IArrayItem {
    /** @internal */
    primitives: IMeshPrimitive[];
}
/**
 * Loader interface with additional members.
 */
export interface IMeshPrimitive extends GLTF2.IMeshPrimitive, IArrayItem {
    /** @internal */
    _instanceData?: {
        babylonSourceMesh: Mesh;
        promise: Promise<any>;
    };
}
/**
 * Loader interface with additional members.
 */
export interface INode extends GLTF2.INode, IArrayItem {
    /** @internal */
    parent?: INode;
    /** @internal */
    _babylonTransformNode?: TransformNode;
    /** @internal */
    _babylonTransformNodeForSkin?: TransformNode;
    /** @internal */
    _primitiveBabylonMeshes?: AbstractMesh[];
    /** @internal */
    _numMorphTargets?: number;
    /** @internal */
    _isJoint?: boolean;
}
/** @internal */
export interface _ISamplerData {
    /** @internal */
    noMipMaps: boolean;
    /** @internal */
    samplingMode: number;
    /** @internal */
    wrapU: number;
    /** @internal */
    wrapV: number;
}
/**
 * Loader interface with additional members.
 */
export interface ISampler extends GLTF2.ISampler, IArrayItem {
    /** @internal */
    _data?: _ISamplerData;
}
/**
 * Loader interface with additional members.
 */
export interface IScene extends GLTF2.IScene, IArrayItem {
}
/**
 * Loader interface with additional members.
 */
export interface ISkin extends GLTF2.ISkin, IArrayItem {
    /** @internal */
    _data?: {
        babylonSkeleton: Skeleton;
        promise: Promise<void>;
    };
}
/**
 * Loader interface with additional members.
 */
export interface ITexture extends GLTF2.ITexture, IArrayItem {
    /** @internal */
    _textureInfo: ITextureInfo;
}
/**
 * Loader interface with additional members.
 */
export interface ITextureInfo extends GLTF2.ITextureInfo {
    /** false or undefined if the texture holds color data (true if data are roughness, normal, ...) */
    nonColorData?: boolean;
}
/**
 * Loader interface with additional members.
 */
export interface IGLTF extends GLTF2.IGLTF {
    /** @internal */
    accessors?: IAccessor[];
    /** @internal */
    animations?: IAnimation[];
    /** @internal */
    buffers?: IBuffer[];
    /** @internal */
    bufferViews?: IBufferView[];
    /** @internal */
    cameras?: ICamera[];
    /** @internal */
    images?: IImage[];
    /** @internal */
    materials?: IMaterial[];
    /** @internal */
    meshes?: IMesh[];
    /** @internal */
    nodes?: INode[];
    /** @internal */
    samplers?: ISampler[];
    /** @internal */
    scenes?: IScene[];
    /** @internal */
    skins?: ISkin[];
    /** @internal */
    textures?: ITexture[];
}
/**
 * Loader interface with additional members.
 */
/** @internal */
export interface IKHRLightsPunctual_Light extends GLTF2.IKHRLightsPunctual_Light, IArrayItem {
    /** @hidden */
    _babylonLight?: Light;
}
/** @internal */
export interface IEXTLightsIES_Light extends GLTF2.IEXTLightsIES_Light, IArrayItem {
    /** @hidden */
    _babylonLight?: Light;
}

}
declare module "babylonjs/glTF/2.0/glTFLoaderExtensionRegistry" {
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
interface IRegisteredGLTFExtension {
    isGLTFExtension: boolean;
    factory: GLTFExtensionFactory;
}
export type GLTFExtensionFactory = (loader: GLTFLoader) => IGLTFLoaderExtension | Promise<IGLTFLoaderExtension>;
/**
 * All currently registered glTF 2.0 loader extensions.
 */
export const registeredGLTFExtensions: ReadonlyMap<string, Readonly<IRegisteredGLTFExtension>>;
/**
 * Registers a loader extension.
 * @param name The name of the loader extension.
 * @param isGLTFExtension If the loader extension is a glTF extension, then it will only be used for glTF files that use the corresponding glTF extension. Otherwise, it will be used for all loaded glTF files.
 * @param factory The factory function that creates the loader extension.
 */
export function registerGLTFExtension(name: string, isGLTFExtension: boolean, factory: GLTFExtensionFactory): void;
/**
 * Unregisters a loader extension.
 * @param name The name of the loader extension.
 * @returns A boolean indicating whether the extension has been unregistered
 */
export function unregisterGLTFExtension(name: string): boolean;
export {};

}
declare module "babylonjs/glTF/2.0/glTFLoaderExtension" {
import { Nullable } from "babylonjs/types";
import { Animation } from "babylonjs/Animations/animation";
import { AnimationGroup } from "babylonjs/Animations/animationGroup";
import { Material } from "babylonjs/Materials/material";
import { Camera } from "babylonjs/Cameras/camera";
import { Geometry } from "babylonjs/Meshes/geometry";
import { TransformNode } from "babylonjs/Meshes/transformNode";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
import { Mesh } from "babylonjs/Meshes/mesh";
import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
import { IDisposable } from "babylonjs/scene";
import { IScene, INode, IMesh, ISkin, ICamera, IMeshPrimitive, IMaterial, ITextureInfo, IAnimation, ITexture, IBufferView, IBuffer, IAnimationChannel } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension as IGLTFBaseLoaderExtension } from "babylonjs/glTF/glTFFileLoader";
import { IProperty } from "babylonjs-gltf2interface";
import { IAnimatable } from "babylonjs/Animations/animatable.interface";
/**
 * Interface for a glTF loader extension.
 */
export interface IGLTFLoaderExtension extends IGLTFBaseLoaderExtension, IDisposable {
    /**
     * Called after the loader state changes to LOADING.
     */
    onLoading?(): void;
    /**
     * Called after the loader state changes to READY.
     */
    onReady?(): void;
    /**
     * Define this method to modify the default behavior when loading scenes.
     * @param context The context when loading the asset
     * @param scene The glTF scene property
     * @returns A promise that resolves when the load is complete or null if not handled
     */
    loadSceneAsync?(context: string, scene: IScene): Nullable<Promise<void>>;
    /**
     * Define this method to modify the default behavior when loading nodes.
     * @param context The context when loading the asset
     * @param node The glTF node property
     * @param assign A function called synchronously after parsing the glTF properties
     * @returns A promise that resolves with the loaded Babylon transform node when the load is complete or null if not handled
     */
    loadNodeAsync?(context: string, node: INode, assign: (babylonMesh: TransformNode) => void): Nullable<Promise<TransformNode>>;
    /**
     * Define this method to modify the default behavior when loading cameras.
     * @param context The context when loading the asset
     * @param camera The glTF camera property
     * @param assign A function called synchronously after parsing the glTF properties
     * @returns A promise that resolves with the loaded Babylon camera when the load is complete or null if not handled
     */
    loadCameraAsync?(context: string, camera: ICamera, assign: (babylonCamera: Camera) => void): Nullable<Promise<Camera>>;
    /**
     * @internal
     * Define this method to modify the default behavior when loading vertex data for mesh primitives.
     * @param context The context when loading the asset
     * @param primitive The glTF mesh primitive property
     * @returns A promise that resolves with the loaded geometry when the load is complete or null if not handled
     */
    _loadVertexDataAsync?(context: string, primitive: IMeshPrimitive, babylonMesh: Mesh): Nullable<Promise<Geometry>>;
    /**
     * @internal
     * Define this method to modify the default behavior when loading data for mesh primitives.
     * @param context The context when loading the asset
     * @param name The mesh name when loading the asset
     * @param node The glTF node when loading the asset
     * @param mesh The glTF mesh when loading the asset
     * @param primitive The glTF mesh primitive property
     * @param assign A function called synchronously after parsing the glTF properties
     * @returns A promise that resolves with the loaded mesh when the load is complete or null if not handled
     */
    _loadMeshPrimitiveAsync?(context: string, name: string, node: INode, mesh: IMesh, primitive: IMeshPrimitive, assign: (babylonMesh: AbstractMesh) => void): Nullable<Promise<AbstractMesh>>;
    /**
     * @internal
     * Define this method to modify the default behavior when loading materials. Load material creates the material and then loads material properties.
     * @param context The context when loading the asset
     * @param material The glTF material property
     * @param assign A function called synchronously after parsing the glTF properties
     * @returns A promise that resolves with the loaded Babylon material when the load is complete or null if not handled
     */
    _loadMaterialAsync?(context: string, material: IMaterial, babylonMesh: Nullable<Mesh>, babylonDrawMode: number, assign: (babylonMaterial: Material) => void): Nullable<Promise<Material>>;
    /**
     * Define this method to modify the default behavior when creating materials.
     * @param context The context when loading the asset
     * @param material The glTF material property
     * @param babylonDrawMode The draw mode for the Babylon material
     * @returns The Babylon material or null if not handled
     */
    createMaterial?(context: string, material: IMaterial, babylonDrawMode: number): Nullable<Material>;
    /**
     * Define this method to modify the default behavior when loading material properties.
     * @param context The context when loading the asset
     * @param material The glTF material property
     * @param babylonMaterial The Babylon material
     * @returns A promise that resolves when the load is complete or null if not handled
     */
    loadMaterialPropertiesAsync?(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    /**
     * Define this method to modify the default behavior when loading texture infos.
     * @param context The context when loading the asset
     * @param textureInfo The glTF texture info property
     * @param assign A function called synchronously after parsing the glTF properties
     * @returns A promise that resolves with the loaded Babylon texture when the load is complete or null if not handled
     */
    loadTextureInfoAsync?(context: string, textureInfo: ITextureInfo, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
    /**
     * @internal
     * Define this method to modify the default behavior when loading textures.
     * @param context The context when loading the asset
     * @param texture The glTF texture property
     * @param assign A function called synchronously after parsing the glTF properties
     * @returns A promise that resolves with the loaded Babylon texture when the load is complete or null if not handled
     */
    _loadTextureAsync?(context: string, texture: ITexture, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
    /**
     * Define this method to modify the default behavior when loading animations.
     * @param context The context when loading the asset
     * @param animation The glTF animation property
     * @returns A promise that resolves with the loaded Babylon animation group when the load is complete or null if not handled
     */
    loadAnimationAsync?(context: string, animation: IAnimation): Nullable<Promise<AnimationGroup>>;
    /**
     * @internal
     * Define this method to modify the default behvaior when loading animation channels.
     * @param context The context when loading the asset
     * @param animationContext The context of the animation when loading the asset
     * @param animation The glTF animation property
     * @param channel The glTF animation channel property
     * @param onLoad Called for each animation loaded
     * @returns A void promise that resolves when the load is complete or null if not handled
     */
    _loadAnimationChannelAsync?(context: string, animationContext: string, animation: IAnimation, channel: IAnimationChannel, onLoad: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): Nullable<Promise<void>>;
    /**
     * @internal
     * Define this method to modify the default behavior when loading skins.
     * @param context The context when loading the asset
     * @param node The glTF node property
     * @param skin The glTF skin property
     * @returns A promise that resolves when the load is complete or null if not handled
     */
    _loadSkinAsync?(context: string, node: INode, skin: ISkin): Nullable<Promise<void>>;
    /**
     * @internal
     * Define this method to modify the default behavior when loading uris.
     * @param context The context when loading the asset
     * @param property The glTF property associated with the uri
     * @param uri The uri to load
     * @returns A promise that resolves with the loaded data when the load is complete or null if not handled
     */
    _loadUriAsync?(context: string, property: IProperty, uri: string): Nullable<Promise<ArrayBufferView>>;
    /**
     * Define this method to modify the default behavior when loading buffer views.
     * @param context The context when loading the asset
     * @param bufferView The glTF buffer view property
     * @returns A promise that resolves with the loaded data when the load is complete or null if not handled
     */
    loadBufferViewAsync?(context: string, bufferView: IBufferView): Nullable<Promise<ArrayBufferView>>;
    /**
     * Define this method to modify the default behavior when loading buffers.
     * @param context The context when loading the asset
     * @param buffer The glTF buffer property
     * @param byteOffset The byte offset to load
     * @param byteLength The byte length to load
     * @returns A promise that resolves with the loaded data when the load is complete or null if not handled
     */
    loadBufferAsync?(context: string, buffer: IBuffer, byteOffset: number, byteLength: number): Nullable<Promise<ArrayBufferView>>;
}

}
declare module "babylonjs/glTF/2.0/glTFLoaderAnimation" {
import { Animation } from "babylonjs/Animations/animation";
import { Quaternion, Vector3 } from "babylonjs/Maths/math.vector";
import { INode } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IAnimatable } from "babylonjs/Animations/animatable.interface";
/** @internal */
export type GetValueFn = (target: any, source: Float32Array, offset: number, scale: number) => any;
/** @internal */
export function getVector3(_target: any, source: Float32Array, offset: number, scale: number): Vector3;
/** @internal */
export function getQuaternion(_target: any, source: Float32Array, offset: number, scale: number): Quaternion;
/** @internal */
export function getWeights(target: INode, source: Float32Array, offset: number, scale: number): Array<number>;
/** @internal */
export abstract class AnimationPropertyInfo {
    readonly type: number;
    readonly name: string;
    readonly getValue: GetValueFn;
    readonly getStride: (target: any) => number;
    /** @internal */
    constructor(type: number, name: string, getValue: GetValueFn, getStride: (target: any) => number);
    protected _buildAnimation(name: string, fps: number, keys: any[]): Animation;
    /** @internal */
    abstract buildAnimations(target: any, name: string, fps: number, keys: any[], callback: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): void;
}
/** @internal */
export class TransformNodeAnimationPropertyInfo extends AnimationPropertyInfo {
    /** @internal */
    buildAnimations(target: INode, name: string, fps: number, keys: any[], callback: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): void;
}
/** @internal */
export class WeightAnimationPropertyInfo extends AnimationPropertyInfo {
    buildAnimations(target: INode, name: string, fps: number, keys: any[], callback: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): void;
}
/** @internal */
export const nodeAnimationData: {
    translation: TransformNodeAnimationPropertyInfo[];
    rotation: TransformNodeAnimationPropertyInfo[];
    scale: TransformNodeAnimationPropertyInfo[];
    weights: WeightAnimationPropertyInfo[];
};

}
declare module "babylonjs/glTF/2.0/glTFLoader" {
import { IndicesArray, Nullable } from "babylonjs/types";
import { Camera } from "babylonjs/Cameras/camera";
import { Animation } from "babylonjs/Animations/animation";
import { IAnimatable } from "babylonjs/Animations/animatable.interface";
import { AnimationGroup } from "babylonjs/Animations/animationGroup";
import { Material } from "babylonjs/Materials/material";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
import { TransformNode } from "babylonjs/Meshes/transformNode";
import { Buffer, VertexBuffer } from "babylonjs/Buffers/buffer";
import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
import { Mesh } from "babylonjs/Meshes/mesh";
import { ISceneLoaderAsyncResult, ISceneLoaderProgressEvent } from "babylonjs/Loading/sceneLoader";
import { Scene } from "babylonjs/scene";
import { IProperty } from "babylonjs-gltf2interface";
import { IGLTF, ISampler, INode, IScene, IMesh, IAccessor, ICamera, IAnimation, IBuffer, IBufferView, IMaterial, ITextureInfo, ITexture, IImage, IMeshPrimitive, IArrayItem, IAnimationChannel } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoader, IGLTFLoaderData } from "babylonjs/glTF/glTFFileLoader";
import { GLTFFileLoader } from "babylonjs/glTF/glTFFileLoader";
import { IDataBuffer } from "babylonjs/Misc/dataReader";
import { Light } from "babylonjs/Lights/light";
import { BoundingInfo } from "babylonjs/Culling/boundingInfo";
import { AssetContainer } from "babylonjs/assetContainer";
import { AnimationPropertyInfo } from "babylonjs/glTF/2.0/glTFLoaderAnimation";
import { IObjectInfo } from "babylonjs/ObjectModel/objectModelInterfaces";
import { GLTFExtensionFactory } from "babylonjs/glTF/2.0/glTFLoaderExtensionRegistry";
export { GLTFFileLoader };
interface IWithMetadata {
    metadata: any;
    _internalMetadata: any;
}
/**
 * Helper class for working with arrays when loading the glTF asset
 */
export class ArrayItem {
    /**
     * Gets an item from the given array.
     * @param context The context when loading the asset
     * @param array The array to get the item from
     * @param index The index to the array
     * @returns The array item
     */
    static Get<T>(context: string, array: ArrayLike<T> | undefined, index: number | undefined): T;
    /**
     * Gets an item from the given array or returns null if not available.
     * @param array The array to get the item from
     * @param index The index to the array
     * @returns The array item or null
     */
    static TryGet<T>(array: ArrayLike<T> | undefined, index: number | undefined): Nullable<T>;
    /**
     * Assign an `index` field to each item of the given array.
     * @param array The array of items
     */
    static Assign(array?: IArrayItem[]): void;
}
/** @internal */
export interface IAnimationTargetInfo {
    /** @internal */
    target: unknown;
    /** @internal */
    properties: Array<AnimationPropertyInfo>;
}
/** @internal */
export function LoadBoundingInfoFromPositionAccessor(accessor: IAccessor): Nullable<BoundingInfo>;
/**
 * The glTF 2.0 loader
 */
export class GLTFLoader implements IGLTFLoader {
    /** @internal */
    readonly _completePromises: Promise<unknown>[];
    /** @internal */
    _assetContainer: Nullable<AssetContainer>;
    /** Storage */
    _babylonLights: Light[];
    /** @internal */
    _disableInstancedMesh: number;
    /** @internal */
    _allMaterialsDirtyRequired: boolean;
    private readonly _parent;
    private readonly _extensions;
    private _disposed;
    private _rootUrl;
    private _fileName;
    private _uniqueRootUrl;
    private _gltf;
    private _bin;
    private _babylonScene;
    private _rootBabylonMesh;
    private _defaultBabylonMaterialData;
    private readonly _postSceneLoadActions;
    /**
     * The default glTF sampler.
     */
    static readonly DefaultSampler: ISampler;
    /**
     * Registers a loader extension.
     * @param name The name of the loader extension.
     * @param factory The factory function that creates the loader extension.
     * @deprecated Please use registerGLTFExtension instead.
     */
    static RegisterExtension(name: string, factory: GLTFExtensionFactory): void;
    /**
     * Unregisters a loader extension.
     * @param name The name of the loader extension.
     * @returns A boolean indicating whether the extension has been unregistered
     * @deprecated Please use unregisterGLTFExtension instead.
     */
    static UnregisterExtension(name: string): boolean;
    /**
     * The object that represents the glTF JSON.
     */
    get gltf(): IGLTF;
    /**
     * The BIN chunk of a binary glTF.
     */
    get bin(): Nullable<IDataBuffer>;
    /**
     * The parent file loader.
     */
    get parent(): GLTFFileLoader;
    /**
     * The Babylon scene when loading the asset.
     */
    get babylonScene(): Scene;
    /**
     * The root Babylon node when loading the asset.
     */
    get rootBabylonMesh(): Nullable<TransformNode>;
    /**
     * The root url when loading the asset.
     */
    get rootUrl(): Nullable<string>;
    /**
     * @internal
     */
    constructor(parent: GLTFFileLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    importMeshAsync(meshesNames: string | readonly string[] | null | undefined, scene: Scene, container: Nullable<AssetContainer>, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<ISceneLoaderAsyncResult>;
    /**
     * @internal
     */
    loadAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<void>;
    private _loadAsync;
    private _loadData;
    private _setupData;
    private _loadExtensionsAsync;
    private _createRootNode;
    /**
     * Loads a glTF scene.
     * @param context The context when loading the asset
     * @param scene The glTF scene property
     * @returns A promise that resolves when the load is complete
     */
    loadSceneAsync(context: string, scene: IScene): Promise<void>;
    private _forEachPrimitive;
    private _getGeometries;
    private _getMeshes;
    private _getTransformNodes;
    private _getSkeletons;
    private _getAnimationGroups;
    private _startAnimations;
    /**
     * Loads a glTF node.
     * @param context The context when loading the asset
     * @param node The glTF node property
     * @param assign A function called synchronously after parsing the glTF properties
     * @returns A promise that resolves with the loaded Babylon mesh when the load is complete
     */
    loadNodeAsync(context: string, node: INode, assign?: (babylonTransformNode: TransformNode) => void): Promise<TransformNode>;
    private _loadMeshAsync;
    /**
     * @internal Define this method to modify the default behavior when loading data for mesh primitives.
     * @param context The context when loading the asset
     * @param name The mesh name when loading the asset
     * @param node The glTF node when loading the asset
     * @param mesh The glTF mesh when loading the asset
     * @param primitive The glTF mesh primitive property
     * @param assign A function called synchronously after parsing the glTF properties
     * @returns A promise that resolves with the loaded mesh when the load is complete or null if not handled
     */
    _loadMeshPrimitiveAsync(context: string, name: string, node: INode, mesh: IMesh, primitive: IMeshPrimitive, assign: (babylonMesh: AbstractMesh) => void): Promise<AbstractMesh>;
    private _loadVertexDataAsync;
    private _createMorphTargets;
    private _loadMorphTargetsAsync;
    private _loadMorphTargetVertexDataAsync;
    private static _LoadTransform;
    private _loadSkinAsync;
    private _loadBones;
    private _findSkeletonRootNode;
    private _loadBone;
    private _loadSkinInverseBindMatricesDataAsync;
    private _updateBoneMatrices;
    private _getNodeMatrix;
    /**
     * Loads a glTF camera.
     * @param context The context when loading the asset
     * @param camera The glTF camera property
     * @param assign A function called synchronously after parsing the glTF properties
     * @returns A promise that resolves with the loaded Babylon camera when the load is complete
     */
    loadCameraAsync(context: string, camera: ICamera, assign?: (babylonCamera: Camera) => void): Promise<Camera>;
    private _loadAnimationsAsync;
    /**
     * Loads a glTF animation.
     * @param context The context when loading the asset
     * @param animation The glTF animation property
     * @returns A promise that resolves with the loaded Babylon animation group when the load is complete
     */
    loadAnimationAsync(context: string, animation: IAnimation): Promise<AnimationGroup>;
    /**
     * @hidden
     * Loads a glTF animation channel.
     * @param context The context when loading the asset
     * @param animationContext The context of the animation when loading the asset
     * @param animation The glTF animation property
     * @param channel The glTF animation channel property
     * @param onLoad Called for each animation loaded
     * @returns A void promise that resolves when the load is complete
     */
    _loadAnimationChannelAsync(context: string, animationContext: string, animation: IAnimation, channel: IAnimationChannel, onLoad: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): Promise<void>;
    /**
     * @hidden
     * Loads a glTF animation channel.
     * @param context The context when loading the asset
     * @param animationContext The context of the animation when loading the asset
     * @param animation The glTF animation property
     * @param channel The glTF animation channel property
     * @param targetInfo The glTF target and properties
     * @param onLoad Called for each animation loaded
     * @returns A void promise that resolves when the load is complete
     */
    _loadAnimationChannelFromTargetInfoAsync(context: string, animationContext: string, animation: IAnimation, channel: IAnimationChannel, targetInfo: IObjectInfo<AnimationPropertyInfo[]>, onLoad: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): Promise<void>;
    private _loadAnimationSamplerAsync;
    /**
     * Loads a glTF buffer.
     * @param context The context when loading the asset
     * @param buffer The glTF buffer property
     * @param byteOffset The byte offset to use
     * @param byteLength The byte length to use
     * @returns A promise that resolves with the loaded data when the load is complete
     */
    loadBufferAsync(context: string, buffer: IBuffer, byteOffset: number, byteLength: number): Promise<ArrayBufferView>;
    /**
     * Loads a glTF buffer view.
     * @param context The context when loading the asset
     * @param bufferView The glTF buffer view property
     * @returns A promise that resolves with the loaded data when the load is complete
     */
    loadBufferViewAsync(context: string, bufferView: IBufferView): Promise<ArrayBufferView>;
    private _loadAccessorAsync;
    /**
     * @internal
     */
    _loadFloatAccessorAsync(context: string, accessor: IAccessor): Promise<Float32Array>;
    /**
     * @internal
     */
    _loadIndicesAccessorAsync(context: string, accessor: IAccessor): Promise<IndicesArray>;
    /**
     * @internal
     */
    _loadVertexBufferViewAsync(bufferView: IBufferView): Promise<Buffer>;
    /**
     * @internal
     */
    _loadVertexAccessorAsync(context: string, accessor: IAccessor, kind: string): Promise<VertexBuffer>;
    private _loadMaterialMetallicRoughnessPropertiesAsync;
    /**
     * @internal
     */
    _loadMaterialAsync(context: string, material: IMaterial, babylonMesh: Nullable<Mesh>, babylonDrawMode: number, assign?: (babylonMaterial: Material) => void): Promise<Material>;
    private _createDefaultMaterial;
    /**
     * Creates a Babylon material from a glTF material.
     * @param context The context when loading the asset
     * @param material The glTF material property
     * @param babylonDrawMode The draw mode for the Babylon material
     * @returns The Babylon material
     */
    createMaterial(context: string, material: IMaterial, babylonDrawMode: number): Material;
    /**
     * Loads properties from a glTF material into a Babylon material.
     * @param context The context when loading the asset
     * @param material The glTF material property
     * @param babylonMaterial The Babylon material
     * @returns A promise that resolves when the load is complete
     */
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Promise<void>;
    /**
     * Loads the normal, occlusion, and emissive properties from a glTF material into a Babylon material.
     * @param context The context when loading the asset
     * @param material The glTF material property
     * @param babylonMaterial The Babylon material
     * @returns A promise that resolves when the load is complete
     */
    loadMaterialBasePropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Promise<void>;
    /**
     * Loads the alpha properties from a glTF material into a Babylon material.
     * Must be called after the setting the albedo texture of the Babylon material when the material has an albedo texture.
     * @param context The context when loading the asset
     * @param material The glTF material property
     * @param babylonMaterial The Babylon material
     */
    loadMaterialAlphaProperties(context: string, material: IMaterial, babylonMaterial: Material): void;
    /**
     * Loads a glTF texture info.
     * @param context The context when loading the asset
     * @param textureInfo The glTF texture info property
     * @param assign A function called synchronously after parsing the glTF properties
     * @returns A promise that resolves with the loaded Babylon texture when the load is complete
     */
    loadTextureInfoAsync(context: string, textureInfo: ITextureInfo, assign?: (babylonTexture: BaseTexture) => void): Promise<BaseTexture>;
    /**
     * @internal
     */
    _loadTextureAsync(context: string, texture: ITexture, assign?: (babylonTexture: BaseTexture) => void): Promise<BaseTexture>;
    /**
     * @internal
     */
    _createTextureAsync(context: string, sampler: ISampler, image: IImage, assign?: (babylonTexture: BaseTexture) => void, textureLoaderOptions?: unknown, useSRGBBuffer?: boolean): Promise<BaseTexture>;
    private _loadSampler;
    /**
     * Loads a glTF image.
     * @param context The context when loading the asset
     * @param image The glTF image property
     * @returns A promise that resolves with the loaded data when the load is complete
     */
    loadImageAsync(context: string, image: IImage): Promise<ArrayBufferView>;
    /**
     * Loads a glTF uri.
     * @param context The context when loading the asset
     * @param property The glTF property associated with the uri
     * @param uri The base64 or relative uri
     * @returns A promise that resolves with the loaded data when the load is complete
     */
    loadUriAsync(context: string, property: IProperty, uri: string): Promise<ArrayBufferView>;
    /**
     * Adds a JSON pointer to the _internalMetadata of the Babylon object at `<object>._internalMetadata.gltf.pointers`.
     * @param babylonObject the Babylon object with _internalMetadata
     * @param pointer the JSON pointer
     */
    static AddPointerMetadata(babylonObject: IWithMetadata, pointer: string): void;
    private static _GetTextureWrapMode;
    private static _GetTextureSamplingMode;
    private static _GetTypedArrayConstructor;
    private static _GetTypedArray;
    private static _GetNumComponents;
    private static _ValidateUri;
    /**
     * @internal
     */
    static _GetDrawMode(context: string, mode: number | undefined): number;
    private _compileMaterialsAsync;
    private _compileShadowGeneratorsAsync;
    private _forEachExtensions;
    private _applyExtensions;
    private _extensionsOnLoading;
    private _extensionsOnReady;
    private _extensionsLoadSceneAsync;
    private _extensionsLoadNodeAsync;
    private _extensionsLoadCameraAsync;
    private _extensionsLoadVertexDataAsync;
    private _extensionsLoadMeshPrimitiveAsync;
    private _extensionsLoadMaterialAsync;
    private _extensionsCreateMaterial;
    private _extensionsLoadMaterialPropertiesAsync;
    private _extensionsLoadTextureInfoAsync;
    private _extensionsLoadTextureAsync;
    private _extensionsLoadAnimationAsync;
    private _extensionsLoadAnimationChannelAsync;
    private _extensionsLoadSkinAsync;
    private _extensionsLoadUriAsync;
    private _extensionsLoadBufferViewAsync;
    private _extensionsLoadBufferAsync;
    /**
     * Helper method called by a loader extension to load an glTF extension.
     * @param context The context when loading the asset
     * @param property The glTF property to load the extension from
     * @param extensionName The name of the extension to load
     * @param actionAsync The action to run
     * @returns The promise returned by actionAsync or null if the extension does not exist
     */
    static LoadExtensionAsync<TExtension = unknown, TResult = void>(context: string, property: IProperty, extensionName: string, actionAsync: (extensionContext: string, extension: TExtension) => Nullable<Promise<TResult>>): Nullable<Promise<TResult>>;
    /**
     * Helper method called by a loader extension to load a glTF extra.
     * @param context The context when loading the asset
     * @param property The glTF property to load the extra from
     * @param extensionName The name of the extension to load
     * @param actionAsync The action to run
     * @returns The promise returned by actionAsync or null if the extra does not exist
     */
    static LoadExtraAsync<TExtra = unknown, TResult = void>(context: string, property: IProperty, extensionName: string, actionAsync: (extraContext: string, extra: TExtra) => Nullable<Promise<TResult>>): Nullable<Promise<TResult>>;
    /**
     * Checks for presence of an extension.
     * @param name The name of the extension to check
     * @returns A boolean indicating the presence of the given extension name in `extensionsUsed`
     */
    isExtensionUsed(name: string): boolean;
    /**
     * Increments the indentation level and logs a message.
     * @param message The message to log
     */
    logOpen(message: string): void;
    /**
     * Decrements the indentation level.
     */
    logClose(): void;
    /**
     * Logs a message
     * @param message The message to log
     */
    log(message: string): void;
    /**
     * Starts a performance counter.
     * @param counterName The name of the performance counter
     */
    startPerformanceCounter(counterName: string): void;
    /**
     * Ends a performance counter.
     * @param counterName The name of the performance counter
     */
    endPerformanceCounter(counterName: string): void;
}

}
declare module "babylonjs/glTF/2.0/Extensions/interactivityUtils" {
export const gltfToFlowGraphTypeMap: {
    [key: string]: string;
};
export const gltfTypeToBabylonType: any;

}
declare module "babylonjs/glTF/2.0/Extensions/interactivityPathToObjectConverter" {
import { IGLTF } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { GLTFPathToObjectConverter } from "babylonjs/glTF/2.0/Extensions/gltfPathToObjectConverter";
import { IObjectAccessor } from "babylonjs/FlowGraph/typeDefinitions";
/**
 * Class to convert an interactivity pointer path to a smart object
 */
export class InteractivityPathToObjectConverter extends GLTFPathToObjectConverter<IObjectAccessor> {
    constructor(gltf: IGLTF);
}

}
declare module "babylonjs/glTF/2.0/Extensions/interactivityFunctions" {
import { IKHRInteractivity } from "babylonjs-gltf2interface";
import { ISerializedFlowGraph } from "babylonjs/FlowGraph/typeDefinitions";
/**
 * @internal
 * Converts a glTF Interactivity Extension to a serialized flow graph.
 * @param gltf the interactivity data
 * @returns a serialized flow graph
 */
export function convertGLTFToSerializedFlowGraph(gltf: IKHRInteractivity): ISerializedFlowGraph;

}
declare module "babylonjs/glTF/2.0/Extensions/index" {
export * from "babylonjs/glTF/2.0/Extensions/EXT_lights_image_based";
export * from "babylonjs/glTF/2.0/Extensions/EXT_mesh_gpu_instancing";
export * from "babylonjs/glTF/2.0/Extensions/EXT_meshopt_compression";
export * from "babylonjs/glTF/2.0/Extensions/EXT_texture_webp";
export * from "babylonjs/glTF/2.0/Extensions/EXT_texture_avif";
export * from "babylonjs/glTF/2.0/Extensions/EXT_lights_ies";
export * from "babylonjs/glTF/2.0/Extensions/KHR_draco_mesh_compression";
export * from "babylonjs/glTF/2.0/Extensions/KHR_lights_punctual";
export * from "babylonjs/glTF/2.0/Extensions/KHR_materials_pbrSpecularGlossiness";
export * from "babylonjs/glTF/2.0/Extensions/KHR_materials_unlit";
export * from "babylonjs/glTF/2.0/Extensions/KHR_materials_clearcoat";
export * from "babylonjs/glTF/2.0/Extensions/KHR_materials_iridescence";
export * from "babylonjs/glTF/2.0/Extensions/KHR_materials_anisotropy";
export * from "babylonjs/glTF/2.0/Extensions/KHR_materials_emissive_strength";
export * from "babylonjs/glTF/2.0/Extensions/KHR_materials_sheen";
export * from "babylonjs/glTF/2.0/Extensions/KHR_materials_specular";
export * from "babylonjs/glTF/2.0/Extensions/KHR_materials_ior";
export * from "babylonjs/glTF/2.0/Extensions/KHR_materials_variants";
export * from "babylonjs/glTF/2.0/Extensions/KHR_materials_transmission";
export * from "babylonjs/glTF/2.0/Extensions/KHR_materials_diffuse_transmission";
export * from "babylonjs/glTF/2.0/Extensions/KHR_materials_volume";
export * from "babylonjs/glTF/2.0/Extensions/KHR_materials_dispersion";
export * from "babylonjs/glTF/2.0/Extensions/KHR_mesh_quantization";
export * from "babylonjs/glTF/2.0/Extensions/KHR_texture_basisu";
export * from "babylonjs/glTF/2.0/Extensions/KHR_texture_transform";
export * from "babylonjs/glTF/2.0/Extensions/KHR_xmp_json_ld";
export * from "babylonjs/glTF/2.0/Extensions/KHR_animation_pointer";
export * from "babylonjs/glTF/2.0/Extensions/MSFT_audio_emitter";
export * from "babylonjs/glTF/2.0/Extensions/MSFT_lod";
export * from "babylonjs/glTF/2.0/Extensions/MSFT_minecraftMesh";
export * from "babylonjs/glTF/2.0/Extensions/MSFT_sRGBFactors";
export * from "babylonjs/glTF/2.0/Extensions/KHR_interactivity";
export * from "babylonjs/glTF/2.0/Extensions/KHR_node_visibility";
export * from "babylonjs/glTF/2.0/Extensions/ExtrasAsMetadata";

}
declare module "babylonjs/glTF/2.0/Extensions/gltfPathToObjectConverter" {
import { IObjectInfo, IPathToObjectConverter } from "babylonjs/ObjectModel/objectModelInterfaces";
import { IGLTF } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
/**
 * A converter that takes a glTF Object Model JSON Pointer
 * and transforms it into an ObjectAccessorContainer, allowing
 * objects referenced in the glTF to be associated with their
 * respective Babylon.js objects.
 */
export class GLTFPathToObjectConverter<T> implements IPathToObjectConverter<T> {
    private _gltf;
    private _infoTree;
    constructor(_gltf: IGLTF, _infoTree: any);
    /**
     * The pointer string is represented by a [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901).
     * <animationPointer> := /<rootNode>/<assetIndex>/<propertyPath>
     * <rootNode> := "nodes" | "materials" | "meshes" | "cameras" | "extensions"
     * <assetIndex> := <digit> | <name>
     * <propertyPath> := <extensionPath> | <standardPath>
     * <extensionPath> := "extensions"/<name>/<standardPath>
     * <standardPath> := <name> | <name>/<standardPath>
     * <name> := W+
     * <digit> := D+
     *
     * Examples:
     *  - "/nodes/0/rotation"
     *  - "/materials/2/emissiveFactor"
     *  - "/materials/2/pbrMetallicRoughness/baseColorFactor"
     *  - "/materials/2/extensions/KHR_materials_emissive_strength/emissiveStrength"
     *
     * @param path The path to convert
     * @returns The object and info associated with the path
     */
    convert(path: string): IObjectInfo<T>;
}

}
declare module "babylonjs/glTF/2.0/Extensions/dynamic" {
/**
 * Registers the built-in glTF 2.0 extension async factories, which dynamically imports and loads each glTF extension on demand (e.g. only when a glTF model uses the extension).
 */
export function registerBuiltInGLTFExtensions(): void;

}
declare module "babylonjs/glTF/2.0/Extensions/MSFT_sRGBFactors" {
import { Nullable } from "babylonjs/types";
import { Material } from "babylonjs/Materials/material";
import { IMaterial } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the MSFT_sRGBFactors extension.
         */
        ["MSFT_sRGBFactors"]: {};
    }
}
/** @internal */
export class MSFT_sRGBFactors implements IGLTFLoaderExtension {
    /** @internal */
    readonly name: string;
    /** @internal */
    enabled: boolean;
    private _loader;
    /** @internal */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /** @internal */
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
}

}
declare module "babylonjs/glTF/2.0/Extensions/MSFT_minecraftMesh" {
import { Nullable } from "babylonjs/types";
import { Material } from "babylonjs/Materials/material";
import { IMaterial } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the MSFT_minecraftMesh extension.
         */
        ["MSFT_minecraftMesh"]: {};
    }
}
/** @internal */
export class MSFT_minecraftMesh implements IGLTFLoaderExtension {
    /** @internal */
    readonly name: string;
    /** @internal */
    enabled: boolean;
    private _loader;
    /** @internal */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /** @internal */
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
}

}
declare module "babylonjs/glTF/2.0/Extensions/MSFT_lod" {
import { Nullable } from "babylonjs/types";
import { Observable } from "babylonjs/Misc/observable";
import { Material } from "babylonjs/Materials/material";
import { TransformNode } from "babylonjs/Meshes/transformNode";
import { Mesh } from "babylonjs/Meshes/mesh";
import { INode, IMaterial, IBuffer, IScene } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
import { IProperty } from "babylonjs-gltf2interface";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the MSFT_lod extension.
         */
        ["MSFT_lod"]: Partial<{
            /**
             * Maximum number of LODs to load, starting from the lowest LOD.
             */
            maxLODsToLoad: number;
        }>;
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/MSFT_lod/README.md)
 */
export class MSFT_lod implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines a number that determines the order the extensions are applied.
     */
    order: number;
    /**
     * Maximum number of LODs to load, starting from the lowest LOD.
     */
    maxLODsToLoad: number;
    /**
     * Observable raised when all node LODs of one level are loaded.
     * The event data is the index of the loaded LOD starting from zero.
     * Dispose the loader to cancel the loading of the next level of LODs.
     */
    onNodeLODsLoadedObservable: Observable<number>;
    /**
     * Observable raised when all material LODs of one level are loaded.
     * The event data is the index of the loaded LOD starting from zero.
     * Dispose the loader to cancel the loading of the next level of LODs.
     */
    onMaterialLODsLoadedObservable: Observable<number>;
    private _loader;
    private _bufferLODs;
    private _nodeIndexLOD;
    private _nodeSignalLODs;
    private _nodePromiseLODs;
    private _nodeBufferLODs;
    private _materialIndexLOD;
    private _materialSignalLODs;
    private _materialPromiseLODs;
    private _materialBufferLODs;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /** @internal */
    onReady(): void;
    /**
     * @internal
     */
    loadSceneAsync(context: string, scene: IScene): Nullable<Promise<void>>;
    /**
     * @internal
     */
    loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
    /**
     * @internal
     */
    _loadMaterialAsync(context: string, material: IMaterial, babylonMesh: Nullable<Mesh>, babylonDrawMode: number, assign: (babylonMaterial: Material) => void): Nullable<Promise<Material>>;
    /**
     * @internal
     */
    _loadUriAsync(context: string, property: IProperty, uri: string): Nullable<Promise<ArrayBufferView>>;
    /**
     * @internal
     */
    loadBufferAsync(context: string, buffer: IBuffer, byteOffset: number, byteLength: number): Nullable<Promise<ArrayBufferView>>;
    private _loadBufferLOD;
    /**
     * @returns an array of LOD properties from lowest to highest.
     * @param context
     * @param property
     * @param array
     * @param ids
     */
    private _getLODs;
    private _disposeTransformNode;
    private _disposeMaterials;
}

}
declare module "babylonjs/glTF/2.0/Extensions/MSFT_audio_emitter" {
import { Nullable } from "babylonjs/types";
import { AnimationGroup } from "babylonjs/Animations/animationGroup";
import { TransformNode } from "babylonjs/Meshes/transformNode";
import { IScene, INode, IAnimation } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
import "babylonjs/Audio/audioSceneComponent";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the MSFT_audio_emitter extension.
         */
        ["MSFT_audio_emitter"]: {};
    }
}
/**
 * [Specification](https://github.com/najadojo/glTF/blob/MSFT_audio_emitter/extensions/2.0/Vendor/MSFT_audio_emitter/README.md)
 * !!! Experimental Extension Subject to Changes !!!
 */
export class MSFT_audio_emitter implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _loader;
    private _clips;
    private _emitters;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /** @internal */
    onLoading(): void;
    /**
     * @internal
     */
    loadSceneAsync(context: string, scene: IScene): Nullable<Promise<void>>;
    /**
     * @internal
     */
    loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
    /**
     * @internal
     */
    loadAnimationAsync(context: string, animation: IAnimation): Nullable<Promise<AnimationGroup>>;
    private _loadClipAsync;
    private _loadEmitterAsync;
    private _getEventAction;
    private _loadAnimationEventAsync;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_xmp_json_ld" {
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_xmp_json_ld extension.
         */
        ["KHR_xmp_json_ld"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_xmp_json_ld/README.md)
 * @since 5.0.0
 */
export class KHR_xmp_json_ld implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines a number that determines the order the extensions are applied.
     */
    order: number;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * Called after the loader state changes to LOADING.
     */
    onLoading(): void;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_texture_transform" {
import { Nullable } from "babylonjs/types";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
import { ITextureInfo } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_texture_transform extension.
         */
        ["KHR_texture_transform"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_texture_transform/README.md)
 */
export class KHR_texture_transform implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadTextureInfoAsync(context: string, textureInfo: ITextureInfo, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_texture_basisu" {
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
import { ITexture } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
import { Nullable } from "babylonjs/types";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_texture_basisu extension.
         */
        ["KHR_texture_basisu"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_texture_basisu/README.md)
 */
export class KHR_texture_basisu implements IGLTFLoaderExtension {
    /** The name of this extension. */
    readonly name: string;
    /** Defines whether this extension is enabled. */
    enabled: boolean;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    _loadTextureAsync(context: string, texture: ITexture, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_node_visibility" {
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_node_visibility extension.
         */
        ["KHR_node_visibility"]: {};
    }
}
/**
 * Loader extension for KHR_node_visibility
 */
export class KHR_node_visibility implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    onReady(): Promise<void>;
    dispose(): void;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_node_hoverability" {
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_node_hoverability extension.
         */
        ["KHR_node_hoverability"]: {};
    }
}
/**
 * Loader extension for KHR_node_hoverability
 * @see https://github.com/KhronosGroup/glTF/pull/2426
 */
export class KHR_node_hoverability implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    onReady(): Promise<void>;
    dispose(): void;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_mesh_quantization" {
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_mesh_quantization extension.
         */
        ["KHR_mesh_quantization"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_mesh_quantization/README.md)
 */
export class KHR_mesh_quantization implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_materials_volume" {
import { Nullable } from "babylonjs/types";
import { Material } from "babylonjs/Materials/material";
import { IMaterial } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_volume extension.
         */
        ["KHR_materials_volume"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md)
 * @since 5.0.0
 */
export class KHR_materials_volume implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines a number that determines the order the extensions are applied.
     */
    order: number;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    private _loadVolumePropertiesAsync;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_materials_variants" {
import { Nullable } from "babylonjs/types";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
import { INode, IMeshPrimitive, IMesh } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { TransformNode } from "babylonjs/Meshes/transformNode";
import { MaterialVariantsController } from "babylonjs/glTF/glTFFileLoader";
export { MaterialVariantsController };
module "babylonjs/glTF/glTFFileLoader" {
    type MaterialVariantsController = {
        /**
         * The list of available variant names for this asset.
         */
        readonly variants: readonly string[];
        /**
         * Gets or sets the selected variant.
         */
        selectedVariant: string;
    };
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_variants extension.
         */
        ["KHR_materials_variants"]: Partial<{
            /**
             * Defines a callback that will be called if material variants are loaded.
             * @experimental
             */
            onLoaded: (controller: MaterialVariantsController) => void;
        }>;
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_variants/README.md)
 */
export class KHR_materials_variants implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _loader;
    private _variants?;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * Gets the list of available variant names for this asset.
     * @param rootNode The glTF root node
     * @returns the list of all the variant names for this model
     */
    static GetAvailableVariants(rootNode: TransformNode): string[];
    /**
     * Gets the list of available variant names for this asset.
     * @param rootNode The glTF root node
     * @returns the list of all the variant names for this model
     */
    getAvailableVariants(rootNode: TransformNode): string[];
    /**
     * Select a variant given a variant name or a list of variant names.
     * @param rootNode The glTF root node
     * @param variantName The variant name(s) to select.
     */
    static SelectVariant(rootNode: TransformNode, variantName: string | string[]): void;
    /**
     * Select a variant given a variant name or a list of variant names.
     * @param rootNode The glTF root node
     * @param variantName The variant name(s) to select.
     */
    selectVariant(rootNode: TransformNode, variantName: string | string[]): void;
    /**
     * Reset back to the original before selecting a variant.
     * @param rootNode The glTF root node
     */
    static Reset(rootNode: TransformNode): void;
    /**
     * Reset back to the original before selecting a variant.
     * @param rootNode The glTF root node
     */
    reset(rootNode: TransformNode): void;
    /**
     * Gets the last selected variant name(s) or null if original.
     * @param rootNode The glTF root node
     * @returns The selected variant name(s).
     */
    static GetLastSelectedVariant(rootNode: TransformNode): Nullable<string | string[]>;
    /**
     * Gets the last selected variant name(s) or null if original.
     * @param rootNode The glTF root node
     * @returns The selected variant name(s).
     */
    getLastSelectedVariant(rootNode: TransformNode): Nullable<string | string[]>;
    private static _GetExtensionMetadata;
    /** @internal */
    onLoading(): void;
    /** @internal */
    onReady(): void;
    /**
     * @internal
     */
    _loadMeshPrimitiveAsync(context: string, name: string, node: INode, mesh: IMesh, primitive: IMeshPrimitive, assign: (babylonMesh: AbstractMesh) => void): Nullable<Promise<AbstractMesh>>;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_materials_unlit" {
import { Nullable } from "babylonjs/types";
import { Material } from "babylonjs/Materials/material";
import { IMaterial } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_unlit extension.
         */
        ["KHR_materials_unlit"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_unlit/README.md)
 */
export class KHR_materials_unlit implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines a number that determines the order the extensions are applied.
     */
    order: number;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    private _loadUnlitPropertiesAsync;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_materials_transmission" {
import { Nullable } from "babylonjs/types";
import { Material } from "babylonjs/Materials/material";
import { IMaterial } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_transmission extension.
         */
        ["KHR_materials_transmission"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_transmission/README.md)
 */
export class KHR_materials_transmission implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines a number that determines the order the extensions are applied.
     */
    order: number;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    private _loadTransparentPropertiesAsync;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_materials_specular" {
import { Nullable } from "babylonjs/types";
import { Material } from "babylonjs/Materials/material";
import { IMaterial } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_specular extension.
         */
        ["KHR_materials_specular"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_specular/README.md)
 */
export class KHR_materials_specular implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines a number that determines the order the extensions are applied.
     */
    order: number;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    private _loadSpecularPropertiesAsync;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_materials_sheen" {
import { Nullable } from "babylonjs/types";
import { Material } from "babylonjs/Materials/material";
import { IMaterial } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_sheen extension.
         */
        ["KHR_materials_sheen"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_sheen/README.md)
 * [Playground Sample](https://www.babylonjs-playground.com/frame.html#BNIZX6#4)
 */
export class KHR_materials_sheen implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines a number that determines the order the extensions are applied.
     */
    order: number;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    private _loadSheenPropertiesAsync;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_materials_pbrSpecularGlossiness" {
import { Nullable } from "babylonjs/types";
import { Material } from "babylonjs/Materials/material";
import { IMaterial } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_pbrSpecularGlossiness extension.
         */
        ["KHR_materials_pbrSpecularGlossiness"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Archived/KHR_materials_pbrSpecularGlossiness/README.md)
 */
export class KHR_materials_pbrSpecularGlossiness implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines a number that determines the order the extensions are applied.
     */
    order: number;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    private _loadSpecularGlossinessPropertiesAsync;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_materials_iridescence" {
import { Nullable } from "babylonjs/types";
import { Material } from "babylonjs/Materials/material";
import { IMaterial } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_iridescence extension.
         */
        ["KHR_materials_iridescence"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_iridescence/README.md)
 */
export class KHR_materials_iridescence implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines a number that determines the order the extensions are applied.
     */
    order: number;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    private _loadIridescencePropertiesAsync;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_materials_ior" {
import { Nullable } from "babylonjs/types";
import { Material } from "babylonjs/Materials/material";
import { IMaterial } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_ior extension.
         */
        ["KHR_materials_ior"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_ior/README.md)
 */
export class KHR_materials_ior implements IGLTFLoaderExtension {
    /**
     * Default ior Value from the spec.
     */
    private static readonly _DEFAULT_IOR;
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines a number that determines the order the extensions are applied.
     */
    order: number;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    private _loadIorPropertiesAsync;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_materials_emissive_strength" {
import { Nullable } from "babylonjs/types";
import { Material } from "babylonjs/Materials/material";
import { IMaterial } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_emissive_strength extension.
         */
        ["KHR_materials_emissive_strength"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_emissive_strength/README.md)
 */
export class KHR_materials_emissive_strength implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines a number that determines the order the extensions are applied.
     */
    order: number;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    private _loadEmissiveProperties;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_materials_dispersion" {
import { Nullable } from "babylonjs/types";
import { Material } from "babylonjs/Materials/material";
import { IMaterial } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_dispersion extension.
         */
        ["KHR_materials_dispersion"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/87bd64a7f5e23c84b6aef2e6082069583ed0ddb4/extensions/2.0/Khronos/KHR_materials_dispersion/README.md)
 * @experimental
 */
export class KHR_materials_dispersion implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines a number that determines the order the extensions are applied.
     */
    order: number;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    private _loadDispersionPropertiesAsync;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_materials_diffuse_transmission" {
import { Nullable } from "babylonjs/types";
import { Material } from "babylonjs/Materials/material";
import { IMaterial } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_diffuse_transmission extension.
         */
        ["KHR_materials_diffuse_transmission"]: {};
    }
}
/**
 * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1825)
 * !!! Experimental Extension Subject to Changes !!!
 */
export class KHR_materials_diffuse_transmission implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines a number that determines the order the extensions are applied.
     */
    order: number;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    private _loadTranslucentPropertiesAsync;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_materials_clearcoat" {
import { Nullable } from "babylonjs/types";
import { Material } from "babylonjs/Materials/material";
import { IMaterial } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_clearcoat extension.
         */
        ["KHR_materials_clearcoat"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_clearcoat/README.md)
 * [Playground Sample](https://www.babylonjs-playground.com/frame.html#7F7PN6#8)
 */
export class KHR_materials_clearcoat implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines a number that determines the order the extensions are applied.
     */
    order: number;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    private _loadClearCoatPropertiesAsync;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_materials_anisotropy" {
import { Nullable } from "babylonjs/types";
import { Material } from "babylonjs/Materials/material";
import { IMaterial } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_anisotropy extension.
         */
        ["KHR_materials_anisotropy"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_anisotropy)
 */
export class KHR_materials_anisotropy implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines a number that determines the order the extensions are applied.
     */
    order: number;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    private _loadIridescencePropertiesAsync;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_lights_punctual" {
import { Nullable } from "babylonjs/types";
import { TransformNode } from "babylonjs/Meshes/transformNode";
import { INode } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_lights_punctual extension.
         */
        ["KHR_lights_punctual"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_lights_punctual/README.md)
 */
export class KHR_lights implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /** hidden */
    private _loader;
    private _lights?;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /** @internal */
    onLoading(): void;
    /**
     * @internal
     */
    loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_interactivity" {
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_interactivity extension.
         */
        ["KHR_interactivity"]: {};
    }
}
/**
 * Loader extension for KHR_interactivity
 */
export class KHR_interactivity implements IGLTFLoaderExtension {
    private _loader;
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _pathConverter?;
    /**
     * @internal
     * @param _loader
     */
    constructor(_loader: GLTFLoader);
    dispose(): void;
    onReady(): void;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_draco_mesh_compression" {
import { DracoDecoder } from "babylonjs/Meshes/Compression/dracoDecoder";
import { Nullable } from "babylonjs/types";
import { Geometry } from "babylonjs/Meshes/geometry";
import { Mesh } from "babylonjs/Meshes/mesh";
import { IMeshPrimitive } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_draco_mesh_compression extension.
         */
        ["KHR_draco_mesh_compression"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_draco_mesh_compression/README.md)
 */
export class KHR_draco_mesh_compression implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * The draco decoder used to decode vertex data or DracoDecoder.Default if not defined
     */
    dracoDecoder?: DracoDecoder;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /**
     * Defines whether to use the normalized flag from the glTF accessor instead of the Draco data. Defaults to true.
     */
    useNormalizedFlagFromAccessor: boolean;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    _loadVertexDataAsync(context: string, primitive: IMeshPrimitive, babylonMesh: Mesh): Nullable<Promise<Geometry>>;
}

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_animation_pointer.data" {
import { Animation } from "babylonjs/Animations/animation";
import { ICamera, IKHRLightsPunctual_Light, IMaterial } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IAnimatable } from "babylonjs/Animations/animatable.interface";
import { AnimationPropertyInfo } from "babylonjs/glTF/2.0/glTFLoaderAnimation";
class CameraAnimationPropertyInfo extends AnimationPropertyInfo {
    /** @internal */
    buildAnimations(target: ICamera, name: string, fps: number, keys: any[], callback: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): void;
}
class MaterialAnimationPropertyInfo extends AnimationPropertyInfo {
    /** @internal */
    buildAnimations(target: IMaterial, name: string, fps: number, keys: any[], callback: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): void;
}
class LightAnimationPropertyInfo extends AnimationPropertyInfo {
    /** @internal */
    buildAnimations(target: IKHRLightsPunctual_Light, name: string, fps: number, keys: any[], callback: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): void;
}
/** @internal */
export const animationPointerTree: {
    nodes: {
        __array__: {
            translation: import("babylonjs/glTF/2.0/glTFLoaderAnimation").TransformNodeAnimationPropertyInfo[];
            rotation: import("babylonjs/glTF/2.0/glTFLoaderAnimation").TransformNodeAnimationPropertyInfo[];
            scale: import("babylonjs/glTF/2.0/glTFLoaderAnimation").TransformNodeAnimationPropertyInfo[];
            weights: import("babylonjs/glTF/2.0/glTFLoaderAnimation").WeightAnimationPropertyInfo[];
            __target__: boolean;
        };
    };
    materials: {
        __array__: {
            __target__: boolean;
            pbrMetallicRoughness: {
                baseColorFactor: MaterialAnimationPropertyInfo[];
                metallicFactor: MaterialAnimationPropertyInfo[];
                roughnessFactor: MaterialAnimationPropertyInfo[];
                baseColorTexture: {
                    extensions: {
                        KHR_texture_transform: {
                            scale: MaterialAnimationPropertyInfo[];
                            offset: MaterialAnimationPropertyInfo[];
                            rotation: MaterialAnimationPropertyInfo[];
                        };
                    };
                };
                metallicRoughnessTexture: {
                    extensions: {
                        KHR_texture_transform: {
                            scale: MaterialAnimationPropertyInfo[];
                            offset: MaterialAnimationPropertyInfo[];
                            rotation: MaterialAnimationPropertyInfo[];
                        };
                    };
                };
            };
            emissiveFactor: MaterialAnimationPropertyInfo[];
            normalTexture: {
                scale: MaterialAnimationPropertyInfo[];
                extensions: {
                    KHR_texture_transform: {
                        scale: MaterialAnimationPropertyInfo[];
                        offset: MaterialAnimationPropertyInfo[];
                        rotation: MaterialAnimationPropertyInfo[];
                    };
                };
            };
            occlusionTexture: {
                strength: MaterialAnimationPropertyInfo[];
                extensions: {
                    KHR_texture_transform: {
                        scale: MaterialAnimationPropertyInfo[];
                        offset: MaterialAnimationPropertyInfo[];
                        rotation: MaterialAnimationPropertyInfo[];
                    };
                };
            };
            emissiveTexture: {
                extensions: {
                    KHR_texture_transform: {
                        scale: MaterialAnimationPropertyInfo[];
                        offset: MaterialAnimationPropertyInfo[];
                        rotation: MaterialAnimationPropertyInfo[];
                    };
                };
            };
            extensions: {
                KHR_materials_anisotropy: {
                    anisotropyStrength: MaterialAnimationPropertyInfo[];
                    anisotropyRotation: MaterialAnimationPropertyInfo[];
                    anisotropyTexture: {
                        extensions: {
                            KHR_texture_transform: {
                                scale: MaterialAnimationPropertyInfo[];
                                offset: MaterialAnimationPropertyInfo[];
                                rotation: MaterialAnimationPropertyInfo[];
                            };
                        };
                    };
                };
                KHR_materials_clearcoat: {
                    clearcoatFactor: MaterialAnimationPropertyInfo[];
                    clearcoatRoughnessFactor: MaterialAnimationPropertyInfo[];
                    clearcoatTexture: {
                        extensions: {
                            KHR_texture_transform: {
                                scale: MaterialAnimationPropertyInfo[];
                                offset: MaterialAnimationPropertyInfo[];
                                rotation: MaterialAnimationPropertyInfo[];
                            };
                        };
                    };
                    clearcoatNormalTexture: {
                        scale: MaterialAnimationPropertyInfo[];
                        extensions: {
                            KHR_texture_transform: {
                                scale: MaterialAnimationPropertyInfo[];
                                offset: MaterialAnimationPropertyInfo[];
                                rotation: MaterialAnimationPropertyInfo[];
                            };
                        };
                    };
                    clearcoatRoughnessTexture: {
                        extensions: {
                            KHR_texture_transform: {
                                scale: MaterialAnimationPropertyInfo[];
                                offset: MaterialAnimationPropertyInfo[];
                                rotation: MaterialAnimationPropertyInfo[];
                            };
                        };
                    };
                };
                KHR_materials_dispersion: {
                    dispersion: MaterialAnimationPropertyInfo[];
                };
                KHR_materials_emissive_strength: {
                    emissiveStrength: MaterialAnimationPropertyInfo[];
                };
                KHR_materials_ior: {
                    ior: MaterialAnimationPropertyInfo[];
                };
                KHR_materials_iridescence: {
                    iridescenceFactor: MaterialAnimationPropertyInfo[];
                    iridescenceIor: MaterialAnimationPropertyInfo[];
                    iridescenceThicknessMinimum: MaterialAnimationPropertyInfo[];
                    iridescenceThicknessMaximum: MaterialAnimationPropertyInfo[];
                    iridescenceTexture: {
                        extensions: {
                            KHR_texture_transform: {
                                scale: MaterialAnimationPropertyInfo[];
                                offset: MaterialAnimationPropertyInfo[];
                                rotation: MaterialAnimationPropertyInfo[];
                            };
                        };
                    };
                    iridescenceThicknessTexture: {
                        extensions: {
                            KHR_texture_transform: {
                                scale: MaterialAnimationPropertyInfo[];
                                offset: MaterialAnimationPropertyInfo[];
                                rotation: MaterialAnimationPropertyInfo[];
                            };
                        };
                    };
                };
                KHR_materials_sheen: {
                    sheenColorFactor: MaterialAnimationPropertyInfo[];
                    sheenRoughnessFactor: MaterialAnimationPropertyInfo[];
                    sheenColorTexture: {
                        extensions: {
                            KHR_texture_transform: {
                                scale: MaterialAnimationPropertyInfo[];
                                offset: MaterialAnimationPropertyInfo[];
                                rotation: MaterialAnimationPropertyInfo[];
                            };
                        };
                    };
                    sheenRoughnessTexture: {
                        extensions: {
                            KHR_texture_transform: {
                                scale: MaterialAnimationPropertyInfo[];
                                offset: MaterialAnimationPropertyInfo[];
                                rotation: MaterialAnimationPropertyInfo[];
                            };
                        };
                    };
                };
                KHR_materials_specular: {
                    specularFactor: MaterialAnimationPropertyInfo[];
                    specularColorFactor: MaterialAnimationPropertyInfo[];
                    specularTexture: {
                        extensions: {
                            KHR_texture_transform: {
                                scale: MaterialAnimationPropertyInfo[];
                                offset: MaterialAnimationPropertyInfo[];
                                rotation: MaterialAnimationPropertyInfo[];
                            };
                        };
                    };
                    specularColorTexture: {
                        extensions: {
                            KHR_texture_transform: {
                                scale: MaterialAnimationPropertyInfo[];
                                offset: MaterialAnimationPropertyInfo[];
                                rotation: MaterialAnimationPropertyInfo[];
                            };
                        };
                    };
                };
                KHR_materials_transmission: {
                    transmissionFactor: MaterialAnimationPropertyInfo[];
                    transmissionTexture: {
                        extensions: {
                            KHR_texture_transform: {
                                scale: MaterialAnimationPropertyInfo[];
                                offset: MaterialAnimationPropertyInfo[];
                                rotation: MaterialAnimationPropertyInfo[];
                            };
                        };
                    };
                };
                KHR_materials_volume: {
                    attenuationColor: MaterialAnimationPropertyInfo[];
                    attenuationDistance: MaterialAnimationPropertyInfo[];
                    thicknessFactor: MaterialAnimationPropertyInfo[];
                    thicknessTexture: {
                        extensions: {
                            KHR_texture_transform: {
                                scale: MaterialAnimationPropertyInfo[];
                                offset: MaterialAnimationPropertyInfo[];
                                rotation: MaterialAnimationPropertyInfo[];
                            };
                        };
                    };
                };
                KHR_materials_diffuse_transmission: {
                    diffuseTransmissionFactor: MaterialAnimationPropertyInfo[];
                    diffuseTransmissionTexture: {
                        extensions: {
                            KHR_texture_transform: {
                                scale: MaterialAnimationPropertyInfo[];
                                offset: MaterialAnimationPropertyInfo[];
                                rotation: MaterialAnimationPropertyInfo[];
                            };
                        };
                    };
                    diffuseTransmissionColorFactor: MaterialAnimationPropertyInfo[];
                    diffuseTransmissionColorTexture: {
                        extensions: {
                            KHR_texture_transform: {
                                scale: MaterialAnimationPropertyInfo[];
                                offset: MaterialAnimationPropertyInfo[];
                                rotation: MaterialAnimationPropertyInfo[];
                            };
                        };
                    };
                };
            };
        };
    };
    cameras: {
        __array__: {
            __target__: boolean;
            orthographic: {
                xmag: CameraAnimationPropertyInfo[];
                ymag: CameraAnimationPropertyInfo[];
                zfar: CameraAnimationPropertyInfo[];
                znear: CameraAnimationPropertyInfo[];
            };
            perspective: {
                yfov: CameraAnimationPropertyInfo[];
                zfar: CameraAnimationPropertyInfo[];
                znear: CameraAnimationPropertyInfo[];
            };
        };
    };
    extensions: {
        KHR_lights_punctual: {
            lights: {
                __array__: {
                    __target__: boolean;
                    color: LightAnimationPropertyInfo[];
                    intensity: LightAnimationPropertyInfo[];
                    range: LightAnimationPropertyInfo[];
                    spot: {
                        innerConeAngle: LightAnimationPropertyInfo[];
                        outerConeAngle: LightAnimationPropertyInfo[];
                    };
                };
            };
        };
        EXT_lights_ies: {
            lights: {
                __array__: {
                    __target__: boolean;
                    color: LightAnimationPropertyInfo[];
                    multiplier: LightAnimationPropertyInfo[];
                };
            };
        };
    };
};
export {};

}
declare module "babylonjs/glTF/2.0/Extensions/KHR_animation_pointer" {
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
import { Nullable } from "babylonjs/types";
import { Animation } from "babylonjs/Animations/animation";
import { IAnimatable } from "babylonjs/Animations/animatable.interface";
import { IAnimation, IAnimationChannel } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_animation_pointer extension.
         */
        ["KHR_animation_pointer"]: {};
    }
}
/**
 * [Specification PR](https://github.com/KhronosGroup/glTF/pull/2147)
 * !!! Experimental Extension Subject to Changes !!!
 */
export class KHR_animation_pointer implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    private _loader;
    private _pathToObjectConverter?;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /**
     * Defines whether this extension is enabled.
     */
    get enabled(): boolean;
    /** @internal */
    dispose(): void;
    /**
     * Loads a glTF animation channel.
     * @param context The context when loading the asset
     * @param animationContext The context of the animation when loading the asset
     * @param animation The glTF animation property
     * @param channel The glTF animation channel property
     * @param onLoad Called for each animation loaded
     * @returns A void promise that resolves when the load is complete or null if not handled
     */
    _loadAnimationChannelAsync(context: string, animationContext: string, animation: IAnimation, channel: IAnimationChannel, onLoad: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): Nullable<Promise<void>>;
}

}
declare module "babylonjs/glTF/2.0/Extensions/ExtrasAsMetadata" {
import { Nullable } from "babylonjs/types";
import { TransformNode } from "babylonjs/Meshes/transformNode";
import { Camera } from "babylonjs/Cameras/camera";
import { INode, ICamera, IMaterial } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
import { Material } from "babylonjs/Materials/material";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the ExtrasAsMetadata extension.
         */
        ["ExtrasAsMetadata"]: {};
    }
}
/**
 * Store glTF extras (if present) in BJS objects' metadata
 */
export class ExtrasAsMetadata implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _loader;
    private _assignExtras;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
    /**
     * @internal
     */
    loadCameraAsync(context: string, camera: ICamera, assign: (babylonCamera: Camera) => void): Nullable<Promise<Camera>>;
    /**
     * @internal
     */
    createMaterial(context: string, material: IMaterial, babylonDrawMode: number): Nullable<Material>;
}

}
declare module "babylonjs/glTF/2.0/Extensions/EXT_texture_webp" {
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
import { ITexture } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
import { Nullable } from "babylonjs/types";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the EXT_texture_webp extension.
         */
        ["EXT_texture_webp"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_texture_webp/README.md)
 */
export class EXT_texture_webp implements IGLTFLoaderExtension {
    /** The name of this extension. */
    readonly name: string;
    /** Defines whether this extension is enabled. */
    enabled: boolean;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    _loadTextureAsync(context: string, texture: ITexture, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
}

}
declare module "babylonjs/glTF/2.0/Extensions/EXT_texture_avif" {
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
import { ITexture } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
import { Nullable } from "babylonjs/types";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the EXT_texture_avif extension.
         */
        ["EXT_texture_avif"]: {};
    }
}
/**
 * [glTF PR](https://github.com/KhronosGroup/glTF/pull/2235)
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_texture_avif/README.md)
 */
export class EXT_texture_avif implements IGLTFLoaderExtension {
    /** The name of this extension. */
    readonly name: string;
    /** Defines whether this extension is enabled. */
    enabled: boolean;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    _loadTextureAsync(context: string, texture: ITexture, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
}

}
declare module "babylonjs/glTF/2.0/Extensions/EXT_meshopt_compression" {
import { Nullable } from "babylonjs/types";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
import { IBufferView } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the EXT_meshopt_compression extension.
         */
        ["EXT_meshopt_compression"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_meshopt_compression/README.md)
 *
 * This extension uses a WebAssembly decoder module from https://github.com/zeux/meshoptimizer/tree/master/js
 * @since 5.0.0
 */
export class EXT_meshopt_compression implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadBufferViewAsync(context: string, bufferView: IBufferView): Nullable<Promise<ArrayBufferView>>;
}

}
declare module "babylonjs/glTF/2.0/Extensions/EXT_mesh_gpu_instancing" {
import { TransformNode } from "babylonjs/Meshes/transformNode";
import { Nullable } from "babylonjs/types";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { INode } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import "babylonjs/Meshes/thinInstanceMesh";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the EXT_mesh_gpu_instancing extension.
         */
        ["EXT_mesh_gpu_instancing"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing/README.md)
 * [Playground Sample](https://playground.babylonjs.com/#QFIGLW#9)
 */
export class EXT_mesh_gpu_instancing implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _loader;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /**
     * @internal
     */
    loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
}

}
declare module "babylonjs/glTF/2.0/Extensions/EXT_lights_image_based" {
import { Nullable } from "babylonjs/types";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
import { IScene } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the EXT_lights_image_based extension.
         */
        ["EXT_lights_image_based"]: {};
    }
}
module "babylonjs-gltf2interface" {
    /** @internal */
    interface IEXTLightsImageBased_LightImageBased {
        _babylonTexture?: BaseTexture;
        _loaded?: Promise<void>;
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_lights_image_based/README.md)
 */
export class EXT_lights_image_based implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    private _loader;
    private _lights?;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /** @internal */
    onLoading(): void;
    /**
     * @internal
     */
    loadSceneAsync(context: string, scene: IScene): Nullable<Promise<void>>;
    private _loadLightAsync;
}

}
declare module "babylonjs/glTF/2.0/Extensions/EXT_lights_ies" {
import { Nullable } from "babylonjs/types";
import { TransformNode } from "babylonjs/Meshes/transformNode";
import { INode } from "babylonjs/glTF/2.0/glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "babylonjs/glTF/2.0/glTFLoaderExtension";
import { GLTFLoader } from "babylonjs/glTF/2.0/glTFLoader";
module "babylonjs/glTF/glTFFileLoader" {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the EXT_lights_ies extension.
         */
        ["EXT_lights_ies"]: {};
    }
}
/**
 * [Specification](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_lights_ies)
 */
export class EXT_lights_ies implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;
    /** hidden */
    private _loader;
    private _lights?;
    /**
     * @internal
     */
    constructor(loader: GLTFLoader);
    /** @internal */
    dispose(): void;
    /** @internal */
    onLoading(): void;
    /**
     * @internal
     */
    loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
}

}
declare module "babylonjs/glTF/1.0/index" {
export * from "babylonjs/glTF/1.0/glTFBinaryExtension";
export * from "babylonjs/glTF/1.0/glTFLoader";
export * from "babylonjs/glTF/1.0/glTFLoaderInterfaces";
export * from "babylonjs/glTF/1.0/glTFLoaderUtils";
export * from "babylonjs/glTF/1.0/glTFMaterialsCommonExtension";

}
declare module "babylonjs/glTF/1.0/glTFMaterialsCommonExtension" {
import { GLTFLoaderExtension } from "babylonjs/glTF/1.0/glTFLoader";
import { IGLTFRuntime } from "babylonjs/glTF/1.0/glTFLoaderInterfaces";
import { Material } from "babylonjs/Materials/material";
/**
 * @internal
 * @deprecated
 */
export class GLTFMaterialsCommonExtension extends GLTFLoaderExtension {
    constructor();
    loadRuntimeExtensionsAsync(gltfRuntime: IGLTFRuntime): boolean;
    loadMaterialAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (material: Material) => void, onError: (message: string) => void): boolean;
    private _loadTexture;
}

}
declare module "babylonjs/glTF/1.0/glTFLoaderUtils" {
import { IGLTFTechniqueParameter, IGLTFAccessor, IGLTFRuntime, IGLTFBufferView } from "babylonjs/glTF/1.0/glTFLoaderInterfaces";
import { EComponentType } from "babylonjs/glTF/1.0/glTFLoaderInterfaces";
import { Effect } from "babylonjs/Materials/effect";
import { ShaderMaterial } from "babylonjs/Materials/shaderMaterial";
import { Node } from "babylonjs/node";
import { Scene } from "babylonjs/scene";
/**
 * Utils functions for GLTF
 * @internal
 * @deprecated
 */
export class GLTFUtils {
    /**
     * Sets the given "parameter" matrix
     * @param scene the Scene object
     * @param source the source node where to pick the matrix
     * @param parameter the GLTF technique parameter
     * @param uniformName the name of the shader's uniform
     * @param shaderMaterial the shader material
     */
    static SetMatrix(scene: Scene, source: Node, parameter: IGLTFTechniqueParameter, uniformName: string, shaderMaterial: ShaderMaterial | Effect): void;
    /**
     * Sets the given "parameter" matrix
     * @param shaderMaterial the shader material
     * @param uniform the name of the shader's uniform
     * @param value the value of the uniform
     * @param type the uniform's type (EParameterType FLOAT, VEC2, VEC3 or VEC4)
     * @returns true if set, else false
     */
    static SetUniform(shaderMaterial: ShaderMaterial | Effect, uniform: string, value: any, type: number): boolean;
    /**
     * Returns the wrap mode of the texture
     * @param mode the mode value
     * @returns the wrap mode (TEXTURE_WRAP_ADDRESSMODE, MIRROR_ADDRESSMODE or CLAMP_ADDRESSMODE)
     */
    static GetWrapMode(mode: number): number;
    /**
     * Returns the byte stride giving an accessor
     * @param accessor the GLTF accessor objet
     * @returns the byte stride
     */
    static GetByteStrideFromType(accessor: IGLTFAccessor): number;
    /**
     * Returns the texture filter mode giving a mode value
     * @param mode the filter mode value
     * @returns the filter mode (TODO - needs to be a type?)
     */
    static GetTextureFilterMode(mode: number): number;
    static GetBufferFromBufferView(gltfRuntime: IGLTFRuntime, bufferView: IGLTFBufferView, byteOffset: number, byteLength: number, componentType: EComponentType): ArrayBufferView;
    /**
     * Returns a buffer from its accessor
     * @param gltfRuntime the GLTF runtime
     * @param accessor the GLTF accessor
     * @returns an array buffer view
     */
    static GetBufferFromAccessor(gltfRuntime: IGLTFRuntime, accessor: IGLTFAccessor): any;
    /**
     * Decodes a buffer view into a string
     * @param view the buffer view
     * @returns a string
     */
    static DecodeBufferToText(view: ArrayBufferView): string;
    /**
     * Returns the default material of gltf. Related to
     * https://github.com/KhronosGroup/glTF/tree/master/specification/1.0#appendix-a-default-material
     * @param scene the Babylon.js scene
     * @returns the default Babylon material
     */
    static GetDefaultMaterial(scene: Scene): ShaderMaterial;
    private static _DefaultMaterial;
}

}
declare module "babylonjs/glTF/1.0/glTFLoaderInterfaces" {
import { AssetContainer } from "babylonjs/assetContainer";
import { Bone } from "babylonjs/Bones/bone";
import { Skeleton } from "babylonjs/Bones/skeleton";
import { Texture } from "babylonjs/Materials/Textures/texture";
import { Node } from "babylonjs/node";
import { Scene } from "babylonjs/scene";
import { Nullable } from "babylonjs/types";
/**
 * Enums
 * @internal
 */
export enum EComponentType {
    BYTE = 5120,
    UNSIGNED_BYTE = 5121,
    SHORT = 5122,
    UNSIGNED_SHORT = 5123,
    FLOAT = 5126
}
/** @internal */
export enum EShaderType {
    FRAGMENT = 35632,
    VERTEX = 35633
}
/** @internal */
export enum EParameterType {
    BYTE = 5120,
    UNSIGNED_BYTE = 5121,
    SHORT = 5122,
    UNSIGNED_SHORT = 5123,
    INT = 5124,
    UNSIGNED_INT = 5125,
    FLOAT = 5126,
    FLOAT_VEC2 = 35664,
    FLOAT_VEC3 = 35665,
    FLOAT_VEC4 = 35666,
    INT_VEC2 = 35667,
    INT_VEC3 = 35668,
    INT_VEC4 = 35669,
    BOOL = 35670,
    BOOL_VEC2 = 35671,
    BOOL_VEC3 = 35672,
    BOOL_VEC4 = 35673,
    FLOAT_MAT2 = 35674,
    FLOAT_MAT3 = 35675,
    FLOAT_MAT4 = 35676,
    SAMPLER_2D = 35678
}
/** @internal */
export enum ETextureWrapMode {
    CLAMP_TO_EDGE = 33071,
    MIRRORED_REPEAT = 33648,
    REPEAT = 10497
}
/** @internal */
export enum ETextureFilterType {
    NEAREST = 9728,
    LINEAR = 9728,
    NEAREST_MIPMAP_NEAREST = 9984,
    LINEAR_MIPMAP_NEAREST = 9985,
    NEAREST_MIPMAP_LINEAR = 9986,
    LINEAR_MIPMAP_LINEAR = 9987
}
/** @internal */
export enum ETextureFormat {
    ALPHA = 6406,
    RGB = 6407,
    RGBA = 6408,
    LUMINANCE = 6409,
    LUMINANCE_ALPHA = 6410
}
/** @internal */
export enum ECullingType {
    FRONT = 1028,
    BACK = 1029,
    FRONT_AND_BACK = 1032
}
/** @internal */
export enum EBlendingFunction {
    ZERO = 0,
    ONE = 1,
    SRC_COLOR = 768,
    ONE_MINUS_SRC_COLOR = 769,
    DST_COLOR = 774,
    ONE_MINUS_DST_COLOR = 775,
    SRC_ALPHA = 770,
    ONE_MINUS_SRC_ALPHA = 771,
    DST_ALPHA = 772,
    ONE_MINUS_DST_ALPHA = 773,
    CONSTANT_COLOR = 32769,
    ONE_MINUS_CONSTANT_COLOR = 32770,
    CONSTANT_ALPHA = 32771,
    ONE_MINUS_CONSTANT_ALPHA = 32772,
    SRC_ALPHA_SATURATE = 776
}
/** @internal */
export interface IGLTFProperty {
    extensions?: {
        [key: string]: any;
    };
    extras?: Object;
}
/** @internal */
export interface IGLTFChildRootProperty extends IGLTFProperty {
    name?: string;
}
/** @internal */
export interface IGLTFAccessor extends IGLTFChildRootProperty {
    bufferView: string;
    byteOffset: number;
    byteStride: number;
    count: number;
    type: string;
    componentType: EComponentType;
    max?: number[];
    min?: number[];
    name?: string;
}
/** @internal */
export interface IGLTFBufferView extends IGLTFChildRootProperty {
    buffer: string;
    byteOffset: number;
    byteLength: number;
    byteStride: number;
    target?: number;
}
/** @internal */
export interface IGLTFBuffer extends IGLTFChildRootProperty {
    uri: string;
    byteLength?: number;
    type?: string;
}
/** @internal */
export interface IGLTFShader extends IGLTFChildRootProperty {
    uri: string;
    type: EShaderType;
}
/** @internal */
export interface IGLTFProgram extends IGLTFChildRootProperty {
    attributes: string[];
    fragmentShader: string;
    vertexShader: string;
}
/** @internal */
export interface IGLTFTechniqueParameter {
    type: number;
    count?: number;
    semantic?: string;
    node?: string;
    value?: number | boolean | string | Array<any>;
    source?: string;
    babylonValue?: any;
}
/** @internal */
export interface IGLTFTechniqueCommonProfile {
    lightingModel: string;
    texcoordBindings: Object;
    parameters?: Array<any>;
}
/** @internal */
export interface IGLTFTechniqueStatesFunctions {
    blendColor?: number[];
    blendEquationSeparate?: number[];
    blendFuncSeparate?: number[];
    colorMask: boolean[];
    cullFace: number[];
}
/** @internal */
export interface IGLTFTechniqueStates {
    enable: number[];
    functions: IGLTFTechniqueStatesFunctions;
}
/** @internal */
export interface IGLTFTechnique extends IGLTFChildRootProperty {
    parameters: {
        [key: string]: IGLTFTechniqueParameter;
    };
    program: string;
    attributes: {
        [key: string]: string;
    };
    uniforms: {
        [key: string]: string;
    };
    states: IGLTFTechniqueStates;
}
/** @internal */
export interface IGLTFMaterial extends IGLTFChildRootProperty {
    technique?: string;
    values: string[];
}
/** @internal */
export interface IGLTFMeshPrimitive extends IGLTFProperty {
    attributes: {
        [key: string]: string;
    };
    indices: string;
    material: string;
    mode?: number;
}
/** @internal */
export interface IGLTFMesh extends IGLTFChildRootProperty {
    primitives: IGLTFMeshPrimitive[];
}
/** @internal */
export interface IGLTFImage extends IGLTFChildRootProperty {
    uri: string;
}
/** @internal */
export interface IGLTFSampler extends IGLTFChildRootProperty {
    magFilter?: number;
    minFilter?: number;
    wrapS?: number;
    wrapT?: number;
}
/** @internal */
export interface IGLTFTexture extends IGLTFChildRootProperty {
    sampler: string;
    source: string;
    format?: ETextureFormat;
    internalFormat?: ETextureFormat;
    target?: number;
    type?: number;
    babylonTexture?: Texture;
}
/** @internal */
export interface IGLTFAmbienLight {
    color?: number[];
}
/** @internal */
export interface IGLTFDirectionalLight {
    color?: number[];
}
/** @internal */
export interface IGLTFPointLight {
    color?: number[];
    constantAttenuation?: number;
    linearAttenuation?: number;
    quadraticAttenuation?: number;
}
/** @internal */
export interface IGLTFSpotLight {
    color?: number[];
    constantAttenuation?: number;
    fallOfAngle?: number;
    fallOffExponent?: number;
    linearAttenuation?: number;
    quadraticAttenuation?: number;
}
/** @internal */
export interface IGLTFLight extends IGLTFChildRootProperty {
    type: string;
}
/** @internal */
export interface IGLTFCameraOrthographic {
    xmag: number;
    ymag: number;
    zfar: number;
    znear: number;
}
/** @internal */
export interface IGLTFCameraPerspective {
    aspectRatio: number;
    yfov: number;
    zfar: number;
    znear: number;
}
/** @internal */
export interface IGLTFCamera extends IGLTFChildRootProperty {
    type: string;
}
/** @internal */
export interface IGLTFAnimationChannelTarget {
    id: string;
    path: string;
}
/** @internal */
export interface IGLTFAnimationChannel {
    sampler: string;
    target: IGLTFAnimationChannelTarget;
}
/** @internal */
export interface IGLTFAnimationSampler {
    input: string;
    output: string;
    interpolation?: string;
}
/** @internal */
export interface IGLTFAnimation extends IGLTFChildRootProperty {
    channels?: IGLTFAnimationChannel[];
    parameters?: {
        [key: string]: string;
    };
    samplers?: {
        [key: string]: IGLTFAnimationSampler;
    };
}
/** @internal */
export interface IGLTFNodeInstanceSkin {
    skeletons: string[];
    skin: string;
    meshes: string[];
}
/** @internal */
export interface IGLTFSkins extends IGLTFChildRootProperty {
    bindShapeMatrix: number[];
    inverseBindMatrices: string;
    jointNames: string[];
    babylonSkeleton?: Skeleton;
}
/** @internal */
export interface IGLTFNode extends IGLTFChildRootProperty {
    camera?: string;
    children: string[];
    skin?: string;
    jointName?: string;
    light?: string;
    matrix: number[];
    mesh?: string;
    meshes?: string[];
    rotation?: number[];
    scale?: number[];
    translation?: number[];
    babylonNode?: Node;
}
/** @internal */
export interface IGLTFScene extends IGLTFChildRootProperty {
    nodes: string[];
}
/** @internal */
export interface IGLTFRuntime {
    extensions: {
        [key: string]: any;
    };
    accessors: {
        [key: string]: IGLTFAccessor;
    };
    buffers: {
        [key: string]: IGLTFBuffer;
    };
    bufferViews: {
        [key: string]: IGLTFBufferView;
    };
    meshes: {
        [key: string]: IGLTFMesh;
    };
    lights: {
        [key: string]: IGLTFLight;
    };
    cameras: {
        [key: string]: IGLTFCamera;
    };
    nodes: {
        [key: string]: IGLTFNode;
    };
    images: {
        [key: string]: IGLTFImage;
    };
    textures: {
        [key: string]: IGLTFTexture;
    };
    shaders: {
        [key: string]: IGLTFShader;
    };
    programs: {
        [key: string]: IGLTFProgram;
    };
    samplers: {
        [key: string]: IGLTFSampler;
    };
    techniques: {
        [key: string]: IGLTFTechnique;
    };
    materials: {
        [key: string]: IGLTFMaterial;
    };
    animations: {
        [key: string]: IGLTFAnimation;
    };
    skins: {
        [key: string]: IGLTFSkins;
    };
    currentScene?: Object;
    scenes: {
        [key: string]: IGLTFScene;
    };
    extensionsUsed: string[];
    extensionsRequired?: string[];
    buffersCount: number;
    shaderscount: number;
    scene: Scene;
    rootUrl: string;
    loadedBufferCount: number;
    loadedBufferViews: {
        [name: string]: ArrayBufferView;
    };
    loadedShaderCount: number;
    importOnlyMeshes: boolean;
    importMeshesNames?: string[];
    dummyNodes: Node[];
    assetContainer: Nullable<AssetContainer>;
}
/** @internal */
export interface INodeToRoot {
    bone: Bone;
    node: IGLTFNode;
    id: string;
}
/** @internal */
export interface IJointNode {
    node: IGLTFNode;
    id: string;
}

}
declare module "babylonjs/glTF/1.0/glTFLoader" {
import { IGLTFRuntime } from "babylonjs/glTF/1.0/glTFLoaderInterfaces";
import { Nullable } from "babylonjs/types";
import { Material } from "babylonjs/Materials/material";
import { Texture } from "babylonjs/Materials/Textures/texture";
import { ISceneLoaderAsyncResult, ISceneLoaderProgressEvent } from "babylonjs/Loading/sceneLoader";
import { Scene } from "babylonjs/scene";
import { IGLTFLoader, IGLTFLoaderData } from "babylonjs/glTF/glTFFileLoader";
import { AssetContainer } from "babylonjs/assetContainer";
/**
 * Implementation of the base glTF spec
 * @internal
 */
export class GLTFLoaderBase {
    static CreateRuntime(parsedData: any, scene: Scene, rootUrl: string): IGLTFRuntime;
    static LoadBufferAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (buffer: ArrayBufferView) => void, onError: (message: string) => void, onProgress?: () => void): void;
    static LoadTextureBufferAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (buffer: Nullable<ArrayBufferView>) => void, onError: (message: string) => void): void;
    static CreateTextureAsync(gltfRuntime: IGLTFRuntime, id: string, buffer: Nullable<ArrayBufferView>, onSuccess: (texture: Texture) => void): void;
    static LoadShaderStringAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (shaderString: string | ArrayBuffer) => void, onError?: (message: string) => void): void;
    static LoadMaterialAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (material: Material) => void, onError: (message: string) => void): void;
}
/**
 * glTF V1 Loader
 * @internal
 * @deprecated
 */
export class GLTFLoader implements IGLTFLoader {
    static Extensions: {
        [name: string]: GLTFLoaderExtension;
    };
    static RegisterExtension(extension: GLTFLoaderExtension): void;
    dispose(): void;
    private _importMeshAsync;
    /**
     * Imports one or more meshes from a loaded gltf file and adds them to the scene
     * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
     * @param scene the scene the meshes should be added to
     * @param assetContainer defines the asset container to use (can be null)
     * @param data gltf data containing information of the meshes in a loaded file
     * @param rootUrl root url to load from
     * @param onProgress event that fires when loading progress has occured
     * @returns a promise containg the loaded meshes, particles, skeletons and animations
     */
    importMeshAsync(meshesNames: any, scene: Scene, assetContainer: Nullable<AssetContainer>, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void): Promise<ISceneLoaderAsyncResult>;
    private _loadAsync;
    /**
     * Imports all objects from a loaded gltf file and adds them to the scene
     * @param scene the scene the objects should be added to
     * @param data gltf data containing information of the meshes in a loaded file
     * @param rootUrl root url to load from
     * @param onProgress event that fires when loading progress has occured
     * @returns a promise which completes when objects have been loaded to the scene
     */
    loadAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void): Promise<void>;
    private _loadShadersAsync;
    private _loadBuffersAsync;
    private _createNodes;
}
/** @internal */
export abstract class GLTFLoaderExtension {
    private _name;
    constructor(name: string);
    get name(): string;
    /**
     * Defines an override for loading the runtime
     * Return true to stop further extensions from loading the runtime
     * @param scene
     * @param data
     * @param rootUrl
     * @param onSuccess
     * @param onError
     * @returns true to stop further extensions from loading the runtime
     */
    loadRuntimeAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onSuccess?: (gltfRuntime: IGLTFRuntime) => void, onError?: (message: string) => void): boolean;
    /**
     * Defines an onverride for creating gltf runtime
     * Return true to stop further extensions from creating the runtime
     * @param gltfRuntime
     * @param onSuccess
     * @param onError
     * @returns true to stop further extensions from creating the runtime
     */
    loadRuntimeExtensionsAsync(gltfRuntime: IGLTFRuntime, onSuccess: () => void, onError?: (message: string) => void): boolean;
    /**
     * Defines an override for loading buffers
     * Return true to stop further extensions from loading this buffer
     * @param gltfRuntime
     * @param id
     * @param onSuccess
     * @param onError
     * @param onProgress
     * @returns true to stop further extensions from loading this buffer
     */
    loadBufferAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (buffer: ArrayBufferView) => void, onError: (message: string) => void, onProgress?: () => void): boolean;
    /**
     * Defines an override for loading texture buffers
     * Return true to stop further extensions from loading this texture data
     * @param gltfRuntime
     * @param id
     * @param onSuccess
     * @param onError
     * @returns true to stop further extensions from loading this texture data
     */
    loadTextureBufferAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (buffer: ArrayBufferView) => void, onError: (message: string) => void): boolean;
    /**
     * Defines an override for creating textures
     * Return true to stop further extensions from loading this texture
     * @param gltfRuntime
     * @param id
     * @param buffer
     * @param onSuccess
     * @param onError
     * @returns true to stop further extensions from loading this texture
     */
    createTextureAsync(gltfRuntime: IGLTFRuntime, id: string, buffer: ArrayBufferView, onSuccess: (texture: Texture) => void, onError: (message: string) => void): boolean;
    /**
     * Defines an override for loading shader strings
     * Return true to stop further extensions from loading this shader data
     * @param gltfRuntime
     * @param id
     * @param onSuccess
     * @param onError
     * @returns true to stop further extensions from loading this shader data
     */
    loadShaderStringAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (shaderString: string) => void, onError: (message: string) => void): boolean;
    /**
     * Defines an override for loading materials
     * Return true to stop further extensions from loading this material
     * @param gltfRuntime
     * @param id
     * @param onSuccess
     * @param onError
     * @returns true to stop further extensions from loading this material
     */
    loadMaterialAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (material: Material) => void, onError: (message: string) => void): boolean;
    static LoadRuntimeAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onSuccess?: (gltfRuntime: IGLTFRuntime) => void, onError?: (message: string) => void): void;
    static LoadRuntimeExtensionsAsync(gltfRuntime: IGLTFRuntime, onSuccess: () => void, onError?: (message: string) => void): void;
    static LoadBufferAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (bufferView: ArrayBufferView) => void, onError: (message: string) => void, onProgress?: () => void): void;
    static LoadTextureAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (texture: Texture) => void, onError: (message: string) => void): void;
    static LoadShaderStringAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (shaderData: string | ArrayBuffer) => void, onError: (message: string) => void): void;
    static LoadMaterialAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (material: Material) => void, onError: (message: string) => void): void;
    private static _LoadTextureBufferAsync;
    private static _CreateTextureAsync;
    private static _ApplyExtensions;
}

}
declare module "babylonjs/glTF/1.0/glTFBinaryExtension" {
import { GLTFLoaderExtension } from "babylonjs/glTF/1.0/glTFLoader";
import { Scene } from "babylonjs/scene";
import { IGLTFLoaderData } from "babylonjs/glTF/glTFFileLoader";
import { IGLTFRuntime } from "babylonjs/glTF/1.0/glTFLoaderInterfaces";
/**
 * @internal
 * @deprecated
 */
export class GLTFBinaryExtension extends GLTFLoaderExtension {
    private _bin;
    constructor();
    loadRuntimeAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onSuccess: (gltfRuntime: IGLTFRuntime) => void): boolean;
    loadBufferAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (buffer: ArrayBufferView) => void, onError: (message: string) => void): boolean;
    loadTextureBufferAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (buffer: ArrayBufferView) => void): boolean;
    loadShaderStringAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (shaderString: string) => void): boolean;
}

}
declare module "babylonjs/STL/stlFileLoader.metadata" {
export const STLFileLoaderMetadata: {
    readonly name: "stl";
    readonly extensions: {
        readonly ".stl": {
            readonly isBinary: true;
        };
    };
};

}
declare module "babylonjs/STL/stlFileLoader" {
import { Nullable } from "babylonjs/types";
import { AbstractMesh } from "babylonjs/Meshes/abstractMesh";
import { ISceneLoaderPlugin } from "babylonjs/Loading/sceneLoader";
import { AssetContainer } from "babylonjs/assetContainer";
import { Scene } from "babylonjs/scene";
import { STLFileLoaderMetadata } from "babylonjs/STL/stlFileLoader.metadata";
import "babylonjs/Materials/standardMaterial";
module "babylonjs/Loading/sceneLoader" {
    interface SceneLoaderPluginOptions {
        /**
         * Defines options for the stl loader.
         */
        [STLFileLoaderMetadata.name]: {};
    }
}
/**
 * STL file type loader.
 * This is a babylon scene loader plugin.
 */
export class STLFileLoader implements ISceneLoaderPlugin {
    /** @internal */
    solidPattern: RegExp;
    /** @internal */
    facetsPattern: RegExp;
    /** @internal */
    normalPattern: RegExp;
    /** @internal */
    vertexPattern: RegExp;
    /**
     * Defines the name of the plugin.
     */
    readonly name: "stl";
    /**
     * Defines the extensions the stl loader is able to load.
     * force data to come in as an ArrayBuffer
     * we'll convert to string if it looks like it's an ASCII .stl
     */
    readonly extensions: {
        readonly ".stl": {
            readonly isBinary: true;
        };
    };
    /**
     * Defines if Y and Z axes are swapped or not when loading an STL file.
     * The default is false to maintain backward compatibility. When set to
     * true, coordinates from the STL file are used without change.
     */
    static DO_NOT_ALTER_FILE_COORDINATES: boolean;
    /**
     * Import meshes into a scene.
     * @param meshesNames An array of mesh names, a single mesh name, or empty string for all meshes that filter what meshes are imported
     * @param scene The scene to import into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @param meshes The meshes array to import into
     * @returns True if successful or false otherwise
     */
    importMesh(meshesNames: any, scene: Scene, data: any, rootUrl: string, meshes: Nullable<AbstractMesh[]>): boolean;
    /**
     * Load into a scene.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @returns true if successful or false otherwise
     */
    load(scene: Scene, data: any, rootUrl: string): boolean;
    /**
     * Load into an asset container.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @returns The loaded asset container
     */
    loadAssetContainer(scene: Scene, data: string, rootUrl: string): AssetContainer;
    private _isBinary;
    private _parseBinary;
    private _parseASCII;
}

}
declare module "babylonjs/STL/index" {
export * from "babylonjs/STL/stlFileLoader";

}
declare module "babylonjs/SPLAT/splatLoadingOptions" {
/**
 * Options for loading Gaussian Splatting and PLY files
 */
export type SPLATLoadingOptions = {
    /**
     * Defines if buffers should be kept in memory for editing purposes
     */
    keepInRam?: boolean;
};

}
declare module "babylonjs/SPLAT/splatFileLoader.metadata" {
export const SPLATFileLoaderMetadata: {
    readonly name: "splat";
    readonly extensions: {
        readonly ".splat": {
            readonly isBinary: true;
        };
        readonly ".ply": {
            readonly isBinary: true;
        };
        readonly ".spz": {
            readonly isBinary: true;
        };
    };
};

}
declare module "babylonjs/SPLAT/splatFileLoader" {
import { ISceneLoaderPluginAsync, ISceneLoaderPluginFactory, ISceneLoaderAsyncResult, ISceneLoaderProgressEvent, SceneLoaderPluginOptions } from "babylonjs/Loading/sceneLoader";
import { SPLATFileLoaderMetadata } from "babylonjs/SPLAT/splatFileLoader.metadata";
import { AssetContainer } from "babylonjs/assetContainer";
import { Scene } from "babylonjs/scene";
import { SPLATLoadingOptions } from "babylonjs/SPLAT/splatLoadingOptions";
module "babylonjs/Loading/sceneLoader" {
    interface SceneLoaderPluginOptions {
        /**
         * Defines options for the splat loader.
         */
        [SPLATFileLoaderMetadata.name]: Partial<SPLATLoadingOptions>;
    }
}
/**
 * @experimental
 * SPLAT file type loader.
 * This is a babylon scene loader plugin.
 */
export class SPLATFileLoader implements ISceneLoaderPluginAsync, ISceneLoaderPluginFactory {
    /**
     * Defines the name of the plugin.
     */
    readonly name: "splat";
    private _assetContainer;
    private readonly _loadingOptions;
    /**
     * Defines the extensions the splat loader is able to load.
     * force data to come in as an ArrayBuffer
     */
    readonly extensions: {
        readonly ".splat": {
            readonly isBinary: true;
        };
        readonly ".ply": {
            readonly isBinary: true;
        };
        readonly ".spz": {
            readonly isBinary: true;
        };
    };
    /**
     * Creates loader for gaussian splatting files
     * @param loadingOptions options for loading and parsing splat and PLY files.
     */
    constructor(loadingOptions?: Partial<Readonly<SPLATLoadingOptions>>);
    private static readonly _DefaultLoadingOptions;
    /** @internal */
    createPlugin(options: SceneLoaderPluginOptions): ISceneLoaderPluginAsync;
    /**
     * Imports  from the loaded gaussian splatting data and adds them to the scene
     * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
     * @param scene the scene the meshes should be added to
     * @param data the gaussian splatting data to load
     * @param rootUrl root url to load from
     * @param onProgress callback called while file is loading
     * @param fileName Defines the name of the file to load
     * @returns a promise containing the loaded meshes, particles, skeletons and animations
     */
    importMeshAsync(meshesNames: any, scene: Scene, data: any, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<ISceneLoaderAsyncResult>;
    private static _BuildPointCloud;
    private static _BuildMesh;
    private _parseSPZ;
    private _parse;
    /**
     * Load into an asset container.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @returns The loaded asset container
     */
    loadAssetContainerAsync(scene: Scene, data: string, rootUrl: string): Promise<AssetContainer>;
    /**
     * Imports all objects from the loaded OBJ data and adds them to the scene
     * @param scene the scene the objects should be added to
     * @param data the OBJ data to load
     * @param rootUrl root url to load from
     * @returns a promise which completes when objects have been loaded to the scene
     */
    loadAsync(scene: Scene, data: string, rootUrl: string): Promise<void>;
    /**
     * Code from https://github.com/dylanebert/gsplat.js/blob/main/src/loaders/PLYLoader.ts Under MIT license
     * Converts a .ply data array buffer to splat
     * if data array buffer is not ply, returns the original buffer
     * @param data the .ply data to load
     * @returns the loaded splat buffer
     */
    private static _ConvertPLYToSplat;
}

}
declare module "babylonjs/SPLAT/index" {
export * from "babylonjs/SPLAT/splatLoadingOptions";
export * from "babylonjs/SPLAT/splatFileLoader";

}
declare module "babylonjs/OBJ/solidParser" {
import { AssetContainer } from "babylonjs/assetContainer";
import { Mesh } from "babylonjs/Meshes/mesh";
import { Scene } from "babylonjs/scene";
import { Nullable } from "babylonjs/types";
import { OBJLoadingOptions } from "babylonjs/OBJ/objLoadingOptions";
/**
 * Class used to load mesh data from OBJ content
 */
export class SolidParser {
    /** Object descriptor */
    static ObjectDescriptor: RegExp;
    /** Group descriptor */
    static GroupDescriptor: RegExp;
    /** Material lib descriptor */
    static MtlLibGroupDescriptor: RegExp;
    /** Use a material descriptor */
    static UseMtlDescriptor: RegExp;
    /** Smooth descriptor */
    static SmoothDescriptor: RegExp;
    /** Pattern used to detect a vertex */
    static VertexPattern: RegExp;
    /** Pattern used to detect a normal */
    static NormalPattern: RegExp;
    /** Pattern used to detect a UV set */
    static UVPattern: RegExp;
    /** Pattern used to detect a first kind of face (f vertex vertex vertex) */
    static FacePattern1: RegExp;
    /** Pattern used to detect a second kind of face (f vertex/uvs vertex/uvs vertex/uvs) */
    static FacePattern2: RegExp;
    /** Pattern used to detect a third kind of face (f vertex/uvs/normal vertex/uvs/normal vertex/uvs/normal) */
    static FacePattern3: RegExp;
    /** Pattern used to detect a fourth kind of face (f vertex//normal vertex//normal vertex//normal)*/
    static FacePattern4: RegExp;
    /** Pattern used to detect a fifth kind of face (f -vertex/-uvs/-normal -vertex/-uvs/-normal -vertex/-uvs/-normal) */
    static FacePattern5: RegExp;
    /** Pattern used to detect a line(l vertex vertex) */
    static LinePattern1: RegExp;
    /** Pattern used to detect a second kind of line (l vertex/uvs vertex/uvs) */
    static LinePattern2: RegExp;
    /** Pattern used to detect a third kind of line (l vertex/uvs/normal vertex/uvs/normal) */
    static LinePattern3: RegExp;
    private _loadingOptions;
    private _positions;
    private _normals;
    private _uvs;
    private _colors;
    private _extColors;
    private _meshesFromObj;
    private _handledMesh;
    private _indicesForBabylon;
    private _wrappedPositionForBabylon;
    private _wrappedUvsForBabylon;
    private _wrappedColorsForBabylon;
    private _wrappedNormalsForBabylon;
    private _tuplePosNorm;
    private _curPositionInIndices;
    private _hasMeshes;
    private _unwrappedPositionsForBabylon;
    private _unwrappedColorsForBabylon;
    private _unwrappedNormalsForBabylon;
    private _unwrappedUVForBabylon;
    private _triangles;
    private _materialNameFromObj;
    private _objMeshName;
    private _increment;
    private _isFirstMaterial;
    private _grayColor;
    private _materialToUse;
    private _babylonMeshesArray;
    private _pushTriangle;
    private _handednessSign;
    private _hasLineData;
    /**
     * Creates a new SolidParser
     * @param materialToUse defines the array to fill with the list of materials to use (it will be filled by the parse function)
     * @param babylonMeshesArray defines the array to fill with the list of loaded meshes (it will be filled by the parse function)
     * @param loadingOptions defines the loading options to use
     */
    constructor(materialToUse: string[], babylonMeshesArray: Array<Mesh>, loadingOptions: OBJLoadingOptions);
    /**
     * Search for obj in the given array.
     * This function is called to check if a couple of data already exists in an array.
     *
     * If found, returns the index of the founded tuple index. Returns -1 if not found
     * @param arr Array<{ normals: Array<number>, idx: Array<number> }>
     * @param obj Array<number>
     * @returns {boolean}
     */
    private _isInArray;
    private _isInArrayUV;
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
    private _setData;
    /**
     * Transform Vector() and BABYLON.Color() objects into numbers in an array
     */
    private _unwrapData;
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
    private _getTriangles;
    /**
     * To get color between color and extension color
     * @param index Integer The index of the element in the array
     * @returns value of target color
     */
    private _getColor;
    /**
     * Create triangles and push the data for each polygon for the pattern 1
     * In this pattern we get vertice positions
     * @param face
     * @param v
     */
    private _setDataForCurrentFaceWithPattern1;
    /**
     * Create triangles and push the data for each polygon for the pattern 2
     * In this pattern we get vertice positions and uvs
     * @param face
     * @param v
     */
    private _setDataForCurrentFaceWithPattern2;
    /**
     * Create triangles and push the data for each polygon for the pattern 3
     * In this pattern we get vertice positions, uvs and normals
     * @param face
     * @param v
     */
    private _setDataForCurrentFaceWithPattern3;
    /**
     * Create triangles and push the data for each polygon for the pattern 4
     * In this pattern we get vertice positions and normals
     * @param face
     * @param v
     */
    private _setDataForCurrentFaceWithPattern4;
    private _setDataForCurrentFaceWithPattern5;
    private _addPreviousObjMesh;
    private _optimizeNormals;
    private static _IsLineElement;
    private static _IsObjectElement;
    private static _IsGroupElement;
    private static _GetZbrushMRGB;
    /**
     * Function used to parse an OBJ string
     * @param meshesNames defines the list of meshes to load (all if not defined)
     * @param data defines the OBJ string
     * @param scene defines the hosting scene
     * @param assetContainer defines the asset container to load data in
     * @param onFileToLoadFound defines a callback that will be called if a MTL file is found
     */
    parse(meshesNames: any, data: string, scene: Scene, assetContainer: Nullable<AssetContainer>, onFileToLoadFound: (fileToLoad: string) => void): void;
}

}
declare module "babylonjs/OBJ/objLoadingOptions" {
import { Vector2 } from "babylonjs/Maths/math.vector";
/**
 * Options for loading OBJ/MTL files
 */
export type OBJLoadingOptions = {
    /**
     * Defines if UVs are optimized by default during load.
     */
    optimizeWithUV: boolean;
    /**
     * Defines custom scaling of UV coordinates of loaded meshes.
     */
    UVScaling: Vector2;
    /**
     * Invert model on y-axis (does a model scaling inversion)
     */
    invertY: boolean;
    /**
     * Invert Y-Axis of referenced textures on load
     */
    invertTextureY: boolean;
    /**
     * Include in meshes the vertex colors available in some OBJ files.  This is not part of OBJ standard.
     */
    importVertexColors: boolean;
    /**
     * Compute the normals for the model, even if normals are present in the file.
     */
    computeNormals: boolean;
    /**
     * Optimize the normals for the model. Lighting can be uneven if you use OptimizeWithUV = true because new vertices can be created for the same location if they pertain to different faces.
     * Using OptimizehNormals = true will help smoothing the lighting by averaging the normals of those vertices.
     */
    optimizeNormals: boolean;
    /**
     * Skip loading the materials even if defined in the OBJ file (materials are ignored).
     */
    skipMaterials: boolean;
    /**
     * When a material fails to load OBJ loader will silently fail and onSuccess() callback will be triggered.
     */
    materialLoadingFailsSilently: boolean;
    /**
     * Loads assets without handedness conversions. This flag is for compatibility. Use it only if absolutely required. Defaults to false.
     */
    useLegacyBehavior: boolean;
};

}
declare module "babylonjs/OBJ/objFileLoader.metadata" {
export const OBJFileLoaderMetadata: {
    readonly name: "obj";
    readonly extensions: ".obj";
};

}
declare module "babylonjs/OBJ/objFileLoader" {
import { Vector2 } from "babylonjs/Maths/math.vector";
import { ISceneLoaderPluginAsync, ISceneLoaderPluginFactory, ISceneLoaderPlugin, ISceneLoaderAsyncResult } from "babylonjs/Loading/sceneLoader";
import { AssetContainer } from "babylonjs/assetContainer";
import { Scene } from "babylonjs/scene";
import { OBJFileLoaderMetadata } from "babylonjs/OBJ/objFileLoader.metadata";
import { OBJLoadingOptions } from "babylonjs/OBJ/objLoadingOptions";
module "babylonjs/Loading/sceneLoader" {
    interface SceneLoaderPluginOptions {
        /**
         * Defines options for the obj loader.
         */
        [OBJFileLoaderMetadata.name]: {};
    }
}
/**
 * OBJ file type loader.
 * This is a babylon scene loader plugin.
 */
export class OBJFileLoader implements ISceneLoaderPluginAsync, ISceneLoaderPluginFactory {
    /**
     * Defines if UVs are optimized by default during load.
     */
    static OPTIMIZE_WITH_UV: boolean;
    /**
     * Invert model on y-axis (does a model scaling inversion)
     */
    static INVERT_Y: boolean;
    /**
     * Invert Y-Axis of referenced textures on load
     */
    static get INVERT_TEXTURE_Y(): boolean;
    static set INVERT_TEXTURE_Y(value: boolean);
    /**
     * Include in meshes the vertex colors available in some OBJ files.  This is not part of OBJ standard.
     */
    static IMPORT_VERTEX_COLORS: boolean;
    /**
     * Compute the normals for the model, even if normals are present in the file.
     */
    static COMPUTE_NORMALS: boolean;
    /**
     * Optimize the normals for the model. Lighting can be uneven if you use OptimizeWithUV = true because new vertices can be created for the same location if they pertain to different faces.
     * Using OptimizehNormals = true will help smoothing the lighting by averaging the normals of those vertices.
     */
    static OPTIMIZE_NORMALS: boolean;
    /**
     * Defines custom scaling of UV coordinates of loaded meshes.
     */
    static UV_SCALING: Vector2;
    /**
     * Skip loading the materials even if defined in the OBJ file (materials are ignored).
     */
    static SKIP_MATERIALS: boolean;
    /**
     * When a material fails to load OBJ loader will silently fail and onSuccess() callback will be triggered.
     *
     * Defaults to true for backwards compatibility.
     */
    static MATERIAL_LOADING_FAILS_SILENTLY: boolean;
    /**
     * Loads assets without handedness conversions. This flag is for compatibility. Use it only if absolutely required. Defaults to false.
     */
    static USE_LEGACY_BEHAVIOR: boolean;
    /**
     * Defines the name of the plugin.
     */
    readonly name: "obj";
    /**
     * Defines the extension the plugin is able to load.
     */
    readonly extensions: ".obj";
    private _assetContainer;
    private _loadingOptions;
    /**
     * Creates loader for .OBJ files
     *
     * @param loadingOptions options for loading and parsing OBJ/MTL files.
     */
    constructor(loadingOptions?: OBJLoadingOptions);
    private static get _DefaultLoadingOptions();
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
    private _loadMTL;
    /**
     * Instantiates a OBJ file loader plugin.
     * @returns the created plugin
     */
    createPlugin(): ISceneLoaderPluginAsync | ISceneLoaderPlugin;
    /**
     * If the data string can be loaded directly.
     * @returns if the data can be loaded directly
     */
    canDirectLoad(): boolean;
    /**
     * Imports one or more meshes from the loaded OBJ data and adds them to the scene
     * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
     * @param scene the scene the meshes should be added to
     * @param data the OBJ data to load
     * @param rootUrl root url to load from
     * @returns a promise containing the loaded meshes, particles, skeletons and animations
     */
    importMeshAsync(meshesNames: any, scene: Scene, data: any, rootUrl: string): Promise<ISceneLoaderAsyncResult>;
    /**
     * Imports all objects from the loaded OBJ data and adds them to the scene
     * @param scene the scene the objects should be added to
     * @param data the OBJ data to load
     * @param rootUrl root url to load from
     * @returns a promise which completes when objects have been loaded to the scene
     */
    loadAsync(scene: Scene, data: string, rootUrl: string): Promise<void>;
    /**
     * Load into an asset container.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @returns The loaded asset container
     */
    loadAssetContainerAsync(scene: Scene, data: string, rootUrl: string): Promise<AssetContainer>;
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
    private _parseSolid;
}

}
declare module "babylonjs/OBJ/mtlFileLoader" {
import { Nullable } from "babylonjs/types";
import { StandardMaterial } from "babylonjs/Materials/standardMaterial";
import { Scene } from "babylonjs/scene";
import { AssetContainer } from "babylonjs/assetContainer";
/**
 * Class reading and parsing the MTL file bundled with the obj file.
 */
export class MTLFileLoader {
    /**
     * Invert Y-Axis of referenced textures on load
     */
    static INVERT_TEXTURE_Y: boolean;
    /**
     * All material loaded from the mtl will be set here
     */
    materials: StandardMaterial[];
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
    parseMTL(scene: Scene, data: string | ArrayBuffer, rootUrl: string, assetContainer: Nullable<AssetContainer>): void;
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
    private static _GetTexture;
}

}
declare module "babylonjs/OBJ/index" {
export * from "babylonjs/OBJ/mtlFileLoader";
export * from "babylonjs/OBJ/objLoadingOptions";
export * from "babylonjs/OBJ/solidParser";
export * from "babylonjs/OBJ/objFileLoader";

}

declare module "babylonjs" {
    export * from "babylonjs/index";
}


declare module BABYLON {


    /**
     * Registers the async plugin factories for all built-in loaders.
     * Loaders will be dynamically imported on demand, only when a SceneLoader load operation needs each respective loader.
     */
    export function registerBuiltInLoaders(): void;




    /**
     * Configuration for glTF validation
     */
    export interface IGLTFValidationConfiguration {
        /**
         * The url of the glTF validator.
         */
        url: string;
    }
    /**
     * glTF validation
     */
    export class GLTFValidation {
        /**
         * The configuration. Defaults to `{ url: "https://cdn.babylonjs.com/gltf_validator.js" }`.
         */
        static Configuration: IGLTFValidationConfiguration;
        private static _LoadScriptPromise;
        /**
         * Validate a glTF asset using the glTF-Validator.
         * @param data The JSON of a glTF or the array buffer of a binary glTF
         * @param rootUrl The root url for the glTF
         * @param fileName The file name for the glTF
         * @param getExternalResource The callback to get external resources for the glTF validator
         * @returns A promise that resolves with the glTF validation results once complete
         */
        static ValidateAsync(data: string | Uint8Array, rootUrl: string, fileName: string, getExternalResource: (uri: string) => Promise<Uint8Array>): Promise<GLTF2.IGLTFValidationResults>;
    }


    export const GLTFMagicBase64Encoded = "Z2xURg";
    export var GLTFFileLoaderMetadata: {
        readonly name: "gltf";
        readonly extensions: {
            readonly ".gltf": {
                readonly isBinary: false;
                readonly mimeType: "model/gltf+json";
            };
            readonly ".glb": {
                readonly isBinary: true;
                readonly mimeType: "model/gltf-binary";
            };
        };
        readonly canDirectLoad: (data: string) => boolean;
    };


    /**
     * Defines options for glTF loader extensions. This interface is extended by specific extensions.
     */
    export interface GLTFLoaderExtensionOptions extends Record<string, Record<string, unknown> | undefined> {
    }
        interface SceneLoaderPluginOptions {
            /**
             * Defines options for the glTF loader.
             */
            [GLTFFileLoaderMetadata.name]: Partial<GLTFLoaderOptions>;
        }
    /**
     * Mode that determines the coordinate system to use.
     */
    export enum GLTFLoaderCoordinateSystemMode {
        /**
         * Automatically convert the glTF right-handed data to the appropriate system based on the current coordinate system mode of the scene.
         */
        AUTO = 0,
        /**
         * Sets the useRightHandedSystem flag on the scene.
         */
        FORCE_RIGHT_HANDED = 1
    }
    /**
     * Mode that determines what animations will start.
     */
    export enum GLTFLoaderAnimationStartMode {
        /**
         * No animation will start.
         */
        NONE = 0,
        /**
         * The first animation will start.
         */
        FIRST = 1,
        /**
         * All animations will start.
         */
        ALL = 2
    }
    /**
     * Interface that contains the data for the glTF asset.
     */
    export interface IGLTFLoaderData {
        /**
         * The object that represents the glTF JSON.
         */
        json: Object;
        /**
         * The BIN chunk of a binary glTF.
         */
        bin: Nullable<IDataBuffer>;
    }
    /**
     * Interface for extending the loader.
     */
    export interface IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name: string;
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines the order of this extension.
         * The loader sorts the extensions using these values when loading.
         */
        order?: number;
    }
    /**
     * Loader state.
     */
    export enum GLTFLoaderState {
        /**
         * The asset is loading.
         */
        LOADING = 0,
        /**
         * The asset is ready for rendering.
         */
        READY = 1,
        /**
         * The asset is completely loaded.
         */
        COMPLETE = 2
    }
    /** @internal */
    export interface IGLTFLoader extends IDisposable {
        importMeshAsync: (meshesNames: string | readonly string[] | null | undefined, scene: Scene, container: Nullable<AssetContainer>, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string) => Promise<ISceneLoaderAsyncResult>;
        loadAsync: (scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string) => Promise<void>;
    }
    /**
     * Adds default/implicit options to extension specific options.
     */
    type DefaultExtensionOptions<BaseExtensionOptions> = {
        /**
         * Defines if the extension is enabled
         */
        enabled?: boolean;
    } & BaseExtensionOptions;
    abstract class GLTFLoaderOptions {
        protected copyFrom(options?: Partial<Readonly<GLTFLoaderOptions>>): void;
        /**
         * Raised when the asset has been parsed
         */
        abstract onParsed?: ((loaderData: IGLTFLoaderData) => void) | undefined;
        /**
         * The coordinate system mode. Defaults to AUTO.
         */
        coordinateSystemMode: GLTFLoaderCoordinateSystemMode;
        /**
         * The animation start mode. Defaults to FIRST.
         */
        animationStartMode: GLTFLoaderAnimationStartMode;
        /**
         * Defines if the loader should load node animations. Defaults to true.
         * NOTE: The animation of this node will still load if the node is also a joint of a skin and `loadSkins` is true.
         */
        loadNodeAnimations: boolean;
        /**
         * Defines if the loader should load skins. Defaults to true.
         */
        loadSkins: boolean;
        /**
         * Defines if the loader should load morph targets. Defaults to true.
         */
        loadMorphTargets: boolean;
        /**
         * Defines if the loader should compile materials before raising the success callback. Defaults to false.
         */
        compileMaterials: boolean;
        /**
         * Defines if the loader should also compile materials with clip planes. Defaults to false.
         */
        useClipPlane: boolean;
        /**
         * Defines if the loader should compile shadow generators before raising the success callback. Defaults to false.
         */
        compileShadowGenerators: boolean;
        /**
         * Defines if the Alpha blended materials are only applied as coverage.
         * If false, (default) The luminance of each pixel will reduce its opacity to simulate the behaviour of most physical materials.
         * If true, no extra effects are applied to transparent pixels.
         */
        transparencyAsCoverage: boolean;
        /**
         * Defines if the loader should use range requests when load binary glTF files from HTTP.
         * Enabling will disable offline support and glTF validator.
         * Defaults to false.
         */
        useRangeRequests: boolean;
        /**
         * Defines if the loader should create instances when multiple glTF nodes point to the same glTF mesh. Defaults to true.
         */
        createInstances: boolean;
        /**
         * Defines if the loader should always compute the bounding boxes of meshes and not use the min/max values from the position accessor. Defaults to false.
         */
        alwaysComputeBoundingBox: boolean;
        /**
         * If true, load all materials defined in the file, even if not used by any mesh. Defaults to false.
         */
        loadAllMaterials: boolean;
        /**
         * If true, load only the materials defined in the file. Defaults to false.
         */
        loadOnlyMaterials: boolean;
        /**
         * If true, do not load any materials defined in the file. Defaults to false.
         */
        skipMaterials: boolean;
        /**
         * If true, load the color (gamma encoded) textures into sRGB buffers (if supported by the GPU), which will yield more accurate results when sampling the texture. Defaults to true.
         */
        useSRGBBuffers: boolean;
        /**
         * When loading glTF animations, which are defined in seconds, target them to this FPS. Defaults to 60.
         */
        targetFps: number;
        /**
         * Defines if the loader should always compute the nearest common ancestor of the skeleton joints instead of using `skin.skeleton`. Defaults to false.
         * Set this to true if loading assets with invalid `skin.skeleton` values.
         */
        alwaysComputeSkeletonRootNode: boolean;
        /**
         * If true, the loader will derive the name for Babylon textures from the glTF texture name, image name, or image url. Defaults to false.
         * Note that it is possible for multiple Babylon textures to share the same name when the Babylon textures load from the same glTF texture or image.
         */
        useGltfTextureNames: boolean;
        /**
         * Function called before loading a url referenced by the asset.
         * @param url url referenced by the asset
         * @returns Async url to load
         */
        preprocessUrlAsync: (url: string) => Promise<string>;
        /**
         * Defines the node to use as the root of the hierarchy when loading the scene (default: undefined). If not defined, a root node will be automatically created.
         * You can also pass null if you don't want a root node to be created.
         */
        customRootNode?: Nullable<TransformNode>;
        /**
         * Callback raised when the loader creates a mesh after parsing the glTF properties of the mesh.
         * Note that the callback is called as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
         */
        abstract onMeshLoaded?: ((mesh: AbstractMesh) => void) | undefined;
        /**
         * Callback raised when the loader creates a skin after parsing the glTF properties of the skin node.
         * @see https://doc.babylonjs.com/features/featuresDeepDive/importers/glTF/glTFSkinning#ignoring-the-transform-of-the-skinned-mesh
         */
        abstract onSkinLoaded?: ((node: TransformNode, skinnedNode: TransformNode) => void) | undefined;
        /**
         * Callback raised when the loader creates a texture after parsing the glTF properties of the texture.
         */
        abstract onTextureLoaded?: ((texture: BaseTexture) => void) | undefined;
        /**
         * Callback raised when the loader creates a material after parsing the glTF properties of the material.
         */
        abstract onMaterialLoaded?: ((material: Material) => void) | undefined;
        /**
         * Callback raised when the loader creates a camera after parsing the glTF properties of the camera.
         */
        abstract onCameraLoaded?: ((camera: Camera) => void) | undefined;
        /**
         * Defines options for glTF extensions.
         */
        extensionOptions: {
            [Extension in keyof GLTFLoaderExtensionOptions]?: {
                [Option in keyof DefaultExtensionOptions<GLTFLoaderExtensionOptions[Extension]>]: DefaultExtensionOptions<GLTFLoaderExtensionOptions[Extension]>[Option];
            };
        };
    }
    /**
     * File loader for loading glTF files into a scene.
     */
    export class GLTFFileLoader extends GLTFLoaderOptions implements IDisposable, ISceneLoaderPluginAsync, ISceneLoaderPluginFactory {
        /** @internal */
        static _CreateGLTF1Loader: (parent: GLTFFileLoader) => IGLTFLoader;
        /** @internal */
        static _CreateGLTF2Loader: (parent: GLTFFileLoader) => IGLTFLoader;
        /**
         * Creates a new glTF file loader.
         * @param options The options for the loader
         */
        constructor(options?: Partial<Readonly<GLTFLoaderOptions>>);
        /**
         * Raised when the asset has been parsed
         */
        onParsedObservable: Observable<IGLTFLoaderData>;
        private _onParsedObserver;
        /**
         * Raised when the asset has been parsed
         */
        set onParsed(callback: ((loaderData: IGLTFLoaderData) => void) | undefined);
        /**
         * Set this property to false to disable incremental loading which delays the loader from calling the success callback until after loading the meshes and shaders.
         * Textures always loads asynchronously. For example, the success callback can compute the bounding information of the loaded meshes when incremental loading is disabled.
         * Defaults to true.
         * @internal
         */
        static IncrementalLoading: boolean;
        /**
         * Set this property to true in order to work with homogeneous coordinates, available with some converters and exporters.
         * Defaults to false. See https://en.wikipedia.org/wiki/Homogeneous_coordinates.
         * @internal
         */
        static HomogeneousCoordinates: boolean;
        /**
         * Observable raised when the loader creates a mesh after parsing the glTF properties of the mesh.
         * Note that the observable is raised as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
         */
        readonly onMeshLoadedObservable: Observable<AbstractMesh>;
        private _onMeshLoadedObserver;
        /**
         * Callback raised when the loader creates a mesh after parsing the glTF properties of the mesh.
         * Note that the callback is called as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
         */
        set onMeshLoaded(callback: ((mesh: AbstractMesh) => void) | undefined);
        /**
         * Observable raised when the loader creates a skin after parsing the glTF properties of the skin node.
         * @see https://doc.babylonjs.com/features/featuresDeepDive/importers/glTF/glTFSkinning#ignoring-the-transform-of-the-skinned-mesh
         * @param node - the transform node that corresponds to the original glTF skin node used for animations
         * @param skinnedNode - the transform node that is the skinned mesh itself or the parent of the skinned meshes
         */
        readonly onSkinLoadedObservable: Observable<{
            node: TransformNode;
            skinnedNode: TransformNode;
        }>;
        private _onSkinLoadedObserver;
        /**
         * Callback raised when the loader creates a skin after parsing the glTF properties of the skin node.
         * @see https://doc.babylonjs.com/features/featuresDeepDive/importers/glTF/glTFSkinning#ignoring-the-transform-of-the-skinned-mesh
         */
        set onSkinLoaded(callback: ((node: TransformNode, skinnedNode: TransformNode) => void) | undefined);
        /**
         * Observable raised when the loader creates a texture after parsing the glTF properties of the texture.
         */
        readonly onTextureLoadedObservable: Observable<BaseTexture>;
        private _onTextureLoadedObserver;
        /**
         * Callback raised when the loader creates a texture after parsing the glTF properties of the texture.
         */
        set onTextureLoaded(callback: ((texture: BaseTexture) => void) | undefined);
        /**
         * Observable raised when the loader creates a material after parsing the glTF properties of the material.
         */
        readonly onMaterialLoadedObservable: Observable<Material>;
        private _onMaterialLoadedObserver;
        /**
         * Callback raised when the loader creates a material after parsing the glTF properties of the material.
         */
        set onMaterialLoaded(callback: ((material: Material) => void) | undefined);
        /**
         * Observable raised when the loader creates a camera after parsing the glTF properties of the camera.
         */
        readonly onCameraLoadedObservable: Observable<Camera>;
        private _onCameraLoadedObserver;
        /**
         * Callback raised when the loader creates a camera after parsing the glTF properties of the camera.
         */
        set onCameraLoaded(callback: ((camera: Camera) => void) | undefined);
        /**
         * Observable raised when the asset is completely loaded, immediately before the loader is disposed.
         * For assets with LODs, raised when all of the LODs are complete.
         * For assets without LODs, raised when the model is complete, immediately after the loader resolves the returned promise.
         */
        readonly onCompleteObservable: Observable<void>;
        private _onCompleteObserver;
        /**
         * Callback raised when the asset is completely loaded, immediately before the loader is disposed.
         * For assets with LODs, raised when all of the LODs are complete.
         * For assets without LODs, raised when the model is complete, immediately after the loader resolves the returned promise.
         */
        set onComplete(callback: () => void);
        /**
         * Observable raised when an error occurs.
         */
        readonly onErrorObservable: Observable<any>;
        private _onErrorObserver;
        /**
         * Callback raised when an error occurs.
         */
        set onError(callback: (reason: any) => void);
        /**
         * Observable raised after the loader is disposed.
         */
        readonly onDisposeObservable: Observable<void>;
        private _onDisposeObserver;
        /**
         * Callback raised after the loader is disposed.
         */
        set onDispose(callback: () => void);
        /**
         * Observable raised after a loader extension is created.
         * Set additional options for a loader extension in this event.
         */
        readonly onExtensionLoadedObservable: Observable<IGLTFLoaderExtension>;
        private _onExtensionLoadedObserver;
        /**
         * Callback raised after a loader extension is created.
         */
        set onExtensionLoaded(callback: (extension: IGLTFLoaderExtension) => void);
        /**
         * Defines if the loader logging is enabled.
         */
        get loggingEnabled(): boolean;
        set loggingEnabled(value: boolean);
        /**
         * Defines if the loader should capture performance counters.
         */
        get capturePerformanceCounters(): boolean;
        set capturePerformanceCounters(value: boolean);
        /**
         * Defines if the loader should validate the asset.
         */
        validate: boolean;
        /**
         * Observable raised after validation when validate is set to true. The event data is the result of the validation.
         */
        readonly onValidatedObservable: Observable<GLTF2.IGLTFValidationResults>;
        private _onValidatedObserver;
        /**
         * Callback raised after a loader extension is created.
         */
        set onValidated(callback: (results: GLTF2.IGLTFValidationResults) => void);
        private _loader;
        private _state;
        private _progressCallback?;
        private _requests;
        /**
         * Name of the loader ("gltf")
         */
        readonly name: "gltf";
        /** @internal */
        readonly extensions: {
            readonly ".gltf": {
                readonly isBinary: false;
                readonly mimeType: "model/gltf+json";
            };
            readonly ".glb": {
                readonly isBinary: true;
                readonly mimeType: "model/gltf-binary";
            };
        };
        /**
         * Disposes the loader, releases resources during load, and cancels any outstanding requests.
         */
        dispose(): void;
        /**
         * @internal
         */
        loadFile(scene: Scene, fileOrUrl: File | string | ArrayBufferView, rootUrl: string, onSuccess: (data: unknown, responseURL?: string) => void, onProgress?: (ev: ISceneLoaderProgressEvent) => void, useArrayBuffer?: boolean, onError?: (request?: WebRequest, exception?: LoadFileError) => void, name?: string): Nullable<IFileRequest>;
        private _loadBinary;
        /**
         * @internal
         */
        importMeshAsync(meshesNames: string | readonly string[] | null | undefined, scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<ISceneLoaderAsyncResult>;
        /**
         * @internal
         */
        loadAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<void>;
        /**
         * @internal
         */
        loadAssetContainerAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<AssetContainer>;
        /**
         * @internal
         */
        canDirectLoad(data: string): boolean;
        /**
         * @internal
         */
        directLoad(scene: Scene, data: string): Promise<Object>;
        /**
         * The callback that allows custom handling of the root url based on the response url.
         * @param rootUrl the original root url
         * @param responseURL the response url if available
         * @returns the new root url
         */
        rewriteRootURL?(rootUrl: string, responseURL?: string): string;
        /** @internal */
        createPlugin(options: SceneLoaderPluginOptions): ISceneLoaderPluginAsync;
        /**
         * The loader state or null if the loader is not active.
         */
        get loaderState(): Nullable<GLTFLoaderState>;
        /**
         * Observable raised when the loader state changes.
         */
        onLoaderStateChangedObservable: Observable<Nullable<GLTFLoaderState>>;
        /**
         * Returns a promise that resolves when the asset is completely loaded.
         * @returns a promise that resolves when the asset is completely loaded.
         */
        whenCompleteAsync(): Promise<void>;
        /**
         * @internal
         */
        _setState(state: GLTFLoaderState): void;
        /**
         * @internal
         */
        _loadFile(scene: Scene, fileOrUrl: File | string, onSuccess: (data: string | ArrayBuffer) => void, useArrayBuffer?: boolean, onError?: (request?: WebRequest) => void, onOpened?: (request: WebRequest) => void): IFileRequest;
        private _onProgress;
        private _validate;
        private _getLoader;
        private _parseJson;
        private _unpackBinaryAsync;
        private _unpackBinaryV1Async;
        private _unpackBinaryV2Async;
        private static _parseVersion;
        private static _compareVersion;
        private static readonly _logSpaces;
        private _logIndentLevel;
        private _loggingEnabled;
        /** @internal */
        _log: (message: string) => void;
        /**
         * @internal
         */
        _logOpen(message: string): void;
        /** @internal */
        _logClose(): void;
        private _logEnabled;
        private _logDisabled;
        private _capturePerformanceCounters;
        /** @internal */
        _startPerformanceCounter: (counterName: string) => void;
        /** @internal */
        _endPerformanceCounter: (counterName: string) => void;
        private _startPerformanceCounterEnabled;
        private _startPerformanceCounterDisabled;
        private _endPerformanceCounterEnabled;
        private _endPerformanceCounterDisabled;
    }




    /**
     * Loader interface with an index field.
     */
    export interface IArrayItem {
        /**
         * The index of this item in the array.
         */
        index: number;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IAccessor extends GLTF2.IAccessor, IArrayItem {
        /** @internal */
        _data?: Promise<ArrayBufferView>;
        /** @internal */
        _babylonVertexBuffer?: {
            [kind: string]: Promise<VertexBuffer>;
        };
    }
    /**
     * Loader interface with additional members.
     */
    export interface IAnimationChannel extends GLTF2.IAnimationChannel, IArrayItem {
    }
    /** @internal */
    export interface _IAnimationSamplerData {
        /** @internal */
        input: Float32Array;
        /** @internal */
        interpolation: GLTF2.AnimationSamplerInterpolation;
        /** @internal */
        output: Float32Array;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IAnimationSampler extends GLTF2.IAnimationSampler, IArrayItem {
        /** @internal */
        _data?: Promise<_IAnimationSamplerData>;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IAnimation extends GLTF2.IAnimation, IArrayItem {
        /** @internal */
        channels: IAnimationChannel[];
        /** @internal */
        samplers: IAnimationSampler[];
        /** @internal */
        _babylonAnimationGroup?: AnimationGroup;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IBuffer extends GLTF2.IBuffer, IArrayItem {
        /** @internal */
        _data?: Promise<ArrayBufferView>;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IBufferView extends GLTF2.IBufferView, IArrayItem {
        /** @internal */
        _data?: Promise<ArrayBufferView>;
        /** @internal */
        _babylonBuffer?: Promise<Buffer>;
    }
    /**
     * Loader interface with additional members.
     */
    export interface ICamera extends GLTF2.ICamera, IArrayItem {
        /** @internal */
        _babylonCamera?: Camera;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IImage extends GLTF2.IImage, IArrayItem {
        /** @internal */
        _data?: Promise<ArrayBufferView>;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IMaterialNormalTextureInfo extends GLTF2.IMaterialNormalTextureInfo, ITextureInfo {
    }
    /**
     * Loader interface with additional members.
     */
    export interface IMaterialOcclusionTextureInfo extends GLTF2.IMaterialOcclusionTextureInfo, ITextureInfo {
    }
    /**
     * Loader interface with additional members.
     */
    export interface IMaterialPbrMetallicRoughness extends GLTF2.IMaterialPbrMetallicRoughness {
        /** @internal */
        baseColorTexture?: ITextureInfo;
        /** @internal */
        metallicRoughnessTexture?: ITextureInfo;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IMaterial extends GLTF2.IMaterial, IArrayItem {
        /** @internal */
        pbrMetallicRoughness?: IMaterialPbrMetallicRoughness;
        /** @internal */
        normalTexture?: IMaterialNormalTextureInfo;
        /** @internal */
        occlusionTexture?: IMaterialOcclusionTextureInfo;
        /** @internal */
        emissiveTexture?: ITextureInfo;
        /** @internal */
        _data?: {
            [babylonDrawMode: number]: {
                babylonMaterial: Material;
                babylonMeshes: AbstractMesh[];
                promise: Promise<void>;
            };
        };
    }
    /**
     * Loader interface with additional members.
     */
    export interface IMesh extends GLTF2.IMesh, IArrayItem {
        /** @internal */
        primitives: IMeshPrimitive[];
    }
    /**
     * Loader interface with additional members.
     */
    export interface IMeshPrimitive extends GLTF2.IMeshPrimitive, IArrayItem {
        /** @internal */
        _instanceData?: {
            babylonSourceMesh: Mesh;
            promise: Promise<any>;
        };
    }
    /**
     * Loader interface with additional members.
     */
    export interface INode extends GLTF2.INode, IArrayItem {
        /** @internal */
        parent?: INode;
        /** @internal */
        _babylonTransformNode?: TransformNode;
        /** @internal */
        _babylonTransformNodeForSkin?: TransformNode;
        /** @internal */
        _primitiveBabylonMeshes?: AbstractMesh[];
        /** @internal */
        _numMorphTargets?: number;
        /** @internal */
        _isJoint?: boolean;
    }
    /** @internal */
    export interface _ISamplerData {
        /** @internal */
        noMipMaps: boolean;
        /** @internal */
        samplingMode: number;
        /** @internal */
        wrapU: number;
        /** @internal */
        wrapV: number;
    }
    /**
     * Loader interface with additional members.
     */
    export interface ISampler extends GLTF2.ISampler, IArrayItem {
        /** @internal */
        _data?: _ISamplerData;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IScene extends GLTF2.IScene, IArrayItem {
    }
    /**
     * Loader interface with additional members.
     */
    export interface ISkin extends GLTF2.ISkin, IArrayItem {
        /** @internal */
        _data?: {
            babylonSkeleton: Skeleton;
            promise: Promise<void>;
        };
    }
    /**
     * Loader interface with additional members.
     */
    export interface ITexture extends GLTF2.ITexture, IArrayItem {
        /** @internal */
        _textureInfo: ITextureInfo;
    }
    /**
     * Loader interface with additional members.
     */
    export interface ITextureInfo extends GLTF2.ITextureInfo {
        /** false or undefined if the texture holds color data (true if data are roughness, normal, ...) */
        nonColorData?: boolean;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IGLTF extends GLTF2.IGLTF {
        /** @internal */
        accessors?: IAccessor[];
        /** @internal */
        animations?: IAnimation[];
        /** @internal */
        buffers?: IBuffer[];
        /** @internal */
        bufferViews?: IBufferView[];
        /** @internal */
        cameras?: ICamera[];
        /** @internal */
        images?: IImage[];
        /** @internal */
        materials?: IMaterial[];
        /** @internal */
        meshes?: IMesh[];
        /** @internal */
        nodes?: INode[];
        /** @internal */
        samplers?: ISampler[];
        /** @internal */
        scenes?: IScene[];
        /** @internal */
        skins?: ISkin[];
        /** @internal */
        textures?: ITexture[];
    }
    /**
     * Loader interface with additional members.
     */
    /** @internal */
    export interface IKHRLightsPunctual_Light extends GLTF2.IKHRLightsPunctual_Light, IArrayItem {
        /** @hidden */
        _babylonLight?: Light;
    }
    /** @internal */
    export interface IEXTLightsIES_Light extends GLTF2.IEXTLightsIES_Light, IArrayItem {
        /** @hidden */
        _babylonLight?: Light;
    }


    interface IRegisteredGLTFExtension {
        isGLTFExtension: boolean;
        factory: GLTFExtensionFactory;
    }
    export type GLTFExtensionFactory = (loader: GLTFLoader) => IGLTFLoaderExtension | Promise<IGLTFLoaderExtension>;
    /**
     * All currently registered glTF 2.0 loader extensions.
     */
    export var registeredGLTFExtensions: ReadonlyMap<string, Readonly<IRegisteredGLTFExtension>>;
    /**
     * Registers a loader extension.
     * @param name The name of the loader extension.
     * @param isGLTFExtension If the loader extension is a glTF extension, then it will only be used for glTF files that use the corresponding glTF extension. Otherwise, it will be used for all loaded glTF files.
     * @param factory The factory function that creates the loader extension.
     */
    export function registerGLTFExtension(name: string, isGLTFExtension: boolean, factory: GLTFExtensionFactory): void;
    /**
     * Unregisters a loader extension.
     * @param name The name of the loader extension.
     * @returns A boolean indicating whether the extension has been unregistered
     */
    export function unregisterGLTFExtension(name: string): boolean;


    /**
     * Interface for a glTF loader extension.
     */
    export interface IGLTFLoaderExtension extends BABYLON.IGLTFLoaderExtension, IDisposable {
        /**
         * Called after the loader state changes to LOADING.
         */
        onLoading?(): void;
        /**
         * Called after the loader state changes to READY.
         */
        onReady?(): void;
        /**
         * Define this method to modify the default behavior when loading scenes.
         * @param context The context when loading the asset
         * @param scene The glTF scene property
         * @returns A promise that resolves when the load is complete or null if not handled
         */
        loadSceneAsync?(context: string, scene: IScene): Nullable<Promise<void>>;
        /**
         * Define this method to modify the default behavior when loading nodes.
         * @param context The context when loading the asset
         * @param node The glTF node property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded Babylon transform node when the load is complete or null if not handled
         */
        loadNodeAsync?(context: string, node: INode, assign: (babylonMesh: TransformNode) => void): Nullable<Promise<TransformNode>>;
        /**
         * Define this method to modify the default behavior when loading cameras.
         * @param context The context when loading the asset
         * @param camera The glTF camera property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded Babylon camera when the load is complete or null if not handled
         */
        loadCameraAsync?(context: string, camera: ICamera, assign: (babylonCamera: Camera) => void): Nullable<Promise<Camera>>;
        /**
         * @internal
         * Define this method to modify the default behavior when loading vertex data for mesh primitives.
         * @param context The context when loading the asset
         * @param primitive The glTF mesh primitive property
         * @returns A promise that resolves with the loaded geometry when the load is complete or null if not handled
         */
        _loadVertexDataAsync?(context: string, primitive: IMeshPrimitive, babylonMesh: Mesh): Nullable<Promise<Geometry>>;
        /**
         * @internal
         * Define this method to modify the default behavior when loading data for mesh primitives.
         * @param context The context when loading the asset
         * @param name The mesh name when loading the asset
         * @param node The glTF node when loading the asset
         * @param mesh The glTF mesh when loading the asset
         * @param primitive The glTF mesh primitive property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded mesh when the load is complete or null if not handled
         */
        _loadMeshPrimitiveAsync?(context: string, name: string, node: INode, mesh: IMesh, primitive: IMeshPrimitive, assign: (babylonMesh: AbstractMesh) => void): Nullable<Promise<AbstractMesh>>;
        /**
         * @internal
         * Define this method to modify the default behavior when loading materials. Load material creates the material and then loads material properties.
         * @param context The context when loading the asset
         * @param material The glTF material property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded Babylon material when the load is complete or null if not handled
         */
        _loadMaterialAsync?(context: string, material: IMaterial, babylonMesh: Nullable<Mesh>, babylonDrawMode: number, assign: (babylonMaterial: Material) => void): Nullable<Promise<Material>>;
        /**
         * Define this method to modify the default behavior when creating materials.
         * @param context The context when loading the asset
         * @param material The glTF material property
         * @param babylonDrawMode The draw mode for the Babylon material
         * @returns The Babylon material or null if not handled
         */
        createMaterial?(context: string, material: IMaterial, babylonDrawMode: number): Nullable<Material>;
        /**
         * Define this method to modify the default behavior when loading material properties.
         * @param context The context when loading the asset
         * @param material The glTF material property
         * @param babylonMaterial The Babylon material
         * @returns A promise that resolves when the load is complete or null if not handled
         */
        loadMaterialPropertiesAsync?(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        /**
         * Define this method to modify the default behavior when loading texture infos.
         * @param context The context when loading the asset
         * @param textureInfo The glTF texture info property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded Babylon texture when the load is complete or null if not handled
         */
        loadTextureInfoAsync?(context: string, textureInfo: ITextureInfo, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
        /**
         * @internal
         * Define this method to modify the default behavior when loading textures.
         * @param context The context when loading the asset
         * @param texture The glTF texture property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded Babylon texture when the load is complete or null if not handled
         */
        _loadTextureAsync?(context: string, texture: ITexture, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
        /**
         * Define this method to modify the default behavior when loading animations.
         * @param context The context when loading the asset
         * @param animation The glTF animation property
         * @returns A promise that resolves with the loaded Babylon animation group when the load is complete or null if not handled
         */
        loadAnimationAsync?(context: string, animation: IAnimation): Nullable<Promise<AnimationGroup>>;
        /**
         * @internal
         * Define this method to modify the default behvaior when loading animation channels.
         * @param context The context when loading the asset
         * @param animationContext The context of the animation when loading the asset
         * @param animation The glTF animation property
         * @param channel The glTF animation channel property
         * @param onLoad Called for each animation loaded
         * @returns A void promise that resolves when the load is complete or null if not handled
         */
        _loadAnimationChannelAsync?(context: string, animationContext: string, animation: IAnimation, channel: IAnimationChannel, onLoad: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): Nullable<Promise<void>>;
        /**
         * @internal
         * Define this method to modify the default behavior when loading skins.
         * @param context The context when loading the asset
         * @param node The glTF node property
         * @param skin The glTF skin property
         * @returns A promise that resolves when the load is complete or null if not handled
         */
        _loadSkinAsync?(context: string, node: INode, skin: ISkin): Nullable<Promise<void>>;
        /**
         * @internal
         * Define this method to modify the default behavior when loading uris.
         * @param context The context when loading the asset
         * @param property The glTF property associated with the uri
         * @param uri The uri to load
         * @returns A promise that resolves with the loaded data when the load is complete or null if not handled
         */
        _loadUriAsync?(context: string, property: BABYLON.GLTF2.IProperty, uri: string): Nullable<Promise<ArrayBufferView>>;
        /**
         * Define this method to modify the default behavior when loading buffer views.
         * @param context The context when loading the asset
         * @param bufferView The glTF buffer view property
         * @returns A promise that resolves with the loaded data when the load is complete or null if not handled
         */
        loadBufferViewAsync?(context: string, bufferView: IBufferView): Nullable<Promise<ArrayBufferView>>;
        /**
         * Define this method to modify the default behavior when loading buffers.
         * @param context The context when loading the asset
         * @param buffer The glTF buffer property
         * @param byteOffset The byte offset to load
         * @param byteLength The byte length to load
         * @returns A promise that resolves with the loaded data when the load is complete or null if not handled
         */
        loadBufferAsync?(context: string, buffer: IBuffer, byteOffset: number, byteLength: number): Nullable<Promise<ArrayBufferView>>;
    }


    /** @internal */
    export type GetValueFn = (target: any, source: Float32Array, offset: number, scale: number) => any;
    /** @internal */
    export function getVector3(_target: any, source: Float32Array, offset: number, scale: number): Vector3;
    /** @internal */
    export function getQuaternion(_target: any, source: Float32Array, offset: number, scale: number): Quaternion;
    /** @internal */
    export function getWeights(target: INode, source: Float32Array, offset: number, scale: number): Array<number>;
    /** @internal */
    export abstract class AnimationPropertyInfo {
        readonly type: number;
        readonly name: string;
        readonly getValue: GetValueFn;
        readonly getStride: (target: any) => number;
        /** @internal */
        constructor(type: number, name: string, getValue: GetValueFn, getStride: (target: any) => number);
        protected _buildAnimation(name: string, fps: number, keys: any[]): Animation;
        /** @internal */
        abstract buildAnimations(target: any, name: string, fps: number, keys: any[], callback: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): void;
    }
    /** @internal */
    export class TransformNodeAnimationPropertyInfo extends AnimationPropertyInfo {
        /** @internal */
        buildAnimations(target: INode, name: string, fps: number, keys: any[], callback: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): void;
    }
    /** @internal */
    export class WeightAnimationPropertyInfo extends AnimationPropertyInfo {
        buildAnimations(target: INode, name: string, fps: number, keys: any[], callback: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): void;
    }
    /** @internal */
    export var nodeAnimationData: {
        translation: TransformNodeAnimationPropertyInfo[];
        rotation: TransformNodeAnimationPropertyInfo[];
        scale: TransformNodeAnimationPropertyInfo[];
        weights: WeightAnimationPropertyInfo[];
    };


    interface IWithMetadata {
        metadata: any;
        _internalMetadata: any;
    }
    /**
     * Helper class for working with arrays when loading the glTF asset
     */
    export class ArrayItem {
        /**
         * Gets an item from the given array.
         * @param context The context when loading the asset
         * @param array The array to get the item from
         * @param index The index to the array
         * @returns The array item
         */
        static Get<T>(context: string, array: ArrayLike<T> | undefined, index: number | undefined): T;
        /**
         * Gets an item from the given array or returns null if not available.
         * @param array The array to get the item from
         * @param index The index to the array
         * @returns The array item or null
         */
        static TryGet<T>(array: ArrayLike<T> | undefined, index: number | undefined): Nullable<T>;
        /**
         * Assign an `index` field to each item of the given array.
         * @param array The array of items
         */
        static Assign(array?: IArrayItem[]): void;
    }
    /** @internal */
    export interface IAnimationTargetInfo {
        /** @internal */
        target: unknown;
        /** @internal */
        properties: Array<AnimationPropertyInfo>;
    }
    /** @internal */
    export function LoadBoundingInfoFromPositionAccessor(accessor: IAccessor): Nullable<BoundingInfo>;
    /**
     * The glTF 2.0 loader
     */
    export class GLTFLoader implements IGLTFLoader {
        /** @internal */
        readonly _completePromises: Promise<unknown>[];
        /** @internal */
        _assetContainer: Nullable<AssetContainer>;
        /** Storage */
        _babylonLights: Light[];
        /** @internal */
        _disableInstancedMesh: number;
        /** @internal */
        _allMaterialsDirtyRequired: boolean;
        private readonly _parent;
        private readonly _extensions;
        private _disposed;
        private _rootUrl;
        private _fileName;
        private _uniqueRootUrl;
        private _gltf;
        private _bin;
        private _babylonScene;
        private _rootBabylonMesh;
        private _defaultBabylonMaterialData;
        private readonly _postSceneLoadActions;
        /**
         * The default glTF sampler.
         */
        static readonly DefaultSampler: ISampler;
        /**
         * Registers a loader extension.
         * @param name The name of the loader extension.
         * @param factory The factory function that creates the loader extension.
         * @deprecated Please use registerGLTFExtension instead.
         */
        static RegisterExtension(name: string, factory: GLTFExtensionFactory): void;
        /**
         * Unregisters a loader extension.
         * @param name The name of the loader extension.
         * @returns A boolean indicating whether the extension has been unregistered
         * @deprecated Please use unregisterGLTFExtension instead.
         */
        static UnregisterExtension(name: string): boolean;
        /**
         * The object that represents the glTF JSON.
         */
        get gltf(): IGLTF;
        /**
         * The BIN chunk of a binary glTF.
         */
        get bin(): Nullable<IDataBuffer>;
        /**
         * The parent file loader.
         */
        get parent(): GLTFFileLoader;
        /**
         * The Babylon scene when loading the asset.
         */
        get babylonScene(): Scene;
        /**
         * The root Babylon node when loading the asset.
         */
        get rootBabylonMesh(): Nullable<TransformNode>;
        /**
         * The root url when loading the asset.
         */
        get rootUrl(): Nullable<string>;
        /**
         * @internal
         */
        constructor(parent: GLTFFileLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        importMeshAsync(meshesNames: string | readonly string[] | null | undefined, scene: Scene, container: Nullable<AssetContainer>, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<ISceneLoaderAsyncResult>;
        /**
         * @internal
         */
        loadAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<void>;
        private _loadAsync;
        private _loadData;
        private _setupData;
        private _loadExtensionsAsync;
        private _createRootNode;
        /**
         * Loads a glTF scene.
         * @param context The context when loading the asset
         * @param scene The glTF scene property
         * @returns A promise that resolves when the load is complete
         */
        loadSceneAsync(context: string, scene: IScene): Promise<void>;
        private _forEachPrimitive;
        private _getGeometries;
        private _getMeshes;
        private _getTransformNodes;
        private _getSkeletons;
        private _getAnimationGroups;
        private _startAnimations;
        /**
         * Loads a glTF node.
         * @param context The context when loading the asset
         * @param node The glTF node property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded Babylon mesh when the load is complete
         */
        loadNodeAsync(context: string, node: INode, assign?: (babylonTransformNode: TransformNode) => void): Promise<TransformNode>;
        private _loadMeshAsync;
        /**
         * @internal Define this method to modify the default behavior when loading data for mesh primitives.
         * @param context The context when loading the asset
         * @param name The mesh name when loading the asset
         * @param node The glTF node when loading the asset
         * @param mesh The glTF mesh when loading the asset
         * @param primitive The glTF mesh primitive property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded mesh when the load is complete or null if not handled
         */
        _loadMeshPrimitiveAsync(context: string, name: string, node: INode, mesh: IMesh, primitive: IMeshPrimitive, assign: (babylonMesh: AbstractMesh) => void): Promise<AbstractMesh>;
        private _loadVertexDataAsync;
        private _createMorphTargets;
        private _loadMorphTargetsAsync;
        private _loadMorphTargetVertexDataAsync;
        private static _LoadTransform;
        private _loadSkinAsync;
        private _loadBones;
        private _findSkeletonRootNode;
        private _loadBone;
        private _loadSkinInverseBindMatricesDataAsync;
        private _updateBoneMatrices;
        private _getNodeMatrix;
        /**
         * Loads a glTF camera.
         * @param context The context when loading the asset
         * @param camera The glTF camera property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded Babylon camera when the load is complete
         */
        loadCameraAsync(context: string, camera: ICamera, assign?: (babylonCamera: Camera) => void): Promise<Camera>;
        private _loadAnimationsAsync;
        /**
         * Loads a glTF animation.
         * @param context The context when loading the asset
         * @param animation The glTF animation property
         * @returns A promise that resolves with the loaded Babylon animation group when the load is complete
         */
        loadAnimationAsync(context: string, animation: IAnimation): Promise<AnimationGroup>;
        /**
         * @hidden
         * Loads a glTF animation channel.
         * @param context The context when loading the asset
         * @param animationContext The context of the animation when loading the asset
         * @param animation The glTF animation property
         * @param channel The glTF animation channel property
         * @param onLoad Called for each animation loaded
         * @returns A void promise that resolves when the load is complete
         */
        _loadAnimationChannelAsync(context: string, animationContext: string, animation: IAnimation, channel: IAnimationChannel, onLoad: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): Promise<void>;
        /**
         * @hidden
         * Loads a glTF animation channel.
         * @param context The context when loading the asset
         * @param animationContext The context of the animation when loading the asset
         * @param animation The glTF animation property
         * @param channel The glTF animation channel property
         * @param targetInfo The glTF target and properties
         * @param onLoad Called for each animation loaded
         * @returns A void promise that resolves when the load is complete
         */
        _loadAnimationChannelFromTargetInfoAsync(context: string, animationContext: string, animation: IAnimation, channel: IAnimationChannel, targetInfo: IObjectInfo<AnimationPropertyInfo[]>, onLoad: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): Promise<void>;
        private _loadAnimationSamplerAsync;
        /**
         * Loads a glTF buffer.
         * @param context The context when loading the asset
         * @param buffer The glTF buffer property
         * @param byteOffset The byte offset to use
         * @param byteLength The byte length to use
         * @returns A promise that resolves with the loaded data when the load is complete
         */
        loadBufferAsync(context: string, buffer: IBuffer, byteOffset: number, byteLength: number): Promise<ArrayBufferView>;
        /**
         * Loads a glTF buffer view.
         * @param context The context when loading the asset
         * @param bufferView The glTF buffer view property
         * @returns A promise that resolves with the loaded data when the load is complete
         */
        loadBufferViewAsync(context: string, bufferView: IBufferView): Promise<ArrayBufferView>;
        private _loadAccessorAsync;
        /**
         * @internal
         */
        _loadFloatAccessorAsync(context: string, accessor: IAccessor): Promise<Float32Array>;
        /**
         * @internal
         */
        _loadIndicesAccessorAsync(context: string, accessor: IAccessor): Promise<IndicesArray>;
        /**
         * @internal
         */
        _loadVertexBufferViewAsync(bufferView: IBufferView): Promise<Buffer>;
        /**
         * @internal
         */
        _loadVertexAccessorAsync(context: string, accessor: IAccessor, kind: string): Promise<VertexBuffer>;
        private _loadMaterialMetallicRoughnessPropertiesAsync;
        /**
         * @internal
         */
        _loadMaterialAsync(context: string, material: IMaterial, babylonMesh: Nullable<Mesh>, babylonDrawMode: number, assign?: (babylonMaterial: Material) => void): Promise<Material>;
        private _createDefaultMaterial;
        /**
         * Creates a Babylon material from a glTF material.
         * @param context The context when loading the asset
         * @param material The glTF material property
         * @param babylonDrawMode The draw mode for the Babylon material
         * @returns The Babylon material
         */
        createMaterial(context: string, material: IMaterial, babylonDrawMode: number): Material;
        /**
         * Loads properties from a glTF material into a Babylon material.
         * @param context The context when loading the asset
         * @param material The glTF material property
         * @param babylonMaterial The Babylon material
         * @returns A promise that resolves when the load is complete
         */
        loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Promise<void>;
        /**
         * Loads the normal, occlusion, and emissive properties from a glTF material into a Babylon material.
         * @param context The context when loading the asset
         * @param material The glTF material property
         * @param babylonMaterial The Babylon material
         * @returns A promise that resolves when the load is complete
         */
        loadMaterialBasePropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Promise<void>;
        /**
         * Loads the alpha properties from a glTF material into a Babylon material.
         * Must be called after the setting the albedo texture of the Babylon material when the material has an albedo texture.
         * @param context The context when loading the asset
         * @param material The glTF material property
         * @param babylonMaterial The Babylon material
         */
        loadMaterialAlphaProperties(context: string, material: IMaterial, babylonMaterial: Material): void;
        /**
         * Loads a glTF texture info.
         * @param context The context when loading the asset
         * @param textureInfo The glTF texture info property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded Babylon texture when the load is complete
         */
        loadTextureInfoAsync(context: string, textureInfo: ITextureInfo, assign?: (babylonTexture: BaseTexture) => void): Promise<BaseTexture>;
        /**
         * @internal
         */
        _loadTextureAsync(context: string, texture: ITexture, assign?: (babylonTexture: BaseTexture) => void): Promise<BaseTexture>;
        /**
         * @internal
         */
        _createTextureAsync(context: string, sampler: ISampler, image: IImage, assign?: (babylonTexture: BaseTexture) => void, textureLoaderOptions?: unknown, useSRGBBuffer?: boolean): Promise<BaseTexture>;
        private _loadSampler;
        /**
         * Loads a glTF image.
         * @param context The context when loading the asset
         * @param image The glTF image property
         * @returns A promise that resolves with the loaded data when the load is complete
         */
        loadImageAsync(context: string, image: IImage): Promise<ArrayBufferView>;
        /**
         * Loads a glTF uri.
         * @param context The context when loading the asset
         * @param property The glTF property associated with the uri
         * @param uri The base64 or relative uri
         * @returns A promise that resolves with the loaded data when the load is complete
         */
        loadUriAsync(context: string, property: BABYLON.GLTF2.IProperty, uri: string): Promise<ArrayBufferView>;
        /**
         * Adds a JSON pointer to the _internalMetadata of the Babylon object at `<object>._internalMetadata.gltf.pointers`.
         * @param babylonObject the Babylon object with _internalMetadata
         * @param pointer the JSON pointer
         */
        static AddPointerMetadata(babylonObject: IWithMetadata, pointer: string): void;
        private static _GetTextureWrapMode;
        private static _GetTextureSamplingMode;
        private static _GetTypedArrayConstructor;
        private static _GetTypedArray;
        private static _GetNumComponents;
        private static _ValidateUri;
        /**
         * @internal
         */
        static _GetDrawMode(context: string, mode: number | undefined): number;
        private _compileMaterialsAsync;
        private _compileShadowGeneratorsAsync;
        private _forEachExtensions;
        private _applyExtensions;
        private _extensionsOnLoading;
        private _extensionsOnReady;
        private _extensionsLoadSceneAsync;
        private _extensionsLoadNodeAsync;
        private _extensionsLoadCameraAsync;
        private _extensionsLoadVertexDataAsync;
        private _extensionsLoadMeshPrimitiveAsync;
        private _extensionsLoadMaterialAsync;
        private _extensionsCreateMaterial;
        private _extensionsLoadMaterialPropertiesAsync;
        private _extensionsLoadTextureInfoAsync;
        private _extensionsLoadTextureAsync;
        private _extensionsLoadAnimationAsync;
        private _extensionsLoadAnimationChannelAsync;
        private _extensionsLoadSkinAsync;
        private _extensionsLoadUriAsync;
        private _extensionsLoadBufferViewAsync;
        private _extensionsLoadBufferAsync;
        /**
         * Helper method called by a loader extension to load an glTF extension.
         * @param context The context when loading the asset
         * @param property The glTF property to load the extension from
         * @param extensionName The name of the extension to load
         * @param actionAsync The action to run
         * @returns The promise returned by actionAsync or null if the extension does not exist
         */
        static LoadExtensionAsync<TExtension = unknown, TResult = void>(context: string, property: BABYLON.GLTF2.IProperty, extensionName: string, actionAsync: (extensionContext: string, extension: TExtension) => Nullable<Promise<TResult>>): Nullable<Promise<TResult>>;
        /**
         * Helper method called by a loader extension to load a glTF extra.
         * @param context The context when loading the asset
         * @param property The glTF property to load the extra from
         * @param extensionName The name of the extension to load
         * @param actionAsync The action to run
         * @returns The promise returned by actionAsync or null if the extra does not exist
         */
        static LoadExtraAsync<TExtra = unknown, TResult = void>(context: string, property: BABYLON.GLTF2.IProperty, extensionName: string, actionAsync: (extraContext: string, extra: TExtra) => Nullable<Promise<TResult>>): Nullable<Promise<TResult>>;
        /**
         * Checks for presence of an extension.
         * @param name The name of the extension to check
         * @returns A boolean indicating the presence of the given extension name in `extensionsUsed`
         */
        isExtensionUsed(name: string): boolean;
        /**
         * Increments the indentation level and logs a message.
         * @param message The message to log
         */
        logOpen(message: string): void;
        /**
         * Decrements the indentation level.
         */
        logClose(): void;
        /**
         * Logs a message
         * @param message The message to log
         */
        log(message: string): void;
        /**
         * Starts a performance counter.
         * @param counterName The name of the performance counter
         */
        startPerformanceCounter(counterName: string): void;
        /**
         * Ends a performance counter.
         * @param counterName The name of the performance counter
         */
        endPerformanceCounter(counterName: string): void;
    }


    export var gltfToFlowGraphTypeMap: {
        [key: string]: string;
    };
    export var gltfTypeToBabylonType: any;


    /**
     * Class to convert an interactivity pointer path to a smart object
     */
    export class InteractivityPathToObjectConverter extends GLTFPathToObjectConverter<IObjectAccessor> {
        constructor(gltf: IGLTF);
    }


    /**
     * @internal
     * Converts a glTF Interactivity Extension to a serialized flow graph.
     * @param gltf the interactivity data
     * @returns a serialized flow graph
     */
    export function convertGLTFToSerializedFlowGraph(gltf: BABYLON.GLTF2.IKHRInteractivity): ISerializedFlowGraph;




    /**
     * A converter that takes a glTF Object Model JSON Pointer
     * and transforms it into an ObjectAccessorContainer, allowing
     * objects referenced in the glTF to be associated with their
     * respective Babylon.js objects.
     */
    export class GLTFPathToObjectConverter<T> implements IPathToObjectConverter<T> {
        private _gltf;
        private _infoTree;
        constructor(_gltf: IGLTF, _infoTree: any);
        /**
         * The pointer string is represented by a [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901).
         * <animationPointer> := /<rootNode>/<assetIndex>/<propertyPath>
         * <rootNode> := "nodes" | "materials" | "meshes" | "cameras" | "extensions"
         * <assetIndex> := <digit> | <name>
         * <propertyPath> := <extensionPath> | <standardPath>
         * <extensionPath> := "extensions"/<name>/<standardPath>
         * <standardPath> := <name> | <name>/<standardPath>
         * <name> := W+
         * <digit> := D+
         *
         * Examples:
         *  - "/nodes/0/rotation"
         *  - "/materials/2/emissiveFactor"
         *  - "/materials/2/pbrMetallicRoughness/baseColorFactor"
         *  - "/materials/2/extensions/KHR_materials_emissive_strength/emissiveStrength"
         *
         * @param path The path to convert
         * @returns The object and info associated with the path
         */
        convert(path: string): IObjectInfo<T>;
    }


    /**
     * Registers the built-in glTF 2.0 extension async factories, which dynamically imports and loads each glTF extension on demand (e.g. only when a glTF model uses the extension).
     */
    export function registerBuiltInGLTFExtensions(): void;


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the MSFT_sRGBFactors extension.
             */
            ["MSFT_sRGBFactors"]: {};
        }
    /** @internal */
    export class MSFT_sRGBFactors implements IGLTFLoaderExtension {
        /** @internal */
        readonly name = "MSFT_sRGBFactors";
        /** @internal */
        enabled: boolean;
        private _loader;
        /** @internal */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /** @internal */
        loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the MSFT_minecraftMesh extension.
             */
            ["MSFT_minecraftMesh"]: {};
        }
    /** @internal */
    export class MSFT_minecraftMesh implements IGLTFLoaderExtension {
        /** @internal */
        readonly name = "MSFT_minecraftMesh";
        /** @internal */
        enabled: boolean;
        private _loader;
        /** @internal */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /** @internal */
        loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the MSFT_lod extension.
             */
            ["MSFT_lod"]: Partial<{
                /**
                 * Maximum number of LODs to load, starting from the lowest LOD.
                 */
                maxLODsToLoad: number;
            }>;
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/MSFT_lod/README.md)
     */
    export class MSFT_lod implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "MSFT_lod";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        /**
         * Maximum number of LODs to load, starting from the lowest LOD.
         */
        maxLODsToLoad: number;
        /**
         * Observable raised when all node LODs of one level are loaded.
         * The event data is the index of the loaded LOD starting from zero.
         * Dispose the loader to cancel the loading of the next level of LODs.
         */
        onNodeLODsLoadedObservable: Observable<number>;
        /**
         * Observable raised when all material LODs of one level are loaded.
         * The event data is the index of the loaded LOD starting from zero.
         * Dispose the loader to cancel the loading of the next level of LODs.
         */
        onMaterialLODsLoadedObservable: Observable<number>;
        private _loader;
        private _bufferLODs;
        private _nodeIndexLOD;
        private _nodeSignalLODs;
        private _nodePromiseLODs;
        private _nodeBufferLODs;
        private _materialIndexLOD;
        private _materialSignalLODs;
        private _materialPromiseLODs;
        private _materialBufferLODs;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /** @internal */
        onReady(): void;
        /**
         * @internal
         */
        loadSceneAsync(context: string, scene: IScene): Nullable<Promise<void>>;
        /**
         * @internal
         */
        loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
        /**
         * @internal
         */
        _loadMaterialAsync(context: string, material: IMaterial, babylonMesh: Nullable<Mesh>, babylonDrawMode: number, assign: (babylonMaterial: Material) => void): Nullable<Promise<Material>>;
        /**
         * @internal
         */
        _loadUriAsync(context: string, property: BABYLON.GLTF2.IProperty, uri: string): Nullable<Promise<ArrayBufferView>>;
        /**
         * @internal
         */
        loadBufferAsync(context: string, buffer: IBuffer, byteOffset: number, byteLength: number): Nullable<Promise<ArrayBufferView>>;
        private _loadBufferLOD;
        /**
         * @returns an array of LOD properties from lowest to highest.
         * @param context
         * @param property
         * @param array
         * @param ids
         */
        private _getLODs;
        private _disposeTransformNode;
        private _disposeMaterials;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the MSFT_audio_emitter extension.
             */
            ["MSFT_audio_emitter"]: {};
        }
    /**
     * [Specification](https://github.com/najadojo/glTF/blob/MSFT_audio_emitter/extensions/2.0/Vendor/MSFT_audio_emitter/README.md)
     * !!! Experimental Extension Subject to Changes !!!
     */
    export class MSFT_audio_emitter implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "MSFT_audio_emitter";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader;
        private _clips;
        private _emitters;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /** @internal */
        onLoading(): void;
        /**
         * @internal
         */
        loadSceneAsync(context: string, scene: IScene): Nullable<Promise<void>>;
        /**
         * @internal
         */
        loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
        /**
         * @internal
         */
        loadAnimationAsync(context: string, animation: IAnimation): Nullable<Promise<AnimationGroup>>;
        private _loadClipAsync;
        private _loadEmitterAsync;
        private _getEventAction;
        private _loadAnimationEventAsync;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_xmp_json_ld extension.
             */
            ["KHR_xmp_json_ld"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_xmp_json_ld/README.md)
     * @since 5.0.0
     */
    export class KHR_xmp_json_ld implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_xmp_json_ld";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * Called after the loader state changes to LOADING.
         */
        onLoading(): void;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_texture_transform extension.
             */
            ["KHR_texture_transform"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_texture_transform/README.md)
     */
    export class KHR_texture_transform implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_texture_transform";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadTextureInfoAsync(context: string, textureInfo: ITextureInfo, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_texture_basisu extension.
             */
            ["KHR_texture_basisu"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_texture_basisu/README.md)
     */
    export class KHR_texture_basisu implements IGLTFLoaderExtension {
        /** The name of this extension. */
        readonly name = "KHR_texture_basisu";
        /** Defines whether this extension is enabled. */
        enabled: boolean;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        _loadTextureAsync(context: string, texture: ITexture, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_node_visibility extension.
             */
            ["KHR_node_visibility"]: {};
        }
    /**
     * Loader extension for KHR_node_visibility
     */
    export class KHR_node_visibility implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_node_visibility";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        onReady(): Promise<void>;
        dispose(): void;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_node_hoverability extension.
             */
            ["KHR_node_hoverability"]: {};
        }
    /**
     * Loader extension for KHR_node_hoverability
     * @see https://github.com/KhronosGroup/glTF/pull/2426
     */
    export class KHR_node_hoverability implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_node_hoverability";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        onReady(): Promise<void>;
        dispose(): void;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_mesh_quantization extension.
             */
            ["KHR_mesh_quantization"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_mesh_quantization/README.md)
     */
    export class KHR_mesh_quantization implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_mesh_quantization";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_materials_volume extension.
             */
            ["KHR_materials_volume"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md)
     * @since 5.0.0
     */
    export class KHR_materials_volume implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_volume";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadVolumePropertiesAsync;
    }


        type MaterialVariantsController = {
            /**
             * The list of available variant names for this asset.
             */
            readonly variants: readonly string[];
            /**
             * Gets or sets the selected variant.
             */
            selectedVariant: string;
        };
        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_materials_variants extension.
             */
            ["KHR_materials_variants"]: Partial<{
                /**
                 * Defines a callback that will be called if material variants are loaded.
                 * @experimental
                 */
                onLoaded: (controller: MaterialVariantsController) => void;
            }>;
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_variants/README.md)
     */
    export class KHR_materials_variants implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_variants";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader;
        private _variants?;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * Gets the list of available variant names for this asset.
         * @param rootNode The glTF root node
         * @returns the list of all the variant names for this model
         */
        static GetAvailableVariants(rootNode: TransformNode): string[];
        /**
         * Gets the list of available variant names for this asset.
         * @param rootNode The glTF root node
         * @returns the list of all the variant names for this model
         */
        getAvailableVariants(rootNode: TransformNode): string[];
        /**
         * Select a variant given a variant name or a list of variant names.
         * @param rootNode The glTF root node
         * @param variantName The variant name(s) to select.
         */
        static SelectVariant(rootNode: TransformNode, variantName: string | string[]): void;
        /**
         * Select a variant given a variant name or a list of variant names.
         * @param rootNode The glTF root node
         * @param variantName The variant name(s) to select.
         */
        selectVariant(rootNode: TransformNode, variantName: string | string[]): void;
        /**
         * Reset back to the original before selecting a variant.
         * @param rootNode The glTF root node
         */
        static Reset(rootNode: TransformNode): void;
        /**
         * Reset back to the original before selecting a variant.
         * @param rootNode The glTF root node
         */
        reset(rootNode: TransformNode): void;
        /**
         * Gets the last selected variant name(s) or null if original.
         * @param rootNode The glTF root node
         * @returns The selected variant name(s).
         */
        static GetLastSelectedVariant(rootNode: TransformNode): Nullable<string | string[]>;
        /**
         * Gets the last selected variant name(s) or null if original.
         * @param rootNode The glTF root node
         * @returns The selected variant name(s).
         */
        getLastSelectedVariant(rootNode: TransformNode): Nullable<string | string[]>;
        private static _GetExtensionMetadata;
        /** @internal */
        onLoading(): void;
        /** @internal */
        onReady(): void;
        /**
         * @internal
         */
        _loadMeshPrimitiveAsync(context: string, name: string, node: INode, mesh: IMesh, primitive: IMeshPrimitive, assign: (babylonMesh: AbstractMesh) => void): Nullable<Promise<AbstractMesh>>;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_materials_unlit extension.
             */
            ["KHR_materials_unlit"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_unlit/README.md)
     */
    export class KHR_materials_unlit implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_unlit";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadUnlitPropertiesAsync;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_materials_transmission extension.
             */
            ["KHR_materials_transmission"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_transmission/README.md)
     */
    export class KHR_materials_transmission implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_transmission";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadTransparentPropertiesAsync;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_materials_specular extension.
             */
            ["KHR_materials_specular"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_specular/README.md)
     */
    export class KHR_materials_specular implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_specular";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadSpecularPropertiesAsync;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_materials_sheen extension.
             */
            ["KHR_materials_sheen"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_sheen/README.md)
     * [Playground Sample](https://www.babylonjs-playground.com/frame.html#BNIZX6#4)
     */
    export class KHR_materials_sheen implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_sheen";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadSheenPropertiesAsync;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_materials_pbrSpecularGlossiness extension.
             */
            ["KHR_materials_pbrSpecularGlossiness"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Archived/KHR_materials_pbrSpecularGlossiness/README.md)
     */
    export class KHR_materials_pbrSpecularGlossiness implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_pbrSpecularGlossiness";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadSpecularGlossinessPropertiesAsync;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_materials_iridescence extension.
             */
            ["KHR_materials_iridescence"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_iridescence/README.md)
     */
    export class KHR_materials_iridescence implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_iridescence";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadIridescencePropertiesAsync;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_materials_ior extension.
             */
            ["KHR_materials_ior"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_ior/README.md)
     */
    export class KHR_materials_ior implements IGLTFLoaderExtension {
        /**
         * Default ior Value from the spec.
         */
        private static readonly _DEFAULT_IOR;
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_ior";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadIorPropertiesAsync;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_materials_emissive_strength extension.
             */
            ["KHR_materials_emissive_strength"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_emissive_strength/README.md)
     */
    export class KHR_materials_emissive_strength implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_emissive_strength";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadEmissiveProperties;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_materials_dispersion extension.
             */
            ["KHR_materials_dispersion"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/87bd64a7f5e23c84b6aef2e6082069583ed0ddb4/extensions/2.0/Khronos/KHR_materials_dispersion/README.md)
     * @experimental
     */
    export class KHR_materials_dispersion implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_dispersion";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadDispersionPropertiesAsync;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_materials_diffuse_transmission extension.
             */
            ["KHR_materials_diffuse_transmission"]: {};
        }
    /**
     * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1825)
     * !!! Experimental Extension Subject to Changes !!!
     */
    export class KHR_materials_diffuse_transmission implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_diffuse_transmission";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadTranslucentPropertiesAsync;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_materials_clearcoat extension.
             */
            ["KHR_materials_clearcoat"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_clearcoat/README.md)
     * [Playground Sample](https://www.babylonjs-playground.com/frame.html#7F7PN6#8)
     */
    export class KHR_materials_clearcoat implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_clearcoat";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadClearCoatPropertiesAsync;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_materials_anisotropy extension.
             */
            ["KHR_materials_anisotropy"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_anisotropy)
     */
    export class KHR_materials_anisotropy implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_anisotropy";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadIridescencePropertiesAsync;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_lights_punctual extension.
             */
            ["KHR_lights_punctual"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_lights_punctual/README.md)
     */
    export class KHR_lights implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_lights_punctual";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /** hidden */
        private _loader;
        private _lights?;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /** @internal */
        onLoading(): void;
        /**
         * @internal
         */
        loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_interactivity extension.
             */
            ["KHR_interactivity"]: {};
        }
    /**
     * Loader extension for KHR_interactivity
     */
    export class KHR_interactivity implements IGLTFLoaderExtension {
        private _loader;
        /**
         * The name of this extension.
         */
        readonly name = "KHR_interactivity";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _pathConverter?;
        /**
         * @internal
         * @param _loader
         */
        constructor(_loader: GLTFLoader);
        dispose(): void;
        onReady(): void;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_draco_mesh_compression extension.
             */
            ["KHR_draco_mesh_compression"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_draco_mesh_compression/README.md)
     */
    export class KHR_draco_mesh_compression implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_draco_mesh_compression";
        /**
         * The draco decoder used to decode vertex data or DracoDecoder.Default if not defined
         */
        dracoDecoder?: DracoDecoder;
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines whether to use the normalized flag from the glTF accessor instead of the Draco data. Defaults to true.
         */
        useNormalizedFlagFromAccessor: boolean;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        _loadVertexDataAsync(context: string, primitive: IMeshPrimitive, babylonMesh: Mesh): Nullable<Promise<Geometry>>;
    }


    class CameraAnimationPropertyInfo extends AnimationPropertyInfo {
        /** @internal */
        buildAnimations(target: ICamera, name: string, fps: number, keys: any[], callback: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): void;
    }
    class MaterialAnimationPropertyInfo extends AnimationPropertyInfo {
        /** @internal */
        buildAnimations(target: IMaterial, name: string, fps: number, keys: any[], callback: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): void;
    }
    class LightAnimationPropertyInfo extends AnimationPropertyInfo {
        /** @internal */
        buildAnimations(target: IKHRLightsPunctual_Light, name: string, fps: number, keys: any[], callback: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): void;
    }
    /** @internal */
    export var animationPointerTree: {
        nodes: {
            __array__: {
                translation: TransformNodeAnimationPropertyInfo[];
                rotation: TransformNodeAnimationPropertyInfo[];
                scale: TransformNodeAnimationPropertyInfo[];
                weights: WeightAnimationPropertyInfo[];
                __target__: boolean;
            };
        };
        materials: {
            __array__: {
                __target__: boolean;
                pbrMetallicRoughness: {
                    baseColorFactor: MaterialAnimationPropertyInfo[];
                    metallicFactor: MaterialAnimationPropertyInfo[];
                    roughnessFactor: MaterialAnimationPropertyInfo[];
                    baseColorTexture: {
                        extensions: {
                            KHR_texture_transform: {
                                scale: MaterialAnimationPropertyInfo[];
                                offset: MaterialAnimationPropertyInfo[];
                                rotation: MaterialAnimationPropertyInfo[];
                            };
                        };
                    };
                    metallicRoughnessTexture: {
                        extensions: {
                            KHR_texture_transform: {
                                scale: MaterialAnimationPropertyInfo[];
                                offset: MaterialAnimationPropertyInfo[];
                                rotation: MaterialAnimationPropertyInfo[];
                            };
                        };
                    };
                };
                emissiveFactor: MaterialAnimationPropertyInfo[];
                normalTexture: {
                    scale: MaterialAnimationPropertyInfo[];
                    extensions: {
                        KHR_texture_transform: {
                            scale: MaterialAnimationPropertyInfo[];
                            offset: MaterialAnimationPropertyInfo[];
                            rotation: MaterialAnimationPropertyInfo[];
                        };
                    };
                };
                occlusionTexture: {
                    strength: MaterialAnimationPropertyInfo[];
                    extensions: {
                        KHR_texture_transform: {
                            scale: MaterialAnimationPropertyInfo[];
                            offset: MaterialAnimationPropertyInfo[];
                            rotation: MaterialAnimationPropertyInfo[];
                        };
                    };
                };
                emissiveTexture: {
                    extensions: {
                        KHR_texture_transform: {
                            scale: MaterialAnimationPropertyInfo[];
                            offset: MaterialAnimationPropertyInfo[];
                            rotation: MaterialAnimationPropertyInfo[];
                        };
                    };
                };
                extensions: {
                    KHR_materials_anisotropy: {
                        anisotropyStrength: MaterialAnimationPropertyInfo[];
                        anisotropyRotation: MaterialAnimationPropertyInfo[];
                        anisotropyTexture: {
                            extensions: {
                                KHR_texture_transform: {
                                    scale: MaterialAnimationPropertyInfo[];
                                    offset: MaterialAnimationPropertyInfo[];
                                    rotation: MaterialAnimationPropertyInfo[];
                                };
                            };
                        };
                    };
                    KHR_materials_clearcoat: {
                        clearcoatFactor: MaterialAnimationPropertyInfo[];
                        clearcoatRoughnessFactor: MaterialAnimationPropertyInfo[];
                        clearcoatTexture: {
                            extensions: {
                                KHR_texture_transform: {
                                    scale: MaterialAnimationPropertyInfo[];
                                    offset: MaterialAnimationPropertyInfo[];
                                    rotation: MaterialAnimationPropertyInfo[];
                                };
                            };
                        };
                        clearcoatNormalTexture: {
                            scale: MaterialAnimationPropertyInfo[];
                            extensions: {
                                KHR_texture_transform: {
                                    scale: MaterialAnimationPropertyInfo[];
                                    offset: MaterialAnimationPropertyInfo[];
                                    rotation: MaterialAnimationPropertyInfo[];
                                };
                            };
                        };
                        clearcoatRoughnessTexture: {
                            extensions: {
                                KHR_texture_transform: {
                                    scale: MaterialAnimationPropertyInfo[];
                                    offset: MaterialAnimationPropertyInfo[];
                                    rotation: MaterialAnimationPropertyInfo[];
                                };
                            };
                        };
                    };
                    KHR_materials_dispersion: {
                        dispersion: MaterialAnimationPropertyInfo[];
                    };
                    KHR_materials_emissive_strength: {
                        emissiveStrength: MaterialAnimationPropertyInfo[];
                    };
                    KHR_materials_ior: {
                        ior: MaterialAnimationPropertyInfo[];
                    };
                    KHR_materials_iridescence: {
                        iridescenceFactor: MaterialAnimationPropertyInfo[];
                        iridescenceIor: MaterialAnimationPropertyInfo[];
                        iridescenceThicknessMinimum: MaterialAnimationPropertyInfo[];
                        iridescenceThicknessMaximum: MaterialAnimationPropertyInfo[];
                        iridescenceTexture: {
                            extensions: {
                                KHR_texture_transform: {
                                    scale: MaterialAnimationPropertyInfo[];
                                    offset: MaterialAnimationPropertyInfo[];
                                    rotation: MaterialAnimationPropertyInfo[];
                                };
                            };
                        };
                        iridescenceThicknessTexture: {
                            extensions: {
                                KHR_texture_transform: {
                                    scale: MaterialAnimationPropertyInfo[];
                                    offset: MaterialAnimationPropertyInfo[];
                                    rotation: MaterialAnimationPropertyInfo[];
                                };
                            };
                        };
                    };
                    KHR_materials_sheen: {
                        sheenColorFactor: MaterialAnimationPropertyInfo[];
                        sheenRoughnessFactor: MaterialAnimationPropertyInfo[];
                        sheenColorTexture: {
                            extensions: {
                                KHR_texture_transform: {
                                    scale: MaterialAnimationPropertyInfo[];
                                    offset: MaterialAnimationPropertyInfo[];
                                    rotation: MaterialAnimationPropertyInfo[];
                                };
                            };
                        };
                        sheenRoughnessTexture: {
                            extensions: {
                                KHR_texture_transform: {
                                    scale: MaterialAnimationPropertyInfo[];
                                    offset: MaterialAnimationPropertyInfo[];
                                    rotation: MaterialAnimationPropertyInfo[];
                                };
                            };
                        };
                    };
                    KHR_materials_specular: {
                        specularFactor: MaterialAnimationPropertyInfo[];
                        specularColorFactor: MaterialAnimationPropertyInfo[];
                        specularTexture: {
                            extensions: {
                                KHR_texture_transform: {
                                    scale: MaterialAnimationPropertyInfo[];
                                    offset: MaterialAnimationPropertyInfo[];
                                    rotation: MaterialAnimationPropertyInfo[];
                                };
                            };
                        };
                        specularColorTexture: {
                            extensions: {
                                KHR_texture_transform: {
                                    scale: MaterialAnimationPropertyInfo[];
                                    offset: MaterialAnimationPropertyInfo[];
                                    rotation: MaterialAnimationPropertyInfo[];
                                };
                            };
                        };
                    };
                    KHR_materials_transmission: {
                        transmissionFactor: MaterialAnimationPropertyInfo[];
                        transmissionTexture: {
                            extensions: {
                                KHR_texture_transform: {
                                    scale: MaterialAnimationPropertyInfo[];
                                    offset: MaterialAnimationPropertyInfo[];
                                    rotation: MaterialAnimationPropertyInfo[];
                                };
                            };
                        };
                    };
                    KHR_materials_volume: {
                        attenuationColor: MaterialAnimationPropertyInfo[];
                        attenuationDistance: MaterialAnimationPropertyInfo[];
                        thicknessFactor: MaterialAnimationPropertyInfo[];
                        thicknessTexture: {
                            extensions: {
                                KHR_texture_transform: {
                                    scale: MaterialAnimationPropertyInfo[];
                                    offset: MaterialAnimationPropertyInfo[];
                                    rotation: MaterialAnimationPropertyInfo[];
                                };
                            };
                        };
                    };
                    KHR_materials_diffuse_transmission: {
                        diffuseTransmissionFactor: MaterialAnimationPropertyInfo[];
                        diffuseTransmissionTexture: {
                            extensions: {
                                KHR_texture_transform: {
                                    scale: MaterialAnimationPropertyInfo[];
                                    offset: MaterialAnimationPropertyInfo[];
                                    rotation: MaterialAnimationPropertyInfo[];
                                };
                            };
                        };
                        diffuseTransmissionColorFactor: MaterialAnimationPropertyInfo[];
                        diffuseTransmissionColorTexture: {
                            extensions: {
                                KHR_texture_transform: {
                                    scale: MaterialAnimationPropertyInfo[];
                                    offset: MaterialAnimationPropertyInfo[];
                                    rotation: MaterialAnimationPropertyInfo[];
                                };
                            };
                        };
                    };
                };
            };
        };
        cameras: {
            __array__: {
                __target__: boolean;
                orthographic: {
                    xmag: CameraAnimationPropertyInfo[];
                    ymag: CameraAnimationPropertyInfo[];
                    zfar: CameraAnimationPropertyInfo[];
                    znear: CameraAnimationPropertyInfo[];
                };
                perspective: {
                    yfov: CameraAnimationPropertyInfo[];
                    zfar: CameraAnimationPropertyInfo[];
                    znear: CameraAnimationPropertyInfo[];
                };
            };
        };
        extensions: {
            KHR_lights_punctual: {
                lights: {
                    __array__: {
                        __target__: boolean;
                        color: LightAnimationPropertyInfo[];
                        intensity: LightAnimationPropertyInfo[];
                        range: LightAnimationPropertyInfo[];
                        spot: {
                            innerConeAngle: LightAnimationPropertyInfo[];
                            outerConeAngle: LightAnimationPropertyInfo[];
                        };
                    };
                };
            };
            EXT_lights_ies: {
                lights: {
                    __array__: {
                        __target__: boolean;
                        color: LightAnimationPropertyInfo[];
                        multiplier: LightAnimationPropertyInfo[];
                    };
                };
            };
        };
    };


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the KHR_animation_pointer extension.
             */
            ["KHR_animation_pointer"]: {};
        }
    /**
     * [Specification PR](https://github.com/KhronosGroup/glTF/pull/2147)
     * !!! Experimental Extension Subject to Changes !!!
     */
    export class KHR_animation_pointer implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_animation_pointer";
        private _loader;
        private _pathToObjectConverter?;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /**
         * Defines whether this extension is enabled.
         */
        get enabled(): boolean;
        /** @internal */
        dispose(): void;
        /**
         * Loads a glTF animation channel.
         * @param context The context when loading the asset
         * @param animationContext The context of the animation when loading the asset
         * @param animation The glTF animation property
         * @param channel The glTF animation channel property
         * @param onLoad Called for each animation loaded
         * @returns A void promise that resolves when the load is complete or null if not handled
         */
        _loadAnimationChannelAsync(context: string, animationContext: string, animation: IAnimation, channel: IAnimationChannel, onLoad: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): Nullable<Promise<void>>;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the ExtrasAsMetadata extension.
             */
            ["ExtrasAsMetadata"]: {};
        }
    /**
     * Store glTF extras (if present) in BJS objects' metadata
     */
    export class ExtrasAsMetadata implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "ExtrasAsMetadata";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader;
        private _assignExtras;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
        /**
         * @internal
         */
        loadCameraAsync(context: string, camera: ICamera, assign: (babylonCamera: Camera) => void): Nullable<Promise<Camera>>;
        /**
         * @internal
         */
        createMaterial(context: string, material: IMaterial, babylonDrawMode: number): Nullable<Material>;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the EXT_texture_webp extension.
             */
            ["EXT_texture_webp"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_texture_webp/README.md)
     */
    export class EXT_texture_webp implements IGLTFLoaderExtension {
        /** The name of this extension. */
        readonly name = "EXT_texture_webp";
        /** Defines whether this extension is enabled. */
        enabled: boolean;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        _loadTextureAsync(context: string, texture: ITexture, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the EXT_texture_avif extension.
             */
            ["EXT_texture_avif"]: {};
        }
    /**
     * [glTF PR](https://github.com/KhronosGroup/glTF/pull/2235)
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_texture_avif/README.md)
     */
    export class EXT_texture_avif implements IGLTFLoaderExtension {
        /** The name of this extension. */
        readonly name = "EXT_texture_avif";
        /** Defines whether this extension is enabled. */
        enabled: boolean;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        _loadTextureAsync(context: string, texture: ITexture, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the EXT_meshopt_compression extension.
             */
            ["EXT_meshopt_compression"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_meshopt_compression/README.md)
     *
     * This extension uses a WebAssembly decoder module from https://github.com/zeux/meshoptimizer/tree/master/js
     * @since 5.0.0
     */
    export class EXT_meshopt_compression implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "EXT_meshopt_compression";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadBufferViewAsync(context: string, bufferView: IBufferView): Nullable<Promise<ArrayBufferView>>;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the EXT_mesh_gpu_instancing extension.
             */
            ["EXT_mesh_gpu_instancing"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing/README.md)
     * [Playground Sample](https://playground.babylonjs.com/#QFIGLW#9)
     */
    export class EXT_mesh_gpu_instancing implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "EXT_mesh_gpu_instancing";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the EXT_lights_image_based extension.
             */
            ["EXT_lights_image_based"]: {};
        }
        /** @internal */
        interface IEXTLightsImageBased_LightImageBased {
            _babylonTexture?: BaseTexture;
            _loaded?: Promise<void>;
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_lights_image_based/README.md)
     */
    export class EXT_lights_image_based implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "EXT_lights_image_based";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader;
        private _lights?;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /** @internal */
        onLoading(): void;
        /**
         * @internal
         */
        loadSceneAsync(context: string, scene: IScene): Nullable<Promise<void>>;
        private _loadLightAsync;
    }


        interface GLTFLoaderExtensionOptions {
            /**
             * Defines options for the EXT_lights_ies extension.
             */
            ["EXT_lights_ies"]: {};
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_lights_ies)
     */
    export class EXT_lights_ies implements IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "EXT_lights_ies";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /** hidden */
        private _loader;
        private _lights?;
        /**
         * @internal
         */
        constructor(loader: GLTFLoader);
        /** @internal */
        dispose(): void;
        /** @internal */
        onLoading(): void;
        /**
         * @internal
         */
        loadNodeAsync(context: string, node: INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
    }




    /**
     * @internal
     * @deprecated
     */
    export class GLTFMaterialsCommonExtension extends GLTFLoaderExtension {
        constructor();
        loadRuntimeExtensionsAsync(gltfRuntime: IGLTFRuntime): boolean;
        loadMaterialAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (material: Material) => void, onError: (message: string) => void): boolean;
        private _loadTexture;
    }


    /**
     * Utils functions for GLTF
     * @internal
     * @deprecated
     */
    export class GLTFUtils {
        /**
         * Sets the given "parameter" matrix
         * @param scene the Scene object
         * @param source the source node where to pick the matrix
         * @param parameter the GLTF technique parameter
         * @param uniformName the name of the shader's uniform
         * @param shaderMaterial the shader material
         */
        static SetMatrix(scene: Scene, source: Node, parameter: IGLTFTechniqueParameter, uniformName: string, shaderMaterial: ShaderMaterial | Effect): void;
        /**
         * Sets the given "parameter" matrix
         * @param shaderMaterial the shader material
         * @param uniform the name of the shader's uniform
         * @param value the value of the uniform
         * @param type the uniform's type (EParameterType FLOAT, VEC2, VEC3 or VEC4)
         * @returns true if set, else false
         */
        static SetUniform(shaderMaterial: ShaderMaterial | Effect, uniform: string, value: any, type: number): boolean;
        /**
         * Returns the wrap mode of the texture
         * @param mode the mode value
         * @returns the wrap mode (TEXTURE_WRAP_ADDRESSMODE, MIRROR_ADDRESSMODE or CLAMP_ADDRESSMODE)
         */
        static GetWrapMode(mode: number): number;
        /**
         * Returns the byte stride giving an accessor
         * @param accessor the GLTF accessor objet
         * @returns the byte stride
         */
        static GetByteStrideFromType(accessor: IGLTFAccessor): number;
        /**
         * Returns the texture filter mode giving a mode value
         * @param mode the filter mode value
         * @returns the filter mode (TODO - needs to be a type?)
         */
        static GetTextureFilterMode(mode: number): number;
        static GetBufferFromBufferView(gltfRuntime: IGLTFRuntime, bufferView: IGLTFBufferView, byteOffset: number, byteLength: number, componentType: EComponentType): ArrayBufferView;
        /**
         * Returns a buffer from its accessor
         * @param gltfRuntime the GLTF runtime
         * @param accessor the GLTF accessor
         * @returns an array buffer view
         */
        static GetBufferFromAccessor(gltfRuntime: IGLTFRuntime, accessor: IGLTFAccessor): any;
        /**
         * Decodes a buffer view into a string
         * @param view the buffer view
         * @returns a string
         */
        static DecodeBufferToText(view: ArrayBufferView): string;
        /**
         * Returns the default material of gltf. Related to
         * https://github.com/KhronosGroup/glTF/tree/master/specification/1.0#appendix-a-default-material
         * @param scene the Babylon.js scene
         * @returns the default Babylon material
         */
        static GetDefaultMaterial(scene: Scene): ShaderMaterial;
        private static _DefaultMaterial;
    }


    /**
     * Enums
     * @internal
     */
    export enum EComponentType {
        BYTE = 5120,
        UNSIGNED_BYTE = 5121,
        SHORT = 5122,
        UNSIGNED_SHORT = 5123,
        FLOAT = 5126
    }
    /** @internal */
    export enum EShaderType {
        FRAGMENT = 35632,
        VERTEX = 35633
    }
    /** @internal */
    export enum EParameterType {
        BYTE = 5120,
        UNSIGNED_BYTE = 5121,
        SHORT = 5122,
        UNSIGNED_SHORT = 5123,
        INT = 5124,
        UNSIGNED_INT = 5125,
        FLOAT = 5126,
        FLOAT_VEC2 = 35664,
        FLOAT_VEC3 = 35665,
        FLOAT_VEC4 = 35666,
        INT_VEC2 = 35667,
        INT_VEC3 = 35668,
        INT_VEC4 = 35669,
        BOOL = 35670,
        BOOL_VEC2 = 35671,
        BOOL_VEC3 = 35672,
        BOOL_VEC4 = 35673,
        FLOAT_MAT2 = 35674,
        FLOAT_MAT3 = 35675,
        FLOAT_MAT4 = 35676,
        SAMPLER_2D = 35678
    }
    /** @internal */
    export enum ETextureWrapMode {
        CLAMP_TO_EDGE = 33071,
        MIRRORED_REPEAT = 33648,
        REPEAT = 10497
    }
    /** @internal */
    export enum ETextureFilterType {
        NEAREST = 9728,
        LINEAR = 9728,
        NEAREST_MIPMAP_NEAREST = 9984,
        LINEAR_MIPMAP_NEAREST = 9985,
        NEAREST_MIPMAP_LINEAR = 9986,
        LINEAR_MIPMAP_LINEAR = 9987
    }
    /** @internal */
    export enum ETextureFormat {
        ALPHA = 6406,
        RGB = 6407,
        RGBA = 6408,
        LUMINANCE = 6409,
        LUMINANCE_ALPHA = 6410
    }
    /** @internal */
    export enum ECullingType {
        FRONT = 1028,
        BACK = 1029,
        FRONT_AND_BACK = 1032
    }
    /** @internal */
    export enum EBlendingFunction {
        ZERO = 0,
        ONE = 1,
        SRC_COLOR = 768,
        ONE_MINUS_SRC_COLOR = 769,
        DST_COLOR = 774,
        ONE_MINUS_DST_COLOR = 775,
        SRC_ALPHA = 770,
        ONE_MINUS_SRC_ALPHA = 771,
        DST_ALPHA = 772,
        ONE_MINUS_DST_ALPHA = 773,
        CONSTANT_COLOR = 32769,
        ONE_MINUS_CONSTANT_COLOR = 32770,
        CONSTANT_ALPHA = 32771,
        ONE_MINUS_CONSTANT_ALPHA = 32772,
        SRC_ALPHA_SATURATE = 776
    }
    /** @internal */
    export interface IGLTFProperty {
        extensions?: {
            [key: string]: any;
        };
        extras?: Object;
    }
    /** @internal */
    export interface IGLTFChildRootProperty extends IGLTFProperty {
        name?: string;
    }
    /** @internal */
    export interface IGLTFAccessor extends IGLTFChildRootProperty {
        bufferView: string;
        byteOffset: number;
        byteStride: number;
        count: number;
        type: string;
        componentType: EComponentType;
        max?: number[];
        min?: number[];
        name?: string;
    }
    /** @internal */
    export interface IGLTFBufferView extends IGLTFChildRootProperty {
        buffer: string;
        byteOffset: number;
        byteLength: number;
        byteStride: number;
        target?: number;
    }
    /** @internal */
    export interface IGLTFBuffer extends IGLTFChildRootProperty {
        uri: string;
        byteLength?: number;
        type?: string;
    }
    /** @internal */
    export interface IGLTFShader extends IGLTFChildRootProperty {
        uri: string;
        type: EShaderType;
    }
    /** @internal */
    export interface IGLTFProgram extends IGLTFChildRootProperty {
        attributes: string[];
        fragmentShader: string;
        vertexShader: string;
    }
    /** @internal */
    export interface IGLTFTechniqueParameter {
        type: number;
        count?: number;
        semantic?: string;
        node?: string;
        value?: number | boolean | string | Array<any>;
        source?: string;
        babylonValue?: any;
    }
    /** @internal */
    export interface IGLTFTechniqueCommonProfile {
        lightingModel: string;
        texcoordBindings: Object;
        parameters?: Array<any>;
    }
    /** @internal */
    export interface IGLTFTechniqueStatesFunctions {
        blendColor?: number[];
        blendEquationSeparate?: number[];
        blendFuncSeparate?: number[];
        colorMask: boolean[];
        cullFace: number[];
    }
    /** @internal */
    export interface IGLTFTechniqueStates {
        enable: number[];
        functions: IGLTFTechniqueStatesFunctions;
    }
    /** @internal */
    export interface IGLTFTechnique extends IGLTFChildRootProperty {
        parameters: {
            [key: string]: IGLTFTechniqueParameter;
        };
        program: string;
        attributes: {
            [key: string]: string;
        };
        uniforms: {
            [key: string]: string;
        };
        states: IGLTFTechniqueStates;
    }
    /** @internal */
    export interface IGLTFMaterial extends IGLTFChildRootProperty {
        technique?: string;
        values: string[];
    }
    /** @internal */
    export interface IGLTFMeshPrimitive extends IGLTFProperty {
        attributes: {
            [key: string]: string;
        };
        indices: string;
        material: string;
        mode?: number;
    }
    /** @internal */
    export interface IGLTFMesh extends IGLTFChildRootProperty {
        primitives: IGLTFMeshPrimitive[];
    }
    /** @internal */
    export interface IGLTFImage extends IGLTFChildRootProperty {
        uri: string;
    }
    /** @internal */
    export interface IGLTFSampler extends IGLTFChildRootProperty {
        magFilter?: number;
        minFilter?: number;
        wrapS?: number;
        wrapT?: number;
    }
    /** @internal */
    export interface IGLTFTexture extends IGLTFChildRootProperty {
        sampler: string;
        source: string;
        format?: ETextureFormat;
        internalFormat?: ETextureFormat;
        target?: number;
        type?: number;
        babylonTexture?: Texture;
    }
    /** @internal */
    export interface IGLTFAmbienLight {
        color?: number[];
    }
    /** @internal */
    export interface IGLTFDirectionalLight {
        color?: number[];
    }
    /** @internal */
    export interface IGLTFPointLight {
        color?: number[];
        constantAttenuation?: number;
        linearAttenuation?: number;
        quadraticAttenuation?: number;
    }
    /** @internal */
    export interface IGLTFSpotLight {
        color?: number[];
        constantAttenuation?: number;
        fallOfAngle?: number;
        fallOffExponent?: number;
        linearAttenuation?: number;
        quadraticAttenuation?: number;
    }
    /** @internal */
    export interface IGLTFLight extends IGLTFChildRootProperty {
        type: string;
    }
    /** @internal */
    export interface IGLTFCameraOrthographic {
        xmag: number;
        ymag: number;
        zfar: number;
        znear: number;
    }
    /** @internal */
    export interface IGLTFCameraPerspective {
        aspectRatio: number;
        yfov: number;
        zfar: number;
        znear: number;
    }
    /** @internal */
    export interface IGLTFCamera extends IGLTFChildRootProperty {
        type: string;
    }
    /** @internal */
    export interface IGLTFAnimationChannelTarget {
        id: string;
        path: string;
    }
    /** @internal */
    export interface IGLTFAnimationChannel {
        sampler: string;
        target: IGLTFAnimationChannelTarget;
    }
    /** @internal */
    export interface IGLTFAnimationSampler {
        input: string;
        output: string;
        interpolation?: string;
    }
    /** @internal */
    export interface IGLTFAnimation extends IGLTFChildRootProperty {
        channels?: IGLTFAnimationChannel[];
        parameters?: {
            [key: string]: string;
        };
        samplers?: {
            [key: string]: IGLTFAnimationSampler;
        };
    }
    /** @internal */
    export interface IGLTFNodeInstanceSkin {
        skeletons: string[];
        skin: string;
        meshes: string[];
    }
    /** @internal */
    export interface IGLTFSkins extends IGLTFChildRootProperty {
        bindShapeMatrix: number[];
        inverseBindMatrices: string;
        jointNames: string[];
        babylonSkeleton?: Skeleton;
    }
    /** @internal */
    export interface IGLTFNode extends IGLTFChildRootProperty {
        camera?: string;
        children: string[];
        skin?: string;
        jointName?: string;
        light?: string;
        matrix: number[];
        mesh?: string;
        meshes?: string[];
        rotation?: number[];
        scale?: number[];
        translation?: number[];
        babylonNode?: Node;
    }
    /** @internal */
    export interface IGLTFScene extends IGLTFChildRootProperty {
        nodes: string[];
    }
    /** @internal */
    export interface IGLTFRuntime {
        extensions: {
            [key: string]: any;
        };
        accessors: {
            [key: string]: IGLTFAccessor;
        };
        buffers: {
            [key: string]: IGLTFBuffer;
        };
        bufferViews: {
            [key: string]: IGLTFBufferView;
        };
        meshes: {
            [key: string]: IGLTFMesh;
        };
        lights: {
            [key: string]: IGLTFLight;
        };
        cameras: {
            [key: string]: IGLTFCamera;
        };
        nodes: {
            [key: string]: IGLTFNode;
        };
        images: {
            [key: string]: IGLTFImage;
        };
        textures: {
            [key: string]: IGLTFTexture;
        };
        shaders: {
            [key: string]: IGLTFShader;
        };
        programs: {
            [key: string]: IGLTFProgram;
        };
        samplers: {
            [key: string]: IGLTFSampler;
        };
        techniques: {
            [key: string]: IGLTFTechnique;
        };
        materials: {
            [key: string]: IGLTFMaterial;
        };
        animations: {
            [key: string]: IGLTFAnimation;
        };
        skins: {
            [key: string]: IGLTFSkins;
        };
        currentScene?: Object;
        scenes: {
            [key: string]: IGLTFScene;
        };
        extensionsUsed: string[];
        extensionsRequired?: string[];
        buffersCount: number;
        shaderscount: number;
        scene: Scene;
        rootUrl: string;
        loadedBufferCount: number;
        loadedBufferViews: {
            [name: string]: ArrayBufferView;
        };
        loadedShaderCount: number;
        importOnlyMeshes: boolean;
        importMeshesNames?: string[];
        dummyNodes: Node[];
        assetContainer: Nullable<AssetContainer>;
    }
    /** @internal */
    export interface INodeToRoot {
        bone: Bone;
        node: IGLTFNode;
        id: string;
    }
    /** @internal */
    export interface IJointNode {
        node: IGLTFNode;
        id: string;
    }


    /**
     * Implementation of the base glTF spec
     * @internal
     */
    export class GLTFLoaderBase {
        static CreateRuntime(parsedData: any, scene: Scene, rootUrl: string): IGLTFRuntime;
        static LoadBufferAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (buffer: ArrayBufferView) => void, onError: (message: string) => void, onProgress?: () => void): void;
        static LoadTextureBufferAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (buffer: Nullable<ArrayBufferView>) => void, onError: (message: string) => void): void;
        static CreateTextureAsync(gltfRuntime: IGLTFRuntime, id: string, buffer: Nullable<ArrayBufferView>, onSuccess: (texture: Texture) => void): void;
        static LoadShaderStringAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (shaderString: string | ArrayBuffer) => void, onError?: (message: string) => void): void;
        static LoadMaterialAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (material: Material) => void, onError: (message: string) => void): void;
    }
    /**
     * glTF V1 Loader
     * @internal
     * @deprecated
     */
    export class GLTFLoader implements IGLTFLoader {
        static Extensions: {
            [name: string]: GLTFLoaderExtension;
        };
        static RegisterExtension(extension: GLTFLoaderExtension): void;
        dispose(): void;
        private _importMeshAsync;
        /**
         * Imports one or more meshes from a loaded gltf file and adds them to the scene
         * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
         * @param scene the scene the meshes should be added to
         * @param assetContainer defines the asset container to use (can be null)
         * @param data gltf data containing information of the meshes in a loaded file
         * @param rootUrl root url to load from
         * @param onProgress event that fires when loading progress has occured
         * @returns a promise containg the loaded meshes, particles, skeletons and animations
         */
        importMeshAsync(meshesNames: any, scene: Scene, assetContainer: Nullable<AssetContainer>, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void): Promise<ISceneLoaderAsyncResult>;
        private _loadAsync;
        /**
         * Imports all objects from a loaded gltf file and adds them to the scene
         * @param scene the scene the objects should be added to
         * @param data gltf data containing information of the meshes in a loaded file
         * @param rootUrl root url to load from
         * @param onProgress event that fires when loading progress has occured
         * @returns a promise which completes when objects have been loaded to the scene
         */
        loadAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void): Promise<void>;
        private _loadShadersAsync;
        private _loadBuffersAsync;
        private _createNodes;
    }
    /** @internal */
    export abstract class GLTFLoaderExtension {
        private _name;
        constructor(name: string);
        get name(): string;
        /**
         * Defines an override for loading the runtime
         * Return true to stop further extensions from loading the runtime
         * @param scene
         * @param data
         * @param rootUrl
         * @param onSuccess
         * @param onError
         * @returns true to stop further extensions from loading the runtime
         */
        loadRuntimeAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onSuccess?: (gltfRuntime: IGLTFRuntime) => void, onError?: (message: string) => void): boolean;
        /**
         * Defines an onverride for creating gltf runtime
         * Return true to stop further extensions from creating the runtime
         * @param gltfRuntime
         * @param onSuccess
         * @param onError
         * @returns true to stop further extensions from creating the runtime
         */
        loadRuntimeExtensionsAsync(gltfRuntime: IGLTFRuntime, onSuccess: () => void, onError?: (message: string) => void): boolean;
        /**
         * Defines an override for loading buffers
         * Return true to stop further extensions from loading this buffer
         * @param gltfRuntime
         * @param id
         * @param onSuccess
         * @param onError
         * @param onProgress
         * @returns true to stop further extensions from loading this buffer
         */
        loadBufferAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (buffer: ArrayBufferView) => void, onError: (message: string) => void, onProgress?: () => void): boolean;
        /**
         * Defines an override for loading texture buffers
         * Return true to stop further extensions from loading this texture data
         * @param gltfRuntime
         * @param id
         * @param onSuccess
         * @param onError
         * @returns true to stop further extensions from loading this texture data
         */
        loadTextureBufferAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (buffer: ArrayBufferView) => void, onError: (message: string) => void): boolean;
        /**
         * Defines an override for creating textures
         * Return true to stop further extensions from loading this texture
         * @param gltfRuntime
         * @param id
         * @param buffer
         * @param onSuccess
         * @param onError
         * @returns true to stop further extensions from loading this texture
         */
        createTextureAsync(gltfRuntime: IGLTFRuntime, id: string, buffer: ArrayBufferView, onSuccess: (texture: Texture) => void, onError: (message: string) => void): boolean;
        /**
         * Defines an override for loading shader strings
         * Return true to stop further extensions from loading this shader data
         * @param gltfRuntime
         * @param id
         * @param onSuccess
         * @param onError
         * @returns true to stop further extensions from loading this shader data
         */
        loadShaderStringAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (shaderString: string) => void, onError: (message: string) => void): boolean;
        /**
         * Defines an override for loading materials
         * Return true to stop further extensions from loading this material
         * @param gltfRuntime
         * @param id
         * @param onSuccess
         * @param onError
         * @returns true to stop further extensions from loading this material
         */
        loadMaterialAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (material: Material) => void, onError: (message: string) => void): boolean;
        static LoadRuntimeAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onSuccess?: (gltfRuntime: IGLTFRuntime) => void, onError?: (message: string) => void): void;
        static LoadRuntimeExtensionsAsync(gltfRuntime: IGLTFRuntime, onSuccess: () => void, onError?: (message: string) => void): void;
        static LoadBufferAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (bufferView: ArrayBufferView) => void, onError: (message: string) => void, onProgress?: () => void): void;
        static LoadTextureAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (texture: Texture) => void, onError: (message: string) => void): void;
        static LoadShaderStringAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (shaderData: string | ArrayBuffer) => void, onError: (message: string) => void): void;
        static LoadMaterialAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (material: Material) => void, onError: (message: string) => void): void;
        private static _LoadTextureBufferAsync;
        private static _CreateTextureAsync;
        private static _ApplyExtensions;
    }


    /**
     * @internal
     * @deprecated
     */
    export class GLTFBinaryExtension extends GLTFLoaderExtension {
        private _bin;
        constructor();
        loadRuntimeAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onSuccess: (gltfRuntime: IGLTFRuntime) => void): boolean;
        loadBufferAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (buffer: ArrayBufferView) => void, onError: (message: string) => void): boolean;
        loadTextureBufferAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (buffer: ArrayBufferView) => void): boolean;
        loadShaderStringAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (shaderString: string) => void): boolean;
    }


    export var STLFileLoaderMetadata: {
        readonly name: "stl";
        readonly extensions: {
            readonly ".stl": {
                readonly isBinary: true;
            };
        };
    };


        interface SceneLoaderPluginOptions {
            /**
             * Defines options for the stl loader.
             */
            [STLFileLoaderMetadata.name]: {};
        }
    /**
     * STL file type loader.
     * This is a babylon scene loader plugin.
     */
    export class STLFileLoader implements ISceneLoaderPlugin {
        /** @internal */
        solidPattern: RegExp;
        /** @internal */
        facetsPattern: RegExp;
        /** @internal */
        normalPattern: RegExp;
        /** @internal */
        vertexPattern: RegExp;
        /**
         * Defines the name of the plugin.
         */
        readonly name: "stl";
        /**
         * Defines the extensions the stl loader is able to load.
         * force data to come in as an ArrayBuffer
         * we'll convert to string if it looks like it's an ASCII .stl
         */
        readonly extensions: {
            readonly ".stl": {
                readonly isBinary: true;
            };
        };
        /**
         * Defines if Y and Z axes are swapped or not when loading an STL file.
         * The default is false to maintain backward compatibility. When set to
         * true, coordinates from the STL file are used without change.
         */
        static DO_NOT_ALTER_FILE_COORDINATES: boolean;
        /**
         * Import meshes into a scene.
         * @param meshesNames An array of mesh names, a single mesh name, or empty string for all meshes that filter what meshes are imported
         * @param scene The scene to import into
         * @param data The data to import
         * @param rootUrl The root url for scene and resources
         * @param meshes The meshes array to import into
         * @returns True if successful or false otherwise
         */
        importMesh(meshesNames: any, scene: Scene, data: any, rootUrl: string, meshes: Nullable<AbstractMesh[]>): boolean;
        /**
         * Load into a scene.
         * @param scene The scene to load into
         * @param data The data to import
         * @param rootUrl The root url for scene and resources
         * @returns true if successful or false otherwise
         */
        load(scene: Scene, data: any, rootUrl: string): boolean;
        /**
         * Load into an asset container.
         * @param scene The scene to load into
         * @param data The data to import
         * @param rootUrl The root url for scene and resources
         * @returns The loaded asset container
         */
        loadAssetContainer(scene: Scene, data: string, rootUrl: string): AssetContainer;
        private _isBinary;
        private _parseBinary;
        private _parseASCII;
    }




    /**
     * Options for loading Gaussian Splatting and PLY files
     */
    export type SPLATLoadingOptions = {
        /**
         * Defines if buffers should be kept in memory for editing purposes
         */
        keepInRam?: boolean;
    };


    export var SPLATFileLoaderMetadata: {
        readonly name: "splat";
        readonly extensions: {
            readonly ".splat": {
                readonly isBinary: true;
            };
            readonly ".ply": {
                readonly isBinary: true;
            };
            readonly ".spz": {
                readonly isBinary: true;
            };
        };
    };


        interface SceneLoaderPluginOptions {
            /**
             * Defines options for the splat loader.
             */
            [SPLATFileLoaderMetadata.name]: Partial<SPLATLoadingOptions>;
        }
    /**
     * @experimental
     * SPLAT file type loader.
     * This is a babylon scene loader plugin.
     */
    export class SPLATFileLoader implements ISceneLoaderPluginAsync, ISceneLoaderPluginFactory {
        /**
         * Defines the name of the plugin.
         */
        readonly name: "splat";
        private _assetContainer;
        private readonly _loadingOptions;
        /**
         * Defines the extensions the splat loader is able to load.
         * force data to come in as an ArrayBuffer
         */
        readonly extensions: {
            readonly ".splat": {
                readonly isBinary: true;
            };
            readonly ".ply": {
                readonly isBinary: true;
            };
            readonly ".spz": {
                readonly isBinary: true;
            };
        };
        /**
         * Creates loader for gaussian splatting files
         * @param loadingOptions options for loading and parsing splat and PLY files.
         */
        constructor(loadingOptions?: Partial<Readonly<SPLATLoadingOptions>>);
        private static readonly _DefaultLoadingOptions;
        /** @internal */
        createPlugin(options: SceneLoaderPluginOptions): ISceneLoaderPluginAsync;
        /**
         * Imports  from the loaded gaussian splatting data and adds them to the scene
         * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
         * @param scene the scene the meshes should be added to
         * @param data the gaussian splatting data to load
         * @param rootUrl root url to load from
         * @param onProgress callback called while file is loading
         * @param fileName Defines the name of the file to load
         * @returns a promise containing the loaded meshes, particles, skeletons and animations
         */
        importMeshAsync(meshesNames: any, scene: Scene, data: any, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<ISceneLoaderAsyncResult>;
        private static _BuildPointCloud;
        private static _BuildMesh;
        private _parseSPZ;
        private _parse;
        /**
         * Load into an asset container.
         * @param scene The scene to load into
         * @param data The data to import
         * @param rootUrl The root url for scene and resources
         * @returns The loaded asset container
         */
        loadAssetContainerAsync(scene: Scene, data: string, rootUrl: string): Promise<AssetContainer>;
        /**
         * Imports all objects from the loaded OBJ data and adds them to the scene
         * @param scene the scene the objects should be added to
         * @param data the OBJ data to load
         * @param rootUrl root url to load from
         * @returns a promise which completes when objects have been loaded to the scene
         */
        loadAsync(scene: Scene, data: string, rootUrl: string): Promise<void>;
        /**
         * Code from https://github.com/dylanebert/gsplat.js/blob/main/src/loaders/PLYLoader.ts Under MIT license
         * Converts a .ply data array buffer to splat
         * if data array buffer is not ply, returns the original buffer
         * @param data the .ply data to load
         * @returns the loaded splat buffer
         */
        private static _ConvertPLYToSplat;
    }




    /**
     * Class used to load mesh data from OBJ content
     */
    export class SolidParser {
        /** Object descriptor */
        static ObjectDescriptor: RegExp;
        /** Group descriptor */
        static GroupDescriptor: RegExp;
        /** Material lib descriptor */
        static MtlLibGroupDescriptor: RegExp;
        /** Use a material descriptor */
        static UseMtlDescriptor: RegExp;
        /** Smooth descriptor */
        static SmoothDescriptor: RegExp;
        /** Pattern used to detect a vertex */
        static VertexPattern: RegExp;
        /** Pattern used to detect a normal */
        static NormalPattern: RegExp;
        /** Pattern used to detect a UV set */
        static UVPattern: RegExp;
        /** Pattern used to detect a first kind of face (f vertex vertex vertex) */
        static FacePattern1: RegExp;
        /** Pattern used to detect a second kind of face (f vertex/uvs vertex/uvs vertex/uvs) */
        static FacePattern2: RegExp;
        /** Pattern used to detect a third kind of face (f vertex/uvs/normal vertex/uvs/normal vertex/uvs/normal) */
        static FacePattern3: RegExp;
        /** Pattern used to detect a fourth kind of face (f vertex//normal vertex//normal vertex//normal)*/
        static FacePattern4: RegExp;
        /** Pattern used to detect a fifth kind of face (f -vertex/-uvs/-normal -vertex/-uvs/-normal -vertex/-uvs/-normal) */
        static FacePattern5: RegExp;
        /** Pattern used to detect a line(l vertex vertex) */
        static LinePattern1: RegExp;
        /** Pattern used to detect a second kind of line (l vertex/uvs vertex/uvs) */
        static LinePattern2: RegExp;
        /** Pattern used to detect a third kind of line (l vertex/uvs/normal vertex/uvs/normal) */
        static LinePattern3: RegExp;
        private _loadingOptions;
        private _positions;
        private _normals;
        private _uvs;
        private _colors;
        private _extColors;
        private _meshesFromObj;
        private _handledMesh;
        private _indicesForBabylon;
        private _wrappedPositionForBabylon;
        private _wrappedUvsForBabylon;
        private _wrappedColorsForBabylon;
        private _wrappedNormalsForBabylon;
        private _tuplePosNorm;
        private _curPositionInIndices;
        private _hasMeshes;
        private _unwrappedPositionsForBabylon;
        private _unwrappedColorsForBabylon;
        private _unwrappedNormalsForBabylon;
        private _unwrappedUVForBabylon;
        private _triangles;
        private _materialNameFromObj;
        private _objMeshName;
        private _increment;
        private _isFirstMaterial;
        private _grayColor;
        private _materialToUse;
        private _babylonMeshesArray;
        private _pushTriangle;
        private _handednessSign;
        private _hasLineData;
        /**
         * Creates a new SolidParser
         * @param materialToUse defines the array to fill with the list of materials to use (it will be filled by the parse function)
         * @param babylonMeshesArray defines the array to fill with the list of loaded meshes (it will be filled by the parse function)
         * @param loadingOptions defines the loading options to use
         */
        constructor(materialToUse: string[], babylonMeshesArray: Array<Mesh>, loadingOptions: OBJLoadingOptions);
        /**
         * Search for obj in the given array.
         * This function is called to check if a couple of data already exists in an array.
         *
         * If found, returns the index of the founded tuple index. Returns -1 if not found
         * @param arr Array<{ normals: Array<number>, idx: Array<number> }>
         * @param obj Array<number>
         * @returns {boolean}
         */
        private _isInArray;
        private _isInArrayUV;
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
        private _setData;
        /**
         * Transform Vector() and BABYLON.Color() objects into numbers in an array
         */
        private _unwrapData;
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
        private _getTriangles;
        /**
         * To get color between color and extension color
         * @param index Integer The index of the element in the array
         * @returns value of target color
         */
        private _getColor;
        /**
         * Create triangles and push the data for each polygon for the pattern 1
         * In this pattern we get vertice positions
         * @param face
         * @param v
         */
        private _setDataForCurrentFaceWithPattern1;
        /**
         * Create triangles and push the data for each polygon for the pattern 2
         * In this pattern we get vertice positions and uvs
         * @param face
         * @param v
         */
        private _setDataForCurrentFaceWithPattern2;
        /**
         * Create triangles and push the data for each polygon for the pattern 3
         * In this pattern we get vertice positions, uvs and normals
         * @param face
         * @param v
         */
        private _setDataForCurrentFaceWithPattern3;
        /**
         * Create triangles and push the data for each polygon for the pattern 4
         * In this pattern we get vertice positions and normals
         * @param face
         * @param v
         */
        private _setDataForCurrentFaceWithPattern4;
        private _setDataForCurrentFaceWithPattern5;
        private _addPreviousObjMesh;
        private _optimizeNormals;
        private static _IsLineElement;
        private static _IsObjectElement;
        private static _IsGroupElement;
        private static _GetZbrushMRGB;
        /**
         * Function used to parse an OBJ string
         * @param meshesNames defines the list of meshes to load (all if not defined)
         * @param data defines the OBJ string
         * @param scene defines the hosting scene
         * @param assetContainer defines the asset container to load data in
         * @param onFileToLoadFound defines a callback that will be called if a MTL file is found
         */
        parse(meshesNames: any, data: string, scene: Scene, assetContainer: Nullable<AssetContainer>, onFileToLoadFound: (fileToLoad: string) => void): void;
    }


    /**
     * Options for loading OBJ/MTL files
     */
    export type OBJLoadingOptions = {
        /**
         * Defines if UVs are optimized by default during load.
         */
        optimizeWithUV: boolean;
        /**
         * Defines custom scaling of UV coordinates of loaded meshes.
         */
        UVScaling: Vector2;
        /**
         * Invert model on y-axis (does a model scaling inversion)
         */
        invertY: boolean;
        /**
         * Invert Y-Axis of referenced textures on load
         */
        invertTextureY: boolean;
        /**
         * Include in meshes the vertex colors available in some OBJ files.  This is not part of OBJ standard.
         */
        importVertexColors: boolean;
        /**
         * Compute the normals for the model, even if normals are present in the file.
         */
        computeNormals: boolean;
        /**
         * Optimize the normals for the model. Lighting can be uneven if you use OptimizeWithUV = true because new vertices can be created for the same location if they pertain to different faces.
         * Using OptimizehNormals = true will help smoothing the lighting by averaging the normals of those vertices.
         */
        optimizeNormals: boolean;
        /**
         * Skip loading the materials even if defined in the OBJ file (materials are ignored).
         */
        skipMaterials: boolean;
        /**
         * When a material fails to load OBJ loader will silently fail and onSuccess() callback will be triggered.
         */
        materialLoadingFailsSilently: boolean;
        /**
         * Loads assets without handedness conversions. This flag is for compatibility. Use it only if absolutely required. Defaults to false.
         */
        useLegacyBehavior: boolean;
    };


    export var OBJFileLoaderMetadata: {
        readonly name: "obj";
        readonly extensions: ".obj";
    };


        interface SceneLoaderPluginOptions {
            /**
             * Defines options for the obj loader.
             */
            [OBJFileLoaderMetadata.name]: {};
        }
    /**
     * OBJ file type loader.
     * This is a babylon scene loader plugin.
     */
    export class OBJFileLoader implements ISceneLoaderPluginAsync, ISceneLoaderPluginFactory {
        /**
         * Defines if UVs are optimized by default during load.
         */
        static OPTIMIZE_WITH_UV: boolean;
        /**
         * Invert model on y-axis (does a model scaling inversion)
         */
        static INVERT_Y: boolean;
        /**
         * Invert Y-Axis of referenced textures on load
         */
        static get INVERT_TEXTURE_Y(): boolean;
        static set INVERT_TEXTURE_Y(value: boolean);
        /**
         * Include in meshes the vertex colors available in some OBJ files.  This is not part of OBJ standard.
         */
        static IMPORT_VERTEX_COLORS: boolean;
        /**
         * Compute the normals for the model, even if normals are present in the file.
         */
        static COMPUTE_NORMALS: boolean;
        /**
         * Optimize the normals for the model. Lighting can be uneven if you use OptimizeWithUV = true because new vertices can be created for the same location if they pertain to different faces.
         * Using OptimizehNormals = true will help smoothing the lighting by averaging the normals of those vertices.
         */
        static OPTIMIZE_NORMALS: boolean;
        /**
         * Defines custom scaling of UV coordinates of loaded meshes.
         */
        static UV_SCALING: Vector2;
        /**
         * Skip loading the materials even if defined in the OBJ file (materials are ignored).
         */
        static SKIP_MATERIALS: boolean;
        /**
         * When a material fails to load OBJ loader will silently fail and onSuccess() callback will be triggered.
         *
         * Defaults to true for backwards compatibility.
         */
        static MATERIAL_LOADING_FAILS_SILENTLY: boolean;
        /**
         * Loads assets without handedness conversions. This flag is for compatibility. Use it only if absolutely required. Defaults to false.
         */
        static USE_LEGACY_BEHAVIOR: boolean;
        /**
         * Defines the name of the plugin.
         */
        readonly name: "obj";
        /**
         * Defines the extension the plugin is able to load.
         */
        readonly extensions: ".obj";
        private _assetContainer;
        private _loadingOptions;
        /**
         * Creates loader for .OBJ files
         *
         * @param loadingOptions options for loading and parsing OBJ/MTL files.
         */
        constructor(loadingOptions?: OBJLoadingOptions);
        private static get _DefaultLoadingOptions();
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
        private _loadMTL;
        /**
         * Instantiates a OBJ file loader plugin.
         * @returns the created plugin
         */
        createPlugin(): ISceneLoaderPluginAsync | ISceneLoaderPlugin;
        /**
         * If the data string can be loaded directly.
         * @returns if the data can be loaded directly
         */
        canDirectLoad(): boolean;
        /**
         * Imports one or more meshes from the loaded OBJ data and adds them to the scene
         * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
         * @param scene the scene the meshes should be added to
         * @param data the OBJ data to load
         * @param rootUrl root url to load from
         * @returns a promise containing the loaded meshes, particles, skeletons and animations
         */
        importMeshAsync(meshesNames: any, scene: Scene, data: any, rootUrl: string): Promise<ISceneLoaderAsyncResult>;
        /**
         * Imports all objects from the loaded OBJ data and adds them to the scene
         * @param scene the scene the objects should be added to
         * @param data the OBJ data to load
         * @param rootUrl root url to load from
         * @returns a promise which completes when objects have been loaded to the scene
         */
        loadAsync(scene: Scene, data: string, rootUrl: string): Promise<void>;
        /**
         * Load into an asset container.
         * @param scene The scene to load into
         * @param data The data to import
         * @param rootUrl The root url for scene and resources
         * @returns The loaded asset container
         */
        loadAssetContainerAsync(scene: Scene, data: string, rootUrl: string): Promise<AssetContainer>;
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
        private _parseSolid;
    }


    /**
     * Class reading and parsing the MTL file bundled with the obj file.
     */
    export class MTLFileLoader {
        /**
         * Invert Y-Axis of referenced textures on load
         */
        static INVERT_TEXTURE_Y: boolean;
        /**
         * All material loaded from the mtl will be set here
         */
        materials: StandardMaterial[];
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
        parseMTL(scene: Scene, data: string | ArrayBuffer, rootUrl: string, assetContainer: Nullable<AssetContainer>): void;
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
        private static _GetTexture;
    }





}


