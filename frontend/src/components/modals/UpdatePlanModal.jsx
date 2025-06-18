import {useState, useEffect} from "react";
import {IconPlus} from "../icons";
import {CardComponent} from '../forTestsPage/CardComponent.jsx';
import DialogAddTest from "../dialog/DialogAddTest.jsx";
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import {TemplateModal} from "./TemplateModal.jsx";
import FormPlan from "../formulaire/formPlan.jsx";

dayjs.locale('fr');

const UpdatePlanModal = ({
                             open,
                             handleClose,
                             data = [],
                             id,
                             title,
                             desc,
                             timeLaunch,
                             every,
                             unit,
                             tests = [],
                             valid
                         }) => {
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newTimeLaunch, setNewTimeLaunch] = useState(null);
    const [newValid, setNewValid] = useState(null);
    const [selectedTests, setSelectedTests] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newUnit, setNewUnit] = useState('');
    const [newEvery, setNewEvery] = useState(1);

    useEffect(() => {
        if (title && timeLaunch && Array.isArray(data) && data.length > 0 && Array.isArray(tests) && tests.length > 0) {
            setNewTitle(title || '');
            setNewDesc(desc || '');
            setNewTimeLaunch(dayjs(timeLaunch));
            setNewValid(valid ?? false);
            setSelectedTests(tests);
            setNewUnit(unit);
            setNewEvery(every);
        }
    }, [id, title, desc, valid, timeLaunch, every, unit, data, tests]);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const handleRemoveTest = (testId) => {
        setSelectedTests((prev) => prev.filter(test => test.id !== testId));
    };

    return (
        <>
            <TemplateModal open={open} handleClose={handleClose} title={newTitle}>
                <section
                    className="flex justify-center items-center gap-2 flex-wrap w-full p-2 rounded-md bg-white-500 shadow">
                    {selectedTests.map((test, idx) => (
                        <CardComponent title={test.name} key={idx} description={test.description}
                                       descVisible={false} iconVisible={true}
                                       onClick={() => handleRemoveTest(test.id)}/>
                    ))}
                    <div className="w-min cursor-pointer" onClick={handleOpenDialog}>
                        <IconPlus fill="#3E87F6" className="w-10 h-10"/>
                    </div>
                </section>

                <FormPlan
                    mode={'update'}
                    handleClose={handleClose}
                    selectedTests={selectedTests}
                    labelBtn="Modifier le plan"
                    id={id}
                    oldName={newTitle}
                    oldDesc={newDesc}
                    oldLaunch={newTimeLaunch}
                    oldEvery={newEvery}
                    oldUnit={newUnit}
                    oldValid={newValid}
                />
            </TemplateModal>

            <DialogAddTest
                data={data}
                open={openDialog}
                handleCloseDialog={handleCloseDialog}
                setSelectedTests={setSelectedTests}
                selectedTests={selectedTests}
            />
        </>
    )
        ;
};

export default UpdatePlanModal;