import { useState, useEffect } from "react";
import { IconCheck, IconCross, IconBack, IconWarn } from "../icons";
import { DiffBetweenTwoDates } from "../../utils/DiffBetweenTwoDates";
import ChipDate from "../ChipDate";
import { Link } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";

const TestElement = ({ id = 0, index, title, date, success, logs = [], mode = "default", nbrsOfTests = 1 }) => {
    const [convDate, setConvDate] = useState(null);
    const [convDate2, setConvDate2] = useState(null);
    const [months, setMonths] = useState(["Jan.", "Fév.", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Sept.", "Oct.", "Nov.", "Déc."]);
    const [successSteps, setSuccessSteps] = useState(null)
    const [errorsSteps, setErrorsSteps] = useState(null)

    useEffect(() => {
        if (logs) {
            setSuccessSteps(logs.filter(log => log.success === true).length);
            setErrorsSteps(logs.filter(log => log.success === false).length);
        }

        if (date) {
            setConvDate(`Le ${new Date(date).getDate()} ${months[new Date(date).getMonth()]} ${new Date(date).getFullYear()} à ${new Date(date).getHours()}h`);
            setConvDate2(DiffBetweenTwoDates('Il y a', date));
        }
    }, []);

    let statusIcon;
    let bgElt;
    if (success === true) {
        statusIcon = <IconCheck className="w-10 sm:w-[60px]" />;
        bgElt = 'before:to-green-300';
    } else if (success === false) {
        statusIcon = <IconCross className="w-10 sm:w-[60px]" />;
        bgElt = 'before:to-red-300';
    } else {
        statusIcon = <IconWarn className="w-10 sm:w-[60px]" />;
        bgElt = 'before:to-orange-300';
    }

    return (
        <Link to={`/test/${id}`} className={`relative flex justify-between gap-4 rounded-md overflow-hidden bg-gray-500 cursor-pointer before:w-[75%] before:h-full before:absolute before:top-0 before:right-0 before:bg-linear-to-r before:from-gray-transparent-500 before:z-10 hover:bg-gray-300 ${bgElt}`}>
            <section className="z-20">
                <div className="absolute -translate-x-[65px] flex justify-end items-center w-[107px] h-full pr-[15px] rounded-full bg-blue-300 text-blue-500 sm:w-[131px] sm:h-full sm:-translate-x-[75px] sm:pr-[17px]">
                    <p className="font-bold sm:text-xl">{index}</p>
                </div>

                <div className="flex flex-col gap-5 h-full justify-between ml-14 py-2 sm:ml-20 sm:py-3">
                    <div className="flex items-center flex-wrap gap-2">
                        <h2 className="font-bold sm:text-2xl">{title}</h2>
                        {mode === "group" && <ChipDate txt={`Groupe de ${nbrsOfTests} Tests`} color="black" direction="hidden" icon="collection" className="rounded-full h-min px-2 py-1 translate-y-[2px]" />}
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="hidden text-base sm:block">{convDate}</p>
                        <ChipDate txt={convDate2} />
                    </div>
                </div>
            </section>

            <section className="flex items-center gap-10 z-20 lg:gap-30">
                {mode !== 'group' && (
                    <div className="hidden items-center gap-2 md:flex">
                        {success === true || success === false && (
                            <div className="flex flex-row items-center gap-1">
                                <div className="w-[22px] h-[22px] rounded-md bg-blue-500"></div>
                                <p className="font-bold text-blue-500">{successSteps + errorsSteps}</p>
                            </div>
                        )}
                        {success === true && (
                            <div className="flex flex-row items-center gap-1">
                                <div className="w-[22px] h-[22px] rounded-md bg-green-500"></div>
                                <p className="font-bold text-green-500">{successSteps}</p>
                            </div>
                        )}
                        {success === false && (
                            <div className="flex flex-row items-center gap-1">
                                <div className="w-[22px] h-[22px] rounded-md bg-red-500"></div>
                                <p className="font-bold text-red-500">{errorsSteps}</p>
                            </div>
                        )}
                        {success === null && (
                            <div className="flex flex-row items-center gap-3">
                                <MoonLoader color="#eba800" size={15} />
                                <p className="hidden text-orange-500 xl:block">En cours d’éxécution...</p>
                            </div>
                        )}
                    </div>
                )}

                <div className="w-max flex items-center justify-end pr-4 sm:pr-0">
                    {statusIcon}
                </div>

                <div className="hidden pr-4 sm:block sm:pr-8 md:pr-12">
                    <IconBack />
                </div>
            </section>
        </Link>
    );
};

export default TestElement;