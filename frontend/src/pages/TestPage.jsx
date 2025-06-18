import { useState, useEffect } from 'react'
import LaunchSection from "../components/LaunchSection";
import { useParams } from "react-router-dom";
import { TestsAffichage } from "../components/forTestPage/TestsAffichage";
import InfoOnTest from "../components/forTestPage/InfoOnTest";
import { fetchTests } from '../api/test/GetTests';
import { fetchTestById } from '../api/test/GetTestById';
import { Header } from '../components/forTestPage/Header.jsx';

function TestPage() {
    let params = useParams()
    let idElt = params.id;

    const [clickedElt, setClickedElt] = useState(null);
    const [allData, setAllData] = useState(null);
    const [data, setData] = useState(null);
    const [selectData, setSelectData] = useState(null);
    const [filterData, setFilterData] = useState([]);
    const [outputDate, setOutputDate] = useState(null);

    const months = ["Jan.", "Fév.", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Sept.", "Oct.", "Nov.", "Déc."];

    useEffect(() => {
        if (idElt) {
            setClickedElt(idElt);
        }

        fetchTests()
            .then(setAllData)
            .catch((err) => console.error('Error fetching tests:', err));

        fetchTestById({ id: idElt })
            .then(setData)
            .catch((err) => console.error('Error fetching test by id:', err));
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
                <Header data={data} selectData={selectData} outputDate={outputDate} />
                
                {data && <LaunchSection data={selectData ? selectData : [data]} mode='one' />}

                {filterData.length > 1 && <TestsAffichage filteredData={filterData} ChangeInfoTest={ChangeInfoTest} clickedElt={clickedElt} setClickedElt={setClickedElt} />}

                <InfoOnTest data={selectData ? selectData[0] : data} />
            </main>
        </>
    );
}

export default TestPage;