import SyncLoader from "react-spinners/SyncLoader";
import Button from "../Button.jsx";
import AddPlanModal from "../modals/AddPlanModal.jsx";
import PlanElement from "../elements/PlanElement.jsx";

export const PlanComponent = ({
                                  open,
                                  handleOpen,
                                  handleClose,
                                  tests,
                                  plans
                              }) => {

    return (
        <section className="p-2 rounded-md bg-white-500 shadow">
            <div className="flex flex-wrap justify-between mb-5">
                <h3 className="font-bold sm:text-2xl">Planifiez une batterie de tests</h3>
                <Button onClick={handleOpen}>Planifiez</Button>
                <AddPlanModal
                    open={open}
                    handleClose={handleClose}
                    data={tests}
                />
            </div>

            <div className="flex flex-col gap-2">
                {Array.isArray(plans) ? (
                    plans.length > 0 ? (
                        plans.map((plan, index) => (
                            <PlanElement key={index} id={plan.id} title={plan.name} desc={plan.description}
                                         timeLaunch={plan.dateTimeLaunch} unit={plan.repeatUnit}
                                         every={plan.repeatEvery} valid={plan.valid} date={plan.dateTimeLaunch}
                                         tests={plan.planTests} data={tests}/>
                        ))
                    ) : (
                        <p className="text-center py-4 text-gray-600 italic">Aucun plan à afficher</p>
                    )
                ) : (
                    <SyncLoader color="#3C3C3C" size={8}/>
                )}

            </div>

        </section>
    );
};