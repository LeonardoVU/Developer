/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "babylonjs-gltf2interface" {
    export = BABYLON.GLTF2;
}

/**
 * Module for glTF 2.0 Interface
 */
declare module BABYLON.GLTF2 {
    /**
     * The datatype of the components in the attribute
     */
    const enum AccessorComponentType {
        /**
         * Byte
         */
        BYTE = 5120,
        /**
         * Unsigned Byte
         */
        UNSIGNED_BYTE = 5121,
        /**
         * Short
         */
        SHORT = 5122,
        /**
         * Unsigned Short
         */
        UNSIGNED_SHORT = 5123,
        /**
         * Unsigned Int
         */
        UNSIGNED_INT = 5125,
        /**
         * Float
         */
        FLOAT = 5126,
    }

    /**
     * Specifies if the attirbute is a scalar, vector, or matrix
     */
    const enum AccessorType {
        /**
         * Scalar
         */
        SCALAR = "SCALAR",
        /**
         * Vector2
         */
        VEC2 = "VEC2",
        /**
         * Vector3
         */
        VEC3 = "VEC3",
        /**
         * Vector4
         */
        VEC4 = "VEC4",
        /**
         * Matrix2x2
         */
        MAT2 = "MAT2",
        /**
         * Matrix3x3
         */
        MAT3 = "MAT3",
        /**
         * Matrix4x4
         */
        MAT4 = "MAT4",
    }

    /**
     * The name of the node's TRS property to modify,
     * or the weights of the Morph Targets it instantiates,
     * or pointer is use of KHR_animation_pointer extension
     */
    const enum AnimationChannelTargetPath {
        /**
         * Translation
         */
        TRANSLATION = "translation",
        /**
         * Rotation
         */
        ROTATION = "rotation",
        /**
         * Scale
         */
        SCALE = "scale",
        /**
         * Weights
         */
        WEIGHTS = "weights",
        /**
         * Pointer
         */
        POINTER = "pointer",
    }

    /**
     * Interpolation algorithm
     */
    const enum AnimationSamplerInterpolation {
        /**
         * The animated values are linearly interpolated between keyframes
         */
        LINEAR = "LINEAR",
        /**
         * The animated values remain constant to the output of the first keyframe, until the next keyframe
         */
        STEP = "STEP",
        /**
         * The animation's interpolation is computed using a cubic spline with specified tangents
         */
        CUBICSPLINE = "CUBICSPLINE",
    }

    /**
     * A camera's projection.  A node can reference a camera to apply a transform to place the camera in the scene
     */
    const enum CameraType {
        /**
         * A perspective camera containing properties to create a perspective projection matrix
         */
        PERSPECTIVE = "perspective",
        /**
         * An orthographic camera containing properties to create an orthographic projection matrix
         */
        ORTHOGRAPHIC = "orthographic",
    }

    /**
     * The mime-type of the image
     */
    const enum ImageMimeType {
        /**
         * JPEG Mime-type
         */
        JPEG = "image/jpeg",
        /**
         * PNG Mime-type
         */
        PNG = "image/png",
        /**
         * WEBP Mime-type
         */
        WEBP = "image/webp",
        /**
         * AVIF Mime-type
         */
        AVIF = "image/avif",
    }

    /**
     * The alpha rendering mode of the material
     */
    const enum MaterialAlphaMode {
        /**
         * The alpha value is ignored and the rendered output is fully opaque
         */
        OPAQUE = "OPAQUE",
        /**
         * The rendered output is either fully opaque or fully transparent depending on the alpha value and the specified alpha cutoff value
         */
        MASK = "MASK",
        /**
         * The alpha value is used to composite the source and destination areas. The rendered output is combined with the background using the normal painting operation (i.e. the Porter and Duff over operator)
         */
        BLEND = "BLEND",
    }

    /**
     * The type of the primitives to render
     */
    const enum MeshPrimitiveMode {
        /**
         * Points
         */
        POINTS = 0,
        /**
         * Lines
         */
        LINES = 1,
        /**
         * Line Loop
         */
        LINE_LOOP = 2,
        /**
         * Line Strip
         */
        LINE_STRIP = 3,
        /**
         * Triangles
         */
        TRIANGLES = 4,
        /**
         * Triangle Strip
         */
        TRIANGLE_STRIP = 5,
        /**
         * Triangle Fan
         */
        TRIANGLE_FAN = 6,
    }

    /**
     * Magnification filter.  Valid values correspond to WebGL enums: 9728 (NEAREST) and 9729 (LINEAR)
     */
    const enum TextureMagFilter {
        /**
         * Nearest
         */
        NEAREST = 9728,
        /**
         * Linear
         */
        LINEAR = 9729,
    }

    /**
     * Minification filter.  All valid values correspond to WebGL enums
     */
    const enum TextureMinFilter {
        /**
         * Nearest
         */
        NEAREST = 9728,
        /**
         * Linear
         */
        LINEAR = 9729,
        /**
         * Nearest Mip-Map Nearest
         */
        NEAREST_MIPMAP_NEAREST = 9984,
        /**
         * Linear Mipmap Nearest
         */
        LINEAR_MIPMAP_NEAREST = 9985,
        /**
         * Nearest Mipmap Linear
         */
        NEAREST_MIPMAP_LINEAR = 9986,
        /**
         * Linear Mipmap Linear
         */
        LINEAR_MIPMAP_LINEAR = 9987,
    }

    /**
     * S (U) wrapping mode.  All valid values correspond to WebGL enums
     */
    const enum TextureWrapMode {
        /**
         * Clamp to Edge
         */
        CLAMP_TO_EDGE = 33071,
        /**
         * Mirrored Repeat
         */
        MIRRORED_REPEAT = 33648,
        /**
         * Repeat
         */
        REPEAT = 10497,
    }

    /**
     * glTF Property
     */
    interface IProperty {
        /**
         * Dictionary object with extension-specific objects
         */
        extensions?: {
            [key: string]: any;
        };
        /**
         * Application-Specific data
         */
        extras?: any;
    }

    /**
     * glTF Child of Root Property
     */
    interface IChildRootProperty extends IProperty {
        /**
         * The user-defined name of this object
         */
        name?: string;
    }

    /**
     * Indices of those attributes that deviate from their initialization value
     */
    interface IAccessorSparseIndices extends IProperty {
        /**
         * The index of the bufferView with sparse indices. Referenced bufferView can't have ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER target
         */
        bufferView: number;
        /**
         * The offset relative to the start of the bufferView in bytes. Must be aligned
         */
        byteOffset?: number;
        /**
         * The indices data type.  Valid values correspond to WebGL enums: 5121 (UNSIGNED_BYTE), 5123 (UNSIGNED_SHORT), 5125 (UNSIGNED_INT)
         */
        componentType: AccessorComponentType;
    }

    /**
     * Array of size accessor.sparse.count times number of components storing the displaced accessor attributes pointed by accessor.sparse.indices
     */
    interface IAccessorSparseValues extends IProperty {
        /**
         * The index of the bufferView with sparse values. Referenced bufferView can't have ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER target
         */
        bufferView: number;
        /**
         * The offset relative to the start of the bufferView in bytes. Must be aligned
         */
        byteOffset?: number;
    }

    /**
     * Sparse storage of attributes that deviate from their initialization value
     */
    interface IAccessorSparse extends IProperty {
        /**
         * The number of attributes encoded in this sparse accessor
         */
        count: number;
        /**
         * Index array of size count that points to those accessor attributes that deviate from their initialization value. Indices must strictly increase
         */
        indices: IAccessorSparseIndices;
        /**
         * Array of size count times number of components, storing the displaced accessor attributes pointed by indices. Substituted values must have the same componentType and number of components as the base accessor
         */
        values: IAccessorSparseValues;
    }

    /**
     * A typed view into a bufferView.  A bufferView contains raw binary data.  An accessor provides a typed view into a bufferView or a subset of a bufferView similar to how WebGL's vertexAttribPointer() defines an attribute in a buffer
     */
    interface IAccessor extends IChildRootProperty {
        /**
         * The index of the bufferview
         */
        bufferView?: number;
        /**
         * The offset relative to the start of the bufferView in bytes
         */
        byteOffset?: number;
        /**
         * The datatype of components in the attribute
         */
        componentType: AccessorComponentType;
        /**
         * Specifies whether integer data values should be normalized
         */
        normalized?: boolean;
        /**
         * The number of attributes referenced by this accessor
         */
        count: number;
        /**
         * Specifies if the attribute is a scalar, vector, or matrix
         */
        type: AccessorType;
        /**
         * Maximum value of each component in this attribute
         */
        max?: number[];
        /**
         * Minimum value of each component in this attribute
         */
        min?: number[];
        /**
         * Sparse storage of attributes that deviate from their initialization value
         */
        sparse?: IAccessorSparse;
    }

    /**
     * Targets an animation's sampler at a node's property
     */
    interface IAnimationChannel extends IProperty {
        /**
         * The index of a sampler in this animation used to compute the value for the target
         */
        sampler: number;
        /**
         * The index of the node and TRS property to target
         */
        target: IAnimationChannelTarget;
    }

    /**
     * The index of the node and TRS property that an animation channel targets
     */
    interface IAnimationChannelTarget extends IProperty {
        /**
         * The index of the node to target
         */
        node?: number;
        /**
         * The name of the node's TRS property to modify, or the weights of the Morph Targets it instantiates
         */
        path: AnimationChannelTargetPath;
    }

    /**
     * Combines input and output accessors with an interpolation algorithm to define a keyframe graph (but not its target)
     */
    interface IAnimationSampler extends IProperty {
        /**
         * The index of an accessor containing keyframe input values, e.g., time
         */
        input: number;
        /**
         * Interpolation algorithm
         */
        interpolation?: AnimationSamplerInterpolation;
        /**
         * The index of an accessor, containing keyframe output values
         */
        output: number;
    }

    /**
     * A keyframe animation
     */
    interface IAnimation extends IChildRootProperty {
        /**
         * An array of channels, each of which targets an animation's sampler at a node's property
         */
        channels: IAnimationChannel[];
        /**
         * An array of samplers that combines input and output accessors with an interpolation algorithm to define a keyframe graph (but not its target)
         */
        samplers: IAnimationSampler[];
    }

    /**
     * Metadata about the glTF asset
     */
    interface IAsset extends IChildRootProperty {
        /**
         * A copyright message suitable for display to credit the content creator
         */
        copyright?: string;
        /**
         * Tool that generated this glTF model.  Useful for debugging
         */
        generator?: string;
        /**
         * The glTF version that this asset targets
         */
        version: string;
        /**
         * The minimum glTF version that this asset targets
         */
        minVersion?: string;
    }

    /**
     * A buffer points to binary geometry, animation, or skins
     */
    interface IBuffer extends IChildRootProperty {
        /**
         * The uri of the buffer.  Relative paths are relative to the .gltf file.  Instead of referencing an external file, the uri can also be a data-uri
         */
        uri?: string;
        /**
         * The length of the buffer in bytes
         */
        byteLength: number;
    }

    /**
     * A view into a buffer generally representing a subset of the buffer
     */
    interface IBufferView extends IChildRootProperty {
        /**
         * The index of the buffer
         */
        buffer: number;
        /**
         * The offset into the buffer in bytes
         */
        byteOffset?: number;
        /**
         * The lenth of the bufferView in bytes
         */
        byteLength: number;
        /**
         * The stride, in bytes
         */
        byteStride?: number;
    }

    /**
     * An orthographic camera containing properties to create an orthographic projection matrix
     */
    interface ICameraOrthographic extends IProperty {
        /**
         * The floating-point horizontal magnification of the view. Must not be zero
         */
        xmag: number;
        /**
         * The floating-point vertical magnification of the view. Must not be zero
         */
        ymag: number;
        /**
         * The floating-point distance to the far clipping plane. zfar must be greater than znear
         */
        zfar: number;
        /**
         * The floating-point distance to the near clipping plane
         */
        znear: number;
    }

    /**
     * A perspective camera containing properties to create a perspective projection matrix
     */
    interface ICameraPerspective extends IProperty {
        /**
         * The floating-point aspect ratio of the field of view
         */
        aspectRatio?: number;
        /**
         * The floating-point vertical field of view in radians
         */
        yfov: number;
        /**
         * The floating-point distance to the far clipping plane
         */
        zfar?: number;
        /**
         * The floating-point distance to the near clipping plane
         */
        znear: number;
    }

    /**
     * A camera's projection.  A node can reference a camera to apply a transform to place the camera in the scene
     */
    interface ICamera extends IChildRootProperty {
        /**
         * An orthographic camera containing properties to create an orthographic projection matrix
         */
        orthographic?: ICameraOrthographic;
        /**
         * A perspective camera containing properties to create a perspective projection matrix
         */
        perspective?: ICameraPerspective;
        /**
         * Specifies if the camera uses a perspective or orthographic projection
         */
        type: CameraType;
    }

    /**
     * Image data used to create a texture. Image can be referenced by URI or bufferView index. mimeType is required in the latter case
     */
    interface IImage extends IChildRootProperty {
        /**
         * The uri of the image.  Relative paths are relative to the .gltf file.  Instead of referencing an external file, the uri can also be a data-uri.  The image format must be jpg or png
         */
        uri?: string;
        /**
         * The image's MIME type
         */
        mimeType?: ImageMimeType;
        /**
         * The index of the bufferView that contains the image. Use this instead of the image's uri property
         */
        bufferView?: number;
    }

    /**
     * Material Normal Texture Info
     */
    interface IMaterialNormalTextureInfo extends ITextureInfo {
        /**
         * The scalar multiplier applied to each normal vector of the normal texture
         */
        scale?: number;
    }

    /**
     * Material Occlusion Texture Info
     */
    interface IMaterialOcclusionTextureInfo extends ITextureInfo {
        /**
         * A scalar multiplier controlling the amount of occlusion applied
         */
        strength?: number;
    }

    /**
     * A set of parameter values that are used to define the metallic-roughness material model from Physically-Based Rendering (PBR) methodology
     */
    interface IMaterialPbrMetallicRoughness {
        /**
         * The material's base color factor
         */
        baseColorFactor?: number[];
        /**
         * The base color texture
         */
        baseColorTexture?: ITextureInfo;
        /**
         * The metalness of the material
         */
        metallicFactor?: number;
        /**
         * The roughness of the material
         */
        roughnessFactor?: number;
        /**
         * The metallic-roughness texture
         */
        metallicRoughnessTexture?: ITextureInfo;
    }

    /**
     * The material appearance of a primitive
     */
    interface IMaterial extends IChildRootProperty {
        /**
         * A set of parameter values that are used to define the metallic-roughness material model from Physically-Based Rendering (PBR) methodology. When not specified, all the default values of pbrMetallicRoughness apply
         */
        pbrMetallicRoughness?: IMaterialPbrMetallicRoughness;
        /**
         * The normal map texture
         */
        normalTexture?: IMaterialNormalTextureInfo;
        /**
         * The occlusion map texture
         */
        occlusionTexture?: IMaterialOcclusionTextureInfo;
        /**
         * The emissive map texture
         */
        emissiveTexture?: ITextureInfo;
        /**
         * The RGB components of the emissive color of the material. These values are linear. If an emissiveTexture is specified, this value is multiplied with the texel values
         */
        emissiveFactor?: number[];
        /**
         * The alpha rendering mode of the material
         */
        alphaMode?: MaterialAlphaMode;
        /**
         * The alpha cutoff value of the material
         */
        alphaCutoff?: number;
        /**
         * Specifies whether the material is double sided
         */
        doubleSided?: boolean;
    }

    /**
     * Geometry to be rendered with the given material
     */
    interface IMeshPrimitive extends IProperty {
        /**
         * A dictionary object, where each key corresponds to mesh attribute semantic and each value is the index of the accessor containing attribute's data
         */
        attributes: {
            [name: string]: number;
        };
        /**
         * The index of the accessor that contains the indices
         */
        indices?: number;
        /**
         * The index of the material to apply to this primitive when rendering
         */
        material?: number;
        /**
         * The type of primitives to render. All valid values correspond to WebGL enums
         */
        mode?: MeshPrimitiveMode;
        /**
         * An array of Morph Targets, each  Morph Target is a dictionary mapping attributes (only POSITION, NORMAL, and TANGENT supported) to their deviations in the Morph Target
         */
        targets?: {
            [name: string]: number;
        }[];
    }

    /**
     * A set of primitives to be rendered.  A node can contain one mesh.  A node's transform places the mesh in the scene
     */
    interface IMesh extends IChildRootProperty {
        /**
         * An array of primitives, each defining geometry to be rendered with a material
         */
        primitives: IMeshPrimitive[];
        /**
         * Array of weights to be applied to the Morph Targets
         */
        weights?: number[];
    }

    /**
     * A node in the node hierarchy
     */
    interface INode extends IChildRootProperty {
        /**
         * The index of the camera referenced by this node
         */
        camera?: number;
        /**
         * The indices of this node's children
         */
        children?: number[];
        /**
         * The index of the skin referenced by this node
         */
        skin?: number;
        /**
         * A floating-point 4x4 transformation matrix stored in column-major order
         */
        matrix?: number[];
        /**
         * The index of the mesh in this node
         */
        mesh?: number;
        /**
         * The node's unit quaternion rotation in the order (x, y, z, w), where w is the scalar
         */
        rotation?: number[];
        /**
         * The node's non-uniform scale, given as the scaling factors along the x, y, and z axes
         */
        scale?: number[];
        /**
         * The node's translation along the x, y, and z axes
         */
        translation?: number[];
        /**
         * The weights of the instantiated Morph Target. Number of elements must match number of Morph Targets of used mesh
         */
        weights?: number[];
    }

    /**
     * Texture sampler properties for filtering and wrapping modes
     */
    interface ISampler extends IChildRootProperty {
        /**
         * Magnification filter.  Valid values correspond to WebGL enums: 9728 (NEAREST) and 9729 (LINEAR)
         */
        magFilter?: TextureMagFilter;
        /**
         * Minification filter.  All valid values correspond to WebGL enums
         */
        minFilter?: TextureMinFilter;
        /**
         * S (U) wrapping mode.  All valid values correspond to WebGL enums
         */
        wrapS?: TextureWrapMode;
        /**
         * T (V) wrapping mode.  All valid values correspond to WebGL enums
         */
        wrapT?: TextureWrapMode;
    }

    /**
     * The root nodes of a scene
     */
    interface IScene extends IChildRootProperty {
        /**
         * The indices of each root node
         */
        nodes: number[];
    }

    /**
     * Joints and matrices defining a skin
     */
    interface ISkin extends IChildRootProperty {
        /**
         * The index of the accessor containing the floating-point 4x4 inverse-bind matrices.  The default is that each matrix is a 4x4 identity matrix, which implies that inverse-bind matrices were pre-applied
         */
        inverseBindMatrices?: number;
        /**
         * The index of the node used as a skeleton root. When undefined, joints transforms resolve to scene root
         */
        skeleton?: number;
        /**
         * Indices of skeleton nodes, used as joints in this skin.  The array length must be the same as the count property of the inverseBindMatrices accessor (when defined)
         */
        joints: number[];
    }

    /**
     * A texture and its sampler
     */
    interface ITexture extends IChildRootProperty {
        /**
         * The index of the sampler used by this texture. When undefined, a sampler with repeat wrapping and auto filtering should be used
         */
        sampler?: number;
        /**
         * The index of the image used by this texture
         */
        source: number;
    }

    /**
     * Reference to a texture
     */
    interface ITextureInfo extends IProperty {
        /**
         * The index of the texture
         */
        index: number;
        /**
         * The set index of texture's TEXCOORD attribute used for texture coordinate mapping
         */
        texCoord?: number;
    }

    /**
     * The root object for a glTF asset
     */
    interface IGLTF extends IProperty {
        /**
         * An array of accessors. An accessor is a typed view into a bufferView
         */
        accessors?: IAccessor[];
        /**
         * An array of keyframe animations
         */
        animations?: IAnimation[];
        /**
         * Metadata about the glTF asset
         */
        asset: IAsset;
        /**
         * An array of buffers.  A buffer points to binary geometry, animation, or skins
         */
        buffers?: IBuffer[];
        /**
         * An array of bufferViews.  A bufferView is a view into a buffer generally representing a subset of the buffer
         */
        bufferViews?: IBufferView[];
        /**
         * An array of cameras
         */
        cameras?: ICamera[];
        /**
         * Names of glTF extensions used somewhere in this asset
         */
        extensionsUsed?: string[];
        /**
         * Names of glTF extensions required to properly load this asset
         */
        extensionsRequired?: string[];
        /**
         * An array of images.  An image defines data used to create a texture
         */
        images?: IImage[];
        /**
         * An array of materials.  A material defines the appearance of a primitive
         */
        materials?: IMaterial[];
        /**
         * An array of meshes.  A mesh is a set of primitives to be rendered
         */
        meshes?: IMesh[];
        /**
         * An array of nodes
         */
        nodes?: INode[];
        /**
         * An array of samplers.  A sampler contains properties for texture filtering and wrapping modes
         */
        samplers?: ISampler[];
        /**
         * The index of the default scene
         */
        scene?: number;
        /**
         * An array of scenes
         */
        scenes?: IScene[];
        /**
         * An array of skins.  A skin is defined by joints and matrices
         */
        skins?: ISkin[];
        /**
         * An array of textures
         */
        textures?: ITexture[];
    }

    /**
     * The glTF validation results
     * @ignore
     */
    interface IGLTFValidationResults {
        info: {
            generator: string;
            hasAnimations: boolean;
            hasDefaultScene: boolean;
            hasMaterials: boolean;
            hasMorphTargets: boolean;
            hasSkins: boolean;
            hasTextures: boolean;
            maxAttributesUsed: number;
            primitivesCount: number;
        };
        issues: {
            messages: Array<string>;
            numErrors: number;
            numHints: number;
            numInfos: number;
            numWarnings: number;
            truncated: boolean;
        };
        mimeType: string;
        uri: string;
        validatedAt: string;
        validatorVersion: string;
    }

    /**
     * The glTF validation options
     */
    interface IGLTFValidationOptions {
        /** Uri to use */
        uri?: string;
        /** Function used to load external resources */
        externalResourceFunction?: (uri: string) => Promise<Uint8Array>;
        /** Boolean indicating that we need to validate accessor data */
        validateAccessorData?: boolean;
        /** max number of issues allowed */
        maxIssues?: number;
        /** Ignored issues */
        ignoredIssues?: Array<string>;
        /** Value to override severy settings */
        severityOverrides?: Object;
    }

    /**
     * The glTF validator object
     * @internal
     */
    interface IGLTFValidator {
        validateBytes: (data: Uint8Array, options?: IGLTFValidationOptions) => Promise<IGLTFValidationResults>;
        validateString: (json: string, options?: IGLTFValidationOptions) => Promise<IGLTFValidationResults>;
    }

    /**
     * Interfaces from the EXT_lights_image_based extension
     */

    /** @internal */
    interface IEXTLightsImageBased_LightReferenceImageBased {
        light: number;
    }

    /** @internal */
    interface IEXTLightsImageBased_LightImageBased extends IChildRootProperty {
        intensity: number;
        rotation: number[];
        specularImageSize: number;
        specularImages: number[][];
        irradianceCoefficients: number[][];
    }

    /** @internal */
    interface IEXTLightsImageBased {
        lights: IEXTLightsImageBased_LightImageBased[];
    }

    /**
     * Interfaces from the EXT_mesh_gpu_instancing extension
     * !!! Experimental Extension Subject to Changes !!!
     */

    /** @internal */
    interface IEXTMeshGpuInstancing {
        mesh?: number;
        attributes: { [name: string]: number };
    }

    /**
     * Interfaces from the KHR_draco_mesh_compression extension
     */

    /** @internal */
    interface IKHRDracoMeshCompression {
        bufferView: number;
        attributes: { [name: string]: number };
    }

    /**
     * Interfaces from the EXT_lights_ies extension
     */

    /** @internal */
    interface IEXTLightsIES_LightReference {
        light: number;
        color?: number[];
        multiplier?: number;
    }

    /** @internal */
    interface IEXTLightsIES_Light extends IChildRootProperty {
        uri?: string;
        bufferView?: number;
        mimeType?: string;
    }

    /**
     * Interfaces from the KHR_lights_punctual extension
     */

    /** @internal */
    const enum KHRLightsPunctual_LightType {
        DIRECTIONAL = "directional",
        POINT = "point",
        SPOT = "spot",
    }

    /** @internal */
    interface IKHRLightsPunctual_LightReference {
        light: number;
    }

    /** @internal */
    interface IKHRLightsPunctual_Light extends IChildRootProperty {
        type: KHRLightsPunctual_LightType;
        color?: number[];
        intensity?: number;
        range?: number;
        spot?: {
            innerConeAngle?: number;
            outerConeAngle?: number;
        };
    }

    /** @internal */
    interface IKHRLightsPunctual {
        lights: IKHRLightsPunctual_Light[];
    }

    /**
     * Interfaces from the KHR_materials_clearcoat extension
     */
    /** @internal */
    interface IKHRMaterialsClearcoat {
        clearcoatFactor?: number;
        clearcoatTexture?: ITextureInfo;
        clearcoatRoughnessFactor?: number;
        clearcoatRoughnessTexture?: ITextureInfo;
        clearcoatNormalTexture?: IMaterialNormalTextureInfo;
    }

    /** @internal */
    interface IKHRMaterialsIridescence {
        iridescenceFactor?: number;
        iridescenceIor?: number;
        iridescenceThicknessMinimum?: number;
        iridescenceThicknessMaximum?: number;
        iridescenceTexture?: ITextureInfo;
        iridescenceThicknessTexture?: ITextureInfo;
    }

    /** @internal */
    interface IKHRMaterialsAnisotropy {
        anisotropyStrength?: number;
        anisotropyRotation?: number;
        anisotropyTexture?: ITextureInfo;
    }

    /**
     * Interfaces from the KHR_materials_ior extension
     */

    /** @internal */
    interface IKHRMaterialsIor {
        ior?: number;
    }

    /**
     * Interfaces from the KHR_materials_volume extension
     */

    /** @internal */
    interface IKHRMaterialsVolume {
        thicknessFactor?: number;
        thicknessTexture?: ITextureInfo;
        attenuationDistance?: number;
        attenuationColor?: number[];
    }

    /**
     * Interfaces from the KHR_materials_dispersion extension
     */

    /** @internal */
    interface IKHRMaterialsDispersion {
        dispersion?: number;
    }

    /**
     * Interfaces from the KHR_materials_specular extension
     */

    /** @internal */
    interface IKHRMaterialsSpecular {
        specularFactor?: number;
        specularColorFactor?: number[];
        specularTexture?: ITextureInfo;
        specularColorTexture?: ITextureInfo;
        /**
         * Dictionary object with extension-specific objects
         */
        extensions?: {
            [key: string]: any;
        };
    }

    /**
     * Interfaces from the EXT_materials_specular_edge_color extension
     */

    /** @internal */
    interface IEXTMaterialsSpecularEdgeColor {
        specularEdgeColorEnabled?: boolean;
    }

    /**
     * Interfaces from the KHR_materials_transmission extension
     */

    /** @internal */
    interface IKHRMaterialsTransmission {
        transmissionFactor?: number;
        transmissionTexture?: ITextureInfo;
    }

    /**
     * Interfaces from the KHR_materials_emissive_strength extension
     */

    /** @internal */
    interface IKHRMaterialsEmissiveStrength {
        emissiveStrength: number;
    }

    /**
     * Interfaces from the KHR_materials_pbrSpecularGlossiness extension
     */

    /** @internal */
    interface IKHRMaterialsPbrSpecularGlossiness {
        diffuseFactor: number[];
        diffuseTexture: ITextureInfo;
        specularFactor: number[];
        glossinessFactor: number;
        specularGlossinessTexture: ITextureInfo;
    }

    /**
     * Interfaces from the KHR_materials_sheen extension
     */

    /** @internal */
    interface IKHRMaterialsSheen {
        sheenColorFactor?: number[];
        sheenColorTexture?: ITextureInfo;
        sheenRoughnessFactor?: number;
        sheenRoughnessTexture?: ITextureInfo;
    }

    /**
     * Interfaces from the KHR_materials_diffuse_transmission extension
     * !!! Experimental Extension Subject to Changes !!!
     */

    /** @internal */
    interface IKHRMaterialsDiffuseTransmission {
        diffuseTransmissionFactor?: number;
        diffuseTransmissionTexture?: ITextureInfo;
        diffuseTransmissionColorFactor?: number[];
        diffuseTransmissionColorTexture?: ITextureInfo;
    }

    /**
     * Interfaces from the EXT_materials_diffuse_roughness extension
     */
    /** @internal */
    interface IEXTMaterialsDiffuseRoughness {
        diffuseRoughnessFactor?: number;
        diffuseRoughnessTexture?: ITextureInfo;
    }

    /**
     * Interfaces from the KHR_materials_variants extension
     */

    /** @internal */
    interface IKHRMaterialVariants_Mapping extends IProperty {
        mappings: Array<{
            variants: number[];
            material: number;
        }>;
    }

    /** @internal */
    interface IKHRMaterialVariants_Variant extends IProperty {
        name: string;
    }

    /** @internal */
    interface IKHRMaterialVariants_Variants extends IChildRootProperty {
        variants: Array<IKHRMaterialVariants_Variant>;
    }

    /**
     * Interfaces from the KHR_texture_basisu extension
     */

    /** @internal */
    interface IKHRTextureBasisU {
        source: number;
    }

    /**
     * Interfaces from the EXT_texture_webp extension
     */

    /** @internal */
    interface IEXTTextureWebP {
        source: number;
    }

    /**
     * Interfaces from the EXT_texture_avif extension
     */

    /** @internal */
    interface IEXTTextureAVIF {
        source: number;
    }

    /**
     * Interfaces from the KHR_texture_transform extension
     */

    /** @internal */
    interface IKHRTextureTransform {
        offset?: number[];
        rotation?: number;
        scale?: number[];
        texCoord?: number;
    }

    /**
     * Interfaces from the KHR_xmp_json_ld extension
     */

    /** @internal */
    interface IKHRXmpJsonLd_Gltf {
        packets: Array<{
            [key: string]: unknown;
        }>;
    }

    /** @internal */
    interface IKHRXmpJsonLd_Node {
        packet: number;
    }

    /**
     * Interfaces from the KHR_animation_pointer extension
     * !!! Experimental Extension Subject to Changes !!!
     */

    /** @hidden */
    interface IKHRAnimationPointer {
        pointer: string;
    }

    /**
     * Interfaces from the MSFT_audio_emitter extension
     */

    /** @internal */
    interface IMSFTAudioEmitter_ClipReference {
        clip: number;
        weight?: number;
    }

    /** @internal */
    interface IMSFTAudioEmitter_EmittersReference {
        emitters: number[];
    }

    /** @internal */
    const enum IMSFTAudioEmitter_DistanceModel {
        linear = "linear",
        inverse = "inverse",
        exponential = "exponential",
    }

    /** @internal */
    interface IMSFTAudioEmitter_Emitter {
        name?: string;
        distanceModel?: IMSFTAudioEmitter_DistanceModel;
        refDistance?: number;
        maxDistance?: number;
        rolloffFactor?: number;
        innerAngle?: number;
        outerAngle?: number;
        loop?: boolean;
        volume?: number;
        clips: IMSFTAudioEmitter_ClipReference[];
    }

    /** @internal */
    const enum IMSFTAudioEmitter_AudioMimeType {
        WAV = "audio/wav",
    }

    /** @internal */
    interface IMSFTAudioEmitter_Clip extends IProperty {
        uri?: string;
        bufferView?: number;
        mimeType?: IMSFTAudioEmitter_AudioMimeType;
    }

    /** @internal */
    const enum IMSFTAudioEmitter_AnimationEventAction {
        play = "play",
        pause = "pause",
        stop = "stop",
    }

    /** @internal */
    interface IMSFTAudioEmitter_AnimationEvent {
        action: IMSFTAudioEmitter_AnimationEventAction;
        emitter: number;
        time: number;
        startOffset?: number;
    }

    /**
     * Interfaces from the MSFT_lod extension
     */

    /** @internal */
    interface IMSFTLOD {
        ids: number[];
    }

    /**
     * Interfaces from the EXT_meshopt_compression extension
     */

    /** @internal */
    interface IEXTMeshoptCompression {
        buffer: number;
        byteOffset?: number;
        byteLength: number;
        byteStride: number;
        count: number;
        mode: "ATTRIBUTES" | "TRIANGLES" | "INDICES";
        filter?: "NONE" | "OCTAHEDRAL" | "QUATERNION" | "EXPONENTIAL";
    }

    /**
     * Interfaces for the KHR_interactivity extension
     */
    interface IKHRInteractivity {
        /**
         * Holding all of the graphs in the glTF
         */
        graphs: IKHRInteractivity_Graph[];
        /**
         * The graph to run. Defaults to index 0
         */
        graph?: number;
    }

    interface IKHRInteractivity_Graph {
        types?: IKHRInteractivity_Type /* | IKHRInteractivity_CustomType */[]; // should technically behave as a set - no two signatures should match
        variables?: IKHRInteractivity_Variable[];
        events?: IKHRInteractivity_Event[];
        declarations?: IKHRInteractivity_Declaration[];
        nodes?: IKHRInteractivity_Node[];
    }

    /**
     * An index of the types array
     */
    type TypeIndex = number;
    /**
     * An index of the declaration array
     */
    type DeclarationIndex = number;

    /**
     * An index of the nodes array
     */
    type NodeIndex = number;
    /**
     * Value types supported (in js it is either boolean or number)
     */
    type ValueType = (boolean | number)[];

    type ValueSignature = "bool" | "float" | "float2" | "float3" | "float4" | "float2x2" | "float3x3" | "float4x4" | "int" | "custom";

    type ConfigurationValueSignature = "bool" | "int" | "int[]" | "string";

    type ConfigurationValueType = (boolean | number | string)[];

    interface IKHRInteractivity_Event {
        /**
         * The event id is an application-specific event identifier recognized by the execution environment. If the id property is undefined, the event is considered internal to the graph.
         */
        id?: string;
        /**
         * The properties of the values object define ids and the values of those properties define types and optional initial values of the value sockets associated with the event.
         */
        values?:
            | {
                  [id: string]: IKHRInteractivity_Variable;
              }
            | undefined;
    }

    interface IKHRInteractivity_Type {
        /**
         * A signature of this type or custom if defined by an external extension
         */
        signature: ValueSignature;
    }

    // interface IKHRInteractivity_CustomType {
    //     signature: string;
    // }

    interface IKHRInteractivity_Variable {
        /**
         * Array size depends on the type. primitives have array size 1, rest depending on the object type (2,3,4,16)
         * if value is not provided it should be initialized to the default value of the type according to the specs - NaN for floats, 0 for integers, false for booleans.
         */
        value?: ValueType;
        /**
         * An index in the types array
         */
        type: TypeIndex;
    }

    /**
     * a KHR_Interactivity operation declaration.
     * Declarations are considered equal when their op, extension and input values are equal.
     * If stating an external extension it is possible the declaration is not supported by the engine. In this case the operation will be a no-op
     */
    interface IKHRInteractivity_Declaration {
        /**
         * the operation identifier.
         * Either defined by the interactivity extension or a custom operation by an external extension
         */
        op: string;
        /**
         * If the op is not defined by the interactivity specs, this states the extension that defines the operation
         */
        extension?: string;
        /**
         * If custom operation, this is the output values signatures of the event
         * if undefined the custom operation has no outputs
         */
        outputValueSockets?: { [id: string]: { type: TypeIndex } };
        /**
         * if custom operation, this is the input values signatures of the event
         * If undefined the custom operation has no inputs
         */
        inputValueSockets?: { [id: string]: { type: TypeIndex } };
    }

    interface IKHRInteractivity_Node {
        /**
         * An index in the declarations array
         */
        declaration: DeclarationIndex;
        /**
         * Input value sockets
         */
        values?: { [id: string]: IKHRInteractivity_Variable | IKHRInteractivity_OutputSocketReference };

        /**
         * Output Flow Socket Pointers
         */
        flows?: { [id: string]: IKHRInteractivity_OutputFlow };
        configuration?: { [id: string]: IKHRInteractivity_Configuration };
    }

    interface IKHRInteractivity_OutputSocketReference {
        /**
         * An index in the nodes array
         */
        node: NodeIndex;
        /**
         * Must be defined if the node doesn't have a "value" output socket
         */
        socket?: string;
        /**
         * An optional type that must match the type of the output socket of the target node
         */
        type?: TypeIndex;
    }

    interface IKHRInteractivity_OutputFlow {
        /**
         * An index in the nodes array
         */
        node: NodeIndex;
        /**
         * The socket to connect to in the target node
         * defaults to "in" when undefined.
         */
        socket?: string;
    }

    interface IKHRInteractivity_Configuration {
        /**
         * Array size depends on the type. primitives have array size 1, rest depending on the object type (2,3,4,16)
         */
        value: ConfigurationValueType;
    }
}
