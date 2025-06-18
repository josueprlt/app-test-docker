import {useState, useEffect} from "react";
import {handleSubmitPlan} from "../../utils/HandleSubmitPlan.jsx";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select} from "@mui/material";
import Button from "../Button.jsx";
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');

const FormPlan = ({
                      mode,
                      handleClose,
                      selectedTests,
                      labelBtn,
                      id,
                      oldName = null,
                      oldDesc = null,
                      oldLaunch = null,
                      oldUnit = null,
                      oldEvery = null,
                      oldValid = null
                  }) => {
    const [date, setDate] = useState(dayjs());
    const [name, setName] = useState('');
    const [planId, setPlanId] = useState(id);
    const [description, setDescription] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [unit, setUnit] = useState('');
    const [every, setEvery] = useState(1);
    const [valid, setValid] = useState(null);
    const [payload, setPayload] = useState({});

    useEffect(() => {
        if (oldName && oldDesc && oldLaunch && oldUnit && oldEvery) {
            setName(oldName);
            setDescription(oldDesc);
            setDate(oldLaunch);
            setUnit(oldUnit);
            setEvery(oldEvery);
            setValid(oldValid);
        }
    }, []);

    useEffect(() => {
        setPayload({
            name,
            description,
            dateTimeLaunch: date.toISOString(),
            repeatUnit: unit,
            repeatEvery: every,
            ...(valid !== null && valid !== undefined && { valid })
        });
    }, [name, description, date, unit, every, valid]);

    const handleChangeUnit = (event) => {
        setUnit(event.target.value);
    };

    return (
        <form
            onSubmit={(e) => handleSubmitPlan(e, mode, planId, payload, selectedTests, setErrorMsg, setPlanId, handleClose)}
            className="w-full mt-5">
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
                {valid !== null && (
                    <li className="flex justify-center w-full">
                        <FormGroup>
                            <FormControlLabel control={<Checkbox/>} label="Plan actif" checked={valid}
                                              onChange={(e) => setValid(e.target.checked)}/>
                        </FormGroup>
                    </li>
                )}
                <li className="flex justify-center w-full">
                    <div className="flex gap-4 w-full lg:w-1/2">

                        <FormControl fullWidth>
                            <InputLabel>Répétition</InputLabel>
                            <Select
                                required
                                value={unit}
                                label="Répétition"
                                onChange={handleChangeUnit}
                                variant="outlined"
                            >
                                <MenuItem value="day">Jour</MenuItem>
                                <MenuItem value="week">Semaine</MenuItem>
                                <MenuItem value="month">Mois</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label={unit === "day" ? `Tous les ${every} jours` : unit === "week" ? `Toutes les ${every} semaines` : `Tous les ${every} mois`}
                            type="number"
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
                        {labelBtn}
                    </Button>
                </li>
            </ul>
        </form>
    );
};

export default FormPlan;
