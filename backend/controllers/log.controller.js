const db = require('../models');
const Log = db.Log;
const Test = db.Test;

exports.createLog = async (req, res) => {
    try {
        const test = await Test.findByPk(req.body.testId);
        if (!test) return res.status(404).json({ message: 'Test not found' });

        const log = await Log.create(req.body);
        res.status(201).json(log);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllLogs = async (req, res) => {
    try {
        const logs = await Log.findAll({ include: ['test'] });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getLogById = async (req, res) => {
    try {
        const log = await Log.findByPk(req.params.id, { include: ['test'] });
        if (!log) return res.status(404).json({ message: 'Log not found' });
        res.json(log);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateLog = async (req, res) => {
    try {
        const log = await Log.findByPk(req.params.id);
        if (!log) return res.status(404).json({ message: 'Log not found' });
        await log.update(req.body);
        res.json(log);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteLog = async (req, res) => {
    try {
        const log = await Log.findByPk(req.params.id);
        if (!log) return res.status(404).json({ message: 'Log not found' });
        await log.destroy();
        res.json({ message: 'Log deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAllLogsByIdTest = async (req, res) => {
    try {
        const testId = req.params.id;
        const deletedCount = await Log.destroy({ where: { testId } });
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'No logs found for this test' });
        }
        res.json({ message: `${deletedCount} logs deleted for test ${testId}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};