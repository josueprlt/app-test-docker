const db = require('../models');
const Test = db.Test;

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
        const type = req.params.type || req.query.type || req.body.type;
        if (!type) {
            return res.status(400).json({ message: 'Type is required as a URL parameter, query parameter, or in the request body' });
        }
        const tests = await Test.findAll({
            where: { type: type, valid: true },
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

exports.getTestWithStatus = async (req, res) => {
    try {
        const tests = await Test.findAll({
            where: { valid: true, exclud: false },
        });

        if (!tests || tests.length === 0) {
            return res.status(404).json({ message: 'No valid tests found' });
        }

        const results = tests.map(test => {
            return {
                id: test.id,
                name: test.name,
                type: test.type,
                success: test.success
            };
        });

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllTestsByType = async (req, res) => {
    try {
        const type = req.params.type || req.query.type || req.body.type;
        const tests = await Test.findAll({
            where: { type: type },
            include: ['logs'],
            order: [['id', 'DESC']]
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
        const type = req.params.type || req.query.type || req.body.type;
        // Trouver tous les tests valides du type donné
        const tests = await Test.findAll({
            where: { type: type, valid: true }
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

exports.excludTestById = async (req, res) => {
    try {
        const test = await Test.findByPk(req.params.id);
        if (!test) return res.status(404).json({ message: 'Test not found' });
        // Inverser la valeur de la colonne exclud
        const newExcludValue = !test.exclud;
        await test.update({ exclud: newExcludValue });
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