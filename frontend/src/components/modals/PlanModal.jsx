import { useState, useEffect } from "react";
import {IconCrossStroke, IconInfo, IconPlus, IconTrash} from "../icons";
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '../Button';
import CardComponent from '../CardComponent';
import SyncLoader from "react-spinners/SyncLoader";
import TextField from "@mui/material/TextField";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import InfoOptionLaunch from "../InfoOptionLaunch.jsx";
import {RegexForTitle} from "../../utils/RegexForTitle.jsx";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
dayjs.locale('fr');

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


const PlanModal = ({ open, handleClose, data = [], id, title, desc, timeLaunch, every, unit, tests = [], valid }) => {
    const [newId, setNewId] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newTimeLaunch, setNewTimeLaunch] = useState(null);
    const [newValid, setNewValid] = useState(null);
    const [selectedTests, setSelectedTests] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [newTests, setNewTests] = useState([]);
    const [newUnit, setNewUnit] = useState('');
    const [newEvery, setNewEvery] = useState(1);

    const handleChangeUnit = (event) => {
        setNewUnit(event.target.value);
    };

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    useEffect(() => {
        if (id && title && timeLaunch && Array.isArray(data) && data.length > 0 && Array.isArray(tests) && tests.length > 0) {
            setNewId(id);
            setNewTitle(title || '');
            setNewDesc(desc || '');
            setNewTimeLaunch(dayjs(timeLaunch));
            setNewValid(valid ?? false);
            setSelectedTests(tests);
            setNewTests(data);
            setNewEvery(every)
            setNewUnit(unit)
        }
    }, [id, title, desc, valid, timeLaunch, every, unit, data, tests]);

    const handleSelectTest = (test) => {
        setSelectedTests((prev) => [...prev, test]);
        setOpenDialog(false);
    };
    const handleRemoveTest = (testId) => {
        setSelectedTests((prev) => prev.filter(test => test.id !== testId));
    };


    const handleRegexNewTitle = (name) => {
        let result = RegexForTitle(name);
        return result.newTitle;
    }

    const handleRegexArgs = (name) => {
        let result = RegexForTitle(name);
        return result.args;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: newTitle,
            description: newDesc,
            dateTimeLaunch: newTimeLaunch,
            repeatUnit: newUnit,
            repeatEvery: newEvery,
            valid: newValid
        };

        try {
            if (selectedTests.length > 0) {
                setErrorMsg('');
                const res = await fetch("http://localhost:5001/api/plans/" + newId, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });

                if (!res.ok) {
                    throw new Error(`Erreur HTTP : ${res.status}`);
                }

                // 2. Supprimer les tests associéess
                const res2 = fetch("http://localhost:5001/api/plantests/" + newId, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                // 3. Associer les tests sélectionnés
                const associations = selectedTests.map(test => {
                    return fetch("http://localhost:5001/api/plantests", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            planId: newId,
                            testId: test.id
                        })
                    });
                });

                await Promise.all(associations);

                handleClose(); // Ferme la modale
                window.location.reload(); // Recharge la page (si nécessaire)
            } else {
                setErrorMsg('Erreur : Veuillez sélectionner au moins un test');
            }
        } catch (err) {
            console.error("Erreur lors de la création du plan ou de l'association :", err);
        }
    };

    return (
        <>
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box className="relative" sx={modalStyle}>
                <div onClick={handleClose} className="cursor-pointer">
                    <IconCrossStroke className="absolute top-4 right-4 w-8 h-8" />
                </div>
                <h2 className='text-xl text-center font-bold mb-6'>{newTitle}</h2>

                <Stack direction="column" spacing={1} sx={{ alignItems: 'center', marginBottom: '25px' }}>
                    <section className="flex justify-center items-center gap-2 flex-wrap w-full p-2 rounded-md bg-white-500 shadow">
                        {selectedTests.map((test, idx) => (
                            <CardComponent title={test.name} key={idx} description={test.description} descVisible={false} iconVisible={true} onClick={() => handleRemoveTest(test.id)} />
                        ))}
                        <div className="w-min cursor-pointer" onClick={handleOpenDialog}>
                            <IconPlus fill="#3E87F6" className="w-10 h-10" />
                        </div>
                    </section>

                    <form onSubmit={handleSubmit} className="pt-10 w-full">
                        <ul className="flex flex-col gap-5">
                            <li className="flex justify-center w-full">
                                <TextField
                                    className="w-full lg:w-1/2"
                                    label="Nom"
                                    variant="outlined"
                                    required
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                />
                            </li>
                            <li className="flex justify-center w-full">
                                <TextField
                                    className="w-full lg:w-1/2"
                                    label="Description"
                                    multiline
                                    rows={5}
                                    value={newDesc ? newDesc : ''}
                                    onChange={(e) => setNewDesc(e.target.value)}
                                />
                            </li>
                            <li className="flex justify-center w-full">
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                                    <DateTimePicker
                                        label="Date de lancement"
                                        value={newTimeLaunch}
                                        onChange={(newValue) => setNewTimeLaunch(newValue)}
                                        className="w-full lg:w-1/2"
                                        required
                                    />
                                </LocalizationProvider>
                            </li>
                            <li className="flex justify-center w-full">
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label="Plan actif" checked={newValid} onChange={(e) => setNewValid(e.target.checked)} />
                                </FormGroup>
                            </li>
                            <li className="flex justify-center w-full">
                                <div className="flex gap-4 w-full lg:w-1/2">
                                    {/* Champ de répétition */}
                                    <FormControl fullWidth>
                                        <InputLabel>Répétition</InputLabel>
                                        <Select
                                            required
                                            value={newUnit}
                                            label="Répétition"
                                            onChange={handleChangeUnit}
                                        >
                                            <MenuItem value="day">Jour</MenuItem>
                                            <MenuItem value="week">Semaine</MenuItem>
                                            <MenuItem value="month">Mois</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        label={unit === "day" ? `Tous les ${every} jours` : unit === "week" ? `Toutes les ${every} semaines` : `Tous les ${every} mois`}
                                        type="number"
                                        inputProps={{ min: 1, step: 1 }}
                                        value={newEvery}
                                        onChange={(e) => setNewEvery(parseFloat(e.target.value))}
                                        fullWidth
                                    />
                                </div>
                            </li>
                            {errorMsg !== '' && (
                                <li className="flex justify-center w-full">
                                    <p className="text-red-500 font-semibold">{errorMsg}</p>
                                </li>
                            )}
                            <li className="flex justify-center w-full">
                                <Button type="submit" className="w-full flex justify-center py-2 lg:w-1/2">
                                    Modifier le plan
                                </Button>
                            </li>
                        </ul>
                    </form>
                </Stack>
            </Box>
        </Modal>

        <Dialog onClose={handleCloseDialog} open={openDialog}>
            <DialogTitle>Ajouter un test</DialogTitle>
            <List sx={{ pt: 0 }}>
                {newTests && newTests
                    .filter(test => !selectedTests.some(sel => sel.type === test.type))
                    .map((test, idx) => (
                        <ListItem disablePadding key={idx}>
                            <ListItemButton className="gap-5 items-center" onClick={() => handleSelectTest(test)}>
                                <ListItemText primary={handleRegexNewTitle(test.name)} />
                                <InfoOptionLaunch optionsChoice={handleRegexArgs(test.name)} />
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>
        </Dialog>
        </>
    );
};

export default PlanModal;