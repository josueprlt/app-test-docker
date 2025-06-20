import {useEffect, useMemo, useState} from "react";
import ChartComponent from "../ChartComponent.jsx";
import optionsDoughnut from "../optionsChart/optionsDoughnut.jsx";
import optionsLineHome from "../optionsChart/optionsLineHome.jsx";
import SyncLoader from "react-spinners/SyncLoader";

const AllCharts = ({allData}) => {
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
        <section className="flex flex-wrap justify-between p-2 rounded-md bg-white-500 shadow">
            {(successAllTests || errorsAllTests) ? (
                <>
                    <ChartComponent title="Proportion totale de cas de tests réussi(s) et échoué(s)"
                                    data={doughnutAllData} options={optionsDoughnut} type="doughnut"
                                    props={"w-full sm:w-1/2"}/>
                    <ChartComponent title="Historique total de l'activité de test" data={lineChartAllData}
                                    options={optionsLineHome} type="homeLine" props={"w-full sm:w-1/2"}/>
                </>
            ) : (
                <>
                    <div className="flex flex-col justify-center items-center w-full sm:w-1/2 p-2">
                        <SyncLoader color="#3C3C3C" size={15}/>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full sm:w-1/2 h-52 p-2">
                        <SyncLoader color="#3C3C3C" size={15}/>
                    </div>
                </>
            )}
        </section>
    );
};

export default AllCharts;