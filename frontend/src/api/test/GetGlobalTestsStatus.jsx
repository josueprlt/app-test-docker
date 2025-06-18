const BASE_URL = 'http://localhost:5001/api';

export const fetchGlobalTestStatus = async () => {
    try {
        const res = await fetch(`${BASE_URL}/tests/status/status`);
        if (!res.ok) throw new Error('Erreur réseau pour fetchGlobalTestStatus');
        return await res.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des status de tests :', error);
        throw error;
    }
};
