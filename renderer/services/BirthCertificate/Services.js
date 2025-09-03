/**
 * TODO: insert birth certificate data
 * @params {Object} formData - The form data to insert
 */
export async function insertBirthCertificate (formData) {
    try {
        const response = await fetch('/birth/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            throw new Error('Failed to insert birth certificate data');
        }
        
        return await response.json();
    } catch (error) {
        console.error('[birth form] Error inserting birth certificate data:', error);
        throw error;
    }
};