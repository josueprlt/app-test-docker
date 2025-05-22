import { useState, useEffect, useMemo } from "react";
import TestElement from "../components/TestElement";
import ChartComponent from "../components/ChartComponent";
import SyncLoader from "react-spinners/SyncLoader";

function AccueilPage({ data = null, allData = null }: {
    data: { id: number; name: string; updatedAt: string; success: boolean; logs: [] }[] | null,
    allData?: { id: number; name: string; updatedAt: string; success: boolean; logs: [] }[] | null
}) {
    const [successAllTests, setSuccessAllTests] = useState(0);
    const [errorsAllTests, setErrorsAllTests] = useState(0);
    const [lineChartAllData, setLineChartAllData] = useState<any>({
        datasets: [],
    });

    const doughnutAllData = useMemo(() => ({
        labels: ['Réussi(s)', 'Échoué(s)'],
        datasets: [
            {
                label: 'Test(s) total',
                data: [successAllTests, errorsAllTests],
                backgroundColor: ['#00B521', '#EB0000'],
                hoverOffset: 4,
            },
        ],
    }), [successAllTests, errorsAllTests]);

    const optionsDoughnut = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    const optionsLine = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Date'
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Test(s)'
                }
            }
        }
    };

    useEffect(() => {
        if (allData) {
            let successCount = 0;
            let errorCount = 0;

            allData.forEach(dt => {
                if (dt.success) {
                    successCount++;
                } else {
                    errorCount++;
                }
            });

            setSuccessAllTests(successCount);
            setErrorsAllTests(errorCount);
        }
    }, [allData]);

    useEffect(() => {
        if (!allData) return;

        // Dictionnaire pour chaque jour
        const dailyStats: Record<string, { total: number; success: number; fail: number }> = {};
        const months = ["Jan.", "Fév.", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Sept.", "Oct.", "Nov.", "Déc."];

        allData.forEach((test) => {
            const dateOnly = `${new Date(test.updatedAt).getDate()} ${months[new Date(test.updatedAt).getMonth()]}`;
            if (!dailyStats[dateOnly]) {
                dailyStats[dateOnly] = { total: 0, success: 0, fail: 0 };
            }

            dailyStats[dateOnly].total++;
            if (test.success) dailyStats[dateOnly].success++;
            else dailyStats[dateOnly].fail++;
        });

        // Tri des dates
        const sortedDates = Object.keys(dailyStats).sort();

        // Format des datasets pour Chart.js
        const totalData = sortedDates.map(date => ({ x: date, y: dailyStats[date].total }));
        const successData = sortedDates.map(date => ({ x: date, y: dailyStats[date].success }));
        const failData = sortedDates.map(date => ({ x: date, y: dailyStats[date].fail }));

        setLineChartAllData({
            datasets: [
                {
                    label: 'Tests totaux',
                    data: totalData,
                    borderColor: '#3B82F6', // bleu
                    tension: 0.3,
                },
                {
                    label: 'Réussis',
                    data: successData,
                    borderColor: '#10B981', // vert
                    tension: 0.3,
                },
                {
                    label: 'Échoués',
                    data: failData,
                    borderColor: '#EF4444', // rouge
                    tension: 0.3,
                },
            ],
        });

    }, [allData]);

    return (
        <>
            <main className="flex flex-col gap-2 p-2 bg-gray-500 text-black-500 sm:p-4 sm:gap-4 md:px-10">
                <section className="p-2 rounded-md bg-white-500 shadow">
                    <h1 className="text-xl font-bold text-center py-2 sm:text-2xl md:text-4xl">Accueil</h1>
                </section>

                {allData && (
                    <section className="flex flex-wrap justify-between p-2 rounded-md bg-white-500 shadow">
                        {(successAllTests || errorsAllTests) ? (
                            <>
                                <ChartComponent title="Proportion totale de cas de tests réussi(s) et échoué(s)" data={doughnutAllData} options={optionsDoughnut} type="doughnut" props={"w-full sm:w-1/2"} />
                                <ChartComponent title="Historique total de l'activité de test" data={lineChartAllData} options={optionsLine} props={"w-full sm:w-1/2"} />
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col justify-center items-center w-full sm:w-1/2 p-2">
                                    <SyncLoader color="#3C3C3C" size={15} />
                                </div>
                                <div className="flex flex-col justify-center items-center w-full sm:w-1/2 h-52 p-2">
                                    <SyncLoader color="#3C3C3C" size={15} />
                                </div>
                            </>
                        )}
                    </section>
                )}

                <section className="flex flex-col gap-2 p-2 rounded-md bg-white-500 shadow">
                    {data === null ? (
                        <>
                            <SyncLoader color="#3C3C3C" size={15} />
                        </>
                    ) : (
                        <>
                            {data.map((dt, index) => (
                                <TestElement key={index} index={index + 1} id={dt.id} title={dt.name} date={dt.updatedAt} success={dt.success} logs={dt.logs} />
                            ))}
                        </>
                    )}
                </section>
            </main>
        </>
    );
}

export default AccueilPage;