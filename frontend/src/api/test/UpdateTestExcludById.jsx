const BASE_URL = 'http://localhost:5001/api';

export const updateTestExcludById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/tests/exclud/${id}`, {
            method: 'PUT'
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la mise à jour du test exclud :', error);
        throw error;
    }
};