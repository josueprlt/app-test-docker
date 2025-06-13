import { useState, useEffect } from 'react';
import { IconPlus, IconMinus, IconGear } from "../components/icons";
import { TruncateText } from "../utils/TruncateText";
import InfoOptionLaunch from "./InfoOptionLaunch";
import { RegexForTitle } from "../utils/RegexForTitle";

const CardComponent = ({
    title,
    description,
    descVisible = true,
    excluded,
    onClick,
    choiceOptions,
    setChoiceOptions,
    iconVisible = true,
    testName,
    className = ''
}) => {
    const [newTitle, setNewTitle] = useState('');
    const [args, setArgs] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (title) {
            const results = RegexForTitle(title);
            setNewTitle(results.newTitle);
            setArgs(results.args)
        }
    }, [title]);

    return (
        <>
            <div className={`relative w-min h-full flex flex-row gap-5 justify-between px-2 py-1 pl-3 rounded-md bg-gray-500 overflow-hidden before:absolute before:w-2 before:h-full before:bg-blue-500 before:-left-1 before:top-0 ${className}`}>
                <div className="flex flex-col text-left gap-2">
                    <h3 className="text-base font-bold text-nowrap">{TruncateText(26, newTitle)}</h3>
                    <div className='flex'>
                        {args && <InfoOptionLaunch optionsChoice={args} />}
                    </div>
                    {descVisible && <p className="text-sm">{TruncateText(65, description)}</p>}
                </div>

                {iconVisible && (
                    <div className={`flex flex-col justify-end`}>
                        {/* {opts.length > 0 && (
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
                        )} */}
                        <button onClick={onClick} className="cursor-pointer">
                            {excluded ? (
                                <IconPlus fill="#00B521" className="w-[31px] h-[31px]" />
                            ) : (
                                <IconMinus fill="#EB0000" className="w-[31px] h-[31px]" />
                            )}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CardComponent;