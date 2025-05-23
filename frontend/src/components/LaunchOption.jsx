import { useEffect, useState } from 'react';
import { IconInfo } from "./icons";
import SyncLoader from "react-spinners/SyncLoader";
import { Tooltip } from "@heroui/tooltip";

const LaunchOption = ({ data, onSelectOption }) => {
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Met à jour les options et initialise les choix sélectionnés
    useEffect(() => {
        if (data?.options) {
            setOptions(data.options);
            const initialSelections = data.options.map(opt => opt.choice[0]);
            setSelectedOptions(initialSelections);
            onSelectOption(initialSelections);
        }
    }, [data]);

    // Appelé à chaque changement de select
    const handleChange = (index, value) => {
        const updated = [...selectedOptions];
        updated[index] = value;
        setSelectedOptions(updated);
        onSelectOption(updated);
    };

    return (
        <section className="col-span-1 w-full gap-4 py-2 px-5 rounded-md bg-white-500 shadow md:py-4 md:p-10 xl:gap-6">
            {data === null || options === null ? (
                <SyncLoader color="#3C3C3C" size={8} />
            ) : (
                <>
                    <h3 className="text-xl text-center font-bold">Options de lancement</h3>
                    <div className='flex flex-row justify-between mt-5'>
                        {options.map((option, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 py-2">
                                <div className='flex items-center gap-2'>
                                    <h4 className='font-semibold'>Option n°{index + 1}</h4>
                                    <Tooltip content={option.question} color='default' closeDelay={0} showArrow={true}>
                                        <IconInfo className="w-5 h-5 cursor-pointer" />
                                    </Tooltip>
                                </div>
                                <select
                                    name={`select-n-${index}`}
                                    id={`select-n-${index}`}
                                    className="select-options mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={selectedOptions[index]}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                >
                                    {option.choice.map((opt, i) => (
                                        <option key={i} value={opt} className="text-gray-700">
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default LaunchOption;