import { useState, useEffect } from 'react'
import { IconDoc, IconCheck, IconCross, IconBack } from "../components/icons";
import BarProgressComponent from "../components/BarProgressComponent";
import { GetTimeDifference } from "../utils/GetTimeDifference";
import StepsTableau from "../components/StepsTableau";
import { useParams } from "react-router";
import { Link } from "react-router";
import SyncLoader from "react-spinners/SyncLoader";
import ChartComponent from "../components/ChartComponent";
import LaunchSection from "../components/LaunchSection";
import LaunchOption from "../components/LaunchOption";

function TestPage() {
    let params = useParams()
    let idElt = params.id;

    const [optionsChoice, setOptionsChoice] = useState([]);
    const [data, setData] = useState<any>(null);
    const [outputDate, setOutputDate] = useState<any>(null);
    const [successSteps, setSuccessSteps] = useState<any>(null);
    const [errorsSteps, setErrorsSteps] = useState<any>(null);
    const [lineChartData, setLineChartData] = useState<any>({
        datasets: [],
    });
    const months = ["Jan.", "Fév.", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Sept.", "Oct.", "Nov.", "Déc."];
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                type: 'linear',
                display: true,
                title: {
                    display: true,
                    text: 'Étapes',
                },
                ticks: {
                    precision: 0
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Temps (ms)',
                },
                suggestedMin: 0
            }
        }
    };

    useEffect(() => {
        fetch('http://localhost:5001/api/tests/' + idElt)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching tests:', error));
    }, []);

    useEffect(() => {
        if (data) {
            setOutputDate(`le ${new Date(data.updatedAt).getDate()} ${months[new Date(data.updatedAt).getMonth()]} ${new Date(data.updatedAt).getFullYear()} à ${new Date(data.updatedAt).getHours()}h${new Date(data.updatedAt).getMinutes()}`);

            let successCount = 0;
            let errorCount = 0;
            let logsElt = data.logs;

            logsElt.forEach(log => {
                if (log.success) {
                    successCount++;
                } else {
                    errorCount++;
                }
            });

            setSuccessSteps(successCount);
            setErrorsSteps(errorCount);
        }
    }, [data]);


    useEffect(() => {
        if (!data) return;

        let logsElt = data.logs;
        const chartData = {
            labels: [] as number[],
            datasets: [
                {
                    label: 'Délai pour chaque étape (ms)',
                    data: [] as { x: number; y: number }[],
                    borderColor: '#3B82F6',
                    tension: 0.1,
                },
            ],
        };

        logsElt.forEach((log, index) => {
            let remainingTime;
            if (index === 0) {
                remainingTime = GetTimeDifference(data.createdAt, logsElt[index].updatedAt);
            } else {
                remainingTime = GetTimeDifference(logsElt[index - 1].updatedAt, logsElt[index].updatedAt);
            }
            chartData.datasets[0].data.push({ x: index + 1, y: remainingTime });
            chartData.labels.push(index + 1);
        });
        setLineChartData(chartData);
    }, [data]);

    const handleOptionsUpdate = (updatedChoice) => {
        setOptionsChoice(updatedChoice);
    };

    return (
        <>
            <main className="flex flex-col gap-2 p-2 bg-gray-500 text-black-500">
                <section>
                    <div className="flex flex-row gap-2">
                        <Link to="/" className="p-2 flex justify-center items-center rounded-md bg-white-500 shadow w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px] hover:bg-gray-300">
                            <IconBack className="h-7 rotate-180 sm:h-8 md:h-9" />
                        </Link>
                        <div className="w-full flex justify-center items-center rounded-md bg-white-500 shadow">
                            {data === null ? (
                                <SyncLoader color="#3C3C3C" size={8} />
                            ) : (
                                <h1 className="text-xl font-bold text-center py-2 sm:text-2xl md:text-4xl">{data.name}</h1>
                            )}
                        </div>
                    </div>
                    <div className="w-full p-2 rounded-md bg-white-500 shadow mt-2">
                        {outputDate === null && data === null ? (
                            <SyncLoader color="#3C3C3C" size={8} />
                        ) : (
                            <>
                                <p className='mb-5'>{data.description}</p>
                                <Link to="testest" className='text-blue-500 underline'>url de test</Link>
                                <p>Rapport généré {outputDate}</p>
                            </>
                        )}
                    </div>
                </section>

                <LaunchSection data={data} optionsChoice={optionsChoice} />
                <LaunchOption data={data} onSelectOption={handleOptionsUpdate} />

                <section className="grid grid-flow-col grid-col-3 gap-2">
                    <section className="col-span-1 flex flex-row items-center gap-4 p-2 rounded-md bg-white-500 shadow md:p-4 xl:gap-6">
                        <div className="flex justify-center items-center w-[54px] h-[54px] p-2 rounded-2xl bg-blue-300 md:w-[91px] md:h-[91px] md:rounded-4xl">
                            <IconDoc className="w-[25px] md:w-[35px]" />
                        </div>
                        <div className='h-full flex flex-col justify-around'>
                            {successSteps === null || errorsSteps === null ? (
                                <SyncLoader color="#3C3C3C" size={8} />
                            ) : (
                                <p className="text-xl font-bold text-blue-500 md:text-5xl md:text-black-500">{successSteps + errorsSteps}</p>
                            )}
                            <p className="hidden text-base font-bold md:block">Tâches éxécutées</p>
                        </div>
                    </section>
                    <section className="col-span-1 flex flex-row items-center gap-4 p-2 rounded-md bg-white-500 shadow md:p-4 xl:gap-6">
                        <div className="flex justify-center items-center w-[54px] h-[54px] p-2 rounded-2xl bg-green-300 md:w-[91px] md:h-[91px] md:rounded-4xl">
                            <IconCheck className="w-[25px] md:w-[47px]" />
                        </div>
                        <div className='h-full flex flex-col justify-around'>
                            {successSteps === null || errorsSteps === null ? (
                                <SyncLoader color="#3C3C3C" size={8} />
                            ) : (
                                <p className="text-xl font-bold text-green-500 md:text-5xl md:text-black-500">{successSteps}</p>
                            )}
                            <p className="hidden text-base font-bold md:block">Valides</p>
                        </div>
                    </section>
                    <section className="col-span-1 flex flex-row items-center gap-4 p-2 rounded-md bg-white-500 shadow md:p-4 xl:gap-6">
                        <div className="flex justify-center items-center w-[54px] h-[54px] p-2 rounded-2xl bg-red-300 md:w-[91px] md:h-[91px] md:rounded-4xl">
                            <IconCross className="w-[25px] md:w-[47px]" />
                        </div>
                        <div className='h-full flex flex-col justify-around'>
                            {successSteps === null || errorsSteps === null ? (
                                <SyncLoader color="#3C3C3C" size={8} />
                            ) : (
                                <p className="text-xl font-bold text-red-500 md:text-5xl md:text-black-500">{errorsSteps}</p>
                            )}
                            <p className="hidden text-base font-bold md:block">Erreurs</p>
                        </div>
                    </section>
                </section>

                <BarProgressComponent success={successSteps} errors={errorsSteps} />

                <section className="flex flex-wrap p-2 rounded-md bg-white-500 shadow">
                    <ChartComponent title="Délai par étape" data={lineChartData} options={options} props={"w-full"} />
                </section>

                <section className="flex flex-wrap w-full rounded-md overflow-hidden bg-white-500 shadow">
                    {data === null ? (
                        <SyncLoader color="#3C3C3C" size={8} />
                    ) : (
                        <StepsTableau logs={data.logs} delay={lineChartData} />
                    )}
                </section>
            </main>
        </>
    );
}

export default TestPage;