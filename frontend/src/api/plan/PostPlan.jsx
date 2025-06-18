const BASE_URL = 'http://localhost:5001/api';

export const postPlan = async (payload) => {
    try {
        const response = await fetch(`${BASE_URL}/plans`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Erreur lors de la mise à jour du plan par son id :', error);
        throw error;
    }
};
