const BASE_URL = 'http://localhost:5001/api';

export const fetchAllPlans = async () => {
    try {
        const response = await fetch(`${BASE_URL}/plans/all`);

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des plans :', error);
        throw error;
    }
};
