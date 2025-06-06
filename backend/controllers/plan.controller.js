const db = require('../models');
const Plan = db.Plan;

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