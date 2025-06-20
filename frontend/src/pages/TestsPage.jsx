import {useState, useEffect} from "react";
import LaunchSection from "../components/LaunchSection";
import Button from "../components/Button";
import SyncLoader from "react-spinners/SyncLoader";
import AddPlanModal from "../components/modals/AddPlanModal.jsx";
import PlanElement from "../components/elements/PlanElement";
import {fetchAllPlans} from "../api/plan/GetAllPlans.jsx";
import {updateTestExcludById} from "../api/test/UpdateTestExcludById.jsx";
import {Header} from "../components/forTestsPage/Header.jsx";
import {QueueComponent} from "../components/forTestsPage/QueueComponent.jsx";
import {PlanComponent} from "../components/forTestsPage/PlanComponent.jsx";

function TestsPage({data = null}) {
    const [tests, setTests] = useState(data);
    const [plans, setPlans] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetchAllPlans()
            .then(setPlans)
            .catch((err) => console.error('Error fetching all plans :', err));
    }, []);

    useEffect(() => {
        setTests(data);
    }, [data]);

    return (
        <main className="flex flex-col gap-2 p-2 bg-gray-500 text-black-500 sm:p-4 sm:gap-4 md:px-10">
            <Header />

            <LaunchSection data={tests} title="Tests sélectionnés" txtChipInactive="Lancez tous les tests"
                           options={false} mode="all"/>

            <QueueComponent tests={tests} setTests={setTests} />

            <PlanComponent tests={tests} plans={plans} open={open} handleOpen={handleOpen} handleClose={handleClose} />
        </main>
    );
}

export default TestsPage;