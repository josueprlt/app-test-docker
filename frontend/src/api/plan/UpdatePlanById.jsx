const BASE_URL = 'http://localhost:5001/api';

export const updatePlanById = async (id, payload) => {
    try {
        const response = await fetch(`${BASE_URL}/plans/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du plan par son id :', error);
        throw error;
    }
};
