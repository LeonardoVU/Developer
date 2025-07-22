var s_c = {
    i: String.fromCharCode(237),
    o: String.fromCharCode(243),
    n: String.fromCharCode(241),
    a: String.fromCharCode(225),
    e: String.fromCharCode(233),
    u: String.fromCharCode(250),
};

var mn =
{
    1: {
        0: { ttl: "Start_Inicio_Click" },
        1: {
            0: { ttl: "English" },
            1: {
                0: { ttl: "Products_and_Services" },
                1: {
                    0: { ttl: "General" },
                    1: "Engineering\nDesign\nData",
                    2: "Project\nEngineering\nPlan",
                    3: "Project\nEquipment\nList",
                    4: "Engineering\nDocument\nRegister"
                },
                2: {
                    0: { ttl: "Process" },
                    1: "Process\ndescription\nand\noperating\nphilosophy",
                    2: "General\nspecification\nfor valves",
                    3: "Process\nEquipment\nlist",
                    4: "Heat and\nmaterial\nbalance",
                    5: "Utility\nconsumption\nlist",
                    6: "Equipment\nprocess\ndata sheets",
                    7: "Piping and\nInstrumentation\nDiagrams\n(P&IDs)",
                    8: "Cause and\neffect\ndiagrams",
                    9: "Emergency\nshutdown\nblock\ndiagram",
                    10: "ESD logic\ndiagrams",
                    11: "Flare\nReport",
                    12: "Process\nfluids\nlist",
                    13: "Calculations\nnotes",
                    14: "Operating\nmanual"

                },
                3: {
                    0: { ttl: "Equipment" },
                    1: "General\nspecification\nper\nequipment\ntype",
                    2: "Pressure\nVessels\nDesign\nSpecification",
                    3: "Equipment\nsupply\nspecification",
                    4: "Mechanical\ndata\nsheet",
                    5: "Heat\nexchanger\ncalculation\nsheet",
                    6: "Vessel\nguide\ndrawing",
                    7: "Material\nrequisition",
                    8: "Technical\nbid\nevaluation"
                },
                4: {
                    0: { ttl: "HSE" },
                },
                5: {
                    0: { ttl: "Civil" },
                    1: "Design\nspecification\n/ Basis of\ndesign",
                    2: "Grading\nplan",
                    3: "Foundation\ncalculation\nnote",
                    4: "Foundation\ndrawing:\nReinforcement",
                    5: "Foundation\ndrawing:\nFormwork",
                    6: "Civil works\nspecifications",
                    7: "Standard\ndrawings",
                    8: "Drainage\ncalculation\nnote",
                    9: "General\nUnderground\nNetworks\ndrawing",
                    10: "Civil\nworks\ninstallation\ndrawings",
                    11: "Architectural\ndrawings",
                    12: "Building\ndetail\ndrawings",
                    13: "Steel\nStructure\nCalculation\nnote",
                    14: "Steel\nstructure\ndesign\ndrawings",
                    15: "Civil\nMaterial\nTake-Off\n(MTO)",
                    16: "Steel\nstructure\nstandard\ndrawings"
                },
                6: {
                    0: { ttl: "Plant_Layout" },
                    1: "Plant Layout\nDesign\nspecification\n/ Plant layout\nguidelines",
                    2: "General\nPlot Plan\ndrawing",
                    3: "Key plan",
                    4: "Unit\nPlot Plan\ndrawing"
                },
                7: {
                    0: { ttl: "Piping_Design" },
                    1: "Piping\nDesign\nBasis",
                    2: "Line\ndiagrams",
                    3: "Piping\nlayout\ndrawings",
                    4: "Piping\ngeneral\narrangement\ndrawings",
                    5: "Piping\nisometric\ndrawings",
                    6: "Line\nlist",
                    7: "Piping\nMaterial\nTake-Off"
                },
                8: {
                    0: { ttl: "Piping_Material" },
                    1: "General\npiping\nspecification",
                    2: "General\nspecification\nfor\nvalves",
                    3: "Piping\nmaterial\nclasses\nspecifications",
                    4: "Job\nSpecifications\nfor\nSupply",
                    5: "Piping\nMaterial\nRequisition"
                },
                9: {
                    0: { ttl: "Piping_Stress_Analysis" },
                    1: "Piping\nflexibility\nand stress\nanalysis\ncriteria",
                    2: "Piping\nstress\nanalysis\nCalculation\nnote",
                    3: "Pipe\nsupport\nbooklet",
                    4: "Job\nSpecifications\nfor\nSupply",
                    5: "Pipe\nsupport\ndrawings"
                },
                10: {
                    0: { ttl: "Material_and_Corrosion" },
                    1: "Corrosion\ncontrol and\nmaterial\nselection\nreport",
                    2: "Material\nselection\ndiagrams",
                    3: "Cathodic\nprotection\nsystem\ndesign\nspecification",
                    4: "Painting\nspecification",
                    5: "Insulation\nspecification",
                    6: "Insulation\nmaterial\ntake-off"
                },
                11: {
                    0: { ttl: "Instruments_and_Control" },
                    1: "System\nDesiqn\nSpecification\n/Desiqn basis\n/Philosophy",
                    2: "System\narchitecture\ndrawing",
                    3: "Instrument\nfunctional\ndiagram",
                    4: "Control\nnarrative",
                    5: "Mimic\ndisplay\ndrawings",
                    6: "Safety\nIntegrity\nLevel (SIL)\nreview",
                    7: "Instrument\nindex",
                    8: "Instrument\ndata\nsheets",
                    9: "Level\nsketches",
                    10: "Main cable\nroutings and\nJunction Box\n(JB) location\ndrawings",
                    11: "Instrument\nlocation &\nsecondary\ncable routing\ndrawings",
                    12: "Cable\nrouting\ndrawings",
                    13: "Cable\ncross\nsection\ndrawings",
                    14: "Cable\nlist",
                    15: "Instrument\nbulk material\ntake-off",
                    16: "Junction\nbox\nwiring",
                    17: "Typical\ninstallation\ndrawings",
                    18: "Equipment\nlayout\ndrawings",
                    19: "Telecom.\nsystems\ndesign\nspecification",
                    20: "Telecom.\nequipment\nlayout\ndrawing",
                    21: "Instrument\nloop\ndiagrams"
                },
                12: {
                    0: { ttl: "Electricity" },
                    1: "Electrical\ndesign\nspecification",
                    2: "Electrical\nconsumer\nlist",
                    3: "Electrical\nload\nsummary",
                    4: "General\none line\ndiagram",
                    5: "Equipment\ndata\nsheet",
                    6: "General\nequipment\nspecification",
                    7: "Equipment\nrequisition",
                    8: "Switchgear\nsingle line\ndiagram",
                    9: "Switchgear\ntypical\ndiagram",
                    10: "Architecture\ndrawing",
                    11: "Equipment\nlayout\ndrawings",
                    12: "Lighting\nlayout\ndrawings",
                    13: "Cable\nrouting\ndrawings",
                    14: "Cable list",
                    15: "Typical\ninstallation\ndrawings",
                    16: "Electrical bulk\nMaterial\nTake-Off\n(MTO)",
                    17: "Block\ndiagrams",
                    18: "Trouble\nshooting\ndiagrams",
                    19: "Electrical\ncalculations"
                }
            },
            2: {
                0: { ttl: "Experience" },
                1: {
                    0: { ttl: "Mining" },
                    1: "Under\nConstruction"
                },
                2: {
                    0: { ttl: "Oil_and_Gas" },
                    1: "Under\nConstruction"
                },
                3: {
                    0: { ttl: "Power_Generation" },
                    1: {
                        0: { ttl: "Up to 100 MW" },
                        1: {
                            0: { ttl: "Grid Back Up" },
                            1: {
                                0: { ttl: "Open Cycle_50 MW" },
                                1: "Location:\nZulia\nState,\nVenezuela",
                                2: "Company:\nPENTECH",
                                3: "Date:\n2011-2012",
                                4: "Role:\nPiping\nDesign\nLeader",
                                5: "Scope:\nBOP\nDesign",
                                6: "Qty:\n3 Units\nGE LM2500\n25 MW eu"
                            }
                        }
                    },
                    2: {
                        0: { ttl: "More than_100 MW" },
                        1: {
                            0: { ttl: "New Plants" },
                            1: {
                                0: { ttl: "Open Cycle_150 MW" },
                                1: "Location:\nCasanare\nDepartment,\nColombia",
                                2: "Company:\nSINCO-\nSOLUCIONES\nDE I&C",
                                3: "Date:\n2019-2020",
                                4: "Role:\nCivil\nDesigner\nx1",
                                5: "Scope:\nCivil\nDesign",
                                6: "Qty:\n3 Units\nGE LM6000\n50 MW eu"
                            },
                            2: {
                                0: { ttl: "Closed Cycle_250 MW" },
                                1: "Location:\nBuenos Aires\nProvince,\nArgentina",
                                2: "Company:\nBarker\nThermoelectric",
                                3: "Date:\n2018-2019",
                                4: "Roles:\nSite Civil\nEngineer\nx1",
                                5: "Scope:\nSite Design\nModifications",
                                6: "Qty:\n4 Units\nGE LM6000\n50 MW eu"

                            },
                            3: {
                                0: { ttl: "Closed Cycle_450 MW" },
                                1: "Location:\nZulia\nState,\nVenezuela",
                                2: "Company:\nJANTESA",
                                3: "Date:\n2009-2010",
                                4: "Roles:\nPiping\nDesign\nx3",
                                5: "Roles:\nElectrical\nDesign\nx1",
                                7: "Scope:\nBOP,\nElectrical\nDesign",
                                8: "Qty:\n2 Units\nSGT6-5000F\n150 MW eu"
                            }

                        }
                    },


                }
            },
            3: {
                0: { ttl: "Contact" },
                Email: "email:\nljv004ar@\ngmail.com",
                Phone: "Phone:\n+541160423223"
            }

        },
        2: {
            0: { ttl: "Spanish" },
            1: {
                0: { ttl: "Productos_y_Servicios" },
                1: {
                    0: { ttl: "General" },
                    1: "Levantamiento\n(Relevamiento)\nde Informaci" + s_c.o + "n\nde Ingenier" + s_c.i + "a",
                    2: "Planificaci" + s_c.o + "n\nde Proyectos\nde Ingenier" + s_c.i + "a",
                    3: "Lista de\nEquipos de\nProyectos",
                    4: "Registro de\nDocumentos\nde Ingenier" + s_c.i + "a"
                },
                2: {
                    0: { ttl: "Procesos" },
                    1: "Descripci" + s_c.o + "n\nde Procesos y\nFilosof" + s_c.i + "a\nde Operaci" + s_c.o + "n",
                    2: "Especificaciones\ngenerales\npara\nv" + s_c.a + "lvulas",
                    3: "Lista de\nEquipos de\nProcesos",
                    4: "Balances\nde Energia\ny Materia",
                    5: "Lista de\nSistemas de\nServicios",
                    6: "Hojas de\nDatos de\nEquipos de\nProcesos",
                    7: "Diagramas\nde Tuber" + s_c.i + "as\n(Ca" + s_c.n + "er" + s_c.i + "as) e\nInstrumentaci" + s_c.o + "n\n(P&IDs)",
                    8: "Diagramas\nde Causa\ny Efecto",
                    9: "Diagramas\nde Bloque de\nParo de\nEmergencia",
                    10: "Diagranas\nde L" + s_c.o + "gica\nESD",
                    11: "Reporte\nde Flare",
                    12: "Lista de\nFluidos de\nProcesos",
                    13: "Notas de\nC" + s_c.a + "lculo",
                    14: "Manuales de\nOperaci" + s_c.o + "n"

                },
                3: {
                    0: { ttl: "Equipos" },
                    1: "Especificaciones\nGenerales\npor tipo\nde Equipo",
                    2: "Especificaci" + s_c.o + "n\nde Dise" + s_c.n + "o\nde Recipientes\na Presi" + s_c.o + "n",
                    3: "Especifiaci" + s_c.o + "n\nde Suministro\nde Equipos",
                    4: "Hojas de\nDatos de\nEquipos\nMec" + s_c.a + "nicos",
                    5: "Hoja de\nC" + s_c.a + "lculos de\nIntercambiadores\nde Calor",
                    6: "Planos\nGu" + s_c.i + "a de\nRecipientes",
                    7: "Requisiones\nde\nMateriales",
                    8: "Evaluaci" + s_c.o + "n\nT" + s_c.e + "cnica de\nOfertas"
                },
                4: {
                    0: { ttl: "SHA" },
                },
                5: {
                    0: { ttl: "Civil" },
                    1: "Especificaciones\n/ Bases de\nDise" + s_c.n + "o",
                    2: "Planos de\nRelleno, Corte\ny Nivelaci" + s_c.o + "n",
                    3: "Notas de\nC" + s_c.a + "lculo de\nFundaciones",
                    4: "Planos de\nFundaciones:\nRefuerzos",
                    5: "Planos de\nFundaciones:\nEncofrado",
                    6: "Especificaciones\nde trabajos\nCiviles",
                    7: "Planos\nEstandar",
                    8: "Notas de\nC" + s_c.a + "lculo de\nDrenajes",
                    9: "Planos\nGenerales\nde Redes\nSubterraneas",
                    10: "Planos de\nInstalaci" + s_c.o + "n\nde Trabajos\nCiviles",
                    11: "Planos de\nArquitectura",
                    12: "Planos de\nDetalles de\nEdificaciones",
                    13: "Notas de\nC" + s_c.a + "lculo de\nEstructuras\nde Acero",
                    14: "Planos de\nDise" + s_c.n + "o de\nEstructuras\nde Acero",
                    15: "Cuantificaci" + s_c.o + "n\nde Materiales\nCiviles (MTO)",
                    16: "Planos\nEstandar de\nEstructuras\nde Acero"
                },
                6: {
                    0: { ttl: "Arreglo_de_Planta" },
                    1: "Especificaci" + s_c.o + "n\nde Dise" + s_c.n + "o/\nLineamientos de\nDisposici" + s_c.o + "n de\nPlanta",
                    2: "Plano\nGeneral de\nDisposici" + s_c.o + "n\nde Planta",
                    3: "Plano\nLlave",
                    4: "Plano de\nDisposici" + s_c.o + "n\npor\nUnidad"
                },
                7: {
                    0: { ttl: "Dise" + s_c.n + "o de\nTuber" + s_c.i + "as_(Ca" + s_c.n + "er" + s_c.i + "as)" },
                    1: "Bases de\nDise" + s_c.n + "o de\nTuber" + s_c.i + "as\n(Ca" + s_c.n + "er" + s_c.i + "as)",
                    2: "Diagramas\nde L" + s_c.i + "nea",
                    3: "Planos de\nDisposici" + s_c.o + "n de\nTuber" + s_c.i + "as\n(Ca" + s_c.n + "er" + s_c.i + "as)",
                    4: "Planos de\narreglos\ngenerales de\nTuber" + s_c.i + "as\n(Ca" + s_c.n + "er" + s_c.i + "as)",
                    5: "Planos\nIsom" + s_c.e + "tricos de\nTuber" + s_c.i + "as\n(Ca" + s_c.n + "er" + s_c.i + "as)",
                    6: "Lista de\nL" + s_c.i + "neas",
                    7: "Cuantificaci" + s_c.o + "n\nde Materiales de\nTuber" + s_c.i + "as\n(Ca" + s_c.n + "er" + s_c.i + "as)"
                },
                8: {
                    0: { ttl: "Materiales_de_Tuber" + s_c.i + "as_(Ca" + s_c.n + "er" + s_c.i + "as)" },
                    1: "Especificaci" + s_c.o + "n\nGeneral de\nTuber" + s_c.i + "as\n(Ca" + s_c.n + "er" + s_c.i + "as)",
                    2: "Especificaci" + s_c.o + "n\nGeneral de\nV" + s_c.a + "lvulas",
                    3: "Especificaciones\nde Clases de\nMaterial de\nTuber" + s_c.i + "as\n(Ca" + s_c.n + "er" + s_c.i + "as)",
                    4: "Especificaciones\nde Trabajo para\nsuministro",
                    5: "Requisici" + s_c.o + "n de\nMateriales de\nTuber" + s_c.i + "as\n(Ca" + s_c.n + "er" + s_c.i + "as)"
                },
                9: {
                    0: { ttl: "An" + s_c.a + "lisis de\nEsfuerzos en\nTuber" + s_c.i + "as\n(Ca" + s_c.n + "er" + s_c.i + "as)" },
                    1: "Criterios de\nFlexibilidad y\nEsfuerzos en\nTuber" + s_c.i + "as\n(Ca" + s_c.n + "er" + s_c.i + "as)",
                    2: "Notas de\nC" + s_c.a + "lculo de\nan" + s_c.a + "lisis de\nEsfuerzos en\nTuber" + s_c.i + "as\n(Ca" + s_c.n + "er" + s_c.i + "as)",
                    3: "Cuaderno de\nsoportes de\nTuber" + s_c.i + "as\n(Ca" + s_c.n + "er" + s_c.i + "as)",
                    4: "Especificaciones\nde Trabajo para\nsuministro",
                    5: "Planos de\nsoportes de\nTuber" + s_c.i + "as\n(Ca" + s_c.n + "er" + s_c.i + "as)"
                },
                10: {
                    0: { ttl: "Materiales_y_Corrosión" },
                    1: "Reporte de\nControl de\nCorrosi" + s_c.o + "n y\nselecci" + s_c.o + "n de\nmateriales",
                    2: "Diagramas de\nselecci" + s_c.o + "n de\nMateriales",
                    3: "Especificaci" + s_c.o + "n\nde dise" + s_c.n + "o\nde Sistemas\nde Protecci" + s_c.o + "n\nCat" + s_c.o + "dica",
                    4: "Especificaci" + s_c.o + "n\nde Sistemas\nde Pintura y\nProtecci" + s_c.o + "n\nMec" + s_c.a + "nica",
                    5: "Especificaci" + s_c.o + "n\nde Aislamiento\nT" + s_c.e + "rmico",
                    6: "Cuantificaci" + s_c.o + "n\nde materiales\nde aislamiento"
                },
                11: {
                    0: { ttl: "Instrumentos_y_Control" },
                    1: "Especificaci" + s_c.o + "n\nde Dise" + s_c.n + "o /\nBases de\nDise" + s_c.n + "o /\nFilosof" + s_c.i + "a\ndel Sistema",
                    2: "Planos de\nArquitectura\ndel Sistema",
                    3: "Diagrama\nfuncional de\nInstrumentos",
                    4: "Narrativa\nde Control",
                    5: "Planos de\ndespliegue\nde Mimicos",
                    6: "Revisi" + s_c.o + "n\nNivel de\nIntegridad\nde Seguridad\n(SIL)",
                    7: "Indice de\nInsrtumentos",
                    8: "Hojas de\nDatos de\nInstrumentos",
                    9: "Bosquejos\nde Nivel",
                    10: "Planos de\nrutas de cables\nprincipales y\nubicaci" + s_c.o + "n de\nCajas de\nConexi" + s_c.o + "n (JB)",
                    11: "Planos de\nubicaci" + s_c.o + "n de\nInstrumentos y\nruta de cables\nsecundarios",
                    12: "Planos de\nrutas de\ncables",
                    13: "Planos de\nsecci" + s_c.o + "n\ntransversal\nde cables",
                    14: "Lista de\nCables",
                    15: "Cuantificaci" + s_c.o + "n\nde Materiales\nde Instrumentos\na granel",
                    16: "Conexionado\nde Cajas de\nConexi" + s_c.o + "n (JB)",
                    17: "Planos t" + s_c.i + "picos\nde instalaci" + s_c.o + "n",
                    18: "Planos de\narreglo\nde Equipos",
                    19: "Especificaciones\nde dise" + s_c.n + "o de\nsistemas de\ntelecom.",
                    20: "Planos de\ndisposici" + s_c.o + "n\nde equipos\nde telecom.",
                    21: "Diagramas\nde lazo de\nInstrumentos"
                },
                12: {
                    0: { ttl: "Electricidad" },
                    1: "Especificaci" + s_c.o + "n\nde dise" + s_c.n + "o\nElectrica",
                    2: "Lista\nde consumo\nEl" + s_c.e + "ctrico",
                    3: "Totalizaci" + s_c.o + "n\nde Carga\nEl" + s_c.e + "ctrica",
                    4: "Diagrama\nunifilar\ngeneral",
                    5: "Hojas\nde datos\nde Equipos",
                    6: "Especificaci" + s_c.o + "n\ngeneral\nde Equipos",
                    7: "Requisici" + s_c.o + "n\nde Equipos",
                    8: "Diagramas\nunifilares de\nInterruptores",
                    9: "Diagrama\nt" + s_c.i + "pico de\nInterruptores",
                    10: "Plano de\nArquitectura",
                    11: "Planos de\ndisposici" + s_c.o + "n\nde Equipos",
                    12: "Planos de\ndisposici" + s_c.o + "n de\nIluminaci" + s_c.o + "n",
                    13: "Planos de\nrutas\nde cables",
                    14: "Lista de\nCables",
                    15: "Planos\nT" + s_c.i + "picos de\ninstalaci" + s_c.o + "n",
                    16: "Cuantificaci" + s_c.o + "n\nde material\nElectrico a\ngranel (MTO)",
                    17: "Diagramas\nde Bloque",
                    18: "Diagramas\nde Resoluci" + s_c.o + "n\nde Problemas\n(TroubleShooting)",
                    19: "C" + s_c.a + "lculos\nEl" + s_c.e + "ctricos"
                }
            },
            Experiencia: {
                0: { ttl: "Experiencia" },
                1: "En\nConstruccion"
            },
            Contacto: {
                0: { ttl: "Contacto" },
                Email: "ljv004ar@\ngmail.com",
                Telefono: "Telefono:\n+541160423223"
            }
        },
        3: {
            0: { ttl: "German" },
            1: "Under\nConstruction"
        }
    }/* ,
    2: {
        0: { ttl: "Zoom_In" }
    },
    3: {
        0: { ttl: "Zoom_Out" },
    } */
};

var PI = Math.PI;
var clk = -1;

var e = mn;
var en = [];
var mstxt = [];
var enlen = 0;
var dvc = 10;
var cz = dvc;
var ca = 3 * PI / 2;

var esc = 0.75;

const ua = navigator.userAgent;
if (/mobile/i.test(ua)) {
    dvc = 3.5;
    //return 'Mobile';
} else if (/tablet/i.test(ua)) {
    dvc = 3.5;
    //return 'Tablet';
} else {
    dvc = 5.5;
    //return 'Desktop';
}

var strt = [];
var crrt = [];
var dfrc = [];
var whr = 0;
var X = -300;
var Z = 600;
var wheelSign = 0;

var lbl = "";

//(async function () {
/*     if (!navigator.gpu) {
        alert("Web GPU is not supported on your platform so far.");
        return;
    } */
const canvas = document.getElementById("Vue0");
//console.log(canvas.parentNode);
const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
//const engine = new BABYLON.WebGPUEngine(canvas);
//await engine.initAsync();
const createScene = async function () {

    const scene = new BABYLON.Scene(engine);
    //    (async () => {
    const audioEngine = await BABYLON.CreateAudioEngineAsync();

    const gunshot = await BABYLON.CreateSoundAsync("gunshot",
        "./assets/Audio/Shoot.mp3"
    );
    const bounce = await BABYLON.CreateSoundAsync("bounce",
        "./assets/Audio/Sea-sound-effect.mp3",
        { spatialEnabled: true }
    );
    //await audioEngine.unlockAsync();


    bounce.volume = 0.15;
    //    });

    var bldgs = [
        {
            name: "Productos y Servicios",
            loc: { x: 0 + X, y: 0, z: Z },
            strs: 50,
            clsn: 16,
            cld: { w: esc, d: esc, h: esc * 7 },
            strd: { w: 3 * esc * 150, d: 2 * esc * 150, h: esc / 3 },
            els: { w: esc * 40, d: esc * 20 },
            slM: 15000,
            slF: 1,
            clM: 500,
            clF: 1,
            bxs: [],
            bxsi: [],
            slxi: [],
            sttc: true,
            COT: new BABYLON.TransformNode(this.name)

        },
        {
            name: "Generales",
            loc: { x: 300 + X, y: 0, z: Z },
            strs: 20,
            clsn: 16,
            cld: { w: esc, d: esc, h: esc * 7 },
            strd: { w: esc * 150, d: esc * 150, h: esc / 3 },
            els: { w: esc * 40, d: esc * 20 },
            slM: 1500,
            slF: 1,
            clM: 150,
            clF: 1,
            bxs: [],
            bxsi: [],
            slxi: [],
            sttc: true,
            COT: new BABYLON.TransformNode(this.name)
        },
        {
            name: "Tercero",
            loc: { x: 500 + X, y: 0, z: Z },
            strs: 30,
            clsn: 8,
            cld: { w: esc, d: esc, h: esc * 7 },
            strd: { w: esc * 150, d: esc * 150, h: esc / 3 },
            els: { w: esc * 40, d: esc * 20 },
            slM: 10000,
            slF: 1,
            clM: 500,
            clF: 1,
            bxs: [],
            bxsi: [],
            slxi: [],
            sttc: true,
            COT: new BABYLON.TransformNode(this.name)
        },
        {
            name: "Cuarto",
            loc: { x: 800 + X, y: 0, z: Z },
            strs: 40,
            clsn: 8,
            cld: { w: esc, d: esc, h: esc * 7 },
            strd: { w: esc * 150, d: esc * 150, h: esc / 3 },
            els: { w: esc * 40, d: esc * 20 },
            slM: 1500,
            slF: 1,
            clM: 1500,
            clF: 1,
            bxs: [],
            bxsi: [],
            slxi: [],
            sttc: true,
            COT: new BABYLON.TransformNode(this.name)
        }
    ];

    //bldgs[0].test = new BABYLON.TransformNode(this.name);   Puede pasarse el arreglo de parametros y valores de los edificios para luego asignar los valores

    //var camera = new BABYLON.ArcRotateCamera("camera", ca, 16 * PI / 32, cz, new BABYLON.Vector3(0, 1, 0), scene);
    var camera = new BABYLON.ArcRotateCamera("camera", ca, 16 * PI / 32, cz, new BABYLON.Vector3(0, 5, 0), scene);
    //scene.activeCameras.push(scene.activeCamera);
    //camera.attachControl(canvas, true);
    //camera.maxZ = 18000;
    //camera.wheelDeltaPercentage = 0.01;

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0.5, 0.5, -0.5), scene);
    light.position = new BABYLON.Vector3(-3500, 7000, 7000);
    light.intensity = 0.95;
    //camera.zoomToMouseLocation = true;

    var skyDome = new BABYLON.MeshBuilder.CreateSphere("Sky", { diameter: 18000, sideOrientation: 0 }, scene);

    var skyMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
    skyMaterial.backFaceCulling = false;
    skyDome.isPickable = false;

    skyDome.material = skyMaterial;
    skyMaterial.turbidity = 1;
    skyMaterial.luminance = 1;
    skyMaterial.inclination = 0.4985;
    skyMaterial.azimuth = 0.75;
    //skyMaterial.useSunPosition = true;
    //skyMaterial.sunPosition = new BABYLON.Vector3(-3500, 7500, 7000);
    skyMaterial.rayleigh = 2;

    var wallMat = new BABYLON.StandardMaterial("myMaterial", scene);

    wallMat.diffuseColor = new BABYLON.Color3(0.1, 0.35, 0.5);

    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 8000, height: 8000, subdivisions: 64 }, scene);

    var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("./assets/textures/ground_8f0wHf3.jpg", scene);
    groundMaterial.diffuseTexture.uScale = groundMaterial.diffuseTexture.vScale = 512;

    ground.material = groundMaterial;
    ground.position.y = -12;

    const ground2 = BABYLON.MeshBuilder.CreateGround("ground2", { width: 5000, height: 400, subdivisions: 32 }, scene);
    //ground2.material = wallMat;
    ground2.position.z = 600;

    const road1 = BABYLON.MeshBuilder.CreateGround("road1", { width: 50, height: 9000, subdivisions: 32 }, scene);
    road1.position.x = 100;
    const road2 = BABYLON.MeshBuilder.CreateGround("road2", { width: 50, height: 9000, subdivisions: 32 }, scene);
    road2.position.x = -100;

    const waterMesh = BABYLON.MeshBuilder.CreateGround("waterMesh", { width: 9000, height: 9000, subdivisions: 64 }, scene);
    var water = new BABYLON.WaterMaterial("water", scene);
    water.bumpTexture = new BABYLON.Texture("./assets/textures/504940-water-texture.jpg", scene);

    // Water properties
    water.windForce = -1.5 * Math.random();
    water.waveHeight = 1.25;
    if (Math.random() > 0.5) {
        water.windForce = -water.windForce;
    }
    water.windDirection = new BABYLON.Vector2(Math.random(), Math.random());
    water.waterColor = new BABYLON.Color3(0.1, 0.1, Math.random());
    water.colorBlendFactor = 0.3;
    water.bumpHeight = 2.5 * Math.random();
    water.waveLength = 2.5 * Math.random();
    water.addToRenderList(ground);
    water.addToRenderList(skyDome);

    waterMesh.material = water;
    waterMesh.position.y = -11;
    waterMesh.position.z = 0;
    bounce.spatial.attach(waterMesh);
    bounce.playbackRate = 2 * Math.abs(water.windForce);
    bounce.play({ loop: true });


    var anchor = new BABYLON.TransformNode("");

    //camera.setTarget(anchor.position);

    var manager = new BABYLON.GUI.GUI3DManager(scene);
    var panel = new BABYLON.GUI.StackPanel3D();
    if (this.outerWidth > this.outerHeight) {
        panel.isVertical = false;
    } else {
        panel.isVertical = true;
    }


    //panel.radius = 5;
    panel.margin = 0.10475;

    manager.addControl(panel);

    panel.position.y = 0;
    //panel._columns = 1;
    panel.linkToTransformNode(anchor);

    anchor.position.y = 5;

    var stxt = "";

    var addButton = function (txt, value, lbl) {
        //console.log(txt, value, lbl);
        var button = new BABYLON.GUI.HolographicButton(txt);
        panel.addControl(button);
        button.backgroundColor = "Black";
        //button.text.fontSize = 12;
        const text1 = new BABYLON.GUI.TextBlock();
        text1.color = "White";
        text1.fontSize = 32;
        if (typeof value === "object") {
            //stxt = txt;

            if (txt === "0") {
                lbl = "Back";
                //stxt = lbl
            }

            try {

                text1.text = lbl.replace(/_/g, "\n");
                //text1.text = txt.replace(/ñ/g, s_c.n);
                //text0.text = text1.text;
            }
            catch {
                text1.text = lbl;
                //text0.text = text1.text;
            }

            //text1.text = txt;
            button.content = text1;
            //button.text = txt;
            button.onPointerUpObservable.add(function () {
                //console.log(button.text);
                /* try {
                   stxt = text1.text.replace(/\n/g, "_");
               }
               catch {
                   stxt = text1.text;// = txt;
               } */
                //stxt = text1.text;
                gunshot.volume = 0.25;
                gunshot.playbackRate = 32;
                //gunshot.pitch = 1;
                gunshot.play();
                stxt = button.name;
                if (stxt === "0") {
                    stxt = "Back";
                }
                //console.log("Devolviendo:", stxt, lbl);
                clk = 1;
                //camera.alpha = ca;
                //return lbl;

            });
        } else {
            //button.text = value;

            text1.text = value;
        }
        button.content = text1;
        var btnCnt = button.content;
        //button.textWrapping = true;
        //btnCnt.color = "Red";
        btnCnt._scaleY = 1;
        button.content._scaleX = 1;
        //btnCnt._paddingTop.value=-125;
        //button.content._currentMeassure.height = 60;
        //button._clipContent=false;
        //btnCnt.height = 0.075;
        //console.log(button.content._height);


    }


    bldgs.forEach((bld) => {
        bld.bxs = [];
        bld.bxsi = [];
        dh = bld.strd.h / 2;
        var j = bldgs.indexOf(bld);
        //var ipnt = new BABYLON.Vector3(bld.loc.x, bld.loc.y + dh, bld.loc.z);
        var ipnt = new BABYLON.Vector3(0, dh, 0);



        for (i = 0; i < bld.strs; i++) {
            if (i === 0) {
                var slbOpts = {
                    width: bld.strd.w,
                    height: bld.strd.h,
                    depth: bld.strd.d,
                    sideOrientation: BABYLON.Mesh.DEFAULTSIDE
                };
                var slb = new BABYLON.MeshBuilder.CreateBox(j + ":" + i + "-F", slbOpts, scene);
                slb.position = ipnt;
                bld.bxs.push(slb);

            }
            var ccntr = 0;
            var clmx = 0;
            var clmz = 0;
            for (c = 0; c < bld.clsn; c++) {

                var cn = Math.trunc(c / 4) + 1;
                var clstp = 1 + 1 / 4 - (cn) / 4;
                //  console.log(j, c, cn, clstp, -clstp);

                //console.log(j, c, ccntr, cn, clstp, -clstp);

                switch (ccntr) {
                    case 0:
                        clmx = clstp;
                        clmz = clstp;
                        break;
                    case 1:
                        clmx = -clstp;
                        clmz = clstp;
                        break;
                    case 2:
                        clmx = -clstp;
                        clmz = -clstp;
                        break;
                    case 3:
                        clmx = clstp;
                        clmz = -clstp;
                        break;
                    default:
                        break;
                }
                //console.log(j, c, ccntr, cn, clmx, clmz);

                var colOpts = {
                    width: bld.cld.w,
                    height: bld.cld.h,
                    depth: bld.cld.d,
                    sideOrientation: BABYLON.Mesh.DEFAULTSIDE
                }

                if (c === 0) {
                    var col = new BABYLON.MeshBuilder.CreateBox(j + ":" + i + "-C" + c, colOpts, scene);
                    colRlx = clmx * (bld.strd.w / 2 - 2 * bld.cld.w);
                    colRlz = clmz * (bld.strd.d / 2 - 2 * bld.cld.d);
                    colRly = i * (bld.cld.h + bld.strd.h) + bld.cld.h / 2 + bld.strd.h / 2;
                    col.position = ipnt.add(new BABYLON.Vector3(colRlx, colRly, colRlz));


                } else {
                    var col = col.clone(j + ":" + i + "-C" + c);
                    colRlx = clmx * (bld.strd.w / 2 - 2 * bld.cld.w);
                    colRlz = clmz * (bld.strd.d / 2 - 2 * bld.cld.d);
                    colRly = i * (bld.cld.h + bld.strd.h) + bld.cld.h / 2 + bld.strd.h / 2;
                    col.position = ipnt.add(new BABYLON.Vector3(colRlx, colRly, colRlz));
                }

                bld.bxs.push(col);

                if (c < 4) {

                    switch (c) {
                        case 0:
                        case 1:
                            var walOpts = {
                                width: bld.strd.w - 1 / 8 * bld.cld.w,
                                depth: bld.cld.d / 8,
                                height: bld.cld.h,
                                sideOrientation: BABYLON.Mesh.DEFAULTSIDE
                            }
                            var wall = new BABYLON.MeshBuilder.CreateBox(j + ":" + i + "-W" + c, walOpts, scene);
                            wall.position = ipnt.add(new BABYLON.Vector3(0, colRly, clmx * (bld.strd.d / 2 - 0.125 * bld.cld.w)));

                            break;

                        case 2:
                        case 3:
                            var walOpts = {
                                width: bld.cld.d / 8,
                                depth: bld.strd.d - 1 / 8 * bld.cld.w,
                                height: bld.cld.h,
                                sideOrientation: BABYLON.Mesh.DEFAULTSIDE
                            }
                            var wall = new BABYLON.MeshBuilder.CreateBox(j + ":" + i + "-W" + c, walOpts, scene);
                            wall.position = ipnt.add(new BABYLON.Vector3(clmx * (bld.strd.w / 2 - 0.125 * bld.cld.w), colRly, 0));
                            break;

                        default:
                            break;
                    }
                    wallMat.alpha = 0.25;

                    wall.material = wallMat;

                    bld.bxs.push(wall);

                }
                ccntr++;
                if (ccntr > 3) {
                    ccntr = 0;
                }
            }

            var slbOpts = {
                width: bld.strd.w,
                height: bld.strd.h,
                depth: bld.strd.d,
                sideOrientation: BABYLON.Mesh.DEFAULTSIDE
            }
            var slb1 = slb.clone(j + ":" + i + "-S");
            dh = i * (bld.cld.h + bld.strd.h) + bld.cld.h + bld.strd.h;
            slb1.position = slb.position.add(new BABYLON.Vector3(0, dh, 0));
            bld.bxs.push(slb1);

        }
        bld.bxs.forEach((itm) => {
            itm.parent = bld.COT;
        });
        bld.COT.position = new BABYLON.Vector3(bld.loc.x, bld.loc.y, bld.loc.z)
    });



    /* if (BABYLON.VideoRecorder.IsSupported(engine)) {
           var recorder = new BABYLON.VideoRecorder(engine);
           recorder.startRecording("test.webm", 64);
       } */
    scene.registerBeforeRender(() => {
        //bldgs[0].COT.rotation.y += 0.01;
        //bldgs[0].COT.position.y += 0.5;
        bldgs[1].COT.rotation.y += 0.0150;
        if (camera.beta > PI / 2) {
            camera.beta = PI / 2;
        }

        //camera.alpha -= 0.01;


        if (this.outerWidth > this.outerHeight) {
            panel.isVertical = false;
            whr = this.outerWidth / this.outerHeight;
            cz = dvc;
            anchor.position.y = 5;
        } else {
            panel.isVertical = true;
            whr = this.outerHeight / this.outerWidth;
            cz = dvc;
            anchor.position.x = 0;

        }
        skyMaterial.inclination -= 0.000555;
        waterMesh.rotation.y += 0.0005;
        //console.log(skyMaterial.inclination);
        if (skyMaterial.inclination < (-0.4985 + 0.000255)) {
            skyMaterial.inclination = 0.4985 - 0.000255 * 0;
            water.windForce = -1.5 * Math.random();
            water.waveLength = 2.5 * Math.random();
            water.bumpHeight = 2.5 * Math.random();
            bounce.playbackRate = 2 * Math.abs(water.windForce);

            if (Math.random() > 0.5) {
                water.windForce = -water.windForce;
                //water.windDirection = -water.windDirection;
            }
        }

        /* if (camera.beta >= PI / 2) { camera.beta = PI / 2; }
        if (camera.beta <= PI / 2.5) { camera.beta = PI / 2.5; } */

        /* if (camera.alpha >= 2 * 2.375 * PI / 2) { camera.alpha = 2 * 2.375 * PI / 2; }
        if (camera.alpha <= 0.55 * 2.375 * PI / 2) { camera.alpha = 0.55 * 2.375 * PI / 2; } */
        //  3 * PI / 2
        if (camera.radius <= cz) { camera.radius = cz; }
        if (camera.radius >= cz) { camera.radius = cz; }

        if (clk === -1) {

            panel.blockLayout = true;
            //panel._columns = 24;

            for (let key in e) {
                //console.log(mn[key].lbl);
                /*                 if (key === "PS7") {
                                    console.log(e[key][0]["PS7"]);
                                addButton(e[key][0]["PS7"], e[key]);
                
                                }else{ */
                //console.log(key, e[key]);
                try {
                    lbl = e[key][0].ttl;
                    //console.log(lbl);
                } catch {
                    lbl = key;
                }
                //console.log(key, e[key], lbl);
                addButton(key, e[key], lbl);
                //lbl = "";
                //      }
            }
            panel.blockLayout = false;
            //en.push(e);
            //mstxt.push(" ");
            enlen = en.length;
            //console.log(e, enlen, mstxt)
            clk = 0;
            //lbl = "";
            //stxt = "";
            //console.log(panel, clmns);

        }
        if (clk === 0) {

            //camera.zoomOnFactor = 1;
            //camera.zoomOn(ground,true);

            /* if (fcs === 0) {
                camera.alpha = ca;
            } */
            //console.log("Devolviendo:", stxt, lbl);

            //if (stxt === "1") {
            if (stxt === "2" && lbl === "0") {
                anchor.position.z -= 0.01;
                //camera.position = anchor.position;
            }
            if (stxt === "3" && lbl === "0") {
                anchor.position.z += 0.01;
                //camera.position = anchor.position;
            }
            //}


        }
        if (clk === 1) {
            //console.log(stxt);
            panel.children.forEach(element => {
                element.dispose();
            });

            /*             if (orn === 1 && panel._columns !== 1) {
                            panel._columns = 1;
                            ca = -ca;
                            cz = -cz;
                        }
                        if (orn === 0 && panel._columns !== 26) {
                            panel._columns = 26;
                            ca = -ca;
                            cz = -cz;
                        } */

            if ((stxt === "Back" || stxt === "0") && en.length > 0 && mstxt.length > 0) {
                mstxt.pop();
                var mtxt = mstxt[mstxt.length - 1];
                /*                         if (mtxt) {
                                            try {
                                                text0.text = "LV Projects\n" + mtxt.replace(/_/g, "\n");
                                            }
                                            catch {
                                                text0.text = "LV Projects\n" + mtxt;
                                            }
                                        } else {
                                            text0.text = "LV Projects\n" + "";
                                        } */
                en.pop();
                enlen = en.length - 1;
                if (en.length > 0) {
                    e = en[enlen][mtxt];
                }
                if (en.length === 0) {
                    e = mn;
                }
                if (panel.isVertical) {
                    anchor.position.y = 5;
                } else {
                    anchor.position.x = 0;
                }
                //console.log(e, enlen, mstxt);
                //console.log(mstxt);
            }
            if (stxt !== "Back" && stxt !== "0") {
                mstxt.push(stxt);
                /*                         try {
                                            text0.text = "LV Projects\n" + stxt.replace(/_/g, "\n");
                                        }
                                        catch {
                                            text0.text = "LV Projects\n" + stxt;
                                        } */
                //text0.text = stxt;
                en.push(e);
                enlen = en.length - 1;
                e = en[enlen][stxt];
                //console.log(e);

                if (panel.isVertical) {
                    anchor.position.y = 5;
                } else {
                    anchor.position.x = 0;
                }
                //console.log(en, enlen, mstxt)
                //console.log(mstxt)
            }
            clk = -1;
            //console.log(mstxt)

        }
        //console.log(clk);

        //clk = 0;




    });

    scene.defaultCursor = "grab";


    scene.onPointerObservable.add((pointerInfo) => {
        switch (pointerInfo.type) {
            case BABYLON.PointerEventTypes.POINTERDOWN:
                //text0.text = "POINTER DOWN";
                strt = [scene.pointerX, scene.pointerY];
                break;
            case BABYLON.PointerEventTypes.POINTERUP:
                /*                 crrt = [scene.pointerX, scene.pointerY];
                                dfrc = [crrt[0] - strt[0], crrt[1] - strt[1]];
                
                                if ((Math.abs(dfrc[0]) > Math.abs(dfrc[1])) && panel.isVertical === false) {
                                    //text0.text = "Horizontal";
                                    anchor.position.x += dfrc[0] / 1000 * whr;
                                }
                                if ((Math.abs(dfrc[0]) < Math.abs(dfrc[1])) && panel.isVertical === true) {
                                    //text0.text = "Vertical\n";
                                    //text0.text += dfrc[0] + "," + dfrc[1];
                                    anchor.position.y -= dfrc[1] / 1000 * whr;
                                } */
                strt = [];
                crrt = [];
                dfrc = [];
                //text0.text = dfrc[0] + "," + dfrc[1];
                //text0.text = "POINTER UP";
                break;
            case BABYLON.PointerEventTypes.POINTERMOVE:
                if (strt.length > 0) {
                    crrt = [scene.pointerX, scene.pointerY];
                    dfrc = [crrt[0] - strt[0], crrt[1] - strt[1]];

                    if ((Math.abs(dfrc[0]) > Math.abs(dfrc[1])) && panel.isVertical === false) {
                        //text0.text = "Horizontal";
                        anchor.position.x += dfrc[0] / 2000 * whr;
                        if (anchor.position.x > 0 + Object.keys(e).length / 2) {
                            anchor.position.x = 0 + Object.keys(e).length / 2;
                        }
                        if (anchor.position.x < 0 - Object.keys(e).length / 2) {
                            anchor.position.x = 0 - Object.keys(e).length / 2;
                        }
                    }
                    if ((Math.abs(dfrc[0]) < Math.abs(dfrc[1])) && panel.isVertical === true) {
                        //text0.text = "Vertical\n";
                        //text0.text += dfrc[0] + "," + dfrc[1];
                        anchor.position.y -= dfrc[1] / 2000 * whr;
                        if (anchor.position.y > 5 + Object.keys(e).length / 2) {
                            anchor.position.y = 5 + Object.keys(e).length / 2;
                        }
                        if (anchor.position.y < 5 - Object.keys(e).length / 2) {
                            anchor.position.y = 5 - Object.keys(e).length / 2;
                        }
                    }
                    //text0.text = "POINTER MOVES";
                    //text0.text = anchor.position.y;


                }
                break;
            case BABYLON.PointerEventTypes.POINTERWHEEL:
                //console.log(pointerInfo.event.wheelDelta);
                wheelSign = pointerInfo.event.wheelDelta / Math.abs(pointerInfo.event.wheelDelta);
                switch (wheelSign) {
                    case 1:
                        anchor.position.z += 0.075;
                        //camera.position = anchor.position;
                        break;
                    case -1:
                        anchor.position.z -= 0.075;
                        //camera.position = anchor.position;
                        break;
                }
                if (panel.isVertical) {
                    // text0.text = "POINTER WHEEL";

                }
                //text0.text = "POINTER WHEEL";
                break;
            case BABYLON.PointerEventTypes.POINTERPICK:
                //text0.text = "POINTER PICK";
                break;
            case BABYLON.PointerEventTypes.POINTERTAP:
                //text0.text = "POINTER TAP";
                break;
            case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
                //text0.text = "POINTER DOUBLE-TAP";
                break;
        }
    })



    return scene;
};
createScene().then((scene) => {
    engine.runRenderLoop(function () {
        if (scene) {
            scene.render();
        }
    });
});


// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();

    /*       if (this.outerWidth > this.outerHeight) {
              orn = 0
          } else {
              orn = 1;
          } */

});




//})();