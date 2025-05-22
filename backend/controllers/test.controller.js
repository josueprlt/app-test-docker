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
        const tests = await Test.findAll({
            include: ['logs']
        });
        res.json(tests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getValidTests = async (req, res) => {
    try {
        const tests = await Test.findAll({
            where: { valid: true },
            include: ['logs']
        });
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

exports.getTestByType = async (req, res) => {
    try {
        const typeParam = req.params.type;
        // Si type est une chaîne de caractères, on le passe tel quel
        const tests = await Test.findAll({
            where: { type: typeParam, valid: true },  // Utilisation de la chaîne de caractères
            include: ['logs']
        });
        if (!tests || tests.length === 0) {
            return res.status(404).json({ message: 'No tests found for this type' });
        }
        res.json(tests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.invalidateTestByType = async (req, res) => {
    try {
        const typeParam = req.params.type;
        // Trouver tous les tests valides du type donné
        const tests = await Test.findAll({
            where: { type: typeParam, valid: true }
        });
        if (!tests || tests.length === 0) {
            return res.status(404).json({ message: 'No tests found for this type' });
        }
        // Mettre à jour la colonne valid à false pour chaque test trouvé
        await Promise.all(
            tests.map(test => test.update({ valid: false }))
        );
        res.json({ message: `${tests.length} test(s) invalidated.` });
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