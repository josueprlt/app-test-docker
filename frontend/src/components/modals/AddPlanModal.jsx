import {useState} from "react";
import {IconPlus} from "../icons";
import {CardComponent} from '../forTestsPage/CardComponent.jsx';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import {TemplateModal} from "./TemplateModal.jsx";
import DialogAddTest from "../dialog/DialogAddTest.jsx";
import FormPlan from "../formulaire/formPlan.jsx";

dayjs.locale('fr');

const AddPlanModal = ({open, handleClose, data}) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTests, setSelectedTests] = useState([]);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const handleRemoveTest = (testId) => {
        setSelectedTests((prev) => prev.filter(test => test.id !== testId));
    };

    return (
        <>
            <TemplateModal open={open} handleClose={handleClose} title={'Options de planification'}>
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
                    mode={'create'}
                    handleClose={handleClose}
                    selectedTests={selectedTests}
                    labelBtn="Ajouter le plan"
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
    );
};

export default AddPlanModal;