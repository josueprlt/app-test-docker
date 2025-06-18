import {useState, useEffect} from 'react';
import {IconPlus, IconMinus} from "../icons.jsx";
import {TruncateText} from "../../utils/TruncateText.jsx";
import InfoOptionLaunch from "../InfoOptionLaunch.jsx";
import {RegexForTitle} from "../../utils/RegexForTitle.jsx";

export const CardComponent = ({
                           title, description, descVisible = true, excluded, onClick, iconVisible = true, className = ''
                       }) => {
    const [newTitle, setNewTitle] = useState('');
    const [args, setArgs] = useState(null);

    useEffect(() => {
        if (title) {
            const results = RegexForTitle(title);
            setNewTitle(results.newTitle);
            setArgs(results.args)
        }
    }, [title]);

    return (
        <div
            className={`relative w-min h-full flex flex-row gap-5 justify-between px-2 py-1 pl-3 rounded-md bg-gray-500 overflow-hidden before:absolute before:w-2 before:h-full before:bg-blue-500 before:-left-1 before:top-0 ${className}`}>
            <div className="flex flex-col text-left gap-2">
                <h3 className="text-base font-bold text-nowrap">{TruncateText(26, newTitle)}</h3>
                <div className='flex'>
                    {args && <InfoOptionLaunch optionsChoice={args}/>}
                </div>
                {descVisible && <p className="text-sm">{TruncateText(65, description)}</p>}
            </div>

            {iconVisible && (<div className={`flex flex-col justify-end`}>
                <button onClick={onClick} className="cursor-pointer">
                    {excluded ? (<IconPlus fill="#00B521" className="w-[31px] h-[31px]"/>) : (
                        <IconMinus fill="#EB0000" className="w-[31px] h-[31px]"/>)}
                </button>
            </div>)}
        </div>
    );
};