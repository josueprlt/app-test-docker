import { useState, useEffect } from "react";
import { IconInfo, IconTrash } from "../icons";
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '../Button';
import CardComponent from '../CardComponent';
import SyncLoader from "react-spinners/SyncLoader";

const modalStyle = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    width: '80%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    outline: 'none',
    maxHeight: '90vh',
    overflowY: 'auto'
};


const PlanModal = ({ open, handleClose, data }) => {
    const [tests, setTests] = useState(null);

    useEffect(() => {
        setTests(data);
    }, [data]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={modalStyle}>
                <h2 className='text-xl text-center font-bold mb-6'>Options de planification</h2>

                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', marginBottom: '25px' }}>
                    <section className="w-full p-2 rounded-md bg-white-500 shadow">
                        <h2 className="text-lg font-bold py-2">Test(s) en file d'attente :</h2>
                        <div className="flex flex-wrap gap-2">
                            {tests === null ? (
                                <SyncLoader color="#3C3C3C" size={8} />
                            ) : (
                                tests.filter(dt => dt.exclud === false).length === 0 ? (
                                    <p className='italic text-gray-600'>Aucun test</p>
                                ) : (
                                    tests
                                        .filter(dt => dt.exclud === false)
                                        .map((dt) => (
                                            <div key={dt.id}>
                                                <CardComponent onClick={() => toggleExclud(dt.id)} title={dt.name} description={dt.description} excluded={dt.exclud} testName={dt.type} />
                                            </div>
                                        ))
                                )
                            )}
                        </div>

                        <h2 className="text-lg font-bold py-2 pt-8">Test(s) exclus :</h2>
                        <div className="flex flex-wrap gap-2">
                            {tests === null ? (
                                <SyncLoader color="#3C3C3C" size={8} />
                            ) : (
                                tests.filter(dt => dt.exclud === true).length === 0 ? (
                                    <p className='italic text-gray-600'>Aucun test</p>
                                ) : (
                                    tests
                                        .filter(dt => dt.exclud === true)
                                        .map((dt) => (
                                            <div key={dt.id}>
                                                <CardComponent onClick={() => toggleExclud(dt.id)} title={dt.name} description={dt.description} excluded={dt.exclud} testName={dt.type} />
                                            </div>
                                        ))
                                )
                            )}
                        </div>
                    </section>
                </Stack>
            </Box>
        </Modal>
    );
};

export default PlanModal;