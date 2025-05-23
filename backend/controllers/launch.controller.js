const { exec } = require('child_process');

exports.execLaunchByName = async (req, res) => {
    const { type } = req.params;
    // Commande shell à l'intérieur du container, en passant le nom
    exec(`docker exec test-runner bash -c "node selenium/MonEuredenV2/tests/${type}.js"`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ stdout, stderr });
    });
};

exports.execLaunchByNameWithOptions = async (req, res) => {
    let opts = "";
    const { type } = req.params;
    const { options } = req.params;

    options.split(',').forEach((option) => {
        opts += `${option} `;
    });
    // Commande shell à l'intérieur du container, en passant le nom
    exec(`docker exec test-runner bash -c "node selenium/MonEuredenV2/tests/${type}.js ${opts}"`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ stdout, stderr });
    });
};