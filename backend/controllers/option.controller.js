const db = require('../models');
const Option = db.Option;
const Test = db.Test;

exports.createOption = async (req, res) => {
    try {
        const test = await Test.findByPk(req.body.testId);
        if (!test) return res.status(404).json({ message: 'Test not found' });

        const option = await Option.create(req.body);
        res.status(201).json(option);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllOptions = async (req, res) => {
    try {
        const options = await Option.findAll({ include: ['test'] });
        res.json(options);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOptionById = async (req, res) => {
    try {
        const option = await Option.findByPk(req.params.id, { include: ['test'] });
        if (!option) return res.status(404).json({ message: 'Option not found' });
        res.json(option);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateOption = async (req, res) => {
    try {
        const option = await Option.findByPk(req.params.id);
        if (!option) return res.status(404).json({ message: 'Option not found' });
        await option.update(req.body);
        res.json(option);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteOption = async (req, res) => {
    try {
        const option = await Option.findByPk(req.params.id);
        if (!option) return res.status(404).json({ message: 'Option not found' });
        await option.destroy();
        res.json({ message: 'Option deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAllOptionsByIdTest = async (req, res) => {
    try {
        const testId = req.params.id;
        const deletedCount = await Option.destroy({ where: { testId } });
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'No options found for this test' });
        }
        res.json({ message: `${deletedCount} options deleted for test ${testId}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};