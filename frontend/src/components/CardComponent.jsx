import { useState } from 'react';
import { IconPlus, IconMinus, IconGear } from "../components/icons";
import { TruncateText } from "../utils/TruncateText";
import OptionsModal from "./OptionsModal";

const CardComponent = ({
    title,
    description,
    excluded,
    onClick,
    opts,
    choiceOptions,
    setChoiceOptions,
    testName
}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div className="relative w-2xs flex flex-row gap-5 justify-between px-2 py-1 pl-3 rounded-md bg-gray-500 overflow-hidden before:absolute before:w-2 before:h-full before:bg-blue-500 before:-left-1 before:top-0">
                <div className="flex flex-col text-left gap-2">
                    <h3 className="text-base font-bold">{TruncateText(26, title)}</h3>
                    <p className="text-sm">{TruncateText(65, description)}</p>
                </div>
                <div className={`flex flex-col ${opts.length > 0 ? 'justify-between' : 'justify-end'}`}>
                    {opts.length > 0 && (
                        <>
                            <button onClick={handleOpen} className="flex justify-center items-center w-[31px] h-[31px] rounded-full bg-blue-500 cursor-pointer">
                                <IconGear fill="#E7F0FE" className="" />
                            </button>
                            <OptionsModal
                                open={open}
                                handleClose={handleClose}
                                opts={opts}
                                choiceOptions={choiceOptions}
                                setChoiceOptions={setChoiceOptions}
                                testName={testName}
                            />
                        </>
                    )}
                    <button onClick={onClick} className="cursor-pointer">
                        {excluded ? (
                            <IconPlus fill="#00B521" className="w-[31px] h-[31px]" />
                        ) : (
                            <IconMinus fill="#EB0000" className="w-[31px] h-[31px]" />
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default CardComponent;