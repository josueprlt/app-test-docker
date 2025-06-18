import {useEffect, useState} from 'react';
import {TransformInSecAndMs} from '../../utils/TransformInSecAndMs.jsx';

const StepsTableau = ({logs, delay}) => {
    const [stepsTableau] = useState(['Étapes', 'Status', 'Message', 'Délai', 'Provenance']);
    const [logsTableau, setLogsTableau] = useState(null);
    const [delayTableau, setDelayTableau] = useState(null);

    useEffect(() => {
        setLogsTableau(logs);
    }, [logs]);

    useEffect(() => {
        if (delay?.datasets?.[0]?.data) {
            setDelayTableau(delay.datasets[0].data);
        }
    }, [delay]);

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full table-auto border border-gray-300 rounded-md">
                <thead className="bg-gray-300">
                <tr>
                    {stepsTableau.map((step) => (
                        <th
                            key={step}
                            scope="col"
                            className="px-4 py-2 text-left text-sm font-medium text-black-500"
                        >
                            {step}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {logsTableau && logsTableau.length > 0 ? (
                    logsTableau.map((log, idx) => (
                        <tr key={idx} className="even:bg-gray-100">
                            <td className="px-4 py-2 text-left">{idx + 1}</td>
                            <td className="px-4 py-2 text-left">
                                    <span
                                        className={`inline-block w-6 h-6 rounded-full ${log.success ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                    ></span>
                            </td>
                            <td className="px-4 py-2 text-left">{log.message}</td>
                            <td className="px-4 py-2 text-left">
                                {delayTableau && delayTableau[idx]
                                    ? TransformInSecAndMs(delayTableau[idx].y)
                                    : '-'}
                            </td>
                            <td className="px-4 py-2 text-left">{log.provenance}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={stepsTableau.length}
                            className="text-center py-4 text-gray-600 italic"
                        >
                            Aucun log à afficher
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default StepsTableau;