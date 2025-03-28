
declare module BabylonViewer {


    export enum CameraBehavior {
        AUTOROTATION = 0,
        BOUNCING = 1,
        FRAMING = 2
    }


    /**
     * Will attach an init function the DOMContentLoaded event.
     * The init function will be removed automatically after the event was triggered.
     */
    export function initListeners(): void;
    /**
     * Select all HTML tags on the page that match the selector and initialize a viewer
     *
     * @param selector the selector to initialize the viewer on (default is 'babylon')
     */
    export function InitTags(selector?: string): void;


    /**
     * BabylonJS Viewer
     *
     * An HTML-Based viewer for 3D models, based on BabylonJS and its extensions.
     */
    var disableInit: boolean;
    /**
     * Dispose all viewers currently registered
     */
    function disposeAll(): void;
    var Version: string;


    /**
     * The AbstractViewer is the center of Babylon's viewer.
     * It is the basic implementation of the default viewer and is responsible of loading and showing the model and the templates
     */
    export abstract class AbstractViewerWithTemplate extends AbstractViewer {
        protected getConfigurationLoader(): ConfigurationLoader;
    }


    /**
     * The viewer manager is the container for all viewers currently registered on this page.
     * It is possible to have more than one viewer on a single page.
     */
    export class ViewerManager {
        private _viewers;
        /**
         * A callback that will be triggered when a new viewer was added
         */
        onViewerAdded: (viewer: AbstractViewer) => void;
        /**
         * Will notify when a new viewer was added
         */
        onViewerAddedObservable: BABYLON.Observable<AbstractViewer>;
        /**
         * Will notify when a viewer was removed (disposed)
         */
        onViewerRemovedObservable: BABYLON.Observable<string>;
        constructor();
        /**
         * Adding a new viewer to the viewer manager and start tracking it.
         * @param viewer the viewer to add
         */
        addViewer(viewer: AbstractViewer): void;
        /**
         * remove a viewer from the viewer manager
         * @param viewer the viewer to remove
         */
        removeViewer(viewer: AbstractViewer): void;
        /**
         * Get a viewer by its baseId (if the container element has an ID, it is the this is. if not, a random id was assigned)
         * @param id the id of the HTMl element (or the viewer's, if none provided)
         * @returns the viewer associated with the given id (if found)
         */
        getViewerById(id: string): AbstractViewer;
        /**
         * Get a viewer using a container element
         * @param element the HTML element to search viewers associated with
         * @returns the viewer associated with the given element (if found)
         */
        getViewerByHTMLElement(element: HTMLElement): AbstractViewer | null;
        /**
         * Get a promise that will fulfill when this viewer was initialized.
         * Since viewer initialization and template injection is asynchronous, using the promise will guaranty that
         * you will get the viewer after everything was already configured.
         * @param id the viewer id to find
         * @returns a promise that will resolve to the viewer
         */
        getViewerPromiseById(id: string): Promise<AbstractViewer>;
        private _onViewerAdded;
        /**
         * dispose the manager and all of its associated viewers
         */
        dispose(): void;
    }
    export var viewerManager: ViewerManager;


    /**
     * The AbstractViewer is the center of Babylon's viewer.
     * It is the basic implementation of the default viewer and is responsible of loading and showing the model and the templates
     */
    export abstract class AbstractViewer {
        containerElement: Element;
        /**
         * Babylon BABYLON.Engine corresponding with this viewer
         */
        engine: BABYLON.Engine;
        /**
         * The ID of this viewer. it will be generated randomly or use the HTML Element's ID.
         */
        readonly baseId: string;
        /**
         * The last loader used to load a model.
         * @deprecated
         */
        lastUsedLoader: BABYLON.ISceneLoaderPlugin | BABYLON.ISceneLoaderPluginAsync;
        /**
         * The ModelLoader instance connected with this viewer.
         */
        modelLoader: ModelLoader;
        /**
         * A flag that controls whether or not the render loop should be executed
         */
        runRenderLoop: boolean;
        /**
         * The scene manager connected with this viewer instance
         */
        sceneManager: SceneManager;
        /**
         * Will notify when the scene was initialized
         */
        get onSceneInitObservable(): BABYLON.Observable<BABYLON.Scene>;
        /**
         * will notify when the engine was initialized
         */
        get onEngineInitObservable(): BABYLON.Observable<BABYLON.Engine>;
        /**
         * Will notify when a new model was added to the scene.
         * Note that added does not necessarily mean loaded!
         */
        get onModelAddedObservable(): BABYLON.Observable<ViewerModel>;
        /**
         * will notify after every model load
         */
        get onModelLoadedObservable(): BABYLON.Observable<ViewerModel>;
        /**
         * will notify when any model notify of progress
         */
        get onModelLoadProgressObservable(): BABYLON.Observable<BABYLON.ISceneLoaderProgressEvent>;
        /**
         * will notify when any model load failed.
         */
        get onModelLoadErrorObservable(): BABYLON.Observable<{
            message: string;
            exception: any;
        }>;
        /**
         * Will notify when a model was removed from the scene;
         */
        get onModelRemovedObservable(): BABYLON.Observable<ViewerModel>;
        /**
         * will notify when a new loader was initialized.
         * Used mainly to know when a model starts loading.
         */
        get onLoaderInitObservable(): BABYLON.Observable<BABYLON.ISceneLoaderPlugin | BABYLON.ISceneLoaderPluginAsync>;
        /**
         * Observers registered here will be executed when the entire load process has finished.
         */
        get onInitDoneObservable(): BABYLON.Observable<AbstractViewer>;
        /**
         * Functions added to this observable will be executed on each frame rendered.
         */
        get onFrameRenderedObservable(): BABYLON.Observable<AbstractViewer>;
        /**
         * Observers registered here will be executed when VR more is entered.
         */
        get onEnteringVRObservable(): BABYLON.Observable<AbstractViewer>;
        /**
         * Observers registered here will be executed when VR mode is exited.
         */
        get onExitingVRObservable(): BABYLON.Observable<AbstractViewer>;
        observablesManager: ObservablesManager;
        /**
         * The canvas associated with this viewer
         */
        protected _canvas: HTMLCanvasElement;
        /**
         * The (single) canvas of this viewer
         */
        get canvas(): HTMLCanvasElement;
        /**
         * is this viewer disposed?
         */
        protected _isDisposed: boolean;
        /**
         * registered onBeforeRender functions.
         * This functions are also registered at the native scene. The reference can be used to unregister them.
         */
        protected _registeredOnBeforeRenderFunctions: Array<() => void>;
        /**
         * The configuration loader of this viewer
         */
        protected _configurationLoader: RenderOnlyConfigurationLoader;
        /**
         * Is the viewer already initialized. for internal use.
         */
        protected _isInit: boolean;
        protected _configurationContainer: ConfigurationContainer;
        get configurationContainer(): ConfigurationContainer;
        protected getConfigurationLoader(): RenderOnlyConfigurationLoader;
        constructor(containerElement: Element, initialConfiguration?: ViewerConfiguration);
        /**
         * get the baseId of this viewer
         * @returns the baseId of this viewer
         */
        getBaseId(): string;
        /**
         * Do we have a canvas to render on, and is it a part of the scene
         * @returns true if the canvas is in the DOM
         */
        isCanvasInDOM(): boolean;
        /**
         * Is the engine currently set to render even when the page is in background
         */
        get renderInBackground(): boolean;
        /**
         * Set the viewer's background rendering flag.
         */
        set renderInBackground(value: boolean);
        /**
         * Get the configuration object. This is a reference only.
         * The configuration can ONLY be updated using the updateConfiguration function.
         * changing this object will have no direct effect on the scene.
         */
        get configuration(): ViewerConfiguration;
        /**
         * force resizing the engine.
         */
        forceResize(): void;
        protected _hdToggled: boolean;
        toggleHD(): void;
        protected _vrToggled: boolean;
        private _vrModelRepositioning;
        protected _vrScale: number;
        protected _vrInit: boolean;
        toggleVR(): void;
        protected _initVR(): void;
        /**
         * The resize function that will be registered with the window object
         */
        protected _resize: () => void;
        protected _onConfigurationLoaded(configuration: ViewerConfiguration): void;
        /**
         * Force a single render loop execution.
         */
        forceRender(): void;
        /**
         * render loop that will be executed by the engine
         * @param force
         */
        protected _render: (force?: boolean) => void;
        /**
         * Takes a screenshot of the scene and returns it as a base64 encoded png.
         * @param callback optional callback that will be triggered when screenshot is done.
         * @param width Optional screenshot width (default to 512).
         * @param height Optional screenshot height (default to 512).
         * @returns a promise with the screenshot data
         */
        takeScreenshot(callback?: (data: string) => void, width?: number, height?: number): Promise<string>;
        /**
         * Update the current viewer configuration with new values.
         * Only provided information will be updated, old configuration values will be kept.
         * If this.configuration was manually changed, you can trigger this function with no parameters,
         * and the entire configuration will be updated.
         * @param newConfiguration the partial configuration to update or a URL to a JSON holding the updated configuration
         *
         */
        updateConfiguration(newConfiguration?: Partial<ViewerConfiguration> | string): void;
        /**
         * this is used to register native functions using the configuration object.
         * This will configure the observers.
         * @param observersConfiguration observers configuration
         */
        protected _configureObservers(observersConfiguration: IObserversConfiguration): void;
        /**
         * Dispose the entire viewer including the scene and the engine
         */
        dispose(): void;
        /**
         * This will prepare the container element for the viewer
         */
        protected abstract _prepareContainerElement(): void;
        /**
         * This function will execute when the HTML templates finished initializing.
         * It should initialize the engine and continue execution.
         *
         * @returns The viewer object will be returned after the object was loaded.
         */
        protected _onTemplatesLoaded(): Promise<AbstractViewer>;
        /**
         * This will force the creation of an engine and a scene.
         * It will also load a model if preconfigured.
         * But first - it will load the extendible onTemplateLoaded()!
         * @returns A promise that will resolve when the template was loaded
         */
        protected _onTemplateLoaded(): Promise<AbstractViewer>;
        /**
         * Initialize the engine. Returns a promise in case async calls are needed.
         *
         * @protected
         * @returns {Promise<BABYLON.Engine>}
         * @memberof Viewer
         */
        protected _initEngine(): Promise<BABYLON.Engine>;
        private _isLoading;
        /**
         * Initialize a model loading. The returned object (a ViewerModel object) will be loaded in the background.
         * The difference between this and loadModel is that loadModel will fulfill the promise when the model finished loading.
         *
         * @param modelConfig model configuration to use when loading the model.
         * @param clearScene should the scene be cleared before loading this model
         * @returns a ViewerModel object that is not yet fully loaded.
         */
        initModel(modelConfig: string | File | IModelConfiguration, clearScene?: boolean): ViewerModel;
        /**
         * load a model using the provided configuration.
         * This function, as opposed to initModel, will return a promise that resolves when the model is loaded, and rejects with error.
         * If you want to attach to the observables of the model, use initModel instead.
         *
         * @param modelConfig the model configuration or URL to load.
         * @param clearScene Should the scene be cleared before loading the model
         * @returns a Promise the fulfills when the model finished loading successfully.
         */
        loadModel(modelConfig: string | File | IModelConfiguration, clearScene?: boolean): Promise<ViewerModel>;
        private _fpsTimeoutInterval;
        protected _initTelemetryEvents(): void;
        /**
         * Injects all the spectre shader in the babylon shader store
         */
        protected _injectCustomShaders(): void;
    }


    export class RenderOnlyViewer extends AbstractViewer {
        containerElement: Element;
        constructor(containerElement: Element, initialConfiguration?: ViewerConfiguration);
        initialize(): Promise<AbstractViewer | this>;
        protected _prepareContainerElement(): void;
    }


    /**
     * The Default viewer is the default implementation of the AbstractViewer.
     * It uses the templating system to render a new canvas and controls.
     */
    export class DefaultViewer extends AbstractViewerWithTemplate {
        containerElement: Element;
        /**
         * The corresponsing template manager of this viewer.
         */
        templateManager: TemplateManager;
        fullscreenElement?: Element;
        /**
         * Create a new default viewer
         * @param containerElement the element in which the templates will be rendered
         * @param initialConfiguration the initial configuration. Defaults to extending the default configuration
         */
        constructor(containerElement: Element, initialConfiguration?: ViewerConfiguration);
        private _registeredPlugins;
        registerTemplatePlugin(plugin: IViewerTemplatePlugin): void;
        /**
         * This will be executed when the templates initialize.
         * @returns a promise that will be resolved when the templates are loaded
         */
        protected _onTemplatesLoaded(): Promise<AbstractViewer>;
        private _initNavbar;
        private _animationList;
        private _currentAnimation;
        private _isAnimationPaused;
        private _resumePlay;
        private _handlePointerClick;
        /**
         * Plays or Pauses animation
         * @param noUiUpdate
         */
        private _togglePlayPause;
        private _oldIdleRotationValue;
        /**
         * Control progress bar position based on animation current frame
         */
        private _updateProgressBar;
        /**
         * Update Current Animation Speed
         * @param speed
         * @param paramsObject
         */
        private _updateAnimationSpeed;
        /**
         * Update Current Animation Type
         * @param data
         * @param data.label
         * @param data.value
         * @param paramsObject
         */
        private _updateAnimationType;
        protected _initVR(): void;
        /**
         * Toggle fullscreen of the entire viewer
         */
        toggleFullscreen: () => void;
        /**
         * Preparing the container element to present the viewer
         */
        protected _prepareContainerElement(): void;
        /**
         * This function will configure the templates and update them after a model was loaded
         * It is mainly responsible to changing the title and subtitle etc'.
         * @param model the model to be used to configure the templates by
         */
        protected _configureTemplate(model?: ViewerModel): void;
        /**
         * This will load a new model to the default viewer
         * overriding the AbstractViewer's loadModel.
         * The scene will automatically be cleared of the old models, if exist.
         * @param model the configuration object (or URL) to load.
         * @returns a promise that will be resolved when the model is loaded
         */
        loadModel(model?: string | File | IModelConfiguration): Promise<ViewerModel>;
        private _onModelLoaded;
        /**
         * Show the overlay and the defined sub-screen.
         * Mainly used for help and errors
         * @param subScreen the name of the subScreen. Those can be defined in the configuration object
         * @returns a promise that will be resolved when the overlay is shown
         */
        showOverlayScreen(subScreen: string): Promise<string> | Promise<Template>;
        /**
         * Hide the overlay screen.
         * @returns a promise that will be resolved when the overlay is hidden
         */
        hideOverlayScreen(): Promise<string> | Promise<Template>;
        /**
         * show the viewer (in case it was hidden)
         *
         * @param visibilityFunction an optional function to execute in order to show the container
         * @returns a promise that will be resolved when the viewer is shown
         */
        show(visibilityFunction?: (template: Template) => Promise<Template>): Promise<Template>;
        /**
         * hide the viewer (in case it is visible)
         *
         * @param visibilityFunction an optional function to execute in order to hide the container
         * @returns a promise that will be resolved when the viewer is hidden
         */
        hide(visibilityFunction?: (template: Template) => Promise<Template>): Promise<Template>;
        /**
         * Show the loading screen.
         * The loading screen can be configured using the configuration object
         * @returns a promise that will be resolved when the loading screen is shown
         */
        showLoadingScreen(): Promise<string> | Promise<Template>;
        /**
         * Hide the loading screen
         * @returns a promise that will be resolved when the loading screen is hidden
         */
        hideLoadingScreen(): Promise<string> | Promise<Template>;
        dispose(): void;
        protected _onConfigurationLoaded(configuration: ViewerConfiguration): void;
        /**
         * An extension of the light configuration of the abstract viewer.
         */
        private _configureLights;
    }


    export interface IViewerTemplatePlugin {
        readonly templateName: string;
        readonly eventsToAttach?: Array<string>;
        interactionPredicate(event: EventCallback): boolean;
        onEvent?(event: EventCallback): void;
        addHTMLTemplate?(template: Template): void;
    }
    export abstract class AbstractViewerNavbarButton implements IViewerTemplatePlugin {
        readonly templateName: string;
        readonly eventsToAttach: Array<string>;
        protected _prepend: boolean;
        protected _buttonName: string;
        protected _buttonClass: string;
        protected _htmlTemplate: string;
        constructor(buttonName: string, buttonClass?: string, htmlTemplate?: string);
        interactionPredicate(event: EventCallback): boolean;
        abstract onEvent(event: EventCallback): void;
        addHTMLTemplate(template: Template): void;
        protected _generateHTMLElement(template: Template): Element | DocumentFragment;
    }


    /**
     * The object sent when an event is triggered
     */
    export interface EventCallback {
        event: Event;
        template: Template;
        selector: string;
        payload?: any;
    }
    /**
     * The template manager, a member of the viewer class, will manage the viewer's templates and generate the HTML.
     * The template manager managers a single viewer and can be seen as the collection of all sub-templates of the viewer.
     */
    export class TemplateManager {
        containerElement: Element;
        /**
         * Will be triggered when any template is initialized
         */
        onTemplateInit: BABYLON.Observable<Template>;
        /**
         * Will be triggered when any template is fully loaded
         */
        onTemplateLoaded: BABYLON.Observable<Template>;
        /**
         * Will be triggered when a template state changes
         */
        onTemplateStateChange: BABYLON.Observable<Template>;
        /**
         * Will be triggered when all templates finished loading
         */
        onAllLoaded: BABYLON.Observable<TemplateManager>;
        /**
         * Will be triggered when any event on any template is triggered.
         */
        onEventTriggered: BABYLON.Observable<EventCallback>;
        /**
         * This template manager's event manager. In charge of callback registrations to native event types
         */
        eventManager: EventManager;
        private _templates;
        constructor(containerElement: Element);
        /**
         * Initialize the template(s) for the viewer. Called bay the Viewer class
         * @param templates the templates to be used to initialize the main template
         * @returns a promise that will be fulfilled when the template is loaded
         */
        initTemplate(templates: {
            [key: string]: ITemplateConfiguration;
        }): Promise<void>;
        /**
         *
         * This function will create a simple map with child-dependencies of the template html tree.
         * It will compile each template, check if its children exist in the configuration and will add them if they do.
         * It is expected that the main template will be called main!
         *
         * @param templates the templates to be used to initialize the main template
         * @returns a promise that will be fulfilled when the template is loaded
         */
        private _buildHTMLTree;
        /**
         * Get the canvas in the template tree.
         * There must be one and only one canvas inthe template.
         * @returns the canvas element or null if not found
         */
        getCanvas(): HTMLCanvasElement | null;
        /**
         * Get a specific template from the template tree
         * @param name the name of the template to load
         * @returns the template or undefined if not found
         */
        getTemplate(name: string): Template | undefined;
        private _checkLoadedState;
        /**
         * Dispose the template manager
         */
        dispose(): void;
    }
    /**
     * This class represents a single template in the viewer's template tree.
     * An example for a template is a single canvas, an overlay (containing sub-templates) or the navigation bar.
     * A template is injected using the template manager in the correct position.
     * The template is rendered using Handlebars and can use Handlebars' features (such as parameter injection)
     *
     * For further information please refer to the documentation page, https://doc.babylonjs.com
     */
    export class Template {
        name: string;
        private _configuration;
        /**
         * Will be triggered when the template is loaded
         */
        onLoaded: BABYLON.Observable<Template>;
        /**
         * will be triggered when the template is appended to the tree
         */
        onAppended: BABYLON.Observable<Template>;
        /**
         * Will be triggered when the template's state changed (shown, hidden)
         */
        onStateChange: BABYLON.Observable<Template>;
        /**
         * Will be triggered when an event is triggered on ths template.
         * The event is a native browser event (like mouse or pointer events)
         */
        onEventTriggered: BABYLON.Observable<EventCallback>;
        onParamsUpdated: BABYLON.Observable<Template>;
        onHTMLRendered: BABYLON.Observable<Template>;
        /**
         * is the template loaded?
         */
        isLoaded: boolean;
        /**
         * This is meant to be used to track the show and hide functions.
         * This is NOT (!!) a flag to check if the element is actually visible to the user.
         */
        isShown: boolean;
        /**
         * Is this template a part of the HTML tree (the template manager injected it)
         */
        isInHtmlTree: boolean;
        /**
         * The HTML element containing this template
         */
        parent: HTMLElement;
        /**
         * A promise that is fulfilled when the template finished loading.
         */
        initPromise: Promise<Template>;
        private _fragment;
        private _addedFragment;
        private _htmlTemplate;
        private _rawHtml;
        private _loadRequests;
        constructor(name: string, _configuration: ITemplateConfiguration);
        /**
         * Some templates have parameters (like background color for example).
         * The parameters are provided to Handlebars which in turn generates the template.
         * This function will update the template with the new parameters
         *
         * Note that when updating parameters the events will be registered again (after being cleared).
         *
         * @param params the new template parameters
         * @param append
         */
        updateParams(params: {
            [key: string]: string | number | boolean | object;
        }, append?: boolean): void;
        redraw(): void;
        /**
         * Get the template'S configuration
         */
        get configuration(): ITemplateConfiguration;
        /**
         * A template can be a parent element for other templates or HTML elements.
         * This function will deliver all child HTML elements of this template.
         * @returns an array of strings, each string is the name of the child element
         */
        getChildElements(): Array<string>;
        /**
         * Appending the template to a parent HTML element.
         * If a parent is already set and you wish to replace the old HTML with new one, forceRemove should be true.
         * @param parent the parent to which the template is added
         * @param forceRemove if the parent already exists, shoud the template be removed from it?
         */
        appendTo(parent: HTMLElement, forceRemove?: boolean): void;
        private _isShowing;
        private _isHiding;
        /**
         * Show the template using the provided visibilityFunction, or natively using display: flex.
         * The provided function returns a promise that should be fulfilled when the element is shown.
         * Since it is a promise async operations are more than possible.
         * See the default viewer for an opacity example.
         * @param visibilityFunction The function to execute to show the template.
         * @returns a promise that will be fulfilled when the template is shown
         */
        show(visibilityFunction?: (template: Template) => Promise<Template>): Promise<Template>;
        /**
         * Hide the template using the provided visibilityFunction, or natively using display: none.
         * The provided function returns a promise that should be fulfilled when the element is hidden.
         * Since it is a promise async operations are more than possible.
         * See the default viewer for an opacity example.
         * @param visibilityFunction The function to execute to show the template.
         * @returns a promise that will be fulfilled when the template is hidden
         */
        hide(visibilityFunction?: (template: Template) => Promise<Template>): Promise<Template>;
        /**
         * Dispose this template
         */
        dispose(): void;
        private _getTemplateAsHtml;
        private _registeredEvents;
        private _registerEvents;
        private _getTemplateLocation;
    }


    /**
     * The EventManager is in charge of registering user interctions with the viewer.
     * It is used in the TemplateManager
     */
    export class EventManager {
        private _templateManager;
        private _callbacksContainer;
        constructor(_templateManager: TemplateManager);
        /**
         * Register a new callback to a specific template.
         * The best example for the usage can be found in the DefaultViewer
         *
         * @param templateName the templateName to register the event to
         * @param callback The callback to be executed
         * @param eventType the type of event to register
         * @param selector an optional selector. if not defined the parent object in the template will be selected
         */
        registerCallback(templateName: string, callback: (eventData: EventCallback) => void, eventType?: string, selector?: string): void;
        /**
         * This will remove a registered event from the defined template.
         * Each one of the variables apart from the template name are optional, but one must be provided.
         *
         * @param templateName the templateName
         * @param callback the callback to remove (optional)
         * @param eventType the event type to remove (optional)
         * @param selector the selector from which to remove the event (optional)
         */
        unregisterCallback(templateName: string, callback: (eventData: EventCallback) => void, eventType?: string, selector?: string): void;
        private _eventTriggered;
        /**
         * Dispose the event manager
         */
        dispose(): void;
    }


    export class PrintButtonPlugin extends AbstractViewerNavbarButton {
        private _viewer;
        private _currentModelUrl;
        constructor(_viewer: DefaultViewer);
        onEvent(): void;
        protected static HtmlTemplate: string;
    }


    export class HDButtonPlugin extends AbstractViewerNavbarButton {
        private _viewer;
        constructor(_viewer: DefaultViewer);
        onEvent(event: EventCallback): void;
        protected static HtmlTemplate: string;
    }


    /**
     *
     * @param name the name of the custom optimizer configuration
     * @param upgrade set to true if you want to upgrade optimizer and false if you want to degrade
     * @returns the optimizer function
     */
    export function getCustomOptimizerByName(name: string, upgrade?: boolean): (sceneManager: SceneManager) => boolean;
    export function registerCustomOptimizer(name: string, optimizer: (sceneManager: SceneManager) => boolean): void;


    /**
     * A custom upgrade-oriented function configuration for the scene optimizer.
     * @param sceneManager
     * @returns true if the scene is fully upgraded
     */
    export function extendedUpgrade(sceneManager: SceneManager): boolean;
    /**
     * A custom degrade-oriented function configuration for the scene optimizer.
     * @param sceneManager
     * @returns true if the scene is fully degraded
     */
    export function extendedDegrade(sceneManager: SceneManager): boolean;


    /**
     * The current state of the model
     */
    export enum ModelState {
        INIT = 0,
        LOADING = 1,
        LOADED = 2,
        ENTRY = 3,
        ENTRYDONE = 4,
        COMPLETE = 5,
        CANCELED = 6,
        ERROR = 7
    }
    /**
     * The viewer model is a container for all assets representing a sngle loaded model.
     */
    export class ViewerModel implements BABYLON.IDisposable {
        private _observablesManager;
        private _configurationContainer?;
        /**
         * The loader used to load this model.
         */
        loader: BABYLON.ISceneLoaderPlugin | BABYLON.ISceneLoaderPluginAsync;
        private _animations;
        /**
         * the list of meshes that are a part of this model
         */
        private _meshes;
        /**
         * This model's root mesh (the parent of all other meshes).
         * This mesh does not(!) exist in the meshes array.
         */
        rootMesh: BABYLON.AbstractMesh;
        private _pivotMesh;
        /**
         * ParticleSystems connected to this model
         */
        particleSystems: Array<BABYLON.IParticleSystem>;
        /**
         * Skeletons defined in this model
         */
        skeletons: Array<BABYLON.Skeleton>;
        /**
         * The current model animation.
         * On init, this will be undefined.
         */
        currentAnimation: IModelAnimation;
        /**
         * Observers registered here will be executed when the model is done loading
         */
        onLoadedObservable: BABYLON.Observable<ViewerModel>;
        /**
         * Observers registered here will be executed when the loader notified of a progress event
         */
        onLoadProgressObservable: BABYLON.Observable<BABYLON.ISceneLoaderProgressEvent>;
        /**
         * Observers registered here will be executed when the loader notified of an error.
         */
        onLoadErrorObservable: BABYLON.Observable<{
            message: string;
            exception: any;
        }>;
        /**
         * Will be executed after the model finished loading and complete, including entry animation and lod
         */
        onCompleteObservable: BABYLON.Observable<ViewerModel>;
        /**
         * Observers registered here will be executed every time the model is being configured.
         * This can be used to extend the model's configuration without extending the class itself
         */
        onAfterConfigure: BABYLON.Observable<ViewerModel>;
        /**
         * The current model state (loaded, error, etc)
         */
        state: ModelState;
        /**
         * A loadID provided by the modelLoader, unique to ths (Abstract)Viewer instance.
         */
        loadId: number;
        loadInfo: BABYLON.GLTF2.IAsset;
        private _modelConfiguration;
        private _loaderDone;
        private _entryAnimation;
        private _scaleTransition;
        private _animatables;
        private _frameRate;
        private _shadowsRenderedAfterLoad;
        constructor(_observablesManager: ObservablesManager, modelConfiguration: IModelConfiguration, _configurationContainer?: ConfigurationContainer | undefined);
        get shadowsRenderedAfterLoad(): boolean;
        set shadowsRenderedAfterLoad(rendered: boolean);
        getViewerId(): string | undefined;
        /**
         * Is this model enabled?
         */
        get enabled(): boolean;
        /**
         * Set whether this model is enabled or not.
         */
        set enabled(enable: boolean);
        set loaderDone(done: boolean);
        private _checkCompleteState;
        /**
         * Add a mesh to this model.
         * Any mesh that has no parent will be provided with the root mesh as its new parent.
         *
         * @param mesh the new mesh to add
         * @param triggerLoaded should this mesh trigger the onLoaded observable. Used when adding meshes manually.
         * @returns a promise that will resolve when the model is done loading
         */
        addMesh(mesh: BABYLON.AbstractMesh, triggerLoaded?: boolean): Promise<ViewerModel>;
        /**
         * get the list of meshes (excluding the root mesh)
         */
        get meshes(): BABYLON.AbstractMesh[];
        /**
         * Get the model's configuration
         */
        get configuration(): IModelConfiguration;
        /**
         * (Re-)set the model's entire configuration
         * @param newConfiguration the new configuration to replace the new one
         */
        set configuration(newConfiguration: IModelConfiguration);
        /**
         * Update the current configuration with new values.
         * Configuration will not be overwritten, but merged with the new configuration.
         * Priority is to the new configuration
         * @param newConfiguration the configuration to be merged into the current configuration;
         */
        updateConfiguration(newConfiguration: Partial<IModelConfiguration>): void;
        private _initAnimations;
        /**
         * Animates the model from the current position to the default position
         * @param completeCallback A function to call when the animation has completed
         */
        private _enterScene;
        private _modelComplete;
        /**
         * Add a new animation group to this model.
         * @param animationGroup the new animation group to be added
         */
        addAnimationGroup(animationGroup: BABYLON.AnimationGroup): void;
        /**
         * Get the ModelAnimation array
         * @returns the array of ModelAnimations
         */
        getAnimations(): Array<IModelAnimation>;
        /**
         * Get the animations' names. Using the names you can play a specific animation.
         * @returns the array of ModelAnimations
         */
        getAnimationNames(): Array<string>;
        /**
         * Get an animation by the provided name. Used mainly when playing n animation.
         * @param name the name of the animation to find
         * @returns the ModelAnimation object
         */
        protected _getAnimationByName(name: string): BABYLON.Nullable<IModelAnimation>;
        /**
         * Choose an initialized animation using its name and start playing it
         * @param name the name of the animation to play
         * @returns The model aniamtion to be played.
         */
        playAnimation(name: string): IModelAnimation;
        setCurrentAnimationByName(name: string): IModelAnimation;
        private _configureModel;
        private _modelAnimationConfigurationToObject;
        /**
         * Apply a material configuration to a material
         * @param material BABYLON.Material to apply configuration to
         * @internal
         */
        _applyModelMaterialConfiguration(material: BABYLON.Material): void;
        /**
         * Start entry/exit animation given an animation configuration
         * @param animationConfiguration Entry/Exit animation configuration
         * @param isEntry Pass true if the animation is an entry animation
         * @param completeCallback Callback to execute when the animation completes
         */
        private _applyAnimation;
        /**
         * Begin @animations with the specified @easingFunction
         * @param animations The BABYLON Animations to begin
         * @param duration of transition, in seconds
         * @param easingFunction An easing function to apply
         * @param easingMode A easing mode to apply to the easingFunction
         * @param onAnimationEnd Call back trigger at the end of the animation.
         */
        transitionTo(animations: BABYLON.Animation[], duration: number, easingFunction: any, easingMode: number | undefined, // BABYLON.EasingFunction.EASINGMODE_EASEINOUT,
        onAnimationEnd: () => void): void;
        /**
         * Sets key values on an BABYLON.Animation from first to last frame.
         * @param animation The Babylon animation object to set keys on
         * @param startValue The value of the first key
         * @param endValue The value of the last key
         * @param duration The duration of the animation, used to determine the end frame
         */
        private _setLinearKeys;
        /**
         * Creates and returns a Babylon easing funtion object based on a string representing the Easing function
         * @param easingFunctionID The enum of the easing funtion to create
         * @returns The newly created Babylon easing function object
         */
        private _createEasingFunction;
        /**
         * Stops and removes all animations that have been applied to the model
         */
        stopAllAnimations(): void;
        /**
         * Will remove this model from the viewer (but NOT dispose it).
         */
        remove(): void;
        /**
         * Dispose this model, including all of its associated assets.
         */
        dispose(): void;
    }


    /**
     * Animation play mode enum - is the animation looping or playing once
     */
    export enum AnimationPlayMode {
        ONCE = 0,
        LOOP = 1
    }
    /**
     * An enum representing the current state of an animation object
     */
    export enum AnimationState {
        INIT = 0,
        PLAYING = 1,
        PAUSED = 2,
        STOPPED = 3,
        ENDED = 4
    }
    /**
     * The different type of easing functions available
     */
    export enum EasingFunction {
        Linear = 0,
        CircleEase = 1,
        BackEase = 2,
        BounceEase = 3,
        CubicEase = 4,
        ElasticEase = 5,
        ExponentialEase = 6,
        PowerEase = 7,
        QuadraticEase = 8,
        QuarticEase = 9,
        QuinticEase = 10,
        SineEase = 11
    }
    /**
     * Defines a simple animation to be applied to a model (scale).
     */
    export interface ModelAnimationConfiguration {
        /**
         * Time of animation, in seconds
         */
        time: number;
        /**
         * Scale to apply
         */
        scaling?: BABYLON.Vector3;
        /**
         * Easing function to apply
         * See SPECTRE.EasingFunction
         */
        easingFunction?: number;
        /**
         * An Easing mode to apply to the easing function
         * See BABYLON.EasingFunction
         */
        easingMode?: number;
    }
    /**
     * This interface can be implemented to define new types of ModelAnimation objects.
     */
    export interface IModelAnimation {
        /**
         * Current animation state (playing, stopped etc')
         */
        readonly state: AnimationState;
        /**
         * the name of the animation
         */
        readonly name: string;
        /**
         * Get the max numbers of frame available in the animation group
         *
         * In correlation to an array, this would be ".length"
         */
        readonly frames: number;
        /**
         * Get the current frame playing right now.
         * This can be used to poll the frame currently playing (and, for example, display a progress bar with the data)
         *
         * In correlation to an array, this would be the current index
         */
        readonly currentFrame: number;
        /**
         * Animation's FPS value
         */
        readonly fps: number;
        /**
         * Get or set the animation's speed ration (Frame-to-fps)
         */
        speedRatio: number;
        /**
         * Gets or sets the aimation's play mode.
         */
        playMode: AnimationPlayMode;
        /**
         * Start the animation
         */
        start(): void;
        /**
         * Stop the animation.
         * This will fail silently if the animation group is already stopped.
         */
        stop(): void;
        /**
         * Pause the animation
         * This will fail silently if the animation is not currently playing
         */
        pause(): void;
        /**
         * Reset this animation
         */
        reset(): void;
        /**
         * Restart the animation
         */
        restart(): void;
        /**
         * Go to a specific
         * @param frameNumber the frame number to go to
         */
        goToFrame(frameNumber: number): void;
        /**
         * Dispose this animation
         */
        dispose(): void;
    }
    /**
     * The GroupModelAnimation is an implementation of the IModelAnimation interface using BABYLON's
     * native GroupAnimation class.
     */
    export class GroupModelAnimation implements IModelAnimation {
        private _animationGroup;
        private _playMode;
        private _state;
        /**
         * Create a new GroupModelAnimation object using an BABYLON.AnimationGroup object
         * @param _animationGroup The animation group to base the class on
         */
        constructor(_animationGroup: BABYLON.AnimationGroup);
        /**
         * Get the animation's name
         */
        get name(): string;
        /**
         * Get the current animation's state
         */
        get state(): AnimationState;
        /**
         * Gets the speed ratio to use for all animations
         */
        get speedRatio(): number;
        /**
         * Sets the speed ratio to use for all animations
         */
        set speedRatio(value: number);
        /**
         * Get the max numbers of frame available in the animation group
         *
         * In correlation to an array, this would be ".length"
         */
        get frames(): number;
        /**
         * Get the current frame playing right now.
         * This can be used to poll the frame currently playing (and, for example, display a progress bar with the data)
         *
         * In correlation to an array, this would be the current index
         */
        get currentFrame(): number;
        /**
         * Get the FPS value of this animation
         */
        get fps(): number;
        /**
         * What is the animation'S play mode (looping or played once)
         */
        get playMode(): AnimationPlayMode;
        /**
         * Set the play mode.
         * If the animation is played, it will continue playing at least once more, depending on the new play mode set.
         * If the animation is not set, the will be initialized and will wait for the user to start playing it.
         */
        set playMode(value: AnimationPlayMode);
        /**
         * Reset the animation group
         */
        reset(): void;
        /**
         * Restart the animation group
         */
        restart(): void;
        /**
         *
         * @param frameNumber Go to a specific frame in the animation
         */
        goToFrame(frameNumber: number): void;
        /**
         * Start playing the animation.
         */
        start(): void;
        /**
         * Pause the animation
         */
        pause(): void;
        /**
         * Stop the animation.
         * This will fail silently if the animation group is already stopped.
         */
        stop(): void;
        /**
         * Dispose this animation object.
         */
        dispose(): void;
    }


    /**
     * The data structure of a telemetry event.
     */
    export interface TelemetryData {
        /**
         *
         */
        event: string;
        /**
         *
         */
        session: string;
        /**
         *
         */
        date: Date;
        /**
         *
         */
        now: number;
        /**
         *
         */
        viewerId?: string;
        /**
         *
         */
        detail: any;
    }
    /**
     * Receives Telemetry events and raises events to the API
     */
    export class TelemetryManager {
        /**
         *
         */
        onEventBroadcastedObservable: BABYLON.Observable<TelemetryData>;
        private _currentSessionId;
        private _event;
        /**
         * Receives a telemetry event
         */
        get broadcast(): (event: string, viewerId?: string, details?: any) => void;
        /**
         * Log a Telemetry event for errors raised on the WebGL context.
         * @param engine The Babylon engine with the WebGL context.
         * @param viewerId
         */
        flushWebGLErrors(engine: BABYLON.AbstractEngine, viewerId?: string): void;
        /**
         * Enable or disable telemetry events
         * @param enabled Boolean, true if events are enabled
         */
        set enable(enabled: boolean);
        /**
         * Called on event when disabled, typically do nothing here
         */
        private _eventDisabled;
        /**
         * Called on event when enabled
         * @param event - The name of the Telemetry event
         * @param viewerId
         * @param details An additional value, or an object containing a list of property/value pairs
         */
        private _eventEnabled;
        /**
         * Returns the current session ID or creates one if it doesn't exist
         * @returns The current session ID
         */
        get session(): string;
        /**
         * Disposes the telemetry manager
         */
        dispose(): void;
    }
    export var telemetryManager: TelemetryManager;


    /**
     * This interface describes the structure of the variable sent with the configuration observables of the scene manager.
     * O - the type of object we are dealing with (Light, BABYLON.ArcRotateCamera, BABYLON.Scene, etc')
     * T - the configuration type
     */
    export interface IPostConfigurationCallback<OBJ, CONF> {
        newConfiguration: CONF;
        sceneManager: SceneManager;
        object: OBJ;
        model?: ViewerModel;
    }
    export class SceneManager {
        private _engine;
        private _configurationContainer;
        private _observablesManager?;
        /**
         * Will notify when the scene was initialized
         */
        onSceneInitObservable: BABYLON.Observable<BABYLON.Scene>;
        /**
         * Will notify after the scene was configured. Can be used to further configure the scene
         */
        onSceneConfiguredObservable: BABYLON.Observable<IPostConfigurationCallback<BABYLON.Scene, ISceneConfiguration>>;
        /**
         * Will notify after the scene optimized was configured. Can be used to further configure the scene optimizer
         */
        onSceneOptimizerConfiguredObservable: BABYLON.Observable<IPostConfigurationCallback<BABYLON.SceneOptimizer, ISceneOptimizerConfiguration | boolean>>;
        /**
         * Will notify after the camera was configured. Can be used to further configure the camera
         */
        onCameraConfiguredObservable: BABYLON.Observable<IPostConfigurationCallback<BABYLON.ArcRotateCamera, ICameraConfiguration>>;
        /**
         * Will notify after the lights were configured. Can be used to further configure lights
         */
        onLightsConfiguredObservable: BABYLON.Observable<IPostConfigurationCallback<Array<BABYLON.Light>, {
            [name: string]: ILightConfiguration | boolean | number;
        }>>;
        /**
         * Will notify after the model(s) were configured. Can be used to further configure models
         */
        onModelsConfiguredObservable: BABYLON.Observable<IPostConfigurationCallback<Array<ViewerModel>, IModelConfiguration>>;
        /**
         * Will notify after the environment was configured. Can be used to further configure the environment
         */
        onEnvironmentConfiguredObservable: BABYLON.Observable<IPostConfigurationCallback<BABYLON.EnvironmentHelper, {
            skybox?: ISkyboxConfiguration | boolean;
            ground?: IGroundConfiguration | boolean;
        }>>;
        /**
         * Will notify after the model(s) were configured. Can be used to further configure models
         */
        onVRConfiguredObservable: BABYLON.Observable<IPostConfigurationCallback<BABYLON.VRExperienceHelper, IVRConfiguration>>;
        /**
         * The Babylon BABYLON.Scene of this viewer
         */
        scene: BABYLON.Scene;
        /**
         * The camera used in this viewer
         */
        camera: BABYLON.ArcRotateCamera;
        /**
         * Babylon's scene optimizer
         */
        sceneOptimizer?: BABYLON.SceneOptimizer;
        /**
         * Models displayed in this viewer.
         */
        models: Array<ViewerModel>;
        /**
         * Babylon's environment helper of this viewer
         */
        environmentHelper?: BABYLON.EnvironmentHelper;
        protected _defaultHighpTextureType: number;
        protected _shadowGeneratorBias: number;
        protected _defaultPipelineTextureType: number;
        /**
         * The maximum number of shadows supported by the current viewer
         */
        protected _maxShadows: number;
        /**
         * is HDR supported?
         */
        private _hdrSupport;
        private readonly _white;
        private _forceShadowUpdate;
        /**
         * The labs variable consists of objects that will have their API change.
         * Please be careful when using labs in production.
         */
        labs: ViewerLabs;
        private _defaultRenderingPipeline;
        private _assetsRootURL;
        get defaultRenderingPipeline(): BABYLON.Nullable<BABYLON.DefaultRenderingPipeline>;
        protected _vrHelper?: BABYLON.VRExperienceHelper;
        get vrHelper(): BABYLON.VRExperienceHelper | undefined;
        constructor(_engine: BABYLON.Engine, _configurationContainer: ConfigurationContainer, _observablesManager?: ObservablesManager | undefined);
        /**
         * Returns a boolean representing HDR support
         */
        get isHdrSupported(): boolean;
        /**
         * Return the main color defined in the configuration.
         */
        get mainColor(): BABYLON.Color3;
        get reflectionColor(): BABYLON.Color3;
        get animationBlendingEnabled(): boolean;
        set animationBlendingEnabled(value: boolean);
        get observablesManager(): ObservablesManager | undefined;
        private _processShadows;
        /**
         * The flag defining whether shadows are rendered constantly or once.
         */
        get processShadows(): boolean;
        /**
         * Should shadows be rendered every frame, or only once and stop.
         * This can be used to optimize a scene.
         *
         * Not that the shadows will NOT disapear but will remain in place.
         * @param process if true shadows will be updated once every frame. if false they will stop being updated.
         */
        set processShadows(process: boolean);
        private _groundEnabled;
        get groundEnabled(): boolean;
        set groundEnabled(newValue: boolean);
        private _groundMirrorEnabled;
        /**
         * gets whether the reflection is disabled.
         */
        get groundMirrorEnabled(): boolean;
        /**
         * sets whether the reflection is disabled.
         */
        set groundMirrorEnabled(value: boolean);
        private _defaultRenderingPipelineEnabled;
        get defaultRenderingPipelineEnabled(): boolean;
        set defaultRenderingPipelineEnabled(value: boolean);
        /**
         * Sets the engine flags to unlock all babylon features.
         * Can also be configured using the scene.flags configuration object
         */
        unlockBabylonFeatures(): void;
        /**
         * initialize the scene. Calling this function again will dispose the old scene, if exists.
         * @param sceneConfiguration the configuration of the scene
         * @returns a promise that resolves when the scene is ready
         */
        initScene(sceneConfiguration?: ISceneConfiguration): Promise<BABYLON.Scene>;
        clearScene(clearModels?: boolean, clearLights?: boolean): void;
        private _globalConfiguration;
        /**
         * This will update the scene's configuration, including camera, lights, environment.
         * @param newConfiguration the delta that should be configured. This includes only the changes
         */
        updateConfiguration(newConfiguration: Partial<ViewerConfiguration>): void;
        private _defaultRenderingPipelineShouldBuild;
        private _rebuildPostprocesses;
        private _bloomEnabled;
        get bloomEnabled(): boolean;
        set bloomEnabled(value: boolean);
        private _fxaaEnabled;
        get fxaaEnabled(): boolean;
        set fxaaEnabled(value: boolean);
        setDefaultMaterial(sceneConfig: ISceneConfiguration): void;
        /**
         * internally configure the scene using the provided configuration.
         * The scene will not be recreated, but just updated.
         * @param sceneConfig the (new) scene configuration
         */
        protected _configureScene(sceneConfig: ISceneConfiguration): void;
        /**
         * Configure the scene optimizer.
         * The existing scene optimizer will be disposed and a new one will be created.
         * @param optimizerConfig the (new) optimizer configuration
         */
        protected _configureOptimizer(optimizerConfig: ISceneOptimizerConfiguration | boolean): void;
        /**
         * configure all models using the configuration.
         * @param modelConfiguration the configuration to use to reconfigure the models
         */
        protected _configureVR(vrConfig: IVRConfiguration): void;
        protected _configureEnvironmentMap(environmentMapConfiguration: IEnvironmentMapConfiguration): any;
        /**
         * (Re) configure the camera. The camera will only be created once and from this point will only be reconfigured.
         * @param cameraConfig the new camera configuration
         */
        protected _configureCamera(cameraConfig?: ICameraConfiguration): void;
        private _focusOnModel;
        protected _configureEnvironment(skyboxConifguration?: ISkyboxConfiguration | boolean, groundConfiguration?: IGroundConfiguration | boolean): void;
        /**
         * configure the lights.
         * @param lightsConfiguration the (new) light(s) configuration
         */
        protected _configureLights(lightsConfiguration?: {
            [name: string]: ILightConfiguration | boolean | number;
        }): void;
        private _shadowGroundPlane;
        private _updateShadowRenderList;
        private _updateGroundMirrorRenderList;
        /**
         * Gets the shadow map blur kernel according to the light configuration.
         * @param light The light used to generate the shadows
         * @param bufferSize The size of the shadow map
         * @returns the kernel blur size
         */
        getBlurKernel(light: BABYLON.IShadowLight, bufferSize: number): number;
        /**
         * Alters render settings to reduce features based on hardware feature limitations
         * @param enableHDR Allows the viewer to run in HDR mode.
         */
        protected _handleHardwareLimitations(enableHDR?: boolean): void;
        /**
         * Dispose the entire viewer including the scene and the engine
         */
        dispose(): void;
        /**
         * Get an environment asset url by using the configuration if the path is not absolute.
         * @param url Asset url
         * @returns The Asset url using the `environmentAssetsRootURL` if the url is not an absolute path.
         */
        private _getAssetUrl;
        private _cameraBehaviorMapping;
        private _setCameraBehavior;
    }


    export class ObservablesManager {
        /**
         * Will notify when the scene was initialized
         */
        onSceneInitObservable: BABYLON.Observable<BABYLON.Scene>;
        /**
         * will notify when the engine was initialized
         */
        onEngineInitObservable: BABYLON.Observable<BABYLON.Engine>;
        /**
         * Will notify when a new model was added to the scene.
         * Note that added does not necessarily mean loaded!
         */
        onModelAddedObservable: BABYLON.Observable<ViewerModel>;
        /**
         * will notify after every model load
         */
        onModelLoadedObservable: BABYLON.Observable<ViewerModel>;
        /**
         * will notify when any model notify of progress
         */
        onModelLoadProgressObservable: BABYLON.Observable<BABYLON.ISceneLoaderProgressEvent>;
        /**
         * will notify when any model load failed.
         */
        onModelLoadErrorObservable: BABYLON.Observable<{
            message: string;
            exception: any;
        }>;
        /**
         * Will notify when a model was removed from the scene;
         */
        onModelRemovedObservable: BABYLON.Observable<ViewerModel>;
        /**
         * will notify when a new loader was initialized.
         * Used mainly to know when a model starts loading.
         */
        onLoaderInitObservable: BABYLON.Observable<BABYLON.ISceneLoaderPlugin | BABYLON.ISceneLoaderPluginAsync>;
        /**
         * Observers registered here will be executed when the entire load process has finished.
         */
        onViewerInitDoneObservable: BABYLON.Observable<any>;
        /**
         * Will notify when the viewer init started (after configuration was loaded)
         */
        onViewerInitStartedObservable: BABYLON.Observable<any>;
        /**
         * Functions added to this observable will be executed on each frame rendered.
         */
        onFrameRenderedObservable: BABYLON.Observable<any>;
        /**
         * Will notify when VR mode is entered.
         */
        onEnteringVRObservable: BABYLON.Observable<any>;
        /**
         * Will notify when VR mode is exited.
         */
        onExitingVRObservable: BABYLON.Observable<any>;
        constructor();
        dispose(): void;
    }


    /**
     * An instance of the class is in charge of loading the model correctly.
     * This class will continuously be expended with tasks required from the specific loaders Babylon has.
     *
     * A Model loader is unique per (Abstract)Viewer. It is being generated by the viewer
     */
    export class ModelLoader {
        private _observablesManager;
        private _configurationContainer?;
        private _loadId;
        private _disposed;
        private _loaders;
        private _plugins;
        private _baseUrl;
        /**
         * @returns the base url of the model loader
         */
        get baseUrl(): string;
        /**
         * Create a new Model loader
         * @param _observablesManager
         * @param _configurationContainer
         */
        constructor(_observablesManager: ObservablesManager, _configurationContainer?: ConfigurationContainer | undefined);
        /**
         * Adds a new plugin to the loader process.
         *
         * @param plugin the plugin name or the plugin itself
         */
        addPlugin(plugin: ILoaderPlugin | string): void;
        /**
         * Load a model using predefined configuration
         * @param modelConfiguration the modelConfiguration to use to load the model
         * @returns the loaded model
         */
        load(modelConfiguration: IModelConfiguration): ViewerModel;
        /**
         * Cancel the loading of a model.
         * @param model the model to cancel the loading of
         */
        cancelLoad(model: ViewerModel): void;
        /**
         * dispose the model loader.
         * If loaders are registered and are in the middle of loading, they will be disposed and the request(s) will be cancelled.
         */
        dispose(): void;
        private _checkAndRun;
    }


    export class TelemetryLoaderPlugin implements ILoaderPlugin {
        private _model;
        private _loadStart;
        private _loadEnd;
        onInit(loader: BABYLON.ISceneLoaderPlugin | BABYLON.ISceneLoaderPluginAsync, model: ViewerModel): void;
        onLoaded(model: ViewerModel): void;
        onError(): void;
        onComplete(): void;
    }


    /**
     * A loader plugin to use MSFT_lod extension correctly (glTF)
     */
    export class MSFTLodLoaderPlugin implements ILoaderPlugin {
        private _model;
        onInit(loader: BABYLON.ISceneLoaderPlugin | BABYLON.ISceneLoaderPluginAsync, model: ViewerModel): void;
        onExtensionLoaded(extension: BABYLON.GLTF2.IGLTFLoaderExtension): void;
    }


    /**
     * This interface defines the structure of a loader plugin.
     * Any of those functions will be called if (!) the loader supports those callbacks.
     * Any loader supports onInit, onLoaded, onError and onProgress.
     */
    export interface ILoaderPlugin {
        onInit?: (loader: BABYLON.ISceneLoaderPlugin | BABYLON.ISceneLoaderPluginAsync, model: ViewerModel) => void;
        onLoaded?: (model: ViewerModel) => void;
        onError?: (message: string, exception?: any) => void;
        onProgress?: (progressEvent: BABYLON.ISceneLoaderProgressEvent) => void;
        onExtensionLoaded?: (extension: BABYLON.GLTF2.IGLTFLoaderExtension) => void;
        onParsed?: (parsedData: BABYLON.IGLTFLoaderData) => void;
        onMeshLoaded?: (mesh: BABYLON.AbstractMesh) => void;
        onTextureLoaded?: (texture: BABYLON.BaseTexture) => void;
        onMaterialLoaded?: (material: BABYLON.Material) => void;
        onComplete?: () => void;
    }


    /**
     * Get a loader plugin according to its name.
     * The plugin will be cached and will be reused if called for again.
     *
     * @param name the name of the plugin
     * @returns the plugin
     */
    export function getLoaderPluginByName(name: string): ILoaderPlugin;
    /**
     * @param name
     * @param plugin
     */
    export function addLoaderPlugin(name: string, plugin: ILoaderPlugin): void;


    /**
     * A (PBR) material will be extended using this function.
     * This function will hold extra default configuration for the viewer, if not implemented in Babylon itself.
     */
    export class ExtendedMaterialLoaderPlugin implements ILoaderPlugin {
        onMaterialLoaded(baseMaterial: BABYLON.Material): void;
    }


    /**
     * Force-apply material configuration right after a material was loaded.
     */
    export class ApplyMaterialConfigPlugin implements ILoaderPlugin {
        private _model;
        onInit(loader: BABYLON.ISceneLoaderPlugin | BABYLON.ISceneLoaderPluginAsync, model: ViewerModel): void;
        onMaterialLoaded(material: BABYLON.Material): void;
    }


    /**
     * The ViewerLabs class will hold functions that are not (!) backwards compatible.
     * The APIs in all labs-related classes and configuration  might change.
     * Once stable, lab features will be moved to the publis API and configuration object.
     */
    export class ViewerLabs {
        private _scene;
        constructor(_scene: BABYLON.Scene);
        assetsRootURL: string;
        environment: PBREnvironment;
        /**
         * Loads an environment map from a given URL
         * @param url URL of environment map
         * @param onSuccess Callback fired after environment successfully applied to the scene
         * @param onProgress Callback fired at progress events while loading the environment map
         * @param onError Callback fired when the load fails
         */
        loadEnvironment(url: string, onSuccess?: (env: PBREnvironment) => void, onProgress?: (bytesLoaded: number, bytesTotal: number) => void, onError?: (e: any) => void): void;
        /**
         * Loads an environment map from a given URL
         * @param buffer ArrayBuffer containing environment map
         * @param onSuccess Callback fired after environment successfully applied to the scene
         * @param onProgress Callback fired at progress events while loading the environment map
         * @param onError Callback fired when the load fails
         */
        loadEnvironment(buffer: ArrayBuffer, onSuccess?: (env: PBREnvironment) => void, onProgress?: (bytesLoaded: number, bytesTotal: number) => void, onError?: (e: any) => void): void;
        /**
         * Sets the environment to an already loaded environment
         * @param env PBREnvironment instance
         * @param onSuccess Callback fired after environment successfully applied to the scene
         * @param onProgress Callback fired at progress events while loading the environment map
         * @param onError Callback fired when the load fails
         */
        loadEnvironment(env: PBREnvironment, onSuccess?: (env: PBREnvironment) => void, onProgress?: (bytesLoaded: number, bytesTotal: number) => void, onError?: (e: any) => void): void;
        /**
         * Applies an `EnvironmentMapConfiguration` to the scene
         * @param rotationY
         */
        applyEnvironmentMapConfiguration(rotationY?: number): void;
        /**
         * Get an environment asset url by using the configuration if the path is not absolute.
         * @param url Asset url
         * @returns The Asset url using the `environmentAssetsRootURL` if the url is not an absolute path.
         */
        getAssetUrl(url: string): string;
        rotateShadowLight(shadowLight: BABYLON.ShadowLight, amount: number, point?: BABYLON.Vector3, axis?: BABYLON.Vector3, target?: BABYLON.Vector3): void;
    }


    /**
     * WebGL Pixel Formats
     */
    export enum PixelFormat {
        DEPTH_COMPONENT = 6402,
        ALPHA = 6406,
        RGB = 6407,
        RGBA = 6408,
        LUMINANCE = 6409,
        LUMINANCE_ALPHA = 6410
    }
    /**
     * WebGL Pixel Types
     */
    export enum PixelType {
        UNSIGNED_BYTE = 5121,
        UNSIGNED_SHORT_4_4_4_4 = 32819,
        UNSIGNED_SHORT_5_5_5_1 = 32820,
        UNSIGNED_SHORT_5_6_5 = 33635
    }
    /**
     * WebGL Texture Magnification Filter
     */
    export enum TextureMagFilter {
        NEAREST = 9728,
        LINEAR = 9729
    }
    /**
     * WebGL Texture Minification Filter
     */
    export enum TextureMinFilter {
        NEAREST = 9728,
        LINEAR = 9729,
        NEAREST_MIPMAP_NEAREST = 9984,
        LINEAR_MIPMAP_NEAREST = 9985,
        NEAREST_MIPMAP_LINEAR = 9986,
        LINEAR_MIPMAP_LINEAR = 9987
    }
    /**
     * WebGL Texture Wrap Modes
     */
    export enum TextureWrapMode {
        REPEAT = 10497,
        CLAMP_TO_EDGE = 33071,
        MIRRORED_REPEAT = 33648
    }
    /**
     * Raw texture data and descriptor sufficient for WebGL texture upload
     */
    export interface TextureData {
        /**
         * Width of image
         */
        width: number;
        /**
         * Height of image
         */
        height: number;
        /**
         * Format of pixels in data
         */
        format: PixelFormat;
        /**
         * Row byte alignment of pixels in data
         */
        alignment: number;
        /**
         * Pixel data
         */
        data: ArrayBufferView;
    }
    /**
     * Wraps sampling parameters for a WebGL texture
     */
    export interface SamplingParameters {
        /**
         * Magnification mode when upsampling from a WebGL texture
         */
        magFilter?: TextureMagFilter;
        /**
         * Minification mode when upsampling from a WebGL texture
         */
        minFilter?: TextureMinFilter;
        /**
         * X axis wrapping mode when sampling out of a WebGL texture bounds
         */
        wrapS?: TextureWrapMode;
        /**
         * Y axis wrapping mode when sampling out of a WebGL texture bounds
         */
        wrapT?: TextureWrapMode;
        /**
         * Anisotropic filtering samples
         */
        maxAnisotropy?: number;
    }
    /**
     * Represents a valid WebGL texture source for use in texImage2D
     */
    export type TextureSource = TextureData | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    /**
     * A generic set of texture mipmaps (where index 0 has the largest dimension)
     */
    export type Mipmaps<T> = Array<T>;
    /**
     * A set of 6 cubemap arranged in the order [+x, -x, +y, -y, +z, -z]
     */
    export type Faces<T> = Array<T>;
    /**
     * A set of texture mipmaps specifically for 2D textures in WebGL (where index 0 has the largest dimension)
     */
    export type Mipmaps2D = Mipmaps<TextureSource>;
    /**
     * A set of texture mipmaps specifically for cubemap textures in WebGL (where index 0 has the largest dimension)
     */
    export type MipmapsCube = Mipmaps<Faces<TextureSource>>;
    /**
     * A minimal WebGL cubemap descriptor
     */
    export class TextureCube {
        internalFormat: PixelFormat;
        type: PixelType;
        source: MipmapsCube;
        /**
         * Returns the width of a face of the texture or 0 if not available
         */
        get Width(): number;
        /**
         * Returns the height of a face of the texture or 0 if not available
         */
        get Height(): number;
        /**
         * constructor
         * @param internalFormat WebGL pixel format for the texture on the GPU
         * @param type WebGL pixel type of the supplied data and texture on the GPU
         * @param source An array containing mipmap levels of faces, where each mipmap level is an array of faces and each face is a TextureSource object
         */
        constructor(internalFormat: PixelFormat, type: PixelType, source?: MipmapsCube);
    }
    /**
     * A static class providing methods to aid working with Bablyon textures.
     */
    export class TextureUtils {
        /**
         * A prefix used when storing a babylon texture object reference on a Spectre texture object
         */
        static BabylonTextureKeyPrefix: string;
        /**
         * Controls anisotropic filtering for deserialized textures.
         */
        static MaxAnisotropy: number;
        /**
         * Returns a BabylonCubeTexture instance from a Spectre texture cube, subject to sampling parameters.
         * If such a texture has already been requested in the past, this texture will be returned, otherwise a new one will be created.
         * The advantage of this is to enable working with texture objects without the need to initialize on the GPU until desired.
         * @param scene A Babylon BABYLON.Scene instance
         * @param textureCube A Spectre TextureCube object
         * @param automaticMipmaps Pass true to enable automatic mipmap generation where possible (requires power of images)
         * @param environment Specifies that the texture will be used as an environment
         * @param singleLod Specifies that the texture will be a singleLod (for environment)
         * @returns Babylon cube texture
         */
        static GetBabylonCubeTexture(scene: BABYLON.Scene, textureCube: TextureCube, automaticMipmaps: boolean, environment?: boolean, singleLod?: boolean): BABYLON.CubeTexture;
        /**
         * Applies Spectre SamplingParameters to a Babylon texture by directly setting texture parameters on the internal WebGLTexture as well as setting Babylon fields
         * @param babylonTexture Babylon texture to apply texture to (requires the Babylon texture has an initialize _texture field)
         * @param parameters Spectre SamplingParameters to apply
         */
        static ApplySamplingParameters(babylonTexture: BABYLON.BaseTexture, parameters: SamplingParameters): void;
        private static _EnvironmentSampling;
        private static _EnvironmentSingleMipSampling;
        /**
         * Environment preprocessing dedicated value (Internal Use or Advanced only).
         */
        static EnvironmentLODScale: number;
        /**
         * Environment preprocessing dedicated value (Internal Use or Advanced only)..
         */
        static EnvironmentLODOffset: number;
    }


    /**
     * Spherical polynomial coefficients (counter part to spherical harmonic coefficients used in shader irradiance calculation)
     * @ignoreChildren
     */
    export interface SphericalPolynomalCoefficients {
        x: BABYLON.Vector3;
        y: BABYLON.Vector3;
        z: BABYLON.Vector3;
        xx: BABYLON.Vector3;
        yy: BABYLON.Vector3;
        zz: BABYLON.Vector3;
        yz: BABYLON.Vector3;
        zx: BABYLON.Vector3;
        xy: BABYLON.Vector3;
    }
    /**
     * Wraps data and maps required for environments with physically based rendering
     */
    export interface PBREnvironment {
        /**
         * Spherical Polynomial Coefficients representing an irradiance map
         */
        irradiancePolynomialCoefficients: SphericalPolynomalCoefficients;
        /**
         * Specular cubemap
         */
        specularTexture?: TextureCube;
        /**
         * A scale factor applied to RGB values after reading from environment maps
         */
        textureIntensityScale: number;
    }
    /**
     * Environment map representations: layouts, projections and approximations
     */
    export type MapType = "irradiance_sh_coefficients_9" | "cubemap_faces";
    /**
     * Image type used for environment map
     */
    export type ImageType = "png";
    /**
     * A generic field in JSON that report's its type
     */
    export interface TypedObject<T> {
        type: T;
    }
    /**
     * Describes a range of bytes starting at byte pos (inclusive) and finishing at byte pos + length - 1
     */
    export interface ByteRange {
        pos: number;
        length: number;
    }
    /**
     * Complete Spectre Environment JSON Descriptor
     */
    export interface EnvJsonDescriptor {
        radiance: TypedObject<MapType>;
        irradiance: TypedObject<MapType>;
        specular: TypedObject<MapType>;
    }
    /**
     * Spherical harmonic coefficients to provide an irradiance map
     */
    export interface IrradianceSHCoefficients9 extends TypedObject<MapType> {
        l00: Array<number>;
        l1_1: Array<number>;
        l10: Array<number>;
        l11: Array<number>;
        l2_2: Array<number>;
        l2_1: Array<number>;
        l20: Array<number>;
        l21: Array<number>;
        l22: Array<number>;
    }
    /**
     * A generic set of images, where the image content is specified by byte ranges in the mipmaps field
     */
    export interface ImageSet<T> extends TypedObject<MapType> {
        imageType: ImageType;
        width: number;
        height: number;
        mipmaps: Array<T>;
        multiplier: number;
    }
    /**
     * A set of cubemap faces
     */
    export type CubemapFaces = ImageSet<Array<ByteRange>>;
    /**
     * A single image containing an atlas of equirectangular-projection maps across all mip levels
     */
    export type EquirectangularMipmapAtlas = ImageSet<ByteRange>;
    /**
     * A static class proving methods to aid parsing Spectre environment files
     */
    export class EnvironmentDeserializer {
        /**
         * Parses an arraybuffer into a new PBREnvironment object
         * @param arrayBuffer The arraybuffer of the Spectre environment file
         * @returns a PBREnvironment object
         */
        static Parse(arrayBuffer: ArrayBuffer): PBREnvironment;
        /**
         * Convert from irradiance to outgoing radiance for Lambertian BDRF, suitable for efficient shader evaluation.
         *	  L = (1/pi) * E * rho
         *
         * This is done by an additional scale by 1/pi, so is a fairly trivial operation but important conceptually.
         * @param harmonics Spherical harmonic coefficients (9)
         */
        private static _ConvertSHIrradianceToLambertianRadiance;
        /**
         * Convert spherical harmonics to spherical polynomial coefficients
         * @param harmonics Spherical harmonic coefficients (9)
         * @param outPolynomialCoefficents Polynomial coefficients (9) object to store result
         */
        private static _ConvertSHToSP;
        /**
         * Multiplies harmonic coefficients in place
         * @param harmonics Spherical harmonic coefficients (9)
         * @param scaleFactor Value to multiply by
         */
        private static _ScaleSH;
    }


    var expDm: Ideepmerge;
    /**
     * Is the provided string a URL?
     *
     * @param urlToCheck the url to inspect
     * @returns true if the string is a URL
     */
    export function isUrl(urlToCheck: string): boolean;
    /**
     * Convert a string from kebab-case to camelCase
     * @param s string to convert
     * @returns the converted string
     */
    export function kebabToCamel(s: string): string;
    /**
     * Convert a string from camelCase to kebab-case
     * @param str string to convert
     * @returns the converted string
     */
    export function camelToKebab(str: string): string | null;
    /**
     * This will extend an object with configuration values.
     * What it practically does it take the keys from the configuration and set them on the object.
     * If the configuration is a tree, it will traverse into the tree.
     * @param object the object to extend
     * @param config the configuration object that will extend the object
     */
    export function extendClassWithConfig(object: any, config: any): void;


    /**
     * The configuration loader will load the configuration object from any source and will use the defined mapper to
     * parse the object and return a conform ViewerConfiguration.
     * It is a private member of the scene.
     */
    export class RenderOnlyConfigurationLoader {
        private _enableCache;
        private _configurationCache;
        private _loadRequests;
        constructor(_enableCache?: boolean);
        private _getConfigurationTypeExcludeTemplate;
        protected getExtendedConfig(type: string | undefined): ViewerConfiguration;
        /**
         * load a configuration object that is defined in the initial configuration provided.
         * The viewer configuration can extend different types of configuration objects and have an extra configuration defined.
         *
         * @param initConfig the initial configuration that has the definitions of further configuration to load.
         * @param callback an optional callback that will be called sync, if noconfiguration needs to be loaded or configuration is payload-only
         * @returns A promise that delivers the extended viewer configuration, when done.
         */
        loadConfiguration(initConfig?: ViewerConfiguration, callback?: (config: ViewerConfiguration) => void): Promise<ViewerConfiguration>;
        /**
         * Dispose the configuration loader. This will cancel file requests, if active.
         */
        dispose(): void;
        /**
         * This function will process the initial configuration and make needed changes for the viewer to work.
         * @param config the mutable(!) initial configuration to process
         */
        private _processInitialConfiguration;
        private _loadFile;
    }


    /**
     * This is the mapper's interface. Implement this function to create your own mapper and register it at the mapper manager
     */
    export interface IMapper {
        map(rawSource: any): ViewerConfiguration;
    }
    /**
     * The MapperManager manages the different implemented mappers.
     * It allows the user to register new mappers as well and use them to parse their own configuration data
     */
    export class MapperManager {
        private _mappers;
        /**
         * The default mapper is the JSON mapper.
         */
        static DefaultMapper: string;
        constructor();
        /**
         * Get a specific configuration mapper.
         *
         * @param type the name of the mapper to load
         * @returns the mapper
         */
        getMapper(type: string): IMapper;
        /**
         * Use this function to register your own configuration mapper.
         * After a mapper is registered, it can be used to parse the specific type fo configuration to the standard ViewerConfiguration.
         * @param type the name of the mapper. This will be used to define the configuration type and/or to get the mapper
         * @param mapper The implemented mapper
         */
        registerMapper(type: string, mapper: IMapper): void;
        /**
         * Dispose the mapper manager and all of its mappers.
         */
        dispose(): void;
    }
    /**
     * mapperManager is a singleton of the type MapperManager.
     * The mapperManager can be disposed directly with calling mapperManager.dispose()
     * or indirectly with using BabylonViewer.disposeAll()
     */
    export var mapperManager: MapperManager;


    export class ConfigurationLoader extends RenderOnlyConfigurationLoader {
        protected getExtendedConfig(type: string | undefined): ViewerConfiguration;
    }




    export class ViewerGlobals {
        disableInit: boolean;
        disableWebGL2Support: boolean;
        get version(): string;
    }
    export var viewerGlobals: ViewerGlobals;


    export class ConfigurationContainer {
        configuration: ViewerConfiguration;
        viewerId: string;
        mainColor: BABYLON.Color3;
        reflectionColor: BABYLON.Color3;
        scene?: BABYLON.Scene;
    }


    /**
     * This function will make sure the configuration file is taking deprecated fields into account
     * and is setting them to the correct keys and values.
     *
     * @param configuration The configuration to process. Mutable!
     */
    export function processConfigurationCompatibility(configuration: ViewerConfiguration): void;


    export function getConfigurationKey(key: string, configObject: any): any;
    export interface ViewerConfiguration {
        version?: string;
        extends?: string;
        pageUrl?: string;
        configuration?: string | {
            url?: string;
            payload?: any;
            mapper?: string;
        };
        observers?: IObserversConfiguration;
        canvasElement?: string;
        model?: IModelConfiguration | string;
        scene?: ISceneConfiguration;
        optimizer?: ISceneOptimizerConfiguration | boolean;
        camera?: ICameraConfiguration;
        skybox?: boolean | ISkyboxConfiguration;
        ground?: boolean | IGroundConfiguration;
        lights?: {
            [name: string]: number | boolean | ILightConfiguration;
        };
        engine?: {
            renderInBackground?: boolean;
            antialiasing?: boolean;
            disableResize?: boolean;
            engineOptions?: BABYLON.EngineOptions;
            adaptiveQuality?: boolean;
            hdEnabled?: boolean;
        };
        templates?: {
            main: ITemplateConfiguration;
            [key: string]: ITemplateConfiguration;
        };
        customShaders?: {
            shaders?: {
                [key: string]: string;
            };
            includes?: {
                [key: string]: string;
            };
        };
        loaderPlugins?: {
            extendedMaterial?: boolean;
            msftLod?: boolean;
            telemetry?: boolean;
            minecraft?: boolean;
            [propName: string]: boolean | undefined;
        };
        environmentMap?: IEnvironmentMapConfiguration;
        vr?: IVRConfiguration;
        "3dCommerceCertified"?: boolean;
        lab?: {
            flashlight?: boolean | {
                exponent?: number;
                angle?: number;
                intensity?: number;
                diffuse?: {
                    r: number;
                    g: number;
                    b: number;
                };
                specular?: {
                    r: number;
                    g: number;
                    b: number;
                };
            };
            hideLoadingDelay?: number;
            /** @deprecated */
            assetsRootURL?: string;
            environmentMainColor?: {
                r: number;
                g: number;
                b: number;
            };
            /** @deprecated */
            environmentMap?: {
                /**
                 * Environment map texture path in relative to the asset folder.
                 */
                texture: string;
                /**
                 * Default rotation to apply to the environment map.
                 */
                rotationY: number;
                /**
                 * Tint level of the main color on the environment map.
                 */
                tintLevel: number;
            };
            defaultRenderingPipelines?: boolean | IDefaultRenderingPipelineConfiguration;
            globalLightRotation?: number;
        };
    }


    /**
     * Defines a default directional shadow light for normalized objects (!)
     */
    export var shadowDirectionalLightConfiguration: ViewerConfiguration;
    /**
     * Defines a default shadow-enabled spot light for normalized objects.
     */
    export var shadowSpotlLightConfiguration: ViewerConfiguration;


    /**
     * The render only default configuration of the viewer, including templates (canvas, overly, loading screen)
     * This configuration doesn't hold specific parameters, and only defines objects that are needed for the render only viewer viewer to fully work correctly.
     */
    export var renderOnlyDefaultConfiguration: {
        version: string;
        camera: {
            behaviors: {
                autoRotate: {
                    type: number;
                };
                framing: {
                    type: number;
                    zoomOnBoundingInfo: boolean;
                    zoomStopsAnimation: boolean;
                };
                bouncing: {
                    type: number;
                };
            };
        };
        skybox: {};
        ground: {
            receiveShadows: boolean;
        };
        engine: {
            antialiasing: boolean;
        };
        scene: {};
    };


    /**
     * The minimal configuration needed to make the viewer work.
     * Some functionalities might not work correctly (like fill-screen)
     */
    export var minimalConfiguration: ViewerConfiguration;


    /**
     * Get the configuration type you need to use as the base for your viewer.
     * The types can either be a single string, or comma separated types that will extend each other. for example:
     *
     * "default, environmentMap" will first load the default configuration and will extend it using the environmentMap configuration.
     *
     * @param types a comma-separated string of the type(s) or configuration to load.
     * @returns the configuration object
     */
    const getConfigurationType: (types: string) => ViewerConfiguration;


    /**
     * The viewer's "extended" configuration.
     * This configuration defines specific objects and parameters that we think make any model look good.
     */
    export var extendedConfiguration: ViewerConfiguration;


    /**
     * Lab-oriented default .env support
     */
    export var environmentMapConfiguration: ViewerConfiguration;


    /**
     * The default configuration of the viewer, including templates (canvas, overly, loading screen)
     * This configuration doesn't hold specific parameters, and only defines objects that are needed for the viewer to fully work correctly.
     */
    export var defaultConfiguration: ViewerConfiguration;


    export interface IVRConfiguration {
        disabled?: boolean;
        objectScaleFactor?: number;
        disableInteractions?: boolean;
        disableTeleportation?: boolean;
        overrideFloorMeshName?: string;
        vrOptions?: BABYLON.VRExperienceHelperOptions;
        modelHeightCorrection?: number | boolean;
        rotateUsingControllers?: boolean;
        cameraPosition?: {
            x: number;
            y: number;
            z: number;
        };
    }


    /**
     * A single template configuration object
     */
    export interface ITemplateConfiguration {
        /**
         * can be either the id of the template's html element or a URL.
         * See - https://doc.babylonjs.com/features/featuresDeepDive/babylonViewer/viewerTemplatingSystem#location-vs-html
         */
        location?: string;
        /**
         * If no location is provided you can provide here the raw html of this template.
         * See https://doc.babylonjs.com/features/featuresDeepDive/babylonViewer/viewerTemplatingSystem#location-vs-html
         */
        html?: string;
        id?: string;
        /**
         * Parameters that will be delivered to the template and will render it accordingly.
         */
        params?: {
            [key: string]: string | number | boolean | object;
        };
        /**
         * Events to attach to this template.
         * event name is the key. the value can either be a boolean (attach to the parent element)
         * or a map of html id elements.
         *
         * See - https://doc.babylonjs.com/features/featuresDeepDive/babylonViewer/viewerTemplatingSystem#event-binding
         */
        events?: {
            pointerdown?: boolean | {
                [id: string]: boolean;
            };
            pointerup?: boolean | {
                [id: string]: boolean;
            };
            pointermove?: boolean | {
                [id: string]: boolean;
            };
            pointerover?: boolean | {
                [id: string]: boolean;
            };
            pointerout?: boolean | {
                [id: string]: boolean;
            };
            pointerenter?: boolean | {
                [id: string]: boolean;
            };
            pointerleave?: boolean | {
                [id: string]: boolean;
            };
            pointercancel?: boolean | {
                [id: string]: boolean;
            };
            click?: boolean | {
                [id: string]: boolean;
            };
            dragstart?: boolean | {
                [id: string]: boolean;
            };
            drop?: boolean | {
                [id: string]: boolean;
            };
            [key: string]: boolean | {
                [id: string]: boolean;
            } | undefined;
        };
    }


    export interface ISkyboxConfiguration {
        cubeTexture?: {
            noMipMap?: boolean;
            gammaSpace?: boolean;
            url?: string | Array<string>;
        };
        color?: {
            r: number;
            g: number;
            b: number;
        };
        /** @deprecated */ pbr?: boolean;
        scale?: number;
        /** @deprecated */ blur?: number;
        material?: {
            imageProcessingConfiguration?: IImageProcessingConfiguration;
            [propName: string]: any;
        };
        infiniteDistance?: boolean;
    }


    export interface ISceneOptimizerConfiguration {
        targetFrameRate?: number;
        trackerDuration?: number;
        autoGeneratePriorities?: boolean;
        improvementMode?: boolean;
        degradation?: string;
        types?: {
            texture?: ISceneOptimizerParameters;
            hardwareScaling?: ISceneOptimizerParameters;
            shadow?: ISceneOptimizerParameters;
            postProcess?: ISceneOptimizerParameters;
            lensFlare?: ISceneOptimizerParameters;
            particles?: ISceneOptimizerParameters;
            renderTarget?: ISceneOptimizerParameters;
            mergeMeshes?: ISceneOptimizerParameters;
        };
        custom?: string;
    }
    export interface ISceneOptimizerParameters {
        priority?: number;
        maximumSize?: number;
        step?: number;
    }


    export interface ISceneConfiguration {
        debug?: boolean;
        clearColor?: {
            r: number;
            g: number;
            b: number;
            a: number;
        };
        /** @deprecated Please use environmentMap.mainColor instead. */
        mainColor?: {
            r?: number;
            g?: number;
            b?: number;
        };
        imageProcessingConfiguration?: IImageProcessingConfiguration;
        environmentTexture?: string;
        colorGrading?: IColorGradingConfiguration;
        environmentRotationY?: number;
        /** @deprecated Please use default rendering pipeline. */
        glow?: boolean | BABYLON.IGlowLayerOptions;
        disableHdr?: boolean;
        renderInBackground?: boolean;
        disableCameraControl?: boolean;
        animationPropertiesOverride?: {
            [propName: string]: any;
        };
        defaultMaterial?: {
            materialType: "standard" | "pbr";
            [propName: string]: any;
        };
        flags?: {
            shadowsEnabled?: boolean;
            particlesEnabled?: boolean;
            collisionsEnabled?: boolean;
            lightsEnabled?: boolean;
            texturesEnabled?: boolean;
            lensFlaresEnabled?: boolean;
            proceduralTexturesEnabled?: boolean;
            renderTargetsEnabled?: boolean;
            spritesEnabled?: boolean;
            skeletonsEnabled?: boolean;
            audioEnabled?: boolean;
        };
        assetsRootURL?: string;
    }


    export interface IObserversConfiguration {
        onEngineInit?: string;
        onSceneInit?: string;
        onModelLoaded?: string;
    }


    export interface IModelConfiguration {
        id?: string;
        url?: string;
        root?: string;
        file?: string | File;
        loader?: string;
        position?: {
            x: number;
            y: number;
            z: number;
        };
        rotation?: {
            x: number;
            y: number;
            z: number;
            w?: number;
        };
        scaling?: {
            x: number;
            y: number;
            z: number;
        };
        parentObjectIndex?: number;
        castShadow?: boolean;
        receiveShadows?: boolean;
        normalize?: boolean | {
            center?: boolean;
            unitSize?: boolean;
            parentIndex?: number;
        };
        title?: string;
        subtitle?: string;
        thumbnail?: string;
        animation?: {
            autoStart?: boolean | string;
            playOnce?: boolean;
            autoStartIndex?: number;
        };
        entryAnimation?: IModelAnimationConfiguration;
        exitAnimation?: IModelAnimationConfiguration;
        material?: {
            directEnabled?: boolean;
            directIntensity?: number;
            emissiveIntensity?: number;
            environmentIntensity?: number;
            [propName: string]: any;
        };
        /**
         * Rotation offset axis definition
         */
        rotationOffsetAxis?: {
            x: number;
            y: number;
            z: number;
        };
        /**
         * the offset angle
         */
        rotationOffsetAngle?: number;
        loaderConfiguration?: {
            maxLODsToLoad?: number;
            progressiveLoading?: boolean;
        };
    }


    /**
     * Defines an animation to be applied to a model (translation, scale or rotation).
     */
    export interface IModelAnimationConfiguration {
        /**
         * Time of animation, in seconds
         */
        time?: number;
        /**
         * Scale to apply
         */
        scaling?: {
            x: number;
            y: number;
            z: number;
        };
        /**
         * Easing function to apply
         */
        easingFunction?: number;
        /**
         * An Easing mode to apply to the easing function
         * See BABYLON.EasingFunction
         */
        easingMode?: number;
    }


    export interface ILightConfiguration {
        type: number;
        name?: string;
        disabled?: boolean;
        position?: {
            x: number;
            y: number;
            z: number;
        };
        target?: {
            x: number;
            y: number;
            z: number;
        };
        direction?: {
            x: number;
            y: number;
            z: number;
        };
        diffuse?: {
            r: number;
            g: number;
            b: number;
        };
        specular?: {
            r: number;
            g: number;
            b: number;
        };
        intensity?: number;
        intensityMode?: number;
        radius?: number;
        shadownEnabled?: boolean;
        shadowConfig?: {
            useBlurExponentialShadowMap?: boolean;
            useBlurCloseExponentialShadowMap?: boolean;
            useKernelBlur?: boolean;
            blurKernel?: number;
            blurScale?: number;
            minZ?: number;
            maxZ?: number;
            frustumSize?: number;
            angleScale?: number;
            frustumEdgeFalloff?: number;
            [propName: string]: any;
        };
        spotAngle?: number;
        shadowFieldOfView?: number;
        shadowBufferSize?: number;
        shadowFrustumSize?: number;
        shadowMinZ?: number;
        shadowMaxZ?: number;
        [propName: string]: any;
        behaviors?: {
            [name: string]: number | {
                type: number;
                [propName: string]: any;
            };
        };
    }




    export interface IImageProcessingConfiguration {
        colorGradingEnabled?: boolean;
        colorCurvesEnabled?: boolean;
        colorCurves?: {
            globalHue?: number;
            globalDensity?: number;
            globalSaturation?: number;
            globalExposure?: number;
            highlightsHue?: number;
            highlightsDensity?: number;
            highlightsSaturation?: number;
            highlightsExposure?: number;
            midtonesHue?: number;
            midtonesDensity?: number;
            midtonesSaturation?: number;
            midtonesExposure?: number;
            shadowsHue?: number;
            shadowsDensity?: number;
            shadowsSaturation?: number;
            shadowsExposure?: number;
        };
        colorGradingWithGreenDepth?: boolean;
        colorGradingBGR?: boolean;
        exposure?: number;
        toneMappingEnabled?: boolean;
        contrast?: number;
        vignetteEnabled?: boolean;
        vignetteStretch?: number;
        vignetteCentreX?: number;
        vignetteCentreY?: number;
        vignetteCenterX?: number;
        vignetteCenterY?: number;
        vignetteWeight?: number;
        vignetteColor?: {
            r: number;
            g: number;
            b: number;
            a?: number;
        };
        vignetteCameraFov?: number;
        vignetteBlendMode?: number;
        vignetteM?: boolean;
        applyByPostProcess?: boolean;
        isEnabled?: boolean;
    }


    export interface IGroundConfiguration {
        size?: number;
        receiveShadows?: boolean;
        shadowLevel?: number;
        /** @deprecated */ shadowOnly?: boolean;
        mirror?: boolean | {
            sizeRatio?: number;
            blurKernel?: number;
            amount?: number;
            fresnelWeight?: number;
            fallOffDistance?: number;
            textureType?: number;
        };
        texture?: string;
        color?: {
            r: number;
            g: number;
            b: number;
        };
        opacity?: number;
        material?: {
            [propName: string]: any;
        };
    }


    export interface IEnvironmentMapConfiguration {
        /**
         * Environment map texture path in relative to the asset folder.
         */
        texture: string;
        /**
         * Default rotation to apply to the environment map.
         */
        rotationY: number;
        /**
         * Tint level of the main color on the environment map.
         */
        tintLevel: number;
        /**
         * The environment's main color.
         */
        mainColor?: {
            r?: number;
            g?: number;
            b?: number;
        };
    }


    export interface IDefaultRenderingPipelineConfiguration {
        sharpenEnabled?: boolean;
        bloomEnabled?: boolean;
        bloomThreshold?: number;
        depthOfFieldEnabled?: boolean;
        depthOfFieldBlurLevel?: BABYLON.DepthOfFieldEffectBlurLevel;
        fxaaEnabled?: boolean;
        imageProcessingEnabled?: boolean;
        defaultPipelineTextureType?: number;
        bloomScale?: number;
        chromaticAberrationEnabled?: boolean;
        grainEnabled?: boolean;
        bloomKernel?: number;
        hardwareScaleLevel?: number;
        bloomWeight?: number;
        hdr?: boolean;
        samples?: number;
        glowLayerEnabled?: boolean;
    }


    /**
     * The Color Grading Configuration groups the different settings used to define the color grading used in the viewer.
     */
    export interface IColorGradingConfiguration {
        /**
         * Transform data string, encoded as determined by transformDataFormat.
         */
        transformData: string;
        /**
         * The encoding format of TransformData (currently only raw-base16 is supported).
         */
        transformDataFormat: string;
        /**
         * The weight of the transform
         */
        transformWeight: number;
        /**
         * Color curve colorFilterHueGlobal value
         */
        colorFilterHueGlobal: number;
        /**
         * Color curve colorFilterHueShadows value
         */
        colorFilterHueShadows: number;
        /**
         * Color curve colorFilterHueMidtones value
         */
        colorFilterHueMidtones: number;
        /**
         * Color curve colorFilterHueHighlights value
         */
        colorFilterHueHighlights: number;
        /**
         * Color curve colorFilterDensityGlobal value
         */
        colorFilterDensityGlobal: number;
        /**
         * Color curve colorFilterDensityShadows value
         */
        colorFilterDensityShadows: number;
        /**
         * Color curve colorFilterDensityMidtones value
         */
        colorFilterDensityMidtones: number;
        /**
         * Color curve colorFilterDensityHighlights value
         */
        colorFilterDensityHighlights: number;
        /**
         * Color curve saturationGlobal value
         */
        saturationGlobal: number;
        /**
         * Color curve saturationShadows value
         */
        saturationShadows: number;
        /**
         * Color curve saturationMidtones value
         */
        saturationMidtones: number;
        /**
         * Color curve saturationHighlights value
         */
        saturationHighlights: number;
        /**
         * Color curve exposureGlobal value
         */
        exposureGlobal: number;
        /**
         * Color curve exposureShadows value
         */
        exposureShadows: number;
        /**
         * Color curve exposureMidtones value
         */
        exposureMidtones: number;
        /**
         * Color curve exposureHighlights value
         */
        exposureHighlights: number;
    }


    export interface ICameraConfiguration {
        position?: {
            x: number;
            y: number;
            z: number;
        };
        rotation?: {
            x: number;
            y: number;
            z: number;
            w: number;
        };
        fov?: number;
        fovMode?: number;
        minZ?: number;
        maxZ?: number;
        inertia?: number;
        exposure?: number;
        pinchPrecision?: number;
        behaviors?: {
            [name: string]: boolean | number | ICameraBehaviorConfiguration;
        };
        disableCameraControl?: boolean;
        disableCtrlForPanning?: boolean;
        disableAutoFocus?: boolean;
        [propName: string]: any;
    }
    export interface ICameraBehaviorConfiguration {
        type: number;
        [propName: string]: any;
    }



}


                