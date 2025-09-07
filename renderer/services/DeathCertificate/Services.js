/**
 * TODO: insert birth certificate data
 * @params {Object} formData - The form data to insert
 */
export async function insertBirthCertificate (formData) {
    try {
        const response = await fetch('http://localhost:3001/birth/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            throw new Error('Failed to insert death certificate data');
        }
        
        return await response.json();
    } catch (error) {
        console.error('[death form] Error inserting death certificate data:', error);
        throw error;
    }
};