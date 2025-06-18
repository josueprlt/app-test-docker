import SyncLoader from "react-spinners/SyncLoader";
import {CardComponent} from "./CardComponent.jsx";
import {updateTestExcludById} from "../../api/test/UpdateTestExcludById.jsx";

export const QueueComponent = ({
                            tests,
                            setTests
                        }) => {

    const toggleExclud = async (id) => {
        await updateTestExcludById(id);

        setTests(prev =>
            prev?.map(test =>
                test.id === id ? {...test, exclud: !test.exclud} : test
            ) ?? null
        );
    };

    return (
        <section className="w-full p-2 rounded-md bg-white-500 shadow">
            <h2 className="text-lg font-bold py-2">Test(s) en file d'attente :</h2>
            <div className="flex flex-wrap gap-2">
                {tests === null ? (
                    <SyncLoader color="#3C3C3C" size={8}/>
                ) : (
                    tests.filter(dt => dt.exclud === false).length === 0 ? (
                        <p className='italic text-gray-600'>Aucun test</p>
                    ) : (
                        tests
                            .filter(dt => dt.exclud === false)
                            .map((dt) => (
                                <div key={dt.id}>
                                    <CardComponent onClick={() => toggleExclud(dt.id)} title={dt.name}
                                                   description={dt.description} descVisible={false}
                                                   excluded={dt.exclud}/>
                                </div>
                            ))
                    )
                )}
            </div>

            <h2 className="text-lg font-bold py-2 pt-8">Test(s) exclus :</h2>
            <div className="flex flex-wrap gap-2">
                {tests === null ? (
                    <SyncLoader color="#3C3C3C" size={8}/>
                ) : (
                    tests.filter(dt => dt.exclud === true).length === 0 ? (
                        <p className='italic text-gray-600'>Aucun test</p>
                    ) : (
                        tests
                            .filter(dt => dt.exclud === true)
                            .map((dt) => (
                                <div key={dt.id}>
                                    <CardComponent onClick={() => toggleExclud(dt.id)} title={dt.name}
                                                   description={dt.description} descVisible={false}
                                                   excluded={dt.exclud}/>
                                </div>
                            ))
                    )
                )}
            </div>
        </section>
    );
};