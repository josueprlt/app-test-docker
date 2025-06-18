const BASE_URL_RUN = 'http://localhost:4000';

export const fetchRunTests = async (dataTests) => {
    try {
        const response = await fetch(`${BASE_URL_RUN}/run`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataTests),
        });

        if (!response.ok) {
            throw new Error(`Erreur réseau ou réponse non OK : ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erreur lors de l\'envoi des tests à exécuter :', error);
        throw error;
    }
};
