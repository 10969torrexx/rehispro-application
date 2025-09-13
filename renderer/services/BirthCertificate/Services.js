/**
 * TODO: insert birth certificate data
 * @params {Object} formData - The form data to insert
 */
export async function insertBirthCertificate (formData) {
    console.log("📤 Sending formData:", formData);   // 👈 add this
    try {
        const response = await fetch('http://localhost:3001/birth/create', {
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


export async function listBirthCertificate() {
    try {
        const response = await fetch('http://localhost:3001/birth/list', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include' // include cookies/session if needed
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || `HTTP error: ${response.status}`);
        }

        return data; // { success, message, data }
    } catch (error) {
        console.error('[birth form] Error fetching birth certificates:', error);
        throw error;
    }
}