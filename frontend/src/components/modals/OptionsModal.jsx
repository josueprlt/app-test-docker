import { useState, useEffect } from "react";
import { IconInfo, IconTrash } from "../icons";
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '../Button';
import InfoOptionLaunch from '../InfoOptionLaunch';

const modalStyle = {
    position: 'absolute',
    width: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    outline: 'none',
};

const OptionsModal = ({ open, handleClose, opts, choiceOptions, setChoiceOptions, testName }) => {
    const [options, setOptions] = useState([]);
    const [switchTrue, setSwitchTrue] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Génère toutes les combinaisons possibles
    const generateCombinations = (choices) => {
        if (!choices.length) return [[]];
        const [first, ...rest] = choices;
        const restComb = generateCombinations(rest);
        return first.choice.flatMap(value =>
            restComb.map(comb => [value, ...comb])
        );
    };

    useEffect(() => {
    if (opts) {
        const sortedOpts = [...opts].sort((a, b) => a.id - b.id);
        setOptions(sortedOpts);
        setSelectedOptions(sortedOpts.map(opt => opt.choice[0]));
    }
}, [opts]);


    useEffect(() => {
        if (!switchTrue && options.length > 0) {
            const combinations = generateCombinations(options);
            const newCombinations = combinations.map(args => ({ testName, args }));

            // On garde les anciens choix d'autres tests
            setChoiceOptions(prev => [
                ...prev.filter(choice => choice.testName !== testName),
                ...newCombinations
            ]);
        }
    }, [switchTrue, options]);


    const handleChangeSwitch = () => {
        setSwitchTrue(prev => !prev);
        if (!switchTrue) {
            setChoiceOptions([]);
        }
    };

    const handleChange = (index, value) => {
        const updated = [...selectedOptions];
        updated[index] = value;
        setSelectedOptions(updated);
    };

    const addCustomChoice = () => {
        if (selectedOptions.length) {
            const args = [...selectedOptions];

            const newChoice = {
                testName,
                args
            };

            const isDuplicate = choiceOptions.some(
                choice =>
                    choice.testName === testName &&
                    JSON.stringify(choice.args) === JSON.stringify(args)
            );

            if (!isDuplicate) {
                setChoiceOptions(prev => [...prev, newChoice]);
            }
        }
    };

    const removeCustomChoice = (indexToRemove) => {
        const filtered = choiceOptions.filter(choice => choice.testName === testName);
        const globalIndexToRemove = choiceOptions.findIndex((choice, idx) => (
            choice.testName === testName &&
            JSON.stringify(choice.args) === JSON.stringify(filtered[indexToRemove].args)
        ));
        if (globalIndexToRemove !== -1) {
            setChoiceOptions(prev => prev.filter((_, i) => i !== globalIndexToRemove));
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            className='overflow-auto'
        >
            <Box sx={modalStyle}>
                <h2 className='text-xl text-center font-bold mb-6'>Options de lancement</h2>

                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', marginBottom: '25px' }}>
                    <Typography>Tous</Typography>
                    <Switch checked={switchTrue} onChange={handleChangeSwitch} />
                    <Typography>Personnalisé</Typography>
                </Stack>

                {switchTrue && (
                    <>
                        <section className="flex justify-between mb-3">
                            {options.length > 0 ? (
                                options.map((option, index) => (
                                    <div key={index} className="flex flex-col items-center gap-2 py-2">
                                        <div className='flex items-center gap-2'>
                                            <h4 className='font-semibold'>Option n°{index + 1}</h4>
                                            <Tooltip
                                                title={
                                                    <span style={{ color: '#fff', fontWeight: 'bold' }}>
                                                        {option.question ? option.question : "Aucune question"}
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
                                ))
                            ) : (
                                <p className='w-full text-center italic text-gray-600'>Aucune option de lancement pour ce test</p>
                            )}
                        </section>
                        <Button
                            className="w-full p-2 text-md justify-center"
                            icon="hidden"
                            onClick={addCustomChoice}
                        >
                            Ajouter
                        </Button>
                    </>
                )}

                <div className="flex flex-col gap-1 mt-6">
                    {choiceOptions
                        .filter(choice => choice.testName === testName)
                        .map((choice, index) => (
                            <div key={index} className="flex justify-between border border-gray-600 rounded-md p-1">
                                <InfoOptionLaunch optionsChoice={choice.args} />
                                <button className="cursor-pointer" onClick={() => removeCustomChoice(index)}>
                                    <IconTrash fill="#EB0000" className="w-[25px] h-[25px]" />
                                </button>
                            </div>
                        ))
                    }
                </div>
            </Box>
        </Modal>
    );
};

export default OptionsModal;