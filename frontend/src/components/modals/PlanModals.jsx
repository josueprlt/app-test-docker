import { useState, useEffect } from "react";
import { IconPlus } from "../icons";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '../Button';
import { IconCrossStroke } from '../icons.jsx';
import { RegexForTitle } from '../../utils/RegexForTitle.jsx';
import InfoOptionLaunch from '../InfoOptionLaunch.jsx';
import CardComponent from '../CardComponent.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
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

const PlanModals = ({ open, handleClose, data }) => {
  const [date, setDate] = useState(dayjs());
  const [name, setName] = useState('');
  const [planId, setPlanId] = useState(null);
  const [description, setDescription] = useState('');
  const [tests, setTests] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTests, setSelectedTests] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [unit, setUnit] = useState('');
  const [every, setEvery] = useState(1);

  const handleChangeUnit = (event) => {
    setUnit(event.target.value);
  };

  const handleChangeEvery = (event) => {
    setEvery(event.target.value);
  };

  useEffect(() => {
    setTests(data);
  }, [data]);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleSelectTest = (test) => {
    setSelectedTests((prev) => [...prev, test]);
    setOpenDialog(false);
  };

  const handleRemoveTest = (testId) => {
    setSelectedTests((prev) => prev.filter(test => test.id !== testId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      description,
      dateTimeLaunch: date.toISOString(),
      repeatUnit: unit,
      repeatEvery: every
    };

    try {
      if (selectedTests.length > 0) {
        setErrorMsg('');
        const res = await fetch("http://localhost:5001/api/plans", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          throw new Error(`Erreur HTTP : ${res.status}`);
        }

        const result = await res.json(); // contient le plan avec son id
        const newPlanId = result.id;
        setPlanId(newPlanId);

        // 2. Associer les tests sélectionnés
        const associations = selectedTests.map(test => {
          return fetch("http://localhost:5001/api/plantests", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              planId: newPlanId,
              testId: test.id
            })
          });
        });

        // Optionnel : attendre que toutes les associations soient faites
        await Promise.all(associations);

        console.log("Plan et associations créés avec succès !");
        handleClose(); // Ferme la modale
        window.location.reload(); // Recharge la page (si nécessaire)
      } else {
        setErrorMsg('Erreur : Veuillez sélectionner au moins un test');
      }
    } catch (err) {
      console.error("Erreur lors de la création du plan ou de l'association :", err);
    }
  };

  const handleRegexNewTitle = (name) => {
    let result = RegexForTitle(name);
    return result.newTitle;
  }

  const handleRegexArgs = (name) => {
    let result = RegexForTitle(name);
    return result.args;
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box className="relative" sx={modalStyle}>
          <div onClick={handleClose} className="cursor-pointer">
            <IconCrossStroke className="absolute top-4 right-4 w-8 h-8" />
          </div>
          <h2 className='text-xl text-center font-bold mb-6'>Options de planification</h2>

          <Stack className="flex flex-col">
            <section className="flex justify-center items-center gap-2 flex-wrap w-full p-2 rounded-md bg-white-500 shadow">
                {selectedTests.map((test, idx) => (
                    <CardComponent title={test.name} key={idx} description={test.description} descVisible={false} iconVisible={true} onClick={() => handleRemoveTest(test.id)} />
                ))}
              <div className="w-min cursor-pointer" onClick={handleOpenDialog}>
                <IconPlus fill="#3E87F6" className="w-10 h-10" />
              </div>
            </section>

            <form onSubmit={handleSubmit} className="mt-5">
              <ul className="flex flex-col gap-5">
                <li className="flex justify-center w-full">
                  <TextField
                    className="w-full lg:w-1/2"
                    label="Nom"
                    variant="outlined"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </li>
                <li className="flex justify-center w-full">
                  <TextField
                    className="w-full lg:w-1/2"
                    label="Description"
                    multiline
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </li>
                <li className="flex justify-center w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                    <DateTimePicker
                      label="Date de lancement"
                      value={date}
                      onChange={(newValue) => setDate(newValue)}
                      className="w-full lg:w-1/2"
                      required
                    />
                  </LocalizationProvider>
                </li>
                <li className="flex justify-center w-full">
                  <div className="flex gap-4 w-full lg:w-1/2">
                    {/* Champ de répétition */}
                    <FormControl fullWidth>
                      <InputLabel>Répétition</InputLabel>
                      <Select
                          required
                          value={unit}
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
                        value={every}
                        onChange={(e) => setEvery(parseFloat(e.target.value))}
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
                    Ajouter le plan
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
          {tests && tests
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

export default PlanModals;