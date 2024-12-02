
declare module BABYLON.NodeRenderGraphEditor {
    export class SerializationTools {
        static UpdateLocations(renderGraph: BABYLON.NodeRenderGraph, globalState: GlobalState, frame?: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphFrame>): void;
        static Serialize(renderGraph: BABYLON.NodeRenderGraph, globalState: GlobalState, frame?: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphFrame>): string;
        static Deserialize(serializationObject: any, globalState: GlobalState): void;
        static AddFrameToRenderGraph(serializationObject: any, globalState: GlobalState, currentRenderGraph: BABYLON.NodeRenderGraph): void;
    }


    interface IPortalProps {
        globalState: GlobalState;
    }
    export class Portal extends React.Component<IPortalProps> {
        render(): React.ReactPortal;
    }


    /**
     * Interface used to specify creation options for the node editor
     */
    export interface INodeEditorOptions {
        nodeRenderGraph: BABYLON.NodeRenderGraph;
        hostScene?: BABYLON.Scene;
        hostElement?: HTMLElement;
        customSave?: {
            label: string;
            action: (data: string) => Promise<void>;
        };
        customLoadObservable?: BABYLON.Observable<any>;
    }
    /**
     * Class used to create a node editor
     */
    export class NodeRenderGraphEditor {
        private static _CurrentState;
        private static _PopupWindow;
        /**
         * Show the node editor
         * @param options defines the options to use to configure the node editor
         */
        static Show(options: INodeEditorOptions): void;
    }




    interface IGraphEditorProps {
        globalState: GlobalState;
    }
    interface IGraphEditorState {
        showPreviewPopUp: boolean;
        message: string;
        isError: boolean;
    }
    interface IInternalPreviewAreaOptions extends BABYLON.IInspectorOptions {
        popup: boolean;
        original: boolean;
        explorerWidth?: string;
        inspectorWidth?: string;
        embedHostWidth?: string;
    }
    export class GraphEditor extends React.Component<IGraphEditorProps, IGraphEditorState> {
        private _graphCanvasRef;
        private _diagramContainerRef;
        private _graphCanvas;
        private _previewManager;
        private _mouseLocationX;
        private _mouseLocationY;
        private _onWidgetKeyUpPointer;
        private _previewHost;
        private _popUpWindow;
        private _externalTextures;
        appendBlock(dataToAppend: BABYLON.NodeRenderGraphBlock | BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, recursion?: boolean): BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode;
        addValueNode(type: string): BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode;
        componentDidMount(): void;
        componentWillUnmount(): void;
        constructor(props: IGraphEditorProps);
        zoomToFit(): void;
        private _setExternalInputs;
        buildRenderGraph(): void;
        build(ignoreEditorData?: boolean): void;
        loadGraph(): void;
        showWaitScreen(): void;
        hideWaitScreen(): void;
        reOrganize(editorData?: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.IEditorData>, isImportingAFrame?: boolean): void;
        onWheel: (evt: WheelEvent) => void;
        emitNewBlock(blockType: string, targetX: number, targetY: number): BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode | undefined;
        dropNewBlock(event: React.DragEvent<HTMLDivElement>): void;
        handlePopUp: () => void;
        handleClosingPopUp: () => void;
        initiatePreviewArea: (canvas?: HTMLCanvasElement) => void;
        createPopUp: () => void;
        createPreviewMeshControlHost: (options: IInternalPreviewAreaOptions, parentControl: BABYLON.Nullable<HTMLElement>) => void;
        createPreviewHost: (options: IInternalPreviewAreaOptions, parentControl: BABYLON.Nullable<HTMLElement>) => void;
        fixPopUpStyles: (document: Document) => void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export class GlobalState {
        hostElement: HTMLElement;
        hostDocument: Document;
        hostWindow: Window;
        stateManager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager;
        onBuiltObservable: BABYLON.Observable<void>;
        onResetRequiredObservable: BABYLON.Observable<boolean>;
        onZoomToFitRequiredObservable: BABYLON.Observable<void>;
        onReOrganizedRequiredObservable: BABYLON.Observable<void>;
        onLogRequiredObservable: BABYLON.Observable<LogEntry>;
        onIsLoadingChanged: BABYLON.Observable<boolean>;
        onLightUpdated: BABYLON.Observable<void>;
        onFrame: BABYLON.Observable<void>;
        onAnimationCommandActivated: BABYLON.Observable<void>;
        onImportFrameObservable: BABYLON.Observable<any>;
        onPopupClosedObservable: BABYLON.Observable<void>;
        onGetNodeFromBlock: (block: BABYLON.NodeRenderGraphBlock) => BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode;
        onDropEventReceivedObservable: BABYLON.Observable<DragEvent>;
        previewType: PreviewType;
        previewFile: File;
        envType: PreviewType;
        envFile: File;
        listOfCustomPreviewFiles: File[];
        rotatePreview: boolean;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        hemisphericLight: boolean;
        directionalLight0: boolean;
        directionalLight1: boolean;
        pointerOverCanvas: boolean;
        onRefreshPreviewMeshControlComponentRequiredObservable: BABYLON.Observable<void>;
        filesInput: BABYLON.FilesInput;
        scene: BABYLON.Scene;
        noAutoFillExternalInputs: boolean;
        customSave?: {
            label: string;
            action: (data: string) => Promise<void>;
        };
        private _nodeRenderGraph;
        /**
         * Gets the current node render graph
         */
        get nodeRenderGraph(): BABYLON.NodeRenderGraph;
        /**
         * Sets the current node material
         */
        set nodeRenderGraph(nodeRenderGraph: BABYLON.NodeRenderGraph);
        constructor(scene: BABYLON.Scene);
        storeEditorData(serializationObject: any, frame?: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphFrame>): void;
    }


    /**
     * Static class for BlockTools
     */
    export class BlockTools {
        static GetBlockFromString(data: string, frameGraph: BABYLON.FrameGraph, scene: BABYLON.Scene): BABYLON.NodeRenderGraphTeleportInBlock | BABYLON.NodeRenderGraphTeleportOutBlock | BABYLON.NodeRenderGraphOutputBlock | BABYLON.NodeRenderGraphElbowBlock | BABYLON.NodeRenderGraphInputBlock | BABYLON.NodeRenderGraphClearBlock | BABYLON.NodeRenderGraphCopyTextureBlock | BABYLON.NodeRenderGraphGenerateMipmapsBlock | BABYLON.NodeRenderGraphBlackAndWhitePostProcessBlock | BABYLON.NodeRenderGraphBloomPostProcessBlock | BABYLON.NodeRenderGraphBlurPostProcessBlock | BABYLON.GUI.NodeRenderGraphGUIBlock | BABYLON.NodeRenderGraphObjectRendererBlock | BABYLON.NodeRenderGraphGeometryRendererBlock | BABYLON.NodeRenderGraphTAAObjectRendererBlock | BABYLON.NodeRenderGraphCullObjectsBlock | BABYLON.NodeRenderGraphCircleOfConfusionPostProcessBlock | BABYLON.NodeRenderGraphDepthOfFieldPostProcessBlock | BABYLON.NodeRenderGraphExtractHighlightsPostProcessBlock | null;
        static GetColorFromConnectionNodeType(type: BABYLON.NodeRenderGraphBlockConnectionPointTypes): string;
        static GetConnectionNodeTypeFromString(type: string): BABYLON.NodeRenderGraphBlockConnectionPointTypes.Texture | BABYLON.NodeRenderGraphBlockConnectionPointTypes.TextureBackBuffer | BABYLON.NodeRenderGraphBlockConnectionPointTypes.TextureBackBufferDepthStencilAttachment | BABYLON.NodeRenderGraphBlockConnectionPointTypes.TextureDepthStencilAttachment | BABYLON.NodeRenderGraphBlockConnectionPointTypes.TextureViewDepth | BABYLON.NodeRenderGraphBlockConnectionPointTypes.TextureViewNormal | BABYLON.NodeRenderGraphBlockConnectionPointTypes.TextureAlbedo | BABYLON.NodeRenderGraphBlockConnectionPointTypes.TextureReflectivity | BABYLON.NodeRenderGraphBlockConnectionPointTypes.TextureWorldPosition | BABYLON.NodeRenderGraphBlockConnectionPointTypes.TextureVelocity | BABYLON.NodeRenderGraphBlockConnectionPointTypes.TextureScreenDepth | BABYLON.NodeRenderGraphBlockConnectionPointTypes.TextureWorldNormal | BABYLON.NodeRenderGraphBlockConnectionPointTypes.TextureLocalPosition | BABYLON.NodeRenderGraphBlockConnectionPointTypes.TextureLinearVelocity | BABYLON.NodeRenderGraphBlockConnectionPointTypes.Camera | BABYLON.NodeRenderGraphBlockConnectionPointTypes.ObjectList | BABYLON.NodeRenderGraphBlockConnectionPointTypes.AutoDetect;
        static GetStringFromConnectionNodeType(type: BABYLON.NodeRenderGraphBlockConnectionPointTypes): "" | "Texture" | "Camera" | "TextureBackBuffer" | "TextureBackBufferDepthStencilAttachment" | "TextureDepthStencilAttachment" | "ObjectList" | "TextureNormal" | "TextureAlbedo" | "TextureReflectivity" | "TexturePosition" | "TextureVelocity" | "TextureScreenDepth" | "TextureLocalPosition" | "TextureWorldNormal" | "TextureLinearVelocity" | "TextureDepth";
    }


    interface ITextureLineComponentProps {
        texture: BABYLON.BaseTexture;
        width: number;
        height: number;
        globalState?: any;
        hideChannelSelect?: boolean;
    }
    export interface ITextureLineComponentState {
        displayRed: boolean;
        displayGreen: boolean;
        displayBlue: boolean;
        displayAlpha: boolean;
        face: number;
    }
    export class TextureLineComponent extends React.Component<ITextureLineComponentProps, ITextureLineComponentState> {
        private _canvasRef;
        constructor(props: ITextureLineComponentProps);
        shouldComponentUpdate(): boolean;
        componentDidMount(): void;
        componentDidUpdate(): void;
        updatePreview(): void;
        static UpdatePreview(previewCanvas: HTMLCanvasElement, texture: BABYLON.BaseTexture, width: number, options: ITextureLineComponentState, onReady?: () => void, globalState?: any): Promise<void>;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ILineWithFileButtonComponentProps {
        title: string;
        closed?: boolean;
        label: string;
        iconImage: any;
        onIconClick: (file: File) => void;
        accept: string;
        uploadName?: string;
    }
    export class LineWithFileButtonComponent extends React.Component<ILineWithFileButtonComponentProps, {
        isExpanded: boolean;
    }> {
        private _uploadRef;
        constructor(props: ILineWithFileButtonComponentProps);
        onChange(evt: any): void;
        switchExpandedState(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ILineContainerComponentProps {
        title: string;
        children: any[] | any;
        closed?: boolean;
    }
    export class LineContainerComponent extends React.Component<ILineContainerComponentProps, {
        isExpanded: boolean;
    }> {
        constructor(props: ILineContainerComponentProps);
        switchExpandedState(): void;
        renderHeader(): import("react/jsx-runtime").JSX.Element;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IFileButtonLineComponentProps {
        label: string;
        onClick: (file: File) => void;
        accept: string;
        uploadName?: string;
    }
    export class FileButtonLineComponent extends React.Component<IFileButtonLineComponentProps> {
        private _uploadRef;
        constructor(props: IFileButtonLineComponentProps);
        onChange(evt: any): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export interface IDraggableLineWithButtonComponent {
        data: string;
        tooltip: string;
        iconImage: any;
        onIconClick: (value: string) => void;
        iconTitle: string;
        lenSuffixToRemove?: number;
    }
    export class DraggableLineWithButtonComponent extends React.Component<IDraggableLineWithButtonComponent> {
        constructor(props: IDraggableLineWithButtonComponent);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export interface IButtonLineComponentProps {
        data: string;
        tooltip: string;
    }
    export class DraggableLineComponent extends React.Component<IButtonLineComponentProps> {
        constructor(props: IButtonLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export interface ICheckBoxLineComponentProps {
        label: string;
        target?: any;
        propertyName?: string;
        isSelected?: () => boolean;
        onSelect?: (value: boolean) => void;
        onValueChanged?: () => void;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
        disabled?: boolean;
        extractValue?: (target: any) => boolean;
    }
    export class CheckBoxLineComponent extends React.Component<ICheckBoxLineComponentProps, {
        isSelected: boolean;
        isDisabled?: boolean;
    }> {
        private static _UniqueIdSeed;
        private _uniqueId;
        private _localChange;
        constructor(props: ICheckBoxLineComponentProps);
        shouldComponentUpdate(nextProps: ICheckBoxLineComponentProps, nextState: {
            isSelected: boolean;
            isDisabled: boolean;
        }): boolean;
        onChange(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export const RegisterTypeLedger: () => void;


    export const RegisterToPropertyTabManagers: () => void;


    export const RegisterToDisplayManagers: () => void;


    export const RegisterNodePortDesign: (stateManager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager) => void;


    export const RegisterExportData: (stateManager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager) => void;


    export const RegisterElbowSupport: (stateManager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager) => void;


    export const RegisterDefaultInput: (stateManager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager) => void;


    export const RegisterDebugSupport: (stateManager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager) => void;


    export class ConnectionPointPortData implements BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData {
        private _connectedPort;
        private _nodeContainer;
        data: BABYLON.NodeRenderGraphConnectionPoint;
        get name(): string;
        get internalName(): string;
        get isExposedOnFrame(): boolean;
        set isExposedOnFrame(value: boolean);
        get exposedPortPosition(): number;
        set exposedPortPosition(value: number);
        get isConnected(): boolean;
        get connectedPort(): BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData>;
        set connectedPort(value: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData>);
        get direction(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.PortDataDirection;
        get ownerData(): BABYLON.NodeRenderGraphBlock;
        get needDualDirectionValidation(): boolean;
        get hasEndpoints(): boolean;
        get endpoints(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData[];
        constructor(connectionPoint: BABYLON.NodeRenderGraphConnectionPoint, nodeContainer: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeContainer);
        updateDisplayName(newName: string): void;
        connectTo(port: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData): void;
        canConnectTo(port: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData): boolean;
        disconnectFrom(port: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData): void;
        checkCompatibilityState(port: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData): 0 | BABYLON.NodeRenderGraphConnectionPointCompatibilityStates.TypeIncompatible | BABYLON.NodeRenderGraphConnectionPointCompatibilityStates.HierarchyIssue;
        getCompatibilityIssueMessage(issue: number, targetNode: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode, targetPort: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData): string;
    }


    export class BlockNodeData implements BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData {
        data: BABYLON.NodeRenderGraphBlock;
        private _inputs;
        private _outputs;
        private _onBuildObserver;
        /**
         * Gets or sets a callback used to call node visual refresh
         */
        refreshCallback?: () => void;
        get uniqueId(): number;
        get name(): string;
        getClassName(): string;
        get isInput(): boolean;
        get inputs(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData[];
        get outputs(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData[];
        get comments(): string;
        set comments(value: string);
        get executionTime(): number;
        getPortByName(name: string): BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData | null;
        isConnectedToOutput(): boolean;
        dispose(): void;
        prepareHeaderIcon(iconDiv: HTMLDivElement, img: HTMLImageElement): void;
        get invisibleEndpoints(): BABYLON.NodeRenderGraphTeleportOutBlock[] | null;
        constructor(data: BABYLON.NodeRenderGraphBlock, nodeContainer: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeContainer);
    }


    export class TeleportOutPropertyTabComponent extends React.Component<BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPropertyComponentProps> {
        private _onUpdateRequiredObserver;
        constructor(props: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPropertyComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export interface IFrameNodePortPropertyTabComponentProps {
        stateManager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager;
        nodePort: BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodePort;
    }
    export class NodePortPropertyTabComponent extends React.Component<IFrameNodePortPropertyTabComponentProps> {
        constructor(props: IFrameNodePortPropertyTabComponentProps);
        toggleExposeOnFrame(value: boolean): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export class InputPropertyTabComponent extends React.Component<BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPropertyComponentProps> {
        private _onValueChangedObserver;
        constructor(props: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPropertyComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        renderValue(_globalState: GlobalState): import("react/jsx-runtime").JSX.Element | null;
        setDefaultValue(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export var samplingModeList: {
        label: string;
        value: number;
    }[];
    export var textureFormatList: {
        label: string;
        value: number;
    }[];
    export var textureTypeList: {
        label: string;
        value: number;
    }[];
    export var textureDepthStencilFormatList: {
        label: string;
        value: number;
    }[];
    export class GenericPropertyComponent extends React.Component<BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPropertyComponentProps> {
        constructor(props: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPropertyComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }
    export class GeneralPropertyTabComponent extends React.Component<BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPropertyComponentProps> {
        constructor(props: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPropertyComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }
    export class GenericPropertyTabComponent extends React.Component<BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPropertyComponentProps> {
        constructor(props: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPropertyComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export interface IFramePropertyTabComponentProps {
        globalState: GlobalState;
        frame: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphFrame;
    }
    export class FramePropertyTabComponent extends React.Component<IFramePropertyTabComponentProps> {
        private _onFrameExpandStateChangedObserver;
        constructor(props: IFramePropertyTabComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export interface IFrameNodePortPropertyTabComponentProps {
        stateManager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager;
        globalState: GlobalState;
        frameNodePort: BABYLON.NodeRenderGraphEditor.SharedUIComponents.FrameNodePort;
        frame: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphFrame;
    }
    export class FrameNodePortPropertyTabComponent extends React.Component<IFrameNodePortPropertyTabComponentProps, {
        port: BABYLON.NodeRenderGraphEditor.SharedUIComponents.FrameNodePort;
    }> {
        private _onFramePortPositionChangedObserver;
        private _onSelectionChangedObserver;
        constructor(props: IFrameNodePortPropertyTabComponentProps);
        componentWillUnmount(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export class TextureDisplayManager implements BABYLON.NodeRenderGraphEditor.SharedUIComponents.IDisplayManager {
        getHeaderClass(): string;
        shouldDisplayPortLabels(): boolean;
        getHeaderText(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData): string;
        getBackgroundColor(): string;
        updatePreviewContent(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
    }


    export class TeleportOutDisplayManager implements BABYLON.NodeRenderGraphEditor.SharedUIComponents.IDisplayManager {
        private _hasHighlights;
        getHeaderClass(): string;
        shouldDisplayPortLabels(): boolean;
        getHeaderText(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData): string;
        getBackgroundColor(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData): string;
        updatePreviewContent(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
        onSelectionChanged(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, selectedData: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData>, manager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager): void;
        onDispose(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, manager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager): void;
    }


    export class TeleportInDisplayManager implements BABYLON.NodeRenderGraphEditor.SharedUIComponents.IDisplayManager {
        private _hasHighlights;
        getHeaderClass(): string;
        shouldDisplayPortLabels(): boolean;
        getHeaderText(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData): string;
        getBackgroundColor(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData): string;
        updatePreviewContent(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
        onSelectionChanged(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, selectedData: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData>, manager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager): void;
        onDispose(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, manager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager): void;
    }


    export class PostProcessDisplayManager implements BABYLON.NodeRenderGraphEditor.SharedUIComponents.IDisplayManager {
        getHeaderClass(): string;
        shouldDisplayPortLabels(): boolean;
        getHeaderText(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData): string;
        getBackgroundColor(): string;
        updatePreviewContent(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
    }


    export class OutputDisplayManager implements BABYLON.NodeRenderGraphEditor.SharedUIComponents.IDisplayManager {
        getHeaderClass(): string;
        shouldDisplayPortLabels(): boolean;
        getHeaderText(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData): string;
        getBackgroundColor(): string;
        updatePreviewContent(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
    }


    export class InputDisplayManager implements BABYLON.NodeRenderGraphEditor.SharedUIComponents.IDisplayManager {
        getHeaderClass(_nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData): string;
        getHeaderText(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData): string;
        shouldDisplayPortLabels(): boolean;
        static GetBaseType(type: BABYLON.NodeRenderGraphBlockConnectionPointTypes): string;
        getBackgroundColor(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData): string;
        updatePreviewContent(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
    }


    export class ElbowDisplayManager implements BABYLON.NodeRenderGraphEditor.SharedUIComponents.IDisplayManager {
        getHeaderClass(): string;
        shouldDisplayPortLabels(): boolean;
        getHeaderText(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData): string;
        getBackgroundColor(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData): string;
        updatePreviewContent(_nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, _contentArea: HTMLDivElement): void;
        updateFullVisualContent(data: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, visualContent: BABYLON.NodeRenderGraphEditor.SharedUIComponents.VisualContentDescription): void;
    }


    interface IPropertyTabComponentProps {
        globalState: GlobalState;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
    }
    interface IPropertyTabComponentState {
        currentNode: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode>;
        currentFrame: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphFrame>;
        currentFrameNodePort: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.FrameNodePort>;
        currentNodePort: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodePort>;
        uploadInProgress: boolean;
    }
    export class PropertyTabComponent extends React.Component<IPropertyTabComponentProps, IPropertyTabComponentState> {
        private _onBuiltObserver;
        constructor(props: IPropertyTabComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        load(file: File): void;
        loadFrame(file: File): void;
        save(): void;
        customSave(): void;
        saveToSnippetServer(): void;
        loadFromSnippet(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IInputsPropertyTabComponentProps {
        globalState: GlobalState;
        inputs: BABYLON.NodeRenderGraphInputBlock[];
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
    }
    export class InputsPropertyTabComponent extends React.Component<IInputsPropertyTabComponentProps> {
        constructor(props: IInputsPropertyTabComponentProps);
        processInputBlockUpdate(): void;
        renderInputBlock(block: BABYLON.NodeRenderGraphInputBlock): import("react/jsx-runtime").JSX.Element | null;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export enum PreviewType {
        Sphere = 0,
        Box = 1,
        Cylinder = 2,
        Plane = 3,
        ShaderBall = 4,
        Custom = 5,
        Room = 6
    }


    interface IPreviewMeshControlComponent {
        globalState: GlobalState;
        togglePreviewAreaComponent: () => void;
    }
    export class PreviewMeshControlComponent extends React.Component<IPreviewMeshControlComponent> {
        private _filePickerRef;
        private _envPickerRef;
        private _onResetRequiredObserver;
        private _onDropEventObserver;
        private _onRefreshPreviewMeshControlComponentRequiredObserver;
        constructor(props: IPreviewMeshControlComponent);
        componentWillUnmount(): void;
        changeMeshType(newOne: PreviewType): void;
        useCustomMesh(evt: any): void;
        useCustomEnv(evt: any): void;
        onPopUp(): void;
        frame(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export class PreviewManager {
        private _nodeRenderGraph;
        private _onFrameObserver;
        private _onPreviewCommandActivatedObserver;
        private _onUpdateRequiredObserver;
        private _onRebuildRequiredObserver;
        private _onImportFrameObserver;
        private _onResetRequiredObserver;
        private _onLightUpdatedObserver;
        private _engine;
        private _scene;
        private _globalState;
        private _currentType;
        private _lightParent;
        private _hdrTexture;
        constructor(targetCanvas: HTMLCanvasElement, globalState: GlobalState);
        private _initAsync;
        private _initScene;
        private _reset;
        private _prepareLights;
        private _createNodeRenderGraph;
        private _buildGraph;
        private _frameCamera;
        private _prepareBackgroundHDR;
        private _prepareScene;
        static DefaultEnvironmentURL: string;
        private _refreshPreviewMesh;
        dispose(): void;
    }


    interface IPreviewAreaComponentProps {
        globalState: GlobalState;
    }
    export class PreviewAreaComponent extends React.Component<IPreviewAreaComponentProps, {
        isLoading: boolean;
    }> {
        private _onIsLoadingChangedObserver;
        private _onResetRequiredObserver;
        constructor(props: IPreviewAreaComponentProps);
        componentWillUnmount(): void;
        _onPointerOverCanvas: () => void;
        _onPointerOutCanvas: () => void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface INodeListComponentProps {
        globalState: GlobalState;
    }
    export class NodeListComponent extends React.Component<INodeListComponentProps, {
        filter: string;
    }> {
        private _onResetRequiredObserver;
        private static _Tooltips;
        private _customFrameList;
        constructor(props: INodeListComponentProps);
        componentWillUnmount(): void;
        filterContent(filter: string): void;
        loadCustomFrame(file: File): void;
        removeItem(value: string): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ILogComponentProps {
        globalState: GlobalState;
    }
    export class LogEntry {
        message: string;
        isError: boolean;
        time: Date;
        constructor(message: string, isError: boolean);
    }
    export class LogComponent extends React.Component<ILogComponentProps, {
        logs: LogEntry[];
    }> {
        private _logConsoleRef;
        constructor(props: ILogComponentProps);
        componentDidMount(): void;
        componentDidUpdate(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Copy all styles from a document to another document or shadow root
     * @param source document to copy styles from
     * @param target document or shadow root to copy styles to
     */
    export function CopyStyles(source: Document, target: Document): void;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export class StringTools {
        private static _SaveAs;
        private static _Click;
        /**
         * Download a string into a file that will be saved locally by the browser
         * @param document
         * @param content defines the string to download locally as a file
         * @param filename
         */
        static DownloadAsFile(document: HTMLDocument, content: string, filename: string): void;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export class PropertyChangedEvent {
        object: any;
        property: string;
        value: any;
        initialValue: any;
        allowNullValue?: boolean;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Create a popup window
     * @param title default title for the popup
     * @param options options for the popup
     * @returns the parent control of the popup
     */
    export function CreatePopup(title: string, options: Partial<{
        onParentControlCreateCallback?: (parentControl: HTMLDivElement) => void;
        onWindowCreateCallback?: (newWindow: Window) => void;
        width?: number;
        height?: number;
    }>): HTMLDivElement | null;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Class handling undo / redo operations
     */
    export class HistoryStack implements BABYLON.IDisposable {
        private _historyStack;
        private _redoStack;
        private _activeData;
        private readonly _maxHistoryLength;
        private _locked;
        private _dataProvider;
        private _applyUpdate;
        /**
         * Gets or sets a boolean indicating if the stack is enabled
         */
        isEnabled: boolean;
        /**
         * Constructor
         * @param dataProvider defines the data provider function
         * @param applyUpdate defines the code to execute when undo/redo operation is required
         */
        constructor(dataProvider: () => any, applyUpdate: (data: any) => void);
        /**
         * Process key event to handle undo / redo
         * @param evt defines the keyboard event to process
         * @returns true if the event was processed
         */
        processKeyEvent(evt: KeyboardEvent): boolean;
        /**
         * Resets the stack
         */
        reset(): void;
        /**
         * Remove the n-1 element of the stack
         */
        collapseLastTwo(): void;
        private _generateJSONDiff;
        private _applyJSONDiff;
        private _copy;
        /**
         * Stores the current state
         */
        store(): void;
        /**
         * Undo the latest operation
         */
        undo(): void;
        /**
         * Redo the latest undo operation
         */
        redo(): void;
        /**
         * Disposes the stack
         */
        dispose(): void;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export function copyCommandToClipboard(strCommand: string): void;
    export function getClassNameWithNamespace(obj: any): {
        className: string;
        babylonNamespace: string;
    };



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Class used to provide lock mechanism
     */
    export class LockObject {
        /**
         * Gets or set if the lock is engaged
         */
        lock: boolean;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface ITextBlockPropertyGridComponentProps {
        textBlock: BABYLON.GUI.TextBlock;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class TextBlockPropertyGridComponent extends React.Component<ITextBlockPropertyGridComponentProps> {
        constructor(props: ITextBlockPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IStackPanelPropertyGridComponentProps {
        stackPanel: BABYLON.GUI.StackPanel;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class StackPanelPropertyGridComponent extends React.Component<IStackPanelPropertyGridComponentProps> {
        constructor(props: IStackPanelPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface ISliderPropertyGridComponentProps {
        slider: BABYLON.GUI.Slider;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class SliderPropertyGridComponent extends React.Component<ISliderPropertyGridComponentProps> {
        constructor(props: ISliderPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IScrollViewerPropertyGridComponentProps {
        scrollViewer: BABYLON.GUI.ScrollViewer;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ScrollViewerPropertyGridComponent extends React.Component<IScrollViewerPropertyGridComponentProps> {
        constructor(props: IScrollViewerPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IRectanglePropertyGridComponentProps {
        rectangle: BABYLON.GUI.Rectangle;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class RectanglePropertyGridComponent extends React.Component<IRectanglePropertyGridComponentProps> {
        constructor(props: IRectanglePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IRadioButtonPropertyGridComponentProps {
        radioButtons: BABYLON.GUI.RadioButton[];
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class RadioButtonPropertyGridComponent extends React.Component<IRadioButtonPropertyGridComponentProps> {
        constructor(props: IRadioButtonPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface ILinePropertyGridComponentProps {
        line: BABYLON.GUI.Line;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class LinePropertyGridComponent extends React.Component<ILinePropertyGridComponentProps> {
        constructor(props: ILinePropertyGridComponentProps);
        onDashChange(value: string): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IInputTextPropertyGridComponentProps {
        inputText: BABYLON.GUI.InputText;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class InputTextPropertyGridComponent extends React.Component<IInputTextPropertyGridComponentProps> {
        constructor(props: IInputTextPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IImagePropertyGridComponentProps {
        image: BABYLON.GUI.Image;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ImagePropertyGridComponent extends React.Component<IImagePropertyGridComponentProps> {
        constructor(props: IImagePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IImageBasedSliderPropertyGridComponentProps {
        imageBasedSlider: BABYLON.GUI.ImageBasedSlider;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ImageBasedSliderPropertyGridComponent extends React.Component<IImageBasedSliderPropertyGridComponentProps> {
        constructor(props: IImageBasedSliderPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IGridPropertyGridComponentProps {
        grid: BABYLON.GUI.Grid;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class GridPropertyGridComponent extends React.Component<IGridPropertyGridComponentProps> {
        constructor(props: IGridPropertyGridComponentProps);
        renderRows(): import("react/jsx-runtime").JSX.Element[];
        renderColumns(): import("react/jsx-runtime").JSX.Element[];
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IEllipsePropertyGridComponentProps {
        ellipse: BABYLON.GUI.Ellipse;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class EllipsePropertyGridComponent extends React.Component<IEllipsePropertyGridComponentProps> {
        constructor(props: IEllipsePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IControlPropertyGridComponentProps {
        control: BABYLON.GUI.Control;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ControlPropertyGridComponent extends React.Component<IControlPropertyGridComponentProps> {
        constructor(props: IControlPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface ICommonControlPropertyGridComponentProps {
        controls?: BABYLON.GUI.Control[];
        control?: BABYLON.GUI.Control;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class CommonControlPropertyGridComponent extends React.Component<ICommonControlPropertyGridComponentProps> {
        constructor(props: ICommonControlPropertyGridComponentProps);
        renderGridInformation(control: BABYLON.GUI.Control): import("react/jsx-runtime").JSX.Element | null;
        render(): import("react/jsx-runtime").JSX.Element | undefined;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IColorPickerPropertyGridComponentProps {
        colorPicker: BABYLON.GUI.ColorPicker;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ColorPickerPropertyGridComponent extends React.Component<IColorPickerPropertyGridComponentProps> {
        constructor(props: IColorPickerPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface ICheckboxPropertyGridComponentProps {
        checkbox: BABYLON.GUI.Checkbox;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class CheckboxPropertyGridComponent extends React.Component<ICheckboxPropertyGridComponentProps> {
        constructor(props: ICheckboxPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Splitter component properties
     */
    export interface ISplitterProps {
        /**
         * Unique identifier
         */
        id?: string;
        /**
         * Splitter size
         */
        size: number;
        /**
         * Minimum size for the controlled element
         */
        minSize?: number;
        /**
         * Maximum size for the controlled element
         */
        maxSize?: number;
        /**
         * Initial size for the controlled element
         */
        initialSize?: number;
        /**
         * Defines the controlled side
         */
        controlledSide: BABYLON.NodeRenderGraphEditor.SharedUIComponents.ControlledSize;
        /**
         * refObject to the splitter element
         */
        refObject?: React.RefObject<HTMLDivElement>;
    }
    /**
     * Creates a splitter component
     * @param props defines the splitter properties
     * @returns the splitter component
     */
    export var Splitter: React.FC<ISplitterProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export enum ControlledSize {
        First = 0,
        Second = 1
    }
    export enum SplitDirection {
        Horizontal = 0,
        Vertical = 1
    }
    /**
     * Context used to share data with splitters
     */
    export interface ISplitContext {
        /**
         * Split direction
         */
        direction: SplitDirection;
        /**
         * Function called by splitters to update the offset
         * @param offset new offet
         * @param source source element
         * @param controlledSide defined controlled element
         */
        drag: (offset: number, source: HTMLElement, controlledSide: ControlledSize) => void;
        /**
         * Function called by splitters to begin dragging
         */
        beginDrag: () => void;
        /**
         * Function called by splitters to end dragging
         */
        endDrag: () => void;
        /**
         * Sync sizes for the elements
         * @param source source element
         * @param controlledSide defined controlled element
         * @param size size of the controlled element
         * @param minSize minimum size for the controlled element
         * @param maxSize maximum size for the controlled element
         */
        sync: (source: HTMLElement, controlledSide: ControlledSize, size?: number, minSize?: number, maxSize?: number) => void;
    }
    export var SplitContext: import("react").Context<ISplitContext>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Split container properties
     */
    export interface ISplitContainerProps {
        /**
         * Unique identifier
         */
        id?: string;
        /**
         * Split direction
         */
        direction: BABYLON.NodeRenderGraphEditor.SharedUIComponents.SplitDirection;
        /**
         * Minimum size for the floating elements
         */
        floatingMinSize?: number;
        /**
         * RefObject to the root div element
         */
        containerRef?: React.RefObject<HTMLDivElement>;
        /**
         * Optional class name
         */
        className?: string;
        /**
         * Pointer down
         * @param event pointer events
         */
        onPointerDown?: (event: React.PointerEvent) => void;
        /**
         * Pointer move
         * @param event pointer events
         */
        onPointerMove?: (event: React.PointerEvent) => void;
        /**
         * Pointer up
         * @param event pointer events
         */
        onPointerUp?: (event: React.PointerEvent) => void;
        /**
         * Drop
         * @param event drag events
         */
        onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
        /**
         * Drag over
         * @param event drag events
         */
        onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
    }
    /**
     * Creates a split container component
     * @param props defines the split container properties
     * @returns the split container component
     */
    export var SplitContainer: React.FC<ISplitContainerProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export class TypeLedger {
        static PortDataBuilder: (port: BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodePort, nodeContainer: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeContainer) => BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData;
        static NodeDataBuilder: (data: any, nodeContainer: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeContainer) => BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export const IsFramePortData: (variableToCheck: any) => variableToCheck is BABYLON.NodeRenderGraphEditor.SharedUIComponents.FramePortData;
    export const RefreshNode: (node: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode, visitedNodes?: Set<BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode>, visitedLinks?: Set<BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodeLink>, canvas?: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphCanvasComponent) => void;
    export const BuildFloatUI: (container: HTMLDivElement, document: Document, displayName: string, isInteger: boolean, source: any, propertyName: string, onChange: () => void, min?: number, max?: number, visualPropertiesRefresh?: Array<() => void>) => void;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export class StateManager {
        data: any;
        hostDocument: Document;
        lockObject: any;
        modalIsDisplayed: boolean;
        historyStack: BABYLON.NodeRenderGraphEditor.SharedUIComponents.HistoryStack;
        onSearchBoxRequiredObservable: BABYLON.Observable<{
            x: number;
            y: number;
        }>;
        onSelectionChangedObservable: BABYLON.Observable<BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.ISelectionChangedOptions>>;
        onFrameCreatedObservable: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphFrame>;
        onUpdateRequiredObservable: BABYLON.Observable<any>;
        onGraphNodeRemovalObservable: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode>;
        onSelectionBoxMoved: BABYLON.Observable<ClientRect | DOMRect>;
        onCandidateLinkMoved: BABYLON.Observable<BABYLON.Nullable<BABYLON.Vector2>>;
        onCandidatePortSelectedObservable: BABYLON.Observable<BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.FrameNodePort | BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodePort>>;
        onNewNodeCreatedObservable: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode>;
        onRebuildRequiredObservable: BABYLON.Observable<void>;
        onNodeMovedObservable: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode>;
        onErrorMessageDialogRequiredObservable: BABYLON.Observable<string>;
        onExposePortOnFrameObservable: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode>;
        onGridSizeChanged: BABYLON.Observable<void>;
        onNewBlockRequiredObservable: BABYLON.Observable<{
            type: string;
            targetX: number;
            targetY: number;
            needRepositioning?: boolean;
            smartAdd?: boolean;
        }>;
        onHighlightNodeObservable: BABYLON.Observable<{
            data: any;
            active: boolean;
        }>;
        onPreviewCommandActivated: BABYLON.Observable<boolean>;
        exportData: (data: any, frame?: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphFrame>) => string;
        isElbowConnectionAllowed: (nodeA: BABYLON.NodeRenderGraphEditor.SharedUIComponents.FrameNodePort | BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodePort, nodeB: BABYLON.NodeRenderGraphEditor.SharedUIComponents.FrameNodePort | BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodePort) => boolean;
        isDebugConnectionAllowed: (nodeA: BABYLON.NodeRenderGraphEditor.SharedUIComponents.FrameNodePort | BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodePort, nodeB: BABYLON.NodeRenderGraphEditor.SharedUIComponents.FrameNodePort | BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodePort) => boolean;
        applyNodePortDesign: (data: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData, element: HTMLElement, img: HTMLImageElement, pip: HTMLDivElement) => void;
        storeEditorData: (serializationObject: any, frame?: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphFrame>) => void;
        getEditorDataMap: () => {
            [key: number]: number;
        };
        getScene?: () => BABYLON.Scene;
        createDefaultInputData: (rootData: any, portData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData, nodeContainer: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeContainer) => BABYLON.Nullable<{
            data: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData;
            name: string;
        }>;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface ISearchBoxComponentProps {
        stateManager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager;
    }
    /**
     * The search box component.
     */
    export class SearchBoxComponent extends React.Component<ISearchBoxComponentProps, {
        isVisible: boolean;
        filter: string;
        selectedIndex: number;
    }> {
        private _handleEscKey;
        private _targetX;
        private _targetY;
        private _nodes;
        constructor(props: ISearchBoxComponentProps);
        hide(): void;
        onFilterChange(evt: React.ChangeEvent<HTMLInputElement>): void;
        onNewNodeRequested(name: string): void;
        onKeyDown(evt: React.KeyboardEvent): void;
        render(): import("react/jsx-runtime").JSX.Element | null;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export class PropertyLedger {
        static DefaultControl: React.ComponentClass<BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPropertyComponentProps>;
        static RegisteredControls: {
            [key: string]: React.ComponentClass<BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPropertyComponentProps>;
        };
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export class NodePort {
        portData: IPortData;
        node: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode;
        protected _element: HTMLDivElement;
        protected _portContainer: HTMLElement;
        protected _img: HTMLImageElement;
        protected _pip: HTMLDivElement;
        protected _stateManager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager;
        protected _portLabelElement: Element;
        protected _onCandidateLinkMovedObserver: BABYLON.Nullable<BABYLON.Observer<BABYLON.Nullable<BABYLON.Vector2>>>;
        protected _onSelectionChangedObserver: BABYLON.Nullable<BABYLON.Observer<BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.ISelectionChangedOptions>>>;
        protected _exposedOnFrame: boolean;
        protected _portUIcontainer?: HTMLDivElement;
        delegatedPort: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.FrameNodePort>;
        get element(): HTMLDivElement;
        get container(): HTMLElement;
        get portName(): string;
        set portName(newName: string);
        get disabled(): boolean;
        hasLabel(): boolean;
        get exposedOnFrame(): boolean;
        set exposedOnFrame(value: boolean);
        get exposedPortPosition(): number;
        set exposedPortPosition(value: number);
        private _isConnectedToNodeOutsideOfFrame;
        refresh(): void;
        constructor(portContainer: HTMLElement, portData: IPortData, node: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode, stateManager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager, portUIcontainer?: HTMLDivElement);
        dispose(): void;
        static CreatePortElement(portData: IPortData, node: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode, root: HTMLElement, displayManager: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.IDisplayManager>, stateManager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager): NodePort;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export class NodeLink {
        private _graphCanvas;
        private _portA;
        private _portB?;
        private _nodeA;
        private _nodeB?;
        private _path;
        private _selectionPath;
        private _onSelectionChangedObserver;
        private _isVisible;
        private _isTargetCandidate;
        private _gradient;
        onDisposedObservable: BABYLON.Observable<NodeLink>;
        get isTargetCandidate(): boolean;
        set isTargetCandidate(value: boolean);
        get isVisible(): boolean;
        set isVisible(value: boolean);
        get portA(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.FrameNodePort | BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodePort;
        get portB(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.FrameNodePort | BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodePort | undefined;
        get nodeA(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode;
        get nodeB(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode | undefined;
        intersectsWith(rect: DOMRect): boolean;
        update(endX?: number, endY?: number, straight?: boolean): void;
        get path(): SVGPathElement;
        get selectionPath(): SVGPathElement;
        constructor(graphCanvas: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphCanvasComponent, portA: BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodePort, nodeA: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode, portB?: BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodePort, nodeB?: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode);
        onClick(evt: MouseEvent): void;
        dispose(notify?: boolean): void;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export class NodeLedger {
        static RegisteredNodeNames: string[];
        static NameFormatter: (name: string) => string;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export class GraphNode {
        content: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData;
        private _visual;
        private _headerContainer;
        private _headerIcon;
        private _headerIconImg;
        private _headerCollapseImg;
        private _header;
        private _headerCollapse;
        private _connections;
        private _optionsContainer;
        private _inputsContainer;
        private _outputsContainer;
        private _content;
        private _comments;
        private _executionTime;
        private _selectionBorder;
        private _inputPorts;
        private _outputPorts;
        private _links;
        private _x;
        private _y;
        private _gridAlignedX;
        private _gridAlignedY;
        private _mouseStartPointX;
        private _mouseStartPointY;
        private _stateManager;
        private _onSelectionChangedObserver;
        private _onSelectionBoxMovedObserver;
        private _onFrameCreatedObserver;
        private _onUpdateRequiredObserver;
        private _onHighlightNodeObserver;
        private _ownerCanvas;
        private _isSelected;
        private _displayManager;
        private _isVisible;
        private _enclosingFrameId;
        private _visualPropertiesRefresh;
        addClassToVisual(className: string): void;
        removeClassFromVisual(className: string): void;
        get isCollapsed(): boolean;
        get isVisible(): boolean;
        set isVisible(value: boolean);
        private _upateNodePortNames;
        get outputPorts(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodePort[];
        get inputPorts(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodePort[];
        get links(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodeLink[];
        get gridAlignedX(): number;
        get gridAlignedY(): number;
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get width(): number;
        get height(): number;
        get id(): number;
        get name(): string;
        get isSelected(): boolean;
        get enclosingFrameId(): number;
        set enclosingFrameId(value: number);
        set isSelected(value: boolean);
        setIsSelected(value: boolean, marqueeSelection: boolean): void;
        get rootElement(): HTMLDivElement;
        constructor(content: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, stateManager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager);
        isOverlappingFrame(frame: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphFrame): boolean;
        getPortForPortData(portData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData): BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodePort | null;
        getPortDataForPortDataContent(data: any): BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData | null;
        getLinksForPortDataContent(data: any): BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodeLink[];
        getLinksForPortData(portData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData): BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodeLink[];
        private _refreshFrames;
        _refreshLinks(): void;
        refresh(): void;
        private _onDown;
        cleanAccumulation(useCeil?: boolean): void;
        private _onUp;
        private _onMove;
        renderProperties(): BABYLON.Nullable<JSX.Element>;
        _forceRebuild(source: any, propertyName: string, notifiers?: BABYLON.IEditablePropertyOption["notifiers"]): void;
        private _isCollapsed;
        /**
         * Collapse the node
         */
        collapse(): void;
        /**
         * Expand the node
         */
        expand(): void;
        appendVisual(root: HTMLDivElement, owner: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphCanvasComponent): void;
        dispose(): void;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export enum FramePortPosition {
        Top = 0,
        Middle = 1,
        Bottom = 2
    }
    export class GraphFrame {
        private readonly _collapsedWidth;
        private static _FrameCounter;
        private static _FramePortCounter;
        private _name;
        private _color;
        private _x;
        private _y;
        private _gridAlignedX;
        private _gridAlignedY;
        private _width;
        private _height;
        element: HTMLDivElement;
        private _borderElement;
        private _headerElement;
        private _headerTextElement;
        private _headerCollapseElement;
        private _headerCloseElement;
        private _headerFocusElement;
        private _commentsElement;
        private _portContainer;
        private _outputPortContainer;
        private _inputPortContainer;
        private _nodes;
        private _ownerCanvas;
        private _mouseStartPointX;
        private _mouseStartPointY;
        private _onSelectionChangedObserver;
        private _onGraphNodeRemovalObserver;
        private _onExposePortOnFrameObserver;
        private _onNodeLinkDisposedObservers;
        private _isCollapsed;
        private _frameInPorts;
        private _frameOutPorts;
        private _controlledPorts;
        private _exposedInPorts;
        private _exposedOutPorts;
        private _id;
        private _comments;
        private _frameIsResizing;
        private _resizingDirection;
        private _minFrameHeight;
        private _minFrameWidth;
        private _mouseXLimit;
        onExpandStateChanged: BABYLON.Observable<GraphFrame>;
        private readonly _closeSVG;
        private readonly _expandSVG;
        private readonly _collapseSVG;
        private readonly _focusSVG;
        get id(): number;
        get isCollapsed(): boolean;
        private _createInputPort;
        private _markFramePortPositions;
        private _createFramePorts;
        private _removePortFromExposedWithNode;
        private _removePortFromExposedWithLink;
        private _createInputPorts;
        private _createOutputPorts;
        redrawFramePorts(): void;
        set isCollapsed(value: boolean);
        get nodes(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode[];
        get ports(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.FrameNodePort[];
        get name(): string;
        set name(value: string);
        get color(): BABYLON.Color3;
        set color(value: BABYLON.Color3);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get width(): number;
        set width(value: number);
        get height(): number;
        set height(value: number);
        get comments(): string;
        set comments(comments: string);
        constructor(candidate: BABYLON.Nullable<HTMLDivElement>, canvas: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphCanvasComponent, doNotCaptureNodes?: boolean);
        private _isFocused;
        /**
         * Enter/leave focus mode
         */
        switchFocusMode(): void;
        refresh(): void;
        addNode(node: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode): void;
        removeNode(node: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode): void;
        syncNode(node: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode): void;
        cleanAccumulation(): void;
        private _onDown;
        move(newX: number, newY: number, align?: boolean): void;
        private _onUp;
        _moveFrame(offsetX: number, offsetY: number): void;
        private _onMove;
        moveFramePortUp(nodePort: BABYLON.NodeRenderGraphEditor.SharedUIComponents.FrameNodePort): void;
        private _movePortUp;
        moveFramePortDown(nodePort: BABYLON.NodeRenderGraphEditor.SharedUIComponents.FrameNodePort): void;
        private _movePortDown;
        private _initResizing;
        private _cleanUpResizing;
        private _updateMinHeightWithComments;
        private _isResizingTop;
        private _isResizingRight;
        private _isResizingBottom;
        private _isResizingLeft;
        private _onRightHandlePointerDown;
        private _onRightHandlePointerMove;
        private _moveRightHandle;
        private _onRightHandlePointerUp;
        private _onBottomHandlePointerDown;
        private _onBottomHandlePointerMove;
        private _moveBottomHandle;
        private _onBottomHandlePointerUp;
        private _onLeftHandlePointerDown;
        private _onLeftHandlePointerMove;
        private _moveLeftHandle;
        private _onLeftHandlePointerUp;
        private _onTopHandlePointerDown;
        private _onTopHandlePointerMove;
        private _moveTopHandle;
        private _onTopHandlePointerUp;
        private _onTopRightHandlePointerDown;
        private _onTopRightHandlePointerMove;
        private _moveTopRightHandle;
        private _onTopRightHandlePointerUp;
        private _onBottomRightHandlePointerDown;
        private _onBottomRightHandlePointerMove;
        private _moveBottomRightHandle;
        private _onBottomRightHandlePointerUp;
        private _onBottomLeftHandlePointerDown;
        private _onBottomLeftHandlePointerMove;
        private _moveBottomLeftHandle;
        private _onBottomLeftHandlePointerUp;
        private _onTopLeftHandlePointerDown;
        private _onTopLeftHandlePointerMove;
        private _moveTopLeftHandle;
        private _onTopLeftHandlePointerUp;
        private _expandLeft;
        private _expandTop;
        private _expandRight;
        private _expandBottom;
        dispose(): void;
        private _serializePortData;
        serialize(saveCollapsedState: boolean): BABYLON.NodeRenderGraphEditor.SharedUIComponents.IFrameData;
        export(): void;
        adjustPorts(): void;
        static Parse(serializationData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IFrameData, canvas: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphCanvasComponent, map?: {
            [key: number]: number;
        }): GraphFrame;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IGraphCanvasComponentProps {
        stateManager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager;
        onEmitNewNode: (nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData) => BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode;
    }
    export class GraphCanvasComponent extends React.Component<IGraphCanvasComponentProps> implements BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeContainer {
        static readonly NodeWidth = 100;
        private readonly _minZoom;
        private readonly _maxZoom;
        private _hostCanvasRef;
        private _hostCanvas;
        private _graphCanvasRef;
        private _graphCanvas;
        private _selectionContainerRef;
        private _selectionContainer;
        private _frameContainerRef;
        private _frameContainer;
        private _svgCanvasRef;
        private _svgCanvas;
        private _rootContainerRef;
        private _rootContainer;
        private _nodes;
        private _links;
        private _mouseStartPointX;
        private _mouseStartPointY;
        private _dropPointX;
        private _dropPointY;
        private _selectionStartX;
        private _selectionStartY;
        private _candidateLinkedHasMoved;
        private _x;
        private _y;
        private _zoom;
        private _selectedNodes;
        private _selectedLink;
        private _selectedPort;
        private _candidateLink;
        private _candidatePort;
        private _gridSize;
        private _selectionBox;
        private _selectedFrames;
        private _frameCandidate;
        private _frames;
        private _nodeDataContentList;
        private _altKeyIsPressed;
        private _multiKeyIsPressed;
        private _oldY;
        _frameIsMoving: boolean;
        _isLoading: boolean;
        _targetLinkCandidate: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodeLink>;
        private _copiedNodes;
        private _copiedFrames;
        get gridSize(): number;
        set gridSize(value: number);
        get stateManager(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager;
        get nodes(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode[];
        get links(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodeLink[];
        get frames(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphFrame[];
        get zoom(): number;
        set zoom(value: number);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get selectedNodes(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode[];
        get selectedLink(): BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodeLink>;
        get selectedFrames(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphFrame[];
        get selectedPort(): BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodePort>;
        get canvasContainer(): HTMLDivElement;
        get hostCanvas(): HTMLDivElement;
        get svgCanvas(): HTMLElement;
        get selectionContainer(): HTMLDivElement;
        get frameContainer(): HTMLDivElement;
        private _selectedFrameAndNodesConflict;
        constructor(props: IGraphCanvasComponentProps);
        populateConnectedEntriesBeforeRemoval(item: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode, items: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode[], inputs: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData>[], outputs: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData>[]): void;
        automaticRewire(inputs: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData>[], outputs: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData>[], firstOnly?: boolean): void;
        smartAddOverLink(node: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode, link: BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodeLink): void;
        smartAddOverNode(node: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode, source: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode): void;
        deleteSelection(onRemove: (nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData) => void, autoReconnect?: boolean): void;
        handleKeyDown(evt: KeyboardEvent, onRemove: (nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData) => void, mouseLocationX: number, mouseLocationY: number, dataGenerator: (nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData) => any, rootElement: HTMLDivElement): void;
        pasteSelection(copiedNodes: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode[], currentX: number, currentY: number, dataGenerator: (nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData) => any, selectNew?: boolean): BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode[];
        reconnectNewNodes(nodeIndex: number, newNodes: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode[], sourceNodes: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode[], done: boolean[]): void;
        getCachedData(): any[];
        removeDataFromCache(data: any): void;
        createNodeFromObject(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, onNodeCreated: (data: any) => void, recursion?: boolean): BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode;
        getGridPosition(position: number, useCeil?: boolean): number;
        getGridPositionCeil(position: number): number;
        updateTransform(): void;
        onKeyUp(): void;
        findNodeFromData(data: any): BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode;
        reset(): void;
        connectPorts(pointA: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData, pointB: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData): void;
        removeLink(link: BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodeLink): void;
        appendNode(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData): BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode;
        distributeGraph(): void;
        componentDidMount(): void;
        onMove(evt: React.PointerEvent): void;
        onDown(evt: React.PointerEvent<HTMLElement>): void;
        onUp(evt: React.PointerEvent): void;
        onWheel(evt: React.WheelEvent): void;
        zoomToFit(): void;
        processCandidatePort(): void;
        connectNodes(nodeA: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode, pointA: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData, nodeB: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode, pointB: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData): void;
        drop(newNode: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode, targetX: number, targetY: number, offsetX: number, offsetY: number): void;
        processEditorData(editorData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IEditorData): void;
        reOrganize(editorData?: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.IEditorData>, isImportingAFrame?: boolean): void;
        addFrame(frameData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IFrameData): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export class FrameNodePort extends BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodePort {
        portData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData;
        node: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode;
        private _parentFrameId;
        private _isInput;
        private _framePortPosition;
        private _framePortId;
        private _onFramePortPositionChangedObservable;
        get parentFrameId(): number;
        get onFramePortPositionChangedObservable(): BABYLON.Observable<FrameNodePort>;
        get isInput(): boolean;
        get framePortId(): number;
        get framePortPosition(): BABYLON.NodeRenderGraphEditor.SharedUIComponents.FramePortPosition;
        set framePortPosition(position: BABYLON.NodeRenderGraphEditor.SharedUIComponents.FramePortPosition);
        constructor(portContainer: HTMLElement, portData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData, node: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode, stateManager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager, isInput: boolean, framePortId: number, parentFrameId: number);
        static CreateFrameNodePortElement(portData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData, node: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode, root: HTMLElement, displayManager: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.IDisplayManager>, stateManager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager, isInput: boolean, framePortId: number, parentFrameId: number): FrameNodePort;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export class DisplayLedger {
        static RegisteredControls: {
            [key: string]: any;
        };
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Function used to force a rebuild of the node system
     * @param source source object
     * @param stateManager defines the state manager to use
     * @param propertyName name of the property that has been changed
     * @param notifiers list of notifiers to use
     */
    export function ForceRebuild(source: any, stateManager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager, propertyName: string, notifiers?: BABYLON.IEditablePropertyOption["notifiers"]): void;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export type FramePortData = {
        frame: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphFrame;
        port: BABYLON.NodeRenderGraphEditor.SharedUIComponents.FrameNodePort;
    };



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface ISelectionChangedOptions {
        selection: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode | BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodeLink | BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphFrame | BABYLON.NodeRenderGraphEditor.SharedUIComponents.NodePort | BABYLON.NodeRenderGraphEditor.SharedUIComponents.FramePortData>;
        forceKeepSelection?: boolean;
        marqueeSelection?: boolean;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IPropertyComponentProps {
        stateManager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager;
        nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export enum PortDataDirection {
        /** Input */
        Input = 0,
        /** Output */
        Output = 1
    }
    export enum PortDirectValueTypes {
        Float = 0,
        Int = 1
    }
    export interface IPortDirectValueDefinition {
        /**
         * Gets the source object
         */
        source: any;
        /**
         * Gets the property name used to store the value
         */
        propertyName: string;
        /**
         * Gets or sets the min value accepted for this point if nothing is connected
         */
        valueMin: BABYLON.Nullable<any>;
        /**
         * Gets or sets the max value accepted for this point if nothing is connected
         */
        valueMax: BABYLON.Nullable<any>;
        /**
         * Gets or sets the type of the value
         */
        valueType: PortDirectValueTypes;
    }
    export interface IPortData {
        data: any;
        name: string;
        internalName: string;
        isExposedOnFrame: boolean;
        exposedPortPosition: number;
        isConnected: boolean;
        direction: PortDataDirection;
        ownerData: any;
        connectedPort: BABYLON.Nullable<IPortData>;
        needDualDirectionValidation: boolean;
        hasEndpoints: boolean;
        endpoints: BABYLON.Nullable<IPortData[]>;
        directValueDefinition?: IPortDirectValueDefinition;
        updateDisplayName: (newName: string) => void;
        canConnectTo: (port: IPortData) => boolean;
        connectTo: (port: IPortData) => void;
        disconnectFrom: (port: IPortData) => void;
        checkCompatibilityState(port: IPortData): number;
        getCompatibilityIssueMessage(issue: number, targetNode: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode, targetPort: IPortData): string;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface INodeLocationInfo {
        blockId: number;
        x: number;
        y: number;
        isCollapsed: boolean;
    }
    export interface IFrameData {
        x: number;
        y: number;
        width: number;
        height: number;
        color: number[];
        name: string;
        isCollapsed: boolean;
        blocks: number[];
        comments: string;
    }
    export interface IEditorData {
        locations: INodeLocationInfo[];
        x: number;
        y: number;
        zoom: number;
        frames?: IFrameData[];
        map?: {
            [key: number]: number;
        };
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface INodeData {
        data: any;
        name: string;
        uniqueId: number;
        isInput: boolean;
        comments: string;
        executionTime?: number;
        refreshCallback?: () => void;
        prepareHeaderIcon: (iconDiv: HTMLDivElement, img: HTMLImageElement) => void;
        getClassName: () => string;
        dispose: () => void;
        getPortByName: (name: string) => BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData>;
        inputs: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData[];
        outputs: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData[];
        invisibleEndpoints?: BABYLON.Nullable<any[]>;
        isConnectedToOutput?: () => boolean;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface INodeContainer {
        nodes: BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode[];
        appendNode(data: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData): BABYLON.NodeRenderGraphEditor.SharedUIComponents.GraphNode;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface VisualContentDescription {
        [key: string]: HTMLElement;
    }
    export interface IDisplayManager {
        getHeaderClass(data: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData): string;
        shouldDisplayPortLabels(data: BABYLON.NodeRenderGraphEditor.SharedUIComponents.IPortData): boolean;
        updatePreviewContent(data: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
        updateFullVisualContent?(data: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, visualContent: VisualContentDescription): void;
        getBackgroundColor(data: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData): string;
        getHeaderText(data: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData): string;
        onSelectionChanged?(data: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, selectedData: BABYLON.Nullable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData>, manager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager): void;
        onDispose?(nodeData: BABYLON.NodeRenderGraphEditor.SharedUIComponents.INodeData, manager: BABYLON.NodeRenderGraphEditor.SharedUIComponents.StateManager): void;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IVector4LineComponentProps {
        label: string;
        target?: any;
        propertyName?: string;
        step?: number;
        onChange?: (newvalue: BABYLON.Vector4) => void;
        useEuler?: boolean;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
        icon?: string;
        iconLabel?: string;
        value?: BABYLON.Vector4;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
    }
    export class Vector4LineComponent extends React.Component<IVector4LineComponentProps, {
        isExpanded: boolean;
        value: BABYLON.Vector4;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: IVector4LineComponentProps);
        getCurrentValue(): any;
        shouldComponentUpdate(nextProps: IVector4LineComponentProps, nextState: {
            isExpanded: boolean;
            value: BABYLON.Vector4;
        }): boolean;
        switchExpandState(): void;
        raiseOnPropertyChanged(previousValue: BABYLON.Vector4): void;
        updateVector4(): void;
        updateStateX(value: number): void;
        updateStateY(value: number): void;
        updateStateZ(value: number): void;
        updateStateW(value: number): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IVector3LineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        step?: number;
        onChange?: (newvalue: BABYLON.Vector3) => void;
        useEuler?: boolean;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
        noSlider?: boolean;
        icon?: string;
        iconLabel?: string;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
    }
    export class Vector3LineComponent extends React.Component<IVector3LineComponentProps, {
        isExpanded: boolean;
        value: BABYLON.Vector3;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: IVector3LineComponentProps);
        getCurrentValue(): any;
        shouldComponentUpdate(nextProps: IVector3LineComponentProps, nextState: {
            isExpanded: boolean;
            value: BABYLON.Vector3;
        }): boolean;
        switchExpandState(): void;
        raiseOnPropertyChanged(previousValue: BABYLON.Vector3): void;
        updateVector3(): void;
        updateStateX(value: number): void;
        updateStateY(value: number): void;
        updateStateZ(value: number): void;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IVector2LineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        step?: number;
        onChange?: (newvalue: BABYLON.Vector2) => void;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
        icon?: string;
        iconLabel?: string;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
    }
    export class Vector2LineComponent extends React.Component<IVector2LineComponentProps, {
        isExpanded: boolean;
        value: BABYLON.Vector2;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: IVector2LineComponentProps);
        shouldComponentUpdate(nextProps: IVector2LineComponentProps, nextState: {
            isExpanded: boolean;
            value: BABYLON.Vector2;
        }): boolean;
        switchExpandState(): void;
        raiseOnPropertyChanged(previousValue: BABYLON.Vector2): void;
        updateStateX(value: number): void;
        updateStateY(value: number): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IValueLineComponentProps {
        label: string;
        value: number;
        color?: string;
        fractionDigits?: number;
        units?: string;
        icon?: string;
        iconLabel?: string;
    }
    export class ValueLineComponent extends React.Component<IValueLineComponentProps> {
        constructor(props: IValueLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IUnitButtonProps {
        unit: string;
        locked?: boolean;
        onClick?: (unit: string) => void;
    }
    export function UnitButton(props: IUnitButtonProps): import("react/jsx-runtime").JSX.Element;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface ITextLineComponentProps {
        label?: string;
        value?: string;
        color?: string;
        underline?: boolean;
        onLink?: () => void;
        url?: string;
        ignoreValue?: boolean;
        additionalClass?: string;
        icon?: string;
        iconLabel?: string;
        tooltip?: string;
    }
    export class TextLineComponent extends React.Component<ITextLineComponentProps> {
        constructor(props: ITextLineComponentProps);
        onLink(): void;
        renderContent(): import("react/jsx-runtime").JSX.Element | null;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface ITextInputLineComponentProps {
        label?: string;
        lockObject?: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        target?: any;
        propertyName?: string;
        value?: string;
        onChange?: (value: string) => void;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
        icon?: string;
        iconLabel?: string;
        noUnderline?: boolean;
        numbersOnly?: boolean;
        delayInput?: boolean;
        arrows?: boolean;
        arrowsIncrement?: (amount: number) => void;
        step?: number;
        numeric?: boolean;
        roundValues?: boolean;
        min?: number;
        max?: number;
        placeholder?: string;
        unit?: React.ReactNode;
        validator?: (value: string) => boolean;
        multilines?: boolean;
        throttlePropertyChangedNotification?: boolean;
        throttlePropertyChangedNotificationDelay?: number;
        disabled?: boolean;
    }
    export class TextInputLineComponent extends React.Component<ITextInputLineComponentProps, {
        value: string;
        dragging: boolean;
    }> {
        private _localChange;
        constructor(props: ITextInputLineComponentProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: ITextInputLineComponentProps, nextState: {
            value: string;
            dragging: boolean;
        }): boolean;
        raiseOnPropertyChanged(newValue: string, previousValue: string): void;
        getCurrentNumericValue(value: string): number;
        updateValue(value: string, valueToValidate?: string): void;
        incrementValue(amount: number): void;
        onKeyDown(event: React.KeyboardEvent): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export const conflictingValuesPlaceholder = "\u2014";
    /**
     *
     * @param targets a list of selected targets
     * @param onPropertyChangedObservable
     * @param getProperty
     * @returns a proxy object that can be passed as a target into the input
     */
    export function makeTargetsProxy<Type>(targets: Type[], onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>, getProperty?: (target: Type, property: keyof Type) => any): any;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface ISliderLineComponentProps {
        label: string;
        target?: any;
        propertyName?: string;
        minimum: number;
        maximum: number;
        step: number;
        directValue?: number;
        useEuler?: boolean;
        onChange?: (value: number) => void;
        onInput?: (value: number) => void;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
        decimalCount?: number;
        margin?: boolean;
        icon?: string;
        iconLabel?: string;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        unit?: React.ReactNode;
        allowOverflow?: boolean;
    }
    export class SliderLineComponent extends React.Component<ISliderLineComponentProps, {
        value: number;
    }> {
        private _localChange;
        constructor(props: ISliderLineComponentProps);
        shouldComponentUpdate(nextProps: ISliderLineComponentProps, nextState: {
            value: number;
        }): boolean;
        onChange(newValueString: any): void;
        onInput(newValueString: any): void;
        prepareDataToRead(value: number): number;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IRadioButtonLineComponentProps {
        onSelectionChangedObservable: BABYLON.Observable<RadioButtonLineComponent>;
        label: string;
        isSelected: () => boolean;
        onSelect: () => void;
        icon?: string;
        iconLabel?: string;
    }
    export class RadioButtonLineComponent extends React.Component<IRadioButtonLineComponentProps, {
        isSelected: boolean;
    }> {
        private _onSelectionChangedObserver;
        constructor(props: IRadioButtonLineComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        onChange(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export var Null_Value: number;
    export interface IOptionsLineProps {
        label: string;
        target: any;
        propertyName: string;
        options: BABYLON.IInspectableOptions[];
        noDirectUpdate?: boolean;
        onSelect?: (value: number | string) => void;
        extractValue?: (target: any) => number | string;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
        allowNullValue?: boolean;
        icon?: string;
        iconLabel?: string;
        className?: string;
        valuesAreStrings?: boolean;
        defaultIfNull?: number;
    }
    export class OptionsLine extends React.Component<IOptionsLineProps, {
        value: number | string;
    }> {
        private _localChange;
        private _remapValueIn;
        private _remapValueOut;
        private _getValue;
        constructor(props: IOptionsLineProps);
        shouldComponentUpdate(nextProps: IOptionsLineProps, nextState: {
            value: number;
        }): boolean;
        raiseOnPropertyChanged(newValue: number, previousValue: number): void;
        setValue(value: string | number): void;
        updateValue(valueString: string): void;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface INumericInputProps {
        label: string;
        labelTooltip?: string;
        value: number;
        step?: number;
        onChange: (value: number) => void;
        precision?: number;
        icon?: string;
        iconLabel?: string;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
    }
    export class NumericInput extends React.Component<INumericInputProps, {
        value: string;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: INumericInputProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: INumericInputProps, nextState: {
            value: string;
        }): boolean;
        updateValue(valueString: string): void;
        onBlur(): void;
        incrementValue(amount: number): void;
        onKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IMessageLineComponentProps {
        text: string;
        color?: string;
        icon?: any;
    }
    export class MessageLineComponent extends React.Component<IMessageLineComponentProps> {
        constructor(props: IMessageLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IMatrixLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        step?: number;
        onChange?: (newValue: BABYLON.Matrix) => void;
        onModeChange?: (mode: number) => void;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
        mode?: number;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
    }
    export class MatrixLineComponent extends React.Component<IMatrixLineComponentProps, {
        value: BABYLON.Matrix;
        mode: number;
        angle: number;
    }> {
        private _localChange;
        constructor(props: IMatrixLineComponentProps);
        shouldComponentUpdate(nextProps: IMatrixLineComponentProps, nextState: {
            value: BABYLON.Matrix;
            mode: number;
            angle: number;
        }): boolean;
        raiseOnPropertyChanged(previousValue: BABYLON.Vector3): void;
        updateMatrix(): void;
        updateRow(value: BABYLON.Vector4, row: number): void;
        updateBasedOnMode(value: number): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface ILinkButtonComponentProps {
        label: string;
        buttonLabel: string;
        url?: string;
        onClick: () => void;
        icon?: any;
        onIconClick?: () => void;
    }
    export class LinkButtonComponent extends React.Component<ILinkButtonComponentProps> {
        constructor(props: ILinkButtonComponentProps);
        onLink(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface ILineWithFileButtonComponentProps {
        title: string;
        closed?: boolean;
        multiple?: boolean;
        label: string;
        iconImage: any;
        onIconClick: (file: File) => void;
        accept: string;
        uploadName?: string;
    }
    export class LineWithFileButtonComponent extends React.Component<ILineWithFileButtonComponentProps, {
        isExpanded: boolean;
    }> {
        private _uploadRef;
        constructor(props: ILineWithFileButtonComponentProps);
        onChange(evt: any): void;
        switchExpandedState(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface ILineContainerComponentProps {
        selection?: BABYLON.NodeRenderGraphEditor.SharedUIComponents.ISelectedLineContainer;
        title: string;
        children: any[] | any;
        closed?: boolean;
    }
    export class LineContainerComponent extends React.Component<ILineContainerComponentProps, {
        isExpanded: boolean;
        isHighlighted: boolean;
    }> {
        constructor(props: ILineContainerComponentProps);
        switchExpandedState(): void;
        renderHeader(): import("react/jsx-runtime").JSX.Element;
        componentDidMount(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IInputArrowsComponentProps {
        incrementValue: (amount: number) => void;
        setDragging: (dragging: boolean) => void;
    }
    export class InputArrowsComponent extends React.Component<IInputArrowsComponentProps> {
        private _arrowsRef;
        private _drag;
        private _releaseListener;
        private _lockChangeListener;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IIndentedTextLineComponentProps {
        value?: string;
        color?: string;
        underline?: boolean;
        onLink?: () => void;
        url?: string;
        additionalClass?: string;
    }
    export class IndentedTextLineComponent extends React.Component<IIndentedTextLineComponentProps> {
        constructor(props: IIndentedTextLineComponentProps);
        onLink(): void;
        renderContent(): import("react/jsx-runtime").JSX.Element;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IIconComponentProps {
        icon: string;
        label?: string;
    }
    export class IconComponent extends React.Component<IIconComponentProps> {
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IIconButtonLineComponentProps {
        icon: string;
        onClick: () => void;
        tooltip: string;
        active?: boolean;
    }
    export class IconButtonLineComponent extends React.Component<IIconButtonLineComponentProps> {
        constructor(props: IIconButtonLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface ISelectedLineContainer {
        selectedLineContainerTitles: Array<string>;
        selectedLineContainerTitlesNoFocus: Array<string>;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IHexLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        lockObject?: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        onChange?: (newValue: number) => void;
        isInteger?: boolean;
        replaySourceReplacement?: string;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
        additionalClass?: string;
        step?: string;
        digits?: number;
        useEuler?: boolean;
        min?: number;
        icon?: string;
        iconLabel?: string;
    }
    export class HexLineComponent extends React.Component<IHexLineComponentProps, {
        value: string;
    }> {
        private _localChange;
        private _store;
        private _propertyChange;
        constructor(props: IHexLineComponentProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: IHexLineComponentProps, nextState: {
            value: string;
        }): boolean;
        raiseOnPropertyChanged(newValue: number, previousValue: number): void;
        convertToHexString(valueString: string): string;
        updateValue(valueString: string, raisePropertyChanged: boolean): void;
        lock(): void;
        unlock(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IFloatLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        onChange?: (newValue: number) => void;
        isInteger?: boolean;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
        additionalClass?: string;
        step?: string;
        digits?: number;
        useEuler?: boolean;
        min?: number;
        max?: number;
        smallUI?: boolean;
        onEnter?: (newValue: number) => void;
        icon?: string;
        iconLabel?: string;
        defaultValue?: number;
        arrows?: boolean;
        unit?: React.ReactNode;
        onDragStart?: (newValue: number) => void;
        onDragStop?: (newValue: number) => void;
        disabled?: boolean;
    }
    export class FloatLineComponent extends React.Component<IFloatLineComponentProps, {
        value: string;
        dragging: boolean;
    }> {
        private _localChange;
        private _store;
        constructor(props: IFloatLineComponentProps);
        componentWillUnmount(): void;
        getValueString(value: any, props: IFloatLineComponentProps): string;
        shouldComponentUpdate(nextProps: IFloatLineComponentProps, nextState: {
            value: string;
            dragging: boolean;
        }): boolean;
        raiseOnPropertyChanged(newValue: number, previousValue: number): void;
        updateValue(valueString: string): void;
        lock(): void;
        unlock(): void;
        incrementValue(amount: number, processStep?: boolean): void;
        onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IFileMultipleButtonLineComponentProps {
        label: string;
        onClick: (event: any) => void;
        accept: string;
        icon?: string;
        iconLabel?: string;
    }
    export class FileMultipleButtonLineComponent extends React.Component<IFileMultipleButtonLineComponentProps> {
        private static _IDGenerator;
        private _id;
        private _uploadInputRef;
        constructor(props: IFileMultipleButtonLineComponentProps);
        onChange(evt: any): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface IFileButtonLineProps {
        label: string;
        onClick: (file: File) => void;
        accept: string;
        icon?: string;
        iconLabel?: string;
    }
    export class FileButtonLine extends React.Component<IFileButtonLineProps> {
        private static _IDGenerator;
        private _id;
        private _uploadInputRef;
        constructor(props: IFileButtonLineProps);
        onChange(evt: any): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IDraggableLineWithButtonComponent {
        format: string;
        data: string;
        tooltip: string;
        iconImage: any;
        onIconClick: (value: string) => void;
        iconTitle: string;
        lenSuffixToRemove?: number;
    }
    export class DraggableLineWithButtonComponent extends React.Component<IDraggableLineWithButtonComponent> {
        constructor(props: IDraggableLineWithButtonComponent);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IButtonLineComponentProps {
        format: string;
        data: string;
        tooltip: string;
    }
    export class DraggableLineComponent extends React.Component<IButtonLineComponentProps> {
        constructor(props: IButtonLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IColorPickerLineProps {
        value: BABYLON.Color4 | BABYLON.Color3;
        linearHint?: boolean;
        onColorChanged: (newOne: string) => void;
        icon?: string;
        iconLabel?: string;
        shouldPopRight?: boolean;
        lockObject?: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
    }
    interface IColorPickerComponentState {
        pickerEnabled: boolean;
        color: BABYLON.Color3 | BABYLON.Color4;
        hex: string;
    }
    export class ColorPickerLine extends React.Component<IColorPickerLineProps, IColorPickerComponentState> {
        private _floatRef;
        private _floatHostRef;
        constructor(props: IColorPickerLineProps);
        syncPositions(): void;
        shouldComponentUpdate(nextProps: IColorPickerLineProps, nextState: IColorPickerComponentState): boolean;
        getHexString(props?: Readonly<IColorPickerLineProps> & Readonly<{
            children?: React.ReactNode | undefined;
        }>): string;
        componentDidUpdate(): void;
        componentDidMount(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IColorLineProps {
        label: string;
        target?: any;
        propertyName: string;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
        onChange?: () => void;
        isLinear?: boolean;
        icon?: string;
        iconLabel?: string;
        disableAlpha?: boolean;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
    }
    interface IColorLineComponentState {
        isExpanded: boolean;
        color: BABYLON.Color4;
    }
    export class ColorLine extends React.Component<IColorLineProps, IColorLineComponentState> {
        constructor(props: IColorLineProps);
        shouldComponentUpdate(nextProps: IColorLineProps, nextState: IColorLineComponentState): boolean;
        getValue(props?: Readonly<IColorLineProps> & Readonly<{
            children?: React.ReactNode | undefined;
        }>): BABYLON.Color4;
        setColorFromString(colorString: string): void;
        setColor(newColor: BABYLON.Color4): void;
        switchExpandState(): void;
        updateStateR(value: number): void;
        updateStateG(value: number): void;
        updateStateB(value: number): void;
        updateStateA(value: number): void;
        private _convertToColor;
        private _toColor3;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IColor4LineComponentProps {
        label: string;
        target?: any;
        propertyName: string;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
        onChange?: () => void;
        isLinear?: boolean;
        icon?: string;
        iconLabel?: string;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
    }
    export class Color4LineComponent extends React.Component<IColor4LineComponentProps> {
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IColor3LineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
        isLinear?: boolean;
        icon?: string;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        iconLabel?: string;
        onChange?: () => void;
    }
    export class Color3LineComponent extends React.Component<IColor3LineComponentProps> {
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface ICheckBoxLineComponentProps {
        label?: string;
        target?: any;
        propertyName?: string;
        isSelected?: () => boolean;
        onSelect?: (value: boolean) => void;
        onValueChanged?: () => void;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
        disabled?: boolean;
        icon?: string;
        iconLabel?: string;
        faIcons?: {
            enabled: any;
            disabled: any;
        };
        large?: boolean;
    }
    export class CheckBoxLineComponent extends React.Component<ICheckBoxLineComponentProps, {
        isSelected: boolean;
        isDisabled?: boolean;
        isConflict: boolean;
    }> {
        private _localChange;
        constructor(props: ICheckBoxLineComponentProps);
        shouldComponentUpdate(nextProps: ICheckBoxLineComponentProps, nextState: {
            isSelected: boolean;
            isDisabled: boolean;
            isConflict: boolean;
        }): boolean;
        onChange(): void;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IButtonLineComponentProps {
        label: string;
        onClick: () => void;
        icon?: string;
        iconLabel?: string;
        isDisabled?: boolean;
    }
    export class ButtonLineComponent extends React.Component<IButtonLineComponentProps> {
        constructor(props: IButtonLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IBooleanLineComponentProps {
        label: string;
        value: boolean;
        icon?: string;
        iconLabel?: string;
    }
    export class BooleanLineComponent extends React.Component<IBooleanLineComponentProps> {
        constructor(props: IBooleanLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export function ClassNames(names: any, styleObject: any): string;
    export function JoinClassNames(styleObject: any, ...names: string[]): string;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export type ToggleProps = {
        toggled: "on" | "mixed" | "off";
        onToggle?: () => void;
        padded?: boolean;
        color?: "dark" | "light";
    };
    export var Toggle: React.FC<ToggleProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface ITextInputProps {
        label?: string;
        placeholder?: string;
        submitValue: (newValue: string) => void;
        validateValue?: (value: string) => boolean;
        cancelSubmit?: () => void;
    }
    /**
     * This component represents a text input that can be submitted or cancelled on buttons
     * @param props properties
     * @returns TextInputWithSubmit element
     */
    export const TextInputWithSubmit: (props: ITextInputProps) => import("react/jsx-runtime").JSX.Element;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface MessageDialogProps {
        message: string;
        isError: boolean;
        onClose?: () => void;
    }
    export var MessageDialog: React.FC<MessageDialogProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export type LabelProps = {
        text: string;
        children?: React.ReactChild;
        color?: "dark" | "light";
    };
    export var Label: React.FC<LabelProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export type IconProps = {
        color?: "dark" | "light";
        icon: string;
    };
    export var Icon: React.FC<IconProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export type ButtonProps = {
        disabled?: boolean;
        active?: boolean;
        onClick?: () => void;
        color: "light" | "dark";
        size: "default" | "small" | "wide" | "smaller";
        title?: string;
        backgroundColor?: string;
    };
    export var Button: React.FC<ButtonProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * utility hook to assist using the graph context
     * @returns
     */
    export const useGraphContext: () => IGraphContext;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export type IVisualRecordsType = Record<string, {
        x: number;
        y: number;
    }>;
    export type IConnectionType = {
        id: string;
        sourceId: string;
        targetId: string;
    };
    export type ICustomDataType = {
        type: string;
        value: any;
    };
    export type INodeType = {
        id: string;
        label: string;
        customData?: ICustomDataType;
    };
    /**
     * props for the node renderer
     */
    export interface INodeRendererProps {
        /**
         * array of connections between nodes
         */
        connections: IConnectionType[];
        /**
         * function called when a new connection is created
         */
        updateConnections: (sourceId: string, targetId: string) => void;
        /**
         * function called when a connection is deleted
         */
        deleteLine: (lineId: string) => void;
        /**
         * function called when a node is deleted
         */
        deleteNode: (nodeId: string) => void;
        /**
         * array of all nodes
         */
        nodes: INodeType[];
        /**
         * id of the node to highlight
         */
        highlightedNode?: BABYLON.Nullable<string>;
        /**
         * function to be called if a node is selected
         */
        selectNode?: (nodeId: BABYLON.Nullable<string>) => void;
        /**
         * id of this renderer
         */
        id: string;
        /**
         * optional list of custom components to be rendered inside nodes of
         * a certain type
         */
        customComponents?: Record<string, React.ComponentType<any>>;
    }
    /**
     * This component is a bridge between the app logic related to the graph, and the actual rendering
     * of it. It manages the nodes' positions and selection states.
     * @param props
     * @returns
     */
    export const NodeRenderer: (props: INodeRendererProps) => import("react/jsx-runtime").JSX.Element;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IGraphContainerProps {
        onNodeMoved: (id: string, x: number, y: number) => void;
        id: string;
    }
    /**
     * This component contains all the nodes and handles their dragging
     * @param props properties
     * @returns graph node container element
     */
    export var GraphNodesContainer: React.FC<IGraphContainerProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IGraphNodeProps {
        id: string;
        name: string;
        x: number;
        y: number;
        selected?: boolean;
        width?: number;
        height?: number;
        highlighted?: boolean;
        parentContainerId: string;
    }
    export var SingleGraphNode: React.FC<IGraphNodeProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * props for the GraphLineContainer
     */
    export interface IGraphLinesContainerProps {
        /**
         * id of the container
         */
        id: string;
    }
    /**
     * this component handles the dragging of new connections
     * @param props
     * @returns
     */
    export var GraphLinesContainer: React.FC<IGraphLinesContainerProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * props for the GraphLine component
     */
    export interface IGraphLineProps {
        /**
         * id of the line. temporary lines can have no id
         */
        id?: string;
        /**
         * starting x pos of the line
         */
        x1: number;
        /**
         * ending x pos of the line
         */
        x2: number;
        /**
         * starting y pos of the line
         */
        y1: number;
        /**
         * ending y pos of the line
         */
        y2: number;
        /**
         * is the line selected
         */
        selected?: boolean;
        /**
         * does the line have a direction
         */
        directional?: boolean;
    }
    export const MarkerArrowId = "arrow";
    /**
     * This component draws a SVG line between two points, with an optional marker
     * indicating direction
     * @param props properties
     * @returns graph line element
     */
    export var GraphLine: React.FC<IGraphLineProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * this context is used to pass callbacks to the graph nodes and connections
     */
    export interface IGraphContext {
        onNodesConnected?: (sourceId: string, targetId: string) => void;
        onLineSelected?: (lineId: string) => void;
        onNodeSelected?: (nodeId: string) => void;
    }
    export var GraphContextManager: import("react").Context<IGraphContext>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IGraphContainerProps {
    }
    /**
     * This component is just a simple container to keep the nodes and lines containers
     * together
     * @param props
     * @returns
     */
    export var GraphContainer: React.FC<IGraphContainerProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Props for the connector
     */
    export interface IGraphConnectorHandlerProps {
        /**
         * id of the parent node
         */
        parentId: string;
        /**
         * x position of the parent node
         */
        parentX: number;
        /**
         * y position of the parent node
         */
        parentY: number;
        /**
         * x position of the connector relative to the parent node
         */
        offsetX?: number;
        /**
         * y position of the connector relative to the parent node
         */
        offsetY?: number;
        /**
         * width of the parent node
         */
        parentWidth: number;
        /**
         * height of the parent node
         */
        parentHeight: number;
        /**
         * id of the container where its parent node is
         */
        parentContainerId: string;
    }
    /**
     * This component is used to initiate a connection between two nodes. Simply
     * drag the handle in a node and drop it in another node to create a connection.
     * @returns connector element
     */
    export var GraphConnectorHandler: React.FC<IGraphConnectorHandlerProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * This components represents an options menu with optional
     * customizable properties. Option IDs should be unique.
     */
    export interface IOption {
        label: string;
        value: string;
        id: string;
    }
    export interface IOptionsLineComponentProps {
        options: IOption[];
        addOptionPlaceholder?: string;
        onOptionAdded?: (newOption: IOption) => void;
        onOptionSelected: (selectedOptionValue: string) => void;
        selectedOptionValue: string;
        validateNewOptionValue?: (newOptionValue: string) => boolean;
        addOptionText?: string;
    }
    export const OptionsLineComponent: (props: IOptionsLineComponentProps) => import("react/jsx-runtime").JSX.Element;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface INumericInputComponentProps {
        label: string;
        labelTooltip?: string;
        value: number;
        step?: number;
        onChange: (value: number) => void;
        precision?: number;
        icon?: string;
        iconLabel?: string;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
    }
    export class NumericInputComponent extends React.Component<INumericInputComponentProps, {
        value: string;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: INumericInputComponentProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: INumericInputComponentProps, nextState: {
            value: string;
        }): boolean;
        updateValue(valueString: string): void;
        onBlur(): void;
        incrementValue(amount: number): void;
        onKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IFileButtonLineComponentProps {
        label: string;
        onClick: (file: File) => void;
        accept: string;
        icon?: string;
        iconLabel?: string;
    }
    export class FileButtonLineComponent extends React.Component<IFileButtonLineComponentProps> {
        private static _IDGenerator;
        private _id;
        private _uploadInputRef;
        constructor(props: IFileButtonLineComponentProps);
        onChange(evt: any): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IColorPickerLineComponentProps {
        value: BABYLON.Color4 | BABYLON.Color3;
        linearHint?: boolean;
        onColorChanged: (newOne: string) => void;
        icon?: string;
        iconLabel?: string;
        shouldPopRight?: boolean;
        lockObject?: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        backgroundColor?: string;
    }
    interface IColorPickerComponentState {
        pickerEnabled: boolean;
        color: BABYLON.Color3 | BABYLON.Color4;
        hex: string;
    }
    export class ColorPickerLineComponent extends React.Component<IColorPickerLineComponentProps, IColorPickerComponentState> {
        private _floatRef;
        private _floatHostRef;
        private _coverRef;
        constructor(props: IColorPickerLineComponentProps);
        syncPositions(): void;
        shouldComponentUpdate(nextProps: IColorPickerLineComponentProps, nextState: IColorPickerComponentState): boolean;
        getHexString(props?: Readonly<IColorPickerLineComponentProps> & Readonly<{
            children?: React.ReactNode | undefined;
        }>): string;
        componentDidUpdate(): void;
        componentDidMount(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IColorLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        onPropertyChangedObservable: BABYLON.Observable<BABYLON.NodeRenderGraphEditor.SharedUIComponents.PropertyChangedEvent>;
        onChange?: () => void;
        isLinear?: boolean;
        icon?: string;
        iconLabel?: string;
        disableAlpha?: boolean;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
    }
    interface IColorLineComponentState {
        isExpanded: boolean;
        color: BABYLON.Color4;
    }
    export class ColorLineComponent extends React.Component<IColorLineComponentProps, IColorLineComponentState> {
        constructor(props: IColorLineComponentProps);
        shouldComponentUpdate(nextProps: IColorLineComponentProps, nextState: IColorLineComponentState): boolean;
        getValue(props?: Readonly<IColorLineComponentProps> & Readonly<{
            children?: React.ReactNode | undefined;
        }>): BABYLON.Color4;
        setColorFromString(colorString: string): void;
        setColor(newColor: BABYLON.Color4): void;
        switchExpandState(): void;
        updateStateR(value: number): void;
        updateStateG(value: number): void;
        updateStateB(value: number): void;
        updateStateA(value: number): void;
        copyToClipboard(): void;
        private _convertToColor;
        private _toColor3;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Given a column and row number in the layout, return the corresponding column/row
     * @param layout
     * @param column
     * @param row
     * @returns
     */
    export const getPosInLayout: (layout: BABYLON.NodeRenderGraphEditor.SharedUIComponents.Layout, column: number, row?: number) => BABYLON.NodeRenderGraphEditor.SharedUIComponents.LayoutColumn | BABYLON.NodeRenderGraphEditor.SharedUIComponents.LayoutTabsRow;
    /**
     * Remove a row in position row, column from the layout, and redistribute heights of remaining rows
     * @param layout
     * @param column
     * @param row
     */
    export const removeLayoutRowAndRedistributePercentages: (layout: BABYLON.NodeRenderGraphEditor.SharedUIComponents.Layout, column: number, row: number) => void;
    /**
     * Add a percentage string to a number
     * @param p1 the percentage string
     * @param p2 the number
     * @returns the sum of the percentage string and the number
     */
    export const addPercentageStringToNumber: (p1: string, p2: number) => number;
    /**
     * Parses a percentage string into a number
     * @param p the percentage string
     * @returns the parsed number
     */
    export const parsePercentage: (p: string) => number;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export type LayoutTab = {
        /**
         * Tab id
         */
        id: string;
        /**
         * React component rendered by tab
         */
        component: React.ReactElement;
        /**
         * Tab title
         */
        title: string;
    };
    export type LayoutTabsRow = {
        /**
         * row id
         */
        id: string;
        /**
         * row height in its containing column
         */
        height: string;
        /**
         * selected tab in row
         */
        selectedTab: string;
        /**
         * list of tabs contained in row
         */
        tabs: LayoutTab[];
    };
    export type LayoutColumn = {
        /**
         * column id
         */
        id: string;
        /**
         * column width in the grid
         */
        width: string;
        /**
         * column rows
         */
        rows: LayoutTabsRow[];
    };
    export type Layout = {
        /**
         * layout columns
         */
        columns?: LayoutColumn[];
    };
    export type TabDrag = {
        /**
         * row number of the tab being dragged
         */
        rowNumber: number;
        /**
         * column number of the tab being dragged
         */
        columnNumber: number;
        /**
         * the tabs being dragged
         */
        tabs: {
            /**
             * id of tab being dragged
             */
            id: string;
        }[];
    };
    export enum ElementTypes {
        RESIZE_BAR = "0",
        TAB = "1",
        TAB_GROUP = "2",
        NONE = "2"
    }
    export enum ResizeDirections {
        ROW = "row",
        COLUMN = "column"
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export var LayoutContext: import("react").Context<{
        /**
         * The layout object
         */
        layout: BABYLON.NodeRenderGraphEditor.SharedUIComponents.Layout;
        /**
         * Function to set the layout object in the context
         */
        setLayout: (layout: BABYLON.NodeRenderGraphEditor.SharedUIComponents.Layout) => void;
    }>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Arguments for the TabsContainer component.
     */
    export interface IFlexibleTabsContainerProps {
        /**
         * The tabs to display
         */
        tabs: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LayoutTab[];
        /**
         * Row index of component in layout
         */
        rowIndex: number;
        /**
         * Column index of component in layout
         */
        columnIndex: number;
        /**
         * Which tab is selected in the layout
         */
        selectedTab?: string;
    }
    /**
     * This component contains a set of tabs of which only one is visible at a time.
     * The tabs can also be dragged from and to different containers.
     * @param props properties
     * @returns tabs container element
     */
    export var FlexibleTabsContainer: React.FC<IFlexibleTabsContainerProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Arguments for the FlexibleTab component.
     */
    export interface IFlexibleTabProps {
        /**
         * The tab's title.
         */
        title: string;
        /**
         * If the tab is currently selected or not
         */
        selected: boolean;
        /**
         * What happens when the user clicks on the tab
         */
        onClick: () => void;
        /**
         * The object that will be sent to the drag event
         */
        item: BABYLON.NodeRenderGraphEditor.SharedUIComponents.TabDrag;
        /**
         * What happens when the user drops another tab after this one
         */
        onTabDroppedAction: (item: BABYLON.NodeRenderGraphEditor.SharedUIComponents.TabDrag) => void;
    }
    /**
     * A component that renders a tab that the user can click
     * to activate or drag to reorder. It also listens for
     * drop events if the user wants to drop another tab
     * after it.
     * @param props properties
     * @returns FlexibleTab element
     */
    export var FlexibleTab: React.FC<IFlexibleTabProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Arguments for the ResizeBar component.
     */
    export interface IFlexibleRowResizerProps {
        /**
         * Row number of the component that is being resized
         */
        rowNumber: number;
        /**
         * Column number of the component being resized
         */
        columnNumber: number;
        /**
         * If the resizing happens in row or column direction
         */
        direction: BABYLON.NodeRenderGraphEditor.SharedUIComponents.ResizeDirections;
    }
    /**
     * The item that will be sent to the drag event
     */
    export type ResizeItem = {
        /**
         * If the resizing happens in row or column direction
         */
        direction: BABYLON.NodeRenderGraphEditor.SharedUIComponents.ResizeDirections;
        /**
         * The row number of the component that is being resized
         */
        rowNumber: number;
        /**
         * the column number of the component being resized
         */
        columnNumber: number;
    };
    /**
     * A component that renders a bar that the user can drag to resize.
     * @param props properties
     * @returns resize bar element
     */
    export var FlexibleResizeBar: React.FC<IFlexibleRowResizerProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Arguments for the BABYLON.NodeRenderGraphEditor.SharedUIComponents.Layout component.
     */
    export interface IFlexibleGridLayoutProps {
        /**
         * A definition of the layout which can be changed by the user
         */
        layoutDefinition: BABYLON.NodeRenderGraphEditor.SharedUIComponents.Layout;
    }
    /**
     * This component represents a grid layout that can be resized and rearranged
     * by the user.
     * @param props properties
     * @returns layout element
     */
    export var FlexibleGridLayout: React.FC<IFlexibleGridLayoutProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Arguments for the GridContainer component.
     */
    export interface IFlexibleGridContainerProps {
    }
    /**
     * Component responsible for mapping the layout to the actual components
     * @returns GridContainer element
     */
    export var FlexibleGridContainer: React.FC<IFlexibleGridContainerProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Arguments for the FlexibleDropZone component.
     */
    export interface IFlexibleDropZoneProps {
        /**
         * The row number of the component in the layout
         */
        rowNumber: number;
        /**
         * The column number of the component in the layout
         */
        columnNumber: number;
    }
    /**
     * This component contains the drag and drop zone for the resize bars that
     * allow redefining width and height of layout elements
     * @param props properties
     * @returns drop zone element
     */
    export var FlexibleDropZone: React.FC<IFlexibleDropZoneProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Arguments for the DragHandler component.
     */
    export interface IFlexibleDragHandlerProps {
        /**
         * The size of the containing element. Used to calculate the percentage of
         * space occupied by the component
         */
        containerSize: {
            width: number;
            height: number;
        };
    }
    /**
     * This component receives the drop events and updates the layout accordingly
     * @param props properties
     * @returns DragHandler element
     */
    export var FlexibleDragHandler: React.FC<IFlexibleDragHandlerProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Arguments for the Column component.
     */
    export interface IFlexibleColumnProps {
        /**
         * Width of column
         */
        width: string;
    }
    /**
     * This component represents a single column in the layout. It receives a width
     * that it occupies and the content to display
     * @param props
     * @returns
     */
    export var FlexibleColumn: React.FC<IFlexibleColumnProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Arguments for the DraggableIcon component.
     */
    export interface IDraggableIconProps {
        /**
         * Icon source
         */
        src: string;
        /**
         * Object that will be passed to the drag event
         */
        item: BABYLON.NodeRenderGraphEditor.SharedUIComponents.TabDrag;
        /**
         * Type of drag event
         */
        type: BABYLON.NodeRenderGraphEditor.SharedUIComponents.ElementTypes;
    }
    /**
     * An icon that can be dragged by the user
     * @param props properties
     * @returns draggable icon element
     */
    export var DraggableIcon: React.FC<IDraggableIconProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IHexColorProps {
        value: string;
        expectedLength: number;
        onChange: (value: string) => void;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
    }
    export class HexColorComponent extends React.Component<IHexColorProps, {
        hex: string;
    }> {
        constructor(props: IHexColorProps);
        shouldComponentUpdate(nextProps: IHexColorProps, nextState: {
            hex: string;
        }): boolean;
        lock(): void;
        unlock(): void;
        updateHexValue(valueString: string): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Interface used to specify creation options for color picker
     */
    export interface IColorPickerComponentProps {
        color: BABYLON.Color3 | BABYLON.Color4;
        linearhint?: boolean;
        debugMode?: boolean;
        onColorChanged?: (color: BABYLON.Color3 | BABYLON.Color4) => void;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
        backgroundColor?: string;
    }
    /**
     * Interface used to specify creation options for color picker
     */
    export interface IColorPickerState {
        color: BABYLON.Color3;
        alpha: number;
    }
    /**
     * Class used to create a color picker
     */
    export class ColorPickerComponent extends React.Component<IColorPickerComponentProps, IColorPickerState> {
        private _saturationRef;
        private _hueRef;
        private _isSaturationPointerDown;
        private _isHuePointerDown;
        constructor(props: IColorPickerComponentProps);
        shouldComponentUpdate(nextProps: IColorPickerComponentProps, nextState: IColorPickerState): boolean;
        onSaturationPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
        onSaturationPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
        onSaturationPointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
        private _evaluateSaturation;
        private _evaluateHue;
        componentDidUpdate(): void;
        raiseOnColorChanged(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IColorComponentEntryProps {
        value: number;
        label: string;
        max?: number;
        min?: number;
        onChange: (value: number) => void;
        disabled?: boolean;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
    }
    export class ColorComponentComponentEntry extends React.Component<IColorComponentEntryProps> {
        constructor(props: IColorComponentEntryProps);
        updateValue(valueString: string): void;
        lock(): void;
        unlock(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        interface ICommandDropdownComponentProps {
        icon?: string;
        tooltip: string;
        defaultValue?: string;
        items: {
            label: string;
            icon?: string;
            fileButton?: boolean;
            onClick?: () => void;
            onCheck?: (value: boolean) => void;
            storeKey?: string;
            isActive?: boolean;
            defaultValue?: boolean | string;
            subItems?: string[];
        }[];
        toRight?: boolean;
    }
    export class CommandDropdownComponent extends React.Component<ICommandDropdownComponentProps, {
        isExpanded: boolean;
        activeState: string;
    }> {
        constructor(props: ICommandDropdownComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface ICommandButtonComponentProps {
        tooltip: string;
        shortcut?: string;
        icon: string;
        iconLabel?: string;
        isActive: boolean;
        onClick: () => void;
        disabled?: boolean;
    }
    export var CommandButtonComponent: React.FC<ICommandButtonComponentProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface ICommandBarComponentProps {
        onSaveButtonClicked?: () => void;
        onSaveToSnippetButtonClicked?: () => void;
        onLoadFromSnippetButtonClicked?: () => void;
        onHelpButtonClicked?: () => void;
        onGiveFeedbackButtonClicked?: () => void;
        onSelectButtonClicked?: () => void;
        onPanButtonClicked?: () => void;
        onZoomButtonClicked?: () => void;
        onFitButtonClicked?: () => void;
        onArtboardColorChanged?: (newColor: string) => void;
        artboardColor?: string;
        artboardColorPickerColor?: string;
    }
    export var CommandBarComponent: React.FC<ICommandBarComponentProps>;



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IHexColorProps {
        value: string;
        expectedLength: number;
        onChange: (value: string) => void;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
    }
    export class HexColor extends React.Component<IHexColorProps, {
        hex: string;
    }> {
        constructor(props: IHexColorProps);
        shouldComponentUpdate(nextProps: IHexColorProps, nextState: {
            hex: string;
        }): boolean;
        lock(): void;
        unlock(): void;
        updateHexValue(valueString: string): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        /**
     * Interface used to specify creation options for color picker
     */
    export interface IColorPickerProps {
        color: BABYLON.Color3 | BABYLON.Color4;
        linearhint?: boolean;
        debugMode?: boolean;
        onColorChanged?: (color: BABYLON.Color3 | BABYLON.Color4) => void;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
    }
    /**
     * Interface used to specify creation options for color picker
     */
    export interface IColorPickerState {
        color: BABYLON.Color3;
        alpha: number;
    }
    /**
     * Class used to create a color picker
     */
    export class ColorPicker extends React.Component<IColorPickerProps, IColorPickerState> {
        private _saturationRef;
        private _hueRef;
        private _isSaturationPointerDown;
        private _isHuePointerDown;
        constructor(props: IColorPickerProps);
        shouldComponentUpdate(nextProps: IColorPickerProps, nextState: IColorPickerState): boolean;
        onSaturationPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
        onSaturationPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
        onSaturationPointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
        private _evaluateSaturation;
        private _evaluateHue;
        componentDidUpdate(): void;
        raiseOnColorChanged(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}
declare module BABYLON.NodeRenderGraphEditor.SharedUIComponents {
        export interface IColorComponentEntryProps {
        value: number;
        label: string;
        max?: number;
        min?: number;
        onChange: (value: number) => void;
        disabled?: boolean;
        lockObject: BABYLON.NodeRenderGraphEditor.SharedUIComponents.LockObject;
    }
    export class ColorComponentEntry extends React.Component<IColorComponentEntryProps> {
        constructor(props: IColorComponentEntryProps);
        updateValue(valueString: string): void;
        lock(): void;
        unlock(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.NodeRenderGraphEditor {


}


                