/**
 * TODO: insert birth certificate data
 * @params {Object} formData - The form data to insert
 */
/**
 * Insert death certificate data
 * @param {Object} formData - The form data to insert
 */
export async function insertDeathCertificate(formData) {
    console.log("📤 Sending formData:", formData);   // 👈 add this
    try {
        const response = await fetch('http://localhost:3001/death/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to insert death certificate data');
        }
        return await response.json();
    } catch (error) {
        console.error('[death form] Error inserting death certificate data:', error);
        throw error;
    }
}