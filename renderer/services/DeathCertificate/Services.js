/**
 * TODO: insert birth certificate data
 * @params {Object} formData - The form data to insert
 */
/**
 * Insert death certificate data
 * @param {Object} formData - The form data to insert
 */
export async function insertDeathCertificate(formData) {
    console.log("📤 Sending formData:", formData);
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

export async function listDeathCertificate() {
    try {
        const response = await fetch('http://localhost:3001/death/list', {
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
        console.error('[death form] Error fetching death certificates:', error);
        throw error;
    }
}


/**
 * View death certificate data
 * @param {string|number} id - The ID of the death certificate
 */
export async function viewDeathCertificate(id) {
    try {
        const response = await fetch(`http://localhost:3001/death/view/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || `HTTP error: ${response.status}`);
        }

        return data; // { success, message, data }
    } catch (error) {
        console.error('[death form] Error viewing death certificate:', error);
        throw error;
    }
}


/**
 * TODO: handle file upload for the birth cert.
 * @params {FormData} formData - The form data containing files to upload
 */ 
export async function uploadFiles(formData) {
    try {
        const response = await fetch('http://localhost:3001/death/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to upload files')
        }
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (error) {
        console.error(error);
        throw new Error(JSON.stringify({
            'error': error
        }))
    }
}