const db = require('../models');
const Plan = db.Plan;
const Test = db.Test;
const PlanTest = db.PlanTest;

exports.getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.findAll({
            include: ['planTests']
        });
        res.json(plans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPlanById = async (req, res) => {
    try {
        const plan = await Plan.findByPk(req.params.id);
        if (!plan) return res.status(404).json({ message: 'Plan not found' });
        res.json(plan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createPlan = async (req, res) => {
    try {
        const plan = await Plan.create(req.body);
        res.status(201).json(plan);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updatePlan = async (req, res) => {
    try {
        const plan = await Plan.findByPk(req.params.id);
        if (!plan) return res.status(404).json({ message: 'Plan not found' });
        await plan.update(req.body);
        res.json(plan);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deletePlan = async (req, res) => {
    try {
        const plan = await Plan.findByPk(req.params.id);
        if (!plan) return res.status(404).json({ message: 'Plan not found' });
        await plan.destroy();
        res.json({ message: 'Plan deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePlanById = async (req, res) => {
    try {
        const type = req.params.type || req.query.type || req.body.type;
        const testId = req.params.testId || req.query.testId || req.body.testId;

        // Trouver le test valide par type
        const validTest = await Test.findOne({
            where: { type: type, valid: true },
        });

        if (!validTest) {
            return res.status(404).json({ message: 'Aucun test valide trouvé pour ce type' });
        }

        const planTests = await PlanTest.findAll({
            where: { testId: testId },
        });

        if (!planTests) {
            return res.status(404).json({ message: 'PlanTest non trouvé' });
        }

        planTests.forEach(async (planTest) => {
            planTest.testId = validTest.id;
            await planTest.save();
        });

        res.json({ message: 'PlanTest mis à jour', planTests });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePlanValidOrNot = async (req, res) => {
    try {
        const plan = await Plan.findByPk(req.params.id);
        if (!plan) return res.status(404).json({ message: 'Plan not found' });

        plan.valid = !plan.valid;
        await plan.save();
        res.json(plan);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
