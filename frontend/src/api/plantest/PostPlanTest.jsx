const BASE_URL = 'http://localhost:5001/api';

export const postPlanTest = async (planId, testId) => {
    try {
        const response = await fetch("http://localhost:5001/api/plantests", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({planId: planId, testId: testId})
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de la liaison entre un plan et un test par son id :', error);
        throw error;
    }
};
