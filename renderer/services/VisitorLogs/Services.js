export async function store(data) {
    try {
        const response = await fetch('http://localhost:3001/visitor-logs/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create visitor log');
        }

        return await response.json();
    } catch (error) {
        console.error('[visitor logs] Error :', error);
        throw error;
    }
}