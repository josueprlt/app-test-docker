import {useEffect, useState} from 'react'
import {IconPlay, IconPause} from "./icons";
import {useNavigate} from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import MoonLoader from "react-spinners/MoonLoader";
import InfoOptionLaunch from "./InfoOptionLaunch";
import ChipDate from "./ChipDate";
import Button from "./Button";
import {fetchRunTests} from "../api/run/runTests.jsx";
import {fetchTestByType} from "../api/test/GetTestByType.jsx";
import {fetchGlobalTestStatus} from "../api/test/GetGlobalTestsStatus.jsx";

const LaunchSection = ({data, title = "", txtChipInactive = "", mode = "all", options = true}) => {
    const navigate = useNavigate();
    const [state, setState] = useState('inactive');
    const [dataTests, setDataTests] = useState({tests: []});
    const [typeTest, setTypeTest] = useState(null);
    const [baseType, setBaseType] = useState(null);
    const [argsType, setArgsType] = useState([]);

    const colorRound = {
        inactive: "bg-gray-700",
        loading: "bg-orange-500",
        error: "bg-red-500",
        success: "bg-green-500"
    }

    const textSpan = {
        inactive: <span className="hidden text-base text-gray-700 font-medium sm:block">inactif</span>,
        loading: <span className="hidden text-base text-orange-500 font-medium sm:block">en cours</span>,
        error: <span className="text-base text-red-500 font-medium">erreur</span>,
        success: <span className="text-base text-green-500 font-medium">succès</span>
    }

    const chipState = {
        inactive: <ChipDate txt={txtChipInactive ? txtChipInactive : "Lancer le test"} direction="right" icon="hidden"
                            className="hidden md:flex px-2 py-1 rounded-md"/>,
        loading:
            <div className="flex items-center gap-2">
                <MoonLoader color="#EBA800" size={14}/>
                <ChipDate txt="Cela peut prendre plusieurs secondes" direction="right" icon="hidden" color="orange"
                          className="hidden md:flex px-2 py-1 rounded-md"/>
            </div>,
        error: <ChipDate txt="Erreur durant le lancement du test" direction="hidden" icon="cross" color='red'
                         className="hidden md:flex px-2 py-1 rounded-md"/>,
        success: <ChipDate txt="Le test c'est bien déroulé" direction="hidden" icon="check" color='green'
                           className="hidden md:flex px-2 py-1 rounded-md"/>,
    }

    const iconState = {
        inactive: <IconPlay/>,
        loading: <IconPause/>,
    }

    useEffect(() => {
        let ts = {tests: []};

        if (data) {
            let values = [];

            data.forEach(test => {
                setTypeTest(test.type)
                // Si on est en mode 'all', on exclut les tests avec exclud: true
                if (mode === 'all' && test.exclud === true) {
                    return;
                }

                const regex = /\[([^\]]+)\]/;
                const str = test.type;
                const base = str.split("-[")[0];

                const match = str.match(regex);
                if (match && match[1]) {
                    values = match[1].split('/').map(v => v.trim());
                } else {
                    values = [];
                }

                ts.tests.push({testName: base, args: values});

                setBaseType(base);
                setArgsType(values);
            });

            setDataTests(ts);
        }
    }, [data, mode]);

    const handleLaunchClick = async () => {
        if (state !== 'inactive') {
            setState('inactive');
            return;
        }
        setState('loading');

        try {
            await fetchRunTests(dataTests);

            const checkStatus = async () => {
                let res;
                let json;
                let allDone;
                if (mode !== 'all') {
                    json = await fetchTestByType({type: typeTest});
                    allDone = typeof json[0]?.success === "boolean";
                } else {
                    json = await fetchGlobalTestStatus();
                    allDone = json.every(test => test.success === true || test.success === false);
                }

                if (allDone) {
                    for (const test of json) {
                        if (test.success === false) {
                            setState('error');
                            timeToReload();
                            return;
                        }
                    }
                    setState('success');
                    timeToReload();
                } else {
                    setTimeout(checkStatus, 5000);
                }
            };

            setTimeout(checkStatus, 10000);
        } catch (error) {
            setState('error');
            timeToReload();
        }
    }

    function timeToReload(time = 1500) {
        setTimeout(() => {
            navigate("/");
            window.location.reload();
        }, time);
    }

    return (
        <>
            <section
                className="col-span-1 flex flex-row justify-between items-center gap-4 py-2 px-5 rounded-md bg-white-500 shadow md:py-4 md:p-10 xl:gap-6">
                {data === null ? (
                    <SyncLoader color="#3C3C3C" size={8}/>
                ) : (
                    <>
                        <div className='flex flex-wrap gap-2'>
                            <h3 className="text-xl font-bold">{title === "" ? baseType : title}</h3>
                            {options && <InfoOptionLaunch optionsChoice={argsType}/>}
                            {state === 'loading' &&
                                <Button href="http://localhost:4444/ui/#/sessions" blank={true}>Visualiser le test en
                                    direct</Button>}
                        </div>
                        <div className="flex items-center gap-2">
                            <span
                                className={`relative block w-4 h-4 rounded-full ${colorRound[state]} before:absolute before:w-2 before:h-2 before:bg-white-500 before:rounded-full before:top-[4px] before:left-[4px]`}></span>
                            {textSpan[state]}
                        </div>
                        <div className="flex items-center gap-5">
                            {chipState[state]}

                            {state === 'loading' ? (
                                <div>
                                    {iconState[state]}
                                </div>
                            ) : (
                                <div className="cursor-pointer" onClick={handleLaunchClick}>
                                    {iconState[state]}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </section>
        </>
    );
};

export default LaunchSection;