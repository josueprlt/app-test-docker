import { useState, useEffect } from "react";
import {IconTask, IconArrowRepeat, IconArrow} from "../icons";
import { DiffBetweenTwoDates } from "../../utils/DiffBetweenTwoDates";
import ChipDate from "../ChipDate";
import Tooltip from '@mui/material/Tooltip';
import dayjs from 'dayjs';
import PlanModal from '../modals/PlanModal';
import MoonLoader from "react-spinners/MoonLoader";

const PlanElement = ({ id, title, desc, timeLaunch, unit, every, valid, date, tests, data }) => {
    const [convDate, setConvDate] = useState(null);
    const [newDate, setNewDate] = useState(null);
    const [modalData, setModalData] = useState([]);
    const [open, setOpen] = useState(false);

    const now = dayjs().second(0).millisecond(0);
    const launch = dayjs(date).second(0).millisecond(0);
    const isExpired = now.isAfter(launch);
    const isRunning = now.isSame(launch);
    const isValid = valid;

    const everyTranslation = {
        day: 'jour',
        week: 'semaine',
        month: 'mois',
    };

    useEffect(() => {
        if (date) {
            setNewDate(new Date(date).toLocaleString('fr-FR', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }));

            setConvDate(DiffBetweenTwoDates(new Date() > new Date(date) ? 'Lancé il y a' : 'Lancement dans', new Date(date)));
        }
    }, [date]);

    const handleOpen = (id) => {
        if (data && tests) {
            const testIds = tests.map(ts => ts.testId);
            const filteredData = data.filter(dt => testIds.includes(dt.id));
            setModalData(filteredData);
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    return (
        <>
            <button onClick={() => handleOpen(id)} className={`relative flex justify-between gap-4 p-2 rounded-md overflow-hidden bg-gray-500 cursor-pointer hover:bg-gray-300`}>
                <Tooltip
                    title={newDate}
                    placement='top'
                    arrow
                    componentsProps={{
                        tooltip: {
                            sx: {
                                backgroundColor: '#3C3C3C',
                                color: '#fff',
                                fontSize: '13px',
                            }
                        }
                    }}
                >
                    <div className="flex items-center gap-5">
                        <h2 className="text-base font-bold">{title}</h2>
                        {!isRunning && isValid && <ChipDate txt={convDate} color={isExpired ? 'orange' : 'blue'} />}
                        {isRunning && <MoonLoader color="#00B521" size={15} />}
                    </div>
                </Tooltip>

                <div className="flex items-center gap-2">
                  <span
                      className={`relative block w-4 h-4 rounded-full ${
                          !isValid ? 'bg-red-500' : isRunning ? 'bg-green-500' : isExpired ? 'bg-gray-700' : 'bg-blue-500'
                      } before:absolute before:w-2 before:h-2 before:bg-white-500 before:rounded-full before:top-[4px] before:left-[4px]`}
                  ></span>
                    <p
                        className={`hidden text-base font-medium sm:block ${
                            !isValid
                                ? 'text-red-500'
                                : isRunning
                                    ? 'text-green-500'
                                    : isExpired
                                        ? 'text-gray-700'
                                        : 'text-blue-500'
                        }`}
                    >
                        {!isValid ? 'plan inactif' : isRunning ? 'en cours' : isExpired ? 'plan expiré' : 'en attente'}
                    </p>
                </div>

                <div className="flex gap-5">
                    <Tooltip
                        title={
                            <span style={{ color: '#fff', fontWeight: 'bold' }}>
                            {(every && unit) && every > 1 ? `Tous les ${every} ${everyTranslation[unit]}s` : `Tous les ${every} ${everyTranslation[unit]}`}
                        </span>
                        }
                        placement='top'
                        arrow
                        componentsProps={{
                            tooltip: {
                                sx: {
                                    backgroundColor: '#3C3C3C',
                                    color: '#fff',
                                    fontSize: '13px',
                                }
                            }
                        }}
                    >
                        <div className={`flex justify-center items-center rounded-xl gap-2 px-2 py-px ${!isValid ? 'bg-red-500' : 'bg-blue-500'}`}>
                            <IconArrowRepeat />
                        </div>
                    </Tooltip>

                    <Tooltip
                        title={
                            <span style={{ color: '#fff', fontWeight: 'bold' }}>
                            {tests.length} {tests.length > 1 ? 'Tests associés' : 'Test associé'}
                        </span>
                        }
                        placement='top'
                        arrow
                        componentsProps={{
                            tooltip: {
                                sx: {
                                    backgroundColor: '#3C3C3C',
                                    color: '#fff',
                                    fontSize: '13px',
                                }
                            }
                        }}
                    >
                        <div className={`flex justify-center items-center rounded-xl gap-2 px-2 py-px ${!isValid ? 'bg-red-500' : 'bg-blue-500'}`}>
                            <IconTask />
                            <p className="text-white-500 text-lg font-semibold">{tests.length}</p>
                        </div>
                    </Tooltip>
                </div>
            </button>
            <PlanModal
                open={open}
                handleClose={handleClose}
                data={data}
                tests={modalData}
                id={id}
                title={title}
                desc={desc}
                timeLaunch={timeLaunch}
                every={every}
                unit={unit}
                valid={valid}
            />
        </>
    );
};

export default PlanElement;