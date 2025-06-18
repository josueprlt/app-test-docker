const BASE_URL = 'http://localhost:5001/api';

export const fetchTestByType = async ({ type }) => {
    try {
        const res = await fetch(`${BASE_URL}/tests/type?type=${encodeURIComponent(type)}`);

        if (!res.ok) throw new Error('Erreur réseau pour fetchTestsByType');

        return await res.json();
    } catch (error) {
        console.error('Erreur lors de la récupération du test par type :', error);
        throw error;
    }
};
