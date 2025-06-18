import {postPlan} from "../api/plan/PostPlan.jsx";
import {postPlanTest} from "../api/plantest/PostPlanTest.jsx";
import {updatePlanById} from "../api/plan/UpdatePlanById.jsx";
import {deletePlanTestById} from "../api/plantest/DeletePlanTestById.jsx";

export const handleSubmitPlan = async (
    e,
    mode,
    id,
    payload,
    selectedTests,
    setErrorMsg,
    setPlanId,
    handleClose
) => {
    e.preventDefault();
    console.log(e, mode, id, payload, selectedTests, setErrorMsg, setPlanId, handleClose);

    if (!selectedTests || selectedTests.length === 0) {
        setErrorMsg('Erreur : Veuillez sélectionner au moins un test');
        return;
    }
    setErrorMsg('');

    try {
        let newPlanId;
        if (mode === 'create') {
            const result = await postPlan(payload);
            newPlanId = result.id;
            setPlanId(newPlanId);
        } else if (mode === 'update') {
            await updatePlanById(id, payload);
            await deletePlanTestById(id);
            newPlanId = id;
        }

        const associations = selectedTests.map(test => postPlanTest(newPlanId, test.id));
        await Promise.all(associations);

        handleClose();
        window.location.reload();
    } catch (err) {
        console.error(`Erreur lors de la ${mode === 'create' ? 'création' : mode === 'update' && 'mise à jour'} du plan ou de l'association : ${err}`);
        setErrorMsg(`Erreur lors de la ${mode === 'create' ? 'création' : mode === 'update' && 'mise à jour'} du plan ou de l'association`);
    }
};