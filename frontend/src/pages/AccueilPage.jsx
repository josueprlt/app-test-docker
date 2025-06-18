import { useState, useEffect, useMemo } from "react";
import TestElement from "../components/elements/TestElement";
import ChartComponent from "../components/ChartComponent";
import Button from "../components/Button";
import SyncLoader from "react-spinners/SyncLoader";
import optionsDoughnut from "../components/optionsChart/optionsDoughnut";
import optionsLineHome from "../components/optionsChart/optionsLineHome";

function AccueilPage({ data = null, allData = null }) {
    const [successAllTests, setSuccessAllTests] = useState(0);
    const [errorsAllTests, setErrorsAllTests] = useState(0);
    const [lineChartAllData, setLineChartAllData] = useState({
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
        const dailyStats = {};
        const months = ["Jan.", "Fév.", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Sept.", "Oct.", "Nov.", "Déc."];

        allData.forEach((test) => {
            const dateOnly = `${new Date(test.createdAt).getDate()} ${months[new Date(test.createdAt).getMonth()]}`;
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
                                <ChartComponent title="Historique total de l'activité de test" data={lineChartAllData} options={optionsLineHome} type="homeLine" props={"w-full sm:w-1/2"} />
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

                <section className="flex flex-wrap justify-between p-2 rounded-md bg-white-500 shadow">
                    <h3 className="font-bold sm:text-2xl">Exécutez une série de tests</h3>
                    <Button href={'/tests'} >S'y rendre</Button>
                </section>

                <section className="flex flex-col gap-2 p-2 rounded-md bg-white-500 shadow">
                    {data === null ? (
                        <>
                            <SyncLoader color="#3C3C3C" size={15} />
                        </>
                    ) : (
                        <>
                            {(() => {
                                // Grouper les tests par type extrait
                                const typeRegex = /^([^\[]+)/;
                                const grouped = data.reduce((acc, dt) => {
                                    const match = dt.type.match(typeRegex);
                                    const extractedType = match ? match[1].replace(/-$/, '').trim() : '';
                                    if (!acc[extractedType]) acc[extractedType] = [];
                                    acc[extractedType].push(dt);
                                    return acc;
                                }, {});

                                // Afficher chaque groupe
                                return Object.entries(grouped).map(([extractedType, tests], groupIdx) => {
                                    const groupSuccess = tests.every(t => t.success);
                                    let realName = '';
                                    if (extractedType === '5-precurseurExplosif') {
                                        realName = "Parcours de Signature Précurseur Explosif";
                                    }
                                    
                                    if (tests.length === 1) {
                                        const dt = tests[0];
                                        return (
                                            <TestElement
                                                key={dt.id}
                                                index={groupIdx + 1}
                                                id={dt.id}
                                                title={dt.name}
                                                date={dt.createdAt}
                                                success={dt.success}
                                                logs={dt.logs}
                                            />
                                        );
                                    } else {
                                        // Récupérer la date updatedAt la plus récente du groupe
                                        const latestDate = tests.reduce((max, t) =>
                                            new Date(t.createdAt) > new Date(max) ? t.createdAt : max,
                                            tests[0].createdAt
                                        );
                                        const idTest = grouped[extractedType][0].id;
                                        return (
                                            <TestElement
                                                key={extractedType}
                                                index={groupIdx + 1}
                                                id={idTest}
                                                title={realName}
                                                date={latestDate}
                                                success={groupSuccess}
                                                mode="group"
                                                nbrsOfTests={tests.length}
                                            />
                                        );
                                    }
                                });
                            })()}
                        </>
                    )}
                </section>
            </main>
        </>
    );
}

export default AccueilPage;