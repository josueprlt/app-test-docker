const BASE_URL = 'http://localhost:5001/api';

export const deletePlanTestById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/plantests/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error('Erreur lors de la suppression de la liaison entre un plan et un test par son id :', error);
        throw error;
    }
};
