import { useState, useEffect } from "react";
import { IconCalendar, IconCheck, IconCross, IconBack } from "./icons";
import { DiffBetweenTwoDates } from "../utils/DiffBetweenTwoDates";
import { Link } from "react-router";

const TestElement = ({ id, index, title, date, success, logs }) => {
    const [convDate, setConvDate] = useState(null);
    const [convDate2, setConvDate2] = useState(null);
    const [months, setMonths] = useState(["Jan.", "Fév.", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Sept.", "Oct.", "Nov.", "Déc."]);
    const [successSteps, setSuccessSteps] = useState(null)
    const [errorsSteps, setErrorsSteps] = useState(null)
    
    useEffect(() => {
        setSuccessSteps(logs.filter(log => log.success === true).length);
        setErrorsSteps(logs.filter(log => log.success === false).length);
        setConvDate(`Le ${new Date(date).getDate()} ${months[new Date(date).getMonth()]} ${new Date(date).getFullYear()} à ${new Date(date).getHours()}h`);
        setConvDate2(DiffBetweenTwoDates(date));
    }, []);

    return (
        <Link to={`/test/${id}`} className={`relative flex justify-between gap-4 h-[80px] rounded-md overflow-hidden bg-gray-500 cursor-pointer before:w-[75%] before:h-full before:absolute before:top-0 before:right-0 before:bg-linear-to-r before:from-gray-transparent-500 ${success ? 'before:to-green-300' : 'before:to-red-300'} before:z-10 sm:h-[100px] hover:bg-gray-300`}>
            <section className="z-20">
                <div className="absolute -translate-x-[40px] flex justify-end items-center w-[80px] h-[80px] pr-[15px] rounded-full bg-blue-300 text-blue-500 sm:w-[100px] sm:h-[100px] sm:-translate-x-[50px] sm:pr-[17px]">
                    <p className="font-bold sm:text-xl">{index}</p>
                </div>

                <div className="flex flex-col h-full justify-between ml-14 py-2 sm:ml-20 sm:py-3">
                    <h2 className="font-bold sm:text-2xl">{title}</h2>
                    <div className="flex items-center gap-2">
                        <p className="hidden text-base sm:block">{convDate}</p>
                        <span className="flex flex-row items-center w-max gap-2 text-xs font-semibold rounded-md bg-blue-300 px-2 py-1 text-blue-500">
                            <IconCalendar />
                            <p>{convDate2}</p>
                        </span>
                    </div>
                </div>
            </section>

            <section className="flex items-center gap-10 z-20 lg:gap-30">
                <div className="hidden items-center gap-2 md:flex">
                    <div className="flex flex-row items-center gap-1">
                        <div className="w-[22px] h-[22px] rounded-md bg-blue-500"></div>
                        <p className="font-bold text-blue-500">{successSteps + errorsSteps}</p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <div className="w-[22px] h-[22px] rounded-md bg-green-500"></div>
                        <p className="font-bold text-green-500">{successSteps}</p>
                    </div>
                    {success === false && (
                        <div className="flex flex-row items-center gap-1">
                            <div className="w-[22px] h-[22px] rounded-md bg-red-500"></div>
                            <p className="font-bold text-red-500">{errorsSteps}</p>
                        </div>
                    )}
                </div>

                <div className="w-max flex items-center justify-end pr-4 sm:pr-0">
                    {success ? <IconCheck className="w-10 sm:w-[60px]" /> : <IconCross className="w-10 sm:w-[60px]" />}
                </div>

                <div className="hidden pr-4 sm:block sm:pr-8 md:pr-12">
                    <IconBack />
                </div>
            </section>
        </Link>
    );
};

export default TestElement;