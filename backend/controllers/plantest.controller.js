const db = require('../models');
const PlanTest = db.PlanTest;

exports.createPlanTest = async (req, res) => {
    try {
        const planTest = await PlanTest.create(req.body);
        res.status(201).json(planTest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAllPlanTestByIdPlan = async (req, res) => {
    try {
        const planId = req.params.planId;

        if (!planId) {
            return res.status(400).json({ message: "planId manquant dans le body" });
        }

        const deleted = await PlanTest.destroy({
            where: { planId }
        });

        if (deleted === 0) {
            return res.status(404).json({ message: "Aucun PlanTest trouvé pour ce planId" });
        }

        res.json({ message: `${deleted} PlanTest supprimé(s)` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};