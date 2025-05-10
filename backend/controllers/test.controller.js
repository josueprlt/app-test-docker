const db = require('../models');
const Test = db.Test;
const Log = db.Log;

exports.createTest = async (req, res) => {
    try {
        const test = await Test.create(req.body);
        res.status(201).json(test);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllTests = async (req, res) => {
    try {
        const tests = await Test.findAll({ include: ['logs'] });
        res.json(tests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTestById = async (req, res) => {
    try {
        const test = await Test.findByPk(req.params.id, { include: ['logs'] });
        if (!test) return res.status(404).json({ message: 'Test not found' });
        res.json(test);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTest = async (req, res) => {
    try {
        const test = await Test.findByPk(req.params.id);
        if (!test) return res.status(404).json({ message: 'Test not found' });
        await test.update(req.body);
        res.json(test);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTest = async (req, res) => {
    try {
        const test = await Test.findByPk(req.params.id);
        if (!test) return res.status(404).json({ message: 'Test not found' });
        await test.destroy();
        res.json({ message: 'Test deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};