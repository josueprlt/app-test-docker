import { useState, useEffect } from 'react'
import { IconBack } from "../components/icons";
import LaunchSection from "../components/LaunchSection";
import { useParams } from "react-router";
import { Link } from "react-router";
import SyncLoader from "react-spinners/SyncLoader";
import TestsAffichage from "../components/TestsAffichage";
import InfoOnTest from "../components/InfoOnTest";

function TestPage() {
    let params = useParams()
    let idElt = params.id;

    const [clickedElt, setClickedElt] = useState<any | null>(null);
    const [allData, setAllData] = useState<any>(null);
    const [data, setData] = useState<any>(null);
    const [selectData, setSelectData] = useState<any>(null);
    const [filterData, setFilterData] = useState<any>([]);
    const [outputDate, setOutputDate] = useState<any>(null);

    const months = ["Jan.", "Fév.", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Sept.", "Oct.", "Nov.", "Déc."];

    useEffect(() => {
        if (idElt) {
            setClickedElt(idElt);
        }

        fetch('http://localhost:5001/api/tests')
            .then(response => response.json())
            .then(data => setAllData(data))
            .catch(error => console.error('Error fetching tests:', error));

        fetch('http://localhost:5001/api/tests/' + idElt)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching tests:', error));
    }, []);

    useEffect(() => {
        if (!allData || !data || !data.type) return;

        const prefix = data.type.split('[')[0];
        const typeRegex = new RegExp(`^${prefix}`, "i");

        const matches = allData.filter(test => typeRegex.test(test.type));
        setFilterData(matches);
    }, [allData, data]);

    useEffect(() => {
        if (!data || !data.type) return;

        if (selectData) {
            console.log(selectData);
            setOutputDate(`le ${new Date(selectData[0].updatedAt).getDate()} ${months[new Date(selectData[0].updatedAt).getMonth()]} ${new Date(selectData[0].updatedAt).getFullYear()} à ${new Date(selectData[0].updatedAt).getHours()}h${new Date(selectData[0].updatedAt).getMinutes()}`);
        } else {
            setOutputDate(`le ${new Date(data.updatedAt).getDate()} ${months[new Date(data.updatedAt).getMonth()]} ${new Date(data.updatedAt).getFullYear()} à ${new Date(data.updatedAt).getHours()}h${new Date(data.updatedAt).getMinutes()}`);
        }
    }, [selectData, data]);

    const ChangeInfoTest = (id) => {
        const selectDt = allData.filter(dt => dt.id === id)
        setSelectData(selectDt);
        setClickedElt(id);
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
                                <h1 className="text-xl font-bold text-center py-2 sm:text-2xl md:text-4xl">{selectData ? selectData[0].name : data.name}</h1>
                            )}
                        </div>
                    </div>
                    <div className="w-full p-2 rounded-md bg-white-500 shadow mt-2">
                        {outputDate === null && data === null ? (
                            <SyncLoader color="#3C3C3C" size={8} />
                        ) : (
                            <>
                                <p className='mb-5'>{selectData ? selectData[0].description : data.description}</p>
                                <Link to="testest" className='text-blue-500 underline'>url de test</Link>
                                <p>Rapport généré {outputDate}</p>
                            </>
                        )}
                    </div>
                </section>
                
                {data && <LaunchSection data={selectData ? selectData : [data]} mode='one' />}

                {filterData.length > 1 && <TestsAffichage filteredData={filterData} ChangeInfoTest={ChangeInfoTest} clickedElt={clickedElt} setClickedElt={setClickedElt} />}

                <InfoOnTest data={selectData ? selectData[0] : data} />
            </main>
        </>
    );
}

export default TestPage;