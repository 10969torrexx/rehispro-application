export async function insertMarriageCertificate(formData) {
    try {
        const response = await fetch('http://localhost:3001/marriage/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            throw new Error('Failed to insert marriage certificate data');
        }

        return await response.json();
    } catch (error) {
        console.error('[marriage form] Error inserting marriage certificate data:', error);
        throw error;
    }
};