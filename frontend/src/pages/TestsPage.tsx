import { useState, useEffect } from "react";
import { IconBack } from "../components/icons";
import CardComponent from "../components/CardComponent";
import LaunchSection from "../components/LaunchSection";
import Button from "../components/Button";
import { Link } from "react-router";
import SyncLoader from "react-spinners/SyncLoader";
import PlanModals from "../components/modals/PlanModals";
import PlanElement from "../components/elements/PlanElement";

function TestsPage({ data = null }: {
    data: { id: number; name: string; type: string; description: string; exclud: boolean; updatedAt: string; success: boolean; logs: []; options: [] }[] | null
}) {
    const [tests, setTests] = useState<typeof data>(data);
    const [plans, setPlans] = useState(null);
    const [choiceOptions, setChoiceOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetch('http://localhost:5001/api/plans/all')
            .then(response => response.json())
            .then(data => setPlans(data))
            .catch(error => console.error('Error fetching plans:', error));
    }, []);

    useEffect(() => {
        setTests(data);
    }, [data]);

    useEffect(() => {
    }, [tests, choiceOptions]);

    // Fonction pour basculer le statut exclud d'un test
    // @ts-ignore
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

            <LaunchSection data={tests} title="Tests sélectionnés" txtChipInactif="Lancez tous les tests" />

            <section className="w-full p-2 rounded-md bg-white-500 shadow">
                <h2 className="text-lg font-bold py-2">Test(s) en file d'attente :</h2>
                <div className="flex flex-wrap gap-2">
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
                                        <CardComponent onClick={() => toggleExclud(dt.id)} title={dt.name} description={dt.description} descVisible={false} excluded={dt.exclud} choiceOptions={choiceOptions} setChoiceOptions={setChoiceOptions} testName={dt.type} />
                                    </div>
                                ))
                        )
                    )}
                </div>

                <h2 className="text-lg font-bold py-2 pt-8">Test(s) exclus :</h2>
                <div className="flex flex-wrap gap-2">
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
                                        <CardComponent onClick={() => toggleExclud(dt.id)} title={dt.name} description={dt.description} descVisible={false} excluded={dt.exclud} choiceOptions={choiceOptions} setChoiceOptions={setChoiceOptions} testName={dt.type} />
                                    </div>
                                ))
                        )
                    )}
                </div>
            </section>

            <section className="p-2 rounded-md bg-white-500 shadow">
                <div className="flex flex-wrap justify-between mb-5">
                    <h3 className="font-bold sm:text-2xl">Planifiez une batterie de tests</h3>
                    <Button onClick={handleOpen} >Planifiez</Button>
                    <PlanModals
                        open={open}
                        handleClose={handleClose}
                        data={tests}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    {Array.isArray(plans) ? (
                        plans.length > 0 ? (
                            plans.map((plan, index) => (
                                <PlanElement key={index} id={plan.id} title={plan.name} desc={plan.description} timeLaunch={plan.dateTimeLaunch} unit={plan.repeatUnit} every={plan.repeatEvery} valid={plan.valid} date={plan.dateTimeLaunch} tests={plan.planTests} data={tests}/>
                            ))
                        ) : (
                            <p className="text-center py-4 text-gray-600 italic">Aucun plan à afficher</p>
                        )
                    ) : (
                        <SyncLoader color="#3C3C3C" size={8} />
                    )}

                </div>

            </section>
        </main>
    );
}

export default TestsPage;