const express = require("express");
const cors = require('cors');
const { exec } = require("child_process");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/run", (req, res) => {
    const { tests } = req.body;

    if (!Array.isArray(tests)) {
        return res.status(400).json({ error: "Format attendu: { tests: [{ testName, args }] }" });
    }

    const results = [];

    tests.forEach(({ testName, args = [] }) => {
        const testId = uuidv4();
        const argsStr = args.join(" ");
        const command = `node selenium/MonEuredenV2/tests/${testName}.js ${argsStr}`;

        console.log(`${new Date().toISOString()} Lancement du test ${testName} (${testId}) avec args [${args.join(", ")}]`);

        const child = exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`[${testId}] ❌ Erreur : ${error.message}`);
            }
            if (stderr) {
                console.error(`[${testId}] ⚠️ Stderr : ${stderr}`);
            }
            if (stdout) {
                console.log(`[${testId}] ✅ Stdout : ${stdout}`);
            }
        });

        results.push({ testName, testId });
    });

    res.json({ message: "Tests lancés", results });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Test runner API en écoute sur le port ${PORT}`);
});