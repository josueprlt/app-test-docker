import { useState, useEffect } from "react";
import { IconDoc, IconCheck, IconCross, IconWarn } from "../icons.jsx";
import BarProgressComponent from "./BarProgressComponent.jsx";
import StepsTableau from "./StepsTableau.jsx";
import ChartComponent from "../ChartComponent.jsx";
import SyncLoader from "react-spinners/SyncLoader";
import { GetTimeDifference } from "../../utils/GetTimeDifference.jsx";
import optionsLineDelay from "../optionsChart/optionsLineDelay.jsx";

const InfoOnTest = ({ data }) => {
    const [successSteps, setSuccessSteps] = useState(null);
    const [errorsSteps, setErrorsSteps] = useState(null);
    const [lineChartData, setLineChartData] = useState({
        datasets: [],
    });

    useEffect(() => {
        if (!data) return;

        let logsElt = data.logs;
        
        const chartData = {
            labels: [],
            datasets: [
                {
                    label: 'Délai pour chaque étape (ms)',
                    data: [],
                    borderColor: '#3B82F6',
                    tension: 0.1,
                },
            ],
        };

        let successCount = 0;
        let errorCount = 0;

        logsElt.forEach(log => {
            if (log.success) {
                successCount++;
            } else {
                errorCount++;
            }
        });

        setSuccessSteps(successCount);
        setErrorsSteps(errorCount);


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

    return (
        <>
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

            {data && <BarProgressComponent logs={data.logs} />}

            <section className="flex flex-wrap p-2 rounded-md bg-white-500 shadow">
                <ChartComponent title="Délai par étape" data={lineChartData} options={optionsLineDelay} props={"w-full"} />
            </section>

            <section className="flex flex-wrap w-full rounded-md overflow-hidden bg-white-500 shadow">
                {data === null ? (
                    <SyncLoader color="#3C3C3C" size={8} />
                ) : (
                    <StepsTableau logs={data.logs} delay={lineChartData} />
                )}
            </section>
        </>
    );
};

export default InfoOnTest;