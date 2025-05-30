import { useState, useEffect } from "react";
import { IconBack } from "../components/icons";
import CardComponent from "../components/CardComponent";
import LaunchSection from "../components/LaunchSection";
import { Link } from "react-router";
import SyncLoader from "react-spinners/SyncLoader";

function TestsPage({ data = null }: {
    data: { id: number; name: string; type: string; description: string; exclud: boolean; updatedAt: string; success: boolean; logs: []; options: [] }[] | null
}) {
    const [tests, setTests] = useState<typeof data>(data);
    const [choiceOptions, setChoiceOptions] = useState([]);

    // Met à jour l'état local si data change (ex: lors du chargement initial)
    useEffect(() => {
        setTests(data);
    }, [data]);

    useEffect(() => {
        console.log(tests);
        console.log(choiceOptions);
    }, [tests, choiceOptions]);

    // Fonction pour basculer le statut exclud d'un test
    const toggleExclud = async (id: number) => {
        await fetch(`http://localhost:5001/api/tests/exclud/${id}`, {
            method: 'PUT'
        })
            .then(response => response.json())
            .catch(error => console.error('Error fetching tests:', error));

        setTests(prev =>
            prev?.map(test =>
                test.id === id ? { ...test, exclud: !test.exclud } : test
            ) ?? null
        );
    };

    return (
        <main className="flex flex-col gap-2 p-2 bg-gray-500 text-black-500 sm:p-4 sm:gap-4 md:px-10">
            <section>
                <div className="flex flex-row gap-2">
                    <Link to="/" className="p-2 flex justify-center items-center rounded-md bg-white-500 shadow w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] md:w-[56px] md:h-[56px] hover:bg-gray-300">
                        <IconBack className="h-7 rotate-180 sm:h-8 md:h-9" />
                    </Link>
                    <div className="w-full flex justify-center items-center rounded-md bg-white-500 shadow">
                        <h1 className="text-xl font-bold text-center py-2 sm:text-2xl md:text-4xl">Batterie de tests</h1>
                    </div>
                </div>
            </section>

            <LaunchSection data={tests} optionsChoice={choiceOptions} title="Tests sélectionnés" txtChipInactif="Lancez tous les tests" InfoOptions="hidden" />

            <section className="w-full p-2 rounded-md bg-white-500 shadow">
                <h2 className="text-lg font-bold py-2">Test(s) en file d'attente :</h2>
                <div className="flex gap-2">
                    {tests === null ? (
                        <SyncLoader color="#3C3C3C" size={8} />
                    ) : (
                        tests.filter(dt => dt.exclud === false).length === 0 ? (
                            <p className='italic text-gray-600'>Aucun test</p>
                        ) : (
                            tests
                                .filter(dt => dt.exclud === false)
                                .map((dt) => (
                                    <div key={dt.id}>
                                        <CardComponent onClick={() => toggleExclud(dt.id)} title={dt.name} description={dt.description} excluded={dt.exclud} opts={dt.options} choiceOptions={choiceOptions} setChoiceOptions={setChoiceOptions} testName={dt.type} />
                                    </div>
                                ))
                        )
                    )}
                </div>

                <h2 className="text-lg font-bold py-2 pt-8">Test(s) exclus :</h2>
                <div className="flex gap-2">
                    {tests === null ? (
                        <SyncLoader color="#3C3C3C" size={8} />
                    ) : (
                        tests.filter(dt => dt.exclud === true).length === 0 ? (
                            <p className='italic text-gray-600'>Aucun test</p>
                        ) : (
                            tests
                                .filter(dt => dt.exclud === true)
                                .map((dt) => (
                                    <div key={dt.id}>
                                        <CardComponent onClick={() => toggleExclud(dt.id)} title={dt.name} description={dt.description} excluded={dt.exclud} opts={dt.options} choiceOptions={choiceOptions} setChoiceOptions={setChoiceOptions} testName={dt.type} />
                                    </div>
                                ))
                        )
                    )}
                </div>
            </section>
        </main>
    );
}

export default TestsPage;