/**
 * TODO: insert birth certificate data
 * @params {Object} formData - The form data to insert
 */
export async function insertBirthCertificate (formData) {
    console.log("📤 Sending formData:", formData);
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

/**
 * TODO: this will handle the uploading process of the files
 * @params {FormData} formData - The form data containing files to upload
 */
export async function uploadFiles(formData) {
    try {
        const response = await fetch('http://localhost:3001/birth/upload-and-scan', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to upload files');
        }
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (error) {
       throw new Error(JSON.stringify({
        'error': error
       }))
    }
}

/**
 * View birth certificate data
 * @param {string|number} id - The ID of the birth certificate
 */
export async function viewBirthCertificate(id) {
    try {
        const response = await fetch(`http://localhost:3001/birth/view/${id}`, {
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
        console.error('[birth form] Error fetching birth certificate:', error);
        throw error;
    }
}