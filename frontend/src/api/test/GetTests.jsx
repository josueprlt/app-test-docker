const BASE_URL = 'http://localhost:5001/api';

export const fetchTests = async () => {
    try {
        const response = await fetch(`${BASE_URL}/tests`);

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des tests :', error);
        throw error;
    }
};
