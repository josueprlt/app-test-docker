const BASE_URL = 'http://localhost:5001/api';

export const fetchTestById = async ({ id }) => {
    try {
        const response = await fetch(`${BASE_URL}/tests/${id}`);

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération du test par id :', error);
        throw error;
    }
};
