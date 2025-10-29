export async function store(data) {
    try {
        const reponse = await fetch('http://localhost:3001/visitor-logs/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    } catch (error) {
        console.error('[visitor logs] Error :', error);
        throw error;
    }
}