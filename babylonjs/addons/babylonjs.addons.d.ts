
declare module ADDONS {


    /**
     * BABYLON.Behavior for any content that can capture pointer events, i.e. bypass the Babylon pointer event handling
     * and receive pointer events directly.  It will register the capture triggers and negotiate the capture and
     * release of pointer events.  Curerntly this applies only to HtmlMesh
     */
    export class PointerEventsCaptureBehavior implements BABYLON.Behavior<BABYLON.AbstractMesh> {
        private _captureCallback;
        private _releaseCallback;
        /** gets or sets behavior's name */
        name: string;
        private _attachedMesh;
        /** @internal */
        _captureOnPointerEnter: boolean;
        /**
         * Gets or sets the mesh that the behavior is attached to
         */
        get attachedMesh(): BABYLON.AbstractMesh | null;
        set attachedMesh(value: BABYLON.AbstractMesh | null);
        constructor(_captureCallback: () => void, _releaseCallback: () => void, { captureOnPointerEnter }?: {
            captureOnPointerEnter?: boolean | undefined;
        });
        /**
         * Set if the behavior should capture pointer events when the pointer enters the mesh
         */
        set captureOnPointerEnter(captureOnPointerEnter: boolean);
        /**
         * Function called when the behavior needs to be initialized (before attaching it to a target)
         */
        init(): void;
        /**
         * Called when the behavior is attached to a target
         * @param mesh defines the target where the behavior is attached to
         */
        attach(mesh: BABYLON.AbstractMesh): void;
        /**
         * Called when the behavior is detached from its target
         */
        detach(): void;
        /**
         * Dispose the behavior
         */
        dispose(): void;
        releasePointerEvents(): void;
        capturePointerEvents(): void;
    }


    type CaptureReleaseCallback = () => void;
    /**
     * Get the id of the object currently capturing pointer events
     * @returns The id of the object currently capturing pointer events
     * or null if no object is capturing pointer events
     */
    export const getCapturingId: () => string | null;
    /**
     * Request that the object with the given id capture pointer events.  If there is no current
     * owner, then the request is granted immediately.  If there is a current owner, then the request
     * is queued until the current owner releases pointer events.
     * @param requestId An id to identify the request.  This id will be used to match the capture
     * request with the release request.
     * @param captureCallback The callback to call when the request is granted and the object is capturing
     * @param releaseCallback The callback to call when the object is no longer capturing pointer events
     */
    export const requestCapture: (requestId: string, captureCallback: CaptureReleaseCallback, releaseCallback: CaptureReleaseCallback) => void;
    /**
     * Release pointer events from the object with the given id.  If the object is the current owner
     * then pointer events are released immediately.  If the object is not the current owner, then the
     * associated capture request is removed from the queue.  If there is no matching capture request
     * in the queue, then the release request is added to a list of unmatched release requests and will
     * negate the next capture request with the same id.  This is to guard against the possibility that
     * the release request arrived before the capture request.
     * @param requestId The id which should match the id of the capture request
     */
    export const requestRelease: (requestId: string | null) => void;
    /**
     * Relase pointer events from the current owner
     */
    export const releaseCurrent: () => void;
   }

        interface Window {
            "pointer-events-capture-debug": boolean | null;
        }
    declare module ADDONS {
    



    /**
     * A function that compares two submeshes and returns a number indicating which
     * should be rendered first.
     */
    type RenderOrderFunction = (subMeshA: BABYLON.SubMesh, subMeshB: BABYLON.SubMesh) => number;
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
    export class HtmlMeshRenderer {
        private _containerId?;
        private _inSceneElements?;
        private _overlayElements?;
        private _engine;
        private _cache;
        private _width;
        private _height;
        private _heightHalf;
        private _cameraWorldMatrix?;
        private _temp;
        private _lastDevicePixelRatio;
        private _cameraMatrixUpdated;
        private _previousCanvasDocumentPosition;
        private _renderObserver;
        /**
         * Contruct an instance of HtmlMeshRenderer
         * @param scene
         * @param options object containing the following optional properties:
         * @returns
         */
        constructor(scene: BABYLON.Scene, { parentContainerId, _containerId, enableOverlayRender, defaultOpaqueRenderOrder, defaultAlphaTestRenderOrder, defaultTransparentRenderOrder, }?: {
            parentContainerId?: string | null;
            _containerId?: string;
            defaultOpaqueRenderOrder?: RenderOrderFunction;
            defaultAlphaTestRenderOrder?: RenderOrderFunction;
            defaultTransparentRenderOrder?: RenderOrderFunction;
            enableOverlayRender?: boolean;
        });
        /**
         * Dispose of the HtmlMeshRenderer
         */
        dispose(): void;
        protected _init(scene: BABYLON.Scene, parentContainerId: string | null, enableOverlayRender: boolean, defaultOpaqueRenderOrder: RenderOrderFunction, defaultAlphaTestRenderOrder: RenderOrderFunction, defaultTransparentRenderOrder: RenderOrderFunction): void;
        private _createRenderLayerElements;
        protected _getSize(): {
            width: number;
            height: number;
        };
        protected _setSize(width: number, height: number): void;
        protected _getCameraCSSMatrix(matrix: BABYLON.Matrix): string;
        protected _getHtmlContentCSSMatrix(matrix: BABYLON.Matrix, useRightHandedSystem: boolean): string;
        protected _getTransformationMatrix(htmlMesh: HtmlMesh, useRightHandedSystem: boolean): BABYLON.Matrix;
        protected _renderHtmlMesh(htmlMesh: HtmlMesh, useRightHandedSystem: boolean): void;
        protected _render(scene: BABYLON.Scene, camera: BABYLON.Camera): void;
        protected _updateBaseScaleFactor(htmlMesh: HtmlMesh): void;
        protected _updateContainerPositionIfNeeded(): void;
        protected _onCameraMatrixChanged: (camera: BABYLON.Camera) => void;
        private _epsilon;
        private _getAncestorMarginsAndPadding;
    }


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
    export class HtmlMesh extends BABYLON.Mesh {
        /**
         * Helps identifying a html mesh from a regular mesh
         */
        get isHtmlMesh(): boolean;
        private _enabled;
        private _ready;
        /**
         * @internal
         */
        _isCanvasOverlay: boolean;
        private _requiresUpdate;
        private _element?;
        private _width?;
        private _height?;
        private _inverseScaleMatrix;
        private _captureOnPointerEnter;
        private _pointerEventCaptureBehavior;
        private _sourceWidth;
        private _sourceHeight;
        /**
         * Return the source width of the content in pixels
         */
        get sourceWidth(): number | null;
        /**
         * Return the source height of the content in pixels
         */
        get sourceHeight(): number | null;
        private _worldMatrixUpdateObserver;
        private _fitStrategy;
        /**
         * Contruct an instance of HtmlMesh
         * @param scene
         * @param id The id of the mesh.  Will be used as the id of the HTML element as well.
         * @param options object with optional parameters
         */
        constructor(scene: BABYLON.Scene, id: string, { captureOnPointerEnter, isCanvasOverlay, fitStrategy }?: {
            captureOnPointerEnter?: boolean | undefined;
            isCanvasOverlay?: boolean | undefined;
            fitStrategy?: FitStrategyType | undefined;
        });
        /**
         * The width of the content in pixels
         */
        get width(): number | undefined;
        /**
         * The height of the content in pixels
         */
        get height(): number | undefined;
        /**
         * The HTML element that is being rendered as a mesh
         */
        get element(): HTMLElement | undefined;
        /**
         * True if the mesh has been moved, rotated, or scaled since the last time this
         * property was read.  This property is reset to false after reading.
         */
        get requiresUpdate(): boolean;
        /**
         * Enable capture for the pointer when entering the mesh area
         */
        set captureOnPointerEnter(captureOnPointerEnter: boolean);
        /**
         * Disposes of the mesh and the HTML element
         */
        dispose(): void;
        /**
         * @internal
         */
        _markAsUpdated(): void;
        /**
         * Sets the content of the element to the specified content adjusting the mesh scale to match and making it visible.
         * If the the specified content is undefined, then it will make the mesh invisible.  In either case it will clear the
         * element content first.
         * @param element The element to render as a mesh
         * @param width The width of the mesh in Babylon units
         * @param height The height of the mesh in Babylon units
         */
        setContent(element: HTMLElement, width: number, height: number): void;
        setEnabled(enabled: boolean): void;
        /**
         * Sets the content size in pixels
         * @param width width of the source
         * @param height height of the source
         */
        setContentSizePx(width: number, height: number): void;
        protected _setAsReady(ready: boolean): void;
        protected _doSetEnabled(enabled: boolean): void;
        protected _updateScaleIfNecessary(): void;
        protected _createMask(): void;
        protected _setElementZIndex(zIndex: number): void;
        /**
         * Callback used by the PointerEventsCaptureBehavior to capture pointer events
         */
        capturePointerEvents(): void;
        /**
         * Callback used by the PointerEventsCaptureBehavior to release pointer events
         */
        releasePointerEvents(): void;
        protected _createElement(): HTMLDivElement | undefined;
    }


    export type FitStrategyType = {
        wrapElement(element: HTMLElement): HTMLElement;
        updateSize(sizingElement: HTMLElement, width: number, height: number): void;
    };
    export var FitStrategy: {
        CONTAIN: FitStrategyType;
        COVER: FitStrategyType;
        STRETCH: FitStrategyType;
        NONE: FitStrategyType;
    };



}


                