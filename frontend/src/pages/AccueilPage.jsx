import TestElement from "../components/elements/TestElement";
import Button from "../components/Button";
import SyncLoader from "react-spinners/SyncLoader";
import AllCharts from "../components/forAccueilPage/AllCharts.jsx";

function AccueilPage({data = null, allData = null}) {

    return (
        <>
            <main className="flex flex-col gap-2 p-2 bg-gray-500 text-black-500 sm:p-4 sm:gap-4 md:px-10">
                <section className="p-2 rounded-md bg-white-500 shadow">
                    <h1 className="text-xl font-bold text-center py-2 sm:text-2xl md:text-4xl">Accueil</h1>
                </section>

                {allData && (
                    <AllCharts allData={allData} />
                )}

                <section className="flex flex-wrap justify-between p-2 rounded-md bg-white-500 shadow">
                    <h3 className="font-bold sm:text-2xl">Exécutez une série de tests</h3>
                    <Button href={'/tests'}>S'y rendre</Button>
                </section>

                <section className="flex flex-col gap-2 p-2 rounded-md bg-white-500 shadow">
                    {data === null ? (
                        <>
                            <SyncLoader color="#3C3C3C" size={15}/>
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