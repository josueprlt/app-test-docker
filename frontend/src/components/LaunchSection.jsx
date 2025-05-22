import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { IconPlay, IconPause } from "./icons";
import SyncLoader from "react-spinners/SyncLoader";
import MoonLoader from "react-spinners/MoonLoader";
import ChipDate from "./ChipDate";
import Button from "./Button";

const LaunchSection = ({ data }) => {
    const navigate = useNavigate();
    const [state, setState] = useState('inactif');

    const colorRound = {
        inactif: "bg-gray-700",
        loading: "bg-orange-500",
        error: "bg-red-500",
        success: "bg-green-500"
    }

    const textSpan = {
        inactif: <span className="hidden text-base text-gray-700 font-medium sm:block">inactif</span>,
        loading: <span className="hidden text-base text-orange-500 font-medium sm:block">en cours</span>,
        error: <span className="text-base text-red-500 font-medium">erreur</span>,
        success: <span className="text-base text-green-500 font-medium">succès</span>
    }

    const chipState = {
        inactif: <ChipDate txt="Lancer le test" direction="right" icon="hidden" className="hidden md:flex" />,
        loading:
            <div className="flex items-center gap-2">
                <MoonLoader color="#EBA800" size={14} />
                <ChipDate txt="Cela peut prendre plusieurs secondes" direction="right" icon="hidden" color="orange" className="hidden md:flex" />
            </div>,
        error: <ChipDate txt="Erreur durant le lancement du test" direction="hidden" icon="cross" color='red' className="hidden md:flex" />,
        success: <ChipDate txt="Le test c'est bien déroulé" direction="hidden" icon="check" color='green' className="hidden md:flex" />,
    }

    const iconState = {
        inactif: <IconPlay />,
        loading: <IconPause />,
    }

    const handleLaunchClick = () => {
        if (state === 'inactif') {
            setState('loading');
            fetch('http://localhost:5001/api/launch/' + data.type, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: data.type }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur réseau ou réponse non OK');
                    }
                    setState('success');
                    setTimeout(() => {
                        navigate("/");
                        window.location.reload();
                    }, 1500);
                })
                .catch(error => {
                    setState('error');
                    console.error('Erreur lors du lancement :', error);
                    setTimeout(() => {
                        navigate("/");
                        window.location.reload();
                    }, 1500);
                });
        } else {
            setState('inactif');
        }
    }

    return (
        <section className="col-span-1 flex flex-row justify-between items-center gap-4 py-2 px-5 rounded-md bg-white-500 shadow md:py-4 md:p-10 xl:gap-6">
            {data === null ? (
                <SyncLoader color="#3C3C3C" size={8} />
            ) : (
                <>
                    <div className='flex flex-wrap gap-2'>
                        <h3 className="text-xl font-bold">{data.type}</h3>
                        {state === 'loading' && <Button href="http://localhost:4444/ui/#/sessions" blank={true} >Visualiser le test en direct</Button>}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`relative block w-4 h-4 rounded-full ${colorRound[state]} before:absolute before:w-2 before:h-2 before:bg-white-500 before:rounded-full before:top-[4px] before:left-[4px]`}></span>
                        {textSpan[state]}
                    </div>
                    <div className="flex items-center gap-5">
                        {chipState[state]}
                        <div className="cursor-pointer" onClick={handleLaunchClick}>
                            {iconState[state]}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default LaunchSection;