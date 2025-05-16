import { useState } from 'react';

const StepsTableau = () => {
    const [stepsTableau, setStepsTableau] = useState(['Etapes', 'Status', 'Message', 'Délai'])

    return (
        <>
            <table>
                <thead>
                    <tr>
                        {stepsTableau.map((step) => (
                            <th className='pr-4 text-left' scope="col" key={step}>{step}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className='pr-4 text-left' scope="row">Chris</th>
                        <td className='pr-4 text-left'>HTML tables</td>
                        <td className='pr-4 text-left'>22</td>
                        <td className='text-left'>220ms</td>
                    </tr>
                    <tr>
                        <th className='pr-4 text-left' scope="row">Chris</th>
                        <td className='pr-4 text-left'>HTML tables eeeeeeeeeeeeeeeeeeeee</td>
                        <td className='pr-4 text-left'>22</td>
                        <td className='text-left'>220ms</td>
                    </tr>
                    <tr>
                        <th className='pr-4 text-left' scope="row">Chris</th>
                        <td className='pr-4 text-left'>HTML tables</td>
                        <td className='pr-4 text-left'>22</td>
                        <td className='text-left'>220ms</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default StepsTableau;