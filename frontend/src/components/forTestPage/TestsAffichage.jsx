import { useState, useEffect } from "react";
import { IconCheck, IconCross, IconWarn } from "../icons.jsx";

export const TestsAffichage = ({ filteredData = null, ChangeInfoTest, clickedElt, setClickedElt }) => {
    const [filtreData, setFiltreData] = useState(null);

    useEffect(() => {
        if (filteredData) {
            const regex = /\[([^\]]+)\]/;
            const newData = filteredData.map(item => {
                const match = item.type.match(regex);
                let values = [];
                if (match && match[1]) {
                    values = match[1].split('/').map(v => v.trim());
                }
                return { ...item, extractedValues: values };
            });
            setFiltreData(newData);
            setClickedElt(filteredData[0].id)
        }
    }, [filteredData]);

    useEffect(() => {
    }, []);

    const classElt = {
        actif: 'bg-blue-300 text-blue-500',
        notActif: 'bg-white-500 hover:bg-gray-300 cursor-pointer'
    };

    return (
        <section className="flex gap-2 w-full mt-10 gap-2 py-2 rounded-md bg-gray-500 overflow-x-auto xl:gap-3">
            {filtreData && clickedElt && (
                filtreData.map((dt, index) => (
                    <div
                        onClick={() => ChangeInfoTest(dt.id)}
                        key={index}
                        className={`flex items-center gap-1 px-1 py-2 rounded-md xl:gap-3 ${clickedElt === dt.id ? classElt.actif : classElt.notActif}`}
                    >
                        {dt.success === true ? (
                            <IconCheck className="w-[22px] h-[22px]" />
                        ) : dt.success === false ? (
                            <IconCross className="w-[22px] h-[22px]" />
                        ) : (
                            <IconWarn className="w-[22px] h-[22px]" />
                        )}
                        {dt.extractedValues.map((ev, idx) => {
                            const isLast = idx === dt.extractedValues.length - 1;
                            return (
                                <div key={idx} className="flex gap-1 xl:gap-3">
                                    <span>{ev}</span>
                                    <span>{!isLast && "/"}</span>
                                </div>
                            );
                        })}
                    </div>
                ))
            )}
        </section>
    );
};